"use client";

import { cn } from "@/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react";

// ==========================================
// 1. PAGE SHELL — aurora backdrop + bento grid
// ==========================================
/**
 * The page's surface treatment. `glass` is frosted panels over an aurora;
 * `solid` is plain white cards with an ordinary shadow on a flat ground.
 */
export type SurfaceVariant = "glass" | "solid";

const SurfaceContext = createContext<SurfaceVariant>("glass");

/** The surface variant of the enclosing `ProfilePage`. */
export const useSurface = () => useContext(SurfaceContext);

export interface ProfilePageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Frosted glass over an aurora, or solid cards with a shadow. */
  variant?: SurfaceVariant;
  /**
   * Three colours washed behind the glass, top-left / top-right / bottom.
   * Any CSS colour. The defaults are violet, sky and peach. Ignored by `solid`.
   */
  aurora?: [string, string, string];
}

export function ProfilePage({
  className,
  children,
  variant = "glass",
  aurora = ["#a78bfa", "#7dd3fc", "#fdba74"],
  ...props
}: ProfilePageProps) {
  return (
    <SurfaceContext.Provider value={variant}>
      <div
        className={cn(
          "relative isolate w-full overflow-hidden bg-[#f5f5f7] text-[#1d1d1f] dark:bg-[#0b0b0f] dark:text-[#f5f5f7]",
          className,
        )}
        {...props}
      >
        {/* The blobs are what the glass blurs. They sit still — the only thing
          that moves on this page is the live marker on the dial. */}
        {variant === "glass" && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <span
              style={{ background: aurora[0] }}
              className="absolute -left-32 -top-32 size-[32rem] rounded-full opacity-80 blur-3xl dark:opacity-35"
            />
            <span
              style={{ background: aurora[1] }}
              className="absolute -right-24 top-16 size-[28rem] rounded-full opacity-80 blur-3xl dark:opacity-35"
            />
            <span
              style={{ background: aurora[2] }}
              className="absolute -bottom-40 left-1/3 size-[32rem] rounded-full opacity-70 blur-3xl dark:opacity-30"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-6 lg:grid-cols-12">
          {children}
        </div>
      </div>
    </SurfaceContext.Provider>
  );
}

// ==========================================
// 2. GLASS PANEL — one recipe, four shapes
// ==========================================
export type GlassShape = "slab" | "tile" | "disc" | "capsule";

const SHAPES: Record<GlassShape, string> = {
  /** Hero-level surface. */
  slab: "rounded-[32px]",
  /** Everyday content tile. */
  tile: "rounded-3xl",
  /** A circle — for a single number or an icon. */
  disc: "aspect-square rounded-full",
  /** Chips, action bars, anything one line tall. */
  capsule: "rounded-full",
};

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: GlassShape;
  /** Lifts on hover and shows a pointer — for panels that open something. */
  interactive?: boolean;
  /** Override the surface set by the enclosing `ProfilePage`. */
  variant?: SurfaceVariant;
}

const SURFACES: Record<SurfaceVariant, { base: string; hover: string }> = {
  glass: {
    base:
      "border border-white/70 bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_24px_48px_-28px_rgba(15,23,42,0.35)] backdrop-blur-2xl " +
      "dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_48px_-28px_rgba(0,0,0,0.9)]",
    hover: "hover:bg-white/70 dark:hover:bg-white/[0.09]",
  },
  solid: {
    base:
      "border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-20px_rgba(15,23,42,0.25)] " +
      "dark:border-white/10 dark:bg-[#151518] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_16px_40px_-20px_rgba(0,0,0,0.9)]",
    hover:
      "hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-20px_rgba(15,23,42,0.3)]",
  },
};

