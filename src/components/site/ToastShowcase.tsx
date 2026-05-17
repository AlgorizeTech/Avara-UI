"use client";

import {
  ToastColor,
  ToastPosition,
  ToastProvider,
  ToastVariant,
  useToast,
} from "@/components/custom/blocks/ToastBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const TOAST_ENGINE_CODE_TS = `"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";

export type ToastColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});
export type ToastVariant = "default" | "glow" | "glass" | "minimal";
export type ToastType = "success" | "error" | "info" | "warning" | "default";
export type ToastPosition = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-600", glow: "shadow-[0_0_20px_rgba(99,102,241,0.4)] border-indigo-500" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", bgSoft: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-600", glow: "shadow-[0_0_20px_rgba(244,63,94,0.4)] border-rose-500" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-600", glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)] border-emerald-500" },
  zinc: { bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50", border: "border-zinc-900 dark:border-zinc-100", glow: "shadow-[0_0_20px_rgba(255,255,255,0.15)] border-zinc-900 dark:border-white" },
};

export interface ToastProps { id: string; title: string; description?: string; type?: ToastType; duration?: number; action?: { label: string; onClick: () => void }; }
interface ToastContextType { toast: (props: Omit<ToastProps, "id">) => void; dismiss: (id: string) => void; }
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

interface ToastItemProps extends ToastProps { onRemove: (id: string) => void; variant: ToastVariant; color: ToastColor; position: ToastPosition; }

