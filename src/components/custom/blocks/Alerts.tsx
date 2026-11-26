"use client";

import { cn } from "@/lib/utils";
import {
  CircleAlert,
  CircleCheck,
  Info,
  LoaderCircle,
  TriangleAlert,
  X,
} from "lucide-react";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/** What the alert is about. It picks the icon and the colour. */
export type AlertType =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "loading";

/**
 * inset:   Avara's signature card: icon and title on top, the message in an inset well.
 * default: card surface, only the icon carries the colour.
 * soft:    tinted background and border in the type colour.
 * glass:   frosted, for use over an image or gradient.
 * solid:   filled with the type colour.
 */
export type AlertVariant = "inset" | "default" | "soft" | "glass" | "solid";

export interface AlertProps {
  type?: AlertType;
  variant?: AlertVariant;
  title?: React.ReactNode;
  message?: React.ReactNode;
  /** Replaces the icon for the type. Pass `null` to hide the icon. */
  icon?: React.ReactNode;
  /** Slot on the right, usually an `<AlertAction>`. */
  action?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: (() => void) | null;
  className?: string;
  titleClassName?: string;
  messageClassName?: string;
  iconClassName?: string;
  /** Extra content under the message: a list, a link, a form. */
  children?: React.ReactNode;
}

type Tone = {
  /** Icon colour on the default variant. */
  icon: string;
  /** Soft variant: sets --alert-tone, the colour the gradient is mixed from. */
  soft: string;
  /** Icon colour on the soft variant. */
  softIcon: string;
  /** Solid variant: a flat light fill of the standard colour, with its own text colour. */
  solid: string;
  /** Icon colour on the solid variant. */
  solidIcon: string;
  /** Glass variant: tint and border. */
  glass: string;
  /** Icon colour on the glass variant. */
  glassIcon: string;
  /** Filled pill for AlertAction on the default variant. */
  action: string;
};

