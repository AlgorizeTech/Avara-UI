"use client";

import React, { useRef, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES & INTERFACES (Matching useLayouts exactly with backward compatibility)
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
// DEFAULT DATA (Direct from useLayouts Golden Gate triptych)
// ============================================================================
export const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1759340642551-f7b6059fe2ba?q=80&w=2400&auto=format&fit=crop";

export const DEFAULT_CARDS: SplitCard[] = [
  {
    title: "Fort Point",
    kicker: "Presidio",
    description:
      "A Civil War battery under the south tower. The fog hits the brick before it hits the city.",
    bgColor: "#ead9c4",
    textColor: "#2a1810",
  },
  {
    title: "The Span",
    kicker: "1.7 miles",
    description:
      "International Orange, mixed to cut through fog. The deck hangs 220 feet over the strait.",
    bgColor: "#c4452d",
    textColor: "#fff4ec",
  },
  {
    title: "Marin Head",
    kicker: "North tower",
    description:
      "The walk from Battery Spencer. On a thick day the city is only a smear of lights.",
    bgColor: "#2c3033",
    textColor: "#e6e2da",
  },
];

// ============================================================================
// MATHEMATICAL EASING & CHOREOGRAPHY (Exact useLayouts formulas)
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

/** Left/right panels peak at `peak` px, then settle close for the clean 180° flip. */
export function panelShiftX(progress: number, index: number, peak = 48) {
  const dir = index === 0 ? -1 : index === 2 ? 1 : 0;
  const out = remap(progress, 0, 0.4);
  const settle = remap(progress, 0.4, 0.8);
  return dir * lerp(0, peak, out) * (1 - settle * 0.5) || 0;
}

export function panelRotateY(progress: number) {
  return lerp(0, 180, remap(progress, 0.4, 0.8));
}

export function panelScale(progress: number) {
  return lerp(1, 0.94, remap(progress, 0, 0.4));
}

export function panelRadius(progress: number, index: number) {
  const inner = lerp(0, 16, remap(progress, 0, 0.2));
  if (index === 0) return `16px ${inner}px ${inner}px 16px`;
  if (index === 2) return `${inner}px 16px 16px ${inner}px`;
  return `${inner}px`;
}

// ============================================================================
// PANEL COMPONENT (Exact 1:1 implementation of useLayouts Panel)
// ============================================================================
function Panel({
  card,
  index,
  progress,
  imageSrc,
}: {
  card: SplitCard;
  index: number;
  progress: MotionValue<number>;
  imageSrc: string;
}) {
  const x = useTransform(progress, (p) => panelShiftX(p, index));
  const rotateY = useTransform(progress, panelRotateY);
  const radius = useTransform(progress, (p) => panelRadius(p, index));

  const bgColor = card.bgColor || card.backgroundColor || "#ead9c4";
  const textColor = card.textColor || "#2a1810";
  const kicker = card.kicker || card.tag || "";
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

      {/* Back Face: Physical card reverse with typography and subtle top inset highlight */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between overflow-hidden p-6 antialiased [backface-visibility:hidden] sm:p-8 select-none"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          borderRadius: radius,
          transform: "rotateY(180deg)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16)",
        }}
      >
        <div className="flex items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.16em] tabular-nums opacity-60">
          <span>{num}</span>
          {kicker ? <span className="truncate">{kicker}</span> : null}
        </div>
        <div>
          <div
            className="mb-4 h-px w-8 opacity-50"
            style={{ backgroundColor: "currentColor" }}
          />
          <h3 className="text-[22px] sm:text-[26px] md:text-[28px] font-semibold leading-[1.14] tracking-tight text-balance">
            {card.title}
          </h3>
          <p className="mt-2.5 text-[13px] sm:text-[14px] leading-relaxed text-pretty opacity-85">
            {card.description}
          </p>
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
  headerTitle = "Scroll",
  headerSubtitle = "Scroll to see it change",
  containerHeight = "720px",
  enableScrollIndicator = true,
  className = "",
  ...props
}: ScrollSplitCardsProps) {
  const cardList = (items || cards || DEFAULT_CARDS).slice(0, 3);
  const activeImage = imageSrc || imageUrl || DEFAULT_IMAGE;

  const containerRef = useRef<HTMLDivElement>(null);
  const rawProgress = useMotionValue(0);

  // Organic spring physics for buttery scroll interaction
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 220,
    damping: 28,
    restDelta: 0.001,
  });

  // Scale and header opacity mappings
  const scale = useTransform(smoothProgress, panelScale);
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
        "relative w-full rounded-2xl sm:rounded-3xl overflow-hidden",
        "bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white",
        "border border-neutral-200/90 dark:border-neutral-800/80",
        "select-none transition-colors duration-300",
        className
      )}
      style={{ height: containerHeight }}
      {...props}
    >
      {/* Top Header & Scroll Indicator */}
      <motion.div
        style={{ opacity: headerOpacity, y: headerY }}
        className="pointer-events-none absolute inset-x-0 top-7 sm:top-9 z-20 flex flex-col items-center gap-2 px-4 text-center"
      >
        <div className="flex max-w-full flex-col items-center gap-1 text-center">
          <p className="text-base sm:text-lg font-medium tracking-tight text-neutral-900 dark:text-white">
            {headerTitle}
          </p>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            {headerSubtitle}
          </p>
        </div>

        {enableScrollIndicator && (
          <div className="flex h-10 w-2 shrink-0 flex-col items-center mt-1" aria-hidden="true">
            <div className="size-2 shrink-0 rounded-[2px] border border-neutral-400 dark:border-white/40" />
            <div className="w-px flex-1 bg-gradient-to-b from-neutral-400 dark:from-white/40 to-transparent" />
          </div>
        )}
      </motion.div>

      {/* Presentation Stage: Level, Straight & Centered */}
      <div className="relative h-full w-full flex items-center justify-center overflow-hidden [perspective:1400px] px-4 sm:px-6 pt-10 sm:pt-12">
        <motion.div
          className="flex h-[min(520px,68vh)] sm:h-[530px] md:h-[550px] w-full max-w-5xl px-2 sm:px-4 [transform-style:preserve-3d]"
          style={{ scale }}
        >
          {cardList.map((card, index) => (
            <Panel
              key={card.title}
              card={card}
              index={index}
              progress={smoothProgress}
              imageSrc={activeImage}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default ScrollSplitCards;
