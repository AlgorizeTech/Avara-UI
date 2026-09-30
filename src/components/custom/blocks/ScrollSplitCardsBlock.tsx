"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
export type SplitCard = {
  title: string;
  description: string;
  bgColor?: string;
  backgroundColor?: string;
  textColor?: string;
  kicker?: string;
  tag?: string;
  number?: string;
  metric?: string;
  metricLabel?: string;
  location?: string;
};

export type SplitCardItem = SplitCard;

export interface ScrollSplitCardsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items?: SplitCard[];
  cards?: SplitCard[];
  imageSrc?: string;
  imageUrl?: string;
  headerTitle?: string;
  headerSubtitle?: string;
  containerHeight?: string;
  enableScrollIndicator?: boolean;
}

// ============================================================================
// DEFAULT DATA (Lago di Braies / Dolomite Alpine Lake Sanctuary)
// ============================================================================
export const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790224415/photo-1501785888041-af3ef285b470-1790146212207-1790224416318.jpg";

export const DEFAULT_CARDS: SplitCard[] = [
  {
    title: "Lago di Braies",
    kicker: "SANCTUARY",
    metric: "1,496 M",
    metricLabel: "ELEVATION",
    location: "South Tyrol, Italy",
    description:
      "Glacial emerald waters mirror sheer limestone walls in the silent morning mist before rowers set out.",
    bgColor: "#13352F",
    textColor: "#E6F4F1",
  },
  {
    title: "The Boathouse",
    kicker: "HERITAGE",
    metric: "100+ YRS",
    metricLabel: "ROWBOAT CRAFT",
    location: "Prags Alpine Dock",
    description:
      "Handcrafted wooden larch skiffs moored to stilted pine docks, awaiting the gentle morning row across crystal shallows.",
    bgColor: "#A45229",
    textColor: "#FFF8F5",
  },
  {
    title: "Seekofel Peak",
    kicker: "UNESCO",
    metric: "2,810 M",
    metricLabel: "SUMMIT HEIGHT",
    location: "Dolomites Park",
    description:
      "Towering pale crags catch the first golden alpine glow, standing sentinel over the emerald basin below.",
    bgColor: "#141E2B",
    textColor: "#ECF3F9",
  },
];

