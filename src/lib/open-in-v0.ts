/**
 * Open in v0 — the pieces shared by the preview button and the endpoint.
 *
 * v0 opens a chat from one public shadcn registry item. Each docs example
 * becomes one item, built ahead of time by src/scripts/generate-v0-items.ts:
 * the example's usage snippet as app/page.tsx, plus every registry file it
 * pulls in, flattened so the item needs nothing else from our registry.
 *
 * What the build cannot know is the reader's theme — preset, custom colours,
 * radius, the page's accent pick, light or dark, font. The button puts that in
 * the query string, and api/v0.ts adds it to the static item as app/globals.css
 * and app/layout.tsx. Only validated values reach the output, never code.
 *
 * Relative imports only: api/v0.ts bundles this outside Next, without `@/`.
 */

import {
  type ColorToken,
  COLOR_TOKENS,
  DEFAULT_PRESET,
  THEME_PRESETS,
  resolvePresetColors,
} from "./theme-presets";
import { buildThemeCss, type ThemeCssInput } from "./theme-css";
import { accentTokens } from "./accent";

/** v0's documented entry point for opening a registry item in a new chat. */
export const V0_OPEN_URL = "https://v0.app/chat/api/open";

/** Where the endpoint is reachable when the page itself runs locally. */
export const V0_FALLBACK_ORIGIN = "https://algorize-ui.vercel.app";

