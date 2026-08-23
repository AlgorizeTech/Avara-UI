"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  | "word-bounce"
  | "word-zoom"
  | "word-slide"
  | "char-wave"
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

const baseStyles: Record<TypographyTag, string> = {
  h1: "font-extrabold tracking-tight leading-[1.1] break-words",
  h2: "font-bold tracking-tight break-words",
  h3: "font-semibold tracking-tight break-words",
  h4: "font-semibold tracking-tight break-words",
  h5: "font-medium break-words",
  h6: "font-medium break-words",
  p: "leading-relaxed break-words",
  span: "break-words",
  blockquote: "pl-4 sm:pl-6 italic border-l-4 border-zinc-300 dark:border-zinc-700 break-words",
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
      variant = "fade-up",
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

    // Typewriter & Word Bounce States
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [wordBounceIndex, setWordBounceIndex] = useState(0);

    const bounceWords = React.useMemo(() => {
      return text.split(",").map((w) => w.trim()).filter(Boolean);
    }, [text]);

    useEffect(() => {
      if (
        (variant === "word-bounce" ||
          variant === "word-zoom" ||
          variant === "word-slide" ||
          variant === "char-wave") &&
        bounceWords.length > 0
      ) {
        const interval = setInterval(() => {
          setWordBounceIndex((prev) => (prev + 1) % bounceWords.length);
        }, 2400 * speed);
        return () => clearInterval(interval);
      }
    }, [variant, bounceWords, speed]);

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

    // Smart Sizing Logic with Responsive Scaling
    let sizeClass = "";
    let customSizeStyle: React.CSSProperties = {};

    if (size) {
      if (tailwindSizeMap[size]) {
        sizeClass = tailwindSizeMap[size];
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

        case "word-bounce": {
          const currentBounceWord = bounceWords[wordBounceIndex] || "";
          return (
            <span className="inline-flex items-center justify-start flex-wrap gap-x-2">
              {titlePrefix && <span className="shrink-0 text-foreground">{titlePrefix}</span>}
              <span className="relative inline-flex items-center justify-start overflow-hidden py-0.5 h-[1.3em] w-[140px] xs:w-[165px] sm:w-[170px] md:w-[210px] lg:w-[270px] xl:w-[330px] shrink-0">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentBounceWord}
                    initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                      mass: 0.8,
                    }}
                    className="inline-block text-left whitespace-nowrap"
                  >
                    {currentBounceWord}
                  </motion.span>
                </AnimatePresence>
              </span>
              {titleSuffix && <span className="shrink-0 text-foreground">{titleSuffix}</span>}
            </span>
          );
        }

        case "word-zoom": {
          const currentBounceWord = bounceWords[wordBounceIndex] || "";
          return (
            <span className="inline-flex items-center justify-start flex-wrap gap-x-2">
              {titlePrefix && <span className="shrink-0 text-foreground">{titlePrefix}</span>}
              <span className="relative inline-flex items-center justify-start overflow-hidden py-0.5 h-[1.3em] w-[140px] xs:w-[165px] sm:w-[170px] md:w-[210px] lg:w-[270px] xl:w-[330px] shrink-0">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentBounceWord}
                    initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.3, filter: "blur(12px)" }}
                    transition={{
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block text-left whitespace-nowrap"
                  >
                    {currentBounceWord}
                  </motion.span>
                </AnimatePresence>
              </span>
              {titleSuffix && <span className="shrink-0 text-foreground">{titleSuffix}</span>}
            </span>
          );
        }

        case "word-slide": {
          const currentBounceWord = bounceWords[wordBounceIndex] || "";
          return (
            <span className="inline-flex items-center justify-start flex-wrap gap-x-2">
              {titlePrefix && <span className="shrink-0 text-foreground">{titlePrefix}</span>}
              <span className="relative inline-flex items-center justify-start overflow-hidden py-0.5 h-[1.3em] w-[140px] xs:w-[165px] sm:w-[170px] md:w-[210px] lg:w-[270px] xl:w-[330px] shrink-0">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentBounceWord}
                    initial={{ x: 40, opacity: 0, filter: "blur(6px)" }}
                    animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ x: -40, opacity: 0, filter: "blur(6px)" }}
                    transition={{
                      duration: 0.55,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="inline-block text-left whitespace-nowrap"
                  >
                    {currentBounceWord}
                  </motion.span>
                </AnimatePresence>
              </span>
              {titleSuffix && <span className="shrink-0 text-foreground">{titleSuffix}</span>}
            </span>
          );
        }

        case "char-wave": {
          const currentBounceWord = bounceWords[wordBounceIndex] || "";
          return (
            <span className="inline-flex items-center justify-start flex-wrap gap-x-2">
              {titlePrefix && <span className="shrink-0 text-foreground">{titlePrefix}</span>}
              <span className="relative inline-flex items-center justify-start overflow-hidden py-0.5 h-[1.3em] w-[140px] xs:w-[165px] sm:w-[170px] md:w-[210px] lg:w-[270px] xl:w-[330px] shrink-0">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentBounceWord}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={{
                      initial: { opacity: 0 },
                      animate: { opacity: 1, transition: { staggerChildren: 0.04 * speed } },
                      exit: { opacity: 0, transition: { staggerChildren: 0.02 * speed } },
                    }}
                    className="inline-flex text-left whitespace-nowrap"
                  >
                    {currentBounceWord.split("").map((char, index) => (
                      <motion.span
                        key={index}
                        variants={{
                          initial: { y: 24, opacity: 0, scale: 0.5 },
                          animate: { y: 0, opacity: 1, scale: 1 },
                          exit: { y: -24, opacity: 0, scale: 0.5 },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 25,
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              </span>
              {titleSuffix && <span className="shrink-0 text-foreground">{titleSuffix}</span>}
            </span>
          );
        }

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
