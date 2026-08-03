"use client";

import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";
import { useEffect, useState } from "react";

export default function HalfStarsDemo({
  activeVariant = "full",
  color = "primary",
  fullRating: initialFullRating = 3,
  halfRating: initialHalfRating = 3.5,
  preciseRating: initialPreciseRating = 4.2,
  customRating: initialCustomRating = 7.5,
}: {
  activeVariant?: "full" | "half" | "continuous" | "custom";
  color?: string;
  fullRating?: number;
  halfRating?: number;
  preciseRating?: number;
  customRating?: number;
}) {
  const [fullRating, setFullRating] = useState<number>(initialFullRating);
  const [halfRating, setHalfRating] = useState<number>(initialHalfRating);
  const [preciseRating, setPreciseRating] =
    useState<number>(initialPreciseRating);
  const [customRating, setCustomRating] = useState<number>(initialCustomRating);

  // Keep internal state in sync when the bridged showcase props change.
  useEffect(() => setFullRating(initialFullRating), [initialFullRating]);
  useEffect(() => setHalfRating(initialHalfRating), [initialHalfRating]);
  useEffect(
    () => setPreciseRating(initialPreciseRating),
    [initialPreciseRating],
  );
  useEffect(() => setCustomRating(initialCustomRating), [initialCustomRating]);

  const getActiveColorClass = () => {
    if (color === "primary" || color === "default" || !color)
      return "text-primary";
    if (color && color.startsWith("#")) return `text-[${color}]`;
    return `text-${color}-500`;
  };

  const renderContent = () => {
    const starActiveColor = getActiveColorClass();
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
              activeColor={starActiveColor}
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
              activeColor={starActiveColor}
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
              activeColor={starActiveColor}
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
              activeColor={color !== "primary" ? starActiveColor : "text-red-500"}
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
    <div className="flex items-center justify-center w-full min-h-[300px] p-8 md:p-12 overflow-x-hidden">
      {renderContent()}
    </div>
  );
}
