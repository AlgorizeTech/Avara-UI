"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/custom/blocks/Drawer";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const DRAWER_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type DrawerSide = "top" | "bottom" | "left" | "right";

interface DrawerContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side: DrawerSide;
}

const DrawerContext = createContext<DrawerContextType | null>(null);

export const Drawer = ({ open, onOpenChange, side = "right", children }: { open: boolean; onOpenChange: (open: boolean) => void; side?: DrawerSide; children: React.ReactNode; }) => {
  const [mounted, setMounted] = useState(false);
  const [renderLayer, setRenderLayer] = useState(open);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) {
      setRenderLayer(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => setRenderLayer(false), 300);
      return () => clearTimeout(timer);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange]);

  if (!mounted || !renderLayer) return null;

  return createPortal(
    <DrawerContext.Provider value={{ open, onOpenChange, side }}>
      <div className="fixed inset-0 z-50 pointer-events-none">{children}</div>
    </DrawerContext.Provider>,
    document.body
  );
};

export const DrawerOverlay = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { open, onOpenChange } = useContext(DrawerContext)!;
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    else gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
  }, [open]);

  return <div ref={overlayRef} onClick={() => onOpenChange(false)} className={cn("absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto", className)} {...props} />;
};

export const DrawerContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
  const { open, side, onOpenChange } = useContext(DrawerContext)!;
  const contentRef = useRef<HTMLDivElement>(null);

  const sideConfig = {
    top: { class: "top-0 left-0 right-0 w-full rounded-b-2xl", hidden: { y: "-100%", x: 0 } },
    bottom: { class: "bottom-0 left-0 right-0 w-full rounded-t-2xl", hidden: { y: "100%", x: 0 } },
    left: { class: "top-0 left-0 bottom-0 h-full w-[400px] max-w-[85vw] rounded-r-2xl", hidden: { x: "-100%", y: 0 } },
    right: { class: "top-0 right-0 bottom-0 h-full w-[400px] max-w-[85vw] rounded-l-2xl", hidden: { x: "100%", y: 0 } },
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) gsap.fromTo(el, sideConfig[side].hidden, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    else gsap.to(el, { ...sideConfig[side].hidden, duration: 0.3, ease: "power3.in" });
  }, [open, side]);

  return (
    <div
      ref={(node) => {
        // @ts-ignore
        contentRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={cn("absolute bg-white dark:bg-zinc-950 shadow-2xl pointer-events-auto flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800", sideConfig[side].class, className)}
      {...props}
    >
      <button onClick={() => onOpenChange(false)} className="absolute top-4 right-4 z-50 p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 rounded-full transition-colors"><X className="w-4 h-4" /></button>
      {children}
    </div>
  );
});
DrawerContent.displayName = "DrawerContent";