export function GlassPanel({
  shape = "tile",
  interactive = false,
  variant,
  className,
  children,
  ...props
}: GlassPanelProps) {
  const inherited = useSurface();
  const surface = SURFACES[variant ?? inherited];
  return (
    <div
      className={cn(
        "relative",
        surface.base,
        SHAPES[shape],
        interactive &&
          cn(
            "cursor-pointer transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
            surface.hover,
          ),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ==========================================
// 3. LOCAL TIME — hour-of-day in someone else's zone
// ==========================================
export interface LocalTime {
  /** Hour of day with minutes as a fraction, e.g. 14.5 for 14:30. */
  hour: number;
  /** Readable clock in that zone, e.g. "2:30 PM". */
  label: string;
  /**
   * How far that zone runs ahead of the viewer's own clock, in hours, in
   * -12..12. Subtract it from an hour in that zone to get the viewer's hour.
   */
  offsetFromViewer: number;
}

/** Hour of day, minutes as a fraction, in a zone (or the viewer's own). */
function hourOfDay(date: Date, timeZone?: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h + m / 60;
}

/**
 * Reads the clock in `timeZone` every 30 seconds. Returns `null` until the
 * first read so server and client render the same thing.
 */
export function useLocalTime(timeZone: string): LocalTime | null {
  const [time, setTime] = useState<LocalTime | null>(null);

  useEffect(() => {
    const read = () => {
      const now = new Date();
      const hour = hourOfDay(now, timeZone);
      const label = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "numeric",
        minute: "2-digit",
      }).format(now);
      let offsetFromViewer = hour - hourOfDay(now);
      if (offsetFromViewer > 12) offsetFromViewer -= 24;
      if (offsetFromViewer < -12) offsetFromViewer += 24;
      setTime({ hour, label, offsetFromViewer });
    };
    read();
    const id = setInterval(read, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}

// ==========================================
// 4. WORKDAY DIAL — 24 hours on a ring
// ==========================================
export interface WorkdayDialProps {
  /** IANA zone the person works in, e.g. "Asia/Dhaka". */
  timeZone: string;
  /** Working window in that zone, hours 0–24. */
  start: number;
  end: number;
  /** Short name shown under the clock, e.g. "Dhaka". */
  place: string;
  /** Person's first name, for the accessible description and the tooltip. */
  name: string;
  /** One extra line for the tooltip, e.g. "Replies within the day". */
  note?: string;
  className?: string;
}

const R = 42;
const CIRCUMFERENCE = 2 * Math.PI * R;
const TIP_WIDTH = 224;

/** Point on the ring for an hour of the day. The svg is rotated -90°, so
 *  angle 0 lands at the top — midnight. */
const pointAt = (hour: number) => {
  const a = (hour / 24) * Math.PI * 2;
  return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
};

/** 13.5 → "1:30 PM". Wraps past midnight. */
const clock = (hour: number) => {
  const minutes = ((Math.round(hour * 60) % 1440) + 1440) % 1440;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

/** 3.75 → "3 h 45 m". */
const duration = (hours: number) => {
  const total = Math.round(hours * 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h === 0 ? `${m} m` : m === 0 ? `${h} h` : `${h} h ${m} m`;
};

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);

/** Hour labels around the ring, so it reads as a day and not a clock face. */
const HOUR_LABELS = [
  { text: "12 am", className: "left-1/2 top-0 -translate-x-1/2" },
  { text: "6 am", className: "-right-1 top-1/2 -translate-y-1/2" },
  { text: "12 pm", className: "bottom-0 left-1/2 -translate-x-1/2" },
  { text: "6 pm", className: "-left-1 top-1/2 -translate-y-1/2" },
];

export function WorkdayDial({
  timeZone,
  start,
  end,
  place,
  name,
  note,
  className,
}: WorkdayDialProps) {
  const time = useLocalTime(timeZone);
  const working = time !== null && time.hour >= start && time.hour < end;
  const marker = time ? pointAt(time.hour) : null;

  // Tooltip: follows the pointer; sits above the ring under keyboard focus.
  const [pointer, setPointer] = useState<{
    x: number;
    y: number;
    w: number;
  } | null>(null);
  const [focused, setFocused] = useState(false);

  // The window in the viewer's own clock — what a visitor actually wants.
  const viewerStart = time ? clock(start - time.offsetFromViewer) : null;
  const viewerEnd = time ? clock(end - time.offsetFromViewer) : null;
  const sameClock = time !== null && Math.abs(time.offsetFromViewer) < 1 / 60;
  const untilChange = time
    ? working
      ? `Available for ${duration(end - time.hour)}`
      : `Back in ${duration((start - time.hour + 24) % 24)}`
    : null;

  const description = time
    ? `It is ${time.label} in ${place}. ${name} works ${clock(start)} to ${clock(end)} there` +
      (sameClock ? "" : `, ${viewerStart} to ${viewerEnd} your time`) +
      `. ${untilChange}.`
    : `${name} works ${clock(start)} to ${clock(end)} ${place} time.`;

  const showTip = time !== null && (pointer !== null || focused);

  return (
    <div
      role="img"
      tabIndex={0}
      aria-label={description}
      onPointerMove={(e) => {
        const box = e.currentTarget.getBoundingClientRect();
        setPointer({
          x: e.clientX - box.left,
          y: e.clientY - box.top,
          w: box.width,
        });
      }}
      onPointerLeave={() => setPointer(null)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[240px] rounded-full p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent",
        className,
      )}
    >
      {HOUR_LABELS.map((l) => (
        <span
          key={l.text}
          aria-hidden
          className={cn(
            "absolute text-[10px] font-medium tabular-nums text-black/45 dark:text-white/45",
            l.className,
          )}
        >
          {l.text}
        </span>
      ))}

      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        {/* Full day */}
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          strokeWidth="6"
          className="stroke-black/[0.07] dark:stroke-white/10"
        />
        {/* Working window */}
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${(CIRCUMFERENCE * (end - start)) / 24} ${CIRCUMFERENCE}`}
          strokeDashoffset={-(CIRCUMFERENCE * start) / 24}
          className="stroke-violet-600 dark:stroke-violet-400"
        />
        {/* Six-hour ticks, just outside the ring */}
        {[0, 6, 12, 18].map((h) => {
          const a = (h / 24) * Math.PI * 2;
          return (
            <line
              key={h}
              x1={50 + 47 * Math.cos(a)}
              y1={50 + 47 * Math.sin(a)}
              x2={50 + 49.5 * Math.cos(a)}
              y2={50 + 49.5 * Math.sin(a)}
              strokeWidth="1.5"
              strokeLinecap="round"
              className="stroke-black/25 dark:stroke-white/30"
            />
          );
        })}
        {/* Live marker */}
        {marker && (
          <g className="transition-transform duration-700 motion-reduce:transition-none">
            <circle
              cx={marker.x}
              cy={marker.y}
              r="5"
              className="fill-white dark:fill-[#0b0b0f]"
            />
            <circle
              cx={marker.x}
              cy={marker.y}
              r="3"
              className={cn(
                working
                  ? "fill-violet-600 dark:fill-violet-400"
                  : "fill-zinc-400 dark:fill-zinc-500",
              )}
            />
          </g>
        )}
      </svg>

      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="text-3xl font-semibold tabular-nums tracking-tight">
            {time ? time.label : "--:--"}
          </p>
          <p className="mt-0.5 text-sm text-black/60 dark:text-white/60">
            {place}
          </p>
          <p
            className={cn(
              "mt-2 text-xs font-medium",
              working
                ? "text-violet-700 dark:text-violet-300"
                : "text-black/50 dark:text-white/50",
            )}
          >
            {working ? "Working now" : "Off hours"}
          </p>
        </div>
      </div>

      {showTip && time && (
        <div
          aria-hidden
          style={
            pointer
              ? {
                  left: clamp(
                    pointer.x,
                    TIP_WIDTH / 2 - 32,
                    pointer.w - TIP_WIDTH / 2 + 32,
                  ),
                  top: pointer.y - 14,
                  width: TIP_WIDTH,
                }
              : { left: "50%", top: 0, width: TIP_WIDTH }
          }
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-2xl border border-white/70 bg-white/85 p-3 text-left text-xs leading-relaxed shadow-[0_16px_40px_-16px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-[#151518]/90 dark:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)]"
        >
          <p className="font-semibold">
            {time.label} in {place}
          </p>
          <p className="mt-1 text-black/70 dark:text-white/70">
            Works {clock(start)} to {clock(end)}
            {sameClock ? "" : `, ${viewerStart} to ${viewerEnd} your time`}
          </p>
          <p
            className={cn(
              "mt-1 font-medium",
              working
                ? "text-violet-700 dark:text-violet-300"
                : "text-black/60 dark:text-white/60",
            )}
          >
            {untilChange}
          </p>
          {note && (
            <p className="mt-1 text-black/60 dark:text-white/60">{note}</p>
          )}
        </div>
      )}
    </div>
  );
}
