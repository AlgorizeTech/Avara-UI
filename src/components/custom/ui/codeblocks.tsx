"use client";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { Check, Copy } from "lucide-react";

export const CodeBlocks = ({ code, language = "javascript" }: any) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 text-xs bg-neutral-600 text-white p-2 rounded cursor-pointer"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>
      <pre
        className={`language-${language}`}
        suppressHydrationWarning={true}
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};