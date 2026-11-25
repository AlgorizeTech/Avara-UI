---
title: "Shadcn Book Flip"
description: "A 3D book component with realistic page turns, spine shifts, centre-fold shadows, leaf peeking and a toolbar of page controls. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/book-flip
---

# Shadcn Book Flip

An interactive 3D **Book Flip** component simulating realistic book page turns, dynamic spine shifts, center fold shadows, leaf peeking, and bottom icon toolbar controls.

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

## About Shadcn Book Flip

**What it is.** `BookFlip` is a 3D book made of image leaves. It opens from a closed cover into a two-page spread, turns pages with a spine shadow and a hover peek, and has a toolbar with Previous, Reset, a turned-count badge and Next.

**How it is built.** Each entry in `pages` is a leaf with a `frontImage` and a `backImage`, drawn with CSS 3D transforms and `perspective`. The state is the number of turned leaves (`turnedIndex` or `defaultTurnedIndex`, where 0 is the closed cover), and `onPageChange` reports it. Arrow keys on the window and clicks on a page also turn leaves.

**When to use it.** Use it for digital lookbooks, interactive portfolios, photo albums and product catalogs where turning a page is part of the experience.

**Features.**

- **Cover to spread:** the book starts closed and shifts sideways to centre the two-page spread once a leaf turns, unless `spineShift` is `false`.
- **Spine shadow and peek:** a crease shadow sits on the pages, and hovering a turnable leaf lifts it by `peekAngle` degrees.
- **Keyboard:** the Left and Right arrow keys flip a page, with no focus needed (see the FAQ below).
- **Toolbar:** labelled Previous Page, Reset Book and Next Page buttons around a turned count such as `2 / 8`; hide it with `showControls={false}`.

## For AI agents

**When to use**

- Digital lookbooks, interactive portfolios, photo albums, and product catalogs where tactile page-turning elevates browsing

**When not to use**

- Browsing images in a swipeable slider: use [Carousel](https://avaraui.com/docs/reactjs/carousel)
- Content that should open in an overlay: use [Modal](https://avaraui.com/docs/reactjs/modal)

**Agent notes**

- Import `BookFlip` (also the default export) from `@/components/custom/book-flip`, not from `blocks/`. Types `PageFlipLeaf` and `BookFlipHandle` are exported too.
- `pages` is `PageFlipLeaf[]`: the first leaf's front is the front cover, the last leaf's back is the back cover, and each leaf has `frontImage` and `backImage` plus optional `frontTitle`, `backTitle`, subtitles, badges and gradient colours.
- `turnedIndex` is a count of turned leaves from `0` to `pages.length`, not a page number. Use `turnedIndex` with `onPageChange` for controlled state or `defaultTurnedIndex` for uncontrolled.
- A ref gives `{ next, prev, reset, goTo, getTurnedCount, getTotalLeaves }` for your own buttons.
- Arrow-key listeners are on `window`, so two books on one page flip together.

## Props Reference

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
| `perspective` | `number` | `1400` | 3D perspective depth in pixels. |
| `peekAngle` | `number` | `14` | Degrees a leaf lifts when hovered. |
| `turnAngle` | `number` | `180` | Total turn angle of a flipped leaf in degrees. |
| `duration` | `number` | `0.7` | Flip duration in seconds. |
| `easing` | `string` | `"cubic-bezier(0.4, 0, 0.2, 1)"` | CSS easing for the flip. |
| `shadowIntensity` | `number` | `0.35` | Shadow strength from 0 to 1. |
| `spineShift` | `boolean` | `true` | Shifts the book sideways so the open spread stays centred. |
| `radius` | `string \| number` | `"4px"` | Page corner radius. A number is read as pixels. |
| `pauseOnHover` | `boolean` | `true` | Pauses autoplay while the pointer is over the book. |
| `interactive` | `boolean` | `true` | Lets visitors click a page to turn it. When `false`, the pages ignore the pointer. |
| `className / style` | `string / CSSProperties` | `undefined` | Classes and inline style for the outer container. |

## Works with other components

- [Modal](https://avaraui.com/docs/reactjs/modal) for opening a full-screen catalog preview around the book.
- [Card](https://avaraui.com/docs/reactjs/card) for editorial layouts that surround the book with copy.
- [Kbd](https://avaraui.com/docs/reactjs/kbd) to show the Left and Right arrow shortcut hints next to the book.

## Does BookFlip support keyboard navigation?

Yes. The Left and Right arrow keys flip pages through a listener on `window`, so the book needs no focus. That also means arrows turn pages while a visitor types in a nearby input, and two books on one page flip together. The toolbar buttons have labels such as "Next Page".

## Can I control the active page externally?

Yes. Pass `turnedIndex` and update it in `onPageChange(turnedCount, totalLeaves)`. The value counts turned leaves, so `0` is the closed cover and `pages.length` is a fully turned book. Use `defaultTurnedIndex` for uncontrolled state. Autoplay only works in uncontrolled mode.

## How should I structure the pages array in BookFlip?

Each item is one physical leaf with two sides. The first leaf's `frontImage` is the front cover, a leaf's `backImage` shows on the left once it turns, and the last leaf's `backImage` is the back cover. Add `frontTitle`, `frontBadge` and `frontColor` for captions.

## How do I flip BookFlip from my own buttons?

Attach a ref to `BookFlip` and call it from your own buttons. The handle exposes `next()`, `prev()`, `reset()`, `goTo(index)`, `getTurnedCount()` and `getTotalLeaves()`, typed as `BookFlipHandle`. `goTo` clamps to the range 0 to `pages.length`, and it fires `onPageChange` like the built-in toolbar does.

## Does BookFlip autoplay, and when does it pause?

Set `autoplay` to turn a leaf every `autoplayInterval` milliseconds (3500 by default). It returns to the closed cover after the last leaf and pauses while the pointer is over the book, unless `pauseOnHover={false}`. Autoplay updates internal state only, so `onPageChange` does not fire for it.

## How do I stop visitors clicking pages or hide the toolbar in BookFlip?

Pass `interactive={false}` to stop clicks on pages from turning them, and `showControls={false}` to hide the toolbar. The Left and Right arrow keys still turn pages, so drive the book from your own buttons through the ref if you need full control.

---

Live previews and every example: https://avaraui.com/docs/nextjs/book-flip
