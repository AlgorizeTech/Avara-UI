---
title: "Shadcn Modern Scroll Stack"
description: "A scroll-driven section where service cards slide up from the bottom of the viewport, offset and tilted, and stack into a sticky deck. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/modern-scroll-stack
---

# Shadcn Modern Scroll Stack

A zero-dependency scroll-driven card stack (`ModernScrollStack`) using CSS `position: sticky` and `requestAnimationFrame` in `fan` and `stacked` variants.

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

## About Shadcn Modern Scroll Stack

**What it is.** `ModernScrollStack` renders scroll-linked sticky cards in `variant="fan"` (horizontal cascade with `cardOffsetX`) or `variant="stacked"` (centered alternating-angle pile).

**How it is built.** Uses native CSS `position: sticky`, `requestAnimationFrame` transforms, and a `ResizeObserver` that clamps offsets on tablet/mobile viewports — zero external animation libraries.

**When to use it.** Use `ModernScrollStack` for lightweight, dependency-free sticky card stacks. For GSAP ScrollTrigger timelines with 5 specialized layouts, use [Scroll Stack](https://avaraui.com/docs/nextjs/scroll-stack).

## For AI agents

**When to use**

- Zero-dependency sticky scroll stacks in horizontal fan (`variant="fan"`) or centered pile (`variant="stacked"`) layouts

**When not to use**

- GSAP ScrollTrigger scrubbed stacks — use [Scroll Stack](https://avaraui.com/docs/nextjs/scroll-stack)
- Panoramic 3D flipping cards — use [Scroll Split Cards](https://avaraui.com/docs/nextjs/scroll-split-cards)

**Agent notes**

- Named export: `import { ModernScrollStack } from "@/components/custom/blocks/ModernScrollStackBlock"`
- `cardOffsetX` (default `78`) sets the horizontal fan spacing and only applies to `variant="fan"`; `variant="stacked"` forces it to 0. `cardGap` (default `48`) is the vertical scroll distance between cards.
- The section header is off by default. Pass `showHeader` together with `eyebrow`, `heading` or `subheading`, which have no built-in text.
- Each variant has its own default `items`. Pass `items` of `ModernScrollStackItem` (`id`, `title` and `description` required) to replace them. `stat` and `badge` render only in the stacked variant, and `image` only in the fan variant.
- Inside a fixed-height scrollable box, pass `scrollerRef` pointing at that element; without it the stack follows window scroll.

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

## Props Reference

### ModernScrollStack Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"fan" \| "stacked"` | `"fan"` | Selects the stacking layout: `"fan"` spreads cards horizontally across the stage, while `"stacked"` piles cards directly on top of one another in the center with alternating tilts. |
| `items` | `ModernScrollStackItem[]` | `DEFAULT_MODERN_SCROLL_STACK_ITEMS` (fan) or `DEFAULT_STACKED_SCROLL_STACK_ITEMS` (stacked) | Array of card items to render in the scroll stack. The fan defaults are AI Automation, Product Strategy, Cloud Architecture and Interactive Motion; the stacked defaults are four stat cards (10x, 99.9%, 48h, 4.9★). |
| `eyebrow` | `string` | `undefined` | Small uppercase accent label displayed above the main heading. |
| `heading` | `string` | `undefined` | Main section heading displayed above the card stack. |
| `subheading` | `string` | `undefined` | Supporting description text displayed below the heading. |
| `showHeader` | `boolean` | `false` | Controls whether the section header block (eyebrow, heading, subheading) is rendered. |
| `cardOffsetX` | `number` | `78` | Horizontal step in pixels between consecutive cards in the stack on desktop screens. Automatically clamped on narrow screens. |
| `cardGap` | `number` | `48` | Vertical distance in pixels between cards in the scroll track before they stack. |
| `stickyTop` | `number` | `72` | Top offset in pixels where each card locks into place while scrolling. |
| `cardWidth` | `number` | `316` (fan) or `430` (stacked) | Width of each card in pixels on desktop viewports. |
| `cardHeight` | `number` | `376` (fan) or `308` (stacked) | Height of each card in pixels on desktop viewports. |
| `scrollerRef` | `React.RefObject<HTMLElement \| null>` | `undefined` | Optional ref to a custom scroll container when embedding the stack inside a fixed-height scrollable box. Omit on full-window pages. |
| `className` | `string` | `undefined` | Additional CSS classes applied to the outer section element. |

### ModernScrollStackItem Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | Required | Unique identifier for the card item. |
| `title` | `string` | Required | Card title. In the fan variant it sits at the bottom of the card; in the stacked variant it sits in the centre under the stat. |
| `description` | `string` | Required | Short service description displayed beneath the card title. |
| `bgColor` | `string` | `"#F7C844"` | Background color of the card (any valid CSS color value). |
| `textColor` | `string` | `"#2B1C06"` | Text color for the card content. |
| `icon` | `React.ReactNode` | `undefined` | Custom SVG or icon node displayed in the top-left corner of the card. |
| `image` | `string` | `undefined` | Optional image URL displayed in the top-left corner instead of `icon`. Used by `variant="fan"` only. |
| `stat` | `string` | `undefined` | Large callout figure shown in the centre of the card. Used by `variant="stacked"` only. |
| `badge` | `string` | `"0N · HIGHLIGHT"` | Pill label at the top of the card. Used by `variant="stacked"` only; the default is built from the card position. |
| `rotation` | `number` | By index: `0, 3.5, -4.5, 3.5` (fan) or `0, -6.5, -2.5, 6.5` (stacked) | Target resting tilt angle in degrees once the card locks into the sticky stack. |

## Works with other components

- [Scroll Stack](https://avaraui.com/docs/nextjs/scroll-stack) covers the GSAP ScrollTrigger version with scrubbed 3D layouts.
- [Scroll Split Cards](https://avaraui.com/docs/nextjs/scroll-split-cards) is the scroll-driven panel that splits an image and flips into cards.
- [Card Stack](https://avaraui.com/docs/nextjs/card-stack) is a swipeable deck driven by drag and buttons rather than page scroll.

## How do I switch ModernScrollStack between the fan and stacked layouts?

Set `variant` to `"fan"` or `"stacked"`. The fan cascades cards sideways by `cardOffsetX` and the stacked variant piles them in the centre with alternating tilts. Each variant also loads its own default cards, so switching `variant` changes the content unless you pass `items`.

## How do I add my own cards to ModernScrollStack?

Pass `items` as an array of `ModernScrollStackItem`. Each needs an `id`, `title` and `description`. Add `bgColor`, `textColor`, `icon` or `rotation` to style it, plus `stat` and `badge` for the stacked variant. Omitting `rotation` falls back to a built-in angle per position.

## Why is the heading on ModernScrollStack not showing?

`showHeader` defaults to `false`, so the header block is not rendered. Set `showHeader` and pass `eyebrow`, `heading` and `subheading`. None of them have built-in text, and each one renders only when you supply a value.

## How do I use ModernScrollStack inside a scrollable box instead of the page?

Pass a ref to that element as `scrollerRef`. The stack then measures the box's height, listens to its scroll events and smooths mouse-wheel steps inside it. Without `scrollerRef` it tracks the window scroll, which suits full-page sections.

## Does ModernScrollStack adapt to narrow screens?

Yes. It measures its own container width. Below 640px it caps `stickyTop` at 56 and `cardGap` at 40, and below 480px at 44 and 32. Card width shrinks to fit, and the fan's `cardOffsetX` is reduced so every card stays inside the container.

## Does ModernScrollStack require GSAP or Motion?

No. `ModernScrollStack` uses native CSS `position: sticky`, `ResizeObserver` and `requestAnimationFrame`, so no animation library is installed. The registry item pulls in only the shared `utils` helper, and the file has no `next/*` imports, so it works in Next.js and Vite.

---

Live previews and every example: https://avaraui.com/docs/nextjs/modern-scroll-stack
