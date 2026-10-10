"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
  LiquidGlassSvgFilter,
  LiquidGlassWrapper,
  formatRadius,
} from "@/components/custom/ui/liquid-glass";
import { SurfaceContext, useSurface, type SurfaceVariant } from "./glass-panel-context";

// The surface context and its hook, `useSurface`, live in glass-panel-context.ts.
export type { SurfaceVariant };

// ==========================================
// 1. GLASS BACKDROP — aurora ground + bento grid
// ==========================================
// The surface the panels sit on. Profile Page, Book Appointment and Booking
// Card all build on this pair; it has no opinion about what the page is.

export interface GlassBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Frosted glass over an aurora, solid cards with a shadow, or liquid-glass refraction. */
  variant?: SurfaceVariant;
  /**
   * Three colours washed behind the glass, top-left / top-right / bottom.
   * Any CSS colour. The defaults are violet, sky and peach. Ignored by `solid`.
   */
  aurora?: [string, string, string];
  /** Optional custom background image URL for liquid-glass variant. */
  bgImage?: string;
  /** Classes for the inner grid — row heights, gaps, a max width. */
  gridClassName?: string;
  /** Classes for the inner LiquidGlassWrapper — controls width ratio on large screens. */
  wrapperClassName?: string;
  /** Dynamic rounding radius for the wrapper/backdrop. Can be a string ("1.5rem", "var(--radius-3xl)") or number (px). */
  radius?: string | number;
}

export function GlassBackdrop({
  className,
  gridClassName,
  wrapperClassName,
  radius,
  children,
  variant = "glass",
  aurora = ["#a78bfa", "#7dd3fc", "#fdba74"],
  bgImage,
  ...props
}: GlassBackdropProps) {
  if (variant === "liquid-glass") {
    const liquidBg =
      bgImage ||
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg";
    const filterId = "glass-blur-profile";

    return (
      <SurfaceContext.Provider value={variant}>
        <div
          className={cn(
            "relative isolate w-full h-full min-h-[520px] flex flex-col justify-center overflow-hidden rounded-[var(--radius-3xl,2rem)] border border-white/10 text-white p-3 sm:p-6",
            className,
          )}
          {...props}
        >
          {/* Full-bleed background image - spans 100% width and height of outer container, completely unwrapped */}
          <LiquidGlassSvgFilter id={filterId} bgImage={liquidBg} />
          <img
            src={liquidBg}
            alt=""
            aria-hidden="true"
            style={radius ? { borderRadius: formatRadius(radius) } : undefined}
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0 rounded-[inherit]"
          />

          {/* LiquidGlassWrapper wraps ONLY the component grid area */}
          <LiquidGlassWrapper
            radius={radius ?? "var(--radius-3xl, 1.75rem)"}
            bgImage={liquidBg}
            filterId={filterId}
            contrastOverlayClassName="bg-black/15 backdrop-blur-[1px]"
            className={cn(
              "relative z-10 w-full lg:w-[40%] lg:max-w-[40%] mx-auto text-white transition-all duration-300 p-1 sm:p-2 [--foreground:#ffffff] [--muted-foreground:rgba(255,255,255,0.85)]",
              wrapperClassName,
            )}
          >
            <div
              className={cn(
                "grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12 text-white",
                gridClassName,
              )}
            >
              {children}
            </div>
          </LiquidGlassWrapper>
        </div>
      </SurfaceContext.Provider>
    );
  }

  return (
    <SurfaceContext.Provider value={variant}>
      <div
        className={cn(
          "relative isolate w-full overflow-hidden bg-background text-foreground",
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

        <div className={cn("grid grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-6 lg:grid-cols-12", gridClassName)}>
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
  slab: "rounded-[var(--radius-3xl,2rem)]",
  /** Everyday content tile. */
  tile: "rounded-[var(--radius-2xl,1.5rem)]",
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
  /** Optional custom rounding radius override. */
  radius?: string | number;
}

const SURFACES: Record<SurfaceVariant, { base: string; hover: string }> = {
  glass: {
    base:
      "border border-card/70 bg-card/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_24px_48px_-28px_rgba(15,23,42,0.35)] backdrop-blur-2xl " +
      "dark:border-foreground/10 dark:bg-foreground/[0.06] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_48px_-28px_rgba(0,0,0,0.9)]",
    hover: "hover:bg-card/70 dark:hover:bg-foreground/[0.09]",
  },
  solid: {
    base:
      "border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-20px_rgba(15,23,42,0.25)] " +
      "dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_16px_40px_-20px_rgba(0,0,0,0.9)]",
    hover:
      "hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-20px_rgba(15,23,42,0.3)]",
  },
  "liquid-glass": {
    base:
      "border border-white/35 bg-white/15 text-white shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.5)]",
    hover: "hover:bg-white/25 hover:border-white/50",
  },
};

export function GlassPanel({
  shape = "tile",
  interactive = false,
  variant,
  radius,
  className,
  style,
  children,
  ...props
}: GlassPanelProps) {
  const inherited = useSurface();
  const surface = SURFACES[variant ?? inherited];
  const formattedRadius = formatRadius(radius);
  return (
    <div
      style={formattedRadius ? { borderRadius: formattedRadius, ...style } : style}
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
