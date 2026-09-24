/**
 * Curated preset themes for the Theme Customizer.
 *
 * Each preset defines the full set of CSS color tokens for both
 * light and dark modes using OKLCH color values.
 *
 * These match the shadcn/ui token naming convention used in globals.css.
 */

// ─── Types ───────────────────────────────────────────────────────

/** The tokens every preset spells out by hand. */
export type CoreColorToken =
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

/**
 * Tokens a preset may leave out. `resolvePresetColors` fills them in — sidebar
 * from the core tokens, charts from the default palette — so every preset
 * still exports the complete shadcn variable set without hand-authoring
 * thirteen extra values per mode.
 */
export type ExtendedColorToken =
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5"
  | "sidebar"
  | "sidebar-foreground"
  | "sidebar-primary"
  | "sidebar-primary-foreground"
  | "sidebar-accent"
  | "sidebar-accent-foreground"
  | "sidebar-border"
  | "sidebar-ring";

export type ColorToken = CoreColorToken | ExtendedColorToken;

export type PresetColors = Record<CoreColorToken, string> &
  Partial<Record<ExtendedColorToken, string>>;

export interface ThemePreset {
  name: string;
  label: string;
  colors: {
    light: PresetColors;
    dark: PresetColors;
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

/**
 * localStorage key holding the reader's Google font override, if any. Absent
 * means the site default body font (DM Sans). Lives here rather than in the
 * fonts hook so the server-rendered ThemeInitScript can import it.
 */
export const FONT_FAMILY_STORAGE_KEY = "fontFamily";

// ─── All Color Tokens ────────────────────────────────────────────

export const CORE_COLOR_TOKENS: CoreColorToken[] = [
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

export const CHART_TOKENS: ExtendedColorToken[] = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
];

export const SIDEBAR_TOKENS: ExtendedColorToken[] = [
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
];

/** Every token the customizer edits, injects and exports — in export order. */
export const COLOR_TOKENS: ColorToken[] = [
  ...CORE_COLOR_TOKENS,
  ...CHART_TOKENS,
  ...SIDEBAR_TOKENS,
];

// ─── Derived Tokens ──────────────────────────────────────────────

/**
 * Chart palette from globals.css. Hue-separated on purpose: the neutral
 * presets have no chroma to derive a categorical ramp from.
 */
const DEFAULT_CHART_COLORS: Record<"light" | "dark", Record<string, string>> = {
  light: {
    "chart-1": "oklch(0.646 0.222 41.116)",
    "chart-2": "oklch(0.6 0.118 184.704)",
    "chart-3": "oklch(0.398 0.07 227.392)",
    "chart-4": "oklch(0.828 0.189 84.429)",
    "chart-5": "oklch(0.769 0.188 70.08)",
  },
  dark: {
    "chart-1": "oklch(0.488 0.243 264.376)",
    "chart-2": "oklch(0.696 0.17 162.48)",
    "chart-3": "oklch(0.769 0.188 70.08)",
    "chart-4": "oklch(0.627 0.265 303.9)",
    "chart-5": "oklch(0.645 0.246 16.439)",
  },
};

/**
 * Expands a preset's colors for one mode into the full token set.
 *
 * Sidebar tokens mirror the surface they sit on, the way shadcn's own themes
 * do: the panel is the card surface, its accent is the page accent, and so on.
 * A preset that wants something different sets the token explicitly and wins.
 */
export function resolvePresetColors(
  colors: PresetColors,
  mode: "light" | "dark"
): Record<ColorToken, string> {
  const derived: Record<ExtendedColorToken, string> = {
    ...(DEFAULT_CHART_COLORS[mode] as Record<
      "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5",
      string
    >),
    sidebar: colors.card,
    "sidebar-foreground": colors["card-foreground"],
    "sidebar-primary": colors.primary,
    "sidebar-primary-foreground": colors["primary-foreground"],
    "sidebar-accent": colors.accent,
    "sidebar-accent-foreground": colors["accent-foreground"],
    "sidebar-border": colors.border,
    "sidebar-ring": colors.ring,
  };

  const full = { ...derived } as Record<ColorToken, string>;
  for (const token of CORE_COLOR_TOKENS) full[token] = colors[token];
  for (const token of [...CHART_TOKENS, ...SIDEBAR_TOKENS]) {
    const explicit = colors[token];
    if (explicit) full[token] = explicit;
  }
  return full;
}

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
  {
    label: "Charts",
    tokens: CHART_TOKENS as ColorToken[],
  },
  {
    label: "Sidebar",
    tokens: SIDEBAR_TOKENS as ColorToken[],
  },
];

// ─── Preset Definitions ─────────────────────────────────────────

/**
 * Lavender — the project's default (matches globals.css).
 *
 * Reicon's palette: a warm off-white (#f5f5f0) / near-black (#09090b) page,
 * #111 / #fff ink, and #9B8AFB as the one accent in both modes. Reicon draws
 * muted text, hairlines and tinted surfaces as translucent ink; these are the
 * same values flattened onto the page colour, since the customizer's picker
 * only round-trips opaque colours.
 */
const lavender: ThemePreset = {
  name: "lavender",
  label: "Lavender",
  colors: {
    light: {
      background: "oklch(0.969 0.007 106.522)", // #f5f5f0
      foreground: "oklch(0.178 0 0)", // #111111
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.178 0 0)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.178 0 0)",
      primary: "oklch(0.698 0.162 288.379)", // #9b8afb
      "primary-foreground": "oklch(1 0 0)",
      secondary: "oklch(0.939 0.007 106.527)", // ink 4% on the page
      "secondary-foreground": "oklch(0.178 0 0)",
      muted: "oklch(0.939 0.007 106.527)",
      "muted-foreground": "oklch(0.572 0.005 106.542)", // ink 55%
      accent: "oklch(0.939 0.007 106.527)",
      "accent-foreground": "oklch(0.178 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.909 0.005 106.506)", // ink 8%
      input: "oklch(0.909 0.005 106.506)",
      ring: "oklch(0.698 0.162 288.379)",
    },
    dark: {
      background: "oklch(0.141 0.004 285.823)", // #09090b
      foreground: "oklch(1 0 0)",
      card: "oklch(0.183 0.004 285.994)", // #121214
      "card-foreground": "oklch(1 0 0)",
      popover: "oklch(0.183 0.004 285.994)",
      "popover-foreground": "oklch(1 0 0)",
      primary: "oklch(0.698 0.162 288.379)", // #9b8afb
      "primary-foreground": "oklch(1 0 0)",
      secondary: "oklch(0.232 0.004 286.099)", // ink 8% on the page
      "secondary-foreground": "oklch(1 0 0)",
      muted: "oklch(0.232 0.004 286.099)",
      "muted-foreground": "oklch(0.654 0.001 286.359)", // ink 55%
      accent: "oklch(0.232 0.004 286.099)",
      "accent-foreground": "oklch(1 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      "destructive-foreground": "oklch(0.985 0 0)",
      border: "oklch(0.232 0.004 286.099)", // ink 8%
      input: "oklch(0.253 0.004 286.13)", // ink 10%
      ring: "oklch(0.698 0.162 288.379)",
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
      background: "oklch(0.985 0.003 17.911)",
      foreground: "oklch(0.2084 0.008 17.911)",
      card: "oklch(0.965 0.005 17.911)",
      "card-foreground": "oklch(0.2084 0.008 17.911)",
      popover: "oklch(0.965 0.005 17.911)",
      "popover-foreground": "oklch(0.2084 0.008 17.911)",
      primary: "oklch(0.68628 0.185 148.958)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.69776 0.135 168.327)",
      "secondary-foreground": "oklch(0.13955 0.027 168.327)",
      muted: "oklch(0.94 0.008 171.364)",
      "muted-foreground": "oklch(0.5 0.012 171.364)",
      accent: "oklch(0.70628 0.119 185.713)",
      "accent-foreground": "oklch(0.14125 0.023 185.713)",
      destructive: "oklch(0.7176 0.221 22.18)",
      "destructive-foreground": "oklch(0 0 0)",
      border: "oklch(0.905 0.006 17.911)",
      input: "oklch(0.905 0.006 17.911)",
      ring: "oklch(0.68628 0.185 148.958)",
      "chart-1": "oklch(0.68628 0.185 148.958)",
      "chart-2": "oklch(0.69776 0.135 168.327)",
      "chart-3": "oklch(0.70628 0.119 185.713)",
      "chart-4": "oklch(0.7206 0.191 231.6)",
      "chart-5": "oklch(0.8471 0.199 83.87)",
    },
    dark: {
      background: "oklch(0.2084 0.008 17.911)",
      foreground: "oklch(0.83768 0.001 17.911)",
      card: "oklch(0.18522 0.007 17.911)",
      "card-foreground": "oklch(0.83768 0.001 17.911)",
      popover: "oklch(0.18522 0.007 17.911)",
      "popover-foreground": "oklch(0.83768 0.001 17.911)",
      primary: "oklch(0.68628 0.185 148.958)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.69776 0.135 168.327)",
      "secondary-foreground": "oklch(0.13955 0.027 168.327)",
      muted: "oklch(0.30698 0.039 171.364)",
      "muted-foreground": "oklch(0.65 0.01 171.364)",
      accent: "oklch(0.70628 0.119 185.713)",
      "accent-foreground": "oklch(0.14125 0.023 185.713)",
      destructive: "oklch(0.7176 0.221 22.18)",
      "destructive-foreground": "oklch(0 0 0)",
      border: "oklch(0.16203 0.007 17.911)",
      input: "oklch(0.16203 0.007 17.911)",
      ring: "oklch(0.68628 0.185 148.958)",
      "chart-1": "oklch(0.68628 0.185 148.958)",
      "chart-2": "oklch(0.69776 0.135 168.327)",
      "chart-3": "oklch(0.70628 0.119 185.713)",
      "chart-4": "oklch(0.7206 0.191 231.6)",
      "chart-5": "oklch(0.8471 0.199 83.87)",
    },
  },
};

