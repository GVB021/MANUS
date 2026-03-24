import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

// CORRIGIDO: Importar funções do servidor do estúdio
import { registerRoutes as registerStudioRoutes } from "../../studio/server/routes";
import { setupAuth, registerAuthRoutes } from "../../studio/server/replit_integrations/auth";
import { setupVideoSync } from "../../studio/server/video-sync";
import { setupRealtime } from "../../studio/server/realtime";
import { registerMeRestore } from "../../studio/server/me-restore";
import { registerVoiceJobs } from "../../studio/server/voice-jobs";
import { pool } from "../../studio/server/db";
import { configureSupabase } from "../../studio/server/lib/supabase";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  
  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // CORRIGIDO: Registrar rotas do estúdio ANTES das rotas tRPC
  // Isso garante que /api/auth/*, /api/studios/*, etc. funcionem
  try {
    // Verificar conectividade com banco de dados
    await pool.query("SELECT 1");
    console.log("[server] Database connection verified");

    // Configurar Supabase se disponível
    try {
      const { rows } = await pool.query(
        "SELECT key, value FROM platform_settings WHERE key IN ('SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY')",
      );
      const map: Record<string, string> = {};
      for (const r of rows as any[]) {
        map[String(r.key)] = String(r.value);
      }
      if (map.SUPABASE_URL || map.SUPABASE_SERVICE_ROLE_KEY) {
        configureSupabase({ url: map.SUPABASE_URL, serviceRoleKey: map.SUPABASE_SERVICE_ROLE_KEY });
      }
    } catch (e) {
      console.warn("[server] Could not load Supabase config from database:", e);
    }

    // Configurar autenticação do estúdio
    await setupAuth(app);
    registerAuthRoutes(app);
    registerVoiceJobs(app);
    registerMeRestore(app);
    
    // Registrar rotas REST do estúdio
    await registerStudioRoutes(server, app);
    
    // Configurar WebSocket para video sync e realtime
    setupVideoSync(server);
    setupRealtime(app);
    
    console.log("[server] Studio routes registered");
  } catch (error) {
    console.error("[server] Failed to setup studio routes:", error);
    throw error;
  }

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  
  // tRPC API - CORRIGIDO: Manter tRPC para compatibilidade com cliente principal
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  
  // Development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  const host = "0.0.0.0";
  server.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}/`);
    console.log(`Health check available at http://${host}:${port}/health`);
    console.log(`Studio app available at http://${host}:${port}/hub-dub`);
    console.log(`API routes available at http://${host}:${port}/api/auth/*`);
  });
}

startServer().catch(console.error);
