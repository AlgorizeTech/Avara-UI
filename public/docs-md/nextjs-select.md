# Select / Dropdown

A completely custom, headless-style dropdown component. Native HTML `` elements are notoriously difficult to style consistently across browsers.

This component solves that by using React state and clever absolute positioning to create a flawless, animated dropdown that perfectly matches the `InputBlock` visual variants. It has been supercharged to support **Multi-Select**, **Live Search Filtering**, and **Categorized Option Groups**.

## Interactive Showcase

Use the control panel below to test the different sizing options, structural variants, and advanced features.

- **Multi-Select:** Automatically renders selected items as removable, colored tags.
- **Searchable:** Injects a sticky search bar at the top of the dropdown to filter large lists.
- **Grouped Options:** Pass a `group` string to your options, and the component will automatically categorize and label them.

---

## Installation

### 1. Install Dependencies

This component relies on `lucide-react` for standard UI icons (ChevronDown, AlertCircle, Check, Search, X).

```bash
npm install lucide-react
```

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

**Component Path:** `nextjs\select\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
