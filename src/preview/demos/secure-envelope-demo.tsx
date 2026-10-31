"use client";

import React from "react";
import {
  SecureEnvelope,
  type SecureEnvelopeProps,
} from "@/components/custom/blocks/SecureEnvelopeBlock";

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

export default function SecureEnvelopeDemo({
  color = "primary",
  ...props
}: SecureEnvelopeProps & { color?: string }) {
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
      className="w-full flex items-center justify-center min-h-[270px] min-[400px]:min-h-[295px] sm:min-h-[540px] px-1 sm:px-4 py-4 sm:py-8 overflow-visible"
    >
      <SecureEnvelope {...props} />
    </div>
  );
}
