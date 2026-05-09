"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/custom/blocks/CollapsibleBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  Shield,
} from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const COLLAPSIBLE_ENGINE_CODE_TS = `"use client";

import React, { createContext, useContext, useState, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CollapsibleContextType { open: boolean; onOpenChange: (open: boolean) => void; disabled?: boolean; }
const CollapsibleContext = createContext<CollapsibleContextType | undefined>(undefined);

function useCollapsible() {
  const context = useContext(CollapsibleContext);
  if (!context) throw new Error("Must be used within <Collapsible>");
  return context;
}

export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; disabled?: boolean; }

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ className, open: controlledOpen, defaultOpen = false, onOpenChange, disabled = false, children, ...props }, ref) => {
    const isControlled = controlledOpen !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

    const handleOpenChange = (newOpen: boolean) => {
      if (disabled) return;
      if (!isControlled) setUncontrolledOpen(newOpen);
      onOpenChange?.(newOpen);
    };

    return (
      <CollapsibleContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange, disabled }}>
        <div ref={ref} data-state={isOpen ? "open" : "closed"} data-disabled={disabled ? "" : undefined} className={className} {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);
Collapsible.displayName = "Collapsible";

export interface CollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { open, onOpenChange, disabled } = useCollapsible();
    return (
      <button
        ref={ref} type="button" disabled={disabled} aria-expanded={open} data-state={open ? "open" : "closed"} data-disabled={disabled ? "" : undefined}
        onClick={(e) => { onOpenChange(!open); onClick?.(e); }}
        className={cn("flex items-center justify-between outline-none disabled:cursor-not-allowed disabled:opacity-50", className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";

export interface CollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open } = useCollapsible();
    return (
      <div
        ref={ref} data-state={open ? "open" : "closed"} aria-hidden={!open}
        className={cn("grid transition-all duration-200 ease-in-out", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0", className)}
        {...props}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    );
  }
);
CollapsibleContent.displayName = "CollapsibleContent";
`;

// --- JAVASCRIPT ENGINE CODE (Hardcoded native ES6) ---
const COLLAPSIBLE_ENGINE_CODE_JS = `"use client";

import React, { createContext, useContext, useState, forwardRef } from "react";
import { cn } from "@/lib/utils";

const CollapsibleContext = createContext(undefined);

function useCollapsible() {
  const context = useContext(CollapsibleContext);
  if (!context) throw new Error("Must be used within <Collapsible>");
  return context;
}

export const Collapsible = forwardRef(({ className, open: controlledOpen, defaultOpen = false, onOpenChange, disabled = false, children, ...props }, ref) => {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = (newOpen) => {
    if (disabled) return;
    if (!isControlled) setUncontrolledOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <CollapsibleContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange, disabled }}>
      <div ref={ref} data-state={isOpen ? "open" : "closed"} data-disabled={disabled ? "" : undefined} className={className} {...props}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
});
Collapsible.displayName = "Collapsible";

export const CollapsibleTrigger = forwardRef(({ className, onClick, children, ...props }, ref) => {
  const { open, onOpenChange, disabled } = useCollapsible();
  return (
    <button
      ref={ref} type="button" disabled={disabled} aria-expanded={open} data-state={open ? "open" : "closed"} data-disabled={disabled ? "" : undefined}
      onClick={(e) => { onOpenChange(!open); onClick?.(e); }}
      className={cn("flex items-center justify-between outline-none disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    >
      {children}
    </button>
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

export const CollapsibleContent = forwardRef(({ className, children, ...props }, ref) => {
  const { open } = useCollapsible();
  return (
    <div
      ref={ref} data-state={open ? "open" : "closed"} aria-hidden={!open}
      className={cn("grid transition-all duration-200 ease-in-out", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0", className)}
      {...props}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
});
CollapsibleContent.displayName = "CollapsibleContent";
`;

