"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import {
  ArrowRight,
  Building,
  Check,
  Code2,
  HelpCircle,
  Minus,
  PenTool,
  Rocket,
  Star,
  Users,
  Zap,
} from "lucide-react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

// ==========================================
// SHARED TYPES & THEMES
// ==========================================
export type PricingColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type PricingVariant =
  | "default"
  | "premium"
  | "elegant"
  | "minimal"
  | "bordered";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 text-white",
    bgSoft:
      "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400",
    border: "border-indigo-600 dark:border-indigo-500",
    shadow: "shadow-indigo-500/20",
    gradient: "from-indigo-600 to-purple-600",
    gradientSoft:
      "from-indigo-100 to-transparent dark:from-indigo-500/10 dark:to-transparent",
    ring: "ring-indigo-600 dark:ring-indigo-500",
    slider:
      "accent-indigo-600 dark:accent-indigo-500 [&::-webkit-slider-thumb]:bg-indigo-600 dark:[&::-webkit-slider-thumb]:bg-indigo-500",
    fill: "fill-indigo-600 dark:fill-indigo-400",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 text-white",
    bgSoft: "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400",
    border: "border-rose-600 dark:border-rose-500",
    shadow: "shadow-rose-500/20",
    gradient: "from-rose-600 to-orange-500",
    gradientSoft:
      "from-rose-100 to-transparent dark:from-rose-500/10 dark:to-transparent",
    ring: "ring-rose-600 dark:ring-rose-500",
    slider:
      "accent-rose-600 dark:accent-rose-500 [&::-webkit-slider-thumb]:bg-rose-600 dark:[&::-webkit-slider-thumb]:bg-rose-500",
    fill: "fill-rose-600 dark:fill-rose-400",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 text-white",
    bgSoft:
      "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-600 dark:border-emerald-500",
    shadow: "shadow-emerald-500/20",
    gradient: "from-emerald-600 to-teal-500",
    gradientSoft:
      "from-emerald-100 to-transparent dark:from-emerald-500/10 dark:to-transparent",
    ring: "ring-emerald-600 dark:ring-emerald-500",
    slider:
      "accent-emerald-600 dark:accent-emerald-500 [&::-webkit-slider-thumb]:bg-emerald-600 dark:[&::-webkit-slider-thumb]:bg-emerald-500",
    fill: "fill-emerald-600 dark:fill-emerald-400",
  },
  zinc: {
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
    bgSoft: "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    shadow: "shadow-zinc-900/20 dark:shadow-white/10",
    gradient: "from-zinc-800 to-zinc-900 dark:from-zinc-200 dark:to-zinc-400",
    gradientSoft:
      "from-zinc-200 to-transparent dark:from-zinc-800/50 dark:to-transparent",
    ring: "ring-zinc-900 dark:ring-zinc-100",
    slider:
      "accent-zinc-900 dark:accent-zinc-100 [&::-webkit-slider-thumb]:bg-zinc-900 dark:[&::-webkit-slider-thumb]:bg-zinc-100",
    fill: "fill-zinc-900 dark:fill-zinc-100",
  },
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

