"use client";

import { cn } from "@/lib/utils";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChartColumnBig,
  ChartSpline,
  CloudOff,
  Download,
  Globe,
  Inbox,
  Info,
  Mail,
  Minus,
  PenLine,
  UserPlus,
  Wallet,
} from "lucide-react";
import React, { useEffect, useId, useMemo, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { ChartBlock } from "./ChartBlock";
import { Popover, PopoverContent, PopoverTrigger } from "./PopoverBlock";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroupBlock";

// ==========================================
// TYPES
// ==========================================
export type DashboardPeriod = "day" | "week" | "month";

export interface DashboardPoint {
  /** Axis label, e.g. "Mon" or "Sep". */
  label: string;
  /** Narrow-screen label, e.g. "M". Defaults to `label`. */
  shortLabel?: string;
  /** Spoken and tooltip label, e.g. "Monday, Sep 28". Defaults to `label`. */
  fullLabel?: string;
  value: number;
}

export interface DashboardMetric {
  id: string;
  /** Tab label, e.g. "New users". */
  label: string;
  /** Shown beside the label in the tab from `sm` up. */
  icon?: React.ReactNode;
  /** Singular and plural for counts and the summary line, e.g. ["new user", "new users"]. */
  noun?: [string, string];
  /** Set for money: an ISO currency code such as "USD". */
  currency?: string;
  /** One series per period, oldest first; the last point is the current one. */
  series: Record<DashboardPeriod, DashboardPoint[]>;
  /** Percent change of the current point against the one before (12.5 = +12.5%). */
  change?: Partial<Record<DashboardPeriod, number | null>>;
}

export interface DashboardTotal {
  label: string;
  value: number;
  icon?: React.ReactNode;
}

export type DashboardActivityType = "user" | "post" | "payment" | "message";

export interface DashboardActivity {
  id: string | number;
  type: DashboardActivityType;
  title: string;
  subtitle?: string;
  /** e.g. "pending" or "failed"; shown as a small pill. */
  status?: string;
  /** When it happened: a Date or an ISO string. */
  date: Date | string;
  href?: string;
}

export interface DashboardShare {
  id: string;
  label: string;
  value: number;
  /** Countries: an ISO code shown as a small badge, e.g. "US". */
  code?: string;
}

export interface DashboardAuthor {
  name: string;
  posts: number;
}

export interface DashboardLinks {
  activity?: string;
  traffic?: string;
  countries?: string;
  authors?: string;
}

export interface DashboardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** The greeting uses the first name. */
  userName?: string;
  /** The line under the greeting. Defaults to a sentence built from today's numbers. */
  summary?: React.ReactNode;
  /** All-time counts beside the greeting; the period switch never changes them. */
  totals?: DashboardTotal[];
  /** The overview chart's tabs. */
  metrics?: DashboardMetric[];
  activity?: DashboardActivity[];
  /** Visits by source, per period. */
  sources?: Partial<Record<DashboardPeriod, DashboardShare[]>>;
  /** Sign-ups per period, for the visit-to-sign-up rate under the sources. */
  signUps?: Partial<Record<DashboardPeriod, number>>;
  /** Visits by country, per period. */
  countries?: Partial<Record<DashboardPeriod, DashboardShare[]>>;
  /** Posts per author, per period. */
  authors?: Partial<Record<DashboardPeriod, DashboardAuthor[]>>;
  defaultPeriod?: DashboardPeriod;
  /** Replaces the built-in CSV download of the overview series. */
  onExport?: (period: DashboardPeriod) => void;
  /** Where each panel's round "open" button goes. Panels without a link show none. */
  links?: DashboardLinks;
  /** Renders links, e.g. `next/link`. Defaults to a plain `<a>`. */
  linkComponent?: React.ElementType;
  /** "Now" for the greeting and the activity times. Defaults to the visitor's clock. */
  now?: Date;
}

// ==========================================
// COPY & FORMATTING
// ==========================================
const PERIODS: { value: DashboardPeriod; label: string }[] = [
  { value: "day", label: "Daily" },
  { value: "week", label: "Weekly" },
  { value: "month", label: "Monthly" },
];

const PERIOD_COPY: Record<
  DashboardPeriod,
  { previous: string; window: string; average: string; traffic: string; trafficPhrase: string; authors: string; authorsPhrase: string }
> = {
  day: {
    previous: "yesterday",
    window: "Last 7 days",
    average: "a day",
    traffic: "Today",
    trafficPhrase: "today",
    authors: "Today",
    authorsPhrase: "today",
  },
  week: {
    previous: "last week",
    window: "Weeks of this month",
    average: "a week",
    traffic: "This week",
    trafficPhrase: "this week",
    authors: "Last 7 days",
    authorsPhrase: "in the last 7 days",
  },
  month: {
    previous: "last month",
    window: "This year by month",
    average: "a month",
    traffic: "This month",
    trafficPhrase: "this month",
    authors: "Last 30 days",
    authorsPhrase: "in the last 30 days",
  },
};

// A fixed locale, so the server and the browser print the same digits.
const integerFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const compactFormat = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const formatNumber = (value: number) => integerFormat.format(value);
const formatCompact = (value: number) =>
  Math.abs(value) < 10000 ? formatNumber(value) : compactFormat.format(value);

const formatMoney = (value: number, currency: string, compact = false) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: compact && Math.abs(value) >= 10000 ? "compact" : "standard",
    maximumFractionDigits: compact || Math.abs(value) >= 1000 ? 0 : 2,
  }).format(value);

const formatChange = (change: number) => {
  const size = Math.abs(change);
  const digits = size < 10 ? size.toFixed(1) : String(Math.round(size));
  return `${change > 0 ? "+" : change < 0 ? "−" : ""}${digits}%`;
};

const formatShare = (share: number) =>
  share <= 0 ? "0%" : share < 0.01 ? "<1%" : `${Math.round(share * 100)}%`;

const plural = (count: number, [one, many]: [string, string]) =>
  count === 1 ? one : many;

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

/** 1, 2, 2.5 or 5 times a power of ten: a ceiling the axis can halve cleanly. */
function niceCeiling(value: number) {
  if (value <= 0) return 1;
  const power = 10 ** Math.floor(Math.log10(value));
  const fraction = value / power;
  const nice = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 2.5 ? 2.5 : fraction <= 5 ? 5 : 10;
  return nice * power;
}

const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "?";

