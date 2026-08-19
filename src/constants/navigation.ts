import { docsHref, type Framework } from "@/lib/framework";

/**
 * Navigation stores the page slug, never a full href.
 *
 * Docs live under `/docs/<framework>/<slug>`, so a stored href would pin every
 * entry to one framework and quietly send a reader back to it. Consumers compose
 * with `docsHref(framework, slug)` instead, and match active state on the slug —
 * see src/lib/framework.ts.
 */
export type NavigationChild = {
  label: string;
  /** Path below the framework segment, e.g. "accordion" or "examples/counter". */
  slug?: string;
  href?: string;
  badge?: string;
  children?: NavigationChild[];
};

export type NavigationItem = {
  label: string;
  children: NavigationChild[];
};

/**
 * The link for a navigation entry.
 *
 * `slug` is the normal case and follows the reader's framework. `href` is the
 * escape hatch for anything that is not a framework-scoped docs page — an
 * external link, or a path outside `/docs/<framework>/`. An entry carrying
 * neither is inert rather than a broken link.
 */
export const navHref = (
  // Structural on purpose: the search registry carries the same two link fields
  // under a different shape, and there is no reason for it to grow a `label`
  // just to reuse this.
  item: { slug?: string; href?: string },
  framework: Framework,
) => (item.slug ? docsHref(framework, item.slug) : (item.href ?? "#"));

export const navigation: NavigationItem[] = [
  {
    label: "Getting Started",
    children: [
      { label: "Introduction", slug: "index" },
      {
        label: "Installation",
        slug: "installation",
        badge: "Updated",
      },
      { label: "Quick Start", slug: "first-app" },
      { label: "Architecture", slug: "architecture" },
    ],
  },
  // A "Core Features" group used to sit here, linking to 13 inherited Next.js
  // tutorial pages (routing, data fetching, deployment, …). Those documented the
  // framework rather than this library and have been removed, so the commented
  // block went with them — see PRODUCTION-READINESS.md.
  {
    label: "Components",
    children: [
      { label: "All Components", slug: "all-components", badge: "All" },
    ],
  },
  {
    label: "Ui Components",
    children: [
      { label: "Accordion", slug: "accordion" },
      { label: "Alert", slug: "alert" },
      { label: "Ai-Chat", slug: "ai-chat" },
      { label: "Api Playground", slug: "api-playground", badge: "New" },
      { label: "Breadcrumb", slug: "breadcrumb" },
      { label: "Buttons", slug: "button" },
      { label: "Card", slug: "card" },
      { label: "Chart", slug: "chart" },
      { label: "Carousel", slug: "carousel" },
      { label: "Counter", slug: "counter" },
      { label: "Command", slug: "command" },
      { label: "Calendar", slug: "calendar" },
      { label: "Chat", slug: "chat" },
      { label: "Cart", slug: "cart" },
      { label: "Collapsible", slug: "collapsible" },
      { label: "ContextMenu", slug: "context-menu" },
      { label: "Drawer", slug: "drawer" },
      { label: "Dialog", slug: "dialog" },
      { label: "Data Grid", slug: "data-grid", badge: "New" },
      { label: "Data Table", slug: "data-table", badge: "New" },
      { label: "Date Picker", slug: "date-picker" },
      { label: "Form", slug: "form" },
      { label: "Input", slug: "input" },
      { label: "Item", slug: "item" },
      { label: "Invoice", slug: "invoice" },
      { label: "Kbd", slug: "kbd" },
      { label: "Mails", slug: "email" },
      { label: "Map", slug: "fleet-tracker" },
      { label: "Menubar", slug: "menubar" },
      { label: "User Graph", slug: "user-graph", badge: "New" },
      { label: "Modal", slug: "modal" },
      { label: "Navigation", slug: "navigation" },
      { label: "OTP Input", slug: "otp-input" },
      { label: "Popover", slug: "popover" },
      { label: "Progress", slug: "progress" },
      { label: "Resizable", slug: "resizable" },
      { label: "Loader", slug: "loader" },
      { label: "Sonner", slug: "sonner" },
      { label: "Stepper", slug: "stepper" },
      { label: "Select", slug: "select" },
      { label: "Scroll Area", slug: "scroll-area" },
      { label: "Skeleton", slug: "skeleton" },
      { label: "Toast", slug: "toast" },
      { label: "Toggle", slug: "toggle" },
      { label: "Table", slug: "table" },
      { label: "Tooltip", slug: "tooltip" },
      { label: "Toggle Group", slug: "toggle-group" },
      { label: "Timeline", slug: "timeline" },
      { label: "Pagination", slug: "pagination" },
      { label: "Tabs", slug: "vertical-tabs" },
      { label: "Theme Switcher", slug: "theme-switcher", badge: "New" },
      { label: "Wizard", slug: "wizard", badge: "New" },
      { label: "Masonry Grid", slug: "masonry-grid", badge: "New" },
      { label: "QR Code", slug: "qr-code-generator", badge: "New" },
      { label: "Data Maps", slug: "data-maps", badge: "New" },
      { label: "Hero VideoPlayer", slug: "hero-video-player", badge: "New" },
      { label: "Verify Badge", slug: "verify-badge", badge: "New" },
      // { label: "Text Animation", slug: "text-animation", badge: "New" },
      { label: "Mobile Mockups", slug: "mobile-mockup", badge: "New" },
      { label: "Half Stars", slug: "half-stars", badge: "New" },
      { label: "Custom Code Block", slug: "custom-code-block", badge: "New" },
      { label: "Image Compare", slug: "image-compare", badge: "New" },
    ],
  },
    {
    label: "Animated Ui Components",
    children: [
      { label: "Cursor Animation", slug: "cursor-animation", badge: "New" },
      { label: "Curved Carousel", slug: "curved-carousel", badge: "New" },
      { label: "Chat Bubble", slug: "chat-bubble" },
      { label: "Dock", slug: "dock", badge: "New" },
      // { label: "Flow Chart", slug: "flowchart", badge: "New" },
      { label: "Typography", slug: "animated-typography", },
      { label: "File Upload", slug: "file-upload" },
      { label: "3D Carousel", slug: "3d-carousel" },
      { label: "Memories Card", slug: "memories-card" },
      { label: "Timeline", slug: "animated-timeline" },
      { label: "Tilted Card", slug: "tilted-card" },
      { label: "Animated List", slug: "animated-list" },
      // { label: "Split Stepper", slug: "split-stepper" },
      // { label: "Split ScrollStepper", slug: "split-scroll-stepper", badge: "New" },
      { label: "Scroll Stack", slug: "scroll-stack" },
      { label: "Magic Bento", slug: "magic-bento" },
      { label: "Video Accordion", slug: "video-accordion" },
      { label: "Network Graph", slug: "network-graph", badge: "New" },
      { label: "Components Folder", slug: "design-components-folder", badge: "New" },
      { label: "Floating ContactButton", slug: "floating-contact-button", badge: "New" },
    ],
  },
  {
    label: "Website Sections",
    children: [
      { label: "Navbar", slug: "navbar", badge: "Core" },
      { label: "Sign-Up", slug: "signup-form", badge: "Core" },
      { label: "Hero", slug: "hero", badge: "New" },
      { label: "Marquee", slug: "marquee", badge: "New" },
      { label: "Pricing Section", slug: "pricing", badge: "Core" },
      { label: "Sidebar Section", slug: "sidebar", badge: "New" },
      { label: "Support Dashboard", slug: "support-dashboard", badge: "Core" },
    ],
  },
];