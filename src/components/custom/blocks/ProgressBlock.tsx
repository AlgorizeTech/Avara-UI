"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

// ==========================================
// VARIANT & COLOR CONFIGURATION
// ==========================================
export type ProgressVariant = "default" | "glass" | "glow" | "minimal";
export type ProgressSize = "sm" | "md" | "lg";
export type ProgressColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary",
    bgSoft: "bg-primary/20",
    glow: "shadow-[0_0_15px_var(--primary)]",
    // `stroke` and `ringGlow` are the SVG equivalents of `bg` and `glow`, used
    // by CircularProgress — an SVG arc takes a stroke colour, not a background.
    stroke: "text-primary",
    ringGlow: "drop-shadow-[0_0_6px_var(--primary)]",
  },
  indigo: {
    bg: "bg-indigo-600",
    bgSoft: "bg-indigo-500/20",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.5)]",
    stroke: "text-indigo-600",
    ringGlow: "drop-shadow-[0_0_6px_rgba(99,102,241,0.7)]",
  },
  rose: {
    bg: "bg-rose-600",
    bgSoft: "bg-rose-500/20",
    glow: "shadow-[0_0_15px_rgba(244,63,94,0.5)]",
    stroke: "text-rose-600",
    ringGlow: "drop-shadow-[0_0_6px_rgba(244,63,94,0.7)]",
  },
  emerald: {
    bg: "bg-emerald-600",
    bgSoft: "bg-emerald-500/20",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]",
    stroke: "text-emerald-600",
    ringGlow: "drop-shadow-[0_0_6px_rgba(16,185,129,0.7)]",
  },
  zinc: {
    bg: "bg-zinc-900 dark:bg-zinc-100",
    bgSoft: "bg-zinc-500/20",
    glow: "shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)]",
    stroke: "text-zinc-900 dark:text-zinc-100",
    ringGlow: "drop-shadow-[0_0_6px_rgba(161,161,170,0.7)]",
  },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        bg: "bg-[var(--progress-custom)]",
        bgSoft: "bg-[var(--progress-custom-20)]",
        glow: "shadow-[0_0_15px_var(--progress-custom-50)]",
        stroke: "text-[var(--progress-custom)]",
        ringGlow: "drop-shadow-[0_0_6px_var(--progress-custom-50)]",
      },
      style: {
        "--progress-custom": color,
        "--progress-custom-20": `rgba(${rgb}, 0.2)`,
        "--progress-custom-50": `rgba(${rgb}, 0.5)`,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

// ==========================================
// SHARED TRACK GEOMETRY
// ==========================================

/** Bar height per size step. Shared by Progress and MultiProgress. */
const barSizeClasses: Record<ProgressSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

/** Ring thickness in px per size step, so the circle reads at the same weight. */
const ringSizePx: Record<ProgressSize, number> = {
  sm: 5,
  md: 9,
  lg: 14,
};

/**
 * Extra room given to the <svg> canvas for the glow variant's halo.
 *
 * An <svg> clips its own children (`overflow: hidden` in the UA stylesheet), so
 * a glow whose blur reaches the boundary gets sliced flat — measured, a 6px
 * drop-shadow paints ~11.4px past the stroke. Rather than shrink the ring to
 * fit, the canvas is grown by this much and offset back into place, so the ring
 * keeps its full `circleSize` and the halo spills past the box like a
 * box-shadow. Only the glow variant pays for it.
 */
const GLOW_BLEED = 14;

/** The unfilled track, per variant. The fill is theme-coloured separately. */
const trackStyles: Record<ProgressVariant, string> = {
  default: "bg-muted border-none",
  glass:
    "bg-white/20 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-inner",
  glow: "bg-muted border-none",
  minimal: "bg-transparent border border-border",
};

// ==========================================
// PROGRESS FIELD WRAPPER
// ==========================================
export interface ProgressFieldProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  value?: number;
  max?: number;
  showValue?: boolean;
  valueFormat?: (value: number, max: number) => React.ReactNode;
}

export const ProgressField = forwardRef<HTMLDivElement, ProgressFieldProps>(
  (
    {
      label,
      value = 0,
      max = 100,
      showValue = true,
      valueFormat,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-2 w-full", className)}
        {...props}
      >
        {(label || showValue) && (
          <div className="flex justify-between items-end w-full">
            {label && (
              <label className="text-sm font-bold text-foreground">
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-sm font-bold text-foreground">
                {valueFormat
                  ? valueFormat(value, max)
                  : `${Math.round(percentage)}%`}
              </span>
            )}
          </div>
        )}
        {children}
      </div>
    );
  },
);
ProgressField.displayName = "ProgressField";

// ==========================================
// PROGRESS BAR COMPONENT
// ==========================================
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  color?: ProgressColor;
  barSize?: ProgressSize;
  indicatorClassName?: string;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = "default",
      color = "primary",
      barSize = "md",
      className,
      indicatorClassName,
      ...props
    },
    ref,
  ) => {
    const { theme, style } = getThemeStyles(color as string);
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const indicatorStyles: Record<ProgressVariant, string> = {
      default: theme.bg,
      glass: cn(theme.bg, "backdrop-blur-xl"),
      glow: cn(theme.bg, theme.glow),
      minimal: theme.bg,
    };

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(
          "relative w-full overflow-hidden rounded-full",
          barSizeClasses[barSize],
          trackStyles[variant],
          className,
        )}
        style={style}
        {...props}
      >
        <div
          className={cn(
            "h-full w-full flex-1 transition-all duration-500 ease-out rounded-full",
            indicatorStyles[variant],
            indicatorClassName,
          )}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    );
  },
);
Progress.displayName = "Progress";

