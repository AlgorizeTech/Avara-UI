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
    label: "Ui Components",
    children: [
      { label: "Avatar", href: "/docs/nextjs/avatar", badge: "Core" },
      { label: "Accordion", href: "/docs/nextjs/accordion", badge: "Core" },
      { label: "Alert", href: "/docs/nextjs/alert", badge: "Core" },
      { label: "Ai-Chat", href: "/docs/nextjs/ai-chat", badge: "Core" },
      { label: "Breadcrumb", href: "/docs/nextjs/breadcrumb", badge: "Core" },
      { label: "Modern Buttons", href: "/docs/nextjs/button", badge: "Core" },
      { label: "Carousel", href: "/docs/nextjs/carousel", badge: "Core" },
      { label: "Counter", href: "/docs/nextjs/counter", badge: "Core" },
      { label: "Calendar", href: "/docs/nextjs/calendar", badge: "Core" },
      { label: "Chat", href: "/docs/nextjs/chat", badge: "Core" },
      { label: "Cart", href: "/docs/nextjs/cart", badge: "Core" },
      { label: "Drawer", href: "/docs/nextjs/drawer", badge: "Core" },
      { label: "Date Picker", href: "/docs/nextjs/date-picker", badge: "New" },
      { label: "Input", href: "/docs/nextjs/input", badge: "New" },
      { label: "Invoice", href: "/docs/nextjs/invoice", badge: "Core" },
      { label: "Mails", href: "/docs/nextjs/email", badge: "Core" },
      { label: "Map", href: "/docs/nextjs/fleet-tracker", badge: "Core" },
      { label: "Modal", href: "/docs/nextjs/modal", badge: "Core" },
      { label: "Navbar", href: "/docs/nextjs/navbar", badge: "Core" },
      { label: "Select", href: "/docs/nextjs/select", badge: "New" },
      { label: "Support Dashboard", href: "/docs/nextjs/support-dashboard", badge: "Core" },
      { label: "Table", href: "/docs/nextjs/table", badge: "Core" },
      { label: "Pricing", href: "/docs/nextjs/pricing", badge: "Core" },
      { label: "Sign-Up", href: "/docs/nextjs/signup-form", badge: "Core" },
      { label: "Tabs", href: "/docs/nextjs/vertical-tabs", badge: "Core" },
      
    ],
  },
  {
    label: "Examples",
    children: [
      { label: "Interactive Counter", href: "/docs/nextjs/examples/counter" },
      { label: "Button", href: "/docs/nextjs/examples/button" },
      { label: "Waitlist", href: "/docs/nextjs/examples/waitlist" },
      { label: "Video Test", href: "/docs/nextjs/examples/video-text" },


    ],
  },
];