"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { SiJavascript, SiTypescript, SiHtml5, SiCss3, SiReact } from "react-icons/si";
import { FaTerminal } from "react-icons/fa";

export interface CodeTab {
  code: string;
  language: string;
  fileName: string;
}

export interface CustomCodeBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "code"> {
  code?: string;
  language?: string;
  fileName?: string;
  tabs?: CodeTab[];
}

const LanguageIcon = ({ language }: { language: string }) => {
  const lang = language.toLowerCase();
  const iconClass = "w-4 h-4";
  if (lang === "javascript" || lang === "js" || lang === "jsx") return <SiJavascript className={cn(iconClass, "text-yellow-400")} />;
  if (lang === "typescript" || lang === "ts" || lang === "tsx") return <SiTypescript className={cn(iconClass, "text-blue-500")} />;
  if (lang === "react") return <SiReact className={cn(iconClass, "text-sky-400")} />;
  if (lang === "html" || lang === "xml") return <SiHtml5 className={cn(iconClass, "text-orange-500")} />;
  if (lang === "css") return <SiCss3 className={cn(iconClass, "text-blue-400")} />;
  if (lang === "bash" || lang === "sh") return <FaTerminal className={cn(iconClass, "text-slate-400")} />;
  return <SiReact className={cn(iconClass, "text-slate-400")} />;
};

const formatLanguageName = (language: string) => {
  const lang = language.toLowerCase();
  if (lang === "javascript" || lang === "js" || lang === "jsx") return "JavaScript";
  if (lang === "typescript" || lang === "ts" || lang === "tsx") return "TypeScript";
  if (lang === "react") return "React";
  if (lang === "html" || lang === "xml") return "HTML";
  if (lang === "css") return "CSS";
  if (lang === "bash" || lang === "sh") return "Terminal";
  return language;
};

