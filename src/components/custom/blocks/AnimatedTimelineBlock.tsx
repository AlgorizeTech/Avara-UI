"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { getThemeStyles } from "./animated-timeline-theme";

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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  let slideDir = "translate-y-8";
  if (animation === "slide-in") {
    if (layout === "left") slideDir = "-translate-x-12";
    else if (layout === "right") slideDir = "translate-x-12 sm:translate-x-12";
    else if (layout === "center") slideDir = isEven ? "-translate-x-12" : "translate-x-12";
  }

  const getAnimationClasses = () => {
    if (!isVisible) {
      return cn(
        "opacity-0 transition-all duration-700 ease-out",
        animation === "fade-up" && "translate-y-8",
        animation === "slide-in" && slideDir,
        animation === "zoom-in" && "scale-90",
        animation === "flip-up" && "[transform:rotateX(90deg)]",
        animation === "blur-in" && "blur-md scale-95",
      );
    }
    return cn(
      "opacity-100 translate-y-0 translate-x-0 scale-100 [transform:rotateX(0deg)] blur-0",
      "transition-all duration-700 ease-out",
    );
  };

  return (
    <div
      ref={nodeRef}
      className="relative flex flex-col sm:flex-row w-full group [perspective:1000px]"
    >
      {/* Line connecting nodes */}
      {!isLast && (
        <div
          className={cn(
            "absolute w-[2px] bg-muted transition-all duration-1000 origin-top",
            "left-[19px] sm:left-auto top-10 bottom-[-32px] sm:bottom-[-48px]",
            layout === "left" && "sm:left-[19px]",
            layout === "right" && "sm:right-[19px]",
            layout === "center" && "sm:left-1/2 sm:-translate-x-1/2",
            isVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
          )}
        />
      )}

      {/* Node Dot / Icon Container */}
      <div
        className={cn(
          "absolute z-10 flex items-center justify-center rounded-full border-2 bg-white dark:bg-[#09090b] transition-all duration-500 delay-200",
          "w-10 h-10 left-0 sm:left-auto",
          layout === "left" && "sm:left-0",
          layout === "right" && "sm:right-0",
          layout === "center" && "sm:left-1/2 sm:-translate-x-1/2",
          isVisible
            ? cn(theme.border, theme.glow, "scale-100 opacity-100")
            : "border-border scale-50 opacity-0",
        )}
      >
        {Icon ? (
          <Icon
            className={cn(
              "w-4 h-4 transition-colors duration-500 delay-300",
              isVisible ? theme.text : "text-zinc-400 dark:text-zinc-600",
            )}
          />
        ) : (
          <div
            className={cn(
              "w-3 h-3 rounded-full transition-colors duration-500 delay-300",
              isVisible ? theme.bg : "bg-muted",
            )}
          />
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
            "flex flex-col gap-2 p-5 rounded-2xl bg-white dark:bg-[#09090b] border border-border shadow-sm hover:border-border",
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
                "text-base font-semibold text-foreground transition-colors",
                "group-hover:text-[var(--atl-color)]",
              )}
            >
              {item.title}
            </h3>
            <span
              className={cn(
                "text-xs font-semibold px-2.5 py-1 rounded-md shrink-0 w-max bg-muted text-muted-foreground transition-colors duration-500",
                isVisible && theme.text,
              )}
            >
              {item.date}
            </span>
          </div>
          {item.description && (
            <p className="text-sm text-muted-foreground">
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
