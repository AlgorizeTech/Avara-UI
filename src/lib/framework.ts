/**
 * The framework axis of the docs tree.
 *
 * Docs are served under `/docs/<framework>/<slug>`, where `<framework>` is a
 * dynamic route segment restricted to a closed set. Everything that needs to
 * know which frameworks exist — `generateStaticParams`, the route guard, the
 * sitemap, the markdown-mirror script and the sidebar switcher — reads from this
 * file rather than matching on path strings, so a rename or a release flip is
 * one edit in one place.
 *
 * RELEASE: add "reactjs" to LISTED_FRAMEWORKS to show the framework switcher.
 * Gate on the component-page work — the 13 pages that import next/link,
 * next/image or next/dynamic must carry React code before React is announced.
 */

/**
 * The closed set. Adding to this is a deliberate act: it widens the union type,
 * so every exhaustive switch and every `Record<Framework, …>` in the codebase
 * fails to compile until it accounts for the new value.
 */
export const FRAMEWORKS = ["nextjs", "reactjs"] as const;

export type Framework = (typeof FRAMEWORKS)[number];

export const DEFAULT_FRAMEWORK: Framework = "nextjs";

/**
 * Frameworks whose routes are actually built.
 *
 * Drop one and every `/docs/<it>/*` URL becomes a build-time 404 via
 * `dynamicParams = false` — no other file needs editing, because the route
 * guard, the sitemap and the mirror script all read this array.
 */
export const BUILT_FRAMEWORKS: readonly Framework[] = ["nextjs", "reactjs"];

/**
 * Frameworks the sidebar switcher offers.
 *
 * A framework can be built but not listed: its URLs work for anyone holding a
 * link, the switcher does not advertise it, and the site looks untouched to
 * everyone else. That is the review state, and the default before release.
 */
export const LISTED_FRAMEWORKS: readonly Framework[] = ["nextjs", "reactjs"];

export const FRAMEWORK_META: Record<Framework, { label: string; hint: string }> = {
  nextjs: { label: "Next.js", hint: "App Router" },
  reactjs: { label: "React", hint: "Vite" },
};

/**
 * Route validity. A framework is real only if its routes were built, so this
 * narrows against BUILT_FRAMEWORKS rather than the full set — switching React
 * off makes `isFramework("reactjs")` false, which is what turns its URLs into
 * 404s at the layout guard.
 */
export const isFramework = (value: string): value is Framework =>
  (BUILT_FRAMEWORKS as readonly string[]).includes(value);

/** `("reactjs", "accordion")` → `/docs/reactjs/accordion`. */
export const docsHref = (framework: Framework, slug: string) =>
  `/docs/${framework}/${slug}`;

/**
 * Reads the framework out of a docs pathname.
 *
 * Deliberately pathname-based rather than `useParams()`: this has to work in the
 * header and the 404 page too, which render outside the `[framework]` segment
 * and have no params to read. Outside the docs tree it yields the default, which
 * is the correct answer for a marketing-page link into the docs.
 */
export const frameworkFromPathname = (pathname: string): Framework => {
  const segment = pathname.split("/")[2] ?? "";
  return isFramework(segment) ? segment : DEFAULT_FRAMEWORK;
};

/**
 * Reads the slug out of a docs pathname — `/docs/reactjs/examples/counter/`
 * yields `examples/counter`.
 *
 * This is what active-state and prev/next matching compare against. Never
 * compare a composed href to a pathname: that comparison still typechecks after
 * the framework segment becomes dynamic, and silently returns false forever.
 */
export const slugFromPathname = (pathname: string) =>
  pathname.replace(/\/+$/, "").split("/").slice(3).join("/");

/**
 * Retargets a docs link that names a framework explicitly.
 *
 * `("/docs/nextjs/hero", "reactjs")` → `/docs/reactjs/hero`. Anything that is
 * not a docs URL, and any docs URL whose second segment is not a known
 * framework, is returned untouched.
 *
 * This is the safety net under prose links: an author writing
 * `[Hero](/docs/nextjs/hero)` out of habit would otherwise strand every React
 * reader who clicks it, and nothing in the type system or the build would say so.
 */
export const retargetDocsHref = (
  href: string | undefined,
  framework: Framework,
): string | undefined => {
  if (!href || !href.startsWith("/docs/")) return href;

  const parts = href.split("/");
  if (!isFramework(parts[2] ?? "")) return href;

  parts[2] = framework;
  return parts.join("/");
};

/** Swaps the framework segment while keeping the reader on the same page. */
export const swapFramework = (pathname: string, next: Framework) => {
  const parts = pathname.replace(/\/+$/, "").split("/");
  if (parts.length < 3) return docsHref(next, "index");
  parts[2] = next;
  return parts.join("/");
};
