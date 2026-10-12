"use client";

import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState, memo } from "react";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Flip } from "gsap/dist/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ==========================================
// ORBIT GALLERY & MOVING BENTO
// A dynamic visual showcase featuring:
// 1. Orbit Ring: revolving 3D circular photo carousel with upright rotation and mouse trail.
// 2. Moving Bento: self-rearranging image bento grid with a dominant center hero slot,
//    powered by fluid GSAP Flip transitions.
// ==========================================

export interface OrbitHighlight {
  label: string;
  /** Colour of the dot before the label; the accent by default. */
  color?: string;
}

export interface MovingBentoItem {
  id: string;
  title: string;
  description?: string;
  image: string;
}

export interface MovingBentoProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: MovingBentoItem[];
  swapInterval?: number;
  gap?: number;
  autoPlay?: boolean;
  color?: string;
  onCardClick?: (item: MovingBentoItem, index: number) => void;
}

export interface OrbitGalleryProps extends React.HTMLAttributes<HTMLElement> {
  /** Gallery variant: "orbit" (circular revolving ring) or "moving-bento" (GSAP Flip self-rearranging grid). */
  variant?: "orbit" | "moving-bento";
  /** Small tracked line above the headline, with a spark before it. */
  badgeText?: string;
  badgeHref?: string;
  /** The first line of the headline. */
  title?: string;
  /** The second line, set in the accent colour. */
  titleAccent?: string;
  subtitle?: string;
  primaryActionLabel?: string;
  primaryActionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  /** The photographs on the orbit ring, in orbit order. */
  images?: string[];
  /** Seconds for one full revolution of the orbit ring. */
  duration?: number;
  /** Small dotted facts under the actions. */
  highlights?: OrbitHighlight[];
  /** Accent colour — a preset name (indigo, rose, emerald, zinc) or any CSS colour. */
  color?: string;
  /** Pass `next/link` to keep client-side navigation. */
  linkComponent?: React.ElementType;

  // Moving Bento specific props
  /** Bento items for the "moving-bento" variant. */
  items?: MovingBentoItem[];
  /** Swap interval in ms for the bento variant. */
  swapInterval?: number;
  /** Grid gap in px for the bento variant. */
  gap?: number;
  /** Auto-swapping state for the bento variant. */
  autoPlay?: boolean;
}

// ------------------------------------------
// Accent colour: keep it readable on both light and dark surfaces.
// ------------------------------------------
type Rgb = [number, number, number];

const LIGHT_SURFACE_LUM = 1;
const DARK_SURFACE_LUM = 0.003;
const MIN_CONTRAST = 3;

const parseColor = (input: string): Rgb | null => {
  const hex = input.trim().replace(/^#/, "");
  if (/^[a-f\d]{3}$/i.test(hex)) {
    const [r, g, b] = hex.split("");
    return [parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16)];
  }
  if (/^[a-f\d]{6}$/i.test(hex)) {
    return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
  }
  const m = input.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
  return m ? [+m[1], +m[2], +m[3]] : null;
};

const relLuminance = ([r, g, b]: Rgb) => {
  const f = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

const ensureContrast = (rgb: Rgb, surfaceLum: number, target: 0 | 255): Rgb => {
  let out = rgb;
  for (let i = 0; i < 16; i++) {
    if (contrast(relLuminance(out), surfaceLum) >= MIN_CONTRAST) break;
    out = out.map((v) => Math.round(v + (target - v) * 0.12)) as Rgb;
  }
  return out;
};

const toCss = ([r, g, b]: Rgb) => `rgb(${r}, ${g}, ${b})`;

const PRESETS: Record<string, string> = {
  indigo: "#6366f1",
  rose: "#f43f5e",
  emerald: "#10b981",
  zinc: "#18181b",
};

function accentStyle(color?: string): React.CSSProperties {
  const resolved = !color || color === "primary" || color === "default" ? undefined : (PRESETS[color] ?? color);
  const rgb = resolved ? parseColor(resolved) : null;
  return {
    "--hero-accent-text": rgb
      ? `light-dark(${toCss(ensureContrast(rgb, LIGHT_SURFACE_LUM, 0))}, ${toCss(ensureContrast(rgb, DARK_SURFACE_LUM, 255))})`
      : "var(--primary)",
    ...(resolved ? { "--primary": resolved } : {}),
    ...(rgb ? { "--primary-foreground": relLuminance(rgb) > 0.45 ? "#09090b" : "#ffffff" } : {}),
  } as React.CSSProperties;
}

// ------------------------------------------
// Defaults
// ------------------------------------------
const DEFAULT_IMAGES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg", // Yosemite
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg", // Sunlit forest path
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg", // Mountain fog
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg", // Forest sunbeam
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg", // Green valley
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg", // Mountain lake
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg", // Wilderness
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg", // Peak at sunset
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790148863/photo-1447752875215-b2761acb3c5d-1790148865109.jpg", // Autumn stream
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1507525428034-b723cf961d3e-1790146212208.jpg", // Tropical coast
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790158813/photo-1433086966358-54859d0ed716-1790158812209.jpg", // Waterfall
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg", // Alps
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145142/photo-1500530855697-b586d89ba3ee-1790145143493.jpg", // Golden lake
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790148863/photo-1473448912268-2022ce9509d8-1790148865110.jpg", // Pine forest
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790158814/photo-1518495973542-4542c06a5843-1790158812213.jpg", // Sunlit trees
];

