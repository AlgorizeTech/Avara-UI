"use client";

import {
  Calendar1,
  CheckSquare,
  ChevronDown,
  ChevronDownIcon,
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightIcon,
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
import { useMemo, useState } from "react";
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
export type CalendarVariant = "default" | "minimal" | "glass";

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
      "bg-card hover:bg-accent/50 text-card-foreground",
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
      "bg-muted rounded-2xl border border-border hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm",
  },
  glass: {
    wrapper:
      "bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-2xl text-white",
    sidebar:
      "bg-white/10 dark:bg-black/20 border-r border-white/20 dark:border-white/10",
    header: "bg-transparent border-b border-white/20 dark:border-white/10",
    gridOuter: "bg-white/10 dark:bg-black/20 p-px",
    gridGap: "gap-px",
    gridHeader:
      "bg-white/15 dark:bg-black/30 backdrop-blur-md border-b border-white/20 dark:border-white/10",
    cellBg:
      "bg-white/20 dark:bg-black/30 hover:bg-white/35 dark:hover:bg-black/50 backdrop-blur-sm",
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
          "rounded-l-md bg-accent",
          defaultClassNames.range_start,
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
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
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal cursor-pointer group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}
// --- END: react-day-picker wrapper ---

const formatDateForInput = (dateKey: string) => {
  if (!dateKey) return "";
  const [y, m, d] = dateKey.split("-");
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
};

const DEFAULT_MOCK_EVENTS: Record<string, string[]> = {};

type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  platform: string;
};

// Ids are derived from the date key and position so they stay stable across
// re-seeds -- an open popup keeps pointing at the same event.
function buildEventsFromMock(
  mockEvents: Record<string, string[]>,
): CalendarEvent[] {
  const list: CalendarEvent[] = [];
  Object.entries(mockEvents).forEach(([dateKey, types]) => {
    types.forEach((type, index) => {
      list.push({
        id: `${dateKey}-${index}`,
        title: type === "pentest" ? "Pentest" : "Kick-Off",
        date: dateKey,
        time: "12:00",
        type: type,
        platform: type === "pentest" ? "slack" : "meet",
      });
    });
  });
  return list;
}

