import { notFound, redirect } from "next/navigation";

import { docsHref, isFramework } from "@/lib/framework";

/**
 * Sends `/docs/<framework>` to that framework's Introduction.
 *
 * The segment root had no page before this migration, so `/docs/nextjs` was a
 * 404 — tolerable while nobody linked to it, but a bare `/docs/reactjs` is the
 * first thing someone will try after seeing the switcher, and a dead end there
 * reads as the new feature being broken.
 */
export default async function FrameworkIndexPage({
  params,
}: {
  params: Promise<{ framework: string }>;
}) {
  const { framework } = await params;
  if (!isFramework(framework)) notFound();

  redirect(docsHref(framework, "index"));
}
