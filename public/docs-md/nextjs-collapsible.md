---
title: "Shadcn Collapsible"
description: "Shadcn Collapsible. A dependency-free disclosure panel (`Collapsible`, `CollapsibleTrigger`."
url: https://avaraui.com/docs/nextjs/collapsible
---

# Shadcn Collapsible

A dependency-free disclosure panel (`Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`) animated via CSS Grid `0fr` → `1fr` transitions with free nesting.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/collapsible.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/collapsible
```

## Settings panel

- `children` of `CollapsibleTrigger` can be any markup — icons, subtitles, or a label that swaps with the open state.

```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/custom/blocks/CollapsibleBlock";
import { Bell, Check, Shield } from "lucide-react";
import { useState } from "react";

export default function SettingsPanel() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div className="w-full max-w-lg space-y-4">
      <Collapsible defaultOpen className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <CollapsibleTrigger className="w-full flex items-center justify-between p-5 hover:bg-muted transition-colors group">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-semibold text-foreground">
              Push Notifications
            </h4>
            <p className="text-xs text-muted-foreground">
              Manage your alert preferences
            </p>
          </div>
        </div>
        {/* Swap the affordance label using the same data-state hook */}
        <div className="text-xs font-medium text-muted-foreground group-data-[state=open]:hidden">
          Configure
        </div>
        <div className="text-xs font-medium text-muted-foreground hidden group-data-[state=open]:block">
          Close
        </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-5 border-t border-border mt-2 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground/80 cursor-pointer" onClick={() => setEmailAlerts(!emailAlerts)}>
                Email Alerts
              </label>
              <button
                type="button"
                role="checkbox"
                aria-checked={emailAlerts}
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`w-4 h-4 rounded flex items-center justify-center border transition-all cursor-pointer ${
                  emailAlerts
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-input bg-background"
                }`}
              >
                {emailAlerts && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground/80 cursor-pointer" onClick={() => setSmsAlerts(!smsAlerts)}>
                SMS Alerts
              </label>
              <button
                type="button"
                role="checkbox"
                aria-checked={smsAlerts}
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`w-4 h-4 rounded flex items-center justify-center border transition-all cursor-pointer ${
                  smsAlerts
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-input bg-background"
                }`}
              >
                {smsAlerts && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Second card starts closed — defaultOpen is per-instance. */}
      <Collapsible className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <CollapsibleTrigger className="w-full flex items-center justify-between p-5 hover:bg-muted transition-colors group">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-semibold text-foreground">
              Security & API
            </h4>
            <p className="text-xs text-muted-foreground">
              Tokens and authentication
            </p>
          </div>
        </div>
        {/* Swap the affordance label using the same data-state hook */}
        <div className="text-xs font-medium text-muted-foreground group-data-[state=open]:hidden">
          Configure
        </div>
        <div className="text-xs font-medium text-muted-foreground hidden group-data-[state=open]:block">
          Close
        </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-5 border-t border-border mt-2 space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Production Key
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value="sk_live_123456789"
                  readOnly
                  className="flex-1 bg-muted border border-input rounded-md p-2 text-sm text-muted-foreground"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium rounded-md">
                  Roll
                </button>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```

## File tree

Collapsibles nest freely; each level keeps its own open state.

- `defaultOpen` is per-level, so you can expand a branch without expanding its parent.

```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/custom/blocks/CollapsibleBlock";
import { ChevronRight, File, Folder } from "lucide-react";

