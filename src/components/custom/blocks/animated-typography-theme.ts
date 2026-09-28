"use client";

import React from "react";

const colorThemes: Record<string, string> = {
  primary: "text-primary",
  indigo: "text-indigo-600 dark:text-indigo-400",
  rose: "text-rose-600 dark:text-rose-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  zinc: "text-zinc-900 dark:text-zinc-100",
  default: "text-primary",
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
      className: "text-[var(--typo-color)]",
      style: {
        "--typo-color": color,
        "--typo-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { className: colorThemes[color] || colorThemes.primary, style: {} };
};
