"use client";

import {
  PricingBuilder,
  PricingCards,
  PricingColor,
  PricingData,
  PricingSlider,
  PricingTable,
  PricingTableData,
  PricingVariant,
} from "@/components/custom/blocks/Pricing";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

type LayoutType = "cards" | "builder" | "table" | "slider";

export function PricingShowcase() {
  const [layout, setLayout] = useState<LayoutType>("cards");
  const [variant, setVariant] = useState<PricingVariant>("default");
  const [color, setColor] = useState<PricingColor>("indigo");

  const sampleCardsData: PricingData = {
    tabs: [
      {
        id: "monthly",
        label: "Monthly",
        plans: [
          {
            id: "startup",
            title: "Startup",
            subtitle: "Perfect for small teams.",
            price: "$29",
            period: "mo",
            buttonText: "Get Started",
            popular: false,
            icon: "Rocket",
            features: [
              "10 projects",
              "Up to 2,000 subscribers",
              "Basic analytics",
              "24-hour support",
            ],
          },
          {
            id: "pro",
            title: "Pro",
            subtitle: "For scaling businesses.",
            price: "$59",
            period: "mo",
            buttonText: "Upgrade to Pro",
            popular: true,
            icon: "Zap",
            features: [
              "25 projects",
              "Up to 10,000 subscribers",
              "Custom reporting",
              "1-hour support",
            ],
          },
          {
            id: "enterprise",
            title: "Enterprise",
            subtitle: "For larger organizations.",
            price: "$99",
            period: "mo",
            buttonText: "Contact Sales",
            popular: false,
            icon: "Building",
            features: [
              "Unlimited projects",
              "Unlimited subscribers",
              "Dedicated manager",
              "24/7 support",
            ],
          },
        ],
      },
      {
        id: "annually",
        label: "Annually (Save 20%)",
        plans: [
          {
            id: "startup-annual",
            title: "Startup",
            subtitle: "Perfect for small teams.",
            price: "$279",
            period: "yr",
            buttonText: "Get Started",
            popular: false,
            icon: "Rocket",
            features: [
              "10 projects",
              "Up to 2,000 subscribers",
              "Basic analytics",
              "24-hour support",
            ],
          },
          {
            id: "pro-annual",
            title: "Pro",
            subtitle: "For scaling businesses.",
            price: "$569",
            period: "yr",
            buttonText: "Upgrade to Pro",
            popular: true,
            icon: "Zap",
            features: [
              "25 projects",
              "Up to 10,000 subscribers",
              "Custom reporting",
              "1-hour support",
            ],
          },
          {
            id: "enterprise-annual",
            title: "Enterprise",
            subtitle: "For larger organizations.",
            price: "$949",
            period: "yr",
            buttonText: "Contact Sales",
            popular: false,
            icon: "Building",
            features: [
              "Unlimited projects",
              "Unlimited subscribers",
              "Dedicated manager",
              "24/7 support",
            ],
          },
        ],
      },
    ],
  };

  const sampleTableData: PricingTableData = {
    plans: [
      { id: "basic", title: "Basic", price: "$19", buttonText: "Get Started" },
      {
        id: "pro",
        title: "Pro",
        price: "$49",
        buttonText: "Upgrade to Pro",
        featured: true,
      },
      {
        id: "ent",
        title: "Enterprise",
        price: "$99",
        buttonText: "Contact Sales",
      },
    ],
    sections: [
      {
        title: "Core Features",
        features: [
          { name: "Projects", values: ["5", "25", "Unlimited"] },
          { name: "Users", values: ["1", "5", "Unlimited"] },
          {
            name: "Storage",
            helpText: "Total storage across all projects",
            values: ["10GB", "100GB", "1TB"],
          },
        ],
      },
      {
        title: "Advanced",
        features: [
          { name: "Custom Domains", values: [false, true, true] },
          { name: "Analytics API", values: [false, false, true] },
          { name: "Priority Support", values: [false, "Email", "24/7 Phone"] },
        ],
      },
    ],
  };

  const generateCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";

    let componentToImport = "PricingCards";
    if (layout === "builder") componentToImport = "PricingBuilder";
    if (layout === "table") componentToImport = "PricingTable";
    if (layout === "slider") componentToImport = "PricingSlider";

    const importStatement = `import { ${componentToImport}${isTs && layout === "cards" ? ", PricingData" : ""}${isTs && layout === "table" ? ", PricingTableData" : ""} } from "@/components/custom/blocks/Pricing";`;

    if (layout === "builder" || layout === "slider") {
      return `"use client";\n\n${importStatement}\n\nexport default function PricingDemo()${typeDef} {\n  return (\n    <div className="w-full py-12">\n      <${componentToImport} color="${color}" />\n    </div>\n  );\n}`;
    }

    if (layout === "table") {
      return `"use client";\n\n${importStatement}\n\nexport default function PricingDemo()${typeDef} {\n  const data${isTs ? ": PricingTableData" : ""} = {\n    // Paste the sampleTableData structure here\n  };\n\n  return (\n    <div className="w-full py-12">\n      <PricingTable data={data} color="${color}" />\n    </div>\n  );\n}`;
    }

    return `"use client";\n\n${importStatement}\n\nexport default function PricingDemo()${typeDef} {\n  const data${isTs ? ": PricingData" : ""} = {\n    // Paste the sampleCardsData structure here\n  };\n\n  return (\n    <div className="w-full py-12">\n      <PricingCards data={data} variant="${variant}" color="${color}" />\n    </div>\n  );\n}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        {/* Component Type & Color */}
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Component Type
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {[
                { id: "cards", label: "Tiered Cards" },
                { id: "builder", label: "GSAP Builder" },
                { id: "table", label: "Comparison Table" },
                { id: "slider", label: "Usage Slider" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setLayout(t.id as LayoutType)}
                  className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    layout === t.id
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Theme Color
            </label>
            <div className="flex items-center gap-2 h-10 px-2">
              {[
                { id: "indigo", bg: "bg-indigo-500" },
                { id: "rose", bg: "bg-rose-500" },
                { id: "emerald", bg: "bg-emerald-500" },
                { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id as PricingColor)}
                  className={`w-7 h-7 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
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

        {/* Variant Selector (Only for Cards) */}
        {layout === "cards" && (
          <div className="flex flex-col gap-2 animate-in fade-in duration-300">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Card Variant
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full xl:w-max border border-zinc-200 dark:border-white/5">
              {(
                [
                  "default",
                  "premium",
                  "elegant",
                  "minimal",
                  "bordered",
                ] as PricingVariant[]
              ).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`flex-1 xl:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
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
        )}
      </div>

      {/* --- WRAPPER WITH DYNAMIC CODE --- */}
      <ComponentPreview
        name="Pricing"
        tsCode={generateCode(true)}
        jsCode={generateCode(false)}
      >
        <div className="w-full py-12 md:py-24 bg-zinc-50/50 dark:bg-transparent transition-colors duration-300">
          {layout === "cards" && (
            <PricingCards
              key={`cards-${variant}-${color}`}
              variant={variant}
              color={color}
              data={sampleCardsData}
            />
          )}
          {layout === "builder" && (
            <PricingBuilder key={`builder-${color}`} color={color} />
          )}
          {layout === "table" && (
            <PricingTable
              key={`table-${color}`}
              color={color}
              data={sampleTableData}
            />
          )}
          {layout === "slider" && (
            <PricingSlider key={`slider-${color}`} color={color} />
          )}
        </div>
      </ComponentPreview>
    </div>
  );
}
