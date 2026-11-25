---
title: "Shadcn Select"
description: "Shadcn Select. A custom, animated dropdown component supporting single selection, multi-select tags, live search filtering, and categorized option groups."
url: https://avaraui.com/docs/nextjs/select
---

# Shadcn Select

A custom, animated dropdown component supporting single selection, multi-select tags, live search filtering, and categorized option groups.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/select.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/select
```

## Select

A labelled dropdown with helper text.

- Pass `options` as `{ label, value }[]` — `icon` and `group` are optional per option.
- `value` and `onChange` are yours to hold; use an array when `multiple` is on.

```tsx
import { SelectBlock, type SelectOption } from "@/components/custom/blocks/SelectBlock";
import { useState } from "react";

import { Box, Code, Database, Paintbrush } from "lucide-react";

const options: SelectOption[] = [
  { label: "Engineering", value: "eng", icon: Code },
  { label: "Design", value: "design", icon: Paintbrush },
  { label: "Marketing", value: "mkt" },
  { label: "Operations", value: "ops", icon: Box },
  { label: "Data Science", value: "data", icon: Database },
];

export default function BasicSelect() {
  const [value, setValue] = useState("");

  return (
    <SelectBlock
      options={options}
      value={value}
      onChange={setValue}
      label="Department"
      helperText="Choose the options you wish to add."
      placeholder="Select an option..."
    />
  );
}
```

## Underlined

- Use `variant="underlined"` to reduce the trigger to a single baseline rule.

```tsx
import { useState } from "react";
import { SelectBlock, type SelectOption } from "@/components/custom/blocks/SelectBlock";

import { Box, Code, Database, Paintbrush } from "lucide-react";

const options: SelectOption[] = [
  { label: "Engineering", value: "eng", icon: Code },
  { label: "Design", value: "design", icon: Paintbrush },
  { label: "Marketing", value: "mkt" },
  { label: "Operations", value: "ops", icon: Box },
  { label: "Data Science", value: "data", icon: Database },
];

export default function UnderlinedSelect() {
  const [value, setValue] = useState("");

  return (
    <SelectBlock
      variant="underlined"
      options={options}
      value={value}
      onChange={setValue}
      label="Department"
      helperText="Choose the options you wish to add."
      placeholder="Select an option..."
    />
  );
}
```

## Searchable

- Set `searchable` to add a sticky filter bar at the top of the dropdown.

```tsx
import { useState } from "react";
import { SelectBlock, type SelectOption } from "@/components/custom/blocks/SelectBlock";

import { Box, Code, Database, Paintbrush } from "lucide-react";

const options: SelectOption[] = [
  { label: "Engineering", value: "eng", icon: Code },
  { label: "Design", value: "design", icon: Paintbrush },
  { label: "Marketing", value: "mkt" },
  { label: "Operations", value: "ops", icon: Box },
  { label: "Data Science", value: "data", icon: Database },
];

export default function SearchableSelect() {
  const [value, setValue] = useState("");

  return (
    <SelectBlock
      searchable
      options={options}
      value={value}
      onChange={setValue}
      label="Department"
      helperText="Choose the options you wish to add."
      placeholder="Select an option..."
    />
  );
}
```

## Multi-select

- Set `multiple` and pass an array as `value` — selections render as removable tags in the trigger.

```tsx
import { SelectBlock, type SelectOption } from "@/components/custom/blocks/SelectBlock";
import { useState } from "react";

import { Box, Code, Database, Paintbrush } from "lucide-react";

const options: SelectOption[] = [
  { label: "Engineering", value: "eng", icon: Code },
  { label: "Design", value: "design", icon: Paintbrush },
  { label: "Marketing", value: "mkt" },
  { label: "Operations", value: "ops", icon: Box },
  { label: "Data Science", value: "data", icon: Database },
];

