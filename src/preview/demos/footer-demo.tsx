"use client";

import { Footer, type FooterVariant } from "@/components/custom/blocks/FooterBlock";

export default function FooterDemo({
  variant = "simple-centered",
}: {
  variant?: FooterVariant;
}) {
  return (
    <div className="w-full flex items-center justify-center">
      <Footer variant={variant} />
    </div>
  );
}
