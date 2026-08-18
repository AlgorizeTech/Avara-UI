import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { SITE_URL } from "@/config/site";

export const dynamic = "force-static";

/**
 * Routes that exist but should not be advertised to search engines.
 *
 * Empty today — the one entry, a development QA harness at
 * `/otp-responsive-check`, was deleted rather than merely hidden. Keep the set
 * for any future page that must exist without being indexed.
 */
const EXCLUDED = new Set<string>();

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
      // Private folders, API handlers and dynamic segments have no fixed URL.
      if (name.startsWith("_") || name.startsWith("[") || name === "api") continue;

      const child = path.join(dir, name);
      // Route groups — (marketing) — do not contribute a path segment.
      const next = /^\(.*\)$/.test(name) ? segments : [...segments, name];

      if (hasPage(child)) {
        const route = `/${next.join("/")}`;
        if (!EXCLUDED.has(route)) routes.push(route);
      }
      walk(child, next);
    }
  };

  if (hasPage(appDir)) routes.push("/");
  walk(appDir, []);
  return [...new Set(routes)].sort();
}

/** Component docs change most often; the landing pages anchor the hierarchy. */
function priorityFor(route: string): number {
  if (route === "/") return 1;
  if (route === "/docs") return 0.9;
  if (/^\/docs\/nextjs\/(index|installation|first-app|architecture)$/.test(route)) return 0.8;
  if (route.startsWith("/docs/")) return 0.7;
  return 0.5;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // A fixed date, not `new Date()`: a build-time "now" tells crawlers every URL
  // changed on every deploy, which is noise rather than signal.
  const lastModified = new Date("2026-08-18");

  return collectRoutes().map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified,
    changeFrequency: route.startsWith("/docs") ? ("weekly" as const) : ("monthly" as const),
    priority: priorityFor(route),
  }));
}
