"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Palette,
  Monitor,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Check,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
} from "motion/react";
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

export type CtaSectionVariant =
  | "brand-pillars"
  | "minimal"
  | "split"
  | "concentric-portal"
  | "orbital-lens";

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
  // Concentric Portal / Orbital Lens props
  phrase?: string;
  scrollProgress?: number;
  autoRotate?: boolean;
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
// CONCENTRIC PORTAL / ORBITAL LENS CTA (Reference: contentarchitecture.dev)
// ==========================================
// Performance model:
//  - All orbital text + dotted orbits are drawn on ONE <canvas> from pre-rendered glyph
//    sprites (no SVG <textPath>, no per-ring components, no per-frame React work).
//  - A single rAF loop smooths scroll progress, repaints the canvas and writes the portal's
//    transform/opacity straight to the DOM, so scrubbing never triggers a React re-render.
//  - The loop sleeps when the section is off-screen or nothing is animating.
const PORTAL_RINGS = [
  { id: "ring-1", radius: 75, direction: "cw" as const, duration: 55, scrollAngle: 45 },
  { id: "ring-2", radius: 130, direction: "ccw" as const, duration: 70, scrollAngle: -60 },
  { id: "ring-3", radius: 190, direction: "cw" as const, duration: 85, scrollAngle: 75 },
  { id: "ring-4", radius: 255, direction: "ccw" as const, duration: 105, scrollAngle: -95 },
  { id: "ring-5", radius: 325, direction: "cw" as const, duration: 125, scrollAngle: 115 },
  { id: "ring-6", radius: 400, direction: "ccw" as const, duration: 150, scrollAngle: -135 },
  { id: "ring-7", radius: 480, direction: "cw" as const, duration: 175, scrollAngle: 155 },
  { id: "ring-8", radius: 565, direction: "ccw" as const, duration: 205, scrollAngle: -175 },
  { id: "ring-9", radius: 655, direction: "cw" as const, duration: 235, scrollAngle: 195 },
  { id: "ring-10", radius: 750, direction: "ccw" as const, duration: 270, scrollAngle: -215 },
  { id: "ring-11", radius: 850, direction: "cw" as const, duration: 310, scrollAngle: 235 },
  { id: "ring-12", radius: 955, direction: "ccw" as const, duration: 350, scrollAngle: -255 },
  { id: "ring-13", radius: 1065, direction: "cw" as const, duration: 395, scrollAngle: 275 },
  { id: "ring-14", radius: 1180, direction: "ccw" as const, duration: 445, scrollAngle: -295 },
  { id: "ring-15", radius: 1300, direction: "cw" as const, duration: 500, scrollAngle: 315 },
];

const PORTAL_DOTTED_ORBITS = [
  45, 102, 160, 222, 290, 362, 440, 522, 610, 702, 800, 902, 1010, 1122, 1240, 1365,
];

const PORTAL_FONT_FAMILY = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const PORTAL_TEXT_COLOR = "rgba(255, 255, 255, 0.94)";
const PORTAL_DOT_COLOR = "rgba(255, 255, 255, 0.22)";
const PORTAL_GLYPH_ADVANCE = 0.74; // em: 0.6em monospace glyph + 0.14em letter-spacing
const PORTAL_MIN_SCALE = 0.94;
const PORTAL_MAX_SCALE = 1.22;
const PORTAL_SMOOTHING = 14; // higher = snappier follow of the scroll target (1/s)

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const portalLinesScale = (p: number) =>
  PORTAL_MIN_SCALE + (PORTAL_MAX_SCALE - PORTAL_MIN_SCALE) * clamp01(p / 0.85);
const portalCircleScale = (p: number) =>
  p <= 0.03 ? 0 : 1 - Math.pow(1 - clamp01((p - 0.03) / 0.72), 2.4);

interface PortalRingLayout {
  radius: number;
  fontSize: number;
  step: number; // radians between neighbouring glyphs
  chars: string[];
  sprites: Int16Array; // atlas index per glyph (-1 = blank)
  direction: 1 | -1;
  periodMs: number;
  scrollRad: number;
}

interface GlyphAtlas {
  canvas: HTMLCanvasElement;
  cellW: number;
  cellH: number;
  baseline: number;
  index: Map<string, number>;
}

