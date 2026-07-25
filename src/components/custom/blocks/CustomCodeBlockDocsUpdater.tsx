"use client";

import React, { useEffect } from "react";

export function CustomCodeBlockDocsUpdater() {
  useEffect(() => {
    const handleVariantChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { variant } = customEvent.detail;
      if (!variant) return;

      const variants = ["HTML", "CSS", "JavaScript", "TypeScript", "Terminal"];
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

    window.addEventListener("custom-code-change", handleVariantChange);
    return () => {
      window.removeEventListener("custom-code-change", handleVariantChange);
    };
  }, []);

  return null;
}
