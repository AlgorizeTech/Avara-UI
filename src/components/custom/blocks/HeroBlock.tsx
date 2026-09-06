"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight, Check, Copy, Sparkles, Terminal, Star, Code, Mail, FileText, PawPrint, Heart, ShieldCheck, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════
   SELF-CONTAINED SVG BRAND ICONS
   ═══════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════
   TYPES & INTERFACES
   ═══════════════════════════════════════════════ */

export interface HeroBlockProps extends React.HTMLAttributes<HTMLElement> {
  /** Animation variant: "bounce", "typing", "slider", "glow-arc", "pet-shop" */
  variant?: "bounce" | "typing" | "slider" | "glow-arc" | "pet-shop";
  /** Optional badge text displayed inside the top pill badge */
  badgeText?: string;
  /** Badge link URL */
  badgeHref?: string;
  /** Main static title text prefix */
  titlePrefix?: string;
  /** Words to animate in the bounce, typing, or flip effect */
  typingWords?: string[];
  /** Main static title text suffix */
  titleSuffix?: string;
  /** Subtitle / description paragraph */
  subtitle?: string;
  /** CLI copy command */
  cliCommand?: string;
  /**
   * The element used for links. Defaults to a plain `a`, so this component works
   * in any React app with no adaptation. In Next.js, pass `next/link` to keep
   * client-side navigation and prefetching: `linkComponent={Link}`.
   */
  linkComponent?: React.ElementType;
  /** Primary action button label */
  primaryActionLabel?: string;
  /** Primary action button URL */
  primaryActionHref?: string;
  /** Secondary action button label */
  secondaryActionLabel?: string;
  /** Secondary action button URL */
  secondaryActionHref?: string;
  /** Array of image URLs for the continuous right-to-left thumbnail slider (used in "slider" variant) */
  sliderImages?: string[];
  /** Main featured image URL for the right column (used in "slider" variant) */
  mainImage?: string;
  /** Array of category pill tags (used in "pet-shop" variant) */
  categories?: string[];
  /** Rating text (used in "pet-shop" variant, e.g. "4.9 ★ Rated") */
  ratingText?: string;
  /** Feature pill badge text (used in "pet-shop" variant) */
  featurePillText?: string;
  /** Array of top badge strings (used in "pet-shop" variant) */
  badgeTags?: string[];
  /** Main featured pet image URL (used in "pet-shop" variant) */
  petImage?: string;
  /** Secondary pet avatar image URL (used in "pet-shop" variant) */
  secondaryPetImage?: string;
  /** Custom accent color (CSS color or tailwind var) */
  color?: string;
}

type Rgb = [number, number, number];

const LIGHT_SURFACE_LUM = 1;
const DARK_SURFACE_LUM = 0.003;
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
   DEFAULT DEVELOPER-FIRST RENDER & CODE IMAGES
   ═══════════════════════════════════════════════ */

const DEFAULT_SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
];

const DEFAULT_MAIN_IMAGE =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop";

/* ═══════════════════════════════════════════════
   MAIN HERO BLOCK COMPONENT
   ═══════════════════════════════════════════════ */

