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

    // The pressed state wears the theme colour softly: a low-opacity primary
    // wash, with the icon/label in an ink of the same hue. Raw --primary as
    // ink is too light on some presets (lavender on white is under 3:1), so
    // it's re-derived at a fixed OKLCH lightness — deep in light mode, pale in
    // dark — and follows whatever primary the theme sets.
    const onInk =
      "data-[state=on]:text-[oklch(from_var(--primary)_0.45_calc(c*0.9)_h)] dark:data-[state=on]:text-[oklch(from_var(--primary)_0.86_calc(c*0.7)_h)]";
    const offHover = "data-[state=off]:hover:text-foreground";

    const variants = {
      default: cn(
        "bg-transparent text-foreground/80 hover:bg-primary/[0.07] data-[state=on]:bg-primary/[0.13] data-[state=on]:hover:bg-primary/[0.18]",
        offHover,
        onInk,
      ),
      outline: cn(
        "border border-border bg-transparent text-foreground/80 hover:bg-primary/[0.06] data-[state=on]:border-primary/35 data-[state=on]:bg-primary/[0.1] data-[state=on]:hover:bg-primary/[0.15]",
        offHover,
        onInk,
      ),
      ghost: cn(
        "bg-transparent text-foreground/80 hover:bg-primary/[0.05] data-[state=on]:bg-primary/[0.08] data-[state=on]:hover:bg-primary/[0.12]",
        offHover,
        onInk,
      ),
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
          "inline-flex items-center justify-center rounded-md font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-primary/35 disabled:pointer-events-none disabled:opacity-50",
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
