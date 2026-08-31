"use client";

import { ExternalLink, Link2 } from "lucide-react";
import React from "react";

import { useFramework } from "@/hooks/use-framework";
import { CodeBlocks } from "@/components/custom/ui/codeblocks";

/**
 * Explains the `linkComponent` / `imageComponent` escape hatch on the components
 * that have one.
 *
 * These components render a plain `a` or `img` by default, which is what makes
 * one source work in every React app. That default is right for Vite and lossy
 * for Next.js — links stop prefetching, images stop being optimised — so the
 * note has something worth saying in both frameworks, and says a different thing
 * in each.
 *
 *   <InjectablePropNote prop="linkComponent" component="BreadcrumbBlock" />
 */
export function InjectablePropNote({
  prop,
  component,
}: {
  prop: "linkComponent" | "imageComponent";
  component: string;
}) {
  const framework = useFramework();
  const isLink = prop === "linkComponent";
  const Icon = isLink ? Link2 : ExternalLink;

  const element = isLink ? "a" : "img";
  const nextImport = isLink
    ? 'import Link from "next/link";'
    : 'import Image from "next/image";';
  const nextValue = isLink ? "Link" : "Image";
  const nextGain = isLink
    ? "client-side navigation and prefetching"
    : "automatic image optimisation";

  const nextCode = `${nextImport}\n\n<${component} ${prop}={${nextValue}} />`;

  return (
    <div className="not-prose my-6 w-full max-w-full rounded-xl border border-border bg-card p-4 sm:p-5 text-card-foreground shadow-2xs transition-colors">
      <div className="mb-2.5 flex items-center gap-2">
        <Icon className="size-4 shrink-0 text-primary" />
        <h4 className="text-sm sm:text-base font-semibold text-foreground">
          <code className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs sm:text-[13px] font-semibold text-foreground border border-border">
            {prop}
          </code>
        </h4>
      </div>

      {framework === "nextjs" ? (
        <>
          <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground mb-3">
            <code className="font-mono text-foreground font-semibold">&lt;{component}&gt;</code> renders a plain <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground border border-border">&lt;{element}&gt;</code> by default, so the
            same source works in any React app. In Next.js that costs you {nextGain} —
            pass <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground border border-border">{prop}</code> to get it back:
          </p>
          <div className="w-full overflow-hidden rounded-xl border border-border [&>div]:border-t-0">
            <CodeBlocks code={nextCode} language="tsx" />
          </div>
        </>
      ) : (
        <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <code className="font-mono text-foreground font-semibold">&lt;{component}&gt;</code> renders a plain <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground border border-border">&lt;{element}&gt;</code> by default, which is
          what you want in a Vite app — nothing to configure.{" "}
          {isLink ? (
            <>
              If you use React Router, pass its <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground border border-border">Link</code> instead:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground border border-border">{prop}={"{Link}"}</code>. Note React Router&apos;s{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground border border-border">Link</code> takes <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground border border-border">to</code> rather than{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground border border-border">href</code>, so wrap it if your data uses <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground border border-border">href</code>.
            </>
          ) : (
            <>
              Pass <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground border border-border">{prop}</code> if you use an image component of your own.
            </>
          )}
        </p>
      )}
    </div>
  );
}
