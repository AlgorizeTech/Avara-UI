---
title: "Shadcn Item"
description: "Shadcn Item. A structured content row and card layout (`ItemBlock`) with `title`, optional `media`."
url: https://avaraui.com/docs/nextjs/item
---

# Shadcn Item

A structured content row and card layout (`ItemBlock`) with `title`, optional `media`, `description` and `actions` slots in four variants: `default`, `compact`, `bordered` and `card`.

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

## Item

- Pass `title` plus an optional `description`, and a `media` slot on the leading edge.

```tsx
import { ItemBlock } from "@/components/custom/blocks/ItemBlock";
import { Settings } from "lucide-react";

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

## Card

- Set `variant="card"` to stack the slots vertically and pin `actions` to the bottom instead of the side.

```tsx
import { ItemBlock } from "@/components/custom/blocks/ItemBlock";
import { Settings } from "lucide-react";

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

## About Shadcn Item

**What it is.** `ItemBlock` is a slot-based row and card primitive (`title`, `description`, `media`, `actions`). Four `variant` values cover it: `default` and `compact` are borderless rows, `bordered` is a row inside a bordered card, and `card` stacks the slots vertically.

**How it is built.** It is one function component that renders a `div`, or a `button` when you pass `onClick`. The slots lay out with flexbox and use theme tokens (`bg-card`, `text-muted-foreground`, `border-border`), so it needs no extra dependency beyond the `cn` helper.

**When to use it.** Use `ItemBlock` for settings rows, notification feeds, user listings and simple feature cards. For multi-section cards with headers and footers, use [Card](https://avaraui.com/docs/reactjs/card).

## For AI agents

**When to use**

- Horizontal list or settings rows (`default`, `compact`, `bordered`) and vertical feature cards (`card`) with `media`, `title`, `description` and `actions` slots

**When not to use**

- Full multi-slot cards with headers, footers, or ecommerce badges: use [Card](https://avaraui.com/docs/reactjs/card)

**Agent notes**

- Named export: `import { ItemBlock } from "@/components/custom/blocks/ItemBlock"`. The `ItemVariant` and `ItemBlockProps` types are exported too.
- `title` is the only required prop; `media`, `description` and `actions` are optional slots. Other HTML attributes are passed to the root element.
- Passing `onClick` turns the root into a `<button type="button">`. Do not put buttons or links in `actions` of a clickable item, because that nests interactive elements.
- `title` is truncated to one line except in the `card` variant, so pass short titles for rows.

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

## Works with other components

- Stack `ItemBlock` rows inside [Scroll Area](https://avaraui.com/docs/reactjs/scroll-area) or [Card](https://avaraui.com/docs/reactjs/card) settings panels.
- Place [Button](https://avaraui.com/docs/reactjs/button), [Toggle](https://avaraui.com/docs/reactjs/toggle), or [Copy Button](https://avaraui.com/docs/reactjs/copy-button) inside the `actions` slot.

## How does variant="card" change ItemBlock's layout?

`variant="card"` stacks `media`, the text and `actions` vertically inside a rounded, bordered card. The `actions` row spans the full width, sits at the bottom with a top border, and the title wraps instead of truncating. The description is clamped to three lines, so the card drops into a grid.

## What is the difference between the default, compact and bordered variants?

All three are horizontal rows. `default` has `p-4` padding and no border, `compact` uses tighter `p-2.5` padding with smaller text and a one-line description, and `bordered` adds a border, `bg-card` background and shadow. Pick `compact` for dense lists and `bordered` for stand-alone rows.

## How do I make an ItemBlock clickable?

Pass an `onClick` handler. `ItemBlock` then renders a `<button type="button">` instead of a `div`, adds hover styling and a `focus-visible` ring, and the `card` variant lifts slightly on hover. Without `onClick` the root stays a plain `div`, so it adds no tab stop.

## Can I put a button inside the actions slot of a clickable ItemBlock?

Avoid it. With `onClick` set, the whole item is a `<button>`, so a `Button` in `actions` nests one button in another, which is invalid HTML. The `actions` wrapper does stop click propagation, but for rows with controls, leave `onClick` off and attach handlers to the controls.

## Does ItemBlock truncate long titles and descriptions?

Yes, except in `card`. The title uses `truncate` and stays on one line, while the `compact` description is clamped to one line. In the `card` variant the title wraps and the description clamps at three lines. Slot content is yours, so size media to fit.

---

Live previews and every example: https://avaraui.com/docs/nextjs/item
