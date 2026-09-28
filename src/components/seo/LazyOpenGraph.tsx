"use client";

import { useEffect } from "react";
import { SITE_URL, siteConfig } from "@/config/site";

// Lazy load Open Graph meta tags after initial render
export function LazyOpenGraph() {
  useEffect(() => {
    const addOpenGraphTags = () => {
      const ogTags = [
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Algorize UI" },
        {
          property: "og:title",
          content:
            "Algorize UI | React Component Library",
        },
        {
          property: "og:description",
          content: siteConfig.description,
        },
        { property: "og:url", content: SITE_URL },
        {
          property: "og:image",
          content: `${SITE_URL}/og-image.png`,
        },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content:
            "Algorize UI | React Component Library",
        },
        { property: "og:image:type", content: "image/png" },
        { property: "og:locale", content: "en_US" },

        // Twitter Card Tags
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Algorize UI | React Component Library",
        },
        {
          name: "twitter:description",
          content: siteConfig.tagline,
        },
        {
          name: "twitter:image",
          content: `${SITE_URL}/og-image.png`,
        },
        {
          name: "twitter:image:alt",
          content:
            "Algorize UI | React Component Library",
        },
      ];

      ogTags.forEach(({ property, name, content }) => {
        const existingTag = document.querySelector(
          `meta[${property ? "property" : "name"}="${property || name}"]`
        );
        if (!existingTag) {
          const meta = document.createElement("meta");
          if (property) meta.setAttribute("property", property);
          if (name) meta.setAttribute("name", name);
          meta.setAttribute("content", content);
          document.head.appendChild(meta);
        }
      });
    };

    // Add Open Graph tags after a small delay to not block initial render
    const timer = setTimeout(addOpenGraphTags, 200);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
