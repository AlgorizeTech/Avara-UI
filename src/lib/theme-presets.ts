/**
 * Curated preset themes for the Theme Customizer.
 *
 * Each preset defines the full set of CSS color tokens for both
 * light and dark modes using OKLCH color values.
 *
 * These match the shadcn/ui token naming convention used in globals.css.
 */

// ─── Types ───────────────────────────────────────────────────────

export type ColorToken =
  | "background"
  | "foreground"
  | "card"
  | "card-foreground"
  | "popover"
  | "popover-foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "muted"
  | "muted-foreground"
  | "accent"
  | "accent-foreground"
  | "destructive"
  | "destructive-foreground"
  | "border"
  | "input"
  | "ring";

export interface ThemePreset {
  name: string;
  label: string;
  colors: {
    light: Record<ColorToken, string>;
    dark: Record<ColorToken, string>;
  };
}

// ─── Storage ─────────────────────────────────────────────────────

/**
 * localStorage key holding the persisted ThemeCustomizerState.
 *
 * Lives here rather than in the (client-only) context so the blocking
 * pre-hydration script — a server component — can read the same key.
 */
export const THEME_CUSTOMIZER_STORAGE_KEY = "theme-customizer-state";

// ─── All Color Tokens ────────────────────────────────────────────

export const COLOR_TOKENS: ColorToken[] = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
];

/** Tokens grouped for the customizer UI */
export const TOKEN_GROUPS = [
  {
    label: "Primary Colors",
    tokens: ["primary", "primary-foreground"] as ColorToken[],
  },
  {
    label: "Surfaces",
    tokens: [
      "background",
      "foreground",
      "card",
      "card-foreground",
    ] as ColorToken[],
  },
  {
    label: "Secondary",
    tokens: [
      "secondary",
      "secondary-foreground",
      "muted",
      "muted-foreground",
    ] as ColorToken[],
  },
  {
    label: "Accent & Destructive",
    tokens: [
      "accent",
      "accent-foreground",
      "destructive",
      "destructive-foreground",
    ] as ColorToken[],
  },
  {
    label: "Borders & Inputs",
    tokens: ["border", "input", "ring"] as ColorToken[],
  },
];

// ─── Preset Definitions ─────────────────────────────────────────

/**
 * Neutral — the project's current default (matches globals.css).
 * All achromatic OKLCH values (chroma = 0).
 */
const neutral: ThemePreset = {
  name: "neutral",
  label: "Neutral",
  colors: {
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.145 0 0)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.145 0 0)",
      primary: "oklch(0.205 0 0)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.97 0 0)",
      "secondary-foreground": "oklch(0.205 0 0)",
      muted: "oklch(0.97 0 0)",
      "muted-foreground": "oklch(0.556 0 0)",
      accent: "oklch(0.97 0 0)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
      ring: "oklch(0.708 0 0)",
    },
    dark: {
      background: "oklch(0.145 0 0)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.205 0 0)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.205 0 0)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.922 0 0)",
      "primary-foreground": "oklch(0.205 0 0)",
      secondary: "oklch(0.269 0 0)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)",
      "muted-foreground": "oklch(0.708 0 0)",
      accent: "oklch(0.269 0 0)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.269 0 0)",
      input: "oklch(0.269 0 0)",
      ring: "oklch(0.556 0 0)",
    },
  },
};

