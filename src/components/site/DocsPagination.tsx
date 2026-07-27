"use client";

import { usePathname, useRouter } from "next/navigation";
import { navigation } from "@/constants/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export function DocsPagination() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Flatten the navigation tree to a 1D array of valid links
  const allLinks = navigation.flatMap(section => 
    section.children.flatMap(child => 
      child.children ? child.children : [child]
    )
  ).filter(item => item.href);

  const currentIndex = allLinks.findIndex(item => item.href === pathname);
  
  const prev = currentIndex > 0 ? allLinks[currentIndex - 1] : null;
  const next = currentIndex !== -1 && currentIndex < allLinks.length - 1 ? allLinks[currentIndex + 1] : null;

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key === "ArrowLeft" && prev) {
          router.push(prev.href);
        }
        if (e.key === "ArrowRight" && next) {
          router.push(next.href);
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next, router]);

  if (!isMounted || currentIndex === -1) {
    return null; 
  }

  return (
    <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800/50 w-full not-prose">
      <div className="flex flex-col items-center mb-6">
        <p className="text-[13px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 font-medium">
          Tip: Use 
          <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-sm text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">Alt</kbd> 
          + 
          <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-sm text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">←</kbd> 
          / 
          <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-sm text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">→</kbd> 
          to navigate
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link href={prev.href} className="flex items-center gap-3 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300 group">
            <ChevronLeft className="w-5 h-5 text-zinc-400 transition-transform duration-300 group-hover:-translate-x-1" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
                Previous
              </span>
              <span className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors">
                {prev.label}
              </span>
            </div>
          </Link>
        ) : (
          <div /> 
        )}

        {next ? (
          <Link href={next.href} className="flex items-center justify-end gap-3 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300 group text-right">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
                Next
              </span>
              <span className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors">
                {next.label}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-400 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        ) : (
          <div /> 
        )}
      </div>
    </div>
  );
}