// ─── daisyUI Presets ─────────────────────────────────────────────

/**
 * Ported from daisyUI 5 (`daisyui/theme/<name>.css`) the same way Forest was.
 *
 * In the theme's own mode (daisyUI themes are single-mode) the tokens map 1:1:
 * base-100 → background, base-200 → card/popover, base-300 → border/input,
 * base-content → foreground, error → destructive, ring = primary, and the
 * charts are primary / secondary / accent / info / warning. Muted is the
 * theme's neutral in dark mode (a light-mode neutral is near-black, so light
 * uses a 0.94 surface at the neutral hue); muted-foreground is derived, since
 * daisyUI has no such token.
 *
 * primary-foreground is white wherever white reads at least as well as it
 * does on Forest's green (2.5:1), matching the site's white-on-primary look;
 * otherwise daisyUI's own primary-content is kept.
 *
 * The missing mode is synthesised the way Forest's light mode was: a light
 * mode gets 0.985 / 0.965 / 0.905 surfaces at the base hue with the daisyUI
 * background as ink; a dark mode takes the daisyUI ink as its background,
 * steps card and border down by 0.023 like daisyUI's own base ramp, and uses
 * the daisyUI background as ink. "Dark" pairs with daisyUI's own "light"
 * instead, and Luxury's light mode inverts its white primary to stay visible.
 */

