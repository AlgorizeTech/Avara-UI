"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size = "sm", ...props }, ref) => {
    const sizeStyles = {
      sm: "h-5 px-1.5 text-[10px]",
      md: "h-6 px-2 text-xs",
      lg: "h-8 px-3 text-sm",
    };

    return (
      <kbd
        ref={ref}
        className={cn(
          "pointer-events-none inline-flex select-none items-center gap-1 rounded border font-mono font-medium",
          // Theme-token surface (both modes)
          "border-border bg-muted text-muted-foreground shadow-[0_1px_0_rgba(0,0,0,0.05)]",
          // Dark mode edge highlight
          "dark:shadow-[0_1px_0_rgba(255,255,255,0.05)]",
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Kbd.displayName = "Kbd";
