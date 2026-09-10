"use client";

import React from "react";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary text-primary-foreground",
    text: "text-primary",
    border: "border-primary",
    dot: "bg-primary-foreground",
    soft: "bg-primary/10 text-primary dark:bg-primary/20",
    bar: "bg-primary",
    ring: "ring-primary/25",
    shadow: "shadow-lg shadow-primary/25",
    focus: "focus-visible:outline-primary",
    hoverBorder: "hover:border-primary/40",
  },
  indigo: {
    bg: "bg-indigo-600 text-white",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-600",
    dot: "bg-white",
    soft: "bg-indigo-600/10 text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-300",
    bar: "bg-indigo-600 dark:bg-indigo-400",
    ring: "ring-indigo-600/25 dark:ring-indigo-400/25",
    shadow: "shadow-lg shadow-indigo-600/30",
    focus: "focus-visible:outline-indigo-500",
    hoverBorder: "hover:border-indigo-600/40 dark:hover:border-indigo-400/40",
  },
  rose: {
    bg: "bg-rose-600 text-white",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-600",
    dot: "bg-white",
    soft: "bg-rose-600/10 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300",
    bar: "bg-rose-600 dark:bg-rose-400",
    ring: "ring-rose-600/25 dark:ring-rose-400/25",
    shadow: "shadow-lg shadow-rose-600/30",
    focus: "focus-visible:outline-rose-500",
    hoverBorder: "hover:border-rose-600/40 dark:hover:border-rose-400/40",
  },
  emerald: {
    bg: "bg-emerald-600 text-white",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-600",
    dot: "bg-white",
    soft: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
    bar: "bg-emerald-600 dark:bg-emerald-400",
    ring: "ring-emerald-600/25 dark:ring-emerald-400/25",
    shadow: "shadow-lg shadow-emerald-600/30",
    focus: "focus-visible:outline-emerald-500",
    hoverBorder: "hover:border-emerald-600/40 dark:hover:border-emerald-400/40",
  },
  purple: {
    bg: "bg-[#8B5CF6] text-white",
    text: "text-[#8B5CF6] dark:text-[#A78BFA]",
    border: "border-[#8B5CF6]",
    dot: "bg-white",
    soft: "bg-[#8B5CF6]/10 text-[#7C3AED] dark:bg-[#A78BFA]/15 dark:text-[#A78BFA]",
    bar: "bg-[#8B5CF6] dark:bg-[#A78BFA]",
    ring: "ring-[#8B5CF6]/25",
    shadow: "shadow-lg shadow-[#8B5CF6]/30",
    focus: "focus-visible:outline-[#8B5CF6]",
    hoverBorder: "hover:border-[#8B5CF6]/40 dark:hover:border-[#A78BFA]/40",
  },
  zinc: {
    bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    dot: "bg-white dark:bg-zinc-900",
    soft: "bg-zinc-900/10 text-zinc-900 dark:bg-zinc-100/15 dark:text-zinc-100",
    bar: "bg-zinc-900 dark:bg-zinc-100",
    ring: "ring-zinc-900/20 dark:ring-zinc-100/20",
    shadow: "shadow-lg shadow-zinc-900/20 dark:shadow-black/50",
    focus: "focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-100",
    hoverBorder: "hover:border-zinc-900/40 dark:hover:border-zinc-100/40",
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
    : "139, 92, 246";
};

const relLuminance = (rgb: string) => {
  const [r, g, b] = rgb.split(",").map((n) => {
    const v = Number(n.trim()) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        bg: "bg-[var(--theme-color)] text-[var(--theme-on-color)]",
        text: "text-[var(--theme-color)]",
        border: "border-[var(--theme-color)]",
        dot: "bg-[var(--theme-on-color)]",
        // The soft roles blend the accent into whatever sits behind it, so one
        // hex reads correctly on both the light and the dark canvas.
        soft: "bg-[rgba(var(--theme-color-rgb),0.14)] text-[var(--theme-color)]",
        bar: "bg-[var(--theme-color)]",
        ring: "ring-[rgba(var(--theme-color-rgb),0.28)]",
        shadow:
          "shadow-[0_10px_24px_-8px_rgba(var(--theme-color-rgb),0.55)]",
        focus: "focus-visible:outline-[var(--theme-color)]",
        hoverBorder:
          "hover:border-[rgba(var(--theme-color-rgb),0.45)]",
      },
      style: {
        "--theme-color": color,
        "--theme-on-color": relLuminance(rgb) > 0.45 ? "#09090b" : "#ffffff",
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};
