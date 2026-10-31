"use client";

import React, { useState } from "react";
import NotFoundSection, { NotFoundVariant } from "@/components/custom/blocks/NotFoundBlock";
import { BookOpen, Home, LayoutGrid } from "lucide-react";

export default function NotFoundSectionDemo({
  variant,
  color,
  code,
  badge,
  title,
  description,
  showShortcuts = true,
}: {
  variant?: NotFoundVariant;
  color?: string;
  code?: string;
  badge?: string;
  title?: string;
  description?: string;
  showShortcuts?: boolean;
}) {
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  return (
    <div className="relative -my-6 -mx-4 w-[calc(100%+2rem)] min-w-[calc(100%+2rem)] max-w-none flex flex-col items-center justify-center overflow-hidden">
      {notice && (
        <div className="absolute top-6 z-50 text-xs px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono shadow-lg backdrop-blur-md">
          {notice}
        </div>
      )}

      <div className="w-full">
        <NotFoundSection
          variant={variant}
          color={color}
          code={code}
          badge={badge}
          title={title}
          description={description}
          showShortcuts={showShortcuts}
          primaryAction={{
            label: "Explore Documentation",
            icon: <BookOpen className="h-4 w-4" />,
            onClick: () => showNotice("Action triggered: Navigating to documentation..."),
          }}
          secondaryAction={{
            label: "Back to Home",
            icon: <Home className="h-4 w-4" />,
            onClick: () => showNotice("Action triggered: Redirecting to homepage..."),
          }}
          shortcuts={[
            {
              label: "All Components",
              icon: <LayoutGrid className="h-3.5 w-3.5 shrink-0 text-primary" />,
              onClick: () => showNotice("Shortcut clicked: All Components"),
            },
            {
              label: "Installation",
              icon: <BookOpen className="h-3.5 w-3.5 shrink-0 text-primary" />,
              onClick: () => showNotice("Shortcut clicked: Installation"),
            },
          ]}
          className="w-full min-h-[580px] sm:min-h-[640px]"
        />
      </div>
    </div>
  );
}
