"use client";

import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, memo } from "react";
import { Aperture, ArrowRight, ArrowUpRight, Camera, Compass, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Flip } from "gsap/dist/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ==========================================
// ORBIT GALLERY, MOVING BENTO & CIRCULAR REEL
// A dynamic visual showcase featuring:
// 1. Orbit Ring: revolving 3D circular photo carousel with upright rotation and mouse trail.
// 2. Moving Bento: self-rearranging image bento grid with a dominant center hero slot,
//    powered by fluid GSAP Flip transitions.
// 3. Circular Reel: interactive scroll-driven dial with passive rotation,
//    tangential segmented ring slices, and auto-crossfading preview.
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

export interface CircularReelItem {
  id?: string;
  name: string;
  category?: string;
  description?: string;
  image: string;
  href?: string;
}

export interface CircularReelProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: CircularReelItem[];
  color?: string;
  accentColor?: string;
  backgroundColor?: string;
  idleRotationSpeed?: number;
  scrollSensitivity?: number;
  ringThickness?: number;
  fontSize?: number;
  grayscale?: boolean;
  autoPlay?: boolean;
  onItemChange?: (item: CircularReelItem, index: number) => void;
}

export interface PillCarouselItem {
  id?: string;
  image: string | { src: string; alt?: string };
  tooltipText?: string;
  link?: string;
}

export interface PillCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: PillCarouselItem[];
  color?: string;
  backgroundColor?: string;
  cardBorderRadius?: number;
  cardShadow?: string;
  activeBorderWidth?: number;
  activeBorderColor?: string;
  transitionDuration?: number;
  hoverScale?: number;
  hoverBrightness?: number;
  /** Controls whether pills slide automatically (true) or only when clicked (false). Defaults to true. */
  autoSlide?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  tooltipText?: string;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipPadding?: string;
  tooltipFontSize?: number;
  tooltipBorderRadius?: number;
  tooltipShadow?: string;
  linkNewTab?: boolean;
  onTooltipClick?: (item: PillCarouselItem, index: number) => void;
}

export interface ArcCarouselItem {
  id?: string;
  image: string | { src: string; alt?: string };
  title?: string;
  subtitle?: string;
  link?: string;
}

export interface ArcCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: ArcCarouselItem[];
  color?: string;
  backgroundColor?: string;
  cardSize?: number;
  cardHeight?: number;
  gap?: number;
  /** Curvature value from -300 to 300 (defaults to -200 for a concave arc). */
  curve?: number;
  perspective?: number;
  autoScrollSpeed?: number;
  autoSlide?: boolean;
  autoPlay?: boolean;
  dragSpeed?: number;
  inertia?: number;
  borderRadius?: number;
  linkNewTab?: boolean;
  onCardClick?: (item: ArcCarouselItem, index: number) => void;
}

export interface GalleryProps extends React.HTMLAttributes<HTMLElement> {
  /** Gallery variant: "orbit" (circular revolving ring), "moving-bento" (GSAP Flip self-rearranging grid), "circular-reel" (interactive scroll-driven spinner), "pill-carousel" (3D layered pill carousel), or "arc-carousel" / "arc-carousel-gallery" (3D cylindrical arc carousel). */
  variant?: "orbit" | "moving-bento" | "circular-reel" | "pill-carousel" | "arc-carousel" | "arc-carousel-gallery";
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
  /** Auto-swapping state for the bento / reel / pill-carousel / arc-carousel variants. */
  autoPlay?: boolean;

  // Circular Reel specific props
  /** Reel items for the "circular-reel" variant. */
  reelItems?: CircularReelItem[];
  /** Degrees per second of idle passive rotation. */
  idleRotationSpeed?: number;
  /** Wheel / scroll delta multiplier. */
  scrollSensitivity?: number;
  /** Donut ring thickness percentage (10 to 60). */
  ringThickness?: number;
  /** Filter images with grayscale preview. */
  grayscale?: boolean;

  // 3D Pill Carousel specific props
  /** Pill items for the "pill-carousel" variant. */
  pillItems?: PillCarouselItem[];
  /** Pill card border radius in px. */
  cardBorderRadius?: number;
  /** Active center pill border width in px. */
  activeBorderWidth?: number;
  /** Active center pill border color (defaults to theme primary/accent). */
  activeBorderColor?: string;
  /** Transition duration in seconds for pill movement. */
  transitionDuration?: number;
  /** Scale multiplier when hovering peripheral pills. */
  hoverScale?: number;
  /** Brightness multiplier when hovering peripheral pills. */
  hoverBrightness?: number;
  /** Controls whether pills slide automatically (true) or only on click (false). Defaults to true. */
  autoSlide?: boolean;
  /** Auto-play interval in ms for the pill carousel. */
  autoPlayInterval?: number;
  /** Default fallback tooltip CTA text. */
  tooltipText?: string;
  /** Tooltip background color (defaults to theme primary/accent). */
  tooltipBackgroundColor?: string;
  /** Tooltip text color (defaults to theme primary-foreground). */
  tooltipTextColor?: string;

  // Arc Carousel specific props
  /** Items for the "arc-carousel" variant. */
  arcItems?: ArcCarouselItem[];
  /** Width of each card in px (defaults to 220). */
  cardSize?: number;
  /** Height of each card in px (defaults to cardSize * 1.32). */
  cardHeight?: number;
  /** Curvature value from -300 to 300 (negative is concave, 0 is flat, positive is convex). Defaults to -200. */
  curve?: number;
  /** 3D perspective depth in px (defaults to 1200). */
  perspective?: number;
  /** Auto-scroll rotation speed (defaults to 0.22). */
  autoScrollSpeed?: number;
  /** Drag sensitivity multiplier (defaults to 1.2). */
  dragSpeed?: number;
  /** Momentum inertia friction (0 to 1, defaults to 0.75). */
  inertia?: number;
  /** Card border radius in px for the arc carousel. */
  borderRadius?: number;
}

export type OrbitGalleryProps = GalleryProps;

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

