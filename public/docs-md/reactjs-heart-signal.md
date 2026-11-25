---
title: "Shadcn Heart Signal"
description: "Shadcn Heart Signal. A heartbeat and pulse visualisation with three animation variants (ECG line, pulse heart, cardiac wave)."
url: https://avaraui.com/docs/nextjs/heart-signal
---

# Shadcn Heart Signal

An HTML5 Canvas heartbeat visualizer (`HeartSignal`) with `ecg-line`, `pulse-heart`, and `cardiac-wave` variants, a BPM badge, and theme-aware colours. It animates the `bpm` you pass; it does not read a sensor.

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

## Anatomical Cardiac Heart Sweep

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

## Fluid Cardiac Wave Visualizer

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

## About Shadcn Heart Signal

**What it is.** `HeartSignal` renders live cardiac telemetry visuals in three modes (`ecg-line` P-Q-R-S-T trace, `pulse-heart` anatomical sweep, and `cardiac-wave` multi-lead visualizer) with an optional BPM badge (showing your `bpm` value) and background grid.

**How it is built.** Drawn on an HTML5 Canvas with `requestAnimationFrame`, resizing with its container. It resolves the theme's `--primary` colour (and re-reads it when the theme changes) and uses `useTheme` from `next-themes` to tell light from dark, so the registry item installs that package.

**When to use it.** Use `HeartSignal` in health, fitness, medical telemetry dashboards, or status hero cards.

## For AI agents

**When to use**

- Health/fitness dashboards, vital-sign cards, and real-time telemetry headers (`ecg-line`, `pulse-heart`, `cardiac-wave`)

**When not to use**

- Standard time-series line/bar charts — use [Chart](https://avaraui.com/docs/reactjs/chart)
- Simple live status badges — use [Live Pulse Pill](https://avaraui.com/docs/reactjs/live-pulse-pill)

**Agent notes**

- Named export: `import { HeartSignal } from "@/components/custom/blocks/HeartSignalBlock"`
- Configure `bpm` (default `75`), `speed` (default `0.25`), `showBPM`, and `showGrid`
- It is a visual only: `bpm` is a number you supply, not a measured value
- The root is `w-full h-full` with a minimum height of 450px (540px from `sm`, 640px from `lg`); override with `className`
- There is no `prefers-reduced-motion` handling, so render it conditionally for users who need less motion

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

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `HeartSignalVariant` | `"ecg-line"` | Selects between `"ecg-line"`, `"pulse-heart"`, and `"cardiac-wave"` animation variants. |
| `bpm` | `number` | `75` | Heart rate in beats per minute. It scales the animation rate and is the number shown in the badge. |
| `speed` | `number` | `0.25` | Animation speed multiplier for ultra-smooth wave cycles. |
| `showBPM` | `boolean` | `true` | Displays floating vital statistics BPM badge overlay. |
| `showGrid` | `boolean` | `true` | Renders medical telemetry grid background lines. |
| `className` | `string` | `undefined` | Merged onto the root, which has a minimum height of 450px (540px from `sm`, 640px from `lg`). Other `div` attributes are passed through. |
| `color` | `string` | `adaptive` | Stroke and glow colour. Accepts `indigo`, `rose`, `emerald`, `zinc` or any CSS colour string. Unset, `"primary"` and `"default"` follow the theme's `--primary`. |

## Works with other components

- Pair `HeartSignal` inside [Card](https://avaraui.com/docs/reactjs/card) or [Counter](https://avaraui.com/docs/reactjs/counter) health metric tiles.
- Combine with [Live Pulse Pill](https://avaraui.com/docs/reactjs/live-pulse-pill) to show live sensor/monitoring status.
- Use [Chart](https://avaraui.com/docs/reactjs/chart) beside it for the history that a decorative waveform cannot show.

## Does HeartSignal read real heart-rate data?

No. `HeartSignal` draws a synthetic waveform from the `bpm` and `speed` you pass and prints your `bpm` in the badge. To show live readings, feed it the latest value from your sensor or API as `bpm`. It is a visual, not a medical instrument.

## How do I change the HeartSignal beat rate?

Change `bpm` and `speed`, which both scale how fast the trace moves, so raising either speeds it up. The defaults are `75` and `0.25`. Because `bpm` is also the number in the badge, set it to the value you want people to read.

## How do I change the HeartSignal colour?

Pass `color` as `indigo`, `rose`, `emerald`, `zinc` or any CSS colour string. Leave it unset, or use `"primary"`, to follow your theme's `--primary`, which the component re-reads when the theme switches. The stroke, glow and badge dot use that colour.

## How do I resize HeartSignal or hide the badge and grid?

It fills its container with a minimum height of 450px, 540px from `sm` and 640px from `lg`; override that with `className`. Set `showBPM={false}` to remove the badge and `showGrid={false}` to remove the background grid lines.

## Does HeartSignal need Next.js, and does it respect reduced motion?

It imports `useTheme` from `next-themes`, which the registry item installs, and has no `next/*` imports. In Vite, wrap the app in a next-themes `ThemeProvider` so dark mode is detected. The canvas runs continuously with no `prefers-reduced-motion` check, so render it conditionally if needed.

---

Live previews and every example: https://avaraui.com/docs/nextjs/heart-signal
