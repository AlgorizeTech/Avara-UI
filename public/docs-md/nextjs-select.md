# Select / Dropdown

A completely custom, headless-style dropdown component. Native HTML `` elements are notoriously difficult to style consistently across browsers.

This component solves that by using React state and clever absolute positioning to create a flawless, animated dropdown that perfectly matches the `InputBlock` visual variants. It has been supercharged to support **Multi-Select**, **Live Search Filtering**, and **Categorized Option Groups**.

## Examples

Explore the different variations of the Select component — each example shows a live preview with the exact code to copy.

export const usageDefault = `import { SelectBlock } from "@/components/custom/blocks/SelectBlock";

const options = [
  { label: "Engineering", value: "eng" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "mkt" },
];

export default function BasicSelect() {
  const [value, setValue] = useState("");

  return (
    
  );
}`;

export const usageUnderlined = `"use client";

export default function UnderlinedSelect() {
  const [value, setValue] = useState("");

  return (
    
  );
}`;

export const usageSearchable = `"use client";

export default function SearchableSelect() {
  const [value, setValue] = useState("");

  return (
    
  );
}`;

export const usageMultiple = `import { SelectBlock } from "@/components/custom/blocks/SelectBlock";

export default function MultiSelect() {
  const [values, setValues] = useState([]);

  return (
    
  );
}`;

## Installation

## Features
Discover the Select component's accessible dropdown features, including keyboard navigation, search filtering, and custom rendering.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Prop
        Type
        Default
        Description

          options

          SelectOption[]

          Required

          An array of objects:{" "}
          {`{ label: string, value: string, icon?: ReactNode, group?: string }`}
          .

          value

          string | string[]

          undefined

          The currently selected value(s). Use an array if multiple{" "}
          is true.

          onChange

          (val: any) => void

          undefined

          Callback function fired when a user selects or removes an option.

          multiple

          boolean

          false

          If true, allows selecting multiple options and renders them as
          removable tags in the input field.

          searchable

          boolean

          false

          If true, renders a sticky search bar inside the dropdown menu to
          filter options by label.

          inputSize

          "sm" | "md" | "lg"

          "md"

          Uniformly scales the padding, text size, and icon size of the select
          trigger and dropdown menu.

          variant

          "default" | "filled" | "underlined" | "glow"

          "default"

          Determines the visual styling of the borders, background, and focus
          rings.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies the global color theme to the focus ring, glow shadow, hover
          states, checkmarks, and multi-select tags. Accepts hex codes.

          label

          string

          undefined
        
        Renders a bold, accessible label directly above the select.

          helperText

          string

          undefined
        
        Subtle instructional text rendered below the select.

          error

          string

          undefined

          If provided, turns the select red, adds an alert icon, and replaces
          the helper text with the error message.

          disabled

          boolean

          false
        
        Disables interactions and applies a faded, read-only style.

          icon

          ReactNode

          undefined

          An optional React component to render inside the left edge of the
          trigger button.

---

**Component Path:** `[framework]\select\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
