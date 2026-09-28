"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { getThemeStyles } from "./animated-typography-theme";

// ==========================================
// THEME & CONFIGURATION
// ==========================================
export type TypographyVariant =
  | "matrix-scramble"
  | "color-reveal"
  | "wavy-float"
  | "3d-perspective-flip"
  | "elastic-spring"
  | "spotlight-reveal"
  | "split-stagger"
  | "underline-draw"
  | "letter-bounce"
  | "typewriter"
  | "word-flip"
  | "blur-swap"
  | "blur-rise"
  | "color-wipe";

export type TypographyTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "blockquote";

export type TypographyColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | "default"
  | (string & {});

export type TypographyAlign = "left" | "center" | "right" | "justify";

const alignStyles: Record<TypographyAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const baseStyles: Record<TypographyTag, string> = {
  h1: "font-extrabold tracking-tight leading-snug whitespace-nowrap max-w-full overflow-visible",
  h2: "font-semibold tracking-tight leading-snug whitespace-nowrap max-w-full overflow-visible",
  h3: "font-semibold tracking-tight leading-snug whitespace-nowrap max-w-full overflow-visible",
  h4: "font-semibold tracking-tight leading-snug whitespace-nowrap max-w-full overflow-visible",
  h5: "font-medium leading-normal whitespace-nowrap max-w-full overflow-visible",
  h6: "font-medium leading-normal whitespace-nowrap max-w-full overflow-visible",
  p: "leading-relaxed whitespace-nowrap max-w-full overflow-visible",
  span: "whitespace-nowrap max-w-full overflow-visible",
  blockquote: "pl-2 sm:pl-4 italic border-l-2 sm:border-l-4 border-border whitespace-nowrap max-w-full overflow-visible",
};

// Map of valid tailwind text sizes to responsive scaling classes (scales down on small screens to fit 1 line)
const tailwindSizeMap: Record<string, string> = {
  xs: "text-[10px] sm:text-xs",
  sm: "text-[11px] sm:text-sm",
  base: "text-xs sm:text-base",
  lg: "text-xs sm:text-lg",
  xl: "text-xs sm:text-xl",
  "2xl": "text-xs sm:text-2xl",
  "3xl": "text-xs sm:text-3xl",
  "4xl": "text-xs sm:text-2xl md:text-4xl",
  "5xl": "text-sm sm:text-3xl lg:text-5xl",
  "6xl": "text-sm sm:text-4xl lg:text-6xl",
  "7xl": "text-base sm:text-5xl lg:text-7xl",
  "8xl": "text-base sm:text-6xl lg:text-8xl",
  "9xl": "text-lg sm:text-7xl lg:text-9xl",
};

// Matrix scramble helper
const MATRIX_CHARS = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";

function MatrixScrambleText({
  text,
  speed = 1,
  delay = 0,
}: {
  text: string;
  speed?: number;
  delay?: number;
}) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let iteration = 0;
    let interval: ReturnType<typeof setInterval> | null = null;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return text[index];
              }
              return MATRIX_CHARS[
                Math.floor(Math.random() * MATRIX_CHARS.length)
              ];
            })
            .join(""),
        );

        if (iteration >= text.length) {
          if (interval) clearInterval(interval);
        }
        iteration += 1 / 2.5;
      }, 35 * speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);

  const targetText = displayText || text;
  const words = targetText.split(" ");

  return (
    <span className="inline whitespace-nowrap">
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.2em]">
          {word}
        </span>
      ))}
    </span>
  );
}

// ==========================================
// ROTATING WORDS
// ==========================================
/** How long each word stays before the next one comes in. */
const WORD_INTERVAL_MS = 2400;
/** How long the typewriter holds a finished word before deleting it. */
const TYPEWRITER_HOLD_MS = 1800;
/** The quick fade used for a word's opacity: 0.3s. */
const FADE_EASE = "cubic-bezier(0.25, 0.1, 0.35, 1)";
/** A spring of stiffness 350, damping 25, as a CSS easing; it settles in 558ms. */
const BOUNCE_SPRING =
  "linear(0, 0.041, 0.1419, 0.2747, 0.4185, 0.5586, 0.6853, 0.7936, 0.8813, 0.9485, 0.9971, 1.0295, 1.0488, 1.0578, 1.0594, 1.0558, 1.0492, 1.041, 1.0324, 1.0243, 1.017, 1.0108, 1.0059, 1.0022, 0.9996, 0.9979, 0.9969, 0.9965, 0.9965, 0.9968, 0.9972, 0.9977, 0.9982, 0.9987, 1)";
