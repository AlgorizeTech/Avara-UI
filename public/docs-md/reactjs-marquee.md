---
title: "Shadcn Marquee"
description: "An infinite, seamless scrolling marquee for logos, testimonials and image galleries. Free shadcn/ui Marquee component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/marquee
---

# Shadcn Marquee

An infinite, seamless scrolling marquee for logos, testimonials and image galleries. Supply one set of items: the block repeats them and offsets each track by `calc(-100% - gap)`, so the loop never stutters or snaps back.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/marquee.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/marquee
```

## Marquee

- Pass `children` once. The block renders a second `aria-hidden` copy itself to close the loop, so duplicating them yourself gives a visible double run.
- `gap="4rem"` is a raw CSS length that both spaces the items and feeds the loop maths. A `%` value breaks it.

```tsx
import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

import {
  Box,
  Boxes,
  Code2,
  Command,
  Hexagon,
  Layers,
  Network,
  Palette,
  Sparkles,
  Triangle,
} from "lucide-react";

const logos = [
  { icon: Command, name: "Command" },
  { icon: Palette, name: "Palette" },
  { icon: Sparkles, name: "Motion" },
  { icon: Boxes, name: "Packages" },
  { icon: Network, name: "Network" },
  { icon: Hexagon, name: "Hexagon" },
  { icon: Layers, name: "Layers" },
  { icon: Triangle, name: "Triangle" },
  { icon: Code2, name: "Code" },
  { icon: Box, name: "Blocks" },
];

export default function LogoSection() {
  return (
    <MarqueeBlock direction="left" speed="normal" pauseOnHover fade gap="4rem">
      {logos.map((logo) => (
        <div
          key={logo.name}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold text-xl"
        >
          <logo.icon className="w-8 h-8" />
          {logo.name}
        </div>
      ))}
    </MarqueeBlock>
  );
}
```

## Reverse direction

- Set `direction="right"` to run the same animation backwards — pair it with a `left` row above or below for a two-row logo wall.

```tsx
import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

import {
  Box,
  Boxes,
  Code2,
  Command,
  Hexagon,
  Layers,
  Network,
  Palette,
  Sparkles,
  Triangle,
} from "lucide-react";

const logos = [
  { icon: Command, name: "Command" },
  { icon: Palette, name: "Palette" },
  { icon: Sparkles, name: "Motion" },
  { icon: Boxes, name: "Packages" },
  { icon: Network, name: "Network" },
  { icon: Hexagon, name: "Hexagon" },
  { icon: Layers, name: "Layers" },
  { icon: Triangle, name: "Triangle" },
  { icon: Code2, name: "Code" },
  { icon: Box, name: "Blocks" },
];

export default function ReverseLogoWall() {
  // Reverses the travel; everything else is identical.
  return (
    <MarqueeBlock direction="right" gap="4rem" fade pauseOnHover>
      {logos.map((logo) => (
        <div
          key={logo.name}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold text-xl"
        >
          <logo.icon className="w-8 h-8" />
          {logo.name}
        </div>
      ))}
    </MarqueeBlock>
  );
}
```

## Vertical

Vertical marquees need a bounded height. Without one the container grows to fit both tracks and nothing appears to move.

- Use `direction="up"` to scroll the column upwards; `"down"` runs it the other way.

```tsx
import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

const testimonials = [
  {
    name: "Sarah Connor",
    role: "Product Manager",
    text: "This component library has completely transformed our workflow. Everything just works perfectly out of the box.",
  },
  {
    name: "John Wick",
    role: "Lead Developer",
    text: "The cleanest, most well-documented React code I have ever seen. Absolutely essential for modern web dev.",
  },
  {
    name: "Ellen Ripley",
    role: "UX Designer",
    text: "Beautiful default styles and incredibly smooth animations. It makes prototyping high-fidelity interfaces a breeze.",
  },
  {
    name: "Neo",
    role: "Software Engineer",
    text: "Finally, a library that gives me full control over the code without abstracting away all the important details.",
  },
];

