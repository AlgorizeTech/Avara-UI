#!/usr/bin/env node
/**
 * Registry drift checks.
 *
 * Run with: npm run check:registry
 *
 * registry.json is generated and public/r/ is built from it, but generated
 * artifacts go stale the moment someone renames a source file and doesn't
 * re-run the pipeline. These assertions make that failure loud instead of
 * silent — a stale registry ships broken code into other people's projects,
 * which is exactly how public/registry/button.json came to contain the demo
 * component instead of the real one.
 *
 * Exit code 1 on any FAIL. WARNs are reported but do not block.
 */

import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "../..");
const REGISTRY = path.join(ROOT, "registry.json");
const OUT_DIR = path.join(ROOT, "public/r");
const DEMOS_DIR = path.join(ROOT, "src/preview/demos");

type Item = {
  name: string;
  description: string;
  categories?: string[];
  files: { path: string; target: string }[];
  registryDependencies?: string[];
};

const failures: string[] = [];
const warnings: string[] = [];

const fail = (msg: string) => failures.push(msg);
const warn = (msg: string) => warnings.push(msg);

// ---------------------------------------------------------------------------

if (!fs.existsSync(REGISTRY)) {
  console.error("FAIL: registry.json does not exist. Run: npm run generate:registry");
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(REGISTRY, "utf8"));
const items: Item[] = registry.items ?? [];
const names = new Set(items.map((i) => i.name));

console.log(`Checking ${items.length} registry items...\n`);

// --- 1. Every declared source file resolves on disk -------------------------
for (const item of items) {
  for (const f of item.files) {
    if (!fs.existsSync(path.join(ROOT, f.path))) {
      fail(`[${item.name}] source path does not exist: ${f.path}`);
    }
  }
}

// --- 2. Every registryDependency resolves ---------------------------------
// Intra-registry dependencies MUST be absolute URLs. A bare name resolves
// against shadcn's upstream registry, and shadcn ships items called `select`,
// `card`, `button` and `table` — so a bare name would silently install the
// wrong component rather than failing. Only genuine upstream items stay bare.
const UPSTREAM_ITEMS = new Set(["utils"]);
for (const item of items) {
  for (const dep of item.registryDependencies ?? []) {
    if (UPSTREAM_ITEMS.has(dep)) continue;

    if (!/^https?:\/\//.test(dep)) {
      fail(
        `[${item.name}] registryDependency "${dep}" is a bare name. ` +
          `It would resolve against shadcn's upstream registry, not ours. ` +
          `Emit an absolute URL instead.`
      );
      continue;
    }
    const local = dep.match(/\/r\/([^/]+)\.json$/);
    if (local && !names.has(local[1])) {
      fail(`[${item.name}] registryDependency "${dep}" points at no known item`);
    }
  }
}

// --- 3. Where a demo exists, it must import the same file the item ships -----
// This is the assertion that catches the historical button.json defect: the
// published item shipped the demo component instead of the component itself.
const demoFor = (name: string) => path.join(DEMOS_DIR, `${name}-demo.tsx`);
let demoChecked = 0;
const undemoed: string[] = [];

