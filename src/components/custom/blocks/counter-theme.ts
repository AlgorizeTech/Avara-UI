"use client";

import React from "react";

/** The class set one colour gives the block. */
export interface CounterTheme {
  bg: string;
  text: string;
  border: string;
  ring: string;
  fill: string;
  bgSoft: string;
}

const PRIMARY: CounterTheme = {
  bg: "bg-primary text-primary-foreground",
  text: "text-primary",
  border: "border-primary",
  ring: "ring-primary/20",
  fill: "stroke-primary",
  bgSoft: "bg-primary/10 text-primary",
};

/** Takes the surrounding text colour, for a counter inside a section that sets its own. */
const INHERIT: CounterTheme = {
  bg: "bg-current text-background",
  text: "text-current",
  border: "border-current",
  ring: "ring-current/20",
  fill: "stroke-current",
  bgSoft: "bg-current/10 text-current",
};

const colorThemes: Record<string, CounterTheme> = {
  primary: PRIMARY,
  inherit: INHERIT,
  indigo: {
    bg: "bg-indigo-600 text-white",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-600",
    ring: "ring-indigo-600/20",
    fill: "stroke-indigo-600",
    bgSoft:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  rose: {
    bg: "bg-rose-600 text-white",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-600",
    ring: "ring-rose-600/20",
    fill: "stroke-rose-600",
    bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  emerald: {
    bg: "bg-emerald-600 text-white",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-600",
    ring: "ring-emerald-600/20",
    fill: "stroke-emerald-600",
    bgSoft:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  zinc: {
    bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    ring: "ring-zinc-900/20 dark:ring-white/10",
    fill: "stroke-zinc-900 dark:stroke-zinc-100",
    bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
  },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1] ?? "63", 16)}, ${parseInt(result[2] ?? "66", 16)}, ${parseInt(result[3] ?? "f1", 16)}`
    : "99, 102, 241";
};

export const getThemeStyles = (color: string): { theme: CounterTheme; style: React.CSSProperties } => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        bg: "bg-[var(--theme-color)] text-white",
        text: "text-[var(--theme-color)]",
        border: "border-[var(--theme-color)]",
        ring: "ring-[var(--theme-color)]/20",
        fill: "stroke-[var(--theme-color)]",
        bgSoft:
          "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]",
      },
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] ?? PRIMARY, style: {} };
};
