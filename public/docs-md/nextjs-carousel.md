---
title: "Shadcn Carousel"
description: "Carousel components for image galleries, hero sections, product wheels and fluid presentations. Free shadcn/ui Carousel component with GSAP and Motion builds."
url: https://avaraui.com/docs/nextjs/carousel
---

# Shadcn Carousel

Carousel components for image galleries, hero sections, product wheels and fluid presentations.

Six carousels live on this page: five in `carousel.tsx` (`ImageCarousel`, `HeroCarousel`, `CustomCarousel`, `RadialCarousel` and `FluidGlassSlider`) and the `ThreeDCarousel` fan, which installs on its own as `carousel-3d`.

## Carousels

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/carousel.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/carousel
```

### Radial carousel

`RadialCarousel` arranges cards on a 360-degree 3D wheel around a central hub, with drag momentum. The hub plays or pauses autoplay.

- Pass `items` as `{ title, category, rating, img }[]` — cards radiate in 360 degrees around the center.
- `stepAngle` controls the rotation angle increment between cards (default is 360 / items.length).

```tsx
import { RadialCarousel, type RadialCarouselItem } from "@/components/custom/carousel";

const customItems: RadialCarouselItem[] = [
  {
    title: "Misty Pine Forest",
    category: "Nature",
    rating: "4.9",
    price: "$120",
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  },
  {
    title: "Lush River Valley",
    category: "Wilderness",
    rating: "4.8",
    price: "$150",
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  },
  {
    title: "Autumn Woodland Path",
    category: "Landscape",
    rating: "4.9",
    price: "$95",
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  },
];

export default function RadialCarouselDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-sm bg-foreground/5">
      <RadialCarousel
        items={customItems}
        autoPlay={true}
        autoPlayInterval={3500}
      />
    </div>
  );
}
```

All five carousels (`RadialCarousel`, `FluidGlassSlider`, `ImageCarousel`, `HeroCarousel`, `CustomCarousel`) ship together in a single self-contained `carousel.tsx` file when installing `carousel`. You can import components directly or pass `variant="radial" | "glass" | "image" | "hero" | "thumbnails"` into the default `Carousel` component.

### Fluid glass slider

`FluidGlassSlider` is a liquid glass distortion slider featuring dynamic cursor tracking, glassmorphism overlays, and smooth progress tracking.

- Pass `className` to customize container dimensions, borders, and shadows.

```tsx
import { FluidGlassSlider, type FluidGlassSlide } from "@/components/custom/carousel";

const customSlides: FluidGlassSlide[] = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_2574,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
    title: "Discover pristine tropical beaches and crystal-clear waters",
    subtitle: "TROPICAL PARADISE",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_2574,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    title: "Escape to the serene mountain heights and wilderness trails",
    subtitle: "MOUNTAIN ADVENTURES",
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_2574,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    title: "Surround yourself with majestic peaks and alpine lakes",
    subtitle: "ALPINE RETREAT",
  },
];

export default function FluidGlassSliderDemo() {
  return (
    <FluidGlassSlider
      slides={customSlides}
      className="w-full rounded-xl border border-border shadow-sm"
    />
  );
}
```

### Image carousel

`ImageCarousel` handles arrows, dots, swipe and autoplay for you.

- Pass `images` as a flat array of URL strings or Next.js `StaticImageData` objects.
- `autoPlay` is off by default; on, it advances every `autoPlayInterval` ms (3000).
- `showArrows` and `showDots` are both on by default — set either to `false` to hide it.

```tsx
import { ImageCarousel } from "@/components/custom/carousel";

const sampleImages = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
];

export default function ImageCarouselDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-sm">
      <ImageCarousel
        images={sampleImages}
        autoPlay={true}
        autoPlayInterval={3000}
        showArrows={true}
        showDots={true}
      />
    </div>
  );
}
```

### Hero carousel

`HeroCarousel` overlays copy on a full-bleed image — click any image card to set it as the background.

- Pass `slides` as `{ img, title, des }[]` — `des` is the supporting line under the title.

```tsx
import { HeroCarousel, type HeroSlide } from "@/components/custom/carousel";

