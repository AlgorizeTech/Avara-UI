---
title: "Shadcn Squircle Carousel"
description: "Horizontal flowing carousel where images are masked behind a grid of rounded cubes with snap physics and smooth inertia. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/squircle-carousel
---

# Shadcn Squircle Carousel

Horizontal flowing carousel where images are masked behind a grid of rounded cubes with snap physics and smooth inertia.

Drag the stage left or right to explore images seamlessly across squircle tiles.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/squircle-carousel.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/squircle-carousel
```

## Interactive Squircle Grid Carousel

```tsx
import { SquircleCarousel, type SquircleCarouselItem } from "@/components/custom/squircle-carousel";

const items: SquircleCarouselItem[] = [
  {
    id: "1",
    title: "Misty Pine Forest",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "2",
    title: "Alpine Glacier Lake",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
  },
  {
    id: "3",
    title: "Sunset Mountain Range",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
];

export default function SquircleCarouselDemo() {
  return (
    <SquircleCarousel
      items={items}
      rows={4}
      gridGap={8}
      fadeWidthPercent={36}
    />
  );
}
```

## About Shadcn Squircle Carousel

**What it is.** **Shadcn Squircle Carousel** (`SquircleCarousel`) is a horizontal canvas carousel where images glide behind a mask of rounded squircle tiles with drag inertia physics.

**How it is built.** Images are asynchronously preloaded into `HTMLImageElement` instances before canvas rendering to prevent flicker, with configurable `rows`, `gridGap`, `fadeWidthPercent`, and dynamic light/dark background adaptation.

**When to use it.** Use it for high-impact visual strips, creative studio hero banners, and tactile photography showcases.

## For AI agents

**When to use**

- High-impact visual strips, creative studio hero banners
- Tactile photography showcases

**When not to use**

- A diagonal or vertical cascading stream: use [Flow Gallery](https://avaraui.com/docs/reactjs/flow-gallery)
- A 3D arc deck: use [Curved Carousel](https://avaraui.com/docs/reactjs/curved-carousel)

**Agent notes**

- `SquircleCarousel` accepts `items` (`SquircleCarouselItem[]` with `id`, `title`, `imageUrl`), `rows`, `gridGap`, and `fadeWidthPercent`.
- Uses preloaded canvas rendering with mouse/touch drag and smooth momentum deceleration.
- Prefer landscape images (`1200x800` or larger) so fragments across squircle columns stay crisp.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `SquircleCarousel` | `items` | `SquircleCarouselItem[]` | `DEFAULT_NATURE_ITEMS` | Array of image items containing `{ id, title, imageUrl }` to display in the carousel. |
| `SquircleCarousel` | `rows` | `number` | `4` | Number of horizontal rows in the squircle tile matrix. |
| `SquircleCarousel` | `gridGap` | `number` | `8` | The gap spacing in pixels between squircle tiles. |
| `SquircleCarousel` | `fadeWidthPercent` | `number` | `36` | Edge fade gradient overlay width percentage (0 to 50). |
| `SquircleCarousel` | `showHeaderShell` | `boolean` | `false` | When set to true, displays the outer header metadata title, tags, buttons, and footer caption. |
| `SquircleCarousel` | `className` | `string` | `undefined` | Custom Tailwind CSS classes to apply to the stage container element. |

## Works with other components

Combine `SquircleCarousel` with [Flow Gallery](https://avaraui.com/docs/reactjs/flow-gallery) for diagonal photo streams, [Curved Carousel](https://avaraui.com/docs/reactjs/curved-carousel) for 3D arc decks, and [Image Compare](https://avaraui.com/docs/reactjs/image-compare) for before/after image sliders.

## How do I build an image carousel with rounded squircle tiles?

Pass an `items` array of `{ id, title, imageUrl }` objects to `SquircleCarousel`. The images are drawn on a canvas behind a grid of rounded tiles, and the user drags the stage left or right to scroll. If you omit `items`, built-in nature images are used.

## How do I change the number of rows and the gap between tiles?

Use `rows`, which defaults to `4`, for the number of horizontal tile rows, and `gridGap` for the spacing in pixels between tiles, which defaults to `8`. `fadeWidthPercent` sets the edge fade overlay width from `0` to `50`, and defaults to `36`.

## Does SquircleCarousel have drag inertia and snapping?

Yes. Dragging uses inertia physics, and the stage settles with snap behaviour once you release. Images are preloaded asynchronously into `HTMLImageElement` instances before the canvas draws them, so tiles do not pop in half-loaded while you drag.

## How do I show the title, tags and buttons around the carousel?

Set `showHeaderShell` to `true`. It is `false` by default, which renders just the squircle stage. With it on, the outer header metadata, title, tags, buttons and footer caption appear around the carousel. Use `className` to size or position the stage container.

## Does SquircleCarousel need any extra packages?

It lists `next-themes` as its npm dependency, which the shadcn CLI installs with the component. The component itself has no `next/*` imports. Drawing happens on a canvas, so no carousel or animation library is added.

---

Live previews and every example: https://avaraui.com/docs/nextjs/squircle-carousel
