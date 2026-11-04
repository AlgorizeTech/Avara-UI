---
title: "Shadcn Scroll Split Cards"
description: "Shadcn Scroll Split Cards. A cinematic scroll-driven storytelling component featuring a unified panoramic landscape that splits into three distinct physical…"
url: https://avaraui.com/docs/nextjs/scroll-split-cards
---

# Shadcn Scroll Split Cards

A cinematic scroll-driven storytelling component featuring a unified panoramic landscape that splits into three distinct physical card panels upon scrolling. As the user continues downward, the cards separate, execute a perspective-rich 180° 3D flip to reveal curated editorial narratives, and finally settle cleanly in place.

`ScrollSplitCards` brings tactile visual immersion to brand origin stories, architectural journeys, editorial photography features, and landmark case studies.

### Slow Transition

Pass the variant="slow-transition" and scrollSpeed or speed prop (e.g. scrollSpeed={0.6}) to dynamically control scroll sensitivity.

- Variant Mode `variant="slow-transition"` activates the slow transition profile with leisurely narrative pacing.
- Scroll Speed Multiplier `scrollSpeed=0.6` multiplies wheel and touch delta values to fine-tune how fast or leisurely the animation unfolds per scroll tick.
- Panoramic Mountain Ridge `imageUrl` renders a high-resolution sunset alpine peak panorama across the three split cards.
- Custom Narrative Acts `cards` renders custom thematic chapters with bespoke metric badges and distinct background colors.

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

## Features

### Mathematical Panorama Slicing

Renders a single high-resolution image across three adjacent overflow-hidden cards using precise percentage offsets, guaranteeing zero seams when closed.

### Spring-Smoothed Scroll Physics

A spring follower (the same equation of motion as Motion's `useSpring`) turns native mousewheel and touch input into organic physical motion, with no animation library to install. Under `prefers-reduced-motion` the panels track the input directly.

### Dual-Sided 3D Cardstock

Each panel has genuine 3D card faces with `preserve-3d` and `backface-visibility`, flipping 180° to reveal typographic narratives with individual color schemes.

### Live Range Slider & Speed Control

Fine-tune the scroll rate by passing `scrollSpeed` or `speed` (numbers like `0.6` or presets like `"slow"`, `"normal"`, `"fast"`), with a live interactive range slider.

## Best Practices & Guidelines

### Scroll Choreography & Layout Containment

Place `ScrollSplitCards` in a standard vertical flow without conflicting parent `overflow-hidden` constraints. Both mousewheel scroll and touch drag gestures naturally advance the animation through each stage.

### Panoramic Image Selection

For the most dramatic visual impact, use wide landscape photography (recommended aspect ratio 21:9 or ~2.4:1) with a resolution of at least 2400×1000px. High-contrast horizon or architectural imagery splits cleanly across the panels.

### Editorial Card Content & Legibility

Keep narrative copy concise: 1–2 sentences per card along with an optional metric callout and kicker. Contrast-tested background colors ensure text remains easily legible on all viewports.

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

---

Live previews and every example: https://avaraui.com/docs/nextjs/scroll-split-cards
