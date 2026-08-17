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
  // For Shorter Rail (or general rail mode), move entire track from right to left linearly
  const totalRailWidth = total * (cardWidth + gap);
  const fullRailSlide = -(totalRailWidth - (cardWidth + stackOffset * 2));

  // If items <= 3 (Shorter rail), sweep smoothly as a whole rail from right to left
  const isRailMode = total <= 3;
  const xRail = useTransform(progress, [0, 1], [0, fullRailSlide]);

  // Step-by-step stacking mode for long lists
  const stepDistance = cardWidth + gap - stackOffset;
  const stepSize = total > 1 ? 1 / (total - 1) : 1;
  const cardStart = index > 0 ? (index - 1) * stepSize : 0;
  const cardEnd = index * stepSize;
  const priorTranslation = -(index - 1) * stepDistance;
  const finalTranslation = -index * stepDistance;

  const xStack = useTransform(
    progress,
    [0, cardStart, cardEnd, 1],
    [0, index === 0 ? 0 : priorTranslation, index === 0 ? 0 : finalTranslation, index === 0 ? 0 : finalTranslation],
  );

  const x = isRailMode ? xRail : xStack;

  const displayNum = item.number || `0${index + 1}`;

  return (
    <motion.div
      style={{
        width: isMobile ? "100%" : `${cardWidth}px`,
        x: isMobile ? 0 : (isRailMode ? x : (index === 0 ? 0 : x)),
        zIndex: index + 1,
      }}
      className={cn(
        "shrink-0 p-6 sm:p-8 md:p-10 rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-zinc-800 shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between group hover:border-[var(--theme-color,var(--primary))] dark:hover:border-[var(--theme-color,var(--primary))] hover:shadow-lg hover:shadow-[var(--theme-color,var(--primary))]/15 transition-all duration-300 relative",
        isMobile ? "w-full" : "",
      )}
    >
      <div>
        {/* Top Row: Icon & Step Number */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 bg-[var(--theme-color,var(--primary))]/10 border-[var(--theme-color,var(--primary))]/20 text-[var(--theme-color,var(--primary))] group-hover:scale-110 group-hover:!bg-[var(--theme-color,var(--primary))] group-hover:!border-[var(--theme-color,var(--primary))] group-hover:!text-white group-hover:[&_svg]:!text-white">
            {item.icon}
          </div>
          <span className="text-4xl sm:text-5xl font-black text-slate-200 dark:text-zinc-800/80 tracking-tighter select-none group-hover:text-[var(--theme-color,var(--primary))]/25 transition-colors duration-300">
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
        <div className="h-full bg-[var(--theme-color,var(--primary))] w-0 group-hover:w-full transition-all duration-500 ease-out" />
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
        className="h-full bg-[var(--theme-color,var(--primary))]"
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
  const isInsideIframe = typeof window !== "undefined" && window.parent !== window;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const win = el.ownerDocument.defaultView ?? window;

    const update = () => {
      // Standalone or iframe inner scroll tracking
      const scrollableHeight = el.scrollHeight - win.innerHeight;
      if (scrollableHeight > 0) {
        scrollYProgress.set(Math.min(1, Math.max(0, win.scrollY / scrollableHeight)));
      } else {
        const rect = el.getBoundingClientRect();
        const total = rect.height - win.innerHeight;
        scrollYProgress.set(total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0);
      }
    };

    const onWheelNative = (e: WheelEvent) => {
      if (!isInsideIframe || isMobile) return;
      const current = scrollYProgress.get();
      const delta = e.deltaY;

      // Lock mouse wheel to component while cards are advancing/receding
      if ((delta > 0 && current < 1) || (delta < 0 && current > 0)) {
        e.preventDefault();
        e.stopPropagation();
        const speedMultiplier = items.length <= 3 ? 0.0035 : 0.0018;
        const next = Math.min(1, Math.max(0, current + delta * speedMultiplier));
        scrollYProgress.set(next);
      }
    };

    update();
    win.addEventListener("scroll", update, { passive: true });
    win.addEventListener("resize", update);
    win.addEventListener("wheel", onWheelNative, { passive: false });

    return () => {
      win.removeEventListener("scroll", update);
      win.removeEventListener("resize", update);
      win.removeEventListener("wheel", onWheelNative);
    };
  }, [scrollYProgress, isInsideIframe, isMobile, items.length]);

  const SCROLL_END_THRESHOLD = 0.7;
  const dynamicHeightVh = Math.max(300, items.length * 60);

  return (
    <div
      ref={containerRef}
      style={{
        height: isMobile
          ? "auto"
          : isInsideIframe
            ? "800px"
            : `${dynamicHeightVh}vh`,
        backgroundColor: "color-mix(in srgb, var(--theme-color, var(--primary)) 1.5%, transparent)",
        ...style,
      }}
      className={cn(
        "relative w-full text-slate-900 dark:text-white transition-colors duration-300",
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
        <div className={cn("w-full overflow-hidden flex flex-col justify-center px-4 sm:px-8 lg:px-12", isInsideIframe ? "h-full py-2" : "sticky top-0 h-screen")}>
          {/* Section Header */}
          <div className="max-w-3xl mb-3 sm:mb-6 shrink-0">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-base mt-1 font-normal">
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
          <div className="flex items-center gap-2 mt-4 sm:mt-6 max-w-xs w-full shrink-0">
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
