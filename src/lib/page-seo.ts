/**
 * Search titles, descriptions and keywords for every docs page.
 *
 * Built from what the page already says — its sidebar group, its H1, the lead
 * paragraph under the H1 and the registry items it installs — so nothing here
 * can claim more than the page does. See SEO.md for the research behind the
 * patterns.
 *
 *   UI components     Shadcn <Name> Component for React & Tailwind - Avara UI
 *   Website sections  Shadcn <Name> Block for React & Tailwind - Avara UI
 *   Guides and hubs   hand-written below
 *
 * "Shadcn <Name>" leads because that is how people search for a registry
 * component ("shadcn accordion", "shadcn data table"), and the shadcn
 * registries that rank (ReUI, shadcn.io, shadcnblocks) title their pages that
 * way. Titles stay within 60 characters so the brand is not cut off.
 *
 * Node-only: reads the MDX source and the registry from disk.
 */

import { SITE_NAME } from "@/config/site";
import { type NavigationChild, navigation } from "@/constants/navigation";
import {
  hasMotionTwin,
  installedItems,
  itemsByName,
  leadSentence,
  usesGsap,
} from "@/lib/docs-source";

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;

/**
 * The name people search for, where the page's H1 is not it: the H1 carries a
 * marketing adjective ("Premium Animated List"), a gloss in brackets ("Dialog
 * (Modal)"), or names the demo rather than the component ("UX Engineered
 * Upload Flow" is a file upload).
 */
const SEARCH_NAMES: Record<string, string> = {
  "ai-chat": "AI Chat",
  alert: "Alert",
  "animated-list": "Animated List",
  calendar: "Calendar",
  "chat-bubble": "Chat Bubble",
  "color-picker": "Color Picker",
  counter: "Counter",
  dialog: "Dialog",
  "file-upload": "File Upload",
  form: "Form",
  "half-stars": "Half Star Rating",
  kbd: "Kbd",
  "qr-code-generator": "QR Code",
  select: "Select",
  skeleton: "Skeleton",
  sonner: "Sonner Toast",
  timeline: "Timeline",
  toast: "Toast",
  "auth-forms": "Login & Signup Form",
  error: "Error Page",
  navbar: "Navbar",
  "not-found": "404 Page",
  pricing: "Pricing Section",
};

/**
 * Snippets for pages whose lead runs past what a search result shows, so the
 * description would otherwise be cut mid-sentence. Each one restates the
 * page's own lead, shorter — no claim here that the page does not make.
 * A description the page passes to docsPageMetadata still wins.
 */
