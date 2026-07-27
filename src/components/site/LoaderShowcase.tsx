"use client";

import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const LOADER_ENGINE_CODE_TS = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type LoaderColor = "indigo" | "rose" | "emerald" | "zinc" | "blue" | "amber" | (string & {});
export type LoaderVariant = "spinner" | "dots" | "pulse" | "ring" | "bar";
export type LoaderSize = "sm" | "md" | "lg" | "xl";

const colorMap: Record<string, string> = {
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#10b981",
  zinc: "#71717a",
  blue: "#3b82f6",
  amber: "#f59e0b",
};

export const getThemeColor = (color: string) => {
  return color.startsWith("#") ? color : colorMap[color] || colorMap.indigo;
};

// ==========================================
// PROPS & MAIN COMPONENT
// ==========================================
export interface LoaderBlockProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  color?: LoaderColor;
  text?: string;
  className?: string;
}

export function LoaderBlock({
  variant = "spinner",
  size = "md",
  color = "indigo",
  text,
  className,
}: LoaderBlockProps) {
  const themeColor = getThemeColor(color);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const barSizeClasses = {
    sm: "w-16 h-1",
    md: "w-32 h-1.5",
    lg: "w-48 h-2",
    xl: "w-64 h-3",
  };

  const textClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  const currentSize = variant === "bar" ? barSizeClasses[size] : sizeClasses[size];

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      {/* Premium Custom Keyframes */}
      <style>{\`
        @keyframes wave {
          0%, 60%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          30% { transform: translateY(-4px) scale(1.2); opacity: 1; }
        }
        @keyframes indeterminate {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave { animation: wave 1.2s ease-in-out infinite; }
        .animate-indet { animation: indeterminate 1.5s infinite linear; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 2s linear infinite; }
      \`}</style>

      <div className={cn("relative flex items-center justify-center", currentSize)}>
        {variant === "spinner" && <Spinner color={themeColor} />}
        {variant === "dots" && <Dots color={themeColor} />}
        {variant === "pulse" && <Pulse color={themeColor} />}
        {variant === "ring" && <Ring color={themeColor} />}
        {variant === "bar" && <Bar color={themeColor} />}
      </div>

      {text && (
        <span className={cn("font-medium text-zinc-500 dark:text-zinc-400 animate-pulse", textClasses[size])}>
          {text}
        </span>
      )}
    </div>
  );
}

// ==========================================
// VARIANTS
// ==========================================
function Spinner({ color }: { color: string }) {
  return (
    <svg className="animate-spin w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path className="opacity-100" fill={color} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

function Dots({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5 w-full h-full">
      <div className="w-[25%] h-[25%] rounded-full animate-wave" style={{ backgroundColor: color, animationDelay: "0s" }} />
      <div className="w-[25%] h-[25%] rounded-full animate-wave" style={{ backgroundColor: color, animationDelay: "0.15s" }} />
      <div className="w-[25%] h-[25%] rounded-full animate-wave" style={{ backgroundColor: color, animationDelay: "0.3s" }} />
    </div>
  );
}

function Pulse({ color }: { color: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-full h-full rounded-full animate-ping opacity-75" style={{ backgroundColor: color }} />
      <div className="relative w-[50%] h-[50%] rounded-full" style={{ backgroundColor: color }} />
    </div>
  );
}

function Ring({ color }: { color: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-full h-full rounded-full border-[3px] border-transparent border-t-current animate-spin-slow opacity-80" style={{ color }} />
      <div className="absolute w-[70%] h-[70%] rounded-full border-[3px] border-transparent border-b-current animate-spin-reverse opacity-60" style={{ color }} />
      <div className="absolute w-[40%] h-[40%] rounded-full" style={{ backgroundColor: color }} />
    </div>
  );
}

function Bar({ color }: { color: string }) {
  return (
    <div className="w-full h-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
      <div className="h-full w-[50%] rounded-full animate-indet" style={{ backgroundColor: color }} />
    </div>
  );
}`;

// --- JAVASCRIPT ENGINE CODE ---
const LOADER_ENGINE_CODE_JS = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

const colorMap = {
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#10b981",
  zinc: "#71717a",
  blue: "#3b82f6",
  amber: "#f59e0b",
};

export const getThemeColor = (color) => {
  return color.startsWith("#") ? color : colorMap[color] || colorMap.indigo;
};

export function LoaderBlock({
  variant = "spinner",
  size = "md",
  color = "indigo",
  text,
  className,
}) {
  const themeColor = getThemeColor(color);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const barSizeClasses = {
    sm: "w-16 h-1",
    md: "w-32 h-1.5",
    lg: "w-48 h-2",
    xl: "w-64 h-3",
  };

  const textClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  const currentSize = variant === "bar" ? barSizeClasses[size] : sizeClasses[size];

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <style>{\`
        @keyframes wave {
          0%, 60%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          30% { transform: translateY(-4px) scale(1.2); opacity: 1; }
        }
        @keyframes indeterminate {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave { animation: wave 1.2s ease-in-out infinite; }
        .animate-indet { animation: indeterminate 1.5s infinite linear; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 2s linear infinite; }
      \`}</style>

      <div className={cn("relative flex items-center justify-center", currentSize)}>
        {variant === "spinner" && <Spinner color={themeColor} />}
        {variant === "dots" && <Dots color={themeColor} />}
        {variant === "pulse" && <Pulse color={themeColor} />}
        {variant === "ring" && <Ring color={themeColor} />}
        {variant === "bar" && <Bar color={themeColor} />}
      </div>

      {text && (
        <span className={cn("font-medium text-zinc-500 dark:text-zinc-400 animate-pulse", textClasses[size])}>
          {text}
        </span>
      )}
    </div>
  );
}

function Spinner({ color }) {
  return (
    <svg className="animate-spin w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path className="opacity-100" fill={color} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

function Dots({ color }) {
  return (
    <div className="flex items-center justify-center gap-1.5 w-full h-full">
      <div className="w-[25%] h-[25%] rounded-full animate-wave" style={{ backgroundColor: color, animationDelay: "0s" }} />
      <div className="w-[25%] h-[25%] rounded-full animate-wave" style={{ backgroundColor: color, animationDelay: "0.15s" }} />
      <div className="w-[25%] h-[25%] rounded-full animate-wave" style={{ backgroundColor: color, animationDelay: "0.3s" }} />
    </div>
  );
}

function Pulse({ color }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-full h-full rounded-full animate-ping opacity-75" style={{ backgroundColor: color }} />
      <div className="relative w-[50%] h-[50%] rounded-full" style={{ backgroundColor: color }} />
    </div>
  );
}

function Ring({ color }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-full h-full rounded-full border-[3px] border-transparent border-t-current animate-spin-slow opacity-80" style={{ color }} />
      <div className="absolute w-[70%] h-[70%] rounded-full border-[3px] border-transparent border-b-current animate-spin-reverse opacity-60" style={{ color }} />
      <div className="absolute w-[40%] h-[40%] rounded-full" style={{ backgroundColor: color }} />
    </div>
  );
}

function Bar({ color }) {
  return (
    <div className="w-full h-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
      <div className="h-full w-[50%] rounded-full animate-indet" style={{ backgroundColor: color }} />
    </div>
  );
}`;

type LoaderColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | "blue"
  | "amber"
  | string;
type LoaderVariant = "spinner" | "dots" | "pulse" | "ring" | "bar";
type LoaderSize = "sm" | "md" | "lg" | "xl";

// We import the dynamically generated one for the showcase preview
import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function LoaderShowcase() {
  const [variant, setVariant] = useState<LoaderVariant>("spinner");
  const [size, setSize] = useState<LoaderSize>("md");
  const [showText, setShowText] = useState(false);

  // Initialize with localStorage if available
  const [color, setColor] = useState<LoaderColor | string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("primaryColor") || "indigo";
    }
    return "indigo";
  });

  // Automatically listen for updates to the primaryColor in localStorage
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

  // Sync manual UI changes down to local storage
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("primaryColor", newColor);
  };

  const generateUsageCode = (isTs: boolean) => {
    let propsStr = `\n        variant="${variant}"\n        color="${color}"\n        size="${size}"`;
    if (showText) {
      propsStr += `\n        text="Processing..."`;
    }

    return `import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

export default function LoadingState() {
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <LoaderBlock ${propsStr}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Animation Variant
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(
                ["spinner", "dots", "pulse", "ring", "bar"] as LoaderVariant[]
              ).map((v) => (
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
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Size
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["sm", "md", "lg", "xl"] as LoaderSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md uppercase transition-all ${
                    size === s
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

        <ThemeColorPicker color={color} onChange={handleColorChange} label="Theme Color" />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="LoaderBlock"
        tsCode={LOADER_ENGINE_CODE_TS}
        jsCode={LOADER_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex items-center justify-center min-h-[300px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 relative z-10">
          <LoaderBlock
            key={`${variant}-${color}-${size}-${showText}`}
            variant={variant}
            color={color}
            size={size}
            text={showText ? "Processing data..." : undefined}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