const sampleSlides: HeroSlide[] = [
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
    title: "Tropical Paradise",
    des: "Discover pristine beaches and crystal-clear waters.",
  },
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    title: "Peak Adventures",
    des: "Challenge yourself with epic mountain trails.",
  },
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    title: "Mountain Retreat",
    des: "Escape to the serene heights and breathe fresh air.",
  },
];

export default function HeroCarouselDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-sm">
      <HeroCarousel slides={sampleSlides} autoPlay={true} autoPlayInterval={3000} />
    </div>
  );
}
```

### Thumbnail rail

`CustomCarousel` adds a clickable thumbnail strip.

- `imageButtonPosition="bottom"` is the default — the rail sits under the main image.
- `items` is the slide array this variant reads, rather than `images`.

```tsx
import { CustomCarousel, type CustomItem } from "@/components/custom/carousel";

const sampleSlides: CustomItem[] = [
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
    title: "Tropical Paradise",
    des: "Discover pristine beaches and crystal-clear waters.",
  },
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    title: "Peak Adventures",
    des: "Challenge yourself with epic mountain trails.",
  },
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    title: "Mountain Retreat",
    des: "Escape to the serene heights and breathe fresh air.",
  },
];

export default function CustomCarouselDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-sm">
      <CustomCarousel items={sampleSlides} imageButtonPosition="bottom" autoPlay={true} />
    </div>
  );
}
```

### Side thumbnails

- Move the rail with `imageButtonPosition="left"` — or `"right"` — for a gallery-style layout.

```tsx
import { CustomCarousel, type CustomItem } from "@/components/custom/carousel";

const sampleSlides: CustomItem[] = [
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
    title: "Tropical Paradise",
    des: "Discover pristine beaches and crystal-clear waters.",
  },
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    title: "Peak Adventures",
    des: "Challenge yourself with epic mountain trails.",
  },
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    title: "Mountain Retreat",
    des: "Escape to the serene heights and breathe fresh air.",
  },
];

export default function SideThumbnailsCarouselDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-sm">
      <CustomCarousel items={sampleSlides} imageButtonPosition="left" autoPlay={true} />
    </div>
  );
}
```

## 3D Fanned Deck

A fanned 3D deck with drag gestures, keyboard arrows, circular endless fanning and an autoplay timer that pauses on hover.

Drag the center card left or right, use the arrow keys, or click a fanned neighbour to bring it forward.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/carousel-3d.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/carousel-3d
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add https://avaraui.com/r/carousel-3d-motion.json
```

### 3D carousel

- Pass `items` as an array of `{ id, category, title, image }` — `description` is optional and clamps to two lines.
- `autoPlay` is on by default and pauses on its own while the pointer is over the deck.

```tsx
import { ThreeDCarousel, type CarouselItem } from "@/components/custom/blocks/ThreeDCarouselBlock";

const items: CarouselItem[] = [
  {
    id: "c1",
    category: "Nature",
    title: "Misty Pine Forest",
    description:
      "Early morning fog weaving through dense evergreen woodland trees.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "c2",
    category: "Wilderness",
    title: "Lush River Valley",
    description:
      "Sunbeams streaming through valley clouds onto pristine forest waters.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  },
  {
    id: "c3",
    category: "Landscape",
    title: "Autumn Woodland Path",
    description:
      "Vibrant golden foliage covering quiet forest trails in peak autumn.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  },
  {
    id: "c4",
    category: "Sanctuary",
    title: "Cascading Mountain Falls",
    description:
      "Fresh mountain spring water cascading through untouched wilderness slopes.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
  {
    id: "c5",
    category: "Expedition",
    title: "Emerald Mountain Peak",
    description:
      "Panoramic views of majestic mountain ridges rising into crisp morning skies.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
];

export default function ThreeDCarouselDemo() {
  return <ThreeDCarousel items={items} autoPlay autoPlayInterval={4000} />;
}
```

### Shorter deck

- `items` also drives the fan — the circular offsets are derived from `items.length`, so a shorter array tightens the spread with no other change.

