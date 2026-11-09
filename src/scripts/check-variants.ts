#!/usr/bin/env node
/**
 * Variant data checks for the "ask before picking a variant" agent workflow.
 *
 * Run with: npm run check:variants
 *
 * `src/agent/variants/<slug>.ts` is hand-written and everything the agent sees
 * is generated from it, so a wrong `item`, `demo` or `example` would publish a
 * broken install command or a dead preview without any build error. This
 * script is the gate. See AGENT-WORKFLOW-PLAN.md section 3.
 *
 * Exit code 1 on any FAIL. WARNs are reported but do not block.
 */

import fs from "fs";
import path from "path";

import { NO_CHOICE_NEEDED, PENDING_ROLLOUT, pageVariants } from "../agent/variants";
import { itemNotice } from "../agent/variants/render";
import { sandboxNames } from "../preview/names";
import { headingSlugs, parseInstallations, parseShowcases } from "../lib/mdx-showcases";
import { slugify } from "../lib/open-in-v0";

const ROOT = path.resolve(__dirname, "../..");
const DOCS_DIR = path.join(ROOT, "src/app/docs/[framework]");
const REGISTRY = path.join(ROOT, "registry.json");

const failures: string[] = [];
const warnings: string[] = [];
const fail = (msg: string) => failures.push(msg);
const warn = (msg: string) => warnings.push(msg);

const SUMMARY_MAX = 120;
const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// MDX reading lives in src/lib/mdx-showcases.ts (shared with the /view pages).
const docsPath = (slug: string) => path.join(DOCS_DIR, slug, "page.mdx");
const hasDocsPage = (slug: string) => fs.existsSync(docsPath(slug));

// ---------------------------------------------------------------------------
// Inputs
// ---------------------------------------------------------------------------

if (!fs.existsSync(REGISTRY)) {
  console.error("FAIL: registry.json does not exist. Run: npm run generate:registry");
  process.exit(1);
}
const registryList = (JSON.parse(fs.readFileSync(REGISTRY, "utf-8")) as { items: { name: string; description?: string }[] })
  .items;
const registryItems = new Set(registryList.map((i) => i.name));
const demoNames = new Set<string>(sandboxNames);

// ---------------------------------------------------------------------------
// 1. Each variants file
// ---------------------------------------------------------------------------

const seenSlugs = new Set<string>();

