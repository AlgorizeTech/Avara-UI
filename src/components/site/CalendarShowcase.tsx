"use client";

import {
  CalendarColor,
  CalendarDashboard,
  CalendarVariant,
} from "@/components/custom/blocks/Calendar";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";
import { useEffect, useState } from "react";

// ==========================================
// 1. TYPESCRIPT ENGINE CODE
// ==========================================
const CALENDAR_ENGINE_TS = `"use client";

import {
  Calendar1, CheckSquare, ChevronDown, ChevronDownIcon, ChevronLeft, ChevronLeftIcon, ChevronRight, ChevronRightIcon, Download, Edit2, Hash, Menu, MessageSquare, Plus, Square, Trash2, Video, X,
} from "lucide-react";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button"; // Adjust path if needed

export type CalendarVariant = "default" | "minimal" | "glass";
export type CalendarColor = "indigo" | "rose" | "emerald" | "blue" | "zinc" | (string & {});

const dashboardVariants: Record<CalendarVariant, Record<string, string>> = {
  default: { wrapper: "bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm", sidebar: "bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800", header: "bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800", gridOuter: "bg-gray-200 dark:bg-gray-800 p-px", gridGap: "gap-px", gridHeader: "bg-white/95 dark:bg-gray-950/95 border-b border-gray-200 dark:border-gray-800", cellBg: "bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/50" },
  minimal: { wrapper: "bg-transparent border-none", sidebar: "bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-800/50 lg:mr-6", header: "bg-transparent border-none mb-4 rounded-xl", gridOuter: "bg-transparent p-0", gridGap: "gap-2 sm:gap-3", gridHeader: "bg-transparent border-none pb-2", cellBg: "bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm" },
  glass: { wrapper: "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl", sidebar: "bg-white/10 dark:bg-black/10 border-r border-white/20 dark:border-white/10", header: "bg-transparent border-b border-white/20 dark:border-white/10", gridOuter: "bg-gray-400/20 dark:bg-gray-700/30 p-px", gridGap: "gap-px", gridHeader: "bg-white/20 dark:bg-black/20 backdrop-blur-md border-b border-white/20 dark:border-white/10", cellBg: "bg-white/50 dark:bg-black/50 hover:bg-white/80 dark:hover:bg-black/80 backdrop-blur-sm" },
};

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { primaryBg: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20", primaryText: "text-indigo-600 dark:text-indigo-400", lightBg: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300", focusRing: "focus:ring-indigo-500", pulse: "bg-indigo-500" },
  rose: { primaryBg: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20", primaryText: "text-rose-600 dark:text-rose-400", lightBg: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300", focusRing: "focus:ring-rose-500", pulse: "bg-rose-500" },
  emerald: { primaryBg: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20", primaryText: "text-emerald-600 dark:text-emerald-400", lightBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300", focusRing: "focus:ring-emerald-500", pulse: "bg-emerald-500" },
  blue: { primaryBg: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20", primaryText: "text-blue-600 dark:text-blue-400", lightBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300", focusRing: "focus:ring-blue-500", pulse: "bg-blue-500" },
  zinc: { primaryBg: "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black shadow-zinc-900/20", primaryText: "text-zinc-900 dark:text-white", lightBg: "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white", focusRing: "focus:ring-zinc-500 dark:focus:ring-zinc-400", pulse: "bg-zinc-900 dark:bg-white" },
};

function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", formatters, components, ...props }: any) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw\`rtl:**:[.rdp-button\\_next>svg]:rotate-180\`, String.raw\`rtl:**:[.rdp-button\\_previous>svg]:rotate-180\`, className)}
      captionLayout={captionLayout}
      formatters={{ formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }), ...formatters }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("flex gap-4 flex-col md:flex-row relative", defaultClassNames.months),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn("flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between", defaultClassNames.nav),
        button_previous: cn(buttonVariants({ variant: buttonVariant }), "size-(--cell-size) aria-disabled:opacity-50 p-0 cursor-pointer select-none", defaultClassNames.button_previous),
        button_next: cn(buttonVariants({ variant: buttonVariant }), "size-(--cell-size) aria-disabled:opacity-50 p-0 cursor-pointer select-none", defaultClassNames.button_next),
        month_caption: cn("flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)", defaultClassNames.month_caption),
        dropdowns: cn("w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5", defaultClassNames.dropdowns),
        dropdown_root: cn("relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md cursor-pointer", defaultClassNames.dropdown_root),
        dropdown: cn("absolute bg-popover inset-0 opacity-0 cursor-pointer", defaultClassNames.dropdown),
        caption_label: cn("select-none font-medium cursor-pointer", captionLayout === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5", defaultClassNames.caption_label),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn("text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none", defaultClassNames.weekday),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn("select-none w-(--cell-size)", defaultClassNames.week_number_header),
        week_number: cn("text-[0.8rem] select-none text-muted-foreground", defaultClassNames.week_number),
        day: cn("relative w-full h-full p-0 text-center cursor-pointer [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none", defaultClassNames.day),
        range_start: cn("rounded-l-md bg-accent", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn("bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none", defaultClassNames.today),
        outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />,
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") return <ChevronLeftIcon className={cn("size-4 cursor-pointer", className)} {...props} />;
          if (orientation === "right") return <ChevronRightIcon className={cn("size-4 cursor-pointer", className)} {...props} />;
          return <ChevronDownIcon className={cn("size-4 cursor-pointer", className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => <td {...props}><div className="flex size-(--cell-size) items-center justify-center text-center">{children}</div></td>,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }: any) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => { if (modifiers.focused) ref.current?.focus(); }, [modifiers.focused]);
  return (
    <Button
      ref={ref} variant="ghost" size="icon" data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      data-range-start={modifiers.range_start} data-range-end={modifiers.range_end} data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal cursor-pointer group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day, className
      )}
      {...props}
    />
  );
}

const formatDateForInput = (dateKey: string) => {
  if (!dateKey) return "";
  const [y, m, d] = dateKey.split("-");
  return \`\${y}-\${String(m).padStart(2, "0")}-\${String(d).padStart(2, "0")}\`;
};

export function CalendarDashboard({ mockEvents = {}, variant = "default", color = "indigo" }: { mockEvents?: Record<string, string[]>; variant?: CalendarVariant; color?: CalendarColor; }) {
  const [isDark, setIsDark] = useState(false);
  const styles = dashboardVariants[variant];
  
  const isCustomHex = color?.startsWith("#");
  const customVars = isCustomHex ? {
    "--cal-custom": color,
    "--cal-custom-10": \`\${color}1a\`,
    "--cal-custom-20": \`\${color}33\`,
  } as React.CSSProperties : {};

  const theme = isCustomHex ? {
    primaryBg: "bg-[var(--cal-custom)] hover:brightness-110 text-white shadow-[0_4px_14px_0_var(--cal-custom-20)]",
    primaryText: "text-[var(--cal-custom)]",
    lightBg: "bg-[var(--cal-custom-10)] text-[var(--cal-custom)]",
    focusRing: "focus:ring-2 focus:ring-[var(--cal-custom-20)]",
    pulse: "bg-[var(--cal-custom)]"
  } : colorThemes[color] || colorThemes["indigo"];

  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const initialEventsList: any[] = [];
    Object.entries(mockEvents).forEach(([dateKey, types]) => {
      types.forEach((type, index) => {
        initialEventsList.push({ id: \`\${dateKey}-\${index}-\${Math.random()}\`, title: type === "pentest" ? "Pentest" : "Kick-Off", date: dateKey, time: "12:00", type: type, platform: type === "pentest" ? "slack" : "meet" });
      });
    });
    setEvents(initialEventsList);
  }, [mockEvents]);

  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1));
  const [activePopupEventId, setActivePopupEventId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState("");
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({ types: { pentest: true, kickoff: true }, platforms: { meet: true, slack: true, discord: true } });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const date = currentDate.getDate();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const monthShortName = currentDate.toLocaleString("default", { month: "short" });

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

      for (let i = firstDayIndex - 1; i >= 0; i--) days.push({ day: prevMonthDays - i, isCurrentMonth: false, dateKey: \`\${year}-\${month}-\${prevMonthDays - i}\` });
      for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, isCurrentMonth: true, dateKey: \`\${year}-\${month + 1}-\${i}\` });
      const remainingCells = 35 - days.length;
      const extraCells = remainingCells < 0 ? 42 - days.length : remainingCells;
      for (let i = 1; i <= extraCells; i++) days.push({ day: i, isCurrentMonth: false, dateKey: \`\${year}-\${month + 2}-\${i}\` });
    } else if (view === "week") {
      const currentDayOfWeek = currentDate.getDay();
      const distanceToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
      const startOfWeek = new Date(year, month, date - distanceToMonday);
      for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
        days.push({ day: d.getDate(), isCurrentMonth: true, dateKey: \`\${d.getFullYear()}-\${d.getMonth() + 1}-\${d.getDate()}\` });
      }
    } else if (view === "day") {
      days.push({ day: currentDate.getDate(), isCurrentMonth: true, dateKey: \`\${year}-\${month + 1}-\${date}\` });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  const filteredEvents = useMemo(() => events.filter((e) => (filters.types as any)[e.type] && (filters.platforms as any)[e.platform]), [events, filters]);

  const toggleFilter = (category: "types" | "platforms", key: string) => setFilters((prev: any) => ({ ...prev, [category]: { ...prev[category], [key]: !prev[category][key] } }));
  const deleteEvent = (id: string) => { setEvents(events.filter((e) => e.id !== id)); setActivePopupEventId(null); };

  const handleSaveEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawDate = formData.get("date") as string;
    const [y, m, d] = rawDate.split("-");
    const formattedDateKey = \`\${parseInt(y)}-\${parseInt(m)}-\${parseInt(d)}\`;

    const eventData = { id: editingEvent ? editingEvent.id : Date.now().toString(), title: formData.get("title"), date: formattedDateKey, time: formData.get("time"), type: formData.get("type"), platform: formData.get("platform") };
    if (editingEvent) { setEvents(events.map((ev) => (ev.id === editingEvent.id ? eventData : ev))); } else { setEvents([...events, eventData]); }
    setIsAddModalOpen(false); setEditingEvent(null); setSelectedDateKey(""); setActivePopupEventId(null);
  };

  const openAddModalForDate = (dateKey: string) => { setEditingEvent(null); setSelectedDateKey(dateKey); setIsAddModalOpen(true); };
  const openEditModal = (event: any) => { setEditingEvent(event); setIsAddModalOpen(true); };
  const closeModal = () => { setIsAddModalOpen(false); setEditingEvent(null); };

  const handleExportCSV = () => {
    const headers = ["ID", "Title", "Date", "Time", "Type", "Platform"];
    const csvRows = [headers.join(",")];
    events.forEach((e) => csvRows.push(\`\${e.id},"\${e.title}",\${e.date},\${e.time},\${e.type},\${e.platform}\`));
    const blob = new Blob([csvRows.join("\\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.setAttribute("download", "calendar_events.csv");
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  return (
    <div className={(isDark ? "dark" : "") + " w-full h-full max-w-full overflow-hidden"} style={customVars}>
      <div className={cn("w-full max-w-full h-auto lg:h-[700px] flex flex-col lg:flex-row text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 overflow-hidden", styles.wrapper, variant !== "minimal" ? "rounded-xl" : "")}>
        {/* MOBILE SIDEBAR DRAWER OVERLAY */}
        <div className={cn("fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-in-out", isMobileSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
          <div className={cn("fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 cursor-pointer", isMobileSidebarOpen ? "opacity-100" : "opacity-0")} onClick={() => setIsMobileSidebarOpen(false)} />
          <div className={cn("relative w-72 max-w-[80vw] h-full p-5 overflow-y-auto z-10 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out transform bg-card text-card-foreground", isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full", styles.sidebar)}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">{monthName} {year}</h2>
                <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors cursor-pointer" aria-label="Close Sidebar"><X className="w-5 h-5 cursor-pointer" /></button>
              </div>
                <hr className="border-border my-4" />
                <div className="mb-6">
                  <div className="flex items-center justify-between text-muted-foreground mb-3 cursor-pointer"><h3 className="text-sm font-medium">Events</h3><ChevronDown className="w-4 h-4 cursor-pointer" /></div>
                  <div className="space-y-2">
                    <div onClick={() => toggleFilter("types", "pentest")} className="flex items-center justify-between bg-muted/50 p-2.5 rounded-md cursor-pointer hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3"><div className="w-1.5 h-4 bg-yellow-400 rounded-full"></div><span className="text-sm font-medium">Pentest</span></div>
                      {filters.types.pentest ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />}
                    </div>
                    <div onClick={() => toggleFilter("types", "kickoff")} className="flex items-center justify-between bg-muted/50 p-2.5 rounded-md cursor-pointer hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3"><div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div><span className="text-sm font-medium">Kick-Off</span></div>
                      {filters.types.kickoff ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-muted-foreground mb-3 cursor-pointer"><h3 className="text-sm font-medium">Platforms</h3><ChevronDown className="w-4 h-4 cursor-pointer" /></div>
                  <div className="space-y-2">
                    <div onClick={() => toggleFilter("platforms", "meet")} className="flex items-center justify-between bg-muted/50 p-2.5 rounded-md cursor-pointer hover:bg-muted transition-colors">
                      <div className="flex items-center gap-2"><Video className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /><span className="text-sm font-medium">Google Meet</span></div>
                      {filters.platforms.meet ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />}
                    </div>
                    <div onClick={() => toggleFilter("platforms", "slack")} className="flex items-center justify-between bg-muted/50 p-2.5 rounded-md cursor-pointer hover:bg-muted transition-colors">
                      <div className="flex items-center gap-2"><Hash className="w-4 h-4 text-sky-500" /><span className="text-sm font-medium">Slack</span></div>
                      {filters.platforms.slack ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />}
                    </div>
                    <div onClick={() => toggleFilter("platforms", "discord")} className="flex items-center justify-between bg-muted/50 p-2.5 rounded-md cursor-pointer hover:bg-muted transition-colors">
                      <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-indigo-500" /><span className="text-sm font-medium">Discord</span></div>
                      {filters.platforms.discord ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-muted-foreground cursor-pointer" />}
                    </div>
                  </div>
                </div>
                <hr className="border-border my-5" />
                <button onClick={() => { handleExportCSV(); setIsMobileSidebarOpen(false); }} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-border bg-muted/50 hover:bg-muted text-foreground text-sm font-medium transition-colors cursor-pointer">
                  Export CSV <Download className="w-4 h-4" />
                </button>
              </div>
              </div>
            </div>
          </div>
        )}

        <aside className={cn("w-64 flex-shrink-0 p-5 overflow-y-auto hidden lg:block z-10 transition-colors duration-300", styles.sidebar)}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">{monthName} {year}</h2>
            <div className="flex gap-1 text-gray-400">
              <button onClick={prevPeriod} className="p-1 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded transition-colors"><ChevronLeft className="w-4 h-4 cursor-pointer" /></button>
              <button onClick={nextPeriod} className="p-1 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded transition-colors"><ChevronRight className="w-4 h-4 cursor-pointer" /></button>
            </div>
          </div>
          <hr className="border-gray-200 dark:border-gray-800/50 my-6" />
          <div className="mb-6">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-3 cursor-pointer">
              <h3 className="text-sm font-medium">Events</h3><ChevronDown className="w-4 h-4 cursor-pointer" />
            </div>
            <div className="space-y-2">
              <div onClick={() => toggleFilter("types", "pentest")} className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-2 rounded-md cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3"><div className="w-1 h-4 bg-yellow-400 rounded-full"></div><span className="text-sm font-medium">Pentest</span></div>
                {filters.types.pentest ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-gray-400 cursor-pointer" />}
              </div>
              <div onClick={() => toggleFilter("types", "kickoff")} className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-2 rounded-md cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3"><div className="w-1 h-4 bg-green-500 rounded-full"></div><span className="text-sm font-medium">Kick-Off</span></div>
                {filters.types.kickoff ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-gray-400 cursor-pointer" />}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-3 cursor-pointer">
              <h3 className="text-sm font-medium">Platforms</h3><ChevronDown className="w-4 h-4 cursor-pointer" />
            </div>
            <div className="space-y-2">
              <div onClick={() => toggleFilter("platforms", "meet")} className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-2 rounded-md cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2"><Video className="w-4 h-4 text-green-600" /><span className="text-sm font-medium">Google Meet</span></div>
                {filters.platforms.meet ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-gray-400 cursor-pointer" />}
              </div>
              <div onClick={() => toggleFilter("platforms", "slack")} className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-2 rounded-md cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2"><Hash className="w-4 h-4 text-blue-500" /><span className="text-sm font-medium">Slack</span></div>
                {filters.platforms.slack ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-gray-400 cursor-pointer" />}
              </div>
              <div onClick={() => toggleFilter("platforms", "discord")} className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-2 rounded-md cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 text-gray-500"><MessageSquare className="w-4 h-4 text-indigo-500" /><span className="text-sm font-medium">Discord</span></div>
                {filters.platforms.discord ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-gray-400 cursor-pointer" />}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col min-w-0 h-full">
          <header className={cn("flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 sm:p-5 gap-4 flex-shrink-0 z-10 transition-colors duration-300", styles.header)}>
            <div className="flex items-center justify-between w-full lg:w-auto gap-4">
              <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                <button onClick={() => setIsMobileSidebarOpen(true)} className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-gray-200 dark:border-gray-800 text-foreground transition-colors cursor-pointer" aria-label="Open Calendar Filters">
                  <Menu className="w-5 h-5 cursor-pointer" />
                </button>
                <div className="flex gap-1 text-gray-400">
                  <button onClick={prevPeriod} className="p-1 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded transition-colors cursor-pointer"><ChevronLeft className="w-5 h-5 cursor-pointer" /></button>
                  <button onClick={nextPeriod} className="p-1 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded transition-colors cursor-pointer"><ChevronRight className="w-5 h-5 cursor-pointer" /></button>
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold whitespace-nowrap lg:hidden">{view === "day" ? monthName + " " + date + ", " + year : monthName + " " + year}</h1>
              <button onClick={() => { setEditingEvent(null); setSelectedDateKey(""); setIsAddModalOpen(true); }} className={cn("flex items-center gap-2 cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors shadow-sm cursor-pointer ml-auto sm:ml-0", theme.primaryBg)}><Plus className="w-4 h-4 cursor-pointer" /> <span className="hidden sm:inline">Add</span></button>
            </div>
            <div className="flex items-center w-full lg:w-auto gap-2 sm:gap-4 justify-between lg:justify-end">
              <div className="flex bg-black/5 dark:bg-white/5 rounded-lg p-1 text-xs sm:text-sm font-medium shrink-0 justify-start">
                <button onClick={goToToday} className="px-3 sm:px-4 py-1.5 cursor-pointer hover:text-gray-900 dark:hover:text-white text-gray-500 transition-colors">Today</button>
                <button onClick={() => setView("day")} className={cn("px-3 sm:px-4 py-1.5 cursor-pointer rounded-md shadow-sm transition-colors", view === "day" ? theme.lightBg : "hover:text-gray-900 dark:hover:text-white text-gray-500")}>Day</button>
                <button onClick={() => setView("week")} className={cn("px-3 sm:px-4 py-1.5 cursor-pointer rounded-md shadow-sm transition-colors", view === "week" ? theme.lightBg : "hover:text-gray-900 dark:hover:text-white text-gray-500")}>Week</button>
                <button onClick={() => setView("month")} className={cn("px-3 sm:px-4 py-1.5 cursor-pointer rounded-md shadow-sm transition-colors", view === "month" ? theme.lightBg : "hover:text-gray-900 dark:hover:text-white text-gray-500")}>Month</button>
              </div>
              <button onClick={handleExportCSV} className="hidden sm:flex items-center cursor-pointer gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 dark:border-gray-700/50 rounded-md text-xs sm:text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Export <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 cursor-pointer" /></button>
            </div>
          </header>

          <div className={cn("flex-1 overflow-hidden relative transition-colors duration-300", styles.gridOuter)}>
            <div className="w-full min-w-0 flex flex-col h-full">
              {view !== "day" && (
                <div className={cn("sticky top-0 z-20 grid grid-cols-7 transition-colors duration-300", styles.gridHeader)}>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((dayName, idx) => (
                    <div key={dayName} className={cn("py-1.5 sm:py-3 px-1 sm:px-4 text-[11px] sm:text-sm font-medium text-gray-500 dark:text-gray-400 text-center truncate", variant !== "minimal" && idx !== 6 ? "border-r border-gray-200 dark:border-gray-800" : "")}>
                      <span className="hidden sm:inline">{dayName}</span><span className="sm:hidden">{dayName.slice(0, 3)}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className={cn("grid flex-1 " + (view === "day" ? "grid-cols-1 auto-rows-[minmax(350px,1fr)]" : "grid-cols-7 auto-rows-[minmax(65px,1fr)] md:auto-rows-[minmax(95px,1fr)] lg:auto-rows-[minmax(120px,1fr)]"), styles.gridGap)}>
                {calendarDays.map((dayObj, index) => {
                  const dayEvents = filteredEvents.filter((e) => e.date === dayObj.dateKey);
                  return <CalendarCell key={index} day={dayObj.day} events={dayEvents} isGray={!dayObj.isCurrentMonth} activePopupEventId={activePopupEventId} setActivePopupEventId={setActivePopupEventId} colIndex={view === "day" ? 0 : index % 7} rowIndex={Math.floor(index / 7)} dateStr={dayObj.dateKey.split("-").reverse().join(".")} onDeleteEvent={deleteEvent} onEditEvent={openEditModal} onClickCell={() => openAddModalForDate(dayObj.dateKey)} cellClass={styles.cellBg} theme={theme} />;
                })}
              </div>
            </div>
          </div>
        </main>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 cursor-pointer" onClick={closeModal}>
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in duration-200 cursor-default" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{editingEvent ? "Update Event" : "Add New Event"}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"><X className="w-5 h-5 cursor-pointer" /></button>
            </div>
            <form onSubmit={handleSaveEvent} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Title</label>
                <input required name="title" type="text" defaultValue={editingEvent ? editingEvent.title : ""} placeholder="e.g. Q3 Roadmap Review" className={cn("w-full cursor-text border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-transparent focus:ring-2 focus:outline-none dark:text-white transition-shadow", theme.focusRing)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                  <input required name="date" type="date" defaultValue={editingEvent ? formatDateForInput(editingEvent.date) : formatDateForInput(selectedDateKey) || \`\${year}-\${String(month + 1).padStart(2, "0")}-01\`} className={cn("w-full cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-transparent focus:ring-2 focus:outline-none dark:text-white [color-scheme:light] dark:[color-scheme:dark] transition-shadow", theme.focusRing)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                  <input required name="time" type="time" defaultValue={editingEvent ? editingEvent.time : "12:00"} className={cn("w-full cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-transparent focus:ring-2 focus:outline-none dark:text-white [color-scheme:light] dark:[color-scheme:dark] transition-shadow", theme.focusRing)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Type</label>
                  <select name="type" defaultValue={editingEvent ? editingEvent.type : "pentest"} className={cn("w-full cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 focus:ring-2 focus:outline-none dark:text-white transition-shadow", theme.focusRing)}>
                    <option value="pentest">Pentest</option><option value="kickoff">Kick-Off</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Platform</label>
                  <select name="platform" defaultValue={editingEvent ? editingEvent.platform : "meet"} className={cn("w-full cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 focus:ring-2 focus:outline-none dark:text-white transition-shadow", theme.focusRing)}>
                    <option value="meet">Google Meet</option><option value="slack">Slack</option><option value="discord">Discord</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer">Cancel</button>
                <button type="submit" className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors shadow-sm cursor-pointer", theme.primaryBg)}>{editingEvent ? "Update Event" : "Add Event"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarCell({ day, events = [], isGray, activePopupEventId, setActivePopupEventId, colIndex, rowIndex, dateStr, onDeleteEvent, onEditEvent, onClickCell, cellClass, theme }: any) {
  const popupXClass = colIndex >= 4 ? "sm:right-0" : "sm:left-0";
  const popupYClass = rowIndex >= 4 ? "sm:bottom-full sm:mb-2" : "sm:top-12";
  const isAnyPopupOpen = events.some((e: any) => e.id === activePopupEventId);

  return (
    <div onClick={onClickCell} className={cn(\`relative flex flex-col p-1.5 sm:p-2 h-full transition-colors cursor-pointer \${isAnyPopupOpen ? "z-30" : "z-10 hover:z-20"} \${isGray ? "text-gray-400 dark:text-gray-600 opacity-60" : "text-gray-900 dark:text-gray-100"}\`, cellClass)}>
      <div className={\`text-xs sm:text-sm font-medium mb-1 sm:mb-2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded shrink-0\`}>{day}</div>
      <div className="flex-1 overflow-y-auto space-y-1 sm:space-y-1.5 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {events.map((event: any) => {
          const isPopupOpen = activePopupEventId === event.id;
          const isPentest = event.type === "pentest";
          const borderClass = isGray ? "border-gray-200 bg-gray-50 text-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-600" : isPentest ? "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800/50 dark:bg-yellow-900/30 dark:text-yellow-400" : "border-green-200 bg-green-50 text-green-800 dark:border-green-800/50 dark:bg-green-900/30 dark:text-green-400";
          const PlatformIcon = event.platform === "meet" ? Video : event.platform === "slack" ? Hash : MessageSquare;
          const iconColor = event.platform === "meet" ? "text-green-600" : event.platform === "slack" ? "text-blue-500" : "text-indigo-500";

          return (
            <div key={event.id} onClick={(e) => { e.stopPropagation(); setActivePopupEventId(isPopupOpen ? null : event.id); }} className={\`flex items-center justify-between px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded border cursor-pointer hover:brightness-95 transition-all \${borderClass}\`}>
              <div className="flex items-center gap-1 sm:gap-1.5 truncate">
                <PlatformIcon className={\`w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 cursor-pointer \${iconColor}\`} />
                <span className="truncate cursor-pointer">{event.title}</span>
              </div>
              <span className="opacity-70 shrink-0 ml-1 hidden sm:inline cursor-pointer">{event.time}</span>
            </div>
          );
        })}
      </div>
      {events.map((event: any) => {
        const isPopupOpen = activePopupEventId === event.id;
        if (!isPopupOpen) return null;
        const PlatformIcon = event.platform === "meet" ? Video : event.platform === "slack" ? Hash : MessageSquare;
        const iconColor = event.platform === "meet" ? "text-green-600" : event.platform === "slack" ? "text-blue-500" : "text-indigo-500";

        return (
          <div key={\`popup-\${event.id}\`}>
            <div className="fixed inset-0 z-40 bg-black/20 dark:bg-black/60 sm:bg-transparent cursor-pointer" onClick={(e) => { e.stopPropagation(); setActivePopupEventId(null); }} />
            <div className={\`fixed sm:absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[320px] sm:top-auto sm:left-auto sm:translate-x-0 sm:translate-y-0 sm:w-72 \${popupXClass} \${popupYClass} bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 p-4 cursor-default animate-in fade-in zoom-in-95 duration-150\`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-semibold text-base text-gray-900 dark:text-white truncate pr-4">{event.title}</h4>
                <div className="flex items-center gap-2 text-gray-400 shrink-0">
                  <Edit2 onClick={(e) => { e.stopPropagation(); onEditEvent(event); }} className="w-4 h-4 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors" />
                  <Trash2 onClick={(e) => { e.stopPropagation(); onDeleteEvent(event.id); }} className="w-4 h-4 cursor-pointer hover:text-red-500 transition-colors" />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className={cn("flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md", theme.lightBg)}>
                  <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", theme.pulse)}></div> Pending
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Calendar1 className="w-4 h-4" /> {dateStr} at {event.time}
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                Join with {event.platform === "meet" ? "Google Meet" : event.platform === "slack" ? "Slack" : "Discord"} <PlatformIcon className={\`w-4 h-4 cursor-pointer \${iconColor}\`} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Calendar, CalendarDashboard, CalendarDayButton };`;

