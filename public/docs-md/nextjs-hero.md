---
title: "Shadcn Hero"
description: "Shadcn Hero block. Hero sections for landing pages: honeycomb, carousel, fashion, support, collage, bento cascade, word-bounce, typing and split-marquee heroes."
url: https://avaraui.com/docs/nextjs/hero
---

# Shadcn Hero

Every hero section in the library, on one page. Each is its own registry item with its own preview, install command and props — pick the one that suits the site and install only that. They run from the most opinionated layouts to the general-purpose `HeroBlock` and its five variants at the foot.

## For AI agents

**Ask before you pick.** This page has 16 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 16 options as live previews: https://avaraui.com/view/hero

**When to use it.** The first screen of a landing page. Sixteen designs, from photo-led travel and lookbook heroes to SaaS bentos and a healthcare portal; each is a different layout, not a restyle.

**When to use something else:**

- [CTA Section](https://avaraui.com/docs/nextjs/cta-section): for a closing call to action lower down the page rather than the first screen.
- [Navbar](https://avaraui.com/docs/nextjs/navbar): for the site header; every hero here assumes the navigation is separate.

**Gotchas:**

- The `hero` item is one component with eight looks (bounce, typing, slider, pet-shop, doctor, facility, vortex, orbit). Install it once and pick the look with the `variant` prop.
- HeroBlock's `bento-cascade`, `breathe` and `solar-snapshot` values only hand off to the standalone Bento Cascade, Breathe and Solar Snapshot heroes. Install those through their own items, not through `hero`.
- Hero Carousel takes the height its content needs (about 44rem) and uses no viewport units. For a screen-tall hero, size it from outside, for example `className="lg:h-svh"`.
- Fashion Hero expects a person on a flat colour. A photo that already has a coloured background should be passed with `blend: false` and a `tone` that matches its edges.
- Honeycomb Hero tints the whole section with each photograph's `tone`, so give every photograph a deep tone.

### The 16 variants

1. **Honeycomb hero** (`honeycomb`): Dark travel hero: a huge word on the left, a turning honeycomb of hexagonal photographs on the right.
   - Live: https://avaraui.com/view/hero/honeycomb
   - Best for: travel, outdoor and expedition brands with strong photography; a hero whose colour changes with each photograph
   - Avoid if: you have fewer than a handful of good photographs; you want a light, minimal first screen
   - Traits: image-heavy, autoplay carousel, dark background, arrows and keyboard, tone-tinted background
   - Install: `npx shadcn@latest add @avara-ui/honeycomb-hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#wander-the-fjords
2. **Hero carousel** (`carousel`): Full-bleed photo hero with a queue of cards and a glass panel; the front card is the slide on screen.
   - Live: https://avaraui.com/view/hero/carousel
   - Best for: destinations, hotels and experiences sold by place; showing several offers in one hero that visitors can click through
   - Avoid if: you have no photographs; you need a hero that fills the screen height without any extra styling
   - Traits: image-heavy, autoplay carousel, card queue, avatar stack, swipe and keyboard
   - Install: `npx shadcn@latest add @avara-ui/hero-carousel`
   - Docs: https://avaraui.com/docs/nextjs/hero#watch-the-dawn-from-the-summit
3. **Fashion hero** (`fashion`): Staggered columns of looks on flat colour, with a video badge, a tilt-on-hover effect and a story teaser.
   - Live: https://avaraui.com/view/hero/fashion
   - Best for: fashion, lookbook and store landing pages; editorial brands with people photographed on a plain background
   - Avoid if: your images are not people or products on a plain background; you need a text-only or product-UI hero
   - Traits: image-heavy, five staggered columns, pointer tilt, video dialog
   - Install: `npx shadcn@latest add @avara-ui/fashion-hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#daring-designs
4. **Support hero** (`support`): Soft grey product hero: animated headline, one call to action, then a frosted bento of stats and integrations.
   - Live: https://avaraui.com/view/hero/support
   - Best for: SaaS and AI products that want to show integrations, figures and a team in the first screen; products that can name a few integrations and two headline figures
   - Avoid if: you have no figures or integrations to show; you want a photo-led hero
   - Traits: bento cards, glass panels, counting stats, one call to action, light background
   - Install: `npx shadcn@latest add @avara-ui/support-hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#headline-call-to-action-six-cards
5. **Collage hero** (`collage`): Warm, busy hero: a turning badge, a serif headline, hashtag pills and a collage of seven photographs.
   - Live: https://avaraui.com/view/hero/collage
   - Best for: schools, kindergartens, studios and workshops; friendly local businesses with plenty of candid photographs
   - Avoid if: you have fewer than seven photographs; the brand is serious or corporate
   - Traits: image-heavy, photo collage, turning badge, video dialog, two theme colours
   - Install: `npx shadcn@latest add @avara-ui/collage-hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#a-bright-place
6. **Bento cascade hero** (`bento-cascade`): Copy and calls to action on the left, an infinite vertical bento marquee of image cards on the right.
   - Live: https://avaraui.com/view/hero/bento-cascade
   - Best for: products and travel brands that want a lot of visual motion beside the pitch; heroes that show a review score and avatar stack next to the headline
   - Avoid if: you prefer little motion; you have only a few images to fill the cards
   - Traits: image-heavy, infinite marquee, pauses on hover, avatar stack, two buttons
   - Install: `npx shadcn@latest add @avara-ui/bento-cascade-hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#bento-cascade-infinite-motion-hero
7. **Breathe hero** (`breathe`): Serif headline over a curved arch of five cards; the centre card zooms and the others drift on scroll.
   - Live: https://avaraui.com/view/hero/breathe
   - Best for: calm, premium brands: wellness, interiors, hospitality; a scroll-driven first impression with a small set of images
   - Avoid if: you need more than five visuals in the hero; scroll-driven motion does not suit the page
   - Traits: five image cards, scroll-driven zoom, serif headline, arch layout
   - Install: `npx shadcn@latest add @avara-ui/breathe-hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#breathe-arch-stagger-hero
8. **Solar snapshot hero** (`solar-snapshot`): Light, playful hero: a sun orb that follows the pointer, curtain-style buttons and a click-to-capture Polaroid stack.
   - Live: https://avaraui.com/view/hero/solar-snapshot
   - Best for: creative, consumer and community products that want a playful, interactive first screen; pages that can show a team or customers as an avatar group
   - Avoid if: most visitors are on touch devices and the pointer effect would be lost; you want a static, quiet hero
   - Traits: pointer-tracking, interactive, avatar group, polaroid capture
   - Install: `npx shadcn@latest add @avara-ui/solar-snapshot-hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#solar-snapshot-sun-cursor-hero
9. **Word bounce hero** (`bounce`): Centred headline whose key word is swapped with a spring bounce loop; text only, no images required.
   - Live: https://avaraui.com/view/hero/bounce
   - Best for: SaaS and startup pages that lead with a short pitch; any site with no photography yet
   - Avoid if: you want an image or product shot in the hero; you want the headline to stay still
   - Traits: text-only, rotating words, CSS animation, no photographs needed, uses the `hero` item
   - Install: `npx shadcn@latest add @avara-ui/hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#word-bounce-hero
10. **Typing hero** (`typing`): Centred headline where one word types and deletes character by character, like a typewriter.
   - Live: https://avaraui.com/view/hero/typing
   - Best for: developer tools and products that list several use cases in one line; text-only pages with no images
   - Avoid if: you want an image or product shot in the hero; you need the headline to stay still
   - Traits: text-only, typewriter effect, CSS animation, no photographs needed, uses the `hero` item
   - Install: `npx shadcn@latest add @avara-ui/hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#typing-hero
11. **Split marquee slider hero** (`slider`): Two columns: copy on one side, a continuous right-to-left thumbnail slider with floating visual cards on the other.
   - Live: https://avaraui.com/view/hero/slider
   - Best for: products and catalogues that want to show many thumbnails; a text-and-visuals hero with continuous motion
   - Avoid if: you have no images to put in the slider; you prefer little motion
   - Traits: image-heavy, continuous marquee, two columns, uses the `hero` item
   - Install: `npx shadcn@latest add @avara-ui/hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#split-marquee-slider-hero
12. **Pet shop hero** (`pet-shop`): Clean, minimal e-commerce hero with a circular image showcase and feature badges.
   - Live: https://avaraui.com/view/hero/pet-shop
   - Best for: small shops and e-commerce, such as pet care; friendly consumer brands with a few product or portrait images
   - Avoid if: you want a dark or technical look; you have no images for the circular showcase
   - Traits: minimal, circular image showcase, feature badges, uses the `hero` item
   - Install: `npx shadcn@latest add @avara-ui/hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#pet-shop-animal-care-hero
13. **Doctor portal hero** (`doctor`): Clean medical hero with a specialist doctor showcase and an appointment-booking call to action.
   - Live: https://avaraui.com/view/hero/doctor
   - Best for: clinics, hospitals and healthcare portals; services where the main action is booking an appointment
   - Avoid if: the site is not about healthcare or appointments; you do not have a doctor or specialist image to show
   - Traits: healthcare, appointment call to action, specialist showcase, uses the `hero` item
   - Install: `npx shadcn@latest add @avara-ui/hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#doctor-portal-healthcare-hero
14. **Facility CAD grid hero** (`facility`): Architectural blueprint grid with a shape that morphs as the pointer moves over the left and right grid zones.
   - Live: https://avaraui.com/view/hero/facility
   - Best for: architecture, engineering, construction and facilities businesses; technical brands that want a drafting-table look
   - Avoid if: the brand is warm or playful; most visitors are on touch devices and the hover morph would be lost
   - Traits: blueprint grid, pointer-reactive shape, technical, uses the `hero` item
   - Install: `npx shadcn@latest add @avara-ui/hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#precision-facility-cad-grid-hero
15. **Cyclone radar hero** (`vortex`): High-tech radar hero: an animated rotating cyclone vortex with a HUD telemetry overlay and parcel metrics.
   - Live: https://avaraui.com/view/hero/vortex
   - Best for: climate-risk, weather, geospatial and data-platform products; data-heavy landing pages that lead with a few headline figures
   - Avoid if: the product has no data or monitoring story; you want a friendly, image-led hero
   - Traits: animated vortex, telemetry overlay, metrics, colour from the `color` prop, uses the `hero` item
   - Install: `npx shadcn@latest add @avara-ui/hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#atmospheric-cyclone-radar-hero
16. **Orbit ring hero** (`orbit`): Copy and actions on the left, a revolving 3D circular photo orbit ring on the right that pauses on hover.
   - Live: https://avaraui.com/view/hero/orbit
   - Best for: products, travel and portfolios with a set of photographs to show in one motion; a general-purpose hero with a strong visual on the right
   - Avoid if: you have no images for the ring; you want little motion
   - Traits: image-heavy, 3D orbit, pauses on hover, dotted highlights, uses the `hero` item
   - Install: `npx shadcn@latest add @avara-ui/hero`
   - Docs: https://avaraui.com/docs/nextjs/hero#orbit-ring-hero

[Honeycomb Hero A turning honeycomb of hexagonal photographs on a ground that changes colour with each slide — travel, nature, tours.](#honeycomb-hero)
[Hero Carousel A full-bleed photo hero with a queue of cards and a glass panel.](#hero-carousel)
[Fashion Hero Staggered columns of looks on flat colour — lookbook, store, editorial.](#fashion-hero)
[Support Hero A frosted bento of cards and counting figures — SaaS and AI products.](#support-hero)
[Collage Hero A photo collage under a turning badge — school, studio, workshop.](#collage-hero)
[Bento Cascade Hero An infinite vertical bento marquee with seamless looping and soft edge fades — SaaS, AI, and creative platforms.](#bento-cascade-hero)
[Hero Block Comprehensive variants from one component — orbit ring, bounce, typing, slider, pet shop, doctor, facility, and rotating vortex cyclone radar.](#hero-block)
[Breathe Hero Curved 5-card arch hero with dynamic focal zoom and scroll choreography.](#breathe-hero)
[Solar Snapshot Hero Pointer-tracking radiant sun with interactive live Polaroid screenshot stack.](#solar-snapshot-hero)

## Honeycomb Hero

A travel hero on a dark ground that shifts colour: a light line over a huge white word on the left, and on the right a honeycomb of hexagonal photographs with a primary hexagonal call to action set among them. The large hexagon is the slide on screen — its photograph is also the background behind everything, tinted with that photograph's own tone, so the colour of the whole section changes with the slide — and the smaller ones are the queue. Every four seconds, or on the arrows at the foot, every hexagon moves one step along the honeycomb: the next photograph grows into the feature spot while the feature slides to the back of the queue. The loop never ends, in either direction.

The honeycomb is measured from the design and laid out in percentages of a fixed-aspect stage anchored to the right edge, so the composition holds at any size and whatever falls past the edge is clipped, as intended. The letters of the word that cross the photographs turn your theme's `primary`, as do the rule, the arrows and the call-to-action hexagon, whose compass and label take `primary-foreground`. They read the theme wherever the section sits, so switching themes repaints them.

### Wander the fjords

Copy on the left, the honeycomb on the right with the primary hexagon set among the photographs. Wait four seconds or use the arrows at the foot: every hexagon moves one step along the ring, and the whole section eases to the new photograph's colour. Pick a colour above to repaint the accent.

- `images` are the photographs in queue order; the first is featured at the start. Nine cells are visible — fewer photographs are repeated around the ring, more simply wait their turn. Give each a deep `tone` and the background tint, the fade towards the copy and the gaps between hexagons all ease to it while that photograph is featured.
- `interval=4000` is the gap between steps in milliseconds. It pauses while the tab is hidden and while the section is off screen; `0` turns autoplay off and leaves the arrows.
- `primaryActionLabel` fills the call-to-action hexagon; a `\n` in the string breaks the line, as in Plan / your trip. A compass sits above it; on hover it turns and the hairline hexagon inside the cell swells, and on keyboard focus the hairline goes solid.
- `accent` sets `--primary` for the section: the letters of the word that cross the photographs, the rule, the arrows and the call to action, with its label in `primary-foreground`. Leave it out to follow your theme's primary. `background` is the tone for photographs without one: a deep shade of the primary by default.

```tsx
"use client";



// tone is the colour behind everything while that photograph is featured; keep it deep.
const IMAGES = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158809/photo-1628344253777-f73a64d8f983-1790158812202.jpg", alt: "A waterfall pouring through a green gorge", tone: "#0f2e22" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158811/photo-1663428520845-056989f8a664-1790158812204.jpg", alt: "Red cabins at Hamnøy under a mountain", tone: "#1f2140" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158812/photo-1710762634126-4c0e8fba44d8-1790158812206.jpg", alt: "A snowy village below white peaks", tone: "#18233a" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158815/photo-1593378026483-2a1fd46a35bd-1790158812215.jpg", alt: "Green aurora above snowy mountains", tone: "#0b2a2d" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158812/photo-1695496896465-9e59091a8ed1-1790158812205.jpg", alt: "Turquoise water between mountain ridges", tone: "#082f3d" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158812/photo-1721335916916-37c319adce3a-1790158812206.jpg", alt: "A sandy beach beneath a rocky headland", tone: "#1d2b36" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790166049/photo-1527004013197-933c4bb611b3-1790166052225.jpg", alt: "A red cabin on a rocky shore", tone: "#2a1f3d" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158811/photo-1682952986992-de7082fb213d-1790158812205.jpg", alt: "Waterfalls running down the wall of a fjord", tone: "#132a3b" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158809/photo-1607888566357-ec0b61abee46-1790158812198.jpg", alt: "A waterfall beside a wooden viewpoint", tone: "#1c2b17" },
];

export default function Hero() {
  return (
    <HoneycombHero
      title="Wander the"
      titleAccent="Fjords"
      subtitle="Waterfalls that drop straight into the sea, red cabins at the water's edge and skies that glow green after dark — small-group journeys through the far north."
      primaryActionLabel={"Plan\nyour trip"}
      primaryActionHref="#"
      images={IMAGES}
      socialLinks={[
        { label: "Instagram", href: "#" },
        { label: "YouTube", href: "#" },
        { label: "TikTok", href: "#" },
      ]}
      interval={4000}
      linkComponent={Link}
    />
  );
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/honeycomb-hero.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/honeycomb-hero
```

### Features

### A honeycomb that turns

The nine cells sit on a real hexagonal lattice, and the queue snakes around it so every step is a hop between neighbours. Each cell glides to its next place with a short stagger — the one heading for the feature spot leads, the one leaving it follows last.

### The feature is the background

Whatever photograph is in the large hexagon also fills the section behind everything, tinted with its own tone and darkened towards the copy. Photograph and colour crossfade together as the honeycomb turns — deep green behind the gorge, indigo behind the cabins, night blue behind the snow.

### Measured, not guessed

Every hexagon's position comes from the design in percentages of a fixed-aspect stage, so the composition is the same at 1024 and 1920 — including the cells cut by the right edge and the foot. Below the desktop breakpoint the honeycomb stacks under the copy.

### Operable

Arrows at the foot and the keyboard's arrow keys step the queue either way; a live region names the featured photograph; under prefers-reduced-motion the cells swap places without travelling.

### Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title`, `titleAccent` | `string` | `"Wander the"`, `"Fjords"` | The light line and the huge accent word. |
| `titleOverlapColor` | `string` | theme primary | The letters of the accent word that cross the photographs. |
| `subtitle` | `string` | — | The paragraph under the headline. |
| `primaryActionLabel`, `primaryActionHref` | `string` | `"Plan\nyour trip"`, `"#"` | The call-to-action hexagon, in `primary` with a compass above the label; `\n` breaks the line. |
| `images` | `&#123; src: string; alt: string; tone?: string &#125;[]` | nine Lofoten photographs, each with a tone | The queue, first featured. `tone` is the colour behind everything while that photograph is featured; keep it deep, the copy is white. |
| `socialLinks` | `&#123; label: string; href: string &#125;[]` | four networks, all `#` | The links along the foot; `[]` hides them. |
| `interval` | `number` | `4000` | Milliseconds between steps; `0` turns autoplay off. |
| `onChange` | `(index: number) => void` | — | Called with the index of the photograph that just became the feature. |
| `accent` | `string` | theme primary | Sets `--primary` for the section: the word, the rule, the arrows and the call to action. |
| `background` | `string` | a deep shade of the primary | The tone for photographs without their own. |
| `linkComponent` | `ElementType` | `"a"` | What renders every link; pass `next/link` in Next.js. |

## Hero Carousel

A full-bleed photo hero for a place worth travelling to: an eyebrow pill, a large light headline, a glass panel with the faces of the people who came before you and a call to action, and — the thing that moves — a queue of cards. The front card is the slide on screen; the ones behind it are what comes next. Every five seconds, or when a card is clicked, the queue slides forward, the photograph behind everything crossfades, and the headline and caption follow it.

`HeroCarousel` composes the library: the faces are an [AvatarStack](https://avaraui.com/docs/nextjs/avatar-stack). The colours come from the photographs; the theme's `--primary` (pin it with `accent`) is used for the eyebrow pip, the arrow on the call to action, the progress line and the focus rings.

### Watch the dawn from the summit

Eyebrow and headline across the top; the glass panel and the queue of cards along the foot. The queue moves every five seconds — click any card to bring it forward, use the arrow keys, or swipe on a phone. Hovering the rail holds the clock.

- `slides` are shown in order: the front card is the current slide, the rest queue up behind it. Each carries its `image` (full-bleed and in its card), a `title` and `description` for the caption, an optional `heading` that replaces the section headline while it is in front, and a `position` for the crop.
- `interval=5000` is the gap between slides in milliseconds. It pauses while the pointer or keyboard focus is on the rail, while the tab is hidden and while the section is off screen; `0` turns autoplay off and hides the progress line.
- `avatars` and `avatarsLabel` fill the top of the glass panel; `intro` is the paragraph and `cta` the pill. Pass `next/link` as `linkComponent` to keep client-side navigation.
- `reveal="in-view"` (the default) plays the entrance the first time the section is seen; the docs pass `"immediate"`. Under prefers-reduced-motion the entrance is skipped and slides swap without the crossfade or drift.

```tsx
"use client";



const SLIDES = [
  {
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
    alt: "Snowy summits catching dawn light over low cloud",
    title: "Dawn on the crater's edge",
    description: "An early start gets you to the edge as colour floods the valley.",
    heading: <>Watch the dawn<br />from the summit</>,
  },
  {
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    alt: "Mist drifting across dark ridgelines",
    title: "A misty hike along the crest",
    description: "A six-kilometre trail along the backbone of the range. No climbing.",
    heading: <>Hike the crest<br />before the crowds arrive</>,
  },
  {
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790145142/photo-1500530855697-b586d89ba3ee-1790145143493.jpg",
    alt: "A highway winding between red canyon walls",
    title: "Canyon off-road run",
    description: "Ride an open-top jeep down the gorge until the pavement gives way.",
    heading: <>Follow the gorge<br />until the asphalt runs out</>,
    position: "center 60%",
  },
];

const AVATARS = [
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
    alt: "Elena Vance",
    name: "Elena Vance",
    designation: "Alpine Trekker",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg",
    alt: "Tom Hardy",
    name: "Tom Hardy",
    designation: "Summit Guide",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg",
    alt: "Mara Jade",
    name: "Mara Jade",
    designation: "Trail Explorer",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg",
    alt: "Leo Silva",
    name: "Leo Silva",
    designation: "Photographer",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg",
    alt: "June Carter",
    name: "June Carter",
    designation: "Mountain Guide",
  },
];

export default function Hero() {
  return (
    <HeroCarousel
      className="lg:h-svh"
      eyebrow="Small-group treks in the mountains"
      heading={<>Watch the dawn<br />from the summit</>}
      slides={SLIDES}
      intro="Three days in the mountains with a local guide who knows every path."
      avatars={AVATARS}
      avatarsLabel="50+ travellers this season"
      cta={{ label: "Reserve a spot", href: "#" }}
      linkComponent={Link}
      interval={5000}
    />
  );
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/hero-carousel.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/hero-carousel
```

### Height

The section takes the height its content needs — about 44rem on a desktop — and never uses viewport units of its own, so it behaves inside any container. For a screen-tall hero, size it from outside:

```tsx
<HeroCarousel className="lg:h-svh" {...props} />
```

### Features

### A queue, not a slider

Cards glide between their places in the queue; the one sent to the back appears where it belongs instead of flying across the others. The background crossfades, settles and then drifts slowly until the next slide.

### The clock is the progress line

One CSS animation fills the line under the front card and moves the queue when it completes. Pausing the line pauses the clock, so a hover never throws away the time already spent.

### Every device

The rail measures itself and picks card sizes from its own width, not the viewport. Desktop puts the panel beside the rail; tablets stack them; phones give the front card most of the row and keep the rest of the queue peeking in.

### Operable and readable

Every card is a button with a visible focus ring; arrow keys walk the queue, a swipe moves it on touch, and a live region announces the slide. Reduced motion swaps slides without the crossfade or drift.

### Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `slides` | `&#123; image: string; alt: string; title: string; description?: string; heading?: ReactNode; position?: string &#125;[]` | — | The slides, in queue order. |
| `eyebrow` | `string` | — | The pill above the headline. |
| `heading` | `ReactNode` | — | The headline, used whenever the front slide has none of its own. |
| `intro` | `string` | — | The paragraph in the glass panel. |
| `avatars`, `avatarsLabel` | `&#123; src: string; alt?: string &#125;[]`, `string` | — | The faces at the top of the panel and the words beside them. |
| `cta` | `&#123; label: string; href: string &#125;` | — | The pill at the foot of the panel. |
| `interval` | `number` | `5000` | Milliseconds between slides; `0` turns autoplay off. |
| `defaultIndex` | `number` | `0` | The slide in front at first. |
| `onChange` | `(index: number) => void` | — | Called with the index of the slide that just came to the front. |
| `accent` | `string` | theme primary | Sets `--primary` for the section. |
| `reveal` | `"in-view" \| "immediate"` | `"in-view"` | When the entrance plays. |
| `linkComponent` | `ElementType` | `"a"` | What renders the CTA; pass `next/link` in Next.js. |

## Fashion Hero

A fashion hero: a bold two-line headline between a turning video badge and a stack of faces, five staggered columns of looks — each a person on a flat colour that tilts and zooms under the pointer — a call to action sitting on the middle look, and a footer with a customer's words on one side and the next story on the other.

`FashionHero` is built from library pieces: the badge is [Circular Text](https://avaraui.com/docs/nextjs/circular-text), the faces are [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack), the headline is [Text Animation](https://avaraui.com/docs/nextjs/text-animation) (`blur-in-up`, word by word), every look is a [Tilted Card](https://avaraui.com/docs/nextjs/tilted-card), and the badge opens a [Dialog](https://avaraui.com/docs/nextjs/dialog). When it first scrolls into view the badge and faces settle in, the looks rise from the middle column outward, the button lands on its look and the footer follows — one reveal, then only the badge keeps turning and the pointer does the rest.

### Daring designs

Five columns stepping down to the middle at desktop, three on tablets, two on phones with the middle look full width. Hover a look to tilt it; reload the preview to watch the reveal again.

- `looks` are up to seven `{ src, alt, tone }`, laid out left to right: a tall and a small, a tall, the tall that carries the button, a tall, a tall and a small. `tone` is the flat colour behind the person.
- `blend` multiplies the photo onto its tone (on by default), so a plain white studio background takes the colour. Turn it off for a shot that already has a coloured background.
- `video` is the phrase on the turning badge and the embed it opens in a Dialog. Leave it out and the badge's space stays empty so the headline keeps its place.
- `teaser` is the next story — a number, a category and a title — as one link; the arrow fills and the title underlines on hover.
- `reveal="in-view"` (the default) plays the sequence the first time the section enters the viewport; the docs pass `"immediate"`. Under prefers-reduced-motion everything renders finished and the badge holds still.

```tsx
"use client";



// A person on a plain studio background, multiplied onto a colour that echoes the outfit.
const LOOKS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790150481/pexels-photo-16944801-1790150482273.jpg", alt: "Model in a pink blouse and lime-green pants against yellow", tone: "#f0a72f", blend: false },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "Smiling model in a black top", tone: "#f7d774" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Model in a blush dress", tone: "#f4b7c5", blend: false },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790150484/pexels-photo-1462637-1790150482282.jpg", alt: "Model in a blue pinstripe shirt", tone: "#8cc4ee" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790150480/pexels-photo-9558236-1790150482273.jpg", alt: "Model in a coral shirtdress", tone: "#f9a875" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790150480/pexels-photo-6311613-1790150482272.jpg", alt: "Model in a grey hooded top, hood raised", tone: "#bfe4c6" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Man wearing a dark leather jacket", tone: "#2e9c82" },
];

const AVATARS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145139/pexels-photo-1036623-1790145143487.jpg", name: "Elena Vance", role: "Member" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145142/pexels-photo-2043590-1790145143488.jpg", name: "Marcus Chen", role: "Shopper" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145139/pexels-photo-1587009-1790145143488.jpg", name: "Sarah Jenkins", role: "Stylist" },
];

export default function Hero() {
  return (
    <FashionHero
      heading="Refresh Your Look With Daring Designs"
      video={{ badge: "Get to know us in this short film", url: "https://www.youtube.com/embed/…" }}
      avatars={AVATARS}
      avatarsHref="#"
      looks={LOOKS}
      cta={{ label: "Shop new arrivals", href: "#" }}
      quote={{
        text: "Moda Lane pieces feel modern and confident, just the refresh my closet was missing. Great fabrics, great feel!",
        author: "Nadia K.",
      }}
      teaser={{ index: "01", label: "Journal", title: "Update Your Wardrobe With New-Season Picks", href: "#" }}
      linkComponent={Link}
    />
  );
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/fashion-hero.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/fashion-hero
```

### Photos on colour

The reference look is a person cut out on a flat colour. Cut-outs are expensive; a studio shot on a plain background is not. With `blend` on, the photo is drawn with `mix-blend-mode: multiply` over its `tone`, so white becomes the tone and the person keeps their colours — and the effect is strongest with lighter tones and darker clothes. A shot that already has a coloured background is better left unblended: pass `blend: false` and pick a `tone` that matches its edges.

### Features

### Built from the library

Circular Text for the badge, Avatar Stack for the faces, Text Animation for the headline, Tilted Card for every look, Dialog for the video. Install this one item and all five come with it.

### One reveal, then the pointer

A single timeline plays on first view: badge and faces, looks from the middle outward, the button, the footer. After that only the badge turns; tilt, zoom, fan-out and arrows all answer the pointer.

### Responsive to two columns

Five staggered columns at lg, three at sm, two on phones with the middle look — and its button — full width. The header folds the badge and faces above the headline.

### Links are links

The call to action, the plus beside the faces and the teaser are anchors — pass your router's Link as linkComponent — and the video badge is a real button with a label for screen readers.

### Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` | `string` | Required | The headline, revealed word by word. |
| `looks` | `Look[]` | Required | Up to seven `&#123; src, alt, tone, blend?, position? &#125;`, in slot order. |
| `video` | `&#123; badge: string; url: string; title?: string &#125;` | — | Words on the turning badge and the embed it opens. |
| `avatars`, `avatarsHref`, `avatarsLabel` | `&#123; src, alt? &#125;[]`, `string`, `string` | —, —, `"Become a member"` | Faces in the top-right stack; the href adds a "+" link after them with that label. |
| `cta` | `&#123; label: string; href: string &#125;` | — | The pill sitting on the middle look. |
| `quote` | `&#123; text: string; author: string &#125;` | — | A customer's words and their name, set in the serif italic with a highlighter stroke. |
| `teaser` | `&#123; index, label, title, href &#125;` | — | The next story, as one link. |
| `accent` | `string` | theme primary | Sets `--primary` for the section: the highlighter stroke, focus rings and the mark above the middle look. |
| `reveal` | `"in-view" \| "immediate"` | `"in-view"` | When the sequence plays. |
| `linkComponent` | `ElementType` | `"a"` | Your router's link for every href. |

## Support Hero

A product hero on a soft grey ground: a headline that rises in word by word, one line under it and one call to action, then a bento of frosted cards — integrations on white tiles, two figures that count up, two portraits and a team card with faces scattered over a field of dots. The cards land in one staggered pass after the headline; after that only the pointer moves anything: cards lift, portraits zoom a touch, the integration tiles rise one after another, the faces drift apart.

`SupportHero` is built from library pieces. The ground and the cards are [Glass Panel](https://avaraui.com/docs/nextjs/glass-panel) (`GlassBackdrop` with a grey aurora, `GlassPanel` tiles), the headline is [Text Animation](https://avaraui.com/docs/nextjs/text-animation)'s `blur-in-up`, the figures are [Counter](https://avaraui.com/docs/nextjs/counter)'s animated type in its new bare form, and the call to action is [Button](https://avaraui.com/docs/nextjs/button). Every card is a named part — `Integrations`, `Stat`, `Photo`, `Team` — plus a plain `Card` for anything else.

### Headline, call to action, six cards

Twelve columns at desktop — 3 / 3 / 3 / 3 on the first row with the portrait spanning both rows, 3 / 6 on the second. Six columns at tablet, one on phones. Hover the cards.

- `heading` is set by `TextAnimation` in `blur-in-up`: each word rises out of a blur the first time the section is on screen. `subtitle` and the `cta` button fade in behind it.
- `Stat` counts up with `CounterBlock` — `value`, `decimals`, `prefix`, `suffix` — starting when the card is on screen. `tone="accent"` is the card in the theme's primary colour. Give it an `image` and the picture fills the card, with only the bottom-left corner under the figure washed in the card colour — the rest shows through, so pick a picture whose subject sits up and to the right.
- `Photo` fills its card with a portrait; `position` sets the crop anchor, `label` a word in the corner. Add `lg:row-span-2 lg:h-auto` to make one tall.
- `Team` scatters up to six `avatars` over the right half of the card, above a field of dots. They pop in after the cards and drift outward on hover.
- `reveal="in-view"` (the default) plays everything the first time the section enters the viewport; the docs pass `"immediate"`. Under prefers-reduced-motion the section renders finished.

```tsx
"use client";



const AVATARS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg", alt: "Ana" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790158810/pexels-photo-220453-1790158812206.jpg", alt: "Tom" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790158812/pexels-photo-2381069-1790158812209.jpg", alt: "Mei" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790158812/pexels-photo-1130626-1790158812207.jpg", alt: "Raj" },
];

export default function Hero() {
  return (
    <SupportHero
      heading="AI-Driven Support To Boost Your Business Growth"
      subtitle="A platform that helps customer service leaders provide efficient, high-quality support at scale with an AI agent, improving speed and quality across all channels, 24/7."
      cta={{ label: "Book a demo", href: "#" }}
    >
      <SupportHero.Integrations
        icons={[<DiscordIcon key="d" />, <SlackIcon key="s" />, <GoogleCalendarIcon key="c" />]}
        title="Integrations"
        text="Way better at getting things done than human agents"
      />

      {/* Spans both rows at desktop. */}
      <SupportHero.Photo src={"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790145139/pexels-photo-7709208-1790145143489.jpg"} alt="…" label="Transcript" position="58% center" className="lg:row-span-2 lg:h-auto" />

      <SupportHero.Stat
        value={83}
        suffix="%"
        caption="Up to 83% of conversations autonomously resolved"
        image="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1170,c_limit/v1790159967/photo-1745674684463-62f62cb88d4c-1790159970117.jpg"
        imageAlt="A laptop showing an AI assistant"
        imagePosition="70% center"
      />
      <SupportHero.Photo src={"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790159968/pexels-photo-3184639-1790159970118.jpg"} alt="…" position="center 40%" />
      <SupportHero.Stat
        value={5.5}
        decimals={1}
        suffix="B"
        caption="More efficient than human representatives"
        image="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1170,c_limit/v1790159967/photo-1746883741141-04859907ef5f-1790159970117.jpg"
        imageAlt="A phone with an AI chat open"
        imagePosition="65% center"
      />

      <SupportHero.Team
        title={<>Automated<br />Customer Service<br />Quality</>}
        avatars={AVATARS}
      />
    </SupportHero>
  );
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/support-hero.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/support-hero
```

### Layout

The bento is the `GlassBackdrop` grid — one column on phones, six at `md`, twelve at `lg` — and every part carries a default span (`Integrations`, `Stat` and `Photo` take three columns, `Team` takes six). Cards are a fixed `13rem` tall at `lg`, so a part given `lg:row-span-2 lg:h-auto` is exactly two cards tall. Pass any other span through `className`; the built-in parts are `GlassPanel`s, so `variant="solid"` on a card also works.

The call to action is a `Button`. Give `cta` an `onClick`, or an `href` to navigate to on click — pass a router `push` in `onClick` when you want client-side navigation.

### Features

### Built from the library

Glass Panel for the ground and the cards, Text Animation for the headline, Counter for the figures, Button for the call to action. Install this one item and all four come with it.

### One sequence, then the pointer

Words, line, button, cards, faces — one timeline the first time the section appears. After that nothing moves unless you hover it. Reduced motion renders the finished state.

### Figures that count when seen

Each Stat waits until its card is on screen before counting, so a hero below the fold does not run its numbers while nobody is looking.

### Server-safe

Cards and faces render opaque in the HTML and only animate once the page is live; nothing depends on JavaScript to be visible.

### Props Reference

#### SupportHero

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` | `string` | — | The headline, animated word by word. |
| `subtitle` | `ReactNode` | — | The line under it. |
| `cta` | `&#123; label: string; href?: string; onClick?: () => void &#125;` | — | The button. `href` is navigated to on click. |
| `aurora` | `[string, string, string]` | three greys | Colours washed behind the glass. |
| `reveal` | `"in-view" \| "immediate"` | `"in-view"` | When the sequence plays. |
| `children` | `ReactNode` | — | The cards, in the order they should fill the grid. |

#### SupportHero.Integrations

| Prop | Type | Description |
| --- | --- | --- |
| `icons` | `ReactNode[]` | Marks shown on white tiles, e.g. from the `icons` item. |
| `title`, `text` | `string` | Heading and the line under it. |

#### SupportHero.Stat

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | — | The figure counted up to. |
| `decimals` | `number` | `0` | Decimal places, e.g. `1` for 5.5. |
| `prefix`, `suffix` | `string` | — | Text either side of the figure, e.g. `"%"`, `"B"`. |
| `caption` | `string` | — | What the figure means. |
| `tone` | `"glass" \| "accent"` | `"glass"` | Frosted, or the accent card in the theme's primary colour with its foreground for text. |
| `image`, `imageAlt` | `string` | — | A picture behind the whole card. Only the bottom-left corner, under the figure, is washed with the card colour; the rest stays clear. Zooms a touch on hover. |
| `imagePosition` | `string` | `"center"` | CSS `object-position` for the crop — e.g. `"70% center"` to favour a subject on the right. |

#### SupportHero.Photo

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src`, `alt` | `string` | — | The portrait. |
| `label` | `string` | — | A word in the top-left corner. |
| `position` | `string` | `"center"` | CSS `object-position` for the crop. |

#### SupportHero.Team

| Prop | Type | Description |
| --- | --- | --- |
| `title` | `ReactNode` | The heading; use `<br />` for deliberate breaks. |
| `avatars` | `&#123; src: string; alt?: string &#125;[]` | Up to six faces, scattered over the right half. |

#### SupportHero.Card

A `GlassPanel` that takes part in the reveal: `shape="tile"`, `interactive`, three columns wide and `13rem` tall at `lg`. All `GlassPanel` props apply.

## Collage Hero

A hero for a place that is warm and busy — a kindergarten here, but any studio, school or workshop: a badge whose name turns slowly around a mark, a serif headline with two words in colour, three hashtag pills, a collage of seven photographs in five staggered columns, and a footer with a quote, a scroll-down pill and a watch-video trigger. When it first appears the headline rises out of a blur, the pills pop in with a twist and the photographs come up one after another; after that the badge keeps turning and the pointer does the rest — photographs lift and zoom a touch, pills straighten, the arrow nods.

`CollageHero` is built from library pieces: the scroll pill is [Button](https://avaraui.com/docs/nextjs/button), the video opens in a [Dialog](https://avaraui.com/docs/nextjs/dialog). The colours come from the theme — the accent is `--primary` (pin it with `accent`) and the second colour is `highlight`.

### A bright place

Badge, headline and pills across the top; five columns of photographs; quote, scroll pill and video trigger along the foot. Three columns at tablet — a portrait, a stack and the tall one, then three landscapes in a row — and two on phones. Hover the photographs and the pills, open the video.

- `heading` is any node; wrap the words to colour in `<em>` — the first takes the accent, the second the `highlight`. Use `<br />` for a deliberate break.
- `photos` are laid out left to right: one under the caption, two stacked, one tall in the middle, two stacked, one on the right. Each takes a `position` for its crop. Fewer than seven is fine; the columns just empty.
- `tags` are up to three pills, scattered and tilted at desktop and in a plain row below. `tone` picks soft / highlight / accent; the defaults cycle through them.
- `video` renders the play trigger; its `url` is an embed URL shown in a `Dialog` at 16:9. `scrollLabel` is a `Button` that scrolls to `scrollTo`, or the next section.
- `reveal="in-view"` (the default) plays the sequence the first time the section enters the viewport; the docs pass `"immediate"`. Under prefers-reduced-motion the badge holds still and the section renders finished.

```tsx
"use client";


const PHOTOS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790148862/pexels-photo-3661193-1790148865106.jpg", alt: "Wooden toy dinosaurs atop a pile of books" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790148867/pexels-photo-3661387-1790148865107.jpg", alt: "A toddler building with timber blocks" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790148863/pexels-photo-8612967-1790148865108.jpg", alt: "Kids painting around a small table" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790148863/pexels-photo-8535214-1790148865108.jpg", alt: "An educator guiding a girl's brushwork", position: "40% top" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790148863/pexels-photo-3661286-1790148865107.jpg", alt: "A little boy clutching a toy wooden dinosaur" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790148866/pexels-photo-8613317-1790148865109.jpg", alt: "Kids on the lawn with their playthings" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790148862/pexels-photo-8535227-1790148865108.jpg", alt: "A grinning girl next to a paper lion", position: "center 35%" },
];

export default function Hero() {
  return (
    <CollageHero
      brand="PlayMeadow"
      heading={<>A bright place<br />to <em>discover</em> and <em>imagine</em></>}
      tags={[{ label: "#grow" }, { label: "#laugh" }, { label: "#build" }]}
      caption="Gentle, fun care for young explorers"
      photos={PHOTOS}
      quote="Our preschool is a cosy, friendly place where every child feels secure, curious and eager to discover something new each day."
      scrollLabel="Keep scrolling"
      scrollTo="#programme"
      video={{
        eyebrow: "See the film",
        text: "Follow a typical day at our cheerful little preschool",
        url: "https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1",
        title: "Inside PlayMeadow",
      }}
    />
  );
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/collage-hero.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/collage-hero
```

### The badge

`CollageHero.Badge` is exported on its own: the `brand` text set on an SVG circle with `textPath`, turning once every 22 seconds, around a `logo` — three dots in the accent and highlight by default, or anything you pass. Under `prefers-reduced-motion` it does not turn.

```tsx
import { Sparkles } from "lucide-react";

<CollageHero.Badge text="PlayMeadow" logo={<Sparkles className="size-10 text-primary" />} />
```

### Features

### Built from the library

Button for the scroll pill, Dialog for the video. Both install with this item; the rest is Tailwind and one SVG.

### One reveal, one thing that keeps moving

Headline, pills, photographs, footer — one timeline the first time the section appears. The turning badge is the only ambient motion, and it stops under reduced motion.

### Two colours, from the theme

The accent is your primary colour unless you pin it; the second colour is one prop. Pills, badge, coloured words, play button and scroll pill all follow.

### Real links and dialogs

The video trigger is keyboard-operable and opens a proper dialog with focus handling; every photograph carries its alt text; nothing depends on JavaScript to be visible.

### Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `brand` | `string` | — | The words that run around the badge. |
| `logo` | `ReactNode` | three dots | What sits in the middle of the badge. |
| `heading` | `ReactNode` | — | The headline. `<em>` words take the accent, then the highlight. |
| `tags` | `&#123; label: string; tone?: "accent" \| "highlight" \| "soft" &#125;[]` | `[]` | Up to three pills. |
| `caption` | `string` | — | Tracked caps over the first photograph. |
| `photos` | `&#123; src: string; alt: string; position?: string &#125;[]` | — | Up to seven photographs, in layout order. |
| `quote` | `string` | — | Footer quote, with a large opening mark in the accent. |
| `scrollLabel`, `scrollTo` | `string` | `"Keep scrolling"`, next section | The scroll pill and the selector it scrolls to. |
| `video` | `&#123; eyebrow?: string; text: string; url: string; title?: string &#125;` | — | The play trigger and the embed it opens. |
| `accent` | `string` | theme primary | Sets `--primary` for the section. |
| `highlight` | `string` | `"#f5c542"` | The second colour. |
| `reveal` | `"in-view" \| "immediate"` | `"in-view"` | When the sequence plays. |

## Hero Block

A collection of modern hero layouts in one component, built with Tailwind CSS and plain CSS animations, no animation library: revolving 3D circular photo orbit ring, rotating word spring bounce, character typewriter effect, continuous thumbnail slider marquee, facility architectural blueprint grid, and high-tech cyclone radar. One registry item, multiple opinionated variants.

### Orbit Ring Hero

Copy and actions on the left, revolving 3D circular photo orbit ring on the right with smooth hover pause.

- Set `variant="orbit"` for a revolving 3D circular photo orbit ring layout.
- `images` are the cards on the ring, in orbit order. Offset evenly by duration.
- `duration=36` is the seconds for one full revolution.
- `highlights` are the dotted facts under the action buttons with customizable label and color.

```tsx
"use client";



// Landscapes from Unsplash, free to use.
const IMAGES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790148863/photo-1447752875215-b2761acb3c5d-1790148865109.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790146210/photo-1507525428034-b723cf961d3e-1790146212208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790158813/photo-1433086966358-54859d0ed716-1790158812209.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790145142/photo-1500530855697-b586d89ba3ee-1790145143493.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790148863/photo-1473448912268-2022ce9509d8-1790148865110.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_limit/v1790158814/photo-1518495973542-4542c06a5843-1790158812213.jpg",
];

export default function OrbitHeroExample() {
  return (
    <HeroBlock
      variant="orbit"
      badgeText="Identity & animation studio"
      badgeHref="#"
      title="Movement is what"
      titleAccent="people notice first."
      subtitle="We design brand identities and the animation that brings them to life — from early sketches to the live release."
      primaryActionLabel="Work with us"
      primaryActionHref="#"
      secondaryActionLabel="View projects"
      secondaryActionHref="#"
      images={IMAGES}
      highlights={[
        { label: "15 hand-picked scenes" },
        { label: "Full-circle rotation", color: "#10b981" },
        { label: "Holds still on hover", color: "#f59e0b" },
      ]}
      duration={36}
      linkComponent={Link}
    />
  );
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/hero.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/hero
```

## Bento Cascade Hero

An infinite vertical bento marquee hero section that loops seamlessly on the browser compositor. Features staggered multi-column cards, rich media tiles, soft top and bottom edge fade masks, and responsive motion with zero visible reset jumps — inspired by Framer's Bento Cascade.

### Bento Cascade Infinite Motion Hero

Left column presents the interactive avatar stack, 5-star review score, 2-line headline, stylish accent line description, primary CTA button, secondary outline button, and expedition support badges. Right column features an infinite seamless 2-column bento cascade of high-definition nature cards, glass tag badges, theme-reactive hover glows, soft edge fade masks, and seamless hover pause.

- Set `variant="bento-cascade"` for the infinite vertical bento marquee cascade hero layout.
- `speed=30` seconds for one complete seamless vertical loop cycle.
- `pauseOnHover=true` smoothly pauses the continuous cascade animation at the exact position when hovering over any card, resuming seamlessly when the cursor leaves.

```tsx
"use client";



export default function Hero() {
  return (
    <BentoCascadeHero
      title="Explore wild nature & plan"
      titleAccent="your next escape"
      subtitle="Discover handpicked alpine sanctuaries, secluded glacial lakes, and ancient redwood trails tailored for unforgettable outdoor journeys."
      primaryActionLabel="Start exploring"
      primaryActionHref="#explore"
      secondaryActionLabel="View journeys"
      secondaryActionHref="#destinations"
      speed={30}
      pauseOnHover={true}
      linkComponent={Link}
    />
  );
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/bento-cascade-hero.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/bento-cascade-hero
```

## Breathe Hero

An ethereal hero featuring an elegant serif headline and a staggered 5-card curved arch. On scroll, the center card scales up to 1.35x while surrounding cards gently drift outward and dim, creating a breathtaking focal zoom.

### Breathe Arch Stagger Hero

An ethereal hero featuring an elegant serif headline and a staggered 5-card curved arch. On scroll, the center card scales up to 1.35x while surrounding cards gently drift outward and dim, creating a breathtaking focal zoom.

- Set `variant="breathe"` for the Framer Breathe curved 5-card arch hero layout.
- `scrollMode="grow"` controls the scroll animation: 'grow' zooms the center card while drifting outer cards, 'parallax' moves cards vertically at variable rates, and 'spread' fans out the cards.
- `scrollScale=1.35` magnification factor applied to the center focal card as the page scrolls.

```tsx
"use client";



export default function Hero() {
  return (
    <div className="h-screen w-full">
      <BreatheHero
        title="Crafted for depth,"
        titleAccent="built for motion."
        description="Create immersive digital experiences where fluid scroll choreography, spatial architecture, and tactile visual polish move in effortless harmony."
        badgeText="Interactive Motion Architecture"
        badgeHighlight="Studio v2.4"
        badgeHref="#explore"
        buttonLabel="Start Exploring"
        buttonHref="#get-started"
        secondaryButtonLabel="View Showroom"
        secondaryButtonHref="#showroom"
        scrollMode="grow"
        hoverMode="zoom"
        captions="hover"
        linkComponent={Link}
      />
    </div>
  );
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/breathe-hero.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/breathe-hero
```

## Solar Snapshot Hero

A lightweight interactive hero with a pointer-following sun orb, Typographic Curtain CTA buttons, an interactive Avatar Group, and a click-to-capture Polaroid section screenshot stack.

### Solar Snapshot Sun-Cursor Hero

A lightweight interactive hero with a pointer-following sun orb, Typographic Curtain CTA buttons, an interactive Avatar Group, and a click-to-capture Polaroid section screenshot stack in the bottom-right where each frame auto-clears 10 seconds after capture.

- Set `variant="solar-snapshot"` for the interactive sun-cursor & click-to-capture Polaroid section screenshot hero.
- `snapshotDurationMs=10000` time in milliseconds (10s) before each captured Polaroid frame automatically disappears from the bottom-right stack.
- `primaryButtonVariant="pricing-typographic"` configures the animated button style from our Button component.

```tsx
"use client";



export default function Hero() {
  return (
    <SolarSnapshotHero
      title="Where natural light meets"
      titleAccent="expressive digital craft."
      description="Guide the radiant sun across the canvas with your cursor and click anywhere to capture an instant live snapshot of the stage."
      primaryActionLabel="Initiate Project"
      primaryActionHref="#explore"
      primaryButtonVariant="pricing-typographic"
      secondaryActionLabel="Explore Studio"
      secondaryActionHref="#lightbox"
      secondaryButtonVariant="pricing-typographic-muted"
      snapshotDurationMs={10000}
      linkComponent={Link}
    />
  );
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/solar-snapshot-hero.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/solar-snapshot-hero
```

### Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"bounce" \| "typing" \| "slider" \| "glow-arc" \| "pet-shop" \| "doctor" \| "facility" \| "vortex" \| "orbit" \| "bento-cascade" \| "breathe"` | `"bounce"` | The layout & animation style. `"breathe"` renders an elegant serif headline with a staggered 5-card curved arch and scroll-zoom focus motion; `"bento-cascade"` renders an infinite vertical bento marquee with staggered columns, rich media tiles, and soft edge fade masks; `"orbit"` / `"orbit-gallery"` renders revolving 3D circular photo ring with upright cards & smooth hover pause; `"bounce"` uses spring word motion; `"typing"` uses typewriter effect; `"slider"` renders split 2-column hero with continuous marquee; `"glow-arc"` / `"pet-shop"` renders pet care hero; `"doctor"` renders medical test kits hero; `"facility"` renders architectural CAD blueprint grid hero with interactive morphing shape; `"vortex"` renders atmospheric cyclone radar simulation with animated rotating canvas and telemetry HUD. |
| `typingWords` | `string[]` | `["Interfaces", "Components", …]` | The rotating words between `titlePrefix` and `titleSuffix`. |
| `prefixPosition` | `"fixed" \| "fluid"` | `"fluid"` for typing, `"fixed"` for bounce | Whether the title before the rotating word holds still (`"fixed"`, keeping the longest word's width) or re-centres as the word types, deletes or swaps (`"fluid"`). The word itself is an `AnimatedTypographyBlock`. |
| `petImage` · `secondaryPetImage` | `string` | `Unsplash URLs` | Custom image URLs for the main featured pet photo and secondary avatar badge photo (used when `variant="pet-shop"`). |
| `sliderImages` | `string[]` | `[…]` | Array of thumbnail image URLs for the continuous right-to-left marquee slider (used when `variant="slider"`). |
| `mainImage` | `string` | `"…"` | Featured image URL for the right column (used when `variant="slider"`). |
| `badgeText` · `badgeHref` · `titlePrefix` · `titleSuffix` · `subtitle` · `cliCommand` | `string` | `—` | Every string in the section is a prop, each with a sensible default. `cliCommand` feeds the one-click copy button. |
| `primaryActionLabel` · `primaryActionHref` · `secondaryActionLabel` · `secondaryActionHref` | `string` | `—` | Label and destination for each of the two call-to-action buttons. |
| `eyebrow` | `string` | `"CLIMATE RISK, PER PARCEL"` | Monospace uppercase eyebrow text shown above the main title (used in `variant="vortex"`). |
| `metrics` | `Array<{ value: string; label: string }>` | `134M / 412K / 180ms` | Array of 3 summary metrics shown at the bottom of the left column (used in `variant="vortex"`). |
| `hudTitle` · `hudTime` · `hudMetrics` | `string` / `Array` | `"GUST FIELD" / "T+36:30" / […]` | Telemetry HUD card header and data points displayed in the bottom-right corner of the radar panel (used in `variant="vortex"`). |
| `rotationSpeed` | `number` | `0.0025` | Angular rotation speed in radians per frame for the animated cyclone vortex canvas (used in `variant="vortex"`). |
| `color` | `string` | `undefined` | Accent color — a preset name or any CSS color. Left unset it inherits your theme. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/hero
