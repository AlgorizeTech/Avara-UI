---
title: "Shadcn Loader"
description: "Dependency-free loading indicators: a spinner, dots, a pulse and a bar. Free shadcn/ui Loader component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/loader
---

# Shadcn Loader

A dependency-free loading indicator (`LoaderBlock`) consolidating `spinner`, `orbit`, `dots`, `pulse`, and `bar` animations with theme color syncing.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/loader.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/loader
```

## Spinner

- `variant="spinner"` is the default — a rotating arc over a faint circle. The neutral choice when you have no reason to pick another.
- `color` Tints the strokes, dots and borders. Takes a named key — `primary`, `indigo`, `rose`, `emerald`, `zinc`, `blue`, `amber` — or any `#hex`. Anything unrecognised falls back to `primary`, which follows your theme token.

```tsx
import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function BasicLoader() {
  return <LoaderBlock variant="spinner" />;
}
```

## Orbit (Concentric Rings & Pulse) — variant="orbit"

- Use `variant="orbit"` for our signature concentric dual-ring spinner with synchronized arcs and a glowing pulsing core (also aliased to "ring").
- `direction="single"` Controls spin direction. Defaults to `"single"` (both rings rotate in the same direction). Set to `"dual"` for opposite counter-rotation.
- `secondaryColor="#10b981"` Tints the inner ring. Defaults to emerald `#10b981` for the signature dual-tone aesthetic.

```tsx
import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function OrbitLoader() {
  return (
    <LoaderBlock
      variant="orbit"
      size="md"
      secondaryColor="#10b981"
      direction="single"
    />
  );
}
```

## Dots

- Use `variant="dots"` for a staggered bouncing sequence — three dots, 0.15s apart. Stays legible at small sizes, so it reads well inline with text.

```tsx
import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function DotsLoader() {
  return <LoaderBlock variant="dots" />;
}
```

## Pulse

- Use `variant="pulse"` for a soft breathing circle — a half-size centre dot with a full-size halo pinging behind it. The quietest of the five: no rotation, no travel.

```tsx
import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function PulseLoader() {
  return <LoaderBlock variant="pulse" />;
}
```

## Bar

- Use `variant="bar"` for an indeterminate progress line — a zinc track with a sweeping 50%-width fill on a 1.5s loop. The only non-square variant, and it renders at a fixed width, so `w-full` won't stretch it.

```tsx
import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function BarLoader() {
  return <LoaderBlock variant="bar" />;
}
```

## About Shadcn Loader

**What it is.** `LoaderBlock` provides `spinner`, `orbit` (also spelled `ring`), `dots`, `pulse` and `bar` loading indicators in four sizes (`sm` to `xl`), with an optional `text` line beneath.

**How it is built.** Plain CSS and SVG animations with no npm dependency; the registry install adds only the `utils` helper and a small `loader-theme.ts` colour map. `color` takes a named key (`primary`, `indigo`, `rose`, `emerald`, `zinc`, `blue`, `amber` and a few more) or a `#hex` value. `primary` follows your theme token.

