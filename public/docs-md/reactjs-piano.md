export const metadata = docsPageMetadata("piano");

# Playable Piano

An interactive, responsive **Playable Piano** component featuring synthesized acoustic Web Audio API sounds, physical keyboard keybindings, volume control slider, and toggleable key label indicators.

## Variations

export const usageDefault = `import { Piano } from "@/components/custom/piano";

export default function PianoDemo() {
  return ;
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/piano.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/piano
```

## Features

Discover the interactive capabilities of the `Piano` component:

- **Web Audio API Synthesizer**: Zero external MP3 asset dependency. Synthesizes real acoustic piano notes using browser-native AudioContext with exponential decay envelopes.
- **Physical Keyboard Keybindings**: Play notes naturally using physical keyboard keys (`A, S, D, F, G, H, J, K, L, ;` for White keys, and `W, E, T, Y, U, O, P` for Black keys).
- **Show/Hide Keys Toggle**: Toggle switch to reveal or hide keyboard key labels over piano keys.
- **Master Volume Slider**: Adjust or mute synthesizer volume levels in real-time.
- **Tactile Key Animations**: 3D key press animation with active color highlights and smooth release physics.

## Props Reference: Piano

        Prop
        Type
        Default
        Description

          defaultVolume

          number

          0.8
        
        Initial master volume level between 0 and 1.

          defaultShowKeys

          boolean

          true
        
        Whether key trigger labels are shown over piano keys.

          className

          string

          undefined
        
        Custom CSS classes for container styling.

---

**Component Path:** `[framework]\piano\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
