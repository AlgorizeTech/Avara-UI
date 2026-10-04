"use client";

import { DesignComponentsFolder } from "@/components/custom/blocks/DesignComponentsFolder";

export default function DesignComponentsFolderDemo({
  color = "primary",
}: {
  color?: string;
}) {
  return (
    <div className="w-full p-2 sm:p-6 overflow-hidden flex flex-col justify-center items-center rounded-2xl border border-border bg-background">
      <DesignComponentsFolder color={color} disableLinks={true} />
    </div>
  );
}
