"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { getThemeStyles } from "../date-picker-theme";
import { springLinear } from "../motion-curves";

// ==========================================
// CALENDAR PANEL
// The month grid shared by every DatePickerBlock variant: a header with
// prev / next, a month + year picker behind the title, and a fixed-height
// stage so the card never changes size — not between 5- and 6-week months and
// not between the calendar and the picker. Pages slide into each other slowly
// on the Web Animations API (no animation library); the selected day's pill
// glides on a CSS spring. Reduced motion: everything is instant.
// ==========================================

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

const YEAR_MIN = 1900;
const YEAR_MAX = 2100;
const YEARS = Array.from({ length: YEAR_MAX - YEAR_MIN + 1 }, (_, i) => YEAR_MIN + i);

/** Weekday row (2rem) + six week rows (2.5rem each). Never changes. */
const STAGE_PX = 272;

/** Slide between pages: slow and lazy, the page travels 56% of its width while fading. */
const SLIDE_MS = 640;
const SLIDE_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const SLIDE_OFFSET = 56;

const UNFOLD = springLinear({ stiffness: 240, damping: 30, mass: 0.9 });
const unfoldOn = (property: string) => `${property} ${UNFOLD.duration}ms ${UNFOLD.easing}`;

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const isSameDay = (a: Date, b: Date) =>
  a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();

/** Always 42 cells (six weeks) so the grid height never moves. */
const generateCalendarDays = (year: number, month: number, weekStartsOn: 0 | 1) => {
  const lead = (new Date(year, month, 1).getDay() - weekStartsOn + 7) % 7;
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);
  const days: { date: Date; isCurrentMonth: boolean }[] = [];
  for (let i = lead - 1; i >= 0; i--) {
    days.push({ date: new Date(year, month - 1, daysInPrevMonth - i), isCurrentMonth: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: new Date(year, month, i), isCurrentMonth: true });
  }
  for (let i = 1; days.length < 42; i++) {
    days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
  }
  return days;
};

type Page = { kind: "days"; year: number; month: number } | { kind: "months" };
const pageKey = (p: Page) => (p.kind === "months" ? "months" : `${p.year}-${p.month}`);

/** +1 when `to` sits after `from` (slides in from the right), -1 otherwise. */
const directionBetween = (from: Page, to: Page): 1 | -1 => {
  if (to.kind === "months") return 1;
  if (from.kind === "months") return -1;
  return to.year * 12 + to.month >= from.year * 12 + from.month ? 1 : -1;
};

const slide = (el: HTMLElement, from: number, to: number) =>
  el.animate(
    [
      { transform: `translateX(${from}%)`, opacity: from === 0 ? 1 : 0 },
      { transform: `translateX(${to}%)`, opacity: to === 0 ? 1 : 0 },
    ],
    { duration: SLIDE_MS, easing: SLIDE_EASE, fill: "backwards" },
  );

/**
 * The pill behind the selected day. One element that glides to the newly
 * picked day on the unfold spring: after each change it measures the day
 * marked `data-selected` inside the grid and moves there. It jumps, without
 * gliding, on first show and when the month changes.
 */
function SelectionPill({
  selectedKey,
  monthKey,
  instant,
  className,
}: {
  selectedKey: string | null;
  monthKey: string;
  instant: boolean;
  className?: string;
}) {
  const pillRef = useRef<HTMLSpanElement>(null);
  const placedIn = useRef<string | null>(null);

  useLayoutEffect(() => {
    const pill = pillRef.current;
    const grid = pill?.parentElement;
    if (!grid || !pill) return;
    const place = (glide: boolean) => {
      const target = grid.querySelector<HTMLElement>('[data-selected="true"]');
      if (!target) {
        pill.style.opacity = "0";
        placedIn.current = null;
        return;
      }
      const from = grid.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      // Screen pixels vs the grid's own CSS pixels: divide any ancestor scale out.
      const scale = grid.offsetWidth > 0 ? from.width / grid.offsetWidth : 1;
      pill.style.transition = glide ? unfoldOn("transform") : "none";
      pill.style.transform = `translate(${(to.left - from.left) / scale}px, ${(to.top - from.top) / scale}px)`;
      pill.style.opacity = "1";
      placedIn.current = monthKey;
    };
    place(placedIn.current === monthKey && !instant);

    // Snap back onto the day if the grid is resized after the pill is placed.
    let initial = true;
    const observer = new ResizeObserver(() => {
      if (initial) {
        initial = false;
        return;
      }
      place(false);
    });
    observer.observe(grid);
    return () => observer.disconnect();
  }, [selectedKey, monthKey, instant]);

  return (
    <span
      ref={pillRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-0 top-0 z-0 size-9 rounded-full opacity-0 shadow-xs",
        className,
      )}
    />
  );
}

