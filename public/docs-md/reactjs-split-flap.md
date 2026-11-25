---
title: "Shadcn Split-Flap Display"
description: "A split-flap (Solari board) display with 3D flipping cards, split creases, hinge notches and synthesised click sounds. Shadcn/ui with GSAP and Motion builds."
url: https://avaraui.com/docs/nextjs/split-flap
---

# Shadcn Split-Flap Display

A Solari-style split-flap display with 3D flips, split creases and synthesized click sounds.

Ships with **2 distinct handcrafted variants**: vintage ivory electro-mechanical casing (matching retro Solari displays) and minimalist architectural frosted glass.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/split-flap.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/split-flap
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add https://avaraui.com/r/split-flap-motion.json
```

### Split-Flap — Ivory (Classic Mechanical)

The iconic embossed cream electro-mechanical display with rust-coral slab-serif typography and tactile 3D perspective flap folds.

- Set `variant="ivory"` renders an embossed molded bezel casing with warm off-white flap cards and rust-orange typography.
- `sound=true | false` synthesizes realistic physical plastic flap clicks via Web Audio API without needing external audio files.

```tsx
import SplitFlap from "@/components/custom/split-flap";

export default function IvorySplitFlapDemo() {
  return (
    <SplitFlap
      variant="ivory"
      text="SPLIT-FLAP"
      messages={[
        "SPLIT-FLAP",
        "RETRO MECHANICAL",
        "SOLARI BOARD",
        "VINTAGE CLOCK"
      ]}
      autoPlay={true}
      interval={3000}
      sound={false}
      size="md"
    />
  );
}
```

### Split-Flap — Minimalist Architectural

Ultra-clean frosted glass chassis with backdrop blur and slate-stone monospace typography that blends with light or dark mode.

- Set `variant="minimalist"` creates an architectural frosted glass frame with clean backdrop blur.

```tsx
import SplitFlap from "@/components/custom/split-flap";

