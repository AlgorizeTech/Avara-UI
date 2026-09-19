"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as ShadCNAccordion,
} from "@/components/custom/ui/accordion"; // Adjust path to your shadcn accordion if needed
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ChevronDown,
  Code,
  CreditCard,
  FileText,
  HelpCircle,
  Lock,
  MessageCircle,
  Palette,
  Plus,
  RefreshCw,
  Scale,
  Shield,
  Smartphone,
  Sparkles,
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
  ChevronDown,
  Lock,
  MessageCircle,
  Palette,
  RefreshCw,
  Scale,
  Sparkles,
};

export type AccordionDataItem = {
  value: string;
  title: string;
  icon?: React.ReactNode | string;
  content: string[] | React.ReactNode;
};

export type AccordionVariant =
  | "default"
  | "bordered"
  | "filled"
  | "ghost"
  | "elevated"
  /** @deprecated Alias of "filled". */
  | "card-filled";

export type CustomAccordionProps = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[] | null;
  accordionData?: AccordionDataItem[];
  variant?: AccordionVariant;
  /**
   * "stack" starts every item piled on the first one, like a deck of cards,
   * and deals them down into place once the accordion scrolls into view.
   * Skipped automatically when the visitor prefers reduced motion.
   */
  animation?: "none" | "stack";
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  expandIcon?: React.ReactNode | string;
  expandIconClassName?: string;
};

type VariantStyles = {
  list: string;
  item: string;
  trigger: string;
  /** Wrapper around the item's own icon. */
  iconWrap: string;
  title: string;
  /** Wrapper around the expand/collapse icon. */
  expand: string;
  expandIcon: "plus" | "chevron";
  content: string;
  /** Extra content padding when the row carries an icon, so text aligns with the title. */
  contentWithIcon?: string;
  /** Draws a thin line from the icon down the answer. */
  thread?: boolean;
};

