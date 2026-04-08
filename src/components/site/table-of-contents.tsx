"use client";

import { useTableOfContents } from "@/hooks/use-table-of-contents";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export const TableOfContents: React.FC = () => {
  const { toc, activeId, scrollToHeading } = useTableOfContents();
  const [scrollProgress, setScrollProgress] = useState(0);

  // --- Toggle State (Default Open) ---
  const [isOpen, setIsOpen] = useState(true);

  // --- Smooth Scroll Tracker ---
  useEffect(() => {
    const updateProgress = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const windowHeight = scrollHeight - clientHeight;
      const progress =
        windowHeight > 0 ? (currentScrollY / windowHeight) * 100 : 0;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  if (toc.length === 0 || toc.every((item) => !item.text.trim())) {
    return null;
  }

  // --- Style Helper based on progress ---
  const getProgressStyles = (val: number) => {
    if (val <= 25) {
      return {
        background: `linear-gradient(90deg, #ef4444 0%, #f59e0b ${val * 4}%, #ef4444 100%)`,
        shadow: "0 0 8px rgba(239, 68, 68, 0.4)",
        color: "#ef4444",
        bgColor: "rgba(239, 68, 68, 0.1)",
        borderColor: "1px solid rgba(239, 68, 68, 0.2)",
      };
    } else if (val <= 50) {
      return {
        background: `linear-gradient(90deg, #f59e0b 0%, #f97316 ${(val - 25) * 4}%, #f59e0b 100%)`,
        shadow: "0 0 8px rgba(245, 158, 11, 0.4)",
        color: "#f59e0b",
        bgColor: "rgba(245, 158, 11, 0.1)",
        borderColor: "1px solid rgba(245, 158, 11, 0.2)",
      };
    } else if (val <= 75) {
      return {
        background: `linear-gradient(90deg, #f97316 0%, #84cc16 ${(val - 50) * 4}%, #f97316 100%)`,
        shadow: "0 0 8px rgba(249, 115, 22, 0.4)",
        color: "#f97316",
        bgColor: "rgba(249, 115, 22, 0.1)",
        borderColor: "1px solid rgba(249, 115, 22, 0.2)",
      };
    } else {
      return {
        background: `linear-gradient(90deg, #84cc16 0%, #22c55e ${(val - 75) * 4}%, #22c55e 100%)`,
        shadow: "0 0 8px rgba(34, 197, 94, 0.4)",
        color: "#22c55e",
        bgColor: "rgba(34, 197, 94, 0.1)",
        borderColor: "1px solid rgba(34, 197, 94, 0.2)",
      };
    }
  };

  const dynamicStyles = getProgressStyles(scrollProgress);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-17 -right-13 z-50 flex items-center justify-center w-12 h-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="Toggle Table of Contents"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
        ) : (
          <Menu className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
        )}
      </button>

      {/* Sliding Table of Contents Drawer
        Removed the backdrop overlay so the main page remains 100% interactive!
      */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-[57px] z-40 w-64 h-[calc(100dvh-57px)] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex-shrink-0"
      >
        <div className="h-full py-8 px-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="space-y-6">
            {/* Table of Contents */}
            <nav
              className="relative"
              role="navigation"
              aria-label="Table of contents"
            >
              <div className="space-y-3">
                {toc.map((item) => {
                  const isActive = item.id === activeId;
                  const indentLevel = item.level - 1;
                  const leftOffset = indentLevel * 16;

                  return (
                    <div
                      key={item.id}
                      className="relative flex items-start"
                      style={{ marginLeft: `${leftOffset}px` }}
                    >
                      <button
                        onClick={() => scrollToHeading(item.id)}
                        className={cn(
                          "text-left transition-all duration-200 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer",
                          item.level === 1
                            ? "text-[0.80rem] font-medium"
                            : item.level === 2
                              ? "text-[0.8rem]"
                              : "text-[0.75rem]",
                          isActive
                            ? "text-blue-600 dark:text-blue-400 font-medium"
                            : "text-zinc-600 dark:text-zinc-400",
                        )}
                      >
                        {item.text}
                      </button>
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* Reading Progress */}
            <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="relative">
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 shadow-inner">
                  <motion.div
                    className="h-2 rounded-full relative overflow-hidden shadow-lg"
                    style={{
                      background: dynamicStyles.background,
                      boxShadow: dynamicStyles.shadow,
                    }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${scrollProgress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="absolute top-0 -mt-6 text-xs font-medium px-2 py-1 rounded-md shadow-sm"
                  style={{
                    transform: "translateX(-50%)",
                    background: dynamicStyles.bgColor,
                    color: dynamicStyles.color,
                    border: dynamicStyles.borderColor,
                  }}
                  animate={{ left: `${scrollProgress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                >
                  {Math.round(scrollProgress)}%
                </motion.div>
              </div>

              <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>Start</span>
                <span>End</span>
              </div>
            </div>

            {/* Glassy Navigation Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md border border-white/20 dark:border-zinc-700/50 rounded-lg hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to top</span>
              </button>
              <button
                onClick={() =>
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  })
                }
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md border border-white/20 dark:border-zinc-700/50 rounded-lg hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                <ArrowDown className="w-3.5 h-3.5" />
                <span>Go to bottom</span>
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
