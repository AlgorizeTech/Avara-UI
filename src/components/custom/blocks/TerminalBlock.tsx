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
        "bg-white dark:bg-[#0d1117] border border-zinc-200 dark:border-zinc-800 shadow-xl",
      glass:
        "bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 shadow-2xl",
      minimal: "bg-transparent border border-zinc-200 dark:border-zinc-800",
    };

    const headerStyles = {
      default:
        "bg-zinc-100/80 dark:bg-white/5 border-b border-zinc-200 dark:border-white/5",
      glass:
        "bg-zinc-100/60 dark:bg-white/5 border-b border-zinc-200/80 dark:border-white/10",
      minimal:
        "bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800",
    };

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
              <span className="text-xs font-medium font-mono text-zinc-600 dark:text-zinc-400">
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
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400"
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
            <code className="font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-300">
              {code}
            </code>
          </pre>
        </div>
      </div>
    );
  },
);
TerminalBlock.displayName = "TerminalBlock";
