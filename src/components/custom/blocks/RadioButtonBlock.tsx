"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type RadioButtonVariant =
  | "default"
  | "delivery-and-payment"
  | "subscription-plans"
  | "controlled"
  | "custom-indicator"
  | "disabled-group"
  | "grid"
  | "icon-cards"
  | "no-indicator"
  | "with-icons"
  | "with-ripple";

export interface RadioButtonOption {
  value: string;
  label: string;
  description?: string;
  meta?: string;
  /** Optional unit/period shown beside `meta` in `icon-cards` (e.g. `"per month"`). */
  metaSuffix?: string;
  badge?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioButtonGroupProps {
  /** Visual layout/style variant. Default `"default"`. */
  variant?: RadioButtonVariant;
  /** Optional group label rendered above the options. */
  label?: string;
  /** Optional helper text rendered beneath the label. */
  description?: string;
  /** Options to render. */
  options: RadioButtonOption[];
  /** Controlled selected value. */
  value?: string;
  /** Initial selected value for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the selected option changes. */
  onValueChange?: (value: string) => void;
  /** Disable all options in the group. */
  disabled?: boolean;
  /** Show press ripple feedback on click. Default `true`. */
  ripple?: boolean;
  /** Show selection indicator (`"dot"` | `"check"` | `"none"`). Overrides variant default. */
  indicator?: "dot" | "check" | "none";
  /** Accessible name when no visible `label` is passed. */
  ariaLabel?: string;
  className?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const RadioButtonGroup = React.forwardRef<
  HTMLDivElement,
  RadioButtonGroupProps
>(function RadioButtonGroup(
  {
    variant = "default",
    label,
    description,
    options,
    value,
    defaultValue,
    onValueChange,
    disabled = false,
    ripple,
    indicator,
    ariaLabel,
    className,
  },
  ref,
) {
  const still = !!useReducedMotion();
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<string>(
    defaultValue ?? options.find((o) => !o.disabled)?.value ?? "",
  );
  const selected = isControlled ? value : internal;

  const [ripples, setRipples] = React.useState<Record<string, Ripple[]>>({});
  const nextId = React.useRef(0);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const hasRipple =
    ripple ?? (variant === "subscription-plans" || variant === "with-ripple");

  const select = (opt: RadioButtonOption, e?: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || opt.disabled) return;
    if (hasRipple && !still && e && e.detail > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.4;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const id = ++nextId.current;
      setRipples((prev) => ({
        ...prev,
        [opt.value]: [...(prev[opt.value] ?? []), { id, x, y, size }],
      }));
      window.setTimeout(() => {
        setRipples((prev) => ({
          ...prev,
          [opt.value]: (prev[opt.value] ?? []).filter((r) => r.id !== id),
        }));
      }, 520);
    }
    if (!isControlled) setInternal(opt.value);
    onValueChange?.(opt.value);
  };

  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const len = options.length;
    for (let offset = 1; offset <= len; offset++) {
      const nextIdx = (idx + step * offset + len) % len;
      const candidate = options[nextIdx];
      if (candidate && !candidate.disabled && !disabled) {
        if (!isControlled) setInternal(candidate.value);
        onValueChange?.(candidate.value);
        itemRefs.current[nextIdx]?.focus();
        break;
      }
    }
  };

  const resolvedIndicator: "dot" | "check" | "none" =
    indicator ??
    (variant === "with-icons" || variant === "no-indicator"
      ? "none"
      : variant === "subscription-plans" ||
          variant === "custom-indicator" ||
          variant === "icon-cards"
        ? "check"
        : "dot");

  const isGrid3 =
    variant === "grid" ||
    variant === "custom-indicator" ||
    variant === "with-ripple";
  const isGrid2 = variant === "with-icons";

  const containerWidth =
    variant === "icon-cards"
      ? "w-[min(540px,100%)]"
      : isGrid3 || isGrid2
        ? "w-[min(620px,100%)]"
        : variant === "subscription-plans"
          ? "w-[min(420px,100%)]"
          : "w-[min(390px,100%)]";

  return (
    <div ref={ref} className={cn("mx-auto", containerWidth, className)}>
      {(label || description) && (
        <div className="mb-3 space-y-0.5">
          {label && (
            <p className="text-sm font-semibold tracking-tight text-foreground">
              {label}
            </p>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div
        role="radiogroup"
        aria-label={label ?? ariaLabel ?? "Options"}
        aria-disabled={disabled || undefined}
        className={cn(
          "grid gap-2.5",
          isGrid3 && "grid-cols-1 sm:grid-cols-3",
          isGrid2 && "grid-cols-1 sm:grid-cols-2",
          !isGrid3 && !isGrid2 && "grid-cols-1",
        )}
      >
        {options.map((opt, idx) => {
          const isSelected = selected === opt.value;
          const isDisabled = disabled || !!opt.disabled;
          const isInverted = variant === "subscription-plans";
          const isIconRow = variant === "with-icons";
          const isIconBox = variant === "icon-cards";

          return (
            <button
              key={opt.value}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isDisabled || undefined}
              disabled={isDisabled}
              data-selected={isSelected ? "true" : "false"}
              tabIndex={isSelected || (idx === 0 && !selected) ? 0 : -1}
              onClick={(e) => select(opt, e)}
              onKeyDown={(e) => onKeyDown(e, idx)}
              className={cn(
                "group relative flex w-full cursor-pointer overflow-hidden rounded-2xl border text-left outline-none transition-all duration-150 select-none",
                "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isDisabled && "pointer-events-none cursor-not-allowed opacity-50",
                isIconRow
                  ? "flex-row items-center gap-3.5 p-4"
                  : isInverted
                    ? "flex-row items-center gap-3.5 p-4"
                    : isIconBox
                      ? "flex-col items-start gap-2.5 p-4"
                      : "flex-col justify-between p-4",
                isInverted
                  ? isSelected
                    ? "border-transparent bg-foreground text-background shadow-sm"
                    : "border-border bg-card text-foreground hover:border-foreground/25"
                  : isIconBox
                    ? isSelected
                      ? "border-primary bg-muted/45 text-foreground ring-2 ring-primary/30 dark:bg-zinc-900"
                      : "border-border bg-muted/45 text-foreground hover:border-foreground/25 dark:bg-zinc-900/70"
                    : isSelected
                      ? "border-primary bg-card text-foreground ring-1 ring-primary/40"
                      : "border-border bg-card text-foreground hover:border-foreground/25",
              )}
            >
              {/* Press ripple (only when ripple is enabled) */}
              {hasRipple &&
                (ripples[opt.value] ?? []).map((r) => (
                  <motion.span
                    key={r.id}
                    aria-hidden
                    initial={{ scale: 0, opacity: 0.35 }}
                    animate={{ scale: 1, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      left: r.x,
                      top: r.y,
                      width: r.size,
                      height: r.size,
                    }}
                    className={cn(
                      "pointer-events-none absolute rounded-full",
                      isInverted && isSelected
                        ? "bg-background/25"
                        : "bg-primary/20",
                    )}
                  />
                ))}

              {/* Leading icon for with-icons (not icon-cards, which renders icon inline in header row) */}
              {opt.icon && !isIconBox && (
                <span
                  className={cn(
                    "relative z-10 grid shrink-0 place-items-center transition-colors size-9 rounded-lg",
                    isSelected
                      ? "bg-primary/10 text-primary"
                      : "bg-muted/70 text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {opt.icon}
                </span>
              )}

              {/* Content */}
              {isIconBox ? (
                <div className="relative z-10 w-full pr-7">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {opt.icon && (
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-border/70 bg-background text-foreground shadow-xs">
                        {opt.icon}
                      </span>
                    )}
                    <span className="text-sm font-semibold tracking-tight">
                      {opt.label}
                    </span>
                    {opt.badge && (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-medium leading-none text-emerald-700 dark:text-emerald-300">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  {opt.meta && (
                    <div className="mt-2.5 flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold tracking-tight tabular-nums">
                        {opt.meta}
                      </span>
                      {opt.metaSuffix && (
                        <span className="text-sm text-muted-foreground">
                          {opt.metaSuffix}
                        </span>
                      )}
                    </div>
                  )}
                  {opt.description && (
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {opt.description}
                    </p>
                  )}
                </div>
              ) : (
                <div
                  className={cn(
                    "relative z-10 min-w-0 flex-1",
                    resolvedIndicator !== "none" &&
                      !isIconRow &&
                      !isInverted &&
                      "pr-7",
                  )}
                >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold tracking-tight">
                      {opt.label}
                    </span>
                    {opt.badge && (
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-none",
                          isInverted && isSelected
                            ? "bg-background/20 text-background"
                            : "bg-primary/12 text-primary",
                        )}
                      >
                        {opt.badge}
                      </span>
                    )}
                  </div>

                  {opt.meta && !isGrid3 && (
                    <span
                      className={cn(
                        "text-xs font-medium tabular-nums",
                        isInverted && isSelected
                          ? "text-background/80"
                          : "text-muted-foreground",
                      )}
                    >
                      {opt.meta}
                    </span>
                  )}
                </div>

                {opt.description && (
                  <p
                    className={cn(
                      "mt-1 text-xs leading-relaxed",
                      isInverted && isSelected
                        ? "text-background/75"
                        : "text-muted-foreground",
                    )}
                  >
                    {opt.description}
                  </p>
                )}

                {opt.meta && isGrid3 && (
                  <p
                    className={cn(
                      "mt-2 text-xs font-semibold tabular-nums",
                      isSelected ? "text-primary" : "text-foreground/80",
                    )}
                  >
                    {opt.meta}
                  </p>
                )}
              </div>
              )}

              {/* Selection Indicator */}
              {resolvedIndicator !== "none" && (!isIconBox || isSelected) && (
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 grid shrink-0 place-items-center transition-all duration-150",
                    isInverted
                      ? "ml-3 size-5 rounded-full border self-center"
                      : isIconBox
                        ? "absolute right-3.5 top-3.5 size-5 rounded-full border"
                        : "absolute right-3.5 top-3.5 size-4 rounded-full border",
                    isInverted
                      ? isSelected
                        ? "border-background bg-background text-foreground"
                        : "border-border bg-transparent text-transparent"
                      : isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-foreground/25 bg-transparent text-transparent group-hover:border-foreground/45",
                  )}
                >
                  <AnimatePresence initial={false}>
                    {isSelected &&
                      (resolvedIndicator === "check" ? (
                        <motion.span
                          key="check"
                          initial={still ? false : { scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={
                            still ? undefined : { scale: 0, opacity: 0 }
                          }
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 28,
                          }}
                          className="grid place-items-center"
                        >
                          <Check className="size-3 stroke-[3]" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="dot"
                          initial={still ? false : { scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={still ? undefined : { scale: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 28,
                          }}
                          className="size-1.5 rounded-full bg-primary-foreground"
                        />
                      ))}
                  </AnimatePresence>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default RadioButtonGroup;
