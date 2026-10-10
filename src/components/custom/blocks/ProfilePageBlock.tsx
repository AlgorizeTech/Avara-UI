"use client";

import {
  GlassBackdrop,
  type GlassBackdropProps,
} from "@/components/custom/blocks/GlassPanelBlock";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLocalTime, type LocalTime } from "./profile-page-hooks";
import { useSurface } from "./glass-panel-context";

// The surface primitives live in GlassPanelBlock so other pages can install
// them without this one. Re-exported here so existing imports keep working.
// Hooks are not re-exported from a component file: import `useSurface` from
// glass-panel-context.ts and `useLocalTime` from profile-page-hooks.ts.
export {
  GlassPanel,
  type GlassPanelProps,
  type GlassShape,
  type SurfaceVariant,
} from "@/components/custom/blocks/GlassPanelBlock";
export type { LocalTime };

// ==========================================
// 1. PAGE SHELL — the glass backdrop, named for the page
// ==========================================
export type ProfilePageProps = GlassBackdropProps;

/** A `GlassBackdrop`: aurora ground, surface context and the 12-column grid. */
export function ProfilePage(props: ProfilePageProps) {
  return <GlassBackdrop {...props} />;
}

// ==========================================
// 3. LOCAL TIME — useLocalTime, in profile-page-hooks.ts
// ==========================================

// ==========================================
// 4. WORKDAY DIAL — 24 hours on a ring
// The working arc, the live marker and the "Working now" line take the
// theme's `primary` (and the focus ring `ring`), so the dial follows the
// site palette — and the docs colour picker — like every other block.
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
  /** One extra line for the tooltip, e.g. "Usually answers the same day". */
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
  const surface = useSurface();
  const isLiquid = surface === "liquid-glass";
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
        "relative mx-auto aspect-square w-full max-w-[240px] rounded-full p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-transparent",
        className,
      )}
    >
      {HOUR_LABELS.map((l) => (
        <span
          key={l.text}
          aria-hidden
          className={cn(
            "absolute text-[10px] font-medium tabular-nums",
            isLiquid ? "text-white/70" : "text-foreground/45",
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
          className={cn(isLiquid ? "stroke-white/20" : "stroke-foreground/[0.08]")}
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
          className={cn(isLiquid ? "stroke-white" : "stroke-primary")}
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
              className={cn(isLiquid ? "stroke-white/40" : "stroke-foreground/25")}
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
              className="fill-background"
            />
            <circle
              cx={marker.x}
              cy={marker.y}
              r="3"
              className={cn(
                working
                  ? isLiquid
                    ? "fill-white"
                    : "fill-primary"
                  : isLiquid
                    ? "fill-white/60"
                    : "fill-muted-foreground",
              )}
            />
          </g>
        )}
      </svg>

      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className={cn("text-3xl font-semibold tabular-nums tracking-tight", isLiquid && "text-white")}>
            {time ? time.label : "--:--"}
          </p>
          <p className={cn("mt-0.5 text-sm", isLiquid ? "text-white/70" : "text-foreground/60")}>
            {place}
          </p>
          <p
            className={cn(
              "mt-2 text-xs font-medium",
              working
                ? isLiquid
                  ? "text-white font-semibold"
                  : "text-primary"
                : isLiquid
                  ? "text-white/60"
                  : "text-foreground/50",
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
          className={cn(
            "pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-2xl p-3 text-left text-xs leading-relaxed shadow-xl backdrop-blur-xl transition-colors duration-200",
            isLiquid
              ? "border border-white/40 bg-white/20 backdrop-blur-2xl text-white shadow-2xl"
              : "border border-popover/70 bg-popover/85 text-popover-foreground dark:border-foreground/10 dark:bg-popover/90 dark:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)]",
          )}
        >
          <p className={cn("font-semibold", isLiquid ? "text-white" : "text-popover-foreground")}>
            {time.label} in {place}
          </p>
          <p className={cn("mt-1", isLiquid ? "text-white/80" : "text-popover-foreground/70")}>
            Works {clock(start)} to {clock(end)}
            {sameClock ? "" : `, ${viewerStart} to ${viewerEnd} your time`}
          </p>
          <p
            className={cn(
              "mt-1 font-medium",
              working
                ? isLiquid
                  ? "text-white font-semibold"
                  : "text-primary"
                : isLiquid
                  ? "text-white/60"
                  : "text-popover-foreground/60",
            )}
          >
            {untilChange}
          </p>
          {note && (
            <p className={cn("mt-1", isLiquid ? "text-white/60" : "text-popover-foreground/60")}>{note}</p>
          )}
        </div>
      )}
    </div>
  );
}
