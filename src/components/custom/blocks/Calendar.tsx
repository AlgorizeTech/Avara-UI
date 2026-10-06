"use client";

import {
  Calendar as CalendarIcon,
  Calendar1,
  CheckSquare,
  ChevronDown,
  ChevronDownIcon,
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightIcon,
  Clock,
  Download,
  Edit2,
  Hash,
  Menu,
  MessageSquare,
  Plus,
  Square,
  Trash2,
  Video,
  X,
} from "lucide-react";
import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { buttonVariants } from "../ui/button-variants";
import { SelectBlock } from "./SelectBlock";

const EVENT_TYPE_OPTIONS = [
  { label: "Pentest", value: "pentest" },
  { label: "Kick-Off", value: "kickoff" },
];

const EVENT_PLATFORM_OPTIONS = [
  { label: "Google Meet", value: "meet" },
  { label: "Slack", value: "slack" },
  { label: "Discord", value: "discord" },
];

// ==========================================
// VARIANT & COLOR CONFIGURATION
// ==========================================
export type CalendarVariant = "default" | "minimal" | "glass" | "liquid-glass";

export function LiquidGlassSvgFilter() {
  return (
    <>
      <img
        src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      <svg
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="glass-blur"
            x="0"
            y="0"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.003 0.007"
              numOctaves="1"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="200"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}

const TIME_SLOTS = [
  { label: "12:00 AM", startHour: 0, timeStr: "00:00" },
  { label: "1:00 AM", startHour: 1, timeStr: "01:00" },
  { label: "2:00 AM", startHour: 2, timeStr: "02:00" },
  { label: "3:00 AM", startHour: 3, timeStr: "03:00" },
  { label: "4:00 AM", startHour: 4, timeStr: "04:00" },
  { label: "5:00 AM", startHour: 5, timeStr: "05:00" },
  { label: "6:00 AM", startHour: 6, timeStr: "06:00" },
  { label: "7:00 AM", startHour: 7, timeStr: "07:00" },
  { label: "8:00 AM", startHour: 8, timeStr: "08:00" },
  { label: "9:00 AM", startHour: 9, timeStr: "09:00" },
  { label: "10:00 AM", startHour: 10, timeStr: "10:00" },
  { label: "11:00 AM", startHour: 11, timeStr: "11:00" },
  { label: "12:00 PM", startHour: 12, timeStr: "12:00" },
  { label: "1:00 PM", startHour: 13, timeStr: "13:00" },
  { label: "2:00 PM", startHour: 14, timeStr: "14:00" },
  { label: "3:00 PM", startHour: 15, timeStr: "15:00" },
  { label: "4:00 PM", startHour: 16, timeStr: "16:00" },
  { label: "5:00 PM", startHour: 17, timeStr: "17:00" },
  { label: "6:00 PM", startHour: 18, timeStr: "18:00" },
  { label: "7:00 PM", startHour: 19, timeStr: "19:00" },
  { label: "8:00 PM", startHour: 20, timeStr: "20:00" },
  { label: "9:00 PM", startHour: 21, timeStr: "21:00" },
  { label: "10:00 PM", startHour: 22, timeStr: "22:00" },
  { label: "11:00 PM", startHour: 23, timeStr: "23:00" },
];

const getSlotIndexForTime = (timeStr?: string) => {
  if (!timeStr) return 2;
  const parts = timeStr.split(":");
  const hour = parseInt(parts[0], 10);
  if (isNaN(hour)) return 2;

  for (let i = TIME_SLOTS.length - 1; i >= 0; i--) {
    if (hour >= TIME_SLOTS[i].startHour) {
      return i;
    }
  }
  return 0;
};

// Added (string & {}) so it accepts arbitrary hex codes without losing IDE autocomplete for the presets
export type CalendarColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "blue"
  | "zinc"
  | (string & {});

const dashboardVariants: Record<CalendarVariant, Record<string, string>> = {
  default: {
    wrapper:
      "bg-card text-card-foreground border border-border shadow-sm",
    sidebar:
      "bg-card text-card-foreground border-r border-border",
    header:
      "bg-card text-card-foreground border-b border-border",
    gridOuter: "bg-border p-px",
    gridGap: "gap-px",
    gridHeader:
      "bg-card/95 border-b border-border",
    cellBg:
      "bg-card hover:bg-muted/50 text-card-foreground",
  },
  minimal: {
    wrapper: "bg-transparent border-none",
    sidebar:
      "bg-muted/50 rounded-2xl border border-border lg:mr-6",
    header: "bg-transparent border-none mb-4 rounded-xl",
    gridOuter: "bg-transparent p-0",
    gridGap: "gap-2 sm:gap-3",
    gridHeader: "bg-transparent border-none pb-2",
    cellBg:
      "bg-muted rounded-2xl border border-border hover:border-foreground/20 hover:shadow-sm",
  },
  glass: {
    wrapper:
      "bg-white/30 dark:bg-black/25 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl text-neutral-900 dark:text-white",
    sidebar:
      "bg-white/20 dark:bg-black/20 border-r border-white/30 dark:border-white/10",
    header: "bg-transparent border-b border-white/30 dark:border-white/10",
    gridOuter: "bg-white/20 dark:bg-black/20 p-px",
    gridGap: "gap-px",
    gridHeader:
      "bg-white/30 dark:bg-black/30 backdrop-blur-md border-b border-white/30 dark:border-white/10",
    cellBg:
      "bg-white/25 dark:bg-black/30 hover:bg-white/40 dark:hover:bg-black/50 backdrop-blur-sm",
  },
  "liquid-glass": {
    wrapper:
      "bg-transparent border-0 shadow-[0_25px_60px_rgba(0,0,0,0.45)] text-white rounded-[22px] sm:rounded-[28px] [--foreground:#ffffff] [--muted-foreground:rgba(255,255,255,0.75)] [--color-foreground:#ffffff] [--color-muted-foreground:rgba(255,255,255,0.75)]",
    sidebar:
      "bg-white/[0.06] dark:bg-white/[0.04] border-r border-white/20 text-white",
    header: "bg-white/[0.04] dark:bg-white/[0.02] border-b border-white/20 text-white",
    gridOuter: "bg-white/15 p-px",
    gridGap: "gap-px",
    gridHeader:
      "bg-white/[0.08] dark:bg-white/[0.05] backdrop-blur-xs border-b border-white/20 text-white",
    cellBg:
      "bg-white/[0.03] hover:bg-white/[0.10] transition-colors text-white",
  },
};

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    primaryBg: "bg-primary hover:opacity-90 text-primary-foreground shadow-sm",
    primaryText: "text-primary",
    lightBg: "bg-primary/15 text-primary dark:bg-primary/20 dark:text-primary",
    focusRing: "focus:ring-ring",
    pulse: "bg-primary",
  },
  indigo: {
    primaryBg:
      "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20",
    primaryText: "text-indigo-600 dark:text-indigo-400",
    lightBg:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300",
    focusRing: "focus:ring-indigo-500",
    pulse: "bg-indigo-500",
  },
  rose: {
    primaryBg: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20",
    primaryText: "text-rose-600 dark:text-rose-400",
    lightBg: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
    focusRing: "focus:ring-rose-500",
    pulse: "bg-rose-500",
  },
  emerald: {
    primaryBg:
      "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20",
    primaryText: "text-emerald-600 dark:text-emerald-400",
    lightBg:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    focusRing: "focus:ring-emerald-500",
    pulse: "bg-emerald-500",
  },
  blue: {
    primaryBg: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20",
    primaryText: "text-blue-600 dark:text-blue-400",
    lightBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    focusRing: "focus:ring-blue-500",
    pulse: "bg-blue-500",
  },
  zinc: {
    primaryBg:
      "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black shadow-zinc-900/20",
    primaryText: "text-zinc-900 dark:text-white",
    lightBg: "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white",
    focusRing: "focus:ring-zinc-500 dark:focus:ring-zinc-400",
    pulse: "bg-zinc-900 dark:bg-white",
  },
};

// --- START: react-day-picker wrapper ---
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  /** Button style used for the nav and day cells. */
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("en-US", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months,
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 cursor-pointer select-none",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 cursor-pointer select-none",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md cursor-pointer",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0 cursor-pointer",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "select-none font-medium cursor-pointer",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        ...({ table: "w-full border-collapse" } as Record<string, string>),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday,
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number,
        ),
        day: cn(
          "relative w-full h-full p-0 text-center cursor-pointer [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          defaultClassNames.day,
        ),
        range_start: cn(
          "rounded-l-md bg-muted",
          defaultClassNames.range_start,
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-muted", defaultClassNames.range_end),
        today: cn(
          "bg-muted text-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside,
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn(className)}
            {...props}
          />
        ),
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left")
            return (
              <ChevronLeftIcon
                className={cn("size-4 cursor-pointer", className)}
                {...props}
              />
            );
          if (orientation === "right")
            return (
              <ChevronRightIcon
                className={cn("size-4 cursor-pointer", className)}
                {...props}
              />
            );
          return (
            <ChevronDownIcon
              className={cn("size-4 cursor-pointer", className)}
              {...props}
            />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => (
          <td {...props}>
            <div className="flex size-(--cell-size) items-center justify-center text-center">
              {children}
            </div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString("en-US")}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal cursor-pointer group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}
// --- END: react-day-picker wrapper ---

function useThemeDetector() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

const formatDisplayDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return dateStr;
  const dt = new Date(y, m - 1, d);
  const day = String(dt.getDate()).padStart(2, "0");
  const month = dt.toLocaleString("en-US", { month: "short" });
  const year = dt.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatDisplayTime = (timeStr: string) => {
  if (!timeStr) return "12:00 PM";
  const [hStr, mStr] = timeStr.split(":");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr || "0", 10);
  if (isNaN(h)) return timeStr;
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  h = h ? h : 12;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
};

