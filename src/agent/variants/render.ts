/**
 * Everything an agent reads about a page's variants, built once from the
 * variants file so the surfaces cannot disagree: the "For AI agents" block on
 * the docs page, its Markdown copy, the agent index, /llms.txt, the skill and
 * the registry item descriptions.
 *
 * Site and build scripts only: it reads the docs MDX through `./links`.
 * Relative imports only, because the registry and Markdown scripts load it
 * under tsx.
 */

import { SITE_URL } from "../../config/site";
import { REGISTRY_NAMESPACE } from "../../lib/registry";
import { docsHrefFor, findPage, viewHref } from "./links";
import { pageVariants } from "./index";
import type { PageVariants, Variant } from "./types";

/** `https://…/view/hero` (the gallery) or `https://…/view/hero/honeycomb`. */
export const viewUrl = (slug: string, id?: string) => `${SITE_URL}${viewHref(slug, id)}`;

export const installCommand = (item: string) => `npx shadcn@latest add ${REGISTRY_NAMESPACE}/${item}`;

/** The page's slug as words, for sentences: "scroll-stack" becomes "scroll stack". */
export const pageNoun = (slug: string) => slug.replace(/-/g, " ");

export type AgentVariantRow = {
  id: string;
  label: string;
  summary: string;
  bestFor: string[];
  avoidIf: string[];
  traits: string[];
  /** The registry item to install. Several looks of one component share it. */
  item: string;
  install: string;
  /** The variant's own live page. */
  viewUrl: string;
  /** The docs section that shows it. */
  docsUrl: string;
};

export const variantRow = (page: PageVariants, variant: Variant): AgentVariantRow => ({
  id: variant.id,
  label: variant.label,
  summary: variant.summary,
  bestFor: variant.bestFor,
  avoidIf: variant.avoidIf,
  traits: variant.traits,
  item: variant.item,
  install: installCommand(variant.item),
  viewUrl: viewUrl(page.slug, variant.id),
  docsUrl: `${SITE_URL}${docsHrefFor(page, variant)}`,
});

/**
 * The rule, in one place. `page` is a page with variants. Written to be read
 * by an agent that has seen nothing else from this site.
 */
export const askRule = (page: PageVariants) =>
  `This page has ${page.variants.length} variants. If the user has not named one and has not asked you to choose for them, ` +
  "ask which they want before you install anything or write code, and show every option with its live link. " +
  "If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. " +
  "If the user named a variant, use it and do not ask.";

export type AgentBlock = {
  slug: string;
  rule: string;
  galleryUrl: string;
  intro: string;
  whenNot: { use: string; slug: string; reason: string }[];
  gotchas: string[];
  variants: AgentVariantRow[];
};

export function agentBlock(page: PageVariants): AgentBlock {
  return {
    slug: page.slug,
    rule: askRule(page),
    galleryUrl: viewUrl(page.slug),
    intro: page.intro,
    whenNot: page.whenNot ?? [],
    gotchas: page.gotchas ?? [],
    variants: page.variants.map((variant) => variantRow(page, variant)),
  };
}

export function agentBlockForSlug(slug: string): AgentBlock | undefined {
  const page = findPage(slug);
  return page ? agentBlock(page) : undefined;
}

/** The block as Markdown, for the page's Markdown copy. */
export function agentBlockMarkdown(
  block: AgentBlock,
  docsUrlFor: (slug: string) => string,
): string {
  const lines: string[] = [
    "## For AI agents",
    "",
    `**Ask before you pick.** ${block.rule}`,
    "",
    `All ${block.variants.length} options as live previews: ${block.galleryUrl}`,
    "",
    `**When to use it.** ${block.intro}`,
  ];

  if (block.whenNot.length) {
    lines.push("", "**When to use something else:**", "");
    for (const other of block.whenNot) {
      lines.push(`- [${other.use}](${docsUrlFor(other.slug)}): ${other.reason}.`);
    }
  }
  if (block.gotchas.length) {
    lines.push("", "**Gotchas:**", "");
    for (const gotcha of block.gotchas) lines.push(`- ${gotcha}`);
  }

  lines.push("", `### The ${block.variants.length} variants`, "");
  block.variants.forEach((row, index) => {
    lines.push(
      `${index + 1}. **${row.label}** (\`${row.id}\`): ${row.summary}`,
      `   - Live: ${row.viewUrl}`,
      `   - Best for: ${row.bestFor.join("; ")}`,
      `   - Avoid if: ${row.avoidIf.join("; ")}`,
      `   - Traits: ${row.traits.join(", ")}`,
      `   - Install: \`${row.install}\``,
      `   - Docs: ${row.docsUrl}`,
    );
  });
  return lines.join("\n");
}

/**
 * The sentence that opens a variant item's registry description. The shadcn MCP
 * shows a description in full; the CLI's `shadcn search` cuts it at 80
 * characters, so the instruction and the viewer link come first, before the
 * item's own description (AGENT-WORKFLOW-PLAN.md, Phase 0 item 1).
 *
 * Returns undefined for an item that is not a variant of any page. A Motion
 * twin (`<name>-motion`) is the same variant as its base item.
 */
export function itemNotice(itemName: string): string | undefined {
  const base = itemName.replace(/-motion$/, "");
  for (const page of pageVariants) {
    const mine = page.variants.filter((variant) => variant.item === base);
    if (!mine.length) continue;

    const lead = `Ask the user to pick one of ${page.variants.length} ${pageNoun(page.slug)} variants: ${viewUrl(page.slug)}.`;
    const which =
      mine.length === 1
        ? `This is the ${mine[0].label}.`
        : `This item holds ${mine.length} of them as looks of one component (${mine.map((variant) => variant.id).join(", ")}).`;
    return `${lead} ${which} Skip the question if the user already named one.`;
  }
  return undefined;
}
