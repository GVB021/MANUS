# Build and Runtime Stage
FROM node:20-slim

WORKDIR /app

# Install dependencies needed for build
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy all source code first so pnpm can see all package.json files in the workspace
COPY . .

# Install dependencies without --frozen-lockfile to allow pnpm to reconcile the workspace lockfile
# and use --recursive to ensure all subpackages are installed
RUN pnpm install --recursive

# Build main app (client + server)
RUN pnpm build

# Build studio app
RUN pnpm studio:build

# Environment variables
ENV NODE_ENV=production
ENV PORT=5002

# Expose the application port
EXPOSE 5002

# Start the application
CMD ["node", "dist/index.js"]
