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

// WCAG relative luminance, so a custom hex gets a foreground that is legible
// on it rather than an unconditional white.
const relLuminance = (rgb: string) => {
  const [r, g, b] = rgb.split(",").map((n) => {
    const v = Number(n.trim()) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// Accent + its foreground, published as CSS variables by every theme.
//
// Tailwind only emits classes it can SEE in the source, and a variant prefix
// only binds to the token it is glued to. So `\`selection:${theme.bg}\`` did
// not produce "selection:<each class>" — it produced ONE prefixed class plus
// the rest leaking in unprefixed, which is how `text-primary-foreground`
// escaped onto the typographic section and repainted all of its body copy.
// Routing the dynamic parts through variables keeps every class literal
// (`bg-[var(--pricing-accent)]`, `group-hover:text-[var(--pricing-on)]`) so
// prefixes bind correctly and the value still varies per theme.
const accentVars = (accent: string, on: string) =>
  ({ "--pricing-accent": accent, "--pricing-on": on }) as React.CSSProperties;

const PRESET_VARS: Record<string, React.CSSProperties> = {
  indigo: accentVars("var(--color-indigo-600, #4f46e5)", "#ffffff"),
  rose: accentVars("var(--color-rose-600, #e11d48)", "#ffffff"),
  emerald: accentVars("var(--color-emerald-600, #059669)", "#ffffff"),
  // zinc inverts with the theme; light-dark() keys off `color-scheme`, which
  // both the docs preview and next-themes set alongside the `dark` class.
  zinc: accentVars(
    "light-dark(#18181b, #f4f4f5)",
    "light-dark(#ffffff, #18181b)",
  ),
};

export const getThemeStyles = (color: string) => {
  if (color === "primary" || color === "default" || !colorThemes[color]) {
    if (color && color.startsWith("#")) {
      const rgb = hexToRgb(color);
      return {
        theme: {
          text: "text-[var(--theme-color)]",
          bg: "bg-[var(--theme-color)] text-[var(--pricing-on)] hover:opacity-90",
          bgSoft:
            "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]",
          border: "border-[var(--theme-color)]",
          shadow: "shadow-[var(--theme-color)]/20",
          gradient:
            "from-[var(--theme-color)] to-[rgba(var(--theme-color-rgb),0.6)]",
          gradientSoft: "from-[rgba(var(--theme-color-rgb),0.15)] to-transparent",
          ring: "ring-[var(--theme-color)]",
          slider:
            "accent-[var(--theme-color)] [&::-webkit-slider-thumb]:bg-[var(--theme-color)]",
          fill: "fill-[var(--theme-color)]",
        },
        style: {
          "--theme-color": color,
          "--theme-color-rgb": rgb,
          ...accentVars(
            color,
            relLuminance(rgb) > 0.45 ? "#09090b" : "#ffffff",
          ),
        } as React.CSSProperties,
      };
    }
    return {
      theme: {
        text: "text-primary",
        bg: "bg-primary text-primary-foreground hover:bg-primary/90",
        bgSoft: "bg-primary/10 text-primary",
        border: "border-primary",
        shadow: "shadow-primary/20",
        gradient: "from-primary to-primary/80",
        gradientSoft: "from-primary/10 to-transparent",
        ring: "ring-primary",
        slider: "accent-primary [&::-webkit-slider-thumb]:bg-primary",
        fill: "fill-primary",
      },
      style: accentVars("var(--primary)", "var(--primary-foreground)"),
    };
  }
  return { theme: colorThemes[color], style: PRESET_VARS[color] ?? {} };
};

const ICON_MAP: Record<string, React.ElementType> = {
  Rocket,
  Users,
  Zap,
  Building,
  Code2,
  PenTool,
};

const AnimatedPrice = ({ value }: { value: string | number }) => {
  const cleanValue = value.toString().replace(/\.00$/, "");
  const numericValue = parseFloat(cleanValue.replace(/[^0-9.]/g, ""));
  const [displayValue, setDisplayValue] = useState(numericValue || 0);

  useEffect(() => {
    if (isNaN(numericValue)) return;
    let startTime: number;
    const duration = 600;
    const startValue = displayValue;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 5);
      setDisplayValue(startValue + (numericValue - startValue) * easeProgress);
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplayValue(numericValue);
    };
    requestAnimationFrame(animate);
  }, [numericValue]);

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
}: {
  data: PricingData;
  variant?: PricingVariant;
  color?: PricingColor;
}) {
  const [activeTab, setActiveTab] = useState(data?.tabs?.[0]?.id || "");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { theme, style } = getThemeStyles(color);

  if (!data || !data.tabs || data.tabs.length === 0) return null;
  const activeTabData = data.tabs.find((tab) => tab.id === activeTab);
  const tabIndex = data.tabs.findIndex((tab) => tab.id === activeTab);

  const handleTabChange = (tabId: string) => {
    if (tabId !== activeTab) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTab(tabId);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const getVariantStyles = () =>
    ({
      default: {
        card: "relative transition-all duration-200 bg-background border border-border rounded-2xl p-6 hover:shadow-lg",
        cardPopular: cn("border-2 sm:scale-105 z-10", theme.border, theme.shadow),
        price: "text-4xl font-bold text-foreground",
        button:
          "w-full py-2.5 px-4 rounded-xl font-bold transition-colors border border-border ",
        buttonPopular: cn("border-transparent text-white shadow-md", theme.bg),
        featuresTitle:
          "font-semibold text-sm text-muted-foreground uppercase tracking-wide",
        featureIcon:
          "rounded-full p-0.5 mr-3 mt-0.5 bg-muted text-muted-foreground",
        featureIconPopular: cn("text-white", theme.bg),
      },
      premium: {
        card: "relative transition-all duration-300 bg-background border border-border rounded-3xl p-8 hover:shadow-2xl",
        cardPopular: cn(
          "border-0 sm:scale-105 z-10 bg-gradient-to-b shadow-2xl",
          theme.gradientSoft,
          theme.shadow,
        ),
        price: cn(
          "text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br",
          theme.gradient,
        ),
        button:
          "w-full py-3 px-4 rounded-xl font-bold transition-all border border-border",
        buttonPopular: cn(
          "border-transparent text-white shadow-lg hover:scale-105",
          theme.bg,
          theme.shadow,
        ),
        featuresTitle:
          "font-bold text-sm text-foreground uppercase tracking-wide border-b border-border pb-2",
        featureIcon:
          "rounded-lg p-1 mr-3 mt-0.5 bg-muted text-muted-foreground shadow-sm",
        featureIconPopular: cn("text-white", theme.bg),
      },
      elegant: {
        card: "relative transition-all duration-500 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-border/60 rounded-xl p-8 hover:-translate-y-2 hover:shadow-xl",
        cardPopular: cn("sm:scale-105 z-10 border-t-4 shadow-2xl", theme.border),
        price:
          "text-4xl font-light text-foreground tracking-tight",
        button:
          "w-full py-3 px-4 rounded-md font-medium tracking-wide transition-all border border-border",
        buttonPopular: cn(
          "border-transparent text-white shadow-md hover:shadow-xl",
          theme.bg,
        ),
        featuresTitle:
          "font-medium text-xs text-muted-foreground uppercase tracking-[0.1em] border-b border-border/60 pb-3 mb-4",
        featureIcon:
          "rounded-full p-1 mr-3 mt-0.5 bg-muted text-muted-foreground",
        featureIconPopular: cn("text-white shadow-sm", theme.bg),
      },
      minimal: {
        card: "relative transition-all duration-300 bg-transparent rounded-2xl p-6",
        cardPopular: cn(
          "bg-muted sm:scale-105 z-10 ring-1 shadow-sm",
          theme.ring,
        ),
        price: "text-4xl font-light text-foreground",
        button:
          "w-full py-2.5 px-4 rounded-full font-medium transition-colors border border-border",
        buttonPopular: cn("border-transparent text-white shadow-md", theme.bg),
        featuresTitle:
          "font-medium text-xs text-muted-foreground uppercase tracking-widest mb-4",
        featureIcon: "mr-3 mt-0.5 text-muted-foreground shrink-0",
        featureIconPopular: cn("shrink-0", theme.text),
      },
      bordered: {
        card: "relative transition-all duration-200 bg-background border-2 border-primary rounded-none p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]",
        cardPopular: cn("border-4 sm:scale-105 z-10", theme.border),
        price: "text-4xl font-black text-foreground uppercase",
        button:
          "w-full py-3 px-4 font-bold border-2 border-primary uppercase tracking-wider transition-colors",
        buttonPopular: cn("text-white border-transparent", theme.bg),
        featuresTitle:
          "font-black text-sm text-foreground uppercase tracking-widest border-b-2 border-primary pb-2",
        featureIcon:
          "mr-3 mt-0.5 text-foreground font-bold shrink-0",
        featureIconPopular: cn("font-bold shrink-0", theme.text),
      },
    })[variant];

  return (
    <div className="w-full flex flex-col items-center px-1 sm:px-4 py-4" style={style}>
      {/* max-w-md, not max-w-sm: at 384px a two-tab track left each label only
          ~126px of content box, and "Annually (Save 20%)" needs ~150px, so the
          second tab wrapped onto a second line and stretched the pill. */}
      {data.tabs.length > 1 && (
        <div className="relative flex rounded-full bg-muted p-1 mb-8 sm:mb-12 border border-border max-w-md mx-auto w-full">
          <div
            className={cn(
              "absolute top-1 bottom-1 rounded-full transition-transform duration-300 ease-out shadow-sm",
              theme.bg,
            )}
            style={{
              width: `calc((100% - 8px) / ${data.tabs.length})`,
              transform: `translateX(calc(${tabIndex * 100}%))`,
              left: "4px",
            }}
          />
          {data.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "flex-1 min-w-0 relative z-10 flex items-center justify-center rounded-full px-3 sm:px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 truncate",
                activeTab === tab.id
                  ? "text-[var(--pricing-on)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8 w-full max-w-6xl mx-auto transition-all duration-300 px-2 sm:px-4 pt-4",
          isTransitioning && "opacity-0 scale-[0.98]",
        )}
      >
        {activeTabData?.plans.map((plan) => {
          const PlanIcon = ICON_MAP[plan.icon] || Rocket;
          return (
            <div
              key={plan.id}
              className={cn(
                getVariantStyles().card,
                plan.popular && getVariantStyles().cardPopular,
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                  <span
                    className={cn(
                      "px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md whitespace-nowrap",
                      variant === "bordered"
                        ? "rounded-none border-2 border-white"
                        : "rounded-full",
                      theme.bg,
                    )}
                  >
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div
                    className={cn(
                      "p-2 mr-3",
                      variant === "bordered"
                        ? "rounded-none border-2 border-primary"
                        : "rounded-xl",
                      plan.popular
                        ? theme.bg
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {/* No colour of its own: the tile above already sets one
                        for both states (accent foreground when popular, muted
                        zinc otherwise), so inheriting is correct in every
                        theme. Forcing white broke the near-white default
                        accent, and would have been invisible on the light
                        zinc-100 tile too. */}
                    <PlanIcon className="w-6 h-6" />
                  </div>
                  <h3
                    className={cn(
                      "text-xl font-bold",
                      plan.popular
                        ? theme.text
                        : "text-foreground",
                    )}
                  >
                    {plan.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6 min-h-[40px]">
                  {plan.subtitle}
                </p>
                <div className="flex items-end justify-center gap-1">
                  <span className={getVariantStyles().price}>{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground mb-1">
                      /{plan.period}
                    </span>
                  )}
                </div>
              </div>
              <button
                className={cn(
                  getVariantStyles().button,
                  plan.popular && getVariantStyles().buttonPopular,
                  "mb-8 cursor-pointer",
                )}
              >
                {plan.buttonText}
              </button>
              <div className="space-y-4 text-left">
                <h4 className={getVariantStyles().featuresTitle}>
                  What&apos;s included:
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div
                        className={cn(
                          getVariantStyles().featureIcon,
                          plan.popular && getVariantStyles().featureIconPopular,
                        )}
                      >
                        {/* Inherits from the tile: white here was invisible on
                            the light zinc-100 tile of non-popular plans, and
                            on the near-white default accent of popular ones. */}
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 2. PRICING BUILDER (GSAP)
// ==========================================
const getBuilderData = (activePlans: string[]) => {
  const hasD = activePlans.includes("design");
  const hasV = activePlans.includes("development");
  const hasF = activePlans.includes("fast");
  if (!hasD && !hasV && !hasF)
    return {
      title: "Select Services",
      tag: null,
      price: 0,
      features: [
        "Select the modules above to build your custom package and instantly see your quote.",
      ],
    };
  let title = "";
  const tag = hasF ? "Fast Track" : "Standard";
  let price = 0;
  let features: string[] = [];
  if (hasD) price += 300;
  if (hasV) price += 400;
  if (hasF) price += 100;
  if (hasD && hasV && hasF) {
    title = "Complete Fast-Track";
    features = [
      "Avg. 1 week turnaround",
      "5 rounds of revisions",
      "2 months of free support",
      "Top-notch custom design",
      "Figma interactive prototype",
      "Full custom development",
      "Priority queue placement",
    ];
  } else if (hasD && hasV) {
    title = "Design & Development";
    features = [
      "Avg. 2 weeks turnaround",
      "5 rounds of revisions",
      "2 months of free support",
      "Top-notch custom design",
      "Figma interactive prototype",
      "Full custom development",
    ];
  } else if (hasD && hasF) {
    title = "Accelerated Design";
    features = [
      "Avg. 2 days turnaround",
      "3 rounds of revisions",
      "1 month of free support",
      "Top-notch custom design",
      "Figma interactive prototype",
      "Priority queue placement",
    ];
  } else if (hasV && hasF) {
    title = "Accelerated Dev";
    features = [
      "Avg. 4 days turnaround",
      "5 rounds of revisions",
      "2 months of free support",
      "Full custom development",
      "Priority queue placement",
    ];
  } else if (hasD) {
    title = "Design Only";
    features = [
      "Avg. 4 days turnaround",
      "3 rounds of revisions",
      "1 month of free support",
      "Top-notch custom design",
      "Figma interactive prototype",
    ];
  } else if (hasV) {
    title = "Development Only";
    features = [
      "Avg. 1 week turnaround",
      "5 rounds of revisions",
      "2 months of free support",
      "Full custom development",
    ];
  } else if (hasF) {
    title = "Priority Support";
    features = [
      "Queue skip guaranteed",
      "Dedicated account manager",
      "24/7 Slack channel access",
    ];
  }
  return { title, tag, price, features };
};

export function PricingBuilder({
  color = "primary",
  linkComponent: Link = "a",
}: {
  color?: PricingColor;
  /**
   * The element used for links. Defaults to a plain `a`, so this component works
   * in any React app with no adaptation. In Next.js, pass `next/link` to keep
   * client-side navigation and prefetching: `linkComponent={Link}`.
   */
  linkComponent?: React.ElementType;
}) {
  const [activePlans, setActivePlans] = useState<string[]>([]);
  const cardData = getBuilderData(activePlans);
  const cardContentRef = useRef<HTMLDivElement>(null);
  const { theme, style } = getThemeStyles(color);

  const togglePlan = (id: string) =>
    setActivePlans((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  useLayoutEffect(() => {
    if (cardContentRef.current)
      gsap.fromTo(
        cardContentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
  }, [activePlans]);

  return (
    <div
      className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center"
      style={style}
    >
      <div className="w-full lg:w-1/2 space-y-8">
        <div>
          <h3 className={cn("text-4xl md:text-5xl font-bold mb-3", theme.text)}>
            Build Your Plan
          </h3>
          <p className="text-xl text-foreground font-medium">
            Select the services you need.
          </p>
          <p className="text-base text-muted-foreground mt-2 leading-relaxed">
            Customize your package to fit your exact requirements. The price
            updates instantly.
          </p>
        </div>
        <div className="space-y-4 mt-8">
          <div
            onClick={() => togglePlan("design")}
            className="flex items-center justify-between bg-card border border-border p-5 sm:p-6 rounded-2xl cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <div
                className={cn(
                  "p-3.5 rounded-xl transition-colors",
                  activePlans.includes("design")
                    ? theme.bgSoft
                    : "bg-muted text-muted-foreground group-hover:text-foreground",
                )}
              >
                <PenTool size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-foreground">
                  UI/UX Design
                </h4>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Top-notch custom design
                </p>
              </div>
            </div>
            <div
              className={cn(
                "w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0",
                activePlans.includes("design")
                  ? theme.bg
                  : "bg-muted",
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300",
                  activePlans.includes("design")
                    ? "translate-x-6"
                    : "translate-x-0",
                )}
              />
            </div>
          </div>
          <div
            onClick={() => togglePlan("development")}
            className="flex items-center justify-between bg-card border border-border p-5 sm:p-6 rounded-2xl cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <div
                className={cn(
                  "p-3.5 rounded-xl transition-colors",
                  activePlans.includes("development")
                    ? theme.bgSoft
                    : "bg-muted text-muted-foreground group-hover:text-foreground",
                )}
              >
                <Code2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-foreground">
                  Development
                </h4>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Full-stack implementation
                </p>
              </div>
            </div>
            <div
              className={cn(
                "w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0",
                activePlans.includes("development")
                  ? theme.bg
                  : "bg-muted",
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300",
                  activePlans.includes("development")
                    ? "translate-x-6"
                    : "translate-x-0",
                )}
              />
            </div>
          </div>
          <div
            onClick={() => togglePlan("fast")}
            className="flex items-center justify-between bg-card border border-border p-5 sm:p-6 rounded-2xl cursor-pointer hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <div
                className={cn(
                  "p-3.5 rounded-xl transition-colors",
                  activePlans.includes("fast")
                    ? theme.bgSoft
                    : "bg-muted text-muted-foreground group-hover:text-foreground",
                )}
              >
                <Zap size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg text-foreground">
                  Priority Delivery
                </h4>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Skip the queue
                </p>
              </div>
            </div>
            <div
              className={cn(
                "w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0",
                activePlans.includes("fast")
                  ? theme.bg
                  : "bg-muted",
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300",
                  activePlans.includes("fast")
                    ? "translate-x-6"
                    : "translate-x-0",
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-xl relative flex flex-col justify-between min-h-[500px] overflow-hidden">
          {activePlans.length > 0 && (
            <div
              className={cn(
                "absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-20 -translate-y-1/2 translate-x-1/4",
                theme.bg,
              )}
            />
          )}
          <div
            ref={cardContentRef}
            className="relative z-10 flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-8">
              <h4 className="text-2xl font-bold text-foreground max-w-[200px] leading-tight">
                {cardData.title}
              </h4>
              {cardData.tag && (
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border shrink-0",
                    theme.bgSoft,
                    theme.border,
                  )}
                >
                  {cardData.tag}
                </span>
              )}
            </div>
            <div className="mb-10">
              <span
                className={cn(
                  "text-6xl sm:text-[80px] font-extrabold tracking-tighter leading-none",
                  activePlans.length > 0
                    ? theme.text
                    : "text-zinc-300 dark:text-zinc-700",
                )}
              >
                <AnimatedPrice value={cardData.price} />
              </span>
            </div>
            <ul className="space-y-4 mb-12 flex-1">
              {cardData.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div
                    className={cn(
                      "mt-1 p-1 rounded-full shrink-0",
                      activePlans.length > 0
                        ? theme.bg
                        : "bg-muted",
                    )}
                  >
                    <Check
                      className={cn(
                        "w-3 h-3",
                        // Only the inactive state needs its own colour; the
                        // active tile carries the accent's own foreground.
                        activePlans.length === 0 && "text-muted-foreground",
                      )}
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-foreground font-medium">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="#"
              className={cn(
                "group w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all",
                activePlans.length > 0
                  ? cn("shadow-lg hover:scale-[1.02]", theme.bg)
                  : // zinc-400 on the light zinc-100 track was only 2.39:1;
                    // a disabled control should still be readable.
                    "bg-muted text-muted-foreground cursor-not-allowed",
              )}
            >
              Initiate Project{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
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

  // Shared by both layouts so the tooltip markup can't drift between them.
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
        ? // No text colour here: every `theme.bg` already carries its own
          // matching foreground. Re-stating `text-white` let tailwind-merge
          // drop the theme's own choice, so the default accent rendered white
          // on `--primary` — which is near-white in dark mode (1.26:1).
          cn(theme.bg, theme.shadow)
        : "border border-border dark:bg-zinc-800 text-foreground",
    );

  return (
    // Container query, not a media query: this table is nearly always inside a
    // constrained column, so the viewport says nothing about the room it has.
    <div className="@container/pricing w-full max-w-6xl mx-auto" style={style}>
      {/* NARROW — one card per plan.
          A comparison grid cannot survive a phone width. Scrolled sideways the
          feature-name column leaves the screen and every value loses its label
          ("25", "Unlimited", "100GB" with nothing to say what of), so instead
          of scrolling the grid we transpose it: each plan carries its own
          feature list, and nothing ever leaves the viewport. */}
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

      {/* WIDE — the side-by-side comparison grid. */}
      <div className="hidden @min-[52rem]/pricing:block overflow-hidden border border-border rounded-2xl bg-background shadow-sm">
        {/* The min-width belongs to the CONTENT, not to the scroll container.
            With `overflow-x-auto min-w-[800px]` on the same element the box can
            never shrink below 800px, so its content never exceeds it and no
            scrollbar is ever produced — instead the box overflowed the card,
            whose `overflow-hidden` silently cut the last plan column off with
            no way to reach it. */}
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
                    className="grid grid-cols-4 border-b border-border  transition-colors"
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
export function PricingSlider({ color = "primary" }: { color?: PricingColor }) {
  const [value, setValue] = useState(5);
  const { theme, style } = getThemeStyles(color);
  const calculatedPrice = 29 + value * 10;
  const pageviews =
    value === 0 ? "10k" : value === 10 ? "1M+" : `${value * 100}k`;

  return (
    <div
      className="w-full max-w-2xl mx-auto p-5 sm:p-8 md:p-12 bg-background border border-border rounded-3xl shadow-xl text-center"
      style={style}
    >
      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
        Usage Based Pricing
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-10">
        Scale your pricing as your traffic grows.
      </p>
      <div className="mb-6 sm:mb-12">
        <div className="text-[52px] sm:text-[80px] font-black tracking-tighter leading-none text-foreground mb-2">
          ${calculatedPrice}
        </div>
        <p className="text-muted-foreground font-medium tracking-wide uppercase text-xs sm:text-sm">
          Per Month
        </p>
      </div>
      <div className="relative mb-6 sm:mb-12">
        <div className="flex justify-between text-xs sm:text-sm font-bold text-muted-foreground mb-3 px-1 uppercase tracking-widest">
          <span>10k Views</span>
          <span className={theme.text}>{pageviews} Views</span>
          <span>1M+ Views</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          className={cn(
            "w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer",
            theme.slider,
          )}
        />
      </div>
      <button
        className={cn(
          "w-full py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-lg transition-all active:scale-[0.98] cursor-pointer shadow-lg",
          theme.bg,
        )}
      >
        Start 14-Day Free Trial
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
  linkComponent: Link = "a",
}: {
  packages: any;
  color?: PricingColor;
  /**
   * The element used for links. Defaults to a plain `a`, so this component works
   * in any React app with no adaptation. In Next.js, pass `next/link` to keep
   * client-side navigation and prefetching: `linkComponent={Link}`.
   */
  linkComponent?: React.ElementType;
}) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );
  // null means "no explicit pick yet" — the featured plan is resolved below
  // rather than written back in an effect, which rendered once with nothing
  // selected before correcting itself.
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
      {/* CUSTOM CSS FOR HOLLOW TYPOGRAPHY */}
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
                    "text-sm font-bold uppercase tracking-widest pb-1 border-b-2 transition-all duration-300",
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
                  {plan.isFeatured && (
                    <span
                      className={cn(
                        "text-[10px] font-mono tracking-widest uppercase mb-2 transition-colors duration-300",
                        isActive
                          ? theme.text
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      [ Most Popular ]
                    </span>
                  )}
                  <span
                    className={cn(
                      "text-4xl lg:text-5xl xl:text-[4rem] font-black uppercase tracking-tighter leading-[0.85] break-words whitespace-normal inline-block transition-all duration-500 ease-out",
                      isActive
                        ? cn(theme.text, "translate-x-4")
                        : "outline-text group-hover:translate-x-2",
                    )}
                  >
                    {plan.name}
                  </span>
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

                <div className="absolute -right-4 -top-8 text-[150px] xl:text-[200px] font-black text-foreground/[0.03]/[0.02] pointer-events-none select-none tracking-tighter leading-none transition-colors duration-300">
                  ${activePlan.price}
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
                      <AnimatedPrice value={activePlan.price} />
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

                <Link
                  href="#"
                  className={cn(
                    "group mt-auto w-max py-4 px-8 rounded-full text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 relative overflow-hidden z-10",
                    activePlan.isFeatured
                      ? // theme.bg already carries its own foreground; restating
                        // text-white here let tailwind-merge drop it, painting
                        // white on the near-white default accent.
                        theme.bg
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
                      // The fill that slides up is the accent, so the label has
                      // to take the accent's foreground — not white, which
                      // disappears on a light accent.
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
                </Link>
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
                          "text-[9px] font-mono tracking-widest uppercase mb-1 transition-colors duration-300",
                          isActive ? theme.text : "text-muted-foreground",
                        )}
                      >
                        [ Most Popular ]
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
                          <AnimatedPrice value={plan.price} />
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

                      <Link
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
                      </Link>
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
