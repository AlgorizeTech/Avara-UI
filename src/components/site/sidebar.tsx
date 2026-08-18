"use client";

import { ScrollArea } from "@/components/site/scroll-area";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
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
  href: string;
  badge?: string;
  badges?: string[];
  children?: MenuItemType[];
}

// 1. Recursive transformation: cleanly maps unlimited nesting depths
const transformItem = (item: any): MenuItemType => ({
  label: item.label,
  href: item.href || (item.children?.[0]?.href ?? "#"),
  badge: item.badge,
  children: item.children ? item.children.map(transformItem) : undefined,
});

const transformNavigation = (): MenuItemType[] => {
  return navigation.map((section) => ({
    label: section.label,
    href: section.children[0]?.href || "#",
    children: section.children.map(transformItem),
  }));
};

const menuData = transformNavigation();

// Premium Badge Styling
const getBadgeStyle = (badge: string) => {
  switch (badge) {
    case "New":
      return "bg-primary/15 text-primary border border-primary/30";
    case "Updated":
      return "bg-primary/10 text-primary border border-primary/20";
    case "Tool":
      return "bg-primary/10 text-primary border border-primary/20";
    case "Premium":
      return "bg-primary/15 text-primary border border-primary/30";
    default:
      return "bg-primary/10 text-primary border border-primary/20";
  }
};

// 2. Recursive active checker: returns true if THIS item or ANY descendant is active
const checkActiveRecursive = (
  item: MenuItemType,
  currentPath: string,
): boolean => {
  if (item.href === currentPath) return true;
  return (
    item.children?.some((child) => checkActiveRecursive(child, currentPath)) ??
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
  const hasChildren = Boolean(item.children && item.children.length > 0);

  // Auto-expand folder if any child or descendant is currently active
  const hasActiveDescendant =
    hasChildren &&
    item.children!.some((child) => checkActiveRecursive(child, pathName));

  const [isOpen, setIsOpen] = useState(defaultOpen || hasActiveDescendant);

  // Force open state when searching, otherwise use local state
  const actualIsOpen = isSearching ? true : isOpen;

  // --- UPDATED ACTIVE LOGIC ---
  // isExactActive: True ONLY when you are on this exact link (for leaf items & indicator bar)
  const isExactActive = pathName === item.href && !hasChildren;

  // isParentActive: True if this is a folder AND one of its children is active
  const isParentActive = hasChildren && hasActiveDescendant;

  // Keep folder open if a user navigates to an inner child via another link
  useEffect(() => {
    if (hasActiveDescendant) {
      setIsOpen(true);
    }
  }, [hasActiveDescendant]);

  // Dynamic visual hierarchy styling based on depth level
  const getLevelClasses = () => {
    if (level === 0) {
      return cn(
        "font-semibold text-[14px] py-1.5 px-3",
        isExactActive || isParentActive
          ? "bg-primary/10 text-primary font-bold"
          : "text-zinc-900 dark:text-zinc-100 hover:bg-primary/5 hover:text-primary",
      );
    }
    if (level === 1) {
      return cn(
        "font-medium text-[13.5px] py-1.5 px-2.5",
        // Highlights the Level 1 parent (e.g., "Scroll Stack") when any child is clicked!
        isExactActive || isParentActive
          ? "bg-primary/10 text-primary font-semibold"
          : "text-zinc-600 dark:text-zinc-400 hover:text-primary hover:bg-primary/5",
      );
    }
    // Level 2+ (Sub-children and deeper)
    return cn(
      "text-[13px] py-1 px-2.5",
      isExactActive || isParentActive
        ? "bg-primary/10 text-primary font-medium"
        : "text-zinc-500 dark:text-zinc-400 hover:text-primary hover:bg-primary/5",
    );
  };

  const triggerContent = (
    <span className="flex items-center justify-between w-full truncate pr-1">
      <span className="flex items-center gap-2 truncate">
        {hasChildren && (
          <span className="text-zinc-400 shrink-0 transition-transform duration-200">
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
        <span
          className={cn(
            "text-[10px] font-bold px-1.5 py-px rounded-md ml-2 shrink-0",
            getBadgeStyle(item.badge),
          )}
        >
          {item.badge}
        </span>
      )}
    </span>
  );

  const baseClasses = cn(
    "relative flex items-center justify-between rounded-lg transition-all duration-200 select-none w-full text-left cursor-pointer",
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
        <Link href={item.href} className={baseClasses}>
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
              "ml-3.5 pl-2.5 border-l border-zinc-200 dark:border-zinc-800/80",
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
  const [searchQuery, setSearchQuery] = useState("");

  // Memoize filtered data to prevent unnecessary deep-tree recalculations
  const filteredMenuData = useMemo(() => {
    return filterMenuData(menuData, searchQuery);
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <aside className="hidden md:flex flex-col w-[240px] shrink-0 h-[calc(100dvh-57px)] sticky top-[57px] border-r border-zinc-200 dark:border-zinc-800/50 bg-white/50 dark:bg-black/20 backdrop-blur-xl">
      {/* --- STICKY SEARCH INPUT --- */}
      <div className="p-3 pb-3 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-20 shrink-0">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 bg-zinc-100/60 hover:bg-zinc-100 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 rounded-lg pl-9 pr-8 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 outline-none transition-all shadow-none [&::-webkit-search-cancel-button]:appearance-none"
            aria-label="Search documentation components"
          />
          {isSearching && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 w-full">
        <div className="py-4 px-4 pl-0 flex flex-col h-full">

          {/* --- NAVIGATION TREE --- */}
          <nav
            role="navigation"
            aria-label="Documentation navigation"
            className="flex-1"
          >
            {filteredMenuData.length > 0 ? (
              <ul className="space-y-4">
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
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  No results found
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  We couldn't find anything for "{searchQuery}"
                </p>
              </div>
            )}
          </nav>

          {/* Quick Links Section */}
          <div className="mt-8 pt-4 border-t border-zinc-200 dark:border-zinc-800/50 pl-4">
            <Link
              href="/docs/nextjs/index"
              className={cn(
                "flex items-center gap-2 py-2 px-3 rounded-lg text-[13.5px] transition-all cursor-pointer",
                currentPath === "/docs/nextjs/index"
                  ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800/50 font-medium"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
              )}
            >
              <PlayCircle className="w-4 h-4 text-zinc-400 shrink-0" />
              Getting Started Guide
            </Link>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
