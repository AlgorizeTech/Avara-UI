---
title: "Shadcn Dock"
description: "Shadcn Dock. A macOS-style dock that magnifies icons under the pointer, with label tooltips, active-app indicators."
url: https://avaraui.com/docs/nextjs/dock
---

# Shadcn Dock

A macOS-inspired navigation dock (`Dock`) with pointer magnification physics, floating label tooltips, active-app indicators, and notification badges in GSAP and Motion builds.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/dock.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/dock
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add https://avaraui.com/r/dock-motion.json
```

## Dock

- Pass `items` as `{ id, label, icon }[]` — `label` is the hover tooltip and `icon` a node, not a name.
- `containerHeight={64}` sizes the glass bar; a number is pixels, a string is raw CSS.

```tsx
import { Dock } from "@/components/custom/blocks/DockBlock";
import { Code2, Compass, FolderGit2, Home, Mail, Settings, Sparkles, Terminal } from "lucide-react";
import { useState } from "react";

export default function BottomNav() {
  const [active, setActive] = useState("home");

  const items = [
    // icon is a node — give it w-full h-full so it scales with the dock
    { id: "home", label: "Dashboard", icon: <Home className="w-full h-full" />, isActive: active === "home", onClick: () => setActive("home") },
    { id: "compass", label: "Explore", icon: <Compass className="w-full h-full" />, isActive: active === "compass", onClick: () => setActive("compass") },
    { id: "mail", label: "Messages", icon: <Mail className="w-full h-full" />, badge: 3, isActive: active === "mail", onClick: () => setActive("mail") },
    { id: "terminal", label: "Terminal", icon: <Terminal className="w-full h-full" />, isActive: active === "terminal", onClick: () => setActive("terminal") },
    { id: "projects", label: "Repositories", icon: <FolderGit2 className="w-full h-full" />, isActive: active === "projects", onClick: () => setActive("projects") },
    { id: "ai", label: "AI Assistant", icon: <Sparkles className="w-full h-full text-amber-500" />, isActive: active === "ai", onClick: () => setActive("ai") },
    { id: "code", label: "Code", icon: <Code2 className="w-full h-full" />, isActive: active === "code", onClick: () => setActive("code") },
    { id: "settings", label: "Settings", icon: <Settings className="w-full h-full" />, isActive: active === "settings", onClick: () => setActive("settings") },
  ];

  return (
    <div className="relative w-full flex flex-col items-center justify-end min-h-[420px]">
      <div className="absolute top-6 left-6 text-xs font-mono text-muted-foreground">
        Active App:{" "}
        <span className="text-foreground uppercase font-semibold">
          {active}
        </span>
      </div>

      <Dock items={items} />
    </div>
  );
}
```

## Badges & active app

- `badge` on an item prints a pulsing counter pill in its top-right corner.
- `isActive` draws the running-app dot beneath the icon.

```tsx
import { Dock } from "@/components/custom/blocks/DockBlock";
import { Home, Mail, Settings, Terminal } from "lucide-react";
import { useState } from "react";

