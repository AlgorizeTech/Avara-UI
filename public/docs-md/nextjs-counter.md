# Counter Block

A multi-purpose, highly animated Counter component. Whether you need a user-interactive Stepper for e-commerce, an animated statistics ticker, a circular progress tracker, or a promotional countdown timer, this block handles it all with built-in GSAP fluid animations.

## Features
Explore the Counter component's number animation features, including customizable easing, duration, and formatting options.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Interactive Showcase

Use the control panel below to flip between the four counter layouts. **When using the `stepper` type, you unlock four unique structural variants** (`default`, `outline`, `soft`, `vertical`) to fit perfectly into horizontal product bars or tight vertical sidebars.

You can also apply global color themes (or custom hex codes) that cascade instantly across buttons, strokes, and text elements.

_Click the **Code** tab in the preview below to copy the full component engine._

## Installation

### 1. Install Dependencies

This component relies heavily on `gsap` to handle the rapid number interpolations, bouncy spring animations, and SVG stroke manipulations. It also utilizes `lucide-react` for standard UI icons.

```bash
npm install gsap lucide-react
```

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Prop
        Type
        Default
        Description

          type

          "stepper" | "animated" | "circular" | "countdown"

          "stepper"
        
        Determines the core functionality and layout of the counter.

          variant

          "default" | "outline" | "soft" | "vertical"

          "default"

          Applies unique structural layouts{" "}
          
            only to the stepper type
          
          .

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies global color themes. Accepts valid hex codes (e.g.{" "}
          "#00FF00").

          label

          string

          "Counter"
        
        The descriptive text rendered alongside the counter value.

          targetValue

          number

          100

          The final number to animate towards (used in animated and{" "}
          circular types).

          initialValue

          number

          1

          The starting value for the stepper type.

          min / max

          number

          0 / 100

          Sets the bounds for the stepper type, automatically
          disabling buttons when limits are reached.

          prefix / suffix

          string

          ""

          Strings to append before or after the number (e.g. "$" or{" "}
          "%").

          targetDate

          Date

          3 days from now

          The target expiration date for the countdown timer.

---

**Component Path:** `nextjs\counter\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
