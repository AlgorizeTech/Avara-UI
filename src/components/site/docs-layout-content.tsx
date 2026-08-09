"use client";

import Sidebar from "@/components/site/sidebar";
import { TableOfContents } from "@/components/site/table-of-contents";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { DocsPagination } from "@/components/site/DocsPagination";

export function DocsLayoutContent({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800 relative">
      <div className="mx-auto max-w-[1800px] flex px-4 md:px-5">
        {/* Left Navigation */}
        <Sidebar />

        {/* Center Main Content */}
        <main
          className={cn(
            "flex-1 min-w-0 px-4 py-6 lg:px-6 lg:py-8 xl:px-8 xl:py-12 transition-all duration-300 ease-in-out max-w-7xl",
          )}
        >
          {/* Premium Typography Prose overrides */}
          <div
            className="prose prose-zinc dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight 
            prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mb-8
            prose-h2:text-2xl sm:prose-h2:text-2xl prose-h2:mt-16 prose-h2:scroll-m-24 
            prose-h3:text-xl prose-h3:font-semibold prose-h3:scroll-m-24
            prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400
            prose-a:text-zinc-900 dark:prose-a:text-zinc-100 prose-a:underline-offset-4 hover:prose-a:text-zinc-600 dark:hover:prose-a:text-zinc-300
            prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-pre:shadow-lg
            prose-code:text-[13px] prose-code:text-zinc-800 dark:prose-code:text-zinc-200
            prose-code:before:content-none prose-code:after:content-none
            prose-img:rounded-2xl prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800
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
