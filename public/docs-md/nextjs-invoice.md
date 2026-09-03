# Invoice Dashboard

A complete, fully functional, and editable Invoice dashboard component featuring 8 distinct design variants: Default, Minimal, Glassmorphism, Corporate Executive, Modern Tech, Compact Receipt, Neo-Brutalist, and Creative Agency.

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
  return <Invoice invoiceData={invoiceData} />;
}`;

export const usageCorporate = `import Invoice from "@/components/custom/blocks/Invoice";

${invoiceSource}

export default function CorporateInvoice() {
  return <Invoice variant="corporate" invoiceData={invoiceData} />;
}`;

export const usageModern = `import Invoice from "@/components/custom/blocks/Invoice";

${invoiceSource}

export default function ModernInvoice() {
  return <Invoice variant="modern" invoiceData={invoiceData} />;
}`;

export const usageCompact = `import Invoice from "@/components/custom/blocks/Invoice";

${invoiceSource}

export default function CompactInvoice() {
  return <Invoice variant="compact" invoiceData={invoiceData} />;
}`;

export const usageBrutalist = `import Invoice from "@/components/custom/blocks/Invoice";

${invoiceSource}

export default function BrutalistInvoice() {
  return <Invoice variant="brutalist" invoiceData={invoiceData} />;
}`;

export const usageCreative = `import Invoice from "@/components/custom/blocks/Invoice";

${invoiceSource}

export default function CreativeInvoice() {
  return <Invoice variant="creative" invoiceData={invoiceData} />;
}`;

export const usageMinimal = `import Invoice from "@/components/custom/blocks/Invoice";

${invoiceSource}

export default function MinimalInvoice() {
  return <Invoice variant="minimal" invoiceData={invoiceData} />;
}`;

export const usageGlass = `import Invoice from "@/components/custom/blocks/Invoice";

${invoiceSource}

export default function GlassInvoice() {
  return (
    <div
      className="p-8 rounded-2xl bg-cover bg-center relative"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop")',
      }}
    >
      <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none" />
      <Invoice variant="glass" invoiceData={invoiceData} />
    </div>
  );
};`;

## Installation

```bash
npx shadcn@latest add "https://algorizetech.com/r/invoice.json"
```
