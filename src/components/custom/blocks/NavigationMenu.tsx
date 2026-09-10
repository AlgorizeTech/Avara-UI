"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, {
  createContext,
  forwardRef,
  useContext,
  useRef,
  useState,
} from "react";
import { getThemeStyles } from "./navigation-menu-theme";

// ==========================================
// THEME & CONFIGURATION
// ==========================================
export type NavColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});
export type NavVariant = "default" | "minimal" | "glass";

// ==========================================
// CONTEXT
// ==========================================
interface NavContextType {
  activeValue: string | null;
  setActiveValue: (val: string | null) => void;
  hoveredValue: string | null;
  setHoveredValue: (val: string | null) => void;
  indicatorStyle: React.CSSProperties;
  setIndicatorStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  theme: Record<string, string>;
  variant: NavVariant;
  listRef: React.RefObject<HTMLUListElement | null>;
}

const NavContext = createContext<NavContextType | null>(null);
const useNavContext = () => {
  const ctx = useContext(NavContext);
  if (!ctx)
    throw new Error("Navigation components must be used within NavigationMenu");
  return ctx;
};

const NavItemContext = createContext<{ value: string } | null>(null);
const useNavItemContext = () => {
  const ctx = useContext(NavItemContext);
  if (!ctx)
    throw new Error(
      "NavigationMenuItem components must be used within NavigationMenuItem",
    );
  return ctx;
};

// ==========================================
// COMPONENTS
// ==========================================

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> {
  color?: NavColor;
  variant?: NavVariant;
}

export const NavigationMenu = forwardRef<HTMLElement, NavigationMenuProps>(
  (
    { children, color = "primary", variant = "default", className, ...props },
    ref,
  ) => {
    const [activeValue, setActiveValue] = useState<string | null>(null);
    const [hoveredValue, setHoveredValue] = useState<string | null>(null);
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({
      opacity: 0,
    });
    const listRef = useRef<HTMLUListElement>(null);
    const { theme, style } = getThemeStyles(color as string);

    // Close dropdowns when mouse leaves the entire nav area
    const handleMouseLeave = () => {
      setActiveValue(null);
      setHoveredValue(null);
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    };

    return (
      <NavContext.Provider
        value={{
          activeValue,
          setActiveValue,
          hoveredValue,
          setHoveredValue,
          indicatorStyle,
          setIndicatorStyle,
          theme,
          variant,
          listRef,
        }}
      >
        <nav
          ref={ref}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative flex w-full items-center justify-center z-50",
            className,
          )}
          style={style}
          {...props}
        >
          {children}
        </nav>
      </NavContext.Provider>
    );
  },
);
NavigationMenu.displayName = "NavigationMenu";

export const NavigationMenuList = forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ children, className, ...props }, ref) => {
  const { listRef, variant } = useNavContext();

  const variantStyles = {
    default:
      "bg-background border border-border shadow-sm",
    glass:
      "bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg",
    minimal: "bg-transparent border-none",
  };

  return (
    <div
      className={cn(
        "relative flex justify-center max-w-full w-auto rounded-full p-1 sm:p-1.5",
        variantStyles[variant],
      )}
    >
      <ul
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
          listRef.current = node;
        }}
        className={cn(
          "group flex flex-nowrap flex-1 list-none items-center justify-center gap-0.5 sm:gap-1 max-w-full",
          className,
        )}
        {...props}
      >
        {children}
      </ul>
    </div>
  );
});
NavigationMenuList.displayName = "NavigationMenuList";

export const NavigationMenuItem = forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement> & { value: string }
>(({ children, className, value, ...props }, ref) => {
  return (
    <NavItemContext.Provider value={{ value }}>
      {/* ── THE FIX: Removed 'relative' from li so dropdowns center to the entire <nav>! ── */}
      <li ref={ref} className={cn("list-none", className)} {...props}>
        {children}
      </li>
    </NavItemContext.Provider>
  );
});
NavigationMenuItem.displayName = "NavigationMenuItem";

export const NavigationMenuTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  const {
    activeValue,
    setActiveValue,
    setHoveredValue,
    setIndicatorStyle,
    listRef,
  } = useNavContext();
  const { value } = useNavItemContext();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isActive = activeValue === value;

  const updateIndicator = () => {
    if (triggerRef.current && listRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const listRect = listRef.current.getBoundingClientRect();
      setIndicatorStyle({
        left: triggerRect.left - listRect.left,
        width: triggerRect.width,
        opacity: 1,
      });
    }
  };

  // ── TOUCH-SAFE HOVER (Only triggers for real mouse cursors) ──────────
  const handlePointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "mouse") {
      setActiveValue(value);
      setHoveredValue(value);
      updateIndicator();
    }
  };

  // ── TOUCH/CLICK TOGGLE SUPPORT ───────────────────────────────────────
  const handleClick = () => {
    if (isActive) {
      setActiveValue(null);
      setHoveredValue(null);
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    } else {
      setActiveValue(value);
      setHoveredValue(value);
      updateIndicator();
    }
  };

  return (
    <button
      ref={(node) => {
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        triggerRef.current = node;
      }}
      onPointerEnter={handlePointerEnter}
      onFocus={() => {
        setActiveValue(value);
        setHoveredValue(value);
        updateIndicator();
      }}
      onClick={handleClick}
      className={cn(
        "relative z-10 flex items-center justify-center gap-0.5 sm:gap-1.5 rounded-full px-2 sm:px-4 py-1 sm:py-2 text-[11px] sm:text-sm font-semibold transition-colors outline-none cursor-pointer whitespace-nowrap",
        isActive
          ? "text-foreground"
          : "text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          "relative top-[1px] w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 shrink-0",
          isActive && "rotate-180",
        )}
        aria-hidden="true"
      />
    </button>
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { activeValue, variant } = useNavContext();
  const { value } = useNavItemContext();
  const isActive = activeValue === value;

  const variantStyles = {
    default:
      "bg-background border border-border shadow-xl",
    glass:
      "bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl",
    minimal:
      "bg-background border border-border shadow-lg",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "absolute left-1/2 top-full -translate-x-1/2 pt-1.5 sm:pt-3 w-max max-w-[calc(100vw-1rem)] origin-top transition-all duration-300 ease-out z-[100]",
        isActive
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "w-full h-full rounded-2xl overflow-hidden transition-colors",
          variantStyles[variant],
        )}
      >
        <div className="p-2 sm:p-4 md:p-6 w-full h-full max-h-[70vh] sm:max-h-[75vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
});
NavigationMenuContent.displayName = "NavigationMenuContent";

export const NavigationMenuLink = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean }
>(({ children, className, active, ...props }, ref) => {
  const { theme } = useNavContext();
  return (
    <a
      ref={ref}
      className={cn(
        "block select-none space-y-1 rounded-xl p-2.5 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-muted cursor-pointer",
        active && theme.bgSoft,
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
});
NavigationMenuLink.displayName = "NavigationMenuLink";

export const NavigationMenuIndicator = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { indicatorStyle, theme } = useNavContext();

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-0 bottom-0 z-0 transition-all duration-300 ease-out rounded-full pointer-events-none",
        theme.bgSoft,
        className,
      )}
      style={indicatorStyle}
      {...props}
    />
  );
});
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";
