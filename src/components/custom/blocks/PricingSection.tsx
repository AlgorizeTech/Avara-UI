"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Check,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

const ICON_POOL = [Zap, TrendingUp, Sparkles, Star, Shield];
const getIcon = (index: number) => ICON_POOL[index % ICON_POOL.length];

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 text-sm text-zinc-600 dark:text-gray-300">
    <div className="mt-0.5 flex-shrink-0 rounded-full bg-zinc-200 dark:bg-white/10 p-1">
      <Check className="h-3 w-3 text-zinc-700 dark:text-white" />
    </div>
    <span className="leading-relaxed">{text}</span>
  </li>
);

const PricingSection = ({ packages }: any) => {
  const [pricingMode, setPricingMode] = useState("subscription");
  const containerRef = useRef(null);

  const visiblePlans = useMemo(() => {
    return (
      packages?.filter((plan: any) =>
        pricingMode === "subscription"
          ? plan.type === "Subscription Based"
          : plan.type === "Product Based",
      ) || []
    );
  }, [pricingMode, packages]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <section
      ref={containerRef}
      id="pricing"
      className="relative overflow-hidden bg-white dark:bg-black py-24 sm:py-32 transition-colors duration-300"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="pricing-header-el mt-2 text-4xl font-bold text-zinc-900 dark:text-white sm:text-5xl">
            Choose your plan
          </h2>
          <p className="pricing-header-el mt-6 text-lg text-zinc-600 dark:text-gray-400">
            Flexible options for businesses of all sizes.
          </p>

          <div className="pricing-header-el mt-8 flex justify-center">
            <div className="relative flex rounded-full bg-zinc-100 dark:bg-white/5 p-1 ring-1 ring-zinc-200 dark:ring-white/10">
              <button
                onClick={() => setPricingMode("subscription")}
                className={`relative z-10 rounded-full px-6 py-2 text-sm font-semibold transition ${
                  pricingMode === "subscription"
                    ? "text-black"
                    : "text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Subscriptions
              </button>
              <button
                onClick={() => setPricingMode("product")}
                className={`relative z-10 rounded-full px-6 py-2 text-sm font-semibold transition ${
                  pricingMode === "product"
                    ? "text-black"
                    : "text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Project Based
              </button>
              <div
                className={`absolute inset-y-1 w-1/2 rounded-full bg-lime-400 dark:bg-[#CCFF00] transition-transform duration-300 ${
                  pricingMode === "product"
                    ? "translate-x-full"
                    : "translate-x-0"
                }`}
              />
            </div>
          </div>
        </header>

        <div
          key={pricingMode}
          className="grid max-w-lg grid-cols-1 gap-8 mx-auto lg:max-w-none lg:grid-cols-3 text-left"
        >
          {visiblePlans.length > 0 ? (
            visiblePlans.map((plan: any, index: number) => {
              const Icon = getIcon(index);
              const price = parseFloat(plan.price);

              return (
                <div
                  key={plan.id}
                  className={`pricing-card-anim flex flex-col justify-between rounded-3xl bg-zinc-50 dark:bg-white/5 p-8 ring-1 ring-zinc-200 dark:ring-white/10 transition-all duration-300 ${
                    plan.isFeatured
                      ? "lg:z-10 lg:scale-[1.08] ring-2 ring-lime-500 dark:ring-[#CCFF00] shadow-xl shadow-lime-500/20 dark:shadow-[0_0_60px_-15px_rgba(204,255,0,0.4)] bg-gradient-to-b from-lime-100/50 to-zinc-50 dark:from-[#CCFF00]/10 dark:to-white/5"
                      : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-6 w-6 ${
                            plan.isFeatured
                              ? "text-lime-600 dark:text-[#CCFF00]"
                              : "text-zinc-400 dark:text-gray-400"
                          }`}
                        />
                        <h3
                          className={`text-lg font-semibold ${
                            plan.isFeatured
                              ? "text-lime-600 dark:text-[#CCFF00]"
                              : "text-zinc-900 dark:text-white"
                          }`}
                        >
                          {plan.name}
                        </h3>
                      </div>
                      {plan.isFeatured && (
                        <span className="rounded-full bg-lime-400 dark:bg-[#CCFF00] px-3 py-1 text-xs font-semibold text-black uppercase">
                          Popular
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-sm text-zinc-600 dark:text-gray-400 min-h-[48px]">
                      {plan.description}
                    </p>

                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                        {price === 0 ? "Free" : `$${price}`}
                      </span>
                      {price > 0 && (
                        <span className="text-sm text-zinc-500 dark:text-gray-400">
                          {pricingMode === "subscription" ? `/month` : ""}
                        </span>
                      )}
                    </div>

                    <Link
                      href="#"
                      className={`group mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-bold transition ${
                        plan.isFeatured
                          ? "bg-lime-400 dark:bg-[#CCFF00] text-black hover:bg-lime-500 dark:hover:bg-[#b3e600]"
                          : "bg-zinc-200 dark:bg-gray-300 text-zinc-900 dark:text-black hover:bg-zinc-300 dark:hover:bg-gray-400"
                      }`}
                    >
                      {price === 0
                        ? "Start Free"
                        : pricingMode === "subscription"
                          ? "Subscribe Now"
                          : "Buy Now"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <div className="mt-8 h-px w-full bg-zinc-200 dark:bg-white/10" />

                    <ul className="mt-8 space-y-3">
                      {plan.features?.map((feature: any, i: number) => (
                        <FeatureItem key={`${plan.id}-${i}`} text={feature} />
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-zinc-500 dark:text-gray-500">
              No plans available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;