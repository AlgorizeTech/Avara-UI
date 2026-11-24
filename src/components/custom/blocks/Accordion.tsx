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
  ArrowUpRight,
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
  /** White tiles that settle to soft gray when open, with a plus that folds into a minus. */
  | "soft"
  /** One rounded tray; the open row becomes a tile with an animated plus/minus chip. */
  | "tray"
  /** Pill rows; the open one rises as a card with the answer in an inset well. */
  | "inset"
  /** Outlined rows with corner brackets that open outward. */
  | "bracket"
  | "brand-reveal"
  /** @deprecated Alias of "filled". */
  | "card-filled";

export type CustomAccordionProps = {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[] | null;
  accordionData?: AccordionDataItem[];
  brands?: BrandItem[];
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
  expandIcon: "plus" | "chevron" | "morph";
  content: string;
  /** Extra content padding when the row carries an icon, so text aligns with the title. Dropped below `sm`, where the column is too narrow to spend on an indent. */
  contentWithIcon?: string;
  /** Draws a thin line from the icon down the answer. */
  thread?: boolean;
  /** Wraps the answer in its own surface, e.g. an inset well. */
  panel?: string;
  /** Draws four corner brackets that grow outward on the open row. */
  corners?: boolean;
  /** Fades the answer and animates height with CSS keyframes (see `ui/accordion`). */
  smooth?: boolean;
};

/** One corner of the bracket frame: [position, border sides, outward shift when open]. */
const BRACKET_CORNERS = [
  "-left-px -top-px border-l-2 border-t-2 group-data-[state=open]/item:-left-1 group-data-[state=open]/item:-top-1",
  "-right-px -top-px border-r-2 border-t-2 group-data-[state=open]/item:-right-1 group-data-[state=open]/item:-top-1",
  "-bottom-px -left-px border-b-2 border-l-2 group-data-[state=open]/item:-bottom-1 group-data-[state=open]/item:-left-1",
  "-bottom-px -right-px border-b-2 border-r-2 group-data-[state=open]/item:-bottom-1 group-data-[state=open]/item:-right-1",
] as const;

/** Hairline-lit card shadow shared by the card-style variants. */
const CARD_SHADOW = "shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_-18px_rgba(0,0,0,0.42)]";

/** Round gray chip behind the animated plus/minus; each variant adds its own open tint. */
const EXPAND_CHIP = cn(
  "flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground",
  "transition-[background-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
  "group-data-[state=closed]:group-hover:bg-foreground/10 group-data-[state=open]:text-foreground",
);

