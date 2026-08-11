# Tooltip

A context-aware popup that displays information when an element receives keyboard focus or a mouse hover.

Most lightweight tooltips suffer from a fatal flaw: they get clipped or hidden if they are placed inside a container with `overflow-hidden`. This `TooltipBlock` completely sidesteps that issue natively. It uses React's `createPortal` to render the tooltip bubble directly onto the `document.body` layer, calculating its position dynamically so it is mathematically impossible for it to get clipped by parent components.

## Examples

Hover or tab to each trigger to open its tooltip. The first example's **Code** tab contains the full component source.

export const usageDefault = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function TooltipDemo() {
  return (
    // Wrap your app (or the nearest parent) once.

          Create new project

  );
}`;

export const usageSides = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function TooltipSides() {
  return (

              top

          Side: top

              right

          Side: right

              bottom

          Side: bottom

              left

          Side: left

  );
}`;

export const usageAlign = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function TooltipAlign() {
  return (

              align="start"

            Aligned start

              align="center"

            Aligned center

              align="end"

            Aligned end

  );
}`;

export const usageDelay = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function TooltipDelay() {
  return (

        {/* Opens the moment the pointer lands */}

              0ms

          Opens instantly

        {/* Waits, so a passing cursor doesn't flash the bubble */}

              700ms

          Waits 700ms

  );
}`;

export const usageRich = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function RichTooltip() {
  return (

        {/* className lands on the bubble — widen it and lay out real content */}
        
          System preferences
          
            Theme, notifications and keyboard shortcuts live here.

  );
}`;

export const usageOffset = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";

export default function OffsetTooltip() {
  return (

        {/* sideOffset is the gap in px between trigger and bubble */}
        
          Create new project

  );
}`;

## Installation

### Copy the Component

This suite is **100% dependency-free**. It uses native React Context for state management and `react-dom` for the portal rendering.

Create a new file at `components/custom/blocks/TooltipBlock.tsx` and copy the engine code from the **Code** tab of the first example above.

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