function buildRingLayouts(phrase: string): PortalRingLayout[] {
  const unit = `${phrase.trim() || "THE CONTENT ARCHITECTURE"} · · · `;
  return PORTAL_RINGS.map((ring) => {
    const fontSize = ring.radius < 180 ? 16 : 18.5;
    // Whole number of phrase units per ring so the text wraps seamlessly (no cut-off at the seam)
    const natural = (2 * Math.PI * ring.radius) / (fontSize * PORTAL_GLYPH_ADVANCE);
    const count = unit.length * Math.max(1, Math.round(natural / unit.length));
    return {
      radius: ring.radius,
      fontSize,
      step: (2 * Math.PI) / count,
      chars: Array.from({ length: count }, (_, i) => unit[i % unit.length]),
      sprites: new Int16Array(count),
      direction: ring.direction === "cw" ? 1 : -1,
      periodMs: ring.duration * 1000,
      scrollRad: (ring.scrollAngle * Math.PI) / 180,
    };
  });
}

// Renders each distinct character once; frames then blit + rotate sprites (GPU textured quads).
function buildGlyphAtlas(chars: string[], fontSize: number, pxScale: number): GlyphAtlas {
  const unique = Array.from(new Set(chars)).filter((c) => c.trim() !== "");
  const cellW = Math.ceil(fontSize * 0.9 * pxScale);
  const cellH = Math.ceil(fontSize * 1.4 * pxScale);
  const baseline = Math.ceil(fontSize * 1.08 * pxScale);
  const canvas = document.createElement("canvas");
  canvas.width = cellW * Math.max(1, unique.length);
  canvas.height = cellH;
  const index = new Map<string, number>();
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = `700 ${fontSize * pxScale}px ${PORTAL_FONT_FAMILY}`;
    ctx.fillStyle = PORTAL_TEXT_COLOR;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    unique.forEach((c, i) => {
      ctx.fillText(c, i * cellW + cellW / 2, baseline);
      index.set(c, i);
    });
  }
  return { canvas, cellW, cellH, baseline, index };
}

