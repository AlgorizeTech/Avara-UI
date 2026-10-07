import { useEffect, useState } from "react";
import { isDefaultAccent, resolveAccent } from "@/lib/accent";

/**
 * Bridges the design tokens in CSS into the plain strings third-party chart
 * libraries expect.
 *
 * Recharts, Chart.js, AG Grid and friends take colours as values, not as
 * classes, so `text-muted-foreground` means nothing to them. Reading the
 * custom properties off `<html>` and `<body>` keeps one source of truth: change a
 * token in globals.css, switch theme presets, or pick an active accent color,
 * and every chart follows.
 */
export type ChartTokens = {
  foreground: string;
  muted: string;
  border: string;
  card: string;
  primary: string;
  /** Categorical palette, in the order series should be assigned. */
  series: string[];
};

/**
 * Fallback series colours when CSS tokens are not available.
 */
const DEFAULT_SERIES = ["#6366f1", "#06b6d4", "#f59e0b", "#ec4899", "#10b981", "#8b5cf6"];

const FALLBACK: ChartTokens = {
  foreground: "#18181b",
  muted: "#71717a",
  border: "#e4e4e7",
  card: "#ffffff",
  primary: "#6366f1",
  series: DEFAULT_SERIES,
};

let colorCanvas: HTMLCanvasElement | null = null;

/**
 * Normalizes any CSS color (such as oklch(...), hsl(...), etc.) into a
 * canonical color format supported by Canvas and SVG renderers.
 */
function normalizeColor(color: string): string {
  if (typeof window === "undefined" || !color) return color;
  const trimmed = color.trim();
  if (trimmed.startsWith("#") || trimmed.startsWith("rgb")) return trimmed;
  try {
    if (!colorCanvas) colorCanvas = document.createElement("canvas");
    colorCanvas.width = 1;
    colorCanvas.height = 1;
    const ctx = colorCanvas.getContext("2d");
    if (!ctx) return trimmed;
    ctx.fillStyle = trimmed;
    return ctx.fillStyle || trimmed;
  } catch {
    return trimmed;
  }
}

function readTokens(color?: string): ChartTokens {
  if (typeof window === "undefined") return FALLBACK;

  const bodyStyles = typeof document !== "undefined" && document.body ? getComputedStyle(document.body) : null;
  const rootStyles = getComputedStyle(document.documentElement);

  const read = (name: string, fallback: string) => {
    const val = bodyStyles?.getPropertyValue(name).trim() || rootStyles.getPropertyValue(name).trim();
    return val || fallback;
  };

  const explicitAccent = !isDefaultAccent(color) ? resolveAccent(color) : null;
  const resolvedPrimary = normalizeColor(explicitAccent || read("--primary", FALLBACK.primary));

  const chart1 = resolvedPrimary;
  const chart2 = normalizeColor(read("--chart-2", DEFAULT_SERIES[1]));
  const chart3 = normalizeColor(read("--chart-3", DEFAULT_SERIES[2]));
  const chart4 = normalizeColor(read("--chart-4", DEFAULT_SERIES[3]));
  const chart5 = normalizeColor(read("--chart-5", DEFAULT_SERIES[4]));
  const chart6 = normalizeColor(read("--chart-1", DEFAULT_SERIES[5]));

  return {
    foreground: read("--foreground", FALLBACK.foreground),
    muted: read("--muted-foreground", FALLBACK.muted),
    border: read("--border", FALLBACK.border),
    card: read("--card", FALLBACK.card),
    primary: resolvedPrimary,
    series: [chart1, chart2, chart3, chart4, chart5, chart6],
  };
}

/**
 * Re-reads on theme or accent change. Watches both `<html>` (where theme customizer
 * and next-themes apply classes and custom properties) and `<body>` (where active accent
 * overrides are attached).
 */
export function useChartTokens(color?: string): ChartTokens {
  const [tokens, setTokens] = useState<ChartTokens>(() => readTokens(color));

  useEffect(() => {
    const sync = () => setTokens(readTokens(color));
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });

    if (typeof document !== "undefined" && document.body) {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    }

    return () => observer.disconnect();
  }, [color]);

  return tokens;
}
