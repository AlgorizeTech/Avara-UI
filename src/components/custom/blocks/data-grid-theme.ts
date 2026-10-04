"use client";

import React from "react";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    outline: "outline-[var(--primary)]",
    bgActive: "bg-primary/10",
    handle: "bg-primary",
    headerBg: "bg-primary/10 dark:bg-primary/20 text-primary",
    btnBg: "bg-primary text-primary-foreground hover:opacity-90",
  },
  indigo: {
    outline: "outline-indigo-500",
    bgActive: "bg-indigo-50 dark:bg-indigo-500/10",
    handle: "bg-indigo-500",
    headerBg: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300",
    btnBg: "bg-indigo-600 hover:bg-indigo-700 text-white",
  },
  rose: {
    outline: "outline-rose-500",
    bgActive: "bg-rose-50 dark:bg-rose-500/10",
    handle: "bg-rose-500",
    headerBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300",
    btnBg: "bg-rose-600 hover:bg-rose-700 text-white",
  },
  emerald: {
    outline: "outline-emerald-500",
    bgActive: "bg-emerald-50 dark:bg-emerald-500/10",
    handle: "bg-emerald-500",
    headerBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300",
    btnBg: "bg-emerald-600 hover:bg-emerald-700 text-white",
  },
  blue: {
    outline: "outline-blue-500",
    bgActive: "bg-blue-50 dark:bg-blue-500/10",
    handle: "bg-blue-500",
    headerBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300",
    btnBg: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  zinc: {
    outline: "outline-zinc-900 dark:outline-zinc-100",
    bgActive: "bg-zinc-100 dark:bg-zinc-800",
    handle: "bg-zinc-900 dark:bg-zinc-100",
    headerBg: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
    btnBg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200",
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
        outline: "",
        bgActive: "bg-[rgba(var(--grid-color-rgb),0.1)]",
        handle: "bg-[var(--grid-color)]",
        headerBg: "bg-[rgba(var(--grid-color-rgb),0.12)] text-[var(--grid-color)]",
        btnBg: "bg-[var(--grid-color)] text-white hover:opacity-90",
      },
      style: {
        "--grid-color": color,
        "--grid-color-rgb": rgb,
        outlineColor: color,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};
