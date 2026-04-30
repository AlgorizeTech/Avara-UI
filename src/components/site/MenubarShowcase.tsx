"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/custom/blocks/MenubarBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { Laptop, Moon, Sun, User } from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const MENUBAR_ENGINE_CODE_TS = `"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MenubarContextType { activeMenu: string | null; setActiveMenu: (value: string | null) => void; }
const MenubarContext = createContext<MenubarContextType | undefined>(undefined);

interface MenuContextType { value: string; }
const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function Menubar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menubarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => { if (menubarRef.current && !menubarRef.current.contains(e.target as Node)) setActiveMenu(null); };
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveMenu(null); };
    if (activeMenu) { document.addEventListener("mousedown", handleClickOutside); document.addEventListener("keydown", handleEscape); }
    return () => { document.removeEventListener("mousedown", handleClickOutside); document.removeEventListener("keydown", handleEscape); };
  }, [activeMenu]);

  return (
    <MenubarContext.Provider value={{ activeMenu, setActiveMenu }}>
      <div ref={menubarRef} className={cn("flex h-10 items-center space-x-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-1 shadow-sm", className)} {...props}>{children}</div>
    </MenubarContext.Provider>
  );
}

export function MenubarMenu({ value, children }: { value: string; children: React.ReactNode }) {
  return <MenuContext.Provider value={{ value }}><div className="relative inline-block text-left">{children}</div></MenuContext.Provider>;
}

export function MenubarTrigger({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const rootContext = useContext(MenubarContext);
  const menuContext = useContext(MenuContext);
  if (!rootContext || !menuContext) throw new Error("MenubarTrigger must be within MenubarMenu");

  const isOpen = rootContext.activeMenu === menuContext.value;
  return (
    <button
      type="button"
      onClick={() => rootContext.setActiveMenu(isOpen ? null : menuContext.value)}
      onMouseEnter={() => { if (rootContext.activeMenu !== null && rootContext.activeMenu !== menuContext.value) rootContext.setActiveMenu(menuContext.value); }}
      className={cn("flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none transition-colors", isOpen ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50" : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50", className)}
      {...props}
    >{children}</button>
  );
}

export function MenubarContent({ className, align = "start", children, ...props }: React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" | "center" }) {
  const rootContext = useContext(MenubarContext);
  const menuContext = useContext(MenuContext);
  if (rootContext?.activeMenu !== menuContext?.value) return null;

  return (
    <div className={cn("absolute z-50 mt-1 min-w-[12rem] overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-1 shadow-md animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-150", align === "start" && "left-0", align === "end" && "right-0", align === "center" && "left-1/2 -translate-x-1/2", className)} {...props}>
      {children}
    </div>
  );
}

export function MenubarItem({ className, inset, children, onClick, disabled, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { inset?: boolean }) {
  const rootContext = useContext(MenubarContext);
  return (
    <button
      type="button" disabled={disabled}
      onClick={(e) => { if (onClick) onClick(e); rootContext?.setActiveMenu(null); }}
      className={cn("relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors", inset && "pl-8", disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400", className)}
      {...props}
    >{children}</button>
  );
}

export function MenubarSeparator({ className }: { className?: string }) { return <div className={cn("-mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-800", className)} />; }
export function MenubarShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) { return <span className={cn("ml-auto text-xs tracking-widest text-zinc-500 dark:text-zinc-400", className)} {...props} />; }
export function MenubarLabel({ className, inset, ...props }: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) { return <div className={cn("px-2 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400", inset && "pl-8", className)} {...props} />; }
`;

// --- JAVASCRIPT ENGINE CODE ---
const MENUBAR_ENGINE_CODE_JS = MENUBAR_ENGINE_CODE_TS.replace(
  /: React\.[A-Za-z0-9_<>]+(& \{[^}]+\})?/g,
  "",
)
  .replace(/<MenubarContextType \| undefined>/g, "")
  .replace(/<MenuContextType \| undefined>/g, "")
  .replace(/interface [A-Za-z0-9_]+ \{[^}]+\}/g, "");

export function MenubarShowcase() {
  const [theme, setTheme] = useState("System");

  const generateUsageCode = () => {
    return `import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
} from "@/components/custom/blocks/MenubarBlock";

export default function AppNavigation() {
  return (
    <Menubar>
      <MenubarMenu value="file">
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Print <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      {/* ... Add more menus ... */}
    </Menubar>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      <ComponentPreview
        name="MenubarBlock"
        tsCode={MENUBAR_ENGINE_CODE_TS}
        jsCode={MENUBAR_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex flex-col items-center justify-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#050505] p-6 sm:p-12 relative z-10">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-[280px]">
            {/* Native OS-style Application Header */}
            <div className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 px-2 py-1 flex items-center justify-between">
              <Menubar className="border-none bg-transparent shadow-none w-full justify-start h-8">
                {/* 1. FILE MENU */}
                <MenubarMenu value="file">
                  <MenubarTrigger className="font-semibold text-zinc-900 dark:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800">
                    Nexus UI
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>About Nexus</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Preferences... <MenubarShortcut>⌘,</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Hide Nexus <MenubarShortcut>⌘H</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Hide Others <MenubarShortcut>⇧⌘H</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem disabled>Show All</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-600 dark:focus:text-red-400">
                      Quit Nexus <MenubarShortcut>⌘Q</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>

                {/* 2. EDIT MENU */}
                <MenubarMenu value="edit">
                  <MenubarTrigger>Edit</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Cut <MenubarShortcut>⌘X</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Copy <MenubarShortcut>⌘C</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Paste <MenubarShortcut>⌘V</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>

                {/* 3. VIEW (THEME) MENU */}
                <MenubarMenu value="view">
                  <MenubarTrigger>View</MenubarTrigger>
                  <MenubarContent>
                    <MenubarLabel inset>Theme Options</MenubarLabel>
                    <MenubarItem inset onClick={() => setTheme("Light")}>
                      <Sun className="w-4 h-4 mr-2" /> Light Mode
                      {theme === "Light" && (
                        <MenubarShortcut className="text-indigo-500">
                          Active
                        </MenubarShortcut>
                      )}
                    </MenubarItem>
                    <MenubarItem inset onClick={() => setTheme("Dark")}>
                      <Moon className="w-4 h-4 mr-2" /> Dark Mode
                      {theme === "Dark" && (
                        <MenubarShortcut className="text-indigo-500">
                          Active
                        </MenubarShortcut>
                      )}
                    </MenubarItem>
                    <MenubarItem inset onClick={() => setTheme("System")}>
                      <Laptop className="w-4 h-4 mr-2" /> System Default
                      {theme === "System" && (
                        <MenubarShortcut className="text-indigo-500">
                          Active
                        </MenubarShortcut>
                      )}
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>
                      Toggle Fullscreen <MenubarShortcut>F11</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>

                {/* 4. PROFILES MENU */}
                <MenubarMenu value="profiles">
                  <MenubarTrigger>Profiles</MenubarTrigger>
                  <MenubarContent align="start">
                    <MenubarLabel>Active Account</MenubarLabel>
                    <MenubarItem>
                      <User className="w-4 h-4 mr-2" /> Andy Bernard
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Add Account...</MenubarItem>
                    <MenubarItem>Manage Profiles</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>

            {/* Fake App Body */}
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 opacity-50">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl mb-4 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-sm">
                <Laptop className="w-8 h-8 text-zinc-400" />
              </div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Application Canvas
              </h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-[250px]">
                Click the menus at the top to test the interaction states and
                cross-menu hover switching.
              </p>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
