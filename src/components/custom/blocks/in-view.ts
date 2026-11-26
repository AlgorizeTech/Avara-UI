"use client";

import { useEffect, useState } from "react";

/**
 * True once the element has scrolled into view, and stays true. Hand `watch`
 * to the element's `ref`.
 */
export function useInView(threshold = 0.25) {
  const [node, setNode] = useState<Element | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node, threshold]);

  return [setNode, inView] as const;
}
