"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { cubicBezier } from "./motion-curves";

// Rail progress (0 → 1) lives in this custom property on the container, written
// once per frame by the tween below; the track and bars derive from it in CSS.
const PROGRESS_VAR = "--horizontal-rail-progress";
const PROGRESS_EASE = cubicBezier(0.25, 1, 0.5, 1);
const PROGRESS_DURATION = 600;

export interface HorizontalRailItem {
  id: string | number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  stepNumber?: string;
  color?: string;
  content?: React.ReactNode;
}

export interface HorizontalRailProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: HorizontalRailItem[];
  title?: string;
  subtitle?: string;
}

// --- CHILD COMPONENT: Individual Rail Card ---
function RailCard({
  item,
  index,
  cardWidth,
  isMobile,
}: {
  item: HorizontalRailItem;
  index: number;
  cardWidth: number;
  isMobile: boolean;
}) {
  const displayNum = item.stepNumber || `0${index + 1}`;

  return (
    <div
      style={{
        width: isMobile ? "100%" : `${cardWidth}px`,
      }}
      className={cn(
        "rounded-2xl p-6 sm:p-8 flex flex-col justify-between shrink-0 shadow-lg border transition-all duration-300 relative overflow-hidden group select-none",
        item.color ||
          "bg-card border-border text-card-foreground"
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="w-12 h-12 rounded-xl bg-[var(--theme-color,var(--primary))]/10 border border-[var(--theme-color,var(--primary))]/20 flex items-center justify-center text-[var(--theme-color,var(--primary))] font-semibold shadow-xs">
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
export function HorizontalRail({
  items,
  title,
  subtitle,
  className,
  style,
  ...props
}: HorizontalRailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const progressRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

  const maxSteps = Math.max(1, items.length - 1);

  // Smoothly animate progress whenever activeStep changes, always from where
  // it is now, so a new step mid-glide picks up without a jump.
  useEffect(() => {
    const container = containerRef.current;
    const targetProgress = maxSteps > 0 ? activeStep / maxSteps : 0;
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
  }, [activeStep, maxSteps]);

  const [layout, setLayout] = useState({
    cardWidth: 440,
    gap: 32,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateLayout = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);

      if (w < 640) {
        setLayout({ cardWidth: Math.max(260, w - 64), gap: 16 });
      } else if (w < 1024) {
        setLayout({ cardWidth: 360, gap: 24 });
      } else {
        setLayout({ cardWidth: 440, gap: 32 });
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // Stepped scroll control: Cards start inside screen. Scrolling shifts cards left.
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
        if (activeStep < maxSteps) {
          e.preventDefault();
          e.stopPropagation();
          if (!isCooldown) {
            lastScrollTimeRef.current = now;
            setActiveStep((prev) => Math.min(maxSteps, prev + 1));
          }
        }
      } else if (e.deltaY < 0) {
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
  }, [activeStep, maxSteps, isMobile]);

  // Track starts at x=0 (visible inside screen) and shifts left by -(cardWidth + gap) per step
  const maxScrollDist = maxSteps * (layout.cardWidth + layout.gap);
  const trackX = `translateX(calc(var(${PROGRESS_VAR}, 0) * ${-maxScrollDist}px))`;

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
              <RailCard
                key={item.id}
                item={item}
                index={index}
                cardWidth={0}
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
              style={{
                transform: trackX,
                gap: `${layout.gap}px`,
              }}
              className="flex w-max items-stretch"
            >
              {items.map((item, index) => (
                <RailCard
                  key={item.id}
                  item={item}
                  index={index}
                  cardWidth={layout.cardWidth}
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

HorizontalRail.displayName = "HorizontalRail";
