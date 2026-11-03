"use client";

import dynamic from "next/dynamic";

import { HeroSection } from "@/components/home/hero-section";
import { LazyHydrate } from "@/components/home/lazy-hydrate";

/* The showcase hydrates with the page, exactly as it always did. Its demos sit
   in FitToWidth, which the server can only render at height 0 until a layout
   effect measures it, so as static HTML the section is ~1.6k px shorter than
   it really is. Left static, the document grows and everything below it moves
   the moment it comes alive; after a refresh the restored scroll position then
   lands in the wrong place. next/dynamic keeps its HTML inline and fixes the
   measurements during the first hydration. */
const ComponentShowcase = dynamic(() =>
	import("@/components/home/component-showcase").then((m) => m.ComponentShowcase),
);

/* Every other section below the hero is its own chunk. LazyHydrate renders each section
   as ordinary inline HTML on the server (so crawlers, first paint and the
   document's full height are all exactly as before) and loads its code only as
   it nears the viewport, once the first paint has settled.

   Each section is given twice, on purpose:
   - `server`: a synchronous require, guarded by `typeof window`. The build
     replaces that test, so the require is compiled into the server bundle only
     and the browser never downloads it up front. (next/dynamic did the same
     job but made the server emit a <link rel="preload"> per chunk, so ~150 KB
     of section code was fetched before the hero had painted.)
   - `load`: the dynamic import the browser runs when the section is needed. */
/* eslint-disable @typescript-eslint/no-require-imports */
const WHY = typeof window === "undefined"
	? (require("@/components/home/why-choose-us-section") as typeof import("@/components/home/why-choose-us-section")).WhyChooseUsSection
	: null;
const GRID = typeof window === "undefined"
	? (require("@/components/home/component-preview-grid-section") as typeof import("@/components/home/component-preview-grid-section")).ComponentPreviewGridSection
	: null;
const FEEDBACK = typeof window === "undefined"
	? (require("@/components/home/feedback-section") as typeof import("@/components/home/feedback-section")).FeedbackSection
	: null;
const FAQ = typeof window === "undefined"
	? (require("@/components/home/faq-section") as typeof import("@/components/home/faq-section")).AnimatedFAQSection
	: null;
const CTA = typeof window === "undefined"
	? (require("@/components/home/cta-section") as typeof import("@/components/home/cta-section")).CTASection
	: null;
const FOOTER = typeof window === "undefined"
	? (require("@/components/home/footer-section") as typeof import("@/components/home/footer-section")).FooterSection
	: null;
/* eslint-enable @typescript-eslint/no-require-imports */

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
				{/* Same scroll-anchoring opt-out LazyHydrate gives the other sections. */}
				<div className="[overflow-anchor:none]">
					<ComponentShowcase />
				</div>
				<LazyHydrate
					server={WHY}
					load={() => import("@/components/home/why-choose-us-section").then((m) => m.WhyChooseUsSection)}
				/>
				<LazyHydrate
					server={GRID}
					load={() =>
						import("@/components/home/component-preview-grid-section").then(
							(m) => m.ComponentPreviewGridSection,
						)
					}
				/>
				<LazyHydrate
					server={FEEDBACK}
					load={() => import("@/components/home/feedback-section").then((m) => m.FeedbackSection)}
				/>
				<LazyHydrate
					server={FAQ}
					load={() => import("@/components/home/faq-section").then((m) => m.AnimatedFAQSection)}
				/>
				<LazyHydrate
					server={CTA}
					load={() => import("@/components/home/cta-section").then((m) => m.CTASection)}
				/>
			</main>
			<LazyHydrate
				server={FOOTER}
				load={() => import("@/components/home/footer-section").then((m) => m.FooterSection)}
			/>
		</div>
	);
}
