"use client";

import Sidebar from "@/components/site/sidebar";
import { TableOfContents } from "@/components/site/table-of-contents";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { DocsPagination } from "@/components/site/DocsPagination";

export function DocsLayoutContent({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-background text-foreground selection:bg-primary/25 relative">
      <div className="mx-auto max-w-[1800px] flex px-2.5 md:px-3 w-full min-w-0">
        {/* Left Navigation */}
        <Sidebar />

        {/* Center Main Content */}
        <main
          className={cn(
            "flex-1 min-w-0 w-full max-w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-5 pb-36 lg:pb-12 transition-all duration-300 ease-in-out sm:max-w-[1440px]",
          )}
        >
          {/* Reicon's type scale. Headings are Cooper at its single weight on a
              DM Sans body: every title is 24/32 and sections sit 64px apart,
              sub-sections 18/28; prose is 15px at a 1.8 line height in the ink
              at 60%. Every grey is the ink at an alpha, so the scale follows
              the theme customizer. The prose-* modifiers win over the classes
              in mdx-components.tsx, so sizes live here, not there. */}
          <div
            className="prose w-full min-w-0 max-w-full text-foreground/60
            prose-headings:font-serif prose-headings:font-normal prose-headings:text-foreground prose-headings:tracking-normal
            prose-th:font-sans prose-th:font-semibold
            prose-h1:text-2xl prose-h1:leading-8 prose-h1:mt-0 prose-h1:mb-6
            prose-h2:text-2xl prose-h2:leading-8 prose-h2:mt-16 prose-h2:mb-6 prose-h2:scroll-m-24
            prose-h3:text-lg prose-h3:leading-7 prose-h3:mt-10 prose-h3:mb-4 prose-h3:scroll-m-24
            prose-h4:text-[15px] prose-h4:leading-[1.25] prose-h4:tracking-[-0.01em] prose-h4:mt-6 prose-h4:mb-2
            prose-p:text-[15px] prose-p:leading-[1.8] prose-p:text-foreground/60 prose-p:mt-0 prose-p:mb-6
            prose-ul:text-[15px] prose-ul:leading-[1.8] prose-ul:text-foreground/60 prose-ul:mt-0 prose-ul:mb-8
            prose-ol:text-[15px] prose-ol:leading-[1.8] prose-ol:text-foreground/60 prose-ol:mt-0 prose-ol:mb-8
            prose-li:my-1 prose-li:marker:text-foreground/60
            prose-strong:font-semibold prose-strong:text-foreground
            prose-a:text-primary prose-a:font-normal prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4
            prose-code:font-mono prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
            prose-hr:border-foreground/[0.08]
            prose-img:rounded-xl prose-img:border prose-img:border-foreground/[0.06]
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