// ==========================================
// 2. JAVASCRIPT ENGINE CODE
// ==========================================
const CALENDAR_ENGINE_JS = `"use client";

import {
  Calendar1, CheckSquare, ChevronDown, ChevronDownIcon, ChevronLeft, ChevronLeftIcon, ChevronRight, ChevronRightIcon, Download, Edit2, Hash, MessageSquare, Plus, Square, Trash2, Video, X,
} from "lucide-react";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

const dashboardVariants = {
  default: { wrapper: "bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm", sidebar: "bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800", header: "bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800", gridOuter: "bg-gray-200 dark:bg-gray-800 p-px", gridGap: "gap-px", gridHeader: "bg-white/95 dark:bg-gray-950/95 border-b border-gray-200 dark:border-gray-800", cellBg: "bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900/50" },
  minimal: { wrapper: "bg-transparent border-none", sidebar: "bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-800/50 lg:mr-6", header: "bg-transparent border-none mb-4 rounded-xl", gridOuter: "bg-transparent p-0", gridGap: "gap-2 sm:gap-3", gridHeader: "bg-transparent border-none pb-2", cellBg: "bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm" },
  glass: { wrapper: "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl", sidebar: "bg-white/10 dark:bg-black/10 border-r border-white/20 dark:border-white/10", header: "bg-transparent border-b border-white/20 dark:border-white/10", gridOuter: "bg-gray-400/20 dark:bg-gray-700/30 p-px", gridGap: "gap-px", gridHeader: "bg-white/20 dark:bg-black/20 backdrop-blur-md border-b border-white/20 dark:border-white/10", cellBg: "bg-white/50 dark:bg-black/50 hover:bg-white/80 dark:hover:bg-black/80 backdrop-blur-sm" },
};

const colorThemes = {
  indigo: { primaryBg: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20", primaryText: "text-indigo-600 dark:text-indigo-400", lightBg: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300", focusRing: "focus:ring-indigo-500", pulse: "bg-indigo-500" },
  rose: { primaryBg: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20", primaryText: "text-rose-600 dark:text-rose-400", lightBg: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300", focusRing: "focus:ring-rose-500", pulse: "bg-rose-500" },
  emerald: { primaryBg: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20", primaryText: "text-emerald-600 dark:text-emerald-400", lightBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300", focusRing: "focus:ring-emerald-500", pulse: "bg-emerald-500" },
  blue: { primaryBg: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20", primaryText: "text-blue-600 dark:text-blue-400", lightBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300", focusRing: "focus:ring-blue-500", pulse: "bg-blue-500" },
  zinc: { primaryBg: "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black shadow-zinc-900/20", primaryText: "text-zinc-900 dark:text-white", lightBg: "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white", focusRing: "focus:ring-zinc-500 dark:focus:ring-zinc-400", pulse: "bg-zinc-900 dark:bg-white" },
};

function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", formatters, components, ...props }) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw\`rtl:**:[.rdp-button\\_next>svg]:rotate-180\`, String.raw\`rtl:**:[.rdp-button\\_previous>svg]:rotate-180\`, className)}
      captionLayout={captionLayout}
      formatters={{ formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }), ...formatters }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("flex gap-4 flex-col md:flex-row relative", defaultClassNames.months),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn("flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between", defaultClassNames.nav),
        button_previous: cn(buttonVariants({ variant: buttonVariant }), "size-(--cell-size) aria-disabled:opacity-50 p-0 cursor-pointer select-none", defaultClassNames.button_previous),
        button_next: cn(buttonVariants({ variant: buttonVariant }), "size-(--cell-size) aria-disabled:opacity-50 p-0 cursor-pointer select-none", defaultClassNames.button_next),
        month_caption: cn("flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)", defaultClassNames.month_caption),
        dropdowns: cn("w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5", defaultClassNames.dropdowns),
        dropdown_root: cn("relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md cursor-pointer", defaultClassNames.dropdown_root),
        dropdown: cn("absolute bg-popover inset-0 opacity-0 cursor-pointer", defaultClassNames.dropdown),
        caption_label: cn("select-none font-medium cursor-pointer", captionLayout === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5", defaultClassNames.caption_label),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn("text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none", defaultClassNames.weekday),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn("select-none w-(--cell-size)", defaultClassNames.week_number_header),
        week_number: cn("text-[0.8rem] select-none text-muted-foreground", defaultClassNames.week_number),
        day: cn("relative w-full h-full p-0 text-center cursor-pointer [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none", defaultClassNames.day),
        range_start: cn("rounded-l-md bg-accent", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn("bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none", defaultClassNames.today),
        outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />,
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") return <ChevronLeftIcon className={cn("size-4 cursor-pointer", className)} {...props} />;
          if (orientation === "right") return <ChevronRightIcon className={cn("size-4 cursor-pointer", className)} {...props} />;
          return <ChevronDownIcon className={cn("size-4 cursor-pointer", className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => <td {...props}><div className="flex size-(--cell-size) items-center justify-center text-center">{children}</div></td>,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef(null);
  React.useEffect(() => { if (modifiers.focused) ref.current?.focus(); }, [modifiers.focused]);
  return (
    <Button
      ref={ref} variant="ghost" size="icon" data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      data-range-start={modifiers.range_start} data-range-end={modifiers.range_end} data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal cursor-pointer group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day, className
      )}
      {...props}
    />
  );
}

const formatDateForInput = (dateKey) => {
  if (!dateKey) return "";
  const [y, m, d] = dateKey.split("-");
  return \`\${y}-\${String(m).padStart(2, "0")}-\${String(d).padStart(2, "0")}\`;
};

export function CalendarDashboard({ mockEvents = {}, variant = "default", color = "indigo" }) {
  const [isDark, setIsDark] = useState(false);
  const styles = dashboardVariants[variant];
  
  const isCustomHex = color && color.startsWith("#");
  const customVars = isCustomHex ? {
    "--cal-custom": color,
    "--cal-custom-10": \`\${color}1a\`,
    "--cal-custom-20": \`\${color}33\`,
  } : {};

  const theme = isCustomHex ? {
    primaryBg: "bg-[var(--cal-custom)] hover:brightness-110 text-white shadow-[0_4px_14px_0_var(--cal-custom-20)]",
    primaryText: "text-[var(--cal-custom)]",
    lightBg: "bg-[var(--cal-custom-10)] text-[var(--cal-custom)]",
    focusRing: "focus:ring-2 focus:ring-[var(--cal-custom-20)]",
    pulse: "bg-[var(--cal-custom)]"
  } : colorThemes[color] || colorThemes["indigo"];

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const initialEventsList = [];
    Object.entries(mockEvents).forEach(([dateKey, types]) => {
      types.forEach((type, index) => {
        initialEventsList.push({ id: \`\${dateKey}-\${index}-\${Math.random()}\`, title: type === "pentest" ? "Pentest" : "Kick-Off", date: dateKey, time: "12:00", type: type, platform: type === "pentest" ? "slack" : "meet" });
      });
    });
    setEvents(initialEventsList);
  }, [mockEvents]);

  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1));
  const [activePopupEventId, setActivePopupEventId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [filters, setFilters] = useState({ types: { pentest: true, kickoff: true }, platforms: { meet: true, slack: true, discord: true } });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const date = currentDate.getDate();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

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

      for (let i = firstDayIndex - 1; i >= 0; i--) days.push({ day: prevMonthDays - i, isCurrentMonth: false, dateKey: \`\${year}-\${month}-\${prevMonthDays - i}\` });
      for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, isCurrentMonth: true, dateKey: \`\${year}-\${month + 1}-\${i}\` });
      const remainingCells = 35 - days.length;
      const extraCells = remainingCells < 0 ? 42 - days.length : remainingCells;
      for (let i = 1; i <= extraCells; i++) days.push({ day: i, isCurrentMonth: false, dateKey: \`\${year}-\${month + 2}-\${i}\` });
    } else if (view === "week") {
      const currentDayOfWeek = currentDate.getDay();
      const distanceToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
      const startOfWeek = new Date(year, month, date - distanceToMonday);
      for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
        days.push({ day: d.getDate(), isCurrentMonth: true, dateKey: \`\${d.getFullYear()}-\${d.getMonth() + 1}-\${d.getDate()}\` });
      }
    } else if (view === "day") {
      days.push({ day: currentDate.getDate(), isCurrentMonth: true, dateKey: \`\${year}-\${month + 1}-\${date}\` });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  const filteredEvents = useMemo(() => events.filter((e) => filters.types[e.type] && filters.platforms[e.platform]), [events, filters]);

  const toggleFilter = (category, key) => setFilters((prev) => ({ ...prev, [category]: { ...prev[category], [key]: !prev[category][key] } }));
  const deleteEvent = (id) => { setEvents(events.filter((e) => e.id !== id)); setActivePopupEventId(null); };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawDate = formData.get("date");
    const [y, m, d] = rawDate.split("-");
    const formattedDateKey = \`\${parseInt(y)}-\${parseInt(m)}-\${parseInt(d)}\`;

    const eventData = { id: editingEvent ? editingEvent.id : Date.now().toString(), title: formData.get("title"), date: formattedDateKey, time: formData.get("time"), type: formData.get("type"), platform: formData.get("platform") };
    if (editingEvent) { setEvents(events.map((ev) => (ev.id === editingEvent.id ? eventData : ev))); } else { setEvents([...events, eventData]); }
    setIsAddModalOpen(false); setEditingEvent(null); setSelectedDateKey(""); setActivePopupEventId(null);
  };

  const openAddModalForDate = (dateKey) => { setEditingEvent(null); setSelectedDateKey(dateKey); setIsAddModalOpen(true); };
  const openEditModal = (event) => { setEditingEvent(event); setIsAddModalOpen(true); };
  const closeModal = () => { setIsAddModalOpen(false); setEditingEvent(null); };

  const handleExportCSV = () => {
    const headers = ["ID", "Title", "Date", "Time", "Type", "Platform"];
    const csvRows = [headers.join(",")];
    events.forEach((e) => csvRows.push(\`\${e.id},"\${e.title}",\${e.date},\${e.time},\${e.type},\${e.platform}\`));
    const blob = new Blob([csvRows.join("\\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.setAttribute("download", "calendar_events.csv");
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  return (
    <div className={\`\${isDark ? "dark" : ""} w-full h-full\`} style={customVars}>
      <div className={cn("w-full h-[700px] flex flex-col lg:flex-row text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300", styles.wrapper, variant !== "minimal" ? "rounded-xl overflow-hidden" : "")}>
        <aside className={cn("w-64 flex-shrink-0 p-5 overflow-y-auto hidden lg:block z-10 transition-colors duration-300", styles.sidebar)}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">{monthName} {year}</h2>
            <div className="flex gap-1 text-gray-400">
              <button onClick={prevPeriod} className="p-1 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded transition-colors"><ChevronLeft className="w-4 h-4 cursor-pointer" /></button>
              <button onClick={nextPeriod} className="p-1 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded transition-colors"><ChevronRight className="w-4 h-4 cursor-pointer" /></button>
            </div>
          </div>
          <hr className="border-gray-200 dark:border-gray-800/50 my-6" />
          <div className="mb-6">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-3 cursor-pointer">
              <h3 className="text-sm font-medium">Events</h3><ChevronDown className="w-4 h-4 cursor-pointer" />
            </div>
            <div className="space-y-2">
              <div onClick={() => toggleFilter("types", "pentest")} className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-2 rounded-md cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3"><div className="w-1 h-4 bg-yellow-400 rounded-full"></div><span className="text-sm font-medium">Pentest</span></div>
                {filters.types.pentest ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-gray-400 cursor-pointer" />}
              </div>
              <div onClick={() => toggleFilter("types", "kickoff")} className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-2 rounded-md cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3"><div className="w-1 h-4 bg-green-500 rounded-full"></div><span className="text-sm font-medium">Kick-Off</span></div>
                {filters.types.kickoff ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-gray-400 cursor-pointer" />}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-3 cursor-pointer">
              <h3 className="text-sm font-medium">Platforms</h3><ChevronDown className="w-4 h-4 cursor-pointer" />
            </div>
            <div className="space-y-2">
              <div onClick={() => toggleFilter("platforms", "meet")} className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-2 rounded-md cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2"><Video className="w-4 h-4 text-green-600" /><span className="text-sm font-medium">Google Meet</span></div>
                {filters.platforms.meet ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-gray-400 cursor-pointer" />}
              </div>
              <div onClick={() => toggleFilter("platforms", "slack")} className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-2 rounded-md cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2"><Hash className="w-4 h-4 text-blue-500" /><span className="text-sm font-medium">Slack</span></div>
                {filters.platforms.slack ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-gray-400 cursor-pointer" />}
              </div>
              <div onClick={() => toggleFilter("platforms", "discord")} className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-2 rounded-md cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 text-gray-500"><MessageSquare className="w-4 h-4 text-indigo-500" /><span className="text-sm font-medium">Discord</span></div>
                {filters.platforms.discord ? <CheckSquare className={cn("w-4 h-4 cursor-pointer", theme.primaryText)} /> : <Square className="w-4 h-4 text-gray-400 cursor-pointer" />}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col min-w-0 h-full">
          <header className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 gap-4 flex-shrink-0 z-10 transition-colors duration-300", styles.header)}>
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                <div className="flex gap-1 text-gray-400">
                  <button onClick={prevPeriod} className="p-1 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded transition-colors"><ChevronLeft className="w-5 h-5 cursor-pointer" /></button>
                  <button onClick={nextPeriod} className="p-1 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded transition-colors"><ChevronRight className="w-5 h-5 cursor-pointer" /></button>
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold sm:w-48 whitespace-nowrap lg:hidden">{view === "day" ? \`\${monthName} \${date}, \${year}\` : \`\${monthName} \${year}\`}</h1>
              <button onClick={() => { setEditingEvent(null); setIsAddModalOpen(true); }} className={cn("sm:hidden flex items-center justify-center p-2 rounded-md transition-colors shadow-sm", theme.primaryBg)}><Plus className="w-5 h-5 cursor-pointer" /></button>
            </div>
            <div className="flex items-center w-full sm:w-auto gap-2 sm:gap-4 justify-between sm:justify-end">
              <div className="flex bg-black/5 dark:bg-white/5 rounded-lg p-1 text-xs sm:text-sm font-medium w-full sm:w-auto justify-between sm:justify-start">
                <button onClick={goToToday} className="px-3 sm:px-4 py-1.5 cursor-pointer hover:text-gray-900 dark:hover:text-white text-gray-500 transition-colors">Today</button>
                <button onClick={() => setView("day")} className={cn("px-3 sm:px-4 py-1.5 cursor-pointer rounded-md shadow-sm transition-colors", view === "day" ? theme.lightBg : "hover:text-gray-900 dark:hover:text-white text-gray-500")}>Day</button>
                <button onClick={() => setView("week")} className={cn("px-3 sm:px-4 py-1.5 cursor-pointer rounded-md shadow-sm transition-colors hidden sm:block", view === "week" ? theme.lightBg : "hover:text-gray-900 dark:hover:text-white text-gray-500")}>Week</button>
                <button onClick={() => setView("month")} className={cn("px-3 sm:px-4 py-1.5 cursor-pointer rounded-md shadow-sm transition-colors", view === "month" ? theme.lightBg : "hover:text-gray-900 dark:hover:text-white text-gray-500")}>Month</button>
              </div>
              <button onClick={handleExportCSV} className="hidden lg:flex items-center cursor-pointer gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700/50 rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Export <Download className="w-4 h-4 cursor-pointer" /></button>
              <button onClick={() => { setEditingEvent(null); setSelectedDateKey(""); setIsAddModalOpen(true); }} className={cn("hidden sm:flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm", theme.primaryBg)}><Plus className="w-4 h-4 cursor-pointer" /> Add</button>
            </div>
          </header>

          <div className={cn("flex-1 overflow-x-auto overflow-y-auto relative transition-colors duration-300", styles.gridOuter)}>
            <div className="min-w-[600px] lg:min-w-0 w-full flex flex-col h-full min-h-[500px]">
              {view !== "day" && (
                <div className={cn("sticky top-0 z-20 grid grid-cols-7 transition-colors duration-300", styles.gridHeader)}>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((dayName, idx) => (
                    <div key={dayName} className={cn("py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 text-center", variant !== "minimal" && idx !== 6 ? "border-r border-gray-200 dark:border-gray-800" : "")}>
                      <span className="hidden sm:inline">{dayName}</span><span className="sm:hidden">{dayName.slice(0, 3)}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className={cn(\`grid flex-1 \${view === "day" ? "grid-cols-1 auto-rows-[minmax(400px,1fr)]" : "grid-cols-7 auto-rows-[minmax(120px,1fr)]"}\`, styles.gridGap)}>
                {calendarDays.map((dayObj, index) => {
                  const dayEvents = filteredEvents.filter((e) => e.date === dayObj.dateKey);
                  return <CalendarCell key={index} day={dayObj.day} events={dayEvents} isGray={!dayObj.isCurrentMonth} activePopupEventId={activePopupEventId} setActivePopupEventId={setActivePopupEventId} colIndex={view === "day" ? 0 : index % 7} rowIndex={Math.floor(index / 7)} dateStr={dayObj.dateKey.split("-").reverse().join(".")} onDeleteEvent={deleteEvent} onEditEvent={openEditModal} onClickCell={() => openAddModalForDate(dayObj.dateKey)} cellClass={styles.cellBg} theme={theme} />;
                })}
              </div>
            </div>
          </div>
        </main>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 cursor-pointer" onClick={closeModal}>
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in duration-200 cursor-default" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{editingEvent ? "Update Event" : "Add New Event"}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"><X className="w-5 h-5 cursor-pointer" /></button>
            </div>
            <form onSubmit={handleSaveEvent} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Title</label>
                <input required name="title" type="text" defaultValue={editingEvent ? editingEvent.title : ""} placeholder="e.g. Q3 Roadmap Review" className={cn("w-full cursor-text border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-transparent focus:ring-2 focus:outline-none dark:text-white transition-shadow", theme.focusRing)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                  <input required name="date" type="date" defaultValue={editingEvent ? formatDateForInput(editingEvent.date) : formatDateForInput(selectedDateKey) || \`\${year}-\${String(month + 1).padStart(2, "0")}-01\`} className={cn("w-full cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-transparent focus:ring-2 focus:outline-none dark:text-white [color-scheme:light] dark:[color-scheme:dark] transition-shadow", theme.focusRing)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                  <input required name="time" type="time" defaultValue={editingEvent ? editingEvent.time : "12:00"} className={cn("w-full cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-transparent focus:ring-2 focus:outline-none dark:text-white [color-scheme:light] dark:[color-scheme:dark] transition-shadow", theme.focusRing)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Type</label>
                  <select name="type" defaultValue={editingEvent ? editingEvent.type : "pentest"} className={cn("w-full cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 focus:ring-2 focus:outline-none dark:text-white transition-shadow", theme.focusRing)}>
                    <option value="pentest">Pentest</option><option value="kickoff">Kick-Off</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Platform</label>
                  <select name="platform" defaultValue={editingEvent ? editingEvent.platform : "meet"} className={cn("w-full cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 focus:ring-2 focus:outline-none dark:text-white transition-shadow", theme.focusRing)}>
                    <option value="meet">Google Meet</option><option value="slack">Slack</option><option value="discord">Discord</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer">Cancel</button>
                <button type="submit" className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors shadow-sm cursor-pointer", theme.primaryBg)}>{editingEvent ? "Update Event" : "Add Event"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarCell({ day, events = [], isGray, activePopupEventId, setActivePopupEventId, colIndex, rowIndex, dateStr, onDeleteEvent, onEditEvent, onClickCell, cellClass, theme }: any) {
  const popupXClass = colIndex >= 4 ? "sm:right-0" : "sm:left-0";
  const popupYClass = rowIndex >= 4 ? "sm:bottom-full sm:mb-2" : "sm:top-12";
  const isAnyPopupOpen = events.some((e: any) => e.id === activePopupEventId);

  return (
    <div onClick={onClickCell} className={cn(\`relative flex flex-col p-1.5 sm:p-2 h-full transition-colors cursor-pointer \${isAnyPopupOpen ? "z-30" : "z-10 hover:z-20"} \${isGray ? "text-gray-400 dark:text-gray-600 opacity-60" : "text-gray-900 dark:text-gray-100"}\`, cellClass)}>
      <div className={\`text-xs sm:text-sm font-medium mb-1 sm:mb-2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded shrink-0\`}>{day}</div>
      <div className="flex-1 overflow-y-auto space-y-1 sm:space-y-1.5 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {events.map((event: any) => {
          const isPopupOpen = activePopupEventId === event.id;
          const isPentest = event.type === "pentest";
          const borderClass = isGray ? "border-gray-200 bg-gray-50 text-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-600" : isPentest ? "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800/50 dark:bg-yellow-900/30 dark:text-yellow-400" : "border-green-200 bg-green-50 text-green-800 dark:border-green-800/50 dark:bg-green-900/30 dark:text-green-400";
          const PlatformIcon = event.platform === "meet" ? Video : event.platform === "slack" ? Hash : MessageSquare;
          const iconColor = event.platform === "meet" ? "text-green-600" : event.platform === "slack" ? "text-blue-500" : "text-indigo-500";

          return (
            <div key={event.id} onClick={(e) => { e.stopPropagation(); setActivePopupEventId(isPopupOpen ? null : event.id); }} className={\`flex items-center justify-between px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded border cursor-pointer hover:brightness-95 transition-all \${borderClass}\`}>
              <div className="flex items-center gap-1 sm:gap-1.5 truncate">
                <PlatformIcon className={\`w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0 cursor-pointer \${iconColor}\`} />
                <span className="truncate cursor-pointer">{event.title}</span>
              </div>
              <span className="opacity-70 shrink-0 ml-1 hidden sm:inline cursor-pointer">{event.time}</span>
            </div>
          );
        })}
      </div>
      {events.map((event: any) => {
        const isPopupOpen = activePopupEventId === event.id;
        if (!isPopupOpen) return null;
        const PlatformIcon = event.platform === "meet" ? Video : event.platform === "slack" ? Hash : MessageSquare;
        const iconColor = event.platform === "meet" ? "text-green-600" : event.platform === "slack" ? "text-blue-500" : "text-indigo-500";

        return (
          <div key={\`popup-\${event.id}\`}>
            <div className="fixed inset-0 z-40 bg-black/20 dark:bg-black/60 sm:bg-transparent cursor-pointer" onClick={(e) => { e.stopPropagation(); setActivePopupEventId(null); }} />
            <div className={\`fixed sm:absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[320px] sm:top-auto sm:left-auto sm:translate-x-0 sm:translate-y-0 sm:w-72 \${popupXClass} \${popupYClass} bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 p-4 cursor-default animate-in fade-in zoom-in-95 duration-150\`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-semibold text-base text-gray-900 dark:text-white truncate pr-4">{event.title}</h4>
                <div className="flex items-center gap-2 text-gray-400 shrink-0">
                  <Edit2 onClick={(e) => { e.stopPropagation(); onEditEvent(event); }} className="w-4 h-4 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors" />
                  <Trash2 onClick={(e) => { e.stopPropagation(); onDeleteEvent(event.id); }} className="w-4 h-4 cursor-pointer hover:text-red-500 transition-colors" />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className={cn("flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md", theme.lightBg)}>
                  <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", theme.pulse)}></div> Pending
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Calendar1 className="w-4 h-4" /> {dateStr} at {event.time}
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                Join with {event.platform === "meet" ? "Google Meet" : event.platform === "slack" ? "Slack" : "Discord"} <PlatformIcon className={\`w-4 h-4 cursor-pointer \${iconColor}\`} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Calendar, CalendarDashboard, CalendarDayButton };`;

