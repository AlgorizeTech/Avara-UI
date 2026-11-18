---
title: "Shadcn Hover Peek"
description: "Shadcn Hover Peek. An editorial manifesto typography section with interactive word hovers that smoothly reveal a slow-zooming physical deck of 8 stacking…"
url: https://avaraui.com/docs/nextjs/hover-peek
---

# Shadcn Hover Peek

An editorial manifesto typography section with interactive word hovers that smoothly reveal a slow-zooming physical deck of 8 stacking nature images.

When the user hovers over any highlighted bold phrase, a card viewport smoothly zooms in from the text center like a modal, progressively dropping 8 nature images one on top of another with organic alternating physical tilts and depth.

## Hover Peek Section

Editorial statement typography with interactive word hovers that progressively pile an 8-card nature deck with alternating physical tilts.

- `badge="(Our Philosophy)"` top eyebrow text tag displayed in uppercase tracking.
- `statement="We shape **organic sanctuaries**..."` markdown bold **phrases** automatically connect to corresponding image sets.
- `highlights=HoverPeekHighlight[]` array of 8 nature image URLs per highlighted word.

```tsx
"use client";

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

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `badge` | `string` | `&quot;(Our Philosophy)&quot;` | Eyebrow label displayed above the typography statement. |
| `statement` | `string` | `DEFAULT_STATEMENT` | The manifesto statement string. Words enclosed in `**word**` will be rendered as interactive highlights. |
| `highlights` | `HoverPeekHighlight[]` | `DEFAULT_HOVER_PEEK_HIGHLIGHTS` | Array of highlight items, each with `id`, `word`, and an array of 8 nature images. |
| `cardWidth` | `number` | `220` | Width of each image card in the floating stack popover. |
| `cardHeight` | `number` | `280` | Height of each image card in the floating stack popover. |
| `stackInterval` | `number` | `160` | Delay (in ms) between consecutive cards dropping onto the stack. |
| `themeColor` | `string` | `undefined` | Custom theme accent color applied to the badge, active word, and underline decorations. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/hover-peek