const corporate: ThemePreset = {
  name: "corporate",
  label: "Corporate",
  colors: {
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.22389 0.031 278.072)",
      card: "oklch(0.93 0 0)",
      "card-foreground": "oklch(0.22389 0.031 278.072)",
      popover: "oklch(0.93 0 0)",
      "popover-foreground": "oklch(0.22389 0.031 278.072)",
      primary: "oklch(0.58 0.158 241.966)",
      "primary-foreground": "oklch(1 0 0)",
      secondary: "oklch(0.55 0.046 257.417)",
      "secondary-foreground": "oklch(1 0 0)",
      muted: "oklch(0.94 0 0)",
      "muted-foreground": "oklch(0.5 0 0)",
      accent: "oklch(0.6 0.118 184.704)",
      "accent-foreground": "oklch(1 0 0)",
      destructive: "oklch(0.7 0.191 22.216)",
      "destructive-foreground": "oklch(0 0 0)",
      border: "oklch(0.86 0 0)",
      input: "oklch(0.86 0 0)",
      ring: "oklch(0.58 0.158 241.966)",
      "chart-1": "oklch(0.58 0.158 241.966)",
      "chart-2": "oklch(0.55 0.046 257.417)",
      "chart-3": "oklch(0.6 0.118 184.704)",
      "chart-4": "oklch(0.6 0.126 221.723)",
      "chart-5": "oklch(0.85 0.199 91.936)",
    },
    dark: {
      background: "oklch(0.22389 0.031 278.072)",
      foreground: "oklch(1 0 0)",
      card: "oklch(0.20089 0.031 278.072)",
      "card-foreground": "oklch(1 0 0)",
      popover: "oklch(0.20089 0.031 278.072)",
      "popover-foreground": "oklch(1 0 0)",
      primary: "oklch(0.58 0.158 241.966)",
      "primary-foreground": "oklch(1 0 0)",
      secondary: "oklch(0.55 0.046 257.417)",
      "secondary-foreground": "oklch(1 0 0)",
      muted: "oklch(0.30389 0.031 278.072)",
      "muted-foreground": "oklch(0.65 0 0)",
      accent: "oklch(0.6 0.118 184.704)",
      "accent-foreground": "oklch(1 0 0)",
      destructive: "oklch(0.7 0.191 22.216)",
      "destructive-foreground": "oklch(0 0 0)",
      border: "oklch(0.17789 0.031 278.072)",
      input: "oklch(0.17789 0.031 278.072)",
      ring: "oklch(0.58 0.158 241.966)",
      "chart-1": "oklch(0.58 0.158 241.966)",
      "chart-2": "oklch(0.55 0.046 257.417)",
      "chart-3": "oklch(0.6 0.118 184.704)",
      "chart-4": "oklch(0.6 0.126 221.723)",
      "chart-5": "oklch(0.85 0.199 91.936)",
    },
  },
};

const nord: ThemePreset = {
  name: "nord",
  label: "Nord",
  colors: {
    light: {
      background: "oklch(0.95127 0.007 260.731)",
      foreground: "oklch(0.32437 0.022 264.182)",
      card: "oklch(0.93299 0.01 261.788)",
      "card-foreground": "oklch(0.32437 0.022 264.182)",
      popover: "oklch(0.93299 0.01 261.788)",
      "popover-foreground": "oklch(0.32437 0.022 264.182)",
      primary: "oklch(0.59435 0.077 254.027)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.69651 0.059 248.687)",
      "secondary-foreground": "oklch(0.1393 0.011 248.687)",
      muted: "oklch(0.94 0.008 264.131)",
      "muted-foreground": "oklch(0.5 0.012 264.131)",
      accent: "oklch(0.77464 0.062 217.469)",
      "accent-foreground": "oklch(0.15492 0.012 217.469)",
      destructive: "oklch(0.6061 0.12 15.341)",
      "destructive-foreground": "oklch(0.12122 0.024 15.341)",
      border: "oklch(0.89925 0.016 262.749)",
      input: "oklch(0.89925 0.016 262.749)",
      ring: "oklch(0.59435 0.077 254.027)",
      "chart-1": "oklch(0.59435 0.077 254.027)",
      "chart-2": "oklch(0.69651 0.059 248.687)",
      "chart-3": "oklch(0.77464 0.062 217.469)",
      "chart-4": "oklch(0.69207 0.062 332.664)",
      "chart-5": "oklch(0.85486 0.089 84.093)",
    },
    dark: {
      background: "oklch(0.32437 0.022 264.182)",
      foreground: "oklch(0.95127 0.007 260.731)",
      card: "oklch(0.30137 0.022 264.182)",
      "card-foreground": "oklch(0.95127 0.007 260.731)",
      popover: "oklch(0.30137 0.022 264.182)",
      "popover-foreground": "oklch(0.95127 0.007 260.731)",
      primary: "oklch(0.59435 0.077 254.027)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.69651 0.059 248.687)",
      "secondary-foreground": "oklch(0.1393 0.011 248.687)",
      muted: "oklch(0.40437 0.022 264.182)",
      "muted-foreground": "oklch(0.74437 0.01 264.131)",
      accent: "oklch(0.77464 0.062 217.469)",
      "accent-foreground": "oklch(0.15492 0.012 217.469)",
      destructive: "oklch(0.6061 0.12 15.341)",
      "destructive-foreground": "oklch(0.12122 0.024 15.341)",
      border: "oklch(0.27837 0.022 264.182)",
      input: "oklch(0.27837 0.022 264.182)",
      ring: "oklch(0.59435 0.077 254.027)",
      "chart-1": "oklch(0.59435 0.077 254.027)",
      "chart-2": "oklch(0.69651 0.059 248.687)",
      "chart-3": "oklch(0.77464 0.062 217.469)",
      "chart-4": "oklch(0.69207 0.062 332.664)",
      "chart-5": "oklch(0.85486 0.089 84.093)",
    },
  },
};

