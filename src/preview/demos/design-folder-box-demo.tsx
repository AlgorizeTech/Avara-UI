"use client";

import { DesignFolderBox } from "@/components/custom/blocks/DesignFolderBox";

export default function DesignFolderBoxDemo({
  color = "primary",
  title,
  subtitle,
}: {
  color?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="w-full p-2 sm:p-6 overflow-hidden flex flex-col justify-center items-center rounded-2xl border border-border bg-background">
      {/* `title`/`subtitle` left undefined so the block's own defaults apply. */}
      <DesignFolderBox color={color} title={title} subtitle={subtitle} />
    </div>
  );
}
