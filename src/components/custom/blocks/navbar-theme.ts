"use client";

import React from "react";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 hover:bg-indigo-700 text-white",
    bgSoft:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 hover:bg-rose-700 text-white",
    bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 hover:bg-emerald-700 text-white",
    bgSoft:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  zinc: {
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900",
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
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

const contrastingForeground = (rgb: string) => {
  const [r, g, b] = rgb.split(",").map((v) => parseInt(v.trim(), 10));
  const channel = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const luminance =
    0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  return luminance > 0.45 ? "#09090b" : "#ffffff";
};

// One CSS colour per theme key, exposed as `--navbar-accent` so surfaces (the
// dropdown panel, hover washes) can be tinted from it whatever the source.
const accentColors: Record<string, string> = {
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#059669",
  zinc: "#52525b",
};

export const getThemeStyles = (color: string) => {
  if (color === "primary" || color === "default" || !colorThemes[color]) {
    if (color && color.startsWith("#")) {
      const rgb = hexToRgb(color);
      return {
        theme: {
          text: "text-[var(--theme-color)]",
          bg: "bg-[var(--theme-color)] text-[var(--theme-on-color)] hover:opacity-90",
          bgSoft:
            "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]",
        },
        style: {
          "--theme-color": color,
          "--theme-color-rgb": rgb,
          "--theme-on-color": contrastingForeground(rgb),
          "--navbar-accent": color,
        } as React.CSSProperties,
      };
    }
    return {
      theme: {
        text: "text-primary",
        bg: "bg-primary text-primary-foreground hover:bg-primary/90",
        bgSoft: "bg-primary/10 text-primary",
      },
      style: { "--navbar-accent": "var(--primary)" } as React.CSSProperties,
    };
  }
  return {
    theme: colorThemes[color],
    style: { "--navbar-accent": accentColors[color] } as React.CSSProperties,
  };
};
