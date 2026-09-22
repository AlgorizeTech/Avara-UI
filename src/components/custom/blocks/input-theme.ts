"use client";

import React from "react";

/** The class set one colour gives the block. */
export interface InputTheme {
  ring: string;
  text: string;
  bg: string;
  bgSoft: string;
  glow: string;
  dragActive: string;
}

const PRIMARY: InputTheme = {
  ring: "focus-within:ring-primary/30 focus-within:border-primary/30",
  text: "text-primary",
  bg: "bg-primary text-primary-foreground",
  bgSoft: "bg-primary/10 text-foreground",
  glow: "focus-within:shadow-[0_0_20px_var(--primary)] focus-within:border-primary/30",
  dragActive: "border-primary/30 bg-primary/10",
};

const colorThemes: Record<string, InputTheme> = {
  primary: PRIMARY,
  indigo: {
    ring: "focus-within:ring-indigo-500/30 focus-within:border-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 text-white",
    bgSoft:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-900 dark:text-indigo-100",
    glow: "focus-within:shadow-[0_0_20px_rgba(99,102,241,0.4)] focus-within:border-indigo-500",
    dragActive: "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10",
  },
  rose: {
    ring: "focus-within:ring-rose-500/30 focus-within:border-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 text-white",
    bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-100",
    glow: "focus-within:shadow-[0_0_20px_rgba(244,63,94,0.4)] focus-within:border-rose-500",
    dragActive: "border-rose-500 bg-rose-50 dark:bg-rose-500/10",
  },
  emerald: {
    ring: "focus-within:ring-emerald-500/30 focus-within:border-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 text-white",
    bgSoft:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
    glow: "focus-within:shadow-[0_0_20px_rgba(16,185,129,0.4)] focus-within:border-emerald-500",
    dragActive: "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10",
  },
  zinc: {
    ring: "focus-within:ring-zinc-500/30 focus-within:border-zinc-500 dark:focus-within:ring-white/20 dark:focus-within:border-white",
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
    bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
    glow: "focus-within:shadow-[0_0_20px_rgba(255,255,255,0.15)] focus-within:border-zinc-900 dark:focus-within:border-white",
    dragActive:
      "border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800/50",
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

export const getThemeStyles = (color: string): { theme: InputTheme; style: React.CSSProperties } => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        ring: "focus-within:ring-[var(--theme-color)]/30 focus-within:border-[var(--theme-color)]",
        text: "text-[var(--theme-color)]",
        bg: "bg-[var(--theme-color)] text-white hover:opacity-90",
        bgSoft:
          "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]",
        glow: "focus-within:shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.5)] focus-within:border-[var(--theme-color)]",
        dragActive:
          "border-[var(--theme-color)] bg-[rgba(var(--theme-color-rgb),0.05)]",
      },
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] ?? PRIMARY, style: {} };
};
