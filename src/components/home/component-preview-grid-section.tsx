"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, LayoutGrid } from "lucide-react";
import type { CSSProperties } from "react";
import Link from "@/components/site/intent-link";
import { InView } from "@/components/home/in-view";
import { SECTION_INNER, SECTION_EYEBROW, SECTION_H2, SECTION_SUB, BTN_CLAY } from "@/components/home/shared";
import { CatalogPreview } from "@/components/site/CatalogPreview";
import { CATALOG_PREVIEWS, type CatalogPreviewSpec } from "@/components/site/catalog-previews";
import { sandboxRegistry } from "@/preview/registry";

/* ═══════════════════════════════════════════════
   COMPONENT PREVIEW CATALOG
   The same live demo cards the all-components page shows (CatalogPreview), for
   a hand-picked set that includes the former "Real Motion & Interactive
   Blocks" showcase pieces.
   ═══════════════════════════════════════════════ */

type FeaturedItem = {
	slug: string;
	title: string;
	countText: string;
	badge?: string;
	/** For pages whose catalog demo is not the one worth featuring. */
	live?: CatalogPreviewSpec;
};

const featuredComponents: FeaturedItem[] = [
	{ slug: "wallet", title: "Wallet", countText: "Fintech Cardholder", badge: "New" },
	{ slug: "card-stack", title: "Card Stack", countText: "Swipe-to-Discard Deck" },
	{
		slug: "carousel",
		title: "3D Fanned Carousel",
		countText: "Interactive 3D Slides",
		live: { component: sandboxRegistry["carousel-3d"], width: 720 },
	},
	{ slug: "dock", title: "Dock", countText: "macOS Magnification", badge: "New" },
	{ slug: "design-components-folder", title: "Components Folder", countText: "Animated File Deck" },
	{ slug: "folder", title: "Folder", countText: "Tactile File Folder" },
	{ slug: "pricing", title: "Pricing", countText: "Tier & Feature Matrix" },
	{
		slug: "accordion",
		title: "Accordion",
		countText: "Collapsible Content",
		live: { component: sandboxRegistry["accordion"], width: 600, props: { variant: "inset" } },
	},
	{ slug: "fleet-tracker", title: "Map", countText: "Fleet Tracker Map" },
	{ slug: "memories-card", title: "Memories Card", countText: "Stackable Cards" },
	{ slug: "split-flap", title: "Split Flap Display", countText: "Mechanical Flip Board" },
	{ slug: "image-compare", title: "Image Compare", countText: "Before & After Slider" },
	{ slug: "flavour-carousel", title: "Flavour Carousel", countText: "Product Flavour Hero" },
	{ slug: "bento-showcase", title: "Bento Showcase", countText: "Six-Card Marketing Bento" },
	{ slug: "faq-section", title: "FAQ", countText: "Accordion & Photo Canvas" },
	{ slug: "apple-select", title: "Apple Select", countText: "iOS Text Selection" },
];

export function ComponentPreviewGridSection() {
	return (
		<section className="py-12 md:py-16 bg-foreground/[0.02]">
			<div className={SECTION_INNER}>
				<InView className="reveal text-center mb-10">
					<span className={SECTION_EYEBROW}>
						<LayoutGrid className="size-3.5" />
						Component Preview Catalog
					</span>
					<h2 className={SECTION_H2}>Explore Built-in Component Previews</h2>
					<p className={cn(SECTION_SUB, "mx-auto")}>
						Live previews of real components. Open any card for the interactive
						demo, installation guide, and full source code.
					</p>
				</InView>

				{/* Bottom gradient fade over the last row, with the "all components" button. */}
				<div className="relative">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 py-2">
						{featuredComponents.map((item, i) => {
							const live = item.live ?? CATALOG_PREVIEWS[item.slug];
							return (
								<InView
									key={item.slug}
									threshold={0.1}
									className="reveal"
									style={{ "--reveal-i": i % 3 } as CSSProperties}>
								<div
									className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] transition-colors duration-300 hover:bg-foreground/[0.06] focus-within:ring-2 focus-within:ring-primary/50">
									{/* 2:1 panel: the card keeps one proportion whatever it shows. */}
									<div className="relative m-2 mb-0 aspect-[2/1] overflow-hidden rounded-lg bg-background">
										<div className="absolute inset-0 origin-center transition-transform duration-500 ease-out group-hover/card:scale-[1.05] motion-reduce:transition-none">
											{live && <CatalogPreview spec={live} />}
										</div>
										{item.badge && (
											<span className="absolute top-2.5 right-2.5 z-10 text-[9px] font-bold uppercase tracking-wider leading-none px-1.5 py-0.5 rounded-md bg-primary/15 text-primary border border-primary/30 backdrop-blur-sm">
												{item.badge}
											</span>
										)}
									</div>
									<div className="group flex items-start justify-between gap-3 px-4 pb-4 pt-3.5">
										<div className="min-w-0">
											<h3 className="font-sans text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
												{/* The one link, stretched over the card: a live preview holds
												    real buttons, which cannot sit inside an <a>. */}
												<Link
													href={`/docs/nextjs/${item.slug}`}
													className="inline-flex min-h-6 items-center outline-none after:absolute after:inset-0 after:z-20 after:rounded-2xl after:content-['']">
													{item.title}
												</Link>
											</h3>
											<p className="mt-1 line-clamp-1 text-[13px] text-foreground/50">
												{item.countText}
											</p>
										</div>
										<span className="size-7 shrink-0 rounded-lg bg-foreground/[0.05] flex items-center justify-center text-foreground/40 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
											<ArrowRight className="size-3.5" />
										</span>
									</div>
								</div>
								</InView>
							);
						})}
					</div>

					<div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background via-background/90 to-transparent flex items-end justify-center pb-5 pointer-events-none rounded-b-2xl z-20">
						<Link
							href="/docs/nextjs/all-components"
							className={cn(BTN_CLAY, "pointer-events-auto group/btn relative z-30 min-h-11")}>
							Explore All Components
							<ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