const DESCRIPTIONS: Record<string, string> = {
  // Leads too vague to say what is on the page; these list its examples.
  "3d-carousel": "A 3D carousel with a fanned card layout, a configurable deck length and optional arrows and dots.",
  calendar: "A calendar dashboard with event management, filtering and month, week and day views, in default, minimal, glass and liquid-glass styles.",
  cart: "A shopping cart for online stores in three layouts: a slide-out drawer, a modal and a full cart page.",
  chart: "A custom charting component with bar, line, pie, donut and stacked bar charts, a traffic gauge, visitors by country and metric overview tabs.",
  chat: "A chat app interface with search filtering, simulated typing and replies, unread badges and auto-scroll, in default, minimal, glass and liquid-glass styles.",
  counter: "Animated counters: a slide countdown, steppers in several styles, an animated number ticker, circular progress and a countdown timer.",
  "date-picker": "A dependency-free date picker with an error state, disabled past dates and a date-and-time mode.",
  drawer: "An animated, responsive drawer with a bottom-sheet variant and an option to open on mount.",
  email: "An interactive email client dashboard in default, minimal, glass and liquid-glass styles.",
  "file-upload": "A file upload dropzone with an upload queue and upload states, plus a simple file input and a folder drop target.",
  hero: "Hero sections for landing pages: honeycomb, carousel, fashion, support, collage, bento cascade, word-bounce, typing and split-marquee heroes.",
  loader: "Dependency-free loading indicators: a spinner, dots, a pulse and a bar.",
  navbar: "Responsive navbars and headers: a spotlight pill, centered, floating, minimal and glass navbars, and an e-commerce mega menu.",
  pricing: "Pricing sections: tiered, dot-matrix, scale, elegant, minimal and bordered plan cards, a quote builder, a comparison table and a usage slider.",
  sidebar: "A composable sidebar that handles the mobile flyout and the desktop collapse, with a collapsed icon-rail variant.",
  skeleton: "Skeleton loading placeholders for cards, profiles, text, rectangles and circles, with a pulse or no animation, and custom compositions.",
  "social-links": "Social media icon links for X, GitHub, LinkedIn, YouTube, Instagram, Facebook, Discord, Dribbble and email, each named for screen readers.",
  "support-dashboard": "A helpdesk and support dashboard with a ticket workspace and a table view, in default, glass and liquid-glass styles.",
  terminal: "A dependency-free terminal window in the macOS style for code in any language, in glass and minimal styles, with optional header controls.",
  "tilted-card": "A 3D tilt card with parallax, adjustable tilt strength, an optional glare and a lift on hover.",
  toast: "A toast notification system with typed variants, action buttons, custom durations and glow, glass, stacked and minimal styles.",
  "top-destinations": "A travel destination showcase whose two rows of cards move in opposite directions as you scroll, with GSAP ScrollTrigger and reduced-motion support.",
  "vertical-tabs": "Tabs in horizontal and vertical layouts with underline, segmented, soft, elevated, minimal, bordered and glass styles, and keyboard navigation.",
  // Leads that run past the snippet length, restated shorter.
  "ai-chat": "An AI chat interface with conversation history, typing indicators, editable titles, a model picker, file and @mention tools and voice dictation.",
  "animated-list": "A list that staggers its items into view with 3D perspective transforms and no animation library, plus a glassmorphic spotlight that follows the mouse.",
  "bento-showcase": "A six-card marketing bento grid: a hero with a live chat, case studies on a laptop, scrolling figures, plans on a phone and a team strip.",
  "book-appointment": "A booking section with a practitioner's profile, star ratings, two small charts and a day-and-time slot picker that confirms the appointment.",
  "book-flip": "A 3D book component with realistic page turns, spine shifts, centre-fold shadows, leaf peeking and a toolbar of page controls.",
  "booking-card": "A booking panel for any card: a week-paged strip of days, grouped time slots, a button that reads the choice back, and an animated confirmation.",
  button: "An animated button with a glowing line that runs around its border, a click ripple, loading states and colours that follow your theme.",
  "color-picker": "A 360° colour wheel and gradient generator with lightness and opacity sliders, shades and tints, colour harmonies, an angle dial and one-click CSS copy.",
  "component-wall": "A landing hero for a component library: a headline that keeps one word changing, an install command and two actions between two walls of screenshots.",
  "cursor-animation": "A custom cursor component with 10 animation variants, including fluid physics, particle trails, magnetic targeting, spotlight masking and crosshairs.",
  "curved-carousel": "A full-width 3D curved arc carousel with an auto-sway motion, Motion spring physics, perspective-depth cards and colours from your site theme.",
  dashboard: "An admin dashboard page: totals, a period switch, an overview chart per metric, an activity feed, traffic sources, visitors by country and top authors.",
  "data-flow": "A section showing data sources feeding one central node that fans out to results, with measured connector curves that draw themselves in on scroll.",
  "design-components-folder": "A multi-tab folder showing live AI Chat, Analytics, Auth Form and Terminal components in a desktop window, animated with CSS transitions only.",
  dock: "A macOS-style dock that magnifies icons under the pointer, with label tooltips, active-app indicators, notification badges and a touch-safe mobile layout.",
  "draggable-card-list": "A card list you reorder by dragging, with spring motion in a GSAP build and a Motion build, grip handles, accent bars and pastel badges.",
  error: "A full-page error section in a terminal style, built for Next.js error.tsx and global-error.tsx boundaries and for maintenance pages.",
  flowchart: "A declarative flowchart with responsive column channels, node action anchors and connector lines that draw themselves in with plain CSS animation.",
  footer: "Nine responsive footer layouts for web apps, SaaS platforms, e-commerce stores and enterprise products.",
  gallery: "Six interactive gallery layouts: a 3D photo orbit ring, a 3D video sphere, a self-rearranging bento grid, a reel dial, a pill carousel and a curved arc.",
  "heart-signal": "A heartbeat and pulse visualisation with three animation variants (ECG line, pulse heart, cardiac wave), a live BPM badge and theme colour support.",
  "image-compare": "A before-and-after image comparison slider with 10 comparison modes, touch and mouse dragging, custom labels and colours from your theme.",
  "image-viewer": "Four responsive product image viewers for online stores, with lens zoom, a 3–10× floating loupe, arrow sliders and thumbnail strips.",
  "infrastructure-topology": "An animated infrastructure diagram simulating live data flowing between microservices and a central router, with SVG beam pipelines and live metrics.",
  "modern-scroll-stack": "A scroll-driven section where service cards slide up from the bottom of the viewport, offset and tilted, and stack into a sticky deck.",
  "not-found": "A full-page 404 section with a radial glow, a masked grid backdrop, an animated compass and customisable shortcut links.",
  "particle-canvas": "A 2D canvas component that turns text into thousands of interactive particles that scatter from the pointer and follow your theme colour.",
  piano: "A playable piano with synthesised Web Audio sound, computer-keyboard key bindings, a volume slider and optional key labels.",
  "platform-grid": "A hairline feature grid of icon tiles and larger 2×2 feature cards, with a wave entrance on scroll, a pointer spotlight and per-tile hover tilt.",
  "product-details": "Four responsive product details sections for online stores, with bento hero layouts, glass cards and images that switch with the selected colour.",
  reviews: "A review and testimonial section with either a rotating 3D globe marquee or a 3D stacked portrait carousel with arrow navigation.",
  "secure-envelope": "An envelope card component: a pass slides out on hover and lifts onto the cover on click, with a thumb notch, crest seals and a 3D two-sided flip.",
  "split-flap": "A split-flap (Solari board) display with 3D flipping cards, split creases, hinge notches and synthesised click sounds.",
  "split-scroll-stepper": "A scroll-driven section of numbered accordion cards: the active step expands as you scroll while a sticky mockup beside it cross-fades to match.",
  "tech-stack": "A \"Built with\" strip of tool logos in two rows, cycling through groups such as front end, services and tooling with a blur transition.",
  wallet: "A wallet component with three cards that rise from a pocket in a spring-staggered sequence on hover, a thumb scoop and a balance privacy toggle.",
  wizard: "A Typeform-style multi-step form wizard with vertical slide transitions in plain CSS, keyboard navigation and a progress bar.",
};

