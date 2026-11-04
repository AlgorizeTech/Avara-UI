---
title: "Shadcn Theme Switcher"
description: "A premium, animated dark mode toggle component built specifically for Next.js applications using `next-themes`. Free shadcn/ui Theme Switcher component."
url: https://avaraui.com/docs/nextjs/theme-switcher
---

# Shadcn Theme Switcher

A premium, animated dark mode toggle component built specifically for Next.js applications using `next-themes`.

It includes three distinct layout variants (Icon, Pill, and Dropdown) to match different areas of your application, from compact navigation bars to sprawling settings menus. It safely handles React hydration to prevent the dreaded "dark mode flash" on initial load.

Switching runs the same circular reveal as the toggle in this site's header: the new theme grows out of the control as a circle over the page, using the View Transitions API. The CSS that reveal needs is part of the component — it goes into `<head>` the first time a switcher mounts — so an installed copy works without touching `globals.css`. Browsers without View Transitions, and users who prefer reduced motion, get an instant switch.

Each switcher below is live and writes through `next-themes`, so flipping one changes the theme for the whole docs site. The previews run in their own frame, and a View Transition can't cross documents, so here the demo hands the pick to the page through `applyTheme` — what you see is the header's own reveal, starting from the control you clicked. In your app the component does all of that itself.

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

### Configure next-themes

`ThemeSwitcher` reads and writes the theme through `next-themes`, so your app has to be wrapped in its provider once. `suppressHydrationWarning` on `<html>` is required — the theme class is applied before React hydrates.

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Examples

### Pill

- Set `variant="pill"` for a segmented control with a sliding indicator. It shows the current mode explicitly, which suits a settings page.

```tsx
import { ThemeSwitcher } from "@/components/custom/blocks/ThemeSwitcherBlock";

export default function PillSwitcher() {
  // A segmented control that shows the current mode explicitly — better on a
  // settings page than in a dense navbar.
  return <ThemeSwitcher variant="pill" />;
}
```

### Dropdown

- Set `variant="dropdown"` for a menu — the **only** variant that exposes the `system` option, so users can defer to their OS setting.

```tsx
import { ThemeSwitcher } from "@/components/custom/blocks/ThemeSwitcherBlock";

export default function DropdownSwitcher() {
  // Includes the "system" option, so users can defer to their OS setting.
  return <ThemeSwitcher variant="dropdown" />;
}
```

## Features

Explore the Theme Switcher's dark mode capabilities, featuring the circular reveal, hydration-safe rendering and smooth layout transitions.

### Circular Reveal

The new theme sweeps out from whichever control was clicked, via the View Transitions API. The `::view-transition` rules it needs ship inside the component, so nothing has to be added to your global stylesheet. Set `reveal={false}` for an instant switch.

### Self-contained

Every style the switcher relies on is in `ThemeSwitcherBlock.tsx`: Tailwind classes for the controls, and the reveal CSS injected once into `<head>`. Install it and it works; nothing to copy into `globals.css`.

### Hydration Safe

Safely checks if the component is mounted on the client to completely eliminate the infamous React hydration mismatch errors.

### No Animation Library

The sliding pill, the icon spin and the dropdown run on the browser's built-in Web Animations API, so they feel completely native and add no dependency.

### 3 Layout Variants

Ships with a compact Icon toggle, a sliding Pill control, and a classic Dropdown menu to fit any UI design.

### System Sync

Automatically syncs with the user's OS-level dark mode preferences if the "system" theme is selected.

## Best Practices & Guidelines

### SSR Considerations

Since `next-themes` relies on `localStorage` which isn't available during Server-Side Rendering, always wrap the component's inner rendering logic in a `mounted` check to prevent hydration mismatch flashes.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `ThemeSwitcher` | `variant` | `"icon" \| "pill" \| "dropdown"` | `"icon"` | Determines the structural layout and specific animations applied to the toggler. `icon`: A simple, rotating toggle button. `pill`: A segmented control with a sliding active indicator. `dropdown`: A click-to-open menu with all theme options. |
| `ThemeSwitcher` | `reveal` | `boolean` | `true` | Grow the new theme out of the clicked control as a circle. Skipped automatically when the browser lacks the View Transitions API, the user prefers reduced motion, or nothing visible would change (for example picking `system` while it already resolves to the current theme). |
| `ThemeSwitcher` | `revealDuration` | `number` | `500` | Length of the reveal, in milliseconds. |
| `ThemeSwitcher` | `applyTheme` | `(theme: string, origin: Element \| null) => void` | `undefined` | Replace how a picked theme is applied. By default the switcher reveals and calls `setTheme`; pass this to do it yourself — persist it first, or hand the switch to a parent document. `origin` is the element that was clicked, for positioning your own reveal. |
| `ThemeSwitcher` | `...props` | `HTMLAttributes<HTMLDivElement>` | `undefined` | Accepts all native HTML div attributes (e.g., `className`, `id`) which are seamlessly forwarded to the root wrapper. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/theme-switcher
