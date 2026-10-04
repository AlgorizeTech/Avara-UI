"use client";

import { cn } from "@/lib/utils";
import { Check, Copy, X } from "lucide-react";
import React, { forwardRef, useState } from "react";
import { useCopyToClipboard } from "./copy-button-hooks";

export type { CopyStatus } from "./copy-button-hooks";

// ==========================================
// THEME
// ==========================================
export type CopyButtonColor = "primary" | "indigo" | "rose" | "emerald" | "zinc" | string;
export type CopyButtonVariant = "solid" | "outline" | "ghost" | "soft";
export type CopyButtonSize = "sm" | "md" | "lg";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    solid: "bg-primary text-primary-foreground hover:bg-primary/90",
    soft: "bg-primary/10 text-primary hover:bg-primary/15",
    text: "text-primary",
    ring: "focus-visible:ring-primary/30",
  },
  indigo: {
    solid: "bg-indigo-600 text-white hover:bg-indigo-700",
    soft: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/15",
    text: "text-indigo-600 dark:text-indigo-400",
    ring: "focus-visible:ring-indigo-500/30",
  },
  rose: {
    solid: "bg-rose-600 text-white hover:bg-rose-700",
    soft: "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/15",
    text: "text-rose-600 dark:text-rose-400",
    ring: "focus-visible:ring-rose-500/30",
  },
  emerald: {
    solid: "bg-emerald-600 text-white hover:bg-emerald-700",
    soft: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15",
    text: "text-emerald-600 dark:text-emerald-400",
    ring: "focus-visible:ring-emerald-500/30",
  },
  zinc: {
    solid: "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200",
    soft: "bg-zinc-500/10 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-500/15",
    text: "text-zinc-900 dark:text-zinc-100",
    ring: "focus-visible:ring-zinc-500/30",
  },
};

const getTheme = (color: string) => {
  if (color.startsWith("#")) {
    return {
      theme: {
        solid: "bg-[var(--copy-color)] text-white hover:opacity-90",
        soft: "bg-[color-mix(in_oklab,var(--copy-color)_12%,transparent)] text-[var(--copy-color)] hover:bg-[color-mix(in_oklab,var(--copy-color)_18%,transparent)]",
        text: "text-[var(--copy-color)]",
        ring: "focus-visible:ring-[color-mix(in_oklab,var(--copy-color)_30%,transparent)]",
      },
      style: { "--copy-color": color } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] ?? colorThemes.primary, style: {} };
};

// Keyframes ship inline so the block stays self-contained — no plugin, no
// globals.css entry. Names are prefixed to avoid clashing with app styles.
const KEYFRAMES = `
@keyframes copy-btn-pop {
  0% { transform: scale(0.4) rotate(-20deg); opacity: 0; }
  60% { transform: scale(1.2) rotate(4deg); opacity: 1; }
  100% { transform: scale(1) rotate(0); opacity: 1; }
}
@keyframes copy-btn-rise {
  from { transform: translateY(0.45em); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}`;

