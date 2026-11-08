# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================

# IMPORTANT: Node.js Version Maintenance
# This Dockerfile uses Node.js 22.23.4 (bookworm-slim), the patched 22.x from the Oct 2026
# security release (fixes CVE-2026-111497, a Brotli RCE, and other high-severity CVEs).
# Keep it in step with node-version in .github/workflows/registry.yml.
# To ensure security and compatibility, regularly update the NODE_VERSION ARG to the latest patched release.
ARG NODE_VERSION=22.23.4-bookworm-slim

FROM node:${NODE_VERSION} AS dependencies

# Set working directory
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./

# Install project dependencies with frozen lockfile for reproducible builds
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
  if [ -f package-lock.json ]; then \
    npm ci --no-audit --no-fund; \
  elif [ -f yarn.lock ]; then \
    corepack enable yarn && yarn install --frozen-lockfile --production=false; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm install --frozen-lockfile; \
  else \
    echo "No lockfile found." && exit 1; \
  fi

# ============================================
# Stage 2: Build Next.js application in standalone mode
# ============================================

FROM node:${NODE_VERSION} AS builder

# Set working directory
WORKDIR /app

# Copy project dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application source code
COPY . .

ENV NODE_ENV=production

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

# --------------------------------------------
# Added for Avara UI (build-time settings)
# --------------------------------------------
ENV NEXT_TELEMETRY_DISABLED=1

# Heap limit per Node process (MB), so `next build` stays inside a small VPS's RAM.
# Measured peak is about 2.5 GB of real RAM with the webpack build worker enabled
# in next.config.ts. "JavaScript heap out of memory" -> raise it; container
# "Killed" or exit 137 -> lower it. Override: --build-arg NODE_MAX_OLD_SPACE=2048
ARG NODE_MAX_OLD_SPACE=1536
ENV NODE_OPTIONS=--max-old-space-size=${NODE_MAX_OLD_SPACE}

# NEXT_PUBLIC_* values are inlined into the bundle at build time, so they must
# reach this stage as build args (Easypanel passes the service's environment
# variables as --build-arg). Unset or empty means "absent".
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SITE_NAME
ARG NEXT_PUBLIC_SITE_AUTHOR
ARG NEXT_PUBLIC_GITHUB_URL
ARG NEXT_PUBLIC_GITHUB_ORG_URL
ARG NEXT_PUBLIC_ISSUES_URL
ARG NEXT_PUBLIC_TWITTER_URL
ARG NEXT_PUBLIC_TWITTER_HANDLE
ARG NEXT_PUBLIC_DISCORD_URL
ARG NEXT_PUBLIC_NPM_URL
ARG NEXT_PUBLIC_PRODUCT_HUNT_URL
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_AI_SEARCH_ENDPOINT
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
ARG NEXT_PUBLIC_YANDEX_VERIFICATION
ARG NEXT_PUBLIC_GOOGLE_FONTS_API_KEY
ARG NEXT_PUBLIC_REGISTRY_NAMESPACE
ARG NEXT_PUBLIC_V0_ENDPOINT_ORIGIN
ARG REGISTRY_BASE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME \
    NEXT_PUBLIC_SITE_AUTHOR=$NEXT_PUBLIC_SITE_AUTHOR \
    NEXT_PUBLIC_GITHUB_URL=$NEXT_PUBLIC_GITHUB_URL \
    NEXT_PUBLIC_GITHUB_ORG_URL=$NEXT_PUBLIC_GITHUB_ORG_URL \
    NEXT_PUBLIC_ISSUES_URL=$NEXT_PUBLIC_ISSUES_URL \
    NEXT_PUBLIC_TWITTER_URL=$NEXT_PUBLIC_TWITTER_URL \
    NEXT_PUBLIC_TWITTER_HANDLE=$NEXT_PUBLIC_TWITTER_HANDLE \
    NEXT_PUBLIC_DISCORD_URL=$NEXT_PUBLIC_DISCORD_URL \
    NEXT_PUBLIC_NPM_URL=$NEXT_PUBLIC_NPM_URL \
    NEXT_PUBLIC_PRODUCT_HUNT_URL=$NEXT_PUBLIC_PRODUCT_HUNT_URL \
    NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID \
    NEXT_PUBLIC_AI_SEARCH_ENDPOINT=$NEXT_PUBLIC_AI_SEARCH_ENDPOINT \
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION \
    NEXT_PUBLIC_YANDEX_VERIFICATION=$NEXT_PUBLIC_YANDEX_VERIFICATION \
    NEXT_PUBLIC_GOOGLE_FONTS_API_KEY=$NEXT_PUBLIC_GOOGLE_FONTS_API_KEY \
    NEXT_PUBLIC_REGISTRY_NAMESPACE=$NEXT_PUBLIC_REGISTRY_NAMESPACE \
    NEXT_PUBLIC_V0_ENDPOINT_ORIGIN=$NEXT_PUBLIC_V0_ENDPOINT_ORIGIN \
    REGISTRY_BASE_URL=$REGISTRY_BASE_URL

# Build Next.js application
# If you want to speed up Docker rebuilds, you can cache the build artifacts
# by adding: --mount=type=cache,target=/app/.next/cache
# This caches the .next/cache directory across builds, but it also prevents
# .next/cache/fetch-cache from being included in the final image, meaning
# cached fetch responses from the build won't be available at runtime.
RUN if [ -f package-lock.json ]; then \
    npm run build; \
  elif [ -f yarn.lock ]; then \
    corepack enable yarn && yarn build; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm build; \
  else \
    echo "No lockfile found." && exit 1; \
  fi

# ============================================
# Stage 3: Run Next.js application
# ============================================

FROM node:${NODE_VERSION} AS runner

# Set working directory
WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the run time.
# ENV NEXT_TELEMETRY_DISABLED=1

# Copy production assets
COPY --from=builder --chown=node:node /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown node:node .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# If you want to persist the fetch cache generated during the build so that
# cached responses are available immediately on startup, uncomment this line:
# COPY --from=builder --chown=node:node /app/.next/cache ./.next/cache

# Switch to non-root user for security best practices
USER node

# Expose port 3000 to allow HTTP traffic
EXPOSE 3000

# Start Next.js standalone server
CMD ["node", "server.js"]

# ============================================
# Stage 4: Serve the static export with nginx (added for Avara UI)
# ============================================
# next.config.ts uses output: "export", so `next build` writes out/ and never
# produces .next/standalone or server.js. Stage 3 above would fail on that COPY.
# This stage is the LAST one, so it is the default build target, and BuildKit
# (Easypanel uses `docker buildx build`) skips Stage 3 entirely. Do not build
# with `--target runner` unless next.config.ts switches to output: "standalone".
# nginx needs no Node at runtime, so the Node CVEs do not apply to what is served.
FROM nginx:stable-alpine AS static
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/ || exit 1