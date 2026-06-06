"use client";

import { ScrollArea } from "@/components/site/scroll-area";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

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

interface MenuItem {
  label: string;
  href: string;
  badge?: string;
  badges?: string[];
  children?: MenuItem[];
}

// Transform the existing navigation data
const transformNavigation = (): MenuItem[] => {
  return navigation.map((section) => ({
    label: section.label,
    href: section.children[0]?.href || "#",
    children: section.children.map((child) => ({
      label: child.label,
      href: child.href,
      badge: child.badge,
      badges: undefined,
    })),
  }));
};

const menuData = transformNavigation();

// Premium Badge Styling
const getBadgeStyle = (badge: string) => {
  switch (badge) {
    case "New":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
    case "Updated":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20";
    case "Tool":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
    case "Premium":
      return "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20";
  }
};

const MenuItem: React.FC<{
  item: MenuItem;
  isNested?: boolean;
  defaultOpen?: boolean;
}> = ({ item, isNested = false, defaultOpen = false }) => {
  const pathName = useCurrentPath();

  // Auto-open if a child is active
  const hasActiveChild = item.children?.some(
    (child) => pathName === child.href,
  );
  const [isOpen, setIsOpen] = useState(defaultOpen || hasActiveChild);
  const isActive = pathName === item.href;

  // Reusable content for the trigger (button or link)
  const triggerContent = (
    <span className="flex items-center gap-2">
      {!isNested && item.children && (
        <span className="text-zinc-400 transition-transform duration-200">
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5" />
          )}
        </span>
      )}
      {item.label}
      {item.badge && (
        <span
          className={cn(
            "text-[10px] font-bold px-1.5 py-px rounded-md ml-1",
            getBadgeStyle(item.badge),
          )}
        >
          {item.badge}
        </span>
      )}
    </span>
  );

  // Reusable classes for the trigger (button or link)
  const triggerClasses = cn(
    "flex items-center justify-between py-1.5 px-3 rounded-lg text-[14px] transition-all duration-200 select-none w-full text-left",
    isNested ? "ml-4" : "font-semibold",
    isActive
      ? "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-white"
      : isNested
        ? "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        : "text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
  );

  return (
    <li className="flex flex-col">
      {/* FIX: If it has children, render a BUTTON instead of a LINK. 
        This prevents Next.js top-loaders from intercepting the click!
      */}
      {item.children ? (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={triggerClasses}
        >
          {triggerContent}
        </button>
      ) : (
        <Link href={item.href} className={triggerClasses}>
          {triggerContent}
        </Link>
      )}

      <AnimatePresence initial={false}>
        {item.children && isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden relative flex flex-col gap-0.5 mt-1"
          >
            {/* Indentation Guide Line */}
            <div className="absolute left-[19px] top-1 bottom-1 w-px bg-zinc-200 dark:bg-zinc-800" />

            {item.children.map((child, index) => {
              const isChildActive = pathName === child.href;
              return (
                <li key={index} className="relative z-10">
                  <Link
                    href={child.href}
                    className={cn(
                      "flex items-center py-1.5 px-3 ml-[28px] rounded-lg text-[13.5px] transition-all duration-200",
                      isChildActive
                        ? "text-zinc-900 dark:text-white font-medium bg-zinc-50 dark:bg-zinc-800/50"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/30",
                    )}
                  >
                    {isChildActive && (
                      <motion.div
                        layoutId="sidebar-active-indicator"
                        className="absolute left-[18px] w-[3px] h-[18px] bg-zinc-900 dark:bg-zinc-100 rounded-full"
                      />
                    )}
                    {child.label}
                    {child.badge && (
                      <span
                        className={cn(
                          "text-[10px] font-bold px-1.5 py-px rounded-md ml-auto",
                          getBadgeStyle(child.badge),
                        )}
                      >
                        {child.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

const Sidebar = () => {
  const currentPath = useCurrentPath();

  return (
    <aside className="hidden md:block w-[260px] shrink-0 h-[calc(100dvh-57px)] sticky top-[57px] border-r border-zinc-200 dark:border-zinc-800/50 bg-white/50 dark:bg-black/20 backdrop-blur-xl">
      <ScrollArea className="h-full w-full">
        <div className="py-8 px-4 flex flex-col gap-6">
          <nav role="navigation" aria-label="Documentation navigation">
            <ul className="space-y-4">
              {menuData.map((item, index) => (
                <MenuItem key={index} item={item} defaultOpen={index === 0} />
              ))}
            </ul>
          </nav>

          {/* Quick Links Section */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/50">
            <Link
              href="/docs"
              className={cn(
                "flex items-center gap-2 py-2 px-3 rounded-lg text-[13.5px] transition-all",
                currentPath === "/docs"
                  ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800/50 font-medium"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
              )}
            >
              <PlayCircle className="w-4 h-4 text-zinc-400" />
              Getting Started Guide
            </Link>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
