# Build and Runtime Stage
FROM node:20-slim

WORKDIR /app

# Install dependencies needed for build
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy package files and lockfile
COPY pnpm-lock.yaml package.json ./
COPY studio/package.json ./studio/
COPY patches ./patches

# Install ALL dependencies (including devDeps for build)
RUN pnpm install --frozen-lockfile

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

# The server will serve static files from /app/dist/public and /app/studio/dist
# Ensure directories exist
RUN mkdir -p dist studio/dist

# Start the application using tsx for simplicity in production if dist/index.js is not fully bundled
# or use the bundled version if preferred. Let's stick to the bundled one.
CMD ["node", "dist/index.js"]