const VARIANTS: Record<Exclude<AccordionVariant, "card-filled" | "brand-reveal">, VariantStyles> = {
  // "Lift": closed rows are quiet hairline rows; the open one lifts out as a card.
  default: {
    list: "flex flex-col",
    item: cn(
      "relative rounded-2xl border-b border-border transition-all duration-300 ease-out last:border-b-0",
      "data-[state=open]:my-2 data-[state=open]:border-b-transparent data-[state=open]:bg-card",
      "data-[state=open]:ring-1 data-[state=open]:ring-[#F7F7F6] dark:data-[state=open]:ring-border",
      "data-[state=open]:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_-18px_rgba(0,0,0,0.42)]",
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
    expand: cn(EXPAND_CHIP, "group-data-[state=open]:bg-foreground/15"),
    expandIcon: "morph",
    content: "relative px-4 pb-5 pr-12 text-muted-foreground",
    contentWithIcon: "sm:pl-[4.5rem]",
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
    contentWithIcon: "sm:pl-[3.25rem]",
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
    contentWithIcon: "sm:pl-[4.25rem]",
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
    contentWithIcon: "sm:pl-[4.25rem]",
  },

  // "Soft": white tiles that settle to soft gray when open; the plus folds into a minus.
  soft: {
    list: "flex flex-col gap-2.5",
    item: cn(
      "rounded-2xl bg-card ring-1 ring-[#F7F7F6] dark:ring-border/60",
      CARD_SHADOW,
      "transition-[background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
      "hover:bg-[#F7F7F6] data-[state=open]:bg-[#F7F7F6]",
      "dark:hover:bg-muted/60 dark:data-[state=open]:bg-muted dark:data-[state=open]:hover:bg-muted",
      "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/60",
    ),
    trigger: "items-center gap-4 px-4 py-3.5 sm:px-5",
    iconWrap: cn(
      "flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors duration-300",
      "group-hover:text-foreground group-data-[state=open]:bg-card group-data-[state=open]:text-foreground",
    ),
    title: "text-[15px] font-medium tracking-[-0.01em] text-foreground",
    expand: cn(EXPAND_CHIP, "group-data-[state=open]:bg-foreground/15"),
    expandIcon: "morph",
    content: "px-4 pb-5 pr-14 text-muted-foreground sm:px-5 sm:pr-16",
    contentWithIcon: "sm:pl-[4.75rem]",
    smooth: true,
  },

  // "Tray": rows sit in one rounded tray; the open row becomes a soft tile and
  // its round chip inverts, with the plus turning into a minus.
  tray: {
    list: cn(
      "flex flex-col gap-1 rounded-[1.75rem] bg-card p-3 ring-1 ring-[#F7F7F6] dark:ring-border/60",
      "shadow-[0_1px_2px_rgb(0_0_0/0.04),0_18px_40px_-24px_rgb(0_0_0/0.22)]",
    ),
    item: cn(
      "rounded-[1.25rem] p-1.5 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
      "data-[state=closed]:hover:bg-muted/50 data-[state=open]:bg-[#F7F7F6] dark:data-[state=open]:bg-muted",
      "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/60",
    ),
    trigger: "items-center gap-4 px-3 py-3 sm:px-4",
    iconWrap: cn(
      "flex shrink-0 items-center justify-center text-muted-foreground",
      "transition-[color,transform] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
      "group-hover:-rotate-6 group-hover:scale-110 group-hover:text-foreground group-data-[state=open]:text-foreground",
    ),
    title: cn(
      "text-[15px] font-medium tracking-[-0.01em] text-foreground/80 transition-colors duration-300",
      "group-hover:text-foreground group-data-[state=open]:text-foreground",
    ),
    expand: cn(EXPAND_CHIP, "group-data-[state=open]:bg-foreground/15"),
    expandIcon: "morph",
    content: "px-3 pb-3 pr-14 text-muted-foreground sm:px-4 sm:pr-16",
    contentWithIcon: "sm:pl-12",
    smooth: true,
  },

  // "Inset": white cards with a hairline border and soft shadow; the open one holds the answer in a well.
  inset: {
    list: "flex flex-col gap-2.5",
    item: cn(
      "rounded-[1.75rem] border border-[#F7F7F6] bg-card p-2 dark:border-border/60",
      CARD_SHADOW,
      "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
      "data-[state=open]:-translate-y-px",
      "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/60",
    ),
    trigger: "items-center gap-4 px-3 py-3 sm:px-4",
    iconWrap: cn(
      "flex size-9 shrink-0 items-center justify-center rounded-full bg-background text-muted-foreground transition-colors duration-300",
      "group-data-[state=open]:bg-muted group-data-[state=open]:text-foreground",
    ),
    title: cn(
      "text-[15px] font-medium tracking-[-0.01em] text-muted-foreground transition-colors duration-500",
      "group-hover:text-foreground group-data-[state=open]:text-foreground",
    ),
    expand: cn(EXPAND_CHIP, "group-data-[state=open]:bg-foreground/[0.12]"),
    expandIcon: "morph",
    content: "px-1.5 pb-1.5",
    panel: "rounded-[1.25rem] bg-[#F7F7F6] px-3.5 py-3 text-[15px] text-foreground/80 dark:bg-background/50 sm:px-4 sm:py-3.5",
    smooth: true,
  },

  // "Bracket": an outlined frame whose corner brackets open outward and take the accent.
  bracket: {
    list: "flex flex-col gap-3.5",
    item: cn(
      "group/item relative rounded-[2px] border border-border bg-card",
      "transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
      "hover:border-foreground/25 data-[state=open]:border-foreground/25",
      "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/60 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background",
    ),
    trigger: "items-center gap-4 px-5 py-4",
    iconWrap:
      "flex shrink-0 items-center justify-center text-muted-foreground transition-colors duration-300 group-data-[state=open]:text-primary",
    title: "text-[15px] font-semibold tracking-[-0.005em] text-foreground",
    expand: cn(
      "flex shrink-0 items-center justify-center text-muted-foreground",
      "transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
      "group-hover:text-foreground group-data-[state=open]:-rotate-180 group-data-[state=open]:text-primary",
    ),
    expandIcon: "chevron",
    content: "px-5 pb-5 pr-12 text-muted-foreground",
    contentWithIcon: "sm:pl-[3.25rem]",
    corners: true,
    smooth: true,
  },

  // "Editorial": stacked white cards, each lit by a hairline and a soft shadow.
  ghost: {
    list: "flex flex-col gap-3",
    item: cn(
      "rounded-2xl bg-card ring-1 ring-[#F7F7F6] dark:ring-border/60",
      CARD_SHADOW,
      "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/60",
    ),
    trigger: "items-center gap-4 px-5 py-4",
    iconWrap:
      "flex shrink-0 items-center justify-center text-muted-foreground transition-colors duration-300 group-data-[state=open]:text-foreground",
    title:
      "text-lg font-medium tracking-tight text-foreground transition-[transform,color] duration-300 group-hover:translate-x-1",
    expand: cn(EXPAND_CHIP, "group-data-[state=open]:bg-foreground/15"),
    expandIcon: "morph",
    content: "max-w-prose px-5 pb-5 pr-14 text-[15px] leading-relaxed text-muted-foreground",
    contentWithIcon: "sm:pl-[3.25rem]",
  },
};

/**
 * Plus that turns into a minus. Drawn as SVG strokes so each part animates on
 * its own: the pair spins half a turn and the vertical stroke retracts when the
 * row opens, the plus turns a quarter on hover, and the whole glyph pops a
 * little. Driven by the trigger's `group` and `data-state`, so it needs no state.
 */
function MorphIcon() {
  const easing = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      aria-hidden="true"
      className={cn(
        "size-4 overflow-visible transition-transform duration-300 group-hover:scale-110",
        easing,
      )}
    >
      <g
        style={{ transformOrigin: "8px 8px" }}
        className={cn(
          "transition-transform duration-500",
          easing,
          "group-data-[state=closed]:group-hover:rotate-90 group-data-[state=open]:rotate-180",
        )}
      >
        <line x1="3" y1="8" x2="13" y2="8" />
        <line
          x1="8"
          y1="3"
          x2="8"
          y2="13"
          style={{ transformOrigin: "8px 8px" }}
          className="transition-[scale,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=open]:scale-y-0 group-data-[state=open]:opacity-0"
        />
      </g>
    </svg>
  );
}

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

