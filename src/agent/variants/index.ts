import { hero } from "./hero";
import type { PageVariants } from "./types";

export type { PageVariants, Variant } from "./types";

/** Every docs page that has a variants file. Add new pages here. */
export const pageVariants: PageVariants[] = [hero];

/**
 * Pages confirmed to offer a single option: the agent installs them without
 * asking. Add a page here only after reading it (AGENT-WORKFLOW-PLAN.md,
 * section 7). `check:variants` rejects a page that is here and also has a file.
 */
export const NO_CHOICE_NEEDED: string[] = [
  // One example, one `<Installation>`, no `variant` prop (confirmed 2026-11-09).
  "data-flow",
];

/**
 * Pages not classified yet. `check:variants` prints this list as a warning,
 * not a failure, so the build stays green while the roll-out (Phases 5A, 5B,
 * 5C) runs. When a page gets a variants file or moves to NO_CHOICE_NEEDED,
 * delete it from here. Tier 3 pages are audited first: they may end up in
 * NO_CHOICE_NEEDED.
 */
export const PENDING_ROLLOUT: { slug: string; tier: 1 | 2 | 3 }[] = [
  // Tier 1: separate registry items per variant
  ...(
    [
      "scroll-stack",
      "file-upload",
      "video-player",
      "audio-player",
      "auth-forms",
      "design-components-folder",
      "qr-code-generator",
    ] as const
  ).map((slug) => ({ slug, tier: 1 as const })),

  // Tier 2: website sections with several looks (and the five that are
  // probably single-option: bento-showcase, flavour-carousel, error,
  // platform-grid, to confirm one by one; data-flow is confirmed)
  ...(
    [
      "footer",
      "navbar",
      "pricing",
      "profile-page",
      "top-destinations",
      "component-wall",
      "support-dashboard",
      "counter-section",
      "cta-section",
      "reviews",
      "product-details",
      "newsletter",
      "waitlist",
      "not-found",
      "dashboard",
      "faq-section",
      "sidebar",
      "book-appointment",
      "bento-showcase",
      "flavour-carousel",
      "error",
      "platform-grid",
    ] as const
  ).map((slug) => ({ slug, tier: 2 as const })),

  // Tier 3: UI components with `variant` props (audit first)
  ...(
    [
      "accordion",
      "ai-chat",
      "animated-list",
      "calendar",
      "card",
      "chat",
      "color-picker",
      "cursor-animation",
      "curved-carousel",
      "data-maps",
      "draggable-card-list",
      "gallery",
      "heart-signal",
      "image-compare",
      "image-viewer",
      "input",
      "invoice",
      "item",
      "loader",
      "email",
      "fleet-tracker",
      "modern-scroll-stack",
      "particle-canvas",
      "range-date-picker",
      "scroll-area",
      "scroll-split-cards",
      "skeleton",
      "split-flap",
      "terminal",
      "text-animation",
      "theme-switcher",
      "toast",
      "vertical-tabs",
      // Found by check:variants on 2026-11-09 (examples with a `variant` prop);
      // not in the original Tier 3 list.
      "alert",
      "avatar-stack",
      "breadcrumb",
      "counter",
      "date-picker",
      "designs-toolkit",
      "glass-panel",
      "navigation",
      "otp-input",
      "progress",
      "select",
      "social-links",
      "table",
      "tech-stack",
      "timeline",
      "toggle-group",
    ] as const
  ).map((slug) => ({ slug, tier: 3 as const })),
];
