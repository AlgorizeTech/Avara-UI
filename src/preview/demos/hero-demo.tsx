"use client";

import {
  Hero,
  HeroAction,
  HeroActions,
  HeroBadge,
  HeroColor,
  HeroContent,
  HeroDescription,
  HeroLayout,
  HeroPattern,
  HeroTitle,
  HeroVariant,
  HeroVisual,
} from "@/components/custom/blocks/HeroBlock";
import { ArrowRight, PlayCircle, Zap } from "lucide-react";

export default function HeroDemo({
  layout = "split-right",
  variant = "default",
  pattern = "grid",
  titleAnimation = "blur-in",
  glowAction = false,
  color = "primary",
  resetKey = 0,
}: {
  layout?: HeroLayout;
  variant?: HeroVariant;
  pattern?: HeroPattern;
  titleAnimation?: "fade-up" | "blur-in" | "glitch" | "none";
  glowAction?: boolean;
  color?: HeroColor | string;
  resetKey?: number;
}) {
  return (
    <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#050505] overflow-hidden">
      <Hero
        key={`${resetKey}-${layout}-${variant}-${pattern}`} // Force remount for animations
        layout={layout}
        variant={variant}
        pattern={pattern}
        color={color}
      >
        <HeroContent>
          <HeroBadge>
            <Zap className="w-4 h-4" />
            <span>Supercharged Components</span>
          </HeroBadge>

          <HeroTitle animation={titleAnimation}>
            Build stunning interfaces with flawless code.
          </HeroTitle>

          <HeroDescription>
            Everything you need to launch a beautiful, accessible, and fast
            web application without writing layout CSS from scratch.
          </HeroDescription>

          <HeroActions>
            <HeroAction variant={glowAction ? "glow" : "primary"}>
              Start Building
              <ArrowRight className="w-4 h-4" />
            </HeroAction>
            <HeroAction variant="outline">
              <PlayCircle className="w-4 h-4" />
              Watch Demo
            </HeroAction>
          </HeroActions>
        </HeroContent>

        <HeroVisual>
          <img
            src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop"
            alt="Abstract gradient interface"
            className="w-full h-full object-cover"
          />
          {/* Optional overlay for glass variant to ensure text readability */}
          {variant === "glass" && (
            <div className="absolute inset-0 bg-black/20 z-0" />
          )}
        </HeroVisual>
      </Hero>
    </div>
  );
}
