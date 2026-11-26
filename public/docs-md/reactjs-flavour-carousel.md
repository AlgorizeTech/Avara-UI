---
title: "Shadcn Flavour Carousel"
description: "A product hero for anything that comes in flavours — a matcha latte here, but ice cream, juice or a candle would do. Free shadcn/ui Flavour Carousel block."
url: https://avaraui.com/docs/nextjs/flavour-carousel
---

# Shadcn Flavour Carousel

A product hero for anything that comes in flavours — a matcha latte here, but ice cream, juice or a candle would do. The product stands in a mountain of powder while its flavours flank it on tilted tiles. Every few seconds, or when a tile is clicked, the ring turns: the chosen tile slides into the cup, and the cup cross-fades to the picture with that flavour inside.

`FlavourCarousel` is built from library pieces: the cart button is [Button](https://avaraui.com/docs/reactjs/button).

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/flavour-carousel.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/flavour-carousel
```

## Choose your matcha tea

Eight flavours around one cup. Wait five seconds or click a tile to turn the ring; arrow keys work when it has focus, and hovering holds it.

- `flavours` are `{ name, price?, tint?, product, tile }` in ring order. Cut every `product` picture with the same geometry so only the contents change.
- `onAdd` adds the cart button under the price pill and receives the chosen flavour. Leave it out and only the pill remains.
- `foregroundImage` is the powder, a transparent cutout laid in front of the cup. Leave it and `backgroundImage` out and the scene is drawn for you.

```tsx
import { FlavourCarousel } from "@/components/custom/blocks/FlavourCarouselBlock";

// Every product image must share the same crop, so only the contents appear to change.
const ASSETS: Record<string, string> = {
  "cup-berry": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509366/cup-berry-1790509374064.webp",
  "cup-chocolate": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509366/cup-chocolate-1790509374067.webp",
  "cup-cookie": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509366/cup-cookie-1790509374068.webp",
  "cup-grape": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509367/cup-grape-1790509374068.webp",
  "cup-mango": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509366/cup-mango-1790509374068.webp",
  "cup-passion": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509366/cup-passion-1790509374069.webp",
  "cup-strawberry": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509367/cup-strawberry-1790509374069.webp",
  "cup-ube": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509367/cup-ube-1790509374069.webp",
  "flavour-berry": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509367/flavour-berry-1790509374070.webp",
  "flavour-chocolate": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509367/flavour-chocolate-1790509374070.webp",
  "flavour-cookie": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509368/flavour-cookie-1790509374071.webp",
  "flavour-grape": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509367/flavour-grape-1790509374071.webp",
  "flavour-mango": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509367/flavour-mango-1790509374071.webp",
  "flavour-passion": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509368/flavour-passion-1790509374072.webp",
  "flavour-strawberry": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509368/flavour-strawberry-1790509374072.webp",
  "flavour-ube": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509368/flavour-ube-1790509374072.webp",
  "green-background-matcha": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509368/green-background-matcha-1790509374073.webp",
  "matcha-powder": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509369/matcha-powder-1790509374074.png",
};

const asset = (name: string) => ASSETS[name];

const FLAVOURS = [
  { name: "Strawberry", price: "$6.50", tint: "#e5394a", product: asset("cup-strawberry"), tile: asset("flavour-strawberry") },
  { name: "Mixed berry", price: "$6.90", tint: "#6a46a8", product: asset("cup-berry"), tile: asset("flavour-berry") },
  { name: "Mango", price: "$6.50", tint: "#f4a51c", product: asset("cup-mango"), tile: asset("flavour-mango") },
  { name: "Passion fruit", price: "$6.90", tint: "#c2604a", product: asset("cup-passion"), tile: asset("flavour-passion") },
  { name: "Chocolate", price: "$6.90", tint: "#8a5a3c", product: asset("cup-chocolate"), tile: asset("flavour-chocolate") },
  { name: "Cookies and cream", price: "$7.20", tint: "#5c4a44", product: asset("cup-cookie"), tile: asset("flavour-cookie") },
  { name: "Grape", price: "$6.50", tint: "#a3305e", product: asset("cup-grape"), tile: asset("flavour-grape") },
  { name: "Ube", price: "$7.20", tint: "#9a5ec2", product: asset("cup-ube"), tile: asset("flavour-ube") },
];

export default function Flavours() {
  // Replace with your cart: the button hands you the flavour that is in the cup.
  const addToCart = (name: string) => console.log("Added " + name + " to cart");

  return (
    <FlavourCarousel
      flavours={FLAVOURS}
      heading="Choose your matcha tea"
      backgroundImage={asset("green-background-matcha")}
      foregroundImage={asset("matcha-powder")}
      interval={5000}
      onAdd={(flavour) => addToCart(flavour.name)}
    />
  );
}
```

## Preparing the pictures

The trick that makes the cup look untouched is that every `product` picture is the same photograph with different contents, cut with identical geometry. If your renders come as one sheet, cut every cell with the same crop box rather than trimming each to its own edges — a shift of even a few pixels reads as the cup jumping. The powder is a separate cutout with a transparent background and its peak at the horizontal centre, so it can stand in front of the cup over a plain backdrop; keep the backdrop free of powder or the two will fight. Transparent WebP keeps each picture under 150 KB.

## Features

The pictures are stacked and the newest fades in over the one before, so there is no dip, no flicker and no jump — only the contents change.

Every tile animates to its resting place with a spring, so clicking during a turn redirects the motion instead of restarting it. A far tile is reached step by step at double pace, and a tile remembers which side of the cup it is on: it leaves on that side and comes back in from the other, never across the stage.

The ring spins up from behind the powder once, as a single decelerating turn, and hands over to the springs where it stops. After that autoplay pauses while the pointer or focus is on the ring, while the tab is hidden and while the section is scrolled out of view.

Tiles are buttons with a pressed state, the arrow keys turn the ring, the tag is a live region and the cart button names the flavour it adds. Reduced motion turns every change into a cut.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `flavours` | `&#123; name: string; price?: string; tint?: string; product: string; tile: string; alt?: string &#125;[]` | — | The flavours in ring order. `product` is the picture with that flavour inside, `tile` the ingredient on the tile. |
| `heading` | `ReactNode` | — | The headline low over the mound. |
| `initial` | `number` | `0` | The flavour in the cup at the start. |
| `reveal` | `"in-view" \| "immediate" \| "none"` | `"in-view"` | When the entrance plays: the ring rises from behind the powder, spinning, and settles on `initial`. |
| `interval` | `number` | `5000` | Milliseconds between turns; `0` turns autoplay off. |
| `onChange` | `(index, flavour) => void` | — | Called after every turn. |
| `onAdd`, `addLabel` | `(flavour, index) => void`, `string` | —, `"Add to cart"` | Renders the cart button under the price; the label names it for assistive technology. |
| `backgroundImage` | `string` | — | The backdrop, covering the section. Without it the ground is drawn. |
| `backgroundPosition` | `string` | `"50% 50%"` | `object-position` for the backdrop. |
| `foregroundImage` | `string` | — | The powder cutout, anchored to the foot of the stage in front of the cup. |
| `foregroundHeight` | `number` | `0.41` | The powder's height as a share of the stage; anything wider than the stage is clipped. |
| `background` | `string` | `"#3b4726"` | The drawn ground when there is no backdrop. |
| `mound` | `[string, string]` | `["#7a9550", "#465b2b"]` | The drawn powder mound, light and dark. |
| `paper` | `string` | `"#f4f1e7"` | The cream of the tiles (light mode), the price pill and the cart. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/flavour-carousel
