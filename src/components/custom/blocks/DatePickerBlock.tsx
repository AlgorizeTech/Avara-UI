"use client";

import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { forwardRef, useEffect, useRef, useState } from "react";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type DatePickerColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type DatePickerVariant = "default" | "filled" | "underlined" | "glow";
export type DatePickerSize = "sm" | "md" | "lg";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: {
    ring: "focus-within:ring-indigo-500/30 focus-within:border-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 text-white hover:bg-indigo-700",
    bgSoft:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-900 dark:text-indigo-100 hover:bg-indigo-100 dark:hover:bg-indigo-500/20",
    glow: "focus-within:shadow-[0_0_20px_rgba(99,102,241,0.4)] focus-within:border-indigo-500",
  },
  rose: {
    ring: "focus-within:ring-rose-500/30 focus-within:border-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 text-white hover:bg-rose-700",
    bgSoft:
      "bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-100 hover:bg-rose-100 dark:hover:bg-rose-500/20",
    glow: "focus-within:shadow-[0_0_20px_rgba(244,63,94,0.4)] focus-within:border-rose-500",
  },
  emerald: {
    ring: "focus-within:ring-emerald-500/30 focus-within:border-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 text-white hover:bg-emerald-700",
    bgSoft:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100 dark:hover:bg-emerald-500/20",
    glow: "focus-within:shadow-[0_0_20px_rgba(16,185,129,0.4)] focus-within:border-emerald-500",
  },
  zinc: {
    ring: "focus-within:ring-zinc-500/30 focus-within:border-zinc-500 dark:focus-within:ring-white/20 dark:focus-within:border-white",
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200",
    bgSoft:
      "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800",
    glow: "focus-within:shadow-[0_0_20px_rgba(255,255,255,0.15)] focus-within:border-zinc-900 dark:focus-within:border-white",
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
        ring: "focus-within:ring-[var(--theme-color)]/30 focus-within:border-[var(--theme-color)]",
        text: "text-[var(--theme-color)]",
        bg: "bg-[var(--theme-color)] text-white hover:opacity-90",
        bgSoft:
          "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)] hover:bg-[rgba(var(--theme-color-rgb),0.2)]",
        glow: "focus-within:shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.5)] focus-within:border-[var(--theme-color)]",
      },
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