const toDate = (value: Date | string) => (value instanceof Date ? value : new Date(value));

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const dayKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

function greetingFor(date: Date) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}

const longDate = (date: Date) =>
  `${WEEKDAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}`;

function activityTime(date: Date, now: Date) {
  const minutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  if (minutes >= 0 && minutes < 1) return "Just now";
  if (minutes >= 0 && minutes < 60) return `${minutes}m ago`;
  if (minutes >= 0 && minutes < 360 && dayKey(date) === dayKey(now)) {
    return `${Math.floor(minutes / 60)}h ago`;
  }
  const hours = date.getHours();
  return `${hours % 12 || 12}:${String(date.getMinutes()).padStart(2, "0")} ${hours < 12 ? "AM" : "PM"}`;
}

function dayLabel(date: Date, now: Date) {
  if (dayKey(date) === dayKey(now)) return "Today";
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  if (dayKey(date) === dayKey(yesterday)) return "Yesterday";
  return `${WEEKDAYS[date.getDay()]?.slice(0, 3)}, ${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}`;
}

// The visitor's clock, read once per page load. The server snapshot is
// `null`, so hydration renders the same markup the server sent and the
// clock-dependent text appears on the pass after it.
let clientNow: Date | null = null;
const readClientNow = () => (clientNow ??= new Date());
const readServerNow = () => null;
const subscribeToNothing = () => () => {};

function useNow(fixed?: Date) {
  const now = useSyncExternalStore(subscribeToNothing, readClientNow, readServerNow);
  return fixed ?? now;
}

// ==========================================
// TOKENS & SHARED PIECES
// ==========================================
// The section paints its own canvas: a quiet tint of the theme colour with
// glows at three corners, two of them in neighbouring hues where the browser
// can derive them.
const ROOT_TOKENS =
  "[--dash-accent:var(--primary)] [--dash-well:color-mix(in_oklab,var(--primary)_5%,color-mix(in_oklab,var(--foreground)_5%,var(--card)))] [--dash-track:color-mix(in_oklab,var(--primary)_9%,var(--card))] [--dash-mark-muted:color-mix(in_oklab,var(--primary)_26%,var(--card))] [--dash-cat-1:#6356d1] [--dash-cat-2:#e87ba4] [--dash-cat-3:#eda100] [--dash-cat-4:#1baf7a] [--dash-cat-other:#c2c7d0] [--dash-up:#137a39] [--dash-down:#b91c1c] dark:[--dash-accent:color-mix(in_oklab,var(--primary)_72%,white)] dark:[--dash-cat-1:#8f84ec] dark:[--dash-cat-2:#d55181] dark:[--dash-cat-3:#c98500] dark:[--dash-cat-4:#199e70] dark:[--dash-cat-other:#566072] dark:[--dash-up:#4ade80] dark:[--dash-down:#fa8585]";

const CANVAS_STYLE: React.CSSProperties = {
  backgroundColor: "color-mix(in oklab, var(--primary) 4%, var(--background))",
  backgroundImage: [
    "radial-gradient(56rem 44rem at 0% 0%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)",
    "radial-gradient(52rem 38rem at 100% 0%, color-mix(in oklab, var(--primary) 9%, transparent), transparent 70%)",
    "radial-gradient(46rem 40rem at 0% 100%, color-mix(in oklab, var(--primary) 11%, transparent), transparent 72%)",
  ].join(", "),
};

const PANEL =
  "rounded-[24px] bg-card text-card-foreground ring-1 ring-foreground/[0.08] shadow-[0_1px_2px_rgb(16_24_40/0.04),0_16px_32px_-20px_rgb(16_24_40/0.14)] dark:shadow-none";
const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--primary)_60%,transparent)]";
const SLICE_COLORS = ["var(--dash-cat-1)", "var(--dash-cat-2)", "var(--dash-cat-3)"];
const OTHER_COLOR = "var(--dash-cat-other)";

function PanelHeader({
  id,
  title,
  caption,
  href,
  linkLabel,
  linkComponent: Link,
}: {
  id: string;
  title: string;
  caption?: string;
  href?: string;
  linkLabel: string;
  linkComponent: React.ElementType;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h2 id={id} className="text-base font-medium leading-6 text-foreground">
          {title}
        </h2>
        {caption && <p className="text-[13px] leading-5 text-muted-foreground">{caption}</p>}
      </div>
      {href && (
        <Link
          href={href}
          aria-label={linkLabel}
          title={linkLabel}
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground ring-1 ring-foreground/[0.08] transition-colors hover:bg-[var(--dash-well)] hover:text-foreground",
            FOCUS,
          )}
        >
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  children,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2 px-6 text-center", className)}>
      {icon && (
        <span className="mb-1 grid size-10 place-items-center rounded-full bg-[var(--dash-well)] text-muted-foreground [&_svg]:size-5">
          {icon}
        </span>
      )}
      <p className="text-sm font-medium text-foreground">{title}</p>
      {children && <p className="max-w-[36ch] text-[13px] leading-5 text-muted-foreground">{children}</p>}
    </div>
  );
}

/** Arrow and percent change, coloured by direction (more is better for every metric here). */
function DeltaBadge({ change, className }: { change: number; className?: string }) {
  const rounded = Math.abs(change) < 0.05 ? 0 : change;
  const direction = rounded > 0 ? "up" : rounded < 0 ? "down" : "flat";
  const Icon = direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full py-0.5 pl-1 pr-2 text-xs font-medium tabular-nums",
        direction === "up" && "bg-[color-mix(in_oklab,var(--dash-up)_10%,transparent)] text-[var(--dash-up)]",
        direction === "down" && "bg-[color-mix(in_oklab,var(--dash-down)_10%,transparent)] text-[var(--dash-down)]",
        direction === "flat" && "bg-[var(--dash-well)] text-muted-foreground",
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      <span className="sr-only">
        {direction === "up" ? "Up " : direction === "down" ? "Down " : "No change, "}
      </span>
      {formatChange(rounded)}
    </span>
  );
}

// ==========================================
// BREAKDOWNS (gauge, barcode, legend)
// ==========================================
interface Slice {
  key: string;
  name: string;
  value: number;
  share: number;
  color: string;
  code?: string;
}

