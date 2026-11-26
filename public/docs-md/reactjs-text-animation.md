---
title: "Text Animation"
description: "A powerful typography component that breathes life into your text with plain CSS keyframes — no animation library. Free shadcn/ui Text Animation component."
url: https://avaraui.com/docs/nextjs/text-animation
---

# Text Animation

A powerful typography component that breathes life into your text with plain CSS keyframes — no animation library. It supports multiple animation variants like typewriter effects, focus reveals, 3D flips, and more.

It is perfect for hero sections, landing page headers, and grabbing user attention.

Each effect fires when it scrolls into view (once, via an `IntersectionObserver`), so scroll a preview back into frame — or hit its reload button — to replay.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/text-animation.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/text-animation
```

## Text animation

The component splits the string and staggers each character with CSS animation delays.

- Pass `text` as a plain string — it is split internally, so children are not read.

```tsx
import { TextAnimation } from "@/components/custom/blocks/TextAnimationBlock";

export default function HeroSection() {
  return (
    <TextAnimation
      text="Better Experiences"
      variant="typewriter"
      className="text-4xl font-extrabold tracking-tight"
    />
  );
}
```

## Variants

- Use `variant` for the effect — `typewriter`, `blur-reveal` (the default), `wave`, `pop-in`, `flip`, `spin-in` or `blur-in-up`.

```tsx
import { TextAnimation } from "@/components/custom/blocks/TextAnimationBlock";

export default function AnimationVariants() {
  // Seven effects behind one prop.
  return (
    <div className="flex flex-col gap-4">
      <TextAnimation text="Better Experiences" variant="typewriter" />
      <TextAnimation text="Better Experiences" variant="blur-reveal" />
      <TextAnimation text="Better Experiences" variant="wave" />
      <TextAnimation text="Better Experiences" variant="pop-in" />
      <TextAnimation text="Better Experiences" variant="flip" />
      <TextAnimation text="Better Experiences" variant="spin-in" />
      <TextAnimation text="Better Experiences" variant="blur-in-up" />
    </div>
  );
}
```

## Timing

- `duration={1.2}` stretches each character's transition. For `typewriter` it is the total time to type the whole string, not per character.
- `delay={0.4}` holds the whole sequence back — useful for staging a headline against a subheadline.

```tsx
import { TextAnimation } from "@/components/custom/blocks/TextAnimationBlock";

export default function TimedAnimation() {
  // `duration` stretches each character's transition, `delay` holds the whole
  // sequence back — useful for staging a headline against a subheadline.
  return (
    <TextAnimation
      text="Better Experiences"
      variant="wave"
      duration={1.2}
      delay={0.4}
    />
  );
}
```

## Custom element & color

- `as="h1"` picks the rendered tag so the headline keeps its document meaning. Defaults to `p`.
- `className` and `style` are forwarded to that element, so colour is yours to set.

```tsx
import { TextAnimation } from "@/components/custom/blocks/TextAnimationBlock";

