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
  /**
   * Small tag after the label. `"New"` is time-limited: pair it with `addedOn`
   * and it disappears on its own after NEW_BADGE_DAYS. Every other badge
   * ("Updated", …) stays until it is removed by hand.
   */
  badge?: string;
  /** The day the page shipped, "YYYY-MM-DD". Drives the `"New"` badge's expiry. */
  addedOn?: string;
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

/** How long a page keeps its "New" badge after `addedOn`. */
export const NEW_BADGE_DAYS = 2;

/**
 * The clock the "New" badges are judged against. The site is a static export
 * and every consumer reads `navigation` at module scope, so this has to be one
 * value shared by the server and the client bundle — the build time, stamped
 * into NEXT_PUBLIC_BUILD_TIME by next.config.ts. A badge therefore expires at
 * the first build after its window closes, and no reader ever sees a badge
 * that the markup they were served did not have.
 */
const badgeClock =
  Date.parse(process.env.NEXT_PUBLIC_BUILD_TIME ?? "") || Date.now();

export const isFreshlyAdded = (addedOn?: string) =>
  !!addedOn &&
  badgeClock - Date.parse(addedOn) < NEW_BADGE_DAYS * 24 * 60 * 60 * 1000;

const expireNewBadges = (items: NavigationItem[]): NavigationItem[] =>
  items.map((group) => ({
    ...group,
    children: group.children.map((child) =>
      child.badge === "New" && child.addedOn && !isFreshlyAdded(child.addedOn)
        ? { ...child, badge: undefined }
        : child,
    ),
  }));

