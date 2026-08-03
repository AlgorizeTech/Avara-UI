"use client";

import { FloatingContactButtonBlock } from "@/components/custom/blocks/FloatingContactButtonBlock";

export default function FloatingContactButtonDemo({
  position = "bottom-right",
  title = "Chat with us",
  defaultOpen = true,
  color = "primary",
  renderKey = 0,
}: {
  position?: "bottom-right" | "bottom-left";
  title?: string;
  defaultOpen?: boolean;
  color?: string;
  renderKey?: number;
}) {
  return (
    <div className="w-full relative flex items-center justify-center transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] overflow-hidden min-h-[640px] p-4 sm:p-6">
      <div className="absolute top-8 left-8 right-8 text-center max-w-sm mx-auto pointer-events-none opacity-40">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Interactive Preview Container
        </p>
      </div>

      <FloatingContactButtonBlock
        key={`${renderKey}-${position}-${defaultOpen}`}
        position={position}
        containerMode="absolute"
        title={title}
        defaultOpen={defaultOpen}
        defaultAccentColor={color}
        localStorageKey="primaryColor"
      />
    </div>
  );
}
