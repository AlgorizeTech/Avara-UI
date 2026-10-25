#!/usr/bin/env node
/**
 * Generates registry.json from the component sources.
 *
 * Run with: npm run generate:registry
 *
 * Everything mechanical is derived by parsing the source files — item names,
 * file paths, install targets, npm dependencies and inter-component registry
 * dependencies. Prose (description / categories / docs) comes from
 * registry-meta.ts, which is hand-authored.
 *
 * TARGET STRATEGY — important:
 * Install targets mirror the source directory structure:
 *   src/components/custom/blocks/X.tsx -> components/custom/blocks/X.tsx
 *   src/components/custom/ui/X.tsx     -> components/custom/ui/X.tsx
 * This is deliberate. Several blocks import siblings relatively ("./SelectBlock",
 * "../ui/base") or by alias ("@/components/custom/ui/accordion"). Renaming files
 * on install would break those imports in the consumer's project. Item NAMES are
 * still kebab-case for clean install URLs; the name and the filename are
 * independent.
 *
 * MOTION-LIBRARY TWINS:
 * A component whose animation needs a library ships two builds — GSAP (the
 * default, in the parent folder) and Motion (same basename, in a
 * `motion/` subfolder). The twin is named `<name>-motion` and installs to the
 * SAME target as the default, with the `motion/` segment removed, so a
 * consumer picks one build at install time and every usage snippet reads the
 * same for both. A motion file imports sibling twins relatively
 * ("./TextAnimationBlock") and shared, library-free blocks by alias
 * ("@/components/custom/blocks/HalfStarsBlock"); both forms survive install.
 */

import "./load-env";
import fs from "fs";
import path from "path";
import { META, NAME_OVERRIDES, CATEGORIES, type ItemMeta } from "./registry-meta";
import { REGISTRY_NAMESPACE, SITE_URL, siteConfig } from "../config/site";

const ROOT = path.resolve(__dirname, "../..");
const BLOCKS_DIR = path.join(ROOT, "src/components/custom/blocks");
const PRIMITIVES_DIR = path.join(ROOT, "src/components/custom/ui");
const SITE_UI_DIR = path.join(ROOT, "src/components/ui");
/**
 * Components that sit directly in custom/ rather than in blocks/ or ui/.
 * Only carousel.tsx lives here today, and it was invisible to the registry —
 * and so uninstallable — until this directory was scanned too.
 */
const CUSTOM_DIR = path.join(ROOT, "src/components/custom");

/** `NEXT_PUBLIC_REGISTRY_NAMESPACE` without its `@` — the docs print the same name. */
const REGISTRY_NAME = REGISTRY_NAMESPACE.replace(/^@/, "");
/**
 * Canonical registry host, from `NEXT_PUBLIC_SITE_URL`. This is a PUBLIC
 * CONTRACT — it is baked into every published item's registryDependencies, so
 * an item someone already installed keeps pointing at the host it was built
 * with. When the value changes, keep the old host serving /r/ (or redirecting
 * it) until consumers have moved.
 */
const HOMEPAGE = SITE_URL;
const AUTHOR = siteConfig.author;

/**
 * Base URL that registryDependencies pointing at THIS registry resolve against.
 *
 * Bare names in registryDependencies resolve against shadcn's own upstream
 * registry, not ours. That is not merely a 404 risk — shadcn ships items called
 * `select`, `card`, `button`, `table`, so a bare "select" would silently install
 * shadcn's component instead of ours. Every intra-registry dependency must
 * therefore be emitted as an absolute URL.
 *
 * Override for local smoke testing:
 *   REGISTRY_BASE_URL=http://localhost:3000 npm run build:registry
 */
const BASE_URL = (process.env.REGISTRY_BASE_URL || HOMEPAGE).replace(/\/+$/, "");

/** Items genuinely provided by shadcn's upstream registry — stay bare. */
const UPSTREAM_ITEMS = new Set(["utils"]);

const depRef = (name: string) =>
  UPSTREAM_ITEMS.has(name) ? name : `${BASE_URL}/r/${name}.json`;

/** Packages that are always present in a consumer project — never declare them. */
const AMBIENT_PACKAGES = new Set(["react", "react-dom", "next"]);

/** Site-ui files that blocks depend on and must therefore ship. */
const SITE_UI_ITEMS = new Set(["card"]);

