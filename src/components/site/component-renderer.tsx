"use client";

import { cn } from "@/lib/utils";
import { Expand, ExternalLink, RotateCw, Shrink } from "lucide-react";
import { cloneElement, useEffect, useRef, useState } from "react";

type ComponentPreviewProps = {
  component: React.ReactElement;
  reTrigger?: boolean;
  className?: string;
  componentName?: string;
};

export function ComponentRenderer({
  component,
  className,
  reTrigger = false,
  componentName,
}: ComponentPreviewProps) {
  const [key, setKey] = useState(Date.now());
  const [isFullPage, setIsFullPage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const changeKey = () => {
    setKey(Date.now());
  };

  const handleFullPage = () => {
    setIsFullPage(!isFullPage);
  };

  const handleNewPage = () => {
    if (componentName) {
      // Create a URL for the standalone component view
      const standaloneUrl = `/standalone/${componentName}`;
      window.open(standaloneUrl, "_blank");
    }
  };

  // Handle body scroll locking and Escape key to exit fullscreen
  useEffect(() => {
    if (isFullPage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullPage) {
        setIsFullPage(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount or when state changes
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullPage]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex w-full items-center justify-center rounded-lg p-0 relative not-prose grid-bg bg-white dark:bg-black transition-all duration-300",
        // Pushed z-index to 100 to ensure it covers Navbars and other floating elements
        isFullPage
          ? "fixed inset-0 z-[100] min-h-screen rounded-none overflow-auto"
          : "min-h-[350px]",
        className,
      )}
    >
      {/* Grouped Action Buttons
        Added a backdrop blur and background so the buttons don't get lost in the component's UI 
      */}
      <div className="absolute top-3 right-4 z-[110] flex items-center gap-1.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
        {reTrigger && (
          <button
            onClick={changeKey}
            className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
            aria-label="Retrigger animation"
            title="Retrigger Animation"
            type="button"
          >
            <RotateCw size={18} />
          </button>
        )}

        {componentName && (
          <button
            onClick={handleNewPage}
            className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
            aria-label="Open in new page"
            title="Open in new tab"
            type="button"
          >
            <ExternalLink size={18} />
          </button>
        )}

        <button
          onClick={handleFullPage}
          className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
          aria-label={isFullPage ? "Exit full page" : "Toggle full page"}
          title={isFullPage ? "Exit full page" : "Toggle full page"}
          type="button"
        >
          {/* Swap icon based on state */}
          {isFullPage ? <Shrink size={18} /> : <Expand size={18} />}
        </button>
      </div>

      <div
        className={cn(
          "flex items-center justify-center w-full",
          isFullPage ? "h-full min-h-full overflow-auto p-12" : "h-full",
        )}
      >
        {reTrigger ? cloneElement(component, { key }) : component}
      </div>
    </div>
  );
}
