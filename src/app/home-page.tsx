"use client";

import dynamic from "next/dynamic";

import { HeroSection } from "@/components/home/hero-section";

/* Everything below the hero is split into its own chunk. They are still
   server-rendered (the markup is in the HTML for crawlers and first paint);
   splitting just keeps their code, GSAP included, out of the entry bundle so
   the browser can parse, run and hydrate it in separate, smaller tasks. */
const ComponentShowcase = dynamic(() =>
	import("@/components/home/component-showcase").then((m) => m.ComponentShowcase),
);
const WhyChooseUsSection = dynamic(() =>
	import("@/components/home/why-choose-us-section").then((m) => m.WhyChooseUsSection),
);
const ComponentPreviewGridSection = dynamic(() =>
	import("@/components/home/component-preview-grid-section").then(
		(m) => m.ComponentPreviewGridSection,
	),
);
const FeedbackSection = dynamic(() =>
	import("@/components/home/feedback-section").then((m) => m.FeedbackSection),
);
const AnimatedFAQSection = dynamic(() =>
	import("@/components/home/faq-section").then((m) => m.AnimatedFAQSection),
);
const CTASection = dynamic(() =>
	import("@/components/home/cta-section").then((m) => m.CTASection),
);
const FooterSection = dynamic(() =>
	import("@/components/home/footer-section").then((m) => m.FooterSection),
);

/* ═══════════════════════════════════════════════
   MAIN PAGE ENTRY POINT
   ═══════════════════════════════════════════════ */

export default function HomePage() {
	return (
		<div className="min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden font-site-sans">
			{/* The page's main landmark, for screen-reader "skip to main" and for
			    crawlers; the footer stays outside it so it keeps its own role. */}
			<main>
				<HeroSection />
				<ComponentShowcase />
				<WhyChooseUsSection />
				<ComponentPreviewGridSection />
				<FeedbackSection />
				<AnimatedFAQSection />
				<CTASection />
			</main>
			<FooterSection />
		</div>
	);
}
