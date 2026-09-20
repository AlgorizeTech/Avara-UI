# Component Wall

A landing hero for a component library: the copy on the left — a changelog pill, a bold headline, a paragraph, two actions and a line of trust — and on the right a wall of screenshots that never ends. A camera hangs over the wall, zoomed in on one card; every few seconds it pulls back, glides to the next card, and settles on it, brightening that card while the rest stay dimmed.

The wall is one tile of cards in staggered columns, repeated around itself eight times, so however far the camera travels it never finds an edge. Every screenshot sits in the same 493:332 frame, and the camera walks the cards in order — each one gets its turn before any comes round again. The faces are an AvatarStack and the stars are HalfStars.

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

export default function Hero() {
  return (
    
  );
}
`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/component-wall
```

## Features

    A camera, not a slider
    One GSAP timeline moves the whole wall: it pulls the scale back to 0.86 while gliding to the next card, then settles back to 1.35. Nothing inside the wall moves on its own, so it stays cheap however many cards you give it.

    A wall without edges
    The tile is drawn nine times — itself and its eight neighbours — so the camera can settle on a card at the very edge and still see cards all around it. The copies are hidden from assistive tech.

    Every device
    On desktop the wall fills the right 58–60% and fades under the copy; below that it becomes a band under the copy with a gentler zoom. The camera re-aims on every resize.

    Quiet by request
    Under prefers-reduced-motion the camera cuts between cards instead of flying; the wall is labelled with the card in view, and the copy column is ordinary, keyboard-reachable markup.

## Props Reference

        Prop
        Type
        Default
        Description

        badge
        &#123; label: string; text?: string; href?: string; icon?: ReactNode &#125;
        —
        The pill above the headline.

        heading
        ReactNode
        —
        The headline.

        description
        string
        —
        The paragraph under it.

        primaryAction, secondaryAction
        &#123; label: string; href: string &#125;
        —
        The dark button and the light one.

        trust
        &#123; text: string; avatars?: &#123; src; alt? &#125;[]; rating?: number &#125;
        —
        The trust line under the actions.

        items
        &#123; title: string; image: string &#125;[]
        —
        The cards on the wall, each in a 493:332 frame.

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
        The camera's resting scale.

        onFocus
        (index: number) =&gt; void
        —
        Called when the camera settles on a card.

        linkComponent
        ElementType
        "a"
        What renders every link; pass next/link in Next.js.

---

**Component Path:** `[framework]\component-wall\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
