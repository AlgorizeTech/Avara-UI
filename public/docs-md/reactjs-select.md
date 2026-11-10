---
title: "Shadcn Select"
description: "Shadcn Select component. A completely custom, headless-style dropdown component."
url: https://avaraui.com/docs/nextjs/select
---

# Shadcn Select

A completely custom, headless-style dropdown component. Native HTML `<select>` elements are notoriously difficult to style consistently across browsers.

This component solves that by using React state and clever absolute positioning to create a flawless, animated dropdown that perfectly matches the `InputBlock` visual variants. It has been supercharged to support **Multi-Select**, **Live Search Filtering**, and **Categorized Option Groups**.

Explore the different variations of the Select component — each example shows a live preview with the exact code to copy.

## For AI agents

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

## Select

A labelled dropdown with helper text.

- Pass `options` as `{ label, value }[]` — `icon` and `group` are optional per option.
- `value` and `onChange` are yours to hold; use an array when `multiple` is on.

```tsx
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

## Examples

### Underlined

- Use `variant="underlined"` to reduce the trigger to a single baseline rule.

```tsx
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

### Searchable

- Set `searchable` to add a sticky filter bar at the top of the dropdown.

```tsx
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

### Multi-select

- Set `multiple` and pass an array as `value` — selections render as removable tags in the trigger.

```tsx
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

## Features
Discover the Select component's accessible dropdown features, including keyboard navigation, search filtering, and custom rendering.

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

---

Live previews and every example: https://avaraui.com/docs/nextjs/select
