---
title: "Shadcn Circular Text"
description: "Circular text: words set on a circle, turning slowly, with room in the middle for a mark, a play button or a link. Free shadcn/ui Circular Text component."
url: https://avaraui.com/docs/nextjs/circular-text
---

# Shadcn Circular Text

Circular text: words set on a circle, turning slowly, with room in the middle for a mark, a play button or a link. The ring is an SVG `textPath`, so it stays crisp at any size and the words are real text — screen readers get them once, from an sr-only copy, rather than letter by letter around the ring.

The text repeats as many times as fit the circumference by default, so a short phrase fills the ring and a long one goes round once. Both [Collage Hero](https://avaraui.com/docs/reactjs/hero#collage-hero) and [Fashion Hero](https://avaraui.com/docs/reactjs/hero#fashion-hero) use it as their badge.

## Video badge

A phrase on the ring and a play button in the middle, both in the theme colour. The ring turns once every 20 seconds and holds still under prefers-reduced-motion.

- `text` is the phrase on the ring; `separator` goes between repeats, and `repeat` pins how many times it goes round instead of filling by length.
- `children` sit in the middle, centred. Anything goes — a button, a mark, a number.
- `color` is `var(--primary)` by default, so the ring follows your theme preset and the colour picker above with no prop. Pass any CSS colour to pin it.

```tsx
import { Play } from "lucide-react";

export default function VideoBadge() {
  return (
    // The ring is `var(--primary)` by default; the button uses the same tokens,
    // so both follow the theme.
    <CircularText text="Learn about us through this video" size={128} speed={20}>
      <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
        <Play size={14} className="ml-0.5 fill-current" />
      </span>
    </CircularText>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/circular-text.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/circular-text
```

## Examples

### Stamps

Two marks with their own separators, one with the inner ring — the first puts the theme colour on the ring, the second on the centre dot.

- `innerRing` draws a hairline circle just inside the text, the way a rubber stamp has an edge.
- `fontSize` and `tracking` size the ring text in units of a 100-wide circle — near enough percent of `size` — so the same values look the same at any size.

```tsx
import { CircularText } from "@/components/custom/blocks/CircularTextBlock";

export default function Stamp() {
  return (
    <>
      {/* Ring in the theme colour, mark in ink. */}
      <CircularText text="Est. 2021" separator=" ✦ " size={140} fontSize={10} innerRing>
        <span className="font-serif text-3xl italic text-foreground">tz</span>
      </CircularText>
      {/* The other way round: ring in ink, dot in the theme colour. */}
      <CircularText text="Open studio" size={110} fontSize={11} tracking={0.22} color="currentColor" className="text-foreground">
        <span className="size-3 rounded-full bg-primary" />
      </CircularText>
    </>
  );
}
```

### As a link

Wrapped in an anchor, with the centre reacting to hover through a Tailwind group.

- Set `color="currentColor"` and the ring takes the text colour of its parent — `text-primary` on the anchor here — so it follows the theme, a link's hover and dark-mode ink together.
- `direction="counterclockwise"` turns the other way; `speed={0}` stops it.

```tsx
import { ArrowUpRight } from "lucide-react";

export default function SeeTheWork() {
  return (
    // `currentColor` takes the anchor's ink — `text-primary` here — so the
    // ring, the border and the arrow all follow the theme.
    <a href="/work" className="group rounded-full text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
      <CircularText text="See the work" size={128} color="currentColor">
        <span className="grid size-12 place-items-center rounded-full border border-current transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight size={18} />
        </span>
      </CircularText>
    </a>
  );
}
```

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | Required | The words on the ring. |
| `separator` | `string` | `" · "` | Placed between repeats of `text`. |
| `repeat` | `number` | fill | How many times the text goes round. Unset, enough repeats to fill the circumference. |
| `size` | `number` | `128` | Outer size in pixels. |
| `speed` | `number` | `22` | Seconds per full turn; `0` holds still. |
| `direction` | `"clockwise" \| "counterclockwise"` | `"clockwise"` | Which way it turns. |
| `fontSize`, `tracking` | `number` | `9.5`, `0.18` | Ring text size (units of a 100-wide circle) and letter spacing (em). |
| `color` | `string` | `var(--primary)` | Ring text colour. `"currentColor"` follows the parent's text. |
| `radius` | `number` | `38` | Radius of the text path, out of 50. |
| `innerRing` | `boolean` | `false` | A hairline circle just inside the text. |
| `children` | `ReactNode` | — | What sits in the middle. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/circular-text
