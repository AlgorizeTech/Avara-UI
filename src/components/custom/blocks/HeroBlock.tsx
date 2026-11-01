"use client";

import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedTypographyBlock, type PrefixPosition } from "./AnimatedTypographyBlock";
import { BentoCascadeHero, type BentoCascadeCardItem } from "./BentoCascadeHeroBlock";
import { BreatheHero } from "./BreatheHeroBlock";
import { SolarSnapshotHero } from "./SolarSnapshotHeroBlock";
import { ArrowRight, ArrowUpRight, Check, Copy, Sparkles, Terminal, Star, Code, Mail, FileText, Heart, ShieldCheck, ShoppingBag, Package } from "lucide-react";

/* ═══════════════════════════════════════════════
   SELF-CONTAINED SVG BRAND ICONS
   ═══════════════════════════════════════════════ */

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

/* ═══════════════════════════════════════════════
   TYPES & INTERFACES
   ═══════════════════════════════════════════════ */

export interface OrbitHighlight {
  label: string;
  color?: string;
}

export interface HeroBlockProps extends React.HTMLAttributes<HTMLElement> {
  /** Animation variant: "bounce", "typing", "slider", "glow-arc", "pet-shop", "doctor", "facility", "geometric", "vortex", "radar", "orbit", "orbit-gallery", "orbit-ring", "bento-cascade" */
  variant?:
    | "bounce"
    | "typing"
    | "slider"
    | "glow-arc"
    | "pet-shop"
    | "doctor"
    | "facility"
    | "geometric"
    | "vortex"
    | "radar"
    | "cyclone"
    | "orbit"
    | "orbit-gallery"
    | "orbit-ring"
    | "orbit-hero"
    | "bento-cascade"
    | "cascade"
    | "breathe"
    | "hero-breathe"
    | "curved-cards"
    | "arch"
    | "solar-snapshot"
    | "sun-cursor"
    | "solar";
  /** Optional badge text displayed inside the top pill badge */
  badgeText?: string;
  /** Badge link URL */
  badgeHref?: string;
  /** Optional monospace eyebrow text above the main title (used in "vortex" variant) */
  eyebrow?: string;
  /** Main static title text prefix */
  titlePrefix?: string;
  /** Main static title text (used in "orbit" variant, falls back to titlePrefix) */
  title?: string;
  /** Words to animate in the bounce, typing, or flip effect */
  typingWords?: string[];
  /** Main static title text suffix */
  titleSuffix?: string;
  /** Accent line of headline (used in "orbit" variant, falls back to titleSuffix) */
  titleAccent?: string;
  /**
   * Whether the title text before the animated word holds still ("fixed")
   * or re-centres as the word changes width ("fluid"). Defaults to "fluid"
   * for the typing variant and "fixed" for bounce.
   */
  prefixPosition?: PrefixPosition;
  /** Subtitle / description paragraph */
  subtitle?: string;
  /** CLI copy command */
  cliCommand?: string;
  /**
   * The element used for links. Defaults to a plain `a`, so this component works
   * in any React app with no adaptation. In Next.js, pass `next/link` to keep
   * client-side navigation and prefetching: `linkComponent={Link}`.
   */
  linkComponent?: React.ElementType;
  /** Primary action button label */
  primaryActionLabel?: string;
  /** Primary action button URL */
  primaryActionHref?: string;
  /** Secondary action button label */
  secondaryActionLabel?: string;
  /** Secondary action button URL */
  secondaryActionHref?: string;
  /** Array of image URLs for the continuous right-to-left thumbnail slider (used in "slider" variant) */
  sliderImages?: string[];
  /** Main featured image URL for the right column (used in "slider" variant) */
  mainImage?: string;
  /** Array of category pill tags (used in "pet-shop" variant) */
  categories?: string[];
  /** Rating text (used in "pet-shop" variant, e.g. "4.9 ★ Rated") */
  ratingText?: string;
  /** Feature pill badge text (used in "pet-shop" variant) */
  featurePillText?: string;
  /** Array of top badge strings (used in "pet-shop" variant) */
  badgeTags?: string[];
  /** Main featured pet image URL (used in "pet-shop" variant) */
  petImage?: string;
  /** Secondary pet avatar image URL (used in "pet-shop" variant) */
  secondaryPetImage?: string;
  /** Key statistics / metrics shown at the bottom (used in "vortex" variant) */
  metrics?: Array<{ value: string; label: string }>;
  /** Radar/cyclone HUD card title (used in "vortex" variant) */
  hudTitle?: string;
  /** Radar/cyclone HUD timestamp/status (used in "vortex" variant) */
  hudTime?: string;
  /** Radar/cyclone HUD telemetry items (used in "vortex" variant) */
  hudMetrics?: Array<{ label: string; value: string }>;
  /** Speed of the rotating vortex in radians per frame (default: 0.014) */
  rotationSpeed?: number;
  /** Custom accent color (CSS color or tailwind var) */
  color?: string;
  /** Array of image URLs for the revolving circular photo ring (used in "orbit" variant) or bento cascade variant */
  images?: string[];
  /** Array of custom card objects for the bento cascade variant */
  cards?: BentoCascadeCardItem[];
  /** Optional custom image rendering component (e.g. Next.js next/image) */
  imageComponent?: React.ElementType;
  /** Seconds for one full orbit revolution (used in "orbit" variant, default: 36) */
  duration?: number;
  /** Dotted bullet highlights under actions (used in "orbit" variant) */
  highlights?: OrbitHighlight[];
}

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
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
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

const contrast = (a: number, b: number) =>
  (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

const ensureContrast = (rgb: Rgb, surfaceLum: number, target: 0 | 255): Rgb => {
  let out = rgb;
  for (let i = 0; i < 16; i++) {
    if (contrast(relLuminance(out), surfaceLum) >= MIN_CONTRAST) break;
    out = out.map((v) => Math.round(v + (target - v) * 0.12)) as Rgb;
  }
  return out;
};

const toCss = ([r, g, b]: Rgb) => `rgb(${r}, ${g}, ${b})`;

const getAccentForeground = (rgb: Rgb | null): string => {
  if (!rgb) return "var(--primary-foreground)";
  return relLuminance(rgb) > 0.45 ? "#09090b" : "#ffffff";
};

/* ═══════════════════════════════════════════════
   DEFAULT DEVELOPER-FIRST RENDER & CODE IMAGES
   ═══════════════════════════════════════════════ */

const DEFAULT_SLIDER_IMAGES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158810/photo-1634017839464-5c339ebe3cb4-1790158812203.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158809/photo-1618005198919-d3d4b5a92ead-1790158812198.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158809/photo-1633356122544-f134324a6cee-1790158812203.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158809/photo-1620641788421-7a1c342ea42e-1790158812200.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158811/photo-1635070041078-e363dbe005cb-1790158812204.jpg",
];

const DEFAULT_MAIN_IMAGE =
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790150482/photo-1524504388940-b1c1722653e1-1790150482279.jpg";

