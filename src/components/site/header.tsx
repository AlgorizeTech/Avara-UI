"use client";

import { GitHubIcon } from "@/assets/icons/github";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  LayoutGrid,
  Linkedin,
  Palette,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchModal } from "./search-modal";
import { SidebarMobile } from "./sidebar-mobile";
import { ThemeSwitcher } from "./theme";

// ==========================================
// PREMIUM SUPPORT ALERT BANNER
// ==========================================
const SupportAlertBanner = () => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("docs-ui-banner-dismissed");
      return !dismissed;
    }
    return true;
  });

  const handleClose = () => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("docs-ui-banner-dismissed", "true");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="w-full relative flex items-center justify-center h-9 text-[12.5px] font-medium border-b border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 overflow-hidden select-none">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-[pulse_2s_ease-in-out_infinite]" />
        <span>
          Love Docs? Help it reach more developers —{" "}
          <Link
            href="/sponsor"
            className="font-semibold text-zinc-900 dark:text-zinc-50 border-b border-zinc-400 hover:border-zinc-900 dark:border-zinc-600 dark:hover:border-zinc-100 transition-colors pb-0.5"
          >
            Sponsor the project
          </Link>
        </span>
      </div>
      <button
        onClick={handleClose}
        className="absolute right-3.5 p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-all duration-150"
        aria-label="Dismiss banner"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

// ==========================================
// PREMIUM HEADER COMPONENT
// ==========================================
const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for border state transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Universal Cmd+K / Ctrl+K Palette Interceptor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* <SupportAlertBanner /> */}

      {/* Mobile Drawer Backdrop Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Navigation Drawer */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: sidebarOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed top-0 left-0 z-50 h-full w-[280px] bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800 md:hidden shadow-2xl"
      >
        <div className="w-full px-5 h-14 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="relative flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
              >
                <rect
                  x="3"
                  y="3"
                  width="7"
                  height="7"
                  rx="1.5"
                  className="fill-zinc-900 dark:fill-white"
                />
                <rect
                  x="14"
                  y="3"
                  width="7"
                  height="7"
                  rx="1.5"
                  className="fill-zinc-400 dark:fill-zinc-500"
                />
                <rect
                  x="14"
                  y="14"
                  width="7"
                  height="7"
                  rx="1.5"
                  className="fill-zinc-900 dark:fill-white"
                />
                <rect
                  x="3"
                  y="14"
                  width="7"
                  height="7"
                  rx="1.5"
                  className="fill-zinc-400 dark:fill-zinc-500"
                />
              </svg>
            </div>
            <span className="font-bold text-[16px] tracking-tight text-zinc-900 dark:text-zinc-50">
              Docs
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
        <SidebarMobile onClose={() => setSidebarOpen(false)} />
      </motion.div>

      {/* Global Sticky Navigation Shell */}
      <div
        className={cn(
          "w-full sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b transition-colors duration-200",
          isScrolled
            ? "border-zinc-200 dark:border-zinc-800/80 shadow-sm"
            : "border-zinc-200/50 dark:border-zinc-900/50",
        )}
      >
        <header className="mx-auto max-w-[1536px] h-[52px] px-4 md:px-5 flex items-center justify-between relative">
          {/* Left Area: Logo & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex flex-col gap-1 md:hidden p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded transition-colors"
              aria-label="Open navigation menu"
            >
              <span className="w-5 h-0.5 bg-zinc-700 dark:bg-zinc-300 rounded-full" />
              <span className="w-3 h-0.5 bg-zinc-700 dark:bg-zinc-300 rounded-full" />
              <span className="w-4 h-0.5 bg-zinc-700 dark:bg-zinc-300 rounded-full" />
            </button>

            <Link
              href="/"
              className="flex items-center gap-2.5 select-none group"
            >
              <div className="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-[22px]"
                >
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="7"
                    rx="1.5"
                    className="fill-zinc-900 dark:fill-white"
                  />
                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="7"
                    rx="1.5"
                    className="fill-zinc-400 dark:fill-zinc-500"
                  />
                  <rect
                    x="14"
                    y="14"
                    width="7"
                    height="7"
                    rx="1.5"
                    className="fill-zinc-900 dark:fill-white"
                  />
                  <rect
                    x="3"
                    y="14"
                    width="7"
                    height="7"
                    rx="1.5"
                    className="fill-zinc-400 dark:fill-zinc-500"
                  />
                </svg>
              </div>
              <span className="font-bold text-[16px] tracking-tight text-zinc-900 dark:text-zinc-50">
                Docs
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 scale-90">
                v1.0
              </span>
            </Link>
          </div>

          {/* Center Area: Absolute Centered Core Actions */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 text-[13.5px] font-medium text-zinc-500 dark:text-zinc-400">
            <Link
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-zinc-900 dark:text-zinc-100 font-medium bg-zinc-100 dark:bg-zinc-900"
              href="/docs"
              prefetch={false}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Docs
            </Link>
            <Link
              className="flex items-center gap-1.5 px-3 py-1 rounded-md hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
              href="/docs/nextjs/avatar"
              prefetch={false}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Components
            </Link>
            <Link
              className="flex items-center gap-1.5 px-3 py-1 rounded-md hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
              href="/themes"
              prefetch={false}
            >
              <Palette className="h-3.5 w-3.5" />
              Themes
            </Link>
          </nav>

          {/* Right Area: Command Palette Trigger, Socials, Theme */}
          <div className="flex items-center gap-2">
            {/* Command Palette Omni Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all text-left max-w-[40px] md:max-w-none md:w-[150px] xl:w-[220px]"
              aria-label="Open command palette search"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="hidden md:inline text-[12.5px] text-zinc-400 flex-1">
                Search…
              </span>
              <div className="hidden md:flex items-center gap-0.5 shrink-0 select-none">
                <kbd className="text-[10px] px-1 py-px rounded border border-zinc-200 dark:border-zinc-700 text-zinc-400 bg-white dark:bg-zinc-950 font-mono leading-none">
                  ⌘
                </kbd>
                <kbd className="text-[10px] px-1 py-px rounded border border-zinc-200 dark:border-zinc-700 text-zinc-400 bg-white dark:bg-zinc-950 font-mono leading-none">
                  K
                </kbd>
              </div>
            </button>

            <div className="hidden sm:block w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

            {/* Social Links (LinkedIn & GitHub) */}
            <div className="hidden lg:flex items-center gap-1.5">
              <Link
                href="https://www.linkedin.com/company/algorizetech/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                aria-label="View LinkedIn Profile"
              >
                <Linkedin className="w-[14px] h-[14px]" />
              </Link>

              <Link
                href="https://github.com/docs/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-[12.5px] font-medium"
                aria-label="View project on GitHub"
              >
                <GitHubIcon className="w-[14px] h-[14px] fill-current" />
                <span className="text-[11px] font-semibold px-1.5 py-px rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                  2.1k
                </span>
              </Link>
            </div>

            <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

            {/* Dynamic System Theme Core Engine Toggle */}
            <ThemeSwitcher />
          </div>
        </header>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