const BOUNCE_SPRING_MS = 558;
/** When that spring counts as at rest (within half a pixel), and the next word may come in. */
const BOUNCE_REST_MS = 450;
const FLIP_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const SWAP_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
/** A long ease-out, as a CSS easing: the blur-rise lands softly. */
const RISE_EASE =
  "linear(0, .1945, .3591, .4971, .6115, .7052, .7808, .8409, .8877, .9233, .9497, .9686, .9816, .9901, .9952, .998, .9994, .9999, 1, 1)";

/** A rotating word: plain text animates letter by letter; any other node moves whole. */
type Word = React.ReactNode;
const asString = (w: Word) =>
  typeof w === "string" || typeof w === "number" ? String(w) : null;

/**
 * `fixed` reserves the longest word's width, so the text around the words
 * holds still; `fluid` follows the word on show, so a centred line re-centres.
 */
export type PrefixPosition = "fixed" | "fluid";

/** The word on show: `index` when controlled, otherwise one every `interval` ms. */
function useActiveIndex(count: number, interval: number, index?: number) {
  const [auto, setAuto] = useState(0);
  const controlled = index !== undefined;
  useEffect(() => {
    if (controlled || count < 2) return;
    const id = setInterval(() => setAuto((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [controlled, count, interval]);
  const n = Math.max(count, 1);
  return (((controlled ? index : auto) % n) + n) % n;
}

/** "start" when the words sit in a line of text; "inherit" when they are the whole line. */
type WordAlign = "start" | "inherit";

const clipLine = (clip?: boolean): React.CSSProperties | undefined =>
  clip ? { clipPath: "inset(0 -100vw)" } : undefined;

/** Where the rotating words sit; see `PrefixPosition`. `clip` cuts off words sliding above or below the line. */
function WordSlot({
  words,
  position,
  align,
  clip,
  children,
}: {
  words: Word[];
  position: PrefixPosition;
  align: WordAlign;
  clip?: boolean;
  children: React.ReactNode;
}) {
  const alignClass = align === "start" ? "text-start" : undefined;
  if (position === "fluid") {
    return (
      <FluidWidth className={alignClass} style={clipLine(clip)}>
        {children}
      </FluidWidth>
    );
  }
  return (
    <span className={cn("relative inline-grid", alignClass)} style={clipLine(clip)}>
      {words.map((w, i) => (
        <span key={i} className="invisible col-start-1 row-start-1">
          {w}
        </span>
      ))}
      <span className="col-start-1 row-start-1">{children}</span>
    </span>
  );
}

/**
 * As wide as its content, easing between widths as the content changes, so
 * the text beside it glides to its new place rather than jumping there.
 */
function FluidWidth({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const inner = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>();
  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <span
      className={cn("relative inline-block", className)}
      style={{ ...style, width, transition: `width 0.45s ${FLIP_EASE}` }}
    >
      {/* max-content, so the box narrowing around it never wraps what it measures */}
      <span ref={inner} className="relative inline-block w-max">
        {children}
      </span>
    </span>
  );
}

interface RotatorProps {
  words: Word[];
  interval: number;
  index?: number;
  speed: number;
  delay: number;
  position: PrefixPosition;
  align: WordAlign;
}

/**
 * The word on screen leaves letter by letter; the next one comes in only
 * once the last letter has settled.
 */
function LetterBounceWords({ words, interval, index, speed, delay, position, align }: RotatorProps) {
  const active = useActiveIndex(words.length, interval, index);
  const [shown, setShown] = useState(active);
  const latest = useRef(active);
  latest.current = active;
  const leaving = shown !== active;
  // Only the first word waits for `delay`.
  const cycled = useRef(false);
  if (leaving) cycled.current = true;
  const lead = cycled.current ? 0 : delay;
  const word = words[shown] ?? words[0];
  const text = asString(word);

  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(
      () => setShown(latest.current),
      Math.max(300, ((text?.length ?? 1) - 1) * 20 * speed + BOUNCE_REST_MS),
    );
    return () => window.clearTimeout(t);
  }, [leaving, text, speed]);

  return (
    <WordSlot words={words} position={position} align={align} clip>
      <span
        key={shown}
        className="inline-flex"
        style={{
          animation: leaving
            ? `typo-word-out 0.3s ${FADE_EASE} forwards`
            : `typo-word-in 0.3s ${FADE_EASE} ${lead}ms backwards`,
        }}
      >
        {text === null
          ? word
          : text.split("").map((char, i) => (
              <span
                key={i}
                className="inline-block whitespace-pre"
                style={{
                  animation: leaving
                    ? `typo-char-out ${BOUNCE_SPRING_MS}ms ${BOUNCE_SPRING} ${i * 20 * speed}ms both`
                    : `typo-char-in ${BOUNCE_SPRING_MS}ms ${BOUNCE_SPRING} ${lead + i * 40 * speed}ms backwards`,
                }}
              >
                {char}
              </span>
            ))}
      </span>
    </WordSlot>
  );
}

/** Coloured by `--typo-caret` when set, otherwise the text colour. */
const Caret = () => (
  <span
    className="animate-pulse font-mono font-light ml-px"
    style={{ color: "var(--typo-caret, currentColor)" }}
  >
    |
  </span>
);

/** Types each word, holds it, deletes it, and moves on, behind a blinking caret. */
function TypewriterWords({
  words,
  hold,
  speed,
  delay,
  position,
  align,
}: Omit<RotatorProps, "interval" | "index"> & { hold: number }) {
  const [started, setStarted] = useState(delay <= 0);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const word = words[index % words.length];
  const text = asString(word);
  // A node that is not text types as a single stroke.
  const length = text === null ? 1 : text.length;

  useEffect(() => {
    if (!started) {
      const t = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(t);
    }
    // Reduced motion types and deletes whole words at once.
    const whole = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let wait: number;
    let next: () => void;
    if (!deleting && count < length) {
      wait = whole ? 0 : 100 * speed;
      next = () => setCount(whole ? length : count + 1);
    } else if (!deleting) {
      wait = hold;
      next = () => setDeleting(true);
    } else {
      wait = whole ? 0 : 60 * speed;
      next = () => {
        const left = whole ? 0 : count - 1;
        if (left <= 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        }
        setCount(Math.max(0, left));
      };
    }
    const t = setTimeout(next, wait);
    return () => clearTimeout(t);
  }, [started, delay, count, deleting, length, words.length, hold, speed]);

  const typed =
    text === null ? (
      count > 0 ? word : null
    ) : (
      <span className="whitespace-pre">{text.slice(0, count)}</span>
    );

  // Fluid is the typed text's own width, so a centred line re-centres a
  // letter at a time.
  if (position === "fluid") {
    return (
      <span className="inline-flex items-baseline">
        {typed}
        <Caret />
      </span>
    );
  }
  return (
    <span className={cn("relative inline-grid", align === "start" && "text-start")}>
      {words.map((w, i) => (
        <span key={i} className="invisible col-start-1 row-start-1">
          {w}
          <Caret />
        </span>
      ))}
      <span className="col-start-1 row-start-1">
        {typed}
        <Caret />
      </span>
    </span>
  );
}

/** The word on screen slides up and out, and only then does the next one slide up in. */
function WordFlipWords({ words, interval, index, speed, position, align }: RotatorProps) {
  const active = useActiveIndex(words.length, interval, index);
  const [shown, setShown] = useState(active);
  const [swapped, setSwapped] = useState(false);
  const latest = useRef(active);
  latest.current = active;
  const leaving = shown !== active;
  const duration = 0.45 * speed;
  const swapIn = () => {
    setShown(latest.current);
    setSwapped(true);
  };

  // In case the leaving word's animationend never arrives.
  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(swapIn, duration * 1000 + 150);
    return () => window.clearTimeout(t);
  }, [leaving, duration]);

  return (
    <WordSlot words={words} position={position} align={align} clip>
      <span
        key={shown}
        onAnimationEnd={(e) => {
          if (leaving && e.target === e.currentTarget) swapIn();
        }}
        className="inline-block"
        style={
          leaving
            ? { animation: `typo-flip-out ${duration}s ${FLIP_EASE} forwards` }
            : swapped
              ? { animation: `typo-flip-in ${duration}s ${FLIP_EASE} backwards` }
              : undefined
        }
      >
        {words[shown] ?? words[0]}
      </span>
    </WordSlot>
  );
}

