"use client";

import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import {
  Palette,
  Monitor,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Check,
  Star,
  Play,
  Signal,
  Wifi,
  Battery,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion, springTiming, usePrefersReducedMotion } from "@/lib/animate";
import { Iphone16ProMockup } from "./MobileMockupBlock";

/** How a card travels: quick into a slot, slow and weighty back to the deck. */
const TO_SLOT = springTiming({ stiffness: 240, damping: 25 });
const TO_DECK = springTiming({ stiffness: 75, damping: 16, mass: 1.1 });

/** A card's centre, size and tilt as drawn right now, even part-way through a flight. */
function measureCard(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const matrix = new DOMMatrixReadOnly(getComputedStyle(el).transform);
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    width: el.offsetWidth,
    height: el.offsetHeight,
    rotate: (Math.atan2(matrix.b, matrix.a) * 180) / Math.PI,
  };
}

/** The "drag the cards" pill drops in after the cards have landed. */
function enterPill(el: HTMLDivElement | null) {
  if (!el || prefersReducedMotion()) return;
  el.animate(
    [
      { opacity: 0, transform: "translateY(-10px)" },
      { opacity: 1, transform: "none" },
    ],
    { duration: 500, delay: 1500, easing: "ease-in-out", fill: "backwards" },
  );
}

/** Rises in when `show` turns true, and stays mounted until it has fallen back out. */
function RisePresence({
  show,
  className,
  children,
}: {
  show: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [present, setPresent] = useState(show);
  if (show && !present) setPresent(true);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      if (!show) setPresent(false);
      return;
    }
    const shown = { opacity: 1, transform: "none" };
    const animation = el.animate(
      show
        ? [{ opacity: 0, transform: "translateY(18px) scale(0.95)" }, shown]
        : [shown, { opacity: 0, transform: "translateY(12px) scale(0.95)" }],
      { duration: 350, easing: "ease-out", fill: "both" },
    );
    if (!show) animation.onfinish = () => setPresent(false);
    return () => animation.cancel();
  }, [show, present]);

  if (!present) return null;
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

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
  | "orbital-lens"
  | "offer-showcase"
  | "cta-offer-showcase"
  | "mobile-app"
  | "app-showcase"
  | "mobile-showcase"
  | "mobile-mockup";

export interface CtaSectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: CtaSectionVariant;
  color?: string;
  heading?: string;
  headingAccent?: string;
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
  // Mobile App Showcase props
  appleStoreHref?: string;
  googlePlayHref?: string;
  showAppStoreBadges?: boolean;
  userName?: string;
  userAvatar?: string;
  featuredWorkoutTitle?: string;
  featuredWorkoutImage?: string;
  workoutDuration?: string;
  workoutCalories?: string;
  phonePosition?: "left" | "right";
  cardBackground?: string;
  // Concentric Portal / Orbital Lens props
  phrase?: string;
  scrollProgress?: number;
  autoRotate?: boolean;
  // Offer Showcase props
  badge?: string;
  price?: number | string;
  compareAtPrice?: number | string;
  currency?: string;
  period?: string;
  savingsText?: string;
  footnote?: string;
  mediaItems?: string[];
  images?: string[];
  enableHoverSlowdown?: boolean;
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
  default: {
    bg: "var(--primary)",
    text: "var(--primary)",
    gradient: "from-primary to-primary/80",
  },
  lavender: {
    bg: "#9b8afb",
    text: "#9b8afb",
    gradient: "from-[#a99bfb] to-[#8d7bf9]",
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
  zinc: {
    bg: "#18181b",
    text: "#18181b",
    gradient: "from-zinc-800 to-zinc-950",
  },
};

/**
 * Universal theme color resolver:
 * Safely resolves 'default', 'primary', theme swatch names, or hex strings into concrete CSS values
 */
