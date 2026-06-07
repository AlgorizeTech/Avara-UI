"use client";

import {
  Hero,
  HeroAction,
  HeroActions,
  HeroContent,
  HeroDescription,
  HeroTitle,
} from "@/components/custom/blocks/HeroBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ArrowRight, Check } from "lucide-react";

const USAGE_CODE = `import { Hero, HeroContent, HeroTitle, HeroDescription, HeroActions, HeroAction } from "@/components/custom/blocks/HeroBlock";
import { Check, ArrowRight } from "lucide-react";

export default function HeroMinimal() {
  return (
    <Hero layout="center" color="zinc">
      <HeroContent>
        <HeroTitle className="text-5xl md:text-7xl font-black">
          Simple. Clean.<br />
          <span className="text-zinc-400 dark:text-zinc-500">Effective.</span>
        </HeroTitle>
        
        <HeroDescription className="max-w-xl mx-auto mt-6">
          The minimalist approach to building great products. Focus on what matters most with our clean, distraction-free platform.
        </HeroDescription>

        <div className="flex flex-wrap justify-center gap-6 mt-6 mb-8">
          <span className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Check className="w-4 h-4 mr-2 text-zinc-900 dark:text-white" /> No credit card required
          </span>
          <span className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Check className="w-4 h-4 mr-2 text-zinc-900 dark:text-white" /> Free 14-day trial
          </span>
          <span className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Check className="w-4 h-4 mr-2 text-zinc-900 dark:text-white" /> Cancel anytime
          </span>
        </div>

        <HeroActions>
          <HeroAction variant="secondary">
            Get Started Free <ArrowRight className="w-4 h-4 ml-2 -mr-1" />
          </HeroAction>
          <HeroAction variant="outline">View Demo</HeroAction>
        </HeroActions>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 mt-12 border-t border-zinc-200 dark:border-zinc-800 w-full max-w-3xl mx-auto">
          <div className="text-center">
            <h4 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">10K+</h4>
            <p className="text-sm font-medium text-zinc-500">Active Users</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">99.9%</h4>
            <p className="text-sm font-medium text-zinc-500">Uptime</p>
          </div>
          <div className="text-center">
            <h4 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">24/7</h4>
            <p className="text-sm font-medium text-zinc-500">Support</p>
          </div>
        </div>
      </HeroContent>
    </Hero>
  );
}`;

export function HeroMinimalShowcase() {
  return (
    <ComponentPreview
      name="HeroMinimalShowcase"
      usageCode={USAGE_CODE}
      tsCode={USAGE_CODE}
    >
      <div className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-[#09090b]">
        <Hero layout="center" color="zinc">
          <HeroContent>
            <HeroTitle className="text-5xl md:text-7xl font-black">
              Simple. Clean.
              <br />
              <span className="text-zinc-400 dark:text-zinc-500">
                Effective.
              </span>
            </HeroTitle>

            <HeroDescription className="max-w-xl mx-auto mt-6">
              The minimalist approach to building great products. Focus on what
              matters most with our clean, distraction-free platform.
            </HeroDescription>

            <div className="flex flex-wrap justify-center gap-6 mt-6 mb-8">
              <span className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
                <Check className="w-4 h-4 mr-2 text-zinc-900 dark:text-white" />{" "}
                No credit card required
              </span>
              <span className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
                <Check className="w-4 h-4 mr-2 text-zinc-900 dark:text-white" />{" "}
                Free 14-day trial
              </span>
              <span className="flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
                <Check className="w-4 h-4 mr-2 text-zinc-900 dark:text-white" />{" "}
                Cancel anytime
              </span>
            </div>

            <HeroActions>
              <HeroAction variant="secondary">
                Get Started Free <ArrowRight className="w-4 h-4 ml-2 -mr-1" />
              </HeroAction>
              <HeroAction variant="outline">View Demo</HeroAction>
            </HeroActions>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 mt-12 border-t border-zinc-200 dark:border-zinc-800 w-full max-w-3xl mx-auto">
              <div className="text-center">
                <h4 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
                  10K+
                </h4>
                <p className="text-sm font-medium text-zinc-500">
                  Active Users
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
                  99.9%
                </h4>
                <p className="text-sm font-medium text-zinc-500">Uptime</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
                  24/7
                </h4>
                <p className="text-sm font-medium text-zinc-500">Support</p>
              </div>
            </div>
          </HeroContent>
        </Hero>
      </div>
    </ComponentPreview>
  );
}
