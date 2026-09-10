"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";

export type ThemeVariant = "icon" | "pill" | "dropdown";

export interface ThemeSwitcherProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ThemeVariant;
}

export const ThemeSwitcher = React.forwardRef<
  HTMLDivElement,
  ThemeSwitcherProps
>(({ variant = "icon", className, ...props }, ref) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render a placeholder with the same dimensions to prevent layout shift
    if (variant === "pill")
      return (
        <div
          className={cn(
            "h-10 w-[120px] bg-muted rounded-full",
            className,
          )}
        />
      );
    if (variant === "dropdown")
      return (
        <div
          className={cn(
            "h-9 w-[110px] bg-muted rounded-lg",
            className,
          )}
        />
      );
    return (
      <div
        className={cn(
          "h-9 w-9 bg-muted rounded-lg",
          className,
        )}
      />
    );
  }

  if (variant === "pill") {
    return (
      <ThemeSwitcherPill
        theme={theme}
        setTheme={setTheme}
        className={className}
        {...props}
        ref={ref}
      />
    );
  }

  if (variant === "dropdown") {
    return (
      <ThemeSwitcherDropdown
        theme={theme}
        resolvedTheme={resolvedTheme}
        setTheme={setTheme}
        className={className}
        {...props}
        ref={ref}
      />
    );
  }

  return (
    <ThemeSwitcherIcon
      resolvedTheme={resolvedTheme}
      setTheme={setTheme}
      className={className}
      {...props}
      ref={ref}
    />
  );
});
ThemeSwitcher.displayName = "ThemeSwitcher";

/** What every switcher variant is handed by ThemeSwitcher. */
interface ThemeSwitcherVariantProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The selected theme: light | dark | system. */
  theme?: string;
  /** What "system" actually resolved to: light | dark. */
  resolvedTheme?: string;
  setTheme: (theme: string) => void;
}

// ==========================================
// VARIANT: PILL (Segmented Control)
// ==========================================
const ThemeSwitcherPill = React.forwardRef<HTMLDivElement, ThemeSwitcherVariantProps>(
  ({ theme, setTheme, className, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
    );

    const tabs = [
      { id: "light", icon: Sun },
      { id: "system", icon: Monitor },
      { id: "dark", icon: Moon },
    ];

    useEffect(() => {
      const activeIndex = tabs.findIndex((t) => t.id === theme);
      const activeBtn = buttonsRef.current[activeIndex];
      const indicator = indicatorRef.current;

      if (activeBtn && indicator) {
        gsap.to(indicator, {
          x: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          duration: 0.4,
          ease: "power3.out",
        });
      }
    }, [theme]);

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative flex items-center p-1 bg-muted/80 border border-border/50 backdrop-blur-md rounded-full w-max shadow-sm",
          className,
        )}
        {...props}
      >
        <div
          ref={indicatorRef}
          className="absolute top-1 bottom-1 left-0 bg-card rounded-full shadow-sm border border-border/50 pointer-events-none"
        />
        {tabs.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = theme === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                buttonsRef.current[i] = el;
              }}
              onClick={() => setTheme(tab.id)}
              className={cn(
                "relative z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label={`Switch to ${tab.id} theme`}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>
    );
  },
);
ThemeSwitcherPill.displayName = "ThemeSwitcherPill";

// ==========================================
// VARIANT: ICON (Simple Toggle)
// ==========================================
const ThemeSwitcherIcon = React.forwardRef<HTMLDivElement, ThemeSwitcherVariantProps>(
  ({ resolvedTheme, setTheme, className, ...props }, ref) => {
    const iconRef = useRef<HTMLDivElement>(null);

    const toggleTheme = () => {
      const isDark = resolvedTheme === "dark";

      // GSAP spin animation
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          rotation: "+=180",
          scale: 0.8,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });
      }

      setTheme(isDark ? "light" : "dark");
    };

    return (
      <div ref={ref} className={className} {...props}>
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted/80 border border-border/50 hover:bg-muted/80 transition-colors shadow-sm"
          aria-label="Toggle theme"
        >
          <div
            ref={iconRef}
            className="relative flex items-center justify-center w-full h-full"
          >
            {resolvedTheme === "dark" ? (
              <Moon className="w-[18px] h-[18px] text-zinc-100" />
            ) : (
              <Sun className="w-[18px] h-[18px] text-foreground" />
            )}
          </div>
        </button>
      </div>
    );
  },
);
ThemeSwitcherIcon.displayName = "ThemeSwitcherIcon";

// ==========================================
// VARIANT: DROPDOWN (Click to open menu)
// ==========================================
const ThemeSwitcherDropdown = React.forwardRef<HTMLDivElement, ThemeSwitcherVariantProps>(
  ({ theme, resolvedTheme, setTheme, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
    );

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
      if (!menuRef.current) return;
      if (isOpen) {
        gsap.fromTo(
          menuRef.current,
          { opacity: 0, y: -10, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.2,
            ease: "back.out(2)",
            display: "block",
          },
        );
      } else {
        gsap.to(menuRef.current, {
          opacity: 0,
          y: -5,
          scale: 0.95,
          duration: 0.15,
          ease: "power2.in",
          onComplete: () => {
            if (menuRef.current) {
              gsap.set(menuRef.current, { display: "none" });
            }
          },
        });
      }
    }, [isOpen]);

    return (
      <div
        ref={containerRef}
        className={cn("relative inline-block", className)}
        {...props}
      >
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3.5 h-9 rounded-lg bg-muted border border-border hover:bg-muted transition-colors shadow-sm text-sm font-medium text-foreground cursor-pointer"
        >
          {resolvedTheme === "dark" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
          <span className="capitalize">{theme}</span>
        </button>

        <div
          ref={menuRef}
          className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 top-full mt-2 w-36 p-1 bg-background border border-border rounded-xl shadow-xl z-50 hidden"
        >
          {[
            { id: "light", icon: Sun, label: "Light" },
            { id: "dark", icon: Moon, label: "Dark" },
            { id: "system", icon: Monitor, label: "System" },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = theme === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setTheme(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center w-full gap-2.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);
ThemeSwitcherDropdown.displayName = "ThemeSwitcherDropdown";