const VARIANTS: Record<Exclude<AccordionVariant, "card-filled">, VariantStyles> = {
  // "Lift": closed rows are quiet hairline rows; the open one lifts out as a card.
  default: {
    list: "flex flex-col",
    item: cn(
      "relative rounded-2xl border-b border-border transition-all duration-300 ease-out last:border-b-0",
      "data-[state=open]:my-2 data-[state=open]:border-b-transparent data-[state=open]:bg-card",
      "data-[state=open]:ring-1 data-[state=open]:ring-border",
      "data-[state=open]:shadow-[0_1px_2px_rgb(0_0_0/0.04),0_20px_44px_-20px_rgb(0_0_0/0.22)]",
      "data-[state=open]:first:mt-0 data-[state=open]:last:mb-0 sm:data-[state=open]:-mx-3 sm:data-[state=open]:px-3",
      "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/60",
    ),
    trigger: "items-center gap-4 px-4 py-4",
    iconWrap: cn(
      "flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-all duration-300",
      "group-hover:bg-primary/10 group-hover:text-primary",
      "group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground group-data-[state=open]:shadow-lg group-data-[state=open]:shadow-primary/30",
    ),
    title: "text-[15px] font-medium tracking-[-0.01em] text-foreground",
    expand: cn(
      "flex size-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300",
      "group-hover:border-foreground/30 group-hover:text-foreground",
      "group-data-[state=open]:rotate-45 group-data-[state=open]:border-foreground/30 group-data-[state=open]:text-foreground",
    ),
    expandIcon: "plus",
    content: "relative px-4 pb-5 pr-12 text-muted-foreground",
    contentWithIcon: "pl-[4.5rem]",
    thread: true,
  },

  // "Rail": one outlined panel; a primary rail grows down the open row.
  bordered: {
    list: "divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card",
    item: cn(
      "relative transition-colors duration-300",
      "before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:origin-top before:scale-y-0 before:bg-primary before:transition-transform before:duration-300 before:ease-out",
      "data-[state=open]:bg-primary/[0.04] data-[state=open]:before:scale-y-100 dark:data-[state=open]:bg-primary/[0.08]",
      "has-[:focus-visible]:bg-muted/60",
    ),
    trigger: "items-center gap-3.5 px-5 py-4",
    iconWrap:
      "flex shrink-0 items-center justify-center text-muted-foreground transition-colors duration-300 group-hover:text-primary group-data-[state=open]:text-primary",
    title: "text-[15px] font-medium text-foreground",
    expand:
      "flex shrink-0 items-center justify-center text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary",
    expandIcon: "chevron",
    content: "px-5 pb-5 pr-12 text-muted-foreground",
    contentWithIcon: "pl-[3.25rem]",
  },

  // "Inverted": muted blocks; the open one flips entirely to the accent.
  filled: {
    list: "flex flex-col gap-2",
    item: cn(
      "rounded-2xl bg-muted/70 transition-colors duration-300",
      "data-[state=open]:bg-primary data-[state=open]:text-primary-foreground",
      "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/60 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background",
    ),
    trigger: "items-center gap-4 px-5 py-4",
    iconWrap: cn(
      "flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-foreground transition-colors duration-300",
      "group-data-[state=open]:bg-primary-foreground/15 group-data-[state=open]:text-primary-foreground",
    ),
    title:
      "text-[15px] font-medium text-foreground transition-colors duration-300 group-data-[state=open]:text-primary-foreground",
    expand: cn(
      "flex shrink-0 items-center justify-center text-muted-foreground transition-all duration-300",
      "group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary-foreground",
    ),
    expandIcon: "chevron",
    content: "px-5 pb-5 pr-12 text-primary-foreground/85",
    contentWithIcon: "pl-[4.25rem]",
  },

  // "Cards": separated cards; the open one rises on a primary ring.
  elevated: {
    list: "flex flex-col gap-3",
    item: cn(
      "rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-all duration-300 ease-out",
      "data-[state=open]:-translate-y-0.5 data-[state=open]:border-transparent data-[state=open]:ring-2 data-[state=open]:ring-primary/40 data-[state=open]:ring-offset-2 data-[state=open]:ring-offset-background",
      "data-[state=open]:shadow-[0_24px_48px_-24px_rgb(0_0_0/0.28)]",
      "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/60",
    ),
    trigger: "items-center gap-4 px-5 py-4",
    iconWrap: cn(
      "flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors duration-300",
      "group-hover:text-foreground group-data-[state=open]:bg-primary/12 group-data-[state=open]:text-primary",
    ),
    title: "text-[15px] font-medium text-foreground",
    expand:
      "flex shrink-0 items-center justify-center text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180",
    expandIcon: "chevron",
    content: "px-5 pb-5 pr-12 text-muted-foreground",
    contentWithIcon: "pl-[4.25rem]",
  },

  // "Editorial": nothing but type and hairlines.
  ghost: {
    list: "divide-y divide-border",
    item: "has-[:focus-visible]:bg-muted/40",
    trigger: "items-center gap-4 py-5",
    iconWrap:
      "flex shrink-0 items-center justify-center text-muted-foreground transition-colors duration-300 group-data-[state=open]:text-primary",
    title:
      "text-lg font-medium tracking-tight text-foreground transition-[transform,color] duration-300 group-hover:translate-x-1 group-data-[state=open]:text-primary",
    expand:
      "flex shrink-0 items-center justify-center text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-45",
    expandIcon: "plus",
    content: "max-w-prose pb-6 pr-10 text-[15px] leading-relaxed text-muted-foreground",
    contentWithIcon: "pl-8",
  },
};

/** Vertical gap, in px, each deeper card peeks out below the one above it while stacked. */
const STACK_PEEK = 7;
/** How much smaller each deeper card is while stacked. */
const STACK_SHRINK = 0.035;

/**
 * Piles the items on top of the first one, then deals them into place with a
 * stagger once the list is in view. Web Animations API, set up in a layout
 * effect: the very first paint already shows the stacked deck, so nothing
 * flashes. `setStacking(false)` fires when the last card lands so the items can
 * drop the opaque background they need while overlapping.
 */
