"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TiltedCard } from "./TiltedCardBlock";

// ==========================================
// PLATFORM GRID
// Everything a product offers, as one hairline grid: small tiles with an icon
// and a name, and a few 2×2 features that show a piece of the product on a
// tilting card. Tiles pack densely, so the features stay square at every
// column count. The grid reveals once as a wave from its centre, then a
// spotlight follows the pointer across it.
// ==========================================

// ------------------------------------------
// Tile — an icon and a name
// ------------------------------------------
export interface PlatformTileProps extends React.HTMLAttributes<HTMLElement> {
  icon: React.ReactNode;
  label: string;
  /** Render as a link. */
  href?: string;
  /** Swap the anchor for a framework Link. */
  linkComponent?: React.ElementType;
}

function Tile({ icon, label, href, linkComponent, className, ...props }: PlatformTileProps) {
  const Comp: React.ElementType = href ? (linkComponent ?? "a") : "div";
  return (
    <Comp
      data-tile=""
      {...(href ? { href } : {})}
      className={cn(
        "group relative flex aspect-square flex-col items-center justify-center gap-2.5 border-b border-r border-foreground/[0.08] px-2 text-center outline-none transition-colors duration-300 hover:bg-foreground/[0.03] focus-visible:bg-foreground/[0.03]",
        className,
      )}
      {...props}
    >
      <span className="grid h-6 w-6 place-items-center text-foreground/40 transition-all duration-300 ease-out [&>svg]:h-[18px] [&>svg]:w-[18px] group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-primary group-focus-visible:text-primary">
        {icon}
      </span>
      <span className="text-[11px] font-medium leading-tight text-foreground/50 transition-colors duration-300 group-hover:text-foreground">
        {label}
      </span>
    </Comp>
  );
}

// ------------------------------------------
// Feature — a 2×2 tile with a tilting card
// ------------------------------------------
export interface PlatformFeatureProps extends React.HTMLAttributes<HTMLElement> {
  icon: React.ReactNode;
  label: string;
  href?: string;
  linkComponent?: React.ElementType;
  /** What sits on the card — see `PlatformGrid.Mock` for the frame. */
  children: React.ReactNode;
}

function Feature({ icon, label, href, linkComponent, className, children, ...props }: PlatformFeatureProps) {
  const Comp: React.ElementType = href ? (linkComponent ?? "a") : "div";
  return (
    <Comp
      data-tile=""
      {...(href ? { href } : {})}
      className={cn(
        "group relative col-span-2 row-span-2 flex aspect-square flex-col items-center justify-between border-b border-r border-foreground/[0.08] bg-gradient-to-b from-muted to-background px-2 pb-4 pt-6 outline-none transition-colors duration-300",
        className,
      )}
      {...props}
    >
      {/* The card leans until the pointer arrives, then straightens and tilts with it. */}
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="w-[76%] max-w-[15rem] -rotate-[4deg] transition-transform duration-500 ease-out group-hover:rotate-0">
          <TiltedCard tiltIntensity={9} glareOpacity={0.12} scaleOnHover={1.03} className="h-auto">
            {children}
          </TiltedCard>
        </div>
      </div>
      <span className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-foreground">
        <span className="grid h-6 w-fit place-items-center [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
        {label}
      </span>
    </Comp>
  );
}

