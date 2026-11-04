---
title: "Shadcn Skeleton"
description: "Shadcn Skeleton. Skeleton loading placeholders for cards, profiles, text, rectangles and circles, with a pulse or no animation, and custom compositions."
url: https://avaraui.com/docs/nextjs/skeleton
---

# Shadcn Skeleton

A skeleton loader: a high-performance visual placeholder system used to reduce perceived loading times.

While standard Tailwind gives you the `animate-pulse` class, modern applications rely on **Shimmer** effects (a sleek gradient sliding across the background). This component injects its own pure CSS `@keyframes` to achieve a gorgeous shimmer. It provides composite templates out of the box (like Cards and Profiles), but also exposes top-level props so you can strictly define custom widths, heights, and border radii.

Explore the different variations of the Skeleton component — each example shows a live preview with the exact code to copy.

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

## Examples

### Profile

- Use `variant="profile"` for an avatar with two text lines beside it.

```tsx
import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function ProfileSkeleton() {
  return <SkeletonBlock variant="profile" width="100%" height="auto" />;
}
```

### Text

- Use `variant="text"` for stacked paragraph lines.

```tsx
import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function TextSkeleton() {
  return <SkeletonBlock variant="text" width="100%" height="auto" />;
}
```

### Rectangle

- Use `variant="rect"` as a block placeholder for images and charts. It is the default.

```tsx
import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function RectSkeleton() {
  return <SkeletonBlock variant="rect" width="100%" height={192} className="max-w-md" />;
}
```

### Circle

- Use `variant="circle"` for avatars and round icon slots.

```tsx
import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function CircleSkeleton() {
  return <SkeletonBlock variant="circle" width={48} height={48} />;
}
```

### Pulse animation

- Use `animation="pulse"` for the classic fading placeholder instead of the sliding shimmer.

```tsx
import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function PulseSkeleton() {
  return <SkeletonBlock variant="card" width="100%" height="auto" animation="pulse" />;
}
```

### No animation

- Use `animation="none"` for a static placeholder — the right choice under `prefers-reduced-motion`.

```tsx
import { SkeletonBlock } from "@/components/custom/blocks/SkeletonBlock";

export default function StaticSkeleton() {
  return <SkeletonBlock variant="card" width="100%" height="auto" animation="none" />;
}
```

### Custom composition

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

## Features
Learn about the Skeleton component's loading placeholder features, featuring a subtle pulsing animation that reduces perceived wait times.

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
| `variant` | `"rect" \| "circle" \| "text" \| "profile" \| "card" \| "custom"` | `"rect"` | Determines the structural shape. `profile` and `card` output pre-arranged composite layouts. |
| `animation` | `"pulse" \| "shimmer" \| "none"` | `"shimmer"` | Determines the loading animation style. `shimmer` slides a gradient, `pulse` fades opacity. |
| `width` | `string \| number` | `undefined` | Sets an exact inline width (e.g. `200` or `"50%"`). Overrides Tailwind utility classes. |
| `height` | `string \| number` | `undefined` | Sets an exact inline height (e.g. `48` or `"100vh"`). Overrides Tailwind utility classes. |
| `radius` | `string \| number` | `undefined` | Sets an exact border-radius (e.g. `"1rem"` or `8`). Useful for perfect circles or custom rounding. |
| `className` | `string` | `undefined` | Allows you to pass custom Tailwind classes to manage layout constraints like margins or max-widths. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/skeleton
