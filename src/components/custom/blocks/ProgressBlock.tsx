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
  },
  indigo: {
    bg: "bg-indigo-600",
    bgSoft: "bg-indigo-500/20",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.5)]",
  },
  rose: {
    bg: "bg-rose-600",
    bgSoft: "bg-rose-500/20",
    glow: "shadow-[0_0_15px_rgba(244,63,94,0.5)]",
  },
  emerald: {
    bg: "bg-emerald-600",
    bgSoft: "bg-emerald-500/20",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]",
  },
  zinc: {
    bg: "bg-zinc-900 dark:bg-zinc-100",
    bgSoft: "bg-zinc-500/20",
    glow: "shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)]",
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

    const sizeClasses = {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4",
    };

    const variantStyles = {
      default: {
        track: "bg-muted border-none",
        indicator: theme.bg,
      },
      glass: {
        track:
          "bg-white/20 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-inner",
        indicator: cn(theme.bg, "backdrop-blur-xl"),
      },
      glow: {
        track: "bg-muted border-none",
        indicator: cn(theme.bg, theme.glow),
      },
      minimal: {
        track: "bg-transparent border border-border",
        indicator: theme.bg,
      },
    };

    const currentVariant = variantStyles[variant];

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(
          "relative w-full overflow-hidden rounded-full",
          sizeClasses[barSize],
          currentVariant.track,
          className,
        )}
        style={style}
        {...props}
      >
        <div
          className={cn(
            "h-full w-full flex-1 transition-all duration-500 ease-out rounded-full",
            currentVariant.indicator,
            indicatorClassName,
          )}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    );
  },
);
Progress.displayName = "Progress";
