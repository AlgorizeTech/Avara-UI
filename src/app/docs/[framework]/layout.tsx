import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import {
  BUILT_FRAMEWORKS,
  DEFAULT_FRAMEWORK,
  isFramework,
} from "@/lib/framework";

/**
 * Restricts `[framework]` to the built set.
 *
 * `generateStaticParams` alone is only a build manifest — it says "prerender
 * these", not "reject everything else". `dynamicParams = false` is what actually
 * turns `/docs/vue/button` into a 404, resolved at the routing layer before any
 * of this code runs.
 *
 * The runtime guard below is unreachable in production because of that flag, and
 * is kept anyway for two reasons: dev mode does not enforce `dynamicParams` the
 * same way, so without it `/docs/vue` would behave differently under `next dev`
 * than under `next start`; and it narrows the param type from `string` to
 * `Framework` for anything downstream.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return BUILT_FRAMEWORKS.map((framework) => ({ framework }));
}

/**
 * Keeps the non-default framework's component pages out of the index.
 *
 * Those pages are byte-identical to their Next.js twins — the components import
 * nothing from `next/*`, so an accordion page is one document served at two
 * addresses. Indexing both splits link equity and spends crawl budget to no
 * benefit, and there is nothing on the React copy a reader could not get from
 * the page that stays indexed.
 *
 * `follow` stays on: the pages are real, reachable and internally linked, and
 * their links should still carry weight.
 *
 * The genuinely different pages opt back in rather than being excepted here — a
 * layout cannot see which slug is rendering, and page metadata overrides layout
 * metadata field by field, so `buildDocsMetadata` sets `robots.index` itself for
 * the forked guides. Adding a slug to FORKED_SLUGS without routing it through
 * that factory would silently leave it noindexed.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ framework: string }>;
}) {
  const { framework } = await params;

  if (!isFramework(framework) || framework === DEFAULT_FRAMEWORK) return {};

  return { robots: { index: false, follow: true } };
}

export default async function FrameworkLayout({
  children,
  params,
}: {
  children: ReactNode;
  // Next.js 15: params is a Promise and must be awaited.
  params: Promise<{ framework: string }>;
}) {
  const { framework } = await params;
  if (!isFramework(framework)) notFound();

  return <>{children}</>;
}
