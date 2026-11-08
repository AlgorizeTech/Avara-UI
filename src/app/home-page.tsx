"use client";

import { HeroSection } from "@/components/home/hero-section";
import { LazyHydrate } from "@/components/home/lazy-hydrate";

/* Every section below the hero is its own chunk. LazyHydrate renders each section
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
const SHOWCASE = typeof window === "undefined"
	? (require("@/components/home/component-showcase") as typeof import("@/components/home/component-showcase")).ComponentShowcase
	: null;
const WHY = typeof window === "undefined"
	? (require("@/components/home/why-choose-us-section") as typeof import("@/components/home/why-choose-us-section")).WhyChooseUsSection
	: null;
const GRID = typeof window === "undefined"
	? (require("@/components/home/component-preview-grid-section") as typeof import("@/components/home/component-preview-grid-section")).ComponentPreviewGridSection
	: null;
const DIRECTORY = typeof window === "undefined"
	? (require("@/components/home/component-directory-section") as typeof import("@/components/home/component-directory-section")).ComponentDirectorySection
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

/* Everything below the showcase is skipped by the renderer until it nears the
   viewport (`content-visibility: auto`): without it, the first style + layout
   pass covered all ~3.6k elements of the static HTML in one ~600 ms task, which
   is most of the page's blocking time. `contain-intrinsic-size: auto <px>` keeps
   the document's height close to the real one meanwhile (the numbers are the
   measured section heights at <768, 768 and 1024+ px) and the browser
   remembers the real height once a section has been shown. The class names are
   spelled out in full so the home stylesheet generator can see them. */
export default function HomePage() {
	return (
		<div className="min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden font-site-sans">
			{/* The page's main landmark, for screen-reader "skip to main" and for
			    crawlers; the footer stays outside it so it keeps its own role. */}
			<main>
				<HeroSection />
				{/* Eager: the showcase's demos are sized by FitToWidth after mount, so
				    its server HTML is ~1.6k px shorter than the live section (varies with
				    the viewport, so it can't be reserved). It comes alive as soon as the
				    first paint has settled instead of waiting to be scrolled near, but
				    no longer holds up the hero's hydration or preloads its ~150 KB. */}
				<LazyHydrate
					eager
					server={SHOWCASE}
					load={() => import("@/components/home/component-showcase").then((m) => m.ComponentShowcase)}
				/>
				<LazyHydrate
					server={WHY}
					className="[content-visibility:auto] [contain-intrinsic-size:auto_1750px] md:[contain-intrinsic-size:auto_2050px] lg:[contain-intrinsic-size:auto_1190px]"
					load={() => import("@/components/home/why-choose-us-section").then((m) => m.WhyChooseUsSection)}
				/>
				<LazyHydrate
					server={GRID}
					className="[content-visibility:auto] [contain-intrinsic-size:auto_3270px] md:[contain-intrinsic-size:auto_1770px] lg:[contain-intrinsic-size:auto_1290px]"
					load={() =>
						import("@/components/home/component-preview-grid-section").then(
							(m) => m.ComponentPreviewGridSection,
						)
					}
				/>
				<LazyHydrate
					server={DIRECTORY}
					className="[content-visibility:auto] [contain-intrinsic-size:auto_3200px] md:[contain-intrinsic-size:auto_1730px] lg:[contain-intrinsic-size:auto_1440px]"
					load={() =>
						import("@/components/home/component-directory-section").then((m) => m.ComponentDirectorySection)
					}
				/>
				<LazyHydrate
					server={FEEDBACK}
					className="[content-visibility:auto] [contain-intrinsic-size:auto_4700px] md:[contain-intrinsic-size:auto_2700px] lg:[contain-intrinsic-size:auto_1990px]"
					load={() => import("@/components/home/feedback-section").then((m) => m.FeedbackSection)}
				/>
				<LazyHydrate
					server={FAQ}
					className="[content-visibility:auto] [contain-intrinsic-size:auto_1700px] md:[contain-intrinsic-size:auto_1560px] lg:[contain-intrinsic-size:auto_1090px]"
					load={() => import("@/components/home/faq-section").then((m) => m.AnimatedFAQSection)}
				/>
				<LazyHydrate
					server={CTA}
					className="[content-visibility:auto] [contain-intrinsic-size:auto_1330px] md:[contain-intrinsic-size:auto_1040px] lg:[contain-intrinsic-size:auto_1015px]"
					load={() => import("@/components/home/cta-section").then((m) => m.CTASection)}
				/>
			</main>
			<LazyHydrate
				server={FOOTER}
				className="[content-visibility:auto] [contain-intrinsic-size:auto_630px] md:[contain-intrinsic-size:auto_485px] lg:[contain-intrinsic-size:auto_540px]"
				load={() => import("@/components/home/footer-section").then((m) => m.FooterSection)}
			/>
		</div>
	);
}
