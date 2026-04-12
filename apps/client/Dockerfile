# Build context must be the repo root (docker compose sets this automatically)

# Stage 1: build the Vite app
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/client/package.json ./apps/client/
RUN npm ci -w apps/client
COPY apps/client ./apps/client
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build -w apps/client

# Stage 2: serve with minimal nginx
FROM nginx:1.27-alpine AS runner
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html
COPY apps/client/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
