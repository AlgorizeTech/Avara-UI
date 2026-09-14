# Progress

A flexible, smoothly animated progress indicator built to handle loading states, storage meters, or step-by-step wizards.

This block is split into composable pieces: the core `` bar for the visual fill, the optional `` wrapper which handles the layout for labels and percentage text, `` with `` children for several values sharing one track, and `` for the same value drawn as a ring.

Colour carries state. `stages` changes the fill as thresholds are crossed — neutral while an operation starts, your brand colour once it is under way, green at 100 — and `status` overrides everything with the conventional success, warning and error hues so a failed job never looks like it is still running. The field's readout follows: a check on success, an alert on error, and an optional `hint` line that says what happened.

Each example shows a live preview with the exact code to copy.

export const usageStages = `// Each stage takes over from its \`from\` percent until the next.
const STAGES = [
  { from: 0, color: "zinc" },      // starting up
  { from: 10, color: "indigo" },   // under way
  { from: 100, color: "emerald" }, // done
];

export default function UploadProgress({
  value,
  failed,
}: {
  value: number;
  failed: boolean;
}) {
  // status wins over stages, so a failure is red no matter how far it got.
  const status = failed ? "error" : value >= 100 ? "success" : "active";

  // The ring and the bar share the value, stages and status, so they agree.
  return (

  );
}`;

export const usageStatuses = `import { Progress, ProgressField } from "@/components/custom/blocks/ProgressBlock";

export default function SyncStatus() {
  return (

  );
}`;

export const usageIndeterminate = `import { Progress, ProgressField } from "@/components/custom/blocks/ProgressBlock";

export default function ScanningLibrary() {
  // No value: the bar slides along the track until you know how far along you are.
  return (

  );
}`;

export const usageDefault = `import { Progress } from "@/components/custom/blocks/ProgressBlock";

export default function ProgressDemo() {
  // tooltip shows the percentage on hover; pass a function to format it.
  return ;
}`;

export const usageSteps = `import { Progress, ProgressField } from "@/components/custom/blocks/ProgressBlock";

export default function WizardProgress() {
  const step = 2;
  const totalSteps = 4;

  return (
    // showValue={false} hides the percentage when the label already says it.

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

          Progress

          stages

          {`{ from: number; color: ProgressColor }[]`}

          undefined

          Colour by threshold. from is a percentage; each stage's
          colour applies from that point until the next stage. Also on{" "}
          CircularProgress.

          Progress

          status

          "active" | "success" | "warning" | "error"

          "active"

          Semantic override: emerald, amber or red replace the theme colour and
          any stage. Exposed as data-status on the element. Also
          on CircularProgress, where it colours the centre readout.

          Progress

          indeterminate

          boolean

          false

          Unknown duration: a short bar slides along the track and{" "}
          aria-busy is set. Honours{" "}
          prefers-reduced-motion.

          Progress

          tooltip

          {`boolean | (value, max) => ReactNode`}

          false

          Hover readout in a bubble — at the fill's leading edge on the bar,
          above the ring on CircularProgress. true{" "}
          shows the percentage; a function formats it. Not shown while{" "}
          indeterminate.

          ProgressField

          status

          "active" | "success" | "warning" | "error"

          "active"

          Colours the readout and adds a glyph — a check on success, an alert
          on warning or error.

          ProgressField

          hint

          ReactNode

          undefined

          One line under the bar, in the status colour when a status is set.

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
