---
title: "Shadcn Item"
description: "A versatile layout component for displaying structured content featuring media, titles, descriptions, and actions. Free shadcn/ui Item component."
url: https://avaraui.com/docs/nextjs/item
---

# Shadcn Item

A versatile layout component for displaying structured content featuring media, titles, descriptions, and actions.

Instead of writing complex Flexbox or Grid classes every time you need to build a notification row, a settings item, a user listing, or a simple feature card, `ItemBlock` handles all the responsive alignments and spacing automatically. It dynamically transforms between horizontal rows and vertical cards based on the `variant` prop.

`title` is the only required prop — `media`, `description` and `actions` are slots you fill as needed.

## For AI agents

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/item

**When to use it.** A layout component for structured content with a media slot, a title, a description and actions, for notification rows, settings items, user listings and small feature cards.

**Gotchas:**

- Both are looks of the one `item` item: install it once and set `variant` from the index.
- Whether the media, description and actions appear is controlled by props (`showMedia`, `showDescription`, `showActions`), not by choosing a different design.

### The 2 variants

1. **Row** (`default`): A row: the media on the leading edge, then the title and description, with actions at the side.
   - Live: https://avaraui.com/view/item/default
   - Best for: lists such as notifications, settings and user listings
   - Avoid if: you want a stacked tile with the actions at the bottom
   - Traits: horizontal row, default look
   - Install: `npx shadcn@latest add @avara-ui/item`
   - Set these props: `{"variant":"default"}`
   - Docs: https://avaraui.com/docs/nextjs/item#item
2. **Card** (`card`): The slots stack vertically and the actions are pinned to the bottom instead of the side.
   - Live: https://avaraui.com/view/item/card
   - Best for: a small feature card or tile
   - Avoid if: you want a compact list row
   - Traits: stacked slots, actions at the bottom
   - Install: `npx shadcn@latest add @avara-ui/item`
   - Set these props: `{"variant":"card"}`
   - Docs: https://avaraui.com/docs/nextjs/item#card

## Item

- Pass `title` plus an optional `description`, and a `media` slot on the leading edge.

```tsx
import { ItemBlock } from "@/components/custom/blocks/ItemBlock";

export default function SettingsRow() {
  return (
    <ItemBlock
      variant="default"
      title="System Configuration"
      description="Manage your environment variables, build settings, and deployment hooks for this specific project instance."
      media={
        <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-full">
          <Settings className="w-5 h-5" />
        </div>
      }
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/item.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/item
```

## Examples

### Card

- Set `variant="card"` to stack the slots vertically and pin `actions` to the bottom instead of the side.

```tsx
import { ItemBlock } from "@/components/custom/blocks/ItemBlock";

export default function FeatureCard() {
  return (
    // "card" stacks the slots vertically and pins actions to the bottom —
    // drop it straight into a grid.
    <ItemBlock
      variant="card"
      title="System Configuration"
      description="Manage your environment variables, build settings, and deployment hooks for this specific project instance."
      media={
        <div className="w-14 h-14 flex items-center justify-center bg-primary/10 text-primary rounded-full">
          <Settings className="w-7 h-7" />
        </div>
      }
      actions={
        <button className="ml-auto px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg">
          Configure
        </button>
      }
    />
  );
}
```

## Features
Discover the Item component's structural layout features, designed for lists, dropdowns, and menus with proper spacing.

### Customizable

Easily adapt the component's styling and behavior to fit your application's unique design system.

### Accessible

Built with accessibility in mind, ensuring all users can interact with your application effectively.

### Responsive

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

### Performant

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

### Usage Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | `-` | The primary title text or element displayed in the item block (required). |
| `description` | `ReactNode` | `undefined` | Secondary description text or content displayed below the title. |
| `media` | `ReactNode` | `undefined` | Visual media element such as an icon, avatar, or thumbnail. |
| `actions` | `ReactNode` | `undefined` | Action elements like buttons or icons placed on the trailing edge or bottom. |
| `variant` | `"default" \| "compact" \| "card" \| "bordered"` | `"default"` | Applies structural layout and visual styling variant. |
| `onClick` | `() => void` | `undefined` | Optional click event handler. Transforms the container into an interactive button. |
| `className` | `string` | `undefined` | Additional CSS class names to apply custom styles. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/item
