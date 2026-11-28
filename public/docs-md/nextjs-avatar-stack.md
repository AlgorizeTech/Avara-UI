---
title: "Shadcn Avatar Stack"
description: "A row of overlapping avatars that folds extra faces into a +N disc, with an optional trailing action. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/avatar-stack
---

# Shadcn Avatar Stack

A row of overlapping avatars that folds extra faces into a +N disc, with an optional trailing action.

Several sections used to hand-roll this row; [Fashion Hero](https://avaraui.com/docs/nextjs/hero#fashion-hero) uses this one.

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

## Without tooltip

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

## With tooltip (Zoom on hover)

Hovering a face zooms it upward and shows its name in a tooltip with a pointer arrow.

- `variant="zoom"` scales the hovered face up and shows its name in a tooltip with a pointer arrow.

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
      size="md"
      max={4}
    />
  );
}
```

## Spread with tooltip

The spread fan-out with the same arrow tooltip above the hovered face.

- `variant="spread"` fans the faces out symmetrically and lifts the hovered one, with the same arrow tooltip.

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
      size="md"
      max={4}
    />
  );
}
```

## Folded count

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
          max={3}
        className="m-0 p-0"
        onMoreClick={(restCount) => console.log(`Clicked +${restCount} more`)}
      />
      <p
        className="text-sm text-muted-foreground motion-reduce:!animate-none"
        style={{ animation: "avara-copy-in 800ms cubic-bezier(0.22, 1, 0.36, 1) 700ms backwards" }}
      >
        <style>{"@keyframes avara-copy-in { from { opacity: 0; transform: translateY(8px); filter: blur(10px); } }"}</style>
        <span className="font-semibold text-foreground">2,400+</span> people joined this month
      </p>
    </div>
  );
}
```

## Sizes

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
      <AvatarStack avatars={PEOPLE} variant="zoom" size="lg" max={4} className="m-0 p-0" />
    </div>
  );
}
```

## About Shadcn Avatar Stack

**What it is.** `AvatarStack` shows a row of overlapping avatars from an `avatars` array, folds the extra ones into a `+N` disc, and can end with a `+` action button. `AvatarGroup` is the composable version, where you place `Avatar` children yourself.

**How it is built.** `variant` picks the hover style: `shift` lifts a face with a spring, `spread` fans the row apart, and `default` and `zoom` scale the hovered face up. `type` controls the tooltip, and `ringClassName` sets the gap colour between faces. It uses Radix Avatar and the Tooltip item from this library.

**When to use it.** Use it for collaborator rows, social proof under a hero headline, active viewer indicators and team assignment pills.

## For AI agents

**When to use**

- Collaborator rows, social proof under hero headlines
- Active viewer indicators, team assignment pills

**When not to use**

