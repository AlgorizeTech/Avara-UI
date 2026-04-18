"use client";

import {
  PricingBuilder,
  PricingCards,
  PricingColor,
  PricingData,
  PricingSlider,
  PricingTable,
  PricingTableData,
  PricingTypographic,
  PricingVariant,
} from "@/components/custom/blocks/Pricing";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const PRICING_ENGINE_CODE_TS = `"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Building, Check, Code2, HelpCircle, Minus, PenTool, Rocket, Shield, Sparkles, Star, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const Badge = ({ children, className }: any) => <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>{children}</span>;
const Card = ({ children, className }: any) => <div className={cn("rounded-xl border bg-white text-zinc-950 shadow dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-50", className)}>{children}</div>;
const CardHeader = ({ children, className }: any) => <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>;
const CardTitle = ({ children, className }: any) => <h3 className={cn("font-semibold leading-none tracking-tight", className)}>{children}</h3>;
const CardDescription = ({ children, className }: any) => <p className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}>{children}</p>;
const CardContent = ({ children, className }: any) => <div className={cn("p-6 pt-0", className)}>{children}</div>;
const Button = ({ children, className, variant="default", ...props }: any) => <button className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50", variant==="default" ? "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90" : "border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50", className)} {...props}>{children}</button>;

export type PricingColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type PricingVariant = "default" | "premium" | "elegant" | "minimal" | "bordered";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-600 hover:bg-indigo-700 text-white", bgSoft: "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400", border: "border-indigo-600 dark:border-indigo-500", shadow: "shadow-indigo-500/20", gradient: "from-indigo-600 to-purple-600", gradientSoft: "from-indigo-100 to-transparent dark:from-indigo-500/10 dark:to-transparent", ring: "ring-indigo-600 dark:ring-indigo-500", slider: "accent-indigo-600 dark:accent-indigo-500 [&::-webkit-slider-thumb]:bg-indigo-600 dark:[&::-webkit-slider-thumb]:bg-indigo-500", fill: "fill-indigo-600 dark:fill-indigo-400" },
  rose: { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-600 hover:bg-rose-700 text-white", bgSoft: "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400", border: "border-rose-600 dark:border-rose-500", shadow: "shadow-rose-500/20", gradient: "from-rose-600 to-orange-500", gradientSoft: "from-rose-100 to-transparent dark:from-rose-500/10 dark:to-transparent", ring: "ring-rose-600 dark:ring-rose-500", slider: "accent-rose-600 dark:accent-rose-500 [&::-webkit-slider-thumb]:bg-rose-600 dark:[&::-webkit-slider-thumb]:bg-rose-500", fill: "fill-rose-600 dark:fill-rose-400" },
  emerald: { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-600 hover:bg-emerald-700 text-white", bgSoft: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400", border: "border-emerald-600 dark:border-emerald-500", shadow: "shadow-emerald-500/20", gradient: "from-emerald-600 to-teal-500", gradientSoft: "from-emerald-100 to-transparent dark:from-emerald-500/10 dark:to-transparent", ring: "ring-emerald-600 dark:ring-emerald-500", slider: "accent-emerald-600 dark:accent-emerald-500 [&::-webkit-slider-thumb]:bg-emerald-600 dark:[&::-webkit-slider-thumb]:bg-emerald-500", fill: "fill-emerald-600 dark:fill-emerald-400" },
  zinc: { text: "text-zinc-900 dark:text-zinc-100", bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900", bgSoft: "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", shadow: "shadow-zinc-900/20 dark:shadow-white/10", gradient: "from-zinc-800 to-zinc-900 dark:from-zinc-200 dark:to-zinc-400", gradientSoft: "from-zinc-200 to-transparent dark:from-zinc-800/50 dark:to-transparent", ring: "ring-zinc-900 dark:ring-zinc-100", slider: "accent-zinc-900 dark:accent-zinc-100 [&::-webkit-slider-thumb]:bg-zinc-900 dark:[&::-webkit-slider-thumb]:bg-zinc-100", fill: "fill-zinc-900 dark:fill-zinc-100" },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { text: "text-[var(--theme-color)]", bg: "bg-[var(--theme-color)] text-white hover:opacity-90", bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]", border: "border-[var(--theme-color)]", shadow: "shadow-[var(--theme-color)]/20", gradient: "from-[var(--theme-color)] to-[rgba(var(--theme-color-rgb),0.6)]", gradientSoft: "from-[rgba(var(--theme-color-rgb),0.15)] to-transparent", ring: "ring-[var(--theme-color)]", slider: "accent-[var(--theme-color)] [&::-webkit-slider-thumb]:bg-[var(--theme-color)]", fill: "fill-[var(--theme-color)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

const ICON_MAP: Record<string, React.ElementType> = { Rocket, Users, Zap, Building, Code2, PenTool };

const AnimatedPrice = ({ value }: { value: string | number }) => {
  const cleanValue = value.toString().replace(/\\.00$/, "");
  const numericValue = parseFloat(cleanValue.replace(/[^0-9.]/g, ""));
  const [displayValue, setDisplayValue] = useState(numericValue || 0);

  useEffect(() => {
    if (isNaN(numericValue)) return;
    let startTime: number; const duration = 600; const startValue = displayValue;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 5);
      setDisplayValue(startValue + (numericValue - startValue) * easeProgress);
      if (progress < 1) requestAnimationFrame(animate); else setDisplayValue(numericValue);
    };
    requestAnimationFrame(animate);
  }, [numericValue]);

  if (isNaN(numericValue)) return <span>{cleanValue}</span>;
  const isDecimal = cleanValue.includes(".");
  return <span>{isDecimal ? displayValue.toFixed(2) : Math.round(displayValue).toLocaleString()}</span>;
};

// ... Rest of the components remain exactly the same as above
// (PricingCards, PricingBuilder, PricingTable, PricingSlider, PricingTypographic)

export interface PricingTypographicPlan { id: string | number; name: string; price: string | number; description: string; features: string[]; isFeatured: boolean; billingCycle?: "monthly" | "yearly" | string; }

export function PricingTypographic({ packages, color = "indigo" }: { packages: any; color?: PricingColor }) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [isMounted, setIsMounted] = useState(false);
  const [activePlanId, setActivePlanId] = useState<string | number | null>(null);
  const { theme, style } = getThemeStyles(color);

  let monthlyPlans: PricingTypographicPlan[] = [];
  let yearlyPlans: PricingTypographicPlan[] = [];

  if (Array.isArray(packages)) {
    monthlyPlans = packages.filter((p) => p.billingCycle?.toLowerCase() === "monthly");
    yearlyPlans = packages.filter((p) => p.billingCycle?.toLowerCase() === "yearly");
  } else if (packages && typeof packages === "object") {
    monthlyPlans = packages.monthly || packages.packages?.monthly || packages.data?.monthly || [];
    yearlyPlans = packages.yearly || packages.packages?.yearly || packages.data?.yearly || [];
  }

  const activePlans = billingCycle === "monthly" ? monthlyPlans : yearlyPlans;
  const hasYearlyPlans = yearlyPlans.length > 0;

  useEffect(() => {
    setIsMounted(true);
    if (activePlans.length > 0 && activePlanId === null) {
      const defaultPlan = activePlans.find((p) => p.isFeatured) || activePlans[0];
      setActivePlanId(defaultPlan.id);
    }
  }, [activePlans, activePlanId]);

  const activePlan = activePlans.find((p) => p.id === activePlanId) || activePlans[0];

  const handleToggleCycle = (cycle: "monthly" | "yearly") => {
    setBillingCycle(cycle);
    const newPlans = cycle === "monthly" ? monthlyPlans : yearlyPlans;
    if (newPlans.length > 0) {
      const newFeatured = newPlans.find((p) => p.isFeatured) || newPlans[0];
      setActivePlanId(newFeatured.id);
    }
  };

  if (!isMounted || !packages) return <section className="py-32 bg-zinc-950 flex justify-center items-center min-h-[500px] rounded-3xl border border-zinc-800"><div className={cn("w-8 h-8 border-4 border-t-transparent rounded-full animate-spin", theme.border)} /></section>;
  if (!activePlans.length) return <section className="py-32 bg-zinc-950 text-center text-zinc-500 text-sm font-mono rounded-3xl border border-zinc-800">No pricing plans available.</section>;

  return (
    <section style={style} className={cn("py-16 md:py-24 bg-white dark:bg-black text-zinc-900 dark:text-white font-sans antialiased overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 w-full transition-colors duration-300 relative", \`selection:\${theme.bg} selection:text-white\`)}>
      <style dangerouslySetInnerHTML={{ __html: \`.outline-text { color: transparent; -webkit-text-stroke: 1px rgba(0, 0, 0, 0.25); transition: -webkit-text-stroke 0.3s ease; } .group:hover .outline-text { -webkit-text-stroke: 1px rgba(0, 0, 0, 0.7); } .dark .outline-text { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25); } .dark .group:hover .outline-text { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.7); }\` }} />
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 lg:mb-20">
          <div className="max-w-xl">
            <h2 className={cn("text-xs font-mono mb-4", theme.text)}><span className="flex items-center gap-3 justify-center md:justify-start"><span className={cn("w-2 h-2 rounded-full animate-pulse", theme.bg)} /> Pricing</span></h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-5 text-zinc-900 dark:text-white">Pricing Model.</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">Transparent, value-driven pricing designed for high-growth brands. Select a tier to explore what's included.</p>
          </div>
          {hasYearlyPlans && (
            <div className="flex gap-6 shrink-0">
              {["monthly", "yearly"].map((cycle) => (
                <button key={cycle} onClick={() => handleToggleCycle(cycle as "monthly" | "yearly")} className={cn("text-sm font-bold uppercase tracking-widest pb-1 border-b-2 transition-all duration-300", billingCycle === cycle ? cn(theme.text, theme.border) : "text-zinc-400 border-transparent hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white")}>{cycle}</button>
              ))}
            </div>
          )}
        </div>
        <div className="hidden lg:flex w-full border-t border-zinc-200 dark:border-white/10 min-h-[550px] transition-colors duration-300">
          <div className="w-[45%] border-r border-zinc-200 dark:border-white/10 py-12 pr-8 flex flex-col justify-center gap-6 transition-colors duration-300">
            {activePlans.map((plan) => {
              const isActive = activePlanId === plan.id;
              return (
                <button key={plan.id} onMouseEnter={() => setActivePlanId(plan.id)} onClick={() => setActivePlanId(plan.id)} className="group flex flex-col items-start text-left w-full py-4 pr-4 cursor-pointer">
                  {plan.isFeatured && <span className={cn("text-[10px] font-mono tracking-widest uppercase mb-2 transition-colors duration-300", isActive ? theme.text : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white")}>[ Most Popular ]</span>}
                  <span className={cn("text-4xl lg:text-5xl xl:text-[4rem] font-black uppercase tracking-tighter leading-[0.85] break-words whitespace-normal inline-block transition-all duration-500 ease-out", isActive ? cn(theme.text, "translate-x-4") : "outline-text group-hover:translate-x-2")}>{plan.name}</span>
                </button>
              );
            })}
          </div>
          <div className="w-[55%] py-12 pl-12 xl:pl-16 relative overflow-hidden flex flex-col">
            {activePlan && (
              <div key={activePlan.id} className="animate-in fade-in slide-in-from-right-8 duration-700 fill-mode-both flex flex-col h-full z-10 relative">
                {activePlan.isFeatured && <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] blur-[100px] rounded-full pointer-events-none", theme.bgSoft)} />}
                <div className="absolute -right-4 -top-8 text-[150px] xl:text-[200px] font-black text-black/[0.03] dark:text-white/[0.02] pointer-events-none select-none tracking-tighter leading-none transition-colors duration-300">\${activePlan.price}</div>
                <div className="mb-12 relative z-10">
                  {activePlan.isFeatured && <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4 rounded-full border", theme.bgSoft, theme.border, theme.text)}><Star className={cn("w-3 h-3", theme.fill)} /> Recommended</div>}
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-bold text-zinc-400 dark:text-zinc-600 mb-2">$</span>
                    <span className="text-[70px] xl:text-[90px] leading-none font-black tracking-tighter text-zinc-900 dark:text-white"><AnimatedPrice value={activePlan.price} /></span>
                  </div>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">{activePlan.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-x-10 gap-y-5 mb-14 relative z-10">
                  {activePlan.features.map((feature: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 border-b border-zinc-200 dark:border-white/5 pb-3 group/feat transition-colors duration-300">
                      <div className={cn("w-1.5 h-1.5 bg-zinc-300 dark:bg-white/20 rounded-full transition-colors shrink-0", \`group-hover/feat:\${theme.bg}\`)} />
                      <span className="text-sm lg:text-base text-zinc-600 dark:text-zinc-300 group-hover/feat:text-zinc-900 dark:group-hover/feat:text-white transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link href="#" className={cn("group mt-auto w-max py-4 px-8 rounded-full text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 relative overflow-hidden z-10", activePlan.isFeatured ? cn(theme.bg, color === "zinc" ? "text-white dark:text-zinc-900" : "text-white") : "bg-zinc-100 text-zinc-900 dark:bg-white dark:text-black")}>
                  <div className={cn("absolute inset-0 translate-y-[100%] rounded-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]", activePlan.isFeatured ? "bg-black/20" : theme.bg)} />
                  <span className={cn("relative z-10 transition-colors duration-500", !activePlan.isFeatured && "group-hover:text-white")}>Initiate Project</span>
                  <div className="relative z-10 w-4 h-4 overflow-hidden flex items-center">
                    <ArrowRight className={cn("absolute w-4 h-4 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]", !activePlan.isFeatured && "group-hover:text-white")} />
                    <ArrowRight className={cn("absolute w-4 h-4 translate-x-0 group-hover:translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]", !activePlan.isFeatured && "group-hover:text-white")} />
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col lg:hidden border-t border-zinc-200 dark:border-white/10 transition-colors duration-300">
          {activePlans.map((plan) => {
            const isActive = activePlanId === plan.id;
            return (
              <div key={plan.id} className="border-b border-zinc-200 dark:border-white/10 transition-colors duration-300">
                <button onClick={() => setActivePlanId(isActive ? null : plan.id)} className="w-full py-6 md:py-8 flex justify-between items-center text-left">
                  <div className="flex flex-col pr-4">
                    {plan.isFeatured && <span className={cn("text-[9px] font-mono tracking-widest uppercase mb-1 transition-colors duration-300", isActive ? theme.text : "text-zinc-500")}>[ Most Popular ]</span>}
                    <span className={cn("text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9] break-words whitespace-normal transition-colors duration-300", isActive ? theme.text : "outline-text")}>{plan.name}</span>
                  </div>
                  <div className={cn("transition-transform duration-500 shrink-0", isActive ? cn("rotate-90", theme.text) : "text-zinc-300 dark:text-white/30")}><ArrowRight size={24} strokeWidth={2} /></div>
                </button>
                <div className={\`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] \${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}\`}>
                  <div className="overflow-hidden">
                    <div className="pb-8 pt-2 flex flex-col relative">
                      {plan.isFeatured && <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] blur-[80px] rounded-full pointer-events-none", theme.bgSoft)} />}
                      <div className="flex items-end gap-1.5 mb-3 relative z-10"><span className="text-xl font-bold text-zinc-400 dark:text-zinc-600 mb-1.5">$</span><span className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white"><AnimatedPrice value={plan.price} /></span></div>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-8 relative z-10">{plan.description}</p>
                      <div className="flex flex-col gap-3 mb-8 relative z-10">
                        {plan.features.map((feature: any, i: number) => (
                          <div key={i} className="flex items-start gap-3 border-b border-zinc-200 dark:border-white/5 pb-3">
                            <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", theme.bg)} />
                            <span className="text-sm md:text-base text-zinc-700 dark:text-zinc-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="#" className={cn("group w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 relative overflow-hidden z-10", plan.isFeatured ? cn(theme.bg, color === "zinc" ? "text-white dark:text-zinc-900" : "text-white") : "bg-zinc-100 text-zinc-900 dark:bg-white dark:text-black")}>
                        <div className={cn("absolute inset-0 translate-y-[100%] rounded-xl group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]", plan.isFeatured ? "bg-black/20" : theme.bg)} />
                        <span className={cn("relative z-10 transition-colors duration-500", !plan.isFeatured && "group-hover:text-white")}>Initiate Project</span>
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
}`;

