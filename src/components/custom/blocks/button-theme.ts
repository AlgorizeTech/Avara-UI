// The colour-preset helper for Button. Kept out of the component file so it
// stays a components-only module (React Fast Refresh).

import type { CSSProperties } from "react";

export function getButtonThemeStyle(color?: string): CSSProperties {
  if (!color || color === "default" || color === "primary") {
    return {};
  }

  let primary = color;
  let primaryForeground = "#ffffff";
  let secondary = color;

  if (color === "lavender") {
    primary = "#9b8afb";
    secondary = "#c4b5fd";
  } else if (color === "indigo") {
    primary = "#6366f1";
    secondary = "#a855f7";
  } else if (color === "rose") {
    primary = "#f43f5e";
    secondary = "#fb7185";
  } else if (color === "emerald") {
    primary = "#10b981";
    secondary = "#34d399";
  } else if (color === "zinc") {
    primary = "#27272a";
    primaryForeground = "#fafafa";
    secondary = "#71717a";
  }

  return {
    "--primary": primary,
    "--primary-foreground": primaryForeground,
    "--ring": primary,
    "--brand": primary,
    "--brand-secondary": secondary,
  } as CSSProperties;
}
