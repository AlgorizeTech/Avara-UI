# Toggle Group

A set of segmented, two-state buttons that can be toggled on or off, perfect for configuration settings and rich text editors.

This component utilizes a React Context Provider to make composition incredibly easy. Instead of passing active states and `onClick` handlers to every single button, you simply wrap your `` components inside the parent `` and it handles all of the logic automatically.

Explore the different variations of the Toggle Group — each example shows a live preview with the exact code to copy.

export const usageSingle = `"use client";

export default function AlignmentGroup() {
  const [value, setValue] = useState("center");

  return (

  );
}`;

export const usageOutline = `"use client";

export default function OutlineGroup() {
  const [value, setValue] = useState("left");

  return (

  );
}`;

export const usageGhost = `"use client";

export default function GhostGroup() {
  const [value, setValue] = useState("left");

  return (

  );
}`;

export const usageSizes = `"use client";

const items = (
  <>

);

export default function GroupSizes() {
  const [value, setValue] = useState("left");

  return (

        {items}

        {items}

        {items}

  );
}`;

export const usageMultiple = `"use client";

export default function FormattingGroup() {
  const [value, setValue] = useState(["bold"]);

  return (

  );
}`;

export const usageDisabled = `"use client";

export default function DisabledGroup() {
  const [value, setValue] = useState("left");

  return (

  );
}`;

## Installation

## Examples

## Usage

Use the `type` prop on the parent `` to determine if the user can select only one option (`"single"`) or many options (`"multiple"`).

```tsx

export default function TextEditor() {
  const [format, setFormat] = useState(["bold"]);

  return (

  );
}
```

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          ToggleGroup

          type

          "single" | "multiple"

          "single"

          Determines the selection behavior. "single" acts like radio buttons, while "multiple" acts like checkboxes.

          ToggleGroup

          value

          string | string[]

          undefined

          The controlled value of the group. Pass a string for the single type, or an array of strings for the multiple type.

          ToggleGroup

          defaultValue

          string | string[]

          undefined

          The initial value if you are using the component in an uncontrolled manner.

          ToggleGroup

          onValueChange

          (value: string | string[]) =&gt; void

          undefined

          A callback fired whenever the active selection changes.

          ToggleGroup

          variant

          "default" | "outline" | "ghost"

          "default"

          The architectural style of the group. The default variant wraps the items in a styled pill container.

          ToggleGroup

          color

          "primary" | "indigo" | "rose" | "emerald" | "zinc" | string

          "zinc"

          The dynamic accent color applied to active items. "primary" follows your theme's --primary token; custom hex codes are fully supported.

          ToggleGroup

          size

          "sm" | "md" | "lg"

          "md"

          Uniformly controls the height, padding, and text size of all child toggle items.

          ToggleGroup

          disabled

          boolean

          false

          If true, completely disables all interaction for every item inside the group.

      {/* ToggleGroupItem Props */}

          ToggleGroupItem

          value

          string

          Required

          The unique identifier for this specific toggle button. This is the value passed to onValueChange.

          ToggleGroupItem

          disabled

          boolean

          false

          Disables this specific item, independently of the parent group's disabled state.

---

**Component Path:** `[framework]\toggle-group\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
