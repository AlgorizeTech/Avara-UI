type NavigationChild = {
  label: string;
  href: string;
  badge?: string; // Optional badge like "New" or "Updated"
};
type NavigationItem = {
  label: string;
  children: NavigationChild[];
};

export const navigation: NavigationItem[] = [
  {
    label: "Getting Started",
    children: [
      { label: "Introduction", href: "/docs/nextjs/index" },
      {
        label: "Installation",
        href: "/docs/nextjs/installation",
        badge: "Updated",
      },
      { label: "Quick Start", href: "/docs/nextjs/first-app" },
    ],
  },
  {
    label: "Core Features",
    children: [
      { label: "Pages & Routing", href: "/docs/nextjs/routing", badge: "Core" },
      { label: "Data Fetching", href: "/docs/nextjs/data-fetching", badge: "Core" },
      { label: "API Routes", href: "/docs/nextjs/api-routes", badge: "Core" },
      { label: "Image Optimization", href: "/docs/nextjs/image-optimization", badge: "Core" },
      { label: "CSS & Styling", href: "/docs/nextjs/styling", badge: "Core" },
      { label: "Performance", href: "/docs/nextjs/performance", badge: "Core" },
      { label: "SEO & Meta", href: "/docs/nextjs/seo", badge: "Core" },
      { label: "Authentication", href: "/docs/nextjs/authentication", badge: "New" },
      { label: "Deployment", href: "/docs/nextjs/deployment", badge: "Core" },
      { label: "Middleware", href: "/docs/nextjs/middleware", badge: "New" },
      { label: "TypeScript Support", href: "/docs/nextjs/typescript", badge: "Core" },
      { label: "Testing", href: "/docs/nextjs/testing", badge: "New" },
    ],
  },
  {
    label: "Examples",
    children: [
      { label: "Interactive Counter", href: "/docs/nextjs/examples/counter" },
      { label: "Button", href: "/docs/nextjs/examples/button" },


    ],
  },
];