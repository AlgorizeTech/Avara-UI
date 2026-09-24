"use client";

import { cn } from "@/lib/utils";
import React, { createContext, forwardRef, useContext } from "react";
import { getThemeStyles } from "./toggle-group-theme";

// ==========================================
// THEME & CONFIGURATION
// ==========================================
export type ToggleGroupColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});
export type ToggleGroupVariant = "default" | "outline" | "ghost";
export type ToggleGroupSize = "sm" | "md" | "lg";
export type ToggleGroupType = "single" | "multiple";

// ==========================================
// CONTEXT
// ==========================================
interface ToggleGroupContextProps {
  type: ToggleGroupType;
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  variant: ToggleGroupVariant;
  color: ToggleGroupColor;
  size: ToggleGroupSize;
  disabled: boolean;
  theme: Record<string, string>;
}

const ToggleGroupContext = createContext<ToggleGroupContextProps | null>(null);

function useToggleGroup() {
  const context = useContext(ToggleGroupContext);
  if (!context) {
    throw new Error("ToggleGroupItem must be used within a ToggleGroup");
  }
  return context;
}

// ==========================================
// GROUP COMPONENT
// ==========================================
/** Everything both selection modes share. */
interface ToggleGroupBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  variant?: ToggleGroupVariant;
  color?: ToggleGroupColor;
  size?: ToggleGroupSize;
  disabled?: boolean;
}

/** The default: one item pressed at a time, so the value is a string. */
export interface ToggleGroupSingleProps extends ToggleGroupBaseProps {
  type?: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/** `type="multiple"` — value and callback both deal in arrays. */
export interface ToggleGroupMultipleProps extends ToggleGroupBaseProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

/**
 * Discriminated on `type`, so a single group hands your callback a `string`
 * and a multiple group hands it a `string[]`, with no cast either way.
 */
export type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

/** The two modes collapsed, which is what the implementation works with. */
type ToggleGroupImplProps = ToggleGroupBaseProps & {
  type?: ToggleGroupType;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
};

const ToggleGroupImpl = forwardRef<HTMLDivElement, ToggleGroupImplProps>(
  (
    {
      type = "single",
      value: controlledValue,
      defaultValue,
      onValueChange,
      variant = "default",
      color = "primary",
      size = "md",
      disabled = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { theme, style } = getThemeStyles(color as string);
    const [uncontrolledValue, setUncontrolledValue] = React.useState<
      string | string[]
    >(defaultValue !== undefined ? defaultValue : type === "single" ? "" : []);

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = (newValue: string | string[]) => {
      if (!isControlled) setUncontrolledValue(newValue);
      if (onValueChange) onValueChange(newValue);
    };

    return (
      <ToggleGroupContext.Provider
        value={{
          type,
          value: currentValue,
          onValueChange: handleValueChange,
          variant,
          color,
          size,
          disabled,
          theme,
        }}
      >
        <div
          ref={ref}
          role="group"
          className={cn(
            "inline-flex flex-wrap items-center gap-1",
            variant === "default" &&
              "p-1 rounded-xl bg-muted border border-border/50",
            className,
          )}
          style={style}
          {...props}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  },
);
ToggleGroupImpl.displayName = "ToggleGroup";

/**
 * The implementation is written against the collapsed props; this cast is
 * what hands callers the discriminated pair instead.
 */
export const ToggleGroup = ToggleGroupImpl as React.ForwardRefExoticComponent<
  ToggleGroupProps & React.RefAttributes<HTMLDivElement>
>;

// ==========================================
// ITEM COMPONENT
// ==========================================
export interface ToggleGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const ToggleGroupItem = forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ value, disabled: itemDisabled, className, children, ...props }, ref) => {
  const context = useToggleGroup();
  const {
    type,
    value: groupValue,
    onValueChange,
    variant,
    size,
    disabled: groupDisabled,
    theme,
  } = context;

  const isDisabled = groupDisabled || itemDisabled;

  // Check if active
  const isActive =
    type === "single"
      ? groupValue === value
      : Array.isArray(groupValue) && groupValue.includes(value);

  const handleToggle = () => {
    if (isDisabled) return;

    if (type === "single") {
      onValueChange(isActive ? "" : value);
    } else {
      const currentArray = Array.isArray(groupValue) ? groupValue : [];
      if (isActive) {
        onValueChange(currentArray.filter((v) => v !== value));
      } else {
        onValueChange([...currentArray, value]);
      }
    }
  };

  const sizeStyles = {
    sm: "h-8 px-2.5 text-xs",
    md: "h-10 px-3.5 text-sm",
    lg: "h-12 px-5 text-base",
  };

  const getVariantStyles = () => {
    if (isActive) {
      switch (variant) {
        case "outline":
          return cn(theme.border, "shadow-sm");
        case "ghost":
          return cn(theme.text, "bg-muted");
        case "default":
        default:
          return cn(theme.bg, "shadow-md");
      }
    }

    // Inactive states
    switch (variant) {
      case "outline":
        return "border border-border bg-transparent text-muted-foreground hover:bg-muted";
      case "ghost":
        return "bg-transparent text-muted-foreground hover:bg-muted";
      case "default":
      default:
        return "bg-transparent text-muted-foreground hover:bg-muted/50";
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      role={type === "single" ? "radio" : "checkbox"}
      aria-checked={isActive}
      disabled={isDisabled}
      onClick={handleToggle}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        sizeStyles[size],
        getVariantStyles(),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";
