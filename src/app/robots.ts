import { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

export const dynamic = "force-static";

/**
 * Crawler policy, generated so the sitemap and host follow `NEXT_PUBLIC_SITE_URL`.
 *
 * This replaces a static `public/robots.txt`, which both conflicted with this
 * route (Next.js refuses to serve `/robots.txt` when the two coexist, so the URL
 * returned a 500 in development) and pointed `Sitemap:` and `Host:` at another
 * project's domain. The crawl rules below are carried over unchanged.
 */
export default function robots(): MetadataRoute.Robots {
  const host = new URL(SITE_URL).host;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/private/",
          "/_next/",
          "/static/",
          "/.well-known/",
          "/node_modules/",
          "/.git/",
          "/.vscode/",
          "/tools/react-code-runner",
          "/standalone/",
        ],
        crawlDelay: 1,
      },
      { userAgent: "Googlebot", allow: "/", crawlDelay: 0.5 },
      { userAgent: "Bingbot", allow: "/", crawlDelay: 1 },
      { userAgent: "Slurp", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "Baiduspider", allow: "/" },
      { userAgent: "YandexBot", allow: "/" },
      // Social unfurlers need access for link previews.
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "LinkedInBot", allow: "/" },
      { userAgent: "WhatsApp", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      // AI training crawlers are excluded, as they were before.
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ChatGPT-User", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Claude-Web", disallow: "/" },
      { userAgent: "PerplexityBot", disallow: "/" },
      { userAgent: "YouBot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host,
  };
}
