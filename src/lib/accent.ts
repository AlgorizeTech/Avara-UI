import type { CSSProperties } from "react";

/**
 * Bridging the docs colour picker into a preview.
 *
 * Most blocks are already written against the `--primary` token (`bg-primary`,
 * `ring-primary/30`, `text-primary-foreground`…). Rather than teaching each one a
 * bespoke `color` prop, a demo can repoint that token for its own subtree and
 * every one of those classes follows along.
 */

/** The swatches the picker offers, as concrete CSS colours. */
const PRESET_HEX: Record<string, string> = {
  lavender: "#9b8afb",
  indigo: "#6366f1",
  rose: "#f43f5e",
  emerald: "#10b981",
};

/** True when the picker sits on "Default" — the page theme should win. */
export function isDefaultAccent(color?: string): boolean {
  return !color || color === "primary" || color === "default";
}

/**
 * Turns a picker value into a CSS colour, or null for "Default" — meaning
 * nothing should be overridden, so the theme (and the sidebar customizer)
 * keeps control.
 */
export function resolveAccent(color?: string): string | null {
  if (isDefaultAccent(color)) return null;
  return PRESET_HEX[color as string] ?? (color as string);
}

/**
 * The picker value in a form every block accepts. Blocks know the older swatch
 * names but not "lavender" — and since that is also a CSS named colour
 * (#e6e6fa), a block that passes unknown names straight through would paint
 * the wrong shade, while others fall back to a different palette. Demos that
 * hand the picker value to such a block run it through this first. Every
 * other value is returned untouched.
 */
export function toBlockColor(color: string): string;
export function toBlockColor(color: string | undefined): string | undefined;
export function toBlockColor(color?: string): string | undefined {
  return color === "lavender" ? PRESET_HEX.lavender : color;
}

function parseHex(input: string): [number, number, number] | null {
  const hex = input.trim().replace(/^#/, "");
  if (/^[a-f\d]{3}$/i.test(hex)) {
    const [r, g, b] = hex.split("");
    return [parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16)];
  }
  if (/^[a-f\d]{6}$/i.test(hex)) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  return null;
}

/** Legible foreground for content sitting on a filled `color` swatch. */
export function accentForeground(color: string): string {
  const rgb = parseHex(color);
  if (!rgb) return "#ffffff";
  const channel = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const luminance =
    0.2126 * channel(rgb[0]) +
    0.7152 * channel(rgb[1]) +
    0.0722 * channel(rgb[2]);
  return luminance > 0.45 ? "#09090b" : "#ffffff";
}

/** The theme tokens a picked accent repoints, as `--name` → value. */
export function accentTokens(color?: string): Record<string, string> {
  const resolved = resolveAccent(color);
  if (!resolved) return {};
  return {
    "--primary": resolved,
    "--primary-foreground": accentForeground(resolved),
    "--ring": resolved,
  };
}

/**
 * Inline style repointing `--primary` at the picked accent for one subtree.
 * `--primary-foreground` is derived alongside it, otherwise a light pick leaves
 * `text-primary-foreground` content unreadable on its own fill. Returns `{}` on
 * "Default" so the page theme still wins.
 */
export function accentStyle(color?: string): CSSProperties {
  return accentTokens(color) as CSSProperties;
}
