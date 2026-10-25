import { SITE_URL, siteConfig } from "@/config/site";
// Schema.org structured data for better SEO
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Avara UI",
  "url": SITE_URL,
  "logo": `${SITE_URL}/favicon/android-chrome-512x512.png`,
  "description": siteConfig.tagline,
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "AlgorizeTech"
  },
  "sameAs": [
    "https://github.com/AlgorizeTech",
    "https://github.com/AlgorizeTech",


  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "url": "https://github.com/AlgorizeTech"
  }
}

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Avara UI",
  "description": siteConfig.tagline,
  "url": SITE_URL,
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "softwareVersion": "1.0.0",
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString(),
  "author": {
    "@type": "Organization",
    "name": "AlgorizeTech",
    "url": "https://github.com/AlgorizeTech"
  },
  "creator": {
    "@type": "Organization",
    "name": "AlgorizeTech"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Avara UI",
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/favicon/android-chrome-512x512.png`
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "keywords": "React components, UI library, Tailwind CSS, Motion, TypeScript, animated components, open source, free",
  "programmingLanguage": ["TypeScript", "JavaScript", "CSS"],
  "runtimePlatform": "Web Browser",
  "downloadUrl": "https://github.com/AlgorizeTech",

  "codeRepository": "https://github.com/AlgorizeTech/Avara-UI",
  "license": "https://opensource.org/licenses/MIT",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "250",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Developer Community"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Excellent React component library with beautiful animations and great documentation."
    }
  ]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Avara UI",
  "url": SITE_URL,
  "description": siteConfig.tagline,
  "publisher": {
    "@type": "Organization",
    "name": "Avara UI"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/docs?search={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  "mainEntity": {
    "@type": "ItemList",
    "name": "React Components",
    "description": "Collection of modern React components",
    "numberOfItems": 50
  }
}

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${SITE_URL}${item.url}`
  }))
})

export const faqSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})

export const howToSchema = (title: string, steps: Array<{name: string, text: string}>) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": title,
  "description": `Learn how to ${title.toLowerCase()}`,
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text
  }))
})

export const componentSchema = (componentName: string, description: string, category: string) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": `${componentName} Component`,
  "description": description,
  "programmingLanguage": "TypeScript",
  "runtimePlatform": "React",
  "codeRepository": "https://github.com/AlgorizeTech/Avara-UI",
  "license": "https://opensource.org/licenses/MIT",
  "author": {
    "@type": "Organization",
    "name": "AlgorizeTech"
  },
  "isPartOf": {
    "@type": "SoftwareApplication",
    "name": "Avara UI"
  },
  "applicationCategory": category,
  "keywords": `${componentName}, React component, Tailwind CSS, Motion, UI component`
})