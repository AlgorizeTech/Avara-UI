"use client";

import { Settings, TimerReset } from "lucide-react";
import { useTheme } from "next-themes";

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
    <div className={`fixed top-40 ${dir === "rtl" ? "left-0" : "right-0"} z-40`}>
      <Sheet>
        <SheetTrigger asChild>
          <div
            className={`bg-primary cursor-pointer rounded ${dir === "rtl" ? "rounded-l-none" : "rounded-r-none"} px-3 py-2 text-white`}
          >
            <Settings />
          </div>
        </SheetTrigger>
        <SheetContent className="hide-scroll z-[101] overflow-y-auto">
          <SheetHeader className="border-b">
            <SheetTitle className="flex items-center gap-4">
              <span>Customization</span>
              <span
                className="relative cursor-pointer"
                onClick={resetThemeCustomization}
                aria-label="Reset customization"
              >
                <TimerReset />
                <span className="min-w-size-2 absolute top-0 -right-1 size-2 rounded-full bg-red-600" />
              </span>
            </SheetTitle>
            <SheetDescription>
              Customize and preview in real time
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-8 px-4">
            <PrimaryColorControl />
            <DarkModeControl />
            <FontSizeControl />
            <FontFamilyControl />
          </div>
          <span className="block w-full border-b" />
        </SheetContent>
      </Sheet>
    </div>
  );
}
