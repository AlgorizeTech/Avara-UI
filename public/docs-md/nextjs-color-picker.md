# Color Picker & Palette

An advanced, feature-rich **360° Color Spectrum Wheel** and **Gradient Studio Generator** component suite featuring real-time 2D color wheel spectrum tracking, lightness & opacity sliders, live shades & tints scale, color harmonies generator, dual/triple stop gradient creator, angle dial, and one-click CSS copy.

## Variations

export const usageStandalone = `import { ColorPicker } from "@/components/custom/color-picker";

export default function ColorWheelStudioDemo() {
  const [color, setColor] = useState("#d0ff00");

  return (
    
  );
}`;

export const usageGradient = `import { ColorPicker } from "@/components/custom/color-picker";

export default function GradientStudioDemo() {
  const [gradient, setGradient] = useState("linear-gradient(135deg, #8b5cf6, #ec4899)");

  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/color-picker
```

## Features

Discover the advanced capabilities of the `ColorPicker` component:

- **360° Spectrum Color Wheel Canvas**: Real-time 2D pointer tracking across the full 360-degree HSL hue & saturation color wheel canvas.
- **Shades & Tints Generator**: Automatically computes 5 lightness levels (15%, 30%, 50%, 70%, 85%) for any selected color.
- **Color Harmonies Generator**: Automatically generates Complementary, Analogous 1 & 2, and Triadic 1 & 2 color swatches.
- **Multi-Type Gradient Engine**: Create Linear, Radial, or Conic gradients with 2-stop or 3-stop color pickers and angle compass dial.
- **Randomize Gradient Generator**: Generate infinite vibrant gradient combinations at the click of a button.
- **Multi-Format Output & Copy**: Toggle between `HEX`, `RGB`, and `HSL` formats with animated copy-to-clipboard feedback.
- **Native EyeDropper API**: Integrated support for screen color sampling via browser EyeDropper API.

## Props Reference: ColorPicker

        Prop
        Type
        Default
        Description

          value

          string

          "#d0ff00"
        
        The active hex or color string value.

          onChange

          (color: string) =&gt; void

          undefined
        
        Callback function fired when color changes.

          format

          "hex" | "rgb" | "hsl"

          "hex"
        
        Initial color format displayed in the input field and copy output.

          variant

          "standalone" | "gradient"

          "standalone"
        
        Display variant: 360° Color Wheel Studio or Gradient Studio Generator.

          showShades

          boolean

          true
        
        Whether to show the 5-step shades & tints spectrum row.

          showHarmonies

          boolean

          true
        
        Whether to show the 5-color harmony generator row (Comp, Ana 1/2, Tri 1/2).

          showPresets

          boolean

          true
        
        Whether to show the preset color swatches row.

          showAlpha

          boolean

          true
        
        Whether to show the transparency opacity slider.

          showEyeDropper

          boolean

          true
        
        Whether to show the screen EyeDropper pipette button when supported.

---

**Component Path:** `[framework]\color-picker\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
