"use client";

import { TOCItem, useTableOfContents } from "@/hooks/use-table-of-contents";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

export const TableOfContents: React.FC = () => {
  const { toc, activeId, scrollToHeading } = useTableOfContents();

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

  // Group items into chapters by H1 Root (#) or H2 sections unconditionally
  const chapters = useMemo(() => {
    const result: { root?: TOCItem; items: TOCItem[] }[] = [];
    let currentChapter: { root?: TOCItem; items: TOCItem[] } = { items: [] };

    toc.forEach((item) => {
      if (item.level === 1 || (item.level === 2 && !currentChapter.root)) {
        if (currentChapter.root || currentChapter.items.length > 0) {
          result.push(currentChapter);
        }
        currentChapter = { root: item, items: [] };
      } else {
        currentChapter.items.push(item);
      }
    });
    if (currentChapter.root || currentChapter.items.length > 0) {
      result.push(currentChapter);
    }
    return result;
  }, [toc]);

  // Early Return
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

  // Determine active chapter
  const activeChapterIndex = chapters.findIndex(
    (ch) =>
      ch.root?.id === displayActiveId ||
      ch.items.some((i) => i.id === displayActiveId),
  );

  const activeChapter =
    activeChapterIndex !== -1 ? chapters[activeChapterIndex] : chapters[0];

  const dynamicColor =
    scrollProgress > 50
      ? `rgb(${Math.round(255 - ((scrollProgress - 50) / 50) * 200)}, 180, 100)`
      : `rgb(100, 180, ${Math.round(255 - (scrollProgress / 50) * 150)})`;

  return (
    <aside className="hidden lg:flex flex-col w-[210px] 2xl:w-[260px] shrink-0 sticky top-[57px] h-[calc(100dvh-57px)] relative">
      <div className="flex flex-col h-full border-l border-zinc-200 dark:border-zinc-800/70 bg-white/50 dark:bg-transparent overflow-hidden">
        {/* Header: Title + Progress Bar */}
        <div className="flex-shrink-0 pt-6 px-4 pb-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              On this page
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-[3px] rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full transition-all duration-150 rounded-full"
                style={{
                  width: `${scrollProgress}%`,
                  backgroundColor: dynamicColor,
                }}
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

        {/* Accordion Chapters List (Original Table of Contents) */}
        <div className="flex-1 overflow-y-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <nav
            role="navigation"
            aria-label="Table of contents"
            className="relative py-1"
          >
            {/* Static vertical track line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

            {chapters.map((chapter, chapterIndex) => {
              const isChapterOpen = chapter === activeChapter;
              const isRootActive = chapter.root?.id === displayActiveId;
              const isChapterBreak = chapterIndex > 0;

              return (
                <div
                  key={chapter.root?.id || `chapter-${chapterIndex}`}
                  className="flex flex-col"
                >
                  {/* H1 Chapter Root Button */}
                  {chapter.root && (
                    <button
                      onClick={() => scrollToHeading(chapter.root!.id)}
                      style={{ paddingLeft: "32px" }}
                      className={cn(
                        "group relative w-full text-left pr-4 leading-snug transition-all duration-200 cursor-pointer flex items-center",
                        "py-2 mb-1 text-[13px] font-extrabold uppercase tracking-wider text-zinc-900 dark:text-zinc-100",
                        isChapterBreak &&
                          "mt-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80",
                      )}
                    >
                      {isRootActive && (
                        <motion.div
                          layoutId="active-toc-pill"
                          className="absolute left-[18px] w-[3px] h-5 rounded-full bg-primary z-10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className={cn("truncate", isRootActive && "text-primary")}>{chapter.root.text}</span>
                    </button>
                  )}

                  {/* Collapsible Accordion Container for Sub-items */}
                  <AnimatePresence initial={false}>
                    {isChapterOpen && chapter.items.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden flex flex-col"
                      >
                        {chapter.items.map((item) => {
                          const isActive = item.id === displayActiveId;
                          const isSection = item.level === 2;
                          const isChild = item.level >= 3;
                          const indent = isSection ? 12 : (item.level - 1) * 12;

                          return (
                            <button
                              key={item.id}
                              onClick={() => scrollToHeading(item.id)}
                              style={{ paddingLeft: `${32 + indent}px` }}
                              className={cn(
                                "group relative w-full text-left pr-4 leading-snug transition-all duration-200 cursor-pointer flex items-center",
                                isSection &&
                                  "py-1.5 mt-0.5 text-[12.5px] font-medium text-zinc-700 dark:text-zinc-300",
                                isChild &&
                                  "py-1 text-[12px] font-normal text-zinc-500 dark:text-zinc-400",
                                isActive
                                  ? "text-primary font-semibold"
                                  : "hover:text-primary",
                              )}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="active-toc-pill"
                                  className="absolute left-[18px] w-[3px] h-4 rounded-full bg-primary z-10"
                                  transition={{
                                    type: "spring",
                                    stiffness: 380,
                                    damping: 30,
                                  }}
                                />
                              )}
                              {isChild && (
                                <span
                                  className={cn(
                                    "inline-block w-1 h-1 rounded-full mr-2 shrink-0 transition-colors",
                                    isActive
                                      ? "bg-primary"
                                      : "bg-zinc-300 dark:bg-zinc-700 group-hover:bg-primary/70",
                                  )}
                                />
                              )}
                              <span className="truncate">{item.text}</span>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-shrink-0" />

        {/* Footer nav */}
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
