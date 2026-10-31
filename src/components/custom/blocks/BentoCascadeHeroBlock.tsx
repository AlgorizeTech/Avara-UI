"use client";

import React, { forwardRef, useRef } from "react";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { accentTokens } from "@/lib/accent";

/* ═══════════════════════════════════════════════
   TYPES & INTERFACES
   ═══════════════════════════════════════════════ */

export interface BentoCascadeHeroProps
  extends React.HTMLAttributes<HTMLElement> {
  avatars?: string[];
  reviewsCount?: string;
  rating?: number;
  title?: string;
  titleAccent?: string;
  subtitle?: string;
  primaryActionLabel?: string;
  primaryActionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  supportTitle?: string;
  supportSubtitle?: string;
  ratingTitle?: string;
  ratingSubtitle?: string;
  speed?: number; // seconds for one complete loop cycle
  pauseOnHover?: boolean;
  accent?: string;
  linkComponent?: React.ElementType;
}

/* ═══════════════════════════════════════════════
   DEFAULT AVATARS
   ═══════════════════════════════════════════════ */

export const DEFAULT_AVATARS = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145139/pexels-photo-1036623-1790145143487.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145142/pexels-photo-2043590-1790145143488.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145139/pexels-photo-1587009-1790145143488.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790082180/pexels-photo-1520760-1790082180553.jpg",
];

/* ═══════════════════════════════════════════════
   BENTO CASCADE CARDS (Matching Framer Bento Cascade)
   ═══════════════════════════════════════════════ */

