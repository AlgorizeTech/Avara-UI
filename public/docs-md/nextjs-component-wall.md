---
title: "Shadcn Component Wall"
description: "Shadcn Component Wall. A landing hero for a component library: a headline that keeps one word changing."
url: https://avaraui.com/docs/nextjs/component-wall
---

# Shadcn Component Wall

A landing hero for a component library: the copy in the middle — headline, install command, actions and a line of trust — between two walls of screenshots that never end. Each wall has a camera that glides from card to card, and the install line always names the card a camera has just landed on, so the hero shows something the reader can paste into a terminal.

The walls are [Image Walls](https://avaraui.com/docs/nextjs/image-wall), the headline a [Text Animation](https://avaraui.com/docs/nextjs/text-animation), the copy control a [Copy Button](https://avaraui.com/docs/nextjs/copy-button), the faces an [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack), the stars [Half Stars](https://avaraui.com/docs/nextjs/half-stars) and the tools a [Tech Stack](https://avaraui.com/docs/nextjs/tech-stack), passed in as `stack`.

## For AI agents

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/component-wall

**When to use it.** A landing hero for a library or product: a wall of screenshot cards that a camera glides across, with an install command that follows the card it lands on. Two layouts.

**When to use something else:**

- [Portfolio Showcase](https://avaraui.com/docs/nextjs/portfolio-showcase): for an edge-to-edge draggable wall with no copy over it, where the wall itself is the content.

**Gotchas:**

- Both are layouts of the one `component-wall` item: install it once and set `layout` from the index.
- Showing or hiding the wall on phones is a prop (`showMobileWall`), not a separate design.

### The 2 variants

1. **Centred copy between two walls** (`center`): The copy sits in the middle with a wall of cards on each side; two cameras take turns gliding to a card.
   - Live: https://avaraui.com/view/component-wall/center
   - Best for: a library or product launch hero that wants the copy centred and the product shown on both sides
   - Avoid if: you want the copy on one side only
   - Traits: two walls, auto-sliding cameras, install line follows the card, uses the `component-wall` item
   - Install: `npx shadcn@latest add @avara-ui/component-wall`
   - Set these props: `{"layout":"center"}`
   - Docs: https://avaraui.com/docs/nextjs/component-wall#build-interactive-interfaces
2. **Copy beside one wall** (`split`): The copy on the left and a single wall filling the right, fading in under the copy.
   - Live: https://avaraui.com/view/component-wall/split
   - Best for: a conventional two-column hero with the wall as the visual
   - Avoid if: you want the copy centred
   - Traits: one wall, one camera, wall becomes a band under the copy on small screens, uses the `component-wall` item
   - Install: `npx shadcn@latest add @avara-ui/component-wall`
   - Set these props: `{"layout":"split"}`
   - Docs: https://avaraui.com/docs/nextjs/component-wall#copy-beside-the-wall

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

## Build interactive interfaces

The copy in the middle, a wall on each side. Wait a few seconds: each camera glides to a new card in turn, and the install line changes to name it.

- `layout="center"` centres the copy between two walls. The default, `"split"`, puts it beside one wall — see More Examples.
- `install` is the command in the box. Write `{item}` where the card's name goes — `"npx shadcn@latest add @avara-ui/{item}"` — and it fills in with the card a camera has just landed on.
- `heading` is revealed word by word. Write `{word}` where `headingWords` take turns, and name one word in `accent` to colour it.

```tsx
"use client";

import Link from "next/link";
import { ComponentWall, type ComponentWallItem } from "@/components/custom/blocks/ComponentWallBlock";
import { TechStack, TechStackGroup, TechStackTool } from "@/components/custom/blocks/TechStackBlock";
import { GitHubIcon, ReactIcon, NextjsIcon, TypeScriptIcon, TailwindIcon, MotionIcon, GsapIcon, LucideIcon } from "@/components/custom/blocks/Icons";

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
      interval={true}
      intervalTime={5500}
      draggable={false}
      highlightFocus={true}
      linkComponent={Link}
    />
  );
}
```

## More Examples

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

### Centred with persistent background

The same centred layout, with the walls kept behind the copy on small screens instead of dropping below the buttons.

- `persistentBackground=true` keeps the walls behind the content on small screens.
- `mobileZoom=0.30` scales the background cards down on phones so they stay unobtrusive.
- `interval=false` holds both cameras still; the walls can still be dragged.

```tsx
"use client";

import Link from "next/link";
import { ComponentWall, type ComponentWallItem } from "@/components/custom/blocks/ComponentWallBlock";
import { TechStack, TechStackGroup, TechStackTool } from "@/components/custom/blocks/TechStackBlock";
import { GitHubIcon, ReactIcon, NextjsIcon, TypeScriptIcon, TailwindIcon, MotionIcon, GsapIcon, LucideIcon } from "@/components/custom/blocks/Icons";

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
      interval={false}
      draggable={true}
      highlightFocus={true}
      linkComponent={Link}
    />
  );
}
```

### Clean mobile view (no background animation)

The centred hero with the walls hidden below `lg`, so phones stay clean while desktop keeps both walls moving.

- `showMobileWall=false` hides the walls on small screens, in every layout. `mobileBackground={false}` does the same.

```tsx
"use client";

import Link from "next/link";
import { ComponentWall, type ComponentWallItem } from "@/components/custom/blocks/ComponentWallBlock";
import { TechStack, TechStackGroup, TechStackTool } from "@/components/custom/blocks/TechStackBlock";
import { GitHubIcon, ReactIcon, NextjsIcon, TypeScriptIcon, TailwindIcon, MotionIcon, GsapIcon, LucideIcon } from "@/components/custom/blocks/Icons";

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
      interval={true}
      intervalTime={5500}
      draggable={true}
      highlightFocus={true}
      linkComponent={Link}
    />
  );
}
```

### Clean mobile view with single full-width background wall

One full-width wall behind the centred copy, instead of a wall on each side.

- `singleBackground=true` draws one wall across the whole hero and gives it every card. `singleWall` is an alias.

```tsx
"use client";

import Link from "next/link";
import { ComponentWall, type ComponentWallItem } from "@/components/custom/blocks/ComponentWallBlock";
import { TechStack, TechStackGroup, TechStackTool } from "@/components/custom/blocks/TechStackBlock";
import { GitHubIcon, ReactIcon, NextjsIcon, TypeScriptIcon, TailwindIcon, MotionIcon, GsapIcon, LucideIcon } from "@/components/custom/blocks/Icons";

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

// Renders a single continuous full-width background wall animation across the hero
// instead of splitting into two separate walls on the left and right.
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
      singleBackground
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
      interval={true}
      intervalTime={5500}
      draggable={true}
      highlightFocus={true}
      linkComponent={Link}
    />
  );
}
```

### Copy beside the wall

The copy on the left, one wall filling the right. With one camera, the install line follows it card by card.

- `layout="split"` is the default. Below `lg` the wall becomes a band under the copy.
- `stack` sits over the lower edge of the wall on desktop and under the band on smaller screens.

```tsx
"use client";

import Link from "next/link";
import { ComponentWall, type ComponentWallItem } from "@/components/custom/blocks/ComponentWallBlock";
import { TechStack, TechStackGroup, TechStackTool } from "@/components/custom/blocks/TechStackBlock";
import { GitHubIcon, ReactIcon, NextjsIcon, TypeScriptIcon, TailwindIcon, MotionIcon, GsapIcon, LucideIcon } from "@/components/custom/blocks/Icons";

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
      interval={true}
      intervalTime={5500}
      draggable={false}
      highlightFocus={true}
      linkComponent={Link}
    />
  );
}
```

## Features

The wall reports the card it has settled on; the hero puts that card's slug into the command and slides the old name out. Whatever the reader is looking at, the line beside it is the way to get it.

The headline blurs in word by word; then the lead, the command, the actions and the trust line rise once, each a beat after the last. Meanwhile the wall fades in with its camera pulled back and drifting, nothing in focus, and lands on the first card once the copy is in — so nothing on the page jumps. The changing word in the headline replays that same blur each time it turns. Under prefers-reduced-motion everything is simply there, and both the headline word and the name in the command cut instead of moving.

The wall, its camera and its flights are the Image Wall component; this hero passes the wall props straight through and only decides where the walls sit — centred, one on each half fading under the copy with the cameras anchored high and low; split, the right 56–58% on desktop. Below `lg` they become bands around the copy.

Pass a [Tech Stack](https://avaraui.com/docs/nextjs/tech-stack) as `stack`. Group what you build with — a front-end batch, a data batch, a tooling batch — and the strip shows one group at a time — closing the centred copy column, or over a blurred, fading stretch of the wall beside it — so the marks read without competing with the cards.

Background, text, the primary button and the stars all read theme tokens, so a palette change reaches every part. The headline uses `font-serif` and the command `font-mono` — set those in your Tailwind theme and the hero follows.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `badge` | `&#123; label: string; href?: string &#125;` | — | The small link above the headline. |
| `heading` | `string` | — | The headline, revealed word by word. `&#123;word&#125;` is where `headingWords` take turns. |
| `headingWords` | `string[]` | — | Words that take turns at `&#123;word&#125;`, each blurring in like the headline did. |
| `wordInterval` | `number` | `2400` | Milliseconds each heading word stays. |
| `accent` | `string` | — | A word of the headline set in the primary colour. |
| `description` | `ReactNode` | — | The lead under it — a string, or inline JSX (it renders inside a `<p>`) to set a phrase apart. |
| `install` | `&#123; command: string &#125;` | — | The install line; `&#123;item&#125;` becomes the focused card's slug. Omit to drop the box. |
| `primaryAction`, `secondaryAction` | `&#123; label: string; href: string; icon?: ReactNode &#125;` | — | The primary button and the outlined one. |
| `trust` | `&#123; text: string; avatars?: &#123; src; alt? &#125;[]; rating?: number &#125;` | — | The trust line under the actions. |
| `items` | `&#123; title: string; image: string; slug?: string &#125;[]` | — | The cards on the wall, each in a 493:332 frame. `items`, `columns`, `order`, `interval`, `zoom`, `intro` and `onFocus` are passed straight to the [Image Wall](https://avaraui.com/docs/nextjs/image-wall). |
| `stack` | `ReactNode` | — | The tools — a [Tech Stack](https://avaraui.com/docs/nextjs/tech-stack), over the wall or closing the centred column (use `variant="compact"` there). Omit to drop the strip. |
| `columns` | `number` | `4` | Columns in one tile. |
| `order` | `"serial" \| "shuffle"` | `"serial"` | Card by card, or every card once per round in a random order. |
| `interval` | `number` | `4500` | Milliseconds the camera rests; `0` holds still. |
| `zoom` | `number` | `1.35` (`0.9` centred) | The camera's resting scale. |
| `intro` | `number` | `1800` | Milliseconds the camera drifts with no card in focus while the copy arrives, before landing on the first card. `0` starts on it. |
| `onFocus` | `(index: number) => void` | — | Called when the camera settles on a card. |
| `layout` | `"split" \| "center" \| "center-background"` | `"split"` | `"split"`: copy on the left and wall on the right; `"center"`: copy centred between two walls; `"center-background"`: walls in the background across all screens. |
| `showMobileWall` | `boolean` | `true` | Whether to show the background image animations on mobile and small screens (&lt;lg). When `false`, the wall animations are completely hidden on small screens across all variants (`center`, `split`, and `center-background`), leaving only the clean content copy and tools on phones while retaining full interactive animations on desktop. |
| `mobileBackground` | `boolean` | `true` | Alias for `showMobileWall`. Set to `false` to disable the background image animation on small screens across all variants. |
| `persistentBackground` | `boolean` | `false` | When true (or with `layout="center-background"`), the animated screenshot walls remain in the background layer behind the copy on small screens instead of dropping below the action buttons as a separate band. |
| `singleBackground` | `boolean` | `false` | Centred layout only: when `true`, renders one single continuous background wall across the entire hero instead of splitting into two separate walls on the left and right. Can also be written as `singleWall`. |
| `compactWall` | `boolean` | `true` | Centred layout only: whether that band shows below `lg`. Deprecated in favor of `showMobileWall` which works across all layouts. |
| `linkComponent` | `ElementType` | `"a"` | What renders every link; pass `next/link` in Next.js. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/component-wall
