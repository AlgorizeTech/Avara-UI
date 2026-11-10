---
title: "Shadcn Toggle Group"
description: "A set of segmented, two-state buttons that can be toggled on or off, perfect for configuration settings and rich text editors. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/toggle-group
---

# Shadcn Toggle Group

A set of segmented, two-state buttons that can be toggled on or off, perfect for configuration settings and rich text editors.

This component utilizes a React Context Provider to make composition incredibly easy. Instead of passing active states and `onClick` handlers to every single button, you simply wrap your `<ToggleGroupItem>` components inside the parent `<ToggleGroup>` and it handles all of the logic automatically.

Explore the different variations of the Toggle Group — each example shows a live preview with the exact code to copy.

## For AI agents

**Ask before you pick.** This page has 4 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 4 options as live previews: https://avaraui.com/view/toggle-group

**When to use it.** A set of segmented two-state buttons for settings and rich-text toolbars, in four looks: the default, outlined, ghost and a sliding pill track.

**Gotchas:**

- All four are looks of the one `toggle-group` item: install it once and set `variant` from the index.
- Single or multiple selection is the `type` prop (`multiple` takes a string array as `value`), and `size` and `disabled` are props on any look.
- The sliding pill track reads best with text labels and `type="single"`.

### The 4 variants

1. **Default** (`default`): The default segmented group, behaving like radio buttons in single mode.
   - Live: https://avaraui.com/view/toggle-group/default
   - Best for: a general settings or view switcher
   - Avoid if: you want a border around the group or a sliding highlight
   - Traits: default look, single or multiple selection
   - Install: `npx shadcn@latest add @avara-ui/toggle-group`
   - Docs: https://avaraui.com/docs/nextjs/toggle-group#toggle-group
2. **Outline** (`outline`): A border is drawn around the segment.
   - Live: https://avaraui.com/view/toggle-group/outline
   - Best for: a toolbar where the group should be clearly bounded
   - Avoid if: you want a lighter look
   - Traits: bordered segment
   - Install: `npx shadcn@latest add @avara-ui/toggle-group`
   - Set these props: `{"variant":"outline"}`
   - Docs: https://avaraui.com/docs/nextjs/toggle-group#outline
3. **Ghost** (`ghost`): Items paint only when active, with no pill container.
   - Live: https://avaraui.com/view/toggle-group/ghost
   - Best for: a rich-text toolbar where the buttons should stay light
   - Avoid if: you want the group to read as one control
   - Traits: paints only when active, no container
   - Install: `npx shadcn@latest add @avara-ui/toggle-group`
   - Set these props: `{"variant":"ghost"}`
   - Docs: https://avaraui.com/docs/nextjs/toggle-group#ghost
4. **Segmented pill** (`segmented`): A pill track with a sliding highlight.
   - Live: https://avaraui.com/view/toggle-group/segmented
   - Best for: a text-labelled single choice such as a tab-like switcher
   - Avoid if: you need multiple selection or icon-only items
   - Traits: pill track, sliding highlight
   - Install: `npx shadcn@latest add @avara-ui/toggle-group`
   - Set these props: `{"variant":"segmented"}`
   - Docs: https://avaraui.com/docs/nextjs/toggle-group#segmented

## Toggle Group

Single selection — exactly one item stays active at a time.

- `type="single"` is the default and behaves like radio buttons.
- `value` is a string here; pair it with `onValueChange`, or use `defaultValue` to stay uncontrolled.

```tsx
"use client";


export default function AlignmentGroup() {
  const [value, setValue] = useState("center");

  return (
    <ToggleGroup type="single" value={value} onValueChange={setValue}>
      <ToggleGroupItem value="left" aria-label="Toggle align left">
        <AlignLeft className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Toggle align center">
        <AlignCenter className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Toggle align right">
        <AlignRight className="w-4 h-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/toggle-group.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/toggle-group
```

## Examples

### Outline

- Use `variant="outline"` to draw a border around the segment.

```tsx
"use client";



export default function OutlineGroup() {
  const [value, setValue] = useState("left");

  return (
    <ToggleGroup
      variant="outline"
      type="single"
      value={value}
      onValueChange={setValue}
    >
      <ToggleGroupItem value="left" aria-label="Toggle align left">
        <AlignLeft className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Toggle align center">
        <AlignCenter className="w-4 h-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

### Ghost

- Use `variant="ghost"` for items that only paint when active — no pill container.

```tsx
"use client";



