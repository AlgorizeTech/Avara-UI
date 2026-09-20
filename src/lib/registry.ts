/**
 * How the docs refer to the published registry, in one place.
 *
 * Every install command on the site is derived from these values, so a change
 * of host or namespace is one edit here rather than a grep across ninety pages.
 * `generate-registry.ts` carries its own copy of the host on purpose: the
 * registry build must not import site code, and the URL baked into published
 * items is a public contract that should not move just because the docs did.
 */

/**
 * The namespace consumers register in `components.json`. Matches
 * `registry.json` → `name` and the hostname so there is one name everywhere.
 * shadcn requires the leading `@`; `algorize-ui/button` is parsed as an item in
 * shadcn's own registry and 404s.
 */
export const REGISTRY_NAMESPACE = "@algorize-ui";

/**
 * Where `shadcn build` publishes the registry. Hard-coded rather than read from
 * `window.location.origin` so a command copied off a localhost or preview
 * deployment still works, and so the server and client render the same string.
 */
export const REGISTRY_BASE_URL = "https://algorize-ui.vercel.app/r";

/** The URL template the CLI expands `{name}` in. */
export const REGISTRY_URL_TEMPLATE = `${REGISTRY_BASE_URL}/{name}.json`;

/**
 * The one-time `shadcn registry add` argument. Written once here so the
 * installation guide, the quick start and the setup banner cannot drift apart.
 */
export const REGISTRY_ADD_ARGS = `registry add ${REGISTRY_NAMESPACE}=${REGISTRY_URL_TEMPLATE}`;

/**
 * Which form an `add` argument is rendered in.
 *
 *   namespace → `@algorize-ui/button`   short; needs the registry registered
 *   url       → `https://…/r/button.json` long; works in any project
 */
export type RegistryForm = "namespace" | "url";

export const REGISTRY_FORMS: readonly RegistryForm[] = ["namespace", "url"];

export const isRegistryForm = (value: unknown): value is RegistryForm =>
  value === "namespace" || value === "url";

/** True for the `foo.json` shorthand a page writes for one of our own items. */
export const isOwnItemArg = (arg: string) => /^[\w-]+\.json$/.test(arg);

/**
 * Expands one argument of a shadcn `add`.
 *
 * A bare `foo.json` is one of ours and becomes either `@algorize-ui/foo` or the
 * full published URL. Anything else is passed through untouched — a name with
 * no extension (`utils`) is a component in shadcn's own upstream registry, and
 * a URL is already resolved.
 */
export function resolveAddArg(arg: string, form: RegistryForm = "namespace"): string {
  const own = arg.replace(/^"|"$/g, "");
  if (!isOwnItemArg(own)) return own;
  return form === "namespace"
    ? `${REGISTRY_NAMESPACE}/${own.replace(/\.json$/, "")}`
    : `${REGISTRY_BASE_URL}/${own}`;
}

/** The full `add` argument list for an item, in the given form. */
export const addArgsFor = (name: string, form: RegistryForm = "namespace") =>
  `add ${resolveAddArg(`${name}.json`, form)}`;
