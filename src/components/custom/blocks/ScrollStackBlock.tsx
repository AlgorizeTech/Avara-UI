"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
export interface StackItem {
  id: string;
  title: string;
  description: string;
  content?: React.ReactNode;
  color?: string; // Optional custom background classes
  icon?: React.ElementType;
}

export interface ScrollStackProps extends React.HTMLAttributes<HTMLDivElement> {
  items: StackItem[];
  depthScale?: number; // How much smaller background cards get (default: 0.05)
  cardGap?: number; // Pixel distance between stacked sticky cards (default: 24)
  scroller?: string | Element | null; // Scroll viewport driving the effect
}

// ==========================================
// MAIN CONTAINER (SCROLL-DRIVEN)
// ==========================================
export const ScrollStack = ({
  items,
  depthScale = 0.05,
  cardGap = 24,
  scroller,
  className,
  ...props
}: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Resolve everything against the document the component actually lives in,
    // so the effect also works when rendered inside an iframe.
    const doc = container.ownerDocument;
    const win = doc.defaultView ?? window;
    let scrollerEl =
      typeof scroller === "string"
        ? doc.querySelector(scroller)
        : (scroller ?? null);
    // No explicit scroller (or a ref that was still null when passed):
    // fall back to the nearest scrollable ancestor.
    if (!scrollerEl) {
      let parent = container.parentElement;
      while (parent && parent !== doc.documentElement) {
        const style = win.getComputedStyle(parent);
        if (
          /(auto|scroll|overlay)/.test(style.overflowY) &&
          parent.scrollHeight > parent.clientHeight
        ) {
          scrollerEl = parent;
          break;
        }
        parent = parent.parentElement;
      }
    }

    // Scrub each card as the NEXT card scrolls from 85% to 20% of the viewport
    const update = () => {
      const viewportTop = scrollerEl
        ? scrollerEl.getBoundingClientRect().top
        : 0;
      const viewportHeight = scrollerEl
        ? scrollerEl.clientHeight
        : win.innerHeight;
      const start = viewportHeight * 0.85;
      const end = viewportHeight * 0.2;

      cardRefs.current.forEach((card, index) => {
        if (!card || index === items.length - 1) return; // Last card doesn't shrink
        const nextCard = cardRefs.current[index + 1];
        if (!nextCard) return;

        const nextTop = nextCard.getBoundingClientRect().top - viewportTop;
        const progress = Math.min(
          1,
          Math.max(0, (start - nextTop) / (start - end)),
        );

        const targetScale = 1 - (items.length - 1 - index) * depthScale;
        card.style.transform = `scale(${1 + (targetScale - 1) * progress})`;
        card.style.opacity = String(1 - 0.35 * progress);
      });
    };

    update();
    const scrollTarget: EventTarget = scrollerEl ?? win;
    scrollTarget.addEventListener("scroll", update, { passive: true });
    win.addEventListener("resize", update);

    return () => {
      scrollTarget.removeEventListener("scroll", update);
      win.removeEventListener("resize", update);
      cardRefs.current.forEach((card) => {
        if (card) {
          card.style.transform = "";
          card.style.opacity = "";
        }
      });
    };
  }, [items.length, depthScale, scroller]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ paddingBottom: "15vh" }}
      {...props}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex min-h-screen w-full items-center justify-center sticky top-0 sm:top-2"
        >
          <div
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={cn(
              "relative w-full max-w-4xl h-[60vh] sm:h-[65vh] rounded-2xl p-8 md:p-12 shadow-xl dark:shadow-2xl origin-top flex flex-col md:flex-row gap-8 overflow-hidden border transition-colors duration-300",
              item.color ||
                "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:border-[var(--theme-color,var(--primary))]",
            )}
          >
            {/* Subtle Glass Noise Overlay */}
            <div className="absolute inset-0 bg-black/[0.02] dark:bg-white/[0.03] pointer-events-none" />

            <div className="flex-1 flex flex-col justify-center relative z-10">
              {item.icon && (
                <div className="w-14 h-14 rounded-2xl bg-[var(--theme-color,var(--primary))]/10 border border-[var(--theme-color,var(--primary))]/20 flex items-center justify-center mb-6 shadow-sm text-[var(--theme-color,var(--primary))] transition-colors">
                  <item.icon className="w-7 h-7 text-[var(--theme-color,var(--primary))]" />
                </div>
              )}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                {item.title}
              </h2>
              <p
                className={cn(
                  "text-base sm:text-lg font-medium leading-relaxed max-w-lg transition-colors",
                  item.color
                    ? "text-white/80"
                    : "text-zinc-600 dark:text-white/70",
                )}
              >
                {item.description}
              </p>
            </div>

            {/* Right-Side Content Payload */}
            {item.content && (
              <div className="flex-1 relative z-10 rounded-2xl overflow-hidden bg-zinc-100/80 dark:bg-black/20 border border-zinc-200/80 dark:border-white/10 hidden md:flex items-center justify-center transition-colors">
                {item.content}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
