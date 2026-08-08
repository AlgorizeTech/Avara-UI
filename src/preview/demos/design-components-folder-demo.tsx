"use client";

import { DesignComponentsFolder } from "@/components/custom/blocks/DesignComponentsFolder";

export default function DesignComponentsFolderDemo() {
  return (
    <div className="w-full p-4 sm:p-8 flex flex-col justify-center items-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b]">
      <DesignComponentsFolder />
    </div>
  );
}
