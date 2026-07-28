# Progress

A flexible, smoothly animated progress indicator built to handle loading states, storage meters, or step-by-step wizards.

This block is split into two composable pieces: the core `` bar for the visual fill, and the optional `` wrapper which automatically handles the layout for labels and percentage text.

## Features
Explore the Progress bar's features, including smooth value interpolation, indeterminate animations, and accessibility labels.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Interactive Showcase

Use the control panel below to test the different styles, colors, and layout wrappers.

## Installation

### Copy the Component

This component handles its own internal transition math and relies purely on standard Tailwind utilities.

You can copy the full engine code directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/ProgressBlock.tsx`.

---

## Usage

Use the `` component on its own for a simple visual bar, or wrap it in `` to automatically align labels and values.

```tsx

export default function StorageWidget() {
  const [usedSpace, setUsedSpace] = useState(45); // e.g. 45GB out of 100GB

  return (
    
       `${val} GB / ${max} GB`}
      >

  );
}
```

        Component
        Prop
        Type
        Default
        Description

          Progress

          value

          number

          0
        
        The current progress value to display.

          Progress

          max

          number

          100
        
        The maximum possible value. Used internally to calculate the percentage fill.

          Progress

          variant

          "default" | "glass" | "glow" | "minimal"

          "default"
        
        Determines the visual styling of the track background and the active indicator fill.

          Progress

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"
        
        Applies the active color theme to the progress indicator. Fully supports custom hex codes.

          Progress

          barSize

          "sm" | "md" | "lg"

          "md"
        
        Adjusts the vertical thickness (height) of the progress bar track and indicator.

          Progress

          indicatorClassName

          string

          undefined
        
        Optional Tailwind classes to append directly to the moving inner fill element.

          ProgressField

          label

          ReactNode

          undefined
        
        The text or React element to display on the top-left above the progress bar.

          ProgressField

          value

          number

          0
        
        The current numerical value passed down to handle display formatting.

          ProgressField

          max

          number

          100
        
        The maximum numerical value passed down to handle display formatting.

          ProgressField

          showValue

          boolean

          true
        
        If true, displays the current value/percentage on the top-right above the progress bar.

          ProgressField

          valueFormat

          (value: number, max: number) => ReactNode

          undefined
        
        A custom formatter function. If not provided, it defaults to calculating and displaying [percentage]%.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

---

**Component Path:** `nextjs\progress\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
