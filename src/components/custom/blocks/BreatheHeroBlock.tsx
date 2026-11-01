"use client";

import React, { forwardRef, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, ArrowUpRight, Check, Sparkles, Star } from "lucide-react";
import Button from "./Button";
import { cn } from "@/lib/utils";
import { accentTokens } from "@/lib/accent";

/* ═══════════════════════════════════════════════
   TYPES & INTERFACES
   ═══════════════════════════════════════════════ */

export interface BreatheCardItem {
  id?: string | number;
  image?: string;
  caption?: string;
  color?: string;
  alt?: string;
  href?: string;
}

export type BreatheScrollMode = "grow" | "parallax" | "spread" | "none";
export type BreatheIntroMode = "fan" | "rise" | "scale" | "none";
export type BreatheHoverMode = "zoom" | "lift" | "both" | "none";
export type BreatheTextIntro = "blur" | "rise" | "fade" | "none";

export interface BreatheHeroProps
  extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  titleAccent?: string;
  italicAccent?: boolean;
  titleStyle?: "serif" | "sans" | "gradient";
  description?: string;
  badge?: React.ReactNode;
  badgeText?: string;
  badgeHref?: string;
  badgeHighlight?: string;
  buttonLabel?: string;
  buttonHref?: string;
  buttonVariant?: "filled" | "outline" | "soft";
  buttonArrow?: boolean;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
  secondaryButtonIcon?: React.ReactNode;
  showTrust?: boolean;
  trustRating?: string | number;
  trustCount?: string;
  trustAvatars?: string[];
  features?: string[];
  cards?: BreatheCardItem[];
  images?: string[];
  captions?: "hover" | "always" | "off";
  scrollMode?: BreatheScrollMode;
  introMode?: BreatheIntroMode;
  hoverMode?: BreatheHoverMode;
  textIntro?: BreatheTextIntro;
  scrollScale?: number;
  stagger?: number;
  cardHeight?: number;
  cardRadius?: number | string;
  gap?: number;
  accent?: string;
  internalScroll?: boolean;
  containerHeight?: number | string;
  scrollDistance?: number | string;
  linkComponent?: React.ElementType;
  imageComponent?: React.ElementType;
}

/* ═══════════════════════════════════════════════
   DEFAULT PRESETS & BREATHE COLOR CARDS
   ═══════════════════════════════════════════════ */

export const DEFAULT_BREATHE_CARDS: BreatheCardItem[] = [
  {
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
    caption: "Evergreen Canopy",
    color: "#DCE4DA",
    alt: "Sunlit morning mist in the pine grove",
  },
  {
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    caption: "Misty Mountain Ridge",
    color: "#C1CCC4",
    alt: "Low-hanging cloud bank at dawn",
  },
  {
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1000,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
    caption: "Yosemite Sanctuary",
    color: "#D5C9BD",
    alt: "Glacial valley and mirror lake reflections",
  },
  {
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    caption: "Redwood Sunbeam Trail",
    color: "#C1CCC4",
    alt: "Ancient forest canopy illuminated by morning light",
  },
  {
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1000,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
    caption: "Emerald Alpine Lake",
    color: "#DCE4DA",
    alt: "Crystal turquoise meltwater enclosed by ridges",
  },
];

export const DEFAULT_TRUST_AVATARS: string[] = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145139/pexels-photo-1036623-1790145143487.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145142/pexels-photo-2043590-1790145143488.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145139/pexels-photo-1587009-1790145143488.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790082180/pexels-photo-1520760-1790082180553.jpg",
];

export const DEFAULT_BREATHE_FEATURES: string[] = [
  "100% Confidential",
  "In-person & Online",
  "Licensed Specialists",
];

const PARALLAX_FACTORS = [0.35, 0.9, 0.15, 0.7, 0.5];
const EASING_CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ═══════════════════════════════════════════════
   CARD ARCH ITEM COMPONENT WITH MOTION SPRINGS
   ═══════════════════════════════════════════════ */

