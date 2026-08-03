"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import {
  ScrollStackItem,
  StickyScrollStack,
} from "@/components/custom/blocks/StickyScrollStackBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { cn } from "@/lib/utils";
import { Palette, Smartphone, Sparkles } from "lucide-react";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { useEffect, useState } from "react";

// --- 100% COMPLETE TYPESCRIPT ENGINE CODE ---
const STACK_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";
import { CheckCircle2, ArrowRight, Sparkles, Layers, Palette, Code2, Smartphone, TrendingUp } from "lucide-react";

export interface ScrollStackItem {
  id: string;
  title: string;
  badge?: string;
  icon?: React.ReactNode;
  contentType: "list" | "image" | "split" | "custom";
  description?: string;
  listItems?: string[];
  imageUrl?: string;
  imageAlt?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export interface StickyScrollStackProps extends React.HTMLAttributes<HTMLDivElement> {
  headerBadge?: string;
  headerTitle?: string;
  headerSubtitle?: string;
  headerButtonText?: string;
  onHeaderButtonClick?: () => void;
  headerContentType?: "text-only" | "text-button" | "image-button" | "custom";
  headerImageUrl?: string;
  headerImageAlt?: string;
  headerCustomContent?: React.ReactNode;
  items?: ScrollStackItem[];
  stackOffsetStep?: number;
  scaleStep?: number;
  enableGlow?: boolean;
}

const StackCard: React.FC<{
  item: ScrollStackItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stackOffsetStep: number;
  scaleStep: number;
}> = ({ item, index, total, progress, stackOffsetStep, scaleStep }) => {
  const startRange = index / total;
  const endRange = 1;

  const isLast = index === total - 1;
  const targetScale = isLast ? 1 : 1 - (total - index - 1) * scaleStep;
  const targetOpacity = isLast ? 1 : 0.35;

  const scale = useTransform(progress, [startRange, endRange], [1, Math.max(0.85, targetScale)]);
  const opacity = useTransform(progress, [startRange, endRange], [1, targetOpacity]);

  return (
    <div className="sticky w-full flex items-center justify-center" style={{ top: \`calc(5rem + \${index * stackOffsetStep}px)\` }}>
      <motion.div style={{ scale, opacity }} className="w-full origin-top rounded-2xl md:rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-5 sm:p-6 md:p-7 shadow-xl transition-colors duration-300">
        <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
          <div className="flex items-center gap-3">
            {item.icon && <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/50">{item.icon}</div>}
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{item.title}</h3>
              {item.badge && <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[var(--theme-color)] dark:text-[var(--theme-color)]">{item.badge}</span>}
            </div>
          </div>
          <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">0{index + 1} / 0{total}</span>
        </div>

        {item.contentType === "list" && (
          <div className="space-y-4">
            {item.description && <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.description}</p>}
            {item.listItems && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {item.listItems.map((listItem, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[var(--theme-color)] shrink-0" />
                    <span>{listItem}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {item.contentType === "image" && (
          <div className="space-y-4">
            {item.description && <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.description}</p>}
            {item.imageUrl && (
              <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
                <img src={item.imageUrl} alt={item.imageAlt || item.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
            )}
          </div>
        )}

        {item.contentType === "split" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="space-y-3">
              {item.description && <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.description}</p>}
              {item.listItems && (
                <ul className="space-y-2 pt-1">
                  {item.listItems.map((listItem, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[var(--theme-color)] shrink-0" />
                      <span>{listItem}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {item.imageUrl && (
              <div className="relative w-full h-40 sm:h-48 md:h-full min-h-[160px] rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800">
                <img src={item.imageUrl} alt={item.imageAlt || item.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
            )}
          </div>
        )}

        {item.buttonText && (
          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex justify-end">
            <button onClick={item.onButtonClick} type="button" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 cursor-pointer">
              <span>{item.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export const StickyScrollStack = React.forwardRef<HTMLDivElement, StickyScrollStackProps>(
  ({ headerBadge = "Expertise & Solutions", headerTitle = "We can help you with", headerSubtitle = "We emphasize user-centric design, ensuring that every project we undertake prioritizes the needs and goals of your real audience.", headerButtonText = "Request free audit", onHeaderButtonClick, headerContentType = "text-button", headerImageUrl, headerImageAlt, items, stackOffsetStep = 16, scaleStep = 0.04, enableGlow = true, className, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

    return (
      <div ref={containerRef} className={cn("relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20", className)} {...props}>
        {enableGlow && <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[var(--theme-color)]/20 via-[var(--theme-color)]/10 to-[var(--theme-color)]/5 blur-[120px] rounded-full -z-10" />}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col justify-center text-left z-10">
            {headerBadge && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--theme-color)]/20 dark:bg-[var(--theme-color)]/20 border border-[var(--theme-color)]/30 dark:border-[var(--theme-color)]/30 text-[var(--theme-color)] dark:text-[var(--theme-color)] text-xs font-semibold uppercase tracking-wider w-fit mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{headerBadge}</span>
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-4">{headerTitle}</h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 max-w-md">{headerSubtitle}</p>
            {headerContentType === "image-button" && headerImageUrl && (
              <div className="mb-6 relative w-full max-w-md h-48 sm:h-56 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shadow-md bg-zinc-100 dark:bg-zinc-800">
                <img src={headerImageUrl} alt={headerImageAlt || headerTitle} className="w-full h-full object-cover" loading="lazy" />
              </div>
            )}
            {(headerContentType === "text-button" || headerContentType === "image-button") && headerButtonText && (
              <div>
                <button onClick={onHeaderButtonClick} type="button" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-lg transition-all duration-200 cursor-pointer active:scale-95">
                  <span>{headerButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div className="lg:col-span-7 flex flex-col gap-6 pb-[10vh] sm:pb-[20vh]">
            {items && items.map((item, index) => (
              <StackCard key={item.id} item={item} index={index} total={items.length} progress={scrollYProgress} stackOffsetStep={stackOffsetStep} scaleStep={scaleStep} />
            ))}
          </div>
        </div>
      </div>
    );
  }
);
StickyScrollStack.displayName = "StickyScrollStack";`;

// --- 100% COMPLETE PURE JAVASCRIPT ENGINE CODE ---
const STACK_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const StackCard = ({ item, index, total, progress, stackOffsetStep, scaleStep }) => {
  const startRange = index / total;
  const endRange = 1;
  const isLast = index === total - 1;
  const targetScale = isLast ? 1 : 1 - (total - index - 1) * scaleStep;
  const targetOpacity = isLast ? 1 : 0.35;

  const scale = useTransform(progress, [startRange, endRange], [1, Math.max(0.85, targetScale)]);
  const opacity = useTransform(progress, [startRange, endRange], [1, targetOpacity]);

  return (
    <div className="sticky w-full flex items-center justify-center" style={{ top: \`calc(5rem + \${index * stackOffsetStep}px)\` }}>
      <motion.div style={{ scale, opacity }} className="w-full origin-top rounded-2xl md:rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-5 sm:p-6 md:p-7 shadow-xl transition-colors duration-300">
        <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
          <div className="flex items-center gap-3">
            {item.icon && <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/50">{item.icon}</div>}
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{item.title}</h3>
              {item.badge && <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[var(--theme-color)] dark:text-[var(--theme-color)]">{item.badge}</span>}
            </div>
          </div>
          <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">0{index + 1} / 0{total}</span>
        </div>

        {item.contentType === "list" && (
          <div className="space-y-4">
            {item.description && <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.description}</p>}
            {item.listItems && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {item.listItems.map((listItem, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[var(--theme-color)] shrink-0" />
                    <span>{listItem}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {item.contentType === "image" && (
          <div className="space-y-4">
            {item.description && <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.description}</p>}
            {item.imageUrl && (
              <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
                <img src={item.imageUrl} alt={item.imageAlt || item.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
            )}
          </div>
        )}

        {item.contentType === "split" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="space-y-3">
              {item.description && <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.description}</p>}
              {item.listItems && (
                <ul className="space-y-2 pt-1">
                  {item.listItems.map((listItem, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[var(--theme-color)] shrink-0" />
                      <span>{listItem}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {item.imageUrl && (
              <div className="relative w-full h-40 sm:h-48 md:h-full min-h-[160px] rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800">
                <img src={item.imageUrl} alt={item.imageAlt || item.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
            )}
          </div>
        )}

        {item.buttonText && (
          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex justify-end">
            <button onClick={item.onButtonClick} type="button" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200 cursor-pointer">
              <span>{item.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export const StickyScrollStack = React.forwardRef(
  ({ headerBadge = "Expertise & Solutions", headerTitle = "We can help you with", headerSubtitle = "We emphasize user-centric design, ensuring that every project we undertake prioritizes the needs and goals of your real audience.", headerButtonText = "Request free audit", onHeaderButtonClick, headerContentType = "text-button", headerImageUrl, headerImageAlt, items, stackOffsetStep = 16, scaleStep = 0.04, enableGlow = true, className, ...props }, ref) => {
    const containerRef = useRef(null);
    React.useImperativeHandle(ref, () => containerRef.current);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

    return (
      <div ref={containerRef} className={cn("relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20", className)} {...props}>
        {enableGlow && <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[var(--theme-color)]/20 via-[var(--theme-color)]/10 to-[var(--theme-color)]/5 blur-[120px] rounded-full -z-10" />}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col justify-center text-left z-10">
            {headerBadge && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--theme-color)]/20 dark:bg-[var(--theme-color)]/20 border border-[var(--theme-color)]/30 dark:border-[var(--theme-color)]/30 text-[var(--theme-color)] dark:text-[var(--theme-color)] text-xs font-semibold uppercase tracking-wider w-fit mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{headerBadge}</span>
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-4">{headerTitle}</h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 max-w-md">{headerSubtitle}</p>
            {headerContentType === "image-button" && headerImageUrl && (
              <div className="mb-6 relative w-full max-w-md h-48 sm:h-56 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shadow-md bg-zinc-100 dark:bg-zinc-800">
                <img src={headerImageUrl} alt={headerImageAlt || headerTitle} className="w-full h-full object-cover" loading="lazy" />
              </div>
            )}
            {(headerContentType === "text-button" || headerContentType === "image-button") && headerButtonText && (
              <div>
                <button onClick={onHeaderButtonClick} type="button" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-lg transition-all duration-200 cursor-pointer active:scale-95">
                  <span>{headerButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div className="lg:col-span-7 flex flex-col gap-6 pb-[10vh] sm:pb-[20vh]">
            {items && items.map((item, index) => (
              <StackCard key={item.id} item={item} index={index} total={items.length} progress={scrollYProgress} stackOffsetStep={stackOffsetStep} scaleStep={scaleStep} />
            ))}
          </div>
        </div>
      </div>
    );
  }
);
StickyScrollStack.displayName = "StickyScrollStack";`;

export function StickyScrollStackShowcase() {
  const [enableGlow, setEnableGlow] = useState(true);
  const [scaleStep, setScaleStep] = useState(0.04);
  const [stackOffsetStep, setStackOffsetStep] = useState(16);
  const [headerMode, setHeaderMode] = useState<
    "text-button" | "image-button" | "text-only"
  >("text-button");
  const [color, setColor] = useState<string>("primary");
  const getThemeColorHex = (c: string) => {
    if (c.startsWith('#')) return c;
    const map: Record<string, string> = { primary: "var(--primary)", default: "var(--primary)", indigo: '#6366f1', rose: '#f43f5e', emerald: '#10b981', zinc: '#18181b' };
    return map[c] || "var(--primary)";
  };


  useEffect(() => {
    if (typeof window === "undefined") return;
    const fetchColor = () => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) setColor(stored);
    };
    fetchColor();
    window.addEventListener("storage", fetchColor);
    const interval = setInterval(fetchColor, 500);
    return () => {
      window.removeEventListener("storage", fetchColor);
      clearInterval(interval);
    };
  }, [color]);

  const allItems: ScrollStackItem[] = [
    {
      id: "ui-design",
      title: "UI Design",
      badge: "Visual Identity",
      icon: <Palette className="w-5 h-5" style={{ color: getThemeColorHex(color) }} />,
      contentType: "list",
      description:
        "Crafting intuitive, pixel-perfect interfaces designed to engage and convert real users.",
      listItems: [
        "Website / Landing Pages",
        "Mobile Apps (iOS & Android)",
        "Web App / SaaS Dashboards",
        "Comprehensive Design Systems",
      ],
      buttonText: "View UI Showcase",
      onButtonClick: () => alert("Navigating to UI Showcase..."),
    },
    {
      id: "branding",
      title: "Branding & Identity",
      badge: "Brand Strategy",
      icon: <Sparkles className="w-5 h-5 text-[var(--theme-color)]" />,
      contentType: "split",
      description:
        "Building memorable, iconic brand identities that stand out in crowded markets.",
      listItems: [
        "Logo & Visual Assets",
        "Color Palettes & Typography",
        "Brand Guidelines & Tone",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Brand guidelines mockup",
      buttonText: "Explore Branding",
    },
    {
      id: "fullstack-dev",
      title: "Full-Stack Development",
      badge: "Engineering",
      icon: <Smartphone className="w-5 h-5 text-[var(--theme-color)]" />,
      contentType: "image",
      description:
        "High-performance, scalable web applications built with Next.js, React, and Tailwind CSS.",
      imageUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Code editor preview",
      buttonText: "Tech Stack Specs",
    },
    {
      id: "fullstack-dev-2",
      title: "Backend Architecture",
      badge: "Infrastructure",
      icon: <Smartphone className="w-5 h-5 text-[var(--theme-color)]" />,
      contentType: "image",
      description:
        "Resilient cloud architectures, serverless deployments, and real-time database indexing.",
      imageUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Cloud infrastructure preview",
      buttonText: "View Cloud Specs",
    },
  ];

  // --- FIXED: USAGE CODE NOW EXPLICITLY SHOWS HOW TO BUILD THE ITEMS ARRAY ---
  const generateUsageCode = () => {
    const imageProps =
      headerMode === "image-button"
        ? `\n      headerImageUrl="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"`
        : "";

    return `import { StickyScrollStack, ScrollStackItem } from "@/components/custom/blocks/StickyScrollStackBlock";
import { Palette, Sparkles, Smartphone } from "lucide-react";

export default function ServicesSection() {
  const items: ScrollStackItem[] = [
    {
      id: "ui-design",
      title: "UI Design",
      badge: "Visual Identity",
      icon: <Palette className="w-5 h-5 text-[var(--theme-color)]" />,
      contentType: "list",
      description: "Crafting intuitive, pixel-perfect interfaces designed to convert.",
      listItems: ["Landing Pages", "Mobile Apps", "SaaS Dashboards"],
      buttonText: "View UI Showcase",
    },
    {
      id: "branding",
      title: "Branding & Identity",
      badge: "Brand Strategy",
      icon: <Sparkles className="w-5 h-5 text-[var(--theme-color)]" />,
      contentType: "split",
      description: "Building iconic brand identities that stand out.",
      listItems: ["Logo Assets", "Color Palettes", "Brand Guidelines"],
      imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
      buttonText: "Explore Branding",
    },
    {
      id: "fullstack-dev",
      title: "Full-Stack Development",
      badge: "Engineering",
      icon: <Smartphone className="w-5 h-5 text-[var(--theme-color)]" />,
      contentType: "image",
      description: "High-performance web applications built with Next.js and Tailwind CSS.",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      buttonText: "Tech Stack Specs",
    },
  ];

  return (
    <StickyScrollStack
      items={items}
      enableGlow={${enableGlow}}
      scaleStep={${scaleStep}}
      stackOffsetStep={${stackOffsetStep}}
      headerContentType="${headerMode}"${imageProps}
      headerTitle="We can help you with"
      headerSubtitle="We emphasize user-centric design, ensuring every project prioritizes your real audience."
      headerButtonText="Request free audit"
    />
  );
}`;
  };

  const sliderClasses = cn(
    "w-full appearance-none bg-transparent cursor-pointer outline-none",
    "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:bg-zinc-200 dark:[&::-webkit-slider-runnable-track]:bg-zinc-800 [&::-webkit-slider-runnable-track]:rounded-full",
    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-900 dark:[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:mt-[-5px] [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110",
    "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:bg-zinc-200 dark:[&::-moz-range-track]:bg-zinc-800 [&::-moz-range-track]:rounded-full",
    "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-zinc-900 dark:[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:transition-transform hover:[&::-moz-range-thumb]:scale-110",
  );

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-10 relative">
        <div className="flex justify-between items-center w-full">
          <ThemeColorPicker color={color} onChange={(c) => { setColor(c); localStorage.setItem("primaryColor", c); }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Header Layout
            </span>
            <div className="inline-flex rounded-xl bg-zinc-200/60 dark:bg-zinc-800 p-1 w-fit">
              {(["text-button", "image-button", "text-only"] as const).map(
                (mode) => (
                  <button
                    key={mode}
                    onClick={() => setHeaderMode(mode)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                      headerMode === mode
                        ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white",
                    )}
                  >
                    {mode === "text-button"
                      ? "Text + Btn"
                      : mode === "image-button"
                        ? "Img + Btn"
                        : "Text Only"}
                  </button>
                ),
              )}
            </div>
          </div>

       {/*   <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              Scale Step
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md font-mono">
                {(scaleStep * 100).toFixed(0)}%
              </span>
            </label>
            <input
              type="range"
              min="0.01"
              max="0.08"
              step="0.01"
              value={scaleStep}
              onChange={(e) => setScaleStep(parseFloat(e.target.value))}
              className={sliderClasses}
            />
          </div> */}

          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              Top Lip Offset
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md font-mono">
                {stackOffsetStep}px
              </span>
            </label>
            <input
              type="range"
              min="8"
              max="32"
              step="4"
              value={stackOffsetStep}
              onChange={(e) => setStackOffsetStep(parseInt(e.target.value))}
              className={sliderClasses}
            />
          </div>

          <div className="flex items-center justify-start md:justify-end pt-2">
            <label className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={enableGlow}
                onChange={(e) => setEnableGlow(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-[var(--theme-color)] focus:ring-[var(--theme-color)]"
              />
              <span>Ambient Glow</span>
            </label>
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="StickyScrollStackBlock"
        tsCode={STACK_CODE_TS}
        jsCode={STACK_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
        sandbox="sticky-scroll-stack"
        sandboxProps={{ enableGlow, scaleStep, stackOffsetStep, headerMode, color }}
      >
        <div className="w-full relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80" style={{ "--theme-color": getThemeColorHex(color), backgroundColor: "color-mix(in srgb, var(--theme-color, var(--primary)) 1.5%, transparent)" } as React.CSSProperties}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 max-h-[750px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
            <StickyScrollStack
              items={allItems}
              enableGlow={enableGlow}
              scaleStep={scaleStep}
              stackOffsetStep={stackOffsetStep}
              headerContentType={headerMode}
              headerImageUrl={
                headerMode === "image-button"
                  ? "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
                  : undefined
              }
              headerTitle="We can help you with"
              headerSubtitle="We emphasize user-centric design, ensuring that every project we undertake prioritizes the needs and goals of your real audience."
              headerButtonText="Request free audit"
              onHeaderButtonClick={() => alert("Free audit requested!")}
              className="py-10 sm:py-14"
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
