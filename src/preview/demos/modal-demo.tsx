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
      className={`relative overflow-hidden w-full flex items-center justify-center min-h-[550px] ${
        variant === "glass" ? "p-4 sm:p-8 bg-cover bg-center" : ""
      }`}
      style={
        variant === "glass"
          ? {
              backgroundImage:
                'url("https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop")',
            }
          : undefined
      }
    >
      {variant === "glass" && (
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />
      )}
      <ModalBlock
        key={`${type}-${variant}-${color}`}
        type={type}
        variant={variant}
        color={color}
      />
    </div>
  );
}
