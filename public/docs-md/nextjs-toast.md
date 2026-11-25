---
title: "Shadcn Toast"
description: "A toast notification system with typed variants, action buttons, custom durations and glow, glass, stacked and minimal styles. Free shadcn/ui Toast component."
url: https://avaraui.com/docs/nextjs/toast
---

# Shadcn Toast

A context-driven toast notification system using the Web Animations API for elastic entrance/exit motion, pause-on-hover timers, and stackable `default`, `glow`, `glass`, and `minimal` variants.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/toast.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/toast
```

## Toast

Wrap the app in `ToastProvider`, then call `toast()` from the `useToast` hook.

- `position` on the provider is global — individual toasts cannot override it.

```tsx
"use client";

import { ToastProvider } from "@/components/custom/blocks/ToastBlock";
import { useToast } from "@/components/custom/blocks/toast-context";

function Triggers() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button
        onClick={() =>
          toast({
            title: "Message sent",
            description: "We'll let you know as soon as they reply.",
          })
        }
        className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl transition-colors shadow-sm hover:opacity-90 cursor-pointer"
      >
        Show toast
      </button>
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function SendMessage() {
  return (
    <ToastProvider position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

## Types

- `type` picks the icon and accent — `success`, `error`, `warning`, `info` or `default`.

```tsx
"use client";

import { ToastProvider } from "@/components/custom/blocks/ToastBlock";
import { useToast } from "@/components/custom/blocks/toast-context";

const TRIGGER =
  "px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  const types = [
    { type: "success", label: "Success", title: "Action completed", description: "Your file has been uploaded successfully.", className: "text-white bg-emerald-600 hover:bg-emerald-700" },
    { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "text-white bg-red-600 hover:bg-red-700" },
    { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "text-white bg-amber-500 hover:bg-amber-600" },
    { type: "info", label: "Update available", title: "Update available", description: "A new version is ready to install.", className: "text-white bg-blue-600 hover:bg-blue-700" },
    { type: "default", label: "Default", title: "Message sent", description: undefined, className: "bg-primary text-primary-foreground hover:bg-primary/90" },
  ] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {types.map((t) => (
        <button
          key={t.type}
          onClick={() =>
            toast({ title: t.title, description: t.description, type: t.type })
          }
          className={`${TRIGGER} ${t.className}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function ToastTypes() {
  return (
    <ToastProvider position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

## With action

- Pass `action` to add a button. Clicking it dismisses the toast as well as running your handler.

```tsx
"use client";

import { ToastProvider } from "@/components/custom/blocks/ToastBlock";
import { useToast } from "@/components/custom/blocks/toast-context";

function Triggers() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button
        onClick={() =>
          toast({
            title: "Update available",
            description: "A new version of the app is ready to install.",
            type: "info",
            action: {
              label: "Install Now",
              onClick: () => console.log("Installing..."),
            },
          })
        }
        className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl transition-colors shadow-sm hover:opacity-90 cursor-pointer"
      >
        Toast with action
      </button>
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function ToastWithAction() {
  return (
    <ToastProvider position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

## Duration

- `duration` is the auto-dismiss delay in milliseconds. `0` keeps the toast up until it is dismissed.

```tsx
"use client";

import { ToastProvider } from "@/components/custom/blocks/ToastBlock";
import { useToast } from "@/components/custom/blocks/toast-context";

const TRIGGER =
  "px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <button
        onClick={() =>
          toast({
            title: "Upload in progress",
            description: "This toast stays until you dismiss it.",
            type: "info",
            duration: 0,
          })
        }
        className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl transition-colors shadow-sm hover:opacity-90 cursor-pointer"
      >
        Persistent toast
      </button>
      <button
        onClick={() =>
          toast({
            title: "Saved",
            description: "This one disappears after 1.5 seconds.",
            type: "success",
            duration: 1500,
          })
        }
        className={`${TRIGGER} text-white bg-emerald-600 hover:bg-emerald-700`}
      >
        Quick toast
      </button>
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function ToastDuration() {
  return (
    <ToastProvider position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

## Glow

- Set `variant="glow"` to surround the card with a coloured halo — built for dark surfaces.

```tsx
"use client";

import { ToastProvider } from "@/components/custom/blocks/ToastBlock";
import { useToast } from "@/components/custom/blocks/toast-context";

const TRIGGER =
  "px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  const types = [
    { type: "success", label: "Success", title: "Action completed", description: "Your file has been uploaded successfully.", className: "text-white bg-emerald-600 hover:bg-emerald-700" },
    { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "text-white bg-red-600 hover:bg-red-700" },
    { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "text-white bg-amber-500 hover:bg-amber-600" },
    { type: "info", label: "Update available", title: "Update available", description: "A new version is ready to install.", className: "text-white bg-blue-600 hover:bg-blue-700" },
    { type: "default", label: "Default", title: "Message sent", description: undefined, className: "bg-primary text-primary-foreground hover:bg-primary/90" },
  ] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {types.map((t) => (
        <button
          key={t.type}
          onClick={() =>
            toast({ title: t.title, description: t.description, type: t.type })
          }
          className={`${TRIGGER} ${t.className}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function GlowToasts() {
  return (
    // variant lives on the provider, so every toast it renders picks it up.
    <ToastProvider variant="glow" position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

## Glass

- Set `variant="glass"` for a frosted card with the type accent bleeding in from the icon corner — solid badge icons, centred close button.

```tsx
"use client";

import { ToastProvider } from "@/components/custom/blocks/ToastBlock";
import { useToast } from "@/components/custom/blocks/toast-context";

const TRIGGER =
  "px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  const types = [
    { type: "success", label: "Success", title: "Changes saved", description: "Your profile has been updated.", className: "text-white bg-emerald-600 hover:bg-emerald-700" },
    { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "text-white bg-red-600 hover:bg-red-700" },
    { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "text-white bg-amber-500 hover:bg-amber-600" },
    { type: "info", label: "Info", title: "Update available", description: "A new version is ready to install.", className: "text-white bg-blue-600 hover:bg-blue-700" },
    { type: "default", label: "Default", title: "Message sent", description: undefined, className: "bg-primary text-primary-foreground hover:bg-primary/90" },
  ] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {types.map((t) => (
        <button
          key={t.type}
          onClick={() =>
            toast({ title: t.title, description: t.description, type: t.type })
          }
          className={`${TRIGGER} ${t.className}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function GlassToasts() {
  return (
    // variant lives on the provider, so every toast it renders picks it up.
    <ToastProvider variant="glass" position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

## Stacked

Fire a few in a row, then hover the pile to fan it out.

- Set `stack` on the provider to pile toasts behind the newest one instead of listing them. Hovering expands the pile and pauses every timer in it; `stack` works with any `variant`.

```tsx
"use client";

import { ToastProvider } from "@/components/custom/blocks/ToastBlock";
import { useToast } from "@/components/custom/blocks/toast-context";

const TRIGGER =
  "px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  const types = [
    { type: "success", label: "Success", title: "Changes saved", description: "Your profile has been updated.", className: "text-white bg-emerald-600 hover:bg-emerald-700" },
    { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "text-white bg-amber-500 hover:bg-amber-600" },
    { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "text-white bg-red-600 hover:bg-red-700" },
    { type: "info", label: "Info", title: "Update available", description: "A new version is ready to install.", className: "text-white bg-blue-600 hover:bg-blue-700" },
  ] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {types.map((t) => (
        <button
          key={t.type}
          onClick={() =>
            toast({ title: t.title, description: t.description, type: t.type })
          }
          className={`${TRIGGER} ${t.className}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function StackedToasts() {
  return (
    // stack piles toasts behind the newest one; hover the pile to fan it out.
    <ToastProvider variant="glass" stack position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

## Minimal

- Set `variant="minimal"` to strip the card down to a thin accent bar and text.

```tsx
"use client";

import { ToastProvider } from "@/components/custom/blocks/ToastBlock";
import { useToast } from "@/components/custom/blocks/toast-context";

const TRIGGER =
  "px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  const types = [
    { type: "success", label: "Success", title: "Action completed", description: "Your file has been uploaded successfully.", className: "text-white bg-emerald-600 hover:bg-emerald-700" },
    { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "text-white bg-red-600 hover:bg-red-700" },
    { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "text-white bg-amber-500 hover:bg-amber-600" },
    { type: "info", label: "Update available", title: "Update available", description: "A new version is ready to install.", className: "text-white bg-blue-600 hover:bg-blue-700" },
    { type: "default", label: "Default", title: "Message sent", description: undefined, className: "bg-primary text-primary-foreground hover:bg-primary/90" },
  ] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {types.map((t) => (
        <button
          key={t.type}
          onClick={() =>
            toast({ title: t.title, description: t.description, type: t.type })
          }
          className={`${TRIGGER} ${t.className}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
// <ToastProvider> — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function MinimalToasts() {
  return (
    // variant lives on the provider, so every toast it renders picks it up.
    <ToastProvider variant="minimal" position="bottom-right">
      <Triggers />
    </ToastProvider>
  );
}
```

## About Shadcn Toast

**What it is.** A context-powered notification system (`ToastProvider` + `useToast`) supporting `success`, `error`, `warning`, `info`, and `default` types, action buttons, persistent durations, and four visual variants (`default`, `glow`, `glass`, `minimal`) with optional `stack` piling.

**How it is built.** Uses React Context for the toast queue and the browser's built-in Web Animations API for spring-like entrance and exit transitions with zero external animation dependencies. Hovering pauses auto-dismiss timers.

**When to use it.** Use `Toast` when you want provider-scoped visual variants (`glow`, `glass`, `minimal`) or custom action buttons. For a zero-provider `toast()` import that can be called outside React components, use [Sonner](https://avaraui.com/docs/nextjs/sonner).

## For AI agents

**When to use**

- App-wide notifications styled with `default`, `glow`, `glass`, or `minimal` variants
- Stacked notification piles (`stack` on `ToastProvider`) with hover-to-expand and timer pause

**When not to use**

- Calling `toast()` outside React components without a provider — use [Sonner](https://avaraui.com/docs/nextjs/sonner)
- Persistent inline page messages — use [Alert](https://avaraui.com/docs/nextjs/alert)

**Agent notes**

- Wrap the root layout in `<ToastProvider>` from `@/components/custom/blocks/ToastBlock` and call `const { toast } = useToast()` inside client components
- `position` and `variant` are set globally on `ToastProvider`; pass `duration: 0` for a persistent toast

**Ask before you pick.** This page has 4 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 4 options as live previews: https://avaraui.com/view/toast

**When to use it.** A notification system that keeps its own state and animates with the browser's Web Animations API, in four card styles: the default, a glow, frosted glass and a minimal accent bar.

**Gotchas:**

- All four are looks of the one `toast` item: install it once and set `variant` from the index.
- Stacking (`stack`) piles toasts behind the newest one and works with any style; it is a prop, not a design.
- Types (`success`, `error`, `warning`, `info`, `default`), an action button and the duration are props on any style.

### The 4 variants

1. **Default** (`default`): The standard card with an icon and accent for each toast type.
   - Live: https://avaraui.com/view/toast/default
   - Best for: notifications on a normal light or dark interface
   - Avoid if: you want an effect such as a glow or frosted glass
   - Traits: type icon and accent, default look
   - Install: `npx shadcn@latest add @avara-ui/toast`
   - Docs: https://avaraui.com/docs/nextjs/toast#types
2. **Minimal** (`minimal`): The card is stripped down to a thin accent bar and text.
   - Live: https://avaraui.com/view/toast/minimal
   - Best for: a restrained interface where notifications should be unobtrusive
   - Avoid if: you want the toast type to be obvious from an icon at a glance
   - Traits: thin accent bar, text only
   - Install: `npx shadcn@latest add @avara-ui/toast`
   - Set these props: `{"variant":"minimal"}`
   - Docs: https://avaraui.com/docs/nextjs/toast#minimal
3. **Glow** (`glow`): The card is surrounded by a coloured halo, built for dark surfaces.
   - Live: https://avaraui.com/view/toast/glow
   - Best for: a dark interface where notifications should stand out
   - Avoid if: your surface is light, since the glow is built for dark ones
   - Traits: coloured halo, for dark surfaces
   - Install: `npx shadcn@latest add @avara-ui/toast`
   - Set these props: `{"variant":"glow"}`
   - Docs: https://avaraui.com/docs/nextjs/toast#glow
4. **Glass** (`glass`): A frosted card with the type accent bleeding in from the icon corner, solid badge icons and a centred close button.
   - Live: https://avaraui.com/view/toast/glass
   - Best for: an interface over imagery or gradients
   - Avoid if: the background is plain and there is nothing to frost
   - Traits: frosted card, accent bleed from the icon, solid badge icons
   - Install: `npx shadcn@latest add @avara-ui/toast`
   - Set these props: `{"variant":"glass"}`
   - Docs: https://avaraui.com/docs/nextjs/toast#glass

## Props Reference

### `<ToastProvider>` Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `"top-right" \| "top-left" \| "top-center" \| "bottom-right" \| "bottom-left" \| "bottom-center"` | `"bottom-right"` | The global position where all toasts will stack on the screen. |
| `variant` | `"default" \| "glow" \| "glass" \| "minimal"` | `"default"` | Determines the global visual styling of the toast cards. `glow` adds a coloured halo, `glass` a frosted, type-tinted card, `minimal` a thin accent bar. |
| `stack` | `boolean` | `false` | Piles toasts on top of each other with the newest in front and older ones peeking out behind it. Hovering the pile fans it out into a list and pauses auto-dismiss until the pointer leaves. |

### `toast(options)` Properties

When calling the `toast()` function from the `useToast` hook, you can pass the following properties in the options object:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | Required | The bold, primary text displayed at the top of the toast. |
| `description` | `string` | `undefined` | The subtle, secondary text displayed below the title. |
| `type` | `"success" \| "error" \| "warning" \| "info" \| "default"` | `"default"` | Determines which icon is rendered next to the text. |
| `duration` | `number` | `5000` | Time in milliseconds before the toast automatically dismisses. Set to `0` to disable auto-dismiss. |
| `action` | `{ label: string, onClick: () => void }` | `undefined` | If provided, renders a bold, clickable button at the bottom of the toast. Automatically dismisses the toast when clicked. |

## Works with other components

- Trigger toasts after async [Action Button](https://avaraui.com/docs/nextjs/action-buttons) or [Form](https://avaraui.com/docs/nextjs/form) submissions.
- Pair with [Dialog](https://avaraui.com/docs/nextjs/dialog) to confirm background saves or deletions once the modal closes.
- Use [Sonner](https://avaraui.com/docs/nextjs/sonner) if you prefer a standalone `toast()` import without wrapping your layout in `ToastProvider`.

## How do I show a toast notification in React?

Mount `ToastProvider` once near your app root, then call `useToast()` in any client component and run `toast({ title, description, type })`. `type` can be `"success"`, `"error"`, `"warning"`, `"info"` or `"default"`, and it selects the icon.

## Why do I need ToastProvider?

It manages the active toast queue and the global `position`, `variant` and `stack` behaviour. Mount it once near your app root, such as `app/layout.tsx`, so any client component can call `useToast()`. `position` defaults to `"bottom-right"`.

## How do I make a toast stay open until dismissed?

Pass `duration: 0` in the `toast({ ... })` options. The default is `5000` milliseconds. Hovering over any auto-dismissing toast also pauses its timer, so a user reading the message is not interrupted halfway.

## How do I add an action button such as Undo to a toast?

Pass `action: { label, onClick }` in the `toast({ ... })` options. A bold button appears at the bottom of the toast, and clicking it runs your handler and dismisses the toast. Combine it with `duration: 0` if the user must act before it goes away.

## How do I stack toasts and change their style?

Set `stack` on `ToastProvider` to pile toasts with the newest in front and older ones peeking out behind; hovering fans the pile into a list. `variant` accepts `"default"`, `"glow"`, `"glass"` and `"minimal"`. Compare [Sonner](https://avaraui.com/docs/nextjs/sonner) for another toast option.

---

Live previews and every example: https://avaraui.com/docs/nextjs/toast
