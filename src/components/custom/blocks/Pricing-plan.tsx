"use client";

import { Badge } from "@/components/custom/ui/badge";
import { Button } from "@/components/custom/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/custom/ui/slider";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Building,
  Calendar,
  CalendarCog,
  Check,
  Minus,
  Rocket,
  Users,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";

// ==========================================
// ICON MAP FOR MDX COMPATIBILITY
// ==========================================
const ICON_MAP: Record<string, React.ElementType> = {
  Calendar,
  Users,
  Rocket,
  Building,
  Zap,
  CalendarCog,
  ArrowRight,
};

/** A cell in the comparison table: a tick, a cross, or a value. */
export type PricingCellValue = string | number | boolean | null;

/** One row of the comparison table, with a value per plan column. */
export interface PricingComparisonFeature {
  name: string;
  values: PricingCellValue[];
}

export interface PricingFeatureSection {
  title: string;
  features: PricingComparisonFeature[];
}

export interface PricingPlan {
  id: string | number;
  title: string;
  subtitle?: string;
  price: string | number;
  period?: string;
  /** A key of the block’s ICON_MAP, or a component. */
  icon?: string | React.ElementType;
  features?: string[];
  popular?: boolean;
  popularText?: string;
  featured?: boolean;
  active?: boolean;
  buttonText?: string;
  buttonClassName?: string;
  rootClassName?: string;
}

export interface PricingPlanTab {
  id: string;
  label: string;
  icon?: string | React.ElementType;
  plans?: PricingPlan[];
  featureSections?: PricingFeatureSection[];
}

export interface PricingPlanData {
  tabs: PricingPlanTab[];
}

export interface BasicPricingPlanProps {
  data?: PricingPlanData;
  variant?: string;
  tabStyle?: "default" | "toggle" | string;
  counting?: boolean;
  tabClassName?: string;
  cardClassName?: string;
  popularBadgeClassName?: string;
  buttonClassName?: string;
}

export interface TablePricingPlanProps {
  data?: PricingPlanData;
  counting?: boolean;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  buttonClassName?: string;
}

export interface PricingBillingPeriod {
  id: string;
  label: string;
  period?: string;
  /** Percent off, applied to the tier price. */
  discount?: number;
  badgeText?: string;
  badgeClassName?: string;
}

export interface PricingSliderTier {
  /** Shown in the tier label and substituted into `{tier}` in features. */
  label?: string;
  price: number | string;
  /** Overrides `price` for a given billing period id. */
  customPricing?: Record<string, number | string>;
  [key: string]: unknown;
}

export interface PricingSliderConfig {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  minLabel?: string;
  maxLabel?: string;
}

export interface SliderPricingPlanProps {
  pricingTiers?: PricingSliderTier[];
  features?: string[];
  billingPeriods?: PricingBillingPeriod[];
  sliderConfig?: PricingSliderConfig;
  ctaText?: string;
  ctaIcon?: string | React.ElementType;
  footerText?: string;
  counting?: boolean;
  /** Per-element class overrides. */
  classNames?: Record<string, string>;
  className?: string;
  /** Fired with the newly selected tier and its slider index. */
  onTierChange?: (tier: PricingSliderTier | undefined, index: number) => void;
  /** Fired with the billing period id. */
  onBillingChange?: (id: string) => void;
  /** Fired with the current tier and billing period id. */
  onCtaClick?: (tier: PricingSliderTier | undefined, billingPeriod: string) => void;
}