/**
 * Coffee departs from daisyUI in dark mode: its plum base (0.24 0.023 329.7)
 * with gold ink went muddy under the site's faded-ink text, so the surfaces are
 * espresso brown, the ink is a lighter latte, and cards sit above the page.
 */
const coffee: ThemePreset = {
  name: "coffee",
  label: "Coffee",
  colors: {
    light: {
      background: "oklch(0.985 0.003 55)",
      foreground: "oklch(0.17 0.004 55)",
      card: "oklch(0.965 0.005 55)",
      "card-foreground": "oklch(0.17 0.004 55)",
      popover: "oklch(0.965 0.005 55)",
      "popover-foreground": "oklch(0.17 0.004 55)",
      primary: "oklch(0.71996 0.123 62.756)",
      "primary-foreground": "oklch(0.14399 0.024 62.756)",
      secondary: "oklch(0.34465 0.029 199.194)",
      "secondary-foreground": "oklch(0.86893 0.005 199.194)",
      muted: "oklch(0.94 0.008 55)",
      "muted-foreground": "oklch(0.5 0.012 55)",
      accent: "oklch(0.42621 0.074 224.389)",
      "accent-foreground": "oklch(0.88524 0.014 224.389)",
      destructive: "oklch(0.77318 0.128 31.871)",
      "destructive-foreground": "oklch(0.15463 0.025 31.871)",
      border: "oklch(0.905 0.006 55)",
      input: "oklch(0.905 0.006 55)",
      ring: "oklch(0.71996 0.123 62.756)",
      "chart-1": "oklch(0.71996 0.123 62.756)",
      "chart-2": "oklch(0.34465 0.029 199.194)",
      "chart-3": "oklch(0.42621 0.074 224.389)",
      "chart-4": "oklch(0.7949 0.063 184.558)",
      "chart-5": "oklch(0.8815 0.14 87.722)",
    },
    dark: {
      background: "oklch(0.17 0.004 55)",
      foreground: "oklch(0.93 0.012 80)",
      card: "oklch(0.205 0.005 55)",
      "card-foreground": "oklch(0.93 0.012 80)",
      popover: "oklch(0.205 0.005 55)",
      "popover-foreground": "oklch(0.93 0.012 80)",
      primary: "oklch(0.71996 0.123 62.756)",
      "primary-foreground": "oklch(0.14399 0.024 62.756)",
      secondary: "oklch(0.34465 0.029 199.194)",
      "secondary-foreground": "oklch(0.86893 0.005 199.194)",
      muted: "oklch(0.245 0.005 55)",
      "muted-foreground": "oklch(0.71 0.01 70)",
      accent: "oklch(0.42621 0.074 224.389)",
      "accent-foreground": "oklch(0.88524 0.014 224.389)",
      destructive: "oklch(0.77318 0.128 31.871)",
      "destructive-foreground": "oklch(0.15463 0.025 31.871)",
      border: "oklch(0.275 0.006 55)",
      input: "oklch(0.275 0.006 55)",
      ring: "oklch(0.71996 0.123 62.756)",
      "chart-1": "oklch(0.71996 0.123 62.756)",
      "chart-2": "oklch(0.34465 0.029 199.194)",
      "chart-3": "oklch(0.42621 0.074 224.389)",
      "chart-4": "oklch(0.7949 0.063 184.558)",
      "chart-5": "oklch(0.8815 0.14 87.722)",
    },
  },
};

