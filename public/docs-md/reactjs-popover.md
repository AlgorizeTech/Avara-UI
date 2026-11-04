---
title: "Shadcn Popover"
description: "Displays rich, interactive content in a portal, triggered by a click. Free shadcn/ui Popover component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/popover
---

# Shadcn Popover

Displays rich, interactive content in a portal, triggered by a click.

While tooltips are meant for small text hints on hover, Popovers are designed to hold rich HTML (like forms, grids, and settings menus) triggered by a click. This `PopoverBlock` solves the biggest problem with complex layouts: clipping. By utilizing React's `createPortal`, the popover content is rendered at the root `document.body` level, meaning it will **never** be hidden or cropped by parent layout constraints like `overflow-hidden`.

The same goes for the screen edge. `side` and `align` are *preferences*: the panel flips to the opposite side when the preferred one has no room, shifts back inside the viewport when it still overhangs, and caps its own width and height to the screen — so a `w-72` panel opened `side="left"` next to a phone-width trigger stays fully readable instead of running off the edge. Pass `avoidCollisions={false}` to opt out.

Click a trigger to open its popover — you can interact with the content inside without it closing. Click outside or press `Escape` to dismiss.

## Account menu

- `className` on `PopoverContent` is where the panel width goes — any markup fits inside otherwise.

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/custom/blocks/PopoverBlock";

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

## Examples

### Offset

- `sideOffset={8}` is the gap in pixels between trigger and panel.
- `collisionPadding={8}` is the minimum gap kept from the viewport edges while `avoidCollisions` is on.

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/custom/blocks/PopoverBlock";

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

## Features
Discover the Popover's intelligent positioning engine that prevents collision with screen edges while displaying contextual content.

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
| `PopoverContent` | `side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | The preferred side of the trigger to render the popover content. |
| `PopoverContent` | `align` | `"start" \| "center" \| "end"` | `"center"` | The preferred alignment against the chosen side. For example, `side="bottom" align="start"` aligns the left edge of the popover with the left edge of the trigger. |
| `PopoverContent` | `sideOffset` | `number` | `8` | The distance (in pixels) to render the popover away from the trigger element. |
| `PopoverContent` | `avoidCollisions` | `boolean` | `true` | Flips the panel to the opposite side and shifts it back into view when the preferred placement would overflow the viewport — this is what keeps `side="left" / "right"` and `align="start" / "end"` from being cropped on phones. Set to `false` to pin the panel to `side`/ `align` regardless. |
| `PopoverContent` | `collisionPadding` | `number` | `8` | Minimum gap (in pixels) kept between the panel and the viewport edges when `avoidCollisions` is on. |
| All Components | `className` | `string` | `undefined` | Standard Tailwind CSS overrides. By default, `PopoverContent` has a fixed width (`w-72`), which you can easily override here. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/popover
