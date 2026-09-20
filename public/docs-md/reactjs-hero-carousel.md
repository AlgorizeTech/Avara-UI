# Hero Carousel

A full-bleed photo hero for a place worth travelling to: an eyebrow pill, a large light headline, a glass panel with the faces of the people who came before you and a call to action, and — the thing that moves — a queue of cards. The front card is the slide on screen; the ones behind it are what comes next. Every five seconds, or when a card is clicked, the queue slides forward, the photograph behind everything crossfades, and the headline and caption follow it.

`HeroCarousel` composes the library: the faces are an AvatarStack. The colours come from the photographs; the theme's `--primary` (pin it with `accent`) is used only for the eyebrow pip and the focus rings.

export const usageSection = `const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop",
    alt: "Snow peaks at sunrise above a sea of cloud",
    title: "Crater rim at first light",
    description: "Up before dawn and on the rim as the valley fills with colour.",
    heading: <>Wake up abovethe clouds,
  },
  {
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
    alt: "Fog rolling over dark ridges",
    title: "Ridge walk through the mist",
    description: "Six kilometres along the spine of the range. No scrambling.",
    heading: <>Walk the ridgewhile it is still yours,
  },
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    alt: "A road through a red rock canyon",
    title: "The canyon by 4×4",
    description: "A jeep run down the canyon road to where the tarmac ends.",
    heading: <>Drive the canyonto the end of the road,
    position: "center 60%",
  },
];

export default function Hero() {
  return (
    Wake up abovethe clouds}
      slides={SLIDES}
      intro="Three days in the high country with a guide who grew up there."
      avatars={[{ src: "https://i.pravatar.cc/80?img=12" }, { src: "https://i.pravatar.cc/80?img=32" }, { src: "https://i.pravatar.cc/80?img=47" }, { src: "https://i.pravatar.cc/80?img=5" }, { src: "https://i.pravatar.cc/80?img=58" }]}
      avatarsLabel="50+ people joined this year"
      cta={{ label: "Book the trip", href: "/book" }}
      linkComponent={Link}
      interval={5000}
    />
  );
}
`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/hero-carousel
```

## Height

The section takes the height its content needs — about 44rem on a desktop — and never uses viewport units of its own, so it behaves inside any container. For a screen-tall hero, size it from outside:

```tsx

```

## Features

    A queue, not a slider
    Cards tween between their places in the queue with GSAP; the one sent to the back appears where it belongs instead of flying across the others. The background crossfades, settles and then drifts slowly until the next slide.

    The clock is the progress line
    One tween fills the line under the front card and moves the queue when it completes. Pausing the line pauses the clock, so a hover never throws away the time already spent.

    Every device
    The rail measures itself and picks card sizes from its own width, not the viewport. Desktop puts the panel beside the rail; tablets stack them; phones give the front card most of the row and keep the rest of the queue peeking in.

    Operable and readable
    Every card is a button with a visible focus ring; arrow keys walk the queue, a swipe moves it on touch, and a live region announces the slide. Reduced motion swaps slides without the crossfade or drift.

## Props Reference

        Prop
        Type
        Default
        Description

        slides
        &#123; image: string; alt: string; title: string; description?: string; heading?: ReactNode; position?: string &#125;[]
        —
        The slides, in queue order.

        eyebrow
        string
        —
        The pill above the headline.

        heading
        ReactNode
        —
        The headline, used whenever the front slide has none of its own.

        intro
        string
        —
        The paragraph in the glass panel.

        avatars, avatarsLabel
        &#123; src: string; alt?: string &#125;[], string
        —
        The faces at the top of the panel and the words beside them.

        cta
        &#123; label: string; href: string &#125;
        —
        The pill at the foot of the panel.

        interval
        number
        5000
        Milliseconds between slides; 0 turns autoplay off.

        defaultIndex
        number
        0
        The slide in front at first.

        onChange
        (index: number) =&gt; void
        —
        Called with the index of the slide that just came to the front.

        accent
        string
        theme primary
        Sets --primary for the section.

        reveal
        "in-view" | "immediate"
        "in-view"
        When the entrance plays.

        linkComponent
        ElementType
        "a"
        What renders the CTA; pass next/link in Next.js.

---

**Component Path:** `[framework]\hero-carousel\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
