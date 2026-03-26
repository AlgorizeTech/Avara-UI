import { Accordion as ShadCNAccordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/custom/ui/accordion"
import { cn } from "@/lib/utils"

export type AccordionDataItem = {
  value: string;
  title: string;
  icon?: React.ReactNode;
  content: string[] | React.ReactNode;
};

export type CustomAccordionProps = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[] | null;
  accordionData?: AccordionDataItem[];
  variant?: "default" | "bordered" | "filled" | "ghost";
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  expandIcon?: React.ReactNode;
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
  expandIconClassName
}: CustomAccordionProps) {
  
  const getVariantStyles = () => {
    switch (variant) {
      case "bordered":
        return {
          container: "border border-border dark:border-border rounded-lg overflow-hidden bg-card dark:bg-card shadow-sm",
          item: "border-b border-border dark:border-border last:border-b-0",
          trigger: "px-6 py-4 hover:bg-muted/50 dark:hover:bg-muted/50 transition-colors duration-200 text-left font-medium",
          content: "px-6 pb-4 pt-0 text-muted-foreground dark:text-muted-foreground",
        }
      case "filled":
        return {
          container: "space-y-2",
          item: "bg-muted/30 dark:bg-muted/30 rounded-lg overflow-hidden border border-transparent hover:border-border dark:hover:border-border transition-all duration-200",
          trigger: "px-6 py-4 hover:bg-muted/50 dark:hover:bg-muted/50 transition-colors duration-200 text-left font-medium",
          content: "px-6 pb-4 pt-0 text-muted-foreground dark:text-muted-foreground",
        }
      case "ghost":
        return {
          container: "space-y-1",
          item: "rounded-lg hover:bg-muted/30 dark:hover:bg-muted/30 transition-colors duration-200",
          trigger: "px-4 py-3 hover:bg-muted/50 dark:hover:bg-muted/50 transition-colors duration-200 text-left font-medium rounded-lg",
          content: "px-4 pb-3 pt-0 text-muted-foreground dark:text-muted-foreground",
        }
      default:
        return {
          container: "space-y-2",
          item: "border-b border-border/50 dark:border-border/50 last:border-b-0 pb-2 last:pb-0",
          trigger: "p-4 hover:text-foreground dark:hover:text-foreground transition-colors duration-200 text-left font-medium text-muted-foreground dark:text-muted-foreground",
          content: "px-4 pb-4 pt-2 text-muted-foreground dark:text-muted-foreground",
        }
    }
  }

  const styles = getVariantStyles()

  const getDefaultValue = () => {
    if (type === "multiple") {
      if (Array.isArray(defaultValue)) return defaultValue;
      if (defaultValue) return [defaultValue];
      return [];
    }
    return defaultValue;
  };

  return (
    <ShadCNAccordion
      type={type}
      {...(type === "single" ? { collapsible } : {})}
      className={cn("w-full", styles.container, className)}
      defaultValue={getDefaultValue() as any}
    >
      {accordionData.map((item) => (
        <AccordionItem key={item.value} value={item.value} className={cn(styles.item, itemClassName)}>
          <AccordionTrigger
            // Note: Requires customizing your base shadcn AccordionTrigger to accept these props
            expandIcon={expandIcon}
            expandIconClassName={expandIconClassName}
            className={cn(
              "group [&[data-state=open]>div>span:last-child]:text-foreground dark:[&[data-state=open]>div>span:last-child]:text-foreground",
              styles.trigger,
              triggerClassName,
            )}
          >
            <div className="flex items-center gap-3 w-full">
              {item.icon && (
                <span className="flex-shrink-0 text-muted-foreground dark:text-muted-foreground group-hover:text-foreground dark:group-hover:text-foreground transition-colors duration-200">
                  {item.icon}
                </span>
              )}
              <span className="text-left transition-colors duration-200">{item.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className={cn("text-sm leading-relaxed", styles.content, contentClassName)}>
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
      ))}
    </ShadCNAccordion>
  )
}