"use client";

import React, { useState, useEffect } from "react";
import {
  HoverPeek,
  DEFAULT_HOVER_PEEK_HIGHLIGHTS,
  DEFAULT_STATEMENT,
} from "@/components/custom/blocks/HoverPeekBlock";
import { resolveAccent, accentStyle } from "@/lib/accent";

export default function HoverPeekDemo({
  themeColor,
  color,
}: {
  themeColor?: string;
  color?: string;
}) {
  const chosen = color || themeColor;
  const isDefault = !chosen || chosen === "primary" || chosen === "default";
  const resolved = resolveAccent(chosen);
  const activeColor = !isDefault
    ? resolved || (chosen?.startsWith("#") ? chosen : chosen)
    : undefined;

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsFullscreen(document.body.dataset.fullscreen === "true");
    };
    check();
    window.addEventListener("sandbox:fullscreen", check);
    return () => window.removeEventListener("sandbox:fullscreen", check);
  }, []);

  return (
    <div
      style={{
        ...accentStyle(chosen),
        ...(activeColor
          ? ({ "--theme-color": activeColor } as React.CSSProperties)
          : {}),
      }}
      className={
        isFullscreen
          ? "w-full h-screen min-h-screen flex flex-col justify-center items-center rounded-2xl border border-border overflow-hidden bg-background"
          : "w-full h-[680px] sm:h-[700px] flex flex-col justify-center items-center rounded-2xl border border-border overflow-hidden bg-background"
      }
    >
      <HoverPeek
        badge="(Our Philosophy)"
        statement={DEFAULT_STATEMENT}
        highlights={DEFAULT_HOVER_PEEK_HIGHLIGHTS}
        themeColor={activeColor}
        className="w-full h-full min-h-0 py-12 sm:py-16"
      />
    </div>
  );
}
