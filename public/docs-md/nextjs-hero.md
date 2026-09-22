# Hero

Every hero section in the library, on one page. Each is its own registry item with its own preview, install command and props — pick the one that suits the site and install only that. They run from the most opinionated layouts to the general-purpose `HeroBlock` and its five variants at the foot.

  Honeycomb HeroA turning honeycomb of hexagonal photographs — travel, nature, tours.
  Hero CarouselA full-bleed photo hero with a queue of cards and a glass panel.
  Fashion HeroStaggered columns of looks on flat colour — lookbook, store, editorial.
  Support HeroA frosted bento of cards and counting figures — SaaS and AI products.
  Collage HeroA photo collage under a turning badge — school, studio, workshop.
  Hero BlockFive marketing variants from one component — bounce, typing, slider, pet shop, doctor.

## Honeycomb Hero

A travel hero in deep teal: a light line over a huge gold word on the left, and on the right a honeycomb of hexagonal photographs with a gold hexagonal call to action set among them. The large hexagon is the slide on screen — its photograph is also the tinted background behind everything — and the smaller ones are the queue. Every four seconds, or on the arrows at the foot, every hexagon moves one step along the honeycomb: the next photograph grows into the feature spot while the feature slides to the back of the queue. The loop never ends, in either direction.

The honeycomb is measured from the design and laid out in percentages of a fixed-aspect stage anchored to the right edge, so the composition holds at any size and whatever falls past the edge is clipped, as intended. The letters of the accent word that cross the feature photograph turn white.

export const usageHoneycomb = `"use client";

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

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/honeycomb-hero
```

### Features

    A honeycomb that turns
    The nine cells sit on a real hexagonal lattice, and the queue snakes around it so every step is a hop between neighbours. GSAP moves each cell to its next place with a short stagger — the one heading for the feature spot leads, the one leaving it follows last.

    The feature is the background
    Whatever photograph is in the large hexagon also fills the section behind everything, tinted with the teal and darkened towards the copy. It crossfades as the honeycomb turns.

    Measured, not guessed
    Every hexagon's position comes from the design in percentages of a fixed-aspect stage, so the composition is the same at 1024 and 1920 — including the cells cut by the right edge and the foot. Below the desktop breakpoint the honeycomb stacks under the copy.

    Operable
    Arrows at the foot and the keyboard's arrow keys step the queue either way; a live region names the featured photograph; under prefers-reduced-motion the cells swap places without travelling.

### Props Reference

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

## Hero Carousel

A full-bleed photo hero for a place worth travelling to: an eyebrow pill, a large light headline, a glass panel with the faces of the people who came before you and a call to action, and — the thing that moves — a queue of cards. The front card is the slide on screen; the ones behind it are what comes next. Every five seconds, or when a card is clicked, the queue slides forward, the photograph behind everything crossfades, and the headline and caption follow it.

`HeroCarousel` composes the library: the faces are an AvatarStack. The colours come from the photographs; the theme's `--primary` (pin it with `accent`) is used only for the eyebrow pip and the focus rings.

export const usageHeroCarousel = `"use client";

const SLIDES = [
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

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/hero-carousel
```

### Height

The section takes the height its content needs — about 44rem on a desktop — and never uses viewport units of its own, so it behaves inside any container. For a screen-tall hero, size it from outside:

```tsx

```

### Features

    A queue, not a slider
    Cards tween between their places in the queue with GSAP; the one sent to the back appears where it belongs instead of flying across the others. The background crossfades, settles and then drifts slowly until the next slide.

    The clock is the progress line
    One tween fills the line under the front card and moves the queue when it completes. Pausing the line pauses the clock, so a hover never throws away the time already spent.

    Every device
    The rail measures itself and picks card sizes from its own width, not the viewport. Desktop puts the panel beside the rail; tablets stack them; phones give the front card most of the row and keep the rest of the queue peeking in.

    Operable and readable
    Every card is a button with a visible focus ring; arrow keys walk the queue, a swipe moves it on touch, and a live region announces the slide. Reduced motion swaps slides without the crossfade or drift.

### Props Reference

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

## Fashion Hero

A fashion hero: a bold two-line headline between a turning video badge and a stack of faces, five staggered columns of looks — each a person on a flat colour that tilts and zooms under the pointer — a call to action sitting on the middle look, and a footer with a customer's words on one side and the next story on the other.

`FashionHero` is built from library pieces: the badge is Circular Text, the faces are Avatar Stack, the headline is Text Animation (`blur-in-up`, word by word), every look is a Tilted Card, and the badge opens a Dialog. When it first scrolls into view the badge and faces settle in, the looks rise from the middle column outward, the button lands on its look and the footer follows — one reveal, then only the badge keeps turning and the pointer does the rest.

