---
title: "Shadcn Scroll Split Cards"
description: "Shadcn Scroll Split Cards. A scroll-driven 3D split showcase (`ScrollSplitCards`) that slices a panoramic image into three panels, separates them."
url: https://avaraui.com/docs/nextjs/scroll-split-cards
---

# Shadcn Scroll Split Cards

A scroll-driven 3D split showcase (`ScrollSplitCards`) that slices a panoramic image into three panels, separates them, and flips them 180° to reveal editorial cards.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/scroll-split-cards.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/scroll-split-cards
```

## Default

The default scroll mode, with built-in spring physics. No speed props needed.

- `imageUrl` is split into three adjacent panels that line up seamlessly before the first scroll.

```tsx
import { ScrollSplitCards } from "@/components/custom/blocks/ScrollSplitCardsBlock";

export default function DefaultVariantExample() {
  return (
    <div className="w-full">
      <ScrollSplitCards
        variant="default"
        headerTitle="Explore"
        headerSubtitle="Scroll down to reveal the alpine lake narrative"
        imageUrl="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790224415/photo-1501785888041-af3ef285b470-1790146212207-1790224416318.jpg"
        cards={[
          {
            number: "01",
            tag: "SANCTUARY",
            metric: "1,496 M",
            metricLabel: "ELEVATION",
            location: "South Tyrol, Italy",
            title: "Lago di Braies",
            description:
              "Glacial emerald waters mirror sheer limestone walls in the silent morning mist before rowers set out.",
            backgroundColor: "#13352F",
            textColor: "#E6F4F1",
          },
          {
            number: "02",
            tag: "HERITAGE",
            metric: "100+ YRS",
            metricLabel: "ROWBOAT CRAFT",
            location: "Prags Alpine Dock",
            title: "The Boathouse",
            description:
              "Handcrafted wooden larch skiffs moored to stilted pine docks, awaiting the gentle morning row across crystal shallows.",
            backgroundColor: "#A45229",
            textColor: "#FFF8F5",
          },
          {
            number: "03",
            tag: "UNESCO",
            metric: "2,810 M",
            metricLabel: "SUMMIT HEIGHT",
            location: "Dolomites Park",
            title: "Seekofel Peak",
            description:
              "Towering pale crags catch the first golden alpine glow, standing sentinel over the emerald basin below.",
            backgroundColor: "#141E2B",
            textColor: "#ECF3F9",
          },
        ]}
      />
    </div>
  );
}
```

## Slow Transition

A slower profile for leisurely narrative pacing.

- `scrollSpeed=0.6` multiplies wheel and touch deltas to tune how fast the animation unfolds.
- `cards` are your own chapters, each with metric badges and a background colour.

```tsx
import { ScrollSplitCards } from "@/components/custom/blocks/ScrollSplitCardsBlock";

