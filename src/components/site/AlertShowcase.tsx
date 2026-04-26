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

import { cn } from "@/lib/utils";
import { AlertTriangle, Bell, CheckCircle2, Info, XCircle } from "lucide-react";
import React, { useState } from "react";

const ICON_MAP: Record<string, React.ElementType> = {
  CheckCircle2, AlertTriangle, Info, Bell, XCircle,
};

export type AlertType = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark";
export type AlertVariant = "solid" | "outline" | "modern" | "glass" | "glow";

export interface AlertProps {
  type?: AlertType; variant?: AlertVariant; dismissible?: boolean; icon?: React.ReactNode | string | null; title?: string | null; message?: string; className?: string; titleClassName?: string; messageClassName?: string; iconClassName?: string; dismissIconClassName?: string; onDismiss?: (() => void) | null; children?: React.ReactNode | null;
}

export const Alert: React.FC<AlertProps> = ({
  type = "primary", variant = "modern", dismissible = false, icon = null, title = null, message = "", className = "", titleClassName = "", messageClassName = "", iconClassName = "", dismissIconClassName = "", onDismiss = null, children = null,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const alertTypes: Record<AlertType, Record<AlertVariant, string>> = {
    primary: { solid: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800/50 dark:text-blue-300", outline: "bg-white border-blue-300 text-blue-800 dark:bg-zinc-950 dark:border-blue-800/50 dark:text-blue-400", modern: "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-blue-500 shadow-xl shadow-blue-500/10 text-zinc-800 dark:text-zinc-200", glass: "bg-blue-500/10 dark:bg-blue-500/15 backdrop-blur-xl border border-blue-500/20 text-blue-800 dark:text-blue-300 shadow-lg", glow: "bg-zinc-950 border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)] text-blue-400" },
    secondary: { solid: "bg-zinc-100 border-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200", outline: "bg-white border-zinc-300 text-zinc-800 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300", modern: "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-zinc-500 shadow-xl shadow-zinc-500/10 text-zinc-800 dark:text-zinc-200", glass: "bg-zinc-500/10 dark:bg-zinc-500/15 backdrop-blur-xl border border-zinc-500/20 text-zinc-800 dark:text-zinc-300 shadow-lg", glow: "bg-zinc-950 border border-zinc-500/50 shadow-[0_0_20px_rgba(113,113,122,0.3)] text-zinc-400" },
    success: { solid: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-300", outline: "bg-white border-green-300 text-green-800 dark:bg-zinc-950 dark:border-green-800/50 dark:text-green-400", modern: "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-green-500 shadow-xl shadow-green-500/10 text-zinc-800 dark:text-zinc-200", glass: "bg-green-500/10 dark:bg-green-500/15 backdrop-blur-xl border border-green-500/20 text-green-800 dark:text-green-300 shadow-lg", glow: "bg-zinc-950 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)] text-green-400" },
    danger: { solid: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-300", outline: "bg-white border-red-300 text-red-800 dark:bg-zinc-950 dark:border-red-800/50 dark:text-red-400", modern: "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-red-500 shadow-xl shadow-red-500/10 text-zinc-800 dark:text-zinc-200", glass: "bg-red-500/10 dark:bg-red-500/15 backdrop-blur-xl border border-red-500/20 text-red-800 dark:text-red-300 shadow-lg", glow: "bg-zinc-950 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] text-red-400" },
    warning: { solid: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800/50 dark:text-yellow-300", outline: "bg-white border-yellow-300 text-yellow-800 dark:bg-zinc-950 dark:border-yellow-800/50 dark:text-yellow-400", modern: "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-yellow-500 shadow-xl shadow-yellow-500/10 text-zinc-800 dark:text-zinc-200", glass: "bg-yellow-500/10 dark:bg-yellow-500/15 backdrop-blur-xl border border-yellow-500/20 text-yellow-800 dark:text-yellow-300 shadow-lg", glow: "bg-zinc-950 border border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)] text-yellow-400" },
    info: { solid: "bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-900/20 dark:border-cyan-800/50 dark:text-cyan-300", outline: "bg-white border-cyan-300 text-cyan-800 dark:bg-zinc-950 dark:border-cyan-800/50 dark:text-cyan-400", modern: "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-cyan-500 shadow-xl shadow-cyan-500/10 text-zinc-800 dark:text-zinc-200", glass: "bg-cyan-500/10 dark:bg-cyan-500/15 backdrop-blur-xl border border-cyan-500/20 text-cyan-800 dark:text-cyan-300 shadow-lg", glow: "bg-zinc-950 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] text-cyan-400" },
    dark: { solid: "bg-zinc-800 border-zinc-700 text-zinc-100 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100", outline: "bg-white border-zinc-400 text-zinc-800 dark:bg-zinc-950 dark:border-zinc-700 dark:text-zinc-200", modern: "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-zinc-800 dark:border-l-zinc-100 shadow-xl shadow-zinc-900/10 text-zinc-800 dark:text-zinc-200", glass: "bg-zinc-800/10 dark:bg-zinc-100/10 backdrop-blur-xl border border-zinc-800/20 dark:border-zinc-100/20 text-zinc-800 dark:text-zinc-300 shadow-lg", glow: "bg-zinc-950 border border-zinc-500/50 shadow-[0_0_20px_rgba(255,255,255,0.1)] text-zinc-300" },
  };

  const alertConfig = alertTypes[type] || alertTypes.info;
  const alertClasses = alertConfig[variant] || alertConfig.modern;

  const renderIcon = (iconProp: React.ReactNode | string | null): React.ReactNode => {
    if (iconProp === null) return null;
    if (typeof iconProp === "string") {
      if (ICON_MAP[iconProp]) {
        const MappedIcon = ICON_MAP[iconProp];
        return <MappedIcon className={cn("w-5 h-5", variant === "glow" && "animate-pulse")} />;
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
    <div className={cn(\`relative flex items-start p-4 rounded-xl transition-all duration-300 ease-in-out overflow-hidden\`, (variant === "solid" || variant === "outline") && "border shadow-sm", "animate-in fade-in slide-in-from-top-4 duration-500", alertClasses, isAnimating ? "opacity-0 transform scale-[0.96]" : "opacity-100 transform scale-100", className)} role="alert">
      {variant === "glass" && <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_infinite]" />}
      {icon !== null && icon && <div className={cn(\`flex-shrink-0 mr-3 mt-0.5 relative z-10\`, !title ? "self-center mt-0" : "", iconClassName)}>{renderIcon(icon)}</div>}
      <div className={cn(\`flex-1 min-w-0 relative z-10\`, !title ? "flex items-center" : "")}>
        {title && <h4 className={cn(\`font-bold mb-1 tracking-tight\`, titleClassName)}>{title}</h4>}
        {message && <p className={cn(\`text-sm opacity-90 font-medium\`, messageClassName)}>{message}</p>}
        {children && <div className="mt-3 relative z-10">{children}</div>}
      </div>
      {dismissible && (
        <button onClick={handleDismiss} className={cn(\`flex-shrink-0 ml-4 p-1 rounded-md cursor-pointer opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all relative z-10 active:scale-90\`, dismissIconClassName)} aria-label="Dismiss alert">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </button>
      )}
    </div>
  );
};`;

// --- JAVASCRIPT ENGINE CODE ---
const ALERT_ENGINE_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, Bell, CheckCircle2, Info, XCircle } from "lucide-react";
import React, { useState } from "react";

const ICON_MAP = {
  CheckCircle2, AlertTriangle, Info, Bell, XCircle,
};

export const Alert = ({
  type = "primary", variant = "modern", dismissible = false, icon = null, title = null, message = "", className = "", titleClassName = "", messageClassName = "", iconClassName = "", dismissIconClassName = "", onDismiss = null, children = null,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const alertTypes = {
    primary: { solid: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800/50 dark:text-blue-300", outline: "bg-white border-blue-300 text-blue-800 dark:bg-zinc-950 dark:border-blue-800/50 dark:text-blue-400", modern: "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-blue-500 shadow-xl shadow-blue-500/10 text-zinc-800 dark:text-zinc-200", glass: "bg-blue-500/10 dark:bg-blue-500/15 backdrop-blur-xl border border-blue-500/20 text-blue-800 dark:text-blue-300 shadow-lg", glow: "bg-zinc-950 border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)] text-blue-400" },
    secondary: { solid: "bg-zinc-100 border-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200", outline: "bg-white border-zinc-300 text-zinc-800 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300", modern: "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-zinc-500 shadow-xl shadow-zinc-500/10 text-zinc-800 dark:text-zinc-200", glass: "bg-zinc-500/10 dark:bg-zinc-500/15 backdrop-blur-xl border border-zinc-500/20 text-zinc-800 dark:text-zinc-300 shadow-lg", glow: "bg-zinc-950 border border-zinc-500/50 shadow-[0_0_20px_rgba(113,113,122,0.3)] text-zinc-400" },
    success: { solid: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-300", outline: "bg-white border-green-300 text-green-800 dark:bg-zinc-950 dark:border-green-800/50 dark:text-green-400", modern: "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-green-500 shadow-xl shadow-green-500/10 text-zinc-800 dark:text-zinc-200", glass: "bg-green-500/10 dark:bg-green-500/15 backdrop-blur-xl border border-green-500/20 text-green-800 dark:text-green-300 shadow-lg", glow: "bg-zinc-950 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)] text-green-400" },
    danger: { solid: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-300", outline: "bg-white border-red-300 text-red-800 dark:bg-zinc-950 dark:border-red-800/50 dark:text-red-400", modern: "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-red-500 shadow-xl shadow-red-500/10 text-zinc-800 dark:text-zinc-200", glass: "bg-red-500/10 dark:bg-red-500/15 backdrop-blur-xl border border-red-500/20 text-red-800 dark:text-red-300 shadow-lg", glow: "bg-zinc-950 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] text-red-400" },
    warning: { solid: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800/50 dark:text-yellow-300", outline: "bg-white border-yellow-300 text-yellow-800 dark:bg-zinc-950 dark:border-yellow-800/50 dark:text-yellow-400", modern: "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-yellow-500 shadow-xl shadow-yellow-500/10 text-zinc-800 dark:text-zinc-200", glass: "bg-yellow-500/10 dark:bg-yellow-500/15 backdrop-blur-xl border border-yellow-500/20 text-yellow-800 dark:text-yellow-300 shadow-lg", glow: "bg-zinc-950 border border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)] text-yellow-400" },
    info: { solid: "bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-900/20 dark:border-cyan-800/50 dark:text-cyan-300", outline: "bg-white border-cyan-300 text-cyan-800 dark:bg-zinc-950 dark:border-cyan-800/50 dark:text-cyan-400", modern: "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-cyan-500 shadow-xl shadow-cyan-500/10 text-zinc-800 dark:text-zinc-200", glass: "bg-cyan-500/10 dark:bg-cyan-500/15 backdrop-blur-xl border border-cyan-500/20 text-cyan-800 dark:text-cyan-300 shadow-lg", glow: "bg-zinc-950 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] text-cyan-400" },
    dark: { solid: "bg-zinc-800 border-zinc-700 text-zinc-100 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100", outline: "bg-white border-zinc-400 text-zinc-800 dark:bg-zinc-950 dark:border-zinc-700 dark:text-zinc-200", modern: "bg-white dark:bg-zinc-900 border-0 border-l-4 border-l-zinc-800 dark:border-l-zinc-100 shadow-xl shadow-zinc-900/10 text-zinc-800 dark:text-zinc-200", glass: "bg-zinc-800/10 dark:bg-zinc-100/10 backdrop-blur-xl border border-zinc-800/20 dark:border-zinc-100/20 text-zinc-800 dark:text-zinc-300 shadow-lg", glow: "bg-zinc-950 border border-zinc-500/50 shadow-[0_0_20px_rgba(255,255,255,0.1)] text-zinc-300" },
  };

  const alertConfig = alertTypes[type] || alertTypes.info;
  const alertClasses = alertConfig[variant] || alertConfig.modern;

  const renderIcon = (iconProp) => {
    if (iconProp === null) return null;
    if (typeof iconProp === "string") {
      if (ICON_MAP[iconProp]) {
        const MappedIcon = ICON_MAP[iconProp];
        return <MappedIcon className={cn("w-5 h-5", variant === "glow" && "animate-pulse")} />;
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
    <div className={cn(\`relative flex items-start p-4 rounded-xl transition-all duration-300 ease-in-out overflow-hidden\`, (variant === "solid" || variant === "outline") && "border shadow-sm", "animate-in fade-in slide-in-from-top-4 duration-500", alertClasses, isAnimating ? "opacity-0 transform scale-[0.96]" : "opacity-100 transform scale-100", className)} role="alert">
      {variant === "glass" && <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_infinite]" />}
      {icon !== null && icon && <div className={cn(\`flex-shrink-0 mr-3 mt-0.5 relative z-10\`, !title ? "self-center mt-0" : "", iconClassName)}>{renderIcon(icon)}</div>}
      <div className={cn(\`flex-1 min-w-0 relative z-10\`, !title ? "flex items-center" : "")}>
        {title && <h4 className={cn(\`font-bold mb-1 tracking-tight\`, titleClassName)}>{title}</h4>}
        {message && <p className={cn(\`text-sm opacity-90 font-medium\`, messageClassName)}>{message}</p>}
        {children && <div className="mt-3 relative z-10">{children}</div>}
      </div>
      {dismissible && (
        <button onClick={handleDismiss} className={cn(\`flex-shrink-0 ml-4 p-1 rounded-md cursor-pointer opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all relative z-10 active:scale-90\`, dismissIconClassName)} aria-label="Dismiss alert">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </button>
      )}
    </div>
  );
};`;

type IconType = "none" | "lucide" | "emoji";

export function AlertShowcase() {
  const [type, setType] = useState<AlertType>("success");
  const [variant, setVariant] = useState<AlertVariant>("modern");
  const [iconType, setIconType] = useState<IconType>("lucide");
  const [isDismissible, setIsDismissible] = useState<boolean>(true);
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

  const generateUsageCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";
    const iconProp =
      iconType !== "none" ? `\n        icon=${getIconString()}` : "";
    const dismissProp = isDismissible ? `\n        dismissible={true}` : "";

    const openingTag = `      <Alert \n        type="${type}"\n        variant="${variant}"\n        title="${getTitleString()}"${iconProp}${dismissProp}`;

    if (!showRichContent) {
      return `import { Alert } from "@/components/custom/blocks/Alerts";\n\nexport default function AlertDemo()${typeDef} {\n  return (\n    <div className="w-full max-w-2xl mx-auto p-6">\n${openingTag}\n        message="This is a dynamically generated alert message."\n      />\n    </div>\n  );\n}`;
    }

    return `import { Alert } from "@/components/custom/blocks/Alerts";\n\nexport default function RichAlertDemo()${typeDef} {\n  return (\n    <div className="w-full max-w-2xl mx-auto p-6">\n${openingTag}\n      >\n        <p className="text-sm mb-3">This is rich content rendered inside the alert as children. You can put lists, buttons, or any valid HTML here.</p>\n        <div className="flex gap-3">\n          <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition">Action</button>\n          <button className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-md text-sm font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700 transition">Cancel</button>\n        </div>\n      </Alert>\n    </div>\n  );\n}`;
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
              {(
                [
                  "solid",
                  "outline",
                  "modern",
                  "glass",
                  "glow",
                ] as AlertVariant[]
              ).map((v) => (
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
        <div
          className={`w-full max-w-2xl mx-auto p-4 md:p-8 min-h-[300px] flex items-center justify-center rounded-2xl transition-colors duration-500 ${variant === "glass" ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-zinc-100 to-zinc-50 dark:from-blue-900/40 dark:via-zinc-950 dark:to-black" : variant === "glow" ? "bg-black" : "bg-transparent"}`}
        >
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
                  <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition cursor-pointer shadow-sm">
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
