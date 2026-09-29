"use client";

import React from "react";

export interface ApiThemeStyles {
  bg: string;
  text: string;
  border: string;
  tabBorder?: string;
  checkboxBorder?: string;
  glow: string;
}

const colorThemes: Record<string, ApiThemeStyles> = {
  primary: {
    bg: "bg-primary text-primary-foreground",
    text: "text-primary",
    border: "border-primary/30",
    tabBorder: "border-primary",
    checkboxBorder: "border-primary",
    glow: "shadow-[0_0_15px_var(--primary)]",
  },
  default: {
    bg: "bg-primary text-primary-foreground",
    text: "text-primary",
    border: "border-primary/30",
    tabBorder: "border-primary",
    checkboxBorder: "border-primary",
    glow: "shadow-[0_0_15px_var(--primary)]",
  },
  lavender: {
    bg: "bg-[#9b8afb] text-white",
    text: "text-[#9b8afb]",
    border: "border-[#9b8afb]/40",
    tabBorder: "border-[#9b8afb]",
    checkboxBorder: "border-[#9b8afb]",
    glow: "shadow-[0_0_15px_rgba(155,138,251,0.35)]",
  },
  indigo: {
    bg: "bg-indigo-600 text-white",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500",
    tabBorder: "border-indigo-500",
    checkboxBorder: "border-indigo-500",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.3)]",
  },
  rose: {
    bg: "bg-rose-600 text-white",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500",
    tabBorder: "border-rose-500",
    checkboxBorder: "border-rose-500",
    glow: "shadow-[0_0_15px_rgba(225,29,72,0.3)]",
  },
  emerald: {
    bg: "bg-emerald-600 text-white",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500",
    tabBorder: "border-emerald-500",
    checkboxBorder: "border-emerald-500",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
  },
  zinc: {
    bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    tabBorder: "border-zinc-900 dark:border-zinc-100",
    checkboxBorder: "border-zinc-900 dark:border-zinc-100",
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

const themeVarsMap: Record<string, { color: string; glow: string }> = {
  primary: { color: "var(--primary)", glow: "var(--primary)" },
  default: { color: "var(--primary)", glow: "var(--primary)" },
  lavender: { color: "#9b8afb", glow: "rgba(155, 138, 251, 0.35)" },
  indigo: { color: "#6366f1", glow: "rgba(99, 102, 241, 0.3)" },
  rose: { color: "#e11d48", glow: "rgba(225, 29, 72, 0.3)" },
  emerald: { color: "#10b981", glow: "rgba(16, 185, 129, 0.3)" },
  zinc: { color: "#18181b", glow: "rgba(255, 255, 255, 0.2)" },
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        bg: "bg-[var(--api-color)] text-white",
        text: "text-[var(--api-color)]",
        border: "border-[var(--api-color)]",
        tabBorder: "border-[var(--api-color)]",
        checkboxBorder: "border-[var(--api-color)]",
        glow: "shadow-[0_0_15px_var(--api-glow)]",
      },
      style: {
        "--api-color": color,
        "--api-glow": `rgba(${rgb}, 0.3)`,
      } as React.CSSProperties,
    };
  }

  const resolvedTheme = colorThemes[color] || colorThemes.primary;
  const vars = themeVarsMap[color] || themeVarsMap.primary;

  return {
    theme: resolvedTheme,
    style: {
      "--api-color": vars.color,
      "--api-glow": vars.glow,
    } as React.CSSProperties,
  };
};
