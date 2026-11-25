---
title: "Shadcn Theme Switcher"
description: "Shadcn Theme Switcher. A hydration-safe dark mode switcher for `next-themes` in three variants (`icon`, `pill`."
url: https://avaraui.com/docs/nextjs/theme-switcher
---

# Shadcn Theme Switcher

A hydration-safe dark mode switcher for `next-themes` in three variants (`icon`, `pill`, and `dropdown`) with a View Transitions circular reveal.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/theme-switcher.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/theme-switcher
```

## Icon

One button that flips between light and dark, with a spin micro-interaction on the icon and the circular reveal growing out of it.

- `variant="icon"` is the default — the compact choice for a navbar.

```tsx
import { ThemeSwitcher } from "@/components/custom/blocks/ThemeSwitcherBlock";

export default function DashboardHeader() {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <h1>My App</h1>
      {/* Compact enough for a navbar */}
      <ThemeSwitcher variant="icon" />
    </header>
  );
}
```

## Pill

- Set `variant="pill"` for a segmented control with a sliding indicator. It shows the current mode explicitly, which suits a settings page.

```tsx
import { ThemeSwitcher } from "@/components/custom/blocks/ThemeSwitcherBlock";

export default function PillSwitcher() {
  // A segmented control that shows the current mode explicitly — better on a
  // settings page than in a dense navbar.
  return <ThemeSwitcher variant="pill" />;
}
```

## Dropdown

- Set `variant="dropdown"` for a menu — the **only** variant that exposes the `system` option, so users can defer to their OS setting.

```tsx
import { ThemeSwitcher } from "@/components/custom/blocks/ThemeSwitcherBlock";

