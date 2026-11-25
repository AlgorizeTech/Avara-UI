---
title: "Shadcn Draggable Card List"
description: "Shadcn Draggable Card List. A card list you reorder by dragging, with spring motion in a GSAP build and a Motion build, grip handles."
url: https://avaraui.com/docs/nextjs/draggable-card-list
---

# Shadcn Draggable Card List

A reorderable card list with spring-driven dragging, grip handles and status badges, in GSAP and Motion builds.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/draggable-card-list.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/draggable-card-list
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add https://avaraui.com/r/draggable-card-list-motion.json
```

### Classic Card List

Reorderable cards with right-side drag grip handles, dynamic border hover color shift, and pastel bordered badges.

```tsx
import DraggableCardList, { type DraggableCardItem } from "@/components/custom/draggable-card-list";

const sampleCards: DraggableCardItem[] = [
  {
    id: "1",
    title: "System Performance Audit",
    description: "Optimize bundle splitting, reduce LCP to 0.8s, and tree-shake unused assets",
    date: "2026-08-30",
    badge: "PERFORMANCE",
    badgeStyle: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30",
    hoverBorderColor: "hover:border-amber-500/80 dark:hover:border-amber-400/80",
  },
  {
    id: "2",
    title: "Security Vulnerability Patch",
    description: "Upgrade dependencies, sanitize input payloads, and rotate API tokens",
    date: "2026-08-30",
    badge: "SECURITY",
    badgeStyle: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30",
    hoverBorderColor: "hover:border-emerald-500/80 dark:hover:border-emerald-400/80",
  },
  {
    id: "3",
    title: "UI Component Library Release",
    description: "Publish version 2.4 with dark mode token updates and accessible aria roles",
    date: "2026-08-30",
    badge: "LIBRARY",
    badgeStyle: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30",
    hoverBorderColor: "hover:border-purple-500/80 dark:hover:border-purple-400/80",
  },
  {
    id: "4",
    title: "Database Schema Migration",
    description: "Execute zero-downtime PostgreSQL indexing and partition query optimization",
    date: "2026-08-30",
    badge: "DATABASE",
    badgeStyle: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30",
    hoverBorderColor: "hover:border-blue-500/80 dark:hover:border-blue-400/80",
    linkText: "View database migration logs",
    linkUrl: "#",
  },
];

export default function DraggableCardListClassicDemo() {
  return (
    <DraggableCardList
      items={sampleCards}
      variant="classic"
    />
  );
}
```

### Modern Ambient Tint Card List

Reorderable cards with subtle ambient gradient tones, glowing left accent bar, separated footer, floating grip handles, and dynamic hover border color shift.

```tsx
import DraggableCardList, { type DraggableCardItem } from "@/components/custom/draggable-card-list";

const sampleCards: DraggableCardItem[] = [
  {
    id: "1",
    title: "System Performance Audit",
    description: "Optimize bundle splitting, reduce LCP to 0.8s, and tree-shake unused assets",
    date: "2026-08-30",
    badge: "PERFORMANCE",
    badgeStyle: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30",
    accentColor: "from-amber-400 via-orange-500 to-yellow-500",
    hoverBorderColor: "hover:border-amber-500/80 dark:hover:border-amber-400/80",
  },
  {
    id: "2",
    title: "Security Vulnerability Patch",
    description: "Upgrade dependencies, sanitize input payloads, and rotate API tokens",
    date: "2026-08-30",
    badge: "SECURITY",
    badgeStyle: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30",
    accentColor: "from-emerald-400 via-teal-500 to-cyan-500",
    hoverBorderColor: "hover:border-emerald-500/80 dark:hover:border-emerald-400/80",
  },
  {
    id: "3",
    title: "UI Component Library Release",
    description: "Publish version 2.4 with dark mode token updates and accessible aria roles",
    date: "2026-08-30",
    badge: "LIBRARY",
    badgeStyle: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30",
    accentColor: "from-purple-400 via-indigo-500 to-violet-500",
    hoverBorderColor: "hover:border-purple-500/80 dark:hover:border-purple-400/80",
  },
  {
    id: "4",
    title: "Database Schema Migration",
    description: "Execute zero-downtime PostgreSQL indexing and partition query optimization",
    date: "2026-08-30",
    badge: "DATABASE",
    badgeStyle: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30",
    accentColor: "from-blue-400 via-indigo-500 to-cyan-500",
    hoverBorderColor: "hover:border-blue-500/80 dark:hover:border-blue-400/80",
    linkText: "View database migration logs",
    linkUrl: "#",
  },
];

