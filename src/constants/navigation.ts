type NavigationChild = {
  label: string;
  href: string;
  badge?: string; 
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
      { label: "Api Playground", href: "/docs/nextjs/api-playground", badge: "New" },
      { label: "Breadcrumb", href: "/docs/nextjs/breadcrumb", badge: "Core" },
      { label: "Modern Buttons", href: "/docs/nextjs/button", badge: "Core" },
      { label: "Card", href: "/docs/nextjs/card", badge: "Core" },
      { label: "Chart", href: "/docs/nextjs/chart", badge: "Core" },
      { label: "Carousel", href: "/docs/nextjs/carousel", badge: "Core" },
      { label: "Counter", href: "/docs/nextjs/counter", badge: "Core" },
      { label: "Command", href: "/docs/nextjs/command", badge: "Core" },
      { label: "Calendar", href: "/docs/nextjs/calendar", badge: "Core" },
      { label: "Chat", href: "/docs/nextjs/chat", badge: "Core" },
      { label: "Cart", href: "/docs/nextjs/cart", badge: "Core" },
      { label: "Collapsible", href: "/docs/nextjs/collapsible", badge: "Core" },
      { label: "ContextMenu", href: "/docs/nextjs/context-menu", badge: "Core" },
      { label: "Drawer", href: "/docs/nextjs/drawer", badge: "Core" },
      { label: "Dialog", href: "/docs/nextjs/dialog", badge: "Core" },
      { label: "Data Grid", href: "/docs/nextjs/data-grid", badge: "New" },
      { label: "Data Table", href: "/docs/nextjs/data-table", badge: "New" },
      { label: "Date Picker", href: "/docs/nextjs/date-picker", badge: "Core" },
      { label: "Form", href: "/docs/nextjs/form", badge: "Core" },
      { label: "Input", href: "/docs/nextjs/input", badge: "Core" },
      { label: "Item", href: "/docs/nextjs/item", badge: "Core" },
      { label: "Invoice", href: "/docs/nextjs/invoice", badge: "Core" },
      { label: "Kbd", href: "/docs/nextjs/kbd", badge: "Core" },
      { label: "Mails", href: "/docs/nextjs/email", badge: "Core" },
      { label: "Map", href: "/docs/nextjs/fleet-tracker", badge: "Core" },
      { label: "Menubar", href: "/docs/nextjs/menubar", badge: "Core" },
      { label: "Modal", href: "/docs/nextjs/modal", badge: "Core" },
      { label: "Navigation", href: "/docs/nextjs/navigation", badge: "Core" },
      { label: "OTP Input", href: "/docs/nextjs/otp-input", badge: "Core" },
      { label: "Popover", href: "/docs/nextjs/popover", badge: "Core" },
      { label: "Progress", href: "/docs/nextjs/progress", badge: "Core" },
      { label: "Resizable", href: "/docs/nextjs/resizable", badge: "Core" },
      { label: "Loader", href: "/docs/nextjs/loader", badge: "Core" },
      { label: "Sonner", href: "/docs/nextjs/sonner", badge: "Core" },
      { label: "Select", href: "/docs/nextjs/select", badge: "Core" },
      { label: "Scroll Area", href: "/docs/nextjs/scroll-area", badge: "Core" },
      { label: "Skeleton", href: "/docs/nextjs/skeleton", badge: "Core" },
      { label: "Toast", href: "/docs/nextjs/toast", badge: "Core" },
      { label: "Toggle", href: "/docs/nextjs/toggle", badge: "Core" },
      { label: "Table", href: "/docs/nextjs/table", badge: "Core" },
      { label: "Tooltip", href: "/docs/nextjs/tooltip", badge: "Core" },
      { label: "Toggle Group", href: "/docs/nextjs/toggle-group", badge: "Core" },
      { label: "Timeline", href: "/docs/nextjs/timeline", badge: "Core" },
      { label: "Terminal", href: "/docs/nextjs/terminal", badge: "Core" },
      { label: "Typography", href: "/docs/nextjs/typography", badge: "Core" },
      { label: "Pagination", href: "/docs/nextjs/pagination", badge: "Core" },
      { label: "Tabs", href: "/docs/nextjs/vertical-tabs", badge: "Core" },
      
    ],
  },
    {
    label: "Animated Ui Components",
    children: [
      { label: "Typography", href: "/docs/nextjs/animated-typography", badge: "New" },
    ],
  },
  {
    label: "Website Sections",
    children: [
      { label: "Navbar", href: "/docs/nextjs/navbar", badge: "Core" },
      { label: "Sign-Up", href: "/docs/nextjs/signup-form", badge: "Core" },
      { label: "Hero", href: "/docs/nextjs/hero", badge: "New" },
      { label: "Marquee", href: "/docs/nextjs/marquee", badge: "New" },
      { label: "Pricing Section", href: "/docs/nextjs/pricing", badge: "Core" },
      { label: "Sidebar Section", href: "/docs/nextjs/sidebar", badge: "New" },
      { label: "Support Dashboard", href: "/docs/nextjs/support-dashboard", badge: "Core" },
    ],
  },
];