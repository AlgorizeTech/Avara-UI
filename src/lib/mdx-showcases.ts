/**
 * Reads the `<ExampleShowcase>` blocks, `<Installation>` tags and headings out
 * of a docs page's MDX source, without compiling it.
 *
 * Shared by `npm run check:variants` (src/scripts/check-variants.ts) and the
 * variant viewer (/view), which needs an example's anchor at build time. Site
 * and build scripts only: it is never shipped. Relative imports only, because
 * the build scripts load it under tsx.
 */

import { slugify } from "./open-in-v0";

export type ParsedExample = { title: string; id?: string; hasVariantProp: boolean };
export type ParsedShowcase = { name: string; examples: ParsedExample[] };

/** Read a JS string literal starting at `i` (the opening quote). */
function readString(src: string, i: number): { value: string; end: number } {
  const quote = src[i];
  let j = i + 1;
  let value = "";
  while (j < src.length) {
    const c = src[j];
    if (c === "\\") {
      value += src[j + 1] ?? "";
      j += 2;
      continue;
    }
    if (c === quote) return { value, end: j + 1 };
    value += c;
    j++;
  }
  return { value, end: j };
}

/**
 * Walk the `examples={[ ... ]}` array of one <ExampleShowcase> and collect each
 * top-level example's `title`, optional `id`, and whether its `props` set a
 * `variant`. Strings, template literals and comments are skipped so code
 * samples inside `usage:` cannot be mistaken for examples.
 */
function parseExamples(src: string, arrayStart: number): ParsedExample[] {
  const examples: ParsedExample[] = [];
  let depth = 0;
  let objStart = -1;
  let current: { title?: string; id?: string } = {};
  let prevSignificant = "";
  let i = arrayStart;

  while (i < src.length) {
    const c = src[i];

    if (c === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") i++;
      continue;
    }
    if (c === "/" && src[i + 1] === "*") {
      const end = src.indexOf("*/", i + 2);
      i = end === -1 ? src.length : end + 2;
      continue;
    }
    if (c === '"' || c === "'") {
      i = readString(src, i).end;
      prevSignificant = c;
      continue;
    }
    if (c === "`") {
      let j = i + 1;
      while (j < src.length && src[j] !== "`") j += src[j] === "\\" ? 2 : 1;
      i = j + 1;
      prevSignificant = "`";
      continue;
    }

    if (c === "[" || c === "{" || c === "(") {
      depth++;
      if (c === "{" && depth === 2) {
        objStart = i;
        current = {};
      }
      prevSignificant = c;
      i++;
      continue;
    }
    if (c === "]" || c === "}" || c === ")") {
      if (c === "}" && depth === 2 && objStart !== -1) {
        const objectSource = src.slice(objStart, i + 1);
        if (current.title !== undefined) {
          examples.push({
            title: current.title,
            id: current.id,
            hasVariantProp: /\bprops\s*:\s*\{[^}]*\bvariant\s*:/.test(objectSource),
          });
        }
        objStart = -1;
      }
      depth--;
      prevSignificant = c;
      if (depth === 0) break;
      i++;
      continue;
    }

    // A property key directly inside an example object.
    if (depth === 2 && (prevSignificant === "{" || prevSignificant === ",")) {
      const m = /^(title|id)\s*:\s*(["'])/.exec(src.slice(i, i + 20));
      if (m) {
        const quoteAt = i + m[0].length - 1;
        const { value, end } = readString(src, quoteAt);
        if (m[1] === "title") current.title = value;
        else current.id = value;
        i = end;
        prevSignificant = m[2];
        continue;
      }
    }

    if (!/\s/.test(c)) prevSignificant = c;
    i++;
  }

  return examples;
}

export function parseShowcases(mdx: string): ParsedShowcase[] {
  const out: ParsedShowcase[] = [];
  const open = /<ExampleShowcase\b/g;
  let match: RegExpExecArray | null;
  while ((match = open.exec(mdx))) {
    const tail = mdx.slice(match.index);
    const name = /\bname=(?:"([^"]+)"|\{"([^"]+)"\})/.exec(tail);
    const arr = /\bexamples=\{\[/.exec(tail);
    if (!name || !arr) continue;
    const examples = parseExamples(mdx, match.index + arr.index + arr[0].length - 1);
    out.push({ name: name[1] ?? name[2], examples });
  }
  return out;
}

/** Names of every `<Installation name="…">` on the page. */
export function parseInstallations(mdx: string): string[] {
  const names = new Set<string>();
  for (const m of mdx.matchAll(/<Installation\b[^>]*?\bname="([^"]+)"/g)) names.add(m[1]);
  return [...names];
}

/** Slugs of the page's own `##`/`###` headings, ignoring fenced code. */
export function headingSlugs(mdx: string): Set<string> {
  const slugs = new Set<string>();
  let inFence = false;
  for (const line of mdx.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const m = /^#{2,4}\s+(.+?)\s*$/.exec(line);
    if (m) slugs.add(slugify(m[1].replace(/[`*_]/g, "")));
  }
  return slugs;
}
