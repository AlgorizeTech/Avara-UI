import type { Metadata } from "next";

import { SITE_NAME, siteConfig } from "@/config/site";
import { pageHeading, pageSource, pageSummary } from "@/lib/docs-source";
import {
  DEFAULT_FRAMEWORK,
  type Framework,
  FRAMEWORK_META,
  docsHref,
} from "@/lib/framework";

/**
 * The social card every page shares. Set on each page explicitly because a
 * page's `openGraph` replaces its parent's wholesale — a page that sets a title
 * but no image would otherwise ship a card with no picture.
 */
const OG_IMAGE = {
  url: siteConfig.ogImage,
  width: 1733,
  height: 907,
  alt: siteConfig.fullName,
  type: "image/png",
};

/** Search engines cut descriptions at roughly this many characters. */
const MAX_DESCRIPTION = 160;

/** Shortens to whole sentences, or failing that whole words, within the limit. */
function clampDescription(text: string): string {
  if (text.length <= MAX_DESCRIPTION) return text;
  const head = text.slice(0, MAX_DESCRIPTION);
  const sentenceEnd = Math.max(head.lastIndexOf(". "), head.lastIndexOf("! "), head.lastIndexOf("? "));
  if (sentenceEnd > 80) return head.slice(0, sentenceEnd + 1);
  return `${head.slice(0, head.lastIndexOf(" ", MAX_DESCRIPTION - 1)).replace(/[,;:—–-]$/, "")}…`;
}

/**
 * Title, description, canonical and social cards, all from the same values.
 * `title` is used as given — include the site name.
 */
export function pageMetadata({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: url },
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
 * The title is the page's H1 and the description its lead sentences (or the
 * registry description of what it installs), so the search snippet always says
 * what the page says. Pass `title` / `description` only where the page's own
 * words are not the right snippet.
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

  return pageMetadata({
    title: `${heading} - ${SITE_NAME}`,
    description: clampDescription(
      overrides.description ?? pageSummary(source) ?? siteConfig.description,
    ),
    url: docsHref(DEFAULT_FRAMEWORK, slug),
  });
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
      title: `${title} (${FRAMEWORK_META[framework].label}) - ${SITE_NAME}`,
      description: clampDescription(description),
      url: docsHref(framework, slug),
    }),
    keywords,
  };
}
