# Date Picker

A completely custom, dependency-free Date Picker component. Native HTML `` elements vary wildly between browsers and operating systems, often breaking the visual consistency of your application.

This component solves that by using native JavaScript Date math to construct a flawless, customizable calendar dropdown that perfectly matches your UI kit's visual variants.

The calendar dropdown highlights today's date subtly and the selected date strongly, and it opens with plain absolute positioning and CSS transitions — no popover library required.

export const usageDefault = `export default function LaunchDatePicker() {
  const [date, setDate] = useState(null);

  return (
    
  );
}`;

export const usageError = `export default function ValidatedDatePicker() {
  const [date, setDate] = useState(null);

  // Passing \`error\` turns the trigger red, swaps in an alert icon and
  // replaces the helper text with your message.
  return (
    
  );
}`;

export const usageDisablePast = `export default function FutureOnlyPicker() {
  const [date, setDate] = useState(null);

  // Every day before today is greyed out and cannot be clicked.
  // Use minDate / maxDate for an arbitrary window instead.
  return (
    
  );
}`;

export const usageTime = `export default function DateTimePicker() {
  const [date, setDate] = useState(null);

  // showTime adds hour / minute / AM-PM columns — to the right of the
  // calendar when the viewport has room, under it otherwise. Picking a
  // day keeps the popover open until Done, and the Date you receive carries
  // the time. Pair it with disablePast to also block times that have passed
  // today.
  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/date-picker
```

## Examples

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

        disablePast
        boolean
        false
        Greys out every day before today so it cannot be picked. With showTime, times already passed today are disabled as well.

        minDate
        Date
        undefined
        Earliest selectable day (inclusive). Combined with disablePast, the later bound wins.

        maxDate
        Date
        undefined
        Latest selectable day (inclusive).

        showTime
        boolean
        false
        Adds hour / minute (and AM-PM) columns — to the right of the calendar when the viewport has room (the popover widens to 30rem), under it otherwise. The popover also flips to hang from the trigger's right edge when that is the side with space. Picking a day keeps the popover open until Done, and value carries the chosen time.

        timeFormat
        "12h" | "24h"
        "12h"
        12-hour clock with an AM / PM column, or a 24-hour one.

        minuteStep
        number
        5
        Minute granularity of the time columns.

---

**Component Path:** `[framework]\date-picker\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
