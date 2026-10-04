"use client";

import { FrameworkSwitcher } from "@/components/site/framework-switcher";
import { ScrollArea } from "@/components/site/scroll-area";
import { navigation } from "@/constants/navigation";
import {
  docsHref,
  frameworkFromPathname,
  slugFromPathname,
} from "@/lib/framework";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronRight, PlayCircle, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

// Custom hook for static export compatibility
const useCurrentPath = () => {
  const [currentPath, setCurrentPath] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setCurrentPath(
        path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path,
      );
    }
  }, [pathname]);

  const normalizedPathname =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;
  return currentPath || normalizedPathname;
};

export interface MenuItemType {
  label: string;
  /** Path below the framework segment. Composed into an href at render time. */
  slug?: string;
  href?: string;
  badge?: string;
  badges?: string[];
  children?: MenuItemType[];
}

// 1. Recursive transformation: cleanly maps unlimited nesting depths
const transformItem = (item: any): MenuItemType => ({
  label: item.label,
  slug: item.slug ?? item.children?.[0]?.slug ?? "",
  badge: item.badge,
  children: item.children ? item.children.map(transformItem) : undefined,
});

const transformNavigation = (): MenuItemType[] => {
  return navigation.map((section) => ({
    label: section.label,
    slug: section.children[0]?.slug ?? "",
    children: section.children.map(transformItem),
  }));
};

// Safe at module scope only because this tree is now framework-independent: it
// holds slugs, and the href is composed per render. Storing hrefs here would
// pin the whole sidebar to whichever framework happened to build first.
const menuData = transformNavigation();

// Reicon's status badge (their "BETA"): tiny bold uppercase in the accent on
// an accent tint with a hairline, the same for every label.
const BADGE =
  "text-[9px] font-bold uppercase tracking-wider leading-none px-1.5 py-0.5 rounded-md bg-primary/15 text-primary border border-primary/30";

// 2. Recursive active checker: returns true if THIS item or ANY descendant is active
// Matches on slug, never on a composed href. An href comparison still typechecks
// once the framework segment is dynamic — it just returns false forever, which
// silently kills active state and prev/next with a perfectly green build.
const checkActiveRecursive = (
  item: MenuItemType,
  currentSlug: string,
): boolean => {
  if (item.slug === currentSlug) return true;
  return (
    item.children?.some((child) => checkActiveRecursive(child, currentSlug)) ??
    false
  );
};

