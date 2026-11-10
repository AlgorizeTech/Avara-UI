---
title: "Shadcn Loader"
description: "Dependency-free loading indicators: a spinner, dots, a pulse and a bar. Free shadcn/ui Loader component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/loader
---

# Shadcn Loader

A premium, dependency-free loading indicator component.

Different parts of your UI require different types of loading states. A full-page data fetch might require an indeterminate `bar` or `pulse`, while a small button state might only fit a `sm` size `spinner` or `dots`, or an eye-catching `orbit` dual-ring spinner for prominent async states. This component consolidates 6 distinct, ultra-smooth animations into a single block.

Explore the different variations of the Loader component — each example shows a live preview with the exact code to copy.

## For AI agents

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

## Spinner

- `variant="spinner"` is the default — a rotating arc over a faint circle. The neutral choice when you have no reason to pick another.
- `color` Tints the strokes, dots and borders. Takes a named key — `primary`, `indigo`, `rose`, `emerald`, `zinc`, `blue`, `amber` — or any `#hex`. Anything unrecognised falls back to `primary`, which follows your theme token.

```tsx
import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function BasicLoader() {
  return <LoaderBlock variant="spinner" />;
}
```

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

## Examples

### Orbit (Concentric Rings & Pulse) — variant="orbit"

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

### Dots

- Use `variant="dots"` for a staggered bouncing sequence — three dots, 0.15s apart. Stays legible at small sizes, so it reads well inline with text.

```tsx
import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function DotsLoader() {
  return <LoaderBlock variant="dots" />;
}
```

### Pulse

- Use `variant="pulse"` for a soft breathing circle — a half-size centre dot with a full-size halo pinging behind it. The quietest of the five: no rotation, no travel.

```tsx
import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function PulseLoader() {
  return <LoaderBlock variant="pulse" />;
}
```

### Bar

- Use `variant="bar"` for an indeterminate progress line — a zinc track with a sweeping 50%-width fill on a 1.5s loop. The only non-square variant, and it renders at a fixed width, so `w-full` won't stretch it.

```tsx
import { LoaderBlock } from "@/components/custom/blocks/LoaderBlock";

export default function BarLoader() {
  return <LoaderBlock variant="bar" />;
}
```

## Best Practices & Guidelines

### Usage Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"spinner" \| "orbit" \| "dots" \| "pulse" \| "ring" \| "bar"` | `"spinner"` | The architectural style of the loading animation. `"orbit"` (and `"ring"`) renders the signature dual-ring concentric spinner with counter-rotating arc and pulsing core. |
| `direction` | `"single" \| "dual"` | `"single"` | Rotation direction for concentric rings in `"orbit"` and `"ring"` variants. `"single"` spins both rings in the same direction; `"dual"` enables opposite counter-spinning. |
| `secondaryColor` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "amber" \| "blue" \| "zinc" \| string` | `"#10b981"` | Accent color for the inner counter-rotating orbit in `"orbit"` and `"ring"` variants. Defaults to emerald (`#10b981`). |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Proportionally scales the container width, height, and the helper text size. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "amber" \| "blue" \| "zinc" \| string` | `"primary"` | Applies the active color theme to the SVG strokes, dots, and borders. Accepts custom hex codes. Unrecognised values fall back to `"primary"`, which follows your theme's `--primary` token. |
| `text` | `string` | `undefined` | Optional text to display beneath the loader. It automatically receives a subtle pulsing animation. |
| `py` | `string \| number` | `"py-5"` (20px) | Top and bottom vertical padding so the loader never sticks flush against the screen edge upon install. Accepts Tailwind classes (e.g. `"py-2"`, `"py-8"`, `"py-0"`), numbers (e.g. `10`), or pixel strings (e.g. `"30px"`). |
| `className` | `string` | `undefined` | Optional CSS classes to apply to the outermost wrapper container (can also be used to override padding, e.g. `"py-2"`, `"py-10"`). |

---

Live previews and every example: https://avaraui.com/docs/nextjs/loader
