---
title: "Shadcn Card Stack"
description: "Shadcn Card Stack. A layered card deck (`CardStack`) with drag-to-discard swipes, previous and next buttons, optional looping."
url: https://avaraui.com/docs/nextjs/card-stack
---

# Shadcn Card Stack

A layered card deck (`CardStack`) with drag-to-discard swipes, previous and next buttons, optional looping, and a choice of GSAP or Motion builds.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/card-stack.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/card-stack
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add https://avaraui.com/r/card-stack-motion.json
```

## Swipe to Discard

Swipe or drag cards left or right to discard them. Cards behind smoothly step forward without back navigation, and the last card remains pinned in place.

- `swipeToDismiss=true` enables drag and swipe gestures on the top card to discard it to the left or right.
- `showHeader=false` hides the header bar for a clean, pure swipe card deck experience.
- `visibleCards=3` keeps at most 3 cards visible in the stack at all times (front card + 2 cards behind).

```tsx
import { Compass, Palette, Terminal, FileText } from "lucide-react";
import { CardStack, type CardStackItem } from "@/components/custom/blocks/CardStackBlock";

const ARRIVALS: CardStackItem[] = [
  {
    id: "maker-hunt",
    title: "MakerHunt",
    description: "Daily product launches for indie makers.",
    category: "Productivity",
    date: "1d ago",
    href: "https://makerhunt.example.com",
    icon: (
      <div className="size-full flex items-center justify-center bg-[#091642] text-white rounded-2xl">
        <Compass className="size-6" />
      </div>
    ),
  },
  {
    id: "design-forge",
    title: "DesignForge",
    description: "AI-powered vector generation and canvas tools for modern UI designers.",
    category: "Design",
    date: "2d ago",
    href: "https://designforge.example.com",
    icon: (
      <div className="size-full flex items-center justify-center bg-purple-600 text-white rounded-2xl">
        <Palette className="size-6" />
      </div>
    ),
  },
  {
    id: "dev-pulse",
    title: "DevPulse",
    description: "Real-time deployment monitors and automated error triage alerts.",
    category: "Developer Tools",
    date: "3d ago",
    href: "https://devpulse.example.com",
    icon: (
      <div className="size-full flex items-center justify-center bg-emerald-600 text-white rounded-2xl">
        <Terminal className="size-6" />
      </div>
    ),
  },
  {
    id: "draft-craft",
    title: "DraftCraft",
    description: "Collaborative markdown workspace with branch versioning and instant preview.",
    category: "Writing",
    date: "4d ago",
    href: "https://draftcraft.example.com",
    icon: (
      <div className="size-full flex items-center justify-center bg-amber-600 text-white rounded-2xl">
        <FileText className="size-6" />
      </div>
    ),
  },
];

export default function SwipeToDiscardDemo() {
  return (
    <CardStack
      items={ARRIVALS}
      swipeToDismiss={true}
      showHeader={false}
      onDismiss={(item: CardStackItem, direction: "left" | "right") => {
        console.log(`Dismissed ${item.title} to the ${direction}`);
      }}
    />
  );
}
```

## Infinite Loop

Continuous cyclical navigation where swiping cards seamlessly wraps around to the beginning with no header.

- `loop=true` keeps the stack cycling forever, repeating the cards cyclically.
- `showHeader=false` hides the header bar for a clean, uninterrupted swipe deck loop.

```tsx
import { Compass, Palette, Terminal, FileText } from "lucide-react";
import { CardStack, type CardStackItem } from "@/components/custom/blocks/CardStackBlock";

const ARRIVALS: CardStackItem[] = [
  {
    id: "maker-hunt",
    title: "MakerHunt",
    description: "Daily product launches for indie makers.",
    category: "Productivity",
    date: "1d ago",
    href: "https://makerhunt.example.com",
    icon: (
      <div className="size-full flex items-center justify-center bg-[#091642] text-white rounded-2xl">
        <Compass className="size-6" />
      </div>
    ),
  },
  {
    id: "design-forge",
    title: "DesignForge",
    description: "AI-powered vector generation and canvas tools for modern UI designers.",
    category: "Design",
    date: "2d ago",
    href: "https://designforge.example.com",
    icon: (
      <div className="size-full flex items-center justify-center bg-purple-600 text-white rounded-2xl">
        <Palette className="size-6" />
      </div>
    ),
  },
  {
    id: "dev-pulse",
    title: "DevPulse",
    description: "Real-time deployment monitors and automated error triage alerts.",
    category: "Developer Tools",
    date: "3d ago",
    href: "https://devpulse.example.com",
    icon: (
      <div className="size-full flex items-center justify-center bg-emerald-600 text-white rounded-2xl">
        <Terminal className="size-6" />
      </div>
    ),
  },
  {
    id: "draft-craft",
    title: "DraftCraft",
    description: "Collaborative markdown workspace with branch versioning and instant preview.",
    category: "Writing",
    date: "4d ago",
    href: "https://draftcraft.example.com",
    icon: (
      <div className="size-full flex items-center justify-center bg-amber-600 text-white rounded-2xl">
        <FileText className="size-6" />
      </div>
    ),
  },
];

