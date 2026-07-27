"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { toast, Toaster } from "@/components/custom/blocks/SonnerBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const SONNER_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

export type ToastType = "default" | "success" | "error" | "info";
export interface ToastAction { label: string; onClick: () => void; }
export interface ToastProps { id: string; title: string; description?: string; type?: ToastType; duration?: number; action?: ToastAction; }
type ToastOptions = Omit<ToastProps, "id" | "title">;

class ToastObserver {
  private toasts: ToastProps[] = [];
  private listeners: Set<(toasts: ToastProps[]) => void> = new Set();
  subscribe(listener: (toasts: ToastProps[]) => void) { this.listeners.add(listener); return () => this.listeners.delete(listener); }
  private notify() { this.listeners.forEach((listener) => listener([...this.toasts])); }
  add(title: string, options?: ToastOptions) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastProps = { id, title, duration: 4000, ...options };
    this.toasts = [newToast, ...this.toasts].slice(0, 5);
    this.notify();
    if (newToast.duration !== Infinity) setTimeout(() => this.dismiss(id), newToast.duration);
    return id;
  }
  dismiss(id: string) { this.toasts = this.toasts.filter((t) => t.id !== id); this.notify(); }
}

export const toastState = new ToastObserver();
export const toast = (title: string, options?: ToastOptions) => toastState.add(title, options);
toast.success = (title: string, options?: ToastOptions) => toastState.add(title, { ...options, type: "success" });
toast.error = (title: string, options?: ToastOptions) => toastState.add(title, { ...options, type: "error" });
toast.info = (title: string, options?: ToastOptions) => toastState.add(title, { ...options, type: "info" });
toast.dismiss = (id: string) => toastState.dismiss(id);

export interface ToasterProps { position?: "bottom-right" | "bottom-center" | "bottom-left" | "top-right" | "top-center" | "top-left"; expand?: boolean; }