export default function HeadlineAnimation() {
  // `as` swaps the rendered element so the headline keeps its document
  // meaning; `style` and `className` pass straight through.
  return (
    <TextAnimation
      as="h1"
      text="Better Experiences"
      variant="blur-in-up"
      className="text-5xl font-extrabold tracking-tight"
      style={{ color: "#4f46e5" }}
    />
  );
}
```

## About Text Animation

**What it is.** **Text Animation** (`TextAnimation`) is a zero-dependency CSS keyframe text component with 7 staggered effects (`blur-reveal`, `typewriter`, `wave`, `pop-in`, `flip`, `spin-in`, and `blur-in-up`).

**How it is built.** `TextAnimation` splits the `text` string internally, triggers once on scroll via `IntersectionObserver`, and lets you control the rendered HTML tag via `as` (`p` by default, or `h1`–`h6`) plus `duration` and `delay`.

**When to use it.** Use it for lightweight landing-page headlines, scroll-triggered section intros, and staggered display copy without adding an animation library.

## For AI agents

**When to use**

- Lightweight landing-page headlines, scroll-triggered section intros
- Staggered display copy without adding an animation library

**When not to use**

- The richer 14-variant text engine: use [Animated Typography](https://avaraui.com/docs/reactjs/animated-typography)
- A selection box around a phrase: use [Selection Frame](https://avaraui.com/docs/reactjs/selection-frame)

**Agent notes**

- Pass `text` as a plain string (children are not read), `variant` (`"blur-reveal" | "typewriter" | "wave" | "pop-in" | "flip" | "spin-in" | "blur-in-up"`), `as`, `duration`, and `delay`.
- Uses plain CSS keyframes and `IntersectionObserver` with zero external animation dependencies.
- Forward `className` and `style` directly to customize font size and color.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `TextAnimation` | `text` | `string` | Required | The actual text string you want to animate. |
| `TextAnimation` | `variant` | `"typewriter" \| "blur-reveal" \| "wave" \| "pop-in" \| "flip" \| "spin-in" \| "blur-in-up"` | `"blur-reveal"` | The style of the animation. |
| `TextAnimation` | `duration` | `number` | `0.5` | The duration of the animation in seconds. Note: For the typewriter effect, this is the total duration to type out the entire string. |
| `TextAnimation` | `delay` | `number` | `0` | The delay before the animation starts. |
| `TextAnimation` | `as` | `React.ElementType` | `"p"` | The HTML element to render the root wrapper as (e.g., `h1`, `h2`, `span`). |
| `TextAnimation` | `style / className` | `CSSProperties / string` | `undefined` | Since the component inherits native HTML attributes, you can easily pass `style={`{{ color: "#hex" }}`}` or Tailwind text-color utility classes to dynamically change the color of the animated text. |
| `TextAnimation` | `...props` | `HTMLAttributes<HTMLElement>` | `undefined` | Accepts all native HTML attributes (e.g., `id`, `onClick`) which are seamlessly forwarded to the wrapper element. |
| `TextAnimation` | `renderWord` | `(word: string, index: number) => ReactNode` | — | Swap what a word renders as while keeping its entrance — a coloured span, a word that later changes. Word-level variants only: `pop-in`, `flip`, `blur-in-up`. [Component Wall](https://avaraui.com/docs/reactjs/component-wall) uses it for its accent and turning word. |

## Works with other components

Pair `TextAnimation` with [Animated Typography](https://avaraui.com/docs/reactjs/animated-typography) for rotating multi-word hero titles, [Selection Frame](https://avaraui.com/docs/reactjs/selection-frame) for highlighted phrases, and [Circular Text](https://avaraui.com/docs/reactjs/circular-text) for rotating ring badges.

## How do I add a typewriter or blur-reveal text animation in React?

Render `TextAnimation` with a `text` string and a `variant` such as `"typewriter"` or `"blur-reveal"`, which is the default. It splits the text and staggers the pieces with plain CSS keyframes, so no animation library is loaded.

## Which animation variants does TextAnimation include?

There are seven: `blur-reveal`, `typewriter`, `wave`, `pop-in`, `flip`, `spin-in` and `blur-in-up`. `duration` is in seconds and defaults to `0.5`, except for `typewriter`, where it is the total time to type out the whole string. `delay` defaults to `0`.

## Does TextAnimation read JSX children?

No. Pass the copy as a plain string through the `text` prop so `TextAnimation` can split and stagger it cleanly. If you need a styled word inside the string, `renderWord` lets you swap what an individual word renders as while keeping its entrance.

## How do I render a semantic h1 heading?

Pass `as="h1"` so the root element is a heading instead of the default `p`. Native HTML attributes such as `className`, `style` and `id` are forwarded to that element, so you can style and link to it as usual.

## How do I start the animation later or slow it down?

Set `delay` in seconds to hold the start, for example to sequence two headlines, and raise `duration` to slow it. Because it is all CSS, you can pair it with [Animated Typography](https://avaraui.com/docs/reactjs/animated-typography) when you need rotating multi-word hero titles.

---

Live previews and every example: https://avaraui.com/docs/nextjs/text-animation
