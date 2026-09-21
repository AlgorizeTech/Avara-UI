# Image Wall

A wall of screenshots that never ends, and a camera hanging over it. The camera rests zoomed in on one card; every few seconds it pulls back, glides to the next card and settles on it, brightening that card while the rest stay dimmed. Hovering the wall holds the camera where it is.

The wall is one tile of cards in staggered columns, repeated around itself eight times, so however far the camera travels it never finds an edge. Every image sits in the same 493:332 frame under a small mono caption, and the camera walks the cards in order — each gets its turn before any comes round again. It fills whatever box you give it: a tall window shows one card at a time, a short band eases the zoom down so a few show at once, and on a phone it pulls back further still so the flight between cards is something to watch. Component Wall is this wall beside a column of hero copy.

export const usage = `"use client";

const ITEMS = [
  { title: "Word bounce hero", image: "https://algorize-ui.vercel.app/assets/wall/hero.jpg" },
  { title: "Pricing plans", image: "https://algorize-ui.vercel.app/assets/wall/pricing.jpg" },
  { title: "Bento showcase", image: "https://algorize-ui.vercel.app/assets/wall/bento-showcase.jpg" },
  { title: "Book appointment", image: "https://algorize-ui.vercel.app/assets/wall/book-appointment.jpg" },
  { title: "Collage hero", image: "https://algorize-ui.vercel.app/assets/wall/collage-hero.jpg" },
  { title: "Fashion hero", image: "https://algorize-ui.vercel.app/assets/wall/fashion-hero.jpg" },
  { title: "Hero carousel", image: "https://algorize-ui.vercel.app/assets/wall/hero-carousel.jpg" },
  { title: "Honeycomb hero", image: "https://algorize-ui.vercel.app/assets/wall/honeycomb-hero.jpg" },
  // … as many as you like; four columns of six reads well
];

export default function Showcase() {
  // The wall fills its box — give it a height.
  return ;
}
`;

export const usageBand = `"use client";

export default function Band() {
  // Under 420px tall the camera eases back so a few cards show at once.
  return ;
}
`;

export const usageStill = `"use client";

export default function Still() {
  const [current, setCurrent] = useState(0);
  // interval={0} holds the camera on the first card; onFocus reports whichever card is in view.
  return (
    <>
      
      {ITEMS[current].title}
    
  );
}
`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/image-wall
```

## Examples

## Features

    A camera, not a slider
    One GSAP timeline moves the whole wall: it pulls the camera back to 0.64 of its resting scale while gliding to the next card, then settles back in. Nothing inside the wall moves on its own, so it stays cheap however many cards you give it.

    A wall without edges
    The tile is drawn nine times — itself and its eight neighbours — so the camera can settle on a card at the very edge and still see cards all around it. The copies are hidden from assistive tech.

    Any box
    Size it with a class and it fills the box; a short band eases the zoom down so a few cards fit, and a phone-width box pulls back further so the journey between cards stays visible. The camera re-aims on every resize and holds while hovered, hidden or off screen.

    Quiet by request
    Under prefers-reduced-motion the camera cuts between cards instead of flying, and the wall is labelled with the card in view.

## Props Reference

        Prop
        Type
        Default
        Description

        items
        &#123; title: string; image: string &#125;[]
        —
        The cards on the wall, each in a 493:332 frame under a mono caption.

        columns
        number
        4
        Columns in one tile.

        order
        "serial" | "shuffle"
        "serial"
        Card by card, or every card once per round in a random order.

        interval
        number
        4500
        Milliseconds the camera rests; 0 holds still.

        zoom
        number
        1.35
        The camera's resting scale; capped at 0.72 in a box under 420px tall and 0.5 in one under 640px wide.

        onFocus
        (index: number) =&gt; void
        —
        Called when the camera settles on a card.

        className
        string
        —
        Sizes and shapes the box; the wall fills it. Other div attributes pass through.

---

**Component Path:** `[framework]\image-wall\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
