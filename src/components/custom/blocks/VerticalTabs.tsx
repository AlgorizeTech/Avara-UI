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
/** Which way the tab rail runs — beside the content, or above it. */
export type TabsOrientation = "vertical" | "horizontal";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary text-primary-foreground",
    text: "text-primary",
    border: "border-primary",
    dot: "bg-primary-foreground",
  },
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

// WCAG relative luminance. The active tab paints its label directly on the
// accent, so a light custom hex needs dark text — hardcoding white made the
// label vanish on anything pale.
const relLuminance = (rgb: string) => {
  const [r, g, b] = rgb.split(",").map((n) => {
    const v = Number(n.trim()) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        bg: "bg-[var(--theme-color)] text-[var(--theme-on-color)]",
        text: "text-[var(--theme-color)]",
        border: "border-[var(--theme-color)]",
        dot: "bg-[var(--theme-on-color)]",
      },
      style: {
        "--theme-color": color,
        "--theme-on-color": relLuminance(rgb) > 0.45 ? "#09090b" : "#ffffff",
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
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
  orientation?: TabsOrientation;
  defaultActiveId?: string;
  className?: string;
}

export function VerticalTabs({
  tabs,
  color = "primary",
  variant = "default",
  orientation = "vertical",
  defaultActiveId,
  className,
}: VerticalTabsProps) {
  const [activeId, setActiveId] = useState<string>(
    defaultActiveId || tabs[0]?.id || "",
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const { theme, style } = getThemeStyles(color);
  const isHorizontal = orientation === "horizontal";

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
          "bg-muted dark:bg-[#121212] rounded-2xl p-3 border border-border shadow-sm",
        contentBox:
          "bg-muted dark:bg-[#121212] rounded-2xl p-8 md:p-10 border border-border shadow-sm",
        activeTab: cn("shadow-md", theme.bg),
        inactiveTab:
          "hover:bg-muted text-muted-foreground",
      },
      glass: {
        container: "gap-6",
        menuBox:
          "bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-3 border border-white/40 dark:border-white/10 shadow-xl",
        contentBox:
          "bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-6 md:p-10 border border-white/40 dark:border-white/10 shadow-xl",
        activeTab: cn("shadow-lg backdrop-blur-md", theme.bg),
        inactiveTab:
          "hover:bg-white/40 dark:hover:bg-white/10 text-foreground",
      },
      minimal: {
        container: "gap-8",
        menuBox: "bg-transparent p-0 border-none",
        contentBox: "bg-transparent p-0 border-none",
        activeTab: cn("rounded-xl", theme.bg),
        inactiveTab:
          "hover:bg-muted rounded-xl text-muted-foreground",
      },
      bordered: {
        container:
          "gap-0 rounded-2xl border border-border overflow-hidden bg-white dark:bg-[#09090b] shadow-sm",
        // The divider follows the rail: it separates rail from pane, so it sits
        // on the bottom edge when the rail runs across the top.
        menuBox: cn(
          "bg-muted dark:bg-[#121212] p-4 border-border rounded-none",
          isHorizontal ? "border-b" : "border-r",
        ),
        contentBox: "p-8 md:p-10 bg-transparent rounded-none border-none",
        activeTab: cn("rounded-xl shadow-sm", theme.bg),
        inactiveTab:
          "hover:bg-muted/50 text-muted-foreground rounded-xl",
      },
    })[variant];

  const styles = getVariantStyles();

  return (
    <div
      className={cn(
        "w-full flex",
        // Vertical only splits into two columns once there is room for both;
        // horizontal is always stacked, rail over pane.
        isHorizontal ? "flex-col" : "flex-col md:flex-row",
        styles.container,
        className,
      )}
      style={style}
    >
      {/* Tab Rail */}
      <div
        className={cn(
          "w-full shrink-0 flex gap-1.5",
          isHorizontal
            ? // Tabs keep their natural width and scroll sideways rather than
              // squashing, so a long set stays readable. Scrollbar hidden
              // inline so the block stays copy-paste standalone.
              "flex-row overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "md:w-64 lg:w-72 flex-col",
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
                "flex items-center px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98]",
                isHorizontal
                  ? "shrink-0 justify-center gap-3"
                  : // Full width so the dot can sit against the far edge.
                    "w-full justify-between",
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

              {/* The Dot Indicator. Vertical only — it earns its place pinned
                  to the far edge of a full-width row, but trailing a pill in
                  the horizontal bar it just reads as a stray bullet, and the
                  filled pill already says which tab is active. */}
              {!isHorizontal && (
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    isActive ? theme.dot : "bg-muted",
                  )}
                />
              )}
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
                className="w-7 h-7 text-foreground opacity-80"
                strokeWidth={2.5}
              />
            )}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              {activeTab.label}
            </h2>
          </div>

          <div className="text-muted-foreground text-lg leading-relaxed flex-1">
            {activeTab.content}
          </div>
        </div>
      </div>
    </div>
  );
}
