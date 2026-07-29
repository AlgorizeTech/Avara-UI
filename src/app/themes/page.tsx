"use client";

/**
 * /themes — Theme Customizer Page
 *
 * Split layout: customizer sidebar (left) + live preview (right).
 * Wrapped in ThemeCustomizerProvider for local state management.
 */

import { ThemeCustomizerProvider } from "@/contexts/theme-customizer-context";
import { ThemeCustomizerSidebar } from "@/components/theme-control/theme-customizer-sidebar";
import { ThemePreview } from "@/components/theme-control/theme-preview";

export default function ThemesPage() {
  return (
    <ThemeCustomizerProvider>
      <div className="flex min-h-[calc(100vh-52px)]">
        {/* Customizer Sidebar — sticky left panel */}
        <aside className="hidden lg:flex lg:w-[380px] xl:w-[400px] flex-col border-r border-border bg-background/50 backdrop-blur-sm sticky top-[52px] h-[calc(100vh-52px)] shrink-0">
          <ThemeCustomizerSidebar />
        </aside>

        {/* Mobile Sidebar — sheet/drawer on smaller screens */}
        <MobileSidebar />

        {/* Live Preview — scrollable right panel */}
        <main className="flex-1 min-w-0 bg-background">
          <ThemePreview />
        </main>
      </div>
    </ThemeCustomizerProvider>
  );
}

// ─── Mobile Sidebar Sheet ────────────────────────────────────────

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";

function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating trigger button (mobile/tablet only) */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 lg:hidden flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg hover:opacity-90 transition-all active:scale-95"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Customize
      </button>

      {/* Overlay + Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 z-50 h-full w-[340px] bg-background border-r border-border shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between px-5 h-14 border-b border-border">
                <span className="font-semibold text-sm text-foreground">
                  Theme Customizer
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="h-[calc(100%-56px)]">
                <ThemeCustomizerSidebar />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
