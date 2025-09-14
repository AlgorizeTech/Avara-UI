import type { Metadata } from "next";

// Split keywords into chunks for better performance
const coreKeywords = [
  "React components",
  "UI library",
  "React component library",
  "Tailwind CSS components",
  "Framer Motion components",
  "Next.js components",
  "Modern UI library",
  "Web components",
  "React UI kit",
  "Design system React",
];

const bangladeshiKeywords = [
  "Bangladeshi UI library",
  "First UI library from Bangladesh",
  "Made in Bangladesh UI library",
  "Bangla UI library",
  "React UI library for Bangladesh",
  "বাংলা UI লাইব্রেরি",
  "রিঅ্যাক্ট কম্পোনেন্ট বাংলাদেশ",
];

const shadcnKeywords = [
  "shadcn ui alternative",
  "shadcn ui vs Next.js Documentation",
  "Free shadcn ui alternative",
  "Lighter than shadcn ui",
  "Easier shadcn ui",
];

const tailwindKeywords = [
  "Tailwind CSS UI library",
  "Tailwind CSS component library",
  "Free Tailwind components",
  "Best Tailwind UI kit",
  "Tailwind CSS templates",
];

const nextjsKeywords = [
  "Best UI library for Next.js",
  "Next.js UI components",
  "Next.js component library",
  "Next.js Tailwind CSS starter",
];

// Additional comprehensive keywords for maximum SEO coverage
const componentKeywords = [
  "React button component",
  "Animated button component",
  "Tailwind CSS card component",
  "React modal/dialog component",
  "Accessible modal React",
  "React data table component",
  "React form input components",
  "React date picker component",
  "React dropdown/select component",
  "React tooltip component",
  "React spinner/loader component",
  "React toast/notification component",
  "React accordion component",
  "React tabs component",
  "React carousel/slider component",
  "React progress bar component",
  "React avatar component",
  "React badge component",
  "React breadcrumbs component",
  "React pagination component",
  "React skeleton loader",
];

const howToKeywords = [
  "How to build a design system in React",
  "How to create a React component library",
  "How to animate components in React",
  "How to make responsive components with Tailwind",
  "How to add dark mode to a React app",
  "How to build accessible forms in React",
  "Best way to structure React components",
  "Tutorial for building a UI library",
  "Make my Next.js app look good",
  "Quick UI for React projects",
];

const longTailKeywords = [
  "Simple React UI kit",
  "Beautiful Tailwind buttons",
  "Lightweight Next.js components",
  "Fast React data grid",
  "Modern dashboard UI kit",
  "Elegant form components",
  "Free React admin template",
  "Open source design system",
  "Custom React hooks for UI",
  "Premium UI kit alternative",
  "React UI library examples",
  "Next.js Tailwind tutorial",
  "Production-ready UI library",
  "React TypeScript components",
  "Accessible web components",
  "Framer Motion examples",
  "JavaScript UI library",
  "Headless component library",
  "React UI patterns",
  "Component driven development",
  "Atomic design React",
  "Developer-friendly UI kit",
  "Best React libraries 2025",
  "Free lightweight React components",
];

// Combine all keywords
export const allKeywords = [
  ...coreKeywords,
  ...bangladeshiKeywords,
  ...shadcnKeywords,
  ...tailwindKeywords,
  ...nextjsKeywords,
  ...componentKeywords,
  ...howToKeywords,
  ...longTailKeywords,
];

export const metadata: Metadata = {
  title:
    "Next.js Documentation | Comprehensive Guide",
  description:
    "Comprehensive documentation for Next.js, the React framework for production. Free, open-source, and built with modern web technologies.",
  keywords: allKeywords,
  authors: [{ name: "Next.js Documentation Team", url: "https://github.com/sera-ui" }],
  creator: "Next.js Documentation",
  publisher: "Next.js Documentation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://seraui.seraprogrammer.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Next.js Documentation | Comprehensive Guide",
    description:
      "Comprehensive documentation for Next.js, the React framework for production. Free, open-source, and built with modern web technologies.",
    url: "https://seraui.seraprogrammer.com",
    siteName: "Next.js Documentation",
    images: [
      {
        url: "https://seraui.seraprogrammer.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next.js Documentation | Comprehensive Guide",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Documentation | Comprehensive Guide",
    description:
      "500+ animated React components built with Tailwind CSS & Framer Motion. Free, open-source, and production-ready.",
    images: ["https://seraui.seraprogrammer.com/og-image.png"],
    creator: "@sera_ui",
    site: "@sera_ui",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "y3qEBdgYG32ZoXRsNqWxh6QgyxhQ337zoKpLwmb_dic",
  },
  category: "technology",
  classification: "React Component Library",
};
