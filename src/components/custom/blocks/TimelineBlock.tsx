"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import React, { forwardRef, useEffect, useRef, useState } from "react";

// ==========================================
// THEME & CONFIGURATION
// ==========================================
export type TimelineColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});
export type TimelineVariant = "default" | "glass" | "minimal";
export type TimelineLayout = "left" | "center" | "right";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary",
    text: "text-primary",
    border: "border-primary",
    glow: "shadow-[0_0_15px_rgba(var(--primary),0.5)]",
  },
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
  violet: {
    bg: "bg-violet-600",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-500",
    glow: "shadow-[0_0_15px_rgba(139,92,246,0.5)]",
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
        bg: "bg-[var(--timeline-color)]",
        text: "text-[var(--timeline-color)]",
        border: "border-[var(--timeline-color)]",
        glow: "shadow-[0_0_15px_var(--timeline-glow)]",
      },
      style: {
        "--timeline-color": color,
        "--timeline-glow": `rgba(${rgb}, 0.5)`,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

// ==========================================
// INTERFACES
// ==========================================
export type TimelineStatus = "completed" | "current" | "upcoming";

export interface TimelineItemType {
  id: string | number;
  title: string;
  date: string;
  description?: string;
  icon?: React.ElementType;
  content?: React.ReactNode;
  action?: React.ReactNode; // e.g., a button
  status?: TimelineStatus;
}

export interface TimelineBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItemType[];
  color?: TimelineColor;
  variant?: TimelineVariant;
  layout?: TimelineLayout;
  animate?: boolean;
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export const TimelineBlock = forwardRef<HTMLDivElement, TimelineBlockProps>(
  (
    {
      items,
      color = "primary",
      variant = "default",
      layout = "left",
      animate = true,
      className,
      ...props
    },
    ref,
  ) => {
    const { theme, style } = getThemeStyles(color as string);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (animate && containerRef.current) {
        const elements = containerRef.current.querySelectorAll(
          ".timeline-item-anim",
        );
        gsap.fromTo(
          elements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power3.out",
            clearProps: "all",
          },
        );
      }
    }, [animate, items, variant, layout, color]);

    return (
      <div
        ref={ref}
        className={cn("w-full py-4", className)}
        style={style}
        {...props}
      >
        <div
          ref={containerRef}
          className="relative flex flex-col gap-8 sm:gap-12"
        >
          {items.map((item, index) => (
            <TimelineNode
              key={item.id}
              item={item}
              index={index}
              isLast={index === items.length - 1}
              theme={theme}
              variant={variant}
              layout={layout}
            />
          ))}
        </div>
      </div>
    );
  },
);
TimelineBlock.displayName = "TimelineBlock";

