# Animated Timeline

A highly dynamic, scroll-aware timeline engine featuring Intersection Observers and multiple 3D/2D entry animations.

Unlike standard static timelines, this `AnimatedTimelineBlock` uses native browser APIs (`IntersectionObserver`) to orchestrate complex animations only when the user scrolls the elements into view. As the user scrolls down your page, the vertical tracking line dynamically extends, the nodes glow, and the cards flip, blur, or slide into position.

## Examples

Every preview scrolls internally — **scroll down inside a preview** and watch the tracking line extend as each node crosses the observer threshold. The first example's **Code** tab contains the full component source.

export const usageDefault = `import { AnimatedTimelineBlock } from "@/components/custom/blocks/AnimatedTimelineBlock";

const EVENTS = [
  { id: "1", title: "Project Start", date: "Q1", icon: Zap },
  {
    id: "2",
    title: "Beta Launch",
    date: "Q2",
    description: "Shipped to 100 users.",
  },
  { id: "3", title: "Global Scaling", date: "Q3", icon: Rocket },
];

export default function CompanyHistory() {
  return (

  );
}`;

export const usageLeft = `// Rail on the left, every card on the same side — the compact layout for
// narrow columns and sidebars.
`;

export const usageRight = ``;

export const usageFadeUp = ``;

export const usageZoom = ``;

export const usageBlur = ``;

## Installation

### Copy the Component

This component is completely dependency-free. It uses standard React hooks alongside the native JavaScript `IntersectionObserver` API, meaning it has zero impact on your bundle size compared to heavy animation libraries like Framer Motion or GSAP.

Copy the full engine code from the **Code** tab of the first example above into `components/custom/blocks/AnimatedTimelineBlock.tsx`.

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

**Component Path:** `nextjs\animated-timeline\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
