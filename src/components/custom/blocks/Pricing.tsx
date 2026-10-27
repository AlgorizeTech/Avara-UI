"use client";

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
  Plus,
  Rocket,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { type PricingColor, getThemeStyles } from "./pricing-theme";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroupBlock";
import Button from "./Button";
import { TiltedCard } from "./TiltedCardBlock";
export type PricingVariant =
  | "default"
  | "dot-pattern"
  | "scale"
  | "plans-pro"
  | "elegant"
  | "minimal"
  | "bordered"
  | "builder"
  | "table"
  | "slider"
  | "typographic"
  | "plans";

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
      stroke="currentColor"
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

  if (variant === "plans-pro") {
    return (
      <PricingPlansPro
        title={title}
        subtitle={subtitle}
        badgeText={badgeText}
        color={color}
        counting={counting}
        linkComponent={LinkComp}
      />
    );
  }

  const defaultHeaders: Record<
    string,
    { badge: string; title: string; subtitle: string }
  > = {
    default: {
      badge: "Subscription Tiers",
      title: "Flexible plans built for every stage of growth",
      subtitle:
        "Start small and upgrade as your audience expands. Switch between monthly and annual billing anytime.",
    },
    elegant: {
      badge: "Curated Editions",
      title: "Refined pricing for modern teams",
      subtitle:
        "Thoughtfully structured tiers with priority support and zero hidden platform fees.",
    },
    minimal: {
      badge: "01 / PRICING",
      title: "Pay only for what matters",
      subtitle:
        "No bloat, no complex contracts — straightforward monthly or annual subscriptions.",
    },
    bordered: {
      badge: "NO-NONSENSE PRICING",
      title: "Bold plans with zero surprises",
      subtitle:
        "Hard-hitting features, transparent flat rates, and instant setup for ambitious builders.",
    },
  };

  const fallbackHeader = defaultHeaders[variant] || defaultHeaders.default;
  const resolvedBadge = badgeText ?? fallbackHeader.badge;
  const resolvedTitle = title ?? fallbackHeader.title;
  const resolvedSubtitle = subtitle ?? fallbackHeader.subtitle;

  return (
    <div className="w-full h-full max-w-6xl mx-auto py-8 sm:py-12" style={style}>
      {(resolvedTitle || resolvedSubtitle || resolvedBadge) && (
        <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto mb-8 sm:mb-12">
          {resolvedBadge && (
            <>
              {variant === "elegant" ? (
                <div
                  className={cn(
                    "inline-flex items-center gap-3 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors",
                    theme.text,
                  )}
                >
                  <span className="w-6 h-px bg-current opacity-40" />
                  <Star className="w-3 h-3 fill-current shrink-0" />
                  <span>{resolvedBadge}</span>
                  <span className="w-6 h-px bg-current opacity-40" />
                </div>
              ) : variant === "minimal" ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-border bg-muted/40 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <span className={cn("w-1.5 h-1.5 rounded-xs", theme.bg)} />
                  <span>{resolvedBadge}</span>
                </div>
              ) : variant === "bordered" ? (
                <div
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg border-2 border-foreground text-[11px] font-extrabold uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]",
                    theme.bg,
                  )}
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{resolvedBadge}</span>
                </div>
              ) : (
                <div
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg border text-[11px] font-semibold tracking-wide shadow-2xs transition-colors",
                    theme.bgSoft,
                    theme.border,
                  )}
                >
                  <Rocket className={cn("w-3.5 h-3.5", theme.text)} />
                  <span>{resolvedBadge}</span>
                </div>
              )}
            </>
          )}
          {resolvedTitle && (
            <h2
              className={cn(
                "text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-[1.15]",
                variant === "elegant"
                  ? "font-medium"
                  : variant === "bordered"
                    ? "font-extrabold uppercase tracking-tighter"
                    : "font-semibold",
              )}
            >
              {resolvedTitle}
            </h2>
          )}
          {resolvedSubtitle && (
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
              {resolvedSubtitle}
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
            className="rounded-lg"
          >
            {data.tabs.map((tab) => (
              <ToggleGroupItem key={tab.id} value={tab.id} className="font-semibold rounded-md">
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

          const cardBody = (
            <>
              {isPopular && (
                <div
                  className={cn(
                    "absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider shadow-sm z-20",
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
                      "p-3 rounded-lg shrink-0",
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
                className="w-full block no-underline"
              >
                <Button
                  variant={
                    isPopular
                      ? "pricing-primary"
                      : variant === "minimal"
                      ? "pricing-outline"
                      : "pricing-muted"
                  }
                  className={cn("w-full", isPopular && theme.bg)}
                >
                  {plan.buttonText}
                </Button>
              </LinkComp>
            </>
          );

          if (variant === "default" && isPopular) {
            return (
              <div key={plan.id} className="relative z-10 w-full h-full">
                <TiltedCard
                  tiltIntensity={6}
                  scaleOnHover={1.06}
                  initialScale={1.05}
                  glareOpacity={0.3}
                  showShadow={false}
                  className="w-full h-full"
                  innerClassName="rounded-lg cursor-default"
                  glareClassName="rounded-lg"
                >
                  <div
                    className={cn(
                      "relative rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 bg-background w-full h-full border-2 shadow-none hover:shadow-lg",
                      theme.border,
                    )}
                  >
                    {cardBody}
                  </div>
                </TiltedCard>
              </div>
            );
          }

          return (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 bg-background",
                variant === "default" && "border border-border shadow-none hover:shadow-lg",
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
              {cardBody}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 2. PRICING BUILDER (QUOTE BUILDER)
// ==========================================
export interface PricingBuilderModule {
  id: string;
  name: string;
  price: number;
}

export interface PricingBuilderProps {
  variant?: PricingVariant;
  badgeText?: string;
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
  badgeText = "Modular Stack",
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
      className={cn("w-full h-full max-w-4xl mx-auto p-6 sm:p-10 bg-background border border-border rounded-lg shadow-sm", className)}
      style={style}
    >
      <div className="text-center space-y-2.5 mb-8 sm:mb-12 max-w-xl mx-auto">
        {badgeText && (
          <div
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-dashed text-[11px] font-mono font-semibold uppercase tracking-widest",
              theme.border,
              theme.text,
              theme.bgSoft,
            )}
          >
            <Code2 className="w-3.5 h-3.5 shrink-0" />
            <span>{badgeText}</span>
          </div>
        )}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
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
                  "p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-between",
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
                    {isSelected && <Check className="w-3.5 h-3.5 text-[var(--pricing-on,white)]" />}
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

        <div className="bg-muted/40 p-6 sm:p-8 rounded-lg border border-border flex flex-col justify-between h-full min-h-[300px]">
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

          <Button
            variant="pricing-primary"
            className={cn("w-full shadow-md", theme.bg)}
          >
            {buttonText}
          </Button>
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
  variant?: PricingVariant;
  badgeText?: string;
  title?: string;
  subtitle?: string;
  data: PricingTableData;
  color?: PricingColor;
  counting?: boolean;
  linkComponent?: React.ElementType;
}

export function PricingTable({
  badgeText = "Feature Matrix",
  title = "Compare every plan in detail",
  subtitle = "Inspect limits, security controls, and support SLAs side by side across all tiers.",
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
        <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
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
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-popover text-popover-foreground border border-border shadow-md text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-center block">
            {feature.helpText}
          </span>
        </span>
      )}
    </>
  );

  return (
    <div className="@container/pricing w-full h-full" style={style}>
      <div className="flex flex-col gap-6 @min-[52rem]/pricing:hidden w-full h-full">
        {(badgeText || title || subtitle) && (
          <div className="p-6 rounded-lg border border-border bg-background shadow-sm space-y-2.5 text-left">
            {badgeText && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted border border-border text-[11px] font-semibold uppercase tracking-wider text-foreground">
                <CheckCircle2 className={cn("w-3.5 h-3.5", theme.text)} />
                <span>{badgeText}</span>
              </div>
            )}
            {title && (
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {data.plans.map((plan, pIdx) => (
          <div
            key={plan.id}
            className={cn(
              "overflow-hidden rounded-lg border bg-background shadow-sm",
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
              <Button
                variant={plan.featured ? "pricing-glow" : "pricing-outline"}
                className={cn("w-full", plan.featured && theme.bg)}
              >
                {plan.buttonText}
              </Button>
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

      <div className="hidden @min-[52rem]/pricing:block w-full h-full overflow-hidden border border-border rounded-lg bg-background shadow-sm">
        {(badgeText || title || subtitle) && (
          <div className="px-6 py-6 bg-card border-b border-border flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              {badgeText && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted border border-border text-[11px] font-semibold uppercase tracking-wider text-foreground">
                  <CheckCircle2 className={cn("w-3.5 h-3.5", theme.text)} />
                  <span>{badgeText}</span>
                </div>
              )}
              {title && (
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}
        <div className="w-full h-full overflow-x-auto">
          <div className="w-full h-full min-w-[800px]">
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
                  <Button
                    variant={plan.featured ? "pricing-glow" : "pricing-outline"}
                    className={cn("w-full", plan.featured && theme.bg)}
                  >
                    {plan.buttonText}
                  </Button>
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
  variant?: PricingVariant;
  badgeText?: string;
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
  badgeText = "Pay As You Grow",
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
      className={cn("w-full h-full max-w-4xl mx-auto p-5 sm:p-8 md:p-12 bg-background border border-border rounded-lg shadow-sm text-center", className)}
      style={style}
    >
      {badgeText && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-muted/80 border border-border text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground mb-3">
          <span className="inline-flex items-end gap-0.5 h-3">
            <span className={cn("w-1 h-1.5 rounded-xs opacity-50", theme.bg)} />
            <span className={cn("w-1 h-2.5 rounded-xs opacity-80", theme.bg)} />
            <span className={cn("w-1 h-3 rounded-xs", theme.bg)} />
          </span>
          <span>{badgeText}</span>
        </div>
      )}
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-10 max-w-lg mx-auto leading-relaxed">
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
          <div className="absolute inset-x-0 h-3 rounded-full bg-muted overflow-hidden pointer-events-none">
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
      <Button
        variant="pricing-primary"
        className={cn(
          "w-full py-3.5 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all cursor-pointer shadow-lg",
          theme.bg,
        )}
      >
        {buttonText}
      </Button>
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
  variant?: PricingVariant;
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
      <section className="py-16 sm:py-32 bg-background flex justify-center items-center min-h-[300px] sm:min-h-[500px] rounded-lg border border-border">
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
      <section className="py-16 sm:py-32 bg-background text-center text-muted-foreground text-sm font-mono rounded-lg border border-border">
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
        "py-8 sm:py-16 md:py-24 px-4 sm:px-6 text-foreground font-sans antialiased overflow-hidden rounded-lg border border-border w-full h-full transition-colors duration-300 relative",
        "selection:bg-[var(--pricing-accent)] selection:text-[var(--pricing-on)]",
      )}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .outline-text {
          color: transparent;
          -webkit-text-stroke: 1px color-mix(in srgb, var(--foreground) 25%, transparent);
          transition: -webkit-text-stroke 0.3s ease;
        }
        .group:hover .outline-text {
          -webkit-text-stroke: 1px color-mix(in srgb, var(--foreground) 70%, transparent);
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
              className="shrink-0 rounded-lg"
            >
              {(["monthly", "yearly"] as const).map((cycle) => (
                <ToggleGroupItem
                  key={cycle}
                  value={cycle}
                  className="font-semibold uppercase tracking-widest rounded-md"
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
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-mono tracking-widest uppercase font-extrabold border transition-all duration-300 mb-2.5 shadow-2xs",
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
                        "inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest mb-4 rounded-lg border",
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
                    <span className="text-3xl font-semibold text-muted-foreground mb-2">
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
                          "w-1.5 h-1.5 bg-foreground/20 rounded-full transition-colors shrink-0",
                          "group-hover/feat:bg-[var(--pricing-accent)]",
                        )}
                      />
                      <span className="text-sm lg:text-base text-muted-foreground group-hover/feat:text-foreground transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <LinkComp
                  href="#"
                  className="no-underline inline-block mt-auto z-10"
                >
                  <Button
                    variant={activePlan.isFeatured ? "pricing-typographic" : "pricing-typographic-muted"}
                    showArrow
                    className={cn(
                      "w-max",
                      activePlan.isFeatured && theme.bg,
                    )}
                  >
                    Initiate Project
                  </Button>
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
                          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[9px] font-mono tracking-widest uppercase font-extrabold border transition-all duration-300 mb-1.5 w-max",
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
                        : "text-foreground/30",
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
                        <span className="text-xl font-semibold text-muted-foreground mb-1.5">
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
                        className="no-underline w-full block z-10"
                      >
                        <Button
                          variant={plan.isFeatured ? "pricing-typographic" : "pricing-typographic-muted"}
                          showArrow
                          className={cn(
                            "w-full justify-center",
                            plan.isFeatured && theme.bg,
                          )}
                        >
                          Initiate Project
                        </Button>
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
  variant?: PricingVariant;
  badgeText?: string;
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

/** GSAP's power3.out, sampled for CSS / WAAPI. */
const POWER3_OUT =
  "linear(0, .1945, .3591, .4971, .6115, .7052, .7808, .8409, .8877, .9233, .9497, .9686, .9816, .9901, .9952, .998, .9994, .9999, 1, 1)";

export function PricingPlans({
  badgeText = "Tailored Studio",
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
    const el = cardContentRef.current;
    if (!el || typeof el.animate !== "function") return;
    const animation = el.animate(
      [
        { opacity: 0, transform: "translateY(15px)" },
        { opacity: 1, transform: "translateY(0px)" },
      ],
      { duration: 400, easing: POWER3_OUT },
    );
    return () => animation.cancel();
  }, [activePlans]);

  return (
    <section className="w-full h-full bg-background text-foreground py-6 md:py-12 px-4 sm:px-6 font-sans transition-colors duration-300 rounded-l-lg" style={style}>
      <div className="w-full h-full max-w-6xl mx-auto">
        <header className="mb-8 sm:mb-12 space-y-2.5 sm:space-y-3">
          {badgeText && (
            <div
              className={cn(
                "inline-flex items-center gap-2 pl-2.5 pr-3 py-1 rounded-r-md border-l-2 bg-muted/60 text-xs font-semibold uppercase tracking-widest",
                theme.border,
                theme.text,
              )}
            >
              <PenTool className="w-3.5 h-3.5 shrink-0" />
              <span>{badgeText}</span>
            </div>
          )}
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
                    className="flex items-center justify-between bg-card border border-border p-4 sm:p-6 rounded-lg transition-colors gap-3 sm:gap-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                      <div
                        className={cn(
                          "p-2.5 sm:p-3.5 rounded-lg transition-colors shrink-0",
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
                        isActive ? theme.bg : "bg-foreground/15",
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 sm:w-6 sm:h-6 bg-background rounded-full shadow-md transform transition-transform duration-300",
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

          <div className="bg-card border border-border rounded-lg p-5 sm:p-8 md:p-10 shadow-sm relative flex flex-col justify-between min-h-[400px] sm:min-h-[500px] transition-colors">
            <div ref={cardContentRef}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
                <h4 className={cn("text-xl sm:text-2xl font-semibold transition-colors duration-300", hasSelection ? "text-foreground" : "text-muted-foreground")}>
                  {cardData.title}
                </h4>
                {cardData.tag && (
                  <span
                    className={cn(
                      "px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold tracking-wide border self-start sm:self-auto transition-colors duration-300",
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
                    hasSelection ? theme.text : "text-muted-foreground/30",
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
              className="w-full block no-underline mt-auto"
            >
              <Button
                variant="pricing-primary"
                showArrow
                className={cn(
                  "w-full py-4 text-base shadow-lg",
                  hasSelection
                    ? theme.bg
                    : "opacity-40 cursor-not-allowed pointer-events-none shadow-none"
                )}
              >
                {ctaText}
              </Button>
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
  variant?: PricingVariant;
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
    <section className="w-full h-full py-10 sm:py-16 px-4 sm:px-6 font-sans transition-colors duration-300" style={style}>
      <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-border bg-card text-[11px] font-semibold tracking-wider text-muted-foreground uppercase shadow-2xs">
              <span className={cn("w-1.5 h-1.5 rounded-full bg-current", theme.text)} />
              {badgeText}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Toggle switch */}
          <div className="pt-3 flex items-center justify-center gap-3">
            <span className={cn("text-xs font-semibold tracking-wider transition-colors", billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground")}>
              {monthlyLabel}
            </span>
            <button
              type="button"
              onClick={() => setBillingCycle((prev) => (prev === "monthly" ? "annually" : "monthly"))}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                billingCycle === "annually" ? theme.bg : "bg-muted"
              )}
              role="switch"
              aria-checked={billingCycle === "annually"}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-sm ring-0 transition duration-200 ease-in-out",
                  billingCycle === "annually" ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
            <span className={cn("text-xs font-semibold tracking-wider transition-colors", billingCycle === "annually" ? "text-foreground" : "text-muted-foreground")}>
              {annuallyLabel} <span className="text-muted-foreground font-medium">{annualDiscountText}</span>
            </span>
          </div>
        </div>

        {/* Card Container Grid */}
        <div className="bg-muted/70 p-3 sm:p-4 rounded-lg border border-border grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 shadow-xs">
          {currentPlans.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300",
                  isPopular
                    ? cn("bg-card ring-2 shadow-lg shadow-slate-200/50 dark:shadow-none", theme.ring)
                    : "bg-muted/60 border-0 shadow-none"
                )}
              >
                {/* Top header area */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center border shadow-2xs",
                      isPopular
                        ? "bg-muted border-border"
                        : "bg-card border-border"
                    )}>
                      {plan.icon === "Sprout" ? (
                        <SproutIcon />
                      ) : (
                        <Rocket className={cn("w-5 h-5", isPopular ? theme.text : "text-foreground")} />
                      )}
                    </div>

                    {isPopular && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-border bg-muted text-xs font-semibold text-foreground shadow-2xs">
                        <Star className={cn("w-3.5 h-3.5 fill-current", theme.text)} />
                        <span>{plan.popularBadgeText || "Most Popular"}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-1">
                    {plan.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                    {plan.subtitle}
                  </p>

                  <div className="flex items-baseline gap-1 pb-6 mb-6 border-b border-border">
                    <span className="text-3xl sm:text-4xl md:text-[40px] font-extrabold tracking-tight text-foreground">
                      <AnimatedPrice value={plan.price} counting={counting} />
                    </span>
                    {plan.period && (
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Features list */}
                  {plan.featuresTitle && (
                    <h4 className="text-[11px] font-semibold tracking-wider text-foreground uppercase mb-4">
                      {plan.featuresTitle}
                    </h4>
                  )}

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80">
                        <Check className={cn("w-4 h-4 shrink-0 mt-0.5", theme.text)} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <LinkComp
                  href="#"
                  className="w-full block no-underline"
                >
                  <Button
                    variant={isPopular ? "pricing-primary" : "pricing-dark"}
                    className={cn(
                      "w-full py-3.5 px-4 rounded-lg text-xs sm:text-sm font-semibold text-center shadow-md",
                      isPopular && theme.bg
                    )}
                  >
                    {plan.buttonText}
                  </Button>
                </LinkComp>
              </div>
            );
          })}
        </div>

        {/* Footer Banner */}
        <div className="bg-muted/80 border border-border rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-foreground">
              {footerTitle}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {footerSubtitle}
            </p>
          </div>
          <LinkComp
            href={footerCtaHref}
            className="no-underline inline-block"
          >
            <Button
              variant="pricing-primary"
              showArrow
              className={cn("whitespace-nowrap shadow-md", theme.bg)}
            >
              {footerCtaText}
            </Button>
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
  variant?: PricingVariant;
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
      className="w-full h-full py-12 sm:py-20 px-4 sm:px-6 font-sans transition-colors duration-300"
      style={style}
    >
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
          {badgeText && (
            <div className={cn("inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg border text-[11px] font-semibold tracking-wide shadow-2xs transition-colors", theme.bgSoft, theme.border)}>
              <Sparkles className={cn("w-3.5 h-3.5 fill-current", theme.text)} />
              <span>{badgeText}</span>
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
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
                  "relative rounded-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 bg-card/60 backdrop-blur-xs shadow-none overflow-hidden",
                  isFeatured
                    ? cn("border", theme.border)
                    : "border border-border"
                )}
                style={isFeatured ? { borderColor: "color-mix(in srgb, var(--pricing-accent, currentColor) 10%, transparent)" } : undefined}
              >
                {/* Dot Matrix Background Pattern positioned at top header section matching sample image */}
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-48 pointer-events-none transition-opacity",
                    isFeatured
                      ? cn("opacity-75 dark:opacity-55", theme.text)
                      : "opacity-35 dark:opacity-20 text-muted-foreground"
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
                    "absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 rounded-tl-lg pointer-events-none transition-colors",
                    isFeatured ? "border-[var(--pricing-accent)]" : "border-foreground/30"
                  )}
                />
                <div
                  className={cn(
                    "absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 rounded-tr-lg pointer-events-none transition-colors",
                    isFeatured ? "border-[var(--pricing-accent)]" : "border-foreground/30"
                  )}
                />
                <div
                  className={cn(
                    "absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 rounded-bl-lg pointer-events-none transition-colors",
                    isFeatured ? "border-[var(--pricing-accent)]" : "border-foreground/30"
                  )}
                />
                <div
                  className={cn(
                    "absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 rounded-br-lg pointer-events-none transition-colors",
                    isFeatured ? "border-[var(--pricing-accent)]" : "border-foreground/30"
                  )}
                />

                {/* Card Content */}
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Badge Tag */}
                    <span
                      className={cn(
                        "text-[12px] font-semibold tracking-widest uppercase block mb-5",
                        isFeatured ? theme.text : "text-foreground"
                      )}
                    >
                      {plan.badgeTag}
                    </span>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
                        <AnimatedPrice value={plan.price} counting={counting} />
                      </span>
                      {plan.period && (
                        <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-8 min-h-[44px]">
                      {plan.description}
                    </p>

                    {/* Button */}
                    <LinkComp
                      href={plan.ctaHref || "#"}
                      className="w-full block no-underline mb-10"
                    >
                      <Button
                        variant={isFeatured ? "pricing-primary" : "pricing-dark"}
                        showArrow
                        className={cn("w-full shadow-md", isFeatured && theme.bg)}
                      >
                        {plan.buttonText}
                      </Button>
                    </LinkComp>

                    {/* Features List Header */}
                    {plan.featuresTitle && (
                      <h4 className="text-[11px] font-semibold tracking-wider text-foreground uppercase mb-4">
                        {plan.featuresTitle}
                      </h4>
                    )}

                    {/* Features Item */}
                    <ul className="space-y-3.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-foreground/80">
                          <CheckCircle2
                            className={cn(
                              "w-4 h-4 shrink-0 fill-current",
                              isFeatured ? theme.text : "text-foreground/70"
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

// ==========================================
// 9. PRICING PLANS PRO (SELECTABLE PLAN + USERS STEPPER)
// ==========================================
export interface PlansProItem {
  id: string;
  title: string;
  subtitle: string;
  monthlyPrice: number | string;
  yearlyPrice: number | string;
  monthlyPeriod?: string;
  yearlyPeriod?: string;
  features: string[];
}

export interface PricingPlansProProps {
  variant?: PricingVariant;
  badgeText?: string;
  title?: string;
  subtitle?: string;
  monthlyLabel?: string;
  yearlyLabel?: string;
  discountBadge?: string;
  plans?: PlansProItem[];
  defaultBillingCycle?: "monthly" | "yearly";
  defaultSelectedPlanId?: string;
  defaultUsers?: number;
  minUsers?: number;
  maxUsers?: number;
  usersLabel?: string;
  usersSubtext?: string;
  orderButtonText?: string;
  orderHref?: string;
  scalePriceWithUsers?: boolean;
  layoutMode?: "responsive" | "horizontal" | "vertical";
  color?: PricingColor;
  counting?: boolean;
  linkComponent?: React.ElementType;
  onOrder?: (payload: {
    plan: PlansProItem;
    billingCycle: "monthly" | "yearly";
    users: number;
    totalPrice: number;
  }) => void;
}

const PLANS_PRO_RING_MASK: React.CSSProperties = {
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude",
};

/** 4 glowing border lines spaced 90° apart orbiting around the selected package card */
const PLANS_PRO_FOUR_BEAM_GRADIENT =
  "conic-gradient(from 0deg, transparent 0deg, currentColor 32deg, transparent 62deg, transparent 90deg, currentColor 122deg, transparent 152deg, transparent 180deg, currentColor 212deg, transparent 242deg, transparent 270deg, currentColor 302deg, transparent 332deg)";

const PlansProUserIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("w-5 h-5", className)}
  >
    <circle
      cx="10.5"
      cy="8.5"
      r="3.2"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path
      d="M4.75 19.25C4.75 16.3505 7.32436 14 10.5 14C13.6756 14 16.25 16.3505 16.25 19.25"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
    <circle cx="17.25" cy="7.25" r="1.45" fill="currentColor" />
  </svg>
);

const defaultPlansProItems: PlansProItem[] = [
  {
    id: "starter",
    title: "Starter",
    subtitle: "creator",
    monthlyPrice: 9.0,
    yearlyPrice: 7.0,
    monthlyPeriod: "Month",
    yearlyPeriod: "Year",
    features: [
      "500GB Cloud Storage",
      "14-day version history",
      "End-to-end TLS encryption",
    ],
  },
  {
    id: "growth",
    title: "Growth",
    subtitle: "studio",
    monthlyPrice: 15.0,
    yearlyPrice: 12.0,
    monthlyPeriod: "Month",
    yearlyPeriod: "Year",
    features: [
      "2TB Cloud Storage",
      "60-day version history",
      "Custom domain & SSO",
    ],
  },
  {
    id: "scale",
    title: "Scale",
    subtitle: "agency",
    monthlyPrice: 29.0,
    yearlyPrice: 23.0,
    monthlyPeriod: "Month",
    yearlyPeriod: "Year",
    features: [
      "Unlimited Cloud Storage",
      "365-day version history",
      "Dedicated SLA & audit logs",
    ],
  },
];

export function PricingPlansPro({
  badgeText = "Workspace Tiers",
  title = "Choose Your Workspace",
  subtitle = "Configure your billing cycle, pick a workspace tier, and scale team seats effortlessly as you grow.",
  monthlyLabel = "Monthly",
  yearlyLabel = "Annual",
  discountBadge = "SAVE 20%",
  plans = defaultPlansProItems,
  defaultBillingCycle = "monthly",
  defaultSelectedPlanId = "scale",
  defaultUsers = 1,
  minUsers = 1,
  maxUsers = 99,
  usersLabel = "Team Seats",
  usersSubtext = "Billed per active member",
  orderButtonText = "Continue",
  orderHref,
  scalePriceWithUsers = true,
  layoutMode = "responsive",
  color = "primary",
  counting = true,
  linkComponent: LinkComp = "a",
  onOrder,
}: PricingPlansProProps = {}) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    defaultBillingCycle,
  );
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    defaultSelectedPlanId || plans[0]?.id || "scale",
  );
  const [users, setUsers] = useState<number>(
    Math.max(minUsers, Math.min(maxUsers, defaultUsers)),
  );
  const [cardsSpread, setCardsSpread] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (typeof IntersectionObserver === "undefined") {
      timer = setTimeout(() => setCardsSpread(true), 320);
      return () => {
        if (timer) clearTimeout(timer);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => setCardsSpread(true), 320);
        } else {
          if (timer) clearTimeout(timer);
          setCardsSpread(false);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const { theme, style } = getThemeStyles(color);

  const parsePrice = (raw: number | string) => {
    const n =
      typeof raw === "number"
        ? raw
        : parseFloat(String(raw).replace(/[^0-9.]/g, ""));
    return isNaN(n) ? 0 : n;
  };

  const getPlanPrice = (plan: PlansProItem) => {
    const base =
      billingCycle === "yearly"
        ? parsePrice(plan.yearlyPrice)
        : parsePrice(plan.monthlyPrice);
    const total = scalePriceWithUsers ? base * users : base;
    return total.toFixed(2);
  };

  const getPlanPeriod = (plan: PlansProItem) =>
    billingCycle === "yearly"
      ? plan.yearlyPeriod || "Year"
      : plan.monthlyPeriod || "Month";

  const handleOrder = () => {
    const activePlan =
      plans.find((p) => p.id === selectedPlanId) || plans[0];
    if (!activePlan) return;
    onOrder?.({
      plan: activePlan,
      billingCycle,
      users,
      totalPrice: parseFloat(getPlanPrice(activePlan)),
    });
  };

  const renderRadio = (isSelected: boolean) => (
    <span
      aria-hidden="true"
      className={cn(
        "w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
        isSelected
          ? cn("border-2", theme.border)
          : "border-[1.5px] border-muted-foreground/35",
      )}
    >
      <span
        className={cn(
          "w-[10px] h-[10px] rounded-full transition-transform duration-300 ease-out",
          isSelected
            ? cn("scale-100", theme.bg.split(" ")[0])
            : "scale-0 bg-transparent",
        )}
      />
    </span>
  );

  const renderUsersStepper = (compact = false) => (
    <div
      className={cn(
        "flex items-center justify-between gap-3",
        compact ? "w-full" : "w-full sm:w-auto sm:justify-start sm:gap-5",
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={cn(
            "w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 transition-colors",
            theme.bgSoft,
            theme.text,
          )}
        >
          <PlansProUserIcon className="w-5 h-5" />
        </div>
        <div className="flex flex-col text-left min-w-0">
          <span className="font-sans text-[13.5px] font-medium text-foreground leading-tight truncate">
            {usersLabel}
          </span>
          <span className="font-sans text-[12px] font-normal text-muted-foreground leading-tight mt-0.5 truncate">
            {usersSubtext}
          </span>
        </div>
      </div>

      <div className="inline-flex items-center justify-between rounded-lg bg-muted/70 border border-border px-1.5 py-1 min-w-[96px] sm:min-w-[108px] h-[38px] shrink-0">
        <button
          type="button"
          aria-label="Decrease users"
          disabled={users <= minUsers}
          onClick={() => setUsers((u) => Math.max(minUsers, u - 1))}
          className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5 stroke-[2]" />
        </button>
        <span className="font-sans text-[13.5px] font-semibold text-foreground px-2 tabular-nums select-none">
          {users}
        </span>
        <button
          type="button"
          aria-label="Increase users"
          disabled={users >= maxUsers}
          onClick={() => setUsers((u) => Math.min(maxUsers, u + 1))}
          className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2]" />
        </button>
      </div>
    </div>
  );

  const renderOrderButton = (fullWidth = false) => {
    const btnClasses = cn(
      fullWidth ? "w-full" : "w-full sm:w-auto sm:min-w-[172px]",
      theme.bg,
    );

    if (orderHref) {
      return (
        <LinkComp href={orderHref} onClick={handleOrder} className={fullWidth ? "w-full" : "w-full sm:w-auto"}>
          <Button
            variant="pricing-primary"
            showArrow
            className={btnClasses}
          >
            {orderButtonText}
          </Button>
        </LinkComp>
      );
    }

    return (
      <Button
        type="button"
        variant="pricing-primary"
        showArrow
        onClick={handleOrder}
        className={btnClasses}
      >
        {orderButtonText}
      </Button>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="w-full h-full py-6 sm:py-8 px-3 sm:px-6 font-sans transition-colors duration-300"
      style={style}
    >
      <div
        className={cn(
          "w-full mx-auto bg-card text-card-foreground rounded-lg border border-border shadow-[0_6px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_6px_30px_rgba(0,0,0,0.3)] p-6 sm:p-8 md:p-9 transition-all",
          layoutMode === "vertical"
            ? "max-w-[380px]"
            : layoutMode === "horizontal"
              ? "max-w-4xl"
              : "max-w-[380px] md:max-w-4xl",
        )}
      >
        {/* Header: Badge + Title + Description */}
        <div className="mb-5 sm:mb-6 text-left space-y-2">
          {badgeText && (
            <div
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider border",
                theme.bgSoft,
                theme.border,
                theme.text,
              )}
            >
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span>{badgeText}</span>
            </div>
          )}
          {title && (
            <h2 className="font-sans text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-foreground leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Segmented Billing Cycle Switch */}
        <div
          role="tablist"
          aria-label="Billing cycle"
          className="relative w-full rounded-lg bg-muted/70 border border-border p-1.5 grid grid-cols-2 mb-6 sm:mb-7"
        >
          {/* Sliding Active Pill Background */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-md bg-card shadow-xs border border-border/80 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
              billingCycle === "yearly" ? "translate-x-full" : "translate-x-0",
            )}
          />

          <button
            type="button"
            role="tab"
            aria-selected={billingCycle === "monthly"}
            onClick={() => setBillingCycle("monthly")}
            className={cn(
              "relative z-10 py-2.5 sm:py-3 px-3 rounded-md font-sans text-[13.5px] transition-colors duration-300 flex items-center justify-center cursor-pointer select-none",
              billingCycle === "monthly"
                ? "text-foreground font-semibold"
                : "text-muted-foreground font-medium hover:text-foreground",
            )}
          >
            {monthlyLabel}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={billingCycle === "yearly"}
            onClick={() => setBillingCycle("yearly")}
            className={cn(
              "relative z-10 py-2.5 sm:py-3 px-2.5 sm:px-3 rounded-md font-sans text-[13.5px] transition-colors duration-300 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer select-none",
              billingCycle === "yearly"
                ? "text-foreground font-semibold"
                : "text-muted-foreground font-medium hover:text-foreground",
            )}
          >
            <span className="leading-none">{yearlyLabel}</span>
            {discountBadge && (
              <span
                className={cn(
                  "inline-flex items-center justify-center px-2.5 pt-[4px] pb-[3px] rounded-md text-[10px] sm:text-[10.5px] font-semibold tracking-tight leading-none whitespace-nowrap transition-colors",
                  theme.bg,
                )}
              >
                {discountBadge}
              </span>
            )}
          </button>
        </div>

        {/* DESKTOP / HORIZONTAL LAYOUT (3-Column Grid + Bottom Users/Order Bar) */}
        <div
          className={cn(
            layoutMode === "vertical"
              ? "hidden"
              : layoutMode === "horizontal"
                ? "block"
                : "hidden md:block",
          )}
        >
          <div
            role="radiogroup"
            aria-label="Subscription plans"
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch"
          >
            {plans.map((plan, cardIdx) => {
              const isSelected = selectedPlanId === plan.id;
              const priceStr = getPlanPrice(plan);
              const periodStr = getPlanPeriod(plan);
              const isLeftCard = cardIdx === 0;
              const isCenterCard = cardIdx === 1;
              const isRightCard = cardIdx === 2;

              const stackedTransform = isCenterCard
                ? "translate3d(0px, 0px, 0px) scale(1)"
                : isLeftCard
                  ? "translate3d(calc(100% + 1rem), 6px, 0px) scale(0.92)"
                  : isRightCard
                    ? "translate3d(calc(-100% - 1rem), 6px, 0px) scale(0.92)"
                    : "translate3d(0px, 0px, 0px) scale(1)";

              return (
                <div
                  key={plan.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => setSelectedPlanId(plan.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedPlanId(plan.id);
                    }
                  }}
                  className={cn(
                    "relative rounded-lg p-5 cursor-pointer transition-[transform,opacity,border-color,box-shadow] duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform flex flex-col justify-between bg-card outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isCenterCard
                      ? "z-20"
                      : isSelected && cardsSpread
                        ? "z-30"
                        : "z-10",
                    !cardsSpread && !isCenterCard ? "opacity-75" : "opacity-100",
                    isSelected
                      ? "border border-border shadow-xs"
                      : "border border-border hover:border-foreground/30",
                  )}
                  style={{
                    transform: cardsSpread
                      ? "translate3d(0px, 0px, 0px) scale(1)"
                      : stackedTransform,
                    ...(isSelected
                      ? {
                          borderColor:
                            "color-mix(in srgb, var(--pricing-accent, currentColor) 28%, transparent)",
                        }
                      : {}),
                  }}
                >
                  {isSelected && (
                    <div
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-[-1px] rounded-lg",
                        theme.text,
                      )}
                    >
                      <span
                        className="absolute inset-0 overflow-hidden rounded-lg p-[2px]"
                        style={PLANS_PRO_RING_MASK}
                      >
                        <span
                          className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite]"
                          style={{ background: PLANS_PRO_FOUR_BEAM_GRADIENT }}
                        />
                      </span>
                    </div>
                  )}
                  {/* Card Top Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {renderRadio(isSelected)}
                      <div className="flex flex-col text-left">
                        <span className="font-sans text-[15px] font-bold text-foreground leading-[1.2]">
                          {plan.title}
                        </span>
                        <span className="font-sans text-[12.5px] font-normal text-muted-foreground leading-[1.2] mt-0.5">
                          {plan.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end text-right shrink-0">
                      <span className="font-sans text-[15px] font-bold text-foreground leading-[1.2] tabular-nums">
                        $<AnimatedPrice value={priceStr} counting={counting} />
                      </span>
                      <span className="font-sans text-[12px] font-normal text-muted-foreground leading-[1.2] mt-0.5">
                        {periodStr}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="mt-6 space-y-2.5">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 font-sans text-[12.5px] text-foreground/85 leading-snug"
                      >
                        <Check
                          className={cn(
                            "w-3.5 h-3.5 stroke-[2.2] shrink-0 transition-colors",
                            isSelected ? theme.text : "text-foreground/70",
                          )}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Horizontal Divider */}
          <div className="border-t border-border my-6" />

          {/* Bottom Bar: Users Stepper (Left) + Order CTA (Right) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {renderUsersStepper(false)}
            {renderOrderButton(false)}
          </div>
        </div>

        {/* MOBILE / VERTICAL ACCORDION LAYOUT (Stacked Expandable Cards + Full-Width Order CTA) */}
        <div
          className={cn(
            layoutMode === "vertical"
              ? "block"
              : layoutMode === "horizontal"
                ? "hidden"
                : "block md:hidden",
          )}
        >
          <div
            role="radiogroup"
            aria-label="Subscription plans"
            className="flex flex-col gap-3"
          >
            {plans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const priceStr = getPlanPrice(plan);
              const periodStr = getPlanPeriod(plan);

              return (
                <div
                  key={plan.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => setSelectedPlanId(plan.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedPlanId(plan.id);
                    }
                  }}
                  className={cn(
                    "relative rounded-lg px-4 sm:px-5 py-4 cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] bg-card outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isSelected
                      ? "border border-border shadow-xs"
                      : "border border-border hover:border-foreground/30",
                  )}
                  style={
                    isSelected
                      ? {
                          borderColor:
                            "color-mix(in srgb, var(--pricing-accent, currentColor) 28%, transparent)",
                        }
                      : undefined
                  }
                >
                  {isSelected && (
                    <div
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-[-1px] rounded-lg",
                        theme.text,
                      )}
                    >
                      <span
                        className="absolute inset-0 overflow-hidden rounded-lg p-[2px]"
                        style={PLANS_PRO_RING_MASK}
                      >
                        <span
                          className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite]"
                          style={{ background: PLANS_PRO_FOUR_BEAM_GRADIENT }}
                        />
                      </span>
                    </div>
                  )}
                  {/* Top Row: Radio + Plan Title/Subtitle + Price/Period */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {renderRadio(isSelected)}
                      <div className="flex flex-col text-left">
                        <span className="font-sans text-[15px] font-bold text-foreground leading-[1.2]">
                          {plan.title}
                        </span>
                        <span className="font-sans text-[12.5px] font-normal text-muted-foreground leading-[1.2] mt-0.5">
                          {plan.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end text-right shrink-0">
                      <span className="font-sans text-[15px] font-bold text-foreground leading-[1.2] tabular-nums">
                        $<AnimatedPrice value={priceStr} counting={counting} />
                      </span>
                      <span className="font-sans text-[12px] font-normal text-muted-foreground leading-[1.2] mt-0.5">
                        {periodStr}
                      </span>
                    </div>
                  </div>

                  {/* Smooth Animated Expand/Collapse Content for Mobile/Vertical */}
                  <div
                    aria-hidden={!isSelected}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity,margin-top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isSelected
                        ? "grid-rows-[1fr] opacity-100 mt-5"
                        : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none",
                    )}
                  >
                    <div className="overflow-hidden min-h-0">
                      <div
                        className={cn(
                          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isSelected ? "translate-y-0" : "-translate-y-2",
                        )}
                      >
                        <ul className="space-y-2.5">
                          {plan.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2.5 font-sans text-[12.5px] text-foreground/85 leading-snug"
                            >
                              <Check
                                className={cn(
                                  "w-3.5 h-3.5 stroke-[2.2] shrink-0 transition-colors",
                                  theme.text,
                                )}
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="border-t border-border my-4" />

                        {renderUsersStepper(true)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4">{renderOrderButton(true)}</div>
        </div>
      </div>
    </section>
  );
}

export default PricingCards;

