"use client";

import gsap from "gsap";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Building,
  Check,
  CheckCircle2,
  Code2,
  HelpCircle,
  Minus,
  PenTool,
  Rocket,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { type PricingColor, getThemeStyles } from "./pricing-theme";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroupBlock";
export type PricingVariant =
  | "default"
  | "dot-pattern"
  | "scale"
  | "elegant"
  | "minimal"
  | "bordered";

// Two-tone leaf tree icon matching uploaded image (yellow/amber left leaf, bright green right leaf, dark trunk)
const SproutIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("w-6 h-6", className)}
  >
    {/* Central Trunk */}
    <path
      d="M12 21V11"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Left Leaf - Golden/Amber */}
    <path
      d="M11.5 12.5C11.5 12.5 6 12 5 7.5C4 3.5 8 3 11.5 7.5C11.5 9 11.5 12.5 11.5 12.5Z"
      fill="#EAB308"
      stroke="#CA8A04"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Right Leaf - Bright Green */}
    <path
      d="M12.5 10.5C12.5 10.5 13 4 17.5 4.5C21 5 18.5 10 14.5 11.5C13.5 12 12.5 10.5 12.5 10.5Z"
      fill="#84CC16"
      stroke="#65A30D"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
);

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Zap,
  Building,
  Users,
  Code2,
  PenTool,
};