/**
 * The incoming word sharpens out of a blur as the outgoing one lifts away
 * into one.
 */
function BlurSwapWords({ words, interval, index, speed, position, align }: RotatorProps) {
  const active = useActiveIndex(words.length, interval, index);
  const [track, setTrack] = useState<{ active: number; leaving: number | null }>({
    active,
    leaving: null,
  });
  if (track.active !== active) setTrack({ active, leaving: track.active });
  const leaving = track.leaving;
  const duration = 700 * speed;

  // The word that just left keeps its "leaving" pose until it has faded.
  useEffect(() => {
    if (leaving === null) return;
    const t = window.setTimeout(() => setTrack((s) => ({ ...s, leaving: null })), duration);
    return () => window.clearTimeout(t);
  }, [leaving, duration]);

  const transition = (lag: number) =>
    ["opacity", "transform", "filter"]
      .map((p) => `${p} ${duration}ms ${SWAP_EASE} ${lag}ms`)
      .join(", ");
  const fluid = position === "fluid";

  const cells = words.map((w, i) => {
    const state = i === active ? "active" : i === leaving ? "leaving" : "idle";
    return (
      <span
        key={i}
        // Fixed stacks every word in one cell, so the widest sizes it; fluid
        // keeps only the word on show in the flow.
        className={
          fluid
            ? state === "active"
              ? "inline-block"
              : "absolute left-0 top-0"
            : "col-start-1 row-start-1"
        }
        style={
          state === "active"
            ? { opacity: 1, transform: "none", filter: "blur(0)", transition: transition(150) }
            : state === "leaving"
              ? { opacity: 0, transform: "translateY(-12px)", filter: "blur(6px)", transition: transition(0) }
              : { opacity: 0, transform: "translateY(16px)", filter: "blur(8px)", transition: "none" }
        }
      >
        {w}
      </span>
    );
  });

  const alignClass = align === "start" ? "text-start" : undefined;
  return fluid ? (
    <FluidWidth className={alignClass}>{cells}</FluidWidth>
  ) : (
    <span className={cn("inline-grid", alignClass)}>{cells}</span>
  );
}

