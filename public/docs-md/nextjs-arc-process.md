---
title: "Shadcn Arc Process"
description: "Shadcn Arc Process. A scroll-driven curved arc process section with dynamic SVG progress strokes, animated heading accent underline, rotating milestone nodes."
url: https://avaraui.com/docs/nextjs/arc-process
---

# Shadcn Arc Process

A scroll-driven curved arc process section with dynamic SVG progress strokes, animated heading accent underline, rotating milestone nodes, and active step details.

As the user scrolls through the section, the arc stroke traces along the curve with your theme color, rotating the orbital nodes and revealing each project milestone at the apex.

## Arc Process Section

Scroll-driven dome arc process with live colored progress border, animated header underline, orbital badge nodes, and milestone card details.

- `variant="arc-dock"` interactive rotating semicircle dome with orbital milestone nodes.
- `highlightShape="ribbon"` drawing style under the highlighted word: "ribbon" (Ribbon Drift dual gradient line), "wave", "double", or "curve".
- `highlightWord="workflow"` word inside the heading wrapped with an animated SVG curved underline stroke.

```tsx
"use client";

import React from "react";
import {
  Compass,
  Palette,
  Cpu,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import {
  ArcProcess,
  type ArcProcessStep,
} from "@/components/custom/blocks/ArcProcessBlock";

const PROCESS_STEPS: ArcProcessStep[] = [
  {
    id: "step-1",
    stepNumber: "01",
    title: "Discovery & Strategic Roadmap",
    description:
      "We map your technical roadmap, dissect core user journeys, and align architecture goals before writing a single line of code.",
    icon: Compass,
  },
  {
    id: "step-2",
    stepNumber: "02",
    title: "Rapid Prototyping & Iteration",
    description:
      "Interactive wireframes and tangible prototypes let you test assumptions early and refine user interactions with direct feedback.",
    icon: Palette,
  },
  {
    id: "step-3",
    stepNumber: "03",
    title: "Full-Stack Agile Engineering",
    description:
      "Clean, type-safe implementation using modular components, robust state management, and enterprise-grade performance best practices.",
    icon: Cpu,
  },
  {
    id: "step-4",
    stepNumber: "04",
    title: "Automated QA & Security Audit",
    description:
      "Comprehensive end-to-end testing, accessibility compliance checks, and performance benchmarks to guarantee zero regression.",
    icon: ShieldCheck,
  },
  {
    id: "step-5",
    stepNumber: "05",
    title: "Global Scale & Continuous Delivery",
    description:
      "Zero-downtime automated deployment pipelines with real-time telemetry, auto-scaling infrastructure, and continuous monitoring.",
    icon: Rocket,
  },
];

export default function ArcProcessDemo() {
  return (
    <ArcProcess
      variant="arc-dock"
      badgeText="ENGINEERING LIFECYCLE"
      title="A streamlined workflow built for"
      highlightWord="workflow"
      subtitle="teams shipping high-standard products"
      steps={PROCESS_STEPS}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/arc-process.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/arc-process
```

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"arc-dock" \| "default" \| "semicircle"` | `"arc-dock"` | Visual design variant for the process section. Defaults to "arc-dock" for the interactive rotating semicircular dome. |
| `badgeText` | `string` | `"ENGINEERING LIFECYCLE"` | Optional badge pill label displayed above the main heading. |
| `title` | `string` | `"A streamlined workflow built for"` | Primary heading text at the top of the section. |
| `highlightWord` | `string` | `"workflow"` | Specific word in the title styled with an animated hand-drawn SVG curve underline in the theme accent color. |
| `highlightShape` | `"wave" \| "double" \| "curve"` | `"wave"` | Visual drawing shape rendered beneath the highlighted word: energetic hand-drawn marker wave ("wave"), dual sketch stroke ("double"), or clean swoop curve ("curve"). |
| `subtitle` | `string` | `"teams shipping high-standard products"` | Secondary muted heading text below the primary title. |
| `steps` | `ArcProcessStep[]` | `DEFAULT_ARC_STEPS` | Array of step milestone objects containing id, stepNumber, title, description, and Lucide icon. |
| `themeColor` | `string` | `"var(--theme-color, var(--primary))"` | Accent color applied to the active arc stroke, apex indicator dot, active badge, and step numbers. Automatically inherits your project theme or custom color swatch. |
| `autoPlay` | `boolean` | `false` | Whether to automatically cycle between steps when not scrolling. |
| `autoPlayInterval` | `number` | `5000` | Interval in milliseconds between automatic step transitions. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/arc-process
