"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Compass,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";

type Side = "top" | "right" | "bottom" | "left";

const ITEMS = [
  {
    side: "bottom" as Side,
    label: "Bottom",
    buttonIcon: ArrowDown,
    tooltipIcon: Zap,
    title: "Bottom Tooltip",
    description: "Renders cleanly below without clipping.",
    mobileClass: "self-center sm:self-auto order-1 sm:order-3",
  },
  {
    side: "right" as Side,
    label: "Right",
    buttonIcon: ArrowRight,
    tooltipIcon: Layers,
    title: "Right Tooltip",
    description: "Anchored smoothly to the right edge.",
    mobileClass: "self-start sm:self-auto order-2 sm:order-4",
  },
  {
    side: "top" as Side,
    label: "Top",
    buttonIcon: ArrowUp,
    tooltipIcon: Sparkles,
    title: "Top Tooltip",
    description: "Positioned dynamically above the trigger.",
    mobileClass: "self-center sm:self-auto order-3 sm:order-2",
  },
  {
    side: "left" as Side,
    label: "Left",
    buttonIcon: ArrowLeft,
    tooltipIcon: Compass,
    title: "Left Tooltip",
    description: "Attached to the left side with portal layout.",
    mobileClass: "self-end sm:self-auto order-4 sm:order-1",
  },
];

export default function TooltipDemo({
  delay = 150,
  example = "no-arrow",
}: {
  delay?: number;
  /**
   * 5 core variants:
   * 1. "no-arrow" (default) -> 4 directions without arrow
   * 2. "arrow" -> 4 directions with pointer arrow
   * 3. "animated" -> 4 directions with pointer arrow + smooth pull-out animation
   * 4. "staggered" -> 4 directions with pointer arrow + smooth pull-out + staggered cascade (icon -> title -> description)
   * 5. "expand" -> 4 directions with pointer arrow + starts title-only, then height expands (top/bottom) and width expands (left/right) to unveil description
   */
  example?: "no-arrow" | "arrow" | "animated" | "staggered" | "expand" | "animated-staggered" | "all" | string;
}) {
  const isExpand = example === "expand";
  const isStaggered = !isExpand && (example === "staggered" || example === "animated-staggered");
  const isAnimated = example === "animated" || isStaggered || isExpand;
  const hasArrow = example === "arrow" || isAnimated;

  return (
    <div className="w-full flex items-center justify-center min-h-[420px] p-6 relative z-10">
      <TooltipProvider>
        <div className="w-full max-w-xs sm:max-w-none flex flex-col sm:flex-row sm:items-center sm:justify-center gap-7 sm:gap-6">
          {ITEMS.map((item) => {
            const ButtonIcon = item.buttonIcon;
            const TooltipIcon = item.tooltipIcon;

            return (
              <div key={item.side} className={item.mobileClass}>
                <Tooltip delayDuration={delay}>
                  <TooltipTrigger>
                    <button className="group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-medium text-foreground transition-colors cursor-pointer shadow-2xs">
                      <ButtonIcon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span>{item.label}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side={item.side}
                    showArrow={hasArrow}
                    animated={isAnimated}
                    staggered={isStaggered}
                    expand={isExpand}
                    sideOffset={hasArrow ? 8 : 6}
                    icon={<TooltipIcon className="w-4 h-4" />}
                    title={item.title}
                    description={item.description}
                  />
                </Tooltip>
              </div>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
}
