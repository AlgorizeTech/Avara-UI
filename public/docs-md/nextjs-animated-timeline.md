export const metadata = docsPageMetadata("animated-timeline");

# Animated Timeline

A highly dynamic, scroll-aware timeline engine featuring Intersection Observers and multiple 3D/2D entry animations.

Unlike standard static timelines, this `AnimatedTimelineBlock` uses native browser APIs (`IntersectionObserver`) to orchestrate complex animations only when the user scrolls the elements into view. As the user scrolls down your page, the vertical tracking line dynamically extends, the nodes glow, and the cards flip, blur, or slide into position.

Every preview scrolls internally — **scroll down inside a preview** and watch the tracking line extend as each node crosses the observer threshold.

export const timelineEvents = `import {
  CheckCircle2,
  Loader2,
  MapPin,
  Palette,
  Rocket,
  Target,
  Zap,
} from "lucide-react";

const EVENTS: AnimatedTimelineItem[] = [
  {
    id: "1",
    title: "Project Initiation",
    date: "Jan 2024",
    description:
      "The initial kickoff meeting where requirements were gathered.",
    icon: Target,
  },
  {
    id: "2",
    title: "Design Phase",
    date: "Feb 2024",
    description:
      "Wireframing, prototyping, and finalizing the UI kit components.",
    icon: Palette,
  },
  {
    id: "3",
    title: "Development",
    date: "Mar 2024",
    description: "Writing the core logic and React components from scratch.",
    icon: Zap,
  },
  {
    id: "4",
    title: "Testing & QA",
    date: "Apr 2024",
    description:
      "Running automated tests and squashing complex accessibility bugs.",
    icon: Loader2,
  },
  {
    id: "5",
    title: "Production Launch",
    date: "May 2024",
    description: "Deploying the V1 architecture to the edge network.",
    icon: Rocket,
  },
  {
    id: "6",
    title: "Global Expansion",
    date: "Jun 2024",
    description: "Reaching 100k active users globally.",
    icon: MapPin,
  },
  {
    id: "7",
    title: "Milestone Achieved",
    date: "Present",
    description: "We did it.",
    icon: CheckCircle2,
  },
];`;

export const usageDefault = `import { AnimatedTimelineBlock, type AnimatedTimelineItem } from "@/components/custom/blocks/AnimatedTimelineBlock";

${timelineEvents}

export default function CompanyHistory() {
  return (

  );
}`;

export const usageLeft = `import { AnimatedTimelineBlock, type AnimatedTimelineItem } from "@/components/custom/blocks/AnimatedTimelineBlock";

${timelineEvents}

export default function LeftTimeline() {
  // Rail on the left, every card on the same side — the compact layout for
  // narrow columns and sidebars.
  return (

  );
}`;

export const usageRight = `import { AnimatedTimelineBlock, type AnimatedTimelineItem } from "@/components/custom/blocks/AnimatedTimelineBlock";

${timelineEvents}

export default function RightTimeline() {
  return (

  );
}`;

export const usageFadeUp = `import { AnimatedTimelineBlock, type AnimatedTimelineItem } from "@/components/custom/blocks/AnimatedTimelineBlock";

${timelineEvents}

export default function FadeUpTimeline() {
  return (

  );
}`;

export const usageZoom = `import { AnimatedTimelineBlock, type AnimatedTimelineItem } from "@/components/custom/blocks/AnimatedTimelineBlock";

${timelineEvents}

export default function ZoomTimeline() {
  return (

  );
}`;

export const usageBlur = `import { AnimatedTimelineBlock, type AnimatedTimelineItem } from "@/components/custom/blocks/AnimatedTimelineBlock";

${timelineEvents}

export default function BlurTimeline() {
  return (

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/animated-timeline
```

## Examples

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

    Fluid Animations
    Hardware-accelerated transitions that ensure smooth 60fps performance across devices.

    Highly Customizable
    Exposes intuitive props for tailoring colors, sizes, and animation speeds to fit your brand.

    Responsive Design
    Automatically adapts to mobile, tablet, and desktop viewports without horizontal scrolling issues.

    Accessible
    Built with semantic HTML and ARIA labels where necessary to support screen readers and keyboard navigation.

## Best Practices & Guidelines

    Usage Guidelines
    Give the timeline room to breathe — the entrance only reads as an entrance when a node crosses the observer threshold mid-scroll, so avoid placing the whole list above the fold. On narrow columns prefer layout="left"; the centered rail needs roughly 640px to avoid cramped cards.

## Props Reference

        Prop
        Type
        Default
        Description

        items
        AnimatedTimelineItem[]
        Required
        The events to render, in order. See the item shape below.

        layout
        "left" | "right" | "center"
        "center"
        Where the rail sits and whether cards alternate sides.

        animation
        "fade-up" | "slide-in" | "zoom-in" | "flip-up" | "blur-in"
        "fade-up"
        The entrance each card plays when its node scrolls into view.

        color
        "primary" | "indigo" | "rose" | "emerald" | "blue" | "zinc" | (hex string)
        "primary"
        Accent applied to the active node, its glow and the extended rail.

### AnimatedTimelineItem Object

        Property
        Type
        Default
        Description

        id
        string | number
        Required
        Stable React key for the event.

        title
        string
        Required
        Headline shown on the card.

        date
        string
        Required
        Free-form label beside the node — a quarter, month or "Present".

        description
        string
        undefined
        Optional supporting copy under the title.

        icon
        React.ElementType
        undefined
        Component rendered inside the node — any lucide icon works.

---

**Component Path:** `[framework]\animated-timeline\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
