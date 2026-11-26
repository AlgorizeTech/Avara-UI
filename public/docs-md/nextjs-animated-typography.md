---
title: "Shadcn Animated Typography"
description: "Shadcn Animated Typography. A highly accessible, semantic typography engine that supports all standard HTML text tags with advanced."
url: https://avaraui.com/docs/nextjs/animated-typography
---

# Shadcn Animated Typography

A highly accessible, semantic typography engine that supports all standard HTML text tags with advanced, staggered visual effects and deep layout controls.

Building animated text that scales responsively and doesn't break screen readers is tricky. Standard staggered character animations often result in screen readers spelling out words letter-by-letter. This `AnimatedTypographyBlock` automatically wraps your content in an `sr-only` tag for assistive technologies, while orchestrating the visual animations on hidden child spans.

It features a **Smart Sizing Engine**. You can maintain semantic SEO value (like rendering an `h1`) but visually override the size using either a Tailwind class (`3xl`) or a hardcoded CSS value (`24px`, `2rem`).

Every example remounts when it scrolls into view, so the animation plays. Reach for the reload button in a preview's header to replay it.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/animated-typography.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/animated-typography
```

## Typewriter

Types each word, holds it, deletes it and moves on behind a blinking caret, as in the Hero's typing title. The prefix re-centres as the word changes, just like the hero.

- `variant="typewriter"` types and deletes each word in turn.
- `prefixPosition="fluid"` the default here: the text before the word re-centres as it types and deletes.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

const words = ["Interfaces", "Components", "Experiences"];

export default function TypewriterShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="typewriter" align="center" titlePrefix="Build " text="Interfaces" words={words} />
      <AnimatedTypographyBlock as="h4" variant="typewriter" align="center" titlePrefix="Build " text="Interfaces" words={words} />
      <AnimatedTypographyBlock as="p" variant="typewriter" align="center" titlePrefix="Build " text="Interfaces" words={words} />
    </div>
  );
}
```

## Examples

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/animated-typography.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/animated-typography
```

### Typewriter, Fixed Prefix

The same typewriter with the prefix held in place: the line keeps the longest word's width, so only the typed word moves.

- `prefixPosition="fixed"` reserves the longest word's width, so the text before it never moves.
- `variant="typewriter"` types and deletes each word in turn.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

const words = ["Interfaces", "Components", "Experiences"];

export default function TypewriterFixedShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="typewriter" prefixPosition="fixed" align="center" titlePrefix="Build " text="Interfaces" words={words} />
      <AnimatedTypographyBlock as="h4" variant="typewriter" prefixPosition="fixed" align="center" titlePrefix="Build " text="Interfaces" words={words} />
      <AnimatedTypographyBlock as="p" variant="typewriter" prefixPosition="fixed" align="center" titlePrefix="Build " text="Interfaces" words={words} />
    </div>
  );
}
```

### Letter Bounce Word Rotator

The word leaves letter by letter; the next springs in one letter at a time, as in the Hero's bounce title.

- `variant="letter-bounce"` rotates words, each letter springing in and out.
- `words=["Interfaces", …]` the words to cycle through after titlePrefix.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

const words = ["Interfaces", "Components", "Experiences"];

export default function LetterBounceShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="letter-bounce" align="center" titlePrefix="Build " text="Interfaces" words={words} />
      <AnimatedTypographyBlock as="h4" variant="letter-bounce" align="center" titlePrefix="Build " text="Interfaces" words={words} />
      <AnimatedTypographyBlock as="p" variant="letter-bounce" align="center" titlePrefix="Build " text="Interfaces" words={words} />
    </div>
  );
}
```

### Word Flip

The word slides up and out, then the next slides up in from below, as in the homepage hero.

- `variant="word-flip"` slides words vertically through a clipped slot.
- `interval=2400` milliseconds each word stays.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

const words = ["Interfaces", "Components", "Experiences"];

export default function WordFlipShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="word-flip" align="center" titlePrefix="Build " text="Interfaces" words={words} />
      <AnimatedTypographyBlock as="h4" variant="word-flip" align="center" titlePrefix="Build " text="Interfaces" words={words} />
      <AnimatedTypographyBlock as="p" variant="word-flip" align="center" titlePrefix="Build " text="Interfaces" words={words} />
    </div>
  );
}
```

### Blur Swap

The outgoing word lifts away into a blur as the next sharpens out of one, as in the Hero Carousel headline.

