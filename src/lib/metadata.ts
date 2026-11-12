import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, integrations, siteConfig } from "@/config/site";

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
    description: siteConfig.description,
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

/** What the library as a whole is searched for. On the homepage and every component page. */
export const LIBRARY_KEYWORDS = [
  "free shadcn ui components",
  "free shadcn components",
  "shadcn components",
  "react beautiful components",
  "nextjs beautiful components",
  "free ui components",
];

/**
 * The homepage's search terms. Most are phrases Google Autocomplete suggests
 * for these seeds (see SEO.md), so people do type them. Each describes
 * something the site ships; "shadcn mcp" is the MCP guide. Kept off the root
 * metadata so docs pages do not inherit homepage-only terms.
 */
const homeKeywords = [
  ...LIBRARY_KEYWORDS,
  // Shadcn
  "shadcn ui",
  "shadcn ui components",
  "shadcn components free",
  "shadcn ui components free",
  "shadcn components library",
  "shadcn ui components library",
  "shadcn components list",
  "shadcn components examples",
  "shadcn blocks",
  "shadcn ui blocks",
  "shadcn blocks free",
  "free shadcn blocks",
  "free shadcn ui blocks",
  "shadcn registry",
  "shadcn mcp",
  "shadcn mcp server",
  // Animated, modern, smooth, beautiful
  "animated shadcn components",
  "free animated shadcn components",
  "animated shadcn components library",
  "animated shadcn ui",
  "animated shadcn blocks",
  "modern shadcn components",
  "free modern shadcn components",
  "smooth shadcn components",
  "free smooth shadcn components",
  "beautiful shadcn components",
  "beautiful shadcn blocks",
  "beautiful react components",
  "beautiful react components library",
  "beautiful react ui components",
  "next js beautiful components",
  "modern react components",
  "modern react components library",
  "modern react ui components",
  "animated react components",
  "animated react components library",
  "react animated components free",
  "animated ui components",
  "animated ui components for react",
  "animated ui components for next js",
  "animated ui components free",
  "nextjs animated components",
  "gsap react components",
  // Free UI components
  "free ui components library",
  "free ui components for react",
  "free ui components for nextjs",
  "free ui components tailwind",
  "free react components",
  "free react components library",
  "free react components with tailwind",
  "free nextjs components",
  "free nextjs ui components",
  "free tailwind components",
  "free tailwind components react",
  "copy paste react components",
  "copy paste ui components",
  // Libraries
  "ui component library free",
  "ui component library for react",
  "ui component library shadcn",
  "react ui library shadcn",
  "react ui library free",
  "react ui library with tailwind",
  "react components",
  "tailwind css components",
  "next.js components",
  // The brand, in the spellings people type it.
  SITE_NAME.toLowerCase(),
  SITE_NAME.toLowerCase().replace(/\s+/g, ""),
  `${SITE_NAME.toLowerCase()} components`,
  `${SITE_NAME.toLowerCase()} shadcn`,
];

/**
 * The homepage's own additions to the root metadata above, which already
 * carries its title, description and social cards.
 *
 * The canonical is set here, not at the root: a root canonical is inherited by
 * every page that does not override it (see the note above).
 */
export const homeMetadata: Metadata = {
  keywords: homeKeywords,
  alternates: { canonical: "/" },
};
