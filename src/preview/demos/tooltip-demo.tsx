"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";
import { Heart, Plus, Settings } from "lucide-react";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";

const TILE =
  "w-16 h-16 flex items-center justify-center bg-muted border border-border rounded-2xl hover:scale-105 transition-transform cursor-pointer shadow-sm text-sm font-medium text-foreground/80";

export default function TooltipDemo({
  side = "top",
  align = "center",
  delay = 200,
  example = "all",
  sideOffset,
}: {
  side?: Side;
  align?: Align;
  delay?: number;
  /** "all" is the classic layout; the others isolate one aspect of the API. */
  example?: "all" | "single" | "sides" | "align" | "delay" | "rich";
  /** Gap in px between trigger and bubble (single example only). */
  sideOffset?: number;
}) {
  if (example !== "all") {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px] relative z-10">
        <TooltipProvider>
          {example === "single" && (
            <Tooltip delayDuration={delay}>
              <TooltipTrigger>
                <div className={TILE}>
                  <Plus className="w-6 h-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent side={side} align={align} sideOffset={sideOffset}>
                <p>Create new project</p>
              </TooltipContent>
            </Tooltip>
          )}

          {example === "sides" && (
            <div className="flex flex-wrap items-center justify-center gap-6">
              {(["top", "right", "bottom", "left"] as Side[]).map((s) => (
                <Tooltip key={s} delayDuration={delay}>
                  <TooltipTrigger>
                    <div className={TILE}>{s}</div>
                  </TooltipTrigger>
                  <TooltipContent side={s}>Side: {s}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          )}

          {example === "align" && (
            <div className="flex flex-col items-center justify-center gap-6">
              {(["start", "center", "end"] as Align[]).map((a) => (
                <Tooltip key={a} delayDuration={delay}>
                  <TooltipTrigger>
                    <div className="w-56 h-12 flex items-center justify-center bg-muted border border-border rounded-xl hover:scale-[1.02] transition-transform cursor-pointer text-sm font-medium text-foreground/80">
                      align=&quot;{a}&quot;
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align={a}>
                    Aligned {a}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          )}

          {example === "delay" && (
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <div className={TILE}>0ms</div>
                </TooltipTrigger>
                <TooltipContent side="top">Opens instantly</TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={700}>
                <TooltipTrigger>
                  <div className={TILE}>700ms</div>
                </TooltipTrigger>
                <TooltipContent side="top">Waits 700ms</TooltipContent>
              </Tooltip>
            </div>
          )}

          {example === "rich" && (
            <Tooltip delayDuration={delay}>
              <TooltipTrigger>
                <button className="p-3 text-muted-foreground hover:bg-muted rounded-full transition-colors">
                  <Settings className="w-6 h-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[220px] p-3">
                <p className="font-semibold mb-1">System preferences</p>
                <p className="opacity-80">
                  Theme, notifications and keyboard shortcuts live here.
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[400px] relative z-10">
      <TooltipProvider>
        {/* Main Demo Tooltip */}
        <Tooltip delayDuration={delay}>
          <TooltipTrigger>
            <div className="w-16 h-16 flex items-center justify-center bg-muted border border-border rounded-2xl hover:scale-105 transition-transform cursor-pointer shadow-sm">
              <Plus className="w-6 h-6 text-foreground/80" />
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
              <button className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8}>
              Add to favorites
            </TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={delay}>
            <TooltipTrigger>
              <button className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
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