/** The top three shares in their own colours, the rest folded into "Other". */
function compose(shares: DashboardShare[]): { slices: Slice[]; total: number } {
  const rows = [...shares].filter((share) => share.value > 0).sort((a, b) => b.value - a.value);
  const total = sum(rows.map((row) => row.value));
  if (!total) return { slices: [], total: 0 };
  const top = rows.slice(0, rows.length > 4 ? 3 : 4);
  const rest = rows.slice(top.length);
  const slices: Slice[] = top.map((row, index) => ({
    key: row.id,
    name: row.label,
    value: row.value,
    share: row.value / total,
    color: SLICE_COLORS[index] ?? OTHER_COLOR,
    code: row.code,
  }));
  if (rest.length) {
    const value = sum(rest.map((row) => row.value));
    slices.push({
      key: "__other",
      name: `Other (${rest.length})`,
      value,
      share: value / total,
      color: OTHER_COLOR,
    });
  }
  return { slices, total };
}

/** Hands `units` marks to slices in proportion to their share (largest remainder). */
function allocateUnits(slices: Slice[], units: number): (Slice | null)[] {
  const total = sum(slices.map((slice) => slice.value));
  if (!total) return Array.from({ length: units }, () => null);
  const exact = slices.map((slice) => (slice.value / total) * units);
  const counts = exact.map(Math.floor);
  let left = units - sum(counts);
  exact
    .map((value, index) => ({ index, rest: value - Math.floor(value) }))
    .sort((a, b) => b.rest - a.rest)
    .forEach(({ index }) => {
      if (left > 0) {
        counts[index] = (counts[index] ?? 0) + 1;
        left -= 1;
      }
    });
  return slices.flatMap((slice, index) => Array.from({ length: counts[index] ?? 0 }, () => slice));
}

const GAUGE_TICKS = 44;

