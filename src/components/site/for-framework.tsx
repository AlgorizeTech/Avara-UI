"use client";

import React from "react";

import { useFramework } from "@/hooks/use-framework";
import type { Framework } from "@/lib/framework";

/**
 * Shows its children only in the named framework.
 *
 * A scalpel, not the architecture. Most pages need none of this: 85 of the 98
 * component pages are already framework-neutral, and the ones that differ do so
 * inside code strings, where a React component cannot reach — those use a
 * variant snippet map instead.
 *
 * Reach for this only when a sentence or a table row genuinely reads differently
 * per framework. If it ever wraps more than a paragraph on a component page,
 * that page wanted a snippet variant, or a fork.
 *
 * Both branches ship in the HTML, since the choice is made on the client. That
 * is fine for a row or a sentence and is the reason it must not grow.
 *
 *   <ForFramework only="nextjs">…Next.js wording…</ForFramework>
 *   <ForFramework only="reactjs">…React wording…</ForFramework>
 */
export function ForFramework({
  only,
  children,
}: {
  only: Framework;
  children: React.ReactNode;
}) {
  return useFramework() === only ? <>{children}</> : null;
}
