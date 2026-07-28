# QR Code Suite

A premium, dual-purpose QR Code component suite built for Next.js applications. 

Whether you need to generate high-fidelity, customizable QR codes (with PNG/PDF download support) or allow users to upload and scan QR code images to extract embedded URLs, this suite has you covered.

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

## Interactive Showcase
Adjust the settings in the interactive QR Code demo to see the code regenerate in real-time.

## Installation

### 1. Install Dependencies

The QR Code Generator relies on the lightweight, industry-standard package `qrcode.react` for generating SVG QR Codes.

```bash
npm install qrcode.react
```

The QR Code Reader relies on the `jsqr` package for reading and extracting data from uploaded images, and `lucide-react` for the UI icons.

```bash
npm install jsqr lucide-react
```

## Implementation

```tsx

export default function GeneratorExample() {
  return (

  );
}
```

Allow users to click or drag-and-drop a QR code image to read its contents.

```tsx

export default function ReaderExample() {
  return (
    
       console.log("Scanned QR:", data)} />
    
  );
}
```

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

**Component Path:** `nextjs\qr-code-generator\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
