"use client";

import {
  NavColor,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavVariant,
} from "@/components/custom/blocks/NavigationMenu";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { cn } from "@/lib/utils";
import { Code, Layers, Palette, Shield, Smartphone, Zap } from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const NAV_ENGINE_CODE_TS = `"use client";

import React, { createContext, useContext, useState, useRef, useEffect, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type NavColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});
export type NavVariant = "default" | "minimal" | "glass";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-200 dark:border-indigo-800" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", bgSoft: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-200 dark:border-rose-800" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-800" },
  zinc: { bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50", border: "border-zinc-200 dark:border-zinc-800" },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[var(--nav-color)] text-white", text: "text-[var(--nav-color)]", bgSoft: "bg-[rgba(var(--nav-color-rgb),0.1)]", border: "border-[rgba(var(--nav-color-rgb),0.2)]" },
      style: { "--nav-color": color, "--nav-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

interface NavContextType { activeValue: string | null; setActiveValue: (val: string | null) => void; hoveredValue: string | null; setHoveredValue: (val: string | null) => void; indicatorStyle: React.CSSProperties; setIndicatorStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>; theme: Record<string, string>; variant: NavVariant; listRef: React.RefObject<HTMLUListElement | null>; }
const NavContext = createContext<NavContextType | null>(null);
const useNavContext = () => { const ctx = useContext(NavContext); if (!ctx) throw new Error("Missing NavContext"); return ctx; };

const NavItemContext = createContext<{ value: string } | null>(null);
const useNavItemContext = () => { const ctx = useContext(NavItemContext); if (!ctx) throw new Error("Missing NavItemContext"); return ctx; };

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLElement> { color?: NavColor; variant?: NavVariant; }

export const NavigationMenu = forwardRef<HTMLElement, NavigationMenuProps>(({ children, color = "indigo", variant = "default", className, ...props }, ref) => {
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const listRef = useRef<HTMLUListElement>(null);
  const { theme, style } = getThemeStyles(color as string);

  return (
    <NavContext.Provider value={{ activeValue, setActiveValue, hoveredValue, setHoveredValue, indicatorStyle, setIndicatorStyle, theme, variant, listRef }}>
      <nav ref={ref} onMouseLeave={() => { setActiveValue(null); setHoveredValue(null); setIndicatorStyle((prev) => ({ ...prev, opacity: 0 })); }} className={cn("relative flex w-full items-center justify-center z-50", className)} style={style} {...props}>
        {children}
      </nav>
    </NavContext.Provider>
  );
});
NavigationMenu.displayName = "NavigationMenu";

export const NavigationMenuList = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(({ children, className, ...props }, ref) => {
  const { listRef, variant } = useNavContext();
  const vStyles = { default: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm", glass: "bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg", minimal: "bg-transparent border-none" };
  return (
    <div className={cn("relative flex justify-center w-max rounded-full p-1.5", vStyles[variant])}>
      <ul ref={(node) => { if (typeof ref === "function") ref(node); else if (ref) ref.current = node; listRef.current = node; }} className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)} {...props}>
        {children}
      </ul>
    </div>
  );
});
NavigationMenuList.displayName = "NavigationMenuList";

export const NavigationMenuItem = forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement> & { value: string }>(({ children, className, value, ...props }, ref) => (
  <NavItemContext.Provider value={{ value }}><li ref={ref} className={cn("relative", className)} {...props}>{children}</li></NavItemContext.Provider>
));
NavigationMenuItem.displayName = "NavigationMenuItem";

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ children, className, ...props }, ref) => {
  const { activeValue, setActiveValue, setHoveredValue, setIndicatorStyle, listRef } = useNavContext();
  const { value } = useNavItemContext();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isActive = activeValue === value;

  const handleHover = () => {
    setActiveValue(value); setHoveredValue(value);
    if (triggerRef.current && listRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const listRect = listRef.current.getBoundingClientRect();
      setIndicatorStyle({ left: triggerRect.left - listRect.left, width: triggerRect.width, opacity: 1 });
    }
  };

  return (
    <button ref={(n) => { if (typeof ref === "function") ref(n); else if (ref) ref.current = n; triggerRef.current = n; }} onMouseEnter={handleHover} onFocus={handleHover} className={cn("relative z-10 flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors outline-none", isActive ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-600 dark:text-zinc-400", className)} {...props}>
      {children}<ChevronDown className={cn("relative top-[1px] w-3.5 h-3.5 transition-transform duration-300", isActive && "rotate-180")} />
    </button>
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, className, ...props }, ref) => {
  const { activeValue, variant } = useNavContext();
  const { value } = useNavItemContext();
  const isActive = activeValue === value;
  const vStyles = { default: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl", glass: "bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl", minimal: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-lg" };

  return (
    <div ref={ref} className={cn("absolute left-1/2 top-full mt-4 -translate-x-1/2 w-max origin-top rounded-2xl overflow-hidden transition-all duration-300 ease-out", isActive ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-4 pointer-events-none", vStyles[variant], className)} {...props}>
      <div className="p-4 md:p-6 w-full h-full">{children}</div>
    </div>
  );
});
NavigationMenuContent.displayName = "NavigationMenuContent";

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean }>(({ children, className, active, ...props }, ref) => {
  const { theme } = useNavContext();
  return (
    <a ref={ref} className={cn("block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50", active && theme.bgSoft, className)} {...props}>
      {children}
    </a>
  );
});
NavigationMenuLink.displayName = "NavigationMenuLink";

export const NavigationMenuIndicator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { indicatorStyle, theme } = useNavContext();
  return <div ref={ref} className={cn("absolute top-0 bottom-0 z-0 transition-all duration-300 ease-out rounded-full", theme.bgSoft, className)} style={indicatorStyle} {...props} />;
});
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const NAV_ENGINE_CODE_JS = `"use client";

