"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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
export type TabsVariant =
  | "default"
  | "glass"
  | "minimal"
  | "bordered"
  | "underline"
  | "segmented"
  | "soft"
  | "elevated";
/** Which way the tab rail runs — above the content, or beside it. */
export type TabsOrientation = "horizontal" | "vertical";

/**
 * The accent is the only colour this block invents, so every role it plays is
 * derived from that one value rather than reached for separately:
 *   bg     — solid accent, label painted on top of it
 *   soft   — accent tinted back to a wash, label kept in the accent
 *   bar    — the accent alone, for the travelling underline
 *   ring   — accent hairline for raised surfaces
 *   shadow — accent-tinted elevation; a grey drop shadow under a coloured
 *            pill is the giveaway that the depth was never designed
 *   focus  — the keyboard focus outline, so focus reads as part of the theme
 *   hoverBorder — accent-tinted hairline for reachable-but-unselected cards
 */
const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary text-primary-foreground",
    text: "text-primary",
    border: "border-primary",
    dot: "bg-primary-foreground",
    soft: "bg-primary/10 text-primary dark:bg-primary/20",
    bar: "bg-primary",
    ring: "ring-primary/25",
    shadow: "shadow-lg shadow-primary/25",
    focus: "focus-visible:outline-primary",
    hoverBorder: "hover:border-primary/40",
  },
  indigo: {
    bg: "bg-indigo-600 text-white",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-600",
    dot: "bg-white",
    soft: "bg-indigo-600/10 text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-300",
    bar: "bg-indigo-600 dark:bg-indigo-400",
    ring: "ring-indigo-600/25 dark:ring-indigo-400/25",
    shadow: "shadow-lg shadow-indigo-600/30",
    focus: "focus-visible:outline-indigo-500",
    hoverBorder: "hover:border-indigo-600/40 dark:hover:border-indigo-400/40",
  },
  rose: {
    bg: "bg-rose-600 text-white",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-600",
    dot: "bg-white",
    soft: "bg-rose-600/10 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300",
    bar: "bg-rose-600 dark:bg-rose-400",
    ring: "ring-rose-600/25 dark:ring-rose-400/25",
    shadow: "shadow-lg shadow-rose-600/30",
    focus: "focus-visible:outline-rose-500",
    hoverBorder: "hover:border-rose-600/40 dark:hover:border-rose-400/40",
  },
  emerald: {
    bg: "bg-emerald-600 text-white",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-600",
    dot: "bg-white",
    soft: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
    bar: "bg-emerald-600 dark:bg-emerald-400",
    ring: "ring-emerald-600/25 dark:ring-emerald-400/25",
    shadow: "shadow-lg shadow-emerald-600/30",
    focus: "focus-visible:outline-emerald-500",
    hoverBorder: "hover:border-emerald-600/40 dark:hover:border-emerald-400/40",
  },
  purple: {
    bg: "bg-[#8B5CF6] text-white",
    text: "text-[#8B5CF6] dark:text-[#A78BFA]",
    border: "border-[#8B5CF6]",
    dot: "bg-white",
    soft: "bg-[#8B5CF6]/10 text-[#7C3AED] dark:bg-[#A78BFA]/15 dark:text-[#A78BFA]",
    bar: "bg-[#8B5CF6] dark:bg-[#A78BFA]",
    ring: "ring-[#8B5CF6]/25",
    shadow: "shadow-lg shadow-[#8B5CF6]/30",
    focus: "focus-visible:outline-[#8B5CF6]",
    hoverBorder: "hover:border-[#8B5CF6]/40 dark:hover:border-[#A78BFA]/40",
  },
  zinc: {
    bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    dot: "bg-white dark:bg-zinc-900",
    soft: "bg-zinc-900/10 text-zinc-900 dark:bg-zinc-100/15 dark:text-zinc-100",
    bar: "bg-zinc-900 dark:bg-zinc-100",
    ring: "ring-zinc-900/20 dark:ring-zinc-100/20",
    shadow: "shadow-lg shadow-zinc-900/20 dark:shadow-black/50",
    focus: "focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-100",
    hoverBorder: "hover:border-zinc-900/40 dark:hover:border-zinc-100/40",
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
        // The soft roles blend the accent into whatever sits behind it, so one
        // hex reads correctly on both the light and the dark canvas.
        soft: "bg-[rgba(var(--theme-color-rgb),0.14)] text-[var(--theme-color)]",
        bar: "bg-[var(--theme-color)]",
        ring: "ring-[rgba(var(--theme-color-rgb),0.28)]",
        shadow:
          "shadow-[0_10px_24px_-8px_rgba(var(--theme-color-rgb),0.55)]",
        focus: "focus-visible:outline-[var(--theme-color)]",
        hoverBorder:
          "hover:border-[rgba(var(--theme-color-rgb),0.45)]",
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

/** Layout reads must land before paint, but useLayoutEffect warns on the server. */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Box of the active tab inside the rail, in the rail's own coordinates. */
type Rect = { x: number; y: number; w: number; h: number };

export function VerticalTabs({
  tabs,
  color = "primary",
  variant = "default",
  orientation = "horizontal",
  defaultActiveId,
  className,
}: VerticalTabsProps) {
  const [activeId, setActiveId] = useState<string>(
    defaultActiveId || tabs[0]?.id || "",
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const baseId = useId();

  const { theme, style } = getThemeStyles(color);
  const isHorizontal = orientation === "horizontal";

  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === activeId),
  );
  const activeTab = tabs[activeIndex] || tabs[0];

  const tabId = (id: string) => `${baseId}-tab-${id}`;
  const panelId = (id: string) => `${baseId}-panel-${id}`;

  const getVariantStyles = () =>
    ({
      default: {
        container: "gap-6",
        menuBox:
          "bg-muted dark:bg-[#121212] rounded-2xl p-3 border border-border shadow-sm",
        contentBox:
          "bg-muted dark:bg-[#121212] rounded-2xl p-8 md:p-10 border border-border shadow-sm",
        activeTab: cn(theme.bg, theme.shadow),
        inactiveTab: "hover:bg-muted text-muted-foreground",
        tabExtra: "",
        indicator: "",
        indicatorMode: null as null | "fill" | "bar",
      },
      glass: {
        container: "gap-6",
        menuBox:
          "bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-3 border border-white/40 dark:border-white/10 shadow-xl",
        contentBox:
          "bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-6 md:p-10 border border-white/40 dark:border-white/10 shadow-xl",
        activeTab: cn("backdrop-blur-md", theme.bg, theme.shadow),
        inactiveTab: "hover:bg-white/40 dark:hover:bg-white/10 text-foreground",
        tabExtra: "",
        indicator: "",
        indicatorMode: null as null | "fill" | "bar",
      },
      minimal: {
        container: "gap-8",
        menuBox: "bg-transparent p-0 border-none",
        contentBox: "bg-transparent p-0 border-none",
        activeTab: cn("rounded-xl", theme.bg, theme.shadow),
        inactiveTab: "hover:bg-muted rounded-xl text-muted-foreground",
        tabExtra: "",
        indicator: "",
        indicatorMode: null as null | "fill" | "bar",
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
        // No shadow here on purpose. This is the contained, quiet variant —
        // the pill already sits inside a card, and depth on depth reads busy.
        activeTab: cn("rounded-xl", theme.bg),
        inactiveTab: "hover:bg-muted/50 text-muted-foreground rounded-xl",
        tabExtra: "",
        indicator: "",
        indicatorMode: null as null | "fill" | "bar",
      },
      // The classic browser-and-editor tab set. Nothing is filled in; a single
      // bar travels between tabs, which is the whole identity of the variant.
      underline: {
        container: "gap-0",
        menuBox: cn(
          "bg-transparent p-0 rounded-none border-border gap-0",
          isHorizontal ? "border-b" : "md:w-60 lg:w-64",
        ),
        contentBox: cn(
          "bg-transparent rounded-none border-none px-0",
          isHorizontal ? "pt-8" : "pt-6 md:pt-1 md:pl-10",
        ),
        activeTab: cn("bg-transparent rounded-none", theme.text),
        inactiveTab:
          "bg-transparent rounded-none text-muted-foreground hover:text-foreground",
        tabExtra: "",
        indicator: cn("rounded-full", theme.bar),
        indicatorMode: "bar" as null | "fill" | "bar",
      },
      // iOS-style segmented control: one recessed track with a single raised
      // surface sliding between segments. Its radius is the track's radius
      // minus the track's padding (16px − 6px), so the two curves stay
      // concentric instead of merely both being round.
      segmented: {
        container: "gap-6",
        menuBox:
          "bg-muted dark:bg-[#151515] rounded-2xl p-1.5 border border-border gap-1",
        contentBox: "bg-transparent rounded-2xl p-6 md:p-8 border border-border",
        activeTab: cn("bg-transparent", theme.text),
        inactiveTab:
          "bg-transparent text-muted-foreground hover:text-foreground",
        tabExtra: isHorizontal ? "grow" : "",
        indicator: cn(
          "rounded-[10px] bg-white dark:bg-zinc-800 shadow-sm ring-1",
          theme.ring,
        ),
        indicatorMode: "fill" as null | "fill" | "bar",
      },
      // The quietest way to say "selected": the accent tinted back to a wash,
      // with the label kept in the accent rather than painted over it.
      soft: {
        container: "gap-6",
        menuBox: "bg-transparent p-0 border-none gap-2",
        contentBox:
          "bg-muted/40 dark:bg-white/[0.03] rounded-3xl p-6 md:p-10 border border-border/60",
        activeTab: cn("rounded-full", theme.soft),
        inactiveTab:
          "rounded-full text-muted-foreground hover:bg-muted hover:text-foreground",
        tabExtra: "",
        indicator: "",
        indicatorMode: null as null | "fill" | "bar",
      },
      // Every tab is its own card, so the selection cannot be one travelling
      // shape — the active card takes the accent where it stands. Hovering an
      // inactive card tints its border toward the accent rather than floating
      // it, which says "reachable" without making the whole rail bob.
      elevated: {
        container: "gap-6",
        menuBox: "bg-transparent p-0 border-none gap-2.5",
        contentBox:
          "bg-white dark:bg-[#0d0d0d] rounded-2xl p-8 md:p-10 border border-border shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]",
        activeTab: cn(
          "rounded-2xl border border-transparent",
          theme.bg,
          theme.shadow,
        ),
        inactiveTab: cn(
          "rounded-2xl border border-border bg-white dark:bg-[#0d0d0d] text-muted-foreground shadow-sm hover:text-foreground",
          theme.hoverBorder,
        ),
        tabExtra: "",
        indicator: "",
        indicatorMode: null as null | "fill" | "bar",
      },
    })[variant];

  const styles = getVariantStyles();
  const indicatorMode = styles.indicatorMode;

  // ---- The travelling indicator -------------------------------------------
  // Measured rather than animated per-button, so the shape moves between tabs
  // instead of one fading out while another fades in. Until the first measure
  // lands there is simply no indicator: both variants that use one keep their
  // active label in the accent colour, so the selection is never invisible.
  const [rect, setRect] = useState<Rect | null>(null);

  const measure = () => {
    if (!indicatorMode) return;
    const el = tabRefs.current[activeId];
    if (!el || !railRef.current) return;
    setRect({
      x: el.offsetLeft,
      y: el.offsetTop,
      w: el.offsetWidth,
      h: el.offsetHeight,
    });
  };

  useIsoLayoutEffect(() => {
    measure();
  }, [activeId, indicatorMode, orientation, variant, tabs.length]);

  useEffect(() => {
    if (!indicatorMode || !railRef.current) return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(railRef.current);
    for (const el of Object.values(tabRefs.current)) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [activeId, indicatorMode, orientation, variant]);

  // Geometry per mode: the bar rides the edge facing the content pane, the
  // fill matches the tab it belongs to.
  const geometry = (r: Rect) => {
    if (indicatorMode === "bar") {
      return isHorizontal
        ? { left: r.x + 12, top: r.y + r.h - 3, width: r.w - 24, height: 3 }
        : { left: r.x, top: r.y + 6, width: 3, height: r.h - 12 };
    }
    return { left: r.x, top: r.y, width: r.w, height: r.h };
  };

  const placed = useRef(false);
  useIsoLayoutEffect(() => {
    const el = indicatorRef.current;
    if (!el || !rect) return;
    const target = geometry(rect);
    // The first placement is not a movement, so it is not animated — nothing
    // in this block moves on load, only in answer to a click or a keypress.
    if (!placed.current || prefersReducedMotion()) {
      gsap.set(el, { ...target, opacity: 1 });
      placed.current = true;
      return;
    }
    gsap.to(el, { ...target, duration: 0.34, ease: "power3.out" });
  }, [rect, isHorizontal, indicatorMode]);

  // ---- The panel transition ------------------------------------------------
  // Enters from the side you moved toward, so the animation reports the move
  // rather than decorating it.
  const prevIndex = useRef(activeIndex);
  const mounted = useRef(false);
  useEffect(() => {
    const el = contentRef.current;
    const direction = Math.sign(activeIndex - prevIndex.current) || 1;
    prevIndex.current = activeIndex;
    if (!el) return;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (prefersReducedMotion()) {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      return;
    }
    const from = isHorizontal
      ? { x: direction * 18, y: 0 }
      : { x: 0, y: direction * 14 };
    gsap.fromTo(
      el,
      { opacity: 0, ...from },
      { opacity: 1, x: 0, y: 0, duration: 0.34, ease: "power3.out" },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  // ---- Keyboard ------------------------------------------------------------
  // Arrow keys along the rail's own axis, Home/End to the ends. Selection
  // follows focus, which is the expected behaviour when every panel is
  // already rendered and switching costs nothing.
  const onKeyDown = (event: React.KeyboardEvent) => {
    const [next, previous] = isHorizontal
      ? ["ArrowRight", "ArrowLeft"]
      : ["ArrowDown", "ArrowUp"];
    let index = -1;
    if (event.key === next) index = (activeIndex + 1) % tabs.length;
    else if (event.key === previous)
      index = (activeIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") index = 0;
    else if (event.key === "End") index = tabs.length - 1;
    if (index < 0) return;
    event.preventDefault();
    setActiveId(tabs[index].id);
    tabRefs.current[tabs[index].id]?.focus();
  };

  if (!tabs || tabs.length === 0) return null;

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
        ref={railRef}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={onKeyDown}
        className={cn(
          // `relative` makes the rail the offset parent the indicator is
          // measured against, and keeps it scrolling with the tabs.
          "relative w-full shrink-0 flex gap-1.5",
          isHorizontal
            ? // Tabs keep their natural width and scroll sideways rather than
              // squashing, so a long set stays readable. Scrollbar hidden
              // inline so the block stays copy-paste standalone.
              //
              // The scroll is declared as an arbitrary property rather than
              // the `overflow-x-auto` utility on purpose: docs sites (this one
              // included) routinely style `.overflow-x-auto` globally as the
              // markdown table wrapper — `display: block !important` — which
              // silently collapses this flex row into a stack.
              "flex-row [overflow-x:auto] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "md:w-64 lg:w-72 flex-col",
          styles.menuBox,
        )}
      >
        {indicatorMode && rect && (
          <span
            aria-hidden
            ref={indicatorRef}
            className={cn(
              "absolute left-0 top-0 opacity-0 pointer-events-none",
              styles.indicator,
            )}
          />
        )}

        {tabs.map((tab) => {
          const isActive = activeId === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              id={tabId(tab.id)}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={panelId(tab.id)}
              tabIndex={isActive ? 0 : -1}
              ref={(node) => {
                tabRefs.current[tab.id] = node;
              }}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "relative flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm transition-all duration-200 cursor-pointer active:scale-[0.98]",
                // Weight carries the state alongside colour, so the active tab
                // still reads as active to anyone who cannot separate the two.
                isActive ? "font-semibold" : "font-medium",
                "focus-visible:outline-2 focus-visible:outline-offset-2",
                theme.focus,
                isHorizontal
                  ? "shrink-0 justify-center"
                  : "w-full justify-start",
                isActive ? styles.activeTab : styles.inactiveTab,
                styles.tabExtra,
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0",
                    isActive ? "opacity-100" : "opacity-70",
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              )}
              <span className="text-base tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div
        role="tabpanel"
        id={panelId(activeTab.id)}
        aria-labelledby={tabId(activeTab.id)}
        tabIndex={0}
        className={cn(
          "flex-1 overflow-hidden min-h-[300px]",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          theme.focus,
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
