import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { SITE_URL } from "@/config/site";
import {
  BUILT_FRAMEWORKS,
  DEFAULT_FRAMEWORK,
  FORKED_SLUGS,
  docsHref,
  type Framework,
} from "@/lib/framework";
import { docsPageModified, lastCommit } from "@/lib/last-modified";

export const dynamic = "force-static";

/**
 * Routes that exist but should not be advertised to search engines.
 *
 * `/docs/<framework>/index` is the Introduction's source route, but the host
 * 301s it to `/docs/<framework>`, and a sitemap must list final URLs, not
 * redirects.
 */
const EXCLUDED = new Set<string>(
  BUILT_FRAMEWORKS.map((framework) => `/docs/${framework}/index`),
);

/**
 * Route prefixes kept out for the same reason. The examples pages are inherited
 * Next.js tutorials, unlinked from the sidebar and marked `noindex`.
 */
const EXCLUDED_PREFIXES = [`/docs/${DEFAULT_FRAMEWORK}/examples`];

const isExcluded = (route: string) =>
  EXCLUDED.has(route) ||
  EXCLUDED_PREFIXES.some((prefix) => route === prefix || route.startsWith(`${prefix}/`));

/**
 * Dynamic segments the walker knows how to expand into real URLs.
 *
 * Without this, `[framework]` would be skipped like any other bracketed folder
 * and the entire docs tree — every component page — would silently drop out of
 * the sitemap on a green build.
 *
 * Only the canonical framework is expanded here: those pages serve identical
 * bytes in every framework, and each React twin names its Next.js counterpart as
 * canonical, so advertising both would ask a crawler to fetch a URL we have
 * already pointed it away from. The self-canonical exceptions are appended
 * explicitly below rather than by widening this — they are two pages, not a
 * policy change.
 */
const SEGMENT_EXPANSIONS: Record<string, readonly string[]> = {
  "[framework]": [DEFAULT_FRAMEWORK],
};

/**
 * Floor for the docs URL count, as a guard rather than a target.
 *
 * The failure this catches is a folder rename that leaves the walker matching
 * nothing: the build still succeeds, the sitemap is just quietly emptied, and
 * you find out from Search Console weeks later.
 */
const MIN_DOCS_ROUTES = 50;

/**
 * Walks the App Router tree and returns every statically routable path.
 *
 * Generated rather than hand-maintained: the previous `public/sitemap.xml` was
 * produced once by an online tool and listed 91 URLs on a completely different
 * domain, so search engines were being pointed at another site entirely.
 */
function collectRoutes(): string[] {
  const appDir = path.join(process.cwd(), "src/app");
  const routes: string[] = [];

  const hasPage = (dir: string) =>
    ["page.tsx", "page.mdx", "page.jsx", "page.ts"].some((f) =>
      fs.existsSync(path.join(dir, f)),
    );

  const walk = (dir: string, segments: string[]) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const { name } = entry;
      // Private folders and API handlers have no fixed URL.
      if (name.startsWith("_") || name === "api") continue;

      const child = path.join(dir, name);

      // What this directory contributes to the URL: a route group — (marketing)
      // — contributes nothing, a known dynamic segment contributes one branch
      // per value, and an unknown dynamic segment has no fixed URL at all.
      let contributions: (string | null)[];
      if (/^\(.*\)$/.test(name)) {
        contributions = [null];
      } else if (name.startsWith("[")) {
        const expansions = SEGMENT_EXPANSIONS[name];
        if (!expansions) continue;
        contributions = [...expansions];
      } else {
        contributions = [name];
      }

      for (const value of contributions) {
        const next = value === null ? segments : [...segments, value];

        if (hasPage(child)) {
          const route = `/${next.join("/")}`;
          if (!isExcluded(route)) routes.push(route);
        }
        walk(child, next);
      }
    }
  };

  if (hasPage(appDir)) routes.push("/");
  walk(appDir, []);

  // The expansion above advertises only the canonical framework, because every
  // other page's React twin declares that framework's URL as its canonical and
  // there is no sense asking a crawler to fetch a URL you have pointed away
  // from. The forked guides are the exception: they are self-canonical, so
  // leaving them out would make the only genuinely React-specific pages on the
  // site undiscoverable.
  for (const framework of BUILT_FRAMEWORKS) {
    if (framework === DEFAULT_FRAMEWORK) continue;
    for (const slug of FORKED_SLUGS) {
      routes.push(docsHref(framework, slug));
    }
  }

  const unique = [...new Set(routes)].sort();

  const docsRoutes = unique.filter((route) => route.startsWith("/docs/"));
  if (docsRoutes.length < MIN_DOCS_ROUTES) {
    throw new Error(
      `sitemap: only ${docsRoutes.length} /docs/ routes found (expected at least ` +
        `${MIN_DOCS_ROUTES}). The docs tree moved, or a dynamic segment is missing ` +
        `from SEGMENT_EXPANSIONS.`,
    );
  }

  return unique;
}

/** Component docs change most often; the landing pages anchor the hierarchy. */
function priorityFor(route: string): number {
  if (route === "/") return 1;
  if (route === "/docs") return 0.9;
  if (/^\/docs\/[^/]+\/(installation|first-app)$|^\/docs\/[^/]+$/.test(route))
    return 0.8;
  if (route.startsWith("/docs/")) return 0.7;
  return 0.5;
}

/** When a route last changed, from git. Undefined leaves `lastmod` out rather than guessing. */
function modifiedFor(route: string): string | undefined {
  if (route === "/") {
    return lastCommit("src/app/page.tsx", "src/app/home-page.tsx", "src/components/home");
  }
  if (route === "/docs") return lastCommit("src/app/docs/page.mdx");
  const docs = route.match(/^\/docs\/([^/]+)(?:\/(.+))?$/);
  if (docs) return docsPageModified(docs[2] ?? "index", docs[1] as Framework);
  return lastCommit(`src/app${route}`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return collectRoutes().map((route) => {
    const lastModified = modifiedFor(route);
    return {
      url: `${SITE_URL}${route === "/" ? "" : route}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: route.startsWith("/docs") ? ("weekly" as const) : ("monthly" as const),
      priority: priorityFor(route),
    };
  });
}
