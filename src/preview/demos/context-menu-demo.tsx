"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/custom/blocks/ContextMenuBlock";
import { toast, Toaster } from "@/components/custom/blocks/SonnerBlock";
import {
  Copy,
  Download,
  FileEdit,
  Scissors,
  Share2,
  Trash,
} from "lucide-react";

export default function ContextMenuDemo() {
  const handleAction = (action: string) => {
    toast("Action triggered", { description: "You clicked on " + action });
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="w-full flex items-center justify-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#f8fafc] dark:bg-[#050505] p-6 relative z-10 overflow-hidden">
        <ContextMenu>
          <ContextMenuTrigger className="w-full max-w-lg h-[250px] border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-2xl flex flex-col items-center justify-center transition-colors hover:border-indigo-400 dark:hover:border-indigo-500/50 cursor-context-menu">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Right-Click Area
            </h3>
            <p className="text-sm text-zinc-500 mt-1">
              Right click inside this dashed box to open the context menu.
            </p>
          </ContextMenuTrigger>

          <ContextMenuContent className="w-64">
            <ContextMenuLabel>Document Actions</ContextMenuLabel>
            <ContextMenuItem onSelect={() => handleAction("Edit")}>
              <FileEdit className="w-4 h-4 mr-2" />
              Edit File
              <ContextMenuShortcut>⌘E</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleAction("Download")}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
              <ContextMenuShortcut>⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem onClick={() => handleAction("Share")}>
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </ContextMenuItem>

            <ContextMenuSeparator />

            <ContextMenuLabel>Clipboard</ContextMenuLabel>
            <ContextMenuItem onClick={() => handleAction("Copy")}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
              <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem disabled>
              <Scissors className="w-4 h-4 mr-2" />
              Cut
              <ContextMenuShortcut>⌘X</ContextMenuShortcut>
            </ContextMenuItem>

            <ContextMenuSeparator />

            <ContextMenuItem
              onClick={() => handleAction("Delete")}
              className="text-red-600 focus:bg-red-50 dark:focus:bg-red-950 focus:text-red-700"
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
              <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </>
  );
}
