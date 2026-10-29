"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Palette,
  Monitor,
  MessageSquare,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// Animated counter for scores and summary percentage
function AnimatedNumber({
  value,
  duration = 0.8,
  suffix = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startVal = prevValueRef.current;
    const endVal = value;
    prevValueRef.current = value;

    if (startVal === endVal) {
      setDisplayValue(endVal);
      return;
    }

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startVal + (endVal - startVal) * easeProgress));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    const reqId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(reqId);
  }, [value, duration]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

// ==========================================
// TYPES & INTERFACES
// ==========================================
export interface PillarItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  baselineScore?: number;
  score?: number;
  highlight?: boolean;
  icon?: React.ReactNode;
}

export type CtaSectionVariant = "brand-pillars" | "minimal" | "split";

export interface CtaSectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: CtaSectionVariant;
  color?: string;
  heading?: string;
  subheading?: string;
  statement?: string;
  pillars?: PillarItem[];
  summaryText?: string;
  summaryScore?: string | number;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  activePillarId?: string;
  onPillarChange?: (id: string) => void;
  rounded?: string | number;
  className?: string;
}

// ==========================================
// DEFAULT PILLARS (Matching Framer Brand Pillars)
// ==========================================
export const DEFAULT_PILLARS: PillarItem[] = [
  {
    id: "branding",
    eyebrow: "Branding",
    title: "A brand that sticks",
    description: "Identity, visual language and positioning.",
    baselineScore: 26,
    score: 100,
    icon: <Palette className="size-5 sm:size-6 stroke-[2]" />,
  },
  {
    id: "website",
    eyebrow: "Website",
    title: 'An "on-brand" website',
    description: "Your digital storefront, built to convert.",
    baselineScore: 34,
    score: 100,
    icon: <Monitor className="size-5 sm:size-6 stroke-[2]" />,
  },
  {
    id: "social",
    eyebrow: "Social content",
    title: "Content that stays consistent",
    description: "Social media that looks and sounds like your brand.",
    baselineScore: 19,
    score: 100,
    icon: <MessageSquare className="size-5 sm:size-6 stroke-[2]" />,
  },
  {
    id: "data",
    eyebrow: "Data & insights",
    title: "Knowing what works",
    description: "Insights that show what's working and what needs improvement.",
    baselineScore: 41,
    score: 100,
    highlight: true,
    icon: <TrendingUp className="size-5 sm:size-6 stroke-[2]" />,
  },
];

// Preset color map for quick accents
const COLOR_MAP: Record<string, { bg: string; text: string; gradient: string }> = {
  orange: {
    bg: "#f95716",
    text: "#f95716",
    gradient: "from-[#ff6426] to-[#e64708]",
  },
  primary: {
    bg: "var(--primary)",
    text: "var(--primary)",
    gradient: "from-primary to-primary/80",
  },
  indigo: {
    bg: "#6366f1",
    text: "#6366f1",
    gradient: "from-indigo-500 to-indigo-600",
  },
  rose: {
    bg: "#f43f5e",
    text: "#f43f5e",
    gradient: "from-rose-500 to-rose-600",
  },
  emerald: {
    bg: "#10b981",
    text: "#10b981",
    gradient: "from-emerald-500 to-emerald-600",
  },
};

// Deck card placement & rotation offsets:
// 1 line absolute at bottom, spanning across the component
// Alternate rotation & translation (-5 to +5) as requested by user
// Deck card placement & rotation offsets:
// Perfectly distributed across the component from left edge (0%) to right edge
// Responsive offsets based on container width
const DECK_CONFIG: Record<
  string,
  {
    rotate: number;
    pctOffset: number;
    mobilePctOffset: number;
    offsetY: number;
    zIndex: number;
    alignRight?: boolean;
    isOrange?: boolean;
  }
> = {
  branding: { rotate: -5, pctOffset: 0, mobilePctOffset: 0, offsetY: 5, zIndex: 40 },
  website: { rotate: 5, pctOffset: 21.7, mobilePctOffset: 12, offsetY: -5, zIndex: 30 },
  social: { rotate: -5, pctOffset: 43.3, mobilePctOffset: 24, offsetY: 5, zIndex: 20 },
  data: { rotate: 3, pctOffset: 65, mobilePctOffset: 36, offsetY: -4, zIndex: 10, isOrange: true, alignRight: true },
};

// Alternating rotations on mobile (-5, +5, -5, +5)
const MOBILE_ROTATIONS: Record<string, number> = {
  branding: -5,
  website: 5,
  social: -5,
  data: 5,
};

