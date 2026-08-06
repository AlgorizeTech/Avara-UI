"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useId, useState } from "react";

// ==========================================
// THEME & CONFIGURATION
// ==========================================
export type TypographyVariant =
  | "fade-up"
  | "blur-in"
  | "typewriter"
  | "glitch"
  | "glow"
  | "flip-up"
  | "reveal"
  | "pop-in"
  | "none";
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

// Fallback base styles for tags if no custom size is provided
const tagBaseStyles: Record<TypographyTag, string> = {
  h1: "font-extrabold tracking-tight leading-[1.1]",
  h2: "font-bold tracking-tight",
  h3: "font-semibold tracking-tight",
  h4: "font-semibold tracking-tight",
  h5: "font-medium",
  h6: "font-medium",
  p: "leading-relaxed",
  span: "",
  blockquote: "pl-6 italic border-l-4 border-zinc-300 dark:border-zinc-700",
};

// Map of valid tailwind text sizes
const tailwindSizes = new Set([
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
]);

// ==========================================
// INTERFACES
// ==========================================
export interface AnimatedTypographyProps
  extends React.HTMLAttributes<HTMLElement> {
  as?: TypographyTag;
  variant?: TypographyVariant;
  text: string;
  color?: TypographyColor;
  align?: TypographyAlign;
  size?: string; // Can be a tailwind size (e.g. "3xl") or exact value (e.g. "24px", "2rem")
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
      variant = "fade-up",
      text,
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

    // Typewriter State
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
      if (variant === "typewriter") {
        setDisplayedText("");
        setIsTyping(true);
        let currentIndex = 0;

        const timeout = setTimeout(() => {
          const interval = setInterval(() => {
            if (currentIndex <= text.length) {
              setDisplayedText(text.slice(0, currentIndex));
              currentIndex++;
            } else {
              clearInterval(interval);
              setIsTyping(false);
            }
          }, 30 * speed);
          return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
      }
    }, [text, variant, delay, speed]);

    // Smart Sizing Logic
    let sizeClass = "";
    let customSizeStyle: React.CSSProperties = {};

    if (size) {
      if (tailwindSizes.has(size)) {
        sizeClass = `text-${size}`;
      } else {
        customSizeStyle = { fontSize: size };
      }
    } else {
      // Default fallbacks if no size is explicitly passed
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

    // Split text into words for staggered animations
    const words = text.split(" ");

    // Render logic based on variant
    const renderContent = () => {
      switch (variant) {
        case "fade-up":
          return words.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom pb-1 -mb-1"
            >
              <span
                className="inline-block animate-[typo-slide-up_0.6s_cubic-bezier(0.16,1,0.3,1)_both]"
                style={{ animationDelay: `${delay + i * 60 * speed}ms` }}
              >
                {word}&nbsp;
              </span>
            </span>
          ));

        case "reveal":
          return words.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom pb-1 -mb-1"
            >
              <span
                className="inline-block animate-[typo-reveal_0.7s_cubic-bezier(0.77,0,0.175,1)_both]"
                style={{ animationDelay: `${delay + i * 50 * speed}ms` }}
              >
                {word}&nbsp;
              </span>
            </span>
          ));

        case "flip-up":
          return words.map((word, i) => (
            <span key={i} className="inline-block perspective-[1000px]">
              <span
                className="inline-block origin-bottom animate-[typo-flip-up_0.8s_cubic-bezier(0.175,0.885,0.32,1.275)_both]"
                style={{ animationDelay: `${delay + i * 80 * speed}ms` }}
              >
                {word}&nbsp;
              </span>
            </span>
          ));

        case "blur-in":
          return words.map((word, i) => (
            <span
              key={i}
              className="inline-block animate-[typo-blur-in_0.8s_ease-out_both]"
              style={{ animationDelay: `${delay + i * 80 * speed}ms` }}
            >
              {word}&nbsp;
            </span>
          ));

        case "pop-in":
          return words.map((word, i) => (
            <span
              key={i}
              className="inline-block animate-[typo-pop-in_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)_both]"
              style={{ animationDelay: `${delay + i * 50 * speed}ms` }}
            >
              {word}&nbsp;
            </span>
          ));

        case "typewriter":
          return (
            <>
              {displayedText}
              <span
                className={cn(
                  "inline-block w-[0.1em] h-[1em] ml-1 align-middle bg-current transition-opacity duration-100",
                  isTyping
                    ? "animate-[pulse_0.1s_ease-in-out_infinite]"
                    : "animate-[pulse_1s_ease-in-out_infinite]",
                )}
              />
            </>
          );

        case "glitch":
          return (
            <>
              <style>{`
                .typo-glitch-${uniqueId} { position: relative; display: inline-block; }
                .typo-glitch-${uniqueId}::before,
                .typo-glitch-${uniqueId}::after {
                  content: attr(data-text);
                  position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8;
                }
                .typo-glitch-${uniqueId}::before {
                  left: 2px; text-shadow: -2px 0 red; clip: rect(24px, 550px, 90px, 0);
                  animation: glitch-anim-2 3s infinite linear alternate-reverse;
                }
                .typo-glitch-${uniqueId}::after {
                  left: -2px; text-shadow: -2px 0 blue; clip: rect(85px, 550px, 140px, 0);
                  animation: glitch-anim 2.5s infinite linear alternate-reverse;
                }
                @keyframes glitch-anim {
                  0% { clip: rect(10px, 9999px, 44px, 0); }
                  20% { clip: rect(85px, 9999px, 140px, 0); }
                  40% { clip: rect(12px, 9999px, 89px, 0); }
                  60% { clip: rect(65px, 9999px, 10px, 0); }
                  80% { clip: rect(9px, 9999px, 53px, 0); }
                  100% { clip: rect(78px, 9999px, 110px, 0); }
                }
                @keyframes glitch-anim-2 {
                  0% { clip: rect(65px, 9999px, 100px, 0); }
                  20% { clip: rect(10px, 9999px, 50px, 0); }
                  40% { clip: rect(80px, 9999px, 20px, 0); }
                  60% { clip: rect(30px, 9999px, 90px, 0); }
                  80% { clip: rect(90px, 9999px, 40px, 0); }
                  100% { clip: rect(20px, 9999px, 70px, 0); }
                }
              `}</style>
              <span className={`typo-glitch-${uniqueId}`} data-text={text}>
                {text}
              </span>
            </>
          );

        case "glow":
          return (
            <span
              className={cn(
                "animate-[typo-glow_3s_ease-in-out_infinite_alternate]",
              )}
              style={{
                textShadow:
                  color === "default"
                    ? "0 0 20px rgba(255,255,255,0.5)"
                    : "0 0 20px var(--typo-color, currentColor)",
              }}
            >
              {text}
            </span>
          );

        case "none":
        default:
          return text;
      }
    };

    return (
      <>
        <style>{`
          @keyframes typo-slide-up {
            0% { opacity: 0; transform: translateY(100%); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes typo-reveal {
            0% { transform: translateY(100%); }
            100% { transform: translateY(0); }
          }
          @keyframes typo-flip-up {
            0% { opacity: 0; transform: rotateX(-90deg); }
            100% { opacity: 1; transform: rotateX(0deg); }
          }
          @keyframes typo-blur-in {
            0% { opacity: 0; filter: blur(12px); transform: scale(0.95); }
            100% { opacity: 1; filter: blur(0px); transform: scale(1); }
          }
          @keyframes typo-pop-in {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes typo-glow {
            0% { filter: brightness(1); }
            100% { filter: brightness(1.5); }
          }
        `}</style>

        <Tag
          ref={ref as any}
          className={cn(
            tagBaseStyles[Tag],
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
