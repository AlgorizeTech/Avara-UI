"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ToastContext, type ToastProps, getThemeStyles } from "./toast-context";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type ToastColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type ToastVariant = "default" | "glow" | "glass" | "minimal";
export type ToastPosition = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";

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

    let timer: ReturnType<typeof setTimeout>;
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
    default: "bg-background border border-border shadow-xl",
    glow: cn("bg-white dark:bg-[#09090b] shadow-lg border", theme.glow),
    glass: "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl",
    minimal: cn("border-l-4 rounded-l-none bg-background shadow-md", theme.border),
  };

  return (
    <div ref={toastRef} className={cn("pointer-events-auto flex w-full max-w-sm items-start gap-4 rounded-xl p-4 transition-colors", variantStyles[variant])} style={style}>
      {Icon && <Icon className={cn("mt-0.5 w-5 h-5 shrink-0", iconColor)} />}
      
      <div className="flex flex-col gap-1 w-full min-w-0">
        <h3 className={cn("text-sm font-bold", variant === "glass" ? "text-foreground" : "text-foreground")}>{title}</h3>
        {description && <p className={cn("text-sm", variant === "glass" ? "text-foreground" : "text-muted-foreground")}>{description}</p>}
        
        {action && (
          <button onClick={() => { action.onClick(); handleClose(); }} className={cn("mt-2 w-max text-xs font-bold transition-colors active:scale-95", theme.text, "hover:opacity-70")}>
            {action.label}
          </button>
        )}
      </div>

      <button onClick={handleClose} className="shrink-0 p-1 rounded-md opacity-50 hover:opacity-100 hover:bg-muted transition-all">
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

export function ToastProvider({ children, variant = "default", color = "primary", position = "bottom-right" }: ToastProviderProps) {
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