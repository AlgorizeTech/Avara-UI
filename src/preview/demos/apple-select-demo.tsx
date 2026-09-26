"use client";

import { AppleSelect } from "@/components/custom/blocks/AppleSelectBlock";

const getThemeColorHex = (c: string) => {
  if (c.startsWith("#")) return c;
  const map: Record<string, string> = {
    primary: "var(--primary)",
    default: "var(--primary)",
    indigo: "#6366f1",
    rose: "#f43f5e",
    emerald: "#10b981",
    lavender: "#9b8afb",
  };
  return map[c] || "var(--primary)";
};

const SENTENCE =
  "Introduced with iOS 3 in June 2009 was the ability to select, copy and paste text using selection handles displayed on either end of the highlighted range.";

const QUOTE =
  "Design is not just what it looks like and feels like. Design is how it works. Simplicity is the ultimate sophistication, and it takes a lot of hard work to make something simple.";

const PROSE =
  "text-xl sm:text-2xl font-medium tracking-tight leading-relaxed text-foreground";

export default function AppleSelectDemo({
  color = "primary",
  handles = true,
  animate = false,
  example = "basic",
}: {
  color?: string;
  handles?: boolean;
  animate?: boolean;
  /** Which preview to render. */
  example?: "basic" | "handles" | "animate" | "multiline";
}) {
  const accent = getThemeColorHex(color);

  if (example === "multiline") {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px] px-6 relative z-10">
        <AppleSelect
          text={QUOTE}
          selection={[78, 177]}
          color={accent}
          handles={handles}
          animate={animate}
          className={`max-w-lg ${PROSE}`}
        />
      </div>
    );
  }

  // basic | handles | animate all use the iOS 3 sentence; the props decide the look.
  return (
    <div className="w-full flex items-center justify-center min-h-[300px] px-6 relative z-10">
      <AppleSelect
        key={`${example}-${accent}-${handles}-${animate}`}
        text={SENTENCE}
        selection={[43, 60]}
        color={accent}
        handles={example === "handles" ? false : handles}
        animate={example === "animate" ? true : animate}
        className={`max-w-lg ${PROSE}`}
      />
    </div>
  );
}
