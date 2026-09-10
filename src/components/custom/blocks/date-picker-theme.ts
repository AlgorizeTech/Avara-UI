"use client";

import React from "react";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    ring: "focus-within:ring-primary/30 focus-within:border-primary",
    text: "text-primary",
    bg: "bg-primary text-primary-foreground hover:bg-primary/90",
    bgSoft:
      "bg-primary/10 text-foreground hover:bg-primary/20",
    glow: "focus-within:shadow-[0_0_20px_var(--primary)] focus-within:border-primary",
  },
  indigo: {
    ring: "focus-within:ring-indigo-500/30 focus-within:border-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 text-white hover:bg-indigo-700",
    bgSoft:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-900 dark:text-indigo-100 hover:bg-indigo-100 dark:hover:bg-indigo-500/20",
    glow: "focus-within:shadow-[0_0_20px_rgba(99,102,241,0.4)] focus-within:border-indigo-500",
  },
  rose: {
    ring: "focus-within:ring-rose-500/30 focus-within:border-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 text-white hover:bg-rose-700",
    bgSoft:
      "bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-100 hover:bg-rose-100 dark:hover:bg-rose-500/20",
    glow: "focus-within:shadow-[0_0_20px_rgba(244,63,94,0.4)] focus-within:border-rose-500",
  },
  emerald: {
    ring: "focus-within:ring-emerald-500/30 focus-within:border-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 text-white hover:bg-emerald-700",
    bgSoft:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100 dark:hover:bg-emerald-500/20",
    glow: "focus-within:shadow-[0_0_20px_rgba(16,185,129,0.4)] focus-within:border-emerald-500",
  },
  zinc: {
    ring: "focus-within:ring-zinc-500/30 focus-within:border-zinc-500 dark:focus-within:ring-white/20 dark:focus-within:border-white",
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200",
    bgSoft:
      "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800",
    glow: "focus-within:shadow-[0_0_20px_rgba(255,255,255,0.15)] focus-within:border-zinc-900 dark:focus-within:border-white",
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
        ring: "focus-within:ring-[var(--theme-color)]/30 focus-within:border-[var(--theme-color)]",
        text: "text-[var(--theme-color)]",
        bg: "bg-[var(--theme-color)] text-white hover:opacity-90",
        bgSoft:
          "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)] hover:bg-[rgba(var(--theme-color-rgb),0.2)]",
        glow: "focus-within:shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.5)] focus-within:border-[var(--theme-color)]",
      },
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};
