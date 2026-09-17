"use client";

import { Palette, Settings, TimerReset } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useThemeCustomizer } from "@/contexts/theme-customizer-context";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/custom/ui/sheet";
import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  useThemeContext,
} from "@/contexts/theme-context";
import {
  clearFontFamily,
  FONT_FAMILY_STORAGE_KEY,
} from "@/hooks/use-google-fonts";

import { DarkModeControl } from "./darkmode-control";
import { FontFamilyControl } from "./font-family-control";
import { FontSizeControl } from "./font-size-control";
import { ThemePresetSelector } from "./theme-preset-selector";
import { RadiusPicker } from "./radius-picker";

export function ThemeControl() {
  const { dir, setFontSize, setFontFamily } =
    useThemeContext();
  const { resetToDefaults } = useThemeCustomizer();
  const { setTheme } = useTheme();
  const pathname = usePathname();

  // The home page keeps its own fixed typography (see .font-site-sans), so the
  // customizer tab is hidden there along with the pages that host their own.
  if (
    pathname === "/" ||
    pathname === "/themes" ||
    pathname?.startsWith("/preview")
  ) {
    return null;
  }

  function resetThemeCustomization() {
    localStorage.removeItem("primaryColor");
    localStorage.removeItem("fontSize");
    localStorage.removeItem(FONT_FAMILY_STORAGE_KEY);

    const root = window.document.documentElement;
    root.style.fontSize = DEFAULT_FONT_SIZE + "%";
    clearFontFamily();

    resetToDefaults();
    setFontSize(DEFAULT_FONT_SIZE);
    setFontFamily(DEFAULT_FONT_FAMILY);
    setTheme("system");
  }

  return (
    <div
      /* bottom-right on phones so it doesn't cover content toolbars; edge tab at top-40 from sm up */
      className={`fixed bottom-24 top-auto sm:top-40 sm:bottom-auto ${dir === "rtl" ? "left-0" : "right-0"} z-40`}
    >
      <Sheet>
        <SheetTrigger asChild>
          <div
            className={`bg-primary text-primary-foreground hover:opacity-90 transition-all cursor-pointer rounded ${dir === "rtl" ? "rounded-l-none" : "rounded-r-none"} px-3 py-2 shadow-md`}
          >
            <Settings />
          </div>
        </SheetTrigger>

        {/* Added flex flex-col to ensure the footer button can push to the very bottom */}
        <SheetContent className="hide-scroll z-[101] overflow-y-auto flex flex-col justify-between">
          <div>
            <SheetHeader className="border-b pb-4">
              <SheetTitle>Customization</SheetTitle>
              <SheetDescription>
                Customize and preview in real time
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-8 px-4 py-6">
              <ThemePresetSelector />
              <RadiusPicker />
              <DarkModeControl />
              <FontSizeControl />
              <FontFamilyControl />
            </div>
          {/* Theme Customizer Link + Reset Button Footer */}
          <div className="mt-auto pt-4 pb-10 px-4 border-t border-border flex items-center justify-between gap-3">
            <Link
              href="/themes"
              className="flex-1 flex items-center justify-center gap-2 h-9 px-3 text-xs font-medium text-primary-foreground bg-primary hover:opacity-90 active:scale-[0.98] transition-all rounded-lg shadow-sm cursor-pointer"
            >
              <Palette className="w-4 h-4" />
              <span>Theme Customizer</span>
            </Link>
            <button
              onClick={resetThemeCustomization}
              className="flex items-center justify-center gap-1.5 h-9 px-3 text-xs font-medium text-muted-foreground hover:text-foreground bg-background hover:bg-accent border border-border transition-all rounded-lg shadow-sm cursor-pointer shrink-0"
            >
              <TimerReset className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        </SheetContent>
      </Sheet>
    </div>
  );
}
