"use client";

import {
  Alert,
  AlertType,
  AlertVariant,
} from "@/components/custom/blocks/Alerts";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const ALERT_ENGINE_CODE_TS = `"use client";

import { AlertTriangle, Bell, CheckCircle2, Info, XCircle } from "lucide-react";
import React, { useState } from "react";

const ICON_MAP: Record<string, React.ElementType> = {
  CheckCircle2, AlertTriangle, Info, Bell, XCircle,
};

export type AlertType = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark";
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
  type = "primary", variant = "solid", dismissible = false, icon = null, title = null, message = "", className = "", titleClassName = "", messageClassName = "", iconClassName = "", dismissIconClassName = "", onDismiss = null, children = null,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const alertTypes: Record<AlertType, { solid: string; outline: string }> = {
    primary: { solid: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800/50 dark:text-blue-300", outline: "bg-white border-blue-300 text-blue-800 dark:bg-zinc-950 dark:border-blue-800/50 dark:text-blue-400" },
    secondary: { solid: "bg-zinc-100 border-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200", outline: "bg-white border-zinc-300 text-zinc-800 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300" },
    success: { solid: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-300", outline: "bg-white border-green-300 text-green-800 dark:bg-zinc-950 dark:border-green-800/50 dark:text-green-400" },
    danger: { solid: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-300", outline: "bg-white border-red-300 text-red-800 dark:bg-zinc-950 dark:border-red-800/50 dark:text-red-400" },
    warning: { solid: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800/50 dark:text-yellow-300", outline: "bg-white border-yellow-300 text-yellow-800 dark:bg-zinc-950 dark:border-yellow-800/50 dark:text-yellow-400" },
    info: { solid: "bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-900/20 dark:border-cyan-800/50 dark:text-cyan-300", outline: "bg-white border-cyan-300 text-cyan-800 dark:bg-zinc-950 dark:border-cyan-800/50 dark:text-cyan-400" },
    dark: { solid: "bg-zinc-800 border-zinc-700 text-zinc-100 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100", outline: "bg-white border-zinc-400 text-zinc-800 dark:bg-zinc-950 dark:border-zinc-700 dark:text-zinc-200" },
  };

  const alertConfig = alertTypes[type] || alertTypes.info;
  const alertClasses = alertConfig[variant] || alertConfig.solid;

  const renderIcon = (iconProp: React.ReactNode | string | null): React.ReactNode => {
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
    <div className={\`relative flex items-start p-4 border rounded-xl shadow-sm transition-all duration-300 ease-in-out \${alertClasses} \${isAnimating ? "opacity-0 transform scale-[0.98]" : "opacity-100 transform scale-100"} \${className}\`} role="alert">
      {icon !== null && icon && (
        <div className={\`flex-shrink-0 mr-3 mt-0.5 \${!title ? "self-center mt-0" : ""} \${iconClassName}\`}>
          {renderIcon(icon)}
        </div>
      )}

      <div className={\`flex-1 min-w-0 \${!title ? "flex items-center" : ""}\`}>
        {title && <h4 className={\`font-semibold mb-1 tracking-tight \${titleClassName}\`}>{title}</h4>}
        {message && <p className={\`text-sm opacity-90 \${messageClassName}\`}>{message}</p>}
        {children && <div className="mt-3">{children}</div>}
      </div>

      {dismissible && (
        <button onClick={handleDismiss} className={\`flex-shrink-0 ml-4 p-1 rounded-md cursor-pointer opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all \${dismissIconClassName}\`} aria-label="Dismiss alert">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};`;

// --- JAVASCRIPT ENGINE CODE ---
const ALERT_ENGINE_CODE_JS = `"use client";

import { AlertTriangle, Bell, CheckCircle2, Info, XCircle } from "lucide-react";
import React, { useState } from "react";

const ICON_MAP = {
  CheckCircle2, AlertTriangle, Info, Bell, XCircle,
};

export const Alert = ({
  type = "primary", variant = "solid", dismissible = false, icon = null, title = null, message = "", className = "", titleClassName = "", messageClassName = "", iconClassName = "", dismissIconClassName = "", onDismiss = null, children = null,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const alertTypes = {
    primary: { solid: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800/50 dark:text-blue-300", outline: "bg-white border-blue-300 text-blue-800 dark:bg-zinc-950 dark:border-blue-800/50 dark:text-blue-400" },
    secondary: { solid: "bg-zinc-100 border-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200", outline: "bg-white border-zinc-300 text-zinc-800 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300" },
    success: { solid: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-300", outline: "bg-white border-green-300 text-green-800 dark:bg-zinc-950 dark:border-green-800/50 dark:text-green-400" },
    danger: { solid: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-300", outline: "bg-white border-red-300 text-red-800 dark:bg-zinc-950 dark:border-red-800/50 dark:text-red-400" },
    warning: { solid: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800/50 dark:text-yellow-300", outline: "bg-white border-yellow-300 text-yellow-800 dark:bg-zinc-950 dark:border-yellow-800/50 dark:text-yellow-400" },
    info: { solid: "bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-900/20 dark:border-cyan-800/50 dark:text-cyan-300", outline: "bg-white border-cyan-300 text-cyan-800 dark:bg-zinc-950 dark:border-cyan-800/50 dark:text-cyan-400" },
    dark: { solid: "bg-zinc-800 border-zinc-700 text-zinc-100 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100", outline: "bg-white border-zinc-400 text-zinc-800 dark:bg-zinc-950 dark:border-zinc-700 dark:text-zinc-200" },
  };

  const alertConfig = alertTypes[type] || alertTypes.info;
  const alertClasses = alertConfig[variant] || alertConfig.solid;

  const renderIcon = (iconProp) => {
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
    <div className={\`relative flex items-start p-4 border rounded-xl shadow-sm transition-all duration-300 ease-in-out \${alertClasses} \${isAnimating ? "opacity-0 transform scale-[0.98]" : "opacity-100 transform scale-100"} \${className}\`} role="alert">
      {icon !== null && icon && (
        <div className={\`flex-shrink-0 mr-3 mt-0.5 \${!title ? "self-center mt-0" : ""} \${iconClassName}\`}>
          {renderIcon(icon)}
        </div>
      )}

      <div className={\`flex-1 min-w-0 \${!title ? "flex items-center" : ""}\`}>
        {title && <h4 className={\`font-semibold mb-1 tracking-tight \${titleClassName}\`}>{title}</h4>}
        {message && <p className={\`text-sm opacity-90 \${messageClassName}\`}>{message}</p>}
        {children && <div className="mt-3">{children}</div>}
      </div>

      {dismissible && (
        <button onClick={handleDismiss} className={\`flex-shrink-0 ml-4 p-1 rounded-md cursor-pointer opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all \${dismissIconClassName}\`} aria-label="Dismiss alert">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};`;