/** Keywords where the generated phrasing reads badly (a name with "&" in it). */
const KEYWORDS: Record<string, string[]> = {
  "auth-forms": [
    "shadcn login form",
    "shadcn signup form",
    "shadcn auth form",
    "react login form",
    "react register form",
    "tailwind login form",
    "next.js login page",
    SITE_NAME.toLowerCase(),
  ],
};

type Seo = { title: string; description?: string; keywords: string[] };

/** Guides and hub pages, written by hand. Descriptions left out use the page's own. */
const PAGE_SEO: Record<string, Seo> = {
  index: {
    title: `Introduction - Shadcn UI Component Registry - ${SITE_NAME}`,
    description: `What ${SITE_NAME} is, how its shadcn registry installs components into your project, and what your project needs.`,
    keywords: ["shadcn registry", "shadcn ui components", "shadcn cli", "react component library", "tailwind css components"],
  },
  mcp: {
    title: `Shadcn MCP Server Setup for AI Agents - ${SITE_NAME}`,
    description: `Connect Claude Code, Cursor, VS Code, Codex or OpenCode to the ${SITE_NAME} registry through the shadcn MCP server, and install components from a prompt.`,
    keywords: ["shadcn mcp", "shadcn mcp server", "mcp server", "claude code shadcn", "cursor shadcn", "ai coding agent ui components"],
  },
  "all-components": {
    title: `All Shadcn UI Components & Blocks - ${SITE_NAME}`,
    description: `Every ${SITE_NAME} component and website section in one catalog, grouped by type and filterable by GSAP or Motion animation.`,
    keywords: ["shadcn ui components", "shadcn components", "shadcn blocks", "free shadcn components", "animated shadcn components", "react components", "tailwind css components"],
  },
  "third-party": {
    title: `Third-Party React Libraries with Shadcn UI - ${SITE_NAME}`,
    keywords: ["shadcn third party", "shadcn integration", "react libraries tailwind", "shadcn theme tokens"],
  },
  "third-party/carousel": {
    title: `Embla & Swiper Carousels with Shadcn UI - ${SITE_NAME}`,
    keywords: ["embla carousel shadcn", "swiper shadcn", "react carousel tailwind", "shadcn carousel"],
  },
  "third-party/charts": {
    title: `Recharts & Chart.js with Shadcn UI Tokens - ${SITE_NAME}`,
    keywords: ["recharts shadcn", "chart.js shadcn", "shadcn charts", "react charts tailwind"],
  },
  "third-party/tables": {
    title: `TanStack Table & AG Grid with Shadcn UI - ${SITE_NAME}`,
    keywords: ["tanstack table shadcn", "ag grid shadcn", "shadcn data table", "react data grid tailwind"],
  },
  "third-party/gallery": {
    title: `React Photo Album & Lightbox with Shadcn UI - ${SITE_NAME}`,
    keywords: ["react photo album", "yet another react lightbox", "shadcn gallery", "react lightbox tailwind"],
  },
  "third-party/select": {
    title: `react-select Styled for Shadcn UI - ${SITE_NAME}`,
    keywords: ["react-select shadcn", "react-select tailwind", "shadcn multi select", "searchable select react"],
  },
};

