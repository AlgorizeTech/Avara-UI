import { SITE_URL, links, siteConfig } from "@/config/site";
import { DEFAULT_FRAMEWORK, docsHref, type Framework } from "@/lib/framework";
import { installedItems, pageHeading, pageQuestions, pageSource } from "@/lib/docs-source";
import { docsPageModified } from "@/lib/last-modified";
import { pageSeo } from "@/lib/page-seo";
import { navigation, type NavigationChild } from "@/constants/navigation";

const UPDATED_DATE = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

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
 * It also prints when the page last changed, from git history
 * (src/lib/last-modified.ts), because a date in structured data should be one a
 * reader can see. A build without history prints and declares no date.
 *
 * Only fields the site can stand behind: no ratings or review counts.
 * Server-only — it reads the MDX source — so it belongs in the page, not in a
 * client layout.
 */
export function DocsJsonLd({
  slug,
  framework = DEFAULT_FRAMEWORK,
}: {
  slug: string;
  /** Only the forked guides, whose per-framework copies are separate pages, pass this. */
  framework?: Framework;
}) {
  const source = pageSource(slug, framework) ?? "";
  const heading = pageHeading(source) ?? slug;
  const seo = pageSeo(slug, heading, source);
  const url = `${SITE_URL}${docsHref(framework, slug)}`;
  const description = seo.description ?? siteConfig.description;
  const ships = installedItems(source).length > 0 || inCodeGroup(slug);
  const modified = docsPageModified(slug, framework);

  const article = {
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: heading,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: "en",
    ...(modified ? { dateModified: modified } : {}),
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
    <>
      {modified && (
        <p className="not-prose mt-16 text-[13px] text-foreground/60">
          Last updated <time dateTime={modified}>{UPDATED_DATE.format(new Date(modified))}</time>
        </p>
      )}
      <script
        type="application/ld+json"
        // Escaping "<" keeps any string field from closing the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

/**
 * FAQPage JSON-LD for a page of questions, read from its `## …?` headings. The
 * docs FAQ uses it; component pages should not, since a question repeated across
 * dozens of pages is the mass-produced pattern search engines discount.
 */
export function FaqJsonLd({ slug }: { slug: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pageQuestions(pageSource(slug, DEFAULT_FRAMEWORK) ?? "").map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Escaping "<" keeps any string field from closing the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