// ==========================================
// INTERFACES
// ==========================================
export interface AnimatedTypographyProps
  extends React.HTMLAttributes<HTMLElement> {
  as?: TypographyTag;
  variant?: TypographyVariant;
  /**
   * The text to animate, and what screen readers announce. The rotating
   * variants announce it in place of the word on show.
   */
  text?: string;
  /**
   * Rich content for the variants that move the text whole (blur-rise,
   * color-wipe), in place of `text` — a heading with an `<em>` in it, say.
   */
  children?: React.ReactNode;
  titlePrefix?: string;
  titleSuffix?: string;
  color?: TypographyColor;
  align?: TypographyAlign;
  size?: string;
  delay?: number; // Base delay in ms
  speed?: number; // Speed multiplier for staggered effects
  /**
   * The words the rotating variants (letter-bounce, typewriter, word-flip,
   * blur-swap) cycle through, between `titlePrefix` and `titleSuffix`.
   * Plain strings animate letter by letter; other nodes move whole.
   * Defaults to `[text]`.
   */
  words?: React.ReactNode[];
  /**
   * Milliseconds each word stays before the next comes in (2400). The
   * typewriter holds a finished word this long instead (1800).
   */
  interval?: number;
  /**
   * Whether the text before the rotating words holds still. `fixed` reserves
   * the longest word's width; `fluid` follows the word on show, so a centred
   * line re-centres as it changes. Defaults to `fluid` for the typewriter and
   * `fixed` for the others.
   */
  prefixPosition?: PrefixPosition;
  /**
   * Shows `words[index]` instead of stepping on a timer, for rotating words
   * kept in step with something else, like a carousel's slides. Not the
   * typewriter, which keeps its own time.
   */
  index?: number;
  /**
   * `false` renders the text at rest, without animating; the animation
   * starts when it turns `true`. For reveals that wait on something, like
   * scrolling into view.
   */
  play?: boolean;
  /**
   * Leaves the typography to `className` and the parent: no weight, size,
   * colour, alignment or padding of its own unless those props are given.
   * For composing it into a section's heading.
   */
  bare?: boolean;
}

