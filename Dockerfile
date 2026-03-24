# Single-stage production build
FROM node:20-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy all source code and configuration files
COPY . .

# Install dependencies recursively (pnpm respects pnpm-workspace.yaml)
RUN pnpm install --recursive

# Build client (root vite build)
RUN pnpm exec vite build --config vite.config.ts

# Build server (esbuild) - using ESM format to support import.meta
RUN pnpm exec esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Build studio client
RUN cd studio && pnpm exec vite build --config vite.config.ts

# Build studio server (ESM format)
RUN cd studio && pnpm exec esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=../dist/studio-index.js

# Environment configuration
ENV NODE_ENV=production
ENV PORT=5002

# Expose port
EXPOSE 5002

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5002/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})" || true

# Start application - studio server handles all routes including /api/auth/*
CMD ["node", "--input-type=module", "-e", "import('./dist/studio-index.js')"]
