"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { X } from "lucide-react";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type DrawerSide = "top" | "bottom" | "left" | "right";

interface DrawerContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side: DrawerSide;
}

const DrawerContext = createContext<DrawerContextType | null>(null);

export const Drawer = ({
  open,
  onOpenChange,
  side = "right",
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: DrawerSide;
  children: React.ReactNode;
}) => {
  const [mounted, setMounted] = useState(false);
  const [renderLayer, setRenderLayer] = useState(open);
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Resolve the document the drawer actually lives in (supports iframe rendering).
    const doc = anchorRef.current?.ownerDocument ?? document;
    if (open) {
      setRenderLayer(true);
      doc.body.style.overflow = "hidden";
    } else {
      doc.body.style.overflow = "";
      // Match GSAP animation duration (300ms) before unmounting from DOM
      const timer = setTimeout(() => setRenderLayer(false), 300);
      return () => clearTimeout(timer);
    }
    return () => {
      doc.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const doc = anchorRef.current?.ownerDocument ?? document;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) doc.addEventListener("keydown", handleEsc);
    return () => doc.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange]);

  if (!mounted || !renderLayer) return <span ref={anchorRef} hidden />;

  const portalTarget = anchorRef.current?.ownerDocument.body ?? document.body;

  return (
    <>
      <span ref={anchorRef} hidden />
      {createPortal(
        <DrawerContext.Provider value={{ open, onOpenChange, side }}>
          <div className="fixed inset-0 z-50 pointer-events-none">
            {children}
          </div>
        </DrawerContext.Provider>,
        portalTarget,
      )}
    </>
  );
};

export const DrawerOverlay = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { open, onOpenChange } = useContext(DrawerContext)!;
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [open]);

  return (
    <div
      ref={overlayRef}
      onClick={() => onOpenChange(false)}
      className={cn(
        "absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto",
        className,
      )}
      {...props}
    />
  );
};

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open, side, onOpenChange } = useContext(DrawerContext)!;
  const contentRef = useRef<HTMLDivElement>(null);

  // Strict layout boundaries that prevent vertical/horizontal drift
  const sideConfig = {
    top: {
      class: "top-0 left-0 right-0 w-full rounded-b-2xl",
      hidden: { y: "-100%", x: 0 },
    },
    bottom: {
      class: "bottom-0 left-0 right-0 w-full rounded-t-2xl",
      hidden: { y: "100%", x: 0 },
    },
    left: {
      class:
        "top-0 left-0 bottom-0 h-full w-[400px] max-w-[85vw] rounded-r-2xl",
      hidden: { x: "-100%", y: 0 },
    },
    right: {
      class:
        "top-0 right-0 bottom-0 h-full w-[400px] max-w-[85vw] rounded-l-2xl",
      hidden: { x: "100%", y: 0 },
    },
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (open) {
      gsap.fromTo(el, sideConfig[side].hidden, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(el, {
        ...sideConfig[side].hidden,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [open, side]);

  return (
    <div
      ref={(node) => {
        // @ts-ignore
        contentRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={cn(
        "absolute bg-white dark:bg-zinc-950 shadow-2xl pointer-events-auto flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800",
        sideConfig[side].class,
        className,
      )}
      {...props}
    >
      <button
        onClick={() => onOpenChange(false)}
        className="absolute top-4 right-4 z-50 p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      {children}
    </div>
  );
});
DrawerContent.displayName = "DrawerContent";

export const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "p-6 border-b border-zinc-100 dark:border-zinc-800/50 shrink-0",
      className,
    )}
    {...props}
  />
);

export const DrawerTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn(
      "text-lg font-semibold text-zinc-900 dark:text-white",
      className,
    )}
    {...props}
  />
);

export const DrawerDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-sm text-zinc-500 dark:text-zinc-400 mt-1.5", className)}
    {...props}
  />
);

export const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "p-6 border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/20 shrink-0 flex items-center justify-end gap-3",
      className,
    )}
    {...props}
  />
);

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2",
      variant === "outline"
        ? "border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white"
        : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200",
      className,
    )}
    {...props}
  />
));
Button.displayName = "Button";
