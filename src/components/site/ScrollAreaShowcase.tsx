"use client";

import {
  ScrollAreaBlock,
  ScrollAreaColor,
  ScrollAreaVariant,
} from "@/components/custom/blocks/ScrollAreaBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { FileText, Image as ImageIcon, Tag } from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const SCROLL_ENGINE_CODE_TS = `"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ScrollAreaVariant = "default" | "minimal" | "glass";
export type ScrollAreaColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { thumb: "#4f46e5", thumbHover: "#4338ca", track: "rgba(79, 70, 229, 0.1)" },
  rose: { thumb: "#e11d48", thumbHover: "#be123c", track: "rgba(225, 29, 72, 0.1)" },
  emerald: { thumb: "#10b981", thumbHover: "#059669", track: "rgba(16, 185, 129, 0.1)" },
  zinc: { thumb: "#52525b", thumbHover: "#3f3f46", track: "rgba(113, 113, 122, 0.1)" },
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
      style: {
        "--scroll-thumb": color,
        "--scroll-thumb-hover": \`rgba(\${rgb}, 0.8)\`,
        "--scroll-track": \`rgba(\${rgb}, 0.1)\`,
      } as React.CSSProperties,
    };
  }
  const theme = colorThemes[color] || colorThemes.zinc;
  return {
    style: {
      "--scroll-thumb": theme.thumb,
      "--scroll-thumb-hover": theme.thumbHover,
      "--scroll-track": theme.track,
    } as React.CSSProperties,
  };
};

export interface ScrollAreaBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: ScrollAreaColor;
  variant?: ScrollAreaVariant;
  orientation?: "vertical" | "horizontal" | "both";
  hideTrack?: boolean;
  autoHide?: boolean;
}

export const ScrollAreaBlock = forwardRef<HTMLDivElement, ScrollAreaBlockProps>(
  ({ children, color = "zinc", variant = "default", orientation = "vertical", hideTrack = false, autoHide = false, className, ...props }, ref) => {
    const { style } = getThemeStyles(color as string);
    const uniqueClass = \`custom-scroll-\${variant}-\${orientation}\`;

    const variantStyles = {
      default: { width: "8px", height: "8px", radius: "8px", border: "2px solid transparent" },
      minimal: { width: "4px", height: "4px", radius: "4px", border: "none" },
      glass: { width: "10px", height: "10px", radius: "10px", border: "2px solid transparent" },
    };
    const v = variantStyles[variant];

    const overflowClass = {
      vertical: "overflow-y-auto overflow-x-hidden",
      horizontal: "overflow-x-auto overflow-y-hidden",
      both: "overflow-auto",
    }[orientation];

    return (
      <div ref={ref} className={cn("relative", overflowClass, uniqueClass, autoHide && "auto-hide-scroll", className)} style={style} {...props}>
        <style>{\`
          .\${uniqueClass}::-webkit-scrollbar { width: \${v.width}; height: \${v.height}; }
          .\${uniqueClass}::-webkit-scrollbar-track { background: \${hideTrack ? "transparent" : variant === "glass" ? "rgba(255,255,255,0.05)" : "var(--scroll-track)"}; border-radius: \${v.radius}; backdrop-filter: \${variant === "glass" ? "blur(8px)" : "none"}; }
          .\${uniqueClass}::-webkit-scrollbar-thumb { background-color: var(--scroll-thumb); border-radius: \${v.radius}; border: \${v.border}; background-clip: padding-box; }
          .\${uniqueClass}::-webkit-scrollbar-thumb:hover { background-color: var(--scroll-thumb-hover); }
          .\${uniqueClass} { scrollbar-width: \${variant === "minimal" ? "thin" : "auto"}; scrollbar-color: var(--scroll-thumb) \${hideTrack ? "transparent" : "var(--scroll-track)"}; }
          .auto-hide-scroll::-webkit-scrollbar-thumb { background-color: transparent; transition: background-color 0.3s; }
          .auto-hide-scroll:hover::-webkit-scrollbar-thumb { background-color: var(--scroll-thumb); }
        \`}</style>
        {children}
      </div>
    );
  }
);
ScrollAreaBlock.displayName = "ScrollAreaBlock";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const SCROLL_ENGINE_CODE_JS = `"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

const colorThemes = {
  indigo: { thumb: "#4f46e5", thumbHover: "#4338ca", track: "rgba(79, 70, 229, 0.1)" },
  rose: { thumb: "#e11d48", thumbHover: "#be123c", track: "rgba(225, 29, 72, 0.1)" },
  emerald: { thumb: "#10b981", thumbHover: "#059669", track: "rgba(16, 185, 129, 0.1)" },
  zinc: { thumb: "#52525b", thumbHover: "#3f3f46", track: "rgba(113, 113, 122, 0.1)" },
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
      style: {
        "--scroll-thumb": color,
        "--scroll-thumb-hover": \`rgba(\${rgb}, 0.8)\`,
        "--scroll-track": \`rgba(\${rgb}, 0.1)\`,
      },
    };
  }
  const theme = colorThemes[color] || colorThemes.zinc;
  return {
    style: {
      "--scroll-thumb": theme.thumb,
      "--scroll-thumb-hover": theme.thumbHover,
      "--scroll-track": theme.track,
    },
  };
};

export const ScrollAreaBlock = forwardRef(
  ({ children, color = "zinc", variant = "default", orientation = "vertical", hideTrack = false, autoHide = false, className, ...props }, ref) => {
    const { style } = getThemeStyles(color);
    const uniqueClass = \`custom-scroll-\${variant}-\${orientation}\`;

    const variantStyles = {
      default: { width: "8px", height: "8px", radius: "8px", border: "2px solid transparent" },
      minimal: { width: "4px", height: "4px", radius: "4px", border: "none" },
      glass: { width: "10px", height: "10px", radius: "10px", border: "2px solid transparent" },
    };
    const v = variantStyles[variant];

    const overflowClass = {
      vertical: "overflow-y-auto overflow-x-hidden",
      horizontal: "overflow-x-auto overflow-y-hidden",
      both: "overflow-auto",
    }[orientation];

    return (
      <div ref={ref} className={cn("relative", overflowClass, uniqueClass, autoHide && "auto-hide-scroll", className)} style={style} {...props}>
        <style>{\`
          .\${uniqueClass}::-webkit-scrollbar { width: \${v.width}; height: \${v.height}; }
          .\${uniqueClass}::-webkit-scrollbar-track { background: \${hideTrack ? "transparent" : variant === "glass" ? "rgba(255,255,255,0.05)" : "var(--scroll-track)"}; border-radius: \${v.radius}; backdrop-filter: \${variant === "glass" ? "blur(8px)" : "none"}; }
          .\${uniqueClass}::-webkit-scrollbar-thumb { background-color: var(--scroll-thumb); border-radius: \${v.radius}; border: \${v.border}; background-clip: padding-box; }
          .\${uniqueClass}::-webkit-scrollbar-thumb:hover { background-color: var(--scroll-thumb-hover); }
          .\${uniqueClass} { scrollbar-width: \${variant === "minimal" ? "thin" : "auto"}; scrollbar-color: var(--scroll-thumb) \${hideTrack ? "transparent" : "var(--scroll-track)"}; }
          .auto-hide-scroll::-webkit-scrollbar-thumb { background-color: transparent; transition: background-color 0.3s; }
          .auto-hide-scroll:hover::-webkit-scrollbar-thumb { background-color: var(--scroll-thumb); }
        \`}</style>
        {children}
      </div>
    );
  }
);
ScrollAreaBlock.displayName = "ScrollAreaBlock";`;

export function ScrollAreaShowcase() {
  const [variant, setVariant] = useState<ScrollAreaVariant>("default");
  const [orientation, setOrientation] = useState<
    "vertical" | "horizontal" | "both"
  >("vertical");
  const [hideTrack, setHideTrack] = useState(false);
  const [autoHide, setAutoHide] = useState(false);

  // Initialize with localStorage if available
  const [color, setColor] = useState<ScrollAreaColor | string>(() => {
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
    let propsStr = `\n        variant="${variant}"\n        color="${color}"`;

    if (orientation !== "vertical")
      propsStr += `\n        orientation="${orientation}"`;
    if (hideTrack) propsStr += `\n        hideTrack`;
    if (autoHide) propsStr += `\n        autoHide`;

    return `import { ScrollAreaBlock } from "@/components/custom/blocks/ScrollAreaBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";

export default function Demo() {
  return (
    <ScrollAreaBlock ${propsStr}
      className="h-[400px] w-[300px] rounded-md border p-4"
    >
      <div className="flex flex-col gap-4">
        {/* Long content here to trigger scrolling */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="p-4 bg-zinc-100 rounded-lg">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollAreaBlock>
  );
}`;
  };

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`,
  );

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
              {(["default", "minimal", "glass"] as ScrollAreaVariant[]).map(
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

          {/* Orientation Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Orientation
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["vertical", "horizontal", "both"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setOrientation(s)}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    orientation === s
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

        <ThemeColorPicker color={color} onChange={handleColorChange} label="Thumb Color" />
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ScrollAreaBlock"
        tsCode={SCROLL_ENGINE_CODE_TS}
        jsCode={SCROLL_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div
          className={`w-full flex items-center justify-center min-h-[450px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 ${variant === "glass" ? "bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" : "bg-zinc-50 dark:bg-[#050505] p-6 relative z-10"}`}
        >
          <ScrollAreaBlock
            key={`${variant}-${color}-${orientation}-${hideTrack}-${autoHide}`}
            variant={variant}
            color={color}
            orientation={orientation}
            hideTrack={hideTrack}
            autoHide={autoHide}
            className={`rounded-2xl border ${variant === "glass" ? "bg-white/10 dark:bg-black/20 backdrop-blur-xl border-white/20 dark:border-white/10 shadow-2xl" : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm"} ${orientation === "horizontal" ? "w-full max-w-2xl whitespace-nowrap p-6" : orientation === "both" ? "h-[300px] w-full max-w-sm p-6 whitespace-nowrap" : "h-[350px] w-full max-w-sm p-6"}`}
          >
            {/* Conditional Content based on Orientation to showcase properly */}
            {orientation === "vertical" && (
              <div className="pr-4">
                <h4
                  className={`mb-4 text-sm font-bold leading-none ${variant === "glass" ? "text-white" : "text-zinc-900 dark:text-white"}`}
                >
                  Tags
                </h4>
                {tags.map((tag) => (
                  <div key={tag} className="text-sm">
                    <div
                      className={`py-3 flex items-center gap-2 ${variant === "glass" ? "text-zinc-100" : "text-zinc-600 dark:text-zinc-400"}`}
                    >
                      <Tag className="w-4 h-4 opacity-50" />
                      {tag}
                    </div>
                    <div
                      className={`my-1 border-t ${variant === "glass" ? "border-white/10" : "border-zinc-100 dark:border-zinc-800/50"}`}
                    />
                  </div>
                ))}
              </div>
            )}

            {orientation === "horizontal" && (
              <div className="flex w-max space-x-4 pb-4">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-[150px] shrink-0 rounded-xl overflow-hidden ${variant === "glass" ? "bg-white/20 border border-white/20" : "bg-zinc-100 dark:bg-zinc-900"}`}
                  >
                    <div
                      className={`h-[100px] flex items-center justify-center ${variant === "glass" ? "bg-white/10" : "bg-zinc-200 dark:bg-zinc-800"}`}
                    >
                      <ImageIcon
                        className={`w-8 h-8 ${variant === "glass" ? "text-white/50" : "text-zinc-400 dark:text-zinc-600"}`}
                      />
                    </div>
                    <div
                      className={`p-4 text-sm font-bold ${variant === "glass" ? "text-white" : "text-zinc-900 dark:text-white"}`}
                    >
                      Artwork {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {orientation === "both" && (
              <div className="flex w-max space-x-6 pb-4 pr-4">
                {Array.from({ length: 10 }).map((_, col) => (
                  <div key={col} className="flex flex-col gap-4">
                    {Array.from({ length: 10 }).map((_, row) => (
                      <div
                        key={row}
                        className={`w-[120px] p-4 rounded-xl flex items-center gap-2 ${variant === "glass" ? "bg-white/20 border border-white/20 text-white" : "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"}`}
                      >
                        <FileText className="w-4 h-4 opacity-50" />
                        Doc {col}-{row}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </ScrollAreaBlock>
        </div>
      </ComponentPreview>
    </div>
  );
}
