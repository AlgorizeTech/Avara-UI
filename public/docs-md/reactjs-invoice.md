---
title: "Shadcn Invoice Dashboard"
description: "Shadcn Invoice Dashboard. A complete, fully functional, and editable Invoice dashboard component featuring 5 distinct design variants."
url: https://avaraui.com/docs/nextjs/invoice
---

# Shadcn Invoice Dashboard

A complete, fully functional, and editable Invoice dashboard component featuring 5 distinct design variants: Default, Asymmetric Split, Modern Geometric, Corporate Executive, and Neo-Brutalist.

The component is fully encapsulated — hand it an `invoiceData` object and it owns the rest. Click **Edit** in the sidebar or top toolbar of any preview to add items, change quantities and download the resulting JSON.

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

## Variations

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

### Asymmetric Split

High-impact editorial split layout with dark charcoal sidebar, themed logo block, angled header divider, and payment details.

```tsx
import Invoice, { type InvoiceData } from "@/components/custom/blocks/Invoice";

const invoiceData: InvoiceData = {
  invoiceNumber: "#123456",
  dateIssued: "April 05, 2026",
  companyName: "AVARA_UI",
  tagline: "DESIGN SYSTEM ARCHITECTURE",
  invoiceTo: {
    name: "Jhone Doe.",
    company: "Managing Director, Company ltd.",
    phone: "+123 4567 8910",
    email: "example@mail.com",
    address: "7777 Mendez Plains, Brooklyn, CA 91905",
  },
  invoiceFrom: {
    name: "Jhone Smith.",
    company: "Managing Director, Company ltd.",
    phone: "+123 4567 8910",
    email: "example@mail.com",
  },
  items: [
    { item: "Business Card Design", unitPrice: "$50", qty: "2", total: "$100.00" },
    { item: "Interface Design", unitPrice: "$50", qty: "2", total: "$100.00" },
    { item: "Dashboard Template", unitPrice: "$50", qty: "2", total: "$100.00" },
    { item: "User Experience Design", unitPrice: "$50", qty: "2", total: "$100.00" },
    { item: "Mobile Application Design", unitPrice: "$50", qty: "2", total: "$100.00" },
    { item: "Affiliate Marketing", unitPrice: "$50", qty: "2", total: "$100.00" },
  ],
  subtotal: "$1000.00",
  tax: "$100.00",
  discount: "$0.00",
  grandTotal: "$1100.00",
  paymentMethod: {
    accountNo: "1234 5678 910",
    accountName: "Jhone Doe.",
    branchName: "XYZ",
  },
  companyContact: {
    phone: "+123 4567 8910",
    email: "example@mail.com",
    website: "www.sitename.com",
  },
  terms: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.",
  ],
  signatory: {
    name: "AUTHORISED SIGN",
  },
};

export default function SplitInvoice() {
  return <Invoice variant="split" invoiceData={invoiceData} />;
}
```

### Modern Geometric

Fashion & creative agency invoice featuring abstract geometric pattern tiles, solid navy recipient badge, zebra table rows, watermark arcs, and terms footer.

```tsx
import Invoice, { type InvoiceData } from "@/components/custom/blocks/Invoice";

const invoiceData: InvoiceData = {
  invoiceNumber: "INV-2026-4987",
  dateIssued: "Thursday, 7 December 2026",
  companyName: "AVARA_UI",
  tagline: "Crafting Next-Gen Interfaces: Where Code Meets Design Elegance!",
  invoiceTo: {
    name: "Jordan Stevenson",
    company: "Hall-Robbins PLC",
    description: "Full-stack digital design systems and accessible React / Next.js component architectures.",
    phone: "+1 (616) 865-4180",
    address: "7777 Mendez Plains, Brooklyn, CA 91905",
    email: "don85@johnson.com",
  },
  items: [
    {
      item: "Design System Architecture",
      description: "Full-scale tokenized component library & theme presets",
      unitPrice: "$1,200.00",
      qty: "01",
      total: "$1,200.00",
    },
    {
      item: "Next.js Dashboard Blocks",
      description: "Responsive layouts, data visualizations, and interactive forms",
      unitPrice: "$850.00",
      qty: "02",
      total: "$1,700.00",
    },
    {
      item: "Interactive Animations & Micro-Interactions",
      description: "Smooth marquee drifts, scroll timelines, and spring motion",
      unitPrice: "$650.00",
      qty: "01",
      total: "$650.00",
    },
    {
      item: "Production Review & a11y Audit",
      description: "WCAG contrast verification, dark mode testing & QA",
      unitPrice: "$400.00",
      qty: "01",
      total: "$400.00",
    },
  ],
  subtotal: "$3,950.00",
  grandTotal: "$4,250.00",
  terms: [
    "Payment is due within 30 days of issuance via corporate ACH, wire, or card settlement.",
    "All delivered component source files include perpetual commercial licensing under Avara UI.",
  ],
  signatory: {
    name: "Tommy Shelby",
    title: "OPERATIONS DIRECTOR",
  },
  companyContact: {
    phone: "+1 (123) 456 7891",
    email: "support@avaraui.com",
    social: "avaraui.com",
    address: "450 South Brand Brooklyn, CA 91905, USA",
  },
};

export default function GeometricInvoice() {
  return <Invoice variant="geometric" invoiceData={invoiceData} />;
}
```

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