const zinc: ThemePreset = {
  name: "zinc",
  label: "Zinc",
  colors: {
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.141 0.005 285.823)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.141 0.005 285.823)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.141 0.005 285.823)",
      primary: "oklch(0.141 0.005 285.823)",
      "primary-foreground": "oklch(0.985 0.001 106.423)",
      secondary: "oklch(0.967 0.001 286.375)",
      "secondary-foreground": "oklch(0.141 0.005 285.823)",
      muted: "oklch(0.967 0.001 286.375)",
      "muted-foreground": "oklch(0.552 0.016 285.938)",
      accent: "oklch(0.967 0.001 286.375)",
      "accent-foreground": "oklch(0.141 0.005 285.823)",
      destructive: "oklch(0.577 0.245 27.325)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.92 0.004 286.32)",
      input: "oklch(0.92 0.004 286.32)",
      ring: "oklch(0.552 0.016 285.938)",
    },
    dark: {
      background: "oklch(0.141 0.005 285.823)",
      foreground: "oklch(0.985 0.001 106.423)",
      card: "oklch(0.141 0.005 285.823)",
      "card-foreground": "oklch(0.985 0.001 106.423)",
      popover: "oklch(0.141 0.005 285.823)",
      "popover-foreground": "oklch(0.985 0.001 106.423)",
      primary: "oklch(0.985 0.001 106.423)",
      "primary-foreground": "oklch(0.141 0.005 285.823)",
      secondary: "oklch(0.274 0.006 286.033)",
      "secondary-foreground": "oklch(0.985 0.001 106.423)",
      muted: "oklch(0.274 0.006 286.033)",
      "muted-foreground": "oklch(0.705 0.015 286.067)",
      accent: "oklch(0.274 0.006 286.033)",
      "accent-foreground": "oklch(0.985 0.001 106.423)",
      destructive: "oklch(0.704 0.191 22.216)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.274 0.006 286.033)",
      input: "oklch(0.274 0.006 286.033)",
      ring: "oklch(0.552 0.016 285.938)",
    },
  },
};

const slate: ThemePreset = {
  name: "slate",
  label: "Slate",
  colors: {
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.129 0.042 264.695)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.129 0.042 264.695)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.129 0.042 264.695)",
      primary: "oklch(0.208 0.042 265.755)",
      "primary-foreground": "oklch(0.984 0.003 247.858)",
      secondary: "oklch(0.968 0.007 247.896)",
      "secondary-foreground": "oklch(0.208 0.042 265.755)",
      muted: "oklch(0.968 0.007 247.896)",
      "muted-foreground": "oklch(0.554 0.046 257.417)",
      accent: "oklch(0.968 0.007 247.896)",
      "accent-foreground": "oklch(0.208 0.042 265.755)",
      destructive: "oklch(0.577 0.245 27.325)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.929 0.013 255.508)",
      input: "oklch(0.929 0.013 255.508)",
      ring: "oklch(0.554 0.046 257.417)",
    },
    dark: {
      background: "oklch(0.129 0.042 264.695)",
      foreground: "oklch(0.984 0.003 247.858)",
      card: "oklch(0.168 0.04 264.694)",
      "card-foreground": "oklch(0.984 0.003 247.858)",
      popover: "oklch(0.168 0.04 264.694)",
      "popover-foreground": "oklch(0.984 0.003 247.858)",
      primary: "oklch(0.984 0.003 247.858)",
      "primary-foreground": "oklch(0.208 0.042 265.755)",
      secondary: "oklch(0.279 0.041 260.031)",
      "secondary-foreground": "oklch(0.984 0.003 247.858)",
      muted: "oklch(0.279 0.041 260.031)",
      "muted-foreground": "oklch(0.707 0.022 261.325)",
      accent: "oklch(0.279 0.041 260.031)",
      "accent-foreground": "oklch(0.984 0.003 247.858)",
      destructive: "oklch(0.704 0.191 22.216)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.279 0.041 260.031)",
      input: "oklch(0.279 0.041 260.031)",
      ring: "oklch(0.554 0.046 257.417)",
    },
  },
};

const rose: ThemePreset = {
  name: "rose",
  label: "Rose",
  colors: {
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.145 0 0)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.145 0 0)",
      primary: "oklch(0.586 0.225 17.18)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.97 0 0)",
      "secondary-foreground": "oklch(0.205 0 0)",
      muted: "oklch(0.97 0 0)",
      "muted-foreground": "oklch(0.556 0 0)",
      accent: "oklch(0.97 0 0)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
      ring: "oklch(0.586 0.225 17.18)",
    },
    dark: {
      background: "oklch(0.145 0 0)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.205 0 0)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.205 0 0)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.586 0.225 17.18)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.269 0 0)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)",
      "muted-foreground": "oklch(0.708 0 0)",
      accent: "oklch(0.269 0 0)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.269 0 0)",
      input: "oklch(0.269 0 0)",
      ring: "oklch(0.586 0.225 17.18)",
    },
  },
};

