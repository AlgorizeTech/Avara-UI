---
title: "Shadcn Drawer"
description: "An animated, responsive drawer with a bottom-sheet variant and an option to open on mount. Free shadcn/ui Drawer component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/drawer
---

# Shadcn Drawer

A controlled slide-in drawer (`Drawer`, `DrawerContent`) supporting all four screen edges (`top`, `bottom`, `left`, `right`) with body scroll locking and plain CSS transitions.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/drawer.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/drawer
```

## Drawer

- `open` is required — the drawer has no uncontrolled mode.
- `onOpenChange` is also required, and fires on the overlay click, Escape and the close button alike.

```tsx
"use client";

import { useState } from "react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/custom/blocks/Drawer";

export default function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>

      <Drawer open={open} onOpenChange={setOpen} side="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Interactive Drawer</DrawerTitle>
            <DrawerDescription>
              This drawer slides in from the right. It uses CSS transitions for
              butter-smooth easing and handles its own unmount lifecycles.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-6 flex-1 overflow-y-auto">
            {/* Long content scrolls here without pushing the header away */}
          </div>

          <DrawerFooter>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
```

## Bottom sheet

- Set `side="bottom"` for the familiar full-width mobile sheet.

```tsx
"use client";

import { useState } from "react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/custom/blocks/Drawer";

export default function BottomSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open sheet</Button>

      {/* side="bottom" is the mobile sheet pattern */}
      <Drawer open={open} onOpenChange={setOpen} side="bottom">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Interactive Drawer</DrawerTitle>
            <DrawerDescription>
              Anchored to the bottom edge, full width.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
```

## Open on mount

- `open` being yours means you can start it `true`, or flip it from any effect, with no trigger element at all.

```tsx
"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/custom/blocks/Drawer";

// Optionally skip visitors who were onboarded before. localStorage is read as
// an external store: false on the server, the stored value in the browser.
const subscribeToStorage = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};
const readOnboarded = () => localStorage.getItem("onboarded") !== null;

export default function OnboardingDrawer() {
  const onboarded = useSyncExternalStore(subscribeToStorage, readOnboarded, () => false);
  // Null until the visitor opens or closes it. Until then it is open on
  // mount, so no trigger click is needed.
  const [choice, setOpen] = useState<boolean | null>(null);
  const open = choice ?? !onboarded;

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer (left)</Button>

      <Drawer open={open} onOpenChange={setOpen} side="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Welcome aboard</DrawerTitle>
            <DrawerDescription>
              This drawer opens automatically on mount without needing a trigger click.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-6 flex-1 overflow-y-auto">
            <p className="text-sm text-muted-foreground">
              You can use this for onboarding flows, announcements, or cookie consent banners.
            </p>
          </div>

          <DrawerFooter>
            <Button onClick={() => setOpen(false)}>Get Started</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
```

## About Shadcn Drawer

**What it is.** `Drawer` and `DrawerContent` slide a panel in from `top`, `bottom`, `left`, or `right` edges, locking background document scroll while open.

**How it is built.** Animated with CSS keyframes and transitions that the component injects in a `<style>` tag, so there is no animation library. It renders into a portal on `document.body` and is strictly controlled via `open` and `onOpenChange`, which fires on a `DrawerOverlay` click, `Escape` and the built-in close button. The only npm dependency is `lucide-react`.

**When to use it.** Use `Drawer` for navigation sheets, filter panels, mobile bottom sheets, and cart sidebars. For centered blocking dialogs, use [Dialog](https://avaraui.com/docs/nextjs/dialog) or [Modal](https://avaraui.com/docs/nextjs/modal).

## For AI agents

**When to use**

- Edge-anchored slide-over panels (`side="right" | "left" | "top" | "bottom"`) for filters, carts, or mobile sheets

**When not to use**

- Centered blocking dialogs — use [Dialog](https://avaraui.com/docs/nextjs/dialog) or [Modal](https://avaraui.com/docs/nextjs/modal)
- Small trigger-anchored menus — use [Popover](https://avaraui.com/docs/nextjs/popover)

**Agent notes**

- Named exports from `@/components/custom/blocks/Drawer`
- Always controlled: both `open` and `onOpenChange` are required (there is no uncontrolled mode)
- Render `<DrawerOverlay />` before `<DrawerContent>`; without it there is no backdrop and outside clicks do nothing
- Other exports: `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerFooter`, and a small `Button` (`variant` `"default" | "outline"`)
- `DrawerContent` does not set `role` or `aria-modal`; pass them as props if you need them

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | Required | Controls the visible state of the drawer. When true, the component mounts via React Portals and a CSS transition slides it into view. |
| `onOpenChange` | `(open: boolean) => void` | Required | Callback function to update the `open` state. Triggered by clicking the overlay, hitting the Escape key, or using the close button. |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"right"` | Determines which edge of the screen the drawer slides in from, and applies the corresponding layout dimensions. |

## Works with other components

- Trigger `Drawer` from [Button](https://avaraui.com/docs/nextjs/button) or [Navbar](https://avaraui.com/docs/nextjs/navbar) mobile menu icons.
- Embed [Cart](https://avaraui.com/docs/nextjs/cart) or [Form](https://avaraui.com/docs/nextjs/form) filters inside `DrawerContent`.

## Does Drawer have an uncontrolled mode?

No. `Drawer` is always controlled: you pass both `open` and `onOpenChange`, usually from a `useState` in the parent. There is no `defaultOpen` and no trigger component, so any button, menu icon or effect can open it by setting the state to `true`.

## How do I close the Drawer when the user clicks outside it?

Render `<DrawerOverlay />` inside `Drawer`, before `DrawerContent`. Clicking it calls `onOpenChange(false)`. The layer itself ignores pointer events, so without `DrawerOverlay` there is no dimmed backdrop and clicks fall through to the page. `Escape` and the built-in close button also call `onOpenChange(false)`.

## What sizes does Drawer use, and how do I change them?

Left and right drawers are `400px` wide, capped at `85vw`. Top and bottom drawers are full width, capped at `85vh`, or `80vh` from the `sm` breakpoint up. Pass `className` to `DrawerContent` to override width or height; it is merged after the defaults.

## Does Drawer trap focus or set dialog ARIA roles?

No. It closes on `Escape`, locks body scroll, and its close button has `aria-label="Close drawer"`, but `DrawerContent` sets no `role`, `aria-modal` or focus trap. Because it spreads extra props onto its `div`, you can pass `role="dialog"` and `aria-modal="true"` yourself. It does not check `prefers-reduced-motion`.

## Does Drawer work outside Next.js?

Yes. The file has no `next/*` imports and its only npm dependency is `lucide-react`. The slide animation comes from CSS keyframes inside a `<style>` tag the drawer renders, so you need no Tailwind animation plugin. It installs as a single file, `components/custom/blocks/Drawer.tsx`.

## When should I use Drawer instead of Dialog?

Use `Drawer` for panels that slide from a screen edge, such as filters, carts and mobile sheets. [Dialog](https://avaraui.com/docs/nextjs/dialog) is centred, offers `defaultOpen` and a `DialogTrigger`, and can nest. `Drawer` is controlled only and has no stack handling for nested panels, so it suits one panel at a time.

---

Live previews and every example: https://avaraui.com/docs/nextjs/drawer
