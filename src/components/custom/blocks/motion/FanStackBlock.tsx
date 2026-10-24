"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import React, {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

// ==========================================
// GEOMETRY
// ==========================================
/**
 * The stack is a cascade from this container width up (Tailwind's `@3xl`,
 * 48rem); below it the cards simply stack, unanimated.
 */
const CASCADE_MIN_WIDTH = 768;
/** Each card's resting tilt in the cascade, by position (repeats). */
const REST_TILT = [-1.5, 1, -1];
/** The extra tilt each card is dealt from, by position (repeats). */
const DEAL_TILT = [-5, 4, -3, 2];

export type FanStackTone = "muted" | "light" | "accent";
export type FanStackThumbSide = "right" | "left" | "top";

const TONES: FanStackTone[] = ["muted", "light", "accent"];
const THUMB_SIDES: FanStackThumbSide[] = ["right", "left", "top"];

/**
 * Card surfaces, all derived from `--primary`: a faint wash over the card
 * colour, then two soft OKLCH tints with an ink of the same hue, so any theme
 * colour gives a calm, legible cascade in light and dark mode.
 */
const TONE_STYLE: Record<FanStackTone, React.CSSProperties> = {
  muted: {
    background: "color-mix(in oklab, var(--primary) 14%, var(--card))",
    color: "var(--card-foreground)",
    borderColor: "var(--border)",
  },
  light: {
    background: "oklch(from var(--primary) 0.97 calc(c * 0.25) h)",
    color: "oklch(from var(--primary) 0.24 calc(c * 0.5) h)",
    borderColor: "oklch(from var(--primary) 0.9 calc(c * 0.4) h)",
  },
  accent: {
    background: "oklch(from var(--primary) 0.88 calc(c * 0.4) h)",
    color: "oklch(from var(--primary) 0.3 calc(c * 0.6) h)",
    borderColor: "oklch(from var(--primary) 0.8 calc(c * 0.5) h)",
  },
};

// Where a photo hangs off its card in the cascade, clear of the card's text.
const THUMB_SIDE_CLASS: Record<FanStackThumbSide, string> = {
  right: "@3xl:-top-[30px] @3xl:-right-[calc(var(--fan-thumb)*0.84)] @3xl:rotate-[7deg]",
  left: "@3xl:top-[46%] @3xl:right-auto @3xl:left-[max(calc(var(--fan-thumb)*-0.98),calc(12px_-_var(--fan-shift)*38cqw))] @3xl:-rotate-[6deg]",
  top: "@3xl:-top-[calc(var(--fan-thumb)*0.6)] @3xl:right-2 @3xl:rotate-[5deg]",
};

// ==========================================
// CONTEXT
// ==========================================
interface FanStackCardContextValue {
  index: number;
  count: number;
  /** Deal progress: 0 = every card on the pile, 1 = dealt into the cascade. */
  progress: MotionValue<number> | null;
  /** Each card's distance from the pile, or null while the cascade is off. */
  offsets: { x: number; y: number }[] | null;
}

const FanStackCardContext = createContext<FanStackCardContextValue>({
  index: 0,
  count: 1,
  progress: null,
  offsets: null,
});

// ==========================================
// FAN STACK
// ==========================================
export interface FanStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The scrolling element, when the stack lives inside a scroll container
   * rather than the page. Defaults to the window.
   */
  scrollerRef?: React.RefObject<HTMLElement | null>;
  /** Seconds the cards take to catch up with the scrollbar. `0` locks them to it. */
  scrub?: number;
  /**
   * Below 768px, the gap in px between the top of the scroller and the first
   * stuck card — raise it to clear a fixed header.
   */
  stickyTop?: number;
}

/**
 * Overlapping cards in a diagonal cascade. As the stack scrolls into view the
 * cards are dealt out of one tilted pile into place, scrubbed by scroll (not
 * under reduced motion). Below 768px of width the cards stack instead: each
 * sticks near the top and the next slides over it, leaving its header peeking.
 */
