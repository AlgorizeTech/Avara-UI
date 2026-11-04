import { SITE_URL } from "@/config/site";
// Schema.org structured data for better SEO
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