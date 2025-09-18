# Stage 1: Dependency Installation
FROM node:lts-alpine AS depend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build Application
FROM node:lts-alpine AS build
WORKDIR /app
COPY --from=depend /app/node_modules ./node_modules
COPY . .
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Production Runtime
FROM node:lts-alpine AS runtime
WORKDIR /app
RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs
USER nextjs
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 3000
CMD ["node", "server.js"]
