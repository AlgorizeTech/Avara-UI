"use client";

import React from "react";
import {
  ConfidentialFolder,
  type ConfidentialFolderProps,
} from "@/components/custom/blocks/ConfidentialFolderBlock";

const colorMap: Record<string, string> = {
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#10b981",
  lavender: "#9b8afb",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

const getThemeColor = (c?: string) => {
  if (!c || c === "primary" || c === "default") return "var(--primary)";
  if (c.startsWith("#")) return c;
  return colorMap[c] || c;
};

export default function ConfidentialFolderDemo({
  color = "primary",
  ...props
}: ConfidentialFolderProps & { color?: string }) {
  const themeColor = getThemeColor(color);
  const containerStyle =
    color && color !== "primary" && color !== "default"
      ? ({
          "--primary": themeColor,
          "--primary-foreground": "#ffffff",
        } as React.CSSProperties)
      : undefined;

  return (
    <div
      style={containerStyle}
      className="w-full flex items-center justify-center min-h-[440px] sm:min-h-[540px] p-2 sm:p-4 py-6 sm:py-8 overflow-x-clip sm:overflow-visible"
    >
      <ConfidentialFolder {...props} />
    </div>
  );
}
