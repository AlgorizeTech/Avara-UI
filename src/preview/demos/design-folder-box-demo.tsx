"use client";

import { DesignFolderBox } from "@/components/custom/blocks/DesignFolderBox";

export default function DesignFolderBoxDemo({
  color = "primary",
}: {
  color?: string;
}) {
  return (
    <div className="w-full p-2 sm:p-6 overflow-hidden flex flex-col justify-center items-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b]">
      <DesignFolderBox color={color} />
    </div>
  );
}