export default function DraggableCardListModernDemo() {
  return (
    <DraggableCardList
      items={sampleCards}
      variant="modern"
    />
  );
}
```

## About Shadcn Draggable Card List

**What it is.** **Shadcn Draggable Card List** (`DraggableCardList`) is a reorderable card list with grip handles (on the right by default, or the left with `dragHandlePosition`), optional status badges, and a hover border colour you set per card.

**How it is built.** Ships as a GSAP build (the default) and a Motion build on its `Reorder` engine — both lift, swap, and settle cards with spring physics and emit the updated item array via `onReorder`.

**When to use it.** Use it for task backlogs, priority queues, playlist tracks, and roadmap boards where users reorder rich multi-line cards without accidental drags during text selection.

**Features.**

- **Butter-Smooth Spring Reordering**: Cards lift, swap and glide into place on springs. Ships as a GSAP build (the default) and a Motion build on its `Reorder` engine — pick either from the Code tab; both reorder on the same rules with the same springs.
- **2 Distinct Card Variants**: Supports `"classic"` (clean cards with border hover shift) and `"modern"` (ambient gradient tone with glowing accent strip & separated footer).
- **Per-Card Hover Border**: Each item's `hoverBorderColor` (a Tailwind `hover:border-*` class) sets the border colour on hover, and falls back to `hover:border-primary/80`.
- **Pastel Badges**: Each item's `badge` text is styled by its `badgeStyle` class string, for example `bg-amber-500/10 text-amber-700 border border-amber-500/30`.
- **Grip Handles**: The `"modern"` variant starts a drag only from the grip handle, so text stays selectable. The `"classic"` variant also drags from anywhere on the card and disables text selection.

## For AI agents

**When to use**

- Task backlogs, priority queues, playlist tracks, and roadmap boards where users reorder rich multi-line cards without accidental drags during text selection

**When not to use**

- A single static card: use [Card](https://avaraui.com/docs/reactjs/card)
- Plain list rows that never reorder: use [Item](https://avaraui.com/docs/reactjs/item)

**Agent notes**

- `DraggableCardList` accepts `items` (`DraggableCardItem[]`), `variant` (`"classic" | "modern"`), `onReorder`, and `onToggleComplete`.
- `"modern"` cards drag only by their grip handle; `"classic"` cards drag from the whole card or the handle. `dragHandlePosition` moves the handle to the `"left"`.
- `items` seeds the list's own state, and `onReorder` receives the full re-ordered array on every swap during a drag, not only on drop.
- Install the GSAP build (`draggable-card-list`) or the Motion build (`draggable-card-list-motion`), not both.
- Use `variant="classic"` for clean bordered cards and `variant="modern"` for ambient gradient tints with a left accent bar.

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/draggable-card-list

**When to use it.** A reorderable card list with spring-driven dragging, right-side grip handles and left accent bars, in two card designs.

**Gotchas:**

- Both are looks of the one `draggable-card-list` item: install it once and set `variant` from the index.
- A Motion build (`draggable-card-list-motion`) is also published and behaves the same; use it only if the project already uses Motion rather than GSAP.

### The 2 variants

1. **Classic card list** (`classic`): Cards with light pastel badges with borders, left accent bars and hover border colours.
   - Live: https://avaraui.com/view/draggable-card-list/classic
   - Best for: a task or checklist list where each row is a distinct card
   - Avoid if: you want the cards tinted by an ambient colour
   - Traits: pastel badges, left accent bar, grip handle
   - Install: `npx shadcn@latest add @avara-ui/draggable-card-list`
   - Set these props: `{"variant":"classic"}`
   - Docs: https://avaraui.com/docs/nextjs/draggable-card-list#classic-card-list
2. **Modern ambient tint** (`modern`): The same draggable list with cards tinted by an ambient colour.
   - Live: https://avaraui.com/view/draggable-card-list/modern
   - Best for: a more modern, colourful look for the same kind of list
   - Avoid if: you want a neutral, pastel-badge style
   - Traits: ambient tint, grip handle
   - Install: `npx shadcn@latest add @avara-ui/draggable-card-list`
   - Set these props: `{"variant":"modern"}`
   - Docs: https://avaraui.com/docs/nextjs/draggable-card-list#modern-ambient-tint-card-list

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `DraggableCardItem[]` | `DEFAULT_ITEMS` | Array of card item objects to display and reorder. |
| `variant` | `"classic" \| "modern"` | `"classic"` | Design style variant of the cards. |
| `onReorder` | `(newItems: DraggableCardItem[]) => void` | `undefined` | Callback fired when the list order changes. |
| `onToggleComplete` | `(id: string \| number, completed: boolean) => void` | `undefined` | Callback fired when a card's completion checkbox is toggled. |
| `title` | `string` | `undefined` | Optional title heading text rendered above the list. |
| `subtitle` | `string` | `undefined` | Optional sub-heading text rendered under the title. |
| `dragHandlePosition` | `"right" \| "left"` | `"right"` | Position of the grip handle icon on each card. |
| `enableCheckboxes` | `boolean` | `false` | Toggles completion checkboxes on cards. |
| `enableBadges` | `boolean` | `true` | Toggles category badges on cards. |
| `className` | `string` | `undefined` | Classes for the outer container. |
| `cardClassName` | `string` | `undefined` | Classes merged onto every card. |

## Works with other components

Pair `DraggableCardList` with [Card](https://avaraui.com/docs/reactjs/card) for surrounding dashboard sections, [Item](https://avaraui.com/docs/reactjs/item) for compact non-draggable rows, and [Toast](https://avaraui.com/docs/reactjs/toast) to confirm saved order changes.

## Which part of a card starts a drag in DraggableCardList?

It depends on `variant`. A `"modern"` card starts a drag only from its grip handle, so its text stays selectable. A `"classic"` card drags from anywhere on the card, or the handle, and turns off text selection. `dragHandlePosition` places the handle on the `"right"` (default) or `"left"`.

## How do I save the new order from DraggableCardList?

Pass `onReorder`. It receives the whole re-ordered `DraggableCardItem[]`, and it fires on every swap while a card is being dragged, not once on release. Debounce your save call. `items` only seeds the list's internal state; passing a different array reference re-seeds it.

## Does DraggableCardList support both GSAP and Motion?

Yes. `draggable-card-list` is the GSAP build, with `gsap` and `lucide-react` as dependencies, and `draggable-card-list-motion` uses `motion`'s `Reorder`. Both install to `components/custom/draggable-card-list.tsx` with the same props, so pick one rather than both. Reordering follows the same rules in each: a card lifts, neighbours glide aside on springs, and it settles home on release.

## How do I add completion checkboxes to DraggableCardList?

Set `enableCheckboxes` and handle `onToggleComplete(id, completed)`. Each card then shows a circle button that flips its `completed` flag, strikes through the title and dims the card. Badges are on by default; hide them with `enableBadges={false}`, or style each with `badgeStyle`.

## How do I set each card's colours in DraggableCardList?

Set them per item. `accentColor` takes Tailwind gradient classes for the `"modern"` left bar, such as `from-amber-400 via-orange-500 to-yellow-500`. `hoverBorderColor` takes a `hover:border-*` class and `badgeStyle` the badge classes. Spell the full class names in your own source so Tailwind generates them.

## Can I reorder DraggableCardList with the keyboard?

No. Reordering uses pointer events only. The grip handle is a plain `div` with `aria-label="Drag to reorder"`, with no `tabIndex` or key handlers, so keyboard and screen-reader users cannot move cards. Provide separate move up and move down buttons if you need that.

---

Live previews and every example: https://avaraui.com/docs/nextjs/draggable-card-list