function BentoCardWide({
  gradient = "from-[#414852] via-[#2f353d] to-[#1c2127]",
  orbGradient = "from-slate-400/30 to-slate-600/10",
  className,
}: {
  gradient?: string;
  orbGradient?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group/card relative w-full h-[180px] sm:h-[200px] cursor-pointer select-none overflow-hidden rounded-3xl border border-border/40 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10",
        className
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-r", gradient)} />
      {/* Sleek minimalist geometric circular orb */}
      <div
        className={cn(
          "absolute right-12 sm:right-16 top-1/2 -translate-y-1/2 size-40 sm:size-48 rounded-full bg-gradient-to-b backdrop-blur-[1px] border border-white/10 shadow-inner transition-transform duration-500",
          orbGradient
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 pointer-events-none" />
    </div>
  );
}

function BentoCardArch({
  gradient = "from-[#bd8856] to-[#a67243]",
  archGradient = "from-[#dfa978]/60 to-[#f0c49b]/35",
  heightClass = "h-[165px] sm:h-[185px]",
  className,
}: {
  gradient?: string;
  archGradient?: string;
  heightClass?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group/card relative w-full cursor-pointer select-none overflow-hidden rounded-3xl border border-border/40 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10",
        heightClass,
        className
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-b", gradient)} />
      {/* Geometric arch rising from the bottom */}
      <div
        className={cn(
          "absolute -bottom-10 left-1/2 -translate-x-1/2 w-[85%] aspect-square rounded-full bg-gradient-to-t backdrop-blur-[1px] border-t border-white/15",
          archGradient
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/5 pointer-events-none" />
    </div>
  );
}

function BentoCardTall({
  gradient = "from-[#8da0ad] to-[#708491]",
  archGradient = "from-[#b8c7d2]/50 to-white/25",
  className,
}: {
  gradient?: string;
  archGradient?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group/card relative w-full h-[346px] sm:h-[386px] cursor-pointer select-none overflow-hidden rounded-3xl border border-border/40 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10",
        className
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-b", gradient)} />
      {/* Large geometric arch rising from the bottom */}
      <div
        className={cn(
          "absolute -bottom-14 left-1/2 -translate-x-1/2 w-[92%] aspect-square rounded-full bg-gradient-to-t backdrop-blur-[1px] border-t border-white/20",
          archGradient
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/5 pointer-events-none" />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT: BentoCascadeHero
   ═══════════════════════════════════════════════ */

export const BentoCascadeHero = forwardRef<HTMLElement, BentoCascadeHeroProps>(
  (
    {
      avatars = DEFAULT_AVATARS,
      reviewsCount = "Based on 20K+ Reviews",
      rating = 5,
      title = "Search any doctors & plan",
      titleAccent = "your next visit",
      subtitle = "Experience leading healthcare services with expert treatments tailored to your work needs",
      primaryActionLabel = "Contact us",
      primaryActionHref = "#contact",
      secondaryActionLabel = "What we do",
      secondaryActionHref = "#services",
      supportTitle = "Support",
      supportSubtitle = "24/7 care access",
      ratingTitle = "Rating",
      ratingSubtitle = "Rated 5 stars by users",
      speed = 30,
      pauseOnHover = true,
      accent,
      linkComponent: LinkComp,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = LinkComp || "a";
    const stageRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
      if (!pauseOnHover || !stageRef.current) return;
      try {
        const anims = stageRef.current.getAnimations({ subtree: true });
        anims.forEach((anim) => anim.pause());
      } catch {
        // Handled via CSS fallback
      }
    };

    const handleMouseLeave = () => {
      if (!pauseOnHover || !stageRef.current) return;
      try {
        const anims = stageRef.current.getAnimations({ subtree: true });
        anims.forEach((anim) => anim.play());
      } catch {
        // Handled via CSS fallback
      }
    };

    const customStyle: React.CSSProperties = {
      ...accentTokens(accent),
      ...style,
    };

    // The repeating bento cascade pattern blocks
    const BentoCycle = () => (
      <div className="flex flex-col gap-3 sm:gap-4 pb-3 sm:pb-4">
        {/* Row 1: Wide Card across 2 columns */}
        <BentoCardWide />

        {/* Row 2: 2 Columns - Left has 2 stacked cards, Right has 1 tall card */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Left Column (2 Stacked Arches) */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <BentoCardArch
              gradient="from-[#bd8856] to-[#a67243]"
              archGradient="from-[#dfa978]/60 to-[#f0c49b]/35"
            />
            <BentoCardArch
              gradient="from-[#b36353] to-[#994d3f]"
              archGradient="from-[#cf7f6f]/60 to-[#e5a092]/35"
            />
          </div>

          {/* Right Column (1 Tall Card) */}
          <BentoCardTall
            gradient="from-[#8da0ad] to-[#708491]"
            archGradient="from-[#b8c7d2]/50 to-white/25"
          />
        </div>

        {/* Row 3: Next Wide Card */}
        <BentoCardWide
          gradient="from-[#3a444a] via-[#2c3338] to-[#1c2226]"
          orbGradient="from-slate-300/25 to-slate-500/10"
        />

        {/* Row 4: Flipped Pattern - Left has 1 tall card, Right has 2 stacked cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Left Column (1 Tall Card) */}
          <BentoCardTall
            gradient="from-[#73828c] to-[#59666f]"
            archGradient="from-[#a4b4be]/50 to-white/25"
          />

          {/* Right Column (2 Stacked Arches) */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <BentoCardArch
              gradient="from-[#c49262] to-[#ab7b4d]"
              archGradient="from-[#e3b284]/60 to-[#f2caa4]/35"
            />
            <BentoCardArch
              gradient="from-[#a8594a] to-[#8f4537]"
              archGradient="from-[#c77362]/60 to-[#df9485]/35"
            />
          </div>
        </div>
      </div>
    );

    return (
      <section
        ref={ref}
        style={customStyle}
        className={cn(
          "relative w-full overflow-hidden bg-background py-16 text-foreground transition-colors duration-300 sm:py-20 lg:py-28",
          className
        )}
        {...props}
      >
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary/10 blur-[140px] opacity-60 transition-colors duration-500" />

        {/* Scoped CSS Keyframes for Infinite Smooth Bento Cascade Marquee */}
        <style>{`
          @keyframes bento-cascade-continuous {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(0, -50%, 0);
            }
          }

          .bento-cascade-container {
            animation: bento-cascade-continuous var(--cascade-speed, 30s) linear infinite;
            will-change: transform;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
          }

          .bento-cascade-hover-pause:hover .bento-cascade-container {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .bento-cascade-container {
              animation: none !important;
            }
          }
        `}</style>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-14">
            {/* ═════════════════════════════════════════
                LEFT COLUMN: EXACT CONTENT FROM SCREENSHOT
                ═════════════════════════════════════════ */}
            <div className="flex flex-col items-start lg:col-span-6 xl:col-span-6">
              {/* Top Row: Avatar Stack + Stars + Reviews */}
              <div className="mb-6 flex flex-wrap items-center gap-4">
                {/* Overlapping Avatars */}
                <div className="flex -space-x-2.5 overflow-hidden">
                  {avatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Doctor/User"
                      className="inline-block size-9 sm:size-10 rounded-full ring-2 ring-background object-cover"
                    />
                  ))}
                  <span className="grid size-9 sm:size-10 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold ring-2 ring-background shadow-sm">
                    +
                  </span>
                </div>

                {/* Stars & Review Count */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-foreground/80 mt-0.5">
                    {reviewsCount}
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground leading-[1.14]">
                <span>{title}</span>
                <span className="block mt-1">{titleAccent}</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
                {subtitle}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-6">
                {primaryActionLabel && (
                  <Comp
                    href={primaryActionHref}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm sm:text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:opacity-95 hover:shadow-xl hover:shadow-primary/35 active:scale-[0.98]"
                  >
                    <span>{primaryActionLabel}</span>
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Comp>
                )}

                {secondaryActionLabel && (
                  <Comp
                    href={secondaryActionHref}
                    className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-foreground transition-colors duration-200 hover:text-primary active:scale-[0.98]"
                  >
                    <span>{secondaryActionLabel}</span>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </Comp>
                )}
              </div>

              {/* Bottom Feature Badges: Support & Rating */}
              <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-8 sm:gap-12 pt-2">
                {/* Feature 1: Support */}
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <svg
                      className="size-5 sm:size-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {supportTitle}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {supportSubtitle}
                    </p>
                  </div>
                </div>

                {/* Feature 2: Rating */}
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <svg
                      className="size-5 sm:size-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {ratingTitle}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {ratingSubtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ═════════════════════════════════════════
                RIGHT COLUMN: BENTO CASCADE STAGE (SCREENSHOT MATCH)
                ═════════════════════════════════════════ */}
            <div className="relative lg:col-span-6 xl:col-span-6">
              {/* Outer Stage with Fade Masks & Hover Pause */}
              <div
                ref={stageRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={
                  {
                    "--cascade-speed": `${speed}s`,
                  } as React.CSSProperties
                }
                className={cn(
                  "relative h-[560px] sm:h-[620px] lg:h-[660px] w-full overflow-hidden rounded-3xl p-1",
                  pauseOnHover && "bento-cascade-hover-pause"
                )}
              >
                {/* Soft top & bottom gradient fade masks */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 sm:h-32 bg-gradient-to-b from-background via-background/80 to-transparent transition-colors duration-300" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 sm:h-32 bg-gradient-to-t from-background via-background/80 to-transparent transition-colors duration-300" />

                {/* Continuous Infinite Bento Cascade Track */}
                <div className="bento-cascade-container flex flex-col">
                  {/* First Pass */}
                  <BentoCycle />
                  {/* Duplicate Pass for Seamless 100% Zero-Reset Loop */}
                  <BentoCycle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

BentoCascadeHero.displayName = "BentoCascadeHero";

export default BentoCascadeHero;
