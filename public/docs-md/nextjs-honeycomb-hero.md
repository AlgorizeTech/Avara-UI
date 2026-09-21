# Honeycomb Hero

A travel hero in deep teal: a light line over a huge gold word on the left, and on the right a honeycomb of hexagonal photographs with a gold hexagonal call to action set among them. The large hexagon is the slide on screen — its photograph is also the tinted background behind everything — and the smaller ones are the queue. Every four seconds, or on the arrows at the foot, every hexagon moves one step along the honeycomb: the next photograph grows into the feature spot while the feature slides to the back of the queue. The loop never ends, in either direction.

The honeycomb is measured from the design and laid out in percentages of a fixed-aspect stage anchored to the right edge, so the composition holds at any size and whatever falls past the edge is clipped, as intended. The letters of the accent word that cross the feature photograph turn white.

export const usage = `"use client";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1628344253777-f73a64d8f983?q=80&w=1400&auto=format&fit=crop", alt: "A waterfall pouring through a green gorge" },
  { src: "https://images.unsplash.com/photo-1663428520845-056989f8a664?q=80&w=1400&auto=format&fit=crop", alt: "Red cabins at Hamnøy under a mountain" },
  { src: "https://images.unsplash.com/photo-1710762634126-4c0e8fba44d8?q=80&w=1400&auto=format&fit=crop", alt: "A snowy village below white peaks" },
  { src: "https://images.unsplash.com/photo-1593378026483-2a1fd46a35bd?q=80&w=1400&auto=format&fit=crop", alt: "Green aurora above snowy mountains" },
  { src: "https://images.unsplash.com/photo-1695496896465-9e59091a8ed1?q=80&w=1400&auto=format&fit=crop", alt: "Turquoise water between mountain ridges" },
  { src: "https://images.unsplash.com/photo-1721335916916-37c319adce3a?q=80&w=1400&auto=format&fit=crop", alt: "A sandy beach beneath a rocky headland" },
  { src: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1400&auto=format&fit=crop", alt: "A red cabin on a rocky shore" },
  { src: "https://images.unsplash.com/photo-1682952986992-de7082fb213d?q=80&w=1400&auto=format&fit=crop", alt: "Waterfalls running down the wall of a fjord" },
  { src: "https://images.unsplash.com/photo-1607888566357-ec0b61abee46?q=80&w=1400&auto=format&fit=crop", alt: "A waterfall beside a wooden viewpoint" },
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
npx shadcn@latest add @algorize-ui/honeycomb-hero
```

## Features

    A honeycomb that turns
    The nine cells sit on a real hexagonal lattice, and the queue snakes around it so every step is a hop between neighbours. GSAP moves each cell to its next place with a short stagger — the one heading for the feature spot leads, the one leaving it follows last.

    The feature is the background
    Whatever photograph is in the large hexagon also fills the section behind everything, tinted with the teal and darkened towards the copy. It crossfades as the honeycomb turns.

    Measured, not guessed
    Every hexagon's position comes from the design in percentages of a fixed-aspect stage, so the composition is the same at 1024 and 1920 — including the cells cut by the right edge and the foot. Below the desktop breakpoint the honeycomb stacks under the copy.

    Operable
    Arrows at the foot and the keyboard's arrow keys step the queue either way; a live region names the featured photograph; under prefers-reduced-motion the cells swap places without travelling.

## Props Reference

        Prop
        Type
        Default
        Description

        title, titleAccent
        string
        "Amazing", "Norway"
        The light line and the huge accent word.

        subtitle
        string
        —
        The paragraph under the headline.

        primaryActionLabel, primaryActionHref
        string
        "Book\na tour", "#"
        The gold hexagon; \n breaks the line.

        images
        &#123; src: string; alt: string &#125;[]
        nine Lofoten photographs
        The queue, first featured.

        socialLinks
        &#123; label: string; href: string &#125;[]
        five networks, all #
        The links along the foot; [] hides them.

        interval
        number
        4000
        Milliseconds between steps; 0 turns autoplay off.

        onChange
        (index: number) =&gt; void
        —
        Called with the index of the photograph that just became the feature.

        accent
        string
        "#e0a83d"
        The gold.

        background
        string
        "#0b2a2d"
        The teal behind everything.

        linkComponent
        ElementType
        "a"
        What renders every link; pass next/link in Next.js.

---

**Component Path:** `[framework]\honeycomb-hero\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
