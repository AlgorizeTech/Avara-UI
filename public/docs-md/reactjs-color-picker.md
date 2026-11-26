---
title: "Shadcn Color Picker"
description: "Shadcn Color Picker. A 360° colour wheel and gradient generator with lightness and opacity sliders, shades and tints, colour harmonies."
url: https://avaraui.com/docs/nextjs/color-picker
---

# Shadcn Color Picker

A 360° HSL color wheel and a two- or three-stop gradient studio (`ColorPicker`) with lightness and saturation swatches, preset palettes, EyeDropper sampling, and HEX/RGB/HSL copy.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/color-picker.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/color-picker
```

## 360° Color Wheel Studio with Harmonies & Shades

Advanced 360° canvas spectrum wheel featuring real-time drag tracking, lightness & opacity sliders, 10-step lightness and saturation rows, four curated theme collections, and 48 preset swatches.

- Pass `variant="standalone"` renders the 360° spectrum wheel with shades, color harmonies, format selector, and preset swatches.
- `format="hex" | "rgb" | "hsl"` controls the starting active color format displayed in the input field and clipboard output.

```tsx
import { ColorPicker } from "@/components/custom/color-picker";
import { useState } from "react";

export default function ColorWheelStudioDemo() {
  const [color, setColor] = useState("#d0ff00");

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      format="hex"
      variant="standalone"
      showShades={true}
    />
  );
}
```

## Gradient Studio & CSS Generator

High-tech gradient studio featuring linear/radial/conic gradient modes, 2-stop or 3-stop color selectors, randomize generator, angle range slider, and one-click CSS copy.

- Pass `variant="gradient"` renders the multi-stop gradient generator widget with preset gallery and CSS copy.

```tsx
import { ColorPicker } from "@/components/custom/color-picker";
import { useState } from "react";

export default function GradientStudioDemo() {
  const [gradient, setGradient] = useState("linear-gradient(135deg, #8b5cf6, #ec4899)");

  return (
    <ColorPicker
      variant="gradient"
      value={gradient}
      onChange={setGradient}
    />
  );
}
```

## About Shadcn Color Picker

**What it is.** `ColorPicker` ships two studios in one component: a 360° HSL color wheel (`variant="standalone"`) with lightness and opacity sliders, a 10-step lightness row, a 10-step saturation row, curated theme collections and 48 preset swatches, plus a gradient generator (`variant="gradient"`).

**How it is built.** Draws the wheel once on an HTML5 canvas and tracks the mouse or touch pointer over it, uses the native browser `EyeDropper` API when it exists, and copies `HEX`, `RGB` or `HSL` text. `onChange` receives a `#rrggbb` hex string in the standalone variant and a CSS gradient string in the gradient variant.

**When to use it.** Use `ColorPicker` in design tools, theme customizers, and gradient builders.

**Features.**

- **360° Color Wheel Canvas**: Dragging on the ring sets hue from the angle and saturation from the distance to the centre.
- **Lightness and Saturation Rows**: Ten swatches each. Lightness runs 10% to 95% and saturation 10% to 100%, both at the current hue.
- **Curated Theme Collections**: Four fixed four-colour palettes (Neon Cyber, Pastel Dreams, Warm Autumn, Deep Midnight) plus 48 preset swatches.
- **Gradient Engine**: Linear, radial or conic gradients with two or three stops, an angle slider in 5° steps, a stop swap button and 12 preset gradients.
- **Randomize**: Picks colours and an angle at random from a built-in pool of 15 vibrant hex values.
- **Multi-Format Copy**: Switch between `HEX`, `RGB` and `HSL` and copy with a check-mark confirmation. The gradient variant copies `background: <gradient>;`.

## For AI agents

**When to use**

- Interactive color selection (`variant="standalone"`) with lightness and saturation rows, theme collections, and `HEX`/`RGB`/`HSL` output
- Linear/radial/conic CSS gradient creation (`variant="gradient"`) with 2–3 stops and an angle slider

**When not to use**

