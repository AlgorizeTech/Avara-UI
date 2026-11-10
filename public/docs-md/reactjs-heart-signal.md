---
title: "Shadcn Heart Signal"
description: "Shadcn Heart Signal. A heartbeat and pulse visualisation with three animation variants (ECG line, pulse heart, cardiac wave)."
url: https://avaraui.com/docs/nextjs/heart-signal
---

# Shadcn Heart Signal

A slow, ultra-smooth cardiac telemetry and pulse visualization component with 3 distinct animation variants (`ecg-line`, `pulse-heart`, and `cardiac-wave`), live BPM badge, and active theme color integration.

`HeartSignal` brings health monitoring, fitness tracking, medical telemetry, and energetic UI headers to life with 60fps HTML5 Canvas rendering.

## For AI agents

**Ask before you pick.** This page has 3 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 3 options as live previews: https://avaraui.com/view/heart-signal

**When to use it.** A slow, smooth cardiac telemetry visualisation drawn on an HTML5 canvas, with a live BPM badge and your theme colour, in three looks: an EKG trace, a heart silhouette with a sweep and a multi-lead wave.

**Gotchas:**

- All three are looks of the one `heart-signal` item: install it once and set `variant` from the index.

### The 3 variants

1. **EKG waveform** (`ecg-line`): A classic EKG P-Q-R-S-T heartbeat monitor trace.
   - Live: https://avaraui.com/view/heart-signal/ecg-line
   - Best for: health, fitness or medical telemetry that should read as a heart monitor
   - Avoid if: you want an illustrated heart rather than a waveform
   - Traits: monitor-style trace, live BPM badge
   - Install: `npx shadcn@latest add @avara-ui/heart-signal`
   - Set these props: `{"variant":"ecg-line"}`
   - Docs: https://avaraui.com/docs/nextjs/heart-signal#real-time-ekg-waveform-monitor
2. **Heart sweep** (`pulse-heart`): A central heart silhouette with a progressive left-to-right colour sweep fill.
   - Live: https://avaraui.com/view/heart-signal/pulse-heart
   - Best for: a friendly, illustrative heart for a header or card
   - Avoid if: you want a technical monitor feel
   - Traits: heart silhouette, colour sweep, live BPM badge
   - Install: `npx shadcn@latest add @avara-ui/heart-signal`
   - Set these props: `{"variant":"pulse-heart"}`
   - Docs: https://avaraui.com/docs/nextjs/heart-signal#anatomical-cardiac-heart-sweep
3. **Cardiac wave** (`cardiac-wave`): A multi-lead sine wave stream with audio-visual equalizer bars.
   - Live: https://avaraui.com/view/heart-signal/cardiac-wave
   - Best for: an energetic header or dashboard accent
   - Avoid if: you want a single clear heartbeat trace
   - Traits: multi-lead waves, equalizer bars, live BPM badge
   - Install: `npx shadcn@latest add @avara-ui/heart-signal`
   - Set these props: `{"variant":"cardiac-wave"}`
   - Docs: https://avaraui.com/docs/nextjs/heart-signal#fluid-cardiac-wave-visualizer

## Real-time EKG Waveform Monitor

- Use `variant="ecg-line"` for classic EKG P-Q-R-S-T heartbeat monitor waveform trace.

```tsx
import { HeartSignal } from "@/components/custom/blocks/HeartSignalBlock";

export default function ECGDemo() {
  return (
    <HeartSignal
      variant="ecg-line"
      bpm={75}
      speed={0.25}
      showBPM={true}
      showGrid={true}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/heart-signal.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/heart-signal
```

## Animation Variants

### Anatomical Cardiac Heart Sweep

- Use `variant="pulse-heart"` for central cardiac heart silhouette with progressive left-to-right color sweep fill.

```tsx
import { HeartSignal } from "@/components/custom/blocks/HeartSignalBlock";

export default function PulseHeartDemo() {
  return (
    <HeartSignal
      variant="pulse-heart"
      bpm={75}
      speed={0.25}
      showBPM={true}
      showGrid={true}
    />
  );
}
```

### Fluid Cardiac Wave Visualizer

- Use `variant="cardiac-wave"` for multi-lead sine wave stream with audio-visual equalizer bars.

```tsx
import { HeartSignal } from "@/components/custom/blocks/HeartSignalBlock";

export default function CardiacWaveDemo() {
  return (
    <HeartSignal
      variant="cardiac-wave"
      bpm={75}
      speed={0.25}
      showBPM={true}
      showGrid={true}
    />
  );
}
```

## Features

### 3 Ultra-Smooth Animation Variants

Includes EKG Line Trace, Cardiac Heart Sweep, and Cardiac Wave visualizers.

### Slow & Calm Rhythm Flow

Features a relaxed, smooth heartbeat waveform flow perfect for clean medical dashboards.

### Dynamic Theme Adaptive

Automatically resolves active theme primary color (`bg-primary`) across Light and Dark modes.

### Full Width & Responsive Height

Scales fluidly to fill 100% of parent container width and height without expanding overflow.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `HeartSignalVariant` | `"ecg-line"` | Selects between `"ecg-line"`, `"pulse-heart"`, and `"cardiac-wave"` animation variants. |
| `bpm` | `number` | `75` | Heart rate pulse frequency in Beats Per Minute. |
| `speed` | `number` | `0.25` | Animation speed multiplier for ultra-smooth wave cycles. |
| `showBPM` | `boolean` | `true` | Displays floating vital statistics BPM badge overlay. |
| `showGrid` | `boolean` | `true` | Renders medical telemetry grid background lines. |
| `color` | `string` | `adaptive` | Optional custom stroke & glow color. Matches active theme primary color by default. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/heart-signal
