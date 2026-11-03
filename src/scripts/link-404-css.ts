/**
 * Gives out/404.html the full stylesheet.
 *
 * The root layout no longer imports globals.css (the home route loads a much
 * smaller generated one, see generate-home-css.ts), and Next does not attach
 * CSS imported by app/not-found.tsx to the shell of the static 404 page: only
 * the layout's reaches it. So 404.html, which a static host serves for any
 * unknown URL, came out unstyled. Every docs page carries the full stylesheet,
 * so this copies its <link> tags into 404.html.
 *
 * Runs automatically after `npm run build` (npm's `postbuild` hook). Safe to
 * run again: links already present are left alone.
 */

import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const SOURCE_PAGE = path.join(OUT, "docs", "nextjs", "index.html");
const TARGET_PAGE = path.join(OUT, "404.html");

const STYLESHEET = /<link rel="stylesheet" href="([^"]+\.css)"[^>]*\/>/g;

if (!fs.existsSync(TARGET_PAGE) || !fs.existsSync(SOURCE_PAGE)) {
  console.log("link:404-css  no static export in out/, nothing to do");
  process.exit(0);
}

const links = (html: string) =>
  [...html.matchAll(STYLESHEET)].map((m) => ({ tag: m[0], href: m[1] }));

const target = fs.readFileSync(TARGET_PAGE, "utf8");
const have = new Set(links(target).map((l) => l.href));
const missing = links(fs.readFileSync(SOURCE_PAGE, "utf8")).filter(
  (l) => !have.has(l.href),
);

if (missing.length === 0) {
  console.log("link:404-css  404.html already has the full stylesheet");
} else {
  fs.writeFileSync(
    TARGET_PAGE,
    target.replace("</head>", `${missing.map((l) => l.tag).join("")}</head>`),
  );
  console.log(
    `link:404-css  added ${missing.map((l) => l.href.split("/").pop()).join(", ")} to 404.html`,
  );
}
