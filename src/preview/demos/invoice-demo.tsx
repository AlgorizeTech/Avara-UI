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

export default function InvoiceDemo({
  variant = "default",
  color = "primary",
}: {
  variant?: InvoiceVariant;
  color?: InvoiceColor | string;
}) {
  return (
    <div
      className={`w-full max-w-full overflow-hidden transition-all duration-500 ${variant === "glass" ? "p-1 sm:p-8 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl" : "p-0 bg-transparent"}`}
    >
      <Invoice
        key={`${variant}-${color}`} // Force re-render to clear edit state on theme change
        variant={variant}
        color={color}
        invoiceData={sampleData}
      />
    </div>
  );
}
