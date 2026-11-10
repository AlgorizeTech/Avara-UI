---
title: "Shadcn Draggable Card List"
description: "Shadcn Draggable Card List. A card list you reorder by dragging, with spring motion in a GSAP build and a Motion build, grip handles."
url: https://avaraui.com/docs/nextjs/draggable-card-list
---

# Shadcn Draggable Card List

An interactive, fluid **Draggable Card List** component featuring spring-driven reordering (in a GSAP build and a Motion build that move identically), right-side grip handles, light pastel badges with borders, left accent bars, and dynamic hover border color shifts.

## For AI agents

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

## Variations

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

## Features

- **Butter-Smooth Spring Reordering**: Cards lift, swap and glide into place on springs. Ships as a GSAP build (the default) and a Motion build on its `Reorder` engine — pick either from the Code tab; both reorder on the same rules with the same springs.
- **2 Distinct Card Variants**: Supports `"classic"` (clean cards with border hover shift) and `"modern"` (ambient gradient tone with glowing accent strip & separated footer).
- **Dynamic Hover Border Shift**: Automatically highlights each card's border matching its individual accent color upon hover.
- **Subtle Pastel Badges**: Lightweight semi-transparent badge backgrounds with subtle borders (`bg-amber-500/10 text-amber-700 border border-amber-500/30`).
- **Right-Side Grip Handles**: Dedicated drag handles prevent accidental drag triggers on text selection.

## Props Reference: DraggableCardList

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

---

Live previews and every example: https://avaraui.com/docs/nextjs/draggable-card-list