const TONES: Record<AlertType, Tone> = {
  neutral: {
    icon: "text-foreground",
    soft: "[--alert-tone:#94a3b8]",
    softIcon: "text-foreground",
    solid: "bg-zinc-100 border-zinc-300 text-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50",
    solidIcon: "text-zinc-600 dark:text-zinc-300",
    glass: "bg-white/15 border-white/30",
    glassIcon: "text-white",
    action: "bg-foreground text-background hover:bg-foreground/90",
  },
  info: {
    icon: "text-sky-500",
    soft: "[--alert-tone:#0ea5e9]",
    softIcon: "text-sky-500",
    solid: "bg-sky-100 border-sky-300 text-sky-950 dark:bg-sky-500/20 dark:border-sky-400/30 dark:text-sky-50",
    solidIcon: "text-sky-600 dark:text-sky-300",
    glass: "bg-sky-500/20 border-sky-300/40",
    glassIcon: "text-sky-300",
    action: "bg-sky-500 text-white hover:bg-sky-500/90",
  },
  success: {
    icon: "text-emerald-500",
    soft: "[--alert-tone:#10b981]",
    softIcon: "text-emerald-500",
    solid: "bg-emerald-100 border-emerald-300 text-emerald-950 dark:bg-emerald-500/20 dark:border-emerald-400/30 dark:text-emerald-50",
    solidIcon: "text-emerald-600 dark:text-emerald-300",
    glass: "bg-emerald-500/20 border-emerald-300/40",
    glassIcon: "text-emerald-300",
    action: "bg-emerald-600 text-white hover:bg-emerald-600/90",
  },
  warning: {
    icon: "text-amber-500",
    soft: "[--alert-tone:#f97316]",
    softIcon: "text-orange-500",
    solid: "bg-amber-100 border-amber-300 text-amber-950 dark:bg-amber-500/20 dark:border-amber-400/30 dark:text-amber-50",
    solidIcon: "text-amber-600 dark:text-amber-300",
    glass: "bg-amber-500/20 border-amber-300/40",
    glassIcon: "text-amber-300",
    action: "bg-amber-500 text-amber-950 hover:bg-amber-500/90",
  },
  danger: {
    icon: "text-destructive",
    soft: "[--alert-tone:var(--destructive)]",
    softIcon: "text-destructive",
    solid: "bg-red-100 border-red-300 text-red-950 dark:bg-red-500/20 dark:border-red-400/30 dark:text-red-50",
    solidIcon: "text-red-600 dark:text-red-300",
    glass: "bg-rose-500/20 border-rose-300/40",
    glassIcon: "text-rose-300",
    action: "bg-destructive text-white hover:bg-destructive/90",
  },
  loading: {
    icon: "text-primary",
    soft: "[--alert-tone:var(--primary)]",
    softIcon: "text-primary",
    solid: "bg-primary/15 border-primary/30 text-foreground",
    solidIcon: "text-primary",
    glass: "bg-white/15 border-white/30",
    glassIcon: "text-white",
    action: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
};

const GLASS_ACTION =
  "border border-white/30 bg-white/20 text-white hover:bg-white/30";

const DISMISS: Record<AlertVariant, string> = {
  inset: "bg-foreground/[0.06] text-foreground/60 hover:bg-foreground/[0.12] hover:text-foreground",
  default: "bg-foreground/[0.06] text-foreground/60 hover:bg-foreground/[0.12] hover:text-foreground",
  soft: "text-foreground/60 hover:bg-foreground/10 hover:text-foreground",
  glass: "bg-white/15 text-white hover:bg-white/25",
  solid: "text-current/60 hover:bg-foreground/10 hover:text-current",
};

/** The accordion's card: a card fill on a faint ring, lifted by a soft shadow instead of a border. */
const CARD_SURFACE =
  "bg-card text-card-foreground ring-1 ring-[#F7F7F6] dark:ring-border/60 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_-18px_rgba(0,0,0,0.42)]";

const SURFACE: Record<AlertVariant, string> = {
  inset: CARD_SURFACE,
  default: CARD_SURFACE,
  // The type colour bleeds in from the left corners over a pale card, the way
  // a tinted window lets light in from one side.
  soft: "bg-card text-card-foreground ring-1 ring-[#F7F7F6] dark:ring-border/60 bg-[radial-gradient(75%_130%_at_0%_100%,color-mix(in_oklab,var(--alert-tone)_26%,transparent),transparent_70%),radial-gradient(45%_100%_at_0%_0%,color-mix(in_oklab,var(--alert-tone)_16%,transparent),transparent_70%)] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_-18px_rgba(0,0,0,0.42)]",
  glass:
    "border text-white backdrop-blur-xl shadow-[inset_0_1px_0_0_rgb(255_255_255/0.28),0_1px_2px_0_rgb(0_0_0/0.12),0_14px_32px_-12px_rgb(0_0_0/0.45)]",
  solid:
    "border shadow-[0_1px_2px_0_rgb(0_0_0/0.05),0_10px_20px_-14px_rgb(0_0_0/0.25)]",
};

function toneSurface(variant: AlertVariant, tone: Tone) {
  if (variant === "soft") return tone.soft;
  if (variant === "solid") return tone.solid;
  if (variant === "glass") return tone.glass;
  return "";
}

const ICONS: Record<AlertType, React.ElementType> = {
  neutral: Info,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleAlert,
  loading: LoaderCircle,
};

const AlertContext = createContext<{ type: AlertType; variant: AlertVariant }>({
  type: "neutral",
  variant: "default",
});

/**
 * A pill button that takes its colour from the alert it sits in. Put it in the
 * `action` slot, or inside `children`.
 */
export const AlertAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** `outline` is the quieter of two buttons side by side. */
    appearance?: "filled" | "outline";
  }
>(function AlertAction(
  { className, type = "button", appearance = "filled", ...props },
  ref,
) {
  const { type: alertType, variant } = useContext(AlertContext);
  const tone = TONES[alertType];
  const soft = variant === "soft";
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
        soft ? "rounded-lg" : "rounded-full",
        soft
          ? appearance === "outline"
            ? "border border-foreground/15 bg-card text-foreground hover:bg-foreground/5"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
          : variant === "glass"
            ? GLASS_ACTION
            : variant === "solid"
              ? tone.action
              : tone.action,
        className,
      )}
      {...props}
    />
  );
});