export const usageFashion = `"use client";

// Photos from Pexels, free to use.
const pexels = (id: number, w = 700) =>
  \`https://images.pexels.com/photos/\${id}/pexels-photo-\${id}.jpeg?auto=compress&cs=tinysrgb&w=\${w}\`;

// A person on a plain studio background, multiplied onto a colour that echoes the outfit.
const LOOKS = [
  { src: pexels(16944801), alt: "A woman in a pink shirt and lime trousers, on yellow", tone: "#f0a72f", blend: false },
  { src: pexels(1520760, 500), alt: "A woman in a dark top, smiling", tone: "#f7d774" },
  { src: pexels(1036623), alt: "A woman in a pale pink dress", tone: "#f4b7c5", blend: false },
  { src: pexels(1462637), alt: "A woman in a striped blue shirt", tone: "#8cc4ee" },
  { src: pexels(9558236), alt: "A woman in a coral shirt dress", tone: "#f9a875" },
  { src: pexels(6311613), alt: "A woman in a grey hoodie, hood up", tone: "#bfe4c6" },
  { src: pexels(3775534, 500), alt: "A man in a black leather jacket", tone: "#2e9c82" },
];

export default function Hero() {
  return (
    
  );
}
`;

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/fashion-hero
```

### Photos on colour

The reference look is a person cut out on a flat colour. Cut-outs are expensive; a studio shot on a plain background is not. With `blend` on, the photo is drawn with `mix-blend-mode: multiply` over its `tone`, so white becomes the tone and the person keeps their colours — and the effect is strongest with lighter tones and darker clothes. A shot that already has a coloured background is better left unblended: pass `blend: false` and pick a `tone` that matches its edges.

### Features

    Built from the library
    Circular Text for the badge, Avatar Stack for the faces, Text Animation for the headline, Tilted Card for every look, Dialog for the video. Install this one item and all five come with it.

    One reveal, then the pointer
    A single timeline plays on first view: badge and faces, looks from the middle outward, the button, the footer. After that only the badge turns; tilt, zoom, fan-out and arrows all answer the pointer.

    Responsive to two columns
    Five staggered columns at lg, three at sm, two on phones with the middle look — and its button — full width. The header folds the badge and faces above the headline.

    Links are links
    The call to action, the plus beside the faces and the teaser are anchors — pass your router's Link as linkComponent — and the video badge is a real button with a label for screen readers.

### Props Reference

        Prop
        Type
        Default
        Description

        heading
        string
        Required
        The headline, revealed word by word.

        looks
        Look[]
        Required
        Up to seven &#123; src, alt, tone, blend?, position? &#125;, in slot order.

        video
        &#123; badge: string; url: string; title?: string &#125;
        —
        Words on the turning badge and the embed it opens.

        avatars, avatarsHref, avatarsLabel
        &#123; src, alt? &#125;[], string, string
        —, —, "Join the community"
        Faces in the top-right stack; the href adds a "+" link after them with that label.

        cta
        &#123; label: string; href: string &#125;
        —
        The pill sitting on the middle look.

        quote
        &#123; text: string; author: string &#125;
        —
        A customer's words and their name, set in the serif italic with a highlighter stroke.

        teaser
        &#123; index, label, title, href &#125;
        —
        The next story, as one link.

        accent
        string
        theme primary
        Sets --primary for the section: the highlighter stroke, focus rings and the mark above the middle look.

        reveal
        "in-view" | "immediate"
        "in-view"
        When the sequence plays.

        linkComponent
        ElementType
        "a"
        Your router's link for every href.

## Support Hero

A product hero on a soft grey ground: a headline that rises in word by word, one line under it and one call to action, then a bento of frosted cards — integrations on white tiles, two figures that count up, two portraits and a team card with faces scattered over a field of dots. The cards land in one staggered pass after the headline; after that only the pointer moves anything: cards lift, portraits zoom a touch, the integration tiles rise one after another, the faces drift apart.

`SupportHero` is built from library pieces. The ground and the cards are Glass Panel (`GlassBackdrop` with a grey aurora, `GlassPanel` tiles), the headline is Text Animation's `blur-in-up`, the figures are Counter's animated type in its new bare form, and the call to action is Button. Every card is a named part — `Integrations`, `Stat`, `Photo`, `Team` — plus a plain `Card` for anything else.

export const usageSupport = `"use client";

