# Date Picker

A completely custom, dependency-free Date Picker component. Native HTML `` elements vary wildly between browsers and operating systems, often breaking the visual consistency of your application.

This component solves that by using native JavaScript Date math to construct a flawless, customizable calendar dropdown that perfectly matches your UI kit's visual variants.

## Examples

The calendar dropdown highlights today's date subtly and the selected date strongly, and it opens with plain absolute positioning and CSS transitions — no popover library required.

export const usageDefault = `"use client";

export default function LaunchDatePicker() {
  const [date, setDate] = useState(null);

  return (
    
  );
}`;

export const usageVariants = `"use client";

export default function DatePickerVariants() {
  const [date, setDate] = useState(null);

  return (

  );
}`;

export const usageSizes = `"use client";

export default function DatePickerSizes() {
  const [date, setDate] = useState(null);

  return (

  );
}`;

export const usageError = `"use client";

export default function ValidatedDatePicker() {
  const [date, setDate] = useState(null);

  // Passing \`error\` turns the trigger red, swaps in an alert icon and
  // replaces the helper text with your message.
  return (
    
  );
}`;

export const usageDisabled = `import { DatePickerBlock } from "@/components/custom/blocks/DatePickerBlock";

export default function DisabledDatePicker() {
  return (
    
  );
}`;

## Installation

## Features
Discover the Date Picker's flexible input formatting, popover calendar selection, and range picking capabilities.

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

          value

          Date | null

          undefined
        
        The currently selected JavaScript Date object.

          onChange

          (val: Date) =&gt; void

          undefined

          Callback function fired when a user selects a date from the calendar.

          placeholder

          string

          "Pick a date"

          Text displayed inside the trigger button when no date is selected.

          inputSize

          "sm" | "md" | "lg"

          "md"

          Uniformly scales the padding, text size, and icon size of the trigger
          button.

          variant

          "default" | "filled" | "underlined" | "glow"

          "default"

          Determines the visual styling of the borders, background, and focus
          rings.

          color

          "primary" | "indigo" | "rose" | "emerald" | "zinc" | string

          "primary"

          Applies the global color theme to the focus ring, glow shadow, and the
          selected date bubble in the calendar. Accepts valid hex codes.

          label

          string

          undefined
        
        Renders a bold, accessible label directly above the input.

          helperText

          string

          undefined
        
        Subtle instructional text rendered below the input.

          error

          string

          undefined

          If provided, turns the input red, adds an alert icon, and replaces the
          helper text with the error message.

          disabled

          boolean

          false
        
        Disables interactions and applies a faded, read-only style.

---

**Component Path:** `nextjs\date-picker\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
