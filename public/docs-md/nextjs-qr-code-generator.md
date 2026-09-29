export const metadata = docsPageMetadata("qr-code-generator", {
  title: "QR Code",
  description: "A complete QR Code suite allowing you to easily generate high-quality QR codes and seamlessly scan/read uploaded QR code images."
});

# QR Code Suite

A premium, dual-purpose QR Code component suite built for Next.js applications.

Whether you need to generate high-fidelity, customizable QR codes (with PNG/PDF download support) or allow users to upload and scan QR code images to extract embedded URLs, this suite has you covered.

Everything below runs client-side — type a new value and the SVG regenerates instantly. The generator and the reader are separate components with separate install commands.

## QR generator

export const usageGenerator = `"use client";

type Level = "L" | "M" | "Q" | "H";

export default function GeneratorExample() {
  const [value, setValue] = useState("https://algorizetech.com");
  const [level, setLevel] = useState("L");

  // Only  ships with the component — the controls around it
  // are ordinary markup wired to your own state.
  return (

          Generate QR codes from text or URLs.

            Value:
          
           setValue(e.target.value)}
            placeholder="https://algorizetech.com"
            className="w-full px-4 py-3 border border-input rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-colors"
          />

            Correction Level:

            {(["L", "M", "Q", "H"] as const).map((lvl) => (
               setLevel(lvl)}
                className={
                  "flex-1 cursor-pointer px-3 sm:px-4 py-2 text-sm font-medium transition-colors border-r border-border last:border-r-0 text-center " +
                  (level === lvl
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted")
                }
              >
                {lvl}
              
            ))}

            Save as PNG

            Save as PDF

  );
}`;

export const usageGallery = `import { QrCodeGenerator } from "@/components/custom/blocks/QrCodeGeneratorBlock";

const swatches = [
  { size: 96, level: "L" as const },
  { size: 140, level: "M" as const },
  { size: 200, level: "H" as const },
];

export default function QrGallery() {
  return (
    
      {swatches.map((s) => (

            size={s.size} · level=&quot;{s.level}&quot;

      ))}
    
  );
}`;

export const usageReader = `"use client";

export default function ReaderExample() {
  // Click or drag-and-drop a QR image; \`onRead\` fires with the decoded string.
  return  console.log("Scanned QR:", data)} />;
}`;

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/qr-code-generator
```

### More examples

## QR reader

A separate component with its own dependencies — decoding happens entirely in the browser.

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/qr-code-reader
```

## Features
Explore the QR Code Generator's customizable features, allowing for different colors, sizes, and embedded logos within the code.

    Fully Client-side
    Runs securely in the browser without relying on any external APIs.

    High-Fidelity Output
    Generates crisp, scalable SVG QR codes that never lose visual quality.

    Highly Customizable
    Easily tweak foreground/background colors, sizes, and error correction levels.

    Drag-and-Drop Scan
    The reader supports both file selection and drag-and-drop for a premium UX.

## Best Practices & Guidelines

    Color Contrast
    Ensure a high contrast between the background and foreground colors. A light background (e.g., #FFFFFF) with a dark foreground (e.g., #000000) is recommended for optimal scannability by smartphone cameras.

    Error Correction Level
    Use L (Low) for simple URLs to keep the QR code visually clean and sparse. Use H (High) if you plan to overlay a custom logo in the center, as it allows up to 30% of the code to be obscured without breaking.

    Error Handling
    The reader automatically handles invalid or unreadable images. Consider adding UI feedback (e.g., a toast notification) if the onRead callback isn't triggered after a user uploads an invalid file.

    Accessibility (a11y)
    The drag-and-drop area is keyboard accessible, but ensure any surrounding labels or descriptions clearly instruct the user to upload a valid QR code image.

## Props Reference

        Prop
        Type
        Default
        Description

        value
        string
        ""
        The data or URL to encode inside the QR code (Required).

        size
        number
        128
        The width and height of the QR code in pixels.

        bgColor
        string
        "#FFFFFF"
        Background color of the QR code (supports hex/rgba).

        fgColor
        string
        "#000000"
        Foreground color (the dots/pattern) of the QR code.

        level
        "L" | "M" | "Q" | "H"
        "L"
        Error correction level (Low, Medium, Quartile, High).

        Prop
        Type
        Default
        Description

        onRead
        (data: string) =&gt; void
        undefined
        Callback function triggered upon successfully reading a QR code from an image.

        className
        string
        undefined
        Additional CSS classes applied to the outer wrapper of the reader component.

---

**Component Path:** `[framework]\qr-code-generator\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
