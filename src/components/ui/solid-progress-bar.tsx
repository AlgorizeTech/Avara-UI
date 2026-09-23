"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SolidProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // 1. Finish the progress bar when the route actually changes
  useEffect(() => {
    if (isVisible) {
      setProgress(100); // Snap to 100%
      const timeout = setTimeout(() => {
        setIsVisible(false); // Fade out
        setTimeout(() => setProgress(0), 300); // Reset width silently after fade
      }, 300);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // 2. Intercept link clicks to start the progress bar
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      // Ignore if not a link, or if it opens in a new tab
      if (!target || target.target === "_blank") return;

      const href = target.getAttribute("href");
      // Ignore empty links, anchor links (#), or links to the exact same page
      if (
        !href ||
        href.startsWith("#") ||
        href.replace(/#.*$/, "") === pathname
      )
        return;

      // Start the progress bar!
      setIsVisible(true);
      setProgress(15); // Initial jump

      // Slowly trickle the bar forward while we wait for the page to load
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) {
            clearInterval(interval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 400);

      return () => clearInterval(interval);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  // Don't render anything if it's completely idle
  if (!isVisible && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[10000] pointer-events-none">
      {/* This is your perfectly solid, flat bar. 
        It is the ink token (bg-foreground), so it follows every theme preset. 
      */}
      <div
        className="h-full bg-foreground transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? "300ms" : "400ms",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  );
}
