import { SITE_URL, links, siteConfig } from "@/config/site";
import { DEFAULT_FRAMEWORK, docsHref } from "@/lib/framework";
import { installedItems, pageHeading, pageSource } from "@/lib/docs-source";
import { pageSeo } from "@/lib/page-seo";
import { navigation, type NavigationChild } from "@/constants/navigation";

/** Sidebar groups whose pages ship source code into the reader's project. */
const CODE_GROUPS = new Set(["Ui Components", "Website Sections"]);

const inCodeGroup = (slug: string): boolean => {
  const walk = (children: NavigationChild[]): boolean =>
    children.some((child) => child.slug === slug || (child.children ? walk(child.children) : false));
  return navigation.some((group) => CODE_GROUPS.has(group.label) && walk(group.children));
};

/**
 * Page-level JSON-LD for a docs page, rendered into the static HTML.
 *
 *   <DocsJsonLd slug="accordion" />
 *
 * Every page gets a `TechArticle` (what the page is, in its own words). A page
 * that installs components also gets a `SoftwareSourceCode` for the code a
 * reader copies into their project, tied to the site-wide library node in
 * StructuredData.tsx. Both read the same title, description and keywords as the
 * page's `<head>` (src/lib/page-seo.ts), so the structured data cannot say
 * anything the snippet does not.
 *
 * Only fields the site can stand behind: no dates (nothing records when a page
 * last changed), ratings or review counts. Server-only — it reads the MDX
 * source — so it belongs in the page, not in a client layout.
 */
export function DocsJsonLd({ slug }: { slug: string }) {
  const source = pageSource(slug, DEFAULT_FRAMEWORK) ?? "";
  const heading = pageHeading(source) ?? slug;
  const seo = pageSeo(slug, heading, source);
  const url = `${SITE_URL}${docsHref(DEFAULT_FRAMEWORK, slug)}`;
  const description = seo.description ?? siteConfig.description;
  const ships = installedItems(source).length > 0 || inCodeGroup(slug);

  const article = {
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: heading,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: "en",
    ...(seo.keywords.length ? { keywords: seo.keywords.join(", ") } : {}),
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    ...(ships ? { about: { "@id": `${url}#source` } } : {}),
  };

  const code = {
    "@type": "SoftwareSourceCode",
    "@id": `${url}#source`,
    name: heading,
    description,
    url,
    codeRepository: links.github,
    programmingLanguage: ["TypeScript", "React"],
    runtimePlatform: "React",
    license: "https://opensource.org/licenses/MIT",
    author: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#library` },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": ships ? [article, code] : [article],
  };

  return (
    <script
      type="application/ld+json"
      // Escaping "<" keeps any string field from closing the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
