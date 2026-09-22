# Counter Block

A multi-purpose, highly animated Counter component. Whether you need a user-interactive Stepper for e-commerce, an animated statistics ticker, a circular progress tracker, or a promotional countdown timer, this block handles it all with built-in fluid animations. The countdown comes in two designs: framed figures under a pill, or `slide` — soft tiles where only the figure that changed slides, the same countdown the Waitlist launch panel uses.

Explore the different variations of the Counter component — each example shows a live preview with the exact code to copy.

export const usageStepper = `import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function QuantityStepper() {
  return (
    
  );
}`;

export const usageOutline = `import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function OutlineStepper() {
  return (
    
  );
}`;

export const usageSoft = `import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function SoftStepper() {
  return (
    
  );
}`;

export const usageVertical = `import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function VerticalStepper() {
  return (
    
  );
}`;

export const usageAnimated = `import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function SubscriberTicker() {
  return (
    
  );
}`;

export const usageCircular = `import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function StorageMeter() {
  return (
    
  );
}`;

export const usageCountdown = `import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function LaunchCountdown() {
  return ;
}`;

export const usageSlide = `import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function OpensIn() {
  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/counter
```

## Examples

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

          "default" | "outline" | "soft" | "vertical" | "slide"

          "default"

          outline, soft and vertical are layouts for the{" "}
          stepper type; slide is the countdown's tile design, where a figure that changes slides out above as the new one comes up from below.

          color

          "primary" | "indigo" | "rose" | "emerald" | "zinc" | "inherit" | string

          "primary"

          Applies global color themes. Accepts valid hex codes (e.g.{" "}
          "#00FF00"). inherit takes the surrounding text colour, for a counter inside a section that sets its own.

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

          bare

          boolean

          false

          Animated only: render just the figure as a span, no card — it inherits the surrounding type. For a number inside your own layout.

          decimals

          number

          0

          Animated only: decimal places shown while counting, e.g. 1 for 5.5.

          startOnView

          boolean

          false

          Animated only: wait until the counter is on screen before counting, so a figure below the fold is seen counting. Under prefers-reduced-motion the target is shown at once.

          className

          string
        
        —
        
          Animated only: classes for the figure (bare) or the card.

          targetDate

          Date | string | number

          3 days from now

          Countdown only: when the timer reaches zero — a Date, an ISO string or a timestamp.

          doneLabel

          string

          "Time's up"

          Countdown only: what the label becomes once the date has passed. The slide variant also hides its figures then.

---

**Component Path:** `[framework]\counter\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
