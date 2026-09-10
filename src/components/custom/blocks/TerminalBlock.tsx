"use client";

import { cn } from "@/lib/utils";
import { Check, Copy, Terminal as TerminalIcon } from "lucide-react";
import React, { forwardRef, useState } from "react";

// ==========================================
// THEME & CONFIGURATION
// ==========================================
export type TerminalVariant = "default" | "glass" | "minimal";
export type TerminalColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary/10 text-primary",
    border: "border-primary/30",
    text: "text-primary",
  },
  indigo: {
    bg: "bg-indigo-500/10 text-indigo-400",
    border: "border-indigo-500/30",
    text: "text-indigo-400",
  },
  rose: {
    bg: "bg-rose-500/10 text-rose-400",
    border: "border-rose-500/30",
    text: "text-rose-400",
  },
  emerald: {
    bg: "bg-emerald-500/10 text-emerald-400",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
  },
  zinc: {
    bg: "bg-zinc-500/10 text-zinc-400",
    border: "border-zinc-500/30",
    text: "text-zinc-400",
  },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        bg: "bg-[rgba(var(--term-rgb),0.1)] text-[var(--term-color)]",
        border: "border-[rgba(var(--term-rgb),0.3)]",
        text: "text-[var(--term-color)]",
      },
      style: {
        "--term-color": color,
        "--term-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

// ==========================================
// SYNTAX HIGHLIGHTER ENGINE
// ==========================================
const highlightCode = (code: string, language: string) => {
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

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
    command: "text-[#4078F2] dark:text-[#61AFEF] font-semibold",
    flag: "text-[#986801] dark:text-[#D19A66]",
    arg: "text-[#50A14F] dark:text-[#98C379]",
  };

  const lang = language.toLowerCase();

  // Each branch below is a SINGLE pass over the escaped source. Chaining
  // separate .replace() calls does not work here: a later rule matches the
  // markup an earlier rule injected. The quote rule, for one, matched the
  // quotes of an already-emitted class="..." attribute and nested a <span>
  // inside it, which the browser then rendered as visible text.

  if (lang === "html" || lang === "xml") {
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

  if (lang === "css") {
    return html.replace(
      /(\/\*[\s\S]*?\*\/)|(@[a-zA-Z-]+)|([^\s{}/;][^{}/;]*?)(?=\s*\{)|([a-zA-Z-]+)(\s*:)([^;{}]+)(;?)|([{}])/g,
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

  if (lang === "bash" || lang === "sh" || lang === "shell" || lang === "terminal") {
    return html.replace(
      /(#[^\n]*)|("[^"\n]*"|'[^'\n]*')|(\b(?:npm|yarn|pnpm|npx|node|git|cd|ls|rm|mkdir|echo|cat|sudo|apt|brew|bun|docker)\b)|(\s--?[a-zA-Z0-9][a-zA-Z0-9-]*)/g,
      (match, comment, str, command, flag) => {
        if (comment) return `<span class="${colors.comment}">${comment}</span>`;
        if (str) return `<span class="${colors.string}">${str}</span>`;
        if (command) return `<span class="${colors.command}">${command}</span>`;
        if (flag) return `<span class="${colors.flag}">${flag}</span>`;
        return match;
      }
    );
  }

  // JS / TS / Generic Code
  html = html.replace(
    /(["'](?:\\.|[^\\])*?["']|`(?:\\`|[^`])*`)|(\/\/.*|\/\*[\s\S]*?\*\/)|(&lt;\/?[a-zA-Z0-9_-]+)|(\/&gt;|&gt;)|([a-zA-Z0-9_-]+)(?=\s*[:=])|(\b\d+\.?\d*\b)|(\b(?:const|let|var|function|return|if|else|for|while|import|export|from|default|class|extends|implements|new|this|typeof|instanceof|switch|case|break|continue|try|catch|finally|async|await|interface|type|public|private|protected|readonly)\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()|(\b[A-Z][a-zA-Z0-9_$]*\b)|([=+\-*/!&|{}()[\]]+)/g,
    (_, str, comment, jsxTag, jsxBracket, attrKey, num, keyword, func, comp, operator) => {
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
      return _;
    }
  );

  html = html.replace(
    /\b(true|false|null|undefined)\b/g,
    `<span class="${colors.number}">$1</span>`
  );

  return html;
};

// ==========================================
// COMPONENT
// ==========================================
export interface TerminalBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  filename?: string;
  copyable?: boolean;
  variant?: TerminalVariant;
  color?: TerminalColor;
}

export const TerminalBlock = forwardRef<HTMLDivElement, TerminalBlockProps>(
  (
    {
      code,
      language = "bash",
      filename,
      copyable = true,
      variant = "default",
      color = "primary",
      className,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);
    const { theme, style } = getThemeStyles(color as string);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };

    const variantStyles = {
      default:
        "bg-white dark:bg-[#0d1117] border border-border shadow-xl",
      glass:
        "bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-xl border border-border/80 shadow-2xl",
      minimal: "bg-transparent border border-border",
    };

    const headerStyles = {
      default:
        "bg-zinc-100/80 dark:bg-white/5 border-b border-border",
      glass:
        "bg-zinc-100/60 dark:bg-white/5 border-b border-border/80",
      minimal:
        "bg-muted border-b border-border",
    };

    const highlightedCode = highlightCode(code, language);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-xl overflow-hidden flex flex-col font-sans",
          variantStyles[variant],
          className,
        )}
        style={style}
        {...props}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between px-4 py-3 h-12 select-none",
            headerStyles[variant],
          )}
        >
          <div className="flex items-center gap-4 w-1/3">
            {variant !== "minimal" ? (
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
            ) : (
              <TerminalIcon className="w-4 h-4 text-zinc-500" />
            )}
          </div>

          <div className="flex items-center justify-center w-1/3">
            {filename && (
              <span className="text-xs font-medium font-mono text-muted-foreground">
                {filename}
              </span>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 w-1/3">
            {language && (
              <span
                className={cn(
                  "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                  theme.bg,
                  theme.border,
                  "border",
                )}
              >
                {language}
              </span>
            )}
            {copyable && (
              <button
                onClick={handleCopy}
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-zinc-200 dark:hover:bg-white/10 text-muted-foreground"
                title="Copy code"
              >
                {copied ? (
                  <Check className={cn("w-4 h-4", theme.text)} />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Code Area */}
        <div className="p-4 md:p-6 overflow-x-auto">
          <pre className="m-0 bg-transparent p-0 w-max min-w-full">
            <code
              className="font-mono text-sm leading-relaxed text-foreground"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        </div>
      </div>
    );
  },
);
TerminalBlock.displayName = "TerminalBlock";
