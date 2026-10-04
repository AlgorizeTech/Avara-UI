/**
 * Writes the real component count into the files that cannot import it.
 *
 * Site code reads the count at build time (see src/lib/component-count.ts).
 * The files below are static, so this rewrites the number in place. It runs as
 * the last step of `npm run build:registry`, so any change to the registry
 * updates them too.
 *
 *   README.md,            every <!-- component-count -->N<!-- /component-count -->
 *   public/offline.html
 *   public/manifest.json  the "description" field
 *
 * Files whose count is already right are left untouched.
 */

import fs from "node:fs";
import path from "node:path";
import { getComponentCount } from "../lib/component-count";

const ROOT = process.cwd();
const count = getComponentCount();

/** Writes `next` only if it differs, and reports what happened. */
function update(relPath: string, rewrite: (current: string) => string) {
  const file = path.join(ROOT, relPath);
  const current = fs.readFileSync(file, "utf8");
  const next = rewrite(current);
  if (next === current) {
    console.log(`sync:count  ${relPath} already says ${count}`);
    return;
  }
  fs.writeFileSync(file, next);
  console.log(`sync:count  ${relPath} updated to ${count}`);
}

const MARKER = /(<!-- component-count -->)[^<]*(<!-- \/component-count -->)/g;

/** Static files that print the count inside a marker. */
const MARKED_FILES = ["README.md", "public/offline.html"];

for (const relPath of MARKED_FILES) {
  update(relPath, (text) => {
    if (!text.match(MARKER)) {
      throw new Error(
        `${relPath} has no <!-- component-count --> marker. Wrap the number in ` +
          "one rather than typing it, or it will go stale.",
      );
    }
    return text.replace(MARKER, `$1${count}$2`);
  });
}

update("public/manifest.json", (text) => {
  const manifest = JSON.parse(text) as { description?: string };
  manifest.description =
    `A React component library of ${count} animated, accessible components ` +
    "installed by the shadcn CLI straight into your project.";
  // Match the file's existing 2-space formatting and trailing newline.
  return JSON.stringify(manifest, null, 2) + (text.endsWith("\n") ? "\n" : "");
});
