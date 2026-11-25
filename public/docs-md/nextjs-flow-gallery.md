---
title: "Shadcn Flow Gallery"
description: "Shadcn Flow Gallery. A cascading image wall that streams diagonally or straight up and down, with continuous auto-flow, drag inertia, and a tilted."
url: https://avaraui.com/docs/nextjs/flow-gallery
---

# Shadcn Flow Gallery

A cascading image wall that streams diagonally or straight up and down, with continuous auto-flow, drag inertia, and a tilted, skewed plane for the diagonal directions.

Drag the stage or allow it to auto-flow continuously along the selected directional stream angle.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/flow-gallery.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/flow-gallery
```

## Top-Left to Bottom-Right Flow Stream

```tsx
import { FlowGallery, type FlowGalleryItem } from "@/components/custom/flow-gallery";

const items: FlowGalleryItem[] = [
  {
    id: "1",
    title: "Cyberpunk Officer",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
  },
  {
    id: "2",
    title: "Neon Cyberpunk Girl",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150483/photo-1578632767115-351597cf2477-1790150482281.jpg",
  },
  {
    id: "3",
    title: "Ramen Bowl Art",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790148864/photo-1569718212165-3a8278d5f624-1790148865111.jpg",
  },
  {
    id: "4",
    title: "Suit Business Portrait",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
  },
  {
    id: "5",
    title: "Grizzly Bear Wildlife",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150482/photo-1530595467537-0b5996c41f2d-1790150482280.jpg",
  },
  {
    id: "6",
    title: "Skateboard Graphic",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150482/photo-1520045892732-304bc3ac5d8e-1790150482278.jpg",
  },
  {
    id: "7",
    title: "Abstract Fluid Ink",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150483/photo-1541701494587-cb58502866ab-1790150482281.jpg",
  },
  {
    id: "8",
    title: "Deep Space Black Hole",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790145141/photo-1451187580459-43490279c0fa-1790145143491.jpg",
  },
  {
    id: "9",
    title: "Misty Pine Forest",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "10",
    title: "Sunset Mountain Peak",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
];

export default function FlowGalleryTopLeftDemo() {
  return (
    <FlowGallery
      items={items}
      direction="top-left"
      speed={3.5}
      pauseOnHover={true}
      columns={9}
    />
  );
}
```

## Top-Right to Bottom-Left Flow Stream

```tsx
import { FlowGallery, type FlowGalleryItem } from "@/components/custom/flow-gallery";

const items: FlowGalleryItem[] = [
  {
    id: "1",
    title: "Cyberpunk Officer",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
  },
  {
    id: "2",
    title: "Neon Cyberpunk Girl",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150483/photo-1578632767115-351597cf2477-1790150482281.jpg",
  },
  {
    id: "3",
    title: "Ramen Bowl Art",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790148864/photo-1569718212165-3a8278d5f624-1790148865111.jpg",
  },
  {
    id: "4",
    title: "Suit Business Portrait",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
  },
  {
    id: "5",
    title: "Grizzly Bear Wildlife",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150482/photo-1530595467537-0b5996c41f2d-1790150482280.jpg",
  },
  {
    id: "6",
    title: "Skateboard Graphic",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150482/photo-1520045892732-304bc3ac5d8e-1790150482278.jpg",
  },
  {
    id: "7",
    title: "Abstract Fluid Ink",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150483/photo-1541701494587-cb58502866ab-1790150482281.jpg",
  },
  {
    id: "8",
    title: "Deep Space Black Hole",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790145141/photo-1451187580459-43490279c0fa-1790145143491.jpg",
  },
  {
    id: "9",
    title: "Misty Pine Forest",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "10",
    title: "Sunset Mountain Peak",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
];

export default function FlowGalleryTopRightDemo() {
  return (
    <FlowGallery
      items={items}
      direction="top-right"
      speed={3.5}
      pauseOnHover={true}
      columns={9}
    />
  );
}
```

## Straight Upward Vertical Stream (Bottom to Top)

```tsx
import { FlowGallery, type FlowGalleryItem } from "@/components/custom/flow-gallery";

const items: FlowGalleryItem[] = [
  {
    id: "1",
    title: "Cyberpunk Officer",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
  },
  {
    id: "2",
    title: "Neon Cyberpunk Girl",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150483/photo-1578632767115-351597cf2477-1790150482281.jpg",
  },
  {
    id: "3",
    title: "Ramen Bowl Art",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790148864/photo-1569718212165-3a8278d5f624-1790148865111.jpg",
  },
  {
    id: "4",
    title: "Suit Business Portrait",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
  },
  {
    id: "5",
    title: "Grizzly Bear Wildlife",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150482/photo-1530595467537-0b5996c41f2d-1790150482280.jpg",
  },
  {
    id: "6",
    title: "Skateboard Graphic",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150482/photo-1520045892732-304bc3ac5d8e-1790150482278.jpg",
  },
  {
    id: "7",
    title: "Abstract Fluid Ink",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150483/photo-1541701494587-cb58502866ab-1790150482281.jpg",
  },
  {
    id: "8",
    title: "Deep Space Black Hole",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790145141/photo-1451187580459-43490279c0fa-1790145143491.jpg",
  },
  {
    id: "9",
    title: "Misty Pine Forest",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "10",
    title: "Sunset Mountain Peak",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
];

export default function FlowGalleryVerticalUpDemo() {
  return (
    <FlowGallery
      items={items}
      direction="vertical-up"
      speed={3.5}
      pauseOnHover={true}
      columns={9}
    />
  );
}
```

## Straight Downward Vertical Stream (Top to Bottom)

```tsx
import { FlowGallery, type FlowGalleryItem } from "@/components/custom/flow-gallery";

const items: FlowGalleryItem[] = [
  {
    id: "1",
    title: "Cyberpunk Officer",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
  },
  {
    id: "2",
    title: "Neon Cyberpunk Girl",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150483/photo-1578632767115-351597cf2477-1790150482281.jpg",
  },
  {
    id: "3",
    title: "Ramen Bowl Art",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790148864/photo-1569718212165-3a8278d5f624-1790148865111.jpg",
  },
  {
    id: "4",
    title: "Suit Business Portrait",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
  },
  {
    id: "5",
    title: "Grizzly Bear Wildlife",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150482/photo-1530595467537-0b5996c41f2d-1790150482280.jpg",
  },
  {
    id: "6",
    title: "Skateboard Graphic",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150482/photo-1520045892732-304bc3ac5d8e-1790150482278.jpg",
  },
  {
    id: "7",
    title: "Abstract Fluid Ink",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150483/photo-1541701494587-cb58502866ab-1790150482281.jpg",
  },
  {
    id: "8",
    title: "Deep Space Black Hole",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790145141/photo-1451187580459-43490279c0fa-1790145143491.jpg",
  },
  {
    id: "9",
    title: "Misty Pine Forest",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "10",
    title: "Sunset Mountain Peak",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
];

export default function FlowGalleryVerticalDownDemo() {
  return (
    <FlowGallery
      items={items}
      direction="vertical-down"
      speed={3.5}
      pauseOnHover={true}
      columns={9}
    />
  );
}
```

## About Shadcn Flow Gallery

**What it is.** **Shadcn Flow Gallery** (`FlowGallery`) is an infinite diagonal or vertical cascading gallery stream with smooth drag inertia and 4 directional flow angles (`top-left`, `top-right`, `vertical-up`, `vertical-down`).

**How it is built.** Columns animate with `translate3d()` transforms written straight to the DOM, so React never re-renders per frame. The loop is paced by elapsed time, pauses when the stage is off-screen or the tab is hidden, and stops auto-flowing under `prefers-reduced-motion` (dragging still works). It has no npm dependencies.

**When to use it.** Use it for agency visual walls, moodboards, product showcase backdrops, and dynamic landing page galleries.

## For AI agents

**When to use**

- Agency visual walls, moodboards
- Product showcase backdrops, dynamic landing page galleries

**When not to use**

- A fixed grid of screenshots: use [Image Wall](https://avaraui.com/docs/nextjs/image-wall)
- A single-row horizontal slider: use [Squircle Carousel](https://avaraui.com/docs/nextjs/squircle-carousel)

**Agent notes**

- `FlowGallery` is a named and default export. It accepts `items` (`FlowGalleryItem[]` with `id`, `imageUrl` and optional `title`, used as the `alt`) and `direction` (`"top-left" | "top-right" | "vertical-up" | "vertical-down"`), plus `speed`, `pauseOnHover`, `columns`, `reverseAlternatingColumns` and `footerCaption`.
- Uses direct DOM `translate3d()` animation and pauses off-screen. Under `prefers-reduced-motion` the auto-flow stops but dragging still moves it.
- The stage is `560px` tall by default; override the height with `className`. Cards are non-interactive images.
- Prefer square or near-square images around `320px` wide (cards render at `140px`).

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `FlowGallery` | `direction` | `"top-left" \| "top-right" \| "vertical-up" \| "vertical-down"` | `"top-left"` | Directional angle of the stream. `"top-left"` and `"top-right"` tilt and skew the plane diagonally and flow downward; `"vertical-down"` flows straight down and `"vertical-up"` straight up. |
| `FlowGallery` | `items` | `FlowGalleryItem[]` | `DEFAULT_ITEMS` | Array of image objects containing `{ id, imageUrl, title? }` to display in the stream. `title` becomes the image `alt` text. |
| `FlowGallery` | `speed` | `number` | `3.5` | Continuous auto-flow speed in pixels per frame. |
| `FlowGallery` | `pauseOnHover` | `boolean` | `true` | When set to true, automatically pauses the continuous auto-flow when hovering over the stage. |
| `FlowGallery` | `columns` | `number` | `9` | Number of parallel columns flowing along the stream plane. |
| `FlowGallery` | `className` | `string` | `undefined` | Custom Tailwind CSS classes to apply to the stage container. The default height is `h-[560px]`. |
| `FlowGallery` | `reverseAlternatingColumns` | `boolean` | `true` | Makes every second column flow the opposite way. Set it to `false` so all columns move together. |
| `FlowGallery` | `footerCaption` | `string` | `""` | Small caption rendered under the stage. Nothing is rendered when it is empty. |

## Works with other components

Combine `FlowGallery` with [Image Wall](https://avaraui.com/docs/nextjs/image-wall) for 3D camera-panning photo walls, [Squircle Carousel](https://avaraui.com/docs/nextjs/squircle-carousel) for masked tile carousels, and [Marquee](https://avaraui.com/docs/nextjs/marquee) for linear infinite strips.

## What image size should I use for FlowGallery?

Use square or near-square images around `320px` wide. Each card renders at `140px` square with `object-fit: cover`, so 320px keeps them sharp on high-density screens, and larger files only add decode time and memory. Images use `loading="lazy"`, so `imageUrl` can point at any CDN.

## Does FlowGallery pause when it is off-screen?

Yes. The animation loop stops when the stage scrolls out of view (with a 120px margin) and when the browser tab is hidden, then resumes. With `prefers-reduced-motion: reduce` set, auto-flow stays off, but visitors can still drag the stage and it keeps its inertia.

## How do I change the direction and speed of FlowGallery?

Set `direction` to `"top-left"`, `"top-right"`, `"vertical-down"` or `"vertical-up"`, and `speed` to the pixels moved per frame (default `3.5`, normalised across refresh rates). Only `"vertical-up"` flows upward. By default alternate columns run backwards; set `reverseAlternatingColumns={false}` to unify them.

## How do I use my own images in FlowGallery?

Pass `items`, an array of `{ id, imageUrl, title? }` objects. The component repeats them down each column and staggers the starting image per column, so a short list still fills every column. The optional `title` becomes the `alt` text. Use `columns` to change how many columns are drawn.

## Can visitors drag the FlowGallery, and do the cards link anywhere?

Dragging works with pointer events and carries inertia that decays after release. `pauseOnHover` only holds the auto-flow while a mouse is over the stage. The cards are non-interactive images with `pointer-events: none`, so they do not link. The stage sets no `touch-action`; add `touch-none` via `className` if touch drags scroll the page.

---

Live previews and every example: https://avaraui.com/docs/nextjs/flow-gallery
