"use client";

import React, { useState } from "react";

/**
 * Alert Component - A reusable alert component with multiple variants and customization options
 *
 * @param {Object} props - The component props
 * @param {'primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'} [props.type='info'] - The alert type/theme
 * @param {'solid'|'outline'} [props.variant='solid'] - The alert variant style
 * @param {boolean} [props.dismissible=false] - Whether the alert can be dismissed
 * @param {React.ReactNode|string|null} [props.icon=null] - Custom icon (Lucide React component, SVG, string emoji, or null)
 * @param {string|null} [props.title=null] - Alert title text
 * @param {string} [props.message=''] - Alert message text
 * @param {string} [props.className=''] - Additional CSS classes for the main alert container
 * @param {string} [props.titleClassName=''] - Additional CSS classes for the title element
 * @param {string} [props.messageClassName=''] - Additional CSS classes for the message element
 * @param {string} [props.iconClassName=''] - Additional CSS classes for the icon container
 * @param {string} [props.dismissIconClassName=''] - Additional CSS classes for the dismiss button
 * @param {Function|null} [props.onDismiss=null] - Callback function called when alert is dismissed
 * @param {React.ReactNode|null} [props.children=null] - Additional content to render inside the alert
 * @returns {React.ReactElement|null} The rendered Alert component or null if dismissed
 *
 * @example
 * // With Lucide React icon
 * <Alert type="success" icon={<CheckCircle className="w-5 h-5" />} message="Success!" />
 *
 * @example
 * // With emoji string
 * <Alert type="warning" icon="⚠️" message="Warning message" />
 *
 * @example
 * // With custom SVG
 * <Alert type="info" icon={<svg>...</svg>} message="Custom icon" />
 */
type AlertType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark";

type AlertVariant = "solid" | "outline";

interface AlertProps {
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

  /**
   * Alert type configurations with styling and default icons
   * @type {Object.<string, {solid: string, outline: string}>}
   */
  const alertTypes: Record<AlertType, { solid: string; outline: string }> = {
    primary: {
      solid:
        "bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800/50 dark:text-blue-200",
      outline:
        "bg-white border-blue-300 text-blue-800 dark:bg-gray-800 dark:border-blue-600/50 dark:text-blue-300",
    },
    secondary: {
      solid:
        "bg-gray-100 border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700/50 dark:text-gray-200",
      outline:
        "bg-white border-gray-300 text-gray-800 dark:bg-gray-900 dark:border-gray-600/50 dark:text-gray-300",
    },
    success: {
      solid:
        "bg-green-100 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-200",
      outline:
        "bg-white border-green-300 text-green-800 dark:bg-gray-800 dark:border-green-600/50 dark:text-green-300",
    },
    danger: {
      solid:
        "bg-red-100 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-200",
      outline:
        "bg-white border-red-300 text-red-800 dark:bg-gray-800 dark:border-red-600/50 dark:text-red-300",
    },
    warning: {
      solid:
        "bg-yellow-100 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800/50 dark:text-yellow-200",
      outline:
        "bg-white border-yellow-300 text-yellow-800 dark:bg-gray-800 dark:border-yellow-600/50 dark:text-yellow-300",
    },
    info: {
      solid:
        "bg-cyan-100 border-cyan-200 text-cyan-800 dark:bg-cyan-900/20 dark:border-cyan-800/50 dark:text-cyan-200",
      outline:
        "bg-white border-cyan-300 text-cyan-800 dark:bg-gray-800 dark:border-cyan-600/50 dark:text-cyan-300",
    },
    dark: {
      solid:
        "bg-gray-800 border-gray-700 text-gray-100 dark:bg-gray-900 dark:border-gray-600/50 dark:text-gray-100",
      outline:
        "bg-white border-gray-400 text-gray-800 dark:bg-gray-800 dark:border-gray-500/50 dark:text-gray-200",
    },
  };

  // Get alert configuration
  const alertConfig = alertTypes[type] || alertTypes.info;
  const alertClasses = alertConfig[variant] || alertConfig.solid;

  /**
   * Renders the appropriate icon based on its type
   * Supports Lucide React components, SVG elements, and string emojis
   * @param {React.ReactNode|string|null} iconProp - The icon to render
   * @returns {React.ReactNode} The rendered icon
   */
  const renderIcon = (
    iconProp: React.ReactNode | string | null,
  ): React.ReactNode => {
    if (iconProp === null) return null;
    if (typeof iconProp === "string")
      return <span className="text-lg">{iconProp}</span>;
    if (React.isValidElement(iconProp)) return iconProp;
    return null;
  };

  /**
   * Handles the dismiss action with animation
   * Calls onDismiss callback if provided and triggers fade-out animation
   */
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`
        relative flex items-start p-4 border rounded-lg
        transition-all duration-300 ease-in-out
        ${alertClasses}
        ${isAnimating ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"}
        ${className}
      `}
      role="alert"
    >
      {/* Icon */}
      {icon !== null && icon && (
        <div
          className={`flex-shrink-0 mr-3 ${!title ? "self-center" : ""} ${iconClassName}`}
        >
          {renderIcon(icon)}
        </div>
      )}

      {/* Content */}
      <div className={`flex-1 min-w-0 ${!title ? "flex items-center" : ""}`}>
        {title && (
          <h4 className={`font-semibold mb-1 ${titleClassName}`}>{title}</h4>
        )}
        {message && <p className={`text-sm ${messageClassName}`}>{message}</p>}
        {children && <div className="mt-2">{children}</div>}
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className={`
            flex-shrink-0 ml-3 p-1 rounded-md cursor-pointer
            ${dismissIconClassName}
          `}
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
