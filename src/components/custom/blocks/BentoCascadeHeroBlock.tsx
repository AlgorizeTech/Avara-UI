"use client";

import React, { forwardRef, useMemo, useRef } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { accentTokens } from "@/lib/accent";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupTooltip,
  AvatarImage,
  type StackAvatar,
} from "./AvatarStackBlock";
import Button from "./Button";

/* ═══════════════════════════════════════════════
   TYPES & INTERFACES
   ═══════════════════════════════════════════════ */

export interface BentoCascadeCardItem {
  id?: string | number;
  image: string;
  title?: string;
  subtitle?: string;
  tag?: string;
  href?: string;
}

export interface BentoCascadeHeroProps
  extends React.HTMLAttributes<HTMLElement> {
  avatars?: (string | StackAvatar)[];
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
  cards?: BentoCascadeCardItem[];
  images?: string[];
  speed?: number; // seconds for one complete loop cycle
  pauseOnHover?: boolean;
  accent?: string;
  radius?: string | number;
  linkComponent?: React.ElementType;
  imageComponent?: React.ElementType;
}

/* ═══════════════════════════════════════════════
   DEFAULT AVATARS
   ═══════════════════════════════════════════════ */

export const DEFAULT_AVATARS: StackAvatar[] = [
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145139/pexels-photo-1036623-1790145143487.jpg",
    alt: "Elena Vance",
    name: "Elena Vance",
    role: "Expedition Leader",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145142/pexels-photo-2043590-1790145143488.jpg",
    alt: "Marcus Chen",
    name: "Marcus Chen",
    role: "Alpine Guide",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145139/pexels-photo-1587009-1790145143488.jpg",
    alt: "Sarah Jenkins",
    name: "Sarah Jenkins",
    role: "Trail Specialist",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790082180/pexels-photo-1520760-1790082180553.jpg",
    alt: "David Miller",
    name: "David Miller",
    role: "Nature Photographer",
  },
];

/* ═══════════════════════════════════════════════
   DEFAULT CLOUDINARY NATURE CARDS
   ═══════════════════════════════════════════════ */

export const DEFAULT_BENTO_CARDS: BentoCascadeCardItem[] = [
  {
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1000,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
    title: "Yosemite Sanctuary",
    subtitle: "Glacial valley and mirror lake reflections",
    tag: "Sanctuary",
  },
  {
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
    title: "Evergreen Canopy",
    subtitle: "Sunlit morning mist in the pine grove",
    tag: "Woodlands",
  },
  {
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    title: "Misty Mountain Ridge",
    subtitle: "Low-hanging cloud bank at dawn",
    tag: "Highlands",
  },
  {
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    title: "Redwood Sunbeam Trail",
    subtitle: "Ancient forest canopy illuminated by morning light",
    tag: "Forest",
  },
  {
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1000,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
    title: "Emerald Alpine Lake",
    subtitle: "Crystal turquoise meltwater enclosed by ridges",
    tag: "Alpine",
  },
  {
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
    title: "Verdant Foothills",
    subtitle: "Rolling green pastures and open horizons",
    tag: "Meadows",
  },
  {
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158813/photo-1433086966358-54859d0ed716-1790158812209.jpg",
    title: "Cascading Gorge",
    subtitle: "Lush suspension bridge over roaring waterfalls",
    tag: "Wilderness",
  },
  {
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
    title: "Sunset Peak",
    subtitle: "Evening golden hour reflections on rocky bluffs",
    tag: "Horizon",
  },
];

/* ═══════════════════════════════════════════════
   BENTO CARD COMPONENT
   ═══════════════════════════════════════════════ */

interface BentoCardProps {
  card: BentoCascadeCardItem;
  className?: string;
  heightClass?: string;
  imageComponent?: React.ElementType;
  linkComponent?: React.ElementType;
}

