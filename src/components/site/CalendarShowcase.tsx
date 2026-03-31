"use client";

import { useState } from "react";
import { CalendarDashboard, CalendarVariant, CalendarColor } from "@/components/custom/blocks/Calendar";
import { ComponentPreview } from "@/components/site/ComponentPreview";

export function CalendarShowcase() {
  const [variant, setVariant] = useState<CalendarVariant>("default");
  const [color, setColor] = useState<CalendarColor>("indigo");

  // Dynamic code generation based on selected state
  const generateCode = (isTs: boolean) => `"use client";

import { CalendarDashboard } from "@/components/custom/blocks/Calendar";

export default function CalendarDemo()${isTs ? " : React.JSX.Element" : ""} {
  const initialEvents = {
    "2025-8-31": ["pentest", "kickoff", "pentest"],
    "2025-9-2": ["pentest", "kickoff"],
    "2025-9-10": ["pentest", "kickoff"],
  };

  return (
    <div className="w-full h-screen p-4">
      <CalendarDashboard
        mockEvents={initialEvents}
        variant="${variant}"
        color="${color}"
      />
    </div>
  );
}`;

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col sm:flex-row gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        
        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Style Variant</label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {(["default", "minimal", "glass"] as CalendarVariant[]).map((v) => (
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
            {/* Swatches mapped to Tailwind colors */}
            {[
              { id: "indigo", bg: "bg-indigo-500" },
              { id: "rose", bg: "bg-rose-500" },
              { id: "emerald", bg: "bg-emerald-500" },
              { id: "blue", bg: "bg-blue-500" },
              { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id as CalendarColor)}
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
        name="CalendarDashboard"
        tsCode={generateCode(true)}
        jsCode={generateCode(false)}
      >
        <div className={`w-full transition-all duration-500 ${variant === 'glass' ? "p-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl" : ""}`}>
          <CalendarDashboard
            variant={variant}
            color={color}
            mockEvents={{
              "2025-8-31": ["pentest", "kickoff", "pentest"],
              "2025-9-2": ["pentest", "kickoff"],
              "2025-9-10": ["pentest", "kickoff"],
              "2025-9-15": ["pentest", "kickoff"],
              "2025-9-24": ["kickoff", "pentest"],
            }}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}