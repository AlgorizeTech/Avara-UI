"use client";

import { cn } from "@/lib/utils";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChartColumnBig,
  CheckCheck,
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
import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { motion } from "motion/react";
import { ChartBlock } from "./ChartBlock";
import { Popover, PopoverContent, PopoverTrigger } from "./PopoverBlock";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroupBlock";

// ==========================================
// TYPES
// ==========================================
export type DashboardPeriod = "day" | "week" | "month";

/** `classic` is the light canvas with solid panels; `glass` is milky glass panes on a soft colour canvas. */
export type DashboardVariant = "classic" | "glass";

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
  /** Glass: the id of a metric whose current point the card reports, e.g. "+1,094 new users this month". */
  metric?: string;
  /** Glass: gives the card a round open button. */
  href?: string;
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
  /** Glass: who it was, shown as an avatar. Without it the row shows the type's icon. */
  person?: string;
  /** Glass: a photo URL for the avatar; initials stand in until it loads or if it fails. */
  avatar?: string;
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
  /** Glass: a photo URL for the author's avatar in the tray. */
  avatar?: string;
}

/** Glass: one row of the recent payments table. */
export interface DashboardPayment {
  id: string | number;
  amount: number;
  /** An ISO currency code such as "USD". */
  currency: string;
  /** How they paid, e.g. "Stripe" or "PayPal". */
  method: string;
  /** e.g. "completed", "pending" or "failed". Defaults to "completed". */
  status?: string;
  /** Who paid. Without it the row shows the method instead. */
  person?: string;
  avatar?: string;
  date: Date | string;
}

