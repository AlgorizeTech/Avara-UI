"use client";

import React, { useState, useRef } from "react";
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
      activeColor = "text-primary",
      inactiveColor = "text-slate-200 dark:text-slate-700",
      showText = true, // Default to true as per user request
      interactive = false,
      allowHalf = true, // Default to allowing half stars
      step,
      onRatingChange,
      onHoverChange,
      className,
      ...props
    },
    ref
  ) => {
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    // Use hoverRating if interacting, otherwise use the passed rating
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
      onHoverChange?.(0); // Optional: signal hover ended
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
            const fillPercentage = Math.max(
              0,
              Math.min(1, safeRating - index)
            );

            return (
              <div
                key={index}
                style={{ width: size, height: size }}
                className={cn(
                  "relative flex-shrink-0",
                  interactive && "cursor-pointer transition-transform hover:scale-110"
                )}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onClick={(e) => handleClick(index, e)}
              >
                {/* Inactive Background Star */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                  className={cn("absolute inset-0 w-full h-full transition-colors duration-200", inactiveColor)}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>

                {/* Active Foreground Star (Clipped) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                  className={cn("absolute inset-0 w-full h-full transition-all duration-200", activeColor)}
                  style={{
                    clipPath: `polygon(0 0, ${fillPercentage * 100}% 0, ${fillPercentage * 100}% 100%, 0 100%)`,
                  }}
                >
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
