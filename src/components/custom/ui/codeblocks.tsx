"use client";

import Prism from "prismjs";
import { useEffect, useState } from "react";

// 1. The Theme
import "prismjs/themes/prism-tomorrow.css";

// 2. The Missing Languages! (This is what gives it color)
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

export const CodeBlocks = ({ code, language = "tsx" }: any) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // This forces Prism to rescan and apply colors whenever the code changes
    Prism.highlightAll();
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group w-full">
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 z-10 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all p-2.5 rounded-lg cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-sm"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>

      <pre
        className={cn(
          `language-${language}`,
          "!bg-black !m-0 !rounded-none !py-6 !px-4 sm:!px-6 text-sm md:text-[14px] leading-relaxed overflow-x-auto",
        )}
        suppressHydrationWarning={true}
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};
