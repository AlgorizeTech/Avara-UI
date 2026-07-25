"use client";

import React, { useEffect } from "react";

export function MobileMockupDocsUpdater() {
  useEffect(() => {
    const handleMockupChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { componentName } = customEvent.detail;
      if (!componentName) return;

      const docsBlock = document.getElementById("mobile-mockup-docs");
      if (docsBlock) {
        // Safely replace text in text nodes to avoid destroying React's DOM references
        const replaceTextInTextNodes = (node: Node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            if (node.nodeValue) {
              node.nodeValue = node.nodeValue.replace(/\b[A-Za-z0-9]+Mockup\b/g, componentName as string);
            }
          } else {
            for (let i = 0; i < node.childNodes.length; i++) {
              replaceTextInTextNodes(node.childNodes[i]);
            }
          }
        };
        replaceTextInTextNodes(docsBlock);
      }

      // Update Aspect Ratio in Best Practices
      const ratioEl = document.getElementById("mockup-aspect-ratio");
      if (ratioEl) {
        const aspectRatios: Record<string, string> = {
          Iphone5Mockup: "16:9",
          Iphone12ProMaxMockup: "19.5:9",
          Iphone14ProMaxMockup: "19.5:9",
          SamsungS24UltraMockup: "19.5:9",
          GooglePixel8Mockup: "20:9",
          GooglePixel10Mockup: "20:9",
        };
        ratioEl.innerText = aspectRatios[componentName as string] || "19.5:9";
      }
    };

    window.addEventListener("mobile-mockup-change", handleMockupChange);
    return () => {
      window.removeEventListener("mobile-mockup-change", handleMockupChange);
    };
  }, []);

  return null;
}
