# Build and Runtime Stage
FROM node:20-slim

WORKDIR /app

# Install dependencies needed for build
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy workspace configuration and package files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY studio/package.json ./studio/
COPY patches ./patches

# Install ALL dependencies (including devDeps for build) - pnpm will respect the workspace
RUN pnpm install --frozen-lockfile --recursive

# Copy the rest of the source code
COPY . .

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
