---
title: "Shadcn Context Menu"
description: "Shadcn Context Menu. A portal-rendered right-click and long-press menu (`ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`."
url: https://avaraui.com/docs/nextjs/context-menu
---

# Shadcn Context Menu

A portal-rendered right-click and long-press menu (`ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`) with viewport collision clamping and shortcut hints.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/context-menu.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/context-menu
```

## Labels, shortcuts & disabled

`ContextMenuLabel` titles a group and `ContextMenuShortcut` right-aligns the hotkey.

- Set `disabled` on an item to fade it, drop its hover state and stop `onClick` firing.

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/custom/blocks/ContextMenuBlock";
import { Copy, Download, FileEdit, Scissors, Share2, Trash } from "lucide-react";

export default function DocumentMenu() {
  // The live preview raises a toast here; this logs instead so the snippet
  // needs nothing beyond the context menu itself.
  const run = (action: string) => console.log(action);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-full max-w-[280px] sm:max-w-lg min-h-[160px] sm:min-h-[220px] border-2 border-dashed border-foreground/20 bg-background rounded-2xl flex flex-col items-center justify-center p-5 sm:p-8 text-center transition-colors hover:border-primary/50 cursor-pointer">
        <div className="flex flex-col items-center justify-center w-full px-4">
          <h3 className="font-semibold text-xs sm:text-base text-foreground">
            Click / Right-Click / Touch Area
          </h3>
          <p className="text-[11px] sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
            Click or right-click (long-press on mobile) inside this box to open
            the context menu.
          </p>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-48 sm:w-64">
        <ContextMenuLabel>Document Actions</ContextMenuLabel>
        <ContextMenuItem onClick={() => run("Edit")}>
          <FileEdit className="w-4 h-4 mr-2" />
          Edit File
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => run("Download")}>
          <Download className="w-4 h-4 mr-2" />
          Download PDF
          <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => run("Share")}>
          <Share2 className="w-4 h-4 mr-2" />
          Share Link
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuLabel>Clipboard</ContextMenuLabel>
        <ContextMenuItem onClick={() => run("Copy")}>
          <Copy className="w-4 h-4 mr-2" />
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>

        {/* disabled dims the row and swallows the click */}
        <ContextMenuItem disabled>
          <Scissors className="w-4 h-4 mr-2" />
          Cut
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        {/* className restyles a single destructive row */}
        <ContextMenuItem
          onClick={() => run("Delete")}
          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

## About Shadcn Context Menu

**What it is.** `ContextMenu` (`ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`) intercepts `onContextMenu`, a left click and a 500 ms touch long-press to open a cursor-positioned action menu.

**How it is built.** Portals into `document.body` with `createPortal` (zero external dependencies) and clamps coordinates against viewport edges so menus never clip off-screen. It closes on `Escape`, an outside press, a scroll or an item click. The `ContextMenuShortcut` hint is display-only and does not bind a key.

**When to use it.** Use `ContextMenu` for right-click canvas, file-list, or row actions. For left-click dropdown panels, use [Popover](https://avaraui.com/docs/reactjs/popover); for top application menus, use [Menubar](https://avaraui.com/docs/reactjs/menubar).

## For AI agents

**When to use**

- Right-click and touch long-press menus on cards, rows, or canvas areas

**When not to use**

- Left-click trigger panels — use [Popover](https://avaraui.com/docs/reactjs/popover)
- Persistent top-bar menus — use [Menubar](https://avaraui.com/docs/reactjs/menubar)

**Agent notes**

- Named exports from `@/components/custom/blocks/ContextMenuBlock`
- The trigger also opens on a plain left click; pass your own `onClick` to `ContextMenuTrigger` to replace that handler
- `ContextMenuShortcut` only renders a hint, so wire the real hotkey yourself
- Set `color` on `ContextMenu` and `variant` (`"default"`, `"minimal"` or `"glass"`) on `ContextMenuContent`
- Pass `disabled` on `ContextMenuItem` to dim the row and prevent `onClick`

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `ContextMenu` | `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "blue" \| "zinc" \| string` | `"primary"` | Applies theme accent color to item hover states and trigger container focus/hover borders. Accepts the preset names or a custom string starting with `#`, `rgb` or `hsl`. |
| `ContextMenuTrigger` | `className` | `string` | `undefined` | Standard Tailwind CSS overrides for the boundary container that intercepts the right-click event. |
| `ContextMenuContent` | `variant` | `"default" \| "minimal" \| "glass"` | `"default"` | Surface style of the floating menu: solid popover, lightly blurred, or heavily blurred glass. |
| `ContextMenuContent` | `className` | `string` | `undefined` | Standard Tailwind CSS overrides for the floating menu card. By default, you usually want to set a width here (e.g., `w-64` ). |
| `ContextMenuItem` | `disabled` | `boolean` | `false` | If true, the item becomes slightly transparent, ignores hover effects, and prevents `onClick` events from firing. |
| `ContextMenuItem` | `onClick` | `(e: React.MouseEvent) => void` | `undefined` | Event handler fired when the user left-clicks the item. Clicking an item automatically closes the context menu. |
| `ContextMenuItem` | `inset` | `boolean` | `false` | If true, adds left padding to the item. This is incredibly useful when aligning text items with other items that have icons. |
| `ContextMenuLabel` | `inset` | `boolean` | `false` | If true, adds left padding to match the alignment of inset menu items. |
| All Components | `...props` | `HTMLAttributes` | `{}` | Standard HTML attributes for their respective underlying `<div>` elements. |

