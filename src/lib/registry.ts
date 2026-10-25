/**
 * How the docs refer to the published registry, in one place.
 *
 * Every install command on the site is derived from these values, and they in
 * turn come from `.env` through src/config/site.ts — `NEXT_PUBLIC_SITE_URL` for
 * the host and `NEXT_PUBLIC_REGISTRY_NAMESPACE` for the name. A change of host
 * or namespace is one edit there; `generate-registry.ts` reads the same values,
 * so the published items and the docs cannot disagree.
 *
 * Relative imports only: the build scripts load this under tsx.
 */

import { REGISTRY_NAMESPACE, siteConfig } from "../config/site";

/**
 * The namespace consumers register in `components.json`. Matches
 * `registry.json` → `name` so there is one name everywhere. shadcn requires the
 * leading `@`; `avara-ui/button` is parsed as an item in shadcn's own registry
 * and 404s.
 */
export { REGISTRY_NAMESPACE };

/**
 * Where `shadcn build` publishes the registry. Taken from the configured site
 * URL rather than `window.location.origin` so a command copied off a localhost
 * or preview deployment still works, and so the server and client render the
 * same string.
 */
export const REGISTRY_BASE_URL = siteConfig.registryUrl;

/** The URL template the CLI expands `{name}` in. */
export const REGISTRY_URL_TEMPLATE = `${REGISTRY_BASE_URL}/{name}.json`;

/**
 * The one-time `shadcn registry add` argument. Written once here so the
 * installation guide, the quick start and the setup banner cannot drift apart.
 */
export const REGISTRY_ADD_ARGS = `registry add ${REGISTRY_NAMESPACE}=${REGISTRY_URL_TEMPLATE}`;

/** The `registries` entry that `registry add` writes into `components.json`. */
export const REGISTRY_COMPONENTS_JSON = JSON.stringify(
  { registries: { [REGISTRY_NAMESPACE]: REGISTRY_URL_TEMPLATE } },
  null,
  2,
);

/**
 * Which form an `add` argument is rendered in.
 *
 *   url       → `https://…/r/button.json` long; works in any project
 *   namespace → `@avara-ui/button`        short; needs the registry registered
 */
export type RegistryForm = "namespace" | "url";

/** Listed in the order the switch shows them, default first. */
export const REGISTRY_FORMS: readonly RegistryForm[] = ["url", "namespace"];

/**
 * URL by default: it works in a project that has never run `registry add`, so
 * the first command a reader copies cannot fail with "Unknown registry".
 */
export const DEFAULT_REGISTRY_FORM: RegistryForm = "url";

export const isRegistryForm = (value: unknown): value is RegistryForm =>
  value === "namespace" || value === "url";

/** True for the `foo.json` shorthand a page writes for one of our own items. */
export const isOwnItemArg = (arg: string) => /^[\w-]+\.json$/.test(arg);

/**
 * Expands one argument of a shadcn `add`.
 *
 * A bare `foo.json` is one of ours and becomes either the full published URL or
 * `@avara-ui/foo`. Anything else is passed through untouched — a name with no
 * extension (`utils`) is a component in shadcn's own upstream registry, and a
 * URL is already resolved.
 */
export function resolveAddArg(arg: string, form: RegistryForm = DEFAULT_REGISTRY_FORM): string {
  const own = arg.replace(/^"|"$/g, "");
  if (!isOwnItemArg(own)) return own;
  return form === "namespace"
    ? `${REGISTRY_NAMESPACE}/${own.replace(/\.json$/, "")}`
    : `${REGISTRY_BASE_URL}/${own}`;
}

/** The full `add` argument list for an item, in the given form. */
export const addArgsFor = (name: string, form: RegistryForm = DEFAULT_REGISTRY_FORM) =>
  `add ${resolveAddArg(`${name}.json`, form)}`;
