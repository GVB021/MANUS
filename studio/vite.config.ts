import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
  ],
  base: "/hub-dub/",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve((typeof __dirname !== 'undefined' ? __dirname : (process.cwd() + '/studio')), "client", "src"),
      "@shared": path.resolve((typeof __dirname !== 'undefined' ? __dirname : (process.cwd() + '/studio')), "shared"),
      "@assets": path.resolve((typeof __dirname !== 'undefined' ? __dirname : (process.cwd() + '/studio')), "attached_assets"),
      "@studio": path.resolve((typeof __dirname !== 'undefined' ? __dirname : (process.cwd() + '/studio')), "client/src/studio"),
    },
  },
  root: path.resolve((typeof __dirname !== 'undefined' ? __dirname : (process.cwd() + '/studio')), "client"),
  build: {
    outDir: path.resolve((typeof __dirname !== 'undefined' ? __dirname : (process.cwd() + '/studio')), "dist/public"),
    emptyOutDir: true,
  },
  server: process.env.NODE_ENV === "development" ? {
    watch: {
      usePolling: true,
    },
    fs: {
      strict: false,
    },
  } : undefined,
});
