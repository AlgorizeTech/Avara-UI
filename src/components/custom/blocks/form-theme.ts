"use client";

import React from "react";

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
  const isHex = color && color.startsWith("#");
  const rgb = isHex ? hexToRgb(color) : "99, 102, 241"; // Default indigo rgb

  // Map standard colors to tailwind variables if not hex
  const colorMap: Record<string, string> = {
    primary: "var(--primary)",
    indigo: "#4f46e5",
    rose: "#e11d48",
    emerald: "#10b981",
    zinc: "#18181b",
  };

  const finalColor = isHex ? color : colorMap[color] || colorMap.primary;
  // "primary" tracks the site theme (can be light or dark), so its
  // button text must track --primary-foreground instead of a fixed white.
  const finalForeground =
    !isHex && color === "primary" ? "var(--primary-foreground)" : "#ffffff";

  return {
    style: {
      "--theme-color": finalColor,
      "--theme-color-rgb": isHex ? rgb : hexToRgb(finalColor),
      "--theme-color-foreground": finalForeground,
    } as React.CSSProperties,
  };
};
