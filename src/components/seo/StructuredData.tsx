"use client";

import { useEffect } from "react";
import { SITE_URL, siteConfig, links, socialLinks } from "@/config/site";

// Lazy load structured data after initial render
export function StructuredData() {
  useEffect(() => {
    // Only add structured data after component mounts (client-side)
    const addStructuredData = () => {
      const scripts = [
        {
          id: "software-app-schema",
          data: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: siteConfig.name,
            description:
              siteConfig.description,
            url: SITE_URL,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            softwareVersion: "1.0.0",
            datePublished: "2024-01-01",
            dateModified: new Date().toISOString(),
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            author: {
              "@type": "Organization",
              name: siteConfig.author,
              url: links.github,
            },
            keywords:
              "React components, UI library, Tailwind CSS, Framer Motion, TypeScript, shadcn registry",
            programmingLanguage: ["TypeScript", "JavaScript", "CSS"],
            downloadUrl: links.github,
            license: "https://opensource.org/licenses/MIT",
          },
        },
        {
          id: "organization-schema",
          data: {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: SITE_URL,
            logo: `${SITE_URL}/logo.svg`,
            description:
              siteConfig.description,
            foundingDate: "2024",
            sameAs: socialLinks,
            address: {
              "@type": "PostalAddress",
              addressCountry: "BD",
            },
          },
        },
        {
          id: "website-schema",
          data: {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: SITE_URL,
            description:
              siteConfig.tagline,
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
            },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  `${SITE_URL}/docs?search={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          },
        },
      ];

      scripts.forEach(({ id, data }) => {
        if (!document.getElementById(id)) {
          const script = document.createElement("script");
          script.id = id;
          script.type = "application/ld+json";
          script.textContent = JSON.stringify(data);
          document.head.appendChild(script);
        }
      });
    };

    // Add structured data after a small delay to not block initial render
    const timer = setTimeout(addStructuredData, 100);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