export function resolveThemeColor(color?: string, fallback = "var(--primary)"): string {
  if (!color || color === "default" || color === "primary") return fallback;
  const PRESET_HEX_MAP: Record<string, string> = {
    lavender: "#9b8afb",
    indigo: "#6366f1",
    rose: "#f43f5e",
    emerald: "#10b981",
    orange: "#f95716",
    zinc: "#18181b",
    primary: fallback,
    default: fallback,
  };
  return PRESET_HEX_MAP[color] || COLOR_MAP[color]?.bg || color;
}

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
  const activeAccent = resolveThemeColor(color, "var(--primary)");
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

  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const flightFrom = useRef<({ id: string } & ReturnType<typeof measureCard>) | null>(null);
  const findCard = (id: string) =>
    [...(sectionRef.current?.querySelectorAll<HTMLElement>("[data-pillar-card]") ?? [])].find(
      (el) => el.dataset.pillarCard === id,
    );

  // Cards rain into the deck on load, right to left.
  useLayoutEffect(() => {
    if (!hasMounted || prefersReducedMotion()) return;
    sectionRef.current?.querySelectorAll<HTMLElement>("[data-pillar-card]").forEach((el) => {
      const y = Number(el.dataset.restY);
      const rotate = Number(el.dataset.restRotate);
      el.animate(
        [
          { opacity: 0, transform: `translateY(-750px) rotate(${rotate * 2}deg) scale(0.9)` },
          { opacity: 1, transform: `translateY(${y}px) rotate(${rotate}deg) scale(1)` },
        ],
        { ...TO_DECK, delay: (RAIN_DELAYS[el.dataset.pillarCard ?? ""] ?? 0) * 1000, fill: "backwards" },
      );
    });
  }, [hasMounted]);

  // A placed or returned card is a new element in a new spot. It starts at the
  // old one's position and size and flies to its own. Width and height animate
  // rather than scale, so the text on the card never stretches.
  useLayoutEffect(() => {
    const from = flightFrom.current;
    flightFrom.current = null;
    if (!from || prefersReducedMotion()) return;
    const el = findCard(from.id);
    if (!el) return;
    const to = measureCard(el);
    const restY = Number(el.dataset.restY);
    const left = el.offsetLeft;
    const dx = from.x - (to.x - to.width / 2) - from.width / 2;
    const dy = from.y - (to.y - restY - to.height / 2) - from.height / 2;
    el.animate(
      [
        {
          left: `${left}px`,
          right: "auto",
          width: `${from.width}px`,
          height: `${from.height}px`,
          transform: `translate(${dx}px, ${dy}px) rotate(${from.rotate}deg)`,
        },
        {
          left: `${left}px`,
          right: "auto",
          width: `${to.width}px`,
          height: `${to.height}px`,
          transform: `translate(0px, ${restY}px) rotate(${to.rotate}deg)`,
        },
      ],
      el.dataset.restSlot ? TO_SLOT : TO_DECK,
    );
  }, [placedCardIds]);

  // Active flying animations to ensure moving cards are always on top of EVERYTHING
  const [activeFlyingCards, setActiveFlyingCards] = useState<Record<string, "toSlot" | "toDeck">>({});
  const flyingTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Toggle or place card
  const handlePlaceCard = (id: string) => {
    const isCurrentlyPlaced = placedCardIds.includes(id);
    const direction: "toSlot" | "toDeck" = isCurrentlyPlaced ? "toDeck" : "toSlot";

    const card = findCard(id);
    if (card) flightFrom.current = { id, ...measureCard(card) };

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
      ref={sectionRef}
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
                      <div
                        data-pillar-card={pillar.id}
                        data-rest-y={0}
                        data-rest-slot=""
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
                      </div>
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
                            <div
                              className="h-full rounded-full transition-[width] duration-[800ms] ease-out motion-reduce:transition-none"
                              style={{
                                width: isPlaced ? "100%" : `${pillar.baselineScore ?? 25}%`,
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
                <div
                  ref={enterPill}
                  style={hasMounted ? undefined : { opacity: 0 }}
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
                </div>
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
                  const currentRotate = isMobile
                    ? (MOBILE_ROTATIONS[pillar.id] ?? (index % 2 === 0 ? -5 : 5))
                    : cfg.rotate;
                  // On mobile, slight vertical offset (index * 5) so cards peek out according to index
                  const currentY = isMobile ? (index * 5) : cfg.offsetY;

                  return (
                    <div
                      key={pillar.id}
                      data-pillar-card={pillar.id}
                      data-rest-y={currentY}
                      data-rest-rotate={currentRotate}
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
                        opacity: hasMounted ? 1 : 0,
                        transform: hasMounted
                          ? `translateY(${currentY}px) rotate(${currentRotate}deg)`
                          : `translateY(-750px) rotate(${currentRotate * 2}deg) scale(0.9)`,
                        transition: reduceMotion ? undefined : `transform ${TO_DECK.duration}ms ${TO_DECK.easing}`,
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
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* BOTTOM CTA BUTTON (Matches Framer when 100% complete) */}
        {/* ======================================================== */}
        <RisePresence show={isAllPlaced} className="mt-8 flex justify-center">
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
        </RisePresence>
      </div>
    </section>
  );
}

// ==========================================
// MINIMAL CTA VARIANT
// ==========================================
function MinimalCta({
  color,
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
  const activeAccent = resolveThemeColor(color, "var(--primary)");
  const dynamicRadius =
    rounded !== undefined
      ? typeof rounded === "number"
        ? `${rounded}px`
        : rounded
      : "var(--radius, 1rem)";

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
  color,
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
  const activeAccent = resolveThemeColor(color, "var(--primary)");
  const dynamicRadius =
    rounded !== undefined
      ? typeof rounded === "number"
        ? `${rounded}px`
        : rounded
      : "var(--radius, 1rem)";

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

  const activeAccent = resolveThemeColor(color, "var(--primary)");

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
// CTA OFFER SHOWCASE VARIANT (FRAMER REPLICA)
// Central high-impact offer card flanked by moving nature reels
// ==========================================
export const DEFAULT_OFFER_NATURE_IMAGES: string[] = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145142/photo-1511671782779-c97d3d27a1d4-1790145143493.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1550684848-fac1c5b4e853-1790145143489.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790166049/pexels-photo-7688336-1790166052227.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790166049/pexels-photo-8867434-1790166052229.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790166049/pexels-photo-7658387-1790166052226.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790166049/pexels-photo-7709086-1790166052228.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145139/pexels-photo-7709208-1790145143489.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145139/pexels-photo-1036623-1790145143487.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145142/pexels-photo-2043590-1790145143488.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145139/pexels-photo-1587009-1790145143488.jpg",
];

function ReelLane({
  images,
  direction = "up",
  duration = 32,
  isSlowed = false,
  className,
}: {
  images: string[];
  direction?: "up" | "down";
  duration?: number;
  isSlowed?: boolean;
  className?: string;
}) {
  const laneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!laneRef.current) return;
    const anims = laneRef.current.getAnimations({ subtree: true });
    anims.forEach((a) => {
      a.playbackRate = isSlowed ? 0.25 : 1;
    });
  }, [isSlowed]);

  // Ensure minimum 8 images in a set so that the set height comfortably exceeds the entire viewport
  const setImages = useMemo(() => {
    if (!images || images.length === 0) return DEFAULT_OFFER_NATURE_IMAGES.slice(0, 8);
    let list = [...images];
    while (list.length < 8) {
      list = [...list, ...images];
    }
    return list;
  }, [images]);

  return (
    <div
      ref={laneRef}
      className={cn(
        "relative overflow-hidden h-full min-h-[720px] xs:min-h-[820px] sm:min-h-[960px] md:min-h-[1100px] shrink-0 select-none pointer-events-auto",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col will-change-transform",
          direction === "up" ? "animate-cta-reel-up" : "animate-cta-reel-down",
        )}
        style={{
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {/* Set 1: Full set with trailing gap via padding-bottom */}
        <div className="flex flex-col gap-3 sm:gap-3.5 pb-3 sm:pb-3.5 shrink-0">
          {setImages.map((src, i) => (
            <div
              key={`s1-${i}`}
              className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-border/40 dark:border-white/10 bg-muted/40 shadow-sm shrink-0 select-none"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-cover select-none pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* Set 2: Exact identical duplicate set with matching trailing gap so loop is 100% seamless with zero jumps */}
        <div className="flex flex-col gap-3 sm:gap-3.5 pb-3 sm:pb-3.5 shrink-0" aria-hidden="true">
          {setImages.map((src, i) => (
            <div
              key={`s2-${i}`}
              className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-border/40 dark:border-white/10 bg-muted/40 shadow-sm shrink-0 select-none"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-cover select-none pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OfferShowcaseCta({
  badge = "Limited launch offer",
  heading = "Everything you need, one payment",
  subheading = "Lifetime access to every current and future release. No subscription, no renewals.",
  statement,
  price = 149,
  compareAtPrice = 349,
  currency = "$",
  period = "one-time",
  savingsText = "Save 57%",
  ctaText = "Claim the offer",
  ctaHref = "#",
  onCtaClick,
  footnote = "Secure checkout · 14-day refund",
  mediaItems,
  images,
  color,
  rounded,
  className,
  style,
  ...props
}: CtaSectionProps) {
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  const activeAccent = resolveThemeColor(color, "var(--primary)");
  const dynamicRadius =
    rounded !== undefined
      ? typeof rounded === "number"
        ? `${rounded}px`
        : rounded
      : "var(--radius, 1rem)";

  const numPrice = typeof price === "number" ? price : parseFloat(String(price)) || 149;
  const descriptionText = statement || subheading;

  // Prefer images, then mediaItems, falling back to default Cloudinary nature collection
  const rawList = images && images.length > 0 ? images : (mediaItems && mediaItems.length > 0 ? mediaItems : DEFAULT_OFFER_NATURE_IMAGES);
  const items = rawList.length >= 4 ? rawList : DEFAULT_OFFER_NATURE_IMAGES;

  // Distribute items across the 4 vertical lanes evenly
  const lane1: string[] = [];
  const lane2: string[] = [];
  const lane3: string[] = [];
  const lane4: string[] = [];

  items.forEach((src, idx) => {
    const laneIdx = idx % 4;
    if (laneIdx === 0) lane1.push(src);
    else if (laneIdx === 1) lane2.push(src);
    else if (laneIdx === 2) lane3.push(src);
    else lane4.push(src);
  });

  const safeLane1 = lane1.length > 0 ? lane1 : DEFAULT_OFFER_NATURE_IMAGES.slice(0, 4);
  const safeLane2 = lane2.length > 0 ? lane2 : DEFAULT_OFFER_NATURE_IMAGES.slice(4, 8);
  const safeLane3 = lane3.length > 0 ? lane3 : DEFAULT_OFFER_NATURE_IMAGES.slice(8, 12);
  const safeLane4 = lane4.length > 0 ? lane4 : DEFAULT_OFFER_NATURE_IMAGES.slice(12, 16);

  return (
    <section
      className={cn(
        "group/cta-showcase relative w-full min-h-[560px] xs:min-h-[620px] sm:min-h-[720px] lg:min-h-[780px] overflow-hidden bg-[#F3F1EC] dark:bg-[#0E0E10] text-[#141414] dark:text-[#F4F4F2] flex items-center justify-center py-12 sm:py-20 px-3 sm:px-6 select-none",
        className,
      )}
      style={style}
      {...props}
    >
      <style>{`
        @keyframes cta-reel-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes cta-reel-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-cta-reel-up {
          animation: cta-reel-up 54s linear infinite;
        }
        .animate-cta-reel-down {
          animation: cta-reel-down 62s linear infinite;
        }
        @keyframes cta-dot-ping {
          0% { box-shadow: 0 0 0 0 rgba(232, 84, 46, 0.55); }
          75%, 100% { box-shadow: 0 0 0 7px transparent; }
        }
        .animate-cta-dot-ping {
          animation: cta-dot-ping 2.4s cubic-bezier(0.3, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* 3D Flanking Media Reels Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Left Side (3D Perspective tilt with rotateY & rotate, exactly matching Framer) */}
        <div
          className="absolute top-0 bottom-0 left-0 w-1/2 pointer-events-auto"
          style={{
            perspective: "1100px",
            perspectiveOrigin: "0% 50%",
            WebkitMaskImage: "linear-gradient(to right, #000 22%, transparent 82%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
            maskImage: "linear-gradient(to right, #000 22%, transparent 82%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
          onMouseEnter={() => setLeftHovered(true)}
          onMouseLeave={() => setLeftHovered(false)}
        >
          <div
            className="absolute -top-[25%] h-[150%] flex gap-2.5 sm:gap-3.5 left-2.5 xs:left-4 sm:left-7 md:left-9 origin-[0%_50%]"
            style={{
              transform: "rotate(-6deg) rotateY(14deg)",
            }}
          >
            {/* Lane 1: Primary visible lane on mobile & desktop */}
            <ReelLane
              images={safeLane1}
              direction="up"
              duration={52}
              isSlowed={leftHovered}
              className="w-[84px] xs:w-[94px] sm:w-[130px] md:w-[160px] lg:w-[190px]"
            />
            {/* Lane 2: Outer lane on desktop (hidden on small mobile screens <=720px exactly per Framer spec) */}
            <ReelLane
              images={safeLane2}
              direction="down"
              duration={62}
              isSlowed={leftHovered}
              className="hidden sm:block sm:w-[130px] md:w-[160px] lg:w-[190px]"
            />
          </div>
        </div>

        {/* Right Side (3D Perspective tilt with rotateY & rotate, exactly matching Framer) */}
        <div
          className="absolute top-0 bottom-0 right-0 w-1/2 pointer-events-auto"
          style={{
            perspective: "1100px",
            perspectiveOrigin: "100% 50%",
            WebkitMaskImage: "linear-gradient(to left, #000 22%, transparent 82%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
            maskImage: "linear-gradient(to left, #000 22%, transparent 82%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
          onMouseEnter={() => setRightHovered(true)}
          onMouseLeave={() => setRightHovered(false)}
        >
          <div
            className="absolute -top-[25%] h-[150%] flex flex-row-reverse gap-2.5 sm:gap-3.5 right-2.5 xs:right-4 sm:right-7 md:right-9 origin-[100%_50%]"
            style={{
              transform: "rotate(6deg) rotateY(-14deg)",
            }}
          >
            {/* Lane 3: Primary visible lane on mobile & desktop */}
            <ReelLane
              images={safeLane3}
              direction="down"
              duration={56}
              isSlowed={rightHovered}
              className="w-[84px] xs:w-[94px] sm:w-[130px] md:w-[160px] lg:w-[190px]"
            />
            {/* Lane 4: Outer lane on desktop (hidden on small mobile screens <=720px exactly per Framer spec) */}
            <ReelLane
              images={safeLane4}
              direction="up"
              duration={66}
              isSlowed={rightHovered}
              className="hidden sm:block sm:w-[130px] md:w-[160px] lg:w-[190px]"
            />
          </div>
        </div>
      </div>

      {/* Edge gradient vignettes (top & bottom smooth fade to section background) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-36 bg-gradient-to-b from-[#F3F1EC] dark:from-[#0E0E10] via-[#F3F1EC]/90 dark:via-[#0E0E10]/90 to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-36 bg-gradient-to-t from-[#F3F1EC] dark:from-[#0E0E10] via-[#F3F1EC]/90 dark:via-[#0E0E10]/90 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Vertical center wash running top-to-bottom behind the card across all screens (ComponentWall 2nd variant style) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-[42rem] sm:max-w-[52rem] -translate-x-1/2 bg-[radial-gradient(closest-side,#F3F1EC_60%,transparent)] dark:bg-[radial-gradient(closest-side,#0E0E10_60%,transparent)] z-10"
        aria-hidden="true"
      />

      {/* Central High-Impact Ticket Offer Card (Clean Minimalist Ticket with real radial-gradient bite notches) */}
      <div className="relative z-20 w-full max-w-[min(468px,calc(100%-20px))] sm:max-w-[420px] md:max-w-[468px] mx-auto filter drop-shadow-[0_28px_56px_rgba(20,20,20,0.08)] dark:drop-shadow-[0_28px_56px_rgba(0,0,0,0.6)] flex flex-col items-center text-center">
        {/* Top Half of Card: Badge, Heading, Subtitle */}
        <div
          className="w-full bg-white dark:bg-[#18181B] border border-[rgba(20,20,20,0.10)] dark:border-[rgba(255,255,255,0.10)] border-b-0 p-5 xs:p-6 sm:p-8 pb-3.5 sm:pb-5 flex flex-col items-center"
          style={{
            borderTopLeftRadius: dynamicRadius,
            borderTopRightRadius: dynamicRadius,
            WebkitMaskImage: "radial-gradient(circle at 0% 100%, transparent 12px, #000 12.5px), radial-gradient(circle at 100% 100%, transparent 12px, #000 12.5px)",
            maskImage: "radial-gradient(circle at 0% 100%, transparent 12px, #000 12.5px), radial-gradient(circle at 100% 100%, transparent 12px, #000 12.5px)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        >
          {badge && (
            <span
              style={{ borderRadius: dynamicRadius }}
              className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 border border-[rgba(20,20,20,0.10)] dark:border-[rgba(255,255,255,0.12)] bg-neutral-50/60 dark:bg-white/5 text-[11px] sm:text-[13px] font-medium text-[#141414] dark:text-[#F4F4F2] mb-3 sm:mb-4"
            >
              <span className="size-[7px] rounded-full shrink-0 animate-cta-dot-ping" style={{ backgroundColor: activeAccent }} />
              <span>{badge}</span>
            </span>
          )}

          <h2 className="text-xl xs:text-2xl sm:text-[34px] md:text-[36px] font-semibold tracking-[-0.02em] text-[#141414] dark:text-[#F4F4F2] leading-[1.12]">
            {heading}
          </h2>

          {descriptionText && (
            <p className="mt-2 text-xs xs:text-[13px] sm:text-[15px] text-[#6E6A64] dark:text-[#9C9CA3] leading-[1.5] max-w-[340px] sm:max-w-[380px]">
              {descriptionText}
            </p>
          )}
        </div>

        {/* Bottom Half of Card: Price, Savings Chip, CTA Button, Footnote */}
        <div
          className="relative w-full bg-white dark:bg-[#18181B] border border-[rgba(20,20,20,0.10)] dark:border-[rgba(255,255,255,0.10)] border-t-0 p-5 xs:p-6 sm:p-8 pt-3.5 sm:pt-5 flex flex-col items-center"
          style={{
            borderBottomLeftRadius: dynamicRadius,
            borderBottomRightRadius: dynamicRadius,
            WebkitMaskImage: "radial-gradient(circle at 0% 0%, transparent 12px, #000 12.5px), radial-gradient(circle at 100% 0%, transparent 12px, #000 12.5px)",
            maskImage: "radial-gradient(circle at 0% 0%, transparent 12px, #000 12.5px), radial-gradient(circle at 100% 0%, transparent 12px, #000 12.5px)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        >
          {/* Dashed Perforation Line Connecting the Left & Right Notches */}
          <div
            className="absolute top-0 left-5 right-5 border-t-[1.5px] border-dashed border-[rgba(20,20,20,0.15)] dark:border-[rgba(255,255,255,0.15)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Price display with superscript currency */}
          <div className="flex items-baseline justify-center text-[#141414] dark:text-[#F4F4F2]">
            <span className="text-xl xs:text-2xl sm:text-3xl font-semibold -translate-y-1 sm:-translate-y-2 mr-0.5 font-sans">
              {currency}
            </span>
            <span className="text-4xl xs:text-5xl sm:text-[62px] font-semibold tracking-[-0.035em] leading-none tabular-nums font-sans">
              <AnimatedNumber value={numPrice} duration={1} />
            </span>
            {period && (
              <span className="text-xs sm:text-[14px] font-medium text-[#6E6A64] dark:text-[#9C9CA3] ml-2 font-sans">
                {period}
              </span>
            )}
          </div>

          {/* Strikethrough & Savings Tag */}
          {(compareAtPrice || savingsText) && (
            <div className="mt-2.5 flex items-center justify-center gap-2.5">
              {compareAtPrice && (
                <s className="text-sm sm:text-[16px] text-[#6E6A64] dark:text-[#9C9CA3] font-normal decoration-[1.5px]">
                  {currency}{compareAtPrice}
                </s>
              )}
              {savingsText && (
                <span
                  style={{ borderRadius: dynamicRadius }}
                  className="inline-flex items-center px-2.5 py-1 text-[11px] sm:text-[12px] font-semibold text-[#E8542E] dark:text-[#FF7A4D] bg-[color-mix(in_srgb,#E8542E_14%,transparent)] dark:bg-[color-mix(in_srgb,#FF7A4D_18%,transparent)]"
                >
                  {savingsText}
                </span>
              )}
            </div>
          )}

          {/* CTA Button */}
          <a
            href={ctaHref}
            onClick={(e) => {
              if (ctaHref === "#") e.preventDefault();
              onCtaClick?.();
            }}
            style={{ borderRadius: dynamicRadius }}
            className="mt-4 sm:mt-5 w-full py-3 sm:py-3.5 px-6 font-semibold text-xs sm:text-[15px] bg-[#141414] hover:bg-black dark:bg-[#F4F4F2] dark:hover:bg-white text-white dark:text-[#0E0E10] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.985] flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <span>{ctaText}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="size-3.5 sm:size-4 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Footnote */}
          {footnote && (
            <p className="mt-3 text-[11px] sm:text-[12px] text-[#6E6A64] dark:text-[#9C9CA3] font-normal">
              {footnote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// MOBILE APP SHOWCASE CTA (IPHONE MOCKUP)
// Two-Section Transition: Section 1 (Center Phone) -> Section 2 (Left Phone + Right Content)
// Driven by Parent Scroll / Wheel / Touch / Stepper
// ==========================================
export function MobileAppCta({
  heading = "Aura Clearmind..\nYour partner in wellness.",
  headingAccent = "Your partner",
  subheading = "Find and book your favorite yoga classes, guided meditation, and daily mindful wellness sessions from anywhere with our all-in-one mobile app, designed to bring balance, clarity, and peace to your life.",
  statement,
  badge = "Mobile App Available",
  appleStoreHref = "#",
  googlePlayHref = "#",
  showAppStoreBadges = true,
  userName = "Alicia Regis",
  userAvatar = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145142/pexels-photo-2043590-1790145143488.jpg",
  featuredWorkoutTitle = "Wellness Workshops",
  featuredWorkoutImage = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  workoutDuration = "10 Min",
  workoutCalories = "300 Kcal",
  color,
  scrollProgress,
  phonePosition = "left",
  cardBackground,
  rounded,
  className,
  style,
  ...props
}: CtaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const phoneColRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(
    scrollProgress !== undefined ? Math.max(0, Math.min(1, scrollProgress)) : 0,
  );
  const targetProgressRef = useRef(
    scrollProgress !== undefined ? Math.max(0, Math.min(1, scrollProgress)) : 0,
  );
  const [shiftDeltaX, setShiftDeltaX] = useState(290);

  const activeAccent = resolveThemeColor(color, "var(--primary)");
  const descriptionText = subheading || statement;

  // Dynamic radius variables bound directly to global --radius token from the theme customizer sidebar
  const dynamicRadius =
    rounded !== undefined
      ? typeof rounded === "number"
        ? `${rounded}px`
        : rounded
      : "var(--radius, 1rem)";
  const containerRadius = dynamicRadius;
  const cardRadius = dynamicRadius;
  const buttonRadius = dynamicRadius;
  const pillRadius = dynamicRadius;
  const iconRadius = dynamicRadius;

  // Sync if external scrollProgress prop is passed
  useEffect(() => {
    if (scrollProgress !== undefined) {
      targetProgressRef.current = Math.max(0, Math.min(1, scrollProgress));
    }
  }, [scrollProgress]);

  // Dynamically calculate exact pixel distance from side column to center of stage
  useLayoutEffect(() => {
    const updateDelta = () => {
      if (stageRef.current && phoneColRef.current) {
        const stageRect = stageRef.current.getBoundingClientRect();
        const colRect = phoneColRef.current.getBoundingClientRect();
        const stageCenter = stageRect.left + stageRect.width / 2;
        const colCenter = colRect.left + colRect.width / 2;
        const isDesktop = window.innerWidth >= 1024;
        setShiftDeltaX(isDesktop ? Math.round(stageCenter - colCenter) : 0);
      }
    };

    updateDelta();
    const timer1 = setTimeout(updateDelta, 60);
    const timer2 = setTimeout(updateDelta, 240);
    window.addEventListener("resize", updateDelta);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", updateDelta);
    };
  }, [phonePosition]);

  // 60FPS RAF Spring Lerp loop for buttery-smooth transition
  useEffect(() => {
    let current = targetProgressRef.current;
    let active = true;
    let rafId: number | null = null;

    const tick = () => {
      if (!active) return;
      const target = targetProgressRef.current;
      const diff = target - current;
      if (Math.abs(diff) > 0.0006) {
        current += diff * 0.18;
        setProgress(current);
      } else if (current !== target) {
        current = target;
        setProgress(target);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // 1. Direct Mouse Wheel listener with passive: false to drive the animation immediately
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 1) return;

      const current = targetProgressRef.current;
      // Smooth scrubbing sensitivity: ~3 gentle wheel notches transition fully
      const step = e.deltaY * 0.0022;
      const next = Math.max(0, Math.min(1, current + step));

      const isScrollingDown = step > 0;
      const isScrollingUp = step < 0;

      // While between 0 and 1, intercept wheel to animate transition smoothly
      if (
        (isScrollingDown && current < 0.99) ||
        (isScrollingUp && current > 0.01)
      ) {
        e.preventDefault();
        e.stopPropagation();
        targetProgressRef.current = next;
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, []);

  // 2. Touch gesture listener for mobile and tablets
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      if (Math.abs(deltaY) < 4) return;

      const current = targetProgressRef.current;
      const step = deltaY * 0.0035;
      const next = Math.max(0, Math.min(1, current + step));

      const isScrollingDown = step > 0;
      const isScrollingUp = step < 0;

      if (
        (isScrollingDown && current < 0.99) ||
        (isScrollingUp && current > 0.01)
      ) {
        if (e.cancelable) e.preventDefault();
        targetProgressRef.current = next;
        touchStartY = currentY;
      }
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  // 3. Fallback: Page scroll observer when placed inside a standard tall website page
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (scrollProgress !== undefined) return;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const triggerStart = vh * 0.8;
      const triggerEnd = vh * 0.2;
      const dist = triggerStart - triggerEnd;
      if (dist > 0 && rect.top <= triggerStart && rect.bottom >= triggerEnd) {
        const p = Math.max(0, Math.min(1, (triggerStart - rect.top) / dist));
        targetProgressRef.current = p;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollProgress]);

  // Easing computations
  const ease = 1 - Math.pow(1 - progress, 3);
  const phoneShiftX = Math.round(shiftDeltaX * (1 - ease));
  const phoneShiftY = 0; // Strictly vertically centered at all stages of motion

  // Section 2 card background & right content reveal
  const sec2Opacity = Math.max(0, Math.min(1, (progress - 0.12) / 0.88));
  const sec2Ease = 1 - Math.pow(1 - sec2Opacity, 3);
  const contentShiftX = Math.round((1 - sec2Ease) * (phonePosition === "left" ? 35 : -35));

  // Split heading into 2 clean lines: Upper line shorter width, Lower line wider width
  const heading2Lines = useMemo(() => {
    if (heading.includes("\n")) {
      const [l1, ...rest] = heading.split("\n");
      return { line1: l1.trim(), line2: rest.join(" ").trim() };
    }
    if (heading.includes(",")) {
      const idx = heading.indexOf(",");
      return {
        line1: heading.slice(0, idx + 1).trim(),
        line2: heading.slice(idx + 1).trim(),
      };
    }
    const words = heading.split(" ");
    const splitIndex = Math.max(1, Math.floor(words.length * 0.35));
    return {
      line1: words.slice(0, splitIndex).join(" "),
      line2: words.slice(splitIndex).join(" "),
    };
  }, [heading]);

  const isPhoneOnLeft = phonePosition === "left";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-6xl mx-auto select-none overflow-hidden min-h-[700px] sm:min-h-[720px] lg:min-h-[740px] flex items-center justify-center transition-colors border border-neutral-200/60 dark:border-white/10",
        className,
      )}
      style={{
        borderRadius: containerRadius,
        ...style,
      }}
      {...props}
    >
      {/* =========================================
          SECTION 2 (SHOWCASE PHASE: AUTHENTIC WELLNESS SAGE CARD)
          ========================================= */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500 shadow-xl overflow-hidden"
        style={{
          opacity: sec2Ease,
          transform: `scale(${0.96 + 0.04 * sec2Ease})`,
          borderRadius: containerRadius,
          background: cardBackground
            ? cardBackground
            : `linear-gradient(135deg, ${activeAccent} 0%, color-mix(in srgb, ${activeAccent} 78%, #0f1c12) 100%)`,
        }}
        aria-hidden="true"
      >
        {/* Dark mode overlay so custom colors blend smoothly in dark mode */}
        <div
          className="absolute inset-0 hidden dark:block bg-black/60 pointer-events-none"
          style={{ borderRadius: containerRadius }}
        />

        {/* Soft Ambient Radial Lighting */}
        <div
          className="absolute -right-20 -bottom-20 w-[450px] h-[450px] rounded-full blur-[80px] opacity-30 pointer-events-none bg-white/20 dark:bg-white/5"
          aria-hidden="true"
        />
      </div>

      {/* =========================================
          STAGE CONTENT GRID
          ========================================= */}
      <div
        ref={stageRef}
        className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-6 sm:p-8 md:p-10 overflow-hidden"
      >
        {/* =========================================
            PHONE COLUMN (MOCKUP WITH SMOOTH GLIDE MOTION)
            Glides smoothly from Center (Section 1) to Side (Section 2)
            ========================================= */}
        <div
          ref={phoneColRef}
          className={cn(
            "flex justify-center items-center relative z-20 my-auto self-center",
            isPhoneOnLeft
              ? "lg:col-span-5 lg:order-1"
              : "lg:col-start-8 lg:col-span-5 lg:order-2",
          )}
        >
          {/* Circular backdrop disc behind the phone (matching screenshot) */}
          <div
            className="absolute size-[360px] sm:size-[420px] rounded-full border border-white/20 dark:border-white/5 pointer-events-none transition-opacity duration-500 shadow-inner"
            style={{
              opacity: sec2Ease,
              backgroundColor: `color-mix(in srgb, ${activeAccent} 80%, white)`,
            }}
            aria-hidden="true"
          />

          {/* iPhone Mockup Container with Motion */}
          <div
            style={{
              transform: `translate(${phoneShiftX}px, ${phoneShiftY}px)`,
              willChange: "transform",
              transition: "none",
            }}
            className="relative flex items-center justify-center"
          >
            <div className="scale-[0.82] xs:scale-[0.88] sm:scale-[0.94] lg:scale-100 origin-center transition-transform">
              <Iphone16ProMockup
                className="w-[330px] h-[680px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_70px_-20px_rgba(0,0,0,0.85)]"
              >
                {/* Screen Content: Authentic Yoga & Wellness App Interface */}
                <div className="relative w-full h-full flex flex-col justify-between bg-white dark:bg-[#141418] text-neutral-900 dark:text-neutral-100 p-4 pt-11 pb-4 select-none font-sans overflow-hidden">
                  {/* Status Bar */}
                  <div className="absolute top-2.5 inset-x-0 px-6 flex items-center justify-between text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 z-30 pointer-events-none">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                      <Signal size={11} />
                      <Wifi size={11} />
                      <Battery size={13} className="fill-current" />
                    </div>
                  </div>

                  {/* Main App Feed */}
                  <div className="space-y-3">
                    {/* Greeting & Avatar */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 block">
                          Hello
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white tracking-tight">
                          {userName}
                        </h4>
                      </div>
                      <div className="size-8 rounded-full bg-gradient-to-tr from-emerald-600 to-lime-500 p-0.5 shadow-sm">
                        <img
                          src={userAvatar}
                          alt={userName}
                          className="size-full rounded-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Level / Filter Pills */}
                    <div className="flex items-center gap-1.5">
                      {["Beginner", "Intermediate", "Advanced"].map((level, i) => (
                        <span
                          key={level}
                          style={{ borderRadius: pillRadius }}
                          className={cn(
                            "text-[9px] sm:text-[10px] font-medium px-2.5 py-1 transition-colors cursor-pointer",
                            i === 1
                              ? "bg-[#172e1b] text-white font-semibold shadow-xs"
                              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700",
                          )}
                        >
                          {level}
                        </span>
                      ))}
                    </div>

                    {/* Popular Workouts Card */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] sm:text-xs font-bold text-neutral-900 dark:text-white">
                          Popular Workouts
                        </span>
                        <span className="text-[9px] text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer">
                          See all
                        </span>
                      </div>

                      <div
                        className="relative w-full h-32 overflow-hidden shadow-sm group cursor-pointer"
                        style={{ borderRadius: cardRadius }}
                      >
                        <img
                          src={featuredWorkoutImage}
                          alt={featuredWorkoutTitle}
                          className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 flex flex-col justify-between text-white">
                          <span className="text-[11px] sm:text-xs font-bold tracking-tight">
                            {featuredWorkoutTitle}
                          </span>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-[9px] font-medium">
                              <span
                                style={{ borderRadius: pillRadius }}
                                className="px-2 py-0.5 bg-[#ebf071] text-[#172e1b] font-semibold"
                              >
                                {workoutDuration}
                              </span>
                              <span
                                style={{ borderRadius: pillRadius }}
                                className="px-2 py-0.5 bg-[#ebf071] text-[#172e1b] font-semibold"
                              >
                                {workoutCalories}
                              </span>
                            </div>
                            <div
                              style={{ borderRadius: pillRadius }}
                              className="size-6 bg-white text-black grid place-items-center shadow-md"
                            >
                              <Play size={10} className="fill-current translate-x-0.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Today's Plan Item */}
                    <div className="space-y-1">
                      <span className="text-[11px] sm:text-xs font-bold text-neutral-900 dark:text-white">
                        Today Plan
                      </span>
                      <div
                        style={{ borderRadius: cardRadius }}
                        className="flex items-center gap-2.5 p-2 border border-neutral-200/80 dark:border-white/10 bg-neutral-50/80 dark:bg-white/[0.03]"
                      >
                        <div
                          style={{ borderRadius: iconRadius }}
                          className="size-8 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 grid place-items-center shrink-0"
                        >
                          <Sparkles size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block text-[10px] sm:text-[11px] font-semibold text-neutral-900 dark:text-white truncate">
                            Morning Mindfulness
                          </span>
                          <span className="block text-[8px] sm:text-[9px] text-neutral-500 dark:text-neutral-400">
                            15 mins · Guided Audio
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          85%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Iphone16ProMockup>
            </div>
          </div>
        </div>

        {/* =========================================
            EDITORIAL CONTENT COLUMN (SECTION 2 REVEAL)
            Reveals on the side as Section 2 emerges
            ========================================= */}
        <div
          className={cn(
            "flex flex-col items-start text-left z-10 max-w-xl",
            isPhoneOnLeft
              ? "lg:col-span-7 lg:order-2 lg:pl-4 xl:pl-8"
              : "lg:col-span-7 lg:order-1 lg:pr-4 xl:pr-8",
          )}
          style={{
            opacity: sec2Ease,
            transform: `translateX(${contentShiftX}px)`,
            pointerEvents: sec2Opacity > 0.6 ? "auto" : "none",
            willChange: "transform, opacity",
            transition: "none",
          }}
        >
          {/* Top Pill Badge */}
          {badge && (
            <div
              style={{ borderRadius: pillRadius }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-black/10 dark:border-white/15 bg-white/75 dark:bg-white/10 backdrop-blur-md text-xs font-semibold text-[#142918] dark:text-neutral-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-5"
            >
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-emerald-600 dark:bg-emerald-400" />
              </span>
              <span className="tracking-tight">{badge}</span>
            </div>
          )}

          {/* Main Editorial Headline: Bold, Large 2-Line High-Impact Typography */}
          <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[44px] xl:text-[46px] font-bold tracking-tight text-[#0d2212] dark:text-white leading-[1.12] w-full">
            <span className="block whitespace-nowrap">{heading2Lines.line1}</span>
            <span className="block mt-1 sm:mt-1.5 whitespace-nowrap">{heading2Lines.line2}</span>
          </h2>

          {/* Subheading: Strictly in 2 Clean Balanced Lines */}
          {descriptionText && (
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-[16px] text-[#243d29] dark:text-neutral-300 leading-relaxed font-normal max-w-[560px] tracking-normal">
              {descriptionText}
            </p>
          )}

          {/* App Store & Google Play Store Badges */}
          {showAppStoreBadges && (
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              {/* Apple App Store Badge */}
              <a
                href={appleStoreHref}
                style={{ borderRadius: buttonRadius }}
                className="inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-black text-white hover:bg-neutral-900 border border-neutral-800 shadow-[0_4px_14px_rgba(0,0,0,0.22)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.32)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
                aria-label="Download on the App Store"
              >
                <svg className="size-5 sm:size-6 fill-current shrink-0 group-hover:scale-105 transition-transform" viewBox="0 0 170 170" aria-hidden="true">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.03-7.61-7.79-11.73-14.28-5.88-9.25-10.4-19.46-13.56-30.64-3.17-11.18-4.75-21.84-4.75-31.98 0-14.18 3.65-26.06 10.96-35.63 7.3-9.58 16.5-14.48 27.59-14.72 5.02 0 10.44 1.25 16.27 3.75 5.82 2.5 9.77 3.78 11.83 3.83 1.85 0 5.96-1.33 12.33-3.98 6.37-2.66 11.96-3.88 16.78-3.67 12.56.63 22.84 5.38 30.84 14.25-11.04 6.72-16.43 15.93-16.18 27.63.26 9.38 3.84 17.29 10.74 23.72 6.9 6.43 15.11 10.15 24.63 11.16-2.22 6.84-4.88 13.7-7.98 20.59zM119.22 33.02c0-7.39 2.66-14.28 7.98-20.67 5.32-6.39 11.75-10.51 19.3-12.35 1.05 7.6-1.16 14.77-6.63 21.5-5.47 6.73-12.35 10.57-20.65 11.52z" />
                </svg>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[9px] sm:text-[10px] text-neutral-300 font-sans tracking-wide">Download on the</span>
                  <span className="text-xs sm:text-sm font-semibold tracking-tight text-white mt-0.5">App Store</span>
                </div>
              </a>

              {/* Google Play Store Badge */}
              <a
                href={googlePlayHref}
                style={{ borderRadius: buttonRadius }}
                className="inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-black text-white hover:bg-neutral-900 border border-neutral-800 shadow-[0_4px_14px_rgba(0,0,0,0.22)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.32)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
                aria-label="Get it on Google Play"
              >
                <svg className="size-5 sm:size-6 shrink-0 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#EA4335" d="M3.6 1.48L14.07 12 3.6 22.52c-.37-.41-.6-.97-.6-1.61V3.09c0-.64.23-1.2.6-1.61z" />
                  <path fill="#FBBC04" d="M17.58 8.52L14.07 12l3.51 3.48 4.02-2.3c.7-.4.7-1.96 0-2.36l-4.02-2.3z" />
                  <path fill="#4285F4" d="M14.07 12L3.6 1.48C4.08 1.15 4.7 1.05 5.3 1.4l12.28 7.12L14.07 12z" />
                  <path fill="#34A853" d="M14.07 12l3.51 3.48L5.3 22.6c-.6.35-1.22.25-1.7-.08L14.07 12z" />
                </svg>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[9px] sm:text-[10px] text-neutral-300 font-sans tracking-wide uppercase">Get it on</span>
                  <span className="text-xs sm:text-sm font-semibold tracking-tight text-white mt-0.5">Google Play</span>
                </div>
              </a>
            </div>
          )}

          {/* Social Proof / Rating Trust Divider & Ratings */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-[#1c3320] dark:text-neutral-300 w-full">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-current text-amber-500" />
              ))}
            </div>
            <span className="font-bold text-[#102414] dark:text-white tracking-tight">4.9 / 5.0</span>
            <span className="text-black/25 dark:text-white/20">·</span>
            <span className="text-[#243d29] dark:text-neutral-400">24k+ reviews</span>
            <span className="text-black/25 dark:text-white/20">·</span>
            <span className="font-semibold text-[#142e18] dark:text-emerald-400">100k+ Active Members</span>
          </div>
        </div>
      </div>
    </div>
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
    case "concentric-portal":
    case "orbital-lens":
      return <ConcentricPortalCta {...props} />;
    case "offer-showcase":
    case "cta-offer-showcase":
      return <OfferShowcaseCta {...props} />;
    case "mobile-app":
    case "app-showcase":
    case "mobile-showcase":
    case "mobile-mockup":
      return <MobileAppCta {...props} />;
    case "brand-pillars":
    default:
      return <BrandPillarsCta {...props} />;
  }
}

export default CTASection;
export { CTASection as CtaSection };
