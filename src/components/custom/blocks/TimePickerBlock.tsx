"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { getThemeStyles } from "./date-picker-theme";

export type TimeFormat = "12h" | "24h";

export interface TimePickerProps {
  /** The date whose time is being edited. The day part is preserved on change. */
  value: Date | null;
  /** Receives a copy of `value` with the new hours / minutes applied. */
  onChange: (next: Date) => void;
  /** 12-hour clock with an AM / PM column, or a 24-hour one. Default "12h". */
  format?: TimeFormat;
  /** Minute granularity. Default 5. */
  minuteStep?: number;
  /** Times earlier than this are disabled (compared on the same day as `value`). */
  minTime?: Date | null;
  /** Times later than this are disabled (compared on the same day as `value`). */
  maxTime?: Date | null;
  /** Theme colour — same names / hex codes as the date pickers. */
  color?: string;
  disabled?: boolean;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** A new Date on the same day as `base` at the given time. */
export const setTime = (base: Date, hours: number, minutes: number) => {
  const next = new Date(base);
  next.setHours(hours, minutes, 0, 0);
  return next;
};

/** Rounds `date` up to the next multiple of `step` minutes — "now" for a picker default. */
export const roundToStep = (date: Date, step: number) => {
  const next = new Date(date);
  const m = Math.ceil(next.getMinutes() / step) * step;
  next.setMinutes(m, 0, 0);
  return next;
};

export const formatTime = (date: Date, format: TimeFormat = "12h") =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: format === "12h",
  }).format(date);

// One scrollable column of options. Keeps the selected item centred so the
// picker opens on the current value instead of at the top of the list.
function Column<T extends string | number>({
  items,
  selected,
  isDisabled,
  onSelect,
  render,
  theme,
  disabled,
  label,
}: {
  items: T[];
  selected: T | null;
  isDisabled: (item: T) => boolean;
  onSelect: (item: T) => void;
  render: (item: T) => string;
  theme: Record<string, string>;
  disabled: boolean;
  label: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || selected === null) return;
    const el = list.querySelector<HTMLElement>(`[data-value="${selected}"]`);
    if (!el) return;
    // Scroll the column itself, never the page.
    list.scrollTop = el.offsetTop - list.clientHeight / 2 + el.clientHeight / 2;
  }, [selected]);

  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label={label}
      // shrink-0: a tight parent must never squeeze a column narrower than its
      // buttons — that is exactly what produces a horizontal scrollbar here.
      className="relative h-full shrink-0 overflow-y-auto overflow-x-hidden overscroll-contain px-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex flex-col gap-0.5 py-1">
        {items.map((item) => {
          const active = item === selected;
          const off = disabled || isDisabled(item);
          return (
            <button
              key={item}
              type="button"
              role="option"
              aria-selected={active}
              data-value={item}
              disabled={off}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item);
              }}
              className={cn(
                "w-10 h-7 shrink-0 rounded-md text-xs font-semibold tabular-nums transition-colors",
                active
                  ? cn(theme.bg, "shadow-sm")
                  : "text-foreground hover:bg-muted",
                off && "opacity-30 cursor-not-allowed hover:bg-transparent",
              )}
            >
              {render(item)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TimePicker({
  value,
  onChange,
  format = "12h",
  minuteStep = 5,
  minTime,
  maxTime,
  color = "primary",
  disabled = false,
  className,
}: TimePickerProps) {
  const { theme, style } = getThemeStyles(color);
  const is12h = format === "12h";

  const hours24 = value ? value.getHours() : null;
  const minutes = value ? value.getMinutes() : null;
  const period: "AM" | "PM" | null = hours24 === null ? null : hours24 >= 12 ? "PM" : "AM";
  const hour12 = hours24 === null ? null : hours24 % 12 === 0 ? 12 : hours24 % 12;

  const hourItems = is12h
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i);
  const minuteItems = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep);

  const to24 = (h: number, p: "AM" | "PM" | null) => {
    if (!is12h) return h;
    const base = h % 12;
    return (p ?? "AM") === "PM" ? base + 12 : base;
  };

  // A candidate time is out of bounds if it falls before minTime or after
  // maxTime on the same day. Without a value there is no day to compare on,
  // so nothing is disabled.
  const outOfBounds = (h24: number, m: number) => {
    if (!value) return false;
    const t = setTime(value, h24, m).getTime();
    if (minTime && t < minTime.getTime()) return true;
    if (maxTime && t > maxTime.getTime()) return true;
    return false;
  };
  const hourDisabled = (h: number, p = period) => {
    const h24 = to24(h, p);
    return minuteItems.every((m) => outOfBounds(h24, m));
  };
  const minuteDisabled = (m: number) =>
    hours24 === null ? false : outOfBounds(hours24, m);
  const periodDisabled = (p: "AM" | "PM") => hourItems.every((h) => hourDisabled(h, p));

  const commit = (h24: number, m: number) => {
    if (!value) return;
    onChange(setTime(value, h24, m));
  };

  // When the current minute becomes invalid for a newly chosen hour (or
  // period), snap to the first minute that is allowed in it.
  const firstValidMinute = (h24: number) =>
    minuteItems.find((m) => !outOfBounds(h24, m)) ?? minuteItems[0];

  return (
    <div
      className={cn("flex items-stretch justify-center gap-1 h-32 min-w-max", className)}
      style={style}
      aria-disabled={disabled}
    >
      <Column
        label="Hour"
        items={hourItems}
        selected={is12h ? hour12 : hours24}
        isDisabled={(h) => hourDisabled(h)}
        onSelect={(h) => {
          const h24 = to24(h, period);
          const m = minutes ?? 0;
          commit(h24, outOfBounds(h24, m) ? firstValidMinute(h24) : m);
        }}
        render={(h) => pad(h)}
        theme={theme}
        disabled={disabled || !value}
      />
      <span className="self-center text-sm font-bold text-muted-foreground">:</span>
      <Column
        label="Minute"
        items={minuteItems}
        selected={minutes !== null ? minutes - (minutes % minuteStep) : null}
        isDisabled={minuteDisabled}
        onSelect={(m) => commit(hours24 ?? 0, m)}
        render={(m) => pad(m)}
        theme={theme}
        disabled={disabled || !value}
      />
      {is12h && (
        <Column<"AM" | "PM">
          label="AM or PM"
          items={["AM", "PM"]}
          selected={period}
          isDisabled={periodDisabled}
          onSelect={(p) => {
            const h24 = to24(hour12 ?? 12, p);
            const m = minutes ?? 0;
            commit(h24, outOfBounds(h24, m) ? firstValidMinute(h24) : m);
          }}
          render={(p) => p}
          theme={theme}
          disabled={disabled || !value}
        />
      )}
    </div>
  );
}