// Initial cascade / rain drop entrance delays (right-to-left: Data -> Social -> Website -> Branding)
const RAIN_DELAYS: Record<string, number> = {
  data: 0.15,
  social: 0.45,
  website: 0.75,
  branding: 1.05,
};

// ==========================================
// BRAND PILLARS CTA VARIANT (PIXEL-PERFECT FRAMER REPLICA)
// ==========================================
function BrandPillarsCta({
  color,
  heading,
  subheading,
  statement = "A strong brand isn't built from a single element. Branding, website, social, and data reinforce each other — together creating a brand that's recognizable, consistent, and effective.",
  pillars = DEFAULT_PILLARS,
  summaryText = 'One complete, consistent brand" — 100%',
  summaryScore,
  ctaText = "Boek a demo",
  ctaHref = "#",
  onCtaClick,
  activePillarId: _controlledActiveId,
  onPillarChange,
  rounded,
  className,
  style,
  ...props
}: CtaSectionProps) {
  // Starts with 0 cards placed (initial state matching the user's screenshot)
  const [placedCardIds, setPlacedCardIds] = useState<string[]>([]);

  // Use CSS theme variable var(--primary) by default so theme switcher changes it across the entire component
  const activeAccent = color
    ? COLOR_MAP[color]?.bg || color
    : "var(--primary)";
  // Dynamic radius bound to global --radius token from the theme customizer sidebar
  const dynamicRadius =
    rounded !== undefined
      ? typeof rounded === "number"
        ? `${rounded}px`
        : rounded
      : "var(--radius, 0.625rem)";
  const containerRadius =
    rounded !== undefined
      ? dynamicRadius
      : "calc(var(--radius, 0.625rem) * 1.6)";
  const iconRadius =
    rounded !== undefined
      ? dynamicRadius
      : "calc(var(--radius, 0.625rem) * 0.75)";

  // Track responsive screen size for mobile deck spacing
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Active flying animations to ensure moving cards are always on top of EVERYTHING
  const [activeFlyingCards, setActiveFlyingCards] = useState<Record<string, "toSlot" | "toDeck">>({});
  const flyingTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Toggle or place card
  const handlePlaceCard = (id: string) => {
    const isCurrentlyPlaced = placedCardIds.includes(id);
    const direction: "toSlot" | "toDeck" = isCurrentlyPlaced ? "toDeck" : "toSlot";

    // Elevate moving card above all other elements
    setActiveFlyingCards((prev) => ({ ...prev, [id]: direction }));

    if (flyingTimersRef.current[id]) {
      clearTimeout(flyingTimersRef.current[id]);
    }
    flyingTimersRef.current[id] = setTimeout(() => {
      setActiveFlyingCards((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 700);

    setPlacedCardIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
    onPillarChange?.(id);
  };


  const isAllPlaced = placedCardIds.length === pillars.length;
  const progressPercent = Math.round((placedCardIds.length / pillars.length) * 100);

  // Unplaced cards remaining in the floating deck
  const unplacedPillars = pillars.filter((p) => !placedCardIds.includes(p.id));

  return (
    <section
      className={cn(
        "relative w-full overflow-x-clip overflow-y-visible bg-muted/40 dark:bg-muted/20 pt-8 sm:pt-12 pb-24 sm:pb-32 text-foreground transition-colors",
        className
      )}
      style={{ ...style }}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 overflow-visible">
        {/* Optional Header (hidden if not passed, as in standard Framer component) */}
        {(heading || subheading) && (
          <div className="mb-8 text-center sm:mb-12">
            {subheading && (
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest"
                style={{ color: activeAccent }}
              >
                {subheading}
              </span>
            )}
            {heading && (
              <h2 className="mt-2 text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
                {heading}
              </h2>
            )}
          </div>
        )}

        {/* Relative wrapper holding both columns and the overlapping floating deck */}
        <div className="relative overflow-visible pb-12 sm:pb-16">
          {/* Main 2-Column Split Layout */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-7 items-stretch overflow-visible">
            {/* ======================================================== */}
            {/* LEFT COLUMN: 4 Vertical Card Slots */}
            {/* ======================================================== */}
            <div
              className="lg:col-span-5 flex flex-col justify-between space-y-3 sm:space-y-3.5 relative overflow-visible z-10"
            >
              {pillars.map((pillar) => {
                const isPlaced = placedCardIds.includes(pillar.id);
                const isDataSlot = pillar.id === "data";
                const isCardFlying = Boolean(activeFlyingCards[pillar.id]);

                return (
                  <div
                    key={pillar.id}
                    className={cn(
                      "relative overflow-visible",
                      isCardFlying ? "z-50" : "z-10"
                    )}
                    style={{ minHeight: "96px" }}
                  >
                    {/* Permanent Background Placeholder Slot - Always visible ("agula harai jabe na") */}
                    <div
                      onClick={() => !isPlaced && handlePlaceCard(pillar.id)}
                      className={cn(
                        "p-5 sm:p-5.5 select-none border w-full h-full transition-all duration-300",
                        isPlaced ? "cursor-default" : "cursor-pointer hover:border-foreground/10",
                        isDataSlot
                          ? "bg-muted-foreground/35 dark:bg-muted-foreground/25 text-white border-transparent"
                          : "bg-card/70 dark:bg-card/40 text-muted-foreground border-border/60"
                      )}
                      style={{ borderRadius: dynamicRadius }}
                      title={!isPlaced ? "Click to place card in slot" : undefined}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "size-11 shrink-0 flex items-center justify-center",
                            isDataSlot
                              ? "bg-white/20 text-white"
                              : "bg-muted text-muted-foreground"
                          )}
                          style={{ borderRadius: iconRadius }}
                        >
                          {pillar.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span
                            className={cn(
                              "block text-[10px] sm:text-[11px] font-bold tracking-widest uppercase",
                              isDataSlot ? "text-white/80" : "text-muted-foreground/80"
                            )}
                          >
                            {pillar.eyebrow}
                          </span>
                          <h3
                            className={cn(
                              "mt-0.5 text-base sm:text-lg font-bold tracking-tight",
                              isDataSlot ? "text-white" : "text-foreground/80"
                            )}
                          >
                            {pillar.title}
                          </h3>
                          <p
                            className={cn(
                              "mt-0.5 text-xs sm:text-[13px] leading-relaxed",
                              isDataSlot ? "text-white/80" : "text-neutral-400 dark:text-neutral-500"
                            )}
                          >
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Shared Layout Card when placed - Sits directly ON TOP ("agular uporer jaiya boshbe") */}
                    {isPlaced && (
                      <motion.div
                        layoutId={`card-${pillar.id}`}
                        initial={false}
                        animate={{ x: 0, y: 0, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 240, damping: 25 }}
                        onClick={() => handlePlaceCard(pillar.id)}
                        className={cn(
                          "absolute inset-0 cursor-pointer p-5 sm:p-5.5 select-none border w-full h-full",
                          isDataSlot
                            ? "text-white border-transparent"
                            : "bg-card text-card-foreground border-border"
                        )}
                        style={{
                          backgroundColor: isDataSlot ? activeAccent : undefined,
                          borderRadius: dynamicRadius,
                          zIndex: isCardFlying ? 9999 : 20,
                        }}
                        title="Click to return card to deck"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "size-11 shrink-0 flex items-center justify-center",
                              isDataSlot
                                ? "bg-white/20 text-white"
                                : "bg-primary/10 text-primary"
                            )}
                            style={{
                              borderRadius: iconRadius,
                              color: !isDataSlot ? activeAccent : undefined,
                              backgroundColor: !isDataSlot ? `color-mix(in srgb, ${activeAccent} 12%, transparent)` : undefined,
                            }}
                          >
                            {pillar.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span
                              className="block text-[10px] sm:text-[11px] font-bold tracking-widest uppercase"
                              style={{ color: isDataSlot ? "rgba(255,255,255,0.9)" : activeAccent }}
                            >
                              {pillar.eyebrow}
                            </span>
                            <h3
                              className={cn(
                                "mt-0.5 text-base sm:text-lg font-bold tracking-tight",
                                isDataSlot ? "text-white" : "text-foreground"
                              )}
                            >
                              {pillar.title}
                            </h3>
                            <p
                              className={cn(
                                "mt-0.5 text-xs sm:text-[13px] leading-relaxed",
                                isDataSlot ? "text-white/90" : "text-muted-foreground"
                              )}
                            >
                              {pillar.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ======================================================== */}
            {/* RIGHT COLUMN: White Scorecard Panel */}
            {/* ======================================================== */}
            <div className="lg:col-span-7 flex flex-col relative z-10">
              <div
                className="relative flex flex-col justify-between overflow-hidden border border-border/80 bg-card p-6 sm:p-8 lg:p-9 transition-all h-full"
                style={{
                  borderRadius: containerRadius,
                }}
              >
                {/* Top Philosophy Statement */}
                <div>
                  <p
                    className="text-[16px] sm:text-[18px] font-semibold leading-snug text-foreground tracking-tight transition-all duration-500"
                    style={{
                      filter: isAllPlaced ? "grayscale(0)" : "grayscale(1)",
                      opacity: isAllPlaced ? 1 : 0.45,
                    }}
                  >
                    {statement}
                  </p>

                  {/* 4 Scorecards (2x2 on mobile matching screenshot, 4 across on desktop) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 my-7 sm:my-8">
                    {pillars.map((pillar) => {
                      const isPlaced = placedCardIds.includes(pillar.id);
                      const isDataSlot = pillar.id === "data";
                      const targetScore = isPlaced
                        ? (pillar.score ?? 100)
                        : (pillar.baselineScore ?? 25);

                      return (
                        <div
                          key={pillar.id}
                          onClick={() => handlePlaceCard(pillar.id)}
                          className={cn(
                            "cursor-pointer flex flex-col justify-between items-center p-3 sm:p-4.5 h-44 sm:h-52 border transition-all duration-300 select-none",
                            isPlaced
                              ? isDataSlot
                                ? "text-white border-transparent"
                                : "bg-card text-card-foreground border-border"
                              : isDataSlot
                                ? "bg-muted-foreground/40 dark:bg-neutral-700 text-white border-transparent"
                                : "bg-card text-card-foreground border-border"
                          )}
                          style={{
                            borderRadius: dynamicRadius,
                            backgroundColor: isPlaced && isDataSlot ? activeAccent : undefined,
                            filter: isPlaced ? "grayscale(0)" : "grayscale(1)",
                            opacity: isPlaced ? 1 : 0.55,
                            transform: isPlaced ? "scale(1)" : "scale(0.98)",
                          }}
                        >
                          {/* Short Label */}
                          <span
                            className={cn(
                              "text-xs sm:text-sm font-semibold tracking-tight transition-colors",
                              (isPlaced && isDataSlot) || (!isPlaced && isDataSlot)
                                ? "text-white"
                                : "text-neutral-600 dark:text-neutral-400"
                            )}
                          >
                            {pillar.eyebrow.split(" ")[0]}
                          </span>

                          {/* Large Score with dynamic count-up */}
                          <div className="my-auto">
                            <span
                              className={cn(
                                "text-3xl sm:text-4xl lg:text-5xl font-black tabular-nums tracking-tight transition-colors",
                                (isPlaced && isDataSlot) || (!isPlaced && isDataSlot)
                                  ? "text-white"
                                  : "text-neutral-900 dark:text-neutral-100"
                              )}
                            >
                              <AnimatedNumber value={targetScore} duration={0.8} />
                            </span>
                          </div>

                          {/* Bottom Full-Width Progress Track (Framer exact) */}
                          <div
                            className="w-full h-1.5 rounded-full overflow-hidden"
                            style={{
                              backgroundColor:
                                isDataSlot && isPlaced
                                  ? "rgba(255, 255, 255, 0.25)"
                                  : isDataSlot
                                    ? "rgba(255, 255, 255, 0.2)"
                                    : "rgba(28, 26, 23, 0.08)",
                            }}
                          >
                            <motion.div
                              initial={false}
                              animate={{ width: isPlaced ? "100%" : `${pillar.baselineScore ?? 25}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{
                                backgroundColor: isDataSlot ? "#FFFFFF" : activeAccent,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Summary Bar */}
                <div
                  className="relative z-10 flex flex-wrap items-center justify-between gap-4 p-4 sm:p-4.5 transition-all duration-500"
                  style={{
                    borderRadius: dynamicRadius,
                    backgroundColor: activeAccent,
                    filter: isAllPlaced ? "grayscale(0)" : "grayscale(1)",
                    opacity: isAllPlaced ? 1 : 0.55,
                  }}
                >
                  <span className="text-xs sm:text-sm font-bold tracking-tight text-white">
                    {summaryText}
                  </span>

                  <span className="text-sm sm:text-base font-extrabold text-white tabular-nums">
                    {summaryScore !== undefined ? (
                      summaryScore
                    ) : (
                      <AnimatedNumber value={isAllPlaced ? 100 : progressPercent} suffix="%" duration={0.8} />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* ABSOLUTE CARDS DECK AT COMPONENT BOTTOM (Matches user screenshot 1:1) */}
          {/* ======================================================== */}
          {unplacedPillars.length > 0 && (
            <div
              className="absolute -bottom-8 sm:-bottom-10 left-0 right-0 w-full flex flex-col items-center overflow-visible z-30 pointer-events-none"
            >
              {/* Floating Orange Instruction Pill with Down Arrow - disappears once any card is picked */}
              {placedCardIds.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="flex flex-col items-center mb-1 select-none pointer-events-auto transition-opacity duration-300"
                >
                  <div
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-white text-[11px] font-bold tracking-wide select-none"
                    style={{ backgroundColor: activeAccent }}
                  >
                    <span className="text-xs">✋</span>
                    <span>Drag the cards into place</span>
                  </div>
                  <span
                    className="text-xs font-black -mt-0.5 leading-none"
                    style={{ color: activeAccent }}
                  >
                    ↓
                  </span>
                </motion.div>
              )}

              {/* Cards Container: Stacked According to Index (Desktop: Horizontal line, Mobile: Stacked underneath each other) */}
              <div className="relative w-full h-[115px] sm:h-[110px] overflow-visible pointer-events-auto">
                {unplacedPillars.map((pillar, index) => {
                  const cfg = DECK_CONFIG[pillar.id] || {
                    rotate: 0,
                    pctOffset: 0,
                    mobilePctOffset: 0,
                    offsetY: 0,
                    zIndex: 1,
                  };
                  const isOrangeCard = pillar.id === "data";
                  const isCardFlying = Boolean(activeFlyingCards[pillar.id]);
                  const pct = cfg.pctOffset;
                  const rainDelay = RAIN_DELAYS[pillar.id] ?? 0;
                  const currentRotate = isMobile
                    ? (MOBILE_ROTATIONS[pillar.id] ?? (index % 2 === 0 ? -5 : 5))
                    : cfg.rotate;
                  // On mobile, slight vertical offset (index * 5) so cards peek out according to index
                  const currentY = isMobile ? (index * 5) : cfg.offsetY;

                  return (
                    <motion.div
                      key={pillar.id}
                      layout
                      layoutId={`card-${pillar.id}`}
                      initial={
                        !hasMounted
                          ? { y: -750, opacity: 0, rotate: currentRotate * 2, scale: 0.9 }
                          : false
                      }
                      animate={{
                        y: currentY,
                        opacity: 1,
                        rotate: currentRotate,
                        scale: 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 75,
                        damping: 16,
                        mass: 1.1,
                        delay: !hasMounted ? rainDelay : 0,
                      }}
                      onClick={() => handlePlaceCard(pillar.id)}
                      className={cn(
                        "absolute top-0 cursor-pointer select-none",
                        "w-[calc(100%-16px)] sm:w-[35%] p-4 sm:p-5 select-none min-h-[96px] sm:min-h-[104px] flex items-center",
                        isOrangeCard
                          ? "text-white border border-transparent"
                          : "bg-card text-card-foreground border border-border"
                      )}
                      style={{
                        left: isMobile ? "8px" : (cfg.alignRight ? undefined : `${pct}%`),
                        right: isMobile ? "8px" : (cfg.alignRight ? 0 : undefined),
                        backgroundColor: isOrangeCard ? activeAccent : undefined,
                        borderRadius: dynamicRadius,
                        zIndex: isCardFlying ? 9999 : cfg.zIndex,
                      }}
                      title="Click to place card in slot"
                    >
                      <div className="flex items-start gap-3.5 sm:gap-4 w-full">
                        <div
                          className={cn(
                            "size-10 sm:size-11 shrink-0 flex items-center justify-center",
                            isOrangeCard
                              ? "bg-white/20 text-white"
                              : "bg-primary/10 text-primary"
                          )}
                          style={{
                            borderRadius: iconRadius,
                            color: !isOrangeCard ? activeAccent : undefined,
                            backgroundColor: !isOrangeCard ? `color-mix(in srgb, ${activeAccent} 12%, transparent)` : undefined,
                          }}
                        >
                          {pillar.icon}
                        </div>
                        <div className="min-w-0 flex-1 overflow-hidden">
                          <span
                            className="block text-[10px] sm:text-[11px] font-bold tracking-wider uppercase truncate"
                            style={{ color: isOrangeCard ? "rgba(255,255,255,0.9)" : activeAccent }}
                          >
                            {pillar.eyebrow}
                          </span>
                          <h4
                            className={cn(
                              "mt-0.5 text-sm sm:text-base font-extrabold tracking-tight leading-snug truncate",
                              isOrangeCard ? "text-white" : "text-foreground"
                            )}
                          >
                            {pillar.title}
                          </h4>
                          <p
                            className={cn(
                              "mt-0.5 text-[11px] sm:text-xs leading-snug truncate",
                              isOrangeCard ? "text-white/90" : "text-muted-foreground"
                            )}
                          >
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* BOTTOM CTA BUTTON (Matches Framer when 100% complete) */}
        {/* ======================================================== */}
        <AnimatePresence>
          {isAllPlaced && (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-8 flex justify-center"
            >
              <a
                href={ctaHref}
                onClick={(e) => {
                  if (ctaHref === "#") e.preventDefault();
                  onCtaClick?.();
                }}
                className="inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full text-white font-semibold text-sm sm:text-base transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{ backgroundColor: activeAccent }}
              >
                <span>{ctaText}</span>
                <span className="size-8 rounded-full bg-white flex items-center justify-center shrink-0">
                  <ArrowRight className="size-4 stroke-[2.5]" style={{ color: activeAccent }} />
                </span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ==========================================
// MINIMAL CTA VARIANT
// ==========================================
function MinimalCta({
  color = "#f95716",
  heading = "Transform your brand into a growth engine",
  statement = "Start building unified identity, conversion-driven websites, and data-backed marketing systems today.",
  ctaText = "Get Started",
  ctaHref = "#",
  onCtaClick,
  rounded,
  className,
  style,
  ...props
}: CtaSectionProps) {
  const activeAccent = COLOR_MAP[color]?.bg || color;
  const dynamicRadius =
    rounded !== undefined
      ? typeof rounded === "number"
        ? `${rounded}px`
        : rounded
      : "16px";

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-background py-16 sm:py-24 text-center text-foreground",
        className
      )}
      style={{ ...style }}
      {...props}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-balance text-foreground">
          {heading}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {statement}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={ctaHref}
            onClick={(e) => {
              if (ctaHref === "#") e.preventDefault();
              onCtaClick?.();
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg transition-all hover:opacity-95 active:scale-95"
            style={{
              backgroundColor: activeAccent,
              borderRadius: dynamicRadius,
            }}
          >
            <span>{ctaText}</span>
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// SPLIT CTA VARIANT
// ==========================================
function SplitCta({
  color = "#f95716",
  heading = "One team for your complete brand ecosystem",
  statement = "From brand strategy to custom web development and growth content, everything connects seamlessly.",
  ctaText = "Book a Call",
  ctaHref = "#",
  onCtaClick,
  pillars = DEFAULT_PILLARS,
  rounded,
  className,
  style,
  ...props
}: CtaSectionProps) {
  const activeAccent = COLOR_MAP[color]?.bg || color;
  const dynamicRadius =
    rounded !== undefined
      ? typeof rounded === "number"
        ? `${rounded}px`
        : rounded
      : "20px";

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-background py-12 sm:py-16 text-foreground",
        className
      )}
      style={{ ...style }}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden border border-border/70 bg-card p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          style={{ borderRadius: dynamicRadius }}
        >
          <div className="lg:col-span-7 space-y-4">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: activeAccent }}
            >
              Unified Brand Growth
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {heading}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {statement}
            </p>
            <div className="pt-2">
              <a
                href={ctaHref}
                onClick={(e) => {
                  if (ctaHref === "#") e.preventDefault();
                  onCtaClick?.();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:opacity-95 active:scale-95"
                style={{
                  backgroundColor: activeAccent,
                  borderRadius: dynamicRadius,
                }}
              >
                <span>{ctaText}</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="p-4 rounded-xl border border-border/60 bg-muted/30 flex flex-col justify-between space-y-3"
              >
                <div
                  className="size-8 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${activeAccent}18`,
                    color: activeAccent,
                  }}
                >
                  {pillar.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{pillar.title}</h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// MAIN CTA SECTION ROUTER
// ==========================================
export function CTASection({
  variant = "brand-pillars",
  ...props
}: CtaSectionProps) {
  switch (variant) {
    case "minimal":
      return <MinimalCta {...props} />;
    case "split":
      return <SplitCta {...props} />;
    case "brand-pillars":
    default:
      return <BrandPillarsCta {...props} />;
  }
}

export default CTASection;
export { CTASection as CtaSection };