- `variant="blur-swap"` cross-fades words through a blur.
- `words=["Interfaces", …]` the words to cycle through after titlePrefix.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

const words = ["Interfaces", "Components", "Experiences"];

export default function BlurSwapShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="blur-swap" align="center" titlePrefix="Build " text="Interfaces" words={words} />
      <AnimatedTypographyBlock as="h4" variant="blur-swap" align="center" titlePrefix="Build " text="Interfaces" words={words} />
      <AnimatedTypographyBlock as="p" variant="blur-swap" align="center" titlePrefix="Build " text="Interfaces" words={words} />
    </div>
  );
}
```

### Blur Rise

The whole line rises out of a soft blur, as the Collage Hero heading does.

- `variant="blur-rise"` lifts the line in while it comes into focus.
- `align="center"` centers the text aligned to the middle.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function BlurRiseShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="blur-rise" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="h4" variant="blur-rise" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="p" variant="blur-rise" align="center" text="The quick brown fox jumps over the lazy dog." />
    </div>
  );
}
```

### Color Wipe

An accent copy of the text is unclipped left to right over the foreground, the technique behind the Honeycomb Hero title.

- `variant="color-wipe"` sweeps the text color from foreground to the accent.
- `color="primary"` the color the wipe ends in.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function ColorWipeShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="color-wipe" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="h4" variant="color-wipe" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="p" variant="color-wipe" align="center" text="The quick brown fox jumps over the lazy dog." />
    </div>
  );
}
```

### Color Reveal Staggered Sweep

Characters start in muted gray and transition left-to-right into active theme color.

- `variant="color-reveal"` transitions text from gray to active theme color from left to right.
- `align="center"` centers the text aligned to the middle.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function ColorRevealShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="color-reveal" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="h4" variant="color-reveal" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="p" variant="color-reveal" align="center" text="The quick brown fox jumps over the lazy dog." />
    </div>
  );
}
```

### Wavy Float Sine Wave

Continuous sine-wave floating vertical movement across characters.

- `variant="wavy-float"` animates characters in a smooth sine wave float.
- `align="center"` centers the text aligned to the middle.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function WavyFloatShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="wavy-float" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="h4" variant="wavy-float" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="p" variant="wavy-float" align="center" text="The quick brown fox jumps over the lazy dog." />
    </div>
  );
}
```

### 3D Perspective Flip

Words enter with 3D rotateX perspective and spring settling.

- `variant="3d-perspective-flip"` flips words in 3D around their bottom edge.
- `align="center"` centers the text aligned to the middle.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function PerspectiveFlipShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="3d-perspective-flip" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="h4" variant="3d-perspective-flip" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="p" variant="3d-perspective-flip" align="center" text="The quick brown fox jumps over the lazy dog." />
    </div>
  );
}
```

### Elastic Spring Overshoot

Playful spring bounce entrance scaling up with overshoot physics.

- `variant="elastic-spring"` bounces words with elastic spring curve.
- `align="center"` centers the text aligned to the middle.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function ElasticSpringShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="elastic-spring" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="h4" variant="elastic-spring" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="p" variant="elastic-spring" align="center" text="The quick brown fox jumps over the lazy dog." />
    </div>
  );
}
```

### Spotlight Focus Reveal

Localized spotlight beam effect revealing text out of heavy blur.

- `variant="spotlight-reveal"` focuses text from dark blur to sharp text.
- `align="center"` centers the text aligned to the middle.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function SpotlightRevealShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="spotlight-reveal" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="h4" variant="spotlight-reveal" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="p" variant="spotlight-reveal" align="center" text="The quick brown fox jumps over the lazy dog." />
    </div>
  );
}
```

### Split Stagger Entrance

Alternating letters slide in from top and bottom directions.

- `variant="split-stagger"` splits alternating characters from top/bottom offsets.
- `align="center"` centers the text aligned to the middle.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function SplitStaggerShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="split-stagger" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="h4" variant="split-stagger" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="p" variant="split-stagger" align="center" text="The quick brown fox jumps over the lazy dog." />
    </div>
  );
}
```

### Underline Stroke Draw

Synchronized liquid SVG underline stroke drawing beneath text.

- `variant="underline-draw"` animates an SVG path underline beneath text.
- `align="center"` centers the text aligned to the middle.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function UnderlineDrawShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="underline-draw" align="center" text="Creative Typography Design" />
      <AnimatedTypographyBlock as="h4" variant="underline-draw" align="center" text="Creative Typography Design" />
      <AnimatedTypographyBlock as="p" variant="underline-draw" align="center" text="Creative Typography Design" />
    </div>
  );
}
```

