"use client";

import { useTOC } from "@/contexts/toc-context";
import { useTableOfContents } from "@/hooks/use-table-of-contents";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, PanelRightClose } from "lucide-react";
import React, { useEffect, useState } from "react";

// Each TOC row is ~28px tall — used to position the tracker pill
const ROW_H = 28;

export const TableOfContents: React.FC = () => {
  const { toc, activeId, scrollToHeading } = useTableOfContents();
  const { setShowTOC } = useTOC(); // Fetch the toggle function from Context

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;

      setScrollProgress(progress);

      // Boundary checks to fix Intersection Observer edge cases
      setIsAtTop(scrolled < 100);
      setIsAtBottom(
        progress >= 99 ||
          scrolled + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 20,
      );
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!toc.length || toc.every((i) => !i.text.trim())) return null;

  // --- SMART ACTIVE ID OVERRIDE ---
  let displayActiveId = activeId;
  if (toc.length > 0) {
    if (isAtTop) {
      displayActiveId = toc[0].id;
    } else if (isAtBottom) {
      displayActiveId = toc[toc.length - 1].id;
    }
  }

  const activeIndex = toc.findIndex((item) => item.id === displayActiveId);

  // Smoothly transition color from Red (0) to Green (120) based on progress
  const dynamicColor = `hsl(${Math.round(scrollProgress * 1.2)}, 80%, 45%)`;

  return (
    <aside className="hidden xl:flex flex-col w-[228px] shrink-0 sticky top-[57px] h-[calc(100dvh-57px)] relative group">
      {/* ── Floating Close Button (Left Edge) ──────────────── */}
      <button
        onClick={() => setShowTOC(false)}
        className="absolute top-[30px] -left-3.5 z-20 flex items-center justify-center p-1 rounded-md bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 shadow-sm text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
        title="Hide Table of Contents"
        aria-label="Hide Table of Contents"
      >
        <PanelRightClose className="w-4 h-4" />
      </button>

      <div className="flex flex-col h-full border-l border-zinc-200 dark:border-zinc-800/70 bg-white/50 dark:bg-transparent">
        {/* ── Header ─────────────────────────────────── */}
        <div className="px-5 pt-8 pb-4 flex-shrink-0">
          {/* Label row */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
              On this page
            </span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2.5">
            <div className="flex-1 h-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full origin-left"
                style={{ backgroundColor: dynamicColor }}
                animate={{ scaleX: scrollProgress / 100 }}
                transition={{ duration: 0.12, ease: "linear" }}
              />
            </div>
            <span
              className="text-[10.5px] font-bold tabular-nums w-7 text-right transition-colors duration-100"
              style={{ color: dynamicColor }}
            >
              {Math.round(scrollProgress)}%
            </span>
          </div>
        </div>

        <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-shrink-0" />

        {/* ── TOC list ───────────────────────────────── */}
        <div className="flex-1 overflow-y-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <nav
            role="navigation"
            aria-label="Table of contents"
            className="relative py-1"
          >
            {/* Static track line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

            {/* Animated tracker pill */}
            {activeIndex >= 0 && (
              <motion.div
                className="absolute left-[18px] w-[3px] rounded-full bg-zinc-900 dark:bg-zinc-100"
                initial={false}
                animate={{
                  top: activeIndex * ROW_H + 6,
                  height: 16,
                }}
                transition={{ type: "spring", stiffness: 340, damping: 32 }}
              />
            )}

            {toc.map((item) => {
              const isActive = item.id === displayActiveId;
              const indent = Math.max(0, item.level - 2) * 14;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  style={{ paddingLeft: `${36 + indent}px` }}
                  className={cn(
                    "w-full text-left py-[5px] pr-5 text-[12.5px] leading-snug",
                    "transition-colors duration-150 truncate block cursor-pointer",
                    "h-[28px] flex items-center",
                    isActive
                      ? "text-zinc-900 dark:text-zinc-50 font-semibold"
                      : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300",
                  )}
                >
                  {item.text}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-shrink-0" />

        {/* ── Footer nav ─────────────────────────────── */}
        <div className="flex-shrink-0 px-3 py-3 flex gap-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5",
              "py-[7px] rounded-lg text-[11.5px] font-medium",
              "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
              "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/80",
              "hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700",
              "transition-all duration-150 cursor-pointer shadow-sm",
            )}
          >
            <ArrowUp className="w-3 h-3" /> Top
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
              "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
              "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/80",
              "hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700",
              "transition-all duration-150 cursor-pointer shadow-sm",
            )}
          >
            <ArrowDown className="w-3 h-3" /> End
          </button>
        </div>
      </div>
    </aside>
  );
};
