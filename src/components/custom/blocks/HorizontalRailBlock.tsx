"use client";

import { cn } from "@/lib/utils";
import {
  animate,
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

export interface HorizontalRailProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: ScrollStackItem[];
  title?: string;
  subtitle?: string;
}

// --- CHILD COMPONENT: Rail Card Item ---
function RailCard({
  item,
  index,
  cardWidth,
  isMobile = false,
}: {
  item: ScrollStackItem;
  index: number;
  cardWidth: number;
  isMobile?: boolean;
}) {
  const displayNum = item.number || `0${index + 1}`;

  return (
    <div
      style={{
        width: isMobile ? "100%" : `${cardWidth}px`,
      }}
      className={cn(
        "shrink-0 p-6 sm:p-8 md:p-10 rounded-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-border/80 flex flex-col justify-between group hover:border-[var(--theme-color,var(--primary))] dark:hover:border-[var(--theme-color,var(--primary))] transition-all duration-300 relative",
        isMobile ? "w-full" : "",
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 bg-[var(--theme-color,var(--primary))]/10 border-[var(--theme-color,var(--primary))]/20 text-[var(--theme-color,var(--primary))] group-hover:scale-110 group-hover:!bg-[var(--theme-color,var(--primary))] group-hover:!border-[var(--theme-color,var(--primary))] group-hover:!text-primary-foreground dark:group-hover:!text-zinc-900 group-hover:[&_svg]:!text-primary-foreground dark:group-hover:[&_svg]:!text-zinc-900">
            {item.icon}
          </div>
          <span className="text-4xl sm:text-5xl font-black text-slate-200 dark:text-zinc-800/80 tracking-tighter select-none group-hover:text-[var(--theme-color,var(--primary))]/25 transition-colors duration-300">
            {displayNum}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-2 sm:mb-3">
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
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const steps = Math.max(1, total - 1);
  const stepSize = 1 / steps;

  const start = index === 0 ? 0 : (index - 1) * stepSize;
  const end = index === 0 ? 0 : index * stepSize;

  const scaleX = useTransform(
    progress,
    index === 0 ? [0, 1] : [0, start, end, 1],
    index === 0 ? [1, 1] : [0, 0, 1, 1]
  );

  return (
    <div className="h-2 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden relative">
      <motion.div
        className="h-full bg-[var(--theme-color,var(--primary))]"
        style={{ scaleX, transformOrigin: "left" }}
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
  const progress = useMotionValue(0);
  const lastScrollTimeRef = useRef(0);

  const steps = items.length;

  // Smoothly animate progress whenever activeStep changes
  useEffect(() => {
    const targetProgress = activeStep / steps;
    const controls = animate(progress, targetProgress, {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1],
    });
    return () => controls.stop();
  }, [activeStep, steps, progress]);

  const [layout, setLayout] = useState({
    cardWidth: 440,
    gap: 32,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [winWidth, setWinWidth] = useState(1400);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateLayout = () => {
      const w = window.innerWidth;
      setWinWidth(w);
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

  // Stepped scroll control: Slides entire rail track smoothly from right to left (no sticky items at all)
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
        if (activeStep < steps) {
          e.preventDefault();
          e.stopPropagation();
          if (!isCooldown) {
            lastScrollTimeRef.current = now;
            setActiveStep((prev) => Math.min(steps, prev + 1));
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
  }, [activeStep, steps, isMobile]);

  // Entire rail track enters from right screen edge (winWidth) and exits out left screen edge (-totalRailWidth)
  const totalRailWidth = items.length * layout.cardWidth + Math.max(0, items.length - 1) * layout.gap;
  const trackX = useTransform(progress, [0, 1], [winWidth, -totalRailWidth]);

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
            <motion.div
              style={{
                x: trackX,
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
            </motion.div>
          </div>

          <div className="flex items-center gap-2 max-w-xs w-full shrink-0">
            {items.map((_, i) => (
              <ProgressBarItem
                key={i}
                index={i}
                total={items.length}
                progress={progress}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

HorizontalRail.displayName = "HorizontalRail";
