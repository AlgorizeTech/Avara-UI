# Toggle Group

A set of segmented, two-state buttons that can be toggled on or off, perfect for configuration settings and rich text editors.

This component utilizes a React Context Provider to make composition incredibly easy. Instead of passing active states and `onClick` handlers to every single button, you simply wrap your `` components inside the parent `` and it handles all of the logic automatically.

## Interactive Showcase

Use the control panel below to test the single-selection vs multiple-selection behaviors, as well as the structural variants.

## Installation

### Copy the Component

This component manages its own contextual state internally, requiring zero third-party dependencies while natively supporting dynamic color injections.

You can copy the full engine code directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/ToggleGroupBlock.tsx`.

---

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

          "indigo" | "rose" | "emerald" | "zinc" | string

          "zinc"

          The dynamic accent color applied to active items. Fully supports custom hex codes.

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

**Component Path:** `nextjs\toggle-group\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
