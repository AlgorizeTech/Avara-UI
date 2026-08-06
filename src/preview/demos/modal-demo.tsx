"use client";

import {
  ModalBlock,
  ModalType,
  ModalVariant,
} from "@/components/custom/blocks/ModalBlock";

export default function ModalDemo({
  type = "standard",
  variant = "default",
  color = "primary",
}: {
  type?: ModalType;
  variant?: ModalVariant;
  color?: string;
}) {
  return (
    /* CRITICAL: relative and overflow-hidden trap the absolute modal inside the preview box */
    <div
      className={`relative overflow-hidden w-full flex items-center justify-center min-h-[550px] ${variant === "glass" ? "p-4 sm:p-8 bg-gradient-to-br from-indigo-500/50 via-purple-500/50 to-pink-500/50" : ""}`}
    >
      <ModalBlock
        key={`${type}-${variant}-${color}`}
        type={type}
        variant={variant}
        color={color}
      />
    </div>
  );
}
