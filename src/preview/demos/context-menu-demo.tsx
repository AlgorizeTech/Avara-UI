"use client";

import {
  ContextMenu,
  ContextMenuColor,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/custom/blocks/ContextMenuBlock";
import { Toaster } from "@/components/custom/blocks/SonnerBlock";
import { toast } from "@/components/custom/blocks/sonner-store";
import {
  Copy,
  Download,
  FileEdit,
  Scissors,
  Share2,
  Trash,
} from "lucide-react";

const TRIGGER_CLASS =
  "w-full max-w-[280px] sm:max-w-lg min-h-[160px] sm:min-h-[220px] border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-2xl flex flex-col items-center justify-center p-5 sm:p-8 text-center cursor-pointer";

const TriggerBox = () => (
  <div className="flex flex-col items-center justify-center w-full px-4">
    <h3 className="font-semibold text-xs sm:text-base text-zinc-900 dark:text-zinc-100">
      Click / Right-Click / Touch Area
    </h3>
    <p className="text-[11px] sm:text-sm text-zinc-500 mt-1.5 leading-relaxed">
      Click or right-click (long-press on mobile) inside this box to open the
      context menu.
    </p>
  </div>
);

export default function ContextMenuDemo({
  example = "full",
  color = "primary",
}: {
  /** "full" is the classic menu; the others isolate one part of the API. */
  example?: "full" | "basic" | "inset";
  color?: ContextMenuColor;
}) {
  const handleAction = (action: string) => {
    toast("Action triggered", { description: "You clicked on " + action });
  };

  if (example !== "full") {
    return (
      <>
        <Toaster position="bottom-right" />
        <div className="w-full flex items-center justify-center min-h-[260px] sm:min-h-[400px] relative z-10 overflow-hidden">
          <ContextMenu color={color}>
            <ContextMenuTrigger className={TRIGGER_CLASS}>
              <TriggerBox />
            </ContextMenuTrigger>

            {example === "basic" ? (
              <ContextMenuContent className="w-48 sm:w-64">
                <ContextMenuItem onClick={() => handleAction("Edit")}>
                  Edit File
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction("Duplicate")}>
                  Duplicate
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleAction("Rename")}>
                  Rename
                </ContextMenuItem>
              </ContextMenuContent>
            ) : (
              <ContextMenuContent className="w-48 sm:w-64">
                <ContextMenuLabel inset>View</ContextMenuLabel>
                <ContextMenuItem inset onClick={() => handleAction("List")}>
                  List
                </ContextMenuItem>
                <ContextMenuItem inset onClick={() => handleAction("Grid")}>
                  Grid
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => handleAction("Download")}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </ContextMenuItem>
              </ContextMenuContent>
            )}
          </ContextMenu>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="w-full flex items-center justify-center min-h-[260px] sm:min-h-[400px] relative z-10 overflow-hidden">
        <ContextMenu color={color}>
          <ContextMenuTrigger className={TRIGGER_CLASS}>
            <TriggerBox />
          </ContextMenuTrigger>

          <ContextMenuContent className="w-48 sm:w-64">
            <ContextMenuLabel>Document Actions</ContextMenuLabel>
            <ContextMenuItem onClick={() => handleAction("Edit")}>
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
