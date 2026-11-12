/**
 * The docs as one text document for language models.
 *
 * Backs /llms-full.txt and /llm. Every page's body is read from the Markdown
 * mirror that `npm run build:md` writes to public/docs-md, which is already the
 * page as an LLM should read it: constants resolved, live examples replaced by
 * their source, install commands spelled out. Reading it here, instead of
 * re-deriving it from the MDX, means the three outputs (the page, the mirror,
 * this file) cannot disagree. The build runs `build:md` before `next build`.
 *
 * Node-only: reads from disk. Call it from server code at build time.
 */

import fs from "node:fs";
import path from "node:path";

import { navigation, type NavigationChild } from "@/constants/navigation";
import { pageExists } from "@/lib/docs-source";
import {
  BUILT_FRAMEWORKS,
  DEFAULT_FRAMEWORK,
  FORKED_SLUGS,
  FRAMEWORK_META,
  docsHref,
  docsMarkdownHref,
  type Framework,
} from "@/lib/framework";

const MD_DIR = path.join(process.cwd(), "public/docs-md");

export type LlmPage = {
  /** `nextjs/accordion` — framework and slug, as the Markdown file names them. */
  id: string;
  group: string;
  title: string;
  description: string;
  /** The page itself, not its Markdown mirror. */
  url: string;
  markdownUrl: string;
  /** The page's Markdown without its front matter. */
  body: string;
};

/** Splits a mirror file into its front-matter fields and its body. */
function parseMirror(raw: string): { fields: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { fields: {}, body: raw.trim() };

  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^(\w+):\s*(.*)$/);
    if (!field) continue;
    fields[field[1]] = field[2].replace(/^"(.*)"$/, "$1").replace(/\\"/g, '"');
  }
  return { fields, body: raw.slice(match[0].length).trim() };
}

const flatten = (children: NavigationChild[]): NavigationChild[] =>
  children.flatMap((child) => [child, ...flatten(child.children ?? [])]);

function readPage(framework: Framework, slug: string, group: string): LlmPage | undefined {
  const file = path.join(MD_DIR, docsMarkdownHref(framework, slug).replace(/^\/docs-md\//, ""));
  if (!fs.existsSync(file)) return undefined;

  const { fields, body } = parseMirror(fs.readFileSync(file, "utf8"));
  return {
    id: `${framework}/${slug}`,
    group,
    title: fields.title ?? slug,
    description: fields.description ?? "",
    url: fields.url ?? docsHref(framework, slug),
    markdownUrl: docsMarkdownHref(framework, slug),
    body,
  };
}

/**
 * Every docs page, in sidebar order. Pages that are identical across frameworks
 * appear once, for the default framework; the forked guides (Installation,
 * Quick Start) appear once per framework because they are different documents.
 */
export function llmPages(): LlmPage[] {
  const pages: LlmPage[] = [];
  const seen = new Set<string>();

  for (const group of navigation) {
    for (const child of flatten(group.children)) {
      const slug = child.slug;
      if (!slug || !pageExists(slug)) continue;

      const frameworks = FORKED_SLUGS.includes(slug) ? BUILT_FRAMEWORKS : [DEFAULT_FRAMEWORK];
      for (const framework of frameworks) {
        const id = `${framework}/${slug}`;
        if (seen.has(id)) continue;
        seen.add(id);

        const page = readPage(framework, slug, group.label);
        if (!page) continue;
        if (FORKED_SLUGS.includes(slug)) {
          page.title = `${page.title} (${FRAMEWORK_META[framework].label})`;
        }
        pages.push(page);
      }
    }
  }

  return pages;
}

/** The Introduction as the mirror publishes it, front matter kept. */
export function introductionMarkdown(): string | undefined {
  const file = path.join(MD_DIR, `${DEFAULT_FRAMEWORK}-index.md`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8").trim() : undefined;
}
