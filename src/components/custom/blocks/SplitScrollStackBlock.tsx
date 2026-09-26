"use client";

import { cn } from "@/lib/utils";
import { ArrowDownRight, CheckCircle2, Layers } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// ==========================================
// CARD DECK MOTION (CSS transitions)
// ==========================================
/** GSAP's power3.out, sampled into a CSS `linear()` curve. */
const EASE_POWER3_OUT =
  "linear(0, .0963, .1855, .2679, .3439, .4138, .478, .5367, .5904, .6392, .6836, .7237, .7599, .7924, .8215, .8474, .8704, .8907, .9085, .924, .9375, .9491, .959, .9674, .9744, .9802, .985, .9888, .9919, .9943, .9961, .9974, .9984, .9991, .9995, .9998, .9999, 1, 1, 1, 1)";

/** The card also carries `transition-colors`; its transition is kept alongside the deck motion. */
const CARD_CLASS_TRANSITION = ["color", "background-color", "border-color", "outline-color", "text-decoration-color", "fill", "stroke", "--tw-gradient-from", "--tw-gradient-via", "--tw-gradient-to"];

/**
 * Where a card sits in the deck — stacked behind the active card, at the
 * front, or waiting below — as a style that transitions there from wherever
 * the card is now.
 */
function deckCardStyle(
  idx: number,
  active: number,
  count: number,
  cardOffset: number,
  cardDepthScale: number,
  upcomingY: number,
): React.CSSProperties {
  let y = 0;
  let scale = 1;
  let opacity = 1;
  let zIndex = count + 10;
  let duration = 0.6;

  if (idx < active) {
    // Stacked behind in the deck
    const depth = active - idx;
    y = -depth * cardOffset;
    scale = 1 - depth * cardDepthScale;
    opacity = Math.max(0.2, 1 - depth * 0.25);
    zIndex = idx;
  } else if (idx > active) {
    // Upcoming, hidden below
    y = upcomingY;
    scale = 0.95;
    opacity = 0;
    zIndex = idx;
    duration = 0.5;
  }

  const deck = ["transform", "opacity", "z-index"];
  return {
    transform: `translateY(${y}px) scale(${scale})`,
    opacity,
    zIndex,
    transitionProperty: [...deck, ...CARD_CLASS_TRANSITION].join(", "),
    transitionDuration: [
      ...deck.map(() => `${duration}s`),
      ...CARD_CLASS_TRANSITION.map(
        () => "var(--tw-duration, var(--default-transition-duration, 150ms))",
      ),
    ].join(", "),
    transitionTimingFunction: [
      ...deck.map(() => EASE_POWER3_OUT),
      ...CARD_CLASS_TRANSITION.map(
        () =>
          "var(--tw-ease, var(--default-transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1)))",
      ),
    ].join(", "),
  };
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
  color?: string; // Global active accent colour (default: the theme's primary)
  scroller?: string | Element | null; // Optional direct element scroller target
  scrollerRef?: React.RefObject<HTMLElement | null>; // CRITICAL: Ref object for React containers
  onActiveIndexChange?: (index: number) => void;
}

// ==========================================
// SPLIT-SCROLLSTACK ENGINE
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
      color = "var(--primary)",
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
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Keep callback fresh without triggering useEffect re-runs
    const onActiveIndexChangeRef = useRef(onActiveIndexChange);
    useEffect(() => {
      onActiveIndexChangeRef.current = onActiveIndexChange;
    }, [onActiveIndexChange]);

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
    );

    // Scroll Tracking — a section is active while it spans the band between
    // 40% and 60% of the scroller's viewport (its top above the 40% line,
    // its bottom below the 60% line).
    useEffect(() => {
      if (!containerRef.current) return;

      // CRITICAL FIX: Resolve scroller target AFTER mount guaranteed by useEffect
      const resolved = scrollerRef?.current || scroller || window;
      const target: HTMLElement | Window | null =
        typeof resolved === "string"
          ? document.querySelector<HTMLElement>(resolved)
          : (resolved as HTMLElement | Window);
      if (!target) return;

      const wasActive: boolean[] = [];

      const check = () => {
        let viewportTop = 0;
        let viewportHeight = window.innerHeight;
        if (target !== window) {
          const el = target as HTMLElement;
          viewportTop = el.getBoundingClientRect().top + el.clientTop;
          viewportHeight = el.clientHeight;
        }

        sectionRefs.current.forEach((section, idx) => {
          if (!section) return;
          const rect = section.getBoundingClientRect();
          const isActive =
            rect.top - viewportTop < viewportHeight * 0.4 &&
            rect.bottom - viewportTop > viewportHeight * 0.6;
          // Fire only on becoming active, which prevents skipping/dead zones
          // on fast scrolling — the last active section stays active.
          if (isActive && !wasActive[idx]) {
            setActiveIndex(idx);
            onActiveIndexChangeRef.current?.(idx);
          }
          wasActive[idx] = isActive;
        });
      };

      let frame = 0;
      const onScroll = () => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          check();
        });
      };

      check();
      target.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);

      // Re-check after layout settles
      const timer = setTimeout(check, 150);

      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(frame);
        target.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }, [scroller, scrollerRef, items.length]);

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
                    ? "bg-card shadow-2xl border-transparent scale-[1.01]"
                    : "bg-muted/50 border-border/80 opacity-60 hover:opacity-90",
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
                        "w-11 h-11 rounded-xl flex items-center justify-center font-mono font-semibold text-sm border transition-all duration-300 shadow-sm",
                        isActive
                          ? "text-primary-foreground border-transparent scale-110"
                          : isPassed
                            ? "bg-muted text-foreground border-transparent"
                            : "bg-muted text-muted-foreground border-border",
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
                        "text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-300",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground",
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
                      ? "text-muted-foreground"
                      : "text-muted-foreground",
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
                          "px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all duration-300",
                          isActive
                            ? "border-transparent shadow-xs font-extrabold"
                            : "bg-transparent border-border text-muted-foreground/70",
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
                    className={cn(
                      "absolute inset-0 w-full h-full rounded-2xl p-6 sm:p-8 border overflow-hidden shadow-xl dark:shadow-2xl flex flex-col justify-between origin-top transition-colors",
                      item.color ||
                        "bg-card text-foreground border-border",
                    )}
                    style={deckCardStyle(
                      index,
                      activeIndex,
                      items.length,
                      cardOffset,
                      cardDepthScale,
                      140,
                    )}
                  >
                    {/* Glassmorphic Top Highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                    {/* Card Header */}
                    <div className="flex items-center justify-between relative z-10 mb-4">
                      <span className="px-3.5 py-1 rounded-full bg-muted text-[11px] font-mono font-semibold tracking-widest uppercase border border-border flex items-center gap-2 text-foreground">
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
                    <div className="relative z-10 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-medium">
                      <span className="truncate pr-2 font-semibold text-foreground">
                        {item.title}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 flex-shrink-0">
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
