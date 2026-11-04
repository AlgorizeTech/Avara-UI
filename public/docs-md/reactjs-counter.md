---
title: "Counter Block"
description: "Animated counters: a slide countdown, steppers in several styles, an animated number ticker, circular progress and a countdown timer. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/counter
---

# Counter Block

A multi-purpose, highly animated Counter component. Whether you need a user-interactive Stepper for e-commerce, an animated statistics ticker, a circular progress tracker, or a promotional countdown timer, this block handles it all with built-in fluid animations. The countdown comes in two designs: framed figures under a pill, or `slide` — soft tiles where only the figure that changed slides, the same countdown the [Waitlist](https://avaraui.com/docs/reactjs/waitlist) launch panel uses.

Explore the different variations of the Counter component — each example shows a live preview with the exact code to copy.

## Slide countdown

Days, hours, minutes and seconds to a date on soft tiles. Watch the seconds: only the figure that changed slides, the others hold still.

- Set `type="countdown"` with `variant="slide"` for the tile design. The figures read `--` until the first tick, so server and client paint the same.
- `targetDate` is a `Date`, ISO string or timestamp; left out, it counts three days from mount.
- `doneLabel` replaces `label` once the date has passed, and the figures go away.

```tsx
import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function OpensIn() {
  return (
    <CounterBlock
      type="countdown"
      variant="slide"
      label="Launches in"
      doneLabel="We're live"
      targetDate="2026-11-01T09:00:00Z"
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/counter.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/counter
```

## Examples

### Stepper

An interactive quantity picker.

- `type="stepper"` renders the plus/minus quantity control.
- `min` and `max` clamp the value — the buttons disable at each end.
- `initialValue` is where it starts; state is internal from then on.
- `label` captions the control above the buttons.

```tsx
import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function QuantityStepper() {
  return (
    <CounterBlock
      type="stepper"
      label="Select Quantity"
      initialValue={1}
      min={1}
      max={10}
    />
  );
}
```

### Outline stepper

- Use `variant="outline"` for a bordered, transparent stepper.

```tsx
import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function OutlineStepper() {
  return (
    <CounterBlock
      type="stepper"
      variant="outline"
      label="Select Quantity"
      initialValue={1}
      min={1}
      max={10}
    />
  );
}
```

### Soft stepper

- Use `variant="soft"` for a tinted, low-contrast stepper.

```tsx
import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function SoftStepper() {
  return (
    <CounterBlock
      type="stepper"
      variant="soft"
      label="Select Quantity"
      initialValue={1}
      min={1}
      max={10}
    />
  );
}
```

### Vertical stepper

- Use `variant="vertical"` to stack the controls for tight sidebars.

```tsx
import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function VerticalStepper() {
  return (
    <CounterBlock
      type="stepper"
      variant="vertical"
      label="Select Quantity"
      initialValue={1}
      min={1}
      max={10}
    />
  );
}
```

### Animated ticker

- Set `type="animated"` to interpolate from zero up to `targetValue` when it scrolls into view.

```tsx
import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function SubscriberTicker() {
  return (
    <CounterBlock
      type="animated"
      label="Total Subscribers"
      targetValue={12500}
      prefix="+"
    />
  );
}
```

### Circular progress

- Set `type="circular"` to draw the value as an animated SVG ring instead of a number alone.

```tsx
import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function StorageMeter() {
  return (
    <CounterBlock
      type="circular"
      label="Storage Used"
      targetValue={78}
      suffix="%"
    />
  );
}
```

### Countdown

- Set `type="countdown"` to tick down to a target date rather than counting up. This is the default design — framed figures under a pill with a clock.

```tsx
import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function LaunchCountdown() {
  return <CounterBlock type="countdown" label="Next Product Launch" />;
}
```

## Features
Explore the Counter component's number animation features, including customizable easing, duration, and formatting options.

### Customizable

Easily adapt the component's styling and behavior to fit your application's unique design system.

### Accessible

Built with accessibility in mind, ensuring all users can interact with your application effectively.

### Responsive

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

### Performant

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

### Usage Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"stepper" \| "animated" \| "circular" \| "countdown"` | `"stepper"` | Determines the core functionality and layout of the counter. |
| `variant` | `"default" \| "outline" \| "soft" \| "vertical" \| "slide"` | `"default"` | `outline`, `soft` and `vertical` are layouts for the `stepper` type; `slide` is the `countdown`'s tile design, where a figure that changes slides out above as the new one comes up from below. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| "inherit" \| string` | `"primary"` | Applies global color themes. Accepts valid hex codes (e.g. `"#00FF00"`). `inherit` takes the surrounding text colour, for a counter inside a section that sets its own. |
| `label` | `string` | `"Counter"` | The descriptive text rendered alongside the counter value. |
| `targetValue` | `number` | `100` | The final number to animate towards (used in `animated` and `circular` types). |
| `initialValue` | `number` | `1` | The starting value for the `stepper` type. |
| `min` / `max` | `number` | `0` / `100` | Sets the bounds for the `stepper` type, automatically disabling buttons when limits are reached. |
| `prefix` / `suffix` | `string` | `""` | Strings to append before or after the number (e.g. `"$"` or `"%"`). |
| `bare` | `boolean` | `false` | Animated only: render just the figure as a `span`, no card — it inherits the surrounding type. For a number inside your own layout. |
| `decimals` | `number` | `0` | Animated only: decimal places shown while counting, e.g. `1` for 5.5. |
| `startOnView` | `boolean` | `false` | Animated only: wait until the counter is on screen before counting, so a figure below the fold is seen counting. Under prefers-reduced-motion the target is shown at once. |
| `className` | `string` | — | Animated only: classes for the figure (`bare`) or the card. |
| `targetDate` | `Date \| string \| number` | `3 days from now` | Countdown only: when the timer reaches zero — a `Date`, an ISO string or a timestamp. |
| `doneLabel` | `string` | `"Time's up"` | Countdown only: what the label becomes once the date has passed. The `slide` variant also hides its figures then. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/counter
