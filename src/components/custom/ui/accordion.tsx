"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  ChevronDownIcon,
} from "@/components/custom/ui/animated-icons";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * "smooth" swaps Tailwind's height-only accordion animation for a CSS one that
 * also fades the answer in and out. The keyframes ship inline in a scoped
 * <style>, so no Tailwind config or global CSS changes are needed. Radix keeps
 * the panel mounted until the close animation ends, so both directions animate.
 */
type AccordionMotion = "default" | "smooth";

const MotionContext = React.createContext<AccordionMotion>("default");

const SMOOTH_MOTION_CSS = `
@keyframes ui-acc-open{from{height:0}to{height:var(--radix-accordion-content-height)}}
@keyframes ui-acc-close{from{height:var(--radix-accordion-content-height)}to{height:0}}
@keyframes ui-acc-in{from{opacity:0;transform:translateY(-8px);filter:blur(3px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes ui-acc-out{from{opacity:1;transform:none}to{opacity:0;transform:translateY(-4px)}}
.ui-acc-smooth[data-state="open"]{animation:ui-acc-open 520ms cubic-bezier(.32,.72,0,1)}
.ui-acc-smooth[data-state="closed"]{animation:ui-acc-close 520ms cubic-bezier(.32,.72,0,1)}
.ui-acc-smooth[data-state="open"] .ui-acc-smooth-in{animation:ui-acc-in 560ms cubic-bezier(.16,1,.3,1) 90ms backwards}
.ui-acc-smooth[data-state="closed"] .ui-acc-smooth-in{animation:ui-acc-out 220ms ease-in both}
@media (prefers-reduced-motion:reduce){
.ui-acc-smooth,.ui-acc-smooth .ui-acc-smooth-in{animation-duration:1ms!important;animation-delay:0s!important}
[data-motion="smooth"] *,[data-motion="smooth"] *::before,[data-motion="smooth"] *::after{transition-duration:1ms!important;transition-delay:0s!important}
}
`;

// ComponentProps, not ComponentPropsWithoutRef: React 19 passes `ref` as an
// ordinary prop, so blocks can reach the root element (the Accordion block
// measures it for its stack entrance).
type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root> & {
  motion?: AccordionMotion;
};
function Accordion({ motion = "default", ...props }: AccordionProps) {
  const root = (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-motion={motion === "smooth" ? "smooth" : undefined}
      {...props}
    />
  );
  if (motion !== "smooth") return root;
  return (
    <MotionContext.Provider value={motion}>
      <style dangerouslySetInnerHTML={{ __html: SMOOTH_MOTION_CSS }} />
      {root}
    </MotionContext.Provider>
  );
}

type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
>;
function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(className)}
      {...props}
    />
  );
}

type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> & {
  expandIcon?: React.ReactNode;
  expandIconClassName?: string;
};
function AccordionTrigger({
  className,
  children,
  expandIcon,
  expandIconClassName,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 !rounded-none py-4 text-left text-sm font-medium transition-all outline-none text-decoration-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
          expandIconClassName,
        )}
        {...props}
      >
        {children}
        {expandIcon ? (
          expandIcon
        ) : (
          <ChevronDownIcon className="text-muted-foreground group-hover:text-primary group-[[data-state=open]]:text-primary pointer-events-none size-4 shrink-0 translate-y-0.5 transition-all duration-200" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

type AccordionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
>;
function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  const smooth = React.useContext(MotionContext) === "smooth";

  // Radix measures the panel with getBoundingClientRect(), which includes any
  // CSS transform on an ancestor. Inside a scaled container (a device frame,
  // a zoomed preview) it reports the scaled height, so the open animation stops
  // short and the panel then snaps to its real height. offsetHeight is layout
  // height and ignores transforms, so it feeds the keyframes instead.
  const observerRef = React.useRef<ResizeObserver | null>(null);
  const measureRef = React.useCallback((inner: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    const panel = inner?.parentElement;
    if (!inner || !panel) return;
    const sync = () =>
      panel.style.setProperty(
        "--radix-accordion-content-height",
        `${inner.offsetHeight}px`,
      );
    sync();
    if (typeof ResizeObserver === "undefined") return;
    observerRef.current = new ResizeObserver(sync);
    observerRef.current.observe(inner);
  }, []);

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={
        smooth
          ? "ui-acc-smooth overflow-hidden text-sm"
          : "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm "
      }
      {...props}
    >
      <div
        ref={measureRef}
        className={cn("pt-0", smooth && "ui-acc-smooth-in", className)}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
