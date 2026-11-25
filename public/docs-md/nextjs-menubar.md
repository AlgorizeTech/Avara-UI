---
title: "Shadcn Menubar"
description: "Shadcn Menubar. A dependency-free desktop-style menubar (`Menubar`, `MenubarMenu`, `MenubarTrigger`."
url: https://avaraui.com/docs/nextjs/menubar
---

# Shadcn Menubar

A dependency-free desktop-style menubar (`Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`) with hover-to-swap menu switching and application title-bar support.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/menubar.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/menubar
```

## Menubar

Nest `MenubarMenu` → `MenubarTrigger` + `MenubarContent`.

- `value` on each `MenubarMenu` is required — it is how the context tracks which dropdown is open.
- `align` on `MenubarContent` anchors the dropdown to its trigger: `start` (the default), `center` or `end`.

```tsx
"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/custom/blocks/MenubarBlock";
import { AppWindow, FolderOpen, Plus, Redo2, Scissors, Undo2 } from "lucide-react";

export default function TopNav() {
  return (
    <Menubar>
      {/* Every MenubarMenu needs a unique `value` — the context tracks it */}
      <MenubarMenu value="file">
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          {/* shrink-0 keeps the icon square when a narrow menu squeezes the row */}
          <MenubarItem onClick={() => console.log("New Tab")}>
            <Plus className="w-4 h-4 mr-2 shrink-0" /> New Tab
          </MenubarItem>
          <MenubarItem>
            <AppWindow className="w-4 h-4 mr-2 shrink-0" /> New Window
          </MenubarItem>
          <MenubarItem>
            <FolderOpen className="w-4 h-4 mr-2 shrink-0" /> Open File…
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu value="edit">
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Undo2 className="w-4 h-4 mr-2 shrink-0" /> Undo
          </MenubarItem>
          <MenubarItem>
            <Redo2 className="w-4 h-4 mr-2 shrink-0" /> Redo
          </MenubarItem>
          <MenubarItem>
            <Scissors className="w-4 h-4 mr-2 shrink-0" /> Cut
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## Application menubar

- `className` on the bar is how you strip its chrome to fuse it into a window title bar.

```tsx
"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/custom/blocks/MenubarBlock";
import {
  Check,
  ClipboardPaste,
  Copy,
  Eye,
  EyeOff,
  Info,
  Laptop,
  Maximize,
  Moon,
  Power,
  Redo2,
  Scissors,
  Settings,
  Settings2,
  Sun,
  Undo2,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";

/** Every row carries one, so no row needs `inset` to fake the gutter. */
const icon = "w-4 h-4 mr-2 shrink-0";
/** Marks the active theme; ml-auto keeps it clear of the label. */
const activeMark = "ml-auto w-4 h-4 shrink-0 text-primary";

export default function AppWindow() {
  const [theme, setTheme] = useState("System");

  // No overflow-hidden on the frame: it would crop any menu taller or wider
  // than the window. The header rounds its own top corners instead.
  return (
    <div className="w-full max-w-2xl bg-background border border-border rounded-xl flex flex-col h-[280px]">
      {/* Native OS-style Application Header */}
      <div className="w-full border-b border-border bg-muted/50 rounded-t-xl px-2 py-1 flex items-center justify-between">
        <Menubar className="border-none bg-transparent shadow-none w-full justify-start min-h-8 p-0">
          {/* 1. FILE MENU */}
          <MenubarMenu value="file">
            <MenubarTrigger>Nexus UI</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Info className={icon} /> About Nexus
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Settings className={icon} /> Preferences...{" "}
                <MenubarShortcut>⌘,</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <EyeOff className={icon} /> Hide Nexus{" "}
                <MenubarShortcut>⌘H</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                <Users className={icon} /> Hide Others{" "}
                <MenubarShortcut>⇧⌘H</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                <Eye className={icon} /> Show All
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-600 dark:focus:text-red-400">
                <Power className={icon} /> Quit Nexus{" "}
                <MenubarShortcut>⌘Q</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {/* 2. EDIT MENU */}
          <MenubarMenu value="edit">
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Undo2 className={icon} /> Undo{" "}
                <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                <Redo2 className={icon} /> Redo{" "}
                <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Scissors className={icon} /> Cut{" "}
                <MenubarShortcut>⌘X</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                <Copy className={icon} /> Copy{" "}
                <MenubarShortcut>⌘C</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                <ClipboardPaste className={icon} /> Paste{" "}
                <MenubarShortcut>⌘V</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {/* 3. VIEW (THEME) MENU */}
          <MenubarMenu value="view">
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              {/* Labels sit flush left; the rows carry the icon gutter. */}
              <MenubarLabel>Theme Options</MenubarLabel>
              <MenubarItem onClick={() => setTheme("Light")}>
                <Sun className={icon} /> Light Mode
                {theme === "Light" && <Check className={activeMark} />}
              </MenubarItem>
              <MenubarItem onClick={() => setTheme("Dark")}>
                <Moon className={icon} /> Dark Mode
                {theme === "Dark" && <Check className={activeMark} />}
              </MenubarItem>
              <MenubarItem onClick={() => setTheme("System")}>
                <Laptop className={icon} /> System Default
                {theme === "System" && <Check className={activeMark} />}
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Maximize className={icon} /> Toggle Fullscreen{" "}
                <MenubarShortcut>F11</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {/* 4. PROFILES MENU */}
          <MenubarMenu value="profiles">
            <MenubarTrigger>Profiles</MenubarTrigger>
            <MenubarContent align="start">
              <MenubarLabel>Active Account</MenubarLabel>
              <MenubarItem>
                <User className={icon} /> Andy Bernard
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <UserPlus className={icon} /> Add Account...
              </MenubarItem>
              <MenubarItem>
                <Settings2 className={icon} /> Manage Profiles
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      {/* Fake App Body */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 opacity-50">
        <div className="w-16 h-16 bg-muted rounded-2xl mb-4 flex items-center justify-center border border-border shadow-sm">
          <Laptop className="w-8 h-8 text-muted-foreground" />
        </div>
        <h4 className="text-sm font-semibold text-foreground">
          Application Canvas
        </h4>
        <p className="text-xs text-muted-foreground mt-1 max-w-[250px]">
          Click the menus at the top to test the interaction states and
          cross-menu hover switching.
        </p>
      </div>
    </div>
  );
}
```

## About Shadcn Menubar

**What it is.** `Menubar` (`MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, `MenubarSeparator`, `MenubarShortcut`, `MenubarLabel`) provides a persistent OS-style command bar. There are no checkbox, radio or submenu parts; mark a chosen row with an icon, as the application example does.

**How it is built.** Plain React Context with no menu library. The bar tracks one open menu by `value`: click a trigger to open it, then hover the neighbouring triggers to swap. Escape or a mouse press outside closes it. `MenubarContent` nudges itself back inside the viewport and caps its height.

**When to use it.** Use `Menubar` for desktop-style editors, IDEs, and application title bars. For marketing/site navigation, use [Navigation Menu](https://avaraui.com/docs/nextjs/navigation); for right-click menus, use [Context Menu](https://avaraui.com/docs/nextjs/context-menu).

## For AI agents

**When to use**

- Persistent desktop-style File / Edit / View command bars in editors or web apps

**When not to use**

- Site header navigation: use [Navigation Menu](https://avaraui.com/docs/nextjs/navigation)
- Right-click context menus: use [Context Menu](https://avaraui.com/docs/nextjs/context-menu)

**Agent notes**

- Named exports from `@/components/custom/blocks/MenubarBlock`: `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, `MenubarSeparator`, `MenubarShortcut`, `MenubarLabel`. Nothing else exists, so do not import `MenubarCheckboxItem` or `MenubarSub`.
- Every `MenubarMenu` requires a unique `value` prop so context can track the active dropdown. Open state is internal; there is no controlled `open` prop.
- `MenubarItem` is a `button` that closes the menu after `onClick` runs.
- Keyboard support is limited to Tab and Escape. There is no arrow-key navigation and no `role="menu"` markup.

## Props Reference

| Component | Prop | Type | Description |
| --- | --- | --- | --- |
| `MenubarMenu` | `value` | `string` | Required. A unique identifier for the menu column (e.g., `"file"`). Used by the internal state context to track which dropdown is open. |
| `MenubarContent` | `align` | `"start" \| "center" \| "end"` | Determines how the dropdown is anchored relative to its trigger button. Defaults to `"start"`. |
| `MenubarItem` | `inset` | `boolean` | Adds extra left-padding to the item, aligning text cleanly when adjacent items use icons. |
| `MenubarItem` | `disabled` | `boolean` | Dims the item, changes the cursor, and completely disables pointer events and click handlers. |
| `MenubarItem` | `onClick` | `(e: React.MouseEvent<HTMLButtonElement>) => void` | Fires your custom action. The menu will automatically close after the click. |
| `MenubarLabel` | `inset` | `boolean` | Aligns the label text with `inset` menu items. |
| All Components | `className` | `string` | Every component except `MenubarMenu` accepts custom Tailwind classes, and the others pass extra HTML attributes to their root element (`MenubarSeparator` takes only `className`). |

## Works with other components

- Pair `Menubar` with [Resizable](https://avaraui.com/docs/nextjs/resizable) panes and [Kbd](https://avaraui.com/docs/nextjs/kbd) shortcut hints in IDE/editor shells.
- Use [Context Menu](https://avaraui.com/docs/nextjs/context-menu) for the right-click version of the same actions.
- Use [Navigation Menu](https://avaraui.com/docs/nextjs/navigation) for site header links instead of command menus.

## Why does each MenubarMenu need a value prop?

`Menubar` keeps one `activeMenu` string in React Context, and each `MenubarMenu` registers its `value` there. The trigger compares them to know whether to highlight, and the content compares them to know whether to render. Two menus with the same `value` would open together, so keep each one unique.

## What closes a Menubar menu?

Clicking a `MenubarItem` closes it after your `onClick` runs. A mouse press anywhere outside the bar closes it, and so does the Escape key. Clicking the open trigger again toggles it shut. Closed menus are unmounted, so `MenubarContent` renders nothing until its trigger is clicked.

## Does Menubar support arrow-key navigation?

No. Triggers and items are native `button` elements, so Tab and Enter work, and Escape closes the open menu. There is no arrow-key movement, no typeahead, and no `role="menubar"` or `aria-expanded` markup. For strict ARIA menu behaviour, use a Radix-based menubar.

## How do I fuse a Menubar into a window title bar?

Pass `className` to `Menubar` to remove its chrome, for example `border-none bg-transparent shadow-none p-0` as the application example does, then place it inside your own header. Each `MenubarTrigger` is a plain button, so you can restyle triggers with `className` too.

## Does the Menubar dropdown stay on screen near the edge of the window?

Mostly. When a menu opens, `MenubarContent` measures itself and shifts sideways to stay 8px inside the viewport, then caps its height if it would run past the bottom. `align` can be `start`, `center` or `end`. It is not portaled, so an ancestor with `overflow-hidden` will still crop it.

## Can I add checkbox, radio or submenu items to Menubar?

Not as built-in parts. The block ships `MenubarItem`, `MenubarLabel`, `MenubarSeparator` and `MenubarShortcut` only. To show a selected option, hold the state yourself and render a check icon inside a `MenubarItem`, as the View menu in the application example does for the theme choice.

---

Live previews and every example: https://avaraui.com/docs/nextjs/menubar
