"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center rounded-md p-2 text-sm transition-colors text-zinc-950 dark:text-zinc-50 cursor-pointer"
    >
      {mounted ? (isDark ? <Sun size={16} /> : <Moon size={16} />) : <div className="w-4 h-4" />}
    </button>
  );
};
