"use client";

import React, { useEffect } from "react";

export function HeroVideoPlayerDocsUpdater() {
  useEffect(() => {
    const handleRatioChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { ratio } = customEvent.detail;
      if (!ratio) return;

      // Convert "16/9" to "16-9" to match ID format
      const ratioId = ratio.replace("/", "-");
      
      const ratios = ["16-9", "21-9", "4-3"];
      ratios.forEach(r => {
        const el = document.getElementById(`usage-block-${r}`);
        if (el) {
          if (r === ratioId) {
            el.classList.remove("hidden");
            el.classList.add("block");
          } else {
            el.classList.remove("block");
            el.classList.add("hidden");
          }
        }
      });
    };

    window.addEventListener("hero-video-change", handleRatioChange);
    return () => {
      window.removeEventListener("hero-video-change", handleRatioChange);
    };
  }, []);

  return null;
}
