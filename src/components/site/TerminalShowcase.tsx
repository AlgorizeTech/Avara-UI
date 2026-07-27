"use client";

import {
  TerminalBlock,
  TerminalColor,
  TerminalVariant,
} from "@/components/custom/blocks/TerminalBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const TERMINAL_ENGINE_CODE_TS = `"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy, Terminal as TerminalIcon } from "lucide-react";

export type TerminalVariant = "default" | "glass" | "minimal";
export type TerminalColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { bg: "bg-indigo-500/10 text-indigo-400", border: "border-indigo-500/30", text: "text-indigo-400" },
  rose: { bg: "bg-rose-500/10 text-rose-400", border: "border-rose-500/30", text: "text-rose-400" },
  emerald: { bg: "bg-emerald-500/10 text-emerald-400", border: "border-emerald-500/30", text: "text-emerald-400" },
  zinc: { bg: "bg-zinc-500/10 text-zinc-400", border: "border-zinc-500/30", text: "text-zinc-400" },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[rgba(var(--term-rgb),0.1)] text-[var(--term-color)]", border: "border-[rgba(var(--term-rgb),0.3)]", text: "text-[var(--term-color)]" },
      style: { "--term-color": color, "--term-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.zinc, style: {} };
};

export interface TerminalBlockProps extends React.HTMLAttributes<HTMLDivElement> { code: string; language?: string; filename?: string; copyable?: boolean; variant?: TerminalVariant; color?: TerminalColor; }

