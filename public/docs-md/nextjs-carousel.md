---
title: "Shadcn Carousel"
description: "A collection of highly interactive carousel components for image galleries, hero sections, and fluid presentations. Shadcn/ui with GSAP and Motion builds."
url: https://avaraui.com/docs/nextjs/carousel
---

# Shadcn Carousel

A collection of highly interactive carousel components for image galleries, hero sections, and fluid presentations.

Five carousels live on this page: four in `carousel.tsx` (`ImageCarousel`, `HeroCarousel`, `CustomCarousel`, `RadialCarousel`) plus the `FluidGlassSlider`, and the `ThreeDCarousel` fan, which installs on its own as `carousel-3d`.

## For AI agents

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

## Carousels

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

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/carousel.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/carousel
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

## 3D Carousel

A fanned 3D deck with drag gestures, keyboard arrows, circular endless fanning and an autoplay timer that pauses on hover.

Drag the center card left or right, use the arrow keys, or click a fanned neighbour to bring it forward.

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

### Installation

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

## Features
Discover the Carousel's powerful features, including touch-swipe support, autoplay functionality, and accessible navigation controls.

Easily adapt the component's styling and behavior to fit your application's unique design system.

Built with accessibility in mind, ensuring all users can interact with your application effectively.

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

### Unified Carousel (Default Export)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"radial" \| "glass" \| "image" \| "hero" \| "thumbnails"` | `"image"` | The layout variant to render. |
| `images` | `ImgSrc[]` | `[]` | Array of image URLs or StaticImageData objects (for `"image"` variant). |
| `slides` | `any[]` | `[]` | Array of slide objects (for `"glass"` or `"hero"` variants). |
| `items` | `any[]` | `[]` | Array of item objects (for `"radial"` or `"thumbnails"` variants). |
| `className` | `string` | `-` | Custom CSS styling classes for the outer wrapper. |

### RadialCarousel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `RadialCarouselItem[]` | `[]` | Array of cards with `{ title, category, rating, price?, img }` radiating in 360 degrees. |
| `autoPlay` | `boolean` | `false` | If true, continuously rotates the 3D wheel. |
| `autoPlayInterval` | `number` | `3500` | Interval (in ms) between auto rotations. |
| `stepAngle` | `number` | `360 / items.length` | Rotation angle step per card in degrees. |
| `className` | `string` | `-` | Outer container styling. |

### FluidGlassSlider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `slides` | `FluidGlassSlide[]` | `DEFAULT_SLIDES` | Array of glass slides with `{ id, image, title, subtitle }`. |
| `className` | `string` | `-` | Container dimensions, borders, and shadows. |

### ImageCarousel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `images` | `ImgSrc[]` | `[]` | Array of string URLs or Next.js StaticImageData objects. |
| `autoPlay` | `boolean` | `false` | If true, automatically cycles through images. |
| `autoPlayInterval` | `number` | `3000` | Time (in ms) before automatically switching slides. |
| `showArrows` | `boolean` | `true` | Whether to show previous/next navigation buttons. |
| `showDots` | `boolean` | `true` | Whether to show bottom navigation dot indicators. |
| `transitionDuration` | `number` | `500` | Transition animation duration in milliseconds. |
| `imageWidth` | `number` | `1200` | Default image width in pixels. |
| `imageHeight` | `number` | `540` | Default image height in pixels. |

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
| `autoPlay` | `boolean` | `false` | If true, auto-advances through thumbnail items. |
| `autoPlayInterval` | `number` | `3000` | Time (in ms) between slide changes. |

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

---

Live previews and every example: https://avaraui.com/docs/nextjs/carousel
