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
      <ShowcaseControlPanel className="flex flex-col gap-2 p-5 rounded-xl">
        <VariantTabs
          label="Scroll Stack Variant"
          variants={["Simple", "Split", "Sticky", "Horizontal"]}
          defaultValue="Simple"
          onValueChange={(v) => setVariant(v as Variant)}
        />
      </ShowcaseControlPanel>

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
