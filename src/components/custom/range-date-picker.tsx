"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * False while server-rendering and during hydration, true afterwards — without
 * the extra render an effect-flipped useState costs.
 */
const subscribeToNothing = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

import { cn } from "@/lib/utils";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  RotateCcw,
} from "lucide-react";
import { TimePicker } from "./blocks/TimePickerBlock";
import {
  formatTime,
  roundToStep,
  setTime,
  type TimeFormat,
} from "./blocks/time-picker-utils";
import { springLinear } from "./blocks/motion-curves";

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
  /** Greys out every day before today so it cannot be picked. */
  disablePast?: boolean;
  /** Earliest selectable day (inclusive). Combine with `disablePast` freely — the later bound wins. */
  minDate?: Date;
  /** Latest selectable day (inclusive). */
  maxDate?: Date;
  /**
   * Adds Start / End time columns. The card opens with the calendar alone;
   * picking a start day unfolds the columns beside it (under it when the card
   * is narrow), and clearing the range folds them away again. Both dates then
   * carry a time, and the end can never precede the start on the same day.
   */
  showTime?: boolean;
  /** 12-hour clock with AM / PM, or 24-hour. Default "12h". */
  timeFormat?: TimeFormat;
  /** Minute granularity of the time columns. Default 5. */
  minuteStep?: number;
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

const isBetween = (
  target: Date,
  start: Date | null,
  end: Date | null,
): boolean => {
  if (!start || !end) return false;
  const t = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate(),
  ).getTime();
  const s = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  ).getTime();
  const e = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate(),
  ).getTime();
  const min = Math.min(s, e);
  const max = Math.max(s, e);
  return t > min && t < max;
};

const formatDateString = (date: Date | null): string => {
  if (!date) return "";
  const month = MONTH_NAMES[date.getMonth()].slice(0, 3);
  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
};

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());
const endOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

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

/** Card width with the calendar alone, and with the time rail unfolded beside it. */
const CALENDAR_WIDTH = "24rem";
const DUAL_WIDTH = "42rem";
// Rail column (11rem) + its divider padding (1.25rem) + gap to the calendar (1.5rem):
// added to the calendar width so the grid keeps its exact size while the rail opens.
const CALENDAR_WITH_RAIL_WIDTH = "37.75rem";
/** Below this much room the rail unfolds under the calendar instead of beside it. */
const SIDE_RAIL_MIN_PX = 512;
/** The side rail: its w-44 column (the pl-5 divider padding included) plus the ml-6 gap. */
const SIDE_RAIL_WIDTH = "12.5rem";

// ------------------------------------------
// Motion — the same curves as DatePicker so both pickers unfold identically:
// panels (and the card) unfold on a spring (stiffness 240, damping 30, mass
// 0.9, drawn as a CSS `linear()` curve) and fold away on a short ease, which
// also carries the time columns in and the picker / hint swap. Reduced
// motion: instant.
// ------------------------------------------
const UNFOLD = springLinear({ stiffness: 240, damping: 30, mass: 0.9 });
const SETTLE_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const unfoldOn = (property: string) => `${property} ${UNFOLD.duration}ms ${UNFOLD.easing}`;
const settleOn = (property: string) => `${property} 0.28s ${SETTLE_EASE}`;

const STYLES = `
@keyframes range-picker-col-side { from { opacity: 0; transform: translateX(-12px); } }
@keyframes range-picker-col-under { from { opacity: 0; transform: translateY(8px); } }
[data-fold-in] .range-picker-cols > * {
  animation: 0.28s ${SETTLE_EASE} calc(0.12s + var(--range-picker-i) * 0.07s) backwards;
}
[data-fold-in] .range-picker-cols[data-side] > * { animation-name: range-picker-col-side; }
[data-fold-in] .range-picker-cols:not([data-side]) > * { animation-name: range-picker-col-under; }
`;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
/** The visitor's reduced-motion setting; false while server-rendering. */
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

type FoldPhase = "closed" | "entering" | "open" | "closing";

