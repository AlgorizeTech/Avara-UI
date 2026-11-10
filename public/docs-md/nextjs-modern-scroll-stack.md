---
title: "Shadcn Modern Scroll Stack"
description: "A scroll-driven section where service cards slide up from the bottom of the viewport, offset and tilted, and stack into a sticky deck. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/modern-scroll-stack
---

# Shadcn Modern Scroll Stack

A tactile scroll-driven card stacking section where individual service cards slide up from the bottom of the viewport with staggered horizontal offsets and smoothly tilt into organic resting angles (`0°`, `+3.5°`, `-4.5°`, `+3.5°`) as they lock into the sticky deck.

Scroll inside the preview container below to watch each card rise over the previous one and fan out across the stage.

## For AI agents

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/modern-scroll-stack

**When to use it.** A scroll-driven section where service cards rise from the bottom of the viewport and tilt into organic resting angles as they lock into a sticky stack, in two arrangements.

**When to use something else:**

- [Scroll Stack](https://avaraui.com/docs/nextjs/scroll-stack): for the other scroll-stack designs, such as sticky stacks, fan stacks and scroll accordions.

**Gotchas:**

- Both are looks of the one `modern-scroll-stack` item: install it once and set `variant` from the index.

### The 2 variants

1. **Horizontal fan** (`fan`): Cards spread horizontally across the stage as each rises, so earlier cards stay visible beneath.
   - Live: https://avaraui.com/view/modern-scroll-stack/fan
   - Best for: a services section where every card should stay partly visible
   - Avoid if: you want the cards piled in one spot
   - Traits: horizontal spread, 78px offset per card by default, tilted resting angles
   - Install: `npx shadcn@latest add @avara-ui/modern-scroll-stack`
   - Set these props: `{"variant":"fan"}`
   - Docs: https://avaraui.com/docs/nextjs/modern-scroll-stack#service-cards-horizontal-fan
2. **Centred pile** (`stacked`): All cards lock at the centre on top of one another, each tilted so the layers peek out around the edges.
   - Live: https://avaraui.com/view/modern-scroll-stack/stacked
   - Best for: a compact pile that reads as a deck of cards
   - Avoid if: you want each card's content to stay visible as the next arrives
   - Traits: centred pile, distinct tilt per card
   - Install: `npx shadcn@latest add @avara-ui/modern-scroll-stack`
   - Set these props: `{"variant":"stacked"}`
   - Docs: https://avaraui.com/docs/nextjs/modern-scroll-stack#centered-stacked-pile

## Service cards (Horizontal Fan)

Each card slides up flat from the bottom-center and glides into its horizontal fan slot with a smooth tilt.

- Fan Variant `variant="fan"` spreads cards horizontally across the stage as each card rises into the sticky stack.
- Horizontal Cascade Step `cardOffsetX=78` shifts each subsequent card by 78px so earlier cards remain visible underneath in a fanned horizontal row.
- Card Vertical Spacing `cardGap=48` spaces consecutive cards by 48px in the vertical scroll track before they stack.
- Scroll-Linked Tilt Interpolation `rotation` keeps each incoming card flat (0°) near the bottom of the viewport and smoothly eases into its target resting angle as it reaches stickyTop.

```tsx
import { ModernScrollStack } from "@/components/custom/blocks/ModernScrollStackBlock";

export default function ServiceCardsExample() {
  return (
    <main className="min-h-screen bg-background">
      <ModernScrollStack variant="fan" />
    </main>
  );
}
```

## Centered Stacked Pile

Cards rise straight up the center and stack directly on top of one another with alternating angled tilts so every card's edges peek out behind the deck.

- Stacked Variant `variant="stacked"` locks all cards at x = 0px in the center directly on top of one another.
- Layered Deck Angles `rotation=0° / -6.5° / -2.5° / +6.5°` tilts each overlapping card at a distinct angle so all four colorful layers peek out around the edges of the pile.
- Card Vertical Spacing `cardGap=48` spaces consecutive cards by 48px in the vertical scroll track before they stack.

```tsx
import { ModernScrollStack } from "@/components/custom/blocks/ModernScrollStackBlock";

export default function StackedCardsExample() {
  return (
    <main className="min-h-screen bg-background">
      <ModernScrollStack variant="stacked" />
    </main>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/modern-scroll-stack.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/modern-scroll-stack
```

## Features

### Scroll-Linked Tilt Physics

Cards enter flat at the bottom of the viewport and smoothly interpolate their rotation using an ease-out curve as they approach the sticky lock position.

### Horizontal Fan Cascade

Each card is offset along the X-axis so all stacked cards remain partially visible, creating a physical hand-dealt card deck aesthetic.

### Responsive Container Clamping

A built-in `ResizeObserver` automatically scales the horizontal fan offset and card dimensions on tablet and mobile viewports so cards never overflow horizontally.

### Zero External Animation Dependencies

Powered by native CSS `position: sticky` and `requestAnimationFrame` transforms for silky 60fps performance without heavy runtime libraries.

## Props Reference

### ModernScrollStack Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"fan" \| "stacked"` | `"fan"` | Selects the stacking layout: `"fan"` spreads cards horizontally across the stage, while `"stacked"` piles cards directly on top of one another in the center with alternating tilts. |
| `items` | `ModernScrollStackItem[]` | `DEFAULT_MODERN_SCROLL_STACK_ITEMS` | Array of card items to render in the scroll stack. Defaults to the 4 Demo 1 service cards (Web Design, Content Strategy, SEO &amp; Growth, Brand Identity). |
| `eyebrow` | `string` | `"DEMO 1"` | Small uppercase accent label displayed above the main heading. |
| `heading` | `string` | `"Service cards"` | Main section heading displayed above the card stack. |
| `subheading` | `string` | `"Highlight what you offer..."` | Supporting description text displayed below the heading. |
| `showHeader` | `boolean` | `true` | Controls whether the section header block (eyebrow, heading, subheading) is rendered. |
| `cardOffsetX` | `number` | `78` | Horizontal step in pixels between consecutive cards in the stack on desktop screens. Automatically clamped on narrow screens. |
| `cardGap` | `number` | `48` | Vertical distance in pixels between cards in the scroll track before they stack. |
| `stickyTop` | `number` | `72` | Top offset in pixels where each card locks into place while scrolling. |
| `cardWidth` | `number` | `316` | Width of each service card in pixels on desktop viewports. |
| `cardHeight` | `number` | `376` | Height of each service card in pixels on desktop viewports. |
| `scrollerRef` | `React.RefObject<HTMLElement \| null>` | `undefined` | Optional ref to a custom scroll container when embedding the stack inside a fixed-height scrollable box. Omit on full-window pages. |
| `className` | `string` | `undefined` | Additional CSS classes applied to the outer section element. |

### ModernScrollStackItem Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | Required | Unique identifier for the card item. |
| `title` | `string` | Required | Service title displayed in bold near the bottom of the card. |
| `description` | `string` | Required | Short service description displayed beneath the card title. |
| `bgColor` | `string` | `"#F6F3EE"` | Background color of the card (any valid CSS color value). |
| `textColor` | `string` | `"#3E2718"` | Text and SVG stroke color for the card content. |
| `icon` | `React.ReactNode` | `undefined` | Custom SVG or icon node displayed in the top-left corner of the card. |
| `image` | `string` | `undefined` | Optional image URL displayed in the top-left corner instead of `icon`. |
| `rotation` | `number` | `0 \| 3.5 \| -4.5 \| 3.5` | Target resting tilt angle in degrees once the card locks into the sticky stack. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/modern-scroll-stack
