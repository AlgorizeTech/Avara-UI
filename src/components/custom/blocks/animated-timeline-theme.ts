"use client";

import React from "react";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary",
    text: "text-primary",
    border: "border-primary/30",
    glow: "shadow-[0_0_15px_color-mix(in_oklab,var(--primary)_50%,transparent)]",
  },
  indigo: {
    bg: "bg-indigo-600",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.5)]",
  },
  rose: {
    bg: "bg-rose-600",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500",
    glow: "shadow-[0_0_15px_rgba(225,29,72,0.5)]",
  },
  emerald: {
    bg: "bg-emerald-600",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]",
  },
  blue: {
    bg: "bg-blue-600",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
  },
  violet: {
    bg: "bg-violet-600",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-500",
    glow: "shadow-[0_0_15px_rgba(139,92,246,0.5)]",
  },
  zinc: {
    bg: "bg-zinc-900 dark:bg-zinc-100",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    glow: "shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)]",
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
    const rgbStr = hexToRgb(color);

    return {
      theme: {
        bg: "bg-[var(--atl-color)]",
        text: "text-[var(--atl-color)]",
        border: "border-[var(--atl-color)]",
        glow: "shadow-[0_0_15px_var(--atl-glow)]",
      },
      style: {
        "--atl-color": color,
        "--atl-glow": `rgba(${rgbStr}, 0.5)`,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};