/** Where a slug sits in the sidebar. */
function findInSidebar(slug: string): { group: string; child: NavigationChild } | undefined {
  const walk = (children: NavigationChild[], group: string): { group: string; child: NavigationChild } | undefined => {
    for (const child of children) {
      if (child.slug === slug) return { group, child };
      const hit = child.children && walk(child.children, group);
      if (hit) return hit;
    }
  };
  for (const group of navigation) {
    const hit = walk(group.children, group.label);
    if (hit) return hit;
  }
}

/** Shortens to whole sentences, or failing that whole words, within the limit. */
export function clampDescription(text: string): string {
  if (text.length <= MAX_DESCRIPTION) return text;
  const head = text.slice(0, MAX_DESCRIPTION);
  const sentenceEnd = Math.max(head.lastIndexOf(". "), head.lastIndexOf("! "), head.lastIndexOf("? "));
  if (sentenceEnd > 80) return head.slice(0, sentenceEnd + 1);
  return `${head.slice(0, head.lastIndexOf(" ", MAX_DESCRIPTION - 1)).replace(/[,;:—–-]$/, "")}…`;
}

const firstSentence = (text: string) => text.split(/(?<=[.!?])\s+(?=[A-Z`])/)[0];

/** The first title that fits, or the shortest when none does. */
const fitTitle = (candidates: string[]) =>
  candidates.find((t) => t.length <= MAX_TITLE) ?? candidates[candidates.length - 1];

/**
 * The page's own summary, kept within the snippet length, plus one sentence
 * that is true of the page: it is free shadcn/ui code, and — only where the
 * page installs them — it animates with GSAP and ships a Motion build.
 */
function describe(summary: string, noun: string, gsap: boolean, motion: boolean): string {
  let base = summary.trim();
  if (base && !/[.!?…]$/.test(base)) base += ".";
  if (base.length > MAX_DESCRIPTION) {
    const first = firstSentence(base);
    base = first.length <= MAX_DESCRIPTION ? first : clampDescription(base);
  }
  const suffixes = [
    ...(motion ? [`Free shadcn/ui ${noun} with GSAP and Motion builds.`, "GSAP and Motion builds."] : []),
    ...(gsap && !motion ? [`Free shadcn/ui ${noun} animated with GSAP.`, "Animated with GSAP."] : []),
    `Free shadcn/ui ${noun} for React and Tailwind CSS.`,
    `Free shadcn/ui ${noun}.`,
  ];
  const suffix = suffixes.find((s) => `${base} ${s}`.length <= MAX_DESCRIPTION);
  return suffix ? `${base} ${suffix}` : base;
}

/**
 * Search terms a page genuinely answers: its name in the forms people type
 * ("shadcn x", "react x component", "tailwind x"), the animation library only
 * when it uses one, and the sidebar's own synonyms ("login", "sign up" for
 * the auth forms).
 */
function keywordsFor(name: string, kind: "component" | "block", gsap: boolean, motion: boolean, synonyms: string[] = []) {
  const n = name.toLowerCase();
  const typed = SELF_DESCRIBING.test(n);
  const terms = [
    `shadcn ${n}`,
    ...(typed ? [] : [`shadcn ${n} ${kind}`]),
    typed ? `react ${n}` : `react ${n} ${kind === "block" ? "section" : "component"}`,
    `tailwind ${n}`,
    `next.js ${n}`,
    ...(gsap || motion ? [`animated ${n}`] : []),
    ...(gsap ? [`gsap ${n}`] : []),
    ...(motion ? [`framer motion ${n}`] : []),
    // The first few sidebar synonyms are what the page is also called; later
    // ones tend to describe a demo's content ("norway", "travel"), not the page.
    ...synonyms.slice(0, 4).map((s) => s.toLowerCase()),
    SITE_NAME.toLowerCase(),
  ];
  return [...new Set(terms)];
}

/** Names that already say what kind of thing they are ("FAQ Section", "404 Page"). */
const SELF_DESCRIBING = /\b(sections?|blocks?|components?|forms?|pages?|dashboards?)$/i;

/**
 * Title, description and keywords for a docs page.
 *
 * `heading` is the page's H1 (or the title a page passes in), `description` a
 * description the page wrote for itself, which wins over the generated one.
 */
export function pageSeo(
  slug: string,
  heading: string,
  source: string,
  description?: string,
): Seo {
  const items = installedItems(source);
  const summary =
    description ??
    DESCRIPTIONS[slug] ??
    leadSentence(source) ??
    itemsByName.get(items[0] ?? "")?.description ??
    "";

  const hand = PAGE_SEO[slug];
  if (hand) return { ...hand, description: hand.description ?? (summary ? clampDescription(summary) : undefined) };

  const place = findInSidebar(slug);
  const kind =
    place?.group === "Website Sections" ? "block" : place?.group === "Ui Components" || items.length ? "component" : null;

  // Guides and anything else without components: the page's own name and words.
  if (!kind) {
    return {
      title: `${heading} - ${SITE_NAME}`,
      description: summary ? clampDescription(summary) : undefined,
      keywords: [],
    };
  }

  const name = (SEARCH_NAMES[slug] ?? heading).replace(/^Shadcn\s+/i, "");
  const gsap = items.some((item) => usesGsap(item));
  const motion = items.some(hasMotionTwin);
  const label = kind === "block" ? "Block" : "Component";
  // Leave the label off a name that already says what it is ("FAQ Section").
  const named = SELF_DESCRIBING.test(name) ? name : `${name} ${label}`;

  return {
    title: fitTitle([
      `Shadcn ${named} for React & Tailwind - ${SITE_NAME}`,
      `Shadcn ${named} for React - ${SITE_NAME}`,
      `Shadcn ${named} - ${SITE_NAME}`,
      `Shadcn ${name} - ${SITE_NAME}`,
    ]),
    description: summary ? describe(summary, kind, gsap, motion) : undefined,
    keywords: KEYWORDS[slug] ?? keywordsFor(name, kind, gsap, motion, place?.child.keywords),
  };
}
