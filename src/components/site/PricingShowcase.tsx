"use client";

import {
  PricingBuilder,
  PricingCards,
  PricingColor,
  PricingData,
  PricingSlider,
  PricingTable,
  PricingTableData,
  PricingVariant,
} from "@/components/custom/blocks/Pricing";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const PRICING_ENGINE_CODE_TS = `"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ArrowRight, Building, Check, Code2, HelpCircle, Minus, PenTool, Rocket, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type PricingColor = "indigo" | "rose" | "emerald" | "zinc";
export type PricingVariant = "default" | "premium" | "elegant" | "minimal" | "bordered";

const colorThemes: Record<PricingColor, Record<string, string>> = {
  indigo: { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-600 hover:bg-indigo-700 text-white", bgSoft: "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400", border: "border-indigo-600 dark:border-indigo-500", shadow: "shadow-indigo-500/20", gradient: "from-indigo-600 to-purple-600", gradientSoft: "from-indigo-100 to-transparent dark:from-indigo-500/10 dark:to-transparent", ring: "ring-indigo-600 dark:ring-indigo-500", slider: "accent-indigo-600 dark:accent-indigo-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 dark:[&::-webkit-slider-thumb]:bg-indigo-500 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600 dark:[&::-moz-range-thumb]:bg-indigo-500" },
  rose: { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-600 hover:bg-rose-700 text-white", bgSoft: "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400", border: "border-rose-600 dark:border-rose-500", shadow: "shadow-rose-500/20", gradient: "from-rose-600 to-orange-500", gradientSoft: "from-rose-100 to-transparent dark:from-rose-500/10 dark:to-transparent", ring: "ring-rose-600 dark:ring-rose-500", slider: "accent-rose-600 dark:accent-rose-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rose-600 dark:[&::-webkit-slider-thumb]:bg-rose-500 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-rose-600 dark:[&::-moz-range-thumb]:bg-rose-500" },
  emerald: { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-600 hover:bg-emerald-700 text-white", bgSoft: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400", border: "border-emerald-600 dark:border-emerald-500", shadow: "shadow-emerald-500/20", gradient: "from-emerald-600 to-teal-500", gradientSoft: "from-emerald-100 to-transparent dark:from-emerald-500/10 dark:to-transparent", ring: "ring-emerald-600 dark:ring-emerald-500", slider: "accent-emerald-600 dark:accent-emerald-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600 dark:[&::-webkit-slider-thumb]:bg-emerald-500 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-600 dark:[&::-moz-range-thumb]:bg-emerald-500" },
  zinc: { text: "text-zinc-900 dark:text-zinc-100", bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900", bgSoft: "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", shadow: "shadow-zinc-900/20 dark:shadow-white/10", gradient: "from-zinc-800 to-zinc-900 dark:from-zinc-200 dark:to-zinc-400", gradientSoft: "from-zinc-200 to-transparent dark:from-zinc-800/50 dark:to-transparent", ring: "ring-zinc-900 dark:ring-zinc-100", slider: "accent-zinc-900 dark:accent-zinc-100 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-900 dark:[&::-webkit-slider-thumb]:bg-zinc-100 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-zinc-900 dark:[&::-moz-range-thumb]:bg-zinc-100" },
};

const ICON_MAP: Record<string, React.ElementType> = { Rocket, Users, Zap, Building, Code2, PenTool };

export interface Plan { id: string; title: string; subtitle: string; price: string; period: string; buttonText: string; popular: boolean; icon: string; features: string[]; }
export interface PricingData { tabs: { id: string; label: string; plans: Plan[]; }[]; }

export function PricingCards({ data, variant = "default", color = "indigo" }: { data: PricingData; variant?: PricingVariant; color?: PricingColor; }) {
  const [activeTab, setActiveTab] = useState(data?.tabs?.[0]?.id || "");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const theme = colorThemes[color];

  if (!data || !data.tabs || data.tabs.length === 0) return null;
  const activeTabData = data.tabs.find((tab) => tab.id === activeTab);
  const tabIndex = data.tabs.findIndex((tab) => tab.id === activeTab);

  const handleTabChange = (tabId: string) => {
    if (tabId !== activeTab) {
      setIsTransitioning(true);
      setTimeout(() => { setActiveTab(tabId); setIsTransitioning(false); }, 150);
    }
  };

  const getVariantStyles = () => ({
    default: { card: "relative transition-all duration-200 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-lg", cardPopular: cn("border-2 scale-105 z-10", theme.border, theme.shadow), price: "text-4xl font-bold text-zinc-900 dark:text-white", button: "w-full py-2.5 px-4 rounded-xl font-bold transition-colors border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900", buttonPopular: cn("border-transparent text-white", theme.bg), featuresTitle: "font-semibold text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wide", featureIcon: "rounded-full p-0.5 mr-3 mt-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400", featureIconPopular: cn("text-white", theme.bg) },
    premium: { card: "relative transition-all duration-300 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 hover:shadow-2xl", cardPopular: cn("border-0 scale-110 z-10 bg-gradient-to-b shadow-2xl", theme.gradientSoft, theme.shadow), price: cn("text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br", theme.gradient), button: "w-full py-3 px-4 rounded-xl font-bold transition-all border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900", buttonPopular: cn("border-transparent text-white shadow-lg hover:scale-105", theme.bg, theme.shadow), featuresTitle: "font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-wide border-b border-zinc-200 dark:border-zinc-800 pb-2", featureIcon: "rounded-lg p-1 mr-3 mt-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-sm", featureIconPopular: cn("text-white", theme.bg) },
    elegant: { card: "relative transition-all duration-500 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl p-8 hover:-translate-y-2 hover:shadow-xl", cardPopular: cn("scale-105 z-10 border-t-4 shadow-2xl", theme.border), price: "text-4xl font-light text-zinc-800 dark:text-zinc-200 tracking-tight", button: "w-full py-3 px-4 rounded-md font-medium tracking-wide transition-all border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800", buttonPopular: cn("border-transparent text-white shadow-md hover:shadow-xl", theme.bg), featuresTitle: "font-medium text-xs text-zinc-500 uppercase tracking-[0.1em] border-b border-zinc-200/60 dark:border-zinc-800/60 pb-3 mb-4", featureIcon: "rounded-full p-1 mr-3 mt-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400", featureIconPopular: cn("text-white shadow-sm", theme.bg) },
    minimal: { card: "relative transition-all duration-300 bg-transparent rounded-2xl p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/30", cardPopular: cn("bg-zinc-50 dark:bg-zinc-900/80 scale-105 z-10 ring-1 shadow-sm", theme.ring), price: "text-4xl font-light text-zinc-900 dark:text-white", button: "w-full py-2.5 px-4 rounded-full font-medium transition-colors border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800", buttonPopular: cn("border-transparent text-white shadow-md", theme.bg), featuresTitle: "font-medium text-xs text-zinc-500 uppercase tracking-widest mb-4", featureIcon: "mr-3 mt-0.5 text-zinc-400 shrink-0", featureIconPopular: cn("shrink-0", theme.text) },
    bordered: { card: "relative transition-all duration-200 bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-100 rounded-none p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]", cardPopular: cn("border-4 scale-105 z-10", theme.border), price: "text-4xl font-black text-zinc-900 dark:text-white uppercase", button: "w-full py-3 px-4 font-bold border-2 border-zinc-900 dark:border-zinc-100 uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors", buttonPopular: cn("text-white border-transparent", theme.bg), featuresTitle: "font-black text-sm text-zinc-900 dark:text-white uppercase tracking-widest border-b-2 border-zinc-900 dark:border-zinc-100 pb-2", featureIcon: "mr-3 mt-0.5 text-zinc-900 dark:text-zinc-100 font-bold shrink-0", featureIconPopular: cn("font-bold shrink-0", theme.text) },
  })[variant];

  return (
    <div className="w-full flex flex-col items-center">
      {data.tabs.length > 1 && (
        <div className="relative flex rounded-full bg-zinc-100 dark:bg-zinc-900 p-1 mb-12 border border-zinc-200 dark:border-zinc-800 max-w-sm mx-auto w-full">
          <div className={cn("absolute top-1 bottom-1 rounded-full transition-transform duration-300 ease-out shadow-sm", theme.bg)} style={{ width: \`calc((100% - 8px) / \${data.tabs.length})\`, transform: \`translateX(calc(\${tabIndex * 100}%))\`, left: "4px" }} />
          {data.tabs.map((tab) => (
            <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={cn("flex-1 relative z-10 flex items-center justify-center rounded-full px-2 sm:px-8 py-2.5 text-sm font-bold transition-all duration-300", activeTab === tab.id ? color === "zinc" ? "text-zinc-900 dark:text-zinc-100" : "text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100")}>
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl mx-auto transition-all duration-300", isTransitioning && "opacity-0 scale-[0.98]")}>
        {activeTabData?.plans.map((plan) => {
          const PlanIcon = ICON_MAP[plan.icon] || Rocket;
          return (
            <div key={plan.id} className={cn(getVariantStyles().card, plan.popular && getVariantStyles().cardPopular)}>
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                  <span className={cn("px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md whitespace-nowrap", variant === "bordered" ? "rounded-none border-2 border-white" : "rounded-full", theme.bg)}>Most Popular</span>
                </div>
              )}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className={cn("p-2 mr-3", variant === "bordered" ? "rounded-none border-2 border-zinc-900 dark:border-zinc-100" : "rounded-xl", plan.popular ? theme.bg : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400")}>
                    <PlanIcon className={cn("w-6 h-6", plan.popular ? color === "zinc" ? "text-white dark:text-zinc-900" : "text-white" : "")} />
                  </div>
                  <h3 className={cn("text-xl font-bold", plan.popular ? theme.text : "text-zinc-900 dark:text-white")}>{plan.title}</h3>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 min-h-[40px]">{plan.subtitle}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className={getVariantStyles().price}>{plan.price}</span>
                  {plan.period && <span className="text-zinc-500 dark:text-zinc-400 mb-1">/{plan.period}</span>}
                </div>
              </div>
              <button className={cn(getVariantStyles().button, plan.popular && getVariantStyles().buttonPopular, "mb-8 cursor-pointer")}>{plan.buttonText}</button>
              <div className="space-y-4 text-left">
                <h4 className={getVariantStyles().featuresTitle}>What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className={cn(getVariantStyles().featureIcon, plan.popular && getVariantStyles().featureIconPopular)}>
                        <Check className={cn("w-3 h-3", color === "zinc" && plan.popular ? "text-white dark:text-zinc-900" : "text-white")} strokeWidth={3} />
                      </div>
                      <span className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{feature}</span>
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

const getBuilderData = (activePlans: string[]) => {
  const hasD = activePlans.includes("design");
  const hasV = activePlans.includes("development");
  const hasF = activePlans.includes("fast");

  if (!hasD && !hasV && !hasF) return { title: "Select Services", tag: null, price: 0, features: ["Select the modules above to build your custom package and instantly see your quote."] };

  let title = ""; const tag = hasF ? "Fast Track" : "Standard"; let price = 0; let features: string[] = [];
  if (hasD) price += 300; if (hasV) price += 400; if (hasF) price += 100;

  if (hasD && hasV && hasF) { title = "Complete Fast-Track"; features = ["Avg. 1 week turnaround", "5 rounds of revisions", "2 months of free support", "Top-notch custom design", "Figma interactive prototype", "Full custom development", "Priority queue placement"]; }
  else if (hasD && hasV) { title = "Design & Development"; features = ["Avg. 2 weeks turnaround", "5 rounds of revisions", "2 months of free support", "Top-notch custom design", "Figma interactive prototype", "Full custom development"]; }
  else if (hasD && hasF) { title = "Accelerated Design"; features = ["Avg. 2 days turnaround", "3 rounds of revisions", "1 month of free support", "Top-notch custom design", "Figma interactive prototype", "Priority queue placement"]; }
  else if (hasV && hasF) { title = "Accelerated Dev"; features = ["Avg. 4 days turnaround", "5 rounds of revisions", "2 months of free support", "Full custom development", "Priority queue placement"]; }
  else if (hasD) { title = "Design Only"; features = ["Avg. 4 days turnaround", "3 rounds of revisions", "1 month of free support", "Top-notch custom design", "Figma interactive prototype"]; }
  else if (hasV) { title = "Development Only"; features = ["Avg. 1 week turnaround", "5 rounds of revisions", "2 months of free support", "Full custom development"]; }
  else if (hasF) { title = "Priority Support"; features = ["Queue skip guaranteed", "Dedicated account manager", "24/7 Slack channel access"]; }

  return { title, tag, price, features };
};

const AnimatedPrice = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);
  useEffect(() => {
    let startTime: number; const duration = 600; const startValue = displayValue;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 5);
      setDisplayValue(startValue + (value - startValue) * easeProgress);
      if (progress < 1) requestAnimationFrame(animate); else setDisplayValue(value);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <span>\${Math.round(displayValue).toLocaleString()}</span>;
};

export function PricingBuilder({ color = "indigo" }: { color?: PricingColor }) {
  const [activePlans, setActivePlans] = useState<string[]>([]);
  const cardData = getBuilderData(activePlans);
  const cardContentRef = useRef<HTMLDivElement>(null);
  const theme = colorThemes[color];

  const togglePlan = (id: string) => setActivePlans((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);

  useLayoutEffect(() => {
    if (cardContentRef.current) gsap.fromTo(cardContentRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
  }, [activePlans]);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
      <div className="w-full lg:w-1/2 space-y-8">
        <div>
          <h3 className={cn("text-4xl md:text-5xl font-bold mb-3", theme.text)}>Build Your Plan</h3>
          <p className="text-xl text-zinc-700 dark:text-zinc-300 font-medium">Select the services you need.</p>
          <p className="text-base text-zinc-500 mt-2 leading-relaxed">Customize your package to fit your exact requirements. The price updates instantly.</p>
        </div>
        <div className="space-y-4 mt-8">
          <div onClick={() => togglePlan("design")} className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 rounded-2xl cursor-pointer hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className={cn("p-3.5 rounded-xl transition-colors", activePlans.includes("design") ? theme.bgSoft : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200")}><PenTool size={24} /></div>
              <div><h4 className="font-bold text-lg text-zinc-900 dark:text-white">UI/UX Design</h4><p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Top-notch custom design</p></div>
            </div>
            <div className={cn("w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0", activePlans.includes("design") ? theme.bg : "bg-zinc-200 dark:bg-zinc-700")}>
              <div className={cn("w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300", activePlans.includes("design") ? "translate-x-6" : "translate-x-0")} />
            </div>
          </div>
          <div onClick={() => togglePlan("development")} className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 rounded-2xl cursor-pointer hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className={cn("p-3.5 rounded-xl transition-colors", activePlans.includes("development") ? theme.bgSoft : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200")}><Code2 size={24} /></div>
              <div><h4 className="font-bold text-lg text-zinc-900 dark:text-white">Development</h4><p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Full-stack implementation</p></div>
            </div>
            <div className={cn("w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0", activePlans.includes("development") ? theme.bg : "bg-zinc-200 dark:bg-zinc-700")}>
              <div className={cn("w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300", activePlans.includes("development") ? "translate-x-6" : "translate-x-0")} />
            </div>
          </div>
          <div onClick={() => togglePlan("fast")} className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 rounded-2xl cursor-pointer hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className={cn("p-3.5 rounded-xl transition-colors", activePlans.includes("fast") ? theme.bgSoft : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200")}><Zap size={24} /></div>
              <div><h4 className="font-bold text-lg text-zinc-900 dark:text-white">Priority Delivery</h4><p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Skip the queue</p></div>
            </div>
            <div className={cn("w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0", activePlans.includes("fast") ? theme.bg : "bg-zinc-200 dark:bg-zinc-700")}>
              <div className={cn("w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300", activePlans.includes("fast") ? "translate-x-6" : "translate-x-0")} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-xl relative flex flex-col justify-between min-h-[500px] overflow-hidden">
          {activePlans.length > 0 && <div className={cn("absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-20 -translate-y-1/2 translate-x-1/4", theme.bg)} />}
          <div ref={cardContentRef} className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <h4 className="text-2xl font-bold text-zinc-900 dark:text-white max-w-[200px] leading-tight">{cardData.title}</h4>
              {cardData.tag && <span className={cn("px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border shrink-0", theme.bgSoft, theme.border)}>{cardData.tag}</span>}
            </div>
            <div className="mb-10"><span className={cn("text-6xl sm:text-[80px] font-extrabold tracking-tighter leading-none", activePlans.length > 0 ? theme.text : "text-zinc-300 dark:text-zinc-700")}><AnimatedPrice value={cardData.price} /></span></div>
            <ul className="space-y-4 mb-12 flex-1">
              {cardData.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className={cn("mt-1 p-1 rounded-full shrink-0", activePlans.length > 0 ? theme.bg : "bg-zinc-200 dark:bg-zinc-800")}>
                    <Check className={cn("w-3 h-3", activePlans.length > 0 ? color === "zinc" ? "text-white dark:text-zinc-900" : "text-white" : "text-zinc-400")} strokeWidth={3} />
                  </div>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="#" className={cn("group w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all", activePlans.length > 0 ? cn("shadow-lg hover:scale-[1.02]", theme.bg, color === "zinc" ? "text-white dark:text-zinc-900" : "text-white") : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed")}>
              Initiate Project <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface TableFeature { name: string; values: (string | boolean)[]; helpText?: string; }
export interface TableSection { title: string; features: TableFeature[]; }
export interface PricingTableData { plans: { id: string; title: string; price: string; buttonText: string; featured?: boolean; }[]; sections: TableSection[]; }

export function PricingTable({ data, color = "indigo" }: { data: PricingTableData; color?: PricingColor; }) {
  const theme = colorThemes[color];
  const renderFeatureValue = (value: string | boolean) => {
    if (value === true) return <Check className={cn("w-5 h-5 mx-auto", theme.text)} />;
    if (value === false) return <Minus className="w-5 h-5 text-zinc-300 dark:text-zinc-700 mx-auto" />;
    return <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{value}</span>;
  };
  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 shadow-sm">
      <div className="overflow-x-auto min-w-[800px]">
        <div className="grid grid-cols-4 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
          <div className="p-6 flex items-end"><h3 className="font-bold text-xl text-zinc-900 dark:text-white">Compare Plans</h3></div>
          {data.plans.map((plan) => (
            <div key={plan.id} className={cn("p-6 text-center border-l border-zinc-200 dark:border-zinc-800 relative", plan.featured ? theme.bgSoft : "")}>
              {plan.featured && <div className={cn("absolute top-0 left-0 w-full h-1", theme.bg)} />}
              <h4 className={cn("text-lg font-bold mb-2", plan.featured ? theme.text : "text-zinc-900 dark:text-white")}>{plan.title}</h4>
              <div className="text-3xl font-black text-zinc-900 dark:text-white mb-6">{plan.price}</div>
              <button className={cn("w-full py-2.5 rounded-xl font-bold transition-all text-sm cursor-pointer", plan.featured ? cn(theme.bg, color === "zinc" ? "text-white dark:text-zinc-900" : "text-white", theme.shadow) : "border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white")}>{plan.buttonText}</button>
            </div>
          ))}
        </div>
        {data.sections.map((section, sIdx) => (
          <div key={sIdx}>
            <div className="grid grid-cols-4 bg-zinc-50/80 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-800">
              <div className="p-4 font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-wider">{section.title}</div>
              <div className="border-l border-zinc-200 dark:border-zinc-800"></div><div className="border-l border-zinc-200 dark:border-zinc-800"></div><div className="border-l border-zinc-200 dark:border-zinc-800"></div>
            </div>
            {section.features.map((feature, fIdx) => (
              <div key={fIdx} className="grid grid-cols-4 border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors">
                <div className="p-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {feature.name}
                  {feature.helpText && (
                    <div className="group relative cursor-help">
                      <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-zinc-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-center">{feature.helpText}</div>
                    </div>
                  )}
                </div>
                {feature.values.map((val, vIdx) => (
                  <div key={vIdx} className={cn("p-4 flex items-center justify-center border-l border-zinc-100 dark:border-zinc-800/50", data.plans[vIdx].featured ? theme.bgSoft : "")}>
                    {renderFeatureValue(val)}
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

export function PricingSlider({ color = "indigo" }: { color?: PricingColor }) {
  const [value, setValue] = useState(5);
  const theme = colorThemes[color];
  const calculatedPrice = 29 + value * 10;
  const pageviews = value === 0 ? "10k" : value === 10 ? "1M+" : \`\${value * 100}k\`;

  return (
    <div className="w-full max-w-2xl mx-auto p-8 md:p-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl text-center">
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Usage Based Pricing</h3>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10">Scale your pricing as your traffic grows.</p>
      <div className="mb-12"><div className="text-[80px] font-black tracking-tighter leading-none text-zinc-900 dark:text-white mb-2">\${calculatedPrice}</div><p className="text-zinc-500 font-medium tracking-wide uppercase text-sm">Per Month</p></div>
      <div className="relative mb-12">
        <div className="flex justify-between text-sm font-bold text-zinc-400 mb-4 px-1 uppercase tracking-widest"><span>10k Views</span><span className={theme.text}>{pageviews} Views</span><span>1M+ Views</span></div>
        <input type="range" min="0" max="10" step="1" value={value} onChange={(e) => setValue(parseInt(e.target.value))} className={cn("w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer", theme.slider)} />
      </div>
      <button className={cn("w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] cursor-pointer shadow-lg", theme.bg, color === "zinc" ? "text-white dark:text-zinc-900" : "text-white")}>Start 14-Day Free Trial</button>
      <p className="text-xs text-zinc-400 mt-4">No credit card required. Cancel anytime.</p>
    </div>
  );
}`;

