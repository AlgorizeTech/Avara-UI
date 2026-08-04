"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/custom/blocks/ContextMenuBlock";
import { toast, Toaster } from "@/components/custom/blocks/SonnerBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import {
  Copy,
  Download,
  FileEdit,
  Scissors,
  Share2,
  Trash,
} from "lucide-react";

// --- TYPESCRIPT ENGINE CODE ---
const CONTEXT_MENU_ENGINE_CODE_TS = `"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ContextMenuContextType { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; coords: { x: number; y: number }; setCoords: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>; }
const ContextMenuContext = createContext<ContextMenuContextType | undefined>(undefined);

export function ContextMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  return <ContextMenuContext.Provider value={{ open, setOpen, coords, setCoords }}>{children}</ContextMenuContext.Provider>;
}

export function ContextMenuTrigger({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = useContext(ContextMenuContext);
  if (!context) throw new Error("ContextMenuTrigger must be used within a ContextMenu");
  const timerRef = useRef<any>(null);
  const openMenuAt = (x: number, y: number) => { context.setCoords({ x, y }); context.setOpen(true); };
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); openMenuAt(e.clientX, e.clientY); };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => { if (e.touches.length === 1) { const t = e.touches[0]; timerRef.current = setTimeout(() => openMenuAt(t.clientX, t.clientY), 500); } };
  const handleTouchEnd = () => { if (timerRef.current) clearTimeout(timerRef.current); };
  return <div onContextMenu={handleContextMenu} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchEnd} className={cn("w-full h-full select-none", className)} {...props}>{children}</div>;
}

export function ContextMenuContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = useContext(ContextMenuContext);
  if (!context) throw new Error("ContextMenuContent must be used within a ContextMenu");
  const { open, setOpen, coords } = context;
  const contentRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);
  const [adjustedCoords, setAdjustedCoords] = useState({ x: -9999, y: -9999 });
  const [visible, setVisible] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open || !contentRef.current) { setVisible(false); return; }
    const adjustPosition = () => {
      const menu = contentRef.current;
      if (!menu) return;
      const win = menu.ownerDocument.defaultView ?? window;
      const rect = menu.getBoundingClientRect();
      let x = coords.x; let y = coords.y;
      if (x + rect.width > win.innerWidth) x = win.innerWidth - rect.width - 8;
      if (x < 8) x = 8;
      if (y + rect.height > win.innerHeight) y = win.innerHeight - rect.height - 8;
      if (y < 8) y = 8;
      setAdjustedCoords({ x, y });
      setVisible(true);
    };
    const timer = setTimeout(adjustPosition, 0);
    return () => clearTimeout(timer);
  }, [open, coords]);

  useEffect(() => {
    if (!open) return;
    const handleInteractOutside = (e: MouseEvent | TouchEvent) => { if (contentRef.current && !contentRef.current.contains(e.target as Node)) setOpen(false); };
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const handleScroll = () => { setOpen(false); };
    const doc = contentRef.current?.ownerDocument ?? document;
    const win = doc.defaultView ?? window;
    doc.addEventListener("mousedown", handleInteractOutside); doc.addEventListener("touchstart", handleInteractOutside); doc.addEventListener("keydown", handleEscape); win.addEventListener("scroll", handleScroll, true);
    return () => { doc.removeEventListener("mousedown", handleInteractOutside); doc.removeEventListener("touchstart", handleInteractOutside); doc.removeEventListener("keydown", handleEscape); win.removeEventListener("scroll", handleScroll, true); };
  }, [open, setOpen]);

  if (!mounted || !open) return <span ref={anchorRef} hidden />;
  const portalTarget = anchorRef.current?.ownerDocument.body ?? document.body;
  return createPortal(
    <div ref={contentRef} role="menu" style={{ top: adjustedCoords.y, left: adjustedCoords.x, opacity: visible ? 1 : 0 }} className={cn("fixed z-[9999] min-w-[12rem] max-w-[calc(100vw-16px)] max-h-[calc(100vh-16px)] overflow-y-auto rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-1 shadow-md transition-opacity duration-150", className)} onClick={(e) => e.stopPropagation()} onContextMenu={(e) => e.preventDefault()} {...props}>
      {children}
    </div>, portalTarget
  );
}

export function ContextMenuItem({ className, inset, disabled, onClick, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean; disabled?: boolean; }) {
  const context = useContext(ContextMenuContext);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => { if (disabled) return; onClick?.(e); context?.setOpen(false); };
  return <div role="menuitem" onClick={handleClick} data-disabled={disabled ? "true" : undefined} className={cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors", inset && "pl-8", disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 text-zinc-950 dark:text-zinc-50", className)} {...props}>{children}</div>;
}
export function ContextMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("-mx-1 my-1 h-px bg-zinc-200 dark:bg-zinc-800", className)} {...props} />; }
export function ContextMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) { return <span className={cn("ml-auto text-xs tracking-widest text-zinc-500 dark:text-zinc-400", className)} {...props} />; }
export function ContextMenuLabel({ className, inset, ...props }: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) { return <div className={cn("px-2 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400", inset && "pl-8", className)} {...props} />; }
`;