## About Shadcn Invoice Dashboard

**What it is.** **Shadcn Invoice Dashboard** (`Invoice`) is a self-contained, editable invoice component with five layouts (`default`, `split`, `geometric`, `corporate` and `brutalist`). It renders the numbers you give it and does no billing maths of its own.

**How it is built.** It is one default export that copies `invoiceData` into local state on mount. Edit mode swaps each field for an input and adds or removes line items, and the controls print through `window.print()` or download the data as JSON. Only `lucide-react` is installed as an npm dependency.

**When to use it.** Use it for SaaS billing portals, freelance invoicing tools and client statements where you already know the totals and want a presentable, printable sheet.

## For AI agents

**When to use**

- SaaS billing portals, freelance invoicing tools
- Agency client statements, B2B finance dashboards

**When not to use**

- Raw tabular data with no billing totals: use [Table](https://avaraui.com/docs/reactjs/table)
- A payment or ticket QR code: use [QR Code Generator](https://avaraui.com/docs/reactjs/qr-code-generator)

**Agent notes**

- `Invoice` is the default export of `@/components/custom/blocks/Invoice`; `InvoiceData` is a named type export. It takes `invoiceData`, `variant` (`"default" | "split" | "geometric" | "corporate" | "brutalist"`) and `color`.
- `subtotal`, `tax`, `discount` and `grandTotal` are plain strings you supply. Editing a line item does not recalculate them.
- `invoiceData` only seeds state on first render. Changing the prop later does not update the sheet, and there is no `onChange` callback; edits leave the component through the JSON download.
- The `split` and `geometric` layouts show built-in sample text (such as a signatory name) when `signatory`, `terms` or `invoiceFrom` are missing, so fill those in.
- `color` is `"primary"`, `"indigo"`, `"rose"`, `"emerald"`, `"zinc"` or a hex string such as `"#0ea5e9"`.

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

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `invoiceData` | `InvoiceData` | Required | The core data object containing all fields (dates, addresses, billing details, array of items, totals, and notes). |
| `variant` | `"default" \| "corporate" \| "brutalist" \| "geometric" \| "split"` | `"default"` | Applies overarching structural layouts, including borders, backdrop blurs, shadows, or geometric styling. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| (string & {})` | `"primary"` | A preset name, or a hex string such as "#0ea5e9". Colors buttons, focus rings and accent text. Unknown names fall back to "primary". |

## Works with other components

- [Table](https://avaraui.com/docs/reactjs/table) lists past invoices, with each row opening an `Invoice` for that record.
- [QR Code Generator](https://avaraui.com/docs/reactjs/qr-code-generator) makes a payment QR code to place beside the sheet.
- [Dialog](https://avaraui.com/docs/reactjs/dialog) can host an `Invoice` as a preview before the customer downloads or prints it.

## How do I switch the Invoice layout with the variant prop?

Pass `variant` as `"default"`, `"split"`, `"geometric"`, `"corporate"` or `"brutalist"`; it defaults to `"default"`. The `invoiceData` type stays the same, but each layout reads different fields. For example, `split` shows `invoiceFrom` and `paymentMethod`, while `default` shows `billTo`.

## Can I use my own brand colour on the Invoice?

Yes. The `color` prop accepts `"primary"`, `"indigo"`, `"rose"`, `"emerald"` or `"zinc"`, or any hex string starting with `#`. A hex value sets CSS variables on the root and picks readable text for it. Any other string falls back to `"primary"`.

## Does the Invoice calculate subtotal, tax and grand total?

No. `subtotal`, `tax`, `discount` and `grandTotal` are strings that `Invoice` displays as given, and editing a line item does not update them. Calculate the totals before you pass `invoiceData`, or edit those fields by hand in edit mode.

## How do I print an Invoice or save it as a PDF?

Use the Print button in the toolbar or sidebar. It calls `window.print()`, so the browser print dialog opens and you can choose Save as PDF. The toolbar and sidebar carry `print:hidden`, so only the invoice sheet is printed.

## How do I save edits made in the Invoice to my backend?

`Invoice` has no `onChange` or `onSave` prop. It copies `invoiceData` into internal state on mount, and edits leave only through the JSON download, named `Invoice_<invoiceNumber>.json`. To post edits to an API, add a callback to the copied source file.

## Does the Invoice component work in Vite as well as Next.js?

Yes. `Invoice.tsx` has no `next/*` imports, so it runs in Vite and any other React app. It needs `lucide-react` for icons and the `cn` helper from `@/lib/utils`, and the `invoice-theme.ts` colour helper installs alongside it. The file is marked `"use client"`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/invoice
