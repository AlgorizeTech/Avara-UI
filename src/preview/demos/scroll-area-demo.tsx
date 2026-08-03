"use client";

import {
  ScrollAreaBlock,
  ScrollAreaVariant,
} from "@/components/custom/blocks/ScrollAreaBlock";
import { FileText, Image as ImageIcon, Tag } from "lucide-react";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export default function ScrollAreaDemo({
  variant = "default",
  orientation = "vertical",
  hideTrack = false,
  autoHide = false,
  color = "primary",
}: {
  variant?: ScrollAreaVariant;
  orientation?: "vertical" | "horizontal" | "both";
  hideTrack?: boolean;
  autoHide?: boolean;
  color?: string;
}) {
  return (
    <div
      className={`w-full flex items-center justify-center min-h-[450px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 ${variant === "glass" ? "bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" : "bg-zinc-50 dark:bg-[#050505] p-6 relative z-10"}`}
    >
      <ScrollAreaBlock
        key={`${variant}-${color}-${orientation}-${hideTrack}-${autoHide}`}
        variant={variant}
        color={color}
        orientation={orientation}
        hideTrack={hideTrack}
        autoHide={autoHide}
        className={`rounded-2xl border ${variant === "glass" ? "bg-white/10 dark:bg-black/20 backdrop-blur-xl border-white/20 dark:border-white/10 shadow-2xl" : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm"} ${orientation === "horizontal" ? "w-full max-w-2xl whitespace-nowrap p-6" : orientation === "both" ? "h-[300px] w-full max-w-sm p-6 whitespace-nowrap" : "h-[350px] w-full max-w-sm p-6"}`}
      >
        {/* Conditional Content based on Orientation to showcase properly */}
        {orientation === "vertical" && (
          <div className="pr-4">
            <h4
              className={`mb-4 text-sm font-bold leading-none ${variant === "glass" ? "text-white" : "text-zinc-900 dark:text-white"}`}
            >
              Tags
            </h4>
            {tags.map((tag) => (
              <div key={tag} className="text-sm">
                <div
                  className={`py-3 flex items-center gap-2 ${variant === "glass" ? "text-zinc-100" : "text-zinc-600 dark:text-zinc-400"}`}
                >
                  <Tag className="w-4 h-4 opacity-50" />
                  {tag}
                </div>
                <div
                  className={`my-1 border-t ${variant === "glass" ? "border-white/10" : "border-zinc-100 dark:border-zinc-800/50"}`}
                />
              </div>
            ))}
          </div>
        )}

        {orientation === "horizontal" && (
          <div className="flex w-max space-x-4 pb-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className={`w-[150px] shrink-0 rounded-xl overflow-hidden ${variant === "glass" ? "bg-white/20 border border-white/20" : "bg-zinc-100 dark:bg-zinc-900"}`}
              >
                <div
                  className={`h-[100px] flex items-center justify-center ${variant === "glass" ? "bg-white/10" : "bg-zinc-200 dark:bg-zinc-800"}`}
                >
                  <ImageIcon
                    className={`w-8 h-8 ${variant === "glass" ? "text-white/50" : "text-zinc-400 dark:text-zinc-600"}`}
                  />
                </div>
                <div
                  className={`p-4 text-sm font-bold ${variant === "glass" ? "text-white" : "text-zinc-900 dark:text-white"}`}
                >
                  Artwork {i + 1}
                </div>
              </div>
            ))}
          </div>
        )}

        {orientation === "both" && (
          <div className="flex w-max space-x-6 pb-4 pr-4">
            {Array.from({ length: 10 }).map((_, col) => (
              <div key={col} className="flex flex-col gap-4">
                {Array.from({ length: 10 }).map((_, row) => (
                  <div
                    key={row}
                    className={`w-[120px] p-4 rounded-xl flex items-center gap-2 ${variant === "glass" ? "bg-white/20 border border-white/20 text-white" : "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"}`}
                  >
                    <FileText className="w-4 h-4 opacity-50" />
                    Doc {col}-{row}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </ScrollAreaBlock>
    </div>
  );
}
