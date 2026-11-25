---
title: "Shadcn Memories Card"
description: "Shadcn Memories Card. An interactive 3D-tilting photo card stack (`MemoriesCard`) with a fanned background deck, drag-to-cycle gestures."
url: https://avaraui.com/docs/nextjs/memories-card
---

# Shadcn Memories Card

An interactive 3D-tilting photo card stack (`MemoriesCard`) with a fanned background deck, drag-to-cycle gestures, and `onCardChange` index tracking.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/memories-card.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/memories-card
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add https://avaraui.com/r/memories-card-motion.json
```

## Tracking the active card

- `items` Array of MemoryItem objects. Each item can take: id (required), title (required), image (required), tag (optional badge), location (optional pin text), date (optional timestamp), and description (optional subtext).
- `onCardChange` fires with the new front index (number) on every swipe — wire it to a caption, counter or analytics call.

```tsx
import { useState } from "react";
import { MemoriesCard, type MemoryItem } from "@/components/custom/blocks/MemoriesCardBlock";

const memories: MemoryItem[] = [
  {
    id: "m1",
    tag: "Highlight",
    title: "Alpine Forest Lake",
    location: "Swiss Alps",
    date: "Oct 2025",
    description:
      "Serene pine forests reflecting over calm turquoise mountain waters at sunrise.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  },
  {
    id: "m2",
    tag: "Expedition",
    title: "Dolomites Alpine Ridge",
    location: "South Tyrol, Italy",
    date: "Aug 2025",
    description:
      "Reaching the summit just as the morning sun cast jagged shadows across the limestone peaks.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
  },
  {
    id: "m3",
    tag: "Sanctuary",
    title: "Emerald Forest Stream",
    location: "Pacific Northwest",
    date: "Jul 2025",
    description:
      "A tranquil river winding through dense ancient rainforests and mossy rocks.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
  {
    id: "m4",
    tag: "Wilderness",
    title: "Cascading Mountain Falls",
    location: "Alberta, Canada",
    date: "Jun 2025",
    description:
      "Fresh mountain spring water cascading through untouched wilderness slopes.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
];

export default function TravelDeck() {
  const [active, setActive] = useState(0);

  // Fires every time a card is sent to the back of the deck.
  return (
    <>
      <MemoriesCard items={memories} onCardChange={setActive} />
      <p>Showing {memories[active].title}</p>
    </>
  );
}
```

## About Shadcn Memories Card

**What it is.** `MemoriesCard` renders a fanned photo deck (`items: MemoryItem[]`) with 3D pointer tilt on the front card, drag-to-back cycling, optional metadata (`tag`, `location`, `date`, `description`), and `onCardChange(index)`. A "n / total" counter and a Reset button are built in.

**How it is built.** It ships matching GSAP and Motion builds with the same props: spring-based tilt of up to 14 degrees, a fan of at most four visible cards, and a front card the user drags sideways. Dragging past 80px sends it to the back of the deck. Install `memories-card` or `memories-card-motion`; both also use `lucide-react`.

**When to use it.** Use `MemoriesCard` for travel/photo stories, curated highlights, and interactive galleries. For generic swipe-to-discard text cards, use [Card Stack](https://avaraui.com/docs/reactjs/card-stack).

## For AI agents

**When to use**

- Photo-first fanned card decks with 3D tilt, drag-to-cycle, and `onCardChange` index callbacks

**When not to use**

- Non-photo swipe-to-discard decks: use [Card Stack](https://avaraui.com/docs/reactjs/card-stack)
- Horizontal photo sliders: use [Carousel](https://avaraui.com/docs/reactjs/carousel)

**Agent notes**

- Named exports: `MemoriesCard` and the `MemoryItem` type from `@/components/custom/blocks/MemoriesCardBlock`. Required item fields are `id`, `title` and `image`; omit `tag`, `location`, `date` and `description` for image-only cards.
- `onCardChange` receives the index of the new front card within your `items` array, and also fires with `0` when the built-in Reset button is pressed.
- `items` seeds the deck once on mount. Changing the prop later does not update the cards, so remount with a `key` when the list changes.
- The deck is pointer-driven: there is no keyboard shortcut for cycling, and motion does not read `prefers-reduced-motion`.

## Props Reference

| Component / Interface | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `MemoriesCard` | `items` | `MemoryItem[]` | Required | An array of data objects defining the images, titles, locations, and badges for the card stack. |
| `MemoriesCard` | `onCardChange` | `(index: number) => void` | `undefined` | Called when a swipe sends a card to the back, and with 0 when Reset is pressed. It receives the index of the new front card in your items array, so you can sync captions, counters or analytics. |
| `MemoriesCard` | `className` | `string` | `undefined` | Custom Tailwind CSS classes to apply to the outermost perspective wrapper container. |
| `MemoryItem` | `id` | `string` | Required | A unique identifier string required for safe React list rendering and for tracking each card as the deck reorders. |
| `MemoryItem` | `title` | `string` | Required | Primary headline text prominently displayed at the bottom of the card. |
| `MemoryItem` | `image` | `string` | Required | The URL to the high-resolution background image for the card. |
| `MemoryItem` | `tag` | `string` | `undefined` | Optional badge label displayed in the top-left corner (e.g., "Highlight", "Expedition"). |
| `MemoryItem` | `location` | `string` | `undefined` | Optional geographical string displayed with a map pin icon above the headline. |
| `MemoryItem` | `date` | `string` | `undefined` | Optional date or timestamp string displayed with a calendar icon above the headline. |
| `MemoryItem` | `description` | `string` | `undefined` | Optional supporting paragraph text explaining the memory. Automatically clamped to 2 lines. |

## Works with other components

- Sync `onCardChange` with [Counter](https://avaraui.com/docs/reactjs/counter) or caption panels, or pair with [Gallery](https://avaraui.com/docs/reactjs/gallery) for full-grid photo browsing.
- Use [Card Stack](https://avaraui.com/docs/reactjs/card-stack) when the deck holds text or UI cards rather than photos.
- Use [Carousel](https://avaraui.com/docs/reactjs/carousel) when users should step through photos in a row with arrows.

## How do I track which card is currently in front?

Pass `onCardChange={(index) => ...}` to `MemoriesCard`. It fires with the 0-based index of the new front card, counted in your original `items` array, whenever a swipe sends a card to the back. Pressing the built-in Reset button fires it with `0`. Store the number in state to drive a caption.

## How do users swipe through the Memories Card deck?

They drag the front card sideways with a mouse or finger. Past 80px of travel the card flies off in that direction and lands at the back of the deck. A shorter drag springs back. Only the front card is draggable, and Reset restores the original order.

## Can I cycle the Memories Card with the keyboard?

Not currently. Cycling is pointer-only, with no arrow-key handler, and the cards are not focusable. The Reset button is a real button, and each photo has `alt` text from its `title`. If keyboard users need access, add your own previous and next buttons that remount the deck, or use [Carousel](https://avaraui.com/docs/reactjs/carousel).

## What happens if I change the items prop of MemoriesCard?

Nothing visible. `MemoriesCard` copies `items` into state on first render and reorders that copy as people swipe. A later change to the prop is only used when Reset is pressed. To show a new list, give the component a new `key` so it remounts with the fresh `items`.

## Should I install the GSAP or the Motion build of MemoriesCard?

Either one. The `memories-card` build uses `gsap` and `memories-card-motion` uses `motion`. Both use `lucide-react` for icons, take the same props and install to the same file, so pick the animation library your project already ships. Install one, not both. Neither imports from `next/*`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/memories-card
