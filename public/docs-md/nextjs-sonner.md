---
title: "Shadcn Sonner Toast"
description: "A Sonner-inspired toast system: mount `<Toaster />` once, call `toast()` from anywhere, and hover the 3D stack to expand it. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/sonner
---

# Shadcn Sonner Toast

A Sonner-inspired toast system: mount `<Toaster />` once, call `toast()` from anywhere, and hover the 3D stack to expand it.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/sonner.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/sonner
```

## Sonner

Mount `<Toaster />` once, then call `toast()` from anywhere — no provider needed.

- `children` of `toast()` is the message; everything else about the toast is optional.

```tsx
"use client";

import { Toaster } from "@/components/custom/blocks/SonnerBlock";
import { toast } from "@/components/custom/blocks/sonner-store";

// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer";

// <Toaster /> belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function SaveButton() {
  return (
    <>
      <Toaster position="bottom-right" />

      <button
        className={BTN}
        onClick={() =>
          toast("Profile updated successfully", {
            description: "Your changes have been saved to the database.",
          })
        }
      >
        Show toast
      </button>
    </>
  );
}
```

## Types

- Use `toast.success` `toast.error` and `toast.info` for the semantic icon and colour. They take the same arguments as `toast()`.

```tsx
"use client";

import { Toaster } from "@/components/custom/blocks/SonnerBlock";
import { toast } from "@/components/custom/blocks/sonner-store";

// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer";

// <Toaster /> belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function ToastTypes() {
  return (
    <>
      <div className="flex flex-wrap gap-4">
      <button
 className={BTN}
 onClick={() => toast("Profile updated successfully", { description: "Your changes have been saved to the database." })}>
        Default
      </button>
      <button
 className={BTN}
 onClick={() => toast.success("Deployment Complete", { description: "Your site is now live on the production server." })}>
        Success
      </button>
      <button
 className={BTN}
 onClick={() => toast.error("Connection Failed", { description: "Could not reach the database. Please try again later." })}>
        Error
      </button>
      <button
 className={BTN}
 onClick={() => toast.info("New login detected", { description: "A new device just signed in to your account." })}>
        Info
      </button>
      </div>
      <Toaster />
    </>
  );
}
```

## With action

- Pass `action` as `{ label, onClick }` to add an inline button — the usual home for Undo.

```tsx
"use client";

import { Toaster } from "@/components/custom/blocks/SonnerBlock";
import { toast } from "@/components/custom/blocks/sonner-store";

// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer";

// <Toaster /> belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function UndoToast() {
  return (
    <>
      <button
        className={BTN}
        onClick={() =>
          toast("Message deleted", {
            action: {
              label: "Undo",
              onClick: () => alert("Undo clicked!"),
            },
          })
        }
      >
        With Action
      </button>
      <Toaster />
    </>
  );
}
```

## Stacking

- `position` on the Toaster decides where they pile up; newer toasts sit on top and older ones recede until hovered.

```tsx
"use client";

import { Toaster } from "@/components/custom/blocks/SonnerBlock";
import { toast } from "@/components/custom/blocks/sonner-store";

// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer";

// <Toaster /> belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function StackDemo() {
  // New toasts stack on top; older ones scale down and slide back in 3D.
  // Hover the stack to expand it into a readable list.
  const uploadAll = () => {
    toast.success("File uploaded", { description: "report-q3.pdf" });
    setTimeout(() => toast.success("File uploaded", { description: "invoice-114.pdf" }), 250);
    setTimeout(() => toast.success("File uploaded", { description: "notes.md" }), 500);
  };

  return (
    <>
      <button className={BTN} onClick={uploadAll}>
        Spawn three toasts
      </button>
      <Toaster />
    </>
  );
}
```

## Always expanded

- Set `expand` on the Toaster to keep the stack open instead of collapsing it to a pile.

```tsx
"use client";

import { Toaster } from "@/components/custom/blocks/SonnerBlock";
import { toast } from "@/components/custom/blocks/sonner-store";

// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer";