// 3. Unified Recursive Menu Item Component
const MenuItem: React.FC<{
  item: MenuItemType;
  level?: number;
  defaultOpen?: boolean;
  isSearching?: boolean;
}> = ({ item, level = 0, defaultOpen = false, isSearching = false }) => {
  const pathName = useCurrentPath();
  const framework = frameworkFromPathname(pathName);
  const currentSlug = slugFromPathname(pathName);
  const hasChildren = Boolean(item.children && item.children.length > 0);

  // Auto-expand folder if any child or descendant is currently active
  const hasActiveDescendant =
    hasChildren &&
    item.children!.some((child) => checkActiveRecursive(child, currentSlug));

  const [isOpen, setIsOpen] = useState(defaultOpen || hasActiveDescendant);

  // Force open state when searching, otherwise use local state
  const actualIsOpen = isSearching ? true : isOpen;

  // --- UPDATED ACTIVE LOGIC ---
  // isExactActive: True ONLY when you are on this exact link (for leaf items & indicator bar)
  const itemSlug = item.slug || (item.href ? item.href.split("/").slice(3).join("/") : "");
  const isExactActive = currentSlug === itemSlug && !hasChildren;

  // isParentActive: True if this is a folder AND one of its children is active
  const isParentActive = hasChildren && hasActiveDescendant;

  // Keep folder open if a user navigates to an inner child via another link
  useEffect(() => {
    if (hasActiveDescendant) {
      setIsOpen(true);
    }
  }, [hasActiveDescendant]);

  // Reicon's hierarchy: top-level sections read as small uppercase group
  // labels; every link below is 13px ink at 55% that darkens on hover, and the
  // current page is the accent at medium weight with no filled background.
  const getLevelClasses = () => {
    if (level === 0) {
      return cn(
        "text-[11px] font-semibold uppercase tracking-[0.08em] py-1.5 px-3",
        isExactActive || isParentActive
          ? "text-foreground/60"
          : "text-foreground/35 hover:text-foreground/60",
      );
    }
    return cn(
      "text-[13px] min-h-8 py-[0.35rem] px-2.5",
      isExactActive
        ? "text-primary font-medium"
        : isParentActive
          // A folder holding the current page (e.g. "Scroll Stack") stays in
          // the ink so the trail down to the accent-coloured leaf reads.
          ? "text-foreground font-medium"
          : "text-foreground/55 hover:text-foreground",
    );
  };

  const triggerContent = (
    <span className="flex items-center justify-between w-full truncate pr-1">
      <span className="flex items-center gap-2 truncate">
        {hasChildren && (
          <span className="text-foreground/35 shrink-0 transition-transform duration-200">
            {actualIsOpen ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </span>
        )}
        <span className="truncate">{item.label}</span>
      </span>

      {item.badge && (
        <span className={cn(BADGE, "ml-2 shrink-0")}>
          {item.badge}
        </span>
      )}
    </span>
  );

  const baseClasses = cn(
    "relative flex items-center justify-between rounded-md transition-colors duration-150 select-none w-full text-left cursor-pointer",
    getLevelClasses(),
  );

  return (
    <li className="flex flex-col">
      {/* Trigger: Renders button for folders, Link for leaves */}
      {hasChildren ? (
        <button
          type="button"
          onClick={() => !isSearching && setIsOpen(!isOpen)}
          className={baseClasses}
        >
          {triggerContent}
        </button>
      ) : (
        <Link href={item.href || docsHref(framework, item.slug || "")} className={baseClasses}>
          {/* Active indicator pill ONLY renders on the exact active child leaf */}
          {isExactActive && (
            <motion.div
              layoutId="sidebar-active-indicator"
              className="absolute left-0 w-[3px] h-[16px] bg-primary rounded-full -ml-[7px]"
            />
          )}
          {triggerContent}
        </Link>
      )}

      {/* Recursive Children Render */}
      <AnimatePresence initial={false}>
        {hasChildren && actualIsOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={cn(
              "overflow-hidden relative flex flex-col gap-0.5 mt-0.5",
              // Dynamic left indentation & guide line for every nested level
              "ml-3.5 pl-2.5 border-l border-foreground/[0.08]",
            )}
          >
            {item.children!.map((child, index) => (
              <MenuItem
                key={`${child.label}-${index}`}
                item={child}
                level={level + 1}
                isSearching={isSearching}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

// 4. Recursive search filtering: Keeps parents if their children match
const filterMenuData = (
  data: MenuItemType[],
  query: string,
): MenuItemType[] => {
  if (!query) return data;
  const lowerQuery = query.toLowerCase();

  return data.reduce<MenuItemType[]>((acc, item) => {
    const matches = item.label.toLowerCase().includes(lowerQuery);

    if (matches) {
      // If the parent explicitly matches, include it and all its original children
      acc.push(item);
    } else if (item.children) {
      // If the parent doesn't match, check if any of its children match
      const filteredChildren = filterMenuData(item.children, query);
      if (filteredChildren.length > 0) {
        acc.push({ ...item, children: filteredChildren });
      }
    }
    return acc;
  }, []);
};

const Sidebar = () => {
  const currentPath = useCurrentPath();
  const framework = frameworkFromPathname(currentPath);
  const currentSlug = slugFromPathname(currentPath);
  const [searchQuery, setSearchQuery] = useState("");

  // Memoize filtered data to prevent unnecessary deep-tree recalculations
  const filteredMenuData = useMemo(() => {
    return filterMenuData(menuData, searchQuery);
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 h-[calc(100dvh-57px)] sticky top-[57px] bg-background">
      {/* --- STICKY FRAMEWORK SWITCHER + SEARCH INPUT ---
          One control group: the switcher scopes the tree, search filters within
          that scope, and neither may scroll away from the reader. */}
      <div className="pt-5 pb-3 pl-0.5 pr-3 bg-background sticky top-0 z-20 shrink-0 space-y-2.5">
        <FrameworkSwitcher />
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 w-3.5 h-3.5 text-foreground/35 pointer-events-none" />
          <input
            type="search"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 bg-foreground/[0.03] hover:bg-foreground/[0.05] border border-foreground/10 focus:border-primary/40 rounded-lg pl-8 pr-8 py-2 text-[13px] text-foreground placeholder:text-foreground/35 outline-none transition-colors shadow-none [&::-webkit-search-cancel-button]:appearance-none"
            aria-label="Search documentation components"
          />
          {isSearching && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 p-1 rounded-md text-foreground/35 hover:text-foreground/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 w-full">
        <div className="pt-2 pb-8 pr-3 pl-0 flex flex-col h-full">

          {/* --- NAVIGATION TREE --- */}
          <nav
            role="navigation"
            aria-label="Documentation navigation"
            className="flex-1"
          >
            {filteredMenuData.length > 0 ? (
              <ul className="space-y-5">
                {filteredMenuData.map((item, index) => (
                  <MenuItem
                    key={`${item.label}-${index}`}
                    item={item}
                    level={0}
                    defaultOpen={index === 0}
                    isSearching={isSearching}
                  />
                ))}
              </ul>
            ) : (
              <div className="pl-4 py-8 text-center flex flex-col items-center justify-center gap-2">
                <p className="text-[13px] font-medium text-foreground">
                  No results found
                </p>
                <p className="text-[12px] text-foreground/40">
                  We couldn't find anything for "{searchQuery}"
                </p>
              </div>
            )}
          </nav>

          {/* Quick Links Section */}
          <div className="mt-8 pt-4 border-t border-foreground/[0.06]">
            <Link
              href={docsHref(framework, "index")}
              className={cn(
                "flex items-center gap-2 min-h-8 py-[0.35rem] px-3 rounded-md text-[13px] transition-colors cursor-pointer",
                currentSlug === "index"
                  ? "text-primary font-medium"
                  : "text-foreground/55 hover:text-foreground",
              )}
            >
              <PlayCircle className="w-3.5 h-3.5 shrink-0 opacity-70" />
              Getting Started Guide
            </Link>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
