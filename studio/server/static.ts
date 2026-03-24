import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // In production, the studio server is compiled to /app/dist/studio-index.js
  // __dirname = /app/dist
  // Studio client build = /app/studio/dist/public
  // Public app build = /app/dist/public

  const studioDistPath = path.resolve(__dirname, "..", "studio", "dist", "public");
  const publicDistPath = path.resolve(__dirname, "public");

  // Serve studio assets under /hub-dub prefix
  if (fs.existsSync(studioDistPath)) {
    app.use("/hub-dub", express.static(studioDistPath));
    app.get("/hub-dub", (_req, res) => {
      res.sendFile(path.resolve(studioDistPath, "index.html"));
    });
    app.get("/hub-dub/*", (_req, res) => {
      res.sendFile(path.resolve(studioDistPath, "index.html"));
    });
    console.log("[server] Studio app served at /hub-dub from:", studioDistPath);
  } else {
    console.warn("[server] Studio build not found at:", studioDistPath);
  }

  // Serve public app at root
  if (fs.existsSync(publicDistPath)) {
    app.use(express.static(publicDistPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(publicDistPath, "index.html"));
    });
    console.log("[server] Public app served at / from:", publicDistPath);
  } else {
    console.warn("[server] Public app build not found at:", publicDistPath);
    // Fallback: serve studio at root if public app not found
    if (fs.existsSync(studioDistPath)) {
      app.use(express.static(studioDistPath));
      app.get("*", (_req, res) => {
        res.sendFile(path.resolve(studioDistPath, "index.html"));
      });
    }
  }
}
