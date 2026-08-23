# Popover

Displays rich, interactive content in a portal, triggered by a click.

While tooltips are meant for small text hints on hover, Popovers are designed to hold rich HTML (like forms, grids, and settings menus) triggered by a click. This `PopoverBlock` solves the biggest problem with complex layouts: clipping. By utilizing React's `createPortal`, the popover content is rendered at the root `document.body` level, meaning it will **never** be hidden or cropped by parent layout constraints like `overflow-hidden`.

The same goes for the screen edge. `side` and `align` are *preferences*: the panel flips to the opposite side when the preferred one has no room, shifts back inside the viewport when it still overhangs, and caps its own width and height to the screen — so a `w-72` panel opened `side="left"` next to a phone-width trigger stays fully readable instead of running off the edge. Pass `avoidCollisions={false}` to opt out.

Click a trigger to open its popover — you can interact with the content inside without it closing. Click outside or press `Escape` to dismiss.

export const usageMenu = `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/custom/blocks/PopoverBlock";

export default function AccountMenu() {
  return (

      {/* className overrides the default w-72 */}

              Andy Bernard
              andy@dundermifflin.com

          View Profile
          Billing Settings
          Log out

  );
}`;

export const dimensionsPanel = `// The panel body, lifted out so both examples can render the same content.
function DimensionsPanel() {
  return (

        Dimensions
        Set the size of the layer.
      
      {[
        { label: "Width", value: "100%" },
        { label: "Max width", value: "640px" },
        { label: "Height", value: "auto" },
      ].map((row) => (
        
          {row.label}

      ))}
    
  );
}`;

export const usageOffset = `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/custom/blocks/PopoverBlock";

${dimensionsPanel}

export default function OffsetPopover() {
  return (

          Configure Settings

      {/* sideOffset pushes the panel further from the trigger (default 8) */}

  );
}`;

## Installation

## Examples

## Features
Discover the Popover's intelligent positioning engine that prevents collision with screen edges while displaying contextual content.

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

        Component
        Prop
        Type
        Default
        Description

          PopoverContent

          side

          "top" | "bottom" | "left" | "right"

          "bottom"

          The preferred side of the trigger to render the popover content.

          PopoverContent

          align

          "start" | "center" | "end"

          "center"

          The preferred alignment against the chosen side. For example,{" "}
          side="bottom" align="start" aligns the left edge of the
          popover with the left edge of the trigger.

          PopoverContent

          sideOffset

          number

          8

          The distance (in pixels) to render the popover away from the trigger
          element.

          PopoverContent

          avoidCollisions

          boolean

          true

          Flips the panel to the opposite side and shifts it back into view when
          the preferred placement would overflow the viewport — this is what
          keeps side="left" / "right" and{" "}
          align="start" / "end" from being cropped on phones. Set
          to false to pin the panel to side/
          align regardless.

          PopoverContent

          collisionPadding

          number

          8

          Minimum gap (in pixels) kept between the panel and the viewport edges
          when avoidCollisions is on.

          All Components

          className

          string

          undefined

          Standard Tailwind CSS overrides. By default,{" "}
          PopoverContent has a fixed width (w-72),
          which you can easily override here.

---

**Component Path:** `[framework]\popover\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
