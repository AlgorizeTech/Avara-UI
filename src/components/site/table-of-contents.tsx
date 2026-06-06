"use client";

import { useTableOfContents } from "@/hooks/use-table-of-contents";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

// Each TOC row is ~28px tall — used to position the tracker pill
const ROW_H = 28;

export const TableOfContents: React.FC = () => {
  const { toc, activeId, scrollToHeading } = useTableOfContents();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setScrollProgress(
        total > 0 ? Math.min(100, (scrolled / total) * 100) : 0,
      );
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!toc.length || toc.every((i) => !i.text.trim())) return null;

  const activeIndex = toc.findIndex((item) => item.id === activeId);

  return (
    <aside className="hidden xl:flex flex-col w-[228px] shrink-0 sticky top-[57px] h-[calc(100dvh-57px)] overflow-hidden">
      {/*
        Outer card — sits as a panel within the layout.
        Remove the border/rounded if your layout already provides a right edge.
      */}
      <div className="flex flex-col h-full border-l border-zinc-100 dark:border-zinc-800/70">
        {/* ── Header ─────────────────────────────────── */}
        <div className="px-5 pt-8 pb-4 flex-shrink-0">
          {/* Label row */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
              On this page
            </span>
            <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2.5">
            <div className="flex-1 h-[2px] bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full origin-left"
                animate={{ scaleX: scrollProgress / 100 }}
                transition={{ duration: 0.12, ease: "linear" }}
              />
            </div>
            <span className="text-[10.5px] font-semibold tabular-nums text-zinc-400 dark:text-zinc-500 w-7 text-right">
              {Math.round(scrollProgress)}%
            </span>
          </div>
        </div>

        <div className="h-px bg-zinc-100 dark:bg-zinc-800 flex-shrink-0" />

        {/* ── TOC list ───────────────────────────────── */}
        <div className="flex-1 overflow-y-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <nav
            role="navigation"
            aria-label="Table of contents"
            className="relative py-1"
          >
            {/* Static track line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-zinc-100 dark:bg-zinc-800" />

            {/* Animated tracker pill */}
            {activeIndex >= 0 && (
              <motion.div
                className="absolute left-[18px] w-[3px] rounded-full bg-zinc-900 dark:bg-zinc-100"
                initial={false}
                animate={{
                  top: activeIndex * ROW_H + 6,
                  height: 16,
                }}
                transition={{
                  type: "spring",
                  stiffness: 340,
                  damping: 32,
                }}
              />
            )}

            {toc.map((item, i) => {
              const isActive = item.id === activeId;
              // h2 = level 2, h3 = level 3, etc. (level 1 treated same as h2)
              const indent = Math.max(0, item.level - 2) * 14;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  style={{ paddingLeft: `${36 + indent}px` }}
                  className={cn(
                    "w-full text-left py-[5px] pr-5 text-[12.5px] leading-snug",
                    "transition-colors duration-150 truncate block",
                    "h-[28px] flex items-center",
                    isActive
                      ? "text-zinc-900 dark:text-zinc-50 font-medium"
                      : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300",
                  )}
                >
                  {item.text}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="h-px bg-zinc-100 dark:bg-zinc-800 flex-shrink-0" />

        {/* ── Footer nav ─────────────────────────────── */}
        <div className="flex-shrink-0 px-3 py-3 flex gap-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5",
              "py-[7px] rounded-lg text-[11.5px] font-medium",
              "bg-zinc-50 dark:bg-zinc-900",
              "border border-zinc-200/80 dark:border-zinc-800",
              "text-zinc-500 dark:text-zinc-400",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800/80",
              "hover:text-zinc-700 dark:hover:text-zinc-200",
              "hover:border-zinc-300 dark:hover:border-zinc-700",
              "transition-all duration-150",
            )}
          >
            <ArrowUp className="w-3 h-3" />
            Top
          </button>
          <button
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5",
              "py-[7px] rounded-lg text-[11.5px] font-medium",
              "bg-zinc-50 dark:bg-zinc-900",
              "border border-zinc-200/80 dark:border-zinc-800",
              "text-zinc-500 dark:text-zinc-400",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800/80",
              "hover:text-zinc-700 dark:hover:text-zinc-200",
              "hover:border-zinc-300 dark:hover:border-zinc-700",
              "transition-all duration-150",
            )}
          >
            <ArrowDown className="w-3 h-3" />
            End
          </button>
        </div>
      </div>
    </aside>
  );
};
