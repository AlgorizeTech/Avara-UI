"use client";

import {
  Progress,
  ProgressColor,
  ProgressField,
  ProgressSize,
  ProgressVariant,
} from "@/components/custom/blocks/ProgressBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { HardDrive, Pause, Play, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const PROGRESS_ENGINE_CODE_TS = `"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ProgressVariant = "default" | "glass" | "glow" | "minimal";
export type ProgressSize = "sm" | "md" | "lg";
export type ProgressColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { bg: "bg-indigo-600", bgSoft: "bg-indigo-500/20", glow: "shadow-[0_0_15px_rgba(99,102,241,0.5)]" },
  rose: { bg: "bg-rose-600", bgSoft: "bg-rose-500/20", glow: "shadow-[0_0_15px_rgba(244,63,94,0.5)]" },
  emerald: { bg: "bg-emerald-600", bgSoft: "bg-emerald-500/20", glow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]" },
  zinc: { bg: "bg-zinc-900 dark:bg-zinc-100", bgSoft: "bg-zinc-500/20", glow: "shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)]" },
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
      theme: { bg: "bg-[var(--progress-custom)]", bgSoft: "bg-[var(--progress-custom-20)]", glow: "shadow-[0_0_15px_var(--progress-custom-50)]" },
      style: { "--progress-custom": color, "--progress-custom-20": \`rgba(\${rgb}, 0.2)\`, "--progress-custom-50": \`rgba(\${rgb}, 0.5)\` } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

export interface ProgressFieldProps extends React.HTMLAttributes<HTMLDivElement> { label?: React.ReactNode; value?: number; max?: number; showValue?: boolean; valueFormat?: (value: number, max: number) => React.ReactNode; }

export const ProgressField = forwardRef<HTMLDivElement, ProgressFieldProps>(({ label, value = 0, max = 100, showValue = true, valueFormat, className, children, ...props }, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  return (
    <div ref={ref} className={cn("flex flex-col gap-2 w-full", className)} {...props}>
      {(label || showValue) && (
        <div className="flex justify-between items-end w-full">
          {label && <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{label}</label>}
          {showValue && <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{valueFormat ? valueFormat(value, max) : \`\${Math.round(percentage)}%\`}</span>}
        </div>
      )}
      {children}
    </div>
  );
});
ProgressField.displayName = "ProgressField";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> { value?: number; max?: number; variant?: ProgressVariant; color?: ProgressColor; barSize?: ProgressSize; indicatorClassName?: string; }

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(({ value = 0, max = 100, variant = "default", color = "indigo", barSize = "md", className, indicatorClassName, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color as string);
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const sizeClasses = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
  const variantStyles = {
    default: { track: "bg-zinc-200 dark:bg-zinc-800 border-none", indicator: theme.bg },
    glass: { track: "bg-white/20 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-inner", indicator: cn(theme.bg, "backdrop-blur-xl") },
    glow: { track: "bg-zinc-200 dark:bg-zinc-900 border-none", indicator: cn(theme.bg, theme.glow) },
    minimal: { track: "bg-transparent border border-zinc-200 dark:border-zinc-800", indicator: theme.bg },
  };
  const currentVariant = variantStyles[variant];

  return (
    <div ref={ref} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} className={cn("relative w-full overflow-hidden rounded-full", sizeClasses[barSize], currentVariant.track, className)} style={style} {...props}>
      <div className={cn("h-full w-full flex-1 transition-all duration-500 ease-out rounded-full", currentVariant.indicator, indicatorClassName)} style={{ transform: \`translateX(-\${100 - percentage}%)\` }} />
    </div>
  );
});
Progress.displayName = "Progress";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const PROGRESS_ENGINE_CODE_JS = `"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

const colorThemes = {
  indigo: { bg: "bg-indigo-600", bgSoft: "bg-indigo-500/20", glow: "shadow-[0_0_15px_rgba(99,102,241,0.5)]" },
  rose: { bg: "bg-rose-600", bgSoft: "bg-rose-500/20", glow: "shadow-[0_0_15px_rgba(244,63,94,0.5)]" },
  emerald: { bg: "bg-emerald-600", bgSoft: "bg-emerald-500/20", glow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]" },
  zinc: { bg: "bg-zinc-900 dark:bg-zinc-100", bgSoft: "bg-zinc-500/20", glow: "shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)]" },
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
      theme: { bg: "bg-[var(--progress-custom)]", bgSoft: "bg-[var(--progress-custom-20)]", glow: "shadow-[0_0_15px_var(--progress-custom-50)]" },
      style: { "--progress-custom": color, "--progress-custom-20": \`rgba(\${rgb}, 0.2)\`, "--progress-custom-50": \`rgba(\${rgb}, 0.5)\` },
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

export const ProgressField = forwardRef(({ label, value = 0, max = 100, showValue = true, valueFormat, className, children, ...props }, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  return (
    <div ref={ref} className={cn("flex flex-col gap-2 w-full", className)} {...props}>
      {(label || showValue) && (
        <div className="flex justify-between items-end w-full">
          {label && <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{label}</label>}
          {showValue && <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{valueFormat ? valueFormat(value, max) : \`\${Math.round(percentage)}%\`}</span>}
        </div>
      )}
      {children}
    </div>
  );
});
ProgressField.displayName = "ProgressField";

export const Progress = forwardRef(({ value = 0, max = 100, variant = "default", color = "indigo", barSize = "md", className, indicatorClassName, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color);
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const sizeClasses = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
  const variantStyles = {
    default: { track: "bg-zinc-200 dark:bg-zinc-800 border-none", indicator: theme.bg },
    glass: { track: "bg-white/20 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-inner", indicator: cn(theme.bg, "backdrop-blur-xl") },
    glow: { track: "bg-zinc-200 dark:bg-zinc-900 border-none", indicator: cn(theme.bg, theme.glow) },
    minimal: { track: "bg-transparent border border-zinc-200 dark:border-zinc-800", indicator: theme.bg },
  };
  const currentVariant = variantStyles[variant];

  return (
    <div ref={ref} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} className={cn("relative w-full overflow-hidden rounded-full", sizeClasses[barSize], currentVariant.track, className)} style={style} {...props}>
      <div className={cn("h-full w-full flex-1 transition-all duration-500 ease-out rounded-full", currentVariant.indicator, indicatorClassName)} style={{ transform: \`translateX(-\${100 - percentage}%)\` }} />
    </div>
  );
});
Progress.displayName = "Progress";`;

export function ProgressShowcase() {
  const [variant, setVariant] = useState<ProgressVariant>("default");
  const [barSize, setBarSize] = useState<ProgressSize>("md");
  const [showLabel, setShowLabel] = useState(true);
  const [showValue, setShowValue] = useState(true);

  // Progress Value State
  const [progressValue, setProgressValue] = useState(33);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize with localStorage if available
  const [color, setColor] = useState<ProgressColor | string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("primaryColor") || "indigo";
    }
    return "indigo";
  });

  // Auto-play logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgressValue((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + Math.floor(Math.random() * 10) + 1; // Random jump between 1-10
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

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
    const propsStr = `\n        value={progress}\n        variant="${variant}"\n        color="${color}"\n        barSize="${barSize}"`;

    if (showLabel || showValue) {
      return `import { useState } from "react";
import { Progress, ProgressField } from "@/components/custom/blocks/ProgressBlock";

export default function Demo() {
  const [progress, setProgress] = useState(33);

  return (
    <div className="w-full max-w-md">
      <ProgressField 
        label=${showLabel ? '"File Upload"' : "undefined"}
        value={progress}
        showValue={${showValue}}
      >
        <Progress ${propsStr}
        />
      </ProgressField>
    </div>
  );
}`;
    }

    return `import { useState } from "react";
import { Progress } from "@/components/custom/blocks/ProgressBlock";

export default function Demo() {
  const [progress, setProgress] = useState(33);

  return (
    <div className="w-full max-w-md">
      <Progress ${propsStr}
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
              {(
                ["default", "glass", "glow", "minimal"] as ProgressVariant[]
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

          {/* Size Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Size
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["sm", "md", "lg"] as ProgressSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setBarSize(s)}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    barSize === s
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

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Color Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Theme Color
            </label>
            <div className="flex items-center gap-2 h-10 px-2">
              {[
                { id: "indigo", bg: "bg-indigo-500" },
                { id: "rose", bg: "bg-rose-500" },
                { id: "emerald", bg: "bg-emerald-500" },
                { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleColorChange(c.id)}
                  className={`w-7 h-7 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                    color === c.id
                      ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                      : "hover:scale-110 hover:opacity-80"
                  }`}
                  title={c.id}
                />
              ))}

              <div className="w-px h-5 bg-zinc-300 dark:bg-zinc-700 mx-1" />

              {/* Custom Color Picker */}
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${color.startsWith("#") ? "border-zinc-900 dark:border-white scale-110 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500" : "border-zinc-300 dark:border-zinc-700 hover:scale-110"}`}
              >
                <input
                  type="color"
                  value={color.startsWith("#") ? color : "#8b5cf6"}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="absolute inset-[-10px] w-12 h-12 cursor-pointer opacity-0"
                  title="Custom Hex Color"
                />
                <div
                  className="w-full h-full"
                  style={{
                    backgroundColor: color.startsWith("#")
                      ? color
                      : "transparent",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Features Toggles */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Field Wrapper Options
            </label>
            <div className="flex flex-wrap items-center gap-2 h-10">
              <button
                onClick={() => setShowLabel(!showLabel)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  showLabel
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Label
              </button>
              <button
                onClick={() => setShowValue(!showValue)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  showValue
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Value Display
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ProgressBlock"
        tsCode={PROGRESS_ENGINE_CODE_TS}
        jsCode={PROGRESS_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div
          className={`w-full flex flex-col items-center justify-center min-h-[450px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 ${variant === "glass" ? "p-4 sm:p-8 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center" : "bg-white dark:bg-[#050505] p-6 sm:p-12"} relative z-10`}
        >
          <div className="w-full max-w-md mx-auto flex flex-col gap-10">
            {/* The Main Component in Action */}
            <div
              className={`p-8 rounded-2xl ${variant === "glass" ? "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl" : "bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm"}`}
            >
              <ProgressField
                label={
                  showLabel ? (
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-zinc-500" />
                      <span>Storage Usage</span>
                    </div>
                  ) : undefined
                }
                value={progressValue}
                showValue={showValue}
                valueFormat={(val) =>
                  `${Math.round((val / 100) * 512)} GB / 512 GB`
                }
              >
                <Progress
                  value={progressValue}
                  variant={variant}
                  color={color}
                  barSize={barSize}
                />
              </ProgressField>
            </div>

            {/* Slider & Auto-Play Controls */}
            <div className="flex flex-col gap-4 p-6 bg-zinc-100 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-inner">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Interactive Controller
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setProgressValue(0);
                      setIsPlaying(false);
                    }}
                    className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    title="Reset"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={progressValue}
                onChange={(e) => {
                  setIsPlaying(false);
                  setProgressValue(Number(e.target.value));
                }}
                className="w-full h-2 bg-zinc-300 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-white"
              />
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
