"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import React, { forwardRef } from "react";
import { getThemeStyles } from "./progress-theme";

// ==========================================
// VARIANT & COLOR CONFIGURATION
// ==========================================
export type ProgressVariant = "default" | "glass" | "glow" | "minimal";
export type ProgressSize = "sm" | "md" | "lg";
export type ProgressColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "amber"
  | "red"
  | "zinc"
  | (string & {});

/**
 * How the operation is going. `active` is the default and draws the theme
 * colour (or the current stage); the other three override every colour with
 * the conventional semantic hue so state is never ambiguous.
 */
export type ProgressStatus = "active" | "success" | "warning" | "error";

/** A colour that takes over once the bar reaches `from` percent. */
export interface ProgressStage {
  /** Threshold in percent (0–100), inclusive. */
  from: number;
  color: ProgressColor;
}

const STATUS_COLOR: Record<Exclude<ProgressStatus, "active">, ProgressColor> = {
  success: "emerald",
  warning: "amber",
  error: "red",
};

/**
 * The colour to draw right now. `status` wins outright; otherwise the last
 * stage whose threshold has been crossed; otherwise the base colour.
 */
const resolveProgressColor = (
  percentage: number,
  color: ProgressColor,
  stages?: ProgressStage[],
  status: ProgressStatus = "active",
): ProgressColor => {
  if (status !== "active") return STATUS_COLOR[status];
  if (!stages?.length) return color;
  let picked = color;
  for (const stage of [...stages].sort((a, b) => a.from - b.from)) {
    if (percentage >= stage.from) picked = stage.color;
  }
  return picked;
};

/** The readout's colour and glyph per status, shared by field and ring. */
const STATUS_READOUT: Record<
  Exclude<ProgressStatus, "active">,
  { text: string; Icon: React.ElementType }
> = {
  success: { text: "text-emerald-600 dark:text-emerald-400", Icon: CheckCircle2 },
  warning: { text: "text-amber-600 dark:text-amber-400", Icon: AlertTriangle },
  error: { text: "text-red-600 dark:text-red-400", Icon: AlertCircle },
};