/**
 * A panel that unfolds when `show` turns on and folds away before it leaves:
 * open on the spring, closed on the ease, already open if shown from the
 * start, and still showing what it last showed while it folds. `axis="x"`
 * unfolds its width to `size`; `axis="y"` its height to whatever it holds.
 * Once it has unfolded with motion it carries `data-fold-in`, which is what
 * brings the time columns in after it.
 */
function Fold({
  show,
  axis,
  size,
  instant,
  className,
  children,
}: {
  show: boolean;
  axis: "x" | "y";
  size?: number | string;
  instant: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<FoldPhase>(show ? "open" : "closed");
  const [cameIn, setCameIn] = useState(false);
  // What it last showed, kept so the panel still holds it while it folds.
  const [shown, setShown] = useState(children);
  if (show && shown !== children) setShown(children);

  // Follow `show` while rendering, so the new phase is what first commits.
  if (show && phase === "closed") {
    setPhase(instant ? "open" : "entering");
    setCameIn(!instant);
  } else if (show && phase === "closing") setPhase("open");
  else if (!show && (phase === "open" || phase === "entering")) setPhase(instant ? "closed" : "closing");

  // Entering: the panel mounts with the folded look; commit it, then
  // transition to the open one before the first paint.
  const enter = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    void el.offsetWidth;
    setPhase((p) => (p === "entering" ? "open" : p));
  }, []);

  // In case the fold never reports its end (a hidden tab, `display: none`).
  useEffect(() => {
    if (phase !== "closing") return;
    const t = window.setTimeout(() => setPhase("closed"), 400);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "closed") return null;

  const open = phase === "open";
  const dimension = axis === "x" ? "width" : "grid-template-rows";
  const on = phase === "closing" ? settleOn : unfoldOn;
  return (
    <div
      ref={enter}
      data-fold-in={cameIn || undefined}
      className={className}
      style={{
        ...(axis === "x"
          ? { width: open ? size : 0 }
          : { display: "grid", gridTemplateRows: open ? "1fr" : "0fr" }),
        opacity: open ? 1 : 0,
        transition: instant ? "none" : `${on(dimension)}, ${on("opacity")}`,
      }}
      onTransitionEnd={(e) => {
        if (phase === "closing" && e.target === e.currentTarget && e.propertyName === dimension) setPhase("closed");
      }}
    >
      {axis === "x" ? shown : <div className="min-h-0">{shown}</div>}
    </div>
  );
}

type SwapPhase = "from" | "shown" | "leaving";

/**
 * One thing that gives way to another, one at a time: the showing one fades
 * up and out, then the next fades up in — the leaving one keeps what it
 * showed. Starts shown, without motion.
 */
function WaitSwap({
  swapKey,
  instant,
  classNames,
  children,
}: {
  swapKey: string;
  instant: boolean;
  classNames?: Record<string, string>;
  children: React.ReactNode;
}) {
  const [shownKey, setShownKey] = useState(swapKey);
  const [phase, setPhase] = useState<SwapPhase>("shown");
  // What the showing one holds, kept so the leaving one still shows it.
  const [shown, setShown] = useState(children);
  if (shownKey === swapKey && shown !== children) setShown(children);
  const wanted = useRef(swapKey);

  useLayoutEffect(() => {
    wanted.current = swapKey;
  }, [swapKey]);

  // Follow `swapKey` while rendering, so the new phase is what first commits.
  if (swapKey === shownKey) {
    if (phase === "leaving") setPhase("shown");
  } else if (instant) {
    setShownKey(swapKey);
    setPhase("shown");
  } else if (phase !== "leaving") setPhase("leaving");

  // Coming in: commit the starting look, then transition to the resting one.
  const comeIn = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el || phase !== "from") return;
      void el.offsetWidth;
      setPhase("shown");
    },
    [phase],
  );

  // The leaving one has gone: bring in whatever is wanted now.
  const settle = useCallback(() => {
    setShownKey(wanted.current);
    setPhase("from");
  }, []);

  // In case the transition never ends (a hidden tab, `display: none`).
  useEffect(() => {
    if (phase !== "leaving") return;
    const t = window.setTimeout(settle, 400);
    return () => window.clearTimeout(t);
  }, [phase, settle]);

  const y = phase === "from" ? 6 : phase === "leaving" ? -6 : 0;
  return (
    <div
      key={shownKey}
      ref={comeIn}
      className={classNames?.[shownKey]}
      style={{
        opacity: phase === "shown" ? 1 : 0,
        transform: y ? `translateY(${y}px)` : "none",
        transition: phase === "from" || instant ? "none" : `${settleOn("opacity")}, ${settleOn("transform")}`,
      }}
      onTransitionEnd={(e) => {
        if (phase === "leaving" && e.target === e.currentTarget && e.propertyName === "opacity") settle();
      }}
    >
      {shown}
    </div>
  );
}

