# syntax=docker/dockerfile:1.7
#
# Avara UI: static export (next.config.ts: output "export"). Node is only needed
# to produce out/; nginx serves it, so there is no Node at runtime.
#
# Why it is built this way (low CPU/RAM on a small Easypanel box):
#   - deps stage     : `npm ci` is its own layer, re-run only when package*.json changes.
#   - BuildKit cache : ~/.npm and .next/cache survive between builds, so a rebuild
#                      after a small change does not start from zero.
#   - memory cap     : NODE_OPTIONS keeps `next build` from growing until the kernel
#                      OOM-kills it (the "needs a second force build" symptom).
#   - tiny runtime   : the final image is nginx + out/ only (no node_modules, no source).
#
# Needs BuildKit (default on Docker 23+). Without it, remove the `--mount=...` flags.

# Pinned on purpose. Node < 22.23.4 has CVE-2026-111497 (Brotli out-of-bounds
# write in node:zlib) and other high-severity CVEs from the Oct 2026 security
# release. A floating "22" tag can be served from a stale cached image, so bump
# this deliberately: --build-arg NODE_VERSION=22.x.y
ARG NODE_VERSION=22.23.4

# ---------- 1. dependencies ----------
FROM node:${NODE_VERSION}-bookworm-slim AS deps
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 \
    npm_config_fund=false \
    npm_config_audit=false

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline

# ---------- 2. build ----------
FROM node:${NODE_VERSION}-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Heap limit for `next build` (MB). Set it a bit below the RAM the builder has
# free. Raise it if the build dies with "heap out of memory"; lower it if the
# container gets "Killed" (exit 137). Override: --build-arg NODE_MAX_OLD_SPACE=2048
ARG NODE_MAX_OLD_SPACE=3072
ENV NODE_OPTIONS=--max-old-space-size=${NODE_MAX_OLD_SPACE}

# NEXT_PUBLIC_* values are inlined into the bundle at build time, so they must
# reach this stage as build args (Easypanel passes the service's environment
# variables as build args). Unset or empty means "absent".
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
    REGISTRY_BASE_URL=$REGISTRY_BASE_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# `npm run build` = registry build + md build + type checks + next build + postbuild.
# .next/cache is a persistent cache mount (not part of the image), so webpack and
# SWC output is reused on the next build.
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# ---------- 3. runtime ----------
FROM nginx:stable-alpine AS runtime
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/ || exit 1
