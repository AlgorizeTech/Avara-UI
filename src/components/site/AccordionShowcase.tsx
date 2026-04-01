"use client";

import { Accordion } from "@/components/custom/blocks/Accordion";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

type AccordionVariant =
  | "default"
  | "bordered"
  | "filled"
  | "ghost"
  | "elevated";
type InteractionType = "single" | "single-mandatory" | "multiple";

const sampleData = [
  {
    value: "getting-started",
    title: "How do I get started?",
    icon: "HelpCircle",
    content: [
      "Getting started is easy! Simply sign up for an account and follow our step-by-step onboarding process.",
      "We'll guide you through setting up your profile, connecting your tools, and creating your first project.",
    ],
  },
  {
    value: "pricing",
    title: "What are your pricing plans?",
    icon: "CreditCard",
    content: [
      "We offer flexible pricing plans to suit different needs and budgets.",
      "Our basic plan starts at $9/month and includes all essential features.",
    ],
  },
  {
    value: "security",
    title: "How secure is my data?",
    icon: "Shield",
    content: [
      "Security is our top priority. We use enterprise-grade encryption for all data.",
      "Your information is stored in secure, SOC 2 compliant data centers.",
    ],
  },
  {
    value: "collaboration",
    title: "Team Collaboration",
    icon: "Users",
    content: [
      "Work together seamlessly with real-time collaboration features.",
      "Share projects, assign tasks, and track progress with your team members.",
    ],
  },
];

export function AccordionShowcase() {
  const [variant, setVariant] = useState<AccordionVariant>("bordered");
  const [interaction, setInteraction] = useState<InteractionType>("single");

  // Map the interaction state to the actual Radix/Shadcn props
  const accordionType = interaction === "multiple" ? "multiple" : "single";
  const isCollapsible = interaction !== "single-mandatory";

  // Generate dynamic code based on selection
  const generateCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";
    const collapsibleProp =
      interaction === "single-mandatory" ? `\n        collapsible={false}` : "";
    const defaultVal =
      interaction === "multiple" ? `["getting-started"]` : `"getting-started"`;

    return `"use client";

import { Accordion } from "@/components/custom/blocks/Accordion";

export default function AccordionDemo()${typeDef} {
  const faqData = [
    {
      value: "getting-started",
      title: "How do I get started?",
      icon: "HelpCircle", 
      content: ["Getting started is easy! Simply sign up for an account.", "We'll guide you through setting up your profile."],
    },
    {
      value: "pricing",
      title: "What are your pricing plans?",
      icon: "CreditCard",
      content: ["We offer flexible pricing plans.", "Basic plan starts at $9/month."],
    },
    {
      value: "security",
      title: "How secure is my data?",
      icon: "Shield",
      content: ["Security is our top priority.", "Your information is stored in secure data centers."],
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Accordion
        accordionData={faqData}
        type="${accordionType}"${collapsibleProp}
        variant="${variant}"
        defaultValue={${defaultVal}}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Style Variant
          </label>
          <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
            {(
              [
                "default",
                "bordered",
                "filled",
                "elevated",
                "ghost",
              ] as AccordionVariant[]
            ).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md capitalize transition-all ${
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

        {/* Interaction Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Interaction Type
          </label>
          <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full xl:w-max border border-zinc-200 dark:border-white/5">
            {[
              { id: "single", label: "Single (Standard)" },
              { id: "single-mandatory", label: "Mandatory (Always One Open)" },
              { id: "multiple", label: "Multiple (Independent)" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setInteraction(t.id as InteractionType)}
                className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  interaction === t.id
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- WRAPPER WITH DYNAMIC CODE --- */}
      <ComponentPreview
        name="Accordion"
        tsCode={generateCode(true)}
        jsCode={generateCode(false)}
      >
        <div className="w-full max-w-2xl mx-auto p-4 md:p-8 bg-transparent">
          {/* Key forces re-render when type changes so Radix UI resets its internal state properly */}
          <Accordion
            key={`${variant}-${interaction}`}
            accordionData={sampleData}
            type={accordionType}
            collapsible={isCollapsible}
            variant={variant}
            defaultValue={
              accordionType === "single"
                ? "getting-started"
                : ["getting-started"]
            }
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
