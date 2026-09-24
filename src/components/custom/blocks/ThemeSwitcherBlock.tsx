"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

/**
 * False while server-rendering and during hydration, true afterwards — without
 * the extra render an effect-flipped useState costs.
 */
const subscribeToNothing = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

// ==========================================
// CIRCULAR REVEAL
// The new theme grows out of the control as a circle, using the View
// Transitions API. Everything it needs lives here — the rules below go into
// <head> the first time a switcher mounts — so an installed copy works
// without touching globals.css.
// ==========================================
const REVEAL_STYLE_ID = "theme-switcher-reveal";
const REVEAL_CSS = `
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) { z-index: 1; }
::view-transition-new(root) { z-index: 9999; }
/* No CSS transitions while the reveal runs, or colours fade twice. */
html.theme-transitioning *,
html.theme-transitioning *::before,
html.theme-transitioning *::after {
  transition: none !important;
}
`;

function ensureRevealStyles() {
  if (typeof document === "undefined" || document.getElementById(REVEAL_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = REVEAL_STYLE_ID;
  style.textContent = REVEAL_CSS;
  document.head.appendChild(style);
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

/**
 * Applies `apply` behind a circle that grows from the centre of `origin` to
 * the far corner of the viewport. Falls back to a plain switch when the
 * browser has no View Transitions API or the user prefers reduced motion.
 */
function revealFrom(origin: Element, apply: () => void, duration: number) {
  const doc = document as ViewTransitionDocument;
  if (
    !doc.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    apply();
    return;
  }

  const rect = origin.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const root = document.documentElement;
  const done = () => root.classList.remove("theme-transitioning");
  // Belt and braces: never leave transitions disabled if `finished` is slow.
  window.setTimeout(done, duration + 250);

  const transition = doc.startViewTransition(() => {
    root.classList.add("theme-transitioning");
    // Flush so the new theme class is on <html> before the snapshot is taken.
    flushSync(apply);
  });

  transition.ready.then(() => {
    root.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      { duration, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" },
    );
  });
  transition.finished.then(done, done);
}


export type ThemeVariant = "icon" | "pill" | "dropdown";

export interface ThemeSwitcherProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ThemeVariant;
  /** Grow the new theme out of the control as a circle. Off = instant switch. */
  reveal?: boolean;
  /** Length of the reveal, in ms. */
  revealDuration?: number;
  /**
   * Replace how a picked theme is applied. By default the switcher reveals
   * and calls next-themes' setTheme; pass this to do it yourself — persist it
   * first, or hand the switch to a parent document. Gets the theme and the
   * element that was clicked, for the reveal origin.
   */
  applyTheme?: (theme: string, origin: Element | null) => void;
}

export const ThemeSwitcher = React.forwardRef<
  HTMLDivElement,
  ThemeSwitcherProps
>(({ variant = "icon", reveal = true, revealDuration = 500, applyTheme, className, ...props }, ref) => {
  const mounted = useIsMounted();
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  useEffect(() => {
    if (reveal) ensureRevealStyles();
  }, [reveal]);

  // What the variants call. Reveals from the element that was clicked, unless
  // nothing visible would change (e.g. "system" resolving to the current theme).
  const select = useCallback(
    (next: string, origin?: Element | null) => {
      if (applyTheme) {
        applyTheme(next, origin ?? null);
        return;
      }
      const nextResolved = next === "system" ? systemTheme : next;
      if (!reveal || !origin || nextResolved === resolvedTheme) {
        setTheme(next);
        return;
      }
      revealFrom(origin, () => setTheme(next), revealDuration);
    },
    [applyTheme, reveal, revealDuration, resolvedTheme, setTheme, systemTheme],
  );

  // Avoid hydration mismatch by waiting for mount

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
        setTheme={select}
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
        setTheme={select}
        className={className}
        {...props}
        ref={ref}
      />
    );
  }

  return (
    <ThemeSwitcherIcon
      resolvedTheme={resolvedTheme}
      setTheme={select}
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
  /** Pass the clicked element as `origin` so the reveal grows from it. */
  setTheme: (theme: string, origin?: Element | null) => void;
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
              onClick={(e) => setTheme(tab.id, e.currentTarget)}
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

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
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

      setTheme(isDark ? "light" : "dark", e.currentTarget);
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
              <Moon className="w-[18px] h-[18px] text-foreground" />
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
          className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 top-full mt-2 w-36 p-1 bg-popover text-popover-foreground border border-border rounded-xl shadow-xl z-50 hidden"
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
                  setTheme(item.id, e.currentTarget);
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