export const TerminalBlock = forwardRef<HTMLDivElement, TerminalBlockProps>(({ code, language = "bash", filename, copyable = true, variant = "default", color = "zinc", className, ...props }, ref) => {
  const [copied, setCopied] = useState(false);
  const { theme, style } = getThemeStyles(color as string);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); } 
    catch (err) { console.error("Failed to copy text: ", err); }
  };

  const variantStyles = { default: "bg-[#0d1117] border border-zinc-800 shadow-xl", glass: "bg-[#0d1117]/80 backdrop-blur-xl border border-white/10 shadow-2xl", minimal: "bg-transparent border border-zinc-200 dark:border-zinc-800" };
  const headerStyles = { default: "bg-white/5 border-b border-white/5", glass: "bg-white/5 border-b border-white/10", minimal: "bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800" };
  const isLightMode = variant === "minimal";

  return (
    <div ref={ref} className={cn("w-full rounded-xl overflow-hidden flex flex-col font-sans", variantStyles[variant], className)} style={style} {...props}>
      <div className={cn("flex items-center justify-between px-4 py-3 h-12 select-none", headerStyles[variant])}>
        <div className="flex items-center gap-4 w-1/3">
          {variant !== "minimal" ? (<div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ff5f56]" /><div className="w-3 h-3 rounded-full bg-[#ffbd2e]" /><div className="w-3 h-3 rounded-full bg-[#27c93f]" /></div>) : (<TerminalIcon className="w-4 h-4 text-zinc-500" />)}
        </div>
        <div className="flex items-center justify-center w-1/3">{filename && (<span className={cn("text-xs font-medium font-mono", isLightMode ? "text-zinc-600 dark:text-zinc-400" : "text-zinc-400")}>{filename}</span>)}</div>
        <div className="flex items-center justify-end gap-3 w-1/3">
          {language && (<span className={cn("px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider", theme.bg, theme.border, "border")}>{language}</span>)}
          {copyable && (
            <button onClick={handleCopy} className={cn("flex items-center justify-center w-8 h-8 rounded-lg transition-all", isLightMode ? "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400" : "hover:bg-white/10 text-zinc-400")} title="Copy code">
              {copied ? <Check className={cn("w-4 h-4", theme.text)} /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
      <div className="p-4 md:p-6 overflow-x-auto">
        <pre className="m-0 bg-transparent p-0 w-max min-w-full"><code className={cn("font-mono text-sm leading-relaxed", isLightMode ? "text-zinc-800 dark:text-zinc-200" : "text-zinc-300")}>{code}</code></pre>
      </div>
    </div>
  );
});
TerminalBlock.displayName = "TerminalBlock";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const TERMINAL_ENGINE_CODE_JS = `"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy, Terminal as TerminalIcon } from "lucide-react";

const colorThemes = {
  indigo: { bg: "bg-indigo-500/10 text-indigo-400", border: "border-indigo-500/30", text: "text-indigo-400" },
  rose: { bg: "bg-rose-500/10 text-rose-400", border: "border-rose-500/30", text: "text-rose-400" },
  emerald: { bg: "bg-emerald-500/10 text-emerald-400", border: "border-emerald-500/30", text: "text-emerald-400" },
  zinc: { bg: "bg-zinc-500/10 text-zinc-400", border: "border-zinc-500/30", text: "text-zinc-400" },
};

const hexToRgb = (hex) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[rgba(var(--term-rgb),0.1)] text-[var(--term-color)]", border: "border-[rgba(var(--term-rgb),0.3)]", text: "text-[var(--term-color)]" },
      style: { "--term-color": color, "--term-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.zinc, style: {} };
};

export const TerminalBlock = forwardRef(({ code, language = "bash", filename, copyable = true, variant = "default", color = "zinc", className, ...props }, ref) => {
  const [copied, setCopied] = useState(false);
  const { theme, style } = getThemeStyles(color);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); } 
    catch (err) { console.error("Failed to copy text: ", err); }
  };

  const variantStyles = { default: "bg-[#0d1117] border border-zinc-800 shadow-xl", glass: "bg-[#0d1117]/80 backdrop-blur-xl border border-white/10 shadow-2xl", minimal: "bg-transparent border border-zinc-200 dark:border-zinc-800" };
  const headerStyles = { default: "bg-white/5 border-b border-white/5", glass: "bg-white/5 border-b border-white/10", minimal: "bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800" };
  const isLightMode = variant === "minimal";

  return (
    <div ref={ref} className={cn("w-full rounded-xl overflow-hidden flex flex-col font-sans", variantStyles[variant], className)} style={style} {...props}>
      <div className={cn("flex items-center justify-between px-4 py-3 h-12 select-none", headerStyles[variant])}>
        <div className="flex items-center gap-4 w-1/3">
          {variant !== "minimal" ? (<div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ff5f56]" /><div className="w-3 h-3 rounded-full bg-[#ffbd2e]" /><div className="w-3 h-3 rounded-full bg-[#27c93f]" /></div>) : (<TerminalIcon className="w-4 h-4 text-zinc-500" />)}
        </div>
        <div className="flex items-center justify-center w-1/3">{filename && (<span className={cn("text-xs font-medium font-mono", isLightMode ? "text-zinc-600 dark:text-zinc-400" : "text-zinc-400")}>{filename}</span>)}</div>
        <div className="flex items-center justify-end gap-3 w-1/3">
          {language && (<span className={cn("px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider", theme.bg, theme.border, "border")}>{language}</span>)}
          {copyable && (
            <button onClick={handleCopy} className={cn("flex items-center justify-center w-8 h-8 rounded-lg transition-all", isLightMode ? "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400" : "hover:bg-white/10 text-zinc-400")} title="Copy code">
              {copied ? <Check className={cn("w-4 h-4", theme.text)} /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
      <div className="p-4 md:p-6 overflow-x-auto">
        <pre className="m-0 bg-transparent p-0 w-max min-w-full"><code className={cn("font-mono text-sm leading-relaxed", isLightMode ? "text-zinc-800 dark:text-zinc-200" : "text-zinc-300")}>{code}</code></pre>
      </div>
    </div>
  );
});
TerminalBlock.displayName = "TerminalBlock";`;

const sampleCodes = {
  React: {
    language: "tsx",
    filename: "Button.tsx",
    code: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium",
          "focus-visible:outline-none focus-visible:ring-2",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"`,
  },
  Python: {
    language: "python",
    filename: "main.py",
    code: `def fibonacci(n):
    """Return a list containing the Fibonacci series up to n."""
    result = []
    a, b = 0, 1
    while a < n:
        result.append(a)
        a, b = b, a + b
    return result

if __name__ == "__main__":
    # Print Fibonacci sequence up to 100
    print(fibonacci(100))`,
  },
  Bash: {
    language: "bash",
    filename: "terminal",
    code: `npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
npm install lucide-react clsx tailwind-merge
npm run dev`,
  },
};

export function TerminalShowcase() {
  const [variant, setVariant] = useState<TerminalVariant>("default");
  const [activeTab, setActiveTab] = useState<keyof typeof sampleCodes>("React");
  const [showFilename, setShowFilename] = useState(true);
  const [isCopyable, setIsCopyable] = useState(true);

  // Initialize with localStorage if available
  const [color, setColor] = useState<TerminalColor | string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("primaryColor") || "indigo";
    }
    return "indigo";
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) {
        setColor(stored);
      }
    }, 1000);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "primaryColor" && e.newValue) {
        setColor(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [color]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("primaryColor", newColor);
  };

  const currentSample = sampleCodes[activeTab];

  const generateUsageCode = (isTs: boolean) => {
    let propsStr = `\n        code={myCodeString}\n        language="${currentSample.language}"\n        variant="${variant}"\n        color="${color}"`;

    if (showFilename)
      propsStr += `\n        filename="${currentSample.filename}"`;
    if (!isCopyable) propsStr += `\n        copyable={false}`;

    return `import { TerminalBlock } from "@/components/custom/blocks/TerminalBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";

const myCodeString = \`npm install my-cool-library\`;

export default function DocsPage() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <TerminalBlock ${propsStr}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Variant Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Style Variant
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["default", "glass", "minimal"] as TerminalVariant[]).map(
                (v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                      variant === v
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    }`}
                  >
                    {v}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Code Sample Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Sample Code
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["React", "Python", "Bash"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveTab(s)}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    activeTab === s
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ThemeColorPicker color={color} onChange={handleColorChange} label="Accent Color" />
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="TerminalBlock"
        tsCode={TERMINAL_ENGINE_CODE_TS}
        jsCode={TERMINAL_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div
          className={`w-full flex flex-col items-center justify-center min-h-[450px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 ${variant === "glass" ? "bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" : "bg-white dark:bg-[#050505]"} p-6 sm:p-12 relative z-10`}
        >
          <div className="w-full max-w-2xl mx-auto">
            <TerminalBlock
              key={`${variant}-${color}-${activeTab}`}
              code={currentSample.code}
              language={currentSample.language}
              filename={showFilename ? currentSample.filename : undefined}
              copyable={isCopyable}
              variant={variant}
              color={color}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}

