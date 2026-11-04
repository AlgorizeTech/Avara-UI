---
title: "Shadcn Dock"
description: "Shadcn Dock. A macOS-style dock that magnifies icons under the pointer, with label tooltips, active-app indicators."
url: https://avaraui.com/docs/nextjs/dock
---

# Shadcn Dock

A premium, macOS-inspired navigation dock featuring real-time physics magnification, floating label tooltips, active application indicators, and notification badges. Highly customizable via direct layout and physics props, it adapts seamlessly between desktop floating tooltips and touch-safe mobile layouts.

Sweep the cursor across each dock to feel the magnification curve, and click an icon to move the active indicator.

## Dock

- Pass `items` as `{ id, label, icon }[]` — `label` is the hover tooltip and `icon` a node, not a name.
- `containerHeight={64}` sizes the glass bar; a number is pixels, a string is raw CSS.

```tsx
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

## Examples

### Badges & active app

- `badge` on an item prints a pulsing counter pill in its top-right corner.
- `isActive` draws the running-app dot beneath the icon.

```tsx
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

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

### Fluid Animations

Hardware-accelerated transitions that ensure smooth 60fps performance across devices.

### Highly Customizable

Exposes intuitive props for tailoring colors, sizes, and animation speeds to fit your brand.

### Responsive Design

Automatically adapts to mobile, tablet, and desktop viewports without horizontal scrolling issues.

### Accessible

Built with semantic HTML and ARIA labels where necessary to support screen readers and keyboard navigation.

## Best Practices & Guidelines

### Animation Performance

Avoid placing too many heavy animated components on a single screen to prevent layout thrashing and maintain 60fps performance. Use intersection observers to pause off-screen animations.

### State Management

When triggering animations via state changes, ensure you wrap state updates in `startTransition` or use lightweight stores to prevent React rendering bottlenecks during the animation tick.

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

---

Live previews and every example: https://avaraui.com/docs/nextjs/dock