/** Class bundles per visual variant. */
const pricingVariants: Record<string, Record<string, string>> = {
  default: {
    container: "w-full p-6",
    card: "relative transition-all duration-200 hover:shadow-lg dark:hover:shadow-xl dark:bg-slate-900 dark:border-slate-700",
    cardPopular:
      "border-primary shadow-lg scale-105 dark:border-primary dark:shadow-primary/20",
    cardHeader: "text-center pb-4",
    price: "text-3xl font-bold dark:text-white",
    button: "w-full mb-6",
    buttonPopular:
      "bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90",
    featuresTitle:
      "font-semibold text-sm text-muted-foreground uppercase tracking-wide dark:text-slate-400",
    featureIcon: "rounded-full p-0.5 mr-3 mt-0.5",
    featureIconPopular: "bg-primary dark:bg-primary",
    featureIconDefault: "bg-muted dark:bg-slate-700",
  },
  premium: {
    container: "w-full p-8",
    card: "relative transition-all duration-300 hover:shadow-2xl border-2 dark:bg-slate-900 dark:border-slate-700 dark:hover:shadow-2xl dark:hover:shadow-slate-900/50",
    cardPopular:
      "border-gradient-to-r from-primary to-primary/70 shadow-2xl scale-110 bg-gradient-to-br from-background to-primary/5 dark:from-slate-900 dark:to-primary/10 dark:border-primary dark:shadow-primary/20",
    cardHeader: "text-center pb-6",
    price:
      "text-4xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent dark:from-primary dark:to-primary/80",
    button: "w-full mb-8",
    buttonPopular:
      "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg dark:from-primary dark:to-primary/80 dark:hover:from-primary/90 dark:hover:to-primary/70",
    featuresTitle:
      "font-bold text-sm text-foreground uppercase tracking-wide border-b border-border pb-2 dark:text-white dark:border-slate-700",
    featureIcon: "rounded-lg p-1 mr-3 mt-0.5 shadow-sm dark:shadow-slate-800",
    featureIconPopular:
      "bg-gradient-to-br from-primary to-primary/80 dark:from-primary dark:to-primary/80",
    featureIconDefault:
      "bg-gradient-to-br from-muted to-muted/70 dark:from-slate-700 dark:to-slate-600",
  },
  elegant: {
    container: "w-full p-8",
    card: "relative transition-all duration-500 bg-gradient-to-b from-slate-50 to-white border border-border/60 hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 dark:from-slate-800 dark:to-slate-900 dark:hover:shadow-xl dark:hover:shadow-slate-900/40",
    cardPopular:
      "border-slate-300 shadow-xl shadow-slate-200/60 scale-105 bg-gradient-to-b from-slate-100 to-white dark:border-slate-600 dark:shadow-slate-900/60 dark:from-slate-700 dark:to-slate-800",
    cardHeader:
      "text-center pb-6 border-b border-border/60 mb-6",
    price:
      "text-3xl font-light text-foreground tracking-tight",
    button: "w-full mb-8 font-medium tracking-wide transition-all duration-300",
    buttonPopular:
      "bg-slate-800 hover:bg-slate-700 text-white shadow-lg hover:shadow-xl dark:bg-slate-700 dark:hover:bg-slate-600",
    featuresTitle:
      "font-medium text-xs text-muted-foreground uppercase tracking-[0.1em] border-b border-border/60 pb-3 mb-4",
    featureIcon: "rounded-full p-1 mr-3 mt-0.5 transition-all duration-200",
    featureIconPopular:
      "bg-slate-800 shadow-sm dark:bg-slate-700 dark:shadow-slate-800",
    featureIconDefault: "bg-slate-200 dark:bg-slate-600",
  },
};

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
    if (!counting || isNaN(numericValue)) {
      setDisplayValue(numericValue);
      return;
    }
    let startTime: number;
    const duration = 600;
    const startValue = 0;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 5);
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