// Photos from Pexels, free to use.
const pexels = (id: number, w = 800) =>
  \`https://images.pexels.com/photos/\${id}/pexels-photo-\${id}.jpeg?auto=compress&cs=tinysrgb&w=\${w}\`;

const AVATARS = [
  { src: pexels(2379004, 120), alt: "Ana" },
  { src: pexels(220453, 120), alt: "Tom" },
  { src: pexels(2381069, 120), alt: "Mei" },
  { src: pexels(1130626, 120), alt: "Raj" },
];

export default function Hero() {
  return (
    
      , , ]}
        title="Integrations"
        text="Way better at getting things done than human agents"
      />

      {/* Spans both rows at desktop. */}

      AutomatedCustomer ServiceQuality}
        avatars={AVATARS}
      />
    
  );
}
`;

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/support-hero
```

### Layout

The bento is the `GlassBackdrop` grid — one column on phones, six at `md`, twelve at `lg` — and every part carries a default span (`Integrations`, `Stat` and `Photo` take three columns, `Team` takes six). Cards are a fixed `13rem` tall at `lg`, so a part given `lg:row-span-2 lg:h-auto` is exactly two cards tall. Pass any other span through `className`; the built-in parts are `GlassPanel`s, so `variant="solid"` on a card also works.

The call to action is a `Button`. Give `cta` an `onClick`, or an `href` to navigate to on click — pass a router `push` in `onClick` when you want client-side navigation.

### Features

    Built from the library
    Glass Panel for the ground and the cards, Text Animation for the headline, Counter for the figures, Button for the call to action. Install this one item and all four come with it.

    One sequence, then the pointer
    Words, line, button, cards, faces — one timeline the first time the section appears. After that nothing moves unless you hover it. Reduced motion renders the finished state.

    Figures that count when seen
    Each Stat waits until its card is on screen before counting, so a hero below the fold does not run its numbers while nobody is looking.

    Server-safe
    Cards and faces render opaque in the HTML and only animate once the page is live; nothing depends on JavaScript to be visible.

### Props Reference

#### SupportHero

        Prop
        Type
        Default
        Description

        heading
        string
        —
        The headline, animated word by word.

        subtitle
        ReactNode
        —
        The line under it.

        cta
        &#123; label: string; href?: string; onClick?: () =&gt; void &#125;
        —
        The button. href is navigated to on click.

        aurora
        [string, string, string]
        three greys
        Colours washed behind the glass.

        reveal
        "in-view" | "immediate"
        "in-view"
        When the sequence plays.

        children
        ReactNode
        —
        The cards, in the order they should fill the grid.

#### SupportHero.Integrations

        Prop
        Type
        Description

        icons
        ReactNode[]
        Marks shown on white tiles, e.g. from the icons item.

        title, text
        string
        Heading and the line under it.

#### SupportHero.Stat

        Prop
        Type
        Default
        Description

        value
        number
        —
        The figure counted up to.

        decimals
        number
        0
        Decimal places, e.g. 1 for 5.5.

        prefix, suffix
        string
        —
        Text either side of the figure, e.g. "%", "B".

        caption
        string
        —
        What the figure means.

        tone
        "glass" | "accent"
        "glass"
        Frosted, or the accent card in the theme's primary colour with its foreground for text.

        image, imageAlt
        string
        —
        A picture behind the whole card. Only the bottom-left corner, under the figure, is washed with the card colour; the rest stays clear. Zooms a touch on hover.

        imagePosition
        string
        "center"
        CSS object-position for the crop — e.g. "70% center" to favour a subject on the right.

#### SupportHero.Photo

        Prop
        Type
        Default
        Description

        src, alt
        string
        —
        The portrait.

        label
        string
        —
        A word in the top-left corner.

        position
        string
        "center"
        CSS object-position for the crop.

#### SupportHero.Team

        Prop
        Type
        Description

        title
        ReactNode
        The heading; use &lt;br /&gt; for deliberate breaks.

        avatars
        &#123; src: string; alt?: string &#125;[]
        Up to six faces, scattered over the right half.

#### SupportHero.Card

A GlassPanel that takes part in the reveal: shape="tile", interactive, three columns wide and 13rem tall at lg. All GlassPanel props apply.

## Collage Hero

A hero for a place that is warm and busy — a kindergarten here, but any studio, school or workshop: a badge whose name turns slowly around a mark, a serif headline with two words in colour, three hashtag pills, a collage of seven photographs in five staggered columns, and a footer with a quote, a scroll-down pill and a watch-video trigger. When it first appears the headline rises out of a blur, the pills pop in with a twist and the photographs come up one after another; after that the badge keeps turning and the pointer does the rest — photographs lift and zoom a touch, pills straighten, the arrow nods.

`CollageHero` is built from library pieces: the scroll pill is Button, the video opens in a Dialog. The colours come from the theme — the violet is `--primary` (pin it with `accent`) and the second colour is `highlight`.

export const usageCollage = `"use client";

