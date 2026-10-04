export const metadata = docsPageMetadata("invoice");

# Invoice Dashboard

A complete, fully functional, and editable Invoice dashboard component featuring 3 distinct design variants: Default, Corporate Executive, and Neo-Brutalist.

The component is fully encapsulated — hand it an `invoiceData` object and it owns the rest. Click **Edit** in the right sidebar of any preview to add items, change quantities and download the resulting JSON.

export const invoiceSource = `const invoiceData: InvoiceData = {
  invoiceNumber: "#4987",
  dateIssued: "13 Mar 2026",
  dateDue: "23 Mar 2026",
  invoiceTo: {
    name: "Jordan Stevenson",
    company: "Hall-Robbins PLC",
    address: "7777 Mendez Plains",
    phone: "(616) 865-4180",
    email: "don85@johnson.com",
  },
  billTo: {
    totalDue: "$12,110.55",
    bankName: "American Bank",
    country: "United States",
    iban: "ETD95476213874685",
    swift: "BR91905",
  },
  items: [
    {
      item: "Premium Branding Package",
      description: "Branding & Promotion",
      hours: 48,
      qty: 1,
      total: "$32",
    },
    {
      item: "Web Design",
      description: "Web designing package",
      hours: 46,
      qty: 1,
      total: "$24",
    },
  ],
  subtotal: "$1800",
  discount: "$28",
  tax: "21%",
  grandTotal: "$1690",
  salesPerson: "Tommy Shelby",
  note: "Note: It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!",
};`;

export const usageDefault = `import Invoice, { type InvoiceData } from "@/components/custom/blocks/Invoice";

${invoiceSource}

export default function InvoicePage() {
  return ;
}`;

export const usageCorporate = `import Invoice, { type InvoiceData } from "@/components/custom/blocks/Invoice";

${invoiceSource}

export default function CorporateInvoice() {
  return ;
}`;

export const usageBrutalist = `import Invoice, { type InvoiceData } from "@/components/custom/blocks/Invoice";

${invoiceSource}

export default function BrutalistInvoice() {
  return ;
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/invoice
```

## Variations

## Features
Explore the Invoice component's structured layout for displaying billing information, line items, and dynamic total calculations.

    3 Design Variants
    Choose from Default, Corporate Executive, and Neo-Brutalist layout variants.

    Interactive Edit & Export
    Inline editing for item prices, descriptions, quantities, with instant recalculations and JSON export.

    Print & PDF Ready
    Built-in browser print triggers that automatically hide control sidebars and format clean PDF pages.

    Theme Integration
    Seamless support for custom color themes across primary buttons, focus rings, and badges.

## Props Reference

        Prop
        Type
        Default
        Description

          invoiceData

          InvoiceData

          Required

          The core data object containing all fields (dates, addresses, billing
          details, array of items, totals, and notes).

          variant

          "default" | "corporate" | "brutalist"

          "default"

          Applies overarching structural layouts, including borders, backdrop
          blurs, and shadows.

          color

          "primary" | "indigo" | "rose" | "emerald" | "zinc"

          "primary"

          Applies global color themes to buttons, focus rings, and highlights.

---

**Component Path:** `[framework]\invoice\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
