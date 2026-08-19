import type { Metadata } from "next";

import { type Framework, FRAMEWORK_META, docsHref } from "@/lib/framework";

/**
 * Builds page metadata for a forked guide page.
 *
 * Only the pages that genuinely differ per framework need this — the other 99
 * keep their static `metadata` export, which is both simpler to read and
 * impossible to get wrong. A page may export `metadata` or `generateMetadata`,
 * never both, so this exists for the handful that must vary the title.
 *
 * These pages are **self-canonical**, unlike the rest of the docs.
 *
 * Everywhere else, the two framework URLs serve identical bytes and every React
 * page names its Next.js twin as canonical — correct, because there is only one
 * document. This factory is used only by the forked guides (see `FORKED_SLUGS`),
 * where that stops being true: they describe different scaffolders and answer a
 * query the other cannot. Pointing them at each other would tell Google to drop
 * the only pages a Vite reader is searching for.
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
      canonical: url,
    },
  };
}
