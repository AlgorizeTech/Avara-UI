"use client";

import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
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


// ==========================================
// MOTION
// Everything below runs on the Web Animations API rather than CSS
// transitions: the reveal above switches every transition off while it runs
// (`html.theme-transitioning`), and a theme change is exactly when these move.
// ==========================================
const POWER3_OUT =
  "linear(0, .1268, .2412, .3439, .4358, .5177, .5904, .6545, .7108, .7599, .8025, .8391, .8704, .8969, .9191, .9375, .9526, .9647, .9744, .9819, .9877, .9919, .9949, .997, .9984, .9992, .9997, .9999, 1, 1, 1)";
const BACK_OUT_2 =
  "linear(0, .159, .3031, .433, .5493, .6528, .744, .8237, .8924, .951, 1, 1.0401, 1.072, 1.0963, 1.1138, 1.125, 1.1307, 1.1314, 1.128, 1.121, 1.1111, 1.099, 1.0853, 1.0708, 1.056, 1.0417, 1.0284, 1.017, 1.008, 1.0021, 1)";
// power2.in / power2.out; back to back they make power2.inOut exactly.
const POWER2_IN = "cubic-bezier(0.3333, 0, 0.6667, 0)";
const POWER2_OUT = "cubic-bezier(0.3333, 1, 0.6667, 1)";

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
    const slideRef = useRef<Animation | null>(null);

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
        // Slide from wherever the indicator is right now: mid-slide, or on
        // mount from its unsized spot at the left edge.
        const now = getComputedStyle(indicator);
        const from = { transform: now.transform, width: now.width };
        const to = {
          transform: `translateX(${activeBtn.offsetLeft}px)`,
          width: `${activeBtn.offsetWidth}px`,
        };
        slideRef.current?.cancel();
        indicator.style.transform = to.transform;
        indicator.style.width = to.width;
        slideRef.current = indicator.animate([from, to], {
          duration: 400,
          easing: POWER3_OUT,
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
    const spinRef = useRef<Animation | null>(null);

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
      const isDark = resolvedTheme === "dark";

      // Spin: a half turn while shrinking to 0.8, then back (0.15s each way,
      // power2.inOut). A click mid-spin picks up from the current angle and
      // still comes to rest upright.
      const icon = iconRef.current;
      if (icon) {
        const now = getComputedStyle(icon);
        const angle = parseFloat(now.rotate) || 0;
        const size = parseFloat(now.scale);
        const scale = Number.isNaN(size) ? 1 : size;
        spinRef.current?.cancel();
        spinRef.current = icon.animate(
          [
            { rotate: `${angle}deg`, scale, easing: POWER2_IN },
            {
              rotate: `${(angle + 180) / 2}deg`,
              scale: (scale + 0.8) / 2,
              easing: POWER2_OUT,
            },
            { rotate: "180deg", scale: 0.8, easing: POWER2_IN },
            { rotate: "90deg", scale: 0.9, easing: POWER2_OUT },
            { rotate: "0deg", scale: 1 },
          ],
          { duration: 300 },
        );
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
    // Whether the menu is displayed at all: true while open and while the
    // close animation plays, then false (display: none).
    const [menuShown, setMenuShown] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuMotionRef = useRef<Animation | null>(null);

    // Opening displays the menu in the same render, so the entrance can start
    // from its first frame.
    const [prevOpen, setPrevOpen] = useState(isOpen);
    if (prevOpen !== isOpen) {
      setPrevOpen(isOpen);
      if (isOpen) setMenuShown(true);
    }

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

    // Open: 0.2s back.out(2) from 10px up at 95%. Close: 0.15s power2.in to
    // 5px up at 95% from wherever it is, then display: none. The animated
    // `transform` composes with the menu's own centring `translate` class
    // instead of replacing it.
    useLayoutEffect(() => {
      const menu = menuRef.current;
      if (!menu || !menuShown) return;
      if (isOpen) {
        menuMotionRef.current?.cancel();
        menuMotionRef.current = menu.animate(
          [
            { opacity: 0, transform: "translateY(-10px) scale(0.95)" },
            { opacity: 1, transform: "translateY(0px) scale(1)" },
          ],
          { duration: 200, easing: BACK_OUT_2 },
        );
        return;
      }
      const now = getComputedStyle(menu);
      const from = { opacity: now.opacity, transform: now.transform };
      menuMotionRef.current?.cancel();
      const close = menu.animate(
        [from, { opacity: 0, transform: "translateY(-5px) scale(0.95)" }],
        { duration: 150, easing: POWER2_IN, fill: "forwards" },
      );
      menuMotionRef.current = close;
      // Reopening cancels this animation, and a cancelled one never finishes.
      close.onfinish = () => setMenuShown(false);
    }, [isOpen, menuShown]);

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
          className={cn(
            "absolute left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 top-full mt-2 w-36 p-1 bg-popover text-popover-foreground border border-border rounded-xl shadow-xl z-50",
            !menuShown && "hidden",
          )}
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
