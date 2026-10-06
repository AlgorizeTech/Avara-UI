export const metadata = docsPageMetadata("scroll-split-cards");

# Scroll Split Cards

A cinematic scroll-driven storytelling component featuring a unified panoramic landscape that splits into three distinct physical card panels upon scrolling. As the user continues downward, the cards separate, execute a perspective-rich 180° 3D flip to reveal curated editorial narratives, and finally settle cleanly in place.

`ScrollSplitCards` brings tactile visual immersion to brand origin stories, architectural journeys, editorial photography features, and landmark case studies.

export const usageDefault = `import { ScrollSplitCards } from "@/components/custom/blocks/ScrollSplitCardsBlock";

export default function DefaultVariantExample() {
  return (

  );
}`;

export const usageSlowTransition = `import { ScrollSplitCards } from "@/components/custom/blocks/ScrollSplitCardsBlock";

export default function SlowTransitionExample() {
  return (

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/scroll-split-cards
```

## Features

    Mathematical Panorama Slicing
    Renders a single high-resolution image across three adjacent overflow-hidden cards using precise percentage offsets, guaranteeing zero seams when closed.

    Spring-Smoothed Scroll Physics
    A spring follower (the same equation of motion as Motion's useSpring) turns native mousewheel and touch input into organic physical motion, with no animation library to install. Under prefers-reduced-motion the panels track the input directly.

    Dual-Sided 3D Cardstock
    Each panel has genuine 3D card faces with preserve-3d and backface-visibility, flipping 180° to reveal typographic narratives with individual color schemes.

    Live Range Slider & Speed Control
    Fine-tune the scroll rate by passing scrollSpeed or speed (numbers like 0.6 or presets like "slow", "normal", "fast"), with a live interactive range slider.

## Best Practices & Guidelines

    Scroll Choreography & Layout Containment
    Place ScrollSplitCards in a standard vertical flow without conflicting parent overflow-hidden constraints. Both mousewheel scroll and touch drag gestures naturally advance the animation through each stage.

    Panoramic Image Selection
    For the most dramatic visual impact, use wide landscape photography (recommended aspect ratio 21:9 or ~2.4:1) with a resolution of at least 2400×1000px. High-contrast horizon or architectural imagery splits cleanly across the panels.

    Editorial Card Content & Legibility
    Keep narrative copy concise: 1–2 sentences per card along with an optional metric callout and kicker. Contrast-tested background colors ensure text remains easily legible on all viewports.

## Props Reference

### ScrollSplitCards Props

        Prop
        Type
        Default
        Description

        variant
        "default" | "slow-transition"
        "default"
        Selects the transition variant mode. "slow-transition" automatically activates a slower, leisurely storytelling scroll.

        imageUrl
        string
        DEFAULT_IMAGE
        Panoramic landscape photograph URL that is mathematically sliced across the three card panels. Also accepts imageSrc.

        cards
        SplitCard[]
        DEFAULT_CARDS
        Array of card data objects for the three panels. Also accepts items.

        scrollSpeed
        number | "slow" | "normal" | "fast"
        1
        Optional speed multiplier for mousewheel and touch scroll progression. Smaller numbers like 0.6 or "slow" make the animation slower and more granular. Also accepts speed.

        headerTitle
        string
        "Explore"
        Primary headline displayed prominently at the top above the split cards stage.

        headerSubtitle
        string
        "Scroll down to reveal..."
        Supporting instructional or narrative subtext displayed beneath the header title.

        containerHeight
        string
        undefined
        Optional height override for the stage container. By default uses responsive heights: 460px on mobile, 620px on small, 650px on medium, and 710px on large screens.

        enableScrollIndicator
        boolean
        true
        Controls whether to display the animated mouse scroll indicator pill at the top.

        className
        string
        ""
        Additional CSS classes applied to the root outer container.

### SplitCard Item Properties

        Property
        Type
        Default
        Description

        title
        string
        Required
        Main editorial display headline rendered on the card's back face.

        description
        string
        Required
        Narrative storytelling copy describing the chapter or feature.

        tag
        string
        "CHAPTER"
        Category pill label badge rendered at the top-left of the back face. Also accepts kicker.

        number
        string
        "01", "02", "03"
        Index label rendered at the top-right of the card.

        metric
        string
        undefined
        Prominent stat, elevation, or milestone callout value (e.g. "1,496 M").

        metricLabel
        string
        "METRIC"
        Label displayed directly above the prominent metric number.

        location
        string
        undefined
        Geographic location or sub-region rendered in the bottom footer row.

        backgroundColor
        string
        "#13352F"
        Background color of the card back face. Also accepts bgColor.

        textColor
        string
        "#E6F4F1"
        Text color for clear contrast against the card background.

---

**Component Path:** `[framework]\scroll-split-cards\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
