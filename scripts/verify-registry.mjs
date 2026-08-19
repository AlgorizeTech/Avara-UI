#!/usr/bin/env node
/**
 * Answers one question: does every file inlined into public/r/*.json still
 * match the source it was generated from?
 *
 * That is the same drift CI's "Fail if generated artifacts are stale" step
 * catches, but this reaches the answer without a rebuild and without touching
 * your working tree — so it also works on a commit you have not checked out.
 *
 *   node scripts/verify-registry.mjs                          # working tree
 *   node scripts/verify-registry.mjs HEAD                     # last commit
 *   node scripts/verify-registry.mjs origin/main              # any ref
 *   node scripts/verify-registry.mjs origin/my-branch         # what CI will see
 *
 * Exits 1 on drift, naming the item, the file, and the first line that differs.
 */

import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const ref = process.argv[2];

/** Reads a repo-relative path from a git ref, or from disk when no ref given. */
function read(path) {
  if (!ref) {
    if (!existsSync(path)) return null;
    return readFileSync(path, "utf8");
  }
  try {
    return execFileSync("git", ["cat-file", "blob", `${ref}:${path}`], {
      encoding: "utf8",
      maxBuffer: 1e9,
    });
  } catch {
    return null;
  }
}

/** Line number and text of the first difference, for a useful failure message. */
function firstDifference(a, b) {
  const la = a.split("\n");
  const lb = b.split("\n");
  for (let i = 0; i < Math.max(la.length, lb.length); i++) {
    if (la[i] !== lb[i]) {
      return {
        line: i + 1,
        shipped: la[i] === undefined ? "(end of file)" : la[i].trim(),
        source: lb[i] === undefined ? "(end of file)" : lb[i].trim(),
      };
    }
  }
  return null;
}

const where = ref ? `ref ${ref}` : "the working tree";
const manifestRaw = read("registry.json");
if (!manifestRaw) {
  console.error(`Could not read registry.json from ${where}.`);
  process.exit(1);
}

const manifest = JSON.parse(manifestRaw);
const problems = [];
let filesChecked = 0;

for (const item of manifest.items) {
  const builtRaw = read(`public/r/${item.name}.json`);
  if (!builtRaw) {
    problems.push({ item: item.name, detail: "declared but not built into public/r/" });
    continue;
  }

  let built;
  try {
    built = JSON.parse(builtRaw);
  } catch {
    problems.push({ item: item.name, detail: "public/r JSON is unparseable" });
    continue;
  }

  for (const file of built.files ?? []) {
    const source = read(file.path);
    if (source === null) {
      problems.push({ item: item.name, detail: `source missing: ${file.path}` });
      continue;
    }

    filesChecked++;
    if (source === file.content) continue;

    const diff = firstDifference(file.content, source);
    problems.push({
      item: item.name,
      detail: `stale: ${file.path}`,
      diff,
      sizes: `shipped ${file.content.length} chars, source ${source.length} chars`,
    });
  }
}

console.log(`Checked ${filesChecked} files across ${manifest.items.length} items in ${where}.\n`);

if (problems.length === 0) {
  console.log("All shipped content matches its source.");
  process.exit(0);
}

for (const p of problems) {
  console.log(`  ${p.item} — ${p.detail}`);
  if (p.sizes) console.log(`    ${p.sizes}`);
  if (p.diff) {
    console.log(`    first difference on line ${p.diff.line}:`);
    console.log(`      shipped: ${p.diff.shipped}`);
    console.log(`      source:  ${p.diff.source}`);
  }
}

console.log(
  `\n${problems.length} problem(s). Run 'npm run build:registry' and commit the result.`
);
process.exit(1);