export default function DropdownSwitcher() {
  // Includes the "system" option, so users can defer to their OS setting.
  return <ThemeSwitcher variant="dropdown" />;
}
```

## About Shadcn Theme Switcher

**What it is.** A dark-mode switcher (`ThemeSwitcher`) with `icon`, `pill`, and `dropdown` variants wired to `next-themes`.

**How it is built.** Injects its own `::view-transition` circular reveal CSS into `<head>` (no `globals.css` edits needed), uses the Web Animations API for micro-interactions, and waits for client mount to avoid SSR hydration mismatches. Falls back to an instant switch under `prefers-reduced-motion` or browsers without View Transitions.

**When to use it.** Use `variant="icon"` in compact navbars, `variant="pill"` on settings pages, and `variant="dropdown"` when users need explicit `light`, `dark`, and `system` options.

## For AI agents

**When to use**

- Light/dark/system theme controls in navbars (`variant="icon"`), settings pages (`variant="pill"`), or menus (`variant="dropdown"`)

**When not to use**

- Generic multi-option segmented controls unrelated to theme — use [Toggle Group](https://avaraui.com/docs/nextjs/toggle-group)

**Agent notes**

- Named export: `import { ThemeSwitcher } from "@/components/custom/blocks/ThemeSwitcherBlock"`
- Requires `next-themes` `ThemeProvider` wrapping the root layout with `suppressHydrationWarning` on `<html>`
- Only `variant="dropdown"` exposes the `"system"` option; pass `reveal={false}` to disable the circular View Transitions sweep

**Ask before you pick.** This page has 3 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 3 options as live previews: https://avaraui.com/view/theme-switcher

**When to use it.** An animated dark-mode toggle built on `next-themes`, in three layouts: a compact icon, a segmented pill and a dropdown menu.

**Gotchas:**

- All three are looks of the one `theme-switcher` item: install it once and set `variant` from the index.
- Only `dropdown` offers the `system` option, so users can follow their OS setting.

### The 3 variants

1. **Icon** (`icon`): A compact icon button that toggles the theme: the default and the usual choice for a navbar.
   - Live: https://avaraui.com/view/theme-switcher/icon
   - Best for: a navbar or any tight space
   - Avoid if: you want users to see the current mode spelled out or pick a system setting
   - Traits: icon only, default look
   - Install: `npx shadcn@latest add @avara-ui/theme-switcher`
   - Set these props: `{"variant":"icon"}`
   - Docs: https://avaraui.com/docs/nextjs/theme-switcher#icon
2. **Pill** (`pill`): A segmented control with a sliding indicator that shows the current mode explicitly.
   - Live: https://avaraui.com/view/theme-switcher/pill
   - Best for: a settings page where the mode should be visible and selectable
   - Avoid if: space is tight, as in a navbar
   - Traits: segmented control, sliding indicator
   - Install: `npx shadcn@latest add @avara-ui/theme-switcher`
   - Set these props: `{"variant":"pill"}`
   - Docs: https://avaraui.com/docs/nextjs/theme-switcher#pill
3. **Dropdown** (`dropdown`): A menu of modes, and the only layout with the `system` option.
   - Live: https://avaraui.com/view/theme-switcher/dropdown
   - Best for: letting users defer to their operating system's theme
   - Avoid if: you want a one-click toggle
   - Traits: menu, includes `system`
   - Install: `npx shadcn@latest add @avara-ui/theme-switcher`
   - Set these props: `{"variant":"dropdown"}`
   - Docs: https://avaraui.com/docs/nextjs/theme-switcher#dropdown

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `ThemeSwitcher` | `variant` | `"icon" \| "pill" \| "dropdown"` | `"icon"` | Determines the structural layout and specific animations applied to the toggler. `icon`: A simple, rotating toggle button. `pill`: A segmented control with a sliding active indicator. `dropdown`: A click-to-open menu with all theme options. |
| `ThemeSwitcher` | `reveal` | `boolean` | `true` | Grow the new theme out of the clicked control as a circle. Skipped automatically when the browser lacks the View Transitions API, the user prefers reduced motion, or nothing visible would change (for example picking `system` while it already resolves to the current theme). |
| `ThemeSwitcher` | `revealDuration` | `number` | `500` | Length of the reveal, in milliseconds. |
| `ThemeSwitcher` | `applyTheme` | `(theme: string, origin: Element \| null) => void` | `undefined` | Replace how a picked theme is applied. By default the switcher reveals and calls `setTheme`; pass this to do it yourself — persist it first, or hand the switch to a parent document. `origin` is the element that was clicked, for positioning your own reveal. |
| `ThemeSwitcher` | `...props` | `HTMLAttributes<HTMLDivElement>` | `undefined` | Accepts all native HTML div attributes (e.g., `className`, `id`) which are seamlessly forwarded to the root wrapper. |

## Works with other components

- Place `variant="icon"` inside [Navbar](https://avaraui.com/docs/nextjs/navbar) or [Sidebar](https://avaraui.com/docs/nextjs/sidebar) headers.
- Pair `variant="pill"` with [Card](https://avaraui.com/docs/nextjs/card) appearance settings panels.

## How do I add a dark mode toggle with next-themes?

Render `ThemeSwitcher` inside a `next-themes` `ThemeProvider`, which the component expects. Choose `variant="icon"`, `"pill"` or `"dropdown"`. The registry installs `next-themes` and `lucide-react` with it, and the switcher is hydration-safe, so it avoids a mismatch on first paint.

## Does ThemeSwitcher require globals.css changes for the circular reveal?

No. It injects the `::view-transition` rules into `<head>` automatically, and falls back to an instant switch when View Transitions are unsupported or `prefers-reduced-motion` is active. `reveal` is `true` by default, so set `reveal={false}` to turn the circle off.

## How do I allow users to pick the OS system theme?

Use `variant="dropdown"`, which is the only variant that includes `"system"` alongside `"light"` and `"dark"`. Make sure `ThemeProvider` has `enableSystem` set, otherwise next-themes will not resolve the operating-system preference for you.

## How do I change how the new theme is applied?

Pass `applyTheme`, a function that receives the picked theme and the clicked element. It replaces the default behaviour, which runs the reveal and then changes the theme. `revealDuration` sets the circle animation length in milliseconds and defaults to `500`.

## Which ThemeSwitcher variant should I use in a navbar or settings page?

Use `variant="icon"` in a [Navbar](https://avaraui.com/docs/nextjs/navbar) or [Sidebar](https://avaraui.com/docs/nextjs/sidebar) header, `"pill"` for appearance settings in a [Card](https://avaraui.com/docs/nextjs/card), and `"dropdown"` when the user needs the system option. `icon` is the default.

---

Live previews and every example: https://avaraui.com/docs/nextjs/theme-switcher