function StandardAccordion({
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
  const safeVariant =
    variant === "card-filled" || variant === "brand-reveal"
      ? "filled"
      : (variant as keyof typeof VARIANTS) in VARIANTS
        ? (variant as keyof typeof VARIANTS)
        : "default";
  const styles = VARIANTS[safeVariant];

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
  const [multipleValue, setMultipleValue] =
    React.useState<string[]>(multipleDefault);
  useStackEntrance(listRef, animation === "stack", setStacking);

  const shellClassName = cn("relative w-full", styles.list, className);
  const motion = styles.smooth ? "smooth" : "default";

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
              ) : styles.expandIcon === "morph" ? (
                <MorphIcon />
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
              "before:absolute before:bottom-5 before:left-[2.25rem] before:top-0 before:hidden before:w-px before:bg-gradient-to-b before:from-primary/50 before:to-transparent sm:before:block",
            contentClassName,
          )}
        >
          <div className={cn("space-y-3", styles.panel)}>
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
        {styles.corners &&
          BRACKET_CORNERS.map((corner) => (
            <span
              key={corner}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute size-2.5 border-muted-foreground/60",
                "transition-[width,height,top,right,bottom,left,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "group-data-[state=open]/item:size-4 group-data-[state=open]/item:border-primary",
                corner,
              )}
            />
          ))}
      </AccordionItem>
    );
  });

  if (type === "single") {
    return (
      <ShadCNAccordion
        ref={listRef}
        motion={motion}
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
        motion={motion}
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
      motion={motion}
      type="multiple"
      className={shellClassName}
      defaultValue={multipleDefault}
    >
      {items}
    </ShadCNAccordion>
  );
}

