"use client";

import { GitHubIcon } from "@/assets/icons/github";
import { cn } from "@/lib/utils";
import {
  docsHref,
  frameworkFromPathname,
  slugFromPathname,
} from "@/lib/framework";
import {
  BookOpen,
  LayoutGrid,
  Linkedin,
  Palette,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchModal } from "./search-modal";
import { SidebarMobile } from "./sidebar-mobile";
import { ThemeSwitcher } from "./theme";

/**
 * The guide pages, in sidebar order. "Docs" opens the first of them rather than
 * the /docs landing page, so clicking it starts the reader at the Introduction
 * instead of an index they have to click through.
 */
/**
 * The header renders inside the docs as well as outside them, so its docs links
 * must follow the reader's current framework rather than pin to the default.
 * `frameworkFromPathname` does both: the active framework within /docs/..., and
 * the default anywhere else — which is the right answer for a marketing page.
 */
const docsEntryFor = (pathname: string) =>
  docsHref(frameworkFromPathname(pathname), "index");

/**
 * Matched on slug rather than full path: the framework segment is dynamic, so a
 * path list would stop matching the moment a reader is on /docs/reactjs/... and
 * the wrong header item would highlight.
 */
const GUIDE_SLUGS = new Set(["index", "installation", "first-app", "mcp"]);

/** True on the guide pages; everything else under /docs/ is a component page. */
const isGuidePath = (pathname: string) =>
  pathname === "/docs" || GUIDE_SLUGS.has(slugFromPathname(pathname));

