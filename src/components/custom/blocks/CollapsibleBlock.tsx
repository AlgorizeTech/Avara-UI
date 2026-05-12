"use client";

import { cn } from "@/lib/utils";
import React, { createContext, forwardRef, useContext, useState } from "react";

// ==========================================
// 1. CONTEXT
// ==========================================
interface CollapsibleContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled?: boolean;
}

const CollapsibleContext = createContext<CollapsibleContextType | undefined>(
  undefined,
);

function useCollapsible() {
  const context = useContext(CollapsibleContext);
  if (!context)
    throw new Error(
      "Collapsible components must be used within a <Collapsible> root.",
    );
  return context;
}

// ==========================================
// 2. ROOT COMPONENT
// ==========================================
export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      className,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledOpen !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

    const handleOpenChange = (newOpen: boolean) => {
      if (disabled) return;
      if (!isControlled) setUncontrolledOpen(newOpen);
      onOpenChange?.(newOpen);
    };

    return (
      <CollapsibleContext.Provider
        value={{ open: isOpen, onOpenChange: handleOpenChange, disabled }}
      >
        <div
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          className={className}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  },
);
Collapsible.displayName = "Collapsible";

// ==========================================
// 3. TRIGGER
// ==========================================
export type CollapsibleTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(({ className, onClick, children, ...props }, ref) => {
  const { open, onOpenChange, disabled } = useCollapsible();

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-expanded={open}
      data-state={open ? "open" : "closed"}
      data-disabled={disabled ? "" : undefined}
      onClick={(e) => {
        onOpenChange(!open);
        onClick?.(e);
      }}
      className={cn(
        "flex items-center justify-between outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

// ==========================================
// 4. CONTENT (Animated CSS Grid Engine)
// ==========================================
export type CollapsibleContentProps = React.HTMLAttributes<HTMLDivElement>

export const CollapsibleContent = forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>(({ className, children, ...props }, ref) => {
  const { open } = useCollapsible();

  return (
    <div
      ref={ref}
      data-state={open ? "open" : "closed"}
      aria-hidden={!open}
      className={cn(
        "grid transition-all duration-200 ease-in-out",
        // The CSS Grid 0fr to 1fr trick handles smooth dynamic height animation natively!
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className,
      )}
      {...props}
    >
      {/* We need an inner wrapper with overflow-hidden for the grid trick to work perfectly */}
      <div className="overflow-hidden">{children}</div>
    </div>
  );
});
CollapsibleContent.displayName = "CollapsibleContent";