const ToastItem = ({ id, title, description, type = "default", duration = 5000, action, onRemove, variant, color, position }: ToastItemProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  
  const isCustomHex = color?.startsWith("#");
  const customVars = isCustomHex ? {
    "--toast-custom": color,
    "--toast-custom-10": \`\${color}1a\`,
    "--toast-custom-40": \`\${color}66\`,
  } as React.CSSProperties : {};

  const theme = isCustomHex ? {
    bg: "bg-[var(--toast-custom)] text-white",
    text: "text-[var(--toast-custom)]",
    bgSoft: "bg-[var(--toast-custom-10)]",
    border: "border-[var(--toast-custom)]",
    glow: "shadow-[0_0_20px_var(--toast-custom-40)] border-[var(--toast-custom)]"
  } : colorThemes[color as string] || colorThemes["indigo"];

  const isTop = position.includes("top");
  const yOffset = isTop ? -30 : 30;

  useEffect(() => {
    const el = toastRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: yOffset, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" });
    let timer: NodeJS.Timeout;
    if (duration > 0) timer = setTimeout(() => handleClose(), duration);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    if (!toastRef.current) return;
    gsap.to(toastRef.current, { opacity: 0, scale: 0.9, y: yOffset, duration: 0.3, ease: "power2.in", onComplete: () => onRemove(id) });
  }, [id, onRemove, yOffset]);

  const typeStyles = { success: { icon: CheckCircle2, iconColor: "text-emerald-500" }, error: { icon: AlertCircle, iconColor: "text-red-500" }, warning: { icon: AlertTriangle, iconColor: "text-amber-500" }, info: { icon: Info, iconColor: "text-blue-500" }, default: { icon: null, iconColor: "" } };
  const { icon: Icon, iconColor } = typeStyles[type];

  const variantStyles = {
    default: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl",
    glow: cn("bg-white dark:bg-[#09090b] shadow-lg border", theme.glow),
    glass: "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl",
    minimal: cn("border-l-4 rounded-l-none bg-white dark:bg-zinc-950 shadow-md", theme.border),
  };

  return (
    <div ref={toastRef} className={cn("pointer-events-auto flex w-full max-w-sm items-start gap-4 rounded-xl p-4 transition-colors", variantStyles[variant])} style={customVars}>
      {Icon && <Icon className={cn("mt-0.5 w-5 h-5 shrink-0", iconColor)} />}
      <div className="flex flex-col gap-1 w-full min-w-0">
        <h3 className={cn("text-sm font-bold", variant === "glass" ? "text-zinc-900 dark:text-white" : "text-zinc-900 dark:text-zinc-100")}>{title}</h3>
        {description && <p className={cn("text-sm", variant === "glass" ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-500 dark:text-zinc-400")}>{description}</p>}
        {action && <button onClick={() => { action.onClick(); handleClose(); }} className={cn("mt-2 w-max text-xs font-bold transition-colors active:scale-95", theme.text, "hover:opacity-70")}>{action.label}</button>}
      </div>
      <button onClick={handleClose} className="shrink-0 p-1 rounded-md opacity-50 hover:opacity-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"><X className="w-4 h-4" /></button>
    </div>
  );
};

export interface ToastProviderProps { children: React.ReactNode; variant?: ToastVariant; color?: ToastColor; position?: ToastPosition; }

export function ToastProvider({ children, variant = "default", color = "indigo", position = "bottom-right" }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback((props: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...props }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const positionClasses = { "top-right": "top-0 right-0 sm:top-4 sm:right-4 flex-col", "top-left": "top-0 left-0 sm:top-4 sm:left-4 flex-col", "top-center": "top-0 left-1/2 -translate-x-1/2 sm:top-4 flex-col", "bottom-right": "bottom-0 right-0 sm:bottom-4 sm:right-4 flex-col-reverse", "bottom-left": "bottom-0 left-0 sm:bottom-4 sm:left-4 flex-col-reverse", "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 sm:bottom-4 flex-col-reverse" };

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className={cn("absolute z-[100] flex max-h-screen w-full sm:w-auto p-4 sm:p-0 gap-3 pointer-events-none overflow-hidden", positionClasses[position])}>
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} onRemove={dismiss} variant={variant} color={color} position={position} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const TOAST_ENGINE_CODE_JS = `"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";

const colorThemes = {
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-600", glow: "shadow-[0_0_20px_rgba(99,102,241,0.4)] border-indigo-500" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", bgSoft: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-600", glow: "shadow-[0_0_20px_rgba(244,63,94,0.4)] border-rose-500" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-600", glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)] border-emerald-500" },
  zinc: { bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50", border: "border-zinc-900 dark:border-zinc-100", glow: "shadow-[0_0_20px_rgba(255,255,255,0.15)] border-zinc-900 dark:border-white" },
};

const ToastContext = createContext(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

const ToastItem = ({ id, title, description, type = "default", duration = 5000, action, onRemove, variant, color, position }) => {
  const toastRef = useRef(null);
  
  const isCustomHex = color && color.startsWith("#");
  const customVars = isCustomHex ? {
    "--toast-custom": color,
    "--toast-custom-10": \`\${color}1a\`,
    "--toast-custom-40": \`\${color}66\`,
  } : {};

  const theme = isCustomHex ? {
    bg: "bg-[var(--toast-custom)] text-white",
    text: "text-[var(--toast-custom)]",
    bgSoft: "bg-[var(--toast-custom-10)]",
    border: "border-[var(--toast-custom)]",
    glow: "shadow-[0_0_20px_var(--toast-custom-40)] border-[var(--toast-custom)]"
  } : colorThemes[color] || colorThemes["indigo"];

  const isTop = position.includes("top");
  const yOffset = isTop ? -30 : 30;

  useEffect(() => {
    const el = toastRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: yOffset, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" });
    let timer;
    if (duration > 0) timer = setTimeout(() => handleClose(), duration);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    if (!toastRef.current) return;
    gsap.to(toastRef.current, { opacity: 0, scale: 0.9, y: yOffset, duration: 0.3, ease: "power2.in", onComplete: () => onRemove(id) });
  }, [id, onRemove, yOffset]);

  const typeStyles = { success: { icon: CheckCircle2, iconColor: "text-emerald-500" }, error: { icon: AlertCircle, iconColor: "text-red-500" }, warning: { icon: AlertTriangle, iconColor: "text-amber-500" }, info: { icon: Info, iconColor: "text-blue-500" }, default: { icon: null, iconColor: "" } };
  const { icon: Icon, iconColor } = typeStyles[type];

  const variantStyles = {
    default: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl",
    glow: cn("bg-white dark:bg-[#09090b] shadow-lg border", theme.glow),
    glass: "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl",
    minimal: cn("border-l-4 rounded-l-none bg-white dark:bg-zinc-950 shadow-md", theme.border),
  };

  return (
    <div ref={toastRef} className={cn("pointer-events-auto flex w-full max-w-sm items-start gap-4 rounded-xl p-4 transition-colors", variantStyles[variant])} style={customVars}>
      {Icon && <Icon className={cn("mt-0.5 w-5 h-5 shrink-0", iconColor)} />}
      <div className="flex flex-col gap-1 w-full min-w-0">
        <h3 className={cn("text-sm font-bold", variant === "glass" ? "text-zinc-900 dark:text-white" : "text-zinc-900 dark:text-zinc-100")}>{title}</h3>
        {description && <p className={cn("text-sm", variant === "glass" ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-500 dark:text-zinc-400")}>{description}</p>}
        {action && <button onClick={() => { action.onClick(); handleClose(); }} className={cn("mt-2 w-max text-xs font-bold transition-colors active:scale-95", theme.text, "hover:opacity-70")}>{action.label}</button>}
      </div>
      <button onClick={handleClose} className="shrink-0 p-1 rounded-md opacity-50 hover:opacity-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"><X className="w-4 h-4" /></button>
    </div>
  );
};

export function ToastProvider({ children, variant = "default", color = "indigo", position = "bottom-right" }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((props) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...props }]);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const positionClasses = { "top-right": "top-0 right-0 sm:top-4 sm:right-4 flex-col", "top-left": "top-0 left-0 sm:top-4 sm:left-4 flex-col", "top-center": "top-0 left-1/2 -translate-x-1/2 sm:top-4 flex-col", "bottom-right": "bottom-0 right-0 sm:bottom-4 sm:right-4 flex-col-reverse", "bottom-left": "bottom-0 left-0 sm:bottom-4 sm:left-4 flex-col-reverse", "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 sm:bottom-4 flex-col-reverse" };

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className={cn("absolute z-[100] flex max-h-screen w-full sm:w-auto p-4 sm:p-0 gap-3 pointer-events-none overflow-hidden", positionClasses[position])}>
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} onRemove={dismiss} variant={variant} color={color} position={position} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}`;

// Internal component to use the hook safely inside the provider for the showcase
const ToastButtons = () => {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
      <button
        onClick={() =>
          toast({
            title: "Action completed",
            description: "Your file has been uploaded successfully.",
            type: "success",
          })
        }
        className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
      >
        Success Toast
      </button>
      <button
        onClick={() =>
          toast({
            title: "Connection failed",
            description: "Could not connect to the database. Please try again.",
            type: "error",
          })
        }
        className="px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm"
      >
        Error Toast
      </button>
      <button
        onClick={() =>
          toast({
            title: "Update available",
            description: "A new version of the app is ready to install.",
            type: "info",
            action: {
              label: "Install Now",
              onClick: () => console.log("Installing..."),
            },
          })
        }
        className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
      >
        Info (with Action)
      </button>
      <button
        onClick={() => toast({ title: "Message sent", type: "default" })}
        className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold rounded-xl transition-colors shadow-sm"
      >
        Default Simple
      </button>
    </div>
  );
};

export function ToastShowcase() {
  const [variant, setVariant] = useState<ToastVariant>("default");
  const [position, setPosition] = useState<ToastPosition>("bottom-right");

  // Initialize with localStorage if available
  const [color, setColor] = useState<ToastColor | string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("primaryColor") || "indigo";
    }
    return "indigo";
  });

  // Automatically listen for updates to the primaryColor in localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) {
        setColor(stored);
      }
    }, 1000);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "primaryColor" && e.newValue) {
        setColor(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [color]);

  // Sync manual UI changes down to local storage
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("primaryColor", newColor);
  };

  const generateUsageCode = (isTs: boolean) => {
    const propsStr = `\n      variant="${variant}"\n      color="${color}"\n      position="${position}"`;

    return `import { ToastProvider, useToast } from "@/components/custom/blocks/ToastBlock";

export default function App() {
  return (
    <ToastProvider${propsStr}
    >
      <MyComponent />
    </ToastProvider>
  );
}

function MyComponent() {
  const { toast } = useToast();

  return (
    <button 
      onClick={() => toast({ 
        title: "Success!", 
        description: "Your profile has been updated.",
        type: "success" 
      })}
    >
      Show Toast
    </button>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Variant Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Style Variant
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["default", "glow", "glass", "minimal"] as ToastVariant[]).map(
                (v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                      variant === v
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    }`}
                  >
                    {v}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Position Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Placement Position
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(
                [
                  "top-left",
                  "top-center",
                  "top-right",
                  "bottom-left",
                  "bottom-center",
                  "bottom-right",
                ] as ToastPosition[]
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => setPosition(p)}
                  className={`flex-1 md:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    position === p
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {p.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Color Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Theme Color{" "}
              <span className="text-[10px] font-normal opacity-70">
                (Used in glow & minimal variants)
              </span>
            </label>
            <div className="flex items-center gap-2 h-10 px-2">
              {[
                { id: "indigo", bg: "bg-indigo-500" },
                { id: "rose", bg: "bg-rose-500" },
                { id: "emerald", bg: "bg-emerald-500" },
                { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleColorChange(c.id)}
                  className={`w-7 h-7 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                    color === c.id
                      ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                      : "hover:scale-110 hover:opacity-80"
                  }`}
                  title={c.id}
                />
              ))}

              <div className="w-px h-5 bg-zinc-300 dark:bg-zinc-700 mx-1" />

              {/* Custom Color Picker */}
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${color.startsWith("#") ? "border-zinc-900 dark:border-white scale-110 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500" : "border-zinc-300 dark:border-zinc-700 hover:scale-110"}`}
              >
                <input
                  type="color"
                  value={color.startsWith("#") ? color : "#8b5cf6"}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="absolute inset-[-10px] w-12 h-12 cursor-pointer opacity-0"
                  title="Custom Hex Color"
                />
                <div
                  className="w-full h-full"
                  style={{
                    backgroundColor: color.startsWith("#")
                      ? color
                      : "transparent",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ToastBlock"
        tsCode={TOAST_ENGINE_CODE_TS}
        jsCode={TOAST_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div
          className={`relative overflow-hidden w-full flex flex-col items-center justify-center min-h-[500px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 ${variant === "glass" ? "bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" : "bg-zinc-50 dark:bg-[#050505] p-2 sm:p-8"}`}
        >
          {/* We must wrap the preview area in the provider so the hooks work */}
          <ToastProvider
            key={`${variant}-${color}-${position}`}
            variant={variant}
            color={color}
            position={position}
          >
            <ToastButtons />
          </ToastProvider>
        </div>
      </ComponentPreview>
    </div>
  );
}
