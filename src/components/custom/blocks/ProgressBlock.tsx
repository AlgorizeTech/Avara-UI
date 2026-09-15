"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import React, { forwardRef, useEffect, useRef, useState } from "react";
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

// ==========================================
// COUNT-UP ANIMATION
// ==========================================

/** One easing for the fill and the readout, so they can never drift apart. */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

/** Decimal places in `n`, so a tweened value can be shown at the caller's precision. */
const decimalsOf = (n: number) => {
  if (!Number.isFinite(n) || Number.isInteger(n)) return 0;
  const text = String(n);
  const dot = text.indexOf(".");
  return dot < 0 ? 0 : Math.min(text.length - dot - 1, 6);
};

const roundTo = (n: number, decimals: number) => {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
};

export interface CountUpOptions {
  /** Length of the first run, from zero, in ms. Default 1200. */
  duration?: number;
  /** `false` returns `target` untouched. */
  enabled?: boolean;
  /**
   * The scale later changes are measured against (the bar's `max`). A change
   * across the whole range takes `duration`; a 1% tick takes a sliver of it.
   */
  range?: number;
}

/**
 * Tweens a number towards `target`. It starts at 0 on mount — so the bar
 * fills and the readout counts up when it first appears — then follows every
 * later change from wherever it currently is, so a stream of small updates
 * never jumps. The mount run always takes the full `duration`; later runs
 * take a slice proportional to how far they travel, floored so a tiny nudge
 * still visibly moves. Under `prefers-reduced-motion` it returns `target`.
 */
export function useCountUp(
  target: number,
  { duration = 1200, enabled = true, range }: CountUpOptions = {},
): number {
  const [current, setCurrent] = useState(enabled ? 0 : target);
  const currentRef = useRef(current);
  // Flipped by the first frame that actually moves, not by the effect — a
  // run that is cancelled before it paints (strict mode) is not a mount run.
  const movedRef = useRef(false);

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) {
      currentRef.current = target;
      setCurrent(target);
      return;
    }
    const from = currentRef.current;
    const delta = target - from;
    if (delta === 0) return;

    const scale = Math.max(Math.abs(range ?? target), Math.abs(from), 1);
    const ms = movedRef.current
      ? Math.max(160, duration * Math.min(1, Math.abs(delta) / scale))
      : duration;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const next = t >= 1 ? target : from + delta * easeOutCubic(t);
      currentRef.current = next;
      movedRef.current = true;
      setCurrent(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, enabled, range]);

  return enabled ? current : target;
}

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
  /** Count the readout up from zero on mount and tween every later change. */
  animate?: boolean;
  /** Length of the mount count-up in ms. Match the bar's `duration`. */
  duration?: number;
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
      animate = true,
      duration = 1200,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // The readout follows the same tween as the bar underneath, rounded back
    // to the precision the caller passed so "12 GB" never becomes "11.7 GB".
    const shown = useCountUp(value, { duration, enabled: animate, range: max });
    const shownValue = roundTo(shown, decimalsOf(value));
    const percentage = Math.min(Math.max((shown / max) * 100, 0), 100);
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
                  ? valueFormat(shownValue, max)
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
  /**
   * Fill from zero on mount and tween every later change of `value`, so the
   * bar is never seen jumping. Stage colours are crossed on the way up.
   */
  animate?: boolean;
  /** Length of the mount fill in ms; later changes take a proportional slice. */
  duration?: number;
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
      animate = true,
      duration = 1200,
      className,
      indicatorClassName,
      ...props
    },
    ref,
  ) => {
    // Everything visual — width, stage colour, the tooltip — reads the tweened
    // value; the ARIA attributes below report the real one.
    const shown = useCountUp(value, {
      duration,
      enabled: animate && !indeterminate,
      range: max,
    });
    const percentage = Math.min(Math.max((shown / max) * 100, 0), 100);
    const activeColor = resolveProgressColor(percentage, color, stages, status);
    const { theme, style } = getThemeStyles(activeColor as string);
    const tooltipContent =
      tooltip && !indeterminate
        ? typeof tooltip === "function"
          ? tooltip(roundTo(shown, decimalsOf(value)), max)
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
              // transitions alongside so a stage change cross-fades. When the
              // tween drives the width there is nothing for CSS to smooth —
              // and a transition on top would only lag behind it. The inset
              // highlight is a hairline of light along the top edge — depth
              // without a gradient wash.
              "h-full rounded-full duration-500 ease-out",
              animate
                ? "transition-[background-color,box-shadow]"
                : "transition-[width,background-color,box-shadow]",
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
  animate: boolean;
  duration: number;
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
  /** Grow every segment from zero on mount and tween later changes. */
  animate?: boolean;
  /** Length of the mount fill in ms, shared by all segments. */
  duration?: number;
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
      animate = true,
      duration = 1200,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => (
    <MultiProgressContext.Provider value={{ max, gap, animate, duration }}>
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
    const { max, gap, animate, duration } = useMultiProgress();
    const { theme, style: themeStyle } = getThemeStyles(color as string);
    // Every segment runs the same tween on the same clock, so the whole
    // breakdown grows in proportion rather than slice by slice.
    const shown = useCountUp(value, { duration, enabled: animate, range: max });
    const percentage = Math.min(Math.max((shown / max) * 100, 0), 100);

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
          "h-full duration-500 ease-out",
          animate ? "transition-colors" : "transition-all",
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
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
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
  /** Sweep the arc from zero on mount and tween every later change. */
  animate?: boolean;
  /** Length of the mount sweep in ms; later changes take a proportional slice. */
  duration?: number;
  /**
   * Replaces the centred readout. Pass a function to receive the value as it
   * counts up, so a custom centre animates in step with the arc.
   */
  children?:
    | React.ReactNode
    | ((value: number, max: number) => React.ReactNode);
}

/**
 * The same value, drawn as a ring. Children replace the centred readout, so
 * the middle can hold an icon, a count, or a label instead of a percentage —
 * as a render function, they get the counting value to draw themselves.
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
      animate = true,
      duration = 1200,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    // Arc, readout and tooltip all read the tweened value; ARIA the real one.
    const shown = useCountUp(value, { duration, enabled: animate, range: max });
    const shownValue = roundTo(shown, decimalsOf(value));
    const percentage = Math.min(Math.max((shown / max) * 100, 0), 100);
    const activeColor = resolveProgressColor(percentage, color, stages, status);
    const { theme, style: themeStyle } = getThemeStyles(activeColor as string);
    const readoutTone = status !== "active" ? STATUS_READOUT[status] : null;
    const tooltipContent = tooltip
      ? typeof tooltip === "function"
        ? tooltip(shownValue, max)
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

    const readout =
      typeof children === "function"
        ? children(shownValue, max)
        : (children ??
          (showValue
            ? valueFormat
              ? valueFormat(shownValue, max)
              : `${Math.round(percentage)}%`
            : null));

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
              "duration-500 ease-out",
              animate ? "transition-colors" : "transition-[stroke-dashoffset,color]",
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
