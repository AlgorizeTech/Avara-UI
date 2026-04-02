"use client";

import { useState } from "react";
import Invoice, { InvoiceVariant, InvoiceColor } from "@/components/custom/blocks/Invoice";
import { ComponentPreview } from "@/components/site/ComponentPreview";

export function InvoiceShowcase() {
  const [variant, setVariant] = useState<InvoiceVariant>("default");
  const [color, setColor] = useState<InvoiceColor>("indigo");

  const generateCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";
    
    return `"use client";

import Invoice from "@/components/custom/blocks/Invoice";

export default function InvoiceDemo()${typeDef} {
  const initialData = {
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
      { item: "Premium Branding Package", description: "Branding & Promotion", hours: 48, qty: 1, total: "$32" },
      { item: "Web Design", description: "Web designing package", hours: 46, qty: 1, total: "$24" },
    ],
    subtotal: "$1800",
    discount: "$28",
    tax: "21%",
    grandTotal: "$1690",
    salesPerson: "Tommy Shelby",
    note: "Note: It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!",
  };

  return (
    <div className="w-full">
      <Invoice 
        invoiceData={initialData} 
        variant="${variant}"
        color="${color}"
      />
    </div>
  );
}`;
  };

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
      { item: "Premium Branding Package", description: "Branding & Promotion", hours: 48, qty: 1, total: "$32" },
      { item: "Web Design", description: "Web designing package", hours: 46, qty: 1, total: "$24" },
    ],
    subtotal: "$1800",
    discount: "$28",
    tax: "21%",
    grandTotal: "$1690",
    salesPerson: "Tommy Shelby",
    note: "Note: It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!",
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col sm:flex-row gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex-wrap">
        
        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Style Variant</label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {(["default", "minimal", "glass"] as InvoiceVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  variant === v
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Theme Color</label>
          <div className="flex items-center gap-2 h-[36px]">
            {[
              { id: "indigo", bg: "bg-indigo-500" },
              { id: "rose", bg: "bg-rose-500" },
              { id: "emerald", bg: "bg-emerald-500" },
              { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id as InvoiceColor)}
                className={`w-6 h-6 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                  color === c.id 
                    ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110" 
                    : "hover:scale-110 hover:opacity-80"
                }`}
                title={c.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* --- WRAPPER WITH DYNAMIC CODE --- */}
      <ComponentPreview
        name="Invoice"
        tsCode={generateCode(true)}
        jsCode={generateCode(false)}
      >
        <div className={`w-full transition-all duration-500 ${variant === 'glass' ? "p-4 sm:p-8 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl" : ""}`}>
          <Invoice 
            variant={variant}
            color={color}
            invoiceData={sampleData}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}