// ============================================================================
// MATHEMATICAL EASING & CHOREOGRAPHY
// ============================================================================
export function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function remap(progress: number, from: number, to: number) {
  if (to === from) return progress >= to ? 1 : 0;
  return clamp01((progress - from) / (to - from));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Left/right panels shift outward, keeping a smaller peak and restGap on small screens to prevent clipping. */
export function panelShiftX(progress: number, index: number, isSmall = false) {
  const dir = index === 0 ? -1 : index === 2 ? 1 : 0;
  const out = remap(progress, 0, 0.4);
  const settle = remap(progress, 0.4, 0.8);
  const peak = isSmall ? 18 : 48;
  return dir * lerp(0, peak, out) * (1 - settle * 0.5) || 0;
}

export function panelRotateY(progress: number) {
  return lerp(0, 180, remap(progress, 0.4, 0.8));
}

export function panelScale(progress: number, isSmall = false) {
  const target = isSmall ? 0.88 : 0.94;
  return lerp(1, target, remap(progress, 0, 0.4));
}

export function panelRadius(progress: number, index: number) {
  const inner = lerp(0, 16, remap(progress, 0, 0.2));
  if (index === 0) return `16px ${inner}px ${inner}px 16px`;
  if (index === 2) return `${inner}px 16px 16px ${inner}px`;
  return `${inner}px`;
}

// ============================================================================
// PANEL COMPONENT (Refined Editorial Card Design with Visual Balance)
// ============================================================================
function Panel({
  card,
  index,
  progress,
  imageSrc,
  isSmall = false,
}: {
  card: SplitCard;
  index: number;
  progress: MotionValue<number>;
  imageSrc: string;
  isSmall?: boolean;
}) {
  const isSmallRef = useRef(isSmall);
  isSmallRef.current = isSmall;

  const x = useTransform(progress, (p) => panelShiftX(p, index, isSmallRef.current));
  const rotateY = useTransform(progress, panelRotateY);
  const radius = useTransform(progress, (p) => panelRadius(p, index));

  const bgColor = card.bgColor || card.backgroundColor || "#13352F";
  const textColor = card.textColor || "#E6F4F1";
  const kicker = card.kicker || card.tag || "CHAPTER";
  const num = card.number || String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className={cn(
        "relative h-full min-w-0 flex-[1_1_0] [transform-style:preserve-3d]",
        index > 0 ? "-ml-px" : ""
      )}
      style={{ x, rotateY, zIndex: index }}
    >
      {/* Front Face: 1/3 of the seamless panoramic photograph */}
      <motion.div
        className="absolute inset-0 overflow-hidden [backface-visibility:hidden]"
        style={{ borderRadius: radius }}
      >
        <div
          className="absolute inset-0 h-full w-[300%]"
          style={{
            left: `${-100 * index}%`,
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        />
      </motion.div>

      {/* Back Face: Physical card reverse with rich editorial layout */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between overflow-hidden p-3 sm:p-5 md:p-7 antialiased [backface-visibility:hidden] select-none border border-white/10"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          borderRadius: radius,
          transform: "rotateY(180deg)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
        }}
      >
        {/* Top Header Row: Category Badge & Numeric Index */}
        <div className="flex items-center justify-between gap-1">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 max-w-[78%]">
            <span className="size-1 sm:size-1.5 shrink-0 rounded-full bg-current opacity-80" />
            <span className="font-mono text-[7px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-wider truncate">
              {kicker}
            </span>
          </div>
          <span className="font-mono text-[9px] sm:text-[11px] md:text-[12px] font-bold tabular-nums opacity-60 shrink-0">
            {num}
          </span>
        </div>

        {/* Mid Section: Feature Metric / Stat Badge */}
        <div className="my-auto py-1 sm:py-2">
          {card.metric ? (
            <div className="inline-flex flex-col">
              <span className="font-mono text-[7px] sm:text-[8.5px] md:text-[10px] uppercase tracking-wider opacity-60">
                {card.metricLabel || "METRIC"}
              </span>
              <span className="text-base sm:text-xl md:text-3xl font-extrabold tracking-tight mt-0.5">
                {card.metric}
              </span>
            </div>
          ) : (
            <div className="w-5 sm:w-6 h-[1.5px] opacity-30 bg-current" />
          )}
        </div>

        {/* Bottom Section: Display Title, Narrative & Location Footer */}
        <div>
          <h3 className="text-[13px] sm:text-[18px] md:text-[23px] font-bold tracking-tight leading-[1.15] text-balance">
            {card.title}
          </h3>
          <p className="mt-1 sm:mt-2 text-[9px] sm:text-[11.5px] md:text-[13px] leading-snug sm:leading-relaxed text-pretty opacity-85 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
            {card.description}
          </p>

          <div className="mt-2 sm:mt-3 pt-1.5 sm:pt-2.5 border-t border-current/15 flex items-center justify-between text-[7.5px] sm:text-[9.5px] md:text-[11px] font-mono uppercase tracking-wider opacity-75">
            <span className="truncate pr-1">{card.location || "Dolomites, Italy"}</span>
            <span className="text-[10px] sm:text-xs shrink-0">↗</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function ScrollSplitCards({
  items,
  cards,
  imageSrc,
  imageUrl,
  headerTitle = "Explore",
  headerSubtitle = "Scroll down to reveal the alpine lake narrative",
  containerHeight,
  enableScrollIndicator = true,
  className = "",
  style,
  ...props
}: ScrollSplitCardsProps) {
  const cardList = (items || cards || DEFAULT_CARDS).slice(0, 3);
  const activeImage = imageSrc || imageUrl || DEFAULT_IMAGE;

  const containerRef = useRef<HTMLDivElement>(null);
  const rawProgress = useMotionValue(0);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const isSmallRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkSize = () => {
      const width = el.clientWidth;
      const small = width > 0 && width < 640;
      if (small !== isSmallRef.current) {
        isSmallRef.current = small;
        setIsSmallScreen(small);
        rawProgress.set(rawProgress.get());
      }
    };

    checkSize();
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const small = width > 0 && width < 640;
        if (small !== isSmallRef.current) {
          isSmallRef.current = small;
          setIsSmallScreen(small);
          rawProgress.set(rawProgress.get());
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [rawProgress]);

  // Organic spring physics for buttery scroll interaction
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 220,
    damping: 28,
    restDelta: 0.001,
  });

  // Scale and header opacity mappings
  const scale = useTransform(smoothProgress, (p) => panelScale(p, isSmallRef.current));
  const headerOpacity = useTransform(smoothProgress, [0, 0.15, 0.28], [1, 0.8, 0]);
  const headerY = useTransform(smoothProgress, [0, 0.28], [0, -18]);

  // Capture wheel and touch gestures on container so everything happens in-place
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const current = rawProgress.get();
      if ((e.deltaY > 0 && current < 1) || (e.deltaY < 0 && current > 0)) {
        e.preventDefault();
        const delta = e.deltaY * 0.0018;
        const next = Math.min(Math.max(current + delta, 0), 1);
        rawProgress.set(next);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = (touchStartY - currentY) * 1.5;
      touchStartY = currentY;
      const current = rawProgress.get();
      if ((deltaY > 0 && current < 1) || (deltaY < 0 && current > 0)) {
        if (e.cancelable) e.preventDefault();
        const next = Math.min(Math.max(current + deltaY * 0.003, 0), 1);
        rawProgress.set(next);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [rawProgress]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full rounded-none sm:rounded-3xl overflow-hidden",
        !containerHeight && "h-[460px] sm:h-[620px] md:h-[650px] lg:h-[710px]",
        "bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white",
        "border-0 sm:border border-neutral-200/90 dark:border-neutral-800/80",
        "select-none transition-colors duration-300",
        className
      )}
      style={{
        ...(containerHeight ? { height: containerHeight } : {}),
        ...style,
      }}
      {...props}
    >
      {/* Top Header & Scroll Indicator */}
      <motion.div
        style={{ opacity: headerOpacity, y: headerY }}
        className="pointer-events-none absolute inset-x-0 top-4 sm:top-5 lg:top-6 z-20 flex flex-col items-center gap-1 sm:gap-1.5 px-3 text-center"
      >
        <div className="flex max-w-full flex-col items-center gap-0.5 sm:gap-1 text-center">
          <p className="text-sm sm:text-base lg:text-lg font-medium tracking-tight text-neutral-900 dark:text-white leading-tight">
            {headerTitle}
          </p>
          <p className="text-[11px] sm:text-xs lg:text-sm text-neutral-500 dark:text-neutral-400 leading-tight">
            {headerSubtitle}
          </p>
        </div>

        {enableScrollIndicator && (
          <div className="flex h-6 sm:h-7 lg:h-8 w-2 shrink-0 flex-col items-center mt-1 sm:mt-1.5 lg:mt-2" aria-hidden="true">
            <div className="size-1.5 sm:size-2 shrink-0 rounded-[2px] border border-neutral-400 dark:border-white/40" />
            <div className="w-px flex-1 bg-gradient-to-b from-neutral-400 dark:from-white/40 to-transparent" />
          </div>
        )}
      </motion.div>

      {/* Presentation Stage: Level, Straight & Top-Calibrated */}
      <div className="relative h-full w-full flex flex-col items-center justify-start overflow-hidden [perspective:1400px] px-3.5 sm:px-6 pt-[106px] sm:pt-[120px] lg:pt-[132px]">
        <motion.div
          className="flex h-[310px] sm:h-[430px] md:h-[450px] lg:h-[500px] w-full max-w-5xl px-1 sm:px-4 [transform-style:preserve-3d]"
          style={{ scale }}
        >
          {cardList.map((card, index) => (
            <Panel
              key={card.title}
              card={card}
              index={index}
              progress={smoothProgress}
              imageSrc={activeImage}
              isSmall={isSmallScreen}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default ScrollSplitCards;
