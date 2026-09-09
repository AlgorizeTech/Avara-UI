# Progress

A flexible, smoothly animated progress indicator built to handle loading states, storage meters, or step-by-step wizards.

This block is split into composable pieces: the core `` bar for the visual fill, the optional `` wrapper which handles the layout for labels and percentage text, `` with `` children for several values sharing one track, and `` for the same value drawn as a ring.

Each example shows a live preview with the exact code to copy.

export const usageDefault = `import { Progress } from "@/components/custom/blocks/ProgressBlock";

export default function ProgressDemo() {
  return ;
}`;

export const usageFormatted = `"use client";

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

export const usageMulti = `import {
  MultiProgress,
  ProgressField,
  ProgressSegment,
} from "@/components/custom/blocks/ProgressBlock";

const phases = [
  { label: "Merged", value: 30 },
  { label: "In review", value: 18 },
  { label: "Drafted", value: 11 },
];

export default function ReleaseProgress() {
  const shipped = phases.reduce((sum, phase) => sum + phase.value, 0);

  return (
     \`\${value} / \${max} tasks\`}
    >
      {/* gap pulls the segments apart so each level reads on its own. */}
      
        {phases.map((phase) => (
          
        ))}

  );
}`;

export const usageMultiColors = `import {
  MultiProgress,
  ProgressField,
  ProgressSegment,
  getThemeStyles,
} from "@/components/custom/blocks/ProgressBlock";

const segments = [
  { label: "Documents", value: 18, color: "indigo" },
  { label: "Photos", value: 34, color: "emerald" },
  { label: "Videos", value: 21, color: "rose" },
  { label: "System", value: 9, color: "#f59e0b" },
];

// The legend reuses the block's theme table, so a dot and its segment
// can never drift apart.
function LegendDot({ color }: { color: string }) {
  const { theme, style } = getThemeStyles(color);
  return (
    
  );
}

export default function StorageBreakdown() {
  const used = segments.reduce((sum, segment) => sum + segment.value, 0);

  return (
     \`\${value} GB / \${max} GB\`}
    >
      
        {segments.map((segment) => (
          
        ))}

        {segments.map((segment) => (

            {segment.label}
          
        ))}

  );
}`;

export const usageCircular = `import { CircularProgress } from "@/components/custom/blocks/ProgressBlock";

export default function UploadRing() {
  return (
    
  );
}`;

export const usageCircularCustom = `import { CircularProgress } from "@/components/custom/blocks/ProgressBlock";

export default function CreditsRing() {
  const used = 68;

  return (
    // Children replace the centred percentage entirely.
    
      {used}
      
        of 100 credits

  );
}`;

## Installation

## Examples

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

          MultiProgress

          max

          number

          100
        
        The shared denominator every child segment measures its value against.

          MultiProgress

          gap

          number

          0
        
        Pixels between segments. Any value above 0 also rounds each segment's ends; 0 fuses them into one continuous bar.

          MultiProgress

          variant

          "default" | "glass" | "glow" | "minimal"

          "default"
        
        Styles the shared track behind the segments. Segment fills are colored individually.

          MultiProgress

          barSize

          "sm" | "md" | "lg"

          "md"
        
        Height of the shared track. Thicker tracks make multi-segment breakdowns easier to read.

          ProgressSegment

          value

          number

          0
        
        This slice's portion of the parent's max. Must be rendered inside a MultiProgress.

          ProgressSegment

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "primary"
        
        Color for this slice alone, so one track can carry several themes. Supports custom hex codes.

          ProgressSegment

          label

          string

          undefined
        
        Accessible name for the slice, also used as its native hover tooltip.

          CircularProgress

          value

          number

          0
        
        The current progress value, drawn as a filled arc starting at twelve o'clock.

          CircularProgress

          circleSize

          number

          120
        
        Outer diameter of the ring in pixels; the centred readout scales with it. The glow variant's halo fades out past this edge, the way a box-shadow does.

          CircularProgress

          barSize

          "sm" | "md" | "lg"

          "md"
        
        Ring thickness, on the same scale as the bar — 5, 9 and 14 pixels of stroke.

          CircularProgress

          showValue

          boolean

          true
        
        Draws the percentage in the middle of the ring. Ignored when children are supplied.

          CircularProgress

          children

          ReactNode

          undefined
        
        Replaces the centred readout entirely — use it for a count, an icon, or a caption.

          CircularProgress

          trackClassName

          string

          undefined
        
        Optional classes for the unfilled ring underneath the arc.

---

**Component Path:** `[framework]\progress\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
