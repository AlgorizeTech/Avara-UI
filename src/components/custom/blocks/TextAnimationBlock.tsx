"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { springLinear } from "./motion-curves";

export interface TextAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  variant?:
    | "typewriter"
    | "blur-reveal"
    | "wave"
    | "pop-in"
    | "flip"
    | "spin-in"
    | "blur-in-up";
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  /**
   * Swap what a word renders as, keeping its entrance. Word-level variants
   * only (`pop-in`, `flip`, `blur-in-up`): return the word itself with some
   * markup, e.g. a coloured span or a word that later changes.
   */
  renderWord?: (word: string, index: number) => React.ReactNode;
}

type Variant = NonNullable<TextAnimationProps["variant"]>;
type TokenVariant = Exclude<Variant, "blur-reveal">;

// ==========================================
// ENTRANCES
// ==========================================
// Plain CSS keyframes, no animation library. The springs are the same
// stiffness / damping curves as before, solved once into CSS `linear()`
// easings (the analytic spring, sampled at 120 points a second). A spring
// drives every value of its token — opacity included, where the overshoot
// simply clamps at 1.

interface Entrance {
  from: string;
  to: string;
  /** ms */
  duration: number;
  easing: string;
}

const spring = (stiffness: number, damping: number) =>
  springLinear({ stiffness, damping }, 120);

const TOKEN_ENTRANCES: Record<TokenVariant, Entrance> = {
  typewriter: {
    from: "opacity: 0; transform: translateY(10px);",
    to: "opacity: 1; transform: translateY(0px);",
    ...spring(100, 12),
  },
  wave: {
    from: "opacity: 0; transform: translateY(15px);",
    to: "opacity: 1; transform: translateY(0px);",
    ...spring(200, 10),
  },
  "pop-in": {
    from: "opacity: 0; transform: translateY(10px) scale(0.5);",
    to: "opacity: 1; transform: translateY(0px) scale(1);",
    ...spring(200, 12),
  },
  flip: {
    from: "opacity: 0; transform: translateY(20px) rotateX(-90deg);",
    to: "opacity: 1; transform: translateY(0px) rotateX(0deg);",
    ...spring(200, 15),
  },
  "spin-in": {
    from: "opacity: 0; transform: scale(0) rotate(-180deg);",
    to: "opacity: 1; transform: scale(1) rotate(0deg);",
    ...spring(200, 12),
  },
  "blur-in-up": {
    from: "opacity: 0; transform: translateY(20px); filter: blur(8px);",
    to: "opacity: 1; transform: translateY(0px); filter: blur(0px);",
    duration: 600,
    easing: "cubic-bezier(0, 0, 0.58, 1)",
  },
};

/** Seconds between neighbouring tokens (typewriter's depends on `duration`). */
const STAGGER: Record<Exclude<TokenVariant, "typewriter">, number> = {
  wave: 0.05,
  "pop-in": 0.1,
  flip: 0.1,
  "spin-in": 0.05,
  "blur-in-up": 0.1,
};

/**
 * Everything waits paused on its first frame until the text scrolls into
 * view, then plays once. `backwards` fill hands over to the resting styles
 * when an entrance ends. Selectors are data attributes, so nothing is added
 * to — or merged away from — the classes you pass.
 */
const PAUSED = `
[data-text-animation-state="hidden"],
[data-text-animation-state="hidden"] [data-text-animation-token] { animation-play-state: paused; }`;

function variantCss(variant: Variant) {
  if (variant === "blur-reveal") {
    return `
@keyframes text-animation-blur-reveal {
  from { opacity: 0; filter: blur(10px); transform: scale(0.95); }
  to { opacity: 1; filter: blur(0px); transform: scale(1); }
}
[data-text-animation="blur-reveal"] { animation: text-animation-blur-reveal 0.5s cubic-bezier(0, 0, 0.58, 1) backwards; }${PAUSED}`;
  }
  const entrance = TOKEN_ENTRANCES[variant];
  if (!entrance) return "";
  const { from, to, duration, easing } = entrance;
  return `
@keyframes text-animation-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes text-animation-${variant} { from { ${from} } to { ${to} } }
[data-text-animation="${variant}"] { animation: text-animation-fade 0.3s cubic-bezier(0.25, 0.1, 0.35, 1) backwards; }
[data-text-animation="${variant}"] [data-text-animation-token] { animation: text-animation-${variant} ${duration}ms ${easing} backwards; }${PAUSED}`;
}

