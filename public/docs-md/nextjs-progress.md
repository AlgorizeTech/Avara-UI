# Progress

A flexible, smoothly animated progress indicator built to handle loading states, storage meters, or step-by-step wizards.

This block is split into two composable pieces: the core `` bar for the visual fill, and the optional `` wrapper which automatically handles the layout for labels and percentage text.

## Examples

Each example shows a live preview with the exact code to copy.

export const usageDefault = `import { Progress } from "@/components/custom/blocks/ProgressBlock";

export default function ProgressDemo() {
  return ;
}`;

export const usageField = `import { Progress, ProgressField } from "@/components/custom/blocks/ProgressBlock";

export default function LabelledProgress() {
  return (

  );
}`;

export const usageVariants = `import { Progress, ProgressField } from "@/components/custom/blocks/ProgressBlock";

export default function ProgressVariants() {
  return (

  );
}`;

export const usageSizes = `import { Progress, ProgressField } from "@/components/custom/blocks/ProgressBlock";

export default function ProgressSizes() {
  return (

  );
}`;

export const usageFormatted = `import { useState } from "react";

export default function StorageWidget() {
  const [usedSpace] = useState(72); // 72 GB of 100 GB

  return (
     \`\${value} GB / \${max} GB\`}
    >

  );
}`;

export const usageSteps = `import { Progress, ProgressField } from "@/components/custom/blocks/ProgressBlock";

export default function WizardProgress() {
  const step = 2;
  const totalSteps = 4;

  return (
    // showValue={false} hides the percentage when the label already says it.

  );
}`;

## Installation

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

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

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

---

**Component Path:** `nextjs\progress\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