export function Toaster({ position = "bottom-right", expand = false }: ToasterProps) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => toastState.subscribe(setToasts), []);
  if (toasts.length === 0) return null;

  const positionClasses = {
    "bottom-right": "bottom-0 right-0 sm:bottom-4 sm:right-4 flex-col-reverse", "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 sm:bottom-4 flex-col-reverse", "bottom-left": "bottom-0 left-0 sm:bottom-4 sm:left-4 flex-col-reverse",
    "top-right": "top-0 right-0 sm:top-4 sm:right-4 flex-col", "top-center": "top-0 left-1/2 -translate-x-1/2 sm:top-4 flex-col", "top-left": "top-0 left-0 sm:top-4 sm:left-4 flex-col",
  };
  const isTop = position.startsWith("top");

  return (
    <div className={cn("fixed z-[9999] p-4 flex outline-none pointer-events-none w-full sm:w-[356px]", positionClasses[position])} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative flex w-full flex-col items-center">
        {toasts.map((t, index) => {
          const isFront = index === 0;
          const isExpanded = expand || isHovered;
          const offset = isExpanded ? (index * 12) + (index * 64) : index * 14;
          const scale = isExpanded ? 1 : 1 - index * 0.05;
          const translateY = isTop ? offset : -offset;
          return (
            <div key={t.id} className={cn("absolute w-full transition-all duration-300 ease-out pointer-events-auto", isTop ? "top-0" : "bottom-0", (isFront || isExpanded) ? "opacity-100" : "opacity-0 pointer-events-none")} style={{ zIndex: 100 - index, transform: \`translateY(\${translateY}px) scale(\${scale})\`, transformOrigin: isTop ? "top center" : "bottom center", opacity: index > 2 && !isExpanded ? 0 : undefined }}>
              <ToastCard toast={t} onDismiss={() => toast.dismiss(t.id)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ToastCard({ toast, onDismiss }: { toast: ToastProps; onDismiss: () => void }) {
  const { title, description, type = "default", action } = toast;
  const typeStyles = {
    default: "bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800", success: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100 border-emerald-200 dark:border-emerald-500/20", error: "bg-red-50 dark:bg-red-500/10 text-red-900 dark:text-red-100 border-red-200 dark:border-red-500/20", info: "bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-500/20",
  };
  const IconMap = { default: null, success: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500 mt-0.5 shrink-0" />, error: <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500 mt-0.5 shrink-0" />, info: <Info className="w-5 h-5 text-blue-600 dark:text-blue-500 mt-0.5 shrink-0" /> };

  return (
    <div className={cn("group flex items-start gap-3 w-full p-4 rounded-xl border shadow-lg backdrop-blur-md", typeStyles[type])}>
      {IconMap[type]}
      <div className="flex flex-col gap-1 w-full min-w-0">
        <div className="font-semibold text-sm">{title}</div>
        {description && <div className="text-sm opacity-80 line-clamp-2">{description}</div>}
        {action && <button onClick={() => { action.onClick(); onDismiss(); }} className="mt-2 w-max px-3 py-1.5 text-xs font-bold rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity">{action.label}</button>}
      </div>
      <button onClick={onDismiss} className="shrink-0 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all absolute right-2 top-2"><X className="w-4 h-4 opacity-70" /></button>
    </div>
  );
}`;

// --- JAVASCRIPT ENGINE CODE (Hardcoded to prevent regex stripping bugs) ---
const SONNER_ENGINE_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

class ToastObserver {
  constructor() {
    this.toasts = [];
    this.listeners = new Set();
  }
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  notify() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }
  add(title, options = {}) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, duration: 4000, ...options };
    this.toasts = [newToast, ...this.toasts].slice(0, 5);
    this.notify();
    if (newToast.duration !== Infinity) setTimeout(() => this.dismiss(id), newToast.duration);
    return id;
  }
  dismiss(id) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }
}

export const toastState = new ToastObserver();
export const toast = (title, options) => toastState.add(title, options);
toast.success = (title, options) => toastState.add(title, { ...options, type: "success" });
toast.error = (title, options) => toastState.add(title, { ...options, type: "error" });
toast.info = (title, options) => toastState.add(title, { ...options, type: "info" });
toast.dismiss = (id) => toastState.dismiss(id);

export function Toaster({ position = "bottom-right", expand = false }) {
  const [toasts, setToasts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    return toastState.subscribe(setToasts);
  }, []);
  
  if (toasts.length === 0) return null;

  const positionClasses = {
    "bottom-right": "bottom-0 right-0 sm:bottom-4 sm:right-4 flex-col-reverse",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 sm:bottom-4 flex-col-reverse",
    "bottom-left": "bottom-0 left-0 sm:bottom-4 sm:left-4 flex-col-reverse",
    "top-right": "top-0 right-0 sm:top-4 sm:right-4 flex-col",
    "top-center": "top-0 left-1/2 -translate-x-1/2 sm:top-4 flex-col",
    "top-left": "top-0 left-0 sm:top-4 sm:left-4 flex-col",
  };
  const isTop = position.startsWith("top");

  return (
    <div className={cn("fixed z-[9999] p-4 flex outline-none pointer-events-none w-full sm:w-[356px]", positionClasses[position])} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative flex w-full flex-col items-center">
        {toasts.map((t, index) => {
          const isFront = index === 0;
          const isExpanded = expand || isHovered;
          const offset = isExpanded ? (index * 12) + (index * 64) : index * 14;
          const scale = isExpanded ? 1 : 1 - index * 0.05;
          const translateY = isTop ? offset : -offset;
          
          return (
            <div key={t.id} className={cn("absolute w-full transition-all duration-300 ease-out pointer-events-auto", isTop ? "top-0" : "bottom-0", (isFront || isExpanded) ? "opacity-100" : "opacity-0 pointer-events-none")} style={{ zIndex: 100 - index, transform: \`translateY(\${translateY}px) scale(\${scale})\`, transformOrigin: isTop ? "top center" : "bottom center", opacity: index > 2 && !isExpanded ? 0 : undefined }}>
              <ToastCard toast={t} onDismiss={() => toast.dismiss(t.id)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ToastCard({ toast: t, onDismiss }) {
  const { title, description, type = "default", action } = t;
  const typeStyles = {
    default: "bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800",
    success: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100 border-emerald-200 dark:border-emerald-500/20",
    error: "bg-red-50 dark:bg-red-500/10 text-red-900 dark:text-red-100 border-red-200 dark:border-red-500/20",
    info: "bg-blue-50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-500/20",
  };
  const IconMap = {
    default: null,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-500 mt-0.5 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500 mt-0.5 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-600 dark:text-blue-500 mt-0.5 shrink-0" />
  };

  return (
    <div className={cn("group flex items-start gap-3 w-full p-4 rounded-xl border shadow-lg backdrop-blur-md", typeStyles[type])}>
      {IconMap[type]}
      <div className="flex flex-col gap-1 w-full min-w-0">
        <div className="font-semibold text-sm">{title}</div>
        {description && <div className="text-sm opacity-80 line-clamp-2">{description}</div>}
        {action && <button onClick={() => { action.onClick(); onDismiss(); }} className="mt-2 w-max px-3 py-1.5 text-xs font-bold rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity">{action.label}</button>}
      </div>
      <button onClick={onDismiss} className="shrink-0 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all absolute right-2 top-2"><X className="w-4 h-4 opacity-70" /></button>
    </div>
  );
}`;

export function SonnerShowcase() {
  const [position, setPosition] = useState<"bottom-right" | "top-center">(
    "bottom-right",
  );

  const generateUsageCode = () => {
    return `import { toast, Toaster } from "@/components/custom/blocks/SonnerBlock";

export default function App() {
  return (
    <div>
      {/* 1. Mount the Toaster exactly once at the root of your app */}
      <Toaster position="${position}" />

      {/* 2. Call the toast function from anywhere! */}
      <button 
        onClick={() => toast("Event created", { 
          description: "Monday, January 3rd at 6:00pm",
          action: { label: "Undo", onClick: () => console.log("Undo") }
        })}
      >
        Show Toast
      </button>
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* IMPORTANT: Render the Toaster inside the showcase for the preview to work */}
      <Toaster position={position} />

      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col sm:flex-row gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Stack Position
          </label>
          <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
            <button
              onClick={() => setPosition("bottom-right")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                position === "bottom-right"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Bottom Right
            </button>
            <button
              onClick={() => setPosition("top-center")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                position === "top-center"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Top Center
            </button>
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="SonnerBlock"
        tsCode={SONNER_ENGINE_CODE_TS}
        jsCode={SONNER_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex flex-wrap gap-4 items-center justify-center min-h-[300px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 relative z-10">
          <button
            onClick={() =>
              toast("Profile updated successfully", {
                description: "Your changes have been saved to the database.",
              })
            }
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            Default
          </button>

          <button
            onClick={() =>
              toast.success("Deployment Complete", {
                description: "Your site is now live on the production server.",
              })
            }
            className="px-4 py-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-400 rounded-lg font-medium hover:bg-emerald-200 dark:hover:bg-emerald-500/30 transition-colors"
          >
            Success
          </button>

          <button
            onClick={() =>
              toast.error("Connection Failed", {
                description:
                  "Could not reach the database. Please try again later.",
              })
            }
            className="px-4 py-2 bg-red-100 dark:bg-red-500/20 text-red-900 dark:text-red-400 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors"
          >
            Error
          </button>

          <button
            onClick={() =>
              toast("Message deleted", {
                action: {
                  label: "Undo",
                  onClick: () => alert("Undo clicked!"),
                },
              })
            }
            className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            With Action
          </button>
        </div>
      </ComponentPreview>
    </div>
  );
}
