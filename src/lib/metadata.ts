import type { Metadata } from "next";
import { SITE_URL, integrations, siteConfig } from "@/config/site";

/**
 * What the library is, in the terms people search for it by. Only accurate
 * descriptions — Google ignores this tag, and Bing reads a long or off-topic
 * list as keyword stuffing.
 */
export const allKeywords = [
  "React component library",
  "React components",
  "Tailwind CSS components",
  "Tailwind CSS v4",
  "shadcn registry",
  "shadcn/ui components",
  "Next.js components",
  "Vite React components",
  "TypeScript components",
  "animated React components",
];

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: allKeywords,
  authors: [{ name: "AlgorizeTech", url: "https://github.com/AlgorizeTech" }],
  creator: "Avara UI",
  publisher: "Avara UI",
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
  // The homepage's card. Every docs page sets its own (src/lib/docs-metadata.ts);
  // a page that does not would inherit this one, homepage URL and all.
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: SITE_URL,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.fullName,
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.tagline,
    images: [siteConfig.ogImage],
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