export function CalendarShowcase() {
  const [variant, setVariant] = useState<CalendarVariant>("default");

  const [color, setColor] = useState<CalendarColor | string>("primary");

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  // Dynamic code generation based on selected state
  const generateUsageCode = (isTs: boolean) => {
    const colorPropStr = color && color !== "primary" && color !== "default" ? `\n        color="${color}"` : "";
    return `"use client";

import { CalendarDashboard } from "@/components/custom/blocks/Calendar";

export default function CalendarDemo()${isTs ? " : React.JSX.Element" : ""} {
  // Pre-populate with your own data format
  const initialEvents = {
    "2025-8-31": ["pentest", "kickoff", "pentest"],
    "2025-9-2": ["pentest", "kickoff"],
    "2025-9-10": ["pentest", "kickoff"],
  };

  return (
    <div className="w-full h-screen p-4">
      <CalendarDashboard
        mockEvents={initialEvents}
        variant="${variant}"${colorPropStr}
      />
    </div>
  );
};`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl flex-wrap">
        <VariantTabs
          variants={["default", "minimal", "glass"]}
          label="Style Variant"
          defaultValue={variant}
          onValueChange={(v) => setVariant(v as CalendarVariant)}
        />

        <ThemeColorPicker color={color} onChange={handleColorChange} label="Theme Color" />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="CalendarDashboard"
        tsCode={CALENDAR_ENGINE_TS}
        jsCode={CALENDAR_ENGINE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
        sandbox="calendar"
        sandboxProps={{ variant, color }}
      >
        <div
          className={`w-full transition-all duration-500 ${variant === "glass" ? "p-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl" : ""}`}
        >
          <CalendarDashboard
            key={`${variant}-${color}`} // Force re-render on theme change to prevent state staleness
            variant={variant}
            color={color}
            mockEvents={{
              "2025-8-31": ["pentest", "kickoff", "pentest"],
              "2025-9-2": ["pentest", "kickoff"],
              "2025-9-10": ["pentest", "kickoff"],
              "2025-9-15": ["pentest", "kickoff"],
              "2025-9-24": ["kickoff", "pentest"],
            }}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
