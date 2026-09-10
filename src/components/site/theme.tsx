"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState, MouseEvent } from "react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  const toggleTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";

    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(nextTheme);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
      document.documentElement.classList.add("theme-transitioning");
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      document.documentElement
        .animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        )
        .onfinish = () => {
        document.documentElement.classList.remove("theme-transitioning");
      };
    });
    transition.finished.then(() => {
      document.documentElement.classList.remove("theme-transitioning");
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center rounded-md p-2 text-sm transition-colors text-zinc-950 dark:text-zinc-50 cursor-pointer"
      aria-label="Toggle Theme"
    >
      {mounted ? (isDark ? <Moon size={16} /> : <Sun size={16} />) : <div className="w-4 h-4" />}
    </button>
  );
};
