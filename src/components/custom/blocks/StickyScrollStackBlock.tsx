"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers,
  Palette,
  Smartphone,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import React, { useRef } from "react";

export interface ScrollStackItem {
  id: string;
  title: string;
  badge?: string;
  icon?: React.ReactNode;
  contentType: "list" | "image" | "split" | "custom" | (string & {});
  description?: string;
  listItems?: string[];
  imageUrl?: string;
  imageAlt?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export interface StickyScrollStackProps
  extends React.HTMLAttributes<HTMLDivElement> {
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

const defaultStackItems: ScrollStackItem[] = [
  {
    id: "ui-design",
    title: "UI Design",
    badge: "Visual Identity",
    icon: <Palette className="w-5 h-5 text-[var(--theme-color,var(--primary))]" />,
    contentType: "list",
    description:
      "Crafting intuitive, pixel-perfect interfaces designed to engage and convert real audiences.",
    listItems: [
      "Website / Landing Pages",
      "Mobile Apps (iOS & Android)",
      "Web App / SaaS Dashboards",
      "Comprehensive Design Systems",
    ],
    buttonText: "View UI Showcase",
  },
  {
    id: "ux-design",
    title: "UX Design",
    badge: "User Research",
    icon: <Layers className="w-5 h-5 text-[var(--theme-color,var(--primary))]" />,
    contentType: "list",
    description:
      "Data-driven architecture mapping out frictionless customer journeys.",
    listItems: [
      "In-depth User Research",
      "Userflow & Wireframing",
      "Interactive Prototyping",
      "UX Audit & Heuristic Evaluation",
    ],
  },
  {
    id: "branding",
    title: "Branding & Identity",
    badge: "Brand Strategy",
    icon: <Sparkles className="w-5 h-5 text-[var(--theme-color,var(--primary))]" />,
    contentType: "split",
    description:
      "Building memorable, iconic brand identities that stand out in crowded markets.",
    imageUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Misty mountain forest nature landscape",
    buttonText: "Explore Branding",
  },
  {
    id: "webflow-dev",
    title: "Webflow Development",
    badge: "No-Code / Low-Code",
    icon: <Code2 className="w-5 h-5 text-[var(--theme-color,var(--primary))]" />,
    contentType: "list",
    description:
      "High-performance, enterprise-grade Webflow websites built for marketing speed.",
    listItems: [
      "Custom Figma to Webflow Conversion",
      "CMS & Dynamic Content Architecture",
      "E-Commerce Solutions",
      "Technical SEO Optimization",
    ],
  },
  {
    id: "fullstack-dev",
    title: "Full-Stack Development",
    badge: "Engineering",
    icon: <Smartphone className="w-5 h-5 text-[var(--theme-color,var(--primary))]" />,
    contentType: "image",
    description:
      "Scalable, secure web applications built with modern React and Next.js frameworks.",
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Golden mountain valley sunset nature landscape",
    buttonText: "Tech Stack Specs",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    badge: "Growth",
    icon: <TrendingUp className="w-5 h-5 text-[var(--theme-color,var(--primary))]" />,
    contentType: "list",
    description:
      "Strategic acquisition and retention campaigns tailored for sustainable ROI.",
    listItems: [
      "Search Engine Optimization (SEO)",
      "Content Marketing & Strategy",
      "Paid Advertising (PPC & Social)",
      "Conversion Rate Optimization (CRO)",
    ],
    buttonText: "Get Growth Audit",
  },
];

const StackCard: React.FC<{
  item: ScrollStackItem;
  index: number;
  total: number;
  stackOffsetStep: number;
  scaleStep: number;
}> = ({ item, index, total, stackOffsetStep, scaleStep }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // PRECISION FIX: Track scroll progress relative to this specific card's top edge hitting the sticky boundary.
  // This guarantees the card NEVER scales down or dims while moving up the screen before pinning.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const isLast = index === total - 1;
  const targetScale = isLast ? 1 : 1 - (total - index - 1) * scaleStep;
  const targetOpacity = isLast ? 1 : 0.4;

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, Math.max(0.85, targetScale)],
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [1, targetOpacity]);