export const FanStack = forwardRef<HTMLDivElement, FanStackProps>(
  ({ scrollerRef, scrub = 0.6, stickyTop = 16, className, children, ...props }, ref) => {
    const listRef = useRef<HTMLDivElement>(null);
    const [offsets, setOffsets] = useState<{ x: number; y: number }[] | null>(null);
    const reduceMotion = useReducedMotion();
    const cards = Children.toArray(children).filter(isValidElement);
    const count = cards.length;

    const { scrollYProgress } = useScroll({
      target: listRef,
      container: scrollerRef,
      offset: ["start 0.75", "center 0.45"],
    });
    // GSAP's `scrub` lag, as a spring that trails the scrollbar.
    const trailing = useSpring(scrollYProgress, {
      stiffness: 260 / Math.max(scrub, 0.1),
      damping: 40,
      restDelta: 0.0005,
    });
    const progress = scrub > 0 ? trailing : scrollYProgress;

    // The layout switches on the container's width (a container query), so
    // the animation follows the same width rather than the viewport's. Each
    // card's distance from the pile is what it travels.
    useLayoutEffect(() => {
      const list = listRef.current;
      if (!list) return;
      const measure = () => {
        const items = Array.from(list.querySelectorAll<HTMLElement>("[data-fan-card]"));
        // The pile is the middle card: dealing from there keeps every card
        // (and the photos hanging off them) inside the stack's width.
        const pile = items[Math.floor((items.length - 1) / 2)];
        if (!pile || list.clientWidth < CASCADE_MIN_WIDTH) {
          setOffsets(null);
          return;
        }
        setOffsets(
          items.map((card) => ({
            x: pile.offsetLeft - card.offsetLeft,
            y: pile.offsetTop - card.offsetTop,
          })),
        );
      };
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(list);
      return () => observer.disconnect();
    }, [count]);

    const dealing = reduceMotion ? null : offsets;

    return (
      <div ref={ref} className={cn("@container w-full", className)} {...props}>
        <div
          ref={listRef}
          className="grid gap-5 @3xl:block @3xl:pt-6 @3xl:pb-10"
          style={
            {
              "--fan-thumb": "min(190px, 18cqw)",
              "--fan-top": `${stickyTop}px`,
              // Narrow: every card as tall as the tallest, so each one fully
              // covers the card it stacks on.
              gridTemplateRows: `repeat(${Math.max(count, 1)}, 1fr) auto`,
            } as React.CSSProperties
          }
        >
          {cards.map((card, index) => (
            <FanStackCardContext.Provider
              key={card.key ?? index}
              value={{ index, count, progress, offsets: dealing }}
            >
              {card}
            </FanStackCardContext.Provider>
          ))}
          {/* Narrow: room for the finished stack to hold before it scrolls on.
              A sticky card is held only while its parent has room below it. */}
          <div aria-hidden="true" className="h-40 @3xl:hidden" />
        </div>
      </div>
    );
  },
);
FanStack.displayName = "FanStack";

// ==========================================
// CARD
// ==========================================
type ArticleProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
>;

export interface FanStackCardProps extends ArticleProps {
  /** The card's surface. Defaults to muted → light → accent by position. */
  tone?: FanStackTone;
}

export const FanStackCard = forwardRef<HTMLElement, FanStackCardProps>(
  ({ tone, className, style, children, ...props }, ref) => {
    const { index, count, progress, offsets } = useContext(FanStackCardContext);
    const surface = tone ?? TONES[index % TONES.length];

    // Where this card is dealt from: on the pile, tilted. Kept
    // in motion values so a re-measure moves the card without re-rendering.
    const from = offsets?.[index];
    const fromX = useMotionValue(0);
    const fromY = useMotionValue(0);
    const fromTilt = useMotionValue(0);
    useLayoutEffect(() => {
      fromX.set(from?.x ?? 0);
      fromY.set(from?.y ?? 0);
      // The resting tilt stays on as CSS `rotate`, so this adds only the rest.
      fromTilt.set(
        from ? DEAL_TILT[index % DEAL_TILT.length] - REST_TILT[index % REST_TILT.length] : 0,
      );
    }, [from, index, fromX, fromY, fromTilt]);

    const fallback = useMotionValue(1);
    const dealt = progress ?? fallback;
    const x = useTransform([dealt, fromX], ([p, d]: number[]) => (1 - p) * d);
    const y = useTransform([dealt, fromY], ([p, d]: number[]) => (1 - p) * d);
    const rotate = useTransform([dealt, fromTilt], ([p, d]: number[]) => (1 - p) * d);

    return (
      <motion.article
        ref={ref}
        data-fan-card=""
        data-fan-index={index}
        className={cn(
          "grid content-start gap-3.5 rounded-[26px] border p-6 sm:p-8",
          "shadow-[0_24px_60px_-30px_rgb(0_0_0/0.35)]",
          // Narrow: a sticky stack, each card stuck a step lower than the last
          // so the headers underneath stay readable. The title clears the
          // small photo pinned to the card's corner.
          "sticky top-[calc(var(--fan-top)+var(--fan-i)*20px)] [&:has(>figure)>h3]:pr-24",
          "@3xl:relative @3xl:top-auto @3xl:[&:has(>figure)>h3]:pr-0",
          // The cascade: each card narrower than the stack, stepped right and
          // tucked under the one before it. The next card overlaps only this
          // card's bottom padding, never its text.
          "@3xl:w-[62%] @3xl:grid-cols-2 @3xl:gap-x-8 @3xl:-mt-8",
          index === count - 1 ? "@3xl:pb-8" : "@3xl:pb-[76px]",
          "@3xl:ml-[calc(var(--fan-shift)*38%)] @3xl:rotate-[var(--fan-tilt)]",
          "@3xl:first:mt-0",
          className,
        )}
        style={
          {
            ...TONE_STYLE[surface],
            zIndex: index + 1,
            "--fan-i": index,
            // 0 for the first card, 1 for the last: how far along the 38% it steps.
            "--fan-shift": count > 1 ? index / (count - 1) : 0,
            "--fan-tilt": `${REST_TILT[index % REST_TILT.length]}deg`,
            ...style,
            x,
            y,
            rotate,
          } as React.ComponentProps<typeof motion.article>["style"]
        }
        {...props}
      >
        {children}
      </motion.article>
    );
  },
);
FanStackCard.displayName = "FanStackCard";

