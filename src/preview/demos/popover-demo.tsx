"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/custom/blocks/PopoverBlock";
import { Settings2, User } from "lucide-react";

export default function PopoverDemo({
  side = "bottom",
  align = "center",
}: {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}) {
  return (
    <div className="w-full flex items-center justify-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 relative z-10 overflow-hidden">
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:scale-105 transition-transform cursor-pointer shadow-sm text-sm font-semibold">
            <Settings2 className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            Configure Settings
          </div>
        </PopoverTrigger>

        <PopoverContent side={side} align={align}>
          <div className="space-y-4">
            <div className="space-y-1 text-sm border-b border-zinc-100 dark:border-zinc-800/50 pb-3">
              <h4 className="font-bold text-zinc-900 dark:text-white">
                Dimensions
              </h4>
              <p className="text-zinc-500 text-xs">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="grid gap-3">
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <label
                  htmlFor="width"
                  className="text-zinc-600 dark:text-zinc-400 font-medium"
                >
                  Width
                </label>
                <input
                  id="width"
                  defaultValue="100%"
                  className="col-span-2 h-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <label
                  htmlFor="height"
                  className="text-zinc-600 dark:text-zinc-400 font-medium"
                >
                  Height
                </label>
                <input
                  id="height"
                  defaultValue="25px"
                  className="col-span-2 h-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <label
                  htmlFor="max"
                  className="text-zinc-600 dark:text-zinc-400 font-medium"
                >
                  Max. Width
                </label>
                <input
                  id="max"
                  defaultValue="none"
                  className="col-span-2 h-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Secondary Popover for User Profile Demo */}
      <div className="absolute top-6 right-6">
        <Popover>
          <PopoverTrigger>
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 flex items-center justify-center cursor-pointer hover:bg-indigo-200 transition-colors">
              <User className="w-5 h-5" />
            </div>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end" className="w-64">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800/50 pb-3">
                <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Andy Bernard</span>
                  <span className="text-xs text-zinc-500">
                    andy@dundermifflin.com
                  </span>
                </div>
              </div>
              <button className="text-left text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
                View Profile
              </button>
              <button className="text-left text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
                Billing Settings
              </button>
              <button className="text-left text-sm text-red-600 hover:text-red-700 mt-2">
                Log out
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