const rawNavigation: NavigationItem[] = [
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
      { label: "MCP", slug: "mcp" },
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
      { label: "3D Carousel", slug: "3d-carousel" },
      { label: "Accordion", slug: "accordion", badge: "New", addedOn: "2026-10-17" },
      { label: "Ai-Chat", slug: "ai-chat" },
      { label: "Alert", slug: "alert" },
      { label: "Animated List", slug: "animated-list" },
      { label: "Animated Timeline", slug: "animated-timeline" },
      { label: "Animated Typography", slug: "animated-typography" },
      { label: "Api Playground", slug: "api-playground" },
      { label: "Apple Select", slug: "apple-select", badge: "New", addedOn: "2026-09-13" },
      { label: "Audio Player", slug: "audio-player", badge: "New", addedOn: "2026-09-15" },
      {
        label: "Avatar Stack",
        slug: "avatar-stack",
        badge: "New",
        addedOn: "2026-09-16",
        keywords: ["avatar", "avatars", "faces", "group", "stack", "overlap", "social proof", "people"],
      },
      { label: "Book Flip", slug: "book-flip" },
      {
        label: "Booking Card",
        slug: "booking-card",
        badge: "New",
        addedOn: "2026-09-16",
        keywords: ["booking", "appointment", "schedule", "calendar", "slots", "time picker", "reservation"],
      },
      { label: "Breadcrumb", slug: "breadcrumb" },
      { label: "Buttons", slug: "button" },
      { label: "Calendar", slug: "calendar" },
      { label: "Card", slug: "card" },
      {
        label: "Card Stack",
        slug: "card-stack",
        badge: "New",
        addedOn: "2026-09-26",
        keywords: ["card stack", "cards", "swipe", "drag", "stack", "discard", "deck", "layered"],
      },
      { label: "Carousel", slug: "carousel" },
      { label: "Cart", slug: "cart" },
      { label: "Chart", slug: "chart" },
      { label: "Chat", slug: "chat" },
      { label: "Chat Bubble", slug: "chat-bubble" },
      {
        label: "Circular Text",
        slug: "circular-text",
        badge: "New",
        addedOn: "2026-09-16",
        keywords: ["circular", "circle", "text", "rotating", "spinning", "badge", "stamp", "textpath", "ring"],
      },
      { label: "Collapsible", slug: "collapsible" },
      { label: "Color Picker", slug: "color-picker" },
      { label: "Command", slug: "command" },
      { label: "Components Folder", slug: "design-components-folder" },
      { label: "ContextMenu", slug: "context-menu" },
      { label: "Conversation Timeline", slug: "conversation-timeline", badge: "New", addedOn: "2026-09-15" },
      { label: "Copy Button", slug: "copy-button", badge: "New", addedOn: "2026-09-14" },
      { label: "Counter", slug: "counter" },
      { label: "Cursor Animation", slug: "cursor-animation" },
      { label: "Curved Carousel", slug: "curved-carousel" },
      { label: "Custom Code Block", slug: "custom-code-block" },
      { label: "Data Grid", slug: "data-grid" },
      { label: "Data Maps", slug: "data-maps" },
      { label: "Data Table", slug: "data-table" },
      { label: "Date Picker", slug: "date-picker" },
      { label: "Dialog", slug: "dialog" },
      { label: "Dock", slug: "dock" },
      { label: "Draggable Card List", slug: "draggable-card-list" },
      { label: "Drawer", slug: "drawer" },
      { label: "File Upload", slug: "file-upload" },
      { label: "Floating ContactButton", slug: "floating-contact-button" },
      { label: "Flow Gallery", slug: "flow-gallery" },
      { label: "Folder", slug: "folder", badge: "New", addedOn: "2026-09-13" },
      { label: "Form", slug: "form" },
      {
        label: "Gallery",
        slug: "gallery",
        badge: "Updated",
        keywords: ["gallery", "orbit", "bento", "reel", "pill carousel", "arc carousel", "cards", "3d", "revolving"],
      },
      {
        label: "Glass Panel",
        slug: "glass-panel",
        badge: "New",
        addedOn: "2026-09-16",
        keywords: ["glass", "glassmorphism", "frosted", "aurora", "bento", "panel", "card", "backdrop"],
      },
      { label: "Half Stars", slug: "half-stars" },
      { label: "Heart Signal", slug: "heart-signal" },
      { label: "Image Compare", slug: "image-compare" },
      {
        label: "Image Viewer",
        slug: "image-viewer",
        badge: "New",
        addedOn: "2026-09-23",
        keywords: ["image", "viewer", "zoom", "magnifier", "gallery", "product", "e-commerce", "lens", "lightbox", "slider"],
      },
      {
        label: "Image Wall",
        slug: "image-wall",
        badge: "New",
        addedOn: "2026-09-21",
        keywords: ["image", "wall", "carousel", "screenshots", "camera", "zoom", "gallery", "grid", "masonry", "showcase"],
      },
      { label: "Infrastructure Topology", slug: "infrastructure-topology" },
      { label: "Input", slug: "input" },
      { label: "Invoice", slug: "invoice" },
      { label: "Item", slug: "item" },
      { label: "Kbd", slug: "kbd" },
      { label: "Loader", slug: "loader" },
      { label: "Magic Bento", slug: "magic-bento" },
      { label: "Mails", slug: "email" },
      { label: "Map", slug: "fleet-tracker" },
      { label: "Marquee", slug: "marquee" },
      { label: "Masonry Grid", slug: "masonry-grid" },
      { label: "Memories Card", slug: "memories-card" },
      { label: "Menubar", slug: "menubar" },
      { label: "Mobile Mockups", slug: "mobile-mockup" },
      { label: "Modal", slug: "modal" },
      { label: "Navigation", slug: "navigation" },
      { label: "Network Graph", slug: "network-graph" },
      { label: "OTP Input", slug: "otp-input" },
      { label: "Pagination", slug: "pagination" },
      { label: "Particle Canvas", slug: "particle-canvas" },
      { label: "Playable Piano", slug: "piano" },
      { label: "Popover", slug: "popover" },
      { label: "Progress", slug: "progress" },
      { label: "QR Code", slug: "qr-code-generator" },
      { label: "Radial Orbital Timeline", slug: "radial-orbital-timeline" },
      { label: "Range Date Picker", slug: "range-date-picker" },
      { label: "Resizable", slug: "resizable" },
      { label: "Scroll Area", slug: "scroll-area" },
      {
        label: "Scroll Split Cards",
        slug: "scroll-split-cards",
        badge: "New",
        addedOn: "2026-09-30",
        keywords: [
          "scroll split cards",
          "split cards",
          "scroll cards",
          "triptych",
          "3d flip",
          "scroll animation",
          "panorama split",
        ],
      },
      {
        label: "Scroll Stack",
        slug: "scroll-stack",
        badge: "New",
        addedOn: "2026-10-17",
        keywords: ["fan stack", "card cascade", "deal cards", "stacked cards", "scroll stack"],
      },
      {
        label: "Secure Envelope",
        slug: "secure-envelope",
        badge: "New",
        addedOn: "2026-09-29",
        keywords: [
          "secure envelope",
          "envelope",
          "confidential folder",
          "folder",
          "sleeve",
          "card",
          "ticket",
          "boarding pass",
          "coupon",
          "interactive card",
          "slide out",
          "secret",
          "document",
        ],
      },
      { label: "Select", slug: "select" },
      { label: "Selection Frame", slug: "selection-frame", badge: "New", addedOn: "2026-09-13" },
      { label: "Skeleton", slug: "skeleton" },
      {
        label: "Social Links",
        slug: "social-links",
        badge: "New",
        addedOn: "2026-09-16",
        keywords: ["social", "share", "follow", "github", "linkedin", "x", "twitter", "instagram", "youtube", "brand icons"],
      },
      { label: "Sonner", slug: "sonner" },
      { label: "Squircle Carousel", slug: "squircle-carousel" },
      {
        label: "Split-Flap Display",
        slug: "split-flap",
        badge: "New",
        addedOn: "2026-09-27",
        keywords: [
          "split-flap",
          "split flap",
          "solari board",
          "flip display",
          "airport board",
          "departure board",
          "railway clock",
          "mechanical flip",
          "ticker",
          "3d flip",
        ],
      },
      { label: "Stepper", slug: "stepper" },
      { label: "Table", slug: "table" },
      { label: "Table of Contents", slug: "table-of-contents", badge: "New", addedOn: "2026-09-07" },
      { label: "Tabs", slug: "vertical-tabs" },
      {
        label: "Tech Stack",
        slug: "tech-stack",
        badge: "New",
        addedOn: "2026-09-28",
        keywords: ["tech stack", "built with", "tools", "logos", "logo strip", "brands", "technologies", "powered by"],
      },
      { label: "Theme Switcher", slug: "theme-switcher" },
      { label: "Tilted Card", slug: "tilted-card" },
      { label: "Timeline", slug: "timeline" },
      { label: "Toast", slug: "toast" },
      { label: "Toggle", slug: "toggle" },
      { label: "Toggle Group", slug: "toggle-group" },
      { label: "Tooltip", slug: "tooltip" },
      { label: "User Graph", slug: "user-graph" },
      { label: "Verify Badge", slug: "verify-badge" },
      { label: "Video Accordion", slug: "video-accordion" },
      { label: "Video Player", slug: "video-player" },
      {
        label: "Wallet",
        slug: "wallet",
        badge: "New",
        addedOn: "2026-09-24",
        keywords: [
          "wallet", "cards", "credit card", "fintech", "payment",
          "staggered", "scoop", "reveal balance", "euros", "pounds",
          "emv chip", "interactive", "hover animation",
        ],
      },
      { label: "Wizard", slug: "wizard" },
    ],
  },
  {
    label: "Website Sections",
    children: [
      {
        label: "Auth Forms",
        slug: "auth-forms",
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
        label: "Bento Showcase",
        slug: "bento-showcase",
        badge: "New",
        addedOn: "2026-09-16",
        keywords: ["bento", "showcase", "marketing", "grid", "marquee", "scroll", "outsourcing", "agency", "landing"],
      },
      {
        label: "Book Appointment",
        slug: "book-appointment",
        badge: "New",
        addedOn: "2026-09-13",
        keywords: ["booking", "appointment", "schedule", "calendar", "slots", "doctor", "clinic", "reservation"],
      },
      {
        label: "Component Wall",
        slug: "component-wall",
        badge: "New",
        addedOn: "2026-10-17",
        keywords: ["hero", "wall", "screenshots", "camera", "zoom", "library", "landing", "showcase", "grid"],
      },
      {
        label: "Dashboard",
        slug: "dashboard",
        badge: "New",
        addedOn: "2026-10-01",
        keywords: [
          "dashboard", "admin", "overview", "analytics", "metrics", "kpi",
          "chart", "activity", "feed", "traffic", "sources", "countries",
          "authors", "stats", "greeting", "home",
        ],
      },
      {
        label: "Counter Section",
        slug: "counter-section",
        badge: "New",
        addedOn: "2026-09-24",
        keywords: [
          "counter", "stats", "metrics", "numbers", "kpi",
          "revenue", "satisfaction", "odometer", "ticker", "bento",
          "social proof", "halftone", "hud", "spotlight", "scramble",
        ],
      },
      {
        label: "Flavour Carousel",
        slug: "flavour-carousel",
        badge: "New",
        addedOn: "2026-09-20",
        keywords: ["carousel", "flavour", "flavor", "matcha", "product", "hero", "cup", "drink", "cart", "picker", "ring"],
      },
      {
        label: "Data Flow",
        slug: "data-flow",
        badge: "New",
        addedOn: "2026-09-16",
        keywords: ["data", "flow", "pipeline", "sources", "diagram", "connectors", "ai", "intelligence", "process"],
      },
      { label: "Footer", slug: "footer" },
      {
        label: "FAQ Section",
        slug: "faq-section",
        badge: "New",
        addedOn: "2026-09-27",
        keywords: [
          "faq",
          "faq section",
          "frequently asked questions",
          "accordion",
          "questions",
          "answers",
          "queries",
          "help",
          "support",
          "nature",
          "canvas",
        ],
      },
      {
        label: "Error Section",
        slug: "error-section",
        badge: "New",
        addedOn: "2026-10-12",
        keywords: [
          "error section",
          "error page",
          "500",
          "404",
          "exception",
          "crash",
          "something went wrong",
          "cyberpunk",
          "terminal",
          "aurora glass",
          "maintenance",
        ],
      },
      {
        label: "Not Found Section",
        slug: "not-found-section",
        badge: "New",
        addedOn: "2026-10-12",
        keywords: [
          "not found section",
          "not found",
          "404",
          "404 page",
          "lost in hyperspace",
          "hyperspace",
          "missing route",
          "page not found",
        ],
      },
      {
        label: "Hero",
        slug: "hero",
        badge: "Updated",
        keywords: [
          "hero", "landing", "banner", "above the fold",
          "honeycomb", "hexagon", "mosaic", "norway", "travel", "nature",
          "carousel", "slider", "tour", "queue", "glass", "autoplay",
          "fashion", "lookbook", "editorial", "clothing", "store", "tilt",
          "support", "ai", "saas", "bento", "counter", "cta",
          "collage", "kindergarten", "school", "photos", "badge", "video", "playful",
          "typing", "typewriter", "bounce", "pet shop", "doctor", "healthcare",
        ],
      },
      { label: "Navbar", slug: "navbar" },
      {
        label: "Platform Grid",
        slug: "platform-grid",
        badge: "New",
        addedOn: "2026-09-16",
        keywords: ["platform", "grid", "features", "tiles", "bento", "tools", "catalog", "spotlight"],
      },
      { label: "Pricing Section", slug: "pricing" },
      { label: "Product Details", slug: "product-details" },
      {
        label: "Profile Page",
        slug: "profile-page",
        badge: "New",
        addedOn: "2026-09-13",
        keywords: ["profile", "user profile", "member", "team", "bento", "glass", "glassmorphism"],
      },
      { label: "Review Section", slug: "reviews" },
      { label: "Sidebar Section", slug: "sidebar" },
      { label: "Support Dashboard", slug: "support-dashboard" },
      {
        label: "Newsletter",
        slug: "newsletter",
        badge: "New",
        addedOn: "2026-09-15",
        keywords: ["newsletter", "subscribe", "signup", "email", "mailing list"],
      },
      {
        label: "Top Destinations",
        slug: "top-destinations",
        badge: "New",
        addedOn: "2026-10-17",
        keywords: [
          "top destinations",
          "destinations",
          "travel",
          "exploreo",
          "marquee",
          "parallax",
          "scroll",
          "cards",
          "tourism",
          "vacation",
          "showcase",
        ],
      },
      {
        label: "Waitlist",
        slug: "waitlist",
        badge: "New",
        addedOn: "2026-09-17",
        keywords: ["waitlist", "early access", "coming soon", "launch", "countdown", "signup", "email", "pre-launch", "queue"],
      },
    ],
  },
  {
    label: "Third Party Integration",
    children: [
      {
        label: "Overview",
        slug: "third-party",
        badge: "New",
        addedOn: "2026-09-09",
        keywords: ["integration", "third party", "library", "ecosystem"],
      },
      {
        label: "Carousels",
        slug: "third-party/carousel",
        keywords: ["embla", "swiper", "slider", "slideshow"],
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
      {
        label: "Select",
        slug: "third-party/select",
        keywords: ["react-select", "select2", "combobox", "autocomplete", "multiselect"],
      },
    ],
  },
];

/** The sidebar tree with time-limited badges already resolved. */
export const navigation: NavigationItem[] = expireNewBadges(rawNavigation);