export const getThemeStyles = (color: PricingColor = "primary") => {
  if (color === "primary") {
    return {
      theme: {
        text: "text-[var(--pricing-accent)]",
        bg: "bg-[var(--pricing-accent)] text-[var(--pricing-on)]",
        bgSoft: "bg-[var(--pricing-accent)]/10 text-[var(--pricing-accent)]",
        border: "border-[var(--pricing-accent)]",
        shadow: "shadow-[var(--pricing-accent)]/20",
        gradient: "from-[var(--pricing-accent)] to-[var(--pricing-accent)]/80",
        gradientSoft:
          "from-[var(--pricing-accent)]/10 to-transparent dark:from-[var(--pricing-accent)]/10 dark:to-transparent",
        ring: "ring-[var(--pricing-accent)]",
        slider:
          "accent-[var(--pricing-accent)] [&::-webkit-slider-thumb]:bg-[var(--pricing-accent)]",
        fill: "fill-[var(--pricing-accent)]",
      },
      style: {
        "--pricing-accent": "var(--primary)",
        "--pricing-on": "var(--primary-foreground)",
      } as React.CSSProperties,
    };
  }

  if (colorThemes[color]) {
    return { theme: colorThemes[color], style: {} };
  }

  const rgb = hexToRgb(color);
  return {
    theme: {
      text: "text-[var(--pricing-accent)]",
      bg: "bg-[var(--pricing-accent)] text-white",
      bgSoft: "bg-[var(--pricing-accent)]/10 text-[var(--pricing-accent)]",
      border: "border-[var(--pricing-accent)]",
      shadow: "shadow-[var(--pricing-accent)]/20",
      gradient: "from-[var(--pricing-accent)] to-[var(--pricing-accent)]/80",
      gradientSoft: "from-[var(--pricing-accent)]/10 to-transparent",
      ring: "ring-[var(--pricing-accent)]",
      slider:
        "accent-[var(--pricing-accent)] [&::-webkit-slider-thumb]:bg-[var(--pricing-accent)]",
      fill: "fill-[var(--pricing-accent)]",
    },
    style: {
      "--pricing-accent": color,
      "--pricing-rgb": rgb,
    } as React.CSSProperties,
  };
};

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Zap,
  Building,
  Users,
  Code2,
  PenTool,
};

// Animated Price Counter Component
const AnimatedPrice = ({ value }: { value: number | string }) => {
  const cleanValue = String(value);
  const numericValue = parseFloat(cleanValue.replace(/[^0-9.]/g, ""));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isNaN(numericValue)) return;
    let startTime: number;
    const duration = 650;
    const startValue = 0;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(startValue + (numericValue - startValue) * easeProgress);
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplayValue(numericValue);
    };
    requestAnimationFrame(animate);
  }, [numericValue, value]);

  if (isNaN(numericValue)) return <span>{cleanValue}</span>;
  const isDecimal = cleanValue.includes(".");
  return (
    <span>
      {isDecimal
        ? displayValue.toFixed(2)
        : Math.round(displayValue).toLocaleString()}
    </span>
  );
};

// ==========================================
// 1. PRICING CARDS (TIERED)
// ==========================================
export interface Plan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  buttonText: string;
  popular: boolean;
  icon: string;
  features: string[];
}
export interface PricingData {
  tabs: { id: string; label: string; plans: Plan[] }[];
}