for (const item of items) {
  const demoPath = demoFor(item.name);
  if (!fs.existsSync(demoPath)) {
    undemoed.push(item.name);
    continue;
  }
  demoChecked++;
  const demoSrc = fs.readFileSync(demoPath, "utf8");
  const shipped = item.files[0].path; // e.g. src/components/custom/blocks/Button.tsx
  const expectedSpecifier = shipped
    .replace(/^src\//, "@/")
    .replace(/\.tsx$/, "");

  if (!demoSrc.includes(expectedSpecifier)) {
    warn(
      `[${item.name}] demo does not import the shipped file.\n` +
        `        ships:  ${shipped}\n` +
        `        expect: ${expectedSpecifier}`
    );
  }
}

// --- 4. Built output matches the manifest, with no orphans ------------------
if (!fs.existsSync(OUT_DIR)) {
  fail("public/r/ does not exist. Run: npm run build:registry");
} else {
  const built = new Set(
    fs
      .readdirSync(OUT_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(/\.json$/, ""))
  );
  built.delete("registry"); // shadcn build emits a copy of the manifest

  for (const item of items) {
    if (!built.has(item.name)) {
      fail(`[${item.name}] declared in registry.json but not built into public/r/`);
    }
  }
  for (const b of built) {
    if (!names.has(b)) {
      fail(`public/r/${b}.json is an orphan — not declared in registry.json`);
    }
  }
}

// --- 5. No CRLF in shipped file contents ------------------------------------
if (fs.existsSync(OUT_DIR)) {
  for (const item of items) {
    const p = path.join(OUT_DIR, `${item.name}.json`);
    if (!fs.existsSync(p)) continue;
    const built = JSON.parse(fs.readFileSync(p, "utf8"));
    for (const f of built.files ?? []) {
      if (typeof f.content === "string" && f.content.includes("\r\n")) {
        fail(`[${item.name}] built content contains CRLF line endings`);
        break;
      }
    }
  }
}

// --- 6. Metadata completeness ----------------------------------------------
// Every item has a written description as of Phase 4. This is a FAIL, not a
// warning: a placeholder shipping to the public registry index reads as an
// abandoned project, and `description` is a required field for listing.
const placeholders = items.filter((i) => i.description.startsWith("TODO:"));
for (const p of placeholders) {
  fail(
    `[${p.name}] has a placeholder description. ` +
      `Add an entry to META in src/scripts/registry-meta.ts.`
  );
}

// Every item needs at least one category — that is the registry's search index.
for (const item of items) {
  if (!item.categories || item.categories.length === 0) {
    fail(`[${item.name}] has no categories.`);
  }
}

// --- 7. Motion-library twins ------------------------------------------------
// GSAP is the default build of every animated component; Framer Motion ships
// only as a `<name>-framer` twin beside it (see animation-library-plan.md).
// So a twin needs its base, and nothing but a twin may pull Framer in — a
// Framer-only component would have no GSAP default for the docs to show.
const FRAMER_PACKAGES = new Set(["framer-motion", "motion"]);
const itemByName = new Map(items.map((i) => [i.name, i]));
const depsOf = (item: Item) =>
  (item as Item & { dependencies?: string[] }).dependencies ?? [];

function pullsFramer(name: string, seen = new Set<string>()): boolean {
  if (seen.has(name)) return false;
  seen.add(name);
  const item = itemByName.get(name);
  if (!item) return false;
  if (depsOf(item).some((d) => FRAMER_PACKAGES.has(d))) return true;
  return (item.registryDependencies ?? []).some((ref) => {
    const dep = ref.match(/\/r\/([\w-]+)\.json$/)?.[1];
    return dep ? pullsFramer(dep, seen) : false;
  });
}

for (const item of items) {
  const isTwin = item.name.endsWith("-framer");
  if (isTwin) {
    const base = itemByName.get(item.name.replace(/-framer$/, ""));
    if (!base) {
      fail(`[${item.name}] is a Framer twin with no base (GSAP) item.`);
    } else if (base.files[0].target !== item.files[0].target) {
      fail(
        `[${item.name}] installs to ${item.files[0].target}, its base to ${base.files[0].target} — twins must share a path.`
      );
    }
    if (!fs.existsSync(demoFor(item.name))) {
      fail(`[${item.name}] has no demo (${item.name}-demo.tsx) for the docs preview to switch to.`);
    }
  } else if (pullsFramer(item.name)) {
    fail(
      `[${item.name}] pulls Framer Motion without being a -framer twin. ` +
        `Convert it to CSS, or port it to GSAP and move the Framer build to a framer/ folder.`
    );
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

console.log(`  demos cross-checked:  ${demoChecked}`);
console.log(`  items without a demo: ${undemoed.length}`);
if (undemoed.length) console.log(`        ${undemoed.join(", ")}`);
console.log("");

for (const w of warnings) console.log(`WARN  ${w}`);
if (warnings.length) console.log("");

for (const f of failures) console.error(`FAIL  ${f}`);

if (failures.length) {
  console.error(`\n${failures.length} failure(s).`);
  process.exit(1);
}

console.log(`All checks passed (${warnings.length} warning(s)).`);
