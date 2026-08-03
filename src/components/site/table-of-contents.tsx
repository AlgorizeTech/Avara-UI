"use client";

import { useTOC } from "@/contexts/toc-context";
import { TOCItem, useTableOfContents } from "@/hooks/use-table-of-contents";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp, Palette, PanelRightClose } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { ThemeCustomizerSidebar } from "@/components/theme-control/theme-customizer-sidebar";

export const TableOfContents: React.FC = () => {
  const { toc, activeId, scrollToHeading } = useTableOfContents();
  const { setShowTOC } = useTOC();

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

  // ── THE FIX: All hooks must run BEFORE any early returns! ─────────────
  // Group items into chapters by H1 Root (#) unconditionally
  const chapters = useMemo(() => {
    const result: { root?: TOCItem; items: TOCItem[] }[] = [];
    let currentChapter: { root?: TOCItem; items: TOCItem[] } = { items: [] };

    toc.forEach((item) => {
      if (item.level === 1) {
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
  // ──────────────────────────────────────────────────────────────────────

  // ── Early Return (Safe now because all hooks have already executed) ──
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

  // Determine which component chapter is currently being read
  const activeChapterIndex = chapters.findIndex(
    (ch) =>
      ch.root?.id === displayActiveId ||
      ch.items.some((i) => i.id === displayActiveId),
  );

  return (
    <aside className="hidden xl:flex flex-col w-[340px] shrink-0 sticky top-[57px] h-[calc(100dvh-57px)] relative">
      {/* ── Floating Close Button ───────────────────────────────────────────── */}
      <button
        onClick={() => setShowTOC(false)}
        className="absolute top-[30px] -left-3.5 z-20 flex items-center justify-center p-1 rounded-md bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 shadow-sm text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100 transition-all duration-200 cursor-pointer"
        title="Hide Sidebar"
        aria-label="Hide Sidebar"
      >
        <PanelRightClose className="w-4 h-4" />
      </button>

      <div className="flex flex-col h-full border-l border-zinc-200 dark:border-zinc-800/70 bg-white/50 dark:bg-transparent overflow-hidden">
        <ThemeCustomizerSidebar />
      </div>
    </aside>
  );
};
