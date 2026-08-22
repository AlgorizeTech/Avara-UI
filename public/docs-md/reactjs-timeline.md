# Advanced Timeline

A robust, multi-layout vertical timeline component for tracking complex events, order statuses, and company histories.

This upgraded `TimelineBlock` acts as a multi-tool for event visualization. It supports three distinct structural layouts (`left`, `center`, and `right`), embedded action buttons, CSS-grid powered expandable details, and intelligent line-coloring based on item completion statuses.

## Examples

Each item's `status` drives its own styling: `completed` fills the icon and solidifies the line above it, `current` pulses, and `upcoming` fades.

export const timelineEvents = `const events = [
  {
    id: "1",
    title: "Order Placed",
    date: "10:24 AM",
    icon: Package,
    status: "completed",
    action: Invoice,
  },
  {
    id: "2",
    title: "Out for Delivery",
    date: "10:25 AM",
    icon: Truck,
    status: "current",
    // \`content\` expands behind a grid transition when the row is opened.
    content: Driver is 4 stops away.,
  },
  {
    id: "3",
    title: "Delivered",
    date: "Pending",
    icon: CheckCircle2,
    status: "upcoming",
  },
];`;

export const usageDefault = `import { TimelineBlock } from "@/components/custom/blocks/TimelineBlock";

${timelineEvents}

export default function OrderTracker() {
  return ;
}`;

export const usageCenter = `import { TimelineBlock } from "@/components/custom/blocks/TimelineBlock";

${timelineEvents}

export default function CenterTimeline() {
  // Zig-zags the cards once the timeline itself is at least 576px wide, and
  // collapses to a single left rail below that. The breakpoint is a container
  // query, so it tracks the column the timeline sits in — not the window.
  return ;
}`;

export const usageRight = `import { TimelineBlock } from "@/components/custom/blocks/TimelineBlock";

${timelineEvents}

export default function RightTimeline() {
  return ;
}`;

export const usageMinimal = `import { TimelineBlock } from "@/components/custom/blocks/TimelineBlock";

${timelineEvents}

export default function MinimalTimeline() {
  // Drops the card surface; the rail and type carry the structure.
  return ;
}`;

export const usageGlass = `import { TimelineBlock } from "@/components/custom/blocks/TimelineBlock";

${timelineEvents}

export default function GlassTimeline() {
  return (

  );
}`;

export const usageNoAnimation = `import { TimelineBlock } from "@/components/custom/blocks/TimelineBlock";

${timelineEvents}

export default function StaticTimeline() {
  // Renders in place — no staggered GSAP entrance.
  return ;
}`;

## Installation

### Requires Tailwind CSS v4

The breakpoints are **container queries** (`@container/timeline`, `@container/tlcard`) rather than media queries, so the rail reacts to the width of the column it is dropped into instead of the width of the window — a timeline in a 600px sidebar behaves the same whether the browser is 800px or 2560px wide. Container queries are built into Tailwind v4; on v3 the rail will not respond.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          TimelineBlock

          items

          TimelineItemType[]

          Required

          An array of configuration objects representing each event on the
          timeline. See the TimelineItemType reference below.

          TimelineBlock

          layout

          "left" | "center" | "right"

          "left"

          Determines the structural alignment of the timeline. Using{" "}
          center creates an alternating zig-zag layout on desktop
          and elegantly falls back to left-aligned on mobile.

          TimelineBlock

          variant

          "default" | "minimal" | "glass"

          "default"

          Determines the architectural style of the event cards, backgrounds,
          and the vertical tracking line.

          TimelineBlock

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          The dynamic accent color applied to completed/current tracking lines,
          glowing nodes, and hover states. Fully supports custom hex codes.

          TimelineBlock

          animate

          boolean

          true

          If true, the timeline nodes will execute a staggered fade-and-slide
          entry animation powered by GSAP when the component mounts.

### TimelineItemType Object

        Object
        Property
        Type
        Default
        Description

          TimelineItemType

          id

          string | number

          Required

          A unique identifier for the event. Used internally for React keys and
          handling the expansion state safely.

          TimelineItemType

          title

          string

          Required
        
        The primary headline for the specific timeline event.

          TimelineItemType

          date

          string

          Required

          The timestamp, date string, or status badge displayed inside the event
          header.

          TimelineItemType

          status

          "completed" | "current" | "upcoming"

          "completed"

          Drives the visual styling. completed fills the vertical
          line, current adds a pulsing glow, and{" "}
          upcoming fades the node out.

          TimelineItemType

          description

          string

          undefined

          An optional secondary text string displayed directly beneath the
          title.

          TimelineItemType

          icon

          React.ElementType

          undefined

          An optional Lucide (or custom SVG) icon to render inside the circular
          indicator node. If omitted, a clean solid dot is used.

          TimelineItemType

          content

          ReactNode

          undefined

          If provided, the entire event header becomes a clickable trigger that
          smoothly expands to reveal this detailed content.

          TimelineItemType

          action

          ReactNode

          undefined

          An optional slot for rendering buttons, links, or specific badges
          immediately below the header area.

---

**Component Path:** `[framework]\timeline\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
