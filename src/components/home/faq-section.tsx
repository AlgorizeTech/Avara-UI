"use client";

import { AnimatedFAQBlock } from "@/components/custom/blocks/AnimatedFAQBlock";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SECTION_H2, SECTION_SUB, EYEBROW_PILL } from "@/components/home/shared";

/* ═══════════════════════════════════════════════
   SECTION 6: ANIMATED INTERACTIVE FAQ SECTION
   ═══════════════════════════════════════════════ */

export function AnimatedFAQSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-40px" });

	return (
		<section
			ref={ref}
			id="faq"
			className="py-13 md:py-16 relative overflow-hidden bg-background border-t border-border/40">
			{/* Ambient background glows */}
			<div className="pointer-events-none absolute top-10 left-1/4 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl opacity-60" />
			<div className="pointer-events-none absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-primary/5 rounded-full blur-3xl opacity-50" />

			<div className="max-w-[1320px] mx-auto px-6 md:px-8">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
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
				</motion.div>

				{/* Animated FAQ Block */}
				<motion.div
					initial={{ opacity: 0, y: 25 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7, delay: 0.15 }}>
					<AnimatedFAQBlock
						showTags={false}
						showLocation={false}
						showDimensions={false}
					/>
				</motion.div>
			</div>
		</section>
	);
}
