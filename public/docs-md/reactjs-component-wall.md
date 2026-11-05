---
title: "Shadcn Component Wall"
description: "Shadcn Component Wall. A landing hero for a component library: a headline that keeps one word changing."
url: https://avaraui.com/docs/nextjs/component-wall
---

# Shadcn Component Wall

A landing hero for a component library. In the middle, the copy — a small badge, a headline that blurs in word by word and keeps one word changing, a lead, an install command, two actions, a line of trust and, closing the column, the tools it is built with: a label, then two rows of marks — an odd batch staggers as three over four — one batch of related tools at a time. On either side, a wall of screenshots that never ends: a camera hangs over each, zoomed in on one card, and every few seconds pulls back, glides to the next card and settles on it — the left camera resting high, the right one low. On phones there is a single wall instead: a band of every card between the copy and the tools. A second layout puts the copy on the left and a single wall on the right, with the tools over its lower edge.

The copy and the walls talk to each other. The install line ends in the name of the card a camera has just landed on, and slides to the next name as the next camera lands — so the hero is always showing something the reader can paste into a terminal. The walls are [Image Walls](https://avaraui.com/docs/reactjs/image-wall), the headline a [Text Animation](https://avaraui.com/docs/reactjs/text-animation), the copy control a [Copy Button](https://avaraui.com/docs/reactjs/copy-button), the faces an [Avatar Stack](https://avaraui.com/docs/reactjs/avatar-stack), the stars [Half Stars](https://avaraui.com/docs/reactjs/half-stars) and the tools a [Tech Stack](https://avaraui.com/docs/reactjs/tech-stack), passed in as `stack`. The headline is set in your theme's `font-serif`, the rest in `font-sans`; every colour is a theme token.

## Build interactive interfaces

The copy in the middle, a wall on each side. Wait a few seconds: the left camera glides to another card, then the right one, and the install line changes to name whichever just landed. Hovering a wall holds its camera.

- `layout="center"` centres the copy between two walls, each half the width and fading in under it. The left camera rests high and towards the outside, the right one low, so the two resting cards never mirror each other across the headline. The walls split `items` — the first half on the left, the rest on the right — so each draws half the cards. Below `lg` there is one wall instead — a band of every card between the copy and the tools. `"split"`, the default, is the copy on the left and one wall on the right — see Examples.
- `install` is the command in the box. Write `{item}` where the card's name goes — `"npx shadcn@latest add @avara-ui/{item}"` — and the card a camera has just landed on fills it in with its `slug`, sliding to the next name as the next camera lands. The copy button copies the whole resolved line. On phones only the last word before the name (`@avara-ui/`) stays.
- `heading` is a string, revealed word by word with the library's blur-in-up text animation. Write `{word}` where `headingWords` take turns — each new word blurs in the same way, every `wordInterval` ms — and name one word in `accent` to set it in the primary colour. Keep it short: it's set large in `font-serif` and wraps at about fourteen characters per line.
- `items` are the cards, dealt into `columns` in order. Each has a mono `title`, an `image` cropped into the same 493:332 frame, and an optional `slug` for the install line (default: the title in kebab-case). The right wall deals the same list from halfway through, so the two walls never show the same card; `onFocus` always reports an index into `items`.
- `interval=4500` is how long each camera rests on a card; the right one lands half an interval after the left, so they take turns. Each holds while its wall is hovered, while the tab is hidden and while the section is off screen; `0` keeps both still on their first cards.
- `trust` is the faces, the stars and the sentence under the actions; leave out `avatars` or `rating` to drop either.
- `stack` is a Tech Stack — the tools the library is built with — closing the copy column. Its groups of four to eight take turns, an odd group as three over four, each mark blurring in the way the headline word does. The column is narrow, so give it `variant="compact"`: the label sits between two hairlines and only the marks show, each name its tooltip and read to screen readers.
- `zoom=0.9` is this layout's default: each wall is half the width, so a smaller resting card keeps it clear of the copy. Pass `zoom` to override it.

```tsx
import { ComponentWall, type ComponentWallItem } from "@/components/custom/blocks/ComponentWallBlock";


// slug is what the install line calls the card; it defaults to the title in kebab-case.
const ITEMS: ComponentWallItem[] = [
  { slug: "hero", title: "Word bounce hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg" },
  { slug: "pricing", title: "Pricing plans", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg" },
  { slug: "bento-showcase", title: "Bento showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg" },
  { slug: "book-appointment", title: "Book appointment", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg" },
  { slug: "collage-hero", title: "Collage hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg" },
  { slug: "fashion-hero", title: "Fashion hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg" },
  { slug: "hero-carousel", title: "Hero carousel", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/hero-carousel-1790516064496.jpg" },
  { slug: "honeycomb-hero", title: "Honeycomb hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg" },
  // … as many as you like; four columns of six reads well
];

// Faces for the trust line — shown as an Avatar Group (shift on hover, name tooltip).
const AVATARS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson" },
];

// Four to eight related tools per group; an odd group sits three over four. Add
// more <TechStackGroup>s and they take turns. Any node works as the icon — an <img> too.
// The centred column is narrow, so the compact variant (marks only) fits it.
const STACK = (
  <TechStack label="Built with" variant="compact">
    <TechStackGroup>
      <TechStackTool name="React" icon={<ReactIcon />} />
      <TechStackTool name="Next.js" icon={<NextjsIcon fill="currentColor" />} />
      <TechStackTool name="TypeScript" icon={<TypeScriptIcon />} />
      <TechStackTool name="Tailwind CSS" icon={<TailwindIcon />} />
      <TechStackTool name="Motion" icon={<MotionIcon />} />
      <TechStackTool name="GSAP" icon={<GsapIcon />} />
      <TechStackTool name="Lucide" icon={<LucideIcon />} />
    </TechStackGroup>
  </TechStack>
);

export default function Hero() {
  return (
    <ComponentWall
      layout="center"
      badge={{ label: "Next-gen React components", href: "/docs" }}
      heading="Build interactive {word}."
      headingWords={["interfaces", "components", "experiences", "animations", "dashboards"]}
      accent="interactive"
      description="A meticulous library of React components and interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP and Motion."
      install={{ command: "npx shadcn@latest add @avara-ui/{item}" }}
      primaryAction={{ label: "Browse components", href: "/docs" }}
      secondaryAction={{ label: "Star on GitHub", href: "https://github.com/AlgorizeTech", icon: <GitHubIcon size={16} /> }}
      trust={{ text: "Loved by developers shipping real products with it", avatars: AVATARS, rating: 5 }}
      items={ITEMS}
      stack={STACK}
      interval={4500}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/component-wall.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/component-wall
```

## More Examples

### Centred with persistent background

The copy in the middle between two gliding screenshot walls. On mobile and small screens, the animated walls stay underneath the copy in the background layer just like on desktop, rather than dropping below the action buttons.

- `layout="center"` centres the copy between two walls, each half the width and fading in under it.
- `persistentBackground=true` ensures the animated walls remain anchored in the background behind the content on small screens, preventing the cards from dropping down below the call-to-action buttons.
- `install` is the command in the box. Live-updates with the card slug the camera lands on.
- `items` are the cards dealt into the walls. The left wall draws the first half, the right wall the second half.
- `interval=4500` is how long each camera rests on a card; the right one lands half an interval after the left.
- `mobileZoom=0.30` controls the scale of the background cards on small screens and phones, rendering them delightfully compact and unobtrusive.
- `stack` renders the Tech Stack in compact mode below the trust statement in the center column.

```tsx
import { ComponentWall, type ComponentWallItem } from "@/components/custom/blocks/ComponentWallBlock";


// slug is what the install line calls the card; it defaults to the title in kebab-case.
const ITEMS: ComponentWallItem[] = [
  { slug: "hero", title: "Word bounce hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg" },
  { slug: "pricing", title: "Pricing plans", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg" },
  { slug: "bento-showcase", title: "Bento showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg" },
  { slug: "book-appointment", title: "Book appointment", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg" },
  { slug: "collage-hero", title: "Collage hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg" },
  { slug: "fashion-hero", title: "Fashion hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg" },
  { slug: "hero-carousel", title: "Hero carousel", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/hero-carousel-1790516064496.jpg" },
  { slug: "honeycomb-hero", title: "Honeycomb hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg" },
  // … as many as you like; four columns of six reads well
];

// Faces for the trust line — shown as an Avatar Group (shift on hover, name tooltip).
const AVATARS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson" },
];

// Keeps the animated screenshot walls in the background layer behind the copy
// across all screen sizes (mobile and desktop) instead of dropping below the buttons.
const STACK = (
  <TechStack label="Built with" variant="compact">
    <TechStackGroup>
      <TechStackTool name="React" icon={<ReactIcon />} />
      <TechStackTool name="Next.js" icon={<NextjsIcon fill="currentColor" />} />
      <TechStackTool name="TypeScript" icon={<TypeScriptIcon />} />
      <TechStackTool name="Tailwind CSS" icon={<TailwindIcon />} />
      <TechStackTool name="Motion" icon={<MotionIcon />} />
      <TechStackTool name="GSAP" icon={<GsapIcon />} />
      <TechStackTool name="Lucide" icon={<LucideIcon />} />
    </TechStackGroup>
  </TechStack>
);

export default function Hero() {
  return (
    <ComponentWall
      layout="center"
      persistentBackground
      badge={{ label: "Next-gen React components", href: "/docs" }}
      heading="Build interactive {word}."
      headingWords={["interfaces", "components", "experiences", "animations", "dashboards"]}
      accent="interactive"
      description="A meticulous library of React components and interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP and Motion."
      install={{ command: "npx shadcn@latest add @avara-ui/{item}" }}
      primaryAction={{ label: "Browse components", href: "/docs" }}
      secondaryAction={{ label: "Star on GitHub", href: "https://github.com/AlgorizeTech", icon: <GitHubIcon size={16} /> }}
      trust={{ text: "Loved by developers shipping real products with it", avatars: AVATARS, rating: 5 }}
      items={ITEMS}
      stack={STACK}
      interval={4500}
    />
  );
}
```

### Clean mobile view (no background animation)

Centred hero layout with background image animations completely hidden on mobile and small screens (<lg). Pass showMobileWall={false} (or mobileBackground={false}) across ALL variants (center, split, and center-background) to keep mobile screens clean and distraction-free while retaining full interactive animation on desktop.

- `showMobileWall=false` completely hides the background screenshot animations on small screens and phones (<lg). Supported across all layout variants (center, split, and center-background). Desktop retains full dual-wall interactive animation.
- `layout="center"` centres the copy between two walls on desktop.
- `install` is the command in the box. Live-updates with the card slug the camera lands on.
- `items` are the cards dealt into the walls.
- `interval=4500` is how long each camera rests on a card.
- `stack` renders the Tech Stack in compact mode below the trust statement in the center column.

```tsx
import { ComponentWall, type ComponentWallItem } from "@/components/custom/blocks/ComponentWallBlock";


// slug is what the install line calls the card; it defaults to the title in kebab-case.
const ITEMS: ComponentWallItem[] = [
  { slug: "hero", title: "Word bounce hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg" },
  { slug: "pricing", title: "Pricing plans", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg" },
  { slug: "bento-showcase", title: "Bento showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg" },
  { slug: "book-appointment", title: "Book appointment", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg" },
  { slug: "collage-hero", title: "Collage hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg" },
  { slug: "fashion-hero", title: "Fashion hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg" },
  { slug: "hero-carousel", title: "Hero carousel", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/hero-carousel-1790516064496.jpg" },
  { slug: "honeycomb-hero", title: "Honeycomb hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg" },
  // … as many as you like; four columns of six reads well
];

// Faces for the trust line — shown as an Avatar Group (shift on hover, name tooltip).
const AVATARS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson" },
];

// Hides the background image animation on mobile and small screens (<lg),
// keeping the hero clean and focused while retaining full animation on desktop.
// You can use showMobileWall={false} across ALL variants (center, split, persistentBackground).
const STACK = (
  <TechStack label="Built with" variant="compact">
    <TechStackGroup>
      <TechStackTool name="React" icon={<ReactIcon />} />
      <TechStackTool name="Next.js" icon={<NextjsIcon fill="currentColor" />} />
      <TechStackTool name="TypeScript" icon={<TypeScriptIcon />} />
      <TechStackTool name="Tailwind CSS" icon={<TailwindIcon />} />
      <TechStackTool name="Motion" icon={<MotionIcon />} />
      <TechStackTool name="GSAP" icon={<GsapIcon />} />
      <TechStackTool name="Lucide" icon={<LucideIcon />} />
    </TechStackGroup>
  </TechStack>
);

export default function Hero() {
  return (
    <ComponentWall
      layout="center"
      showMobileWall={false}
      badge={{ label: "Next-gen React components", href: "/docs" }}
      heading="Build interactive {word}."
      headingWords={["interfaces", "components", "experiences", "animations", "dashboards"]}
      accent="interactive"
      description="A meticulous library of React components and interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP and Motion."
      install={{ command: "npx shadcn@latest add @avara-ui/{item}" }}
      primaryAction={{ label: "Browse components", href: "/docs" }}
      secondaryAction={{ label: "Star on GitHub", href: "https://github.com/AlgorizeTech", icon: <GitHubIcon size={16} /> }}
      trust={{ text: "Loved by developers shipping real products with it", avatars: AVATARS, rating: 5 }}
      items={ITEMS}
      stack={STACK}
      interval={4500}
    />
  );
}
```

### Copy beside the wall

The copy on the left, one wall filling the right and fading under it. One camera, so the install line follows it card by card; the tools sit over the lower edge of the wall.

- `layout="split"` is the default: the copy takes the left 44–46% on desktop and the wall the right 56–58%, fading in under the copy. Below `lg` the wall is a band under the copy.
- `stack` sits over the lower wall on desktop and under the band on smaller screens; the wall blurs and fades beneath the marks. A labelled Tech Stack (the default variant) fits here: from `xl` up names sit beside the marks; below that only the marks show.
- `zoom=1.35` is the default here: one wall has room for a larger resting card.

```tsx
import { ComponentWall, type ComponentWallItem } from "@/components/custom/blocks/ComponentWallBlock";


// slug is what the install line calls the card; it defaults to the title in kebab-case.
const ITEMS: ComponentWallItem[] = [
  { slug: "hero", title: "Word bounce hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg" },
  { slug: "pricing", title: "Pricing plans", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg" },
  { slug: "bento-showcase", title: "Bento showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg" },
  { slug: "book-appointment", title: "Book appointment", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg" },
  { slug: "collage-hero", title: "Collage hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg" },
  { slug: "fashion-hero", title: "Fashion hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg" },
  { slug: "hero-carousel", title: "Hero carousel", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/hero-carousel-1790516064496.jpg" },
  { slug: "honeycomb-hero", title: "Honeycomb hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg" },
  // … as many as you like; four columns of six reads well
];

// Faces for the trust line — shown as an Avatar Group (shift on hover, name tooltip).
const AVATARS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson" },
];

// Beside the wall there is room for names from xl up, so the labelled
// (default) TechStack variant fits here.
const STACK = (
  <TechStack label="Built with">
    <TechStackGroup>
      <TechStackTool name="React" icon={<ReactIcon />} />
      <TechStackTool name="Next.js" icon={<NextjsIcon fill="currentColor" />} />
      <TechStackTool name="TypeScript" icon={<TypeScriptIcon />} />
      <TechStackTool name="Tailwind CSS" icon={<TailwindIcon />} />
      <TechStackTool name="Motion" icon={<MotionIcon />} />
      <TechStackTool name="GSAP" icon={<GsapIcon />} />
      <TechStackTool name="Lucide" icon={<LucideIcon />} />
    </TechStackGroup>
  </TechStack>
);

export default function Hero() {
  return (
    <ComponentWall
      layout="split"
      badge={{ label: "Next-gen React components", href: "/docs" }}
      heading="Build interactive {word}."
      headingWords={["interfaces", "components", "experiences", "animations", "dashboards"]}
      accent="interactive"
      description="A meticulous library of React components and interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP and Motion."
      install={{ command: "npx shadcn@latest add @avara-ui/{item}" }}
      primaryAction={{ label: "Browse components", href: "/docs" }}
      secondaryAction={{ label: "Star on GitHub", href: "https://github.com/AlgorizeTech", icon: <GitHubIcon size={16} /> }}
      trust={{ text: "Loved by developers shipping real products with it", avatars: AVATARS, rating: 5 }}
      items={ITEMS}
      stack={STACK}
      interval={4500}
    />
  );
}
```

### Fullscreen wall (no copy)

An edge-to-edge continuous infinite canvas in a masonry layout without copy or text. Click & drag anywhere in all 4 directions (left, right, up, down) with smooth momentum physics and ambient floating drift — it wraps infinitely without ever ending.

- `layout="fullscreen"` renders an edge-to-edge single canvas across the full screen with all cards included in a masonry column style, without dividing into left/right halves and without copy or text overlays.
- `draggable=true` allows users to click and drag the entire canvas in all 4 directions with inertial momentum physics and touch support, scrolling infinitely in 2D.
- `drift=true` enables continuous gentle ambient floating drift across the screen when not being actively dragged.
- `stagger=72` controls the vertical masonry stagger offset between columns, giving the wall an organic masonry waterfall flow where rows don't line up uniformly.
- `gap=16` controls the spacing in pixels between cards in all directions (top, bottom, left, right, defaults to 16).
- `items` all cards rendered within the single unified wall with infinite repeating tiles across the entire 2D plane.

```tsx
// slug is what the install line calls the card; it defaults to the title in kebab-case.
const ITEMS: ComponentWallItem[] = [
  { slug: "hero", title: "Word bounce hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg" },
  { slug: "pricing", title: "Pricing plans", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg" },
  { slug: "bento-showcase", title: "Bento showcase", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg" },
  { slug: "book-appointment", title: "Book appointment", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg" },
  { slug: "collage-hero", title: "Collage hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg" },
  { slug: "fashion-hero", title: "Fashion hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg" },
  { slug: "hero-carousel", title: "Hero carousel", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/hero-carousel-1790516064496.jpg" },
  { slug: "honeycomb-hero", title: "Honeycomb hero", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg" },
  // … as many as you like; four columns of six reads well
];

// Faces for the trust line — shown as an Avatar Group (shift on hover, name tooltip).
const AVATARS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson" },
];

export default function FullscreenWallHero() {
  return (
    <ComponentWall
      layout="fullscreen"
      items={ITEMS}
    />
  );
}
```

## Features

### An install line that follows the camera

The wall reports the card it has settled on; the hero puts that card's slug into the command and slides the old name out. Whatever the reader is looking at, the line beside it is the way to get it.

### One entrance, in order

The headline blurs in word by word; then the lead, the command, the actions and the trust line rise once, each a beat after the last. Meanwhile the wall fades in with its camera pulled back and drifting, nothing in focus, and lands on the first card once the copy is in — so nothing on the page jumps. The changing word in the headline replays that same blur each time it turns. Under prefers-reduced-motion everything is simply there, and both the headline word and the name in the command cut instead of moving.

### Built on Image Wall

The wall, its camera and its flights are the Image Wall component; this hero passes the wall props straight through and only decides where the walls sit — centred, one on each half fading under the copy with the cameras anchored high and low; split, the right 56–58% on desktop. Below `lg` they become bands around the copy.

### The tools, in batches

Pass a [Tech Stack](https://avaraui.com/docs/reactjs/tech-stack) as `stack`. Group what you build with — a front-end batch, a data batch, a tooling batch — and the strip shows one group at a time — closing the centred copy column, or over a blurred, fading stretch of the wall beside it — so the marks read without competing with the cards.

### Your theme, your fonts

Background, text, the primary button and the stars all read theme tokens, so a palette change reaches every part. The headline uses `font-serif` and the command `font-mono` — set those in your Tailwind theme and the hero follows.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `badge` | `&#123; label: string; href?: string &#125;` | — | The small link above the headline. |
| `heading` | `string` | — | The headline, revealed word by word. `&#123;word&#125;` is where `headingWords` take turns. Optional when `layout="fullscreen"`. |
| `headingWords` | `string[]` | — | Words that take turns at `&#123;word&#125;`, each blurring in like the headline did. |
| `wordInterval` | `number` | `2400` | Milliseconds each heading word stays. |
| `accent` | `string` | — | A word of the headline set in the primary colour. |
| `description` | `ReactNode` | — | The lead under it — a string, or inline JSX (it renders inside a `<p>`) to set a phrase apart. |
| `install` | `&#123; command: string &#125;` | — | The install line; `&#123;item&#125;` becomes the focused card's slug. Omit to drop the box. |
| `primaryAction`, `secondaryAction` | `&#123; label: string; href: string; icon?: ReactNode &#125;` | — | The primary button and the outlined one. |
| `trust` | `&#123; text: string; avatars?: &#123; src; alt? &#125;[]; rating?: number &#125;` | — | The trust line under the actions. |
| `items` | `&#123; title: string; image: string; slug?: string &#125;[]` | — | The cards on the wall, each in a 493:332 frame. `items`, `columns`, `order`, `interval`, `zoom`, `intro` and `onFocus` are passed straight to the [Image Wall](https://avaraui.com/docs/reactjs/image-wall). |
| `stack` | `ReactNode` | — | The tools — a [Tech Stack](https://avaraui.com/docs/reactjs/tech-stack), over the wall or closing the centred column (use `variant="compact"` there). Omit to drop the strip. |
| `columns` | `number` | `4` | Columns in one tile. |
| `order` | `"serial" \| "shuffle"` | `"serial"` | Card by card, or every card once per round in a random order. |
| `interval` | `number` | `4500` | Milliseconds the camera rests; `0` holds still. |
| `zoom` | `number` | `1.35` (`0.9` centred) | The camera's resting scale. |
| `intro` | `number` | `1800` | Milliseconds the camera drifts with no card in focus while the copy arrives, before landing on the first card. `0` starts on it. |
| `onFocus` | `(index: number) => void` | — | Called when the camera settles on a card. |
| `layout` | `"split" \| "center" \| "center-background" \| "fullscreen" \| "wall-only"` | `"split"` | `"split"`: copy on the left and wall on the right; `"center"`: copy centred between two walls; `"center-background"`: walls in the background across all screens; `"fullscreen"` (or `"wall-only"`): renders a single continuous edge-to-edge wall across the entire screen with all cards included and no copy. |
| `showMobileWall` | `boolean` | `true` | Whether to show the background image animations on mobile and small screens (&lt;lg). When `false`, the wall animations are completely hidden on small screens across all variants (`center`, `split`, and `center-background`), leaving only the clean content copy and tools on phones while retaining full interactive animations on desktop. |
| `mobileBackground` | `boolean` | `true` | Alias for `showMobileWall`. Set to `false` to disable the background image animation on small screens across all variants. |
| `persistentBackground` | `boolean` | `false` | When true (or with `layout="center-background"`), the animated screenshot walls remain in the background layer behind the copy on small screens instead of dropping below the action buttons as a separate band. |
| `compactWall` | `boolean` | `true` | Centred layout only: whether that band shows below `lg`. Deprecated in favor of `showMobileWall` which works across all layouts. |
| `linkComponent` | `ElementType` | `"a"` | What renders every link; pass `next/link` in Next.js. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/component-wall