const blue: ThemePreset = {
  name: "blue",
  label: "Blue",
  colors: {
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.145 0 0)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.145 0 0)",
      primary: "oklch(0.546 0.245 262.881)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.97 0 0)",
      "secondary-foreground": "oklch(0.205 0 0)",
      muted: "oklch(0.97 0 0)",
      "muted-foreground": "oklch(0.556 0 0)",
      accent: "oklch(0.97 0 0)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
      ring: "oklch(0.546 0.245 262.881)",
    },
    dark: {
      background: "oklch(0.145 0 0)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.205 0 0)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.205 0 0)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.623 0.214 259.815)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.269 0 0)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)",
      "muted-foreground": "oklch(0.708 0 0)",
      accent: "oklch(0.269 0 0)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.269 0 0)",
      input: "oklch(0.269 0 0)",
      ring: "oklch(0.623 0.214 259.815)",
    },
  },
};

const green: ThemePreset = {
  name: "green",
  label: "Green",
  colors: {
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.145 0 0)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.145 0 0)",
      primary: "oklch(0.595 0.174 142.495)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.97 0 0)",
      "secondary-foreground": "oklch(0.205 0 0)",
      muted: "oklch(0.97 0 0)",
      "muted-foreground": "oklch(0.556 0 0)",
      accent: "oklch(0.97 0 0)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
      ring: "oklch(0.595 0.174 142.495)",
    },
    dark: {
      background: "oklch(0.145 0 0)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.205 0 0)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.205 0 0)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.648 0.2 150.069)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.269 0 0)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)",
      "muted-foreground": "oklch(0.708 0 0)",
      accent: "oklch(0.269 0 0)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.269 0 0)",
      input: "oklch(0.269 0 0)",
      ring: "oklch(0.648 0.2 150.069)",
    },
  },
};

const violet: ThemePreset = {
  name: "violet",
  label: "Violet",
  colors: {
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.145 0 0)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.145 0 0)",
      primary: "oklch(0.541 0.281 293.009)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.97 0 0)",
      "secondary-foreground": "oklch(0.205 0 0)",
      muted: "oklch(0.97 0 0)",
      "muted-foreground": "oklch(0.556 0 0)",
      accent: "oklch(0.97 0 0)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
      ring: "oklch(0.541 0.281 293.009)",
    },
    dark: {
      background: "oklch(0.145 0 0)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.205 0 0)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.205 0 0)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.627 0.265 303.9)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.269 0 0)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)",
      "muted-foreground": "oklch(0.708 0 0)",
      accent: "oklch(0.269 0 0)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.269 0 0)",
      input: "oklch(0.269 0 0)",
      ring: "oklch(0.627 0.265 303.9)",
    },
  },
};

const orange: ThemePreset = {
  name: "orange",
  label: "Orange",
  colors: {
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.145 0 0)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.145 0 0)",
      primary: "oklch(0.705 0.191 47.604)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.97 0 0)",
      "secondary-foreground": "oklch(0.205 0 0)",
      muted: "oklch(0.97 0 0)",
      "muted-foreground": "oklch(0.556 0 0)",
      accent: "oklch(0.97 0 0)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
      ring: "oklch(0.705 0.191 47.604)",
    },
    dark: {
      background: "oklch(0.145 0 0)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.205 0 0)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.205 0 0)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.705 0.191 47.604)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.269 0 0)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)",
      "muted-foreground": "oklch(0.708 0 0)",
      accent: "oklch(0.269 0 0)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.269 0 0)",
      input: "oklch(0.269 0 0)",
      ring: "oklch(0.705 0.191 47.604)",
    },
  },
};

