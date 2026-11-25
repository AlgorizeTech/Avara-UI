---
title: "Shadcn Kbd"
description: "A semantic `<kbd>` typography component (`Kbd`) with a bordered keycap style for keyboard shortcuts and command hints. Free shadcn/ui Kbd component."
url: https://avaraui.com/docs/nextjs/kbd
---

# Shadcn Kbd

A semantic `<kbd>` typography component (`Kbd`) with a bordered keycap style for keyboard shortcuts and command hints.

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

## Kbd

A single key, rendered as a semantic `<kbd>` element.

- `children` is the key glyph — the component adds no label text of its own.

```tsx
import { Kbd } from "@/components/custom/blocks/KbdBlock";

export default function BasicKbd() {
  return <Kbd>⌘</Kbd>;
}
```

## Combinations

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

## Inline in text

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

## About Shadcn Kbd

**What it is.** `Kbd` renders a styled native `<kbd>` element for single keys (`⌘`, `K`, `Esc`), multi-key shortcut sequences and inline prose hints. It is a forwardRef component with three sizes, and the default is `sm`.

**How it is built.** A bordered, monospace keycap using the theme tokens `border-border`, `bg-muted` and `text-muted-foreground`, with a 1px bottom shadow that flips colour in dark mode. It is `pointer-events-none select-none`, so it is a label and never a control. It adds no npm dependency.

**When to use it.** Use `Kbd` inside command palettes, tooltips, search triggers and documentation prose wherever keyboard shortcuts are shown.

## For AI agents

**When to use**

- Displaying keyboard shortcuts (`⌘ K`, `Ctrl + ~`, `Esc`) in command menus, tooltips, or inline prose

**When not to use**

- Clickable buttons: use [Button](https://avaraui.com/docs/nextjs/button)

**Agent notes**

- Named export: `import { Kbd } from "@/components/custom/blocks/KbdBlock"`; there is no default export.
- One `Kbd` renders one key. For a combination, render several side by side and add any "+" separator yourself.
- `size` is `"sm"` (the default), `"md"` or `"lg"`, so inline prose usually needs no `size` prop at all.
- `Kbd` does not detect the platform. Choose `⌘` or `Ctrl` yourself.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | Controls the height, padding, and font-size of the key element. |
| `className` | `string` | `undefined` | Standard Tailwind CSS overrides. Useful for adding specific margin or overriding the shadow if needed. |
| `...props` | `HTMLAttributes<HTMLElement>` | `{}` | Accepts all standard HTML attributes for a native `<kbd>` element, including `title` or `aria-label` for accessibility. |

## Works with other components

- Pair `Kbd` inside [Command](https://avaraui.com/docs/nextjs/command) and [Command Palette](https://avaraui.com/docs/nextjs/command-palette) item rows and triggers.
- Put `Kbd` in [Tooltip](https://avaraui.com/docs/nextjs/tooltip) labels to surface keyboard shortcuts on hover.

## How do I show a shortcut like Cmd+K with Kbd?

Render one `Kbd` per key, side by side: `<Kbd>⌘</Kbd> <Kbd>K</Kbd>`. Each component draws a single keycap, and it does not insert separators between keys. If you want a visible "+", as in `Ctrl + ~`, add a small `span` between the keys yourself.

## What sizes does Kbd come in?

`size` takes `"sm"`, `"md"` or `"lg"`, and `"sm"` is the default. The sizes map to `h-5` with 10px text, `h-6` with `text-xs`, and `h-8` with `text-sm`. The default fits inside body text, so reach for `md` or `lg` only in larger UI such as a command bar.

## Can Kbd show Cmd on Mac and Ctrl on Windows?

Not by itself. `Kbd` prints whatever `children` you give it and has no platform detection. Read `navigator.platform` or a user-agent hint in your own code, ideally after mount to avoid a hydration mismatch, and pass `⌘` or `Ctrl` as the child.

## Is Kbd clickable or selectable?

No. The keycap carries `pointer-events-none select-none`, so it ignores clicks and its text cannot be highlighted. That keeps it a pure hint. For a shortcut that must be pressable, wrap it in a [Button](https://avaraui.com/docs/nextjs/button) and put the `Kbd` inside as a label.

## How do I restyle Kbd to match my theme?

Colours come from theme tokens (`border-border`, `bg-muted`, `text-muted-foreground`), so a theme change restyles it automatically. For a one-off, pass `className`. It is merged with `tailwind-merge` after the defaults, so `bg-primary text-primary-foreground` replaces the muted fill and text. Other HTML attributes, such as `aria-label`, pass to the `<kbd>`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/kbd
