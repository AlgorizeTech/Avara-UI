---
title: "QR Code Suite"
description: "A premium, dual-purpose QR Code component suite built for Next.js applications. Free shadcn/ui QR Code component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/qr-code-generator
---

# QR Code Suite

A premium, dual-purpose QR Code component suite built for Next.js applications.

Whether you need to generate high-fidelity, customizable QR codes (with PNG/PDF download support) or allow users to upload and scan QR code images to extract embedded URLs, this suite has you covered.

Everything below runs client-side — type a new value and the SVG regenerates instantly. The generator and the reader are separate components with separate install commands.

## QR generator

### QR generator

Type a value, pick an error-correction level, and export as PNG or PDF.

- `value` is the data or URL encoded into the code — required, despite defaulting to an empty string.

```tsx
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

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/qr-code-generator.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/qr-code-generator
```

### More examples

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

### QR reader

- `onRead` on `QrCodeReader` receives the decoded payload — the decode happens in the browser, nothing is uploaded.

```tsx
export default function ReaderExample() {
  // Click or drag-and-drop a QR image; `onRead` fires with the decoded string.
  return <QrCodeReader onRead={(data) => console.log("Scanned QR:", data)} />;
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/qr-code-reader.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/qr-code-reader
```

## Features
Explore the QR Code Generator's customizable features, allowing for different colors, sizes, and embedded logos within the code.

### Fully Client-side

Runs securely in the browser without relying on any external APIs.

### High-Fidelity Output

Generates crisp, scalable SVG QR codes that never lose visual quality.

### Highly Customizable

Easily tweak foreground/background colors, sizes, and error correction levels.

### Drag-and-Drop Scan

The reader supports both file selection and drag-and-drop for a premium UX.

## Best Practices & Guidelines

### Color Contrast

Ensure a high contrast between the background and foreground colors. A light background (e.g., `#FFFFFF`) with a dark foreground (e.g., `#000000`) is recommended for optimal scannability by smartphone cameras.

### Error Correction Level

Use L (Low) for simple URLs to keep the QR code visually clean and sparse. Use H (High) if you plan to overlay a custom logo in the center, as it allows up to 30% of the code to be obscured without breaking.

### Error Handling

The reader automatically handles invalid or unreadable images. Consider adding UI feedback (e.g., a toast notification) if the `onRead` callback isn't triggered after a user uploads an invalid file.

### Accessibility (a11y)

The drag-and-drop area is keyboard accessible, but ensure any surrounding labels or descriptions clearly instruct the user to upload a valid QR code image.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `""` | The data or URL to encode inside the QR code (Required). |
| `size` | `number` | `128` | The width and height of the QR code in pixels. |
| `bgColor` | `string` | `"#FFFFFF"` | Background color of the QR code (supports hex/rgba). |
| `fgColor` | `string` | `"#000000"` | Foreground color (the dots/pattern) of the QR code. |
| `level` | `"L" \| "M" \| "Q" \| "H"` | `"L"` | Error correction level (Low, Medium, Quartile, High). |

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onRead` | `(data: string) => void` | `undefined` | Callback function triggered upon successfully reading a QR code from an image. |
| `className` | `string` | `undefined` | Additional CSS classes applied to the outer wrapper of the reader component. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/qr-code-generator
