# ============================================
# Avara UI: static export served by nginx
# ============================================
# next.config.ts uses output: "export", so `next build` writes out/ and never
# produces .next/standalone or server.js. "Standalone mode" (the usual advice for
# shrinking Next.js images) therefore does not apply: the final image ships only
# the static files plus nginx, with no Node, no node_modules and no server.js.
# If next.config.ts ever switches to output: "standalone", this file needs a
# Node runner stage again (copy .next/standalone, .next/static and public).

# IMPORTANT: Node.js Version Maintenance
# This Dockerfile uses Node.js 22.23.4 (alpine), the patched 22.x from the Oct 2026
# security release (fixes CVE-2026-111497, a Brotli RCE, and other high-severity CVEs).
# Keep it in step with node-version in .github/workflows/registry.yml.
# To ensure security and compatibility, regularly update the NODE_IMAGE_TAG ARG to the latest patched release.
# The ARG is deliberately not called NODE_VERSION: Easypanel passes every service
# environment variable as a --build-arg, and a leftover NODE_VERSION=22 there
# silently replaced this tag with Debian `node:22` (no `apk`, unpatched Node).
# Node only runs in the build stages below; none of it is in the image that is served.
ARG NODE_IMAGE_TAG=22.23.4-alpine

# ============================================
# Stage 1: Install dependencies
# ============================================
FROM node:${NODE_IMAGE_TAG} AS dependencies

# Alpine uses musl, not glibc. libc6-compat lets any prebuilt glibc-only native
# binary in node_modules still load (the usual Next.js-on-Alpine setup).
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Only the manifests, so this layer (and the install below) is reused until
# package.json or package-lock.json changes, not on every source edit.
COPY package.json package-lock.json .npmrc* ./

# `npm ci` fails if the lockfile and package.json disagree, so builds are
# reproducible. devDependencies are kept on purpose: the build needs them.
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# ============================================
# Stage 2: Build the static export (out/)
# ============================================
FROM node:${NODE_IMAGE_TAG} AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# No NODE_OPTIONS / --max-old-space-size here: Node picks its own heap limit from
# the host's (or container's) memory. If `next build` dies with "JavaScript heap
# out of memory", set ENV NODE_OPTIONS=--max-old-space-size=<MB> in this stage.

# NEXT_PUBLIC_* values are inlined into the bundle at build time, so they must
# reach this stage as build args (Easypanel passes the service's environment
# variables as --build-arg). Unset or empty means "absent".
# They are declared here, in the builder, not in the final stage, so none of
# them (the Google Fonts key included) appears in the shipped image's history.
ARG NEXT_PUBLIC_SITE_URL
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
ARG NEXT_PUBLIC_ALLOW_INDEXING
ARG REGISTRY_BASE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
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
    NEXT_PUBLIC_ALLOW_INDEXING=$NEXT_PUBLIC_ALLOW_INDEXING \
    REGISTRY_BASE_URL=$REGISTRY_BASE_URL

# .next/cache holds webpack's and Next's build cache. Keeping it in a BuildKit
# cache mount makes rebuilds much faster, and it never lands in a layer. That is
# safe here because the static export does not need .next/cache at runtime
# (the nginx image only gets out/).
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# ============================================
# Stage 3: Serve the static export with nginx (default build target)
# ============================================
# nginx-unprivileged runs as a non-root user (uid 101) and keeps its pid and temp
# files under /tmp, so the container needs no root. Its default port is 8080;
# docker/nginx.conf replaces the default server and listens on 3000 (any port
# above 1024 works without root). This is the LAST stage, so it is what
# `docker build` produces and what Easypanel (`docker buildx build`) deploys.
FROM nginxinc/nginx-unprivileged:stable-alpine AS static

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/ || exit 1