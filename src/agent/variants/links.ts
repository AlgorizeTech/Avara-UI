/**
 * URLs and page facts derived from a variants file. Site and build scripts
 * only: it reads the docs MDX with `fs`, so it runs at build time (the /view
 * pages, and later the generators). Relative imports only, because the build
 * scripts load it under tsx.
 */

import fs from "node:fs";
import path from "node:path";

import { DEFAULT_FRAMEWORK, docsHref } from "../../lib/framework";
import { parseShowcases } from "../../lib/mdx-showcases";
import { slugify } from "../../lib/open-in-v0";
import { pageVariants } from "./index";
import type { PageVariants, Variant } from "./types";

const DOCS_DIR = path.join(process.cwd(), "src/app/docs/[framework]");

/** `/view/hero` (the gallery) or `/view/hero/honeycomb` (one variant). */
export const viewHref = (slug: string, id?: string) =>
  id ? `/view/${slug}/${id}` : `/view/${slug}`;

export const findPage = (slug: string): PageVariants | undefined =>
  pageVariants.find((page) => page.slug === slug);

/** The page's H1, for headings ("Hero"); falls back to the slug. */
export function pageTitle(slug: string): string {
  try {
    const source = fs.readFileSync(path.join(DOCS_DIR, slug, "page.mdx"), "utf-8");
    const heading = source.match(/^# (.+)$/m)?.[1];
    if (heading) return heading.replace(/[`*_]/g, "").trim();
  } catch {
    // fall through
  }
  return slug;
}

/**
 * `/docs/nextjs/<slug>#<anchor>`: the docs section that shows this variant.
 * The anchor is the example's explicit `id`, else `slugify(title)`, the same
 * rule `ExampleCard` uses for its heading.
 */
export function docsHrefFor(page: PageVariants, variant: Variant): string {
  const base = docsHref(DEFAULT_FRAMEWORK, page.slug);
  try {
    const mdx = fs.readFileSync(path.join(DOCS_DIR, page.slug, "page.mdx"), "utf-8");
    const example = parseShowcases(mdx)
      .filter((showcase) => showcase.name === variant.demo)
      .flatMap((showcase) => showcase.examples)
      .find((e) => e.title === variant.example);
    if (example) return `${base}#${example.id ?? slugify(example.title)}`;
  } catch {
    // fall through to the page itself
  }
  return base;
}
