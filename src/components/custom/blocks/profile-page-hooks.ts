"use client";

import { useEffect, useState } from "react";

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
