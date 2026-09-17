"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsHref, frameworkFromPathname } from "@/lib/framework";
import {
	Boxes,
	LayoutTemplate,
	ArrowRight,
	LayoutGrid,
} from "lucide-react";
import { navigation } from "@/constants/navigation";
import { sandboxNames } from "@/preview/names";
import {
	ComponentPreviewTooltip,
	useComponentPreviewHover,
} from "@/components/site/ComponentPreviewTooltip";
import { IconSlideButton } from "@/components/ui/icon-slide-button";

/* ═══════════════════════════════════════════════
   PREVIEW CARD DATA MODEL & ITEMS (DYNAMICALLY SYNCED WITH SIDEBAR NAVIGATION)
   ═══════════════════════════════════════════════ */

type PreviewCardItem = {
	title: string;
	countText: string;
	slug?: string;
	href?: string;
	badge?: string;
	illustrationType: string;
	/** Sandbox demo shown on hover, or null where the page has no registered demo. */
	previewName: string | null;
};

type PreviewCategoryGroup = {
	categoryTitle: string;
	categorySubtitle: string;
	icon: any;
	items: PreviewCardItem[];
};

const COMPONENT_META: Record<
	string,
	{ countText: string; illustrationType?: string; titleOverride?: string }
> = {
	// Ui Components
	accordion: { countText: "Expandable Panels", illustrationType: "accordion" },
	"ai-chat": { countText: "Streaming Interface", illustrationType: "chat" },
	alert: { countText: "Notification Banners", illustrationType: "modal" },
	"api-playground": { countText: "API Tester", illustrationType: "api-playground" },
	"apple-select": { countText: "iOS Text Selection", illustrationType: "apple-select" },
	"selection-frame": { countText: "Figma Selection Box", illustrationType: "selection-frame" },
	breadcrumb: { countText: "Path Navigation", illustrationType: "breadcrumb" },
	button: { countText: "5+ Action Styles", illustrationType: "button", titleOverride: "Modern Buttons" },
	calendar: { countText: "Date Picker Grid", illustrationType: "calendar" },
	card: { countText: "Content Containers", illustrationType: "card" },
	carousel: { countText: "Slide Showcase", illustrationType: "carousel" },
	cart: { countText: "E-commerce Drawer", illustrationType: "cart" },
	chart: { countText: "SVG Data Viz", illustrationType: "chart" },
	chat: { countText: "Messaging Feed", illustrationType: "chat" },
	collapsible: { countText: "Toggle Content", illustrationType: "collapsible" },
	"color-picker": { countText: "360° Spectrum Studio", illustrationType: "color-picker" },
	piano: { countText: "Acoustic Synthesizer", illustrationType: "piano" },
	command: { countText: "Cmd+K Palette", illustrationType: "command" },
	"context-menu": { countText: "Right Click Menu", illustrationType: "context-menu" },
	"conversation-timeline": { countText: "Chat Minimap Rail", illustrationType: "conversation-timeline" },
	"copy-button": { countText: "Clipboard Confirm", illustrationType: "copy-button" },
	counter: { countText: "Animated Numbers", illustrationType: "counter" },
	"custom-code-block": { countText: "Code Highlighter", illustrationType: "code-block" },
	"data-grid": { countText: "Advanced Grid", illustrationType: "data-grid" },
	"data-maps": { countText: "Vector Map Analytics", illustrationType: "data-maps" },
	"data-table": { countText: "Sortable Table", illustrationType: "data-table" },
	"date-picker": { countText: "Calendar Input", illustrationType: "date-picker" },
	dialog: { countText: "Modal Dialog", illustrationType: "dialog" },
	drawer: { countText: "Slideover Sheet", illustrationType: "drawer" },
	folder: { countText: "Tactile File Folder", illustrationType: "folder" },
	form: { countText: "Validated Forms", illustrationType: "form" },
	"half-stars": { countText: "Rating Stars", illustrationType: "half-stars" },
	"audio-player": { countText: "Audio Hero & Bar", illustrationType: "hero-videoplayer" },
	"video-player": { countText: "Video Players", illustrationType: "hero-videoplayer" },
	"image-compare": { countText: "Before & After Slider", illustrationType: "image-compare" },
	input: { countText: "Text & Fields", illustrationType: "input" },
	invoice: { countText: "Billing Paper", illustrationType: "invoice" },
	item: { countText: "List Items", illustrationType: "item" },
	kbd: { countText: "Key Badges", illustrationType: "kbd" },
	loader: { countText: "Spinners & Pulse", illustrationType: "loader" },
	email: { countText: "Inbox Feed", illustrationType: "mails", titleOverride: "Mails" },
	"fleet-tracker": { countText: "Fleet Tracker Map", illustrationType: "map", titleOverride: "Map" },
	"masonry-grid": { countText: "Staggered Layout", illustrationType: "masonry" },
	menubar: { countText: "Top App Navigation", illustrationType: "menubar" },
	"mobile-mockup": { countText: "Device Frame", illustrationType: "mobile-mockup", titleOverride: "Mobile Mockups" },
	modal: { countText: "Overlays & Popups", illustrationType: "modal" },
	navigation: { countText: "Responsive Header", illustrationType: "navbar" },
	"otp-input": { countText: "Verification Code", illustrationType: "otp-input" },
	pagination: { countText: "Page Controls", illustrationType: "pagination" },
	popover: { countText: "Context Popup", illustrationType: "popover" },
	progress: { countText: "Loading Bars", illustrationType: "progress" },
	"qr-code-generator": { countText: "QR Generator", illustrationType: "qr", titleOverride: "QR Code" },
	"range-date-picker": { countText: "Priced Range Calendar", illustrationType: "range-date-picker" },
	resizable: { countText: "Split Panels", illustrationType: "resizable" },
	"scroll-area": { countText: "Custom Scrollbar", illustrationType: "scroll-area" },
	select: { countText: "Dropdown Menu", illustrationType: "select" },
	skeleton: { countText: "Shimmer States", illustrationType: "skeleton" },
	sonner: { countText: "Toast Stream", illustrationType: "sonner" },
	stepper: { countText: "Wizard Flow", illustrationType: "stepper" },
	table: { countText: "Data Layout", illustrationType: "table" },
	"vertical-tabs": { countText: "Horizontal & Vertical", illustrationType: "tabs", titleOverride: "Tabs" },
	"theme-switcher": { countText: "Light/Dark Toggle", illustrationType: "theme-switcher" },
	timeline: { countText: "History Feed", illustrationType: "timeline" },
	toast: { countText: "Popup Alert", illustrationType: "toast" },
	toggle: { countText: "Switch Button", illustrationType: "toggle" },
	"toggle-group": { countText: "Segmented Control", illustrationType: "toggle-group" },
	tooltip: { countText: "Hover Labels", illustrationType: "tooltip" },
	"user-graph": { countText: "User Hierarchy Tree", illustrationType: "user-graph" },
	"verify-badge": { countText: "Trust Badge", illustrationType: "verify-badge" },
	wizard: { countText: "Multi-Step Form", illustrationType: "wizard" },

	// Ui Components (motion-driven; formerly a separate "Animated Ui Components" group)
	"avatar-stack": { countText: "Overlapping Faces", illustrationType: "avatar-stack" },
	"book-flip": { countText: "3D Page Turns", illustrationType: "book-flip" },
	"booking-card": { countText: "Days & Time Slots", illustrationType: "booking-card" },
	"circular-text": { countText: "Rotating Ring Text", illustrationType: "circular-text" },
	"draggable-card-list": { countText: "Spring Reorder List", illustrationType: "draggable-card-list" },
	"flow-gallery": { countText: "3D Cascading Stream", illustrationType: "flow-gallery" },
	"glass-panel": { countText: "Frosted Aurora Surface", illustrationType: "glass-panel" },
	"infrastructure-topology": { countText: "Live Service Mesh", illustrationType: "infrastructure-topology" },
	"social-links": { countText: "Brand Mark Row", illustrationType: "social-links" },
	"squircle-carousel": { countText: "Masked Tile Slider", illustrationType: "squircle-carousel" },
	"table-of-contents": { countText: "Scroll-Spy Nav", illustrationType: "table-of-contents" },
	"3d-carousel": { countText: "3D Physics Spring", illustrationType: "carousel" },
	"animated-list": { countText: "Staggered Entrance", illustrationType: "animated-list" },
	"chat-bubble": { countText: "Spring Motion Feed", illustrationType: "chat" },
	"design-components-folder": { countText: "Animated File Deck", illustrationType: "design-components-folder" },
	"cursor-animation": { countText: "10 Fluid Variants", illustrationType: "cursor-animation" },
	"curved-carousel": { countText: "3D Arc Sway Deck", illustrationType: "curved-carousel" },
	dock: { countText: "macOS Magnification", illustrationType: "dock" },
	"file-upload": { countText: "Drag & Drop Motion", illustrationType: "file-upload" },
	"floating-contact-button": { countText: "Animated Action", illustrationType: "floating-contact" },
	"heart-signal": { countText: "Pulse Beacon", illustrationType: "heart-signal" },
	"magic-bento": { countText: "Glow & Tilt Grid", illustrationType: "magic-bento" },
	"memories-card": { countText: "Stackable Cards", illustrationType: "memories-card" },
	"network-graph": { countText: "Node Graph Canvas", illustrationType: "network-graph" },
	"particle-canvas": { countText: "Interactive Particles", illustrationType: "particle-canvas" },
	"scroll-stack": { countText: "Stacking Cards", illustrationType: "scroll-stack" },
	"tilted-card": { countText: "3D Parallax Tilt", illustrationType: "tilted-card" },
	"animated-timeline": { countText: "Animated History", illustrationType: "timeline" },
	"radial-orbital-timeline": { countText: "Orbital Interactive", illustrationType: "timeline" },
	"animated-typography": { countText: "Animated Text", illustrationType: "typography" },
	"video-accordion": { countText: "Interactive Media", illustrationType: "video-accordion" },

	// Website Sections
	"signup-form": { countText: "Login & Register", illustrationType: "auth" },
	footer: { countText: "4 Responsive Variants", illustrationType: "footer" },
	hero: { countText: "Landing Page Showcase", illustrationType: "hero" },
	marquee: { countText: "Infinite Logo Ticker", illustrationType: "marquee" },
	navbar: { countText: "Responsive Header", illustrationType: "navbar" },
	pricing: { countText: "Tier & Feature Matrix", illustrationType: "pricing" },
	"product-details": { countText: "4 Unique Layouts", illustrationType: "product-details" },
	reviews: { countText: "Testimonial Grid", illustrationType: "reviews" },
	sidebar: { countText: "App Shell Layout", illustrationType: "sidebar" },
	"support-dashboard": { countText: "Full SaaS Dashboard", illustrationType: "dashboard" },
	"bento-showcase": { countText: "Six-Card Marketing Bento", illustrationType: "bento-showcase" },
	"book-appointment": { countText: "Practitioner Booking Flow", illustrationType: "book-appointment" },
	"collage-hero": { countText: "Playful Photo Collage", illustrationType: "collage-hero" },
	"data-flow": { countText: "Sources → Node → Results", illustrationType: "data-flow" },
	"fashion-hero": { countText: "Staggered Lookbook", illustrationType: "fashion-hero" },
	"platform-grid": { countText: "Hairline Feature Grid", illustrationType: "platform-grid" },
	"profile-page": { countText: "Glass Bento & 24h Dial", illustrationType: "profile-page" },
	"support-hero": { countText: "Frosted Bento Hero", illustrationType: "support-hero" },
	newsletter: { countText: "3 Sign-up Layouts", illustrationType: "newsletter" },
	waitlist: { countText: "Countdown & Queue", illustrationType: "waitlist" },
};

const CATEGORY_META: Record<string, { subtitle: string; icon: any }> = {
	"Ui Components": {
		subtitle: "Primitive building blocks and fluid, motion-driven components for clean, high-performance web applications.",
		icon: Boxes,
	},
	"Website Sections": {
		subtitle: "Production-ready full section blocks for landing pages and SaaS platforms.",
		icon: LayoutTemplate,
	},
};

/**
 * Slugs whose docs page shows a demo registered under a different name. Every
 * other card resolves by slug, so this list only needs the mismatches — a new
 * component with a matching demo name is picked up with no edit here.
 */
const PREVIEW_NAME_OVERRIDES: Record<string, string> = {
	"3d-carousel": "carousel-3d",
	"data-table": "advanced-table",
	"file-upload": "upload",
	"fleet-tracker": "fleet",
	navigation: "navigation-menu",
	"qr-code-generator": "qr-code",
	"support-dashboard": "support",
};

const registeredDemos = new Set<string>(sandboxNames);

/** The sandbox demo a card hovers into, or null when none is registered. */
function resolvePreviewName(slug?: string): string | null {
	if (!slug) return null;
	const name = PREVIEW_NAME_OVERRIDES[slug] ?? slug;
	return registeredDemos.has(name) ? name : null;
}

const componentPreviewData: PreviewCategoryGroup[] = navigation
	.filter((group) => CATEGORY_META[group.label])
	.map((group) => {
		const meta = CATEGORY_META[group.label];
		return {
			categoryTitle: group.label,
			categorySubtitle: meta.subtitle,
			icon: meta.icon,
			items: group.children.map((child) => {
				const itemMeta = COMPONENT_META[child.slug || ""] || {};
				return {
					title: itemMeta.titleOverride || child.label,
					countText: itemMeta.countText || "Interactive Demo",
					slug: child.slug,
					badge: child.badge,
					illustrationType: itemMeta.illustrationType || child.slug || "card",
					previewName: resolvePreviewName(child.slug),
				};
			}),
		};
	});

function CardHeaderMockup({ title }: { title: string }) {
	return (
		<div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
			<div className="flex items-center gap-1">
				<span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
				<span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
				<span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
			</div>
			<span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">
				{title.toLowerCase().replace(/\s+/g, "-")}.tsx
			</span>
			<div className="size-2 rounded-full bg-primary/40" />
		</div>
	);
}

