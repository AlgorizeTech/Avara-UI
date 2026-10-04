"use client";

import React from "react";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    thumb: "rgba(161, 161, 170, 0.4)",
    thumbHover: "rgba(113, 113, 122, 0.7)",
    track: "rgba(228, 228, 231, 0.25)",
  },
  indigo: {
    thumb: "#4f46e5",
    thumbHover: "#4338ca",
    track: "rgba(79, 70, 229, 0.18)",
  },
  rose: {
    thumb: "#e11d48",
    thumbHover: "#be123c",
    track: "rgba(225, 29, 72, 0.18)",
  },
  emerald: {
    thumb: "#10b981",
    thumbHover: "#059669",
    track: "rgba(16, 185, 129, 0.18)",
  },
  zinc: {
    thumb: "#71717a",
    thumbHover: "#52525b",
    track: "rgba(113, 113, 122, 0.2)",
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
  if (!color || color === "primary" || color === "default") {
    return { style: {} };
  }
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      style: {
        "--scroll-thumb": color,
        "--scroll-thumb-hover": `rgba(${rgb}, 0.8)`,
        "--scroll-track": `rgba(${rgb}, 0.1)`,
      } as React.CSSProperties,
    };
  }
  const theme = colorThemes[color];
  if (!theme) return { style: {} };
  return {
    style: {
      "--scroll-thumb": theme.thumb,
      "--scroll-thumb-hover": theme.thumbHover,
      "--scroll-track": theme.track,
    } as React.CSSProperties,
  };
};
