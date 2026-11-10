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
import { loader } from "./loader";
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
import { verticalTabs } from "./vertical-tabs";
import { accordion } from "./accordion";
import { gallery } from "./gallery";
import { imageCompare } from "./image-compare";
import { cursorAnimation } from "./cursor-animation";
import { toast } from "./toast";
import { themeSwitcher } from "./theme-switcher";
import { chat } from "./chat";
import { calendar } from "./calendar";
import { email } from "./email";
import { aiChat } from "./ai-chat";
import { curvedCarousel } from "./curved-carousel";
import { dataMaps } from "./data-maps";
import { draggableCardList } from "./draggable-card-list";
import { heartSignal } from "./heart-signal";
import { imageViewer } from "./image-viewer";
import { input } from "./input";
import { invoice } from "./invoice";
import { item } from "./item";
import { fleetTracker } from "./fleet-tracker";
import { modernScrollStack } from "./modern-scroll-stack";
import { particleCanvas } from "./particle-canvas";
import { rangeDatePicker } from "./range-date-picker";
import { scrollArea } from "./scroll-area";
import { splitFlap } from "./split-flap";
import { terminal } from "./terminal";
import { counter } from "./counter";
import { designsToolkit } from "./designs-toolkit";
import { glassPanel } from "./glass-panel";
import { otpInput } from "./otp-input";
import { progress } from "./progress";
import { select } from "./select";
import { socialLinks } from "./social-links";
import { table } from "./table";
import { techStack } from "./tech-stack";
import { timeline } from "./timeline";
import { toggleGroup } from "./toggle-group";
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
  loader,
  verticalTabs,
  accordion,
  gallery,
  imageCompare,
  cursorAnimation,
  toast,
  themeSwitcher,
  chat,
  calendar,
  email,
  aiChat,
  curvedCarousel,
  dataMaps,
  draggableCardList,
  heartSignal,
  imageViewer,
  input,
  invoice,
  item,
  fleetTracker,
  modernScrollStack,
  particleCanvas,
  rangeDatePicker,
  scrollArea,
  splitFlap,
  terminal,
  counter,
  designsToolkit,
  glassPanel,
  otpInput,
  progress,
  select,
  socialLinks,
  table,
  techStack,
  timeline,
  toggleGroup,
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
  // One example and one `<Installation>`; the `variant: "masonry-portfolio"` it
  // sets is the only look (audited 2026-11-10).
  "portfolio-showcase",
  // Its variants are placeholder shapes (card, profile, text, rectangle, circle, custom) matched
  // to the content that is loading, plus pulse or no animation as a state. The shape follows the UI
  // being loaded, not a design preference to ask the user about (audited 2026-11-10).
  "skeleton",
  // Its examples are compositions of the Card primitives for different kinds of content (product,
  // stat tile, blog, profile, shop tile, boarding pass, now playing). The recipe follows the content,
  // not a design preference to ask the user about (audited 2026-11-10).
  "card",
  // Its variants are entrance animations of one list (flip, slide up, slide left or right, pop),
  // a motion setting rather than alternative designs; the default is slide-right (audited 2026-11-10).
  "animated-list",
  // Its two examples are different tools in one item (a 360-degree colour wheel and a gradient
  // generator), chosen by the job, not two designs of one tool (audited 2026-11-10).
  "color-picker",
  // Its two examples are scroll-pacing profiles of one cinematic layout (default or slow
  // transition), a setting rather than two designs (audited 2026-11-10).
  "scroll-split-cards",
  // Its variants are text effects (typewriter, blur-reveal, wave, pop-in, flip, spin-in, blur-in-up)
  // shown together in one comparison, with no per-effect example to link to; the effect is a prop
  // (audited 2026-11-10). Give each effect its own example if you want it offered.
  "text-animation",
  // Its styles (solid, outline, modern, glass, glow) are shown together in one comparison and only
  // glass and glow have their own example, so they cannot each carry a live link; the colour scheme
  // is the semantic  (audited 2026-11-10). Give each style its own example to offer it.
  "alert",
  // Its examples differ by hover behaviour (zoom or spread), tooltip type (none, plain, arrow),
  // size and an action slot, all props of one row of faces (audited 2026-11-10).
  "avatar-stack",
  // The page names four visual variants but its examples all show the classic one (icons and
  // path truncation are props), so there are no alternative designs to link to (audited 2026-11-10).
  "breadcrumb",
  // Its examples are states of one picker (an error, disabled past dates, a time column), all props
  // (audited 2026-11-10).
  "date-picker",
  // One example (minimal) beside the default look, so there is no pair of previews to offer
  // (audited 2026-11-10).
  "navigation",
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
      // Found by check:variants on 2026-11-09 (examples with a `variant` prop);
      // not in the original Tier 3 list.
    ] as const
  ).map((slug) => ({ slug, tier: 3 as const })),
];
