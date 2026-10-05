export const metadata = docsPageMetadata("chart");

# Chart

A beautiful, completely custom charting engine built from the ground up for modern React applications.

This `ChartBlock` completely drops heavy dependencies (No `recharts`, No `chart.js`, No `gsap`). It leverages the power of **Responsive CSS Flexbox** for the Bar charts to ensure they anchor perfectly to the axis without squashing, uses **Smooth Bezier Curves** for the Line/Area SVG paths, and utilizes pure **SVG Stroke-Dasharray Math** for perfect Pie and Donut charts that never stretch into ovals.

One `data` array of `{ label, value }` drives every chart type — the engine handles scaling, height distribution and polar math. Hover any bar, point or slice for its tooltip. Two further types, `donut-legend` and `stacked-bar`, show shares of a whole with a legend, each share in its own colour — the charts on the Book Appointment page.

export const chartData = `const revenue: ChartDataPoint[] = [
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
];`;

export const chartHeading = `
        
          Annual Revenue Overview

          Fiscal year 2023 performance metrics.
        
      `;

export const usageBar = `import { ChartBlock, type ChartDataPoint } from "@/components/custom/blocks/ChartBlock";

${chartData}

export default function RevenueChart() {
  return (
    
      ${chartHeading}

  );
}`;

export const usageLine = `import { ChartBlock, type ChartDataPoint } from "@/components/custom/blocks/ChartBlock";

${chartData}

export default function RevenueLine() {
  // Bezier-smoothed stroke, no fill.
  return (
    
      ${chartHeading}

  );
}`;

export const usagePie = `import { ChartBlock, type ChartDataPoint } from "@/components/custom/blocks/ChartBlock";

${chartData}

export default function RevenuePie() {
  // Pie and donut render in a 1:1 container, so they never stretch into
  // ovals, and shade each slice from a single theme color.
  return (
    
      ${chartHeading}

  );
}`;

export const usageDonut = `import { ChartBlock, type ChartDataPoint } from "@/components/custom/blocks/ChartBlock";

${chartData}

export default function RevenueDonut() {
  return (
    
      ${chartHeading}

  );
}`;

export const usageDonutLegend = `import { ChartBlock } from "@/components/custom/blocks/ChartBlock";

const visitReasons = [
  { label: "Hypertension management", value: 35 },
  { label: "Preventive cardiology", value: 25 },
  { label: "Heart failure monitoring", value: 22 },
  { label: "Chest pain evaluation", value: 18 },
];

export default function VisitReasons() {
  return (
    
      Top visit reasons

  );
}`;

export const usageStackedBar = `import { ChartBlock } from "@/components/custom/blocks/ChartBlock";

const week = [
  { label: "Clinical", value: 47 },
  { label: "Research", value: 24 },
  { label: "Teaching", value: 16 },
  { label: "Admin", value: 10 },
  { label: "Other", value: 3 },
];

export default function WeekSplit() {
  return (
    
      Where the week goes

  );
}`;

export const usageTrafficSources = `import { ChartBlock, TrafficSourcesChart } from "@/components/custom/blocks/ChartBlock";

const sources = [
  { label: "Direct", value: 3420 },
  { label: "Google Search", value: 2180 },
  { label: "GitHub", value: 1450 },
  { label: "Twitter / X", value: 890 },
  { label: "LinkedIn", value: 430 },
];

export default function TrafficSourcesDemo() {
  return (

  );
}`;

export const usageVisitorsByCountry = `import { ChartBlock, VisitorsByCountryChart } from "@/components/custom/blocks/ChartBlock";

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

  );
}`;

export const usageMetricsOverview = `import { ChartBlock, type MetricTabItem } from "@/components/custom/blocks/ChartBlock";

const overviewMetrics: MetricTabItem[] = [
  {
    id: "users",
    label: "New users",
    icon: ,
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
    icon: ,
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
    icon: ,
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
    icon: ,
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

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/chart
```

## Examples

## Features
Explore the Chart component's data visualization capabilities, featuring responsive resizing, interactive tooltips, and smooth rendering.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Prop
        Type
        Default
        Description

          data

          {`{ label: string, value: number, color?: string, code?: string }[]`}

          Required
        
        An array of objects mapping string labels to numerical values. color pins one share's colour; code provides 2-letter ISO country codes.

          type

          "bar" | "line" | "pie" | "donut" | "donut-legend" | "stacked-bar" | "traffic-sources" | "visitors-by-country" | "metrics-overview"

          "bar"
        
        Determines the core visualization architecture to render.

          color

            "indigo" | "rose" | "emerald" | "amber" | "blue" | "zinc" | string

          "var(--primary)"

          Applies the active color theme to the bars, strokes, gradients, pie
          slices, and tooltips. Accepts hex codes.

          height

          number

          300

          Forces a fixed pixel height for the chart container to prevent layout
          shifting. Width is always 100% responsive. The legend charts size to
          their content unless it is set.

          colors

          string[]
        
        accent, teal, amber, rose, grey
        
          Legend charts only: one colour per share, in order,
          wrapping if there are more shares than colours. The first entry is
          var(--primary), so the lead share follows your theme.

          centerLabel

          string

          "largest"

          Donut with legend only: caption under the centre
          value at rest, where the largest share is shown.

          hoverLabel

          string

          "share"

          Donut with legend only: caption while a share is
          hovered.

          showGrid

          boolean

          true

          If true, renders dotted horizontal gridlines mapping 0% to 100% of the
          Y-Axis maximum. (Ignored on Pie/Donut).

          showArea

          boolean

          true

          Line Chart Only: Toggles the gradient fill rendered
          beneath the bezier curve.

          valuePrefix

          string

          ""

          Prepends a string (like "$") to the tooltip and Y-Axis
          values.

          signUps

          number

          undefined

          Traffic sources only: total sign-ups in the period, used to calculate and render the visit-to-sign-up conversion rate bar.

          showCodes

          boolean

          true

          Visitors by country only: whether to render the 2-letter ISO country code badges in the breakdown list.

          title

          string

          undefined

          Header title for card-based breakdown charts (e.g. "Traffic sources", "Visitors by country").

          caption

          string

          undefined

          Subheading or period caption under the title (e.g. "Today", "This week").

          metrics

          MetricTabItem[]

          Default 4 tabs (Users, Posts, Messages, Revenue)

          Metrics overview only: custom array of metric tabs with data series, labels, icons, currency codes, and delta change percentages.

---

**Component Path:** `[framework]\chart\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
