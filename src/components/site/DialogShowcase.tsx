"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/blocks/DialogBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { Settings, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const DIALOG_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DialogContextType { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; }
const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("Must be used within <Dialog>");
  return context;
}

export interface DialogProps { children: React.ReactNode; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; }
export function Dialog({ children, open: controlledOpen, defaultOpen = false, onOpenChange }: DialogProps) {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = (newOpen: boolean | ((prev: boolean) => boolean)) => {
    const nextState = typeof newOpen === "function" ? newOpen(open) : newOpen;
    if (!isControlled) setUncontrolledOpen(nextState);
    onOpenChange?.(nextState);
  };
  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
}

export function DialogTrigger({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { setOpen } = useDialog();
  return (
    <div role="button" tabIndex={0} onClick={() => setOpen(true)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } }} className={cn("inline-block", className)} {...props}>
      {children}
    </div>
  );
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> { hideCloseButton?: boolean; }
export function DialogContent({ className, children, hideCloseButton = false, ...props }: DialogContentProps) {
  const { open, setOpen } = useDialog();
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handleEscape);
    return () => { document.body.style.overflow = originalStyle; document.removeEventListener("keydown", handleEscape); };
  }, [open, setOpen]);

  if (!mounted || !open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setOpen(false)} aria-hidden="true" />
      <div ref={contentRef} role="dialog" aria-modal="true" className={cn("relative z-50 w-full max-w-lg grid gap-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] text-zinc-950 dark:text-zinc-50 p-6 shadow-lg sm:rounded-xl animate-in fade-in zoom-in-95 slide-in-from-top-[5%] duration-200", className)} {...props}>
        {children}
        {!hideCloseButton && (
          <button onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 outline-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </div>, document.body
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />; }
export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-2", className)} {...props} />; }
export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) { return <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />; }
export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) { return <p className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)} {...props} />; }
`;

// --- JAVASCRIPT ENGINE CODE (Hardcoded native ES6) ---
const DIALOG_ENGINE_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const DialogContext = createContext(undefined);

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("Must be used within <Dialog>");
  return context;
}

export function Dialog({ children, open: controlledOpen, defaultOpen = false, onOpenChange }) {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = (newOpen) => {
    const nextState = typeof newOpen === "function" ? newOpen(open) : newOpen;
    if (!isControlled) setUncontrolledOpen(nextState);
    onOpenChange?.(nextState);
  };
  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
}

export function DialogTrigger({ children, className, ...props }) {
  const { setOpen } = useDialog();
  return (
    <div role="button" tabIndex={0} onClick={() => setOpen(true)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } }} className={cn("inline-block", className)} {...props}>
      {children}
    </div>
  );
}

export function DialogContent({ className, children, hideCloseButton = false, ...props }) {
  const { open, setOpen } = useDialog();
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handleEscape);
    return () => { document.body.style.overflow = originalStyle; document.removeEventListener("keydown", handleEscape); };
  }, [open, setOpen]);

  if (!mounted || !open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setOpen(false)} aria-hidden="true" />
      <div ref={contentRef} role="dialog" aria-modal="true" className={cn("relative z-50 w-full max-w-lg grid gap-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] text-zinc-950 dark:text-zinc-50 p-6 shadow-lg sm:rounded-xl animate-in fade-in zoom-in-95 slide-in-from-top-[5%] duration-200", className)} {...props}>
        {children}
        {!hideCloseButton && (
          <button onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 outline-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </div>, document.body
  );
}

export function DialogHeader({ className, ...props }) { return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />; }
export function DialogFooter({ className, ...props }) { return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-2", className)} {...props} />; }
export function DialogTitle({ className, ...props }) { return <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />; }
export function DialogDescription({ className, ...props }) { return <p className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)} {...props} />; }
`;

export function DialogShowcase() {
  const [layout, setLayout] = useState<"standard" | "form" | "destructive">(
    "standard",
  );

  const generateUsageCode = () => {
    return `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/custom/blocks/DialogBlock";

export default function App() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="px-4 py-2 bg-black text-white rounded-md">
          Open Dialog
        </button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account.
          </DialogDescription>
        </DialogHeader>
        
        {/* Your custom body content here */}
        
        <DialogFooter>
          <button className="px-4 py-2 border rounded-md">Cancel</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md">Confirm</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col md:flex-row gap-6 p-5 rounded-xl z-0 relative">
        <VariantTabs
          variants={[
            { value: "standard", label: "Share Profile" },
            { value: "form", label: "Edit Settings" },
            { value: "destructive", label: "Destructive Action" },
          ]}
          label="Example Templates"
          defaultValue={layout}
          onValueChange={(v) => setLayout(v as "standard" | "form" | "destructive")}
        />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="DialogBlock"
        tsCode={DIALOG_ENGINE_CODE_TS}
        jsCode={DIALOG_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex items-center justify-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#f8fafc] dark:bg-[#050505] p-6 relative z-10 overflow-hidden">
          {layout === "standard" && (
            <Dialog>
              <DialogTrigger>
                <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-sm font-semibold rounded-md shadow-sm transition-colors">
                  <UserPlus className="w-4 h-4" /> Share Profile
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Profile</DialogTitle>
                  <DialogDescription>
                    Anyone who has this link will be able to view this.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2 my-4">
                  <input
                    className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value="https://nexus.dev/u/johndoe"
                    readOnly
                  />
                  <button className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-md shadow-sm shrink-0">
                    Copy Link
                  </button>
                </div>
                <DialogFooter>
                  <p className="text-xs text-zinc-500 text-left w-full sm:text-right mt-2 sm:mt-0 pt-2 border-t dark:border-zinc-800">
                    Your profile is currently public.
                  </p>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {layout === "form" && (
            <Dialog>
              <DialogTrigger>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-semibold rounded-md shadow-sm transition-colors">
                  <Settings className="w-4 h-4 text-zinc-500" /> Edit Profile
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label
                      htmlFor="name"
                      className="text-right text-sm font-medium"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      defaultValue="John Doe"
                      className="col-span-3 h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label
                      htmlFor="username"
                      className="text-right text-sm font-medium"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      defaultValue="@johndoe"
                      className="col-span-3 h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <DialogFooter>
                  {/* Closing behavior would normally be attached here */}
                  <button className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-md shadow-sm">
                    Save changes
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {layout === "destructive" && (
            <Dialog>
              <DialogTrigger>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 text-sm font-semibold rounded-md shadow-sm transition-colors">
                  <Trash2 className="w-4 h-4" /> Delete Account
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-red-600 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" /> Are you absolutely sure?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  {/* Example of manually handling the close context state using useDialog if extracted to a child component, but for visual purposes we just render the buttons */}
                  <div className="flex w-full sm:w-auto gap-2">
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-medium rounded-md shadow-sm">
                      Cancel
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md shadow-sm">
                      Yes, delete account
                    </button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </ComponentPreview>
    </div>
  );
}
