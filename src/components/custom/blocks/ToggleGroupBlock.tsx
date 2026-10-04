"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
/**
 * `segmented` is a pill track whose highlight slides to the pressed item —
 * a view switch (Day / Week / Month). In a single group the pressed item
 * stays pressed when clicked again, and the arrow keys move the choice.
 */
export type ToggleGroupVariant = "default" | "outline" | "ghost" | "segmented";
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
  /** Segmented only: the sliding highlight has been placed, so items drop their own. */
  pillReady: boolean;
}

// The segmented track. Inside a `soft` table it takes the table's own well
// (`--tbl-well`), so the tabs and the search field share one tint.
const SEGMENTED_TRACK =
  "bg-[var(--tbl-well,color-mix(in_oklab,var(--primary)_5%,color-mix(in_oklab,var(--foreground)_5%,var(--card))))]";
const SEGMENTED_PILL = "bg-card shadow-sm ring-1 ring-foreground/[0.08]";

const segmentedHeights: Record<ToggleGroupSize, string> = {
  sm: "h-9",
  md: "h-10",
  lg: "h-12",
};

// Layout effects warn during server rendering on older React; the pill is
// only ever measured in the browser anyway.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
      onKeyDown,
      style: styleProp,
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

    const groupRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => groupRef.current as HTMLDivElement);

    // One highlight that slides between items, for a single segmented group.
    // It is measured from the pressed item, so labels of any width work.
    const sliding = variant === "segmented" && type === "single";
    const pillRef = useRef<HTMLSpanElement>(null);
    const placedRef = useRef(false);
    const [pillReady, setPillReady] = useState(false);
    const valueKey = Array.isArray(currentValue)
      ? currentValue.join("|")
      : currentValue;

    useIsomorphicLayoutEffect(() => {
      const group = groupRef.current;
      const pill = pillRef.current;
      if (!sliding || !group || !pill) return;

      const place = () => {
        const active = group.querySelector<HTMLElement>(
          '[data-toggle-item][data-state="on"]',
        );
        if (!active) {
          pill.style.opacity = "0";
          return;
        }
        const g = group.getBoundingClientRect();
        const a = active.getBoundingClientRect();
        // The first placement jumps; every later one slides.
        if (!placedRef.current) pill.style.transition = "none";
        pill.style.width = `${a.width}px`;
        pill.style.height = `${a.height}px`;
        pill.style.transform = `translate(${a.left - g.left - group.clientLeft + group.scrollLeft}px, ${a.top - g.top - group.clientTop}px)`;
        pill.style.opacity = "1";
        if (!placedRef.current) {
          void pill.offsetWidth;
          pill.style.transition = "";
          placedRef.current = true;
          setPillReady(true);
        }
      };

      place();
      const observer = new ResizeObserver(place);
      observer.observe(group);
      group
        .querySelectorAll<HTMLElement>("[data-toggle-item]")
        .forEach((item) => observer.observe(item));
      return () => observer.disconnect();
    }, [sliding, valueKey]);

    // Segmented single groups behave as a radio group: the arrow keys move
    // the choice (and focus) to the next enabled item.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || !sliding || disabled) return;
      const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
      if (!keys.includes(event.key)) return;
      const items = Array.from(
        groupRef.current?.querySelectorAll<HTMLButtonElement>(
          "[data-toggle-item]:not(:disabled)",
        ) ?? [],
      );
      if (!items.length) return;
      const from = items.findIndex((item) => item === document.activeElement);
      const last = items.length - 1;
      const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
      const next =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? last
            : forward
              ? from >= last ? 0 : from + 1
              : from <= 0 ? last : from - 1;
      const target = items[next];
      if (!target) return;
      event.preventDefault();
      target.focus();
      const nextValue = target.dataset.value;
      if (nextValue !== undefined) handleValueChange(nextValue);
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
          pillReady: sliding && pillReady,
        }}
      >
        <div
          ref={groupRef}
          role={sliding ? "radiogroup" : "group"}
          className={cn(
            "inline-flex flex-wrap items-center gap-1",
            variant === "default" &&
              "p-1 rounded-xl bg-muted border border-border/50",
            variant === "segmented" &&
              cn(
                "relative flex-nowrap gap-0 rounded-full p-1",
                SEGMENTED_TRACK,
                segmentedHeights[size],
              ),
            className,
          )}
          style={{ ...style, ...styleProp }}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {sliding && (
            <span
              ref={pillRef}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-0 top-0 rounded-full opacity-0 transition-[transform,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                SEGMENTED_PILL,
              )}
            />
          )}
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
    pillReady,
  } = context;

  const isDisabled = groupDisabled || itemDisabled;
  const segmented = variant === "segmented";
  const radio = segmented && type === "single";

  // Check if active
  const isActive =
    type === "single"
      ? groupValue === value
      : Array.isArray(groupValue) && groupValue.includes(value);

  const handleToggle = () => {
    if (isDisabled) return;

    if (type === "single") {
      // A segmented choice is a radio: pressing it again keeps it.
      if (radio) {
        if (!isActive) onValueChange(value);
        return;
      }
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

  const segmentedSizes = {
    sm: "h-full px-3 text-[13px]",
    md: "h-full px-4 text-sm",
    lg: "h-full px-5 text-base",
  };

  const getVariantStyles = () => {
    if (segmented) {
      return cn(
        "relative z-[1] whitespace-nowrap rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-primary/60 focus-visible:ring-offset-0",
        segmentedSizes[size],
        isActive && "text-foreground",
        // Until the sliding highlight is measured (and in multiple groups,
        // which have no single highlight) the pressed item paints its own.
        isActive && !pillReady && SEGMENTED_PILL,
      );
    }
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
      data-toggle-item=""
      data-state={isActive ? "on" : "off"}
      data-value={value}
      // A segmented radio group is one tab stop; the arrow keys move inside it.
      tabIndex={radio ? (isActive || groupValue === "" ? 0 : -1) : undefined}
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
