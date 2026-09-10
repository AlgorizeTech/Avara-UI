"use client";

import React from "react";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    ring: "ring-primary/30 border-primary",
    text: "text-primary",
    bg: "bg-primary text-primary-foreground",
    bgSoft:
      "bg-primary/10 text-foreground",
    glow: "shadow-[0_0_20px_var(--primary)] border-primary",
  },
  indigo: {
    ring: "ring-indigo-500/30 border-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 text-white",
    bgSoft:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-900 dark:text-indigo-100",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.4)] border-indigo-500",
  },
  rose: {
    ring: "ring-rose-500/30 border-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 text-white",
    bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-100",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.4)] border-rose-500",
  },
  emerald: {
    ring: "ring-emerald-500/30 border-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 text-white",
    bgSoft:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)] border-emerald-500",
  },
  zinc: {
    ring: "ring-zinc-500/30 border-zinc-500 dark:ring-white/20 dark:border-white",
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
    bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
    glow: "shadow-[0_0_20px_rgba(255,255,255,0.15)] border-zinc-900 dark:border-white",
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

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        ring: "ring-[var(--theme-color)]/30 border-[var(--theme-color)]",
        text: "text-[var(--theme-color)]",
        bg: "bg-[var(--theme-color)] text-white",
        bgSoft:
          "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]",
        glow: "shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.5)] border-[var(--theme-color)]",
      },
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};
