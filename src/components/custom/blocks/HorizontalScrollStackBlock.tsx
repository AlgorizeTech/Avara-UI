"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export type ScrollStackItem = {
  id: string | number;
  number?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export interface HorizontalScrollStackProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: ScrollStackItem[];
  title?: string;
  subtitle?: string;
}

// --- CHILD COMPONENT: Individual Stacking Card ---
function StackCard({
  item,
  index,
  total,
  progress,
  cardWidth,
  gap,
  stackOffset,
  scrollEndThreshold,
  isMobile = false,
}: {
  item: ScrollStackItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  cardWidth: number;
  gap: number;
  stackOffset: number;
  scrollEndThreshold: number;
  isMobile?: boolean;
}) {
  // Distance each card travels before locking over the previous card (Desktop only)
  const travelPerCard = cardWidth + gap - stackOffset;
  const lockDistance = index * travelPerCard;

  // Calculate the scroll percentage (0 to scrollEndThreshold) where THIS card locks
  const lockProgress =
    total > 1 ? (index / (total - 1)) * scrollEndThreshold : 0;
  const safeLockProgress = Math.max(0.0001, lockProgress);

  // Card translates left until it hits lockProgress, then anchors in place while subsequent cards slide over it
  const x = useTransform(
    progress,
    [0, safeLockProgress, 1],
    [0, -lockDistance, -lockDistance],
  );

  const displayNum = item.number || `0${index + 1}`;

  return (
    <motion.div
      style={{
        width: isMobile ? "100%" : `${cardWidth}px`,
        x: isMobile || index === 0 ? 0 : x,
      }}
      className={cn(
        "shrink-0 p-6 sm:p-8 md:p-10 rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between group hover:border-indigo-500/50 dark:hover:border-zinc-700 transition-colors duration-300 relative",
        isMobile ? "w-full" : "",
      )}
    >
      <div>
        {/* Top Row: Icon & Step Number */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/50 flex items-center justify-center text-slate-700 dark:text-zinc-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 dark:group-hover:bg-indigo-500 transition-all duration-300">
            {item.icon}
          </div>
          <span className="text-4xl sm:text-5xl font-black text-slate-200 dark:text-zinc-800/80 tracking-tighter select-none group-hover:text-indigo-100 dark:group-hover:text-zinc-700/50 transition-colors duration-300">
            {displayNum}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 sm:mb-3">
          {item.title}
        </h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
          {item.description}
        </p>
      </div>

      {/* Card Bottom Indicator line */}
      <div className="mt-8 w-full h-1 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600 dark:bg-indigo-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </motion.div>
  );
}

// --- CHILD COMPONENT: Progress Bar Step Indicator ---
function ProgressBarItem({
  index,
  total,
  progress,
  scrollEndThreshold,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  scrollEndThreshold: number;
}) {
  const start = (index / total) * scrollEndThreshold;
  const end = ((index + 1) / total) * scrollEndThreshold;
  const scaleX = useTransform(progress, [start, end], [0, 1]);

  return (
    <div className="h-1.5 flex-1 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-indigo-600 dark:bg-indigo-500"
        style={{ scaleX, transformOrigin: "left" }}
      />
    </div>
  );
}

// --- MAIN COMPONENT ---
export function HorizontalScrollStack({
  items,
  title = "We follow a streamlined design process",
  subtitle = "from understanding your goals to delivering polished assets.",
  className,
  style,
  ...props
}: HorizontalScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive layout state & mobile detection (< 768px)
  const [layout, setLayout] = useState({
    cardWidth: 440,
    gap: 32,
    stackOffset: 60,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    // Resolve everything against the document the component actually lives in,
    // so the effect also works when rendered inside an iframe.
    const doc = container.ownerDocument;
    const win = doc.defaultView ?? window;

    // 1. UNIVERSAL STICKY PATCHER: Intercepts & neutralizes ALL CSS traps (auto, scroll, hidden, overlay, contain)
    const modifiedAncestors: {
      element: HTMLElement;
      overflow: string;
      overflowX: string;
      overflowY: string;
      contain: string;
    }[] = [];

    let parent = container.parentElement;
    while (parent && parent !== doc.body && parent !== doc.documentElement) {
      const computed = win.getComputedStyle(parent);
      const { overflow, overflowX, overflowY, contain } = computed;

      const hasOverflowTrap = ["hidden", "auto", "scroll", "overlay"].some(
        (val) => val === overflow || val === overflowX || val === overflowY,
      );
      const hasContainTrap =
        contain && contain !== "none" && contain !== "normal";

      if (hasOverflowTrap || hasContainTrap) {
        modifiedAncestors.push({
          element: parent,
          overflow: parent.style.overflow,
          overflowX: parent.style.overflowX,
          overflowY: parent.style.overflowY,
          contain: parent.style.contain,
        });

        if (["hidden", "auto", "scroll", "overlay"].includes(overflowX))
          parent.style.overflowX = "clip";
        if (["hidden", "auto", "scroll", "overlay"].includes(overflowY))
          parent.style.overflowY = "visible";
        if (["hidden", "auto", "scroll", "overlay"].includes(overflow))
          parent.style.overflow = "visible";
        if (hasContainTrap) parent.style.contain = "none";
      }
      parent = parent.parentElement;
    }

    // 2. Responsive layout sizing & Mobile detection.
    // Measures the container (not the top window) so it responds to the
    // actual viewport when rendered inside an iframe device preview.
    const updateLayout = () => {
      const w = container.clientWidth || win.innerWidth;
      setIsMobile(w < 768); // Below 768px (md breakpoint) triggers simple vertical stack

      if (w < 640) {
        const offset = Math.min(
          24,
          Math.max(14, Math.floor((w - 120) / (items.length || 1))),
        );
        const cardW = Math.min(300, w - (items.length - 1) * offset - 32);
        setLayout({
          cardWidth: Math.max(240, cardW),
          gap: 16,
          stackOffset: offset,
        });
      } else if (w < 1024) {
        setLayout({ cardWidth: 360, gap: 24, stackOffset: 44 });
      } else {
        setLayout({ cardWidth: 440, gap: 32, stackOffset: 60 });
      }
    };

    updateLayout();
    // Realm-correct ResizeObserver: a parent-realm observer never fires for
    // elements living in another document (e.g. inside an iframe).
    const RO =
      (win as Window & typeof globalThis).ResizeObserver ?? ResizeObserver;
    const observer = new RO(updateLayout);
    observer.observe(container);
    win.addEventListener("resize", updateLayout);

    return () => {
      observer.disconnect();
      win.removeEventListener("resize", updateLayout);
      modifiedAncestors.forEach(
        ({ element, overflow, overflowX, overflowY, contain }) => {
          element.style.overflow = overflow;
          element.style.overflowX = overflowX;
          element.style.overflowY = overflowY;
          element.style.contain = contain;
        },
      );
    };
  }, [items.length]);

  // Track vertical scroll progress of the tall container.
  // Manually driven MotionValue instead of useScroll so progress is computed
  // against the window/document the component actually lives in (works inside
  // a same-origin iframe device preview, where useScroll would track the
  // parent page scroll instead). Replicates offset ["start start", "end end"].
  const scrollYProgress = useMotionValue(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const win = el.ownerDocument.defaultView ?? window;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - win.innerHeight;
      scrollYProgress.set(
        total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0,
      );
    };
    update();
    win.addEventListener("scroll", update, { passive: true });
    win.addEventListener("resize", update);
    return () => {
      win.removeEventListener("scroll", update);
      win.removeEventListener("resize", update);
    };
  }, [scrollYProgress]);

  const SCROLL_END_THRESHOLD = 0.7;
  const dynamicHeight = Math.max(400, items.length * 70);

  return (
    <div
      ref={containerRef}
      style={{ height: isMobile ? "auto" : `${dynamicHeight}vh`, ...style }}
      className={cn(
        "relative w-full bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white transition-colors duration-300",
        isMobile ? "py-12 px-4 sm:px-8" : "",
        className,
      )}
      {...props}
    >
      {isMobile ? (
        /* =========================================================
           MOBILE (< 768px): Simple Vertical Scroll Stack Fallback
           ========================================================= */
        <div className="w-full flex flex-col gap-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-4 shrink-0">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base mt-2 font-normal">
              {subtitle}
            </p>
          </div>

          {/* Vertical Stack Track */}
          <div className="flex flex-col gap-6 w-full mt-2">
            {items.map((item, index) => (
              <StackCard
                key={item.id}
                item={item}
                index={index}
                total={items.length}
                progress={scrollYProgress}
                cardWidth={0}
                gap={0}
                stackOffset={0}
                scrollEndThreshold={SCROLL_END_THRESHOLD}
                isMobile={true}
              />
            ))}
          </div>
        </div>
      ) : (
        /* =========================================================
           DESKTOP (>= 768px): Native GPU Horizontal Sticky Deck
           ========================================================= */
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-4 sm:px-12 lg:px-20">
          {/* Section Header */}
          <div className="max-w-3xl mb-8 sm:mb-12 shrink-0">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-lg mt-2 sm:mt-3 font-normal">
              {subtitle}
            </p>
          </div>

          {/* Horizontal Stacking Track */}
          <div className="w-full overflow-visible py-4">
            <div
              style={{ gap: `${layout.gap}px` }}
              className="flex w-max items-stretch"
            >
              {items.map((item, index) => (
                <StackCard
                  key={item.id}
                  item={item}
                  index={index}
                  total={items.length}
                  progress={scrollYProgress}
                  cardWidth={layout.cardWidth}
                  gap={layout.gap}
                  stackOffset={layout.stackOffset}
                  scrollEndThreshold={SCROLL_END_THRESHOLD}
                  isMobile={false}
                />
              ))}
            </div>
          </div>

          {/* Progress Bar Indicators */}
          <div className="flex items-center gap-2 mt-8 sm:mt-12 max-w-xs w-full shrink-0">
            {items.map((_, i) => (
              <ProgressBarItem
                key={i}
                index={i}
                total={items.length}
                progress={scrollYProgress}
                scrollEndThreshold={SCROLL_END_THRESHOLD}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

HorizontalScrollStack.displayName = "HorizontalScrollStack";
