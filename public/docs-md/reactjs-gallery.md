---
title: "Shadcn Gallery"
description: "Shadcn Gallery. Six interactive gallery layouts: a 3D photo orbit ring, a 3D video sphere, a self-rearranging bento grid, a reel dial."
url: https://avaraui.com/docs/nextjs/gallery
---

# Shadcn Gallery

A dynamic visual showcase featuring six interactive variants: a revolving 3D circular photo orbit ring, an interactive 3D video sphere gallery, a GSAP Flip self-rearranging moving bento grid, an interactive circular reel dial spinner, a 3D layered pill carousel, and a Framer-inspired 3D curved arc carousel gallery.

## For AI agents

**Ask before you pick.** This page has 6 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 6 options as live previews: https://avaraui.com/view/gallery

**When to use it.** A visual showcase in six interactive layouts: a 3D photo orbit, a self-rearranging bento grid, a circular reel dial, a layered pill carousel, a curved arc carousel and a 3D video sphere.

**When to use something else:**

- [Image Viewer](https://avaraui.com/docs/reactjs/image-viewer): for one image at a time with zoom, a slider or a thumbnail strip rather than a showcase.

**Gotchas:**

- All six are looks of the one `gallery` item: install it once and set `variant` from the index.
- Each look takes its own item shape: the bento `{ id, title, description, image }`, the reel `{ id, name, category, description, image }`, the pill carousel `{ id, image, tooltipText, link }`, the arc carousel `{ id, image, title, subtitle, link }` and the sphere `{ id, type, src, poster, title, description, link }`.

### The 6 variants

1. **Orbit gallery** (`orbit-gallery`): Photo cards revolve on a 3D circular ring; one full revolution takes `duration` seconds.
   - Live: https://avaraui.com/view/gallery/orbit-gallery
   - Best for: a travel, nature or portfolio photo showcase with a hero moment
   - Avoid if: you have only a few photos, since the ring spaces the cards evenly around
   - Traits: 3D ring, any number of cards, accent colour or theme, default look
   - Install: `npx shadcn@latest add @avara-ui/gallery`
   - Set these props: `{"variant":"orbit-gallery"}`
   - Docs: https://avaraui.com/docs/nextjs/gallery#orbit-gallery
2. **Circular reel** (`circular-reel`): A scroll-driven circular dial of segmented items that idles in rotation and spins with the wheel or touch.
   - Live: https://avaraui.com/view/gallery/circular-reel
   - Best for: a set of named items with a category and description, such as projects or services
   - Avoid if: you want visitors to browse by clicking through rather than spinning
   - Traits: circular dial, wheel and touch scroll, idle rotation, name, category and description per item
   - Install: `npx shadcn@latest add @avara-ui/gallery`
   - Set these props: `{"variant":"circular-reel"}`
   - Docs: https://avaraui.com/docs/nextjs/gallery#circular-reel
3. **Video sphere** (`video-sphere`): Cards of images or video spread over a drifting 3D sphere; far cards blur, and a click can open a video modal.
   - Live: https://avaraui.com/view/gallery/video-sphere
   - Best for: a showcase that mixes images and video clips
   - Avoid if: you have few items, since a sphere needs many cards to look full
   - Traits: 3D sphere, images or videos, depth blur, optional video modal
   - Install: `npx shadcn@latest add @avara-ui/gallery`
   - Set these props: `{"variant":"video-sphere"}`
   - Docs: https://avaraui.com/docs/nextjs/gallery#video-sphere-gallery
4. **Moving bento** (`moving-bento`): A bento grid that swaps its cards' positions on a timer with a GSAP Flip animation.
   - Live: https://avaraui.com/view/gallery/moving-bento
   - Best for: a feature or project grid that should feel alive
   - Avoid if: you want a static grid or one that visitors control
   - Traits: bento grid, automatic position swaps, title and description per card
   - Install: `npx shadcn@latest add @avara-ui/gallery`
   - Set these props: `{"variant":"moving-bento"}`
   - Docs: https://avaraui.com/docs/nextjs/gallery#moving-bento
5. **3D pill carousel** (`pill-carousel`): Layered pill-shaped cards in 3D; they slide automatically and a click focuses one, ringed in your accent colour.
   - Live: https://avaraui.com/view/gallery/pill-carousel
   - Best for: a compact image carousel with a tooltip and link per card
   - Avoid if: you need captions beyond a short tooltip
   - Traits: layered 3D pills, auto slide or click-to-focus, tooltip and link per card
   - Install: `npx shadcn@latest add @avara-ui/gallery`
   - Set these props: `{"variant":"pill-carousel"}`
   - Docs: https://avaraui.com/docs/nextjs/gallery#3d-pill-carousel
6. **Arc carousel** (`arc-carousel`): Cards on a 3D curved arc that drifts on its own and can be dragged and spun with momentum.
   - Live: https://avaraui.com/view/gallery/arc-carousel
   - Best for: a product, collection or project row with a title and subtitle per card
   - Avoid if: it must stay still, or you want a plain grid
   - Traits: curved arc from concave to convex, drag with momentum, auto-drift (can be turned off), title, subtitle and link per card
   - Install: `npx shadcn@latest add @avara-ui/gallery`
   - Set these props: `{"variant":"arc-carousel"}`
   - Docs: https://avaraui.com/docs/nextjs/gallery#arc-carousel-gallery

## Orbit Gallery

Revolving 3D circular photo orbit ring with upright cards and smooth hover pause.

- `variant="orbit-gallery"` is the revolving 3D circular photo orbit ring layout (default).
- `images` are the cards on the ring, in orbit order. Any count works — each is offset by a share of `duration`, so they stay evenly spaced.
- `duration=36` is the seconds for one full revolution.
- `color` is the accent — a preset (indigo, rose, emerald, zinc) or any CSS colour — and is nudged for contrast on light and dark surfaces. Left unset it follows your theme.

```tsx
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

export default function OrbitGalleryExample() {
  return (
    <Gallery
      variant="orbit-gallery"
      images={IMAGES}
      duration={36}
    />
  );
}
```

## Moving Bento

Self-rearranging image bento grid with a dominant center hero slot. Peripheral items rotate into focus via GSAP Flip animations. Hovering holds the items still; clicking any peripheral item instantly brings it to the hero slot.

- `variant="moving-bento"` switches from the circular orbit to the GSAP Flip moving bento grid layout.
- `swapInterval=3000` is the milliseconds between automatic position swaps.
- `gap=12` is the spacing in pixels between bento items.
- `items` is an array of cards ({ id, title, description, image }) to populate the grid.

```tsx
const BENTO_ITEMS = [
  {
    id: "alpine-horizons",
    title: "Alpine Horizons",
    description: "Granite monoliths rising above early morning valley fog",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
  {
    id: "emerald-canopy",
    title: "Emerald Canopy",
    description: "Sunlit trails winding through ancient coastal redwood forests",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  },
  {
    id: "whispering-peaks",
    title: "Whispering Peaks",
    description: "Layers of mountain silhouettes veiled in twilight atmospheric mist",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "sunbeam-sanctuary",
    title: "Sunbeam Sanctuary",
    description: "Golden rays breaking through tall evergreens after summer rain",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  },
  {
    id: "verdant-valleys",
    title: "Verdant Valleys",
    description: "Rolling emerald highlands sweeping toward dramatic skies",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
  },
  {
    id: "glacial-waters",
    title: "Glacial Reflections",
    description: "Mirror-still alpine lake echoing snow-dusted jagged ridge lines",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
  },
  {
    id: "untamed-wilds",
    title: "Untamed Wilds",
    description: "Untouched wilderness under vibrant open skies",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
  {
    id: "golden-ridge",
    title: "Golden Ridge",
    description: "Late sunset warmth illuminating steep rocky summits",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  },
];

export default function MovingBentoExample() {
  return (
    <Gallery
      variant="moving-bento"
      items={BENTO_ITEMS}
      swapInterval={3000}
      gap={12}
    />
  );
}
```

## Circular Reel

Interactive, scroll-driven circular spinner. Each item lives on a segmented ring that responds to scroll or idles with smooth passive rotation. Features an active full-bleed background preview and center HUD.

- `variant="circular-reel"` switches to the Framer-inspired interactive scroll-driven circular dial spinner.
- `idleRotationSpeed=5` is the degrees per second of passive idle rotation.
- `scrollSensitivity=0.06` is the multiplier for mouse wheel and touch scroll interactions.
- `ringThickness=37` is the percentage thickness of the segmented ring (10 to 60).
- `reelItems` is an array of items ({ id, name, category, description, image }) to populate the reel.

```tsx
const REEL_ITEMS = [
  {
    id: "reel-1",
    name: "Velvet Horizon",
    category: "Yosemite Valley",
    description: "Granite peaks glowing in the golden twilight above misty valley floor",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
  {
    id: "reel-2",
    name: "Glass Relay",
    category: "Redwood Trail",
    description: "Ancient sequoias towering through filtered coastal morning rays",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  },
  {
    id: "reel-3",
    name: "Noir Mist",
    category: "Mountain Peaks",
    description: "Monochrome layered ridges dissolving into distant cloud banks",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "reel-4",
    name: "Driftline Rays",
    category: "Canopy Light",
    description: "Luminescent beams descending through mossy pine canopies",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  },
  {
    id: "reel-5",
    name: "Pulse Emerald",
    category: "Verdant Highlands",
    description: "Vibrant rolling green bluffs descending toward serene shoreline",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
  },
  {
    id: "reel-6",
    name: "Cold Meridian",
    category: "Alpine Lake",
    description: "Crystalline glacial waters reflecting jagged snow-capped crests",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
  },
  {
    id: "reel-7",
    name: "Astra Wilds",
    category: "Open Range",
    description: "Solitary wanderer contemplating vast expanses of pristine tundra",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
  {
    id: "reel-8",
    name: "Mono Summit",
    category: "Golden Ridge",
    description: "Sharp stone pinnacles bathed in amber warmth at sunrise",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  },
  {
    id: "reel-9",
    name: "Lumen Cascade",
    category: "Forest Waterfall",
    description: "Rushing mountain falls carving through lush temperate rainforest",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158813/photo-1433086966358-54859d0ed716-1790158812209.jpg",
  },
  {
    id: "reel-10",
    name: "Shadow Bloom",
    category: "Alpine Crest",
    description: "Majestic European peaks framed by drifting atmospheric shadows",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
  },
];

export default function CircularReelExample() {
  return (
    <Gallery
      variant="circular-reel"
      reelItems={REEL_ITEMS}
      idleRotationSpeed={5}
      scrollSensitivity={0.06}
      ringThickness={37}
    />
  );
}
```

## 3D Pill Carousel

Layered diagonal image carousel with sculptural pill-shaped cards, smooth 3D depth transitions, click-to-focus, keyboard navigation, hover brightness/scale, and a floating theme-accent tooltip CTA above the active card.

- `variant="pill-carousel"` switches to the Framer-inspired 3D layered pill carousel.
- `autoSlide=true` enables automatic sliding while also supporting click-to-focus. Pass `false` (`autoSlide={false}`) to disable automatic sliding so cards change only when clicked.
- `cardBorderRadius=200` is the border radius in pixels for the pill-shaped cards.
- `activeBorderWidth=6` is the border width in pixels around the centered active pill card (coloured with your theme/accent colour).
- `autoPlayInterval=3000` is the interval in milliseconds between automatic slide advances when `autoSlide` is `true`.
- `pillItems` is an array of items ({ id, image, tooltipText, link }) to populate the 3D pill carousel.

```tsx
const PILL_ITEMS = [
  {
    id: "pill-1",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
      alt: "Daily Rituals",
    },
    tooltipText: "Daily Rituals",
    link: "",
  },
  {
    id: "pill-2",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
      alt: "Slow Living",
    },
    tooltipText: "Slow Living",
    link: "",
  },
  {
    id: "pill-3",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
      alt: "Explore",
    },
    tooltipText: "Explore",
    link: "",
  },
  {
    id: "pill-4",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
      alt: "Morning Flow",
    },
    tooltipText: "Morning Flow",
    link: "",
  },
  {
    id: "pill-5",
    image: {
      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
      alt: "Soft Focus",
    },
    tooltipText: "Soft Focus",
    link: "",
  },
];

export default function ThreeDPillCarouselExample() {
  return (
    <Gallery
      variant="pill-carousel"
      pillItems={PILL_ITEMS}
      autoSlide={true}
      cardBorderRadius={200}
      activeBorderWidth={6}
      transitionDuration={0.6}
      autoPlayInterval={3000}
    />
  );
}
```

## Arc Carousel Gallery

Curved 3D image carousel arranged along an interactive concave cylindrical arc. Cards flow seamlessly, drift with passive rotation, and spin with momentum physics on drag.

- `variant="arc-carousel"` switches to the Framer-inspired 3D curved arc carousel gallery.
- `curve=-200` controls the arc curvature from -300 to 300: negative for concave (wrapping away like inside a cylinder, default -200), 0 for flat, and positive for convex (curling toward you).
- `cardSize=220` is the width in pixels for each card on the arc.
- `perspective=1200` is the 3D perspective depth in pixels.
- `autoScrollSpeed=0.22` is the auto-drift speed in cards per second.
- `autoSlide=true` enables continuous auto-scroll. Set to `false` to disable auto-scrolling and rely on drag-and-spin navigation.
- `dragSpeed=1.2` is the pointer drag multiplier for spinning with momentum.
- `inertia=0.75` is the momentum inertia coefficient (0 to 1) for smooth gliding after release.
- `arcItems` is an array of items ({ id, image, title, subtitle, link }) to populate the arc carousel.

```tsx
const ARC_ITEMS = [
  {
    id: "arc-1",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
    title: "Velvet Horizon",
    subtitle: "Yosemite Valley",
  },
  {
    id: "arc-2",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
    title: "Glass Relay",
    subtitle: "Redwood Trail",
  },
  {
    id: "arc-3",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    title: "Noir Mist",
    subtitle: "Mountain Peaks",
  },
  {
    id: "arc-4",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    title: "Driftline Rays",
    subtitle: "Canopy Light",
  },
  {
    id: "arc-5",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
    title: "Pulse Emerald",
    subtitle: "Verdant Highlands",
  },
  {
    id: "arc-6",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
    title: "Cold Meridian",
    subtitle: "Alpine Lake",
  },
  {
    id: "arc-7",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
    title: "Astra Wilds",
    subtitle: "Open Range",
  },
  {
    id: "arc-8",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
    title: "Mono Summit",
    subtitle: "Golden Ridge",
  },
  {
    id: "arc-9",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158813/photo-1433086966358-54859d0ed716-1790158812209.jpg",
    title: "Lumen Cascade",
    subtitle: "Forest Waterfall",
  },
  {
    id: "arc-10",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    title: "Shadow Bloom",
    subtitle: "Alpine Crest",
  },
];

export default function ArcCarouselGalleryExample() {
  return (
    <Gallery
      variant="arc-carousel"
      arcItems={ARC_ITEMS}
      curve={-200}
      cardSize={220}
      autoScrollSpeed={0.22}
      autoSlide={true}
    />
  );
}
```

## Video Sphere Gallery

Immersive 3D rotating spherical video showcase. Videos and media drift along a Fibonacci sphere with organic drag navigation, auto-drift rotation, depth-based scaling, dynamic blur and grayscale effects, and popup preview modal.

- `variant="video-sphere"` switches to the Framer-inspired interactive 3D video sphere showcase.
- `sphereItems` is an array of items ({ id, type, src, poster, title, description, link }) where type can be 'image' or 'video' to populate the sphere.
- `radius=280` is the radius in pixels of the 3D sphere.
- `itemCount=35` is the total number of cards distributed across the sphere surface.
- `autoRotateSpeed=0.0015` controls the passive idle rotation drift speed.
- `blurStrength=12` is the maximum blur in pixels applied to distant cards on the far side of the sphere.
- `enablePopup=true` opens an animated video modal when a card is clicked.

```tsx
const SPHERE_ITEMS = [
  {
    id: "sphere-1",
    type: "image", // Supports "image" or "video"
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
    title: "Alpine Horizons",
    description: "Granite monoliths rising above early morning valley fog",
  },
  {
    id: "sphere-2",
    type: "image",
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
    title: "Emerald Canopy",
    description: "Sunlit trails winding through ancient coastal redwood forests",
  },
  {
    id: "sphere-3",
    type: "image",
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    title: "Whispering Peaks",
    description: "Layers of mountain silhouettes veiled in twilight atmospheric mist",
  },
  {
    id: "sphere-4",
    type: "image",
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    title: "Sunbeam Sanctuary",
    description: "Golden rays breaking through tall evergreens after summer rain",
  },
  {
    id: "sphere-5",
    type: "image",
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
    title: "Verdant Valleys",
    description: "Rolling emerald highlands sweeping toward dramatic skies",
  },
  {
    id: "sphere-6",
    type: "image",
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
    title: "Glacial Reflections",
    description: "Mirror-still alpine lake echoing snow-dusted jagged ridge lines",
  },
  {
    id: "sphere-7",
    type: "image",
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
    title: "Untamed Wilds",
    description: "Untouched wilderness under vibrant open skies",
  },
  {
    id: "sphere-8",
    type: "image",
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
    title: "Golden Hour Ridge",
    description: "Sun setting behind sharp mountain contours",
  },
  {
    id: "sphere-9",
    type: "image",
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1447752875215-b2761acb3c5d-1790148865109.jpg",
    title: "Autumn Stream",
    description: "Gentle brook weaving through vibrant autumn woods",
  },
  {
    id: "sphere-10",
    type: "image",
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1507525428034-b723cf961d3e-1790146212208.jpg",
    title: "Tropical Coast",
    description: "Crystal waters washing onto warm golden sands",
  },
  {
    id: "sphere-11",
    type: "image",
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158813/photo-1433086966358-54859d0ed716-1790158812209.jpg",
    title: "Cascading Falls",
    description: "Hidden waterfall plunging into clear mountain pools",
  },
  {
    id: "sphere-12",
    type: "image",
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    title: "Alpine Mist",
    description: "Snow-covered peaks shrouded in high-altitude clouds",
  },
  {
    id: "sphere-13",
    type: "image",
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145142/photo-1500530855697-b586d89ba3ee-1790145143493.jpg",
    title: "Golden Waters",
    description: "Sunset glow reflecting over tranquil lake waters",
  },
  {
    id: "sphere-14",
    type: "image",
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1473448912268-2022ce9509d8-1790148865110.jpg",
    title: "Pine Forest",
    description: "Lush green pine trees greeting early morning light",
  },
  {
    id: "sphere-15",
    type: "image",
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1518495973542-4542c06a5843-1790158812213.jpg",
    title: "Sunlit Trees",
    description: "Dappled sunlight filtering through summer leaves",
  },
];

export default function VideoSphereGalleryExample() {
  return (
    <Gallery
      variant="video-sphere"
      sphereItems={SPHERE_ITEMS}
      radius={280}
      itemCount={35}
      autoRotateSpeed={0.0015}
      itemWidth={110}
      itemHeight={150}
      blurStrength={12}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/gallery.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/gallery
```

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"orbit" \| "moving-bento" \| "circular-reel" \| "pill-carousel" \| "arc-carousel" \| "video-sphere"` | `"orbit"` | Selects the revolving 3D circular photo orbit ring, 3D video sphere gallery, GSAP Flip moving bento, circular reel dial spinner, 3D pill carousel, or 3D curved arc carousel gallery. |
| `images` | `string[]` | 15 landscapes | The cards on the ring for the `"orbit"` variant. |
| `duration` | `number` | `36` | Seconds per revolution on the orbit ring. |
| `items` | `MovingBentoItem[]` | 8 landscapes | The cards for the `"moving-bento"` variant. |
| `swapInterval` | `number` | `3000` | Milliseconds between automatic card swaps in the moving bento. |
| `gap` | `number` | `12` | Gap in pixels between bento grid cards. |
| `autoPlay` | `boolean` | `true` | Controls whether automatic card swaps or idle passive rotation are enabled. |
| `reelItems` | `CircularReelItem[]` | 10 landscapes | The items positioned along the ring for the `"circular-reel"` variant. |
| `idleRotationSpeed` | `number` | `5` | Degrees per second of passive idle rotation in the circular reel. |
| `scrollSensitivity` | `number` | `0.06` | Scroll and wheel sensitivity factor in the circular reel. |
| `ringThickness` | `number` | `37` | Percentage thickness of the circular reel segmented donut ring (10 to 60). |
| `grayscale` | `boolean` | `false` | Applies a grayscale filter to the reel images. |
| `pillItems` | `PillCarouselItem[]` | 5 landscapes | The items ({ id, image, tooltipText, link }) for the `"pill-carousel"` variant. |
| `autoSlide` | `boolean` | `true` | Controls automatic sliding in the `"pill-carousel"` variant. When `true`, cards slide automatically and can also be clicked; set to `false` to disable auto-sliding and navigate by clicking only. |
| `cardBorderRadius` | `number` | `200` | Border radius in pixels for the pill-shaped cards in the 3D pill carousel. |
| `activeBorderWidth` | `number` | `6` | Border width in pixels around the active center pill card (uses theme/accent colour by default). |
| `autoPlayInterval` | `number` | `3000` | Milliseconds between automatic transitions in the 3D pill carousel when `autoSlide` is `true`. |
| `arcItems` | `ArcCarouselItem[]` | 10 scenes | The items ({ id, image, title, subtitle, link }) for the `"arc-carousel"` variant. |
| `curve` | `number` | `-200` | Curvature value from `-300` to `300`: negative for concave cylinder arc, `0` for flat row, and positive for convex barrel arc. |
| `cardSize` | `number` | `220` | Width in pixels of each card in the arc carousel. |
| `cardHeight` | `number` | `cardSize * 1.32` | Height in pixels of each card in the arc carousel. |
| `perspective` | `number` | `1200` | 3D CSS perspective depth in pixels for the cylindrical arc. |
| `autoScrollSpeed` | `number` | `0.22` | Continuous auto-drift velocity in cards per second. |
| `dragSpeed` | `number` | `1.2` | Pointer drag multiplier when grabbing and spinning the carousel. |
| `inertia` | `number` | `0.75` | Friction momentum coefficient (`0` to `1`) for smooth coasting after pointer release. |
| `sphereItems` | `VideoSphereItem[]` | 9 video scenes | The items ({ id, src, poster, title, description, link }) for the `"video-sphere"` variant. |
| `radius` | `number` | `280` | Radius in pixels of the 3D sphere. |
| `itemCount` | `number` | `35` | Total count of cards distributed along the Fibonacci sphere surface. |
| `itemWidth` | `number` | `110` | Width in pixels of each video card. |
| `itemHeight` | `number` | `150` | Height in pixels of each video card. |
| `blurStrength` | `number` | `12` | Max blur in pixels applied to cards on the far side of the sphere. |
| `enablePopup` | `boolean` | `true` | Whether clicking a video card opens an animated lightbox preview modal. |
| `unmuteOnHover` | `boolean` | `false` | Whether to unmute audio while hovering over an individual video card. |
| `maxConcurrentVideos` | `number` | `12` | Max number of front-facing videos actively playing at once for performance optimization. |
| `highlights` | `&#123; label: string; color?: string &#125;[]` | three facts | The dotted row under the actions. |
| `color` | `string` | theme primary | Accent colour — a preset name or any CSS colour. |
| `linkComponent` | `ElementType` | `"a"` | What renders every link; pass `next/link` in Next.js. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/gallery
