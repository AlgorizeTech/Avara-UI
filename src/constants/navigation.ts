type NavigationChild = {
  label: string;
  href: string;
  badge?: string; 
  children?: NavigationChild[];
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
      { label: "Architecture", href: "/docs/nextjs/architecture" },
    ],
  },
  // A "Core Features" group used to sit here, linking to 13 inherited Next.js
  // tutorial pages (routing, data fetching, deployment, …). Those documented the
  // framework rather than this library and have been removed, so the commented
  // block went with them — see PRODUCTION-READINESS.md.
  {
    label: "Components",
    children: [
      { label: "All Components", href: "/docs/nextjs/all-components", badge: "All" },
    ],
  },
  {
    label: "Ui Components",
    children: [
      { label: "Accordion", href: "/docs/nextjs/accordion",  },
      { label: "Alert", href: "/docs/nextjs/alert",  },
      { label: "Ai-Chat", href: "/docs/nextjs/ai-chat",  },
      { label: "Api Playground", href: "/docs/nextjs/api-playground", badge: "New" },
      { label: "Breadcrumb", href: "/docs/nextjs/breadcrumb", },
      { label: "Buttons", href: "/docs/nextjs/button", },
      { label: "Card", href: "/docs/nextjs/card", },
      { label: "Chart", href: "/docs/nextjs/chart", },
      { label: "Carousel", href: "/docs/nextjs/carousel", },
      { label: "Counter", href: "/docs/nextjs/counter", },
      { label: "Command", href: "/docs/nextjs/command",  },
      { label: "Calendar", href: "/docs/nextjs/calendar",  },
      { label: "Chat", href: "/docs/nextjs/chat",  },
      { label: "Cart", href: "/docs/nextjs/cart",  },
      { label: "Collapsible", href: "/docs/nextjs/collapsible",  },
      { label: "ContextMenu", href: "/docs/nextjs/context-menu",  },
      { label: "Drawer", href: "/docs/nextjs/drawer",  },
      { label: "Dialog", href: "/docs/nextjs/dialog",  },
      { label: "Data Grid", href: "/docs/nextjs/data-grid", badge: "New" },
      { label: "Data Table", href: "/docs/nextjs/data-table", badge: "New" },
      { label: "Date Picker", href: "/docs/nextjs/date-picker",  },
      { label: "Form", href: "/docs/nextjs/form",  },
      { label: "Input", href: "/docs/nextjs/input",  },
      { label: "Item", href: "/docs/nextjs/item",  },
      { label: "Invoice", href: "/docs/nextjs/invoice",  },
      { label: "Kbd", href: "/docs/nextjs/kbd",  },
      { label: "Mails", href: "/docs/nextjs/email",  },
      { label: "Map", href: "/docs/nextjs/fleet-tracker",  },
      { label: "Menubar", href: "/docs/nextjs/menubar",  },
      { label: "User Graph", href: "/docs/nextjs/user-graph", badge: "New" },
      { label: "Modal", href: "/docs/nextjs/modal",  },
      { label: "Navigation", href: "/docs/nextjs/navigation",  },
      { label: "OTP Input", href: "/docs/nextjs/otp-input",  },
      { label: "Popover", href: "/docs/nextjs/popover",  },
      { label: "Progress", href: "/docs/nextjs/progress",  },
      { label: "Resizable", href: "/docs/nextjs/resizable",  },
      { label: "Loader", href: "/docs/nextjs/loader",  },
      { label: "Sonner", href: "/docs/nextjs/sonner",  },
      { label: "Stepper", href: "/docs/nextjs/stepper" },
      { label: "Select", href: "/docs/nextjs/select",  },
      { label: "Scroll Area", href: "/docs/nextjs/scroll-area",  },
      { label: "Skeleton", href: "/docs/nextjs/skeleton",  },
      { label: "Toast", href: "/docs/nextjs/toast",  },
      { label: "Toggle", href: "/docs/nextjs/toggle",  },
      { label: "Table", href: "/docs/nextjs/table",  },
      { label: "Tooltip", href: "/docs/nextjs/tooltip",  },
      { label: "Toggle Group", href: "/docs/nextjs/toggle-group",  },
      { label: "Timeline", href: "/docs/nextjs/timeline",  },
      { label: "Terminal", href: "/docs/nextjs/terminal",  },
      { label: "Typography", href: "/docs/nextjs/typography",  },
      { label: "Pagination", href: "/docs/nextjs/pagination",  },
      { label: "Tabs", href: "/docs/nextjs/vertical-tabs",  },
      { label: "Theme Switcher", href: "/docs/nextjs/theme-switcher", badge: "New" },
      { label: "Wizard", href: "/docs/nextjs/wizard", badge: "New" },
      { label: "Masonry Grid", href: "/docs/nextjs/masonry-grid", badge: "New" },
      { label: "QR Code", href: "/docs/nextjs/qr-code-generator", badge: "New" },
      { label: "Data Maps", href: "/docs/nextjs/data-maps", badge: "New" },
      { label: "Hero VideoPlayer", href: "/docs/nextjs/hero-video-player", badge: "New" },
      { label: "Verify Badge", href: "/docs/nextjs/verify-badge", badge: "New" },
      // { label: "Text Animation", href: "/docs/nextjs/text-animation", badge: "New" },
      { label: "Mobile Mockups", href: "/docs/nextjs/mobile-mockup", badge: "New" },
      { label: "Half Stars", href: "/docs/nextjs/half-stars", badge: "New" },
      { label: "Custom Code Block", href: "/docs/nextjs/custom-code-block", badge: "New" },
      { label: "Image Compare", href: "/docs/nextjs/image-compare", badge: "New" },
      
    ],
  },
    {
    label: "Animated Ui Components",
    children: [
      { label: "Cursor Animation", href: "/docs/nextjs/cursor-animation", badge: "New" },
      { label: "Curved Carousel", href: "/docs/nextjs/curved-carousel", badge: "New" },
      { label: "Chat Bubble", href: "/docs/nextjs/chat-bubble" },
      { label: "Dock", href: "/docs/nextjs/dock", badge: "New" },
      // { label: "Flow Chart", href: "/docs/nextjs/flowchart", badge: "New" },
      { label: "Typography", href: "/docs/nextjs/animated-typography", },
      { label: "File Upload", href: "/docs/nextjs/file-upload" },
      { label: "3D Carousel", href: "/docs/nextjs/3d-carousel" },
      { label: "Memories Card", href: "/docs/nextjs/memories-card" },
      { label: "Timeline", href: "/docs/nextjs/animated-timeline" },
      { label: "Tilted Card", href: "/docs/nextjs/tilted-card" },
      { label: "Animated List", href: "/docs/nextjs/animated-list" },
      // { label: "Split Stepper", href: "/docs/nextjs/split-stepper" },
      // { label: "Split ScrollStepper", href: "/docs/nextjs/split-scroll-stepper", badge: "New" },
      { label: "Scroll Stack", href: "/docs/nextjs/scroll-stack" },
      { label: "Magic Bento", href: "/docs/nextjs/magic-bento" },
      { label: "Video Accordion", href: "/docs/nextjs/video-accordion" },
      { label: "Network Graph", href: "/docs/nextjs/network-graph", badge: "New" },
      { label: "Design Components", href: "/docs/nextjs/design-components-folder", badge: "New" },
      { label: "Floating ContactButton", href: "/docs/nextjs/floating-contact-button", badge: "New" },
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