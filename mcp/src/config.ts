/**
 * All URLs are configuration, never hardcoded (mcp-guide.md section 0.6, 18, 23).
 * The defaults are the live Avara UI registry at avaraui.com. Point the server
 * elsewhere with UI_REGISTRY_URL / UI_REGISTRY_NAMESPACE / UI_DOCS_ORIGIN — no
 * code change needed.
 */

const DEFAULT_REGISTRY_URL = "https://avaraui.com/r";
const DEFAULT_REGISTRY_NAMESPACE = "@avara-ui";

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export interface Config {
  /** Base URL for the ShadCN registry, e.g. https://avaraui.com/r */
  registryBaseUrl: string;
  /** Namespace consumers register in components.json, e.g. @avara-ui. */
  registryNamespace: string;
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
    siteOrigin = new URL(DEFAULT_REGISTRY_URL).origin;
  }

  const runnerEnv = env.UI_PACKAGE_RUNNER;
  const defaultRunner: Config["defaultRunner"] =
    runnerEnv === "pnpm dlx" || runnerEnv === "bunx" ? runnerEnv : "npx";

  const ttl = Number(env.UI_REGISTRY_CACHE_TTL_MS);

  return {
    registryBaseUrl,
    // shadcn requires the leading @; add it when the variable leaves it off.
    registryNamespace: `@${(env.UI_REGISTRY_NAMESPACE?.trim() || DEFAULT_REGISTRY_NAMESPACE).replace(/^@+/, "")}`,
    siteOrigin: trimTrailingSlash(env.UI_DOCS_ORIGIN || siteOrigin),
    defaultRunner,
    registryCacheTtlMs: Number.isFinite(ttl) && ttl > 0 ? ttl : 5 * 60 * 1000,
  };
}
