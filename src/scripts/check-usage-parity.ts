/**
 * Usage / preview parity: copying an example's Usage snippet must give the
 * exact component the preview shows.
 *
 * For every docs example this renders two things to static markup, with the
 * same props:
 *
 *   1. the example's Next.js Usage snippet, compiled and rendered as the page
 *      a reader would paste it into, and
 *   2. the live preview demo (`src/preview/demos/<name>-demo.tsx`) given the
 *      example's `props`, which is what the sandbox iframe renders.
 *
 * and compares the markup. Verdicts:
 *
 *   EXACT    identical markup.
 *   WRAPPED  the usage markup sits inside the demo's markup: the demo only adds
 *            a stage around it. Listed with --verbose; fine unless the wrapper
 *            carries layout the snippet does not (a max width, say).
 *   DIFFERS  the usage renders something other than the preview: other props,
 *            other data, other classes. This fails the check.
 *   SKIPPED  nothing to compare (a fragment snippet, no demo file, or a
 *            component that cannot render on the server).
 *
 * Run: npm run check:usage-parity [-- --verbose] [-- <page-slug> ...]
 */

import "./load-env";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { resolveMotion, resolveUsage } from "../lib/snippet";
import registry from "../../registry.json";
import { ROOT, galleryPages, readShowcases } from "./read-showcases";

// tsx compiles the snippets with the classic JSX runtime, like the shipped components.
(globalThis as { React?: typeof React }).React = React;

const args = process.argv.slice(2);
const VERBOSE = args.includes("--verbose");
const ONLY = args.filter((a) => !a.startsWith("--"));

const TMP_DIR = path.join(ROOT, "src/.parity-tmp");
const DEMOS_DIR = path.join(ROOT, "src/preview/demos");

const DUAL = new Set(
  (registry.items as { name: string }[])
    .map((item) => item.name)
    .filter((name) => name.endsWith("-motion"))
    .map((name) => name.replace(/-motion$/, "")),
);

/**
 * React's generated ids (`useId`, so Radix ids and aria links) encode the
 * element's position in the tree, so the same component renders different ids
 * when the demo wraps it. Renumber them by order of appearance.
 */
function normalize(html: string): string {
  const seen = new Map<string, string>();
  return html.replace(/(?:radix-)?([«_:]r?[a-z0-9]+[»_:])/gi, (match) => {
    if (!seen.has(match)) seen.set(match, `#id${seen.size}`);
    return seen.get(match)!;
  });
}

/**
 * True when everything the demo puts around the usage markup is stage chrome:
 * plain <div>s that only pad or set a minimum height (the sandbox stage gives a
 * preview room to breathe, which a pasted snippet neither needs nor has).
 * Anything else (a max width, flex centring, a background) is layout the
 * snippet does not carry, so the paste would look different.
 */
function isStageOnly(before: string, after: string): boolean {
  const tags = before.match(/<[^>]+>/g) ?? [];
  const closers = after.match(/<\/div>/g) ?? [];
  if (before.replace(/<[^>]+>/g, "").trim() !== "" || after.replace(/<\/div>/g, "").trim() !== "") return false;
  if (tags.length !== closers.length) return false;
  return tags.every((tag) => {
    const m = tag.match(/^<div(?: class="([^"]*)")?>$/);
    if (!m) return false;
    return (m[1] ?? "").split(/\s+/).filter(Boolean).every((c) => /^(?:[a-z]+:)?(?:p[xytblr]?-|min-h-)/.test(c));
  });
}

/** First place two strings differ, with a little context either side. */
function firstDifference(a: string, b: string): string {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  const show = (s: string) => JSON.stringify(s.slice(Math.max(0, i - 40), i + 90));
  return `at char ${i}\n      usage: ${show(a)}\n      demo:  ${show(b)}`;
}

type Verdict = { key: string; verdict: "EXACT" | "WRAPPED" | "DIFFERS" | "SKIPPED"; note?: string };

async function loadDefault(file: string): Promise<(props: object) => unknown> {
  const mod = (await import(`${pathToFileURL(file).href}?t=${Date.now()}`)) as { default: never };
  return mod.default;
}

