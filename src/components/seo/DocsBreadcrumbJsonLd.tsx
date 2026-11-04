"use client";

import { usePathname } from "next/navigation";

import { SITE_NAME, SITE_URL } from "@/config/site";
import { breadcrumbLabel, breadcrumbSlug } from "@/lib/breadcrumb";
import { DEFAULT_FRAMEWORK, docsHref } from "@/lib/framework";

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
  const slug = breadcrumbSlug(pathname);
  const label = slug && breadcrumbLabel(slug);
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