// --- JAVASCRIPT ENGINE CODE (Hardcoded native ES6) ---
const CONTEXT_MENU_ENGINE_CODE_JS = `"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const ContextMenuContext = createContext(undefined);

export function ContextMenu({ children }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  return <ContextMenuContext.Provider value={{ open, setOpen, coords, setCoords }}>{children}</ContextMenuContext.Provider>;
}

export function ContextMenuTrigger({ className, children, ...props }) {
  const context = useContext(ContextMenuContext);
  if (!context) throw new Error("ContextMenuTrigger must be used within a ContextMenu");
  const handleContextMenu = (e) => { e.preventDefault(); e.stopPropagation(); context.setCoords({ x: e.clientX, y: e.clientY }); context.setOpen(true); };
  return <div onContextMenu={handleContextMenu} className={cn("w-full h-full", className)} {...props}>{children}</div>;
}

export function ContextMenuContent({ className, children, ...props }) {
  const context = useContext(ContextMenuContext);
  if (!context) throw new Error("ContextMenuContent must be used within a ContextMenu");
  const { open, setOpen, coords } = context;
  const contentRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [adjustedCoords, setAdjustedCoords] = useState({ x: -9999, y: -9999 });
  const [visible, setVisible] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open || !contentRef.current) { setVisible(false); return; }
    const adjustPosition = () => {
      const menu = contentRef.current;
      if (!menu) return;
      const rect = menu.getBoundingClientRect();
      let x = coords.x; let y = coords.y;
      if (x + rect.width > window.innerWidth) x = window.innerWidth - rect.width - 8;
      if (y + rect.height > window.innerHeight) y = window.innerHeight - rect.height - 8;
      setAdjustedCoords({ x, y });
      setVisible(true);
    };
    const timer = setTimeout(adjustPosition, 0);
    return () => clearTimeout(timer);
  }, [open, coords]);

  useEffect(() => {
    if (!open) return;
    const handleInteractOutside = (e) => { if (contentRef.current && !contentRef.current.contains(e.target)) setOpen(false); };
    const handleEscape = (e) => { if (e.key === "Escape") setOpen(false); };
    const handleScroll = () => { setOpen(false); };
    document.addEventListener("mousedown", handleInteractOutside); document.addEventListener("touchstart", handleInteractOutside); document.addEventListener("keydown", handleEscape); window.addEventListener("scroll", handleScroll, true);
    return () => { document.removeEventListener("mousedown", handleInteractOutside); document.removeEventListener("touchstart", handleInteractOutside); document.removeEventListener("keydown", handleEscape); window.removeEventListener("scroll", handleScroll, true); };
  }, [open, setOpen]);

  if (!mounted || !open) return null;
  return createPortal(
    <div ref={contentRef} role="menu" style={{ top: adjustedCoords.y, left: adjustedCoords.x, opacity: visible ? 1 : 0 }} className={cn("fixed z-[9999] min-w-[12rem] overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-1 shadow-md transition-opacity duration-150", className)} onClick={(e) => e.stopPropagation()} onContextMenu={(e) => e.preventDefault()} {...props}>
      {children}
    </div>, document.body
  );
}

export function ContextMenuItem({ className, inset, disabled, onClick, children, ...props }) {
  const context = useContext(ContextMenuContext);
  const handleClick = (e) => { if (disabled) return; onClick?.(e); context?.setOpen(false); };
  return <div role="menuitem" onClick={handleClick} data-disabled={disabled ? "true" : undefined} className={cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors", inset && "pl-8", disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : "hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 text-zinc-950 dark:text-zinc-50", className)} {...props}>{children}</div>;
}
export function ContextMenuSeparator({ className, ...props }) { return <div className={cn("-mx-1 my-1 h-px bg-zinc-200 dark:bg-zinc-800", className)} {...props} />; }
export function ContextMenuShortcut({ className, ...props }) { return <span className={cn("ml-auto text-xs tracking-widest text-zinc-500 dark:text-zinc-400", className)} {...props} />; }
export function ContextMenuLabel({ className, inset, ...props }) { return <div className={cn("px-2 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400", inset && "pl-8", className)} {...props} />; }
`;

