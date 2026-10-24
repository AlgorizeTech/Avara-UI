export const metadata = docsPageMetadata("modern-scroll-stack");

# Modern Scroll Stack

A tactile scroll-driven card stacking section where individual service cards slide up from the bottom of the viewport with staggered horizontal offsets and smoothly tilt into organic resting angles (`0°`, `+3.5°`, `-4.5°`, `+3.5°`) as they lock into the sticky deck.

Scroll inside the preview container below to watch each card rise over the previous one and fan out across the stage.

export const usageServiceCards = `import { ModernScrollStack } from "@/components/custom/blocks/ModernScrollStackBlock";

export default function ServiceCardsExample() {
  return (

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/modern-scroll-stack
```

## Features

    Scroll-Linked Tilt Physics
    Cards enter flat at the bottom of the viewport and smoothly interpolate their rotation using an ease-out curve as they approach the sticky lock position.

    Horizontal Fan Cascade
    Each card is offset along the X-axis so all stacked cards remain partially visible, creating a physical hand-dealt card deck aesthetic.

    Responsive Container Clamping
    A built-in ResizeObserver automatically scales the horizontal fan offset and card dimensions on tablet and mobile viewports so cards never overflow horizontally.

    Zero External Animation Dependencies
    Powered by native CSS position: sticky and requestAnimationFrame transforms for silky 60fps performance without heavy runtime libraries.

## Props Reference

### ModernScrollStack Props

        Prop
        Type
        Default
        Description

        items
        ModernScrollStackItem[]
        DEFAULT_MODERN_SCROLL_STACK_ITEMS
        Array of card items to render in the scroll stack. Defaults to the 4 Demo 1 service cards (Web Design, Content Strategy, SEO &amp; Growth, Brand Identity).

        eyebrow
        string
        "DEMO 1"
        Small uppercase accent label displayed above the main heading.

        heading
        string
        "Service cards"
        Main section heading displayed above the card stack.

        subheading
        string
        "Highlight what you offer..."
        Supporting description text displayed below the heading.

        showHeader
        boolean
        true
        Controls whether the section header block (eyebrow, heading, subheading) is rendered.

        cardOffsetX
        number
        78
        Horizontal step in pixels between consecutive cards in the stack on desktop screens. Automatically clamped on narrow screens.

        cardGap
        number
        48
        Vertical distance in pixels between cards in the scroll track before they stack.

        stickyTop
        number
        72
        Top offset in pixels where each card locks into place while scrolling.

        cardWidth
        number
        316
        Width of each service card in pixels on desktop viewports.

        cardHeight
        number
        376
        Height of each service card in pixels on desktop viewports.

        scrollerRef
        React.RefObject&lt;HTMLElement | null&gt;
        undefined
        Optional ref to a custom scroll container when embedding the stack inside a fixed-height scrollable box. Omit on full-window pages.

        className
        string
        undefined
        Additional CSS classes applied to the outer section element.

### ModernScrollStackItem Properties

        Property
        Type
        Default
        Description

        id
        string
        Required
        Unique identifier for the card item.

        title
        string
        Required
        Service title displayed in bold near the bottom of the card.

        description
        string
        Required
        Short service description displayed beneath the card title.

        bgColor
        string
        "#F6F3EE"
        Background color of the card (any valid CSS color value).

        textColor
        string
        "#3E2718"
        Text and SVG stroke color for the card content.

        icon
        React.ReactNode
        undefined
        Custom SVG or icon node displayed in the top-left corner of the card.

        image
        string
        undefined
        Optional image URL displayed in the top-left corner instead of icon.

        rotation
        number
        0 | 3.5 | -4.5 | 3.5
        Target resting tilt angle in degrees once the card locks into the sticky stack.

---

**Component Path:** `[framework]\modern-scroll-stack\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