// Photos from Pexels, free to use.
const pexels = (id: number, w = 800) =>
  \`https://images.pexels.com/photos/\${id}/pexels-photo-\${id}.jpeg?auto=compress&cs=tinysrgb&w=\${w}\`;

const PHOTOS = [
  { src: pexels(3661193), alt: "Wooden dinosaurs on a stack of books" },
  { src: pexels(3661387), alt: "A child playing with wooden blocks" },
  { src: pexels(8612967), alt: "Children painting at a low table" },
  { src: pexels(8535214), alt: "A teacher helping a girl paint", position: "40% top" },
  { src: pexels(3661286), alt: "A boy holding a wooden dinosaur" },
  { src: pexels(8613317), alt: "Children on the grass with their toys" },
  { src: pexels(8535227), alt: "A girl beside a paper lion", position: "center 35%" },
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
      usage: usageCollage,
      code: extractCode("src/components/custom/blocks/CollageHeroBlock.tsx"),
      minHeight: 900,
    },
  ]}
/>

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/collage-hero
```

### The badge

`CollageHero.Badge` is exported on its own: the `brand` text set on an SVG circle with `textPath`, turning once every 22 seconds, around a `logo` — three dots in the accent and highlight by default, or anything you pass. Under `prefers-reduced-motion` it does not turn.

```tsx

} />
```

### Features

    Built from the library
    Button for the scroll pill, Dialog for the video. Both install with this item; the rest is Tailwind and one SVG.

    One reveal, one thing that keeps moving
    Headline, pills, photographs, footer — one timeline the first time the section appears. The turning badge is the only ambient motion, and it stops under reduced motion.

    Two colours, from the theme
    The accent is your primary colour unless you pin it; the second colour is one prop. Pills, badge, coloured words, play button and scroll pill all follow.

    Real links and dialogs
    The video trigger is keyboard-operable and opens a proper dialog with focus handling; every photograph carries its alt text; nothing depends on JavaScript to be visible.

### Props Reference

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

## Hero Block

A collection of modern hero layouts in one component, built with Tailwind CSS and Framer Motion: rotating word spring bounce, character typewriter effect, continuous thumbnail slider marquee, a CLI copy button and call-to-action buttons. One registry item, five variants.

export const usageWordBounce = `import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function Page() {
  return (
    
  );
}`;

export const usageTyping = `import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function Page() {
  return (
    
  );
}`;

export const usageSlider = `import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function Page() {
  return (
    
  );
}`;

export const usageGlowArc = `import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function Page() {
  return (
    
  );
}`;

export const usageDoctor = `import { HeroBlock } from "@/components/custom/blocks/HeroBlock";

export default function Page() {
  return (
    
  );
}`;

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/hero
```

### Props Reference

        Prop
        Type
        Default
        Description

          variant

          "bounce" | "typing" | "slider" | "glow-arc" | "pet-shop" | "doctor"

          "bounce"

          The layout & animation style. "bounce" uses spring word motion; "typing" uses typewriter effect; "slider" renders split 2-column hero with continuous marquee; "glow-arc" renders centered radial glow arc. The hexagonal mosaic hero is Honeycomb Hero, further up this page; the screenshot wall and the revolving ring are their own sections, Component Wall and Orbit Gallery.

          typingWords

          string[]

          ["Interfaces", "Components", …]

          The rotating words between titlePrefix and titleSuffix.

          petImage · secondaryPetImage

          string

          Unsplash URLs

          Custom image URLs for the main featured pet photo and secondary avatar badge photo (used when variant="pet-shop").

          sliderImages

          string[]

          […]

          Array of thumbnail image URLs for the continuous right-to-left marquee slider (used when variant="slider").

          mainImage

          string

          "…"

          Featured image URL for the right column (used when variant="slider").

          badgeText · badgeHref · titlePrefix · titleSuffix · subtitle · cliCommand

          string

          —

          Every string in the section is a prop, each with a sensible default. cliCommand feeds the one-click copy button.

          primaryActionLabel · primaryActionHref · secondaryActionLabel · secondaryActionHref

          string

          —
        
        Label and destination for each of the two call-to-action buttons.

          color

          string

          undefined

          Accent color — a preset name or any CSS color. Left unset it inherits your theme.

---

**Component Path:** `[framework]\hero\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