export default function InfiniteLoopDemo() {
  return (
    <CardStack
      items={ARRIVALS}
      loop={true}
      swipeToDismiss={true}
      showHeader={false}
    />
  );
}
```

## With navigation buttons

Arrow button controls to slide cards forwards and backwards with disabled bounds at the ends.

- `showNavigation=true` displays previous and next arrow buttons in the header.
- `slideDirection=right` controls which direction the top card slides away when clicking next.

```tsx
import { Compass, Palette, Terminal } from "lucide-react";
import { CardStack, type CardStackItem } from "@/components/custom/blocks/CardStackBlock";

const ARRIVALS: CardStackItem[] = [
  {
    id: "maker-hunt",
    title: "MakerHunt",
    description: "Daily product launches for indie makers.",
    category: "Productivity",
    date: "1d ago",
    icon: <Compass className="size-6" />,
  },
  {
    id: "design-forge",
    title: "DesignForge",
    description: "AI-powered vector generation and canvas tools.",
    category: "Design",
    date: "2d ago",
    icon: <Palette className="size-6" />,
  },
  {
    id: "dev-pulse",
    title: "DevPulse",
    description: "Real-time deployment monitors and error alerts.",
    category: "Developer Tools",
    date: "3d ago",
    icon: <Terminal className="size-6" />,
  },
];

export default function ButtonStackDemo() {
  return (
    <CardStack
      items={ARRIVALS}
      swipeToDismiss={false}
      showNavigation={true}
      slideDirection="right"
    />
  );
}
```

## Left Slide Direction

Slide the top card out toward the left when progressing forward with button controls.

- `slideDirection=left` animates the card exit towards the left side.

```tsx
import { Compass, Palette, Terminal, FileText } from "lucide-react";
import { CardStack, type CardStackItem } from "@/components/custom/blocks/CardStackBlock";

const ARRIVALS: CardStackItem[] = [
  {
    id: "maker-hunt",
    title: "MakerHunt",
    description: "Daily product launches for indie makers.",
    category: "Productivity",
    date: "1d ago",
    href: "https://makerhunt.example.com",
    icon: (
      <div className="size-full flex items-center justify-center bg-[#091642] text-white rounded-2xl">
        <Compass className="size-6" />
      </div>
    ),
  },
  {
    id: "design-forge",
    title: "DesignForge",
    description: "AI-powered vector generation and canvas tools for modern UI designers.",
    category: "Design",
    date: "2d ago",
    href: "https://designforge.example.com",
    icon: (
      <div className="size-full flex items-center justify-center bg-purple-600 text-white rounded-2xl">
        <Palette className="size-6" />
      </div>
    ),
  },
  {
    id: "dev-pulse",
    title: "DevPulse",
    description: "Real-time deployment monitors and automated error triage alerts.",
    category: "Developer Tools",
    date: "3d ago",
    href: "https://devpulse.example.com",
    icon: (
      <div className="size-full flex items-center justify-center bg-emerald-600 text-white rounded-2xl">
        <Terminal className="size-6" />
      </div>
    ),
  },
  {
    id: "draft-craft",
    title: "DraftCraft",
    description: "Collaborative markdown workspace with branch versioning and instant preview.",
    category: "Writing",
    date: "4d ago",
    href: "https://draftcraft.example.com",
    icon: (
      <div className="size-full flex items-center justify-center bg-amber-600 text-white rounded-2xl">
        <FileText className="size-6" />
      </div>
    ),
  },
];

