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
  MessageSquare,
  Plus,
  Square,
  Trash2,
  Video,
  X,
} from "lucide-react";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

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
}: any) {
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
          date.toLocaleString("default", { month: "short" }),
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
        table: "w-full border-collapse",
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

function CalendarDayButton({ className, day, modifiers, ...props }: any) {
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
      data-day={day.date.toLocaleDateString()}
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

// Helpers
const formatDateForInput = (dateKey: string) => {
  if (!dateKey) return "";
  const [y, m, d] = dateKey.split("-");
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
};

function CalendarDashboard({
  mockEvents = {},
}: {
  mockEvents?: Record<string, string[]>;
}) {
  const [isDark, setIsDark] = useState(false);

  // Convert dict prop to rich array state
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const initialEventsList: any[] = [];
    Object.entries(mockEvents).forEach(([dateKey, types]) => {
      types.forEach((type, index) => {
        initialEventsList.push({
          id: `${dateKey}-${index}-${Math.random()}`,
          title: type === "pentest" ? "Pentest" : "Kick-Off",
          date: dateKey, // Format: YYYY-M-D
          time: "12:00",
          type: type,
          platform: type === "pentest" ? "slack" : "meet",
        });
      });
    });
    setEvents(initialEventsList);
  }, [mockEvents]);

  // View & Date State
  const [view, setView] = useState("month"); // "month" | "week" | "day"
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1));

  // UI State
  const [activePopupEventId, setActivePopupEventId] = useState<string | null>(
    null,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState("");
  const [editingEvent, setEditingEvent] = useState<any | null>(null);

  // Filter State
  const [filters, setFilters] = useState({
    types: { pentest: true, kickoff: true },
    platforms: { meet: true, slack: true, discord: true },
  });

  // Derived Date Info
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const date = currentDate.getDate();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  // Navigation Logic Based on View
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

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate Grid Data Based on View
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

  // Filter Events
  const filteredEvents = useMemo(() => {
    return events.filter(
      (e) =>
        (filters.types as any)[e.type] &&
        (filters.platforms as any)[e.platform],
    );
  }, [events, filters]);

  const toggleFilter = (category: "types" | "platforms", key: string) => {
    setFilters((prev: any) => ({
      ...prev,
      [category]: { ...prev[category], [key]: !prev[category][key] },
    }));
  };

  // Actions
  const deleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
    setActivePopupEventId(null);
  };

  const handleSaveEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawDate = formData.get("date") as string; // YYYY-MM-DD
    const [y, m, d] = rawDate.split("-");
    const formattedDateKey = `${parseInt(y)}-${parseInt(m)}-${parseInt(d)}`; // Normalize to YYYY-M-D

    const eventData = {
      id: editingEvent ? editingEvent.id : Date.now().toString(),
      title: formData.get("title"),
      date: formattedDateKey,
      time: formData.get("time"),
      type: formData.get("type"),
      platform: formData.get("platform"),
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

  const openAddModalForDate = (dateKey: string) => {
    setEditingEvent(null);
    setSelectedDateKey(dateKey);
    setIsAddModalOpen(true);
  };

  const openEditModal = (event: any) => {
    setEditingEvent(event);
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
    <div className={`${isDark ? "dark" : ""} w-full h-full`}>
      <div className="w-full h-[700px] flex overflow-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
        {/* SIDEBAR FILTERS */}
        <aside className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 p-5 overflow-y-auto hidden lg:block bg-white dark:bg-gray-950 z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">
              {monthName} {year}
            </h2>
            <div className="flex gap-1 text-gray-400">
              <button
                onClick={prevPeriod}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4 cursor-pointer" />
              </button>
              <button
                onClick={nextPeriod}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                <ChevronRight className="w-4 h-4 cursor-pointer" />
              </button>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-800 my-6" />

          <div className="mb-6">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-3 cursor-pointer">
              <h3 className="text-sm font-medium">Events</h3>
              <ChevronDown className="w-4 h-4 cursor-pointer" />
            </div>
            <div className="space-y-2">
              <div
                onClick={() => toggleFilter("types", "pentest")}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm font-medium">Pentest</span>
                </div>
                {filters.types.pentest ? (
                  <CheckSquare className="w-4 h-4 text-indigo-500 cursor-pointer" />
                ) : (
                  <Square className="w-4 h-4 text-gray-300 dark:text-gray-700 cursor-pointer" />
                )}
              </div>
              <div
                onClick={() => toggleFilter("types", "kickoff")}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Kick-Off</span>
                </div>
                {filters.types.kickoff ? (
                  <CheckSquare className="w-4 h-4 text-indigo-500 cursor-pointer" />
                ) : (
                  <Square className="w-4 h-4 text-gray-300 dark:text-gray-700 cursor-pointer" />
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-3 cursor-pointer">
              <h3 className="text-sm font-medium">Platforms</h3>
              <ChevronDown className="w-4 h-4 cursor-pointer" />
            </div>
            <div className="space-y-2">
              <div
                onClick={() => toggleFilter("platforms", "meet")}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Google Meet</span>
                </div>
                {filters.platforms.meet ? (
                  <CheckSquare className="w-4 h-4 text-indigo-500 cursor-pointer" />
                ) : (
                  <Square className="w-4 h-4 text-gray-300 dark:text-gray-700 cursor-pointer" />
                )}
              </div>
              <div
                onClick={() => toggleFilter("platforms", "slack")}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Slack</span>
                </div>
                {filters.platforms.slack ? (
                  <CheckSquare className="w-4 h-4 text-indigo-500 cursor-pointer" />
                ) : (
                  <Square className="w-4 h-4 text-gray-300 dark:text-gray-700 cursor-pointer" />
                )}
              </div>
              <div
                onClick={() => toggleFilter("platforms", "discord")}
                className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2 text-gray-500">
                  <MessageSquare className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium">Discord</span>
                </div>
                {filters.platforms.discord ? (
                  <CheckSquare className="w-4 h-4 text-indigo-500 cursor-pointer" />
                ) : (
                  <Square className="w-4 h-4 text-gray-300 dark:text-gray-700 cursor-pointer" />
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CALENDAR AREA */}
        <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-950">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-800 gap-4 flex-shrink-0 z-10 bg-white dark:bg-gray-950">
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                <div className="flex gap-1 text-gray-400">
                  <button
                    onClick={prevPeriod}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 cursor-pointer" />
                  </button>
                  <button
                    onClick={nextPeriod}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold sm:w-48 whitespace-nowrap lg:hidden">
                {view === "day"
                  ? `${monthName} ${date}, ${year}`
                  : `${monthName} ${year}`}
              </h1>
              <button
                onClick={() => {
                  setEditingEvent(null);
                  setIsAddModalOpen(true);
                }}
                className="sm:hidden cursor-pointer flex items-center justify-center p-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-5 h-5 cursor-pointer" />
              </button>
            </div>

            <div className="flex items-center w-full sm:w-auto gap-2 sm:gap-4 justify-between sm:justify-end">
              <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-1 text-xs sm:text-sm font-medium w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={goToToday}
                  className="px-3 sm:px-4 py-1.5 cursor-pointer hover:text-gray-900 dark:hover:text-white text-gray-500 transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() => setView("day")}
                  className={`px-3 sm:px-4 py-1.5 cursor-pointer rounded-md shadow-sm transition-colors ${view === "day" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200" : "hover:text-gray-900 dark:hover:text-white text-gray-500"}`}
                >
                  Day
                </button>
                <button
                  onClick={() => setView("week")}
                  className={`px-3 sm:px-4 py-1.5 cursor-pointer rounded-md shadow-sm transition-colors hidden sm:block ${view === "week" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200" : "hover:text-gray-900 dark:hover:text-white text-gray-500"}`}
                >
                  Week
                </button>
                <button
                  onClick={() => setView("month")}
                  className={`px-3 sm:px-4 py-1.5 cursor-pointer rounded-md shadow-sm transition-colors ${view === "month" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200" : "hover:text-gray-900 dark:hover:text-white text-gray-500"}`}
                >
                  Month
                </button>
              </div>
              <button
                onClick={handleExportCSV}
                className="hidden lg:flex items-center cursor-pointer gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                Export <Download className="w-4 h-4 cursor-pointer" />
              </button>
              <button
                onClick={() => {
                  setEditingEvent(null);
                  setSelectedDateKey("");
                  setIsAddModalOpen(true);
                }}
                className="hidden sm:flex items-center gap-2 cursor-pointer px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-4 h-4 cursor-pointer" /> Add
              </button>
            </div>
          </header>

          {/* Scrollable Grid Container */}
          <div className="flex-1 overflow-x-auto overflow-y-auto relative bg-gray-200 dark:bg-gray-800 border-t-0 p-px">
            <div className="min-w-[600px] lg:min-w-0 w-full flex flex-col h-full min-h-[500px]">
              {/* Headers */}
              {view !== "day" && (
                <div className="sticky top-0 z-20 grid grid-cols-7 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((dayName) => (
                    <div
                      key={dayName}
                      className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 text-center border-r border-gray-200 dark:border-gray-800 last:border-r-0"
                    >
                      <span className="hidden sm:inline">{dayName}</span>
                      <span className="sm:hidden">{dayName.slice(0, 3)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Grid Cells */}
              <div
                className={`grid flex-1 gap-px ${view === "day" ? "grid-cols-1 auto-rows-[minmax(400px,1fr)]" : "grid-cols-7 auto-rows-[minmax(120px,1fr)]"}`}
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
                      colIndex={view === "day" ? 0 : index % 7}
                      rowIndex={Math.floor(index / 7)}
                      dateStr={dayObj.dateKey.split("-").reverse().join(".")}
                      onDeleteEvent={deleteEvent}
                      onEditEvent={openEditModal}
                      onClickCell={() => openAddModalForDate(dayObj.dateKey)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* --- ADD / EDIT EVENT MODAL --- */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 cursor-pointer"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in duration-200 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Event Title
                </label>
                <input
                  required
                  name="title"
                  type="text"
                  defaultValue={editingEvent ? editingEvent.title : ""}
                  placeholder="e.g. Q3 Roadmap Review"
                  className="w-full cursor-text border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                    className="w-full cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time
                  </label>
                  <input
                    required
                    name="time"
                    type="time"
                    defaultValue={editingEvent ? editingEvent.time : "12:00"}
                    className="w-full cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Event Type
                  </label>
                  <select
                    name="type"
                    defaultValue={editingEvent ? editingEvent.type : "pentest"}
                    className="w-full cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white"
                  >
                    <option value="pentest">Pentest</option>
                    <option value="kickoff">Kick-Off</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Platform
                  </label>
                  <select
                    name="platform"
                    defaultValue={editingEvent ? editingEvent.platform : "meet"}
                    className="w-full cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white"
                  >
                    <option value="meet">Google Meet</option>
                    <option value="slack">Slack</option>
                    <option value="discord">Discord</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium bg-[#7367f0] text-white hover:bg-[#6355eb] rounded-md transition-colors shadow-sm cursor-pointer"
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
}: any) {
  // Smart Positioning so popups don't render off-screen
  const popupXClass = colIndex >= 4 ? "sm:right-0" : "sm:left-0";
  const popupYClass = rowIndex >= 4 ? "sm:bottom-full sm:mb-2" : "sm:top-12";
  const isAnyPopupOpen = events.some((e: any) => e.id === activePopupEventId);

  return (
    <div
      onClick={onClickCell}
      className={`relative flex flex-col bg-white dark:bg-gray-950 p-1.5 sm:p-2 h-full transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 ${isAnyPopupOpen ? "z-30" : "z-10 hover:z-20"} ${isGray ? "text-gray-400 dark:text-gray-600" : "text-gray-900 dark:text-gray-100"}`}
    >
      <div
        className={`text-xs sm:text-sm font-medium mb-1 sm:mb-2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded shrink-0`}
      >
        {day}
      </div>

      {/* 1. THE EVENTS LIST (Scrolls strictly inside the cell) */}
      <div className="flex-1 overflow-y-auto space-y-1 sm:space-y-1.5 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {events.map((event: any) => {
          const isPopupOpen = activePopupEventId === event.id;
          const isPentest = event.type === "pentest";
          const borderClass = isGray
            ? "border-gray-200 bg-gray-50 text-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-600"
            : isPentest
              ? "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
              : "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400";
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
              className={`flex items-center justify-between px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded border cursor-pointer hover:brightness-95 transition-all ${borderClass}`}
            >
              <div className="flex items-center gap-1 sm:gap-1.5 truncate">
                <PlatformIcon
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 cursor-pointer ${iconColor}`}
                />
                <span className="truncate cursor-pointer">{event.title}</span>
              </div>
              <span className="opacity-70 shrink-0 ml-1 hidden sm:inline cursor-pointer">
                {event.time}
              </span>
            </div>
          );
        })}
      </div>

      {/* 2. THE POPOVERS (Absolute overlay, avoids clipping) */}
      {events.map((event: any) => {
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
            {/* Backdrop to close popup when clicking outside */}
            <div
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/60 sm:bg-transparent cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setActivePopupEventId(null);
              }}
            />

            {/* Popover Box */}
            <div
              className={`fixed sm:absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[320px] sm:top-auto sm:left-auto sm:translate-x-0 sm:translate-y-0 sm:w-72 ${popupXClass} ${popupYClass} bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 p-4 cursor-default animate-in fade-in zoom-in-95 duration-150`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-semibold text-base text-gray-900 dark:text-white truncate pr-4">
                  {event.title}
                </h4>
                <div className="flex items-center gap-2 text-gray-400 shrink-0">
                  <Edit2
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditEvent(event);
                    }}
                    className="w-4 h-4 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
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
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 text-xs font-medium rounded-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>{" "}
                  Pending
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Calendar1 className="w-4 h-4" /> {dateStr} at {event.time}
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors cursor-pointer">
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
