"use client";

import Sidebar from "@/components/site/sidebar";
import { TableOfContents } from "@/components/site/table-of-contents";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { DocsPagination } from "@/components/site/DocsPagination";

export function DocsLayoutContent({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800 relative">
      <div className="mx-auto max-w-[1800px] flex px-2.5 md:px-3 w-full min-w-0">
        {/* Left Navigation */}
        <Sidebar />

        {/* Center Main Content */}
        <main
          className={cn(
            "flex-1 min-w-0 w-full max-w-full px-2 sm:px-4 py-6 lg:py-8 xl:px-6 xl:py-12 transition-all duration-300 ease-in-out sm:max-w-[1440px]",
          )}
        >
          {/* Docs typography. Cooper headings on a DM Sans body, and every
              colour comes from the theme tokens so the palette (and the
              customizer) reaches the prose: headings are the foreground,
              paragraphs the 70% muted tone, links the foreground with an
              underline. The prose-* modifiers win over the classes in
              mdx-components.tsx, so sizes live here, not there. */}
          <div
            className="prose prose-zinc dark:prose-invert max-w-none w-full min-w-0 max-w-full
            prose-headings:font-serif prose-headings:text-foreground prose-headings:tracking-[-0.01em]
            prose-h1:text-[clamp(34px,6vw,52px)] prose-h1:font-normal prose-h1:leading-[1.2] prose-h1:mb-6
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-16 prose-h2:mb-4 prose-h2:scroll-m-24
            prose-h3:text-lg prose-h3:font-semibold prose-h3:scroll-m-24
            prose-h4:text-[15px] prose-h4:font-semibold prose-h4:leading-[1.25]
            prose-p:text-sm prose-p:leading-relaxed prose-p:text-muted-foreground
            prose-li:text-sm prose-li:leading-relaxed prose-li:text-muted-foreground prose-li:marker:text-muted-foreground/60
            prose-strong:text-foreground
            prose-a:text-foreground prose-a:underline-offset-4 hover:prose-a:text-muted-foreground
            prose-blockquote:border-border prose-blockquote:text-muted-foreground
            prose-hr:border-border
            prose-th:text-foreground prose-td:text-muted-foreground prose-tr:border-border prose-thead:border-border
            prose-code:text-[13px] prose-code:font-mono prose-code:font-semibold prose-code:text-foreground prose-code:shadow-none
            [&_:not(pre)>code:not([data-badge])]:border [&_:not(pre)>code:not([data-badge])]:border-border [&_:not(pre)>code:not([data-badge])]:bg-muted [&_:not(pre)>code:not([data-badge])]:px-1.5 [&_:not(pre)>code:not([data-badge])]:py-0.5 [&_:not(pre)>code:not([data-badge])]:rounded-md
            prose-code:before:content-none prose-code:after:content-none
            prose-img:rounded-2xl prose-img:border prose-img:border-border
          "
          >
            {children}
          </div>
          
          <DocsPagination />
        </main>

        {/* Right Table of Contents */}
        <TableOfContents />
      </div>
    </div>
  );
}
