"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// ORBIT GALLERY
// A two-column hero: copy and actions on the left, and on the right a ring of
// photo cards that revolves once every 36 seconds, each card staying upright
// as it travels. Hovering the ring holds it still; moving the pointer over
// the section leaves a short trail of dots in the accent colour.
// ==========================================

export interface OrbitHighlight {
  label: string;
  /** Colour of the dot before the label; the accent by default. */
  color?: string;
}

export interface OrbitGalleryProps extends React.HTMLAttributes<HTMLElement> {
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
  /** The photographs on the ring, in orbit order. */
  images?: string[];
  /** Seconds for one full revolution. */
  duration?: number;
  /** Small dotted facts under the actions. */
  highlights?: OrbitHighlight[];
  /** Accent colour — a preset name (indigo, rose, emerald, zinc) or any CSS colour. */
  color?: string;
  /** Pass `next/link` to keep client-side navigation. */
  linkComponent?: React.ElementType;
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

const DEFAULT_HIGHLIGHTS: OrbitHighlight[] = [
  { label: "15 hand-picked scenes" },
  { label: "Full-circle rotation", color: "#10b981" },
  { label: "Holds still on hover", color: "#f59e0b" },
];

// ------------------------------------------
// Root
// ------------------------------------------
export const OrbitGallery = forwardRef<HTMLElement, OrbitGalleryProps>(
  (
    {
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
      highlights = DEFAULT_HIGHLIGHTS,
      color,
      linkComponent: Link = "a",
      className,
      style,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
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

              {highlights.length > 0 && (
                <div className="flex flex-wrap items-center gap-5 border-t border-border/40 pt-2 text-xs font-semibold text-muted-foreground sm:gap-8">
                  {highlights.map((h) => (
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
