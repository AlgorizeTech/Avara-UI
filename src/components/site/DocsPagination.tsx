"use client";

import { usePathname, useRouter } from "next/navigation";
import { navHref, navigation } from "@/constants/navigation";
import { frameworkFromPathname, slugFromPathname } from "@/lib/framework";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

/** Keycap in the navigation tip: an ink-tint chip, like inline code. */
const KBD =
  "px-1.5 py-0.5 rounded bg-foreground/[0.06] border border-foreground/[0.08] font-mono text-[11px] font-medium text-foreground/70";

/** Prev/next card: the docs card surface, lifting to the hover tint. */
const CARD =
  "flex items-center gap-3 p-5 rounded-xl border border-foreground/[0.06] bg-foreground/[0.03] hover:bg-foreground/[0.07] transition-colors duration-300 group";

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
    <div className="mt-20 pt-8 border-t border-foreground/[0.06] w-full not-prose">
      <div className="flex flex-col items-center mb-6">
        <p className="text-[12px] text-foreground/40 flex items-center gap-1.5">
          Tip: Use 
          <kbd className={KBD}>Alt</kbd> 
          + 
          <kbd className={KBD}>←</kbd> 
          / 
          <kbd className={KBD}>→</kbd> 
          to navigate
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link href={navHref(prev, framework)} className={CARD}>
            <ChevronLeft className="w-4 h-4 text-foreground/30 transition-transform duration-300 group-hover:-translate-x-1" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[12px] text-foreground/40">
                Previous
              </span>
              <span className="text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors">
                {prev.label}
              </span>
            </div>
          </Link>
        ) : (
          <div /> 
        )}

        {next ? (
          <Link href={navHref(next, framework)} className={`${CARD} justify-end text-right`}>
            <div className="flex flex-col gap-0.5">
              <span className="text-[12px] text-foreground/40">
                Next
              </span>
              <span className="text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors">
                {next.label}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-foreground/30 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        ) : (
          <div /> 
        )}
      </div>
    </div>
  );
}