export default function MultiSelect() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <SelectBlock
      multiple
      options={options}
      value={values}
      onChange={setValues}
      label="Department"
      helperText="Choose the options you wish to add."
      placeholder="Select an option..."
    />
  );
}
```

## About Shadcn Select

**What it is.** `SelectBlock` is a custom dropdown component matching `InputBlock` variants (`default`, `underlined`, etc.), with built-in support for icons, grouped options, sticky search filtering, and removable multi-select tags.

**How it is built.** Driven by React state and positioned dropdown menus with keyboard navigation, outside-click dismissal, and theme-synced active accents.

**When to use it.** Use `SelectBlock` when users pick one or more values from a structured `options` list. For free-text inputs with suggestions, use [Input](https://avaraui.com/docs/reactjs/input); for a command-style modal picker, use [Command](https://avaraui.com/docs/reactjs/command).

## For AI agents

**When to use**

- Single or multi-select dropdowns with optional icons, option groups, and live search
- Forms that need `SelectBlock` styling aligned with `InputBlock`

**When not to use**

- Free-text input with autocomplete hints — use [Input](https://avaraui.com/docs/reactjs/input) (`suggestions`)
- Full keyboard command menu — use [Command](https://avaraui.com/docs/reactjs/command)

**Agent notes**

- Named export: `import { SelectBlock, type SelectOption } from "@/components/custom/blocks/SelectBlock"`
- Controlled via `value` and `onChange`; pass `multiple` with a `string[]` value for removable tag chips

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/select

**When to use it.** A custom dropdown that replaces the native `<select>`, matching the input styles, with optional search, grouping and multi-select, in two trigger styles: bordered and underlined.

**When to use something else:**

- [Input](https://avaraui.com/docs/reactjs/input): for free-text entry rather than choosing from a list.

**Gotchas:**

- Both are looks of the one `select` item: install it once and set `variant` from the index.
- Searchable (`isSearchable`) and multi-select (`isMultiple`, with an array `value`) are props on either style.

### The 2 variants

1. **Bordered** (`default`): The default bordered trigger.
   - Live: https://avaraui.com/view/select/default
   - Best for: a standard form dropdown beside bordered inputs
   - Avoid if: your form uses underlined fields
   - Traits: bordered trigger, default look
   - Install: `npx shadcn@latest add @avara-ui/select`
   - Docs: https://avaraui.com/docs/nextjs/select#select
2. **Underlined** (`underlined`): The trigger is reduced to a single baseline rule.
   - Live: https://avaraui.com/view/select/underlined
   - Best for: a minimal form that uses underlined inputs
   - Avoid if: you mix it with bordered fields
   - Traits: baseline rule
   - Install: `npx shadcn@latest add @avara-ui/select`
   - Set these props: `{"variant":"underlined"}`
   - Docs: https://avaraui.com/docs/nextjs/select#underlined

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `SelectOption[]` | Required | An array of objects: `{ label: string, value: string, icon?: ReactNode, group?: string }` . |
| `value` | `string \| string[]` | `undefined` | The currently selected value(s). Use an array if `multiple` is true. |
| `onChange` | `(val: any) => void` | `undefined` | Callback function fired when a user selects or removes an option. |
| `multiple` | `boolean` | `false` | If true, allows selecting multiple options and renders them as removable tags in the input field. |
| `searchable` | `boolean` | `false` | If true, renders a sticky search bar inside the dropdown menu to filter options by label. |
| `inputSize` | `"sm" \| "md" \| "lg"` | `"md"` | Uniformly scales the padding, text size, and icon size of the select trigger and dropdown menu. |
| `variant` | `"default" \| "filled" \| "underlined" \| "glow"` | `"default"` | Determines the visual styling of the borders, background, and focus rings. |
| `color` | `"indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"indigo"` | Applies the global color theme to the focus ring, glow shadow, hover states, checkmarks, and multi-select tags. Accepts hex codes. |
| `label` | `string` | `undefined` | Renders a bold, accessible label directly above the select. |
| `helperText` | `string` | `undefined` | Subtle instructional text rendered below the select. |
| `error` | `string` | `undefined` | If provided, turns the select red, adds an alert icon, and replaces the helper text with the error message. |
| `disabled` | `boolean` | `false` | Disables interactions and applies a faded, read-only style. |
| `icon` | `ReactNode` | `undefined` | An optional React component to render inside the left edge of the trigger button. |

## Works with other components

- Pair `SelectBlock` with [Input](https://avaraui.com/docs/reactjs/input) and [Form](https://avaraui.com/docs/reactjs/form) for consistent field heights and `underlined` variants.
- Place inside [Dialog](https://avaraui.com/docs/reactjs/dialog) or [Drawer](https://avaraui.com/docs/reactjs/drawer) filter panels.
- Use [Apple Select](https://avaraui.com/docs/reactjs/apple-select) when you want a macOS-inspired wheel/pill selector aesthetic.

## How do I build a multi-select dropdown with tags in React?

Set `multiple` on `SelectBlock`, pass an array to `value` and handle the array in `onChange`. Selected options render as removable tags inside the input. Without `multiple`, `value` is a single string and picking another option replaces it.

## How do I add a search box to the dropdown?

Set `searchable` to `true`. A sticky search bar appears at the top of the menu and filters the `options` by their `label`. It is off by default, so short lists stay uncluttered. It works with both single and multiple selection.

## How do I group options under headings?

Give each item in `options` a `group` string next to its `label` and `value`. Options that share the same `group` are listed together. You can also pass an `icon` node on each option, such as a `lucide-react` icon.

## How do I show a validation error on SelectBlock?

Pass a string to `error`. The select turns red, adds an alert icon and replaces `helperText` with your message. Use `label` for the text above the field. `disabled` makes the control read-only with a faded style.

## How is SelectBlock different from the Apple Select?

`SelectBlock` is a form field that mirrors the `InputBlock` variants (`default`, `filled`, `underlined`, `glow`) and adds search, groups and multi-select. Use [Apple Select](https://avaraui.com/docs/reactjs/apple-select) when you want a macOS-inspired wheel or pill selector instead of a standard field.

---

Live previews and every example: https://avaraui.com/docs/nextjs/select
