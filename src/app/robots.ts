import { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/config/site";

export const dynamic = "force-static";

/**
 * Crawler policy, generated so the sitemap and host follow `NEXT_PUBLIC_SITE_URL`.
 *
 * Everything is open, AI crawlers included — the docs and /llms.txt exist to be
 * read by them.
 *
 * Only `/cdn-cgi/` is disallowed: Cloudflare injects links such as
 * `/cdn-cgi/l/email-protection` into the HTML at the edge, they 404 on the
 * origin, and no page of ours lives there.
 *
 * Nothing else is disallowed on purpose. The previous rules blocked `/_next/`, which
 * is where every page's JavaScript and CSS live, so Google rendered the site
 * without them; the other entries named paths this site does not have. Pages
 * that must stay out of search results say so with `noindex` in their metadata
 * (the /preview iframes, the leftover /docs/*\/examples pages), which only works
 * if crawlers are allowed to fetch them and read it.
 *
 * On a deployment that is not indexable (the Vercel copy, see `INDEXABLE`) the
 * rules stay open for the same reason: every page carries `noindex`, and a
 * `Disallow: /` would stop Google fetching the pages it has already indexed, so
 * it could never see the tag and the stale copies would stay in the results.
 * What changes is that this host stops advertising itself: no sitemap, and no
 * `Host:` line claiming the real domain.
 */
export default function robots(): MetadataRoute.Robots {
  const rules = [{ userAgent: "*", allow: "/", disallow: "/cdn-cgi/" }];
  if (!INDEXABLE) return { rules };

  return {
    rules,
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: new URL(SITE_URL).host,
  };
}