function useStackEntrance(
  listRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean,
  setStacking: (value: boolean) => void,
) {
  React.useLayoutEffect(() => {
    if (!enabled) return;
    const list = listRef.current;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!list || reduceMotion || typeof list.animate !== "function") {
      setStacking(false);
      return;
    }

    const nodes = Array.from(
      list.querySelectorAll<HTMLElement>(":scope > [data-stack-item]"),
    );
    if (nodes.length < 2) {
      setStacking(false);
      return;
    }

    // Re-assert on every run: a strict-mode replay (or a later re-mount) has
    // already been through the cleanup below, which switched it off.
    setStacking(true);

    const baseTop = nodes[0].offsetTop;
    const animations = nodes.map((node, i) => {
      const startY = baseTop - node.offsetTop + i * STACK_PEEK;
      const startScale = Math.max(1 - i * STACK_SHRINK, 0.7);
      node.style.zIndex = String(nodes.length - i);
      node.style.transformOrigin = "top center";
      const animation = node.animate(
        [
          { transform: `translateY(${startY}px) scale(${startScale})` },
          { transform: "translateY(0px) scale(1)" },
        ],
        {
          duration: 720,
          delay: 140 + i * 90,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        },
      );
      animation.pause();
      return animation;
    });

    let finished = false;
    const land = () => {
      if (finished) return;
      finished = true;
      nodes.forEach((node) => {
        node.style.zIndex = "";
        node.style.transformOrigin = "";
      });
      setStacking(false);
    };
    Promise.all(animations.map((a) => a.finished)).then(land, () => {});

    const play = () => animations.forEach((a) => a.play());
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            play();
            observer?.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(list);
    } else {
      play();
    }

    return () => {
      observer?.disconnect();
      animations.forEach((a) => a.cancel());
      land();
    };
  }, [listRef, enabled, setStacking]);
}

export function Accordion({
  type = "single",
  collapsible = true,
  defaultValue = null,
  accordionData = [],
  variant = "default",
  animation = "none",
  className = "",
  itemClassName = "",
  triggerClassName = "",
  contentClassName = "",
  expandIcon = null,
  expandIconClassName,
}: CustomAccordionProps) {
  const styles = VARIANTS[variant === "card-filled" ? "filled" : variant];

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
  const DefaultExpandIcon = styles.expandIcon === "plus" ? Plus : ChevronDown;

  const listRef = React.useRef<HTMLDivElement>(null);
  const [stacking, setStacking] = React.useState(animation === "stack");
  useStackEntrance(listRef, animation === "stack", setStacking);

  const shellClassName = cn("relative w-full", styles.list, className);

  const items = accordionData.map((item) => {
    const ItemIcon =
      typeof item.icon === "string" ? ICON_MAP[item.icon] : null;
    const hasIcon = Boolean(item.icon);
    return (
      <AccordionItem
        key={item.value}
        value={item.value}
        data-stack-item=""
        className={cn(
          styles.item,
          // Overlapping cards need an opaque surface while the deck deals out.
          stacking &&
            "rounded-2xl bg-background ring-1 ring-border shadow-[0_12px_32px_-16px_rgb(0_0_0/0.25)]",
          itemClassName,
        )}
      >
        <AccordionTrigger
          expandIcon={
            <span className={styles.expand} aria-hidden="true">
              {ResolvedExpandIcon ? (
                <ResolvedExpandIcon className="size-4" />
              ) : expandIcon ? (
                expandIcon
              ) : (
                <DefaultExpandIcon className="size-4" strokeWidth={1.75} />
              )}
            </span>
          }
          expandIconClassName={expandIconClassName}
          className={cn(
            "group cursor-pointer outline-none focus-visible:ring-0",
            styles.trigger,
            triggerClassName,
          )}
        >
          <div className="flex w-full min-w-0 items-center gap-4">
            {hasIcon && (
              <span className={styles.iconWrap}>
                {ItemIcon ? (
                  <ItemIcon className="size-4" strokeWidth={1.75} />
                ) : (
                  (item.icon as React.ReactNode)
                )}
              </span>
            )}
            <span className={cn("min-w-0 text-left", styles.title)}>
              {item.title}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent
          className={cn(
            "text-sm",
            styles.content,
            hasIcon && styles.contentWithIcon,
            styles.thread &&
              hasIcon &&
              "before:absolute before:bottom-5 before:left-[2.25rem] before:top-0 before:w-px before:bg-gradient-to-b before:from-primary/50 before:to-transparent",
            contentClassName,
          )}
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

  const [multipleValue, setMultipleValue] =
    React.useState<string[]>(multipleDefault);

  if (type === "single") {
    return (
      <ShadCNAccordion
        ref={listRef}
        type="single"
        collapsible={collapsible}
        className={shellClassName}
        defaultValue={singleDefault}
      >
        {items}
      </ShadCNAccordion>
    );
  }

  if (!collapsible) {
    return (
      <ShadCNAccordion
        ref={listRef}
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
      ref={listRef}
      type="multiple"
      className={shellClassName}
      defaultValue={multipleDefault}
    >
      {items}
    </ShadCNAccordion>
  );
}
