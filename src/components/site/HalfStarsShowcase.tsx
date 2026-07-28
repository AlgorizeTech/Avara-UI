"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import React, { useState } from "react";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";

const HALF_STARS_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface HalfStarsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  rating: number;
  maxStars?: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  showText?: boolean;
  interactive?: boolean;
  allowHalf?: boolean; // Controls whether 0.5 increments are allowed (legacy)
  step?: number; // 0.1, 0.5, 1, etc. Overrides allowHalf.
  onRatingChange?: (rating: number) => void;
  onHoverChange?: (rating: number) => void;
}

export const HalfStars = React.forwardRef<HTMLDivElement, HalfStarsProps>(
  (
    {
      rating,
      maxStars = 5,
      size = 24,
      activeColor = "text-yellow-400",
      inactiveColor = "text-slate-200 dark:text-slate-700",
      showText = true,
      interactive = false,
      allowHalf = true,
      step,
      onRatingChange,
      onHoverChange,
      className,
      ...props
    },
    ref
  ) => {
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const displayRating = hoverRating !== null ? hoverRating : rating;
    const safeRating = Math.max(0, Math.min(displayRating, maxStars));

    const calculateRatingFromEvent = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percent = x / rect.width;
      
      const activeStep = step !== undefined ? step : (allowHalf ? 0.5 : 1);
      const fraction = Math.ceil(percent / activeStep) * activeStep;
      const safeFraction = Math.max(fraction, activeStep);
      
      return parseFloat((index + safeFraction).toFixed(2));
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      if (!interactive) return;
      
      const newHoverRating = calculateRatingFromEvent(e, index);
      
      if (hoverRating !== newHoverRating) {
        setHoverRating(newHoverRating);
        onHoverChange?.(newHoverRating);
      }
    };

    const handleMouseLeave = () => {
      if (!interactive) return;
      setHoverRating(null);
      onHoverChange?.(0);
    };

    const handleClick = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive) return;
      const newRating = calculateRatingFromEvent(e, index);
      onRatingChange?.(newRating);
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className="flex items-center gap-1">
          {Array.from({ length: maxStars }).map((_, index) => {
            const fillPercentage = Math.max(0, Math.min(1, safeRating - index));

            return (
              <div
                key={index}
                style={{ width: size, height: size }}
                className={cn("relative flex-shrink-0", interactive && "cursor-pointer hover:scale-110 transition-transform")}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onClick={(e) => handleClick(index, e)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={cn("absolute inset-0 w-full h-full transition-colors duration-200", inactiveColor)}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={cn("absolute inset-0 w-full h-full transition-all duration-200", activeColor)} style={{ clipPath: \`polygon(0 0, \${fillPercentage * 100}% 0, \${fillPercentage * 100}% 100%, 0 100%)\` }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            );
          })}
        </div>
        {showText && (
          <span className="text-xl font-bold text-slate-700 dark:text-slate-200 tabular-nums">
            <span className="inline-block w-[45px] text-center">
              {Number.isInteger(safeRating) ? safeRating : safeRating.toFixed(1)}
            </span>
            <span className="text-base text-slate-400 font-normal ml-1">
              / {maxStars}
            </span>
          </span>
        )}
      </div>
    );
  }
);

HalfStars.displayName = "HalfStars";
`;


const FULL_USAGE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState } from "react";
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";

export default function AppShowcasePage() {
  const [rating, setRating] = useState(3);

  return (
    <div className="flex justify-center p-8">
      <HalfStars 
        rating={rating} 
        interactive={true} 
        allowHalf={false} 
        onRatingChange={setRating}
        showText={false}
      />
    </div>
  );
}`;

const HALF_USAGE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState } from "react";
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";

export default function AppShowcasePage() {
  const [rating, setRating] = useState(3.5);

  return (
    <div className="flex justify-center p-8">
      <HalfStars 
        rating={rating} 
        interactive={true} 
        allowHalf={true} 
        onRatingChange={setRating} 
      />
    </div>
  );
}`;

const CONTINUOUS_USAGE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState } from "react";
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";

export default function AppShowcasePage() {
  const [rating, setRating] = useState(4.2);

  return (
    <div className="flex justify-center p-8">
      <HalfStars 
        rating={rating} 
        interactive={true} 
        step={0.1}
        onRatingChange={setRating} 
      />
    </div>
  );
}`;

const CUSTOM_USAGE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState } from "react";
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";

export default function AppShowcasePage() {
  const [rating, setRating] = useState(7.5);

  return (
    <div className="flex justify-center p-8">
      <HalfStars 
        rating={rating} 
        maxStars={10}
        activeColor="text-red-500" 
        inactiveColor="text-red-200 dark:text-red-900"
        interactive={true} 
        allowHalf={true} 
        onRatingChange={setRating} 
      />
    </div>
  );
}`;



export function HalfStarsShowcase() {
  const [activeVariant, setActiveVariant] = useState<"full" | "half" | "continuous" | "custom">("full");

  const [fullRating, setFullRating] = useState<number>(3);
  const [halfRating, setHalfRating] = useState<number>(3.5);
  const [preciseRating, setPreciseRating] = useState<number>(4.2);
  const [customRating, setCustomRating] = useState<number>(7.5);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("half-stars-change", {
          detail: { variant: activeVariant },
        })
      );
    }
  }, [activeVariant]);

  const getCurrentCode = () => {
    switch (activeVariant) {
      case "full": return FULL_USAGE_TS;
      case "half": return HALF_USAGE_TS;
      case "continuous": return CONTINUOUS_USAGE_TS;
      case "custom": return CUSTOM_USAGE_TS;
    }
  };

  const renderContent = () => {
    switch (activeVariant) {
      case "full":
        return (
          <div className="flex flex-col items-center gap-4 w-full text-center">
            <div className="flex flex-col">
              <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">Full Stars</h4>
              <span className="text-xs text-gray-900 dark:text-gray-300">Whole numbers only</span>
            </div>
            <HalfStars 
              rating={fullRating} 
              size={40} 
              interactive={true}
              allowHalf={false} 
              onRatingChange={(v) => setFullRating(v)}
              className="flex-wrap justify-center"
              showText={false}
            />
          </div>
        );
      case "half":
        return (
          <div className="flex flex-col items-center gap-4 w-full text-center">
            <div className="flex flex-col">
              <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">Half Stars</h4>
              <span className="text-xs text-gray-900 dark:text-gray-300">0.5 precision increments</span>
            </div>
            <HalfStars 
              rating={halfRating} 
              size={40} 
              interactive={true}
              allowHalf={true} 
              onRatingChange={(v) => setHalfRating(v)}
              className="flex-wrap justify-center"
            />
          </div>
        );
      case "continuous":
        return (
          <div className="flex flex-col items-center gap-4 w-full text-center">
            <div className="flex flex-col">
              <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">Continuous Fractions</h4>
              <span className="text-xs text-gray-900 dark:text-gray-300">Fine-grained 0.1 increments (2.3, 4.6, etc)</span>
            </div>
            <HalfStars 
              rating={preciseRating} 
              size={40} 
              interactive={true}
              step={0.1}
              onRatingChange={(v) => setPreciseRating(v)}
              className="flex-wrap justify-center"
            />
          </div>
        );
      case "custom":
        return (
          <div className="flex flex-col items-center gap-4 w-full text-center">
            <div className="flex flex-col">
              <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">Custom Colors</h4>
              <span className="text-xs text-gray-900 dark:text-gray-300">10 Stars with custom colors</span>
            </div>
            <HalfStars 
              rating={customRating} 
              maxStars={10}
              size={40} 
              activeColor="text-red-500" 
              inactiveColor="text-red-200 dark:text-red-900"
              interactive={true}
              allowHalf={true} 
              onRatingChange={(v) => setCustomRating(v)}
              className="flex-wrap justify-center"
            />
          </div>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* Control Panel / Tabs */}
      <ShowcaseControlPanel className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl flex-wrap">
        <VariantTabs
          label="Variant"
          variants={["full", "half", "continuous", "custom"]}
          defaultValue="full"
          onValueChange={(v) => setActiveVariant(v as any)}
        />
      </ShowcaseControlPanel>

      <ComponentPreview 
        tsCode={HALF_STARS_TS} 
        jsCode={HALF_STARS_TS}
        usageCode={getCurrentCode()}
        jsUsageCode={getCurrentCode()}
        name="HalfStars"
      >
        <div className="flex items-center justify-center w-full min-h-[300px] p-8 md:p-12 overflow-x-hidden">
          {renderContent()}
        </div>
      </ComponentPreview>
    </div>
  );
}