const garden: ThemePreset = {
  name: "garden",
  label: "Garden",
  colors: {
    light: {
      background: "oklch(0.92951 0.002 17.197)",
      foreground: "oklch(0.16961 0.001 17.32)",
      card: "oklch(0.86445 0.002 17.197)",
      "card-foreground": "oklch(0.16961 0.001 17.32)",
      popover: "oklch(0.86445 0.002 17.197)",
      "popover-foreground": "oklch(0.16961 0.001 17.32)",
      primary: "oklch(0.6245 0.278 3.836)",
      "primary-foreground": "oklch(1 0 0)",
      secondary: "oklch(0.48495 0.11 355.095)",
      "secondary-foreground": "oklch(0.89699 0.022 355.095)",
      muted: "oklch(0.94 0.008 89.07)",
      "muted-foreground": "oklch(0.5 0.012 89.07)",
      accent: "oklch(0.56273 0.054 154.39)",
      "accent-foreground": "oklch(1 0 0)",
      destructive: "oklch(0.7176 0.221 22.18)",
      "destructive-foreground": "oklch(0 0 0)",
      border: "oklch(0.79938 0.001 17.197)",
      input: "oklch(0.79938 0.001 17.197)",
      ring: "oklch(0.6245 0.278 3.836)",
      "chart-1": "oklch(0.6245 0.278 3.836)",
      "chart-2": "oklch(0.48495 0.11 355.095)",
      "chart-3": "oklch(0.56273 0.054 154.39)",
      "chart-4": "oklch(0.7206 0.191 231.6)",
      "chart-5": "oklch(0.8471 0.199 83.87)",
    },
    dark: {
      background: "oklch(0.16961 0.001 17.32)",
      foreground: "oklch(0.92951 0.002 17.197)",
      card: "oklch(0.14661 0.001 17.32)",
      "card-foreground": "oklch(0.92951 0.002 17.197)",
      popover: "oklch(0.14661 0.001 17.32)",
      "popover-foreground": "oklch(0.92951 0.002 17.197)",
      primary: "oklch(0.6245 0.278 3.836)",
      "primary-foreground": "oklch(1 0 0)",
      secondary: "oklch(0.48495 0.11 355.095)",
      "secondary-foreground": "oklch(0.89699 0.022 355.095)",
      muted: "oklch(0.24961 0.001 17.32)",
      "muted-foreground": "oklch(0.65 0.01 89.07)",
      accent: "oklch(0.56273 0.054 154.39)",
      "accent-foreground": "oklch(1 0 0)",
      destructive: "oklch(0.7176 0.221 22.18)",
      "destructive-foreground": "oklch(0 0 0)",
      border: "oklch(0.12361 0.001 17.32)",
      input: "oklch(0.12361 0.001 17.32)",
      ring: "oklch(0.6245 0.278 3.836)",
      "chart-1": "oklch(0.6245 0.278 3.836)",
      "chart-2": "oklch(0.48495 0.11 355.095)",
      "chart-3": "oklch(0.56273 0.054 154.39)",
      "chart-4": "oklch(0.7206 0.191 231.6)",
      "chart-5": "oklch(0.8471 0.199 83.87)",
    },
  },
};

const dracula: ThemePreset = {
  name: "dracula",
  label: "Dracula",
  colors: {
    light: {
      background: "oklch(0.985 0.003 277.508)",
      foreground: "oklch(0.28822 0.022 277.508)",
      card: "oklch(0.965 0.005 277.508)",
      "card-foreground": "oklch(0.28822 0.022 277.508)",
      popover: "oklch(0.965 0.005 277.508)",
      "popover-foreground": "oklch(0.28822 0.022 277.508)",
      primary: "oklch(0.75461 0.183 346.812)",
      "primary-foreground": "oklch(0.15092 0.036 346.812)",
      secondary: "oklch(0.74202 0.148 301.883)",
      "secondary-foreground": "oklch(0.1484 0.029 301.883)",
      muted: "oklch(0.94 0.008 275.524)",
      "muted-foreground": "oklch(0.5 0.012 275.524)",
      accent: "oklch(0.83392 0.124 66.558)",
      "accent-foreground": "oklch(0.16678 0.024 66.558)",
      destructive: "oklch(0.6822 0.206 24.43)",
      "destructive-foreground": "oklch(0.13644 0.041 24.43)",
      border: "oklch(0.905 0.006 277.508)",
      input: "oklch(0.905 0.006 277.508)",
      ring: "oklch(0.75461 0.183 346.812)",
      "chart-1": "oklch(0.75461 0.183 346.812)",
      "chart-2": "oklch(0.74202 0.148 301.883)",
      "chart-3": "oklch(0.83392 0.124 66.558)",
      "chart-4": "oklch(0.88263 0.093 212.846)",
      "chart-5": "oklch(0.95533 0.134 112.757)",
    },
    dark: {
      background: "oklch(0.28822 0.022 277.508)",
      foreground: "oklch(0.97747 0.007 106.545)",
      card: "oklch(0.26805 0.02 277.508)",
      "card-foreground": "oklch(0.97747 0.007 106.545)",
      popover: "oklch(0.26805 0.02 277.508)",
      "popover-foreground": "oklch(0.97747 0.007 106.545)",
      primary: "oklch(0.75461 0.183 346.812)",
      "primary-foreground": "oklch(0.15092 0.036 346.812)",
      secondary: "oklch(0.74202 0.148 301.883)",
      "secondary-foreground": "oklch(0.1484 0.029 301.883)",
      muted: "oklch(0.39445 0.032 275.524)",
      "muted-foreground": "oklch(0.70822 0.01 275.524)",
      accent: "oklch(0.83392 0.124 66.558)",
      "accent-foreground": "oklch(0.16678 0.024 66.558)",
      destructive: "oklch(0.6822 0.206 24.43)",
      "destructive-foreground": "oklch(0.13644 0.041 24.43)",
      border: "oklch(0.24787 0.019 277.508)",
      input: "oklch(0.24787 0.019 277.508)",
      ring: "oklch(0.75461 0.183 346.812)",
      "chart-1": "oklch(0.75461 0.183 346.812)",
      "chart-2": "oklch(0.74202 0.148 301.883)",
      "chart-3": "oklch(0.83392 0.124 66.558)",
      "chart-4": "oklch(0.88263 0.093 212.846)",
      "chart-5": "oklch(0.95533 0.134 112.757)",
    },
  },
};

