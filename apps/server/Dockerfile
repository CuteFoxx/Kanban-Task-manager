# Stage 1: compile native deps (sqlite3 needs python/make/g++)
FROM node:22-alpine AS deps
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: build TS → JS, then prune dev deps
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build \
 && npm prune --omit=dev

# Stage 3: minimal runtime image
FROM node:22-alpine AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    DATABASE_PATH=/app/data/db.sqlite
WORKDIR /app

RUN addgroup -S app && adduser -S app -G app \
 && mkdir -p /app/data && chown -R app:app /app

COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/dist ./dist

USER app
VOLUME ["/app/data"]
EXPOSE 3000

# cap Node.js heap at 256 MB to keep RAM usage low
CMD ["node", "--max-old-space-size=256", "dist/main"]