// ==========================================
// NODE COMPONENT
// ==========================================
function TimelineNode({
  item,
  index,
  isLast,
  theme,
  variant,
  layout,
}: {
  item: TimelineItemType;
  index: number;
  isLast: boolean;
  theme: Record<string, string>;
  variant: TimelineVariant;
  layout: TimelineLayout;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = item.icon;
  const hasContent = Boolean(item.content);

  const status = item.status || "completed";
  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isUpcoming = status === "upcoming";

  // Center layout magic (only applies on sm+ screens, mobile falls back to left)
  const isEven = index % 2 === 0;
  const isCenter = layout === "center";
  const alignRight = layout === "right" || (isCenter && !isEven);

  const isGlass = variant === "glass";
  const isMinimal = variant === "minimal";

  return (
    <div className="timeline-item-anim relative group w-full flex flex-col sm:flex-row">
      {/* 1. THE VERTICAL LINE (Dynamic positioning based on layout) */}
      {!isLast && (
        <div
          className={cn(
            "absolute w-[2px] transition-colors duration-500",
            // Mobile is always left-aligned
            "left-[19px] sm:left-auto top-10 bottom-[-32px] sm:bottom-[-48px]",
            // Desktop Positioning
            layout === "left" && "sm:left-[19px]",
            layout === "right" && "sm:right-[19px]",
            layout === "center" && "sm:left-1/2 sm:-translate-x-1/2",
            // Colors based on status
            isGlass ? "bg-white/10" : "bg-zinc-200 dark:bg-zinc-800",
            isCompleted && theme.bg, // Fill the line if this node is completed
          )}
        />
      )}

      {/* 2. THE DOT / ICON */}
      <div
        className={cn(
          "absolute z-10 flex items-center justify-center rounded-full transition-all duration-500",
          "w-10 h-10 left-0 sm:left-auto border-2",
          // Desktop Positioning
          layout === "left" && "sm:left-0",
          layout === "right" && "sm:right-0",
          layout === "center" && "sm:left-1/2 sm:-translate-x-1/2",
          // Styling based on status & variant
          isGlass
            ? "bg-black/50 backdrop-blur-md"
            : "bg-white dark:bg-[#09090b]",
          isCompleted || isCurrent
            ? theme.border
            : isGlass
              ? "border-white/20"
              : "border-zinc-200 dark:border-zinc-800",
          isCurrent && theme.glow,
          // Hover effects
          !isUpcoming && "group-hover:scale-110",
        )}
      >
        {Icon ? (
          <Icon
            className={cn(
              "w-4 h-4 transition-colors",
              isCompleted || isCurrent
                ? theme.text
                : "text-zinc-400 dark:text-zinc-600",
            )}
          />
        ) : (
          <div
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              isCompleted || isCurrent
                ? theme.bg
                : "bg-zinc-300 dark:bg-zinc-700",
              isCurrent && "animate-pulse",
            )}
          />
        )}
      </div>

      {/* 3. THE CONTENT CARD */}
      <div
        className={cn(
          "flex flex-col w-full transition-all duration-300",
          // Mobile always has left padding
          "pl-16 sm:pl-0",
          // Desktop Width & Positioning
          layout === "center"
            ? "sm:w-[calc(50%-3rem)]"
            : "sm:w-[calc(100%-4rem)]",
          layout === "left" && "sm:ml-16",
          layout === "right" && "sm:mr-16 sm:text-right",
          isCenter && isEven && "sm:mr-auto sm:pr-0 sm:text-right",
          isCenter && !isEven && "sm:ml-auto sm:pl-0 sm:text-left",
          isUpcoming && "opacity-60 grayscale hover:grayscale-0",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-3 rounded-2xl transition-all duration-300",
            !isMinimal && "p-5 border shadow-sm",
            !isMinimal &&
              !isGlass &&
              "bg-white dark:bg-[#09090b] border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700",
            isGlass &&
              "bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10",
            isMinimal && "p-1 hover:-translate-y-1",
          )}
        >
          {/* Header Row (Title, Date, Expand Button) */}
          <div
            className={cn(
              "flex flex-col sm:flex-row justify-between gap-2 sm:gap-4",
              (layout === "right" || (isCenter && isEven)) &&
                "sm:flex-row-reverse",
              hasContent && "cursor-pointer select-none",
            )}
            onClick={() => hasContent && setIsExpanded(!isExpanded)}
          >
            <div className="flex flex-col gap-1">
              <h3
                className={cn(
                  "text-base font-bold transition-colors",
                  isGlass ? "text-white" : "text-zinc-900 dark:text-zinc-100",
                  "group-hover:text-[var(--timeline-color)]",
                )}
              >
                {item.title}
              </h3>
              {item.description && (
                <p
                  className={cn(
                    "text-sm",
                    isGlass
                      ? "text-zinc-300"
                      : "text-zinc-500 dark:text-zinc-400",
                  )}
                >
                  {item.description}
                </p>
              )}
            </div>

            <div
              className={cn(
                "flex items-center gap-3 shrink-0",
                (layout === "right" || (isCenter && isEven)) &&
                  "sm:flex-row-reverse",
              )}
            >
              <span
                className={cn(
                  "text-xs font-semibold px-2.5 py-1 rounded-md",
                  isCurrent
                    ? theme.bg
                    : isGlass
                      ? "bg-white/10 text-zinc-300"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300",
                  isCurrent && "text-white shadow-sm",
                )}
              >
                {item.date}
              </span>
              {hasContent && (
                <button
                  className={cn(
                    "p-1.5 rounded-full transition-all",
                    isGlass
                      ? "hover:bg-white/10 text-zinc-300"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500",
                  )}
                >
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      isExpanded && "rotate-180",
                    )}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Action Area (e.g. Buttons) */}
          {item.action && (
            <div
              className={cn(
                "mt-2",
                (layout === "right" || (isCenter && isEven)) &&
                  "sm:flex sm:justify-end",
              )}
            >
              {item.action}
            </div>
          )}

          {/* Expandable Content Area (CSS Grid Trick) */}
          {hasContent && (
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out text-left",
                isExpanded
                  ? "grid-rows-[1fr] opacity-100 mt-2 sm:mt-4"
                  : "grid-rows-[0fr] opacity-0 mt-0",
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    "pt-4 border-t",
                    isGlass
                      ? "border-white/10"
                      : "border-zinc-100 dark:border-zinc-800/50",
                  )}
                >
                  {item.content}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