// Built once per variant, on first use, and shared by every instance.
const cssCache: Partial<Record<Variant, string>> = {};
const cssFor = (variant: Variant) => (cssCache[variant] ??= variantCss(variant));

/** `delay + index * stagger` seconds, as a CSS time. */
const delayAt = (delay: number, index: number, stagger: number) =>
  `${Math.round((delay + index * stagger) * 100000) / 100}ms`;

export const TextAnimation = React.forwardRef<
  HTMLDivElement,
  TextAnimationProps
>(
  (
    {
      text,
      variant = "blur-reveal",
      duration = 0.5,
      delay = 0,
      as: Component = "p",
      renderWord,
      className,
      ...props
    },
    ref
  ) => {
    const outerRef = React.useRef<HTMLDivElement | null>(null);
    const innerRef = React.useRef<HTMLElement | null>(null);
    const [inView, setInView] = React.useState(false);

    const setOuterRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        outerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    // Plays once, the first time any part of the text enters the viewport
    // (threshold 0). A custom `as` that doesn't forward its ref falls back
    // to observing the wrapper.
    React.useEffect(() => {
      if (inView) return;
      const el = innerRef.current ?? outerRef.current;
      if (!el || typeof IntersectionObserver === "undefined") {
        setInView(true);
        return;
      }
      const io = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      });
      io.observe(el);
      return () => io.disconnect();
    }, [inView]);

    const state = inView ? "visible" : "hidden";

    const renderAnimation = () => {
      switch (variant) {
        case "typewriter": {
          const stagger = duration / text.length;
          let charIndex = 0;

          return (
            <Component
              ref={innerRef}
              data-text-animation={variant}
              data-text-animation-state={state}
              className={cn("flex flex-wrap gap-[0.25em]", className)}
            >
              {text.split(" ").map((word, index) => (
                <span key={index} className="inline-flex">
                  {word.split("").map((char, i) => (
                    <span
                      key={i}
                      data-text-animation-token=""
                      className="inline-block"
                      style={{ animationDelay: delayAt(delay, charIndex++, stagger) }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              ))}
            </Component>
          );
        }



        case "blur-reveal": {
          return (
            <Component
              ref={innerRef}
              data-text-animation={variant}
              data-text-animation-state={state}
              className={className}
              style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
            >
              {text}
            </Component>
          );
        }



        case "wave":
        case "spin-in": {
          const stagger = STAGGER[variant];
          let charIndex = 0;

          return (
            <Component
              ref={innerRef}
              data-text-animation={variant}
              data-text-animation-state={state}
              className={cn("flex flex-wrap gap-[0.25em]", className)}
            >
              {text.split(" ").map((word, index) => (
                <span key={index} className="inline-flex">
                  {word.split("").map((char, i) => (
                    <span
                      key={i}
                      data-text-animation-token=""
                      className="inline-block"
                      style={{ animationDelay: delayAt(delay, charIndex++, stagger) }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </Component>
          );
        }

        case "pop-in":
        case "flip":
        case "blur-in-up": {
          const stagger = STAGGER[variant];

          return (
            <Component
              ref={innerRef}
              data-text-animation={variant}
              data-text-animation-state={state}
              className={cn(
                "flex flex-wrap gap-[0.25em]",
                variant === "flip" && "perspective-[1000px]",
                className,
              )}
            >
              {text.split(" ").map((word, index) => (
                <span
                  key={index}
                  data-text-animation-token=""
                  className={cn("inline-block", variant === "flip" && "origin-bottom")}
                  style={{ animationDelay: delayAt(delay, index, stagger) }}
                >
                  {renderWord ? renderWord(word, index) : word}
                </span>
              ))}
            </Component>
          );
        }

        default:
          return <Component className={className}>{text}</Component>;
      }
    };

    return (
      <div ref={setOuterRef} {...props}>
        {renderAnimation()}
        <style>{cssFor(variant)}</style>
      </div>
    );
  }
);

TextAnimation.displayName = "TextAnimation";