export const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (<div className={cn("p-6 border-b border-zinc-100 dark:border-zinc-800/50 shrink-0", className)} {...props} />);
export const DrawerTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (<h2 className={cn("text-lg font-semibold text-zinc-900 dark:text-white", className)} {...props} />);
export const DrawerDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (<p className={cn("text-sm text-zinc-500 dark:text-zinc-400 mt-1.5", className)} {...props} />);
export const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (<div className={cn("p-6 border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/20 shrink-0 flex items-center justify-end gap-3", className)} {...props} />);

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" }>(({ className, variant = "default", ...props }, ref) => (
  <button ref={ref} className={cn("inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2", variant === "outline" ? "border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white" : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200", className)} {...props} />
));
Button.displayName = "Button";`;

// --- JAVASCRIPT ENGINE CODE ---
const DRAWER_ENGINE_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const DrawerContext = createContext(null);

export const Drawer = ({ open, onOpenChange, side = "right", children }) => {
  const [mounted, setMounted] = useState(false);
  const [renderLayer, setRenderLayer] = useState(open);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) {
      setRenderLayer(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => setRenderLayer(false), 300);
      return () => clearTimeout(timer);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onOpenChange(false); };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange]);

  if (!mounted || !renderLayer) return null;

  return createPortal(
    <DrawerContext.Provider value={{ open, onOpenChange, side }}>
      <div className="fixed inset-0 z-50 pointer-events-none">{children}</div>
    </DrawerContext.Provider>,
    document.body
  );
};

export const DrawerOverlay = ({ className, ...props }) => {
  const { open, onOpenChange } = useContext(DrawerContext);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (open) gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    else gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
  }, [open]);

  return <div ref={overlayRef} onClick={() => onOpenChange(false)} className={cn("absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto", className)} {...props} />;
};

export const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { open, side, onOpenChange } = useContext(DrawerContext);
  const contentRef = useRef(null);

  const sideConfig = {
    top: { class: "top-0 left-0 right-0 w-full rounded-b-2xl", hidden: { y: "-100%", x: 0 } },
    bottom: { class: "bottom-0 left-0 right-0 w-full rounded-t-2xl", hidden: { y: "100%", x: 0 } },
    left: { class: "top-0 left-0 bottom-0 h-full w-[400px] max-w-[85vw] rounded-r-2xl", hidden: { x: "-100%", y: 0 } },
    right: { class: "top-0 right-0 bottom-0 h-full w-[400px] max-w-[85vw] rounded-l-2xl", hidden: { x: "100%", y: 0 } },
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) gsap.fromTo(el, sideConfig[side].hidden, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    else gsap.to(el, { ...sideConfig[side].hidden, duration: 0.3, ease: "power3.in" });
  }, [open, side]);

  return (
    <div
      ref={(node) => {
        contentRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn(\`fixed z-50 bg-white dark:bg-zinc-950 shadow-2xl pointer-events-auto flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800 \${sideConfig[side].class}\`, className)}
      {...props}
    >
      <button onClick={() => onOpenChange(false)} className="absolute top-4 right-4 z-50 p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 rounded-full transition-colors"><X className="w-4 h-4" /></button>
      {children}
    </div>
  );
});
DrawerContent.displayName = "DrawerContent";

export const DrawerHeader = ({ className, ...props }) => (<div className={cn("p-6 border-b border-zinc-100 dark:border-zinc-800/50 shrink-0", className)} {...props} />);
export const DrawerTitle = ({ className, ...props }) => (<h2 className={cn("text-lg font-semibold text-zinc-900 dark:text-white", className)} {...props} />);
export const DrawerDescription = ({ className, ...props }) => (<p className={cn("text-sm text-zinc-500 dark:text-zinc-400 mt-1.5", className)} {...props} />);
export const DrawerFooter = ({ className, ...props }) => (<div className={cn("p-6 border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/20 shrink-0 flex items-center justify-end gap-3", className)} {...props} />);

export const Button = React.forwardRef(({ className, variant = "default", ...props }, ref) => (
  <button ref={ref} className={cn("inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2", variant === "outline" ? "border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white" : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200", className)} {...props} />
));
Button.displayName = "Button";`;

export function DrawerShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const [side, setSide] = useState<"top" | "bottom" | "left" | "right">(
    "right",
  );

  const generateUsageCode = (isTs: boolean) => {
    return `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  Button
} from "@/components/custom/ui/drawer";

export default function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>

      <Drawer open={open} onOpenChange={setOpen} side="${side}">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-6 flex-1 overflow-y-auto">
            {/* Put your forms or content here */}
            <div className="space-y-4">
               <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
               <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
               <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
            </div>
          </div>
          
          <DrawerFooter>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl">
        <VariantTabs
          variants={["top", "bottom", "left", "right"]}
          label="Slide Direction"
          defaultValue={side}
          onValueChange={(v) => setSide(v as "top" | "bottom" | "left" | "right")}
        />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="Drawer"
        tsCode={DRAWER_ENGINE_CODE_TS}
        jsCode={DRAWER_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
        sandbox="drawer"
        sandboxProps={{ side, open: isOpen }}
      >
        <div className="w-full flex items-center justify-center min-h-[400px] bg-white dark:bg-transparent transition-colors duration-300">
          <Button onClick={() => setIsOpen(true)}>Open Drawer ({side})</Button>

          <Drawer open={isOpen} onOpenChange={setIsOpen} side={side}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Interactive Drawer</DrawerTitle>
                <DrawerDescription>
                  This drawer slides in from the {side}. It uses GSAP for
                  butter-smooth easing and handles its own unmount lifecycles.
                </DrawerDescription>
              </DrawerHeader>

              <div className="p-6 flex-1 overflow-y-auto">
                <div className="flex flex-col gap-4">
                  <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Put your navigation links, forms, or detailed information
                      inside this content area. Scroll works perfectly without
                      pushing the header off screen.
                    </p>
                  </div>
                  <div className="h-8 w-3/4 bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
                  <div className="h-8 w-1/2 bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
                  <div className="h-8 w-full bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
                  <div className="h-8 w-2/3 bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
                  <div className="h-8 w-full bg-zinc-100 dark:bg-zinc-800 rounded-md animate-pulse" />
                </div>
              </div>

              <DrawerFooter>
                <Button onClick={() => setIsOpen(false)}>Save changes</Button>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </ComponentPreview>
    </div>
  );
}
