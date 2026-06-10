"use client";

import Sidebar from "@/components/site/sidebar";
import { TableOfContents } from "@/components/site/table-of-contents";
import { useTOC } from "@/contexts/toc-context";
import { cn } from "@/lib/utils";
import { PanelRightOpen } from "lucide-react";
import { ReactNode } from "react";

export function DocsLayoutContent({ children }: { children: ReactNode }) {
  const { showTOC, setShowTOC } = useTOC();

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800 relative">
      <div className="mx-auto max-w-[1800px] flex px-4 md:px-5">
        {/* Left Navigation */}
        <Sidebar />

        {/* Center Main Content */}
        <main
          className={cn(
            "flex-1 min-w-0 py-10 pb-24 lg:px-12 xl:px-16 transition-all duration-300 ease-in-out",
            // Expands the prose container when TOC is closed
            showTOC ? "max-w-7xl" : "mx-auto",
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
        </main>

        {/* Right Table of Contents */}
        {showTOC && <TableOfContents />}

        {/* Floating Toggle Button when TOC is hidden */}
        {!showTOC && (
          <button
            onClick={() => setShowTOC(true)}
            className="hidden xl:flex fixed right-0 top-[120px] z-40 p-2.5 bg-white dark:bg-zinc-900 border border-r-0 border-zinc-200 dark:border-zinc-800 rounded-l-lg shadow-sm text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200 hover:pr-4 group cursor-pointer"
            title="Show Table of Contents"
            aria-label="Show Table of Contents"
          >
            <PanelRightOpen className="w-7 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