  return (
    <div
      ref={cardRef}
      className="sticky w-full flex items-center justify-center"
      style={{ top: `calc(5rem + ${index * stackOffsetStep}px)` }}
    >
      <motion.div
        style={{ scale, opacity }}
        className="w-full origin-top rounded-2xl md:rounded-3xl bg-card border border-border/80 p-5 sm:p-6 md:p-7 shadow-xl shadow-zinc-200/50 dark:shadow-black/50 transition-colors duration-300 mt-5"
      >
        <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            {item.icon && (
              <div className="p-2 rounded-xl bg-muted border border-border/60">
                {item.icon}
              </div>
            )}
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              {item.badge && (
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[var(--theme-color,var(--primary))]">
                  {item.badge}
                </span>
              )}
            </div>
          </div>

          <span className="font-mono text-xs font-semibold text-muted-foreground">
            0{index + 1} / 0{total}
          </span>
        </div>

        {item.contentType === "list" && (
          <div className="space-y-4">
            {item.description && (
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            )}
            {item.listItems && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {item.listItems.map((listItem, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{listItem}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {item.contentType === "image" && (
          <div className="space-y-4">
            {item.description && (
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            )}
            {item.imageUrl && (
              <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border border-border/60 bg-muted">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        )}

        {item.contentType === "split" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="space-y-3">
              {item.description && (
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              )}
              {item.listItems && (
                <ul className="space-y-2 pt-1">
                  {item.listItems.map((listItem, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-xs sm:text-sm text-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--theme-color,var(--primary))] shrink-0" />
                      <span>{listItem}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {item.imageUrl && (
              <div className="relative w-full h-40 sm:h-48 md:h-full min-h-[160px] rounded-xl overflow-hidden border border-border/60">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        )}

        {item.contentType === "custom" && (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
              {item.description ||
                "Custom content layout section tailored for specialized workflows."}
            </p>
          </div>
        )}

        {item.buttonText && (
          <div className="mt-6 pt-4 border-t border-border flex justify-end">
            <button
              onClick={item.onButtonClick}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-primary-foreground dark:text-zinc-900 bg-[var(--theme-color,var(--primary))] hover:opacity-90 shadow-md transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>{item.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export const StickyScrollStack = React.forwardRef<
  HTMLDivElement,
  StickyScrollStackProps
>(
  (
    {
      headerBadge = "Expertise & Solutions",
      headerTitle = "Our Core Capabilities",
      headerSubtitle = "We emphasize user-centric design, ensuring that every project we undertake prioritizes the needs and goals of your real audience.",
      headerButtonText = "Request free audit",
      onHeaderButtonClick,
      headerContentType = "text-button",
      headerImageUrl,
      headerImageAlt,
      headerCustomContent,
      items = defaultStackItems,
      stackOffsetStep = 12,
      scaleStep = 0.03,
      enableGlow = false,
      className,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
    );

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20",
          className,
        )}
        {...props}
      >
        {enableGlow && (
          <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[var(--theme-color,var(--primary))]/10 via-[var(--theme-color,var(--primary))]/10 to-transparent blur-[120px] rounded-full -z-10" />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col justify-center text-left z-10">
            {headerBadge && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--theme-color,var(--primary))]/10 border border-[var(--theme-color,var(--primary))]/30 text-[var(--theme-color,var(--primary))] text-xs font-semibold uppercase tracking-wider w-fit mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{headerBadge}</span>
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-4">
              {headerTitle}
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-md">
              {headerSubtitle}
            </p>

            {headerContentType === "image-button" && headerImageUrl && (
              <div className="mb-6 relative w-full max-w-md h-48 sm:h-56 rounded-2xl overflow-hidden border border-border/80 shadow-md bg-muted">
                <img
                  src={headerImageUrl}
                  alt={headerImageAlt || headerTitle}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            )}

            {headerContentType === "custom" && headerCustomContent && (
              <div className="mb-6 w-full max-w-md">{headerCustomContent}</div>
            )}

            {(headerContentType === "text-button" ||
              headerContentType === "image-button") &&
              headerButtonText && (
                <div>
                  <button
                    onClick={onHeaderButtonClick}
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm text-primary-foreground dark:text-zinc-900 bg-[var(--theme-color,var(--primary))] hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <span>{headerButtonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 pb-[10vh] sm:pb-[20vh]">
            {items &&
              items.map((item, index) => (
                <StackCard
                  key={item.id}
                  item={item}
                  index={index}
                  total={items.length}
                  stackOffsetStep={stackOffsetStep}
                  scaleStep={scaleStep}
                />
              ))}
          </div>
        </div>
      </div>
    );
  },
);

StickyScrollStack.displayName = "StickyScrollStack";