type Source = {
  /** Absolute path on disk. */
  abs: string;
  /** Repo-relative path, used as files[].path. */
  rel: string;
  /** Bare filename, e.g. "AdvancedTableBlock.tsx". */
  basename: string;
  /** Install destination, e.g. "components/custom/blocks/AdvancedTableBlock.tsx". */
  target: string;
  /** Generated kebab-case registry item name. */
  name: string;
  /** "block" | "primitive" | "site-ui" */
  kind: "block" | "primitive" | "site-ui" | "custom";
  /** The Motion twin of another item (lives in a `motion/` folder). */
  motion: boolean;
};

/** Subfolder that holds the Motion twin of a dual component. */
const MOTION_DIR = "motion";

/** npm packages that carry each motion library. */
const GSAP_PACKAGES = new Set(["gsap", "@gsap/react"]);
const MOTION_PACKAGES = new Set(["framer-motion", "motion"]);

/** Drops the `motion/` folder from an install target: both builds share a path. */
const stripMotionSegment = (target: string) =>
  target.replace(new RegExp(`/${MOTION_DIR}/`), "/");

// ---------------------------------------------------------------------------
// Name derivation
// ---------------------------------------------------------------------------

function toKebab(input: string): string {
  return input
    // Split camel/Pascal boundaries, including acronym runs (QRCode -> QR-Code).
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function deriveName(
  basename: string,
  kind: Source["kind"],
  motion = false,
): string {
  if (motion) return `${deriveName(basename, kind)}-motion`;
  const override = NAME_OVERRIDES[basename];
  if (override) return override;

  let stem = basename.replace(/\.tsx$/, "");
  // Strip the "Block"/"Blocks" suffix that most files carry.
  stem = stem.replace(/Blocks?$/, "");
  let name = toKebab(stem);

  if (kind === "primitive") name = `ui-${name}`;
  if (kind === "site-ui") name = `ui-${name}`;
  return name;
}

// ---------------------------------------------------------------------------
// Import parsing
// ---------------------------------------------------------------------------

/** Anchored to the start of a line so a JSDoc body cannot look like an import. */
const IMPORT_RE =
  /^[ \t]*import\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/gm;

/**
 * `export * from "./TableBlock"` and friends. A re-export is a dependency as
 * surely as an import: miss it and the item installs a file that re-exports a
 * module the consumer was never given.
 */
const REEXPORT_RE =
  /^[ \t]*export\s+(?:type\s+)?(?:\*(?:\s+as\s+\w+)?|\{[\s\S]*?\})\s+from\s+["']([^"']+)["']/gm;

/**
 * `lazy(() => import("./Fleet-map"))` and friends. These resolve at runtime but
 * still have to ship: an item whose dynamic import is not counted installs
 * without the file it reaches for, and the consumer's build fails on a module
 * it never wrote.
 */
const DYNAMIC_IMPORT_RE = /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g;

/** JSDoc bodies and commented-out code — documentation, not dependencies. */
const COMMENT_LINE_RE = /^[ \t]*(?:\/\/|\/\*|\*)/;

function parseImports(src: string): string[] {
  // Comment-only lines go first. A JSDoc example showing `import Link from
  // "next/link"` is instructions for the consumer, not a dependency, and
  // counting it reported a framework-agnostic component as Next-coupled.
  const code = src
    .split("\n")
    .map((line) => (COMMENT_LINE_RE.test(line) ? "" : line))
    .join("\n");

  const specs: string[] = [];
  for (const re of [IMPORT_RE, REEXPORT_RE, DYNAMIC_IMPORT_RE]) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(code))) specs.push(m[1]);
  }
  return specs;
}

function packageOf(spec: string): string {
  return spec.startsWith("@")
    ? spec.split("/").slice(0, 2).join("/")
    : spec.split("/")[0];
}

/**
 * The `@types/x` companion for a package that ships no types of its own.
 *
 * A TypeScript consumer installing an item that imports `leaflet` otherwise gets
 * "Could not find a declaration file for module 'leaflet'" — and, worse, cascading
 * errors in packages whose own types depend on it.
 *
 * These go in `devDependencies`, not `dependencies`: the shadcn registry-item schema
 * supports both channels and the CLI installs them separately. Emitting `@types/*` as
 * a runtime dependency inflates production installs and misstates what the component
 * needs at run time.
 *
 * Resolved from this repo's own node_modules so the list cannot go stale: if we
 * need the types to compile, so does everyone installing the component.
 */
