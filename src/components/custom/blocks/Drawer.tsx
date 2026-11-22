"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, {
  createContext,
  useCallback,
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

// ==========================================
// MOTION
// Uses standard CSS @keyframes for enter and cubic-bezier transitions for exit
// so opening/closing works reliably on all browsers and mobile devices without
// relying on @starting-style, linear(), or requestAnimationFrame timing.
// ==========================================
const DRAWER_CSS = `
@keyframes drawer-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes drawer-slide-in-top {
  from { transform: translateY(-100%); }
  to { transform: translate3d(0, 0, 0); }
}
@keyframes drawer-slide-in-bottom {
  from { transform: translateY(100%); }
  to { transform: translate3d(0, 0, 0); }
}
@keyframes drawer-slide-in-left {
  from { transform: translateX(-100%); }
  to { transform: translate3d(0, 0, 0); }
}
@keyframes drawer-slide-in-right {
  from { transform: translateX(100%); }
  to { transform: translate3d(0, 0, 0); }
}
.drawer-overlay {
  opacity: 0;
  transition: opacity 0.25s ease-in;
}
.drawer-overlay[data-state="open"] {
  opacity: 1;
  animation: drawer-fade-in 0.25s ease-out forwards;
}
.drawer-content {
  transition: transform 0.28s cubic-bezier(0.55, 0, 1, 0.45);
  will-change: transform;
}
.drawer-content[data-side="top"] { transform: translateY(-100%); }
.drawer-content[data-side="bottom"] { transform: translateY(100%); }
.drawer-content[data-side="left"] { transform: translateX(-100%); }
.drawer-content[data-side="right"] { transform: translateX(100%); }
.drawer-content[data-state="open"] {
  transform: translate3d(0, 0, 0);
}
.drawer-content[data-state="open"][data-side="top"] {
  animation: drawer-slide-in-top 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.drawer-content[data-state="open"][data-side="bottom"] {
  animation: drawer-slide-in-bottom 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.drawer-content[data-state="open"][data-side="left"] {
  animation: drawer-slide-in-left 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.drawer-content[data-state="open"][data-side="right"] {
  animation: drawer-slide-in-right 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
`;

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
  const [renderLayer, setRenderLayer] = useState(open);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  // Resolves the document this drawer actually lives in, which is not always
  // the global one — previews portal components into an iframe. Resolving in a
  // callback ref rather than reading a ref during render keeps render pure, and
  // a null target doubles as the "not mounted yet" signal that guards SSR.
  const setAnchor = useCallback((node: HTMLSpanElement | null) => {
    setPortalTarget(node ? node.ownerDocument.body : null);
  }, []);

  // Opening must mount the layer immediately so the enter transition can start.
  const [prevOpen, setPrevOpen] = useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (open) setRenderLayer(true);
  }

  useEffect(() => {
    const doc = layerRef.current?.ownerDocument ?? document;
    if (open) {
      doc.body.style.overflow = "hidden";
      return () => {
        doc.body.style.overflow = "";
      };
    }

    doc.body.style.overflow = "";
    // Match the closing transition (280ms) before unmounting from DOM
    const timer = setTimeout(() => setRenderLayer(false), 280);
    return () => clearTimeout(timer);
  }, [open, portalTarget]);

  useEffect(() => {
    const doc = layerRef.current?.ownerDocument ?? document;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) doc.addEventListener("keydown", handleEsc);
    return () => doc.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange, portalTarget]);

  return (
    <>
      <span ref={setAnchor} hidden />
      {portalTarget && renderLayer
        ? createPortal(
            <DrawerContext.Provider value={{ open, onOpenChange, side }}>
              <div
                ref={layerRef}
                className="fixed inset-0 z-50 pointer-events-none"
                style={{ zIndex: 100 }}
              >
                <style>{DRAWER_CSS}</style>
                {children}
              </div>
            </DrawerContext.Provider>,
            portalTarget,
          )
        : null}
    </>
  );
};

export const DrawerOverlay = ({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { open, onOpenChange } = useContext(DrawerContext)!;

  return (
    <div
      onClick={() => onOpenChange(false)}
      data-state={open ? "open" : "closed"}
      className={cn(
        "drawer-overlay absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto",
        className,
      )}
      style={style}
      {...props}
    />
  );
};

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, style, ...props }, ref) => {
  const { open, side, onOpenChange } = useContext(DrawerContext)!;

  // Strict layout boundaries that prevent vertical/horizontal drift. Where the
  // panel hides off-screen for each side lives in DRAWER_CSS.
  const sideConfig = {
    top: {
      class: "top-0 left-0 right-0 w-full max-h-[85vh] sm:max-h-[80vh] rounded-b-2xl",
    },
    bottom: {
      class: "bottom-0 left-0 right-0 w-full max-h-[85vh] sm:max-h-[80vh] rounded-t-2xl",
    },
    left: {
      class:
        "top-0 left-0 bottom-0 h-full w-[400px] max-w-[85vw] rounded-r-2xl",
    },
    right: {
      class:
        "top-0 right-0 bottom-0 h-full w-[400px] max-w-[85vw] rounded-l-2xl",
    },
  };

  return (
    <div
      ref={ref}
      data-state={open ? "open" : "closed"}
      data-side={side}
      className={cn(
        "drawer-content absolute bg-background shadow-2xl pointer-events-auto flex flex-col overflow-hidden border border-border",
        sideConfig[side].class,
        className,
      )}
      style={style}
      {...props}
    >
      <button
        type="button"
        aria-label="Close drawer"
        onClick={() => onOpenChange(false)}
        className="absolute top-4 right-4 z-50 p-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-full transition-colors cursor-pointer"
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
      "p-6 border-b border-border shrink-0",
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
      "text-lg font-semibold text-foreground",
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
    className={cn("text-sm text-muted-foreground mt-1.5", className)}
    {...props}
  />
);

export const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "p-6 border-t border-border bg-muted shrink-0 flex items-center justify-end gap-3",
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
>(({ className, variant = "default", type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={cn(
      "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 cursor-pointer",
      variant === "outline"
        ? "border border-border bg-transparent hover:bg-muted text-foreground"
        : "bg-primary text-primary-foreground hover:bg-primary/90",
      className,
    )}
    {...props}
  />
));
Button.displayName = "Button";