### Matrix Scramble Decryption

Cyberpunk symbol scrambling effect resolving to crisp text.

- `variant="matrix-scramble"` scrambles text through glyphs before resolving.
- `align="center"` centers the text aligned to the middle.

```tsx
import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function MatrixScrambleShowcase() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <AnimatedTypographyBlock as="h3" variant="matrix-scramble" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="h4" variant="matrix-scramble" align="center" text="The quick brown fox jumps over the lazy dog." />
      <AnimatedTypographyBlock as="p" variant="matrix-scramble" align="center" text="The quick brown fox jumps over the lazy dog." />
    </div>
  );
}
```

## About Shadcn Animated Typography

**What it is.** `AnimatedTypographyBlock` renders text with one of 14 `variant` animations: `matrix-scramble`, `color-reveal`, `wavy-float`, `3d-perspective-flip`, `elastic-spring`, `spotlight-reveal`, `split-stagger`, `underline-draw`, `letter-bounce`, `typewriter`, `word-flip`, `blur-swap`, `blur-rise` and `color-wipe`. `letter-bounce`, `typewriter`, `word-flip` and `blur-swap` cycle through a `words` list.

**How it is built.** It renders the real tag you choose with `as`, puts a plain-text copy in an `sr-only` span, and marks the animated copy `aria-hidden`. Motion comes from CSS keyframes and a few timers, with no animation library. `size` sets the visual size separately from the tag, and the base styles keep the text on one line.

**When to use it.** Use it for hero headlines, rotating value propositions, callouts and section titles where the wording itself should move.

## For AI agents

**When to use**

- Hero headlines, rotating value propositions
- Interactive callouts, kinetic section titles

**When not to use**

