"use client";

import { TOCItem, useTableOfContents } from "@/hooks/use-table-of-contents";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

/** Shows only a 2px ring at the padding edge — the track the beam runs in. */
const RING_MASK: React.CSSProperties = {
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude",
};

/** Two comets on opposite sides of the lap, matching ai-chat's border shine. */
const BEAM_GRADIENT =
  "conic-gradient(from 0deg, transparent 0deg, currentColor 50deg, transparent 90deg, transparent 180deg, currentColor 230deg, transparent 270deg)";

export const TableOfContents: React.FC = () => {
  const { toc, activeId, scrollToHeading } = useTableOfContents();

  const listRef = useRef<HTMLDivElement>(null);
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

  // Keep the highlighted entry inside the sidebar's own viewport. Without this
  // the active item keeps moving down as the page scrolls and eventually sits
  // below the visible area of the (independently scrollable) list.
  useEffect(() => {
    if (!displayActiveId) return;

    const follow = () => {
      const container = listRef.current;
      const target = container?.querySelector<HTMLElement>(
        '[data-toc-active="true"]',
      );
      if (!container || !target) return;

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const margin = 40; // breathing room so the item is never flush to an edge

      let delta = 0;
      if (targetRect.top < containerRect.top + margin) {
        delta = targetRect.top - containerRect.top - margin;
      } else if (targetRect.bottom > containerRect.bottom - margin) {
        delta = targetRect.bottom - containerRect.bottom + margin;
      }

      if (Math.abs(delta) < 1) return;

      // Scroll only this container — scrollIntoView would also move the page.
      container.scrollTo({
        top: container.scrollTop + delta,
        behavior: "smooth",
      });
    };

    const raf = requestAnimationFrame(follow);
    // Run again once the chapter accordion has finished expanding, since the
    // item's final position isn't known until the height animation settles.
    const timer = window.setTimeout(follow, 300);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [displayActiveId, chapters]);

  return (
    <aside className="hidden lg:flex flex-col w-[180px] xl:w-[200px] 2xl:w-[212px] shrink-0 sticky top-[57px] h-[calc(100dvh-57px)] relative">
      <div className="flex flex-col h-full bg-background overflow-hidden">
        {/* Header: Title + Progress Bar */}
        <div className="flex-shrink-0 pt-5 px-4 pb-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/35">
              On this page
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-[3px] rounded-full bg-foreground/[0.06] overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-150 rounded-full"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <span className="text-[11px] font-medium tabular-nums w-7 text-right text-foreground/35">
              {Math.round(scrollProgress)}%
            </span>
          </div>
        </div>

        {/* Accordion Chapters List (Original Table of Contents) */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <nav
            role="navigation"
            aria-label="Table of contents"
            className="relative py-1"
          >
            {/* Static vertical track line */}
            <div className="absolute left-[15px] top-0 bottom-0 w-px bg-foreground/[0.08]" />

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
                      data-toc-active={isRootActive || undefined}
                      style={{ paddingLeft: "26px" }}
                      className={cn(
                        "group relative w-full text-left pr-4 leading-snug transition-all duration-200 cursor-pointer flex items-center",
                        "py-1.5 text-[13px] font-medium",
                        isRootActive
                          ? "text-primary"
                          : "text-foreground/80 hover:text-foreground",
                        isChapterBreak && "mt-3",
                      )}
                    >
                      {isRootActive && (
                        <motion.div
                          layoutId="active-toc-pill"
                          className="absolute left-[14px] w-[3px] h-5 rounded-full bg-primary z-10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="truncate">{chapter.root.text}</span>
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
                              data-toc-active={isActive || undefined}
                              style={{ paddingLeft: `${26 + indent}px` }}
                              className={cn(
                                "group relative w-full text-left pr-4 leading-snug transition-colors duration-150 cursor-pointer flex items-center",
                                isSection && "py-1.5 text-[13px]",
                                isChild && "py-1 text-[12.5px]",
                                isActive
                                  ? "text-primary font-medium"
                                  : isChild
                                    ? "text-foreground/45 hover:text-foreground"
                                    : "text-foreground/55 hover:text-foreground",
                              )}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="active-toc-pill"
                                  className="absolute left-[14px] w-[3px] h-4 rounded-full bg-primary z-10"
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
                                      : "bg-foreground/20 group-hover:bg-foreground/60",
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

        {/* Services call-out — soft tint of the theme colour so it stands out
            from the greyscale sidebar under every preset. */}
        <div className="px-2.5 py-2.5 border-t border-foreground/[0.06] shrink-0">
          <a
            href="https://algorizetech.com/book-call"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative flex flex-col gap-3 p-3.5 rounded-xl border overflow-hidden",
              "bg-[oklch(from_var(--primary)_0.93_calc(c*0.35)_h)] border-[oklch(from_var(--primary)_0.85_calc(c*0.45)_h)]",
              "hover:bg-[oklch(from_var(--primary)_0.9_calc(c*0.4)_h)]",
              "dark:bg-[oklch(from_var(--primary)_0.28_calc(c*0.45)_h)] dark:border-[oklch(from_var(--primary)_0.38_calc(c*0.5)_h)]",
              "dark:hover:bg-[oklch(from_var(--primary)_0.32_calc(c*0.5)_h)]",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            )}
          >
            {/* Border beam / shine effect themed to the active theme color */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[-1px] rounded-xl text-primary"
            >
              <span
                className="absolute inset-0 overflow-hidden rounded-xl p-[2px]"
                style={RING_MASK}
              >
                <motion.span
                  className="absolute left-1/2 top-1/2 aspect-square w-[250%]"
                  style={{ x: "-50%", y: "-50%", background: BEAM_GRADIENT }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </span>
            </div>

            <span className="block relative z-10">
              <span className="block text-sm font-semibold leading-snug text-[oklch(from_var(--primary)_0.3_calc(c*0.6)_h)] dark:text-[oklch(from_var(--primary)_0.95_calc(c*0.25)_h)]">
                Need any service?
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-[oklch(from_var(--primary)_0.3_calc(c*0.6)_h_/_0.75)] dark:text-[oklch(from_var(--primary)_0.95_calc(c*0.25)_h_/_0.7)]">
                Have a project in mind? Let's talk about it.
              </span>
            </span>

            <span className="relative z-10 inline-flex w-full items-center justify-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm">
              Book a call
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>

        {/* Footer nav */}
        <div className="flex-shrink-0 px-3 py-3 flex gap-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5",
              "py-[7px] rounded-full text-[12px] font-medium",
              "bg-foreground/[0.04] text-foreground/70",
              "hover:bg-foreground/[0.08] hover:text-foreground",
              "transition-colors duration-150 cursor-pointer",
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
              "py-[7px] rounded-full text-[12px] font-medium",
              "bg-foreground/[0.04] text-foreground/70",
              "hover:bg-foreground/[0.08] hover:text-foreground",
              "transition-colors duration-150 cursor-pointer",
            )}
          >
            <ArrowDown className="w-3 h-3" /> End
          </button>
        </div>
      </div>
    </aside>
  );
};
