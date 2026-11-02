"use client";

const colorMap: Record<string, string> = {
  primary: "var(--primary)",
  lavender: "#9b8afb",
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#10b981",
  zinc: "#71717a",
  blue: "#3b82f6",
  amber: "#f59e0b",
  violet: "#8b5cf6",
  purple: "#a855f7",
  cyan: "#06b6d4",
  teal: "#14b8a6",
  orange: "#f97316",
  red: "#ef4444",
  pink: "#ec4899",
  yellow: "#eab308",
  green: "#22c55e",
};

export const getThemeColor = (color: string) => {
  return color.startsWith("#") ? color : colorMap[color] || colorMap.primary;
};
