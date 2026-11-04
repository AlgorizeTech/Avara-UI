/**
 * When a page last really changed, read from git history at build time.
 *
 * Feeds the sitemap's `lastmod`, the docs pages' `dateModified` and the visible
 * "Last updated" line, so all three say the same thing. Bing uses `lastmod` to
 * decide what to recrawl and asks that it not be the build time, which is what
 * a date from the clock would be.
 *
 * A build without full history (no .git, or a shallow clone, where every older
 * file would look as new as the clone) reports no dates rather than wrong ones.
 *
 * Node-only: reads from git. Call it from server code at build time.
 */

import { execFileSync } from "node:child_process";

import { installedItems, itemsByName, pageSource } from "@/lib/docs-source";
import { FORKED_SLUGS, type Framework } from "@/lib/framework";

const DOCS = "src/app/docs/[framework]";

const git = (...args: string[]) =>
  execFileSync("git", args, {
    encoding: "utf8",
    maxBuffer: 1 << 28,
    stdio: ["ignore", "pipe", "ignore"],
  });

function readCommitDates(): Map<string, string> {
  const dates = new Map<string, string>();
  try {
    if (git("rev-parse", "--is-shallow-repository").trim() === "true") return dates;
    let date = "";
    // Newest first, so the first date seen for a file is its latest.
    for (const line of git("log", "--format=%x00%cI", "--name-only", "--", "src").split("\n")) {
      if (line.startsWith("\0")) date = line.slice(1);
      else if (line && !dates.has(line)) dates.set(line, date);
    }
  } catch {
    // No git here: stay empty, and the callers leave their dates out.
  }
  return dates;
}

let commitDates: Map<string, string> | undefined;

/** The newest commit date among these files or folders, as ISO 8601. */
export function lastCommit(...paths: string[]): string | undefined {
  commitDates ??= readCommitDates();
  let newest: string | undefined;
  for (const [file, date] of commitDates) {
    if (!paths.some((p) => file === p || file.startsWith(`${p}/`))) continue;
    if (!newest || Date.parse(date) > Date.parse(newest)) newest = date;
  }
  return newest;
}

/**
 * When a docs page last changed: its own source, and the source of the
 * components it installs, which is what its examples and props describe.
 */
export function docsPageModified(slug: string, framework: Framework): string | undefined {
  const page = FORKED_SLUGS.includes(slug)
    ? [`${DOCS}/${slug}/_content/${framework}.mdx`]
    : [`${DOCS}/${slug}/page.mdx`, `${DOCS}/${slug}/page.tsx`];
  const components = installedItems(pageSource(slug, framework) ?? "").flatMap((name) =>
    (itemsByName.get(name)?.files ?? []).map((file) => file.path),
  );
  return lastCommit(...page, ...components);
}
