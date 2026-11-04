---
title: "Shadcn Image Wall"
description: "A wall of screenshots that never ends, and a camera hanging over it. Free shadcn/ui Image Wall component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/image-wall
---

# Shadcn Image Wall

A wall of screenshots that never ends, and a camera hanging over it. The camera rests zoomed in on one card; every few seconds it pulls back, glides to the next card and settles on it, brightening that card while the rest stay dimmed. Hovering the wall holds the camera where it is.

The wall is one tile of cards in staggered columns, repeated around itself eight times, so however far the camera travels it never finds an edge. Every image sits in the same 493:332 frame under a small mono caption, and the camera walks the cards in order — each gets its turn before any comes round again. It fills whatever box you give it: a tall window shows one card at a time, a short band eases the zoom down so a few show at once, and on a phone it pulls back further still so the flight between cards is something to watch. [Component Wall](https://avaraui.com/docs/reactjs/component-wall) is this wall beside a column of hero copy.

## A camera over the wall

Wait a few seconds: the camera pulls back, glides to the next card and settles on it. Hover to hold it.

- `items` are the cards, dealt into `columns` in order. Each has a mono `title` and an `image`, cropped from its top edge into the same 493:332 frame as every other card; odd columns start lower so the rows stagger.
- `interval=4500` is how long the camera rests on a card. It holds while the wall is hovered, while the tab is hidden and while the wall is off screen; `0` keeps the camera still on the first card.
- `zoom=1.35` is the camera's resting scale. In a box under 420px tall it eases down to 0.72 so a few cards fit; under 640px wide, to 0.5. Mid-flight the camera pulls back to 0.64 of wherever it rests.
- `className` sizes the box — the wall has no height of its own beyond a default `h-96`. Round it, mask it, position it; the camera re-aims on every resize.
- `intro=0` in milliseconds makes the camera start pulled back and off to one side, drifting towards the first card with nothing in focus, and land on it only when the time is up — room for copy beside the wall to arrive first. The canvas is invisible until the camera has painted once, so the server-rendered wall never flashes unpositioned.

```tsx
const ITEMS: WallItem[] = [
  { title: "Word bounce hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg" },
  { title: "Pricing plans", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg" },
  { title: "Bento showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg" },
  { title: "Book appointment", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg" },
  { title: "Collage hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg" },
  { title: "Fashion hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg" },
  { title: "Hero carousel", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/hero-carousel-1790516064496.jpg" },
  { title: "Honeycomb hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg" },
  // … as many as you like; four columns of six reads well
];

export default function Showcase() {
  // The wall fills its box — give it a height.
  return <ImageWall items={ITEMS} interval={4500} className="h-[32rem] rounded-2xl" />;
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
- A box under `420px` tall caps the zoom at 0.72 whatever `zoom` says, so the band shows neighbours instead of one card spilling out; a box under 640px wide caps it at 0.5.

```tsx
const ITEMS: WallItem[] = [
  { title: "Word bounce hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg" },
  { title: "Pricing plans", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg" },
  { title: "Bento showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg" },
  { title: "Book appointment", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg" },
  { title: "Collage hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg" },
  { title: "Fashion hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg" },
  { title: "Hero carousel", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/hero-carousel-1790516064496.jpg" },
  { title: "Honeycomb hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg" },
  // … as many as you like; four columns of six reads well
];

export default function Band() {
  // Under 420px tall the camera eases back so a few cards show at once.
  return <ImageWall items={ITEMS} order="shuffle" className="h-64" />;
}
```

### Held still

interval={0} parks the camera on the first card; the wall becomes a framed screenshot with its neighbours dimmed around it.

- `interval=0` never moves the camera. Pair it with a smaller `zoom` to show more of the wall at rest.
- `onFocus` is called with the index of the card the camera has settled on — the first card here — so you can caption or link it outside the wall.

```tsx
const ITEMS: WallItem[] = [
  { title: "Word bounce hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg" },
  { title: "Pricing plans", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg" },
  { title: "Bento showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg" },
  { title: "Book appointment", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg" },
  { title: "Collage hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg" },
  { title: "Fashion hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg" },
  { title: "Hero carousel", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/hero-carousel-1790516064496.jpg" },
  { title: "Honeycomb hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg" },
  // … as many as you like; four columns of six reads well
];

export default function Still() {
  const [current, setCurrent] = useState(0);
  // interval={0} holds the camera on the first card; onFocus reports whichever card is in view.
  return (
    <>
      <ImageWall items={ITEMS} interval={0} zoom={1.2} onFocus={setCurrent} className="h-96" />
      <p className="mt-2 text-sm text-muted-foreground">{ITEMS[current].title}</p>
    </>
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
| `interval` | `number` | `4500` | Milliseconds the camera rests; `0` holds still. |
| `zoom` | `number` | `1.35` | The camera's resting scale; capped at 0.72 in a box under 420px tall and 0.5 in one under 640px wide. |
| `intro` | `number` | `0` | Milliseconds the camera drifts, pulled back with no card in focus, before its first landing. |
| `anchor` | `&#123; x?: number; y?: number &#125;` | `&#123; x: 0.5, y: 0.5 &#125;` | Where in the box the resting card sits, as shares of its width and height. Two walls side by side read better with one resting high and the other low. |
| `onFocus` | `(index: number) => void` | — | Called when the camera settles on a card. |
| `className` | `string` | — | Sizes and shapes the box; the wall fills it. Other `div` attributes pass through. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/image-wall
