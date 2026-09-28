"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Copy, Sparkles, Terminal } from "lucide-react";

// The word flip, as keyframes: out upwards, in from below, 0.45s each.
const FLIP_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const FLIP_CSS = `
@keyframes homepage-hero-word-out { to { transform: translateY(-100%); opacity: 0; } }
@keyframes homepage-hero-word-in { from { transform: translateY(100%); opacity: 0; } }
`;

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export interface HomepageHeroBlockProps extends React.HTMLAttributes<HTMLElement> {
  badgeText?: string;
  badgeHref?: string;
  titlePrefix?: string;
  typingWords?: string[];
  titleSuffix?: string;
  subtitle?: string;
  cliCommand?: string;
  linkComponent?: React.ElementType;
  primaryActionLabel?: string;
  primaryActionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
}

export const HomepageHeroBlock = forwardRef<HTMLElement, HomepageHeroBlockProps>(
  (
    {
      linkComponent: Link = "a",
      badgeText = "Next-Gen React Components",
      badgeHref = "/docs",
      titlePrefix = "Build ",
      typingWords = [
        "Interfaces",
        "Components",
        "Experiences",
        "Animations",
        "Dashboards",
      ],
      titleSuffix = "",
      subtitle = "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Motion.",
      cliCommand = "npx shadcn@latest add @algorize-ui/button",
      primaryActionLabel = "Browse Components",
      primaryActionHref = "/docs",
      secondaryActionLabel = "Star on GitHub",
      secondaryActionHref = "https://github.com/AlgorizeTech",
      className,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
      if (!typingWords || typingWords.length === 0) return;
      const interval = setInterval(() => {
        setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
      }, 2400);

      return () => clearInterval(interval);
    }, [typingWords]);

    const handleCopy = () => {
      if (typeof window !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(cliCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    const currentWord = typingWords?.[currentWordIndex] || "";

    // The word flip: the word on screen slides up and out, and only then does
    // the next one slide up in. The first word is simply there.
    const [shownWord, setShownWord] = useState(currentWord);
    const [swapped, setSwapped] = useState(false);
    const latestWord = useRef(currentWord);
    latestWord.current = currentWord;
    const leaving = shownWord !== currentWord;
    const swapIn = () => {
      setShownWord(latestWord.current);
      setSwapped(true);
    };

    // In case the leaving word's animationend never arrives.
    useEffect(() => {
      if (!leaving) return;
      const t = window.setTimeout(swapIn, 600);
      return () => window.clearTimeout(t);
    }, [leaving]);

    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full flex flex-col justify-center items-center py-4 sm:py-8 md:py-12",
          className,
        )}
        {...props}
      >
        <style>{FLIP_CSS}</style>
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
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_3%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_3%,transparent)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_40%,transparent_100%)]" />

        <div className="relative z-10 max-w-[1320px] mx-auto w-full px-5 sm:px-6 md:px-8 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center text-center max-w-[1320px] mx-auto space-y-3.5 sm:space-y-6 md:space-y-7 my-auto">
            {/* Top Pill Badge */}
            {badgeText && (
              <Link href={badgeHref} className="inline-block group">
                <div className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/30 text-[9px] xs:text-[10px] sm:text-xs font-semibold text-primary group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                  <Sparkles className="size-2.5 xs:size-3 sm:size-4 text-primary animate-spin shrink-0" />
                  <span className="truncate max-w-[140px] xs:max-w-[170px] sm:max-w-none">
                    {badgeText}
                  </span>
                </div>
              </Link>
            )}

            {/* Dynamic Animated Title Word (Vertical Text Slide / Word Flip) */}
            <h1 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-medium tracking-tight leading-tight text-foreground text-center inline-flex items-center justify-center flex-wrap">
              <span className="shrink-0 mr-2">
                {titlePrefix}
                <span className="text-primary">Interactive</span>
              </span>

              <span className="relative inline-flex items-center justify-start overflow-hidden py-1 h-[1.3em] shrink-0 min-w-[150px] xs:min-w-[170px] sm:min-w-[210px] md:min-w-[250px] lg:min-w-[300px]">
                <span
                  key={shownWord}
                  onAnimationEnd={(e) => {
                    if (leaving && e.target === e.currentTarget) swapIn();
                  }}
                  className="text-foreground font-medium inline-block whitespace-nowrap text-left"
                  style={
                    leaving
                      ? { animation: `homepage-hero-word-out 0.45s ${FLIP_EASE} forwards` }
                      : swapped
                        ? { animation: `homepage-hero-word-in 0.45s ${FLIP_EASE} backwards` }
                        : undefined
                  }
                >
                  {shownWord}
                </span>
              </span>

              {titleSuffix && <span className="shrink-0">{titleSuffix}</span>}
            </h1>

            {/* Subtitle Paragraph */}
            {subtitle && (
              <p className="text-[10px] xs:text-xs sm:text-base md:text-lg text-muted-foreground w-full max-w-3xl mx-auto leading-tight sm:leading-relaxed text-center font-medium px-1 sm:px-0">
                {subtitle}
              </p>
            )}

            {/* CLI Command Box */}
            {cliCommand && (
              <div className="pt-0.5 w-full flex justify-center px-1 sm:px-0">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="group flex items-center gap-2 sm:gap-3.5 px-2.5 sm:px-5 h-8 xs:h-9 sm:h-[58px] rounded-lg sm:rounded-2xl border border-border bg-muted/70 cursor-pointer w-full max-w-[220px] xs:max-w-[250px] sm:max-w-md hover:border-primary/50 transition-all"
                >
                  <Terminal className="size-3 xs:size-3.5 sm:size-5 text-primary shrink-0" />
                  <code className="text-[9px] xs:text-[10px] sm:text-sm md:text-base font-mono text-foreground flex-1 text-left font-semibold truncate !bg-transparent !border-none !outline-none !shadow-none !p-0">
                    {cliCommand}
                  </code>
                  <div className="pl-1.5 sm:pl-3.5 border-l-0 h-3 sm:h-5 flex items-center shrink-0">
                    {copied ? (
                      <Check className="size-3 sm:size-4.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3 sm:size-4.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    )}
                  </div>
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-row items-center justify-center gap-1.5 xs:gap-2.5 sm:gap-4 pt-0 sm:pt-2 w-full max-w-3xl mx-auto px-1 sm:px-0">
              {primaryActionLabel && (
                <Link
                  href={primaryActionHref}
                  className="px-2.5 xs:px-3 sm:px-9 h-8 xs:h-9 sm:h-[58px] rounded-lg sm:rounded-2xl bg-primary text-primary-foreground text-[10px] xs:text-xs sm:text-base md:text-lg font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1 sm:gap-2.5 flex-1 sm:flex-initial min-w-0 sm:min-w-[220px]"
                >
                  <span>{primaryActionLabel}</span>
                  <ArrowRight className="size-3 sm:size-5 shrink-0" />
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
                  className="px-2.5 xs:px-3 sm:px-9 h-8 xs:h-9 sm:h-[58px] rounded-lg sm:rounded-2xl border border-border bg-card text-foreground text-[10px] xs:text-xs sm:text-base md:text-lg font-semibold hover:bg-primary/10 hover:border-primary/50 hover:text-primary hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1 sm:gap-2.5 flex-1 sm:flex-initial min-w-0 sm:min-w-[220px]"
                >
                  <span>{secondaryActionLabel}</span>
                  <GitHubIcon className="size-3 sm:size-5 shrink-0" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  },
);

HomepageHeroBlock.displayName = "HomepageHeroBlock";
export default HomepageHeroBlock;