function MiniatureIllustration({
	title,
	type,
}: {
	title: string;
	type: string;
}) {
	return (
		<div className="w-full h-full rounded-xl border border-border/80 bg-gradient-to-b from-card to-muted/30 pt-1.5 p-2.5 flex flex-col justify-between overflow-hidden relative group-hover:border-primary/50 transition-colors">
			<CardHeaderMockup title={title} />

			<div className="flex-1 flex flex-col justify-center items-center relative overflow-hidden">
				{type === "hero" && (
					<div className="w-full text-center space-y-1.5 px-1 my-auto">
						<span className="inline-block px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-bold border border-primary/20">
							Next.js 15
						</span>
						<div className="text-[11px] font-black tracking-tight text-foreground leading-tight">
							Build Next-Gen UI
						</div>
						<div className="flex justify-center gap-1 pt-0.5">
							<span className="px-2 py-0.5 rounded bg-primary text-primary-foreground text-[8px] font-bold shadow-xs">
								Get Started
							</span>
							<span className="px-2 py-0.5 rounded border border-border text-[8px] font-bold text-foreground">
								Docs
							</span>
						</div>
					</div>
				)}

				{type === "pricing" && (
					<div className="w-full flex flex-col justify-between my-auto space-y-1 px-0.5">
						<div className="mx-auto px-1.5 py-0.5 rounded-full bg-muted border border-border/60 flex items-center gap-0.5 text-[6px]">
							<span className="font-bold text-primary px-1 rounded-full bg-background shadow-2xs">
								Monthly
							</span>
							<span className="text-muted-foreground font-semibold">
								Annual
							</span>
						</div>
						<div className="w-full flex items-center justify-between gap-1 pt-0.5">
							<div className="flex-1 p-1 rounded-md border border-border/80 bg-background text-center space-y-0.5 min-w-0">
								<div className="text-[6px] font-bold text-muted-foreground truncate">
									Free
								</div>
								<div className="text-[8px] font-black text-foreground">$0</div>
								<div className="h-1.5 w-full rounded bg-muted text-[5px] font-bold text-muted-foreground flex items-center justify-center">
									Free
								</div>
							</div>
							<div className="flex-1 p-1 rounded-md border border-primary bg-primary/10 text-center space-y-0.5 shadow-2xs relative min-w-0">
								<span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[4px] font-black px-0.5 rounded bg-primary text-primary-foreground whitespace-nowrap">
									HOT
								</span>
								<div className="text-[6px] font-black text-primary truncate">
									Pro
								</div>
								<div className="text-[8px] font-black text-primary">$29</div>
								<div className="h-1.5 w-full rounded bg-primary text-[5px] font-bold text-primary-foreground flex items-center justify-center shadow-2xs">
									Pro
								</div>
							</div>
							<div className="flex-1 p-1 rounded-md border border-border/80 bg-background text-center space-y-0.5 min-w-0">
								<div className="text-[6px] font-bold text-muted-foreground truncate">
									Enterprise
								</div>
								<div className="text-[8px] font-black text-foreground">$99</div>
								<div className="h-1.5 w-full rounded bg-muted text-[5px] font-bold text-muted-foreground flex items-center justify-center">
									VIP
								</div>
							</div>
						</div>
					</div>
				)}

				{type === "chart" && (
					<div className="w-full h-full flex flex-col justify-between py-1 relative">
						<div className="flex justify-between items-center text-[7.5px] font-bold text-muted-foreground px-1 z-10">
							<span>Revenue Stream</span>
							<span className="text-emerald-500 font-extrabold">+34.2%</span>
						</div>
						<div className="w-full h-12 relative my-auto">
							<svg
								className="w-full h-full overflow-visible"
								viewBox="0 0 100 40">
								<defs>
									<linearGradient
										id="docsAllChartGrad"
										x1="0"
										y1="0"
										x2="0"
										y2="1">
										<stop
											offset="0%"
											stopColor="var(--primary)"
											stopOpacity="0.4"
										/>
										<stop
											offset="100%"
											stopColor="var(--primary)"
											stopOpacity="0.0"
										/>
									</linearGradient>
								</defs>
								<path
									d="M 0 35 Q 25 5, 50 20 T 100 5 L 100 40 L 0 40 Z"
									fill="url(#docsAllChartGrad)"
								/>
								<path
									d="M 0 35 Q 25 5, 50 20 T 100 5"
									fill="none"
									stroke="var(--primary)"
									strokeWidth="2"
								/>
								<circle
									cx="50"
									cy="20"
									r="2.5"
									className="fill-primary stroke-background stroke-2"
								/>
								<circle
									cx="100"
									cy="5"
									r="2.5"
									className="fill-emerald-500 stroke-background stroke-2"
								/>
							</svg>
						</div>
					</div>
				)}

				{type === "dock" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="px-2.5 py-1.5 rounded-2xl bg-background border border-border/80 shadow-md flex items-end gap-1.5">
							<div className="size-4 rounded-lg bg-rose-500/80 flex items-center justify-center text-[7px] text-white font-bold">
								A
							</div>
							<div className="size-4 rounded-lg bg-amber-500/80 flex items-center justify-center text-[7px] text-white font-bold">
								B
							</div>
							<div className="size-5 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-[9px] font-bold shadow-sm -translate-y-1">
								★
							</div>
							<div className="size-4 rounded-lg bg-emerald-500/80 flex items-center justify-center text-[7px] text-white font-bold">
								C
							</div>
						</div>
					</div>
				)}

				{type === "navbar" && (
					<div className="w-full my-auto px-0.5">
						<div className="w-full p-1.5 rounded-xl bg-background border border-border/80 flex items-center justify-between shadow-xs px-2.5">
							<div className="flex items-center gap-1.5 text-[8.5px] font-black text-foreground">
								<span className="size-2 rounded bg-primary" />
								<span>DocsUI</span>
							</div>
							<div className="flex items-center gap-2 text-[7px] font-bold text-muted-foreground">
								<span>Features</span>
								<span>Docs</span>
								<span className="px-2 py-0.5 rounded-md bg-primary text-primary-foreground font-extrabold text-[6.5px]">
									Login
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "table" && (
					<div className="w-full space-y-1 my-auto text-[8px] font-mono">
						<div className="flex items-center justify-between border-b border-border/60 pb-0.5 font-bold text-primary">
							<span>Name</span>
							<span>Status</span>
						</div>
						<div className="flex items-center justify-between text-foreground">
							<span>Button.tsx</span>
							<span className="text-emerald-500 font-bold">Ready</span>
						</div>
						<div className="flex items-center justify-between text-foreground">
							<span>Card.tsx</span>
							<span className="text-emerald-500 font-bold">Ready</span>
						</div>
					</div>
				)}

				{type === "modal" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="w-4/5 p-2 rounded-xl bg-background border border-border shadow-lg space-y-1.5">
							<div className="flex justify-between items-center border-b border-border/40 pb-0.5">
								<span className="text-[9px] font-bold text-foreground pb-0.5">
									Modal Dialog
								</span>
								<span className="text-[8px] text-muted-foreground pr-1.5 pb-0.5">✕</span>
							</div>
							<div className="text-[7px] text-muted-foreground">
								Confirm action step?
							</div>
							<div className="flex justify-end gap-1 pt-0.5">
								<span className="px-1.5 py-0.5 rounded bg-muted text-[7px] font-bold">
									Cancel
								</span>
								<span className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground text-[7px] font-bold">
									Confirm
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "stepper" && (
					<div className="w-full space-y-2 my-auto px-1">
						<div className="flex items-center justify-between">
							<span className="size-3.5 rounded-full bg-primary text-[7px] text-primary-foreground font-black flex items-center justify-center">
								1
							</span>
							<div className="h-0.5 flex-1 bg-primary mx-1" />
							<span className="size-3.5 rounded-full bg-primary text-[7px] text-primary-foreground font-black flex items-center justify-center">
								2
							</span>
							<div className="h-0.5 flex-1 bg-muted-foreground/30 mx-1" />
							<span className="size-3.5 rounded-full bg-muted border border-border text-[7px] text-muted-foreground font-bold flex items-center justify-center">
								3
							</span>
						</div>
						<div className="text-center text-[8px] font-bold text-foreground">
							Step 2: Configuration
						</div>
					</div>
				)}

				{type === "chat" && (
					<div className="w-full space-y-1.5 my-auto text-[7px]">
						<div className="p-1 px-2 rounded-lg bg-muted text-foreground max-w-[80%]">
							Hello! How can I help?
						</div>
						<div className="p-1 px-2 rounded-lg bg-primary text-primary-foreground max-w-[80%] ml-auto font-medium">
							Show component docs!
						</div>
					</div>
				)}

				{type === "auth" && (
					<div className="w-full max-w-[130px] p-2 rounded-xl bg-background border border-border shadow-xs space-y-1.5 text-center my-auto">
						<div className="text-[8px] font-bold text-foreground">Sign In</div>
						<div className="h-3 w-full bg-muted border border-border rounded flex items-center px-1 text-[7px] text-muted-foreground">
							email@app.com
						</div>
						<div className="h-3 w-full bg-primary text-primary-foreground font-bold rounded flex items-center justify-center text-[7px]">
							Submit
						</div>
					</div>
				)}

				{type === "carousel" && (
					<div className="w-full flex items-center justify-between gap-1 my-auto px-0.5">
						<div className="size-4 rounded-full bg-muted border border-border text-[7px] font-black text-muted-foreground flex items-center justify-center shrink-0">
							‹
						</div>
						<div className="flex-1 h-14 rounded-xl bg-background border border-primary/50 p-1.5 shadow-sm flex flex-col justify-between items-center text-center">
							<span className="text-[7.5px] font-extrabold text-primary">
								Slide 02
							</span>
							<div className="flex gap-1">
								<span className="size-1 rounded-full bg-primary/40" />
								<span className="size-1 rounded-full bg-primary" />
								<span className="size-1 rounded-full bg-primary/40" />
							</div>
						</div>
						<div className="size-4 rounded-full bg-muted border border-border text-[7px] font-black text-muted-foreground flex items-center justify-center shrink-0">
							›
						</div>
					</div>
				)}

				{type === "card" && (
					<div className="w-full max-w-[130px] p-2 rounded-xl bg-background border border-border/80 shadow-xs space-y-1.5 my-auto">
						<div className="w-full bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center text-[8px] font-bold text-primary py-1.5 pb-1.25">
							Card View
						</div>
						<div className="h-1.5 w-3/4 bg-foreground/80 rounded" />
						<div className="h-1 w-1/2 bg-muted-foreground/40 rounded" />
					</div>
				)}

				{type === "counter" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="px-3 py-2 rounded-xl bg-background border border-border shadow-xs flex items-center gap-2">
							<span className="size-4 rounded bg-muted border border-border font-black text-[9px] flex items-center justify-center text-foreground">
								-
							</span>
							<span className="text-sm font-black text-primary px-1">99+</span>
							<span className="size-4 rounded bg-primary text-primary-foreground font-black text-[9px] flex items-center justify-center">
								+
							</span>
						</div>
					</div>
				)}

				{type === "cart" && (
					<div className="w-full max-w-[130px] p-2 rounded-xl bg-background border border-border shadow-xs space-y-1.5 my-auto text-[7px]">
						<div className="flex justify-between items-center font-bold text-foreground border-b border-border pb-0.75">
							<span>Shopping Cart</span>
							<span className="text-primary">2 Items</span>
						</div>
						<div className="flex justify-between items-center text-muted-foreground">
							<span>Next UI Kit</span>
							<span className="font-bold text-foreground">$49</span>
						</div>
						<div className="h-5 w-full bg-primary text-primary-foreground font-bold rounded flex items-center justify-center text-[7px]">
							Checkout
						</div>
					</div>
				)}

				{type === "item" && (
					<div className="w-full space-y-1.5 my-auto px-1">
						<div className="p-1.5 rounded-lg bg-background border border-border flex items-center justify-between shadow-xs">
							<div className="flex items-center gap-1.5">
								<span className="size-2 rounded-full bg-primary" />
								<span className="text-[8px] font-bold text-foreground">
									Item Component
								</span>
							</div>
							<span className="text-[7px] text-muted-foreground">→</span>
						</div>
					</div>
				)}

				{type === "resizable" && (
					<div className="w-full h-full flex gap-1.5 p-1 my-auto">
						<div className="w-1/2 h-full rounded-lg bg-background border border-border p-1 flex flex-col justify-center items-center">
							<span className="text-[7px] font-bold text-muted-foreground">
								Left
							</span>
						</div>
						<div className="w-1 h-full rounded bg-primary/40 my-auto cursor-col-resize" />
						<div className="w-1/2 h-full rounded-lg bg-background border border-border p-1 flex flex-col justify-center items-center">
							<span className="text-[7px] font-bold text-muted-foreground">
								Right
							</span>
						</div>
					</div>
				)}

				{type === "scroll-area" && (
					<div className="w-full h-full p-1.5 rounded-lg bg-background border border-border flex justify-between my-auto relative">
						<div className="space-y-1 text-[7px] text-foreground">
							<div className="font-bold text-primary">Scroll Area</div>
							<div className="text-muted-foreground">Row item 1</div>
							<div className="text-muted-foreground">Row item 2</div>
						</div>
						<div className="w-1 h-4/5 bg-primary/60 rounded-full my-auto" />
					</div>
				)}

				{type === "masonry" && (
					<div className="w-full grid grid-cols-3 gap-1 my-auto px-1">
						<div className="space-y-1">
							<div className="h-10 rounded-lg bg-primary/20 border border-primary/40 p-1 flex items-end">
								<span className="text-[5px] font-black text-primary">#01</span>
							</div>
							<div className="h-6 rounded-lg bg-muted border border-border" />
						</div>
						<div className="space-y-1">
							<div className="h-6 rounded-lg bg-muted border border-border" />
							<div className="h-11 rounded-lg bg-emerald-500/20 border border-emerald-500/40 p-1 flex items-end">
								<span className="text-[5px] font-black text-emerald-500">
									#02
								</span>
							</div>
						</div>
						<div className="space-y-1">
							<div className="h-12 rounded-lg bg-primary/10 border border-primary/20 p-1 flex items-end">
								<span className="text-[5px] font-black text-primary">#03</span>
							</div>
						</div>
					</div>
				)}

				{type === "qr" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="size-14 rounded-xl bg-background border border-border p-1.5 shadow-md flex flex-col justify-between items-center relative">
							<div className="w-full h-full grid grid-cols-4 gap-0.5">
								<div className="bg-foreground rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-primary rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-background border border-foreground rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-primary rounded-xs" />
								<div className="bg-primary rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-primary rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-foreground rounded-xs" />
							</div>
						</div>
					</div>
				)}

				{type === "image-compare" && (
					<div className="w-full h-full rounded-xl bg-card border border-border flex flex-col justify-center relative overflow-hidden my-auto shadow-2xs group/imgcomp">
						<div className="absolute inset-0 flex">
							<div className="w-1/2 h-full bg-primary/20 flex items-center justify-center text-[7px] font-black text-primary border-r border-primary">
								BEFORE
							</div>
							<div className="w-1/2 h-full bg-emerald-500/20 flex items-center justify-center text-[7px] font-black text-emerald-500">
								AFTER
							</div>
						</div>
						<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 rounded-full bg-primary text-primary-foreground font-black text-[7px] flex items-center justify-center shadow-md">
							↔
						</div>
					</div>
				)}

				{type === "curved-carousel" && (
					<div className="w-full h-full rounded-xl bg-card border border-border flex items-center justify-center relative overflow-hidden my-auto shadow-2xs group/curved">
						<div className="relative w-full h-full flex items-center justify-center scale-90">
							<div className="w-8 h-12 rounded-lg bg-emerald-500/20 border border-emerald-500/40 -rotate-25 -translate-x-12 translate-y-3 opacity-60 shadow-xs" />
							<div className="w-9 h-14 rounded-lg bg-orange-500/20 border border-orange-500/40 -rotate-12 -translate-x-6 translate-y-1 shadow-md" />
							<div className="w-10 h-16 rounded-xl bg-primary text-primary-foreground font-mono text-[5px] flex flex-col justify-between p-1 z-10 shadow-xl border border-white/20">
								<span className="font-bold">Violet</span>
								<span className="self-end text-[4px]">004</span>
							</div>
							<div className="w-9 h-14 rounded-lg bg-amber-500/20 border border-amber-500/40 rotate-12 translate-x-6 translate-y-1 shadow-md" />
							<div className="w-8 h-12 rounded-lg bg-purple-500/20 border border-purple-500/40 rotate-25 translate-x-12 translate-y-3 opacity-60 shadow-xs" />
						</div>
					</div>
				)}

				{type === "cursor-animation" && (
					<div className="w-full h-full p-2 rounded-xl bg-card border border-primary/40 flex flex-col items-center justify-center relative overflow-hidden my-auto shadow-2xs group/cursor">
						{/* Ambient Background Radial Glow */}
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-15 pointer-events-none" />

						{/* Interactive Grid Background */}
						<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

						{/* Target Area UI */}
						<div className="relative z-10 flex flex-col items-center gap-1 text-center">
							<div className="size-7 rounded-lg bg-primary/10 border border-primary/30 text-primary flex items-center justify-center text-[10px] font-black shadow-xs">
								✦
							</div>
							<div className="text-[7.5px] font-extrabold text-foreground">
								Custom Cursor
							</div>
							<div className="text-[5.5px] text-muted-foreground font-semibold">
								10 Motion Styles
							</div>
						</div>

						{/* Glowing Cursor Circle & Pointer */}
						<div className="absolute top-2.5 right-4 size-6 rounded-full border border-primary/80 bg-primary/20 backdrop-blur-xs flex items-center justify-center shadow-[0_0_12px_var(--primary)] transition-transform duration-300 group-hover/cursor:scale-125 z-20">
							<div className="size-1.5 rounded-full bg-primary" />
							<svg
								className="size-3 text-primary absolute -bottom-1 -right-1 drop-shadow-xs"
								viewBox="0 0 24 24"
								fill="currentColor">
								<path
									d="M4.5 3.5L11.5 20.5L14.5 13.5L21.5 10.5L4.5 3.5Z"
									stroke="white"
									strokeWidth="1.5"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>
				)}

				{type === "file-upload" && (
					<div className="w-full max-w-[130px] p-2 rounded-xl bg-background border border-dashed border-primary/60 text-center space-y-1 my-auto">
						<span className="text-xs text-primary font-bold">☁</span>
						<div className="text-[8px] font-bold text-foreground">
							Drag & Drop File
						</div>
					</div>
				)}

				{type === "tilted-card" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="w-20 h-12 rounded-xl bg-background border border-primary shadow-lg rotate-6 hover:rotate-0 transition-transform p-1.5 text-center flex flex-col justify-center">
							<span className="text-[8px] font-extrabold text-primary">
								3D Tilted Card
							</span>
						</div>
					</div>
				)}

				{type === "memories-card" && (
					<div className="w-full flex items-center justify-center my-auto relative h-12">
						<div className="w-16 h-10 rounded-lg bg-muted/60 border border-border absolute -top-1 rotate-3" />
						<div className="w-16 h-10 rounded-lg bg-background border border-primary shadow-md z-10 p-1 text-center flex flex-col justify-center">
							<span className="text-[7px] font-bold text-primary">
								Memories
							</span>
						</div>
					</div>
				)}

				{type === "scroll-stack" && (
					<div className="w-full flex flex-col items-center gap-1 my-auto">
						<div className="w-20 h-3 rounded-t-lg bg-muted border border-border" />
						<div className="w-22 h-6 rounded-lg bg-background border border-primary shadow-xs p-1 text-center text-[7px] font-bold text-primary">
							Scroll Stack Card
						</div>
					</div>
				)}

				{type === "magic-bento" && (
					<div className="w-full grid grid-cols-2 gap-1 my-auto px-1">
						<div className="h-10 rounded-lg bg-primary/20 border border-primary/40 p-1 flex flex-col justify-between">
							<span className="text-[7px] font-bold text-primary">Glow</span>
						</div>
						<div className="h-10 rounded-lg bg-card border border-border p-1 flex flex-col justify-between">
							<span className="text-[7px] font-bold text-foreground">Tilt</span>
						</div>
					</div>
				)}

				{type === "network-graph" && (
					<div className="w-full h-full relative flex items-center justify-center p-1 my-auto overflow-hidden bg-card rounded-xl border border-border group/netgraph">
						{/* Ambient Background Grid & Radial Glow */}
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_75%)] opacity-20 pointer-events-none" />

						{/* SVG Connecting Ray Lines */}
						<svg
							className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
							viewBox="0 0 100 100">
							<circle
								cx="50"
								cy="50"
								r="38"
								fill="none"
								stroke="var(--primary)"
								strokeWidth="0.8"
								strokeDasharray="3 3"
								opacity="0.3"
							/>
							<circle
								cx="50"
								cy="50"
								r="24"
								fill="none"
								stroke="var(--primary)"
								strokeWidth="1"
								opacity="0.4"
							/>
							<circle
								cx="50"
								cy="50"
								r="12"
								fill="none"
								stroke="var(--primary)"
								strokeWidth="1.2"
								opacity="0.6"
							/>

							<line
								x1="50"
								y1="50"
								x2="50"
								y2="12"
								stroke="var(--primary)"
								strokeWidth="1"
								opacity="0.5"
							/>
							<line
								x1="50"
								y1="50"
								x2="88"
								y2="50"
								stroke="var(--primary)"
								strokeWidth="1"
								opacity="0.5"
							/>
							<line
								x1="50"
								y1="50"
								x2="50"
								y2="88"
								stroke="var(--primary)"
								strokeWidth="1"
								opacity="0.5"
							/>
							<line
								x1="50"
								y1="50"
								x2="12"
								y2="50"
								stroke="var(--primary)"
								strokeWidth="1"
								opacity="0.5"
							/>
						</svg>

						{/* Outer Orbital Orbit Ring 3 */}
						<div className="size-28 rounded-full absolute flex items-center justify-center pointer-events-none animate-[spin_30s_linear_infinite]">
							<div className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-4 rounded-full ring-2 ring-emerald-500 bg-card p-0.5 shadow-md">
								<img
									src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80"
									alt="Node"
									className="size-full rounded-full object-cover"
								/>
							</div>
							<div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-4 rounded-full ring-2 ring-amber-500 bg-card p-0.5 shadow-md">
								<img
									src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80"
									alt="Node"
									className="size-full rounded-full object-cover"
								/>
							</div>
							<div className="absolute top-1/2 -left-1.5 -translate-y-1/2 size-4 rounded-full ring-2 ring-indigo-500 bg-card p-0.5 shadow-md">
								<img
									src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&auto=format&fit=crop&q=80"
									alt="Node"
									className="size-full rounded-full object-cover"
								/>
							</div>
							<div className="absolute top-1/2 -right-1.5 -translate-y-1/2 size-4 rounded-full ring-2 ring-sky-500 bg-card p-0.5 shadow-md">
								<img
									src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&auto=format&fit=crop&q=80"
									alt="Node"
									className="size-full rounded-full object-cover"
								/>
							</div>
						</div>

						{/* Middle Concentric Orbital Ring 2 */}
						<div className="size-18 rounded-full absolute flex items-center justify-center pointer-events-none animate-[spin_18s_linear_infinite_reverse]">
							<div className="absolute top-0 right-1 size-3.5 rounded-full bg-rose-500 text-white font-extrabold text-[5px] flex items-center justify-center shadow-md ring-2 ring-background">
								API
							</div>
							<div className="absolute bottom-0 left-1 size-3.5 rounded-full bg-purple-500 text-white font-extrabold text-[5px] flex items-center justify-center shadow-md ring-2 ring-background">
								DB
							</div>
						</div>

						{/* Central Core Pulse Node */}
						<div className="relative z-10 flex items-center justify-center">
							<span className="animate-ping absolute size-8 rounded-full bg-primary opacity-40" />
							<div className="size-8 rounded-full bg-primary text-primary-foreground font-black text-[7.5px] flex flex-col items-center justify-center shadow-xl border-2 border-background ring-4 ring-primary/30">
								<span>CORE</span>
							</div>
						</div>
					</div>
				)}



				{type === "footer" && (
					<div className="w-full h-full p-2 flex flex-col justify-between my-auto overflow-hidden bg-card rounded-xl border border-border">
						<div className="w-full flex justify-between items-center opacity-60">
							<div className="size-2 rounded-full bg-primary" />
							<div className="flex gap-1">
								<div className="w-3 h-1 rounded bg-muted-foreground/40" />
								<div className="w-3 h-1 rounded bg-muted-foreground/40" />
							</div>
						</div>
						<div className="grid grid-cols-3 gap-1 my-1">
							<div className="space-y-0.5">
								<div className="w-4 h-1 rounded bg-primary/60" />
								<div className="w-6 h-0.5 rounded bg-muted-foreground/30" />
								<div className="w-5 h-0.5 rounded bg-muted-foreground/30" />
							</div>
							<div className="space-y-0.5">
								<div className="w-4 h-1 rounded bg-primary/60" />
								<div className="w-5 h-0.5 rounded bg-muted-foreground/30" />
								<div className="w-6 h-0.5 rounded bg-muted-foreground/30" />
							</div>
							<div className="space-y-0.5">
								<div className="w-4 h-1 rounded bg-primary/60" />
								<div className="w-6 h-0.5 rounded bg-muted-foreground/30" />
								<div className="w-4 h-0.5 rounded bg-muted-foreground/30" />
							</div>
						</div>
						<div className="w-full border-t border-border/40 pt-1 flex justify-between items-center text-[6px] text-muted-foreground">
							<span>© 2026</span>
							<span className="size-1.5 rounded-full bg-emerald-500" />
						</div>
					</div>
				)}

				{type === "sidebar" && (
					<div className="w-full h-full p-1 flex gap-1.5 my-auto overflow-hidden">
						<div className="w-2/5 h-full rounded-lg bg-background border border-border/80 p-1 flex flex-col justify-between shadow-2xs">
							<div className="space-y-1">
								<div className="flex items-center gap-1 border-b border-border/40 pb-1">
									<span className="size-2 rounded bg-primary" />
									<span className="text-[7px] font-extrabold text-foreground">
										Dashboard
									</span>
								</div>
								<div className="space-y-0.5 pt-0.5">
									<div className="px-1 py-0.5 rounded bg-primary/10 text-primary text-[6px] font-bold flex items-center justify-between">
										<span>Overview</span>
										<span className="size-1 rounded-full bg-primary" />
									</div>
									<div className="px-1 py-0.5 text-muted-foreground text-[6px] font-medium flex items-center justify-between">
										<span>Analytics</span>
									</div>
									<div className="px-1 py-0.5 text-muted-foreground text-[6px] font-medium flex items-center justify-between">
										<span>Settings</span>
									</div>
								</div>
							</div>
							<div className="px-1 py-0.5 rounded bg-muted text-[5.5px] font-mono text-muted-foreground">
								Admin Pro
							</div>
						</div>
						<div className="flex-1 h-full rounded-lg border border-border/60 bg-card p-1.5 flex flex-col justify-between space-y-1">
							<div className="flex items-center justify-between">
								<div className="h-1.5 w-1/2 rounded bg-foreground/80 font-bold" />
								<div className="size-2 rounded-full bg-primary/40" />
							</div>
							<div className="grid grid-cols-2 gap-1 my-auto">
								<div className="h-5 rounded bg-muted/60 p-1 flex flex-col justify-between">
									<div className="h-1 w-2/3 bg-muted-foreground/40 rounded" />
									<div className="h-1.5 w-1/2 bg-primary rounded" />
								</div>
								<div className="h-5 rounded bg-muted/60 p-1 flex flex-col justify-between">
									<div className="h-1 w-2/3 bg-muted-foreground/40 rounded" />
									<div className="h-1.5 w-1/2 bg-emerald-500 rounded" />
								</div>
							</div>
						</div>
					</div>
				)}

				{type === "dashboard" && (
					<div className="w-full h-full p-1 flex flex-col justify-between my-auto space-y-1 overflow-hidden">
						<div className="grid grid-cols-3 gap-1">
							<div className="p-1 rounded-md bg-background border border-border/80 text-center space-y-0.5">
								<div className="text-[5.5px] font-bold text-muted-foreground">
									Tickets
								</div>
								<div className="text-[8px] font-black text-foreground">
									1,240
								</div>
							</div>
							<div className="p-1 rounded-md bg-primary/10 border border-primary/20 text-center space-y-0.5">
								<div className="text-[5.5px] font-bold text-primary">
									Resolved
								</div>
								<div className="text-[8px] font-black text-primary">98%</div>
							</div>
							<div className="p-1 rounded-md bg-background border border-border/80 text-center space-y-0.5">
								<div className="text-[5.5px] font-bold text-muted-foreground">
									Avg Time
								</div>
								<div className="text-[8px] font-black text-emerald-500">
									12m
								</div>
							</div>
						</div>
						<div className="w-full p-1 rounded-lg bg-background border border-border flex items-center justify-between text-[6px]">
							<div className="space-y-0.5">
								<div className="font-bold text-foreground">
									Active Customer Queue
								</div>
								<div className="text-[5.5px] text-muted-foreground">
									14 Agent Agents Online
								</div>
							</div>
							<span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white font-bold text-[5.5px]">
								Live
							</span>
						</div>
					</div>
				)}

				{type === "marquee" && (
					<div className="w-full flex flex-col justify-between my-auto space-y-2 px-1 relative overflow-hidden">
						<div className="text-center text-[7px] font-bold text-muted-foreground uppercase tracking-widest">
							Trusted by 500+ Companies
						</div>
						<div className="w-full flex items-center justify-between gap-1.5 py-1 px-1 rounded-xl bg-background border border-border/80 relative shadow-2xs">
							<div className="px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-[7px] font-extrabold text-primary flex items-center gap-1">
								<span className="size-1.5 rounded-full bg-primary" /> React
							</div>
							<div className="px-1.5 py-0.5 rounded bg-muted border border-border/60 text-[7px] font-bold text-foreground flex items-center gap-1">
								<span className="size-1.5 rounded-full bg-sky-500" /> Next.js
							</div>
							<div className="px-1.5 py-0.5 rounded bg-muted border border-border/60 text-[7px] font-bold text-foreground flex items-center gap-1">
								<span className="size-1.5 rounded-full bg-indigo-500" />{" "}
								Tailwind
							</div>
						</div>
					</div>
				)}

				{type === "floating-contact" && (
					<div className="w-full h-full relative flex flex-col justify-end items-end p-1.5 my-auto overflow-hidden">
						<div className="w-22 p-1 mb-1 rounded-lg bg-background border border-border shadow-xs space-y-0.5 text-[5.5px]">
							<div className="flex items-center gap-1 font-bold text-foreground border-b border-border/40 pb-0.5">
								<span className="size-1 rounded-full bg-emerald-500" />
								<span>Support</span>
							</div>
							<div className="p-0.5 rounded bg-muted text-muted-foreground truncate">
								Help Chat
							</div>
						</div>
						<div className="size-5 rounded-full bg-primary text-primary-foreground font-bold text-[9px] flex items-center justify-center shadow-xs border border-background ring-1 ring-primary/20 shrink-0">
							💬
						</div>
					</div>
				)}

				{type === "video-accordion" && (
					<div className="w-full h-full flex gap-1 p-1 my-auto overflow-hidden">
						<div className="flex-[2] h-full rounded-lg bg-primary/10 border border-primary/40 p-1 flex flex-col justify-between relative shadow-xs">
							<span className="text-[5.5px] font-extrabold text-primary px-1 py-0.2 rounded bg-background border border-primary/20 self-start">
								Active Stream
							</span>
							<div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-[7px] mx-auto shadow-md">
								▶
							</div>
							<div className="h-1 w-3/4 bg-primary/60 rounded" />
						</div>
						<div className="w-4 h-full rounded-lg bg-muted/60 border border-border flex flex-col items-center justify-center">
							<span className="text-[6px] text-muted-foreground font-bold">
								▶
							</span>
						</div>
						<div className="w-4 h-full rounded-lg bg-muted/60 border border-border flex flex-col items-center justify-center">
							<span className="text-[6px] text-muted-foreground font-bold">
								▶
							</span>
						</div>
					</div>
				)}

				{type === "timeline" && (
					<div className="w-full h-full p-1.5 flex flex-col justify-between my-auto relative overflow-hidden">
						<div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-border/80" />

						<div className="flex items-center gap-2 relative z-10">
							<div className="size-2.5 rounded-full bg-primary ring-2 ring-primary/20 flex items-center justify-center shrink-0">
								<span className="size-1 rounded-full bg-primary-foreground" />
							</div>
							<div className="flex-1 p-1 rounded-lg bg-background border border-primary/40 shadow-2xs text-[6px]">
								<div className="font-extrabold text-primary flex justify-between">
									<span>v2.0 Released</span>
									<span className="text-[5px] text-muted-foreground">
										Today
									</span>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-2 relative z-10">
							<div className="size-2.5 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
								<span className="size-1 rounded-full bg-muted-foreground/60" />
							</div>
							<div className="flex-1 p-1 rounded-lg bg-background border border-border/70 text-[6px]">
								<div className="font-bold text-foreground flex justify-between">
									<span>Beta Testing</span>
									<span className="text-[5px] text-muted-foreground">
										Yesterday
									</span>
								</div>
							</div>
						</div>
					</div>
				)}

				{type === "typography" && (
					<div className="w-full flex flex-col justify-between my-auto space-y-1 px-1">
						<div className="text-xs font-black tracking-tight text-foreground border-b border-border/40 pb-0.5">
							H1. Heading Text
						</div>
						<div className="text-[8px] font-bold text-primary">
							H2. Subtitle Paragraph
						</div>
						<div className="text-[6.5px] text-muted-foreground leading-tight">
							Flexible & accessible type system tokens.
						</div>
					</div>
				)}

				{type === "animated-list" && (
					<div className="w-full space-y-1 my-auto px-1">
						<div className="p-1 rounded-md bg-background border border-primary/50 shadow-2xs flex items-center justify-between text-[6.5px] translate-x-1 transition-transform">
							<div className="flex items-center gap-1">
								<span className="size-1.5 rounded-full bg-emerald-500" />
								<span className="font-extrabold text-foreground">
									New Order #108
								</span>
							</div>
							<span className="text-[5.5px] font-bold text-primary">
								Just now
							</span>
						</div>
						<div className="p-1 rounded-md bg-background border border-border text-[6.5px] flex items-center justify-between opacity-80">
							<div className="flex items-center gap-1">
								<span className="size-1.5 rounded-full bg-sky-500" />
								<span className="font-bold text-foreground">
									User Signed Up
								</span>
							</div>
							<span className="text-[5.5px] text-muted-foreground">2m ago</span>
						</div>
					</div>
				)}

				{type === "accordion" && (
					<div className="w-full space-y-1 my-auto px-0.5 text-[7px]">
						<div className="p-1.5 rounded-lg bg-background border border-primary/50 shadow-2xs space-y-1">
							<div className="flex justify-between items-center font-extrabold text-primary px-0.5">
								<span>Is it accessible?</span>
								<span className="text-[8px]">▲</span>
							</div>
							<div className="text-[6px] text-muted-foreground border-t border-border/40 pt-1 px-0.5">
								Yes. Adheres to WAI-ARIA standards.
							</div>
						</div>
						<div className="py-1 px-2 rounded-lg bg-muted/40 border border-border flex justify-between items-center font-bold text-foreground">
							<span>Is it styled?</span>
							<span className="text-[8px] text-muted-foreground pt-0.75">▼</span>
						</div>
					</div>
				)}

				{type === "api-playground" && (
					<div className="w-full p-1.5 rounded-lg bg-background border border-border shadow-2xs space-y-1 my-auto text-[6.5px] font-mono">
						<div className="flex items-center justify-between border-b border-border/40 pb-1">
							<span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-500 font-extrabold text-[5.5px]">
								GET
							</span>
							<span className="text-muted-foreground font-bold">
								/api/v1/users
							</span>
						</div>
						<div className="flex items-center justify-between text-foreground">
							<span className="text-primary font-bold">Status: 200 OK</span>
							<span className="px-1 rounded bg-primary text-primary-foreground font-bold text-[5.5px]">
								Send
							</span>
						</div>
					</div>
				)}

				{type === "breadcrumb" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="px-2 py-1 pb-0.5 pb-0.5 rounded-lg bg-background border border-border shadow-2xs flex items-center gap-1 text-[7px] font-bold">
							<span className="text-muted-foreground">Docs</span>
							<span className="text-muted-foreground/60">/</span>
							<span className="text-muted-foreground">Components</span>
							<span className="text-muted-foreground/60">/</span>
							<span className="text-primary font-extrabold">Breadcrumb</span>
						</div>
					</div>
				)}

				{type === "button" && (
					<div className="w-full p-2 rounded-xl bg-card border border-border/80 my-auto text-[6.5px] space-y-1.5">
						{/* Top Row: Primary + Secondary + Outline */}
						<div className="flex items-center justify-center gap-1.5 flex-wrap">
							<div className="px-2 py-1 pb-0.5 rounded-lg bg-primary text-primary-foreground text-[6.5px] font-extrabold shadow-2xs flex items-center gap-1 hover:bg-primary/90 cursor-pointer">
								<span>Deploy</span>
								<span className="text-[5.5px]">🚀</span>
							</div>
							<div className="px-2 py-1 pb-0.5 rounded-lg bg-secondary text-secondary-foreground text-[6.5px] font-bold shadow-2xs flex items-center gap-1 border border-border/60 cursor-pointer">
								<span>Secondary</span>
							</div>
							<div className="px-2 py-1 pb-0.5 rounded-lg border border-border bg-background text-[6.5px] font-bold text-foreground hover:bg-muted cursor-pointer">
								Outline
							</div>
						</div>

						{/* Bottom Row: Destructive + Loading + Icon Only */}
						<div className="flex items-center justify-center gap-1.5 flex-wrap">
							<div className="px-2 py-1 pb-0.75 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[6px] font-bold flex items-center gap-1 cursor-pointer">
								<span>Delete</span>
								<span className="text-[5.5px]">🗑</span>
							</div>
							<div className="px-2 py-1 rounded-lg bg-primary/20 text-primary text-[6px] font-extrabold flex items-center gap-1 cursor-pointer">
								<span className="size-2 rounded-full border border-primary border-t-transparent animate-spin" />
								<span>Loading...</span>
							</div>
							<div className="size-5 rounded-lg bg-muted border border-border flex items-center justify-center text-[7px] text-foreground font-extrabold shadow-2xs cursor-pointer pt-0.25">
								★
							</div>
						</div>
					</div>
				)}

				{type === "command" && (
					<div className="w-full p-1.5 rounded-xl bg-background border border-border shadow-md space-y-1 my-auto text-[6.5px]">
						<div className="flex items-center gap-1 border-b border-border/40 pb-1 px-1">
							<span className="text-[7.5px] text-primary">🔍</span>
							<span className="font-bold text-foreground">Search docs...</span>
							<span className="ml-auto text-[5.5px] py-0.75 pb-0.25 px-1 bg-muted rounded border border-border text-muted-foreground">
								⌘K
							</span>
						</div>
						<div className="space-y-0.5">
							<div className="px-1.5 py-1 pb-0.5 rounded bg-primary/10 text-primary font-bold flex justify-between">
								<span>&gt; Components</span>
								<span>Enter</span>
							</div>
						</div>
					</div>
				)}

				{type === "calendar" && (
					<div className="w-full p-2 rounded-xl bg-background border-y border-border/80 space-y-1.5 my-auto text-[6.5px]">
						{/* Top Toolbar: Selected Date Badge + Year Quick Select */}
						<div className="flex items-center justify-between border-b border-border/40 pb-1 px-0.5">
							<div className="flex items-center gap-1">
								<span className="size-1.5 rounded-full bg-primary animate-pulse" />
								<span className="font-extrabold text-[7.5px] text-foreground">
									August 2026
								</span>
							</div>
							<div className="flex items-center gap-0.5 text-muted-foreground text-[6px]">
								<span className="size-3.5 rounded-md bg-muted/60 border border-border flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground font-bold">
									‹
								</span>
								<span className="size-3.5 rounded-md bg-muted/60 border border-border flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground font-bold">
									›
								</span>
							</div>
						</div>

						{/* Days of Week */}
						<div className="grid grid-cols-7 gap-0.5 font-extrabold text-muted-foreground/70 text-center text-[5.5px] uppercase">
							<span>Su</span>
							<span>Mo</span>
							<span>Tu</span>
							<span>We</span>
							<span>Th</span>
							<span>Fr</span>
							<span>Sa</span>
						</div>

						{/* Full Month Calendar Matrix */}
						<div className="grid grid-cols-7 gap-0.5 text-center font-bold text-[6px] items-center">
							<span className="text-muted-foreground/30 py-0.5">26</span>
							<span className="text-muted-foreground/30 py-0.5">27</span>
							<span className="text-muted-foreground/30 py-0.5">28</span>
							<span className="text-muted-foreground/30 py-0.5">29</span>
							<span className="text-muted-foreground/30 py-0.5">30</span>
							<span className="text-muted-foreground/30 py-0.5">31</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								1
							</span>

							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								2
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								3
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								4
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								5
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								6
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								7
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								8
							</span>

							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								9
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								10
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								11
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								12
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								13
							</span>

							{/* Start Date Selection Range */}
							<span className="py-0.5 rounded-l-md bg-primary text-primary-foreground font-black shadow-2xs">
								14
							</span>
							<span className="py-0.5 bg-primary/20 text-primary font-extrabold">
								15
							</span>
							<span className="py-0.5 bg-primary/20 text-primary font-extrabold">
								16
							</span>
							{/* End Date Selection Range */}
							<span className="py-0.5 rounded-r-md bg-primary text-primary-foreground font-black shadow-2xs">
								17
							</span>

							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								18
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								19
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								20
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								21
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								22
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								23
							</span>

							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								24
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								25
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								26
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								27
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								28
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								29
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								30
							</span>
						</div>

						{/* Bottom Footer Action Bar */}
						<div className="flex items-center justify-between border-t border-border/40 pt-1 px-0.5 text-[5.5px]">
							<span className="text-muted-foreground font-semibold">
								Today: Aug 14
							</span>
							<span className="px-1.5 py-0.2 rounded bg-primary/10 text-primary font-extrabold border border-primary/20">
								Apply
							</span>
						</div>
					</div>
				)}

				{type === "collapsible" && (
					<div className="w-full space-y-1 my-auto px-1 text-[7px]">
						<div className="p-1.5 pb-1.25 rounded-lg bg-background border border-border flex justify-between items-center font-extrabold text-foreground shadow-2xs">
							<span>Toggle Details</span>
							<span className="text-[7px] pr-0.5 text-primary">▲</span>
						</div>
						<div className="p-1.5 pb-1.25 rounded-lg bg-primary/10 border border-primary/20 text-[6.5px] font-bold text-primary">
							Expanded Panel Content
						</div>
					</div>
				)}

				{type === "context-menu" && (
					<div className="w-full h-full relative flex items-center justify-center my-auto">
						<div className="w-24 p-1 rounded-lg bg-background border border-border shadow-lg space-y-0.5 text-[6px]">
							<div className="px-1.5 py-0.5 rounded hover:bg-primary/10 text-foreground font-medium flex justify-between">
								<span>Copy Link</span>
								<span className="text-muted-foreground">⌘C</span>
							</div>
							<div className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-bold flex justify-between">
								<span>Inspect Element</span>
								<span>⌘I</span>
							</div>
						</div>
					</div>
				)}

				{type === "drawer" && (
					<div className="w-full h-full relative flex flex-col justify-end items-center my-auto overflow-hidden bg-black/10 dark:bg-black/40 rounded-lg">
						<div className="w-full h-[95%] rounded-t-2xl bg-background border-t border-border shadow-2xl p-1.5 flex flex-col justify-between text-[6.5px]">
							<div className="w-6 h-1 rounded-full bg-muted-foreground/40 mx-auto" />
							<div className="space-y-1 my-auto">
								<div className="font-extrabold text-foreground border-b border-border/40 pb-1.5 text-center">
									Drawer Sheet
								</div>
								<div className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold text-[5.5px]">
									Option 1: Edit Profile
								</div>
								<div className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium text-[5.5px]">
									Option 2: Settings
								</div>
							</div>
							<div className="h-3 w-full bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-[6px] shadow-2xs">
								Submit
							</div>
						</div>
					</div>
				)}

				{type === "dialog" && (
					<div className="w-full h-full flex items-center justify-center my-auto">
						<div className="w-4/5 px-2.5 py-1.5 pb-2 rounded-xl bg-background border border-border shadow-xl space-y-1 text-[6.5px]">
							<div className="font-extrabold text-foreground border-b border-border/40 pb-0.5">
								Dialog Title
							</div>
							<div className="text-[5.5px] text-muted-foreground">
								Are you sure you want to continue?
							</div>
							<div className="flex justify-end gap-1 pt-0.5">
								<span className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-bold text-[5.5px]">
									Confirm
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "data-grid" && (
					<div className="w-full px-2 py-1 rounded-lg bg-background border border-border space-y-1 my-auto text-[6px] font-mono">
						<div className="grid grid-cols-3 gap-1 font-bold text-primary border-b border-border/40 pb-1">
							<span>ID</span>
							<span>Name</span>
							<span>Role</span>
						</div>
						<div className="grid grid-cols-3 gap-1 text-foreground">
							<span>#01</span>
							<span>Alex</span>
							<span className="text-emerald-500 font-bold">Admin</span>
						</div>
						<div className="grid grid-cols-3 gap-1 text-foreground">
							<span>#02</span>
							<span>Sarah</span>
							<span className="text-sky-500 font-bold">User</span>
						</div>
					</div>
				)}

				{type === "data-table" && (
					<div className="w-full p-1.5 rounded-xl bg-card border border-border/80 space-y-1 my-auto text-[6px]">
						{/* Table Toolbar Header */}
						<div className="flex justify-between items-center border-b border-border/40 pb-1 px-0.5">
							<div className="flex items-center gap-1">
								<span className="font-extrabold text-foreground text-[6.5px]">
									Invoices
								</span>
								<span className="px-1 py-0.2 rounded bg-primary/10 text-primary font-mono text-[5px]">
									128 total
								</span>
							</div>
							<div className="px-1.5 py-0.5 pb-0.25 rounded bg-muted text-muted-foreground font-mono text-[5px] flex items-center gap-0.5">
								<span>Filter</span>
								<span className="text-[4.5px]">▼</span>
							</div>
						</div>

						{/* Table Column Headers */}
						<div className="grid grid-cols-12 gap-1 font-extrabold text-muted-foreground border-b border-border/40 pb-0.5 px-0.5 text-[5.5px]">
							<span className="col-span-1 text-center">☐</span>
							<span className="col-span-4">Customer</span>
							<span className="col-span-3">Status</span>
							<span className="col-span-4 text-right">Amount</span>
						</div>

						{/* Table Rows */}
						<div className="space-y-0.5 text-[5.5px]">
							<div className="grid grid-cols-12 gap-1 items-center bg-primary/5 pb-0 p-0.25 rounded border border-primary/20">
								<span className="col-span-1 text-center text-primary font-bold">
									☑
								</span>
								<span className="col-span-4 font-bold text-foreground truncate">
									Alex Rivers
								</span>
								<span className="col-span-3">
									<span className="px-1 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[5px]">
										Paid
									</span>
								</span>
								<span className="col-span-4 text-right font-extrabold text-foreground">
									$1,250.00
								</span>
							</div>

							<div className="grid grid-cols-12 gap-1 items-center p-0.5 border-b border-border/20">
								<span className="col-span-1 text-center text-muted-foreground/60">
									☐
								</span>
								<span className="col-span-4 font-medium text-foreground truncate">
									Sarah Chen
								</span>
								<span className="col-span-3">
									<span className="px-1 py-0.2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-[5px]">
										Pending
									</span>
								</span>
								<span className="col-span-4 text-right font-bold text-foreground">
									$420.00
								</span>
							</div>

							{/* <div className="grid grid-cols-12 gap-1 items-center p-0.5">
								<span className="col-span-1 text-center text-muted-foreground/60">
									☐
								</span>
								<span className="col-span-4 font-medium text-foreground truncate">
									TechCorp Inc
								</span>
								<span className="col-span-3">
									<span className="px-1 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[5px]">
										Paid
									</span>
								</span>
								<span className="col-span-4 text-right font-bold text-foreground">
									$3,890.00
								</span>
							</div> */}
						</div>

						{/* Table Footer Pagination */}
						<div className="flex justify-between items-center px-0.5 text-[5px] text-muted-foreground font-medium">
							<span>Page 1 of 12</span>
							<div className="flex gap-0.5 font-bold">
								<span className="px-1 py-0.2 rounded bg-muted">‹ Prev</span>
								<span className="px-1 py-0.2 rounded bg-muted text-foreground">
									Next ›
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "date-picker" && (
					<div className="w-full h-full p-1 rounded-xl bg-background border border-border/80 flex flex-col justify-center items-center overflow-hidden">
						<div className="w-[96%] space-y-1 my-auto">
							{/* Realistic Input Field with Active Selection Trigger */}
							<div className="w-full flex items-center justify-between px-2 py-1 pb-0.5 rounded-lg bg-card border border-primary shadow-xs ring-2 ring-primary/30">
								<div className="flex items-center gap-1.5 min-w-0">
									<div className="p-0.5 rounded bg-primary text-primary-foreground shrink-0 animate-pulse">
										<svg
											className="size-2.5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2.5}>
											<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
											<line x1="16" y1="2" x2="16" y2="6" />
											<line x1="8" y1="2" x2="8" y2="6" />
											<line x1="3" y1="10" x2="21" y2="10" />
										</svg>
									</div>
									<div className="flex flex-col text-left leading-none truncate">
										<span className="text-[5px] text-primary font-bold uppercase tracking-wider">
											Picking Date...
										</span>
										<span className="text-[6.5px] font-extrabold text-foreground truncate">
											Aug 18, 2026
										</span>
									</div>
								</div>
								<span className="text-[5.5px] text-primary font-bold">▲</span>
							</div>

							{/* Realistic Floating Popover Dropdown Card with Live Selection */}
							<div className="w-full p-1.5 rounded-lg bg-card/95 backdrop-blur-xs border border-border shadow-xl space-y-1 relative">
								{/* Preset Quick Chips */}
								<div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none text-[4.5px]">
									<span className="px-1 py-0.5 rounded-full bg-muted text-muted-foreground font-medium whitespace-nowrap">
										Today
									</span>
									<span className="px-1 py-0.5 rounded-full bg-muted text-muted-foreground font-medium whitespace-nowrap">
										Tomorrow
									</span>
									<span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground font-bold whitespace-nowrap shadow-2xs">
										Pick Date Range
									</span>
								</div>

								{/* Month Header Navigation */}
								<div className="flex items-center justify-between px-1 py-0.5 rounded bg-muted/40 text-[6px]">
									<span className="size-3 rounded hover:bg-background flex items-center justify-center font-bold text-muted-foreground cursor-pointer">
										‹
									</span>
									<span className="font-bold text-foreground">August 2026</span>
									<span className="size-3 rounded hover:bg-background flex items-center justify-center font-bold text-muted-foreground cursor-pointer">
										›
									</span>
								</div>

								{/* Weekday Grid Labels */}
								<div className="grid grid-cols-7 gap-0.5 font-bold text-muted-foreground/70 text-center text-[4.5px] uppercase">
									<span>Su</span>
									<span>Mo</span>
									<span>Tu</span>
									<span>We</span>
									<span>Th</span>
									<span>Fr</span>
									<span>Sa</span>
								</div>

								{/* Days Matrix with Cursor Picking Date 18 */}
								<div className="grid grid-cols-7 gap-0.5 text-center font-medium text-[5px] relative">
									<span className="text-muted-foreground/30 py-0.5">26</span>
									<span className="text-muted-foreground/30 py-0.5">27</span>
									<span className="text-muted-foreground/30 py-0.5">28</span>
									<span className="text-muted-foreground/30 py-0.5">29</span>
									<span className="text-muted-foreground/30 py-0.5">30</span>
									<span className="text-muted-foreground/30 py-0.5">31</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										1
									</span>

									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										2
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										3
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										4
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										5
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										6
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										7
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										8
									</span>

									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										9
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										10
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										11
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										12
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										13
									</span>

									{/* Start Date Selected */}
									<span className="py-0.5 rounded-md bg-primary text-primary-foreground font-bold shadow-xs">
										14
									</span>
									<span className="py-0.5 bg-primary/20 text-primary font-semibold">
										15
									</span>

									<span className="py-0.5 bg-primary/20 text-primary font-semibold">
										16
									</span>
									<span className="py-0.5 bg-primary/20 text-primary font-semibold">
										17
									</span>

									{/* ACTIVE PICKING DATE (18) WITH CURSOR POINTER & TOOLTIP */}
									<div className="relative flex items-center justify-center">
										<span className="w-full py-0.5 rounded-md bg-primary text-primary-foreground font-extrabold shadow-md ring-2 ring-primary ring-offset-1 scale-105 z-10">
											18
										</span>
										{/* Cursor Pointer Graphic */}
										<svg
											className="size-3 text-foreground drop-shadow-md absolute -bottom-1 -right-1 z-20 pointer-events-none"
											viewBox="0 0 24 24"
											fill="currentColor">
											<path
												d="M4.5 3.5L11.5 20.5L14.5 13.5L21.5 10.5L4.5 3.5Z"
												stroke="white"
												strokeWidth="1.5"
												strokeLinejoin="round"
											/>
										</svg>
									</div>

									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										19
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										20
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										21
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										22
									</span>
								</div>

								{/* Active Picking Status Bar */}
								<div className="flex items-center justify-between pt-1 border-t border-border/50 text-[5px]">
									<div className="flex items-center gap-1">
										<span className="size-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
										<span className="font-semibold text-foreground truncate">
											Selected: Aug 14 - Aug 18
										</span>
									</div>
									<span className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-extrabold shadow-2xs shrink-0">
										Confirm
									</span>
								</div>
							</div>
						</div>
					</div>
				)}

				{type === "user-graph" && (
					<div className="w-full h-full p-2 rounded-xl bg-card border border-border flex flex-col justify-center items-center overflow-hidden relative my-auto">
						{/* SVG Connecting Branch Lines */}
						<svg
							className="absolute inset-0 w-full h-full pointer-events-none"
							viewBox="0 0 100 60">
							<path
								d="M 50 15 L 30 35"
								stroke="var(--primary)"
								strokeWidth="1.5"
								strokeDasharray="2 2"
								opacity="0.6"
							/>
							<path
								d="M 50 15 L 70 35"
								stroke="var(--primary)"
								strokeWidth="1.5"
								strokeDasharray="2 2"
								opacity="0.6"
							/>
							<path
								d="M 30 35 L 20 50"
								stroke="currentColor"
								strokeWidth="1"
								opacity="0.3"
							/>
							<path
								d="M 30 35 L 40 50"
								stroke="currentColor"
								strokeWidth="1"
								opacity="0.3"
							/>
							<path
								d="M 70 35 L 60 50"
								stroke="currentColor"
								strokeWidth="1"
								opacity="0.3"
							/>
							<path
								d="M 70 35 L 80 50"
								stroke="currentColor"
								strokeWidth="1"
								opacity="0.3"
							/>
						</svg>

						<div className="flex flex-col items-center justify-between h-full w-full py-1 z-10">
							{/* Root Node (Top Admin) */}
							<div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[6px] font-black shadow-md border border-white/20">
								<span className="size-1.5 rounded-full bg-white animate-ping" />
								<span>You (Admin)</span>
							</div>

							{/* Tier 2 Nodes (Team Leads) */}
							<div className="flex justify-between w-4/5 px-2">
								<div className="flex items-center gap-1 p-0.5 pr-1.5 rounded-lg bg-card border border-primary/40 shadow-2xs">
									<img
										src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80"
										alt="Sarah"
										className="size-3.5 rounded-full object-cover"
									/>
									<span className="text-[5.5px] font-extrabold text-foreground">
										Sarah
									</span>
								</div>
								<div className="flex items-center gap-1 p-0.5 pr-1.5 rounded-lg bg-card border border-primary/40 shadow-2xs">
									<img
										src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80"
										alt="Alex"
										className="size-3.5 rounded-full object-cover"
									/>
									<span className="text-[5.5px] font-extrabold text-foreground">
										Alex
									</span>
								</div>
							</div>

							{/* Tier 3 Nodes (Sub-Agent Workers) */}
							<div className="flex justify-between w-full px-1">
								<span className="size-3 rounded-full bg-emerald-500/20 border border-emerald-500 text-[4.5px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
									A1
								</span>
								<span className="size-3 rounded-full bg-sky-500/20 border border-sky-500 text-[4.5px] font-bold text-sky-600 dark:text-sky-400 flex items-center justify-center">
									A2
								</span>
								<span className="size-3 rounded-full bg-amber-500/20 border border-amber-500 text-[4.5px] font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center">
									B1
								</span>
								<span className="size-3 rounded-full bg-purple-500/20 border border-purple-500 text-[4.5px] font-bold text-purple-600 dark:text-purple-400 flex items-center justify-center">
									B2
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "form" && (
					<div className="w-full p-1.5 rounded-lg bg-background border border-border space-y-1 my-auto text-[6px]">
						<div className="space-y-0.5">
							<div className="font-bold text-foreground">Username</div>
							<div className="h-2.5 w-full rounded bg-muted border border-primary/40 px-1 flex items-center text-[5.5px] text-primary font-bold">
								alex_dev
							</div>
						</div>
						<div className="h-3 w-full rounded bg-primary text-primary-foreground font-bold flex items-center justify-center text-[6px]">
							Submit Form
						</div>
					</div>
				)}

				{type === "input" && (
					<div className="w-full p-1.5 rounded-lg bg-background border border-border space-y-1 my-auto text-[6.5px]">
						<div className="h-4 w-full rounded-md border border-primary bg-primary/5 px-1.5 flex items-center justify-between text-primary font-bold">
							<span>Input value...</span>
							<span className="size-1 rounded-full bg-primary animate-pulse" />
						</div>
					</div>
				)}

				{type === "invoice" && (
					<div className="w-full p-1.5 rounded-lg bg-background border border-border space-y-1 my-auto text-[5.5px] overflow-hidden">
						<div className="flex justify-between items-center border-b border-border/40 pb-0.5">
							<span className="font-black text-foreground">INV-#402</span>
							<span className="text-[5px] font-extrabold text-emerald-500 bg-emerald-500/10 px-1 rounded">
								PAID
							</span>
						</div>
						<div className="space-y-0.5 border-b border-border/20 pb-0.5">
							<div className="flex justify-between text-muted-foreground">
								<span>UI Kit License</span>
								<span className="font-bold text-foreground">$149.00</span>
							</div>
							<div className="flex justify-between text-muted-foreground">
								<span>Support Addon</span>
								<span className="font-bold text-foreground">$49.00</span>
							</div>
						</div>
						<div className="flex justify-between font-extrabold text-foreground pt-0.5">
							<span>Total:</span>
							<span className="text-primary">$198.00</span>
						</div>
					</div>
				)}

				{type === "apple-select" && (
					<div className="w-full px-2 my-auto text-[7px] leading-[1.9] font-semibold text-foreground">
						<span>Tap to </span>
						<span className="relative inline-block w-px h-[9px] align-[-2px] bg-primary">
							<span className="absolute left-1/2 -translate-x-1/2 -top-[3px] size-[4px] rounded-full bg-primary" />
						</span>
						<span className="rounded-[2px] bg-primary/30 px-px">select text</span>
						<span className="relative inline-block w-px h-[9px] align-[-2px] bg-primary">
							<span className="absolute left-1/2 -translate-x-1/2 -bottom-[3px] size-[4px] rounded-full bg-primary" />
						</span>
						<span> and drag the handles.</span>
					</div>
				)}

				{type === "folder" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="relative w-16 h-12">
							<div className="absolute left-0 top-0 w-7 h-3 rounded-t-md bg-sky-200 dark:bg-sky-900" />
							<div className="absolute inset-x-0 top-2 bottom-0 rounded-md bg-sky-200 dark:bg-sky-900" />
							<div className="absolute left-1/2 -translate-x-1/2 top-3 w-7 h-8 -rotate-6 rounded-sm bg-white shadow-sm" />
							<div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-7 h-8 rotate-3 rounded-sm bg-white shadow-sm" />
							<div className="absolute inset-x-0 bottom-0 h-6 rounded-md bg-sky-300/90 dark:bg-sky-800/90 backdrop-blur-[2px] shadow-inner" />
						</div>
					</div>
				)}

				{type === "selection-frame" && (
					<div className="w-full flex items-center justify-center my-auto">
						<span className="relative inline-block px-1.5 py-0.5 text-[8px] font-bold text-foreground">
							<span className="absolute inset-0 border-[1.5px] border-sky-500" />
							{["-top-[3px] -left-[3px]", "-top-[3px] -right-[3px]", "-bottom-[3px] -left-[3px]", "-bottom-[3px] -right-[3px]"].map((pos) => (
								<span key={pos} className={`absolute ${pos} size-[5px] bg-background border-[1.5px] border-sky-500`} />
							))}
							Selected
						</span>
					</div>
				)}

				{type === "conversation-timeline" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="flex flex-col gap-[3px]">
							{[0.28, 0.28, 1, 0.28, 0.28, 0.28, 0.28].map((op, i) => (
								<div key={i} className="flex items-center gap-1.5">
									<span
										className={`h-[2px] w-6 rounded-full ${i === 2 ? "bg-sky-500" : "bg-foreground"}`}
										style={{ opacity: op }}
									/>
									{i === 2 && (
										<span className="text-[6px] font-medium leading-none text-foreground">
											Can you help me set up auth?
										</span>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{type === "copy-button" && (
					<div className="w-full flex items-center justify-center gap-1.5 my-auto px-2">
						<span className="flex-1 h-5 rounded-md border border-border bg-background px-1.5 text-[6px] font-mono leading-5 text-muted-foreground truncate">
							nexus.dev/u/johndoe
						</span>
						<span className="flex h-5 items-center gap-1 rounded-md bg-primary px-1.5 text-[6px] font-bold text-primary-foreground">
							<span className="text-[7px]">✓</span> Copied!
						</span>
					</div>
				)}

				{type === "kbd" && (
					<div className="w-full flex items-center justify-center gap-1 my-auto">
						<span className="px-1.5 py-0.5 rounded-md bg-muted border-b-2 border-border text-[7px] font-mono font-bold text-foreground shadow-2xs">
							Ctrl
						</span>
						<span className="text-[7px] text-muted-foreground">+</span>
						<span className="px-1.5 py-0.5 rounded-md bg-primary border-b-2 border-primary/70 text-[7px] font-mono font-bold text-primary-foreground shadow-2xs">
							K
						</span>
					</div>
				)}

				{type === "mails" && (
					<div className="w-full p-1.5 rounded-lg bg-background border border-border space-y-1 my-auto text-[6px]">
						<div className="p-1 rounded bg-primary/10 border border-primary/20 space-y-0.5">
							<div className="font-extrabold text-primary flex justify-between">
								<span>Sarah Connor</span>
								<span className="text-[5px] text-muted-foreground">
									10:42 AM
								</span>
							</div>
							<div className="text-[5.5px] text-foreground font-bold truncate">
								Project Assets Ready
							</div>
						</div>
					</div>
				)}

				{type === "map" && (
					<div className="w-full h-full rounded-lg bg-muted/20 border border-border relative flex items-center justify-center my-auto overflow-hidden">
						{/* Bangladesh Map Silhouette SVG */}
						<svg
							className="absolute inset-0 w-full h-full pointer-events-none fill-primary/20 stroke-primary/50 stroke-1"
							viewBox="0 0 100 100">
							<path d="M 45 10 Q 55 12, 60 20 Q 65 25, 75 30 Q 80 40, 70 50 Q 75 60, 68 75 Q 60 85, 55 90 Q 50 82, 45 78 Q 40 70, 32 65 Q 25 60, 28 50 Q 30 40, 35 30 Q 32 20, 45 10 Z" />
						</svg>

						{/* Dhaka (Center Pulse Pin) */}
						<div className="absolute top-[48%] left-[50%] z-10 -translate-x-1/2 -translate-y-1/2">
							<span className="size-3 rounded-full bg-rose-500/30 block animate-ping absolute inset-0" />
							<span className="size-2 rounded-full bg-rose-500 block ring-2 ring-rose-500/40 border border-white shadow-xs" />
						</div>

						{/* Chattogram Pin */}
						<div className="absolute top-[68%] left-[66%] z-10 -translate-x-1/2 -translate-y-1/2">
							<span className="size-1.5 rounded-full bg-emerald-500 block ring-1 ring-emerald-500/40 border border-white shadow-xs" />
						</div>

						{/* Sylhet Pin */}
						<div className="absolute top-[30%] left-[65%] z-10 -translate-x-1/2 -translate-y-1/2">
							<span className="size-1.5 rounded-full bg-amber-500 block ring-1 ring-amber-500/40 border border-white shadow-xs" />
						</div>

						{/* Rajshahi Pin */}
						<div className="absolute top-[35%] left-[32%] z-10 -translate-x-1/2 -translate-y-1/2">
							<span className="size-1.5 rounded-full bg-sky-500 block ring-1 ring-sky-500/40 border border-white shadow-xs" />
						</div>

						{/* Bangladesh Tag */}
						<div className="absolute bottom-1 left-1 px-1 py-0.2 rounded bg-background/90 border border-border text-[5px] font-black text-primary shadow-2xs">
							Bangladesh
						</div>
					</div>
				)}

				{type === "menubar" && (
					<div className="w-full p-1 rounded-lg bg-background border border-border shadow-xs my-auto text-[6px]">
						<div className="flex items-center gap-2 border-b border-border/40 pb-0.5 px-0.5 font-bold text-foreground">
							<span className="text-primary font-black">File</span>
							<span className="text-muted-foreground">Edit</span>
							<span className="text-muted-foreground">View</span>
						</div>
						<div className="p-1 rounded bg-card border border-border mt-0.5 space-y-0.5 text-[5.5px]">
							<div className="font-extrabold text-primary">New Tab ⌘N</div>
							<div className="text-muted-foreground">Open File...</div>
						</div>
					</div>
				)}

				{type === "otp-input" && (
					<div className="w-full flex items-center justify-center gap-1 my-auto">
						<div className="size-5 rounded-md border border-primary bg-primary/10 text-primary font-black text-[9px] flex items-center justify-center shadow-2xs">
							4
						</div>
						<div className="size-5 rounded-md border border-primary bg-primary/10 text-primary font-black text-[9px] flex items-center justify-center shadow-2xs">
							8
						</div>
						<div className="size-5 rounded-md border-2 border-primary bg-background text-foreground font-black text-[9px] flex items-center justify-center shadow-2xs ring-2 ring-primary/20">
							2
						</div>
						<div className="size-5 rounded-md border border-border bg-muted/40 text-muted-foreground font-bold text-[9px] flex items-center justify-center">
							•
						</div>
					</div>
				)}

				{type === "popover" && (
					<div className="w-full h-full relative flex items-center justify-center my-auto">
						<div className="w-28 p-1.5 rounded-xl bg-background border border-border shadow-lg space-y-1 text-[6px]">
							<div className="font-extrabold text-foreground border-b border-border/40 pb-0.5">
								Dimensions
							</div>
							<div className="flex justify-between text-muted-foreground">
								<span>
									Width: <strong className="text-foreground">100%</strong>
								</span>
								<span>
									Height: <strong className="text-foreground">Auto</strong>
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "progress" && (
					<div className="w-full space-y-1.5 my-auto px-1">
						<div className="flex justify-between text-[6.5px] font-extrabold">
							<span className="text-foreground">Uploading Assets</span>
							<span className="text-primary">78%</span>
						</div>
						<div className="h-2 w-full rounded-full bg-muted overflow-hidden p-0.5 border border-border/40">
							<div className="h-full w-[78%] rounded-full bg-primary transition-all duration-500 shadow-xs" />
						</div>
					</div>
				)}

				{type === "loader" && (
					<div className="w-full flex items-center justify-center my-auto relative">
						<div className="size-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
						<div className="size-5 rounded-full border-2 border-emerald-500/40 border-b-emerald-500 animate-[spin_0.8s_linear_infinite] absolute" />
						<span className="size-1.5 rounded-full bg-primary animate-pulse absolute shadow-sm" />
					</div>
				)}

				{type === "sonner" && (
					<div className="w-full h-full relative flex flex-col justify-end p-1 my-auto">
						<div className="p-1.5 rounded-xl bg-background border border-primary/50 shadow-lg flex items-center justify-between text-[6px]">
							<div className="flex items-center gap-1">
								<span className="size-1.5 rounded-full bg-emerald-500" />
								<span className="font-extrabold text-foreground">
									Event Triggered
								</span>
							</div>
							<span className="text-[5.5px] text-primary font-bold">Undo</span>
						</div>
					</div>
				)}

				{type === "select" && (
					<div className="w-full p-1 rounded-lg bg-background border border-border shadow-2xs space-y-1 my-auto text-[6.5px]">
						<div className="flex justify-between items-center px-1.5 py-0.5 rounded bg-muted border border-border font-bold text-foreground">
							<span>Select Option</span>
							<span className="text-[6px] text-primary">▼</span>
						</div>
					</div>
				)}

				{type === "skeleton" && (
					<div className="w-full space-y-1.5 my-auto px-1">
						<div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
						<div className="h-2 w-full rounded bg-muted/60 animate-pulse" />
						<div className="h-2 w-1/2 rounded bg-muted/60 animate-pulse" />
					</div>
				)}

				{type === "toast" && (
					<div className="w-full p-2 rounded-xl bg-card border border-border/80 my-auto text-[6px] space-y-1.5 shadow-2xs">
						{/* Multi-layered Toast Banner */}
						<div className="p-1.5 rounded-lg bg-background border border-emerald-500/40 flex items-start gap-1.5 shadow-xs">
							<div className="size-3.5 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-[7px] font-black shrink-0">
								✓
							</div>
							<div className="flex-1 min-w-0">
								<div className="font-extrabold text-foreground text-[6.5px] leading-none">
									Changes Saved
								</div>
								<div className="text-[5.5px] text-muted-foreground mt-0.5 truncate">
									Your profile settings have updated.
								</div>
							</div>
							<span className="text-[6px] text-muted-foreground/60 hover:text-foreground cursor-pointer shrink-0">
								✕
							</span>
						</div>
					</div>
				)}

				{type === "toggle" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="w-8 h-4 rounded-full bg-primary p-0.5 flex items-center justify-end shadow-2xs">
							<div className="size-3 rounded-full bg-primary-foreground shadow-xs" />
						</div>
					</div>
				)}

				{type === "tooltip" && (
					<div className="w-full flex flex-col items-center justify-center my-auto space-y-2 py-1">
						{/* Realistic Floating Tooltip Bubble with Down Arrow */}
						<div className="px-2.5 py-1 rounded-md bg-foreground text-background text-[6.5px] font-extrabold shadow-md relative animate-bounce">
							<span>Add to Favorites</span>
							<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
						</div>
						{/* Target Interactive Trigger Element */}
						<div className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/30 text-primary text-[6.5px] font-bold flex items-center gap-1">
							<span>★</span>
							<span>Bookmark</span>
						</div>
					</div>
				)}

				{type === "toggle-group" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="p-0.5 rounded-lg bg-muted border border-border flex items-center gap-0.5 text-[6.5px] font-bold">
							<span className="px-1.5 py-0.5 rounded bg-background text-foreground shadow-2xs">
								Left
							</span>
							<span className="px-1.5 py-0.5 text-muted-foreground">
								Center
							</span>
							<span className="px-1.5 py-0.5 text-muted-foreground">Right</span>
						</div>
					</div>
				)}

				{type === "terminal" && (
					<div className="w-full p-1.5 rounded-xl bg-card border border-border text-primary font-mono text-[6px] space-y-1 shadow-xs my-auto">
						<div className="flex gap-1 border-b border-border/40 pb-0.5">
							<span className="size-1.5 rounded-full bg-rose-500/80" />
							<span className="size-1.5 rounded-full bg-amber-500/80" />
							<span className="size-1.5 rounded-full bg-emerald-500/80" />
						</div>
						<div className="font-bold">$ npm run dev</div>
						<div className="text-muted-foreground">Ready in 2.4s</div>
					</div>
				)}

				{type === "pagination" && (
					<div className="w-full flex items-center justify-center gap-1 my-auto text-[6.5px] font-bold">
						<span className="px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground">
							Prev
						</span>
						<span className="size-4 rounded bg-primary text-primary-foreground flex items-center justify-center font-black shadow-2xs">
							1
						</span>
						<span className="px-2 rounded bg-background border border-border text-foreground flex items-center justify-center">
							2
						</span>
						<span className="px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground">
							Next
						</span>
					</div>
				)}

				{type === "tabs" && (
					<div className="w-full space-y-1 my-auto px-0.5 text-[6.5px]">
						<div className="p-0.5 rounded-lg bg-muted border border-border flex gap-0.5 font-bold">
							<span className="flex-1 py-0.5 rounded bg-background text-primary text-center font-extrabold shadow-2xs">
								Account
							</span>
							<span className="flex-1 py-0.5 text-muted-foreground text-center">
								Password
							</span>
						</div>
						<div className="p-1 rounded bg-background border border-border text-[6px] text-muted-foreground">
							Tab content panel...
						</div>
					</div>
				)}

				{type === "theme-switcher" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="p-1 rounded-full bg-muted border border-border flex items-center gap-1 text-[8px] font-bold shadow-2xs">
							<span className="p-1 rounded-full bg-background text-amber-500 shadow-xs">
								☀️
							</span>
							<span className="p-1 text-muted-foreground">🌙</span>
						</div>
					</div>
				)}

				{type === "wizard" && (
					<div className="w-full space-y-1.5 my-auto px-0.5 text-[6px]">
						<div className="flex justify-between items-center font-extrabold text-foreground border-b border-border/40 pb-0.5">
							<span className="text-primary font-black">Step 2: Profile</span>
							<span className="text-[5.5px] text-muted-foreground">2 of 4</span>
						</div>
						<div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
							<div className="h-full w-1/2 bg-primary rounded-full" />
						</div>
					</div>
				)}

				{type === "data-maps" && (
					<div className="w-full h-full rounded-lg bg-muted/20 border border-border relative flex items-center justify-center my-auto overflow-hidden">
						<svg
							className="absolute inset-0 w-full h-full pointer-events-none fill-muted-foreground/30"
							viewBox="0 0 200 100">
							<path d="M 15 20 Q 30 15 45 25 Q 50 35 35 50 Q 25 55 15 45 Z" />
							<path d="M 40 55 Q 55 52 50 85 Q 40 90 35 68 Z" />
							<path d="M 75 15 Q 120 10 160 25 Q 170 45 140 55 Q 100 50 80 35 Z" />
							<path d="M 80 40 Q 115 38 110 75 Q 90 85 78 60 Z" />
							<path d="M 145 65 Q 175 60 170 85 Q 150 90 142 75 Z" />
						</svg>
						<div className="absolute top-[28%] left-[22%] z-10">
							<span className="size-4 rounded-full bg-primary/20 block animate-ping absolute inset-0" />
							<span className="size-2.5 rounded-full bg-primary block border border-white shadow-xs" />
						</div>
						<div className="absolute top-[28%] left-[58%] z-10">
							<span className="size-5 rounded-full bg-emerald-500/20 block animate-ping absolute inset-0" />
							<span className="size-2.5 rounded-full bg-emerald-500 block border border-white shadow-xs" />
						</div>
						<div className="absolute top-1 right-1 px-1 py-0.25 pb-0 rounded bg-background/90 border border-border text-[5px] font-black text-primary shadow-xs">
							+42% Data Flow
						</div>
					</div>
				)}

				{type === "hero-videoplayer" && (
					<div className="w-full h-full rounded-xl bg-card border border-border relative flex items-center justify-center my-auto overflow-hidden shadow-sm">
						<div className="size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-xs shadow-lg ring-4 ring-primary/20">
							▶
						</div>
						<div className="absolute bottom-1.5 left-2 right-2 h-1 rounded-full bg-muted overflow-hidden">
							<div className="h-full w-2/3 bg-primary" />
						</div>
					</div>
				)}

				{type === "verify-badge" && (
					<div className="w-full flex items-center justify-center gap-1.5 my-auto">
						<div className="px-2 py-1 pb-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[7px] font-extrabold flex items-center gap-1 shadow-2xs">
							<span className="size-3 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[6px]">
								✓
							</span>
							<span>Verified Account</span>
						</div>
					</div>
				)}

				{type === "mobile-mockup" && (
					<div className="w-full h-full flex items-center justify-center my-auto">
						<div className="w-16 h-full rounded-[14px] border-2 border-border bg-background p-1 flex flex-col justify-between items-center shadow-md relative overflow-hidden">
							<div className="w-6 h-1 bg-border rounded-full mb-1" />
							<div className="flex-1 w-full rounded-md bg-primary/10 border border-primary/20 p-1 flex flex-col justify-between">
								<div className="size-2 rounded-full bg-primary" />
								<div className="h-1 w-3/4 rounded bg-primary/60" />
							</div>
							<div className="w-4 h-1 bg-border rounded-full mt-1" />
						</div>
					</div>
				)}

				{type === "half-stars" && (
					<div className="w-full flex items-center justify-center gap-1 my-auto text-amber-400 text-xs">
						<span>★</span>
						<span>★</span>
						<span>★</span>
						<span>★</span>
						<span className="opacity-40">★</span>
						<span className="text-[7.5px] font-black text-foreground ml-1">
							4.8
						</span>
					</div>
				)}

				{type === "code-block" && (
					<div className="w-full p-1.5 rounded-lg bg-muted/60 border border-border font-mono text-[6px] space-y-1 my-auto">
						<div className="flex justify-between text-[5.5px] text-muted-foreground border-b border-border/40 pb-1">
							<span>component.tsx</span>
							<span className="text-primary font-bold">Copy</span>
						</div>
						<div className="text-primary font-bold">
							<span className="text-rose-500">const</span> App = () =&gt;
						</div>
					</div>
				)}

				{type === "color-picker" && (
					<div className="w-full flex items-center justify-center gap-2 my-auto">
						<div className="size-7 rounded-full bg-gradient-to-tr from-rose-500 via-amber-400 via-emerald-400 via-sky-400 to-purple-500 border-2 border-white shadow-md ring-2 ring-primary/20 animate-spin-slow" />
						<div className="flex flex-col gap-1">
							<div className="w-9 h-2 rounded-full bg-muted border border-border flex items-center px-0.5">
								<div className="size-1.5 rounded-full bg-primary" />
							</div>
							<div className="text-[7px] font-mono font-black text-primary">#6366F1</div>
						</div>
					</div>
				)}

				{type === "piano" && (
					<div className="w-full h-9 bg-zinc-950 rounded-lg p-1 border border-zinc-800 flex justify-between gap-0.5 relative my-auto shadow-inner">
						<div className="flex-1 bg-white rounded-b-xs border-b border-zinc-300" />
						<div className="flex-1 bg-white rounded-b-xs border-b border-zinc-300" />
						<div className="flex-1 bg-white rounded-b-xs border-b border-zinc-300" />
						<div className="flex-1 bg-white rounded-b-xs border-b border-zinc-300" />
						<div className="flex-1 bg-white rounded-b-xs border-b border-zinc-300" />
						<div className="flex-1 bg-white rounded-b-xs border-b border-zinc-300" />
						<div className="absolute top-1 left-[14%] w-1.5 h-4 bg-zinc-900 rounded-b-xs z-10 border-x border-b border-black" />
						<div className="absolute top-1 left-[30%] w-1.5 h-4 bg-zinc-900 rounded-b-xs z-10 border-x border-b border-black" />
						<div className="absolute top-1 left-[63%] w-1.5 h-4 bg-zinc-900 rounded-b-xs z-10 border-x border-b border-black" />
						<div className="absolute top-1 left-[79%] w-1.5 h-4 bg-zinc-900 rounded-b-xs z-10 border-x border-b border-black" />
					</div>
				)}

				{type === "range-date-picker" && (
					<div className="w-full h-full p-1 rounded-xl bg-background border border-border/80 flex flex-col justify-center items-center overflow-hidden">
						<div className="w-[97%] p-1.5 rounded-lg bg-card border border-border shadow-xs space-y-1 my-auto">
							{/* Month Header with Prev / Next Navigation */}
							<div className="flex items-center justify-between">
								<span className="text-[6.5px] font-extrabold text-foreground tracking-tight">
									August 2026
								</span>
								<div className="flex items-center gap-0.5">
									<span className="size-2.5 rounded border border-border/80 flex items-center justify-center text-[5px] font-bold text-muted-foreground">
										‹
									</span>
									<span className="size-2.5 rounded border border-border/80 flex items-center justify-center text-[5px] font-bold text-muted-foreground">
										›
									</span>
								</div>
							</div>

							{/* Weekday Grid Labels */}
							<div className="grid grid-cols-7 text-center text-[4.5px] font-bold uppercase text-muted-foreground/70">
								<span>Su</span>
								<span>Mo</span>
								<span>Tu</span>
								<span>We</span>
								<span>Th</span>
								<span>Fr</span>
								<span>Sa</span>
							</div>

							{/* Nightly Rates Grid — Aug 8 to Aug 13 held as one continuous range band */}
							<div className="grid grid-cols-7 text-center">
								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-foreground">2</div>
									<div className="text-[4px] font-semibold text-muted-foreground/60">$100</div>
								</div>
								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-foreground">3</div>
									<div className="text-[4px] font-semibold text-muted-foreground/60">$100</div>
								</div>
								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-foreground">4</div>
									<div className="text-[4px] font-semibold text-muted-foreground/60">$100</div>
								</div>
								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-foreground">5</div>
									<div className="text-[4px] font-semibold text-muted-foreground/60">$100</div>
								</div>
								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-foreground">6</div>
									<div className="text-[4px] font-semibold text-muted-foreground/60">$120</div>
								</div>
								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-foreground">7</div>
									<div className="text-[4px] font-semibold text-muted-foreground/60">$120</div>
								</div>
								{/* Range start */}
								<div className="py-0.5 leading-tight rounded-l-sm bg-primary text-primary-foreground">
									<div className="text-[5px] font-extrabold">8</div>
									<div className="text-[4px] font-semibold opacity-80">$100</div>
								</div>

								{/* In-range nights */}
								<div className="py-0.5 leading-tight bg-primary/15">
									<div className="text-[5px] font-semibold text-foreground">9</div>
									<div className="text-[4px] font-semibold text-primary">$100</div>
								</div>
								<div className="py-0.5 leading-tight bg-primary/15">
									<div className="text-[5px] font-semibold text-foreground">10</div>
									<div className="text-[4px] font-semibold text-primary">$100</div>
								</div>
								<div className="py-0.5 leading-tight bg-primary/15">
									<div className="text-[5px] font-semibold text-foreground">11</div>
									<div className="text-[4px] font-semibold text-primary">$100</div>
								</div>
								<div className="py-0.5 leading-tight bg-primary/15">
									<div className="text-[5px] font-semibold text-foreground">12</div>
									<div className="text-[4px] font-semibold text-primary">$100</div>
								</div>
								{/* Range end */}
								<div className="py-0.5 leading-tight rounded-r-sm bg-primary text-primary-foreground">
									<div className="text-[5px] font-extrabold">13</div>
									<div className="text-[4px] font-semibold opacity-80">$120</div>
								</div>
								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-foreground">14</div>
									<div className="text-[4px] font-semibold text-muted-foreground/60">$120</div>
								</div>
								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-foreground">15</div>
									<div className="text-[4px] font-semibold text-muted-foreground/60">$100</div>
								</div>

								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-muted-foreground/50">16</div>
									<div className="text-[4px] font-semibold text-muted-foreground/40">$100</div>
								</div>
								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-muted-foreground/50">17</div>
									<div className="text-[4px] font-semibold text-muted-foreground/40">$100</div>
								</div>
								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-muted-foreground/50">18</div>
									<div className="text-[4px] font-semibold text-muted-foreground/40">$100</div>
								</div>
								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-muted-foreground/50">19</div>
									<div className="text-[4px] font-semibold text-muted-foreground/40">$100</div>
								</div>
								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-muted-foreground/50">20</div>
									<div className="text-[4px] font-semibold text-muted-foreground/40">$120</div>
								</div>
								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-muted-foreground/50">21</div>
									<div className="text-[4px] font-semibold text-muted-foreground/40">$120</div>
								</div>
								<div className="py-0.5 leading-tight">
									<div className="text-[5px] font-medium text-muted-foreground/50">22</div>
									<div className="text-[4px] font-semibold text-muted-foreground/40">$100</div>
								</div>
							</div>

							{/* Selected Range Summary Footer with Reset */}
							<div className="flex items-center justify-between pt-1 border-t border-border/60">
								<span className="flex items-center gap-1 text-[4.5px] font-medium text-muted-foreground truncate">
									<span className="size-1 rounded-full bg-primary shrink-0" />
									<strong className="font-bold text-foreground">Aug 8</strong>
									<span>–</span>
									<strong className="font-bold text-foreground">Aug 13</strong>
								</span>
								<span className="px-1 py-0.5 rounded border border-border/80 text-[4.5px] font-bold text-muted-foreground shrink-0">
									Reset
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "avatar-stack" && (
					<div className="w-full flex flex-col items-center justify-center gap-1.5 my-auto">
						<div className="flex items-center">
							{["bg-rose-400", "bg-amber-400", "bg-emerald-400", "bg-sky-400"].map((c, i) => (
								<span
									key={c}
									className={`size-5 rounded-full ${c} border-2 border-background text-[6px] font-extrabold text-white flex items-center justify-center shadow-xs`}
									style={{ marginLeft: i ? -6 : 0 }}>
									{["JD", "AL", "MK", "SR"][i]}
								</span>
							))}
							<span className="size-5 rounded-full bg-muted border-2 border-background text-[6px] font-extrabold text-foreground flex items-center justify-center -ml-1.5">
								+12
							</span>
							<span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[6px] font-bold">
								Join
							</span>
						</div>
						<span className="text-[6px] font-semibold text-muted-foreground">
							Trusted by 2,000+ makers
						</span>
					</div>
				)}

				{type === "book-flip" && (
					<div className="w-full flex flex-col items-center justify-center gap-1 my-auto">
						<div className="relative flex w-24 h-13 [perspective:120px]">
							<div className="flex-1 rounded-l-md bg-background border border-border border-r-0 shadow-inner p-1 space-y-0.5">
								<div className="h-[2px] w-3/4 rounded bg-foreground/50" />
								<div className="h-[2px] w-full rounded bg-muted-foreground/30" />
								<div className="h-[2px] w-5/6 rounded bg-muted-foreground/30" />
								<div className="h-[2px] w-2/3 rounded bg-muted-foreground/30" />
							</div>
							<div className="w-[3px] bg-gradient-to-r from-black/20 via-black/5 to-black/20" />
							<div className="flex-1 rounded-r-md bg-background border border-border border-l-0 p-1 space-y-0.5">
								<div className="h-[2px] w-full rounded bg-muted-foreground/30" />
								<div className="h-[2px] w-4/5 rounded bg-muted-foreground/30" />
								<div className="h-4 w-full rounded bg-primary/15 border border-primary/30" />
							</div>
							{/* Turning leaf */}
							<div className="absolute right-0 top-0 h-full w-1/2 origin-left rounded-r-md bg-gradient-to-l from-muted to-background border border-border shadow-md [transform:rotateY(-40deg)]" />
						</div>
						<div className="flex items-center gap-1 text-[6px] text-muted-foreground">
							<span className="px-1 rounded border border-border">‹</span>
							<span className="font-bold text-foreground">3 / 12</span>
							<span className="px-1 rounded border border-border">›</span>
						</div>
					</div>
				)}

				{type === "booking-card" && (
					<div className="w-full max-w-[136px] mx-auto my-auto rounded-lg bg-background border border-border p-1.5 space-y-1">
						<div className="grid grid-cols-5 gap-0.5 text-center">
							{["Mo", "Tu", "We", "Th", "Fr"].map((d, i) => (
								<div
									key={d}
									className={`rounded py-0.5 leading-none ${i === 2 ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground"}`}>
									<div className="text-[4.5px] font-bold uppercase">{d}</div>
									<div className="text-[6px] font-extrabold">{12 + i}</div>
								</div>
							))}
						</div>
						<div className="grid grid-cols-3 gap-0.5">
							{["9:00", "10:30", "14:00"].map((t, i) => (
								<span
									key={t}
									className={`rounded border text-[5.5px] font-bold text-center py-0.5 ${i === 1 ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground"}`}>
									{t}
								</span>
							))}
						</div>
						<div className="rounded bg-primary text-primary-foreground text-[6px] font-bold text-center py-0.5">
							Book Wed 14 · 10:30
						</div>
					</div>
				)}

				{type === "circular-text" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="relative size-14">
							<svg
								viewBox="0 0 100 100"
								className="size-full animate-[spin_14s_linear_infinite] text-foreground">
								<defs>
									<path id="mini-ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
								</defs>
								<text fontSize="12.5" fontWeight="800" letterSpacing="1.5" fill="currentColor">
									<textPath href="#mini-ring">SCROLL DOWN • WATCH REEL • </textPath>
								</text>
							</svg>
							<span className="absolute inset-0 m-auto size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] pl-0.5">
								▶
							</span>
						</div>
					</div>
				)}

				{type === "design-components-folder" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="relative w-20 h-14">
							<div className="absolute left-0 top-1 w-8 h-3 rounded-t-md bg-primary/30" />
							<div className="absolute inset-x-0 top-3 bottom-0 rounded-md bg-primary/30" />
							<div className="absolute left-2 top-0 w-8 h-9 -rotate-12 rounded-sm bg-background border border-border shadow-sm p-0.5">
								<div className="h-1.5 w-full rounded-sm bg-rose-400/70" />
							</div>
							<div className="absolute left-6 -top-1 w-8 h-9 rounded-sm bg-background border border-border shadow-sm p-0.5">
								<div className="h-1.5 w-full rounded-sm bg-sky-400/70" />
							</div>
							<div className="absolute left-10 top-0 w-8 h-9 rotate-12 rounded-sm bg-background border border-border shadow-sm p-0.5">
								<div className="h-1.5 w-full rounded-sm bg-emerald-400/70" />
							</div>
							<div className="absolute inset-x-0 bottom-0 h-7 rounded-md bg-primary/60 backdrop-blur-[2px] shadow-inner flex items-end justify-center pb-1">
								<span className="text-[6px] font-extrabold text-primary-foreground tracking-wide">
									Components
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "draggable-card-list" && (
					<div className="w-full max-w-[136px] mx-auto my-auto space-y-1">
						{[
							{ t: "Design review", b: "Design", bc: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-900", a: "bg-rose-400", lift: false },
							{ t: "Ship v2.1", b: "Release", bc: "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-900", a: "bg-sky-400", lift: true },
							{ t: "Write docs", b: "Docs", bc: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900", a: "bg-emerald-400", lift: false },
						].map((row) => (
							<div
								key={row.t}
								className={`flex items-center gap-1 rounded-md bg-background border pl-0 pr-1 py-0.5 overflow-hidden ${row.lift ? "border-primary shadow-md -rotate-1 scale-[1.04]" : "border-border"}`}>
								<span className={`w-[3px] self-stretch ${row.a}`} />
								<span className="flex-1 text-[6px] font-bold text-foreground truncate">
									{row.t}
								</span>
								<span className={`px-1 rounded-full border text-[5px] font-bold ${row.bc}`}>
									{row.b}
								</span>
								<span className="text-[7px] leading-none text-muted-foreground/70 tracking-[-2px]">
									⋮⋮
								</span>
							</div>
						))}
					</div>
				)}

				{type === "flow-gallery" && (
					<div className="w-full h-full flex items-center justify-center my-auto overflow-hidden [perspective:200px]">
						<div className="flex gap-1 [transform:rotateX(18deg)_rotateY(-14deg)_rotateZ(6deg)]">
							{["from-rose-400 to-orange-300", "from-sky-400 to-indigo-400", "from-emerald-400 to-teal-300", "from-fuchsia-400 to-purple-400", "from-amber-300 to-yellow-200"].map((g, i) => (
								<div
									key={g}
									className={`w-7 h-10 rounded-md bg-gradient-to-br ${g} shadow-md shrink-0`}
									style={{ transform: `translateY(${(i - 2) * 5}px)` }}
								/>
							))}
						</div>
					</div>
				)}

				{type === "glass-panel" && (
					<div className="w-full h-full relative rounded-lg overflow-hidden my-auto border border-border/60">
						{/* Aurora backdrop */}
						<div className="absolute -top-3 -left-2 size-14 rounded-full bg-fuchsia-400/60 blur-md" />
						<div className="absolute -bottom-4 left-8 size-14 rounded-full bg-sky-400/60 blur-md" />
						<div className="absolute -top-2 -right-3 size-12 rounded-full bg-amber-300/60 blur-md" />
						{/* Frosted panels in four shapes */}
						<div className="absolute inset-0 grid grid-cols-3 gap-1 p-1.5">
							<div className="col-span-2 rounded-md bg-white/45 dark:bg-white/15 backdrop-blur-sm border border-white/70 dark:border-white/25 shadow-xs p-1">
								<div className="h-[2px] w-1/2 rounded bg-foreground/50" />
								<div className="h-[2px] w-3/4 rounded bg-foreground/30 mt-0.5" />
							</div>
							<div className="rounded-full aspect-square mx-auto w-full bg-white/45 dark:bg-white/15 backdrop-blur-sm border border-white/70 dark:border-white/25 shadow-xs" />
							<div className="rounded-full bg-white/45 dark:bg-white/15 backdrop-blur-sm border border-white/70 dark:border-white/25 shadow-xs h-4" />
							<div className="col-span-2 rounded-md bg-white/45 dark:bg-white/15 backdrop-blur-sm border border-white/70 dark:border-white/25 shadow-xs flex items-center justify-center text-[6px] font-extrabold text-foreground">
								Glass
							</div>
						</div>
					</div>
				)}

				{type === "heart-signal" && (
					<div className="w-full max-w-[136px] mx-auto my-auto rounded-lg bg-background border border-border p-1.5 relative overflow-hidden">
						<div className="flex items-center justify-between mb-1">
							<span className="text-[6px] font-bold text-muted-foreground uppercase tracking-wider">
								Telemetry
							</span>
							<span className="flex items-center gap-0.5 px-1 rounded-full bg-primary/10 border border-primary/30 text-[6px] font-extrabold text-primary">
								<span className="text-rose-500 animate-pulse">♥</span> 72 BPM
							</span>
						</div>
						<svg viewBox="0 0 120 28" className="w-full h-7 text-primary">
							<polyline
								fill="none"
								stroke="currentColor"
								strokeWidth="1.6"
								strokeLinejoin="round"
								strokeLinecap="round"
								points="0,16 18,16 24,16 28,9 32,22 36,4 40,26 44,14 48,16 66,16 72,16 76,9 80,22 84,4 88,26 92,14 96,16 120,16"
							/>
						</svg>
					</div>
				)}

				{type === "particle-canvas" && (
					<div className="w-full h-full relative flex items-center justify-center my-auto rounded-lg bg-card border border-border overflow-hidden">
						<span
							className="text-[30px] font-black tracking-tight leading-none text-transparent bg-clip-text select-none"
							style={{
								backgroundImage: "radial-gradient(circle, var(--primary) 0.9px, transparent 1.1px)",
								backgroundSize: "3.5px 3.5px",
							}}>
							NEXUS
						</span>
						{/* Pointer with a small cleared halo */}
						<span className="absolute right-6 top-2 size-6 rounded-full bg-card/80 border border-primary/30" />
						<span className="absolute right-[34px] top-[18px] size-1.5 rounded-full bg-primary" />
					</div>
				)}

				{type === "social-links" && (
					<div className="w-full flex flex-col items-center justify-center gap-1.5 my-auto">
						<div className="flex items-center gap-1">
							{[
								{ g: "𝕏", c: "" },
								{ g: "GH", c: "text-[5.5px]" },
								{ g: "in", c: "text-sky-600" },
								{ g: "▶", c: "text-rose-500" },
								{ g: "◎", c: "text-fuchsia-500" },
								{ g: "✉", c: "text-amber-500" },
							].map((m) => (
								<span
									key={m.g}
									className={`size-5 rounded-md bg-background border border-border shadow-xs flex items-center justify-center text-[8px] font-black text-foreground ${m.c}`}>
									{m.g}
								</span>
							))}
						</div>
						<span className="text-[6px] font-semibold text-muted-foreground">
							Follow us everywhere
						</span>
					</div>
				)}

				{type === "squircle-carousel" && (
					<div className="w-full flex items-center justify-center my-auto overflow-hidden">
						<div className="grid grid-cols-5 gap-[3px]">
							{Array.from({ length: 10 }).map((_, i) => (
								<span
									key={i}
									className="size-5 rounded-[38%]"
									style={{
										backgroundImage:
											"linear-gradient(135deg, var(--primary) 0%, #38bdf8 45%, #f472b6 100%)",
										backgroundSize: "500% 200%",
										backgroundPosition: `${(i % 5) * 25}% ${Math.floor(i / 5) * 100}%`,
									}}
								/>
							))}
						</div>
					</div>
				)}

				{type === "table-of-contents" && (
					<div className="w-full h-full flex gap-1.5 my-auto px-0.5">
						<div className="w-12 shrink-0 rounded-md bg-background border border-border p-1 relative">
							<div className="absolute left-0 top-1 bottom-1 w-[2px] rounded bg-border">
								<div className="absolute top-[38%] h-[22%] w-full rounded bg-primary" />
							</div>
							<div className="h-2.5 rounded border border-border/70 bg-muted/50 mb-1" />
							{["Intro", "Setup", "Usage", "API", "FAQ"].map((h, i) => (
								<div
									key={h}
									className={`text-[5px] leading-[7px] pl-1 truncate ${i === 2 ? "font-extrabold text-primary" : "text-muted-foreground"}`}>
									{h}
								</div>
							))}
						</div>
						<div className="flex-1 space-y-1 pt-0.5">
							<div className="h-[2px] w-full rounded bg-primary/50" />
							<div className="h-[3px] w-2/3 rounded bg-foreground/60" />
							<div className="h-[2px] w-full rounded bg-muted-foreground/30" />
							<div className="h-[2px] w-11/12 rounded bg-muted-foreground/30" />
							<div className="h-[2px] w-4/5 rounded bg-muted-foreground/30" />
							<div className="h-[3px] w-1/2 rounded bg-foreground/60 mt-1.5" />
							<div className="h-[2px] w-full rounded bg-muted-foreground/30" />
						</div>
					</div>
				)}

				{type === "infrastructure-topology" && (
					<div className="w-full h-full relative flex items-center justify-center my-auto rounded-lg bg-card border border-border overflow-hidden">
						<svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 w-full h-full text-primary">
							{[
								[14, 12],
								[86, 12],
								[14, 48],
								[86, 48],
							].map(([x, y]) => (
								<line
									key={`${x}-${y}`}
									x1="50"
									y1="30"
									x2={x}
									y2={y}
									stroke="currentColor"
									strokeOpacity="0.35"
									strokeWidth="1"
									strokeDasharray="2 2"
								/>
							))}
						</svg>
						{["left-1.5 top-1.5", "right-1.5 top-1.5", "left-1.5 bottom-1.5", "right-1.5 bottom-1.5"].map((pos, i) => (
							<span
								key={pos}
								className={`absolute ${pos} px-1 py-0.5 rounded bg-background border border-border text-[5px] font-bold text-foreground`}>
								{["api", "auth", "db", "cache"][i]}
							</span>
						))}
						<span className="relative size-7 rounded-full bg-primary/15 border border-primary flex items-center justify-center text-[5.5px] font-extrabold text-primary shadow-[0_0_12px_var(--primary)]">
							core
						</span>
					</div>
				)}

				{type === "data-flow" && (
					<div className="w-full h-full relative flex items-center justify-between my-auto px-0.5">
						<svg
							viewBox="0 0 100 40"
							preserveAspectRatio="none"
							className="absolute inset-0 w-full h-full text-primary/60">
							<path d="M24 10 C 40 10, 40 20, 50 20" fill="none" stroke="currentColor" strokeWidth="1" />
							<path d="M24 30 C 40 30, 40 20, 50 20" fill="none" stroke="currentColor" strokeWidth="1" />
							<path d="M50 20 C 60 20, 60 10, 76 10" fill="none" stroke="currentColor" strokeWidth="1" />
							<path d="M50 20 C 60 20, 60 30, 76 30" fill="none" stroke="currentColor" strokeWidth="1" />
						</svg>
						<div className="flex flex-col gap-2 w-[24%] relative">
							{["CRM", "Sheets"].map((s) => (
								<span
									key={s}
									className="rounded bg-background border border-border text-[5px] font-bold text-foreground text-center py-1">
									{s}
								</span>
							))}
						</div>
						<span className="relative size-7 rounded-full bg-primary text-primary-foreground text-[5.5px] font-extrabold flex items-center justify-center shadow-md">
							AI
						</span>
						<div className="flex flex-col gap-2 w-[24%] relative">
							{["Report", "Alerts"].map((s) => (
								<span
									key={s}
									className="rounded bg-primary/10 border border-primary/30 text-[5px] font-bold text-primary text-center py-1">
									{s}
								</span>
							))}
						</div>
					</div>
				)}

				{type === "fashion-hero" && (
					<div className="w-full h-full flex flex-col justify-between my-auto px-0.5 gap-1">
						<div className="flex items-center justify-between">
							<span className="size-4 rounded-full border border-dashed border-foreground/60 flex items-center justify-center text-[5px]">
								▶
							</span>
							<div className="text-center text-[9px] font-black leading-[9px] tracking-tighter text-foreground uppercase">
								Wear
								<br />
								Bold
							</div>
							<div className="flex">
								{["bg-rose-400", "bg-amber-400", "bg-sky-400"].map((c, i) => (
									<span
										key={c}
										className={`size-3 rounded-full ${c} border border-background`}
										style={{ marginLeft: i ? -4 : 0 }}
									/>
								))}
							</div>
						</div>
						<div className="flex items-end justify-center gap-1">
							{["bg-orange-200", "bg-lime-200", "bg-sky-200", "bg-pink-200", "bg-violet-200"].map((c, i) => (
								<div
									key={c}
									className={`w-5 rounded-sm ${c} relative overflow-hidden shrink-0 ${i === 2 ? "border border-primary" : ""}`}
									style={{ height: 22 + (i % 2 ? 6 : 0) }}>
									<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-t-full bg-foreground/60" />
									<span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 size-1.5 rounded-full bg-foreground/60" />
								</div>
							))}
						</div>
					</div>
				)}

				{type === "platform-grid" && (
					<div className="w-full h-full my-auto grid grid-cols-4 grid-rows-3 gap-px bg-border rounded-md overflow-hidden border border-border">
						{Array.from({ length: 12 }).map((_, i) =>
							i === 5 ? (
								<div
									key={i}
									className="col-span-2 row-span-2 bg-background p-1 flex items-center justify-center [perspective:80px]">
									<div className="w-full h-full rounded-sm bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/40 [transform:rotateX(8deg)_rotateY(-8deg)] shadow-sm flex items-center justify-center text-[5.5px] font-extrabold text-primary">
										Feature
									</div>
								</div>
							) : i === 6 || i === 9 || i === 10 ? null : (
								<div key={i} className="bg-background flex flex-col items-center justify-center gap-0.5">
									<span className="size-1.5 rounded-sm bg-foreground/60" />
									<span className="h-[2px] w-3 rounded bg-muted-foreground/40" />
								</div>
							),
						)}
					</div>
				)}

				{type === "product-details" && (
					<div className="w-full h-full flex gap-1.5 my-auto px-0.5">
						<div className="w-[40%] rounded-md bg-gradient-to-br from-muted to-muted/40 border border-border relative flex items-center justify-center">
							<span className="w-6 h-8 rounded-sm bg-primary/70 shadow-sm" />
							<div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
								<span className="size-1.5 rounded-full bg-primary ring-1 ring-background" />
								<span className="size-1.5 rounded-full bg-rose-400" />
								<span className="size-1.5 rounded-full bg-emerald-400" />
							</div>
						</div>
						<div className="flex-1 flex flex-col justify-between py-0.5">
							<div>
								<div className="text-[7px] font-extrabold text-foreground leading-tight">
									Aero Jacket
								</div>
								<div className="text-[5px] text-amber-500">
									★★★★☆ <span className="text-muted-foreground">(128)</span>
								</div>
							</div>
							<div className="text-[8px] font-black text-foreground">$129</div>
							<div>
								<div className="h-[3px] w-full rounded bg-muted overflow-hidden">
									<div className="h-full w-1/4 bg-rose-500" />
								</div>
								<div className="text-[4.5px] text-rose-500 font-bold">Only 3 left</div>
							</div>
							<span className="rounded bg-primary text-primary-foreground text-[5.5px] font-bold text-center py-0.5">
								Add to cart
							</span>
						</div>
					</div>
				)}

				{type === "profile-page" && (
					<div className="w-full h-full relative rounded-lg overflow-hidden my-auto border border-border/60">
						<div className="absolute -top-4 -left-3 size-16 rounded-full bg-violet-400/50 blur-md" />
						<div className="absolute -bottom-5 right-0 size-16 rounded-full bg-sky-400/50 blur-md" />
						<div className="absolute inset-0 grid grid-cols-3 gap-1 p-1.5">
							<div className="rounded-full aspect-square w-full bg-white/50 dark:bg-white/15 backdrop-blur-sm border border-white/70 dark:border-white/25 flex items-center justify-center text-[7px] font-black text-foreground">
								SR
							</div>
							<div className="col-span-2 rounded-md bg-white/50 dark:bg-white/15 backdrop-blur-sm border border-white/70 dark:border-white/25 p-1">
								<div className="text-[6px] font-extrabold text-foreground leading-tight">
									Sadiq Rahman
								</div>
								<div className="text-[4.5px] text-muted-foreground">Design Engineer · Dhaka</div>
							</div>
							<div className="col-span-2 rounded-md bg-white/50 dark:bg-white/15 backdrop-blur-sm border border-white/70 dark:border-white/25 flex items-center gap-1 px-1">
								<span className="size-1 rounded-full bg-emerald-500" />
								<span className="text-[5px] font-bold text-foreground">At work · 14:20</span>
							</div>
							{/* 24h dial */}
							<div className="rounded-full aspect-square w-full bg-white/50 dark:bg-white/15 backdrop-blur-sm border border-white/70 dark:border-white/25 relative">
								<svg viewBox="0 0 24 24" className="absolute inset-0.5 text-primary">
									<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
									<circle
										cx="12"
										cy="12"
										r="9"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeDasharray="20 56.5"
										strokeLinecap="round"
										transform="rotate(-90 12 12)"
									/>
								</svg>
							</div>
						</div>
					</div>
				)}

				{type === "reviews" && (
					<div className="w-full h-full relative flex items-center justify-center my-auto">
						<div className="w-16 h-11 rounded-lg bg-muted/60 border border-border absolute -translate-x-8 rotate-[-8deg] scale-90" />
						<div className="w-16 h-11 rounded-lg bg-muted/60 border border-border absolute translate-x-8 rotate-[8deg] scale-90" />
						<div className="w-20 rounded-lg bg-background border border-primary shadow-md z-10 p-1.5 space-y-0.5">
							<div className="text-[6px] text-amber-500 leading-none">★★★★★</div>
							<div className="text-[5px] text-foreground leading-tight">
								“Shipped our redesign in a week. Unreal.”
							</div>
							<div className="flex items-center gap-1 pt-0.5">
								<span className="size-2.5 rounded-full bg-sky-400" />
								<span className="text-[4.5px] font-bold text-muted-foreground">Ava · Growth Lead</span>
							</div>
						</div>
						<span className="absolute left-0 bottom-0 size-3.5 rounded-full border border-border bg-background text-[6px] flex items-center justify-center">
							‹
						</span>
						<span className="absolute right-0 bottom-0 size-3.5 rounded-full border border-border bg-background text-[6px] flex items-center justify-center">
							›
						</span>
					</div>
				)}

				{type === "support-hero" && (
					<div className="w-full h-full relative rounded-lg overflow-hidden my-auto bg-muted/50 border border-border/60 p-1.5 flex flex-col gap-1">
						<div className="text-center">
							<div className="text-[8px] font-black tracking-tight text-foreground leading-none">
								Support that never sleeps
							</div>
							<span className="inline-block mt-0.5 px-1.5 rounded-full bg-primary text-primary-foreground text-[5px] font-bold">
								Start free
							</span>
						</div>
						<div className="grid grid-cols-3 gap-1 flex-1">
							<div className="rounded-md bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/80 dark:border-white/20 flex items-center justify-center gap-0.5">
								{["bg-rose-400", "bg-sky-400", "bg-emerald-400"].map((c) => (
									<span key={c} className={`size-2 rounded-sm ${c}`} />
								))}
							</div>
							<div className="rounded-md bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/80 dark:border-white/20 flex flex-col items-center justify-center leading-none">
								<span className="text-[8px] font-black text-primary">12k</span>
								<span className="text-[4px] text-muted-foreground">tickets</span>
							</div>
							<div className="rounded-md bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/80 dark:border-white/20 flex flex-col items-center justify-center leading-none">
								<span className="text-[8px] font-black text-primary">98%</span>
								<span className="text-[4px] text-muted-foreground">CSAT</span>
							</div>
						</div>
					</div>
				)}

				{type === "newsletter" && (
					<div className="w-full h-full relative flex items-center justify-center my-auto rounded-lg bg-muted/40 border border-border/60 overflow-hidden">
						{["left-1.5 top-1.5 bg-rose-400", "right-2 top-2 bg-amber-400", "left-2.5 bottom-1.5 bg-emerald-400", "right-1.5 bottom-2 bg-sky-400"].map((c) => (
							<span key={c} className={`absolute ${c} size-4 rounded-full border-2 border-background shadow-xs`} />
						))}
						<div className="relative w-24 space-y-1 text-center">
							<div className="text-[6.5px] font-extrabold text-foreground leading-none">
								Join the newsletter
							</div>
							<div className="flex gap-0.5">
								<span className="flex-1 h-4 rounded border border-border bg-background text-[5px] leading-4 px-1 text-muted-foreground text-left truncate">
									you@email.com
								</span>
								<span className="h-4 px-1.5 rounded bg-primary text-primary-foreground text-[5px] font-bold leading-4">
									Subscribe
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "waitlist" && (
					<div className="w-full max-w-[136px] mx-auto my-auto flex flex-col items-center gap-1">
						<span className="px-1.5 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-[5px] font-bold text-primary uppercase tracking-wider">
							Coming soon
						</span>
						<div className="flex items-center gap-0.5">
							{["03", "14", "22"].map((n, i) => (
								<React.Fragment key={n}>
									<span className="w-5 h-5 rounded bg-background border border-border text-[7px] font-black text-foreground flex items-center justify-center font-mono">
										{n}
									</span>
									{i < 2 && <span className="text-[7px] font-black text-muted-foreground">:</span>}
								</React.Fragment>
							))}
						</div>
						<div className="flex gap-0.5 w-full">
							<span className="flex-1 h-4 rounded border border-border bg-background text-[5px] leading-4 px-1 text-muted-foreground truncate">
								you@email.com
							</span>
							<span className="h-4 px-1.5 rounded bg-primary text-primary-foreground text-[5px] font-bold leading-4">
								Join
							</span>
						</div>
						<span className="text-[5px] font-semibold text-muted-foreground">
							You&apos;re <strong className="text-foreground">#1,248</strong> in the queue
						</span>
					</div>
				)}

				{type === "bento-showcase" && (
					<div className="w-full h-full my-auto grid grid-cols-3 grid-rows-2 gap-1">
						<div className="row-span-2 rounded-md bg-background border border-border p-1 flex flex-col justify-end gap-0.5">
							<span className="self-start max-w-[80%] px-1 py-0.5 rounded-md rounded-bl-none bg-muted text-[4.5px] text-foreground">
								Hi! Need a site?
							</span>
							<span className="self-end max-w-[80%] px-1 py-0.5 rounded-md rounded-br-none bg-primary text-primary-foreground text-[4.5px]">
								Yes, this week
							</span>
						</div>
						<div className="rounded-md bg-background border border-border flex flex-col items-center justify-center leading-none">
							<span className="text-[8px] font-black text-primary">240+</span>
							<span className="text-[4px] text-muted-foreground">projects</span>
						</div>
						<div className="rounded-md bg-background border border-border p-1 flex items-center justify-center">
							<span className="w-7 h-4 rounded-sm bg-foreground/80 border-b-2 border-foreground" />
						</div>
						<div className="col-span-2 rounded-md bg-background border border-border overflow-hidden flex items-center gap-1 px-1">
							{["bg-rose-400", "bg-amber-400", "bg-emerald-400", "bg-sky-400", "bg-violet-400", "bg-pink-400"].map((c) => (
								<span key={c} className={`size-3 rounded-full ${c} shrink-0`} />
							))}
						</div>
					</div>
				)}

				{type === "book-appointment" && (
					<div className="w-full h-full relative rounded-lg overflow-hidden my-auto border border-border/60">
						<div className="absolute -top-4 -right-3 size-16 rounded-full bg-teal-300/50 blur-md" />
						<div className="absolute -bottom-4 -left-3 size-14 rounded-full bg-sky-300/50 blur-md" />
						<div className="absolute inset-0 flex gap-1 p-1.5">
							<div className="w-[38%] rounded-md bg-white/60 dark:bg-white/15 backdrop-blur-sm border border-white/70 dark:border-white/25 p-1 flex flex-col items-center justify-center gap-0.5 text-center">
								<span className="size-5 rounded-full bg-sky-400 border-2 border-background" />
								<span className="text-[5px] font-extrabold text-foreground leading-none">Dr. Lin</span>
								<span className="text-[5px] text-amber-500 leading-none">★★★★½</span>
							</div>
							<div className="flex-1 rounded-md bg-white/60 dark:bg-white/15 backdrop-blur-sm border border-white/70 dark:border-white/25 p-1 flex flex-col justify-between">
								<div className="grid grid-cols-4 gap-0.5">
									{["12", "13", "14", "15"].map((d, i) => (
										<span
											key={d}
											className={`rounded text-[5px] font-bold text-center ${i === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
											{d}
										</span>
									))}
								</div>
								<div className="grid grid-cols-2 gap-0.5">
									<span className="rounded border border-primary bg-primary/10 text-[4.5px] font-bold text-primary text-center">
										9:30
									</span>
									<span className="rounded border border-border text-[4.5px] font-bold text-foreground text-center">
										11:00
									</span>
								</div>
								<span className="rounded bg-primary text-primary-foreground text-[5px] font-bold text-center py-0.5">
									Book
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "collage-hero" && (
					<div className="w-full h-full flex gap-1.5 my-auto px-0.5">
						<div className="flex-1 flex flex-col justify-center gap-1">
							<div className="text-[8px] font-serif font-black leading-[9px] text-foreground">
								Where <span className="text-primary">little</span> minds{" "}
								<span className="text-amber-500">grow</span>
							</div>
							<div className="flex gap-0.5">
								{["#play", "#learn", "#care"].map((h) => (
									<span
										key={h}
										className="px-1 rounded-full border border-border bg-background text-[4.5px] font-bold text-muted-foreground">
										{h}
									</span>
								))}
							</div>
						</div>
						<div className="relative w-14 h-full">
							<div className="absolute left-0 top-1 w-8 h-8 rounded-md bg-amber-200 rotate-[-8deg] shadow-sm" />
							<div className="absolute right-0 top-3 w-8 h-8 rounded-md bg-sky-200 rotate-[6deg] shadow-sm" />
							<div className="absolute left-3 bottom-0 w-8 h-7 rounded-md bg-rose-200 rotate-[3deg] shadow-sm" />
							<span className="absolute -top-0.5 -right-0.5 size-5 rounded-full border border-dashed border-primary bg-background/80 flex items-center justify-center text-[5px] text-primary">
								▶
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default function AllComponentsDocsPage() {
	// Cards link within the reader's current framework rather than pinning them
	// back to the default.
	const framework = frameworkFromPathname(usePathname() ?? "");

	// Hovering a card floats the component's real sandbox demo beside it. One
	// preview at a time, mounted only while hovered.
	const { preview, getTriggerProps } = useComponentPreviewHover();

	return (
		<div className="all-components-page not-prose w-full py-4 text-foreground">
			<div className="w-full space-y-12">
				{/* Section Header - Left Aligned Exactly like Docs Layout */}
				<div className="text-left space-y-3 pb-4 border-b border-border/60">
					<span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
						<LayoutGrid className="size-3.5" />
						Component Preview Catalog
					</span>
					<h1
						id="explore-built-in-component-previews"
						className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
						Explore Built-in Component Previews
					</h1>
					<p className="text-muted-foreground text-sm md:text-base leading-relaxed w-full">
						Click any component card below to inspect interactive live previews,
						installation guides, and full source code.
					</p>
				</div>

				{/* Categorized Component Preview Cards */}
				<div className="space-y-14">
					{componentPreviewData.map((group) => (
						<div key={group.categoryTitle} className="space-y-6">
							{/* Category Header */}
							<div className="pb-3 border-b border-border/60 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
								<div>
									<div className="flex items-center gap-3">
										<div className="size-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xs shrink-0">
											<group.icon className="size-4.5" />
										</div>
										<h2
											id={group.categoryTitle
												.toLowerCase()
												.replace(/\s+/g, "-")}
											className="text-xl md:text-2xl font-black tracking-tight text-foreground leading-tight">
											{group.categoryTitle}
										</h2>
									</div>
									<p className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium">
										{group.categorySubtitle}
									</p>
								</div>
								<span className="text-xs font-mono font-bold text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 self-start sm:self-auto shrink-0">
									{group.items.length} Components
								</span>
							</div>

							{/* Cards Grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
								{group.items.map((item) => (
									<Link
										key={item.title}
										href={item.href || docsHref(framework, item.slug || "")}
										{...getTriggerProps(item.previewName, item.title)}
										className="group block rounded-2xl">
										<div className="rounded-2xl border border-border/70 bg-card p-4 transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1.5 flex flex-col h-full justify-between overflow-hidden">
											{/* Card Thumbnail / Illustration */}
											<div className="w-full h-32 rounded-xl mb-4 overflow-hidden relative">
												<MiniatureIllustration
													title={item.title}
													type={item.illustrationType}
												/>
												{item.badge && (
													<span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary text-primary-foreground shadow-sm">
														{item.badge}
													</span>
												)}
											</div>

											{/* Card Info */}
											<div className="flex items-center justify-between pt-1">
												<div>
													<h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
														{item.title}
													</h3>
													<p className="text-xs text-muted-foreground mt-0.5 font-medium">
														{item.countText}
													</p>
												</div>
												<IconSlideButton as="span" trigger="group">
													<ArrowRight className="size-3.5" />
												</IconSlideButton>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Keyed so moving to another card mounts a fresh sandbox document
			    rather than navigating the one already running. */}
			{preview && (
				<ComponentPreviewTooltip key={preview.name} {...preview} />
			)}
		</div>
	);
}
