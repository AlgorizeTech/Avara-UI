---
title: "Shadcn Top Destinations"
description: "Shadcn Top Destinations. A travel destination showcase whose two rows of cards move in opposite directions as you scroll."
url: https://avaraui.com/docs/nextjs/top-destinations
---

# Shadcn Top Destinations

A dual-row scroll-driven destination showcase. As the user scrolls down the page, two parallel rows of destination cards travel in opposite directions via **GSAP ScrollTrigger** scrub animation.

Each card features full-bleed photography, subtle vertical typography by default, smooth hover scaling, and an interactive bordered overlay revealing place counts, tags, and an "Explore" action.

## Dual-row parallax travel

Scroll down to watch top and bottom rows travel in opposite directions across the screen.

- `scrollOffset=450` controls the horizontal travel distance in pixels scrubbed by the scrollbar.
- `items` accepts an array of destination objects with title, country, image, placesCount, and tag.
- `onExplore` callback fired when a card's Explore action button is activated.

```tsx
const customDestinations: DestinationItem[] = [
  {
    id: "bali",
    title: "Bali",
    country: "Indonesia",
    placesCount: 38,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158812/photo-1721335916916-37c319adce3a-1790158812206.jpg",
    tag: "Tropical",
  },
  {
    id: "kyoto",
    title: "Kyoto",
    country: "Japan",
    placesCount: 42,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    tag: "Historic",
  },
  {
    id: "santorini",
    title: "Santorini",
    country: "Greece",
    placesCount: 26,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790166049/photo-1527004013197-933c4bb611b3-1790166052225.jpg",
    tag: "Islands",
  },
  {
    id: "amalfi",
    title: "Amalfi Coast",
    country: "Italy",
    placesCount: 31,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158811/photo-1663428520845-056989f8a664-1790158812204.jpg",
    tag: "Coastal",
  },
  {
    id: "paris",
    title: "Paris",
    country: "France",
    placesCount: 54,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
    tag: "Romantic",
  },
  {
    id: "new-york",
    title: "New York",
    country: "USA",
    placesCount: 68,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790145142/photo-1500530855697-b586d89ba3ee-1790145143493.jpg",
    tag: "Metropolis",
  },
  {
    id: "swiss-alps",
    title: "Swiss Alps",
    country: "Switzerland",
    placesCount: 35,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
    tag: "Alpine",
  },
  {
    id: "dubai",
    title: "Dubai",
    country: "UAE",
    placesCount: 47,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146211/photo-1519681393784-d120267933ba-1790146212210.jpg",
    tag: "Luxury",
  },
  {
    id: "tokyo",
    title: "Tokyo",
    country: "Japan",
    placesCount: 72,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    tag: "Futuristic",
  },
  {
    id: "sydney",
    title: "Sydney",
    country: "Australia",
    placesCount: 39,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1400,c_limit/v1790158811/photo-1682952986992-de7082fb213d-1790158812205.jpg",
    tag: "Harbour",
  },
];

export default function DestinationsShowcase() {
  return (
    <TopDestinations
      title="Top Destinations"
      subtitle="Experience our Instagram moments, where we share team activities, product stories, and memorable events that showcase our brand's journey."
      items={customDestinations}
      scrollOffset={450}
      onExplore={(item) => console.log("Exploring:", item.title)}
    />
  );
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/top-destinations.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/top-destinations
```

## Features

### Opposite Direction Scrub

Row 1 and Row 2 glide in opposite directions as the viewport scrolls, creating an immersive cinematic depth effect.

### Interactive Hover Frame

Hovering over any card dims the background, smoothly frames the destination with a frosted border, and displays place count and explore CTA.

### Flexible Split or Unified Rows

Pass a single unified `items` array to automatically split across rows, or supply `row1Items` and `row2Items` explicitly.

### Reduced Motion Safe

Automatically respects user motion preferences, gracefully falling back to a clean horizontal carousel without jarring animations.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `"Top Destinations"` | Section main heading displayed above the card rows. |
| `subtitle` | `string` | Lead description copy | Secondary descriptive paragraph beneath the title. |
| `badgeText` | `string` | `"Top Destinations"` | Text rendered in the circular map pin badge header. |
| `badgeIcon` | `ReactNode` | `<MapPin />` | Custom icon placed inside the badge pill. |
| `items` | `DestinationItem[]` | `DEFAULT_DESTINATIONS` | Complete list of destinations, automatically split 50/50 between the two rows. |
| `row1Items` | `DestinationItem[]` | First half | Explicit destination items for the top row (travels towards the left). |
| `row2Items` | `DestinationItem[]` | Second half | Explicit destination items for the bottom row (travels towards the right). |
| `scrollOffset` | `number` | `450` | Horizontal travel distance in pixels as the section traverses the viewport. |
| `scrollerRef` | `RefObject<HTMLElement>` | `undefined` | Custom scroll parent element driving ScrollTrigger (useful inside sandboxes and modals). |
| `onExplore` | `(item) => void` | `undefined` | Click handler triggered when a user explores a specific destination. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/top-destinations
