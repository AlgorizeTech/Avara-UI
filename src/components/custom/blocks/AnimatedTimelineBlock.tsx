"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useRef, useState } from "react";

// ==========================================
// THEME & CONFIGURATION
// ==========================================
export type TimelineLayout = "left" | "right" | "center";
export type TimelineAnimation =
  | "fade-up"
  | "slide-in"
  | "zoom-in"
  | "flip-up"
  | "blur-in";
export type TimelineColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "blue"
  | "zinc"
  | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-[var(--theme-color,var(--primary))]",
    text: "text-[var(--theme-color,var(--primary))]",
    icon: "text-white",
    dot: "bg-white",
    border: "border-[var(--theme-color,var(--primary))]",
    glow: "shadow-[0_0_15px_color-mix(in_srgb,var(--theme-color,var(--primary))_50%,transparent)]",
  },
  indigo: {
    bg: "bg-indigo-600",
    text: "text-indigo-600 dark:text-indigo-400",
    icon: "text-white",
    dot: "bg-white",
    border: "border-indigo-500",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.5)]",
  },
  rose: {
    bg: "bg-rose-600",
    text: "text-rose-600 dark:text-rose-400",
    icon: "text-white",
    dot: "bg-white",
    border: "border-rose-500",
    glow: "shadow-[0_0_15px_rgba(225,29,72,0.5)]",
  },
  emerald: {
    bg: "bg-emerald-600",
    text: "text-emerald-600 dark:text-emerald-400",
    icon: "text-white",
    dot: "bg-white",
    border: "border-emerald-500",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]",
  },
  blue: {
    bg: "bg-blue-600",
    text: "text-blue-600 dark:text-blue-400",
    icon: "text-white",
    dot: "bg-white",
    border: "border-blue-500",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
  },
  zinc: {
    bg: "bg-zinc-900 dark:bg-zinc-100",
    text: "text-zinc-900 dark:text-zinc-100",
    icon: "text-white dark:text-zinc-900",
    dot: "bg-white dark:bg-zinc-900",
    border: "border-zinc-900 dark:border-zinc-100",
    glow: "shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)]",
  },
  white: {
    bg: "bg-white dark:bg-zinc-100",
    text: "text-zinc-900 dark:text-zinc-900",
    icon: "text-zinc-900 dark:text-zinc-900",
    dot: "bg-zinc-900 dark:bg-zinc-900",
    border: "border-zinc-300 dark:border-zinc-400",
    glow: "shadow-[0_0_15px_rgba(0,0,0,0.15)]",
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
    const rgbStr = hexToRgb(color);
    const [r, g, b] = rgbStr.split(",").map((x) => parseInt(x.trim(), 10));
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const isLight = luminance > 0.6;

    return {
      theme: {
        bg: "bg-[var(--atl-color)]",
        text: "text-[var(--atl-color)]",
        icon: isLight ? "text-zinc-900" : "text-white",
        dot: isLight ? "bg-zinc-900" : "bg-white",
        border: "border-[var(--atl-color)]",
        glow: "shadow-[0_0_15px_var(--atl-glow)]",
      },
      style: {
        "--atl-color": color,
        "--atl-glow": `rgba(${rgbStr}, 0.5)`,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

// ==========================================
// INTERFACES
// ==========================================
export interface AnimatedTimelineItem {
  id: string | number;
  title: string;
  date: string;
  description?: string;
  icon?: React.ElementType;
}

export interface AnimatedTimelineProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: AnimatedTimelineItem[];
  layout?: TimelineLayout;
  animation?: TimelineAnimation;
  color?: TimelineColor;
}

// ==========================================
// NODE COMPONENT (Scroll-aware)
// ==========================================
function AnimatedTimelineNode({
  item,
  index,
  isLast,
  theme,
  layout,
  animation,
}: {
  item: AnimatedTimelineItem;
  index: number;
  isLast: boolean;
  theme: Record<string, string>;
  layout: TimelineLayout;
  animation: TimelineAnimation;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const Icon = item.icon;
  const isEven = index % 2 === 0;
  const isCenter = layout === "center";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else setIsVisible(false);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  let slideDir = "translate-y-8";

  const getAnimationClasses = () => {
    if (!isVisible) return "opacity-0 " + slideDir;
    return "opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0 blur-0";
  };

  return (
    <div
      ref={nodeRef}
      className={cn(
        "relative flex items-center w-full my-6 group",
        layout === "left" && "justify-start",
        layout === "right" && "justify-start sm:justify-end",
        isCenter && "justify-start sm:justify-center",
      )}
    >
      {/* Line connecting nodes */}
      {!isLast && (
        <div
          className={cn(
            "absolute top-8 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800 left-4 sm:left-4",
            layout === "left" && "sm:left-4",
            layout === "right" && "sm:left-auto sm:right-4",
            isCenter && "sm:left-1/2 sm:-translate-x-1/2",
          )}
        />
      )}

      {/* Node Dot / Icon Container */}
      <div
        className={cn(
          "absolute z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-500 left-0 sm:left-0 bg-white dark:bg-[#09090b]",
          layout === "left" && "sm:left-0",
          layout === "right" && "sm:left-auto sm:right-0",
          isCenter && "sm:left-1/2 sm:-translate-x-1/2",
          theme.border,
          theme.glow,
        )}
      >
        {Icon ? (
          <Icon className={cn("w-4 h-4 transition-colors duration-300", theme.text)} />
        ) : (
          <div className={cn("w-2 h-2 rounded-full", theme.bg)} />
        )}
      </div>

      {/* Content Card */}
      <div
        className={cn(
          "flex flex-col w-full pl-16 sm:pl-0",
          layout === "center"
            ? "sm:w-[calc(50%-3rem)]"
            : "sm:w-[calc(100%-4rem)]",
          layout === "left" && "sm:ml-16",
          layout === "right" && "sm:mr-16 sm:text-right",
          isCenter && isEven && "sm:mr-auto sm:pr-0 sm:text-right",
          isCenter && !isEven && "sm:ml-auto sm:pl-0 sm:text-left",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-2 p-5 rounded-2xl bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700",
            getAnimationClasses(),
          )}
          style={{ transitionDelay: "100ms" }}
        >
          <div
            className={cn(
              "flex flex-col sm:flex-row justify-between gap-2 sm:gap-4",
              (layout === "right" || (isCenter && isEven)) &&
                "sm:flex-row-reverse",
            )}
          >
            <h3
              className={cn(
                "text-base font-bold text-zinc-900 dark:text-zinc-100 transition-colors",
                `group-hover:${theme.text}`,
              )}
            >
              {item.title}
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 w-max shrink-0">
              {item.date}
            </span>
          </div>
          {item.description && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export const AnimatedTimelineBlock = forwardRef<
  HTMLDivElement,
  AnimatedTimelineProps
>(
  (
    {
      items,
      layout = "left",
      animation = "fade-up",
      color = "primary",
      className,
      ...props
    },
    ref,
  ) => {
    const { theme, style } = getThemeStyles(color as string);

    return (
      <div
        ref={ref}
        className={cn("w-full py-4", className)}
        style={style}
        {...props}
      >
        <div className="relative flex flex-col gap-8 sm:gap-12">
          {items.map((item, index) => (
            <AnimatedTimelineNode
              key={item.id}
              item={item}
              index={index}
              isLast={index === items.length - 1}
              theme={theme}
              layout={layout}
              animation={animation}
            />
          ))}
        </div>
      </div>
    );
  },
);
AnimatedTimelineBlock.displayName = "AnimatedTimelineBlock";