export default function ExpandedStack() {
  // expand keeps the stack permanently open instead of collapsing it in 3D.
  // Mount <Toaster /> once, at the root of your app.
  return (
    <>
      <Toaster expand />

      <button
        className={BTN}
        onClick={() => {
          toast.success("File uploaded", { description: "report-q3.pdf" });
          setTimeout(() => toast.success("File uploaded", { description: "invoice-114.pdf" }), 250);
          setTimeout(() => toast.success("File uploaded", { description: "notes.md" }), 500);
        }}
      >
        Spawn three toasts
      </button>
    </>
  );
}
```

## Duration

- `duration` is the auto-dismiss delay in milliseconds. Pass `Infinity` and the toast stays up until dismissed.

```tsx
"use client";

import { Toaster } from "@/components/custom/blocks/SonnerBlock";
import { toast } from "@/components/custom/blocks/sonner-store";

// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm cursor-pointer";

// <Toaster /> belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function ToastDuration() {
  return (
    <>
      <div className="flex flex-wrap gap-4">
      {/* Infinity disables auto-dismiss — the user closes it */}
      <button
        className={BTN}
        onClick={() =>
          toast("Syncing your workspace", {
            description: "This toast stays until you dismiss it.",
            duration: Infinity,
          })
        }
      >
        Persistent
      </button>

      <button
        className={BTN}
        onClick={() =>
          toast.success("Saved", {
            description: "Gone in 1.5 seconds.",
            duration: 1500,
          })
        }
      >
        Quick
      </button>
      </div>
      <Toaster />
    </>
  );
}
```

## Position

- `position` anchors the stack to any of the six edges — `top-left` through `bottom-right`.

```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Toaster, type ToasterProps } from "@/components/custom/blocks/SonnerBlock";
import { toast } from "@/components/custom/blocks/sonner-store";

const POSITIONS: { value: NonNullable<ToasterProps["position"]>; label: string }[] = [
  { value: "top-left", label: "Top left" },
  { value: "top-center", label: "Top center" },
  { value: "top-right", label: "Top right" },
  { value: "bottom-left", label: "Bottom left" },
  { value: "bottom-center", label: "Bottom center" },
  { value: "bottom-right", label: "Bottom right" },
];

