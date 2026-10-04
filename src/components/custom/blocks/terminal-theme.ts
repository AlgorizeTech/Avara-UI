"use client";

import React from "react";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary/10 text-primary",
    border: "border-primary/30",
    text: "text-primary",
  },
  indigo: {
    bg: "bg-indigo-500/10 text-indigo-400",
    border: "border-indigo-500/30",
    text: "text-indigo-400",
  },
  rose: {
    bg: "bg-rose-500/10 text-rose-400",
    border: "border-rose-500/30",
    text: "text-rose-400",
  },
  emerald: {
    bg: "bg-emerald-500/10 text-emerald-400",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
  },
  zinc: {
    bg: "bg-zinc-500/10 text-zinc-400",
    border: "border-zinc-500/30",
    text: "text-zinc-400",
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
        bg: "bg-[rgba(var(--term-rgb),0.1)] text-[var(--term-color)]",
        border: "border-[rgba(var(--term-rgb),0.3)]",
        text: "text-[var(--term-color)]",
      },
      style: {
        "--term-color": color,
        "--term-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};
