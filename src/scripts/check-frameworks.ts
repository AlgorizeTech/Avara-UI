#!/usr/bin/env node
/**
 * Framework-axis drift checks.
 *
 * Run with: npm run check:frameworks
 *
 * The docs serve two frameworks from one source tree. Four invariants make that
 * work, and every one of them fails *silently* — the build stays green, the
 * pages still render, and the damage only shows up in someone else's project or
 * in Search Console weeks later. That is what these assertions are for.
 *
 * Exit code 1 on any FAIL. WARNs are reported but do not block.
 */

import fs from "fs";
import path from "path";

import { BUILT_FRAMEWORKS, DEFAULT_FRAMEWORK, FORKED_SLUGS } from "../lib/framework";

const ROOT = path.resolve(__dirname, "../..");
const REGISTRY = path.join(ROOT, "registry.json");
const DOCS_DIR = path.join(ROOT, "src/app/docs/[framework]");

const failures: string[] = [];
const warnings: string[] = [];

const fail = (msg: string) => failures.push(msg);
const warn = (msg: string) => warnings.push(msg);

const read = (p: string) => fs.readFileSync(p, "utf-8");

/** Every `page.mdx` under the framework segment. */
function docPages(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "page.mdx") out.push(full);
    }
  };
  if (fs.existsSync(DOCS_DIR)) walk(DOCS_DIR);
  return out;
}

// ---------------------------------------------------------------------------
// 1. Shipped components must not import from `next/*`.
//
// The whole point of the injectable `linkComponent` / `imageComponent` props is
// that one source compiles in both frameworks. A single `import Link from
// "next/link"` undoes that for every Vite user who installs the component — and
// nothing else notices, because this repo *is* a Next.js app, so it builds fine.
// ---------------------------------------------------------------------------
if (!fs.existsSync(REGISTRY)) {
  console.error("FAIL: registry.json does not exist. Run: npm run generate:registry");
  process.exit(1);
}

const registry = JSON.parse(read(REGISTRY)) as {
  items: { name: string; files: { path: string }[] }[];
};

const NEXT_IMPORT = /^\s*import\s[^;]*?from\s+["']next\/[^"']+["']/m;

for (const item of registry.items) {
  for (const file of item.files ?? []) {
    const abs = path.join(ROOT, file.path);
    if (!fs.existsSync(abs)) continue;

    const match = read(abs).match(NEXT_IMPORT);
    if (match) {
      fail(
        `${file.path} imports from next/* (${match[0].trim()}). Shipped components ` +
          `must work in any React app — take the element as a prop instead ` +
          `(linkComponent / imageComponent), or defer it with React.lazy behind a ` +
          `mount gate. Item: ${item.name}`,
      );
    }
  }
}

// ---------------------------------------------------------------------------
// 2. Every forked slug must actually be forked, and must stay indexable.
//
// `[framework]/layout.tsx` noindexes the non-default framework wholesale, and a
// layout cannot see which slug is rendering — so a forked guide opts back in via
// its own `generateMetadata`. Add a slug to FORKED_SLUGS without wiring that up
// and it gets a sitemap entry and a self-canonical while staying noindexed:
// advertised and invisible at the same time.
// ---------------------------------------------------------------------------
for (const slug of FORKED_SLUGS) {
  const dir = path.join(DOCS_DIR, slug);
  const pageTsx = path.join(dir, "page.tsx");

  if (!fs.existsSync(pageTsx)) {
    fail(
      `FORKED_SLUGS lists "${slug}" but ${slug}/page.tsx does not exist. A forked ` +
        `guide needs a page.tsx that picks its content module.`,
    );
    continue;
  }

  if (!read(pageTsx).includes("buildDocsMetadata")) {
    fail(
      `${slug}/page.tsx does not use buildDocsMetadata, so it inherits the ` +
        `layout's noindex. It is in the sitemap and self-canonical but will not ` +
        `be indexed.`,
    );
  }

  for (const framework of BUILT_FRAMEWORKS) {
    const content = path.join(dir, "_content", `${framework}.mdx`);
    if (!fs.existsSync(content)) {
      fail(`Forked guide "${slug}" has no _content/${framework}.mdx.`);
    }
  }
}

// ---------------------------------------------------------------------------
// 3. No hardcoded framework paths in MDX bodies.
//
// A literal `/docs/nextjs/hero` in prose strands every React reader who clicks
// it. Markdown links are retargeted at runtime by the `a` override, but raw JSX
// (`<a href>`, `<Link href>`) is not — so it has to be caught here.
// ---------------------------------------------------------------------------
const FRAMEWORK_PATH = new RegExp(`/docs/(?:${BUILT_FRAMEWORKS.join("|")})/`);

for (const page of docPages()) {
  const rel = path.relative(ROOT, page);
  read(page)
    .split("\n")
    .forEach((line, i) => {
      // `canonical:` and `url:` inside a metadata block are supposed to name a
      // framework explicitly — that is the SEO policy, not a stray link.
      if (/canonical:|url:\s*['"]/.test(line)) return;
      if (!FRAMEWORK_PATH.test(line)) return;

      if (/<a\s|<Link\s|href=/.test(line)) {
        fail(
          `${rel}:${i + 1} hardcodes a framework path in a raw JSX link. Use ` +
            `<DocLink to="slug"> so it follows the reader's framework.`,
        );
      } else {
        warn(`${rel}:${i + 1} mentions a framework-specific docs path.`);
      }
    });
}

// ---------------------------------------------------------------------------
// 4. Variant snippet maps must actually differ.
//
// `{ nextjs, reactjs }` exists for code that genuinely diverges. Two identical
// branches should be a plain string; a `reactjs` branch still carrying a `next/`
// import is the copy-paste-and-forget failure, and the most common way
// dual-framework docs rot.
// ---------------------------------------------------------------------------
const VARIANT_MAP = /(\w+)\s*=\s*\{\s*nextjs:\s*(\w+),\s*reactjs:\s*(\w+)\s*\}/g;

for (const page of docPages()) {
  const src = read(page);
  const rel = path.relative(ROOT, page);

  for (const m of src.matchAll(VARIANT_MAP)) {
    const [, name, nextVar, reactVar] = m;
    const grab = (v: string) =>
      src.match(new RegExp("export const " + v + " = `([\\s\\S]*?)`;"))?.[1];

    const a = grab(nextVar);
    const b = grab(reactVar);
    if (a === undefined || b === undefined) continue;

    if (a === b) {
      warn(
        `${rel}: variant "${name}" has identical branches — use a plain string.`,
      );
    }
    if (/from\s+["']next\//.test(b)) {
      fail(
        `${rel}: variant "${name}" has a reactjs branch that still imports from ` +
          `next/*. It was probably copied from the nextjs branch and not edited.`,
      );
    }
  }
}

// ---------------------------------------------------------------------------

for (const w of warnings) console.warn(`WARN  ${w}`);
for (const f of failures) console.error(`FAIL  ${f}`);

if (failures.length) {
  console.error(`\n${failures.length} failure(s).`);
  process.exit(1);
}

console.log(
  `✔ Framework checks passed (${registry.items.length} registry items, ` +
    `${docPages().length} doc pages, ${FORKED_SLUGS.length} forked guides, ` +
    `default "${DEFAULT_FRAMEWORK}").` +
    (warnings.length ? ` ${warnings.length} warning(s).` : ""),
);
