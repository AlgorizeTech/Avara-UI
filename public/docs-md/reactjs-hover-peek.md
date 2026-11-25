---
title: "Shadcn Hover Peek"
description: "Shadcn Hover Peek. An editorial statement in which hovering a highlighted phrase drops a growing stack of tilted photos under the cursor."
url: https://avaraui.com/docs/nextjs/hover-peek
---

# Shadcn Hover Peek

An editorial statement in which hovering a highlighted phrase drops a growing stack of tilted photos under the cursor, then lets them fall away when the cursor leaves.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/hover-peek.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/hover-peek
```

## Hover Peek Section

Editorial statement typography with interactive word hovers that progressively pile an 8-card nature deck with alternating physical tilts.

- `badge="(Our Philosophy)"` top eyebrow text tag displayed in uppercase tracking.
- `statement="We shape **organic sanctuaries**..."` markdown bold **phrases** automatically connect to corresponding image sets.
- `highlights=HoverPeekHighlight[]` array of 8 nature image URLs per highlighted word.

```tsx
import React from "react";
import {
  HoverPeek,
  type HoverPeekHighlight,
} from "@/components/custom/blocks/HoverPeekBlock";

const HIGHLIGHTS: HoverPeekHighlight[] = [
  {
    id: "organic-sanctuaries",
    word: "organic sanctuaries",
    images: [
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1542273917363-3b1817f69a2d-1790148865110.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1434394354979-a235cd36269d-1790145143490.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145142/photo-1500530855697-b586d89ba3ee-1790145143493.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1517411032315-54ef2cb783bb-1790146212209.jpg",
    ],
  },
  {
    id: "untamed-wilderness",
    word: "untamed wilderness",
    images: [
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1483728642387-6c3bdd6c93e5-1790146212206.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790166049/photo-1527004013197-933c4bb611b3-1790166052225.jpg",
    ],
  },
  {
    id: "timeless-craft",
    word: "timeless craft",
    images: [
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1507525428034-b723cf961d3e-1790146212208.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1509316975850-ff9c5deb0cd9-1790146212209.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1519681393784-d120267933ba-1790146212210.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1469854523086-cc02fe5d8800-1790145143492.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145142/photo-1476820865390-c52aeebb9891-1790145143492.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1454496522488-7a8e488e8606-1790145143491.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145142/photo-1495616811223-4d98c6e9c869-1790145143493.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1518709268805-4e9042af9f23-1790146212209.jpg",
    ],
  },
];

const STATEMENT =
  "We shape **organic sanctuaries** where raw beauty, intuitive motion, and **untamed wilderness** harmonize to awaken quiet moments that feel honest, soulful, and deeply rooted in **timeless craft**.";

export default function HoverPeekExample() {
  return (
    <HoverPeek
      badge="(Our Philosophy)"
      statement={STATEMENT}
      highlights={HIGHLIGHTS}
    />
  );
}
```

## About Shadcn Hover Peek

**What it is.** **Shadcn Hover Peek** (`HoverPeek`) is an editorial statement block where hovering a `**bold**` phrase stacks photos onto the cursor, one card every `stackInterval` milliseconds.

**How it is built.** `HoverPeek` parses `**highlighted**` phrases inside `statement`, matches each phrase to a `HoverPeekHighlight` by `word` or `id`, and cycles that highlight's `images` onto a deck that follows the cursor. Cards pop in with alternating tilts and fall away when the cursor leaves.

**When to use it.** Use it for brand philosophy sections, editorial about pages, interactive case study intros, and storytelling hero blocks.

## For AI agents

**When to use**

- Brand philosophy sections, editorial about pages
- Interactive case study intros, storytelling hero blocks

**When not to use**

- A deck of stacked cards: use [Card Stack](https://avaraui.com/docs/reactjs/card-stack)
- An animated headline or rotating words: use [Animated Typography](https://avaraui.com/docs/reactjs/animated-typography)

**Agent notes**

- `HoverPeek` accepts `badge`, `statement` (markdown `**bold**` phrases), and `highlights` (`HoverPeekHighlight[]` mapping each `word` to an `images` array).
- Each `**phrase**` in `statement` is matched to a `HoverPeekHighlight` by `word` or `id`, ignoring case. A phrase with no match reuses the images of the first highlight.
- Any number of `images` works: they repeat in a loop and the deck keeps the latest 10 cards. Eight per highlight is a suggestion, not a limit.
- Hover only: the phrases are plain `span`s (a click toggles the deck for touch), so there is no keyboard path. The root is a `min-h-screen` section; override with `className`.
- Imports `resolveAccent` from `@/lib/accent`, which installs with the item.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `badge` | `string` | `&quot;(Our Philosophy)&quot;` | Eyebrow label displayed above the typography statement. |
| `statement` | `string` | `DEFAULT_STATEMENT` | The manifesto statement string. Words enclosed in `**word**` will be rendered as interactive highlights. |
| `highlights` | `HoverPeekHighlight[]` | `DEFAULT_HOVER_PEEK_HIGHLIGHTS` | Array of `{ id, word, images }` items. Any number of image URLs works; they repeat while the deck builds. |
| `cardWidth` | `number` | `200` | Width of each image card in pixels. Capped at 135px (65% of the value) below 640px of viewport width. |
| `cardHeight` | `number` | `undefined` | Height of each image card in pixels. Defaults to `cardWidth`, so cards are square. Capped at 135px below 640px of viewport width. |
| `stackInterval` | `number` | `280` | Milliseconds between cards dropping onto the stack while a phrase is hovered. |
| `themeColor` | `string` | `undefined` | Accent colour for the badge and the underline of the active phrase. Accepts `lavender`, `indigo`, `rose`, `emerald`, `zinc` or any CSS colour; unset follows the theme. |

## Works with other components

- [Card Stack](https://avaraui.com/docs/reactjs/card-stack) is for a draggable deck that the reader controls.
- [Animated Typography](https://avaraui.com/docs/reactjs/animated-typography) is for kinetic headlines without a photo reveal.
- [Memories Card](https://avaraui.com/docs/reactjs/memories-card) is for photo album reveals.

## How are bold words in statement linked to image decks in HoverPeek?

Wrap a phrase in double asterisks inside `statement`, such as `**timeless craft**`, and add a `highlights` entry whose `word` or `id` is that phrase. Matching ignores case. A bold phrase with no matching entry falls back to the first highlight's images.

## How many images should each HoverPeek highlight have?

Any number. While the phrase is hovered, `HoverPeek` adds a card every `stackInterval` milliseconds and cycles through `images` in order, keeping the latest 10 cards on the deck. A small counter on the top card shows its position, such as 03 / 08.

## How do I change the HoverPeek card size and stacking speed?

Set `cardWidth` (200 by default) and `cardHeight`, which defaults to the same value so cards are square. `stackInterval` is the pause between cards in milliseconds, 280 by default, so a lower number stacks faster. Below 640px of viewport width the cards shrink to at most 135px.

## Does HoverPeek work on touch screens or with a keyboard?

Partly. A tap on a highlighted phrase toggles the deck, so touch works. The phrases are plain `span`s that cannot take keyboard focus, the photos are hidden from assistive technology with `aria-hidden`, and there is no `prefers-reduced-motion` check. Keep the statement readable without the images.

## How do I set the HoverPeek accent colour?

Pass `themeColor` as `lavender`, `indigo`, `rose`, `emerald`, `zinc` or any CSS colour. It colours the `badge` text and the underline of the phrase being hovered. Leave it unset to keep the theme's default text colours.

---

Live previews and every example: https://avaraui.com/docs/nextjs/hover-peek
