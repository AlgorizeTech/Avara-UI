type NavigationChild = {
  label: string;
  href: string;
  badge?: string; // Optional badge like "Core" or "Updated"
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
      { label: "Authentication", href: "/docs/nextjs/authentication", badge: "Core" },
      { label: "Deployment", href: "/docs/nextjs/deployment", badge: "Core" },
      { label: "Middleware", href: "/docs/nextjs/middleware", badge: "Core" },
      { label: "TypeScript Support", href: "/docs/nextjs/typescript", badge: "Core" },
      { label: "Testing", href: "/docs/nextjs/testing", badge: "Core" },
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
      { label: "Chart", href: "/docs/nextjs/chart", badge: "New" },
      { label: "Carousel", href: "/docs/nextjs/carousel", badge: "Core" },
      { label: "Counter", href: "/docs/nextjs/counter", badge: "Core" },
      { label: "Calendar", href: "/docs/nextjs/calendar", badge: "Core" },
      { label: "Chat", href: "/docs/nextjs/chat", badge: "Core" },
      { label: "Cart", href: "/docs/nextjs/cart", badge: "Core" },
      { label: "Drawer", href: "/docs/nextjs/drawer", badge: "Core" },
      { label: "Date Picker", href: "/docs/nextjs/date-picker", badge: "Core" },
      { label: "Form", href: "/docs/nextjs/form", badge: "Core" },
      { label: "Input", href: "/docs/nextjs/input", badge: "Core" },
      { label: "Item", href: "/docs/nextjs/item", badge: "New" },
      { label: "Invoice", href: "/docs/nextjs/invoice", badge: "Core" },
      { label: "Mails", href: "/docs/nextjs/email", badge: "Core" },
      { label: "Map", href: "/docs/nextjs/fleet-tracker", badge: "Core" },
      { label: "Menubar", href: "/docs/nextjs/menubar", badge: "New" },
      { label: "Modal", href: "/docs/nextjs/modal", badge: "Core" },
      { label: "Resizable", href: "/docs/nextjs/resizable", badge: "New" },
      { label: "Loader", href: "/docs/nextjs/loader", badge: "New" },
      { label: "Sonner", href: "/docs/nextjs/sonner", badge: "New" },
      { label: "Select", href: "/docs/nextjs/select", badge: "Core" },
      { label: "Skeleton", href: "/docs/nextjs/skeleton", badge: "New" },
      { label: "Toast", href: "/docs/nextjs/toast", badge: "Core" },
      { label: "Table", href: "/docs/nextjs/table", badge: "Core" },
      { label: "Pagination", href: "/docs/nextjs/pagination", badge: "New" },
      { label: "Tabs", href: "/docs/nextjs/vertical-tabs", badge: "Core" },
      
    ],
  },
  {
    label: "Website Sections",
    children: [
      { label: "Navbar", href: "/docs/nextjs/navbar", badge: "Core" },
      { label: "Sign-Up", href: "/docs/nextjs/signup-form", badge: "Core" },
      { label: "Pricing Section", href: "/docs/nextjs/pricing", badge: "Core" },
      { label: "Sidebar Section", href: "/docs/nextjs/sidebar", badge: "New" },
      { label: "Support Dashboard", href: "/docs/nextjs/support-dashboard", badge: "Core" },
    ],
  },
];