const dim: ThemePreset = {
  name: "dim",
  label: "Dim",
  colors: {
    light: {
      background: "oklch(0.985 0.003 264.149)",
      foreground: "oklch(0.30857 0.023 264.149)",
      card: "oklch(0.965 0.005 264.149)",
      "card-foreground": "oklch(0.30857 0.023 264.149)",
      popover: "oklch(0.965 0.005 264.149)",
      "popover-foreground": "oklch(0.30857 0.023 264.149)",
      primary: "oklch(0.86133 0.141 139.549)",
      "primary-foreground": "oklch(0.17226 0.028 139.549)",
      secondary: "oklch(0.73375 0.165 35.353)",
      "secondary-foreground": "oklch(0.14675 0.033 35.353)",
      muted: "oklch(0.94 0.008 264.094)",
      "muted-foreground": "oklch(0.5 0.012 264.094)",
      accent: "oklch(0.74229 0.133 311.379)",
      "accent-foreground": "oklch(0.14845 0.026 311.379)",
      destructive: "oklch(0.82418 0.099 33.756)",
      "destructive-foreground": "oklch(0.16483 0.019 33.756)",
      border: "oklch(0.905 0.006 264.149)",
      input: "oklch(0.905 0.006 264.149)",
      ring: "oklch(0.86133 0.141 139.549)",
      "chart-1": "oklch(0.86133 0.141 139.549)",
      "chart-2": "oklch(0.73375 0.165 35.353)",
      "chart-3": "oklch(0.74229 0.133 311.379)",
      "chart-4": "oklch(0.86078 0.142 206.182)",
      "chart-5": "oklch(0.86163 0.142 94.818)",
    },
    dark: {
      background: "oklch(0.30857 0.023 264.149)",
      foreground: "oklch(0.82901 0.031 222.959)",
      card: "oklch(0.28036 0.019 264.182)",
      "card-foreground": "oklch(0.82901 0.031 222.959)",
      popover: "oklch(0.28036 0.019 264.182)",
      "popover-foreground": "oklch(0.82901 0.031 222.959)",
      primary: "oklch(0.86133 0.141 139.549)",
      "primary-foreground": "oklch(0.17226 0.028 139.549)",
      secondary: "oklch(0.73375 0.165 35.353)",
      "secondary-foreground": "oklch(0.14675 0.033 35.353)",
      muted: "oklch(0.24731 0.02 264.094)",
      "muted-foreground": "oklch(0.72857 0.01 264.094)",
      accent: "oklch(0.74229 0.133 311.379)",
      "accent-foreground": "oklch(0.14845 0.026 311.379)",
      destructive: "oklch(0.82418 0.099 33.756)",
      "destructive-foreground": "oklch(0.16483 0.019 33.756)",
      border: "oklch(0.26346 0.018 262.177)",
      input: "oklch(0.26346 0.018 262.177)",
      ring: "oklch(0.86133 0.141 139.549)",
      "chart-1": "oklch(0.86133 0.141 139.549)",
      "chart-2": "oklch(0.73375 0.165 35.353)",
      "chart-3": "oklch(0.74229 0.133 311.379)",
      "chart-4": "oklch(0.86078 0.142 206.182)",
      "chart-5": "oklch(0.86163 0.142 94.818)",
    },
  },
};

const luxury: ThemePreset = {
  name: "luxury",
  label: "Luxury",
  colors: {
    light: {
      background: "oklch(0.985 0.003 285.822)",
      foreground: "oklch(0.14076 0.004 285.822)",
      card: "oklch(0.965 0.004 285.822)",
      "card-foreground": "oklch(0.14076 0.004 285.822)",
      popover: "oklch(0.965 0.004 285.822)",
      "popover-foreground": "oklch(0.14076 0.004 285.822)",
      primary: "oklch(0.2 0 0)",
      "primary-foreground": "oklch(1 0 0)",
      secondary: "oklch(0.27581 0.064 261.069)",
      "secondary-foreground": "oklch(0.85516 0.012 261.069)",
      muted: "oklch(0.94 0.008 59.825)",
      "muted-foreground": "oklch(0.5 0.012 59.825)",
      accent: "oklch(0.36674 0.051 338.825)",
      "accent-foreground": "oklch(0.87334 0.01 338.825)",
      destructive: "oklch(0.71753 0.176 22.568)",
      "destructive-foreground": "oklch(0.1435 0.035 22.568)",
      border: "oklch(0.905 0.004 285.822)",
      input: "oklch(0.905 0.004 285.822)",
      ring: "oklch(0.2 0 0)",
      "chart-1": "oklch(0.2 0 0)",
      "chart-2": "oklch(0.27581 0.064 261.069)",
      "chart-3": "oklch(0.36674 0.051 338.825)",
      "chart-4": "oklch(0.79061 0.121 237.133)",
      "chart-5": "oklch(0.86127 0.136 102.891)",
    },
    dark: {
      background: "oklch(0.14076 0.004 285.822)",
      foreground: "oklch(0.75687 0.123 76.89)",
      card: "oklch(0.20219 0.004 308.229)",
      "card-foreground": "oklch(0.75687 0.123 76.89)",
      popover: "oklch(0.20219 0.004 308.229)",
      "popover-foreground": "oklch(0.75687 0.123 76.89)",
      primary: "oklch(1 0 0)",
      "primary-foreground": "oklch(0.2 0 0)",
      secondary: "oklch(0.27581 0.064 261.069)",
      "secondary-foreground": "oklch(0.85516 0.012 261.069)",
      muted: "oklch(0.2427 0.057 59.825)",
      "muted-foreground": "oklch(0.65 0.01 59.825)",
      accent: "oklch(0.36674 0.051 338.825)",
      "accent-foreground": "oklch(0.87334 0.01 338.825)",
      destructive: "oklch(0.71753 0.176 22.568)",
      "destructive-foreground": "oklch(0.1435 0.035 22.568)",
      border: "oklch(0.23219 0.004 308.229)",
      input: "oklch(0.23219 0.004 308.229)",
      ring: "oklch(1 0 0)",
      "chart-1": "oklch(1 0 0)",
      "chart-2": "oklch(0.27581 0.064 261.069)",
      "chart-3": "oklch(0.36674 0.051 338.825)",
      "chart-4": "oklch(0.79061 0.121 237.133)",
      "chart-5": "oklch(0.86127 0.136 102.891)",
    },
  },
};

