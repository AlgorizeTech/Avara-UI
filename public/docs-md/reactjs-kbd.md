---
title: "Kbd (Keyboard)"
description: "A specialized typography component used to display keyboard buttons, shortcuts, and commands. Free shadcn/ui Kbd component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/kbd
---

# Kbd (Keyboard)

A specialized typography component used to display keyboard buttons, shortcuts, and commands.

Displaying keyboard shortcuts to power users is a critical part of modern web design (especially in tools like Command Menus). The `KbdBlock` uses a native `<kbd>` HTML element for strict semantic accuracy, and applies a precise combination of borders, background colors, and inset shadows to simulate a physical, tactile keyboard key.

Explore the different variations of the Kbd component — each example shows a live preview with the exact code to copy.

## Kbd

A single key, rendered as a semantic `<kbd>` element.

- `children` is the key glyph — the component adds no label text of its own.

```tsx
import { Kbd } from "@/components/custom/blocks/KbdBlock";

export default function BasicKbd() {
  return <Kbd>⌘</Kbd>;
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/kbd.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/kbd
```

## Examples

### Combinations

- `children` holds one key each — sequence several `Kbd` elements side by side to spell out a shortcut.

```tsx
import { Kbd } from "@/components/custom/blocks/KbdBlock";

export default function ShortcutList() {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-medium text-muted-foreground mb-2">Common Combinations</p>

      <div className="flex items-center gap-2 text-foreground/80">
        <span className="text-sm">Save file:</span>
        <div className="flex items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </div>
      </div>

      <div className="flex items-center gap-2 text-foreground/80">
        <span className="text-sm">Force Reload:</span>
        <div className="flex items-center gap-1">
          <Kbd>⇧</Kbd>
          <Kbd>⌘</Kbd>
          <Kbd>R</Kbd>
        </div>
      </div>

      <div className="flex items-center gap-2 text-foreground/80">
        <span className="text-sm">Open Terminal:</span>
        <div className="flex items-center gap-1">
          <Kbd>Ctrl</Kbd>
          <span className="text-xs text-muted-foreground">+</span>
          <Kbd>~</Kbd>
        </div>
      </div>
    </div>
  );
}
```

### Inline in text

- `size="sm"` keeps keys on the text baseline so they read naturally inside prose.

```tsx
import { Kbd } from "@/components/custom/blocks/KbdBlock";

export default function InlineShortcut() {
  return (
    <p className="text-sm leading-7">
      Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette, or{" "}
      <Kbd>Esc</Kbd> to dismiss it.
    </p>
  );
}
```

## Usage

You can use the component independently, or string multiple together to represent complex key combinations.

```tsx
import { Kbd } from "@/components/custom/blocks/KbdBlock";

export default function ShortcutHint() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>To open the command palette, press</span>
      <div className="flex items-center gap-1">
        <Kbd title="Command">⌘</Kbd>
        <Kbd title="K">K</Kbd>
      </div>
    </div>
  );
}
```

## Features
Learn about the Kbd component's typography styles for displaying keyboard shortcuts and command instructions consistently.

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
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | Controls the height, padding, and font-size of the key element. |
| `className` | `string` | `undefined` | Standard Tailwind CSS overrides. Useful for adding specific margin or overriding the shadow if needed. |
| `...props` | `HTMLAttributes<HTMLElement>` | `{}` | Accepts all standard HTML attributes for a native `<kbd>` element, including `title` or `aria-label` for accessibility. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/kbd