// ==========================================
// COPY BUTTON
// ==========================================
export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onCopy" | "color"> {
  /** The text that lands on the clipboard. */
  value: string;
  /** Resting label. Omit for an icon-only button. Default "Copy". */
  label?: React.ReactNode;
  /** Label shown after a successful copy. Default "Copied!". */
  copiedLabel?: React.ReactNode;
  /** Label shown when the clipboard write fails. Default "Failed". */
  errorLabel?: React.ReactNode;
  /** Hide the label entirely and render a square icon button. */
  iconOnly?: boolean;
  /** How long the copied state lingers, in ms. Default 2000. */
  timeout?: number;
  variant?: CopyButtonVariant;
  size?: CopyButtonSize;
  /** Theme colour — a preset name or any hex code. */
  color?: CopyButtonColor;
  /** Fires after the clipboard write with the value and whether it succeeded. */
  onCopy?: (value: string, ok: boolean) => void;
}

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      label = "Copy",
      copiedLabel = "Copied!",
      errorLabel = "Failed",
      iconOnly = false,
      timeout = 2000,
      variant = "solid",
      size = "md",
      color = "primary",
      onCopy,
      className,
      style,
      onClick,
      disabled,
      ...props
    },
    ref,
  ) => {
    const { copy, status } = useCopyToClipboard(timeout);
    const { theme, style: themeStyle } = getTheme(color);
    // No entrance animation on first paint — the pop is for state changes only,
    // so it switches on with the first one (and stays on, so idle pops back too).
    const [interacted, setInteracted] = useState(false);
    if (!interacted && status !== "idle") setInteracted(true);

    const sizes = {
      sm: { btn: "h-8 text-xs gap-1.5 rounded-md", pad: "px-2.5", square: "w-8", icon: "w-3.5 h-3.5" },
      md: { btn: "h-10 text-sm gap-2 rounded-md", pad: "px-4", square: "w-10", icon: "w-4 h-4" },
      lg: { btn: "h-12 text-base gap-2 rounded-lg", pad: "px-5", square: "w-12", icon: "w-5 h-5" },
    }[size];

    const variants = {
      solid: theme.solid,
      soft: theme.soft,
      outline: cn(
        "border border-border bg-background text-foreground hover:bg-muted",
      ),
      ghost: "bg-transparent text-foreground hover:bg-muted",
    };

    const isCopied = status === "copied";
    const isError = status === "error";
    const currentLabel = isCopied ? copiedLabel : isError ? errorLabel : label;
    const Icon = isCopied ? Check : isError ? X : Copy;

    return (
      <>
      {/* Keyframes live beside the button, not inside it, so the live region
          and textContent stay clean. */}
      <style>{KEYFRAMES}</style>
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-live="polite"
        aria-label={iconOnly ? (isCopied ? "Copied" : "Copy to clipboard") : undefined}
        data-state={status}
        onClick={(e) => {
          onClick?.(e);
          if (e.defaultPrevented) return;
          void copy(value).then((ok) => onCopy?.(value, ok));
        }}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center font-semibold whitespace-nowrap select-none transition-all duration-200 active:scale-95 outline-none focus-visible:ring-4 disabled:opacity-50 disabled:pointer-events-none",
          sizes.btn,
          iconOnly ? sizes.square : sizes.pad,
          variants[variant],
          theme.ring,
          // Success flashes the accent, whatever the resting variant is.
          isCopied && variant !== "solid" && cn(theme.text),
          isError && "text-red-600 dark:text-red-400",
          className,
        )}
        style={{ ...themeStyle, ...style }}
        {...props}
      >
        {/* Swapping the element (via key) restarts the pop each time. */}
        <Icon
          key={status}
          className={cn(sizes.icon, "shrink-0")}
          style={interacted ? { animation: "copy-btn-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) both" } : undefined}
          strokeWidth={isCopied ? 3 : 2}
        />
        {!iconOnly && (
          <span
            key={`label-${status}`}
            className="inline-block"
            style={interacted ? { animation: "copy-btn-rise 0.25s ease-out both" } : undefined}
          >
            {currentLabel}
          </span>
        )}
      </button>
      </>
    );
  },
);
CopyButton.displayName = "CopyButton";

// ==========================================
// COPY FIELD (read-only input + button)
// ==========================================
export interface CopyFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "prefix"> {
  /** The text shown in the field and copied by the button. */
  value: string;
  label?: string;
  /** Props forwarded to the embedded button (label, variant, colour…). */
  buttonProps?: Omit<CopyButtonProps, "value">;
  size?: CopyButtonSize;
  color?: CopyButtonColor;
  /** Render the button inside the field's right edge instead of beside it. */
  inset?: boolean;
  /** Select the whole value when the field is clicked. Default true. */
  selectOnClick?: boolean;
  /** Left-side adornment inside the field, e.g. a link icon. */
  prefix?: React.ReactNode;
}

export const CopyField = forwardRef<HTMLDivElement, CopyFieldProps>(
  (
    {
      value,
      label,
      buttonProps,
      size = "md",
      color = "primary",
      inset = false,
      selectOnClick = true,
      prefix,
      className,
      ...props
    },
    ref,
  ) => {
    const heights = { sm: "h-8 text-xs", md: "h-10 text-sm", lg: "h-12 text-base" }[size];
    const { theme, style } = getTheme(color);

    return (
      <div ref={ref} className={cn("flex w-full flex-col gap-1.5", className)} {...props}>
        {label && <span className="text-sm font-semibold text-foreground">{label}</span>}
        <div className={cn("flex w-full items-center", inset ? "relative" : "gap-2")}>
          {prefix && !inset && (
            <span className="shrink-0 text-muted-foreground">{prefix}</span>
          )}
          <input
            readOnly
            value={value}
            onClick={selectOnClick ? (e) => e.currentTarget.select() : undefined}
            className={cn(
              "w-full min-w-0 rounded-md border border-border bg-background px-3 font-mono text-foreground outline-none transition-shadow focus-visible:ring-4",
              theme.ring,
              heights,
              inset && (size === "sm" ? "pr-10" : size === "lg" ? "pr-14" : "pr-12"),
              prefix && inset && "pl-9",
            )}
            style={style}
          />
          {prefix && inset && (
            <span className="pointer-events-none absolute left-3 text-muted-foreground [&>svg]:w-4 [&>svg]:h-4">
              {prefix}
            </span>
          )}
          <CopyButton
            value={value}
            size={size}
            color={color}
            {...(inset
              ? {
                  iconOnly: true,
                  variant: "ghost" as const,
                  className: cn("absolute right-1", size === "sm" ? "h-6 w-6" : size === "lg" ? "h-10 w-10" : "h-8 w-8"),
                }
              : {})}
            {...buttonProps}
          />
        </div>
      </div>
    );
  },
);
CopyField.displayName = "CopyField";
