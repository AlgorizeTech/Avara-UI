"use client";

import React from "react";

export type PricingColor = "indigo" | "rose" | "emerald" | "zinc" | string;

const colorThemes: Record<string, Record<string, string>> = {
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 text-white",
    bgSoft:
      "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400",
    border: "border-indigo-600 dark:border-indigo-500",
    shadow: "shadow-indigo-500/20",
    gradient: "from-indigo-600 to-purple-600",
    gradientSoft:
      "from-indigo-100 to-transparent dark:from-indigo-500/10 dark:to-transparent",
    ring: "ring-indigo-600 dark:ring-indigo-500",
    slider:
      "accent-indigo-600 dark:accent-indigo-500 [&::-webkit-slider-thumb]:bg-indigo-600 dark:[&::-webkit-slider-thumb]:bg-indigo-500",
    fill: "fill-indigo-600 dark:fill-indigo-400",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 text-white",
    bgSoft: "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400",
    border: "border-rose-600 dark:border-rose-500",
    shadow: "shadow-rose-500/20",
    gradient: "from-rose-600 to-orange-500",
    gradientSoft:
      "from-rose-100 to-transparent dark:from-rose-500/10 dark:to-transparent",
    ring: "ring-rose-600 dark:ring-rose-500",
    slider:
      "accent-rose-600 dark:accent-rose-500 [&::-webkit-slider-thumb]:bg-rose-600 dark:[&::-webkit-slider-thumb]:bg-rose-500",
    fill: "fill-rose-600 dark:fill-rose-400",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 text-white",
    bgSoft:
      "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-600 dark:border-emerald-500",
    shadow: "shadow-emerald-500/20",
    gradient: "from-emerald-600 to-teal-500",
    gradientSoft:
      "from-emerald-100 to-transparent dark:from-emerald-500/10 dark:to-transparent",
    ring: "ring-emerald-600 dark:ring-emerald-500",
    slider:
      "accent-emerald-600 dark:accent-emerald-500 [&::-webkit-slider-thumb]:bg-emerald-600 dark:[&::-webkit-slider-thumb]:bg-emerald-500",
    fill: "fill-emerald-600 dark:fill-emerald-400",
  },
  zinc: {
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
    bgSoft: "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    shadow: "shadow-zinc-900/20 dark:shadow-white/10",
    gradient: "from-zinc-800 to-zinc-900 dark:from-zinc-200 dark:to-zinc-400",
    gradientSoft:
      "from-zinc-200 to-transparent dark:from-zinc-800/50 dark:to-transparent",
    ring: "ring-zinc-900 dark:ring-zinc-100",
    slider:
      "accent-zinc-900 dark:accent-zinc-100 [&::-webkit-slider-thumb]:bg-zinc-900 dark:[&::-webkit-slider-thumb]:bg-zinc-100",
    fill: "fill-zinc-900 dark:fill-zinc-100",
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

export const getThemeStyles = (color: PricingColor = "primary") => {
  if (color === "primary") {
    return {
      theme: {
        text: "text-[var(--pricing-accent)]",
        bg: "bg-[var(--pricing-accent)] text-[var(--pricing-on)]",
        bgSoft: "bg-[var(--pricing-accent)]/10 text-[var(--pricing-accent)]",
        border: "border-[var(--pricing-accent)]",
        shadow: "shadow-[var(--pricing-accent)]/20",
        gradient: "from-[var(--pricing-accent)] to-[var(--pricing-accent)]/80",
        gradientSoft:
          "from-[var(--pricing-accent)]/10 to-transparent dark:from-[var(--pricing-accent)]/10 dark:to-transparent",
        ring: "ring-[var(--pricing-accent)]",
        slider:
          "accent-[var(--pricing-accent)] [&::-webkit-slider-thumb]:bg-[var(--pricing-accent)]",
        fill: "fill-[var(--pricing-accent)]",
      },
      style: {
        "--pricing-accent": "var(--primary)",
        "--pricing-on": "var(--primary-foreground)",
      } as React.CSSProperties,
    };
  }

  if (colorThemes[color]) {
    return { theme: colorThemes[color], style: {} };
  }

  const rgb = hexToRgb(color);
  return {
    theme: {
      text: "text-[var(--pricing-accent)]",
      bg: "bg-[var(--pricing-accent)] text-white",
      bgSoft: "bg-[var(--pricing-accent)]/10 text-[var(--pricing-accent)]",
      border: "border-[var(--pricing-accent)]",
      shadow: "shadow-[var(--pricing-accent)]/20",
      gradient: "from-[var(--pricing-accent)] to-[var(--pricing-accent)]/80",
      gradientSoft: "from-[var(--pricing-accent)]/10 to-transparent",
      ring: "ring-[var(--pricing-accent)]",
      slider:
        "accent-[var(--pricing-accent)] [&::-webkit-slider-thumb]:bg-[var(--pricing-accent)]",
      fill: "fill-[var(--pricing-accent)]",
    },
    style: {
      "--pricing-accent": color,
      "--pricing-rgb": rgb,
    } as React.CSSProperties,
  };
};