export function PricingCards({
  data,
  variant = "default",
  color = "primary",
  linkComponent: LinkComp = "a",
}: {
  data: PricingData;
  variant?: PricingVariant;
  color?: PricingColor;
  linkComponent?: React.ElementType;
}) {
  const [activeTab, setActiveTab] = useState(data.tabs[0]?.id || "monthly");
  const { theme, style } = getThemeStyles(color);

  const currentTab =
    data.tabs.find((t) => t.id === activeTab) || data.tabs[0];

  return (
    <div className="w-full max-w-6xl mx-auto py-8 sm:py-12" style={style}>
      {data.tabs.length > 1 && (
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-muted p-1 rounded-xl flex gap-1 border border-border">
            {data.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer",
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {currentTab.plans.map((plan) => {
          const IconComponent = iconMap[plan.icon] || Zap;
          const isPopular = plan.popular;

          return (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 bg-background border",
                variant === "default" &&
                  (isPopular
                    ? cn(theme.border, "shadow-xl scale-105 z-10")
                    : "border-border shadow-sm"),
                variant === "premium" &&
                  (isPopular
                    ? cn(
                        theme.border,
                        "shadow-2xl scale-105 z-10 bg-gradient-to-b",
                        theme.gradientSoft,
                      )
                    : "border-border shadow-md"),
                variant === "elegant" &&
                  (isPopular
                    ? cn("border-t-4", theme.border, "shadow-lg")
                    : "border-border"),
                variant === "minimal" &&
                  (isPopular
                    ? cn("ring-2", theme.ring, "shadow-md")
                    : "border-border shadow-none"),
                variant === "bordered" &&
                  "border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]",
              )}
            >
              {isPopular && (
                <div
                  className={cn(
                    "absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm",
                    theme.bg,
                  )}
                >
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      "p-3 rounded-2xl",
                      isPopular ? theme.bgSoft : "bg-muted",
                    )}
                  >
                    <IconComponent
                      className={cn(
                        "w-6 h-6",
                        isPopular ? theme.text : "text-muted-foreground",
                      )}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {plan.title}
                  </h3>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  {plan.subtitle}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-foreground">
                    <AnimatedPrice value={plan.price} />
                  </span>
                  <span className="text-sm text-muted-foreground">
                    /{plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                      <Check className={cn("w-4 h-4 shrink-0", theme.text)} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <LinkComp
                href="#"
                className={cn(
                  "w-full py-3 rounded-xl font-bold text-sm text-center transition-all cursor-pointer block",
                  isPopular
                    ? cn(theme.bg, "shadow-md hover:opacity-90")
                    : "bg-muted text-foreground hover:bg-muted/80",
                )}
              >
                {plan.buttonText}
              </LinkComp>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 2. PRICING BUILDER (GSAP QUOTE BUILDER)
// ==========================================
export interface PricingBuilderModule {
  id: string;
  name: string;
  price: number;
}

export interface PricingBuilderProps {
  title?: string;
  subtitle?: string;
  basePrice?: number;
  modules?: PricingBuilderModule[];
  defaultSelected?: string[];
  buttonText?: string;
  color?: PricingColor;
  className?: string;
}

const DEFAULT_BUILDER_MODULES: PricingBuilderModule[] = [
  { id: "auth", name: "User Authentication", price: 15 },
  { id: "db", name: "Database Storage", price: 25 },
  { id: "analytics", name: "Advanced Analytics", price: 35 },
  { id: "support", name: "24/7 SLA Support", price: 50 },
  { id: "domain", name: "Custom Domain & SSL", price: 10 },
];

export function PricingBuilder({
  title = "Custom Quote Builder",
  subtitle = "Select only the modules you need for your project.",
  basePrice = 29,
  modules = DEFAULT_BUILDER_MODULES,
  defaultSelected = ["auth", "db"],
  buttonText = "Deploy Custom Stack",
  color = "primary",
  className,
}: PricingBuilderProps) {
  const [selectedModules, setSelectedModules] = useState<string[]>(defaultSelected);
  const { theme, style } = getThemeStyles(color);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const totalPrice = selectedModules.reduce((acc, curr) => {
    const mod = modules.find((m) => m.id === curr);
    return acc + (mod?.price || 0);
  }, basePrice);

  return (
    <div
      className={cn("w-full max-w-4xl mx-auto p-6 sm:p-10 bg-background border border-border rounded-3xl shadow-xl", className)}
      style={style}
    >
      <div className="text-center mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-3">
          {modules.map((mod) => {
            const isSelected = selectedModules.includes(mod.id);
            return (
              <div
                key={mod.id}
                onClick={() => toggleModule(mod.id)}
                className={cn(
                  "p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between",
                  isSelected
                    ? cn(theme.border, theme.bgSoft, "shadow-sm")
                    : "border-border bg-background hover:bg-muted/50",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-md border flex items-center justify-center transition-all",
                      isSelected
                        ? cn(theme.bg, theme.border)
                        : "border-muted-foreground/40",
                    )}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="font-semibold text-sm sm:text-base text-foreground">
                    {mod.name}
                  </span>
                </div>
                <span className="font-bold text-sm text-foreground">
                  +${mod.price}/mo
                </span>
              </div>
            );
          })}
        </div>

        <div className="bg-muted/40 p-6 sm:p-8 rounded-3xl border border-border flex flex-col justify-between h-full min-h-[300px]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
              Estimated Total
            </span>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl sm:text-6xl font-black text-foreground">
                <AnimatedPrice value={totalPrice} />
              </span>
              <span className="text-muted-foreground font-medium">/month</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
              Base tier includes core infrastructure (${basePrice}/mo). Cancel or alter your plan modules anytime.
            </p>
          </div>

          <button
            className={cn(
              "w-full py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-md hover:opacity-90",
              theme.bg,
            )}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. PRICING TABLE (COMPARISON)
// ==========================================
export interface TableFeature {
  name: string;
  values: (string | boolean)[];
  helpText?: string;
}
export interface TableSection {
  title: string;
  features: TableFeature[];
}
export interface PricingTableData {
  plans: {
    id: string;
    title: string;
    price: string;
    buttonText: string;
    featured?: boolean;
  }[];
  sections: TableSection[];
}

export function PricingTable({
  data,
  color = "primary",
}: {
  data: PricingTableData;
  color?: PricingColor;
}) {
  const { theme, style } = getThemeStyles(color);
  const renderFeatureValue = (value: string | boolean) => {
    if (value === true)
      return <Check className={cn("w-5 h-5 mx-auto", theme.text)} />;
    if (value === false)
      return (
        <Minus className="w-5 h-5 text-zinc-300 dark:text-zinc-700 mx-auto" />
      );
    return (
      <span className="text-sm font-medium text-foreground">
        {value}
      </span>
    );
  };

  const FeatureLabel = ({ feature }: { feature: TableFeature }) => (
    <>
      {feature.name}
      {feature.helpText && (
        <span className="group relative cursor-help">
          <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-zinc-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-center block">
            {feature.helpText}
          </span>
        </span>
      )}
    </>
  );

  const ctaClass = (featured?: boolean) =>
    cn(
      "w-full py-2.5 rounded-xl font-bold transition-all text-sm cursor-pointer",
      featured
        ? cn(theme.bg, theme.shadow)
        : "border border-border dark:bg-zinc-800 text-foreground",
    );

  return (
    <div className="@container/pricing w-full max-w-6xl mx-auto" style={style}>
      <div className="flex flex-col gap-6 @min-[52rem]/pricing:hidden">
        {data.plans.map((plan, pIdx) => (
          <div
            key={plan.id}
            className={cn(
              "overflow-hidden rounded-2xl border bg-background shadow-sm",
              plan.featured
                ? theme.border
                : "border-border",
            )}
          >
            <div
              className={cn(
                "p-6 border-b border-border",
                plan.featured
                  ? theme.bgSoft
                  : "bg-muted",
              )}
            >
              <h4
                className={cn(
                  "text-lg font-bold",
                  plan.featured ? theme.text : "text-foreground",
                )}
              >
                {plan.title}
              </h4>
              <div className="text-3xl font-black text-foreground mb-5">
                {plan.price}
              </div>
              <button className={ctaClass(plan.featured)}>
                {plan.buttonText}
              </button>
            </div>
            {data.sections.map((section, sIdx) => (
              <div key={sIdx}>
                <div className="px-6 py-2.5 bg-muted/80 border-b border-border font-bold text-xs text-foreground uppercase tracking-wider">
                  {section.title}
                </div>
                {section.features.map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="px-6 py-3 flex items-center justify-between gap-4 border-b border-border last:border-b-0"
                  >
                    <span className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
                      <FeatureLabel feature={feature} />
                    </span>
                    <span className="shrink-0">
                      {renderFeatureValue(feature.values[pIdx])}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="hidden @min-[52rem]/pricing:block overflow-hidden border border-border rounded-2xl bg-background shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-4 bg-muted border-b border-border">
              <div className="p-6 flex items-end">
                <h3 className="font-bold text-xl text-foreground">
                  Compare Plans
                </h3>
              </div>
              {data.plans.map((plan) => (
                <div
                  key={plan.id}
                  className={cn(
                    "p-6 text-center border-l border-border relative",
                    plan.featured ? theme.bgSoft : "",
                  )}
                >
                  {plan.featured && (
                    <div
                      className={cn("absolute top-0 left-0 w-full h-1", theme.bg)}
                    />
                  )}
                  <h4
                    className={cn(
                      "text-lg font-bold mb-2",
                      plan.featured
                        ? theme.text
                        : "text-foreground",
                    )}
                  >
                    {plan.title}
                  </h4>
                  <div className="text-3xl font-black text-foreground mb-6">
                    {plan.price}
                  </div>
                  <button className={ctaClass(plan.featured)}>
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
            {data.sections.map((section, sIdx) => (
              <div key={sIdx}>
                <div className="grid grid-cols-4 bg-muted/80 border-b border-border">
                  <div className="p-4 font-bold text-sm text-foreground uppercase tracking-wider">
                    {section.title}
                  </div>
                  <div className="border-l border-border"></div>
                  <div className="border-l border-border"></div>
                  <div className="border-l border-border"></div>
                </div>
                {section.features.map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="grid grid-cols-4 border-b border-border transition-colors"
                  >
                    <div className="p-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <FeatureLabel feature={feature} />
                    </div>
                    {feature.values.map((val, vIdx) => (
                      <div
                        key={vIdx}
                        className={cn(
                          "p-4 flex items-center justify-center border-l border-border",
                          data.plans[vIdx].featured ? theme.bgSoft : "",
                        )}
                      >
                        {renderFeatureValue(val)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. USAGE SLIDER
// ==========================================
export interface PricingSliderProps {
  title?: string;
  subtitle?: string;
  basePrice?: number;
  pricePerStep?: number;
  minViews?: string;
  maxViews?: string;
  buttonText?: string;
  color?: PricingColor;
  className?: string;
}

export function PricingSlider({
  title = "Usage Based Pricing",
  subtitle = "Scale your pricing as your traffic grows.",
  basePrice = 29,
  pricePerStep = 10,
  minViews = "10k Views",
  maxViews = "1M+ Views",
  buttonText = "Start 14-Day Free Trial",
  color = "primary",
  className,
}: PricingSliderProps) {
  const [value, setValue] = useState(5);
  const { theme, style } = getThemeStyles(color);
  const calculatedPrice = basePrice + value * pricePerStep;
  const pageviews =
    value === 0 ? "10k" : value === 10 ? "1M+" : `${value * 100}k`;
  const percentage = (value / 10) * 100;

  return (
    <div
      className={cn("w-full max-w-2xl mx-auto p-5 sm:p-8 md:p-12 bg-background border border-border rounded-3xl shadow-xl text-center", className)}
      style={style}
    >
      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-10">
        {subtitle}
      </p>
      <div className="mb-6 sm:mb-12">
        <div className="text-[52px] sm:text-[80px] font-black tracking-tighter leading-none text-foreground mb-2">
          $<AnimatedPrice value={calculatedPrice} />
        </div>
        <p className="text-muted-foreground font-medium tracking-wide uppercase text-xs sm:text-sm">
          Per Month
        </p>
      </div>
      <div className="relative mb-6 sm:mb-12">
        <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-muted-foreground mb-4 px-1 uppercase tracking-widest">
          <span>{minViews}</span>
          <span className={cn("font-extrabold px-3 py-1 rounded-lg border border-border bg-muted/50 shadow-2xs transition-colors", theme.text)}>
            {pageviews} Views
          </span>
          <span>{maxViews}</span>
        </div>
        
        {/* Modern Custom Range Slider */}
        <div className="relative flex items-center h-8 w-full group touch-none">
          {/* Custom Track Background */}
          <div className="absolute inset-x-0 h-3 rounded-full bg-zinc-200/80 dark:bg-zinc-800 overflow-hidden pointer-events-none">
            <div
              className={cn("h-full transition-all duration-75 rounded-full", theme.bg)}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Invisible Range Input Overlay */}
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value, 10))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            aria-label="Usage pageviews volume"
          />

          {/* Custom Thumb Handle */}
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 size-6 rounded-full bg-background border-2 shadow-md pointer-events-none transition-transform duration-75 group-hover:scale-110 flex items-center justify-center z-10",
              theme.border
            )}
            style={{ left: `calc(${percentage}% - 12px)` }}
          >
            <div className={cn("size-2.5 rounded-full", theme.bg)} />
          </div>
        </div>
      </div>
      <button
        className={cn(
          "w-full py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-lg transition-all active:scale-[0.98] cursor-pointer shadow-lg",
          theme.bg,
        )}
      >
        {buttonText}
      </button>
      <p className="text-xs text-muted-foreground mt-3 sm:mt-4">
        No credit card required. Cancel anytime.
      </p>
    </div>
  );
}

// ==========================================
// 5. TYPOGRAPHIC MENU
// ==========================================
export interface PricingTypographicPlan {
  id: string | number;
  name: string;
  price: string | number;
  description: string;
  features: string[];
  isFeatured: boolean;
  billingCycle?: "monthly" | "yearly" | string;
}

export function PricingTypographic({
  packages,
  color = "primary",
  linkComponent: LinkComp = "a",
}: {
  packages: any;
  color?: PricingColor;
  linkComponent?: React.ElementType;
}) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [selectedPlanId, setSelectedPlanId] = useState<string | number | null>(
    null,
  );
  const { theme, style } = getThemeStyles(color);

  let monthlyPlans: PricingTypographicPlan[] = [];
  let yearlyPlans: PricingTypographicPlan[] = [];

  if (Array.isArray(packages)) {
    monthlyPlans = packages.filter(
      (p) => p.billingCycle?.toLowerCase() === "monthly",
    );
    yearlyPlans = packages.filter(
      (p) => p.billingCycle?.toLowerCase() === "yearly",
    );
  } else if (packages && typeof packages === "object") {
    monthlyPlans =
      packages.monthly ||
      packages.packages?.monthly ||
      packages.data?.monthly ||
      [];
    yearlyPlans =
      packages.yearly ||
      packages.packages?.yearly ||
      packages.data?.yearly ||
      [];
  }

  const activePlans = billingCycle === "monthly" ? monthlyPlans : yearlyPlans;
  const hasYearlyPlans = yearlyPlans.length > 0;

  const defaultPlan =
    activePlans.find((p) => p.isFeatured) ?? activePlans[0] ?? null;
  const activePlanId =
    selectedPlanId ?? (defaultPlan ? defaultPlan.id : null);

  const activePlan =
    activePlans.find((p) => p.id === activePlanId) || activePlans[0];

  const handleToggleCycle = (cycle: "monthly" | "yearly") => {
    setBillingCycle(cycle);
    const newPlans = cycle === "monthly" ? monthlyPlans : yearlyPlans;
    if (newPlans.length > 0) {
      const newFeatured = newPlans.find((p) => p.isFeatured) || newPlans[0];
      setSelectedPlanId(newFeatured.id);
    }
  };

  if (!packages) {
    return (
      <section className="py-16 sm:py-32 bg-background flex justify-center items-center min-h-[300px] sm:min-h-[500px] rounded-3xl border border-border">
        <div
          className={cn(
            "w-8 h-8 border-4 border-t-transparent rounded-full animate-spin",
            theme.border,
          )}
        />
      </section>
    );
  }

  if (!activePlans.length) {
    return (
      <section className="py-16 sm:py-32 bg-background text-center text-muted-foreground text-sm font-mono rounded-3xl border border-border">
        No pricing plans available.
      </section>
    );
  }

  return (
    <section
      style={style}
      className={cn(
        "py-8 sm:py-16 md:py-24 px-4 sm:px-6 bg-background text-foreground font-sans antialiased overflow-hidden rounded-3xl border border-border w-full transition-colors duration-300 relative",
        "selection:bg-[var(--pricing-accent)] selection:text-[var(--pricing-on)]",
      )}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .outline-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(0, 0, 0, 0.25);
          transition: -webkit-text-stroke 0.3s ease;
        }
        .group:hover .outline-text {
          -webkit-text-stroke: 1px rgba(0, 0, 0, 0.7);
        }
        .dark .outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25);
        }
        .dark .group:hover .outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.7);
        }
      `,
        }}
      />

      <div className="max-w-[1300px] mx-auto px-1 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8 mb-8 sm:mb-16 lg:mb-20">
          <div className="max-w-xl">
            <h2 className={cn("text-xs font-mono mb-2 sm:mb-4", theme.text)}>
              <span className="flex items-center gap-3 justify-start">
                <span
                  className={cn("w-2 h-2 rounded-full animate-pulse", theme.bg)}
                />
                Pricing
              </span>
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-3 sm:mb-5 text-foreground">
              Pricing Model.
            </h3>
            <p className="text-muted-foreground text-sm sm:text-lg md:text-xl font-medium leading-relaxed">
              Transparent, value-driven pricing designed for high-growth brands.
              Select a tier to explore what&apos;s included.
            </p>
          </div>

          {hasYearlyPlans && (
            <div className="flex gap-6 shrink-0">
              {["monthly", "yearly"].map((cycle) => (
                <button
                  key={cycle}
                  onClick={() =>
                    handleToggleCycle(cycle as "monthly" | "yearly")
                  }
                  className={cn(
                    "text-sm font-bold uppercase tracking-widest pb-1 border-b-2 transition-all duration-300 cursor-pointer",
                    billingCycle === cycle
                      ? cn(theme.text, theme.border)
                      : "text-muted-foreground border-transparent hover:text-foreground",
                  )}
                >
                  {cycle}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DESKTOP CANVAS */}
        <div className="hidden lg:flex w-full border-t border-border min-h-[550px] transition-colors duration-300">
          {/* LEFT: NAVIGATION */}
          <div className="w-[45%] border-r border-border py-12 pr-8 flex flex-col justify-center gap-6 transition-colors duration-300">
            {activePlans.map((plan) => {
              const isActive = activePlanId === plan.id;
              return (
                <button
                  key={plan.id}
                  onMouseEnter={() => setSelectedPlanId(plan.id)}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className="group flex flex-col items-start text-left w-full py-4 pr-4 cursor-pointer"
                >
                  <div
                    className={cn(
                      "flex flex-col items-start transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu",
                      isActive
                        ? "translate-x-6 sm:translate-x-8 scale-[1.02]"
                        : "group-hover:translate-x-3"
                    )}
                  >
                    {plan.isFeatured && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-extrabold border transition-all duration-300 mb-2.5 shadow-2xs",
                          isActive
                            ? cn(theme.bgSoft, theme.border, theme.text)
                            : "border-border bg-muted/60 text-muted-foreground group-hover:border-primary/40 group-hover:text-foreground",
                        )}
                      >
                        <span className="text-[11px]">✦</span> Most Popular
                      </span>
                    )}
                    <span
                      className={cn(
                        "text-4xl lg:text-5xl xl:text-[4rem] font-black uppercase tracking-tighter leading-[0.85] break-words whitespace-normal inline-block transition-colors duration-300",
                        isActive
                          ? theme.text
                          : "outline-text group-hover:text-foreground/80",
                      )}
                    >
                      {plan.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: CONTENT */}
          <div className="w-[55%] py-12 pl-12 xl:pl-16 relative overflow-hidden flex flex-col">
            {activePlan && (
              <div
                key={activePlan.id}
                className="animate-in fade-in slide-in-from-right-8 duration-700 fill-mode-both flex flex-col h-full z-10 relative"
              >
                {activePlan.isFeatured && (
                  <div
                    className={cn(
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] blur-[100px] rounded-full pointer-events-none",
                      theme.bgSoft,
                    )}
                  />
                )}

                <div className="absolute right-2 -top-6 text-[110px] xl:text-[145px] font-black text-foreground/[0.03] pointer-events-none select-none tracking-tighter leading-none transition-colors duration-300 max-w-full overflow-hidden text-right">
                  $<AnimatedPrice key={`wm-${activePlan.id}-${activePlan.price}`} value={activePlan.price} />
                </div>

                <div className="mb-12 relative z-10">
                  {activePlan.isFeatured && (
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4 rounded-full border",
                        theme.bgSoft,
                        theme.border,
                        theme.text,
                      )}
                    >
                      <Star className={cn("w-3 h-3", theme.fill)} />
                      Recommended
                    </div>
                  )}

                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-bold text-zinc-400 dark:text-zinc-600 mb-2">
                      $
                    </span>
                    <span className="text-[70px] xl:text-[90px] leading-none font-black tracking-tighter text-foreground">
                      <AnimatedPrice key={`main-${activePlan.id}-${activePlan.price}`} value={activePlan.price} />
                    </span>
                  </div>
                  <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                    {activePlan.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-10 gap-y-5 mb-14 relative z-10">
                  {activePlan.features.map((feature: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 border-b border-border pb-3 group/feat transition-colors duration-300"
                    >
                      <div
                        className={cn(
                          "w-1.5 h-1.5 bg-zinc-300 dark:bg-white/20 rounded-full transition-colors shrink-0",
                          "group-hover/feat:bg-[var(--pricing-accent)]",
                        )}
                      />
                      <span className="text-sm lg:text-base text-muted-foreground group-hover/feat:text-foreground dark:group-hover/feat:text-white transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <LinkComp
                  href="#"
                  className={cn(
                    "group mt-auto w-max py-4 px-8 rounded-full text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 relative overflow-hidden z-10",
                    activePlan.isFeatured
                      ? theme.bg
                      : "bg-muted text-zinc-900 dark:bg-white dark:text-black",
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 translate-y-[100%] rounded-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
                      activePlan.isFeatured ? "bg-black/20" : theme.bg,
                    )}
                  />
                  <span
                    className={cn(
                      "relative z-10 transition-colors duration-500",
                      !activePlan.isFeatured &&
                        "group-hover:text-[var(--pricing-on)]",
                    )}
                  >
                    Initiate Project
                  </span>
                  <div className="relative z-10 w-4 h-4 overflow-hidden flex items-center">
                    <ArrowRight
                      className={cn(
                        "absolute w-4 h-4 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
                        !activePlan.isFeatured &&
                          "group-hover:text-[var(--pricing-on)]",
                      )}
                    />
                    <ArrowRight
                      className={cn(
                        "absolute w-4 h-4 translate-x-0 group-hover:translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
                        !activePlan.isFeatured &&
                          "group-hover:text-[var(--pricing-on)]",
                      )}
                    />
                  </div>
                </LinkComp>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE FALLBACK */}
        <div className="flex flex-col lg:hidden border-t border-border transition-colors duration-300">
          {activePlans.map((plan) => {
            const isActive = activePlanId === plan.id;
            return (
              <div
                key={plan.id}
                className="border-b border-border transition-colors duration-300"
              >
                <button
                  onClick={() => setSelectedPlanId(isActive ? null : plan.id)}
                  className="w-full py-6 md:py-8 flex justify-between items-center text-left"
                >
                  <div className="flex flex-col pr-4">
                    {plan.isFeatured && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase font-extrabold border transition-all duration-300 mb-1.5 w-max",
                          isActive
                            ? cn(theme.bgSoft, theme.border, theme.text)
                            : "border-border bg-muted/60 text-muted-foreground",
                        )}
                      >
                        ✦ Most Popular
                      </span>
                    )}
                    <span
                      className={cn(
                        "text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9] break-words whitespace-normal transition-colors duration-300",
                        isActive ? theme.text : "outline-text",
                      )}
                    >
                      {plan.name}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "transition-transform duration-500 shrink-0",
                      isActive
                        ? cn("rotate-90", theme.text)
                        : "text-zinc-300 dark:text-white/30",
                    )}
                  >
                    <ArrowRight size={24} strokeWidth={2} />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8 pt-2 flex flex-col relative">
                      {plan.isFeatured && (
                        <div
                          className={cn(
                            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] blur-[80px] rounded-full pointer-events-none",
                            theme.bgSoft,
                          )}
                        />
                      )}

                      <div className="flex items-end gap-1.5 mb-3 relative z-10">
                        <span className="text-xl font-bold text-zinc-400 dark:text-zinc-600 mb-1.5">
                          $
                        </span>
                        <span className="text-5xl md:text-6xl font-black tracking-tighter text-foreground">
                          <AnimatedPrice key={`mob-${plan.id}-${plan.price}`} value={plan.price} />
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 relative z-10">
                        {plan.description}
                      </p>

                      <div className="flex flex-col gap-3 mb-8 relative z-10">
                        {plan.features.map((feature: string, i: number) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 border-b border-border pb-3"
                          >
                            <div
                              className={cn(
                                "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                                theme.bg,
                              )}
                            />
                            <span className="text-sm md:text-base text-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <LinkComp
                        href="#"
                        className={cn(
                          "group w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 relative overflow-hidden z-10",
                          plan.isFeatured
                            ? theme.bg
                            : "bg-muted text-zinc-900 dark:bg-white dark:text-black",
                        )}
                      >
                        <div
                          className={cn(
                            "absolute inset-0 translate-y-[100%] rounded-xl group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
                            plan.isFeatured ? "bg-black/20" : theme.bg,
                          )}
                        />
                        <span
                          className={cn(
                            "relative z-10 transition-colors duration-500",
                            !plan.isFeatured &&
                              "group-hover:text-[var(--pricing-on)]",
                          )}
                        >
                          Initiate Project
                        </span>
                      </LinkComp>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PricingCards;
