"use client";

import {
  TabsColor,
  TabsVariant,
  VerticalTabs,
} from "@/components/custom/blocks/VerticalTabs";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const TABS_ENGINE_CODE_TS = `"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export type TabsColor = "indigo" | "rose" | "emerald" | "zinc" | "purple" | string;
export type TabsVariant = "default" | "glass" | "minimal" | "bordered";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-600", dot: "bg-white" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", border: "border-rose-600", dot: "bg-white" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-600", dot: "bg-white" },
  purple: { bg: "bg-[#8B5CF6] text-white", text: "text-[#8B5CF6] dark:text-[#A78BFA]", border: "border-[#8B5CF6]", dot: "bg-white" },
  zinc: { bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", dot: "bg-white dark:bg-zinc-900" },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "139, 92, 246";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[var(--theme-color)] text-white", text: "text-[var(--theme-color)]", border: "border-[var(--theme-color)]", dot: "bg-white" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.purple, style: {} };
};

export interface TabItem { id: string; label: string; icon?: React.ElementType; content: React.ReactNode; }
export interface VerticalTabsProps { tabs: TabItem[]; color?: TabsColor; variant?: TabsVariant; defaultActiveId?: string; className?: string; }

export function VerticalTabs({ tabs, color = "purple", variant = "default", defaultActiveId, className }: VerticalTabsProps) {
  const [activeId, setActiveId] = useState<string>(defaultActiveId || tabs[0]?.id || "");
  const contentRef = useRef<HTMLDivElement>(null);
  const { theme, style } = getThemeStyles(color);

  const activeTab = tabs.find((t) => t.id === activeId) || tabs[0];

  useEffect(() => {
    if (contentRef.current) gsap.fromTo(contentRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
  }, [activeId]);

  if (!tabs || tabs.length === 0) return null;

  const getVariantStyles = () => ({
    default: { container: "gap-6", menuBox: "bg-zinc-50 dark:bg-[#121212] rounded-2xl p-3 border border-zinc-200 dark:border-zinc-800/50 shadow-sm", contentBox: "bg-zinc-50 dark:bg-[#121212] rounded-2xl p-8 md:p-10 border border-zinc-200 dark:border-zinc-800/50 shadow-sm", activeTab: cn("shadow-md", theme.bg), inactiveTab: "hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400" },
    glass: { container: "gap-6", menuBox: "bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-3 border border-white/20 dark:border-white/10 shadow-xl", contentBox: "bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/20 dark:border-white/10 shadow-xl", activeTab: cn("shadow-lg backdrop-blur-md", theme.bg), inactiveTab: "hover:bg-white/20 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300" },
    minimal: { container: "gap-8", menuBox: "bg-transparent p-0 border-none", contentBox: "bg-transparent p-0 border-none", activeTab: cn("rounded-xl", theme.bg), inactiveTab: "hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl text-zinc-600 dark:text-zinc-400" },
    bordered: { container: "gap-0 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-[#09090b] shadow-sm", menuBox: "bg-zinc-50 dark:bg-[#121212] p-4 border-r border-zinc-200 dark:border-zinc-800 rounded-none", contentBox: "p-8 md:p-10 bg-transparent rounded-none border-none", activeTab: cn("rounded-xl shadow-sm", theme.bg), inactiveTab: "hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 rounded-xl" }
  })[variant];

  const styles = getVariantStyles();

  return (
    <div className={cn("w-full flex flex-col md:flex-row", styles.container, className)} style={style}>
      <div className={cn("w-full md:w-64 lg:w-72 shrink-0 flex flex-col gap-1.5", styles.menuBox)}>
        {tabs.map((tab) => {
          const isActive = activeId === tab.id;
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveId(tab.id)} className={cn("w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98]", isActive ? styles.activeTab : styles.inactiveTab)}>
              <div className="flex items-center gap-3.5">
                {Icon && <Icon className={cn("w-5 h-5", isActive ? "opacity-100" : "opacity-70")} strokeWidth={isActive ? 2.5 : 2} />}
                <span className="text-base tracking-tight">{tab.label}</span>
              </div>
              <div className={cn("w-1.5 h-1.5 rounded-full transition-all duration-300", isActive ? theme.dot : "bg-zinc-300 dark:bg-zinc-700")} />
            </button>
          );
        })}
      </div>
      <div className={cn("flex-1 overflow-hidden min-h-[300px]", styles.contentBox)}>
        <div ref={contentRef} className="w-full h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            {activeTab.icon && <activeTab.icon className="w-7 h-7 text-zinc-800 dark:text-zinc-200 opacity-80" strokeWidth={2.5} />}
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">{activeTab.label}</h2>
          </div>
          <div className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed flex-1">{activeTab.content}</div>
        </div>
      </div>
    </div>
  );
}`;

