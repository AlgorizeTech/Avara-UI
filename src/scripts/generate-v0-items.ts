/**
 * Builds the static half of Open in v0: one registry item per docs example.
 *
 *   public/r/v0/<preview name>/<example id>.json
 *   src/preview/v0-items.json   — which examples have one, and each one's v0
 *                                 chat title (the button reads it)
 *
 * Each item is the example exactly as its preview shows it: the example's
 * Next.js usage snippet becomes app/page.tsx, and every registry file that
 * snippet reaches (the block, its ui primitives, …) is inlined with its
 * content, so v0 needs nothing else from our registry. The theme is added per
 * request by api/v0.ts — see src/lib/open-in-v0.ts.
 *
 * The examples are read by evaluating the MDX page, not by pattern-matching
 * it: snippets are template literals built from other exports, so only
 * running them yields the text the preview's Usage tab shows. Every import
 * the page makes is stubbed except `ExampleShowcase`, which records its props,
 * and the site config a snippet may interpolate (`${REGISTRY_NAMESPACE}`),
 * which is loaded for real.
 *
 * Runs after `shadcn build` (it reads the built public/r/*.json).
 */

import "./load-env";
import fs from "fs";
import path from "path";
import registry from "../../registry.json";
import { resolveMotion, resolveUsage, type ShowcaseSnippet } from "../lib/snippet";
import { slugify } from "../lib/open-in-v0";
import { SITE_NAME } from "../config/site";
import { DOCS_DIR, ROOT, galleryPages, readShowcases, type CapturedShowcase } from "./read-showcases";

const REGISTRY_OUT = path.join(ROOT, "public/r");
const OUT_DIR = path.join(REGISTRY_OUT, "v0");
const MANIFEST = path.join(ROOT, "src/preview/v0-items.json");
const HOMEPAGE = registry.homepage;

interface BuiltFile {
  path: string;
  type: string;
  target?: string;
  content?: string;
}

interface BuiltItem {
  name: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: BuiltFile[];
}

// ─── Registry lookups ───────────────────────────────────────────

const builtItems = new Map<string, BuiltItem>();
const loadItem = (name: string): BuiltItem => {
  let item = builtItems.get(name);
  if (!item) {
    const file = path.join(REGISTRY_OUT, `${name}.json`);
    if (!fs.existsSync(file)) throw new Error(`public/r/${name}.json is missing — run shadcn build first.`);
    item = JSON.parse(fs.readFileSync(file, "utf8")) as BuiltItem;
    builtItems.set(name, item);
  }
  return item;
};

/** `@/components/custom/blocks/Accordion` → the item that ships that file. */
const itemBySource = new Map<string, string>();
for (const item of registry.items as { name: string; files?: { path: string }[] }[]) {
  for (const file of item.files ?? []) {
    itemBySource.set(file.path.replace(/\.[jt]sx?$/, ""), item.name);
  }
}

const DUAL = new Set(
  (registry.items as { name: string }[])
    .map((item) => item.name)
    .filter((name) => name.endsWith("-motion"))
    .map((name) => name.replace(/-motion$/, "")),
);

/** Package name of a bare import: `@radix-ui/react-x/sub` → `@radix-ui/react-x`. */
const packageOf = (specifier: string) =>
  specifier.startsWith("@")
    ? specifier.split("/").slice(0, 2).join("/")
    : specifier.split("/")[0];

/** Already present in every v0 project. */
const PROVIDED = new Set(["react", "react-dom", "next"]);

const importsOf = (code: string) =>
  [...code.matchAll(/\bfrom\s+["']([^"']+)["']|\bimport\s+["']([^"']+)["']/g)].map(
    (m) => m[1] ?? m[2],
  );

/**
 * The example as one self-contained item: page + every registry file it
 * reaches, walking `registryDependencies` that point back at our registry.
 * Bare ones (`utils`) stay — v0 projects already have them.
 */
