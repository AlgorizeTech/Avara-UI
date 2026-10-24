/**
 * Open in v0 — one docs example as a registry item, in the reader's theme.
 *
 * GET /r/v0-themed/<component>/<example>/item.json?preset=…&radius=…&mode=…
 * (rewritten here by vercel.json). Reads the static item the build wrote to
 * /r/v0/<component>/<example>.json and adds app/globals.css + app/layout.tsx
 * for the theme in the query. See src/lib/open-in-v0.ts.
 *
 * The site is a static export; this is its only function. Vercel serves any
 * file in /api as one, independent of the Next build.
 */

import {
  V0_ITEM_PATTERN,
  themeFromParams,
  themedFiles,
} from "../src/lib/open-in-v0";

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  // The same query always yields the same item until the next deploy.
  "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
};

const error = (status: number, message: string) =>
  new Response(JSON.stringify({ error: message }), { status, headers: HEADERS });

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const item = url.searchParams.get("item") ?? "";
  if (!V0_ITEM_PATTERN.test(item)) return error(400, "Unknown example.");

  const base = await fetch(`${url.origin}/r/v0/${item}.json`);
  if (!base.ok) return error(404, "Unknown example.");

  const registryItem = (await base.json()) as { title?: string; files: unknown[] };
  registryItem.files.push(
    ...themedFiles(themeFromParams(url.searchParams), registryItem.title ?? "Avara UI"),
  );

  return new Response(JSON.stringify(registryItem), { headers: HEADERS });
}
