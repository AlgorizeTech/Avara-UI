# Tooltip

A context-aware popup that displays information when an element receives keyboard focus or a mouse hover.

Most lightweight tooltips suffer from a fatal flaw: they get clipped or hidden if they are placed inside a container with `overflow-hidden`. This `TooltipBlock` completely sidesteps that issue natively. It uses React's `createPortal` to render the tooltip bubble directly onto the `document.body` layer, calculating its position dynamically so it is mathematically impossible for it to get clipped by parent components.

## Interactive Showcase

Hover over or tab to the center icon to see the tooltip render. Use the controls to test how the dynamic `getBoundingClientRect` math positions the portal perfectly across all sides and alignments.

## Installation

### Copy the Component

This suite is **100% dependency-free**. It uses native React Context for state management and `react-dom` for the portal rendering.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/TooltipBlock.tsx`.

---

## Usage

The Tooltip leverages a highly composable architecture. Ensure you wrap your application (or the immediate parent) in a ``.

```tsx

export default function IconRow() {
  return (

            {/* The trigger automatically handles focus/hover states */}

            View detailed analytics

  );
}
```

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          Tooltip

          delayDuration

          number

          200

          The time (in milliseconds) a user must hover over the trigger before
          the tooltip opens.

          TooltipContent

          side

          "top" | "bottom" | "left" | "right"

          "top"

          The preferred side of the trigger to render the tooltip content.

          TooltipContent

          align

          "start" | "center" | "end"

          "center"

          The preferred alignment against the chosen side. For example,{" "}
          side="top" align="end" anchors the bottom-right corner of
          the tooltip to the top-right corner of the trigger.

          TooltipContent

          sideOffset

          number

          6

          The distance (in pixels) from the edge of the trigger element to the
          tooltip bubble.

          All Components

          className

          string

          undefined

          Standard Tailwind overrides. Useful for overriding background colors
          or text sizing on the TooltipContent.

---

**Component Path:** `nextjs\tooltip\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