// ------------------------------------------
// Mock and Pill — what goes on a feature's card
// ------------------------------------------
function Mock({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "space-y-1.5 rounded-xl border border-foreground/[0.08] bg-card p-3 text-left text-card-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function Pill({
  tone = "ink",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: "ink" | "accent" | "soft" }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-1.5 py-[3px] text-[7.5px] font-semibold leading-none",
        tone === "ink" && "bg-foreground text-background",
        tone === "accent" && "bg-primary text-primary-foreground",
        tone === "soft" && "bg-foreground/[0.08] font-medium text-foreground/60",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// ------------------------------------------
// The reveal: each tile rises in after its own delay (`--tile-at`), with
// GSAP's power3.out as a CSS easing.
// ------------------------------------------
const EASE_OUT =
  "linear(0, .1945, .3591, .4971, .6115, .7052, .7808, .8409, .8877, .9233, .9497, .9686, .9816, .9901, .9952, .998, .9994, .9999, 1, 1)";

const REVEAL_CSS = `
@keyframes platform-tile-in { from { opacity: 0; transform: translateY(10px) scale(0.9); } }
[data-tile-reveal] [data-tile] { animation: platform-tile-in 0.7s ${EASE_OUT} var(--tile-at, 0s) backwards; }
`;

/**
 * Delays for a wave from the centre of a grid, `each` seconds apart: GSAP's
 * `stagger: { each, grid: "auto", from: "center" }`, step for step. The
 * column count is read from where the tiles sit — the first tile that is not
 * further right than the one before it starts the second row.
 */
function centreWave(tiles: HTMLElement[], each: number) {
  const l = tiles.length;
  if (!l) return [];
  let w = 0;
  let max = -Infinity;
  while (max < (max = tiles[w++].getBoundingClientRect().left) && w < l) {
    // walk along the first row
  }
  if (w < l) w--;
  const originX = Math.min(w, l) * 0.5 - 0.5;
  const originY = (l * 0.5) / w - 0.5;
  const d = tiles.map((_, j) => Math.hypot((j % w) - originX, originY - Math.floor(j / w)));
  const min = Math.min(...d);
  const range = Math.max(...d) - min;
  const total = each * (w > l ? l - 1 : Math.max(w, l / w));
  return d.map((dist) => Math.round((((dist - min) / range || 0) * total) * 1e7) / 1e7);
}

// ------------------------------------------
// Root
// ------------------------------------------
export interface PlatformGridProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  intro?: React.ReactNode;
  /** Accent for hovered icons, pills and the spotlight; defaults to the theme's primary. */
  accent?: string;
  /** Play the reveal when the section enters the viewport (default) or immediately. */
  reveal?: "in-view" | "immediate";
  /** Fade the outer columns, so the grid reads as a window onto something larger. */
  fadeEdges?: boolean;
  children: React.ReactNode;
}

function PlatformGridRoot({
  eyebrow,
  heading,
  intro,
  accent,
  reveal = "in-view",
  fadeEdges = true,
  className,
  style,
  children,
  ...props
}: PlatformGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(reveal === "immediate");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (inView) return;
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  // The reveal: every tile rises in, in a wave from the centre of the grid.
  // Tiles render opaque on the server; this only runs once the page is live.
  useEffect(() => {
    if (!inView) return;
    const grid = gridRef.current;
    if (!grid) return;
    const reduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const tiles = Array.from(grid.querySelectorAll<HTMLElement>("[data-tile]"));
    const delays = centreWave(tiles, 0.08);
    tiles.forEach((tile, i) => tile.style.setProperty("--tile-at", `${delays[i]}s`));
    setPlaying(true);
  }, [inView]);

  // The spotlight is driven by CSS variables written straight to the grid, so
  // moving the pointer never re-renders the tiles.
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
    el.style.setProperty("--spot-on", "1");
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--spot-on", "0");
  };

  return (
    <section
      ref={sectionRef}
      className={cn("w-full bg-background text-foreground", className)}
      style={accent ? ({ ...style, "--primary": accent } as React.CSSProperties) : style}
      {...props}
    >
      {(eyebrow || heading || intro) && (
        <header className="mx-auto max-w-2xl px-6 pb-10 pt-14 text-center sm:pb-12 sm:pt-16">
          {eyebrow && (
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-foreground/55">{eyebrow}</p>
          )}
          <h2 className="mt-3 font-sans text-[2rem] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[2.5rem]">
            {heading}
          </h2>
          {intro && (
            <p className="mx-auto mt-4 max-w-[30rem] text-[15px] leading-[1.7] text-foreground/60">{intro}</p>
          )}
        </header>
      )}

      <div
        className={cn(
          "relative mx-auto max-w-[1180px]",
          fadeEdges &&
            "lg:[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] lg:[-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        )}
      >
        <style>{REVEAL_CSS}</style>
        <div
          ref={gridRef}
          data-tile-reveal={playing ? "" : undefined}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative grid grid-cols-2 border-l border-t border-foreground/[0.08] [grid-auto-flow:dense] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-8"
        >
          {/* The spotlight: a soft disc of the accent under the pointer. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[var(--spot-on,0)] transition-opacity duration-500 motion-reduce:hidden"
            style={{
              background:
                "radial-gradient(240px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, var(--primary) 9%, transparent), transparent 70%)",
            }}
          />
          {children}
        </div>
      </div>
    </section>
  );
}

export const PlatformGrid = Object.assign(PlatformGridRoot, {
  Tile,
  Feature,
  Mock,
  Pill,
});

export default PlatformGrid;
