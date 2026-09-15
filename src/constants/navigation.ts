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
  /**
   * Extra search terms for the command palette, which otherwise indexes nothing
   * but the label. Needed where a page is known by names its label does not
   * contain — "Auth Forms" is what a reader searching "login" or "sign up" is
   * looking for, and neither word appears in the label or the slug.
   */
  keywords?: string[];
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
      { label: "Ai-Chat", slug: "ai-chat" },
      { label: "Alert", slug: "alert" },
      { label: "Api Playground", slug: "api-playground" },
      { label: "Apple Select", slug: "apple-select", badge: "New" },
      { label: "Breadcrumb", slug: "breadcrumb" },
      { label: "Buttons", slug: "button" },
      { label: "Calendar", slug: "calendar" },
      { label: "Card", slug: "card" },
      { label: "Carousel", slug: "carousel" },
      { label: "Cart", slug: "cart" },
      { label: "Chart", slug: "chart" },
      { label: "Chat", slug: "chat" },
      { label: "Collapsible", slug: "collapsible" },
      { label: "Color Picker", slug: "color-picker" },
      { label: "Playable Piano", slug: "piano" },
      { label: "Command", slug: "command" },
      { label: "ContextMenu", slug: "context-menu" },
      { label: "Conversation Timeline", slug: "conversation-timeline", badge: "New" },
      { label: "Copy Button", slug: "copy-button", badge: "New" },
      { label: "Counter", slug: "counter" },
      { label: "Custom Code Block", slug: "custom-code-block" },
      { label: "Data Grid", slug: "data-grid" },
      { label: "Data Maps", slug: "data-maps" },
      { label: "Data Table", slug: "data-table" },
      { label: "Date Picker", slug: "date-picker" },
      { label: "Range Date Picker", slug: "range-date-picker" },
      { label: "Dialog", slug: "dialog" },
      { label: "Drawer", slug: "drawer" },
      { label: "Folder", slug: "folder", badge: "New" },
      { label: "Form", slug: "form" },
      { label: "Half Stars", slug: "half-stars" },
      { label: "Audio Player", slug: "audio-player", badge: "New" },
      { label: "Video Player", slug: "video-player" },
      { label: "Image Compare", slug: "image-compare" },
      { label: "Input", slug: "input" },
      { label: "Invoice", slug: "invoice" },
      { label: "Item", slug: "item" },
      { label: "Kbd", slug: "kbd" },
      { label: "Loader", slug: "loader" },
      { label: "Mails", slug: "email" },
      { label: "Map", slug: "fleet-tracker" },
      { label: "Masonry Grid", slug: "masonry-grid" },
      { label: "Menubar", slug: "menubar" },
      { label: "Mobile Mockups", slug: "mobile-mockup" },
      { label: "Modal", slug: "modal" },
      { label: "Navigation", slug: "navigation" },
      { label: "OTP Input", slug: "otp-input" },
      { label: "Pagination", slug: "pagination" },
      { label: "Popover", slug: "popover" },
      { label: "Progress", slug: "progress" },
      { label: "QR Code", slug: "qr-code-generator" },
      { label: "Resizable", slug: "resizable" },
      { label: "Scroll Area", slug: "scroll-area" },
      { label: "Select", slug: "select" },
      { label: "Selection Frame", slug: "selection-frame", badge: "New" },
      { label: "Skeleton", slug: "skeleton" },
      { label: "Sonner", slug: "sonner" },
      { label: "Stepper", slug: "stepper" },
      { label: "Table", slug: "table" },
      { label: "Table of Contents", slug: "table-of-contents", badge: "New" },
      { label: "Tabs", slug: "vertical-tabs" },
      { label: "Theme Switcher", slug: "theme-switcher" },
      { label: "Timeline", slug: "timeline" },
      { label: "Toast", slug: "toast" },
      { label: "Toggle", slug: "toggle" },
      { label: "Toggle Group", slug: "toggle-group" },
      { label: "Tooltip", slug: "tooltip" },
      { label: "User Graph", slug: "user-graph" },
      { label: "Verify Badge", slug: "verify-badge" },
      { label: "Wizard", slug: "wizard" },
    ],
  },
  {
    label: "Animated Ui Components",
    children: [
      { label: "3D Carousel", slug: "3d-carousel" },
      { label: "Animated List", slug: "animated-list" },
      { label: "Book Flip", slug: "book-flip" },
      { label: "Chat Bubble", slug: "chat-bubble" },
      { label: "Components Folder", slug: "design-components-folder" },
      { label: "Cursor Animation", slug: "cursor-animation" },
      { label: "Curved Carousel", slug: "curved-carousel" },
      { label: "Squircle Carousel", slug: "squircle-carousel" },
      { label: "Dock", slug: "dock" },
      { label: "Draggable Card List", slug: "draggable-card-list" },
      { label: "File Upload", slug: "file-upload" },
      { label: "Floating ContactButton", slug: "floating-contact-button" },
      { label: "Flow Gallery", slug: "flow-gallery" },
      { label: "Heart Signal", slug: "heart-signal" },
      { label: "Infrastructure Topology", slug: "infrastructure-topology" },
      { label: "Magic Bento", slug: "magic-bento" },
      { label: "Memories Card", slug: "memories-card" },
      { label: "Network Graph", slug: "network-graph" },
      { label: "Particle Canvas", slug: "particle-canvas" },
      { label: "Scroll Stack", slug: "scroll-stack" },
      { label: "Tilted Card", slug: "tilted-card" },
      { label: "Animated Timeline", slug: "animated-timeline" },
      { label: "Radial Orbital Timeline", slug: "radial-orbital-timeline" },
      { label: "Animated Typography", slug: "animated-typography" },
      { label: "Animated Marquee", slug: "animated-marquee" },
      { label: "Video Accordion", slug: "video-accordion" },
    ],
  },
  {
    label: "Website Sections",
    children: [
      {
        label: "Auth Forms",
        slug: "signup-form",
        badge: "Core",
        keywords: [
          "login",
          "log in",
          "sign in",
          "signin",
          "register",
          "registration",
          "sign up",
          "signup",
          "auth",
          "authentication",
        ],
      },
      {
        label: "Book Appointment",
        slug: "book-appointment",
        badge: "New",
        keywords: ["booking", "appointment", "schedule", "calendar", "slots", "doctor", "clinic", "reservation"],
      },
      { label: "Footer", slug: "footer" },
      { label: "Hero", slug: "hero" },
      { label: "Marquee", slug: "marquee" },
      { label: "Navbar", slug: "navbar", badge: "Core" },
      { label: "Pricing Section", slug: "pricing" },
      { label: "Product Details", slug: "product-details" },
      {
        label: "Profile Page",
        slug: "profile-page",
        badge: "New",
        keywords: ["profile", "user profile", "member", "team", "bento", "glass", "glassmorphism"],
      },
      { label: "Review Section", slug: "reviews" },
      { label: "Sidebar Section", slug: "sidebar" },
      { label: "Support Dashboard", slug: "support-dashboard", badge: "Core" },
    ],
  },
  {
    label: "Third Party Integration",
    children: [
      {
        label: "Overview",
        slug: "third-party",
        badge: "New",
        keywords: ["integration", "third party", "library", "ecosystem"],
      },
      {
        label: "Charts",
        slug: "third-party/charts",
        keywords: ["recharts", "chart.js", "chartjs", "graph", "plot"],
      },
      {
        label: "Data Tables",
        slug: "third-party/tables",
        keywords: ["tanstack", "react-table", "ag grid", "aggrid", "datagrid"],
      },
      {
        label: "Carousels",
        slug: "third-party/carousel",
        keywords: ["embla", "swiper", "slider", "slideshow"],
      },
      {
        label: "Select",
        slug: "third-party/select",
        keywords: ["react-select", "select2", "combobox", "autocomplete", "multiselect"],
      },
      {
        label: "Gallery & Lightbox",
        slug: "third-party/gallery",
        keywords: [
          "lightbox",
          "photoswipe",
          "react-photo-album",
          "yet another react lightbox",
          "masonry",
        ],
      },
    ],
  },
];