# Collage Hero

A hero for a place that is warm and busy — a kindergarten here, but any studio, school or workshop: a badge whose name turns slowly around a mark, a serif headline with two words in colour, three hashtag pills, a collage of seven photographs in five staggered columns, and a footer with a quote, a scroll-down pill and a watch-video trigger. When it first appears the headline rises out of a blur, the pills pop in with a twist and the photographs come up one after another; after that the badge keeps turning and the pointer does the rest — photographs lift and zoom a touch, pills straighten, the arrow nods.

`CollageHero` is built from library pieces: the scroll pill is Button, the video opens in a Dialog. The colours come from the theme — the violet is `--primary` (pin it with `accent`) and the second colour is `highlight`.

export const usageSection = `const PHOTOS = [
  { src: "/kinder/toys.jpg", alt: "Wooden dinosaurs on a stack of books" },
  { src: "/kinder/blocks.jpg", alt: "A child playing with wooden blocks" },
  { src: "/kinder/painting.jpg", alt: "Children painting at a low table" },
  { src: "/kinder/teacher.jpg", alt: "A teacher helping a girl paint", position: "40% top" },
  { src: "/kinder/dino.jpg", alt: "A boy holding a wooden dinosaur" },
  { src: "/kinder/grass.jpg", alt: "Children on the grass with their toys" },
  { src: "/kinder/lion.jpg", alt: "A girl beside a paper lion", position: "center 35%" },
];

export default function Hero() {
  return (
    A happy spaceto explore and create}
      tags={[{ label: "#learn" }, { label: "#enjoy" }, { label: "#play" }]}
      caption="Playful and caring for little learners"
      photos={PHOTOS}
      quote="Our kindergarten is a warm and welcoming environment where children feel safe, inspired, and excited to learn every day."
      scrollLabel="Scroll down"
      scrollTo="#programme"
      video={{
        eyebrow: "Watch video",
        text: "Watch how a day unfolds at our friendly kindergarten",
        url: "https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1",
        title: "A day at KinderNest",
      }}
    />
  );
}
`;

` — the first takes the accent, the second the `highlight`. Use `` for a deliberate break.",
        },
        {
          prop: "photos",
          effect:
            "are laid out left to right: one under the caption, two stacked, one tall in the middle, two stacked, one on the right. Each takes a `position` for its crop. Fewer than seven is fine; the columns just empty.",
        },
        {
          prop: "tags",
          effect:
            "are up to three pills, scattered and tilted at desktop and in a plain row below. `tone` picks soft / highlight / accent; the defaults cycle through them.",
        },
        {
          prop: "video",
          effect:
            "renders the play trigger; its `url` is an embed URL shown in a `Dialog` at 16:9. `scrollLabel` is a `Button` that scrolls to `scrollTo`, or the next section.",
        },
        {
          prop: "reveal",
          value: '"in-view"',
          effect:
            "(the default) plays the sequence the first time the section enters the viewport; the docs pass `\"immediate\"`. Under prefers-reduced-motion the badge holds still and the section renders finished.",
        },
      ],
      props: { rounded: true },
      usage: usageSection,
      code: extractCode("src/components/custom/blocks/CollageHeroBlock.tsx"),
      minHeight: 900,
    },
  ]}
/>

## Installation

## The badge

`CollageHero.Badge` is exported on its own: the `brand` text set on an SVG circle with `textPath`, turning once every 22 seconds, around a `logo` — three dots in the accent and highlight by default, or anything you pass. Under `prefers-reduced-motion` it does not turn.

```tsx
} />
```

## Features

    Built from the library
    Button for the scroll pill, Dialog for the video. Both install with this item; the rest is Tailwind and one SVG.

    One reveal, one thing that keeps moving
    Headline, pills, photographs, footer — one timeline the first time the section appears. The turning badge is the only ambient motion, and it stops under reduced motion.

    Two colours, from the theme
    The accent is your primary colour unless you pin it; the second colour is one prop. Pills, badge, coloured words, play button and scroll pill all follow.

    Real links and dialogs
    The video trigger is keyboard-operable and opens a proper dialog with focus handling; every photograph carries its alt text; nothing depends on JavaScript to be visible.

## Props Reference

        Prop
        Type
        Default
        Description

        brand
        string
        —
        The words that run around the badge.

        logo
        ReactNode
        three dots
        What sits in the middle of the badge.

        heading
        ReactNode
        —
        The headline. &lt;em&gt; words take the accent, then the highlight.

        tags
        &#123; label: string; tone?: "accent" | "highlight" | "soft" &#125;[]
        []
        Up to three pills.

        caption
        string
        —
        Tracked caps over the first photograph.

        photos
        &#123; src: string; alt: string; position?: string &#125;[]
        —
        Up to seven photographs, in layout order.

        quote
        string
        —
        Footer quote, with a large opening mark in the accent.

        scrollLabel, scrollTo
        string
        "Scroll down", next section
        The scroll pill and the selector it scrolls to.

        video
        &#123; eyebrow?: string; text: string; url: string; title?: string &#125;
        —
        The play trigger and the embed it opens.

        accent
        string
        theme primary
        Sets --primary for the section.

        highlight
        string
        "#f5c542"
        The second colour.

        reveal
        "in-view" | "immediate"
        "in-view"
        When the sequence plays.

---

**Component Path:** `[framework]\collage-hero\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
