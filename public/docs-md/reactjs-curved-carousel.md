---
title: "Shadcn Curved Carousel"
description: "Shadcn Curved Carousel. A full-width 3D curved arc carousel with an auto-sway motion, Motion spring physics."
url: https://avaraui.com/docs/nextjs/curved-carousel
---

# Shadcn Curved Carousel

A full-width 3D curved arc carousel with an oscillating sway or a continuous marquee motion, perspective depth cards and theme-colored card borders.

`CurvedCarousel` turns an array of images into a fanned 3D arc deck with adjustable speed and light and dark theme support.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/curved-carousel.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/curved-carousel
```

## 3D Curved Arc Sway Deck

- Use `variant="arc-sweep"` to lay the cards along a 3D curved arc with a continuous left-to-right sway. It is the default.

```tsx
import { CurvedCarousel, type CurvedCarouselCard } from "@/components/custom/blocks/CurvedCarouselBlock";

const items: CurvedCarouselCard[] = [
  { id: "card-1", title: "Misty Pine Forest", code: "001", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg" },
  { id: "card-2", title: "Alpine Mountain Reflection", code: "002", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg" },
  { id: "card-3", title: "Glacier Lake Wilderness", code: "003", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg" },
  { id: "card-4", title: "Autumn Woodland River", code: "004", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg" },
  { id: "card-5", title: "Golden Hour Valley", code: "005", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150481/photo-1507272931001-fc06c17e4f43-1790150482276.jpg" },
  { id: "card-6", title: "Mountain Ridge Sunset", code: "006", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg" },
  { id: "card-7", title: "Cascading Forest Waterfall", code: "007", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg" },
  { id: "card-8", title: "Deep Wilderness Forest", code: "008", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg" },
  { id: "card-9", title: "Emerald Mountain Meadow", code: "009", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg" },
  { id: "card-10", title: "Serene Desert Canyon", code: "010", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1509316975850-ff9c5deb0cd9-1790146212209.jpg" },
  { id: "card-11", title: "Sunlit Pine Woods", code: "011", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1473448912268-2022ce9509d8-1790148865110.jpg" },
  { id: "card-12", title: "Mystic Fog Peak", code: "012", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1519681393784-d120267933ba-1790146212210.jpg" },
];

export default function CurvedCarouselDemo() {
  return (
    <CurvedCarousel
      variant="arc-sweep"
      autoPlay={true}
      speed={1}
      color="primary"
      items={items}
      className="w-full"
    />
  );
}
```

## Continuous 3D Concave Arc Marquee

- Use `variant="infinite-marquee"` for an all-time continuous Right-to-Left infinite Marquee movement arranged in a 3D concave curved arc deck.

```tsx
import { CurvedCarousel, type CurvedCarouselCard } from "@/components/custom/blocks/CurvedCarouselBlock";

const items: CurvedCarouselCard[] = [
  { id: "card-1", title: "Misty Pine Forest", code: "001", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg" },
  { id: "card-2", title: "Alpine Mountain Reflection", code: "002", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg" },
  { id: "card-3", title: "Glacier Lake Wilderness", code: "003", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg" },
  { id: "card-4", title: "Autumn Woodland River", code: "004", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg" },
  { id: "card-5", title: "Golden Hour Valley", code: "005", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150481/photo-1507272931001-fc06c17e4f43-1790150482276.jpg" },
  { id: "card-6", title: "Mountain Ridge Sunset", code: "006", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg" },
  { id: "card-7", title: "Cascading Forest Waterfall", code: "007", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg" },
  { id: "card-8", title: "Deep Wilderness Forest", code: "008", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg" },
  { id: "card-9", title: "Emerald Mountain Meadow", code: "009", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg" },
  { id: "card-10", title: "Serene Desert Canyon", code: "010", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1509316975850-ff9c5deb0cd9-1790146212209.jpg" },
  { id: "card-11", title: "Sunlit Pine Woods", code: "011", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1473448912268-2022ce9509d8-1790148865110.jpg" },
  { id: "card-12", title: "Mystic Fog Peak", code: "012", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1519681393784-d120267933ba-1790146212210.jpg" },
];

export default function InfiniteMarqueeDemo() {
  return (
    <CurvedCarousel
      variant="infinite-marquee"
      autoPlay={true}
      speed={1}
      color="primary"
      items={items}
      className="w-full"
    />
  );
}
```

## About Shadcn Curved Carousel

**What it is.** **Shadcn Curved Carousel** (`CurvedCarousel`) is a full-width 3D curved arc deck available in oscillating `arc-sweep` and continuous `infinite-marquee` motion modes.

**How it is built.** `CurvedCarousel` updates card transforms from a 20 ms `setInterval`, using calculated 3D rotations to fan `CurvedCarouselCard` items along a perspective arc. It has no animation library or npm dependency, and the `color` prop sets the card border (`var(--primary)` by default). It is a display only: no drag, click or hover interaction, and no `prefers-reduced-motion` check.

**When to use it.** Use it for hero visual strips, product showcases, editorial photo essays, and interactive portfolio decks.

## For AI agents

**When to use**

- Hero visual strips, product showcases
- Editorial photo essays, interactive portfolio decks

**When not to use**

- A flat, swipeable slider: use [Carousel](https://avaraui.com/docs/reactjs/carousel)
- A continuous logo or testimonial ticker: use [Marquee](https://avaraui.com/docs/reactjs/marquee)

**Agent notes**

- `CurvedCarousel` accepts `items` (`CurvedCarouselCard[]` with `id`, `title`, `code`, `image`) and `variant` (`"arc-sweep" | "infinite-marquee"`).
- `variant="arc-sweep"` oscillates left and right, while `variant="infinite-marquee"` scrolls continuously right-to-left along a concave 3D arc.
- `color` only sets the card border colour: `"primary"` uses `var(--primary)`, and any other CSS colour string is used as is.
- Each card needs `id`, `title`, `code` and `image`; `title` becomes the image `alt`, and `code` is required by the type but not rendered.
- Lists shorter than the track are repeated automatically, so a handful of items still fills the arc.
- The carousel is display-only, with no drag, swipe, click or hover behaviour. Its caption text is fixed in the source.

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/curved-carousel

**When to use it.** A full-width 3D curved-arc image carousel with perspective depth cards, touch and drag controls and spring physics, in two motions: a left-to-right sway or a continuous marquee.

**When to use something else:**

- [Gallery](https://avaraui.com/docs/reactjs/gallery): for other showcase layouts such as a photo orbit, a bento grid or a video sphere.

**Gotchas:**

- Both are looks of the one `curved-carousel` item: install it once and set `variant` from the index.

### The 2 variants

1. **Arc sway deck** (`arc-sweep`): Cards lie along a 3D curved arc with a continuous left-to-right sway. The default.
   - Live: https://avaraui.com/view/curved-carousel/arc-sweep
   - Best for: a calm, immersive image deck that drifts back and forth
   - Avoid if: you want constant one-direction scrolling like a marquee
   - Traits: curved arc, left-to-right oscillating sway, default look
   - Install: `npx shadcn@latest add @avara-ui/curved-carousel`
   - Set these props: `{"variant":"arc-sweep"}`
   - Docs: https://avaraui.com/docs/nextjs/curved-carousel#3d-curved-arc-sway-deck
2. **Concave arc marquee** (`infinite-marquee`): A continuous right-to-left infinite marquee arranged on a 3D concave curved arc.
   - Live: https://avaraui.com/view/curved-carousel/infinite-marquee
   - Best for: a logo, product or photo strip that should keep moving
   - Avoid if: you want the motion to turn back on itself
   - Traits: continuous right-to-left movement, concave arc, infinite loop
   - Install: `npx shadcn@latest add @avara-ui/curved-carousel`
   - Set these props: `{"variant":"infinite-marquee"}`
   - Docs: https://avaraui.com/docs/nextjs/curved-carousel#continuous-3d-concave-arc-marquee

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"arc-sweep" \| "infinite-marquee"` | `"arc-sweep"` | Selects the active 3D curve layout architecture and movement style. |
| `items` | `CurvedCarouselCard[]` | `Preset Array` | Array of objects containing `id`, `title` (used as the image `alt`), `code` (typed as required, not rendered), and `image` (URL). |
| `autoPlay` | `boolean` | `true` | Turns the automatic motion on or off for both variants. When `false` the cards stay still. |
| `speed` | `number` | `1` | Speed multiplier for the sway (`arc-sweep`) and the scroll (`infinite-marquee`). |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Border color of the cards: a preset name (`"primary"` uses `var(--primary)`) or any CSS color string such as a hex code. |
| `className` | `string` | `""` | Custom Tailwind CSS classes applied to the root container. |

## Works with other components

- Combine `CurvedCarousel` with [Gallery](https://avaraui.com/docs/reactjs/gallery) for multi-mode 3D media views.
- Use [Carousel](https://avaraui.com/docs/reactjs/carousel) when users need to swipe through a standard slider.
- Use [Marquee](https://avaraui.com/docs/reactjs/marquee) for flat infinite logo and card strips.

## What is the difference between arc-sweep and infinite-marquee?

`arc-sweep` lays the cards around a giant wheel (padded to 24 when you pass fewer) and rocks it between -10 and +10 degrees, so the arc sways left and right. `infinite-marquee` instead scrolls a row of cards continuously right to left, bending them into a concave 3D curve.

## Does CurvedCarousel adapt to my site's theme color?

Partly. The `color` prop sets the card border: `"primary"` uses `var(--primary)`, so it follows your theme, and `"indigo"`, `"rose"`, `"emerald"` or `"zinc"` pick fixed colors. Any other string, such as a hex code, is used as the border color directly. The container background follows the light or dark theme.

## How do I use my own images in CurvedCarousel?

Pass `items` as an array of `{ id, title, code, image }`. `image` is the URL and `title` becomes the `alt` text. `code` is required by the type but never rendered. With fewer cards than the arc needs, the list repeats automatically, so even four or five images fill the deck.

## How do I stop or slow down the CurvedCarousel motion?

Set `autoPlay={false}` to freeze both variants, or lower `speed` below its default of `1` to slow them down; values above `1` speed them up. There is no pause on hover and no restart control, so wire `autoPlay` to your own state if you want one.

## Can users drag or swipe CurvedCarousel?

No. The component has no pointer, touch or click handlers, and in the marquee variant the cards carry `pointer-events-none`. It is an auto-playing display, so use [Carousel](https://avaraui.com/docs/reactjs/carousel) when visitors must navigate between slides themselves.

## Does CurvedCarousel need Motion, GSAP or other dependencies?

No. The registry item has no npm dependencies. It uses React state and a 20 ms `setInterval` to update CSS transforms, and plain `<img>` tags instead of `next/image`, so it installs the same way in Next.js and Vite. It does not check `prefers-reduced-motion`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/curved-carousel
