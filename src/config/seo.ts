import { SITE_URL, siteConfig, links, integrations } from "./site";
// SEO Configuration for Avara UI. Identity and links come from
// ./site, which reads them from the environment — change them there.
export const seoConfig = {
  // Basic site information
  siteName: siteConfig.name,
  siteUrl: SITE_URL,
  siteDescription: siteConfig.description,
  
  // Social media. Only GitHub is real — a Twitter handle, Discord invite or npm
  // package that does not exist is worse than an absent one, so they are left
  // out until they are.
  social: {
    github: links.github,
  },

  // Default metadata
  defaultMetadata: {
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: [
      'React components',
      'UI library',
      'Tailwind CSS',
      'Motion',
      'TypeScript',
      'Next.js',
      'animated components',
      'modern UI',
      'open source',
      'free components',
      'shadcn registry',
      'shadcn alternative',
      'responsive design',
      'accessible components',
      'dark mode',
      'component library',
      'design system'
    ],
    authors: [siteConfig.author],
    creator: siteConfig.author,
    publisher: siteConfig.name,
    category: 'technology'
  },

  // Open Graph defaults
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
    images: [
      {
        url: '/meta-image.png',
        width: 1733,
        height: 907,
        alt: siteConfig.title
      }
    ]
  },

  // Twitter defaults. No handle is set: attributing cards to another project's
  // account is worse than leaving the attribution off.
  twitter: {
    card: 'summary_large_image',
  },

  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  // Component categories for better organization
  componentCategories: {
    'UI Components': {
      description: 'Essential UI components for modern web applications',
      components: ['button', 'card', 'badge', 'tabs', 'dropdown', 'navbar', 'footer', 'dock', 'marquee']
    },
    'Form Components': {
      description: 'Beautiful and accessible form components',
      components: ['login', 'signin', 'password', 'forgotpassword', 'twostep', 'multiselector', 'search']
    },
    'Animation Components': {
      description: 'Engaging animation and text effect components',
      components: ['flipwords', 'textreveal', 'sparklestext', 'decrypting', 'shimmer', 'loaders', 'retro']
    },
    'Layout Components': {
      description: 'Complete layout sections and templates',
      components: ['hero', 'pricing', 'testimonial', 'portfolio', 'teammember', 'waitlist', 'filetree', 'masonary']
    },
    'Interactive Components': {
      description: 'Interactive and dynamic components',
      components: ['carousel', 'network', 'copybutton', 'colorpalette', 'gradient', 'fuzzy', 'magic', 'spotlightcard']
    },
    'Specialized Components': {
      description: 'Specialized components for specific use cases',
      components: ['nftmarketplace', 'amazongift', 'codeprofile', 'pattern', 'aurora', 'integrations', 'prompt']
    }
  },

  // Analytics configuration. IDs come from the environment — the values that
  // used to sit here belonged to the template this site was built from, so any
  // traffic they captured was reported to a third party. Empty means disabled.
  analytics: {
    googleAnalytics: integrations.gaId ?? '',
    hotjar: '',
    clarity: ''
  },

  // Performance thresholds for monitoring
  performance: {
    lcp: { good: 2500, needsImprovement: 4000 },
    fid: { good: 100, needsImprovement: 300 },
    cls: { good: 0.1, needsImprovement: 0.25 },
    fcp: { good: 1800, needsImprovement: 3000 },
    tti: { good: 3800, needsImprovement: 7300 }
  },

  // Structured data templates
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.name,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon/android-chrome-512x512.png`,
      description: 'Modern React component library for developers',
      foundingDate: '2024',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BD'
      }
    },
    
    softwareApplication: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: siteConfig.name,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }
}

export default seoConfig