export const DEFAULT_CIRCULAR_REEL_ITEMS: CircularReelItem[] = [
  {
    id: "reel-1",
    name: "Velvet Horizon",
    category: "Yosemite Valley",
    description: "Granite peaks glowing in the golden twilight above misty valley floor",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
  {
    id: "reel-2",
    name: "Glass Relay",
    category: "Redwood Trail",
    description: "Ancient sequoias towering through filtered coastal morning rays",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  },
  {
    id: "reel-3",
    name: "Noir Mist",
    category: "Mountain Peaks",
    description: "Monochrome layered ridges dissolving into distant cloud banks",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "reel-4",
    name: "Driftline Rays",
    category: "Canopy Light",
    description: "Luminescent beams descending through mossy pine canopies",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  },
  {
    id: "reel-5",
    name: "Pulse Emerald",
    category: "Verdant Highlands",
    description: "Vibrant rolling green bluffs descending toward serene shoreline",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
  },
  {
    id: "reel-6",
    name: "Cold Meridian",
    category: "Alpine Lake",
    description: "Crystalline glacial waters reflecting jagged snow-capped crests",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
  },
  {
    id: "reel-7",
    name: "Astra Wilds",
    category: "Open Range",
    description: "Solitary wanderer contemplating vast expanses of pristine tundra",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
  {
    id: "reel-8",
    name: "Mono Summit",
    category: "Golden Ridge",
    description: "Sharp stone pinnacles bathed in amber warmth at sunrise",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  },
  {
    id: "reel-9",
    name: "Lumen Cascade",
    category: "Forest Waterfall",
    description: "Rushing mountain falls carving through lush temperate rainforest",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158813/photo-1433086966358-54859d0ed716-1790158812209.jpg",
  },
  {
    id: "reel-10",
    name: "Shadow Bloom",
    category: "Alpine Crest",
    description: "Majestic European peaks framed by drifting atmospheric shadows",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
  },
];

const DEFAULT_REEL_HIGHLIGHTS: OrbitHighlight[] = [
  { label: "Interactive circular dial" },
  { label: "Scroll & drag to spin", color: "#10b981" },
  { label: "Auto-crossfading preview", color: "#f59e0b" },
];

export const DEFAULT_PILL_CAROUSEL_ITEMS: PillCarouselItem[] = [
  {
    id: "pill-1",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
      alt: "Daily Rituals",
    },
    tooltipText: "Daily Rituals",
    link: "",
  },
  {
    id: "pill-2",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
      alt: "Slow Living",
    },
    tooltipText: "Slow Living",
    link: "",
  },
  {
    id: "pill-3",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
      alt: "Explore",
    },
    tooltipText: "Explore",
    link: "",
  },
  {
    id: "pill-4",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
      alt: "Morning Flow",
    },
    tooltipText: "Morning Flow",
    link: "",
  },
  {
    id: "pill-5",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
      alt: "Soft Focus",
    },
    tooltipText: "Soft Focus",
    link: "",
  },
];

const DEFAULT_PILL_HIGHLIGHTS: OrbitHighlight[] = [
  { label: "3D layered pill cards" },
  { label: "Click to focus & keyboard nav", color: "#10b981" },
  { label: "Animated tooltip CTA", color: "#f59e0b" },
];

export const DEFAULT_ARC_CAROUSEL_ITEMS: ArcCarouselItem[] = [
  {
    id: "arc-1",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
    title: "Velvet Horizon",
    subtitle: "Yosemite Valley",
  },
  {
    id: "arc-2",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
    title: "Glass Relay",
    subtitle: "Redwood Trail",
  },
  {
    id: "arc-3",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    title: "Noir Mist",
    subtitle: "Mountain Peaks",
  },
  {
    id: "arc-4",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    title: "Driftline Rays",
    subtitle: "Canopy Light",
  },
  {
    id: "arc-5",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
    title: "Pulse Emerald",
    subtitle: "Verdant Highlands",
  },
  {
    id: "arc-6",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
    title: "Cold Meridian",
    subtitle: "Alpine Lake",
  },
  {
    id: "arc-7",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
    title: "Astra Wilds",
    subtitle: "Open Range",
  },
  {
    id: "arc-8",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
    title: "Mono Summit",
    subtitle: "Golden Ridge",
  },
  {
    id: "arc-9",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158813/photo-1433086966358-54859d0ed716-1790158812209.jpg",
    title: "Lumen Cascade",
    subtitle: "Forest Waterfall",
  },
  {
    id: "arc-10",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    title: "Shadow Bloom",
    subtitle: "Alpine Crest",
  },
];

