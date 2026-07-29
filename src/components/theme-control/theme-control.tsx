"use client";

import { Palette, Settings, TimerReset } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

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
  DEFAULT_PRIMARY_COLOR,
  useThemeContext,
} from "@/contexts/theme-context";

import { DarkModeControl } from "./darkmode-control";
import { FontFamilyControl } from "./font-family-control";
import { FontSizeControl } from "./font-size-control";
import { PrimaryColorControl } from "./primary-color-control";

export function ThemeControl() {
  const { dir, setPrimaryColor, setFontSize, setFontFamily } =
    useThemeContext();
  const { setTheme } = useTheme();

  function resetThemeCustomization() {
    localStorage.removeItem("primaryColor");
    localStorage.removeItem("fontSize");
    localStorage.removeItem("fontFamily");

    const root = window.document.documentElement;
    root.style.setProperty("--primary", DEFAULT_PRIMARY_COLOR);
    root.style.fontSize = DEFAULT_FONT_SIZE + "%";
    document.body.style.fontFamily = "";

    const dynamicFontLink = document.getElementById("dynamic-google-font");
    if (dynamicFontLink) dynamicFontLink.remove();

    setPrimaryColor(DEFAULT_PRIMARY_COLOR);
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
            className={`bg-zinc-900 dark:bg-zinc-100 cursor-pointer rounded ${dir === "rtl" ? "rounded-l-none" : "rounded-r-none"} px-3 py-2 text-white dark:text-zinc-900 shadow-md`}
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
              <PrimaryColorControl />
              <DarkModeControl />
              <FontSizeControl />
              <FontFamilyControl />
            </div>
          {/* Full Customizer Link + Reset Button Footer */}
          <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
            <Link
              href="/themes"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-semibold text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 hover:opacity-90 active:scale-[0.98] transition-all rounded-lg shadow-sm"
            >
              <Palette className="w-4 h-4" />
              Full Theme Customizer
            </Link>
            <div className="flex justify-end">
              <button
                onClick={resetThemeCustomization}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-95 transition-all rounded-lg border border-zinc-200/80 dark:border-zinc-700/80 shadow-sm cursor-pointer"
              >
                <TimerReset className="w-4 h-4" />
                Reset Defaults
              </button>
            </div>
          </div>
          </div>

        </SheetContent>
      </Sheet>
    </div>
  );
}
