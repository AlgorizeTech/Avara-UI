"use client";

import Invoice, {
  InvoiceColor,
  InvoiceVariant,
} from "@/components/custom/blocks/Invoice";

const sampleData = {
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

const geometricSampleData = {
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

const splitSampleData = {
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
    title: "",
  },
};

export default function InvoiceDemo({
  variant = "default",
  color = "primary",
}: {
  variant?: InvoiceVariant;
  color?: InvoiceColor | string;
}) {
  const activeData =
    variant === "split"
      ? splitSampleData
      : variant === "geometric"
        ? geometricSampleData
        : sampleData;

  return (
    <div className="w-full max-w-full overflow-hidden transition-all duration-500 relative p-0 bg-transparent">
      <Invoice
        key={`${variant}-${color}`} // Force re-render to clear edit state on theme change
        variant={variant}
        color={color}
        invoiceData={activeData}
      />
    </div>
  );
}
