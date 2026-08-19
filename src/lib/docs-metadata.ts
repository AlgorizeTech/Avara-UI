import type { Metadata } from "next";

import {
  DEFAULT_FRAMEWORK,
  type Framework,
  FRAMEWORK_META,
  docsHref,
} from "@/lib/framework";

/**
 * Builds page metadata for a forked guide page.
 *
 * Only the pages that genuinely differ per framework need this — the other 99
 * keep their static `metadata` export, which is both simpler to read and
 * impossible to get wrong. A page may export `metadata` or `generateMetadata`,
 * never both, so this exists for the handful that must vary the title.
 *
 * Canonical stays pinned to the Next.js twin. The project is a Next.js project
 * and its docs rank as such; the React pages are a second address for closely
 * related content, which is exactly the case `rel=canonical` is for. Revisit
 * only if the two versions diverge far enough to be genuinely different
 * documents competing for different queries.
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
  const suffix = FRAMEWORK_META[framework].label;
  const fullTitle = `${title} - ${suffix}`;
  const url = docsHref(framework, slug);

  return {
    title: fullTitle,
    description,
    keywords,
    openGraph: {
      title: fullTitle,
      description,
      type: "article",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: docsHref(DEFAULT_FRAMEWORK, slug),
    },
  };
}