for (const page of pageVariants) {
  const where = `variants/${page.slug}`;

  if (seenSlugs.has(page.slug)) fail(`${where}: page registered twice in src/agent/variants/index.ts`);
  seenSlugs.add(page.slug);

  if (!page.intro?.trim()) fail(`${where}: "intro" is empty`);

  if (!hasDocsPage(page.slug)) {
    fail(`${where}: no docs page at src/app/docs/[framework]/${page.slug}/page.mdx`);
    continue;
  }
  const mdx = fs.readFileSync(docsPath(page.slug), "utf-8");
  const showcases = parseShowcases(mdx);
  const installations = new Set(parseInstallations(mdx));
  const headings = headingSlugs(mdx);

  if (page.variants.length < 2) {
    fail(`${where}: has ${page.variants.length} variant(s); a variants file needs 2 or more (a single option belongs in NO_CHOICE_NEEDED)`);
  }

  (page.whenNot ?? []).forEach((w, n) => {
    if (!w.use?.trim() || !w.reason?.trim()) fail(`${where}: whenNot[${n}] needs "use" and "reason"`);
    if (!hasDocsPage(w.slug)) fail(`${where}: whenNot[${n}].slug "${w.slug}" is not a docs page`);
  });
  // A click-to-pick question holds 2 to 4 options, so a page with 4 or more
  // variants is offered as groups first, then one group's variants.
  if (page.variants.length >= 4) {
    const byGroup = new Map<string, number>();
    page.variants.forEach((v) => {
      if (!v.group?.trim()) fail(`${where}: variant "${v.id}" needs a "group" (the page has ${page.variants.length} variants; a picker holds at most 4 options per question)`);
      else byGroup.set(v.group, (byGroup.get(v.group) ?? 0) + 1);
    });
    if (byGroup.size > 4) fail(`${where}: ${byGroup.size} groups; a picker holds at most 4 (${[...byGroup.keys()].join(", ")})`);
    for (const [name, count] of byGroup) {
      if (count > 4) fail(`${where}: group "${name}" has ${count} variants; a picker holds at most 4`);
      if (count < 2) fail(`${where}: group "${name}" has only ${count} variant; merge it into another group`);
    }
  }
  (page.relatedItems ?? []).forEach((name, n) => {
    if (!registryItems.has(name)) fail(`${where}: relatedItems[${n}] "${name}" is not in registry.json`);
    if (page.variants.some((v) => v.item === name)) fail(`${where}: relatedItems[${n}] "${name}" is already a variant item`);
  });
  (page.gotchas ?? []).forEach((g, n) => {
    if (!g.trim()) fail(`${where}: gotchas[${n}] is empty`);
  });

  const ids = new Set<string>();
  const anchors = new Map<string, string>(); // anchor -> variant id

  for (const v of page.variants) {
    const at = `${where}/${v.id || "(no id)"}`;

    // Required fields.
    if (!v.id || !ID_PATTERN.test(v.id)) fail(`${at}: "id" must be lowercase letters, digits and hyphens`);
    if (ids.has(v.id)) fail(`${at}: duplicate id`);
    ids.add(v.id);
    if (!v.label?.trim()) fail(`${at}: "label" is empty`);
    if (!v.summary?.trim()) fail(`${at}: "summary" is empty`);
    else if (v.summary.length > SUMMARY_MAX) fail(`${at}: "summary" is ${v.summary.length} chars, max ${SUMMARY_MAX}`);
    for (const key of ["bestFor", "avoidIf", "traits"] as const) {
      const list = v[key];
      if (!Array.isArray(list) || list.length === 0) fail(`${at}: "${key}" needs at least one entry`);
      else if (list.some((s) => !s.trim())) fail(`${at}: "${key}" has an empty entry`);
    }

    // Registry item and preview demo are separate namespaces.
    if (!registryItems.has(v.item)) fail(`${at}: item "${v.item}" is not in registry.json`);
    if (!demoNames.has(v.demo)) {
      fail(`${at}: demo "${v.demo}" is not in src/preview/names.ts (run npm run generate:preview if you just added it)`);
    }

    if (v.props !== undefined) {
      try {
        if (JSON.stringify(v.props) === undefined) throw new Error("not serialisable");
        JSON.parse(JSON.stringify(v.props));
      } catch {
        fail(`${at}: "props" must be JSON-serialisable (it is sent as ?props=<json>)`);
      }
    }

    // The example must exist on the page, inside a showcase that renders `demo`.
    const sameDemo = showcases.filter((s) => s.name === v.demo);
    const example = sameDemo.flatMap((s) => s.examples).find((e) => e.title === v.example);
    if (!example) {
      const elsewhere = showcases.find((s) => s.examples.some((e) => e.title === v.example));
      if (elsewhere) {
        fail(`${at}: example "${v.example}" is in the showcase "${elsewhere.name}", not "${v.demo}"; set demo to "${elsewhere.name}"`);
      } else {
        fail(`${at}: example "${v.example}" is not a title on ${page.slug}/page.mdx`);
      }
    } else {
      const anchor = example.id ?? slugify(example.title);
      const prior = anchors.get(anchor);
      if (prior) fail(`${at}: anchor "#${anchor}" is already used by variant "${prior}"; give one of the examples a distinct "id"`);
      anchors.set(anchor, v.id);
      if (headings.has(anchor)) {
        warn(`${at}: anchor "#${anchor}" is also a section heading on the page, so the docs link lands on the heading; give the example a distinct "id" to fix`);
      }
    }

    if (!installations.has(v.item)) {
      warn(`${at}: no <Installation name="${v.item}"> on the docs page; the "Docs" link may not show how to install it`);
    }
  }
}

