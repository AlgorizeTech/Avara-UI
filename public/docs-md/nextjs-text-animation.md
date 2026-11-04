---
title: "Text Animation"
description: "A powerful typography component that breathes life into your text with plain CSS keyframes — no animation library. Free shadcn/ui Text Animation component."
url: https://avaraui.com/docs/nextjs/text-animation
---

# Text Animation

A powerful typography component that breathes life into your text with plain CSS keyframes — no animation library. It supports multiple animation variants like typewriter effects, focus reveals, 3D flips, and more.

It is perfect for hero sections, landing page headers, and grabbing user attention.

Each effect fires when it scrolls into view (once, via an `IntersectionObserver`), so scroll a preview back into frame — or hit its reload button — to replay.

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

## Examples

### Variants

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

### Timing

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

### Custom element & color

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
| `TextAnimation` | `renderWord` | `(word: string, index: number) => ReactNode` | — | Swap what a word renders as while keeping its entrance — a coloured span, a word that later changes. Word-level variants only: `pop-in`, `flip`, `blur-in-up`. [Component Wall](https://avaraui.com/docs/nextjs/component-wall) uses it for its accent and turning word. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/text-animation
