"use client";

import {
  ThemeSwitcher,
  ThemeVariant,
} from "@/components/custom/blocks/ThemeSwitcherBlock";

// In the docs this demo runs inside an iframe, and a View Transition can't
// leave its document — the reveal would only sweep the little frame. So when
// framed, the pick is handed to the page (SandboxFrame), which runs the site
// header's reveal from where the click landed and sets the theme; the frame
// follows through next-themes' storage sync. Standalone, the block does it all.
function handToPage(theme: string, origin: Element | null) {
  const rect = origin?.getBoundingClientRect();
  window.parent.postMessage(
    {
      type: "sandbox:theme",
      theme,
      x: rect ? rect.left + rect.width / 2 : undefined,
      y: rect ? rect.top + rect.height / 2 : undefined,
    },
    window.location.origin,
  );
}

export default function ThemeSwitcherDemo({
  variant = "pill",
}: {
  variant?: ThemeVariant;
}) {
  const framed = typeof window !== "undefined" && window.parent !== window;

  return (
    <div className="w-full flex items-center justify-center relative min-h-[220px] py-8 pb-20">
      {/* Render the component based on active state */}
      <div className="flex flex-col items-center gap-6">
        <ThemeSwitcher variant={variant} applyTheme={framed ? handToPage : undefined} />

        {/* Helper text for the dropdown specifically */}
        {variant === "dropdown" && (
          <span className="text-xs text-muted-foreground font-medium">
            Click to open menu
          </span>
        )}
      </div>
    </div>
  );
}