export function Accordion(props: CustomAccordionProps) {
  if (props.variant === "brand-reveal") {
    return (
      <BrandLogoAccordion
        brands={props.brands}
        className={props.className}
      />
    );
  }

  return <StandardAccordion {...props} />;
}

/* ═══════════════════════════════════════════════
   BRAND LOGO REVEAL ACCORDION COMPONENT
   Horizontal interactive accordion for client & partner showcase.
   Inspired by Framer Brand Logo Reveal.
   ═══════════════════════════════════════════════ */

export type BrandItem = {
  id: string;
  name: string;
  caption: string;
  index?: string;
  logo?: React.ReactNode | string;
  link?: string;
  linkText?: string;
};

export type BrandLogoAccordionProps = {
  brands?: BrandItem[];
  title?: string;
  defaultActiveId?: string;
  height?: number | string;
  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
  className?: string;
  onBrandChange?: (brand: BrandItem, index: number) => void;
};

function AcmeMark({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M16 3L28 10V22L16 29L4 22V10L16 3Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M16 3V29M4 10L28 22M28 10L4 22" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

function NorthstarMark({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M16 2L18.8 11.2L28 14L18.8 16.8L16 26L13.2 16.8L4 14L13.2 11.2L16 2Z" />
      <circle cx="16" cy="14" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

function VertexMark({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M16 4L28 26H4L16 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M16 12L22 23H10L16 12Z" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function HorizonMark({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M7 16A9 9 0 0125 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 21H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M8 26H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function SummitMark({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M3 25L12 8L18 17L22 11L29 25H3Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M12 8V25M22 11V25" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  );
}

function AtlasMark({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="16" cy="16" rx="12" ry="5" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="16" cy="16" rx="5" ry="12" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

function NovaMark({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M16 2L18 12L28 14L18 16L16 26L14 16L4 14L14 12L16 2Z" />
      <circle cx="16" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}

function EvergreenMark({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M16 4L9 12H13L7 20H12L6 28H26L20 20H25L19 12H23L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 4V28" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

const BRAND_MARKS: Record<string, React.ComponentType<{ className?: string }>> = {
  acme: AcmeMark,
  northstar: NorthstarMark,
  vertex: VertexMark,
  horizon: HorizonMark,
  summit: SummitMark,
  atlas: AtlasMark,
  nova: NovaMark,
  evergreen: EvergreenMark,
};

function renderBrandLogo(item: BrandItem, mode: "spine" | "inner") {
  if (React.isValidElement(item.logo)) {
    return item.logo;
  }
  if (typeof item.logo === "string") {
    const BuiltinMark = BRAND_MARKS[item.logo.toLowerCase()];
    if (BuiltinMark) {
      return (
        <BuiltinMark
          className={cn(
            mode === "spine"
              ? "size-4 object-contain"
              : "size-6 sm:size-7 object-contain text-primary dark:text-primary"
          )}
        />
      );
    }
    return (
      <img
        src={item.logo}
        alt={item.name}
        draggable={false}
        loading="lazy"
        className={cn(
          "object-contain",
          mode === "spine"
            ? "h-4 w-auto max-w-[70px] filter grayscale opacity-60"
            : "h-6 sm:h-7 w-auto max-w-[120px]"
        )}
      />
    );
  }
  const Fallback = BRAND_MARKS[item.id.toLowerCase()] || AcmeMark;
  return (
    <Fallback
      className={cn(
        mode === "spine"
          ? "size-4 object-contain"
          : "size-6 sm:size-7 object-contain text-primary dark:text-primary"
      )}
    />
  );
}

export const DEFAULT_BRANDS: BrandItem[] = [
  {
    id: "acme",
    name: "Acme Technologies",
    caption: "Website redesign and product marketing platform.",
    index: "01",
    logo: "acme",
  },
  {
    id: "northstar",
    name: "Northstar Studio",
    caption: "Complete brand identity and responsive website.",
    index: "02",
    logo: "northstar",
  },
  {
    id: "vertex",
    name: "Vertex Solutions",
    caption: "SaaS landing page with conversion focused design.",
    index: "03",
    logo: "vertex",
  },
  {
    id: "horizon",
    name: "Horizon Labs",
    caption: "Design system and scalable UI components.",
    index: "04",
    logo: "horizon",
  },
  {
    id: "summit",
    name: "Summit Ventures",
    caption: "Investor website with premium editorial experience.",
    index: "05",
    logo: "summit",
  },
  {
    id: "atlas",
    name: "Atlas Digital",
    caption: "E-commerce experience with performance optimization.",
    index: "06",
    logo: "atlas",
  },
  {
    id: "nova",
    name: "Nova Creative",
    caption: "Interactive portfolio and motion driven website.",
    index: "07",
    logo: "nova",
  },
  {
    id: "evergreen",
    name: "Evergreen Capital",
    caption: "Corporate website with modern brand refresh.",
    index: "08",
    logo: "evergreen",
  },
];

export function BrandLogoAccordion({
  brands = DEFAULT_BRANDS,
  title,
  defaultActiveId,
  height = 300,
  autoplay = true,
  autoplayInterval = 4000,
  pauseOnHover = true,
  className = "",
  onBrandChange,
}: BrandLogoAccordionProps) {
  const initialIndex = defaultActiveId
    ? Math.max(0, brands.findIndex((b) => b.id === defaultActiveId))
    : 0;

  const [activeIndex, setActiveIndex] = React.useState(initialIndex);
  /** Bumped on every pick so choosing the active brand again restarts its timer. */
  const [cycle, setCycle] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const activeIndexRef = React.useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const brandsRef = React.useRef(brands);
  brandsRef.current = brands;

  const onBrandChangeRef = React.useRef(onBrandChange);
  onBrandChangeRef.current = onBrandChange;

  const selectBrand = React.useCallback((index: number) => {
    setActiveIndex(index);
    setCycle((value) => value + 1);
    const b = brandsRef.current[index];
    if (b) {
      onBrandChangeRef.current?.(b, index);
    }
  }, []);

  // Autoplay: the progress bar IS the timer. One Web Animation runs on the
  // compositor and advances to the next brand when it finishes, so nothing
  // re-renders while a slide plays (a setInterval/setState loop here would
  // re-render the block 20 times a second and starve every animation on the
  // page). Hover, an off-screen block and a hidden tab all pause it.
  const progressRef = React.useRef<Animation | null>(null);
  const hoverPausedRef = React.useRef(false);
  const visibleRef = React.useRef(true);

  const syncPlayState = React.useCallback(() => {
    const animation = progressRef.current;
    if (!animation) return;
    if (hoverPausedRef.current || !visibleRef.current) animation.pause();
    else animation.play();
  }, []);

  React.useEffect(() => {
    if (!autoplay || brands.length <= 1) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bar = containerRef.current?.querySelector<HTMLElement>(
      '[role="tab"][aria-selected="true"] [data-brand-progress]',
    );
    if (!bar || typeof bar.animate !== "function") return;

    const animation = bar.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      { duration: autoplayInterval, easing: "linear", fill: "forwards" },
    );
    animation.onfinish = () =>
      selectBrand((activeIndexRef.current + 1) % brandsRef.current.length);
    progressRef.current = animation;
    syncPlayState();

    return () => {
      animation.onfinish = null;
      animation.cancel();
      if (progressRef.current === animation) progressRef.current = null;
    };
  }, [autoplay, autoplayInterval, brands.length, activeIndex, cycle, selectBrand, syncPlayState]);

  // Only tick while the block is on screen and the tab is in the foreground.
  React.useEffect(() => {
    if (!autoplay) return;
    const container = containerRef.current;
    const update = () => {
      visibleRef.current = onScreen && !document.hidden;
      syncPlayState();
    };
    let onScreen = true;
    let observer: IntersectionObserver | null = null;
    if (container && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        update();
      });
      observer.observe(container);
    }
    document.addEventListener("visibilitychange", update);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [autoplay, syncPlayState]);

  const totalCount = brands.length;
  const totalFormatted = String(totalCount).padStart(2, "0");

  return (
    <div className={cn("w-full select-none", className)}>
      {title && (
        <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-muted-foreground/60 mb-3 px-1">
          {title}
        </div>
      )}

      <div
        ref={containerRef}
        role="tablist"
        aria-label={title || "Brand showcase"}
        onMouseEnter={() => {
          if (!pauseOnHover) return;
          hoverPausedRef.current = true;
          syncPlayState();
        }}
        onMouseLeave={() => {
          if (!pauseOnHover) return;
          hoverPausedRef.current = false;
          syncPlayState();
        }}
        style={{
          minHeight: typeof height === "number" ? `${height}px` : height,
        }}
        className={cn(
          "relative flex flex-col md:flex-row w-full gap-[1px] rounded-2xl overflow-hidden border border-border/80 bg-border/70 dark:bg-border/40 shadow-sm",
        )}
      >
        {brands.map((item, idx) => {
          const isOpen = activeIndex === idx;
          const formattedIndex = item.index || String(idx + 1).padStart(2, "0");

          return (
            <div
              key={item.id}
              role="tab"
              id={`brand-tab-${item.id}`}
              aria-selected={isOpen}
              aria-expanded={isOpen}
              tabIndex={0}
              onClick={() => selectBrand(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectBrand(idx);
                } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                  e.preventDefault();
                  selectBrand((idx + 1) % brands.length);
                } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                  e.preventDefault();
                  selectBrand((idx - 1 + brands.length) % brands.length);
                }
              }}
              className={cn(
                "relative overflow-hidden cursor-pointer flex transition-[flex-grow,flex-basis,background,color] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
                isOpen
                  ? "flex-1 bg-primary/[0.09] text-foreground dark:bg-zinc-900 dark:text-zinc-100 min-w-0 md:min-w-[260px]"
                  : "flex-[0_0_54px] md:flex-[0_1_105px] md:min-w-[52px] bg-card text-foreground hover:bg-muted/70 dark:bg-zinc-950/60 dark:hover:bg-zinc-900/80"
              )}
            >
              {/* Spine (Collapsed State) */}
              <div
                aria-hidden={isOpen}
                className={cn(
                  "absolute inset-0 flex transition-opacity ease-in-out",
                  "flex-row md:flex-col items-center justify-between px-5 md:px-0 md:py-6",
                  isOpen
                    ? "opacity-0 pointer-events-none duration-300 delay-0"
                    : "opacity-100 duration-500 delay-300"
                )}
              >
                <div className="shrink-0 flex items-center justify-center opacity-60">
                  {renderBrandLogo(item, "spine")}
                </div>

                <span className="md:[writing-mode:vertical-rl] md:rotate-180 text-[11px] font-semibold tracking-[0.2em] uppercase opacity-60 whitespace-nowrap">
                  {item.name}
                </span>

                <span className="text-[10px] font-mono tracking-[0.14em] opacity-40">
                  {formattedIndex}
                </span>
              </div>

              {/* Inner Content (Expanded State) */}
              <div
                className={cn(
                  "relative flex flex-col justify-between w-full h-full p-6 sm:p-8 min-w-[260px] box-border transition-all ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isOpen
                    ? "opacity-100 translate-x-0 duration-700 delay-300"
                    : "opacity-0 -translate-x-3 pointer-events-none absolute inset-0 duration-300 delay-0"
                )}
              >
                {/* Counter */}
                <div className="text-[11px] font-mono tracking-[0.22em] opacity-55">
                  {formattedIndex} / {totalFormatted}
                </div>

                {/* Brand Details */}
                <div className="my-auto py-4">
                  <div className="inline-flex items-center justify-center size-12 rounded-xl bg-primary/10 border border-primary/20 dark:bg-white/10 dark:border-white/15 shadow-sm backdrop-blur-sm mb-4 p-2.5">
                    {renderBrandLogo(item, "inner")}
                  </div>
                  <div className="text-[12px] font-bold uppercase tracking-[0.18em] opacity-60">
                    {item.name}
                  </div>
                  <p className="mt-2 text-sm sm:text-[14.5px] leading-relaxed opacity-85 max-w-[34ch] font-normal text-pretty">
                    {item.caption}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 mt-3.5 text-[12px] font-medium text-primary hover:underline underline-offset-4 opacity-90 transition-opacity"
                    >
                      <span>{item.linkText || "Visit website"}</span>
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                </div>

                {/* Progress bar line */}
                {autoplay && (
                  <div
                    aria-hidden="true"
                    className="absolute left-0 right-0 bottom-0 h-[2.5px] bg-foreground/15 dark:bg-white/15 overflow-hidden"
                  >
                    <div
                      data-brand-progress=""
                      className="h-full w-full origin-left bg-primary"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
