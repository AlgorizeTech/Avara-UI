"use client";

import type React from "react";

/**
 * Accent colour for the timeline family. Everything reads three CSS variables
 * set on the component's root (`--timeline-color`, `--timeline-on-color`,
 * `--timeline-glow`), so plain classes, SVG strokes and `color-mix()` glows all
 * follow the same accent. `primary` follows the theme token and so retints
 * with every preset.
 */
const NAMED: Record<string, { color: string; on: string }> = {
  primary: { color: "var(--primary)", on: "var(--primary-foreground)" },
  indigo: { color: "#6366f1", on: "#ffffff" },
  rose: { color: "#f43f5e", on: "#ffffff" },
  emerald: { color: "#10b981", on: "#ffffff" },
  blue: { color: "#3b82f6", on: "#ffffff" },
  violet: { color: "#8b5cf6", on: "#ffffff" },
  zinc: { color: "var(--foreground)", on: "var(--background)" },
};

/** Class names that read the variables above. */
const THEME: Record<string, string> = {
  bg: "bg-[var(--timeline-color)]",
  on: "text-[var(--timeline-on-color)]",
  text: "text-[var(--timeline-color)]",
  border: "border-[var(--timeline-color)]",
  glow: "shadow-[0_0_15px_var(--timeline-glow)]",
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

const relLuminance = (rgb: string) => {
  const [r, g, b] = rgb.split(",").map((n) => {
    const v = Number(n.trim()) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const vars = (color: string, on: string, glow: string) =>
  ({
    "--timeline-color": color,
    "--timeline-on-color": on,
    "--timeline-glow": glow,
  }) as React.CSSProperties;

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: THEME,
      style: vars(
        color,
        relLuminance(rgb) > 0.45 ? "#09090b" : "#ffffff",
        `rgba(${rgb}, 0.5)`,
      ),
    };
  }
  const named = NAMED[color] ?? NAMED.primary;
  return {
    theme: THEME,
    style: vars(
      named.color,
      named.on,
      `color-mix(in oklab, ${named.color} 50%, transparent)`,
    ),
  };
};
