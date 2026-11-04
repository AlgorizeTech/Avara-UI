---
title: "Context Menu"
description: "Displays a menu to the user — such as a set of actions or functions — triggered by a right-click. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/context-menu
---

# Context Menu

Displays a menu to the user — such as a set of actions or functions — triggered by a right-click.

Building a Context Menu is difficult because it involves intercepting the browser's native right-click event (`onContextMenu`) and rendering an overlay component precisely at the user's mouse coordinates without it getting clipped by CSS `overflow` properties.

This `ContextMenuBlock` is a **100% dependency-free** solution. It uses React's `createPortal` to escape DOM limitations, and includes highly optimized boundary-collision logic to guarantee the menu never opens off the edge of the user's screen.

Right-click (or long-press on touch) inside each dashed box. Try it near the edges — the boundary maths keeps the menu on screen.

## Labels, shortcuts & disabled

`ContextMenuLabel` titles a group and `ContextMenuShortcut` right-aligns the hotkey.

- Set `disabled` on an item to fade it, drop its hover state and stop `onClick` firing.

```tsx
"use client";


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

## Features
Explore the ContextMenu's right-click features, including nested submenus, disabled states, and keyboard navigation.

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

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `ContextMenu` | `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "blue" \| "zinc" \| string` | `"primary"` | Applies theme accent color to item hover states and trigger container focus/hover borders. Accepts preset named themes or valid hex strings. |
| `ContextMenuTrigger` | `className` | `string` | `undefined` | Standard Tailwind CSS overrides for the boundary container that intercepts the right-click event. |
| `ContextMenuContent` | `className` | `string` | `undefined` | Standard Tailwind CSS overrides for the floating menu card. By default, you usually want to set a width here (e.g., `w-64` ). |
| `ContextMenuItem` | `disabled` | `boolean` | `false` | If true, the item becomes slightly transparent, ignores hover effects, and prevents `onClick` events from firing. |
| `ContextMenuItem` | `onClick` | `(e: React.MouseEvent) => void` | `undefined` | Event handler fired when the user left-clicks the item. Clicking an item automatically closes the context menu. |
| `ContextMenuItem` | `inset` | `boolean` | `false` | If true, adds left padding to the item. This is incredibly useful when aligning text items with other items that have icons. |
| `ContextMenuLabel` | `inset` | `boolean` | `false` | If true, adds left padding to match the alignment of inset menu items. |
| All Components | `...props` | `HTMLAttributes` | `{}` | Standard HTML attributes for their respective underlying `<div>` elements. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/context-menu
