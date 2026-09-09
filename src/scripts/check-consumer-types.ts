#!/usr/bin/env node
/**
 * Typecheck every published component the way a consumer's compiler will.
 *
 * Run with: npm run check:types
 *
 * This repo's own `tsconfig.json` is deliberately permissive next to the
 * configs people actually install into. `create-vite`'s React-TS template turns
 * on `noUnusedLocals`, `noUnusedParameters` and `verbatimModuleSyntax`; this
 * repo sets none of them, and it pins older dependency majors besides. The gap
 * is silent in the worst way — `next build` stays green while a component that
 * was just published fails to compile in the project that installs it.
 *
 * So: take exactly the files `registry.json` ships, and put them in front of a
 * compiler configured like the template's. The file list is derived from the
 * registry on every run, so a newly added component is covered the day it is
 * added rather than whenever someone remembers to extend a list.
 *
 * Exit code 1 on any type error.
 */

import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "../..");
const REGISTRY = path.join(ROOT, "registry.json");
const CONFIG = path.join(ROOT, "tsconfig.consumer.json");

type RegistryFile = { path: string };
type RegistryItem = { name: string; files?: RegistryFile[] };

const registry = JSON.parse(fs.readFileSync(REGISTRY, "utf-8")) as {
  items: RegistryItem[];
};

const files = [
  ...new Set(registry.items.flatMap((item) => (item.files ?? []).map((f) => f.path))),
].sort();

const missing = files.filter((f) => !fs.existsSync(path.join(ROOT, f)));
if (missing.length) {
  console.error(`registry.json points at ${missing.length} file(s) that do not exist:`);
  for (const f of missing) console.error(`  ${f}`);
  process.exit(1);
}

/** The create-vite React-TS template's compiler options, near enough. */
const config = {
  $schema: "https://json.schemastore.org/tsconfig",
  compilerOptions: {
    tsBuildInfoFile: "./node_modules/.tmp/tsconfig.consumer.tsbuildinfo",
    target: "es2023",
    lib: ["ES2023", "DOM", "DOM.Iterable"],
    module: "esnext",
    types: [],
    skipLibCheck: true,
    moduleResolution: "bundler",
    allowImportingTsExtensions: true,
    verbatimModuleSyntax: true,
    moduleDetection: "force",
    noEmit: true,
    jsx: "react-jsx",
    resolveJsonModule: true,
    allowJs: true,
    paths: { "@/*": ["./src/*"] },
    strict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true,
  },
  files,
};

fs.writeFileSync(CONFIG, `${JSON.stringify(config, null, 2)}\n`);

// Run the compiler through node rather than a shell shim: `npx.cmd` returns a
// non-zero status of its own on Windows even when tsc is happy.
const tsc = require.resolve("typescript/bin/tsc");
const result = spawnSync(process.execPath, [tsc, "-p", CONFIG, "--noEmit"], {
  cwd: ROOT,
  stdio: "inherit",
});

if (result.status !== 0) {
  console.error(
    `\n${files.length} registry file(s) checked — the errors above are what someone installing these components sees.`,
  );
  process.exit(result.status ?? 1);
}

console.log(`check:types — ${files.length} registry file(s) compile under consumer settings`);