## Works with other components

- Pair `ContextMenu` with [Table](https://avaraui.com/docs/reactjs/table) rows or [Folder](https://avaraui.com/docs/reactjs/folder) cards for row and file actions.
- Use [Popover](https://avaraui.com/docs/reactjs/popover) for a left-click panel and [Menubar](https://avaraui.com/docs/reactjs/menubar) for a persistent top menu.
- Show hotkey hints next to items with [Kbd](https://avaraui.com/docs/reactjs/kbd) styling.

## How does ContextMenu avoid clipping near screen edges?

`ContextMenuContent` portals into `document.body` and measures itself after opening. If it would pass the right or bottom edge it shifts back inside, keeping a 12 to 16 px margin, and it never opens past the top or left edge. On screens under 640 px wide, a click in the right half opens it leftward.

## Why does ContextMenu open on left click, and how do I limit it to right-click?

`ContextMenuTrigger` has a built-in `onClick` that opens the menu at the click point. Because your props spread after it, passing your own `onClick`, even an empty function, replaces it. The menu then opens only from `onContextMenu` or a touch long-press.

## How do I open ContextMenu on mobile?

Press and hold inside `ContextMenuTrigger` for 500 ms with a single finger; the menu opens at that touch point. Lifting the finger or moving it before 500 ms cancels the timer, so normal scrolling still works. The native browser menu is suppressed on right-click with `preventDefault`.

## What closes the ContextMenu?

Pressing `Escape`, pressing the mouse or touching anywhere outside the menu, scrolling any element in the page, and clicking an enabled `ContextMenuItem` all close it. A `disabled` item ignores clicks, so the menu stays open. Right-clicking inside the open menu only suppresses the browser menu.

## How do I change the ContextMenu color or surface style?

Set `color` on `ContextMenu` to `"primary"`, `"indigo"`, `"rose"`, `"emerald"`, `"blue"` or `"zinc"`, or pass a hex, `rgb` or `hsl` string. It tints item hover and the trigger's hover border. Set `variant` on `ContextMenuContent` to `"default"`, `"minimal"` or `"glass"` for the surface.

## Is ContextMenu keyboard accessible?

Only partly. The menu has `role="menu"`, items have `role="menuitem"` and `Escape` closes it. But there is no arrow-key navigation, and the trigger is a plain `div` that is not focusable, so keyboard users cannot open it. Offer the same actions through visible buttons as well.

---

Live previews and every example: https://avaraui.com/docs/nextjs/context-menu
