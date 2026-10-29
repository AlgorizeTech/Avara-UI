"use client";

import {
  CTASection,
  CtaSectionProps,
} from "@/components/custom/blocks/CtaSectionBlock";

export default function CtaSectionDemo(props: CtaSectionProps) {
  return (
    <div className="w-full max-w-full flex items-center justify-center transition-colors duration-300 relative rounded-2xl">
      <div className="relative z-10 w-full max-w-full min-w-0 flex justify-center">
        <CTASection {...props} />
      </div>
    </div>
  );
}
