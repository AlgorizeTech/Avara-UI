"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/custom/blocks/CommandBlock";
import { toast, Toaster } from "@/components/custom/blocks/SonnerBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import {
  Calculator,
  Calendar,
  CreditCard,
  LogOut,
  Settings,
  Smile,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const COMMAND_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface CommandContextType { search: string; setSearch: (search: string) => void; commandRef: React.RefObject<HTMLDivElement | null>; }
const CommandContext = createContext<CommandContextType | undefined>(undefined);

function useCommand() {
  const context = useContext(CommandContext);
  if (!context) throw new Error("Must be used within <Command>");
  return context;
}

export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> { shouldFilter?: boolean; }
export function Command({ className, shouldFilter = true, children, ...props }: CommandProps) {
  const [search, setSearch] = useState("");
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const node = commandRef.current;
      if (!node) return;
      const items = Array.from(node.querySelectorAll('[cmdk-item="true"]:not([hidden])')) as HTMLElement[];
      if (!items.length) return;

      const currentIndex = items.findIndex((item) => item.getAttribute("data-selected") === "true");

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = currentIndex + 1 < items.length ? currentIndex + 1 : 0;
        items.forEach((i) => i.removeAttribute("data-selected"));
        items[nextIndex].setAttribute("data-selected", "true");
        items[nextIndex].scrollIntoView({ block: "nearest" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : items.length - 1;
        items.forEach((i) => i.removeAttribute("data-selected"));
        items[nextIndex].setAttribute("data-selected", "true");
        items[nextIndex].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (currentIndex !== -1) items[currentIndex].click();
      }
    };
    const node = commandRef.current;
    node?.addEventListener("keydown", handleKeyDown);
    return () => node?.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const node = commandRef.current;
      if (!node) return;
      const items = Array.from(node.querySelectorAll('[cmdk-item="true"]:not([hidden])')) as HTMLElement[];
      items.forEach((i) => i.removeAttribute("data-selected"));
      if (items.length > 0) items[0].setAttribute("data-selected", "true");
    }, 0);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <CommandContext.Provider value={{ search, setSearch, commandRef }}>
      <div ref={commandRef} cmdk-root="true" className={cn("flex h-full w-full flex-col overflow-hidden rounded-xl bg-white dark:bg-[#050505] text-zinc-950 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 shadow-sm", className)} {...props}>
        {children}
      </div>
    </CommandContext.Provider>
  );
}

export interface CommandDialogProps extends CommandProps { open: boolean; onOpenChange: (open: boolean) => void; }
export function CommandDialog({ open, onOpenChange, children, ...props }: CommandDialogProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    if (open) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onOpenChange]);

  if (!mounted || !open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] bg-zinc-950/50 dark:bg-zinc-950/80 backdrop-blur-sm">
      <div className="fixed inset-0 z-40" onClick={() => onOpenChange(false)} aria-hidden="true" />
      <div className="z-50 w-full max-w-xl animate-in fade-in zoom-in-95 slide-in-from-top-[10%] duration-200 px-4 sm:px-0">
        <Command className="shadow-2xl h-[400px] border-none ring-1 ring-zinc-200 dark:ring-zinc-800" {...props}>{children}</Command>
      </div>
    </div>, document.body
  );
}

export function CommandInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const { search, setSearch } = useCommand();
  return (
    <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 px-3" cmdk-input-wrapper="">
      <Search className="mr-2 h-4 w-4 shrink-0 text-zinc-500" />
      <input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} className={cn("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
    </div>
  );
}

export function CommandList({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden p-1", className)} cmdk-list="true" role="listbox" {...props}>{children}</div>;
}

export function CommandEmpty({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { search, commandRef } = useCommand();
  const [hasResults, setHasResults] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!commandRef.current) return;
      const visibleItems = commandRef.current.querySelectorAll('[cmdk-item="true"]:not([hidden])');
      setHasResults(visibleItems.length > 0);
    }, 10);
    return () => clearTimeout(timer);
  }, [search, commandRef]);

  if (hasResults) return null;
  return <div className={cn("py-6 text-center text-sm text-zinc-500", className)} {...props}>{children}</div>;
}

export function CommandGroup({ heading, className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { heading?: string }) {
  return (
    <div cmdk-group="true" className={cn("overflow-hidden p-1 text-zinc-950 dark:text-zinc-50 hidden [&:has([cmdk-item=true]:not([hidden]))]:block", className)} {...props}>
      {heading && <div className="px-2 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">{heading}</div>}
      {children}
    </div>
  );
}

export function CommandSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("-mx-1 h-px bg-zinc-200 dark:bg-zinc-800", className)} {...props} />;
}

export interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> { value?: string; onSelect?: (value: string) => void; }
export function CommandItem({ className, value, onSelect, children, ...props }: CommandItemProps) {
  const { search, commandRef } = useCommand();
  const itemRef = useRef<HTMLDivElement>(null);

  const textValue = value || itemRef.current?.textContent || "";
  const isMatch = !search || textValue.toLowerCase().includes(search.toLowerCase());

  const handleSelect = () => { if (onSelect) onSelect(textValue); };
  const handleMouseEnter = () => {
    if (!commandRef.current) return;
    const items = commandRef.current.querySelectorAll('[cmdk-item="true"]');
    items.forEach((i) => i.removeAttribute("data-selected"));
    itemRef.current?.setAttribute("data-selected", "true");
  };

  return (
    <div ref={itemRef} cmdk-item="true" hidden={!isMatch} onClick={handleSelect} onMouseEnter={handleMouseEnter} className={cn("relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors data-[selected=true]:bg-zinc-100 dark:data-[selected=true]:bg-zinc-800 data-[selected=true]:text-zinc-900 dark:data-[selected=true]:text-zinc-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50", className)} {...props}>
      {children}
    </div>
  );
}

export function CommandShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ml-auto text-xs tracking-widest text-zinc-500 dark:text-zinc-400", className)} {...props} />;
}
`;

// --- JAVASCRIPT ENGINE CODE (Hardcoded native ES6) ---
const COMMAND_ENGINE_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const CommandContext = createContext(undefined);

function useCommand() {
  const context = useContext(CommandContext);
  if (!context) throw new Error("Must be used within <Command>");
  return context;
}

export function Command({ className, shouldFilter = true, children, ...props }) {
  const [search, setSearch] = useState("");
  const commandRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const node = commandRef.current;
      if (!node) return;
      const items = Array.from(node.querySelectorAll('[cmdk-item="true"]:not([hidden])'));
      if (!items.length) return;

      const currentIndex = items.findIndex((item) => item.getAttribute("data-selected") === "true");

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = currentIndex + 1 < items.length ? currentIndex + 1 : 0;
        items.forEach((i) => i.removeAttribute("data-selected"));
        items[nextIndex].setAttribute("data-selected", "true");
        items[nextIndex].scrollIntoView({ block: "nearest" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : items.length - 1;
        items.forEach((i) => i.removeAttribute("data-selected"));
        items[nextIndex].setAttribute("data-selected", "true");
        items[nextIndex].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (currentIndex !== -1) items[currentIndex].click();
      }
    };
    const node = commandRef.current;
    node?.addEventListener("keydown", handleKeyDown);
    return () => node?.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const node = commandRef.current;
      if (!node) return;
      const items = Array.from(node.querySelectorAll('[cmdk-item="true"]:not([hidden])'));
      items.forEach((i) => i.removeAttribute("data-selected"));
      if (items.length > 0) items[0].setAttribute("data-selected", "true");
    }, 0);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <CommandContext.Provider value={{ search, setSearch, commandRef }}>
      <div ref={commandRef} cmdk-root="true" className={cn("flex h-full w-full flex-col overflow-hidden rounded-xl bg-white dark:bg-[#050505] text-zinc-950 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 shadow-sm", className)} {...props}>
        {children}
      </div>
    </CommandContext.Provider>
  );
}

export function CommandDialog({ open, onOpenChange, children, ...props }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const handleEscape = (e) => { if (e.key === "Escape") onOpenChange(false); };
    if (open) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onOpenChange]);

  if (!mounted || !open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] bg-zinc-950/50 dark:bg-zinc-950/80 backdrop-blur-sm">
      <div className="fixed inset-0 z-40" onClick={() => onOpenChange(false)} aria-hidden="true" />
      <div className="z-50 w-full max-w-xl animate-in fade-in zoom-in-95 slide-in-from-top-[10%] duration-200 px-4 sm:px-0">
        <Command className="shadow-2xl h-[400px] border-none ring-1 ring-zinc-200 dark:ring-zinc-800" {...props}>{children}</Command>
      </div>
    </div>, document.body
  );
}

export function CommandInput({ className, ...props }) {
  const { search, setSearch } = useCommand();
  return (
    <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 px-3" cmdk-input-wrapper="">
      <Search className="mr-2 h-4 w-4 shrink-0 text-zinc-500" />
      <input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} className={cn("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
    </div>
  );
}

export function CommandList({ className, children, ...props }) {
  return <div className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden p-1", className)} cmdk-list="true" role="listbox" {...props}>{children}</div>;
}

export function CommandEmpty({ className, children, ...props }) {
  const { search, commandRef } = useCommand();
  const [hasResults, setHasResults] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!commandRef.current) return;
      const visibleItems = commandRef.current.querySelectorAll('[cmdk-item="true"]:not([hidden])');
      setHasResults(visibleItems.length > 0);
    }, 10);
    return () => clearTimeout(timer);
  }, [search, commandRef]);

  if (hasResults) return null;
  return <div className={cn("py-6 text-center text-sm text-zinc-500", className)} {...props}>{children}</div>;
}

export function CommandGroup({ heading, className, children, ...props }) {
  return (
    <div cmdk-group="true" className={cn("overflow-hidden p-1 text-zinc-950 dark:text-zinc-50 hidden [&:has([cmdk-item=true]:not([hidden]))]:block", className)} {...props}>
      {heading && <div className="px-2 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">{heading}</div>}
      {children}
    </div>
  );
}

export function CommandSeparator({ className, ...props }) {
  return <div className={cn("-mx-1 h-px bg-zinc-200 dark:bg-zinc-800", className)} {...props} />;
}

export function CommandItem({ className, value, onSelect, children, ...props }) {
  const { search, commandRef } = useCommand();
  const itemRef = useRef(null);

  const textValue = value || itemRef.current?.textContent || "";
  const isMatch = !search || textValue.toLowerCase().includes(search.toLowerCase());

  const handleSelect = () => { if (onSelect) onSelect(textValue); };
  const handleMouseEnter = () => {
    if (!commandRef.current) return;
    const items = commandRef.current.querySelectorAll('[cmdk-item="true"]');
    items.forEach((i) => i.removeAttribute("data-selected"));
    itemRef.current?.setAttribute("data-selected", "true");
  };

  return (
    <div ref={itemRef} cmdk-item="true" hidden={!isMatch} onClick={handleSelect} onMouseEnter={handleMouseEnter} className={cn("relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors data-[selected=true]:bg-zinc-100 dark:data-[selected=true]:bg-zinc-800 data-[selected=true]:text-zinc-900 dark:data-[selected=true]:text-zinc-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50", className)} {...props}>
      {children}
    </div>
  );
}

export function CommandShortcut({ className, ...props }) {
  return <span className={cn("ml-auto text-xs tracking-widest text-zinc-500 dark:text-zinc-400", className)} {...props} />;
}
`;