function BentoCard({
  card,
  className,
  heightClass = "h-[150px] sm:h-[200px]",
  imageComponent: ImageComp,
  linkComponent: LinkComp,
}: BentoCardProps) {
  const Comp = card.href ? LinkComp || "a" : "div";
  const linkProps = card.href ? { href: card.href } : {};

  return (
    <Comp
      {...linkProps}
      className={cn(
        "group/card relative w-full cursor-pointer select-none overflow-hidden rounded-[var(--radius-2xl,calc(var(--radius,0.625rem)*1.75))] border border-border/40 bg-muted/20 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10",
        heightClass,
        className
      )}
    >
      {/* Background Cloudinary Nature Image with Smooth Zoom on Hover (zero container jump) */}
      {ImageComp ? (
        <ImageComp
          src={card.image}
          alt={card.title || "Showcase card"}
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
        />
      ) : (
        <img
          src={card.image}
          alt={card.title || "Showcase card"}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
        />
      )}

      {/* Ambient Depth Scrim Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-300 group-hover/card:from-black/90" />
      <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 mix-blend-overlay" />

      {/* Top Floating Bar: Tag Pill + Interactive Arrow */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-2.5 sm:p-4">
        {card.tag ? (
          <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-[var(--radius-lg,calc(var(--radius,0.625rem)*1.2))] bg-background/80 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-foreground border border-border/50 shadow-sm transition-colors duration-200 group-hover/card:border-primary/40">
            <span className="size-1.5 rounded-full bg-primary" />
            {card.tag}
          </span>
        ) : (
          <div />
        )}

        <div className="size-6 sm:size-8 rounded-[var(--radius-md,var(--radius,0.625rem))] bg-background/70 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground opacity-80 transition-all duration-200 group-hover/card:scale-110 group-hover/card:opacity-100 group-hover/card:border-primary/50">
          <ArrowUpRight className="size-3 sm:size-3.5 text-primary transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Bottom Content Area: Title & Subtitle */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-5 flex flex-col justify-end text-left pointer-events-none">
        {card.title && (
          <h3 className="text-xs sm:text-base font-semibold text-white tracking-tight leading-snug drop-shadow-md">
            {card.title}
          </h3>
        )}
        {card.subtitle && (
          <p className="text-[10px] sm:text-xs text-white/80 mt-0.5 sm:mt-1 line-clamp-1 leading-normal font-normal drop-shadow-sm">
            {card.subtitle}
          </p>
        )}
      </div>

      {/* Top-edge subtle inner highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/20 pointer-events-none" />
    </Comp>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT: BentoCascadeHero
   ═══════════════════════════════════════════════ */

export const BentoCascadeHero = forwardRef<HTMLElement, BentoCascadeHeroProps>(
  (
    {
      avatars = DEFAULT_AVATARS,
      reviewsCount = "Based on 12K+ Explorers",
      rating = 5,
      title = "Explore wild nature & plan",
      titleAccent = "your next escape",
      subtitle = "Discover handpicked alpine sanctuaries, secluded glacial lakes, and ancient redwood trails tailored for unforgettable outdoor journeys.",
      primaryActionLabel = "Start exploring",
      primaryActionHref = "#explore",
      secondaryActionLabel = "View journeys",
      secondaryActionHref = "#destinations",
      supportTitle = "Expedition Support",
      supportSubtitle = "24/7 ranger guidance",
      ratingTitle = "Traveller Choice",
      ratingSubtitle = "Rated 4.9 by adventurers",
      cards,
      images,
      speed = 30,
      pauseOnHover = true,
      accent,
      radius,
      linkComponent: LinkComp,
      imageComponent,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = LinkComp || "a";
    const stageRef = useRef<HTMLDivElement>(null);

    // Map avatars to StackAvatar objects for Avara UI's AvatarStack component
    const stackAvatars: StackAvatar[] = useMemo(() => {
      if (!avatars || avatars.length === 0) return DEFAULT_AVATARS;
      return avatars.map((av, i) => {
        if (typeof av === "string") {
          return {
            src: av,
            alt: `Explorer ${i + 1}`,
            name: `Explorer ${i + 1}`,
            role: "Verified Explorer",
          };
        }
        return av;
      });
    }, [avatars]);

    // Resolve 8 cards with Cloudinary nature images & titles
    const resolvedCards = useMemo(() => {
      if (cards && cards.length >= 8) return cards;
      if (cards && cards.length > 0) {
        return Array.from({ length: 8 }, (_, i) => cards[i % cards.length]);
      }
      if (images && images.length > 0) {
        return Array.from({ length: 8 }, (_, i) => ({
          image: images[i % images.length],
          title: DEFAULT_BENTO_CARDS[i % DEFAULT_BENTO_CARDS.length]?.title,
          subtitle:
            DEFAULT_BENTO_CARDS[i % DEFAULT_BENTO_CARDS.length]?.subtitle,
          tag: DEFAULT_BENTO_CARDS[i % DEFAULT_BENTO_CARDS.length]?.tag,
        }));
      }
      return DEFAULT_BENTO_CARDS;
    }, [cards, images]);

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
      ...(radius !== undefined
        ? {
            "--radius": typeof radius === "number" ? `${radius}px` : radius,
          }
        : {}),
      ...style,
    };

    // The repeating 8-card bento cascade cycle
    const BentoCycle = () => (
      <div className="flex flex-col gap-2.5 sm:gap-4 pb-2.5 sm:pb-4">
        {/* Row 1: Wide Card across 2 columns */}
        <BentoCard
          card={resolvedCards[0]}
          heightClass="h-[150px] sm:h-[200px]"
          imageComponent={imageComponent}
          linkComponent={LinkComp}
        />

        {/* Row 2: 2 Columns - Left has 2 stacked cards, Right has 1 tall card */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
          {/* Left Column (2 Stacked Cards) */}
          <div className="flex flex-col gap-2.5 sm:gap-4">
            <BentoCard
              card={resolvedCards[1]}
              heightClass="h-[130px] sm:h-[180px]"
              imageComponent={imageComponent}
              linkComponent={LinkComp}
            />
            <BentoCard
              card={resolvedCards[2]}
              heightClass="h-[130px] sm:h-[180px]"
              imageComponent={imageComponent}
              linkComponent={LinkComp}
            />
          </div>

          {/* Right Column (1 Tall Card) */}
          <BentoCard
            card={resolvedCards[3]}
            heightClass="h-[270px] sm:h-[376px]"
            imageComponent={imageComponent}
            linkComponent={LinkComp}
          />
        </div>

        {/* Row 3: Next Wide Card */}
        <BentoCard
          card={resolvedCards[4]}
          heightClass="h-[150px] sm:h-[200px]"
          imageComponent={imageComponent}
          linkComponent={LinkComp}
        />

        {/* Row 4: Flipped Pattern - Left has 1 tall card, Right has 2 stacked cards */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
          {/* Left Column (1 Tall Card) */}
          <BentoCard
            card={resolvedCards[5]}
            heightClass="h-[270px] sm:h-[376px]"
            imageComponent={imageComponent}
            linkComponent={LinkComp}
          />

          {/* Right Column (2 Stacked Cards) */}
          <div className="flex flex-col gap-2.5 sm:gap-4">
            <BentoCard
              card={resolvedCards[6]}
              heightClass="h-[130px] sm:h-[180px]"
              imageComponent={imageComponent}
              linkComponent={LinkComp}
            />
            <BentoCard
              card={resolvedCards[7]}
              heightClass="h-[130px] sm:h-[180px]"
              imageComponent={imageComponent}
              linkComponent={LinkComp}
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
          "relative w-full overflow-hidden bg-background py-10 sm:py-16 lg:py-24 text-foreground transition-colors duration-300",
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
          <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-14">
            {/* ═════════════════════════════════════════
                LEFT COLUMN: NATURE HERO CONTENT
                ═════════════════════════════════════════ */}
            <div className="flex flex-col items-start lg:col-span-6 xl:col-span-6">
              {/* Top Row: 1st Preview AvatarGroup (Shift on hover with spring physics) + Stars + Reviews */}
              <div className="mb-5 sm:mb-6 flex flex-wrap items-center gap-3.5 sm:gap-5">
                {/* Avara UI AvatarGroup (1st Preview - Shift on hover with spring physics) */}
                <AvatarGroup showTooltip={true} className="my-0 h-10 -space-x-2.5">
                  {stackAvatars.map((av, index) => (
                    <Avatar
                      key={index}
                      className="size-8 sm:size-10 !rounded-full border-[2.5px] border-background ring-0 cursor-pointer shadow-sm"
                    >
                      <AvatarImage
                        src={av.src}
                        alt={av.alt ?? av.name ?? ""}
                        className="!rounded-full object-cover"
                      />
                      <AvatarFallback className="!rounded-full bg-muted text-[11px] sm:text-xs font-medium">
                        {(av.name ?? av.alt ?? "U").slice(0, 2)}
                      </AvatarFallback>
                      <AvatarGroupTooltip designation={av.role ?? av.designation}>
                        {av.name ?? av.alt}
                      </AvatarGroupTooltip>
                    </Avatar>
                  ))}
                  {/* Action + Button - always permanently circular rounded-full, never affected by global radius */}
                  <div
                    aria-label="Add or Join"
                    className="grid size-8 sm:size-10 place-items-center !rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold border-[2.5px] border-background ring-0 shadow-sm cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
                  >
                    +
                  </div>
                </AvatarGroup>

                {/* Stars & Review Count */}
                <div className="flex flex-col justify-center select-none">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-3 sm:size-3.5 fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-foreground/80 mt-0.5 whitespace-nowrap">
                    {reviewsCount}
                  </span>
                </div>
              </div>

              {/* Main Headline - Strictly 2 lines on desktop, smoothly responsive on mobile */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[34px] xl:text-[40px] font-bold tracking-tight text-foreground leading-[1.2] max-w-xl">
                <span className="block sm:whitespace-nowrap">{title}</span>
                <span className="block mt-1 text-foreground sm:whitespace-nowrap">
                  {titleAccent}
                </span>
              </h1>

              {/* Subtitle with stylish left accent vertical line */}
              <div className="mt-4 sm:mt-5 max-w-lg border-l-2 border-primary/60 pl-3.5 sm:pl-4 py-0.5 transition-colors duration-300">
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              </div>

              {/* Action Buttons using Avara UI's Button component from the Pricing & Action CTA preview */}
              <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {primaryActionLabel && (
                  <Comp href={primaryActionHref} className="w-full xs:w-auto inline-block">
                    <Button
                      variant="pricing-primary"
                      showArrow
                      className="w-full xs:w-auto rounded-[var(--radius-xl,calc(var(--radius,0.625rem)+4px))] px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 cursor-pointer justify-center"
                    >
                      {primaryActionLabel}
                    </Button>
                  </Comp>
                )}

                {secondaryActionLabel && (
                  <Comp href={secondaryActionHref} className="w-full xs:w-auto inline-block">
                    <Button
                      variant="pricing-outline"
                      iconRight={
                        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-primary" />
                      }
                      className="w-full xs:w-auto rounded-[var(--radius-xl,calc(var(--radius,0.625rem)+4px))] px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium border-border/70 hover:border-primary/50 cursor-pointer justify-center"
                    >
                      {secondaryActionLabel}
                    </Button>
                  </Comp>
                )}
              </div>

              {/* Bottom Feature Badges: Support & Rating */}
              <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:items-center sm:gap-8 lg:gap-12 pt-2 w-full sm:w-auto">
                {/* Feature 1: Support */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="grid size-9 sm:size-10 shrink-0 place-items-center rounded-[var(--radius-lg,var(--radius,0.625rem))] bg-primary/10 text-primary">
                    <svg
                      className="size-4 sm:size-5"
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
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                      {supportTitle}
                    </p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 truncate">
                      {supportSubtitle}
                    </p>
                  </div>
                </div>

                {/* Feature 2: Rating */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="grid size-9 sm:size-10 shrink-0 place-items-center rounded-[var(--radius-lg,var(--radius,0.625rem))] bg-primary/10 text-primary">
                    <svg
                      className="size-4 sm:size-5"
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
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                      {ratingTitle}
                    </p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 truncate">
                      {ratingSubtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ═════════════════════════════════════════
                RIGHT COLUMN: BENTO CASCADE STAGE (CLOUDINARY NATURE CARDS)
                ═════════════════════════════════════════ */}
            <div className="relative w-full lg:col-span-6 xl:col-span-6">
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
                  "relative h-[480px] sm:h-[580px] lg:h-[660px] w-full overflow-hidden rounded-[var(--radius-3xl,calc(var(--radius,0.625rem)*2.2))] p-1",
                  pauseOnHover && "bento-cascade-hover-pause"
                )}
              >
                {/* Soft top & bottom gradient fade masks */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 sm:h-32 bg-gradient-to-b from-background via-background/80 to-transparent transition-colors duration-300" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 sm:h-32 bg-gradient-to-t from-background via-background/80 to-transparent transition-colors duration-300" />

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
