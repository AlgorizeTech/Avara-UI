"use client";

import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const AnimatedPrice = ({ value }: any) => {
  const cleanValue = value.toString().replace(/\.00$/, "");
  const numericValue = parseFloat(cleanValue.replace(/[^0-9.]/g, ""));
  const [displayValue, setDisplayValue] = useState(numericValue || 0);

  useEffect(() => {
    if (isNaN(numericValue)) return;

    let startTime: any;
    const duration = 600;
    const startValue = displayValue;

    const animate = (time: any) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 5);

      setDisplayValue(startValue + (numericValue - startValue) * easeProgress);

      if (progress < 1) requestAnimationFrame(animate);
      else setDisplayValue(numericValue);
    };

    requestAnimationFrame(animate);
  }, [numericValue, displayValue]);

  if (isNaN(numericValue)) return <span>{cleanValue}</span>;

  const isDecimal = cleanValue.includes(".");
  const formatted = isDecimal ? displayValue.toFixed(2) : Math.round(displayValue).toLocaleString();

  return <span>{formatted}</span>;
};

export default function PricingSectionV4({ packages }: any) {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isMounted, setIsMounted] = useState(false);
  const [activePlanId, setActivePlanId] = useState<any>(null);

  let monthlyPlans: any[] = [];
  let yearlyPlans: any[] = [];

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

  const handleToggleCycle = (cycle: string) => {
    setBillingCycle(cycle);
    const newPlans = cycle === "monthly" ? monthlyPlans : yearlyPlans;
    if (newPlans.length > 0) {
      const newFeatured = newPlans.find((p) => p.isFeatured) || newPlans[0];
      setActivePlanId(newFeatured.id);
    }
  };

  if (!isMounted || !packages) {
    return (
      <section id="pricing" className="py-32 bg-white dark:bg-black flex justify-center items-center min-h-[500px] transition-colors duration-300">
        <div className="w-8 h-8 border-4 border-lime-500 dark:border-[#CCFF00] border-t-transparent dark:border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (!activePlans.length) {
    return (
      <section id="pricing" className="py-32 bg-white dark:bg-black text-center text-zinc-500 text-sm font-mono transition-colors duration-300">
        No pricing plans available.
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 md:py-32 bg-white dark:bg-black text-zinc-900 dark:text-white font-sans antialiased overflow-hidden selection:bg-lime-400 dark:selection:bg-[#CCFF00] selection:text-black transition-colors duration-300 relative">
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

      <div className="max-w-[1300px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 lg:mb-20">
          <div className="max-w-xl">
            <h2 className="text-xs font-mono text-lime-600 dark:text-[#CCFF00] mb-4">
              <span className="flex items-center gap-3 justify-center md:justify-start">
                <span className="w-2 h-2 rounded-full bg-lime-500 dark:bg-[#CCFF00] animate-pulse mb-6" />
              </span>
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-5 text-zinc-900 dark:text-white">
              Pricing Model.
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
              Transparent, value-driven pricing designed for high-growth brands. Select a tier to explore what&apos;s included.
            </p>
          </div>

          {hasYearlyPlans && (
            <div className="flex gap-6 shrink-0">
              {["monthly", "yearly"].map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => handleToggleCycle(cycle)}
                  className={`text-sm font-bold uppercase tracking-widest pb-1 border-b-2 transition-all duration-300 ${
                    billingCycle === cycle
                      ? "text-lime-600 border-lime-600 dark:text-[#CCFF00] dark:border-[#CCFF00]"
                      : "text-zinc-400 border-transparent hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white"
                  }`}
                >
                  {cycle}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden lg:flex w-full border-t border-zinc-200 dark:border-white/10 min-h-[550px] transition-colors duration-300">
          <div className="w-[45%] border-r border-zinc-200 dark:border-white/10 py-12 pr-8 flex flex-col justify-center gap-6 transition-colors duration-300">
            {activePlans.map((plan) => {
              const isActive = activePlanId === plan.id;
              return (
                <button
                  key={plan.id}
                  onMouseEnter={() => setActivePlanId(plan.id)}
                  onClick={() => setActivePlanId(plan.id)}
                  className="group flex flex-col items-start text-left w-full py-4 pr-4"
                >
                  {plan.isFeatured && (
                    <span className={`text-[10px] font-mono tracking-widest uppercase mb-2 transition-colors duration-300 ${isActive ? "text-lime-600 dark:text-[#CCFF00]" : "text-zinc-400 dark:text-zinc-500 group-hover:text-lime-600 dark:group-hover:text-[#CCFF00]"}`}>
                      [ Most Popular ]
                    </span>
                  )}
                  <span className={`text-4xl lg:text-5xl xl:text-[4rem] font-black uppercase tracking-tighter leading-[0.85] break-words whitespace-normal inline-block transition-all duration-500 ease-out ${isActive ? "text-lime-500 dark:text-[#CCFF00] translate-x-4" : "outline-text group-hover:translate-x-2"}`}>
                    {plan.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-[55%] py-12 pl-12 xl:pl-16 relative overflow-hidden flex flex-col">
            {activePlan && (
              <div key={activePlan.id} className="animate-in fade-in slide-in-from-right-8 duration-700 fill-mode-both flex flex-col h-full z-10 relative">
                {activePlan.isFeatured && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-lime-500/10 dark:bg-[#CCFF00]/5 blur-[100px] rounded-full pointer-events-none" />
                )}

                <div className="absolute -right-4 -top-8 text-[150px] xl:text-[200px] font-black text-black/[0.03] dark:text-white/[0.02] pointer-events-none select-none tracking-tighter leading-none transition-colors duration-300">
                  ${activePlan.price}
                </div>

                <div className="mb-12 relative z-10">
                  {activePlan.isFeatured && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-lime-100 border border-lime-200 text-lime-700 dark:bg-[#CCFF00]/10 dark:border-[#CCFF00]/20 dark:text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest ml-35 mb-4 rounded-full">
                      <Star className="w-3 h-3 fill-lime-600 dark:fill-[#CCFF00]" /> Recommended
                    </div>
                  )}

                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-bold text-zinc-400 dark:text-zinc-600 mb-2">$</span>
                    <span className="text-[70px] xl:text-[90px] leading-none font-black tracking-tighter text-zinc-900 dark:text-white">
                      <AnimatedPrice value={activePlan.price} />
                    </span>
                  </div>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
                    {activePlan.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-10 gap-y-5 mb-14 relative z-10">
                  {activePlan.features.map((feature: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 border-b border-zinc-200 dark:border-white/5 pb-3 group/feat transition-colors duration-300">
                      <div className="w-1.5 h-1.5 bg-zinc-300 dark:bg-white/20 group-hover/feat:bg-lime-500 dark:group-hover/feat:bg-[#CCFF00] rounded-full transition-colors shrink-0" />
                      <span className="text-sm lg:text-base text-zinc-600 dark:text-zinc-300 group-hover/feat:text-zinc-900 dark:group-hover/feat:text-white transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="#"
                  className={`group mt-auto w-max py-4 px-8 rounded-full text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 relative overflow-hidden ${activePlan.isFeatured ? "bg-lime-400 text-black dark:bg-[#CCFF00]" : "bg-zinc-100 text-zinc-900 dark:bg-white dark:text-black"}`}
                >
                  <div className={`absolute inset-0 translate-y-[100%] rounded-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${activePlan.isFeatured ? "bg-white" : "bg-lime-500 dark:bg-[#CCFF00]"}`} />
                  <span className="relative z-10 transition-colors duration-500">Initiate Project</span>
                  <div className="relative z-10 w-4 h-4 overflow-hidden flex items-center">
                    <ArrowRight className="absolute w-4 h-4 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                    <ArrowRight className="absolute w-4 h-4 translate-x-0 group-hover:translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE ACCORDION */}
        <div className="flex flex-col lg:hidden border-t border-zinc-200 dark:border-white/10 transition-colors duration-300">
          {activePlans.map((plan) => {
            const isActive = activePlanId === plan.id;
            return (
              <div key={plan.id} className="border-b border-zinc-200 dark:border-white/10 transition-colors duration-300">
                <button onClick={() => setActivePlanId(isActive ? null : plan.id)} className="w-full py-6 md:py-8 flex justify-between items-center text-left">
                  <div className="flex flex-col pr-4">
                    {plan.isFeatured && (
                      <span className={`text-[9px] font-mono tracking-widest uppercase mb-1 transition-colors duration-300 ${isActive ? "text-lime-600 dark:text-[#CCFF00]" : "text-zinc-500"}`}>
                        [ Most Popular ]
                      </span>
                    )}
                    <span className={`text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9] break-words whitespace-normal transition-colors duration-300 ${isActive ? "text-lime-500 dark:text-[#CCFF00]" : "outline-text"}`}>
                      {plan.name}
                    </span>
                  </div>
                  <div className={`transition-transform duration-500 shrink-0 ${isActive ? "rotate-90 text-lime-500 dark:text-[#CCFF00]" : "text-zinc-300 dark:text-white/30"}`}>
                    <ArrowRight size={24} strokeWidth={2} />
                  </div>
                </button>

                <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="pb-8 pt-2 flex flex-col relative">
                      {plan.isFeatured && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] bg-lime-500/10 dark:bg-[#CCFF00]/5 blur-[80px] rounded-full pointer-events-none" />}
                      <div className="flex items-end gap-1.5 mb-3 relative z-10">
                        <span className="text-xl font-bold text-zinc-400 dark:text-zinc-600 mb-1.5">$</span>
                        <span className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white">
                          <AnimatedPrice value={plan.price} />
                        </span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-8 relative z-10">{plan.description}</p>
                      <div className="flex flex-col gap-3 mb-8 relative z-10">
                        {plan.features.map((feature: any, i: number) => (
                          <div key={i} className="flex items-start gap-3 border-b border-zinc-200 dark:border-white/5 pb-3">
                            <div className="w-1.5 h-1.5 bg-lime-500 dark:bg-[#CCFF00] rounded-full mt-1.5 shrink-0" />
                            <span className="text-sm md:text-base text-zinc-700 dark:text-zinc-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="#" className={`group w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 relative overflow-hidden z-10 ${plan.isFeatured ? "bg-lime-400 text-black dark:bg-[#CCFF00]" : "bg-zinc-100 text-zinc-900 dark:bg-white dark:text-black"}`}>
                        <div className={`absolute inset-0 translate-y-[100%] rounded-xl group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${plan.isFeatured ? "bg-white" : "bg-lime-500 dark:bg-[#CCFF00]"}`} />
                        <span className="relative z-10 transition-colors duration-500">Initiate Project</span>
                        <div className="relative z-10 w-4 h-4 overflow-hidden flex items-center">
                          <ArrowRight className="absolute w-4 h-4 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                          <ArrowRight className="absolute w-4 h-4 translate-x-0 group-hover:translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                        </div>
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