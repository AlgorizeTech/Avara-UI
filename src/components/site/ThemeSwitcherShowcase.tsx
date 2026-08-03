"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import {
  ThemeSwitcher,
  ThemeVariant,
} from "@/components/custom/blocks/ThemeSwitcherBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const THEME_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";

export type ThemeVariant = "icon" | "pill" | "dropdown";
export interface ThemeSwitcherProps extends React.HTMLAttributes<HTMLDivElement> { variant?: ThemeVariant; }

export const ThemeSwitcher = React.forwardRef<HTMLDivElement, ThemeSwitcherProps>(({ variant = "icon", className, ...props }, ref) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    if (variant === "pill") return <div className={cn("h-10 w-[120px] bg-zinc-100 dark:bg-zinc-800/50 rounded-full", className)} />;
    if (variant === "dropdown") return <div className={cn("h-9 w-[110px] bg-zinc-100 dark:bg-zinc-800/50 rounded-lg", className)} />;
    return <div className={cn("h-9 w-9 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg", className)} />;
  }

  if (variant === "pill") return <ThemeSwitcherPill theme={theme} setTheme={setTheme} className={className} {...props} ref={ref} />;
  if (variant === "dropdown") return <ThemeSwitcherDropdown theme={theme} resolvedTheme={resolvedTheme} setTheme={setTheme} className={className} {...props} ref={ref} />;
  return <ThemeSwitcherIcon resolvedTheme={resolvedTheme} setTheme={setTheme} className={className} {...props} ref={ref} />;
});
ThemeSwitcher.displayName = "ThemeSwitcher";