// ---------------------------------------------------------------------------
// 2. Pages that look like they need a choice must be classified
// ---------------------------------------------------------------------------

const withFile = new Set(pageVariants.map((p) => p.slug));
const noChoice = new Set(NO_CHOICE_NEEDED);
const pending = new Set(PENDING_ROLLOUT.map((p) => p.slug));

for (const list of [
  { name: "NO_CHOICE_NEEDED", slugs: [...noChoice] },
  { name: "PENDING_ROLLOUT", slugs: [...pending] },
]) {
  for (const slug of list.slugs) {
    if (!hasDocsPage(slug)) fail(`${list.name}: "${slug}" is not a docs page`);
    if (withFile.has(slug)) fail(`${list.name}: "${slug}" has a variants file; remove it from ${list.name}`);
  }
}
for (const slug of noChoice) {
  if (pending.has(slug)) fail(`"${slug}" is in both NO_CHOICE_NEEDED and PENDING_ROLLOUT`);
}
if (pending.size !== PENDING_ROLLOUT.length) fail("PENDING_ROLLOUT lists a page twice");
if (noChoice.size !== NO_CHOICE_NEEDED.length) fail("NO_CHOICE_NEEDED lists a page twice");

const flagged: string[] = [];
for (const entry of fs.readdirSync(DOCS_DIR, { withFileTypes: true })) {
  if (!entry.isDirectory() || !hasDocsPage(entry.name)) continue;
  const slug = entry.name;
  const mdx = fs.readFileSync(docsPath(slug), "utf-8");
  const separateItems = parseInstallations(mdx).length >= 2;
  const variantProps = parseShowcases(mdx).some((s) => s.examples.some((e) => e.hasVariantProp));
  if (!separateItems && !variantProps) continue;
  if (withFile.has(slug) || noChoice.has(slug) || pending.has(slug)) continue;
  flagged.push(
    `${slug}: ${separateItems ? "installs 2+ items" : "has examples with a \"variant\" prop"} but is not classified. ` +
      `Write src/agent/variants/${slug}.ts, or add it to NO_CHOICE_NEEDED (it offers one option) or PENDING_ROLLOUT in src/agent/variants/index.ts`,
  );
}
flagged.forEach(fail);

// ---------------------------------------------------------------------------
// 4. What is generated from the variants files is in place
// ---------------------------------------------------------------------------

for (const page of pageVariants) {
  // The docs page must show the "For AI agents" block.
  if (hasDocsPage(page.slug) && !new RegExp(`<AgentVariants\\s+slug="${page.slug}"\\s*/>`).test(fs.readFileSync(docsPath(page.slug), "utf-8"))) {
    fail(`variants/${page.slug}: the docs page has no <AgentVariants slug="${page.slug}" /> block`);
  }
}
// Each variant item's registry description must open with the ask-first notice
// (a stale registry.json: run npm run generate:registry).
for (const item of registryList) {
  const notice = itemNotice(item.name);
  if (notice && !item.description?.startsWith(notice)) {
    fail(`registry.json: "${item.name}" needs the ask-first notice but its description does not open with the ask-first notice. Run: npm run generate:registry`);
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const variantCount = pageVariants.reduce((n, p) => n + p.variants.length, 0);
console.log(
  `check:variants: ${pageVariants.length} page(s) with variants (${variantCount} variants), ` +
    `${noChoice.size} no-choice, ${pending.size} pending rollout.`,
);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`  WARN ${w}`));
}
if (failures.length) {
  console.error(`\n${failures.length} failure(s):`);
  failures.forEach((f) => console.error(`  FAIL ${f}`));
  process.exit(1);
}
console.log("OK");