const DEFAULT_ORBIT_IMAGES = [
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

const DEFAULT_ORBIT_HIGHLIGHTS: OrbitHighlight[] = [
  { label: "15 hand-picked scenes" },
  { label: "Full-circle rotation", color: "#10b981" },
  { label: "Holds still on hover", color: "#f59e0b" },
];

/* ═══════════════════════════════════════════════
   MOTION (CSS keyframes, no animation library)
   ═══════════════════════════════════════════════ */

/** A tween given only a duration eases out: cubic-bezier(0, 0, 0.58, 1). */
const EASE_OUT = "cubic-bezier(0, 0, 0.58, 1)";
/** The blueprint grid's lines and shape glide between hover zones. */
const GLIDE = { duration: 900, easing: "cubic-bezier(0.16, 1, 0.3, 1)" };

const HERO_CSS = `
@keyframes hero-rise-30 { from { opacity: 0; transform: translateY(30px); } }
@keyframes hero-rise-20 { from { opacity: 0; transform: translateY(20px); } }
@keyframes hero-grow { from { opacity: 0; transform: scale(0.95); } }
`;

/** Where the blueprint's four grid lines and the shape sit for each hover zone. */
type ShapeZone = "idle" | "left" | "right" | "center";
const shapeTargets = (zone: ShapeZone): Record<string, string>[] => {
  const pick = (right: string, left: string, rest: string) => (zone === "right" ? right : zone === "left" ? left : rest);
  return [
    { top: pick("26%", "30%", "28%") }, // top line
    { top: pick("74%", "70%", "72%") }, // bottom line
    { left: pick("23%", "29%", "26%") }, // left line
    { left: pick("77%", "71%", "74%") }, // right line
    // the shape, bounded by all four
    { left: pick("23%", "29%", "26%"), width: pick("54%", "42%", "48%"), top: pick("26%", "30%", "28%"), height: pick("48%", "40%", "44%") },
  ];
};

/* ═══════════════════════════════════════════════
   VORTEX RADAR CYCLONE DEFAULTS & EXACT RADAR CANVAS
   ═══════════════════════════════════════════════ */

const DEFAULT_VORTEX_METRICS = [
  { value: "134M", label: "PARCELS COVERED" },
  { value: "412K", label: "SCORES A DAY" },
  { value: "180ms", label: "P95 RESPONSE" },
];

const DEFAULT_HUD_METRICS = [
  { label: "SUSTAINED", value: "129 kt" },
  { label: "CENTRAL", value: "959 mb" },
  { label: "EYE", value: "50 km" },
  { label: "TRACK", value: "W 271°" },
  { label: "SWATH Ø", value: "16 km" },
];

// Exact dot-for-dot coordinates extracted from the climate risk radar reference image (804 points)
const VORTEX_COORDS_B64 = "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";

function decodeVortexCoords(b64: string): Array<[number, number]> {
  if (typeof window === "undefined") return [];
  try {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const int16 = new Int16Array(bytes.buffer);
    const result: Array<[number, number]> = [];
    for (let i = 0; i < int16.length; i += 2) {
      result.push([int16[i] / 10, int16[i + 1] / 10]);
    }
    return result;
  } catch {
    return [];
  }
}

function VortexCanvas({
  speed = 0.010,
  className,
}: {
  speed?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const angleRef = useRef(0);
  const gridRef = useRef<Array<{ x: number; y: number; r: number }>>([]);
  const scaleRef = useRef<number>(1);

  // Pre-rasterized 2D spatial hitmap of the cyclone shape (804 points), spanning 560x560 to cover all 360deg rotations:
  const hitmapData = React.useMemo(() => {
    const pts = decodeVortexCoords(VORTEX_COORDS_B64);
    const CELL_SIZE = 2.5;
    const ORIGIN_X = 280;
    const ORIGIN_Y = 280;
    const GRID_W = Math.ceil(560 / CELL_SIZE);
    const GRID_H = Math.ceil(560 / CELL_SIZE);
    const hitmap = new Uint8Array(GRID_W * GRID_H);
    const R_HIT = 4.2;
    const rCells = Math.ceil(R_HIT / CELL_SIZE);

    for (let i = 0; i < pts.length; i++) {
      const [px, py] = pts[i];
      const cx = Math.round((px + ORIGIN_X) / CELL_SIZE);
      const cy = Math.round((py + ORIGIN_Y) / CELL_SIZE);
      for (let dy = -rCells; dy <= rCells; dy++) {
        for (let dx = -rCells; dx <= rCells; dx++) {
          if (dx * dx + dy * dy <= rCells * rCells) {
            const gx = cx + dx;
            const gy = cy + dy;
            if (gx >= 0 && gx < GRID_W && gy >= 0 && gy < GRID_H) {
              hitmap[gy * GRID_W + gx] = 1;
            }
          }
        }
      }
    }

    return { hitmap, CELL_SIZE, ORIGIN_X, ORIGIN_Y, GRID_W, GRID_H };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let isReducedMotion = false;
    if (typeof window !== "undefined") {
      isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    const updateCanvasSize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(rect.width, 300);
      const height = Math.max(rect.height, 300);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      // Scale cyclone to fit comfortably within radar frame (eye at center, arms sweeping outward)
      const scale = Math.min(width, height) / 460;
      scaleRef.current = scale;

      // Fill entire radar frame right up to all 4 borders (top, bottom, left, right):
      const halfW = (width / 2) / scale;
      const halfH = (height / 2) / scale;
      const step = 6.4;

      const xStart = -Math.ceil(halfW / step) * step;
      const xEnd = Math.ceil(halfW / step) * step;
      const yStart = -Math.ceil(halfH / step) * step;
      const yEnd = Math.ceil(halfH / step) * step;

      const dots: Array<{ x: number; y: number; r: number }> = [];
      for (let y = yStart; y <= yEnd; y += step) {
        for (let x = xStart; x <= xEnd; x += step) {
          dots.push({
            x: Number(x.toFixed(1)),
            y: Number(y.toFixed(1)),
            r: Number(Math.hypot(x, y).toFixed(1)),
          });
        }
      }
      gridRef.current = dots;
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const render = () => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;

      const scale = scaleRef.current || Math.min(w, h) / 460;
      const dotRadiusDim = Math.max(1.0, 1.25 * scale);
      const dotRadiusLit = Math.max(1.85, 2.15 * scale);

      const staticGrid = gridRef.current;
      if (staticGrid.length === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      // Pass 1: Render ALL stationary grid dots in faint, translucent white
      // IMPORTANT: Dots NEVER change physical positions! They remain fixed in their matrix.
      ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
      ctx.beginPath();
      for (let i = 0; i < staticGrid.length; i++) {
        const d = staticGrid[i];
        ctx.moveTo(d.x + dotRadiusDim, d.y);
        ctx.arc(d.x, d.y, dotRadiusDim, 0, Math.PI * 2);
      }
      ctx.fill();

      // Pass 2: Render illuminated white dots where the cyclone vortex sweeps over them
      // Coherent rotation preserves the EXACT shape from the reference image without shearing.
      // Clockwise rotation unwinds counter-clockwise spiral arms so they propagate outward from the eye.
      // Outward radial pulse wave: Radiates concentric ripples of luminous intensity from center out.
      const { hitmap, CELL_SIZE, ORIGIN_X, ORIGIN_Y, GRID_W, GRID_H } = hitmapData;
      const angle = angleRef.current;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      for (let i = 0; i < staticGrid.length; i++) {
        const d = staticGrid[i];

        // Clockwise sampling unwinds spiral arms outward from center:
        const rx = d.x * cos - d.y * sin;
        const ry = d.x * sin + d.y * cos;

        const gx = Math.round((rx + ORIGIN_X) / CELL_SIZE);
        const gy = Math.round((ry + ORIGIN_Y) / CELL_SIZE);
        const isLit =
          gx >= 0 && gx < GRID_W && gy >= 0 && gy < GRID_H && hitmap[gy * GRID_W + gx] === 1;

        if (isLit) {
          // Outward radial wave pulse: travels continuously from center eye to outer edge
          const radialWave = Math.sin(d.r * 0.05 - angle * 3.5);
          const rLit = dotRadiusLit * (0.95 + 0.12 * Math.max(0, radialWave));
          ctx.moveTo(d.x + rLit, d.y);
          ctx.arc(d.x, d.y, rLit, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      ctx.restore();

      if (!isReducedMotion) {
        angleRef.current += speed;
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [hitmapData, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full block pointer-events-none select-none", className)}
    />
  );
}



/* ═══════════════════════════════════════════════
   MAIN HERO BLOCK COMPONENT
   ═══════════════════════════════════════════════ */

export const HeroBlock = forwardRef<HTMLElement, HeroBlockProps>(
  (
    {
      variant = "bounce",
      linkComponent: Link = "a",
      badgeText = "Next-Gen React Components",
      badgeHref = "/docs",
      eyebrow,
      titlePrefix = "Build ",
      title,
      typingWords = [
        "Interfaces",
        "Components",
        "Experiences",
        "Animations",
        "Dashboards",
      ],
      titleSuffix = "",
      titleAccent,
      prefixPosition,
      subtitle = "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Motion.",
      cliCommand = "npx shadcn@latest add @avara-ui/button",
      primaryActionLabel = "Browse Components",
      primaryActionHref = "/docs",
      secondaryActionLabel = "Star on GitHub",
      secondaryActionHref = "https://github.com/AlgorizeTech",
      sliderImages = DEFAULT_SLIDER_IMAGES,
      mainImage = DEFAULT_MAIN_IMAGE,
      petImage,
      secondaryPetImage,
      categories = ["Dry Food", "Toys", "Grooming", "Wellness", "Subscription"],
      ratingText = "4.9 ★ Rated",
      featurePillText = "24/7 Vet Care",
      badgeTags = ["Certified Organic & Vet Approved", "4.9 Star Rated"],
      metrics,
      hudTitle,
      hudTime,
      hudMetrics,
      rotationSpeed,
      color,
      images,
      cards,
      imageComponent,
      duration = 36,
      highlights,
      className,
      style,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);
    // Shape hover zone state (used when variant === "facility" || variant === "geometric")
    const [shapeHoverZone, setShapeHoverZone] = useState<ShapeZone>("idle");

    // Blueprint grid (used when variant === "facility" || "geometric"): the
    // lines and the shape render at their zone's place; on a zone change each
    // glides there from wherever it is on screen, the full 0.9s every time.
    const shapeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const shapeAnims = useRef<(Animation | null)[]>([]);
    const shapePlaced = useRef<Record<string, string>[] | null>(null);
    const isBlueprint = variant === "facility" || variant === "geometric";
    useLayoutEffect(() => {
      if (!isBlueprint) {
        shapePlaced.current = null;
        return;
      }
      const targets = shapeTargets(shapeHoverZone);
      const previous = shapePlaced.current;
      shapePlaced.current = targets;
      if (!previous) return;
      targets.forEach((to, i) => {
        const el = shapeRefs.current[i];
        const before = previous[i];
        if (!el || Object.keys(to).every((key) => to[key] === before[key])) return;
        const running = shapeAnims.current[i];
        let from = before;
        if (running && running.playState === "running") {
          const cs = getComputedStyle(el);
          from = Object.fromEntries(Object.keys(to).map((key) => [key, cs.getPropertyValue(key)]));
          running.cancel();
        }
        shapeAnims.current[i] = typeof el.animate === "function" ? el.animate([from, to], GLIDE) : null;
      });
    }, [shapeHoverZone, isBlueprint]);

    const handleCopy = () => {
      if (typeof window !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(cliCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    const getAccentColor = (col?: string) => {
      if (!col || col === "primary" || col === "default") return undefined;
      const presets: Record<string, string> = {
        lavender: "#9b8afb",
        indigo: "#6366f1",
        rose: "#f43f5e",
        emerald: "#10b981",
        zinc: "#18181b",
      };
      return presets[col] || col;
    };

    const resolvedColor = getAccentColor(color);
    const accentRgb = resolvedColor ? parseColor(resolvedColor) : null;

    const customStyle = {
      "--hero-accent-text": accentRgb
        ? `light-dark(${toCss(
            ensureContrast(accentRgb, LIGHT_SURFACE_LUM, 0),
          )}, ${toCss(ensureContrast(accentRgb, DARK_SURFACE_LUM, 255))})`
        : "var(--primary)",
      ...(resolvedColor ? { "--primary": resolvedColor } : {}),
      ...(accentRgb
        ? {
            "--primary-foreground": getAccentForeground(accentRgb),
          }
        : {}),
    } as React.CSSProperties;

    /* ═══════════════════════════════════════════════
       VARIANT: BENTO CASCADE INFINITE MOTION HERO
       ═══════════════════════════════════════════════ */
    if (variant === "bento-cascade" || variant === "cascade") {
      const bentoImages =
        images && images.length > 0
          ? images
          : sliderImages && sliderImages !== DEFAULT_SLIDER_IMAGES
            ? sliderImages
            : undefined;

      return (
        <BentoCascadeHero
          ref={ref as any}
          title={title || (titlePrefix === "Build " ? "Explore wild nature & plan" : titlePrefix) || "Explore wild nature & plan"}
          titleAccent={titleAccent || (titleSuffix ? titleSuffix : "your next escape")}
          subtitle={
            subtitle === "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Motion."
              ? "Discover handpicked alpine sanctuaries, secluded glacial lakes, and ancient redwood trails tailored for unforgettable outdoor journeys."
              : subtitle
          }
          primaryActionLabel={primaryActionLabel === "Browse Components" ? "Start exploring" : primaryActionLabel}
          primaryActionHref={primaryActionHref === "/docs" ? "#explore" : primaryActionHref}
          secondaryActionLabel={secondaryActionLabel === "Star on GitHub" ? "View journeys" : secondaryActionLabel}
          secondaryActionHref={secondaryActionHref === "https://github.com/AlgorizeTech" ? "#destinations" : secondaryActionHref}
          cards={cards}
          images={bentoImages}
          accent={color}
          linkComponent={Link}
          imageComponent={imageComponent}
          className={className}
          style={style}
          {...props}
        />
      );
    }

    /* ═════════════════════════════════════════
       VARIANT: BREATHE CURVED ARCH MOTION HERO
       ═════════════════════════════════════════ */
    if (
      variant === "breathe" ||
      variant === "hero-breathe" ||
      variant === "curved-cards" ||
      variant === "arch"
    ) {
      const breatheImages =
        images && images.length > 0
          ? images
          : sliderImages && sliderImages !== DEFAULT_SLIDER_IMAGES
            ? sliderImages
            : undefined;

      const breatheBadgeText =
        badgeText === "Next-Gen React Components"
          ? "Interactive Motion Architecture"
          : badgeText;
      const breatheBadgeHref = badgeHref || "/docs";
      const breatheSecLabel =
        secondaryActionLabel === "Explore Blocks"
          ? "View Showroom"
          : secondaryActionLabel;
      const breatheSecHref =
        secondaryActionHref === "#features" ? "#showroom" : secondaryActionHref;

      return (
        <BreatheHero
          ref={ref as any}
          title={
            title ||
            (titlePrefix === "Build " ? "Crafted for depth," : titlePrefix) ||
            "Crafted for depth,"
          }
          titleAccent={
            titleAccent || (titleSuffix ? titleSuffix : "built for motion.")
          }
          badgeText={breatheBadgeText}
          badgeHref={breatheBadgeHref}
          description={
            subtitle ===
            "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Motion."
              ? "Create immersive digital experiences where fluid scroll choreography, spatial architecture, and tactile visual polish move in effortless harmony."
              : subtitle
          }
          buttonLabel={
            primaryActionLabel === "Browse Components"
              ? "Start Exploring"
              : primaryActionLabel
          }
          buttonHref={
            primaryActionHref === "/docs" ? "/docs" : primaryActionHref
          }
          secondaryButtonLabel={breatheSecLabel}
          secondaryButtonHref={breatheSecHref}
          cards={cards as any}
          images={breatheImages}
          accent={color}
          linkComponent={Link}
          imageComponent={imageComponent}
          className={className}
          style={style}
          {...props}
        />
      );
    }

    /* ═════════════════════════════════════════
       VARIANT: SOLAR SNAPSHOT SUN CURSOR HERO
       ═════════════════════════════════════════ */
    if (
      variant === "solar-snapshot" ||
      variant === "sun-cursor" ||
      variant === "solar"
    ) {
      return (
        <SolarSnapshotHero
          ref={ref as any}
          title={
            title ||
            (titlePrefix === "Build "
              ? "Where natural light meets"
              : titlePrefix) ||
            "Where natural light meets"
          }
          titleAccent={
            titleAccent ||
            (titleSuffix ? titleSuffix : "expressive digital craft.")
          }
          description={
            subtitle ===
            "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Motion."
              ? "Guide the radiant sun across the canvas with your cursor and click anywhere to capture an instant live snapshot of the stage."
              : subtitle
          }
          primaryActionLabel={
            primaryActionLabel === "Browse Components"
              ? "Initiate Project"
              : primaryActionLabel
          }
          primaryActionHref={primaryActionHref}
          secondaryActionLabel={
            secondaryActionLabel === "Star on GitHub"
              ? "Explore Studio"
              : secondaryActionLabel
          }
          secondaryActionHref={secondaryActionHref}
          accent={color}
          linkComponent={Link}
          className={className}
          style={style}
          {...props}
        />
      );
    }

    /* ═══════════════════════════════════════════════
       VARIANT: ORBIT 3D PHOTO RING HERO
       ═══════════════════════════════════════════════ */
    if (variant === "orbit" || variant === "orbit-gallery" || variant === "orbit-ring" || variant === "orbit-hero") {
      const orbitBadgeText = badgeText === "Next-Gen React Components" ? "Identity & animation studio" : badgeText;
      const orbitBadgeHref = badgeHref === "/docs" ? "#" : badgeHref;
      const orbitTitle = title || (titlePrefix === "Build " ? "Movement is what" : titlePrefix) || "Movement is what";
      const orbitTitleAccent = titleAccent || (titleSuffix ? titleSuffix : "people notice first.");
      const orbitSubtitle =
        subtitle === "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Motion."
          ? "We design brand identities and the animation that brings them to life — from early sketches to the live release."
          : subtitle;
      const orbitPrimaryLabel = primaryActionLabel === "Browse Components" ? "Work with us" : primaryActionLabel;
      const orbitPrimaryHref = primaryActionHref === "/docs" ? "#" : primaryActionHref;
      const orbitSecondaryLabel = secondaryActionLabel === "Star on GitHub" ? "View projects" : secondaryActionLabel;
      const orbitSecondaryHref = secondaryActionHref === "https://github.com/AlgorizeTech" ? "#" : secondaryActionHref;
      const orbitImages = images && images.length > 0 ? images : sliderImages && sliderImages !== DEFAULT_SLIDER_IMAGES ? sliderImages : DEFAULT_ORBIT_IMAGES;
      const orbitHighlights = highlights ?? DEFAULT_ORBIT_HIGHLIGHTS;
      const orbitDuration = duration || 36;
      const count = orbitImages.length;

      return (
        <section
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ ...customStyle, ...style }}
          className={cn(
            "relative flex min-h-[600px] w-full select-none items-center overflow-hidden bg-background py-12 text-foreground transition-colors duration-300 sm:min-h-[660px] sm:py-16 lg:min-h-[720px] lg:py-20",
            className,
          )}
          {...props}
        >

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
              backface-visibility: hidden;
              will-change: transform;
              animation: orbit-gallery-slide var(--orbit-duration, 36s) linear infinite;
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
            .orbit-gallery-wrapper:hover .orbit-gallery-card,
            .orbit-gallery-ring:hover .orbit-gallery-card,
            .orbit-gallery-card:hover {
              animation-play-state: paused;
            }
            .orbit-gallery-card:hover {
              z-index: 50;
            }
            .orbit-gallery-card:hover > div {
              transform: translateZ(30px) scale(1.15) !important;
            }
            @media (prefers-reduced-motion: reduce) {
              .orbit-gallery-card { animation-play-state: paused; }
            }
          `}</style>

          <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
              {/* ---- Copy and actions ---- */}
              <div className="z-10 col-span-1 flex flex-col justify-center space-y-6 sm:space-y-8 lg:col-span-6">
                {orbitBadgeText && (
                  <Link href={orbitBadgeHref} className="group inline-block self-start">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground sm:text-sm">
                      <Sparkles className="size-3.5 shrink-0 text-[var(--hero-accent-text)]" />
                      <span>{orbitBadgeText}</span>
                    </div>
                  </Link>
                )}

                <h1 className="text-xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-3xl lg:text-[36px] xl:text-[42px]">
                  <span className="block">{orbitTitle}</span>
                  {orbitTitleAccent && (
                    <span className="mt-1 block font-bold tracking-tight" style={{ color: "var(--hero-accent-text)" }}>
                      {orbitTitleAccent}
                    </span>
                  )}
                </h1>

                {orbitSubtitle && (
                  <div className="border-l-3 py-1 pl-4 transition-colors duration-300" style={{ borderColor: "var(--hero-accent-text)" }}>
                    <p className="max-w-lg text-sm font-medium leading-relaxed text-muted-foreground sm:text-base lg:text-lg">{orbitSubtitle}</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3.5 pt-2 sm:gap-4">
                  {orbitPrimaryLabel && (
                    <Link
                      href={orbitPrimaryHref}
                      className="group inline-flex items-center justify-center gap-2.5 rounded-2xl px-7 py-3.5 text-sm font-extrabold shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 sm:py-4 sm:text-base"
                      style={{ backgroundColor: "var(--hero-accent-text)", color: "var(--primary-foreground)" }}
                    >
                      <span>{orbitPrimaryLabel}</span>
                      <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}

                  {orbitSecondaryLabel && (
                    <Link
                      href={orbitSecondaryHref}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted active:translate-y-0 sm:py-4 sm:text-base"
                    >
                      <span>{orbitSecondaryLabel}</span>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                    </Link>
                  )}
                </div>

                {orbitHighlights.length > 0 && (
                  <div className="flex flex-wrap items-center gap-5 border-t border-border/40 pt-2 text-xs font-semibold text-muted-foreground sm:gap-8">
                    {orbitHighlights.map((h) => (
                      <div key={h.label} className="flex items-center gap-2">
                        <div className="size-2 rounded-full" style={{ backgroundColor: h.color ?? "var(--hero-accent-text)" }} />
                        <span>{h.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ---- The ring ---- */}
              <div className="orbit-gallery-wrapper relative col-span-1 flex h-[480px] items-center justify-center overflow-visible py-4 sm:h-[580px] lg:col-span-6 lg:h-[660px]">
                <div
                  className="orbit-gallery-ring pointer-events-auto relative flex size-[340px] cursor-pointer items-center justify-center overflow-visible rounded-full sm:size-[440px] lg:size-[480px]"
                  style={{ "--orbit-duration": `${orbitDuration}s` } as React.CSSProperties}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-full border border-transparent" aria-hidden />

                  {orbitImages.map((src, i) => (
                    <div
                      key={src + i}
                      data-index={i}
                      className="orbit-gallery-card group pointer-events-auto absolute left-1/2 top-1/2 -ml-[38px] -mt-[48px] h-[96px] w-[76px] sm:-ml-[62px] sm:-mt-[77px] sm:h-[155px] sm:w-[125px] lg:-ml-[75px] lg:-mt-[90px] lg:h-[180px] lg:w-[150px]"
                      style={{ animationDelay: `${-((i / count) * orbitDuration)}s` }}
                    >
                      <div
                        className="h-full w-full overflow-hidden rounded-[22px] border-2 border-card bg-card shadow-xl sm:rounded-[28px] transition-transform duration-300 ease-out group-hover:scale-115 group-hover:shadow-2xl cursor-pointer"
                        style={{ transformOrigin: "center center", willChange: "transform" }}
                      >
                        <img
                          src={src}
                          alt=""
                          draggable={false}
                          className="size-full object-cover pointer-events-none select-none transition-transform duration-300 ease-out group-hover:scale-105"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    /* ═══════════════════════════════════════════════
       VARIANT 4: MODERN PET SHOP & ANIMAL CARE HERO (MINIMAL, NO SHADOWS & NO PET ICONS)
       ═══════════════════════════════════════════════ */
    if (variant === "pet-shop" || variant === "glow-arc") {
      const petTitlePrefix =
        titlePrefix === "Build " ? "All Pet Essentials" : titlePrefix;
      const petTitleAccent =
        titleSuffix || "Delivered To Your Door";
      const petSubtitle =
        subtitle ===
        "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Motion."
          ? "Discover nutritionist-crafted organic meals, orthopedic beds, durable interactive toys, and instant 24/7 vet consultations delivered to your door."
          : subtitle;

      const petPrimaryAction =
        primaryActionLabel === "Browse Components"
          ? "Shop Dog Supplies"
          : primaryActionLabel;

      const petSecondaryAction =
        secondaryActionLabel === "Star on GitHub"
          ? "Shop Cat Care"
          : secondaryActionLabel;

      const dogImage =
        petImage ||
        "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150479/photo-1543466835-00a7907e9de1-1790150482273.jpg";
      const catImage =
        secondaryPetImage ||
        "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150481/photo-1514888286974-6c03e2ca1dba-1790150482276.jpg";

      return (
        <section
          ref={ref}
          style={customStyle}
          className={cn(
            "relative w-full overflow-hidden py-14 sm:py-20 lg:py-28 bg-background text-foreground transition-colors duration-300",
            className,
          )}
          {...props}
        >
          {/* Subtle Dynamic Theme Accent Glow Orbs */}
          <div className="absolute top-10 left-10 size-72 sm:size-96 rounded-full blur-3xl pointer-events-none opacity-15" style={{ backgroundColor: "var(--hero-accent-text)" }} />
          <div className="absolute bottom-10 right-10 size-72 sm:size-96 rounded-full blur-3xl pointer-events-none opacity-15" style={{ backgroundColor: "var(--hero-accent-text)" }} />

          <div className="relative z-10 max-w-[1320px] mx-auto w-full px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Image Column: Top on Mobile (order-1), Left on Desktop (lg:order-1) */}
              <div className="col-span-1 lg:col-span-5 relative flex justify-center items-center order-1 lg:order-1">
                <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                  
                  {/* Outer Concentric Border Accent Ring */}
                  <div className="absolute inset-2 rounded-full border-2 border-dashed opacity-30 animate-[spin_60s_linear_infinite]" style={{ borderColor: "var(--hero-accent-text)" }} />
                  
                  {/* Central Large Circular Image Mask */}
                  <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden border-4 border-background bg-muted group">
                    <img
                      src={dogImage}
                      alt="Happy Pet"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Top-Left Floating Feature Pill */}
                  <div className="absolute top-2 left-0 sm:-left-2 px-4 py-2 rounded-2xl bg-card border-2 border-border flex items-center gap-2.5 z-20">
                    <div className="size-2 rounded-full" style={{ backgroundColor: "var(--hero-accent-text)" }} />
                    <div>
                      <p className="text-[11px] font-bold text-foreground">{featurePillText}</p>
                      <p className="text-[9px] font-semibold" style={{ color: "var(--hero-accent-text)" }}>Verified Doctors</p>
                    </div>
                  </div>

                  {/* Bottom-Right Cat Avatar Pill */}
                  <div className="absolute bottom-2 right-0 sm:-right-2 p-2 pr-4 rounded-2xl bg-card border-2 border-border flex items-center gap-2.5 z-20">
                    <div className="size-10 rounded-xl overflow-hidden border border-border shrink-0">
                      <img src={catImage} alt="Cat Supplies" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-foreground">Cat Essentials</p>
                      <p className="text-[9px] font-semibold text-muted-foreground">Same Day Delivery</p>
                    </div>
                  </div>

                  {/* Center Left Rating Pill */}
                  <div className="absolute bottom-1/3 -left-4 px-3.5 py-1.5 rounded-full font-bold text-xs border z-20" style={{ backgroundColor: "var(--hero-accent-text)", color: "var(--primary-foreground)", borderColor: "var(--hero-accent-text)" }}>
                    {ratingText}
                  </div>

                </div>
              </div>

              {/* Content Column: Bottom on Mobile (order-2), Right on Desktop (lg:order-2) */}
              <div className="col-span-1 lg:col-span-7 flex flex-col justify-center space-y-6 text-left order-2 lg:order-2">
                
                {/* Category Pills Header */}
                <div className="flex flex-wrap items-center gap-2">
                  {badgeTags?.[0] && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold" style={{ backgroundColor: "color-mix(in oklab, var(--hero-accent-text) 8%, transparent)", borderColor: "color-mix(in oklab, var(--hero-accent-text) 25%, transparent)", color: "var(--hero-accent-text)" }}>
                      <ShieldCheck className="size-3.5 shrink-0" style={{ color: "var(--hero-accent-text)" }} />
                      <span>{badgeTags[0]}</span>
                    </div>
                  )}
                  {badgeTags?.[1] && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold" style={{ backgroundColor: "rgba(249, 115, 22, 0.08)", borderColor: "rgba(249, 115, 22, 0.25)", color: "#f97316" }}>
                      <Star className="size-3.5 fill-orange-500 text-orange-500" />
                      <span>{badgeTags[1]}</span>
                    </div>
                  )}
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-foreground">
                  <span className="block">{petTitlePrefix}</span>
                  <span className="block mt-1" style={{ color: "var(--hero-accent-text)" }}>
                    {petTitleAccent}
                  </span>
                </h1>

                {/* Subtitle */}
                {petSubtitle && (
                  <p className="text-xs sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
                    {petSubtitle}
                  </p>
                )}

                {/* Quick Pet Category Select Pills */}
                {categories && categories.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mr-1">Popular:</span>
                    {categories.map((cat, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-xl bg-card border border-border text-xs font-semibold text-foreground cursor-pointer transition-all"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3 w-full">
                  <Link
                    href={primaryActionHref}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-extrabold text-sm sm:text-base transition-all active:scale-95 text-center"
                    style={{ backgroundColor: "var(--hero-accent-text)", color: "var(--primary-foreground)" }}
                  >
                    <ShoppingBag className="size-5 shrink-0" />
                    <span>{petPrimaryAction}</span>
                    <ArrowRight className="size-4 shrink-0" />
                  </Link>

                  <Link
                    href={secondaryActionHref}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl border border-border bg-card hover:bg-muted text-foreground font-semibold text-sm sm:text-base transition-all active:scale-95 text-center"
                  >
                    <span>{petSecondaryAction}</span>
                    <ArrowUpRight className="size-4 shrink-0" style={{ color: "var(--hero-accent-text)" }} />
                  </Link>
                </div>

                {/* Trust Footer Line */}
                <div className="pt-3 flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="size-4" style={{ color: "var(--hero-accent-text)" }} />
                    <span>Vet Verified Ingredients</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="size-4 text-rose-500" />
                    <span>Free Shipping $35+</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      );
    }

    /* ═══════════════════════════════════════════════
       VARIANT 5: TRUSTED KITS & MEDICAL CARE HERO (EXACTLY MATCHES REFERENCE IMAGE)
       ═══════════════════════════════════════════════ */
    if (variant === "doctor") {
      const docTitlePrefix =
        titlePrefix === "Build " ? "Trusted Kits" : titlePrefix;
      const docTitleAccent =
        titleSuffix || "Real Results";
      const docSubtitle =
        subtitle ===
        "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Motion."
          ? "Order medical-grade test kits, return by mail, and get fast, accurate, secure results online — anytime, anywhere, hassle-free."
          : subtitle;

      const docPrimaryAction =
        primaryActionLabel === "Browse Components"
          ? "Order Kit"
          : primaryActionLabel;

      const docSecondaryAction =
        secondaryActionLabel === "Star on GitHub"
          ? "See How Its Work"
          : secondaryActionLabel;

      const doctorMainImage =
        petImage ||
        "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158809/photo-1622253692010-333f2da6031d-1790158812201.jpg";

      const doctorSubImage =
        secondaryPetImage ||
        "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150483/photo-1576091160399-112ba8d25d1d-1790150482281.jpg";

      const labTestImage =
        mainImage === DEFAULT_MAIN_IMAGE
          ? "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150483/photo-1584036561566-baf8f5f1b144-1790150482282.jpg"
          : mainImage;

      const inlineBadgeImage =
        "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790150479/photo-1471864190281-a93a3070b6de-1790150482274.jpg";

      const stat1Val = ratingText === "4.9 ★ Rated" ? "100%" : ratingText;
      const stat1Label = badgeTags?.[0] === "Certified Organic & Vet Approved" ? "Safe & Private Results" : badgeTags?.[0] || "Safe & Private Results";
      const stat2Val = featurePillText === "24/7 Vet Care" ? "98%" : featurePillText;
      const stat2Label = badgeTags?.[1] === "4.9 Star Rated" ? "Satisfaction rate" : badgeTags?.[1] || "Satisfaction rate";

      return (
        <section
          ref={ref}
          style={customStyle}
          className={cn(
            "relative w-full overflow-hidden bg-background text-foreground transition-colors duration-300 min-h-[620px]",
            className,
          )}
          {...props}
        >
          <style>{HERO_CSS}</style>
          <div className="w-full max-w-[1440px] mx-auto min-h-[620px] grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* LEFT COLUMN: Title, Subtitle, CTA & Stats */}
            <div className="col-span-1 lg:col-span-6 px-4 sm:px-8 lg:px-16 py-6 sm:py-10 lg:py-20 flex flex-col justify-center space-y-5 sm:space-y-8 z-10">
              
              {/* Heading Section */}
              <div className="space-y-1.5 sm:space-y-2">
                <h1 className="text-2xl sm:text-4xl lg:text-7xl font-light tracking-tight text-foreground/70 font-sans leading-tight">
                  {docTitlePrefix}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5 sm:pt-1">
                  <span 
                    className="relative inline-flex size-7 sm:size-11 lg:size-12 rounded-full overflow-hidden border-2 shrink-0 shadow-md"
                    style={{ borderColor: "var(--hero-accent-text)" }}
                  >
                    <img
                      src={inlineBadgeImage}
                      alt="Kit thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </span>
                  <span 
                    className="text-2xl sm:text-4xl lg:text-7xl font-extrabold tracking-tight leading-tight"
                    style={{ color: "var(--hero-accent-text)" }}
                  >
                    {docTitleAccent}
                  </span>
                </div>
              </div>

              {/* Subtitle with Left Border Line Accent */}
              {docSubtitle && (
                <div 
                  className="border-l-2 pl-3 sm:pl-4 py-0.5"
                  style={{ borderColor: "var(--hero-accent-text)" }}
                >
                  <p className="text-muted-foreground text-xs sm:text-base leading-relaxed font-medium max-w-lg">
                    {docSubtitle}
                  </p>
                </div>
              )}

              {/* Action Buttons Row (Full Width on mobile/sm, auto on desktop lg) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 pt-1 sm:pt-2 w-full">
                <Link
                  href={primaryActionHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-base shadow-md transition-all active:scale-95 text-center"
                  style={{
                    backgroundColor: "var(--hero-accent-text)",
                    color: "var(--primary-foreground)",
                  }}
                >
                  <Package className="size-4 sm:size-5 shrink-0" />
                  <span>{docPrimaryAction}</span>
                </Link>

                <Link
                  href={secondaryActionHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-base hover:underline transition-all text-center"
                  style={{ color: "var(--hero-accent-text)" }}
                >
                  <span>{docSecondaryAction}</span>
                </Link>
              </div>

              {/* Stats Footer Row */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-14 pt-1 sm:pt-4">
                <div className="space-y-0.5 sm:space-y-1">
                  <p className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
                    {stat1Val}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-muted-foreground">
                    <ShieldCheck className="size-3.5 shrink-0" style={{ color: "var(--hero-accent-text)" }} />
                    <span>{stat1Label}</span>
                  </div>
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  <p className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
                    {stat2Val}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-muted-foreground">
                    <Heart className="size-3.5 text-rose-500 shrink-0" />
                    <span>{stat2Label}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Dark Container with Images Grid & Floating Cards */}
            <div className="col-span-1 lg:col-span-6 relative flex flex-col justify-center px-3 sm:px-8 lg:px-12 py-6 sm:py-10 lg:py-12 min-h-[380px] sm:min-h-[480px] lg:min-h-0 mt-4 lg:mt-0">
              
              {/* Dark Accent Panel (a deep shade of the accent) */}
              <div 
                className="absolute inset-y-0 right-0 left-0 sm:left-20 lg:left-36 rounded-[20px] sm:rounded-[28px] lg:rounded-l-[48px] lg:rounded-r-none z-0 transition-colors duration-300"
                style={{
                  backgroundColor: accentRgb
                    ? `rgb(${Math.max(5, Math.round(accentRgb[0] * 0.12))}, ${Math.max(15, Math.round(accentRgb[1] * 0.22))}, ${Math.max(15, Math.round(accentRgb[2] * 0.22))})`
                    : "color-mix(in oklab, var(--primary) 22%, black)",
                }}
              />

              {/* Main Images Layout Grid */}
              <div className="relative w-full h-full grid grid-cols-12 gap-2.5 sm:gap-4 items-center z-10 my-auto p-2 sm:p-0">
                
                {/* Doctor Consultation Portrait Card */}
                <div
                  className="col-span-6 ml-0 lg:-ml-10 relative z-20"
                  style={{ animation: `hero-rise-30 0.6s ${EASE_OUT} backwards` }}
                >
                  <div className="relative aspect-[3/4] w-full rounded-[18px] sm:rounded-[32px] overflow-hidden border-2 sm:border-4 border-background bg-zinc-800">
                    <img
                      src={doctorMainImage}
                      alt="Doctor Consultation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Right Stacked Images inside Dark Panel */}
                <div className="col-span-6 space-y-2.5 sm:space-y-4 relative z-10">
                  
                  {/* Top Right Patient Care Portrait Image */}
                  <div
                    style={{ animation: `hero-grow 0.5s ${EASE_OUT} 0.2s backwards` }}
                    className="relative aspect-[4/3] sm:aspect-square w-full rounded-[16px] sm:rounded-[28px] overflow-hidden bg-zinc-800 border border-white/10"
                  >
                    <img
                      src={doctorSubImage}
                      alt="Patient Care"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Bottom Right Lab Kit Test Image */}
                  <div
                    style={{ animation: `hero-grow 0.5s ${EASE_OUT} 0.3s backwards` }}
                    className="relative aspect-[4/3] w-full rounded-[16px] sm:rounded-[28px] overflow-hidden bg-zinc-800 border border-white/10 group"
                  >
                    <img
                      src={labTestImage}
                      alt="Lab Test Kit"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2 sm:p-3.5">
                      <p className="text-[9px] sm:text-xs font-bold text-white leading-tight">
                        Lab-Trusted. <br /> Doorstep Delivered.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Floating Delivery Card */}
              <div
                className="relative lg:absolute mt-3 lg:mt-0 bottom-0 lg:bottom-6 left-0 lg:-left-6 lg:-ml-24 z-30 w-full lg:w-auto min-w-0 sm:min-w-[320px] p-3 sm:p-4 lg:p-5 rounded-[16px] sm:rounded-[24px] shadow-2xl border-2 backdrop-blur-xl transition-colors duration-300 bg-card text-card-foreground"
                style={{
                  animation: `hero-rise-20 0.5s ${EASE_OUT} 0.4s backwards`,
                  backgroundColor: accentRgb
                    ? `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, 0.18)`
                    : undefined,
                  borderColor: "var(--hero-accent-text)",
                }}
              >
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                  <div 
                    className="size-8 sm:size-10 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "var(--hero-accent-text)",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    <Package className="size-4 sm:size-5" />
                  </div>
                  <div 
                    className="size-7 sm:size-8 rounded-full flex items-center justify-center border border-current shrink-0"
                    style={{ color: "var(--hero-accent-text)" }}
                  >
                    <ArrowUpRight className="size-3.5 sm:size-4" />
                  </div>
                </div>

                <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                  <div>
                    <p className="font-extrabold text-[11px] sm:text-sm whitespace-nowrap tracking-tight">
                      Fast &amp; Reliable Delivery
                    </p>
                  </div>
                  {/* User Profile Avatar Stack (5 images with 3px gap) */}
                  <div className="flex items-center gap-[3px] shrink-0">
                    {[
                      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg",
                      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
                      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790150478/photo-1544005313-94ddf0286df2-1790150482273.jpg",
                      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790150480/photo-1506794778202-cad84cf45f1d-1790150482275.jpg",
                      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_100,c_limit/v1790150481/photo-1517841905240-472988babdf9-1790150482277.jpg",
                    ].map((imgSrc, i) => (
                      <img
                        key={i}
                        src={imgSrc}
                        alt={`User avatar ${i + 1}`}
                        className="size-5 sm:size-8 rounded-md sm:rounded-lg border border-card/60 object-cover shadow-sm"
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>
      );
    }

    /* ═══════════════════════════════════════════════
       VARIANT 3: CLEAN SOLID WHITE/DARK PARENT WITH SOLID ACCENT FLIP WORD (NO GRADIENT)
       ═══════════════════════════════════════════════ */
    if (variant === "slider") {
      const sliderBadgeText =
        badgeText === "Next-Gen React Components"
          ? "Full-Stack Software Engineer"
          : badgeText;
      const sliderTitlePrefix =
        titlePrefix === "Build " ? "Building & Engineering" : titlePrefix;
      const sliderTitleAccent =
        titleSuffix ||
        (titlePrefix === "Build "
          ? "Full-Stack Digital Products"
          : "Interactive Experiences");
      const sliderSubtitle =
        subtitle ===
        "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Motion."
          ? "Full-stack software engineer dedicated to building scalable web applications, modern SaaS platforms, and high-performance digital experiences."
          : subtitle;
      const sliderPrimaryActionLabel =
        primaryActionLabel === "Browse Components"
          ? "Explore Projects"
          : primaryActionLabel;
      const sliderSecondaryActionLabel =
        secondaryActionLabel === "Star on GitHub"
          ? "Contact Me"
          : secondaryActionLabel;
      const sliderSecondaryActionHref =
        secondaryActionHref === "https://github.com/AlgorizeTech"
          ? "#contact"
          : secondaryActionHref;


      const devLabels = [
        "3D Web App",
        "WebGL Experience",
        "Three.js Scene",
        "3D Product UI",
        "Interactive 3D",
        "Spatial Web",
      ];

      return (
        <section
          ref={ref}
          style={customStyle}
          className={cn(
            "relative w-full overflow-hidden py-8 sm:py-12 lg:py-20 bg-background text-foreground",
            className,
          )}
          {...props}
        >
          {/* Keyframe style for continuous marquee slider */}
          <style>{`
            @keyframes hero-marquee-loop {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-hero-marquee {
              animation: hero-marquee-loop 25s linear infinite;
            }
            .animate-hero-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>

          {/* Grid Background Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_3%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_3%,transparent)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] pointer-events-none" />

          <div className="relative z-10 max-w-[1320px] mx-auto w-full px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
              
              {/* Left Section (Span 12 on mobile/md, Span 7 on lg) */}
              <div className="col-span-1 lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8 order-2 lg:order-1">
                
                {/* Main Content Box */}
                <div className="relative rounded-3xl p-5 sm:p-8 md:p-10 border border-primary/20 bg-card/60 backdrop-blur-xl space-y-4 sm:space-y-6 overflow-hidden flex-1 flex flex-col justify-center">
                  
                  {sliderBadgeText && (
                    <Link href={badgeHref} className="inline-block group/badge self-start">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs sm:text-sm font-semibold text-[var(--hero-accent-text)] group-hover/badge:bg-primary/20 transition-all duration-300">
                        <Terminal className="size-3.5 text-[var(--hero-accent-text)] shrink-0" />
                        <span>{sliderBadgeText}</span>
                      </div>
                    </Link>
                  )}

                  {/* Clean Static 2-Line Developer Heading */}
                  <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight flex flex-col leading-tight">
                    <span className="text-foreground shrink-0">{sliderTitlePrefix}</span>
                    <span className="text-[var(--hero-accent-text)] font-bold">
                      {sliderTitleAccent}
                    </span>
                  </h1>

                  {sliderSubtitle && (
                    <p className="text-xs sm:text-base text-muted-foreground leading-relaxed max-w-xl font-medium">
                      {sliderSubtitle}
                    </p>
                  )}

                  {/* Actions & Copy Line */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full">
                    {sliderPrimaryActionLabel && (
                      <Link
                        href={primaryActionHref}
                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-primary text-primary-foreground text-xs sm:text-base font-semibold hover:opacity-90 transition-all active:scale-95 w-full sm:w-auto text-center"
                      >
                        <span>{sliderPrimaryActionLabel}</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    )}

                    {sliderSecondaryActionLabel && (
                      <Link
                        href={sliderSecondaryActionHref}
                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl border border-border bg-muted hover:bg-foreground/10 text-xs sm:text-sm font-semibold transition-all cursor-pointer text-foreground active:scale-95 w-full sm:w-auto text-center"
                      >
                        {sliderSecondaryActionLabel.toLowerCase().includes("github") ? (
                          <GitHubIcon className="size-4 shrink-0 text-foreground" />
                        ) : sliderSecondaryActionLabel.toLowerCase().includes("resume") || sliderSecondaryActionLabel.toLowerCase().includes("cv") ? (
                          <FileText className="size-4 text-[var(--hero-accent-text)] shrink-0" />
                        ) : (
                          <Mail className="size-4 text-[var(--hero-accent-text)] shrink-0" />
                        )}
                        <span>{sliderSecondaryActionLabel}</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Bottom Section: Continuous Marquee Developer Code Slider */}
                <div className="relative w-full overflow-hidden rounded-2xl pt-2 shrink-0 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                  <div className="flex w-max animate-hero-marquee gap-3 sm:gap-4 items-center">
                    {[...sliderImages, ...sliderImages].map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-24 h-18 sm:w-32 sm:h-22 rounded-2xl overflow-hidden shrink-0 border border-border bg-card group/thumb"
                      >
                        <img
                          src={img}
                          alt={`Developer Visual ${idx}`}
                          className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-end p-2">
                          <span className="text-[10px] font-semibold text-white tracking-wide truncate">
                            {devLabels[idx % devLabels.length]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Section (Span 12 on mobile/md, Span 5 on lg) */}
              <div className="col-span-1 lg:col-span-5 relative flex flex-col h-full min-h-[300px] sm:min-h-[360px] lg:min-h-0 order-1 lg:order-2">
                <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] lg:min-h-full rounded-3xl overflow-hidden border border-border bg-card group">
                  
                  {/* Main Developer Visual Image */}
                  <img
                    src={mainImage}
                    alt="Developer Code Visual"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />

                  {/* Gradient Overlay for Text Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Developer Floating Badge Top Left */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 p-2.5 sm:p-4 rounded-2xl bg-background/85 backdrop-blur-xl border border-border flex items-center gap-2.5 sm:gap-3">
                    <div className="size-8 sm:size-10 rounded-xl bg-primary/20 text-[var(--hero-accent-text)] flex items-center justify-center font-semibold shrink-0">
                      <Code className="size-4 sm:size-5" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-extrabold text-foreground">100% Type-Safe</p>
                      <p className="text-[9px] sm:text-[10px] text-muted-foreground font-medium">TypeScript & Tailwind CSS</p>
                    </div>
                  </div>

                  {/* Developer Floating Badge Bottom Right */}
                  <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 p-2.5 sm:p-4 rounded-2xl bg-background/85 backdrop-blur-xl border border-border flex items-center gap-2.5 sm:gap-3">
                    <div className="size-2.5 sm:size-3 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold text-foreground">Developer Experience</p>
                      <p className="text-[9px] sm:text-[10px] text-emerald-500 font-semibold">Copy-Paste Ready</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>
      );
    }

    /* ═══════════════════════════════════════════════
       VARIANT 6: PRECISION FACILITY & CAD BLUEPRINT GRID HERO (INTERACTIVE MORPHING SHAPE)
       ═══════════════════════════════════════════════ */
    if (variant === "facility" || variant === "geometric") {
      const isDefaultFacilityTitle =
        !titlePrefix ||
        titlePrefix === "Build " ||
        titlePrefix.includes("Precision facility");

      const facilityTitleLines: string[] = isDefaultFacilityTitle
        ? [
            "Precision facility",
            "services. Certified. For",
            "environments that can't fail.",
          ]
        : (titlePrefix + (titleSuffix ? ` ${titleSuffix}` : "")).includes("\n")
        ? (titlePrefix + (titleSuffix ? ` ${titleSuffix}` : "")).split("\n")
        : [
            "Precision facility",
            "services. Certified. For",
            "environments that can't fail.",
          ];

      const facSubtitle =
        subtitle ===
        "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Motion."
          ? "Certified, data-driven facility services across mission-critical environments."
          : subtitle;

      const facPrimaryAction =
        primaryActionLabel === "Browse Components"
          ? "Request a facility audit"
          : primaryActionLabel;

      // Where the grid lines and the shape rest for the current hover zone;
      // the glide between zones is `GLIDE`, run by the layout effect above.
      const shape = shapeTargets(shapeHoverZone) as React.CSSProperties[];

      return (
        <section
          ref={ref}
          style={customStyle}
          className={cn(
            "relative w-full overflow-hidden bg-background text-foreground transition-colors duration-300 border-y border-neutral-200/80 dark:border-neutral-800/80",
            className,
          )}
          {...props}
        >
          <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px] sm:min-h-[520px]">
            {/* LEFT COLUMN: Heading at top, Subtitle + CTA button at bottom */}
            <div className="col-span-1 lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-14 z-10 border-b lg:border-b-0 border-neutral-200/80 dark:border-neutral-800/80">
              {/* Heading: Always structured in exact 3 lines */}
              <div className="pt-2 sm:pt-4">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-[42px] lg:text-[44px] xl:text-[48px] font-normal sm:font-medium tracking-tight text-neutral-900 dark:text-neutral-100 font-sans leading-[1.12] max-w-xl">
                  {facilityTitleLines.map((line, idx) => (
                    <span
                      key={idx}
                      className="block whitespace-normal sm:whitespace-nowrap"
                    >
                      {line}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Subtitle & CTA button */}
              <div className="pt-10 sm:pt-16 mt-auto">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8">
                  {facSubtitle && (
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[340px]">
                      {facSubtitle}
                    </p>
                  )}

                  {facPrimaryAction && (
                    <Link
                      href={primaryActionHref || "#"}
                      className="inline-flex items-center group overflow-hidden shadow-xs shrink-0 self-start sm:self-end border border-primary/20 transition-all hover:shadow-md active:scale-[0.98]"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "var(--primary-foreground)",
                      }}
                    >
                      <span className="text-xs sm:text-sm font-medium px-4 sm:px-5 py-2.5 sm:py-3 tracking-wide transition-colors">
                        {facPrimaryAction}
                      </span>
                      <span className="p-2.5 sm:p-3 flex items-center justify-center border-l border-primary-foreground/20 bg-black/10 dark:bg-white/10 transition-colors group-hover:bg-black/20 dark:group-hover:bg-white/20">
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Box Grid with Morphing Polygon locked to Border */}
            <div
              className="col-span-1 lg:col-span-5 relative flex items-center justify-center min-h-[360px] sm:min-h-[420px] lg:min-h-[520px] overflow-hidden lg:border-l border-neutral-200/80 dark:border-neutral-800/80 select-none"
              onMouseLeave={() => setShapeHoverZone("idle")}
            >
              {/* Interactive Hover Trigger Zones across 3 columns (No background color change) */}
              <div className="absolute inset-0 grid grid-cols-3 z-30">
                {/* Left Column (Left Box): Hovering here slightly shrinks the shape and its border */}
                <div
                  className="h-full cursor-pointer"
                  onMouseEnter={() => setShapeHoverZone("left")}
                  title="Hover left box to contract"
                />
                {/* Center Column (Center Box): Hovering here returns shape and border to resting state */}
                <div
                  className="h-full cursor-pointer"
                  onMouseEnter={() => setShapeHoverZone("center")}
                  title="Resting state"
                />
                {/* Right Column (Right Box): Hovering here slightly expands shape width and height */}
                <div
                  className="h-full cursor-pointer"
                  onMouseEnter={() => setShapeHoverZone("right")}
                  title="Hover right box to expand"
                />
              </div>

              {/* Grid Lines — each sits at its hover zone's place (see `shapeTargets`) */}
              {/* Top horizontal grid line - moves symmetrically with shape top */}
              <div
                ref={(el) => {
                  shapeRefs.current[0] = el;
                }}
                className="absolute left-0 right-0 h-px bg-primary/20 dark:bg-primary/30 transition-colors duration-300 z-10 pointer-events-none"
                style={shape[0]}
              />
              {/* Bottom horizontal grid line - moves symmetrically with shape bottom */}
              <div
                ref={(el) => {
                  shapeRefs.current[1] = el;
                }}
                className="absolute left-0 right-0 h-px bg-primary/20 dark:bg-primary/30 transition-colors duration-300 z-10 pointer-events-none"
                style={shape[1]}
              />

              {/* Moving Left Vertical Grid Line - attached to shape left, moves in 4-way symmetry */}
              <div
                ref={(el) => {
                  shapeRefs.current[2] = el;
                }}
                className="absolute top-0 bottom-0 w-px bg-primary/20 dark:bg-primary/30 transition-colors duration-300 z-10 pointer-events-none"
                style={shape[2]}
              />

              {/* Moving Right Vertical Grid Line - attached to shape right, moves in 4-way symmetry */}
              <div
                ref={(el) => {
                  shapeRefs.current[3] = el;
                }}
                className="absolute top-0 bottom-0 w-px bg-primary/20 dark:bg-primary/30 transition-colors duration-300 z-10 pointer-events-none"
                style={shape[3]}
              />

              {/* Animated Central Morphing Shape - strictly bounded between all 4 moving grid lines */}
              <div
                ref={(el) => {
                  shapeRefs.current[4] = el;
                }}
                className="absolute z-10 pointer-events-none"
                style={shape[4]}
              >
                {/* Geometric chamfered polygon */}
                <div
                  className="w-full h-full bg-primary/15 dark:bg-primary/25 transition-colors duration-300 drop-shadow-xs"
                  style={{
                    clipPath:
                      "polygon(clamp(24px, 15%, 52px) 0, 100% 0, 100% calc(100% - clamp(20px, 14%, 44px)), calc(100% - clamp(24px, 15%, 52px)) 100%, 0 100%, 0 clamp(20px, 14%, 44px))",
                  }}
                />

                {/* Top-Right Control Anchor Square - exactly on (xRight, top) */}
                <div className="absolute top-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary translate-x-1/2 -translate-y-1/2 shadow-xs transition-colors duration-300" />

                {/* Bottom-Left Control Anchor Square - exactly on (24%, bottom) */}
                <div className="absolute bottom-0 left-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary -translate-x-1/2 translate-y-1/2 shadow-xs transition-colors duration-300" />
              </div>
            </div>
          </div>
        </section>
      );
    }

    /* ═══════════════════════════════════════════════
       VARIANT 7: ATMOSPHERIC CYCLONE / RADAR VORTEX HERO (MATCHES CLIMATE RISK REFERENCE)
       ═══════════════════════════════════════════════ */
    if (variant === "vortex" || variant === "radar" || variant === "cyclone") {
      const vortexEyebrow = eyebrow || "CLIMATE RISK, PER PARCEL";
      const vortexTitle =
        titlePrefix === "Build "
          ? "One street,\none storm,\ntwo prices"
          : titlePrefix + (titleSuffix ? ` ${titleSuffix}` : "");
      const vortexSubtitle =
        subtitle ===
        "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Motion."
          ? "Flood, wildfire and wind priced for one\naddress, not the postcode around it"
          : subtitle;
      const vortexPrimaryAction =
        primaryActionLabel === "Browse Components"
          ? "Score an address"
          : primaryActionLabel;
      const activeMetrics = metrics || DEFAULT_VORTEX_METRICS;
      const vortexHudTitle = hudTitle || "GUST FIELD";
      const vortexHudTime = hudTime || "T+36:25";
      const activeHudMetrics = hudMetrics || DEFAULT_HUD_METRICS;
      const vortexBg = resolvedColor || "#0052cc";

      return (
        <section
          ref={ref}
          style={{
            backgroundColor: vortexBg,
            ...customStyle,
          }}
          className={cn(
            "relative w-full overflow-hidden text-white transition-colors duration-300 select-none",
            className,
          )}
          {...props}
        >
          <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[660px] items-stretch">
            {/* LEFT COLUMN: Monospace Eyebrow, Main 3-line Headline, Subtitle, CTA Button & Bottom 3 Metrics */}
            <div className="col-span-1 lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 lg:p-16 z-10 space-y-8">
              <div className="space-y-6 sm:space-y-8">
                {/* Eyebrow */}
                {vortexEyebrow && (
                  <p className="font-mono text-[10px] sm:text-xs tracking-[0.24em] uppercase text-white/60 font-normal">
                    {vortexEyebrow}
                  </p>
                )}

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-mono font-normal tracking-tight leading-[1.12] text-white whitespace-pre-line">
                  {vortexTitle}
                </h1>

                {/* Subtitle */}
                {vortexSubtitle && (
                  <p className="text-xs sm:text-sm md:text-base text-white/70 font-mono font-normal leading-relaxed whitespace-pre-line max-w-md">
                    {vortexSubtitle}
                  </p>
                )}

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={primaryActionHref}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-[2px] bg-white font-mono text-xs sm:text-sm font-normal hover:bg-white/95 active:scale-95 transition-all text-center"
                    style={{ color: vortexBg }}
                  >
                    <span>{vortexPrimaryAction}</span>
                  </Link>

                  {secondaryActionLabel && (
                    <Link
                      href={secondaryActionHref}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-[2px] border border-white/20 bg-white/10 hover:bg-white/15 active:scale-95 text-white font-mono text-xs sm:text-sm font-normal transition-all backdrop-blur-sm"
                    >
                      <span>{secondaryActionLabel}</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Bottom 3 Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-10 sm:pt-12 border-t border-white/10 mt-auto">
                {activeMetrics.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-mono font-normal text-white tracking-tight">
                      {item.value}
                    </p>
                    <p className="text-[9px] sm:text-[10px] lg:text-[11px] font-mono font-normal tracking-[0.16em] text-white/50 uppercase leading-snug">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Rotating Cyclone Vortex Radar & Corner Reticle & Telemetry HUD */}
            <div className="col-span-1 lg:col-span-6 relative flex items-center justify-center p-3 sm:p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-white/10 min-h-[460px] sm:min-h-[520px] lg:min-h-[660px] overflow-hidden">
              {/* Radar Screen Frame */}
              <div className="relative w-full h-full min-h-[440px] sm:min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-hidden border border-white/15">
                {/* Top-Left HUD Targeting Crosshair Reticle */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-none select-none text-white/90">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M2 7V2H7" strokeWidth="1.5" strokeLinecap="square" />
                    <path d="M22 17V22H17" strokeWidth="1.5" strokeLinecap="square" />
                    <path d="M17 2H22V7" strokeWidth="1.5" strokeLinecap="square" strokeOpacity="0.4" />
                    <path d="M7 22H2V17" strokeWidth="1.5" strokeLinecap="square" strokeOpacity="0.4" />
                    <circle cx="12" cy="12" r="3" strokeWidth="1.2" />
                    <circle cx="12" cy="12" r="1" fill="currentColor" />
                  </svg>
                </div>

                {/* Rotating Vortex Canvas */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <VortexCanvas speed={rotationSpeed ?? 0.010} />
                </div>

                {/* Bottom-Right Telemetry HUD Card */}
                <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-30 w-[230px] sm:w-[260px] border border-white/25 bg-white/[0.03] backdrop-blur-[2px] rounded-[2px] p-3 sm:p-3.5 text-white font-mono pointer-events-auto select-none">
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] pb-2 border-b border-white/20">
                    <div className="flex items-center gap-2 font-normal tracking-wider">
                      <span className="size-1.5 sm:size-2 bg-white inline-block shrink-0" />
                      <span className="tracking-widest">{vortexHudTitle}</span>
                    </div>
                    <span className="text-white/70 text-[9px] sm:text-[10px] font-normal tracking-wider">
                      {vortexHudTime}
                    </span>
                  </div>
                  <div className="pt-2.5 space-y-1.5 text-[10px] sm:text-[11px]">
                    {activeHudMetrics.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-white/60 tracking-wider text-[9px] sm:text-[10px] uppercase font-normal">
                          {item.label}
                        </span>
                        <span className="text-white font-normal tracking-wide text-[10px] sm:text-[11px]">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    /* ═══════════════════════════════════════════════
       VARIANTS 1 & 2: BOUNCE & TYPING (CENTERED HERO)
       ═══════════════════════════════════════════════ */
    return (
      <section
        ref={ref}
        style={customStyle}
        className={cn(
          "relative w-full flex flex-col justify-center items-center py-4 sm:py-8 md:py-12",
          className,
        )}
        {...props}
      >
        <style>{HERO_CSS}</style>
        {/* Radial Background Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, var(--primary) 0%, transparent 65%)",
            opacity: 0.12,
          }}
        />
        {/* Grid Mask Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_3%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_3%,transparent)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_40%,transparent_100%)]" />

        <div className="relative z-10 max-w-[1320px] mx-auto w-full px-5 sm:px-6 md:px-8 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center text-center max-w-[1320px] mx-auto space-y-3.5 sm:space-y-6 md:space-y-7 my-auto">
            {/* Top Pill Badge */}
            {badgeText && (
              <Link href={badgeHref} className="inline-block group">
                <div className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-5 py-1 sm:py-2.5 rounded-full bg-primary/10 border border-primary/30 text-[9px] xs:text-[10px] sm:text-base font-semibold text-[var(--hero-accent-text)] group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                  <Sparkles className="size-2.5 xs:size-3 sm:size-4 text-[var(--hero-accent-text)] animate-spin shrink-0" />
                  <span className="truncate max-w-[140px] xs:max-w-[170px] sm:max-w-none">
                    {badgeText}
                  </span>
                </div>
              </Link>
            )}

            {/* Dynamic Animated Title Word */}
            <h1 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight text-foreground text-center inline-flex items-center justify-center flex-wrap gap-x-1.5 sm:gap-x-2.5">
              <span className="shrink-0">
                {titlePrefix}{" "}
                <span className="text-[var(--hero-accent-text)]">
                  Interactive
                </span>
              </span>

              <AnimatedTypographyBlock
                as="span"
                bare
                variant={variant === "typing" ? "typewriter" : "letter-bounce"}
                words={typingWords}
                prefixPosition={prefixPosition}
                className="shrink-0 text-foreground"
                style={{ "--typo-caret": "var(--hero-accent-text)" } as React.CSSProperties}
              />

              {titleSuffix && <span className="shrink-0">{titleSuffix}</span>}
            </h1>

            {/* Subtitle Paragraph */}
            {subtitle && (
              <p className="text-[10px] xs:text-xs sm:text-base md:text-lg text-muted-foreground w-full max-w-3xl mx-auto leading-tight sm:leading-relaxed text-center font-medium px-1 sm:px-0">
                {subtitle}
              </p>
            )}

            {/* CLI Command Box */}
            {cliCommand && (
              <div className="pt-0.5 w-full flex justify-center px-1 sm:px-0">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="group flex items-center gap-2 sm:gap-3.5 px-2.5 sm:px-5 h-8 xs:h-9 sm:h-[58px] rounded-lg sm:rounded-2xl border border-border bg-muted/70 cursor-pointer w-full max-w-[220px] xs:max-w-[250px] sm:max-w-md hover:border-primary/50 transition-all"
                >
                  <Terminal className="size-3 xs:size-3.5 sm:size-5 text-[var(--hero-accent-text)] shrink-0" />
                  <code className="text-[9px] xs:text-[10px] sm:text-sm md:text-base font-mono text-foreground flex-1 text-left font-semibold truncate !bg-transparent !border-none !outline-none !shadow-none !p-0">
                    {cliCommand}
                  </code>
                  <div className="pl-1.5 sm:pl-3.5 border-l-0 h-3 sm:h-5 flex items-center shrink-0">
                    {copied ? (
                      <Check className="size-3 sm:size-4.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3 sm:size-4.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    )}
                  </div>
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-row items-center justify-center gap-1.5 xs:gap-2.5 sm:gap-4 pt-0 sm:pt-2 w-full max-w-3xl mx-auto px-1 sm:px-0">
              {primaryActionLabel && (
                <Link
                  href={primaryActionHref}
                  className="px-2.5 xs:px-3 sm:px-9 h-8 xs:h-9 sm:h-[58px] rounded-lg sm:rounded-2xl bg-primary text-primary-foreground text-[10px] xs:text-xs sm:text-base md:text-lg font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1 sm:gap-2.5 flex-1 sm:flex-initial min-w-0 sm:min-w-[220px]"
                >
                  <span>{primaryActionLabel}</span>
                  <ArrowRight className="size-3 sm:size-5 shrink-0" />
                </Link>
              )}

              {secondaryActionLabel && (
                <Link
                  href={secondaryActionHref}
                  target={
                    secondaryActionHref.startsWith("http")
                      ? "_blank"
                      : undefined
                  }
                  className="px-2.5 xs:px-3 sm:px-9 h-8 xs:h-9 sm:h-[58px] rounded-lg sm:rounded-2xl border border-border bg-card text-foreground text-[10px] xs:text-xs sm:text-base md:text-lg font-semibold hover:bg-primary/10 hover:border-primary/50 hover:text-[var(--hero-accent-text)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1 sm:gap-2.5 flex-1 sm:flex-initial min-w-0 sm:min-w-[220px]"
                >
                  <span>{secondaryActionLabel}</span>
                  <GitHubIcon className="size-3 sm:size-5 shrink-0" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  },
);

HeroBlock.displayName = "HeroBlock";
export { BentoCascadeHero, type BentoCascadeCardItem } from "./BentoCascadeHeroBlock";
export { BreatheHero, type BreatheCardItem, type BreatheHeroProps } from "./BreatheHeroBlock";
export default HeroBlock;
