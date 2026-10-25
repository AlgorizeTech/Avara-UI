export const metadata = docsPageMetadata("image-wall");

# Image Wall

A wall of screenshots that never ends, and a camera hanging over it. The camera rests zoomed in on one card; every few seconds it pulls back, glides to the next card and settles on it, brightening that card while the rest stay dimmed. Hovering the wall holds the camera where it is.

The wall is one tile of cards in staggered columns, repeated around itself eight times, so however far the camera travels it never finds an edge. Every image sits in the same 493:332 frame under a small mono caption, and the camera walks the cards in order — each gets its turn before any comes round again. It fills whatever box you give it: a tall window shows one card at a time, a short band eases the zoom down so a few show at once, and on a phone it pulls back further still so the flight between cards is something to watch. Component Wall is this wall beside a column of hero copy.

{/* Every snippet on this page is a whole file, so they share one list. */}

export const wallItems = `const ITEMS: WallItem[] = [
  { title: "Word bounce hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg" },
  { title: "Pricing plans", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg" },
  { title: "Bento showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg" },
  { title: "Book appointment", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg" },
  { title: "Collage hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg" },
  { title: "Fashion hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg" },
  { title: "Hero carousel", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/hero-carousel-1790516064496.jpg" },
  { title: "Honeycomb hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg" },
  // … as many as you like; four columns of six reads well
];`;

export const usage = `${wallItems}

export default function Showcase() {
  // The wall fills its box — give it a height.
  return ;
}
`;

export const usageBand = `${wallItems}

export default function Band() {
  // Under 420px tall the camera eases back so a few cards show at once.
  return ;
}
`;

export const usageStill = `${wallItems}

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

## Features

    A camera, not a slider
    One animation of the canvas moves the whole wall: it pulls the camera back to 0.64 of its resting scale while gliding to the next card, then settles back in. Nothing inside the wall moves on its own, so it stays cheap however many cards you give it.

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

        intro
        number
        0
        Milliseconds the camera drifts, pulled back with no card in focus, before its first landing.

        anchor
        &#123; x?: number; y?: number &#125;
        &#123; x: 0.5, y: 0.5 &#125;
        Where in the box the resting card sits, as shares of its width and height. Two walls side by side read better with one resting high and the other low.

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

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
