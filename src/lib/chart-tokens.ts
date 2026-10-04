import { useEffect, useState } from "react";

/**
 * Bridges the design tokens in CSS into the plain strings third-party chart
 * libraries expect.
 *
 * Recharts, Chart.js, AG Grid and friends take colours as values, not as
 * classes, so `text-muted-foreground` means nothing to them. Reading the
 * custom properties off `<html>` keeps one source of truth: change a token in
 * globals.css and every chart follows, in both themes.
 */
export type ChartTokens = {
  foreground: string;
  muted: string;
  border: string;
  card: string;
  /** Categorical palette, in the order series should be assigned. */
  series: string[];
};

/**
 * Series colours are literal hex rather than tokens on purpose: the neutral
 * `--primary` is a greyscale ramp, so a chart drawn from it would be six
 * indistinguishable greys. These six hues hold their separation in both
 * themes — swap them for your brand ramp and every example follows.
 */
const SERIES = ["#6366f1", "#06b6d4", "#f59e0b", "#ec4899", "#10b981", "#8b5cf6"];

const FALLBACK: ChartTokens = {
  foreground: "#18181b",
  muted: "#71717a",
  border: "#e4e4e7",
  card: "#ffffff",
  series: SERIES,
};

function readTokens(): ChartTokens {
  if (typeof window === "undefined") return FALLBACK;
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;

  return {
    foreground: read("--foreground", FALLBACK.foreground),
    muted: read("--muted-foreground", FALLBACK.muted),
    border: read("--border", FALLBACK.border),
    card: read("--card", FALLBACK.card),
    series: SERIES,
  };
}

/**
 * Re-reads on theme change. next-themes (and most theme switchers) toggle a
 * class on `<html>`, so watching that attribute is enough — no context, no
 * provider, and it works the same in a Vite app as in Next.js.
 */
export function useChartTokens(): ChartTokens {
  const [tokens, setTokens] = useState<ChartTokens>(FALLBACK);

  useEffect(() => {
    const sync = () => setTokens(readTokens());
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return tokens;
}
