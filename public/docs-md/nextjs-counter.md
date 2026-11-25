---
title: "Shadcn Counter"
description: "Animated counters: a slide countdown, steppers in several styles, an animated number ticker, circular progress and a countdown timer. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/counter
---

# Shadcn Counter

Animated counters: a stepper, a number ticker, circular progress and countdown timers.

The `slide` countdown is the same one the [Waitlist](https://avaraui.com/docs/nextjs/waitlist) launch panel uses.

Explore the different variations of the Counter component — each example shows a live preview with the exact code to copy.

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

## Stepper

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

## Outline stepper

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

## Soft stepper

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

## Vertical stepper

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

## Animated ticker

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

## Circular progress

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

## Countdown

- Set `type="countdown"` to tick down to a target date rather than counting up. This is the default design — framed figures under a pill with a clock.

```tsx
import { CounterBlock } from "@/components/custom/blocks/CounterBlock";

export default function LaunchCountdown() {
  return <CounterBlock type="countdown" label="Next Product Launch" />;
}
```

## About Shadcn Counter

**What it is.** **Shadcn Counter** (`CounterBlock`) is a multi-mode animated counter supporting quantity steppers, stat tickers, circular progress counters, and countdown timers (default framed or `slide` tiles).

**How it is built.** `CounterBlock` switches behavior via `type` (`"stepper"`, `"animated"`, `"circular"`, `"countdown"`) and `variant="slide"` for countdown tiles where only the figure that changed slides, hydrating safely (`--` until the first client tick). The only npm dependency is `lucide-react`.

**When to use it.** Use it for cart quantity controls, KPI stat cards, goal progress rings, and product launch or event countdowns.

## For AI agents

**When to use**

- Cart quantity controls, KPI stat cards
- Goal progress rings, product launch or event countdowns

**When not to use**

- A retro flip-board display: use [Split Flap](https://avaraui.com/docs/nextjs/split-flap)
- A plain linear progress bar: use [Progress](https://avaraui.com/docs/nextjs/progress)

**Agent notes**

- `CounterBlock` supports `type`: `"countdown"`, `"stepper"`, `"animated"`, and `"circular"`.
- For the sliding tile countdown, pass `type="countdown"` with `variant="slide"`, `targetDate`, and `doneLabel`.
- For quantity steppers, use `min` and `max` to clamp values and automatically disable boundary buttons.
- The stepper keeps its count in internal state and has no `onChange` or `value` prop, so you cannot read the number from the parent without editing the source.
- `prefix`, `bare`, `decimals`, `startOnView` and `className` apply to `type="animated"` only; `circular` reads `targetValue` as a percentage from 0 to 100.
- Use `color="inherit"` to take the surrounding text colour.

**Ask before you pick.** This page has 8 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 8 options as live previews: https://avaraui.com/view/counter

**When to use it.** A multi-purpose animated counter: a quantity stepper, a promotional countdown, an animated statistics ticker or a circular progress ring. First find out which job it must do, then offer only the designs for that job.

**When to use something else:**

- [Counter Section](https://avaraui.com/docs/nextjs/counter-section): for a whole statistics section of several numbers rather than one counter.

**Gotchas:**

- Every look is the one `counter` item: install it once and set `type` (and `variant` where the index lists one) from the index.
- The user's job decides the group: a quantity control, a countdown, or a number that counts up. Do not offer a stepper for a countdown.
- A countdown's figures read `--` until the first tick so server and client paint the same.

### The 8 variants

1. **Stepper** (`stepper`): The plus/minus quantity control, with `min` and `max` clamping the value.
   - Live: https://avaraui.com/view/counter/stepper
   - Best for: a quantity selector in a shop or cart
   - Avoid if: you need a countdown or a statistic
   - Traits: plus and minus buttons, min and max, default stepper
   - Install: `npx shadcn@latest add @avara-ui/counter`
   - Set these props: `{"type":"stepper"}`
   - Docs: https://avaraui.com/docs/nextjs/counter#stepper
2. **Outline stepper** (`outline-stepper`): A bordered, transparent stepper.
   - Live: https://avaraui.com/view/counter/outline-stepper
   - Best for: a stepper that should sit lightly on a coloured or image background
   - Avoid if: you want a filled button look
   - Traits: bordered, transparent
   - Install: `npx shadcn@latest add @avara-ui/counter`
   - Set these props: `{"type":"stepper","variant":"outline"}`
   - Docs: https://avaraui.com/docs/nextjs/counter#outline-stepper
3. **Soft stepper** (`soft-stepper`): A tinted, low-contrast stepper.
   - Live: https://avaraui.com/view/counter/soft-stepper
   - Best for: a gentle stepper inside a card or sidebar
   - Avoid if: it must stand out as the main call to action
   - Traits: tinted, low contrast
   - Install: `npx shadcn@latest add @avara-ui/counter`
   - Set these props: `{"type":"stepper","variant":"soft"}`
   - Docs: https://avaraui.com/docs/nextjs/counter#soft-stepper
4. **Vertical stepper** (`vertical-stepper`): The controls are stacked, for tight sidebars.
   - Live: https://avaraui.com/view/counter/vertical-stepper
   - Best for: a narrow column where a horizontal stepper will not fit
   - Avoid if: you have room for the usual horizontal control
   - Traits: stacked controls
   - Install: `npx shadcn@latest add @avara-ui/counter`
   - Set these props: `{"type":"stepper","variant":"vertical"}`
   - Docs: https://avaraui.com/docs/nextjs/counter#vertical-stepper
5. **Countdown** (`countdown`): Ticks down to a target date: framed figures under a pill with a clock. The default countdown.
   - Live: https://avaraui.com/view/counter/countdown
   - Best for: a sale, launch or event deadline
   - Avoid if: you are counting up or choosing a quantity
   - Traits: framed figures, clock pill, target date or three days from mount
   - Install: `npx shadcn@latest add @avara-ui/counter`
   - Set these props: `{"type":"countdown"}`
   - Docs: https://avaraui.com/docs/nextjs/counter#countdown
6. **Slide countdown** (`slide-countdown`): A countdown in the sliding tile design.
   - Live: https://avaraui.com/view/counter/slide-countdown
   - Best for: a countdown that should feel like flipping tiles
   - Avoid if: you prefer the framed-figures look
   - Traits: tile design
   - Install: `npx shadcn@latest add @avara-ui/counter`
   - Set these props: `{"type":"countdown","variant":"slide"}`
   - Docs: https://avaraui.com/docs/nextjs/counter#slide-countdown
7. **Animated ticker** (`animated`): A number that counts up from zero to `targetValue` when it scrolls into view.
   - Live: https://avaraui.com/view/counter/animated
   - Best for: a headline statistic such as users or revenue
   - Avoid if: you need a control or a deadline
   - Traits: counts up on scroll
   - Install: `npx shadcn@latest add @avara-ui/counter`
   - Set these props: `{"type":"animated"}`
   - Docs: https://avaraui.com/docs/nextjs/counter#animated-ticker
8. **Circular progress** (`circular`): The value drawn as an animated SVG ring instead of a number alone.
   - Live: https://avaraui.com/view/counter/circular
   - Best for: a goal or completion figure that reads well as a ring
   - Avoid if: you want a plain number
   - Traits: animated ring
   - Install: `npx shadcn@latest add @avara-ui/counter`
   - Set these props: `{"type":"circular"}`
   - Docs: https://avaraui.com/docs/nextjs/counter#circular-progress

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"stepper" \| "animated" \| "circular" \| "countdown"` | `"stepper"` | Determines the core functionality and layout of the counter. |
| `variant` | `"default" \| "outline" \| "soft" \| "vertical" \| "slide"` | `"default"` | `outline`, `soft` and `vertical` are layouts for the `stepper` type; `slide` is the `countdown`'s tile design, where a figure that changes slides out above as the new one comes up from below. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| "inherit" \| string` | `"primary"` | Applies global color themes. Accepts valid hex codes (e.g. `"#00FF00"`). `inherit` takes the surrounding text colour, for a counter inside a section that sets its own. |
| `label` | `string` | `"Counter"` | The descriptive text rendered alongside the counter value. |
| `targetValue` | `number` | `100` | The final number to animate towards (used in `animated` and `circular` types). In `circular` it is read as a percentage and clamped to 0–100. |
| `initialValue` | `number` | `1` | The starting value for the `stepper` type. |
| `min` / `max` | `number` | `0` / `100` | Sets the bounds for the `stepper` type, automatically disabling buttons when limits are reached. |
| `prefix` / `suffix` | `string` | `""` | Strings to put before or after the number (e.g. `"$"` or `"%"`). `prefix` works on `animated` only; `suffix` works on `animated` and `circular`. |
| `bare` | `boolean` | `false` | Animated only: render just the figure as a `span`, no card — it inherits the surrounding type. For a number inside your own layout. |
| `decimals` | `number` | `0` | Animated only: decimal places shown while counting, e.g. `1` for 5.5. |
| `startOnView` | `boolean` | `false` | Animated only: wait until the counter is on screen before counting, so a figure below the fold is seen counting. Under prefers-reduced-motion the target is shown at once. |
| `className` | `string` | — | Animated only: classes for the figure (`bare`) or the card. |
| `targetDate` | `Date \| string \| number` | `3 days from now` | Countdown only: when the timer reaches zero — a `Date`, an ISO string or a timestamp. |
| `doneLabel` | `string` | `"Time's up"` | Countdown only: what the label becomes once the date has passed. The `slide` variant also hides its figures then. |

## Works with other components

- Combine `CounterBlock` with [Split-Flap Display](https://avaraui.com/docs/nextjs/split-flap) for mechanical counters.
- Pair it with [Progress](https://avaraui.com/docs/nextjs/progress) for linear goal bars and [Card](https://avaraui.com/docs/nextjs/card) for KPI metric tiles.
- Use the `slide` countdown in [Waitlist](https://avaraui.com/docs/nextjs/waitlist)-style launch panels, or see [Counter Section](https://avaraui.com/docs/nextjs/counter-section) for full-width stats layouts.

## How does the slide countdown avoid SSR hydration mismatches?

The countdown only reads the clock inside an effect, so with `variant="slide"` every tile renders `--` until the first client tick. Server HTML and the first client paint then match. The default framed countdown shows `00` in each tile for the same first render.

## What happens when the countdown reaches targetDate?

`doneLabel` (default `"Time's up"`) replaces `label`. With `variant="slide"` the figures are removed and only that text remains. The default framed countdown keeps its four tiles on screen, reading `00`. Pass `targetDate` as a `Date`, ISO string or timestamp; without it, the timer counts down three days from mount.

## How do I get the current value out of the stepper?

You cannot with the current API. The stepper keeps its count in internal state, starting at `initialValue`, and exposes no `onChange` or `value` prop. If a cart or form needs the number, edit `StepperCounter` in the installed file to call a callback when the count changes.

## How do I make the animated counter start when it scrolls into view?

Set `startOnView` on a `type="animated"` counter. It then waits until about 30% of the element is visible before counting up to `targetValue`. Without it, the count starts on mount. Use `decimals` for fractional figures, and `bare` to render just the number as a `span` inside your own layout.

## Does Counter respect prefers-reduced-motion?

Partly. The animated ticker skips the tween and shows `targetValue` straight away, and the slide countdown drops its slide animation. The stepper's small scale pop on each press and the circular ring's fill animation do not check the preference. The slide countdown is a `role="timer"` with `aria-live="off"`, so screen readers are not told every second.

## How do I use the circular counter and what range does it take?

Set `type="circular"` with `targetValue` and an optional `suffix` such as `"%"`. The ring is drawn from the value as a percentage, so numbers are clamped between 0 and 100 for the arc, and the centre shows the animated whole number. Use `color` to recolour the stroke.

---

Live previews and every example: https://avaraui.com/docs/nextjs/counter
