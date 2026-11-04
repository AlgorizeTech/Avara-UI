---
title: "Progress"
description: "A flexible, smoothly animated progress indicator built to handle loading states, storage meters, or step-by-step wizards. Free shadcn/ui Progress component."
url: https://avaraui.com/docs/nextjs/progress
---

# Progress

A flexible, smoothly animated progress indicator built to handle loading states, storage meters, or step-by-step wizards. Every form fills from zero when it first appears, and any number it shows counts up alongside the fill.

This block is split into composable pieces: the core `<Progress />` bar for the visual fill, the optional `<ProgressField />` wrapper which handles the layout for labels and percentage text, `<MultiProgress />` with `<ProgressSegment />` children for several values sharing one track, and `<CircularProgress />` for the same value drawn as a ring.

Colour carries state. `stages` changes the fill as thresholds are crossed — neutral while an operation starts, your brand colour once it is under way, green at 100 — and `status` overrides everything with the conventional success, warning and error hues so a failed job never looks like it is still running. The field's readout follows: a check on success, an alert on error, and an optional `hint` line that says what happened.

Each example shows a live preview with the exact code to copy.

## Progress

The bare bar. Drag the slider above to move it; hover the bar for the readout.

- `value` and `max` are all it needs — the percentage is derived from the two.
- `tooltip` shows the percentage in a bubble at the fill's edge on hover; pass a function to format it.
- `animate` is on by default: the fill sweeps in from zero when the bar first appears and every later change tweens instead of jumping. `duration` sets the mount run in milliseconds.

```tsx
import { Progress } from "@/components/custom/blocks/ProgressBlock";

export default function ProgressDemo() {
  // tooltip shows the percentage on hover; pass a function to format it.
  return <Progress value={45} max={100} tooltip />;
}
```

## Circular progress

The same value, drawn as a ring.

- `circleSize={140}` sets the outer diameter in pixels; `barSize` still controls the ring thickness.
- `variant="glow"` lights the filled arc with the theme color instead of leaving it flat.

```tsx
import { CircularProgress } from "@/components/custom/blocks/ProgressBlock";

export default function UploadRing() {
  return (
    <CircularProgress
      value={68}
      max={100}
      circleSize={140}
      barSize="md"
      variant="glow"
      color="indigo"
    />
  );
}
```

## Circular with a custom center

- Pass `children` to replace the centred percentage with anything — a count, an icon, a caption. As a function, `(value, max) => node`, it receives the value while it counts up so the centre animates with the arc.

```tsx
import { CircularProgress } from "@/components/custom/blocks/ProgressBlock";

export default function CreditsRing() {
  const used = 68;

  return (
    // Children replace the centred percentage entirely. As a function they
    // receive the value while it counts up, so the number animates with the arc.
    <CircularProgress value={used} max={100} circleSize={160} barSize="lg">
      {(shown) => (
        <>
          <span className="text-3xl font-semibold tabular-nums">{shown}</span>
          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            of 100 credits
          </span>
        </>
      )}
    </CircularProgress>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/progress.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/progress
```

## Examples

### Statuses

The four states side by side.

- `status="active"` is the default and draws the theme colour; the other three use the conventional semantic hues on every brand.

```tsx
import { Progress, ProgressField } from "@/components/custom/blocks/ProgressBlock";

export default function SyncStatus() {
  return (
    <div className="flex flex-col gap-6">
      <ProgressField label="Syncing videos" value={71} status="warning" hint="Slow connection — still going.">
        <Progress value={71} status="warning" />
      </ProgressField>

      <ProgressField label="Syncing documents" value={58} status="error" hint="Connection lost. Retry to resume.">
        <Progress value={58} status="error" />
      </ProgressField>

      <ProgressField label="Syncing contacts" value={100} status="success" hint="Everything is up to date.">
        <Progress value={100} status="success" />
      </ProgressField>
    </div>
  );
}
```

### Indeterminate

