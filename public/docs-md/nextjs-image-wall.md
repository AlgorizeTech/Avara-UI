---
title: "Shadcn Image Wall"
description: "A wall of screenshots that never ends, and a camera hanging over it. Free shadcn/ui Image Wall component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/image-wall
---

# Shadcn Image Wall

A wall of screenshots that never ends, and a camera hanging over it. The camera rests zoomed in on one card; every few seconds it pulls back, glides to the next card and settles on it, brightening that card while the rest stay dimmed. Hovering the wall holds the camera where it is.

The wall is one tile of cards in staggered columns, repeated around itself eight times, so however far the camera travels it never finds an edge. Every image sits in the same 493:332 frame under a small mono caption, and the camera walks the cards in order — each gets its turn before any comes round again. It fills whatever box you give it: a tall window shows one card at a time, a short band eases the zoom down so a few show at once, and on a phone it pulls back further still so the flight between cards is something to watch. [Component Wall](https://avaraui.com/docs/nextjs/component-wall) is this wall beside a column of hero copy.

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

## Examples

### A band, shuffled

A short strip: the camera pulls back so a few cards show, and visits them in a random order.

- `order="shuffle"` visits every card once per round in a random order; `"serial"` walks them one after another. Either way a card never comes round again before all the others have had a turn.
- `interval=false` turns off automatic camera sliding so the wall stays still unless dragged; set to `true` (or milliseconds) to enable auto-sliding.
- `highlightFocus=false` shows every card at full clarity; set to `true` to focus the center card and dim the surrounding ones.
- `draggable=true` lets the user grab and pan the wall infinitely in all four directions; set to `false` to turn dragging off.
- A box under `420px` tall caps the zoom at 0.72 whatever `zoom` says, so the band shows neighbours instead of one card spilling out; a box under 640px wide caps it at 0.5.

```tsx
"use client";


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

interval={true} with highlightFocus={true} and draggable={true} combines automatic camera flights with interactive drag-to-pan.

- `interval=true` enables automatic camera flights from card to card (default `5500ms`). Set to `false` (or `0`) to stop automatic movement.
- `intervalTime=5500` sets the custom interval time in milliseconds when `interval={true}` (default `5500`).
- `highlightFocus=true` keeps the center card at full clarity while dimming the surrounding cards (`0.55` opacity); set to `false` to show all cards clearly.
- `draggable=true` lets the user grab and pan the wall infinitely in all four directions; set to `false` to lock it in place.
- `onFocus` is called with the index of the card the camera has settled on so you can caption or link it outside the wall.

```tsx
"use client";


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

## Features

### A camera, not a slider

One animation of the canvas moves the whole wall: it pulls the camera back to 0.64 of its resting scale while gliding to the next card, then settles back in. Nothing inside the wall moves on its own, so it stays cheap however many cards you give it.

### A wall without edges

The tile is drawn nine times — itself and its eight neighbours — so the camera can settle on a card at the very edge and still see cards all around it. The copies are hidden from assistive tech.

### Any box

Size it with a class and it fills the box; a short band eases the zoom down so a few cards fit, and a phone-width box pulls back further so the journey between cards stays visible. The camera re-aims on every resize and holds while hovered, hidden or off screen.

### Quiet by request

Under prefers-reduced-motion the camera cuts between cards instead of flying, and the wall is labelled with the card in view.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `&#123; title: string; image: string &#125;[]` | — | The cards on the wall, each in a 493:332 frame under a mono caption. |
| `columns` | `number` | `4` | Columns in one tile. |
| `order` | `"serial" \| "shuffle"` | `"serial"` | Card by card, or every card once per round in a random order. |
| `interval` | `number \| boolean` | `5500` | Milliseconds the camera rests on a card, or `boolean` (`true` = `intervalTime` / `5500`ms, `false` = `0`). `false` or `0` disables automatic sliding. |
| `intervalTime` | `number` | `5500` | Custom interval duration in milliseconds when `interval=&#123;true&#125;`. |
| `zoom` | `number` | `1.35` | The camera's resting scale; capped at 0.72 in a box under 420px tall and 0.5 in one under 640px wide. |
| `intro` | `number` | `0` | Milliseconds the camera drifts, pulled back with no card in focus, before its first landing. |
| `anchor` | `&#123; x?: number; y?: number &#125;` | `&#123; x: 0.5, y: 0.5 &#125;` | Where in the box the resting card sits, as shares of its width and height. Two walls side by side read better with one resting high and the other low. |
| `highlightFocus` | `boolean` | `true` | When `true`, the center card stays at full clarity while surrounding cards are slightly dimmed. Set to `false` to show all cards clearly. |
| `draggable` | `boolean` | `true` | When `true`, the user can grab and pan the wall infinitely in all four directions. Set to `false` to disable dragging. |
| `onFocus` | `(index: number) => void` | — | Called when the camera settles on a card. |
| `className` | `string` | — | Sizes and shapes the box; the wall fills it. Other `div` attributes pass through. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/image-wall