// --- JAVASCRIPT ENGINE CODE ---
const PRICING_ENGINE_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ArrowRight, Building, Check, Code2, HelpCircle, Minus, PenTool, Rocket, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const colorThemes = {
  indigo: { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-600 hover:bg-indigo-700 text-white", bgSoft: "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400", border: "border-indigo-600 dark:border-indigo-500", shadow: "shadow-indigo-500/20", gradient: "from-indigo-600 to-purple-600", gradientSoft: "from-indigo-100 to-transparent dark:from-indigo-500/10 dark:to-transparent", ring: "ring-indigo-600 dark:ring-indigo-500", slider: "accent-indigo-600 dark:accent-indigo-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 dark:[&::-webkit-slider-thumb]:bg-indigo-500 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600 dark:[&::-moz-range-thumb]:bg-indigo-500" },
  rose: { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-600 hover:bg-rose-700 text-white", bgSoft: "bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400", border: "border-rose-600 dark:border-rose-500", shadow: "shadow-rose-500/20", gradient: "from-rose-600 to-orange-500", gradientSoft: "from-rose-100 to-transparent dark:from-rose-500/10 dark:to-transparent", ring: "ring-rose-600 dark:ring-rose-500", slider: "accent-rose-600 dark:accent-rose-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rose-600 dark:[&::-webkit-slider-thumb]:bg-rose-500 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-rose-600 dark:[&::-moz-range-thumb]:bg-rose-500" },
  emerald: { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-600 hover:bg-emerald-700 text-white", bgSoft: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400", border: "border-emerald-600 dark:border-emerald-500", shadow: "shadow-emerald-500/20", gradient: "from-emerald-600 to-teal-500", gradientSoft: "from-emerald-100 to-transparent dark:from-emerald-500/10 dark:to-transparent", ring: "ring-emerald-600 dark:ring-emerald-500", slider: "accent-emerald-600 dark:accent-emerald-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600 dark:[&::-webkit-slider-thumb]:bg-emerald-500 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-600 dark:[&::-moz-range-thumb]:bg-emerald-500" },
  zinc: { text: "text-zinc-900 dark:text-zinc-100", bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900", bgSoft: "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", shadow: "shadow-zinc-900/20 dark:shadow-white/10", gradient: "from-zinc-800 to-zinc-900 dark:from-zinc-200 dark:to-zinc-400", gradientSoft: "from-zinc-200 to-transparent dark:from-zinc-800/50 dark:to-transparent", ring: "ring-zinc-900 dark:ring-zinc-100", slider: "accent-zinc-900 dark:accent-zinc-100 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-900 dark:[&::-webkit-slider-thumb]:bg-zinc-100 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-zinc-900 dark:[&::-moz-range-thumb]:bg-zinc-100" },
};

const ICON_MAP = { Rocket, Users, Zap, Building, Code2, PenTool };

export function PricingCards({ data, variant = "default", color = "indigo" }) {
  const [activeTab, setActiveTab] = useState(data?.tabs?.[0]?.id || "");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const theme = colorThemes[color];

  if (!data || !data.tabs || data.tabs.length === 0) return null;
  const activeTabData = data.tabs.find((tab) => tab.id === activeTab);
  const tabIndex = data.tabs.findIndex((tab) => tab.id === activeTab);

  const handleTabChange = (tabId) => {
    if (tabId !== activeTab) {
      setIsTransitioning(true);
      setTimeout(() => { setActiveTab(tabId); setIsTransitioning(false); }, 150);
    }
  };

  const getVariantStyles = () => ({
    default: { card: "relative transition-all duration-200 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-lg", cardPopular: cn("border-2 scale-105 z-10", theme.border, theme.shadow), price: "text-4xl font-bold text-zinc-900 dark:text-white", button: "w-full py-2.5 px-4 rounded-xl font-bold transition-colors border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900", buttonPopular: cn("border-transparent text-white", theme.bg), featuresTitle: "font-semibold text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wide", featureIcon: "rounded-full p-0.5 mr-3 mt-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400", featureIconPopular: cn("text-white", theme.bg) },
    premium: { card: "relative transition-all duration-300 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 hover:shadow-2xl", cardPopular: cn("border-0 scale-110 z-10 bg-gradient-to-b shadow-2xl", theme.gradientSoft, theme.shadow), price: cn("text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br", theme.gradient), button: "w-full py-3 px-4 rounded-xl font-bold transition-all border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900", buttonPopular: cn("border-transparent text-white shadow-lg hover:scale-105", theme.bg, theme.shadow), featuresTitle: "font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-wide border-b border-zinc-200 dark:border-zinc-800 pb-2", featureIcon: "rounded-lg p-1 mr-3 mt-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shadow-sm", featureIconPopular: cn("text-white", theme.bg) },
    elegant: { card: "relative transition-all duration-500 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl p-8 hover:-translate-y-2 hover:shadow-xl", cardPopular: cn("scale-105 z-10 border-t-4 shadow-2xl", theme.border), price: "text-4xl font-light text-zinc-800 dark:text-zinc-200 tracking-tight", button: "w-full py-3 px-4 rounded-md font-medium tracking-wide transition-all border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800", buttonPopular: cn("border-transparent text-white shadow-md hover:shadow-xl", theme.bg), featuresTitle: "font-medium text-xs text-zinc-500 uppercase tracking-[0.1em] border-b border-zinc-200/60 dark:border-zinc-800/60 pb-3 mb-4", featureIcon: "rounded-full p-1 mr-3 mt-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400", featureIconPopular: cn("text-white shadow-sm", theme.bg) },
    minimal: { card: "relative transition-all duration-300 bg-transparent rounded-2xl p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/30", cardPopular: cn("bg-zinc-50 dark:bg-zinc-900/80 scale-105 z-10 ring-1 shadow-sm", theme.ring), price: "text-4xl font-light text-zinc-900 dark:text-white", button: "w-full py-2.5 px-4 rounded-full font-medium transition-colors border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800", buttonPopular: cn("border-transparent text-white shadow-md", theme.bg), featuresTitle: "font-medium text-xs text-zinc-500 uppercase tracking-widest mb-4", featureIcon: "mr-3 mt-0.5 text-zinc-400 shrink-0", featureIconPopular: cn("shrink-0", theme.text) },
    bordered: { card: "relative transition-all duration-200 bg-white dark:bg-zinc-950 border-2 border-zinc-900 dark:border-zinc-100 rounded-none p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]", cardPopular: cn("border-4 scale-105 z-10", theme.border), price: "text-4xl font-black text-zinc-900 dark:text-white uppercase", button: "w-full py-3 px-4 font-bold border-2 border-zinc-900 dark:border-zinc-100 uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors", buttonPopular: cn("text-white border-transparent", theme.bg), featuresTitle: "font-black text-sm text-zinc-900 dark:text-white uppercase tracking-widest border-b-2 border-zinc-900 dark:border-zinc-100 pb-2", featureIcon: "mr-3 mt-0.5 text-zinc-900 dark:text-zinc-100 font-bold shrink-0", featureIconPopular: cn("font-bold shrink-0", theme.text) },
  })[variant];

  return (
    <div className="w-full flex flex-col items-center">
      {data.tabs.length > 1 && (
        <div className="relative flex rounded-full bg-zinc-100 dark:bg-zinc-900 p-1 mb-12 border border-zinc-200 dark:border-zinc-800 max-w-sm mx-auto w-full">
          <div className={cn("absolute top-1 bottom-1 rounded-full transition-transform duration-300 ease-out shadow-sm", theme.bg)} style={{ width: \`calc((100% - 8px) / \${data.tabs.length})\`, transform: \`translateX(calc(\${tabIndex * 100}%))\`, left: "4px" }} />
          {data.tabs.map((tab) => (
            <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={cn("flex-1 relative z-10 flex items-center justify-center rounded-full px-2 sm:px-8 py-2.5 text-sm font-bold transition-all duration-300", activeTab === tab.id ? color === "zinc" ? "text-zinc-900 dark:text-zinc-100" : "text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100")}>
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl mx-auto transition-all duration-300", isTransitioning && "opacity-0 scale-[0.98]")}>
        {activeTabData?.plans.map((plan) => {
          const PlanIcon = ICON_MAP[plan.icon] || Rocket;
          return (
            <div key={plan.id} className={cn(getVariantStyles().card, plan.popular && getVariantStyles().cardPopular)}>
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                  <span className={cn("px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md whitespace-nowrap", variant === "bordered" ? "rounded-none border-2 border-white" : "rounded-full", theme.bg)}>Most Popular</span>
                </div>
              )}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className={cn("p-2 mr-3", variant === "bordered" ? "rounded-none border-2 border-zinc-900 dark:border-zinc-100" : "rounded-xl", plan.popular ? theme.bg : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400")}>
                    <PlanIcon className={cn("w-6 h-6", plan.popular ? color === "zinc" ? "text-white dark:text-zinc-900" : "text-white" : "")} />
                  </div>
                  <h3 className={cn("text-xl font-bold", plan.popular ? theme.text : "text-zinc-900 dark:text-white")}>{plan.title}</h3>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 min-h-[40px]">{plan.subtitle}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className={getVariantStyles().price}>{plan.price}</span>
                  {plan.period && <span className="text-zinc-500 dark:text-zinc-400 mb-1">/{plan.period}</span>}
                </div>
              </div>
              <button className={cn(getVariantStyles().button, plan.popular && getVariantStyles().buttonPopular, "mb-8 cursor-pointer")}>{plan.buttonText}</button>
              <div className="space-y-4 text-left">
                <h4 className={getVariantStyles().featuresTitle}>What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className={cn(getVariantStyles().featureIcon, plan.popular && getVariantStyles().featureIconPopular)}>
                        <Check className={cn("w-3 h-3", color === "zinc" && plan.popular ? "text-white dark:text-zinc-900" : "text-white")} strokeWidth={3} />
                      </div>
                      <span className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{feature}</span>
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

const getBuilderData = (activePlans) => {
  const hasD = activePlans.includes("design");
  const hasV = activePlans.includes("development");
  const hasF = activePlans.includes("fast");

  if (!hasD && !hasV && !hasF) return { title: "Select Services", tag: null, price: 0, features: ["Select the modules above to build your custom package and instantly see your quote."] };

  let title = ""; const tag = hasF ? "Fast Track" : "Standard"; let price = 0; let features = [];
  if (hasD) price += 300; if (hasV) price += 400; if (hasF) price += 100;

  if (hasD && hasV && hasF) { title = "Complete Fast-Track"; features = ["Avg. 1 week turnaround", "5 rounds of revisions", "2 months of free support", "Top-notch custom design", "Figma interactive prototype", "Full custom development", "Priority queue placement"]; }
  else if (hasD && hasV) { title = "Design & Development"; features = ["Avg. 2 weeks turnaround", "5 rounds of revisions", "2 months of free support", "Top-notch custom design", "Figma interactive prototype", "Full custom development"]; }
  else if (hasD && hasF) { title = "Accelerated Design"; features = ["Avg. 2 days turnaround", "3 rounds of revisions", "1 month of free support", "Top-notch custom design", "Figma interactive prototype", "Priority queue placement"]; }
  else if (hasV && hasF) { title = "Accelerated Dev"; features = ["Avg. 4 days turnaround", "5 rounds of revisions", "2 months of free support", "Full custom development", "Priority queue placement"]; }
  else if (hasD) { title = "Design Only"; features = ["Avg. 4 days turnaround", "3 rounds of revisions", "1 month of free support", "Top-notch custom design", "Figma interactive prototype"]; }
  else if (hasV) { title = "Development Only"; features = ["Avg. 1 week turnaround", "5 rounds of revisions", "2 months of free support", "Full custom development"]; }
  else if (hasF) { title = "Priority Support"; features = ["Queue skip guaranteed", "Dedicated account manager", "24/7 Slack channel access"]; }

  return { title, tag, price, features };
};

const AnimatedPrice = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);
  useEffect(() => {
    let startTime; const duration = 600; const startValue = displayValue;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 5);
      setDisplayValue(startValue + (value - startValue) * easeProgress);
      if (progress < 1) requestAnimationFrame(animate); else setDisplayValue(value);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <span>\${Math.round(displayValue).toLocaleString()}</span>;
};

export function PricingBuilder({ color = "indigo" }) {
  const [activePlans, setActivePlans] = useState([]);
  const cardData = getBuilderData(activePlans);
  const cardContentRef = useRef(null);
  const theme = colorThemes[color];

  const togglePlan = (id) => setActivePlans((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);

  useLayoutEffect(() => {
    if (cardContentRef.current) gsap.fromTo(cardContentRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
  }, [activePlans]);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
      <div className="w-full lg:w-1/2 space-y-8">
        <div>
          <h3 className={cn("text-4xl md:text-5xl font-bold mb-3", theme.text)}>Build Your Plan</h3>
          <p className="text-xl text-zinc-700 dark:text-zinc-300 font-medium">Select the services you need.</p>
          <p className="text-base text-zinc-500 mt-2 leading-relaxed">Customize your package to fit your exact requirements. The price updates instantly.</p>
        </div>
        <div className="space-y-4 mt-8">
          <div onClick={() => togglePlan("design")} className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 rounded-2xl cursor-pointer hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className={cn("p-3.5 rounded-xl transition-colors", activePlans.includes("design") ? theme.bgSoft : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200")}><PenTool size={24} /></div>
              <div><h4 className="font-bold text-lg text-zinc-900 dark:text-white">UI/UX Design</h4><p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Top-notch custom design</p></div>
            </div>
            <div className={cn("w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0", activePlans.includes("design") ? theme.bg : "bg-zinc-200 dark:bg-zinc-700")}>
              <div className={cn("w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300", activePlans.includes("design") ? "translate-x-6" : "translate-x-0")} />
            </div>
          </div>
          <div onClick={() => togglePlan("development")} className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 rounded-2xl cursor-pointer hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className={cn("p-3.5 rounded-xl transition-colors", activePlans.includes("development") ? theme.bgSoft : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200")}><Code2 size={24} /></div>
              <div><h4 className="font-bold text-lg text-zinc-900 dark:text-white">Development</h4><p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Full-stack implementation</p></div>
            </div>
            <div className={cn("w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0", activePlans.includes("development") ? theme.bg : "bg-zinc-200 dark:bg-zinc-700")}>
              <div className={cn("w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300", activePlans.includes("development") ? "translate-x-6" : "translate-x-0")} />
            </div>
          </div>
          <div onClick={() => togglePlan("fast")} className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 rounded-2xl cursor-pointer hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className={cn("p-3.5 rounded-xl transition-colors", activePlans.includes("fast") ? theme.bgSoft : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200")}><Zap size={24} /></div>
              <div><h4 className="font-bold text-lg text-zinc-900 dark:text-white">Priority Delivery</h4><p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Skip the queue</p></div>
            </div>
            <div className={cn("w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0", activePlans.includes("fast") ? theme.bg : "bg-zinc-200 dark:bg-zinc-700")}>
              <div className={cn("w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300", activePlans.includes("fast") ? "translate-x-6" : "translate-x-0")} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-xl relative flex flex-col justify-between min-h-[500px] overflow-hidden">
          {activePlans.length > 0 && <div className={cn("absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-20 -translate-y-1/2 translate-x-1/4", theme.bg)} />}
          <div ref={cardContentRef} className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <h4 className="text-2xl font-bold text-zinc-900 dark:text-white max-w-[200px] leading-tight">{cardData.title}</h4>
              {cardData.tag && <span className={cn("px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border shrink-0", theme.bgSoft, theme.border)}>{cardData.tag}</span>}
            </div>
            <div className="mb-10"><span className={cn("text-6xl sm:text-[80px] font-extrabold tracking-tighter leading-none", activePlans.length > 0 ? theme.text : "text-zinc-300 dark:text-zinc-700")}><AnimatedPrice value={cardData.price} /></span></div>
            <ul className="space-y-4 mb-12 flex-1">
              {cardData.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className={cn("mt-1 p-1 rounded-full shrink-0", activePlans.length > 0 ? theme.bg : "bg-zinc-200 dark:bg-zinc-800")}>
                    <Check className={cn("w-3 h-3", activePlans.length > 0 ? color === "zinc" ? "text-white dark:text-zinc-900" : "text-white" : "text-zinc-400")} strokeWidth={3} />
                  </div>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="#" className={cn("group w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all", activePlans.length > 0 ? cn("shadow-lg hover:scale-[1.02]", theme.bg, color === "zinc" ? "text-white dark:text-zinc-900" : "text-white") : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed")}>
              Initiate Project <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PricingTable({ data, color = "indigo" }) {
  const theme = colorThemes[color];
  const renderFeatureValue = (value) => {
    if (value === true) return <Check className={cn("w-5 h-5 mx-auto", theme.text)} />;
    if (value === false) return <Minus className="w-5 h-5 text-zinc-300 dark:text-zinc-700 mx-auto" />;
    return <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{value}</span>;
  };
  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 shadow-sm">
      <div className="overflow-x-auto min-w-[800px]">
        <div className="grid grid-cols-4 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
          <div className="p-6 flex items-end"><h3 className="font-bold text-xl text-zinc-900 dark:text-white">Compare Plans</h3></div>
          {data.plans.map((plan) => (
            <div key={plan.id} className={cn("p-6 text-center border-l border-zinc-200 dark:border-zinc-800 relative", plan.featured ? theme.bgSoft : "")}>
              {plan.featured && <div className={cn("absolute top-0 left-0 w-full h-1", theme.bg)} />}
              <h4 className={cn("text-lg font-bold mb-2", plan.featured ? theme.text : "text-zinc-900 dark:text-white")}>{plan.title}</h4>
              <div className="text-3xl font-black text-zinc-900 dark:text-white mb-6">{plan.price}</div>
              <button className={cn("w-full py-2.5 rounded-xl font-bold transition-all text-sm cursor-pointer", plan.featured ? cn(theme.bg, color === "zinc" ? "text-white dark:text-zinc-900" : "text-white", theme.shadow) : "border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white")}>{plan.buttonText}</button>
            </div>
          ))}
        </div>
        {data.sections.map((section, sIdx) => (
          <div key={sIdx}>
            <div className="grid grid-cols-4 bg-zinc-50/80 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-800">
              <div className="p-4 font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-wider">{section.title}</div>
              <div className="border-l border-zinc-200 dark:border-zinc-800"></div><div className="border-l border-zinc-200 dark:border-zinc-800"></div><div className="border-l border-zinc-200 dark:border-zinc-800"></div>
            </div>
            {section.features.map((feature, fIdx) => (
              <div key={fIdx} className="grid grid-cols-4 border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors">
                <div className="p-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {feature.name}
                  {feature.helpText && (
                    <div className="group relative cursor-help">
                      <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-zinc-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-center">{feature.helpText}</div>
                    </div>
                  )}
                </div>
                {feature.values.map((val, vIdx) => (
                  <div key={vIdx} className={cn("p-4 flex items-center justify-center border-l border-zinc-100 dark:border-zinc-800/50", data.plans[vIdx].featured ? theme.bgSoft : "")}>
                    {renderFeatureValue(val)}
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

export function PricingSlider({ color = "indigo" }) {
  const [value, setValue] = useState(5);
  const theme = colorThemes[color];
  const calculatedPrice = 29 + value * 10;
  const pageviews = value === 0 ? "10k" : value === 10 ? "1M+" : \`\${value * 100}k\`;

  return (
    <div className="w-full max-w-2xl mx-auto p-8 md:p-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl text-center">
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Usage Based Pricing</h3>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10">Scale your pricing as your traffic grows.</p>
      <div className="mb-12"><div className="text-[80px] font-black tracking-tighter leading-none text-zinc-900 dark:text-white mb-2">\${calculatedPrice}</div><p className="text-zinc-500 font-medium tracking-wide uppercase text-sm">Per Month</p></div>
      <div className="relative mb-12">
        <div className="flex justify-between text-sm font-bold text-zinc-400 mb-4 px-1 uppercase tracking-widest"><span>10k Views</span><span className={theme.text}>{pageviews} Views</span><span>1M+ Views</span></div>
        <input type="range" min="0" max="10" step="1" value={value} onChange={(e) => setValue(parseInt(e.target.value))} className={cn("w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer", theme.slider)} />
      </div>
      <button className={cn("w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] cursor-pointer shadow-lg", theme.bg, color === "zinc" ? "text-white dark:text-zinc-900" : "text-white")}>Start 14-Day Free Trial</button>
      <p className="text-xs text-zinc-400 mt-4">No credit card required. Cancel anytime.</p>
    </div>
  );
}`;

type LayoutType = "cards" | "builder" | "table" | "slider";

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

  const generateUsageCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";

    let componentToImport = "PricingCards";
    if (layout === "builder") componentToImport = "PricingBuilder";
    if (layout === "table") componentToImport = "PricingTable";
    if (layout === "slider") componentToImport = "PricingSlider";

    const importStatement = `import { ${componentToImport}${isTs && layout === "cards" ? ", PricingData" : ""}${isTs && layout === "table" ? ", PricingTableData" : ""} } from "@/components/custom/blocks/Pricing";`;

    if (layout === "builder" || layout === "slider") {
      return `${importStatement}

export default function PricingDemo()${typeDef} {
  return (
    <div className="w-full py-12">
      <${componentToImport} color="${color}" />
    </div>
  );
}`;
    }

    if (layout === "table") {
      return `${importStatement}

export default function PricingDemo()${typeDef} {
  const data${isTs ? ": PricingTableData" : ""} = {
    plans: [
      { id: "basic", title: "Basic", price: "$19", buttonText: "Get Started" },
      { id: "pro", title: "Pro", price: "$49", buttonText: "Upgrade", featured: true },
    ],
    sections: [
      {
        title: "Core Features",
        features: [
          { name: "Projects", values: ["5", "Unlimited"] },
          { name: "Support", values: [false, true] },
        ],
      }
    ],
  };

  return (
    <div className="w-full py-12">
      <PricingTable data={data} color="${color}" />
    </div>
  );
}`;
    }

    return `${importStatement}

export default function PricingDemo()${typeDef} {
  const data${isTs ? ": PricingData" : ""} = {
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
            features: ["10 projects", "Up to 2,000 subscribers"],
          }
        ],
      }
    ],
  };

  return (
    <div className="w-full py-12">
      <PricingCards data={data} variant="${variant}" color="${color}" />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        {/* Component Type & Color */}
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

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="Pricing"
        tsCode={PRICING_ENGINE_CODE_TS}
        jsCode={PRICING_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full py-12 md:py-24 bg-zinc-50/50 dark:bg-transparent transition-colors duration-300">
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
        </div>
      </ComponentPreview>
    </div>
  );
}
