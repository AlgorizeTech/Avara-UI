"use client";

import { AnimatedFAQBlock } from "@/components/custom/blocks/AnimatedFAQBlock";
import { HOME_FAQ_GROUPS } from "@/components/home/faq-data";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { SECTION_H2, SECTION_SUB, EYEBROW_PILL } from "@/components/home/shared";

/* ═══════════════════════════════════════════════
   SECTION 6: ANIMATED INTERACTIVE FAQ SECTION
   ═══════════════════════════════════════════════ */

/**
 * schema.org FAQPage for the questions in the page's HTML. Only the first tab's
 * group is rendered until a reader switches tabs, and structured data must
 * describe content that is on the page, so the other groups stay out.
 */
const FAQ_JSON_LD = JSON.stringify({
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: HOME_FAQ_GROUPS[0].items.map((item) => ({
		"@type": "Question",
		name: item.question,
		acceptedAnswer: { "@type": "Answer", text: item.answer },
	})),
}).replace(/</g, "\\u003c");

export function AnimatedFAQSection() {
	const ref = useRef(null);
	const [tab, setTab] = useState(HOME_FAQ_GROUPS[0].id);
	const group = HOME_FAQ_GROUPS.find((g) => g.id === tab) ?? HOME_FAQ_GROUPS[0];

	return (
		<section
			ref={ref}
			id="faq"
			className="py-13 md:py-16 relative overflow-hidden bg-background border-t border-border/40">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_JSON_LD }} />
			{/* Ambient background glows */}
			<div className="pointer-events-none absolute top-10 left-1/4 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl opacity-60" />
			<div className="pointer-events-none absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-primary/5 rounded-full blur-3xl opacity-50" />

			<div className="max-w-[1320px] mx-auto px-6 md:px-8">
				{/* Section Header */}
				<div
					className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
					<div className={cn(EYEBROW_PILL, "mb-4")}>
						<Sparkles className="size-3.5 text-primary" />
						Common Queries
					</div>

					<h2 className={SECTION_H2}>Frequently Asked Questions</h2>

					<p className={cn(SECTION_SUB, "mx-auto")}>
						Everything you need to know about using Avara UI, component
						integration, licensing, and custom styling.
					</p>
				</div>

				{/* Animated FAQ Block */}
				<div>
					{/* Topic tabs — a short list per tab keeps the canvas from standing empty */}
					<div
						role="tablist"
						aria-label="FAQ topics"
						className="mx-auto mb-10 flex w-fit max-w-full flex-wrap items-center justify-center gap-1 rounded-3xl bg-foreground/[0.04] p-1">
						{HOME_FAQ_GROUPS.map((g) => (
							<button
								key={g.id}
								type="button"
								role="tab"
								id={`faq-tab-${g.id}`}
								aria-selected={g.id === tab}
								aria-controls="faq-panel"
								onClick={() => setTab(g.id)}
								className={cn(
									"rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors cursor-pointer",
									g.id === tab
										? "bg-background text-foreground shadow-sm"
										: "text-foreground/50 hover:text-foreground",
								)}>
								{g.label}
							</button>
						))}
					</div>

					<div role="tabpanel" id="faq-panel" aria-labelledby={`faq-tab-${group.id}`}>
						<AnimatedFAQBlock
							key={group.id}
							items={group.items}
							defaultActiveId={group.items[0].id}
							showTags={false}
							showLocation={false}
							showDimensions={false}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