// ==========================================
// COMPONENT
// ==========================================
export const AnimatedTypographyBlock = forwardRef<
  HTMLElement,
  AnimatedTypographyProps
>(
  (
    {
      as: Tag = "p",
      variant = "matrix-scramble",
      text: textProp,
      children,
      titlePrefix,
      titleSuffix,
      color: colorProp,
      align: alignProp,
      size,
      delay = 0,
      speed = 1,
      words: wordList,
      interval,
      prefixPosition,
      index,
      play = true,
      bare = false,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    // `as` picks the element. Every tag it allows accepts HTML attributes
    // and an HTMLElement ref, which is exactly what this says; JSX cannot
    // work that out from the union on its own.
    const Component = Tag as unknown as React.ComponentType<
      React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>
    >;

    const color = colorProp ?? (bare ? undefined : "primary");
    const align = alignProp ?? (bare ? undefined : "left");
    const { className: colorClass, style: colorStyle } = color
      ? getThemeStyles(color as string)
      : { className: undefined, style: {} };

    // Responsive Sizing (small on mobile so text fits on 1 line)
    let sizeClass = "";
    let customSizeStyle: React.CSSProperties = {};

    if (size) {
      if (tailwindSizeMap[size]) {
        sizeClass = tailwindSizeMap[size];
      } else {
        customSizeStyle = { fontSize: `clamp(10px, 3.2vw, ${size})` };
      }
    } else if (!bare) {
      const defaultSizeMap: Record<TypographyTag, string> = {
        h1: "text-base sm:text-2xl md:text-4xl lg:text-5xl",
        h2: "text-sm sm:text-xl md:text-3xl lg:text-4xl",
        h3: "text-xs sm:text-lg md:text-2xl lg:text-3xl",
        h4: "text-[11px] sm:text-base md:text-xl lg:text-2xl",
        h5: "text-[10px] sm:text-sm md:text-lg lg:text-xl",
        h6: "text-[9px] sm:text-xs md:text-base lg:text-lg",
        p: "text-[10px] sm:text-base",
        span: "text-inherit",
        blockquote: "text-[11px] sm:text-lg",
      };
      sizeClass = defaultSizeMap[Tag];
    }

    const text = textProp ?? "";
    const words = text.split(" ");
    const rotating: React.ReactNode[] = wordList?.length ? wordList : [textProp ?? children];
    const isRotating =
      variant === "letter-bounce" ||
      variant === "typewriter" ||
      variant === "word-flip" ||
      variant === "blur-swap";
    const rotator = {
      words: rotating,
      interval: interval ?? WORD_INTERVAL_MS,
      index,
      speed,
      delay,
      position: prefixPosition ?? (variant === "typewriter" ? "fluid" : "fixed"),
      // Words inside a line start where the line leaves off; words that are
      // the whole line align like it.
      align: titlePrefix || titleSuffix || Tag === "span" ? "start" : "inherit",
    } satisfies React.ComponentProps<typeof LetterBounceWords>;
    // What the text is at rest, and what screen readers hear.
    const still = isRotating
      ? (textProp ?? rotating[index ?? 0])
      : (children ?? text);

    // Render logic based on variant
    const renderContent = () => {
      if (!play) return still;
      switch (variant) {
        case "matrix-scramble":
          return <MatrixScrambleText text={text} speed={speed} delay={delay} />;

        case "color-reveal": {
          let globalCharIndex = 0;
          return (
            <span className="inline whitespace-nowrap">
              {words.map((word, wordIdx) => {
                const wordChars = word.split("");
                const wordNode = (
                  <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.2em]">
                    {wordChars.map((char) => {
                      const idx = globalCharIndex++;
                      return (
                        <span
                          key={idx}
                          className="inline-block text-muted-foreground animate-[typo-color-reveal_0.7s_cubic-bezier(0.16,1,0.3,1)_both]"
                          style={{
                            animationDelay: `${delay + idx * 45 * speed}ms`,
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                );
                globalCharIndex++;
                return wordNode;
              })}
            </span>
          );
        }

        case "wavy-float": {
          let globalCharIndex = 0;
          return (
            <span className="inline whitespace-nowrap">
              {words.map((word, wordIdx) => {
                const wordChars = word.split("");
                const wordNode = (
                  <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.2em]">
                    {wordChars.map((char) => {
                      const idx = globalCharIndex++;
                      return (
                        <span
                          key={idx}
                          className="inline-block animate-[typo-wavy_2s_ease-in-out_infinite]"
                          style={{
                            animationDelay: `${delay + idx * 80 * speed}ms`,
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                );
                globalCharIndex++;
                return wordNode;
              })}
            </span>
          );
        }

        case "3d-perspective-flip":
          return words.map((word, i) => (
            <span key={i} className="inline-block whitespace-nowrap perspective-[1000px] mr-[0.2em]">
              <span
                className="inline-block origin-bottom animate-[typo-perspective_0.75s_cubic-bezier(0.34,1.56,0.64,1)_both]"
                style={{ animationDelay: `${delay + i * 70 * speed}ms` }}
              >
                {word}
              </span>
            </span>
          ));

        case "elastic-spring":
          return words.map((word, i) => (
            <span
              key={i}
              className="inline-block whitespace-nowrap animate-[typo-elastic_0.8s_cubic-bezier(0.68,-0.55,0.265,1.55)_both] mr-[0.2em]"
              style={{ animationDelay: `${delay + i * 65 * speed}ms` }}
            >
              {word}
            </span>
          ));

        case "spotlight-reveal":
          return words.map((word, i) => (
            <span
              key={i}
              className="inline-block whitespace-nowrap animate-[typo-spotlight_1s_cubic-bezier(0.16,1,0.3,1)_both] mr-[0.2em]"
              style={{ animationDelay: `${delay + i * 80 * speed}ms` }}
            >
              {word}
            </span>
          ));

        case "split-stagger": {
          let globalCharIndex = 0;
          return (
            <span className="inline whitespace-nowrap">
              {words.map((word, wordIdx) => {
                const wordChars = word.split("");
                const wordNode = (
                  <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.2em]">
                    {wordChars.map((char) => {
                      const idx = globalCharIndex++;
                      const isEven = idx % 2 === 0;
                      return (
                        <span
                          key={idx}
                          className={cn(
                            "inline-block",
                            isEven
                              ? "animate-[typo-split-top_0.7s_cubic-bezier(0.16,1,0.3,1)_both]"
                              : "animate-[typo-split-bottom_0.7s_cubic-bezier(0.16,1,0.3,1)_both]",
                          )}
                          style={{
                            animationDelay: `${delay + idx * 35 * speed}ms`,
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                );
                globalCharIndex++;
                return wordNode;
              })}
            </span>
          );
        }

        case "underline-draw":
          return (
            <span className="relative inline-block max-w-full pb-2 whitespace-nowrap">
              <span className="inline-block max-w-full whitespace-nowrap animate-[typo-fade_0.6s_ease-out_both]" style={{ animationDelay: `${delay}ms` }}>
                {text}
              </span>
              <svg
                className="absolute left-0 bottom-0 w-full h-3 overflow-visible text-primary pointer-events-none"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                {/* Draws itself in: `pathLength="1"` makes the dash pattern
                    a fraction of the curve, so a dash growing 0 → 1 traces it. */}
                <path
                  d="M0,5 Q50,12 100,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  pathLength={1}
                  className="animate-[typo-underline-draw_0.9s_cubic-bezier(0,0,0.58,1)_backwards]"
                  style={{
                    animationDuration: `${0.9 * speed}s`,
                    animationDelay: `${delay / 1000 + 0.2}s`,
                  }}
                />
              </svg>
            </span>
          );

        case "letter-bounce":
          return <LetterBounceWords {...rotator} />;

        case "typewriter": {
          const { interval: _interval, index: _index, ...rest } = rotator;
          return <TypewriterWords {...rest} hold={interval ?? TYPEWRITER_HOLD_MS} />;
        }

        case "word-flip":
          return <WordFlipWords {...rotator} />;

        case "blur-swap":
          return <BlurSwapWords {...rotator} />;

        case "blur-rise":
          return (
            <span
              className="inline-block"
              style={{
                animation: `typo-blur-rise ${0.8 * speed}s ${RISE_EASE} ${delay}ms backwards`,
              }}
            >
              {children ?? text}
            </span>
          );

        case "color-wipe":
          // Two copies clipped at the same moving edge: the coloured one is
          // uncovered from the left as the foreground one is cut away, so the
          // two never stack and only the coloured copy is left at the end.
          return (
            <span className="relative inline-block">
              <span
                className="inline-block"
                style={{
                  animation: `typo-wipe-in ${1.4 * speed}s ease-in-out ${delay}ms both`,
                }}
              >
                {children ?? text}
              </span>
              <span
                className="absolute inset-0 text-foreground"
                style={{
                  animation: `typo-wipe-out ${1.4 * speed}s ease-in-out ${delay}ms both`,
                }}
              >
                {children ?? text}
              </span>
            </span>
          );

        default:
          return still;
      }
    };

    return (
      <>
        <style>{`
          @keyframes typo-color-reveal {
            0% {
              color: color-mix(in oklab, var(--muted-foreground) 40%, transparent);
              opacity: 0.5;
            }
            100% {
              color: inherit;
              opacity: 1;
            }
          }
          @keyframes typo-wavy {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes typo-perspective {
            0% { opacity: 0; transform: rotateX(-90deg) scale(0.8); }
            100% { opacity: 1; transform: rotateX(0deg) scale(1); }
          }
          @keyframes typo-elastic {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 0.8; transform: scale(1.15); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes typo-spotlight {
            0% { opacity: 0; filter: blur(14px); transform: scale(0.9) translateY(6px); }
            100% { opacity: 1; filter: blur(0px); transform: scale(1) translateY(0); }
          }
          @keyframes typo-split-top {
            0% { opacity: 0; transform: translateY(-100%); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes typo-split-bottom {
            0% { opacity: 0; transform: translateY(100%); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes typo-underline-draw {
            0% { stroke-dasharray: 0px 1px; opacity: 0; }
            100% { stroke-dasharray: 1px 1px; opacity: 1; }
          }
          @keyframes typo-fade {
            0% { opacity: 0; transform: translateY(4px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes typo-word-in { from { opacity: 0; } }
          @keyframes typo-word-out { to { opacity: 0; } }
          @keyframes typo-char-in { from { opacity: 0; transform: translateY(24px) scale(0.5); } }
          @keyframes typo-char-out { to { opacity: 0; transform: translateY(-24px) scale(0.5); } }
          @keyframes typo-flip-out { to { transform: translateY(-100%); opacity: 0; } }
          @keyframes typo-flip-in { from { transform: translateY(100%); opacity: 0; } }
          @keyframes typo-blur-rise { from { opacity: 0; transform: translateY(18px); filter: blur(8px); } }
          @keyframes typo-wipe-in {
            from { clip-path: inset(-0.2em 100% -0.2em -0.1em); }
            to { clip-path: inset(-0.2em -0.1em -0.2em -0.1em); }
          }
          @keyframes typo-wipe-out {
            from { clip-path: inset(-0.2em -0.1em -0.2em -0.1em); }
            to { clip-path: inset(-0.2em -0.1em -0.2em 100%); }
          }
          @media (prefers-reduced-motion: reduce) {
            [data-typo-root] *, [data-typo-root] *::before, [data-typo-root] *::after {
              animation-duration: 0.01ms !important;
              animation-delay: 0ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              transition-delay: 0ms !important;
            }
          }
        `}</style>

        <Component
          ref={ref}
          data-typo-root=""
          className={cn(
            !bare && baseStyles[Tag],
            align && alignStyles[align],
            sizeClass,
            colorClass,
            className,
          )}
          style={{ ...colorStyle, ...customSizeStyle, ...style }}
          {...props}
        >
          <span className="sr-only">
            {titlePrefix}
            {still}
            {titleSuffix}
          </span>
          <span
            aria-hidden="true"
            className={
              bare
                ? undefined
                : "inline-block w-full max-w-full whitespace-nowrap overflow-visible py-2"
            }
          >
            {titlePrefix}
            {renderContent()}
            {titleSuffix}
          </span>
        </Component>
      </>
    );
  },
);
AnimatedTypographyBlock.displayName = "AnimatedTypographyBlock";
