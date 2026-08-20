"use client";

import { ExternalLink, Link2 } from "lucide-react";
import React from "react";

import { useFramework } from "@/hooks/use-framework";

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

  return (
    <div className="not-prose my-6 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="size-4 shrink-0 text-primary" />
        <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] dark:bg-zinc-800">
            {prop}
          </code>
        </h4>
      </div>

      {framework === "nextjs" ? (
        <>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {component} renders a plain <code>&lt;{element}&gt;</code> by default, so the
            same source works in any React app. In Next.js that costs you {nextGain} —
            pass <code>{prop}</code> to get it back:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-950 p-3 text-[12.5px] leading-relaxed text-zinc-100">
            <code>{`${nextImport}

<${component} ${prop}={${nextValue}} />`}</code>
          </pre>
        </>
      ) : (
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {component} renders a plain <code>&lt;{element}&gt;</code> by default, which is
          what you want in a Vite app — nothing to configure.{" "}
          {isLink ? (
            <>
              If you use React Router, pass its <code>Link</code> instead:{" "}
              <code>{prop}={"{Link}"}</code>. Note React Router&apos;s{" "}
              <code>Link</code> takes <code>to</code> rather than{" "}
              <code>href</code>, so wrap it if your data uses <code>href</code>.
            </>
          ) : (
            <>
              Pass <code>{prop}</code> if you use an image component of your own.
            </>
          )}
        </p>
      )}
    </div>
  );
}