export default function FileTree() {
  return (
    // Collapsibles nest freely — each level owns its own open state.
    <div className="w-full max-w-sm bg-card border border-border rounded-xl p-4 shadow-sm font-mono text-sm">
      <div className="space-y-1">
        {/* Level 1: src */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-start gap-2 w-full p-1.5 hover:bg-muted rounded-md text-foreground/80 group">
            <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
            <Folder className="w-4 h-4 text-primary shrink-0" />
            <span>src</span>
          </CollapsibleTrigger>

          <CollapsibleContent>
            {/* The before: rule draws the vertical guide line for this level. */}
            <div className="pl-[22px] space-y-1 relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-border mt-1 mb-1">
              {/* Level 2: app — open on first paint */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-start gap-2 w-full p-1.5 hover:bg-muted rounded-md text-foreground/80 group relative z-10">
                  <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  <Folder className="w-4 h-4 text-primary shrink-0" />
                  <span>app</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-[22px] space-y-1 relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-border mt-1 mb-1">
                    <div className="flex items-center gap-2 p-1.5 text-muted-foreground hover:bg-muted rounded-md cursor-pointer ml-6 relative z-10">
                      <File className="w-4 h-4 shrink-0" /> layout.tsx
                    </div>
                    <div className="flex items-center gap-2 p-1.5 text-muted-foreground hover:bg-muted rounded-md cursor-pointer ml-6 relative z-10">
                      <File className="w-4 h-4 shrink-0" /> page.tsx
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Level 2: components — closed, so no defaultOpen */}
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-start gap-2 w-full p-1.5 hover:bg-muted rounded-md text-foreground/80 group relative z-10">
                  <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  <Folder className="w-4 h-4 text-primary shrink-0" />
                  <span>components</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-[22px] space-y-1 relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-border mt-1 mb-1">
                    <div className="flex items-center gap-2 p-1.5 text-muted-foreground hover:bg-muted rounded-md cursor-pointer ml-6 relative z-10">
                      <File className="w-4 h-4 shrink-0" /> Button.tsx
                    </div>
                    <div className="flex items-center gap-2 p-1.5 text-muted-foreground hover:bg-muted rounded-md cursor-pointer ml-6 relative z-10">
                      <File className="w-4 h-4 shrink-0" /> Collapsible.tsx
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* A root-level file, indented to line up with the tree's children. */}
        <div className="flex items-center gap-2 p-1.5 text-muted-foreground hover:bg-muted rounded-md cursor-pointer ml-[22px]">
          <File className="w-4 h-4 shrink-0" /> package.json
        </div>
      </div>
    </div>
  );
}
```

## About Shadcn Collapsible

**What it is.** `Collapsible`, `CollapsibleTrigger`, and `CollapsibleContent` provide a composable expand/collapse disclosure panel that can be nested to any depth (for example, file trees and settings drawers).

**How it is built.** `CollapsibleContent` switches between the Tailwind classes `grid-rows-[0fr]` and `grid-rows-[1fr]` with a 200 ms transition that also fades opacity, so no height is measured in JavaScript and no animation library is needed. It only depends on the shadcn `utils` helper (`cn`).

**When to use it.** Use `Collapsible` for single disclosures or nested file trees. For coordinated multi-item FAQ lists, use [Accordion](https://avaraui.com/docs/nextjs/accordion).

## For AI agents

**When to use**

- Single expandable panels, advanced-settings disclosures, or nested file trees (`defaultOpen` per level)

**When not to use**

- Multi-item FAQ or exclusive-open sections — use [Accordion](https://avaraui.com/docs/nextjs/accordion)

**Agent notes**

- Named exports: `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` from `@/components/custom/blocks/CollapsibleBlock`
- `CollapsibleTrigger` and `CollapsibleContent` read the root's context and throw if rendered outside a `Collapsible`.
- Closed content stays mounted: `CollapsibleContent` only sets `aria-hidden` and collapses its height, so lazy-load heavy children yourself.
- Style the open state with the `data-state="open"` / `"closed"` attribute that the root, trigger and content all carry; the trigger also sets `aria-expanded`.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Collapsible` | `open` | `boolean` | `undefined` | The controlled open state of the collapsible. Must be used in conjunction with `onOpenChange`. |
| `Collapsible` | `defaultOpen` | `boolean` | `false` | The initial open state of the collapsible when it is first rendered. Used for uncontrolled state management. |
| `Collapsible` | `onOpenChange` | `(open: boolean) => void` | `undefined` | Event handler called when the open state of the collapsible changes. |
| `Collapsible` | `disabled` | `boolean` | `false` | When true, prevents the user from interacting with the `CollapsibleTrigger`. |
| All Components | `className` | `string` | `undefined` | Standard Tailwind CSS overrides for customized styling or spacing. |

## Works with other components

- Pair `Collapsible` inside [Card](https://avaraui.com/docs/nextjs/card) or [Sidebar](https://avaraui.com/docs/nextjs/sidebar) navigation trees.
- Use [Accordion](https://avaraui.com/docs/nextjs/accordion) when you want a styled multi-row FAQ list.

## Can Collapsible panels be nested inside each other?

Yes. Each `Collapsible` creates its own context and open state, from `defaultOpen` or the controlled `open` prop. A `CollapsibleTrigger` therefore only toggles its nearest parent `Collapsible`, so a file tree can expand a child folder without opening or closing its parent.

## How do I control a Collapsible from my own state?

Pass `open` together with `onOpenChange`. Once `open` is defined the component is controlled and never updates itself, so the panel only moves when your handler changes the value. Leave `open` undefined and set `defaultOpen` for the uncontrolled mode, where the root keeps its own state.

## How do I change the trigger label or icon when the panel is open?

Style from the `data-state` attribute. The trigger and the root both carry `data-state="open"` or `"closed"`, so a class such as `group-data-[state=open]:rotate-90` on a chevron inside a `group` trigger works without any state of your own. The trigger also sets `aria-expanded` for assistive technology.

## What happens to the content when a Collapsible is closed?

It stays in the DOM. `CollapsibleContent` keeps its children mounted and only collapses the grid row to `0fr`, fades opacity to 0 and sets `aria-hidden`. Inputs or links inside a closed panel can still receive keyboard focus, so avoid placing focusable controls there or render them conditionally.

## What does the disabled prop do on Collapsible?

It blocks toggling. With `disabled` on the root, the trigger renders as a disabled button at 50% opacity and `onOpenChange` is not called, even in controlled mode. The root and trigger also expose `data-disabled`, so you can style that state. It does not force the panel open or closed.

## Does Collapsible need Next.js or extra packages?

No. The file has no `next/*` imports and installs only through the shadcn `utils` registry item, with no npm dependencies of its own, so it works in Vite and any other React app. It is marked `"use client"`, which Next.js needs because it uses state and context.

---

Live previews and every example: https://avaraui.com/docs/nextjs/collapsible