// ==========================================
// CALENDAR MATH HELPERS
// ==========================================
const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1).getDay();
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// ==========================================
// DATEPICKER COMPONENT
// ==========================================
export interface DatePickerBlockProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  placeholder?: string;
  variant?: DatePickerVariant;
  color?: DatePickerColor;
  inputSize?: DatePickerSize;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const DatePickerBlock = forwardRef<HTMLDivElement, DatePickerBlockProps>(
  (
    {
      value,
      onChange,
      placeholder = "Pick a date",
      variant = "default",
      color = "indigo",
      inputSize = "md",
      label,
      helperText,
      error,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(value || new Date());
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme, style } = getThemeStyles(color);

    const hasError = Boolean(error);

    // Close on click outside
    useEffect(() => {
      // Resolve the document the picker actually lives in (supports iframe rendering).
      const doc = containerRef.current?.ownerDocument ?? document;
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      doc.addEventListener("mousedown", handleClickOutside);
      return () => doc.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Sync view date with value when opened
    useEffect(() => {
      if (isOpen && value) {
        setViewDate(value);
      }
    }, [isOpen, value]);

    // --- Calendar Generation ---
    const currentMonth = viewDate.getMonth();
    const currentYear = viewDate.getFullYear();
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

    const handlePrevMonth = (e: React.MouseEvent) => {
      e.stopPropagation();
      setViewDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = (e: React.MouseEvent) => {
      e.stopPropagation();
      setViewDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const handleSelectDate = (day: number, e: React.MouseEvent) => {
      e.stopPropagation();
      const newDate = new Date(currentYear, currentMonth, day);
      if (onChange) onChange(newDate);
      setIsOpen(false);
    };

    // --- Formatting ---
    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
    };

    const isSameDay = (d1: Date, d2: Date) => {
      return (
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear()
      );
    };

    const today = new Date();

    // --- Size Classes ---
    const sizeClasses = {
      sm: {
        wrapper: "min-h-9 px-3 py-1.5",
        text: "text-xs",
        icon: "w-3.5 h-3.5",
      },
      md: { wrapper: "min-h-11 px-4 py-2.5", text: "text-sm", icon: "w-4 h-4" },
      lg: {
        wrapper: "min-h-14 px-5 py-3.5",
        text: "text-base",
        icon: "w-5 h-5",
      },
    };
    const s = sizeClasses[inputSize];

    // --- Variant Styles ---
    const getVariantStyles = () => {
      const baseWrapper = cn(
        "relative flex items-center justify-between w-full transition-all duration-300 cursor-pointer outline-none",
        s.wrapper,
      );

      if (disabled)
        return {
          wrapper: cn(
            baseWrapper,
            "opacity-50 cursor-not-allowed border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50",
          ),
          active: "",
        };
      if (hasError)
        return {
          wrapper: cn(
            baseWrapper,
            "border border-red-500 bg-white dark:bg-[#09090b]",
            variant === "underlined" && "border-0 border-b-2 rounded-none",
            variant !== "underlined" && "rounded-xl",
          ),
          active: "ring-4 ring-red-500/10",
        };

      switch (variant) {
        case "filled":
          return {
            wrapper: cn(
              baseWrapper,
              "bg-zinc-100 dark:bg-zinc-900 border border-transparent rounded-xl",
            ),
            active: cn("bg-white dark:bg-zinc-950 ring-4", theme.ring),
          };
        case "underlined":
          return {
            wrapper: cn(
              baseWrapper,
              "border-b-2 border-zinc-200 dark:border-zinc-800 bg-transparent rounded-none px-0",
            ),
            active: theme.ring.split(" ")[1],
          };
        case "glow":
          return {
            wrapper: cn(
              baseWrapper,
              "bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm",
            ),
            active: theme.glow,
          };
        case "default":
        default:
          return {
            wrapper: cn(
              baseWrapper,
              "bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm",
            ),
            active: cn("ring-4", theme.ring),
          };
      }
    };

    const styles = getVariantStyles();

    return (
      <div
        ref={containerRef}
        className={cn("flex flex-col gap-1.5 w-full relative", className)}
        style={style}
      >
        {/* Label */}
        {label && (
          <label
            className={cn(
              "text-sm font-bold",
              hasError ? "text-red-500" : "text-zinc-700 dark:text-zinc-300",
              disabled && "opacity-50",
            )}
          >
            {label}
          </label>
        )}

        {/* Trigger Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(styles.wrapper, isOpen && styles.active)}
        >
          <div className="flex items-center gap-2 overflow-hidden w-full">
            <div
              className={cn(
                "shrink-0 text-zinc-400 dark:text-zinc-500",
                isOpen && theme.text,
              )}
            >
              <CalendarIcon className={s.icon} />
            </div>
            <span
              className={cn(
                "truncate",
                s.text,
                !value
                  ? "text-zinc-400 dark:text-zinc-600"
                  : "text-zinc-900 dark:text-zinc-100",
              )}
            >
              {value ? formatDate(value) : placeholder}
            </span>
          </div>

          <div className="absolute right-4 flex items-center gap-2 shrink-0 bg-transparent">
            {hasError && <AlertCircle className={cn(s.icon, "text-red-500")} />}
          </div>
        </button>

        {/* Calendar Popover */}
        <div
          className={cn(
            "absolute left-0 z-50 overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl transition-all duration-200 ease-out origin-top w-72",
            variant === "underlined" ? "top-[100%]" : "top-[calc(100%+8px)]",
            isOpen
              ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none",
          )}
        >
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="text-sm font-bold text-zinc-900 dark:text-white">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </div>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_NAMES.map((day) => (
                <div
                  key={day}
                  className="text-center text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty slots for start of month */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="w-8 h-8" />
              ))}

              {/* Actual Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const thisDate = new Date(currentYear, currentMonth, day);
                const isSelected = value && isSameDay(thisDate, value);
                const isToday = isSameDay(thisDate, today);

                return (
                  <button
                    key={day}
                    onClick={(e) => handleSelectDate(day, e)}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-200 cursor-pointer mx-auto",
                      isSelected
                        ? cn(theme.bg, "font-bold shadow-sm scale-110")
                        : isToday
                          ? cn(
                              "font-bold bg-zinc-100 dark:bg-zinc-800",
                              theme.text,
                            )
                          : "text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800",
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Helper & Error Text */}
        {error && (
          <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-0.5">
            <AlertCircle className="w-3.5 h-3.5" /> {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
DatePickerBlock.displayName = "DatePickerBlock";
