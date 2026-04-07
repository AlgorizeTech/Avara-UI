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
export type AlertVariant = "solid" | "outline";

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
  variant = "solid",
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

  const alertTypes: Record<AlertType, { solid: string; outline: string }> = {
    primary: {
      solid:
        "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800/50 dark:text-blue-300",
      outline:
        "bg-white border-blue-300 text-blue-800 dark:bg-zinc-950 dark:border-blue-800/50 dark:text-blue-400",
    },
    secondary: {
      solid:
        "bg-zinc-100 border-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200",
      outline:
        "bg-white border-zinc-300 text-zinc-800 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300",
    },
    success: {
      solid:
        "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-300",
      outline:
        "bg-white border-green-300 text-green-800 dark:bg-zinc-950 dark:border-green-800/50 dark:text-green-400",
    },
    danger: {
      solid:
        "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-300",
      outline:
        "bg-white border-red-300 text-red-800 dark:bg-zinc-950 dark:border-red-800/50 dark:text-red-400",
    },
    warning: {
      solid:
        "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800/50 dark:text-yellow-300",
      outline:
        "bg-white border-yellow-300 text-yellow-800 dark:bg-zinc-950 dark:border-yellow-800/50 dark:text-yellow-400",
    },
    info: {
      solid:
        "bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-900/20 dark:border-cyan-800/50 dark:text-cyan-300",
      outline:
        "bg-white border-cyan-300 text-cyan-800 dark:bg-zinc-950 dark:border-cyan-800/50 dark:text-cyan-400",
    },
    dark: {
      solid:
        "bg-zinc-800 border-zinc-700 text-zinc-100 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100",
      outline:
        "bg-white border-zinc-400 text-zinc-800 dark:bg-zinc-950 dark:border-zinc-700 dark:text-zinc-200",
    },
  };

  const alertConfig = alertTypes[type] || alertTypes.info;
  const alertClasses = alertConfig[variant] || alertConfig.solid;

  const renderIcon = (
    iconProp: React.ReactNode | string | null,
  ): React.ReactNode => {
    if (iconProp === null) return null;
    if (typeof iconProp === "string") {
      if (ICON_MAP[iconProp]) {
        const MappedIcon = ICON_MAP[iconProp];
        return <MappedIcon className="w-5 h-5" />;
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
        `relative flex items-start p-4 border rounded-xl shadow-sm transition-all duration-300 ease-in-out`,
        alertClasses,
        isAnimating
          ? "opacity-0 transform scale-[0.98]"
          : "opacity-100 transform scale-100",
        className,
      )}
      role="alert"
    >
      {icon !== null && icon && (
        <div
          className={cn(
            `flex-shrink-0 mr-3 mt-0.5`,
            !title ? "self-center mt-0" : "",
            iconClassName,
          )}
        >
          {renderIcon(icon)}
        </div>
      )}

      <div className={cn(`flex-1 min-w-0`, !title ? "flex items-center" : "")}>
        {title && (
          <h4
            className={cn(`font-semibold mb-1 tracking-tight`, titleClassName)}
          >
            {title}
          </h4>
        )}
        {message && (
          <p className={cn(`text-sm opacity-90`, messageClassName)}>
            {message}
          </p>
        )}
        {children && <div className="mt-3">{children}</div>}
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          className={cn(
            `flex-shrink-0 ml-4 p-1 rounded-md cursor-pointer opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all`,
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
