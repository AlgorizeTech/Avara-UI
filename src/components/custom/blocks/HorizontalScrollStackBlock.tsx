"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { cubicBezier } from "./motion-curves";

// Stack progress (0 → 1) lives in this custom property on the container,
// written once per frame by the tween below; cards and bars derive from it.
const PROGRESS_VAR = "--horizontal-scroll-stack-progress";
const PROGRESS_EASE = cubicBezier(0.25, 1, 0.5, 1);
const PROGRESS_DURATION = 600;

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

// --- CHILD COMPONENT: Stacking Card ---
function StackCard({
  item,
  index,
  total,
  cardWidth,
  gap,
  stackOffset,
  isMobile = false,
}: {
  item: ScrollStackItem;
  index: number;
  total: number;
  cardWidth: number;
  gap: number;
  stackOffset: number;
  isMobile?: boolean;
}) {
  const steps = Math.max(1, total - 1);
  const stepSize = 1 / steps;
  const shiftPerStep = cardWidth + gap - stackOffset;

  // Card index `index` reaches its stacked position at progress = index * stepSize
  const lockProgress = index * stepSize;
  const finalTranslation = -index * shiftPerStep;

  // Linear shift from 0 to lockProgress; stays locked at finalTranslation afterwards.
  // All unstacked cards shift together, keeping equal gap between them to the right.
  const x =
    isMobile || index === 0
      ? undefined
      : `translateX(calc(min(var(${PROGRESS_VAR}, 0), ${lockProgress}) / ${lockProgress} * ${finalTranslation}px))`;

  const displayNum = item.number || `0${index + 1}`;

  return (
    <div
      style={{
        width: isMobile ? "100%" : `${cardWidth}px`,
        transform: x,
        zIndex: index + 1,
      }}
      className={cn(
        "shrink-0 p-6 sm:p-8 md:p-10 rounded-3xl bg-card/95 backdrop-blur-xl border border-border/80 flex flex-col justify-between group hover:border-[var(--theme-color,var(--primary))] transition-all duration-300 relative",
        isMobile ? "w-full" : "",
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 bg-[var(--theme-color,var(--primary))]/10 border-[var(--theme-color,var(--primary))]/20 text-[var(--theme-color,var(--primary))] group-hover:scale-110 group-hover:!bg-[var(--theme-color,var(--primary))] group-hover:!border-[var(--theme-color,var(--primary))] group-hover:!text-primary-foreground group-hover:[&_svg]:!text-primary-foreground">
            {item.icon}
          </div>
          <span className="text-4xl sm:text-5xl font-bold text-foreground/10 tracking-tighter select-none group-hover:text-[var(--theme-color,var(--primary))]/25 transition-colors duration-300">
            {displayNum}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mb-2 sm:mb-3">
          {item.title}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
          {item.description}
        </p>
      </div>

      <div className="mt-8 w-full h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-[var(--theme-color,var(--primary))] w-0 group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </div>
  );
}

// --- CHILD COMPONENT: Progress Indicator Bar ---
function ProgressBarItem({
  index,
  total,
}: {
  index: number;
  total: number;
}) {
  const steps = Math.max(1, total - 1);

  // Bar `index` fills while progress runs from (index - 1) / steps to
  // index / steps; the first bar is always full.
  const scaleX =
    index === 0
      ? undefined
      : `scaleX(clamp(0, var(${PROGRESS_VAR}, 0) * ${steps} - ${index - 1}, 1))`;

  return (
    <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden relative">
      <div
        className="h-full bg-[var(--theme-color,var(--primary))]"
        style={{ transform: scaleX, transformOrigin: "left" }}
      />
    </div>
  );
}

// --- MAIN COMPONENT ---
export function HorizontalScrollStack({
  items,
  title,
  subtitle,
  className,
  style,
  ...props
}: HorizontalScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const progressRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

  const steps = Math.max(1, items.length - 1);

  // Smoothly animate progress whenever activeStep changes, always from where
  // it is now, so a new step mid-glide picks up without a jump. Written inline
  // each frame on purpose: the cards' `transition-all` then trails the glide
  // slightly, which is the look the section has always had.
  useEffect(() => {
    const container = containerRef.current;
    const targetProgress = activeStep / steps;
    const from = progressRef.current;
    if (!container || from === targetProgress) return;

    let frame = 0;
    let startTime = 0;
    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const t = Math.min((now - startTime) / PROGRESS_DURATION, 1);
      const value = from + (targetProgress - from) * PROGRESS_EASE(t);
      progressRef.current = value;
      container.style.setProperty(PROGRESS_VAR, String(value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [activeStep, steps]);

  const [layout, setLayout] = useState({
    cardWidth: 440,
    gap: 32,
    stackOffset: 0,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateLayout = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);

      if (w < 640) {
        setLayout({ cardWidth: Math.max(260, w - 64), gap: 16, stackOffset: 0 });
      } else if (w < 1024) {
        setLayout({ cardWidth: 360, gap: 24, stackOffset: 0 });
      } else {
        setLayout({ cardWidth: 440, gap: 32, stackOffset: 0 });
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // Stepped scroll control: Exactly 1 card per scroll action
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const doc = container.ownerDocument;
    const win = doc.defaultView ?? window;

    const handleWheel = (e: WheelEvent) => {
      if (isMobile) return;
      const rect = container.getBoundingClientRect();
      const isVisibleInViewport =
        rect.top < win.innerHeight * 0.85 && rect.bottom > win.innerHeight * 0.15;

      if (!isVisibleInViewport) return;

      const now = Date.now();
      const isCooldown = now - lastScrollTimeRef.current < 550;

      if (e.deltaY > 0) {
        // Scrolling DOWN
        if (activeStep < steps) {
          e.preventDefault();
          e.stopPropagation();
          if (!isCooldown) {
            lastScrollTimeRef.current = now;
            setActiveStep((prev) => Math.min(steps, prev + 1));
          }
        }
      } else if (e.deltaY < 0) {
        // Scrolling UP
        if (activeStep > 0) {
          e.preventDefault();
          e.stopPropagation();
          if (!isCooldown) {
            lastScrollTimeRef.current = now;
            setActiveStep((prev) => Math.max(0, prev - 1));
          }
        }
      }
    };

    win.addEventListener("wheel", handleWheel, { passive: false });
    return () => win.removeEventListener("wheel", handleWheel);
  }, [activeStep, steps, isMobile]);

  return (
    <div
      ref={containerRef}
      style={{
        height: isMobile ? "auto" : "540px",
        ...style,
      }}
      className={cn(
        "relative w-full text-foreground overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        isMobile ? "py-12 px-4 sm:px-8" : "",
        className,
      )}
      {...props}
    >
      {isMobile ? (
        <div className="w-full flex flex-col gap-6">
          {(title || subtitle) && (
            <div className="max-w-3xl mb-4 shrink-0">
              {title && (
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-foreground">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-muted-foreground text-sm sm:text-base mt-2 font-normal">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          <div className="flex flex-col gap-6 w-full mt-2">
            {items.map((item, index) => (
              <StackCard
                key={item.id}
                item={item}
                index={index}
                total={items.length}
                cardWidth={0}
                gap={0}
                stackOffset={0}
                isMobile={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full overflow-hidden flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-6">
          {(title || subtitle) && (
            <div className="max-w-3xl shrink-0">
              {title && (
                <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-foreground">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-muted-foreground text-xs sm:text-base mt-1 font-normal">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          <div className="w-full overflow-hidden py-2 my-auto">
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
                  cardWidth={layout.cardWidth}
                  gap={layout.gap}
                  stackOffset={layout.stackOffset}
                  isMobile={false}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 max-w-xs w-full shrink-0">
            {items.map((_, i) => (
              <ProgressBarItem
                key={i}
                index={i}
                total={items.length}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

HorizontalScrollStack.displayName = "HorizontalScrollStack";
