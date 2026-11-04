---
title: "Split-Flap Display"
description: "A split-flap (Solari board) display with 3D flipping cards, split creases, hinge notches and synthesised click sounds. Animated with GSAP."
url: https://avaraui.com/docs/nextjs/split-flap
---

# Split-Flap Display

An authentic, physics-driven **Split-Flap Display** component (Solari board) simulating retro-mechanical flap cards, 3D perspective flips (`rotateX`), horizontal split creases, mechanical hinge notches, and realistic synthesized click sounds.

Ships with **2 distinct handcrafted variants**: vintage ivory electro-mechanical casing (matching retro Solari displays) and minimalist architectural frosted glass.

---

## Variants

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

---

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

---

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

---

Live previews and every example: https://avaraui.com/docs/nextjs/split-flap
