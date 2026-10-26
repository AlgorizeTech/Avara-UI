import { REGISTRY_NAMESPACE, SITE_URL, siteConfig, links, socialLinks } from "@/config/site";

/**
 * Site-wide JSON-LD, rendered into the HTML.
 *
 * Server-rendered on purpose: it used to be injected from a `useEffect`, which
 * only crawlers that execute JavaScript ever saw, and only after a timer.
 *
 * Every field is something the site can stand behind. Dropped from the earlier
 * version: a SearchAction pointing at `/docs?search=` (nothing handles that
 * query), a logo URL that 404'd, a `dateModified` of whenever the page was
 * viewed, and a version, founding date and address nothing else records.
 */
const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: siteConfig.author,
  url: links.githubOrg,
  logo: `${SITE_URL}/favicon/android-chrome-512x512.png`,
  ...(socialLinks.length ? { sameAs: socialLinks } : {}),
};

/**
 * Other ways people write the name — run together ("AvaraUI") and as the
 * registry namespace ("avara-ui") — so Google can tie those searches to the
 * site name. Derived, so they follow the environment.
 */
const alternateNames = [
  ...new Set([siteConfig.name.replace(/\s+/g, ""), REGISTRY_NAMESPACE.slice(1)]),
].filter((name) => name !== siteConfig.name);

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: siteConfig.name,
      ...(alternateNames.length ? { alternateName: alternateNames } : {}),
      url: SITE_URL,
      description: siteConfig.tagline,
      inLanguage: "en",
      publisher: { "@id": organization["@id"] },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${SITE_URL}/#library`,
      name: siteConfig.name,
      description: siteConfig.description,
      url: SITE_URL,
      codeRepository: links.github,
      programmingLanguage: ["TypeScript", "React"],
      license: "https://opensource.org/licenses/MIT",
      author: { "@id": organization["@id"] },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output cannot close the script tag except via "</";
      // escaping "<" keeps any string field from doing so.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