const DEFAULT_ARC_HIGHLIGHTS: OrbitHighlight[] = [
  { label: "3D Cylindrical Arc" },
  { label: "Momentum Physics", color: "#10b981" },
  { label: "Concave Curvature", color: "#f59e0b" },
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
// Circular Reel Standalone Component
// ------------------------------------------
export const CircularReel = forwardRef<HTMLDivElement, CircularReelProps>(
  (
    {
      items = DEFAULT_CIRCULAR_REEL_ITEMS,
      color,
      accentColor,
      backgroundColor,
      idleRotationSpeed = 5,
      scrollSensitivity = 0.06,
      ringThickness = 37,
      fontSize = 12,
      grayscale = false,
      autoPlay = true,
      onItemChange,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [activeIndex, setActiveIndex] = useState(0);
    const uid = React.useId().replace(/:/g, "-");

    const spinnerGroupRef = useRef<SVGGElement | null>(null);
    const indicatorGroupRef = useRef<SVGGElement | null>(null);

    const isDragging = useRef(false);
    const dragCenter = useRef({ x: 0, y: 0, lastAngle: 0 });

    const rotRef = useRef({
      currentIndicatorRotation: 0,
      targetIndicatorRotation: 0,
      currentSpinnerRotation: 0,
      targetSpinnerRotation: 0,
      direction: 1,
      lastTime: typeof performance !== "undefined" ? performance.now() : 0,
      lastIndex: 0,
      rafId: 0,
    });

    const itemsRef = useRef(items);
    itemsRef.current = items;
    const onItemChangeRef = useRef(onItemChange);
    onItemChangeRef.current = onItemChange;

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      const updateSize = () => {
        const w = el.clientWidth || 800;
        const h = el.clientHeight || Math.max(500, Math.min(w * 0.72, 680));
        setDimensions({ width: w, height: h });
      };
      updateSize();
      const observer = new ResizeObserver(updateSize);
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    const outerRadius = Math.max(120, Math.min(dimensions.width, dimensions.height) * 0.46);
    const thicknessPct = Math.max(10, Math.min(60, ringThickness));
    const innerRadius = outerRadius * (1 - thicknessPct / 100);
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    // Animation frame loop: uniform constant-speed auto-spin + frame-rate-independent scroll smoothing
    useEffect(() => {
      const lerp = (start: number, target: number, factor: number) =>
        start + (target - start) * factor;

      const tick = (now: number) => {
        const state = rotRef.current;
        let dt = (now - state.lastTime) / 1000;
        state.lastTime = now;
        if (dt <= 0 || dt > 0.1) dt = 1 / 60;

        if (!isDragging.current && autoPlay) {
          // Advance both current and target linearly so auto-scroll is 100% constant speed (never speeds up or slows down)
          const autoDelta = idleRotationSpeed * 0.45 * state.direction * dt;
          state.targetIndicatorRotation += autoDelta;
          state.currentIndicatorRotation += autoDelta;
          state.targetSpinnerRotation -= autoDelta;
          state.currentSpinnerRotation -= autoDelta;
        }

        // Frame-rate-independent smoothing for user scroll / drag / click offsets
        const smoothFactor = 1 - Math.exp(-8 * dt);
        state.currentIndicatorRotation = lerp(
          state.currentIndicatorRotation,
          state.targetIndicatorRotation,
          smoothFactor,
        );
        state.currentSpinnerRotation = lerp(
          state.currentSpinnerRotation,
          state.targetSpinnerRotation,
          smoothFactor,
        );

        if (indicatorGroupRef.current) {
          const indAngle = state.currentIndicatorRotation % 360;
          indicatorGroupRef.current.setAttribute(
            "transform",
            `rotate(${indAngle} ${centerX} ${centerY})`,
          );
        }

        if (spinnerGroupRef.current) {
          const spinAngle = state.currentSpinnerRotation % 360;
          spinnerGroupRef.current.setAttribute(
            "transform",
            `rotate(${spinAngle} ${centerX} ${centerY})`,
          );
        }

        const total = itemsRef.current.length;
        if (total > 0) {
          const angleStep = 360 / total;
          const diff =
            ((state.currentIndicatorRotation - state.currentSpinnerRotation) % 360 + 360) % 360;
          const idx = Math.floor(diff / angleStep) % total;
          if (idx !== state.lastIndex) {
            state.lastIndex = idx;
            setActiveIndex(idx);
            onItemChangeRef.current?.(itemsRef.current[idx], idx);
          }
        }

        state.rafId = requestAnimationFrame(tick);
      };

      rotRef.current.lastTime = performance.now();
      rotRef.current.rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rotRef.current.rafId);
    }, [autoPlay, idleRotationSpeed, centerX, centerY]);

    // Wheel & Window Scroll listeners with speed-dependent rotation boost
    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      let lastWheelTime = performance.now();

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const now = performance.now();
        const elapsed = Math.max(8, now - lastWheelTime);
        lastWheelTime = now;

        const rawDelta = e.deltaY;
        if (Math.abs(rawDelta) < 0.1) return;

        const dir = rawDelta >= 0 ? 1 : -1;
        rotRef.current.direction = dir;

        // Calculate scroll speed (px/ms) so faster scrolling spins significantly more
        const wheelSpeed = Math.abs(rawDelta) / elapsed;
        const speedMultiplier = 1 + Math.min(wheelSpeed * 1.1 + Math.abs(rawDelta) / 60, 5);
        const delta = rawDelta * scrollSensitivity * speedMultiplier;

        rotRef.current.targetIndicatorRotation += delta;
        rotRef.current.targetSpinnerRotation -= delta;
      };

      let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
      let lastScrollTime = performance.now();

      const onWindowScroll = () => {
        const now = performance.now();
        const dy = window.scrollY - lastScrollY;
        const elapsed = Math.max(8, now - lastScrollTime);
        lastScrollY = window.scrollY;
        lastScrollTime = now;

        if (Math.abs(dy) < 1) return;
        const dir = dy >= 0 ? 1 : -1;
        rotRef.current.direction = dir;

        const pageScrollSpeed = Math.abs(dy) / elapsed;
        const speedMultiplier = 1 + Math.min(pageScrollSpeed * 1.5, 4.5);
        const delta = dy * scrollSensitivity * 0.8 * speedMultiplier;

        rotRef.current.targetIndicatorRotation += delta;
        rotRef.current.targetSpinnerRotation -= delta;
      };

      el.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("scroll", onWindowScroll, { passive: true });
      return () => {
        el.removeEventListener("wheel", onWheel);
        window.removeEventListener("scroll", onWindowScroll);
      };
    }, [scrollSensitivity]);

    // Pointer Drag handlers
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      isDragging.current = true;
      (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      dragCenter.current = { x: cx, y: cy, lastAngle: angle };
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      const { x: cx, y: cy, lastAngle } = dragCenter.current;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      let delta = angle - lastAngle;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      rotRef.current.targetSpinnerRotation += delta;
      rotRef.current.targetIndicatorRotation -= delta * 0.25;
      dragCenter.current.lastAngle = angle;
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      isDragging.current = false;
      try {
        (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
      } catch {}
    };

    const handleSegmentClick = (index: number) => {
      const total = items.length;
      if (total === 0) return;
      const angleStep = 360 / total;
      const targetAngle = (index + 0.5) * angleStep;
      rotRef.current.targetSpinnerRotation =
        rotRef.current.currentIndicatorRotation - targetAngle;
    };

    const count = items.length;
    const d = (2 * Math.PI) / (count || 1);

    const segments = useMemo(() => {
      return items.map((item, i) => {
        const startAngle = i * d - Math.PI / 2;
        const endAngle = (i + 1) * d - Math.PI / 2;
        const midAngle = (startAngle + endAngle) / 2;

        const x1 = centerX + outerRadius * Math.cos(startAngle);
        const y1 = centerY + outerRadius * Math.sin(startAngle);
        const x2 = centerX + outerRadius * Math.cos(endAngle);
        const y2 = centerY + outerRadius * Math.sin(endAngle);
        const x3 = centerX + innerRadius * Math.cos(endAngle);
        const y3 = centerY + innerRadius * Math.sin(endAngle);
        const x4 = centerX + innerRadius * Math.cos(startAngle);
        const y4 = centerY + innerRadius * Math.sin(startAngle);

        const pathD = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`;

        const midRadius = (innerRadius + outerRadius) / 2;
        const midX = centerX + Math.cos(midAngle) * midRadius;
        const midY = centerY + Math.sin(midAngle) * midRadius;
        const imgW = outerRadius * d * 1.38;
        const imgH = (outerRadius - innerRadius) * 1.38;
        const imgRot = (midAngle * 180) / Math.PI + 90;

        return {
          item,
          index: i,
          pathD,
          midX,
          midY,
          imgW,
          imgH,
          imgRot,
        };
      });
    }, [items, d, centerX, centerY, outerRadius, innerRadius]);

    const activeItem = items[activeIndex] ?? items[0];

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => {
          isDragging.current = false;
        }}
        style={{
          ...accentStyle(color ?? accentColor),
          ...(backgroundColor ? { backgroundColor } : {}),
          ...style,
        }}
        className={cn(
          "relative flex h-[400px] sm:h-[600px] md:h-[660px] lg:h-[720px] w-full select-none cursor-grab active:cursor-grabbing items-center justify-center overflow-hidden rounded-2xl",
          className,
        )}
        {...props}
      >
        {/* Full-Bleed Active Image Background (Instant Switch, No Blank Screen on Fast Scroll) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {items.map((item, idx) => (
            <div
              key={item.id ?? item.name + idx}
              className={cn(
                "absolute inset-0",
                idx === activeIndex
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none",
              )}
              style={{
                filter: grayscale ? "saturate(0)" : undefined,
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="size-full object-cover object-center"
              />
            </div>
          ))}
        </div>

        {/* SVG Segmented Wheel */}
        <svg
          className="absolute inset-0 size-full pointer-events-auto"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          aria-label="Circular reel spinner"
        >
          <defs>
            {segments.map((seg) => (
              <clipPath key={`clip-${uid}-${seg.index}`} id={`reel-clip-${uid}-${seg.index}`}>
                <path d={seg.pathD} />
              </clipPath>
            ))}
          </defs>

          {/* Rotating Spinner Group */}
          <g ref={spinnerGroupRef}>
            {segments.map((seg) => {
              const isSelected = seg.index === activeIndex;
              return (
                <g
                  key={seg.index}
                  clipPath={`url(#reel-clip-${uid}-${seg.index})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSegmentClick(seg.index);
                  }}
                  className="cursor-pointer"
                >
                  <image
                    href={seg.item.image}
                    width={seg.imgW}
                    height={seg.imgH}
                    x={seg.midX - seg.imgW / 2}
                    y={seg.midY - seg.imgH / 2}
                    preserveAspectRatio="xMidYMid slice"
                    transform={`rotate(${seg.imgRot} ${seg.midX} ${seg.midY})`}
                    style={{
                      filter: grayscale ? "saturate(0)" : undefined,
                    }}
                  />
                  {/* Segment separation line */}
                  <path
                    d={seg.pathD}
                    fill="none"
                    stroke={isSelected ? "var(--hero-accent-text, #ffff2b)" : "rgba(255,255,255,0.18)"}
                    strokeWidth={isSelected ? "2" : "0.75"}
                  />
                </g>
              );
            })}
          </g>

          {/* Inner Lens Reticle Ring */}
          <circle
            cx={centerX}
            cy={centerY}
            r={Math.max(40, innerRadius * 0.91)}
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
            strokeDasharray="4 6"
            className="pointer-events-none"
          />

          {/* Rotating Dial Indicator */}
          <g ref={indicatorGroupRef} className="pointer-events-none">
            <line
              x1={centerX}
              y1={centerY - innerRadius * 0.85}
              x2={centerX}
              y2={centerY - outerRadius * 1.08}
              stroke="var(--hero-accent-text, #ffff2b)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* Center Active Showcase HUD (Responsive Icons + Text) */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center px-2 sm:px-3"
          style={{
            maxWidth: `${Math.min(300, Math.max(136, Math.round(innerRadius * 1.56)))}px`,
          }}
        >
          {/* Category & Index Pill */}
          <div className="mb-1 sm:mb-2.5 inline-flex max-w-full items-center gap-1 sm:gap-1.5 rounded-full border border-white/25 bg-black/45 px-2 py-0.5 sm:px-3 sm:py-1 font-mono text-[8px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest text-white shadow-lg backdrop-blur-md">
            <Compass
              className="size-2.5 sm:size-3.5 shrink-0"
              style={{ color: "var(--hero-accent-text, #ffff2b)" }}
            />
            <span className="truncate max-w-[78px] xs:max-w-[100px] sm:max-w-[170px]">
              {activeItem?.category || "Featured Scene"}
            </span>
            <span className="opacity-40">•</span>
            <span className="tabular-nums opacity-85 shrink-0">
              {String(activeIndex + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")}
            </span>
          </div>

          {/* Main Active Title Badge with Icons */}
          <div
            className="inline-flex max-w-full items-center justify-center gap-1 sm:gap-2 rounded-md px-2 py-1 sm:px-3.5 sm:py-1.5 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider shadow-xl whitespace-nowrap"
            style={{
              backgroundColor: "var(--hero-accent-text, #ffff2b)",
              color: "#000000",
              fontSize: innerRadius < 130 ? "10px" : `${fontSize}px`,
            }}
          >
            <Sparkles className="size-3 sm:size-4 shrink-0" />
            <span className="truncate">{activeItem?.name || "Widget"}</span>
            <span className="inline-flex size-3.5 sm:size-5 shrink-0 items-center justify-center rounded-sm bg-black/15">
              <ArrowUpRight className="size-2.5 sm:size-3.5" />
            </span>
          </div>

          {/* Scene Description */}
          {activeItem?.description && innerRadius >= 85 && (
            <p className="mt-1 sm:mt-2.5 line-clamp-1 sm:line-clamp-2 w-full rounded-md sm:rounded-lg border border-white/15 bg-black/40 px-2 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-xs font-medium leading-tight sm:leading-relaxed text-white/95 shadow-md backdrop-blur-md">
              {activeItem.description}
            </p>
          )}

          {/* Telemetry & Camera Metadata Row */}
          <div className="mt-1 sm:mt-2.5 flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/45 px-1.5 py-0.5 sm:px-2.5 font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-white/90 backdrop-blur-md">
              <Aperture
                className="size-2.5 sm:size-3 shrink-0"
                style={{ color: "var(--hero-accent-text, #ffff2b)" }}
              />
              f/1.8
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/45 px-1.5 py-0.5 sm:px-2.5 font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-white/90 backdrop-blur-md">
              <Camera
                className="size-2.5 sm:size-3 shrink-0"
                style={{ color: "var(--hero-accent-text, #ffff2b)" }}
              />
              {24 + (activeIndex % 4) * 12}mm
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/45 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/90 backdrop-blur-md">
              <MapPin
                className="size-3 shrink-0"
                style={{ color: "var(--hero-accent-text, #ffff2b)" }}
              />
              {Math.round((activeIndex * 360) / Math.max(1, items.length))}°
            </span>
          </div>
        </div>
      </div>
    );
  },
);

