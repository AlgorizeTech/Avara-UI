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
import { AnimatePresence, motion } from "framer-motion";
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
const GUIDE_SLUGS = new Set(["index", "installation", "first-app", "architecture"]);

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
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for border state transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
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
                  className="fill-foreground"
                />
                <rect
                  x="14"
                  y="3"
                  width="7"
                  height="7"
                  rx="1.5"
                  className="fill-primary"
                />
                <rect
                  x="14"
                  y="14"
                  width="7"
                  height="7"
                  rx="1.5"
                  className="fill-foreground"
                />
                <rect
                  x="3"
                  y="14"
                  width="7"
                  height="7"
                  rx="1.5"
                  className="fill-primary"
                />
              </svg>
            </div>
            <span className="font-semibold text-[16px] tracking-tight text-foreground flex items-center gap-1.5">
              Docs UI
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 leading-none">v1.0</span>
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>
        <SidebarMobile onClose={() => setSidebarOpen(false)} />
      </motion.div>

      {/* Global Sticky Navigation Shell */}
      <div
        className={cn(
          "w-full sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/80 shadow-md"
            : "bg-background/30 backdrop-blur-md border-b border-border/20"
        )}
      >
        <header className="mx-auto max-w-[1536px] h-[54px] px-4 md:px-6 flex items-center justify-between relative">
          {/* Left Area: Logo & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex flex-col gap-1 md:hidden p-1 hover:bg-muted rounded transition-colors"
              aria-label="Open navigation menu"
            >
              <span className="w-5 h-0.5 bg-foreground rounded-full" />
              <span className="w-3 h-0.5 bg-foreground rounded-full" />
              <span className="w-4 h-0.5 bg-foreground rounded-full" />
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
                    className="fill-foreground"
                  />
                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="7"
                    rx="1.5"
                    className="fill-primary"
                  />
                  <rect
                    x="14"
                    y="14"
                    width="7"
                    height="7"
                    rx="1.5"
                    className="fill-foreground"
                  />
                  <rect
                    x="3"
                    y="14"
                    width="7"
                    height="7"
                    rx="1.5"
                    className="fill-primary"
                  />
                </svg>
              </div>
            <span className="font-extrabold text-[16px] tracking-tight text-foreground flex items-center gap-1.5">
              Docs <span className="text-primary font-normal">UI</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 leading-none">v1.0</span>
            </span>
          </Link>
          </div>

          {/* Center Area: Absolute Centered Core Actions */}
          <nav className="hidden md:flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold text-muted-foreground">
            <Link
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all",
                isGuidePath(pathname)
                  ? "text-primary-foreground bg-primary shadow-sm"
                  : "hover:text-foreground hover:bg-muted/60"
              )}
              href={docsEntryFor(pathname)}
              prefetch={false}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Docs
            </Link>
            <Link
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all",
                pathname.startsWith("/docs/") && !isGuidePath(pathname)
                  ? "text-primary-foreground bg-primary shadow-sm"
                  : "hover:text-foreground hover:bg-muted/60"
              )}
              href={docsHref(frameworkFromPathname(pathname), "all-components")}
              prefetch={false}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Components
            </Link>
            <Link
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all",
                pathname.startsWith("/themes")
                  ? "text-primary-foreground bg-primary shadow-sm"
                  : "hover:text-foreground hover:bg-muted/60"
              )}
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
              className="flex items-center gap-2 px-3 h-8 rounded-lg bg-muted/50 border border-border hover:border-primary/50 hover:bg-muted transition-all text-left max-w-[40px] md:max-w-none md:w-[160px] xl:w-[220px] cursor-pointer"
              aria-label="Open command palette search"
            >
              <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span className="hidden md:inline text-[12.5px] text-muted-foreground flex-1">
                Search…
              </span>
              <div className="hidden md:flex items-center gap-0.5 shrink-0 select-none">
                <kbd className="text-[10px] px-1 py-px rounded border border-border text-muted-foreground bg-background font-mono leading-none">
                  ⌘
                </kbd>
                <kbd className="text-[10px] px-1 py-px rounded border border-border text-muted-foreground bg-background font-mono leading-none">
                  K
                </kbd>
              </div>
            </button>

            <div className="hidden sm:block w-px h-5 bg-border mx-0.5" />

            {/* Social Links */}
            <div className="hidden lg:flex items-center gap-1.5">
              <Link
                href="https://www.linkedin.com/company/algorizetech/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-8 w-8 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                aria-label="View LinkedIn Profile"
              >
                <Linkedin className="w-[14px] h-[14px]" />
              </Link>

              <Link
                href="https://github.com/docs/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-[12.5px] font-medium"
                aria-label="View project on GitHub"
              >
                <GitHubIcon className="w-[14px] h-[14px] fill-current" />
                <span className="text-[11px] font-semibold px-1.5 py-px rounded-full bg-muted text-muted-foreground border border-border">
                  2.1k
                </span>
              </Link>
            </div>

            <div className="w-px h-5 bg-border mx-0.5" />

            {/* Dynamic System Theme Core Engine Toggle */}
            <ThemeSwitcher />
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
