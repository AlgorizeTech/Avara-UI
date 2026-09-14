"use client";

// Every theme carries its own foreground tokens so a variant never has to
// hardcode `text-white` on top of `bg`. That matters for `primary` and `zinc`,
// whose `bg` flips to near-white in dark mode, and for light custom hex colors
// such as #ffffff — white-on-white text was unreadable in those cases.
//
//   text     – the accent used on the card surface (totals, links, icons)
//   bg       – solid accent fill with its own readable text color
//   fg       – text placed on top of `bg`
//   fgMuted  – secondary text on top of `bg`
//   fgSoft   – translucent overlay (inputs) on top of `bg`
//   fgBorder – translucent divider on top of `bg`
//   inverse  – a chip/box placed on top of `bg` (foreground fill, accent text)
const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    text: "text-primary",
    bg: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20",
    fg: "text-primary-foreground",
    fgMuted: "text-primary-foreground/80",
    fgSoft: "bg-primary-foreground/15 border-primary-foreground/30",
    fgBorder: "border-primary-foreground/25",
    inverse: "bg-primary-foreground text-primary",
    lightBg: "bg-primary/10 text-primary",
    border: "border-primary/30",
    focusRing: "focus:ring-primary/20 focus:border-primary",
  },
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20",
    fg: "text-white",
    fgMuted: "text-white/80",
    fgSoft: "bg-white/15 border-white/30",
    fgBorder: "border-white/25",
    inverse: "bg-white text-indigo-600",
    lightBg:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-200 dark:border-indigo-500/30",
    focusRing: "focus:ring-indigo-500/20 focus:border-indigo-500",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20",
    fg: "text-white",
    fgMuted: "text-white/80",
    fgSoft: "bg-white/15 border-white/30",
    fgBorder: "border-white/25",
    inverse: "bg-white text-rose-600",
    lightBg: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-500/30",
    focusRing: "focus:ring-rose-500/20 focus:border-rose-500",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20",
    fg: "text-white",
    fgMuted: "text-white/80",
    fgSoft: "bg-white/15 border-white/30",
    fgBorder: "border-white/25",
    inverse: "bg-white text-emerald-600",
    lightBg:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-500/30",
    focusRing: "focus:ring-emerald-500/20 focus:border-emerald-500",
  },
  zinc: {
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 shadow-zinc-900/10",
    fg: "text-white dark:text-zinc-900",
    fgMuted: "text-white/80 dark:text-zinc-900/80",
    fgSoft: "bg-white/15 border-white/30 dark:bg-zinc-900/15 dark:border-zinc-900/30",
    fgBorder: "border-white/25 dark:border-zinc-900/25",
    inverse: "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100",
    lightBg: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-300 dark:border-zinc-600",
    focusRing: "focus:ring-zinc-500/20 focus:border-zinc-500",
  },
};

const hexToRgb = (hex: string): [number, number, number] => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [99, 102, 241];
};

const rgbToCss = ([r, g, b]: [number, number, number]) => `${r}, ${g}, ${b}`;

// WCAG relative luminance, 0 (black) → 1 (white).
const luminance = ([r, g, b]: [number, number, number]) => {
  const [lr, lg, lb] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
};

// Pull a color toward black (t < 0) or white (t > 0) by |t|.
const mix = (
  [r, g, b]: [number, number, number],
  t: number,
): [number, number, number] => {
  const target = t < 0 ? 0 : 255;
  const amount = Math.abs(t);
  return [r, g, b].map((c) => Math.round(c + (target - c) * amount)) as [
    number,
    number,
    number,
  ];
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    const lum = luminance(rgb);

    // Text placed ON the accent fill: dark on light colors, light on dark ones.
    const fgRgb: [number, number, number] = lum > 0.45 ? [24, 24, 27] : [255, 255, 255];

    // Accent text placed on the card surface. A very light color (e.g. white)
    // vanishes on the light card, and a very dark one on the dark card, so
    // shade each mode's copy just enough to stay readable.
    const textLight = lum > 0.4 ? mix(rgb, -0.55) : rgb;
    const textDark = lum < 0.15 ? mix(rgb, 0.55) : rgb;

    return {
      theme: {
        text: "text-[var(--theme-text)] dark:text-[var(--theme-text-dark)]",
        bg: "bg-[var(--theme-color)] hover:opacity-90 text-[var(--theme-fg)] shadow-[0_4px_14px_0_rgba(var(--theme-color-rgb),0.2)]",
        fg: "text-[var(--theme-fg)]",
        fgMuted: "text-[rgba(var(--theme-fg-rgb),0.8)]",
        fgSoft:
          "bg-[rgba(var(--theme-fg-rgb),0.15)] border-[rgba(var(--theme-fg-rgb),0.3)]",
        fgBorder: "border-[rgba(var(--theme-fg-rgb),0.25)]",
        inverse: "bg-[var(--theme-fg)] text-[var(--theme-color)]",
        lightBg:
          "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-text)] dark:text-[var(--theme-text-dark)]",
        border: "border-[rgba(var(--theme-color-rgb),0.3)]",
        focusRing:
          "focus:ring-[rgba(var(--theme-color-rgb),0.2)] focus:border-[var(--theme-color)]",
      },
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgbToCss(rgb),
        "--theme-fg": `rgb(${rgbToCss(fgRgb)})`,
        "--theme-fg-rgb": rgbToCss(fgRgb),
        "--theme-text": `rgb(${rgbToCss(textLight)})`,
        "--theme-text-dark": `rgb(${rgbToCss(textDark)})`,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};