// Animated Price Counter Component
const AnimatedPrice = ({
  value,
  counting = true,
}: {
  value: number | string;
  counting?: boolean;
}) => {
  const cleanValue = String(value);
  const numericValue = parseFloat(cleanValue.replace(/[^0-9.]/g, ""));
  const [displayValue, setDisplayValue] = useState(counting ? 0 : numericValue);

  useEffect(() => {
    // Both cases render the value directly, without reading state.
    if (!counting || isNaN(numericValue)) return;
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
  }, [numericValue, value, counting]);

  if (isNaN(numericValue)) return <span>{cleanValue}</span>;
  if (!counting) return <span>{cleanValue.replace(/[^0-9.]/g, "")}</span>;

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
  counting = true,
  title,
  subtitle,
  badgeText,
  linkComponent: LinkComp = "a",
}: {
  data: PricingData;
  variant?: PricingVariant;
  color?: PricingColor;
  counting?: boolean;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  linkComponent?: React.ElementType;
}) {
  const [activeTab, setActiveTab] = useState(data.tabs[0]?.id || "monthly");
  const { theme, style } = getThemeStyles(color);

  const currentTab =
    data.tabs.find((t) => t.id === activeTab) || data.tabs[0];

  if (variant === "dot-pattern") {
    const convertedPlans: DotPatternPlanItem[] = currentTab.plans.map((p) => ({
      id: p.id,
      badgeTag: p.title.toUpperCase(),
      price: p.price.startsWith("$") ? p.price : `$${p.price}`,
      period: p.period ? `/${p.period}` : undefined,
      description: p.subtitle,
      buttonText: p.buttonText,
      featured: p.popular,
      featuresTitle: "What's included:",
      features: p.features,
    }));
    return (
      <PricingDotPattern
        title={title}
        subtitle={subtitle}
        badgeText={badgeText}
        plans={convertedPlans}
        color={color}
        counting={counting}
        linkComponent={LinkComp}
      />
    );
  }

  if (variant === "scale") {
    const scaleFormattedPlans: { monthly: ScalePlanItem[]; annually: ScalePlanItem[] } & Record<string, ScalePlanItem[]> = {
      monthly: [],
      annually: [],
    };
    data.tabs.forEach((tab) => {
      scaleFormattedPlans[tab.id] = tab.plans.map((p) => ({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        price: p.price.startsWith("$") ? p.price : `$${p.price}`,
        period: p.period ? `/${p.period}` : undefined,
        buttonText: p.buttonText,
        popular: p.popular,
        icon: p.icon,
        featuresTitle: "WHAT'S INCLUDED:",
        features: p.features,
      }));
    });
    return (
      <PricingScale
        title={title}
        subtitle={subtitle}
        badgeText={badgeText}
        plans={scaleFormattedPlans}
        color={color}
        counting={counting}
        linkComponent={LinkComp}
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8 sm:py-12" style={style}>
      {(title || subtitle || badgeText) && (
        <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto mb-8 sm:mb-12">
          {badgeText && (
            <div className={cn("inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[11px] font-semibold tracking-wide shadow-2xs transition-colors", theme.bgSoft, theme.border)}>
              <Sparkles className={cn("w-3.5 h-3.5 fill-current", theme.text)} />
              <span>{badgeText}</span>
            </div>
          )}
          {title && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {data.tabs.length > 1 && (
        <div className="flex justify-center mb-8 sm:mb-12">
          {/* Library ToggleGroup; an empty value (re-clicking the active
              tab) is ignored so one tab is always selected. */}
          <ToggleGroup
            type="single"
            color={color}
            value={activeTab}
            onValueChange={(id) => {
              if (id) setActiveTab(id);
            }}
            aria-label="Billing period"
          >
            {data.tabs.map((tab) => (
              <ToggleGroupItem key={tab.id} value={tab.id} className="font-semibold">
                {tab.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
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
                "relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 bg-background",
                variant === "default" &&
                  (isPopular
                    ? cn("border-2", theme.border, "scale-105 z-10 shadow-none hover:shadow-lg")
                    : "border border-border shadow-none hover:shadow-lg"),

                variant === "elegant" &&
                  (isPopular
                    ? cn("border border-border border-t-4", theme.border, "shadow-lg")
                    : "border border-border hover:shadow-lg"),
                variant === "minimal" &&
                  (isPopular
                    ? cn("border-2", theme.border, "shadow-sm z-10")
                    : "border-0 shadow-none bg-transparent"),
                variant === "bordered" &&
                  (isPopular
                    ? cn(
                        "border-2",
                        theme.border,
                        "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-1 hover:-translate-y-1 z-10",
                      )
                    : "border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-1 hover:-translate-y-1"),
              )}
            >
              {isPopular && (
                <div
                  className={cn(
                    "absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm",
                    theme.bg,
                  )}
                >
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className={cn(
                      "p-3 rounded-2xl shrink-0",
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
                  <h3 className="text-xl font-semibold text-foreground">
                    {plan.title}
                  </h3>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  {plan.subtitle}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl sm:text-5xl font-bold text-foreground">
                    <AnimatedPrice value={plan.price} counting={counting} />
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
                  "w-full py-3 rounded-xl font-semibold text-sm text-center transition-all cursor-pointer block",
                  isPopular
                    ? cn(theme.bg, "shadow-md hover:opacity-90")
                    : variant === "minimal"
                    ? "border border-border bg-background hover:bg-muted text-foreground"
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
  counting?: boolean;
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
  counting = true,
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
      className={cn("w-full max-w-4xl mx-auto p-6 sm:p-10 bg-background border border-border rounded-3xl shadow-sm", className)}
      style={style}
    >
      <div className="text-center mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
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
                <span className="font-semibold text-sm text-foreground">
                  +${mod.price}/mo
                </span>
              </div>
            );
          })}
        </div>

        <div className="bg-muted/40 p-6 sm:p-8 rounded-3xl border border-border flex flex-col justify-between h-full min-h-[300px]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
              Estimated Total
            </span>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl sm:text-6xl font-bold text-foreground">
                <AnimatedPrice value={totalPrice} counting={counting} />
              </span>
              <span className="text-muted-foreground font-medium">/month</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
              Base tier includes core infrastructure (${basePrice}/mo). Cancel or alter your plan modules anytime.
            </p>
          </div>

          <button
            className={cn(
              "w-full py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-md hover:opacity-90",
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

export interface PricingTableProps {
  data: PricingTableData;
  color?: PricingColor;
  counting?: boolean;
  linkComponent?: React.ElementType;
}

export function PricingTable({
  data,
  color = "primary",
  counting = true,
}: PricingTableProps) {
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
      "w-full py-2.5 rounded-xl font-semibold transition-all text-sm cursor-pointer",
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
                  "text-lg font-semibold",
                  plan.featured ? theme.text : "text-foreground",
                )}
              >
                {plan.title}
              </h4>
              <div className="text-3xl font-bold text-foreground mb-5">
                {plan.price.startsWith("$") ? "$" : ""}
                <AnimatedPrice value={plan.price} counting={counting} />
              </div>
              <button className={ctaClass(plan.featured)}>
                {plan.buttonText}
              </button>
            </div>
            {data.sections.map((section, sIdx) => (
              <div key={sIdx}>
                <div className="px-6 py-2.5 bg-muted/80 border-b border-border font-semibold text-xs text-foreground uppercase tracking-wider">
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
                <h3 className="font-semibold text-xl text-foreground">
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
                      "text-lg font-semibold mb-2",
                      plan.featured
                        ? theme.text
                        : "text-foreground",
                    )}
                  >
                    {plan.title}
                  </h4>
                  <div className="text-3xl font-bold text-foreground mb-6">
                    {plan.price.startsWith("$") ? "$" : ""}
                    <AnimatedPrice value={plan.price} counting={counting} />
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
                  <div className="p-4 font-semibold text-sm text-foreground uppercase tracking-wider">
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
  counting?: boolean;
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
  counting = true,
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
      className={cn("w-full max-w-2xl mx-auto p-5 sm:p-8 md:p-12 bg-background border border-border rounded-3xl shadow-sm text-center", className)}
      style={style}
    >
      <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-10">
        {subtitle}
      </p>
      <div className="mb-6 sm:mb-12">
        <div className="text-[52px] sm:text-[80px] font-bold tracking-tighter leading-none text-foreground mb-2">
          $<AnimatedPrice value={calculatedPrice} counting={counting} />
        </div>
        <p className="text-muted-foreground font-medium tracking-wide uppercase text-xs sm:text-sm">
          Per Month
        </p>
      </div>
      <div className="relative mb-6 sm:mb-12">
        <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-muted-foreground mb-4 px-1 uppercase tracking-widest">
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
          "w-full py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-lg transition-all active:scale-[0.98] cursor-pointer shadow-lg",
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

/** Plans already split by billing cycle, optionally one level down. */
export interface PricingTypographicGroups {
  monthly?: PricingTypographicPlan[];
  yearly?: PricingTypographicPlan[];
  packages?: PricingTypographicGroups;
  data?: PricingTypographicGroups;
}

/**
 * Either a flat list, where each plan carries its own `billingCycle`, or a
 * grouped object. Both are accepted; the block sorts it out.
 */
export type PricingTypographicPackages =
  | PricingTypographicPlan[]
  | PricingTypographicGroups;

export interface PricingTypographicProps {
  packages: PricingTypographicPackages;
  color?: PricingColor;
  counting?: boolean;
  linkComponent?: React.ElementType;
}

export function PricingTypographic({
  packages,
  color = "primary",
  counting = true,
  linkComponent: LinkComp = "a",
}: PricingTypographicProps) {
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
      style={{
        ...style,
        backgroundColor: "color-mix(in srgb, var(--pricing-accent, currentColor) 3%, var(--background, transparent))",
      }}
      className={cn(
        "py-8 sm:py-16 md:py-24 px-4 sm:px-6 text-foreground font-sans antialiased overflow-hidden rounded-3xl border border-border w-full transition-colors duration-300 relative",
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
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none mb-3 sm:mb-5 text-foreground">
              Pricing Model.
            </h3>
            <p className="text-muted-foreground text-sm sm:text-lg md:text-xl font-medium leading-relaxed">
              Transparent, value-driven pricing designed for high-growth brands.
              Select a tier to explore what&apos;s included.
            </p>
          </div>

          {hasYearlyPlans && (
            // The library's ToggleGroup in single mode. Re-clicking the active
            // cycle would clear it, so an empty value is ignored — one of the
            // two is always chosen.
            <ToggleGroup
              type="single"
              size="sm"
              color={color}
              value={billingCycle}
              onValueChange={(cycle) => {
                if (cycle) handleToggleCycle(cycle as "monthly" | "yearly");
              }}
              aria-label="Billing cycle"
              className="shrink-0"
            >
              {(["monthly", "yearly"] as const).map((cycle) => (
                <ToggleGroupItem
                  key={cycle}
                  value={cycle}
                  className="font-semibold uppercase tracking-widest"
                >
                  {cycle}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
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
                        "text-4xl lg:text-5xl xl:text-[4rem] font-bold uppercase tracking-tighter leading-[0.85] break-words whitespace-normal inline-block transition-colors duration-300",
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

                <div className="absolute right-2 -top-6 text-[110px] xl:text-[145px] font-bold text-foreground/[0.03] pointer-events-none select-none tracking-tighter leading-none transition-colors duration-300 max-w-full overflow-hidden text-right">
                  $<AnimatedPrice key={`wm-${activePlan.id}-${activePlan.price}`} value={activePlan.price} counting={counting} />
                </div>

                <div className="mb-12 relative z-10">
                  {activePlan.isFeatured && (
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest mb-4 rounded-full border",
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
                    <span className="text-3xl font-semibold text-zinc-400 dark:text-zinc-600 mb-2">
                      $
                    </span>
                    <span className="text-[70px] xl:text-[90px] leading-none font-bold tracking-tighter text-foreground">
                      <AnimatedPrice key={`main-${activePlan.id}-${activePlan.price}`} value={activePlan.price} counting={counting} />
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
                    "group mt-auto w-max py-4 px-8 rounded-full text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-3 relative overflow-hidden z-10",
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
                        "text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[0.9] break-words whitespace-normal transition-colors duration-300",
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
                        <span className="text-xl font-semibold text-zinc-400 dark:text-zinc-600 mb-1.5">
                          $
                        </span>
                        <span className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
                          <AnimatedPrice key={`mob-${plan.id}-${plan.price}`} value={plan.price} counting={counting} />
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
                          "group w-full py-4 rounded-xl text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-3 relative overflow-hidden z-10",
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

// ==========================================
// 6. PRICING PLANS (INTERACTIVE CHECKLIST)
// ==========================================
export interface PricingServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon?: string | React.ReactNode;
  tag?: string;
  features?: string[];
}

export interface PricingPlansProps {
  title?: string;
  subtitle?: string;
  highlightText?: string;
  brandTitle?: string;
  brandSubtitle?: string;
  brandDescription?: string;
  services?: PricingServiceOption[];
  defaultActiveIds?: string[];
  ctaText?: string;
  ctaHref?: string;
  color?: PricingColor;
  counting?: boolean;
  linkComponent?: React.ElementType;
}

const defaultPlansServices: PricingServiceOption[] = [
  {
    id: "design",
    name: "Design",
    description: "Top-notch custom design",
    price: 300,
    icon: "PenTool",
    features: [
      "Top-notch custom design",
      "Figma design & interactive prototype",
      "3 rounds of revisions",
      "1 month of free support",
    ],
  },
  {
    id: "development",
    name: "Development",
    description: "Full development solution",
    price: 400,
    icon: "Code2",
    features: [
      "Framer/Custom development",
      "Avg. 1 week turnaround",
      "5 rounds of revisions",
      "2 months of free support",
    ],
  },
  {
    id: "fast",
    name: "Fast",
    description: "Quick budget solution",
    price: 100,
    icon: "Zap",
    tag: "Fast Track",
    features: [
      "Fast delivery (3X everything)",
      "Quick delivery solution",
    ],
  },
];

const renderPlansIcon = (icon?: string | React.ReactNode) => {
  if (React.isValidElement(icon)) return icon;
  const iconStr = typeof icon === "string" ? icon.toLowerCase() : "";
  switch (iconStr) {
    case "code":
    case "code2":
    case "development":
      return <Code2 className="w-5 h-5 sm:w-7 sm:h-7" />;
    case "zap":
    case "fast":
    case "lightning":
      return <Zap className="w-5 h-5 sm:w-7 sm:h-7" />;
    case "rocket":
      return <Rocket className="w-5 h-5 sm:w-7 sm:h-7" />;
    case "building":
      return <Building className="w-5 h-5 sm:w-7 sm:h-7" />;
    case "design":
    case "pentool":
    default:
      return <PenTool className="w-5 h-5 sm:w-7 sm:h-7" />;
  }
};

const computeCardData = (services: PricingServiceOption[], activeIds: string[]) => {
  const activeServices = services.filter((s) => activeIds.includes(s.id));

  if (activeServices.length === 0) {
    return {
      title: "No Service Selected",
      tag: null,
      price: 0,
      features: [
        "Select the modules above to build your custom package and instantly see your quote.",
      ],
    };
  }

  const price = activeServices.reduce((sum, s) => sum + s.price, 0);
  const title = activeServices.map((s) => s.name).join(" & ");
  const tag =
    activeServices.find((s) => s.tag)?.tag ||
    (activeServices.length > 1 ? "Custom Package" : "Standard");

  const featuresSet = new Set<string>();
  activeServices.forEach((s) => {
    s.features?.forEach((f) => featuresSet.add(f));
  });

  return {
    title,
    tag,
    price,
    features: Array.from(featuresSet),
  };
};

export function PricingPlans({
  title = "Pricing Plans",
  subtitle = "For each plan we",
  highlightText = "Outperform",
  brandTitle = "Custom Services",
  brandSubtitle = "Select options tailored to your goals",
  brandDescription = "Mix and match custom design, full-stack development, and priority delivery to build the ideal package for your business.",
  services = defaultPlansServices,
  defaultActiveIds = ["design"],
  ctaText = "Book a 45-min call",
  ctaHref = "#",
  color = "primary",
  counting = true,
  linkComponent: Link = "a",
}: PricingPlansProps = {}) {
  const { theme, style } = getThemeStyles(color);
  const [activePlans, setActivePlans] = useState<string[]>(defaultActiveIds);
  const cardData = computeCardData(services, activePlans);
  const hasSelection = activePlans.length > 0;

  const cardContentRef = useRef<HTMLDivElement>(null);

  const togglePlan = (id: string) => {
    setActivePlans((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    if (cardContentRef.current) {
      gsap.fromTo(
        cardContentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }
  }, [activePlans]);

  return (
    <section className="w-full bg-background text-foreground py-6 md:py-12 px-4 sm:px-6 font-sans transition-colors duration-300" style={style}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {subtitle}{" "}
            <span className={cn("font-semibold", theme.text)}>{highlightText}</span>
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className={cn("text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 sm:mb-3", theme.text)}>
                {brandTitle}
              </h3>
              <p className="text-lg sm:text-xl md:text-2xl text-foreground font-medium">
                {brandSubtitle}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3 leading-relaxed">
                {brandDescription}
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5 mt-6 sm:mt-10">
              {services.map((service) => {
                const isActive = activePlans.includes(service.id);
                return (
                  <div
                    key={service.id}
                    className="flex items-center justify-between bg-card border border-border p-4 sm:p-6 rounded-2xl transition-colors gap-3 sm:gap-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                      <div
                        className={cn(
                          "p-2.5 sm:p-3.5 rounded-xl transition-colors shrink-0",
                          isActive
                            ? theme.bgSoft
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {renderPlansIcon(service.icon)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-base sm:text-lg md:text-xl text-left truncate">
                          {service.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 truncate">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={() => togglePlan(service.id)}
                      className={cn(
                        "cursor-pointer w-12 h-7 sm:w-14 sm:h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0",
                        isActive ? theme.bg : "bg-zinc-200 dark:bg-zinc-700",
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 sm:w-6 sm:h-6 bg-white dark:bg-zinc-200 rounded-full shadow-md transform transition-transform duration-300",
                          isActive
                            ? "translate-x-5 sm:translate-x-6"
                            : "translate-x-0",
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm relative flex flex-col justify-between min-h-[400px] sm:min-h-[500px] transition-colors">
            <div ref={cardContentRef}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
                <h4 className={cn("text-xl sm:text-2xl font-semibold transition-colors duration-300", hasSelection ? "text-foreground" : "text-muted-foreground")}>
                  {cardData.title}
                </h4>
                {cardData.tag && (
                  <span
                    className={cn(
                      "px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide border self-start sm:self-auto transition-colors duration-300",
                      theme.bgSoft,
                      theme.border,
                    )}
                  >
                    {cardData.tag}
                  </span>
                )}
              </div>

              <div className="mb-6 sm:mb-10">
                <span
                  className={cn(
                    "text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold tracking-tight leading-none break-all transition-colors duration-300",
                    hasSelection ? theme.text : "text-muted-foreground/30 dark:text-muted-foreground/30",
                  )}
                >
                  $<AnimatedPrice value={cardData.price} counting={counting} />
                </span>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-10">
                {cardData.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 sm:gap-4">
                    <Check
                      className={cn(
                        "shrink-0 mt-1 w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300",
                        hasSelection ? theme.text : "text-muted-foreground/40",
                      )}
                    />
                    <span className={cn(
                      "text-sm sm:text-base md:text-lg transition-colors duration-300",
                      hasSelection ? "text-foreground" : "text-muted-foreground font-medium",
                    )}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={hasSelection ? ctaHref : "#"}
              className={cn(
                "w-full text-center transition-all duration-300 font-semibold text-base sm:text-lg md:text-xl py-3.5 sm:py-5 rounded-xl mt-auto flex items-center justify-center",
                hasSelection
                  ? cn(theme.bg, "shadow-lg")
                  : "bg-muted text-muted-foreground/50 cursor-not-allowed pointer-events-none shadow-none",
              )}
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. PRICING SCALE (MODERN CREATOR & SCALE CARDS)
// ==========================================
export interface ScalePlanItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  period?: string;
  buttonText: string;
  popular?: boolean;
  popularBadgeText?: string;
  icon?: string;
  featuresTitle?: string;
  features: string[];
}

export interface PricingScaleProps {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  monthlyLabel?: string;
  annuallyLabel?: string;
  annualDiscountText?: string;
  plans?: {
    monthly: ScalePlanItem[];
    annually: ScalePlanItem[];
  };
  footerTitle?: string;
  footerSubtitle?: string;
  footerCtaText?: string;
  footerCtaHref?: string;
  color?: PricingColor;
  counting?: boolean;
  linkComponent?: React.ElementType;
}

const defaultScalePlans = {
  monthly: [
    {
      id: "launch",
      title: "Launch Plan",
      subtitle: "Ideal for startups and solo marketers",
      price: "$299.00",
      period: "/Month",
      buttonText: "Start with Launch",
      popular: false,
      icon: "Rocket",
      featuresTitle: "WHAT'S INCLUDED:",
      features: [
        "Up to 10,000 subscribers",
        "5 automation workflows",
        "Basic A/B testing",
        "Email support",
        "Drag-and-drop builder",
      ],
    },
    {
      id: "scale",
      title: "Scale Plan",
      subtitle: "For growing teams ready to accelerate",
      price: "$899.00",
      period: "/Month",
      buttonText: "Upgrade to Scale",
      popular: true,
      popularBadgeText: "Most Popular",
      icon: "Sprout",
      featuresTitle: "INCLUDED EVERYTHING IN LAUNCH, PLUS:",
      features: [
        "Unlimited automation workflows",
        "Advanced segmentation & analytics",
        "Priority live chat support",
        "Custom branded templates",
        "Dedicated onboarding",
      ],
    },
  ],
  annually: [
    {
      id: "launch-annual",
      title: "Launch Plan",
      subtitle: "Ideal for startups and solo marketers",
      price: "$269.00",
      period: "/Month",
      buttonText: "Start with Launch",
      popular: false,
      icon: "Rocket",
      featuresTitle: "WHAT'S INCLUDED:",
      features: [
        "Up to 10,000 subscribers",
        "5 automation workflows",
        "Basic A/B testing",
        "Email support",
        "Drag-and-drop builder",
      ],
    },
    {
      id: "scale-annual",
      title: "Scale Plan",
      subtitle: "For growing teams ready to accelerate",
      price: "$809.00",
      period: "/Month",
      buttonText: "Upgrade to Scale",
      popular: true,
      popularBadgeText: "Most Popular",
      icon: "Sprout",
      featuresTitle: "INCLUDED EVERYTHING IN LAUNCH, PLUS:",
      features: [
        "Unlimited automation workflows",
        "Advanced segmentation & analytics",
        "Priority live chat support",
        "Custom branded templates",
        "Dedicated onboarding",
      ],
    },
  ],
};

export function PricingScale({
  badgeText = "PRICING",
  title = "Pricing That Scales With You",
  subtitle = "From solo creators to enterprise teams, pick the plan that matches your ambitions.",
  monthlyLabel = "MONTHLY",
  annuallyLabel = "ANNUALLY",
  annualDiscountText = "(SAVE 10%)",
  plans = defaultScalePlans,
  footerTitle = "Need help choosing the right plan?",
  footerSubtitle = "Schedule a complimentary 20-minute strategy call with our team.",
  footerCtaText = "Book a Free Strategy Call",
  footerCtaHref = "#",
  color = "primary",
  counting = true,
  linkComponent: LinkComp = "a",
}: PricingScaleProps = {}) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const { theme, style } = getThemeStyles(color);
  const currentPlans = plans[billingCycle] || plans.monthly;

  return (
    <section className="w-full bg-slate-50/60 dark:bg-zinc-950/60 py-10 sm:py-16 px-4 sm:px-6 font-sans transition-colors duration-300" style={style}>
      <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[11px] font-semibold tracking-wider text-slate-600 dark:text-zinc-400 uppercase shadow-2xs">
              <span className={cn("w-1.5 h-1.5 rounded-full bg-current", theme.text)} />
              {badgeText}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Toggle switch */}
          <div className="pt-3 flex items-center justify-center gap-3">
            <span className={cn("text-xs font-semibold tracking-wider transition-colors", billingCycle === "monthly" ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-zinc-500")}>
              {monthlyLabel}
            </span>
            <button
              type="button"
              onClick={() => setBillingCycle((prev) => (prev === "monthly" ? "annually" : "monthly"))}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                billingCycle === "annually" ? theme.bg : "bg-slate-200 dark:bg-zinc-800"
              )}
              role="switch"
              aria-checked={billingCycle === "annually"}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-zinc-200 shadow-sm ring-0 transition duration-200 ease-in-out",
                  billingCycle === "annually" ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
            <span className={cn("text-xs font-semibold tracking-wider transition-colors", billingCycle === "annually" ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-zinc-500")}>
              {annuallyLabel} <span className="text-slate-400 dark:text-zinc-500 font-medium">{annualDiscountText}</span>
            </span>
          </div>
        </div>

        {/* Card Container Grid */}
        <div className="bg-slate-100/70 dark:bg-zinc-900/60 p-3 sm:p-4 rounded-[32px] border border-slate-200/80 dark:border-zinc-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 shadow-xs">
          {currentPlans.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300",
                  isPopular
                    ? cn("bg-white dark:bg-zinc-900 ring-2 shadow-lg shadow-slate-200/50 dark:shadow-none", theme.ring)
                    : "bg-slate-100/60 dark:bg-zinc-900/40 border-0 shadow-none"
                )}
              >
                {/* Top header area */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border shadow-2xs",
                      isPopular
                        ? "bg-slate-50 dark:bg-zinc-800 border-slate-200/60 dark:border-zinc-700/60"
                        : "bg-white dark:bg-zinc-800 border-white dark:border-zinc-700"
                    )}>
                      {plan.icon === "Sprout" ? (
                        <SproutIcon />
                      ) : (
                        <Rocket className={cn("w-5 h-5", isPopular ? theme.text : "text-slate-700 dark:text-zinc-300")} />
                      )}
                    </div>

                    {isPopular && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300 shadow-2xs">
                        <Star className={cn("w-3.5 h-3.5 fill-current", theme.text)} />
                        <span>{plan.popularBadgeText || "Most Popular"}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-1">
                    {plan.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mb-6">
                    {plan.subtitle}
                  </p>

                  <div className="flex items-baseline gap-1 pb-6 mb-6 border-b border-slate-100 dark:border-zinc-800">
                    <span className="text-3xl sm:text-4xl md:text-[40px] font-extrabold tracking-tight text-slate-900 dark:text-white">
                      <AnimatedPrice value={plan.price} counting={counting} />
                    </span>
                    {plan.period && (
                      <span className="text-xs sm:text-sm text-slate-400 dark:text-zinc-500 font-medium">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Features list */}
                  {plan.featuresTitle && (
                    <h4 className="text-[11px] font-semibold tracking-wider text-slate-900 dark:text-white uppercase mb-4">
                      {plan.featuresTitle}
                    </h4>
                  )}

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-zinc-300">
                        <Check className={cn("w-4 h-4 shrink-0 mt-0.5", theme.text)} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <LinkComp
                  href="#"
                  className={cn(
                    "w-full py-3.5 px-4 rounded-full text-xs sm:text-sm font-semibold text-center shadow-md hover:opacity-95 transition-all duration-200 cursor-pointer block",
                    isPopular
                      ? theme.bg
                      : "text-white bg-gradient-to-b from-zinc-800 to-zinc-950 dark:from-zinc-100 dark:to-zinc-300 dark:text-zinc-900"
                  )}
                >
                  {plan.buttonText}
                </LinkComp>
              </div>
            );
          })}
        </div>

        {/* Footer Banner */}
        <div className="bg-slate-100/80 dark:bg-zinc-900/80 border border-slate-200/80 dark:border-zinc-800/80 rounded-[24px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
              {footerTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-0.5">
              {footerSubtitle}
            </p>
          </div>
          <LinkComp
            href={footerCtaHref}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:opacity-95 transition-all duration-200 whitespace-nowrap cursor-pointer",
              theme.bg
            )}
          >
            <span>{footerCtaText}</span>
            <ArrowRight className="w-4 h-4" />
          </LinkComp>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 8. PRICING DOT PATTERN (DOT MATRIX GRADIENT CARDS)
// ==========================================
export interface DotPatternPlanItem {
  id: string;
  badgeTag: string;
  price: string;
  period?: string;
  description: string;
  buttonText: string;
  featured?: boolean;
  featuresTitle?: string;
  features: string[];
  ctaHref?: string;
}

export interface PricingDotPatternProps {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  plans?: DotPatternPlanItem[];
  color?: PricingColor;
  counting?: boolean;
  linkComponent?: React.ElementType;
}

const defaultDotPatternPlans: DotPatternPlanItem[] = [
  {
    id: "basic",
    badgeTag: "BASIC",
    price: "$199",
    period: "/month",
    description: "Basic tools for content generation. Best for one just trying out.",
    buttonText: "Get Started",
    featured: false,
    featuresTitle: "What's included:",
    features: [
      "1 project",
      "Up to 3 pages",
      "Email support",
      "Basic analytics",
    ],
  },
  {
    id: "starter",
    badgeTag: "STARTER",
    price: "$299",
    period: "/month",
    description: "Advanced tools for consistent content generation. Best for one getting started.",
    buttonText: "Get Started",
    featured: true,
    featuresTitle: "What's included:",
    features: [
      "1 project",
      "Up to 3 pages",
      "Email support",
      "Basic analytics",
    ],
  },
  {
    id: "pro",
    badgeTag: "PRO",
    price: "$599",
    period: "/month",
    description: "Advanced tools for consistent content generation, unlimited credits. Best for teams",
    buttonText: "Get Started",
    featured: false,
    featuresTitle: "What's included:",
    features: [
      "1 project",
      "Up to 3 pages",
      "Email support",
      "Basic analytics",
    ],
  },
];

export function PricingDotPattern({
  badgeText = "Pricing",
  title = "Simple, transparent pricing that helps you scale.",
  subtitle = "Select any plan that suits you and kick start your content creation journey with us",
  plans = defaultDotPatternPlans,
  color = "primary",
  counting = true,
  linkComponent: LinkComp = "a",
}: PricingDotPatternProps = {}) {
  const { theme, style } = getThemeStyles(color);

  return (
    <section
      className="w-full bg-slate-50/70 dark:bg-zinc-950/70 py-12 sm:py-20 px-4 sm:px-6 font-sans transition-colors duration-300"
      style={style}
    >
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
          {badgeText && (
            <div className={cn("inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[11px] font-semibold tracking-wide shadow-2xs transition-colors", theme.bgSoft, theme.border)}>
              <Sparkles className={cn("w-3.5 h-3.5 fill-current", theme.text)} />
              <span>{badgeText}</span>
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {plans.map((plan) => {
            const isFeatured = plan.featured;
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 bg-white/60 dark:bg-zinc-900/50 backdrop-blur-xs shadow-none overflow-hidden",
                  isFeatured
                    ? cn("border", theme.border)
                    : "border border-slate-200/90 dark:border-zinc-800/90"
                )}
                style={isFeatured ? { borderColor: "color-mix(in srgb, var(--pricing-accent, currentColor) 10%, transparent)" } : undefined}
              >
                {/* Dot Matrix Background Pattern positioned at top header section matching sample image */}
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-48 pointer-events-none transition-opacity",
                    isFeatured
                      ? cn("opacity-75 dark:opacity-55", theme.text)
                      : "opacity-35 dark:opacity-20 text-slate-400 dark:text-zinc-600"
                  )}
                  style={{
                    backgroundImage: `radial-gradient(currentColor 1.5px, transparent 1.5px)`,
                    backgroundSize: "13px 13px",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0) 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0) 100%)",
                  }}
                />

                {/* 4 Corner Angle Brackets following rounded card edges */}
                <div
                  className={cn(
                    "absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 rounded-tl-xl pointer-events-none transition-colors",
                    isFeatured ? "border-[var(--pricing-accent)]" : "border-slate-400/80 dark:border-zinc-600"
                  )}
                />
                <div
                  className={cn(
                    "absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 rounded-tr-xl pointer-events-none transition-colors",
                    isFeatured ? "border-[var(--pricing-accent)]" : "border-slate-400/80 dark:border-zinc-600"
                  )}
                />
                <div
                  className={cn(
                    "absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 rounded-bl-xl pointer-events-none transition-colors",
                    isFeatured ? "border-[var(--pricing-accent)]" : "border-slate-400/80 dark:border-zinc-600"
                  )}
                />
                <div
                  className={cn(
                    "absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 rounded-br-xl pointer-events-none transition-colors",
                    isFeatured ? "border-[var(--pricing-accent)]" : "border-slate-400/80 dark:border-zinc-600"
                  )}
                />

                {/* Card Content */}
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Badge Tag */}
                    <span
                      className={cn(
                        "text-[12px] font-semibold tracking-widest uppercase block mb-5",
                        isFeatured ? theme.text : "text-slate-800 dark:text-zinc-200"
                      )}
                    >
                      {plan.badgeTag}
                    </span>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        <AnimatedPrice value={plan.price} counting={counting} />
                      </span>
                      {plan.period && (
                        <span className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-8 min-h-[44px]">
                      {plan.description}
                    </p>

                    {/* Button */}
                    <LinkComp
                      href={plan.ctaHref || "#"}
                      className={cn(
                        "w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all duration-200 cursor-pointer mb-10 text-white",
                        isFeatured
                          ? theme.bg
                          : "bg-gradient-to-b from-slate-700 to-slate-800 dark:from-zinc-700 dark:to-zinc-800"
                      )}
                    >
                      <span>{plan.buttonText}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </LinkComp>

                    {/* Features List Header */}
                    {plan.featuresTitle && (
                      <h4 className="text-[11px] font-semibold tracking-wider text-slate-900 dark:text-white uppercase mb-4">
                        {plan.featuresTitle}
                      </h4>
                    )}

                    {/* Features Item */}
                    <ul className="space-y-3.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-zinc-300">
                          <CheckCircle2
                            className={cn(
                              "w-4 h-4 shrink-0 fill-current",
                              isFeatured ? theme.text : "text-slate-700 dark:text-zinc-400"
                            )}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
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

