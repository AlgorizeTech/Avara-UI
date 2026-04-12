"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type TabsColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | "purple"
  | string;
export type TabsVariant = "default" | "glass" | "minimal" | "bordered";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: {
    bg: "bg-indigo-600 text-white",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-600",
    dot: "bg-white",
  },
  rose: {
    bg: "bg-rose-600 text-white",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-600",
    dot: "bg-white",
  },
  emerald: {
    bg: "bg-emerald-600 text-white",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-600",
    dot: "bg-white",
  },
  purple: {
    bg: "bg-[#8B5CF6] text-white",
    text: "text-[#8B5CF6] dark:text-[#A78BFA]",
    border: "border-[#8B5CF6]",
    dot: "bg-white",
  },
  zinc: {
    bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    dot: "bg-white dark:bg-zinc-900",
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
    : "139, 92, 246";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        bg: "bg-[var(--theme-color)] text-white",
        text: "text-[var(--theme-color)]",
        border: "border-[var(--theme-color)]",
        dot: "bg-white",
      },
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.purple, style: {} };
};

// ==========================================
// COMPONENT INTERFACES
// ==========================================
export interface TabItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  content: React.ReactNode;
}

export interface VerticalTabsProps {
  tabs: TabItem[];
  color?: TabsColor;
  variant?: TabsVariant;
  defaultActiveId?: string;
  className?: string;
}

export function VerticalTabs({
  tabs,
  color = "purple",
  variant = "default",
  defaultActiveId,
  className,
}: VerticalTabsProps) {
  const [activeId, setActiveId] = useState<string>(
    defaultActiveId || tabs[0]?.id || "",
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const { theme, style } = getThemeStyles(color);

  const activeTab = tabs.find((t) => t.id === activeId) || tabs[0];

  // GSAP Crossfade Animation when switching tabs
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      );
    }
  }, [activeId]);

  if (!tabs || tabs.length === 0) return null;

  const getVariantStyles = () =>
    ({
      default: {
        container: "gap-6",
        menuBox:
          "bg-zinc-50 dark:bg-[#121212] rounded-2xl p-3 border border-zinc-200 dark:border-zinc-800/50 shadow-sm",
        contentBox:
          "bg-zinc-50 dark:bg-[#121212] rounded-2xl p-8 md:p-10 border border-zinc-200 dark:border-zinc-800/50 shadow-sm",
        activeTab: cn("shadow-md", theme.bg),
        inactiveTab:
          "hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400",
      },
      glass: {
        container: "gap-6",
        menuBox:
          "bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-3 border border-white/20 dark:border-white/10 shadow-xl",
        contentBox:
          "bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/20 dark:border-white/10 shadow-xl",
        activeTab: cn("shadow-lg backdrop-blur-md", theme.bg),
        inactiveTab:
          "hover:bg-white/20 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300",
      },
      minimal: {
        container: "gap-8",
        menuBox: "bg-transparent p-0 border-none",
        contentBox: "bg-transparent p-0 border-none",
        activeTab: cn("rounded-xl", theme.bg),
        inactiveTab:
          "hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl text-zinc-600 dark:text-zinc-400",
      },
      bordered: {
        container:
          "gap-0 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-[#09090b] shadow-sm",
        menuBox:
          "bg-zinc-50 dark:bg-[#121212] p-4 border-r border-zinc-200 dark:border-zinc-800 rounded-none",
        contentBox: "p-8 md:p-10 bg-transparent rounded-none border-none",
        activeTab: cn("rounded-xl shadow-sm", theme.bg),
        inactiveTab:
          "hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 rounded-xl",
      },
    })[variant];

  const styles = getVariantStyles();

  return (
    <div
      className={cn(
        "w-full flex flex-col md:flex-row",
        styles.container,
        className,
      )}
      style={style}
    >
      {/* Sidebar Menu */}
      <div
        className={cn(
          "w-full md:w-64 lg:w-72 shrink-0 flex flex-col gap-1.5",
          styles.menuBox,
        )}
      >
        {tabs.map((tab) => {
          const isActive = activeId === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98]",
                isActive ? styles.activeTab : styles.inactiveTab,
              )}
            >
              <div className="flex items-center gap-3.5">
                {Icon && (
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isActive ? "opacity-100" : "opacity-70",
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                )}
                <span className="text-base tracking-tight">{tab.label}</span>
              </div>

              {/* The Dot Indicator */}
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  isActive ? theme.dot : "bg-zinc-300 dark:bg-zinc-700",
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div
        className={cn(
          "flex-1 overflow-hidden min-h-[300px]",
          styles.contentBox,
        )}
      >
        <div ref={contentRef} className="w-full h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            {activeTab.icon && (
              <activeTab.icon
                className="w-7 h-7 text-zinc-800 dark:text-zinc-200 opacity-80"
                strokeWidth={2.5}
              />
            )}
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {activeTab.label}
            </h2>
          </div>

          <div className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed flex-1">
            {activeTab.content}
          </div>
        </div>
      </div>
    </div>
  );
}
