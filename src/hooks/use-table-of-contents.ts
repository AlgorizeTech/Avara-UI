"use client";

import { useEffect, useState } from "react";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function useTableOfContents() {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const extractHeadings = () => {
      const mainContent = document.querySelector("main");
      if (!mainContent) return;

      const headings = mainContent.querySelectorAll("h1, h2, h3");
      const tocItems: TOCItem[] = [];
      const usedIds = new Set<string>();

      headings.forEach((heading, index) => {
        // ── EXCLUSION FILTER ──────────────────────────────────────────────────
        if (
          heading.id === "features" ||
          heading.closest(
            ".props-reference, .props-section, [data-preview], [data-showcase], [role='dialog'], [role='alert'], table, aside, nav, footer, header, [class*='showcase' i], [class*='card' i]"
          )
        ) {
          return;
        }
        // ──────────────────────────────────────────────────────────────────────

        const text = heading.textContent?.trim();
        if (!text) return;

        let id = heading.id;

        // ── THE BUG FIX: Enforce global ID uniqueness in the DOM ──
        if (!id || usedIds.has(id)) {
          const baseId =
            id ||
            text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "") || `heading-${index}`;

          id = baseId;
          let counter = 1;
          while (usedIds.has(id)) {
            id = `${baseId}-${counter}`;
            counter++;
          }

          // Force-update the browser DOM tag so intersection observers match uniquely
          heading.id = id;
        }

        usedIds.add(id);

        const level = parseInt(heading.tagName.charAt(1));
        tocItems.push({ id, text, level });
      });

      setToc(tocItems);
    };

    extractHeadings();
    requestAnimationFrame(extractHeadings);

    const observer = new MutationObserver(() => {
      extractHeadings();
    });

    const mainContent = document.querySelector("main");
    if (mainContent) {
      observer.observe(mainContent, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const headings = toc
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      if (headings.length === 0) return;

      let activeHeading = headings[0];
      for (const heading of headings) {
        if (heading) {
          const rect = heading.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3) {
            activeHeading = heading;
          } else {
            break;
          }
        }
      }

      if (activeHeading?.id !== activeId) {
        setActiveId(activeHeading?.id || "");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc, activeId]);

  const scrollToHeading = (id: string, offset: number = 88) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return { toc, activeId, scrollToHeading };
}