export default function GhostGroup() {
  const [value, setValue] = useState("left");

  return (
    <ToggleGroup
      variant="ghost"
      type="single"
      value={value}
      onValueChange={setValue}
    >
      <ToggleGroupItem value="left" aria-label="Toggle align left">
        <AlignLeft className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Toggle align center">
        <AlignCenter className="w-4 h-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

### Segmented

A view switch: one highlight slides to the chosen item, which stays chosen when clicked again. The arrow keys move the choice.

- Use `variant="segmented"` for a pill track with a sliding highlight. It reads best with text labels and `type="single"`.

```tsx
"use client";



export default function PeriodSwitch() {
  const [period, setPeriod] = useState("month");

  return (
    <ToggleGroup
      type="single"
      variant="segmented"
      value={period}
      onValueChange={setPeriod}
      aria-label="Reporting period"
    >
      <ToggleGroupItem value="day">Daily</ToggleGroupItem>
      <ToggleGroupItem value="week">Weekly</ToggleGroupItem>
      <ToggleGroupItem value="month">Monthly</ToggleGroupItem>
    </ToggleGroup>
  );
}
```

### Sizes

- Use `size` to change the item height and padding across the whole group.

```tsx
"use client";



const items = (
  <>
    <ToggleGroupItem value="left" aria-label="Toggle align left">
      <AlignLeft className="w-4 h-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="center" aria-label="Toggle align center">
      <AlignCenter className="w-4 h-4" />
    </ToggleGroupItem>
  </>
);

export default function GroupSizes() {
  const [value, setValue] = useState("left");

  return (
    <div className="flex flex-col items-center gap-6">
      <ToggleGroup size="sm" type="single" value={value} onValueChange={setValue}>
        {items}
      </ToggleGroup>
      <ToggleGroup size="md" type="single" value={value} onValueChange={setValue}>
        {items}
      </ToggleGroup>
      <ToggleGroup size="lg" type="single" value={value} onValueChange={setValue}>
        {items}
      </ToggleGroup>
    </div>
  );
}
```

### Multiple selection

- Set `type="multiple"` for checkbox behaviour.
- `value` becomes a **string array** in this mode — passing a bare string selects nothing.

```tsx
"use client";


export default function FormattingGroup() {
  const [value, setValue] = useState(["bold"]);

  return (
    <ToggleGroup type="multiple" value={value} onValueChange={setValue}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="w-4 h-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

### Disabled

- Set `disabled` on the group to lock every item at once, rather than disabling them one by one.

```tsx
"use client";



export default function DisabledGroup() {
  const [value, setValue] = useState("left");

  return (
    <ToggleGroup disabled type="single" value={value} onValueChange={setValue}>
      <ToggleGroupItem value="left" aria-label="Toggle align left">
        <AlignLeft className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Toggle align center">
        <AlignCenter className="w-4 h-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

## Usage

Use the `type` prop on the parent `<ToggleGroup>` to determine if the user can select only one option (`"single"`) or many options (`"multiple"`).

```tsx
import { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/custom/blocks/ToggleGroupBlock";
import { Bold, Italic, Underline } from "lucide-react";

export default function TextEditor() {
  const [format, setFormat] = useState(["bold"]);

  return (
    <div className="w-full p-4 border rounded-xl">
      <ToggleGroup
        onValueChange="{setFormat}"
        type="multiple"
        value="{format}"
        variant="default"
      >
        <ToggleGroupItem aria-label="Toggle bold" value="bold">
          <Bold className="w-4 h-4" />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle italic" value="italic">
          <Italic className="w-4 h-4" />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Toggle underline" value="underline">
          <Underline className="w-4 h-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
```

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `ToggleGroup` | `type` | `"single" \| "multiple"` | `"single"` | Determines the selection behavior. `"single"` acts like radio buttons, while `"multiple"` acts like checkboxes. |
| `ToggleGroup` | `value` | `string \| string[]` | `undefined` | The controlled value of the group. Pass a string for the `single` type, or an array of strings for the `multiple` type. |
| `ToggleGroup` | `defaultValue` | `string \| string[]` | `undefined` | The initial value if you are using the component in an uncontrolled manner. |
| `ToggleGroup` | `onValueChange` | `(value: string \| string[]) => void` | `undefined` | A callback fired whenever the active selection changes. |
| `ToggleGroup` | `variant` | `"default" \| "outline" \| "ghost" \| "segmented"` | `"default"` | The architectural style of the group. The `default` variant wraps the items in a styled pill container; `segmented` is a pill track whose highlight slides to the pressed item, keeps a single choice pressed, and moves it with the arrow keys. |
| `ToggleGroup` | `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | The dynamic accent color applied to active items. `"primary"` follows your theme's `--primary` token; custom hex codes are fully supported. |
| `ToggleGroup` | `size` | `"sm" \| "md" \| "lg"` | `"md"` | Uniformly controls the height, padding, and text size of all child toggle items. |
| `ToggleGroup` | `disabled` | `boolean` | `false` | If true, completely disables all interaction for every item inside the group. |
| `ToggleGroupItem` | `value` | `string` | Required | The unique identifier for this specific toggle button. This is the value passed to `onValueChange`. |
| `ToggleGroupItem` | `disabled` | `boolean` | `false` | Disables this specific item, independently of the parent group's disabled state. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/toggle-group
