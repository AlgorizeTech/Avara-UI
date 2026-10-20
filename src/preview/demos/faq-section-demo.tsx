"use client";

import { FAQSection } from "@/components/custom/blocks/FAQSectionBlock";

export default function FAQSectionDemo({
  variant = "canvas",
  eyebrow = "Common Queries",
  title,
  description,
  showGlows = true,
}: {
  variant?: "canvas" | "two-column";
  eyebrow?: string;
  title?: string;
  description?: string;
  showGlows?: boolean;
}) {
  const defaultTitle =
    variant === "two-column"
      ? "Questions people ask before they install."
      : "Frequently Asked Questions";

  const defaultDescription =
    variant === "two-column"
      ? "Short answers on licensing, theming and where the components run. If yours isn't here, we read every message."
      : "Everything you need to know about using Docs UI, component integration, licensing, and custom styling.";

  return (
    <div className="w-full">
      <FAQSection
        variant={variant}
        eyebrow={eyebrow}
        title={title ?? defaultTitle}
        description={description ?? defaultDescription}
        showGlows={showGlows}
        className={
          variant === "two-column"
            ? "border-0 shadow-none bg-transparent px-2 sm:px-6"
            : "py-10 md:py-16 border-0"
        }
      />
    </div>
  );
}
