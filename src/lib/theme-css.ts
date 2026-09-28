/**
 * The customizer's theme as a standalone globals.css.
 *
 * Pure so it runs anywhere the theme has to leave the page: the CSS export
 * dialog (through the customizer context) and the Open-in-v0 endpoint
 * (api/v0.ts), which rebuilds the reader's theme server-side. Relative imports
 * only — the endpoint is bundled outside Next and has no `@/` alias.
 */

import {
  type ColorToken,
  COLOR_TOKENS,
  CHART_TOKENS,
  SIDEBAR_TOKENS,
} from "./theme-presets";

export type ExportMode = "both" | "light" | "dark";

export interface ThemeCssInput {
  colors: {
    light: Record<ColorToken, string>;
    dark: Record<ColorToken, string>;
  };
  radius: number;
}

export interface ThemeCssOptions {
  /** Stylesheets imported ahead of the tokens. Default: tailwindcss alone. */
  imports?: string[];
  /** Extra rules for the `@layer base` block, already indented two spaces. */
  baseRules?: string;
}

export function buildThemeCss(
  theme: ThemeCssInput,
  exportMode: ExportMode = "both",
  { imports = ["tailwindcss"], baseRules = "" }: ThemeCssOptions = {},
): string {
  const indent = "  ";
  const lightVars = COLOR_TOKENS.map(
    (token) => `${indent}--${token}: ${theme.colors.light[token]};`
  ).join("\n");

  const darkVars = COLOR_TOKENS.map(
    (token) => `${indent}--${token}: ${theme.colors.dark[token]};`
  ).join("\n");

  const themeBlock = `@theme inline {
  --radius-xs: min(calc(var(--radius) - 6px), var(--radius));
  --radius-sm: min(calc(var(--radius) - 4px), var(--radius));
  --radius-md: min(calc(var(--radius) - 2px), var(--radius));
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) * 1.5);
  --radius-3xl: calc(var(--radius) * 2);
  --radius: var(--radius);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
${[...CHART_TOKENS, ...SIDEBAR_TOKENS]
  .map((token) => `  --color-${token}: var(--${token});`)
  .join("\n")}
}`;

  // Site globals the components lean on, so a copied theme reproduces what
  // the docs preview showed. Only rules shared across many components belong
  // here — anything a single component needs ships inline with it.
  const baseBlock = `/* Buttons: Tailwind preflight resets them to cursor: default. */
@layer base {
${baseRules}  button {
    cursor: pointer;
  }
}`;

  // The customizer squares every corner at radius 0 (not just the ones that
  // read --radius) via an inline-style selector on <html>. That selector can
  // never match a :root variable, so emit the same effect directly.
  const radiusZeroBlock =
    theme.radius === 0
      ? `\n\n/* Radius 0: force sharp corners everywhere. Elements that must stay
   circular opt out with the .keep-rounded class. */
*:not(.keep-rounded) {
  border-radius: 0 !important;
}`
      : "";

  const head = imports.map((sheet) => `@import "${sheet}";`).join("\n");
  const tail = `${themeBlock}\n\n${baseBlock}${radiusZeroBlock}`;

  if (exportMode === "light") {
    return `${head}\n\n:root {\n${lightVars}\n${indent}--radius: ${theme.radius}rem;\n}\n\n${tail}`;
  }

  if (exportMode === "dark") {
    return `${head}\n\n:root {\n${darkVars}\n${indent}--radius: ${theme.radius}rem;\n}\n\n${tail}`;
  }

  // `dark:` utilities only follow the .dark class when the variant is
  // declared; without it Tailwind v4 falls back to prefers-color-scheme and
  // the .dark block below would never drive them.
  return `${head}\n\n@custom-variant dark (&:where(.dark, .dark *));\n\n:root {\n${lightVars}\n${indent}--radius: ${theme.radius}rem;\n}\n\n.dark {\n${darkVars}\n${indent}--radius: ${theme.radius}rem;\n}\n\n${tail}`;
}
