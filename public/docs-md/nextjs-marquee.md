---
title: "Marquee"
description: "An infinite, seamless scrolling marquee ideal for logos, testimonials, and image galleries. Free shadcn/ui Marquee component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/marquee
---

# Marquee

An infinite, seamless scrolling marquee ideal for logos, testimonials, and image galleries.

This `MarqueeBlock` is engineered to be **flawless**. By exactly duplicating the content and using a precise CSS calculation (`calc(-100% - gap)`), the animation loops infinitely without any stuttering, lagging, or "snap back" resets that plague older implementations.

You only supply one set of items — the block duplicates them and offsets the copy by `calc(-100% - gap)`, so the loop never snaps.

## Marquee

- Pass `children=once` — the block renders a second `aria-hidden` copy itself to close the loop. Duplicating them yourself gives a visible double run.
- `fade` is off by default; on, it masks the first and last 10% so items dissolve instead of being clipped.
- `pauseOnHover` is off by default; on, it freezes the loop while the pointer is inside.
- `gap="4rem"` is a raw CSS length that both spaces the items and feeds the loop maths — a `%` value breaks it.
- `direction="left"` is the default: content travels leftwards.

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

## Examples

### Reverse direction

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

### Vertical

Vertical marquees need a bounded height — without one the container grows to fit both tracks and nothing appears to move.

- Use `direction="up"` to scroll the column upwards — it switches the container to `flex-col` and animates `translateY`.
- `direction="down"` runs the same column the other way.
- `fade` follows the axis on its own, masking the top and bottom edges here.

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

### Speed

`speed` is a duration for one full pass, not a pixels-per-second rate — the same value moves faster with fewer items.

- Use `speed="slow"` for 40s per pass — a calm drift, good for large imagery.
- `speed="normal"` is the default: 20s per pass.
- `speed="fast"` gives 10s per pass — ticker pace.
- `speed={45}` a raw number sets the seconds per pass directly.

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

### Without fade or pause

- Set `fade={false}` to drop the edge mask and let items run to a hard edge.
- `pauseOnHover={false}` keeps the loop running under the cursor. Both are the defaults.

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

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | Required | One set of items. The block duplicates them internally to close the loop. |
| `direction` | `"left" \| "right" \| "up" \| "down"` | `"left"` | Travel direction. Vertical values need a bounded height on the container. |
| `speed` | `"slow" \| "normal" \| "fast" \| number` | `"normal"` | Preset pace, or the duration of one full pass in seconds. |
| `pauseOnHover` | `boolean` | `false` | Pauses the animation while the pointer is over the marquee. |
| `fade` | `boolean` | `false` | Applies a gradient `mask-image` so items dissolve at both edges. |
| `gap` | `string` | `"1rem"` | CSS gap between items. The loop math accounts for it, so any value stays seamless. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/marquee
