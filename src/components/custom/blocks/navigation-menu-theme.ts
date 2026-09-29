"use client";

import React from "react";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary text-primary-foreground",
    text: "text-primary",
    bgSoft: "bg-primary/10",
    border: "border-primary/30",
  },
  indigo: {
    bg: "bg-indigo-600 text-white",
    text: "text-indigo-600 dark:text-indigo-400",
    bgSoft: "bg-indigo-50 dark:bg-indigo-500/10",
    border: "border-indigo-200 dark:border-indigo-800",
  },
  rose: {
    bg: "bg-rose-600 text-white",
    text: "text-rose-600 dark:text-rose-400",
    bgSoft: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-200 dark:border-rose-800",
  },
  emerald: {
    bg: "bg-emerald-600 text-white",
    text: "text-emerald-600 dark:text-emerald-400",
    bgSoft: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  zinc: {
    bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    bgSoft: "bg-zinc-100 dark:bg-zinc-800/50",
    border: "border-zinc-200 dark:border-zinc-800",
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
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

// One CSS colour per theme key, exposed as `--nav-accent` so surfaces can be
// tinted from it with relative OKLCH / color-mix whatever the colour source.
const accentColors: Record<string, string> = {
  primary: "var(--primary)",
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#059669",
  zinc: "#52525b",
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        bg: "bg-[var(--nav-color)] text-white",
        text: "text-[var(--nav-color)]",
        bgSoft: "bg-[rgba(var(--nav-color-rgb),0.1)]",
        border: "border-[rgba(var(--nav-color-rgb),0.2)]",
      },
      style: {
        "--nav-color": color,
        "--nav-color-rgb": rgb,
        "--nav-accent": color,
      } as React.CSSProperties,
    };
  }
  return {
    theme: colorThemes[color] || colorThemes.primary,
    style: {
      "--nav-accent": accentColors[color] ?? accentColors.primary,
    } as React.CSSProperties,
  };
};
