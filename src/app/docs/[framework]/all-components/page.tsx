import fs from "node:fs";
import path from "node:path";

import { navigation } from "@/constants/navigation";
import {
	AllComponentsCatalog,
	type AnimationLibrary,
} from "@/components/site/all-components-catalog";
import { SITE_NAME } from "@/config/site";
import { docsPageMetadata } from "@/lib/docs-metadata";
import registry from "../../../../../registry.json";

// No MDX to read a title from, so it is given here. Without it the page
// inherits the homepage's title, description and social card.
export const metadata = docsPageMetadata("all-components", {
	title: "All Components",
	description: `Every ${SITE_NAME} component and website section in one catalog, grouped by type and filterable by GSAP or Motion animation.`,
});

type RegistryItem = {
	name: string;
	dependencies?: string[];
	registryDependencies?: string[];
};

const ITEMS = new Map(
	(registry.items as RegistryItem[]).map((item) => [item.name, item]),
);

/** `https://…/r/button.json` and `button` both name the item `button`. */
const depName = (dep: string) =>
	dep.replace(/^.*\/r\//, "").replace(/\.json$/, "");

/**
 * Whether an item animates with GSAP — directly, or through an item it
 * installs (a section built on a GSAP card still needs GSAP).
 */
function usesGsap(name: string, seen = new Set<string>()): boolean {
	if (seen.has(name)) return false;
	seen.add(name);
	const item = ITEMS.get(name);
	if (!item) return false;
	if (item.dependencies?.some((d) => d === "gsap" || d.startsWith("gsap@") || d.startsWith("@gsap/")))
		return true;
	return (item.registryDependencies ?? []).some((d) => usesGsap(depName(d), seen));
}

/** Motion builds only exist as `<name>-motion` twins of a GSAP item. */
const hasMotionTwin = (name: string) => ITEMS.has(`${name}-motion`);

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

	return <AllComponentsCatalog animationBySlug={animationBySlug} />;
}
