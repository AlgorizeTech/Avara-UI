"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { useFramework } from "@/hooks/use-framework";
import {
  BUILT_FRAMEWORKS,
  FRAMEWORK_META,
  type Framework,
  docsHref,
} from "@/lib/framework";

/**
 * Links a forked guide to its counterpart in the other framework.
 *
 * This carries more weight than it looks like it does, for two separate reasons.
 *
 * **Discovery.** The framework switcher is a `button` driving `router.push`, so
 * a crawler cannot follow it, and the sidebar composes every link within the
 * reader's current framework. Without this component there is no `a href` from
 * the Next.js tree into the React one anywhere on the site, and the React guides
 * are unreachable no matter what the sitemap says.
 *
 * **Rescue.** The Next.js page will usually outrank its React twin — more
 * inbound links, more authority — so most Vite readers arriving from search land
 * on the wrong one regardless. This gives them a way out at the top of the page
 * rather than after they have copied a `create-next-app` command.
 *
 * It renders a real `Link`, and the framework is known at prerender, so the
 * `a href` is in the static HTML.
 */
export function OtherFrameworkGuide({
  slug,
  label,
}: {
  /** The forked guide's slug, e.g. "installation". */
  slug: string;
  /** What the target page is called, e.g. "installation guide". */
  label: string;
}) {
  const current = useFramework();
  const other = BUILT_FRAMEWORKS.find((f) => f !== current) as Framework | undefined;

  // With only one framework built there is nothing to cross-link to.
  if (!other) return null;

  const meta = FRAMEWORK_META[other];

  return (
    <Link
      href={docsHref(other, slug)}
      className="not-prose group my-6 flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3 no-underline transition-colors hover:border-primary/40 hover:bg-primary/5 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-primary/40"
    >
      <span className="flex-1 text-sm text-zinc-600 dark:text-zinc-400">
        Using{" "}
        <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
          {meta.label}
        </strong>{" "}
        <span className="text-zinc-500 dark:text-zinc-500">({meta.hint})</span>{" "}
        instead? Read the {meta.label} {label}.
      </span>
      <ArrowRight
        aria-hidden
        className="size-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
      />
    </Link>
  );
}
