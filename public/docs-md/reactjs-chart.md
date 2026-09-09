# Chart

A beautiful, completely custom charting engine built from the ground up for modern React applications.

This `ChartBlock` completely drops heavy dependencies (No `recharts`, No `chart.js`, No `gsap`). It leverages the power of **Responsive CSS Flexbox** for the Bar charts to ensure they anchor perfectly to the axis without squashing, uses **Smooth Bezier Curves** for the Line/Area SVG paths, and utilizes pure **SVG Stroke-Dasharray Math** for perfect Pie and Donut charts that never stretch into ovals.

One `data` array of `{ label, value }` drives every chart type — the engine handles scaling, height distribution and polar math. Hover any bar, point or slice for its tooltip.

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

## Installation

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

          {`{ label: string, value: number }[]`}

          Required
        
        An array of objects mapping string labels to numerical values.

          type

          "bar" | "line" | "pie" | "donut"

          "bar"
        
        Determines the core visualization architecture to render.

          color

            "indigo" | "rose" | "emerald" | "amber" | "blue" | "zinc" | string

          "indigo"

          Applies the active color theme to the bars, strokes, gradients, pie
          slices, and tooltips. Accepts hex codes.

          height

          number

          300

          Forces a fixed pixel height for the chart container to prevent layout
          shifting. Width is always 100% responsive.

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

          valueSuffix

          string

          ""

          Appends a string (like "k" or "%") to the
          tooltip and Y-Axis values.

---

**Component Path:** `[framework]\chart\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