export default function CompactNav() {
  const [active, setActive] = useState("home");

  const items = [
    // isActive draws the indicator dot; badge prints a counter pill
    { id: "home", label: "Dashboard", icon: <Home className="w-full h-full" />, isActive: active === "home", onClick: () => setActive("home") },
    { id: "mail", label: "Messages", icon: <Mail className="w-full h-full" />, badge: 3, isActive: active === "mail", onClick: () => setActive("mail") },
    { id: "terminal", label: "Terminal", icon: <Terminal className="w-full h-full" />, isActive: active === "terminal", onClick: () => setActive("terminal") },
    { id: "settings", label: "Settings", icon: <Settings className="w-full h-full" />, isActive: active === "settings", onClick: () => setActive("settings") },
  ];

  return (
    <div className="relative w-full flex flex-col items-center justify-end min-h-[420px]">
      <div className="absolute top-6 left-6 text-xs font-mono text-muted-foreground">
        Active App:{" "}
        <span className="text-foreground uppercase font-semibold">
          {active}
        </span>
      </div>

      <Dock items={items} />
    </div>
  );
}
```

## About Shadcn Dock

**What it is.** `Dock` renders a macOS-style icon bar with cursor-proximity magnification, floating tooltips, `isActive` running dots, and pulsing `badge` counters.

**How it is built.** The pointer position is shared with every icon, and each icon's size chases it on a spring, outside React's render loop. The GSAP build (`dock`) and the Motion build (`dock-motion`) install to the same file. Below 640px the component caps `baseSize`, `magnification`, `distance`, `gap` and bar height so the dock fits a phone.

**When to use it.** Use `Dock` for app-launcher bars, OS-inspired toolbars, and floating workspace switchers. For standard text navigation links, use [Navigation Menu](https://avaraui.com/docs/reactjs/navigation).

## For AI agents

**When to use**

- Floating icon docks with cursor magnification, tooltips, `badge` counters, and `isActive` dots

**When not to use**

- Standard header text navigation — use [Navigation Menu](https://avaraui.com/docs/reactjs/navigation)

**Agent notes**

- Named export from `@/components/custom/blocks/DockBlock` (ships GSAP and Motion twin builds)
- Pass `items` as `{ id, label, icon, onClick?, badge?, isActive? }[]` where `icon` is a React node (give it `w-full h-full`)
- Install the GSAP build (`dock`) or the Motion build (`dock-motion`), not both
- `Dock` is a `div`: extra props and `ref` go to it, and tooltips show on mouse hover only

## Props Reference

| Component / Interface | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Dock` | `items` | `DockItem[]` | Required | An array of data objects defining the icons, labels, onClick callbacks, badges, and active states for each item. |
| `Dock` | `containerHeight` | `number \| string` | `64` | The height of the glassmorphic background bar (in pixels if passed as a number, or valid CSS string e.g., `"4.5rem"`). |
| `Dock` | `gap` | `number` | `12` | The horizontal gap spacing (in pixels) between resting dock icon buttons. Automatically compresses on mobile viewports. |
| `Dock` | `baseSize` | `number` | `48` | The resting width and height (in pixels) of each dock icon button before any hover interaction occurs. |
| `Dock` | `magnification` | `number` | `80` | The maximum expanded width and height (in pixels) an icon reaches when the mouse cursor is directly over its center. |
| `Dock` | `distance` | `number` | `140` | The pixel distance radius around the mouse cursor within which neighboring icons will begin to magnify. |
| `Dock` | `className` | `string` | `undefined` | Custom Tailwind CSS classes to apply to the outermost glassmorphic dock wrapper container. |
| `DockItem` | `id` | `string` | Required | A unique identifier string required for safe React list rendering and layout animations. |
| `DockItem` | `label` | `string` | Required | The text displayed inside the floating tooltip tag above the icon when hovered. |
| `DockItem` | `icon` | `React.ReactNode` | Required | A React element or Lucide icon component to render inside the button (should use classes like `w-full h-full`). |
| `DockItem` | `onClick` | `() => void` | `undefined` | Optional callback function fired whenever the user clicks on the specific dock icon button. |
| `DockItem` | `isActive` | `boolean` | `false` | When set to `true`, displays a smooth animated dot indicator beneath the icon button. |
| `DockItem` | `badge` | `string \| number` | `undefined` | Optional notification badge string or number (e.g., "3", "NEW") rendered as a pulsing red pill in the top-right corner. |

## Works with other components

- Pair `Dock` with [Live Pulse Pill](https://avaraui.com/docs/reactjs/live-pulse-pill) or [Command Palette](https://avaraui.com/docs/reactjs/command-palette) in app shells.

## How do I show notification badges and active-app dots on Dock items?

Add `badge` (a string or number) and `isActive: true` to any object in the `items` array. `badge` prints a pulsing rose pill on the icon's top-right corner, and `isActive` draws a dot beneath it. When the active item changes, the dot glides from the old icon to the new one.

## How do I make the Dock magnify more or less?

Tune `baseSize` (resting pixel size, default `48`), `magnification` (pixel size directly under the cursor, default `80`) and `distance` (the radius in pixels where neighbours start to grow, default `140`). Raise `magnification` for a bigger swell, or raise `distance` so more icons react at once.

## What is the difference between the GSAP and Motion builds of Dock?

They expose the same `Dock` and `DockItem` API and install to `components/custom/blocks/DockBlock.tsx`. The `dock` item depends on `gsap`; `dock-motion` depends on `motion`. Install one of them, not both, and switch by re-adding the other item.

## Does the Dock work on touch screens and small viewports?

It shrinks rather than disappears. Under 640px it caps `baseSize`, `magnification`, `distance` and `gap`, and with 7 or more items on screens under 480px it shrinks further. Magnification and tooltips follow mouse events, so on touch you mainly get tapping with `onClick`, not the swell.

## How accessible is the Dock, and what do I pass for icons?

Each item is a native `button` with `aria-label` set from `label`, so it is focusable and announced. The tooltip appears on mouse hover only, and `isActive` is a visual dot without `aria-current`. Pass `icon` as a React node such as a lucide icon with `className="w-full h-full"`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/dock