export default function SlowTransitionExample() {
  return (
    <div className="w-full">
      <ScrollSplitCards
        variant="slow-transition"
        scrollSpeed={0.6}
        headerTitle="The Journey"
        headerSubtitle="Scroll to explore the three acts with custom speed"
        imageUrl="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2600&auto=format&fit=crop"
        cards={[
          {
            number: "01",
            tag: "EXPEDITION",
            metric: "1,850 M",
            metricLabel: "BASE CAMP",
            location: "High Tatras, Alpine Pass",
            title: "The Valley Basin",
            description: "Where silent mist gathers before the early dawn, cradling the pine riverbed below.",
            backgroundColor: "#1e293b",
            textColor: "#f8fafc",
          },
          {
            number: "02",
            tag: "ELEVATION",
            metric: "2,450 M",
            metricLabel: "TRAIL HEAD",
            location: "Granite Ridgeline",
            title: "The Timber Ridge",
            description: "High elevation where crisp pine timber meets pure cool mountain air and rugged cliffs.",
            backgroundColor: "#854d0e",
            textColor: "#fefce8",
          },
          {
            number: "03",
            tag: "SUMMIT",
            metric: "3,150 M",
            metricLabel: "PEAK HEIGHT",
            location: "The Highest Crest",
            title: "The Silent Summit",
            description: "Pure panoramic sky spanning out across thirty miles of untouched wilderness in the golden glow.",
            backgroundColor: "#0f172a",
            textColor: "#f1f5f9",
          },
        ]}
      />
    </div>
  );
}
```

## About Shadcn Scroll Split Cards

**What it is.** `ScrollSplitCards` slices one wide `imageUrl` panorama across three seamless panels that separate and 3D-flip 180° on scroll to reveal three `cards` chapters.

**How it is built.** Uses a dependency-free spring follower for wheel and touch deltas (tracking input directly under `prefers-reduced-motion`) and CSS `preserve-3d` / `backface-visibility` for the flip.

**When to use it.** Use `ScrollSplitCards` for editorial storytelling, brand journeys, and architectural or travel features.

## For AI agents

**When to use**

- Three-panel panoramic image-to-3D-flip storytelling sections (`variant="default" | "slow-transition"`, `scrollSpeed`)

**When not to use**

- Vertical sticky card decks — use [Modern Scroll Stack](https://avaraui.com/docs/reactjs/modern-scroll-stack) or [Scroll Stack](https://avaraui.com/docs/reactjs/scroll-stack)

**Agent notes**

- Named export: `import { ScrollSplitCards } from "@/components/custom/blocks/ScrollSplitCardsBlock"`
- Avoid `overflow-hidden` on parent containers; use wide ~21:9 landscape photography (`2400x1000px+`) for clean 3-panel slicing

## Props Reference

### ScrollSplitCards Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "slow-transition"` | `"default"` | Selects the transition variant mode. `"slow-transition"` automatically activates a slower, leisurely storytelling scroll. |
| `imageUrl` | `string` | `DEFAULT_IMAGE` | Panoramic landscape photograph URL that is mathematically sliced across the three card panels. Also accepts `imageSrc`. |
| `cards` | `SplitCard[]` | `DEFAULT_CARDS` | Array of card data objects for the three panels. Also accepts `items`. |
| `scrollSpeed` | `number \| "slow" \| "normal" \| "fast"` | `1` | Optional speed multiplier for mousewheel and touch scroll progression. Smaller numbers like `0.6` or `"slow"` make the animation slower and more granular. Also accepts `speed`. |
| `headerTitle` | `string` | `"Explore"` | Primary headline displayed prominently at the top above the split cards stage. |
| `headerSubtitle` | `string` | `"Scroll down to reveal..."` | Supporting instructional or narrative subtext displayed beneath the header title. |
| `containerHeight` | `string` | `undefined` | Optional height override for the stage container. By default uses responsive heights: `460px` on mobile, `620px` on small, `650px` on medium, and `710px` on large screens. |
| `enableScrollIndicator` | `boolean` | `true` | Controls whether to display the animated mouse scroll indicator pill at the top. |
| `className` | `string` | `""` | Additional CSS classes applied to the root outer container. |

### SplitCard Item Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | Required | Main editorial display headline rendered on the card's back face. |
| `description` | `string` | Required | Narrative storytelling copy describing the chapter or feature. |
| `tag` | `string` | `"CHAPTER"` | Category pill label badge rendered at the top-left of the back face. Also accepts `kicker`. |
| `number` | `string` | `"01", "02", "03"` | Index label rendered at the top-right of the card. |
| `metric` | `string` | `undefined` | Prominent stat, elevation, or milestone callout value (e.g. `"1,496 M"`). |
| `metricLabel` | `string` | `"METRIC"` | Label displayed directly above the prominent metric number. |
| `location` | `string` | `undefined` | Geographic location or sub-region rendered in the bottom footer row. |
| `backgroundColor` | `string` | `"#13352F"` | Background color of the card back face. Also accepts `bgColor`. |
| `textColor` | `string` | `"#E6F4F1"` | Text color for clear contrast against the card background. |

## Works with other components

- Pair with [Hero](https://avaraui.com/docs/reactjs/hero) or [Scroll Stack](https://avaraui.com/docs/reactjs/scroll-stack) in narrative landing pages.

## What image works best for ScrollSplitCards?

Use a wide panoramic landscape photo in `imageUrl`. The component slices that one image across three panels so the pieces line up while closed, then separates them as the user scrolls. A narrow or portrait image will be cropped heavily across the three slices.

## How do I change the content of the three cards?

Pass three `SplitCard` objects in `cards`. Each needs a `title` and `description`. Optional fields include `tag`, `number`, `metric`, `metricLabel`, `location`, `backgroundColor` and `textColor`, which style the editorial face revealed after the 180° flip.

## How do I make the scroll animation slower?

Lower `scrollSpeed` below its default of `1`, for example `0.6`, or pass `"slow"`. You can also set `variant="slow-transition"` for a more leisurely storytelling pace. `"normal"` and `"fast"` are accepted too, and they apply to both wheel and touch scrolling.

## Does ScrollSplitCards respect reduced motion and work on touch?

Yes to both. It follows wheel and touch deltas with a dependency-free spring, and under `prefers-reduced-motion` it tracks the input directly instead of easing. The panel flip uses CSS `preserve-3d` and `backface-visibility`, so it adds no animation library.

## How do I change the stage height or hide the scroll indicator?

Set `containerHeight` to a CSS size string to override the default responsive stage height, which starts at `460px` on mobile. Pass `enableScrollIndicator={false}` to remove the animated mouse pill at the top. `headerTitle` and `headerSubtitle` change the text above the cards.

---

Live previews and every example: https://avaraui.com/docs/nextjs/scroll-split-cards
