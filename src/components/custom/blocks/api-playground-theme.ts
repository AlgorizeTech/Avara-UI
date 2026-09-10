"use client";

import React from "react";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary text-primary-foreground",
    text: "text-primary",
    border: "border-primary",
    glow: "shadow-[0_0_15px_var(--primary)]",
  },
  indigo: {
    bg: "bg-indigo-600 text-white",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.3)]",
  },
  rose: {
    bg: "bg-rose-600 text-white",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500",
    glow: "shadow-[0_0_15px_rgba(225,29,72,0.3)]",
  },
  emerald: {
    bg: "bg-emerald-600 text-white",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
  },
  zinc: {
    bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    glow: "shadow-[0_0_15px_rgba(255,255,255,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
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
        bg: "bg-[var(--api-color)] text-white",
        text: "text-[var(--api-color)]",
        border: "border-[var(--api-color)]",
        glow: "shadow-[0_0_15px_var(--api-glow)]",
      },
      style: {
        "--api-color": color,
        "--api-glow": `rgba(${rgb}, 0.3)`,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};