export function BasicPricingPlan({
  data,
  variant = "default",
  tabStyle = "default",
  counting = true,
  tabClassName,
  cardClassName,
  popularBadgeClassName,
  buttonClassName,
}: BasicPricingPlanProps) {
  const [activeTab, setActiveTab] = useState(data?.tabs?.[0]?.id || "");
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (!data || !data.tabs || data.tabs.length === 0) return null;
  const activeTabData = data.tabs.find((tab: PricingPlanTab) => tab.id === activeTab);
  const variantStyles = pricingVariants[variant] || pricingVariants.default;

  const handleTabChange = (tabId: string) => {
    if (tabStyle === "toggle" && tabId !== activeTab) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTab(tabId);
        setIsTransitioning(false);
      }, 150);
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className='w-full'>
      <div className="flex justify-center mb-18">
        {tabStyle === "toggle" ? (
          <div
            className={cn(
              "relative inline-flex items-center justify-center rounded-full bg-muted p-1",
              tabClassName,
            )}
          >
            <div
              className="absolute top-1 bottom-1 bg-primary rounded-full transition-all duration-300 ease-in-out shadow-sm"
              style={{
                width: `calc(${100 / data.tabs.length}% - 8px)`,
                left: `calc(${(data.tabs.findIndex((tab: PricingPlanTab) => tab.id === activeTab) * 100) / data.tabs.length}% + 4px)`,
              }}
            />
            {data.tabs.map((tab: PricingPlanTab) => {
              const TabIcon =
                typeof tab.icon === "string" ? ICON_MAP[tab.icon] : tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    activeTab === tab.id
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {TabIcon && <TabIcon className="w-4 h-4 mr-2" />}
                  {tab.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div
            className={cn(
              "inline-flex items-center justify-center rounded-full bg-muted p-1",
              tabClassName,
            )}
          >
            {data.tabs.map((tab: PricingPlanTab) => {
              const TabIcon =
                typeof tab.icon === "string" ? ICON_MAP[tab.icon] : tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-background hover:text-foreground",
                  )}
                >
                  {TabIcon && <TabIcon className="w-4 h-4 mr-2" />}
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
          tabStyle === "toggle" && "transition-all duration-300 ease-in-out",
          tabStyle === "toggle" && isTransitioning && "opacity-0 scale-95",
        )}
      >
        {activeTabData?.plans?.map((plan: PricingPlan) => {
          const PlanIcon =
            typeof plan.icon === "string" ? ICON_MAP[plan.icon] : plan.icon;
          return (
            <Card
              key={plan.id}
              className={cn(
                variantStyles.card,
                plan.popular && variantStyles.cardPopular,
                plan.active && "ring-2 ring-primary",
                cardClassName,
                plan.rootClassName,
                tabStyle === "toggle" &&
                  "transition-all duration-300 ease-in-out",
                tabStyle === "toggle" &&
                  !isTransitioning &&
                  "animate-in slide-in-from-bottom-4 fade-in",
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge
                    variant="default"
                    className={cn(
                      "bg-primary text-primary-foreground",
                      popularBadgeClassName,
                    )}
                  >
                    {plan.popularText || "Most popular"}
                  </Badge>
                </div>
              )}
              <CardHeader className={variantStyles.cardHeader}>
                <div className="flex items-center justify-center mb-2">
                  {PlanIcon && (
                    <PlanIcon className="w-6 h-6 mr-2 text-primary" />
                  )}
                  <CardTitle
                    className={cn(
                      "text-xl font-semibold",
                      plan.active && "text-primary",
                    )}
                  >
                    {plan.title}
                  </CardTitle>
                </div>
                <CardDescription
                  className={cn(
                    "text-sm",
                    variant === "elegant"
                      ? "text-muted-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {plan.subtitle}
                </CardDescription>
                <div className="mt-4">
                  <span className={cn(variantStyles.price)}>
                    {typeof plan.price === "string" && plan.price.startsWith("$") ? "$" : ""}
                    <AnimatedPrice value={plan.price} counting={counting} />
                  </span>
                  {plan.period && (
                    <span
                      className={cn(
                        "ml-1",
                        variant === "elegant"
                          ? "text-muted-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      /{plan.period}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  className={cn(
                    variantStyles.button,
                    plan.popular ? variantStyles.buttonPopular : "",
                    buttonClassName,
                    plan.buttonClassName,
                  )}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.buttonText || "Buy plan"}
                </Button>
                <div className="space-y-4">
                  <h4 className={variantStyles.featuresTitle}>
                    What&apos;s included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features?.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start">
                        <div
                          className={cn(
                            variantStyles.featureIcon,
                            plan.popular
                              ? variantStyles.featureIconPopular
                              : variantStyles.featureIconDefault,
                          )}
                        >
                          <Check
                            className={cn(
                              "w-3 h-3",
                              variant === "elegant"
                                ? plan.popular
                                  ? "text-white"
                                  : "text-muted-foreground"
                                : plan.popular
                                  ? "text-primary-foreground"
                                  : "text-foreground",
                            )}
                          />
                        </div>
                        <span
                          className={cn(
                            "text-sm leading-relaxed",
                            variant === "elegant"
                              ? "text-foreground"
                              : "",
                          )}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function TablePricingPlan({
  data,
  counting = true,
  className,
  headerClassName,
  rowClassName,
  buttonClassName,
}: TablePricingPlanProps) {
  const [activeTab, setActiveTab] = useState(data?.tabs?.[0]?.id || "");

  if (!data || !data.tabs || data.tabs.length === 0) return null;
  const activeTabData = data.tabs.find((tab: PricingPlanTab) => tab.id === activeTab);

  const renderFeatureValue = (value: PricingCellValue, planIndex: number) => {
    if (value === true)
      return <Check className="w-5 h-5 text-primary mx-auto" />;
    if (value === false || value === null || value === undefined)
      return <Minus className="w-5 h-5 text-muted-foreground mx-auto" />;
    if (typeof value === "string" || typeof value === "number")
      return (
        <span
          className={cn(
            "text-sm",
            planIndex === 1 ? "font-medium" : "text-muted-foreground",
          )}
        >
          {value}
        </span>
      );
    return <Minus className="w-5 h-5 text-muted-foreground mx-auto" />;
  };

  return (
    <div className={cn("w-full", className)}>
      {data.tabs.length > 1 && (
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center justify-center rounded-full bg-muted p-1">
            {data.tabs.map((tab: PricingPlanTab) => {
              const TabIcon =
                typeof tab.icon === "string" ? ICON_MAP[tab.icon] : tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-background hover:text-foreground",
                  )}
                >
                  {TabIcon && <TabIcon className="w-4 h-4 mr-2" />}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden bg-background">
        <div
          className={cn(
            "grid grid-cols-4 border-b bg-muted/30",
            headerClassName,
          )}
        >
          <div className="p-6"></div>
          {activeTabData?.plans?.map((plan: PricingPlan) => (
            <div
              key={plan.id}
              className={cn(
                "p-6 text-center border-l",
                plan.featured && "bg-primary/5 border-primary/20",
              )}
            >
              <h3
                className={cn(
                  "text-lg font-semibold mb-2",
                  plan.featured && "text-primary",
                )}
              >
                {plan.title}
              </h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  {typeof plan.price === "string" && plan.price.startsWith("$") ? "$" : ""}
                  <AnimatedPrice value={plan.price} counting={counting} />
                </span>
                {plan.period && (
                  <span className="text-muted-foreground ml-1">
                    /{plan.period}
                  </span>
                )}
              </div>
              <Button
                className={cn(
                  "w-full",
                  plan.featured ? "bg-primary hover:bg-primary/90" : "",
                  buttonClassName,
                  plan.buttonClassName,
                )}
                variant={plan.featured ? "default" : "outline"}
              >
                {plan.buttonText || "Buy plan"}
              </Button>
            </div>
          ))}
        </div>

        {activeTabData?.featureSections?.map((section: PricingFeatureSection) => (
          <div key={section.title}>
            <div
              className={cn(
                "grid grid-cols-4 border-b bg-muted/50",
                rowClassName,
              )}
            >
              <div className="p-4 font-semibold text-sm">{section.title}</div>
              <div className="border-l"></div>
              <div className="border-l"></div>
              <div className="border-l"></div>
            </div>
            {section.features.map((feature: PricingComparisonFeature) => (
              <div
                key={feature.name}
                className={cn(
                  "grid grid-cols-4 border-b last:border-b-0 hover:bg-muted/30 transition-colors",
                  rowClassName,
                )}
              >
                <div className="p-4 text-sm font-medium">{feature.name}</div>
                {activeTabData?.plans?.map((plan: PricingPlan, planIndex: number) => (
                  <div
                    key={plan.id}
                    className={cn(
                      "p-4 text-center border-l flex items-center justify-center",
                      plan.featured && "bg-primary/5 border-primary/20",
                    )}
                  >
                    {renderFeatureValue(feature.values[planIndex], planIndex)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SliderPricingPlan({
  pricingTiers = [],
  features = [],
  billingPeriods = [
    { id: "monthly", label: "Monthly", period: "month" },
    {
      id: "yearly",
      label: "Yearly",
      period: "year",
      discount: 10,
      badgeText: "2 months free",
      badgeClassName: "bg-primary",
    },
  ],
  sliderConfig = {
    min: 0,
    max: pricingTiers.length - 1,
    step: 1,
    defaultValue: Math.floor(pricingTiers.length / 2),
    minLabel: "10k",
    maxLabel: "10M+",
  },
  ctaText = "Start 14-day free trial",
  ctaIcon = "ArrowRight", // FIX: Changed default to string
  footerText = "$0.00 due today. No credit card required.",
  counting = true,
  classNames = {},
  className,
  onTierChange,
  onBillingChange,
  onCtaClick,
}: SliderPricingPlanProps) {
  const [sliderValue, setSliderValue] = useState([
    sliderConfig.defaultValue || 0,
  ]);
  const [billingPeriod, setBillingPeriod] = useState(
    billingPeriods[0]?.id || "monthly",
  );

  if (!pricingTiers.length) return <div>No pricing tiers provided</div>;

  const currentTier = pricingTiers[sliderValue[0]];
  const currentBilling = billingPeriods.find(
    (bp: PricingBillingPeriod) => bp.id === billingPeriod,
  );

  // Resolve string icon to component
  const CtaIcon = typeof ctaIcon === "string" ? ICON_MAP[ctaIcon] : ctaIcon;

  const getPrice = (): number => {
    if (!currentTier) return 0;
    const raw = currentTier.customPricing?.[billingPeriod] ?? currentTier.price;
    const value = typeof raw === "string" ? parseFloat(raw.replace(/[^0-9.]/g, "")) : raw;
    return Number.isFinite(value) ? value : 0;
  };

  const getCurrentPrice = () => getPrice();

  const getYearlyTotal = () => {
    const monthlyPrice = getPrice();
    return currentBilling?.discount
      ? monthlyPrice * currentBilling.discount
      : monthlyPrice * 12;
  };

  const getSavings = () => {
    if (billingPeriod === "yearly" && currentBilling?.discount) {
      return getCurrentPrice() * (12 - currentBilling.discount);
    }
    return 0;
  };

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    const tier = pricingTiers[value[0]];
    onTierChange?.(tier, value[0]);
  };

  const handleBillingChange = (period: string) => {
    setBillingPeriod(period);
    onBillingChange?.(period);
  };

  const handleCtaClick = () => {
    onCtaClick?.(currentTier, billingPeriod);
  };

  const processedFeatures = features.map((feature: string) =>
    feature.replace("{tier}", currentTier?.label || ""),
  );

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto p-6 bg-muted dark:bg-transparent",
        classNames.container,
        className,
      )}
    >
      <div className="mb-8">
        <div className="flex justify-center mb-6">
          <div
            className={cn(
              "bg-primary text-white dark:text-gray-700 px-4 py-2 rounded-lg text-sm font-medium",
              classNames.eventBadge,
            )}
          >
            Up to {currentTier?.label} monthly events
          </div>
        </div>

        <div className="relative mb-8">
          <div
            className={cn(
              "flex justify-between text-sm text-muted-foreground mb-4 px-2",
              classNames.sliderLabels,
            )}
          >
            <span>{sliderConfig.minLabel}</span>
            <span>{sliderConfig.maxLabel}</span>
          </div>
          <div className="relative">
            <Slider
              value={sliderValue}
              onValueChange={handleSliderChange}
              min={sliderConfig.min}
              max={sliderConfig.max}
              step={sliderConfig.step}
              className={cn(
                "w-full [&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:border-4 [&_[role=slider]]:border-white [&_[role=slider]]:bg-gray-800 [&_[role=slider]]:shadow-lg [&>.relative]:bg-gray-300 dark:[&>.relative]:bg-gray-600 [&_[role=slider]]:ring-2 [&_[role=slider]]:ring-white",
                classNames.slider,
              )}
            />
          </div>
        </div>
      </div>

      <Card
        className={cn(
          "bg-card border-border text-foreground rounded-2xl overflow-hidden",
          classNames.card,
        )}
      >
        {billingPeriods.length > 1 && (
          <div className="flex justify-center pt-8 pb-6">
            <div
              className={cn(
                "inline-flex items-center justify-center rounded-xl bg-muted p-1.5 gap-1",
                classNames.tabContainer,
              )}
            >
              {billingPeriods.map((period: PricingBillingPeriod) => (
                <button
                  key={period.id}
                  onClick={() => handleBillingChange(period.id)}
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-6 py-2.5 text-sm font-medium transition-all",
                    billingPeriod === period.id
                      ? cn(
                          "bg-card text-foreground shadow-sm",
                          classNames.tabButtonActive,
                        )
                      : cn(
                          "text-muted-foreground hover:text-foreground",
                          classNames.tabButton,
                        ),
                  )}
                >
                  {period.label}
                  {period.badgeText && (
                    <Badge
                      className={cn(
                        "ml-2 text-white text-xs px-2 py-0.5 rounded-md",
                        period.badgeClassName || "bg-primary",
                      )}
                    >
                      {period.badgeText}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <CardContent className="px-8 pb-8">
          <div className="mb-8">
            <div className="flex items-baseline justify-start mb-2">
              <span
                className={cn(
                  "text-5xl font-bold text-foreground",
                  classNames.price,
                )}
              >
                $<AnimatedPrice value={getCurrentPrice()} counting={counting} />
              </span>
            </div>
            <div
              className={cn(
                "text-sm text-muted-foreground",
                classNames.pricePeriod,
              )}
            >
              {billingPeriod === "monthly" || !currentBilling?.discount
                ? `/${currentBilling?.period || "month"}`
                : `/${currentBilling?.period || "month"} billed as $${getYearlyTotal()} per year`}
            </div>
            {billingPeriod === "yearly" && getSavings() > 0 && (
              <div
                className={cn(
                  "text-orange-500 text-sm font-medium flex items-center mt-3",
                  classNames.savingsText,
                )}
              >
                <Check className="w-4 h-4 mr-2" />
                Save ${getSavings()}
              </div>
            )}
          </div>

          <div className={cn("space-y-4 mb-8", classNames.featuresList)}>
            {processedFeatures.map((feature: string, index: number) => (
              <div
                key={index}
                className={cn("flex items-center", classNames.featureItem)}
              >
                <div
                  className={cn(
                    "rounded-full bg-primary p-1 mr-4 flex-shrink-0",
                    classNames.featureIcon,
                  )}
                >
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span
                  className={cn(
                    "text-sm text-foreground",
                    classNames.featureText,
                  )}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <Button
            onClick={handleCtaClick}
            className={cn(
              "w-full bg-primary hover:bg-primary/90 text-white font-medium py-4 rounded-xl text-base mb-4 transition-colors",
              classNames.ctaButton,
            )}
          >
            {ctaText}
            {CtaIcon && <CtaIcon className="w-4 h-4 ml-2" />}
          </Button>

          {footerText && (
            <p
              className={cn(
                "text-center text-sm text-muted-foreground",
                classNames.footerText,
              )}
            >
              {footerText}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