import React, { createContext, useContext, useState, useRef, useEffect, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const colorThemes = {
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-200 dark:border-indigo-800" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", bgSoft: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-200 dark:border-rose-800" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-800" },
  zinc: { bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50", border: "border-zinc-200 dark:border-zinc-800" },
};

const hexToRgb = (hex) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[var(--nav-color)] text-white", text: "text-[var(--nav-color)]", bgSoft: "bg-[rgba(var(--nav-color-rgb),0.1)]", border: "border-[rgba(var(--nav-color-rgb),0.2)]" },
      style: { "--nav-color": color, "--nav-color-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

const NavContext = createContext(null);
const useNavContext = () => { const ctx = useContext(NavContext); if (!ctx) throw new Error("Missing NavContext"); return ctx; };

const NavItemContext = createContext(null);
const useNavItemContext = () => { const ctx = useContext(NavItemContext); if (!ctx) throw new Error("Missing NavItemContext"); return ctx; };

export const NavigationMenu = forwardRef(({ children, color = "indigo", variant = "default", className, ...props }, ref) => {
  const [activeValue, setActiveValue] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0 });
  const listRef = useRef(null);
  const { theme, style } = getThemeStyles(color);

  return (
    <NavContext.Provider value={{ activeValue, setActiveValue, hoveredValue, setHoveredValue, indicatorStyle, setIndicatorStyle, theme, variant, listRef }}>
      <nav ref={ref} onMouseLeave={() => { setActiveValue(null); setHoveredValue(null); setIndicatorStyle((prev) => ({ ...prev, opacity: 0 })); }} className={cn("relative flex w-full items-center justify-center z-50", className)} style={style} {...props}>
        {children}
      </nav>
    </NavContext.Provider>
  );
});
NavigationMenu.displayName = "NavigationMenu";

export const NavigationMenuList = forwardRef(({ children, className, ...props }, ref) => {
  const { listRef, variant } = useNavContext();
  const vStyles = { default: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm", glass: "bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg", minimal: "bg-transparent border-none" };
  return (
    <div className={cn("relative flex justify-center w-max rounded-full p-1.5", vStyles[variant])}>
      <ul ref={(node) => { if (typeof ref === "function") ref(node); else if (ref) ref.current = node; listRef.current = node; }} className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)} {...props}>
        {children}
      </ul>
    </div>
  );
});
NavigationMenuList.displayName = "NavigationMenuList";

export const NavigationMenuItem = forwardRef(({ children, className, value, ...props }, ref) => (
  <NavItemContext.Provider value={{ value }}><li ref={ref} className={cn("relative", className)} {...props}>{children}</li></NavItemContext.Provider>
));
NavigationMenuItem.displayName = "NavigationMenuItem";

