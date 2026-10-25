"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin } from "lucide-react";
import React, { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface DestinationItem {
  id: string | number;
  title: string;
  country?: string;
  placesCount?: number | string;
  image: string;
  tag?: string;
  link?: string;
}

export interface TopDestinationsProps
  extends React.HTMLAttributes<HTMLElement> {
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  /** Pass all items (automatically split evenly into 2 rows), or provide row1Items & row2Items directly */
  items?: DestinationItem[];
  row1Items?: DestinationItem[];
  row2Items?: DestinationItem[];
  /** Travel offset in px as the user scrolls past the section (default: 450) */
  scrollOffset?: number;
  /** Explicit scrolling container element or ref (essential for preview sandbox boxes) */
  scrollerRef?: React.RefObject<HTMLElement | null>;
  /** Callback fired when the Explore button on any card is clicked */
  onExplore?: (item: DestinationItem) => void;
}

export const DEFAULT_DESTINATIONS: DestinationItem[] = [
  {
    id: "bali",
    title: "Bali",
    country: "Indonesia",
    placesCount: 38,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158812/photo-1721335916916-37c319adce3a-1790158812206.jpg",
    tag: "Tropical",
  },
  {
    id: "kyoto",
    title: "Kyoto",
    country: "Japan",
    placesCount: 42,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    tag: "Historic",
  },
  {
    id: "santorini",
    title: "Santorini",
    country: "Greece",
    placesCount: 26,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790166049/photo-1527004013197-933c4bb611b3-1790166052225.jpg",
    tag: "Islands",
  },
  {
    id: "amalfi",
    title: "Amalfi Coast",
    country: "Italy",
    placesCount: 31,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158811/photo-1663428520845-056989f8a664-1790158812204.jpg",
    tag: "Coastal",
  },
  {
    id: "paris",
    title: "Paris",
    country: "France",
    placesCount: 54,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
    tag: "Romantic",
  },
  {
    id: "new-york",
    title: "New York",
    country: "USA",
    placesCount: 68,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790145142/photo-1500530855697-b586d89ba3ee-1790145143493.jpg",
    tag: "Metropolis",
  },
  {
    id: "cape-town",
    title: "Cape Town",
    country: "South Africa",
    placesCount: 29,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158812/photo-1695496896465-9e59091a8ed1-1790158812205.jpg",
    tag: "Adventure",
  },
  {
    id: "maui",
    title: "Maui",
    country: "Hawaii, USA",
    placesCount: 22,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
    tag: "Nature",
  },
  {
    id: "swiss-alps",
    title: "Swiss Alps",
    country: "Switzerland",
    placesCount: 35,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
    tag: "Alpine",
  },
  {
    id: "dubai",
    title: "Dubai",
    country: "UAE",
    placesCount: 47,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146211/photo-1519681393784-d120267933ba-1790146212210.jpg",
    tag: "Luxury",
  },
  {
    id: "banff",
    title: "Banff",
    country: "Canada",
    placesCount: 28,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
    tag: "Wilderness",
  },
  {
    id: "reykjavik",
    title: "Reykjavik",
    country: "Iceland",
    placesCount: 25,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158815/photo-1593378026483-2a1fd46a35bd-1790158812215.jpg",
    tag: "Aurora",
  },
  {
    id: "barcelona",
    title: "Barcelona",
    country: "Spain",
    placesCount: 44,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158812/photo-1710762634126-4c0e8fba44d8-1790158812206.jpg",
    tag: "Culture",
  },
  {
    id: "tokyo",
    title: "Tokyo",
    country: "Japan",
    placesCount: 72,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    tag: "Futuristic",
  },
  {
    id: "sydney",
    title: "Sydney",
    country: "Australia",
    placesCount: 39,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158811/photo-1682952986992-de7082fb213d-1790158812205.jpg",
    tag: "Harbour",
  },
  {
    id: "cairo",
    title: "Cairo",
    country: "Egypt",
    placesCount: 33,
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158809/photo-1628344253777-f73a64d8f983-1790158812202.jpg",
    tag: "Ancient",
  },
];

export function TopDestinationsCard({
  item,
  onExplore,
}: {
  item: DestinationItem;
  onExplore?: (item: DestinationItem) => void;
}) {
  return (
    <div
      tabIndex={0}
      role="button"
      onClick={() => onExplore?.(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExplore?.(item);
        }
      }}
      className={cn(
        "relative shrink-0 w-[196px] h-[244px] sm:w-72 sm:h-84 md:w-80 md:h-96 lg:w-[330px] lg:h-[400px]",
        "overflow-hidden rounded-2xl sm:rounded-3xl group cursor-pointer shadow-md select-none",
        "border border-border/40 bg-muted/40 outline-none focus-visible:ring-2 focus-visible:ring-primary",
      )}
    >
      {/* Background Image */}
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        draggable={false}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110 will-change-transform"
      />

      {/* Persistent Dark Gradient Shadow (stays visible on hover too) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0.12) 100%)",
        }}
      />

      {/* Rotated Country/City Title (Visible by default, fades out on hover) */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-4 left-6 sm:bottom-6 sm:left-8 -rotate-90 origin-left",
          "text-white text-base sm:text-2xl font-bold tracking-wider uppercase whitespace-nowrap",
          "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] pointer-events-none",
          "transition-all duration-500 opacity-100 group-hover:opacity-0 group-focus-visible:opacity-0 group-hover:-translate-y-4",
        )}
      >
        {item.title}
      </span>

      {/* Hover Overlay with Bordered Box — keeps blackish backdrop */}
      <div
        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500 p-3 sm:p-5 flex items-end"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.56)" }}
      >
        <div className="w-full h-full border border-white/25 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 flex flex-col justify-between backdrop-blur-[2px] transition-transform duration-500 transform translate-y-3 group-hover:translate-y-0 group-focus-visible:translate-y-0">
          {/* Top metadata */}
          <div className="flex justify-between items-center gap-2">
            {item.tag && (
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/15 text-white/90 border border-white/20 truncate">
                {item.tag}
              </span>
            )}
            <span className="text-[10px] sm:text-[11px] text-white/70 font-mono ml-auto truncate">
              {item.country || "Explore"}
            </span>
          </div>

          {/* Center Title and Places info */}
          <div className="my-auto text-center py-1 sm:py-2">
            <h3 className="text-white font-bold text-lg sm:text-3xl tracking-tight leading-tight">
              {item.title}
            </h3>
            {item.placesCount && (
              <p className="text-white/75 text-[11px] sm:text-sm mt-1 sm:mt-1.5 font-medium">
                {item.placesCount} Places to visit
              </p>
            )}
          </div>

          {/* Bottom Explore CTA Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExplore?.(item);
            }}
            className="text-white text-xs sm:text-sm font-semibold cursor-pointer inline-flex items-center gap-1 sm:gap-1.5 mx-auto hover:text-primary hover:underline underline-offset-4 transition-colors group/btn"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function TopDestinations({
  badgeText = "Top Destinations",
  badgeIcon = <MapPin className="w-4 h-4 text-primary" />,
  title = "Top Destinations",
  subtitle = "Experience our Instagram moments, where we share team activities, product stories, and memorable events that showcase our brand's journey and community connections.",
  items,
  row1Items,
  row2Items,
  scrollOffset = 450,
  scrollerRef,
  onExplore,
  className,
  ...props
}: TopDestinationsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Divide items into 2 rows if explicit rows are not supplied
  const effectiveItems = items || DEFAULT_DESTINATIONS;
  const half = Math.ceil(effectiveItems.length / 2);
  const r1 = row1Items || effectiveItems.slice(0, half);
  const r2 = row2Items || effectiveItems.slice(half);
  const displayRow1 = r1.length > 0 && r1.length < 10 ? [...r1, ...r1] : r1;
  const displayRow2 = r2.length > 0 && r2.length < 10 ? [...r2, ...r2] : r2;

  useEffect(() => {
    const container = containerRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!container || !row1 || !row2) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Resolve scrolling container (scrollerRef > nearest scrollable ancestor > window)
    const doc = container.ownerDocument;
    const win = doc.defaultView ?? window;
    let scrollerEl: Element | Window = win;

    if (scrollerRef?.current) {
      scrollerEl = scrollerRef.current;
    } else {
      let parent = container.parentElement;
      while (parent && parent !== doc.documentElement) {
        const style = win.getComputedStyle(parent);
        if (
          /(auto|scroll|overlay)/.test(style.overflowY) &&
          parent.scrollHeight > parent.clientHeight
        ) {
          scrollerEl = parent;
          break;
        }
        parent = parent.parentElement;
      }
    }

    const containerWidth = container.clientWidth || 1024;
    const effectiveOffset =
      containerWidth < 640
        ? Math.min(scrollOffset, Math.max(120, Math.round(containerWidth * 0.42)))
        : scrollOffset;

    const ctx = gsap.context(() => {
      // Row 1: starts shifted right, scrubs towards left
      gsap.fromTo(
        row1,
        { x: effectiveOffset },
        {
          x: -effectiveOffset,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            scroller: scrollerEl,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        },
      );

      // Row 2: starts shifted left, scrubs towards right
      gsap.fromTo(
        row2,
        { x: -effectiveOffset },
        {
          x: effectiveOffset,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            scroller: scrollerEl,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        },
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, [scrollOffset, scrollerRef]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "w-full pt-8 pb-14 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32 bg-background overflow-hidden relative select-none",
        className,
      )}
      {...props}
    >
      {/* Section Header */}
      <div className="container mx-auto px-4 text-center mb-7 sm:mb-14 lg:mb-16">
        {badgeText && (
          <div className="inline-flex items-center gap-2.5 sm:gap-3 relative mb-2.5 sm:mb-3">
            <span className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent to-primary" />
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-xs">
              {badgeIcon}
            </span>
            <span className="w-8 sm:w-12 h-0.5 bg-gradient-to-l from-transparent to-primary" />
          </div>
        )}

        {title && (
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="w-full text-xs sm:text-base max-w-md sm:max-w-none md:w-[62%] lg:w-[48%] mx-auto mt-2.5 sm:mt-3.5 px-1 sm:px-0 text-muted-foreground leading-relaxed text-pretty">
            {subtitle}
          </p>
        )}
      </div>

      {/* 2-Row Parallax Dual Scroll Container */}
      <div className="flex flex-col gap-4 sm:gap-8 lg:gap-10 overflow-hidden w-full">
        {/* Row 1 (Travels Left) */}
        <div className="w-full flex justify-center">
          <div
            ref={row1Ref}
            className="flex gap-3 sm:gap-6 will-change-transform"
          >
            {displayRow1.map((item, idx) => (
              <TopDestinationsCard
                key={`row1-${item.id}-${idx}`}
                item={item}
                onExplore={onExplore}
              />
            ))}
          </div>
        </div>

        {/* Row 2 (Travels Right) */}
        <div className="w-full flex justify-center">
          <div
            ref={row2Ref}
            className="flex gap-3 sm:gap-6 will-change-transform"
          >
            {displayRow2.map((item, idx) => (
              <TopDestinationsCard
                key={`row2-${item.id}-${idx}`}
                item={item}
                onExplore={onExplore}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
