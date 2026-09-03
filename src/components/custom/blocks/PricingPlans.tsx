"use client";

import gsap from "gsap";
import { Building, Check, Code2, PenTool, Rocket, Zap } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type PricingColor = "indigo" | "rose" | "emerald" | "zinc" | string;

const colorThemes: Record<string, Record<string, string>> = {
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 text-white",
    bgSoft: "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400",
    border: "border-indigo-600 dark:border-indigo-500",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 text-white",
    bgSoft: "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400",
    border: "border-rose-600 dark:border-rose-500",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 text-white",
    bgSoft: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-600 dark:border-emerald-500",
  },
  zinc: {
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
    bgSoft: "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
  },
};

const getThemeStyles = (color: PricingColor = "primary") => {
  if (color === "primary") {
    return {
      theme: {
        text: "text-[var(--pricing-accent)]",
        bg: "bg-[var(--pricing-accent)] text-[var(--pricing-on)]",
        bgSoft: "bg-[var(--pricing-accent)]/10 text-[var(--pricing-accent)]",
        border: "border-[var(--pricing-accent)]",
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

  return {
    theme: {
      text: "text-[var(--pricing-accent)]",
      bg: "bg-[var(--pricing-accent)] text-white",
      bgSoft: "bg-[var(--pricing-accent)]/10 text-[var(--pricing-accent)]",
      border: "border-[var(--pricing-accent)]",
    },
    style: {
      "--pricing-accent": color,
    } as React.CSSProperties,
  };
};

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

const defaultServices: PricingServiceOption[] = [
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

const renderIcon = (icon?: string | React.ReactNode) => {
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

export default function PricingPlans({
  title = "Pricing Plans",
  subtitle = "For each plan we",
  highlightText = "Outperform",
  brandTitle = "Custom Services",
  brandSubtitle = "Select options tailored to your goals",
  brandDescription = "Mix and match custom design, full-stack development, and priority delivery to build the ideal package for your business.",
  services = defaultServices,
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
                        {renderIcon(service.icon)}
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
                <h4 className={cn("text-xl sm:text-2xl font-bold transition-colors duration-300", hasSelection ? "text-foreground" : "text-muted-foreground")}>
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
                "w-full text-center transition-all duration-300 font-bold text-base sm:text-lg md:text-xl py-3.5 sm:py-5 rounded-xl mt-auto flex items-center justify-center",
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