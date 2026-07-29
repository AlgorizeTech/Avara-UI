/**
 * Color conversion utilities for the Theme Customizer.
 *
 * The project uses OKLCH color space in globals.css. These helpers
 * convert between hex (for the UI color pickers) and OKLCH (for
 * CSS variable injection).
 *
 * OKLCH = Oklab Lightness, Chroma, Hue — perceptually uniform.
 */

import tinycolor from "tinycolor2";

// ─── Types ───────────────────────────────────────────────────────

export interface OklchColor {
  L: number; // 0–1 (lightness)
  C: number; // 0–0.4 (chroma / saturation)
  H: number; // 0–360 (hue angle)
}

// ─── Linear sRGB helpers ─────────────────────────────────────────

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  return c <= 0.0031308
    ? 12.92 * c
    : 1.055 * Math.pow(c, 1.0 / 2.4) - 0.055;
}

// ─── sRGB → Oklab ────────────────────────────────────────────────

function srgbToOklab(r: number, g: number, b: number) {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  return {
    L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
  };
}

// ─── Oklab → sRGB ────────────────────────────────────────────────

function oklabToSrgb(L: number, a: number, b: number) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const r = linearToSrgb(+4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3);
  const g = linearToSrgb(-1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3);
  const bl = linearToSrgb(-0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3);

  return {
    r: Math.max(0, Math.min(1, r)),
    g: Math.max(0, Math.min(1, g)),
    b: Math.max(0, Math.min(1, bl)),
  };
}

// ─── Oklab ↔ OKLCH ───────────────────────────────────────────────

function oklabToOklch(L: number, a: number, b: number): OklchColor {
  const C = Math.sqrt(a * a + b * b);
  let H = (Math.atan2(b, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { L, C, H };
}

function oklchToOklab(L: number, C: number, H: number) {
  const hRad = (H * Math.PI) / 180;
  return {
    L,
    a: C * Math.cos(hRad),
    b: C * Math.sin(hRad),
  };
}

// ─── Public API ──────────────────────────────────────────────────

/**
 * Convert a hex color string to an OKLCH CSS value string.
 * @example hexToOklch("#6356d1") → "oklch(0.488 0.243 264.376)"
 */
export function hexToOklch(hex: string): string {
  const tc = tinycolor(hex);
  const rgb = tc.toRgb();
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const lab = srgbToOklab(r, g, b);
  const lch = oklabToOklch(lab.L, lab.a, lab.b);

  // Round to 3 decimal places for clean CSS output
  const L = Math.round(lch.L * 1000) / 1000;
  const C = Math.round(lch.C * 1000) / 1000;
  const H = Math.round(lch.H * 1000) / 1000;

  return `oklch(${L} ${C} ${H})`;
}

/**
 * Convert an OKLCH CSS string to a hex color.
 * Accepts: "oklch(0.488 0.243 264.376)" or bare "0.488 0.243 264.376"
 */
export function oklchToHex(oklchStr: string): string {
  const parsed = parseOklchString(oklchStr);
  if (!parsed) return "#000000";

  const lab = oklchToOklab(parsed.L, parsed.C, parsed.H);
  const rgb = oklabToSrgb(lab.L, lab.a, lab.b);

  const r = Math.round(rgb.r * 255);
  const g = Math.round(rgb.g * 255);
  const b = Math.round(rgb.b * 255);

  return tinycolor({ r, g, b }).toHexString();
}

/**
 * Parse an OKLCH string into its components.
 * Handles: "oklch(0.488 0.243 264.376)", "0.488 0.243 264.376",
 *          "oklch(1 0 0 / 10%)" (strips alpha)
 */
export function parseOklchString(str: string): OklchColor | null {
  // Strip "oklch(" prefix and ")" suffix
  let cleaned = str.trim();
  if (cleaned.startsWith("oklch(")) {
    cleaned = cleaned.slice(6);
  }
  if (cleaned.endsWith(")")) {
    cleaned = cleaned.slice(0, -1);
  }
  // Strip alpha (e.g., "/ 10%")
  const slashIdx = cleaned.indexOf("/");
  if (slashIdx !== -1) {
    cleaned = cleaned.slice(0, slashIdx).trim();
  }

  const parts = cleaned.trim().split(/\s+/);
  if (parts.length < 3) return null;

  const L = parseFloat(parts[0]);
  const C = parseFloat(parts[1]);
  const H = parseFloat(parts[2]);

  if (isNaN(L) || isNaN(C) || isNaN(H)) return null;

  return { L, C, H };
}

/**
 * Format an OklchColor back to a CSS value string.
 */
export function formatOklch(color: OklchColor): string {
  const L = Math.round(color.L * 1000) / 1000;
  const C = Math.round(color.C * 1000) / 1000;
  const H = Math.round(color.H * 1000) / 1000;
  return `oklch(${L} ${C} ${H})`;
}

/**
 * Generate a contrasting foreground color for a given OKLCH background.
 * Uses perceptual lightness to decide between white/dark foreground.
 */
export function generateContrastForeground(bgOklch: string): string {
  const parsed = parseOklchString(bgOklch);
  if (!parsed) return "oklch(0.985 0 0)"; // fallback to near-white

  // If background is light (L > 0.6), use dark foreground; otherwise white
  if (parsed.L > 0.6) {
    return "oklch(0.205 0 0)"; // near-black
  }
  return "oklch(0.985 0 0)"; // near-white
}

/**
 * Check if a string is a valid hex color.
 */
export function isValidHex(hex: string): boolean {
  return tinycolor(hex).isValid();
}

/**
 * Get a slightly muted version of a color (reduce chroma, adjust lightness toward middle).
 * Useful for generating secondary/muted variants from a primary.
 */
export function muteColor(oklchStr: string, factor: number = 0.3): string {
  const parsed = parseOklchString(oklchStr);
  if (!parsed) return oklchStr;

  return formatOklch({
    L: parsed.L + (0.5 - parsed.L) * factor,
    C: parsed.C * (1 - factor),
    H: parsed.H,
  });
}
