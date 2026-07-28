# Advanced Timeline

A robust, multi-layout vertical timeline component for tracking complex events, order statuses, and company histories.

This upgraded `TimelineBlock` acts as a multi-tool for event visualization. It supports three distinct structural layouts (`left`, `center`, and `right`), embedded action buttons, CSS-grid powered expandable details, and intelligent line-coloring based on item completion statuses.

## Interactive Showcase

Use the control panel below to test the different themes and layouts. Notice how the `center` layout perfectly zig-zags the content on desktop, but elegantly collapses back to a standard left-aligned view on mobile devices!

## Installation

### Copy the Component

This component dynamically manages absolute positioning and responsive classes natively through Tailwind. It uses a lightweight GSAP implementation strictly for the staggered entry animation.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/TimelineBlock.tsx`.

---

## Usage

Pass an array of items to the component. Use the `status` prop on individual items to automatically format them as `completed` (solid line and filled icon), `current` (pulsing glow), or `upcoming` (faded out).

```tsx

export default function OrderTracker() {
  const events = [
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
      content: Driver is 4 stops away.,
    },
    {
      id: "3",
      title: "Delivered",
      date: "Pending",
      icon: CheckCircle2,
      status: "upcoming",
    },
  ];

  return (

  );
}
```

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

**Component Path:** `nextjs\timeline\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
