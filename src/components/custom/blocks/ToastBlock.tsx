"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { AlertCircle, AlertTriangle, BadgeCheck, CheckCircle2, Info, X } from "lucide-react";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ToastContext, type ToastProps, type ToastType, getThemeStyles } from "./toast-context";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type ToastColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});
export type ToastVariant = "default" | "glow" | "glass" | "minimal";
export type ToastPosition = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";

// Accent each type bleeds into the glass card. `default` falls back to the
// provider color so the tint always matches the theme.
const TYPE_TINT: Record<Exclude<ToastType, "default">, string> = {
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
};
const NAMED_TINT: Record<string, string> = {
  primary: "var(--primary)",
  indigo: "#6366f1",
  rose: "#f43f5e",
  emerald: "#10b981",
  zinc: "#a1a1aa",
};

// Stack geometry: how far each card behind the front one peeks out, how much
// it shrinks, how many stay visible, and the gap between cards once expanded.
const STACK_PEEK = 12;
const STACK_SCALE = 0.05;
const STACK_VISIBLE = 3;
const STACK_GAP = 12;

// ==========================================
// INDIVIDUAL TOAST COMPONENT (With GSAP)
// ==========================================
interface ToastItemProps extends ToastProps {
  onRemove: (id: string) => void;
  variant: ToastVariant;
  color: ToastColor;
  position: ToastPosition;
  /** Freezes the auto-dismiss timer — used by the stack while it is expanded. */
  paused?: boolean;
}

