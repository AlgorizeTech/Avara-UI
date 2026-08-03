# Popover

Displays rich, interactive content in a portal, triggered by a click.

While tooltips are meant for small text hints on hover, Popovers are designed to hold rich HTML (like forms, grids, and settings menus) triggered by a click. This `PopoverBlock` solves the biggest problem with complex layouts: clipping. By utilizing React's `createPortal`, the popover content is rendered at the root `document.body` level, meaning it will **never** be hidden or cropped by parent layout constraints like `overflow-hidden`.

## Interactive Showcase

Click the "Configure Settings" trigger below to open the Popover. You can interact with the inputs inside without it closing. Try clicking outside the bubble, or pressing the `Escape` key, to see it automatically dismiss itself.

## Installation

### Copy the Component

This component is **100% dependency-free**. It uses native `createPortal` for rendering and highly optimized `getBoundingClientRect` logic to place the portal exactly next to the trigger button.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/PopoverBlock.tsx`.

---

## Usage

Wrap the elements inside the `` root. The `` will automatically capture the click event and calculate its dimensions to pass coordinates to the ``.

```tsx

export default function FilterMenu() {
  return (

           Filters

          Filter Options

              Show active only

            Apply Filters

  );
}
```

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

          All Components

          className

          string

          undefined

          Standard Tailwind CSS overrides. By default,{" "}
          PopoverContent has a fixed width (w-72),
          which you can easily override here.

---

**Component Path:** `nextjs\popover\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