/**
 * Width of the element, kept current through a ResizeObserver. Drives the
 * side-vs-stacked decision in JS (rather than a container query) so the
 * unfold can animate the right axis and the card can grow in step with it.
 */
function useElementWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

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
  disablePast = false,
  minDate,
  maxDate,
  showTime = false,
  timeFormat = "12h",
  minuteStep = 5,
}: RangeDatePickerProps) {
  const mounted = useIsMounted();

  const isDual = variant === "dual" || variant === "priced-dual";
  const isPriced =
    showPrices ||
    variant === "priced" ||
    variant === "priced-single" ||
    variant === "priced-dual" ||
    getPrice !== undefined;

  // With time columns the card starts empty and the rail unfolds on the first
  // pick; without them the familiar last-week range is seeded.
  const [internalFrom, setInternalFrom] = useState<Date | null>(
    () => defaultFrom ?? (showTime ? null : subDays(new Date(), 7)),
  );
  const [internalTo, setInternalTo] = useState<Date | null>(
    () => defaultTo ?? (showTime ? null : new Date()),
  );

  const fromDate = value !== undefined ? value.from : internalFrom;
  const toDate = value !== undefined ? value.to : internalTo;

  const [selectingFrom, setSelectingFrom] = useState<Date | null>(fromDate);
  const [selectingTo, setSelectingTo] = useState<Date | null>(toDate);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const [viewDate, setViewDate] = useState<Date>(() => fromDate || new Date());

  const theme = colorThemes[color] || colorThemes.primary;

  const frameRef = useRef<HTMLDivElement>(null);
  const frameWidth = useElementWidth(frameRef);
  const reduceMotion = useReducedMotion();

  // Dual month + times stays stacked — three columns would be far too wide.
  // A single month gets the rail beside it when there is room for the open card.
  const sideTimes = showTime && !isDual && frameWidth >= SIDE_RAIL_MIN_PX;
  // The rail exists once a start day is chosen and folds away on Clear.
  const railOpen = showTime && selectingFrom !== null;

  const formatStamp = (date: Date | null) =>
    !date
      ? ""
      : showTime
        ? `${formatDateString(date)}, ${formatTime(date, timeFormat)}`
        : formatDateString(date);

  // Adopt a new controlled range as it arrives. Handled during render so
  // the previous range is never painted first.
  const [seededRange, setSeededRange] = useState({ fromDate, toDate });
  if (seededRange.fromDate !== fromDate || seededRange.toDate !== toDate) {
    setSeededRange({ fromDate, toDate });
    setSelectingFrom(fromDate);
    setSelectingTo(toDate);
  }

  // --- Bounds ---
  // `disablePast` is sugar for minDate = today; whichever lower bound is later
  // wins, so both can be passed together without surprises.
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

  // Times are compared with each other only when both ends fall on one day,
  // and with "now" only on today when the past is disabled.
  const sameDay = (a: Date | null, b: Date | null) =>
    !!a && !!b && isSameDay(a, b);
  // The start moves freely (an end that would fall behind it is pushed
  // forward by `handleFromTime`); only the end is fenced by the start.
  const fromMinTime =
    disablePast && selectingFrom && isSameDay(selectingFrom, today)
      ? today
      : null;
  const toMinTime = sameDay(selectingFrom, selectingTo)
    ? selectingFrom
    : disablePast && selectingTo && isSameDay(selectingTo, today)
      ? today
      : null;

  // A clicked day inherits the time already chosen for that end of the range
  // (or "now" rounded to the step), so re-picking a day never resets the clock.
  const withTime = (day: Date, previous: Date | null) => {
    if (!showTime) return day;
    const src = previous ?? roundToStep(today, minuteStep);
    let next = setTime(day, src.getHours(), src.getMinutes());
    if (disablePast && isSameDay(next, today) && next < today)
      next = roundToStep(today, minuteStep);
    return next;
  };

  const commitRange = (newFrom: Date | null, newTo: Date | null) => {
    setSelectingFrom(newFrom);
    setSelectingTo(newTo);
    if (value === undefined) {
      setInternalFrom(newFrom);
      setInternalTo(newTo);
    }
    onChange?.({ from: newFrom, to: newTo });
  };

  const handleDateClick = (clickedDate: Date) => {
    if (disabled || isDayDisabled(clickedDate)) return;

    let newFrom: Date | null = null;
    let newTo: Date | null = null;

    if (!selectingFrom || (selectingFrom && selectingTo)) {
      newFrom = withTime(clickedDate, selectingFrom);
      newTo = null;
    } else if (selectingFrom && !selectingTo) {
      if (
        startOfDay(clickedDate).getTime() < startOfDay(selectingFrom).getTime()
      ) {
        newFrom = withTime(clickedDate, selectingFrom);
        newTo = selectingFrom;
      } else {
        newFrom = selectingFrom;
        newTo = withTime(clickedDate, selectingTo);
        // Same day, end earlier than start: pull the end up to the start.
        if (isSameDay(newFrom, newTo) && newTo < newFrom)
          newTo = new Date(newFrom);
      }
    }

    commitRange(newFrom, newTo);
  };

  const handleFromTime = (next: Date) => {
    let to = selectingTo;
    if (to && isSameDay(next, to) && to < next) to = new Date(next);
    commitRange(next, to);
  };
  const handleToTime = (next: Date) => commitRange(selectingFrom, next);

  const resetRange = () => {
    // With time columns, Clear returns to the empty card so the rail folds
    // away; the plain calendar resets to today as before.
    if (showTime) {
      commitRange(null, null);
      return;
    }
    // Reset keeps whatever times were chosen; with the past disabled, today's
    // start is clamped to now by `withTime`.
    const from = withTime(startOfDay(today), selectingFrom);
    const to = isDual
      ? withTime(addDays(startOfDay(today), 28), selectingTo)
      : withTime(startOfDay(today), selectingTo);
    commitRange(from, isSameDay(from, to) && to < from ? new Date(from) : to);
    setViewDate(new Date(from));
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

  const effectiveTo =
    selectingTo || (selectingFrom && hoverDate ? hoverDate : null);
  const effectiveFrom =
    selectingFrom &&
    effectiveTo &&
    effectiveTo.getTime() < selectingFrom.getTime()
      ? effectiveTo
      : selectingFrom;
  const effectiveEnd =
    selectingFrom &&
    effectiveTo &&
    effectiveTo.getTime() < selectingFrom.getTime()
      ? selectingFrom
      : effectiveTo;

  // The frame is the space the card may take. Its width never animates and is
  // measured for the side-or-stacked call; it wraps the skeleton too so the
  // observed node survives the switch to the real card.
  const frameClass = cn(
    "w-full mx-auto",
    isDual ? "max-w-2xl" : showTime ? "max-w-[37.75rem]" : "max-w-sm",
  );

  if (!mounted) {
    return (
      <div ref={frameRef} className={frameClass}>
        <div
          className={cn(
            "w-full rounded-2xl bg-card border border-border/80 p-5 animate-pulse mx-auto",
            isDual ? "max-w-2xl h-96" : "max-w-sm h-80",
            isPriced && "h-[420px]",
            className,
          )}
        />
      </div>
    );
  }

  const renderSingleMonthGrid = (
    y: number,
    m: number,
    days: { date: Date; isCurrentMonth: boolean }[],
    showPrevNav: boolean,
    showNextNav: boolean,
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
          <span key={day} className="text-xs font-semibold text-muted-foreground">
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
          const isOff = isDayDisabled(date);

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
              onMouseEnter={() => {
                if (!isOff) setHoverDate(date);
              }}
              className={cn(
                "relative flex items-center justify-center my-0.5",
                isPriced ? "h-12" : "h-8",
                isInRange && theme.rangeBg,
                isStart && effectiveEnd && "rounded-l-xl",
                isEnd && effectiveFrom && "rounded-r-xl",
              )}
            >
              <button
                type="button"
                disabled={isOff}
                aria-disabled={isOff}
                onClick={() => handleDateClick(date)}
                className={cn(
                  "w-full rounded-xl transition-all duration-100 flex flex-col items-center justify-center z-10 px-1 py-1",
                  isPriced ? "h-11" : "size-8 rounded-lg",
                  !isCurrentMonth && "text-muted-foreground/30",
                  isCurrentMonth &&
                    !isStart &&
                    !isEnd &&
                    "hover:bg-muted text-foreground",
                  (isStart || isEnd) &&
                    cn(
                      theme.bg,
                      theme.bgHover,
                      "font-extrabold scale-105 shadow-xs",
                    ),
                  isOff &&
                    "text-muted-foreground/40 cursor-not-allowed hover:bg-transparent",
                )}
              >
                <span
                  className={cn(
                    "text-xs font-semibold leading-tight",
                    (isStart || isEnd) && "text-primary-foreground",
                    isOff && "line-through font-normal",
                  )}
                >
                  {date.getDate()}
                </span>
                {price && (
                  <span
                    className={cn(
                      "text-[10px] font-semibold leading-tight mt-0.5 tracking-tight",
                      isStart || isEnd
                        ? "text-primary-foreground/90 font-semibold"
                        : "text-muted-foreground",
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

  const timeEnds = [
    {
      key: "from",
      label: "Start",
      date: selectingFrom,
      min: fromMinTime,
      onChange: handleFromTime,
    },
    {
      key: "to",
      label: "End",
      date: selectingTo,
      min: toMinTime,
      onChange: handleToTime,
    },
  ] as const;

  /** One Start / End column: label, chosen time, and the picker or a hint. */
  const renderTimeColumn = (end: (typeof timeEnds)[number]) => (
    <div className="flex flex-col gap-2 min-w-0">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <Clock className="size-3.5" /> {end.label}
        </span>
        <span
          className={cn(
            "text-xs font-semibold tabular-nums",
            end.date ? theme.text : "text-muted-foreground",
          )}
        >
          {end.date ? formatTime(end.date, timeFormat) : "--:--"}
        </span>
      </div>
      <WaitSwap
        swapKey={end.date ? "picker" : "hint"}
        instant={reduceMotion}
        classNames={{
          hint: "h-28 rounded-xl border border-dashed border-border/80 flex flex-col items-center justify-center gap-1.5 px-3 text-center",
        }}
      >
        {end.date ? (
          <TimePicker
            value={end.date}
            onChange={end.onChange}
            format={timeFormat}
            minuteStep={minuteStep}
            minTime={end.min}
            maxTime={null}
            color={color}
            disabled={disabled}
            className="h-28"
          />
        ) : (
          <>
            <CalendarDays className="size-4 text-muted-foreground/70" />
            <span className="text-[11px] font-medium leading-snug text-muted-foreground">
              Pick an end day on the calendar
            </span>
          </>
        )}
      </WaitSwap>
    </div>
  );

  /** The two columns, stacked in the rail or side by side under the calendar. */
  const timeColumns = (stacked: boolean) => (
    // Each column comes in after the rail has started to unfold (see STYLES).
    <div
      data-side={stacked || undefined}
      className={cn(
        "range-picker-cols grid gap-4",
        stacked ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2",
      )}
    >
      {timeEnds.map((end, i) => (
        <div key={end.key} style={{ "--range-picker-i": i } as React.CSSProperties}>
          {renderTimeColumn(end)}
        </div>
      ))}
    </div>
  );

  return (
    <div ref={frameRef} className={frameClass}>
      <article
        style={{
          maxWidth: isDual
            ? DUAL_WIDTH
            : sideTimes && railOpen
              ? CALENDAR_WITH_RAIL_WIDTH
              : CALENDAR_WIDTH,
          transition: reduceMotion ? "none" : unfoldOn("max-width"),
        }}
        className={cn(
          "w-full rounded-2xl bg-card border border-border/80 p-5 flex flex-col gap-4 text-foreground select-none overflow-hidden shadow-none mx-auto my-auto",
          disabled && "opacity-60 pointer-events-none",
          className,
        )}
      >
        <style>{STYLES}</style>
        {/* Calendar + time rail: the rail unfolds to the RIGHT of a single month
          when there is room, and DOWN from under the calendar otherwise. */}
        <div className={cn("w-full flex", sideTimes ? "flex-row" : "flex-col")}>
          {/* Calendars Grid Area */}
          <div
            className={cn(
              "w-full flex flex-col gap-6 min-w-0",
              isDual && "sm:flex-row sm:gap-8",
            )}
          >
            {/* Left Calendar (Month 1) */}
            {renderSingleMonthGrid(year1, month1, days1, true, !isDual)}

            {/* Right Calendar (Month 2 - Dual Variant Only) */}
            {isDual && (
              <div className="border-t border-border/60 pt-6 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-8 flex-1">
                {renderSingleMonthGrid(year2, month2, days2, false, true)}
              </div>
            )}
          </div>

          {/* Start / End time rail */}
          <Fold
            show={railOpen && sideTimes}
            axis="x"
            size={SIDE_RAIL_WIDTH}
            instant={reduceMotion}
            className="shrink-0 overflow-hidden"
          >
            {/* Fixed-width column so the lists are never squeezed mid-unfold. */}
            <div className="w-44 ml-6 pl-5 border-l border-border/60 h-full">
              {timeColumns(true)}
            </div>
          </Fold>
          <Fold show={railOpen && !sideTimes} axis="y" instant={reduceMotion} className="overflow-hidden">
            <div className="pt-4 mt-6 border-t border-border/60">
              {timeColumns(false)}
            </div>
          </Fold>
        </div>

        {/* Bottom Footer Status Bar */}
        <footer className="flex items-center justify-between pt-3 mt-1 border-t border-border/60">
          <div className="text-[11px] font-medium text-muted-foreground truncate max-w-[280px]">
            {selectingFrom &&
            selectingTo &&
            (showTime || !isSameDay(selectingFrom, selectingTo)) ? (
              <span className="flex items-center gap-1.5">
                <span className={cn("size-2 rounded-full", theme.bg)} />
                <strong className="text-foreground">
                  {formatStamp(selectingFrom)}
                </strong>{" "}
                –{" "}
                <strong className="text-foreground">
                  {formatStamp(selectingTo)}
                </strong>
              </span>
            ) : selectingFrom ? (
              <span className="flex items-center gap-1.5">
                <span className={cn("size-2 rounded-full", theme.bg)} />
                <strong className="text-foreground">
                  {formatStamp(selectingFrom)}
                </strong>
                {showTime && <span>– choose an end day</span>}
              </span>
            ) : (
              <span>
                {showTime ? "Choose a start day" : "Select date range"}
              </span>
            )}
          </div>

          {(selectingFrom || selectingTo) && (
            <button
              type="button"
              onClick={resetRange}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border/80 text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <RotateCcw className="size-3" />
              {showTime ? "Clear" : "Reset"}
            </button>
          )}
        </footer>
      </article>
    </div>
  );
}
