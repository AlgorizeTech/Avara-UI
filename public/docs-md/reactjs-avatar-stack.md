---
title: "Shadcn Avatar Stack"
description: "An avatar stack: a row of overlapping faces — the \"people who…\" cue under a headline, beside a count, or next to a join button. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/avatar-stack
---

# Shadcn Avatar Stack

An avatar stack: a row of overlapping faces — the "people who…" cue under a headline, beside a count, or next to a join button. It shows up to `max` faces, folds the rest into a "+N" disc, and takes an optional trailing `action` that shares the stack's size. On hover the faces fan apart a little, so the row answers the pointer without turning into a carousel.

Several sections used to hand-roll this row; [Fashion Hero](https://avaraui.com/docs/reactjs/hero#fashion-hero) uses this one.

## Avatar Group (Shift on hover)

An animated avatar group inspired by animate-ui that displays overlapping user images and smoothly shifts each avatar upward with spring physics on hover with an anchored pointer tooltip.

- `variant="shift"` enables the spring-physics upward shift on hover with an anchored gliding tooltip.
- `max=4` sets how many avatars are displayed before folding remaining items into a clickable +N counter.
- `onMoreClick` optional — pass an onClick function (restCount, hiddenAvatars) => void to handle clicks on the +N counter disc.
- `action` optional — pass an onClick function () => void (or true) to append a trailing '+' action button, or omit it if not needed.

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

A clean row of overlapping faces using the zoom variant without tooltips.

- `variant="zoom"` raises and zooms the hovered face above its neighbours while keeping the row's gap fixed.
- `type="default"` disables the hover tooltip completely so the avatars zoom without displaying name or info popups.
- `max=4` sets the maximum visible faces before folding the rest into a +N badge (supports onMoreClick).
- `action` optional — pass an onClick function () => void (or true) to append a trailing '+' action button, or omit it.

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

Hovering an avatar displays its name in a tooltip and zooms the face upward, keeping the row's gap fixed.

- `variant="zoom"` raises and zooms the hovered avatar above its neighbours while keeping the spacing fixed.
- `type="tooltip"` displays the avatar's name and designation in a clean floating tooltip on hover.
- `max=4` sets the maximum visible faces before folding the rest into a +N badge (supports onMoreClick).
- `action` optional — pass an onClick function () => void (or true) to append a trailing '+' action button, or omit it.

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

Displays an anchored pointer arrow underneath the tooltip card with a lively spring popup animation as avatars smoothly zoom on hover.

- `variant="zoom"` raises and zooms the hovered avatar above its neighbours while keeping the spacing fixed.
- `type="tooltip-arrow"` renders a floating tooltip with a pointer arrow anchoring to the top of the avatar circle.
- `max=4` sets the maximum visible faces before folding the rest into a +N badge (supports onMoreClick).
- `action` optional — pass an onClick function () => void (or true) to append a trailing '+' action button, or omit it.

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

Hovering over the stack smoothly fans the avatars out symmetrically from the center and subtly shifts the hovered face upward without zooming.

- `variant="spread"` smoothly expands the avatar stack symmetrically from the center on hover (6px) and elevates the hovered face by -30% without scaling.
- `type="default"` disables tooltips so the avatars fan out cleanly without info popups.
- `max=4` sets the maximum visible faces before folding the rest into a +N badge (supports onMoreClick).
- `action` optional — pass an onClick function () => void (or true) to append a trailing '+' action button, or omit it.

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

Hovering over the stack widens the avatar gap symmetrically from the center, elevates the hovered face by -30%, and displays a clean floating tooltip above it.

- `variant="spread"` smoothly expands the avatars symmetrically from the center on hover and elevates the hovered face by -30%.
- `type="tooltip"` displays a clean floating tooltip without a pointer arrow on hover.
- `max=4` sets the maximum visible faces before folding the rest into a +N badge (supports onMoreClick).
- `action` optional — pass an onClick function () => void (or true) to append a trailing '+' action button, or omit it.

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

Hovering widens the stack symmetrically from the center, subtly raises the hovered face, and reveals a spring popup tooltip with an anchored pointer arrow.

- `variant="spread"` smoothly expands the avatars symmetrically from the center on hover and elevates the hovered face by -30%.
- `type="tooltip-arrow"` renders a floating tooltip with an anchored pointer arrow underneath and spring popup animation.
- `max=4` sets the maximum visible faces before folding the rest into a +N badge (supports onMoreClick).
- `action` optional — pass an onClick function () => void (or true) to append a trailing '+' action button, or omit it.

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

Three faces using the zoom variant with clean tooltips and a trailing plus action button that triggers an onClick handler.

- `variant="zoom"` raises and zooms the hovered avatar above its neighbours while keeping the spacing fixed.
- `type="tooltip"` displays the avatar's name and designation in a clean floating tooltip on hover.
- `action=() => void` renders the built-in '+' action button at the end of the stack and triggers your onClick function when clicked.

```tsx
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

Six people, three shown — the rest become a clickable +3 disc. Hovering faces or the counter disc displays arrow tooltips.

- `max=3` is how many faces show before the rest fold into a +N count disc.
- `onMoreClick=(restCount, hiddenAvatars) => void` triggers your onClick callback when the +N counter disc is clicked.
- `variant="zoom"` raises and zooms the hovered face or counter disc above its neighbours.
- `type="tooltip-arrow"` displays tooltips with pointer arrows and lively pop animations on hover.
- `action` optional — pass an onClick function () => void alongside max if you want both a +N counter and a trailing '+' button.

```tsx
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

sm, md and lg — 28, 36 and 44 pixels. The small stack shows a clean tooltip (type="tooltip"), the middle stack shows without tooltip (type="default"), and the large stack displays tooltips with pointing arrows (type="tooltip-arrow").

- `size` controls the avatar circle dimensions: sm (28px), md (36px), lg (44px), or xl (48px).
- `variant="zoom"` scales the hovered avatar upward while keeping the row's spacing fixed.
- `type` configures each stack's tooltip style: "tooltip" (sm), "default" (md), and "tooltip-arrow" (lg).
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

### Optimal Avatar Count

Limit visible avatars to 3–5 items using the `max` prop. Folding excess avatars into a `+N` counter keeps your layout balanced, avoids horizontal overflow on mobile screens, and maintains clean visual hierarchy.

### Smooth Hover Motion

When enabling `spreadOnHover`, keep `spreadDistance` subtle (4–8px) and `transitionDuration` around 500ms. Pair with `translate="-30%"` to gently elevate the hovered avatar above its neighbors without jarring layout shifts.

### Tooltip Accessibility & Text Alignment

Always provide accessible `alt` or `name` attributes for every avatar. When a `designation` or subtitle is provided, tooltips automatically align text to the left; otherwise, titles stay cleanly centered for single-line labels.

### Ring Contrast & Background Matching

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
