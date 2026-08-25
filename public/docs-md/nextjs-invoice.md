# Invoice Dashboard

A complete, fully functional, and editable Invoice dashboard component. Includes built-in state management for editing line items, adjusting totals, printing, and downloading the invoice data as a JSON file.

The component is fully encapsulated — hand it an `invoiceData` object and it owns the rest. Click **Edit** in the right sidebar of any preview to add items, change quantities and download the resulting JSON.

export const invoiceSource = `const invoiceData = {
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

export const usageDefault = `import Invoice from "@/components/custom/blocks/Invoice";

${invoiceSource}

export default function InvoicePage() {
  return ;
}`;

export const usageMinimal = `import Invoice from "@/components/custom/blocks/Invoice";

${invoiceSource}

export default function MinimalInvoice() {
  // Strips the card chrome down to type and rules — the print-friendly layout.
  return ;
}`;

export const usageGlass = `import Invoice from "@/components/custom/blocks/Invoice";

${invoiceSource}

export default function GlassInvoice() {
  return (
    // Nature wallpaper backdrop for glass refraction

  );
};`;

## Installation

## Examples

## Features
Explore the Invoice component's structured layout for displaying billing information, line items, and dynamic total calculations.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

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

**Component Path:** `[framework]\invoice\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