- Simple light/dark theme switching — use [Theme Switcher](https://avaraui.com/docs/reactjs/theme-switcher)

**Agent notes**

- Named export: `import { ColorPicker } from "@/components/custom/color-picker"`
- Standalone: `value` is a `#rrggbb` hex string and `onChange` always receives a hex string, whatever `format` is. `format` only changes the displayed and copied text.
- The opacity slider (`showAlpha`) is visual only: the opacity is never included in the `onChange` value.
- Gradient: `value` only seeds the first stop, and only if it is a hex colour. Read the result from `onChange`, which receives the full gradient string. `format` and the `show*` props have no effect there.
- Pass a stable `onChange` (a state setter or a `useCallback`) to the gradient variant, because it re-sends the gradient whenever the callback identity changes.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `"#d0ff00"` | The active color as a hex string. In the gradient variant it only seeds the first stop. |
| `onChange` | `(color: string) => void` | `undefined` | Called when the color changes. Receives a hex string, or a CSS gradient string in the gradient variant. |
| `format` | `"hex" \| "rgb" \| "hsl"` | `"hex"` | Initial color format displayed in the input field and copy output. It does not change what `onChange` receives. |
| `variant` | `"standalone" \| "gradient"` | `"standalone"` | Display variant: 360° Color Wheel Studio or Gradient Studio Generator. |
| `showShades` | `boolean` | `true` | Whether to show the 10-step lightness row. The saturation row is always shown. |
| `showHarmonies` | `boolean` | `true` | Whether to show the curated theme collections row. |
| `showPresets` | `boolean` | `true` | Whether to show the preset color swatches row. |
| `showAlpha` | `boolean` | `true` | Whether to show the opacity slider. It is visual only and is not part of the emitted value. |
| `showEyeDropper` | `boolean` | `true` | Whether to show the screen EyeDropper pipette button when supported. |

## Works with other components

- Pair `ColorPicker` with [Popover](https://avaraui.com/docs/reactjs/popover) for compact toolbar color swatches.
- Combine with [Copy Button](https://avaraui.com/docs/reactjs/copy-button) or [Card](https://avaraui.com/docs/reactjs/card) in theme-builder dashboards.
- Pair the standalone picker with a hex [Input](https://avaraui.com/docs/reactjs/input) when the form needs a typed fallback for browsers without `EyeDropper`.

## What does onChange return in ColorPicker, and does format change it?

In the standalone variant `onChange` always receives a `#rrggbb` hex string, even when `format` is `"rgb"` or `"hsl"`. The `format` prop and the HEX/RGB/HSL tabs only change the text shown in the field and the text copied to the clipboard.

## How do I get a CSS gradient from ColorPicker?

Set `variant="gradient"` and pass an `onChange`. It receives a string such as `linear-gradient(135deg, #8b5cf6, #ec4899)`, or the `radial-gradient` and `conic-gradient` forms, each time a stop, type or angle changes. The Copy button puts `background: <gradient>;` on the clipboard.

## Does the ColorPicker opacity slider change the value I get?

No. The slider moves and is shown as a percentage, but the value sent to `onChange` is built from hue, saturation and lightness only, so it never includes an alpha channel, and moving the slider just re-sends the same hex. Hide it with `showAlpha={false}` or track opacity in your own state.

## Why is the EyeDropper button missing in ColorPicker?

The pipette only renders when `"EyeDropper" in window`, a browser API that is mostly limited to Chromium-based browsers. You can also hide it with `showEyeDropper={false}`. When it is available, the picked color is sent to `onChange` as hex and moves the wheel.

## Can I type a color into ColorPicker?

Yes, in the HEX tab. The field accepts a full six-digit value such as `#ff8800` and calls `onChange` once it matches, while three-digit shorthand is ignored. In the RGB and HSL tabs the field shows the current values as numbers, and only a six-digit hex value is ever parsed.

## Can I use ColorPicker without Next.js?

Yes. The file has no `next/*` imports and its only npm dependency is `lucide-react`, alongside the shadcn `utils` item. It is a client component that uses canvas, state and `navigator.clipboard`, so it works in Vite and any other React app.

---

Live previews and every example: https://avaraui.com/docs/nextjs/color-picker
