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
      className="not-prose group my-6 flex items-center gap-3 rounded-xl border border-foreground/[0.06] bg-foreground/[0.03] px-4 py-3 no-underline transition-colors hover:border-primary/25 hover:bg-primary/5"
    >
      <span className="flex-1 text-[13px] leading-relaxed text-foreground/50">
        Using{" "}
        <strong className="font-semibold text-foreground">
          {meta.label}
        </strong>{" "}
        <span className="text-foreground/40">({meta.hint})</span>{" "}
        instead? Read the {meta.label} {label}.
      </span>
      <ArrowRight
        aria-hidden
        className="size-4 shrink-0 text-foreground/30 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-primary"
      />
    </Link>
  );
}
