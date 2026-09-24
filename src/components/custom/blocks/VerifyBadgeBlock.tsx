"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface VerifyBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
}

export const VerifyBadge = React.forwardRef<HTMLDivElement, VerifyBadgeProps>(
  (
    { color = "var(--primary)", size = "md", animate = false, className, ...props },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
    };

    const iconSizeClasses = {
      sm: "w-2.5 h-2.5",
      md: "w-3 h-3",
      lg: "w-3.5 h-3.5",
      xl: "w-4 h-4",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center flex-shrink-0 group",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {/* Animated Shine/Ping effect */}
        {animate && (
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity"
            style={{ backgroundColor: color }}
          />
        )}
        
        {/* Badge SVG shape (Twitter-like decagon/star) */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute inset-0 w-full h-full"
          style={{
            color: color,
            filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.1))",
          }}
        >
          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.92-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.92 1.79-3.92 4 0 .495.084.965.238 1.4-1.274.65-2.148 2.02-2.148 3.6 0 1.46.74 2.76 1.87 3.45-.094.347-.144.712-.144 1.09 0 2.21 1.71 4 3.92 4 .55 0 1.07-.12 1.54-.33.64 1.25 1.93 2.13 3.44 2.13 1.51 0 2.8-.88 3.44-2.13.47.21 1 .33 1.55.33 2.21 0 3.92-1.79 3.92-4 0-.378-.05-.743-.144-1.09 1.13-.69 1.87-1.99 1.87-3.45z" />
        </svg>

        {/* Checkmark inside */}
        <Check
          className={cn(
            "relative z-10 stroke-[4] text-primary-foreground",
            iconSizeClasses[size]
          )}
        />
      </div>
    );
  }
);

VerifyBadge.displayName = "VerifyBadge";
