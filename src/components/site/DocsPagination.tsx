"use client";

import { usePathname, useRouter } from "next/navigation";
import { navHref, navigation } from "@/constants/navigation";
import { docsHref, frameworkFromPathname, slugFromPathname } from "@/lib/framework";
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

  const framework = frameworkFromPathname(pathname);
  const currentSlug = slugFromPathname(pathname);

  // Flatten the navigation tree to a 1D array of valid links
  const allLinks = navigation.flatMap(section => 
    section.children.flatMap(child => 
      child.children ? child.children : [child]
    )
  ).filter(item => item.slug);

  // Matched on slug, not on a composed href: an href comparison survives the
  // compiler but returns false on every page once the framework segment is
  // dynamic, so prev/next would silently render nothing forever.
  const currentIndex = allLinks.findIndex(item => item.slug === currentSlug);
  
  const prev = currentIndex > 0 ? allLinks[currentIndex - 1] : null;
  const next = currentIndex !== -1 && currentIndex < allLinks.length - 1 ? allLinks[currentIndex + 1] : null;

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key === "ArrowLeft" && prev) {
          router.push(navHref(prev, framework));
        }
        if (e.key === "ArrowRight" && next) {
          router.push(navHref(next, framework));
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next, router, framework]);

  if (!isMounted || currentIndex === -1) {
    return null; 
  }

  return (
    <div className="mt-20 pt-8 border-t border-border w-full not-prose">
      <div className="flex flex-col items-center mb-6">
        <p className="text-[13px] text-muted-foreground flex items-center gap-1.5 font-medium">
          Tip: Use 
          <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded shadow-sm text-xs font-mono font-bold text-foreground">Alt</kbd> 
          + 
          <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded shadow-sm text-xs font-mono font-bold text-foreground">←</kbd> 
          / 
          <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded shadow-sm text-xs font-mono font-bold text-foreground">→</kbd> 
          to navigate
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link href={navHref(prev, framework)} className="flex items-center gap-3 p-5 rounded-2xl border border-border bg-card hover:border-ring hover:bg-accent transition-all duration-300 group">
            <ChevronLeft className="w-5 h-5 text-muted-foreground/60 transition-transform duration-300 group-hover:-translate-x-1" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
                Previous
              </span>
              <span className="text-[15px] font-bold text-foreground group-hover:text-primary transition-colors">
                {prev.label}
              </span>
            </div>
          </Link>
        ) : (
          <div /> 
        )}

        {next ? (
          <Link href={navHref(next, framework)} className="flex items-center justify-end gap-3 p-5 rounded-2xl border border-border bg-card hover:border-ring hover:bg-accent transition-all duration-300 group text-right">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
                Next
              </span>
              <span className="text-[15px] font-bold text-foreground group-hover:text-primary transition-colors">
                {next.label}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground/60 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        ) : (
          <div /> 
        )}
      </div>
    </div>
  );
}