function CalendarDashboard({
  mockEvents = DEFAULT_MOCK_EVENTS,
  variant = "default",
  color = "primary",
}: {
  mockEvents?: Record<string, string[]>;
  variant?: CalendarVariant;
  color?: CalendarColor;
}) {
  const [isDark] = useState(false);
  const styles = dashboardVariants[variant];

  // Custom hex injection logic
  const isCustomHex = color && color.startsWith("#");
  const customVars = isCustomHex
    ? ({
        "--cal-custom": color,
        "--cal-custom-10": `${color}1a`,
        "--cal-custom-20": `${color}33`,
      } as React.CSSProperties)
    : {};

  const theme = isCustomHex
    ? {
        primaryBg:
          "bg-[var(--cal-custom)] hover:brightness-110 text-white shadow-[0_4px_14px_0_var(--cal-custom-20)]",
        primaryText: "text-[var(--cal-custom)]",
        lightBg: "bg-[var(--cal-custom-10)] text-[var(--cal-custom)]",
        focusRing: "focus:ring-2 focus:ring-[var(--cal-custom-20)]",
        pulse: "bg-[var(--cal-custom)]",
      }
    : colorThemes[color] || colorThemes["primary"];

  // Convert dict prop to rich array state. Seeded during render rather than in
  // an effect: an effect would render once with an empty calendar, then again
  // with the events, and re-seeding on a prop change would flash the same way.
  const [events, setEvents] = useState<CalendarEvent[]>(() =>
    buildEventsFromMock(mockEvents),
  );
  const [seededFrom, setSeededFrom] = useState(mockEvents);

  if (mockEvents !== seededFrom) {
    setSeededFrom(mockEvents);
    setEvents(buildEventsFromMock(mockEvents));
  }

  // View & Date State
  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(() => new Date());

  // UI State
  const [activePopupEventId, setActivePopupEventId] = useState<string | null>(
    null,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState("");
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [eventType, setEventType] = useState("pentest");
  const [eventPlatform, setEventPlatform] = useState("meet");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Filter State
  const [filters, setFilters] = useState<{
    types: Record<string, boolean>;
    platforms: Record<string, boolean>;
  }>({
    types: { pentest: true, kickoff: true },
    platforms: { meet: true, slack: true, discord: true },
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const date = currentDate.getDate();
  const monthName = currentDate.toLocaleString("en-US", { month: "long" });
  const monthShortName = currentDate.toLocaleString("en-US", { month: "short" });

  const nextPeriod = () => {
    if (view === "month") setCurrentDate(new Date(year, month + 1, 1));
    if (view === "week") setCurrentDate(new Date(year, month, date + 7));
    if (view === "day") setCurrentDate(new Date(year, month, date + 1));
  };

  const prevPeriod = () => {
    if (view === "month") setCurrentDate(new Date(year, month - 1, 1));
    if (view === "week") setCurrentDate(new Date(year, month, date - 7));
    if (view === "day") setCurrentDate(new Date(year, month, date - 1));
  };

  const goToToday = () => setCurrentDate(new Date());

  const generateCalendarDays = () => {
    const days = [];
    if (view === "month") {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
      const prevMonthDays = new Date(year, month, 0).getDate();

      for (let i = firstDayIndex - 1; i >= 0; i--) {
        days.push({
          day: prevMonthDays - i,
          isCurrentMonth: false,
          dateKey: `${year}-${month}-${prevMonthDays - i}`,
        });
      }
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({
          day: i,
          isCurrentMonth: true,
          dateKey: `${year}-${month + 1}-${i}`,
        });
      }
      const remainingCells = 35 - days.length;
      const extraCells = remainingCells < 0 ? 42 - days.length : remainingCells;
      for (let i = 1; i <= extraCells; i++) {
        days.push({
          day: i,
          isCurrentMonth: false,
          dateKey: `${year}-${month + 2}-${i}`,
        });
      }
    } else if (view === "week") {
      const currentDayOfWeek = currentDate.getDay();
      const distanceToMonday =
        currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
      const startOfWeek = new Date(year, month, date - distanceToMonday);

      for (let i = 0; i < 7; i++) {
        const d = new Date(
          startOfWeek.getFullYear(),
          startOfWeek.getMonth(),
          startOfWeek.getDate() + i,
        );
        days.push({
          day: d.getDate(),
          isCurrentMonth: true,
          dateKey: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
        });
      }
    } else if (view === "day") {
      days.push({
        day: currentDate.getDate(),
        isCurrentMonth: true,
        dateKey: `${year}-${month + 1}-${date}`,
      });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const filteredEvents = useMemo(() => {
    return events.filter(
      (e) =>
        filters.types[e.type] &&
        filters.platforms[e.platform],
    );
  }, [events, filters]);

  const toggleFilter = (category: "types" | "platforms", key: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: { ...prev[category], [key]: !prev[category][key] },
    }));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
    setActivePopupEventId(null);
  };

  const handleSaveEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawDate = formData.get("date") as string;
    const [y, m, d] = rawDate.split("-");
    const formattedDateKey = `${parseInt(y)}-${parseInt(m)}-${parseInt(d)}`;

    const eventData: CalendarEvent = {
      id: editingEvent ? editingEvent.id : Date.now().toString(),
      title: String(formData.get("title") ?? ""),
      date: formattedDateKey,
      time: String(formData.get("time") ?? ""),
      type: String(formData.get("type") ?? ""),
      platform: String(formData.get("platform") ?? ""),
    };

    if (editingEvent) {
      setEvents(
        events.map((ev) => (ev.id === editingEvent.id ? eventData : ev)),
      );
    } else {
      setEvents([...events, eventData]);
    }

    setIsAddModalOpen(false);
    setEditingEvent(null);
    setSelectedDateKey("");
    setActivePopupEventId(null);
  };

  const openAddModalForDate = (dateKey: string, timeStr: string = "12:00") => {
    setEditingEvent(null);
    setSelectedDateKey(dateKey);
    setSelectedTime(timeStr);
    setEventType("pentest");
    setEventPlatform("meet");
    setIsAddModalOpen(true);
  };

  const openEditModal = (event: CalendarEvent) => {
    setEditingEvent(event);
    setEventType(event.type ?? "pentest");
    setEventPlatform(event.platform ?? "meet");
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setEditingEvent(null);
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
    <div className={`${isDark ? "dark" : ""} w-full h-full max-w-full overflow-hidden`} style={customVars}>
      <div
        className={cn(
          "w-full max-w-full h-auto flex flex-col lg:flex-row text-foreground font-sans transition-colors duration-300",
          styles.wrapper,
          variant !== "minimal" ? "rounded-xl" : "",
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
              styles.sidebar,
              "bg-card text-card-foreground",
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">
                  {monthName} {year}
                </h2>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
                  aria-label="Close Sidebar"
                >
                  <X className="w-5 h-5 cursor-pointer" />
                </button>
              </div>

                <hr className="border-border my-4" />

                <div className="mb-6">
                  <div className="flex items-center justify-between text-muted-foreground mb-3 cursor-pointer">
                    <h3 className="text-sm font-medium">Events</h3>
                    <ChevronDown className="w-4 h-4 cursor-pointer" />
                  </div>
                  <div className="space-y-2">
                    <div
                      onClick={() => toggleFilter("types", "pentest")}
                      className="flex items-center justify-between bg-muted/50 p-2.5 rounded-md cursor-pointer hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-4 bg-yellow-400 rounded-full"></div>
                        <span className="text-sm font-medium">Pentest</span>
                      </div>
                      {filters.types.pentest ? (
                        <CheckSquare
                          className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                        />
                      ) : (
                        <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />
                      )}
                    </div>
                    <div
                      onClick={() => toggleFilter("types", "kickoff")}
                      className="flex items-center justify-between bg-muted/50 p-2.5 rounded-md cursor-pointer hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-medium">Kick-Off</span>
                      </div>
                      {filters.types.kickoff ? (
                        <CheckSquare
                          className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                        />
                      ) : (
                        <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-muted-foreground mb-3 cursor-pointer">
                    <h3 className="text-sm font-medium">Platforms</h3>
                    <ChevronDown className="w-4 h-4 cursor-pointer" />
                  </div>
                  <div className="space-y-2">
                    <div
                      onClick={() => toggleFilter("platforms", "meet")}
                      className="flex items-center justify-between bg-muted/50 p-2.5 rounded-md cursor-pointer hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm font-medium">Google Meet</span>
                      </div>
                      {filters.platforms.meet ? (
                        <CheckSquare
                          className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                        />
                      ) : (
                        <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />
                      )}
                    </div>
                    <div
                      onClick={() => toggleFilter("platforms", "slack")}
                      className="flex items-center justify-between bg-muted/50 p-2.5 rounded-md cursor-pointer hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-sky-500" />
                        <span className="text-sm font-medium">Slack</span>
                      </div>
                      {filters.platforms.slack ? (
                        <CheckSquare
                          className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                        />
                      ) : (
                        <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />
                      )}
                    </div>
                    <div
                      onClick={() => toggleFilter("platforms", "discord")}
                      className="flex items-center justify-between bg-muted/50 p-2.5 rounded-md cursor-pointer hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm font-medium">Discord</span>
                      </div>
                      {filters.platforms.discord ? (
                        <CheckSquare
                          className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                        />
                      ) : (
                        <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />
                      )}
                    </div>
                  </div>
                </div>

                <hr className="border-border my-5" />

                <button
                  onClick={() => {
                    handleExportCSV();
                    setIsMobileSidebarOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-border bg-muted/50 hover:bg-muted text-foreground text-sm font-medium transition-colors cursor-pointer"
                >
                  Export CSV <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        {/* SIDEBAR FILTERS */}
        <aside
          className={cn(
            "w-64 flex-shrink-0 p-5 overflow-y-auto hidden lg:block z-10 transition-colors duration-300",
            styles.sidebar,
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">
              {monthName} {year}
            </h2>
            <div className="flex gap-1 text-muted-foreground">
              <button
                onClick={prevPeriod}
                className="p-1 hover:bg-muted/50 rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4 cursor-pointer" />
              </button>
              <button
                onClick={nextPeriod}
                className="p-1 hover:bg-muted/50 rounded transition-colors"
              >
                <ChevronRight className="w-4 h-4 cursor-pointer" />
              </button>
            </div>
          </div>

          <hr className="border-border my-6" />

          <div className="mb-6">
            <div className="flex items-center justify-between text-muted-foreground mb-3 cursor-pointer">
              <h3 className="text-sm font-medium">Events</h3>
              <ChevronDown className="w-4 h-4 cursor-pointer" />
            </div>
            <div className="space-y-2">
              <div
                onClick={() => toggleFilter("types", "pentest")}
                className="flex items-center justify-between bg-muted/50 p-2 rounded-md cursor-pointer hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm font-medium">Pentest</span>
                </div>
                {filters.types.pentest ? (
                  <CheckSquare
                    className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                  />
                ) : (
                  <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />
                )}
              </div>
              <div
                onClick={() => toggleFilter("types", "kickoff")}
                className="flex items-center justify-between bg-muted/50 p-2 rounded-md cursor-pointer hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium">Kick-Off</span>
                </div>
                {filters.types.kickoff ? (
                  <CheckSquare
                    className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                  />
                ) : (
                  <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-muted-foreground mb-3 cursor-pointer">
              <h3 className="text-sm font-medium">Platforms</h3>
              <ChevronDown className="w-4 h-4 cursor-pointer" />
            </div>
            <div className="space-y-2">
              <div
                onClick={() => toggleFilter("platforms", "meet")}
                className="flex items-center justify-between bg-muted/50 p-2 rounded-md cursor-pointer hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium">Google Meet</span>
                </div>
                {filters.platforms.meet ? (
                  <CheckSquare
                    className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                  />
                ) : (
                  <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />
                )}
              </div>
              <div
                onClick={() => toggleFilter("platforms", "slack")}
                className="flex items-center justify-between bg-muted/50 p-2 rounded-md cursor-pointer hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-sky-500" />
                  <span className="text-sm font-medium">Slack</span>
                </div>
                {filters.platforms.slack ? (
                  <CheckSquare
                    className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                  />
                ) : (
                  <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />
                )}
              </div>
              <div
                onClick={() => toggleFilter("platforms", "discord")}
                className="flex items-center justify-between bg-muted/50 p-2 rounded-md cursor-pointer hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium">Discord</span>
                </div>
                {filters.platforms.discord ? (
                  <CheckSquare
                    className={cn("w-4 h-4 cursor-pointer", theme.primaryText)}
                  />
                ) : (
                  <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />
                )}
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
                  className="p-2 rounded-lg bg-muted/80 hover:bg-muted border border-border text-foreground transition-colors cursor-pointer"
                  aria-label="Open Calendar Filters"
                >
                  <Menu className="w-5 h-5 cursor-pointer" />
                </button>
                <div className="flex gap-1 text-muted-foreground">
                  <button
                    onClick={prevPeriod}
                    className="p-1 hover:bg-muted/50 rounded transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 cursor-pointer" />
                  </button>
                  <button
                    onClick={nextPeriod}
                    className="p-1 hover:bg-muted/50 rounded transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              </div>

              <h1 className="text-base sm:text-2xl font-semibold whitespace-nowrap lg:hidden">
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
                  setSelectedDateKey("");
                  setIsAddModalOpen(true);
                }}
                className={cn(
                  "flex items-center gap-2 cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors shadow-sm cursor-pointer ml-auto sm:ml-0",
                  theme.primaryBg,
                )}
              >
                <Plus className="w-4 h-4 cursor-pointer" /> <span className="hidden sm:inline">Add</span>
              </button>
            </div>

            {/* Bottom Row: View Selectors + Export Button */}
            <div className="flex items-center w-full lg:w-auto gap-2 sm:gap-4 justify-between lg:justify-end">
              <div className="flex bg-muted/60 p-1 rounded-lg text-xs sm:text-sm font-medium shrink-0 justify-start">
                <button
                  onClick={goToToday}
                  className="px-3 sm:px-4 py-1.5 cursor-pointer hover:text-foreground text-muted-foreground transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() => setView("day")}
                  className={cn(
                    "px-3 sm:px-4 py-1.5 cursor-pointer rounded-md shadow-sm transition-colors",
                    view === "day"
                      ? theme.lightBg
                      : "hover:text-foreground text-muted-foreground",
                  )}
                >
                  Day
                </button>
                <button
                  onClick={() => setView("week")}
                  className={cn(
                    "px-3 sm:px-4 py-1.5 cursor-pointer rounded-md shadow-sm transition-colors",
                    view === "week"
                      ? theme.lightBg
                      : "hover:text-foreground text-muted-foreground",
                  )}
                >
                  Week
                </button>
                <button
                  onClick={() => setView("month")}
                  className={cn(
                    "px-3 sm:px-4 py-1.5 cursor-pointer rounded-md shadow-sm transition-colors",
                    view === "month"
                      ? theme.lightBg
                      : "hover:text-foreground text-muted-foreground",
                  )}
                >
                  Month
                </button>
              </div>

              <button
                onClick={handleExportCSV}
                className="hidden sm:flex items-center cursor-pointer gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-border rounded-md text-xs sm:text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
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
                        "py-1.5 sm:py-3 px-1 sm:px-4 text-[11px] sm:text-sm font-medium text-muted-foreground text-center truncate",
                        variant !== "minimal" && idx !== 6
                          ? "border-r border-border"
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
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="w-full min-w-0 flex flex-col bg-card/60">
                {/* Time Grid Sticky Header Bar */}
                <div
                  className={cn(
                    "sticky top-0 z-20 flex border-b border-border transition-colors duration-300 shrink-0",
                    styles.gridHeader,
                  )}
                >
                  <div className="w-16 sm:w-20 shrink-0 py-2 px-1 text-center text-xs font-semibold text-muted-foreground border-r border-border/70 flex items-center justify-center bg-muted/20">
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
                            "py-2 px-1 text-center font-medium text-xs sm:text-sm text-foreground truncate flex flex-col items-center justify-center gap-0.5",
                            idx < calendarDays.length - 1
                              ? "border-r border-border"
                              : "",
                          )}
                        >
                          <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                            {view === "day" ? fullDayName : dayName}
                          </span>
                          <span
                            className={cn(
                              "text-xs sm:text-sm font-bold w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full transition-colors",
                              isToday
                                ? theme.primaryBg
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
                      className="flex min-h-[38px] sm:min-h-[44px] border-b border-border/70"
                    >
                      {/* Time Label Column */}
                      <div className="w-16 sm:w-20 shrink-0 px-1 py-1 flex items-center justify-center text-[10px] sm:text-xs font-semibold text-muted-foreground border-r border-border/70 bg-muted/20 select-none">
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
                                  ? "border-r border-border/70"
                                  : "",
                              )}
                              theme={theme}
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
              "w-full max-w-md rounded-xl shadow-2xl overflow-hidden border animate-in fade-in zoom-in duration-200 cursor-default",
              variant === "glass"
                ? "bg-white/30 dark:bg-black/40 backdrop-blur-2xl border-white/30 dark:border-white/10 text-white shadow-2xl"
                : "bg-card border-border",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={cn(
              "flex items-center justify-between px-6 py-4 border-b",
              variant === "glass" ? "border-white/20 dark:border-white/10" : "border-border"
            )}>
              <h3 className={cn("font-semibold text-lg", variant === "glass" ? "text-white" : "text-foreground")}>
                {editingEvent ? "Update Event" : "Add New Event"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <X className="w-5 h-5 cursor-pointer" />
              </button>
            </div>
            <form onSubmit={handleSaveEvent} className="p-6 space-y-4">
              <div>
                <label className={cn("block text-sm font-medium mb-1", variant === "glass" ? "text-white/90" : "text-foreground")}>
                  Event Title
                </label>
                <input
                  required
                  name="title"
                  type="text"
                  defaultValue={editingEvent ? editingEvent.title : ""}
                  placeholder="e.g. Q3 Roadmap Review"
                  className={cn(
                    "w-full cursor-text border rounded-md px-3 py-2 text-sm bg-transparent focus:ring-2 focus:outline-none transition-shadow",
                    variant === "glass"
                      ? "border-white/20 text-white placeholder:text-white/50 bg-white/10"
                      : "border-border dark:text-white",
                    theme.focusRing,
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={cn("block text-sm font-medium mb-1", variant === "glass" ? "text-white/90" : "text-foreground")}>
                    Date
                  </label>
                  <input
                    required
                    name="date"
                    type="date"
                    defaultValue={
                      editingEvent
                        ? formatDateForInput(editingEvent.date)
                        : formatDateForInput(selectedDateKey) ||
                          `${year}-${String(month + 1).padStart(2, "0")}-01`
                    }
                    className={cn(
                      "w-full cursor-pointer border rounded-md px-3 py-2 text-sm bg-transparent focus:ring-2 focus:outline-none transition-shadow",
                      variant === "glass"
                        ? "border-white/20 text-white [color-scheme:dark] bg-white/10"
                        : "border-border dark:text-white [color-scheme:light] dark:[color-scheme:dark]",
                      theme.focusRing,
                    )}
                  />
                </div>
                <div>
                  <label className={cn("block text-sm font-medium mb-1", variant === "glass" ? "text-white/90" : "text-foreground")}>
                    Time
                  </label>
                  <input
                    required
                    name="time"
                    type="time"
                    defaultValue={editingEvent ? editingEvent.time : selectedTime || "12:00"}
                    className={cn(
                      "w-full cursor-pointer border rounded-md px-3 py-2 text-sm bg-transparent focus:ring-2 focus:outline-none transition-shadow",
                      variant === "glass"
                        ? "border-white/20 text-white [color-scheme:dark] bg-white/10"
                        : "border-border dark:text-white [color-scheme:light] dark:[color-scheme:dark]",
                      theme.focusRing,
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={cn("block text-sm font-medium mb-1", variant === "glass" ? "text-white/90" : "text-foreground")}>
                    Event Type
                  </label>
                  {/* Hidden input keeps this field in the form's FormData,
                      since SelectBlock renders a button rather than an input. */}
                  <input type="hidden" name="type" value={eventType} />
                  <SelectBlock
                    options={EVENT_TYPE_OPTIONS}
                    value={eventType}
                    onChange={setEventType}
                    color={color}
                    variant={variant === "glass" ? "glass" : "default"}
                    inputSize="sm"
                  />
                </div>
                <div>
                  <label className={cn("block text-sm font-medium mb-1", variant === "glass" ? "text-white/90" : "text-foreground")}>
                    Platform
                  </label>
                  <input type="hidden" name="platform" value={eventPlatform} />
                  <SelectBlock
                    options={EVENT_PLATFORM_OPTIONS}
                    value={eventPlatform}
                    onChange={setEventPlatform}
                    color={color}
                    variant={variant === "glass" ? "glass" : "default"}
                    inputSize="sm"
                  />
                </div>
              </div>
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer",
                    variant === "glass"
                      ? "text-white/80 hover:bg-white/10 hover:text-white"
                      : "text-foreground hover:bg-muted",
                  )}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors shadow-sm cursor-pointer",
                    theme.primaryBg,
                  )}
                >
                  {editingEvent ? "Update Event" : "Add Event"}
                </button>
              </div>
            </form>
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
}

interface CalendarCellProps extends CalendarCellBaseProps {
  day: number | string;
  isGray?: boolean;
  variant?: CalendarVariant;
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
        `relative flex flex-col p-1.5 sm:p-2 h-full transition-colors cursor-pointer ${isAnyPopupOpen ? "z-30" : "z-10 hover:z-20"} ${isGray ? "text-gray-400 dark:text-gray-600 opacity-60" : "text-gray-900 dark:text-gray-100"}`,
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
            ? "border-border bg-muted text-gray-400 dark:text-gray-600"
            : isPentest
              ? "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800/50 dark:bg-yellow-900/30 dark:text-yellow-400"
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
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 cursor-pointer ${iconColor}`}
                />
                <span className="truncate max-w-[35px] min-[400px]:max-w-[60px] sm:max-w-none cursor-pointer">{event.title}</span>
              </div>
              <span className="opacity-70 shrink-0 ml-1 hidden sm:inline cursor-pointer">
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
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/60 sm:bg-transparent cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setActivePopupEventId(null);
              }}
            />
            <div
              className={`fixed sm:absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[320px] sm:top-auto sm:left-auto sm:translate-x-0 sm:translate-y-0 sm:w-72 ${popupXClass} ${popupYClass} ${
                variant === "glass"
                  ? "bg-white/30 dark:bg-black/40 backdrop-blur-2xl border-white/30 dark:border-white/10 text-white shadow-2xl"
                  : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
              } rounded-xl shadow-2xl border p-4 cursor-default animate-in fade-in zoom-in-95 duration-150`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className={cn("font-semibold text-base truncate pr-4", variant === "glass" ? "text-white" : "text-foreground")}>
                  {event.title}
                </h4>
                <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                  <Edit2
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditEvent(event);
                    }}
                    className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors"
                  />
                  <Trash2
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEvent(event.id);
                    }}
                    className="w-4 h-4 cursor-pointer hover:text-red-500 transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md",
                    theme.lightBg,
                  )}
                >
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full animate-pulse",
                      theme.pulse,
                    )}
                  ></div>{" "}
                  Pending
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar1 className="w-4 h-4" /> {dateStr} at {event.time}
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-muted hover:bg-muted rounded-lg text-sm font-medium transition-colors cursor-pointer">
                Join with{" "}
                {event.platform === "meet"
                  ? "Google Meet"
                  : event.platform === "slack"
                    ? "Slack"
                    : "Discord"}{" "}
                <PlatformIcon
                  className={`w-4 h-4 cursor-pointer ${iconColor}`}
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
}: TimeGridCellProps) {
  const popupXClass = colIndex >= 4 ? "sm:right-0" : "sm:left-0";
  const popupYClass = rowIndex >= 6 ? "sm:bottom-full sm:mb-2" : "sm:top-10";
  const isAnyPopupOpen = events.some((e: CalendarEvent) => e.id === activePopupEventId);

  return (
    <div
      onClick={onClickCell}
      className={cn(
        `relative flex flex-col p-1 sm:p-1.5 h-full transition-colors cursor-pointer ${isAnyPopupOpen ? "z-30" : "z-10 hover:z-20"} text-foreground min-h-[52px]`,
        cellClass,
      )}
    >
      <div className="flex-1 overflow-y-auto space-y-1 pr-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {events.map((event: CalendarEvent) => {
          const isPopupOpen = activePopupEventId === event.id;
          const isPentest = event.type === "pentest";
          const borderClass = isPentest
            ? "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800/50 dark:bg-yellow-900/30 dark:text-yellow-400"
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
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 cursor-pointer ${iconColor}`}
                />
                <span className="truncate max-w-[35px] min-[400px]:max-w-[60px] sm:max-w-none cursor-pointer">
                  {event.title}
                </span>
              </div>
              <span className="opacity-70 shrink-0 ml-1 hidden sm:inline cursor-pointer">
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
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/60 sm:bg-transparent cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setActivePopupEventId(null);
              }}
            />
            <div
              className={`fixed sm:absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[320px] sm:top-auto sm:left-auto sm:translate-x-0 sm:translate-y-0 sm:w-72 ${popupXClass} ${popupYClass} bg-card rounded-xl shadow-2xl border border-border p-4 cursor-default animate-in fade-in zoom-in-95 duration-150`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-semibold text-base text-foreground truncate pr-4">
                  {event.title}
                </h4>
                <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                  <Edit2
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditEvent(event);
                    }}
                    className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors"
                  />
                  <Trash2
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteEvent(event.id);
                    }}
                    className="w-4 h-4 cursor-pointer hover:text-red-500 transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md",
                    theme.lightBg,
                  )}
                >
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full animate-pulse",
                      theme.pulse,
                    )}
                  ></div>{" "}
                  Pending
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar1 className="w-4 h-4" /> {dateStr} at {event.time}
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-muted hover:bg-muted rounded-lg text-sm font-medium transition-colors cursor-pointer">
                Join with{" "}
                {event.platform === "meet"
                  ? "Google Meet"
                  : event.platform === "slack"
                    ? "Slack"
                    : "Discord"}{" "}
                <PlatformIcon
                  className={`w-4 h-4 cursor-pointer ${iconColor}`}
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