/** The anchor id of a showcase example — also the file name of its v0 item. */
export const slugify = (value?: string) =>
  (value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** `<preview name>/<example id>`, e.g. `accordion/faq-section`. */
export const V0_ITEM_PATTERN = /^[a-z0-9-]+\/[a-z0-9-]+$/;

// ─── The reader's theme ─────────────────────────────────────────

export interface V0Theme {
  /** A preset name, or "custom" when the reader edited individual tokens. */
  preset: string;
  /** Only read when `preset` is "custom". */
  colors?: ThemeCssInput["colors"];
  radius: number;
  /** The page colour picker, unless it sits on "Default". */
  accent?: string;
  mode: "light" | "dark";
  /** Google font the reader picked in the customizer. */
  font?: string;
}

const DEFAULT_RADIUS = 0.625;
const DEFAULT_FONT = "DM Sans";

/** Accepts colour values (oklch, hsl, hex, names) and nothing that ends a declaration. */
const COLOR_VALUE = /^[#a-zA-Z0-9().,%\s/-]{1,64}$/;
const FONT_NAME = /^[A-Za-z0-9 ]{1,40}$/;

const toBase64Url = (text: string) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(text)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

const fromBase64Url = (text: string) => {
  const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
  return new TextDecoder().decode(Uint8Array.from(binary, (c) => c.charCodeAt(0)));
};

/** The theme as query parameters. A named preset travels as its name alone. */
export function themeToParams(theme: V0Theme): URLSearchParams {
  const params = new URLSearchParams();
  params.set("preset", theme.preset);
  if (theme.preset === "custom" && theme.colors) {
    params.set("colors", toBase64Url(JSON.stringify(theme.colors)));
  }
  params.set("radius", String(theme.radius));
  if (theme.accent) params.set("accent", theme.accent);
  params.set("mode", theme.mode);
  if (theme.font) params.set("font", theme.font);
  return params;
}

function presetColors(name: string): ThemeCssInput["colors"] {
  const preset =
    THEME_PRESETS.find((p) => p.name === name) ??
    THEME_PRESETS.find((p) => p.name === DEFAULT_PRESET) ??
    THEME_PRESETS[0];
  return {
    light: resolvePresetColors(preset.colors.light, "light"),
    dark: resolvePresetColors(preset.colors.dark, "dark"),
  };
}

/** Custom colours over the default preset, keeping only valid tokens. */
function parseCustomColors(encoded: string): ThemeCssInput["colors"] {
  const base = presetColors(DEFAULT_PRESET);
  let parsed: unknown;
  try {
    parsed = JSON.parse(fromBase64Url(encoded));
  } catch {
    return base;
  }
  if (!parsed || typeof parsed !== "object") return base;
  for (const mode of ["light", "dark"] as const) {
    const values = (parsed as Record<string, unknown>)[mode];
    if (!values || typeof values !== "object") continue;
    for (const token of COLOR_TOKENS) {
      const value = (values as Record<string, unknown>)[token];
      if (typeof value === "string" && COLOR_VALUE.test(value)) {
        base[mode][token] = value;
      }
    }
  }
  return base;
}

/** Reads the query back into a theme. Anything invalid falls back to the default. */
export function themeFromParams(params: URLSearchParams): V0Theme {
  const preset = params.get("preset") ?? DEFAULT_PRESET;
  const colorsParam = params.get("colors");
  const radius = Number(params.get("radius") ?? DEFAULT_RADIUS);
  const accent = params.get("accent") ?? undefined;
  const font = params.get("font") ?? undefined;
  return {
    preset,
    colors:
      preset === "custom" && colorsParam
        ? parseCustomColors(colorsParam)
        : presetColors(preset),
    radius: Number.isFinite(radius) && radius >= 0 && radius <= 3 ? radius : DEFAULT_RADIUS,
    accent: accent && COLOR_VALUE.test(accent) ? accent : undefined,
    mode: params.get("mode") === "dark" ? "dark" : "light",
    font: font && FONT_NAME.test(font) ? font : undefined,
  };
}

// ─── The themed files ───────────────────────────────────────────

interface RegistryFile {
  path: string;
  type: string;
  target: string;
  content: string;
}

/**
 * app/globals.css and app/layout.tsx for one theme.
 *
 * The accent repoints the same three tokens the docs preview repoints, in both
 * modes. The layout mirrors the preview stage (centred, padded) so the first
 * render in v0 matches what the reader was looking at.
 */
export function themedFiles(theme: V0Theme, title: string): RegistryFile[] {
  const colors = {
    light: { ...(theme.colors ?? presetColors(theme.preset)).light },
    dark: { ...(theme.colors ?? presetColors(theme.preset)).dark },
  };
  for (const [variable, value] of Object.entries(accentTokens(theme.accent))) {
    const token = variable.slice(2) as ColorToken;
    colors.light[token] = value;
    colors.dark[token] = value;
  }

  const font = theme.font ?? DEFAULT_FONT;
  const css = buildThemeCss({ colors, radius: theme.radius }, "both", {
    imports: ["tailwindcss", "tw-animate-css"],
    baseRules: `  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-family: "${font}", ui-sans-serif, system-ui, sans-serif;
  }
`,
  });

  const fontHref = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}:wght@400;500;600;700&display=swap`;
  const layout = `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en"${theme.mode === "dark" ? ' className="dark"' : ""}>
      <head>
        <link rel="stylesheet" href=${JSON.stringify(fontHref)} />
      </head>
      <body className="antialiased">
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center px-4 py-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
`;

  return [
    { path: "app/globals.css", type: "registry:file", target: "app/globals.css", content: css },
    { path: "app/layout.tsx", type: "registry:file", target: "app/layout.tsx", content: layout },
  ];
}

// ─── The button's link ──────────────────────────────────────────

/** The endpoint URL for one example, as served through vercel.json's rewrite. */
export function themedItemUrl(origin: string, item: string, theme: V0Theme): string {
  return `${origin}/r/v0-themed/${item}/item.json?${themeToParams(theme)}`;
}

/**
 * Longest chat title v0 accepts. Past it v0 rejects the whole open with
 * "Invalid JSON content" (422), naming the registry item rather than the
 * title — found by trial: 32 characters open, 33 fail.
 */
export const V0_TITLE_MAX = 32;

/** Fits a title into v0's limit, ending on "…" when it had to cut. */
export function clipV0Title(title: string): string {
  const chars = [...title];
  if (chars.length <= V0_TITLE_MAX) return title;
  return chars.slice(0, V0_TITLE_MAX - 1).join("").trimEnd() + "…";
}

/**
 * `title` names the new chat — otherwise v0 calls every one "Open in v0". It
 * is not in shadcn's Open-in-v0 docs; Vercel's own registry-starter passes it.
 */
export function openInV0Url(
  origin: string,
  item: string,
  theme: V0Theme,
  title?: string,
): string {
  const params = new URLSearchParams();
  if (title) params.set("title", clipV0Title(title));
  params.set("url", themedItemUrl(origin, item, theme));
  return `${V0_OPEN_URL}?${params}`;
}
