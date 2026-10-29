"use client";

import { Footer, type FooterVariant } from "@/components/custom/blocks/FooterBlock";
import { accentStyle } from "@/lib/accent";
import { cn } from "@/lib/utils";

export default function FooterDemo({
  variant = "snapshot",
  color,
}: {
  variant?: FooterVariant;
  color?: string;
}) {
  const isEditorial = variant === "editorial-card" || variant === "tilted-cta";

  return (
    <div
      style={accentStyle(color)}
      className="w-full flex items-center justify-center transition-colors"
    >
      <Footer variant={variant} color={color} />
    </div>
  );
}
