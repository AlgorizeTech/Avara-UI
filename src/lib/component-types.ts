import {
	AppWindow,
	Bell,
	ChartSpline,
	Compass,
	Images,
	Layers,
	LayoutPanelLeft,
	LayoutTemplate,
	Megaphone,
	MessagesSquare,
	MousePointerClick,
	PanelTop,
	Sparkles,
	Table,
	TextCursorInput,
	type LucideIcon,
} from "lucide-react";

/* Site-only. What the "All components" page's filter chips and section headings
   group by, and what the home page's directory groups by, so the two can never
   disagree. Every Ui Components / Website Sections slug in the sidebar belongs to
   exactly one type; a page that is not listed here lands in "More Components" or
   "More Sections" until it is. */

export type ComponentTypeDef = {
	label: string;
	description: string;
	icon: LucideIcon;
	kind: "ui" | "section";
	slugs: string[];
};

export const COMPONENT_TYPES = {
	actions: {
		label: "Buttons & Actions",
		description: "Buttons, toggles, switches and the small controls a reader clicks.",
		icon: MousePointerClick,
		kind: "ui",
		slugs: ["button", "copy-button", "toggle", "toggle-group", "theme-switcher", "social-links", "kbd", "floating-contact-button", "verify-badge"],
	},
	forms: {
		label: "Forms & Inputs",
		description: "Fields, pickers and multi-step flows for collecting input.",
		icon: TextCursorInput,
		kind: "ui",
		slugs: ["input", "form", "select", "otp-input", "date-picker", "range-date-picker", "calendar", "booking-card", "color-picker", "file-upload", "half-stars", "stepper", "split-stepper", "split-scroll-stepper", "wizard"],
	},
	navigation: {
		label: "Navigation & Menus",
		description: "Menus, tabs, palettes and wayfinding.",
		icon: Compass,
		kind: "ui",
		slugs: ["breadcrumb", "menubar", "navigation", "pagination", "command", "context-menu", "dock", "vertical-tabs", "table-of-contents", "conversation-timeline"],
	},
	overlays: {
		label: "Overlays & Feedback",
		description: "Dialogs, popovers, toasts and loading states.",
		icon: Bell,
		kind: "ui",
		slugs: ["alert", "dialog", "modal", "drawer", "popover", "tooltip", "toast", "sonner", "loader", "progress", "skeleton"],
	},
	layout: {
		label: "Layout & Containers",
		description: "Panels, grids and disclosure containers that hold other content.",
		icon: LayoutPanelLeft,
		kind: "ui",
		slugs: ["accordion", "collapsible", "resizable", "scroll-area", "item", "masonry-grid", "glass-panel", "magic-bento", "mobile-mockup"],
	},
	cards: {
		label: "Cards & Stacks",
		description: "Cards, decks, folders and scroll-driven stacks.",
		icon: Layers,
		kind: "ui",
		slugs: ["card", "card-stack", "tilted-card", "memories-card", "wallet", "folder", "secure-envelope", "design-components-folder", "scroll-stack", "scroll-split-cards", "draggable-card-list", "book-flip"],
	},
	data: {
		label: "Data Display",
		description: "Tables, timelines, counters and readouts.",
		icon: Table,
		kind: "ui",
		slugs: ["table", "data-table", "data-grid", "invoice", "counter", "split-flap", "avatar-stack", "timeline", "animated-timeline", "radial-orbital-timeline", "custom-code-block", "terminal", "api-playground", "tech-stack", "qr-code-generator"],
	},
	charts: {
		label: "Charts, Maps & Graphs",
		description: "Data visualisation, maps and node graphs.",
		icon: ChartSpline,
		kind: "ui",
		slugs: ["chart", "data-maps", "fleet-tracker", "user-graph", "network-graph", "infrastructure-topology", "flowchart"],
	},
	media: {
		label: "Media & Carousels",
		description: "Carousels, galleries, players and tickers.",
		icon: Images,
		kind: "ui",
		slugs: ["gallery", "carousel", "3d-carousel", "curved-carousel", "squircle-carousel", "flow-gallery", "image-compare", "image-wall", "marquee", "video-player", "audio-player", "video-accordion"],
	},
	apps: {
		label: "Apps & Messaging",
		description: "Chat, inbox, cart and other self-contained mini apps.",
		icon: MessagesSquare,
		kind: "ui",
		slugs: ["ai-chat", "chat", "chat-bubble", "email", "cart", "piano"],
	},
	effects: {
		label: "Text & Effects",
		description: "Animated type, cursors, particles and decorative motion.",
		icon: Sparkles,
		kind: "ui",
		slugs: ["animated-typography", "animated-list", "circular-text", "cursor-animation", "particle-canvas", "heart-signal", "selection-frame", "apple-select", "text-animation"],
	},
	"more-ui": {
		label: "More Components",
		description: "Components not yet sorted into a type.",
		icon: AppWindow,
		kind: "ui",
		slugs: [],
	},
	heroes: {
		label: "Hero Sections",
		description: "Above-the-fold openers for landing pages.",
		icon: LayoutTemplate,
		kind: "section",
		slugs: ["hero", "component-wall", "flavour-carousel"],
	},
	marketing: {
		label: "Marketing Sections",
		description: "Features, stats, pricing, social proof and sign-ups.",
		icon: Megaphone,
		kind: "section",
		slugs: ["bento-showcase", "platform-grid", "data-flow", "counter-section", "cta-section", "pricing", "reviews", "faq-section", "newsletter", "waitlist"],
	},
	chrome: {
		label: "Headers & Footers",
		description: "Navbars, sidebars and footers that frame a page.",
		icon: PanelTop,
		kind: "section",
		slugs: ["navbar", "sidebar", "footer"],
	},
	pages: {
		label: "Pages & App Screens",
		description: "Full screens: auth, dashboards, profiles and product pages.",
		icon: AppWindow,
		kind: "section",
		slugs: ["auth-forms", "book-appointment", "dashboard", "support-dashboard", "profile-page", "product-details", "image-viewer"],
	},
	"more-sections": {
		label: "More Sections",
		description: "Sections not yet sorted into a type.",
		icon: LayoutTemplate,
		kind: "section",
		slugs: [],
	},
} satisfies Record<string, ComponentTypeDef>;

export type ComponentTypeId = keyof typeof COMPONENT_TYPES;

export const TYPE_IDS = Object.keys(COMPONENT_TYPES) as ComponentTypeId[];

export const TYPE_OF_SLUG = new Map<string, ComponentTypeId>(
	TYPE_IDS.flatMap((id) =>
		(COMPONENT_TYPES[id] as ComponentTypeDef).slugs.map((slug) => [slug, id] as const),
	),
);
