export const metadata = docsPageMetadata("third-party/charts", {
  title: "Charts",
  description: "Integrate Recharts and Chart.js with Algorize UI — design tokens bridged into both, in light and dark themes."
});

# Charts

Recharts and Chart.js are the two React charting libraries most projects
actually reach for, and they take opposite approaches: Recharts composes SVG out
of React elements, Chart.js paints a canvas from a config object. Both are shown
here, and both are made to look like the rest of the app the same way — by
reading the design tokens out of CSS and handing them over as plain values.

## Recharts

Both examples read their colours from one small `useChartTokens` hook — the
whole of it is in [the theme bridge](#the-theme-bridge) below the install
commands.

export const usageRecharts = `import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenue = [
  { month: "Jan", mrr: 12400, expansion: 2100 },
  { month: "Feb", mrr: 14850, expansion: 2600 },
  { month: "Mar", mrr: 15900, expansion: 2400 },
  { month: "Apr", mrr: 18600, expansion: 3100 },
  { month: "May", mrr: 21050, expansion: 3800 },
  { month: "Jun", mrr: 24900, expansion: 4200 },
  { month: "Jul", mrr: 26400, expansion: 4050 },
  { month: "Aug", mrr: 29800, expansion: 5300 },
];

const currency = (value: number) => \`$\${(value / 1000).toFixed(1)}k\`;

/**
 * Recharts draws the plot; the surrounding chrome — card, title, legend,
 * tooltip — is all Algorize UI. That split is the whole integration: the
 * chart library never renders anything the design system already owns.
 */
export default function RechartsRevenue() {
  const tokens = useChartTokens();

  return (

            Recurring revenue
            Monthly recurring revenue and expansion
          
          +18.4%

               currency(Number(value))}
              />

  );
}`;

### Installation

This example also uses these Algorize UI components — install whichever
your project does not already have:

## The theme bridge

A chart cannot read `text-muted-foreground`. Recharts needs a `stroke` string,
Chart.js needs a `borderColor` for a canvas, and AG Grid — on the
Data Tables page — needs the same
values again. So the token lookup lives in one small hook rather than in each
chart:

```ts
// src/lib/chart-tokens.ts

/**
 * Bridges the design tokens in CSS into the plain strings third-party chart
 * libraries expect.
 *
 * Recharts, Chart.js, AG Grid and friends take colours as values, not as
 * classes, so `text-muted-foreground` means nothing to them. Reading the
 * custom properties off `` keeps one source of truth: change a token in
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
 * class on ``, so watching that attribute is enough — no context, no
 * provider, and it works the same in a Vite app as in Next.js.
 */
export function useChartTokens(): ChartTokens {
  const [tokens, setTokens] = useState(FALLBACK);

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
```

Two details earn their place. Colours are read off `document.documentElement`,
so anything defined in `globals.css` is available without a provider. And the
`MutationObserver` on the root element's `class` is what makes a chart follow a
theme switch — next-themes toggles that class, and a canvas painted before the
toggle will not repaint on its own.

The series palette is literal hex rather than a token, deliberately: the default
`--primary` is a greyscale ramp, so a six-series chart drawn from it would be six
indistinguishable greys. Swap those six hues for your brand ramp and every chart
on this page follows.

## Chart.js

export const usageChartJs = `import { useMemo } from "react";

/**
 * Chart.js is tree-shaken: every scale, element and plugin you use has to be
 * registered once. Do it at module scope, not inside the component — a
 * register call in a render body runs on every update.
 */
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const channels = ["Organic", "Referral", "Social", "Email", "Paid"];
const sessions = [18400, 9200, 7600, 5400, 4100];

export default function ChartJsTraffic() {
  const tokens = useChartTokens();

  /**
   * Options are rebuilt when the tokens change, which is what makes the
   * chart follow the theme switch — Chart.js paints to a canvas and cannot
   * inherit anything from CSS.
   */
  const barOptions = useMemo>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: tokens.card,
          titleColor: tokens.foreground,
          bodyColor: tokens.muted,
          borderColor: tokens.border,
          borderWidth: 1,
          padding: 12,
          displayColors: false,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { color: tokens.border },
          ticks: { color: tokens.muted, font: { size: 12 } },
        },
        y: {
          grid: { color: tokens.border },
          border: { display: false },
          ticks: { color: tokens.muted, font: { size: 12 } },
        },
      },
    }),
    [tokens],
  );

  const doughnutOptions = useMemo>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: tokens.muted,
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 8,
            padding: 16,
            font: { size: 12 },
          },
        },
        tooltip: {
          backgroundColor: tokens.card,
          titleColor: tokens.foreground,
          bodyColor: tokens.muted,
          borderColor: tokens.border,
          borderWidth: 1,
          padding: 12,
        },
      },
    }),
    [tokens],
  );

  return (

          Sessions by channel
          Last 30 days

          Share of traffic
          Same data, proportional view

  );
}`;

### Installation

This example also uses these Algorize UI components — install whichever
your project does not already have:

## Which one

        Recharts
        Chart.js

        Renders
        SVG elements
        Canvas

        Composition
        React children ({''}, {''})
        One config object

        Custom marks
        Any React component
        Plugin API

        Many points
        Slows down — every point is a DOM node
        Stays fast

        Theme change
        Re-renders like any React tree
        Needs the options object rebuilt

Reach for Recharts when the chart is part of the component tree and you want to
drop your own React nodes into it. Reach for Chart.js when the series are long
enough that a few thousand SVG nodes would hurt.

Neither example hard-codes a colour at the call site — both index
`tokens.series`. Changing the palette in `chart-tokens.ts` restyles every chart
in the app at once, which is the point of routing colour through the bridge
rather than passing hex into each component.

---

**Component Path:** `[framework]\third-party\charts\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
