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
  indigo: {
    bg: "bg-indigo-600",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.5)]",
  },
  rose: {
    bg: "bg-rose-600",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500",
    glow: "shadow-[0_0_15px_rgba(225,29,72,0.5)]",
  },
  emerald: {
    bg: "bg-emerald-600",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]",
  },
  blue: {
    bg: "bg-blue-600",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
  },
  zinc: {
    bg: "bg-zinc-900 dark:bg-zinc-100",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    glow: "shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)]",
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
    const rgb = hexToRgb(color);
    return {
      theme: {
        bg: "bg-[var(--atl-color)]",
        text: "text-[var(--atl-color)]",
        border: "border-[var(--atl-color)]",
        glow: "shadow-[0_0_15px_var(--atl-glow)]",
      },
      style: {
        "--atl-color": color,
        "--atl-glow": `rgba(${rgb}, 0.5)`,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
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

  // Intersection Observer for scroll triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: disconnect if you only want it to animate once
          // observer.disconnect();
        } else {
          // Reset if you want it to re-animate when scrolling back up
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  // Determine slide direction based on layout and index
  let slideDirectionClass = "translate-y-8"; // default fade-up
  if (animation === "slide-in") {
    if (layout === "left") slideDirectionClass = "-translate-x-12";
    else if (layout === "right") slideDirectionClass = "translate-x-12";
    else if (layout === "center")
      slideDirectionClass = isEven ? "-translate-x-12" : "translate-x-12";
  }

  // Map animations to Tailwind classes
  const getAnimationClasses = () => {
    if (!isVisible) {
      return cn(
        "opacity-0",
        animation === "fade-up" && "translate-y-8",
        animation === "slide-in" && slideDirectionClass,
        animation === "zoom-in" && "scale-90",
        animation === "flip-up" && "rotate-x-90",
        animation === "blur-in" && "blur-xl scale-95",
      );
    }
    return cn(
      "opacity-100 translate-y-0 translate-x-0 scale-100 rotate-x-0 blur-0",
      "transition-all duration-700 ease-out",
    );
  };

  return (
    <div
      ref={nodeRef}
      className="relative flex flex-col sm:flex-row w-full group perspective-[1000px]"
    >
      {/* VERTICAL LINE */}
      {!isLast && (
        <div
          className={cn(
            "absolute w-[2px] bg-zinc-200 dark:bg-zinc-800 transition-all duration-1000 origin-top",
            "left-[19px] sm:left-auto top-10 bottom-[-32px] sm:bottom-[-48px]",
            layout === "left" && "sm:left-[19px]",
            layout === "right" && "sm:right-[19px]",
            layout === "center" && "sm:left-1/2 sm:-translate-x-1/2",
            isVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
          )}
        />
      )}

      {/* ICON / DOT */}
      <div
        className={cn(
          "absolute z-10 flex items-center justify-center rounded-full border-2 bg-white dark:bg-[#09090b] transition-all duration-500 delay-300",
          "w-10 h-10 left-0 sm:left-auto",
          layout === "left" && "sm:left-0",
          layout === "right" && "sm:right-0",
          layout === "center" && "sm:left-1/2 sm:-translate-x-1/2",
          isVisible
            ? cn(theme.border, theme.glow, "scale-100 opacity-100")
            : "border-zinc-200 dark:border-zinc-800 scale-50 opacity-0",
        )}
      >
        {Icon ? (
          <Icon
            className={cn(
              "w-4 h-4 transition-colors duration-500 delay-500",
              isVisible ? theme.text : "text-transparent",
            )}
          />
        ) : (
          <div
            className={cn(
              "w-3 h-3 rounded-full transition-colors duration-500 delay-500",
              isVisible ? theme.bg : "bg-transparent",
            )}
          />
        )}
      </div>

      {/* CONTENT CARD */}
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
            <span
              className={cn(
                "text-xs font-semibold px-2.5 py-1 rounded-md shrink-0 w-max bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors duration-500",
                isVisible && theme.text,
              )}
            >
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
      color = "indigo",
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
