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
  variant?: "default" | "bordered" | "filled" | "ghost" | "elevated" | "card-filled";
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
          item: "border border-zinc-200 dark:border-zinc-800/80 rounded-xl overflow-hidden bg-card shadow-sm data-[state=open]:bg-primary/5 data-[state=open]:border-primary/40 transition-colors duration-200",
          trigger:
            "px-5 py-4 hover:bg-primary/5 data-[state=open]:text-primary text-foreground transition-colors duration-200 text-left font-semibold",
          content: "px-5 pb-5 pt-1 text-muted-foreground",
        };
      case "filled":
      case "card-filled":
        return {
          container: "space-y-2.5",
          item: "bg-card border border-border rounded-xl overflow-hidden data-[state=open]:bg-primary/5 data-[state=open]:border-primary/40 transition-colors duration-200",
          trigger: "px-5 py-4 text-left font-semibold text-foreground data-[state=open]:text-primary hover:bg-primary/5 transition-colors",
          content: "px-5 pb-5 pt-1 text-muted-foreground",
        };
      case "elevated":
      case "ghost":
        return {
          container: "space-y-3",
          item: "bg-card rounded-xl overflow-hidden border border-border/60 data-[state=open]:bg-primary/5 data-[state=open]:border-primary/40 transition-colors duration-200",
          trigger:
            "px-5 py-4 text-left font-semibold text-foreground data-[state=open]:text-primary hover:bg-primary/5 transition-colors",
          content:
            "px-5 pb-5 pt-1 text-muted-foreground leading-relaxed",
        };
      default:
        return {
          container:
            "space-y-0 border border-border rounded-xl bg-card overflow-hidden shadow-sm",
          item: "border-b border-border last:border-b-0 data-[state=open]:border data-[state=open]:border-primary/40 data-[state=open]:bg-primary/5 transition-colors",
          trigger:
            "px-6 py-4 hover:bg-primary/5 data-[state=open]:text-primary text-foreground transition-colors duration-200 text-left font-semibold",
          content: "px-6 pb-5 pt-1 text-muted-foreground",
        };
    }
  };

  const styles = getVariantStyles();

  /** Radix wants an array here when `type` is "multiple". */
  const multipleDefault = Array.isArray(defaultValue)
    ? defaultValue
    : defaultValue
      ? [defaultValue]
      : [];
  /** ...and a single string otherwise. */
  const singleDefault = Array.isArray(defaultValue)
    ? defaultValue[0]
    : (defaultValue ?? undefined);

  const ResolvedExpandIcon =
    typeof expandIcon === "string" ? ICON_MAP[expandIcon] : null;

  const shellClassName = cn("w-full", styles.container, className);

  const items = accordionData.map((item) => {
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
                  <span className="flex-shrink-0 text-muted-foreground group-hover:text-primary group-[[data-state=open]]:text-primary transition-colors duration-200">
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
  });

  const [multipleValue, setMultipleValue] = React.useState<string[]>(multipleDefault);

  if (type === "single" && collapsible) {
    return (
      <ShadCNAccordion
        type="single"
        collapsible={true}
        className={shellClassName}
        defaultValue={singleDefault}
      >
        {items}
      </ShadCNAccordion>
    );
  }

  if (type === "single" && !collapsible) {
    return (
      <ShadCNAccordion
        type="single"
        collapsible={false}
        className={shellClassName}
        defaultValue={singleDefault}
      >
        {items}
      </ShadCNAccordion>
    );
  }

  if (type === "multiple" && !collapsible) {
    return (
      <ShadCNAccordion
        type="multiple"
        className={shellClassName}
        value={multipleValue}
        onValueChange={(newVal) => {
          // Never allow removing items that were previously opened
          const merged = Array.from(new Set([...multipleValue, ...newVal]));
          setMultipleValue(merged);
        }}
      >
        {items}
      </ShadCNAccordion>
    );
  }

  return (
    <ShadCNAccordion
      type="multiple"
      className={shellClassName}
      defaultValue={multipleDefault}
    >
      {items}
    </ShadCNAccordion>
  );
}
