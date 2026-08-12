"use client";

import { Accordion } from "@/components/custom/blocks/Accordion";

const sampleData = [
  {
    value: "getting-started",
    title: "How do I get started?",
    icon: "HelpCircle",
    content: [
      "Getting started is easy! Simply sign up for an account.",
      "We'll guide you through setting up your profile.",
    ],
  },
  {
    value: "pricing",
    title: "What are your pricing plans?",
    icon: "CreditCard",
    content: [
      "We offer flexible pricing plans.",
      "Basic plan starts at $9/month.",
    ],
  },
  {
    value: "security",
    title: "How secure is my data?",
    icon: "Shield",
    content: [
      "Security is our top priority.",
      "Your information is stored in secure data centers.",
    ],
  },
];

type Variant = "default" | "bordered" | "filled" | "ghost" | "elevated";

export default function AccordionDemo({
  variant = "bordered",
  interaction = "single",
  expandIcon,
  showAll,
}: {
  variant?: Variant;
  interaction?: "single" | "single-mandatory" | "multiple";
  /** Lucide name from the block's ICON_MAP, e.g. "Plus". */
  expandIcon?: string;
  /** Render-all mode: one short accordion per visual variant. */
  showAll?: "variants";
}) {
  const accordionType = interaction === "multiple" ? "multiple" : "single";
  const isCollapsible = interaction !== "single-mandatory";

  if (showAll === "variants") {
    const variants: Variant[] = [
      "default",
      "bordered",
      "filled",
      "ghost",
      "elevated",
    ];

    return (
      <div className="w-full max-w-2xl mx-auto p-4 md:p-8 bg-transparent flex flex-col gap-6">
        {variants.map((v) => (
          <Accordion
            key={v}
            variant={v}
            type="single"
            collapsible
            defaultValue={v}
            accordionData={[
              {
                value: v,
                title: `variant="${v}"`,
                icon: "FileText",
                content: [`The “${v}” accordion styling.`],
              },
            ]}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8 bg-transparent">
      <Accordion
        key={`${variant}-${interaction}-${expandIcon ?? "chevron"}`}
        accordionData={sampleData}
        type={accordionType}
        collapsible={isCollapsible}
        variant={variant}
        expandIcon={expandIcon}
        defaultValue={
          accordionType === "single" ? "getting-started" : ["getting-started"]
        }
      />
    </div>
  );
}
