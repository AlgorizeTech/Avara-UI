"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, Check, ChevronDown, Search, X } from "lucide-react";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { getThemeStyles } from "./select-theme";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type SelectColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type SelectVariant = "default" | "filled" | "underlined" | "glow" | "glass";
export type SelectSize = "sm" | "md" | "lg";

// ==========================================
// SELECT COMPONENT
// ==========================================
export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ElementType;
  group?: string; // Added for nested/grouped options
}

// Walks up the tree to the first ancestor that clips its overflow (a modal
// shell, a scroll pane, a card with overflow-hidden). That element — not the
// viewport — is what actually crops the dropdown, so it defines the space the
// menu has to work with. Returns null when nothing clips, meaning the viewport
// is the only bound.
const getClippingRect = (el: HTMLElement): DOMRect | null => {
  let node = el.parentElement;
  while (node && node !== document.body) {
    const { overflow, overflowX, overflowY } = window.getComputedStyle(node);
    if (/(auto|scroll|hidden|clip)/.test(overflow + overflowX + overflowY)) {
      return node.getBoundingClientRect();
    }
    node = node.parentElement;
  }
  return null;
};

/** Everything the two selection modes share. */
interface SelectBlockBaseProps {
  options: SelectOption[];
  placeholder?: string;
  variant?: SelectVariant;
  color?: SelectColor;
  inputSize?: SelectSize;
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  /** Adds a filter box above the options. */
  searchable?: boolean;
}

/** The default: one option at a time, so the value is a plain string. */
export interface SelectBlockSingleProps extends SelectBlockBaseProps {
  multiple?: false;
  value?: string;
  onChange?: (value: string) => void;
}

/** `multiple` — value and callback both deal in arrays. */
export interface SelectBlockMultipleProps extends SelectBlockBaseProps {
  multiple: true;
  value?: string[];
  onChange?: (value: string[]) => void;
}

/**
 * Discriminated on `multiple`, so a single select hands your callback a
 * `string` and a multi select hands it a `string[]` — neither needs a cast,
 * and passing a `setState` straight in just works.
 */
export type SelectBlockProps = SelectBlockSingleProps | SelectBlockMultipleProps;

/** The two modes collapsed, which is what the implementation works with. */
type SelectBlockImplProps = SelectBlockBaseProps & {
  multiple?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
};

