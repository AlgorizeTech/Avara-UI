"use client";

import { CodeRenderer } from "@/components/site/code-renderer";
import { useState, useMemo, useRef } from "react";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";

export const CodeBlocks = ({ code, language = "tsx" }: any) => {
  const [copied, setCopied] = useState(false);
  const [visibleLinesCount, setVisibleLinesCount] = useState(30);
  const blockRef = useRef<HTMLDivElement>(null);

  const lines = useMemo(() => (code ? code.split("\n") : []), [code]);
  const totalLines = lines.length;

  const displayedCode = useMemo(() => {
    if (totalLines <= 30) return code;
    return lines.slice(0, visibleLinesCount).join("\n");
  }, [code, lines, totalLines, visibleLinesCount]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShowMore = () => {
    setVisibleLinesCount((prev) => Math.min(prev + 30, totalLines));
  };

  const handleShowLess = () => {
    setVisibleLinesCount(30);
    if (blockRef.current) {
      blockRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={blockRef} className="relative group w-full bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-800 transition-all duration-300 ease-in-out">
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 z-10 text-xs bg-white/80 dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all p-2.5 rounded-lg cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-sm border border-zinc-200 dark:border-zinc-700 backdrop-blur-xs"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>

      <div className="py-2 px-4 sm:px-6 text-sm md:text-[14px] leading-relaxed transition-all duration-300 overflow-hidden">
        <CodeRenderer code={displayedCode} lang={language as any} />
      </div>

      {totalLines > 30 && (
        <div className="relative w-full flex items-center justify-center pb-5 pt-8 -mt-6 bg-gradient-to-t from-zinc-50 via-zinc-50/90 to-transparent dark:from-black dark:via-black/90 dark:to-transparent">
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
