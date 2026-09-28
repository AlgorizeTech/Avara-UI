"use client";

import { FAQSection } from "@/components/custom/blocks/FAQSectionBlock";

export default function FAQSectionDemo({
  eyebrow = "Common Queries",
  title = "Frequently Asked Questions",
  description = "Everything you need to know about using Docs UI, component integration, licensing, and custom styling.",
  showGlows = true,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  showGlows?: boolean;
}) {
  return (
    <div className="w-full">
      <FAQSection
        eyebrow={eyebrow}
        title={title}
        description={description}
        showGlows={showGlows}
        className="py-10 md:py-16 border-0"
      />
    </div>
  );
}