CircularReel.displayName = "CircularReel";

// ------------------------------------------
// 3D Pill Carousel Standalone Component
// ------------------------------------------
export const ThreeDPillCarousel = forwardRef<HTMLDivElement, PillCarouselProps>(
  (
    {
      items = DEFAULT_PILL_CAROUSEL_ITEMS,
      color,
      backgroundColor,
      cardBorderRadius = 200,
      cardShadow = "0 20px 60px rgba(0, 0, 0, 0.3)",
      activeBorderWidth = 6,
      activeBorderColor,
      transitionDuration = 0.6,
      hoverScale = 1.05,
      hoverBrightness = 1.15,
      autoSlide,
      autoPlay = true,
      autoPlayInterval = 3000,
      tooltipText = "View Details",
      tooltipBackgroundColor,
      tooltipTextColor,
      tooltipPadding = "12px 24px",
      tooltipFontSize = 14,
      tooltipBorderRadius = 50,
      tooltipShadow = "0 4px 12px rgba(0, 0, 0, 0.15)",
      linkNewTab = true,
      onTooltipClick,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [tooltipHovered, setTooltipHovered] = useState(false);
    const [tooltipPressed, setTooltipPressed] = useState(false);

    const shouldAutoSlide = autoSlide ?? autoPlay ?? true;

    const validItems = useMemo(
      () =>
        items.filter((item) => {
          const src = typeof item?.image === "string" ? item.image : item?.image?.src;
          return Boolean(src);
        }),
      [items],
    );

    const openLink = (url?: string) => {
      if (!url || typeof window === "undefined") return;
      if (linkNewTab) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = url;
      }
    };

    const handleNext = () => {
      if (validItems.length === 0) return;
      React.startTransition(() => {
        setCurrentIndex((prev) => (prev + 1) % validItems.length);
      });
    };

    const handlePrev = () => {
      if (validItems.length === 0) return;
      React.startTransition(() => {
        setCurrentIndex((prev) => (prev - 1 + validItems.length) % validItems.length);
      });
    };

    const handleCardClick = (index: number) => {
      React.startTransition(() => {
        setCurrentIndex(index);
      });
    };

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          handleNext();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          handlePrev();
        }
      };
      if (typeof window !== "undefined") {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
      }
    }, [validItems.length]);

    useEffect(() => {
      if (!shouldAutoSlide || validItems.length <= 1) return;
      const interval = setInterval(() => {
        React.startTransition(() => {
          setCurrentIndex((prev) => (prev + 1) % validItems.length);
        });
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }, [shouldAutoSlide, autoPlayInterval, validItems.length]);

    const getCardStyle = (index: number): React.CSSProperties => {
      const total = validItems.length;
      const diff = (index - currentIndex + total) % total;
      const isHovered = hoveredIndex === index;

      if (diff === 0) {
        return {
          transform: "translateX(-50%) translateY(-50%) scale(1)",
          zIndex: 50,
          opacity: 1,
          left: "50%",
          top: "53%",
          filter: "blur(0px) brightness(1)",
        };
      }
      if (diff === 1 || diff === -total + 1) {
        return {
          transform: `translateX(-50%) translateY(-50%) scale(${isHovered ? 0.85 * hoverScale : 0.85})`,
          zIndex: 40,
          opacity: isHovered ? 1 : 0.95,
          left: "88%",
          top: "39%",
          filter: `blur(0.5px) brightness(${isHovered ? hoverBrightness : 1})`,
        };
      }
      if (diff === 2 || diff === -total + 2) {
        return {
          transform: `translateX(-50%) translateY(-50%) scale(${isHovered ? 0.7 * hoverScale : 0.7})`,
          zIndex: 30,
          opacity: isHovered ? 0.9 : 0.85,
          left: "122%",
          top: "27%",
          filter: `blur(1.5px) brightness(${isHovered ? hoverBrightness : 1})`,
        };
      }
      if (diff === total - 1 || diff === -1) {
        return {
          transform: `translateX(-50%) translateY(-50%) scale(${isHovered ? 0.85 * hoverScale : 0.85})`,
          zIndex: 40,
          opacity: isHovered ? 1 : 0.95,
          left: "12%",
          top: "64%",
          filter: `blur(0.5px) brightness(${isHovered ? hoverBrightness : 1})`,
        };
      }
      if (diff === total - 2 || diff === -2) {
        return {
          transform: `translateX(-50%) translateY(-50%) scale(${isHovered ? 0.7 * hoverScale : 0.7})`,
          zIndex: 30,
          opacity: isHovered ? 0.9 : 0.85,
          left: "-22%",
          top: "74%",
          filter: `blur(1.5px) brightness(${isHovered ? hoverBrightness : 1})`,
        };
      }
      return {
        transform: "translateX(-50%) translateY(-50%) scale(0.5)",
        zIndex: 10,
        opacity: 0,
        left: "50%",
        top: "53%",
        filter: "blur(3px) brightness(1)",
      };
    };

    const effectiveBorderColor = activeBorderColor || "var(--hero-accent-text, var(--primary))";
    const effectiveTooltipBg = tooltipBackgroundColor || "var(--hero-accent-text, var(--primary))";
    const effectiveTooltipText = tooltipTextColor || "var(--primary-foreground)";

    if (validItems.length === 0) {
      return (
        <div
          ref={ref}
          style={{ ...style, ...(backgroundColor ? { backgroundColor } : {}) }}
          className={cn(
            "relative flex h-[540px] sm:h-[640px] md:h-[700px] w-full items-center justify-center rounded-2xl bg-background text-foreground text-base transition-colors duration-300",
            className,
          )}
          {...props}
        >
          Add images to the carousel
        </div>
      );
    }

    const currentItem = validItems[currentIndex];

    return (
      <div
        ref={ref}
        style={{
          ...accentStyle(color),
          ...(backgroundColor ? { backgroundColor } : {}),
          ...style,
        }}
        className={cn(
          "relative h-[420px] xs:h-[480px] sm:h-[580px] md:h-[680px] lg:h-[740px] w-full select-none overflow-hidden rounded-2xl bg-background text-foreground transition-colors duration-300",
          className,
        )}
        {...props}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes pillTooltipEnter {
                from {
                  opacity: 0;
                  transform: translate(-50%, 20px) scale(0.8);
                }
                to {
                  opacity: 1;
                  transform: translate(-50%, 0px) scale(1);
                }
              }
            `,
          }}
        />

        {/* Center Pill Column Stage */}
        <div className="absolute left-1/2 top-1/2 h-full w-[155px] xs:w-[195px] sm:w-[245px] md:w-[275px] lg:w-[290px] -translate-x-1/2 -translate-y-1/2">
          {validItems.map((item, index) => {
            const cardStyle = getCardStyle(index);
            const isCenter = (index - currentIndex + validItems.length) % validItems.length === 0;
            const imgSrc = typeof item.image === "string" ? item.image : item.image?.src || "";
            const imgAlt =
              typeof item.image === "string"
                ? item.tooltipText || `Carousel image ${index + 1}`
                : item.image?.alt || item.tooltipText || "Carousel image";

            return (
              <div
                key={item.id ?? index}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "75%",
                  ...cardStyle,
                  transition: `all ${transitionDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (isCenter) {
                    openLink(item.link);
                  } else {
                    handleCardClick(index);
                  }
                }}
                onMouseEnter={() => !isCenter && setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: `${cardBorderRadius}px`,
                    overflow: "hidden",
                    boxShadow:
                      hoveredIndex === index && !isCenter
                        ? "0 25px 70px rgba(0, 0, 0, 0.4)"
                        : cardShadow,
                    transition: "box-shadow 0.3s ease",
                    border: isCenter
                      ? `${activeBorderWidth}px solid ${effectiveBorderColor}`
                      : "none",
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={imgAlt}
                    draggable={false}
                    className="size-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Tooltip CTA above Center Pill */}
        {validItems.length > 0 && (
          <button
            key={currentIndex}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (currentItem?.link) {
                openLink(currentItem.link);
              } else if (onTooltipClick && currentItem) {
                onTooltipClick(currentItem, currentIndex);
              } else {
                handleNext();
              }
            }}
            onMouseEnter={() => setTooltipHovered(true)}
            onMouseLeave={() => {
              setTooltipHovered(false);
              setTooltipPressed(false);
            }}
            onMouseDown={() => setTooltipPressed(true)}
            onMouseUp={() => setTooltipPressed(false)}
            style={{
              position: "absolute",
              top: "calc(15.5% - 52px)",
              left: "50%",
              transform: `translate(-50%, 0px) scale(${tooltipPressed ? 0.95 : tooltipHovered ? 1.05 : 1})`,
              backgroundColor: effectiveTooltipBg,
              color: effectiveTooltipText,
              padding: tooltipPadding,
              borderRadius: `${tooltipBorderRadius}px`,
              border: "none",
              cursor: "pointer",
              fontSize: `${tooltipFontSize}px`,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              boxShadow: tooltipHovered
                ? "0 8px 24px rgba(0, 0, 0, 0.25)"
                : tooltipShadow,
              transition: "box-shadow 0.3s ease, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              animation: "pillTooltipEnter 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: 100,
              whiteSpace: "nowrap",
            }}
          >
            {currentItem?.tooltipText || tooltipText}
            <div
              style={{
                position: "absolute",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: `8px solid ${effectiveTooltipBg}`,
              }}
            />
          </button>
        )}
      </div>
    );
  },
);