/** The hover bubble shared by the bar and the ring. Positioned by the caller. */
function ProgressTooltip({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      role="tooltip"
      className={cn(
        "pointer-events-none absolute bottom-full mb-2 -translate-x-1/2 whitespace-nowrap",
        "rounded-md bg-foreground px-2 py-1 text-[11px] font-semibold tabular-nums text-background shadow-md",
        "opacity-0 translate-y-1 transition-[opacity,transform,left] duration-200 ease-out",
        "group-hover/progress:opacity-100 group-hover/progress:translate-y-0",
        // Caret, pointing down at the element.
        "after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-foreground",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

// Keyframes for the indeterminate bar, injected once alongside the first bar
// that needs them so the block stays self-contained when installed.
const INDETERMINATE_KEYFRAMES = `
@keyframes progress-block-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(260%); }
}`;

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
  /** Colours the readout and adds a glyph: a check on success, an alert on error. */
  status?: ProgressStatus;
  /** One line under the bar — what happened, or what to do next. */
  hint?: React.ReactNode;
}

export const ProgressField = forwardRef<HTMLDivElement, ProgressFieldProps>(
  (
    {
      label,
      value = 0,
      max = 100,
      showValue = true,
      valueFormat,
      status = "active",
      hint,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const readout = status !== "active" ? STATUS_READOUT[status] : null;

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-2 w-full", className)}
        {...props}
      >
        {(label || showValue) && (
          <div className="flex justify-between items-end gap-3 w-full">
            {label && (
              <label className="text-sm font-semibold text-foreground">
                {label}
              </label>
            )}
            {showValue && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-semibold tabular-nums transition-colors",
                  readout ? readout.text : "text-foreground",
                )}
              >
                {readout && <readout.Icon aria-hidden className="w-4 h-4" />}
                {valueFormat
                  ? valueFormat(value, max)
                  : `${Math.round(percentage)}%`}
              </span>
            )}
          </div>
        )}
        {children}
        {hint && (
          <p
            className={cn(
              "text-xs transition-colors",
              readout ? readout.text : "text-muted-foreground",
            )}
          >
            {hint}
          </p>
        )}
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
  /**
   * Colour by threshold. Each stage takes over from its `from` percent until
   * the next one, e.g. neutral to start, the brand colour once under way,
   * green at 100. Overridden by `status`.
   */
  stages?: ProgressStage[];
  /** Semantic override: success, warning or error colour the whole bar. */
  status?: ProgressStatus;
  /** Unknown duration — a bar slides along the track instead of filling it. */
  indeterminate?: boolean;
  /**
   * Hover readout at the fill's leading edge. `true` shows the percentage;
   * a function formats it, e.g. `(v, m) => v + " of " + m + " GB"`.
   */
  tooltip?: boolean | ((value: number, max: number) => React.ReactNode);
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = "default",
      color = "primary",
      barSize = "md",
      stages,
      status = "active",
      indeterminate = false,
      tooltip = false,
      className,
      indicatorClassName,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const activeColor = resolveProgressColor(percentage, color, stages, status);
    const { theme, style } = getThemeStyles(activeColor as string);
    const tooltipContent =
      tooltip && !indeterminate
        ? typeof tooltip === "function"
          ? tooltip(value, max)
          : `${Math.round(percentage)}%`
        : null;

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
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuetext={
          indeterminate
            ? "In progress"
            : status !== "active"
              ? `${Math.round(percentage)}%, ${status}`
              : undefined
        }
        aria-busy={indeterminate || undefined}
        data-status={status}
        className={cn(
          // The track itself does not clip: the fill is width-driven and
          // rounded on its own, and the hover tooltip has to hang above the
          // bar. The inner layer clips the sliding indeterminate bar instead.
          "group/progress relative w-full rounded-full",
          barSizeClasses[barSize],
          trackStyles[variant],
          className,
        )}
        style={style}
        {...props}
      >
        {indeterminate && <style>{INDETERMINATE_KEYFRAMES}</style>}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div
            className={cn(
              // Width-driven so the fill's rounded end is real, and colour
              // transitions alongside width so a stage change cross-fades. The
              // inset highlight is a hairline of light along the top edge —
              // depth without a gradient wash.
              "h-full rounded-full transition-[width,background-color,box-shadow] duration-500 ease-out",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]",
              indicatorStyles[variant],
              indeterminate &&
                "w-2/5 motion-safe:animate-[progress-block-indeterminate_1.4s_cubic-bezier(0.4,0,0.2,1)_infinite] motion-reduce:w-full",
              indicatorClassName,
            )}
            style={indeterminate ? undefined : { width: `${percentage}%` }}
          />
        </div>
        {tooltipContent !== null && (
          // Follows the fill's edge, held just inside the track at both ends
          // so the bubble never hangs off the bar.
          <ProgressTooltip
            style={{ left: `clamp(1.25rem, ${percentage}%, calc(100% - 1.25rem))` }}
          >
            {tooltipContent}
          </ProgressTooltip>
        )}
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
  /** Colour by threshold — see `Progress`. */
  stages?: ProgressStage[];
  /** Semantic override; also colours the centred readout. */
  status?: ProgressStatus;
  /** Hover bubble above the ring — same options as on `Progress`. */
  tooltip?: boolean | ((value: number, max: number) => React.ReactNode);
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
      stages,
      status = "active",
      tooltip = false,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const activeColor = resolveProgressColor(percentage, color, stages, status);
    const { theme, style: themeStyle } = getThemeStyles(activeColor as string);
    const readoutTone = status !== "active" ? STATUS_READOUT[status] : null;
    const tooltipContent = tooltip
      ? typeof tooltip === "function"
        ? tooltip(value, max)
        : `${Math.round(percentage)}%`
      : null;

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
        data-status={status}
        className={cn(
          "group/progress relative inline-flex shrink-0 items-center justify-center",
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
              "transition-[stroke-dashoffset,color] duration-500 ease-out",
              theme.stroke,
              variant === "glow" && theme.ringGlow,
              indicatorClassName,
            )}
          />
        </svg>
        {readout !== null && readout !== false && (
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center text-center font-bold leading-tight tabular-nums transition-colors",
              readoutTone ? readoutTone.text : "text-foreground",
            )}
            style={{ fontSize: Math.max(12, Math.round(circleSize * 0.18)) }}
          >
            {readout}
          </div>
        )}
        {tooltipContent !== null && (
          <ProgressTooltip className="left-1/2">{tooltipContent}</ProgressTooltip>
        )}
      </div>
    );
  },
);
CircularProgress.displayName = "CircularProgress";
