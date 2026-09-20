"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ==========================================
// HONEYCOMB HERO
// A nature or travel hero: a light headline over a bold, tracked accent word
// on the left, and on the right a honeycomb of five hexagonal photographs
// with a hexagonal call-to-action set among them. A row of social links runs
// along the foot.
// ==========================================

export interface HoneycombImage {
  src: string;
  alt: string;
}

export interface HoneycombHeroProps extends React.HTMLAttributes<HTMLElement> {
  /** The light line above the accent word. */
  title?: string;
  /** The bold, tracked, upper-case word in the accent colour. */
  titleAccent?: string;
  subtitle?: string;
  primaryActionLabel?: string;
  primaryActionHref?: string;
  /**
   * Five photographs for the honeycomb, in this order: the large one at left,
   * top centre, middle right, bottom left, bottom right.
   */
  images?: HoneycombImage[];
  /** Links along the foot; an empty array hides the bar. */
  socialLinks?: { label: string; href: string }[];
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
const DEFAULT_IMAGES: HoneycombImage[] = [
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop", alt: "A foggy waterfall in a green valley" },
  { src: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop", alt: "A sunlit forest path" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", alt: "An emerald fjord beach" },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop", alt: "Sunlight through wilderness trees" },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop", alt: "An alpine peak reflected in a lake" },
];

const DEFAULT_SOCIAL = [
  { label: "Facebook", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "YouTube", href: "#" },
];

// Pointy-top regular hexagon.
const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

// Position and size of each cell in the honeycomb, in layout order.
const CELLS = [
  {
    className: "left-[0%] top-[8%] sm:left-[2%] sm:top-[10%] w-[150px] h-[173px] xs:w-[190px] xs:h-[219px] sm:w-[330px] sm:h-[380px] md:w-[390px] md:h-[450px] z-20",
    hover: 1.02,
    shadow: "shadow-2xl",
  },
  {
    className: "left-[36%] top-[0%] sm:left-[40%] w-[80px] h-[92px] xs:w-[100px] xs:h-[115px] sm:w-[170px] sm:h-[196px] md:w-[200px] md:h-[230px] z-10",
    hover: 1.03,
    shadow: "shadow-xl",
  },
  {
    className: "right-[0%] top-[20%] sm:right-[5%] sm:top-[26%] w-[75px] h-[86px] xs:w-[95px] xs:h-[109px] sm:w-[165px] sm:h-[190px] md:w-[195px] md:h-[225px] z-10",
    hover: 1.03,
    shadow: "shadow-xl",
  },
  {
    className: "left-[18%] bottom-[0%] sm:left-[22%] sm:bottom-[2%] w-[65px] h-[75px] xs:w-[85px] xs:h-[98px] sm:w-[140px] sm:h-[161px] md:w-[160px] md:h-[184px] z-10",
    hover: 1.03,
    shadow: "shadow-xl",
  },
  {
    className: "right-[-2%] bottom-[-2%] sm:right-[0%] sm:bottom-[0%] w-[75px] h-[86px] xs:w-[95px] xs:h-[109px] sm:w-[160px] sm:h-[184px] md:w-[185px] md:h-[213px] z-10",
    hover: 1.03,
    shadow: "shadow-xl",
  },
];

