"use client";

const colorMap: Record<string, string> = {
  primary: "var(--primary)",
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#10b981",
  zinc: "#71717a",
  blue: "#3b82f6",
  amber: "#f59e0b",
};

export const getThemeColor = (color: string) => {
  return color.startsWith("#") ? color : colorMap[color] || colorMap.primary;
};
