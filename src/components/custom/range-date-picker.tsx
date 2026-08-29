"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

export type RangeDatePickerColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | string;

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface RangeDatePickerProps {
  className?: string;
  variant?: "single" | "dual" | "priced-single" | "priced-dual" | "priced";
  showPrices?: boolean;
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  defaultFrom?: Date | null;
  defaultTo?: Date | null;
  color?: RangeDatePickerColor;
  disabled?: boolean;
  getPrice?: (date: Date) => string | number | null;
}

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    border: "border-primary/40",
    text: "text-primary",
    bg: "bg-primary text-primary-foreground",
    bgHover: "hover:bg-primary/90",
    rangeBg: "bg-primary/15 text-foreground",
    ring: "ring-primary/20",
    badge: "bg-primary/10 text-primary border-primary/20",
  },
  indigo: {
    border: "border-indigo-500/40",
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 text-white",
    bgHover: "hover:bg-indigo-700",
    rangeBg: "bg-indigo-500/15 text-indigo-950 dark:text-indigo-100",
    ring: "ring-indigo-500/20",
    badge: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  },
  rose: {
    border: "border-rose-500/40",
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 text-white",
    bgHover: "hover:bg-rose-700",
    rangeBg: "bg-rose-500/15 text-rose-950 dark:text-rose-100",
    ring: "ring-rose-500/20",
    badge: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
  emerald: {
    border: "border-emerald-500/40",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 text-white",
    bgHover: "hover:bg-emerald-700",
    rangeBg: "bg-emerald-500/15 text-emerald-950 dark:text-emerald-100",
    ring: "ring-emerald-500/20",
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  zinc: {
    border: "border-zinc-500/40",
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
    bgHover: "hover:bg-zinc-800 dark:hover:bg-zinc-200",
    rangeBg: "bg-zinc-500/15 text-zinc-900 dark:text-zinc-100",
    ring: "ring-zinc-500/20",
    badge: "bg-zinc-500/10 text-zinc-800 dark:text-zinc-200 border-zinc-500/20",
  },
};

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

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const subDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isBetween = (target: Date, start: Date | null, end: Date | null): boolean => {
  if (!start || !end) return false;
  const t = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  const min = Math.min(s, e);
  const max = Math.max(s, e);
  return t > min && t < max;
};

const formatDateString = (date: Date | null): string => {
  if (!date) return "";
  const month = MONTH_NAMES[date.getMonth()].slice(0, 3);
  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};

const generateMonthDays = (year: number, month: number) => {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days: { date: Date; isCurrentMonth: boolean }[] = [];

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      date: new Date(year, month, d),
      isCurrentMonth: true,
    });
  }

  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  return days;
};