export function ConcentricPortalCta({
  heading = "The next 5 days are yours.",
  subheading,
  statement,
  phrase = "THE CONTENT ARCHITECTURE",
  ctaText = "GET ACCESS",
  ctaHref = "#",
  onCtaClick,
  color,
  scrollProgress,
  autoRotate = true,
  className,
  style,
  ...props
}: CtaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  // Scroll target (0..1). The render loop eases the displayed progress toward it.
  const targetRef = useRef(scrollProgress !== undefined ? clamp01(scrollProgress) : 0);
  const autoRotateRef = useRef(autoRotate);
  const maxDiameterRef = useRef(520);
  const loopRef = useRef<{ wake: () => void } | null>(null);

  // Screen-responsive max diameter
  const [maxDiameter, setMaxDiameter] = useState(520);
  useEffect(() => {
    const updateMax = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      if (w < 480) {
        setMaxDiameter(Math.min(320, w - 32));
      } else if (w < 640) {
        setMaxDiameter(Math.min(420, w - 48));
      } else {
        setMaxDiameter(520);
      }
    };
    updateMax();
    window.addEventListener("resize", updateMax);
    return () => window.removeEventListener("resize", updateMax);
  }, []);

  useEffect(() => {
    maxDiameterRef.current = maxDiameter;
    loopRef.current?.wake();
  }, [maxDiameter]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
    loopRef.current?.wake();
  }, [autoRotate]);

  useEffect(() => {
    if (scrollProgress !== undefined) {
      targetRef.current = clamp01(scrollProgress);
      loopRef.current?.wake();
    }
  }, [scrollProgress]);

  // Render loop: smoothing + canvas painting + direct DOM writes (no React re-renders)
  useEffect(() => {
    const section = containerRef.current;
    const canvas = canvasRef.current;
    const circle = circleRef.current;
    const content = contentRef.current;
    const hint = hintRef.current;
    if (!section || !canvas || !circle || !content || !hint) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const layouts = buildRingLayouts(phrase);
    const dotsCanvas = document.createElement("canvas");
    const dotsCtx = dotsCanvas.getContext("2d");
    let atlases = new Map<number, GlyphAtlas>();
    let dotsKey = "";

    let width = 0;
    let height = 0;
    let dpr = 1;

    let p = targetRef.current;
    let appliedP = -1;
    let ambientMs = 0;
    let lastTs = 0;
    let raf = 0;
    let inView = true;

    const rebuildAtlases = () => {
      atlases = new Map();
      for (const layout of layouts) {
        let atlas = atlases.get(layout.fontSize);
        if (!atlas) {
          const chars = layouts
            .filter((l) => l.fontSize === layout.fontSize)
            .flatMap((l) => l.chars);
          atlas = buildGlyphAtlas(chars, layout.fontSize, dpr * PORTAL_MAX_SCALE);
          atlases.set(layout.fontSize, atlas);
        }
        for (let i = 0; i < layout.chars.length; i++) {
          layout.sprites[i] = atlas.index.get(layout.chars[i]) ?? -1;
        }
      }
    };

    const applyProgress = (value: number) => {
      const c = clamp01((value - 0.32) / 0.28);
      circle.style.transform = `scale(${portalCircleScale(value)})`;
      circle.style.opacity = String(clamp01((value - 0.03) / 0.05));
      circle.style.visibility = value <= 0.03 ? "hidden" : "visible";
      content.style.opacity = String(c);
      content.style.transform = `scale(${0.88 + 0.12 * c})`;
      hint.style.opacity = String(1 - clamp01(value / 0.08));
    };

    // Dotted orbits only change with the zoom level, so cache them between frames.
    const drawDots = (scale: number, reach: number) => {
      if (!dotsCtx) return;
      const key = `${canvas.width}x${canvas.height}:${scale.toFixed(4)}`;
      if (key !== dotsKey) {
        if (dotsCanvas.width !== canvas.width || dotsCanvas.height !== canvas.height) {
          dotsCanvas.width = canvas.width;
          dotsCanvas.height = canvas.height;
        }
        dotsCtx.setTransform(1, 0, 0, 1, 0, 0);
        dotsCtx.clearRect(0, 0, dotsCanvas.width, dotsCanvas.height);
        dotsCtx.setTransform(dpr * scale, 0, 0, dpr * scale, (width / 2) * dpr, (height / 2) * dpr);
        dotsCtx.strokeStyle = PORTAL_DOT_COLOR;
        dotsCtx.lineWidth = 1;
        dotsCtx.setLineDash([2, 7]);
        for (const r of PORTAL_DOTTED_ORBITS) {
          if (r * scale > reach) break;
          dotsCtx.beginPath();
          dotsCtx.arc(0, 0, r, 0, Math.PI * 2);
          dotsCtx.stroke();
        }
        dotsKey = key;
      }
      ctx.drawImage(dotsCanvas, 0, 0);
    };

    const draw = (value: number) => {
      if (!width || !height) return;
      const scale = portalLinesScale(value);
      const cx = width / 2;
      const cy = height / 2;
      const reach = Math.hypot(cx, cy) + 30; // farthest visible distance from center
      const circleR = value > 0.08 ? (maxDiameterRef.current / 2) * portalCircleScale(value) : 0;
      const k = scale * dpr;
      const margin = 24;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots(scale, reach);

      for (const layout of layouts) {
        const rs = layout.radius * scale;
        if (rs > reach) continue; // ring is fully outside the section
        if (rs + layout.fontSize * 1.1 * scale < circleR) continue; // hidden under the portal
        const atlas = atlases.get(layout.fontSize);
        if (!atlas) continue;

        const ambient = autoRotateRef.current
          ? layout.direction * ((ambientMs / layout.periodMs) % 1) * Math.PI * 2
          : 0;
        const base = ambient + layout.scrollRad * value;
        const dw = atlas.cellW / (dpr * PORTAL_MAX_SCALE);
        const dh = atlas.cellH / (dpr * PORTAL_MAX_SCALE);
        const dy = -atlas.baseline / (dpr * PORTAL_MAX_SCALE);

        for (let i = 0; i < layout.sprites.length; i++) {
          const sprite = layout.sprites[i];
          if (sprite < 0) continue;
          const a = base + i * layout.step;
          const sn = Math.sin(a);
          const cs = Math.cos(a);
          const x = cx + sn * rs;
          const y = cy - cs * rs;
          if (x < -margin || x > width + margin || y < -margin || y > height + margin) continue;
          ctx.setTransform(cs * k, sn * k, -sn * k, cs * k, x * dpr, y * dpr);
          ctx.drawImage(
            atlas.canvas,
            sprite * atlas.cellW,
            0,
            atlas.cellW,
            atlas.cellH,
            -dw / 2,
            dy,
            dw,
            dh
          );
        }
      }
    };

    // Returns true while another frame is needed
    const step = (now: number) => {
      const dt = lastTs ? Math.min(0.064, (now - lastTs) / 1000) : 0;
      lastTs = now;

      const target = targetRef.current;
      if (p !== target) {
        p += (target - p) * (1 - Math.exp(-dt * PORTAL_SMOOTHING));
        if (Math.abs(target - p) < 0.0004) p = target;
      }
      if (autoRotateRef.current) ambientMs += dt * 1000;

      if (p !== appliedP) {
        applyProgress(p);
        appliedP = p;
      }
      draw(p);
      return p !== target || autoRotateRef.current;
    };

    const tick = (now: number) => {
      raf = 0;
      if (step(now) && inView) {
        raf = requestAnimationFrame(tick);
      } else {
        lastTs = 0;
      }
    };

    const wake = () => {
      if (!raf && inView) raf = requestAnimationFrame(tick);
    };
    loopRef.current = { wake };

    const resize = () => {
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      width = section.clientWidth;
      height = section.clientHeight;
      canvas.width = Math.max(1, Math.round(width * nextDpr));
      canvas.height = Math.max(1, Math.round(height * nextDpr));
      dotsKey = "";
      if (nextDpr !== dpr || atlases.size === 0) {
        dpr = nextDpr;
        rebuildAtlases();
      }
      draw(p); // resizing clears the canvas; repaint immediately to avoid a flash
      wake();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) wake();
    });
    intersectionObserver.observe(section);

    dpr = Math.min(window.devicePixelRatio || 1, 2);
    rebuildAtlases();
    resize();

    return () => {
      loopRef.current = null;
      if (raf) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [phrase]);

  // Wheel scrubbing: scroll over the section smoothly scrubs 0 -> 1 without React re-renders
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const cur = targetRef.current;
      const next = clamp01(cur + e.deltaY * 0.0014);

      // Intercept wheel while expanding (down < 0.99) or collapsing (up > 0.01)
      if ((e.deltaY > 0 && cur < 0.99) || (e.deltaY < 0 && cur > 0.01)) {
        e.preventDefault();
        targetRef.current = next;
        loopRef.current?.wake();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Touch swipe support for mobile
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const diff = touchStartY - currentY;
      const cur = targetRef.current;
      const next = clamp01(cur + diff * 0.0035);

      if ((diff > 0 && cur < 0.99) || (diff < 0 && cur > 0.01)) {
        if (e.cancelable) e.preventDefault();
        targetRef.current = next;
        loopRef.current?.wake();
      }
      touchStartY = currentY;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  // Split CTA text into [ Left ] [ Right • ] segments
  const [leftLabel, rightLabel] = useMemo(() => {
    if (ctaText && ctaText.includes(" ")) {
      const parts = ctaText.trim().split(/\s+/);
      return [parts[0], parts.slice(1).join(" ")];
    }
    return [ctaText || "GET", "ACCESS"];
  }, [ctaText]);

  const activeAccent = color
    ? COLOR_MAP[color]?.bg || color
    : "#f59e0b";

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full h-[600px] sm:h-[680px] bg-[#08080a] overflow-hidden select-none",
        className
      )}
      style={{ ...style }}
      {...props}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#08080a] text-white">
        {/* Top Monospace Code Matrix Texture */}
        <div className="absolute inset-x-0 top-0 h-44 sm:h-56 pointer-events-none overflow-hidden select-none opacity-20 font-mono text-[9px] sm:text-[11px] text-neutral-400 z-10">
          <div className="p-3 sm:p-5 space-y-1.5 uppercase tracking-[0.22em] leading-relaxed">
            <p className="truncate">
              NEXT 16.X · ASTRO 7.X · SANITY V3 · TS: STRICT · AGENTS.MD: LOADED · AGENT-BROWSER: HEADLESS · DRIFT: 0 · LLMS.TXT · SKILLS · PORTABLE TEXT · DRAFT · PUBLISHED · REVALIDATE
            </p>
            <p className="truncate">
              THE CONTENT ARCHITECTURE · SCHEMA · GROQ · PAGE BUILDER · SECTIONS · TYPEGEN · NEXT 16.X · ASTRO 7.X · SANITY V3 · TS: STRICT · AGENTS.MD: LOADED · AGENT-BROWSER: HEADLESS
            </p>
            <p className="truncate">
              DRIFT: 0 · LLMS.TXT · SKILLS · PORTABLE TEXT · DRAFT · PUBLISHED · REVALIDATE · THE CONTENT ARCHITECTURE · SCHEMA · GROQ · PAGE BUILDER · SECTIONS · TYPEGEN
            </p>
            <p className="truncate">
              AGENTS.MD: LOADED · AGENT-BROWSER: HEADLESS · DRIFT: 0 · LLMS.TXT · SKILLS · PORTABLE TEXT · DRAFT · PUBLISHED · REVALIDATE · THE CONTENT ARCHITECTURE
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08080a]/50 to-[#08080a]" />
        </div>

        {/* Concentric orbital rings & monospace text (single canvas, zoom handled in the draw loop) */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
        />

        {/* Expanding White/Cream Circle Portal ("The Eye") */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div
            ref={circleRef}
            style={{
              width: maxDiameter,
              height: maxDiameter,
              transform: "scale(0)",
              opacity: 0,
              visibility: "hidden",
              willChange: "transform, opacity",
            }}
            className="shrink-0 rounded-full bg-[#f1eee7] text-neutral-900 flex flex-col items-center justify-center text-center shadow-[0_0_80px_rgba(0,0,0,0.85)] pointer-events-auto select-none overflow-hidden"
          >
            <div
              ref={contentRef}
              style={{ opacity: 0, transform: "scale(0.88)" }}
              className="flex flex-col items-center justify-center max-w-[360px] sm:max-w-[440px] w-full p-6 sm:p-10"
            >
              {/* Elegant Eyebrow Pill with Sparkles Icon */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/[0.06] border border-neutral-900/10 mb-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <Sparkles className="size-3 text-neutral-800 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wider text-neutral-700 uppercase">
                  {subheading || "Access Portal"}
                </span>
              </div>

              {/* Core Heading */}
              <h2 className="text-2xl sm:text-4xl md:text-[42px] font-bold text-neutral-950 tracking-tight leading-[1.12]">
                {heading}
              </h2>

              {/* Optional Statement / Subtext */}
              {statement ? (
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 line-clamp-2 max-w-[320px] font-normal leading-relaxed">
                  {statement}
                </p>
              ) : null}

              {/* High-Tech Action Button & Micro-Trust Footnote */}
              <div className="mt-5 sm:mt-7 flex flex-col items-center gap-2.5">
                <a
                  href={ctaHref}
                  onClick={(e) => {
                    if (ctaHref === "#") e.preventDefault();
                    onCtaClick?.();
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white pl-4 pr-1.5 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.2)] border border-neutral-700/50 transition-all duration-200 active:scale-95 group cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase">
                    <span>{leftLabel}</span>
                    <span className="h-3 w-px bg-neutral-700" />
                    <span className="flex items-center gap-1.5">
                      <span>{rightLabel}</span>
                      <span
                        className="size-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: activeAccent }}
                      />
                    </span>
                  </div>
                  <div className="size-7 sm:size-8 rounded-full bg-neutral-800 group-hover:bg-neutral-700 flex items-center justify-center transition-colors">
                    <ArrowRight className="size-3.5 sm:size-4 stroke-[2.5] text-neutral-200 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>

                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-neutral-500 font-medium">
                  <Check className="size-3 text-emerald-600 stroke-[3]" />
                  <span>No credit card required · Instant setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div
          ref={hintRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-500 text-[10px] tracking-widest font-mono uppercase pointer-events-none select-none z-10"
        >
          <span>Scroll to expand</span>
          <ChevronDown className="size-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// Alias for ConcentricPortalCta
export const OrbitalLensCta = ConcentricPortalCta;

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
    case "concentric-portal":
    case "orbital-lens":
      return <ConcentricPortalCta {...props} />;
    case "brand-pillars":
    default:
      return <BrandPillarsCta {...props} />;
  }
}

export default CTASection;
export { CTASection as CtaSection };
