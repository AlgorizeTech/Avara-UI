"use client";

import { cn } from "@/lib/utils";
import React, { createContext, useContext } from "react";

// ==========================================
// 1. GLASS BACKDROP — aurora ground + bento grid
// ==========================================
// The surface the panels sit on. Profile Page, Book Appointment and Booking
// Card all build on this pair; it has no opinion about what the page is.
/**
 * The page's surface treatment. `glass` is frosted panels over an aurora;
 * `solid` is plain white cards with an ordinary shadow on a flat ground.
 */
export type SurfaceVariant = "glass" | "solid";

const SurfaceContext = createContext<SurfaceVariant>("glass");

/** The surface variant of the enclosing `GlassBackdrop`. */
export const useSurface = () => useContext(SurfaceContext);

export interface GlassBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Frosted glass over an aurora, or solid cards with a shadow. */
  variant?: SurfaceVariant;
  /**
   * Three colours washed behind the glass, top-left / top-right / bottom.
   * Any CSS colour. The defaults are violet, sky and peach. Ignored by `solid`.
   */
  aurora?: [string, string, string];
}

export function GlassBackdrop({
  className,
  children,
  variant = "glass",
  aurora = ["#a78bfa", "#7dd3fc", "#fdba74"],
  ...props
}: GlassBackdropProps) {
  return (
    <SurfaceContext.Provider value={variant}>
      <div
        className={cn(
          "relative isolate w-full overflow-hidden bg-[#f5f5f7] text-[#1d1d1f] dark:bg-[#0b0b0f] dark:text-[#f5f5f7]",
          className,
        )}
        {...props}
      >
        {/* The blobs are what the glass blurs. They sit still — the only thing
          that moves on this page is the live marker on the dial. */}
        {variant === "glass" && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <span
              style={{ background: aurora[0] }}
              className="absolute -left-32 -top-32 size-[32rem] rounded-full opacity-80 blur-3xl dark:opacity-35"
            />
            <span
              style={{ background: aurora[1] }}
              className="absolute -right-24 top-16 size-[28rem] rounded-full opacity-80 blur-3xl dark:opacity-35"
            />
            <span
              style={{ background: aurora[2] }}
              className="absolute -bottom-40 left-1/3 size-[32rem] rounded-full opacity-70 blur-3xl dark:opacity-30"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-6 lg:grid-cols-12">
          {children}
        </div>
      </div>
    </SurfaceContext.Provider>
  );
}

// ==========================================
// 2. GLASS PANEL — one recipe, four shapes
// ==========================================
export type GlassShape = "slab" | "tile" | "disc" | "capsule";

const SHAPES: Record<GlassShape, string> = {
  /** Hero-level surface. */
  slab: "rounded-[32px]",
  /** Everyday content tile. */
  tile: "rounded-3xl",
  /** A circle — for a single number or an icon. */
  disc: "aspect-square rounded-full",
  /** Chips, action bars, anything one line tall. */
  capsule: "rounded-full",
};

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: GlassShape;
  /** Lifts on hover and shows a pointer — for panels that open something. */
  interactive?: boolean;
  /** Override the surface set by the enclosing `GlassBackdrop`. */
  variant?: SurfaceVariant;
}

const SURFACES: Record<SurfaceVariant, { base: string; hover: string }> = {
  glass: {
    base:
      "border border-white/70 bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_24px_48px_-28px_rgba(15,23,42,0.35)] backdrop-blur-2xl " +
      "dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_48px_-28px_rgba(0,0,0,0.9)]",
    hover: "hover:bg-white/70 dark:hover:bg-white/[0.09]",
  },
  solid: {
    base:
      "border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-20px_rgba(15,23,42,0.25)] " +
      "dark:border-white/10 dark:bg-[#151518] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_16px_40px_-20px_rgba(0,0,0,0.9)]",
    hover:
      "hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-20px_rgba(15,23,42,0.3)]",
  },
};

export function GlassPanel({
  shape = "tile",
  interactive = false,
  variant,
  className,
  children,
  ...props
}: GlassPanelProps) {
  const inherited = useSurface();
  const surface = SURFACES[variant ?? inherited];
  return (
    <div
      className={cn(
        "relative",
        surface.base,
        SHAPES[shape],
        interactive &&
          cn(
            "cursor-pointer transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
            surface.hover,
          ),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
