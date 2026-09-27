/**
 * All URLs are configuration, never hardcoded (mcp-guide.md section 0.6, 18, 23).
 * The `algorize-ui.vercel.app` default is the CURRENT live registry and is
 * temporary — swap it via env vars once the main domain is decided, no code change needed.
 */

const DEFAULT_REGISTRY_URL = "https://algorize-ui.vercel.app/r";

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export interface Config {
  /** Base URL for the ShadCN registry, e.g. https://algorize-ui.vercel.app/r */
  registryBaseUrl: string;
  /** Origin used to resolve documentation (docs-md) URLs for examples. */
  siteOrigin: string;
  /** Default package runner used in generated install commands. */
  defaultRunner: "npx" | "pnpm dlx" | "bunx";
  /** In-memory cache TTL for registry data, in milliseconds. */
  registryCacheTtlMs: number;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const registryBaseUrl = trimTrailingSlash(env.UI_REGISTRY_URL || DEFAULT_REGISTRY_URL);

  let siteOrigin: string;
  try {
    siteOrigin = new URL(registryBaseUrl).origin;
  } catch {
    siteOrigin = "https://algorize-ui.vercel.app";
  }

  const runnerEnv = env.UI_PACKAGE_RUNNER;
  const defaultRunner: Config["defaultRunner"] =
    runnerEnv === "pnpm dlx" || runnerEnv === "bunx" ? runnerEnv : "npx";

  const ttl = Number(env.UI_REGISTRY_CACHE_TTL_MS);

  return {
    registryBaseUrl,
    siteOrigin: trimTrailingSlash(env.UI_DOCS_ORIGIN || siteOrigin),
    defaultRunner,
    registryCacheTtlMs: Number.isFinite(ttl) && ttl > 0 ? ttl : 5 * 60 * 1000,
  };
}
