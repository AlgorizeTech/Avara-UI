---
title: "Shadcn Circular Text"
description: "Text set on a rotating SVG circle, with room in the middle for a mark, a play button or a link. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/circular-text
---

# Shadcn Circular Text

Text set on a rotating SVG circle, with room in the middle for a mark, a play button or a link.

The text repeats as many times as fit the circumference by default, so a short phrase fills the ring and a long one goes round once. Both [Collage Hero](https://avaraui.com/docs/nextjs/hero#collage-hero) and [Fashion Hero](https://avaraui.com/docs/nextjs/hero#fashion-hero) use it as their badge.

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

## Video badge

A phrase on the ring and a play button in the middle, both in the theme colour. The ring turns once every 20 seconds and holds still under prefers-reduced-motion.

- `text` is the phrase on the ring; `separator` goes between repeats, and `repeat` pins how many times it goes round instead of filling by length.
- `children` sit in the middle, centred. Anything goes — a button, a mark, a number.
- `color` is `var(--primary)` by default, so the ring follows your theme preset and the colour picker above with no prop. Pass any CSS colour to pin it.

```tsx
import { Play } from "lucide-react";
import { CircularText } from "@/components/custom/blocks/CircularTextBlock";

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

## Stamps

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

## As a link

Wrapped in an anchor, with the centre reacting to hover through a Tailwind group.

- Set `color="currentColor"` and the ring takes the text colour of its parent — `text-primary` on the anchor here — so it follows the theme, a link's hover and dark-mode ink together.
- `direction="counterclockwise"` turns the other way; `speed={0}` stops it.

```tsx
import { ArrowUpRight } from "lucide-react";
import { CircularText } from "@/components/custom/blocks/CircularTextBlock";

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

## About Shadcn Circular Text

**What it is.** **Shadcn Circular Text** (`CircularText`) sets text along a rotating SVG `textPath` circle around any centered `children` mark, play button, or icon link.

**How it is built.** The ring is an SVG `textPath` that spins with a Tailwind `animate-[spin_...]` class, so the project needs Tailwind and nothing else: the item has no npm dependencies. Short phrases repeat automatically around the ring with `separator`, screen readers read a single `sr-only` copy rather than individual characters, and rotation stops under `prefers-reduced-motion` (or when `speed={0}`).

**When to use it.** Use it for hero video badges, studio stamps, rotating CTA buttons, and editorial decorative seals.

## For AI agents

**When to use**

- Hero video badges, studio stamps
- Rotating CTA buttons, editorial decorative seals

**When not to use**

- A headline or paragraph of normal text: use [Animated Typography](https://avaraui.com/docs/nextjs/animated-typography)
- A clickable call to action with its own states: use [Button](https://avaraui.com/docs/nextjs/button)

**Agent notes**

- `CircularText` is a named export (also the default) of `@/components/custom/blocks/CircularTextBlock`. It accepts `text`, `separator`, `repeat`, `size`, `fontSize`, `tracking`, `speed`, `direction` (`"clockwise" | "counterclockwise"`), `radius`, `innerRing`, and `color` (defaults to `var(--primary)`), plus standard `div` props such as `className`.
- `fontSize` and `tracking` are relative to the ring, not pixels, so the same values look the same at any `size`.
- Keep `text` short. About 30 characters, separator included, fit one turn at the defaults, and anything past the end of the path is not drawn.
- Pass `color="currentColor"` inside an anchor or `group` link so the ring inherits hover and focus ink colors.
- Accessible by default via an `sr-only` text copy and `prefers-reduced-motion` pause.

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

## Works with other components

- Pair `CircularText` with [Video Player](https://avaraui.com/docs/nextjs/video-player) for rotating video CTA badges, [Animated Typography](https://avaraui.com/docs/nextjs/animated-typography) for kinetic headlines, and [Button](https://avaraui.com/docs/nextjs/button) for circular icon triggers.
- See it as the badge in the [Hero](https://avaraui.com/docs/nextjs/hero) collection's collage and fashion layouts.

## How do I make the ring inherit its parent link's hover color?

Pass `color="currentColor"` so the ring text takes the colour of the nearest text-colour ancestor, such as an anchor with `text-primary`. Change that ancestor's colour on hover or focus and the ring follows. The default, `var(--primary)`, follows your theme preset but not the link's own hover state.

## How do I put a button or icon in the middle of CircularText?

Pass it as `children`. It is centred in the ring, and the SVG is `aria-hidden`, so a play button, logo or number there is what assistive tech reaches, along with one `sr-only` copy of `text`. To make the whole badge a link, wrap `CircularText` in an anchor.

## How do I control how often the text repeats around the ring?

Leave `repeat` unset and `CircularText` fits as many copies of `text` plus `separator` as the circumference allows, estimated from `fontSize` and `tracking`. Pass `repeat` to force an exact count. `separator` defaults to ` · `, and `radius` (out of 50) moves the text path inward or outward.

## How do I resize CircularText and its lettering?

`size` sets the outer diameter in pixels, 128 by default. `fontSize` (9.5) and `tracking` (0.18 em) are measured against the 100-unit ring, so they scale with `size` and the lettering keeps its proportions. To fit more text, lower `fontSize` or `tracking`; raising `size` only scales the whole ring.

## How do I stop the ring from spinning?

Set `speed={0}` to render a static stamp, which removes the spin animation entirely. `speed` is the number of seconds per full turn, so larger values turn slower. Visitors who enable `prefers-reduced-motion` get a still ring automatically, whatever `speed` is, and `direction` sets which way it turns.

---

Live previews and every example: https://avaraui.com/docs/nextjs/circular-text
