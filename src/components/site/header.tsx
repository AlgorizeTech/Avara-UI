"use client";

import { GitHubIcon } from "@/assets/icons/github";
import { links } from "@/config/site";
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
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ThemeSwitcher } from "./theme";

/**
 * The command palette (its search index, motion, markdown renderer) and the
 * mobile nav drawer (the whole navigation tree) are only ever needed after a
 * click or a keystroke, so neither is in the page's first-load bundle. Each is
 * fetched when the reader shows intent — hovering, focusing or touching its
 * trigger — and kept mounted after that.
 */
const loadSearchModal = () => import("./search-modal").then((m) => m.SearchModal);
const loadSidebarMobile = () => import("./sidebar-mobile").then((m) => m.SidebarMobile);
const SearchModal = dynamic(loadSearchModal, { ssr: false });
const SidebarMobile = dynamic(loadSidebarMobile, { ssr: false });

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
  // Flipped on the first intent (or open) so the heavy pieces load on demand.
  const [searchMounted, setSearchMounted] = useState(false);
  const [sidebarMounted, setSidebarMounted] = useState(false);

  const openSearch = useCallback(() => {
    setSearchMounted(true);
    setSearchOpen(true);
  }, []);
  const warmSearch = useCallback(() => {
    void loadSearchModal();
  }, []);
  const warmSidebar = useCallback(() => {
    setSidebarMounted(true);
    void loadSidebarMobile();
  }, []);

  // Close sidebar drawer on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Universal Cmd+K / Ctrl+K Palette Interceptor
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openSearch]);

  // Embedded preview sandbox should not render the global header
  if (pathname.startsWith("/preview")) {
    return null;
  }

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay. Plain CSS transitions carry the same
          timings the motion version had: a 0.3s linear opacity fade, with
          `visibility` held back on close so the fade-out is still seen. */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden",
          sidebarOpen
            ? "visible opacity-100 [transition:opacity_300ms_linear,visibility_0s]"
            : "invisible opacity-0 [transition:opacity_300ms_linear,visibility_0s_linear_300ms]"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile Sidebar Navigation Drawer: slides in over 0.25s, ease-in-out.
          `inert` while closed keeps its links out of the tab order. */}
      <div
        inert={!sidebarOpen}
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[280px] bg-background border-r border-border md:hidden shadow-2xl transition-transform duration-[250ms] ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="w-full px-5 h-14 flex items-center justify-between border-b border-border">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="relative flex items-center justify-center">
              <img
                src="/favicon/logo-64x64.png"
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
            </div>
            <span className="font-semibold text-[16px] tracking-tight text-foreground">
              Avara <span className="text-brand">UI</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation menu"
            className="p-1 rounded-md text-foreground/55 hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>
        {sidebarMounted && <SidebarMobile onClose={() => setSidebarOpen(false)} />}
      </div>

      {/* Global Floating Segmented Sticky Navigation Shell */}
      <div className="w-full sticky top-0 z-50 pointer-events-none py-2 px-3 sm:px-6 md:px-8">
        <header className="mx-auto max-w-[1536px] h-10 flex items-center justify-between relative">
          {/* Left Area: Logo & Mobile Trigger Segment */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5 h-10 px-3 sm:px-3.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-xl border border-border/40 transition-all">
            {pathname !== "/" && (
              <button
                onClick={() => {
                  warmSidebar();
                  setSidebarOpen(true);
                }}
                onPointerEnter={warmSidebar}
                onFocus={warmSidebar}
                onTouchStart={warmSidebar}
                aria-expanded={sidebarOpen}
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
                  src="/favicon/logo-64x64.png"
                  alt=""
                  width={20}
                  height={20}
                  className="size-[20px]"
                />
              </div>
              <span className="font-extrabold text-[15px] tracking-tight text-foreground">
                Avara <span className="text-brand font-normal">UI</span>
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
              onClick={openSearch}
              onPointerEnter={warmSearch}
              onFocus={warmSearch}
              onTouchStart={warmSearch}
              className="pointer-events-auto flex items-center justify-center gap-2.5 size-10 min-[1240px]:w-auto min-[1240px]:justify-start min-[1240px]:pl-3.5 min-[1240px]:pr-5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-xl border border-border/40 text-foreground/80 hover:text-foreground hover:border-border/70 transition-all text-left cursor-pointer"
              aria-label="Search components and documentation"
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
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto flex items-center justify-center gap-2 size-10 lg:w-auto lg:px-3.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-xl border border-border/40 text-foreground/80 hover:text-foreground hover:border-border/70 transition-all text-[12.5px] font-medium"
              aria-label="View project on GitHub"
            >
              <GitHubIcon className="w-4 h-4 fill-current" />
              <span className="hidden lg:inline text-[12px] font-semibold text-foreground">GitHub</span>
            </Link>

            {/* Dynamic System Theme Core Engine Toggle */}
            <ThemeSwitcher
              className="pointer-events-auto size-10 rounded-full bg-black/[0.03] dark:bg-white/[0.04] backdrop-blur-xl border border-border/40 hover:border-border/70 text-foreground transition-all"
            />
          </div>
        </header>
      </div>

      {searchMounted && (
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      )}
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