```tsx
import { ThreeDCarousel, type CarouselItem } from "@/components/custom/blocks/ThreeDCarouselBlock";

const items: CarouselItem[] = [
  {
    id: "c1",
    category: "Nature",
    title: "Misty Pine Forest",
    description:
      "Early morning fog weaving through dense evergreen woodland trees.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "c2",
    category: "Wilderness",
    title: "Lush River Valley",
    description:
      "Sunbeams streaming through valley clouds onto pristine forest waters.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  },
  {
    id: "c3",
    category: "Landscape",
    title: "Autumn Woodland Path",
    description:
      "Vibrant golden foliage covering quiet forest trails in peak autumn.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  },
  {
    id: "c4",
    category: "Sanctuary",
    title: "Cascading Mountain Falls",
    description:
      "Fresh mountain spring water cascading through untouched wilderness slopes.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
  {
    id: "c5",
    category: "Expedition",
    title: "Emerald Mountain Peak",
    description:
      "Panoramic views of majestic mountain ridges rising into crisp morning skies.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
];

export default function ShortDeckCarousel() {
  // The fan tightens automatically as the deck shrinks — the circular
  // offset is computed from `items.length`.
  return <ThreeDCarousel items={items.slice(0, 3)} autoPlay />;
}
```

### Without arrows or dots

- `showArrows={false}` drops the whole control bar: the previous / next buttons and the autoplay pause toggle.
- `showDots={false}` drops the pagination dots. Each flag works on its own, so you can keep either one.

```tsx
import { ThreeDCarousel, type CarouselItem } from "@/components/custom/blocks/ThreeDCarouselBlock";

const items: CarouselItem[] = [
  {
    id: "c1",
    category: "Nature",
    title: "Misty Pine Forest",
    description:
      "Early morning fog weaving through dense evergreen woodland trees.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "c2",
    category: "Wilderness",
    title: "Lush River Valley",
    description:
      "Sunbeams streaming through valley clouds onto pristine forest waters.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  },
  {
    id: "c3",
    category: "Landscape",
    title: "Autumn Woodland Path",
    description:
      "Vibrant golden foliage covering quiet forest trails in peak autumn.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  },
  {
    id: "c4",
    category: "Sanctuary",
    title: "Cascading Mountain Falls",
    description:
      "Fresh mountain spring water cascading through untouched wilderness slopes.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
  {
    id: "c5",
    category: "Expedition",
    title: "Emerald Mountain Peak",
    description:
      "Panoramic views of majestic mountain ridges rising into crisp morning skies.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
];

export default function MinimalControlsCarousel() {
  // Drag, the keyboard arrow keys and clicking a side card still navigate.
  return <ThreeDCarousel items={items} showArrows={false} showDots={false} />;
}
```

## About Shadcn Carousel

**What it is.** **Shadcn Carousel** bundles five interactive slider modes in `carousel.tsx` (`RadialCarousel`, `FluidGlassSlider`, `ImageCarousel`, `HeroCarousel`, and `CustomCarousel`) alongside the standalone `ThreeDCarousel` (`carousel-3d`) fanned deck.

**How it is built.** Use the default `Carousel` with a `variant` prop (`"image"` by default, then `"hero"`, `"thumbnails"`, `"radial"` or `"glass"`), or import a carousel by name. `carousel.tsx` is CSS and React state only and installs just `lucide-react`. `ThreeDCarousel` ships a GSAP build (`carousel-3d`, `gsap`) and a Motion build (`carousel-3d-motion`, `motion`). Nothing imports `next/*`; images render through a plain `img` unless you pass `imageComponent`.

**When to use it.** Use it for hero sliders, product image galleries with thumbnails, 360-degree radial wheels, and fanned 3D card decks. Reach for `ImageCarousel` when you only need images with arrows and dots.

## For AI agents

**When to use**

- Hero sliders, product image galleries with thumbnails
- 360-degree radial wheels, interactive fanned 3D card decks

**When not to use**