// ==========================================
// MULTI (STACKED) PROGRESS
// ==========================================

interface MultiProgressContextValue {
  max: number;
  gap: number;
}

const MultiProgressContext =
  React.createContext<MultiProgressContextValue | null>(null);

const useMultiProgress = () => {
  const context = React.useContext(MultiProgressContext);
  if (!context)
    throw new Error(
      "<ProgressSegment /> must be rendered inside a <MultiProgress />.",
    );
  return context;
};

export interface MultiProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shared denominator. Every segment's value is measured against this. */
  max?: number;
  variant?: ProgressVariant;
  barSize?: ProgressSize;
  /** Pixels between segments. 0 fuses them into one continuous bar. */
  gap?: number;
}

/**
 * A single track holding several values at once — storage by file type, a
 * budget split across categories, votes across options.
 *
 * Segments are children rather than a `segments` array, so whatever shape your
 * data already has can be mapped straight into JSX without reshaping it first.
 */
export const MultiProgress = forwardRef<HTMLDivElement, MultiProgressProps>(
  (
    {
      max = 100,
      variant = "default",
      barSize = "md",
      gap = 0,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => (
    <MultiProgressContext.Provider value={{ max, gap }}>
      <div
        ref={ref}
        role="group"
        className={cn(
          "relative flex w-full overflow-hidden rounded-full",
          barSizeClasses[barSize],
          trackStyles[variant],
          className,
        )}
        style={{ gap: gap ? `${gap}px` : undefined, ...style }}
        {...props}
      >
        {children}
      </div>
    </MultiProgressContext.Provider>
  ),
);
MultiProgress.displayName = "MultiProgress";

export interface ProgressSegmentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  /** Named theme or a hex code — each segment carries its own colour. */
  color?: ProgressColor;
  /** Accessible name for the slice, and its native hover tooltip. */
  label?: string;
}

export const ProgressSegment = forwardRef<HTMLDivElement, ProgressSegmentProps>(
  ({ value = 0, color = "primary", label, className, style, ...props }, ref) => {
    const { max, gap } = useMultiProgress();
    const { theme, style: themeStyle } = getThemeStyles(color as string);
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={label}
        title={label}
        className={cn(
          "h-full transition-all duration-500 ease-out",
          // Rounded ends only make sense once the segments are pulled apart.
          gap > 0 && "rounded-full",
          theme.bg,
          className,
        )}
        style={{ width: `${percentage}%`, ...themeStyle, ...style }}
        {...props}
      />
    );
  },
);
ProgressSegment.displayName = "ProgressSegment";

// ==========================================
// CIRCULAR (ROUND) PROGRESS
// ==========================================

export interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  color?: ProgressColor;
  /** Ring thickness, on the same sm | md | lg scale as the bar. */
  barSize?: ProgressSize;
  /** Outer diameter of the ring in pixels. A glow halo fades out past it. */
  circleSize?: number;
  /** Draws the percentage in the middle. Ignored when children are supplied. */
  showValue?: boolean;
  valueFormat?: (value: number, max: number) => React.ReactNode;
  /** Classes for the unfilled ring underneath. */
  trackClassName?: string;
  /** Classes for the filled arc. */
  indicatorClassName?: string;
}

/**
 * The same value, drawn as a ring. Children replace the centred readout, so
 * the middle can hold an icon, a count, or a label instead of a percentage.
 */
export const CircularProgress = forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(
  (
    {
      value = 0,
      max = 100,
      variant = "default",
      color = "primary",
      barSize = "md",
      circleSize = 120,
      showValue = true,
      valueFormat,
      className,
      trackClassName,
      indicatorClassName,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const { theme, style: themeStyle } = getThemeStyles(color as string);
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Geometry: inset the radius by half the stroke so the ring's outer edge
    // lands exactly on the box, then walk the dash offset from a full
    // circumference down to 0. The canvas is grown past the box only when a
    // glow needs somewhere to fade out into.
    const thickness = ringSizePx[barSize];
    const radius = Math.max((circleSize - thickness) / 2, 1);
    const circumference = 2 * Math.PI * radius;
    const bleed = variant === "glow" ? GLOW_BLEED : 0;
    const canvas = circleSize + bleed * 2;
    const center = canvas / 2;

    const trackStroke: Record<ProgressVariant, string> = {
      default: "text-muted",
      glass: "text-white/40 dark:text-white/10",
      glow: "text-muted",
      minimal: "text-border",
    };

    const readout = children ?? (showValue
      ? valueFormat
        ? valueFormat(value, max)
        : `${Math.round(percentage)}%`
      : null);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center",
          variant === "glass" && "rounded-full backdrop-blur-md",
          className,
        )}
        style={{
          width: circleSize,
          height: circleSize,
          ...themeStyle,
          ...style,
        }}
        {...props}
      >
        <svg
          width={canvas}
          height={canvas}
          viewBox={`0 0 ${canvas} ${canvas}`}
          // Pulled back by the bleed so the ring stays centred on the box.
          className="absolute max-w-none -rotate-90"
          style={{ left: -bleed, top: -bleed }}
          aria-hidden="true"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={thickness}
            className={cn(trackStroke[variant], trackClassName)}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - percentage / 100)}
            className={cn(
              "transition-[stroke-dashoffset] duration-500 ease-out",
              theme.stroke,
              variant === "glow" && theme.ringGlow,
              indicatorClassName,
            )}
          />
        </svg>
        {readout !== null && readout !== false && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center font-bold leading-tight text-foreground"
            style={{ fontSize: Math.max(12, Math.round(circleSize * 0.18)) }}
          >
            {readout}
          </div>
        )}
      </div>
    );
  },
);
CircularProgress.displayName = "CircularProgress";
