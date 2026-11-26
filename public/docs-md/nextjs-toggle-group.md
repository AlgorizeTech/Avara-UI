---
title: "Shadcn Toggle Group"
description: "Shadcn Toggle Group. A set of segmented two-state buttons (`ToggleGroup`, `ToggleGroupItem`) supporting single or multiple selection in `default`, `outline`."
url: https://avaraui.com/docs/nextjs/toggle-group
---

# Shadcn Toggle Group

A set of segmented two-state buttons (`ToggleGroup`, `ToggleGroupItem`) supporting single or multiple selection in `default`, `outline`, `ghost`, and `segmented` variants.

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

## Toggle Group

Single selection — exactly one item stays active at a time.

- `type="single"` is the default and behaves like radio buttons.
- `value` is a string here; pair it with `onValueChange`, or use `defaultValue` to stay uncontrolled.

```tsx
"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/custom/blocks/ToggleGroupBlock";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { useState } from "react";

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

## Outline

- Use `variant="outline"` to draw a border around the segment.

```tsx
"use client";

import { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/custom/blocks/ToggleGroupBlock";
import { AlignCenter, AlignLeft } from "lucide-react";

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

## Ghost

- Use `variant="ghost"` for items that only paint when active — no pill container.

```tsx
"use client";

import { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/custom/blocks/ToggleGroupBlock";
import { AlignCenter, AlignLeft } from "lucide-react";

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

## Segmented

A view switch: one highlight slides to the chosen item, which stays chosen when clicked again. The arrow keys move the choice.

- Use `variant="segmented"` for a pill track with a sliding highlight. It reads best with text labels and `type="single"`.

```tsx
"use client";

import { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/custom/blocks/ToggleGroupBlock";

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

## Sizes

- Use `size` to change the item height and padding across the whole group.

```tsx
"use client";

import { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/custom/blocks/ToggleGroupBlock";
import { AlignCenter, AlignLeft } from "lucide-react";

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

## Multiple selection

- Set `type="multiple"` for checkbox behaviour.
- `value` becomes a **string array** in this mode — passing a bare string selects nothing.

```tsx
"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/custom/blocks/ToggleGroupBlock";
import { Bold, Italic, Underline } from "lucide-react";
import { useState } from "react";

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

## Disabled

- Set `disabled` on the group to lock every item at once, rather than disabling them one by one.

```tsx
"use client";

import { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/custom/blocks/ToggleGroupBlock";
import { AlignCenter, AlignLeft } from "lucide-react";

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

## About Shadcn Toggle Group

**What it is.** A context-driven button group (`ToggleGroup` + `ToggleGroupItem`) supporting `type="single"` (string value) and `type="multiple"` (string array value) across `default`, `outline`, `ghost`, and sliding `segmented` variants.

**How it is built.** Shares selection state, `variant`, `size`, and `disabled` from `ToggleGroup` context to every child `ToggleGroupItem`, with arrow-key navigation in `segmented` mode.

**When to use it.** Use `ToggleGroup` for rich-text formatting toolbars, view switchers, and segmented option bars. For standalone binary toggles, use [Toggle](https://avaraui.com/docs/nextjs/toggle).

## For AI agents

**When to use**

- Single-choice segmented view switchers (`variant="segmented"`, `type="single"`)
- Multi-choice formatting toolbars (`type="multiple"`)

**When not to use**

- Standalone on/off buttons — use [Toggle](https://avaraui.com/docs/nextjs/toggle)
- Full tab panels with associated content — use [Vertical Tabs](https://avaraui.com/docs/nextjs/vertical-tabs)

**Agent notes**

- Named exports: `ToggleGroup`, `ToggleGroupItem` from `@/components/custom/blocks/ToggleGroupBlock`
- `type="single"` expects a `string` `value`; `type="multiple"` expects a `string[]` `value` (passing a bare string selects nothing)

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

## Works with other components

- Pair `ToggleGroup` with [Tooltip](https://avaraui.com/docs/nextjs/tooltip) for icon-only toolbar actions.
- Use [Toggle](https://avaraui.com/docs/nextjs/toggle) when controls are independent rather than grouped.
- Combine `variant="segmented"` with [Data Table](https://avaraui.com/docs/nextjs/data-table) or [Chart](https://avaraui.com/docs/nextjs/chart) view switchers.

## How do I build a single-select segmented control in React?

Use `ToggleGroup` with `type="single"` and `variant="segmented"`, then add a `ToggleGroupItem` with a unique `value` for each option. Control it with `value` and `onValueChange`, or give it `defaultValue` to leave state to the component.

## Why does type="multiple" require a string array?

With `type="multiple"`, `ToggleGroup` tracks several active keys at once, so `value` and `defaultValue` must be `string[]`. Passing a single string selects nothing. With `type="single"` the value is a plain string, and `"single"` is the default type.

## How does variant="segmented" differ from default?

`variant="segmented"` renders a pill track with a sliding active highlight, keeps one item selected when it is clicked again, and supports arrow-key navigation. It suits text-labelled view switches. The default variant wraps the items in a plain styled container.

## How do I disable one item or the whole group?

Set `disabled` on `ToggleGroup` to block interaction for every item, or on a single `ToggleGroupItem` to disable only that item. The item setting is independent of the group setting, and both default to `false`.

## How do I change the colour or size of a ToggleGroup?

Use `color` on the group, which accepts `"primary"`, `"indigo"`, `"rose"`, `"emerald"`, `"zinc"` or a custom string, and tints active items. `"primary"` follows your theme. `size` sets height, padding and text size for all items with `"sm"`, `"md"` or `"lg"`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/toggle-group