const highlightCode = (code: string, language: string) => {
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Vibrant syntax theme for Light Mode (Dracula inspired), Professional for Dark Mode
  const colors = {
    keyword: "text-pink-600 dark:text-[#C678DD] font-medium",
    string: "text-emerald-600 dark:text-[#98C379]",
    function: "text-blue-600 dark:text-[#61AFEF]",
    number: "text-orange-600 dark:text-[#D19A66]",
    property: "text-purple-600 dark:text-[#E5C07B] italic",
    tag: "text-rose-600 dark:text-[#E06C75]", 
    component: "text-amber-600 dark:text-[#E5C07B] font-semibold",
    operator: "text-slate-500 dark:text-[#ABB2BF]",
    comment: "text-slate-400 dark:text-[#5C6370] italic",
    punctuation: "text-slate-500 dark:text-[#ABB2BF]",
    stringContent: "text-emerald-600 dark:text-[#98C379]",
  };

  if (language === "html" || language === "xml") {
    html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g, `<span class="${colors.comment}">$1</span>`);
    
    // attributes like class="text-xl"
    html = html.replace(
      /([a-zA-Z0-9-]+)(=)(["'])(.*?)\3/g,
      (match, attr, eq, quote, content) => {
        return `<span class="${colors.property}">${attr}</span><span class="${colors.operator}">${eq}</span><span class="${colors.property}">${quote}</span><span class="${colors.stringContent}">${content}</span><span class="${colors.property}">${quote}</span>`;
      }
    );
    
    html = html.replace(
      /(&lt;\/?)([a-zA-Z0-9-]+)/g,
      (match, brackets, tagName) => {
        return `<span class="${colors.punctuation}">${brackets}</span><span class="${colors.tag}">${tagName}</span>`;
      }
    );
    html = html.replace(/(\/&gt;|&gt;)/g, `<span class="${colors.punctuation}">$1</span>`);
    return html;
  }

  if (language === "css") {
    html = html.replace(/(\/\*[\s\S]*?\*\/)/g, `<span class="${colors.comment}">$1</span>`);
    
    // Properties and values: e.g. display: flex;
    html = html.replace(
      /([a-zA-Z-]+)(\s*:)([^;\}]+)(;?)/g,
      (match, prop, colon, val, semi) => {
        return `<span class="${colors.property}">${prop}</span><span class="${colors.punctuation}">${colon}</span><span class="${colors.stringContent}">${val}</span><span class="${colors.punctuation}">${semi}</span>`;
      }
    );
    
    // Selectors: e.g. .class-name, #id, tag
    html = html.replace(
      /([\.#a-zA-Z0-9_:-]+)(\s*\{)/g,
      (match, sel, brace) => {
        return `<span class="${colors.tag}">${sel}</span><span class="${colors.punctuation}">${brace}</span>`;
      }
    );
    
    // Braces
    html = html.replace(/(\}|\{)/g, `<span class="${colors.punctuation}">$1</span>`);
    
    // @media, @keyframes
    html = html.replace(/(@[a-zA-Z-]+)/g, `<span class="${colors.keyword}">$1</span>`);
    
    return html;
  }

  if (language === "bash" || language === "sh") {
    html = html.replace(/(#.*)/g, `<span class="${colors.comment}">$1</span>`);
    html = html.replace(/(\b(?:npm|yarn|pnpm|npx|node|git|cd|ls|rm|mkdir|echo|cat|sudo|apt|brew)\b)/g, `<span class="${colors.function}">$1</span>`);
    html = html.replace(/(\s-[a-zA-Z0-9]+|\s--[a-zA-Z0-9-]+)/g, `<span class="${colors.property}">$1</span>`);
    return html;
  }

  // JS/TS/JSX
  html = html.replace(
    /(["'](?:\\.|[^\\])*?["']|`(?:\\`|[^`])*`)|(\/\/.*|\/\*[\s\S]*?\*\/)|(&lt;\/?[a-zA-Z0-9_-]+)|(\/&gt;|&gt;)|([a-zA-Z0-9_-]+)(?=\s*[:=])|(\b\d+\.?\d*\b)|(\b(?:const|let|var|function|return|if|else|for|while|import|export|from|default|class|extends|implements|new|this|typeof|instanceof|switch|case|break|continue|try|catch|finally|async|await|interface|type|public|private|protected|readonly)\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()|(\b[A-Z][a-zA-Z0-9_$]*\b)|([=+\-*/!&|{}()\[\]]+)/g,
    (match, str, comment, jsxTag, jsxBracket, attrKey, num, keyword, func, comp, operator) => {
      if (str) {
        const quote = str[0];
        if (["'", '"', "`"].includes(quote)) {
          const inside = str.slice(1, -1);
          const endQuote = str[str.length - 1];
          return `<span class="${colors.property}">${quote}</span><span class="${colors.stringContent}">${inside}</span><span class="${colors.property}">${endQuote}</span>`;
        }
        return `<span class="${colors.string}">${str}</span>`;
      }
      if (comment) return `<span class="${colors.comment}">${comment}</span>`;
      if (jsxTag) {
        let isClosing = jsxTag.includes("/");
        let brackets = isClosing ? "&lt;/" : "&lt;";
        let tagName = jsxTag.replace(brackets, "");
        let isComponent = /^[A-Z]/.test(tagName);
        let tagColor = isComponent ? colors.component : colors.tag;
        return `<span class="${colors.punctuation}">${brackets}</span><span class="${tagColor}">${tagName}</span>`;
      }
      if (jsxBracket) return `<span class="${colors.punctuation}">${jsxBracket}</span>`;
      if (attrKey) return `<span class="${colors.property}">${attrKey}</span>`;
      if (num) return `<span class="${colors.number}">${num}</span>`;
      if (keyword) return `<span class="${colors.keyword}">${keyword}</span>`;
      if (func) return `<span class="${colors.function}">${func}</span>`;
      if (comp) return `<span class="${colors.component}">${comp}</span>`;
      if (operator) return `<span class="${colors.operator}">${operator}</span>`;
      return match;
    }
  );

  html = html.replace(
    /\b(true|false|null|undefined)\b/g,
    `<span class="${colors.number}">$1</span>`
  );

  return html;
};

export function CustomCodeBlock({
  code,
  language = "typescript",
  fileName,
  tabs,
  className,
  ...props
}: CustomCodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const activeCode = tabs && tabs.length > 0 ? tabs[activeTabIndex].code : code || "";
  const activeLanguage = tabs && tabs.length > 0 ? tabs[activeTabIndex].language : language;
  const activeFileName = tabs && tabs.length > 0 ? tabs[activeTabIndex].fileName : fileName;

  useEffect(() => {
    setHighlightedCode(highlightCode(activeCode, activeLanguage));
  }, [activeCode, activeLanguage]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const lines = (highlightedCode || activeCode).trim().split("\n");

  return (
    <div className={cn("w-full flex flex-col gap-3 font-sans", className)} {...props}>
      {/* Separate Tabs Above */}
      {tabs && tabs.length > 0 && (
        <div className="flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-lg w-max">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTabIndex(idx)}
              className={cn(
                "cursor-pointer flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all",
                activeTabIndex === idx
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              {tab.fileName || formatLanguageName(tab.language)}
            </button>
          ))}
        </div>
      )}

      {/* Main Code Block */}
      <div className="w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-4">
            {/* Mac Dots */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            
            {/* File Name / Language Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-200/50 dark:bg-slate-800/50 rounded-md shrink-0">
              <LanguageIcon language={activeLanguage} />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                {activeFileName || formatLanguageName(activeLanguage)}
              </span>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="cursor-pointer flex items-center justify-center shrink-0 w-8 h-8 rounded-md text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ml-2"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Code View */}
        <div className="relative overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300/50 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700/50 dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
          <pre className="p-4 text-[13.5px] leading-relaxed font-mono whitespace-pre min-w-fit pb-6">
            <code className="block text-slate-800 dark:text-slate-200">
              {lines.map((line, i) => (
                <div key={i} className="flex min-h-[1.5rem]">
                  <span className="shrink-0 w-10 text-right pr-4 mr-4 select-none text-slate-400 dark:text-slate-600 border-r border-slate-200/50 dark:border-slate-800/50">
                    {i + 1}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: line || " " }} />
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
