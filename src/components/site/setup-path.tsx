import React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { REGISTRY_NAMESPACE } from "@/lib/registry";

import { DocLink } from "./doc-link";

/**
 * The one-line reminder that sits above every component's install command.
 *
 * Readers arrive on a component page from search or the sidebar, copy the
 * `shadcn add` command, and run it against a project that has neither Tailwind
 * nor a theme. The CLI succeeds — it writes a source file and stops — so the
 * failure surfaces later as an unstyled or wrongly-coloured component, with
 * nothing pointing back at the missing setup.
 *
 * The same sentence names the one-time `registry add`, because the short
 * `@avara-ui/…` command directly below fails with "Unknown registry" in a
 * project that has not run it — and that error does not say where to look.
 *
 * Kept to a single sentence on purpose: it has to be readable at a glance
 * directly above the command it qualifies, on ninety-odd pages, without pushing
 * that command below the fold. Boxed as a note rather than set as a paragraph
 * so it is not mistaken for the first line of the instructions.
 */
/** Inline code inside the note; `data-badge` opts out of the global chip. */
const CODE =
  "rounded bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[12px] text-foreground/70";

/**
 * The primary-tinted card the docs rail uses for its call to action
 * (table-of-contents.tsx): the same tokens, so a theme preset restyles both.
 */
const TINT_TITLE =
  "text-[oklch(from_var(--primary)_0.3_calc(c*0.6)_h)] dark:text-[oklch(from_var(--primary)_0.95_calc(c*0.25)_h)]";
const TINT_TEXT =
  "text-[oklch(from_var(--primary)_0.3_calc(c*0.6)_h_/_0.75)] dark:text-[oklch(from_var(--primary)_0.95_calc(c*0.25)_h_/_0.7)]";

export function SetupPath() {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-3 rounded-xl border p-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
        "bg-[oklch(from_var(--primary)_0.93_calc(c*0.35)_h)] border-[oklch(from_var(--primary)_0.85_calc(c*0.45)_h)]",
        "dark:bg-[oklch(from_var(--primary)_0.28_calc(c*0.45)_h)] dark:border-[oklch(from_var(--primary)_0.38_calc(c*0.5)_h)]",
      )}
    >
      <p className="min-w-0">
        <span className={cn("block text-sm font-semibold leading-snug", TINT_TITLE)}>
          New project?
        </span>
        <span className={cn("mt-1 block text-xs leading-relaxed", TINT_TEXT)}>
          Set up Tailwind CSS, shadcn and the{" "}
          <code data-badge className={CODE}>
            {REGISTRY_NAMESPACE}
          </code>{" "}
          registry once, then copy your styles from the{" "}
          <DocLink href="/themes" className="font-medium underline underline-offset-2 hover:no-underline">
            Themes page
          </DocLink>
          .
        </span>
      </p>
      <DocLink
        to="installation"
        className="group inline-flex shrink-0 items-center justify-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        Setup guide
        <ArrowRight aria-hidden className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </DocLink>
    </div>
  );
}
