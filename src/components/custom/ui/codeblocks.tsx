"use client";

import { CodeRenderer } from "@/components/site/code-renderer";
import { useState, useMemo, useRef, useEffect } from "react";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/** Lines shown before the reader asks for more. */
const INITIAL_LINES = 30;

export const CodeBlocks = ({ code, language = "tsx" }: any) => {
  const [copied, setCopied] = useState(false);
  const [visibleLinesCount, setVisibleLinesCount] = useState(INITIAL_LINES);
  const blockRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const lines = useMemo(() => (code ? code.split("\n") : []), [code]);
  const totalLines = lines.length;
  const isExpanded = visibleLinesCount > INITIAL_LINES;

  const displayedCode = useMemo(() => {
    if (totalLines <= INITIAL_LINES) return code;
    return lines.slice(0, visibleLinesCount).join("\n");
  }, [code, lines, totalLines, visibleLinesCount]);

  /**
   * Collapsed, the panel is exactly as tall as its content, so a freshly
   * opened preview never lands on a scrollbar. That natural height is
   * remembered and becomes the cap once Show More runs — the extra lines then
   * scroll inside the card instead of stretching it down the page.
   */
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);

  useEffect(() => {
    if (isExpanded) return;
    const el = contentRef.current;
    if (!el) return;
    // Shiki highlights asynchronously, so the height settles after mount —
    // observe rather than measure once.
    const measure = () => setCollapsedHeight(el.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [isExpanded]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShowMore = () => {
    setVisibleLinesCount((prev) => Math.min(prev + INITIAL_LINES, totalLines));
  };

  const handleShowLess = () => {
    setVisibleLinesCount(INITIAL_LINES);
    if (blockRef.current) {
      blockRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={blockRef} className="relative group w-full bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-800 transition-all duration-300 ease-in-out">
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 z-10 text-xs bg-white/80 dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all p-2.5 rounded-lg cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 border border-zinc-200 dark:border-zinc-700 backdrop-blur-xs"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>

      <div
        className={cn(
          "transition-all duration-300",
          // Long lines already scroll horizontally inside .shiki, so only the
          // vertical axis is handed to this container.
          isExpanded ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden",
        )}
        style={
          isExpanded && collapsedHeight !== null
            ? { maxHeight: collapsedHeight }
            : undefined
        }
      >
        <div
          ref={contentRef}
          className="py-2 px-4 sm:px-6 text-sm md:text-[14px] leading-relaxed"
        >
          <CodeRenderer code={displayedCode} lang={language} />
        </div>
      </div>

      {totalLines > INITIAL_LINES && (
        <div className="relative w-full flex items-center justify-center py-4 bg-zinc-50 dark:bg-black border-t border-zinc-200/50 dark:border-zinc-800/50">
          {visibleLinesCount < totalLines ? (
            <button
              onClick={handleShowMore}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Show More ({totalLines - visibleLinesCount} lines left)</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleShowLess}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Show Less</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};