- Lightweight CSS-only text reveals with no animation library: use [Text Animation](https://avaraui.com/docs/nextjs/text-animation)
- Text set along a rotating circle: use [Circular Text](https://avaraui.com/docs/nextjs/circular-text)

**Agent notes**

- Named export `AnimatedTypographyBlock` from `@/components/custom/blocks/AnimatedTypographyBlock`. `as` defaults to `"p"` and `variant` to `"matrix-scramble"`.
- `text` is what screen readers announce. For the rotating variants (`letter-bounce`, `typewriter`, `word-flip`, `blur-swap`) pass the words in `words` and set `text` to the first word.
- `prefixPosition` is `"fixed"` or `"fluid"`. It defaults to `"fluid"` for `typewriter` and `"fixed"` for the others; use `"fixed"` when the text before the word must stay still.
- `size` takes a Tailwind key such as `"3xl"` or a CSS length such as `"2rem"`. `color` takes `primary`, `indigo`, `rose`, `emerald`, `zinc` or a hex string.
- `delay` is in milliseconds and `speed` multiplies the stagger and animation times. Set `play={false}` to hold the text at rest until it should start.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `AnimatedTypographyBlock` | `text` | `string` | — | The text content to render, and what screen readers announce. Staggered variants split this string to animate word-by-word or character-by-character. |
| `AnimatedTypographyBlock` | `as` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "p" \| "span" \| "blockquote"` | `"p"` | The semantic HTML tag to render. |
| `AnimatedTypographyBlock` | `variant` | `"matrix-scramble" \| "color-reveal" \| "wavy-float" \| "3d-perspective-flip" \| "elastic-spring" \| "spotlight-reveal" \| "split-stagger" \| "underline-draw" \| "letter-bounce" \| "typewriter" \| "word-flip" \| "blur-swap" \| "blur-rise" \| "color-wipe"` | `"matrix-scramble"` | The 14 animation patterns applied to the text. `letter-bounce`, `typewriter`, `word-flip` and `blur-swap` rotate through `words`. |
| `AnimatedTypographyBlock` | `words` | `ReactNode[]` | `[text]` | The words the rotating variants cycle through. Plain strings animate letter by letter; other nodes move whole. `text` is still what screen readers announce, so set it to the first word. |
| `AnimatedTypographyBlock` | `interval` | `number` | `2400` | Milliseconds each word stays on the rotating variants. The typewriter holds a finished word this long instead, `1800` by default. |
| `AnimatedTypographyBlock` | `prefixPosition` | `"fixed" \| "fluid"` | `"fluid"` for typewriter, `"fixed"` otherwise | Whether the text before the rotating words holds still. `fixed` reserves the longest word's width; `fluid` follows the word on show, so a centred line re-centres as the word types, deletes or swaps. |
| `AnimatedTypographyBlock` | `index` | `number` | — | Shows `words[index]` instead of stepping on a timer — for words kept in step with something else, like a carousel's slides. The typewriter keeps its own time. |
| `AnimatedTypographyBlock` | `children` | `ReactNode` | — | Rich content for `blur-rise` and `color-wipe` in place of `text`, such as a heading with an `<em>` in it. |
| `AnimatedTypographyBlock` | `play` | `boolean` | `true` | `false` renders the text at rest; the animation starts when it turns `true`. For reveals that wait on scrolling into view. |
| `AnimatedTypographyBlock` | `bare` | `boolean` | `false` | Drops the block's own weight, size, colour, alignment and padding, so `className` and the parent set the type — for composing it into a section heading. |
| `AnimatedTypographyBlock` | `titlePrefix` / `titleSuffix` | `string` | — | Static text either side of the animated part, e.g. `titlePrefix="Build "` before a rotating word. |
| `AnimatedTypographyBlock` | `align` | `"left" \| "center" \| "right" \| "justify"` | `"left"` | Controls the CSS text alignment of the underlying container. |
| `AnimatedTypographyBlock` | `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| "default" \| (hex string)` | `"primary"` | Text colour. Not applied when `bare` is set unless you pass it. |
| `AnimatedTypographyBlock` | `size` | `string` | Per tag | A Tailwind size key such as `"3xl"` (scaled down on small screens) or a CSS length such as `"2rem"`, which is clamped from 10px up to that value. |
| `AnimatedTypographyBlock` | `delay` | `number` | `0` | Base delay in milliseconds before the animation starts. |
| `AnimatedTypographyBlock` | `speed` | `number` | `1` | Multiplier for the stagger and animation times. Higher is slower. |

## Works with other components

- [Text Animation](https://avaraui.com/docs/nextjs/text-animation) for scroll-reveal headlines driven by GSAP, when you want text to animate as it enters the viewport.
- [Circular Text](https://avaraui.com/docs/nextjs/circular-text) for text set around a rotating ring, such as a badge.
- [Hover Peek](https://avaraui.com/docs/nextjs/hover-peek) for interactive editorial statements, alongside a heading from `AnimatedTypographyBlock`.

## Does AnimatedTypographyBlock break screen readers?

No. It renders your text once in an `sr-only` span, including `titlePrefix` and `titleSuffix`, and wraps the animated copy in a span with `aria-hidden="true"`. Screen readers therefore hear the sentence, not individual letters. For rotating variants they hear `text`, so set it to the first word.

## How do I keep the `titlePrefix` from shifting during typewriter animations?

Pass `prefixPosition="fixed"`. The typewriter defaults to `"fluid"`, where the text before the word re-centres as letters are typed and deleted. With `"fixed"` the block reserves the width of the longest entry in `words`, so `titlePrefix` stays where it is for the whole cycle.

## How do I rotate through several words with AnimatedTypographyBlock?

Use `variant="typewriter"`, `"letter-bounce"`, `"word-flip"` or `"blur-swap"` and pass `words`, for example `words={["Interfaces", "Components"]}` with `titlePrefix="Build "`. Each word stays `interval` ms (2400 by default, 1800 for the typewriter), or pass `index` to choose the word yourself.

## How do I change the size of AnimatedTypographyBlock without changing the heading tag?

Pass `size` and keep `as="h1"`. A Tailwind key such as `"3xl"` maps to a responsive text class, and any other value, such as `"2rem"` or `"24px"`, becomes a clamped font size that shrinks on small screens. The tag, and so the heading outline, does not change.

## How do I start an AnimatedTypographyBlock animation when it scrolls into view?

Control `play` yourself. While `play` is `false` the text renders at rest, and the animation starts the moment it becomes `true`. Set it from an IntersectionObserver or your own in-view hook, since the block does not watch scrolling on its own.

## Does AnimatedTypographyBlock respect reduced motion?

Mostly. A `prefers-reduced-motion: reduce` rule cuts the CSS animations to near zero duration, and the typewriter types and deletes whole words at once. `matrix-scramble` runs on a timer, so the media rule does not cover it; pass `play={false}` for people who prefer less motion.

---

Live previews and every example: https://avaraui.com/docs/nextjs/animated-typography
