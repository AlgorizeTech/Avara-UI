# Chart

A beautiful, completely custom charting engine built from the ground up for modern React applications.

This `ChartBlock` completely drops heavy dependencies (No `recharts`, No `chart.js`, No `gsap`). It leverages the power of **Responsive CSS Flexbox** for the Bar charts to ensure they anchor perfectly to the axis without squashing, uses **Smooth Bezier Curves** for the Line/Area SVG paths, and utilizes pure **SVG Stroke-Dasharray Math** for perfect Pie and Donut charts that never stretch into ovals.

## Interactive Showcase

Use the control panel below to test the completely rewritten architectures.

- **Bars** are now built with pure HTML/CSS, meaning they will inherently stack and position perfectly flat on the bottom axis. Tooltips trigger via CSS `group-hover`.
- **Lines & Areas** use a custom spline function to generate smooth, premium bezier curves instead of harsh angles. The `showArea` toggle seamlessly adds a gradient fill below the stroke.
- **Pie & Donut** use a dedicated 1:1 aspect ratio container and calculate polar coordinates automatically. They generate a beautiful monochromatic scale by reducing slice opacity based on your chosen theme color.

## Installation

### Copy the Component

Because this rewrite drops all external animation libraries, it is **100% dependency-free**.

The engine uses standard Tailwind utility classes and injects its own lightweight `@keyframes` for the bar growth, line drawing, and pie-burst animations.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/ChartBlock.tsx`.

---

## Usage

Define your `data` array by passing in a `label` and a numerical `value`. The engine handles all the scaling, height distribution, and polar math automatically.

```tsx

const monthlySignups = [
  { label: "Jan", value: 120 },
  { label: "Feb", value: 340 },
  { label: "Mar", value: 290 },
  { label: "Apr", value: 500 },
];

export default function AnalyticsWidget() {
  return (
    
      User Signups

  );
}
```

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

**Component Path:** `nextjs\chart\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