// ==========================================
// PREMIUM HEADER COMPONENT
// ==========================================
const Header = () => {
  const pathname = usePathname() || "";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Close sidebar drawer on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

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

  // Embedded preview sandbox should not render the global header
  if (pathname.startsWith("/preview")) {
    return null;
  }

  return (
    <>
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
        className="fixed top-0 left-0 z-50 h-full w-[280px] bg-background border-r border-border md:hidden shadow-2xl"
      >
        <div className="w-full px-5 h-14 flex items-center justify-between border-b border-border">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="relative flex items-center justify-center">
              <img
                src="/favicon/android-chrome-192x192.png"
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
            </div>
            <span className="font-semibold text-[16px] tracking-tight text-foreground">
              Avara UI
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md text-foreground/55 hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>
        <SidebarMobile onClose={() => setSidebarOpen(false)} />
      </motion.div>

      {/* Global Floating Segmented Sticky Navigation Shell */}
      <div className="w-full sticky top-0 z-50 pointer-events-none py-2 px-3 sm:px-6 md:px-8">
        <header className="mx-auto max-w-[1536px] h-10 flex items-center justify-between relative">
          {/* Left Area: Logo & Mobile Trigger Segment */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5 h-10 px-3 sm:px-3.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-xl border border-border/40 transition-all">
            {pathname !== "/" && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex flex-col gap-1 md:hidden p-1 hover:bg-foreground/10 rounded-full transition-colors cursor-pointer"
                aria-label="Open navigation menu"
              >
                <span className="w-4 h-0.5 bg-foreground rounded-full" />
                <span className="w-2.5 h-0.5 bg-foreground rounded-full" />
                <span className="w-3.5 h-0.5 bg-foreground rounded-full" />
              </button>
            )}

            <Link
              href="/"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-2 select-none group"
            >
              <div className="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <img
                  src="/favicon/android-chrome-192x192.png"
                  alt=""
                  width={20}
                  height={20}
                  className="size-[20px]"
                />
              </div>
              <span className="font-extrabold text-[15px] tracking-tight text-foreground">
                Avara <span className="text-primary font-normal">UI</span>
              </span>
            </Link>
          </div>

          {/* Center Area: Absolute Centered Navigation Segment */}
          <nav className="pointer-events-auto hidden md:flex items-center gap-1 p-1 h-10 rounded-full bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-xl border border-border/40 absolute left-1/2 -translate-x-1/2 text-[13px] text-foreground transition-all">
            <Link
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all text-[12.5px] hover:bg-foreground/5",
                isGuidePath(pathname)
                  ? "font-semibold text-foreground"
                  : "font-medium text-foreground/80 hover:text-foreground"
              )}
              href={docsEntryFor(pathname)}
              prefetch={false}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Docs
            </Link>
            <Link
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all text-[12.5px] hover:bg-foreground/5",
                pathname.startsWith("/docs/") && !isGuidePath(pathname)
                  ? "font-semibold text-foreground"
                  : "font-medium text-foreground/80 hover:text-foreground"
              )}
              href={docsHref(frameworkFromPathname(pathname), "all-components")}
              prefetch={false}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Components
            </Link>
            <Link
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all text-[12.5px] hover:bg-foreground/5",
                pathname.startsWith("/themes")
                  ? "font-semibold text-foreground"
                  : "font-medium text-foreground/80 hover:text-foreground"
              )}
              href="/themes"
              prefetch={false}
            >
              <Palette className="h-3.5 w-3.5" />
              Themes
            </Link>
          </nav>

          {/* Right Area: Action Pills (Search, Socials, Theme) */}
          <div className="flex items-center gap-2">
            {/* Command Palette Omni Button — icon-only below 1240px, where the
                full pill would run under the centred nav. */}
            <button
              onClick={() => setSearchOpen(true)}
              className="pointer-events-auto flex items-center justify-center gap-2.5 size-10 min-[1240px]:w-auto min-[1240px]:justify-start min-[1240px]:pl-3.5 min-[1240px]:pr-5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-xl border border-border/40 text-foreground/80 hover:text-foreground hover:border-border/70 transition-all text-left cursor-pointer"
              aria-label="Open command palette search"
            >
              <Search className="size-4 min-[1240px]:size-3.5 min-[1240px]:text-foreground/50 shrink-0" />
              <span className="hidden min-[1240px]:inline text-[12.5px] text-foreground/50">
                Search…
              </span>
              <div className="hidden min-[1240px]:flex items-center gap-1 shrink-0 select-none ml-2.5">
                <kbd className="size-[19px] flex items-center justify-center rounded-[5px] border border-border/60 text-foreground/40 font-mono text-[10px] leading-none bg-foreground/5">
                  ⌘
                </kbd>
                <kbd className="size-[19px] flex items-center justify-center rounded-[5px] border border-border/60 text-foreground/40 font-mono text-[10px] leading-none bg-foreground/5">
                  K
                </kbd>
              </div>
            </button>

            {/* LinkedIn Pill */}
            <Link
              href="https://www.linkedin.com/company/algorizetech/"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto hidden lg:flex items-center justify-center size-10 rounded-full bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-xl border border-border/40 text-foreground/80 hover:text-foreground hover:border-border/70 transition-all"
              aria-label="View LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </Link>

            {/* GitHub Stars Pill */}
            <Link
              href="https://github.com/AlgorizeTech/Reusable-Component-Documentation"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto hidden sm:flex items-center justify-center gap-2 size-10 lg:w-auto lg:px-3.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-xl border border-border/40 text-foreground/80 hover:text-foreground hover:border-border/70 transition-all text-[12.5px] font-medium"
              aria-label="View project on GitHub"
            >
              <GitHubIcon className="w-4 h-4 fill-current" />
              <span className="hidden lg:inline text-[12px] font-semibold text-foreground">GitHub</span>
              {/* <span className="hidden lg:block w-px h-3.5 bg-border/60 mx-0.5" />
              <span className="hidden lg:inline text-[11px] font-semibold text-foreground/50">
                2.1k
              </span> */}
            </Link>

            {/* Dynamic System Theme Core Engine Toggle */}
            <ThemeSwitcher
              className="pointer-events-auto size-10 rounded-full bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-xl border border-border/40 hover:border-border/70 text-foreground transition-all"
            />
          </div>
        </header>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

// Preview pages are embedded as bare component stages — no site chrome.
function HeaderGate() {
  const pathname = usePathname() || "";
  if (pathname.startsWith("/preview")) return null;
  return <Header />;
}

export default HeaderGate;
