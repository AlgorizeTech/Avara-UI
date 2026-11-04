---
title: "Shadcn Chart"
description: "Shadcn Chart. A custom charting component with bar, line, pie, donut and stacked bar charts, a traffic gauge, visitors by country and metric overview tabs."
url: https://avaraui.com/docs/nextjs/chart
---

# Shadcn Chart

A beautiful, completely custom charting engine built from the ground up for modern React applications.

This `ChartBlock` completely drops heavy dependencies (No `recharts`, No `chart.js`, No `gsap`). It leverages the power of **Responsive CSS Flexbox** for the Bar charts to ensure they anchor perfectly to the axis without squashing, uses **Smooth Bezier Curves** for the Line/Area SVG paths, and utilizes pure **SVG Stroke-Dasharray Math** for perfect Pie and Donut charts that never stretch into ovals.

One `data` array of `{ label, value }` drives every chart type — the engine handles scaling, height distribution and polar math. Hover any bar, point or slice for its tooltip. Two further types, `donut-legend` and `stacked-bar`, show shares of a whole with a legend, each share in its own colour — the charts on the [Book Appointment](https://avaraui.com/docs/nextjs/book-appointment) page.

## Bar chart

Bars are pure HTML/CSS flexbox, so they always sit flat on the axis regardless of container size.

- Pass `data` as `{ label, value }[]`.
- `type="bar"` is the default.
- `valuePrefix="$"` is prepended to every rendered number, axis labels and tooltip alike.
- `height={300}` fixes the pixel height to stop layout shift — width is always 100% responsive.

```tsx
import { ChartBlock, type ChartDataPoint } from "@/components/custom/blocks/ChartBlock";

const revenue: ChartDataPoint[] = [
  { label: "Jan", value: 1200 },
  { label: "Feb", value: 1900 },
  { label: "Mar", value: 1500 },
  { label: "Apr", value: 2400 },
  { label: "May", value: 2100 },
  { label: "Jun", value: 3200 },
  { label: "Jul", value: 2800 },
  { label: "Aug", value: 3800 },
  { label: "Sep", value: 3400 },
  { label: "Oct", value: 4200 },
  { label: "Nov", value: 3900 },
  { label: "Dec", value: 4800 },
];

export default function RevenueChart() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-border bg-card p-6 text-card-foreground">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Annual Revenue Overview
        </h3>
        <p className="text-xs font-medium text-muted-foreground mt-0.5">
          Fiscal year 2023 performance metrics.
        </p>
      </div>
      <ChartBlock
        data={revenue}
        type="bar"
        valuePrefix="$"
        height={300}
      />
    </div>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/chart.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/chart
```

## Examples

### Line chart

- Set `type="line"` to draw a custom spline — smooth bezier curves instead of hard angles.
- `showArea={false}` leaves the stroke bare, with nothing under it.

```tsx
import { ChartBlock, type ChartDataPoint } from "@/components/custom/blocks/ChartBlock";

const revenue: ChartDataPoint[] = [
  { label: "Jan", value: 1200 },
  { label: "Feb", value: 1900 },
  { label: "Mar", value: 1500 },
  { label: "Apr", value: 2400 },
  { label: "May", value: 2100 },
  { label: "Jun", value: 3200 },
  { label: "Jul", value: 2800 },
  { label: "Aug", value: 3800 },
  { label: "Sep", value: 3400 },
  { label: "Oct", value: 4200 },
  { label: "Nov", value: 3900 },
  { label: "Dec", value: 4800 },
];

export default function RevenueLine() {
  // Bezier-smoothed stroke, no fill.
  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-border bg-card p-6 text-card-foreground">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Annual Revenue Overview
        </h3>
        <p className="text-xs font-medium text-muted-foreground mt-0.5">
          Fiscal year 2023 performance metrics.
        </p>
      </div>
      <ChartBlock
        data={revenue}
        type="line"
        showArea={false}
        valuePrefix="$"
        height={300}
      />
    </div>
  );
}
```

### Pie chart

- Set `type="pie"` to render in a 1:1 container — so it never stretches into an oval — with each slice shaded from your `color`.

```tsx
import { ChartBlock, type ChartDataPoint } from "@/components/custom/blocks/ChartBlock";

const revenue: ChartDataPoint[] = [
  { label: "Jan", value: 1200 },
  { label: "Feb", value: 1900 },
  { label: "Mar", value: 1500 },
  { label: "Apr", value: 2400 },
  { label: "May", value: 2100 },
  { label: "Jun", value: 3200 },
  { label: "Jul", value: 2800 },
  { label: "Aug", value: 3800 },
  { label: "Sep", value: 3400 },
  { label: "Oct", value: 4200 },
  { label: "Nov", value: 3900 },
  { label: "Dec", value: 4800 },
];

export default function RevenuePie() {
  // Pie and donut render in a 1:1 container, so they never stretch into
  // ovals, and shade each slice from a single theme color.
  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-border bg-card p-6 text-card-foreground">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Annual Revenue Overview
        </h3>
        <p className="text-xs font-medium text-muted-foreground mt-0.5">
          Fiscal year 2023 performance metrics.
        </p>
      </div>
      <ChartBlock data={revenue.slice(0, 5)} type="pie" valuePrefix="$" height={300} />
    </div>
  );
}
```

### Donut chart

- Set `type="donut"` for the same geometry with the centre cut out.

```tsx
import { ChartBlock, type ChartDataPoint } from "@/components/custom/blocks/ChartBlock";

const revenue: ChartDataPoint[] = [
  { label: "Jan", value: 1200 },
  { label: "Feb", value: 1900 },
  { label: "Mar", value: 1500 },
  { label: "Apr", value: 2400 },
  { label: "May", value: 2100 },
  { label: "Jun", value: 3200 },
  { label: "Jul", value: 2800 },
  { label: "Aug", value: 3800 },
  { label: "Sep", value: 3400 },
  { label: "Oct", value: 4200 },
  { label: "Nov", value: 3900 },
  { label: "Dec", value: 4800 },
];

export default function RevenueDonut() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-border bg-card p-6 text-card-foreground">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Annual Revenue Overview
        </h3>
        <p className="text-xs font-medium text-muted-foreground mt-0.5">
          Fiscal year 2023 performance metrics.
        </p>
      </div>
      <ChartBlock data={revenue.slice(0, 5)} type="donut" valuePrefix="$" height={300} />
    </div>
  );
}
```

### Donut with legend

- Set `type="donut-legend"` for categorical shares: every segment gets its own colour from `colors` (the theme accent first), with a legend beside it. Hover a segment or its row and the other shares fade.
- `centerLabel` captions the centre at rest, where the largest share reads; `hoverLabel` replaces it while a share is hovered.

```tsx
import { ChartBlock } from "@/components/custom/blocks/ChartBlock";

const visitReasons = [
  { label: "Hypertension management", value: 35 },
  { label: "Preventive cardiology", value: 25 },
  { label: "Heart failure monitoring", value: 22 },
  { label: "Chest pain evaluation", value: 18 },
];

export default function VisitReasons() {
  return (
    <div className="w-full max-w-lg md:max-w-xl mx-auto rounded-3xl border border-border bg-card p-6 text-card-foreground">
      <h3 className="text-sm font-semibold">Top visit reasons</h3>
      <ChartBlock
        type="donut-legend"
        data={visitReasons}
        valueSuffix="%"
        centerLabel="top reason"
        hoverLabel="of visits"
        className="mt-4"
      />
    </div>
  );
}
```

### Stacked bar

- Set `type="stacked-bar"` for one horizontal bar split by share, legend below. Both legend types size to their content, so `height` is only needed if you want a fixed box.
- Give a point its own `color` to pin one share — an "Other" bucket to grey, say — while the rest follow the palette.

```tsx
import { ChartBlock } from "@/components/custom/blocks/ChartBlock";

const week = [
  { label: "Clinical", value: 47 },
  { label: "Research", value: 24 },
  { label: "Teaching", value: 16 },
  { label: "Admin", value: 10 },
  { label: "Other", value: 3 },
];

export default function WeekSplit() {
  return (
    <div className="w-full max-w-lg md:max-w-xl mx-auto rounded-3xl border border-border bg-card p-6 text-card-foreground">
      <h3 className="text-sm font-semibold">Where the week goes</h3>
      <ChartBlock type="stacked-bar" data={week} valueSuffix="%" className="mt-4" />
    </div>
  );
}
```

### Traffic sources gauge

- Set `type="traffic-sources"` for a semicircular tick-gauge breakdown of visitor channels with total counts and share percentages.
- `signUps={412}` calculates and renders the visit-to-sign-up conversion rate meter.

```tsx
import { ChartBlock, TrafficSourcesChart } from "@/components/custom/blocks/ChartBlock";

const sources = [
  { label: "Direct", value: 3420 },
  { label: "Google Search", value: 2180 },
  { label: "GitHub", value: 1450 },
  { label: "Twitter / X", value: 890 },
  { label: "LinkedIn", value: 430 },
];

export default function TrafficSourcesDemo() {
  return (
    <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
      <ChartBlock
        type="traffic-sources"
        data={sources}
        signUps={412}
        title="Traffic sources"
        caption="Today"
      />
    </div>
  );
}
```

### Visitors by country

- Set `type="visitors-by-country"` for an interactive barcode breakdown with ISO country code badges and ranked shares.
- `showCodes={true}` renders the 2-letter ISO country badges in the breakdown list.

```tsx
import { ChartBlock, VisitorsByCountryChart } from "@/components/custom/blocks/ChartBlock";

const countryVisits = [
  { label: "United States", value: 4250, code: "US" },
  { label: "Germany", value: 1820, code: "DE" },
  { label: "United Kingdom", value: 1340, code: "GB" },
  { label: "India", value: 980, code: "IN" },
  { label: "Canada", value: 650, code: "CA" },
  { label: "France", value: 420, code: "FR" },
];

export default function CountryVisitorsDemo() {
  return (
    <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
      <ChartBlock
        type="visitors-by-country"
        data={countryVisits}
        title="Visitors by country"
        caption="Today"
      />
    </div>
  );
}
```

### Metrics overview tabs

- Set `type="metrics-overview"` for an interactive multi-tab dashboard chart featuring pill track columns, animated active tab spring, total & average statistics, and a toggle between columns and smooth trend spline.

```tsx
import { ChartBlock, type MetricTabItem } from "@/components/custom/blocks/ChartBlock";

const overviewMetrics: MetricTabItem[] = [
  {
    id: "users",
    label: "New users",
    icon: <UserPlus className="size-4" />,
    change: 9.1,
    points: [
      { label: "Jan", value: 850 },
      { label: "Feb", value: 940 },
      { label: "Mar", value: 1050 },
      { label: "Apr", value: 1000 },
      { label: "May", value: 1120 },
      { label: "Jun", value: 1200 },
      { label: "Jul", value: 1180 },
      { label: "Aug", value: 1280 },
      { label: "Sep", value: 1094 },
    ],
  },
  {
    id: "posts",
    label: "Posts",
    icon: <PenLine className="size-4" />,
    change: 5.6,
    points: [
      { label: "Jan", value: 110 },
      { label: "Feb", value: 125 },
      { label: "Mar", value: 130 },
      { label: "Apr", value: 120 },
      { label: "May", value: 140 },
      { label: "Jun", value: 150 },
      { label: "Jul", value: 145 },
      { label: "Aug", value: 160 },
      { label: "Sep", value: 149 },
    ],
  },
  {
    id: "messages",
    label: "Messages",
    icon: <Mail className="size-4" />,
    change: 4.4,
    points: [
      { label: "Jan", value: 420 },
      { label: "Feb", value: 460 },
      { label: "Mar", value: 490 },
      { label: "Apr", value: 470 },
      { label: "May", value: 520 },
      { label: "Jun", value: 580 },
      { label: "Jul", value: 550 },
      { label: "Aug", value: 610 },
      { label: "Sep", value: 571 },
    ],
  },
  {
    id: "revenue",
    label: "Revenue",
    icon: <Wallet className="size-4" />,
    currency: "USD",
    change: 7.7,
    points: [
      { label: "Jan", value: 52000 },
      { label: "Feb", value: 58000 },
      { label: "Mar", value: 64000 },
      { label: "Apr", value: 61000 },
      { label: "May", value: 69000 },
      { label: "Jun", value: 74000 },
      { label: "Jul", value: 71000 },
      { label: "Aug", value: 82000 },
      { label: "Sep", value: 77400 },
    ],
  },
];

export default function MetricsOverviewDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <ChartBlock
        type="metrics-overview"
        metrics={overviewMetrics}
        title="This year by month"
        caption="vs last month"
      />
    </div>
  );
}
```

## Features
Explore the Chart component's data visualization capabilities, featuring responsive resizing, interactive tooltips, and smooth rendering.

### Customizable

Easily adapt the component's styling and behavior to fit your application's unique design system.

### Accessible

Built with accessibility in mind, ensuring all users can interact with your application effectively.

### Responsive

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

### Performant

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

### Usage Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `{ label: string, value: number, color?: string, code?: string }[]` | Required | An array of objects mapping string labels to numerical values. `color` pins one share's colour; `code` provides 2-letter ISO country codes. |
| `type` | `"bar" \| "line" \| "pie" \| "donut" \| "donut-legend" \| "stacked-bar" \| "traffic-sources" \| "visitors-by-country" \| "metrics-overview"` | `"bar"` | Determines the core visualization architecture to render. |
| `color` | `"indigo" \| "rose" \| "emerald" \| "amber" \| "blue" \| "zinc" \| string` | `"var(--primary)"` | Applies the active color theme to the bars, strokes, gradients, pie slices, and tooltips. Accepts hex codes. |
| `height` | `number` | `300` | Forces a fixed pixel height for the chart container to prevent layout shifting. Width is always 100% responsive. The legend charts size to their content unless it is set. |
| `colors` | `string[]` | accent, teal, amber, rose, grey | Legend charts only: one colour per share, in order, wrapping if there are more shares than colours. The first entry is `var(--primary)`, so the lead share follows your theme. |
| `centerLabel` | `string` | `"largest"` | Donut with legend only: caption under the centre value at rest, where the largest share is shown. |
| `hoverLabel` | `string` | `"share"` | Donut with legend only: caption while a share is hovered. |
| `showGrid` | `boolean` | `true` | If true, renders dotted horizontal gridlines mapping 0% to 100% of the Y-Axis maximum. (Ignored on Pie/Donut). |
| `showArea` | `boolean` | `true` | Line Chart Only: Toggles the gradient fill rendered beneath the bezier curve. |
| `valuePrefix` | `string` | `""` | Prepends a string (like `"$"`) to the tooltip and Y-Axis values. |
| `signUps` | `number` | `undefined` | Traffic sources only: total sign-ups in the period, used to calculate and render the visit-to-sign-up conversion rate bar. |
| `showCodes` | `boolean` | `true` | Visitors by country only: whether to render the 2-letter ISO country code badges in the breakdown list. |
| `title` | `string` | `undefined` | Header title for card-based breakdown charts (e.g. "Traffic sources", "Visitors by country"). |
| `caption` | `string` | `undefined` | Subheading or period caption under the title (e.g. "Today", "This week"). |
| `metrics` | `MetricTabItem[]` | Default 4 tabs (Users, Posts, Messages, Revenue) | Metrics overview only: custom array of metric tabs with data series, labels, icons, currency codes, and delta change percentages. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/chart
