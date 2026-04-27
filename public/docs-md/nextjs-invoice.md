# Invoice Dashboard

A complete, fully functional, and editable Invoice dashboard component. Includes built-in state management for editing line items, adjusting totals, printing, and downloading the invoice data as a JSON file.

## Interactive Showcase

This component is fully encapsulated. Use the control panel to switch between UI layouts (including minimal and glassmorphism) and select custom color themes.

Click the **"Edit"** button in the right sidebar of the preview below to test the editing mode. You can add items, change quantities, and download the resulting data.

_Click the **Code** tab in the preview below to copy the full component engine or the dynamic usage snippet for your current selection._

---

## Installation

### 1. Install Dependencies

This component utilizes `lucide-react` for its interface iconography. Run the following command:

```bash
npm install lucide-react
```

## Props Reference

        Prop
        Type
        Default
        Description

          invoiceData

          InvoiceData

          Required

          The core data object containing all fields (dates, addresses, billing
          details, array of items, totals, and notes). See usage example for
          shape.

          variant

          "default" | "minimal" | "glass"

          "default"

          Applies overarching structural layouts, including borders, backdrop
          blurs, and shadows.

          color

          "indigo" | "rose" | "emerald" | "zinc"

          "indigo"

          Applies global color themes to the primary buttons, focus rings, and
          heart icon.

---

**Component Path:** `nextjs\invoice\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
