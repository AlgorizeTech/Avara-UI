import fs from "node:fs";
import path from "node:path";

import { navigation } from "@/constants/navigation";
import {
	AllComponentsCatalog,
	type AnimationLibrary,
} from "@/components/site/all-components-catalog";
import { docsPageMetadata } from "@/lib/docs-metadata";
import { hasMotionTwin, usesCssAnimation, usesGsap } from "@/lib/docs-source";

// No MDX to read a title from; its title and description live in
// src/lib/page-seo.ts with the other hub pages'.
export const metadata = docsPageMetadata("all-components");

/**
 * Show the live preview that floats beside a card on hover. Set to `false` to
 * turn it off: the hover handlers, the sandbox iframe and everything running
 * inside it (timers, GSAP/Motion loops) are then never created.
 */
const SHOW_COMPONENT_PREVIEW = false;

/**
 * The libraries a docs page's components animate with, read from the
 * `<Installation name>` items its MDX installs. Derived at build time so a new
 * GSAP component, or a new Motion twin, shows up under its filter with no edit
 * here.
 */
function animationForSlug(slug: string): AnimationLibrary[] {
	let mdx: string;
	try {
		mdx = fs.readFileSync(
			path.join(process.cwd(), "src/app/docs/[framework]", slug, "page.mdx"),
			"utf8",
		);
	} catch {
		return [];
	}
	const names = [...mdx.matchAll(/<Installation\s+name="([^"]+)"/g)].map((m) => m[1]);
	const libraries: AnimationLibrary[] = [];
	if (names.some((n) => usesGsap(n))) libraries.push("gsap");
	if (names.some(hasMotionTwin)) libraries.push("motion");
	// Plain CSS / Tailwind motion, for pages with no animation library.
	if (!libraries.length && names.some(usesCssAnimation)) libraries.push("css");
	return libraries;
}

export default function AllComponentsDocsPage() {
	const animationBySlug: Record<string, AnimationLibrary[]> = {};
	for (const group of navigation) {
		for (const child of group.children) {
			if (!child.slug) continue;
			const libraries = animationForSlug(child.slug);
			if (libraries.length) animationBySlug[child.slug] = libraries;
		}
	}

	return (
		<AllComponentsCatalog
			animationBySlug={animationBySlug}
			showPreview={SHOW_COMPONENT_PREVIEW}
		/>
	);
}