const ToastItem = ({ id, title, description, type = "default", duration = 5000, action, onRemove, variant, color, position, paused = false }: ToastItemProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { theme, style } = getThemeStyles(color);

  // Determine entrance direction based on position
  const isTop = position.includes("top");
  const yOffset = isTop ? -30 : 30;

  // Handle Exit
  const handleClose = useCallback(() => {
    if (!toastRef.current) return;
    gsap.to(toastRef.current, {
      opacity: 0,
      scale: 0.9,
      y: yOffset,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => onRemove(id)
    });
  }, [id, onRemove, yOffset]);

  // Handle Entrance
  useEffect(() => {
    const el = toastRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: yOffset, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
    );
  }, [yOffset]);

  // Auto-dismiss with a pausable timer: hovering the card (or the expanded
  // stack) stops the clock and resumes from where it left off.
  const remaining = useRef(duration);
  const startedAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPaused = paused || hovered;

  useEffect(() => {
    if (duration <= 0 || isPaused) return;
    startedAt.current = Date.now();
    timer.current = setTimeout(handleClose, remaining.current);
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
      timer.current = null;
      remaining.current = Math.max(0, remaining.current - (Date.now() - startedAt.current));
    };
  }, [duration, isPaused, handleClose]);

  // Styling logic
  const typeStyles = {
    success: { icon: variant === "glass" ? BadgeCheck : CheckCircle2, iconColor: "text-emerald-500" },
    error: { icon: AlertCircle, iconColor: "text-red-500" },
    warning: { icon: AlertTriangle, iconColor: "text-amber-500" },
    info: { icon: Info, iconColor: "text-blue-500" },
    default: { icon: null, iconColor: "" },
  };
  const { icon: Icon, iconColor } = typeStyles[type];

  const variantStyles = {
    default: "bg-background border border-border shadow-xl",
    glow: cn("bg-white dark:bg-[#09090b] shadow-lg border", theme.glow),
    // Frosted dark card with the type accent bleeding in from the icon corner.
    glass: "rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/40",
    minimal: cn("border-l-4 rounded-l-none bg-background shadow-md", theme.border),
  };

  const isGlass = variant === "glass";
  const tint = type === "default"
    ? (color.startsWith("#") ? color : NAMED_TINT[color] ?? NAMED_TINT.primary)
    : TYPE_TINT[type];
  const glassStyle: React.CSSProperties = isGlass
    ? { backgroundImage: `radial-gradient(140% 120% at 0% 0%, color-mix(in oklab, ${tint} 32%, transparent) 0%, transparent 60%)` }
    : {};

  return (
    <div
      ref={toastRef}
      className={cn("pointer-events-auto flex w-full max-w-sm items-start gap-4 rounded-xl p-4 transition-colors", variantStyles[variant])}
      style={{ ...style, ...glassStyle }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {Icon && (
        <Icon
          className={cn(
            "mt-0.5 w-5 h-5 shrink-0",
            iconColor,
            // Glass icons are solid badges: fill with the accent, cut the glyph out in the card colour.
            isGlass && "w-6 h-6 fill-current stroke-white dark:stroke-zinc-950",
          )}
        />
      )}

      <div className="flex flex-col gap-1 w-full min-w-0">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}

        {action && (
          <button onClick={() => { action.onClick(); handleClose(); }} className={cn("mt-2 w-max text-xs font-bold transition-colors active:scale-95", theme.text, "hover:opacity-70")}>
            {action.label}
          </button>
        )}
      </div>

      <button onClick={handleClose} className={cn("shrink-0 p-1 rounded-md opacity-50 hover:opacity-100 hover:bg-muted transition-all", isGlass && "self-center")}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// ==========================================
// STACK SLOT (measures its toast so the expanded stack can lay cards out)
// ==========================================
interface StackSlotProps {
  id: string;
  onHeight: (id: string, height: number) => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const StackSlot = ({ id, onHeight, className, style, children }: StackSlotProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const report = () => onHeight(id, el.offsetHeight);
    report();
    const observer = new ResizeObserver(report);
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, onHeight]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

// ==========================================
// TOAST PROVIDER (WRAPPER)
// ==========================================
export interface ToastProviderProps {
  children: React.ReactNode;
  variant?: ToastVariant;
  color?: ToastColor;
  position?: ToastPosition;
  /**
   * Piles toasts on top of each other — the newest in front, older ones
   * peeking out behind it. Hovering the pile fans it out into a list.
   */
  stack?: boolean;
}

export function ToastProvider({ children, variant = "default", color = "primary", position = "bottom-right", stack = false }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [hovered, setHovered] = useState(false);
  const [heights, setHeights] = useState<Record<string, number>>({});

  const toast = useCallback((props: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...props }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    setHeights((prev) => {
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const reportHeight = useCallback((id: string, height: number) => {
    setHeights((prev) => (prev[id] === height ? prev : { ...prev, [id]: height }));
  }, []);

  const isTop = position.startsWith("top");
  const expanded = stack && hovered;

  // The stack is one absolutely-laid-out column, so it only needs a corner.
  const stackPositionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  // No overflow clipping here: variants like `glow` paint outside the card
  // via box-shadow, and a clipped container would crop the halo on every edge.
  const positionClasses = {
    "top-right": "top-0 right-0 sm:top-4 sm:right-4 flex-col",
    "top-left": "top-0 left-0 sm:top-4 sm:left-4 flex-col",
    "top-center": "top-0 left-1/2 -translate-x-1/2 sm:top-4 flex-col",
    "bottom-right": "bottom-0 right-0 sm:bottom-4 sm:right-4 flex-col-reverse",
    "bottom-left": "bottom-0 left-0 sm:bottom-4 sm:left-4 flex-col-reverse",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 sm:bottom-4 flex-col-reverse",
  };

  // Stack layout: index 0 is the front (newest) card. Collapsed cards sit
  // behind the front one, each nudged out and scaled down a little; expanded
  // cards are laid out by their measured heights so nothing overlaps.
  const ordered = stack ? [...toasts].reverse() : toasts;
  const offsets: number[] = [];
  let running = 0;
  ordered.forEach((t, i) => {
    offsets[i] = expanded ? running : i * STACK_PEEK;
    running += (heights[t.id] ?? 0) + STACK_GAP;
  });
  const stackHeight = Math.max(running - STACK_GAP, 0) + STACK_PEEK * (STACK_VISIBLE - 1);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {stack ? (
        <div
          className={cn(
            "fixed z-[100] w-[calc(100%-2rem)] sm:w-96",
            expanded ? "pointer-events-auto" : "pointer-events-none",
            stackPositionClasses[position],
          )}
          style={{ height: stackHeight }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {ordered.map((t, i) => {
            const hidden = !expanded && i >= STACK_VISIBLE;
            const scale = expanded ? 1 : 1 - i * STACK_SCALE;
            const translate = isTop ? offsets[i] : -offsets[i];
            return (
              <StackSlot
                key={t.id}
                id={t.id}
                onHeight={reportHeight}
                className={cn(
                  "absolute inset-x-0 transition-all duration-300 ease-out",
                  isTop ? "top-0" : "bottom-0",
                  hidden && "opacity-0 pointer-events-none",
                )}
                style={{
                  zIndex: 100 - i,
                  transform: `translateY(${translate}px) scale(${scale})`,
                  transformOrigin: isTop ? "top center" : "bottom center",
                }}
              >
                <ToastItem {...t} onRemove={dismiss} variant={variant} color={color} position={position} paused={expanded} />
              </StackSlot>
            );
          })}
        </div>
      ) : (
        <div className={cn("fixed z-[100] flex max-h-screen w-full sm:w-auto p-4 sm:p-0 gap-3 pointer-events-none", positionClasses[position])}>
          {toasts.map((t) => (
            <ToastItem key={t.id} {...t} onRemove={dismiss} variant={variant} color={color} position={position} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}
