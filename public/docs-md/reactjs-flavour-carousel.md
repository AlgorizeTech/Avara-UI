# Flavour Carousel

A product hero for anything that comes in flavours — a matcha latte here, but ice cream, juice or a candle would do. The product stands in a mountain of matcha powder against a moss-green backdrop and its flavours flank it on four tilted cream tiles. Every five seconds, or when a tile is clicked, the ring turns: the chosen tile slides into the cup and shrinks away, and the cup — which never moves — cross-fades to the picture with that flavour inside. A soft glow behind the cup takes the flavour's colour; a price pill and an add-to-cart button hang under the cup, and the headline sits low over the powder.

When the section first appears only the cup is there; the ring rises from behind the powder already spinning, one continuous turn that eases to a stop on the first flavour in a little over two seconds, and the price, cart and headline fade up as it lands. The scene is three layers — a backdrop, the cup, and a transparent cutout of the powder laid in front of the cup so the glass stands in it — positioned in fractions of the stage, measured from the design. One component serves both themes: the scene is the same in both, and in dark mode only the tiles change, from cream to a translucent black that sits into the ground. Without pictures the scene is drawn — moss with a heap of powder. Every move is a spring, so a click in the middle of a turn simply redirects it; a tile two steps away is walked to one step at a time, at a quicker pace, so the ring always behaves like a carousel; and a tile only ever leaves on its own side of the cup and arrives from the other — nothing is seen crossing the stage. The pictures of the product are stacked and the newest fades in over the one before, so the cup never dips or flickers mid-change; the ring holds while the pointer or keyboard focus is on it, while the tab is hidden and while the section is off screen. Under `prefers-reduced-motion` every change is a cut.

`FlavourCarousel` is built from library pieces: the cart button is Button.

export const usageSection = `// Every product image must share the same crop, so only the contents appear to change.
const asset = (name: string) => "https://algorize-ui.vercel.app/assets/matcha/" + name + ".webp";

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
     addToCart(flavour.name)}
    />
  );
}
`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/flavour-carousel
```

## Preparing the pictures

The trick that makes the cup look untouched is that every `product` picture is the same photograph with different contents, cut with identical geometry. If your renders come as one sheet, cut every cell with the same crop box rather than trimming each to its own edges — a shift of even a few pixels reads as the cup jumping. The powder is a separate cutout with a transparent background and its peak at the horizontal centre, so it can stand in front of the cup over a plain backdrop; keep the backdrop free of powder or the two will fight. Transparent WebP keeps each picture under 150 KB.

## Features

    The product never moves
    The pictures are stacked and the newest fades in over the one before, so there is no dip, no flicker and no jump — only the contents change.

    Springs, and no crossings
    Every tile animates to its resting place with a spring, so clicking during a turn redirects the motion instead of restarting it. A far tile is reached step by step at double pace, and a tile remembers which side of the cup it is on: it leaves on that side and comes back in from the other, never across the stage.

    One entrance, then it holds still when it should
    The ring spins up from behind the powder once, as a single decelerating turn, and hands over to the springs where it stops. After that autoplay pauses while the pointer or focus is on the ring, while the tab is hidden and while the section is scrolled out of view.

    Keyboard and screen readers
    Tiles are buttons with a pressed state, the arrow keys turn the ring, the tag is a live region and the cart button names the flavour it adds. Reduced motion turns every change into a cut.

## Props Reference

        Prop
        Type
        Default
        Description

        flavours
        &#123; name: string; price?: string; tint?: string; product: string; tile: string; alt?: string &#125;[]
        —
        The flavours in ring order. product is the picture with that flavour inside, tile the ingredient on the tile.

        heading
        ReactNode
        —
        The headline low over the mound.

        initial
        number
        0
        The flavour in the cup at the start.

        reveal
        "in-view" | "immediate" | "none"
        "in-view"
        When the entrance plays: the ring rises from behind the powder, spinning, and settles on initial.

        interval
        number
        5000
        Milliseconds between turns; 0 turns autoplay off.

        onChange
        (index, flavour) =&gt; void
        —
        Called after every turn.

        onAdd, addLabel
        (flavour, index) =&gt; void, string
        —, "Add to cart"
        Renders the cart button under the price; the label names it for assistive technology.

        backgroundImage
        string
        —
        The backdrop, covering the section. Without it the ground is drawn.

        backgroundPosition
        string
        "50% 50%"
        object-position for the backdrop.

        foregroundImage
        string
        —
        The powder cutout, anchored to the foot of the stage in front of the cup.

        foregroundHeight
        number
        0.41
        The powder's height as a share of the stage; anything wider than the stage is clipped.

        background
        string
        "#3b4726"
        The drawn ground when there is no backdrop.

        mound
        [string, string]
        ["#7a9550", "#465b2b"]
        The drawn powder mound, light and dark.

        paper
        string
        "#f4f1e7"
        The cream of the tiles (light mode), the price pill and the cart.

---

**Component Path:** `[framework]\flavour-carousel\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
