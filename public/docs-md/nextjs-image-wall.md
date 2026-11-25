---
title: "Shadcn Image Wall"
description: "A wall of screenshots that never ends, with a camera hanging over it. Free shadcn/ui Image Wall component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/image-wall
---

# Shadcn Image Wall

A wall of screenshots that never ends, with a camera hanging over it. The camera rests zoomed in on one card, then every few seconds pulls back, glides to the next and settles on it. Hovering the wall holds it still.

The wall repeats around itself, so the camera never finds an edge, and it fills whatever box you give it. [Component Wall](https://avaraui.com/docs/nextjs/component-wall) is this wall beside a column of hero copy.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/image-wall.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/image-wall
```

## A camera over the wall

Wait a few seconds: the camera pulls back, glides to the next card and settles on it. Hover to hold it.

- `items` are the cards, dealt into `columns` in order. Each has a mono `title` and an `image`, cropped from its top edge into the same 493:332 frame as every other card; odd columns start lower so the rows stagger.
- `interval=true` enables the auto-slide camera flight (defaults to `5500ms` per card, or pass `intervalTime` / a custom millisecond value). Pass `false` (or `0`) to turn auto-sliding off.
- `intervalTime=5500` sets the custom interval time in milliseconds when `interval={true}` (default `5500`).
- `highlightFocus=true` keeps the center card at full clarity while dimming the surrounding cards (`0.55` opacity); set to `false` to show all cards clearly.
- `draggable=false` disables drag-to-pan so the camera handles all movement on its own; set to `true` to let the user drag and pan the wall in any direction.
- `zoom=1.35` is the camera's resting scale. In a box under 420px tall it eases down to 0.72 so a few cards fit; under 640px wide, to 0.5. Mid-flight the camera pulls back to 0.64 of wherever it rests.
- `className` sizes the box — the wall has no height of its own beyond a default `h-96`. Round it, mask it, position it; the camera re-aims on every resize.
- `intro=0` in milliseconds makes the camera start pulled back and off to one side, drifting towards the first card with nothing in focus, and land on it only when the time is up — room for copy beside the wall to arrive first. The canvas is invisible until the camera has painted once, so the server-rendered wall never flashes unpositioned.

```tsx
"use client";

import { ImageWall, type WallItem } from "@/components/custom/blocks/ImageWallBlock";

const ITEMS: WallItem[] = [
  { title: "Word bounce hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg" },
  { title: "Product showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg" },
  { title: "Bento showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg" },
  { title: "Book appointment", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg" },
  { title: "Collage hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg" },
  { title: "Fashion hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg" },
  { title: "Hero carousel", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/hero-carousel-1790516064496.jpg" },
  { title: "Honeycomb hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg" },
  { title: "Gallery", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/orbit-gallery-1790516064499.jpg" },
  { title: "Newsletter", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/newsletter-1790516064499.jpg" },
  { title: "Waitlist", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/waitlist-1790516064503.jpg" },
  { title: "Footer", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/footer-1790516064495.jpg" },
  { title: "Support hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/support-hero-1790516064502.jpg" },
  { title: "Platform grid", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/platform-grid-1790516064500.jpg" },
  { title: "Profile page", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/profile-page-1790516064501.jpg" },
  { title: "Data flow", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-flow-1790516064493.jpg" },
  { title: "Navbar", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/navbar-1790516064499.jpg" },
  { title: "Login form", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/login-form-1790516064498.jpg" },
  { title: "Chart", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/chart-1790516064492.jpg" },
  { title: "Product details", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/product-details-1790516064500.jpg" },
  { title: "Reviews", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/reviews-1790516064502.jpg" },
  { title: "Calendar", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/calendar-1790516064491.jpg" },
  { title: "Invoice", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/invoice-1790516064498.jpg" },
  { title: "Data grid", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-grid-1790516064494.jpg" },
];

export default function Showcase() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-background">
      <ImageWall
        items={ITEMS}
        interval={true}
        intervalTime={5500}
        highlightFocus={true}
        draggable={false}
        className="h-[38rem] sm:h-[44rem]"
      />
    </div>
  );
}
```

## Examples

### A band, shuffled

A short strip: the camera pulls back so a few cards show, and visits them in a random order.

- `order="shuffle"` visits every card once per round in a random order instead of one after another.
- `interval=false` keeps the wall still until the reader drags it.
- A box under `420px` tall caps the zoom whatever `zoom` says, so a few cards show instead of one spilling out.

```tsx
"use client";

import { ImageWall, type WallItem } from "@/components/custom/blocks/ImageWallBlock";

const ITEMS: WallItem[] = [
  { title: "Word bounce hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg" },
  { title: "Product showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg" },
  { title: "Bento showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg" },
  { title: "Book appointment", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg" },
  { title: "Collage hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg" },
  { title: "Fashion hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg" },
  { title: "Hero carousel", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/hero-carousel-1790516064496.jpg" },
  { title: "Honeycomb hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg" },
  { title: "Gallery", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/orbit-gallery-1790516064499.jpg" },
  { title: "Newsletter", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/newsletter-1790516064499.jpg" },
  { title: "Waitlist", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/waitlist-1790516064503.jpg" },
  { title: "Footer", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/footer-1790516064495.jpg" },
  { title: "Support hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/support-hero-1790516064502.jpg" },
  { title: "Platform grid", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/platform-grid-1790516064500.jpg" },
  { title: "Profile page", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/profile-page-1790516064501.jpg" },
  { title: "Data flow", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-flow-1790516064493.jpg" },
  { title: "Navbar", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/navbar-1790516064499.jpg" },
  { title: "Login form", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/login-form-1790516064498.jpg" },
  { title: "Chart", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/chart-1790516064492.jpg" },
  { title: "Product details", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/product-details-1790516064500.jpg" },
  { title: "Reviews", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/reviews-1790516064502.jpg" },
  { title: "Calendar", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/calendar-1790516064491.jpg" },
  { title: "Invoice", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/invoice-1790516064498.jpg" },
  { title: "Data grid", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-grid-1790516064494.jpg" },
];

export default function Band() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-background">
      <ImageWall
        items={ITEMS}
        order="shuffle"
        zoom={0.72}
        interval={false}
        highlightFocus={false}
        draggable={true}
        className="h-[38rem] sm:h-[44rem]"
      />
    </div>
  );
}
```

### Held still

A full window: the camera flies from card to card on its own, and the reader can drag the wall to pan it.

- `interval=true` flies the camera on its own, resting on each card for `intervalTime` milliseconds.
- `onFocus` receives the index of the card the camera lands on, so you can caption or link it outside the wall.

```tsx
"use client";

import { ImageWall, type WallItem } from "@/components/custom/blocks/ImageWallBlock";

const ITEMS: WallItem[] = [
  { title: "Word bounce hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg" },
  { title: "Product showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg" },
  { title: "Bento showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg" },
  { title: "Book appointment", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg" },
  { title: "Collage hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg" },
  { title: "Fashion hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg" },
  { title: "Hero carousel", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/hero-carousel-1790516064496.jpg" },
  { title: "Honeycomb hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg" },
  { title: "Gallery", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/orbit-gallery-1790516064499.jpg" },
  { title: "Newsletter", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/newsletter-1790516064499.jpg" },
  { title: "Waitlist", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/waitlist-1790516064503.jpg" },
  { title: "Footer", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/footer-1790516064495.jpg" },
  { title: "Support hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/support-hero-1790516064502.jpg" },
  { title: "Platform grid", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/platform-grid-1790516064500.jpg" },
  { title: "Profile page", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/profile-page-1790516064501.jpg" },
  { title: "Data flow", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-flow-1790516064493.jpg" },
  { title: "Navbar", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/navbar-1790516064499.jpg" },
  { title: "Login form", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/login-form-1790516064498.jpg" },
  { title: "Chart", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/chart-1790516064492.jpg" },
  { title: "Product details", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/product-details-1790516064500.jpg" },
  { title: "Reviews", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/reviews-1790516064502.jpg" },
  { title: "Calendar", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/calendar-1790516064491.jpg" },
  { title: "Invoice", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/invoice-1790516064498.jpg" },
  { title: "Data grid", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-grid-1790516064494.jpg" },
];

export default function Still() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-background">
      <ImageWall
        items={ITEMS}
        interval={true}
        intervalTime={5500}
        zoom={1.2}
        highlightFocus={true}
        draggable={true}
        className="h-[38rem] sm:h-[44rem]"
      />
    </div>
  );
}
```

## About Shadcn Image Wall

**What it is.** **Shadcn Image Wall** (`ImageWall`) is a seamless, edge-free grid of screenshots with an animated camera that zooms out, glides between cards, and settles on each highlight.

**How it is built.** `ImageWall` tiles the wall 3×3 (the copies are `aria-hidden`) so the camera never hits an edge, re-aims on container resize, pauses on hover, while the tab is hidden, off-screen or while the page scrolls, and cuts straight to each card under `prefers-reduced-motion`. It has no npm dependencies.

**When to use it.** Use it for component showcases, product screenshot walls, hero background canvases, and interactive portfolio grids.

## For AI agents

**When to use**

- Component showcases, product screenshot walls
- Hero background canvases, interactive portfolio grids

**When not to use**

- Columns of different heights: use [Masonry Grid](https://avaraui.com/docs/nextjs/masonry-grid)
- A continuously moving image stream: use [Flow Gallery](https://avaraui.com/docs/nextjs/flow-gallery)

**Agent notes**

- `ImageWall` accepts `items` (`WallItem[]` with `title` and `image`), `interval`, `intervalTime`, `highlightFocus`, `draggable`, `order` (`"shuffle"`), `zoom`, `intro`, and `onFocus`.
- Size the container with `className` (defaults to `h-96`); boxes under `420px` tall automatically scale zoom down so multiple cards fit.
- Hovering, hiding the tab, scrolling off-screen or scrolling the page pauses camera flights automatically.
- Pass a stable `items` array, `anchor` and `onFocus`: `ImageWall` is memoised, so new object identities on every render defeat that.
- The wall is one `role="img"` whose `aria-label` is the focused card's `title`; card images have empty `alt`, so put the meaning in `title`.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `&#123; title: string; image: string &#125;[]` | — | The cards on the wall, each in a 493:332 frame under a mono caption. The image is cropped from its top edge. |
| `columns` | `number` | `4` | Columns in one tile. |
| `gap` | `number` | `16` | Space between cards in pixels, horizontally and vertically. |
| `stagger` | `number` | `72` | Vertical offset between neighbouring columns. `0` gives a uniform grid. |
| `order` | `"serial" \| "shuffle"` | `"serial"` | Card by card, or every card once per round in a random order. |
| `interval` | `number \| boolean` | `5500` | Milliseconds the camera rests on a card, or `boolean` (`true` = `intervalTime` / `5500`ms, `false` = `0`). `false` or `0` disables automatic sliding. |
| `intervalTime` | `number` | `5500` | Custom interval duration in milliseconds when `interval=&#123;true&#125;`. |
| `zoom` | `number` | `1.35` | The camera's resting scale; capped at 0.72 in a box under 420px tall and 0.5 in one under 640px wide. |
| `mobileZoom` | `number` | — | When set, replaces `zoom` and the automatic size caps as the camera's resting scale. |
| `intro` | `number` | `0` | Milliseconds the camera drifts, pulled back with no card in focus, before its first landing. |
| `anchor` | `&#123; x?: number; y?: number &#125;` | `&#123; x: 0.5, y: 0.5 &#125;` | Where in the box the resting card sits, as shares of its width and height. Two walls side by side read better with one resting high and the other low. |
| `highlightFocus` | `boolean` | `true` | When `true`, the center card stays at full clarity while surrounding cards are slightly dimmed. Set to `false` to show all cards clearly. |
| `draggable` | `boolean` | `true` | When `true`, the user can grab and pan the wall infinitely in all four directions. Set to `false` to disable dragging. |
| `cardDim` | `number` | `0.55` | Opacity of cards that are not in focus while `highlightFocus` is on. |
| `cardShadow` | `boolean` | `false` | Gives cards a surface background with an elevated shadow, and a slight lift on the focused card. |
| `drift` | `boolean \| &#123; x?: number; y?: number &#125;` | `false` | Slow continuous drift of the wall instead of camera flights. Turns the automatic flights off. |
| `onItemClick` | `(item: WallItem, index: number) => void` | — | Called when a card is clicked or tapped, not when it is dragged. Cards only receive pointer events when this is set. |
| `onFocus` | `(index: number) => void` | — | Called when the camera settles on a card. |
| `className` | `string` | — | Sizes and shapes the box; the wall fills it. Other `div` attributes pass through. |

## Works with other components

- [Component Wall](https://avaraui.com/docs/nextjs/component-wall) is this wall beside a column of hero copy.
- [Flow Gallery](https://avaraui.com/docs/nextjs/flow-gallery) is a continuously moving diagonal image stream.
- [Masonry Grid](https://avaraui.com/docs/nextjs/masonry-grid) is a static grid with columns of different heights.
- [Gallery](https://avaraui.com/docs/nextjs/gallery) offers 3D orbit, bento and sphere layouts for photos and video.

## How do I make ImageWall start after the text next to it has appeared?

Set `intro` to a number of milliseconds. The camera begins pulled back and off to one side, drifts towards the first card with nothing in focus, and lands on it when the time is up. The canvas stays invisible until the camera has painted once, so there is no flash.

## How do I change how long ImageWall rests on each card, or the order?

Set `interval` to a number of milliseconds, or `true` to use `intervalTime` (5500 by default). `interval={false}` or `0` keeps the wall still until dragged. `order="shuffle"` visits every card once per round in random order, while `"serial"` goes card by card.

## How do I know which card ImageWall is showing, or make cards clickable?

Pass `onFocus`, which receives the index of the card the camera settles on, so you can caption or link it outside the wall. For clicks, pass `onItemClick` with `(item, index)`. It fires on a click or tap but not at the end of a drag.

## How do I resize ImageWall or change the camera zoom?

Size the box with `className`; the default is `h-96` and the wall fills it. `zoom` sets the resting scale (1.35 by default). In a box under 420px tall it eases down to 0.72, and in one 640px wide or narrower to 0.5, so a few cards stay visible.

## Does ImageWall pause, and can users drag it?

Yes to both. `draggable` is on by default, so the reader can drag the wall in any direction. Automatic flights pause on hover, while the tab is hidden, when the wall is off-screen and while the page scrolls, then resume. Set `draggable={false}` to leave all movement to the camera.

## Is ImageWall accessible, and does it respect reduced motion?

The wall is one `role="img"` whose `aria-label` is the focused card's `title`. The repeated tiles are `aria-hidden` and the images have empty `alt`, so put the meaning in `title`. Under `prefers-reduced-motion` the camera jumps to the next card instead of flying.

---

Live previews and every example: https://avaraui.com/docs/nextjs/image-wall
