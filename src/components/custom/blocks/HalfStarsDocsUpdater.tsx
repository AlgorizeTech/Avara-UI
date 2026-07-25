"use client";

import React, { useEffect } from "react";

export function HalfStarsDocsUpdater() {
  useEffect(() => {
    const handleVariantChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { variant } = customEvent.detail;
      if (!variant) return;

      const variants = ["full", "half", "continuous", "custom"];
      variants.forEach(v => {
        const el = document.getElementById(`usage-block-${v}`);
        if (el) {
          if (v === variant) {
            el.classList.remove("hidden");
            el.classList.add("block");
          } else {
            el.classList.remove("block");
            el.classList.add("hidden");
          }
        }
      });
    };

    window.addEventListener("half-stars-change", handleVariantChange);
    return () => {
      window.removeEventListener("half-stars-change", handleVariantChange);
    };
  }, []);

  return null;
}