/** The long, scrolling year column; opens already centred on the active year. */
function YearList({
  activeYear,
  pickYear,
  todayYear,
  isYearDisabled,
  onPick,
  activeClass,
}: {
  activeYear: number;
  pickYear: number;
  todayYear: number;
  isYearDisabled: (year: number) => boolean;
  onPick: (year: number) => void;
  activeClass: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    const item = activeRef.current;
    if (!list || !item) return;
    list.scrollTop = item.offsetTop - list.clientHeight / 2 + item.offsetHeight / 2;
  }, []);

  return (
    <div
      ref={listRef}
      className="h-full w-20 shrink-0 overflow-y-auto border-r border-border/60 pr-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex flex-col gap-0.5 py-1">
        {YEARS.map((year) => {
          const isPicked = year === pickYear;
          const off = isYearDisabled(year);
          return (
            <button
              key={year}
              ref={year === activeYear ? activeRef : undefined}
              type="button"
              disabled={off}
              aria-pressed={isPicked}
              onClick={() => onPick(year)}
              className={cn(
                "h-9 shrink-0 rounded-lg text-sm tabular-nums transition-colors duration-200",
                isPicked
                  ? cn(activeClass, "font-semibold")
                  : cn(
                      "font-medium text-foreground hover:bg-muted",
                      year === todayYear && "ring-1 ring-inset ring-border",
                    ),
                off && "cursor-not-allowed text-muted-foreground/40 line-through hover:bg-transparent",
              )}
            >
              {year}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export interface CalendarPanelProps {
  /** Any day inside the month being shown. */
  viewDate: Date;
  onViewDateChange: (date: Date) => void;
  value?: Date | null;
  /** Fired with the clicked day (midnight). The caller decides what to keep. */
  onSelect: (date: Date) => void;
  isDayDisabled?: (date: Date) => boolean;
  /** Earliest / latest selectable moment, used to grey out whole months and years. */
  lower?: Date | null;
  upper?: Date | null;
  color?: string;
  /** 1 = Monday first (default), 0 = Sunday first. */
  weekStartsOn?: 0 | 1;
  reduceMotion?: boolean;
  /** False while the card is hidden (a closed popover): resets to the calendar page without animating. */
  active?: boolean;
  className?: string;
}

export function CalendarPanel({
  viewDate,
  onViewDateChange,
  value,
  onSelect,
  isDayDisabled,
  lower = null,
  upper = null,
  color = "primary",
  weekStartsOn = 1,
  reduceMotion = false,
  active = true,
  className,
}: CalendarPanelProps) {
  const { theme } = getThemeStyles(color);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const today = new Date();

  const [view, setView] = useState<"days" | "months">("days");
  const [pickYear, setPickYear] = useState(year);
  if (!active && view !== "days") setView("days");

  // --- Page transitions ---
  // The page on show is derived from state; when it changes, the page it
  // replaces stays mounted (inert) while both slide, then is dropped.
  const page: Page = view === "months" ? { kind: "months" } : { kind: "days", year, month };
  const key = pageKey(page);
  const [shown, setShown] = useState<Page>(page);
  const [leaving, setLeaving] = useState<{ page: Page; dir: 1 | -1 } | null>(null);
  if (pageKey(shown) !== key) {
    setShown(page);
    if (active && !reduceMotion) setLeaving({ page: shown, dir: directionBetween(shown, page) });
    else if (leaving) setLeaving(null);
  }

  const leavingRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!leaving) return;
    const out = leavingRef.current;
    const inn = currentRef.current;
    if (!out || !inn) return;
    const animations = [
      slide(out, 0, -leaving.dir * SLIDE_OFFSET),
      slide(inn, leaving.dir * SLIDE_OFFSET, 0),
    ];
    let live = true;
    Promise.all(animations.map((a) => a.finished))
      .then(() => {
        if (live) setLeaving(null);
      })
      .catch(() => {});
    return () => {
      live = false;
      animations.forEach((a) => a.cancel());
    };
  }, [leaving]);

  // --- Navigation ---
  const goToMonth = (delta: number) => onViewDateChange(new Date(year, month + delta, 1));
  const openPicker = () => {
    setPickYear(year);
    setView("months");
  };
  const pickMonth = (m: number) => {
    onViewDateChange(new Date(pickYear, m, 1));
    setView("days");
  };

  const isYearDisabled = (y: number) =>
    (lower !== null && new Date(y, 11, 31, 23, 59, 59, 999) < lower) ||
    (upper !== null && new Date(y, 0, 1) > upper);
  const isMonthDisabled = (y: number, m: number) =>
    (lower !== null && new Date(y, m + 1, 0, 23, 59, 59, 999) < lower) ||
    (upper !== null && new Date(y, m, 1) > upper);

  const selectedText =
    color === "zinc"
      ? "text-white dark:text-zinc-900"
      : color === "primary"
        ? "text-primary-foreground"
        : "text-white";
  const weekdays = weekStartsOn === 1 ? [...DAY_NAMES.slice(1), DAY_NAMES[0]] : DAY_NAMES;

  const renderPage = (p: Page) => {
    if (p.kind === "months") {
      return (
        <div className="flex h-full gap-3">
          <YearList
            activeYear={year}
            pickYear={pickYear}
            todayYear={today.getFullYear()}
            isYearDisabled={isYearDisabled}
            onPick={setPickYear}
            activeClass={theme.bg}
          />
          <div className="grid min-w-0 flex-1 grid-cols-2 grid-rows-6 gap-1">
            {MONTH_NAMES.map((name, m) => {
              const isActive = pickYear === year && m === month;
              const off = isMonthDisabled(pickYear, m);
              const isThisMonth = pickYear === today.getFullYear() && m === today.getMonth();
              return (
                <button
                  key={name}
                  type="button"
                  disabled={off}
                  aria-pressed={isActive}
                  onClick={() => pickMonth(m)}
                  className={cn(
                    "rounded-lg px-1 text-sm transition-colors duration-200",
                    isActive
                      ? cn(theme.bg, "font-semibold")
                      : cn(
                          "font-medium text-foreground hover:bg-muted",
                          isThisMonth && "ring-1 ring-inset ring-border",
                        ),
                    off && "cursor-not-allowed text-muted-foreground/40 line-through hover:bg-transparent",
                  )}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    const cells = generateCalendarDays(p.year, p.month, weekStartsOn);
    return (
      <div>
        <div className="grid h-8 grid-cols-7 items-center text-center">
          {weekdays.map((d) => (
            <span key={d} className="text-xs font-medium text-muted-foreground">
              {d}
            </span>
          ))}
        </div>
        <div className="relative grid grid-cols-7 text-center">
          <SelectionPill
            selectedKey={
              value ? `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}` : null
            }
            monthKey={`${p.year}-${p.month}`}
            instant={reduceMotion}
            className={theme.bg}
          />
          {cells.map(({ date, isCurrentMonth }, i) => {
            const isSelected = Boolean(value && isSameDay(date, value));
            const isToday = isSameDay(date, today);
            const off = isDayDisabled?.(date) ?? false;
            return (
              <div key={i} className="flex h-10 items-center justify-center">
                <button
                  type="button"
                  disabled={off}
                  aria-disabled={off}
                  aria-pressed={isSelected}
                  aria-label={new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(date)}
                  data-selected={isSelected ? "true" : undefined}
                  onClick={() => {
                    if (off) return;
                    onSelect(date);
                    if (!isCurrentMonth) onViewDateChange(new Date(date.getFullYear(), date.getMonth(), 1));
                  }}
                  className={cn(
                    "relative flex size-9 items-center justify-center rounded-full text-sm leading-none transition-colors duration-300",
                    isSelected
                      ? cn(selectedText, "font-bold")
                      : cn(
                          "hover:bg-muted",
                          isCurrentMonth ? "font-medium text-foreground" : "font-medium text-muted-foreground/40",
                          isToday && "ring-1 ring-inset ring-border",
                        ),
                    off && "cursor-not-allowed font-normal text-muted-foreground/40 line-through hover:bg-transparent",
                  )}
                >
                  <span className="relative z-10">{date.getDate()}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const navButton =
    "flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

  return (
    <div className={cn("w-full select-none", className)}>
      <header className="mb-3 flex h-9 items-center justify-between">
        {view === "months" ? (
          <button type="button" aria-label="Back to calendar" onClick={() => setView("days")} className={navButton}>
            <ArrowLeft className="size-4" />
          </button>
        ) : (
          <button type="button" aria-label="Previous month" onClick={() => goToMonth(-1)} className={navButton}>
            <ChevronLeft className="size-4" />
          </button>
        )}

        <button
          type="button"
          aria-label="Choose month and year"
          aria-expanded={view === "months"}
          onClick={() => (view === "months" ? setView("days") : openPicker())}
          className="rounded-lg px-3 py-1 text-[15px] font-bold tracking-tight text-foreground transition-colors hover:bg-muted"
        >
          {view === "months" ? pickYear : `${MONTH_NAMES[month]} ${year}`}
        </button>

        {view === "months" ? (
          <span aria-hidden className="size-9" />
        ) : (
          <button type="button" aria-label="Next month" onClick={() => goToMonth(1)} className={navButton}>
            <ChevronRight className="size-4" />
          </button>
        )}
      </header>

      <div className="relative overflow-hidden" style={{ height: STAGE_PX }}>
        {leaving && (
          <div
            key={pageKey(leaving.page)}
            ref={leavingRef}
            inert
            aria-hidden
            className="pointer-events-none absolute inset-0"
          >
            {renderPage(leaving.page)}
          </div>
        )}
        <div key={key} ref={currentRef} className="absolute inset-0">
          {renderPage(page)}
        </div>
      </div>
    </div>
  );
}
