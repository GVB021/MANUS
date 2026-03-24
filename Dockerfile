# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy package files
COPY pnpm-lock.yaml package.json ./
COPY studio/package.json ./studio/
COPY patches ./patches

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build
RUN pnpm studio:build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy package files
COPY pnpm-lock.yaml package.json ./
COPY studio/package.json ./studio/
COPY patches ./patches

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built application and static files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/studio/dist ./studio/dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5002

# Start the application
CMD ["node", "dist/index.js"]
