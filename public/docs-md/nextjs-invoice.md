---
title: "Shadcn Invoice Dashboard"
description: "Shadcn Invoice Dashboard. A complete, fully functional, and editable Invoice dashboard component featuring 3 distinct design variants."
url: https://avaraui.com/docs/nextjs/invoice
---

# Shadcn Invoice Dashboard

A complete, fully functional, and editable Invoice dashboard component featuring 3 distinct design variants: Default, Corporate Executive, and Neo-Brutalist.

The component is fully encapsulated — hand it an `invoiceData` object and it owns the rest. Click **Edit** in the right sidebar of any preview to add items, change quantities and download the resulting JSON.

## For AI agents

**Ask before you pick.** This page has 3 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 3 options as live previews: https://avaraui.com/view/invoice

**When to use it.** An editable invoice dashboard in three designs: a default dashboard, a corporate executive look and a neo-brutalist one. You hand it an `invoiceData` object and it owns the rest, including editing line items and downloading the JSON.

**Gotchas:**

- All three are looks of the one `invoice` item: install it once and set `variant` from the index.
- The dates, addresses, billing details, line items, totals and notes all come from the one `invoiceData` object.

### The 3 variants

1. **Default dashboard** (`default`): The standard invoice dashboard, with your accent colour on the primary buttons and focus rings.
   - Live: https://avaraui.com/view/invoice/default
   - Best for: a SaaS or billing area that should match a general dashboard
   - Avoid if: you want a stricter business look or a bold, graphic one
   - Traits: dashboard layout, default look, editable with an Edit sidebar
   - Install: `npx shadcn@latest add @avara-ui/invoice`
   - Set these props: `{"variant":"default"}`
   - Docs: https://avaraui.com/docs/nextjs/invoice#default-dashboard-invoice
2. **Corporate executive** (`corporate`): A formal, business-style invoice.
   - Live: https://avaraui.com/view/invoice/corporate
   - Best for: a B2B or finance product where the invoice should look formal
   - Avoid if: your brand is playful or casual
   - Traits: formal styling
   - Install: `npx shadcn@latest add @avara-ui/invoice`
   - Set these props: `{"variant":"corporate"}`
   - Docs: https://avaraui.com/docs/nextjs/invoice#corporate-executive
3. **Neo-brutalist** (`brutalist`): A bold neo-brutalist invoice.
   - Live: https://avaraui.com/view/invoice/brutalist
   - Best for: a brand with a loud, graphic, neo-brutalist identity
   - Avoid if: you need a conservative or corporate look
   - Traits: neo-brutalist styling
   - Install: `npx shadcn@latest add @avara-ui/invoice`
   - Set these props: `{"variant":"brutalist"}`
   - Docs: https://avaraui.com/docs/nextjs/invoice#neo-brutalist

## Default Dashboard Invoice

Editing, totals, printing and JSON export are all handled internally.

- Pass one `invoiceData` object holding the dates, addresses, billing details, line items, totals and notes.
- `color` themes the primary buttons, focus rings and heart icon.

```tsx
import Invoice, { type InvoiceData } from "@/components/custom/blocks/Invoice";

const invoiceData: InvoiceData = {
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
};

export default function InvoicePage() {
  return <Invoice invoiceData={invoiceData} />;
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/invoice.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/invoice
```

## Variations

### Corporate Executive

High-contrast solid header banner layout for formal B2B billing and corporate accounts.

```tsx
import Invoice, { type InvoiceData } from "@/components/custom/blocks/Invoice";

const invoiceData: InvoiceData = {
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
};

export default function CorporateInvoice() {
  return <Invoice variant="corporate" invoiceData={invoiceData} />;
}
```

### Neo-Brutalist

Bold 2px hard black borders, offset hard drop shadows, and high-contrast typography.

```tsx
import Invoice, { type InvoiceData } from "@/components/custom/blocks/Invoice";

const invoiceData: InvoiceData = {
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
};

export default function BrutalistInvoice() {
  return <Invoice variant="brutalist" invoiceData={invoiceData} />;
}
```

## Features
Explore the Invoice component's structured layout for displaying billing information, line items, and dynamic total calculations.

### 3 Design Variants

Choose from Default, Corporate Executive, and Neo-Brutalist layout variants.

### Interactive Edit & Export

Inline editing for item prices, descriptions, quantities, with instant recalculations and JSON export.

### Print & PDF Ready

Built-in browser print triggers that automatically hide control sidebars and format clean PDF pages.

### Theme Integration

Seamless support for custom color themes across primary buttons, focus rings, and badges.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `invoiceData` | `InvoiceData` | Required | The core data object containing all fields (dates, addresses, billing details, array of items, totals, and notes). |
| `variant` | `"default" \| "corporate" \| "brutalist"` | `"default"` | Applies overarching structural layouts, including borders, backdrop blurs, and shadows. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc"` | `"primary"` | Applies global color themes to buttons, focus rings, and highlights. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/invoice