export default function LeftSlideDemo() {
  return (
    <CardStack
      items={ARRIVALS}
      slideDirection="left"
      swipeToDismiss={false}
      showNavigation={true}
      showHeader={true}
    />
  );
}
```

## About Shadcn Card Stack

**What it is.** `CardStack` shows a deck of `CardStackItem` cards, each offset and tilted slightly behind the one in front. Drag the top card away with `swipeToDismiss`, step with the header arrows (`showNavigation`), wrap around with `loop`, and set the depth with `visibleCards`.

**How it is built.** Cards settle into place with a spring and the top card tilts as you drag it. The GSAP build (`card-stack`) installs `gsap` and skips the motion under `prefers-reduced-motion`; the Motion build (`card-stack-motion`) installs `motion`. Neither imports `next/*`.

**When to use it.** Use `CardStack` for swipeable onboarding decks, notification stacks, and card reviews. For a photo deck with 3D pointer tilt, use [Memories Card](https://avaraui.com/docs/reactjs/memories-card); for scroll-driven card stacks, use [Scroll Stack](https://avaraui.com/docs/reactjs/scroll-stack).

## For AI agents

**When to use**

- Swipe-to-discard or button-driven layered card decks (`swipeToDismiss`, `loop`, `showNavigation`)

**When not to use**

- Scroll-driven sticky card stacks — use [Scroll Stack](https://avaraui.com/docs/reactjs/scroll-stack)
- Reorderable drag-and-drop lists — use [Draggable Card List](https://avaraui.com/docs/reactjs/draggable-card-list)

**Agent notes**

- Named exports: `CardStack`, `type CardStackItem` from `@/components/custom/blocks/CardStackBlock`; there is also a default export. The GSAP build (`card-stack`) and the Motion twin (`card-stack-motion`) install to the same path, so add only one
- Every `CardStackItem` needs a unique `id` and a `title`; `description`, `category`, `date`, `meta`, `icon` (a node or an image URL string) and `href` are optional
- Set `loop={true}` for infinite cycling; without `loop`, the final card stays pinned unless `canDismissLastCard` is true
- `renderCard` receives `(item, offset, isTop)`, where `offset` is 0 for the front card and grows toward the back
- Cards have a fixed height (about 200px) and clip overflow, so keep custom content short
- `swipeToDismiss` is off by default, so the deck only moves from the header buttons until you enable it

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `CardStackItem[]` | Required | Array of card items to display in the stack. |
| `title` | `string` | — | Optional heading text. If omitted, the counter (e.g. `1 of 8`) is placed on the left with navigation buttons on the right. |
| `swipeToDismiss` | `boolean` | `false` | Whether to enable dragging and swiping the top card left or right to discard. |
| `canDismissLastCard` | `boolean` | `false` | Whether the last card can be swiped away, which shows a "Replay deck" panel. Defaults to `false` so the final card stays in place. Not needed when `loop` is set. |
| `showHeader` | `boolean` | `true` | Whether to render the header bar (title, counter, and navigation). Set to `false` for a pure card stack. |
| `showNavigation` | `boolean` | `true` | Whether to show header navigation arrow buttons. They sit inside the header, so turning `showHeader` off hides them too. |
| `visibleCards` | `number` | `3` | Maximum number of cards visually stacked (front card + cards behind). |
| `slideDirection` | `"right" \| "left"` | `"right"` | Direction the front card slides out when advancing forward via buttons. |
| `loop` | `boolean` | `false` | Whether buttons and swipes wrap around continuously or stop at the ends. |
| `defaultIndex` | `number` | `0` | Initial active index of the stack on mount. |
| `onCardChange` | `(index: number) => void` | — | Callback fired whenever the active card changes. |
| `onDismiss` | `(item, direction) => void` | — | Callback fired when a card is swiped/dismissed with the item and direction (`"left" \| "right"`). |
| `renderCard` | `(item, offset, isTop) => ReactNode` | — | Custom render function to replace the default card body. The second argument is the card's depth, 0 for the front card. |
| `cardClassName` | `string` | — | Optional custom className applied to each individual card container. |

## Works with other components

- Compare with [Memories Card](https://avaraui.com/docs/reactjs/memories-card) for 3D-tilting photo decks and [Scroll Stack](https://avaraui.com/docs/reactjs/scroll-stack) for scroll-linked decks.
- Use [Draggable Card List](https://avaraui.com/docs/reactjs/draggable-card-list) when users should reorder a list rather than discard cards one by one.

## How do I make CardStack cycle infinitely when swiping?

Pass `loop={true}` to `CardStack`. Swiping or pressing the arrows past the last card then wraps back to the first item, and the previous and next buttons are never disabled. Without `loop`, the deck stops at the ends, and `canDismissLastCard` decides whether the final card can be swiped away.

## How do I enable swipe to dismiss on CardStack?

Set `swipeToDismiss` to `true`, and add `showHeader={false}` if you want a pure swipe deck. The front card then drags left or right and is discarded when released past 80px or faster than 280px per second; otherwise it springs back. `onDismiss(item, direction)` reports each discard.

## How do I track which card is on top in CardStack?

Pass `onCardChange`, which receives the new active index each time the front card changes, from the arrow buttons or a swipe. `defaultIndex` sets the starting card and is clamped to the item range. `onDismiss` adds the discarded item and its direction, `"left"` or `"right"`, for swipes only.

## How do I render my own card content in CardStack?

Pass `renderCard`, called as `renderCard(item, offset, isTop)`, to replace the default body. The wrapper still supplies the rounded, bordered surface and the drag behaviour, and `cardClassName` adds classes to it. `item` keeps any extra fields you add, since `CardStackItem` accepts arbitrary keys. Cards are about 200px tall and clip overflow.

## Should I use the GSAP or the Motion build of CardStack?

Pick the library your project already ships. `card-stack` uses `gsap` and checks `prefers-reduced-motion`, placing cards without animation when it is set. `card-stack-motion` uses `motion` and has no reduced-motion check of its own. Both take the same props and install to the same path, so add only one.

---

Live previews and every example: https://avaraui.com/docs/nextjs/card-stack
