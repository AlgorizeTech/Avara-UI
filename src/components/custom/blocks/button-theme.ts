// The colour-preset helper for Button. Kept out of the component file so it
// stays a components-only module (React Fast Refresh).

import type { CSSProperties } from "react";

export function getButtonThemeStyle(color?: string): CSSProperties {
  if (!color || color === "default" || color === "primary") {
    return {};
  }

  let primary = color;
  let primaryForeground = "#ffffff";

  if (color === "indigo") {
    primary = "#6366f1";
  } else if (color === "rose") {
    primary = "#f43f5e";
  } else if (color === "emerald") {
    primary = "#10b981";
  } else if (color === "zinc") {
    primary = "#27272a";
    primaryForeground = "#fafafa";
  }

  return {
    "--primary": primary,
    "--primary-foreground": primaryForeground,
    "--ring": primary,
  } as CSSProperties;
}
