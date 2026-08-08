"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  Copy,
  Github,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";

/* ═══════════════════════════════════════════════
   TYPES & INTERFACES
   ═══════════════════════════════════════════════ */

export interface HomepageHeroTypingBlockProps
  extends React.HTMLAttributes<HTMLElement> {
  badgeText?: string;
  badgeHref?: string;
  titlePrefix?: string;
  typingWords?: string[];
  titleSuffix?: string;
  subtitle?: string;
  cliCommand?: string;
  primaryActionLabel?: string;
  primaryActionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  color?: string;
}

/* ═══════════════════════════════════════════════
   TYPING HERO BLOCK COMPONENT
   ═══════════════════════════════════════════════ */

export const HomepageHeroTypingBlock = forwardRef<
  HTMLElement,
  HomepageHeroTypingBlockProps
>(
  (
    {
      badgeText = "Next-Gen React Components",
      badgeHref = "/docs",
      titlePrefix = "Build ",
      typingWords = [
        "Exceptional",
        "Interactive",
        "Animated",
        "Responsive",
        "Modern",
      ],
      titleSuffix = " Interfaces.",
      subtitle = "A meticulous library of copy-paste React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Framer Motion.",
      cliCommand = "npx docs-ui@latest init",
      primaryActionLabel = "Browse Components",
      primaryActionHref = "/docs",
      secondaryActionLabel = "Star on GitHub",
      secondaryActionHref = "https://github.com/AlgorizeTech",
      color,
      className,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      if (!typingWords || typingWords.length === 0) return;
      const targetWord = typingWords[currentWordIndex];
      const typingSpeed = isDeleting ? 60 : 100;

      const timer = setTimeout(() => {
        if (!isDeleting) {
          setCurrentText(targetWord.slice(0, currentText.length + 1));
          if (currentText.length + 1 === targetWord.length) {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          setCurrentText(targetWord.slice(0, currentText.length - 1));
          if (currentText.length - 1 === 0) {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
          }
        }
      }, typingSpeed);

      return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, typingWords]);

    const handleCopy = () => {
      if (typeof window !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(cliCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    const getAccentColor = (col?: string) => {
      if (!col || col === "primary" || col === "default") return undefined;
      const presets: Record<string, string> = {
        indigo: "#6366f1",
        rose: "#f43f5e",
        emerald: "#10b981",
        zinc: "#18181b",
      };
      return presets[col] || col;
    };

    const resolvedColor = getAccentColor(color);
    const customStyle: React.CSSProperties = resolvedColor
      ? ({ "--primary": resolvedColor } as React.CSSProperties)
      : {};

    return (
      <section
        ref={ref}
        style={customStyle}
        className={cn(
          "relative w-full flex flex-col justify-center items-center overflow-hidden py-8 sm:py-12 md:py-16",
          className
        )}
        {...props}
      >
        {/* Radial Background Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, var(--primary) 0%, transparent 65%)",
            opacity: 0.12,
          }}
        />
        {/* Grid Mask Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_40%,transparent_100%)]" />

        <div className="relative z-10 max-w-[1320px] mx-auto w-full px-2 sm:px-6 md:px-8 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center text-center max-w-[1320px] mx-auto space-y-3.5 sm:space-y-6 md:space-y-7 my-auto">
            {/* Top Pill Badge */}
            {badgeText && (
              <div>
                <Link
                  href={badgeHref}
                  className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-primary/10 border border-primary/30 text-[11px] sm:text-base font-bold text-primary hover:border-primary transition-all duration-300 shadow-sm"
                >
                  <Sparkles className="size-3.5 sm:size-4 text-primary animate-spin shrink-0" />
                  <span className="truncate max-w-[180px] sm:max-w-none">
                    {badgeText}
                  </span>
                  <ArrowRight className="size-3.5 sm:size-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </Link>
              </div>
            )}

            {/* Dynamic Typing Title */}
            <h1 className="text-lg xs:text-xl sm:text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5.25rem] font-black tracking-tight leading-tight sm:leading-[1.02] text-foreground text-center w-full max-w-[1320px] mx-auto">
              {titlePrefix}
              <span className="text-primary inline-block">{currentText}</span>
              <span className="text-primary animate-pulse inline-block font-mono font-light ml-0.5 mr-1">
                |
              </span>
              {titleSuffix}
            </h1>

            {/* Subtitle Paragraph */}
            {subtitle && (
              <p className="text-xs sm:text-xl md:text-2xl text-muted-foreground w-full max-w-4xl mx-auto leading-normal sm:leading-relaxed text-center font-medium px-1 sm:px-0">
                {subtitle}
              </p>
            )}

            {/* CLI Command Box */}
            {cliCommand && (
              <div className="pt-1 w-full flex justify-center px-1 sm:px-0">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="group flex items-center gap-2.5 sm:gap-3.5 px-3 sm:px-5 h-10 sm:h-[58px] rounded-xl sm:rounded-2xl border border-border bg-card cursor-pointer w-full max-w-[280px] sm:max-w-md hover:border-primary/50 transition-all"
                >
                  <Terminal className="size-4 sm:size-5 text-primary shrink-0" />
                  <code className="text-[11px] sm:text-sm md:text-base font-mono text-foreground flex-1 text-left font-semibold truncate">
                    {cliCommand}
                  </code>
                  <div className="pl-2 sm:pl-3.5 border-l border-border h-4 sm:h-5 flex items-center shrink-0">
                    {copied ? (
                      <Check className="size-3.5 sm:size-4.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3.5 sm:size-4.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    )}
                  </div>
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 pt-1 sm:pt-2 w-full max-w-3xl mx-auto px-1 sm:px-0">
              {primaryActionLabel && (
                <Link
                  href={primaryActionHref}
                  className="px-4 sm:px-9 h-10 sm:h-[58px] rounded-xl sm:rounded-2xl bg-primary text-primary-foreground text-xs sm:text-base md:text-lg font-bold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 sm:gap-2.5 w-full sm:w-auto sm:flex-initial min-w-0 sm:min-w-[220px]"
                >
                  <span>{primaryActionLabel}</span>
                  <ArrowRight className="size-4 sm:size-5 shrink-0" />
                </Link>
              )}

              {secondaryActionLabel && (
                <Link
                  href={secondaryActionHref}
                  target={
                    secondaryActionHref.startsWith("http")
                      ? "_blank"
                      : undefined
                  }
                  className="px-4 sm:px-9 h-10 sm:h-[58px] rounded-xl sm:rounded-2xl border border-border bg-card text-foreground text-xs sm:text-base md:text-lg font-bold hover:bg-primary/10 hover:border-primary/50 hover:text-primary hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 sm:gap-2.5 w-full sm:w-auto sm:flex-initial min-w-0 sm:min-w-[220px]"
                >
                  <Github className="size-4 sm:size-5 shrink-0" />
                  <span>{secondaryActionLabel}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

HomepageHeroTypingBlock.displayName = "HomepageHeroTypingBlock";