export default function MinimalistSplitFlapDemo() {
  return (
    <SplitFlap
      variant="minimalist"
      messages={[
        "DESIGN SYSTEM",
        "TIMELESS CRAFT",
        "SPLIT FLAP 3D",
        "REUSABLE UI"
      ]}
      autoPlay={true}
      interval={3000}
      sound={false}
      size="md"
    />
  );
}
```

## About Shadcn Split-Flap Display

**What it is.** **Shadcn Split-Flap Display** (`SplitFlap`) is a retro-mechanical Solari board display component with 3D `rotateX` flap flips, split creases, hinge notches, and optional synthesized Web Audio click sound effects.

**How it is built.** `SplitFlap` cycles through `text` or `messages` at a configurable `interval`, animates each character tile independently with 3D perspective folds, and offers `"ivory"` and `"minimalist"` chassis variants.

**When to use it.** Use it for hero arrival boards, live status tickers, event schedules, and tactile retro-modern landing page displays.

## For AI agents

**When to use**

- Hero arrival boards, live status tickers
- Event schedules, tactile retro-modern landing page displays

**When not to use**

- A smooth numeric counter or stepper: use [Counter](https://avaraui.com/docs/reactjs/counter)
- Typewriter-style headline text: use [Text Animation](https://avaraui.com/docs/reactjs/text-animation)

**Agent notes**

- `SplitFlap` accepts `variant` (`"ivory" | "minimalist"`), `text`, `messages` (`string[]`), `autoPlay`, `interval`, `sound`, and `size`.
- Enable `sound={true}` to synthesize mechanical flap clicks using the Web Audio API with zero external audio assets.
- Keep `messages` concise so character tiles fit cleanly across mobile and desktop viewports.

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/split-flap

**When to use it.** A split-flap (Solari board) display with 3D flipping cards, a horizontal crease, hinge notches and synthesised click sounds, in two handcrafted casings: vintage ivory and minimalist architectural glass.

**Gotchas:**

- Both are looks of the one `split-flap` item: install it once and set `variant` from the index.
- The click sounds are synthesised with the Web Audio API, so no audio files are needed.

### The 2 variants

1. **Ivory, classic mechanical** (`ivory`): An embossed molded bezel with warm off-white flap cards and rust-orange type, like a retro Solari board.
   - Live: https://avaraui.com/view/split-flap/ivory
   - Best for: a retro, mechanical, travel or departures-board feel
   - Avoid if: your brand is clean and modern
   - Traits: molded bezel, warm off-white flaps, rust-orange type, click sounds
   - Install: `npx shadcn@latest add @avara-ui/split-flap`
   - Set these props: `{"variant":"ivory"}`
   - Docs: https://avaraui.com/docs/nextjs/split-flap#split-flap-ivory
2. **Minimalist architectural** (`minimalist`): A frosted-glass architectural frame with clean backdrop blur.
   - Live: https://avaraui.com/view/split-flap/minimalist
   - Best for: a modern, design-led brand that wants the flip effect without the vintage styling
   - Avoid if: you want the nostalgic retro-mechanical look
   - Traits: frosted glass frame, backdrop blur
   - Install: `npx shadcn@latest add @avara-ui/split-flap`
   - Set these props: `{"variant":"minimalist"}`
   - Docs: https://avaraui.com/docs/nextjs/split-flap#split-flap-minimalist

## Props Reference

### SplitFlap

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"ivory" \| "minimalist"` | `"ivory"` | Selects between 2 handcrafted visual themes: retro ivory (default) or minimalist architectural frosted glass. |
| `messages` | `string[]` | `[]` | Array of text strings to cycle through with cascading flip transitions. |
| `text` | `string` | `undefined` | Direct string to display. Can also contain pipe-separated strings (e.g. `"HELLO \| WORLD"`) to cycle through automatically. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Dimension preset for the flap cards. |
| `columns` | `number` | `auto` | Total flap character slots. If omitted, automatically fits the longest message. |
| `autoPlay` | `boolean` | `true` | Whether to automatically cycle through messages at the specified interval. |
| `interval` | `number` | `3000` | Duration in milliseconds the message stays fully visible and stationary before flipping to the next message. |
| `sound` | `boolean` | `false` | Whether to play realistic mechanical split-flap click sounds via Web Audio API. Can also be toggled interactively in the toolbar. |
| `color` | `string` | `theme default` | Text accent color applied to characters and numbers. Supports preset theme names (`"lavender"`, `"indigo"`, `"rose"`, `"emerald"`), custom hex codes, or `"default"` to reset to variant default. |
| `speed` | `number` | `1` | Speed multiplier for the flip cascade animation (1 = normal, 1.5 = fast). |

## Works with other components

Pair `SplitFlap` with [Counter](https://avaraui.com/docs/reactjs/counter) for numeric countdowns, [Text Animation](https://avaraui.com/docs/reactjs/text-animation) for kinetic headlines, and [Glass Panel](https://avaraui.com/docs/reactjs/glass-panel) for frosted dashboard headers.

## How do I build a Solari-style split-flap display in React?

Render `SplitFlap` and pass `text` or a `messages` array. It animates each character with a 3D `rotateX` flip and cascades the flips across the board. Pick `variant="ivory"` for the retro mechanical casing or `variant="minimalist"` for frosted glass.

## How do I cycle through multiple phrases?

Pass an array of strings to `messages`, keep `autoPlay` on, and set the delay with `interval` in milliseconds. It defaults to `3000`. You can also give `text` pipe-separated strings such as `"HELLO | WORLD"` to cycle through them automatically.

## Does the Split-Flap sound effect require audio files?

No. With `sound={true}` it synthesizes mechanical flap clicks through the browser Web Audio API, so there is nothing to host or download. `sound` is `false` by default, and sound can also be toggled from the toolbar in the live demo.

## How do I control the number of character slots and the flip speed?

`columns` sets the number of flap slots. If you omit it, the board fits the longest message. `speed` multiplies the flip cascade, where `1` is normal and `1.5` is fast. `size` offers `"sm"`, `"md"` and `"lg"` flap cards.

## Does SplitFlap need an animation library?

It uses `gsap`, which is listed as the item's npm dependency, so the shadcn CLI installs it with the component. The sound uses the Web Audio API with no library. There are no `next/*` imports, so it also runs in Vite projects.

---

Live previews and every example: https://avaraui.com/docs/nextjs/split-flap