export default function PositionDemo() {
  const [position, setPosition] = useState<NonNullable<ToasterProps["position"]>>("bottom-right");

  return (
    <>
      {/* In a real app you mount <Toaster /> once, at the root, with a fixed position */}
      <Toaster position={position} />

      <div className="w-full max-w-md grid grid-cols-3 gap-2 sm:gap-3">
        {POSITIONS.map((p) => (
          <button
            key={p.value}
            onClick={() => {
              // Clear first, then move the stack, so the new toast animates in
              // at the new anchor instead of sliding across from the old one.
              toast.clear();
              setPosition(p.value);
              setTimeout(() => {
                toast(p.label, { description: `Stack anchored to "${p.value}".` });
              }, 50);
            }}
            className={cn(
              "px-2 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors",
              position === p.value
                ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                : "bg-muted text-foreground hover:bg-foreground/10",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </>
  );
}
```

## About Shadcn Sonner Toast

**What it is.** `SonnerBlock` provides `<Toaster />` and an imperative `toast()` API (`toast.success`, `toast.error`, `toast.info`) with 3D-scaled stacking, hover-to-expand, inline `action` buttons, and six viewport positions.

**How it is built.** A module-level store (`sonner-store`) holds the toasts and `<Toaster />` subscribes to it, so `toast()` works from any component or helper without a provider. The only npm dependency is `lucide-react` for icons. Older toasts scale down behind the newest one and fan out on hover; the store keeps at most five.

**When to use it.** Use `Sonner` when you want a lightweight, imperative `toast()` function with 3D stacking. If you want `glow` or `glass` card variants scoped via React Context, use [Toast](https://avaraui.com/docs/nextjs/toast).

## For AI agents

**When to use**

- Imperative `toast()` / `toast.success()` / `toast.error()` notifications without a React Context provider
- Stacked corner notifications with hover-to-expand and inline Undo/action buttons

**When not to use**

- Provider-scoped `glow` or `glass` toast variants — use [Toast](https://avaraui.com/docs/nextjs/toast)
- Persistent inline page banners — use [Alert](https://avaraui.com/docs/nextjs/alert)

**Agent notes**

- Import `Toaster` from `@/components/custom/blocks/SonnerBlock` and `toast` from `@/components/custom/blocks/sonner-store`; `toast` is not exported from `SonnerBlock`.
- Mount `<Toaster position="bottom-right" />` once in your layout; pass `duration: Infinity` to keep a toast open until dismissed.
- `toast()` returns the toast id; `toast.dismiss(id)` removes one and `toast.clear()` removes all.

## Props Reference

| Target | Prop / Argument | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `<Toaster>` | `position` | `"bottom-right" \| "bottom-center" \| "bottom-left" \| "top-right" \| "top-center" \| "top-left"` | `"bottom-right"` | Controls where the stack anchors on the screen. |
| `<Toaster>` | `expand` | `boolean` | `false` | If true, the stack is permanently expanded and will not collapse into the 3D view. |
| `toast()` | `title` | `string` | Required | The main, bold text of the notification. Passed as the first argument to the function. |
| `toast()` | `options.description` | `string` | `undefined` | Optional secondary text displayed beneath the title. |
| `toast()` | `options.duration` | `number` | `4000` | How long (in milliseconds) before the toast auto-dismisses. Pass `Infinity` to disable auto-dismiss. |
| `toast()` | `options.action` | `{ label: string, onClick: () => void }` | `undefined` | Provides an actionable button inside the toast. |
| `toast()` | `options.type` | `"default" \| "success" \| "error" \| "info"` | `"default"` | Determines the color scheme and accompanying icon. Alternatively, use the shorthand methods: `toast.success()`, `toast.error()`, etc. |

## Works with other components

- Pair `toast()` with [Copy Button](https://avaraui.com/docs/nextjs/copy-button), [Data Table](https://avaraui.com/docs/nextjs/data-table) batch actions, or [Dialog](https://avaraui.com/docs/nextjs/dialog) submissions.
- Use [Alert](https://avaraui.com/docs/nextjs/alert) instead when a message should remain inline on the page.
- Switch to [Toast](https://avaraui.com/docs/nextjs/toast) if you want `glow` or `glass` toast variants.

## Do I need a Provider for Sonner?

No. Mount `<Toaster />` once in your layout and import `toast` from `sonner-store` wherever you need it, including plain helper functions outside React components. The store lives at module level and `<Toaster />` subscribes to it, so there is no context to wrap around your tree.

## How do I keep the Sonner stack expanded or a toast persistent?

Pass `expand` to `<Toaster expand />` and the stack stays fanned out instead of collapsing into the 3D pile on hover. For a single toast that never auto-dismisses, pass `duration: Infinity` in its options; otherwise the default is 4000 milliseconds.

## How do I add an Undo button to a Sonner toast?

Pass `action: { label: "Undo", onClick }` in the options of `toast()`. The toast renders a button with that label, and clicking it runs your `onClick` and then dismisses the toast. A toast takes one action button, and it can sit beside an optional `description`.

## How many toasts can Sonner show at once?

The store keeps the five newest toasts and drops older ones. While the stack is collapsed only the front three are visible, scaled down slightly behind the newest. Hovering the stack, or setting `expand` on `<Toaster />`, lays all of them out as a readable list.

## How do I dismiss Sonner toasts from code?

`toast()` and its `success`, `error` and `info` shorthands return the toast id. Pass that id to `toast.dismiss(id)` to remove one toast, or call `toast.clear()` to empty the whole stack, as the Position example does before moving the `<Toaster />`.

## How is Sonner different from the Toast component?

Sonner uses an imperative `toast()` function and a module-level store, so it needs no provider and offers `default`, `success`, `error` and `info` types. [Toast](https://avaraui.com/docs/nextjs/toast) uses a `ToastProvider` with `useToast`, and adds `glow`, `glass` and `minimal` variants plus a `warning` type.

---

Live previews and every example: https://avaraui.com/docs/nextjs/sonner
