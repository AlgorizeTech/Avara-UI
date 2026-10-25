/**
 * What a docs page says about itself, read from its MDX source.
 *
 * Shared by the page metadata (src/lib/docs-metadata.ts) and /llms.txt, so the
 * search snippet, the social card and the LLM index all describe a page with
 * the same words — the page's own — and none of them can drift from it.
 *
 * Node-only: reads from disk. Call it from server code at build time.
 */

import fs from "node:fs";
import path from "node:path";

import { SITE_NAME } from "@/config/site";
import { countComponents } from "@/lib/component-count";
import { FORKED_SLUGS, type Framework } from "@/lib/framework";
import { REGISTRY_NAMESPACE } from "@/lib/registry";

type RegistryItem = { name: string; description?: string };

export const DOCS_DIR = path.join(process.cwd(), "src/app/docs/[framework]");

export const registryItems = (
  JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "registry.json"), "utf8"),
  ) as { items: RegistryItem[] }
).items;

export const itemsByName = new Map(registryItems.map((item) => [item.name, item]));

export const COMPONENT_COUNT = countComponents(registryItems);

/** Below this, a lead sentence is a teaser rather than a description. */
const MIN_SUMMARY_LENGTH = 80;

/** The MDX source behind a slug for one framework, if the page is MDX. */
export function pageSource(slug: string, framework: Framework): string | undefined {
  const file = FORKED_SLUGS.includes(slug)
    ? path.join(DOCS_DIR, slug, "_content", `${framework}.mdx`)
    : path.join(DOCS_DIR, slug, "page.mdx");
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : undefined;
}

export const pageExists = (slug: string) =>
  ["page.mdx", "page.tsx"].some((file) =>
    fs.existsSync(path.join(DOCS_DIR, slug, file)),
  );

/** The site values a page prints as `{NAME}`, resolved the way the page renders them. */
const PAGE_CONSTANTS: Record<string, string> = {
  COMPONENT_COUNT: String(COMPONENT_COUNT),
  SITE_NAME,
  REGISTRY_NAMESPACE,
};

/** Markdown and JSX reduced to the plain text a reader sees. */
const plainText = (text: string) =>
  text
    .replace(/\{(COMPONENT_COUNT|SITE_NAME|REGISTRY_NAMESPACE)\}/g, (_, name: string) => PAGE_CONSTANTS[name])
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    // JSX goes; a tag quoted in inline code (`<select>`) is prose and stays.
    .replace(/`[^`]*`|<[^>]+>/g, (match) => (match.startsWith("`") ? match : ""))
    .replace(/\s+/g, " ")
    .trim();

/** The page's H1, as text. */
export function pageHeading(source: string): string | undefined {
  const heading = source.match(/^# (.+)$/m)?.[1];
  return heading ? plainText(heading).replace(/`/g, "") : undefined;
}

/**
 * The first sentences under the page's H1 — the page's own summary of itself.
 *
 * Only the paragraph directly under the heading counts. If the heading is
 * followed by code or an export block instead, the page has no lead and the
 * caller falls back to the registry description rather than guessing.
 */
export function leadSentence(source: string): string | undefined {
  const lines = source.split(/\r?\n/);
  const heading = lines.findIndex((line) => /^# /.test(line));
  if (heading < 0) return undefined;

  const paragraph: string[] = [];
  for (const raw of lines.slice(heading + 1)) {
    const line = raw.trim();
    if (!line) {
      if (paragraph.length) break;
      continue;
    }
    if (!paragraph.length) {
      // A self-closing component on its own line (the framework switch note).
      if (/^<[A-Z][^>]*\/>$/.test(line)) continue;
      // Anything but prose under the heading means the page has no lead.
      if (/^[<{#`|>*-]|^(import|export)\s/.test(line)) break;
    } else if (/^(```|<|\{)|^(import|export)\s/.test(line)) {
      break;
    }
    paragraph.push(line);
  }
  if (!paragraph.length) return undefined;

  // Whole sentences until the summary says something: a short opener such as
  // "Two very different answers to the same problem." needs the one after it.
  let summary = "";
  for (const sentence of plainText(paragraph.join(" ")).split(/(?<=[.!?])\s+(?=[A-Z`])/)) {
    summary = summary ? `${summary} ${sentence}` : sentence;
    if (summary.length >= MIN_SUMMARY_LENGTH) break;
  }
  return summary;
}

/** Registry items a page installs, in the order it lists them. */
export function installedItems(source: string): string[] {
  const names = [...source.matchAll(/<Installation\s+name="([^"]+)"/g)].map(
    (match) => match[1],
  );
  return [...new Set(names)].filter((name) => itemsByName.has(name));
}

/** The page's lead, or failing that the registry description of what it installs. */
export function pageSummary(source: string): string | undefined {
  return (
    leadSentence(source) ??
    itemsByName.get(installedItems(source)[0] ?? "")?.description
  );
}
