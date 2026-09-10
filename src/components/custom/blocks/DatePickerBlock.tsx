"use client";

import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { getThemeStyles } from "./date-picker-theme";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type DatePickerColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type DatePickerVariant = "default" | "filled" | "underlined" | "glow";
export type DatePickerSize = "sm" | "md" | "lg";

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
      color = "primary",
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

    // containerRef drives the click-outside handler, so the forwarded ref is
    // mirrored onto it rather than replacing it.
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

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
            "opacity-50 cursor-not-allowed border border-border bg-muted",
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
              "bg-muted border border-transparent rounded-xl",
            ),
            active: cn("bg-background ring-4", theme.ring),
          };
        case "underlined":
          return {
            wrapper: cn(
              baseWrapper,
              "border-b-2 border-border bg-transparent rounded-none px-0",
            ),
            active: theme.ring.split(" ")[1],
          };
        case "glow":
          return {
            wrapper: cn(
              baseWrapper,
              "bg-white dark:bg-[#09090b] border border-border rounded-xl shadow-sm",
            ),
            active: theme.glow,
          };
        case "default":
        default:
          return {
            wrapper: cn(
              baseWrapper,
              "bg-white dark:bg-[#09090b] border border-border rounded-xl shadow-sm",
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
              hasError ? "text-red-500" : "text-foreground",
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
                "shrink-0 text-muted-foreground",
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
                  : "text-foreground",
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
            "absolute left-0 z-50 overflow-hidden bg-background border border-border rounded-xl shadow-xl transition-all duration-200 ease-out origin-top w-72",
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
                className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="text-sm font-bold text-foreground">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </div>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_NAMES.map((day) => (
                <div
                  key={day}
                  className="text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
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
                              "font-bold bg-muted",
                              theme.text,
                            )
                          : "text-foreground font-medium hover:bg-muted",
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
          <p className="text-xs font-medium text-muted-foreground mt-0.5">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
DatePickerBlock.displayName = "DatePickerBlock";