export default function TestimonialColumn() {
  // Vertical travel needs a bounded height on the block itself.
  return (
    <MarqueeBlock direction="up" gap="1.5rem" fade pauseOnHover className="h-[380px] w-full max-w-[300px]">
      {testimonials.map((t) => (
        <div
          key={t.name}
          className="w-[300px] shrink-0 p-6 rounded-2xl bg-card text-card-foreground border border-border shadow-sm flex flex-col gap-4"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            &quot;{t.text}&quot;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold text-muted-foreground">
              {t.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {t.name}
              </p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </MarqueeBlock>
  );
}
```

## Speed

`speed` is a duration for one full pass, not a pixels-per-second rate, so the same value moves faster with fewer items.

- Use `speed="slow"` for a calm 40s pass. `"normal"` is the default (20s), `"fast"` is 10s, and a raw number sets the seconds directly.

```tsx
import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

const images = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1447752875215-b2761acb3c5d-1790148865109.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1507525428034-b723cf961d3e-1790146212208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1519681393784-d120267933ba-1790146212210.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
];

export default function SlowGallery() {
  // speed takes "slow" | "normal" | "fast".
  return (
    <MarqueeBlock direction="left" speed="slow" gap="1.5rem" fade pauseOnHover>
      {images.map((src) => (
        <div
          key={src}
          className="w-[220px] h-[160px] shrink-0 rounded-2xl overflow-hidden shadow-md border border-border"
        >
          <img src={src} alt="Nature landscape" className="w-full h-full object-cover" />
        </div>
      ))}
    </MarqueeBlock>
  );
}
```

## Without fade or pause

- Use `fade={false}` to drop the edge mask, and `pauseOnHover={false}` to keep the loop running under the cursor. Both are the defaults.

```tsx
import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

import {
  Box,
  Boxes,
  Code2,
  Command,
  Hexagon,
  Layers,
  Network,
  Palette,
  Sparkles,
  Triangle,
} from "lucide-react";

const logos = [
  { icon: Command, name: "Command" },
  { icon: Palette, name: "Palette" },
  { icon: Sparkles, name: "Motion" },
  { icon: Boxes, name: "Packages" },
  { icon: Network, name: "Network" },
  { icon: Hexagon, name: "Hexagon" },
  { icon: Layers, name: "Layers" },
  { icon: Triangle, name: "Triangle" },
  { icon: Code2, name: "Code" },
  { icon: Box, name: "Blocks" },
];

export default function BareLogoWall() {
  // No fade mask and no hover pause — the plainest marquee there is.
  return (
    <MarqueeBlock direction="left" gap="4rem" fade={false} pauseOnHover={false}>
      {logos.map((logo) => (
        <div
          key={logo.name}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-semibold text-xl"
        >
          <logo.icon className="w-8 h-8" />
          {logo.name}
        </div>
      ))}
    </MarqueeBlock>
  );
}
```

## About Shadcn Marquee

**What it is.** **Shadcn Marquee** (`MarqueeBlock`) is a seamless infinite scrolling ticker for logos, testimonials, and image strips in horizontal (`left`, `right`) or vertical (`up`, `down`) directions.

**How it is built.** Supply your children once; `MarqueeBlock` renders them in four flex tracks, the first readable and the other three `aria-hidden`, and animates each by `calc(-100% - gap)` so loops never jump. It is plain CSS keyframes with no npm dependency. `speed`, `fade` and `pauseOnHover` are props, and motion pauses under `prefers-reduced-motion`.

**When to use it.** Use it for customer logo walls, live testimonial columns, social proof strips, and gallery tickers.

## For AI agents

**When to use**

- Customer logo walls, live testimonial columns
- Social proof strips, gallery tickers

**When not to use**

- A grouped "built with" strip that cycles through tool groups: use [Tech Stack](https://avaraui.com/docs/reactjs/tech-stack)
- A 3D arc of cards instead of a flat ticker: use [Curved Carousel](https://avaraui.com/docs/reactjs/curved-carousel)

**Agent notes**

- Named export: `import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock"`. It forwards a ref and other `div` attributes.
- Pass `children` once. They are rendered four times in total, so keep them non-interactive and avoid `id` attributes on them.
- `gap` must be a CSS length (like `"4rem"`), not a percentage.
- Vertical marquees (`direction="up" | "down"`) require a bounded height on the container to scroll.
- `fade` and `pauseOnHover` both default to `false`, so pass them explicitly when you want them.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | Required | One set of items. The block repeats them in hidden tracks to close the loop. |
| `direction` | `"left" \| "right" \| "up" \| "down"` | `"left"` | Travel direction. Vertical values need a bounded height on the container. |
| `speed` | `"slow" \| "normal" \| "fast" \| number` | `"normal"` | Preset pace, or the duration of one full pass in seconds. |
| `pauseOnHover` | `boolean` | `false` | Pauses the animation while the pointer is over the marquee. |
| `fade` | `boolean` | `false` | Applies a gradient `mask-image` so items dissolve at both edges. |
| `gap` | `string` | `"1rem"` | CSS gap between items. Any CSS length keeps the loop seamless; avoid percentages. |

## Works with other components

- [Tech Stack](https://avaraui.com/docs/reactjs/tech-stack) pairs with `MarqueeBlock` for alternating tool strips.
- [Curved Carousel](https://avaraui.com/docs/reactjs/curved-carousel) is the option for a 3D concave arc of cards.
- [Flow Gallery](https://avaraui.com/docs/reactjs/flow-gallery) suits diagonal image streams.

## Why isn't my vertical marquee scrolling?

Vertical marquees (`direction="up"` or `"down"`) need a fixed or bounded height on the container, such as `className="h-[380px]"`. Without one, the flex column grows to fit every track at once, so the content has nothing to scroll past. Horizontal marquees fill the width of their parent.

## Should I use percentage values for the Marquee gap?

No. Pass `gap` as a concrete CSS length such as `"4rem"` or `"24px"`. The same value spaces the items and feeds the `calc(-100% - gap)` offset that closes the loop, and a percentage resolves against different boxes in each place, so the tracks no longer line up.

## How do I change the Marquee speed?

Set `speed` to `"slow"`, `"normal"` or `"fast"`, which run one pass in 40, 20 and 10 seconds. A number sets the seconds directly, so `speed={30}` is 30 seconds. It is a duration for one pass of the track, not a pixel rate, so a longer set of items moves faster at the same value.

## Does the Marquee respect prefers-reduced-motion?

Yes. The block injects a `prefers-reduced-motion: reduce` rule that sets `animation-play-state: paused`, so the track holds still for visitors who asked for less motion. Everything else, including `fade` and `gap`, behaves normally, and the first copy of your items stays readable.

## Is it safe to put links or buttons inside a Marquee?

Be careful. `MarqueeBlock` renders your children four times: the first track is readable and the other three are `aria-hidden`. That hides the copies from screen readers, but not from keyboard focus, so links and buttons appear several times in the tab order. Use it for logos, quotes and images.

## How do I pause the Marquee on hover or fade its edges?

Pass `pauseOnHover` to pause the animation while the pointer is over the container, and `fade` to apply a gradient mask over the first and last 10% so items dissolve at both edges. Both default to `false`. The mask runs left to right for horizontal marquees and top to bottom for vertical ones.

---

Live previews and every example: https://avaraui.com/docs/nextjs/marquee
