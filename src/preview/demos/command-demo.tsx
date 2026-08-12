"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/custom/blocks/CommandBlock";
import { toast, Toaster } from "@/components/custom/blocks/SonnerBlock";
import {
  Calculator,
  Calendar,
  CreditCard,
  LogOut,
  Settings,
  Smile,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function CommandDemo({
  layout = "inline",
  open = false,
  shouldFilter = true,
}: {
  layout?: "inline" | "dialog" | "simple";
  open?: boolean;
  /** false turns off the built-in filtering (you filter the items yourself). */
  shouldFilter?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(open);

  // Keyboard shortcut effect for Dialog
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleAction = (val: string) => {
    toast("Action triggered", { description: "You selected: " + val });
    setIsOpen(false);
  };

  const SharedCommandContent = () => (
    <>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No matching records found.</CommandEmpty>

        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={handleAction}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem onSelect={handleAction}>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem onSelect={handleAction}>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          <CommandItem onSelect={handleAction}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={handleAction}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={handleAction}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Danger Zone">
          <CommandItem
            className="text-red-500 data-[selected=true]:text-red-600 data-[selected=true]:bg-red-50 dark:data-[selected=true]:bg-red-950"
            onSelect={handleAction}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <CommandShortcut>⇧⌘Q</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );

  const SimpleCommandContent = () => (
    <>
      <CommandInput placeholder="Search actions..." />
      <CommandList>
        <CommandEmpty>No matching records found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={handleAction}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem onSelect={handleAction}>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem onSelect={handleAction}>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="w-full flex items-center justify-center min-h-[450px] relative z-10 overflow-hidden">
        {layout === "simple" ? (
          <div className="w-full max-w-[450px]">
            <Command shouldFilter={shouldFilter}>
              <SimpleCommandContent />
            </Command>
          </div>
        ) : layout === "inline" ? (
          <div className="w-full max-w-[450px]">
            <Command shouldFilter={shouldFilter}>
              <SharedCommandContent />
            </Command>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <p className="text-sm text-zinc-500 mb-4">
              Press{" "}
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-1.5 font-mono text-[10px] font-medium text-zinc-600 dark:text-zinc-400 opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>{" "}
              or click the button to open the command menu.
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-md shadow-sm hover:opacity-90 transition-opacity"
            >
              Open Command Dialog
            </button>
          </div>
        )}

        <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
          <SharedCommandContent />
        </CommandDialog>
      </div>
    </>
  );
}