// --- PURE JAVASCRIPT ENGINE CODE (Replaces Regex) ---
const TABS_ENGINE_CODE_JS = `"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const colorThemes = {
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-600", dot: "bg-white" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", border: "border-rose-600", dot: "bg-white" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-600", dot: "bg-white" },
  purple: { bg: "bg-[#8B5CF6] text-white", text: "text-[#8B5CF6] dark:text-[#A78BFA]", border: "border-[#8B5CF6]", dot: "bg-white" },
  zinc: { bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", dot: "bg-white dark:bg-zinc-900" },
};

const hexToRgb = (hex) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "139, 92, 246";
};

export const getThemeStyles = (color) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[var(--theme-color)] text-white", text: "text-[var(--theme-color)]", border: "border-[var(--theme-color)]", dot: "bg-white" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.purple, style: {} };
};

export function VerticalTabs({ tabs, color = "purple", variant = "default", defaultActiveId, className }) {
  const [activeId, setActiveId] = useState(defaultActiveId || tabs[0]?.id || "");
  const contentRef = useRef(null);
  const { theme, style } = getThemeStyles(color);

  const activeTab = tabs.find((t) => t.id === activeId) || tabs[0];

  useEffect(() => {
    if (contentRef.current) gsap.fromTo(contentRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
  }, [activeId]);

  if (!tabs || tabs.length === 0) return null;

  const getVariantStyles = () => ({
    default: { container: "gap-6", menuBox: "bg-zinc-50 dark:bg-[#121212] rounded-2xl p-3 border border-zinc-200 dark:border-zinc-800/50 shadow-sm", contentBox: "bg-zinc-50 dark:bg-[#121212] rounded-2xl p-8 md:p-10 border border-zinc-200 dark:border-zinc-800/50 shadow-sm", activeTab: cn("shadow-md", theme.bg), inactiveTab: "hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400" },
    glass: { container: "gap-6", menuBox: "bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-3 border border-white/20 dark:border-white/10 shadow-xl", contentBox: "bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/20 dark:border-white/10 shadow-xl", activeTab: cn("shadow-lg backdrop-blur-md", theme.bg), inactiveTab: "hover:bg-white/20 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300" },
    minimal: { container: "gap-8", menuBox: "bg-transparent p-0 border-none", contentBox: "bg-transparent p-0 border-none", activeTab: cn("rounded-xl", theme.bg), inactiveTab: "hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl text-zinc-600 dark:text-zinc-400" },
    bordered: { container: "gap-0 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-[#09090b] shadow-sm", menuBox: "bg-zinc-50 dark:bg-[#121212] p-4 border-r border-zinc-200 dark:border-zinc-800 rounded-none", contentBox: "p-8 md:p-10 bg-transparent rounded-none border-none", activeTab: cn("rounded-xl shadow-sm", theme.bg), inactiveTab: "hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 rounded-xl" }
  })[variant];

  const styles = getVariantStyles();

  return (
    <div className={cn("w-full flex flex-col md:flex-row", styles.container, className)} style={style}>
      <div className={cn("w-full md:w-64 lg:w-72 shrink-0 flex flex-col gap-1.5", styles.menuBox)}>
        {tabs.map((tab) => {
          const isActive = activeId === tab.id;
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveId(tab.id)} className={cn("w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98]", isActive ? styles.activeTab : styles.inactiveTab)}>
              <div className="flex items-center gap-3.5">
                {Icon && <Icon className={cn("w-5 h-5", isActive ? "opacity-100" : "opacity-70")} strokeWidth={isActive ? 2.5 : 2} />}
                <span className="text-base tracking-tight">{tab.label}</span>
              </div>
              <div className={cn("w-1.5 h-1.5 rounded-full transition-all duration-300", isActive ? theme.dot : "bg-zinc-300 dark:bg-zinc-700")} />
            </button>
          );
        })}
      </div>
      <div className={cn("flex-1 overflow-hidden min-h-[300px]", styles.contentBox)}>
        <div ref={contentRef} className="w-full h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            {activeTab.icon && <activeTab.icon className="w-7 h-7 text-zinc-800 dark:text-zinc-200 opacity-80" strokeWidth={2.5} />}
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">{activeTab.label}</h2>
          </div>
          <div className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed flex-1">{activeTab.content}</div>
        </div>
      </div>
    </div>
  );
}`;

