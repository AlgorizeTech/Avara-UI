"use client";

import { CodeRenderer } from "./code-renderer";
import { useState, useMemo, useRef } from "react";
import { Check, Copy, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Initial lines shown before reader asks for more. */
const INITIAL_LINES = 30;
/** Additional lines added on each "Show More" click. */
const STEP_LINES = 30;

export const CodeBlocks = ({ code, language = "tsx" }: any) => {
  const [copied, setCopied] = useState(false);
  const [visibleLinesCount, setVisibleLinesCount] = useState(INITIAL_LINES);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadingLess, setIsLoadingLess] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  const lines = useMemo(() => (code ? code.split("\n") : []), [code]);
  const totalLines = lines.length;

  const displayedCode = useMemo(() => {
    if (totalLines <= INITIAL_LINES) return code;
    return lines.slice(0, visibleLinesCount).join("\n");
  }, [code, lines, totalLines, visibleLinesCount]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShowMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleLinesCount((prev) => Math.min(prev + STEP_LINES, totalLines));
      setIsLoadingMore(false);
    }, 250);
  };

  const handleShowLess = () => {
    if (isLoadingLess) return;
    setIsLoadingLess(true);
    setTimeout(() => {
      setVisibleLinesCount(INITIAL_LINES);
      setIsLoadingLess(false);
      if (blockRef.current) {
        blockRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 250);
  };

  return (
    <div ref={blockRef} className="relative group w-full bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-800 transition-all duration-300 ease-in-out">
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 z-10 text-xs bg-white/80 dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all p-2.5 rounded-lg cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 border border-zinc-200 dark:border-zinc-700 backdrop-blur-xs shadow-none"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>

      <div className="w-full overflow-hidden transition-all duration-300 ease-in-out">
        <div className="py-2 px-4 sm:px-6 text-sm md:text-[14px] leading-relaxed">
          <CodeRenderer code={displayedCode} lang={language} />
        </div>
      </div>

      {totalLines > INITIAL_LINES && (
        <div className="relative w-full flex items-center justify-center py-4 bg-zinc-50 dark:bg-black border-t border-zinc-200/50 dark:border-zinc-800/50">
          {visibleLinesCount < totalLines ? (
            <button
              onClick={handleShowMore}
              disabled={isLoadingMore}
              className="flex items-center justify-center min-w-[160px] h-9 gap-1.5 px-4 text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-none disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? (
                <Loader2 className="w-4 h-4 animate-spin text-zinc-600 dark:text-zinc-300" />
              ) : (
                <>
                  <span>Show More ({totalLines - visibleLinesCount} lines left)</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleShowLess}
              disabled={isLoadingLess}
              className="flex items-center justify-center min-w-[120px] h-9 gap-1.5 px-4 text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-none disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isLoadingLess ? (
                <Loader2 className="w-4 h-4 animate-spin text-zinc-600 dark:text-zinc-300" />
              ) : (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};