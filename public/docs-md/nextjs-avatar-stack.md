---
title: "Shadcn Avatar Stack"
description: "An avatar stack: a row of overlapping faces — the \"people who…\" cue under a headline, beside a count, or next to a join button. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/avatar-stack
---

# Shadcn Avatar Stack

An avatar stack: a row of overlapping faces — the "people who…" cue under a headline, beside a count, or next to a join button. It shows up to `max` faces, folds the rest into a "+N" disc, and takes an optional trailing `action` that shares the stack's size. On hover the faces fan apart a little, so the row answers the pointer without turning into a carousel.

Several sections used to hand-roll this row; [Fashion Hero](https://avaraui.com/docs/nextjs/hero#fashion-hero) uses this one.

## Avatar Group (Shift on hover)

Overlapping faces that shift upward on a spring when hovered, with a tooltip that glides between them.

- `variant="shift"` lifts the hovered face on a spring and glides the tooltip between faces.
- `max=4` is how many faces show before the rest fold into a +N disc. `onMoreClick` handles a click on it.

```tsx
import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function AvatarGroupDemo() {
  return (
    <AvatarStack
      avatars={PEOPLE}
      variant="shift"
      size="xl"
      max={4}
      showTooltip={true}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/avatar-stack.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/avatar-stack
```

## Examples

### Without tooltip

A clean row of overlapping faces that zoom on hover, with no tooltip.

- `type="default"` turns the tooltip off completely.

```tsx
import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function BasicAvatarStack() {
  return (
    <AvatarStack
      avatars={PEOPLE}
      variant="zoom"
      type="default"
      size="md"
      max={4}
    />
  );
}
```

### With tooltip (Zoom on hover)

Hovering a face zooms it upward and shows its name in a tooltip.

- `type="tooltip"` shows the avatar's name and designation in a floating tooltip.

```tsx
import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function TooltipZoomAvatarStack() {
  return (
    <AvatarStack
      avatars={PEOPLE}
      variant="zoom"
      type="tooltip"
      size="md"
      max={4}
    />
  );
}
```

### With tooltip arrow (Zoom on hover)

The same tooltip with a pointer arrow and a spring popup.

- `type="tooltip-arrow"` adds a pointer arrow anchoring the tooltip to the top of the avatar.

```tsx
import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function TooltipArrowAvatarStack() {
  return (
    <AvatarStack
      avatars={PEOPLE}
      variant="zoom"
      type="tooltip-arrow"
      size="md"
      max={4}
    />
  );
}
```

### Spread on hover (Expand width)

Hovering the stack fans the faces out from the centre and lifts the hovered one, without zooming.

- `variant="spread"` fans the faces out symmetrically and lifts the hovered one.

```tsx
import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function SpreadOnHover() {
  return (
    <AvatarStack
      avatars={PEOPLE}
      variant="spread"
      type="default"
      size="md"
      max={4}
    />
  );
}
```

### Spread with tooltip

The spread fan-out with a floating name tooltip above the hovered face.

- `type="tooltip"` adds a floating tooltip without an arrow.

```tsx
import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function SpreadWithTooltip() {
  return (
    <AvatarStack
      avatars={PEOPLE}
      variant="spread"
      type="tooltip"
      size="md"
      max={4}
    />
  );
}
```

### Spread with tooltip arrow

The spread fan-out with a pointer-arrow tooltip.

- `type="tooltip-arrow"` adds a floating tooltip with an anchored pointer arrow.

```tsx
import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function SpreadWithTooltipArrow() {
  return (
    <AvatarStack
      avatars={PEOPLE}
      variant="spread"
      type="tooltip-arrow"
      size="md"
      max={4}
    />
  );
}
```

### With an action

Three faces with tooltips and a trailing + button.

- `action=() => void` adds the built-in + button at the end of the stack and calls your handler when it is clicked.

```tsx
"use client";

import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
];

export default function Community() {
  return (
    <AvatarStack
      avatars={PEOPLE}
      variant="zoom"
      type="tooltip"
      size="md"
      action={() => console.log("Action clicked")}
    />
  );
}
```

### Folded count

Six people, three shown; the rest fold into a clickable +3 disc.

- `max=3` is how many faces show before the rest fold into a +N disc.
- `onMoreClick=(restCount, hiddenAvatars) => void` is called when the +N disc is clicked.

```tsx
"use client";

import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function JoinedThisMonth() {
  return (
    <div className="flex w-fit mx-auto items-center justify-center gap-3 py-20 px-6">
      <AvatarStack
        avatars={PEOPLE}
        variant="zoom"
        type="tooltip-arrow"
        max={3}
        className="m-0 p-0"
        onMoreClick={(restCount) => console.log(`Clicked +${restCount} more`)}
      />
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">2,400+</span> people joined this month
      </p>
    </div>
  );
}
```

### Sizes

sm, md and lg are 28, 36 and 44 pixels, each paired here with a different tooltip style.

- `size` sets the avatar diameter: `sm` (28px), `md` (36px), `lg` (44px) or `xl` (48px).
- `ringClassName` is the gap colour between faces (`ring-background` by default). Match it to the surface the stack sits on.

```tsx
import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson", designation: "Founder & CEO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy", designation: "Co-Founder & CTO" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade", designation: "Managing Director" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva", designation: "Chairman & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter", designation: "President & Co-Founder" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson", designation: "Chief Executive Officer" },
];

export default function SizesDemo() {
  return (
    <div className="flex w-fit mx-auto flex-col items-center justify-center gap-6 py-20 px-6">
      {/* Small with tooltip */}
      <AvatarStack avatars={PEOPLE} variant="zoom" type="tooltip" size="sm" max={4} className="m-0 p-0" />

      {/* Medium without tooltip */}
      <AvatarStack avatars={PEOPLE} variant="zoom" type="default" size="md" max={4} className="m-0 p-0" />

      {/* Large with arrow tooltip */}
      <AvatarStack avatars={PEOPLE} variant="zoom" type="tooltip-arrow" size="lg" max={4} className="m-0 p-0" />
    </div>
  );
}
```

## Best Practices & Guidelines

Limit visible avatars to 3–5 items using the `max` prop. Folding excess avatars into a `+N` counter keeps your layout balanced, avoids horizontal overflow on mobile screens, and maintains clean visual hierarchy.

When enabling `spreadOnHover`, keep `spreadDistance` subtle (4–8px) and `transitionDuration` around 500ms. Pair with `translate="-30%"` to gently elevate the hovered avatar above its neighbors without jarring layout shifts.

### Tooltip Accessibility & Text Alignment

Always provide accessible `alt` or `name` attributes for every avatar. When a `designation` or subtitle is provided, tooltips automatically align text to the left; otherwise, titles stay cleanly centered for single-line labels.

Ensure `ringClassName` matches the surface the avatars rest upon (defaults to `ring-background`). A matching border ring creates clean visual separation between overlapping faces in both light and dark modes.

## Props Reference

### AvatarGroup Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `translate` | `string \| number` | `"-30%"` | Vertical displacement of each avatar on hover using spring motion. |
| `invertOverlap` | `boolean` | `true` | Whether earlier avatars sit on top of subsequent ones. Hovering automatically raises an avatar's z-index to 50. |
| `transition` | `Transition` | `&#123; type: "spring", stiffness: 300, damping: 17 &#125;` | Spring transition configuration for the hover shift animation. |
| `showTooltip` | `boolean` | `true` | Whether to show the floating gliding tooltip on hover. Set to `false` to disable tooltips. |
| `children` | `ReactNode` | — | Composable `<Avatar>` elements containing images, fallbacks, and optional `<AvatarGroupTooltip>`. |

### AvatarStack Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `avatars` | `&#123; src: string; alt?: string; name?: string; tooltip?: string; designation?: string; role?: string; fallback?: string &#125;[]` | Required | The list of faces in order. Hover tooltips display the avatar's name/alt, and optionally `designation`/`role` beneath it if provided. |
| `variant` | `"default" \| "shift" \| "zoom" \| "spread"` | `"default"` | Presentation style: `shift` (animate-ui spring shift upward with pointer tooltip), `zoom` (scale up on hover with fixed gap), or `spread` (smoothly fan out to the right and elevate on hover). |
| `type` | `"default" \| "tooltip" \| "tooltip-arrow"` | `"tooltip"` | Tooltip presentation type for `zoom` and `spread` variants: `default` (no tooltip), `tooltip` (clean floating tooltip), or `tooltip-arrow` (tooltip with anchored pointer arrow). |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Avatar diameter: `sm` (28px), `md` (36px), `lg` (44px), or `xl` (48px). |
| `max` | `number` | `—` | Maximum faces shown before the rest fold into a `+N` count disc. If omitted, all avatars in the list are displayed. |
| `onMoreClick` | `(restCount: number, hiddenAvatars: StackAvatar[], event: MouseEvent) => void` | — | Click handler triggered when the folded `+N` counter disc is clicked. |
| `ringClassName` | `string` | `"ring-background"` | Border/gap colour between overlapping faces. Defaults to theme background. |
| `action` | `((event: MouseEvent) => void) \| &#123; onClick?: (event: MouseEvent) => void; label?: string &#125; \| boolean \| ReactNode` | — | Single prop for the trailing `+` action button: pass an `onClick` function `() => void`, `&#123; onClick, label &#125;`, `true`, or custom `ReactNode`. |
| `spreadOnHover` | `boolean` | `true` | Whether faces smoothly fan apart slightly when the stack is hovered. |
| `spreadDistance` | `number` | `6` | Number of pixels each subsequent avatar shifts to the right on hover when `spreadOnHover` is enabled. |
| `translate` | `string \| number` | `"-30%"` | Vertical displacement of an avatar when hovered (e.g. `"-30%"`). |
| `transitionDuration` | `number` | `500` | Duration of the spread and hover transition in milliseconds for a smooth, gentle animation. |
| `liftOnHover` | `boolean` | `true` | Whether the hovered face rises above neighbours and scales up slightly. |
| `showTooltip` | `boolean` | `true` | Whether hover reveals the avatar's `alt` text in a tooltip. Set to `false` to disable tooltips. (Alias: `tooltip`). |
| `showTooltipArrow` | `boolean` | `false` | Whether to render an anchored pointer arrow beneath the hover tooltip. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/avatar-stack