ThreeDPillCarousel.displayName = "ThreeDPillCarousel";

// ------------------------------------------
// Arc Carousel Gallery (Framer-inspired)
// ------------------------------------------
export const ArcCarouselGallery = forwardRef<HTMLDivElement, ArcCarouselProps>(
  (
    {
      items = DEFAULT_ARC_CAROUSEL_ITEMS,
      color,
      backgroundColor,
      cardSize = 220,
      cardHeight,
      gap = 20,
      curve = -200,
      perspective = 1200,
      autoScrollSpeed = 0.22,
      autoSlide = true,
      autoPlay = true,
      dragSpeed = 1.2,
      inertia = 0.75,
      borderRadius = 20,
      linkNewTab = true,
      onCardClick,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [containerSize, setContainerSize] = useState(() => ({
      width: typeof window !== "undefined" ? Math.min(window.innerWidth, 1200) : 1000,
      height: typeof window !== "undefined" ? Math.min(window.innerHeight, 600) : 600,
    }));
    const [isAutoPlaying, setIsAutoPlaying] = useState(autoSlide ?? autoPlay);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [tick, setTick] = useState(0);

    useEffect(() => {
      setIsAutoPlaying(autoSlide ?? autoPlay);
    }, [autoSlide, autoPlay]);

    const physicsRef = useRef({
      offset: 0,
      velocity: autoSlide ?? autoPlay ? autoScrollSpeed : 0,
      dragging: false,
      pointerId: -1,
      startX: 0,
      lastX: 0,
      lastTime: 0,
      samples: [] as { x: number; t: number }[],
    });

    useEffect(() => {
      if (!rootRef.current) return;
      const updateSize = () => {
        if (rootRef.current) {
          const rect = rootRef.current.getBoundingClientRect();
          if (rect.width > 0) {
            setContainerSize({
              width: rect.width,
              height: rect.height,
            });
          }
        }
      };
      updateSize();

      if (typeof ResizeObserver === "undefined") return;
      const ro = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry?.contentRect && entry.contentRect.width > 0) {
          setContainerSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });
      ro.observe(rootRef.current);
      return () => ro.disconnect();
    }, []);

    const validItems = useMemo(
      () =>
        (items || []).filter((item) => {
          const src = typeof item?.image === "string" ? item.image : item?.image?.src;
          return Boolean(src);
        }),
      [items],
    );

    const effectiveCardWidth = useMemo(() => {
      // Very small mobile screens (< 380px)
      if (containerSize.width < 380) {
        return Math.max(92, Math.min(cardSize, Math.round(containerSize.width * 0.31)));
      }
      // Small mobile screens (380px - 480px)
      if (containerSize.width < 480) {
        return Math.max(108, Math.min(cardSize, Math.round(containerSize.width * 0.33)));
      }
      // Phablets / small tablets (480px - 768px)
      if (containerSize.width < 768) {
        return Math.max(138, Math.min(cardSize, Math.round(containerSize.width * 0.28)));
      }
      // Tablets / small desktop (768px - 1024px)
      if (containerSize.width < 1024) {
        return Math.max(168, Math.min(cardSize, Math.round(containerSize.width * 0.24)));
      }
      return cardSize;
    }, [containerSize.width, cardSize]);

    const effectiveGap = useMemo(() => {
      if (containerSize.width < 380) return Math.min(gap, 8);
      if (containerSize.width < 480) return Math.min(gap, 10);
      if (containerSize.width < 768) return Math.min(gap, 12);
      return gap;
    }, [containerSize.width, gap]);

    const effectiveCardHeight = useMemo(() => {
      if (cardHeight) {
        const ratio = effectiveCardWidth / cardSize;
        return Math.round(cardHeight * ratio);
      }
      return Math.round(effectiveCardWidth * 1.34);
    }, [cardHeight, effectiveCardWidth, cardSize]);

    const effectiveBorderRadius = useMemo(() => {
      if (containerSize.width < 480) return Math.min(borderRadius, 14);
      if (containerSize.width < 768) return Math.min(borderRadius, 16);
      return borderRadius;
    }, [containerSize.width, borderRadius]);

    const effectivePerspective = useMemo(() => {
      if (containerSize.width < 420) return 480;
      if (containerSize.width < 640) return 580;
      if (containerSize.width < 768) return 720;
      if (containerSize.width < 1024) return Math.min(perspective, 950);
      return perspective;
    }, [containerSize.width, perspective]);

    const pitch = Math.max(1, effectiveCardWidth + effectiveGap);

    const arcGeometry = useMemo(() => {
      const curveStrength = Math.min(1, Math.abs(curve) / 300);
      const sign = curve < 0 ? -1 : (curve > 0 ? 1 : 0);
      const count = Math.max(10, Math.min(42, Math.ceil(containerSize.width / pitch) + 12));
      const half = Math.floor(count / 2);

      // Boost angle step on smaller screens so the minus curvature is clearly visible and proportional
      const mobileBoost =
        containerSize.width < 380 ? 2.35 :
        containerSize.width < 480 ? 2.05 :
        containerSize.width < 640 ? 1.65 :
        containerSize.width < 768 ? 1.35 :
        containerSize.width < 1024 ? 1.15 : 1.0;

      const baseStep = curveStrength === 0 ? 0 : (0.045 + curveStrength * 0.18) * mobileBoost;
      const angleStep = baseStep;
      const radius = angleStep === 0 ? 999999 : pitch / angleStep;
      const maxTheta = half * angleStep;
      const edgeCos = Math.cos(maxTheta);

      return {
        curveStrength,
        sign,
        angleStep,
        radius,
        count,
        half,
        maxTheta,
        edgeCos,
      };
    }, [curve, pitch, containerSize.width]);

    const computeSampleVelocity = useCallback(() => {
      const samples = physicsRef.current.samples;
      if (samples.length < 2) return physicsRef.current.velocity;
      const first = samples[0];
      const last = samples[samples.length - 1];
      const dt = (last.t - first.t) / 1000;
      if (dt <= 0) return physicsRef.current.velocity;
      return -((last.x - first.x) / dt * dragSpeed) / pitch * 0.95;
    }, [dragSpeed, pitch]);

    useEffect(() => {
      if (typeof window === "undefined" || validItems.length === 0) return;
      let animId: number;

      const loop = (timestamp: number) => {
        const p = physicsRef.current;
        if (p.lastTime === 0) p.lastTime = timestamp;
        const dt = Math.max(0.001, Math.min(0.05, (timestamp - p.lastTime) / 1000));
        p.lastTime = timestamp;

        if (!p.dragging) {
          const decay = Math.pow(0.82 + Math.max(0, Math.min(1, inertia)) * 0.17, dt * 60);
          p.velocity *= decay;

          const targetVelocity = isAutoPlaying
            ? isHovered
              ? autoScrollSpeed * 0.35
              : autoScrollSpeed
            : 0;

          const blend = 1 - Math.exp(-1.2 * dt);
          p.velocity += (targetVelocity - p.velocity) * blend;
          p.offset += p.velocity * dt;
        }

        setTick((prev) => (prev + 1) % 1000000);
        animId = requestAnimationFrame(loop);
      };

      animId = requestAnimationFrame(loop);
      return () => {
        cancelAnimationFrame(animId);
        physicsRef.current.lastTime = 0;
      };
    }, [validItems.length, inertia, isAutoPlaying, isHovered, autoScrollSpeed]);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!rootRef.current) return;
      const p = physicsRef.current;
      p.dragging = true;
      p.pointerId = e.pointerId;
      p.startX = e.clientX;
      p.lastX = e.clientX;
      p.samples = [{ x: e.clientX, t: performance.now() }];
      setIsDragging(true);
      rootRef.current.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const p = physicsRef.current;
      if (!p.dragging || p.pointerId !== e.pointerId) return;
      const deltaX = e.clientX - p.lastX;
      p.lastX = e.clientX;
      p.offset += (-deltaX / pitch) * dragSpeed;

      const now = performance.now();
      p.samples.push({ x: e.clientX, t: now });
      while (p.samples.length > 8) p.samples.shift();
      while (p.samples.length > 2 && now - p.samples[0].t > 120) p.samples.shift();

      p.velocity = computeSampleVelocity();
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      const p = physicsRef.current;
      if (!p.dragging || p.pointerId !== e.pointerId) return;
      p.dragging = false;
      p.velocity = computeSampleVelocity();
      p.samples = [];
      setIsDragging(false);
      if (rootRef.current && rootRef.current.hasPointerCapture(e.pointerId)) {
        rootRef.current.releasePointerCapture(e.pointerId);
      }
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 2) return;
      physicsRef.current.offset += (delta / pitch) * 0.15;
      physicsRef.current.velocity += (delta / pitch) * 0.6;
    };

    const handleCardClick = (item: ArcCarouselItem, index: number, e: React.MouseEvent) => {
      const p = physicsRef.current;
      if (Math.abs(e.clientX - p.startX) > 8) return;
      if (item.link) {
        if (linkNewTab && typeof window !== "undefined") {
          window.open(item.link, "_blank", "noopener,noreferrer");
        } else if (typeof window !== "undefined") {
          window.location.href = item.link;
        }
      }
      onCardClick?.(item, index);
    };

    const cards = useMemo(() => {
      if (validItems.length === 0) return [];
      const { angleStep, radius, curveStrength, sign, count, half, edgeCos } = arcGeometry;
      const offset = physicsRef.current.offset;
      const startIndex = Math.floor(offset) - half;

      return Array.from({ length: count }, (_, idx) => {
        const slot = startIndex + idx;
        const d = slot - offset;
        const wrappedIdx = ((slot % validItems.length) + validItems.length) % validItems.length;
        const item = validItems[wrappedIdx];

        if (angleStep === 0 || curveStrength === 0) {
          return {
            key: `${idx}-${wrappedIdx}`,
            item,
            index: wrappedIdx,
            x: d * pitch,
            z: 0,
            rotateY: 0,
            opacity: 1,
            zIndex: 1000 - Math.abs(Math.round(d)),
          };
        }

        const m = d * angleStep;
        const x = Math.sin(m) * radius;

        // Minus curve when curve < 0 (e.g. -200):
        // sign = -1 gives the true minus curve:
        // Right side (d > 0): negative rotateY. Left side (d < 0): positive rotateY.
        const z = (Math.cos(m) - (1 + edgeCos) / 2) * radius * sign;
        const rotateY = ((m * 180) / Math.PI) * sign;

        const fade = Math.min(1, Math.abs(d) / Math.max(1, half));
        const opacity = 1 - fade * 0.18;
        const zIndex = 1000 - Math.abs(Math.round(m * 100));

        return {
          key: `${idx}-${wrappedIdx}`,
          item,
          index: wrappedIdx,
          x,
          z,
          rotateY,
          opacity,
          zIndex,
        };
      });
    }, [validItems, arcGeometry, pitch, tick]);

    if (validItems.length === 0) {
      return (
        <div
          ref={ref}
          style={{ ...style, ...(backgroundColor ? { backgroundColor } : {}) }}
          className={cn(
            "relative flex h-[500px] sm:h-[580px] md:h-[640px] w-full items-center justify-center rounded-2xl bg-background text-foreground text-base transition-colors duration-300",
            className,
          )}
          {...props}
        >
          Add images to the arc carousel
        </div>
      );
    }

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          ...accentStyle(color),
          ...(backgroundColor ? { backgroundColor } : {}),
          ...style,
        }}
        className={cn(
          "relative h-[340px] xs:h-[380px] sm:h-[480px] md:h-[580px] lg:h-[680px] w-full select-none overflow-hidden rounded-2xl bg-background text-foreground transition-colors duration-300 touch-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
          className,
        )}
        role="region"
        aria-label="Arc Carousel Gallery"
        {...props}
      >
        {/* 3D Arc Perspective Stage */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            perspective: `${effectivePerspective}px`,
            perspectiveOrigin: "50% 50%",
            transformStyle: "preserve-3d",
          }}
        >
          {cards.map((c) => {
            const imgSrc = typeof c.item.image === "string" ? c.item.image : c.item.image?.src;
            const imgAlt =
              typeof c.item.image === "string"
                ? c.item.title || "Gallery card"
                : c.item.image?.alt || c.item.title || "Gallery card";

            return (
              <div
                key={c.key}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: effectiveCardWidth,
                  height: effectiveCardHeight,
                  borderRadius: `${effectiveBorderRadius}px`,
                  overflow: "hidden",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  opacity: c.opacity,
                  zIndex: c.zIndex,
                  transform: `translate3d(-50%, -50%, 0) translateX(${c.x}px) translateZ(${c.z}px) rotateY(${c.rotateY}deg)`,
                  willChange: "transform, opacity",
                  boxShadow: "0 22px 55px rgba(0, 0, 0, 0.28)",
                }}
                onClick={(e) => handleCardClick(c.item, c.index, e)}
                className="group select-none border border-border/20 transition-shadow duration-300 hover:shadow-2xl hover:border-foreground/20"
              >
                <img
                  src={imgSrc}
                  alt={imgAlt}
                  draggable={false}
                  className="size-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                />
                {(c.item.title || c.item.subtitle) && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-2 sm:p-3.5 pt-5 sm:pt-8 text-white pointer-events-none">
                    {c.item.title && <p className="text-[11px] sm:text-xs font-bold leading-tight drop-shadow truncate">{c.item.title}</p>}
                    {c.item.subtitle && <p className="text-[9px] sm:text-[10px] text-white/80 drop-shadow leading-tight mt-0.5 truncate">{c.item.subtitle}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

ArcCarouselGallery.displayName = "ArcCarouselGallery";

// ------------------------------------------
// Root Gallery
// ------------------------------------------
export const Gallery = forwardRef<HTMLElement, GalleryProps>(
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
      // Reel specific
      reelItems = DEFAULT_CIRCULAR_REEL_ITEMS,
      idleRotationSpeed = 5,
      scrollSensitivity = 0.06,
      ringThickness = 37,
      grayscale = false,
      // 3D Pill Carousel specific
      pillItems = DEFAULT_PILL_CAROUSEL_ITEMS,
      cardBorderRadius = 200,
      activeBorderWidth = 6,
      activeBorderColor,
      transitionDuration = 0.6,
      hoverScale = 1.05,
      hoverBrightness = 1.15,
      autoSlide = true,
      autoPlayInterval = 3000,
      tooltipText = "View Details",
      tooltipBackgroundColor,
      tooltipTextColor,
      // Arc Carousel specific
      arcItems = DEFAULT_ARC_CAROUSEL_ITEMS,
      cardSize = 220,
      cardHeight,
      curve = -200,
      perspective = 1200,
      autoScrollSpeed = 0.22,
      dragSpeed = 1.2,
      inertia = 0.75,
      borderRadius = 20,
      ...props
    },
    ref,
  ) => {
    const effectiveHighlights =
      highlights ??
      (variant === "moving-bento"
        ? DEFAULT_BENTO_HIGHLIGHTS
        : variant === "circular-reel"
        ? DEFAULT_REEL_HIGHLIGHTS
        : variant === "pill-carousel"
        ? DEFAULT_PILL_HIGHLIGHTS
        : variant === "arc-carousel" || variant === "arc-carousel-gallery"
        ? DEFAULT_ARC_HIGHLIGHTS
        : DEFAULT_HIGHLIGHTS);
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
    // VARIANT: 3D PILL CAROUSEL
    // ----------------------------------------
    if (variant === "pill-carousel") {
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
            "relative flex w-full select-none items-center justify-center overflow-hidden bg-background text-foreground transition-colors duration-300",
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

          <div className="relative z-10 w-full">
            <ThreeDPillCarousel
              items={pillItems}
              color={color}
              cardBorderRadius={cardBorderRadius}
              activeBorderWidth={activeBorderWidth}
              activeBorderColor={activeBorderColor}
              transitionDuration={transitionDuration}
              hoverScale={hoverScale}
              hoverBrightness={hoverBrightness}
              autoSlide={autoSlide}
              autoPlay={autoPlay}
              autoPlayInterval={autoPlayInterval}
              tooltipText={tooltipText}
              tooltipBackgroundColor={tooltipBackgroundColor}
              tooltipTextColor={tooltipTextColor}
            />
          </div>
        </section>
      );
    }

    // ----------------------------------------
    // VARIANT: ARC CAROUSEL GALLERY
    // ----------------------------------------
    if (variant === "arc-carousel" || variant === "arc-carousel-gallery") {
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
            "relative flex w-full select-none items-center justify-center overflow-hidden bg-background text-foreground transition-colors duration-300",
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

          <div className="relative z-10 w-full">
            <ArcCarouselGallery
              items={arcItems}
              color={color}
              cardSize={cardSize}
              cardHeight={cardHeight}
              gap={gap}
              curve={curve}
              perspective={perspective}
              autoScrollSpeed={autoScrollSpeed}
              autoSlide={autoSlide}
              autoPlay={autoPlay}
              dragSpeed={dragSpeed}
              inertia={inertia}
              borderRadius={borderRadius}
            />
          </div>
        </section>
      );
    }

    // ----------------------------------------
    // VARIANT: CIRCULAR REEL
    // ----------------------------------------
    if (variant === "circular-reel") {
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
            "relative flex w-full select-none items-center justify-center overflow-hidden",
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

          <div className="relative z-10 w-full">
            <CircularReel
              items={reelItems}
              color={color}
              idleRotationSpeed={idleRotationSpeed}
              scrollSensitivity={scrollSensitivity}
              ringThickness={ringThickness}
              grayscale={grayscale}
              autoPlay={autoPlay}
            />
          </div>
        </section>
      );
    }

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
            "relative flex w-full select-none items-center justify-center overflow-hidden bg-background p-4 sm:p-6 text-foreground transition-colors duration-300",
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

          <div className="relative z-10 w-full">
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

Gallery.displayName = "Gallery";

export const OrbitGallery = Gallery;

export default Gallery;
