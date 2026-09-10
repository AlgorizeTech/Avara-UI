"use client";

import { CodeBlocks } from "@/components/custom/ui/codeblocks";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
	ArrowUp,
	Bookmark,
	Check,
	ListFilter,
	Sparkles,
	X,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

export interface TOCHeading {
	id: string;
	title: string;
	level: 1 | 2 | 3;
}

export interface TOCItem {
	id: string;
	title: string;
	level?: 1 | 2 | 3;
	description?: string;
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

const DEFAULT_ITEMS: TOCItem[] = [
	{
		id: "overview",
		title: "Overview & Features",
		level: 1,
		description:
			"The Table of Contents component parses document structure and renders a sticky navigation panel with real-time active section indicators. Engineered with Framer Motion spring physics, the active indicator pill glides fluidly across items as you scroll. Includes a top scroll progress bar and section search filter out of the box.",
	},
	{
		id: "installation",
		title: "Installation & Setup",
		level: 1,
		description:
			"Integrate the component into your Next.js App Router or React application in seconds using the shadcn CLI registry command below. All required peer dependencies (Framer Motion & Lucide React) are handled automatically during installation.",
	},
	{
		id: "prerequisites",
		title: "Prerequisites",
		level: 2,
		description:
			"Requires Node.js 18+, React 18 or 19, Next.js 14+ (App Router), Tailwind CSS v4, and Framer Motion for spring physics animations.",
	},
	{
		id: "package-install",
		title: "Package Installation",
		level: 2,
		description:
			"Run the official shadcn CLI command to add the Table of Contents component directly to your component registry.",
		codeSnippet:
			"npx shadcn@latest add https://algorize-ui.vercel.app/r/table-of-contents.json",
	},
	{
		id: "configuration",
		title: "Configuration & Customization",
		level: 1,
		description:
			"Customize sidebar placement, scroll offsets, progress bar visibility, and search filter behavior via props. The component inherits your site's global CSS theme tokens and primary color variables seamlessly.",
	},
	{
		id: "tailwind-setup",
		title: "Tailwind CSS v4 Setup",
		level: 2,
		description:
			"Ensure headings include offset classes like scroll-m-24 to prevent fixed site headers from overlapping heading targets during anchor link navigation.",
	},
	{
		id: "theme-tokens",
		title: "Theme Tokens & Variables",
		level: 2,
		description:
			"Seamlessly binds to var(--primary) accent colors or custom color props for dynamic theme switching in light and dark modes.",
	},
	{
		id: "usage-examples",
		title: "Usage & Code Examples",
		level: 1,
		description:
			"Pass a structured items array containing section titles, descriptions, and code snippets to generate structured document layouts effortlessly.",
	},
	{
		id: "accessibility",
		title: "Accessibility & ARIA",
		level: 1,
		description:
			"Built with WCAG 2.1 compliance using semantic <nav> landmarks, ARIA labels, full keyboard navigation focus states, and screen reader announcements.",
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

	const [activeId, setActiveId] = useState<string>(
		externalActiveId || headings[0]?.id || ""
	);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");
	const [copiedId, setCopiedId] = useState<string | null>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	// Update activeId when prop changes
	useEffect(() => {
		if (externalActiveId) {
			setActiveId(externalActiveId);
		}
	}, [externalActiveId]);

	// Auto scroll-spy & progress calculation (supports window scroll & container scroll)
	useEffect(() => {
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

		const scrollContainer = findScrollParent(contentRef.current);

		const handleScroll = () => {
			let scrollTop = 0;
			let totalHeight = 0;

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
			if (!externalActiveId && headings.length > 0) {
				const headingElements = headings
					.map((h) => document.getElementById(h.id))
					.filter(Boolean) as HTMLElement[];

				const scrollPosition = scrollTop + 120;

				for (let i = headingElements.length - 1; i >= 0; i--) {
					const el = headingElements[i];
					const elementTop =
						scrollContainer === window
							? el.offsetTop
							: el.getBoundingClientRect().top -
							  (scrollContainer as HTMLElement).getBoundingClientRect().top +
							  (scrollContainer as HTMLElement).scrollTop;

					if (elementTop <= scrollPosition) {
						setActiveId(el.id);
						break;
					}
				}
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

	// Filter headings by search query
	const filteredHeadings = useMemo(() => {
		if (!searchQuery.trim()) return headings;
		return headings.filter((h) =>
			h.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [headings, searchQuery]);

	// Smooth scroll to heading (handles both Window & Container Scroll)
	const scrollToHeading = (id: string) => {
		setActiveId(id);
		onSelectHeading?.(id);

		const el = document.getElementById(id);
		if (!el) return;

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

		const scrollContainer = findScrollParent(contentRef.current);
		if (scrollContainer === window) {
			const yOffset = -90;
			const y =
				el.getBoundingClientRect().top + window.pageYOffset + yOffset;
			window.scrollTo({ top: y, behavior: "smooth" });
		} else {
			const container = scrollContainer as HTMLElement;
			const containerRect = container.getBoundingClientRect();
			const elRect = el.getBoundingClientRect();
			const relativeTop = elRect.top - containerRect.top + container.scrollTop;
			container.scrollTo({ top: relativeTop - 20, behavior: "smooth" });
		}
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
						<span className="text-xs font-bold text-foreground truncate transition-all">
							{headings.find((h) => h.id === activeId)?.title || headings[0]?.title}
						</span>
					</div>
				</div>
				<span
					className="text-[11px] font-bold font-mono tabular-nums px-2 py-0.5 rounded-full shrink-0"
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
							<span className="text-[11px] font-bold font-mono tabular-nums" style={{ color: "var(--toc-primary)" }}>
								{Math.round(scrollProgress)}%
							</span>
						</div>

						{showProgress && (
							<div className="w-full h-1.5 rounded-full bg-muted overflow-hidden relative">
								<motion.div
									className="h-full rounded-full origin-left"
									style={{
										width: `${scrollProgress}%`,
										backgroundColor: "var(--toc-primary)",
									}}
									transition={{ duration: 0.1 }}
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
					<nav aria-label="Table of contents" className="relative py-1 flex flex-col gap-1 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
						{/* Vertical Track Line */}
						<div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border/60 rounded-full pointer-events-none" />

						{filteredHeadings.map((heading) => {
							const isActive = activeId === heading.id;

							return (
								<div
									key={heading.id}
									className="relative flex items-center group"
								>
									{/* Active Indicator Pill */}
									{isActive && (
										<motion.div
											layoutId="active-toc-pill-left"
											className="absolute left-[10px] w-1 h-5 rounded-full z-20"
											style={{ backgroundColor: "var(--toc-primary)" }}
											transition={{
												type: "spring",
												stiffness: 350,
												damping: 30,
											}}
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
												? "font-bold"
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
					<div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] font-bold text-muted-foreground">
						<span>{filteredHeadings.length} Sections</span>
						<button
							type="button"
							onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
										<h3 className="text-base sm:text-lg font-bold text-foreground">
											{item.title}
										</h3>
									)}

									{item.description && (
										<p className="text-sm text-muted-foreground leading-relaxed">
											{item.description}
										</p>
									)}

									{item.codeSnippet && (
										<div className="rounded-2xl border border-border bg-zinc-100/70 dark:bg-black overflow-hidden shadow-xs [&>div]:border-t-0">
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
