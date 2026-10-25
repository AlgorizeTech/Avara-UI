"use client";

import { CodeBlocks } from "@/components/custom/ui/codeblocks";
import { cn } from "@/lib/utils";
import {
	ArrowUp,
	Bookmark,
	Check,
	ListFilter,
	Sparkles,
	X,
} from "lucide-react";
import React, {
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { springLinear } from "./motion-curves";

// The active pill glides between rows on a spring (stiffness 350, damping 30),
// as a CSS `linear()` curve generated from the same numbers.
const PILL_SPRING = springLinear({ stiffness: 350, damping: 30 });

export interface TOCHeading {
	id: string;
	title: string;
	level: 1 | 2 | 3;
}

export interface TOCItem {
	id: string;
	title: string;
	level?: 1 | 2 | 3;
	/** One paragraph, or several rendered in order. */
	description?: string | string[];
	codeSnippet?: string;
	badge?: string;
}

export interface TableOfContentsProps
	extends React.HTMLAttributes<HTMLDivElement> {
	items?: TOCItem[];
	headings?: TOCHeading[];
	activeId?: string;
	onSelectHeading?: (id: string) => void;
	/** Custom theme accent color (hex, rgb, oklch, or var(--token)) */
	color?: string;
	showProgress?: boolean;
	showSearch?: boolean;
	children?: React.ReactNode;
	sidebarTitle?: string;
}

/**
 * The nearest scrollable ancestor, or the window. The block is often mounted
 * inside a scroll container (docs previews, dashboard panes), and every scroll
 * action — spy, jump-to-heading, back to top — has to target the same box.
 */
const findScrollParent = (node: HTMLElement | null): HTMLElement | Window => {
	if (!node) return window;
	let parent = node.parentElement;
	while (parent) {
		const style = window.getComputedStyle(parent);
		if (
			(style.overflowY === "auto" || style.overflowY === "scroll") &&
			parent.scrollHeight > parent.clientHeight
		) {
			return parent;
		}
		parent = parent.parentElement;
	}
	return window;
};

const DEFAULT_ITEMS: TOCItem[] = [
	{
		id: "overview",
		title: "Overview & Features",
		level: 1,
		description: [
			"The Table of Contents component parses document structure and renders a sticky navigation panel with real-time active section indicators. The active indicator pill glides across items on a spring as you scroll, with no animation library behind it. Includes a top scroll progress bar and section search filter out of the box.",
			"Long-form pages — documentation, changelogs, legal text, knowledge-base articles — are hard to navigate once they pass a couple of screens. The reader loses track of where they are and how much is left. A persistent outline solves both: the highlighted entry answers \"where am I\", the progress bar answers \"how far to go\", and every entry is a one-click jump.",
			"The component is deliberately layout-agnostic. It works against the window scroll on a normal page, but it also detects the nearest scrollable ancestor, so it behaves identically inside a dashboard pane, a modal body, or a documentation preview with its own overflow container.",
		],
	},
	{
		id: "installation",
		title: "Installation & Setup",
		level: 1,
		description: [
			"Integrate the component into your Next.js App Router or React application in seconds using the shadcn CLI registry command below. The one peer dependency, Lucide React, is handled automatically during installation.",
			"The CLI copies the source into your project rather than adding a package, so the block is yours to edit. Rename the sidebar title, swap the icons, or change the spacing scale — nothing is hidden behind an abstraction you cannot reach.",
		],
	},
	{
		id: "prerequisites",
		title: "Prerequisites",
		level: 2,
		description: [
			"Requires Node.js 18+, React 18 or 19, Next.js 14+ (App Router), and Tailwind CSS v4. No animation library is needed.",
			"The block is a client component: it reads scroll position and element geometry, neither of which exists on the server. Keep it out of server-only files and give it a \"use client\" boundary — the shipped file already declares one.",
		],
	},
	{
		id: "package-install",
		title: "Package Installation",
		level: 2,
		description: [
			"Run the official shadcn CLI command to add the Table of Contents component directly to your component registry.",
			"The command writes the block, its theme helper, and any missing utilities, then reports which files it touched so you can review them before committing.",
		],
		codeSnippet:
			"npx shadcn@latest add @avara-ui/table-of-contents",
	},
	{
		id: "configuration",
		title: "Configuration & Customization",
		level: 1,
		description: [
			"Customize sidebar placement, scroll offsets, progress bar visibility, and search filter behavior via props. The component inherits your site's global CSS theme tokens and primary color variables seamlessly.",
			"Every visual choice is expressed through a single CSS variable, --toc-primary, which is derived from the color prop. Because the pill, the progress bar, the active row tint, and the section markers all read that one token, a theme change is a one-line change and the pieces can never drift out of sync.",
			"When the outline is driven by an external source of truth — a router, a scroll library, a CMS — pass activeId and onSelectHeading and the built-in scroll spy steps aside entirely.",
		],
	},
	{
		id: "tailwind-setup",
		title: "Tailwind CSS v4 Setup",
		level: 2,
		description: [
			"Ensure headings include offset classes like scroll-m-24 to prevent fixed site headers from overlapping heading targets during anchor link navigation.",
			"The offset should match the height of whatever is pinned above the content. A 64px header wants roughly scroll-m-20; a two-row header with a tab bar wants scroll-m-32. The block's own click handler applies a matching offset, so keyboard users, deep links, and sidebar clicks all land in the same place.",
		],
	},
	{
		id: "theme-tokens",
		title: "Theme Tokens & Variables",
		level: 2,
		description: [
			"Seamlessly binds to var(--primary) accent colors or custom color props for dynamic theme switching in light and dark modes.",
			"The color prop accepts a design-token name such as \"emerald\", any CSS color (hex, rgb, hsl, oklch), or a var(--token) reference. Tints are produced with color-mix(), so a single opaque color yields the 10–15% washes used for backgrounds without a second value being supplied.",
		],
	},
	{
		id: "scroll-behavior",
		title: "Scroll Spy & Progress",
		level: 2,
		description: [
			"The active entry is the last heading whose top has crossed a reading line a little below the top edge of the scroll box. Reading the outline this way matches how people actually scan a page: the section you are in is the one whose heading you most recently passed.",
			"Two edge cases get special handling. At the very end of the scroll range the final heading becomes active, even though its top may never reach the reading line. And after a click-initiated jump the spy pauses until the smooth scroll settles, so a heading that the box cannot scroll far enough to reach still keeps the highlight the reader chose.",
			"Progress is the scroll offset expressed as a share of the total scrollable distance, so it reaches 100% precisely when the box hits its end rather than a screen early.",
		],
	},
	{
		id: "usage-examples",
		title: "Usage & Code Examples",
		level: 1,
		description: [
			"Pass a structured items array containing section titles, descriptions, and code snippets to generate structured document layouts effortlessly.",
			"Each item carries an id, a title, and an optional level from 1 to 3. Level-two and level-three entries indent in the sidebar and render as subsections in the body, so a single flat array is enough to describe a nested outline — no tree structure to build or keep in sync.",
		],
	},
	{
		id: "custom-content",
		title: "Bringing Your Own Content",
		level: 2,
		description: [
			"When the page already has its own markup, pass it as children and supply a headings array instead of items. The sidebar still spies, filters, and jumps; it simply stops rendering the body for you. The only contract is that each heading id exists on an element in the document.",
			"This is the mode to reach for with MDX, CMS output, or any content pipeline that produces HTML: generate the heading list from the same source and hand both to the block.",
		],
	},
	{
		id: "controlled-mode",
		title: "Controlled Active State",
		level: 2,
		description: [
			"Supply activeId to take over the highlight entirely. The scroll spy is skipped while the prop is set, and onSelectHeading reports every click so the parent can update its own state, push a route, or record analytics before deciding what becomes active.",
		],
	},
	{
		id: "accessibility",
		title: "Accessibility & ARIA",
		level: 1,
		description: [
			"Built with WCAG 2.1 compliance using semantic <nav> landmarks, ARIA labels, full keyboard navigation focus states, and screen reader announcements.",
			"Every entry is a real button, so it is reachable with Tab and activated with Enter or Space without any custom key handling. The sidebar is wrapped in a labelled <nav> landmark, which lets screen-reader users jump straight to it from the landmark list and skip past it just as easily.",
			"Motion is limited to the indicator pill and the progress bar. Both are decorative — the active state is also conveyed by weight and color — so the outline stays fully usable when animations are reduced or unavailable.",
		],
	},
	{
		id: "performance",
		title: "Performance & Bundle Size",
		level: 1,
		description: [
			"The block adds a single scroll listener, registered as passive so it never blocks the compositor, and the listener does nothing more than a handful of getBoundingClientRect reads and one state update. Heading elements are looked up by id on each pass, which keeps the component correct when content is added or removed at runtime without requiring a resize observer.",
			"There is no animation library to ship. The indicator pill's glide is a single Web Animations API call per move, eased along a spring curve precomputed as CSS linear(), so the block costs nothing beyond its own code and Lucide's icons.",
		],
	},
	{
		id: "ssr-hydration",
		title: "Server Rendering & Hydration",
		level: 2,
		description: [
			"On the server the block renders its full markup — sidebar, progress bar, body sections — with the first heading marked active and progress at 0%. Nothing depends on window at render time, so there is no hydration mismatch and the outline is present in the initial HTML for crawlers and for readers on slow connections.",
			"Once hydrated, the first scroll pass runs immediately and corrects the active heading if the page loaded part-way down, for example from a deep link with a hash fragment.",
		],
	},
	{
		id: "troubleshooting",
		title: "Troubleshooting",
		level: 1,
		description: [
			"If the highlight never moves, the heading ids in the sidebar do not match ids in the document; open the inspector and compare them character for character. If jumps land a little too high or low, the scroll-margin on the headings and the offset in the click handler disagree. If Back to Top appears to do nothing, the block is inside a scroll container the parent page cannot see — the component resolves that container itself, so check that the container really is the element with overflow set.",
		],
	},
	{
		id: "faq",
		title: "Frequently Asked Questions",
		level: 1,
		description: [
			"Can the sidebar sit on the right? Yes — the layout is a 12-column grid, so swapping the column order of the two children moves it. Can it collapse on desktop? Wrap the sidebar in your own disclosure; the block does not impose one. Does it work with hash links? A deep link scrolls the browser to the heading, and the first spy pass then highlights it.",
			"Does search filter the body too? No — the filter narrows the sidebar only, so the reader's place on the page is never disturbed while they look for a section. Clearing the field restores the full outline.",
		],
	},
];

export function TableOfContentsBlock({
	items,
	headings: rawHeadings,
	activeId: externalActiveId,
	onSelectHeading,
	color = "var(--primary)",
	showProgress = true,
	showSearch = true,
	children,
	sidebarTitle = "On this page",
	className,
	...props
}: TableOfContentsProps) {
	// Normalize items array or fall back to default items
	const displayItems = useMemo<TOCItem[]>(() => {
		if (items && items.length > 0) return items;
		if (rawHeadings && rawHeadings.length > 0) {
			return rawHeadings.map((h) => ({
				id: h.id,
				title: h.title,
				level: h.level,
			}));
		}
		return DEFAULT_ITEMS;
	}, [items, rawHeadings]);

	const headings = useMemo(() => {
		return displayItems.map((item) => ({
			id: item.id,
			title: item.title,
			level: item.level || 1,
		}));
	}, [displayItems]);

	const [spiedActiveId, setActiveId] = useState<string>(
		headings[0]?.id || ""
	);
	// A supplied `activeId` takes precedence; otherwise the scroll spy decides.
	const activeId = externalActiveId || spiedActiveId;
	const [scrollProgress, setScrollProgress] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");
	const [copiedId, setCopiedId] = useState<string | null>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const navRef = useRef<HTMLElement>(null);
	// Set while a click-initiated smooth scroll is in flight. The spy stays
	// quiet until it lands, so a heading near the end of the page — where the
	// scroll can stop short of it — keeps the highlight the user just chose.
	const scrollLockRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Auto scroll-spy & progress calculation (supports window scroll & container scroll)
	useEffect(() => {
		const scrollContainer = findScrollParent(contentRef.current);

		const handleScroll = () => {
			let scrollTop: number;
			let totalHeight: number;

			if (scrollContainer === window) {
				scrollTop = window.scrollY;
				totalHeight = document.documentElement.scrollHeight - window.innerHeight;
			} else {
				const containerEl = scrollContainer as HTMLElement;
				scrollTop = containerEl.scrollTop;
				totalHeight = containerEl.scrollHeight - containerEl.clientHeight;
			}

			if (totalHeight > 0) {
				const currentProgress = (scrollTop / totalHeight) * 100;
				setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
			}

			// Scroll spy headings
			if (!externalActiveId && headings.length > 0 && !scrollLockRef.current) {
				const headingElements = headings
					.map((h) => document.getElementById(h.id))
					.filter(Boolean) as HTMLElement[];
				if (headingElements.length === 0) return;

				// Once the box is scrolled to the end, the remaining headings all sit
				// inside the last viewport and their tops can never cross the
				// activation line — so the highlight would stall a few items short
				// of the bottom. At the end, the last heading is the one being read.
				const atBottom = totalHeight > 0 && scrollTop >= totalHeight - 2;
				if (atBottom) {
					setActiveId(headingElements[headingElements.length - 1].id);
					return;
				}

				const scrollPosition = scrollTop + 120;
				let nextId = headingElements[0].id;
				for (let i = headingElements.length - 1; i >= 0; i--) {
					const el = headingElements[i];
					const elementTop =
						scrollContainer === window
							? el.offsetTop
							: el.getBoundingClientRect().top -
							  (scrollContainer as HTMLElement).getBoundingClientRect().top +
							  (scrollContainer as HTMLElement).scrollTop;

					if (elementTop <= scrollPosition) {
						nextId = el.id;
						break;
					}
				}
				setActiveId(nextId);
			}
		};

		scrollContainer.addEventListener("scroll", handleScroll as EventListener, {
			passive: true,
		});
		handleScroll();
		return () =>
			scrollContainer.removeEventListener(
				"scroll",
				handleScroll as EventListener
			);
	}, [headings, externalActiveId]);

	// Smooth-scroll the box to `top`, holding the spy off until it lands.
	// `scrollend` releases the hold as soon as the scroll settles; the timeout
	// covers browsers without the event. When the box is already there (or the
	// target is past the end and it can't move) nothing is armed, so a manual
	// scroll right after the click is not ignored.
	const smoothScrollTo = (scrollContainer: HTMLElement | Window, top: number) => {
		const current =
			scrollContainer === window
				? window.scrollY
				: (scrollContainer as HTMLElement).scrollTop;
		const max =
			scrollContainer === window
				? document.documentElement.scrollHeight - window.innerHeight
				: (scrollContainer as HTMLElement).scrollHeight -
				  (scrollContainer as HTMLElement).clientHeight;
		const target = Math.min(Math.max(top, 0), Math.max(max, 0));

		if (scrollLockRef.current) clearTimeout(scrollLockRef.current);
		const release = () => {
			if (scrollLockRef.current) clearTimeout(scrollLockRef.current);
			scrollLockRef.current = null;
			scrollContainer.removeEventListener("scrollend", release);
		};
		if (Math.abs(target - current) >= 1) {
			scrollContainer.addEventListener("scrollend", release, { once: true });
			scrollLockRef.current = setTimeout(release, 1000);
		}
		scrollContainer.scrollTo({ top: target, behavior: "smooth" });
	};

	useEffect(
		() => () => {
			if (scrollLockRef.current) clearTimeout(scrollLockRef.current);
		},
		[],
	);

	// The sidebar list has its own scroll box. As the reader moves down the
	// page the highlight can drift out of that box; nudge the list so the active
	// entry stays in view. Only the list is scrolled — scrollIntoView would also
	// move every scrollable ancestor, including the page itself.
	useEffect(() => {
		const nav = navRef.current;
		if (!nav || !activeId) return;
		const item = nav.querySelector<HTMLElement>(
			`[data-toc-id="${CSS.escape(activeId)}"]`,
		);
		if (!item) return;

		const navRect = nav.getBoundingClientRect();
		const itemRect = item.getBoundingClientRect();
		const itemTop = itemRect.top - navRect.top + nav.scrollTop;
		const itemBottom = itemTop + itemRect.height;
		const padding = 12;

		if (itemTop < nav.scrollTop + padding) {
			nav.scrollTo({ top: itemTop - padding, behavior: "smooth" });
		} else if (itemBottom > nav.scrollTop + nav.clientHeight - padding) {
			nav.scrollTo({
				top: itemBottom - nav.clientHeight + padding,
				behavior: "smooth",
			});
		}
	}, [activeId]);

	// Filter headings by search query
	const filteredHeadings = useMemo(() => {
		if (!searchQuery.trim()) return headings;
		return headings.filter((h) =>
			h.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [headings, searchQuery]);

	// The pill lives in the active row, so it is always where it belongs; when
	// that row changes (or moves, as the filter adds and removes rows) it is
	// drawn from where it was and springs home. Positions are in px from the top
	// of the nav's scroll content, which scrolling never changes.
	const pillRef = useRef<HTMLDivElement>(null);
	// Where the pill last came to rest — the "from" of the next move.
	const pillRestRef = useRef<number | null>(null);
	const pillMotionRef = useRef<{ animation: Animation; offset: number } | null>(
		null,
	);
	useLayoutEffect(() => {
		const pill = pillRef.current;
		const row = pill?.parentElement;
		if (!pill || !row) {
			// Filtered out: the pill reappears in place, without a glide.
			pillRestRef.current = null;
			pillMotionRef.current = null;
			return;
		}
		const restingTop = () => row.offsetTop + pill.offsetTop;
		const rest = restingTop();
		const before = pillRestRef.current;
		pillRestRef.current = rest;

		if (before !== null) {
			// Where the pill is on screen right now: its last resting place,
			// plus whatever is left of a glide still in flight.
			let shown = before;
			const inFlight = pillMotionRef.current;
			if (inFlight) {
				const progress = inFlight.animation.effect?.getComputedTiming().progress;
				if (progress != null) shown += inFlight.offset * (1 - progress);
				inFlight.animation.cancel();
			}
			const offset = shown - rest;
			pillMotionRef.current =
				Math.abs(offset) < 0.5
					? null
					: {
							animation: pill.animate(
								[
									{ transform: `translateY(${offset}px)` },
									{ transform: "translateY(0px)" },
								],
								{ duration: PILL_SPRING.duration, easing: PILL_SPRING.easing },
							),
							offset,
						};
		}

		// Layout can also move without a render — the sidebar appearing at the
		// lg breakpoint, a web font swapping in. Keep the resting place current.
		const observer = new ResizeObserver(() => {
			pillRestRef.current = restingTop();
		});
		if (navRef.current) observer.observe(navRef.current);
		observer.observe(row);
		return () => observer.disconnect();
	}, [activeId, filteredHeadings]);

	// Smooth scroll to heading (handles both Window & Container Scroll)
	const scrollToHeading = (id: string) => {
		setActiveId(id);
		onSelectHeading?.(id);

		const el = document.getElementById(id);
		if (!el) return;

		const scrollContainer = findScrollParent(contentRef.current);
		if (scrollContainer === window) {
			const yOffset = -90;
			const y =
				el.getBoundingClientRect().top + window.pageYOffset + yOffset;
			smoothScrollTo(window, y);
		} else {
			const container = scrollContainer as HTMLElement;
			const containerRect = container.getBoundingClientRect();
			const elRect = el.getBoundingClientRect();
			const relativeTop = elRect.top - containerRect.top + container.scrollTop;
			smoothScrollTo(container, relativeTop - 20);
		}
	};

	// Scroll whichever box actually scrolls — `window.scrollTo` is a no-op when
	// the block sits inside an overflow container.
	const scrollToTop = () => {
		smoothScrollTo(findScrollParent(contentRef.current), 0);
		setActiveId(headings[0]?.id || "");
		if (headings[0]) onSelectHeading?.(headings[0].id);
	};

	const copyHeadingLink = (id: string, e: React.MouseEvent) => {
		e.stopPropagation();
		const url = `${window.location.origin}${window.location.pathname}#${id}`;
		navigator.clipboard.writeText(url);
		setCopiedId(id);
		setTimeout(() => setCopiedId(null), 2000);
	};

	// Resolve accent color token or custom color string
	const resolvedColor = useMemo(() => {
		if (!color) return "var(--primary)";
		if (
			color === "primary" ||
			color.startsWith("var(") ||
			color.startsWith("#") ||
			color.startsWith("rgb") ||
			color.startsWith("hsl") ||
			color.startsWith("oklch")
		) {
			return color === "primary" ? "var(--primary)" : color;
		}
		// If named color like "blue", "emerald", "violet" etc., resolve to hex or CSS variable
		const colorMap: Record<string, string> = {
			blue: "#3b82f6",
			indigo: "#6366f1",
			violet: "#8b5cf6",
			purple: "#a855f7",
			pink: "#ec4899",
			rose: "#f43f5e",
			red: "#ef4444",
			orange: "#f97316",
			amber: "#f59e0b",
			yellow: "#eab308",
			emerald: "#10b981",
			green: "#22c55e",
			teal: "#14b8a6",
			cyan: "#06b6d4",
			sky: "#0ea5e9",
		};
		return colorMap[color] || color;
	}, [color]);

	return (
		<div
			className={cn(
				"w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative",
				className
			)}
			style={{ "--toc-primary": resolvedColor } as React.CSSProperties}
			{...props}
		>
			{/* MOBILE TOP BAR (DYNAMIC ACTIVE HEADING TITLE ON SCROLL) */}
			<div className="lg:hidden col-span-1 border border-border/80 bg-card/95 rounded-2xl px-4 py-3 shadow-sm flex items-center justify-between sticky top-2 z-30 backdrop-blur-md transition-all">
				<div className="flex items-center gap-2.5 min-w-0">
					<ListFilter className="w-4 h-4 shrink-0" style={{ color: "var(--toc-primary)" }} />
					<div className="flex flex-col min-w-0">
						<span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
							{sidebarTitle}
						</span>
						<span className="text-xs font-semibold text-foreground truncate transition-all">
							{headings.find((h) => h.id === activeId)?.title || headings[0]?.title}
						</span>
					</div>
				</div>
				<span
					className="text-[11px] font-semibold font-mono tabular-nums px-2 py-0.5 rounded-full shrink-0"
					style={{
						color: "var(--toc-primary)",
						backgroundColor: "color-mix(in srgb, var(--toc-primary) 15%, transparent)",
					}}
				>
					{Math.round(scrollProgress)}%
				</span>
			</div>

			{/* STICKY LEFT-SIDE TABLE OF CONTENTS SIDEBAR */}
			<div className="hidden lg:block lg:col-span-4 sticky top-4 shrink-0">
				<div className="w-full rounded-2xl border border-border/80 bg-card p-5 shadow-sm flex flex-col gap-4">
					{/* Header Title & Progress Bar */}
					<div className="flex flex-col gap-2.5 pb-3 border-b border-border/60">
						<div className="flex items-center justify-between">
							<span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
								<Bookmark className="w-3.5 h-3.5" style={{ color: "var(--toc-primary)" }} />
								{sidebarTitle}
							</span>
							<span className="text-[11px] font-semibold font-mono tabular-nums" style={{ color: "var(--toc-primary)" }}>
								{Math.round(scrollProgress)}%
							</span>
						</div>

						{showProgress && (
							<div className="w-full h-1.5 rounded-full bg-muted overflow-hidden relative">
								<div
									className="h-full rounded-full origin-left"
									style={{
										width: `${scrollProgress}%`,
										backgroundColor: "var(--toc-primary)",
									}}
								/>
							</div>
						)}
					</div>

					{/* Optional Search Filter Input */}
					{showSearch && (
						<div className="relative">
							<input
								type="text"
								placeholder="Filter sections..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full h-8 px-3 rounded-xl bg-muted/60 border border-border/60 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-[var(--toc-primary)]"
							/>
							{searchQuery && (
								<button
									type="button"
									onClick={() => setSearchQuery("")}
									className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
								>
									<X className="w-3 h-3" />
								</button>
							)}
						</div>
					)}

					{/* Navigation List */}
					<nav ref={navRef} aria-label="Table of contents" className="relative py-1 flex flex-col gap-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
						{/* Vertical Track Line */}
						<div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border/60 rounded-full pointer-events-none" />

						{filteredHeadings.map((heading) => {
							const isActive = activeId === heading.id;

							return (
								<div
									key={heading.id}
									data-toc-id={heading.id}
									className="relative flex items-center group"
								>
									{/* Active Indicator Pill */}
									{isActive && (
										<div
											ref={pillRef}
											className="absolute left-[10px] w-1 h-5 rounded-full z-20"
											style={{ backgroundColor: "var(--toc-primary)" }}
										/>
									)}

									<button
										type="button"
										onClick={() => scrollToHeading(heading.id)}
										className={cn(
											"w-full text-left pl-6 pr-8 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer relative z-10 flex items-center justify-between group",
											heading.level === 2 && "pl-9 text-[11.5px] font-medium",
											heading.level === 3 && "pl-12 text-[11px] font-normal",
											isActive
												? "font-semibold"
												: "text-muted-foreground hover:text-foreground hover:bg-muted/40"
										)}
										style={
											isActive
												? {
														color: "var(--toc-primary)",
														backgroundColor: "color-mix(in srgb, var(--toc-primary) 12%, transparent)",
												  }
												: {}
										}
									>
										<span className="truncate">{heading.title}</span>

										{/* Quick Link Copy Button on Hover */}
										<span
											onClick={(e) => copyHeadingLink(heading.id, e)}
											title="Copy link to heading"
											className="opacity-0 group-hover:opacity-100 text-[10px] text-muted-foreground transition-opacity shrink-0 ml-2"
										>
											{copiedId === heading.id ? (
												<Check className="w-3 h-3 text-emerald-500" />
											) : (
												"#"
											)}
										</span>
									</button>
								</div>
							);
						})}
					</nav>

					{/* Back to Top Quick Action */}
					<div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
						<span>{filteredHeadings.length} Sections</span>
						<button
							type="button"
							onClick={scrollToTop}
							className="flex items-center gap-1 hover:underline transition-all cursor-pointer"
							style={{ color: "var(--toc-primary)" }}
						>
							<ArrowUp className="w-3 h-3" /> Back to Top
						</button>
					</div>
				</div>
			</div>

			{/* MAIN RIGHT CONTENT AREA */}
			<div
				ref={contentRef}
				className="lg:col-span-8 flex flex-col gap-6 min-w-0"
			>
				{children || (
					<div className="prose prose-zinc dark:prose-invert max-w-none space-y-10">
						{displayItems.map((item) => {
							const level = item.level || 1;

							return (
								<section
									key={item.id}
									id={item.id}
									className={cn(
										"scroll-m-24 space-y-3",
										level === 2 && "pl-4 border-l-2 space-y-2"
									)}
									style={level === 2 ? { borderColor: "color-mix(in srgb, var(--toc-primary) 40%, transparent)" } : {}}
								>
									{level === 1 ? (
										<h2 className="text-lg sm:text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2.5 sm:gap-3">
											<span
												className="p-1.5 sm:p-2 rounded-xl border flex items-center justify-center shrink-0 shadow-xs"
												style={{
													borderColor: "color-mix(in srgb, var(--toc-primary) 30%, transparent)",
													backgroundColor: "color-mix(in srgb, var(--toc-primary) 10%, transparent)",
												}}
											>
												<Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: "var(--toc-primary)" }} />
											</span>
											{item.title}
										</h2>
									) : (
										<h3 className="text-base sm:text-lg font-semibold text-foreground">
											{item.title}
										</h3>
									)}

									{item.description &&
										(Array.isArray(item.description)
											? item.description
											: [item.description]
										).map((paragraph, i) => (
											<p
												key={i}
												className="text-sm text-muted-foreground leading-relaxed"
											>
												{paragraph}
											</p>
										))}

									{item.codeSnippet && (
										<div className="rounded-2xl border border-border bg-muted/70 overflow-hidden shadow-xs [&>div]:border-t-0">
											<CodeBlocks code={item.codeSnippet} language="bash" />
										</div>
									)}
								</section>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default TableOfContentsBlock;