- Set `indeterminate` when the duration is unknown. A short bar slides along the track; `value` is ignored and reduced-motion users get a still, full bar.

```tsx
import { Progress, ProgressField } from "@/components/custom/blocks/ProgressBlock";

export default function ScanningLibrary() {
  // No value: the bar slides along the track until you know how far along you are.
  return (
    <ProgressField label="Scanning library" showValue={false} hint="This can take a while for large libraries.">
      <Progress indeterminate />
    </ProgressField>
  );
}
```

### Step indicator

- Set `showValue={false}` and give `max` a small number for wizard-style step progress.

```tsx
import { Progress, ProgressField } from "@/components/custom/blocks/ProgressBlock";

export default function WizardProgress() {
  const step = 2;
  const totalSteps = 4;

  return (
    // showValue={false} hides the percentage when the label already says it.
    <ProgressField
      label={`Step ${step} of ${totalSteps} — Billing details`}
      value={step}
      max={totalSteps}
      showValue={false}
    >
      <Progress value={step} max={totalSteps} variant="default" barSize="sm" />
    </ProgressField>
  );
}
```

### Stage colours

Run it: neutral while starting, the brand colour from 10%, green at 100 — or red the moment it fails. The ring and the bar share one value, so they always agree.

- `stages` is a list of `{ from, color }` — each colour takes over from its `from` percent until the next threshold. Works on `Progress` and `CircularProgress` alike.
- `status` on both `Progress` and `ProgressField`: `"success"`, `"warning"` or `"error"` override every colour and turn the readout green, amber or red with a glyph.
- `hint` is one line under the bar — what happened, or what to do next — in the status colour.

```tsx
// Each stage takes over from its `from` percent until the next.
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
    <div className="flex items-center gap-6">
      <CircularProgress value={value} status={status} stages={STAGES} circleSize={88} />

      <ProgressField
        className="flex-1"
        label="brand-guidelines.pdf"
        value={value}
        status={status}
        hint={failed ? "Connection lost — the file was not uploaded." : undefined}
      >
        <Progress value={value} status={status} stages={STAGES} />
      </ProgressField>
    </div>
  );
}
```

## Features
Explore the Progress bar's features, including smooth value interpolation, indeterminate animations, and accessibility labels.

### Customizable

Easily adapt the component's styling and behavior to fit your application's unique design system.

### Accessible

Built with accessibility in mind, ensuring all users can interact with your application effectively.

### Responsive

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

### Counts up

Bars, segments and rings fill from zero on first paint and every readout counts up in step, on one shared easing. Respects `prefers-reduced-motion`; turn it off with `animate={false}`.

## Best Practices & Guidelines