// --- JAVASCRIPT ENGINE CODE ---
const PRICING_ENGINE_CODE_JS = PRICING_ENGINE_CODE_TS.replace(
  /:\s?[A-Z][A-Za-z0-9_<>]*(\[\])?/g,
  "",
)
  .replace(/<any>/g, "")
  .replace(/as any/g, "")
  .replace(/type [A-Za-z0-9_]+ = [^;]+;/g, "")
  .replace(/export interface [A-Za-z0-9_]+ \{[^}]+\}/g, "")
  .replace(/as React.CSSProperties/g, "");

type LayoutType = "cards" | "builder" | "table" | "slider" | "typographic";

export function PricingShowcase() {
  const [layout, setLayout] = useState<LayoutType>("cards");
  const [variant, setVariant] = useState<PricingVariant>("default");
  const [color, setColor] = useState<PricingColor>("indigo");

  const sampleCardsData: PricingData = {
    tabs: [
      {
        id: "monthly",
        label: "Monthly",
        plans: [
          {
            id: "startup",
            title: "Startup",
            subtitle: "Perfect for small teams.",
            price: "$29",
            period: "mo",
            buttonText: "Get Started",
            popular: false,
            icon: "Rocket",
            features: [
              "10 projects",
              "Up to 2,000 subscribers",
              "Basic analytics",
              "24-hour support",
            ],
          },
          {
            id: "pro",
            title: "Pro",
            subtitle: "For scaling businesses.",
            price: "$59",
            period: "mo",
            buttonText: "Upgrade to Pro",
            popular: true,
            icon: "Zap",
            features: [
              "25 projects",
              "Up to 10,000 subscribers",
              "Custom reporting",
              "1-hour support",
            ],
          },
          {
            id: "enterprise",
            title: "Enterprise",
            subtitle: "For larger organizations.",
            price: "$99",
            period: "mo",
            buttonText: "Contact Sales",
            popular: false,
            icon: "Building",
            features: [
              "Unlimited projects",
              "Unlimited subscribers",
              "Dedicated manager",
              "24/7 support",
            ],
          },
        ],
      },
      {
        id: "annually",
        label: "Annually (Save 20%)",
        plans: [
          {
            id: "startup-annual",
            title: "Startup",
            subtitle: "Perfect for small teams.",
            price: "$279",
            period: "yr",
            buttonText: "Get Started",
            popular: false,
            icon: "Rocket",
            features: [
              "10 projects",
              "Up to 2,000 subscribers",
              "Basic analytics",
              "24-hour support",
            ],
          },
          {
            id: "pro-annual",
            title: "Pro",
            subtitle: "For scaling businesses.",
            price: "$569",
            period: "yr",
            buttonText: "Upgrade to Pro",
            popular: true,
            icon: "Zap",
            features: [
              "25 projects",
              "Up to 10,000 subscribers",
              "Custom reporting",
              "1-hour support",
            ],
          },
          {
            id: "enterprise-annual",
            title: "Enterprise",
            subtitle: "For larger organizations.",
            price: "$949",
            period: "yr",
            buttonText: "Contact Sales",
            popular: false,
            icon: "Building",
            features: [
              "Unlimited projects",
              "Unlimited subscribers",
              "Dedicated manager",
              "24/7 support",
            ],
          },
        ],
      },
    ],
  };

  const sampleTableData: PricingTableData = {
    plans: [
      { id: "basic", title: "Basic", price: "$19", buttonText: "Get Started" },
      {
        id: "pro",
        title: "Pro",
        price: "$49",
        buttonText: "Upgrade to Pro",
        featured: true,
      },
      {
        id: "ent",
        title: "Enterprise",
        price: "$99",
        buttonText: "Contact Sales",
      },
    ],
    sections: [
      {
        title: "Core Features",
        features: [
          { name: "Projects", values: ["5", "25", "Unlimited"] },
          { name: "Users", values: ["1", "5", "Unlimited"] },
          {
            name: "Storage",
            helpText: "Total storage across all projects",
            values: ["10GB", "100GB", "1TB"],
          },
        ],
      },
      {
        title: "Advanced",
        features: [
          { name: "Custom Domains", values: [false, true, true] },
          { name: "Analytics API", values: [false, false, true] },
          { name: "Priority Support", values: [false, "Email", "24/7 Phone"] },
        ],
      },
    ],
  };

  const sampleTypographicData = [
    {
      id: "m1",
      billingCycle: "monthly",
      name: "Creator",
      price: 29,
      description: "Everything you need to kickstart your portfolio.",
      features: ["1 User", "5 Projects", "Basic Support"],
      isFeatured: false,
    },
    {
      id: "m2",
      billingCycle: "monthly",
      name: "Agency",
      price: 149,
      description: "Advanced tools for scaling design teams.",
      features: [
        "10 Users",
        "Unlimited Projects",
        "Priority Support",
        "Custom Domain",
      ],
      isFeatured: true,
    },
    {
      id: "m3",
      billingCycle: "monthly",
      name: "Enterprise",
      price: 499,
      description: "Dedicated infrastructure and account management.",
      features: [
        "Unlimited Everything",
        "24/7 SLA Support",
        "SSO & SAML",
        "Dedicated Manager",
      ],
      isFeatured: false,
    },
    {
      id: "y1",
      billingCycle: "yearly",
      name: "Creator",
      price: 19,
      description: "Everything you need to kickstart your portfolio.",
      features: ["1 User", "5 Projects", "Basic Support"],
      isFeatured: false,
    },
    {
      id: "y2",
      billingCycle: "yearly",
      name: "Agency",
      price: 129,
      description: "Advanced tools for scaling design teams.",
      features: [
        "10 Users",
        "Unlimited Projects",
        "Priority Support",
        "Custom Domain",
      ],
      isFeatured: true,
    },
    {
      id: "y3",
      billingCycle: "yearly",
      name: "Enterprise",
      price: 399,
      description: "Dedicated infrastructure and account management.",
      features: [
        "Unlimited Everything",
        "24/7 SLA Support",
        "SSO & SAML",
        "Dedicated Manager",
      ],
      isFeatured: false,
    },
  ];

  const generateUsageCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";

    let componentToImport = "PricingCards";
    if (layout === "builder") componentToImport = "PricingBuilder";
    if (layout === "table") componentToImport = "PricingTable";
    if (layout === "slider") componentToImport = "PricingSlider";
    if (layout === "typographic") componentToImport = "PricingTypographic";

    const importStatement = `import { ${componentToImport}${isTs && layout === "cards" ? ", PricingData" : ""}${isTs && layout === "table" ? ", PricingTableData" : ""} } from "@/components/custom/blocks/Pricing";`;

    if (layout === "builder" || layout === "slider") {
      return `${importStatement}\n\nexport default function PricingDemo()${typeDef} {\n  return (\n    <div className="w-full py-12">\n      <${componentToImport} color="${color}" />\n    </div>\n  );\n}`;
    }

    if (layout === "table") {
      return `${importStatement}\n\nexport default function PricingDemo()${typeDef} {\n  const data${isTs ? ": PricingTableData" : ""} = {\n    // Data truncated for brevity\n  };\n\n  return (\n    <div className="w-full py-12">\n      <PricingTable data={data} color="${color}" />\n    </div>\n  );\n}`;
    }

    if (layout === "typographic") {
      return `${importStatement}\n\nexport default function PricingDemo()${typeDef} {\n  const data = [\n    { id: "m1", billingCycle: "monthly", name: "Creator", price: 29, description: "Kickstart your portfolio.", features: ["1 User"], isFeatured: false },\n    { id: "m2", billingCycle: "monthly", name: "Agency", price: 149, description: "Advanced tools for scaling teams.", features: ["10 Users", "Priority Support"], isFeatured: true },\n  ];\n\n  return (\n    <div className="w-full py-12">\n      <PricingTypographic packages={data} color="${color}" />\n    </div>\n  );\n}`;
    }

    return `${importStatement}\n\nexport default function PricingDemo()${typeDef} {\n  const data${isTs ? ": PricingData" : ""} = {\n    // Data truncated for brevity\n  };\n\n  return (\n    <div className="w-full py-12">\n      <PricingCards data={data} variant="${variant}" color="${color}" />\n    </div>\n  );\n}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Component Type
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {[
                { id: "cards", label: "Tiered Cards" },
                { id: "builder", label: "GSAP Builder" },
                { id: "table", label: "Comparison Table" },
                { id: "slider", label: "Usage Slider" },
                { id: "typographic", label: "Typographic Menu" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setLayout(t.id as LayoutType)}
                  className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    layout === t.id
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Theme Color
            </label>
            <div className="flex items-center gap-2 h-10 px-2">
              {[
                { id: "indigo", bg: "bg-indigo-500" },
                { id: "rose", bg: "bg-rose-500" },
                { id: "emerald", bg: "bg-emerald-500" },
                { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id as PricingColor)}
                  className={`w-7 h-7 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                    color === c.id
                      ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                      : "hover:scale-110 hover:opacity-80"
                  }`}
                  title={c.id}
                />
              ))}
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${color.startsWith("#") ? "border-zinc-900 dark:border-white scale-110 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500" : "border-zinc-300 dark:border-zinc-700 hover:scale-110"}`}
              >
                <input
                  type="color"
                  value={color.startsWith("#") ? color : "#6366f1"}
                  onChange={(e) => setColor(e.target.value)}
                  className="absolute inset-[-10px] w-12 h-12 cursor-pointer"
                  title="Custom Hex Color"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Variant Selector (Only for Cards) */}
        {layout === "cards" && (
          <div className="flex flex-col gap-2 animate-in fade-in duration-300">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Card Variant
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full xl:w-max border border-zinc-200 dark:border-white/5">
              {(
                [
                  "default",
                  "premium",
                  "elegant",
                  "minimal",
                  "bordered",
                ] as PricingVariant[]
              ).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`flex-1 xl:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    variant === v
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <ComponentPreview
        name="Pricing"
        tsCode={PRICING_ENGINE_CODE_TS}
        jsCode={PRICING_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div
          className={`w-full py-12 md:py-24 transition-colors duration-300 ${layout === "typographic" ? "bg-transparent rounded-3xl" : "bg-zinc-50/50 dark:bg-transparent"}`}
        >
          {layout === "cards" && (
            <PricingCards
              key={`cards-${variant}-${color}`}
              variant={variant}
              color={color}
              data={sampleCardsData}
            />
          )}
          {layout === "builder" && (
            <PricingBuilder key={`builder-${color}`} color={color} />
          )}
          {layout === "table" && (
            <PricingTable
              key={`table-${color}`}
              color={color}
              data={sampleTableData}
            />
          )}
          {layout === "slider" && (
            <PricingSlider key={`slider-${color}`} color={color} />
          )}
          {layout === "typographic" && (
            <PricingTypographic
              key={`type-${color}`}
              packages={sampleTypographicData}
              color={color}
            />
          )}
        </div>
      </ComponentPreview>
    </div>
  );
}
