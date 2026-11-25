---
title: "Shadcn Skeleton"
description: "Shadcn Skeleton. Skeleton loading placeholders for cards, profiles, text, rectangles and circles, with a pulse or no animation, and custom compositions."
url: https://avaraui.com/docs/nextjs/skeleton
---

# Shadcn Skeleton

A pure-CSS loading placeholder (`SkeletonBlock`) with `shimmer`, `pulse`, and `none` animations plus composite `card`, `profile`, `text`, `rect`, and `circle` presets.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/skeleton.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/skeleton
```

## Card

A composite placeholder that mirrors a media card layout.

- `variant="card"` outputs a pre-arranged composite rather than a single shape.
- `animation="shimmer"` is the default — a gradient sliding across the placeholder.

```tsx
import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function CardSkeleton() {
  return <SkeletonBlock variant="card" width="100%" height="auto" />;
}
```

## Profile

- Use `variant="profile"` for an avatar with two text lines beside it.

```tsx
import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function ProfileSkeleton() {
  return <SkeletonBlock variant="profile" width="100%" height="auto" />;
}
```

## Text

- Use `variant="text"` for stacked paragraph lines.

```tsx
import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function TextSkeleton() {
  return <SkeletonBlock variant="text" width="100%" height="auto" />;
}
```

## Rectangle

- Use `variant="rect"` as a block placeholder for images and charts. It is the default.

```tsx
import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function RectSkeleton() {
  return <SkeletonBlock variant="rect" width="100%" height={192} className="max-w-md" />;
}
```

## Circle

- Use `variant="circle"` for avatars and round icon slots.

```tsx
import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function CircleSkeleton() {
  return <SkeletonBlock variant="circle" width={48} height={48} />;
}
```

## Pulse animation

- Use `animation="pulse"` for the classic fading placeholder instead of the sliding shimmer.

```tsx
import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function PulseSkeleton() {
  return <SkeletonBlock variant="card" width="100%" height="auto" animation="pulse" />;
}
```

## No animation

- Use `animation="none"` for a static placeholder — the right choice under `prefers-reduced-motion`.

```tsx
import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function StaticSkeleton() {
  return <SkeletonBlock variant="card" width="100%" height="auto" animation="none" />;
}
```

## Custom composition

- Use `variant="custom"` to build atomic pieces yourself.
- `width` `height` and `radius` take a number or a CSS string, and are set inline so they override Tailwind classes.

```tsx
import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

// Custom atomic composition with explicit width, height and radius props
export default function CustomSkeleton() {
  return (
    <div className="flex gap-4 p-6 border border-border rounded-xl w-full max-w-sm">
      <SkeletonBlock variant="custom" width={64} height={64} radius="1rem" />
      <div className="flex flex-col gap-2 flex-1 pt-1">
        <SkeletonBlock variant="custom" width="100%" height={16} radius="4px" />
        <SkeletonBlock variant="custom" width="70%" height={16} radius="4px" />
        <SkeletonBlock variant="custom" width="40%" height={12} radius="4px" className="mt-2" />
      </div>
    </div>
  );
}
```

## About Shadcn Skeleton

**What it is.** `SkeletonBlock` provides ready-made composite placeholders (`card`, `profile`, `text`, `rect`, `circle`) and atomic `custom` shapes (`width`, `height`, `radius`) with `shimmer`, `pulse`, or `none` animations.

**How it is built.** Injects pure CSS `@keyframes` for the sliding shimmer (no `globals.css` changes needed) and applies `width`, `height`, and `radius` inline so exact dimensions override utility classes.

**When to use it.** Use `SkeletonBlock` while data is fetching to preserve layout geometry and prevent layout shifts. For compact spinners or indeterminate bars, use [Loader](https://avaraui.com/docs/nextjs/loader).

## For AI agents

**When to use**

- Layout-preserving loading placeholders for cards, profiles, avatars, and text blocks (`shimmer`, `pulse`, `none`)

**When not to use**

- Inline spinners or indeterminate bars — use [Loader](https://avaraui.com/docs/nextjs/loader)
- Percentage progress indicators — use [Progress](https://avaraui.com/docs/nextjs/progress)

**Agent notes**

- Named export: `import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock"`
- Use `animation="none"` for static placeholders under `prefers-reduced-motion`

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"rect" \| "circle" \| "text" \| "profile" \| "card" \| "custom"` | `"rect"` | Determines the structural shape. `profile` and `card` output pre-arranged composite layouts. |
| `animation` | `"pulse" \| "shimmer" \| "none"` | `"shimmer"` | Determines the loading animation style. `shimmer` slides a gradient, `pulse` fades opacity. |
| `width` | `string \| number` | `undefined` | Sets an exact inline width (e.g. `200` or `"50%"`). Overrides Tailwind utility classes. |
| `height` | `string \| number` | `undefined` | Sets an exact inline height (e.g. `48` or `"100vh"`). Overrides Tailwind utility classes. |
| `radius` | `string \| number` | `undefined` | Sets an exact border-radius (e.g. `"1rem"` or `8`). Useful for perfect circles or custom rounding. |
| `className` | `string` | `undefined` | Allows you to pass custom Tailwind classes to manage layout constraints like margins or max-widths. |

## Works with other components

- Mirror the geometry of [Card](https://avaraui.com/docs/nextjs/card), [Item](https://avaraui.com/docs/nextjs/item), and [Data Table](https://avaraui.com/docs/nextjs/data-table) rows while loading.
- Pair with [Loader](https://avaraui.com/docs/nextjs/loader) for action button or overlay spinners.

## How do I add a loading skeleton in React with Tailwind?

Render `SkeletonBlock` with a `variant` that matches what is loading: `"card"`, `"profile"`, `"text"`, `"rect"` or `"circle"`. Swap it for the real content when your data arrives. `card` and `profile` output ready-made composite layouts with several placeholder shapes.

## Do I need to add shimmer keyframes to globals.css?

No. `SkeletonBlock` injects its own CSS `@keyframes` for the sliding shimmer, so nothing in your global stylesheet changes. It uses no animation library, which keeps it light on pages that show many placeholders at once.

## How do I switch between shimmer and pulse animations?

Set `animation` to `"shimmer"`, `"pulse"` or `"none"`. `shimmer` is the default and slides a gradient across the shape, `pulse` fades its opacity, and `none` leaves a static placeholder. Use `none` where you want no motion at all.

## How do I make a skeleton with a custom size or shape?

Use `variant="custom"` with `width`, `height` and `radius`. Each takes a number in pixels or a CSS string such as `"50%"` or `"100vh"`, and these inline values override Tailwind utility classes. A matching `width`, `height` and `radius` makes a perfect circle.

## How do I make skeletons match my real layout?

Give each `SkeletonBlock` the same dimensions as the content it stands in for, using `width`, `height` and `className` for margins or max-width. Matching the geometry of the final [Card](https://avaraui.com/docs/nextjs/card) or table row avoids layout shift when real data loads.

---

Live previews and every example: https://avaraui.com/docs/nextjs/skeleton