export function ContextMenuShowcase() {
  const handleAction = (action: string) => {
    toast("Action triggered", { description: "You clicked on " + action });
  };

  const generateUsageCode = () => {
    return `import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem,
  ContextMenuSeparator, ContextMenuShortcut, ContextMenuLabel
} from "@/components/custom/blocks/ContextMenuBlock";

export default function FileBrowser() {
  return (
    <ContextMenu>
      {/* 1. The Trigger area intercepts the right click */}
      <ContextMenuTrigger className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      
      {/* 2. The Content renders dynamically at the cursor */}
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        
        <ContextMenuSeparator />
        
        <ContextMenuItem>
          Save As... <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Print...</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      <Toaster position="bottom-right" />

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ContextMenuBlock"
        tsCode={CONTEXT_MENU_ENGINE_CODE_TS}
        jsCode={CONTEXT_MENU_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
        sandbox="context-menu"
      >
        <div className="w-full flex items-center justify-center min-h-[260px] sm:min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#f8fafc] dark:bg-[#050505] p-2 sm:p-6 relative z-10 overflow-hidden">
          <ContextMenu>
            <ContextMenuTrigger className="w-full max-w-[280px] sm:max-w-lg min-h-[160px] sm:min-h-[220px] border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-2xl flex flex-col items-center justify-center p-5 sm:p-8 text-center transition-colors hover:border-indigo-400 dark:hover:border-indigo-500/50 cursor-pointer">
              <div className="flex flex-col items-center justify-center w-full px-2">
                <h3 className="font-semibold text-xs sm:text-base text-zinc-900 dark:text-zinc-100">
                  Click / Right-Click / Touch Area
                </h3>
                <p className="text-[11px] sm:text-sm text-zinc-500 mt-1.5 leading-relaxed">
                  Click or right-click (long-press on mobile) inside this box to open the context menu.
                </p>
              </div>
            </ContextMenuTrigger>

            <ContextMenuContent className="w-48 sm:w-64">
              <ContextMenuLabel>Document Actions</ContextMenuLabel>
              <ContextMenuItem onSelect={() => handleAction("Edit")}>
                <FileEdit className="w-4 h-4 mr-2" />
                Edit File
                <ContextMenuShortcut>⌘E</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleAction("Download")}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
                <ContextMenuShortcut>⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleAction("Share")}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Link
              </ContextMenuItem>

              <ContextMenuSeparator />

              <ContextMenuLabel>Clipboard</ContextMenuLabel>
              <ContextMenuItem onClick={() => handleAction("Copy")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem disabled>
                <Scissors className="w-4 h-4 mr-2" />
                Cut
                <ContextMenuShortcut>⌘X</ContextMenuShortcut>
              </ContextMenuItem>

              <ContextMenuSeparator />

              <ContextMenuItem
                onClick={() => handleAction("Delete")}
                className="text-red-600 focus:bg-red-50 dark:focus:bg-red-950 focus:text-red-700"
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
                <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </ComponentPreview>
    </div>
  );
}
