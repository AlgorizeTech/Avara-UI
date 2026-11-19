/**
 * Reads the examples out of a docs page: for every `<ExampleShowcase>` on it,
 * the props it was given (title, usage snippet, the demo's `props`, …).
 *
 * Shared by generate-v0-items (packages each usage for v0) and
 * check-usage-parity (renders each usage against its live preview).
 */

import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { build, type Plugin } from "esbuild";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { ShowcaseSnippet } from "../lib/snippet";

export const ROOT = path.resolve(__dirname, "../..");
export const DOCS_DIR = path.join(ROOT, "src/app/docs/[framework]");
// Inside the project so the bundle's bare `react` imports resolve.
const CACHE_DIR = path.join(ROOT, "node_modules/.cache/v0-items");


/**
 * Every docs page with an example gallery, as its path under the docs route
 * (`accordion`, `third-party/gallery`).
 */
export function galleryPages(): string[] {
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

export interface CapturedExample {
  /** Props the preview demo renders with (`?props=` in the sandbox). */
  props?: Record<string, unknown>;
  title: string;
  id?: string;
  subheading?: string;
  usage?: ShowcaseSnippet;
}

export interface CapturedShowcase {
  name: string;
  examples: CapturedExample[];
  motionVariants?: boolean;
}

declare global {
  var __v0Showcases: CapturedShowcase[] | undefined;
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
 * Site values a snippet interpolates — the registry namespace and host, the
 * site name. These are read for real (they only read `process.env`, which
 * load-env has filled), so the item says what the docs page says.
 */
const REAL_MODULES: Record<string, string> = {
  "@/lib/registry": path.join(ROOT, "src/lib/registry.ts"),
  "@/config/site": path.join(ROOT, "src/config/site.ts"),
};

/**
 * Every import resolves to a stub module exporting exactly the names the page
 * asks for — except `ExampleShowcase`, which records the props it is given,
 * and REAL_MODULES, which are bundled as they are.
 */
const stubPlugin = (imports: Map<string, Set<string>>): Plugin => ({
  name: "v0-stubs",
  setup(pluginBuild) {
    pluginBuild.onResolve({ filter: /.*/ }, (args) => {
      if (args.kind === "entry-point") return undefined;
      if (args.path in REAL_MODULES) return { path: REAL_MODULES[args.path], namespace: "real" };
      // A real module's own relative imports (registry.ts → ../config/site).
      if (args.namespace === "real") {
        return { path: `${path.resolve(args.resolveDir, args.path)}.ts`, namespace: "real" };
      }
      if (/^react(-dom)?(\/|$)/.test(args.path)) return { path: args.path, external: true };
      if (args.path === "node:fs") return { path: args.path, external: true };
      // A usage read from the demo file (`usage: extractCode("src/preview/demos/…")`)
      // is the only snippet that page has, so `extractCode` really reads it.
      if (args.path === "@/lib/code") return { path: args.path, namespace: "code" };
      return { path: args.path, namespace: "stub" };
    });
    pluginBuild.onLoad({ filter: /.*/, namespace: "real" }, (args) => ({
      loader: "ts",
      resolveDir: path.dirname(args.path),
      contents: fs.readFileSync(args.path, "utf8"),
    }));
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
        // ExampleShowcaseV2 is the inline-preview twin; a page imports it under
        // the old name, so the page body still says <ExampleShowcase>.
        name === "ExampleShowcase" || name === "ExampleShowcaseV2"
          ? `export const ${name} = (props) => { globalThis.__v0Showcases.push(props); return null; };`
          : `export const ${name} = stub();`,
      );
      return {
        loader: "js",
        contents: `${STUB_SOURCE}\n${exports.join("\n")}\nexport default stub();`,
      };
    });
  },
});

export async function readShowcases(page: string): Promise<CapturedShowcase[]> {
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

