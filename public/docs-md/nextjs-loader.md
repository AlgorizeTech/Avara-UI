---
title: "Shadcn Loader"
description: "Dependency-free loading indicators: a spinner, dots, a pulse and a bar. Free shadcn/ui Loader component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/loader
---

# Shadcn Loader

A premium, dependency-free loading indicator component.

Different parts of your UI require different types of loading states. A full-page data fetch might require an indeterminate `bar` or `pulse`, while a small button state might only fit a `sm` size `spinner` or `dots`, or an eye-catching `orbit` dual-ring spinner for prominent async states. This component consolidates 6 distinct, ultra-smooth animations into a single block.

Explore the different variations of the Loader component — each example shows a live preview with the exact code to copy.

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
