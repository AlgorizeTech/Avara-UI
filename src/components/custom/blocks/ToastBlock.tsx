"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type ToastColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type ToastVariant = "default" | "glow" | "glass" | "minimal";
export type ToastType = "success" | "error" | "info" | "warning" | "default";
export type ToastPosition = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";

const colorThemes: Record<string, Record<string, string>> = {
  primary: { bg: "bg-primary text-primary-foreground", text: "text-primary", bgSoft: "bg-primary/10", border: "border-primary", glow: "shadow-[0_0_20px_var(--primary)] border-primary" },
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-600", glow: "shadow-[0_0_20px_rgba(99,102,241,0.4)] border-indigo-500" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", bgSoft: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-600", glow: "shadow-[0_0_20px_rgba(244,63,94,0.4)] border-rose-500" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-600", glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)] border-emerald-500" },
  zinc: { bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50", border: "border-zinc-900 dark:border-zinc-100", glow: "shadow-[0_0_20px_rgba(255,255,255,0.15)] border-zinc-900 dark:border-white" },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        bg: "bg-[var(--theme-color)] text-white",
        text: "text-[var(--theme-color)]",
        bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)]",
        border: "border-[var(--theme-color)]",
        glow: "shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.5)] border-[var(--theme-color)]",
      },
      style: { "--theme-color": color, "--theme-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

// ==========================================
// TOAST TYPES & CONTEXT
// ==========================================
export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastContextType {
  toast: (props: Omit<ToastProps, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

// ==========================================
// INDIVIDUAL TOAST COMPONENT (With GSAP)
// ==========================================
interface ToastItemProps extends ToastProps {
  onRemove: (id: string) => void;
  variant: ToastVariant;
  color: ToastColor;
  position: ToastPosition;
}

const ToastItem = ({ id, title, description, type = "default", duration = 5000, action, onRemove, variant, color, position }: ToastItemProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
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

  // Handle Entrance & Auto-dismiss
  useEffect(() => {
    const el = toastRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: yOffset, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
    );

    let timer: NodeJS.Timeout;
    if (duration > 0) {
      timer = setTimeout(() => handleClose(), duration);
    }
    return () => clearTimeout(timer);
  }, [duration, yOffset, handleClose]);

  // Styling logic
  const typeStyles = {
    success: { icon: CheckCircle2, iconColor: "text-emerald-500" },
    error: { icon: AlertCircle, iconColor: "text-red-500" },
    warning: { icon: AlertTriangle, iconColor: "text-amber-500" },
    info: { icon: Info, iconColor: "text-blue-500" },
    default: { icon: null, iconColor: "" },
  };
  const { icon: Icon, iconColor } = typeStyles[type];

  const variantStyles = {
    default: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl",
    glow: cn("bg-white dark:bg-[#09090b] shadow-lg border", theme.glow),
    glass: "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl",
    minimal: cn("border-l-4 rounded-l-none bg-white dark:bg-zinc-950 shadow-md", theme.border),
  };

  return (
    <div ref={toastRef} className={cn("pointer-events-auto flex w-full max-w-sm items-start gap-4 rounded-xl p-4 transition-colors", variantStyles[variant])} style={style}>
      {Icon && <Icon className={cn("mt-0.5 w-5 h-5 shrink-0", iconColor)} />}
      
      <div className="flex flex-col gap-1 w-full min-w-0">
        <h3 className={cn("text-sm font-bold", variant === "glass" ? "text-zinc-900 dark:text-white" : "text-zinc-900 dark:text-zinc-100")}>{title}</h3>
        {description && <p className={cn("text-sm", variant === "glass" ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-500 dark:text-zinc-400")}>{description}</p>}
        
        {action && (
          <button onClick={() => { action.onClick(); handleClose(); }} className={cn("mt-2 w-max text-xs font-bold transition-colors active:scale-95", theme.text, "hover:opacity-70")}>
            {action.label}
          </button>
        )}
      </div>

      <button onClick={handleClose} className="shrink-0 p-1 rounded-md opacity-50 hover:opacity-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
        <X className="w-4 h-4" />
      </button>
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
}

export function ToastProvider({ children, variant = "default", color = "indigo", position = "bottom-right" }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback((props: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...props }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const positionClasses = {
    "top-right": "top-0 right-0 sm:top-4 sm:right-4 flex-col",
    "top-left": "top-0 left-0 sm:top-4 sm:left-4 flex-col",
    "top-center": "top-0 left-1/2 -translate-x-1/2 sm:top-4 flex-col",
    "bottom-right": "bottom-0 right-0 sm:bottom-4 sm:right-4 flex-col-reverse",
    "bottom-left": "bottom-0 left-0 sm:bottom-4 sm:left-4 flex-col-reverse",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 sm:bottom-4 flex-col-reverse",
  };

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className={cn("fixed z-[100] flex max-h-screen w-full sm:w-auto p-4 sm:p-0 gap-3 pointer-events-none overflow-hidden", positionClasses[position])}>
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} onRemove={dismiss} variant={variant} color={color} position={position} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}