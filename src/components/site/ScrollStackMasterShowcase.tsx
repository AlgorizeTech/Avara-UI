"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import React, { useState, useEffect } from "react";
import { ScrollStackShowcase } from "./ScrollStackShowcase";
import { SplitScrollStackShowcase } from "./SplitScrollStackShowcase";
import { StickyScrollStackShowcase } from "./StickyScrollStackShowcase";
import { HorizontalScrollStackShowcase } from "./HorizontalScrollStackShowcase";

type Variant = "Simple" | "Split" | "Sticky" | "Horizontal";

export function ScrollStackMasterShowcase() {
  const [variant, setVariant] = useState<Variant>("Simple");

  useEffect(() => {
    document.body.setAttribute("data-scroll-stack", variant);
    return () => {
      document.body.removeAttribute("data-scroll-stack");
    };
  }, [variant]);

  return (
    <div className="w-full flex flex-col gap-6 not-prose mt-8">
      {/* --- MASTER CONTROL PANEL --- */}
      {/* <ShowcaseControlPanel className="flex flex-col gap-2 p-5 rounded-xl">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Scroll Stack Variant
        </label>
        <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5 flex-wrap gap-1">
          {(["Simple", "Split", "Sticky", "Horizontal"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className={`flex-1 md:flex-none px-6 py-2 text-[15px] font-medium rounded-md transition-all cursor-pointer ${
                variant === v
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </ShowcaseControlPanel> */}

      {/* --- SELECTED SHOWCASE --- */}
      <div className="w-full transition-opacity duration-300">
        {variant === "Simple" && <ScrollStackShowcase />}
        {variant === "Split" && <SplitScrollStackShowcase />}
        {variant === "Sticky" && <StickyScrollStackShowcase />}
        {variant === "Horizontal" && <HorizontalScrollStackShowcase />}
      </div>
    </div>
  );
}
