import { audioPlayer } from "./audio-player";
import { authForms } from "./auth-forms";
import { bookAppointment } from "./book-appointment";
import { componentWall } from "./component-wall";
import { counterSection } from "./counter-section";
import { ctaSection } from "./cta-section";
import { dashboard } from "./dashboard";
import { faqSection } from "./faq-section";
import { fileUpload } from "./file-upload";
import { footer } from "./footer";
import { hero } from "./hero";
import { navbar } from "./navbar";
import { newsletter } from "./newsletter";
import { notFound } from "./not-found";
import { pricing } from "./pricing";
import { productDetails } from "./product-details";
import { profilePage } from "./profile-page";
import { reviews } from "./reviews";
import { scrollStack } from "./scroll-stack";
import { supportDashboard } from "./support-dashboard";
import { videoPlayer } from "./video-player";
import { waitlist } from "./waitlist";
import type { PageVariants } from "./types";

export type { PageVariants, Variant } from "./types";

/** Every docs page that has a variants file. Add new pages here. */
export const pageVariants: PageVariants[] = [
  hero,
  footer,
  navbar,
  pricing,
  scrollStack,
  fileUpload,
  videoPlayer,
  audioPlayer,
  authForms,
  profilePage,
  componentWall,
  supportDashboard,
  counterSection,
  ctaSection,
  reviews,
  productDetails,
  newsletter,
  waitlist,
  notFound,
  dashboard,
  faqSection,
  bookAppointment,
];

/**
 * Pages confirmed to offer a single option: the agent installs them without
 * asking. Add a page here only after reading it (AGENT-WORKFLOW-PLAN.md,
 * section 7). `check:variants` rejects a page that is here and also has a file.
 */
export const NO_CHOICE_NEEDED: string[] = [
  // One example, one `<Installation>`, no `variant` prop (confirmed 2026-11-09).
  "data-flow",
  // Two items on the page, but they do different jobs (render vs scan), not
  // alternative designs of one section (audited 2026-11-09).
  "qr-code-generator",
  // A components showcase and a decorative frosted-glass folder shape: two
  // different components, not two designs of one (audited 2026-11-09).
  "design-components-folder",
  // One example and one `<Installation>` each, no `variant` prop (audited 2026-11-09).
  "top-destinations",
  "bento-showcase",
  "flavour-carousel",
  "error",
  "platform-grid",
  // Its two examples differ only by `defaultExpanded` (open or icon rail): a
  // state of one design, not two designs (audited 2026-11-09).
  "sidebar",
];

/**
 * Pages not classified yet. `check:variants` prints this list as a warning,
 * not a failure, so the build stays green while the roll-out (Phases 5A, 5B,
 * 5C) runs. When a page gets a variants file or moves to NO_CHOICE_NEEDED,
 * delete it from here. Tier 3 pages are audited first: they may end up in
 * NO_CHOICE_NEEDED.
 */
export const PENDING_ROLLOUT: { slug: string; tier: 1 | 2 | 3 }[] = [
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
