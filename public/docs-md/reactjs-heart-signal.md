# Heart Signal

A slow, ultra-smooth cardiac telemetry and pulse visualization component with 3 distinct animation variants (`ecg-line`, `pulse-heart`, and `cardiac-wave`), live BPM badge, and active theme color integration.

`HeartSignal` brings health monitoring, fitness tracking, medical telemetry, and energetic UI headers to life with 60fps HTML5 Canvas rendering.

export const usageECG = `import { HeartSignal } from "@/components/custom/blocks/HeartSignalBlock";

export default function ECGDemo() {
  return (
    
  );
}`;

export const usagePulseHeart = `import { HeartSignal } from "@/components/custom/blocks/HeartSignalBlock";

export default function PulseHeartDemo() {
  return (
    
  );
}`;

export const usageCardiacWave = `import { HeartSignal } from "@/components/custom/blocks/HeartSignalBlock";

export default function CardiacWaveDemo() {
  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/heart-signal
```

## Animation Variants

## Features

    3 Ultra-Smooth Animation Variants
    Includes EKG Line Trace, Cardiac Heart Sweep, and Cardiac Wave visualizers.

    Slow & Calm Rhythm Flow
    Features a relaxed, smooth heartbeat waveform flow perfect for clean medical dashboards.

    Dynamic Theme Adaptive
    Automatically resolves active theme primary color (bg-primary) across Light and Dark modes.

    Full Width & Responsive Height
    Scales fluidly to fill 100% of parent container width and height without expanding overflow.

## Props Reference

        Prop
        Type
        Default
        Description

        variant
        HeartSignalVariant
        "ecg-line"
        Selects between "ecg-line", "pulse-heart", and "cardiac-wave" animation variants.

        bpm
        number
        75
        Heart rate pulse frequency in Beats Per Minute.

        speed
        number
        0.25
        Animation speed multiplier for ultra-smooth wave cycles.

        showBPM
        boolean
        true
        Displays floating vital statistics BPM badge overlay.

        showGrid
        boolean
        true
        Renders medical telemetry grid background lines.

        color
        string
        adaptive
        Optional custom stroke & glow color. Matches active theme primary color by default.

---

**Component Path:** `[framework]\heart-signal\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