- A single person with name, role and details: use [Profile Card](https://avaraui.com/docs/nextjs/profile-card)
- Showing relationships between people or agents: use [User Graph](https://avaraui.com/docs/nextjs/user-graph)

**Agent notes**

- Named exports `AvatarStack` (also the default export), `AvatarGroup`, `Avatar`, `AvatarGroupTooltip`, `AvatarImage` and `AvatarFallback` from `@/components/custom/blocks/AvatarStackBlock`.
- `AvatarStack` takes `avatars` (`{ src, alt?, name?, designation?, role?, tooltip?, fallback? }[]`), `variant` (`"default" | "shift" | "zoom" | "spread"`), `type` (`"default" | "tooltip" | "tooltip-arrow"`), `size` (`"sm" | "md" | "lg" | "xl"`), `max`, `onMoreClick`, `action` and `ringClassName`.
- `max` folds the rest into a `+N` disc; `onMoreClick(restCount, hiddenAvatars, event)` runs when it is clicked. Without `max`, every avatar shows.
- Set `ringClassName` (default `ring-background`) to the surface behind the stack so the gaps match.
- Give each avatar a unique `src`, because the stack uses it as the React key.

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
| `type` | `"default" \| "tooltip" \| "tooltip-arrow"` | `"tooltip-arrow"` | Tooltip presentation type for `zoom` and `spread` variants: `default` (no tooltip), `tooltip` (clean floating tooltip), or `tooltip-arrow` (tooltip with anchored pointer arrow). |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Avatar diameter: `sm` (28px), `md` (36px), `lg` (44px), or `xl` (48px). |
| `max` | `number` | `—` | Maximum faces shown before the rest fold into a `+N` count disc. If omitted, all avatars in the list are displayed. |
| `onMoreClick` | `(restCount: number, hiddenAvatars: StackAvatar[], event: MouseEvent) => void` | — | Click handler triggered when the folded `+N` counter disc is clicked. |
| `ringClassName` | `string` | `"ring-background"` | Border/gap colour between overlapping faces. Defaults to theme background. |
| `action` | `((event: MouseEvent) => void) \| &#123; onClick?: (event: MouseEvent) => void; label?: string &#125; \| boolean \| ReactNode` | — | Single prop for the trailing `+` action button: pass an `onClick` function `() => void`, `&#123; onClick, label &#125;`, `true`, or custom `ReactNode`. |
| `spreadOnHover` | `boolean` | `true` for `spread`, otherwise `false` | Whether faces smoothly fan apart slightly when the stack is hovered. |
| `spreadDistance` | `number` | `6` | Number of pixels each subsequent avatar shifts to the right on hover when `spreadOnHover` is enabled. |
| `translate` | `string \| number` | `"-30%"` for `shift` and `spread`, otherwise none | Vertical displacement of an avatar when hovered (e.g. `"-30%"`). |
| `transitionDuration` | `number` | `500` | Duration of the spread and hover transition in milliseconds for a smooth, gentle animation. |
| `liftOnHover` | `boolean` | `true` except for `spread` | Whether the hovered face rises above neighbours and scales up slightly. |
| `showTooltip` | `boolean` | `true` | Whether hover reveals the avatar's `alt` text in a tooltip. Set to `false` to disable tooltips. (Alias: `tooltip`). |
| `showTooltipArrow` | `boolean` | `true` unless `type` is `"tooltip"` | Whether to render an anchored pointer arrow beneath the hover tooltip. |

## Works with other components

- [Tooltip](https://avaraui.com/docs/nextjs/tooltip) is the tooltip `AvatarStack` uses for its hover labels, so the two share one look.
- [Profile Card](https://avaraui.com/docs/nextjs/profile-card) for the fuller person detail you show after a click on one face.
- [User Graph](https://avaraui.com/docs/nextjs/user-graph) when the people need to be linked to agents or tools, not just listed.

## How do I handle clicks on the `+N` overflow disc?

Pass `onMoreClick`. It receives `(restCount, hiddenAvatars, event)`, where `hiddenAvatars` is the array of faces folded away, so you can open a modal, popover or team list. The disc only appears when `max` is lower than the number of avatars; without `onMoreClick` it does nothing.

## How do I match the avatar border gap to a colored card?

Set `ringClassName` to the surface behind the stack, for example `ring-card` or `ring-muted`. The default is `ring-background`. The same class colours the `+N` disc and the default action button, so on a tinted card all the gaps between faces stay consistent.

## How do I add a trailing plus button to AvatarStack?

Pass `action`. A function becomes the button's click handler, `{ onClick, label }` adds an accessible label (the default is "Join the community"), `true` renders the button with no handler, and a React element replaces the button entirely. The button is the same size as the avatars.

## What is the difference between the shift, zoom and spread variants of AvatarStack?

`shift` lifts the hovered face upward with a spring, using `AvatarGroup`. `spread` fans the whole row apart on hover and raises the hovered face. `default` and `zoom` scale the hovered face up by about 15% with no spread. `spread` and `shift` also default `translate` to `-30%`.

## How do I show names and roles in AvatarStack tooltips?

Add `name` to each item in `avatars`, plus `designation` or `role` for a second line. The tooltip falls back to `alt` or `tooltip` when there is no `name`. Turn tooltips off with `type="default"` or `showTooltip={false}`, and use `type="tooltip"` for a tooltip without the arrow (the arrow is on by default, but not in the `shift` variant).

## What does AvatarStack depend on, and does it run in Vite?

It runs in Vite and Next.js, with no `next/*` imports. The install adds `@radix-ui/react-avatar` and `lucide-react`, and pulls in the library's Tooltip and Avatar items plus a small `animate` helper that handles `prefers-reduced-motion` for the `shift` spring.

---

Live previews and every example: https://avaraui.com/docs/nextjs/avatar-stack
