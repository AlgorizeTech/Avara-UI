---
title: "Book Flip"
description: "A 3D book component with realistic page turns, spine shifts, centre-fold shadows, leaf peeking and a toolbar of page controls. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/book-flip
---

# Book Flip

An interactive 3D **Book Flip** component simulating realistic book page turns, dynamic spine shifts, center fold shadows, leaf peeking, and bottom icon toolbar controls.

## Variations

### Book Flip Component

Interactive 3D book cover, open spreads with center spine fold shadow, leaf peeking, and icon-only navigation controls.

```tsx
import BookFlip, { type PageFlipLeaf } from "@/components/custom/book-flip";

const samplePages: PageFlipLeaf[] = [
  // 1. FRONT COVER (First leaf in array = Front Cover Photo & Metadata)
  {
    id: 1,
    frontImage: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146211/photo-1518709268805-4e9042af9f23-1790146212209.jpg", // <-- FRONT COVER PHOTO
    backImage: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",  // <-- Inside Left Page Photo
    frontTitle: "TERRA INCOGNITA", // <-- Front Cover Title
    frontSubtitle: "A Visual Exploration of Earth's Remote Frontiers",
    frontBadge: "LIMITED EDITION",
    frontColor: "from-amber-400 to-yellow-600",
    backTitle: "Whispering Evergreens",
    backSubtitle: "Highland Ridges & Ancient Pines",
    backBadge: "Plate 01",
    backColor: "from-emerald-500 to-teal-600",
  },
  // 2. INSIDE PAGES / PLATES
  {
    id: 2,
    frontImage: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1434394354979-a235cd36269d-1790145143490.jpg", // <-- Inside Right Page Photo
    backImage: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1469854523086-cc02fe5d8800-1790145143492.jpg",  // <-- Inside Left Page Photo
    frontTitle: "Cascading Emerald",
    frontSubtitle: "Basalt Columns & Rainforest Mist",
    frontBadge: "Plate 02",
    frontColor: "from-teal-500 to-cyan-600",
    backTitle: "Crimson Canyons",
    backSubtitle: "Red Rock Gorges & Sunset Radiance",
    backBadge: "Plate 03",
    backColor: "from-rose-500 to-pink-600",
  },
  {
    id: 3,
    frontImage: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1517411032315-54ef2cb783bb-1790146212209.jpg",
    backImage: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    frontTitle: "Celestial Auroras",
    frontSubtitle: "Polar Nights & Luminous Fjord Skies",
    frontBadge: "Plate 04",
    frontColor: "from-indigo-500 to-purple-600",
    backTitle: "Summit Horizons",
    backSubtitle: "Glacial Peaks & Alpenglow Glow",
    backBadge: "Plate 05",
    backColor: "from-blue-500 to-indigo-600",
  },
  // 3. BACK COVER (Last leaf in array = Back Cover Photo & Metadata)
  {
    id: 4,
    frontImage: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1509316975850-ff9c5deb0cd9-1790146212209.jpg", // <-- Inside Right Page Photo
    backImage: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1451187580459-43490279c0fa-1790145143491.jpg",  // <-- BACK COVER PHOTO
    frontTitle: "Velvet Saharas",
    frontSubtitle: "Wind Sculpted Dunes & Sunset Glow",
    frontBadge: "Plate 06",
    frontColor: "from-amber-600 to-yellow-500",
    backTitle: "THE INFINITE COSMOS", // <-- Back Cover Title
    backSubtitle: "Published by Avara Fine Art Press",
    backBadge: "HARDCOVER MONOGRAPH",
    backColor: "from-purple-600 to-violet-800",
  },
];

export default function BookFlipDemo() {
  return (
    <BookFlip
      pages={samplePages}
      defaultTurnedIndex={0}
      pageWidth={260}
      pageHeight={380}
      perspective={1400}
      peekAngle={14}
      turnAngle={180}
      duration={0.7}
      easing="cubic-bezier(0.4, 0, 0.2, 1)"
      spineShift={true}
      radius="4px"
      showPageNumbers={true}
      showSpineBinding={true}
      autoplay={false}
      autoplayInterval={3500}
      pauseOnHover={true}
      interactive={true}
      showControls={true}
      onPageChange={(turnedCount, totalLeaves) => {
        console.log(`Page flipped: ${turnedCount} / ${totalLeaves}`);
      }}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/book-flip.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/book-flip
```

## Features

- **3D Book Cover & Spread Transition**: Starts in single-cover mode and dynamically centers into a 2-page spread upon flipping leaves.
- **Center Spine Crease Shadow**: Realistic crease fold shadow integrated on page surfaces.
- **Keyboard Navigation**: Press Left Arrow (`←`) and Right Arrow (`→`) keys to flip through pages.
- **Minimal Icon Toolbar**: Features `< Prev`, `Reset`, `X / Y` counter, and `Next >` icon-only controls.

## Props Reference: BookFlip

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `pages` | `PageFlipLeaf[]` | `DEFAULT_PAGES` | Array of page leaves, each containing front and back images & metadata. |
| `turnedIndex` | `number` | `undefined` | Controlled turned page count. |
| `defaultTurnedIndex` | `number` | `0` | Default turned page count (0 = closed cover). |
| `onPageChange` | `(turnedCount: number, totalLeaves: number) => void` | `undefined` | Callback fired when page count changes. |
| `pageWidth` | `number` | `260` | Width of a single page leaf in pixels. |
| `pageHeight` | `number` | `380` | Height of a single page leaf in pixels. |
| `showControls` | `boolean` | `true` | Toggles visibility of the bottom navigation controls toolbar. |
| `showSpineBinding` | `boolean` | `true` | Toggles outer book spine crease line overlay. |
| `showPageNumbers` | `boolean` | `true` | Toggles page numbering badges on leaves. |
| `autoplay` | `boolean` | `false` | Enables automatic page flipping timer. |
| `autoplayInterval` | `number` | `3500` | Interval in milliseconds between automatic page flips. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/book-flip