interface BreatheCardProps {
  card: BreatheCardItem;
  index: number;
  offset: number;
  progress: any;
  scrollMode: BreatheScrollMode;
  introMode: BreatheIntroMode;
  hoverMode: BreatheHoverMode;
  showCaption: boolean;
  captionsMode: "hover" | "always" | "off";
  scrollScale: number;
  stagger: number;
  cardHeight?: number;
  cardRadius: number | string;
  imageComponent?: React.ElementType;
  linkComponent?: React.ElementType;
  prefersReducedMotion: boolean;
}

function BreatheCard({
  card,
  index,
  offset,
  progress,
  scrollMode,
  introMode,
  hoverMode,
  showCaption,
  captionsMode,
  scrollScale,
  stagger,
  cardHeight,
  cardRadius,
  imageComponent: ImageComp,
  linkComponent: LinkComp,
  prefersReducedMotion,
}: BreatheCardProps) {
  const isCenter = offset === 0;
  const absOffset = Math.abs(offset);
  const signOffset = Math.sign(offset);
  const baseY = absOffset * stagger;
  const isOuter = absOffset >= 2;

  // Scroll animations mapped between [0, 0.85] of scroll progress
  const scrollRange = [0, 0.85];

  // 1. "grow" scroll animation (Exact 1:1 Hero Breathe Framer effect):
  // - All 5 cards share the same base height and sit at stepped Y offsets (baseY = absOffset * stagger):
  //   Card 3 at y=0, Cards 2&4 at y=28px, Cards 1&5 at y=56px.
  // - On scroll: ONLY Center Card (Card 3) scales up (1 -> scrollScale, e.g. 1.28x),
  //   while Cards 1&2 shift left together and Cards 4&5 shift right together to clear Card 3's expanded width,
  //   keeping the inter-card gap tight and uniform.
  // - ZERO rotation at all times!
  const targetXPercent = isCenter
    ? 0
    : signOffset * (absOffset === 1 ? 18 : 22);
  const xGrow = useTransform(progress, scrollRange, [
    "0%",
    `${targetXPercent}%`,
  ]);
  const yGrow = useTransform(progress, scrollRange, [
    baseY,
    baseY,
  ]);
  const scaleGrow = useTransform(progress, scrollRange, [
    1,
    isCenter ? scrollScale : 1,
  ]);
  const opacityGrow = useTransform(progress, scrollRange, [
    1,
    1,
  ]);

  // 2. "parallax" scroll mode: cards glide vertically at differentiated speeds
  const factor = PARALLAX_FACTORS[index % PARALLAX_FACTORS.length];
  const yParallax = useTransform(progress, scrollRange, [
    baseY,
    baseY - (60 + factor * 170),
  ]);

  // 3. "spread" scroll mode: cards fan out horizontally
  const xSpread = useTransform(progress, scrollRange, [
    "0%",
    `${signOffset * absOffset * 12}%`,
  ]);
  const ySpread = useTransform(progress, scrollRange, [
    baseY,
    baseY + absOffset * 10,
  ]);

  // Dynamic style based on scrollMode: rotate is strictly 0 in grow mode
  const motionStyle = prefersReducedMotion || scrollMode === "none"
    ? { y: baseY }
    : scrollMode === "grow"
    ? { x: xGrow, y: yGrow, scale: scaleGrow, opacity: opacityGrow }
    : scrollMode === "parallax"
    ? { y: yParallax }
    : scrollMode === "spread"
    ? { x: xSpread, y: ySpread }
    : { y: baseY };

  // Entrance variants: completely upright (rotate: 0)
  const getInitial = () => {
    if (prefersReducedMotion || introMode === "none") return false;
    switch (introMode) {
      case "fan":
        return {
          opacity: 0,
          x: `${-offset * 25}%`,
          y: 30,
          rotate: 0,
          scale: 0.97,
        };
      case "rise":
        return { opacity: 0, x: "0%", y: 50, rotate: 0, scale: 1 };
      case "scale":
        return { opacity: 0, x: "0%", y: 20, rotate: 0, scale: 0.92 };
      default:
        return false;
    }
  };

  const delay = (introMode === "fan" ? 0.35 : 0.2) + absOffset * 0.08;

  const Comp = card.href ? LinkComp || "a" : "div";
  const linkProps = card.href ? { href: card.href } : {};

  // All 5 cards share the exact same base height; the stepped arch comes from baseY = absOffset * stagger
  const cardHeightClass =
    "h-[185px] sm:h-[240px] md:h-[285px] lg:h-[315px]";

  return (
    <motion.div
      initial={getInitial()}
      animate={{ opacity: 1, x: "0%", y: 0, rotate: 0, scale: 1 }}
      transition={{
        default: { duration: 1.2, delay, ease: EASING_CUBIC },
        opacity: { duration: 0.6, delay, ease: "easeOut" },
        y: { duration: 1.1, delay, ease: EASING_CUBIC },
      }}
      className={cn(
        "relative transition-all will-change-transform flex items-start justify-center shrink-0",
        isOuter ? "hidden md:flex" : "flex"
      )}
      style={{
        flex: isCenter ? 1.18 : 1,
        minWidth: 0,
        maxWidth: isCenter ? 250 : 210,
        zIndex: 10 - absOffset,
        transformOrigin: "50% 42%",
      }}
    >
      {/* Outer hover wrapper for lift & zoom interactions */}
      <Comp
        {...linkProps}
        className={cn(
          "group/card block relative w-full cursor-pointer select-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          (hoverMode === "lift" || hoverMode === "both") &&
            "hover:-translate-y-2.5"
        )}
      >
        <motion.div
          style={{
            ...motionStyle,
            borderRadius: cardRadius,
            transformOrigin: "50% 42%",
            ...(cardHeight ? { height: cardHeight } : {}),
          }}
          className={cn(
            "relative w-full overflow-hidden border border-border/30 bg-muted/40 shadow-none",
            !cardHeight && cardHeightClass
          )}
        >
          {/* Card Image with Slow Smooth Zoom on Hover */}
          {card.image ? (
            ImageComp ? (
              <ImageComp
                src={card.image}
                alt={card.alt || card.caption || "Hero card"}
                className={cn(
                  "size-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  (hoverMode === "zoom" || hoverMode === "both") &&
                    "group-hover/card:scale-105"
                )}
              />
            ) : (
              <img
                src={card.image}
                alt={card.alt || card.caption || "Hero card"}
                loading="lazy"
                className={cn(
                  "size-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  (hoverMode === "zoom" || hoverMode === "both") &&
                    "group-hover/card:scale-105"
                )}
              />
            )
          ) : (
            <div
              style={{ backgroundColor: card.color || "#C9D3C4" }}
              className="grid size-full place-items-center text-xs sm:text-sm md:text-base font-medium text-foreground/70 select-none"
            >
              {card.alt || `Image ${index + 1}`}
            </div>
          )}

          {/* Subtle Bottom Scrim for Caption Legibility */}
          {card.image && showCaption && card.caption && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
          )}

          {/* Floating Frosted Glass Caption Pill */}
          {showCaption && card.caption && (
            <span
              className={cn(
                "absolute bottom-2 sm:bottom-3 left-2 sm:left-3 z-10 max-w-[calc(100%-16px)] sm:max-w-[calc(100%-24px)] truncate rounded-full border border-white/20 bg-background/85 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-foreground backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                captionsMode === "always"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 group-hover/card:opacity-100 group-hover/card:translate-y-0"
              )}
            >
              {card.caption}
            </span>
          )}
        </motion.div>
      </Comp>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT: BreatheHero
   ═══════════════════════════════════════════════ */

export const BreatheHero = forwardRef<HTMLElement, BreatheHeroProps>(
  (
    {
      title = "Crafted for depth,",
      titleAccent = "built for motion.",
      italicAccent = true,
      titleStyle = "gradient",
      description = "Create immersive digital experiences where fluid scroll choreography, spatial architecture, and tactile visual polish move in effortless harmony.",
      badge,
      badgeText = "Interactive Motion Architecture",
      badgeHref = "#explore",
      badgeHighlight = "Studio v2.4",
      buttonLabel = "Start Exploring",
      buttonHref = "#get-started",
      buttonVariant = "filled",
      buttonArrow = true,
      secondaryButtonLabel = "View Showroom",
      secondaryButtonHref = "#showroom",
      secondaryButtonIcon,
      showTrust = false,
      trustRating = "4.9/5",
      trustCount = "from 12,000+ reviews",
      trustAvatars = DEFAULT_TRUST_AVATARS,
      features = [],
      cards,
      images,
      captions = "hover",
      scrollMode = "grow",
      introMode = "fan",
      hoverMode = "zoom",
      textIntro = "blur",
      scrollScale = 1.26,
      stagger = 28,
      cardHeight,
      cardRadius = "var(--radius-2xl, 22px)",
      gap = 14,
      accent,
      internalScroll = true,
      containerHeight,
      scrollDistance,
      linkComponent: LinkComp,
      imageComponent,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion() ?? false;

    // Viewport & Section Scroll Trackers: works both when scrolling inside the section and when scrolling the page
    const { scrollYProgress: windowScrollProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end start"],
    });

    const { scrollYProgress: internalScrollProgress } = useScroll({
      container: internalScroll ? scrollContainerRef : undefined,
    });

    // Support iframe preview scroll (when not using internal scroll)
    const iframeScrollProgress = useMotionValue(0);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const isIframe = window.parent && window.parent !== window;
      if (!isIframe) return;

      let parentWin: Window = window;
      try {
        if (window.parent.location.origin === window.location.origin) {
          parentWin = window.parent;
        }
      } catch {
        return;
      }

      const onParentScroll = () => {
        try {
          const frame = window.frameElement as HTMLElement | null;
          if (!frame) return;
          const rect = frame.getBoundingClientRect();
          const vh = parentWin.innerHeight || 800;
          const top = rect.top;
          const start = vh * 0.45;
          const end = -rect.height * 0.35;
          const p = Math.min(Math.max((start - top) / (start - end), 0), 1);
          iframeScrollProgress.set(p);
        } catch {}
      };

      parentWin.addEventListener("scroll", onParentScroll, { passive: true });
      onParentScroll();
      return () => parentWin.removeEventListener("scroll", onParentScroll);
    }, [iframeScrollProgress]);

    const effectiveProgress = useTransform(
      [internalScrollProgress, windowScrollProgress, iframeScrollProgress],
      ([sInternal, sWindow, sIframe]) =>
        Math.max(
          internalScroll ? (sInternal as number) : 0,
          sWindow as number,
          sIframe as number
        )
    );

    const smoothProgress = useSpring(effectiveProgress, {
      stiffness: 90,
      damping: 26,
      mass: 0.5,
      restDelta: 0.0005,
    });

    // Resolve 5 cards
    const resolvedCards: BreatheCardItem[] = React.useMemo(() => {
      if (cards && cards.length > 0) return cards;
      if (images && images.length > 0) {
        return Array.from({ length: 5 }, (_, i) => ({
          image: images[i % images.length],
          caption: DEFAULT_BREATHE_CARDS[i % DEFAULT_BREATHE_CARDS.length].caption,
          color: DEFAULT_BREATHE_CARDS[i % DEFAULT_BREATHE_CARDS.length].color,
          alt: DEFAULT_BREATHE_CARDS[i % DEFAULT_BREATHE_CARDS.length].alt,
        }));
      }
      return DEFAULT_BREATHE_CARDS;
    }, [cards, images]);

    const centerIndex = Math.floor(resolvedCards.length / 2);
    const Comp = LinkComp || "a";

    const customStyle: React.CSSProperties = {
      ...accentTokens(accent),
      ...style,
    };

    const content = (
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* ═════════════════════════════════════════
              1. REFINED GLASSMORPHIC ANNOUNCEMENT PILL BADGE
              ═════════════════════════════════════════ */}
          {badge ? (
            <motion.div
              initial={
                prefersReducedMotion || textIntro === "none"
                  ? false
                  : { opacity: 0, y: -10, filter: "blur(6px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.05, ease: EASING_CUBIC }}
              className="mb-4 sm:mb-6"
            >
              {badge}
            </motion.div>
          ) : badgeText ? (
            <motion.div
              initial={
                prefersReducedMotion || textIntro === "none"
                  ? false
                  : { opacity: 0, y: -10, filter: "blur(6px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.05, ease: EASING_CUBIC }}
              className="mb-4 sm:mb-6 max-w-full"
            >
              <Comp
                href={badgeHref}
                className="group inline-flex items-center justify-center gap-1.5 sm:gap-2.5 max-w-[85vw] sm:max-w-full rounded-full border border-primary/20 bg-background/75 hover:bg-background/95 px-2.5 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium text-foreground shadow-[0_2px_12px_-3px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-300 hover:border-primary/40"
              >
                <Sparkles className="size-3 sm:size-3.5 text-primary transition-transform duration-300 group-hover:rotate-12 shrink-0" />
                {badgeHighlight && (
                  <>
                    <span className="hidden sm:inline-flex items-center font-semibold text-primary shrink-0">
                      {badgeHighlight}
                    </span>
                    <span className="hidden sm:block h-3 w-px bg-border/80 shrink-0" />
                  </>
                )}
                <span className="sm:hidden truncate text-foreground/90 font-medium">
                  {badgeText.split(" ").slice(-2).join(" ")}
                </span>
                <span className="hidden sm:inline truncate text-muted-foreground group-hover:text-foreground transition-colors">
                  {badgeText}
                </span>
                <ArrowUpRight className="size-3 sm:size-3.5 text-primary/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </Comp>
            </motion.div>
          ) : null}

          {/* ═════════════════════════════════════════
              2. COHESIVE MODERN DISPLAY HEADLINE (100% RESPONSIVE)
              ═════════════════════════════════════════ */}
          <motion.h1
            initial={
              prefersReducedMotion || textIntro === "none"
                ? false
                : { opacity: 0, y: 18, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.12, ease: EASING_CUBIC }}
            style={
              titleStyle === "serif"
                ? {
                    fontFamily:
                      '"Playfair Display", "Newsreader", var(--font-cooper), Georgia, serif',
                  }
                : {
                    fontFamily:
                      '"Plus Jakarta Sans", "Inter", var(--font-sans), system-ui, sans-serif',
                  }
            }
            className="max-w-4xl px-1 sm:px-0 text-[1.75rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.65rem] font-bold tracking-[-0.035em] text-foreground leading-[1.15] sm:leading-[1.08] text-balance"
          >
            <span className="block text-foreground">{title}</span>
            {titleAccent && (
              <span className="relative inline-block mt-0.5 sm:mt-1">
                <span
                  className={cn(
                    "transition-colors duration-300",
                    titleStyle === "gradient"
                      ? "bg-gradient-to-r from-primary via-primary/85 to-primary/60 bg-clip-text text-transparent"
                      : "text-primary",
                    titleStyle === "serif" && italicAccent && "italic font-normal"
                  )}
                >
                  {titleAccent}
                </span>
                <svg
                  viewBox="0 0 240 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="mx-auto mt-1 sm:mt-1.5 h-1.5 sm:h-2.5 w-32 sm:w-52 md:w-64 text-primary"
                >
                  <path
                    d="M3 9C62 2.5 178 2.5 237 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-15"
                  />
                  <motion.path
                    d="M3 9C62 2.5 178 2.5 237 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, pathOffset: 0, opacity: 0.5 }}
                    animate={
                      prefersReducedMotion
                        ? { pathLength: 1, opacity: 0.7 }
                        : {
                            pathLength: [0, 1, 1, 0],
                            pathOffset: [0, 0, 0, 1],
                            opacity: [0.45, 1, 1, 0.45],
                          }
                    }
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.45, 0.7, 1],
                    }}
                  />
                </svg>
              </span>
            )}
          </motion.h1>

          {/* ═════════════════════════════════════════
              3. REFINED SUBTITLE DESCRIPTION
              ═════════════════════════════════════════ */}
          {description && (
            <motion.p
              initial={
                prefersReducedMotion || textIntro === "none"
                  ? false
                  : { opacity: 0, y: 14, filter: "blur(6px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.24, ease: EASING_CUBIC }}
              className="mt-3 sm:mt-5 max-w-xl sm:max-w-2xl px-2 sm:px-0 text-xs sm:text-base md:text-[1.0625rem] text-muted-foreground/90 leading-relaxed font-normal tracking-[-0.01em] text-balance"
            >
              {description}
            </motion.p>
          )}

          {/* ═════════════════════════════════════════
              4. CTA BUTTONS POWERED BY AVARA UI'S BUTTON COMPONENT
              (FOLLOWS GLOBAL THEME --radius DYNAMICALLY)
              ═════════════════════════════════════════ */}
          {(buttonLabel || secondaryButtonLabel) && (
            <motion.div
              initial={
                prefersReducedMotion || textIntro === "none"
                  ? false
                  : { opacity: 0, y: 12, scale: 0.96 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.36, ease: EASING_CUBIC }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              {buttonLabel && (
                <Comp href={buttonHref} className="w-full sm:w-auto inline-block cursor-pointer">
                  <Button
                    variant="pricing-primary"
                    showArrow={buttonArrow}
                    style={{ borderRadius: "var(--radius)" }}
                    className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 cursor-pointer justify-center transition-all duration-200"
                  >
                    {buttonLabel}
                  </Button>
                </Comp>
              )}

              {secondaryButtonLabel && (
                <Comp href={secondaryButtonHref} className="w-full sm:w-auto inline-block cursor-pointer">
                  <Button
                    variant="pricing-outline"
                    iconRight={
                      secondaryButtonIcon || (
                        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 text-primary" />
                      )
                    }
                    style={{ borderRadius: "var(--radius)" }}
                    className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-medium border-border/70 hover:border-primary/50 cursor-pointer justify-center transition-all duration-200"
                  >
                    {secondaryButtonLabel}
                  </Button>
                </Comp>
              )}
            </motion.div>
          )}

          {/* ═════════════════════════════════════════
              5. OPTIONAL TRUST RATING & CLIENT AVATARS
              ═════════════════════════════════════════ */}
          {showTrust && (
            <motion.div
              initial={
                prefersReducedMotion || textIntro === "none"
                  ? false
                  : { opacity: 0, y: 10, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.46, ease: EASING_CUBIC }}
              className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-muted-foreground"
            >
              {trustAvatars && trustAvatars.length > 0 && (
                <div className="flex -space-x-2.5 overflow-hidden">
                  {trustAvatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Client avatar"
                      className="inline-block size-7 sm:size-8 rounded-full ring-2 ring-background object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-3.5 sm:size-4 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>
                {trustRating && (
                  <span className="font-semibold text-foreground">
                    {trustRating}
                  </span>
                )}
                {trustCount && (
                  <span className="text-muted-foreground">({trustCount})</span>
                )}
              </div>
            </motion.div>
          )}

          {/* ═════════════════════════════════════════
              6. OPTIONAL FEATURE HIGHLIGHT CHIPS
              ═════════════════════════════════════════ */}
          {features && features.length > 0 && (
            <motion.div
              initial={
                prefersReducedMotion || textIntro === "none"
                  ? false
                  : { opacity: 0, y: 8 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.54, ease: EASING_CUBIC }}
              className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-muted-foreground"
            >
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius-full,9999px)] border border-border/60 bg-muted/40 px-3 py-1 backdrop-blur-xs"
                >
                  <Check className="size-3 text-primary stroke-[2.5]" />
                  <span>{feat}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* ═════════════════════════════════════════
              CARDS ROW: 5 CURVED ARCH MOTION CARDS
              (STEPPED BASELINE ARCH, ZERO ROTATE, GENEROUS GAP BELOW BUTTONS)
              ═════════════════════════════════════════ */}
          <div
            style={{
              gap,
            }}
            className="relative mt-16 sm:mt-20 md:mt-24 lg:mt-28 flex w-full max-w-6xl mx-auto items-start justify-center px-2 sm:px-4 h-[260px] sm:h-[320px] md:h-[370px] lg:h-[400px]"
          >
            {resolvedCards.map((card, index) => (
              <BreatheCard
                key={card.id ?? index}
                card={card}
                index={index}
                offset={index - centerIndex}
                progress={smoothProgress}
                scrollMode={scrollMode}
                introMode={introMode}
                hoverMode={hoverMode}
                showCaption={captions !== "off"}
                captionsMode={captions}
                scrollScale={scrollScale}
                stagger={stagger}
                cardHeight={cardHeight}
                cardRadius={cardRadius}
                imageComponent={imageComponent}
                linkComponent={LinkComp}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    );

    return (
      <section
        ref={(node) => {
          (containerRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        style={customStyle}
        className={cn(
          "relative w-full h-full overflow-hidden bg-background text-foreground transition-colors duration-300",
          internalScroll ? "p-0" : "pt-20 pb-14 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28",
          className
        )}
        {...props}
      >
        {/* Display & Editorial Web Fonts */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');
        `}</style>

        {internalScroll ? (
          <div
            ref={scrollContainerRef}
            style={
              containerHeight
                ? {
                    height:
                      typeof containerHeight === "number"
                        ? `${containerHeight}px`
                        : containerHeight,
                  }
                : undefined
            }
            className="relative w-full h-full overflow-y-auto overflow-x-hidden [scrollbar-width:auto] [scrollbar-color:hsl(var(--muted-foreground)/0.4)_transparent] [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/35 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/55 [&::-webkit-scrollbar-track]:bg-transparent"
          >
            <div
              style={
                scrollDistance
                  ? {
                      minHeight:
                        typeof scrollDistance === "number"
                          ? `${scrollDistance}px`
                          : scrollDistance,
                    }
                  : undefined
              }
              className="relative w-full min-h-[138%] flex flex-col justify-start pt-20 sm:pt-28 md:pt-32 lg:pt-36 pb-20 sm:pb-28 lg:pb-36"
            >
              {/* Ambient Top Subtle Background Lighting & Radial Glow */}
              <div className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 size-[640px] rounded-full bg-primary/10 blur-[130px] opacity-75" />
              <div className="pointer-events-none absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/[0.06] via-primary/[0.02] to-transparent" />
              <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-[radial-gradient(ellipse_at_top,var(--primary)/0.08,transparent_70%)]" />

              {content}
            </div>
          </div>
        ) : (
          <>
            {/* Ambient Top Subtle Background Lighting & Radial Glow */}
            <div className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 size-[640px] rounded-full bg-primary/10 blur-[130px] opacity-75" />
            <div className="pointer-events-none absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/[0.06] via-primary/[0.02] to-transparent" />
            <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-[radial-gradient(ellipse_at_top,var(--primary)/0.08,transparent_70%)]" />

            {content}
          </>
        )}
      </section>
    );
  }
);

BreatheHero.displayName = "BreatheHero";

export default BreatheHero;
