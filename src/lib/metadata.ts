import type { Metadata } from "next";
import { SITE_URL, integrations, siteConfig } from "@/config/site";

// Split keywords into chunks for better performance
const coreKeywords = [
  "React components",
  "UI library",
  "React component library",
  "Tailwind CSS components",
  "Motion components",
  "Next.js components",
  "Modern UI library",
  "Web components",
  "React UI kit",
  "Design system React",
];

const bangladeshiKeywords = [
  "Bangladeshi UI library",
  "Made in Bangladesh UI library",
  "Bangla UI library",
  "React UI library for Bangladesh",
  "বাংলা UI লাইব্রেরি",
  "রিঅ্যাক্ট কম্পোনেন্ট বাংলাদেশ",
];

const shadcnKeywords = [
  "shadcn ui alternative",
  "shadcn ui vs Algorize UI",
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
  "Motion examples",
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
    "Algorize UI | React Component Library",
  description: siteConfig.description,
  keywords: allKeywords,
  authors: [{ name: "AlgorizeTech", url: "https://github.com/AlgorizeTech" }],
  creator: "Algorize UI",
  publisher: "Algorize UI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
  // Icons live in /public/favicon, except favicon.ico which is also mirrored at
  // the web root: browsers and crawlers request GET /favicon.ico directly,
  // without ever reading a <link>, so the root copy is not optional.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    // iOS ignores sizes it was not given and rescales, so the single 180x180
    // is enough — it is the largest size any current iOS home screen asks for.
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  // No `alternates.canonical` here, deliberately.
  //
  // Next.js inherits this object into every page that does not override it, so a
  // canonical set at the root is not a homepage canonical — it is a site-wide
  // claim that every page is a duplicate of "/". Only 11 of the 97 documentation
  // pages export their own metadata, so the other 86 were each telling search
  // engines to index the homepage instead of themselves.
  //
  // Omitting it lets every URL self-canonicalise, which is the right default.
  // Pages that must point elsewhere say so themselves — see buildDocsMetadata
  // for the forked guides.
  openGraph: {
    title:
      "Algorize UI | React Component Library",
    description: siteConfig.description,
    url: SITE_URL,
    siteName: "Algorize UI",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Algorize UI | React Component Library",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Algorize UI | React Component Library",
    description: siteConfig.tagline,
    images: [`${SITE_URL}/og-image.png`],
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
  // Ownership tokens come from the environment. The value here previously
  // belonged to the template this site was built from, which claimed this
  // domain in someone else's Search Console.
  ...(integrations.googleSiteVerification
    ? { verification: { google: integrations.googleSiteVerification } }
    : {}),
  category: "technology",
  classification: "React Component Library",
};
