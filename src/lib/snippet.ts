import { DEFAULT_FRAMEWORK, type Framework } from "@/lib/framework";

/**
 * A code sample that differs between frameworks.
 *
 * `nextjs` is required and `reactjs` optional, so a partially-written variant
 * degrades to the Next.js text rather than to an empty tab.
 */
export type FrameworkVariants = Partial<Record<Framework, string>> & {
  nextjs: string;
};

/**
 * An authored code sample.
 *
 * A plain string means *identical in every framework*, and that is the honest
 * default: 85 of the 98 component pages have no framework-specific code at all,
 * so they keep passing strings and are never edited. Only a page whose code
 * genuinely differs — the ones importing `next/link`, `next/image` or
 * `next/dynamic` — escalates to a map:
 *
 *   usage: `import { Accordion } from "@/components/custom/blocks/Accordion";`
 *
 *   usage: {
 *     nextjs:  `import Link from "next/link"; …`,
 *     reactjs: `…<a href> instead…`,
 *   }
 *
 * This is the same axis the TSX→JS toggle already works on: the framework picks
 * the string, and the language toggle transforms whichever string was picked.
 */
export type Snippet = string | FrameworkVariants;

/** True when a snippet carries per-framework text rather than one string. */
export const isFrameworkVariants = (
  snippet: Snippet | undefined,
): snippet is FrameworkVariants =>
  typeof snippet === "object" && snippet !== null;

/**
 * Picks the text for one framework.
 *
 * Falls back to the Next.js branch when a framework has no entry, which is what
 * lets a variant be filled in one framework at a time without ever rendering a
 * blank code tab.
 */
export function resolveSnippet(
  snippet: Snippet | undefined,
  framework: Framework,
): string | undefined {
  if (snippet === undefined) return undefined;
  if (typeof snippet === "string") return snippet;
  return snippet[framework] ?? snippet[DEFAULT_FRAMEWORK];
}