- A full-width curved 3D arc deck: use [Curved Carousel](https://avaraui.com/docs/nextjs/curved-carousel)
- A mixed media wall rather than a slider: use [Gallery](https://avaraui.com/docs/nextjs/gallery)

**Agent notes**

- Install `carousel` for `RadialCarousel`, `FluidGlassSlider`, `ImageCarousel`, `HeroCarousel`, and `CustomCarousel`, or `carousel-3d` for `ThreeDCarousel`.
- On `CustomCarousel`, set `imageButtonPosition` to `"bottom"`, `"left"`, or `"right"` and pass `items` (not `images`). Its autoplay is on by default, and the interval prop is `interval`, not `autoPlayInterval`.
- `ImageCarousel`, `HeroCarousel`, `CustomCarousel` and `RadialCarousel` take `imageComponent`; pass `next/image` there in Next.js. `StaticImageData` objects only work with it, and `HeroCarousel` and `CustomCarousel` paint the main image as a CSS background, so give them URL strings.
- `ImageCarousel` and `ThreeDCarousel` wrap around at the ends; `FluidGlassSlider` disables its buttons at the first and last slide.
- `FluidGlassSlider` autoplays every 5 seconds with no prop to change that, and always shows a "Fluid Glass" heading.
- `ThreeDCarousel` listens for the left and right arrow keys on the whole window, so avoid mounting two on one page.
- `ImageCarousel` and `HeroCarousel` size from their own default classes; override them with `rootClassName`, not `className`.

**Ask before you pick.** This page has 6 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 6 options as live previews: https://avaraui.com/view/carousel

**When to use it.** Image and content carousels. Five looks (radial wheel, fluid glass, image, hero, thumbnails) ship in one `carousel` item; a 3D coverflow deck is its own item.

**When to use something else:**

- [Curved carousel](https://avaraui.com/docs/nextjs/curved-carousel): for a full-width curved-arc deck with a sway or marquee motion.

**Gotchas:**

- The five looks share one `carousel` item: install it once and set `variant` (`radial`, `glass`, `image`, `hero` or `thumbnails`) from the index.
- The slide data differs by look: `items` for radial and thumbnails, `slides` for glass and hero, `images` for image.
- The 3D deck is a separate `carousel-3d` item with its own `ThreeDCarousel` API.

### The 6 variants

1. **Radial carousel** (`radial`): Cards on a 360-degree 3D wheel around a central hub, with drag momentum and an autoplay toggle.
   - Live: https://avaraui.com/view/carousel/radial
   - Best for: a featured-items showcase that should feel dimensional
   - Avoid if: you need a simple strip of images or a text-over-image banner
   - Traits: 360-degree wheel, drag momentum, hub play/pause
   - Install: `npx shadcn@latest add @avara-ui/carousel`
   - Set these props: `{"variant":"radial"}`
   - Docs: https://avaraui.com/docs/nextjs/carousel#radial-carousel
2. **3D carousel deck** (`three-d-deck`): A 3D coverflow deck of cards with arrows, dots, drag and keyboard navigation.
   - Live: https://avaraui.com/view/carousel/three-d-deck
   - Best for: a hero gallery of photos or cards with depth
   - Avoid if: you want a wheel around a hub or a flat strip
   - Traits: coverflow depth, arrows and dots, drag and keyboard
   - Install: `npx shadcn@latest add @avara-ui/carousel-3d`
   - Docs: https://avaraui.com/docs/nextjs/carousel#3d-carousel
3. **Fluid glass slider** (`glass`): A liquid-glass distortion slider with cursor tracking, glass overlays and progress tracking.
   - Live: https://avaraui.com/view/carousel/glass
   - Best for: a premium landing-page banner with big imagery
   - Avoid if: you want a plain, low-effect image rotator
   - Traits: liquid glass distortion, cursor tracking, progress bar
   - Install: `npx shadcn@latest add @avara-ui/carousel`
   - Set these props: `{"variant":"glass"}`
   - Docs: https://avaraui.com/docs/nextjs/carousel#fluid-glass-slider
4. **Image carousel** (`image`): A straightforward image carousel with arrows, dots, swipe and autoplay built in.
   - Live: https://avaraui.com/view/carousel/image
   - Best for: a product or photo gallery that should just work
   - Avoid if: you want copy over the image or a thumbnail rail
   - Traits: arrows and dots, swipe, autoplay
   - Install: `npx shadcn@latest add @avara-ui/carousel`
   - Set these props: `{"variant":"image"}`
   - Docs: https://avaraui.com/docs/nextjs/carousel#image-carousel
5. **Hero carousel** (`hero`): Copy overlaid on a full-bleed image; click an image card to make it the background.
   - Live: https://avaraui.com/view/carousel/hero
   - Best for: a landing-page hero with headline copy per slide
   - Avoid if: you only have images with no text
   - Traits: full-bleed background, copy overlay, clickable cards
   - Install: `npx shadcn@latest add @avara-ui/carousel`
   - Set these props: `{"variant":"hero"}`
   - Docs: https://avaraui.com/docs/nextjs/carousel#hero-carousel
6. **Thumbnail rail** (`thumbnails`): A main slide with a clickable thumbnail strip, at the bottom or on the left.
   - Live: https://avaraui.com/view/carousel/thumbnails
   - Best for: a gallery where the visitor jumps to a specific slide
   - Avoid if: you want a minimal strip with no extra chrome
   - Traits: thumbnail strip, bottom or left placement
   - Install: `npx shadcn@latest add @avara-ui/carousel`
   - Set these props: `{"variant":"thumbnails"}`
   - Docs: https://avaraui.com/docs/nextjs/carousel#thumbnail-rail

## Props Reference

### Unified Carousel (Default Export)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"image" \| "hero" \| "thumbnails" \| "radial" \| "glass" \| "fluid"` | `"image"` | The layout variant to render. `"fluid"` is an alias for `"glass"`. Each variant takes the props of the carousel below it. |
| `images` | `ImgSrc[]` | `[]` | Array of image URLs or StaticImageData objects (for `"image"` variant). |
| `slides` | `HeroSlide[] \| FluidGlassSlide[]` | `[]` | Array of slide objects (for `"hero"` or `"glass"` variants). |
| `items` | `RadialCarouselItem[] \| CustomItem[]` | `[]` | Array of item objects (for `"radial"` or `"thumbnails"` variants). |
| `className` | `string` | `-` | Classes for the outer wrapper on the `"image"`, `"radial"` and `"glass"` variants. On `"image"` it replaces the default root classes, height included. The `"hero"` and `"thumbnails"` variants ignore it. |

### RadialCarousel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `RadialCarouselItem[]` | Built-in sample cards | Array of cards with `{ title, img, category?, rating?, price?, des? }` radiating in 360 degrees. Fewer than 10 items are repeated to fill the wheel. |
| `autoPlay` | `boolean` | `false` | If true, the wheel starts rotating. The hub button then pauses and resumes it. |
| `autoPlayInterval` | `number` | `3500` | Interval (in ms) between auto rotations. |
| `stepAngle` | `number` | `360 / cards shown` | Rotation angle step per card in degrees. The default divides the circle by the number of cards on the wheel, after short lists are repeated. |
| `showArrows` | `boolean` | `false` | Shows previous and next buttons. |
| `showDots` | `boolean` | `false` | Shows pagination dots. |
| `imageComponent` | `React.ElementType` | `"img"` | Element used for card images. Pass `Image` from `next/image` in Next.js. |
| `className` | `string` | `-` | Outer container styling. |

### FluidGlassSlider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `slides` | `FluidGlassSlide[]` | Three built-in slides | Array of glass slides with `{ id, image, title, subtitle }`, where `id` is a number and `image` a URL string. Autoplay advances every 5 seconds and cannot be changed. |
| `className` | `string` | `-` | Container dimensions, borders, and shadows. |

### ImageCarousel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `images` | `ImgSrc[]` | `[]` | Array of string URLs, or Next.js StaticImageData objects when `imageComponent` is `Image` from `next/image`. |
| `autoPlay` | `boolean` | `false` | If true, automatically cycles through images. |
| `autoPlayInterval` | `number` | `3000` | Time (in ms) before automatically switching slides. |
| `showArrows` | `boolean` | `true` | Whether to show previous/next navigation buttons. |
| `showDots` | `boolean` | `true` | Whether to show bottom navigation dot indicators. |
| `transitionDuration` | `number` | `500` | Transition animation duration in milliseconds. |
| `imageWidth` | `number` | `1200` | Default image width in pixels. |
| `imageHeight` | `number` | `540` | Default image height in pixels. |
| `imageComponent` | `React.ElementType` | `"img"` | Element used for the slides. Pass `Image` from `next/image` in Next.js to keep image optimisation. |

### HeroCarousel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `slides` | `HeroSlide[]` | `[]` | Array of full-bleed hero slides with `{ img, title, des }`. |
| `autoPlay` | `boolean` | `false` | If true, auto-advances the background hero slides. |
| `autoPlayInterval` | `number` | `3000` | Time (in ms) before advancing to the next hero slide. |

### CustomCarousel (Thumbnails)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `CustomItem[]` | `[]` | Array of thumbnail slides with `{ img, title, des }`. |
| `imageButtonPosition` | `"bottom" \| "left" \| "right"` | `"bottom"` | Placement of the thumbnail selector strip. |
| `autoPlay` | `boolean` | `true` | Auto-advances through the items. Set to `false` to turn it off. |
| `interval` | `number` | `5000` | Time (in ms) between slide changes. |

### ThreeDCarousel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `CarouselItem[]` | Required | An array of data objects defining each slide's category, title, description, and image URL. |
| `autoPlay` | `boolean` | `true` | Enables or disables automatic slide advancement. Automatically pauses when a user hovers over the carousel. |
| `autoPlayInterval` | `number` | `4000` | The time duration in milliseconds between automatic slide transitions. |
| `showArrows` | `boolean` | `true` | Shows the control bar: the previous / next slide buttons and the autoplay pause toggle. Drag, keyboard arrows and clicking a side card keep working when this is `false`, and autoplay still pauses on hover. |
| `showDots` | `boolean` | `true` | Shows the pagination dots under the deck, which mark the active slide and jump to a slide on click. |
| `className` | `string` | `undefined` | Custom Tailwind CSS classes to apply to the outermost responsive flex container. |

### CarouselItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | Required | A unique identifier string required for safe React list rendering and for tracking each card as the fan turns. |
| `title` | `string` | Required | Primary headline text displayed prominently on the card overlay. |
| `category` | `string` | Required | A short descriptive pill/badge label rendered above the title (e.g., "Architecture", "Design"). |
| `image` | `string` | Required | The URL to the high-resolution background image for the card. |
| `description` | `string` | `undefined` | Optional supporting paragraph text displayed below the headline. Automatically clamped to 2 lines. |

## Works with other components

- Combine `Carousel` with [Curved Carousel](https://avaraui.com/docs/nextjs/curved-carousel) for oscillating 3D arcs, [Squircle Carousel](https://avaraui.com/docs/nextjs/squircle-carousel) for masked tile grids, and [Gallery](https://avaraui.com/docs/nextjs/gallery) for multi-mode 3D media showcases.

## Should I install `carousel` or `carousel-3d`?

Install `carousel` for `RadialCarousel`, `FluidGlassSlider`, `ImageCarousel`, `HeroCarousel`, and `CustomCarousel`; it needs only `lucide-react`. Install `carousel-3d` for the fanned `ThreeDCarousel` deck, which adds `gsap`. `carousel-3d-motion` is the same deck on `motion`; add one build, not both.

## How do I position the thumbnail strip on `CustomCarousel`?

Set `imageButtonPosition` to `"bottom"` (the default), `"left"` or `"right"`, and pass your slides through `items` rather than `images`. Each item is `{ img, title, des }`. The carousel autoplays every 5 seconds by default; change that with `interval`, or pass `autoPlay={false}`.

## How do I use next/image with ImageCarousel?

Pass `imageComponent={Image}` with `Image` from `next/image`. Without it, `ImageCarousel` renders a plain `img`, so the file also runs in Vite. `StaticImageData` imports only work with `imageComponent`. `HeroCarousel` and `CustomCarousel` use their image as a CSS background, so give them URL strings.

## Which carousels autoplay by default?

`CustomCarousel` (5000 ms `interval`), `ThreeDCarousel` (`autoPlay`, 4000 ms) and `FluidGlassSlider` (fixed 5000 ms) start playing. `ImageCarousel` (3000 ms), `HeroCarousel` (3000 ms) and `RadialCarousel` (3500 ms) stay still until you set `autoPlay`. `ThreeDCarousel` pauses while the pointer is over it.

## How do the ThreeDCarousel drag and keyboard controls work?

Drag the centre card more than 50px to move one slide, click a side card to bring it forward, or press the left and right arrow keys. The keys are caught on the whole window, not only when the deck is focused. Arrows, pause button and dots are labelled; `showArrows` and `showDots` hide them.

## Are the carousels accessible?

`RadialCarousel` is a `region` with `aria-roledescription="carousel"`, a screen-reader-only title announced while autoplay is paused, and a labelled Play and Pause hub button. Its card transitions switch off under `motion-reduce`. `ImageCarousel` dots are labelled "Go to slide N", but its arrows have no text unless you pass `prevIcon` and `nextIcon` that carry it.

---

Live previews and every example: https://avaraui.com/docs/nextjs/carousel
