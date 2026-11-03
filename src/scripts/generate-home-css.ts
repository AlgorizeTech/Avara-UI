/**
 * Writes src/app/home.generated.css: globals.css, but with Tailwind told to
 * look only at the files the home route actually imports.
 *
 * Tailwind builds one stylesheet from every file it can see, and this repo is
 * mostly docs: pages, demos and hundreds of registry components. Served to the
 * home page that is ~110 KB of CSS (gzipped) that blocks the first paint, of
 * which ~70 KB styles things the home page never renders. The home route now
 * loads this file instead (src/app/page.tsx); docs, themes, preview and the
 * error pages keep loading the full globals.css.
 *
 * The list is not maintained by hand. It is the import graph of the root
 * layout and the home page (static imports, dynamic import() and require), so
 * a component added to the home page is covered the next time this runs, which
 * is `npm run dev` and `npm run build`. A file that is not in the graph can't
 * contribute classes, which is the one way this could go wrong, so keep home
 * components importable from src/app/layout.tsx or src/app/page.tsx.
 *
 * One thing Tailwind cannot see by reading files is a class assembled at
 * runtime. WalletBlock does `dark:${card.textColorDark}`, with the values in
 * wallet-data.ts, so `dark:text-white/70` exists in no file. The full build only
 * has it because some docs file happens to spell it out. So this also finds
 * props used as `dark:${x.prop}` in the graph and safelists `dark:<value>` for
 * every literal that prop is given there (`@source inline(...)`), but only
 * those the full stylesheet really contains: the home page must look exactly as
 * it did with it, and a class nobody wrote out was never applied, so adding it
 * would change the design. (Do not spell such a class out in a comment here:
 * Tailwind scans this file too, which would make it exist.)
 *
 * Everything but the Tailwind import line is copied from globals.css as is, so
 * the theme tokens, base layer and custom rules cannot drift apart.
 *
 *   npm run generate:home-css
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const APP = path.join(SRC, "app");
const GLOBALS = path.join(APP, "globals.css");
const OUT = path.join(APP, "home.generated.css");

/** Entry points of everything the home page (and its error states) is built from. */
const ENTRIES = [
  "app/layout.tsx",
  "app/page.tsx",
  // Rendered inside the home route when something goes wrong or a link 404s.
  "app/not-found.tsx",
  "app/error.tsx",
  "app/global-error.tsx",
];

const CODE = /\.(tsx?|jsx?)$/;
/** Resolution order, matching how the bundler would resolve an extensionless import. */
const EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", ".json", ".css"];
const IMPORT =
  /(?:\bfrom\s+|\bimport\s*\(\s*|\brequire\(\s*|\bimport\s+)["']([^"']+)["']/g;

function resolveImport(from: string, spec: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = path.join(SRC, spec.slice(2));
  else if (spec.startsWith(".")) base = path.resolve(path.dirname(from), spec);
  else return null; // a package: not our source
  const candidates = [
    base,
    ...EXTENSIONS.map((ext) => base + ext),
    ...EXTENSIONS.map((ext) => path.join(base, "index" + ext)),
  ];
  return (
    candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile()) ?? null
  );
}

function collect(): string[] {
  const seen = new Set<string>();
  const visit = (file: string) => {
    if (seen.has(file)) return;
    seen.add(file);
    if (!CODE.test(file)) return;
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(IMPORT)) {
      const target = resolveImport(file, match[1]);
      if (target) visit(target);
    }
  };
  for (const entry of ENTRIES) visit(path.join(SRC, entry));
  // Stylesheets are not scanned for classes, and this file itself is output.
  return [...seen].filter((f) => !f.endsWith(".css")).sort();
}

const rel = (f: string) => path.relative(APP, f).split(path.sep).join("/");

/** Props that are spelled `dark:${something.<prop>}` somewhere in the graph. */
const DARK_COMPOSED = /dark:\$\{\s*[\w.?]+?\.(\w+)/g;

/**
 * Every class `dark:${x.prop}` can turn into: the string literals given to
 * those props anywhere in the graph, each prefixed with `dark:`.
 */
function composedDarkClasses(files: string[]): string[] {
  const code = files.filter((f) => CODE.test(f));
  const texts = code.map((f) => fs.readFileSync(f, "utf8"));
  const props = new Set<string>();
  for (const text of texts)
    for (const m of text.matchAll(DARK_COMPOSED)) props.add(m[1]);
  if (props.size === 0) return [];
  // `prop: "a b"`, `prop: 'a b'` or a backtick string with no interpolation.
  const assigned = new RegExp(
    String.raw`\b(?:${[...props].join("|")})\s*:\s*(?:"([^"]*)"|'([^']*)'|` +
      "`([^`$]*)`)",
    "g",
  );
  const classes = new Set<string>();
  for (const text of texts)
    for (const m of text.matchAll(assigned))
      for (const token of (m[1] ?? m[2] ?? m[3] ?? "").split(/\s+/))
        if (token) classes.add(`dark:${token}`);
  return [...classes].sort();
}

/** A class name as it appears in a CSS selector. */
const selectorOf = (className: string) =>
  "." + className.replace(/[^\w-]/g, "\\$&");

/**
 * Keeps the candidates the full stylesheet has a rule for. Compiles globals.css
 * the way the build does, so the answer is exactly what shipped before.
 */
async function inFullStylesheet(candidates: string[]): Promise<string[]> {
  if (candidates.length === 0) return [];
  const [{ default: postcss }, { default: tailwind }] = await Promise.all([
    import("postcss"),
    import("@tailwindcss/postcss"),
  ]);
  const { css } = await postcss([tailwind()]).process(
    fs.readFileSync(GLOBALS, "utf8"),
    { from: GLOBALS },
  );
  return candidates.filter((c) => {
    const escaped = selectorOf(c).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Not followed by more of a longer class name (`.dark:text-white` vs `…/70`).
    return new RegExp(escaped + "(?![\\w\\-\\\\])").test(css);
  });
}

const TAILWIND_IMPORT = '@import "tailwindcss";';

async function build(): Promise<string> {
  const globals = fs.readFileSync(GLOBALS, "utf8").replace(/\r\n/g, "\n");
  if (!globals.includes(TAILWIND_IMPORT)) {
    throw new Error(
      `generate:home-css  ${path.relative(ROOT, GLOBALS)} no longer contains ${TAILWIND_IMPORT}`,
    );
  }
  const all = collect();
  const files = all.map(rel);
  const safelist = await inFullStylesheet(composedDarkClasses(all));
  const sources = [
    ...files.map((f) => `@source "${f}";`),
    ...safelist.map((c) => `@source inline("${c}");`),
  ].join("\n");
  const header = [
    "/* GENERATED by src/scripts/generate-home-css.ts: do not edit.",
    "   globals.css with Tailwind limited to the files the home route imports",
    `   (${files.length} files, ${safelist.length} runtime-composed classes), so the`,
    "   home page does not pay for the docs' CSS.",
    "   Change globals.css (or the home page's imports) and run",
    "   `npm run generate:home-css`; `npm run dev` and `npm run build` do. */",
    "",
  ].join("\n");
  return (
    header +
    globals.replace(
      TAILWIND_IMPORT,
      `@import "tailwindcss" source(none);\n${sources}`,
    )
  );
}

async function main() {
  const next = await build();
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  const outRel = path.relative(ROOT, OUT).split(path.sep).join("/");
  if (next === current) {
    console.log(`generate:home-css  ${outRel} is up to date`);
  } else {
    fs.writeFileSync(OUT, next);
    console.log(`generate:home-css  wrote ${outRel}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
