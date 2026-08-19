"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  Copy,
  Sparkles,
  Terminal,
} from "lucide-react";
import { GitHubIcon } from "./Icons";

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
  /**
   * The element used for links. Defaults to a plain `a`, so this component works
   * in any React app with no adaptation. In Next.js, pass `next/link` to keep
   * client-side navigation and prefetching: `linkComponent={Link}`.
   */
  linkComponent?: React.ElementType;
}

/* ═══════════════════════════════════════════════
   ACCENT CONTRAST
   ═══════════════════════════════════════════════

   The picked accent is injected as --primary on the section, so it also
   becomes the colour of accent *text* (`text-primary`) — including the typed
   word itself. A pick that sits close to the page surface (white on the light
   theme, near-black on the dark theme) renders that text invisible.

   So we publish two extra variables: the accent nudged just far enough to
   stay legible on a light surface, and the same for a dark surface. Accent
   text reads them through the `dark:` variant, while --primary itself keeps
   the exact picked colour for glows, borders and tints. */

type Rgb = [number, number, number];

/** Surface luminances of --background in each theme (white / oklch(0.145)). */
const LIGHT_SURFACE_LUM = 1;
const DARK_SURFACE_LUM = 0.003;
/** WCAG AA for large text. Accent text here is display-sized. */
const MIN_CONTRAST = 3;

const parseColor = (input: string): Rgb | null => {
  const hex = input.trim().replace(/^#/, "");
  if (/^[a-f\d]{3}$/i.test(hex)) {
    const [r, g, b] = hex.split("");
    return [parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16)];
  }
  if (/^[a-f\d]{6}$/i.test(hex)) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  const m = input.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
  return m ? [+m[1], +m[2], +m[3]] : null;
};

