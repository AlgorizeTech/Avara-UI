"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SliderControl {
  /** Demo prop this slider writes into. */
  name: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  defaultValue: number;
  /** Appended to the readout — e.g. `%`, `x`. */
  unit?: string;
}

/**
 * Renders a value at the precision its own step implies, so a 0.25 step never
 * shows `0.7500000000000001` — the number the browser actually hands back.
 */
function formatValue(value: number, step: number) {
  const decimals = (String(step).split(".")[1] ?? "").length;
  return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
}

/**
 * The card that holds a showcase's live controls. `ThemeColorPicker` and
 * `ShowcaseSliders` both sit inside ONE of these, so a page reads as a single
 * control panel above the previews rather than a stack of framed widgets.
 */
export function ShowcaseControlCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        // Stacked on small screens; from lg the picker and the sliders share a
        // row and wrap back to two rows only when the sliders need the width.
        "flex flex-col gap-4 sm:gap-5 p-4 sm:p-5 lg:flex-row lg:flex-wrap lg:items-end lg:gap-x-8",
        "bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Tailwind needs the full class name, so the column count is a lookup. */
const COLUMN_CLASS: Record<number, string> = {
  1: "sm:grid-cols-2",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * A row of labelled range sliders wearing the same label + pill shell as
 * `ThemeColorPicker`, so every control in the card reads as one family. The
 * native `input[type=range]` stays in the DOM (invisible, stretched over the
 * pill) so keyboard, touch and screen-reader behaviour are the platform's; the
 * track and thumb painted underneath are purely presentational.
 */
export function ShowcaseSliders({
  controls,
  values,
  onChange,
  className,
}: {
  controls: SliderControl[];
  /** Current value per control name; falls back to the control's default. */
  values: Record<string, number>;
  onChange: (name: string, value: number) => void;
  className?: string;
}) {
  if (controls.length === 0) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-5",
        COLUMN_CLASS[Math.min(controls.length, 4)] ?? COLUMN_CLASS[4],
        className,
      )}
    >
      {controls.map((ctrl) => {
        const step = ctrl.step ?? 1;
        const val = values[ctrl.name] ?? ctrl.defaultValue;
        const span = ctrl.max - ctrl.min;
        const percent =
          span === 0
            ? 0
            : Math.min(100, Math.max(0, ((val - ctrl.min) / span) * 100));

        return (
          <div key={ctrl.name} className="flex flex-col gap-2 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 truncate">
                {ctrl.label}
              </span>
              <span className="shrink-0 font-mono text-xs font-semibold tabular-nums text-zinc-700 dark:text-zinc-300">
                {formatValue(val, step)}
                {ctrl.unit}
              </span>
            </div>

            <div className="relative flex items-center w-full h-4 group touch-none">
              {/* Track */}
              <div className="absolute inset-x-0 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 overflow-hidden pointer-events-none">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* The real control — invisible, but the one that gets events. */}
              <input
                type="range"
                min={ctrl.min}
                max={ctrl.max}
                step={step}
                value={val}
                aria-label={ctrl.label}
                onChange={(e) =>
                  onChange(ctrl.name, parseFloat(e.target.value))
                }
                className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              {/* Thumb. `left` is pulled back by its own width across the
                    travel so it stays inside the track at both ends. */}
              <div
                className="absolute w-4 h-4 rounded-full bg-white dark:bg-zinc-900 border-2 border-primary shadow-sm pointer-events-none transition-transform duration-75 group-hover:scale-110 peer-focus-visible:scale-110 peer-focus-visible:ring-4 peer-focus-visible:ring-primary/30"
                style={{
                  left: `calc(${percent}% - ${(percent / 100) * 16}px)`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
