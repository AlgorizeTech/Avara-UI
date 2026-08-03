"use client";

import { ItemBlock, ItemVariant } from "@/components/custom/blocks/ItemBlock";
import { MoreVertical, Settings } from "lucide-react";

export default function ItemDemo({
  variant = "bordered",
  showMedia = true,
  showDescription = true,
  showActions = true,
  isClickable = false,
}: {
  variant?: ItemVariant;
  showMedia?: boolean;
  showDescription?: boolean;
  showActions?: boolean;
  isClickable?: boolean;
}) {
  // Mock Components for the Showcase
  const MockMedia = () => (
    <div
      className={`flex items-center justify-center bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full ${variant === "compact" ? "w-8 h-8" : variant === "card" ? "w-14 h-14" : "w-10 h-10"}`}
    >
      <Settings
        className={
          variant === "compact"
            ? "w-4 h-4"
            : variant === "card"
              ? "w-7 h-7"
              : "w-5 h-5"
        }
      />
    </div>
  );

  const MockActions = () => (
    <>
      <button className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors">
        <MoreVertical className="w-4 h-4" />
      </button>
      {variant === "card" && (
        <button className="ml-auto px-4 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
          Configure
        </button>
      )}
    </>
  );

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 sm:p-12 relative z-10">
      <div className={`w-full ${variant === "card" ? "max-w-sm" : "max-w-xl"}`}>
        <ItemBlock
          variant={variant}
          title="System Configuration"
          description={
            showDescription
              ? "Manage your environment variables, build settings, and deployment hooks for this specific project instance."
              : undefined
          }
          media={showMedia ? <MockMedia /> : undefined}
          actions={showActions ? <MockActions /> : undefined}
          onClick={isClickable ? () => alert("Item clicked!") : undefined}
        />
      </div>
    </div>
  );
}