export const HeroBlock = forwardRef<HTMLElement, HeroBlockProps>(
  (
    {
      variant = "bounce",
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
      subtitle = "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Framer Motion.",
      cliCommand = "npx shadcn@latest add https://algorize-ui.vercel.app/r/button.json",
      primaryActionLabel = "Browse Components",
      primaryActionHref = "/docs",
      secondaryActionLabel = "Star on GitHub",
      secondaryActionHref = "https://github.com/AlgorizeTech",
      sliderImages = DEFAULT_SLIDER_IMAGES,
      mainImage = DEFAULT_MAIN_IMAGE,
      petImage,
      secondaryPetImage,
      categories = ["Dry Food", "Toys", "Grooming", "Wellness", "Subscription"],
      ratingText = "4.9 ★ Rated",
      featurePillText = "24/7 Vet Care",
      badgeTags = ["Certified Organic & Vet Approved", "4.9 Star Rated"],
      color,
      className,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    // Typing effect state (used when variant === "typing")
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    // Word bounce effect interval (used when variant === "bounce")
    useEffect(() => {
      if (variant !== "bounce" || !typingWords || typingWords.length === 0) return;
      const interval = setInterval(() => {
        setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
      }, 2400);

      return () => clearInterval(interval);
    }, [typingWords, variant]);

    // Character typewriter effect interval (used when variant === "typing")
    useEffect(() => {
      if (variant !== "typing" || !typingWords || typingWords.length === 0) return;
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
    }, [currentText, isDeleting, currentWordIndex, typingWords, variant]);

    // 3D Perspective Word Flip effect interval (used when variant === "slider")
    useEffect(() => {
      if (variant !== "slider" || !typingWords || typingWords.length === 0) return;
      const interval = setInterval(() => {
        setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
      }, 2200);

      return () => clearInterval(interval);
    }, [typingWords, variant]);

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
      "--hero-accent-text": accentRgb
        ? `light-dark(${toCss(
            ensureContrast(accentRgb, LIGHT_SURFACE_LUM, 0),
          )}, ${toCss(ensureContrast(accentRgb, DARK_SURFACE_LUM, 255))})`
        : "var(--primary)",
      ...(resolvedColor ? { "--primary": resolvedColor } : {}),
      ...(accentRgb
        ? {
            "--primary-foreground":
              relLuminance(accentRgb) > 0.45 ? "#09090b" : "#ffffff",
          }
        : {}),
    } as React.CSSProperties;

    const currentWord = typingWords?.[currentWordIndex] || "";

    /* ═══════════════════════════════════════════════
       VARIANT 4: MODERN PET SHOP & ANIMAL CARE HERO (MINIMAL, NO SHADOWS & NO PET ICONS)
       ═══════════════════════════════════════════════ */
    if (variant === "pet-shop" || variant === "glow-arc") {
      const petTitlePrefix =
        titlePrefix === "Build " ? "All Pet Essentials" : titlePrefix;
      const petTitleAccent =
        titleSuffix || "Delivered To Your Door";
      const petSubtitle =
        subtitle ===
        "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Framer Motion."
          ? "Discover nutritionist-crafted organic meals, orthopedic beds, durable interactive toys, and instant 24/7 vet consultations delivered to your door."
          : subtitle;

      const petPrimaryAction =
        primaryActionLabel === "Browse Components"
          ? "Shop Dog Supplies"
          : primaryActionLabel;

      const petSecondaryAction =
        secondaryActionLabel === "Star on GitHub"
          ? "Shop Cat Care"
          : secondaryActionLabel;

      const dogImage =
        petImage ||
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop";
      const catImage =
        secondaryPetImage ||
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop";

      return (
        <section
          ref={ref}
          style={customStyle}
          className={cn(
            "relative w-full overflow-hidden py-14 sm:py-20 lg:py-28 bg-background text-foreground transition-colors duration-300",
            className,
          )}
          {...props}
        >
          {/* Subtle Dynamic Theme Accent Glow Orbs */}
          <div className="absolute top-10 left-10 size-72 sm:size-96 rounded-full blur-3xl pointer-events-none opacity-15" style={{ backgroundColor: "var(--hero-accent-text)" }} />
          <div className="absolute bottom-10 right-10 size-72 sm:size-96 rounded-full blur-3xl pointer-events-none opacity-15" style={{ backgroundColor: "var(--hero-accent-text)" }} />

          <div className="relative z-10 max-w-[1320px] mx-auto w-full px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Image Column: Top on Mobile (order-1), Left on Desktop (lg:order-1) */}
              <div className="col-span-1 lg:col-span-5 relative flex justify-center items-center order-1 lg:order-1">
                <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                  
                  {/* Outer Concentric Border Accent Ring */}
                  <div className="absolute inset-2 rounded-full border-2 border-dashed opacity-30 animate-[spin_60s_linear_infinite]" style={{ borderColor: "var(--hero-accent-text)" }} />
                  
                  {/* Central Large Circular Image Mask */}
                  <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden border-4 border-background bg-muted group">
                    <img
                      src={dogImage}
                      alt="Happy Pet"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Top-Left Floating Feature Pill */}
                  <div className="absolute top-2 left-0 sm:-left-2 px-4 py-2 rounded-2xl bg-card border-2 border-border flex items-center gap-2.5 z-20">
                    <div className="size-2 rounded-full" style={{ backgroundColor: "var(--hero-accent-text)" }} />
                    <div>
                      <p className="text-[11px] font-black text-foreground">{featurePillText}</p>
                      <p className="text-[9px] font-bold" style={{ color: "var(--hero-accent-text)" }}>Verified Doctors</p>
                    </div>
                  </div>

                  {/* Bottom-Right Cat Avatar Pill */}
                  <div className="absolute bottom-2 right-0 sm:-right-2 p-2 pr-4 rounded-2xl bg-card border-2 border-border flex items-center gap-2.5 z-20">
                    <div className="size-10 rounded-xl overflow-hidden border border-border shrink-0">
                      <img src={catImage} alt="Cat Supplies" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-foreground">Cat Essentials</p>
                      <p className="text-[9px] font-bold text-muted-foreground">Same Day Delivery</p>
                    </div>
                  </div>

                  {/* Center Left Rating Pill */}
                  <div className="absolute bottom-1/3 -left-4 px-3.5 py-1.5 rounded-full font-black text-xs border z-20" style={{ backgroundColor: "var(--hero-accent-text)", color: "var(--primary-foreground)", borderColor: "var(--hero-accent-text)" }}>
                    {ratingText}
                  </div>

                </div>
              </div>

              {/* Content Column: Bottom on Mobile (order-2), Right on Desktop (lg:order-2) */}
              <div className="col-span-1 lg:col-span-7 flex flex-col justify-center space-y-6 text-left order-2 lg:order-2">
                
                {/* Category Pills Header */}
                <div className="flex flex-wrap items-center gap-2">
                  {badgeTags?.[0] && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold" style={{ backgroundColor: "rgba(16, 185, 129, 0.08)", borderColor: "rgba(16, 185, 129, 0.25)", color: "var(--hero-accent-text)" }}>
                      <ShieldCheck className="size-3.5 shrink-0" style={{ color: "var(--hero-accent-text)" }} />
                      <span>{badgeTags[0]}</span>
                    </div>
                  )}
                  {badgeTags?.[1] && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold" style={{ backgroundColor: "rgba(249, 115, 22, 0.08)", borderColor: "rgba(249, 115, 22, 0.25)", color: "#f97316" }}>
                      <Star className="size-3.5 fill-orange-500 text-orange-500" />
                      <span>{badgeTags[1]}</span>
                    </div>
                  )}
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-foreground">
                  <span className="block">{petTitlePrefix}</span>
                  <span className="block mt-1" style={{ color: "var(--hero-accent-text)" }}>
                    {petTitleAccent}
                  </span>
                </h1>

                {/* Subtitle */}
                {petSubtitle && (
                  <p className="text-xs sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
                    {petSubtitle}
                  </p>
                )}

                {/* Quick Pet Category Select Pills */}
                {categories && categories.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mr-1">Popular:</span>
                    {categories.map((cat, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-xl bg-card border border-border text-xs font-bold text-foreground cursor-pointer transition-all"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3 w-full">
                  <Link
                    href={primaryActionHref}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-extrabold text-sm sm:text-base transition-all active:scale-95 text-center"
                    style={{ backgroundColor: "var(--hero-accent-text)", color: "var(--primary-foreground)" }}
                  >
                    <ShoppingBag className="size-5 shrink-0" />
                    <span>{petPrimaryAction}</span>
                    <ArrowRight className="size-4 shrink-0" />
                  </Link>

                  <Link
                    href={secondaryActionHref}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl border border-border bg-card hover:bg-accent text-foreground font-bold text-sm sm:text-base transition-all active:scale-95 text-center"
                  >
                    <span>{petSecondaryAction}</span>
                    <ArrowUpRight className="size-4 shrink-0" style={{ color: "var(--hero-accent-text)" }} />
                  </Link>
                </div>

                {/* Trust Footer Line */}
                <div className="pt-3 flex items-center gap-4 text-xs font-bold text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="size-4" style={{ color: "var(--hero-accent-text)" }} />
                    <span>Vet Verified Ingredients</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="size-4 text-rose-500" />
                    <span>Free Shipping $35+</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      );
    }

    /* ═══════════════════════════════════════════════
       VARIANT 3: CLEAN SOLID WHITE/DARK PARENT WITH SOLID ACCENT FLIP WORD (NO GRADIENT)
       ═══════════════════════════════════════════════ */
    if (variant === "slider") {
      const sliderBadgeText =
        badgeText === "Next-Gen React Components"
          ? "Full-Stack Software Engineer"
          : badgeText;
      const sliderTitlePrefix =
        titlePrefix === "Build " ? "Building & Engineering" : titlePrefix;
      const sliderTitleAccent =
        titleSuffix ||
        (titlePrefix === "Build "
          ? "Full-Stack Digital Products"
          : "Interactive Experiences");
      const sliderSubtitle =
        subtitle ===
        "A meticulous library of React components & interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP, and Framer Motion."
          ? "Full-stack software engineer dedicated to building scalable web applications, modern SaaS platforms, and high-performance digital experiences."
          : subtitle;
      const sliderPrimaryActionLabel =
        primaryActionLabel === "Browse Components"
          ? "Explore Projects"
          : primaryActionLabel;
      const sliderSecondaryActionLabel =
        secondaryActionLabel === "Star on GitHub"
          ? "Contact Me"
          : secondaryActionLabel;
      const sliderSecondaryActionHref =
        secondaryActionHref === "https://github.com/AlgorizeTech"
          ? "#contact"
          : secondaryActionHref;

      const devSliderWords = typingWords;

      const sliderCurrentWord = devSliderWords?.[currentWordIndex % devSliderWords.length] || "";

      const devLabels = [
        "3D Web App",
        "WebGL Experience",
        "Three.js Scene",
        "3D Product UI",
        "Interactive 3D",
        "Spatial Web",
      ];

      return (
        <section
          ref={ref}
          style={customStyle}
          className={cn(
            "relative w-full overflow-hidden py-8 sm:py-12 lg:py-20 bg-background text-foreground",
            className,
          )}
          {...props}
        >
          {/* Keyframe style for continuous marquee slider */}
          <style>{`
            @keyframes hero-marquee-loop {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-hero-marquee {
              animation: hero-marquee-loop 25s linear infinite;
            }
            .animate-hero-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>

          {/* Grid Background Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] pointer-events-none" />

          <div className="relative z-10 max-w-[1320px] mx-auto w-full px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
              
              {/* Left Section (Span 12 on mobile/md, Span 7 on lg) */}
              <div className="col-span-1 lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8 order-2 lg:order-1">
                
                {/* Main Content Box */}
                <div className="relative rounded-3xl p-5 sm:p-8 md:p-10 border border-primary/20 bg-card/60 backdrop-blur-xl space-y-4 sm:space-y-6 overflow-hidden flex-1 flex flex-col justify-center">
                  
                  {sliderBadgeText && (
                    <Link href={badgeHref} className="inline-block group/badge self-start">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs sm:text-sm font-bold text-[var(--hero-accent-text)] group-hover/badge:bg-primary/20 transition-all duration-300">
                        <Terminal className="size-3.5 text-[var(--hero-accent-text)] shrink-0" />
                        <span>{sliderBadgeText}</span>
                      </div>
                    </Link>
                  )}

                  {/* Clean Static 2-Line Developer Heading */}
                  <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight flex flex-col leading-tight">
                    <span className="text-foreground shrink-0">{sliderTitlePrefix}</span>
                    <span className="text-[var(--hero-accent-text)] font-black">
                      {sliderTitleAccent}
                    </span>
                  </h1>

                  {sliderSubtitle && (
                    <p className="text-xs sm:text-base text-muted-foreground leading-relaxed max-w-xl font-medium">
                      {sliderSubtitle}
                    </p>
                  )}

                  {/* Actions & Copy Line */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full">
                    {sliderPrimaryActionLabel && (
                      <Link
                        href={primaryActionHref}
                        className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-primary text-primary-foreground text-xs sm:text-base font-bold hover:opacity-90 transition-all active:scale-95 w-full sm:w-auto text-center"
                      >
                        <span>{sliderPrimaryActionLabel}</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    )}

                    {sliderSecondaryActionLabel && (
                      <Link
                        href={sliderSecondaryActionHref}
                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 text-xs sm:text-sm font-bold transition-all cursor-pointer text-foreground active:scale-95 w-full sm:w-auto text-center"
                      >
                        {sliderSecondaryActionLabel.toLowerCase().includes("github") ? (
                          <GitHubIcon className="size-4 shrink-0 text-foreground" />
                        ) : sliderSecondaryActionLabel.toLowerCase().includes("resume") || sliderSecondaryActionLabel.toLowerCase().includes("cv") ? (
                          <FileText className="size-4 text-zinc-700 dark:text-[var(--hero-accent-text)] shrink-0" />
                        ) : (
                          <Mail className="size-4 text-zinc-700 dark:text-[var(--hero-accent-text)] shrink-0" />
                        )}
                        <span>{sliderSecondaryActionLabel}</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Bottom Section: Continuous Marquee Developer Code Slider */}
                <div className="relative w-full overflow-hidden rounded-2xl pt-2 shrink-0 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                  <div className="flex w-max animate-hero-marquee gap-3 sm:gap-4 items-center">
                    {[...sliderImages, ...sliderImages].map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-24 h-18 sm:w-32 sm:h-22 rounded-2xl overflow-hidden shrink-0 border border-border bg-card group/thumb"
                      >
                        <img
                          src={img}
                          alt={`Developer Visual ${idx}`}
                          className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-end p-2">
                          <span className="text-[10px] font-bold text-white tracking-wide truncate">
                            {devLabels[idx % devLabels.length]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Section (Span 12 on mobile/md, Span 5 on lg) */}
              <div className="col-span-1 lg:col-span-5 relative flex flex-col h-full min-h-[300px] sm:min-h-[360px] lg:min-h-0 order-1 lg:order-2">
                <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] lg:min-h-full rounded-3xl overflow-hidden border border-border bg-card group">
                  
                  {/* Main Developer Visual Image */}
                  <img
                    src={mainImage}
                    alt="Developer Code Visual"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />

                  {/* Gradient Overlay for Text Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Developer Floating Badge Top Left */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 p-2.5 sm:p-4 rounded-2xl bg-background/85 backdrop-blur-xl border border-border flex items-center gap-2.5 sm:gap-3">
                    <div className="size-8 sm:size-10 rounded-xl bg-primary/20 text-[var(--hero-accent-text)] flex items-center justify-center font-bold shrink-0">
                      <Code className="size-4 sm:size-5" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-extrabold text-foreground">100% Type-Safe</p>
                      <p className="text-[9px] sm:text-[10px] text-muted-foreground font-medium">TypeScript & Tailwind CSS</p>
                    </div>
                  </div>

                  {/* Developer Floating Badge Bottom Right */}
                  <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 p-2.5 sm:p-4 rounded-2xl bg-background/85 backdrop-blur-xl border border-border flex items-center gap-2.5 sm:gap-3">
                    <div className="size-2.5 sm:size-3 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <p className="text-[11px] sm:text-xs font-bold text-foreground">Developer Experience</p>
                      <p className="text-[9px] sm:text-[10px] text-emerald-500 font-bold">Copy-Paste Ready</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>
      );
    }

    /* ═══════════════════════════════════════════════
       VARIANTS 1 & 2: BOUNCE & TYPING (CENTERED HERO)
       ═══════════════════════════════════════════════ */
    return (
      <section
        ref={ref}
        style={customStyle}
        className={cn(
          "relative w-full flex flex-col justify-center items-center py-4 sm:py-8 md:py-12",
          className,
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
              <Link href={badgeHref} className="inline-block group">
                <div className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-5 py-1 sm:py-2.5 rounded-full bg-primary/10 border border-primary/30 text-[9px] xs:text-[10px] sm:text-base font-bold text-[var(--hero-accent-text)] group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                  <Sparkles className="size-2.5 xs:size-3 sm:size-4 text-[var(--hero-accent-text)] animate-spin shrink-0" />
                  <span className="truncate max-w-[140px] xs:max-w-[170px] sm:max-w-none">
                    {badgeText}
                  </span>
                </div>
              </Link>
            )}

            {/* Dynamic Animated Title Word */}
            <h1 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-tight text-foreground text-center inline-flex items-center justify-center flex-wrap gap-x-1.5 sm:gap-x-2.5">
              <span className="shrink-0">
                {titlePrefix}{" "}
                <span className="text-[var(--hero-accent-text)]">
                  Interactive
                </span>
              </span>

              {variant === "typing" ? (
                <span className="inline-flex items-center">
                  <span className="text-foreground">
                    {currentText}
                  </span>
                  <span className="text-[var(--hero-accent-text)] animate-pulse font-mono font-light ml-[1px] mr-0">
                    |
                  </span>
                </span>
              ) : (
                <span className="relative inline-flex items-center justify-start overflow-hidden py-0.5 h-[1.3em] w-[140px] xs:w-[165px] sm:w-[170px] md:w-[210px] lg:w-[270px] xl:w-[330px] shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWord}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: 1, transition: { staggerChildren: 0.04 } },
                        exit: { opacity: 0, transition: { staggerChildren: 0.02 } },
                      }}
                      className="text-foreground inline-flex text-left whitespace-nowrap"
                    >
                      {currentWord.split("").map((char, index) => (
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
              )}

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
                  className="group flex items-center gap-2 sm:gap-3.5 px-2.5 sm:px-5 h-8 xs:h-9 sm:h-[58px] rounded-lg sm:rounded-2xl border border-zinc-200 dark:border-border bg-zinc-100/70 dark:bg-card cursor-pointer w-full max-w-[220px] xs:max-w-[250px] sm:max-w-md hover:border-zinc-300 dark:hover:border-primary/50 transition-all"
                >
                  <Terminal className="size-3 xs:size-3.5 sm:size-5 text-zinc-700 dark:text-[var(--hero-accent-text)] shrink-0" />
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
  },
);

HeroBlock.displayName = "HeroBlock";
export default HeroBlock;