function CustomDatePicker({
  value,
  onChange,
  variant,
  theme,
}: {
  value: string;
  onChange: (val: string) => void;
  variant?: CalendarVariant;
  theme: Record<string, string>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initialDate = useMemo(() => {
    if (!value) return new Date();
    const [y, m, d] = value.split("-").map(Number);
    if (y && m && d) return new Date(y, m - 1, d);
    return new Date();
  }, [value]);

  const [viewDate, setViewDate] = useState<Date>(initialDate);

  const [prevSync, setPrevSync] = useState({ value, isOpen });
  if (prevSync.value !== value || prevSync.isOpen !== isOpen) {
    setPrevSync({ value, isOpen });
    if (value) {
      const [y, m, d] = value.split("-").map(Number);
      if (y && m && d) setViewDate(new Date(y, m - 1, d));
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const calendarCells = useMemo(() => {
    const cells: { day: number; isCurrentMonth: boolean; dateKey: string }[] = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    for (let i = startOffset - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevDate = new Date(currentYear, currentMonth - 1, d);
      cells.push({
        day: d,
        isCurrentMonth: false,
        dateKey: `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      });
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      cells.push({
        day: i,
        isCurrentMonth: true,
        dateKey: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
      });
    }

    const totalCells = cells.length > 35 ? 42 : 35;
    const remaining = totalCells - cells.length;
    for (let i = 1; i <= remaining; i++) {
      const nextDate = new Date(currentYear, currentMonth + 1, i);
      cells.push({
        day: i,
        isCurrentMonth: false,
        dateKey: `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
      });
    }

    return cells;
  }, [currentYear, currentMonth]);

  return (
    <div ref={containerRef} className="relative">
      <label
        className={cn(
          "block text-sm font-medium mb-1",
          variant === "liquid-glass"
            ? "text-white/90"
            : variant === "glass"
              ? "text-neutral-800 dark:text-white/90"
              : "text-foreground",
        )}
      >
        Date
      </label>
      <input type="hidden" name="date" value={value} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full cursor-pointer flex items-center justify-between border rounded-xl px-3 py-2 text-sm bg-transparent transition-all outline-none",
          variant === "liquid-glass"
            ? "border-white/25 text-white bg-white/10 hover:bg-white/15 focus:bg-white/20 focus:border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
            : variant === "glass"
              ? "border-black/15 text-neutral-900 bg-black/5 hover:bg-black/10 focus:bg-white/40 focus:border-black/30 dark:border-white/25 dark:text-white dark:bg-white/10 dark:hover:bg-white/15 dark:focus:bg-white/20 dark:focus:border-white/50"
              : "border-input text-foreground bg-background hover:bg-muted/50",
          isOpen && (theme.focusRing || "ring-2 ring-primary/20"),
        )}
      >
        <span className="font-medium truncate">{formatDisplayDate(value) || "Pick a date"}</span>
        <CalendarIcon
          className={cn(
            "w-4 h-4 shrink-0 opacity-70 cursor-pointer",
            variant === "liquid-glass"
              ? "text-white/80"
              : variant === "glass"
                ? "text-neutral-700 dark:text-white/80"
                : "text-muted-foreground",
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full left-0 mt-2 z-50 w-72 rounded-2xl border p-3.5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 cursor-default",
            variant === "liquid-glass"
              ? "bg-black/50 backdrop-blur-3xl border border-white/30 text-white shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.4),inset_-1px_-1px_1px_rgba(255,255,255,0.15)]"
              : variant === "glass"
                ? "bg-white/45 dark:bg-black/60 backdrop-blur-3xl border-white/50 dark:border-white/20 text-neutral-900 dark:text-white shadow-2xl"
                : "bg-popover text-popover-foreground border-border",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">
              {viewDate.toLocaleString("en-US", { month: "long" })} {currentYear}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewDate(new Date(currentYear, currentMonth - 1, 1));
                }}
                className={cn(
                  "p-1 rounded-md transition-colors cursor-pointer",
                  variant === "liquid-glass"
                    ? "hover:bg-white/20 text-white border border-white/20"
                    : variant === "glass"
                      ? "hover:bg-black/10 dark:hover:bg-white/15"
                      : "hover:bg-muted",
                )}
              >
                <ChevronLeft className="w-4 h-4 cursor-pointer" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewDate(new Date(currentYear, currentMonth + 1, 1));
                }}
                className={cn(
                  "p-1 rounded-md transition-colors cursor-pointer",
                  variant === "liquid-glass"
                    ? "hover:bg-white/20 text-white border border-white/20"
                    : variant === "glass"
                      ? "hover:bg-black/10 dark:hover:bg-white/15"
                      : "hover:bg-muted",
                )}
              >
                <ChevronRight className="w-4 h-4 cursor-pointer" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
              <span key={d} className="text-[11px] font-medium opacity-60">
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarCells.map((cell, idx) => {
              const isSelected = cell.dateKey === value;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(cell.dateKey);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "h-8 w-8 mx-auto flex items-center justify-center rounded-lg text-xs transition-colors cursor-pointer",
                    !cell.isCurrentMonth && (variant === "liquid-glass" ? "opacity-35 text-white/50" : "opacity-35"),
                    isSelected
                      ? variant === "liquid-glass"
                        ? "bg-white/30 text-white font-bold border border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                        : cn(theme.primaryBg, "font-bold text-white shadow-xs")
                      : variant === "liquid-glass"
                        ? "hover:bg-white/20 text-white"
                        : variant === "glass"
                          ? "hover:bg-black/10 dark:hover:bg-white/15 text-neutral-900 dark:text-white"
                          : "hover:bg-muted text-foreground",
                  )}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          <div className={cn(
            "mt-2 pt-2 border-t flex justify-between items-center text-xs",
            variant === "liquid-glass"
              ? "border-white/15 text-white"
              : "border-black/10 dark:border-white/10",
          )}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const today = new Date();
                const k = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
                setViewDate(today);
                onChange(k);
                setIsOpen(false);
              }}
              className={cn(
                "font-semibold cursor-pointer px-2.5 py-1 rounded-lg transition-all",
                variant === "liquid-glass"
                  ? "bg-white/20 hover:bg-white/30 border border-white/30 text-white backdrop-blur-md shadow-xs"
                  : theme.primaryText || "text-primary font-semibold hover:underline",
              )}
            >
              Today
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className={cn(
                "opacity-70 hover:opacity-100 cursor-pointer px-2 py-1 rounded transition-colors",
                variant === "liquid-glass" && "hover:bg-white/15 text-white",
              )}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CustomTimePicker({
  value,
  onChange,
  variant,
  theme,
}: {
  value: string;
  onChange: (val: string) => void;
  variant?: CalendarVariant;
  theme: Record<string, string>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { hour12, minute, ampm } = useMemo(() => {
    const [hStr, mStr] = (value || "12:00").split(":");
    let h = parseInt(hStr, 10);
    if (isNaN(h)) h = 12;
    let m = parseInt(mStr || "0", 10);
    if (isNaN(m)) m = 0;
    const period: "AM" | "PM" = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return { hour12: h12, minute: m, ampm: period };
  }, [value]);

  const updateTime = (nextH12: number, nextMin: number, nextPeriod: "AM" | "PM") => {
    let h24 = nextH12 % 12;
    if (nextPeriod === "PM") h24 += 12;
    const formatted = `${String(h24).padStart(2, "0")}:${String(nextMin).padStart(2, "0")}`;
    onChange(formatted);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const hoursList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const minutesList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  return (
    <div ref={containerRef} className="relative">
      <label
        className={cn(
          "block text-sm font-medium mb-1",
          variant === "liquid-glass"
            ? "text-white/90"
            : variant === "glass"
              ? "text-neutral-800 dark:text-white/90"
              : "text-foreground",
        )}
      >
        Time
      </label>
      <input type="hidden" name="time" value={value} />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full cursor-pointer flex items-center justify-between border rounded-xl px-3 py-2 text-sm bg-transparent transition-all outline-none",
          variant === "liquid-glass"
            ? "border-white/25 text-white bg-white/10 hover:bg-white/15 focus:bg-white/20 focus:border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
            : variant === "glass"
              ? "border-black/15 text-neutral-900 bg-black/5 hover:bg-black/10 focus:bg-white/40 focus:border-black/30 dark:border-white/25 dark:text-white dark:bg-white/10 dark:hover:bg-white/15 dark:focus:bg-white/20 dark:focus:border-white/50"
              : "border-input text-foreground bg-background hover:bg-muted/50",
          isOpen && (theme.focusRing || "ring-2 ring-primary/20"),
        )}
      >
        <span className="font-medium truncate">{formatDisplayTime(value)}</span>
        <Clock
          className={cn(
            "w-4 h-4 shrink-0 opacity-70 cursor-pointer",
            variant === "liquid-glass"
              ? "text-white/80"
              : variant === "glass"
                ? "text-neutral-700 dark:text-white/80"
                : "text-muted-foreground",
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full right-0 mt-2 z-50 w-64 rounded-2xl border p-3.5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 cursor-default",
            variant === "liquid-glass"
              ? "bg-black/50 backdrop-blur-3xl border border-white/30 text-white shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.4),inset_-1px_-1px_1px_rgba(255,255,255,0.15)]"
              : variant === "glass"
                ? "bg-white/45 dark:bg-black/60 backdrop-blur-3xl border-white/50 dark:border-white/20 text-neutral-900 dark:text-white shadow-2xl"
                : "bg-popover text-popover-foreground border-border",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={cn(
              "flex items-center justify-between mb-2 pb-1.5 border-b",
              variant === "liquid-glass" ? "border-white/20 text-white" : "border-black/10 dark:border-white/10",
            )}
          >
            <span className={cn(
              "text-xs font-semibold uppercase tracking-wider",
              variant === "liquid-glass" ? "text-white/80" : "opacity-70",
            )}>
              Pick Time
            </span>
            <span className={cn(
              "text-xs font-bold",
              variant === "liquid-glass" ? "text-white drop-shadow-xs" : theme.primaryText || "text-primary",
            )}>
              {formatDisplayTime(value)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 h-44 py-1">
            {/* Hour Column */}
            <div className="flex flex-col overflow-y-auto pr-0.5 space-y-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="text-[10px] uppercase font-semibold text-center opacity-60 mb-0.5">Hr</span>
              {hoursList.map((h) => {
                const isActive = h === hour12;
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateTime(h, minute, ampm);
                    }}
                    className={cn(
                      "py-1 text-xs rounded-md transition-colors cursor-pointer font-medium",
                      isActive
                        ? variant === "liquid-glass"
                          ? "bg-white/30 text-white font-bold border border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                          : cn(theme.primaryBg, "text-white font-bold shadow-xs")
                        : variant === "liquid-glass"
                          ? "hover:bg-white/20 text-white/90"
                          : variant === "glass"
                            ? "hover:bg-black/10 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200"
                            : "hover:bg-muted text-foreground",
                    )}
                  >
                    {String(h).padStart(2, "0")}
                  </button>
                );
              })}
            </div>

            {/* Minute Column */}
            <div className="flex flex-col overflow-y-auto pr-0.5 space-y-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="text-[10px] uppercase font-semibold text-center opacity-60 mb-0.5">Min</span>
              {minutesList.map((m) => {
                const isActive = m === minute;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateTime(hour12, m, ampm);
                    }}
                    className={cn(
                      "py-1 text-xs rounded-md transition-colors cursor-pointer font-medium",
                      isActive
                        ? variant === "liquid-glass"
                          ? "bg-white/30 text-white font-bold border border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                          : cn(theme.primaryBg, "text-white font-bold shadow-xs")
                        : variant === "liquid-glass"
                          ? "hover:bg-white/20 text-white/90"
                          : variant === "glass"
                            ? "hover:bg-black/10 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200"
                            : "hover:bg-muted text-foreground",
                    )}
                  >
                    {String(m).padStart(2, "0")}
                  </button>
                );
              })}
            </div>

            {/* AM / PM Column */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-semibold text-center opacity-60 mb-0.5">Period</span>
              {(["AM", "PM"] as const).map((p) => {
                const isActive = p === ampm;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateTime(hour12, minute, p);
                    }}
                    className={cn(
                      "py-2 text-xs rounded-md font-semibold transition-colors cursor-pointer",
                      isActive
                        ? variant === "liquid-glass"
                          ? "bg-white/30 text-white font-bold border border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                          : cn(theme.primaryBg, "text-white font-bold shadow-xs")
                        : variant === "liquid-glass"
                          ? "hover:bg-white/20 text-white/90"
                          : variant === "glass"
                            ? "hover:bg-black/10 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200"
                            : "hover:bg-muted text-foreground",
                    )}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={cn(
              "mt-2 pt-2 border-t flex justify-end text-xs",
              variant === "liquid-glass" ? "border-white/15 text-white" : "border-black/10 dark:border-white/10",
            )}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className={cn(
                "cursor-pointer px-3 py-1 font-semibold rounded-lg transition-all",
                variant === "liquid-glass"
                  ? "bg-white/20 hover:bg-white/30 border border-white/30 text-white backdrop-blur-md shadow-xs"
                  : "opacity-70 hover:opacity-100",
              )}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// === MAIN CALENDAR DASHBOARD ===
export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM"
  type: string;
  platform: string;
}

export interface CalendarDashboardProps {
  variant?: CalendarVariant;
  color?: CalendarColor;
  className?: string;
  /**
   * Initial events mapped by date key, e.g. `{"2026-10-2": ["pentest", "kickoff"]}`.
   * Month and day are not zero-padded in keys.
   */
  mockEvents?: Record<string, string[]>;
}

export default function CalendarDashboard({
  variant = "default",
  color = "primary",
  mockEvents = {},
}: CalendarDashboardProps) {
  const isDark = useThemeDetector();
  const styles = dashboardVariants[variant] || dashboardVariants.default;
  const theme = colorThemes[color] || colorThemes.primary;
  const isLiquidGlass = variant === "liquid-glass";
  const isGlass = variant === "glass" || variant === "liquid-glass";

  // Check if color is a custom hex (starts with #) or arbitrary CSS color
  const isCustomColor =
    typeof color === "string" &&
    (color.startsWith("#") ||
      color.startsWith("rgb") ||
      color.startsWith("hsl"));

  const customVars = isCustomColor
    ? ({
        "--primary": color,
        "--primary-foreground": "#ffffff",
        "--ring": color,
      } as React.CSSProperties)
    : undefined;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [activePopupEventId, setActivePopupEventId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    types: { pentest: true, kickoff: true } as Record<string, boolean>,
    platforms: { meet: true, slack: true, discord: true } as Record<string, boolean>,
  });

  const toggleFilter = (category: "types" | "platforms", key: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  // Add / Edit Event Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [modalDate, setModalDate] = useState("");
  const [modalTime, setModalTime] = useState("12:00");
  const [eventType, setEventType] = useState("pentest");
  const [eventPlatform, setEventPlatform] = useState("meet");

  // Initial Events Seed
  const initialEvents: CalendarEvent[] = useMemo(() => {
    const defaultTimeSlots = ["09:00", "11:00", "14:00", "16:00", "18:00"];
    let idCounter = 1;
    const list: CalendarEvent[] = [];

    const platforms = ["meet", "slack", "discord"];

    Object.entries(mockEvents).forEach(([dateKey, types]) => {
      const [y, m, d] = dateKey.split("-");
      if (!y || !m || !d) return;
      const formattedDate = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;

      types.forEach((type, idx) => {
        const time = defaultTimeSlots[idx % defaultTimeSlots.length];
        const platform = platforms[idx % platforms.length];
        const title =
          type === "pentest"
            ? `Security Audit & Pentest`
            : `Client Kick-Off Meeting`;

        list.push({
          id: `evt-${idCounter++}`,
          title,
          date: formattedDate,
          time,
          type,
          platform,
        });
      });
    });

    return list;
  }, [mockEvents]);

  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const prevEventsRef = useRef(initialEvents);
  if (prevEventsRef.current !== initialEvents) {
    prevEventsRef.current = initialEvents;
    setEvents(initialEvents);
  }

  // Active Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const typeAllowed = filters.types[e.type] ?? true;
      const platformAllowed = filters.platforms[e.platform] ?? true;
      return typeAllowed && platformAllowed;
    });
  }, [events, filters]);

  // Date Navigation Helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const date = currentDate.getDate();

  const monthName = currentDate.toLocaleString("en-US", { month: "long" });
  const monthShortName = currentDate.toLocaleString("en-US", {
    month: "short",
  });

  const prevPeriod = () => {
    if (view === "month") {
      setCurrentDate(new Date(year, month - 1, 1));
    } else if (view === "week") {
      setCurrentDate(new Date(year, month, date - 7));
    } else {
      setCurrentDate(new Date(year, month, date - 1));
    }
  };

  const nextPeriod = () => {
    if (view === "month") {
      setCurrentDate(new Date(year, month + 1, 1));
    } else if (view === "week") {
      setCurrentDate(new Date(year, month, date + 7));
    } else {
      setCurrentDate(new Date(year, month, date + 1));
    }
  };

  // Calendar Grid Calculation
  const calendarDays = useMemo(() => {
    if (view === "day") {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
      return [{ day: date, isCurrentMonth: true, dateKey }];
    }

    if (view === "week") {
      const curr = new Date(year, month, date);
      const dayOfWeek = curr.getDay();
      const startOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const monday = new Date(year, month, date - startOffset);

      const weekDays = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(
          monday.getFullYear(),
          monday.getMonth(),
          monday.getDate() + i,
        );
        weekDays.push({
          day: d.getDate(),
          isCurrentMonth: d.getMonth() === month,
          dateKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
        });
      }
      return weekDays;
    }

    // view === "month"
    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: { day: number; isCurrentMonth: boolean; dateKey: string }[] = [];

    // Previous month padding
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevDate = new Date(year, month - 1, d);
      days.push({
        day: d,
        isCurrentMonth: false,
        dateKey: `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        dateKey: `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
      });
    }

    // Next month padding (up to 35 or 42 cells total)
    const totalCells = days.length > 35 ? 42 : 35;
    const remaining = totalCells - days.length;
    for (let i = 1; i <= remaining; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        day: i,
        isCurrentMonth: false,
        dateKey: `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
      });
    }

    return days;
  }, [year, month, date, view]);

  // Modal Handlers
  const openAddModalForDate = (dateKey: string, timeStr?: string) => {
    setEditingEvent(null);
    setModalDate(dateKey);
    setModalTime(timeStr || "12:00");
    setEventType("pentest");
    setEventPlatform("meet");
    setIsAddModalOpen(true);
  };

  const openEditModal = (event: CalendarEvent) => {
    setEditingEvent(event);
    setModalDate(event.date);
    setModalTime(event.time);
    setEventType(event.type);
    setEventPlatform(event.platform);
    setIsAddModalOpen(true);
    setActivePopupEventId(null);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingEvent(null);
  };

  const handleSaveEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const dateVal = (formData.get("date") as string) || modalDate;
    const timeVal = (formData.get("time") as string) || modalTime;
    const type = (formData.get("type") as string) || eventType;
    const platform = (formData.get("platform") as string) || eventPlatform;

    if (!title || !dateVal) return;

    if (editingEvent) {
      setEvents((prev) =>
        prev.map((item) =>
          item.id === editingEvent.id
            ? {
                ...item,
                title,
                date: dateVal,
                time: timeVal,
                type,
                platform,
              }
            : item,
        ),
      );
    } else {
      const newEvent: CalendarEvent = {
        id: `evt-${Date.now()}`,
        title,
        date: dateVal,
        time: timeVal,
        type,
        platform,
      };
      setEvents((prev) => [...prev, newEvent]);
    }

    closeModal();
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setActivePopupEventId(null);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Title", "Date", "Time", "Type", "Platform"];
    const csvRows = [headers.join(",")];
    events.forEach((e) => {
      csvRows.push(
        `${e.id},"${e.title}",${e.date},${e.time},${e.type},${e.platform}`,
      );
    });
    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "calendar_events.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={cn(
        isDark ? "dark" : "",
        "w-full h-full max-w-full overflow-hidden relative",
        isLiquidGlass && "isolate [contain:paint] [transform:translateZ(0)]",
      )}
      style={customVars}
    >
      <LiquidGlassSvgFilter />

      {isLiquidGlass && (
        <>
          {/* Inner Clipping Container for Liquid Background Stack */}
          <div className="absolute inset-0 overflow-hidden rounded-[22px] sm:rounded-[28px] pointer-events-none z-0">
            {/* Layer 0: Liquid SVG Displaced Wave Background */}
            <div
              className="absolute -inset-10"
              style={{
                backgroundImage:
                  'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "url(#glass-blur)",
                transform: "scale(1.1)",
              }}
            />

            {/* Layer 1: Contrast overlay & soft backdrop blur */}
            <div className="absolute inset-0 bg-black/30 dark:bg-black/45 backdrop-blur-[2px]" />

            {/* Layer 2: Ambient Drop Shadow & Subtle Glow */}
            <div
              className="absolute inset-0 rounded-[22px] sm:rounded-[28px]"
              style={{
                boxShadow:
                  "0 20px 50px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.08)",
              }}
            />
          </div>

          {/* Layer 3: Specular Inner Border Highlight */}
          <div
            className="absolute inset-0 z-40 pointer-events-none rounded-[22px] sm:rounded-[28px] border border-white/40 dark:border-white/15"
            style={{
              boxShadow:
                "inset 2px 2px 2px 0 rgba(255, 255, 255, 0.45), inset -2px -2px 2px 0 rgba(255, 255, 255, 0.3)",
            }}
          />
        </>
      )}

      <div
        className={cn(
          "w-full max-w-full h-auto flex flex-col lg:flex-row text-foreground font-sans transition-colors duration-300 relative z-10",
          styles.wrapper,
          variant !== "minimal" && !isLiquidGlass ? "rounded-xl" : "",
        )}
      >
        {/* MOBILE SIDEBAR DRAWER OVERLAY */}
        <div
          className={cn(
            "fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-in-out",
            isMobileSidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
        >
          {/* Backdrop */}
          <div
            className={cn(
              "fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 cursor-pointer",
              isMobileSidebarOpen ? "opacity-100" : "opacity-0",
            )}
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          {/* Drawer Container */}
          <div
            className={cn(
              "relative w-72 max-w-[80vw] h-full p-5 overflow-y-auto z-10 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out transform",
              isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
              variant === "liquid-glass"
                ? "bg-black/40 backdrop-blur-2xl border-r border-white/25 text-white shadow-2xl overflow-hidden rounded-r-2xl"
                : variant === "glass"
                  ? "bg-white/25 dark:bg-black/50 backdrop-blur-2xl border-r border-white/25 text-white shadow-2xl"
                  : cn(styles.sidebar, "bg-card text-card-foreground"),
            )}
          >
            {variant === "liquid-glass" && (
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                  className="absolute -inset-10"
                  style={{
                    backgroundImage:
                      'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
                    backgroundSize: "cover",
                    backgroundPosition: "left center",
                    filter: "url(#glass-blur)",
                    transform: "scale(1.1)",
                  }}
                />
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px]" />
              </div>
            )}

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={cn("font-semibold text-lg", isGlass ? "text-white" : "text-foreground")}>
                    {monthName} {year}
                  </h2>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={cn(
                      "p-1.5 rounded-lg transition-colors cursor-pointer",
                      isGlass
                        ? "hover:bg-white/15 text-white/80 hover:text-white"
                        : "hover:bg-muted text-muted-foreground",
                    )}
                    aria-label="Close Sidebar"
                  >
                    <X className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>

                <hr className={cn("my-4", isGlass ? "border-white/20" : "border-border")} />

                <div className="mb-6">
                  <div className={cn("flex items-center justify-between mb-3 cursor-pointer", isGlass ? "text-white/80" : "text-muted-foreground")}>
                    <h3 className="text-sm font-medium">Events</h3>
                    <ChevronDown className="w-4 h-4 cursor-pointer" />
                  </div>
                  <div className="space-y-2">
                    <div
                      onClick={() => toggleFilter("types", "pentest")}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-colors",
                        isGlass
                          ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white"
                          : "bg-muted/50 hover:bg-muted text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-4 bg-yellow-400 rounded-full"></div>
                        <span className={cn("text-sm font-medium", isGlass ? "text-white" : "text-foreground")}>Pentest</span>
                      </div>
                      {filters.types.pentest ? (
                        <CheckSquare
                          className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                        />
                      ) : (
                        <Square className={cn("w-4 h-4 cursor-pointer", isGlass ? "text-white/50" : "text-muted-foreground")} />
                      )}
                    </div>
                    <div
                      onClick={() => toggleFilter("types", "kickoff")}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-colors",
                        isGlass
                          ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white"
                          : "bg-muted/50 hover:bg-muted text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
                        <span className={cn("text-sm font-medium", isGlass ? "text-white" : "text-foreground")}>Kick-Off</span>
                      </div>
                      {filters.types.kickoff ? (
                        <CheckSquare
                          className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                        />
                      ) : (
                        <Square className={cn("w-4 h-4 cursor-pointer", isGlass ? "text-white/50" : "text-muted-foreground")} />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className={cn("flex items-center justify-between mb-3 cursor-pointer", isGlass ? "text-white/80" : "text-muted-foreground")}>
                    <h3 className="text-sm font-medium">Platforms</h3>
                    <ChevronDown className="w-4 h-4 cursor-pointer" />
                  </div>
                  <div className="space-y-2">
                    <div
                      onClick={() => toggleFilter("platforms", "meet")}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-colors",
                        isGlass
                          ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white"
                          : "bg-muted/50 hover:bg-muted text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Video className={cn("w-4 h-4", isGlass ? "text-emerald-400" : "text-emerald-600 dark:text-emerald-400")} />
                        <span className={cn("text-sm font-medium", isGlass ? "text-white" : "text-foreground")}>Google Meet</span>
                      </div>
                      {filters.platforms.meet ? (
                        <CheckSquare
                          className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                        />
                      ) : (
                        <Square className={cn("w-4 h-4 cursor-pointer", isGlass ? "text-white/50" : "text-muted-foreground")} />
                      )}
                    </div>
                    <div
                      onClick={() => toggleFilter("platforms", "slack")}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-colors",
                        isGlass
                          ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white"
                          : "bg-muted/50 hover:bg-muted text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Hash className={cn("w-4 h-4", isGlass ? "text-sky-400" : "text-sky-500")} />
                        <span className={cn("text-sm font-medium", variant === "glass" ? "text-neutral-900 dark:text-white" : isGlass ? "text-white" : "text-foreground")}>Slack</span>
                      </div>
                      {filters.platforms.slack ? (
                        <CheckSquare
                          className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                        />
                      ) : (
                        <Square className={cn("w-4 h-4 cursor-pointer", isGlass ? "text-white/50" : "text-muted-foreground")} />
                      )}
                    </div>
                    <div
                      onClick={() => toggleFilter("platforms", "discord")}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-colors",
                        isGlass
                          ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white"
                          : "bg-muted/50 hover:bg-muted text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className={cn("w-4 h-4", isGlass ? "text-indigo-400" : "text-indigo-500")} />
                        <span className={cn("text-sm font-medium", isGlass ? "text-white" : "text-foreground")}>Discord</span>
                      </div>
                      {filters.platforms.discord ? (
                        <CheckSquare
                          className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                        />
                      ) : (
                        <Square className={cn("w-4 h-4 cursor-pointer", isGlass ? "text-white/50" : "text-muted-foreground")} />
                      )}
                    </div>
                  </div>
                </div>

                <hr className={cn("my-5", isGlass ? "border-white/20" : "border-border")} />

                <button
                  onClick={() => {
                    handleExportCSV();
                    setIsMobileSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer",
                    isGlass
                      ? "border border-white/25 bg-white/15 hover:bg-white/25 text-white backdrop-blur-md shadow-sm"
                      : "border border-border bg-muted/50 hover:bg-muted text-foreground",
                  )}
                >
                  Export CSV <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR FILTERS */}
        <aside
          className={cn(
            "w-64 flex-shrink-0 p-5 overflow-y-auto hidden lg:block z-10 transition-colors duration-300 relative",
            styles.sidebar,
            variant === "liquid-glass" && "rounded-l-[22px] sm:rounded-l-[28px]",
          )}
        >
          {variant === "liquid-glass" && (
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-l-[22px] sm:rounded-l-[28px]">
              <div
                className="absolute -inset-10"
                style={{
                  backgroundImage:
                    'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "left center",
                  filter: "url(#glass-blur)",
                  transform: "scale(1.1)",
                }}
              />
              <div className="absolute inset-0 bg-black/35 dark:bg-black/50 backdrop-blur-[2px]" />
            </div>
          )}

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className={cn("font-semibold text-lg", variant === "liquid-glass" ? "text-white" : variant === "glass" ? "text-neutral-900 dark:text-white" : "text-foreground")}>
                {monthName} {year}
              </h2>
              <div className={cn("flex gap-1", variant === "liquid-glass" ? "text-white/80" : variant === "glass" ? "text-neutral-700 dark:text-white/80" : "text-muted-foreground")}>
                <button
                  onClick={prevPeriod}
                  className={cn(
                    "p-1 rounded transition-colors cursor-pointer",
                    variant === "liquid-glass"
                      ? "hover:bg-white/15 hover:text-white"
                      : variant === "glass"
                        ? "hover:bg-white/40 hover:text-neutral-900 dark:hover:bg-white/15 dark:hover:text-white"
                        : "hover:bg-muted/50",
                  )}
                >
                  <ChevronLeft className="w-4 h-4 cursor-pointer" />
                </button>
                <button
                  onClick={nextPeriod}
                  className={cn(
                    "p-1 rounded transition-colors cursor-pointer",
                    variant === "liquid-glass"
                      ? "hover:bg-white/15 hover:text-white"
                      : variant === "glass"
                        ? "hover:bg-white/40 hover:text-neutral-900 dark:hover:bg-white/15 dark:hover:text-white"
                        : "hover:bg-muted/50",
                  )}
                >
                  <ChevronRight className="w-4 h-4 cursor-pointer" />
                </button>
              </div>
            </div>

            <hr className={cn("my-6", isGlass ? "border-white/20" : "border-border")} />

            <div className="mb-6">
              <div className={cn("flex items-center justify-between mb-3 cursor-pointer", isGlass ? "text-white/80" : "text-muted-foreground")}>
                <h3 className="text-sm font-medium">Events</h3>
                <ChevronDown className="w-4 h-4 cursor-pointer" />
              </div>
              <div className="space-y-2">
                <div
                  onClick={() => toggleFilter("types", "pentest")}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
                    variant === "liquid-glass"
                      ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white"
                      : variant === "glass"
                        ? "bg-white/40 hover:bg-white/60 border border-white/50 text-neutral-900 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/15 dark:text-white"
                        : "bg-muted/50 hover:bg-muted text-foreground",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-4 bg-yellow-400 rounded-full"></div>
                    <span className={cn("text-sm font-medium", variant === "liquid-glass" ? "text-white" : variant === "glass" ? "text-neutral-900 dark:text-white" : "text-foreground")}>Pentest</span>
                  </div>
                  {filters.types.pentest ? (
                    <CheckSquare
                      className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                    />
                  ) : (
                    <Square className={cn("w-4 h-4 cursor-pointer", isGlass ? "text-white/50" : "text-muted-foreground")} />
                  )}
                </div>
                <div
                  onClick={() => toggleFilter("types", "kickoff")}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
                    variant === "liquid-glass"
                      ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white"
                      : variant === "glass"
                        ? "bg-white/40 hover:bg-white/60 border border-white/50 text-neutral-900 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/15 dark:text-white"
                        : "bg-muted/50 hover:bg-muted text-foreground",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
                    <span className={cn("text-sm font-medium", variant === "liquid-glass" ? "text-white" : variant === "glass" ? "text-neutral-900 dark:text-white" : "text-foreground")}>Kick-Off</span>
                  </div>
                  {filters.types.kickoff ? (
                    <CheckSquare
                      className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                    />
                  ) : (
                    <Square className={cn("w-4 h-4 cursor-pointer", isGlass ? "text-white/50" : "text-muted-foreground")} />
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className={cn("flex items-center justify-between mb-3 cursor-pointer", isGlass ? "text-white/80" : "text-muted-foreground")}>
                <h3 className="text-sm font-medium">Platforms</h3>
                <ChevronDown className="w-4 h-4 cursor-pointer" />
              </div>
              <div className="space-y-2">
                <div
                  onClick={() => toggleFilter("platforms", "meet")}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
                    variant === "liquid-glass"
                      ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white"
                      : variant === "glass"
                        ? "bg-white/40 hover:bg-white/60 border border-white/50 text-neutral-900 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/15 dark:text-white"
                        : "bg-muted/50 hover:bg-muted text-foreground",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Video className={cn("w-4 h-4", isGlass ? "text-emerald-400" : "text-emerald-600 dark:text-emerald-400")} />
                    <span className={cn("text-sm font-medium", variant === "liquid-glass" ? "text-white" : variant === "glass" ? "text-neutral-900 dark:text-white" : "text-foreground")}>Google Meet</span>
                  </div>
                  {filters.platforms.meet ? (
                    <CheckSquare
                      className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                    />
                  ) : (
                    <Square className={cn("w-4 h-4 cursor-pointer", isGlass ? "text-white/50" : "text-muted-foreground")} />
                  )}
                </div>
                <div
                  onClick={() => toggleFilter("platforms", "slack")}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
                    variant === "liquid-glass"
                      ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white"
                      : variant === "glass"
                        ? "bg-white/40 hover:bg-white/60 border border-white/50 text-neutral-900 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/15 dark:text-white"
                        : "bg-muted/50 hover:bg-muted text-foreground",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Hash className={cn("w-4 h-4", isGlass ? "text-sky-400" : "text-sky-500")} />
                    <span className={cn("text-sm font-medium", variant === "liquid-glass" ? "text-white" : variant === "glass" ? "text-neutral-900 dark:text-white" : "text-foreground")}>Slack</span>
                  </div>
                  {filters.platforms.slack ? (
                    <CheckSquare
                      className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                    />
                  ) : (
                    <Square className={cn("w-4 h-4 cursor-pointer", isGlass ? "text-white/50" : "text-muted-foreground")} />
                  )}
                </div>
                <div
                  onClick={() => toggleFilter("platforms", "discord")}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
                    variant === "liquid-glass"
                      ? "bg-white/10 hover:bg-white/20 border border-white/15 text-white"
                      : variant === "glass"
                        ? "bg-white/40 hover:bg-white/60 border border-white/50 text-neutral-900 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/15 dark:text-white"
                        : "bg-muted/50 hover:bg-muted text-foreground",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className={cn("w-4 h-4", isGlass ? "text-indigo-400" : "text-indigo-500")} />
                    <span className={cn("text-sm font-medium", variant === "liquid-glass" ? "text-white" : variant === "glass" ? "text-neutral-900 dark:text-white" : "text-foreground")}>Discord</span>
                  </div>
                  {filters.platforms.discord ? (
                    <CheckSquare
                      className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                    />
                  ) : (
                    <Square className={cn("w-4 h-4 cursor-pointer", isGlass ? "text-white/50" : "text-muted-foreground")} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CALENDAR AREA */}
        <main className="flex-1 flex flex-col min-w-0 h-full">
          <header
            className={cn(
              "flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 sm:p-5 gap-4 flex-shrink-0 z-10 transition-colors duration-300",
              styles.header,
            )}
          >
            {/* Top Row: Title, Nav & Add Button */}
            <div className="flex items-center justify-between w-full lg:w-auto gap-4">
              <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className={cn(
                    "p-2 rounded-lg transition-colors cursor-pointer",
                    variant === "liquid-glass"
                      ? "bg-white/15 hover:bg-white/25 border border-white/20 text-white backdrop-blur-md"
                      : variant === "glass"
                        ? "bg-white/40 hover:bg-white/60 border border-white/40 text-neutral-900 dark:bg-white/15 dark:hover:bg-white/25 dark:border-white/20 dark:text-white backdrop-blur-md"
                        : "bg-muted/80 hover:bg-muted border border-border text-foreground",
                  )}
                  aria-label="Open Calendar Filters"
                >
                  <Menu className="w-5 h-5 cursor-pointer" />
                </button>
                <div className={cn("flex gap-1", variant === "liquid-glass" ? "text-white/80" : variant === "glass" ? "text-neutral-700 dark:text-white/80" : "text-muted-foreground")}>
                  <button
                    onClick={prevPeriod}
                    className={cn(
                      "p-1 rounded transition-colors cursor-pointer",
                      variant === "liquid-glass"
                        ? "hover:bg-white/15 hover:text-white"
                        : variant === "glass"
                          ? "hover:bg-white/40 hover:text-neutral-900 dark:hover:bg-white/15 dark:hover:text-white"
                          : "hover:bg-muted/50",
                    )}
                  >
                    <ChevronLeft className="w-4 h-4 cursor-pointer" />
                  </button>
                  <button
                    onClick={nextPeriod}
                    className={cn(
                      "p-1 rounded transition-colors cursor-pointer",
                      variant === "liquid-glass"
                        ? "hover:bg-white/15 hover:text-white"
                        : variant === "glass"
                          ? "hover:bg-white/40 hover:text-neutral-900 dark:hover:bg-white/15 dark:hover:text-white"
                          : "hover:bg-muted/50",
                    )}
                  >
                    <ChevronRight className="w-4 h-4 cursor-pointer" />
                  </button>
                </div>
              </div>

              <h1 className={cn("text-base sm:text-2xl font-semibold whitespace-nowrap lg:hidden", variant === "liquid-glass" ? "text-white" : variant === "glass" ? "text-neutral-900 dark:text-white" : "text-foreground")}>
                <span className="sm:hidden">
                  {view === "day"
                    ? `${monthShortName} ${date}, ${year}`
                    : `${monthShortName} ${year}`}
                </span>
                <span className="hidden sm:inline">
                  {view === "day"
                    ? `${monthName} ${date}, ${year}`
                    : `${monthName} ${year}`}
                </span>
              </h1>

              {/* Add Button Always at Top Row */}
              <button
                onClick={() => {
                  setEditingEvent(null);
                  setModalDate(`${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`);
                  setModalTime("12:00");
                  setEventType("pentest");
                  setEventPlatform("meet");
                  setIsAddModalOpen(true);
                }}
                className={cn(
                  "flex items-center gap-2 cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md ml-auto sm:ml-0",
                  theme.primaryBg,
                )}
              >
                <Plus className="w-4 h-4 cursor-pointer" /> <span className="hidden sm:inline">Add</span>
              </button>
            </div>

            {/* Bottom Row: View Selectors + Export Button */}
            <div className="flex items-center w-full lg:w-auto gap-2 sm:gap-4 justify-between lg:justify-end">
              <div className={cn(
                "flex p-1 rounded-xl text-xs sm:text-sm font-medium shrink-0 justify-start",
                variant === "liquid-glass"
                  ? "bg-black/30 dark:bg-black/40 border border-white/20 backdrop-blur-md"
                  : variant === "glass"
                    ? "bg-white/30 dark:bg-white/10 border border-white/40 dark:border-white/15 backdrop-blur-md"
                    : "bg-muted/60",
              )}>
                <button
                  onClick={() => setView("day")}
                  className={cn(
                    "px-3 sm:px-4 py-1.5 cursor-pointer rounded-lg shadow-sm transition-all",
                    view === "day"
                      ? variant === "liquid-glass"
                        ? "bg-white/25 text-white font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/30 backdrop-blur-md"
                        : theme.lightBg
                      : variant === "liquid-glass"
                        ? "text-white/70 hover:text-white hover:bg-white/10"
                        : variant === "glass"
                          ? "text-neutral-700 hover:text-neutral-900 dark:text-white/70 dark:hover:text-white"
                          : "hover:text-foreground text-muted-foreground",
                  )}
                >
                  Day
                </button>
                <button
                  onClick={() => setView("week")}
                  className={cn(
                    "px-3 sm:px-4 py-1.5 cursor-pointer rounded-lg shadow-sm transition-all",
                    view === "week"
                      ? variant === "liquid-glass"
                        ? "bg-white/25 text-white font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/30 backdrop-blur-md"
                        : theme.lightBg
                      : variant === "liquid-glass"
                        ? "text-white/70 hover:text-white hover:bg-white/10"
                        : variant === "glass"
                          ? "text-neutral-700 hover:text-neutral-900 dark:text-white/70 dark:hover:text-white"
                          : "hover:text-foreground text-muted-foreground",
                  )}
                >
                  Week
                </button>
                <button
                  onClick={() => setView("month")}
                  className={cn(
                    "px-3 sm:px-4 py-1.5 cursor-pointer rounded-lg shadow-sm transition-all",
                    view === "month"
                      ? variant === "liquid-glass"
                        ? "bg-white/25 text-white font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/30 backdrop-blur-md"
                        : theme.lightBg
                      : variant === "liquid-glass"
                        ? "text-white/70 hover:text-white hover:bg-white/10"
                        : variant === "glass"
                          ? "text-neutral-700 hover:text-neutral-900 dark:text-white/70 dark:hover:text-white"
                          : "hover:text-foreground text-muted-foreground",
                  )}
                >
                  Month
                </button>
              </div>

              <button
                onClick={handleExportCSV}
                className={cn(
                  "hidden sm:flex items-center cursor-pointer gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors",
                  variant === "liquid-glass"
                    ? "border border-white/25 bg-white/15 hover:bg-white/25 text-white backdrop-blur-md shadow-xs"
                    : variant === "glass"
                      ? "border border-white/40 dark:border-white/20 bg-white/30 hover:bg-white/50 text-neutral-900 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white backdrop-blur-md shadow-xs"
                      : "border border-border hover:bg-foreground/5",
                )}
              >
                Export <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 cursor-pointer" />
              </button>
            </div>
          </header>

          {/* Grid Container */}
          <div
            className={cn(
              "flex-1 overflow-hidden relative transition-colors duration-300 flex flex-col",
              styles.gridOuter,
            )}
          >
            {view === "month" ? (
              <div className="w-full min-w-0 flex flex-col h-full">
                <div
                  className={cn(
                    "sticky top-0 z-20 grid grid-cols-7 transition-colors duration-300",
                    styles.gridHeader,
                  )}
                >
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((dayName, idx) => (
                    <div
                      key={dayName}
                      className={cn(
                        "py-1.5 sm:py-3 px-1 sm:px-4 text-[11px] sm:text-sm font-semibold text-center truncate",
                        variant === "liquid-glass"
                          ? "text-white/90"
                          : variant === "glass"
                            ? "text-neutral-900 dark:text-white/90"
                            : "text-muted-foreground",
                        variant !== "minimal" && idx !== 6
                          ? isGlass ? "border-r border-white/15" : "border-r border-border"
                          : "",
                      )}
                    >
                      <span className="hidden sm:inline">{dayName}</span>
                      <span className="sm:hidden">{dayName.slice(0, 3)}</span>
                    </div>
                  ))}
                </div>

                <div
                  className={cn(
                    "grid flex-1 grid-cols-7 auto-rows-[minmax(65px,1fr)] md:auto-rows-[minmax(95px,1fr)] lg:auto-rows-[minmax(120px,1fr)]",
                    styles.gridGap,
                  )}
                >
                  {calendarDays.map((dayObj, index) => {
                    const dayEvents = filteredEvents.filter(
                      (e) => e.date === dayObj.dateKey,
                    );
                    return (
                      <CalendarCell
                        key={index}
                        day={dayObj.day}
                        events={dayEvents}
                        isGray={!dayObj.isCurrentMonth}
                        activePopupEventId={activePopupEventId}
                        setActivePopupEventId={setActivePopupEventId}
                        colIndex={index % 7}
                        rowIndex={Math.floor(index / 7)}
                        dateStr={dayObj.dateKey.split("-").reverse().join(".")}
                        onDeleteEvent={deleteEvent}
                        onEditEvent={openEditModal}
                        onClickCell={() => openAddModalForDate(dayObj.dateKey)}
                        cellClass={styles.cellBg}
                        theme={theme}
                        variant={variant}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className={cn("w-full min-w-0 flex flex-col flex-1 overflow-y-auto max-h-[580px] sm:max-h-[660px] [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent]", isGlass ? "bg-transparent" : "bg-card/60")}>
                {/* Time Grid Sticky Header Bar */}
                <div
                  className={cn(
                    "sticky top-0 z-20 flex border-b transition-colors duration-300 shrink-0",
                    isGlass ? "border-white/15" : "border-border",
                    styles.gridHeader,
                  )}
                >
                  <div className={cn(
                    "w-16 sm:w-20 shrink-0 py-2 px-1 text-center text-xs font-semibold border-r flex items-center justify-center",
                    variant === "liquid-glass"
                      ? "text-white/80 border-white/15 bg-white/5"
                      : variant === "glass"
                        ? "text-neutral-900 font-semibold dark:text-white/80 border-white/15 bg-white/20 dark:bg-white/5"
                        : "text-muted-foreground border-border/70 bg-muted/20",
                  )}>
                    Time
                  </div>
                  <div
                    className={cn(
                      "flex-1 grid",
                      view === "week" ? "grid-cols-7" : "grid-cols-1",
                    )}
                  >
                    {calendarDays.map((dayObj, idx) => {
                      const [y, m, d] = dayObj.dateKey.split("-").map(Number);
                      const dateObj = new Date(y, m - 1, d);
                      const dayName = dateObj.toLocaleDateString("en-US", {
                        weekday: "short",
                      });
                      const fullDayName = dateObj.toLocaleDateString("en-US", {
                        weekday: "long",
                      });
                      const isToday =
                        new Date().toDateString() === dateObj.toDateString();

                      return (
                        <div
                          key={dayObj.dateKey}
                          className={cn(
                            "py-2 px-1 text-center font-medium text-xs sm:text-sm truncate flex flex-col items-center justify-center gap-0.5",
                            variant === "liquid-glass"
                              ? "text-white"
                              : variant === "glass"
                                ? "text-neutral-900 dark:text-white"
                                : "text-foreground",
                            idx < calendarDays.length - 1
                              ? isGlass ? "border-r border-white/15" : "border-r border-border"
                              : "",
                          )}
                        >
                          <span className={cn(
                            "text-[10px] sm:text-xs uppercase tracking-wider font-semibold",
                            variant === "liquid-glass"
                              ? "text-white/70"
                              : variant === "glass"
                                ? "text-neutral-700 dark:text-white/70"
                                : "text-muted-foreground",
                          )}>
                            {view === "day" ? fullDayName : dayName}
                          </span>
                          <span
                            className={cn(
                              "text-xs sm:text-sm font-semibold w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full transition-colors",
                              isToday
                                ? theme.primaryBg
                                : variant === "liquid-glass"
                                  ? "text-white hover:bg-white/20"
                                  : variant === "glass"
                                    ? "text-neutral-900 hover:bg-white/30 dark:text-white dark:hover:bg-white/15"
                                    : "text-foreground hover:bg-muted",
                            )}
                          >
                            {dayObj.day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Time Grid Body */}
                <div className="flex-1 flex flex-col">
                  {TIME_SLOTS.map((slot, slotIdx) => (
                    <div
                      key={slot.label}
                      className={cn("flex min-h-[38px] sm:min-h-[44px] border-b", isGlass ? "border-white/15" : "border-border/70")}
                    >
                      {/* Time Label Column */}
                      <div className={cn(
                        "w-16 sm:w-20 shrink-0 px-1 py-1 flex items-center justify-center text-[10px] sm:text-xs font-semibold border-r select-none",
                        variant === "liquid-glass"
                          ? "text-white/80 border-white/15 bg-white/5"
                          : variant === "glass"
                            ? "text-neutral-900 font-semibold dark:text-white/80 border-white/15 bg-white/20 dark:bg-white/5"
                            : "text-muted-foreground border-border/70 bg-muted/20",
                      )}>
                        {slot.label}
                      </div>

                      {/* Days Grid Columns */}
                      <div
                        className={cn(
                          "flex-1 grid",
                          view === "week" ? "grid-cols-7" : "grid-cols-1",
                        )}
                      >
                        {calendarDays.map((dayObj, dayIdx) => {
                          const slotEvents = filteredEvents.filter((e) => {
                            if (e.date !== dayObj.dateKey) return false;
                            return getSlotIndexForTime(e.time) === slotIdx;
                          });

                          return (
                            <TimeGridCell
                              key={`${dayObj.dateKey}-${slot.label}`}
                              events={slotEvents}
                              activePopupEventId={activePopupEventId}
                              setActivePopupEventId={setActivePopupEventId}
                              colIndex={view === "day" ? 0 : dayIdx}
                              rowIndex={slotIdx}
                              dateStr={dayObj.dateKey
                                .split("-")
                                .reverse()
                                .join(".")}
                              onDeleteEvent={deleteEvent}
                              onEditEvent={openEditModal}
                              onClickCell={() =>
                                openAddModalForDate(
                                  dayObj.dateKey,
                                  slot.timeStr,
                                )
                              }
                              cellClass={cn(
                                styles.cellBg,
                                dayIdx < calendarDays.length - 1
                                  ? isGlass ? "border-r border-white/15" : "border-r border-border/70"
                                  : "",
                              )}
                              theme={theme}
                              variant={variant}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* --- ADD / EDIT EVENT MODAL --- */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 cursor-pointer"
          onClick={closeModal}
        >
          <div
            className={cn(
              "w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200 cursor-default relative",
              variant === "liquid-glass"
                ? "rounded-[22px] sm:rounded-[28px] text-white shadow-[0_25px_60px_rgba(0,0,0,0.5)] border-0"
                : variant === "glass"
                  ? "rounded-xl bg-white/50 dark:bg-black/60 backdrop-blur-3xl border border-white/50 dark:border-white/20 text-neutral-900 dark:text-white shadow-2xl"
                  : "rounded-xl bg-card border border-border",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {variant === "liquid-glass" && (
              <>
                {/* Modal Layer 0: Liquid SVG Displaced Wave Background */}
                <div className="absolute inset-0 overflow-hidden rounded-[22px] sm:rounded-[28px] pointer-events-none z-0">
                  <div
                    className="absolute -inset-10"
                    style={{
                      backgroundImage:
                        'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "url(#glass-blur)",
                      transform: "scale(1.1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px]" />
                  <div
                    className="absolute inset-0 rounded-[22px] sm:rounded-[28px]"
                    style={{
                      boxShadow:
                        "0 20px 50px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.08)",
                    }}
                  />
                </div>
                {/* Modal Layer 3: Specular Inner Border Highlight */}
                <div
                  className="absolute inset-0 z-30 pointer-events-none rounded-[22px] sm:rounded-[28px] border border-white/40 dark:border-white/15"
                  style={{
                    boxShadow:
                      "inset 2px 2px 2px 0 rgba(255, 255, 255, 0.45), inset -2px -2px 2px 0 rgba(255, 255, 255, 0.3)",
                  }}
                />
              </>
            )}

            <div className="relative z-40 flex flex-col flex-1">
              <div
                className={cn(
                  "flex items-center justify-between px-6 py-4 border-b",
                  variant === "liquid-glass"
                    ? "border-white/20 dark:border-white/15 bg-white/10 dark:bg-white/5 text-white"
                    : variant === "glass"
                      ? "border-black/10 dark:border-white/20"
                      : "border-border",
                )}
              >
                <h3
                  className={cn(
                    "font-semibold text-lg",
                    variant === "liquid-glass"
                      ? "text-white"
                      : variant === "glass"
                        ? "text-neutral-900 dark:text-white"
                        : "text-foreground",
                  )}
                >
                  {editingEvent ? "Update Event" : "Add New Event"}
                </h3>
                <button
                  onClick={closeModal}
                  className={cn(
                    "cursor-pointer p-1 rounded-md transition-colors",
                    variant === "liquid-glass"
                      ? "text-white/80 hover:text-white hover:bg-white/15"
                      : variant === "glass"
                        ? "text-neutral-600 hover:text-neutral-900 hover:bg-black/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10"
                        : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <X className="w-5 h-5 cursor-pointer" />
                </button>
              </div>
              <form onSubmit={handleSaveEvent} className="p-6 space-y-4">
                <div>
                  <label
                    className={cn(
                      "block text-sm font-medium mb-1",
                      variant === "liquid-glass"
                        ? "text-white/90"
                        : variant === "glass"
                          ? "text-neutral-800 dark:text-white/90"
                          : "text-foreground",
                    )}
                  >
                    Event Title
                  </label>
                  <input
                    required
                    name="title"
                    type="text"
                    defaultValue={editingEvent ? editingEvent.title : ""}
                    placeholder="e.g. Q3 Roadmap Review"
                    className={cn(
                      "w-full cursor-text border rounded-xl px-3 py-2 text-sm bg-transparent focus:ring-2 focus:outline-none transition-all",
                      variant === "liquid-glass"
                        ? "border-white/25 text-white placeholder:text-white/50 bg-white/10 hover:bg-white/15 focus:bg-white/20 focus:border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                        : variant === "glass"
                          ? "border-black/15 text-neutral-900 placeholder:text-neutral-400 bg-black/5 hover:bg-black/10 focus:bg-white/40 focus:border-black/30 dark:border-white/25 dark:text-white dark:placeholder:text-white/50 dark:bg-white/10 dark:hover:bg-white/15 dark:focus:bg-white/20 dark:focus:border-white/50"
                          : "border-input text-foreground",
                      theme.focusRing,
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <CustomDatePicker
                    value={modalDate}
                    onChange={setModalDate}
                    variant={variant}
                    theme={theme}
                  />
                  <CustomTimePicker
                    value={modalTime}
                    onChange={setModalTime}
                    variant={variant}
                    theme={theme}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-1",
                        variant === "liquid-glass"
                          ? "text-white/90"
                          : variant === "glass"
                            ? "text-neutral-800 dark:text-white/90"
                            : "text-foreground",
                      )}
                    >
                      Event Type
                    </label>
                    <input type="hidden" name="type" value={eventType} />
                    <SelectBlock
                      options={EVENT_TYPE_OPTIONS}
                      value={eventType}
                      onChange={setEventType}
                      color={color}
                      variant={variant === "liquid-glass" ? "liquid-glass" : isGlass ? "glass" : "default"}
                      inputSize="sm"
                    />
                  </div>
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-1",
                        variant === "liquid-glass"
                          ? "text-white/90"
                          : variant === "glass"
                            ? "text-neutral-800 dark:text-white/90"
                            : "text-foreground",
                      )}
                    >
                      Platform
                    </label>
                    <input type="hidden" name="platform" value={eventPlatform} />
                    <SelectBlock
                      options={EVENT_PLATFORM_OPTIONS}
                      value={eventPlatform}
                      onChange={setEventPlatform}
                      color={color}
                      variant={variant === "liquid-glass" ? "liquid-glass" : isGlass ? "glass" : "default"}
                      inputSize="sm"
                    />
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer",
                      variant === "liquid-glass"
                        ? "text-white/80 hover:bg-white/15 hover:text-white"
                        : variant === "glass"
                          ? "text-neutral-700 hover:bg-black/5 hover:text-neutral-900 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
                          : "text-foreground hover:bg-muted",
                    )}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={cn(
                      "px-4 py-2 text-sm font-semibold rounded-xl transition-colors shadow-sm cursor-pointer",
                      theme.primaryBg,
                    )}
                  >
                    {editingEvent ? "Update Event" : "Add Event"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Shared by the month cell and the time-grid cell. */
interface CalendarCellBaseProps {
  events?: CalendarEvent[];
  activePopupEventId: string | null;
  setActivePopupEventId: (id: string | null) => void;
  colIndex: number;
  rowIndex: number;
  dateStr: string;
  onDeleteEvent: (id: string) => void;
  onEditEvent: (event: CalendarEvent) => void;
  onClickCell: () => void;
  cellClass?: string;
  theme: Record<string, string>;
  variant?: CalendarVariant;
}

interface CalendarCellProps extends CalendarCellBaseProps {
  day: number | string;
  isGray?: boolean;
}

type TimeGridCellProps = CalendarCellBaseProps;

// === Sub Component: CalendarCell ===
function CalendarCell({
  day,
  events = [],
  isGray,
  activePopupEventId,
  setActivePopupEventId,
  colIndex,
  rowIndex,
  dateStr,
  onDeleteEvent,
  onEditEvent,
  onClickCell,
  cellClass,
  theme,
  variant,
}: CalendarCellProps) {
  const popupXClass = colIndex >= 4 ? "sm:right-0" : "sm:left-0";
  const popupYClass = rowIndex >= 4 ? "sm:bottom-full sm:mb-2" : "sm:top-12";
  const isAnyPopupOpen = events.some((e: CalendarEvent) => e.id === activePopupEventId);

  return (
    <div
      onClick={onClickCell}
      className={cn(
        `relative flex flex-col p-1.5 sm:p-2 h-full transition-colors cursor-pointer ${isAnyPopupOpen ? "z-30" : "z-10 hover:z-20"} ${
          isGray
            ? variant === "liquid-glass"
              ? "text-white/40 opacity-50"
              : variant === "glass"
                ? "text-neutral-400 dark:text-white/40 opacity-50"
                : "text-muted-foreground opacity-60"
            : variant === "liquid-glass"
              ? "text-white font-semibold"
              : variant === "glass"
                ? "text-neutral-900 font-semibold dark:text-white"
                : "text-foreground"
        }`,
        cellClass,
      )}
    >
      <div
        className={`text-xs sm:text-sm font-medium mb-1 sm:mb-2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded shrink-0`}
      >
        {day}
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 sm:space-y-1.5 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {events.map((event: CalendarEvent) => {
          const isPopupOpen = activePopupEventId === event.id;
          const isPentest = event.type === "pentest";
          const borderClass = isGray
            ? variant === "liquid-glass"
              ? "border-white/10 bg-white/10 text-white/50"
              : variant === "glass"
                ? "border-black/10 bg-black/5 text-neutral-500 dark:border-white/10 dark:bg-white/10 dark:text-white/50"
                : "border-border bg-muted text-muted-foreground"
            : isPentest
              ? variant === "liquid-glass"
                ? "border-amber-400/40 bg-amber-500/25 text-amber-100 backdrop-blur-sm shadow-xs font-medium"
                : variant === "glass"
                  ? "border-amber-500/50 bg-amber-400/30 text-amber-950 font-medium dark:border-amber-400/40 dark:bg-amber-500/25 dark:text-amber-100 backdrop-blur-sm shadow-xs"
                  : "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800/50 dark:bg-yellow-900/30 dark:text-yellow-400"
              : variant === "liquid-glass"
                ? "border-emerald-400/40 bg-emerald-500/25 text-emerald-100 backdrop-blur-sm shadow-xs font-medium"
                : variant === "glass"
                  ? "border-emerald-500/50 bg-emerald-400/30 text-emerald-950 font-medium dark:border-emerald-400/40 dark:bg-emerald-500/25 dark:text-emerald-100 backdrop-blur-sm shadow-xs"
                  : "border-green-200 bg-green-50 text-green-800 dark:border-green-800/50 dark:bg-green-900/30 dark:text-green-400";
          const PlatformIcon =
            event.platform === "meet"
              ? Video
              : event.platform === "slack"
                ? Hash
                : MessageSquare;
          const iconColor =
            event.platform === "meet"
              ? "text-green-600"
              : event.platform === "slack"
                ? "text-blue-500"
                : "text-indigo-500";

          return (
            <div
              key={event.id}
              onClick={(e) => {
                e.stopPropagation();
                setActivePopupEventId(isPopupOpen ? null : event.id);
              }}
              className={`flex items-center justify-between px-1 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded border cursor-pointer hover:brightness-95 transition-all ${borderClass}`}
            >
              <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                <PlatformIcon
                  className={cn(
                    "w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 cursor-pointer",
                    variant === "liquid-glass" || variant === "glass" ? "text-current" : iconColor,
                  )}
                />
                <span className="truncate max-w-[35px] min-[400px]:max-w-[60px] sm:max-w-none cursor-pointer">{event.title}</span>
              </div>
              <span
                className={cn(
                  "opacity-75 shrink-0 ml-1 hidden sm:inline cursor-pointer",
                  variant === "liquid-glass"
                    ? "text-white/80 font-medium"
                    : variant === "glass"
                      ? "text-neutral-800 font-medium dark:text-white/80"
                      : "",
                )}
              >
                {event.time}
              </span>
            </div>
          );
        })}
      </div>

      {events.map((event: CalendarEvent) => {
        const isPopupOpen = activePopupEventId === event.id;
        if (!isPopupOpen) return null;

        const PlatformIcon =
          event.platform === "meet"
            ? Video
            : event.platform === "slack"
              ? Hash
              : MessageSquare;
        const iconColor =
          event.platform === "meet"
            ? "text-green-600"
            : event.platform === "slack"
              ? "text-blue-500"
              : "text-indigo-500";

        return (
          <div key={`popup-${event.id}`}>
            <div
              className={cn(
                "fixed inset-0 z-40 sm:bg-transparent cursor-pointer",
                variant === "liquid-glass"
                  ? "bg-black/50 backdrop-blur-xs"
                  : variant === "glass"
                    ? "bg-black/30 dark:bg-black/60 backdrop-blur-xs"
                    : "bg-black/20 dark:bg-black/60",
              )}
              onClick={(e) => {
                e.stopPropagation();
                setActivePopupEventId(null);
              }}
            />
            <div
              className={cn(
                "fixed sm:absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[320px] sm:top-auto sm:left-auto sm:translate-x-0 sm:translate-y-0 sm:w-72",
                popupXClass,
                popupYClass,
                variant === "liquid-glass"
                  ? "bg-black/40 dark:bg-black/50 backdrop-blur-3xl border border-white/30 text-white shadow-[0_25px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4),inset_-1px_-1px_1px_rgba(255,255,255,0.15)] rounded-2xl"
                  : variant === "glass"
                    ? "bg-white/50 dark:bg-black/60 backdrop-blur-3xl border-white/50 dark:border-white/20 text-neutral-900 dark:text-white shadow-2xl rounded-xl"
                    : "bg-popover text-popover-foreground border-border rounded-xl",
                "shadow-2xl border p-4 cursor-default animate-in fade-in zoom-in-95 duration-150",
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h4
                  className={cn(
                    "font-bold text-base truncate pr-4",
                    variant === "liquid-glass"
                      ? "text-white drop-shadow-xs"
                      : variant === "glass"
                        ? "text-neutral-900 dark:text-white"
                        : "text-foreground",
                  )}
                >
                  {event.title}
                </h4>
                <div
                  className={cn(
                    "flex items-center gap-2 shrink-0",
                    variant === "liquid-glass"
                      ? "text-white/80"
                      : variant === "glass"
                        ? "text-neutral-600 dark:text-white/70"
                        : "text-muted-foreground",
                  )}
                >
                  <Edit2
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditEvent(event);
                    }}
                    className={cn(
                      "w-4 h-4 cursor-pointer transition-colors",
                      variant === "liquid-glass"
                        ? "hover:text-white"
                        : variant === "glass"
                          ? "hover:text-neutral-900 dark:hover:text-white"
                          : "hover:text-foreground",
                    )}
                  />
                  <Trash2
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEvent(event.id);
                    }}
                    className="w-4 h-4 cursor-pointer hover:text-red-400 transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full",
                    variant === "liquid-glass"
                      ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]"
                      : variant === "glass"
                        ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 backdrop-blur-sm"
                        : theme.lightBg,
                  )}
                >
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full animate-pulse",
                      variant === "liquid-glass" || variant === "glass"
                        ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                        : theme.pulse,
                    )}
                  ></div>{" "}
                  Pending
                </span>
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 text-sm mb-4 font-medium",
                  variant === "liquid-glass"
                    ? "text-white/90"
                    : variant === "glass"
                      ? "text-neutral-700 dark:text-white/85"
                      : "text-muted-foreground",
                )}
              >
                <Calendar1
                  className={cn(
                    "w-4 h-4 shrink-0",
                    variant === "liquid-glass"
                      ? "text-white/85"
                      : variant === "glass"
                        ? "text-neutral-600 dark:text-white/70"
                        : "",
                  )}
                />{" "}
                {dateStr} at {event.time}
              </div>
              <button
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer",
                  variant === "liquid-glass"
                    ? "bg-white/20 hover:bg-white/30 border border-white/35 text-white backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)] active:scale-[0.98]"
                    : variant === "glass"
                      ? "bg-white/40 hover:bg-white/60 border border-white/50 text-neutral-900 dark:bg-white/15 dark:hover:bg-white/25 dark:border-white/25 dark:text-white backdrop-blur-md shadow-xs"
                      : "bg-muted hover:bg-muted/80 text-foreground",
                )}
              >
                Join with{" "}
                {event.platform === "meet"
                  ? "Google Meet"
                  : event.platform === "slack"
                    ? "Slack"
                    : "Discord"}{" "}
                <PlatformIcon
                  className={`w-4 h-4 cursor-pointer ${variant === "liquid-glass" ? "text-white" : variant === "glass" ? "text-neutral-800 dark:text-white" : iconColor}`}
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// === Sub Component: TimeGridCell ===
function TimeGridCell({
  events = [],
  activePopupEventId,
  setActivePopupEventId,
  colIndex,
  rowIndex,
  dateStr,
  onDeleteEvent,
  onEditEvent,
  onClickCell,
  cellClass,
  theme,
  variant,
}: TimeGridCellProps) {
  const popupXClass = colIndex >= 4 ? "sm:right-0" : "sm:left-0";
  const popupYClass = rowIndex >= 6 ? "sm:bottom-full sm:mb-2" : "sm:top-10";
  const isAnyPopupOpen = events.some((e: CalendarEvent) => e.id === activePopupEventId);

  return (
    <div
      onClick={onClickCell}
      className={cn(
        `relative flex flex-col p-1 sm:p-1.5 h-full transition-colors cursor-pointer ${isAnyPopupOpen ? "z-30" : "z-10 hover:z-20"} ${
          variant === "liquid-glass"
            ? "text-white"
            : variant === "glass"
              ? "text-neutral-900 dark:text-white"
              : "text-foreground"
        } min-h-[52px]`,
        cellClass,
      )}
    >
      <div className="flex-1 overflow-y-auto space-y-1 pr-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {events.map((event: CalendarEvent) => {
          const isPopupOpen = activePopupEventId === event.id;
          const isPentest = event.type === "pentest";
          const borderClass = isPentest
            ? variant === "liquid-glass"
              ? "border-amber-400/40 bg-amber-500/25 text-amber-100 backdrop-blur-sm shadow-xs font-medium"
              : variant === "glass"
                ? "border-amber-500/50 bg-amber-400/30 text-amber-950 font-medium dark:border-amber-400/40 dark:bg-amber-500/25 dark:text-amber-100 backdrop-blur-sm shadow-xs"
                : "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800/50 dark:bg-yellow-900/30 dark:text-yellow-400"
            : variant === "liquid-glass"
              ? "border-emerald-400/40 bg-emerald-500/25 text-emerald-100 backdrop-blur-sm shadow-xs font-medium"
              : variant === "glass"
                ? "border-emerald-500/50 bg-emerald-400/30 text-emerald-950 font-medium dark:border-emerald-400/40 dark:bg-emerald-500/25 dark:text-emerald-100 backdrop-blur-sm shadow-xs"
                : "border-green-200 bg-green-50 text-green-800 dark:border-green-800/50 dark:bg-green-900/30 dark:text-green-400";
          const PlatformIcon =
            event.platform === "meet"
              ? Video
              : event.platform === "slack"
                ? Hash
                : MessageSquare;
          const iconColor =
            event.platform === "meet"
              ? "text-green-600"
              : event.platform === "slack"
                ? "text-blue-500"
                : "text-indigo-500";

          return (
            <div
              key={event.id}
              onClick={(e) => {
                e.stopPropagation();
                setActivePopupEventId(isPopupOpen ? null : event.id);
              }}
              className={`flex items-center justify-between px-1 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded border cursor-pointer hover:brightness-95 transition-all ${borderClass}`}
            >
              <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                <PlatformIcon
                  className={cn(
                    "w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 cursor-pointer",
                    variant === "liquid-glass" || variant === "glass" ? "text-current" : iconColor,
                  )}
                />
                <span className="truncate max-w-[35px] min-[400px]:max-w-[60px] sm:max-w-none cursor-pointer">
                  {event.title}
                </span>
              </div>
              <span
                className={cn(
                  "opacity-75 shrink-0 ml-1 hidden sm:inline cursor-pointer",
                  variant === "liquid-glass"
                    ? "text-white/80 font-medium"
                    : variant === "glass"
                      ? "text-neutral-800 font-medium dark:text-white/80"
                      : "",
                )}
              >
                {event.time}
              </span>
            </div>
          );
        })}
      </div>

      {events.map((event: CalendarEvent) => {
        const isPopupOpen = activePopupEventId === event.id;
        if (!isPopupOpen) return null;

        const PlatformIcon =
          event.platform === "meet"
            ? Video
            : event.platform === "slack"
              ? Hash
              : MessageSquare;
        const iconColor =
          event.platform === "meet"
            ? "text-green-600"
            : event.platform === "slack"
              ? "text-blue-500"
              : "text-indigo-500";

        return (
          <div key={`popup-${event.id}`}>
            <div
              className={cn(
                "fixed inset-0 z-40 sm:bg-transparent cursor-pointer",
                variant === "liquid-glass"
                  ? "bg-black/50 backdrop-blur-xs"
                  : variant === "glass"
                    ? "bg-black/30 dark:bg-black/60 backdrop-blur-xs"
                    : "bg-black/20 dark:bg-black/60",
              )}
              onClick={(e) => {
                e.stopPropagation();
                setActivePopupEventId(null);
              }}
            />
            <div
              className={cn(
                "fixed sm:absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[320px] sm:top-auto sm:left-auto sm:translate-x-0 sm:translate-y-0 sm:w-72",
                popupXClass,
                popupYClass,
                variant === "liquid-glass"
                  ? "bg-black/40 dark:bg-black/50 backdrop-blur-3xl border border-white/30 text-white shadow-[0_25px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4),inset_-1px_-1px_1px_rgba(255,255,255,0.15)] rounded-2xl"
                  : variant === "glass"
                    ? "bg-white/50 dark:bg-black/60 backdrop-blur-3xl border-white/50 dark:border-white/20 text-neutral-900 dark:text-white shadow-2xl rounded-xl"
                    : "bg-popover text-popover-foreground border-border rounded-xl",
                "shadow-2xl border p-4 cursor-default animate-in fade-in zoom-in-95 duration-150",
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h4
                  className={cn(
                    "font-bold text-base truncate pr-4",
                    variant === "liquid-glass"
                      ? "text-white drop-shadow-xs"
                      : variant === "glass"
                        ? "text-neutral-900 dark:text-white"
                        : "text-foreground",
                  )}
                >
                  {event.title}
                </h4>
                <div
                  className={cn(
                    "flex items-center gap-2 shrink-0",
                    variant === "liquid-glass"
                      ? "text-white/80"
                      : variant === "glass"
                        ? "text-neutral-600 dark:text-white/70"
                        : "text-muted-foreground",
                  )}
                >
                  <Edit2
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditEvent(event);
                    }}
                    className={cn(
                      "w-4 h-4 cursor-pointer transition-colors",
                      variant === "liquid-glass"
                        ? "hover:text-white"
                        : variant === "glass"
                          ? "hover:text-neutral-900 dark:hover:text-white"
                          : "hover:text-foreground",
                    )}
                  />
                  <Trash2
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEvent(event.id);
                    }}
                    className="w-4 h-4 cursor-pointer hover:text-red-400 transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full",
                    variant === "liquid-glass"
                      ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]"
                      : variant === "glass"
                        ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 backdrop-blur-sm"
                        : theme.lightBg,
                  )}
                >
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full animate-pulse",
                      variant === "liquid-glass" || variant === "glass"
                        ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                        : theme.pulse,
                    )}
                  ></div>{" "}
                  Pending
                </span>
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 text-sm mb-4 font-medium",
                  variant === "liquid-glass"
                    ? "text-white/90"
                    : variant === "glass"
                      ? "text-neutral-700 dark:text-white/85"
                      : "text-muted-foreground",
                )}
              >
                <Calendar1
                  className={cn(
                    "w-4 h-4 shrink-0",
                    variant === "liquid-glass"
                      ? "text-white/85"
                      : variant === "glass"
                        ? "text-neutral-600 dark:text-white/70"
                        : "",
                  )}
                />{" "}
                {dateStr} at {event.time}
              </div>
              <button
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer",
                  variant === "liquid-glass"
                    ? "bg-white/20 hover:bg-white/30 border border-white/35 text-white backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)] active:scale-[0.98]"
                    : variant === "glass"
                      ? "bg-white/40 hover:bg-white/60 border border-white/50 text-neutral-900 dark:bg-white/15 dark:hover:bg-white/25 dark:border-white/25 dark:text-white backdrop-blur-md shadow-xs"
                      : "bg-muted hover:bg-muted/80 text-foreground",
                )}
              >
                Join with{" "}
                {event.platform === "meet"
                  ? "Google Meet"
                  : event.platform === "slack"
                    ? "Slack"
                    : "Discord"}{" "}
                <PlatformIcon
                  className={`w-4 h-4 cursor-pointer ${variant === "liquid-glass" ? "text-white" : variant === "glass" ? "text-neutral-800 dark:text-white" : iconColor}`}
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Calendar, CalendarDashboard, CalendarDayButton };