### Usage Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Progress` | `value` | `number` | `0` | The current progress value to display. |
| `Progress` | `max` | `number` | `100` | The maximum possible value. Used internally to calculate the percentage fill. |
| `Progress` | `variant` | `"default" \| "glass" \| "glow" \| "minimal"` | `"default"` | Determines the visual styling of the track background and the active indicator fill. |
| `Progress` | `color` | `"indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"indigo"` | Applies the active color theme to the progress indicator. Fully supports custom hex codes. |
| `Progress` | `barSize` | `"sm" \| "md" \| "lg"` | `"md"` | Adjusts the vertical thickness (height) of the progress bar track and indicator. |
| `Progress` | `indicatorClassName` | `string` | `undefined` | Optional Tailwind classes to append directly to the moving inner fill element. |
| `Progress` | `stages` | `{ from: number; color: ProgressColor }[]` | `undefined` | Colour by threshold. `from` is a percentage; each stage's colour applies from that point until the next stage. Also on `CircularProgress`. |
| `Progress` | `status` | `"active" \| "success" \| "warning" \| "error"` | `"active"` | Semantic override: emerald, amber or red replace the theme colour and any stage. Exposed as `data-status` on the element. Also on `CircularProgress`, where it colours the centre readout. |
| `Progress` | `indeterminate` | `boolean` | `false` | Unknown duration: a short bar slides along the track and `aria-busy` is set. Honours `prefers-reduced-motion`. |
| `Progress` | `tooltip` | `boolean \| (value, max) => ReactNode` | `false` | Hover readout in a bubble — at the fill's leading edge on the bar, above the ring on `CircularProgress`. `true` shows the percentage; a function formats it. Not shown while `indeterminate`. |
| `Progress` | `animate` | `boolean` | `true` | Fill from zero on mount and tween every later change of `value`; stage colours are crossed on the way. Also on `ProgressField`, `MultiProgress` and `CircularProgress`. Off under `prefers-reduced-motion`. |
| `Progress` | `duration` | `number` | `1200` | Length of the mount fill in milliseconds. Later changes take a slice proportional to how far they travel, so a 1% tick stays snappy. Set the same value on a `ProgressField` and its bar so the readout keeps step. Also on `MultiProgress` and `CircularProgress`. |
| `ProgressField` | `status` | `"active" \| "success" \| "warning" \| "error"` | `"active"` | Colours the readout and adds a glyph — a check on success, an alert on warning or error. |
| `ProgressField` | `hint` | `ReactNode` | `undefined` | One line under the bar, in the status colour when a status is set. |
| `ProgressField` | `label` | `ReactNode` | `undefined` | The text or React element to display on the top-left above the progress bar. |
| `ProgressField` | `value` | `number` | `0` | The current numerical value passed down to handle display formatting. |
| `ProgressField` | `max` | `number` | `100` | The maximum numerical value passed down to handle display formatting. |
| `ProgressField` | `showValue` | `boolean` | `true` | If true, displays the current value/percentage on the top-right above the progress bar. |
| `ProgressField` | `valueFormat` | `(value: number, max: number) => ReactNode` | `undefined` | A custom formatter function. If not provided, it defaults to calculating and displaying `[percentage]%`. |
| `MultiProgress` | `max` | `number` | `100` | The shared denominator every child segment measures its value against. |
| `MultiProgress` | `gap` | `number` | `0` | Pixels between segments. Any value above `0` also rounds each segment's ends; `0` fuses them into one continuous bar. |
| `MultiProgress` | `variant` | `"default" \| "glass" \| "glow" \| "minimal"` | `"default"` | Styles the shared track behind the segments. Segment fills are colored individually. |
| `MultiProgress` | `barSize` | `"sm" \| "md" \| "lg"` | `"md"` | Height of the shared track. Thicker tracks make multi-segment breakdowns easier to read. |
| `ProgressSegment` | `value` | `number` | `0` | This slice's portion of the parent's `max`. Must be rendered inside a `MultiProgress`. |
| `ProgressSegment` | `color` | `"indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Color for this slice alone, so one track can carry several themes. Supports custom hex codes. |
| `ProgressSegment` | `label` | `string` | `undefined` | Accessible name for the slice, also used as its native hover tooltip. |
| `CircularProgress` | `value` | `number` | `0` | The current progress value, drawn as a filled arc starting at twelve o'clock. |
| `CircularProgress` | `circleSize` | `number` | `120` | Outer diameter of the ring in pixels; the centred readout scales with it. The `glow` variant's halo fades out past this edge, the way a `box-shadow` does. |
| `CircularProgress` | `barSize` | `"sm" \| "md" \| "lg"` | `"md"` | Ring thickness, on the same scale as the bar — `5`, `9` and `14` pixels of stroke. |
| `CircularProgress` | `showValue` | `boolean` | `true` | Draws the percentage in the middle of the ring. Ignored when `children` are supplied. |
| `CircularProgress` | `children` | `ReactNode \| (value, max) => ReactNode` | `undefined` | Replaces the centred readout entirely — use it for a count, an icon, or a caption. As a function it receives `(value, max)` with the value counting up, so a custom centre animates with the arc. |
| `CircularProgress` | `trackClassName` | `string` | `undefined` | Optional classes for the unfilled ring underneath the arc. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/progress
