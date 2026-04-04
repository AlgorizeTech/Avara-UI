"use client";

import { useState } from "react";
import EmailApp, { EmailVariant, EmailColor } from "@/components/custom/blocks/Email";
import { ComponentPreview } from "@/components/site/ComponentPreview";

export function EmailShowcase() {
  const [variant, setVariant] = useState<EmailVariant>("default");
  const [color, setColor] = useState<EmailColor>("indigo");

  const generateCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";
    
    return `"use client";

import EmailApp from "@/components/custom/blocks/Email";

export default function EmailDemo()${typeDef} {
  const initialEmails = [
    {
      id: 1,
      sender: "Tommy Sicilia",
      email: "tommy@example.com",
      subject: "How to Succeed with Your Shopify Store",
      time: "01:46 PM",
      fullDate: "Dec 10, 2026, 01:46 PM",
      isStarred: false,
      isRead: false,
      avatar: "https://i.pravatar.cc/150?u=tommy",
      labels: [{ color: "bg-rose-500", name: "Private", pill: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400" }],
      body: "Hello,\n\nI hope you are doing well.\n\nHere are some top tips to succeed with your new store.",
      attachments: [],
      folder: "inbox",
    }
  ] as any; // Quick cast if using JS instead of strict TS interfaces

  return (
    <div className="w-full">
      <EmailApp 
        initialEmails={initialEmails} 
        variant="${variant}"
        color="${color}"
      />
    </div>
  );
}`;
  };

  const sampleEmails = [
    {
      id: 1,
      sender: "Tommy Sicilia",
      email: "tommy@example.com",
      subject: "How to Succeed with Your Shopify Store",
      time: "01:46 PM",
      fullDate: "Dec 10, 2026, 01:46 PM",
      isStarred: false,
      isRead: false,
      avatar: "https://i.pravatar.cc/150?u=tommy",
      labels: [
        { color: "bg-rose-500", name: "Private", pill: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400" },
      ],
      body: "Hello,\n\nI hope you are doing well.\n\nHere are some top tips to succeed with your new store. Let me know if you want to schedule a call.",
      attachments: [],
      folder: "inbox",
    },
    {
      id: 2,
      sender: "Tressa Gass",
      email: "tressag@mail.com",
      subject: "Please find attached the latest Company Report",
      time: "01:55 PM",
      fullDate: "Dec 10, 2026, 01:55 PM",
      isStarred: true,
      isRead: true,
      avatar: "https://i.pravatar.cc/150?u=tressa",
      labels: [
        { color: "bg-indigo-500", name: "Company", pill: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400" },
      ],
      body: "Hello John,\n\nI hope you are doing well.\n\nI am sending over a company report for company. It is a PDF file.\n\nPlease let me know if you want to schedule a call or any other questions.\n\nRegards\nTressa Gass",
      attachments: [
        { name: "Q3-Financial-Report.pdf", type: "pdf", size: "2.4 MB" },
      ],
      folder: "inbox",
    },
    {
      id: 3,
      sender: "Louetta Esses",
      email: "louetta@mail.com",
      subject: "Update Can Change Your Personal Life",
      time: "03:04 PM",
      fullDate: "Dec 10, 2026, 03:04 PM",
      isStarred: false,
      isRead: false,
      initials: "LE",
      color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
      labels: [
        { color: "bg-amber-500", name: "Important", pill: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" },
      ],
      body: "Hi there,\n\nDon't miss out on this life-changing update. Check the link below.",
      attachments: [],
      folder: "inbox",
    },
  ] as any;

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col sm:flex-row gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex-wrap">
        
        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Style Variant</label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {(["default", "minimal", "glass"] as EmailVariant[]).map((v) => (
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
                onClick={() => setColor(c.id as EmailColor)}
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
        name="EmailApp"
        tsCode={generateCode(true)}
        jsCode={generateCode(false)}
      >
        <div className={`w-full transition-all duration-500 ${variant === 'glass' ? "p-4 sm:p-8 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl" : ""}`}>
          {/* Key forces re-render if needed to cleanly swap base classes */}
          <EmailApp 
            key={`${variant}-${color}`}
            variant={variant}
            color={color}
            initialEmails={sampleEmails}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}