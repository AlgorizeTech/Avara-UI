"use client";

import React from "react";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    focusRing: "focus:ring-primary focus:border-primary/30",
    text: "text-primary",
    border: "border-primary/30",
  },
  indigo: {
    focusRing: "focus:ring-indigo-500 focus:border-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500",
  },
  rose: {
    focusRing: "focus:ring-rose-500 focus:border-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500",
  },
  emerald: {
    focusRing: "focus:ring-emerald-500 focus:border-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500",
  },
  zinc: {
    focusRing:
      "focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-900 dark:focus:border-zinc-100",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
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
        focusRing:
          "focus:ring-[var(--otp-color)] focus:border-[var(--otp-color)]",
        text: "text-[var(--otp-color)]",
        border: "border-[var(--otp-color)]",
      },
      style: {
        "--otp-color": color,
        "--otp-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};
