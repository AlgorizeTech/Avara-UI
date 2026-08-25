"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { SiJavascript, SiTypescript, SiHtml5, SiCss, SiReact } from "react-icons/si";
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
  if (lang === "css") return <SiCss className={cn(iconClass, "text-blue-400")} />;
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

  // Atom One Light for Light Mode, One Dark Pro for Dark Mode
  const colors = {
    keyword: "text-[#A626A4] dark:text-[#C678DD] font-medium",
    string: "text-[#50A14F] dark:text-[#98C379]",
    function: "text-[#4078F2] dark:text-[#61AFEF]",
    number: "text-[#986801] dark:text-[#D19A66]",
    property: "text-[#E45649] dark:text-[#E5C07B]",
    tag: "text-[#E45649] dark:text-[#E06C75]", 
    component: "text-[#C18401] dark:text-[#E5C07B] font-semibold",
    operator: "text-[#383A42] dark:text-[#ABB2BF]",
    comment: "text-[#A0A1A7] dark:text-[#5C6370]",
    punctuation: "text-[#383A42] dark:text-[#ABB2BF]",
    stringContent: "text-[#50A14F] dark:text-[#98C379]",
  };

  // Each branch below is a SINGLE pass over the escaped source. Chaining
  // separate .replace() calls does not work here: a later rule matches the
  // markup an earlier rule injected -- the attribute rule, for one, matched
  // the class="..." of an already-emitted <span> and nested another <span>
  // inside it, which the browser then rendered as visible text.

  if (language === "html" || language === "xml") {
    return html.replace(
      /(&lt;!--[\s\S]*?--&gt;)|(&lt;\/?)([a-zA-Z0-9-]+)|([a-zA-Z0-9-]+)(=)(["'])(.*?)\6|(\/&gt;|&gt;)/g,
      (match, comment, brackets, tagName, attr, eq, quote, content, closer) => {
        if (comment) return `<span class="${colors.comment}">${comment}</span>`;
        if (brackets !== undefined)
          return `<span class="${colors.punctuation}">${brackets}</span><span class="${colors.tag}">${tagName}</span>`;
        if (attr !== undefined)
          return `<span class="${colors.property}">${attr}</span><span class="${colors.operator}">${eq}</span><span class="${colors.property}">${quote}</span><span class="${colors.stringContent}">${content}</span><span class="${colors.property}">${quote}</span>`;
        if (closer) return `<span class="${colors.punctuation}">${closer}</span>`;
        return match;
      }
    );
  }

  if (language === "css") {
    return html.replace(
      /(\/\*[\s\S]*?\*\/)|(@[a-zA-Z-]+)|([^\s{}\/;][^{}\/;]*?)(?=\s*\{)|([a-zA-Z-]+)(\s*:)([^;{}]+)(;?)|([{}])/g,
      (match, comment, atRule, selector, prop, colon, val, semi, brace) => {
        if (comment) return `<span class="${colors.comment}">${comment}</span>`;
        if (atRule) return `<span class="${colors.keyword}">${atRule}</span>`;
        if (selector !== undefined)
          return `<span class="${colors.tag}">${selector}</span>`;
        if (prop !== undefined)
          return `<span class="${colors.property}">${prop}</span><span class="${colors.punctuation}">${colon}</span><span class="${colors.stringContent}">${val}</span><span class="${colors.punctuation}">${semi}</span>`;
        if (brace) return `<span class="${colors.punctuation}">${brace}</span>`;
        return match;
      }
    );
  }

  if (language === "bash" || language === "sh") {
    return html.replace(
      /(#[^\n]*)|("[^"\n]*"|'[^'\n]*')|(\b(?:npm|yarn|pnpm|npx|node|git|cd|ls|rm|mkdir|echo|cat|sudo|apt|brew)\b)|(\s--?[a-zA-Z0-9][a-zA-Z0-9-]*)/g,
      (match, comment, str, command, flag) => {
        if (comment) return `<span class="${colors.comment}">${comment}</span>`;
        if (str) return `<span class="${colors.stringContent}">${str}</span>`;
        if (command) return `<span class="${colors.function}">${command}</span>`;
        if (flag) return `<span class="${colors.property}">${flag}</span>`;
        return match;
      }
    );
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
        const isClosing = jsxTag.includes("/");
        const brackets = isClosing ? "&lt;/" : "&lt;";
        const tagName = jsxTag.replace(brackets, "");
        const isComponent = /^[A-Z]/.test(tagName);
        const tagColor = isComponent ? colors.component : colors.tag;
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
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const activeCode = tabs && tabs.length > 0 ? tabs[activeTabIndex].code : code || "";
  const activeLanguage = tabs && tabs.length > 0 ? tabs[activeTabIndex].language : language;
  const activeFileName = tabs && tabs.length > 0 ? tabs[activeTabIndex].fileName : fileName;

  // Pure derivation of the props: computing it in an effect rendered the raw
  // code once, then re-rendered with the highlighted copy.
  const highlightedCode = useMemo(
    () => highlightCode(activeCode, activeLanguage),
    [activeCode, activeLanguage],
  );

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
        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg w-max border border-border/80">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTabIndex(idx)}
              className={cn(
                "cursor-pointer flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all",
                activeTabIndex === idx
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.fileName || formatLanguageName(tab.language)}
            </button>
          ))}
        </div>
      )}

      {/* Main Code Block */}
      <div className="w-full rounded-xl overflow-hidden border border-border bg-zinc-50/50 dark:bg-[#09090b]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-muted/80 border-b border-border">
          <div className="flex items-center gap-4 min-w-0">
            {/* Mac Dots */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            
            {/* File Name / Language Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/60 border border-border/60 rounded-md shrink-0 shadow-none max-w-full overflow-hidden">
              <LanguageIcon language={activeLanguage} />
              <span className="text-xs font-medium text-foreground truncate">
                {activeFileName || formatLanguageName(activeLanguage)}
              </span>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="cursor-pointer flex items-center justify-center shrink-0 w-8 h-8 rounded-md text-zinc-500 hover:text-foreground bg-muted/60 hover:bg-muted/60 border border-border/60 transition-colors ml-2 shadow-none"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Code View */}
        <div className="relative overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300/50 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-800/80 dark:hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full shadow-none">
          <pre className="p-4 text-[13.5px] leading-relaxed font-mono whitespace-pre min-w-fit pb-6">
            <code className="block text-foreground">
              {lines.map((line, i) => (
                <div key={i} className="flex min-h-[1.5rem]">
                  <span className="shrink-0 w-10 text-right pr-4 mr-4 select-none text-zinc-400 dark:text-zinc-600 border-r border-border/60">
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