export const DEFAULT_BENTO_ITEMS: MovingBentoItem[] = [
  {
    id: "alpine-horizons",
    title: "Alpine Horizons",
    description: "Granite monoliths rising above early morning valley fog",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
  {
    id: "emerald-canopy",
    title: "Emerald Canopy",
    description: "Sunlit trails winding through ancient coastal redwood forests",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  },
  {
    id: "whispering-peaks",
    title: "Whispering Peaks",
    description: "Layers of mountain silhouettes veiled in twilight atmospheric mist",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "sunbeam-sanctuary",
    title: "Sunbeam Sanctuary",
    description: "Golden rays breaking through tall evergreens after summer rain",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  },
  {
    id: "verdant-valleys",
    title: "Verdant Valleys",
    description: "Rolling emerald highlands sweeping toward dramatic skies",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
  },
  {
    id: "glacial-waters",
    title: "Glacial Reflections",
    description: "Mirror-still alpine lake echoing snow-dusted jagged ridge lines",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
  },
  {
    id: "untamed-wilds",
    title: "Untamed Wilds",
    description: "Untouched wilderness under vibrant open skies",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
  {
    id: "golden-ridge",
    title: "Golden Ridge",
    description: "Late sunset warmth illuminating steep rocky summits",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  },
];

const DEFAULT_HIGHLIGHTS: OrbitHighlight[] = [
  { label: "15 hand-picked scenes" },
  { label: "Full-circle rotation", color: "#10b981" },
  { label: "Holds still on hover", color: "#f59e0b" },
];

const DEFAULT_BENTO_HIGHLIGHTS: OrbitHighlight[] = [
  { label: "GSAP Flip layout animation" },
  { label: "Self-rearranging hero card", color: "#10b981" },
  { label: "Click to focus", color: "#f59e0b" },
];

// ==========================================
// MOVING BENTO GRID DEFINITIONS
// ==========================================
interface SlotDef {
  gridColumn: string;
  gridRow: string;
}

const DESKTOP_SLOTS: SlotDef[] = [
  { gridColumn: "2 / 4", gridRow: "2 / 4" }, // CENTER HERO (2x2)
  { gridColumn: "1 / 2", gridRow: "1 / 2" }, // top-left
  { gridColumn: "2 / 4", gridRow: "1 / 2" }, // top-center wide
  { gridColumn: "4 / 5", gridRow: "1 / 2" }, // top-right
  { gridColumn: "1 / 2", gridRow: "2 / 3" }, // mid-left
  { gridColumn: "4 / 5", gridRow: "2 / 3" }, // mid-right
  { gridColumn: "1 / 2", gridRow: "3 / 4" }, // bottom-left
  { gridColumn: "4 / 5", gridRow: "3 / 4" }, // bottom-right
];

const TABLET_SLOTS: SlotDef[] = [
  { gridColumn: "2 / 4", gridRow: "2 / 4" }, // Hero (2x2)
  { gridColumn: "1 / 2", gridRow: "1 / 2" },
  { gridColumn: "2 / 3", gridRow: "1 / 2" },
  { gridColumn: "3 / 4", gridRow: "1 / 2" },
  { gridColumn: "1 / 2", gridRow: "2 / 3" },
  { gridColumn: "1 / 2", gridRow: "3 / 4" },
];

const MOBILE_SLOTS: SlotDef[] = [
  { gridColumn: "1 / 3", gridRow: "2 / 3" }, // Hero middle row (2 cols x 1 row)
  { gridColumn: "1 / 2", gridRow: "1 / 2" },
  { gridColumn: "2 / 3", gridRow: "1 / 2" },
  { gridColumn: "1 / 2", gridRow: "3 / 4" },
  { gridColumn: "2 / 3", gridRow: "3 / 4" },
];

const SLOT_COUNTS = { mobile: 5, tablet: 6, desktop: 8 } as const;
type Breakpoint = keyof typeof SLOT_COUNTS;

const SLOTS: Record<Breakpoint, SlotDef[]> = {
  mobile: MOBILE_SLOTS,
  tablet: TABLET_SLOTS,
  desktop: DESKTOP_SLOTS,
};

const GRID_COLS: Record<Breakpoint, number> = { mobile: 2, tablet: 3, desktop: 4 };
const ASPECT_RATIOS: Record<Breakpoint, string> = {
  mobile: "3 / 4",
  tablet: "4 / 3",
  desktop: "16 / 10",
};

const CENTER_SLOT = 0;
const DATA_ATTR = "data-moving-id";
const DATA_SELECTOR = `[${DATA_ATTR}]`;

function pickPeripheral(count: number): number {
  return 1 + Math.floor(Math.random() * (count - 1));
}

// ------------------------------------------
// Bento Card Component
// ------------------------------------------
const BentoCard = memo(function BentoCard({
  item,
  isHero,
  onClick,
}: {
  item: MovingBentoItem;
  isHero?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative size-full overflow-hidden rounded-2xl select-none transition-all duration-300",
        "border border-border/50 bg-card shadow-md hover:shadow-xl",
        !isHero && "cursor-pointer hover:border-primary/50 hover:brightness-105 active:scale-[0.98]",
        isHero && "ring-1 ring-primary/30 shadow-2xl"
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300"
        aria-hidden="true"
      />

      <div className="relative size-full flex flex-col justify-end p-2.5 sm:p-4 md:p-5 z-10 pointer-events-none">
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight drop-shadow-sm">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-[10px] sm:text-xs text-white/80 mt-0.5 sm:mt-1 leading-relaxed drop-shadow-sm line-clamp-1 sm:line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
});

// ------------------------------------------
// Moving Bento Standalone Component
// ------------------------------------------
export function MovingBento({
  items = DEFAULT_BENTO_ITEMS,
  swapInterval = 3000,
  gap = 12,
  autoPlay = true,
  color,
  className,
  style,
  onCardClick,
  ...props
}: MovingBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [bp, setBp] = useState<Breakpoint>("desktop");
  const isHovered = useRef(false);
  const isOffScreen = useRef(false);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const flipTweenRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  const [assignment, setAssignment] = useState<number[]>(() =>
    Array.from({ length: Math.max(items.length, SLOT_COUNTS.desktop) }, (_, i) => i % items.length)
  );

  const slots = SLOTS[bp];
  const slotCount = SLOT_COUNTS[bp];

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 639px)");
    const mqTablet = window.matchMedia("(min-width: 640px) and (max-width: 1023px)");
    const update = () => {
      if (mqMobile.matches) setBp("mobile");
      else if (mqTablet.matches) setBp("tablet");
      else setBp("desktop");
    };
    update();
    mqMobile.addEventListener("change", update);
    mqTablet.addEventListener("change", update);
    return () => {
      mqMobile.removeEventListener("change", update);
      mqTablet.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isOffScreen.current = !entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!flipStateRef.current || !hasEntered.current) return;
    const state = flipStateRef.current;
    flipStateRef.current = null;

    flipTweenRef.current?.kill();
    isAnimating.current = true;

    flipTweenRef.current = Flip.from(state, {
      duration: 1.0,
      ease: "power2.inOut",
      absolute: true,
      zIndex: 20,
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [assignment]);

  const swapWithHero = (slotIdx: number) => {
    if (slotIdx === CENTER_SLOT || isAnimating.current || !gridRef.current) return;
    flipStateRef.current = Flip.getState(gridRef.current.querySelectorAll(DATA_SELECTOR));
    setAssignment((prev) => {
      const next = [...prev];
      [next[CENTER_SLOT], next[slotIdx]] = [next[slotIdx], next[CENTER_SLOT]];
      return next;
    });
  };

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      if (isHovered.current || isOffScreen.current || isAnimating.current) return;
      if (!gridRef.current) return;

      const p = pickPeripheral(slotCount);
      swapWithHero(p);
    }, swapInterval);
    return () => clearInterval(id);
  }, [autoPlay, swapInterval, slotCount]);

  useEffect(() => {
    if (hasEntered.current || !gridRef.current) return;
    hasEntered.current = true;
    gsap.fromTo(
      gridRef.current.querySelectorAll(DATA_SELECTOR),
      { opacity: 0, y: 24, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        clearProps: "opacity,transform",
      }
    );
  }, []);

  useEffect(() => () => {
    flipTweenRef.current?.kill();
  }, []);

  return (
    <div
      ref={gridRef}
      onPointerEnter={() => {
        isHovered.current = true;
      }}
      onPointerLeave={() => {
        isHovered.current = false;
      }}
      role="region"
      aria-label="Moving bento grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_COLS[bp]}, 1fr)`,
        gridTemplateRows: "repeat(3, 1fr)",
        gap: `${gap}px`,
        aspectRatio: ASPECT_RATIOS[bp],
        ...accentStyle(color),
        ...style,
      }}
      className={cn("relative w-full select-none", className)}
      {...props}
    >
      {assignment.slice(0, slotCount).map((itemIdx, slotIdx) => {
        const item = items[itemIdx] ?? items[itemIdx % items.length];
        const isHero = slotIdx === CENTER_SLOT;
        return (
          <div
            key={item.id}
            {...{ [DATA_ATTR]: item.id }}
            style={{
              gridColumn: slots[slotIdx].gridColumn,
              gridRow: slots[slotIdx].gridRow,
            }}
            className="size-full overflow-hidden"
          >
            <BentoCard
              item={item}
              isHero={isHero}
              onClick={() => {
                if (!isHero) {
                  swapWithHero(slotIdx);
                  onCardClick?.(item, slotIdx);
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ------------------------------------------
// Root OrbitGallery
// ------------------------------------------
export const OrbitGallery = forwardRef<HTMLElement, OrbitGalleryProps>(
  (
    {
      variant = "orbit",
      badgeText = "Identity & animation studio",
      badgeHref = "#",
      title = "Wander through",
      titleAccent = "Wild Places, Up Close.",
      subtitle = "Lose yourself in sweeping valleys, quiet forests and remote peaks that feel a world away.",
      primaryActionLabel = "Browse photos",
      primaryActionHref = "#",
      secondaryActionLabel,
      secondaryActionHref = "#",
      images = DEFAULT_IMAGES,
      duration = 36,
      highlights,
      color,
      linkComponent: Link = "a",
      className,
      style,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      // Bento specific
      items = DEFAULT_BENTO_ITEMS,
      swapInterval = 3000,
      gap = 12,
      autoPlay = true,
      ...props
    },
    ref,
  ) => {
    const effectiveHighlights = highlights ?? (variant === "moving-bento" ? DEFAULT_BENTO_HIGHLIGHTS : DEFAULT_HIGHLIGHTS);
    const count = images.length;

    // The pointer trail: a handful of dots that follow the pointer while it is
    // over the section. Positions are sampled on a frame loop, not on every
    // mousemove, so the trail keeps an even spacing.
    const containerRef = useRef<HTMLElement | null>(null);
    const targetRef = useRef({ x: -100, y: -100 });
    const [pointer, setPointer] = useState({ x: -100, y: -100 });
    const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
      if (!hovered) return;
      let frame: number;
      let last = 0;
      const loop = (t: number) => {
        if (t - last > 20) {
          last = t;
          const { x, y } = targetRef.current;
          setTrail((prev) => [{ x, y, id: t }, ...prev.slice(0, 7)]);
        }
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(frame);
    }, [hovered]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      onMouseMove?.(e);
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetRef.current = { x, y };
      setPointer({ x, y });
    };
    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      onMouseEnter?.(e);
      setHovered(true);
    };
    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      onMouseLeave?.(e);
      setHovered(false);
      targetRef.current = { x: -100, y: -100 };
      setPointer({ x: -100, y: -100 });
      setTrail([]);
    };

    // ----------------------------------------
    // VARIANT: MOVING BENTO
    // ----------------------------------------
    if (variant === "moving-bento") {
      return (
        <section
          ref={(node) => {
            containerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ ...accentStyle(color), ...style }}
          className={cn(
            "relative flex w-full select-none items-center justify-center overflow-hidden bg-background py-6 sm:py-10 lg:py-12 text-foreground transition-colors duration-300",
            className,
          )}
          {...props}
        >
          {/* ---- Pointer trail ---- */}
          {hovered && (
            <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden" aria-hidden>
              {trail.map((pt, i) => {
                const size = Math.max(4, 18 - i * 2);
                const opacity = (trail.length - i) / trail.length;
                return (
                  <div
                    key={pt.id + i}
                    className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-150"
                    style={{
                      left: `${pt.x}px`,
                      top: `${pt.y}px`,
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: "var(--hero-accent-text)",
                      opacity: opacity * 0.7,
                    }}
                  />
                );
              })}
              <div
                className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg"
                style={{ left: `${pointer.x}px`, top: `${pointer.y}px`, backgroundColor: "var(--hero-accent-text)" }}
              />
            </div>
          )}

          <div className="relative z-10 w-full px-2 sm:px-4 md:px-6">
            <MovingBento
              items={items}
              swapInterval={swapInterval}
              gap={gap}
              autoPlay={autoPlay}
              color={color}
            />
          </div>
        </section>
      );
    }

    // ----------------------------------------
    // VARIANT: ORBIT (DEFAULT)
    // ----------------------------------------
    return (
      <section
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ ...accentStyle(color), ...style }}
        className={cn(
          "relative flex min-h-[580px] w-full select-none items-center overflow-hidden bg-background py-12 text-foreground transition-colors duration-300 sm:py-16 lg:py-24",
          className,
        )}
        {...props}
      >
        {/* ---- Pointer trail ---- */}
        {hovered && (
          <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden" aria-hidden>
            {trail.map((pt, i) => {
              const size = Math.max(4, 18 - i * 2);
              const opacity = (trail.length - i) / trail.length;
              return (
                <div
                  key={pt.id + i}
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-150"
                  style={{
                    left: `${pt.x}px`,
                    top: `${pt.y}px`,
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: "var(--hero-accent-text)",
                    opacity: opacity * 0.7,
                  }}
                />
              );
            })}
            <div
              className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg"
              style={{ left: `${pointer.x}px`, top: `${pointer.y}px`, backgroundColor: "var(--hero-accent-text)" }}
            />
          </div>
        )}

        {/* The orbit: every card is rotated about the ring's centre, pushed out
            by the radius, then counter-rotated so it stays upright. The radius
            grows with the breakpoint. */}
        <style>{`
          .orbit-gallery-ring {
            transform-style: preserve-3d;
            perspective: 3000px;
          }
          .orbit-gallery-card {
            --orbit-r: 110px;
            transform-style: preserve-3d;
            backface-visibility: hidden;
          }
          @media (min-width: 480px) { .orbit-gallery-card { --orbit-r: 135px; } }
          @media (min-width: 640px) { .orbit-gallery-card { --orbit-r: 185px; } }
          @media (min-width: 1024px) { .orbit-gallery-card { --orbit-r: 220px; } }
          @keyframes orbit-gallery-slide {
            0%   { transform: rotate(0deg)   translateY(calc(-1 * var(--orbit-r))) rotateY(2.5deg) rotate(0deg); }
            25%  { transform: rotate(90deg)  translateY(calc(-1 * var(--orbit-r))) rotateY(2.5deg) rotate(-90deg); }
            50%  { transform: rotate(180deg) translateY(calc(-1 * var(--orbit-r))) rotateY(2.5deg) rotate(-180deg); }
            75%  { transform: rotate(270deg) translateY(calc(-1 * var(--orbit-r))) rotateY(2.5deg) rotate(-270deg); }
            100% { transform: rotate(360deg) translateY(calc(-1 * var(--orbit-r))) rotateY(2.5deg) rotate(-360deg); }
          }
          .orbit-gallery-card { animation: orbit-gallery-slide var(--orbit-duration, 36s) linear infinite; }
          .orbit-gallery-ring:hover .orbit-gallery-card { animation-play-state: paused; }
          .orbit-gallery-card:hover { z-index: 50; }
          @media (prefers-reduced-motion: reduce) { .orbit-gallery-card { animation-play-state: paused; } }
        `}</style>

        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* ---- Copy and actions ---- */}
            <div className="z-10 col-span-1 flex flex-col justify-center space-y-6 sm:space-y-8 lg:col-span-6">
              {badgeText && (
                <Link href={badgeHref} className="group inline-block self-start">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground sm:text-sm">
                    <Sparkles className="size-3.5 shrink-0 text-[var(--hero-accent-text)]" />
                    <span>{badgeText}</span>
                  </div>
                </Link>
              )}

              <h1 className="text-xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-3xl lg:text-[36px] xl:text-[42px]">
                <span className="block">{title}</span>
                {titleAccent && (
                  <span className="mt-1 block font-bold tracking-tight" style={{ color: "var(--hero-accent-text)" }}>
                    {titleAccent}
                  </span>
                )}
              </h1>

              {subtitle && (
                <div className="border-l-3 py-1 pl-4 transition-colors duration-300" style={{ borderColor: "var(--hero-accent-text)" }}>
                  <p className="max-w-lg text-sm font-medium leading-relaxed text-muted-foreground sm:text-base lg:text-lg">{subtitle}</p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3.5 pt-2 sm:gap-4">
                <Link
                  href={primaryActionHref}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-2xl px-7 py-3.5 text-sm font-extrabold shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 sm:py-4 sm:text-base"
                  style={{ backgroundColor: "var(--hero-accent-text)", color: "var(--primary-foreground)" }}
                >
                  <span>{primaryActionLabel}</span>
                  <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>

                {secondaryActionLabel && (
                  <Link
                    href={secondaryActionHref}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted active:translate-y-0 sm:py-4 sm:text-base"
                  >
                    <span>{secondaryActionLabel}</span>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                  </Link>
                )}
              </div>

              {effectiveHighlights.length > 0 && (
                <div className="flex flex-wrap items-center gap-5 border-t border-border/40 pt-2 text-xs font-semibold text-muted-foreground sm:gap-8">
                  {effectiveHighlights.map((h) => (
                    <div key={h.label} className="flex items-center gap-2">
                      <div className="size-2 rounded-full" style={{ backgroundColor: h.color ?? "var(--hero-accent-text)" }} />
                      <span>{h.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ---- The ring ---- */}
            <div className="relative col-span-1 flex h-[460px] items-center justify-center overflow-visible py-4 sm:h-[560px] lg:col-span-6 lg:h-[620px]">
              <div
                className="orbit-gallery-ring pointer-events-auto relative flex size-[340px] cursor-pointer items-center justify-center overflow-visible rounded-full sm:size-[440px] lg:size-[480px]"
                style={{ "--orbit-duration": `${duration}s` } as React.CSSProperties}
              >
                <div className="pointer-events-none absolute inset-0 rounded-full border border-foreground/10" aria-hidden />

                {images.map((src, i) => (
                  <div
                    key={src + i}
                    data-index={i}
                    className="orbit-gallery-card pointer-events-auto absolute left-1/2 top-1/2 -ml-[38px] -mt-[48px] h-[96px] w-[76px] sm:-ml-[62px] sm:-mt-[77px] sm:h-[155px] sm:w-[125px] lg:-ml-[75px] lg:-mt-[90px] lg:h-[180px] lg:w-[150px]"
                    style={{ animationDelay: `${-((i / count) * duration)}s` }}
                  >
                    <div className="group h-full w-full overflow-hidden rounded-[22px] border-2 border-card bg-card shadow-2xl transition-all duration-300 hover:scale-110 sm:rounded-[28px]">
                      <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

OrbitGallery.displayName = "OrbitGallery";

export default OrbitGallery;