export const NavigationMenuTrigger = forwardRef(({ children, className, ...props }, ref) => {
  const { activeValue, setActiveValue, setHoveredValue, setIndicatorStyle, listRef } = useNavContext();
  const { value } = useNavItemContext();
  const triggerRef = useRef(null);
  const isActive = activeValue === value;

  const handleHover = () => {
    setActiveValue(value); setHoveredValue(value);
    if (triggerRef.current && listRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const listRect = listRef.current.getBoundingClientRect();
      setIndicatorStyle({ left: triggerRect.left - listRect.left, width: triggerRect.width, opacity: 1 });
    }
  };

  return (
    <button ref={(n) => { if (typeof ref === "function") ref(n); else if (ref) ref.current = n; triggerRef.current = n; }} onMouseEnter={handleHover} onFocus={handleHover} className={cn("relative z-10 flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors outline-none", isActive ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-600 dark:text-zinc-400", className)} {...props}>
      {children}<ChevronDown className={cn("relative top-[1px] w-3.5 h-3.5 transition-transform duration-300", isActive && "rotate-180")} />
    </button>
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuContent = forwardRef(({ children, className, ...props }, ref) => {
  const { activeValue, variant } = useNavContext();
  const { value } = useNavItemContext();
  const isActive = activeValue === value;
  const vStyles = { default: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl", glass: "bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl", minimal: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-lg" };

  return (
    <div ref={ref} className={cn("absolute left-1/2 top-full mt-4 -translate-x-1/2 w-max origin-top rounded-2xl overflow-hidden transition-all duration-300 ease-out", isActive ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-4 pointer-events-none", vStyles[variant], className)} {...props}>
      <div className="p-4 md:p-6 w-full h-full">{children}</div>
    </div>
  );
});
NavigationMenuContent.displayName = "NavigationMenuContent";

export const NavigationMenuLink = forwardRef(({ children, className, active, ...props }, ref) => {
  const { theme } = useNavContext();
  return (
    <a ref={ref} className={cn("block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50", active && theme.bgSoft, className)} {...props}>
      {children}
    </a>
  );
});
NavigationMenuLink.displayName = "NavigationMenuLink";

export const NavigationMenuIndicator = forwardRef(({ className, ...props }, ref) => {
  const { indicatorStyle, theme } = useNavContext();
  return <div ref={ref} className={cn("absolute top-0 bottom-0 z-0 transition-all duration-300 ease-out rounded-full", theme.bgSoft, className)} style={indicatorStyle} {...props} />;
});
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";`;

export function NavigationMenuShowcase() {
  const [variant, setVariant] = useState<NavVariant>("default");

  // Initialize with localStorage if available
  const [color, setColor] = useState<NavColor | string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("primaryColor") || "indigo";
    }
    return "indigo";
  });

  // Automatically listen for updates to the primaryColor in localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) {
        setColor(stored);
      }
    }, 1000);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "primaryColor" && e.newValue) {
        setColor(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [color]);

  // Sync manual UI changes down to local storage
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("primaryColor", newColor);
  };

  const generateUsageCode = (isTs: boolean) => {
    return `import { 
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuTrigger, 
  NavigationMenuContent, 
  NavigationMenuLink, 
  NavigationMenuIndicator 
} from "@/components/custom/blocks/NavigationMenu";

export default function App() {
  return (
    <NavigationMenu variant="${variant}" color="${color}">
      <NavigationMenuList>
        <NavigationMenuItem value="features">
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* Your Dropdown Content Here */}
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem value="resources">
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* Your Dropdown Content Here */}
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuIndicator />
      </NavigationMenuList>
    </NavigationMenu>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-2 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        <ThemeColorPicker color={color} onChange={handleColorChange} label="Style Variant" />
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="NavigationMenu"
        tsCode={NAV_ENGINE_CODE_TS}
        jsCode={NAV_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div
          className={`relative overflow-hidden w-full flex items-start justify-center min-h-[450px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 ${variant === "glass" ? "bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" : "bg-zinc-50 dark:bg-[#050505]"} p-6 sm:p-12`}
        >
          <NavigationMenu
            key={`${variant}-${color}`}
            variant={variant}
            color={color}
          >
            <NavigationMenuList>
              <NavigationMenuItem value="features">
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink
                        href="#"
                        className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-b from-zinc-100/50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-900 p-6 no-underline outline-none focus:shadow-md"
                      >
                        <Zap className="h-6 w-6 text-zinc-900 dark:text-zinc-100 mb-4" />
                        <div className="mb-2 mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                          Lightning Fast
                        </div>
                        <p className="text-sm leading-tight text-zinc-500 dark:text-zinc-400">
                          Experience uncompromised performance with our
                          edge-first architecture.
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="#" title="Security" icon={Shield}>
                      Advanced encryption protocols keeping your data completely
                      safe.
                    </ListItem>
                    <ListItem href="#" title="Developers" icon={Code}>
                      Comprehensive APIs and webhooks for endless integrations.
                    </ListItem>
                    <ListItem href="#" title="Customization" icon={Palette}>
                      Tailor the experience perfectly to your unique brand
                      identity.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem value="resources">
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-2 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                    <ListItem href="#" title="Documentation" icon={Layers}>
                      Everything you need to get up and running quickly.
                    </ListItem>
                    <ListItem href="#" title="Mobile Apps" icon={Smartphone}>
                      Take your workflow on the go with iOS and Android.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem value="pricing">
                {/* To create a standard link that matches the styling, 
                  we wrap it in a trigger-like class but without the dropdown chevron 
                */}
                <a
                  href="#"
                  className="relative z-10 flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors outline-none"
                >
                  Pricing
                </a>
              </NavigationMenuItem>

              <NavigationMenuIndicator />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </ComponentPreview>
    </div>
  );
}

// Small helper for the preview
function ListItem({ className, title, children, icon: Icon, ...props }: any) {
  return (
    <li>
      <NavigationMenuLink
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 focus:bg-zinc-100 focus:text-zinc-900",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">
          {Icon && <Icon className="w-4 h-4 text-zinc-500" />}
          {title}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-zinc-500 dark:text-zinc-400 mt-1.5">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  );
}