**When to use it.** Use `LoaderBlock` for indeterminate loading states (inline buttons, card overlays, full-width bars). For determinate percentage bars or rings, use [Progress](https://avaraui.com/docs/reactjs/progress); for content placeholders, use [Skeleton](https://avaraui.com/docs/reactjs/skeleton).

## For AI agents

**When to use**

- Indeterminate loading indicators (`spinner`, `orbit`, `dots`, `pulse`, `bar`) across buttons, cards, and async panels

**When not to use**

- Determinate percentage or step progress: use [Progress](https://avaraui.com/docs/reactjs/progress)
- Layout-matching content placeholders: use [Skeleton](https://avaraui.com/docs/reactjs/skeleton)

**Agent notes**

- Named export: `import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock"`. Only `className` and `style` reach the wrapper; other props such as `role` or `aria-label` are not forwarded.
- `variant="orbit"` (or `"ring"`) supports `direction="single" | "dual"` and `secondaryColor`. Only `"dual"` counter-rotates the inner ring.
- `color` accepts a key from a fixed colour map or a string starting with `#`. Anything else, including `rgb()` or `hsl()`, falls back to `primary`.
- The `bar` variant has a fixed width per `size`, and the loader has no built-in screen reader announcement, so wrap it in an element with `role="status"` when it matters.

**Ask before you pick.** This page has 5 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 5 options as live previews: https://avaraui.com/view/loader

**When to use it.** A dependency-free loading indicator in five designs: a spinner, a dual-ring orbit, bouncing dots, a pulse and an indeterminate bar.

**Gotchas:**

- All five are looks of the one `loader` item: install it once and set `variant` from the index.
- `bar` renders at a fixed width, so `w-full` will not stretch it.

### The 5 variants

1. **Spinner** (`spinner`): A rotating arc over a faint circle: the neutral default when you have no reason to pick another.
   - Live: https://avaraui.com/view/loader/spinner
   - Best for: a general-purpose loading state, including a small `sm` size inside a button
   - Avoid if: you want something with more personality than a plain ring
   - Traits: rotating arc, default look, takes a colour name or any hex
   - Install: `npx shadcn@latest add @avara-ui/loader`
   - Set these props: `{"variant":"spinner"}`
   - Docs: https://avaraui.com/docs/nextjs/loader#spinner
2. **Orbit** (`orbit`): Two concentric rings with synchronised arcs and a glowing pulsing core; also reachable as `ring`.
   - Live: https://avaraui.com/view/loader/orbit
   - Best for: a prominent async state that should feel like part of the brand
   - Avoid if: the loader sits inline with text, where two rings are busy
   - Traits: dual ring, glowing core, `direction` single or dual, inner ring defaults to emerald
   - Install: `npx shadcn@latest add @avara-ui/loader`
   - Set these props: `{"variant":"orbit"}`
   - Docs: https://avaraui.com/docs/nextjs/loader#orbit-concentric-rings-pulse-variant-orbit
3. **Dots** (`dots`): Three dots bouncing in sequence, 0.15s apart; legible at small sizes.
   - Live: https://avaraui.com/view/loader/dots
   - Best for: a short wait inline with text or inside a button
   - Avoid if: you want a single centred loader for a whole page
   - Traits: three bouncing dots, reads well small
   - Install: `npx shadcn@latest add @avara-ui/loader`
   - Set these props: `{"variant":"dots"}`
   - Docs: https://avaraui.com/docs/nextjs/loader#dots
4. **Pulse** (`pulse`): A half-size centre dot with a full-size halo pinging behind it: no rotation, no travel.
   - Live: https://avaraui.com/view/loader/pulse
   - Best for: a calm, low-motion loading state
   - Avoid if: you need to show progress along a line
   - Traits: breathing circle, no rotation, quietest of the five
   - Install: `npx shadcn@latest add @avara-ui/loader`
   - Set these props: `{"variant":"pulse"}`
   - Docs: https://avaraui.com/docs/nextjs/loader#pulse
5. **Bar** (`bar`): An indeterminate progress line: a zinc track with a half-width fill sweeping across on a 1.5s loop.
   - Live: https://avaraui.com/view/loader/bar
   - Best for: a full-page or section data fetch where a line along the top or bottom suits
   - Avoid if: you need it to stretch to full width, since it has a fixed width
   - Traits: indeterminate line, fixed width, the only non-square variant
   - Install: `npx shadcn@latest add @avara-ui/loader`
   - Set these props: `{"variant":"bar"}`
   - Docs: https://avaraui.com/docs/nextjs/loader#bar

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"spinner" \| "orbit" \| "dots" \| "pulse" \| "ring" \| "bar"` | `"spinner"` | The loading animation. `"orbit"` and `"ring"` are the same concentric two-ring spinner with a pulsing core. |
| `direction` | `"single" \| "dual"` | `"single"` | Rotation direction for the rings in the `"orbit"` and `"ring"` variants. `"single"` spins both rings the same way; `"dual"` spins the inner ring the opposite way. |
| `secondaryColor` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "amber" \| "blue" \| "zinc" \| string` | `"#10b981"` | Colour of the inner ring in the `"orbit"` and `"ring"` variants. Defaults to emerald (`#10b981`), or indigo (`#6366f1`) when `color` is `"emerald"`. |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Proportionally scales the container width, height, and the helper text size. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "amber" \| "blue" \| "zinc" \| string` | `"primary"` | Colours the strokes, dots and bar fill. Accepts the names shown plus lavender, violet, purple, cyan, teal, orange, red, pink, yellow and green, or a hex code starting with #. Unrecognised values fall back to `"primary"`, which follows your theme's `--primary` token. |
| `text` | `string` | `undefined` | Optional text to display beneath the loader. It automatically receives a subtle pulsing animation. |
| `py` | `string \| number` | `"py-5"` (20px) | Top and bottom vertical padding so the loader never sticks flush against the screen edge upon install. Accepts Tailwind classes (e.g. `"py-2"`, `"py-8"`, `"py-0"`), numbers (e.g. `10`), or pixel strings (e.g. `"30px"`). |
| `className` | `string` | `undefined` | Optional CSS classes to apply to the outermost wrapper container (can also be used to override padding, e.g. `"py-2"`, `"py-10"`). |

## Works with other components

- Pair `LoaderBlock` with [Button](https://avaraui.com/docs/reactjs/button), [Dialog](https://avaraui.com/docs/reactjs/dialog), or [Data Table](https://avaraui.com/docs/reactjs/data-table) loading overlays.
- Use [Skeleton](https://avaraui.com/docs/reactjs/skeleton) instead when you want to preserve card/list layout geometry while data loads.
- Switch to [Progress](https://avaraui.com/docs/reactjs/progress) once you know how far along the task is.

## Which Loader variant should I use inline vs in hero cards?

Use `spinner` or `dots` for inline text and small buttons, `pulse` for a quiet status indicator, `bar` for a strip along the top of a card, and `orbit` for a prominent, centred loading state. All of them are indeterminate, so none shows real progress.

## How do I make the Loader orbit spin in opposite directions?

Set `variant="orbit"` with `direction="dual"`. The outer ring keeps spinning clockwise while the inner ring runs the other way; the default `"single"` spins both the same way. Add `secondaryColor` to tint the inner ring, which is emerald unless `color` is `"emerald"`.

## Can I use my own brand colour on LoaderBlock?

Yes, with a hex value: `color="#e11d48"`. The loader uses any string starting with `#` as is, and looks other strings up in a fixed colour map. A name not in the map, or a format such as `rgb()` or `hsl()`, falls back to `primary`, which follows your theme's `--primary`.

## Why does the bar variant ignore w-full?

`className` is applied to the outer wrapper, while the track gets its own fixed width from `size`: `w-16`, `w-32`, `w-48` or `w-64`. So `w-full` on the wrapper does not stretch it. Pick the nearest `size`, or edit the `barSizeClasses` map in your copy of `LoaderBlock.tsx` for a different width.

## Is the Loader announced to screen readers?

Not by itself. It renders no `role`, `aria-label` or live region, and the animations do not check `prefers-reduced-motion`. The optional `text` is an ordinary `span`. Wrap `LoaderBlock` in an element with `role="status"`, and pass `text` so the state has a readable label.

## How do I add text under the Loader or change its padding?

Pass `text` for a caption that scales with `size` and pulses. Vertical padding defaults to `py-5` (20px), and `py` overrides it with a Tailwind class such as `"py-8"`, a number of pixels such as `10`, or a string such as `"30px"`. Use `py={0}` to remove the padding.

---

Live previews and every example: https://avaraui.com/docs/nextjs/loader
