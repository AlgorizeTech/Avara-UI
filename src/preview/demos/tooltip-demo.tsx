"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";
import { Heart, Plus, Settings } from "lucide-react";

export default function TooltipDemo({
  side = "top",
  align = "center",
  delay = 200,
}: {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delay?: number;
}) {
  return (
    <div className="w-full flex items-center justify-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 relative z-10">
      <TooltipProvider>
        {/* Main Demo Tooltip */}
        <Tooltip delayDuration={delay}>
          <TooltipTrigger>
            <div className="w-16 h-16 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:scale-105 transition-transform cursor-pointer shadow-sm">
              <Plus className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
            </div>
          </TooltipTrigger>
          <TooltipContent side={side} align={align}>
            <p>Create new project</p>
          </TooltipContent>
        </Tooltip>

        {/* Accessory Tooltips to show density handling */}
        <div className="absolute top-6 right-6 flex gap-2">
          <Tooltip delayDuration={delay}>
            <TooltipTrigger>
              <button className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8}>
              Add to favorites
            </TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={delay}>
            <TooltipTrigger>
              <button className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" sideOffset={8}>
              System preferences
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