// ------------------------------------------
// Root
// ------------------------------------------
export const HoneycombHero = forwardRef<HTMLElement, HoneycombHeroProps>(
  (
    {
      title = "Amazing",
      titleAccent = "Norway",
      subtitle = "Visit Norway, you will never regret it. This is something incredible - fantastic nature, fjords, fancy outlines of the coast...",
      primaryActionLabel = "Book a tour",
      primaryActionHref = "#",
      images = DEFAULT_IMAGES,
      socialLinks = DEFAULT_SOCIAL,
      color,
      linkComponent: Link = "a",
      className,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        style={{ ...accentStyle(color), ...style }}
        className={cn(
          "relative flex min-h-[520px] w-full select-none flex-col justify-between overflow-hidden bg-white px-3 py-6 text-foreground transition-colors duration-500 dark:bg-black xs:px-4 sm:min-h-[720px] sm:px-8 sm:py-8 lg:min-h-[840px] lg:px-12",
          className,
        )}
        {...props}
      >
        {/* A faint grid, fading out towards the edges. */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] sm:bg-[size:32px_32px]"
          aria-hidden
        />

        <div className="relative z-20 mx-auto my-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12">
          {/* ---- Copy ---- */}
          <div className="z-30 col-span-1 flex flex-col items-center justify-center space-y-3 text-center sm:space-y-5 lg:col-span-5 lg:items-start lg:space-y-7 lg:text-left">
            <div className="flex flex-col items-center space-y-1 sm:space-y-2 lg:items-start">
              <p className="text-lg font-light tracking-wide text-zinc-600 dark:text-zinc-300 xs:text-xl sm:text-2xl md:text-3xl">{title}</p>
              <div className="flex items-center justify-center gap-3 sm:gap-4 lg:justify-start">
                <div className="h-[2px] w-8 sm:h-[2.5px] xs:w-12 sm:w-16" style={{ backgroundColor: "var(--hero-accent-text)" }} aria-hidden />
                <h1 className="text-3xl font-extrabold uppercase tracking-widest xs:text-4xl sm:text-6xl md:text-7xl" style={{ color: "var(--hero-accent-text)" }}>
                  {titleAccent}
                </h1>
              </div>
            </div>
            {subtitle && (
              <p className="max-w-xs text-xs font-light leading-normal text-zinc-600 dark:text-zinc-400 xs:max-w-sm xs:text-sm sm:max-w-md sm:text-base sm:leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* ---- The honeycomb ---- */}
          <div className="relative col-span-1 flex h-[320px] w-full items-center justify-center overflow-visible xs:h-[380px] sm:h-[540px] md:h-[620px] lg:col-span-7">
            <div className="relative flex h-full w-full max-w-[320px] items-center justify-center xs:max-w-[400px] sm:max-w-[650px]">
              {CELLS.map((cell, i) => {
                const img = images[i];
                if (!img) return null;
                return (
                  <motion.div key={img.src + i} whileHover={{ scale: cell.hover }} transition={{ duration: 0.3 }} className={cn("absolute", cell.className)}>
                    <div
                      className={cn("group relative h-full w-full cursor-pointer overflow-hidden bg-zinc-100 dark:bg-zinc-900", cell.shadow)}
                      style={{ clipPath: HEX_CLIP }}
                    >
                      <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
                      {i === 0 && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* The hexagonal call to action, set among the photographs. */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-[8%] left-[38%] z-30 h-[86px] w-[75px] cursor-pointer xs:h-[109px] xs:w-[95px] sm:bottom-[12%] sm:left-[42%] sm:h-[178px] sm:w-[155px] md:h-[207px] md:w-[180px]"
              >
                <Link
                  href={primaryActionHref}
                  className="group flex h-full w-full flex-col items-center justify-center bg-[var(--hero-accent-text)] p-1.5 text-center text-white shadow-2xl transition-opacity hover:opacity-90 dark:text-[#0A1A1B] sm:p-3"
                  style={{ clipPath: HEX_CLIP }}
                >
                  <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-wider transition-transform group-hover:translate-x-0.5 xs:text-[9px] sm:text-xs" aria-hidden>
                    ▶
                  </span>
                  <span className="mt-0.5 text-[9px] font-black uppercase leading-none tracking-widest xs:text-[10px] sm:mt-1 sm:text-sm sm:leading-tight md:text-base">
                    {primaryActionLabel}
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ---- Social links ---- */}
        {socialLinks.length > 0 && (
          <div className="relative z-20 mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-center gap-3 border-t border-zinc-200 pt-4 text-[10px] font-light text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 xs:gap-5 xs:text-xs sm:gap-8 sm:pt-6 lg:justify-start">
            <div className="flex items-center gap-4 tracking-wider xs:gap-6 sm:gap-8">
              {socialLinks.map((s) => (
                <Link key={s.label} href={s.href} className="transition-colors hover:text-foreground dark:hover:text-white">
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  },
);
HoneycombHero.displayName = "HoneycombHero";

export default HoneycombHero;
