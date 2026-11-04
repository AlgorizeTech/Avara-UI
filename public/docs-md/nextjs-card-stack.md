---
title: "Shadcn Card Stack"
description: "Shadcn Card Stack. A layered deck of cards featuring fluid drag-to-discard gestures, button-driven directional slide animations."
url: https://avaraui.com/docs/nextjs/card-stack
---

# Shadcn Card Stack

A layered deck of cards featuring fluid drag-to-discard gestures, button-driven directional slide animations, and realistic depth perspective. Users can swipe cards left or right to review and discard them, with the next cards seamlessly stepping forward.

## Swipe to Discard

Swipe or drag cards left or right to discard them. Cards behind smoothly step forward without back navigation, and the last card remains pinned in place.

- `swipeToDismiss=true` enables drag and swipe gestures on the top card to discard it to the left or right.
- `showHeader=false` hides the header bar for a clean, pure swipe card deck experience.
- `visibleCards=3` keeps at most 3 cards visible in the stack at all times (front card + 2 cards behind).

```tsx
"use client";



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

## Examples

### Infinite Loop

Continuous cyclical navigation where swiping cards seamlessly wraps around to the beginning with no header.

- `loop=true` keeps the stack cycling forever, repeating the cards cyclically.
- `showHeader=false` hides the header bar for a clean, uninterrupted swipe deck loop.

```tsx
"use client";



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

### With navigation buttons

Arrow button controls to slide cards forwards and backwards with disabled bounds at the ends.

- `showNavigation=true` displays previous and next arrow buttons in the header.
- `slideDirection=right` controls which direction the top card slides away when clicking next.

```tsx
"use client";



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

### Left Slide Direction

Slide the top card out toward the left when progressing forward with button controls.

- `slideDirection=left` animates the card exit towards the left side.

```tsx
"use client";



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

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `CardStackItem[]` | Required | Array of card items to display in the stack. |
| `title` | `string` | — | Optional heading text. If omitted, the counter (e.g. `1 of 8`) is placed on the left with navigation buttons on the right. |
| `swipeToDismiss` | `boolean` | `false` | Whether to enable dragging and swiping the top card left or right to discard. |
| `canDismissLastCard` | `boolean` | `false` | Whether the last card in the stack can be swiped away/dismissed. Defaults to `false` so the final card stays in place. |
| `showHeader` | `boolean` | `true` | Whether to render the header bar (title, counter, and navigation). Set to `false` for a pure card stack. |
| `showNavigation` | `boolean` | `true` | Whether to show header navigation arrow buttons. Set to `false` for pure swipe mode. |
| `visibleCards` | `number` | `3` | Maximum number of cards visually stacked (front card + cards behind). |
| `slideDirection` | `"right" \| "left"` | `"right"` | Direction the front card slides out when advancing forward via buttons. |
| `loop` | `boolean` | `false` | Whether navigation wraps around continuously or stops at the ends. |
| `defaultIndex` | `number` | `0` | Initial active index of the stack on mount. |
| `onCardChange` | `(index: number) => void` | — | Callback fired whenever the active card changes. |
| `onDismiss` | `(item, direction) => void` | — | Callback fired when a card is swiped/dismissed with the item and direction (`"left" \| "right"`). |
| `renderCard` | `(item, offset, isTop) => ReactNode` | — | Custom render function to replace the default card body. |
| `cardClassName` | `string` | — | Optional custom className applied to each individual card container. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/card-stack