export function VerticalTabsShowcase() {
  const [variant, setVariant] = useState<TabsVariant>("default");
  const [color, setColor] = useState<TabsColor>("#8B5CF6");

  const sampleTabs = [
    {
      id: "photos",
      label: "Photos",
      icon: Camera,
      content: (
        <p>
          This is the PHOTOS tab content. Here you would display your photo
          gallery, albums, or image collection grids. The smooth crossfade
          animation makes navigating between these rich content areas feel
          native.
        </p>
      ),
    },
    {
      id: "music",
      label: "Music",
      icon: Music,
      content: (
        <p>
          This is the MUSIC tab content. Imagine a playlist, audio player
          controls, or your favorite albums rendered perfectly within this
          dark-mode optimized space.
        </p>
      ),
    },
    {
      id: "videos",
      label: "Videos",
      icon: Clapperboard,
      content: (
        <p>
          This is the VIDEOS tab content. Video players, stream links, or
          watch-later lists belong here. Notice how the active dot indicator
          clearly shows your current location in the app structure.
        </p>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      content: (
        <p>
          Adjust your preferences, notification settings, and privacy controls
          here.
        </p>
      ),
    },
  ];

  const generateUsageCode = (isTs: boolean) => {
    return `import { VerticalTabs } from "@/components/custom/blocks/VerticalTabs";
import { Camera, Music, Clapperboard } from "lucide-react";

export default function Dashboard() {
  const tabs = [
    {
      id: "photos",
      label: "Photos",
      icon: Camera,
      content: <p>This is the PHOTOS tab content.</p>,
    },
    {
      id: "music",
      label: "Music",
      icon: Music,
      content: <p>This is the MUSIC tab content.</p>,
    },
    {
      id: "videos",
      label: "Videos",
      icon: Clapperboard,
      content: <p>This is the VIDEOS tab content.</p>,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-8">
      <VerticalTabs 
        tabs={tabs} 
        variant="${variant}" 
        color="${color}" 
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col md:flex-row gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Structural Variant
          </label>
          <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
            {(["default", "glass", "minimal", "bordered"] as TabsVariant[]).map(
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
                onClick={() => setColor(c.id as TabsColor)}
                className={`w-7 h-7 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                  color === c.id
                    ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                    : "hover:scale-110 hover:opacity-80"
                }`}
                title={c.id}
              />
            ))}

            {/* Custom Color Picker */}
            <div
              className={`relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${color.startsWith("#") ? "border-zinc-900 dark:border-white scale-110 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500" : "border-zinc-300 dark:border-zinc-700 hover:scale-110"}`}
            >
              <input
                type="color"
                value={color.startsWith("#") ? color : "#8B5CF6"}
                onChange={(e) => setColor(e.target.value)}
                className="absolute inset-[-10px] w-12 h-12 cursor-pointer"
                title="Custom Hex Color"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="VerticalTabs"
        tsCode={TABS_ENGINE_CODE_TS}
        jsCode={TABS_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div
          className={`w-full flex items-center justify-center min-h-[500px] transition-colors duration-300 ${variant === "glass" ? "p-4 sm:p-8 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black rounded-2xl" : "bg-white dark:bg-black py-12"}`}
        >
          <div className="w-full max-w-4xl mx-auto px-4">
            <VerticalTabs
              key={`${variant}-${color}`}
              tabs={sampleTabs}
              variant={variant}
              color={color}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}