const dark: ThemePreset = {
  name: "dark",
  label: "Dark",
  colors: {
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.21 0.006 285.885)",
      card: "oklch(0.98 0 0)",
      "card-foreground": "oklch(0.21 0.006 285.885)",
      popover: "oklch(0.98 0 0)",
      "popover-foreground": "oklch(0.21 0.006 285.885)",
      primary: "oklch(0.45 0.24 277.023)",
      "primary-foreground": "oklch(0.93 0.034 272.788)",
      secondary: "oklch(0.65 0.241 354.308)",
      "secondary-foreground": "oklch(0.94 0.028 342.258)",
      muted: "oklch(0.94 0.005 285.823)",
      "muted-foreground": "oklch(0.5 0.005 285.823)",
      accent: "oklch(0.77 0.152 181.912)",
      "accent-foreground": "oklch(0.38 0.063 188.416)",
      destructive: "oklch(0.71 0.194 13.428)",
      "destructive-foreground": "oklch(0.27 0.105 12.094)",
      border: "oklch(0.95 0 0)",
      input: "oklch(0.95 0 0)",
      ring: "oklch(0.45 0.24 277.023)",
      "chart-1": "oklch(0.45 0.24 277.023)",
      "chart-2": "oklch(0.65 0.241 354.308)",
      "chart-3": "oklch(0.77 0.152 181.912)",
      "chart-4": "oklch(0.74 0.16 232.661)",
      "chart-5": "oklch(0.82 0.189 84.429)",
    },
    dark: {
      background: "oklch(0.2533 0.016 252.42)",
      foreground: "oklch(0.97807 0.029 256.847)",
      card: "oklch(0.2326 0.014 253.1)",
      "card-foreground": "oklch(0.97807 0.029 256.847)",
      popover: "oklch(0.2326 0.014 253.1)",
      "popover-foreground": "oklch(0.97807 0.029 256.847)",
      primary: "oklch(0.58 0.233 277.117)",
      "primary-foreground": "oklch(0.96 0.018 272.314)",
      secondary: "oklch(0.65 0.241 354.308)",
      "secondary-foreground": "oklch(0.94 0.028 342.258)",
      muted: "oklch(0.14 0.005 285.823)",
      "muted-foreground": "oklch(0.6733 0.005 285.823)",
      accent: "oklch(0.77 0.152 181.912)",
      "accent-foreground": "oklch(0.38 0.063 188.416)",
      destructive: "oklch(0.71 0.194 13.428)",
      "destructive-foreground": "oklch(0.27 0.105 12.094)",
      border: "oklch(0.2115 0.012 254.09)",
      input: "oklch(0.2115 0.012 254.09)",
      ring: "oklch(0.58 0.233 277.117)",
      "chart-1": "oklch(0.58 0.233 277.117)",
      "chart-2": "oklch(0.65 0.241 354.308)",
      "chart-3": "oklch(0.77 0.152 181.912)",
      "chart-4": "oklch(0.74 0.16 232.661)",
      "chart-5": "oklch(0.82 0.189 84.429)",
    },
  },
};