const sunset: ThemePreset = {
  name: "sunset",
  label: "Sunset",
  colors: {
    light: {
      background: "oklch(0.988 0.006 75.164)",
      foreground: "oklch(0.175 0.03 325.018)",
      card: "oklch(0.995 0.003 75.164)",
      "card-foreground": "oklch(0.175 0.03 325.018)",
      popover: "oklch(0.995 0.003 75.164)",
      "popover-foreground": "oklch(0.175 0.03 325.018)",
      primary: "oklch(0.645 0.246 16.439)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.96 0.015 75.164)",
      "secondary-foreground": "oklch(0.275 0.03 325.018)",
      muted: "oklch(0.953 0.018 75.164)",
      "muted-foreground": "oklch(0.525 0.032 35.0)",
      accent: "oklch(0.769 0.188 70.08)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.915 0.018 75.164)",
      input: "oklch(0.915 0.018 75.164)",
      ring: "oklch(0.645 0.246 16.439)",
    },
    dark: {
      background: "oklch(0.155 0.025 325.018)",
      foreground: "oklch(0.975 0.008 75.164)",
      card: "oklch(0.195 0.028 325.018)",
      "card-foreground": "oklch(0.975 0.008 75.164)",
      popover: "oklch(0.195 0.028 325.018)",
      "popover-foreground": "oklch(0.975 0.008 75.164)",
      primary: "oklch(0.705 0.213 22.0)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.265 0.032 325.018)",
      "secondary-foreground": "oklch(0.975 0.008 75.164)",
      muted: "oklch(0.265 0.032 325.018)",
      "muted-foreground": "oklch(0.685 0.035 45.0)",
      accent: "oklch(0.769 0.188 70.08)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.275 0.028 325.018)",
      input: "oklch(0.275 0.028 325.018)",
      ring: "oklch(0.705 0.213 22.0)",
    },
  },
};

const ocean: ThemePreset = {
  name: "ocean",
  label: "Ocean",
  colors: {
    light: {
      background: "oklch(0.988 0.007 230.0)",
      foreground: "oklch(0.155 0.038 240.0)",
      card: "oklch(0.995 0.004 230.0)",
      "card-foreground": "oklch(0.155 0.038 240.0)",
      popover: "oklch(0.995 0.004 230.0)",
      "popover-foreground": "oklch(0.155 0.038 240.0)",
      primary: "oklch(0.533 0.172 243.837)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.955 0.015 230.0)",
      "secondary-foreground": "oklch(0.225 0.038 240.0)",
      muted: "oklch(0.955 0.015 230.0)",
      "muted-foreground": "oklch(0.535 0.04 230.0)",
      accent: "oklch(0.6 0.118 184.704)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.912 0.018 230.0)",
      input: "oklch(0.912 0.018 230.0)",
      ring: "oklch(0.533 0.172 243.837)",
    },
    dark: {
      background: "oklch(0.15 0.032 240.0)",
      foreground: "oklch(0.975 0.008 230.0)",
      card: "oklch(0.19 0.035 240.0)",
      "card-foreground": "oklch(0.975 0.008 230.0)",
      popover: "oklch(0.19 0.035 240.0)",
      "popover-foreground": "oklch(0.975 0.008 230.0)",
      primary: "oklch(0.61 0.185 250.0)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.265 0.035 240.0)",
      "secondary-foreground": "oklch(0.975 0.008 230.0)",
      muted: "oklch(0.265 0.035 240.0)",
      "muted-foreground": "oklch(0.685 0.035 230.0)",
      accent: "oklch(0.6 0.118 184.704)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.275 0.032 240.0)",
      input: "oklch(0.275 0.032 240.0)",
      ring: "oklch(0.61 0.185 250.0)",
    },
  },
};

