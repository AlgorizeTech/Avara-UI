"use client";

import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { getThemeStyles } from "./date-picker-theme";
import {
  formatTime,
  roundToStep,
  setTime,
  type TimeFormat,
  TimePicker,
} from "./TimePickerBlock";

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

/**
 * Popover widths: the calendar alone (18rem) and the calendar with the time
 * rail unfolded beside it (30rem). The 12rem difference is exactly the rail
 * plus its gutter, so the calendar grid keeps its size while the rail opens.
 */
const POPOVER_PX = 288;
const WIDE_POPOVER_PX = 480;

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
const isSameDay = (d1: Date, d2: Date) =>
  d1.getDate() === d2.getDate() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getFullYear() === d2.getFullYear();

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
  /** Greys out every day before today so it cannot be picked. */
  disablePast?: boolean;
  /** Earliest selectable day (inclusive). Combine with `disablePast` freely — the later bound wins. */
  minDate?: Date;
  /** Latest selectable day (inclusive). */
  maxDate?: Date;
  /**
   * Adds hour / minute (and AM-PM) columns. The popover opens on the calendar
   * alone and unfolds the columns — beside it when there is room, below it
   * otherwise — as soon as a day is picked, staying open until Done. `value`
   * then carries the time as well as the day.
   */
  showTime?: boolean;
  /** 12-hour clock with AM / PM, or 24-hour. Default "12h". */
  timeFormat?: TimeFormat;
  /** Minute granularity of the time columns. Default 5. */
  minuteStep?: number;
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
      disablePast = false,
      minDate,
      maxDate,
      showTime = false,
      timeFormat = "12h",
      minuteStep = 5,
      className,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(value || new Date());
    // The time a freshly picked day receives — "now" rounded up to the step.
    // The columns only exist once a day is chosen, so this seeds that first
    // pick rather than being something the user edits beforehand.
    const [pendingTime, setPendingTime] = useState(() => roundToStep(new Date(), minuteStep));
    // With time columns the popover can go wide and put them to the right of
    // the calendar — but only when the viewport has room for that width, so it
    // never runs off-screen in a narrow column or on a phone. `alignRight`
    // flips the popover to hang from the trigger's right edge when that is the
    // side with space.
    const [sideLayout, setSideLayout] = useState(false);
    const [alignRight, setAlignRight] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme, style } = getThemeStyles(color);

    // containerRef drives the click-outside handler, so the forwarded ref is
    // mirrored onto it rather than replacing it.
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    const hasError = Boolean(error);

    const reduceMotion = useReducedMotion();
    // The time panel is absent until a day lands: the popover opens on the
    // calendar alone, unfolds on the first pick, and folds away again if the
    // date is cleared. Mirrors `railOpen` in RangeDatePicker.
    const railOpen = showTime && Boolean(value);

    // Same curves as RangeDatePicker so both pickers unfold identically.
    const unfold = reduceMotion
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 240, damping: 30, mass: 0.9 };
    const settle = reduceMotion
      ? { duration: 0 }
      : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

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

    // Measure the room on either side of the trigger whenever the popover opens
    // or the window resizes, and pick the widest layout that fits on-screen.
    useEffect(() => {
      if (!isOpen) return;
      const el = containerRef.current;
      if (!el) return;
      const win = el.ownerDocument.defaultView ?? window;
      const MARGIN = 16;
      const measure = () => {
        const rect = el.getBoundingClientRect();
        const roomRight = win.innerWidth - rect.left - MARGIN;
        const roomLeft = rect.right - MARGIN;
        const wide = showTime && (roomRight >= WIDE_POPOVER_PX || roomLeft >= WIDE_POPOVER_PX);
        const need = wide ? WIDE_POPOVER_PX : POPOVER_PX;
        setSideLayout(wide);
        // Hang from the right edge only when the left-anchored popover would
        // overflow the viewport and the other side actually has the room.
        setAlignRight(roomRight < need && roomLeft >= need);
      };
      measure();
      win.addEventListener("resize", measure);
      return () => win.removeEventListener("resize", measure);
    }, [showTime, isOpen]);

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

    // --- Bounds ---
    // `disablePast` is sugar for minDate = today; whichever lower bound is
    // later wins, so both can be passed together without surprises.
    const today = new Date();
    const lowerCandidates = [
      disablePast ? startOfDay(today) : null,
      minDate ? startOfDay(minDate) : null,
    ].filter(Boolean) as Date[];
    const lower = lowerCandidates.length
      ? new Date(Math.max(...lowerCandidates.map((d) => d.getTime())))
      : null;
    const upper = maxDate ? endOfDay(maxDate) : null;
    const isDayDisabled = (date: Date) =>
      (lower !== null && endOfDay(date) < lower) ||
      (upper !== null && startOfDay(date) > upper);

    // Time bounds only bite on the boundary days themselves — any other day
    // has every time available. On today, with `disablePast`, the floor is the
    // current moment rather than midnight.
    const timeSource = value ?? pendingTime;
    const minTime =
      lower && value && isSameDay(value, lower)
        ? disablePast && isSameDay(lower, today)
          ? today
          : lower
        : null;
    const maxTime = upper && value && isSameDay(value, upper) ? upper : null;

    const handleSelectDate = (day: number, e: React.MouseEvent) => {
      e.stopPropagation();
      let newDate = new Date(currentYear, currentMonth, day);
      if (isDayDisabled(newDate)) return;
      if (showTime) {
        newDate = setTime(newDate, timeSource.getHours(), timeSource.getMinutes());
        // Landing on today with a time that has already passed: bump to now.
        if (disablePast && isSameDay(newDate, today) && newDate < today) {
          newDate = roundToStep(today, minuteStep);
        }
      }
      if (onChange) onChange(newDate);
      // With time columns the popover stays open so the time can be set too.
      if (!showTime) setIsOpen(false);
    };

    const handleTimeChange = (next: Date) => {
      if (value) onChange?.(next);
      else setPendingTime(next);
    };

    // --- Formatting ---
    const formatDate = (date: Date) => {
      const day = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
      return showTime ? `${day}, ${formatTime(date, timeFormat)}` : day;
    };

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

    // Only the side rail widens the popover; the stacked panel grows downward.
    const popoverWidth = railOpen && sideLayout ? WIDE_POPOVER_PX : POPOVER_PX;

    const timeHeader = (
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <Clock className="w-3.5 h-3.5" /> Time
        </span>
        <span
          className={cn(
            "text-xs font-semibold tabular-nums",
            value ? theme.text : "text-muted-foreground",
          )}
        >
          {formatTime(timeSource, timeFormat)}
        </span>
      </div>
    );

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
              "text-sm font-semibold",
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

        {/* Calendar Popover — grows in step with the time rail beside it. */}
        <motion.div
          initial={false}
          animate={{
            width: popoverWidth,
            opacity: isOpen ? 1 : 0,
            scaleY: isOpen ? 1 : 0.95,
            y: isOpen ? 0 : -8,
          }}
          transition={{
            width: unfold,
            default: reduceMotion
              ? { duration: 0 }
              : { duration: 0.2, ease: "easeOut" as const },
          }}
          className={cn(
            "absolute z-50 overflow-hidden bg-background border border-border rounded-xl shadow-xl origin-top",
            alignRight ? "right-0" : "left-0",
            // Never wider than the viewport minus a margin, so a phone still
            // sees the whole thing.
            "max-w-[calc(100vw-2rem)]",
            variant === "underlined" ? "top-[100%]" : "top-[calc(100%+8px)]",
            isOpen ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          <div className="p-4">
            <div className={cn(showTime && sideLayout && "flex items-stretch")}>
              <div className="min-w-0 flex-1">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handlePrevMonth}
                    className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="text-sm font-semibold text-foreground">
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
                      className="text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
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
                    const isOff = isDayDisabled(thisDate);

                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={isOff}
                        aria-disabled={isOff}
                        onClick={(e) => handleSelectDate(day, e)}
                        className={cn(
                          "w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-200 cursor-pointer mx-auto",
                          isSelected
                            ? cn(theme.bg, "font-semibold shadow-sm scale-110")
                            : isToday
                              ? cn(
                                  "font-semibold bg-muted",
                                  theme.text,
                                )
                              : "text-foreground font-medium hover:bg-muted",
                          isOff &&
                            "text-muted-foreground/40 line-through cursor-not-allowed hover:bg-transparent font-normal",
                        )}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time — unfolds to the RIGHT of the calendar on the first pick
                  when there is room, and DOWN from under it otherwise. The
                  inner column is a fixed width so the lists are never squeezed
                  mid-unfold, and its margin rides along so the calendar holds
                  still. */}
              <AnimatePresence initial={false}>
                {railOpen && sideLayout && (
                  <motion.div
                    key="time-side"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0, transition: settle }}
                    transition={unfold}
                    className="shrink-0 overflow-hidden"
                  >
                    <div className="flex h-full w-44 ml-4 flex-col border-l border-border pl-4">
                      {timeHeader}
                      {/* The picker fills whatever height the calendar gives
                          the row — absolutely positioned so its long lists
                          never stretch the popover themselves. */}
                      <div className="relative flex-1 min-h-32">
                        <TimePicker
                          value={timeSource}
                          onChange={handleTimeChange}
                          format={timeFormat}
                          minuteStep={minuteStep}
                          minTime={minTime}
                          maxTime={maxTime}
                          color={color}
                          className="absolute inset-0 h-auto"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence initial={false}>
              {railOpen && !sideLayout && (
                <motion.div
                  key="time-stacked"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0, transition: settle }}
                  transition={unfold}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-border">
                    {timeHeader}
                    <TimePicker
                      value={timeSource}
                      onChange={handleTimeChange}
                      format={timeFormat}
                      minuteStep={minuteStep}
                      minTime={minTime}
                      maxTime={maxTime}
                      color={color}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Done confirms the day and its time, so it rides in with the
                panel rather than sitting under an empty calendar. */}
            <AnimatePresence initial={false}>
              {railOpen && (
                <motion.div
                  key="done"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0, transition: settle }}
                  transition={unfold}
                  className="overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className={cn(
                      "mt-3 w-full h-9 rounded-lg text-sm font-semibold transition-colors",
                      theme.bg,
                    )}
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

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
