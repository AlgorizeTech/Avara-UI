"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, CheckCircle2, Layers } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ==========================================
// TYPES & INTERFACES
// ==========================================
export interface ScrollStackItem {
  id: string;
  stepNumber: string; // e.g., "01", "02"
  title: string;
  description: string;
  tags?: string[];
  cardContent: React.ReactNode;
  color?: string; // Optional accent surface classes
}

export interface SplitScrollStackProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: ScrollStackItem[];
  stickySide?: "left" | "right"; // Swaps sticky card deck vs scrolling text
  cardDepthScale?: number; // Shrink rate of stacked background cards (default: 0.05)
  cardOffset?: number; // Vertical pixel distance between stacked cards (default: 16)
  color?: string; // Global active theme color (default: #FFAB1D)
  scroller?: string | Element | null; // Optional direct element scroller target
  scrollerRef?: React.RefObject<HTMLElement | null>; // CRITICAL: Ref object for React containers
  onActiveIndexChange?: (index: number) => void;
}

// ==========================================
// GSAP SPLIT-SCROLLSTACK ENGINE
// ==========================================
export const SplitScrollStack = React.forwardRef<
  HTMLDivElement,
  SplitScrollStackProps
>(
  (
    {
      items,
      stickySide = "right",
      cardDepthScale = 0.05,
      cardOffset = 16,
      color = "#FFAB1D",
      scroller,
      scrollerRef,
      className,
      onActiveIndexChange,
      ...props
    },
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const isHex = color.startsWith("#");

    // Keep callback fresh without triggering useEffect re-runs
    const onActiveIndexChangeRef = useRef(onActiveIndexChange);
    useEffect(() => {
      onActiveIndexChangeRef.current = onActiveIndexChange;
    }, [onActiveIndexChange]);

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
    );

    // GSAP ScrollTrigger Integration
    useEffect(() => {
      if (!containerRef.current) return;

      // CRITICAL FIX: Resolve scroller target AFTER mount guaranteed by useEffect
      const targetScroller = scrollerRef?.current || scroller || window;
      const triggers: ScrollTrigger[] = [];

      sectionRefs.current.forEach((section, idx) => {
        if (!section) return;

        const trigger = ScrollTrigger.create({
          trigger: section,
          scroller: targetScroller,
          start: "top 40%",
          end: "bottom 60%",
          // onToggle with isActive prevents skipping/dead zones on fast scrolling
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(idx);
              onActiveIndexChangeRef.current?.(idx);
            }
          },
        });

        triggers.push(trigger);
      });

      // Refresh triggers after layout calculation
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => {
        clearTimeout(timer);
        triggers.forEach((t) => t.kill());
      };
    }, [scroller, scrollerRef, items.length]);

    // GSAP Card Stacking & Depth Animation
    useEffect(() => {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;

        if (idx < activeIndex) {
          // ── Stacked Behind in the Deck ──
          const depth = activeIndex - idx;
          gsap.to(card, {
            y: -depth * cardOffset,
            scale: 1 - depth * cardDepthScale,
            opacity: Math.max(0.2, 1 - depth * 0.25),
            zIndex: idx,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else if (idx === activeIndex) {
          // ── Active Card at Front of Deck ──
          gsap.to(card, {
            y: 0,
            scale: 1,
            opacity: 1,
            zIndex: items.length + 10,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else {
          // ── Upcoming Cards Hidden Below Viewport ──
          gsap.to(card, {
            y: 140,
            scale: 0.95,
            opacity: 0,
            zIndex: idx,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    }, [activeIndex, cardDepthScale, cardOffset, items.length]);

    return (
      <div
        ref={containerRef}
        className={cn(
          "grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 w-full relative",
          className,
        )}
        {...props}
      >
        {/* ========================================== */}
        {/* COLUMN A: SCROLLING NARRATIVE SECTIONS     */}
        {/* ========================================== */}
        <div
          className={cn(
            "col-span-1 md:col-span-6 lg:col-span-7 flex flex-col gap-12 sm:gap-24 relative z-10 py-6 sm:py-12",
            stickySide === "left" ? "md:order-2" : "md:order-1",
          )}
        >
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            const isPassed = activeIndex > index;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className={cn(
                  "group relative rounded-3xl p-6 sm:p-10 border transition-all duration-500 min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center",
                  isActive
                    ? "bg-white dark:bg-zinc-900 shadow-2xl border-transparent scale-[1.01]"
                    : "bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200/80 dark:border-zinc-800/60 opacity-60 hover:opacity-90",
                )}
                style={{
                  borderColor: isActive ? color : undefined,
                }}
              >
                {/* Active Side Glowing Bar */}
                {isActive && (
                  <div
                    className="absolute top-6 bottom-6 left-0 w-1.5 rounded-r-full transition-colors duration-300"
                    style={{ backgroundColor: color }}
                  />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {/* Step Badge */}
                    <span
                      className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-sm border transition-all duration-300 shadow-sm",
                        isActive
                          ? "text-white border-transparent scale-110"
                          : isPassed
                            ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-transparent"
                            : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700",
                      )}
                      style={{
                        backgroundColor: isActive ? color : undefined,
                      }}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        item.stepNumber
                      )}
                    </span>

                    <h3
                      className={cn(
                        "text-2xl sm:text-3xl font-black tracking-tight transition-colors duration-300",
                        isActive
                          ? "text-zinc-900 dark:text-white"
                          : "text-zinc-500 dark:text-zinc-400",
                      )}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Scroll Indicator Icon */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0",
                      isActive
                        ? "opacity-100 scale-100 shadow-sm"
                        : "opacity-0 scale-75",
                    )}
                    style={{
                      backgroundColor: isActive ? (color.startsWith('#') ? `${color}15` : `color-mix(in srgb, ${color} 15%, transparent)`) : "transparent",
                      color: isActive ? color : "currentColor",
                    }}
                  >
                    <ArrowDownRight className="w-5 h-5 animate-bounce" />
                  </div>
                </div>

                {/* Description */}
                <p
                  className={cn(
                    "mt-6 text-base sm:text-lg leading-relaxed transition-colors duration-300 pl-0 sm:pl-[58px]",
                    isActive
                      ? "text-zinc-600 dark:text-zinc-300"
                      : "text-zinc-400 dark:text-zinc-500",
                  )}
                >
                  {item.description}
                </p>

                {/* Feature Tags Array */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 mt-8 pl-0 sm:pl-[58px]">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={cn(
                          "px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-300",
                          isActive
                            ? "border-transparent shadow-xs font-extrabold"
                            : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600",
                        )}
                        style={{
                          backgroundColor: isActive ? (color.startsWith('#') ? `${color}15` : `color-mix(in srgb, ${color} 15%, transparent)`) : undefined,
                          color: isActive ? color : undefined,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* COLUMN B: STICKY 3D VISUAL DECK            */}
        {/* ========================================== */}
        <div
          className={cn(
            "hidden md:block md:col-span-6 lg:col-span-5 w-full relative z-20", // Added hidden md:block!
            stickySide === "left" ? "md:order-1" : "md:order-2",
          )}
        >
          {/* Decoupled sticky box inside stretching column track */}
          <div className="sticky top-20 sm:top-28 w-full h-[450px] sm:h-[520px] flex items-center justify-center perspective-[1200px] py-4">
            <div className="relative w-full h-full max-w-lg">
              {items.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={cn(
                      "absolute inset-0 w-full h-full rounded-2xl p-6 sm:p-8 border overflow-hidden shadow-xl dark:shadow-2xl flex flex-col justify-between origin-top transition-colors",
                      item.color ||
                        "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-800",
                    )}
                    style={{
                      opacity: index === 0 ? 1 : 0,
                      zIndex: index === 0 ? 10 : 0,
                    }}
                  >
                    {/* Glassmorphic Top Highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                    {/* Card Header */}
                    <div className="flex items-center justify-between relative z-10 mb-4">
                      <span className="px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-white/10 text-[11px] font-mono font-bold tracking-widest uppercase border border-zinc-200 dark:border-white/15 flex items-center gap-2 text-zinc-700 dark:text-white">
                        <Layers className="w-3.5 h-3.5" /> DECK //{" "}
                        {item.stepNumber}
                      </span>
                      <div
                        className="w-2.5 h-2.5 rounded-full animate-ping"
                        style={{ backgroundColor: color }}
                      />
                    </div>

                    {/* Visual Payload */}
                    <div className="relative z-10 flex-1 flex flex-col justify-center my-2 overflow-hidden">
                      {item.cardContent}
                    </div>

                    {/* Card Footer */}
                    <div className="relative z-10 pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-xs text-zinc-500 dark:text-white/60 font-medium">
                      <span className="truncate pr-2 font-bold text-zinc-900 dark:text-white/90">
                        {item.title}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-white/40 flex-shrink-0">
                        SCROLL DRIVEN
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
SplitScrollStack.displayName = "SplitScrollStack";