const forest: ThemePreset = {
  name: "forest",
  label: "Forest",
  colors: {
    light: {
      background: "oklch(0.988 0.008 145.0)",
      foreground: "oklch(0.16 0.035 155.0)",
      card: "oklch(0.995 0.004 145.0)",
      "card-foreground": "oklch(0.16 0.035 155.0)",
      popover: "oklch(0.995 0.004 145.0)",
      "popover-foreground": "oklch(0.16 0.035 155.0)",
      primary: "oklch(0.508 0.155 155.714)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.955 0.018 145.0)",
      "secondary-foreground": "oklch(0.225 0.035 155.0)",
      muted: "oklch(0.955 0.018 145.0)",
      "muted-foreground": "oklch(0.535 0.038 155.0)",
      accent: "oklch(0.735 0.15 130.0)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.912 0.018 145.0)",
      input: "oklch(0.912 0.018 145.0)",
      ring: "oklch(0.508 0.155 155.714)",
    },
    dark: {
      background: "oklch(0.15 0.028 155.0)",
      foreground: "oklch(0.975 0.008 145.0)",
      card: "oklch(0.19 0.032 155.0)",
      "card-foreground": "oklch(0.975 0.008 145.0)",
      popover: "oklch(0.19 0.032 155.0)",
      "popover-foreground": "oklch(0.975 0.008 145.0)",
      primary: "oklch(0.595 0.166 152.0)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.265 0.032 155.0)",
      "secondary-foreground": "oklch(0.975 0.008 145.0)",
      muted: "oklch(0.265 0.032 155.0)",
      "muted-foreground": "oklch(0.685 0.032 145.0)",
      accent: "oklch(0.735 0.15 130.0)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.275 0.028 155.0)",
      input: "oklch(0.275 0.028 155.0)",
      ring: "oklch(0.595 0.166 152.0)",
    },
  },
};

const stone: ThemePreset = {
  name: "stone",
  label: "Stone",
  colors: {
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.147 0.004 49.25)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.147 0.004 49.25)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.147 0.004 49.25)",
      primary: "oklch(0.216 0.006 56.043)",
      "primary-foreground": "oklch(0.985 0.001 106.423)",
      secondary: "oklch(0.97 0.001 106.424)",
      "secondary-foreground": "oklch(0.216 0.006 56.043)",
      muted: "oklch(0.97 0.001 106.424)",
      "muted-foreground": "oklch(0.553 0.013 58.071)",
      accent: "oklch(0.97 0.001 106.424)",
      "accent-foreground": "oklch(0.216 0.006 56.043)",
      destructive: "oklch(0.577 0.245 27.325)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.923 0.003 48.717)",
      input: "oklch(0.923 0.003 48.717)",
      ring: "oklch(0.553 0.013 58.071)",
    },
    dark: {
      background: "oklch(0.147 0.004 49.25)",
      foreground: "oklch(0.985 0.001 106.423)",
      card: "oklch(0.147 0.004 49.25)",
      "card-foreground": "oklch(0.985 0.001 106.423)",
      popover: "oklch(0.147 0.004 49.25)",
      "popover-foreground": "oklch(0.985 0.001 106.423)",
      primary: "oklch(0.985 0.001 106.423)",
      "primary-foreground": "oklch(0.216 0.006 56.043)",
      secondary: "oklch(0.268 0.007 34.298)",
      "secondary-foreground": "oklch(0.985 0.001 106.423)",
      muted: "oklch(0.268 0.007 34.298)",
      "muted-foreground": "oklch(0.709 0.01 56.259)",
      accent: "oklch(0.268 0.007 34.298)",
      "accent-foreground": "oklch(0.985 0.001 106.423)",
      destructive: "oklch(0.704 0.191 22.216)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.268 0.007 34.298)",
      input: "oklch(0.268 0.007 34.298)",
      ring: "oklch(0.553 0.013 58.071)",
    },
  },
};

// ─── Export All Presets ───────────────────────────────────────────

export const THEME_PRESETS: ThemePreset[] = [
  neutral,
  zinc,
  slate,
  stone,
  rose,
  blue,
  green,
  violet,
  orange,
  sunset,
  ocean,
  forest,
];

/** The default preset name */
export const DEFAULT_PRESET = "neutral";
