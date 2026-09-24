"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useState } from "react";

export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

// Ensure this export keyword is here!
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange,
      ...props
    },
    ref,
  ) => {
    // Manage state internally if not controlled by the parent
    const isControlled = controlledPressed !== undefined;
    const [uncontrolledPressed, setUncontrolledPressed] =
      useState(defaultPressed);
    const isPressed = isControlled ? controlledPressed : uncontrolledPressed;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newState = !isPressed;
      if (!isControlled) {
        setUncontrolledPressed(newState);
      }
      onPressedChange?.(newState);
      props.onClick?.(e);
    };

    const variants = {
      default:
        "bg-transparent hover:bg-muted text-foreground/80 data-[state=on]:bg-foreground/10 data-[state=on]:text-foreground",
      outline:
        "border border-border bg-transparent hover:bg-muted text-foreground/80 data-[state=on]:bg-muted data-[state=on]:text-foreground",
      ghost:
        "bg-transparent hover:bg-muted/50 text-foreground/80 data-[state=on]:bg-muted/50 data-[state=on]:text-foreground",
    };

    const sizes = {
      sm: "h-8 px-2.5 text-xs",
      md: "h-9 px-3 text-sm",
      lg: "h-10 px-4 text-sm",
    };

    return (
      <button
        type="button"
        ref={ref}
        aria-pressed={isPressed}
        data-state={isPressed ? "on" : "off"}
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Toggle.displayName = "Toggle";