export function CommandShowcase() {
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState<"inline" | "dialog">("inline");

  // Keyboard shortcut effect for Dialog
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleAction = (val: string) => {
    // FIX: Using pure string concatenation to avoid TS/JS AST parsing errors
    toast("Action triggered", { description: "You selected: " + val });
    setOpen(false);
  };

  const generateUsageCode = () => {
    if (layout === "dialog") {
      return `import { useState, useEffect } from "react";
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator, CommandShortcut,
} from "@/components/custom/blocks/CommandBlock";
import { Calculator, Calendar, Settings } from "lucide-react";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <p>Press <kbd>⌘K</kbd> to open</p>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => console.log('Calendar')}>
              <Calendar className="mr-2 h-4 w-4" /> Calendar
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" /> Calculator
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Settings">
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" /> Settings
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}`;
    }

    return `import {
  Command, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator, CommandShortcut,
} from "@/components/custom/blocks/CommandBlock";
import { User, CreditCard, Settings } from "lucide-react";

export default function InlineCommand() {
  return (
    <Command className="border shadow-sm max-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Profile">
          <CommandItem>
            <User className="mr-2 h-4 w-4" /> Profile
            <CommandShortcut>⇧⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" /> Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="System">
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" /> Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}`;
  };

  const SharedCommandContent = () => (
    <>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No matching records found.</CommandEmpty>

        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={handleAction}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem onSelect={handleAction}>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem onSelect={handleAction}>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          <CommandItem onSelect={handleAction}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={handleAction}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={handleAction}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Danger Zone">
          <CommandItem
            className="text-red-500 data-[selected=true]:text-red-600 data-[selected=true]:bg-red-50 dark:data-[selected=true]:bg-red-950"
            onSelect={handleAction}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <CommandShortcut>⇧⌘Q</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      <Toaster position="bottom-right" />

      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col md:flex-row gap-6 p-5 rounded-xl z-0 relative">
        <VariantTabs
          variants={[
            { value: "inline", label: "Inline Static" },
            { value: "dialog", label: "Modal Dialog" },
          ]}
          label="Layout Mode"
          defaultValue={layout}
          onValueChange={(v) => setLayout(v as "inline" | "dialog")}
        />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="CommandBlock"
        tsCode={COMMAND_ENGINE_CODE_TS}
        jsCode={COMMAND_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex items-center justify-center min-h-[450px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#f8fafc] dark:bg-[#050505] p-6 relative z-10 overflow-hidden">
          {layout === "inline" ? (
            <div className="w-full max-w-[450px]">
              <Command>
                <SharedCommandContent />
              </Command>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <p className="text-sm text-zinc-500 mb-4">
                Press{" "}
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-1.5 font-mono text-[10px] font-medium text-zinc-600 dark:text-zinc-400 opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>{" "}
                or click the button to open the command menu.
              </p>
              <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-md shadow-sm hover:opacity-90 transition-opacity"
              >
                Open Command Dialog
              </button>
            </div>
          )}

          <CommandDialog open={open} onOpenChange={setOpen}>
            <SharedCommandContent />
          </CommandDialog>
        </div>
      </ComponentPreview>
    </div>
  );
}
