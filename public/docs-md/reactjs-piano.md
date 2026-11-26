---
title: "Shadcn Playable Piano"
description: "A playable piano with synthesised Web Audio sound, computer-keyboard key bindings, a volume slider and optional key labels. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/piano
---

# Shadcn Playable Piano

An interactive, responsive **Playable Piano** component featuring synthesized acoustic Web Audio API sounds, physical keyboard keybindings, volume control slider, and toggleable key label indicators.

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

### Playable Synthesizer Piano

Interactive playable piano keyboard powered by Web Audio API synthesizers. Play using mouse clicks or typing physical keyboard keys (`A-S-D-F-G-H-J-K-L-;` and `W-E-T-Y-U-O-P`).

- Pass `defaultVolume=0.8` sets default master volume level (0 to 1).

```tsx
import { Piano } from "@/components/custom/piano";

export default function PianoDemo() {
  return <Piano defaultVolume={0.8} defaultShowKeys={true} />;
}
```

## About Shadcn Playable Piano

**What it is.** **Shadcn Playable Piano** (`Piano`) is an interactive synthesizer keyboard powered by the browser's Web Audio API with mouse, touch, and physical keyboard support.

**How it is built.** `Piano` synthesizes acoustic notes using `AudioContext` with exponential decay envelopes (zero external MP3 assets), maps physical keys (`A–;` white keys, `W–P` black keys), and provides a live master volume slider and key-label toggle.

**When to use it.** Use it for music education tools, interactive portfolio Easter eggs, audio synth playgrounds, and sound design demos.

**Features.**

- **Web Audio API Synthesizer**: Zero external MP3 asset dependency. Each note is built from four oscillators through a lowpass filter, with an exponential decay envelope.
- **Physical Keyboard Keybindings**: Play notes naturally using physical keyboard keys (`A, S, D, F, G, H, J, K, L, ;` for White keys, and `W, E, T, Y, U, O, P` for Black keys).
- **Show/Hide Keys Toggle**: Toggle switch to reveal or hide keyboard key labels over piano keys.
- **Master Volume Slider**: Adjust the volume in real time, or use the speaker button to mute.
- **Rotate Toggle**: Turns the keyboard sideways; it is rotated automatically below the `sm` breakpoint.
- **Key Press Animation**: pressed keys shift down and take a `--primary` color highlight.

## For AI agents

**When to use**

- Music education tools, interactive portfolio Easter eggs
- Audio synth playgrounds, sound design demos

**When not to use**

- Playing back recorded audio files: use [Audio Player](https://avaraui.com/docs/reactjs/audio-player)
- Recording the user's voice: use [Voice Note](https://avaraui.com/docs/reactjs/voice-note)

**Agent notes**

- `Piano` accepts `defaultVolume` (`0` to `1`, default `0.8`), `defaultShowKeys` (`boolean`, default `true`), `defaultRotate` (`boolean`, default `false`) and `className`. All three `default*` props only set initial state.
- Uses browser Web Audio API synthesis with no external audio files required.
- Physical keyboard bindings map `A, S, D, F, G, H, J, K, L, ;` to white keys and `W, E, T, Y, U, O, P` to black keys.
- The range is fixed at C4 to E5 (10 white and 7 black keys); the notes live in a constant inside the file, not in a prop.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultVolume` | `number` | `0.8` | Initial master volume level between 0 and 1. |
| `defaultShowKeys` | `boolean` | `true` | Whether key trigger labels are shown over piano keys. |
| `defaultRotate` | `boolean` | `false` | Whether the keyboard starts rotated sideways on screens at the `sm` breakpoint and wider. Below it, the keyboard is always rotated. |
| `className` | `string` | `undefined` | Custom CSS classes for container styling. |

## Works with other components

Combine `Piano` with [Audio Player](https://avaraui.com/docs/reactjs/audio-player) for recorded track playback, [Voice Note](https://avaraui.com/docs/reactjs/voice-note) for audio recording, and [Kbd](https://avaraui.com/docs/reactjs/kbd) for displaying keyboard shortcut legends.

## Does Piano require external MP3 or WAV files?

No. Each note is generated when played from four oscillators (`sine` and `triangle`) at one to four times the note frequency, through a lowpass filter and a gain envelope that fades over about 1.8 seconds. The only npm dependency is `lucide-react`, and there are no `next/*` imports.

## Can users play Piano with a computer keyboard?

Yes. `A S D F G H J K L ;` play the white keys and `W E T Y U O P` the black ones. The listener sits on `window`, so the piano needs no focus, but it ignores keys while an `input` is focused, and held keys do not repeat.

## Why does Piano stay silent until the first click or key press?

The `AudioContext` is created lazily on the first note and resumed if the browser left it suspended, which respects autoplay policies. Nothing plays when the volume is `0`, and the speaker button restores it to `0.8`, not to the previous level.

## Does Piano rotate on mobile screens?

Below the `sm` breakpoint the whole card is rotated 90 degrees automatically so the keys get landscape room. The rotate button toggles the same effect at `sm` and wider, and `defaultRotate` sets whether it starts rotated there. On small screens the button does not change the layout.

## Can I change the range or notes of Piano?

Not through props. The keyboard is 17 keys, C4 to E5 (10 white, 7 black), defined in a `PIANO_NOTES` constant inside `piano.tsx`. Because the shadcn CLI copies the file into your project, you can edit that array, but the white and black key layout is positioned for exactly this set.

## How do I set the starting volume or hide the key labels in Piano?

Pass `defaultVolume` (`0` to `1`, default `0.8`) and `defaultShowKeys` (default `true`). Both only seed state, so changing them after mount has no effect. Users adjust the volume with the slider in steps of `0.05` and toggle the labels with the Show Keys switch.

---

Live previews and every example: https://avaraui.com/docs/nextjs/piano