// ==========================================
// CARD PARTS
// ==========================================
export const FanStackTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "m-0 text-[1.75rem] font-medium leading-tight tracking-[-0.03em] @3xl:col-span-full @3xl:text-[2.5rem]",
        className,
      )}
      {...props}
    />
  ),
);
FanStackTitle.displayName = "FanStackTitle";

/** The step number ahead of a title, set back a shade. */
export const FanStackStep = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("opacity-55 tabular-nums", className)} {...props} />
  ),
);
FanStackStep.displayName = "FanStackStep";

export const FanStackDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("m-0 max-w-[32rem] text-base leading-relaxed opacity-85", className)}
    {...props}
  />
));
FanStackDescription.displayName = "FanStackDescription";

export const FanStackPoints = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("m-0 grid list-none content-start gap-2 p-0 text-[0.9375rem]", className)}
      {...props}
    />
  ),
);
FanStackPoints.displayName = "FanStackPoints";

export interface FanStackPointProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Replaces the check mark. */
  icon?: React.ReactNode;
}

export const FanStackPoint = forwardRef<HTMLLIElement, FanStackPointProps>(
  ({ icon, className, children, ...props }, ref) => (
    <li ref={ref} className={cn("flex gap-2.5", className)} {...props}>
      {icon ?? <Check aria-hidden="true" className="mt-0.5 size-[18px] shrink-0 opacity-80" />}
      <span>{children}</span>
    </li>
  ),
);
FanStackPoint.displayName = "FanStackPoint";

export interface FanStackThumbProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Where the photo hangs off the card in the cascade. Defaults to right →
   * left → top by position. Below the cascade width it is a small photo in
   * the card's top corner.
   */
  side?: FanStackThumbSide;
}

/** A photo for the card — pass an `<img>` (or your framework's image) as the child. */
export const FanStackThumb = forwardRef<HTMLElement, FanStackThumbProps>(
  ({ side, className, ...props }, ref) => {
    const { index } = useContext(FanStackCardContext);
    const placement = side ?? THUMB_SIDES[index % THUMB_SIDES.length];
    return (
      <figure
        ref={ref}
        className={cn(
          "m-0 aspect-[22/17] overflow-hidden rounded-[14px] border border-white/15",
          "shadow-[0_20px_50px_-20px_rgb(0_0_0/0.55)]",
          "[&_img]:block [&_img]:size-full [&_img]:object-cover",
          // Narrow: a small photo inside the card's top corner.
          "absolute top-7 right-5 w-20 rotate-[4deg] rounded-[10px]",
          "@3xl:w-[var(--fan-thumb)] @3xl:rounded-[14px]",
          THUMB_SIDE_CLASS[placement],
          className,
        )}
        {...props}
      />
    );
  },
);
FanStackThumb.displayName = "FanStackThumb";
