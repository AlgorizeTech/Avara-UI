"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

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
  | "underline-draw";

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

const colorThemes: Record<string, string> = {
  primary: "text-primary",
  indigo: "text-indigo-600 dark:text-indigo-400",
  rose: "text-rose-600 dark:text-rose-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  zinc: "text-zinc-900 dark:text-zinc-100",
  default: "text-primary",
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      className: "text-[var(--typo-color)]",
      style: {
        "--typo-color": color,
        "--typo-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { className: colorThemes[color] || colorThemes.primary, style: {} };
};

const alignStyles: Record<TypographyAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const baseStyles: Record<TypographyTag, string> = {
  h1: "font-extrabold tracking-tight leading-snug whitespace-nowrap max-w-full overflow-visible",
  h2: "font-bold tracking-tight leading-snug whitespace-nowrap max-w-full overflow-visible",
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
// INTERFACES
// ==========================================
export interface AnimatedTypographyProps
  extends React.HTMLAttributes<HTMLElement> {
  as?: TypographyTag;
  variant?: TypographyVariant;
  text: string;
  titlePrefix?: string;
  titleSuffix?: string;
  color?: TypographyColor;
  align?: TypographyAlign;
  size?: string;
  delay?: number; // Base delay in ms
  speed?: number; // Speed multiplier for staggered effects
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
      text,
      titlePrefix,
      titleSuffix,
      color = "primary",
      align = "left",
      size,
      delay = 0,
      speed = 1,
      className,
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

    const { className: colorClass, style: colorStyle } = getThemeStyles(
      color as string,
    );

    // Responsive Sizing (small on mobile so text fits on 1 line)
    let sizeClass = "";
    let customSizeStyle: React.CSSProperties = {};

    if (size) {
      if (tailwindSizeMap[size]) {
        sizeClass = tailwindSizeMap[size];
      } else {
        customSizeStyle = { fontSize: `clamp(10px, 3.2vw, ${size})` };
      }
    } else {
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

    const words = text.split(" ");

    // Render logic based on variant
    const renderContent = () => {
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
                          className="inline-block text-slate-400 dark:text-zinc-600 animate-[typo-color-reveal_0.7s_cubic-bezier(0.16,1,0.3,1)_both]"
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
                <motion.path
                  d="M0,5 Q50,12 100,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 0.9 * speed,
                    delay: delay / 1000 + 0.2,
                    ease: "easeOut",
                  }}
                />
              </svg>
            </span>
          );

        default:
          return text;
      }
    };

    return (
      <>
        <style>{`
          @keyframes typo-color-reveal {
            0% {
              color: rgb(148 163 184 / 0.4);
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
          @keyframes typo-fade {
            0% { opacity: 0; transform: translateY(4px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <Component
          ref={ref}
          className={cn(
            baseStyles[Tag],
            alignStyles[align],
            sizeClass,
            colorClass,
            className,
          )}
          style={{ ...colorStyle, ...customSizeStyle }}
          {...props}
        >
          <span className="sr-only">
            {titlePrefix}
            {text}
            {titleSuffix}
          </span>
          <span aria-hidden="true" className="inline-block w-full max-w-full whitespace-nowrap overflow-visible py-2">
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
