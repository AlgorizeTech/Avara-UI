"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, Bell, CheckCircle2, Info, XCircle } from "lucide-react";
import React, { useState } from "react";

const ICON_MAP: Record<string, React.ElementType> = {
  CheckCircle2,
  AlertTriangle,
  Info,
  Bell,
  XCircle,
};

export type AlertType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark";

// Added three new modern variants!
export type AlertVariant = "solid" | "outline" | "modern" | "glass" | "glow";

export interface AlertProps {
  type?: AlertType;
  variant?: AlertVariant;
  dismissible?: boolean;
  icon?: React.ReactNode | string | null;
  title?: string | null;
  message?: string;
  className?: string;
  titleClassName?: string;
  messageClassName?: string;
  iconClassName?: string;
  dismissIconClassName?: string;
  onDismiss?: (() => void) | null;
  children?: React.ReactNode | null;
}

export const Alert: React.FC<AlertProps> = ({
  type = "primary",
  variant = "modern",
  dismissible = false,
  icon = null,
  title = null,
  message = "",
  className = "",
  titleClassName = "",
  messageClassName = "",
  iconClassName = "",
  dismissIconClassName = "",
  onDismiss = null,
  children = null,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Expanded dictionary with modern styles and beautiful ambient shadows
  const alertTypes: Record<AlertType, Record<AlertVariant, string>> = {
    primary: {
      solid:
        "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800/50 dark:text-blue-300",
      outline:
        "bg-white border-blue-300 text-blue-800 dark:bg-zinc-950 dark:border-blue-800/50 dark:text-blue-400",
      modern:
        "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-blue-500 shadow-xl shadow-blue-500/10 text-zinc-800 dark:text-zinc-200",
      glass:
        "bg-blue-500/10 dark:bg-blue-500/15 backdrop-blur-xl border border-blue-500/20 text-blue-800 dark:text-blue-300 shadow-lg",
      glow: "bg-zinc-950 border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)] text-blue-400",
    },
    secondary: {
      solid:
        "bg-zinc-100 border-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200",
      outline:
        "bg-white border-zinc-300 text-zinc-800 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300",
      modern:
        "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-zinc-500 shadow-xl shadow-zinc-500/10 text-zinc-800 dark:text-zinc-200",
      glass:
        "bg-zinc-500/10 dark:bg-zinc-500/15 backdrop-blur-xl border border-zinc-500/20 text-zinc-800 dark:text-zinc-300 shadow-lg",
      glow: "bg-zinc-950 border border-zinc-500/50 shadow-[0_0_20px_rgba(113,113,122,0.3)] text-zinc-400",
    },
    success: {
      solid:
        "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-300",
      outline:
        "bg-white border-green-300 text-green-800 dark:bg-zinc-950 dark:border-green-800/50 dark:text-green-400",
      modern:
        "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-green-500 shadow-xl shadow-green-500/10 text-zinc-800 dark:text-zinc-200",
      glass:
        "bg-green-500/10 dark:bg-green-500/15 backdrop-blur-xl border border-green-500/20 text-green-800 dark:text-green-300 shadow-lg",
      glow: "bg-zinc-950 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)] text-green-400",
    },
    danger: {
      solid:
        "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-300",
      outline:
        "bg-white border-red-300 text-red-800 dark:bg-zinc-950 dark:border-red-800/50 dark:text-red-400",
      modern:
        "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-red-500 shadow-xl shadow-red-500/10 text-zinc-800 dark:text-zinc-200",
      glass:
        "bg-red-500/10 dark:bg-red-500/15 backdrop-blur-xl border border-red-500/20 text-red-800 dark:text-red-300 shadow-lg",
      glow: "bg-zinc-950 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] text-red-400",
    },
    warning: {
      solid:
        "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800/50 dark:text-yellow-300",
      outline:
        "bg-white border-yellow-300 text-yellow-800 dark:bg-zinc-950 dark:border-yellow-800/50 dark:text-yellow-400",
      modern:
        "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-yellow-500 shadow-xl shadow-yellow-500/10 text-zinc-800 dark:text-zinc-200",
      glass:
        "bg-yellow-500/10 dark:bg-yellow-500/15 backdrop-blur-xl border border-yellow-500/20 text-yellow-800 dark:text-yellow-300 shadow-lg",
      glow: "bg-zinc-950 border border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)] text-yellow-400",
    },
    info: {
      solid:
        "bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-900/20 dark:border-cyan-800/50 dark:text-cyan-300",
      outline:
        "bg-white border-cyan-300 text-cyan-800 dark:bg-zinc-950 dark:border-cyan-800/50 dark:text-cyan-400",
      modern:
        "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-cyan-500 shadow-xl shadow-cyan-500/10 text-zinc-800 dark:text-zinc-200",
      glass:
        "bg-cyan-500/10 dark:bg-cyan-500/15 backdrop-blur-xl border border-cyan-500/20 text-cyan-800 dark:text-cyan-300 shadow-lg",
      glow: "bg-zinc-950 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] text-cyan-400",
    },
    dark: {
      solid:
        "bg-zinc-800 border-zinc-700 text-zinc-100 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100",
      outline:
        "bg-white border-zinc-400 text-zinc-800 dark:bg-zinc-950 dark:border-zinc-700 dark:text-zinc-200",
      modern:
        "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-zinc-800 dark:border-l-zinc-100 shadow-xl shadow-zinc-900/10 text-zinc-800 dark:text-zinc-200",
      glass:
        "bg-zinc-800/10 dark:bg-zinc-100/10 backdrop-blur-xl border border-zinc-800/20 dark:border-zinc-100/20 text-zinc-800 dark:text-zinc-300 shadow-lg",
      glow: "bg-zinc-950 border border-zinc-500/50 shadow-[0_0_20px_rgba(255,255,255,0.1)] text-zinc-300",
    },
  };

  const alertConfig = alertTypes[type] || alertTypes.info;
  const alertClasses = alertConfig[variant] || alertConfig.modern;

  const renderIcon = (
    iconProp: React.ReactNode | string | null,
  ): React.ReactNode => {
    if (iconProp === null) return null;
    if (typeof iconProp === "string") {
      if (ICON_MAP[iconProp]) {
        const MappedIcon = ICON_MAP[iconProp];
        return (
          <MappedIcon
            className={cn("w-5 h-5", variant === "glow" && "animate-pulse")}
          />
        );
      }
      return <span className="text-lg leading-none">{iconProp}</span>;
    }
    if (React.isValidElement(iconProp)) return iconProp;
    return null;
  };

  const handleDismiss = () => {
    if (onDismiss) onDismiss();
    setIsAnimating(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        `relative flex items-start p-4 rounded-xl transition-all duration-300 ease-in-out overflow-hidden`,
        // Default border fallback for old variants
        (variant === "solid" || variant === "outline") && "border shadow-sm",
        // Smooth entrance animation
        "animate-in fade-in slide-in-from-top-4 duration-500",
        alertClasses,
        isAnimating
          ? "opacity-0 transform scale-[0.96]"
          : "opacity-100 transform scale-100",
        className,
      )}
      role="alert"
    >
      {/* Decorative Shine for Glass Variant */}
      {variant === "glass" && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_infinite]" />
      )}

      {icon !== null && icon && (
        <div
          className={cn(
            `flex-shrink-0 mr-3 mt-0.5 relative z-10`,
            !title ? "self-center mt-0" : "",
            iconClassName,
          )}
        >
          {renderIcon(icon)}
        </div>
      )}

      <div
        className={cn(
          `flex-1 min-w-0 relative z-10`,
          !title ? "flex items-center" : "",
          dismissible && "pr-6",
        )}
      >
        {title && (
          <h4 className={cn(`font-bold mb-1 tracking-tight`, titleClassName)}>
            {title}
          </h4>
        )}
        {message && (
          <p className={cn(`text-sm opacity-90 font-medium`, messageClassName)}>
            {message}
          </p>
        )}
        {children && <div className="mt-3 relative z-10">{children}</div>}
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          className={cn(
            `absolute top-3 right-3 p-1 rounded-md cursor-pointer opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all z-10 active:scale-90`,
            dismissIconClassName,
          )}
          aria-label="Dismiss alert"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
