"use client";

import React from "react";

const colorThemes: Record<string, Record<string, string>> = {
  // The theme's own accent, so a group follows whatever `--primary` the
  // consumer set — the same contract Button and Input honour.
  primary: {
    bg: "bg-primary text-primary-foreground",
    text: "text-primary",
    border: "border-primary/30 text-primary bg-primary/10",
  },
  indigo: {
    bg: "bg-indigo-500 text-white",
    text: "text-indigo-600 dark:text-indigo-400",
    border:
      "border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10",
  },
  rose: {
    bg: "bg-rose-500 text-white",
    text: "text-rose-600 dark:text-rose-400",
    border:
      "border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10",
  },
  emerald: {
    bg: "bg-emerald-500 text-white",
    text: "text-emerald-600 dark:text-emerald-400",
    border:
      "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10",
  },
  zinc: {
    bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    border:
      "border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800",
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
        bg: "bg-[var(--toggle-color)] text-white",
        text: "text-[var(--toggle-color)]",
        border:
          "border-[var(--toggle-color)] text-[var(--toggle-color)] bg-[rgba(var(--toggle-rgb),0.1)]",
      },
      style: {
        "--toggle-color": color,
        "--toggle-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.zinc, style: {} };
};
