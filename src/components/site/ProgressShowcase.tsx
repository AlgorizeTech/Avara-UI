"use client";

import {
  Progress,
  ProgressField,
  ProgressSize,
  ProgressVariant,
} from "@/components/custom/blocks/ProgressBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { cn } from "@/lib/utils";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const PROGRESS_CODE_TS = `"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

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

// --- JAVASCRIPT ENGINE CODE ---
const PROGRESS_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

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
  const [value, setValue] = useState(45);
  const [max, setMax] = useState(100);
  const [variant, setVariant] = useState<ProgressVariant>("glow");
  const [barSize, setBarSize] = useState<ProgressSize>("md");
  const [color, setColor] = useState<string>("primary");

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  // Resolve active color for the slider thumbs
  const colorMap: Record<string, string> = {
    primary: "var(--primary)",
    indigo: "#4f46e5",
    rose: "#e11d48",
    emerald: "#10b981",
    zinc: "#18181b",
  };
  const activeHex = color.startsWith("#")
    ? color
    : colorMap[color] || "var(--primary)";

  // Cross-browser targeted structural selectors to keep range track line visible permanently
  const sliderClasses = cn(
    "w-full appearance-none bg-transparent cursor-pointer outline-none",
    // ── Webkit Track Styles (Permanent Visibility) ──
    "[&::-webkit-slider-runnable-track]:h-1.5",
    "[&::-webkit-slider-runnable-track]:bg-zinc-200",
    "dark:[&::-webkit-slider-runnable-track]:bg-zinc-800",
    "[&::-webkit-slider-runnable-track]:rounded-full",
    // ── Webkit Thumb Styles ──
    "[&::-webkit-slider-thumb]:appearance-none",
    "[&::-webkit-slider-thumb]:w-4",
    "[&::-webkit-slider-thumb]:h-4",
    "[&::-webkit-slider-thumb]:rounded-full",
    "[&::-webkit-slider-thumb]:bg-[var(--thumb-color)]",
    "[&::-webkit-slider-thumb]:mt-[-5px]", // Vertical adjustment offset
    "[&::-webkit-slider-thumb]:shadow-sm",
    "[&::-webkit-slider-thumb]:transition-transform",
    "hover:[&::-webkit-slider-thumb]:scale-110",
    // ── Mozilla Track Styles ──
    "[&::-moz-range-track]:h-1.5",
    "[&::-moz-range-track]:bg-zinc-200",
    "dark:[&::-moz-range-track]:bg-zinc-800",
    "[&::-moz-range-track]:rounded-full",
    // ── Mozilla Thumb Styles ──
    "[&::-moz-range-thumb]:w-4",
    "[&::-moz-range-thumb]:h-4",
    "[&::-moz-range-thumb]:rounded-full",
    "[&::-moz-range-thumb]:bg-[var(--thumb-color)]",
    "[&::-moz-range-thumb]:border-none",
    "[&::-moz-range-thumb]:shadow-sm",
    "[&::-moz-range-thumb]:transition-transform",
    "hover:[&::-moz-range-thumb]:scale-110",
  );

  const generateUsageCode = () => {
    const colorPropStr = color && color !== "primary" && color !== "default" ? `\n        color="${color}"` : "";
    return `import { Progress, ProgressField } from "@/components/custom/blocks/ProgressBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

export default function UsageDemo() {
  return (
    <ProgressField label="Server Load" value={${value}} max={${max}}>
      <Progress 
        value={${value}} 
        max={${max}} 
        variant="${variant}" 
        barSize="${barSize}"${colorPropStr} 
      />
    </ProgressField>
  );
};`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL CONTROLLER --- */}
      <ShowcaseControlPanel
        style={
          {
            "--thumb-color":
              color === "zinc" ? "var(--zinc-thumb, #18181b)" : activeHex,
          } as React.CSSProperties
        }
        className="flex flex-col gap-6 p-5 rounded-xl z-0 relative"
      >
        {/* Helper style specifically to make 'zinc' color thumb adapt in dark mode */}
        <style>{`
          .dark { --zinc-thumb: #ffffff; }
        `}</style>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Slider 1: Value */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              Value Control
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md text-[11px]">
                {value}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max={max}
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value))}
              className={sliderClasses}
            />
          </div>

          {/* Slider 2: Max Value */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              Max Boundary
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md text-[11px]">
                {max}
              </span>
            </label>
            <input
              type="range"
              min="50"
              max="200"
              value={max}
              onChange={(e) => {
                const newMax = parseInt(e.target.value);
                setMax(newMax);
                if (value > newMax) setValue(newMax);
              }}
              className={sliderClasses}
            />
          </div>

          {/* Dropdown 1: Variant */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Style Variant
            </label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as ProgressVariant)}
              className="w-full h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="default">Default</option>
              <option value="glass">Glassmorphic</option>
              <option value="glow">Neon Glow</option>
              <option value="minimal">Minimal Outline</option>
            </select>
          </div>

          {/* Dropdown 2: Size */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Bar Height Scale
            </label>
            <select
              value={barSize}
              onChange={(e) => setBarSize(e.target.value as ProgressSize)}
              className="w-full h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="sm">Small (6px)</option>
              <option value="md">Medium (10px)</option>
              <option value="lg">Large (16px)</option>
            </select>
          </div>
        </div>

        {/* Color */}
          <ThemeColorPicker color={color} onChange={handleColorChange} label="Accent Brand Theme" />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ProgressBlock"
        tsCode={PROGRESS_CODE_TS}
        jsCode={PROGRESS_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
        sandbox="progress"
        sandboxProps={{ value, max, variant, barSize, color }}
      >
        <div className="w-full flex flex-col items-center justify-center min-h-[220px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 sm:p-12 relative z-10 overflow-hidden">
          <div className="w-full max-w-md mx-auto">
            <ProgressField
              label="Database Synchronization Pipeline"
              value={value}
              max={max}
            >
              <Progress
                value={value}
                max={max}
                variant={variant}
                color={color}
                barSize={barSize}
              />
            </ProgressField>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