/** A semicircle of ticks, handed to slices by share and read left to right. */
function TickGauge({
  slices,
  focus,
  onFocus,
  label,
  children,
}: {
  slices: Slice[];
  focus: string | null;
  onFocus: (key: string | null) => void;
  label: string;
  children: React.ReactNode;
}) {
  const units = allocateUnits(slices, GAUGE_TICKS);
  return (
    <div className="relative mx-auto w-full max-w-[20rem]">
      <svg viewBox="0 0 300 156" className="block w-full" role="img" aria-label={label}>
        {units.map((unit, index) => {
          const angle = Math.PI - (index / (GAUGE_TICKS - 1)) * Math.PI;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          return (
            <line
              key={index}
              x1={150 + 104 * cos}
              y1={150 - 104 * sin}
              x2={150 + 136 * cos}
              y2={150 - 136 * sin}
              stroke={unit ? unit.color : "var(--dash-track)"}
              strokeWidth={5}
              strokeLinecap="round"
              opacity={focus && unit && unit.key !== focus ? 0.22 : 1}
              style={{ transition: "opacity 150ms ease-out" }}
              onPointerEnter={unit ? () => onFocus(unit.key) : undefined}
              onPointerLeave={unit ? () => onFocus(null) : undefined}
            />
          );
        })}
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}

/** A row of thin bars split by share, with a wider gap between slices. */
function Barcode({
  slices,
  focus,
  onFocus,
}: {
  slices: Slice[];
  focus: string | null;
  onFocus: (key: string | null) => void;
}) {
  const units = allocateUnits(slices, 48);
  return (
    <div
      aria-hidden="true"
      className="mt-5 flex h-12 items-stretch gap-[3px]"
      onPointerLeave={() => onFocus(null)}
    >
      {units.map((unit, index) => (
        <span
          key={index}
          className={cn(
            "min-w-0 flex-1 rounded-full transition-opacity duration-150",
            index > 0 && units[index - 1]?.key !== unit?.key && "ml-1.5",
            focus && focus !== unit?.key && "opacity-25",
          )}
          style={{ backgroundColor: unit?.color ?? "var(--dash-track)" }}
          onPointerEnter={() => onFocus(unit?.key ?? null)}
        />
      ))}
    </div>
  );
}

/** Legend rows that carry every value as text, so nothing hides behind a hover. */
function BreakdownList({
  slices,
  focus,
  onFocus,
  showCodes = false,
  className,
}: {
  slices: Slice[];
  focus: string | null;
  onFocus: (key: string | null) => void;
  showCodes?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-0.5", className)} onPointerLeave={() => onFocus(null)}>
      {slices.map((slice) => (
        <li
          key={slice.key}
          onPointerEnter={() => onFocus(slice.key)}
          className={cn(
            "flex items-center gap-3 rounded-xl px-2 py-2 transition-colors duration-150",
            focus === slice.key && "bg-[var(--dash-well)]",
          )}
        >
          <span aria-hidden="true" className="h-4 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: slice.color }} />
          {showCodes && (
            <span
              aria-hidden="true"
              className="grid h-4 w-6 shrink-0 place-items-center rounded-[4px] bg-[var(--dash-well)] text-[9px] font-semibold tracking-wide text-muted-foreground"
            >
              {slice.code ?? "··"}
            </span>
          )}
          <span className="min-w-0 flex-1 truncate text-sm text-foreground">{slice.name}</span>
          <span className="text-sm tabular-nums text-foreground">{formatNumber(slice.value)}</span>
          <span className="w-14 shrink-0 rounded-full bg-[var(--dash-well)] py-0.5 text-center text-xs tabular-nums text-muted-foreground">
            {formatShare(slice.share)}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ==========================================
// HEADER
// ==========================================
function DashboardHeader({
  userName,
  summary,
  totals,
  now,
}: {
  userName?: string;
  summary: React.ReactNode;
  totals: DashboardTotal[];
  now: Date | null;
}) {
  const firstName = userName?.trim().split(/\s+/)[0];
  const greeting = now ? greetingFor(now) : "Welcome back";

  return (
    <header className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-32 -z-10 h-80 w-[min(40rem,calc(100%+6rem))]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 16%, transparent), transparent)",
        }}
      />
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          {/* The date only exists once the visitor's clock is read. */}
          <p className="min-h-5 text-sm text-muted-foreground">{now ? longDate(now) : null}</p>
          <h1 className="mt-2 text-2xl font-light leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[2.25rem]">
            {firstName ? `${greeting}, ${firstName}` : greeting}
          </h1>
          {summary && (
            <p className="mt-3 max-w-[56ch] text-pretty text-[15px] leading-6 text-muted-foreground">
              {summary}
            </p>
          )}
        </div>
        {totals.length > 0 && (
          <dl className="grid shrink-0 grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 2xl:gap-x-10">
            {totals.map((total) => (
              <div key={total.label} className="min-w-0">
                <dt className="flex items-center gap-1.5 text-[13px] text-muted-foreground [&_svg]:size-3.5 [&_svg]:shrink-0">
                  {total.icon}
                  <span className="truncate" title={total.label}>
                    {total.label}
                  </span>
                </dt>
                <dd className="mt-2 text-[2rem] font-light leading-none tracking-[-0.03em] text-foreground xl:text-4xl">
                  {formatCompact(total.value)}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}

// ==========================================
// OVERVIEW (metric tabs + chart)
// ==========================================
type ChartForm = "columns" | "line";

const CHART_HEIGHT = 304;

function axisTicks(ceiling: number, money: boolean, empty: boolean) {
  if (empty) return [0];
  const half = ceiling / 2;
  return !money && !Number.isInteger(half) ? [0, ceiling] : [0, half, ceiling];
}

interface ResolvedMetric {
  metric: DashboardMetric;
  points: DashboardPoint[];
  current: number;
  change: number | null;
  total: number;
  average: number;
  format: (value: number) => string;
  formatShort: (value: number) => string;
}

function OverviewPanel({
  metrics,
  period,
  className,
}: {
  metrics: DashboardMetric[];
  period: DashboardPeriod;
  className?: string;
}) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(metrics[0]?.id ?? "");
  const [form, setForm] = useState<ChartForm>("columns");
  const copy = PERIOD_COPY[period];

  const resolved: ResolvedMetric[] = useMemo(
    () =>
      metrics.map((metric) => {
        const points = metric.series[period] ?? [];
        const total = sum(points.map((point) => point.value));
        const currency = metric.currency;
        return {
          metric,
          points,
          current: points[points.length - 1]?.value ?? 0,
          change: metric.change?.[period] ?? null,
          total,
          average: points.length ? total / points.length : 0,
          format: currency ? (value: number) => formatMoney(value, currency) : formatNumber,
          formatShort: currency ? (value: number) => formatMoney(value, currency, true) : formatNumber,
        };
      }),
    [metrics, period],
  );

  const active = resolved.find((entry) => entry.metric.id === activeId) ?? resolved[0];

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = resolved.findIndex((entry) => entry.metric.id === active?.metric.id);
    const last = resolved.length - 1;
    const next =
      event.key === "ArrowRight"
        ? index >= last ? 0 : index + 1
        : event.key === "ArrowLeft"
          ? index <= 0 ? last : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    const target = resolved[next];
    if (!target) return;
    setActiveId(target.metric.id);
    document.getElementById(`${baseId}-tab-${target.metric.id}`)?.focus();
  };

  return (
    <section aria-labelledby={`${baseId}-title`} className={cn(PANEL, "overflow-hidden", className)}>
      <h2 id={`${baseId}-title`} className="sr-only">
        Overview
      </h2>
      <div
        role="tablist"
        aria-label="Metrics"
        onKeyDown={onTabKeyDown}
        className="flex gap-px border-b border-foreground/[0.08] bg-foreground/[0.08]"
      >
        {resolved.map((entry) => {
          const selected = entry.metric.id === active?.metric.id;
          return (
            <button
              key={entry.metric.id}
              id={`${baseId}-tab-${entry.metric.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(entry.metric.id)}
              className={cn(
                "group relative flex min-w-0 flex-1 basis-0 flex-col items-start gap-1 bg-card px-2.5 py-3 text-left transition-colors hover:bg-[color-mix(in_oklab,var(--dash-accent)_4%,var(--card))] focus-visible:z-10 sm:flex-auto sm:gap-1.5 sm:px-4 sm:py-3.5",
                "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color-mix(in_oklab,var(--primary)_60%,transparent)]",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 bottom-0 h-[3px] origin-center bg-[var(--dash-accent)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  selected ? "scale-x-100" : "scale-x-0",
                )}
              />
              <span
                className={cn(
                  "flex max-w-full items-center gap-2 text-xs leading-4 transition-colors sm:text-[13px] sm:leading-5",
                  selected ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {entry.metric.icon && (
                  <span aria-hidden="true" className="hidden shrink-0 sm:block [&_svg]:size-4">
                    {entry.metric.icon}
                  </span>
                )}
                <span className="truncate">{entry.metric.label}</span>
              </span>
              <span className="flex min-h-[1.75rem] max-w-full flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1.5">
                <span className="text-[1.0625rem] font-normal leading-6 tracking-[-0.02em] tabular-nums text-foreground sm:text-[1.3125rem] sm:leading-7">
                  {entry.formatShort(entry.current)}
                </span>
                {entry.change !== null && (
                  <DeltaBadge change={entry.change} className="text-[11px] sm:text-xs" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {active && (
        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active.metric.id}`}
          className="px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
        >
          <figure className="m-0">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
              <figcaption className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[13px] leading-5">
                <span className="sr-only">{active.metric.label}, </span>
                <span className="font-medium text-foreground">{copy.window}</span>
                {active.change !== null && (
                  <>
                    <span aria-hidden="true" className="h-3.5 w-px bg-muted-foreground/30" />
                    <span className="text-muted-foreground">vs {copy.previous}</span>
                  </>
                )}
              </figcaption>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {active.points.length > 0 && (
                  <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] leading-5">
                    <div className="flex items-baseline gap-1.5">
                      <dt className="text-muted-foreground">Total</dt>
                      <dd className="font-medium tabular-nums text-foreground">{active.formatShort(active.total)}</dd>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <dt className="flex items-center gap-1.5 self-center text-muted-foreground">
                        <span aria-hidden="true" className="w-3 border-t border-dashed border-current" />
                        <span aria-hidden="true">Avg</span>
                        <span className="sr-only">Average</span>
                      </dt>
                      <dd className="font-medium tabular-nums text-foreground">
                        {active.formatShort(active.average)}{" "}
                        <span className="font-normal text-muted-foreground">{copy.average}</span>
                      </dd>
                    </div>
                  </dl>
                )}
                <ToggleGroup
                  type="single"
                  variant="segmented"
                  size="sm"
                  value={form}
                  onValueChange={(next) => {
                    if (next === "columns" || next === "line") setForm(next);
                  }}
                  aria-label="Chart style"
                >
                  <ToggleGroupItem value="columns" aria-label="Columns" title="Columns" className="w-8 px-0">
                    <ChartColumnBig className="size-4" aria-hidden="true" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="line" aria-label="Trend line" title="Trend line" className="w-8 px-0">
                    <ChartSpline className="size-4" aria-hidden="true" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
            <div className="mt-2 min-h-[304px]">
              {active.points.length === 0 ? (
                <EmptyState title="No data for this period yet" className="h-[304px]" />
              ) : form === "line" ? (
                <ChartBlock
                  type="line"
                  data={active.points.map((point) => ({ label: point.label, value: point.value }))}
                  color="var(--primary)"
                  height={CHART_HEIGHT}
                  valuePrefix={active.metric.currency ? currencySymbol(active.metric.currency) : ""}
                />
              ) : (
                <ColumnsChart entry={active} />
              )}
            </div>
            <table className="sr-only">
              <caption>
                {active.metric.label}, {copy.window}
              </caption>
              <thead>
                <tr>
                  <th scope="col">Period</th>
                  <th scope="col">{active.metric.label}</th>
                </tr>
              </thead>
              <tbody>
                {active.points.map((point, index) => (
                  <tr key={`${point.label}-${index}`}>
                    <th scope="row">{point.fullLabel ?? point.label}</th>
                    <td>{active.format(point.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </figure>
        </div>
      )}
    </section>
  );
}

const currencySymbol = (currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency })
    .formatToParts(0)
    .find((part) => part.type === "currency")?.value ?? "";

/**
 * Pill columns on full-height tracks: the current point in the accent with its
 * value on the cap, earlier points muted. Hover, tap or the arrow keys read any
 * column; the dashed rule is the average.
 */
function ColumnsChart({ entry }: { entry: ResolvedMetric }) {
  const { points } = entry;
  const [inspected, setInspected] = useState<number | null>(null);
  const lastIndex = points.length - 1;
  const ceiling = niceCeiling(Math.max(0, ...points.map((point) => point.value)));
  const empty = entry.total === 0;
  const ticks = axisTicks(ceiling, Boolean(entry.metric.currency), empty);
  const shown = empty ? inspected : (inspected ?? lastIndex);
  const inspectedPoint = inspected === null ? null : points[inspected];

  useEffect(() => {
    setInspected(null);
  }, [entry.points]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const from = inspected ?? lastIndex;
    const moves: Record<string, number> = {
      ArrowLeft: Math.max(0, from - 1),
      ArrowRight: Math.min(lastIndex, from + 1),
      Home: 0,
      End: lastIndex,
    };
    const move = moves[event.key];
    if (move !== undefined) {
      event.preventDefault();
      setInspected(move);
    } else if (event.key === "Escape") {
      setInspected(null);
    }
  };

  return (
    <div>
      <div
        role="group"
        aria-roledescription="chart"
        aria-label={`${entry.metric.label}. Use the arrow keys to read each value.`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onBlur={() => setInspected(null)}
        onPointerLeave={(event) => {
          if (event.pointerType !== "touch") setInspected(null);
        }}
        className={cn("relative rounded-2xl", FOCUS)}
      >
        <div className="h-[16.5rem] pt-10">
          <div className="relative h-full">
            <div aria-hidden="true" className="absolute inset-y-0 left-0 w-9">
              {ticks.map((tick) => (
                <span
                  key={tick}
                  className="absolute right-0 translate-y-1/2 text-[11px] leading-none tabular-nums text-muted-foreground"
                  style={{ bottom: `${(tick / ceiling) * 100}%` }}
                >
                  {entry.formatShort(tick)}
                </span>
              ))}
            </div>
            <div className="absolute inset-y-0 left-12 right-0">
              {entry.average > 0 && !empty && (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 border-t border-dashed border-muted-foreground/40"
                  style={{ bottom: `${(entry.average / ceiling) * 100}%` }}
                />
              )}
              <div className="absolute inset-0 flex items-end gap-1 sm:gap-2 md:gap-3">
                {points.map((point, index) => {
                  const percent = (point.value / ceiling) * 100;
                  const isCurrent = index === lastIndex;
                  const isInspected = index === inspected;
                  return (
                    <div
                      key={`${point.label}-${index}`}
                      className="relative flex h-full min-w-0 flex-1 justify-center"
                      onPointerEnter={() => setInspected(index)}
                      onPointerDown={() => setInspected(index)}
                    >
                      <div className="relative h-full w-full max-w-7 rounded-full bg-[var(--dash-track)]">
                        {point.value > 0 && (
                          <div
                            className={cn(
                              "absolute inset-x-0 bottom-0 rounded-full transition-all duration-300 ease-out",
                              isCurrent
                                ? "bg-[var(--dash-accent)]"
                                : isInspected
                                  ? "bg-[color-mix(in_oklab,var(--dash-accent)_60%,var(--card))]"
                                  : "bg-[var(--dash-mark-muted)]",
                            )}
                            style={{ height: `max(${percent}%, 0.625rem)` }}
                          />
                        )}
                        {index === shown && (
                          <div
                            className={cn(
                              "pointer-events-none absolute z-20 whitespace-nowrap",
                              index === 0 ? "left-0" : index === lastIndex ? "right-0" : "left-1/2 -translate-x-1/2",
                            )}
                            style={{ bottom: `calc(max(${percent}%, 0.625rem) + 0.5rem)` }}
                          >
                            {isInspected ? (
                              <div className="rounded-xl bg-card px-3 py-1.5 shadow-lg ring-1 ring-foreground/[0.08]">
                                <p className="text-sm font-semibold leading-5 text-foreground">{entry.format(point.value)}</p>
                                <p className="text-[11px] leading-4 text-muted-foreground">{point.fullLabel ?? point.label}</p>
                              </div>
                            ) : (
                              <span className="block rounded-full bg-[var(--dash-accent)] px-2.5 py-1 text-xs font-semibold leading-none text-[var(--card)]">
                                {entry.formatShort(point.value)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="ml-12 mt-3 flex h-4 items-center gap-1 sm:gap-2 md:gap-3">
          {points.map((point, index) => (
            <span
              key={`${point.label}-${index}`}
              className={cn(
                "min-w-0 flex-1 truncate text-center text-xs",
                index === lastIndex ? "font-medium text-foreground" : "text-muted-foreground",
              )}
            >
              <span className="sm:hidden">{point.shortLabel ?? point.label}</span>
              <span className="hidden sm:inline">{point.label}</span>
            </span>
          ))}
        </div>
        {empty && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <p className="rounded-full bg-card px-4 py-2 text-[13px] text-muted-foreground shadow-sm ring-1 ring-foreground/[0.08]">
              Nothing recorded in this window yet.
            </p>
          </div>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {inspectedPoint ? `${inspectedPoint.fullLabel ?? inspectedPoint.label}: ${entry.format(inspectedPoint.value)}` : ""}
      </p>
    </div>
  );
}

// ==========================================
// ACTIVITY
// ==========================================
const ACTIVITY_TABS: { value: "all" | DashboardActivityType; label: string; empty: string }[] = [
  { value: "all", label: "All", empty: "No activity yet" },
  { value: "user", label: "Users", empty: "No sign-ups yet" },
  { value: "post", label: "Posts", empty: "No published posts yet" },
  { value: "payment", label: "Payments", empty: "No payments yet" },
  { value: "message", label: "Messages", empty: "No messages yet" },
];

const ACTIVITY_TYPES: Record<
  DashboardActivityType,
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  user: { label: "New user", icon: UserPlus, color: "var(--dash-cat-1)" },
  post: { label: "Post", icon: PenLine, color: "var(--dash-cat-2)" },
  payment: { label: "Payment", icon: Wallet, color: "var(--dash-cat-3)" },
  message: { label: "Message", icon: Mail, color: "var(--dash-cat-4)" },
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  failed: "bg-[color-mix(in_oklab,var(--dash-down)_10%,transparent)] text-[var(--dash-down)]",
};

const FEED_LENGTH = 6;

function ActivityPanel({
  activity,
  now,
  href,
  linkComponent: Link,
  className,
}: {
  activity: DashboardActivity[];
  now: Date | null;
  href?: string;
  linkComponent: React.ElementType;
  className?: string;
}) {
  const id = useId();
  const [tab, setTab] = useState<string>("all");
  const current = ACTIVITY_TABS.find((option) => option.value === tab) ?? ACTIVITY_TABS[0];
  const feed = useMemo(
    () =>
      [...activity]
        .map((item) => ({ ...item, at: toDate(item.date) }))
        .sort((a, b) => b.at.getTime() - a.at.getTime()),
    [activity],
  );
  const items = (tab === "all" ? feed : feed.filter((item) => item.type === tab)).slice(0, FEED_LENGTH);

  // Grouped by day once the clock is known; before that, one plain list.
  const groups = now
    ? items.reduce<{ key: string; label: string; items: typeof items }[]>((list, item) => {
        const key = dayKey(item.at);
        const last = list[list.length - 1];
        if (last && last.key === key) last.items.push(item);
        else list.push({ key, label: dayLabel(item.at, now), items: [item] });
        return list;
      }, [])
    : [{ key: "all", label: "", items }];

  return (
    <section aria-labelledby={`${id}-title`} className={cn(PANEL, "flex flex-col p-5 sm:p-6 h-[580px] min-h-[580px]", className)}>
      <PanelHeader
        id={`${id}-title`}
        title="Recent activity"
        caption="The latest across the platform"
        href={href}
        linkLabel="Open all activity"
        linkComponent={Link}
      />
      <div className="shrink-0 w-full mt-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x">
        <div className="inline-flex w-max items-center gap-1 rounded-lg bg-[var(--tbl-well,color-mix(in_oklab,var(--primary)_5%,color-mix(in_oklab,var(--foreground)_5%,var(--card))))] p-1">
          {ACTIVITY_TABS.map((option) => {
            const selected = tab === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTab(option.value)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150",
                  selected
                    ? "bg-card text-foreground shadow-sm ring-1 ring-foreground/[0.08]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
      {/* Permanently fixed height matching all 6 items: zero shrinkage, zero expansion */}
      <div className="mt-5 h-[420px] min-h-[420px] flex-1 overflow-hidden">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="h-full min-h-[435px]"
        >
          {items.length ? (
              <div className="space-y-5">
                {groups.map((group) => (
                  <section key={group.key} aria-label={group.label || undefined}>
                    {group.label && <h3 className="mb-3 text-xs font-medium text-muted-foreground">{group.label}</h3>}
                    {/* The rail runs chip centre to chip centre; chips sit on top of it. */}
                    <ol className="relative space-y-4 before:absolute before:inset-y-4 before:left-4 before:w-px before:bg-foreground/[0.12]">
                      {group.items.map((item) => {
                        const type = ACTIVITY_TYPES[item.type];
                        const Icon = type.icon;
                        return (
                          <li key={item.id} className="relative flex gap-3">
                            <span
                              className="relative grid size-8 shrink-0 place-items-center rounded-full"
                              style={{
                                backgroundColor: `color-mix(in oklab, ${type.color} 16%, var(--card))`,
                                color: `color-mix(in oklab, ${type.color} 72%, var(--foreground))`,
                              }}
                            >
                              <Icon className="size-4" aria-hidden="true" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-baseline justify-between gap-3">
                                <p className="truncate text-sm font-medium leading-5 text-foreground">
                                  <span className="sr-only">{type.label}: </span>
                                  {item.href ? (
                                    <Link href={item.href} className={cn("rounded-sm hover:underline", FOCUS)}>
                                      {item.title}
                                    </Link>
                                  ) : (
                                    item.title
                                  )}
                                </p>
                                {now && (
                                  <time
                                    dateTime={item.at.toISOString()}
                                    className="shrink-0 text-xs tabular-nums text-muted-foreground"
                                  >
                                    {activityTime(item.at, now)}
                                  </time>
                                )}
                              </div>
                              <div className="flex min-w-0 items-center gap-2">
                                {item.subtitle && (
                                  <p className="truncate text-[13px] leading-5 text-muted-foreground">{item.subtitle}</p>
                                )}
                                {item.status && (
                                  <span
                                    className={cn(
                                      "shrink-0 rounded-full px-2 py-px text-[11px] font-medium capitalize",
                                      STATUS_STYLES[item.status] ?? "bg-[var(--dash-well)] text-muted-foreground",
                                    )}
                                  >
                                    {item.status}
                                  </span>
                                )}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </section>
                ))}
              </div>
            ) : (
              <EmptyState icon={<Inbox />} title={current?.empty ?? "No activity yet"} className="h-full min-h-[380px] flex flex-col items-center justify-center">
                New events show up here as they happen.
              </EmptyState>
            )}
          </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// TRAFFIC, COUNTRIES, AUTHORS
// ==========================================
const formatRate = (rate: number) =>
  rate === 0 ? "0%" : `${(rate * 100).toFixed(rate < 0.1 ? 1 : 0)}%`;

function TrafficSourcesPanel({
  shares,
  signUps,
  period,
  href,
  linkComponent,
  className,
}: {
  shares?: DashboardShare[];
  signUps?: number;
  period: DashboardPeriod;
  href?: string;
  linkComponent: React.ElementType;
  className?: string;
}) {
  const id = useId();
  const [focus, setFocus] = useState<string | null>(null);
  const copy = PERIOD_COPY[period];
  const { slices, total } = useMemo(() => compose(shares ?? []), [shares]);
  const gaugeLabel = total
    ? `Visits by source ${copy.trafficPhrase}: ${slices.map((slice) => `${slice.name} ${formatShare(slice.share)}`).join(", ")}`
    : `No visits ${copy.trafficPhrase}`;

  return (
    <section aria-labelledby={`${id}-title`} className={cn(PANEL, "flex flex-col p-5 sm:p-6", className)}>
      <PanelHeader
        id={`${id}-title`}
        title="Traffic sources"
        caption={copy.traffic}
        href={href}
        linkLabel="Open visitor analytics"
        linkComponent={linkComponent}
      />
      {!shares ? (
        <EmptyState icon={<CloudOff />} title="Traffic data is unavailable" className="flex-1 py-12">
          Connect visitor tracking to see where people come from.
        </EmptyState>
      ) : (
        <div className="mt-5 flex flex-1 flex-col">
          <TickGauge slices={slices} focus={focus} onFocus={setFocus} label={gaugeLabel}>
            <span className="text-[2rem] font-light leading-none tracking-[-0.02em] text-foreground">
              {formatCompact(total)}
            </span>
            <span className="mt-1.5 text-xs text-muted-foreground">{plural(total, ["visit", "visits"])}</span>
          </TickGauge>
          {total ? (
            <>
              <BreakdownList slices={slices} focus={focus} onFocus={setFocus} className="mt-5" />
              {signUps !== undefined && <ConversionRate signUps={signUps} visits={total} />}
            </>
          ) : (
            <p className="mt-5 text-center text-[13px] text-muted-foreground">
              No visits recorded {copy.trafficPhrase} yet.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function ConversionRate({ signUps, visits }: { signUps: number; visits: number }) {
  // Sign-ups can outnumber tracked visits (blocked trackers, invited users);
  // a rate above 100% would mislead, so that case is said plainly.
  const rate = signUps / visits;
  const valid = rate <= 1;
  return (
    <div className="mt-auto pt-5">
      <div className="border-t border-foreground/[0.08] pt-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-[13px] text-muted-foreground">
            Visit to sign-up rate
            <Popover>
              <PopoverTrigger
                aria-label="How this rate is calculated"
                className={cn(
                  "grid size-6 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground",
                  FOCUS,
                )}
              >
                <Info className="size-3.5" aria-hidden="true" />
              </PopoverTrigger>
              <PopoverContent
                side="top"
                className="w-64 rounded-lg border-0 bg-foreground p-3 text-xs leading-5 text-background lg:p-3 lg:text-xs"
              >
                New sign-ups divided by the visits in the same period.
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-sm font-medium tabular-nums text-foreground">{valid ? formatRate(rate) : "—"}</p>
        </div>
        <div aria-hidden="true" className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--dash-track)]">
          <div className="h-full rounded-full bg-[var(--dash-accent)]" style={{ width: `${valid ? rate * 100 : 0}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {valid
            ? `${formatNumber(signUps)} ${plural(signUps, ["sign-up", "sign-ups"])} from ${formatNumber(visits)} ${plural(visits, ["visit", "visits"])}`
            : `${formatNumber(signUps)} sign-ups outnumber the ${formatNumber(visits)} tracked visits.`}
        </p>
      </div>
    </div>
  );
}

function CountriesPanel({
  shares,
  period,
  href,
  linkComponent,
  className,
}: {
  shares?: DashboardShare[];
  period: DashboardPeriod;
  href?: string;
  linkComponent: React.ElementType;
  className?: string;
}) {
  const id = useId();
  const [focus, setFocus] = useState<string | null>(null);
  const copy = PERIOD_COPY[period];
  const { slices, total } = useMemo(() => compose(shares ?? []), [shares]);
  const countryCount = (shares ?? []).filter((share) => share.value > 0).length;
  const leader = slices[0];

  return (
    <section aria-labelledby={`${id}-title`} className={cn(PANEL, "flex flex-col p-5 sm:p-6", className)}>
      <PanelHeader
        id={`${id}-title`}
        title="Visitors by country"
        caption={copy.traffic}
        href={href}
        linkLabel="Open visitor analytics"
        linkComponent={linkComponent}
      />
      {!shares ? (
        <EmptyState icon={<CloudOff />} title="Country data is unavailable" className="flex-1 py-12">
          Connect visitor tracking to see where people are.
        </EmptyState>
      ) : !total || !leader ? (
        <EmptyState icon={<Globe />} title={`No visits recorded ${copy.trafficPhrase} yet`} className="flex-1 py-12">
          Countries appear here once visitors arrive.
        </EmptyState>
      ) : (
        <>
          <div className="mt-5">
            <p className="flex items-baseline gap-2">
              <span className="text-[2rem] font-light leading-none tracking-[-0.02em] text-foreground">
                {formatNumber(countryCount)}
              </span>
              <span className="text-sm text-muted-foreground">{plural(countryCount, ["country", "countries"])}</span>
            </p>
            <p className="mt-2 text-[13px] leading-5 text-muted-foreground">
              {leader.name} accounts for {formatShare(leader.share)} of visits.
            </p>
          </div>
          <Barcode slices={slices} focus={focus} onFocus={setFocus} />
          <BreakdownList slices={slices} focus={focus} onFocus={setFocus} showCodes className="mt-4" />
        </>
      )}
    </section>
  );
}

function TopAuthorsPanel({
  authors,
  period,
  href,
  linkComponent,
  className,
}: {
  authors: DashboardAuthor[];
  period: DashboardPeriod;
  href?: string;
  linkComponent: React.ElementType;
  className?: string;
}) {
  const id = useId();
  const copy = PERIOD_COPY[period];
  const ranked = [...authors].filter((author) => author.posts > 0).sort((a, b) => b.posts - a.posts);
  const shown = ranked.slice(0, 5);
  const totalPosts = sum(ranked.map((author) => author.posts));
  const leaderPosts = shown[0]?.posts ?? 0;

  return (
    <section aria-labelledby={`${id}-title`} className={cn(PANEL, "flex flex-col p-5 sm:p-6", className)}>
      <PanelHeader
        id={`${id}-title`}
        title="Top authors"
        caption={copy.authors}
        href={href}
        linkLabel="Open all posts"
        linkComponent={linkComponent}
      />
      {shown.length ? (
        <>
          <p className="mt-5 text-[13px] text-muted-foreground">
            <span className="font-medium text-foreground">{formatNumber(totalPosts)}</span>{" "}
            {plural(totalPosts, ["post", "posts"])} from{" "}
            <span className="font-medium text-foreground">{formatNumber(ranked.length)}</span>{" "}
            {plural(ranked.length, ["author", "authors"])}
          </p>
          <ol className="mt-5 space-y-4">
            {shown.map((author, index) => {
              const leads = index === 0;
              return (
                <li key={`${author.name}-${index}`} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full text-xs font-medium",
                      leads ? "bg-[var(--dash-accent)] text-[var(--card)]" : "bg-[var(--dash-well)] text-foreground",
                    )}
                  >
                    {initialsOf(author.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className={cn("truncate text-sm text-foreground", leads && "font-medium")}>{author.name}</p>
                      <p className="shrink-0 text-sm tabular-nums text-foreground">
                        {formatNumber(author.posts)}{" "}
                        <span className="text-muted-foreground">{plural(author.posts, ["post", "posts"])}</span>
                      </p>
                    </div>
                    <div aria-hidden="true" className="mt-2 h-2 rounded-full bg-[var(--dash-track)]">
                      <div
                        className={cn("h-full rounded-full", leads ? "bg-[var(--dash-accent)]" : "bg-[var(--dash-mark-muted)]")}
                        style={{ width: `${leaderPosts ? (author.posts / leaderPosts) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </>
      ) : (
        <EmptyState icon={<PenLine />} title={`No posts published ${copy.authorsPhrase}`} className="flex-1 py-12">
          Authors are ranked here as posts go live.
        </EmptyState>
      )}
    </section>
  );
}

// ==========================================
// EXPORT
// ==========================================
/** The selected period's overview series as a CSV download. */
function downloadCsv(metrics: DashboardMetric[], period: DashboardPeriod) {
  const longest = metrics.reduce<DashboardPoint[]>(
    (best, metric) => ((metric.series[period]?.length ?? 0) > best.length ? metric.series[period] ?? [] : best),
    [],
  );
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const header = ["Period", ...metrics.map((metric) => metric.label)].map(escape).join(",");
  const rows = longest.map((point, index) =>
    [
      escape(point.fullLabel ?? point.label),
      ...metrics.map((metric) => String(metric.series[period]?.[index]?.value ?? "")),
    ].join(","),
  );
  const blob = new Blob(["﻿" + [header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `dashboard-${period}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/** "So far today: 12 new users, 4 messages and $1,240 in revenue." */
function describeToday(metrics: DashboardMetric[]) {
  const parts = metrics.flatMap((metric) => {
    const points = metric.series.day ?? [];
    const value = points[points.length - 1]?.value ?? 0;
    if (!value) return [];
    if (metric.currency) return [`${formatMoney(value, metric.currency)} in ${metric.label.toLowerCase()}`];
    return [`${formatNumber(value)} ${metric.noun ? plural(value, metric.noun) : metric.label.toLowerCase()}`];
  });
  if (!parts.length) return "Nothing new yet today.";
  const list =
    parts.length < 2 ? parts[0] : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
  return `So far today: ${list}.`;
}

// ==========================================
// SECTION
// ==========================================
/**
 * An admin dashboard home: a greeting with all-time totals, a period switch,
 * an overview chart with a tab per metric, the activity feed, traffic
 * sources, visitors by country and the top authors. Every number comes from
 * props, so wire it to your API and the layout takes care of itself.
 */
export function Dashboard({
  userName,
  summary,
  totals = [],
  metrics = [],
  activity = [],
  sources,
  signUps,
  countries,
  authors,
  defaultPeriod = "month",
  onExport,
  links = {},
  linkComponent = "a",
  now: fixedNow,
  className,
  style,
  ...props
}: DashboardProps) {
  const [period, setPeriod] = useState<DashboardPeriod>(defaultPeriod);
  const now = useNow(fixedNow);

  return (
    <section
      aria-label="Dashboard"
      className={cn(
        "relative isolate w-full overflow-hidden rounded-[28px] p-4 text-foreground sm:p-6 lg:p-8",
        ROOT_TOKENS,
        className,
      )}
      style={{ ...CANVAS_STYLE, ...style }}
      {...props}
    >
      <div className="space-y-6 lg:space-y-8">
        <DashboardHeader
          userName={userName}
          summary={summary ?? describeToday(metrics)}
          totals={totals}
          now={now}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <ToggleGroup
            type="single"
            variant="segmented"
            value={period}
            onValueChange={(next) => {
              if (next === "day" || next === "week" || next === "month") setPeriod(next);
            }}
            aria-label="Reporting period"
          >
            {PERIODS.map((option) => (
              <ToggleGroupItem key={option.value} value={option.value}>
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <button
            type="button"
            onClick={() => (onExport ? onExport(period) : downloadCsv(metrics, period))}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-[filter] hover:brightness-110",
              FOCUS,
            )}
          >
            <Download className="size-4" aria-hidden="true" />
            Export
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-12 xl:gap-6">
          {/* Side by side, the overview sets the row height: `contain: size`
              stops the activity feed from stretching the row, so it fills the
              row and scrolls instead. */}
          <OverviewPanel metrics={metrics} period={period} className="md:col-span-2 xl:col-span-8" />
          <ActivityPanel
            activity={activity}
            now={now}
            href={links.activity}
            linkComponent={linkComponent}
            className="md:col-span-2 xl:col-span-4"
          />
          <TrafficSourcesPanel
            shares={sources?.[period]}
            signUps={signUps?.[period]}
            period={period}
            href={links.traffic}
            linkComponent={linkComponent}
            className="xl:col-span-4"
          />
          <CountriesPanel
            shares={countries?.[period]}
            period={period}
            href={links.countries}
            linkComponent={linkComponent}
            className="xl:col-span-4"
          />
          <TopAuthorsPanel
            authors={authors?.[period] ?? []}
            period={period}
            href={links.authors}
            linkComponent={linkComponent}
            className="md:col-span-2 xl:col-span-4"
          />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
