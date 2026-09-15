import React from "react";

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
 * Kept to a single sentence on purpose: it has to be readable at a glance
 * directly above the command it qualifies, on ninety-odd pages, without pushing
 * that command below the fold.
 */
export function SetupPath() {
  return (
    <p className="my-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
      New project? Follow the{" "}
      <DocLink
        to="installation"
        className="font-medium text-blue-600 hover:underline dark:text-blue-400"
      >
        installation guide
      </DocLink>{" "}
      to set up Tailwind CSS, shadcn, the <code>cn</code> helper and{" "}
      <code>lucide-react</code> first, then copy your styles from the{" "}
      <DocLink
        href="/themes"
        className="font-medium text-blue-600 hover:underline dark:text-blue-400"
      >
        Themes page
      </DocLink>
      .
    </p>
  );
}