const cupcake: ThemePreset = {
  name: "cupcake",
  label: "Cupcake",
  colors: {
    light: {
      background: "oklch(0.97788 0.004 56.375)",
      foreground: "oklch(0.23574 0.066 313.189)",
      card: "oklch(0.93982 0.007 61.449)",
      "card-foreground": "oklch(0.23574 0.066 313.189)",
      popover: "oklch(0.93982 0.007 61.449)",
      "popover-foreground": "oklch(0.23574 0.066 313.189)",
      primary: "oklch(0.85 0.138 181.071)",
      "primary-foreground": "oklch(0.43 0.078 188.216)",
      secondary: "oklch(0.89 0.061 343.231)",
      "secondary-foreground": "oklch(0.45 0.187 3.815)",
      muted: "oklch(0.94 0.006 286.033)",
      "muted-foreground": "oklch(0.5 0.006 286.033)",
      accent: "oklch(0.9 0.076 70.697)",
      "accent-foreground": "oklch(0.47 0.157 37.304)",
      destructive: "oklch(0.64 0.246 16.439)",
      "destructive-foreground": "oklch(0.27 0.105 12.094)",
      border: "oklch(0.91586 0.006 53.44)",
      input: "oklch(0.91586 0.006 53.44)",
      ring: "oklch(0.85 0.138 181.071)",
      "chart-1": "oklch(0.85 0.138 181.071)",
      "chart-2": "oklch(0.89 0.061 343.231)",
      "chart-3": "oklch(0.9 0.076 70.697)",
      "chart-4": "oklch(0.68 0.169 237.323)",
      "chart-5": "oklch(0.79 0.184 86.047)",
    },
    dark: {
      background: "oklch(0.23574 0.066 313.189)",
      foreground: "oklch(0.97788 0.004 56.375)",
      card: "oklch(0.21274 0.066 313.189)",
      "card-foreground": "oklch(0.97788 0.004 56.375)",
      popover: "oklch(0.21274 0.066 313.189)",
      "popover-foreground": "oklch(0.97788 0.004 56.375)",
      primary: "oklch(0.85 0.138 181.071)",
      "primary-foreground": "oklch(0.43 0.078 188.216)",
      secondary: "oklch(0.89 0.061 343.231)",
      "secondary-foreground": "oklch(0.45 0.187 3.815)",
      muted: "oklch(0.31574 0.066 313.189)",
      "muted-foreground": "oklch(0.65574 0.006 286.033)",
      accent: "oklch(0.9 0.076 70.697)",
      "accent-foreground": "oklch(0.47 0.157 37.304)",
      destructive: "oklch(0.64 0.246 16.439)",
      "destructive-foreground": "oklch(0.27 0.105 12.094)",
      border: "oklch(0.18974 0.066 313.189)",
      input: "oklch(0.18974 0.066 313.189)",
      ring: "oklch(0.85 0.138 181.071)",
      "chart-1": "oklch(0.85 0.138 181.071)",
      "chart-2": "oklch(0.89 0.061 343.231)",
      "chart-3": "oklch(0.9 0.076 70.697)",
      "chart-4": "oklch(0.68 0.169 237.323)",
      "chart-5": "oklch(0.79 0.184 86.047)",
    },
  },
};

const emerald: ThemePreset = {
  name: "emerald",
  label: "Emerald",
  colors: {
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.35519 0.032 262.988)",
      card: "oklch(0.93 0 0)",
      "card-foreground": "oklch(0.35519 0.032 262.988)",
      popover: "oklch(0.93 0 0)",
      "popover-foreground": "oklch(0.35519 0.032 262.988)",
      primary: "oklch(0.76662 0.135 153.45)",
      "primary-foreground": "oklch(0.33387 0.04 162.24)",
      secondary: "oklch(0.61302 0.202 261.294)",
      "secondary-foreground": "oklch(1 0 0)",
      muted: "oklch(0.94 0.008 262.988)",
      "muted-foreground": "oklch(0.5 0.012 262.988)",
      accent: "oklch(0.72772 0.149 33.2)",
      "accent-foreground": "oklch(0 0 0)",
      destructive: "oklch(0.7176 0.221 22.18)",
      "destructive-foreground": "oklch(0 0 0)",
      border: "oklch(0.86 0 0)",
      input: "oklch(0.86 0 0)",
      ring: "oklch(0.76662 0.135 153.45)",
      "chart-1": "oklch(0.76662 0.135 153.45)",
      "chart-2": "oklch(0.61302 0.202 261.294)",
      "chart-3": "oklch(0.72772 0.149 33.2)",
      "chart-4": "oklch(0.7206 0.191 231.6)",
      "chart-5": "oklch(0.8471 0.199 83.87)",
    },
    dark: {
      background: "oklch(0.35519 0.032 262.988)",
      foreground: "oklch(1 0 0)",
      card: "oklch(0.33219 0.032 262.988)",
      "card-foreground": "oklch(1 0 0)",
      popover: "oklch(0.33219 0.032 262.988)",
      "popover-foreground": "oklch(1 0 0)",
      primary: "oklch(0.76662 0.135 153.45)",
      "primary-foreground": "oklch(0.33387 0.04 162.24)",
      secondary: "oklch(0.61302 0.202 261.294)",
      "secondary-foreground": "oklch(1 0 0)",
      muted: "oklch(0.43519 0.032 262.988)",
      "muted-foreground": "oklch(0.77519 0.01 262.988)",
      accent: "oklch(0.72772 0.149 33.2)",
      "accent-foreground": "oklch(0 0 0)",
      destructive: "oklch(0.7176 0.221 22.18)",
      "destructive-foreground": "oklch(0 0 0)",
      border: "oklch(0.30919 0.032 262.988)",
      input: "oklch(0.30919 0.032 262.988)",
      ring: "oklch(0.76662 0.135 153.45)",
      "chart-1": "oklch(0.76662 0.135 153.45)",
      "chart-2": "oklch(0.61302 0.202 261.294)",
      "chart-3": "oklch(0.72772 0.149 33.2)",
      "chart-4": "oklch(0.7206 0.191 231.6)",
      "chart-5": "oklch(0.8471 0.199 83.87)",
    },
  },
};

// ─── Export All Presets ───────────────────────────────────────────

export const THEME_PRESETS: ThemePreset[] = [
  lavender,
  ocean,
  forest,
  sunset,
  corporate,
  nord,
  coffee,
  garden,
  dracula,
  dim,
  luxury,
  dark,
  cupcake,
  emerald,
];

/** The default preset name */
export const DEFAULT_PRESET = "lavender";
