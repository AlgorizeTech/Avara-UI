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
import {
  AppWindow,
  Check,
  ClipboardPaste,
  Copy,
  Eye,
  EyeOff,
  FolderOpen,
  Info,
  Laptop,
  Maximize,
  Moon,
  Plus,
  Power,
  Redo2,
  Save,
  SaveAll,
  Scissors,
  Settings,
  Settings2,
  Sun,
  Undo2,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import React, { useState } from "react";

/** Every row carries one, so no row needs `inset` to fake the gutter. */
const icon = "w-4 h-4 mr-2 shrink-0";
/** Replaces the old "Active" text — a badge that can't wrap the row. */
const activeMark = "ml-auto w-4 h-4 shrink-0 text-indigo-500";

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
  example = "basic",
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
              <Plus className={icon} /> New Tab
            </MenubarItem>
            <MenubarItem>
              <AppWindow className={icon} /> New Window
            </MenubarItem>
            <MenubarItem>
              <FolderOpen className={icon} /> Open File…
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu value="edit">
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Undo2 className={icon} /> Undo
            </MenubarItem>
            <MenubarItem>
              <Redo2 className={icon} /> Redo
            </MenubarItem>
            <MenubarItem>
              <Scissors className={icon} /> Cut
            </MenubarItem>
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
              <Undo2 className={icon} /> Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Redo2 className={icon} /> Redo{" "}
              <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Scissors className={icon} /> Cut{" "}
              <MenubarShortcut>⌘X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <Copy className={icon} /> Copy <MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <ClipboardPaste className={icon} /> Paste{" "}
              <MenubarShortcut>⌘V</MenubarShortcut>
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
            <MenubarLabel>Theme Options</MenubarLabel>
            <MenubarItem onClick={() => setTheme("Light")}>
              <Sun className={icon} /> Light Mode
              {theme === "Light" && <Check className={activeMark} />}
            </MenubarItem>
            <MenubarItem onClick={() => setTheme("Dark")}>
              <Moon className={icon} /> Dark Mode
              {theme === "Dark" && <Check className={activeMark} />}
            </MenubarItem>
            <MenubarItem onClick={() => setTheme("System")}>
              <Laptop className={icon} /> System Default
              {theme === "System" && <Check className={activeMark} />}
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
            <MenubarItem>
              <Save className={icon} /> Save
            </MenubarItem>
            <MenubarItem disabled>
              <SaveAll className={icon} /> Save All
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-600 dark:focus:text-red-400">
              <Power className={icon} /> Quit Nexus{" "}
              <MenubarShortcut>⌘Q</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </BareBar>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px] relative z-10">
      {/* No overflow-hidden on the frame: it would crop any menu taller or
          wider than the window. The header rounds its own top corners instead. */}
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col h-[280px]">
        {/* Native OS-style Application Header */}
        <div className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 rounded-t-xl px-2 py-1 flex items-center justify-between">
          <Menubar className="border-none bg-transparent shadow-none w-full justify-start min-h-8 p-0">
            {/* 1. FILE MENU */}
            <MenubarMenu value="file">
              <MenubarTrigger>Nexus UI</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Info className={icon} /> About Nexus
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Settings className={icon} /> Preferences...{" "}
                  <MenubarShortcut>⌘,</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <EyeOff className={icon} /> Hide Nexus{" "}
                  <MenubarShortcut>⌘H</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <Users className={icon} /> Hide Others{" "}
                  <MenubarShortcut>⇧⌘H</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>
                  <Eye className={icon} /> Show All
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-600 dark:focus:text-red-400">
                  <Power className={icon} /> Quit Nexus{" "}
                  <MenubarShortcut>⌘Q</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            {/* 2. EDIT MENU */}
            <MenubarMenu value="edit">
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Undo2 className={icon} /> Undo{" "}
                  <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <Redo2 className={icon} /> Redo{" "}
                  <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Scissors className={icon} /> Cut{" "}
                  <MenubarShortcut>⌘X</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <Copy className={icon} /> Copy{" "}
                  <MenubarShortcut>⌘C</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  <ClipboardPaste className={icon} /> Paste{" "}
                  <MenubarShortcut>⌘V</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            {/* 3. VIEW (THEME) MENU */}
            <MenubarMenu value="view">
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                {/* Labels sit flush left; the rows carry the icon gutter. */}
                <MenubarLabel>Theme Options</MenubarLabel>
                <MenubarItem onClick={() => setTheme("Light")}>
                  <Sun className={icon} /> Light Mode
                  {theme === "Light" && <Check className={activeMark} />}
                </MenubarItem>
                <MenubarItem onClick={() => setTheme("Dark")}>
                  <Moon className={icon} /> Dark Mode
                  {theme === "Dark" && <Check className={activeMark} />}
                </MenubarItem>
                <MenubarItem onClick={() => setTheme("System")}>
                  <Laptop className={icon} /> System Default
                  {theme === "System" && <Check className={activeMark} />}
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Maximize className={icon} /> Toggle Fullscreen{" "}
                  <MenubarShortcut>F11</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            {/* 4. PROFILES MENU */}
            <MenubarMenu value="profiles">
              <MenubarTrigger>Profiles</MenubarTrigger>
              <MenubarContent align="start">
                <MenubarLabel>Active Account</MenubarLabel>
                <MenubarItem>
                  <User className={icon} /> Andy Bernard
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <UserPlus className={icon} /> Add Account...
                </MenubarItem>
                <MenubarItem>
                  <Settings2 className={icon} /> Manage Profiles
                </MenubarItem>
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
