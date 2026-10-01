"use client";

import React from "react";

export interface SelectThemeConfig {
  ring: string;
  text: string;
  bg: string;
  bgSoft: string;
  hoverBg: string;
  glow: string;
}

const colorThemes: Record<string, SelectThemeConfig> = {
  primary: {
    ring: "ring-primary/30 border-primary/30",
    text: "text-primary",
    bg: "bg-primary text-primary-foreground",
    bgSoft: "bg-primary/15 text-primary dark:bg-primary/20",
    hoverBg: "hover:bg-primary/10 hover:text-primary",
    glow: "shadow-[0_0_20px_var(--primary)] border-primary/30",
  },
  indigo: {
    ring: "ring-indigo-500/30 border-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 text-white",
    bgSoft: "bg-indigo-500/15 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
    hoverBg: "hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.4)] border-indigo-500",
  },
  rose: {
    ring: "ring-rose-500/30 border-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 text-white",
    bgSoft: "bg-rose-500/15 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
    hoverBg: "hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.4)] border-rose-500",
  },
  emerald: {
    ring: "ring-emerald-500/30 border-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 text-white",
    bgSoft: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    hoverBg: "hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)] border-emerald-500",
  },
  lavender: {
    ring: "ring-[#9b8afb]/30 border-[#9b8afb]",
    text: "text-[#8774f8] dark:text-[#b4a7fc]",
    bg: "bg-[#9b8afb] text-white",
    bgSoft: "bg-[#9b8afb]/15 text-[#7a64f7] dark:bg-[#9b8afb]/20 dark:text-[#c4bbfd]",
    hoverBg: "hover:bg-[#9b8afb]/10 hover:text-[#8774f8] dark:hover:text-[#b4a7fc]",
    glow: "shadow-[0_0_20px_rgba(155,138,251,0.4)] border-[#9b8afb]",
  },
  blue: {
    ring: "ring-blue-500/30 border-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-600 text-white",
    bgSoft: "bg-blue-500/15 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
    hoverBg: "hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.4)] border-blue-500",
  },
  zinc: {
    ring: "ring-zinc-500/30 border-zinc-500 dark:ring-white/20 dark:border-white",
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
    bgSoft: "bg-zinc-500/15 text-zinc-900 dark:bg-zinc-500/25 dark:text-zinc-100",
    hoverBg: "hover:bg-zinc-500/10 hover:text-zinc-900 dark:hover:text-zinc-100",
    glow: "shadow-[0_0_20px_rgba(255,255,255,0.15)] border-zinc-900 dark:border-white",
  },
};

const PRESET_HEX: Record<string, string> = {
  indigo: "#6366f1",
  rose: "#f43f5e",
  emerald: "#10b981",
  lavender: "#9b8afb",
  blue: "#3b82f6",
  zinc: "#71717a",
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
  if (color && (color.startsWith("#") || color.startsWith("rgb"))) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        ring: "ring-[var(--theme-color)]/30 border-[var(--theme-color)]",
        text: "text-[var(--theme-color)]",
        bg: "bg-[var(--theme-color)] text-white",
        bgSoft:
          "bg-[rgba(var(--theme-color-rgb),0.15)] text-[var(--theme-color)]",
        hoverBg:
          "hover:bg-[rgba(var(--theme-color-rgb),0.1)] hover:text-[var(--theme-color)]",
        glow: "shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.5)] border-[var(--theme-color)]",
      },
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }

  const presetHex = PRESET_HEX[color];
  const styleObj: React.CSSProperties = presetHex
    ? ({
        "--theme-color": presetHex,
        "--theme-color-rgb": hexToRgb(presetHex),
      } as React.CSSProperties)
    : {};

  return { theme: colorThemes[color] || colorThemes.primary, style: styleObj };
};
