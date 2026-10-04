import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { BUILT_FRAMEWORKS, isFramework } from "@/lib/framework";

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

/*
 * No robots rule here. The non-default framework's component pages are the same
 * document as their Next.js twins, and each one says so with a canonical link
 * (see docsPageMetadata in src/lib/docs-metadata.ts). A `noindex` on top of that
 * would send search engines two conflicting signals for one page.
 */

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
