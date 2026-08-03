"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import { Accordion } from "@/components/custom/blocks/Accordion";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const ACCORDION_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { AccordionContent, AccordionItem, AccordionTrigger, Accordion as ShadCNAccordion } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { ArrowDown, Code, CreditCard, FileText, HelpCircle, Plus, Shield, Smartphone, Users } from "lucide-react";
import React from "react";

const ICON_MAP: Record<string, React.ElementType> = { HelpCircle, Shield, Users, CreditCard, FileText, Smartphone, Code, Plus, ArrowDown };

export type AccordionDataItem = {
  value: string;
  title: string;
  icon?: React.ReactNode | string;
  content: string[] | React.ReactNode;
};

export type CustomAccordionProps = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[] | null;
  accordionData?: AccordionDataItem[];
  variant?: "default" | "bordered" | "filled" | "ghost" | "elevated";
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  expandIcon?: React.ReactNode | string;
  expandIconClassName?: string;
};

export function Accordion({
  type = "single", collapsible = true, defaultValue = null, accordionData = [], variant = "default", className = "", itemClassName = "", triggerClassName = "", contentClassName = "", expandIcon = null, expandIconClassName,
}: CustomAccordionProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "bordered": return { container: "space-y-3", item: "border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950/50 shadow-sm", trigger: "px-5 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors duration-200 text-left font-semibold", content: "px-5 pb-5 pt-1 text-zinc-600 dark:text-zinc-400" };
      case "filled": return { container: "space-y-2", item: "bg-zinc-100/80 dark:bg-zinc-900/80 rounded-xl overflow-hidden border border-transparent data-[state=open]:bg-zinc-200 dark:data-[state=open]:bg-zinc-800 transition-colors duration-200", trigger: "px-5 py-4 text-left font-semibold", content: "px-5 pb-5 pt-1 text-zinc-600 dark:text-zinc-400" };
      case "elevated": return { container: "space-y-4", item: "bg-white dark:bg-zinc-950 rounded-xl overflow-hidden shadow-md hover:shadow-lg dark:shadow-xl dark:shadow-black/50 border border-zinc-100 dark:border-zinc-800/60 transition-all duration-300 hover:-translate-y-0.5", trigger: "px-6 py-5 text-left font-bold text-zinc-900 dark:text-zinc-100", content: "px-6 pb-6 pt-0 text-zinc-600 dark:text-zinc-400 leading-relaxed" };
      case "ghost": return { container: "space-y-1", item: "rounded-lg overflow-hidden", trigger: "px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors duration-200 text-left font-semibold rounded-lg", content: "px-4 pb-4 pt-1 text-zinc-600 dark:text-zinc-400" };
      default: return { container: "space-y-0 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 overflow-hidden", item: "border-b border-zinc-200 dark:border-zinc-800 last:border-0", trigger: "px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors duration-200 text-left font-semibold", content: "px-6 pb-5 pt-1 text-zinc-600 dark:text-zinc-400" };
    }
  };

  const styles = getVariantStyles();

  const getDefaultValue = () => {
    if (type === "multiple") {
      if (Array.isArray(defaultValue)) return defaultValue;
      if (defaultValue) return [defaultValue as string];
      return [];
    }
    return defaultValue;
  };

  const ResolvedExpandIcon = typeof expandIcon === "string" ? ICON_MAP[expandIcon] : null;

  return (
    <ShadCNAccordion type={type} {...(type === "single" ? { collapsible } : {})} className={cn("w-full", styles.container, className)} defaultValue={getDefaultValue() as any}>
      {accordionData.map((item) => {
        const ItemIcon = typeof item.icon === "string" ? ICON_MAP[item.icon] : null;
        return (
          <AccordionItem key={item.value} value={item.value} className={cn(styles.item, itemClassName)}>
            <AccordionTrigger expandIcon={ResolvedExpandIcon ? <ResolvedExpandIcon className="w-4 h-4" /> : expandIcon} expandIconClassName={expandIconClassName} className={cn("group [&[data-state=open]>div>span:last-child]:text-foreground dark:[&[data-state=open]>div>span:last-child]:text-foreground outline-none", styles.trigger, triggerClassName)}>
              <div className="flex items-center gap-3 w-full">
                {item.icon && (
                  <span className="flex-shrink-0 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-200">
                    {ItemIcon ? <ItemIcon className="w-4 h-4" /> : (item.icon as React.ReactNode)}
                  </span>
                )}
                <span className="text-left transition-colors duration-200">{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className={cn("text-sm", styles.content, contentClassName)}>
              <div className="space-y-3">
                {Array.isArray(item.content) ? item.content.map((paragraph, index) => (<p key={index} className="leading-relaxed">{paragraph}</p>)) : <div>{item.content}</div>}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </ShadCNAccordion>
  );
}`;

// --- JAVASCRIPT ENGINE CODE ---
const ACCORDION_ENGINE_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { AccordionContent, AccordionItem, AccordionTrigger, Accordion as ShadCNAccordion } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { ArrowDown, Code, CreditCard, FileText, HelpCircle, Plus, Shield, Smartphone, Users } from "lucide-react";
import React from "react";

const ICON_MAP = { HelpCircle, Shield, Users, CreditCard, FileText, Smartphone, Code, Plus, ArrowDown };

export function Accordion({
  type = "single", collapsible = true, defaultValue = null, accordionData = [], variant = "default", className = "", itemClassName = "", triggerClassName = "", contentClassName = "", expandIcon = null, expandIconClassName,
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case "bordered": return { container: "space-y-3", item: "border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950/50 shadow-sm", trigger: "px-5 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors duration-200 text-left font-semibold", content: "px-5 pb-5 pt-1 text-zinc-600 dark:text-zinc-400" };
      case "filled": return { container: "space-y-2", item: "bg-zinc-100/80 dark:bg-zinc-900/80 rounded-xl overflow-hidden border border-transparent data-[state=open]:bg-zinc-200 dark:data-[state=open]:bg-zinc-800 transition-colors duration-200", trigger: "px-5 py-4 text-left font-semibold", content: "px-5 pb-5 pt-1 text-zinc-600 dark:text-zinc-400" };
      case "elevated": return { container: "space-y-4", item: "bg-white dark:bg-zinc-950 rounded-xl overflow-hidden shadow-md hover:shadow-lg dark:shadow-xl dark:shadow-black/50 border border-zinc-100 dark:border-zinc-800/60 transition-all duration-300 hover:-translate-y-0.5", trigger: "px-6 py-5 text-left font-bold text-zinc-900 dark:text-zinc-100", content: "px-6 pb-6 pt-0 text-zinc-600 dark:text-zinc-400 leading-relaxed" };
      case "ghost": return { container: "space-y-1", item: "rounded-lg overflow-hidden", trigger: "px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors duration-200 text-left font-semibold rounded-lg", content: "px-4 pb-4 pt-1 text-zinc-600 dark:text-zinc-400" };
      default: return { container: "space-y-0 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 overflow-hidden", item: "border-b border-zinc-200 dark:border-zinc-800 last:border-0", trigger: "px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors duration-200 text-left font-semibold", content: "px-6 pb-5 pt-1 text-zinc-600 dark:text-zinc-400" };
    }
  };

  const styles = getVariantStyles();

  const getDefaultValue = () => {
    if (type === "multiple") {
      if (Array.isArray(defaultValue)) return defaultValue;
      if (defaultValue) return [defaultValue];
      return [];
    }
    return defaultValue;
  };

  const ResolvedExpandIcon = typeof expandIcon === "string" ? ICON_MAP[expandIcon] : null;

  return (
    <ShadCNAccordion type={type} {...(type === "single" ? { collapsible } : {})} className={cn("w-full", styles.container, className)} defaultValue={getDefaultValue()}>
      {accordionData.map((item) => {
        const ItemIcon = typeof item.icon === "string" ? ICON_MAP[item.icon] : null;
        return (
          <AccordionItem key={item.value} value={item.value} className={cn(styles.item, itemClassName)}>
            <AccordionTrigger expandIcon={ResolvedExpandIcon ? <ResolvedExpandIcon className="w-4 h-4" /> : expandIcon} expandIconClassName={expandIconClassName} className={cn("group [&[data-state=open]>div>span:last-child]:text-foreground dark:[&[data-state=open]>div>span:last-child]:text-foreground outline-none", styles.trigger, triggerClassName)}>
              <div className="flex items-center gap-3 w-full">
                {item.icon && (
                  <span className="flex-shrink-0 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-200">
                    {ItemIcon ? <ItemIcon className="w-4 h-4" /> : item.icon}
                  </span>
                )}
                <span className="text-left transition-colors duration-200">{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className={cn("text-sm", styles.content, contentClassName)}>
              <div className="space-y-3">
                {Array.isArray(item.content) ? item.content.map((paragraph, index) => (<p key={index} className="leading-relaxed">{paragraph}</p>)) : <div>{item.content}</div>}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </ShadCNAccordion>
  );
}`;

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

export function AccordionShowcase() {
  const [variant, setVariant] = useState<AccordionVariant>("bordered");
  const [interaction, setInteraction] = useState<InteractionType>("single");

  const accordionType = interaction === "multiple" ? "multiple" : "single";
  const isCollapsible = interaction !== "single-mandatory";

  const generateUsageCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";
    const collapsibleProp =
      interaction === "single-mandatory" ? `\n        collapsible={false}` : "";
    const defaultVal =
      interaction === "multiple" ? `["getting-started"]` : `"getting-started"`;

    return `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

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
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
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
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl">
        <VariantTabs
          variants={["default", "bordered", "filled", "elevated", "ghost"]}
          label="Style Variant"
          defaultValue={variant}
          onValueChange={(v) => setVariant(v as AccordionVariant)}
        />

        <VariantTabs
          variants={[
            { value: "single", label: "Single (Standard)" },
            { value: "single-mandatory", label: "Mandatory (Always One Open)" },
            { value: "multiple", label: "Multiple (Independent)" },
          ]}
          label="Interaction Type"
          defaultValue={interaction}
          onValueChange={(v) => setInteraction(v as InteractionType)}
        />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="Accordion"
        tsCode={ACCORDION_ENGINE_CODE_TS}
        jsCode={ACCORDION_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
        sandbox="accordion"
        sandboxProps={{ variant, interaction }}
      >
        <div className="w-full max-w-2xl mx-auto p-4 md:p-8 bg-transparent">
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
