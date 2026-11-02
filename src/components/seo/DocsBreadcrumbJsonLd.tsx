"use client";

import { usePathname } from "next/navigation";

import { SITE_NAME, SITE_URL } from "@/config/site";
import { type NavigationChild, navigation } from "@/constants/navigation";
import { DEFAULT_FRAMEWORK, docsHref } from "@/lib/framework";

/**
 * Sidebar labels that read badly as a breadcrumb in a search result. The
 * sidebar itself keeps them; only the structured data uses these.
 */
const BREADCRUMB_NAMES: Record<string, string> = {
  "ai-chat": "AI Chat",
  "api-playground": "API Playground",
  "context-menu": "Context Menu",
  "floating-contact-button": "Floating Contact Button",
};

function labelFor(slug: string): string | undefined {
  const walk = (children: NavigationChild[]): string | undefined => {
    for (const child of children) {
      if (child.slug === slug) return child.label;
      const hit = child.children && walk(child.children);
      if (hit) return hit;
    }
  };
  for (const group of navigation) {
    const hit = walk(group.children);
    if (hit) return hit;
  }
}

/**
 * schema.org BreadcrumbList for a docs page: Home › Docs › Page, so search
 * results can show the page's place in the site instead of a bare URL.
 *
 * A client component only to read the path; it renders during the static
 * export like everything else, so the JSON-LD is in the HTML crawlers get.
 * URLs are the canonical (default-framework) ones, matching each page's
 * canonical link. Pages not in the sidebar render nothing.
 */
export function DocsBreadcrumbJsonLd() {
  const pathname = usePathname() ?? "";
  const slug = pathname.match(/^\/docs\/[^/]+\/(.+?)\/?$/)?.[1];
  const label = slug && (BREADCRUMB_NAMES[slug] ?? labelFor(slug));
  if (!slug || !label) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Docs", item: `${SITE_URL}/docs` },
      {
        "@type": "ListItem",
        position: 3,
        name: label,
        item: `${SITE_URL}${docsHref(DEFAULT_FRAMEWORK, slug)}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escaping "<" keeps any string field from closing the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
