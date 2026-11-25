---
title: "Shadcn Popover"
description: "Shadcn Popover. A portal-rendered floating panel (`Popover`, `PopoverTrigger`, `PopoverContent`) with collision flipping, viewport clamping."
url: https://avaraui.com/docs/nextjs/popover
---

# Shadcn Popover

A portal-rendered floating panel (`Popover`, `PopoverTrigger`, `PopoverContent`) with collision flipping, viewport clamping, and click-outside/`Escape` dismissal.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/popover.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/popover
```

## Account menu

- `className` on `PopoverContent` is where the panel width goes — any markup fits inside otherwise.

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/custom/blocks/PopoverBlock";
import { User } from "lucide-react";

export default function AccountMenu() {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
          <User className="w-5 h-5" />
        </div>
      </PopoverTrigger>

      {/* className overrides the default w-72 */}
      <PopoverContent side="bottom" align="end" className="w-64">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-sm shrink-0">
              AB
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Andy Bernard</span>
              <span className="text-xs text-muted-foreground">andy@dundermifflin.com</span>
            </div>
          </div>
          <button className="text-left text-sm text-muted-foreground hover:text-foreground">
            View Profile
          </button>
          <button className="text-left text-sm text-muted-foreground hover:text-foreground">
            Billing Settings
          </button>
          <button className="text-left text-sm text-rose-600 hover:text-rose-700 mt-2 font-medium">
            Log out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## Offset

- `sideOffset={8}` is the gap in pixels between trigger and panel.
- `collisionPadding={8}` is the minimum gap kept from the viewport edges while `avoidCollisions` is on.

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/custom/blocks/PopoverBlock";
import { Settings2 } from "lucide-react";

// The panel body, lifted out so both examples can render the same content.
function DimensionsPanel() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h4 className="text-sm font-semibold">Dimensions</h4>
        <p className="text-xs text-muted-foreground">Set the size of the layer.</p>
      </div>
      {[
        { label: "Width", value: "100%" },
        { label: "Max width", value: "640px" },
        { label: "Height", value: "auto" },
      ].map((row) => (
        <div key={row.label} className="grid grid-cols-3 items-center gap-3">
          <label className="text-sm text-muted-foreground">{row.label}</label>
          <input
            defaultValue={row.value}
            className="col-span-2 h-8 rounded-md border border-input bg-transparent px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      ))}
    </div>
  );
}

export default function OffsetPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer text-sm font-semibold">
          <Settings2 className="w-4 h-4" />
          Configure Settings
        </div>
      </PopoverTrigger>

      {/* sideOffset pushes the panel further from the trigger (default 8) */}
      <PopoverContent side="right" align="start" sideOffset={24}>
        <DimensionsPanel />
      </PopoverContent>
    </Popover>
  );
}
```

## About Shadcn Popover

**What it is.** `Popover`, `PopoverTrigger`, and `PopoverContent` display interactive menus, filters, or forms anchored to a trigger element.

**How it is built.** Portals into `document.body` via `createPortal` so `overflow-hidden` ancestors never clip it, flips `side`/`align` automatically when space is tight (`avoidCollisions`), and dismisses on outside click or `Escape`.

**When to use it.** Use `Popover` for click-triggered menus, settings panels, and inline pickers. For hover/focus text hints, use [Tooltip](https://avaraui.com/docs/nextjs/tooltip); for blocking tasks, use [Dialog](https://avaraui.com/docs/nextjs/dialog).

## For AI agents

**When to use**

- Click-triggered floating panels (account menus, filter controls, quick settings)

**When not to use**

- Hover/focus text hints — use [Tooltip](https://avaraui.com/docs/nextjs/tooltip)
- Blocking modal confirmations — use [Dialog](https://avaraui.com/docs/nextjs/dialog)

**Agent notes**

- Named exports: `Popover`, `PopoverTrigger`, `PopoverContent` from `@/components/custom/blocks/PopoverBlock`
- Set panel width via `className` on `PopoverContent`; tune gaps with `sideOffset` and `collisionPadding`
- Open state is internal: `Popover` takes only `children`, with no `open` or `onOpenChange` prop
- `PopoverTrigger` always renders its own `div` wrapper; the `asChild` prop is declared but not implemented, so nest your element inside it

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `PopoverContent` | `side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | The preferred side of the trigger to render the popover content. |
| `PopoverContent` | `align` | `"start" \| "center" \| "end"` | `"center"` | The preferred alignment against the chosen side. For example, `side="bottom" align="start"` aligns the left edge of the popover with the left edge of the trigger. |
| `PopoverContent` | `sideOffset` | `number` | `8` | The distance (in pixels) to render the popover away from the trigger element. |
| `PopoverContent` | `avoidCollisions` | `boolean` | `true` | Flips the panel to the opposite side and shifts it back into view when the preferred placement would overflow the viewport — this is what keeps `side="left" / "right"` and `align="start" / "end"` from being cropped on phones. Set to `false` to pin the panel to `side`/ `align` regardless. |
| `PopoverContent` | `collisionPadding` | `number` | `8` | Minimum gap (in pixels) kept between the panel and the viewport edges when `avoidCollisions` is on. |
| All Components | `className` | `string` | `undefined` | Standard Tailwind CSS overrides. By default, `PopoverContent` has a fixed width (`w-72`), which you can easily override here. |

## Works with other components

- Pair `Popover` with [Button](https://avaraui.com/docs/nextjs/button) triggers and [Color Picker](https://avaraui.com/docs/nextjs/color-picker) or [Date Picker](https://avaraui.com/docs/nextjs/date-picker) panels.
- Use [Context Menu](https://avaraui.com/docs/nextjs/context-menu) for right-click menus instead of left-click popovers.

## Why won't PopoverContent get clipped inside overflow-hidden containers?

`PopoverContent` renders into the trigger's `document.body` through `createPortal`, so ancestors with `overflow-hidden` cannot cut it off. It is positioned from the trigger's bounding box and kept inside the viewport with `collisionPadding` while `avoidCollisions` is on.

## How do I control the Popover open state?

You cannot through props: `Popover` accepts only `children` and keeps `open` in internal state. It toggles on a trigger click, `Enter` or `Space`, and closes on an outside `mousedown` or `touchstart`, or on `Escape`. Clicks inside `PopoverContent` do not close it.

## How do I stop PopoverContent from flipping or moving on small screens?

Pass `avoidCollisions={false}` to pin the panel to `side` and `align`, which also turns off viewport clamping and size capping. By default it flips to the opposite side when there is more room there, drops to above or below the trigger when neither horizontal side fits, and scrolls if still too tall.

## How do I change the PopoverContent width?

Pass a width class through `className`, for example `className="w-64"`. The default is `w-72`, limited by `max-w-[calc(100vw-1rem)]`, and the width stays a single class so your override applies at every breakpoint. Padding is `p-3`, rising to `lg:p-4`.

## Is Popover keyboard accessible?

Partly. `PopoverTrigger` is a `div` with `role="button"`, `tabIndex={0}`, `aria-haspopup="dialog"` and `aria-expanded`, and opens with `Enter` or `Space`. The panel has `role="dialog"` and closes on `Escape`, but focus is not moved or trapped, so use [Dialog](https://avaraui.com/docs/nextjs/dialog) for modal tasks.

## Can PopoverTrigger use asChild with my own Button?

No. `asChild` appears in the `PopoverTriggerProps` type but the component never reads it, so the trigger always renders its own `div`. Nest your element inside `PopoverTrigger`, as the demos do. It adds no npm dependencies and has no `next/*` imports.

---

Live previews and every example: https://avaraui.com/docs/nextjs/popover
