---
title: "Shadcn QR Code"
description: "Shadcn QR Code. A dual-purpose QR code suite for React apps: render a customizable SVG QR code, or let users upload an image and read the text inside it."
url: https://avaraui.com/docs/nextjs/qr-code-generator
---

# Shadcn QR Code

A dual-purpose QR code suite for React apps: render a customizable SVG QR code, or let users upload an image and read the text inside it.

Everything below runs client-side — type a new value and the SVG regenerates instantly. The generator and the reader are separate components with separate install commands.

## QR generator

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/qr-code-generator.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/qr-code-generator
```

### QR generator

Type a value, pick an error-correction level, and export as PNG or PDF.

- `value` is the data or URL encoded into the code — required, with no default; an empty string shows a "No Value" placeholder instead of a code.

```tsx
"use client";

import { QrCodeGenerator } from "@/components/custom/blocks/QrCodeGeneratorBlock";
import { FileText, ImageIcon } from "lucide-react";
import { useState } from "react";

type Level = "L" | "M" | "Q" | "H";

export default function GeneratorExample() {
  const [value, setValue] = useState("https://algorizetech.com");
  const [level, setLevel] = useState<Level>("L");

  // Only <QrCodeGenerator> ships with the component — the controls around it
  // are ordinary markup wired to your own state.
  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 bg-background p-8 md:p-12 border border-border rounded-2xl">
      <div className="flex-1 flex flex-col gap-6">
        <h3 className="text-lg font-medium text-muted-foreground">
          Generate QR codes from text or URLs.
        </h3>

        <div className="flex flex-col gap-2">
          <label htmlFor="qr-input" className="block text-sm font-semibold text-foreground">
            Value:
          </label>
          <input
            id="qr-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://algorizetech.com"
            className="w-full px-4 py-3 border border-input rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <label className="block text-sm font-semibold text-foreground mb-1">
            Correction Level:
          </label>
          <div className="grid grid-cols-4 sm:inline-flex rounded-xl border border-border bg-background overflow-hidden w-full sm:w-max">
            {(["L", "M", "Q", "H"] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setLevel(lvl)}
                className={
                  "flex-1 cursor-pointer px-3 sm:px-4 py-2 text-sm font-medium transition-colors border-r border-border last:border-r-0 text-center " +
                  (level === lvl
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted")
                }
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-center bg-muted/50 rounded-2xl border border-border p-8 min-h-[300px]">
          <QrCodeGenerator
            id="qr-wrapper"
            value={value}
            size={220}
            level={level}
            bgColor="transparent"
            fgColor="currentColor"
            className="text-primary"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <ImageIcon className="w-4 h-4" />
            Save as PNG
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground bg-card border border-border hover:bg-muted rounded-xl transition-colors">
            <FileText className="w-4 h-4" />
            Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
```

### More examples

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/qr-code-generator.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/qr-code-generator
```

### Sizes & levels

- `size={128}` is the box in pixels; the output is SVG, so it stays crisp at any of them.
- `fgColor` colours the pattern and `bgColor` the backing — keep the contrast high or scanners fail.
- `level` sets redundancy: `L`, `M`, `Q` or `H`. Higher survives more damage but packs the pattern denser.

```tsx
import { QrCodeGenerator } from "@/components/custom/blocks/QrCodeGeneratorBlock";

const swatches = [
  { size: 96, level: "L" as const },
  { size: 140, level: "M" as const },
  { size: 200, level: "H" as const },
];

export default function QrGallery() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-10">
      {swatches.map((s) => (
        <div key={s.size} className="flex flex-col items-center gap-3">
          <QrCodeGenerator
            value="https://algorizetech.com"
            size={s.size}
            level={s.level}
            bgColor="transparent"
            // "currentColor" lets the pattern inherit any text colour class.
            fgColor="currentColor"
            className="text-primary"
          />
          <span className="text-xs font-semibold text-muted-foreground">
            size={s.size} · level=&quot;{s.level}&quot;
          </span>
        </div>
      ))}
    </div>
  );
}
```

## QR reader

A separate component with its own dependencies — decoding happens entirely in the browser.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/qr-code-reader.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/qr-code-reader
```

### QR reader

- `onRead` on `QrCodeReader` receives the decoded payload — the decode happens in the browser, nothing is uploaded.

```tsx
"use client";

import { QrCodeReader } from "@/components/custom/blocks/QrCodeReaderBlock";

export default function ReaderExample() {
  // Click or drag-and-drop a QR image; `onRead` fires with the decoded string.
  return <QrCodeReader onRead={(data) => console.log("Scanned QR:", data)} />;
}
```

## About Shadcn QR Code

**What it is.** **Shadcn QR Code** provides two independent client-side components: `QrCodeGenerator` for rendering a crisp SVG QR code, and `QrCodeReader` for scanning uploaded or drag-and-dropped QR images. PNG and PDF export is not part of the component: the preview above builds it with a canvas and `jspdf` in the demo.

**How it is built.** Both components run in the browser without external APIs. `QrCodeGenerator` wraps `QRCodeSVG` from `qrcode.react` and takes `size`, `fgColor`, `bgColor`, `includeMargin` and an error-correction `level` (`L | M | Q | H`). `QrCodeReader` draws the image to a hidden canvas, decodes it with `jsqr` and calls `onRead`.

**When to use it.** Use it for payment checkout codes, event tickets, two-factor setup screens, and client-side QR image uploaders.

## For AI agents

**When to use**

- Showing a link, ticket or pairing code as a scannable SVG QR code
- Reading the text out of an uploaded or dropped QR image, entirely in the browser

**When not to use**

- A plain file upload with no QR decoding: use [File Upload](https://avaraui.com/docs/nextjs/file-upload)
- Copying a value to the clipboard: use [Copy Button](https://avaraui.com/docs/nextjs/copy-button)

**Agent notes**

- Install `qr-code-generator` for `QrCodeGenerator` and `qr-code-reader` for `QrCodeReader`.
- Pass `value` (required string), `size`, `fgColor`, `bgColor`, `includeMargin` and `level` (`"L" | "M" | "Q" | "H"`) to `QrCodeGenerator`. An empty `value` renders a dashed "No Value" box instead of a code.
- With `level` other than `"L"`, the component appends a short suffix (`#m1`, `#q12345` or `#h` plus digits) to `value` before encoding, so a scanner reads back the value plus that suffix. Use `"L"` when the decoded text must match exactly.
- There is no download or export prop. Serialise the rendered `svg` yourself if you need PNG or PDF.
- Pass `onRead={(data) => ...}` to `QrCodeReader`. It reads still images only (no camera) and calls `onRead` once per successful decode. Dropped images use the `onRead` from the first render, so keep that handler stable or read live state through a ref.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | Required | The data or URL to encode inside the QR code. An empty string renders a "No Value" placeholder. |
| `size` | `number` | `128` | The width and height of the QR code in pixels. |
| `bgColor` | `string` | `"#FFFFFF"` | Background colour of the QR code. Any CSS colour, including `"transparent"`. |
| `fgColor` | `string` | `"#000000"` | Foreground colour (the dots/pattern). Any CSS colour, including `"currentColor"`. |
| `level` | `"L" \| "M" \| "Q" \| "H"` | `"L"` | Error correction level (Low, Medium, Quartile, High). Levels other than `"L"` add a suffix to the encoded value. |
| `includeMargin` | `boolean` | `false` | Adds the 4-module quiet zone around the pattern. |
| `className` | `string` | `undefined` | Classes for the wrapping `div`. Other `div` attributes and a `ref` go to the same element. |

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onRead` | `(data: string) => void` | `undefined` | Callback function triggered upon successfully reading a QR code from an image. |
| `className` | `string` | `undefined` | Additional CSS classes applied to the outer wrapper of the reader component. |

## Works with other components

- Place `QrCodeGenerator` beside an [Invoice](https://avaraui.com/docs/nextjs/invoice) to give the bill a scannable payment link.
- Add a [Copy Button](https://avaraui.com/docs/nextjs/copy-button) next to the generator to copy the string you encode.
- Use [File Upload](https://avaraui.com/docs/nextjs/file-upload) when the upload is a plain document and no QR decoding is needed.

## How do I export a `QrCodeGenerator` code as PNG or PDF?

The component only renders SVG and has no export prop. The preview above serialises the rendered `svg`, draws it onto a canvas for PNG and passes that image to `jspdf` for PDF. `jspdf` is not installed with `qr-code-generator`, so add it yourself if you copy that approach.

## Why does the decoded text end in `#m1` when I change `level`?

For `"M"`, `"Q"` and `"H"` the component appends `#m1`, `#q12345` or `#h` plus 20 digits to `value` before encoding, which makes the pattern denser. A scanner reads that suffix back too. Keep the default `"L"` when the scanned text must equal `value` exactly.

## What do the `L`, `M`, `Q` and `H` levels in `QrCodeGenerator` mean?

They are the four QR error-correction levels (Low, Medium, Quartile, High), passed to `QRCodeSVG` as `level` with `"L"` as the default. Higher levels survive more smudging or cropping but produce a denser pattern, so raise `size` for `"Q"` and `"H"` to keep it scannable.

## How do I colour `QrCodeGenerator` with my theme?

Set `fgColor="currentColor"` and `bgColor="transparent"`, then give `className` a text colour such as `text-primary`. The classes land on the wrapping `div`, and the SVG inherits that colour. Keep strong contrast between foreground and background, or scanners fail.

## Does `QrCodeReader` upload the image or use the camera?

Neither. It accepts one still image by click or drag-and-drop (`accept="image/*"`), draws it to a hidden canvas scaled to at most 800 px, and decodes it in the browser with `jsqr`. Nothing is sent to a server, and the result goes to `onRead`.

## What does `QrCodeGenerator` show when `value` is empty?

A dashed bordered box reading "No Value", sized to `size` by `size` pixels, instead of a QR code. That makes it safe to bind `value` to an input that starts empty, such as the live generator in the preview above.

---

Live previews and every example: https://avaraui.com/docs/nextjs/qr-code-generator
