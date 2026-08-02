"use client";

import { CodeRenderer } from "@/components/site/code-renderer";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export const CodeBlocks = ({ code, language = "tsx" }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group w-full bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
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

      <div className="py-2 px-4 sm:px-6 text-sm md:text-[14px] leading-relaxed overflow-x-auto">
        <CodeRenderer code={code} lang={language as any} />
      </div>
    </div>
  );
};