const ThemeSwitcherPill = React.forwardRef<HTMLDivElement, any>(({ theme, setTheme, className, ...props }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const tabs = [{ id: "light", icon: Sun }, { id: "system", icon: Monitor }, { id: "dark", icon: Moon }];

  useEffect(() => {
    const activeIndex = tabs.findIndex((t) => t.id === theme);
    const activeBtn = buttonsRef.current[activeIndex];
    const indicator = indicatorRef.current;
    if (activeBtn && indicator) {
      gsap.to(indicator, { x: activeBtn.offsetLeft, width: activeBtn.offsetWidth, duration: 0.4, ease: "power3.out" });
    }
  }, [theme]);

  return (
    <div ref={containerRef} className={cn("relative flex items-center p-1 bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800 backdrop-blur-md rounded-full w-max shadow-sm", className)} {...props}>
      <div ref={indicatorRef} className="absolute top-1 bottom-1 left-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 pointer-events-none" />
      {tabs.map((tab, i) => {
        const Icon = tab.icon; const isActive = theme === tab.id;
        return (
          <button key={tab.id} ref={(el) => { buttonsRef.current[i] = el; }} onClick={() => setTheme(tab.id)} className={cn("relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200", isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300")} aria-label={\`Switch to \${tab.id} theme\`}>
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
});
ThemeSwitcherPill.displayName = "ThemeSwitcherPill";

const ThemeSwitcherIcon = React.forwardRef<HTMLDivElement, any>(({ resolvedTheme, setTheme, className, ...props }, ref) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const toggleTheme = () => {
    const isDark = resolvedTheme === "dark";
    if (iconRef.current) gsap.to(iconRef.current, { rotation: "+=180", scale: 0.8, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.inOut" });
    setTheme(isDark ? "light" : "dark");
  };
  return (
    <div ref={ref} className={className} {...props}>
      <button onClick={toggleTheme} className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-colors shadow-sm" aria-label="Toggle theme">
        <div ref={iconRef} className="relative flex items-center justify-center w-full h-full">
          {resolvedTheme === "dark" ? <Moon className="w-[18px] h-[18px] text-zinc-100" /> : <Sun className="w-[18px] h-[18px] text-zinc-900" />}
        </div>
      </button>
    </div>
  );
});
ThemeSwitcherIcon.displayName = "ThemeSwitcherIcon";

const ThemeSwitcherDropdown = React.forwardRef<HTMLDivElement, any>(({ theme, resolvedTheme, setTheme, className, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current) return;
    if (isOpen) {
      gsap.fromTo(menuRef.current, { opacity: 0, y: -10, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "back.out(2)", display: "block" });
    } else {
      gsap.to(menuRef.current, { opacity: 0, y: -5, scale: 0.95, duration: 0.15, ease: "power2.in", onComplete: () => { gsap.set(menuRef.current, { display: "none" }); } });
    }
  }, [isOpen]);

  return (
    <div ref={ref} className={cn("relative inline-block", className)} {...props}>
      <button onClick={() => setIsOpen(!isOpen)} onBlur={() => setTimeout(() => setIsOpen(false), 200)} className="flex items-center gap-2 px-3 h-9 rounded-lg bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-colors shadow-sm text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {resolvedTheme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        <span className="capitalize">{theme}</span>
      </button>
      <div ref={menuRef} className="absolute right-0 top-full mt-2 w-36 p-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 hidden">
        {[{ id: "light", icon: Sun, label: "Light" }, { id: "dark", icon: Moon, label: "Dark" }, { id: "system", icon: Monitor, label: "System" }].map((item) => {
          const Icon = item.icon; const isActive = theme === item.id;
          return (
            <button key={item.id} onClick={() => { setTheme(item.id); setIsOpen(false); }} className={cn("flex items-center w-full gap-2 px-2.5 py-2 text-sm font-medium rounded-lg transition-colors", isActive ? "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100")}>
              <Icon className="w-4 h-4" />{item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
});
ThemeSwitcherDropdown.displayName = "ThemeSwitcherDropdown";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const THEME_ENGINE_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";

export const ThemeSwitcher = React.forwardRef(({ variant = "icon", className, ...props }, ref) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    if (variant === "pill") return <div className={cn("h-10 w-[120px] bg-zinc-100 dark:bg-zinc-800/50 rounded-full", className)} />;
    if (variant === "dropdown") return <div className={cn("h-9 w-[110px] bg-zinc-100 dark:bg-zinc-800/50 rounded-lg", className)} />;
    return <div className={cn("h-9 w-9 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg", className)} />;
  }

  if (variant === "pill") return <ThemeSwitcherPill theme={theme} setTheme={setTheme} className={className} {...props} ref={ref} />;
  if (variant === "dropdown") return <ThemeSwitcherDropdown theme={theme} resolvedTheme={resolvedTheme} setTheme={setTheme} className={className} {...props} ref={ref} />;
  return <ThemeSwitcherIcon resolvedTheme={resolvedTheme} setTheme={setTheme} className={className} {...props} ref={ref} />;
});
ThemeSwitcher.displayName = "ThemeSwitcher";

const ThemeSwitcherPill = React.forwardRef(({ theme, setTheme, className, ...props }, ref) => {
  const containerRef = useRef(null);
  const indicatorRef = useRef(null);
  const buttonsRef = useRef([]);
  React.useImperativeHandle(ref, () => containerRef.current);

  const tabs = [{ id: "light", icon: Sun }, { id: "system", icon: Monitor }, { id: "dark", icon: Moon }];

  useEffect(() => {
    const activeIndex = tabs.findIndex((t) => t.id === theme);
    const activeBtn = buttonsRef.current[activeIndex];
    const indicator = indicatorRef.current;
    if (activeBtn && indicator) {
      gsap.to(indicator, { x: activeBtn.offsetLeft, width: activeBtn.offsetWidth, duration: 0.4, ease: "power3.out" });
    }
  }, [theme]);

  return (
    <div ref={containerRef} className={cn("relative flex items-center p-1 bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800 backdrop-blur-md rounded-full w-max shadow-sm", className)} {...props}>
      <div ref={indicatorRef} className="absolute top-1 bottom-1 left-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 pointer-events-none" />
      {tabs.map((tab, i) => {
        const Icon = tab.icon; const isActive = theme === tab.id;
        return (
          <button key={tab.id} ref={(el) => { buttonsRef.current[i] = el; }} onClick={() => setTheme(tab.id)} className={cn("relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200", isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300")} aria-label={\`Switch to \${tab.id} theme\`}>
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
});
ThemeSwitcherPill.displayName = "ThemeSwitcherPill";

const ThemeSwitcherIcon = React.forwardRef(({ resolvedTheme, setTheme, className, ...props }, ref) => {
  const iconRef = useRef(null);
  const toggleTheme = () => {
    const isDark = resolvedTheme === "dark";
    if (iconRef.current) gsap.to(iconRef.current, { rotation: "+=180", scale: 0.8, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.inOut" });
    setTheme(isDark ? "light" : "dark");
  };
  return (
    <div ref={ref} className={className} {...props}>
      <button onClick={toggleTheme} className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-colors shadow-sm" aria-label="Toggle theme">
        <div ref={iconRef} className="relative flex items-center justify-center w-full h-full">
          {resolvedTheme === "dark" ? <Moon className="w-[18px] h-[18px] text-zinc-100" /> : <Sun className="w-[18px] h-[18px] text-zinc-900" />}
        </div>
      </button>
    </div>
  );
});
ThemeSwitcherIcon.displayName = "ThemeSwitcherIcon";

const ThemeSwitcherDropdown = React.forwardRef(({ theme, resolvedTheme, setTheme, className, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current) return;
    if (isOpen) {
      gsap.fromTo(menuRef.current, { opacity: 0, y: -10, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "back.out(2)", display: "block" });
    } else {
      gsap.to(menuRef.current, { opacity: 0, y: -5, scale: 0.95, duration: 0.15, ease: "power2.in", onComplete: () => { gsap.set(menuRef.current, { display: "none" }); } });
    }
  }, [isOpen]);

  return (
    <div ref={ref} className={cn("relative inline-block", className)} {...props}>
      <button onClick={() => setIsOpen(!isOpen)} onBlur={() => setTimeout(() => setIsOpen(false), 200)} className="flex items-center gap-2 px-3 h-9 rounded-lg bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 transition-colors shadow-sm text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {resolvedTheme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        <span className="capitalize">{theme}</span>
      </button>
      <div ref={menuRef} className="absolute right-0 top-full mt-2 w-36 p-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 hidden">
        {[{ id: "light", icon: Sun, label: "Light" }, { id: "dark", icon: Moon, label: "Dark" }, { id: "system", icon: Monitor, label: "System" }].map((item) => {
          const Icon = item.icon; const isActive = theme === item.id;
          return (
            <button key={item.id} onClick={() => { setTheme(item.id); setIsOpen(false); }} className={cn("flex items-center w-full gap-2 px-2.5 py-2 text-sm font-medium rounded-lg transition-colors", isActive ? "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100")}>
              <Icon className="w-4 h-4" />{item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
});
ThemeSwitcherDropdown.displayName = "ThemeSwitcherDropdown";`;

export function ThemeSwitcherShowcase() {
  const [variant, setVariant] = useState<ThemeVariant>("pill");

  const generateUsageCode = (isTs: boolean) => {
    return `import { ThemeSwitcher } from "@/components/custom/blocks/ThemeSwitcherBlock";

export default function LayoutHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="font-bold">My App</div>
      
      {/* Renders the ${variant} variant of the theme toggler */}
      <ThemeSwitcher variant="${variant}" />
    </header>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <VariantTabs
            label="Style Variant"
            variants={["icon", "pill", "dropdown"]}
            defaultValue="icon"
            onValueChange={(v) => setVariant(v as ThemeVariant)}
          />
          <div className="text-sm text-zinc-500 dark:text-zinc-400 bg-white dark:bg-black px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <strong>Note:</strong> Integrates directly with{" "}
            <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">
              next-themes
            </code>
            .
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ThemeSwitcherBlock"
        tsCode={THEME_ENGINE_CODE_TS}
        jsCode={THEME_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
        sandbox="theme-switcher"
        sandboxProps={{ variant }}
      >
        <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-24 overflow-hidden relative">
          {/* Render the component based on active state */}
          <div className="flex flex-col items-center gap-8">
            <ThemeSwitcher variant={variant} />

            {/* Helper text for the dropdown specifically */}
            {variant === "dropdown" && (
              <span className="text-xs text-zinc-400 font-medium">
                Click to open menu
              </span>
            )}
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
