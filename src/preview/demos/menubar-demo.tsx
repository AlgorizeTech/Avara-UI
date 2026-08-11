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
import { Laptop, Moon, Sun, User } from "lucide-react";
import React, { useState } from "react";

/** A bare bar on a plain surface — used by the focused examples. */
function BareBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex items-start justify-center min-h-[400px] pt-10 relative z-10">
      <Menubar>{children}</Menubar>
    </div>
  );
}

export default function MenubarDemo({
  theme: initialTheme = "System",
  example = "app",
}: {
  theme?: string;
  /** "app" is the classic OS-window frame; the others isolate one feature. */
  example?: "app" | "basic" | "shortcuts" | "icons" | "disabled";
}) {
  const [theme, setTheme] = useState(initialTheme);

  if (example === "basic") {
    return (
      <BareBar>
        <MenubarMenu value="file">
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => console.log("New Tab")}>
              New Tab
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarItem>Open File…</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu value="edit">
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
            <MenubarItem>Redo</MenubarItem>
            <MenubarItem>Cut</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </BareBar>
    );
  }

  if (example === "shortcuts") {
    return (
      <BareBar>
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
      </BareBar>
    );
  }

  if (example === "icons") {
    return (
      <BareBar>
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
          </MenubarContent>
        </MenubarMenu>
      </BareBar>
    );
  }

  if (example === "disabled") {
    return (
      <BareBar>
        <MenubarMenu value="file">
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Save</MenubarItem>
            <MenubarItem disabled>Save All</MenubarItem>
            <MenubarSeparator />
            <MenubarItem className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-600 dark:focus:text-red-400">
              Quit Nexus <MenubarShortcut>⌘Q</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </BareBar>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px] relative z-10">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[280px]">
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
  );
}
