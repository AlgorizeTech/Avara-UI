"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

// ==========================================
// 1. GLOBAL STATE OBSERVER
// ==========================================
export type ToastType = "default" | "success" | "error" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  action?: ToastAction;
}

type ToastOptions = Omit<ToastProps, "id" | "title">;

class ToastObserver {
  private toasts: ToastProps[] = [];
  private listeners: Set<(toasts: ToastProps[]) => void> = new Set();

  subscribe(listener: (toasts: ToastProps[]) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  add(title: string, options?: ToastOptions) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastProps = { id, title, duration: 4000, ...options };

    // Add to front of array
    this.toasts = [newToast, ...this.toasts].slice(0, 5); // Max 5 in stack
    this.notify();

    if (newToast.duration !== Infinity) {
      setTimeout(() => this.dismiss(id), newToast.duration);
    }
    return id;
  }

  dismiss(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  clear() {
    this.toasts = [];
    this.notify();
  }
}

export const toastState = new ToastObserver();

// ==========================================
// 2. EXPORTED TOAST API
// ==========================================
export const toast = (title: string, options?: ToastOptions) =>
  toastState.add(title, options);
toast.success = (title: string, options?: ToastOptions) =>
  toastState.add(title, { ...options, type: "success" });
toast.error = (title: string, options?: ToastOptions) =>
  toastState.add(title, { ...options, type: "error" });
toast.info = (title: string, options?: ToastOptions) =>
  toastState.add(title, { ...options, type: "info" });
toast.dismiss = (id: string) => toastState.dismiss(id);

// ==========================================
// 3. TOASTER COMPONENT (Mounts at App Root)
// ==========================================
export interface ToasterProps {
  position?:
    | "bottom-right"
    | "bottom-center"
    | "bottom-left"
    | "top-right"
    | "top-center"
    | "top-left";
  expand?: boolean;
}

export function Toaster({
  position = "bottom-right",
  expand = false,
}: ToasterProps) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    return toastState.subscribe(setToasts);
  }, []);
  

  if (toasts.length === 0) return null;

  const positionClasses = {
    "bottom-right": "bottom-3 right-3 sm:bottom-4 sm:right-4 flex-col-reverse items-end",
    "bottom-center": "bottom-3 left-1/2 -translate-x-1/2 sm:bottom-4 flex-col-reverse items-center",
    "bottom-left": "bottom-3 left-3 sm:bottom-4 sm:left-4 flex-col-reverse items-start",
    "top-right": "top-3 right-3 sm:top-4 sm:right-4 flex-col items-end",
    "top-center": "top-3 left-1/2 -translate-x-1/2 sm:top-4 flex-col items-center",
    "top-left": "top-3 left-3 sm:top-4 sm:left-4 flex-col items-start",
  };

  const isTop = position.startsWith("top");

  return (
    <div
      className={cn(
        "fixed z-[9999] p-2.5 sm:p-4 flex outline-none pointer-events-none w-[calc(100vw-20px)] max-w-[260px] xs:max-w-[280px] sm:max-w-none sm:w-[356px]",
        positionClasses[position],
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex w-full flex-col items-center">
        {toasts.map((t, index) => {
          // Math for the stacking effect
          const isFront = index === 0;
          const isExpanded = expand || isHovered;

          // Calculate transforms based on position in stack
          const offset = isExpanded ? index * 10 + index * 56 : index * 12;
          const scale = isExpanded ? 1 : 1 - index * 0.05;
          const translateY = isTop ? offset : -offset;

          return (
            <div
              key={t.id}
              className={cn(
                "absolute w-full transition-all duration-300 ease-out pointer-events-auto",
                isTop ? "top-0" : "bottom-0",
                isFront || isExpanded
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none",
              )}
              style={{
                zIndex: 100 - index,
                transform: `translateY(${translateY}px) scale(${scale})`,
                transformOrigin: isTop ? "top center" : "bottom center",
                opacity: index > 2 && !isExpanded ? 0 : undefined,
              }}
            >
              <ToastCard toast={t} onDismiss={() => toast.dismiss(t.id)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 4. INDIVIDUAL TOAST CARD
// ==========================================
function ToastCard({
  toast,
  isTop,
  onDismiss,
}: {
  toast: ToastProps;
  isTop?: boolean;
  onDismiss: () => void;
}) {
  const { title, description, type = "default", action } = toast;

  const typeStyles = {
    default:
      "bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800",
    success:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100 border-emerald-200 dark:border-emerald-500/20",
    error:
      "bg-red-50 dark:bg-red-500/10 text-red-900 dark:text-red-100 border-red-200 dark:border-red-500/20",
    info: "bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-500/20",
  };

  const IconMap = {
    default: null,
    success: (
      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-500 mt-0.5 shrink-0" />
    ),
    error: (
      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-500 mt-0.5 shrink-0" />
    ),
    info: (
      <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-500 mt-0.5 shrink-0" />
    ),
  };

  return (
    <div
      className={cn(
        "group flex items-start gap-2 sm:gap-3 w-full p-2.5 sm:p-4 rounded-xl border shadow-lg backdrop-blur-md",
        typeStyles[type],
      )}
    >
      {IconMap[type]}

      <div className="flex flex-col gap-0.5 sm:gap-1 w-full min-w-0 pr-3 sm:pr-0">
        <div className="font-semibold text-[11px] xs:text-xs sm:text-sm leading-tight">{title}</div>
        {description && (
          <div className="text-[10px] xs:text-xs sm:text-sm opacity-80 line-clamp-2">{description}</div>
        )}

        {action && (
          <button
            onClick={() => {
              action.onClick();
              onDismiss();
            }}
            className="mt-1 sm:mt-2 w-max px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
          >
            {action.label}
          </button>
        )}
      </div>

      <button
        onClick={onDismiss}
        className="shrink-0 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all absolute right-2 top-2"
        aria-label="Close"
      >
        <X className="w-4 h-4 opacity-70" />
      </button>
    </div>
  );
}
