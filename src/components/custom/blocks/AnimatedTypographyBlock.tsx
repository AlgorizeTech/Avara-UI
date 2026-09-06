"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  h1: "font-extrabold tracking-tight leading-[1.1] break-words",
  h2: "font-bold tracking-tight break-words",
  h3: "font-semibold tracking-tight break-words",
  h4: "font-semibold tracking-tight break-words",
  h5: "font-medium break-words",
  h6: "font-medium break-words",
  p: "leading-relaxed break-words",
  span: "break-words",
  blockquote: "pl-4 sm:pl-6 italic border-l-4 border-border break-words",
};

// Map of valid tailwind text sizes to responsive scaling classes
const tailwindSizeMap: Record<string, string> = {
  xs: "text-xs",
  sm: "text-xs sm:text-sm",
  base: "text-xs sm:text-base",
  lg: "text-sm sm:text-lg",
  xl: "text-base sm:text-xl",
  "2xl": "text-lg sm:text-2xl",
  "3xl": "text-xl sm:text-3xl",
  "4xl": "text-2xl sm:text-4xl",
  "5xl": "text-2xl sm:text-4xl lg:text-5xl",
  "6xl": "text-3xl sm:text-5xl lg:text-6xl",
  "7xl": "text-3xl sm:text-5xl lg:text-7xl",
  "8xl": "text-4xl sm:text-6xl lg:text-8xl",
  "9xl": "text-4xl sm:text-7xl lg:text-9xl",
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

  return <span>{displayText || text}</span>;
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
    const { className: colorClass, style: colorStyle } = getThemeStyles(
      color as string,
    );
    const uniqueId = useId().replace(/:/g, "");

    // Responsive Sizing
    let sizeClass = "";
    let customSizeStyle: React.CSSProperties = {};

    if (size) {
      if (tailwindSizeMap[size]) {
        sizeClass = tailwindSizeMap[size];
      } else {
        customSizeStyle = { fontSize: size };
      }
    } else {
      const defaultSizeMap: Record<TypographyTag, string> = {
        h1: "text-xl sm:text-3xl md:text-4xl lg:text-6xl",
        h2: "text-lg sm:text-2xl md:text-3xl lg:text-4xl",
        h3: "text-base sm:text-xl md:text-2xl lg:text-3xl",
        h4: "text-sm sm:text-lg md:text-xl lg:text-2xl",
        h5: "text-xs sm:text-base md:text-lg lg:text-xl",
        h6: "text-xs sm:text-sm md:text-base lg:text-lg",
        p: "text-xs sm:text-base",
        span: "text-inherit",
        blockquote: "text-sm sm:text-lg",
      };
      sizeClass = defaultSizeMap[Tag];
    }

    const words = text.split(" ");

    // Render logic based on variant
    const renderContent = () => {
      switch (variant) {
        case "matrix-scramble":
          return <MatrixScrambleText text={text} speed={speed} delay={delay} />;

        case "color-reveal":
          return text.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block text-slate-400 dark:text-zinc-600 animate-[typo-color-reveal_0.7s_cubic-bezier(0.16,1,0.3,1)_both]"
              style={{
                animationDelay: `${delay + i * 45 * speed}ms`,
                whiteSpace: char === " " ? "pre" : "normal",
              }}
            >
              {char}
            </span>
          ));

        case "wavy-float":
          return text.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block animate-[typo-wavy_2s_ease-in-out_infinite]"
              style={{
                animationDelay: `${delay + i * 80 * speed}ms`,
                whiteSpace: char === " " ? "pre" : "normal",
              }}
            >
              {char}
            </span>
          ));

        case "3d-perspective-flip":
          return words.map((word, i) => (
            <span key={i} className="inline-block perspective-[1000px] mr-[0.25em]">
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
              className="inline-block animate-[typo-elastic_0.8s_cubic-bezier(0.68,-0.55,0.265,1.55)_both] mr-[0.25em]"
              style={{ animationDelay: `${delay + i * 65 * speed}ms` }}
            >
              {word}
            </span>
          ));

        case "spotlight-reveal":
          return words.map((word, i) => (
            <span
              key={i}
              className="inline-block animate-[typo-spotlight_1s_cubic-bezier(0.16,1,0.3,1)_both] mr-[0.25em]"
              style={{ animationDelay: `${delay + i * 80 * speed}ms` }}
            >
              {word}
            </span>
          ));

        case "split-stagger":
          return text.split("").map((char, i) => {
            const isEven = i % 2 === 0;
            return (
              <span
                key={i}
                className={cn(
                  "inline-block",
                  isEven
                    ? "animate-[typo-split-top_0.7s_cubic-bezier(0.16,1,0.3,1)_both]"
                    : "animate-[typo-split-bottom_0.7s_cubic-bezier(0.16,1,0.3,1)_both]",
                )}
                style={{
                  animationDelay: `${delay + i * 35 * speed}ms`,
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </span>
            );
          });

        case "underline-draw":
          return (
            <span className="relative inline-block pb-2">
              <span className="inline-block animate-[typo-fade_0.6s_ease-out_both]" style={{ animationDelay: `${delay}ms` }}>
                {text}
              </span>
              <svg
                className="absolute left-0 bottom-0 w-full h-3 overflow-visible text-primary"
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
            50% { transform: translateY(-8px); }
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

        <Tag
          ref={ref as any}
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
          <span className="sr-only">{text}</span>
          <span aria-hidden="true" className="inline-block w-full">
            {renderContent()}
          </span>
        </Tag>
      </>
    );
  },
);
AnimatedTypographyBlock.displayName = "AnimatedTypographyBlock";

