import type { Metadata } from "next";

import { SITE_NAME, siteConfig } from "@/config/site";
import { pageHeading, pageSource } from "@/lib/docs-source";
import { clampDescription, pageSeo } from "@/lib/page-seo";
import {
  DEFAULT_FRAMEWORK,
  type Framework,
  FRAMEWORK_META,
  docsHref,
  docsMarkdownHref,
} from "@/lib/framework";

/**
 * The social card every page shares. Set on each page explicitly because a
 * page's `openGraph` replaces its parent's wholesale — a page that sets a title
 * but no image would otherwise ship a card with no picture.
 */
const OG_IMAGE = {
  url: siteConfig.ogImage,
  width: 1200,
  height: 630,
  alt: siteConfig.fullName,
  type: "image/png",
};

/**
 * Title, description, canonical and social cards, all from the same values.
 * `title` is used as given — include the site name.
 */
export function pageMetadata({
  title,
  description,
  url,
  markdown,
}: {
  title: string;
  description: string;
  url: string;
  /** The page's Markdown mirror, advertised so AI agents can find it. */
  markdown?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(markdown ? { types: { "text/markdown": markdown } } : {}),
    },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      locale: "en_US",
      title,
      description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/**
 * Metadata for a docs page, read from the page itself.
 *
 *   export const metadata = docsPageMetadata("accordion");
 *
 * Title, description and keywords come from src/lib/page-seo.ts, which builds
 * them from the page's sidebar group, H1 and lead sentences (or the registry
 * description of what it installs), so the search snippet always says what the
 * page says. Pass `title` (the page's name) / `description` only where the
 * page's own words are not the right snippet.
 *
 * The canonical is the default framework's URL on both frameworks. Component
 * pages are the same document at two addresses — the components import nothing
 * from `next/*` — so the React copy points search engines at the Next.js one
 * rather than competing with it. The forked guides, which genuinely differ,
 * use `buildDocsMetadata` below instead.
 */
export function docsPageMetadata(
  slug: string,
  overrides: { title?: string; description?: string } = {},
): Metadata {
  const source = pageSource(slug, DEFAULT_FRAMEWORK) ?? "";
  const heading = overrides.title ?? pageHeading(source) ?? slug;
  const seo = pageSeo(slug, heading, source, overrides.description);

  return {
    ...pageMetadata({
      title: seo.title,
      description: seo.description ?? siteConfig.description,
      url: docsHref(DEFAULT_FRAMEWORK, slug),
      markdown: docsMarkdownHref(DEFAULT_FRAMEWORK, slug),
    }),
    // Always set, even empty, so a page never inherits the homepage's terms.
    keywords: seo.keywords,
  };
}

/**
 * Builds page metadata for a forked guide page.
 *
 * Only the pages that genuinely differ per framework need this. A page may
 * export `metadata` or `generateMetadata`, never both, so this exists for the
 * handful that must vary the title.
 *
 * These pages are **self-canonical**, unlike the rest of the docs: they
 * describe different scaffolders and answer a query the other cannot, so
 * pointing them at each other would tell Google to drop the only pages a Vite
 * reader is searching for.
 *
 * `title` is the search title without the brand, which is appended; it should
 * name the framework, since that is what tells the two pages apart.
 */
export function buildDocsMetadata({
  framework,
  slug,
  title,
  description,
  keywords,
}: {
  framework: Framework;
  slug: string;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  return {
    ...pageMetadata({
      title: title.includes(FRAMEWORK_META[framework].label)
        ? `${title} - ${SITE_NAME}`
        : `${title} (${FRAMEWORK_META[framework].label}) - ${SITE_NAME}`,
      description: clampDescription(description),
      url: docsHref(framework, slug),
      markdown: docsMarkdownHref(framework, slug),
    }),
    keywords,
  };
}
