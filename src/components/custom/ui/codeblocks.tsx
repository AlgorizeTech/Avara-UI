"use client";

import { CodeRenderer } from "@/components/site/code-renderer";
import { useState, useMemo, useRef } from "react";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const CodeBlocks = ({
  code,
  language = "tsx",
  showHeader = true,
}: {
  code: string;
  language?: string;
  showHeader?: boolean;
}) => {
  const [copied, setCopied] = useState(false);
  const [visibleLinesCount, setVisibleLinesCount] = useState(30);
  const blockRef = useRef<HTMLDivElement>(null);

  const lines = useMemo(() => (code ? code.split("\n") : []), [code]);
  const totalLines = lines.length;

  const displayedCode = useMemo(() => {
    if (totalLines <= 30) return code;
    return lines.slice(0, visibleLinesCount).join("\n");
  }, [code, lines, totalLines, visibleLinesCount]);

  const displayLanguageLabel = useMemo(() => {
    if (!language) return "CODE";
    const lang = String(language).toLowerCase().trim();
    if (lang === "sh" || lang === "shell" || lang === "bash" || lang === "zsh") return "BASH";
    if (lang === "ts" || lang === "tsx") return "TSX";
    if (lang === "js" || lang === "jsx") return "JSX";
    if (lang === "json" || lang === "jsonc") return "JSON";
    if (lang === "md" || lang === "mdx") return "MARKDOWN";
    return lang.toUpperCase();
  }, [language]);

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
    <div
      ref={blockRef}
      className={cn(
        "relative group w-full bg-zinc-50 dark:bg-black transition-all duration-300 ease-in-out",
        showHeader
          ? "border border-zinc-200 dark:border-zinc-800 rounded-xl my-4 overflow-hidden shadow-xs"
          : "border-t border-zinc-200 dark:border-zinc-800",
      )}
    >
      {showHeader && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-100/70 dark:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800">
          <span className="text-[11px] font-bold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase select-none">
            {displayLanguageLabel}
          </span>
          <button
            onClick={handleCopy}
            className="p-1.5 min-w-[28px] min-h-[28px] flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200/80 dark:border-zinc-700/80 rounded-lg transition-all cursor-pointer shadow-2xs active:scale-95"
            aria-label="Copy code"
            title={copied ? "Copied" : "Copy code"}
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      {!showHeader && (
        <button
          onClick={handleCopy}
          className="absolute right-4 top-4 z-10 p-2 min-w-[32px] min-h-[32px] flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-white/90 dark:bg-zinc-800/90 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200/80 dark:border-zinc-700/80 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-2xs cursor-pointer backdrop-blur-xs active:scale-95"
          aria-label="Copy code"
          title={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      )}

      <div className="py-3 px-4 sm:px-6 text-sm md:text-[14px] leading-relaxed overflow-x-auto">
        <CodeRenderer code={displayedCode} lang={language as any} />
      </div>

      {totalLines > 30 && (
        <div className="relative w-full flex items-center justify-center py-3 bg-zinc-100/40 dark:bg-zinc-900/40 border-t border-zinc-200/50 dark:border-zinc-800/50">
          {visibleLinesCount < totalLines ? (
            <button
              onClick={handleShowMore}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Show More ({totalLines - visibleLinesCount} lines left)</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleShowLess}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95"
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
