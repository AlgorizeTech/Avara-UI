"use client";

import { ExternalLink, Link2 } from "lucide-react";
import React from "react";

import { useFramework } from "@/hooks/use-framework";
import { CodeBlocks } from "@/components/custom/ui/codeblocks";
import { CODE_SURFACE } from "@/components/site/code-block-client";
import { cn } from "@/lib/utils";

/**
 * Inline code in the note. `data-badge` opts out of the global !important
 * <code> chip in globals.css so these classes apply.
 */
const CODE =
  "rounded bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[12px] text-foreground/70";
/** The component name, set in full ink so it anchors the sentence. */
const COMPONENT_CODE = "font-mono text-[12px] font-medium text-foreground";

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
    // The docs callout: accent tint, 13px copy at the ink's 50% step, the
    // prop itself as the accent label.
    <div className="not-prose my-6 w-full max-w-full rounded-xl border border-primary/15 bg-primary/5 p-4 text-[13px] leading-relaxed text-foreground/50">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="size-4 shrink-0 text-primary" />
        <h4 className="text-[13px] font-medium text-primary">
          <code
            data-badge
            className="rounded-md border border-primary/25 bg-primary/15 px-[7px] py-[2px] font-mono text-[12px] leading-[1.55] text-primary"
          >
            {prop}
          </code>
        </h4>
      </div>

      {framework === "nextjs" ? (
        <>
          <p className="mb-3">
            <code data-badge className={COMPONENT_CODE}>&lt;{component}&gt;</code> renders a plain <code data-badge className={CODE}>&lt;{element}&gt;</code> by default, so the
            same source works in any React app. In Next.js that costs you {nextGain} —
            pass <code data-badge className={CODE}>{prop}</code> to get it back:
          </p>
          <div className={cn("w-full overflow-hidden rounded-md bg-background", CODE_SURFACE)}>
            <CodeBlocks code={nextCode} language="tsx" />
          </div>
        </>
      ) : (
        <p>
          <code data-badge className={COMPONENT_CODE}>&lt;{component}&gt;</code> renders a plain <code data-badge className={CODE}>&lt;{element}&gt;</code> by default, which is
          what you want in a Vite app — nothing to configure.{" "}
          {isLink ? (
            <>
              If you use React Router, pass its <code data-badge className={CODE}>Link</code> instead:{" "}
              <code data-badge className={CODE}>{prop}={"{Link}"}</code>. Note React Router&apos;s{" "}
              <code data-badge className={CODE}>Link</code> takes <code data-badge className={CODE}>to</code> rather than{" "}
              <code data-badge className={CODE}>href</code>, so wrap it if your data uses <code data-badge className={CODE}>href</code>.
            </>
          ) : (
            <>
              Pass <code data-badge className={CODE}>{prop}</code> if you use an image component of your own.
            </>
          )}
        </p>
      )}
    </div>
  );
}