/** Glass: a tile in the activity pane's shortcut grid. The first one takes the brand fill. */
export interface DashboardShortcut {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface DashboardLinks {
  activity?: string;
  traffic?: string;
  countries?: string;
  authors?: string;
  /** Glass: the round open button on the payments pane. */
  payments?: string;
}

export interface DashboardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** The look: `classic` (default) or `glass`. Both read the same props. */
  variant?: DashboardVariant;
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
  /** Glass: the recent payments table. Leave it out and the pane is not shown. */
  payments?: DashboardPayment[];
  /** Glass: shortcut tiles beside the activity stages. */
  shortcuts?: DashboardShortcut[];
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
  {
    current: string;
    previous: string;
    window: string;
    average: string;
    traffic: string;
    trafficPhrase: string;
    authors: string;
    authorsPhrase: string;
  }
> = {
  day: {
    current: "today",
    previous: "yesterday",
    window: "Last 7 days",
    average: "a day",
    traffic: "Today",
    trafficPhrase: "today",
    authors: "Today",
    authorsPhrase: "today",
  },
  week: {
    current: "this week",
    previous: "last week",
    window: "Weeks of this month",
    average: "a week",
    traffic: "This week",
    trafficPhrase: "this week",
    authors: "Last 7 days",
    authorsPhrase: "in the last 7 days",
  },
  month: {
    current: "this month",
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

/**
 * Arrow and percent change, coloured by direction (more is better for every
 * metric here). `onFill` is for brand-filled tiles, where the green and red
 * tints would be unreadable: it goes to the fill's text colour on a light chip.
 */
function DeltaBadge({
  change,
  onFill = false,
  className,
}: {
  change: number;
  onFill?: boolean;
  className?: string;
}) {
  const rounded = Math.abs(change) < 0.05 ? 0 : change;
  const direction = rounded > 0 ? "up" : rounded < 0 ? "down" : "flat";
  const Icon = direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full py-0.5 pl-1 pr-2 text-xs font-medium tabular-nums",
        onFill
          ? "bg-[color-mix(in_oklab,var(--primary-foreground)_18%,transparent)] text-[var(--primary-foreground)]"
          : direction === "up"
            ? "bg-[color-mix(in_oklab,var(--dash-up)_10%,transparent)] text-[var(--dash-up)]"
            : direction === "down"
              ? "bg-[color-mix(in_oklab,var(--dash-down)_10%,transparent)] text-[var(--dash-down)]"
              : "bg-[var(--dash-well)] text-muted-foreground",
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

/** Each metric's series for the period, with its summary numbers and formatters. */
function resolveMetrics(metrics: DashboardMetric[], period: DashboardPeriod): ResolvedMetric[] {
  return metrics.map((metric) => {
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
  });
}

/** The chart's numbers as a table for screen readers. */
function SeriesTable({ entry, caption }: { entry: ResolvedMetric; caption: string }) {
  return (
    <table className="sr-only">
      <caption>
        {entry.metric.label}, {caption}
      </caption>
      <thead>
        <tr>
          <th scope="col">Period</th>
          <th scope="col">{entry.metric.label}</th>
        </tr>
      </thead>
      <tbody>
        {entry.points.map((point, index) => (
          <tr key={`${point.label}-${index}`}>
            <th scope="row">{point.fullLabel ?? point.label}</th>
            <td>{entry.format(point.value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
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

  const resolved = useMemo(() => resolveMetrics(metrics, period), [metrics, period]);

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
            <SeriesTable entry={active} caption={copy.window} />
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

// Tap-friendly explanation; a hover-only tooltip would hide it on touch.
function RateExplainer() {
  return (
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
  );
}

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
            <RateExplainer />
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
// GLASS VARIANT
// ==========================================
// Milky glass on a cool grey canvas. The canvas carries soft colour blobs
// (the theme colour and two neighbouring hues) and a brand glow rising from
// the bottom, so the translucent panes have something to show through; on a
// flat grey they would read as solid. Layers, lightest to densest: panes,
// cards inside panes, then tiles and round buttons. Each one catches the
// light with a 150° sheen, a bright top edge and a light rim.
//
// Nothing here uses a backdrop blur: the canvas behind is already soft, so a
// blur would show nothing and would still cost a repaint on every scroll frame.
//
// The tokens are unlayered so they win over the theme. The surface helpers
// sit in the components layer so utilities on the same element (size,
// radius, display) still win. Dark mode re-sets every token the light block
// sets, because both selectors have the same specificity.
const GLASS_CSS = `
[data-dashboard-glass] {
  --dash-accent: var(--primary);
  --muted-foreground: oklch(0.49 0.012 265);
  --dash-surface: #f4f5f7;
  --dash-well: rgb(15 23 42 / 0.05);
  --dash-hairline: rgb(15 23 42 / 0.07);
  --dash-track: color-mix(in oklab, var(--primary) 12%, transparent);
  --dash-mark-muted: color-mix(in oklab, var(--primary) 30%, #f4f5f7);
  --dash-cat-1: #5b7fd6;
  --dash-cat-2: #e0625f;
  --dash-cat-3: #e3a43b;
  --dash-cat-other: #c3c7cf;
  --dash-up: #137a39;
  --dash-down: #b91c1c;
  --dash-warn: #a3510a;
  --dash-ink: #464c5b;
  --dash-icon: #6b7180;
  --dash-canvas: #e7e7ee;
  --dash-glow: color-mix(in oklab, var(--primary) 30%, #a9bbe2);
  --dash-blob-1: color-mix(in oklab, var(--primary) 30%, transparent);
  --dash-blob-2: color-mix(in oklab, #6ea8ff 30%, transparent);
  --dash-blob-3: color-mix(in oklab, #ff8fc0 22%, transparent);
  --dash-sheen-1: rgb(255 255 255 / 0.5);
  --dash-sheen-2: rgb(255 255 255 / 0.06);
  --dash-sheen-3: rgb(255 255 255 / 0.16);
  --dash-edge: rgb(255 255 255 / 0.95);
  --dash-rim: rgb(255 255 255 / 0.6);
  --dash-border: rgb(15 23 42 / 0.045);
  --dash-shadow: 0 1px 2px rgb(31 41 72 / 0.04), 0 22px 44px -26px rgb(31 41 72 / 0.32);
  --dash-pane: rgb(255 255 255 / 0.3);
  --dash-card: rgb(255 255 255 / 0.36);
  --dash-card-strong: rgb(255 255 255 / 0.44);
  --dash-card-shadow: 0 1px 2px rgb(31 41 72 / 0.04), 0 12px 26px -18px rgb(31 41 72 / 0.26);
  --dash-round-shadow: 0 8px 18px -12px rgb(31 41 72 / 0.3);
  --dash-notch-shadow: drop-shadow(0 18px 22px rgb(31 41 72 / 0.12));
  --dash-hatch: color-mix(in oklab, var(--foreground) 14%, transparent);
}

:where(.dark) [data-dashboard-glass],
[data-dashboard-glass]:where(.dark) {
  --dash-accent: color-mix(in oklab, var(--primary) 72%, #fff);
  --muted-foreground: oklch(0.72 0.01 265);
  --dash-surface: #1b1d23;
  --dash-well: rgb(255 255 255 / 0.05);
  --dash-hairline: rgb(255 255 255 / 0.07);
  --dash-track: color-mix(in oklab, var(--primary) 18%, transparent);
  --dash-mark-muted: color-mix(in oklab, var(--primary) 38%, #1b1d23);
  --dash-cat-1: #6286e3;
  --dash-cat-2: #e05a6c;
  --dash-cat-3: #b08c10;
  --dash-cat-other: #4b505c;
  --dash-up: #4ade80;
  --dash-down: #fa8585;
  --dash-warn: #fbbf24;
  --dash-ink: #c5cbd6;
  --dash-icon: #8f99ab;
  --dash-canvas: #0c0d12;
  --dash-glow: color-mix(in oklab, color-mix(in oklab, var(--primary) 45%, #1e2c52) 60%, transparent);
  --dash-blob-1: color-mix(in oklab, var(--primary) 24%, transparent);
  --dash-blob-2: color-mix(in oklab, #3f6fd8 20%, transparent);
  --dash-blob-3: color-mix(in oklab, #c2457e 14%, transparent);
  --dash-sheen-1: rgb(255 255 255 / 0.1);
  --dash-sheen-2: rgb(255 255 255 / 0.01);
  --dash-sheen-3: rgb(255 255 255 / 0.035);
  --dash-edge: rgb(255 255 255 / 0.12);
  --dash-rim: rgb(255 255 255 / 0.08);
  --dash-border: rgb(0 0 0 / 0.25);
  --dash-shadow: 0 22px 44px -24px rgb(0 0 0 / 0.75);
  --dash-pane: rgb(255 255 255 / 0.04);
  --dash-card: rgb(255 255 255 / 0.05);
  --dash-card-strong: rgb(255 255 255 / 0.07);
  --dash-card-shadow: 0 12px 26px -18px rgb(0 0 0 / 0.7);
  --dash-round-shadow: 0 8px 18px -12px rgb(0 0 0 / 0.6);
  --dash-notch-shadow: drop-shadow(0 18px 22px rgb(0 0 0 / 0.5));
  --dash-hatch: rgb(255 255 255 / 0.13);
}

/* Two blobs follow the theme colour where the browser can derive
   neighbouring hues (a violet theme gets blue and pink). */
@supports (color: oklch(from red l c h)) {
  [data-dashboard-glass] {
    --dash-blob-2: oklch(from var(--primary) calc(l + 0.12) c calc(h + 55) / 0.3);
    --dash-blob-3: oklch(from var(--primary) calc(l + 0.12) c calc(h - 50) / 0.2);
  }

  :where(.dark) [data-dashboard-glass],
  [data-dashboard-glass]:where(.dark) {
    --dash-blob-2: oklch(from var(--primary) l c calc(h + 55) / 0.2);
    --dash-blob-3: oklch(from var(--primary) l c calc(h - 50) / 0.14);
  }
}

[data-dashboard-glass] {
  --dash-sheen: linear-gradient(150deg, var(--dash-sheen-1), var(--dash-sheen-2) 42%, var(--dash-sheen-3));
  --dash-lit: inset 0 1px 0 0 var(--dash-edge), inset 0 0 0 1px var(--dash-rim), 0 0 0 1px var(--dash-border);
  background-color: var(--dash-canvas);
  background-image:
    radial-gradient(40rem 30rem at 4% 6%, var(--dash-blob-1), transparent 70%),
    radial-gradient(44rem 34rem at 98% 28%, var(--dash-blob-2), transparent 70%),
    radial-gradient(38rem 30rem at 26% 80%, var(--dash-blob-3), transparent 70%),
    radial-gradient(84rem 34rem at 62% 122%, var(--dash-glow), transparent 72%);
}

/* The period switch (the library's segmented toggle group): a glass track
   with the brand pill and white text. */
[data-dashboard-glass] .dg-seg {
  background-color: var(--dash-card);
  box-shadow: inset 0 1px 0 0 var(--dash-edge), 0 0 0 1px var(--dash-border);
}

[data-dashboard-glass] .dg-seg > span[aria-hidden="true"],
[data-dashboard-glass] .dg-seg [aria-checked="true"].bg-card {
  background-color: var(--primary);
  background-image: linear-gradient(150deg, rgb(255 255 255 / 0.26), rgb(255 255 255 / 0) 55%);
  box-shadow: 0 8px 18px -10px color-mix(in oklab, var(--primary) 80%, transparent);
}

[data-dashboard-glass] .dg-seg [aria-checked="true"] {
  color: var(--primary-foreground);
}

@layer components {
  [data-dashboard-glass] .dg-pane {
    background-color: var(--dash-pane);
    background-image: var(--dash-sheen);
    box-shadow: var(--dash-lit), var(--dash-shadow);
  }

  [data-dashboard-glass] .dg-card,
  [data-dashboard-glass] .dg-tile {
    background-color: var(--dash-card);
    background-image: var(--dash-sheen);
    box-shadow: var(--dash-lit), var(--dash-card-shadow);
  }

  [data-dashboard-glass] .dg-tile {
    background-color: var(--dash-card-strong);
  }

  /* Round glass buttons: panel actions, the export, the KPI links. */
  [data-dashboard-glass] .dg-round {
    display: inline-grid;
    place-items: center;
    flex-shrink: 0;
    border-radius: 999px;
    color: var(--dash-ink);
    background-color: var(--dash-card-strong);
    background-image: var(--dash-sheen);
    box-shadow: var(--dash-lit), var(--dash-round-shadow);
    transition: background-color 150ms, color 150ms, box-shadow 150ms;
  }

  [data-dashboard-glass] .dg-round:hover {
    color: var(--foreground);
    background-color: color-mix(in oklab, var(--dash-card-strong), var(--foreground) 6%);
  }

  [data-dashboard-glass] .dg-round:focus-visible {
    outline: 2px solid color-mix(in oklab, var(--dash-accent) 60%, transparent);
    outline-offset: 2px;
  }

  /* The selected or lead item: the brand fill, catching the light too. */
  [data-dashboard-glass] .dg-active {
    color: var(--primary-foreground);
    background-color: var(--primary);
    background-image: linear-gradient(150deg, rgb(255 255 255 / 0.26), rgb(255 255 255 / 0) 55%);
    box-shadow:
      inset 0 1px 0 0 rgb(255 255 255 / 0.3),
      inset 0 0 0 1px rgb(255 255 255 / 0.12),
      0 10px 22px -12px color-mix(in oklab, var(--primary) 80%, transparent);
  }

  /* Diagonal hatching, the texture for empty tracks and "Other". */
  [data-dashboard-glass] .dg-hatch {
    background-image: repeating-linear-gradient(135deg, var(--dash-hatch) 0 1.5px, transparent 1.5px 6px);
  }

  /* The lead KPI card: the brand colour with a soft light from the top-left. */
  [data-dashboard-glass] .dg-kpi-hero {
    color: var(--primary-foreground);
    background-color: var(--primary);
    background-image:
      radial-gradient(120% 90% at 0% 0%, rgb(255 255 255 / 0.22), transparent 60%),
      linear-gradient(160deg, transparent 40%, rgb(0 0 0 / 0.18));
    box-shadow:
      inset 0 1px 0 0 rgb(255 255 255 / 0.25),
      0 22px 40px -24px color-mix(in oklab, var(--primary) 85%, transparent);
  }

  /* The notched pane's shape is an SVG; drop-shadow follows its outline. Its
     own layer, so the filter is drawn once rather than on every scroll frame. */
  [data-dashboard-glass] .dg-notch-bg {
    filter: var(--dash-notch-shadow);
    will-change: transform;
  }
}

/* People who ask for less transparency get solid surfaces. */
@media (prefers-reduced-transparency: reduce) {
  [data-dashboard-glass] .dg-pane,
  [data-dashboard-glass] .dg-card,
  [data-dashboard-glass] .dg-tile,
  [data-dashboard-glass] .dg-round {
    background-color: var(--dash-surface);
    background-image: none;
  }
}
`;

const GLASS_FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--dash-accent)_60%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
const GLASS_PANE = "dg-pane rounded-[28px] p-5 sm:p-6";
const GLASS_CHART_HEIGHT = "h-[15.5rem] @3xl:h-[20.5rem]";

// Server and client agree only on markup that never reads the clock or the
// time zone, so layout effects run on the client alone.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

// Initials take a colour from the categorical slots by a hash of the name,
// so a person keeps the same colour wherever they appear.
const AVATAR_HUES = ["var(--dash-cat-1)", "var(--dash-cat-2)", "var(--dash-cat-3)", "var(--dash-accent)"];

function hueFor(name: string) {
  let hash = 0;
  for (let index = 0; index < name.length; index += 1) {
    hash = (hash * 31 + name.charCodeAt(index)) >>> 0;
  }
  return AVATAR_HUES[hash % AVATAR_HUES.length];
}

/** A round avatar: the photo when it loads, initials otherwise. Decorative; a name always sits beside it. */
function GlassAvatar({ name, src, size = "md" }: { name: string; src?: string; size?: "md" | "lg" }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && failedSrc !== src;
  const hue = hueFor(name);
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid shrink-0 select-none place-items-center overflow-hidden rounded-full font-medium",
        size === "lg" ? "size-11 text-sm" : "size-9 text-xs",
      )}
      style={
        showImage
          ? undefined
          : {
              backgroundColor: `color-mix(in oklab, ${hue} 16%, var(--dash-surface))`,
              color: `color-mix(in oklab, ${hue} 72%, var(--foreground))`,
            }
      }
    >
      {showImage ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          className="size-full object-cover"
          onError={() => setFailedSrc(src ?? null)}
        />
      ) : (
        initialsOf(name)
      )}
    </span>
  );
}

/** Pane title row: a bold title, a muted caption, round actions on the right. */
function GlassPaneHeader({
  id,
  title,
  caption,
  actions,
}: {
  id: string;
  title: string;
  caption?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h2 id={id} className="text-[17px] font-semibold leading-6 tracking-[-0.01em] text-foreground">
          {title}
        </h2>
        {caption && <p className="mt-0.5 text-[13px] leading-5 text-muted-foreground">{caption}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

function GlassRoundLink({
  href,
  label,
  linkComponent: Link,
}: {
  href: string;
  label: string;
  linkComponent: React.ElementType;
}) {
  return (
    <Link href={href} aria-label={label} title={label} className="dg-round size-10">
      <ArrowUpRight className="size-[18px]" aria-hidden="true" />
    </Link>
  );
}

/** SVG hatch pattern; reference it as `url(#id)`. */
function HatchPattern({ id, color = "var(--dash-hatch)", gap = 6 }: { id: string; color?: string; gap?: number }) {
  return (
    <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="1.6" height={gap} style={{ fill: color }} />
    </pattern>
  );
}

const svgId = (prefix: string, id: string) => `${prefix}-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;

// ------------------------------------------
// Header and KPI cards
// ------------------------------------------
function GlassHeader({
  userName,
  summary,
  now,
  period,
  onPeriodChange,
  onExport,
}: {
  userName?: string;
  summary: React.ReactNode;
  now: Date | null;
  period: DashboardPeriod;
  onPeriodChange: (period: DashboardPeriod) => void;
  onExport: () => void;
}) {
  const firstName = userName?.trim().split(/\s+/)[0];
  const greeting = now ? greetingFor(now) : "Welcome back";

  return (
    <header className="flex flex-col gap-5 @5xl:flex-row @5xl:items-end @5xl:justify-between">
      <div className="min-w-0">
        <p className="min-h-5 text-[13px] text-muted-foreground">{now ? longDate(now) : null}</p>
        <h1 className="mt-1.5 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground @xl:text-[2rem]">
          {firstName ? `${greeting}, ${firstName}` : greeting}
        </h1>
        {summary && (
          <p className="mt-2 max-w-[60ch] text-pretty text-[15px] leading-6 text-muted-foreground">{summary}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <ToggleGroup
          type="single"
          variant="segmented"
          value={period}
          onValueChange={(next) => {
            if (next === "day" || next === "week" || next === "month") onPeriodChange(next);
          }}
          aria-label="Reporting period"
          className="dg-seg h-11"
        >
          {PERIODS.map((option) => (
            <ToggleGroupItem key={option.value} value={option.value}>
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <button
          type="button"
          onClick={onExport}
          className="dg-round inline-flex h-11 items-center gap-2 px-5 text-sm font-medium text-foreground"
        >
          <Download className="size-4" aria-hidden="true" />
          Export
        </button>
      </div>
    </header>
  );
}

/** What the current bucket of a metric added: "+1,094 new users this month". */
function describeAdded(metric: DashboardMetric, period: DashboardPeriod) {
  const points = metric.series[period] ?? [];
  const value = points[points.length - 1]?.value ?? 0;
  const { current } = PERIOD_COPY[period];
  if (metric.currency) return `${formatMoney(value, metric.currency)} in ${metric.label.toLowerCase()} ${current}`;
  return `+${formatNumber(value)} ${metric.noun ? plural(value, metric.noun) : metric.label.toLowerCase()} ${current}`;
}

/** All-time totals as cards; the first carries the brand fill. */
function GlassKpiCards({
  totals,
  metrics,
  period,
  linkComponent: Link,
}: {
  totals: DashboardTotal[];
  metrics: DashboardMetric[];
  period: DashboardPeriod;
  linkComponent: React.ElementType;
}) {
  return (
    <section aria-label="Totals" className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4 @5xl:gap-5">
      {totals.map((total, index) => {
        const hero = index === 0;
        const metric = total.metric ? metrics.find((entry) => entry.id === total.metric) : undefined;
        const linkLabel = `Open ${total.label.toLowerCase()}`;
        return (
          <article
            key={total.label}
            className={cn(
              "relative flex min-w-0 flex-col overflow-hidden rounded-[24px] p-5",
              hero ? "dg-kpi-hero" : "dg-pane text-foreground",
            )}
          >
            <div className="flex min-h-9 items-start justify-between gap-3">
              <h3 className="flex min-w-0 items-center gap-2 text-[15px] font-medium leading-6 [&_svg]:size-4 [&_svg]:shrink-0">
                {total.icon && (
                  <span aria-hidden="true" className={hero ? "opacity-80" : "text-muted-foreground"}>
                    {total.icon}
                  </span>
                )}
                <span className="truncate">{total.label}</span>
              </h3>
              {total.href && (
                <Link
                  href={total.href}
                  aria-label={linkLabel}
                  title={linkLabel}
                  className={cn(
                    "size-9",
                    hero
                      ? "grid shrink-0 place-items-center rounded-full bg-[var(--primary-foreground)] text-[var(--primary)] transition-opacity hover:opacity-90 outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-foreground)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                      : "dg-round",
                  )}
                >
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </div>
            <p
              className="mt-4 text-[2.5rem] font-semibold leading-none tracking-[-0.035em] tabular-nums"
              title={formatNumber(total.value)}
            >
              {formatCompact(total.value)}
            </p>
            {metric && (
              <p className={cn("mt-4 text-[13px] leading-5", hero ? "opacity-85" : "text-muted-foreground")}>
                {describeAdded(metric, period)}
              </p>
            )}
          </article>
        );
      })}
    </section>
  );
}

// ------------------------------------------
// Overview: metric tiles beside capsule columns
// ------------------------------------------
function GlassOverviewPanel({
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
  const copy = PERIOD_COPY[period];
  const resolved = useMemo(() => resolveMetrics(metrics, period), [metrics, period]);
  const active = resolved.find((entry) => entry.metric.id === activeId) ?? resolved[0];

  // The tiles are a column from @3xl and a 2×2 grid below it, so every arrow moves.
  const onTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = resolved.findIndex((entry) => entry.metric.id === active?.metric.id);
    const last = resolved.length - 1;
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? index >= last ? 0 : index + 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
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
    <section aria-labelledby={`${baseId}-title`} className={cn(GLASS_PANE, "flex flex-col", className)}>
      <GlassPaneHeader
        id={`${baseId}-title`}
        title="Overview"
        caption={`Pick a metric to chart it, ${copy.current} first`}
      />
      <div className="mt-5 grid flex-1 gap-5 @3xl:grid-cols-[minmax(0,14.5rem)_minmax(0,1fr)] @3xl:gap-6">
        <div
          role="tablist"
          aria-label="Metrics"
          aria-orientation="vertical"
          onKeyDown={onTabKeyDown}
          className="grid grid-cols-2 gap-2.5 @3xl:grid-cols-1 @3xl:content-start"
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
                  "flex min-w-0 flex-col items-start gap-1.5 rounded-2xl px-4 py-3 text-left transition-[background-color,color,box-shadow] duration-200",
                  GLASS_FOCUS,
                  selected ? "dg-active" : "dg-tile hover:bg-[var(--dash-card)]",
                )}
              >
                <span
                  className={cn(
                    "flex max-w-full items-center gap-2 text-[13px] leading-5 [&_svg]:size-4 [&_svg]:shrink-0",
                    selected ? "opacity-85" : "text-muted-foreground",
                  )}
                >
                  {entry.metric.icon && <span aria-hidden="true">{entry.metric.icon}</span>}
                  <span className="truncate">{entry.metric.label}</span>
                </span>
                <span className="flex max-w-full flex-wrap items-center gap-x-2 gap-y-1">
                  <span
                    className={cn(
                      "text-[1.375rem] font-semibold leading-7 tracking-[-0.02em] tabular-nums",
                      !selected && "text-foreground",
                    )}
                  >
                    {entry.formatShort(entry.current)}
                  </span>
                  {entry.change !== null && <DeltaBadge change={entry.change} onFill={selected} />}
                </span>
                <span className={cn("text-xs leading-4", selected ? "opacity-80" : "text-muted-foreground")}>
                  {capitalize(copy.current)}
                  {entry.change !== null ? `, vs ${copy.previous}` : ""}
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
            className="min-w-0"
          >
            <figure className="m-0 flex h-full flex-col">
              <figcaption className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <span className="min-w-0">
                  <span className="sr-only">{active.metric.label}, </span>
                  <span className="block text-[2rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-foreground">
                    {active.format(active.total)}
                  </span>
                  <span className="mt-2 block text-[13px] text-muted-foreground">
                    {active.metric.label} · {copy.window}
                  </span>
                </span>
                {active.points.length > 0 && (
                  <span className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <span aria-hidden="true" className="w-4 border-t-2 border-dashed border-current opacity-60" />
                    <span>
                      Average{" "}
                      <span className="font-medium tabular-nums text-foreground">
                        {active.formatShort(active.average)}
                      </span>{" "}
                      {copy.average}
                    </span>
                  </span>
                )}
              </figcaption>
              <div className="mt-auto pt-4">
                {active.points.length === 0 ? (
                  <EmptyState title="No data for this period yet" className={GLASS_CHART_HEIGHT} />
                ) : (
                  <GlassCapsuleColumns entry={active} />
                )}
              </div>
              <SeriesTable entry={active} caption={copy.window} />
            </figure>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Capsule columns on hatched full-height tracks. The current period wears the
 * brand fill with its value on a bubble; hover, tap or the arrow keys read any
 * other column. The dashed rule is the average.
 */
function GlassCapsuleColumns({ entry }: { entry: ResolvedMetric }) {
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
        className={cn("relative rounded-2xl", GLASS_FOCUS, "focus-visible:ring-offset-4")}
      >
        <div className={cn(GLASS_CHART_HEIGHT, "pt-10")}>
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
                  className="absolute inset-x-0 z-10 border-t-2 border-dashed border-muted-foreground/35"
                  style={{ bottom: `${(entry.average / ceiling) * 100}%` }}
                />
              )}
              <div className="absolute inset-0 flex items-end gap-1.5 @xl:gap-2.5 @3xl:gap-3">
                {points.map((point, index) => {
                  const percent = (point.value / ceiling) * 100;
                  const height = `max(${percent}%, 0.75rem)`;
                  const isCurrent = index === lastIndex;
                  const isInspected = index === inspected;
                  return (
                    <div
                      key={`${point.label}-${index}`}
                      className="relative flex h-full min-w-0 flex-1 justify-center"
                      onPointerEnter={() => setInspected(index)}
                      onPointerDown={() => setInspected(index)}
                    >
                      <div className="dg-hatch relative h-full w-full max-w-11 rounded-full bg-[color-mix(in_oklab,var(--dash-track)_70%,transparent)]">
                        {point.value > 0 && (
                          <div
                            className={cn(
                              "absolute inset-x-0 bottom-0 rounded-full transition-[height,background-color] duration-300 ease-out motion-reduce:transition-none",
                              isCurrent
                                ? "bg-[var(--dash-accent)] bg-[linear-gradient(180deg,rgb(255_255_255/0.28),transparent_45%)]"
                                : isInspected
                                  ? "bg-[color-mix(in_oklab,var(--dash-accent)_62%,var(--dash-surface))]"
                                  : "bg-[var(--dash-mark-muted)]",
                            )}
                            style={{ height }}
                          />
                        )}
                        {index === shown && (
                          <div
                            className={cn(
                              "pointer-events-none absolute z-20 whitespace-nowrap",
                              index === 0 ? "left-0" : index === lastIndex ? "right-0" : "left-1/2 -translate-x-1/2",
                            )}
                            style={{ bottom: `calc(${height} + 0.375rem)` }}
                          >
                            {isInspected ? (
                              <div className="dg-tile rounded-xl px-3 py-1.5">
                                <p className="text-sm font-semibold leading-5 text-foreground">{entry.format(point.value)}</p>
                                <p className="text-[11px] leading-4 text-muted-foreground">{point.fullLabel ?? point.label}</p>
                              </div>
                            ) : (
                              <span className="dg-active block rounded-full px-2.5 py-1 text-xs font-semibold leading-none">
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
        <div aria-hidden="true" className="ml-12 mt-3 flex gap-1.5 @xl:gap-2.5 @3xl:gap-3">
          {points.map((point, index) => (
            <span
              key={`${point.label}-${index}`}
              className={cn(
                "min-w-0 flex-1 truncate text-center text-xs",
                index === lastIndex ? "font-semibold text-foreground" : "text-muted-foreground",
              )}
            >
              <span className="@xl:hidden">{point.shortLabel ?? point.label}</span>
              <span className="hidden @xl:inline">{point.label}</span>
            </span>
          ))}
        </div>
        {empty && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <p className="dg-tile rounded-full px-4 py-2 text-[13px] text-muted-foreground">
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

// ------------------------------------------
// Traffic: a segmented half ring
// ------------------------------------------
const RING_CX = 120;
const RING_CY = 118;
const RING_R = 94;
const RING_STROKE = 26;
const RING_GAP_DEG = 2.5;
const RING_MIN_DEG = 2;

const ringPoint = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return [RING_CX + RING_R * Math.cos(rad), RING_CY - RING_R * Math.sin(rad)] as const;
};

// An arc from `from` to `to` degrees (180 = left, 0 = right), over the top.
const arcPath = (from: number, to: number) => {
  const [x1, y1] = ringPoint(from);
  const [x2, y2] = ringPoint(to);
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${RING_R} ${RING_R} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
};

function layoutSegments(slices: Slice[]) {
  const total = sum(slices.map((slice) => slice.value));
  if (!total) return [];
  const gaps = RING_GAP_DEG * Math.max(0, slices.length - 1);
  const spans = slices.map((slice) => Math.max(RING_MIN_DEG, (slice.value / total) * (180 - gaps)));
  // Minimums can push past the half ring; scale back to fit.
  const scale = (180 - gaps) / sum(spans);
  let cursor = 180;
  return slices.map((slice, index) => {
    const span = (spans[index] ?? 0) * scale;
    const segment = { slice, from: cursor, to: cursor - span };
    cursor -= span + RING_GAP_DEG;
    return segment;
  });
}

const isOther = (slice: Slice) => slice.key === "__other";

function HalfRing({
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
  const hatchId = svgId("dg-ring-hatch", useId());
  const segments = layoutSegments(slices);

  return (
    <div className="relative mx-auto w-full max-w-[17rem]">
      <svg viewBox="0 0 240 132" role="img" aria-label={label} className="block h-auto w-full overflow-visible">
        <defs>
          <HatchPattern id={hatchId} color="color-mix(in oklab, var(--foreground) 30%, transparent)" gap={5} />
        </defs>
        {segments.length === 0 ? (
          <>
            <path d={arcPath(180, 0)} fill="none" strokeWidth={RING_STROKE} style={{ stroke: "var(--dash-track)" }} />
            <path d={arcPath(180, 0)} fill="none" strokeWidth={RING_STROKE} stroke={`url(#${hatchId})`} />
          </>
        ) : (
          segments.map(({ slice, from, to }) => (
            <g
              key={slice.key}
              style={{ opacity: focus !== null && focus !== slice.key ? 0.3 : 1, transition: "opacity 150ms ease-out" }}
              onPointerEnter={() => onFocus(slice.key)}
              onPointerLeave={() => onFocus(null)}
            >
              <path d={arcPath(from, to)} fill="none" strokeWidth={RING_STROKE} style={{ stroke: slice.color }} />
              {isOther(slice) && (
                <path d={arcPath(from, to)} fill="none" strokeWidth={RING_STROKE} stroke={`url(#${hatchId})`} />
              )}
            </g>
          ))
        )}
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center">{children}</div>
    </div>
  );
}

function GlassTrafficPanel({
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
  const ringLabel = total
    ? `Visits by source ${copy.trafficPhrase}: ${slices.map((slice) => `${slice.name} ${formatShare(slice.share)}`).join(", ")}`
    : `No visits ${copy.trafficPhrase}`;

  return (
    <section aria-labelledby={`${id}-title`} className={cn(GLASS_PANE, "flex flex-col", className)}>
      <GlassPaneHeader
        id={`${id}-title`}
        title="Traffic sources"
        caption={copy.traffic}
        actions={href && <GlassRoundLink href={href} label="Open visitor analytics" linkComponent={linkComponent} />}
      />
      {!shares ? (
        <EmptyState icon={<CloudOff />} title="Traffic data is unavailable" className="flex-1 py-12">
          Connect visitor tracking to see where people come from.
        </EmptyState>
      ) : (
        <div className="mt-6 flex flex-1 flex-col">
          <HalfRing slices={slices} focus={focus} onFocus={setFocus} label={ringLabel}>
            <span className="text-[2.125rem] font-semibold leading-none tracking-[-0.03em] text-foreground">
              {formatCompact(total)}
            </span>
            <span className="mt-1.5 text-xs text-muted-foreground">
              {plural(total, ["visit", "visits"])} {copy.trafficPhrase}
            </span>
          </HalfRing>
          {total ? (
            <>
              <BreakdownList slices={slices} focus={focus} onFocus={setFocus} className="mt-5" />
              {signUps !== undefined && <GlassConversion signUps={signUps} visits={total} />}
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

function GlassConversion({ signUps, visits }: { signUps: number; visits: number }) {
  // Sign-ups can outnumber tracked visits (blocked trackers, invited users);
  // a rate above 100% would mislead, so that case is said plainly.
  const rate = signUps / visits;
  const valid = rate <= 1;
  return (
    <div className="mt-auto pt-5">
      <div className="dg-card rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-[13px] text-muted-foreground">
            Visit to sign-up rate
            <RateExplainer />
          </div>
          <p className="text-[15px] font-semibold tabular-nums text-foreground">{valid ? formatRate(rate) : "—"}</p>
        </div>
        <div aria-hidden="true" className="dg-hatch mt-2.5 h-5 overflow-hidden rounded-full bg-[var(--dash-track)]">
          <div
            className="h-full rounded-full bg-[var(--dash-accent)]"
            style={{ width: valid && rate > 0 ? `max(${rate * 100}%, 1.25rem)` : 0 }}
          />
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

// ------------------------------------------
// Countries: a chunky segmented bar
// ------------------------------------------
function GlassCountriesPanel({
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
    <section aria-labelledby={`${id}-title`} className={cn(GLASS_PANE, "flex flex-col", className)}>
      <GlassPaneHeader
        id={`${id}-title`}
        title="Visitors by country"
        caption={copy.traffic}
        actions={href && <GlassRoundLink href={href} label="Open visitor analytics" linkComponent={linkComponent} />}
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
          <div className="mt-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
            <p className="flex items-baseline gap-2">
              <span className="text-[2rem] font-semibold leading-none tracking-[-0.03em] text-foreground">
                {formatNumber(countryCount)}
              </span>
              <span className="text-sm text-muted-foreground">{plural(countryCount, ["country", "countries"])}</span>
            </p>
            <p className="text-[13px] text-muted-foreground">
              {formatNumber(total)} {plural(total, ["visit", "visits"])}
            </p>
          </div>
          <p className="mt-2 text-[13px] leading-5 text-muted-foreground">
            {leader.name} accounts for {formatShare(leader.share)} of visits.
          </p>
          {/* The legend rows below carry every value, so the bar is decoration. */}
          <div aria-hidden="true" className="mt-5 flex h-9 gap-1" onPointerLeave={() => setFocus(null)}>
            {slices.map((slice) => (
              <span
                key={slice.key}
                onPointerEnter={() => setFocus(slice.key)}
                className={cn(
                  "min-w-2 rounded-[10px] transition-opacity duration-150",
                  isOther(slice) && "dg-hatch",
                  focus !== null && focus !== slice.key && "opacity-30",
                )}
                style={{ flexGrow: slice.value / total, flexBasis: 0, backgroundColor: slice.color }}
              />
            ))}
          </div>
          <BreakdownList slices={slices} focus={focus} onFocus={setFocus} showCodes className="mt-4" />
        </>
      )}
    </section>
  );
}

// ------------------------------------------
// Payments: a quiet table
// ------------------------------------------
const PAYMENT_HEAD = "pb-3 text-left text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground";
const PAYMENT_CELL = "border-t border-[var(--dash-hairline)] py-3";

const STATUS_TONES: Record<string, "good" | "warn" | "bad"> = {
  completed: "good",
  complete: "good",
  paid: "good",
  succeeded: "good",
  success: "good",
  pending: "warn",
  processing: "warn",
  failed: "bad",
  declined: "bad",
  canceled: "bad",
  cancelled: "bad",
};

const TONE_CLASSES = {
  good: "bg-[color-mix(in_oklab,var(--dash-up)_10%,transparent)] text-[var(--dash-up)]",
  warn: "bg-[color-mix(in_oklab,var(--dash-warn)_12%,transparent)] text-[var(--dash-warn)]",
  bad: "bg-[color-mix(in_oklab,var(--dash-down)_10%,transparent)] text-[var(--dash-down)]",
  neutral: "bg-[var(--dash-well)] text-muted-foreground",
};

const isSettled = (status?: string) => !status || STATUS_TONES[status.toLowerCase()] === "good";

/** A status pill: a dot and the label on a tint of its tone, never colour alone. */
function GlassStatus({ status, className }: { status: string; className?: string }) {
  const tone = STATUS_TONES[status.toLowerCase()] ?? "neutral";
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-xs font-medium capitalize leading-none",
        TONE_CLASSES[tone],
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />
      {status}
    </span>
  );
}

const paymentDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
const paymentTime = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });

function GlassPaymentsPanel({
  payments,
  now,
  href,
  linkComponent,
  className,
}: {
  payments: DashboardPayment[];
  now: Date | null;
  href?: string;
  linkComponent: React.ElementType;
  className?: string;
}) {
  const id = useId();
  const rows = useMemo(
    () =>
      payments
        .map((payment) => ({ ...payment, at: toDate(payment.date) }))
        .sort((a, b) => b.at.getTime() - a.at.getTime())
        .slice(0, 6),
    [payments],
  );

  return (
    <section aria-labelledby={`${id}-title`} className={cn(GLASS_PANE, "flex flex-col", className)}>
      <GlassPaneHeader
        id={`${id}-title`}
        title="Recent payments"
        caption="The latest across every method"
        actions={href && <GlassRoundLink href={href} label="Open all payments" linkComponent={linkComponent} />}
      />
      {rows.length ? (
        <div className="-mx-2 mt-5 overflow-x-auto px-2">
          <table className="w-full min-w-[34rem] border-separate border-spacing-0 text-sm">
            <caption className="sr-only">Recent payments</caption>
            <thead>
              <tr>
                <th scope="col" className={PAYMENT_HEAD}>
                  Payment
                </th>
                <th scope="col" className={PAYMENT_HEAD}>
                  Status
                </th>
                <th scope="col" className={cn(PAYMENT_HEAD, "text-right")}>
                  Amount
                </th>
                <th scope="col" className={cn(PAYMENT_HEAD, "text-right")}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className={cn(PAYMENT_CELL, "pr-4")}>
                    <div className="flex items-center gap-3">
                      {row.person ? (
                        <GlassAvatar name={row.person} src={row.avatar} />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="dg-tile grid size-9 shrink-0 place-items-center rounded-full text-[var(--dash-ink)]"
                        >
                          <Wallet className="size-4" />
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{row.person ?? row.method}</p>
                        <p className="truncate text-xs text-muted-foreground">{row.person ? row.method : "Payment"}</p>
                      </div>
                    </div>
                  </td>
                  <td className={cn(PAYMENT_CELL, "pr-4")}>
                    <GlassStatus status={row.status ?? "completed"} />
                  </td>
                  <td className={cn(PAYMENT_CELL, "pr-4 text-right font-semibold tabular-nums text-foreground")}>
                    {formatMoney(row.amount, row.currency)}
                  </td>
                  <td className={cn(PAYMENT_CELL, "text-right text-[13px] tabular-nums text-muted-foreground")}>
                    {/* Dates print in the visitor's time zone, so only after mount. */}
                    {now && (
                      <time dateTime={row.at.toISOString()}>
                        {paymentDate.format(row.at)}
                        <span className="block text-[11px]">{paymentTime.format(row.at)}</span>
                      </time>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState icon={<Wallet />} title="No payments yet" className="flex-1 py-12">
          Payments show up here as customers check out.
        </EmptyState>
      )}
    </section>
  );
}

// ------------------------------------------
// Activity: the notched pane
// ------------------------------------------
const NOTCH_RADIUS = 28;
const NOTCH_SHOULDER = 18;
const NOTCH_INNER = 22;
const NOTCH_TRAY_PAD = 12;

function notchPath(width: number, height: number, x1: number, x2: number, depth: number) {
  const r = NOTCH_RADIUS;
  const s = NOTCH_SHOULDER;
  const rn = NOTCH_INNER;
  return [
    `M 0 ${r}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    `L ${x1 - s} 0`,
    `A ${s} ${s} 0 0 1 ${x1} ${s}`,
    `L ${x1} ${depth - rn}`,
    `A ${rn} ${rn} 0 0 0 ${x1 + rn} ${depth}`,
    `L ${x2 - rn} ${depth}`,
    `A ${rn} ${rn} 0 0 0 ${x2} ${depth - rn}`,
    `L ${x2} ${s}`,
    `A ${s} ${s} 0 0 1 ${x2 + s} 0`,
    `L ${width - r} 0`,
    `A ${r} ${r} 0 0 1 ${width} ${r}`,
    `L ${width} ${height - r}`,
    `A ${r} ${r} 0 0 1 ${width - r} ${height}`,
    `L ${r} ${height}`,
    `A ${r} ${r} 0 0 1 0 ${height - r}`,
    "Z",
  ].join(" ");
}

interface NotchShape {
  width: number;
  height: number;
  x1: number;
  x2: number;
  depth: number;
}

/**
 * A pane with a tray cut into the middle of its top edge: the tray holds a
 * row of people, and the pane's shoulders curve down around it so the canvas
 * shows through. The shape is an SVG drawn from the measured size, so its
 * fill, light edge and hairline match the other panes. Below `minWidth`, or
 * without a tray, it is a plain pane with the tray as a normal row.
 */
function GlassNotchPane({
  title,
  tray,
  actions,
  minWidth = 860,
  className,
  children,
  ...props
}: {
  title: React.ReactNode;
  tray?: React.ReactNode;
  actions?: React.ReactNode;
  minWidth?: number;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "title">) {
  const paneRef = useRef<HTMLElement>(null);
  const trayRef = useRef<HTMLDivElement>(null);
  const gradientId = useId();
  // Two phases: the pane's width decides whether the header takes the notched
  // layout; the notch is then measured from where the tray sits in that layout
  // (its size doesn't change when it moves, so a ResizeObserver alone wouldn't notice).
  const [wide, setWide] = useState(false);
  const [shape, setShape] = useState<NotchShape | null>(null);
  const measureRef = useRef<() => void>(() => {});
  const hasTray = Boolean(tray);

  measureRef.current = () => {
    const pane = paneRef.current;
    const trayElement = trayRef.current;
    if (!pane || !trayElement) {
      setWide(false);
      setShape(null);
      return;
    }
    const box = pane.getBoundingClientRect();
    const nextWide = box.width >= minWidth;
    setWide(nextWide);
    if (!nextWide || !wide) {
      // Not wide, or the layout hasn't switched yet: the effect on `wide` measures again.
      if (!nextWide) setShape(null);
      return;
    }
    const trayBox = trayElement.getBoundingClientRect();
    const x1 = Math.round(trayBox.left - box.left - NOTCH_TRAY_PAD);
    const x2 = Math.round(trayBox.right - box.left + NOTCH_TRAY_PAD);
    const depth = Math.round(trayBox.bottom - box.top + NOTCH_TRAY_PAD);
    // The shoulders need room on both sides; otherwise draw a plain pane.
    if (x1 - NOTCH_SHOULDER < NOTCH_RADIUS + 8 || x2 + NOTCH_SHOULDER > box.width - NOTCH_RADIUS - 8) {
      setShape(null);
      return;
    }
    const next = { width: Math.round(box.width), height: Math.round(box.height), x1, x2, depth };
    setShape((previous) =>
      previous &&
      previous.width === next.width &&
      previous.height === next.height &&
      previous.x1 === next.x1 &&
      previous.x2 === next.x2 &&
      previous.depth === next.depth
        ? previous
        : next,
    );
  };

  useIsomorphicLayoutEffect(() => {
    const pane = paneRef.current;
    const trayElement = trayRef.current;
    if (!pane || !trayElement) return undefined;
    const observer = new ResizeObserver(() => measureRef.current());
    observer.observe(pane);
    observer.observe(trayElement);
    return () => observer.disconnect();
  }, [hasTray]);

  useIsomorphicLayoutEffect(() => {
    measureRef.current();
  }, [wide, minWidth, hasTray]);

  const notched = shape !== null;
  // Drawn half a pixel in, so the 1px strokes land on whole pixels.
  const path = shape ? notchPath(shape.width - 1, shape.height - 1, shape.x1, shape.x2, shape.depth) : null;
  const edgeId = svgId("dg-notch-edge", gradientId);
  const sheenId = svgId("dg-notch-sheen", gradientId);

  return (
    <section
      ref={paneRef}
      className={cn("relative isolate rounded-[28px] p-5 sm:p-6", !notched && "dg-pane", className)}
      {...props}
    >
      {shape && path && (
        <svg
          aria-hidden="true"
          className="dg-notch-bg pointer-events-none absolute inset-0 -z-10 overflow-visible"
          width={shape.width}
          height={shape.height}
        >
          <defs>
            <linearGradient id={edgeId} x1="0" y1="0" x2="0" y2={shape.depth + 24} gradientUnits="userSpaceOnUse">
              <stop offset="0" style={{ stopColor: "var(--dash-edge)" }} />
              <stop offset="1" style={{ stopColor: "var(--dash-edge)", stopOpacity: 0 }} />
            </linearGradient>
            {/* The same 150° sheen as the other panes. */}
            <linearGradient id={sheenId} x1="0" y1="0" x2="0.5" y2="0.87">
              <stop offset="0" style={{ stopColor: "var(--dash-sheen-1)" }} />
              <stop offset="0.42" style={{ stopColor: "var(--dash-sheen-2)" }} />
              <stop offset="1" style={{ stopColor: "var(--dash-sheen-3)" }} />
            </linearGradient>
          </defs>
          <g transform="translate(0.5 0.5)">
            <path d={path} strokeWidth="1" style={{ fill: "var(--dash-pane)", stroke: "var(--dash-border)" }} />
            <path d={path} strokeWidth="1" fill={`url(#${sheenId})`} style={{ stroke: "var(--dash-rim)" }} />
            <path d={path} strokeWidth="1" fill="none" stroke={`url(#${edgeId})`} />
          </g>
        </svg>
      )}

      <div
        className={cn(
          "flex flex-wrap items-start gap-x-4 gap-y-4",
          wide && hasTray && "grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
        )}
      >
        <div className="min-w-0 flex-1">{title}</div>
        {hasTray && (
          // In the notch the tray rides up to the pane's top edge.
          <div
            ref={trayRef}
            className={cn(
              "order-last -mx-1 w-full min-w-0 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              wide && "order-none mx-0 -mt-3 w-auto overflow-visible px-0 pb-0 sm:-mt-4",
            )}
          >
            {tray}
          </div>
        )}
        {actions ? <div className="flex shrink-0 items-center justify-end gap-2">{actions}</div> : <div />}
      </div>
      {children}
    </section>
  );
}

/** Top authors as a row of avatars with their post counts, the leader's badge in the brand colour. */
function GlassAuthorTray({ authors, period }: { authors: DashboardAuthor[]; period: DashboardPeriod }) {
  const copy = PERIOD_COPY[period];
  const ranked = [...authors]
    .filter((author) => author.posts > 0)
    .sort((a, b) => b.posts - a.posts)
    .slice(0, 8);

  if (!ranked.length) {
    return (
      <p className="dg-tile flex h-11 items-center whitespace-nowrap rounded-full px-4 text-[13px] text-muted-foreground">
        No posts published {copy.authorsPhrase}
      </p>
    );
  }

  return (
    <div>
      <h3 className="sr-only">Top authors, {copy.authors}</h3>
      <ol className="flex items-start gap-2.5">
        {ranked.map((author, index) => {
          const label = `${author.name}, ${formatNumber(author.posts)} ${plural(author.posts, ["post", "posts"])} ${copy.authorsPhrase}`;
          return (
            <li key={`${author.name}-${index}`} className="flex flex-col items-center">
              <span tabIndex={0} role="img" aria-label={label} title={label} className={cn("rounded-full p-1", GLASS_FOCUS)}>
                <span className="dg-tile block rounded-full p-[3px]">
                  <GlassAvatar name={author.name} src={author.avatar} size="lg" />
                </span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "-mt-2.5 grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-semibold tabular-nums ring-2 ring-[var(--dash-canvas)]",
                  index === 0
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "bg-[var(--dash-card-strong)] text-foreground",
                )}
              >
                {author.posts}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// The steps a customer takes, in order: a post brings them in, they sign up,
// they pay, they write in.
const STAGES: { type: DashboardActivityType; label: string; noun: [string, string]; empty: string }[] = [
  { type: "post", label: "Published", noun: ["post", "posts"], empty: "No posts yet" },
  { type: "user", label: "Signed up", noun: ["sign-up", "sign-ups"], empty: "No sign-ups yet" },
  { type: "payment", label: "Paid", noun: ["payment", "payments"], empty: "No payments yet" },
  { type: "message", label: "Wrote in", noun: ["message", "messages"], empty: "No messages yet" },
];

const ROWS_PER_STAGE = 3;

type TimedActivity = DashboardActivity & { at: Date };

/** "4m ago" today; "Yesterday, 3:12 PM" or "Mon, Oct 5, 3:12 PM" before that. */
function stageTime(date: Date, now: Date) {
  const time = activityTime(date, now);
  return dayKey(date) === dayKey(now) ? time : `${dayLabel(date, now)}, ${time}`;
}

function GlassStageRow({
  item,
  now,
  anchor,
  linkComponent: Link,
}: {
  item: TimedActivity;
  now: Date | null;
  anchor: string;
  linkComponent: React.ElementType;
}) {
  const type = ACTIVITY_TYPES[item.type];
  const Icon = type.icon;
  return (
    <li data-anchor={anchor || undefined} className="flex items-start gap-3 px-3 py-3">
      {item.person || item.avatar ? (
        <GlassAvatar name={item.person ?? item.title} src={item.avatar} size="lg" />
      ) : (
        <span
          aria-hidden="true"
          className="dg-tile grid size-11 shrink-0 place-items-center rounded-full text-[var(--dash-ink)]"
        >
          <Icon className="size-[18px]" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="line-clamp-2 text-[13px] font-medium leading-[1.35] text-foreground">
            <span className="sr-only">{type.label}: </span>
            {item.href ? (
              <Link href={item.href} className={cn("rounded-sm hover:underline", FOCUS)}>
                {item.title}
              </Link>
            ) : (
              item.title
            )}
          </p>
          {item.type === "payment" &&
            (isSettled(item.status) ? (
              <CheckCheck className="mt-px size-4 shrink-0 text-[var(--dash-up)]" role="img" aria-label="Completed" />
            ) : (
              <GlassStatus status={item.status ?? ""} className="h-5 px-2 text-[11px]" />
            ))}
        </div>
        {item.subtitle && <p className="mt-0.5 truncate text-xs text-muted-foreground">{item.subtitle}</p>}
        {now && (
          <time dateTime={item.at.toISOString()} className="mt-0.5 block text-[11px] tabular-nums text-muted-foreground">
            {stageTime(item.at, now)}
          </time>
        )}
      </div>
    </li>
  );
}

interface ConnectorPath {
  key: number;
  d: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  empty: boolean;
}

/**
 * Curved connectors from the last row of each stage to the first row of the
 * next, drawn only while the stages sit in one row. Solid in the accent when
 * the next stage has items, dashed when it is empty.
 */
function useConnectors(gridRef: React.RefObject<HTMLDivElement | null>, deps: unknown[]) {
  const [paths, setPaths] = useState<ConnectorPath[]>([]);

  useIsomorphicLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;

    const measure = () => {
      const box = grid.getBoundingClientRect();
      const stages = [...grid.querySelectorAll<HTMLElement>("[data-stage]")];
      const first = stages[0];
      const inOneRow =
        first !== undefined && stages.length > 1 && stages.every((stage) => Math.abs(stage.offsetTop - first.offsetTop) < 2);
      if (!inOneRow) {
        setPaths([]);
        return;
      }
      const next: ConnectorPath[] = [];
      for (let index = 0; index < stages.length - 1; index += 1) {
        const fromStage = stages[index];
        const toStage = stages[index + 1];
        const from = fromStage?.querySelector('[data-anchor~="last"]');
        const to = toStage?.querySelector('[data-anchor~="first"]');
        const fromCard = fromStage?.firstElementChild;
        const toCard = toStage?.firstElementChild;
        if (!toStage || !from || !to || !fromCard || !toCard) continue;
        const a = from.getBoundingClientRect();
        const b = to.getBoundingClientRect();
        const x1 = fromCard.getBoundingClientRect().right - box.left;
        const x2 = toCard.getBoundingClientRect().left - box.left;
        const y1 = a.top + a.height / 2 - box.top;
        const y2 = b.top + b.height / 2 - box.top;
        const mid = (x1 + x2) / 2;
        next.push({
          key: index,
          d: `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`,
          x1,
          y1,
          x2,
          y2,
          empty: toStage.hasAttribute("data-empty"),
        });
      }
      setPaths(next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    return () => observer.disconnect();
  }, deps);

  return paths;
}

/**
 * Recent activity as a journey: the top authors sit in the notch with their
 * post counts; below, one card per step a customer takes, the newest few in
 * each, joined by connectors; beside them, the shortcut tiles.
 */
function GlassActivityPanel({
  activity,
  authors,
  period,
  now,
  href,
  shortcuts,
  linkComponent,
  className,
}: {
  activity: DashboardActivity[];
  authors?: DashboardAuthor[];
  period: DashboardPeriod;
  now: Date | null;
  href?: string;
  shortcuts: DashboardShortcut[];
  linkComponent: React.ElementType;
  className?: string;
}) {
  const id = useId();
  const Link = linkComponent;
  const stages = useMemo(() => {
    const feed: TimedActivity[] = activity
      .map((item) => ({ ...item, at: toDate(item.date) }))
      .sort((a, b) => b.at.getTime() - a.at.getTime());
    return STAGES.map((stage) => {
      const all = feed.filter((item) => item.type === stage.type);
      return { ...stage, items: all.slice(0, ROWS_PER_STAGE), count: all.length };
    });
  }, [activity]);
  const gridRef = useRef<HTMLDivElement>(null);
  const connectors = useConnectors(gridRef, [stages, now]);

  return (
    <GlassNotchPane
      aria-labelledby={`${id}-title`}
      className={className}
      title={
        <GlassPaneHeader
          id={`${id}-title`}
          title="Recent activity"
          caption="The newest at each step, from a first post to a message"
        />
      }
      tray={authors && <GlassAuthorTray authors={authors} period={period} />}
      actions={href && <GlassRoundLink href={href} label="Open all activity" linkComponent={linkComponent} />}
    >
      <div
        className={cn(
          "mt-6 grid gap-6",
          shortcuts.length > 0 && "@7xl:grid-cols-[minmax(0,1fr)_14.5rem] @7xl:gap-8",
        )}
      >
        <div ref={gridRef} className="relative grid gap-4 @2xl:grid-cols-2 @5xl:grid-cols-4 @5xl:gap-8">
          {connectors.length > 0 && (
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 size-full overflow-visible">
              {connectors.map((connector) => (
                <g key={connector.key}>
                  <path
                    d={connector.d}
                    fill="none"
                    strokeWidth="1.5"
                    strokeDasharray={connector.empty ? "4 4" : undefined}
                    style={{
                      stroke: connector.empty ? "var(--muted-foreground)" : "var(--dash-accent)",
                      opacity: connector.empty ? 0.5 : 0.7,
                    }}
                  />
                  {[
                    [connector.x1, connector.y1],
                    [connector.x2, connector.y2],
                  ].map(([cx, cy]) => (
                    <circle
                      key={`${cx}-${cy}`}
                      cx={cx}
                      cy={cy}
                      r="3.5"
                      strokeWidth="2"
                      style={{
                        fill: connector.empty ? "var(--muted-foreground)" : "var(--dash-accent)",
                        stroke: "var(--dash-surface)",
                      }}
                    />
                  ))}
                </g>
              ))}
            </svg>
          )}
          {stages.map((stage) => {
            const Icon = ACTIVITY_TYPES[stage.type].icon;
            return (
              <div
                key={stage.type}
                className="flex min-w-0 flex-col"
                data-stage={stage.type}
                data-empty={stage.items.length ? undefined : ""}
              >
                <div className="dg-card flex-1 rounded-[24px] p-1.5">
                  {stage.items.length ? (
                    <ol className="divide-y divide-[var(--dash-hairline)]">
                      {stage.items.map((item, index) => (
                        <GlassStageRow
                          key={item.id}
                          item={item}
                          now={now}
                          linkComponent={linkComponent}
                          anchor={[index === 0 ? "first" : null, index === stage.items.length - 1 ? "last" : null]
                            .filter(Boolean)
                            .join(" ")}
                        />
                      ))}
                    </ol>
                  ) : (
                    <div
                      data-anchor="first last"
                      className="flex h-full min-h-32 flex-col items-center justify-center gap-2 px-4 py-6 text-center"
                    >
                      <span
                        aria-hidden="true"
                        className="grid size-11 place-items-center rounded-full border border-dashed border-muted-foreground/40 text-muted-foreground"
                      >
                        <Icon className="size-[18px]" />
                      </span>
                      <p className="text-[13px] text-muted-foreground">{stage.empty}</p>
                    </div>
                  )}
                </div>
                <h3 className="mt-3 flex items-center justify-center gap-2 text-[13px] font-medium text-foreground">
                  {stage.label}
                  <span className="rounded-full bg-[var(--dash-card)] px-2 py-px text-[11px] tabular-nums text-muted-foreground">
                    {formatNumber(stage.count)}
                    <span className="sr-only"> recent {plural(stage.count, stage.noun)}</span>
                  </span>
                </h3>
              </div>
            );
          })}
        </div>

        {shortcuts.length > 0 && (
          <nav aria-label="Shortcuts" className="min-w-0">
            <ul className="grid grid-cols-2 gap-2.5 @2xl:grid-cols-3 @5xl:grid-cols-6 @7xl:grid-cols-2">
              {shortcuts.map((shortcut, index) => (
                <li key={`${shortcut.href}-${shortcut.label}`}>
                  <Link
                    href={shortcut.href}
                    className={cn(
                      "flex h-[5.25rem] flex-col justify-between rounded-[20px] p-3.5 text-[13px] font-medium leading-tight transition-[background-color,box-shadow] [&_svg]:size-[18px]",
                      GLASS_FOCUS,
                      index === 0 ? "dg-active" : "dg-tile text-foreground hover:bg-[var(--dash-card)]",
                    )}
                  >
                    <span aria-hidden="true" className={index === 0 ? undefined : "text-[var(--dash-icon)]"}>
                      {shortcut.icon}
                    </span>
                    {shortcut.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </GlassNotchPane>
  );
}

function GlassDashboard({
  userName,
  summary,
  totals,
  metrics,
  activity,
  sources,
  signUps,
  countries,
  authors,
  payments,
  shortcuts,
  links,
  linkComponent,
  period,
  onPeriodChange,
  onExport,
  now,
  className,
  style,
  ...props
}: Omit<DashboardProps, "variant" | "defaultPeriod" | "onExport" | "now"> & {
  summary: React.ReactNode;
  totals: DashboardTotal[];
  metrics: DashboardMetric[];
  activity: DashboardActivity[];
  shortcuts: DashboardShortcut[];
  links: DashboardLinks;
  linkComponent: React.ElementType;
  period: DashboardPeriod;
  onPeriodChange: (period: DashboardPeriod) => void;
  onExport: () => void;
  now: Date | null;
}) {
  return (
    <section
      aria-label="Dashboard"
      data-dashboard-glass=""
      className={cn(
        "@container relative isolate w-full overflow-hidden rounded-[28px] p-4 text-foreground sm:p-6 lg:p-8",
        className,
      )}
      style={style}
      {...props}
    >
      <style>{GLASS_CSS}</style>
      <div className="space-y-5 @5xl:space-y-6">
        <GlassHeader
          userName={userName}
          summary={summary}
          now={now}
          period={period}
          onPeriodChange={onPeriodChange}
          onExport={onExport}
        />

        {totals.length > 0 && (
          <GlassKpiCards totals={totals} metrics={metrics} period={period} linkComponent={linkComponent} />
        )}

        {/* One grid, so that between @3xl and @5xl traffic and countries pair
            up beside each other; from @5xl the desktop order returns. */}
        <div className="grid grid-cols-1 gap-5 @3xl:grid-cols-12 @5xl:gap-6">
          <GlassOverviewPanel metrics={metrics} period={period} className="@3xl:col-span-12 @5xl:col-span-8" />
          <GlassTrafficPanel
            shares={sources?.[period]}
            signUps={signUps?.[period]}
            period={period}
            href={links.traffic}
            linkComponent={linkComponent}
            className="@3xl:col-span-6 @5xl:col-span-4"
          />
          <GlassActivityPanel
            activity={activity}
            authors={authors ? (authors[period] ?? []) : undefined}
            period={period}
            now={now}
            href={links.activity}
            shortcuts={shortcuts}
            linkComponent={linkComponent}
            className="@3xl:order-4 @3xl:col-span-12 @5xl:order-none"
          />
          {payments && (
            <GlassPaymentsPanel
              payments={payments}
              now={now}
              href={links.payments}
              linkComponent={linkComponent}
              className="@3xl:order-5 @3xl:col-span-12 @5xl:order-none @5xl:col-span-7"
            />
          )}
          <GlassCountriesPanel
            shares={countries?.[period]}
            period={period}
            href={links.countries}
            linkComponent={linkComponent}
            className={cn(
              "@3xl:order-3 @3xl:col-span-6 @5xl:order-none",
              payments ? "@5xl:col-span-5" : "@5xl:col-span-12",
            )}
          />
        </div>
      </div>
    </section>
  );
}

// ==========================================
// SECTION
// ==========================================
/**
 * An admin dashboard home: a greeting with all-time totals, a period switch,
 * an overview chart with a tab per metric, the activity feed, traffic
 * sources, visitors by country and the top authors. Every number comes from
 * props, so wire it to your API and the layout takes care of itself.
 *
 * `variant="glass"` re-presents the same props as milky glass panes: KPI
 * cards with a brand-filled lead, metric tiles beside capsule columns, a
 * segmented half ring, the activity as a journey in a notched pane with the
 * top authors in the notch, a payments table and a chunky country bar.
 */
export function Dashboard({
  variant = "classic",
  userName,
  summary,
  totals = [],
  metrics = [],
  activity = [],
  sources,
  signUps,
  countries,
  authors,
  payments,
  shortcuts = [],
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
  const exportReport = () => (onExport ? onExport(period) : downloadCsv(metrics, period));

  if (variant === "glass") {
    return (
      <GlassDashboard
        userName={userName}
        summary={summary ?? describeToday(metrics)}
        totals={totals}
        metrics={metrics}
        activity={activity}
        sources={sources}
        signUps={signUps}
        countries={countries}
        authors={authors}
        payments={payments}
        shortcuts={shortcuts}
        links={links}
        linkComponent={linkComponent}
        period={period}
        onPeriodChange={setPeriod}
        onExport={exportReport}
        now={now}
        className={className}
        style={style}
        {...props}
      />
    );
  }

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
            onClick={exportReport}
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
