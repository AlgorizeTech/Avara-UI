"use client";

import React from "react";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary",
    bgSoft: "bg-primary/20",
    glow: "shadow-[0_0_15px_var(--primary)]",
    // `stroke` and `ringGlow` are the SVG equivalents of `bg` and `glow`, used
    // by CircularProgress — an SVG arc takes a stroke colour, not a background.
    stroke: "text-primary",
    ringGlow: "drop-shadow-[0_0_6px_var(--primary)]",
  },
  indigo: {
    bg: "bg-indigo-600",
    bgSoft: "bg-indigo-500/20",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.5)]",
    stroke: "text-indigo-600",
    ringGlow: "drop-shadow-[0_0_6px_rgba(99,102,241,0.7)]",
  },
  rose: {
    bg: "bg-rose-600",
    bgSoft: "bg-rose-500/20",
    glow: "shadow-[0_0_15px_rgba(244,63,94,0.5)]",
    stroke: "text-rose-600",
    ringGlow: "drop-shadow-[0_0_6px_rgba(244,63,94,0.7)]",
  },
  emerald: {
    bg: "bg-emerald-600",
    bgSoft: "bg-emerald-500/20",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]",
    stroke: "text-emerald-600",
    ringGlow: "drop-shadow-[0_0_6px_rgba(16,185,129,0.7)]",
  },
  // Semantic colours used by `status`. Deliberately the conventional hues —
  // a failed upload should look failed on any brand.
  amber: {
    bg: "bg-amber-500",
    bgSoft: "bg-amber-500/20",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    stroke: "text-amber-500",
    ringGlow: "drop-shadow-[0_0_6px_rgba(245,158,11,0.7)]",
  },
  red: {
    bg: "bg-red-500",
    bgSoft: "bg-red-500/20",
    glow: "shadow-[0_0_15px_rgba(239,68,68,0.5)]",
    stroke: "text-red-500",
    ringGlow: "drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]",
  },
  zinc: {
    bg: "bg-zinc-900 dark:bg-zinc-100",
    bgSoft: "bg-zinc-500/20",
    glow: "shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)]",
    stroke: "text-zinc-900 dark:text-zinc-100",
    ringGlow: "drop-shadow-[0_0_6px_rgba(161,161,170,0.7)]",
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
        bg: "bg-[var(--progress-custom)]",
        bgSoft: "bg-[var(--progress-custom-20)]",
        glow: "shadow-[0_0_15px_var(--progress-custom-50)]",
        stroke: "text-[var(--progress-custom)]",
        ringGlow: "drop-shadow-[0_0_6px_var(--progress-custom-50)]",
      },
      style: {
        "--progress-custom": color,
        "--progress-custom-20": `rgba(${rgb}, 0.2)`,
        "--progress-custom-50": `rgba(${rgb}, 0.5)`,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};
