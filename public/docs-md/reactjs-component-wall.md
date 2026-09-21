# Component Wall

A landing hero for a component library. On the right, a wall of screenshots that never ends: a camera hangs over it zoomed in on one card, and every few seconds pulls back, glides to the next card and settles on it. On the left, the copy — a small badge, a headline that blurs in word by word and keeps one word changing, a lead, an install command, two actions and a line of trust. Over the lower part of the wall, the tools it is built with: a label, then two rows of marks — an odd batch staggers as three over four — one batch of related tools at a time.

The two halves talk to each other. The install line ends in the name of the card the camera is resting on, and slides to the next name as the camera lands — so the hero is always showing something the reader can paste into a terminal. The wall is an Image Wall, the headline a Text Animation, the copy control a Copy Button, the faces an Avatar Stack and the stars Half Stars. The headline is set in your theme's `font-serif`, the rest in `font-sans`; every colour is a theme token.

export const usage = `// slug is what the install line calls the card; it defaults to the title in kebab-case.
const ITEMS = [
  { slug: "hero", title: "Word bounce hero", image: "https://algorize-ui.vercel.app/assets/wall/hero.jpg" },
  { slug: "pricing", title: "Pricing plans", image: "https://algorize-ui.vercel.app/assets/wall/pricing.jpg" },
  { slug: "bento-showcase", title: "Bento showcase", image: "https://algorize-ui.vercel.app/assets/wall/bento-showcase.jpg" },
  { slug: "book-appointment", title: "Book appointment", image: "https://algorize-ui.vercel.app/assets/wall/book-appointment.jpg" },
  { slug: "collage-hero", title: "Collage hero", image: "https://algorize-ui.vercel.app/assets/wall/collage-hero.jpg" },
  { slug: "fashion-hero", title: "Fashion hero", image: "https://algorize-ui.vercel.app/assets/wall/fashion-hero.jpg" },
  { slug: "hero-carousel", title: "Hero carousel", image: "https://algorize-ui.vercel.app/assets/wall/hero-carousel.jpg" },
  { slug: "honeycomb-hero", title: "Honeycomb hero", image: "https://algorize-ui.vercel.app/assets/wall/honeycomb-hero.jpg" },
  // … as many as you like; four columns of six reads well
];

// Four to eight related tools per batch; an odd batch sits three over four. Any node works as the icon — an  too.
const STACK = [
  [
    { name: "React", icon:  },
    { name: "Next.js", icon:  },
    { name: "TypeScript", icon:  },
    { name: "Tailwind CSS", icon:  },
    { name: "Framer Motion", icon:  },
    { name: "GSAP", icon:  },
    { name: "Lucide", icon:  },
  ],
];

export default function Hero() {
  return (
     }}
      trust={{
        text: "Loved by developers shipping real products with it",
        avatars: [{ src: "https://i.pravatar.cc/80?img=12" }, { src: "https://i.pravatar.cc/80?img=32" }, { src: "https://i.pravatar.cc/80?img=47" }, { src: "https://i.pravatar.cc/80?img=5" }, { src: "https://i.pravatar.cc/80?img=58" }],
        rating: 5,
      }}
      items={ITEMS}
      stack={{ label: "Built with", groups: STACK }}
      interval={4500}
      linkComponent={Link}
    />
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

    An install line that follows the camera
    The wall reports the card it has settled on; the hero puts that card's slug into the command and slides the old name out. Whatever the reader is looking at, the line beside it is the way to get it.

    One entrance, in order
    The headline blurs in word by word; then the lead, the command, the actions and the trust line rise once, each a beat after the last. The changing word in the headline replays that same blur each time it turns. Under prefers-reduced-motion everything is simply there, and both the headline word and the name in the command cut instead of moving.

    Built on Image Wall
    The wall, its camera and its flights are the Image Wall component; this hero passes the wall props straight through and only decides where the wall sits — the right 56–58% on desktop, fading under the copy; a band under the copy below that.

    The tools, in batches
    Group what you build with — a front-end batch, a data batch, a tooling batch — and the strip shows one group at a time over a blurred, fading stretch of the wall, so the marks read without competing with the cards.

    Your theme, your fonts
    Background, text, the primary button and the stars all read theme tokens, so a palette change reaches every part. The headline uses font-serif and the command font-mono — set those in your Tailwind theme and the hero follows.

## Props Reference

        Prop
        Type
        Default
        Description

        badge
        &#123; label: string; href?: string &#125;
        —
        The small link above the headline.

        heading
        string
        —
        The headline, revealed word by word. &#123;word&#125; is where headingWords take turns.

        headingWords
        string[]
        —
        Words that take turns at &#123;word&#125;, each blurring in like the headline did.

        wordInterval
        number
        2400
        Milliseconds each heading word stays.

        accent
        string
        —
        A word of the headline set in the primary colour.

        description
        string
        —
        The lead under it.

        install
        &#123; command: string &#125;
        —
        The install line; &#123;item&#125; becomes the focused card's slug. Omit to drop the box.

        primaryAction, secondaryAction
        &#123; label: string; href: string; icon?: ReactNode &#125;
        —
        The primary button and the outlined one.

        trust
        &#123; text: string; avatars?: &#123; src; alt? &#125;[]; rating?: number &#125;
        —
        The trust line under the actions.

        items
        &#123; title: string; image: string; slug?: string &#125;[]
        —
        The cards on the wall, each in a 493:332 frame. items, columns, order, interval, zoom and onFocus are passed straight to the Image Wall.

        stack
        &#123; label?: string; groups: &#123; name: string; icon: ReactNode &#125;[][]; interval?: number &#125;
        —
        The tools over the wall, one group of four to eight at a time (an odd group as three over four). Omit to drop the strip.

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
