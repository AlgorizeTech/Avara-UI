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
 * the page makes is stubbed except `ExampleShowcase`, which records its props.
 *
 * Runs after `shadcn build` (it reads the built public/r/*.json).
 */

import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { build, type Plugin } from "esbuild";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import registry from "../../registry.json";
import { resolveMotion, resolveUsage, type ShowcaseSnippet } from "../lib/snippet";
import { slugify } from "../lib/open-in-v0";

/**
 * Every docs page with an example gallery, as its path under the docs route
 * (`accordion`, `third-party/gallery`).
 */
function galleryPages(): string[] {
  const pages: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "page.mdx" && fs.readFileSync(full, "utf8").includes("<ExampleShowcase")) {
        pages.push(path.relative(DOCS_DIR, dir).split(path.sep).join("/"));
      }
    }
  };
  walk(DOCS_DIR);
  return pages.sort();
}

const ROOT = path.resolve(__dirname, "../..");
const DOCS_DIR = path.join(ROOT, "src/app/docs/[framework]");
const REGISTRY_OUT = path.join(ROOT, "public/r");
const OUT_DIR = path.join(REGISTRY_OUT, "v0");
const MANIFEST = path.join(ROOT, "src/preview/v0-items.json");
// Inside the project so the bundle's bare `react` imports resolve.
const CACHE_DIR = path.join(ROOT, "node_modules/.cache/v0-items");

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

interface CapturedExample {
  title: string;
  id?: string;
  subheading?: string;
  usage?: ShowcaseSnippet;
}

interface CapturedShowcase {
  name: string;
  examples: CapturedExample[];
  motionVariants?: boolean;
}

declare global {
  var __v0Showcases: CapturedShowcase[] | undefined;
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
    .filter((name) => name.endsWith("-framer"))
    .map((name) => name.replace(/-framer$/, "")),
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

// ─── Reading the examples out of an MDX page ────────────────────

/**
 * Callable, renders nothing, and every property is another stub — enough for
 * whatever a docs page does with an import at module level or in its JSX.
 */
const STUB_SOURCE = `
const IGNORED = new Set(["$$typeof", "defaultProps", "contextTypes", "childContextTypes",
  "contextType", "getDerivedStateFromProps", "propTypes", "displayName", "then", "prototype"]);
const stub = () => new Proxy(() => "", {
  get: (_, key) => typeof key === "symbol" || IGNORED.has(key) ? undefined : stub(),
});
`;
const makeStub = new Function(`${STUB_SOURCE}; return stub;`)() as () => unknown;

/** Named bindings the compiled page takes from each module. */
function namedImports(code: string): Map<string, Set<string>> {
  const byModule = new Map<string, Set<string>>();
  for (const [, list, specifier] of code.matchAll(/import\s*\{([^}]*)\}\s*from\s*["']([^"']+)["']/g)) {
    const names = byModule.get(specifier) ?? new Set<string>();
    for (const part of list.split(",")) {
      const name = part.trim().split(/\s+as\s+/)[0];
      if (name) names.add(name);
    }
    byModule.set(specifier, names);
  }
  return byModule;
}

/**
 * Every import resolves to a stub module exporting exactly the names the page
 * asks for — except `ExampleShowcase`, which records the props it is given.
 */
const stubPlugin = (imports: Map<string, Set<string>>): Plugin => ({
  name: "v0-stubs",
  setup(pluginBuild) {
    pluginBuild.onResolve({ filter: /.*/ }, (args) => {
      if (args.kind === "entry-point") return undefined;
      if (/^react(-dom)?(\/|$)/.test(args.path)) return { path: args.path, external: true };
      if (args.path === "node:fs") return { path: args.path, external: true };
      // A usage read from the demo file (`usage: extractCode("src/preview/demos/…")`)
      // is the only snippet that page has, so `extractCode` really reads it.
      if (args.path === "@/lib/code") return { path: args.path, namespace: "code" };
      return { path: args.path, namespace: "stub" };
    });
    pluginBuild.onLoad({ filter: /.*/, namespace: "code" }, (args) => {
      const others = [...(imports.get(args.path) ?? [])].filter((name) => name !== "extractCode");
      return {
        loader: "js",
        resolveDir: ROOT,
        contents: [
          STUB_SOURCE,
          'import { readFileSync } from "node:fs";',
          'export const extractCode = (file) => readFileSync(file, "utf8");',
          ...others.map((name) => `export const ${name} = stub();`),
        ].join("\n"),
      };
    });
    pluginBuild.onLoad({ filter: /.*/, namespace: "stub" }, (args) => {
      const names = [...(imports.get(args.path) ?? [])];
      const exports = names.map((name) =>
        name === "ExampleShowcase"
          ? "export const ExampleShowcase = (props) => { globalThis.__v0Showcases.push(props); return null; };"
          : `export const ${name} = stub();`,
      );
      return {
        loader: "js",
        contents: `${STUB_SOURCE}\n${exports.join("\n")}\nexport default stub();`,
      };
    });
  },
});

async function readShowcases(page: string): Promise<CapturedShowcase[]> {
  const file = path.join(DOCS_DIR, page, "page.mdx");
  const source = fs.readFileSync(file, "utf8");

  const { compile } = await import("@mdx-js/mdx");
  const compiled = String(await compile(source, { outputFormat: "program", development: false }));

  const bundle = await build({
    stdin: { contents: compiled, loader: "js", resolveDir: path.dirname(file), sourcefile: file },
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    logLevel: "silent",
    plugins: [stubPlugin(namedImports(compiled))],
  });

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const bundlePath = path.join(CACHE_DIR, `${page.replace(/\//g, "--")}-${Date.now()}.mjs`);
  fs.writeFileSync(bundlePath, bundle.outputFiles[0].text);

  try {
    const mod = (await import(pathToFileURL(bundlePath).href)) as { default: unknown };
    // Components the page uses without importing come from mdx-components.
    const used = new Set([...source.matchAll(/<([A-Z][A-Za-z0-9]*)/g)].map((m) => m[1]));
    const components = Object.fromEntries([...used].map((name) => [name, makeStub()]));

    globalThis.__v0Showcases = [];
    renderToStaticMarkup(createElement(mod.default as never, { components }));
    return globalThis.__v0Showcases;
  } finally {
    fs.rmSync(bundlePath, { force: true });
  }
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

      for (const library of isDual ? (["gsap", "framer"] as const) : (["gsap"] as const)) {
        const previewName = library === "framer" ? `${name}-framer` : name;
        for (const example of examples) {
          const id = example.id ?? slugify(example.title);
          const key = `${previewName}/${id}`;
          const usage = resolveUsage(resolveMotion(example.usage, library), "nextjs");
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
              example.subheading ?? `The "${example.title}" example from the Algorize UI docs.`,
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

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
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