export function RangeDatePicker({
  className,
  variant = "single",
  showPrices = false,
  value,
  onChange,
  defaultFrom,
  defaultTo,
  color = "primary",
  disabled = false,
  getPrice,
}: RangeDatePickerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDual = variant === "dual" || variant === "priced-dual";
  const isPriced =
    showPrices ||
    variant === "priced" ||
    variant === "priced-single" ||
    variant === "priced-dual" ||
    getPrice !== undefined;

  const [internalFrom, setInternalFrom] = useState<Date | null>(
    () => defaultFrom ?? subDays(new Date(), 7)
  );
  const [internalTo, setInternalTo] = useState<Date | null>(
    () => defaultTo ?? new Date()
  );

  const fromDate = value !== undefined ? value.from : internalFrom;
  const toDate = value !== undefined ? value.to : internalTo;

  const [selectingFrom, setSelectingFrom] = useState<Date | null>(fromDate);
  const [selectingTo, setSelectingTo] = useState<Date | null>(toDate);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const [viewDate, setViewDate] = useState<Date>(() => fromDate || new Date());

  const theme = colorThemes[color] || colorThemes.primary;

  useEffect(() => {
    setSelectingFrom(fromDate);
    setSelectingTo(toDate);
  }, [fromDate, toDate]);

  const handleDateClick = (clickedDate: Date) => {
    if (disabled) return;

    let newFrom: Date | null = null;
    let newTo: Date | null = null;

    if (!selectingFrom || (selectingFrom && selectingTo)) {
      newFrom = clickedDate;
      newTo = null;
    } else if (selectingFrom && !selectingTo) {
      if (clickedDate.getTime() < selectingFrom.getTime()) {
        newFrom = clickedDate;
        newTo = selectingFrom;
      } else {
        newFrom = selectingFrom;
        newTo = clickedDate;
      }
    }

    setSelectingFrom(newFrom);
    setSelectingTo(newTo);

    if (value === undefined) {
      setInternalFrom(newFrom);
      setInternalTo(newTo);
    }
    onChange?.({ from: newFrom, to: newTo });
  };

  const resetRange = () => {
    const today = new Date();
    if (isDual) {
      const from = new Date(today);
      const to = addDays(today, 28);
      setSelectingFrom(from);
      setSelectingTo(to);
      if (value === undefined) {
        setInternalFrom(from);
        setInternalTo(to);
      }
      onChange?.({ from, to });
      setViewDate(new Date(from));
    } else {
      setSelectingFrom(today);
      setSelectingTo(today);
      if (value === undefined) {
        setInternalFrom(today);
        setInternalTo(today);
      }
      onChange?.({ from: today, to: today });
      setViewDate(new Date(today));
    }
  };

  // Month Math
  const year1 = viewDate.getFullYear();
  const month1 = viewDate.getMonth();
  const days1 = generateMonthDays(year1, month1);

  // Month 2 (Right calendar for dual variant)
  const nextMonthDate = new Date(year1, month1 + 1, 1);
  const year2 = nextMonthDate.getFullYear();
  const month2 = nextMonthDate.getMonth();
  const days2 = generateMonthDays(year2, month2);

  const prevMonth = () => setViewDate(new Date(year1, month1 - 1, 1));
  const nextMonth = () => setViewDate(new Date(year1, month1 + 1, 1));

  const effectiveTo = selectingTo || (selectingFrom && hoverDate ? hoverDate : null);
  const effectiveFrom =
    selectingFrom && effectiveTo && effectiveTo.getTime() < selectingFrom.getTime()
      ? effectiveTo
      : selectingFrom;
  const effectiveEnd =
    selectingFrom && effectiveTo && effectiveTo.getTime() < selectingFrom.getTime()
      ? selectingFrom
      : effectiveTo;

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-full rounded-2xl bg-card border border-border/80 p-5 animate-pulse",
          isDual ? "max-w-2xl h-96" : "max-w-sm h-80",
          isPriced && "h-[420px]",
          className
        )}
      />
    );
  }

  const renderSingleMonthGrid = (
    y: number,
    m: number,
    days: { date: Date; isCurrentMonth: boolean }[],
    showPrevNav: boolean,
    showNextNav: boolean
  ) => (
    <div className="flex-1 flex flex-col justify-between min-w-0">
      {/* Month Header */}
      <header className="flex items-center justify-between pb-3">
        <h2 className="text-sm font-extrabold text-foreground tracking-tight">
          {MONTH_NAMES[m]} {y}
        </h2>
        <div className="flex items-center gap-1">
          {showPrevNav && (
            <button
              type="button"
              onClick={prevMonth}
              className="size-7 rounded-lg border border-border/80 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="size-4" />
            </button>
          )}
          {showNextNav && (
            <button
              type="button"
              onClick={nextMonth}
              className="size-7 rounded-lg border border-border/80 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight className="size-4" />
            </button>
          )}
        </div>
      </header>

      {/* Weekdays Header */}
      <section className="grid grid-cols-7 gap-1 text-center mb-2">
        {WEEKDAY_NAMES.map((day) => (
          <span key={day} className="text-xs font-bold text-muted-foreground">
            {day}
          </span>
        ))}
      </section>

      {/* Days Grid */}
      <section className="grid grid-cols-7 gap-y-1.5 gap-x-0 text-center">
        {days.map(({ date, isCurrentMonth }, idx) => {
          const isStart = isSameDay(date, effectiveFrom);
          const isEnd = isSameDay(date, effectiveEnd);
          const isInRange = isBetween(date, effectiveFrom, effectiveEnd);

          const price = isCurrentMonth
            ? getPrice
              ? getPrice(date)
              : isPriced
              ? date.getDay() === 0 || date.getDay() === 6
                ? "$120"
                : "$100"
              : null
            : null;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoverDate(date)}
              className={cn(
                "relative flex items-center justify-center my-0.5",
                isPriced ? "h-12" : "h-8",
                isInRange && theme.rangeBg,
                isStart && effectiveEnd && "rounded-l-xl",
                isEnd && effectiveFrom && "rounded-r-xl"
              )}
            >
              <button
                type="button"
                onClick={() => handleDateClick(date)}
                className={cn(
                  "w-full rounded-xl transition-all duration-100 flex flex-col items-center justify-center z-10 px-1 py-1",
                  isPriced ? "h-11" : "size-8 rounded-lg",
                  !isCurrentMonth && "text-muted-foreground/30",
                  isCurrentMonth && !isStart && !isEnd && "hover:bg-muted text-foreground",
                  (isStart || isEnd) && cn(theme.bg, theme.bgHover, "font-extrabold scale-105 shadow-xs")
                )}
              >
                <span
                  className={cn(
                    "text-xs font-bold leading-tight",
                    (isStart || isEnd) && "text-primary-foreground"
                  )}
                >
                  {date.getDate()}
                </span>
                {price && (
                  <span
                    className={cn(
                      "text-[10px] font-semibold leading-tight mt-0.5 tracking-tight",
                      isStart || isEnd
                        ? "text-primary-foreground/90 font-bold"
                        : "text-muted-foreground"
                    )}
                  >
                    {price}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );

  return (
    <article
      className={cn(
        "w-full rounded-2xl bg-card border border-border/80 p-5 flex flex-col gap-4 text-foreground select-none overflow-hidden shadow-none mx-auto my-auto",
        isDual ? "max-w-2xl" : "max-w-sm",
        disabled && "opacity-60 pointer-events-none",
        className
      )}
    >
      {/* Calendars Grid Area */}
      <div className={cn("w-full flex flex-col gap-6", isDual && "sm:flex-row sm:gap-8")}>
        {/* Left Calendar (Month 1) */}
        {renderSingleMonthGrid(year1, month1, days1, true, !isDual)}

        {/* Right Calendar (Month 2 - Dual Variant Only) */}
        {isDual && (
          <div className="border-t border-border/60 pt-6 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-8 flex-1">
            {renderSingleMonthGrid(year2, month2, days2, false, true)}
          </div>
        )}
      </div>

      {/* Bottom Footer Status Bar */}
      <footer className="flex items-center justify-between pt-3 mt-1 border-t border-border/60">
        <div className="text-[11px] font-medium text-muted-foreground truncate max-w-[280px]">
          {selectingFrom && selectingTo && !isSameDay(selectingFrom, selectingTo) ? (
            <span className="flex items-center gap-1.5">
              <span className={cn("size-2 rounded-full", theme.bg)} />
              <strong className="text-foreground">{formatDateString(selectingFrom)}</strong> –{" "}
              <strong className="text-foreground">{formatDateString(selectingTo)}</strong>
            </span>
          ) : selectingFrom ? (
            <span className="flex items-center gap-1.5">
              <span className={cn("size-2 rounded-full", theme.bg)} />
              <strong className="text-foreground">{formatDateString(selectingFrom)}</strong>
            </span>
          ) : (
            <span>Select date range</span>
          )}
        </div>

        {(selectingFrom || selectingTo) && (
          <button
            type="button"
            onClick={resetRange}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border/80 text-[11px] font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw className="size-3" />
            Reset
          </button>
        )}
      </footer>
    </article>
  );
}
