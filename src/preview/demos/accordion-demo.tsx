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

export default function AccordionDemo({
  variant = "bordered",
  interaction = "single",
}: {
  variant?: "default" | "bordered" | "filled" | "ghost" | "elevated";
  interaction?: "single" | "single-mandatory" | "multiple";
}) {
  const accordionType = interaction === "multiple" ? "multiple" : "single";
  const isCollapsible = interaction !== "single-mandatory";

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8 bg-transparent">
      <Accordion
        key={`${variant}-${interaction}`}
        accordionData={sampleData}
        type={accordionType}
        collapsible={isCollapsible}
        variant={variant}
        defaultValue={
          accordionType === "single" ? "getting-started" : ["getting-started"]
        }
      />
    </div>
  );
}