const SelectBlockImpl = forwardRef<HTMLDivElement, SelectBlockImplProps>(
  (
    {
      options = [],
      value,
      onChange,
      placeholder = "Select an option",
      variant = "default",
      color = "primary",
      inputSize = "md",
      label,
      helperText,
      error,
      icon,
      disabled = false,
      className,
      multiple = false,
      searchable = false,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropUp, setDropUp] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const selectRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { theme, style } = getThemeStyles(color);

    // selectRef drives the click-outside and drop-direction logic, so the
    // forwarded ref is mirrored onto it rather than replacing it.
    React.useImperativeHandle(ref, () => selectRef.current as HTMLDivElement);

    const hasError = Boolean(error);

    // Filter options based on search
    const filteredOptions = useMemo(() => {
      if (!searchQuery) return options;
      return options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }, [options, searchQuery]);

    // Group options if "group" property is provided
    const groupedOptions = useMemo(() => {
      return filteredOptions.reduce(
        (acc, opt) => {
          const group = opt.group || "ungrouped";
          if (!acc[group]) acc[group] = [];
          acc[group].push(opt);
          return acc;
        },
        {} as Record<string, SelectOption[]>,
      );
    }, [filteredOptions]);

    // Focus search input automatically when opened
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (!isOpen) setSearchQuery("");
    }, [isOpen, searchable]);

    // Close dropdown on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Decide which way the menu opens *before* it becomes visible, so it never
    // renders in the wrong place for a frame. The menu is always mounted (it is
    // only hidden via opacity), so its height is measurable while closed.
    const handleToggle = () => {
      if (!isOpen && selectRef.current) {
        const trigger = selectRef.current.getBoundingClientRect();
        const clip = getClippingRect(selectRef.current);
        const menuHeight = dropdownRef.current?.offsetHeight ?? 240;

        const bottomBound = Math.min(
          window.innerHeight,
          clip ? clip.bottom : Number.POSITIVE_INFINITY,
        );
        const topBound = Math.max(0, clip ? clip.top : 0);

        const spaceBelow = bottomBound - trigger.bottom - 8;
        const spaceAbove = trigger.top - topBound - 8;

        // Only flip when below genuinely can't fit and above is roomier.
        setDropUp(spaceBelow < menuHeight && spaceAbove > spaceBelow);
      }
      setIsOpen(!isOpen);
    };

    const handleSelect = (optValue: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        const newValues = currentValues.includes(optValue)
          ? currentValues.filter((v) => v !== optValue)
          : [...currentValues, optValue];
        if (onChange) onChange(newValues);
      } else {
        if (onChange) onChange(optValue);
        setIsOpen(false);
      }
    };

    const handleRemoveTag = (optValue: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (multiple && Array.isArray(value)) {
        if (onChange) onChange(value.filter((v) => v !== optValue));
      }
    };

    // --- Size Classes ---
    const sizeClasses = {
      sm: {
        wrapper: "min-h-9 px-3 py-1.5",
        text: "text-xs",
        icon: "w-3.5 h-3.5",
        option: "px-3 py-2 text-xs",
        tag: "px-1.5 py-0.5 text-[10px]",
      },
      md: {
        wrapper: "min-h-11 px-4 py-2.5",
        text: "text-sm",
        icon: "w-4 h-4",
        option: "px-4 py-2.5 text-sm",
        tag: "px-2 py-1 text-xs",
      },
      lg: {
        wrapper: "min-h-14 px-5 py-3.5",
        text: "text-base",
        icon: "w-5 h-5",
        option: "px-5 py-3 text-base",
        tag: "px-2.5 py-1 text-sm",
      },
    };
    const s = sizeClasses[inputSize];

    // --- Variant Styles ---
    const getVariantStyles = () => {
      const baseWrapper = cn(
        "relative flex items-center justify-between w-full transition-all duration-300 cursor-pointer outline-none",
        s.wrapper,
      );

      if (disabled)
        return {
          wrapper: cn(
            baseWrapper,
            "opacity-50 cursor-not-allowed border border-border bg-muted",
          ),
          active: "",
        };
      if (hasError)
        return {
          wrapper: cn(
            baseWrapper,
            "border border-red-500 bg-white dark:bg-[#09090b]",
            variant === "underlined" && "border-0 border-b-2 rounded-none",
            variant !== "underlined" && "rounded-xl",
          ),
          active: "ring-4 ring-red-500/10",
        };

      switch (variant) {
        case "filled":
          return {
            wrapper: cn(
              baseWrapper,
              "bg-muted border border-transparent rounded-xl",
            ),
            active: cn("bg-background ring-4", theme.ring),
          };
        case "underlined":
          return {
            wrapper: cn(
              baseWrapper,
              "border-b-2 border-border bg-transparent rounded-none px-0",
            ),
            active: theme.ring.split(" ")[1],
          };
        case "glow":
          return {
            wrapper: cn(
              baseWrapper,
              "bg-white dark:bg-[#09090b] border border-border rounded-xl shadow-sm",
            ),
            active: theme.glow,
          };
        case "glass":
          return {
            wrapper: cn(
              baseWrapper,
              "bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 rounded-xl text-white shadow-sm hover:bg-white/30 transition-colors",
            ),
            active: "ring-2 ring-white/40 border-white/50 bg-white/30",
          };
        case "default":
        default:
          return {
            wrapper: cn(
              baseWrapper,
              "bg-white dark:bg-[#09090b] border border-border rounded-xl shadow-sm",
            ),
            active: cn("ring-4", theme.ring),
          };
      }
    };

    const styles = getVariantStyles();

    // Renders the selected content (Tags for multi, text for single)
    const renderSelectedContent = () => {
      if (multiple && Array.isArray(value) && value.length > 0) {
        return (
          <div className="flex flex-wrap items-center gap-1.5 w-full pr-6 overflow-hidden">
            {value.map((val) => {
              const opt = options.find((o) => o.value === val);
              if (!opt) return null;
              return (
                <span
                  key={val}
                  onClick={(e) => handleRemoveTag(val, e)}
                  className={cn(
                    "inline-flex items-center gap-1 font-semibold rounded-md border border-transparent hover:border-red-200 dark:hover:border-red-900 transition-colors",
                    s.tag,
                    theme.bgSoft,
                  )}
                >
                  {opt.label}
                  <X
                    className={cn("shrink-0 hover:text-red-500", s.icon)}
                    style={{ width: "0.8em", height: "0.8em" }}
                  />
                </span>
              );
            })}
          </div>
        );
      }

      const singleOption = options.find((opt) => opt.value === value);
      return (
        <span
          className={cn(
            "truncate pr-6",
            s.text,
            !singleOption
              ? variant === "glass" ? "text-white/60" : "text-zinc-400 dark:text-zinc-600"
              : variant === "glass" ? "text-white font-medium" : "text-foreground",
          )}
        >
          {singleOption ? singleOption.label : placeholder}
        </span>
      );
    };

    return (
      <div
        ref={selectRef}
        className={cn("flex flex-col gap-1.5 w-full relative", className)}
        style={style}
      >
        {label && (
          <label
            className={cn(
              "text-sm font-bold",
              hasError ? "text-red-500" : variant === "glass" ? "text-white/90" : "text-foreground",
              disabled && "opacity-50",
            )}
          >
            {label}
          </label>
        )}

        {/* Trigger Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={handleToggle}
          className={cn(
            styles.wrapper,
            isOpen && styles.active,
            multiple && Array.isArray(value) && value.length > 0 && "py-1.5",
          )}
        >
          <div className="flex items-center gap-2 overflow-hidden w-full">
            {icon && (
              <div
                className={cn(
                  "shrink-0 text-muted-foreground",
                  isOpen && theme.text,
                )}
              >
                {icon}
              </div>
            )}
            {renderSelectedContent()}
          </div>

          <div className="absolute right-4 flex items-center gap-2 shrink-0 bg-transparent">
            {hasError && <AlertCircle className={cn(s.icon, "text-red-500")} />}
            <ChevronDown
              className={cn(
                s.icon,
                variant === "glass" ? "text-white/70" : "text-muted-foreground",
                "transition-transform duration-300",
                isOpen && "rotate-180",
                isOpen && theme.text,
              )}
            />
          </div>
        </button>

        {/* Dropdown Menu */}
        <div
          ref={dropdownRef}
          className={cn(
            "absolute left-0 right-0 z-50 overflow-hidden border rounded-xl shadow-2xl transition-all duration-200 ease-out",
            variant === "glass"
              ? "bg-white/40 dark:bg-black/50 backdrop-blur-2xl border-white/30 text-white shadow-2xl"
              : "bg-background border-border",
            dropUp
              ? cn(
                  "origin-bottom",
                  variant === "underlined"
                    ? "bottom-[100%]"
                    : "bottom-[calc(100%+8px)]",
                )
              : cn(
                  "origin-top",
                  variant === "underlined"
                    ? "top-[100%]"
                    : "top-[calc(100%+8px)]",
                ),
            isOpen
              ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
              : cn(
                  "opacity-0 scale-y-95 pointer-events-none",
                  dropUp ? "translate-y-2" : "-translate-y-2",
                ),
          )}
        >
          {searchable && (
            <div className="p-2 border-b border-border bg-muted/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Search options..."
                  className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ "--tw-ring-color": `var(--theme-color)` } as React.CSSProperties}
                />
              </div>
            </div>
          )}

          <div className="max-h-60 overflow-y-auto p-1 flex flex-col gap-0.5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
            {Object.keys(groupedOptions).length === 0 ? (
              <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                No results found
              </div>
            ) : (
              Object.entries(groupedOptions).map(([group, opts]) => (
                <div key={group} className="flex flex-col gap-0.5">
                  {/* Group Header */}
                  {group !== "ungrouped" && (
                    <div className="px-3 py-2 mt-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {group}
                    </div>
                  )}
                  {/* Options */}
                  {opts.map((opt) => {
                    const isSelected =
                      multiple && Array.isArray(value)
                        ? value.includes(opt.value)
                        : value === opt.value;
                    const OptIcon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={(e) => handleSelect(opt.value, e)}
                        className={cn(
                          "w-full flex items-center justify-between rounded-lg transition-colors font-medium text-left cursor-pointer active:scale-[0.98]",
                          s.option,
                          variant === "glass"
                            ? isSelected
                              ? cn("bg-white/30 font-bold shadow-sm", theme.text)
                              : "text-white/90 hover:bg-white/20"
                            : isSelected
                              ? theme.bgSoft
                              : "text-foreground hover:bg-muted",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {multiple && (
                            <div
                              className={cn(
                                "w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors",
                                isSelected
                                  ? cn(theme.bg, "border-transparent")
                                  : "border-zinc-300 dark:border-zinc-600 bg-card",
                              )}
                            >
                              {/* No hardcoded colour: theme.bg already carries the
                                  correct contrasting text colour for each theme
                                  (text-white for indigo/rose/hex, but
                                  text-primary-foreground for "primary", which
                                  inverts in dark mode). */}
                              {isSelected && (
                                <Check className="w-3 h-3" strokeWidth={3} />
                              )}
                            </div>
                          )}
                          {OptIcon && <OptIcon className={s.icon} />}
                          <span>{opt.label}</span>
                        </div>
                        {isSelected && !multiple && (
                          <Check
                            className={cn(s.icon, theme.text)}
                            strokeWidth={3}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>

        {error && (
          <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-0.5">
            <AlertCircle className="w-3.5 h-3.5" /> {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs font-medium text-muted-foreground mt-0.5">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
SelectBlockImpl.displayName = "SelectBlock";

/**
 * The implementation is written against the collapsed props; this cast is
 * what hands callers the discriminated pair instead.
 */
export const SelectBlock = SelectBlockImpl as React.ForwardRefExoticComponent<
  SelectBlockProps & React.RefAttributes<HTMLDivElement>
>;
