"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";

import Link from "@/components/site/intent-link";
import { CHIP, SECTION_H2, SECTION_SUB } from "@/components/home/shared";
import { COMPONENT_COUNT } from "@/config/site";
import { navigation } from "@/constants/navigation";
import { COMPONENT_TYPES, TYPE_OF_SLUG, type ComponentTypeDef, type ComponentTypeId } from "@/lib/component-types";
import { docsHref } from "@/lib/framework";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════
   FREE SHADCN UI COMPONENTS: THE DIRECTORY
   One link per component and website-section page, in a compact hairline grid
   under two tabs. The page's own name is the anchor text: it says, in the words
   people search with, what the site holds, and gives crawlers a descriptive
   path to every page. Built from the sidebar's navigation, so it can only link
   to pages that exist; the icon on each cell is its type's, from the same table
   the "All components" page filters by (src/lib/component-types.ts), and the
   pill is the sidebar's own "New" / "Core" badge where a page has one.

   Both panels are in the server HTML (the one not showing carries `hidden`), so
   every link is crawlable whichever tab is selected.
   ═══════════════════════════════════════════════ */

type Cell = { label: string; slug: string; badge?: string; icon: ComponentTypeDef["icon"] };

/** The sidebar groups listed here, and the type an unsorted page falls into. */
const TABS = [
	{ id: "components", label: "UI components", navLabel: "Ui Components", fallback: "more-ui" as ComponentTypeId },
	{ id: "sections", label: "Website sections", navLabel: "Website Sections", fallback: "more-sections" as ComponentTypeId },
].map((tab) => {
	const group = navigation.find((item) => item.label === tab.navLabel);
	const cells = (group?.children ?? []).flatMap((child): Cell[] => {
		if (!child.slug) return [];
		const type = COMPONENT_TYPES[TYPE_OF_SLUG.get(child.slug) ?? tab.fallback] as ComponentTypeDef;
		return [{ label: child.label, slug: child.slug, badge: child.badge, icon: type.icon }];
	});
	return { ...tab, cells };
}).filter((tab) => tab.cells.length > 0);

export function ComponentDirectorySection() {
	const [active, setActive] = useState(TABS[0]?.id);
	const uid = useId();
	const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
	if (TABS.length === 0) return null;

	const move = (event: KeyboardEvent, index: number) => {
		const next =
			event.key === "ArrowRight" ? (index + 1) % TABS.length
			: event.key === "ArrowLeft" ? (index - 1 + TABS.length) % TABS.length
			: event.key === "Home" ? 0
			: event.key === "End" ? TABS.length - 1
			: -1;
		if (next < 0) return;
		event.preventDefault();
		setActive(TABS[next].id);
		tabRefs.current[TABS[next].id]?.focus();
	};

	return (
		<section id="components" className="relative border-t border-border/40 bg-background pt-10 md:pt-14">
			<div className="mx-auto max-w-[1160px] px-5 text-center md:px-10">
				<span className="mb-3 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45">
					Free components
				</span>
				<h2 className={`${SECTION_H2} mx-auto max-w-[18ch] sm:max-w-none`}>
					{COMPONENT_COUNT ? `${COMPONENT_COUNT} ` : ""}
					<span className="relative inline-block">
						Free
						<svg
							viewBox="0 0 100 8"
							preserveAspectRatio="none"
							fill="none"
							aria-hidden
							className="pointer-events-none absolute -bottom-1.5 left-0 h-2 w-full text-primary">
							<path
								d="M1 5 Q 13 0 25 4 T 50 4 T 75 4 T 99 4"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								vectorEffect="non-scaling-stroke"
							/>
						</svg>
					</span>{" "}
					Shadcn UI Components
				</h2>
				<p className={`${SECTION_SUB} mx-auto mb-6 max-w-[520px]`}>
					Every component and website section for React and Tailwind CSS, with live examples and a copy-ready CLI
					install on each page.
				</p>

				<div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
					<div
						role="tablist"
						aria-label="Component directory"
						className="inline-flex rounded-full bg-foreground/[0.05] p-1">
						{TABS.map((tab, index) => {
							const on = active === tab.id;
							return (
								<button
									key={tab.id}
									ref={(node) => {
										tabRefs.current[tab.id] = node;
									}}
									type="button"
									role="tab"
									id={`${uid}-tab-${tab.id}`}
									aria-selected={on}
									aria-controls={`${uid}-panel-${tab.id}`}
									tabIndex={on ? 0 : -1}
									onClick={() => setActive(tab.id)}
									onKeyDown={(event) => move(event, index)}
									className={cn(
										"inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/50",
										on ? "bg-foreground text-background" : "text-foreground/60 hover:text-foreground",
									)}>
									{tab.label}
									<span className="tabular-nums opacity-60">{tab.cells.length}</span>
								</button>
							);
						})}
					</div>
					<Link
						href={docsHref("nextjs", "all-components")}
						className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground/60 transition-colors hover:text-foreground">
						Browse with live previews
						<ArrowRight className="size-3.5" aria-hidden />
					</Link>
				</div>
			</div>

			{TABS.map((tab) => (
				<div
					key={tab.id}
					role="tabpanel"
					id={`${uid}-panel-${tab.id}`}
					aria-labelledby={`${uid}-tab-${tab.id}`}
					hidden={active !== tab.id}
					className="overflow-hidden border-y border-border/60">
					<ul className="-mb-px -mr-px grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7">
						{tab.cells.map(({ label, slug, badge, icon: Icon }) => (
							<li key={slug} className="border-b border-r border-border/60">
								<Link
									href={docsHref("nextjs", slug)}
									className="group flex min-h-12 items-center gap-2.5 px-3 py-2 text-sm lg:text-[15px] leading-snug text-foreground/80 outline-none transition-colors hover:bg-foreground/[0.03] hover:text-foreground focus-visible:bg-foreground/[0.04] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50">
									<Icon
										className="size-4 shrink-0 text-foreground/40 transition-colors group-hover:text-primary"
										aria-hidden
									/>
									<span className="min-w-0 flex-1">{label}</span>
									{badge && <span className={CHIP}>{badge}</span>}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</section>
	);
}
