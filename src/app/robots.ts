import { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

export const dynamic = "force-static";

/**
 * Crawler policy, generated so the sitemap and host follow `NEXT_PUBLIC_SITE_URL`.
 *
 * Everything is open, AI crawlers included — the docs and /llms.txt exist to be
 * read by them.
 *
 * Nothing is disallowed on purpose. The previous rules blocked `/_next/`, which
 * is where every page's JavaScript and CSS live, so Google rendered the site
 * without them; the other entries named paths this site does not have. Pages
 * that must stay out of search results say so with `noindex` in their metadata
 * (the /preview iframes, the leftover /docs/*\/examples pages), which only works
 * if crawlers are allowed to fetch them and read it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: new URL(SITE_URL).host,
  };
}