function typesPackageFor(pkg: string): string | null {
  if (pkg.startsWith("@types/")) return null;
  try {
    const meta = JSON.parse(
      fs.readFileSync(
        path.join(ROOT, "node_modules", pkg, "package.json"),
        "utf8"
      )
    );
    if (meta.types || meta.typings) return null;
  } catch {
    return null; // not installed here — nothing to assert
  }
  const scoped = pkg.startsWith("@")
    ? pkg.slice(1).replace("/", "__")
    : pkg;
  const typesPkg = `@types/${scoped}`;
  return fs.existsSync(path.join(ROOT, "node_modules", typesPkg))
    ? typesPkg
    : null;
}

// ---------------------------------------------------------------------------
// Source discovery
// ---------------------------------------------------------------------------

function collect(
  dir: string,
  kind: Source["kind"],
  filter?: Set<string>,
  motion = false,
): Source[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".tsx"))
    .filter((f) => (filter ? filter.has(f.replace(/\.tsx$/, "")) : true))
    .sort()
    .map((basename) => {
      const abs = path.join(dir, basename);
      const rel = path.relative(ROOT, abs).split(path.sep).join("/");
      const target = stripMotionSegment(rel.replace(/^src\//, ""));
      return {
        abs,
        rel,
        basename,
        target,
        name: deriveName(basename, kind, motion),
        kind,
        motion,
      };
    });
}

const sources: Source[] = [
  ...collect(BLOCKS_DIR, "block"),
  ...collect(path.join(BLOCKS_DIR, MOTION_DIR), "block", undefined, true),
  ...collect(PRIMITIVES_DIR, "primitive"),
  ...collect(path.join(PRIMITIVES_DIR, MOTION_DIR), "primitive", undefined, true),
  ...collect(SITE_UI_DIR, "site-ui", SITE_UI_ITEMS),
  // Non-recursive, so blocks/ and ui/ underneath are not collected twice.
  ...collect(CUSTOM_DIR, "custom"),
  ...collect(path.join(CUSTOM_DIR, MOTION_DIR), "custom", undefined, true),
];

/** Resolve an import specifier to another item in this registry, if any. */
const byAbsPath = new Map<string, Source>();
for (const s of sources) byAbsPath.set(path.normalize(s.abs).toLowerCase(), s);

/**
 * A local import that is NOT its own registry item: a helper module living
 * beside the component. Returns its absolute path so the item can ship it.
 */
function resolveCompanion(spec: string, fromFile: string): string | undefined {
  let candidate: string | undefined;
  if (spec.startsWith("@/")) candidate = path.join(ROOT, "src", spec.slice(2));
  else if (spec.startsWith(".")) candidate = path.resolve(path.dirname(fromFile), spec);
  if (!candidate) return undefined;

  for (const ext of [".ts", ".tsx", "/index.ts", "/index.tsx"]) {
    const full = candidate + ext;
    if (byAbsPath.has(path.normalize(full).toLowerCase())) return undefined; // its own item
    if (fs.existsSync(full)) return full;
  }
  return undefined;
}

function resolveLocal(spec: string, fromFile: string): Source | undefined {
  let candidate: string | undefined;

  if (spec.startsWith("@/")) {
    candidate = path.join(ROOT, "src", spec.slice(2));
  } else if (spec.startsWith(".")) {
    candidate = path.resolve(path.dirname(fromFile), spec);
  }
  if (!candidate) return undefined;

  for (const ext of [".tsx", ".ts", "/index.tsx", "/index.ts"]) {
    const hit = byAbsPath.get(path.normalize(candidate + ext).toLowerCase());
    if (hit) return hit;
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Item construction
// ---------------------------------------------------------------------------

type BuiltItem = {
  name: string;
  type: string;
  title: string;
  author: string;
  description: string;
  categories: string[];
  dependencies: string[];
  devDependencies?: string[];
  registryDependencies: string[];
  files: { path: string; type: string; target: string }[];
  docs?: string;
};

const missingMeta: string[] = [];
const badCategories: string[] = [];
/**
 * Local imports that point at a file this registry does not publish. Left
 * unchecked these vanish silently — the item ships, the CLI writes it, and the
 * consumer's build fails on a module that only ever existed in this repo.
 * `ui-codeblocks` shipped that way against `@/components/site/code-renderer`.
 */
const unresolvedLocal: string[] = [];
const nextCoupled: string[] = [];
const nameSeen = new Map<string, string>();
const collisions: string[] = [];

/**
 * Segments that are acronyms, not words. Without these, kebab-to-title gives
 * "Ui Fluid Glass Slider" and "Qr Code Reader" — which the CLI prints on
 * install and the docs print as a step heading.
 */
const ACRONYMS = new Set(["ui", "qr", "api", "ai", "otp", "svg", "css", "3d"]);

function titleFor(name: string, meta?: ItemMeta): string {
  if (meta?.title) return meta.title;
  return name
    .split("-")
    .map((w) => {
      if (ACRONYMS.has(w)) return w.toUpperCase();
      if (/^\d/.test(w)) return w.toUpperCase();
      return w[0].toUpperCase() + w.slice(1);
    })
    .join(" ");
}

/**
 * A Motion twin borrows its base item's prose unless it has its own entry, so
 * adding a twin never needs a registry-meta edit — only its source file.
 */
function metaFor(s: Source): ItemMeta | undefined {
  if (META[s.name] || !s.motion) return META[s.name];
  const baseName = s.name.replace(/-motion$/, "");
  const base = META[baseName];
  if (!base) return undefined;
  return {
    ...base,
    title: `${base.title ?? titleFor(baseName)} (Motion)`,
    docs: `Motion build of \`${baseName}\` — same props, markup and install path; install one or the other.${base.docs ? ` ${base.docs}` : ""}`,
  };
}

const items: BuiltItem[] = sources.map((s) => {
  const dependencies = new Set<string>();
  const devDependencies = new Set<string>();
  const registryDependencies = new Set<string>();
  let usesNext = false;

  // Companion modules ship with this item, so their imports count as its own.
  const companions: string[] = [];
  const walked = new Set<string>([path.normalize(s.abs).toLowerCase()]);
  const queue: string[] = [s.abs];

  while (queue.length) {
  const from = queue.shift() as string;
  const src = fs.readFileSync(from, "utf8");
  const specs = parseImports(src);

  for (const spec of specs) {
    if (spec.startsWith("@/") || spec.startsWith(".")) {
      if (spec === "@/lib/utils") {
        // `cn` — provided by shadcn's own `utils` item.
        registryDependencies.add("utils");
        continue;
      }
      const local = resolveLocal(spec, from);
      if (!local) {
        const companion = resolveCompanion(spec, from);
        if (companion) {
          const key = path.normalize(companion).toLowerCase();
          if (!walked.has(key)) {
            walked.add(key);
            companions.push(companion);
            queue.push(companion);
          }
          continue;
        }
        unresolvedLocal.push(`${s.basename} imports ${spec}`);
        continue;
      }
      if (local.name !== s.name) {
        registryDependencies.add(local.name);
      }
      continue;
    }
    const pkg = packageOf(spec);
    if (pkg === "next") usesNext = true;
    if (AMBIENT_PACKAGES.has(pkg)) continue;
    dependencies.add(pkg);
    const types = typesPackageFor(pkg);
    if (types) devDependencies.add(types);
  }
  }

  if (usesNext) nextCoupled.push(s.name);

  const prev = nameSeen.get(s.name);
  if (prev) collisions.push(`${s.name}: ${prev} vs ${s.basename}`);
  else nameSeen.set(s.name, s.basename);

  const meta = metaFor(s);
  if (!meta) missingMeta.push(s.name);
  // Usage-only dependencies cannot be derived from the source's imports.
  for (const d of meta?.usageDependencies ?? []) registryDependencies.add(d);
  for (const c of meta?.categories ?? []) {
    if (!(CATEGORIES as readonly string[]).includes(c)) {
      badCategories.push(`${s.name}: "${c}"`);
    }
  }

  const fileType =
    s.kind === "block" || s.kind === "custom"
      ? "registry:component"
      : "registry:ui";

  const item: BuiltItem = {
    name: s.name,
    type: fileType,
    title: titleFor(s.name, meta),
    author: AUTHOR,
    description:
      meta?.description ?? `TODO: describe ${s.name}. Generated placeholder.`,
    categories: meta?.categories ?? [],
    dependencies: [...dependencies].sort(),
    ...(devDependencies.size
      ? { devDependencies: [...devDependencies].sort() }
      : {}),
    registryDependencies: [...registryDependencies].sort().map(depRef),
    files: [
      { path: s.rel, type: fileType, target: s.target },
      ...companions
        .map((abs) => path.relative(ROOT, abs).split(path.sep).join("/"))
        .sort()
        .map((rel) => ({
          path: rel,
          type: fileType,
          target: stripMotionSegment(rel.replace(/^src\//, "")),
        })),
    ],
  };
  if (meta?.docs) item.docs = meta.docs;
  return item;
});

// ---------------------------------------------------------------------------
// One motion library per install
// ---------------------------------------------------------------------------

const itemByName = new Map(items.map((i) => [i.name, i]));
const refName = (ref: string) => ref.match(/\/r\/([\w-]+)\.json$/)?.[1];

/**
 * Every npm package an item pulls in, following its registry dependencies —
 * what `shadcn add` actually installs.
 */
function transitivePackages(name: string, seen = new Set<string>()): Set<string> {
  const out = new Set<string>();
  if (seen.has(name)) return out;
  seen.add(name);
  const item = itemByName.get(name);
  if (!item) return out;
  for (const d of item.dependencies) out.add(d);
  for (const ref of item.registryDependencies) {
    const dep = refName(ref);
    if (dep) for (const d of transitivePackages(dep, seen)) out.add(d);
  }
  return out;
}

const pullsAny = (name: string, set: Set<string>) =>
  [...transitivePackages(name)].some((p) => set.has(p));

/**
 * An install must carry ONE animation library. The usual way to break this is
 * a GSAP section composing a Motion block (or the reverse), so the blocks that
 * bring each library in are named — that is where the fix goes.
 */
const mixedMotion: string[] = [];
for (const item of items) {
  if (!pullsAny(item.name, GSAP_PACKAGES) || !pullsAny(item.name, MOTION_PACKAGES)) continue;
  const own = (set: Set<string>) => item.dependencies.some((d) => set.has(d));
  const via = (set: Set<string>) =>
    [
      ...(own(set) ? [item.name] : []),
      ...item.registryDependencies
        .map(refName)
        .filter((n): n is string => !!n && pullsAny(n, set)),
    ].join(", ");
  mixedMotion.push(
    `${item.name}: gsap via ${via(GSAP_PACKAGES)}; motion via ${via(MOTION_PACKAGES)}`,
  );
}

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: REGISTRY_NAME,
  homepage: BASE_URL,
  items: items.sort((a, b) => a.name.localeCompare(b.name)),
};

const outPath = path.join(ROOT, "registry.json");
fs.writeFileSync(outPath, JSON.stringify(registry, null, 2) + "\n");

// ---------------------------------------------------------------------------
// Report — gaps are printed loudly, never silently shipped
// ---------------------------------------------------------------------------

console.log(`\nregistry.json written: ${items.length} items`);
console.log(`  blocks:     ${sources.filter((s) => s.kind === "block").length}`);
console.log(`  primitives: ${sources.filter((s) => s.kind === "primitive").length}`);
console.log(`  site-ui:    ${sources.filter((s) => s.kind === "site-ui").length}`);
console.log(`  custom:     ${sources.filter((s) => s.kind === "custom").length}`);

if (collisions.length) {
  console.error(`\nFATAL — duplicate item names (${collisions.length}):`);
  for (const c of collisions) console.error(`  ${c}`);
  console.error("Add an entry to NAME_OVERRIDES in registry-meta.ts.");
  process.exit(1);
}

if (badCategories.length) {
  console.error(`\nFATAL — categories outside the controlled vocabulary:`);
  for (const c of badCategories) console.error(`  ${c}`);
  process.exit(1);
}

if (unresolvedLocal.length) {
  console.error(
    `\nFATAL — local imports pointing outside the registry (${unresolvedLocal.length}):`
  );
  for (const u of unresolvedLocal) console.error(`  ${u}`);
  console.error(
    "The importing file ships, the imported one does not, so `shadcn add` writes a project that will not compile."
  );
  console.error(
    "Move the imported file into a scanned directory (blocks/, custom/, custom/ui/), add it to SITE_UI_ITEMS, or inline it."
  );
  process.exit(1);
}

if (mixedMotion.length) {
  console.error(
    `\nFATAL — items that install both GSAP and Motion (${mixedMotion.length}):`
  );
  for (const m of mixedMotion) console.error(`  ${m}`);
  console.error(
    "An install must carry one animation library. Convert the named block to CSS, or compose the twin from the same camp (see animation-library-plan.md)."
  );
  process.exit(1);
}

const allDeps = new Set(items.flatMap((i) => i.dependencies));
console.log(`\nnpm dependencies across registry: ${[...allDeps].sort().join(", ")}`);

if (nextCoupled.length) {
  console.log(
    `\nNext.js-coupled (any next/* import) — ${nextCoupled.length} items:`
  );
  console.log(`  ${nextCoupled.sort().join(", ")}`);
  console.log("  These will not work in Vite/Remix without edits.");
}

if (missingMeta.length) {
  console.log(
    `\nMISSING METADATA — ${missingMeta.length} of ${items.length} items have placeholder descriptions:`
  );
  console.log(`  ${missingMeta.sort().join(", ")}`);
  console.log("  Add entries to META in src/scripts/registry-meta.ts (Phase 4).");
}

console.log("");
