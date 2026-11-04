---
title: "Heart Signal"
description: "A heartbeat and pulse visualisation with three animation variants (ECG line, pulse heart, cardiac wave), a live BPM badge and theme colour support."
url: https://avaraui.com/docs/nextjs/heart-signal
---

# Heart Signal

A slow, ultra-smooth cardiac telemetry and pulse visualization component with 3 distinct animation variants (`ecg-line`, `pulse-heart`, and `cardiac-wave`), live BPM badge, and active theme color integration.

`HeartSignal` brings health monitoring, fitness tracking, medical telemetry, and energetic UI headers to life with 60fps HTML5 Canvas rendering.

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
