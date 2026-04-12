# Build context must be the repo root (docker compose sets this automatically)

# Stage 1: compile native deps (sqlite3 requires python/make/g++ on Alpine)
FROM node:22-alpine AS deps
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/server/package.json ./apps/server/
RUN npm ci -w apps/server

# Stage 2: build TS → JS, then drop dev deps
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# root package.json is required so npm understands the workspace structure
COPY package.json package-lock.json ./
COPY apps/server ./apps/server
RUN npm run build -w apps/server \
 && npm prune --omit=dev

# Stage 3: minimal runtime
FROM node:22-alpine AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    DATABASE_PATH=/app/data/db.sqlite
WORKDIR /app

RUN addgroup -S app && adduser -S app -G app \
 && mkdir -p /app/data && chown -R app:app /app

COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/apps/server/dist ./dist

USER app
VOLUME ["/app/data"]
EXPOSE 3000
CMD ["node", "--max-old-space-size=256", "dist/main"]