export function CollapsibleShowcase() {
  const [layout, setLayout] = useState<"basic" | "settings" | "filetree">(
    "basic",
  );

  const generateUsageCode = () => {
    if (layout === "settings") {
      return `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/custom/blocks/CollapsibleBlock";
import { Settings2 } from "lucide-react";

export default function SettingsPanel() {
  return (
    <Collapsible className="border rounded-xl bg-white shadow-sm w-full max-w-sm overflow-hidden">
      <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 transition-colors">
        <div className="flex items-center gap-3">
          <Settings2 className="w-5 h-5 text-zinc-500" />
          <div className="text-left">
            <h4 className="text-sm font-semibold">Advanced Preferences</h4>
            <p className="text-xs text-zinc-500">Manage API keys and webhooks</p>
          </div>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="p-4 pt-0 border-t mt-4 space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold">API Key</label>
            <input type="password" value="**************" className="border rounded p-2 text-sm" readOnly />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}`;
    }

    if (layout === "filetree") {
      return `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/custom/blocks/CollapsibleBlock";
import { Folder, File, ChevronRight } from "lucide-react";

export default function FileTree() {
  return (
    <div className="w-64 space-y-1">
      {/* Root Folder */}
      <Collapsible defaultOpen>
        {/* Note the justify-start class here to keep items aligned left */}
        <CollapsibleTrigger className="flex items-center justify-start gap-2 w-full p-2 hover:bg-zinc-100 rounded-md text-sm font-medium group">
          <ChevronRight className="w-4 h-4 transition-transform group-data-[state=open]:rotate-90" />
          <Folder className="w-4 h-4 text-blue-500" />
          src
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="pl-6 space-y-1 border-l ml-3 my-1">
            
            {/* Nested Folder */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-start gap-2 w-full p-2 hover:bg-zinc-100 rounded-md text-sm font-medium group">
                <ChevronRight className="w-4 h-4 transition-transform group-data-[state=open]:rotate-90" />
                <Folder className="w-4 h-4 text-blue-500" />
                components
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pl-6 space-y-1 border-l ml-3 my-1">
                  <div className="flex items-center gap-2 p-2 text-sm text-zinc-600 hover:bg-zinc-100 rounded-md cursor-pointer">
                    <File className="w-4 h-4" /> Button.tsx
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}`;
    }

    return `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/custom/blocks/CollapsibleBlock";
import { ChevronDown } from "lucide-react";

export default function BasicFAQ() {
  return (
    <Collapsible className="w-[300px] border rounded-lg p-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold group">
        Can I use this commercially?
        <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="text-sm text-zinc-500 pt-4">
          Yes. The code is completely free and MIT licensed. You can use it in personal, commercial, and client projects.
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col md:flex-row gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Layout Example
          </label>
          <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
            <button
              onClick={() => setLayout("basic")}
              className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                layout === "basic"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Basic (FAQ)
            </button>
            <button
              onClick={() => setLayout("settings")}
              className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                layout === "settings"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Settings Panel
            </button>
            <button
              onClick={() => setLayout("filetree")}
              className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                layout === "filetree"
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              File Tree (Nested)
            </button>
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="CollapsibleBlock"
        tsCode={COLLAPSIBLE_ENGINE_CODE_TS}
        jsCode={COLLAPSIBLE_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex items-center justify-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#f8fafc] dark:bg-[#050505] p-6 relative z-10 overflow-hidden">
          {layout === "basic" && (
            <div className="w-full max-w-md space-y-4">
              <Collapsible
                defaultOpen
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold text-zinc-900 dark:text-zinc-100 group">
                  Can I use this UI kit in open source?
                  <ChevronDown className="w-4 h-4 text-zinc-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 pt-3">
                    Absolutely! This code is completely dependency-free and
                    yours to own. Copy it into your personal, commercial, or
                    open-source repositories.
                  </p>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold text-zinc-900 dark:text-zinc-100 group">
                  How does the animation work?
                  <ChevronDown className="w-4 h-4 text-zinc-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 pt-3">
                    It uses a modern CSS technique: transitioning
                    `grid-template-rows` from `0fr` to `1fr`. This allows smooth
                    height animation without needing Javascript to measure
                    elements.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}

          {layout === "settings" && (
            <div className="w-full max-w-lg space-y-4">
              <Collapsible
                defaultOpen
                className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden"
              >
                <CollapsibleTrigger className="w-full flex items-center justify-between p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                      <Bell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Push Notifications
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Manage your alert preferences
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-zinc-400 dark:text-zinc-500 group-data-[state=open]:hidden">
                    Configure
                  </div>
                  <div className="text-xs font-medium text-zinc-400 dark:text-zinc-500 hidden group-data-[state=open]:block">
                    Close
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-5 pt-0 border-t border-zinc-100 dark:border-zinc-800/50 mt-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-zinc-700 dark:text-zinc-300">
                        Email Alerts
                      </label>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="accent-indigo-500 w-4 h-4"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-zinc-700 dark:text-zinc-300">
                        SMS Alerts
                      </label>
                      <input
                        type="checkbox"
                        className="accent-indigo-500 w-4 h-4"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
                <CollapsibleTrigger className="w-full flex items-center justify-between p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Security & API
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Tokens and authentication
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-zinc-400 dark:text-zinc-500 group-data-[state=open]:hidden">
                    Configure
                  </div>
                  <div className="text-xs font-medium text-zinc-400 dark:text-zinc-500 hidden group-data-[state=open]:block">
                    Close
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-5 pt-0 border-t border-zinc-100 dark:border-zinc-800/50 mt-2 space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        Production Key
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="password"
                          value="sk_live_123456789"
                          readOnly
                          className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-2 text-sm text-zinc-600"
                        />
                        <button className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-md">
                          Roll
                        </button>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}

          {layout === "filetree" && (
            <div className="w-full max-w-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm font-mono text-sm">
              <div className="space-y-1">
                {/* Level 1: src */}
                <Collapsible defaultOpen>
                  {/* FIXED: Added justify-start here */}
                  <CollapsibleTrigger className="flex items-center justify-start gap-2 w-full p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md text-zinc-700 dark:text-zinc-300 group">
                    <ChevronRight className="w-4 h-4 text-zinc-400 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    <Folder className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>src</span>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="pl-[22px] space-y-1 relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-zinc-200 dark:before:bg-zinc-800 mt-1 mb-1">
                      {/* Level 2: app */}
                      <Collapsible defaultOpen>
                        {/* FIXED: Added justify-start here */}
                        <CollapsibleTrigger className="flex items-center justify-start gap-2 w-full p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md text-zinc-700 dark:text-zinc-300 group relative z-10">
                          <ChevronRight className="w-4 h-4 text-zinc-400 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                          <Folder className="w-4 h-4 text-indigo-500 shrink-0" />
                          <span>app</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="pl-[22px] space-y-1 relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-zinc-200 dark:before:bg-zinc-800 mt-1 mb-1">
                            <div className="flex items-center gap-2 p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md cursor-pointer ml-6 relative z-10">
                              <File className="w-4 h-4 shrink-0" /> layout.tsx
                            </div>
                            <div className="flex items-center gap-2 p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md cursor-pointer ml-6 relative z-10">
                              <File className="w-4 h-4 shrink-0" /> page.tsx
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Level 2: components */}
                      <Collapsible>
                        {/* FIXED: Added justify-start here */}
                        <CollapsibleTrigger className="flex items-center justify-start gap-2 w-full p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md text-zinc-700 dark:text-zinc-300 group relative z-10">
                          <ChevronRight className="w-4 h-4 text-zinc-400 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                          <Folder className="w-4 h-4 text-indigo-500 shrink-0" />
                          <span>components</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="pl-[22px] space-y-1 relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-zinc-200 dark:before:bg-zinc-800 mt-1 mb-1">
                            <div className="flex items-center gap-2 p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md cursor-pointer ml-6 relative z-10">
                              <File className="w-4 h-4 shrink-0" /> Button.tsx
                            </div>
                            <div className="flex items-center gap-2 p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md cursor-pointer ml-6 relative z-10">
                              <File className="w-4 h-4 shrink-0" />{" "}
                              Collapsible.tsx
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Root Files */}
                <div className="flex items-center gap-2 p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md cursor-pointer ml-[22px]">
                  <File className="w-4 h-4 shrink-0" /> package.json
                </div>
              </div>
            </div>
          )}
        </div>
      </ComponentPreview>
    </div>
  );
}