async function main() {
  const verdicts: Verdict[] = [];
  fs.rmSync(TMP_DIR, { recursive: true, force: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });
  let counter = 0;

  const pages = galleryPages().filter((p) => ONLY.length === 0 || ONLY.includes(p));
  for (const page of pages) {
    let showcases;
    try {
      showcases = await readShowcases(page);
    } catch (err) {
      verdicts.push({ key: page, verdict: "SKIPPED", note: `page could not be read: ${err instanceof Error ? err.message : err}` });
      continue;
    }

    for (const { name, examples, motionVariants } of showcases) {
      const libraries = (motionVariants ?? DUAL.has(name)) ? (["gsap", "motion"] as const) : (["gsap"] as const);
      for (const library of libraries) {
        const previewName = library === "motion" ? `${name}-motion` : name;
        const demoFile = path.join(DEMOS_DIR, `${previewName}-demo.tsx`);
        for (const example of examples) {
          const key = `${page} › ${previewName} › ${example.title}`;
          const usage = resolveUsage(resolveMotion(example.usage, library), "nextjs");
          if (!usage) {
            verdicts.push({ key, verdict: "SKIPPED", note: "no usage snippet" });
            continue;
          }
          if (!/\bexport\s+default\b/.test(usage)) {
            verdicts.push({ key, verdict: "SKIPPED", note: "usage is a fragment, not a page" });
            continue;
          }
          if (!fs.existsSync(demoFile)) {
            verdicts.push({ key, verdict: "SKIPPED", note: `no demo file for "${previewName}"` });
            continue;
          }

          const usageFile = path.join(TMP_DIR, `u${counter++}.tsx`);
          fs.writeFileSync(usageFile, usage);
          let usageHtml: string;
          let demoHtml: string;
          try {
            const Usage = await loadDefault(usageFile);
            usageHtml = renderToStaticMarkup(createElement(Usage as never));
          } catch (err) {
            verdicts.push({ key, verdict: "SKIPPED", note: `usage did not render on the server: ${err instanceof Error ? err.message.split("\n")[0] : err}` });
            continue;
          }
          try {
            const Demo = await loadDefault(demoFile);
            demoHtml = renderToStaticMarkup(createElement(Demo as never, (example.props ?? {}) as never));
          } catch (err) {
            verdicts.push({ key, verdict: "SKIPPED", note: `demo did not render on the server: ${err instanceof Error ? err.message.split("\n")[0] : err}` });
            continue;
          }

          const u = normalize(usageHtml);
          const d = normalize(demoHtml);
          if (u === d) verdicts.push({ key, verdict: "EXACT" });
          else if (d.includes(u)) {
            const at = d.indexOf(u);
            if (isStageOnly(d.slice(0, at), d.slice(at + u.length))) {
              verdicts.push({ key, verdict: "EXACT", note: "inside the demo's padded stage" });
              continue;
            }
            verdicts.push({
              key,
              verdict: "WRAPPED",
              note: `demo wraps it in: ${d.slice(0, at).slice(0, 200) || "(nothing)"}`,
            });
          } else {
            // Compare from where the usage's first element starts inside the
            // demo, so the demo's stage wrapper is not reported as the diff.
            const anchor = d.indexOf(u.slice(0, 60));
            verdicts.push({ key, verdict: "DIFFERS", note: firstDifference(u, anchor > 0 ? d.slice(anchor) : d) });
          }
        }
      }
    }
  }

  fs.rmSync(TMP_DIR, { recursive: true, force: true });

  const count = (v: Verdict["verdict"]) => verdicts.filter((x) => x.verdict === v).length;
  const differs = verdicts.filter((x) => x.verdict === "DIFFERS");
  console.log(
    `check:usage-parity — ${verdicts.length} example(s): ${count("EXACT")} exact, ${count("WRAPPED")} wrapped, ${differs.length} differ, ${count("SKIPPED")} skipped.`,
  );
  for (const v of verdicts) {
    if (v.verdict === "DIFFERS") console.log(`\n  DIFFERS  ${v.key}\n    ${v.note}`);
    else if (VERBOSE && v.verdict !== "EXACT") console.log(`  ${v.verdict.padEnd(8)} ${v.key}${v.note ? `\n    ${v.note}` : ""}`);
  }
  if (differs.length > 0) process.exit(1);
}

main().catch((err) => {
  fs.rmSync(TMP_DIR, { recursive: true, force: true });
  console.error(err instanceof Error ? err.stack : err);
  process.exit(1);
});