const relLuminance = ([r, g, b]: Rgb) => {
  const f = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

const contrast = (a: number, b: number) =>
  (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/** Steps `rgb` toward `target` (0 = black, 255 = white) until it is legible. */
const ensureContrast = (rgb: Rgb, surfaceLum: number, target: 0 | 255): Rgb => {
  let out = rgb;
  for (let i = 0; i < 16; i++) {
    if (contrast(relLuminance(out), surfaceLum) >= MIN_CONTRAST) break;
    out = out.map((v) => Math.round(v + (target - v) * 0.12)) as Rgb;
  }
  return out;
};

const toCss = ([r, g, b]: Rgb) => `rgb(${r}, ${g}, ${b})`;

/* ═══════════════════════════════════════════════
   TYPING HERO BLOCK COMPONENT
   ═══════════════════════════════════════════════ */

export const HomepageHeroTypingBlock = forwardRef<
  HTMLElement,
  HomepageHeroTypingBlockProps
>(
  (
    {
      linkComponent: Link = "a",
      badgeText = "Next-Gen React Components",
      badgeHref: _badgeHref = "/docs",
      titlePrefix = "Build ",
      typingWords = [
        "Exceptional",
        "Interactive",
        "Animated",
        "Responsive",
        "Modern",
      ],
      titleSuffix = " Interfaces.",
      subtitle = "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Framer Motion.",
      cliCommand = "npx shadcn@latest add https://algorize-ui.vercel.app/r/button.json",
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
    const accentRgb = resolvedColor ? parseColor(resolvedColor) : null;

    const customStyle = {
      // light-dark() keys off `color-scheme`, not the `.dark` class. That
      // matters: the docs preview iframe syncs the theme by writing token
      // styles + `color-scheme` inline on <html> without ever adding `.dark`,
      // so a `dark:` variant would pick the wrong branch in there.
      // Falls back to --primary so an unthemed hero behaves exactly as before.
      "--hero-accent-text": accentRgb
        ? `light-dark(${toCss(
            ensureContrast(accentRgb, LIGHT_SURFACE_LUM, 0),
          )}, ${toCss(ensureContrast(accentRgb, DARK_SURFACE_LUM, 255))})`
        : "var(--primary)",
      ...(resolvedColor ? { "--primary": resolvedColor } : {}),
      ...(accentRgb
        ? {
            // Text on a `bg-primary` fill needs the opposite of the accent —
            // otherwise it keeps the theme's own value and can vanish.
            "--primary-foreground":
              relLuminance(accentRgb) > 0.45 ? "#09090b" : "#ffffff",
          }
        : {}),
    } as React.CSSProperties;

    return (
      <section
        ref={ref}
        style={customStyle}
        className={cn(
          "relative w-full flex flex-col justify-center items-center py-4 sm:py-8 md:py-12",
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

        <div className="relative z-10 max-w-[1320px] mx-auto w-full px-5 sm:px-6 md:px-8 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center text-center max-w-[1320px] mx-auto space-y-3.5 sm:space-y-6 md:space-y-7 my-auto">
            {/* Top Pill Badge */}
            {badgeText && (
              <div>
                <div
                  className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-5 py-1 sm:py-2.5 rounded-full bg-primary/10 border border-primary/30 text-[9px] xs:text-[10px] sm:text-base font-bold text-[var(--hero-accent-text)] transition-all duration-300"
                >
                  <Sparkles className="size-2.5 xs:size-3 sm:size-4 text-[var(--hero-accent-text)] animate-spin shrink-0" />
                  <span className="truncate max-w-[140px] xs:max-w-[170px] sm:max-w-none">
                    {badgeText}
                  </span>
                </div>
              </div>
            )}

            {/* Dynamic Typing Title */}
            <div className="w-full flex justify-center items-center overflow-x-auto no-scrollbar">
              <h1 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-tight text-foreground text-center inline-flex items-center justify-center flex-nowrap gap-x-1 sm:gap-x-2 whitespace-nowrap">
                <span>{titlePrefix}</span>
                <span className="inline-flex items-center">
                  <span className="text-[var(--hero-accent-text)]">
                    {currentText}
                  </span>
                  <span className="text-[var(--hero-accent-text)] animate-pulse font-mono font-light ml-[1px] mr-0">
                    |
                  </span>
                </span>
                {titleSuffix && <span>{titleSuffix}</span>}
              </h1>
            </div>

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
                  className="group flex items-center gap-2 sm:gap-3.5 px-2.5 sm:px-5 h-8 xs:h-9 sm:h-[58px] rounded-lg sm:rounded-2xl border border-border bg-card cursor-pointer w-full max-w-[220px] xs:max-w-[250px] sm:max-w-md hover:border-primary/50 transition-all"
                >
                  <Terminal className="size-3 xs:size-3.5 sm:size-5 text-[var(--hero-accent-text)] shrink-0" />
                  <code className="text-[9px] xs:text-[10px] sm:text-sm md:text-base font-mono text-foreground flex-1 text-left font-semibold truncate !bg-transparent !border-none !outline-none !shadow-none !p-0">
                    {cliCommand}
                  </code>
                  <div className="pl-1.5 sm:pl-3.5 border-l border-border h-3 sm:h-5 flex items-center shrink-0">
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
                  className="px-2.5 xs:px-3 sm:px-9 h-8 xs:h-9 sm:h-[58px] rounded-lg sm:rounded-2xl bg-primary text-primary-foreground text-[10px] xs:text-xs sm:text-base md:text-lg font-bold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1 sm:gap-2.5 flex-1 sm:flex-initial min-w-0 sm:min-w-[220px]"
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
                  className="px-2.5 xs:px-3 sm:px-9 h-8 xs:h-9 sm:h-[58px] rounded-lg sm:rounded-2xl border border-border bg-card text-foreground text-[10px] xs:text-xs sm:text-base md:text-lg font-bold hover:bg-primary/10 hover:border-primary/50 hover:text-[var(--hero-accent-text)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1 sm:gap-2.5 flex-1 sm:flex-initial min-w-0 sm:min-w-[220px]"
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
  }
);

HomepageHeroTypingBlock.displayName = "HomepageHeroTypingBlock";