function flatten(key: string, title: string, description: string, usage: string) {
  const files: BuiltFile[] = [
    { path: "app/page.tsx", type: "registry:page", target: "app/page.tsx", content: usage },
  ];
  const dependencies = new Set<string>(["tw-animate-css"]);
  const bareDependencies = new Set<string>();
  const seen = new Set<string>();

  const visit = (name: string) => {
    if (seen.has(name)) return;
    seen.add(name);
    const item = loadItem(name);
    for (const dep of item.dependencies ?? []) dependencies.add(dep);
    for (const file of item.files) {
      if (!file.content || !file.target) {
        throw new Error(`[${key}] ${name} ships ${file.path} without content or target.`);
      }
      // A shared helper (motion-curves.ts, button-variants.ts…) ships inside
      // every item that uses it — the same file, so it is written once.
      const existing = files.find((f) => f.target === file.target);
      if (existing) {
        if (existing.content !== file.content) {
          throw new Error(`[${key}] two different files target ${file.target}.`);
        }
        continue;
      }
      files.push({ path: file.target, type: file.type, target: file.target, content: file.content });
    }
    for (const dep of item.registryDependencies ?? []) {
      const own = dep.match(new RegExp(`^${HOMEPAGE}/r/([a-z0-9-]+)\\.json$`));
      if (own) visit(own[1]);
      else if (/^[a-z0-9-]+$/.test(dep)) bareDependencies.add(dep);
      else throw new Error(`[${key}] ${name} depends on ${dep}, which v0 cannot resolve.`);
    }
  };

  const shippedSources = new Set<string>();

  /**
   * Resolves one file's imports. `@/` paths go to the registry item that ships
   * them; a project file no item ships (a docs helper like lib/chart-tokens)
   * travels as-is, along with whatever it imports in turn.
   */
  const resolveImports = (code: string, from: string) => {
    for (const specifier of importsOf(code)) {
      if (specifier.startsWith("@/")) {
        const source = `src/${specifier.slice(2)}`;
        const owner = itemBySource.get(source);
        if (owner) visit(owner);
        else if (specifier !== "@/lib/utils") shipSource(source, from, specifier);
      } else if (!specifier.startsWith(".")) {
        const pkg = packageOf(specifier);
        if (!PROVIDED.has(pkg)) dependencies.add(pkg);
      } else {
        throw new Error(`[${key}] ${from} has a relative import (${specifier}).`);
      }
    }
  };

  const shipSource = (source: string, from: string, specifier: string) => {
    const file = [".ts", ".tsx"].map((ext) => source + ext).find((f) => fs.existsSync(path.join(ROOT, f)));
    if (!file) throw new Error(`[${key}] ${from} imports ${specifier}, which does not exist.`);
    if (shippedSources.has(file)) return;
    shippedSources.add(file);
    const content = fs.readFileSync(path.join(ROOT, file), "utf8").replace(/\r\n/g, "\n");
    const target = file.replace(/^src\//, "");
    files.push({ path: target, type: "registry:lib", target, content });
    resolveImports(content, target);
  };

  resolveImports(usage, "usage");

  // `/assets/shoe.jpg` resolves against the docs site, not the v0 project —
  // point every path to a file in our public/ at the deployed copy.
  for (const file of files) {
    file.content = file.content!.replace(
      /(["'`])(\/[\w./-]+\.[a-z0-9]+)\1/gi,
      (match, quote: string, asset: string) =>
        fs.existsSync(path.join(ROOT, "public", asset)) ? `${quote}${HOMEPAGE}${asset}${quote}` : match,
    );
  }

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: key.replace("/", "-"),
    type: "registry:block",
    title,
    description,
    dependencies: [...dependencies].sort(),
    registryDependencies: [...bareDependencies].sort(),
    files,
  };
}

// ─── Main ───────────────────────────────────────────────────────

/** The page's `# Heading` — the name for demos with no registry item of their own. */
const pageHeading = (page: string) =>
  fs
    .readFileSync(path.join(DOCS_DIR, page, "page.mdx"), "utf8")
    .match(/^# (.+)$/m)?.[1]
    .trim();

async function main() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  const manifest: Record<string, Record<string, string>> = {};
  const pages = galleryPages();
  // An example that cannot be packaged is skipped (its preview simply gets no
  // button) rather than failing the site build; every skip is listed below.
  const skipped: string[] = [];
  let written = 0;

  for (const page of pages) {
    let showcases: CapturedShowcase[];
    try {
      showcases = await readShowcases(page);
    } catch (err) {
      skipped.push(`[${page}] page could not be read: ${err instanceof Error ? err.message : err}`);
      continue;
    }

    for (const { name, examples, motionVariants } of showcases) {
      const isDual = motionVariants ?? DUAL.has(name);
      const componentTitle =
        (registry.items as { name: string; title?: string }[]).find(
          (item) => item.name === name,
        )?.title ??
        pageHeading(page) ??
        name;

      for (const library of isDual ? (["gsap", "motion"] as const) : (["gsap"] as const)) {
        const previewName = library === "motion" ? `${name}-motion` : name;
        for (const example of examples) {
          const id = example.id ?? slugify(example.title);
          const key = `${previewName}/${id}`;
          const usage = resolveUsage(resolveMotion(example.usage, library), "nextjs")?.replace(/\r\n/g, "\n");
          // No authored usage means the preview has nothing faithful to open.
          if (!usage) {
            skipped.push(`[${key}] has no usage snippet.`);
            continue;
          }
          // A fragment (just the JSX that differs) has nothing for v0 to render.
          if (!/\bexport\s+default\b/.test(usage)) {
            skipped.push(`[${key}] usage is a fragment, not a page (no default export).`);
            continue;
          }
          if (manifest[previewName]?.[id]) {
            skipped.push(`[${key}] shares its id with another example on the page.`);
            continue;
          }

          // Names the v0 chat: the component, then the example when it adds
          // anything ("Accordion — FAQ section", but plain "Accordion").
          const title =
            example.title.toLowerCase() === componentTitle.toLowerCase()
              ? componentTitle
              : `${componentTitle} — ${example.title}`;
          try {
            const item = flatten(
              key,
              title,
              example.subheading ?? `The "${example.title}" example from the ${SITE_NAME} docs.`,
              usage,
            );
            const out = path.join(OUT_DIR, `${key}.json`);
            fs.mkdirSync(path.dirname(out), { recursive: true });
            fs.writeFileSync(out, JSON.stringify(item, null, 2) + "\n");
            (manifest[previewName] ??= {})[id] = title;
            written++;
          } catch (err) {
            skipped.push(err instanceof Error ? err.message : String(err));
          }
        }
      }
    }
  }

  function writeWithRetry(targetPath: string, content: string, retries = 5, delayMs = 300) {
    for (let i = 0; i < retries; i++) {
      try {
        fs.writeFileSync(targetPath, content);
        return;
      } catch (err: unknown) {
        if (i === retries - 1) throw err;
        const waitTill = Date.now() + delayMs;
        while (Date.now() < waitTill) {}
      }
    }
  }

  writeWithRetry(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(
    `Open in v0: wrote ${written} items for ${Object.keys(manifest).length} previews across ${pages.length} pages.`,
  );
  if (skipped.length > 0) {
    console.warn(`Open in v0: skipped ${skipped.length} example(s):`);
    for (const line of skipped) console.warn(`  ${line}`);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
