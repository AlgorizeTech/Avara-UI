import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadCNAccordion,
} from "@/components/custom/ui/accordion"; // Adjust path to your shadcn accordion if needed
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  Code,
  CreditCard,
  FileText,
  HelpCircle,
  Plus,
  Shield,
  Smartphone,
  Users,
} from "lucide-react";
import React from "react";

// Icon Map for MDX/String compatibility
const ICON_MAP: Record<string, React.ElementType> = {
  HelpCircle,
  Shield,
  Users,
  CreditCard,
  FileText,
  Smartphone,
  Code,
  Plus,
  ArrowDown,
};

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
  type = "single",
  collapsible = true,
  defaultValue = null,
  accordionData = [],
  variant = "default",
  className = "",
  itemClassName = "",
  triggerClassName = "",
  contentClassName = "",
  expandIcon = null,
  expandIconClassName,
}: CustomAccordionProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "bordered":
        return {
          container: "space-y-3",
          item: "border border-zinc-200 dark:border-zinc-800/80 rounded-xl overflow-hidden bg-white dark:bg-zinc-900/60 shadow-sm data-[state=open]:border-zinc-300 dark:data-[state=open]:border-zinc-700 transition-colors duration-200",
          trigger:
            "px-5 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 text-left font-semibold",
          content: "px-5 pb-5 pt-1 text-zinc-600 dark:text-zinc-400",
        };
      case "filled":
        return {
          container: "space-y-2",
          item: "bg-zinc-100/80 dark:bg-zinc-900/50 rounded-xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/40 data-[state=open]:bg-zinc-200/70 dark:data-[state=open]:bg-zinc-800/80 data-[state=open]:border-zinc-300 dark:data-[state=open]:border-zinc-700/60 transition-colors duration-200",
          trigger: "px-5 py-4 text-left font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
          content: "px-5 pb-5 pt-1 text-zinc-600 dark:text-zinc-400",
        };
      case "elevated":
        return {
          container: "space-y-4",
          item: "bg-white dark:bg-zinc-900/90 rounded-xl overflow-hidden shadow-md hover:shadow-lg dark:shadow-xl dark:shadow-black/40 border border-zinc-200/60 dark:border-zinc-800/80 transition-all duration-300 hover:-translate-y-0.5",
          trigger:
            "px-6 py-5 text-left font-bold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors",
          content:
            "px-6 pb-6 pt-0 text-zinc-600 dark:text-zinc-400 leading-relaxed",
        };
      case "ghost":
        return {
          container: "space-y-1",
          item: "rounded-lg overflow-hidden border border-transparent dark:data-[state=open]:bg-zinc-900/40 transition-colors",
          trigger:
            "px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 text-left font-semibold rounded-lg",
          content: "px-4 pb-4 pt-1 text-zinc-600 dark:text-zinc-400",
        };
      default:
        return {
          container:
            "space-y-0 border border-zinc-200 dark:border-zinc-800/80 rounded-xl bg-white dark:bg-zinc-900/80 overflow-hidden shadow-sm",
          item: "border-b border-zinc-200 dark:border-zinc-800/80 last:border-0 data-[state=open]:bg-zinc-50/50 dark:data-[state=open]:bg-zinc-900/40 transition-colors",
          trigger:
            "px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 text-left font-semibold",
          content: "px-6 pb-5 pt-1 text-zinc-600 dark:text-zinc-400",
        };
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

  const ResolvedExpandIcon =
    typeof expandIcon === "string" ? ICON_MAP[expandIcon] : null;

  return (
    <ShadCNAccordion
      type={type}
      {...(type === "single" ? { collapsible } : {})}
      className={cn("w-full", styles.container, className)}
      defaultValue={getDefaultValue() as any}
    >
      {accordionData.map((item) => {
        const ItemIcon =
          typeof item.icon === "string" ? ICON_MAP[item.icon] : null;
        return (
          <AccordionItem
            key={item.value}
            value={item.value}
            className={cn(styles.item, itemClassName)}
          >
            <AccordionTrigger
              expandIcon={
                ResolvedExpandIcon ? (
                  <ResolvedExpandIcon className="w-4 h-4" />
                ) : (
                  expandIcon
                )
              }
              expandIconClassName={expandIconClassName}
              className={cn(
                "group [&[data-state=open]>div>span:last-child]:text-foreground dark:[&[data-state=open]>div>span:last-child]:text-foreground outline-none",
                styles.trigger,
                triggerClassName,
              )}
            >
              <div className="flex items-center gap-3 w-full">
                {item.icon && (
                  <span className="flex-shrink-0 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-200">
                    {ItemIcon ? (
                      <ItemIcon className="w-4 h-4" />
                    ) : (
                      (item.icon as React.ReactNode)
                    )}
                  </span>
                )}
                <span className="text-left transition-colors duration-200">
                  {item.title}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={cn("text-sm", styles.content, contentClassName)}
            >
              <div className="space-y-3">
                {Array.isArray(item.content) ? (
                  item.content.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <div>{item.content}</div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </ShadCNAccordion>
  );
}