type IconType = "none" | "lucide" | "emoji";

export function AlertShowcase() {
  const [type, setType] = useState<AlertType>("success");
  const [variant, setVariant] = useState<AlertVariant>("solid");
  const [iconType, setIconType] = useState<IconType>("lucide");
  const [isDismissible, setIsDismissible] = useState<boolean>(false);
  const [showRichContent, setShowRichContent] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState<number>(0);

  const getIconString = () => {
    if (iconType === "none") return "null";
    if (iconType === "emoji") return `"🚀"`;
    switch (type) {
      case "success":
        return `"CheckCircle2"`;
      case "danger":
        return `"XCircle"`;
      case "warning":
        return `"AlertTriangle"`;
      default:
        return `"Info"`;
    }
  };

  const getTitleString = () =>
    type.charAt(0).toUpperCase() + type.slice(1) + " Alert";

  // --- DYNAMIC USAGE SNIPPET ---
  const generateUsageCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";
    const iconProp =
      iconType !== "none" ? `\n        icon=${getIconString()}` : "";
    const dismissProp = isDismissible ? `\n        dismissible={true}` : "";

    const openingTag = `      <Alert 
        type="${type}"
        variant="${variant}"
        title="${getTitleString()}"${iconProp}${dismissProp}`;

    if (!showRichContent) {
      return `import { Alert } from "@/components/custom/blocks/Alerts";

export default function AlertDemo()${typeDef} {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
${openingTag}
        message="This is a dynamically generated alert message."
      />
    </div>
  );
}`;
    }

    return `import { Alert } from "@/components/custom/blocks/Alerts";

export default function RichAlertDemo()${typeDef} {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
${openingTag}
      >
        <p className="text-sm mb-3">This is rich content rendered inside the alert as children. You can put lists, buttons, or any valid HTML here.</p>
        <div className="flex gap-3">
          <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition">Action</button>
          <button className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-md text-sm font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700 transition">Cancel</button>
        </div>
      </Alert>
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Semantic Type
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(
                [
                  "primary",
                  "secondary",
                  "success",
                  "danger",
                  "warning",
                  "info",
                  "dark",
                ] as AlertType[]
              ).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 md:flex-none px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    type === t
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Visual Variant
            </label>
            <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
              {(["solid", "outline"] as AlertVariant[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    variant === v
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Icon Type
            </label>
            <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
              {[
                { id: "none", label: "None" },
                { id: "lucide", label: "Lucide Icon" },
                { id: "emoji", label: "Emoji" },
              ].map((i) => (
                <button
                  key={i.id}
                  onClick={() => setIconType(i.id as IconType)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                    iconType === i.id
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {i.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Features
            </label>
            <div className="flex gap-2 h-[36px] items-center">
              <button
                onClick={() => setIsDismissible(!isDismissible)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${
                  isDismissible
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Dismissible
              </button>
              <button
                onClick={() => setShowRichContent(!showRichContent)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${
                  showRichContent
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Rich Content
              </button>

              {isDismissible && (
                <button
                  onClick={() => setResetKey((prev) => prev + 1)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors ml-2"
                  title="Reset Alert"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ComponentPreview
        name="Alert"
        tsCode={ALERT_ENGINE_CODE_TS}
        jsCode={ALERT_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full max-w-2xl mx-auto p-4 md:p-8 bg-transparent min-h-[250px] flex items-center justify-center">
          <Alert
            key={`${variant}-${type}-${iconType}-${showRichContent}-${resetKey}`}
            type={type}
            variant={variant}
            dismissible={isDismissible}
            title={getTitleString()}
            icon={
              iconType === "none"
                ? null
                : iconType === "emoji"
                  ? "🚀"
                  : getIconString().replace(/"/g, "")
            }
            message={
              showRichContent
                ? ""
                : "This is a dynamically generated alert message explaining the current state of the system."
            }
          >
            {showRichContent && (
              <>
                <p className="text-sm mb-3">
                  This is rich content rendered inside the alert as children.
                  You can put lists, buttons, or any valid HTML here.
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition cursor-pointer">
                    Action
                  </button>
                  <button className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-md text-sm font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700 transition cursor-pointer">
                    Cancel
                  </button>
                </div>
              </>
            )}
          </Alert>
        </div>
      </ComponentPreview>
    </div>
  );
}
