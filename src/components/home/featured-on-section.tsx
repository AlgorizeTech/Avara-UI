import { Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { SECTION_EYEBROW, SECTION_INNER } from "@/components/home/shared";

/* ═══════════════════════════════════════════════
   FEATURED ON
   Launch-platform badges, shown right under the hero, left-aligned like the other sections.
   ═══════════════════════════════════════════════ */

// StartupBase, Product Hunt, BuildHop and Peerlist each ship light/dark
// variants of one badge: only the one matching the active theme is shown. Every
// badge shares one height below lg (it grows with the viewport). From lg up the
// row is a five-column grid and each image fills its column at its own aspect
// ratio, so the badges grow with the available width. Nothing is stretched.
// width/height, where known, only reserve space before the image loads.
const PRODUCT_HUNT_URL =
	"https://www.producthunt.com/products/avara-ui?utm_source=badge-follow&utm_medium=badge&utm_source=badge-avara-ui";
const PRODUCT_HUNT_BADGE =
	"https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1368796";
const PRODUCT_HUNT_ALT =
	"Avara UI - Free Animated shadcn/ui Components & Blocks | Product Hunt";
const BUILDHOP_URL =
	"https://buildhop.io/discover/avara-ui-cd7bf0e3-4d1c-4aad-b795-038c7eb9b721";
const BUILDHOP_BADGE =
	"https://buildhop.io/api/badges/launch/cd7bf0e3-4d1c-4aad-b795-038c7eb9b721";
const STARTUPBASE_URL = "https://startupbase.io/products/avaraui";
const PEERLIST_URL = "https://peerlist.io/pranto/project/avara-ui";
const PEERLIST_BADGE =
	"https://peerlist.io/api/v1/projects/embed/PRJHGNQ996OD7BQJA1KKPL8L9NQEEK?showUpvote=false";

type Badge = {
	href: string;
	rel: string;
	title?: string;
	/** Only show in this colour scheme; omit to show in both. */
	scheme?: "light" | "dark";
	src: string;
	alt: string;
	width?: number;
	height?: number;
};

const BADGES: Badge[] = [
	{
		href: `${STARTUPBASE_URL}?utm_source=startupbase&utm_medium=badge&utm_campaign=launch-badge-light`,
		rel: "noopener noreferrer",
		scheme: "light",
		src: "https://statics.startupbase.io/site/badges/launched-on-sb.svg",
		alt: "Launched on StartupBase",
		width: 300,
		height: 80,
	},
	{
		href: `${STARTUPBASE_URL}?utm_source=startupbase&utm_medium=badge&utm_campaign=featured-badge-dark`,
		rel: "noopener noreferrer",
		scheme: "dark",
		src: "https://statics.startupbase.io/site/badges/featured-on-sb-dark.svg",
		alt: "Featured on StartupBase",
		width: 300,
		height: 80,
	},
	{
		href: PRODUCT_HUNT_URL,
		rel: "noopener",
		scheme: "light",
		src: `${PRODUCT_HUNT_BADGE}&theme=light`,
		alt: PRODUCT_HUNT_ALT,
		width: 250,
		height: 54,
	},
	{
		href: PRODUCT_HUNT_URL,
		rel: "noopener",
		scheme: "dark",
		src: `${PRODUCT_HUNT_BADGE}&theme=dark`,
		alt: PRODUCT_HUNT_ALT,
		width: 250,
		height: 54,
	},
	{
		href: BUILDHOP_URL,
		rel: "noopener noreferrer",
		scheme: "light",
		src: `${BUILDHOP_BADGE}?theme=light`,
		alt: "Trending on BuildHop: Avara UI",
		width: 236,
		height: 52,
	},
	{
		href: BUILDHOP_URL,
		rel: "noopener noreferrer",
		scheme: "dark",
		src: `${BUILDHOP_BADGE}?theme=dark`,
		alt: "Trending on BuildHop: Avara UI",
		width: 236,
		height: 52,
	},
	{
		href: PEERLIST_URL,
		rel: "noreferrer",
		scheme: "light",
		src: `${PEERLIST_BADGE}&theme=light`,
		alt: "Avara UI on Peerlist",
	},
	{
		href: PEERLIST_URL,
		rel: "noreferrer",
		scheme: "dark",
		src: `${PEERLIST_BADGE}&theme=dark`,
		alt: "Avara UI on Peerlist",
	},
	{
		// No noreferrer here: OpenHunts' snippet omits it, presumably so it can
		// see the referral.
		href: "https://openhunts.com",
		rel: "noopener",
		title: "OpenHunts Club",
		src: "https://cdn.openhunts.com/badges/club.webp",
		alt: "OpenHunts Club Member",
		width: 486,
		height: 105,
	},
];

export function FeaturedOnSection() {
	return (
		<section
			aria-labelledby="featured-on-heading"
			className="border-y border-foreground/[0.06] py-10 md:py-12">
			<div className={SECTION_INNER}>
				<h2
					id="featured-on-heading"
					className={cn(SECTION_EYEBROW, "mb-5")}>
					<Award className="size-3.5" />
					Featured on
				</h2>
				<ul className="flex max-w-full flex-wrap items-center gap-x-3 gap-y-4 md:gap-x-4 lg:grid lg:grid-cols-5 lg:gap-x-4 xl:gap-x-5">
					{BADGES.map((badge) => (
						<li
							key={badge.src}
							className={cn(
								"max-w-full",
								badge.scheme === "light" && "dark:hidden",
								badge.scheme === "dark" && "hidden dark:block",
							)}>
							<a
								href={badge.href}
								target="_blank"
								rel={badge.rel}
								title={badge.title}
								className="block opacity-90 transition duration-200 hover:-translate-y-0.5 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
								<img
									src={badge.src}
									alt={badge.alt}
									width={badge.width}
									height={badge.height}
									loading="lazy"
									decoding="async"
									className="h-9 w-auto max-w-full md:h-10 lg:h-auto lg:w-full"
								/>
							</a>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
