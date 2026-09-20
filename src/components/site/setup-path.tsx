import React from "react";
import { Info } from "lucide-react";

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
 * `@algorize-ui/…` command directly below fails with "Unknown registry" in a
 * project that has not run it — and that error does not say where to look.
 *
 * Kept to a single sentence on purpose: it has to be readable at a glance
 * directly above the command it qualifies, on ninety-odd pages, without pushing
 * that command below the fold. Boxed as a note rather than set as a paragraph
 * so it is not mistaken for the first line of the instructions.
 */
export function SetupPath() {
  return (
    <p className="mb-8 flex gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
      <Info
        aria-hidden
        className="mt-0.5 size-4 shrink-0 text-zinc-400 dark:text-zinc-500"
      />
      <span>
        New project? Follow the{" "}
        <DocLink
          to="installation"
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          installation guide
        </DocLink>{" "}
        to set up Tailwind CSS, shadcn, the <code>cn</code> helper and{" "}
        <code>lucide-react</code>,{" "}
        <DocLink
          to="installation#step-2-register-the-registry"
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          register the <code>{REGISTRY_NAMESPACE}</code> registry
        </DocLink>{" "}
        once, then copy your styles from the{" "}
        <DocLink
          href="/themes"
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Themes page
        </DocLink>
        .
      </span>
    </p>
  );
}