export const Alert: React.FC<AlertProps> = ({
  type = "neutral",
  variant = "default",
  title,
  message,
  icon,
  action,
  dismissible = false,
  onDismiss = null,
  className,
  titleClassName,
  messageClassName,
  iconClassName,
  children,
}) => {
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const tone = TONES[type] ?? TONES.neutral;
  const Icon = ICONS[type] ?? Info;

  const handleDismiss = () => {
    setClosing(true);
    timer.current = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, 200);
  };

  if (!visible) return null;

  const hasTitle = title !== undefined && title !== null && title !== "";
  const hasMessage = message !== undefined && message !== null && message !== "";
  const hasChildren = React.Children.toArray(children).length > 0;

  const iconColour =
    variant === "default" || variant === "inset"
      ? tone.icon
      : variant === "glass"
        ? tone.glassIcon
        : variant === "soft"
          ? tone.softIcon
          : tone.solidIcon;

  const iconNode =
    icon === undefined ? (
      <Icon
        aria-hidden
        className={cn(
          "size-5",
          type === "loading" && "animate-spin motion-reduce:animate-none",
        )}
      />
    ) : (
      icon
    );

  const dismissButton = dismissible && (
    <button
      type="button"
      onClick={handleDismiss}
      aria-label="Dismiss alert"
      className={cn(
        "flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
        DISMISS[variant],
      )}
    >
      <X aria-hidden className="size-4" />
    </button>
  );

  // Under `sm` the buttons drop to their own row; from `sm` up they sit on the
  // right, so a title and message stay a two-line alert.
  const actionNode = action && (
    <div className="flex shrink-0 items-center gap-2 max-sm:order-last max-sm:w-full max-sm:justify-end sm:self-center">
      {action}
    </div>
  );

  const rootClass = cn(
    "relative w-full transition-all duration-200 ease-out",
    "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2",
    SURFACE[variant],
    toneSurface(variant, tone),
    closing && "scale-[0.98] opacity-0",
  );
  const role = type === "danger" || type === "warning" ? "alert" : "status";

  if (variant === "inset") {
    // With no title the message takes the title's place and there is no well.
    const heading = hasTitle ? title : message;
    const wellMessage = hasTitle && hasMessage;
    const hasWell = wellMessage || hasChildren;
    return (
      <div
        role={role}
        aria-busy={type === "loading" || undefined}
        className={cn(rootClass, "rounded-[1.75rem] p-2", className)}
      >
        <AlertContext.Provider value={{ type, variant }}>
          <div className="flex flex-wrap items-center gap-3 px-2.5 py-2 sm:flex-nowrap sm:px-3">
            {iconNode !== null && iconNode !== false && (
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full bg-background",
                  iconColour,
                  iconClassName,
                )}
              >
                {iconNode}
              </div>
            )}
            <div
              className={cn(
                "min-w-0 flex-1 text-[15px] font-medium leading-6 tracking-[-0.01em] text-foreground",
                titleClassName,
              )}
            >
              {heading}
            </div>
            {actionNode}
            {dismissButton}
          </div>
          {hasWell && (
            <div className="rounded-[1.25rem] bg-[#F7F7F6] px-3.5 py-3 text-sm leading-6 text-foreground/80 dark:bg-background/50 sm:px-4">
              {wellMessage && (
                <p className={cn("text-sm leading-6", messageClassName)}>{message}</p>
              )}
              {hasChildren && <div className={wellMessage ? "mt-2" : undefined}>{children}</div>}
            </div>
          )}
        </AlertContext.Provider>
      </div>
    );
  }

  return (
    <div
      role={role}
      aria-busy={type === "loading" || undefined}
      className={cn(
        rootClass,
        "flex flex-wrap items-start gap-3 rounded-2xl p-4 sm:flex-nowrap",
        className,
      )}
    >
      <AlertContext.Provider value={{ type, variant }}>
        {iconNode !== null && iconNode !== false && (
          <div
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center",
              iconColour,
              iconClassName,
            )}
          >
            {iconNode}
          </div>
        )}

        <div className="min-w-0 flex-1">
          {hasTitle && (
            <div
              className={cn(
                "text-[15px] font-semibold leading-6",
                (variant === "default" || variant === "soft") && "text-foreground",
                titleClassName,
              )}
            >
              {title}
            </div>
          )}
          {hasMessage && (
            <p
              className={cn(
                "text-sm leading-6",
                variant === "default" && "text-muted-foreground",
                variant === "soft" && "text-foreground/75",
                variant === "glass" && "text-white/80",
                variant === "solid" && "text-current/75",
                !hasTitle && "text-[15px] font-medium",
                messageClassName,
              )}
            >
              {message}
            </p>
          )}
          {hasChildren && (
            <div
              className={cn(
                "text-sm",
                (hasTitle || hasMessage) && "mt-2",
                variant === "default" && "text-muted-foreground",
                variant === "soft" && "text-foreground/75",
                variant === "glass" && "text-white/80",
                variant === "solid" && "text-current/75",
              )}
            >
              {children}
            </div>
          )}
        </div>

        {actionNode}
        {dismissButton}
      </AlertContext.Provider>
    </div>
  );
};
