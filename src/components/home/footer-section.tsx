"use client";

import { cn } from "@/lib/utils";
import Link from "@/components/site/intent-link";
import { links } from "@/config/site";
import { SECTION_INNER } from "@/components/home/shared";

/* ═══════════════════════════════════════════════
   SECTION 7: FOOTER
   ═══════════════════════════════════════════════ */

const FOOTER_GROUPS: {
	label: string;
	links: { label: string; href: string; external?: boolean }[];
}[] = [
	{
		label: "Docs",
		links: [
			{ label: "Documentation", href: "/docs/nextjs" },
			{ label: "All components", href: "/docs/nextjs/all-components" },
			{ label: "Installation", href: "/docs/nextjs/installation" },
		],
	},
	{
		label: "Connect",
		links: [
			{ label: "GitHub", href: links.githubOrg, external: true },
			{
				label: "LinkedIn",
				href: "https://www.linkedin.com/company/algorizetech/",
				external: true,
			},
			{ label: "X", href: links.twitter, external: true },
		],
	},
];

// StartupBase, Product Hunt and BuildHop each ship light/dark variants of one
// badge: only the one matching the active theme is shown. Every badge shares one
// height (44px from lg up, where all four fit on a single row; 36px below, where
// the row wraps); the width follows each image's own aspect ratio so nothing is
// stretched. The width/height attributes carry that ratio (StartupBase 300x80,
// Product Hunt 250x54, BuildHop 236x52, OpenHunts 486x105) to reserve space.
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

const FOOTER_BADGES: {
	href: string;
	rel: string;
	title?: string;
	/** Only show in this colour scheme; omit to show in both. */
	scheme?: "light" | "dark";
	src: string;
	alt: string;
	width: number;
	height: number;
}[] = [
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

export function FooterSection() {
	return (
		<footer className="border-t border-foreground/[0.06] bg-background overflow-hidden">
			<div className={cn(SECTION_INNER, "pt-16 pb-6")}>
				<div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
					<div className="max-w-[280px]">
						<div className="flex items-center gap-2.5">
							<img
								src="/favicon/logo-64x64.png"
								alt=""
								width={28}
								height={28}
								className="size-7"
							/>
							<span className="text-[14px] font-semibold text-foreground">
								Avara <span className="text-brand">UI</span>
							</span>
						</div>
						<p className="mt-3 text-[13px] leading-[1.65] text-foreground/60">
							React components and interactive blocks, installed through the
							shadcn CLI.
						</p>
					</div>

					<nav
						aria-label="Footer"
						className="grid grid-cols-2 gap-x-12 gap-y-8 sm:gap-x-16">
						{FOOTER_GROUPS.map((group) => (
							<div key={group.label}>
								<p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-foreground/60">
									{group.label}
								</p>
								<ul className="flex flex-col">
									{group.links.map((link) => (
										<li key={link.label}>
											<Link
												href={link.href}
												{...(link.external && {
													target: "_blank",
													rel: "noopener noreferrer",
												})}
												className="inline-block py-1 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-colors">
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>
				</div>

				{/* Launch-platform badges */}
				<ul
					aria-label="Launch platforms"
					className="mt-12 flex max-w-full flex-wrap items-center gap-x-3 gap-y-3">
					{FOOTER_BADGES.map((badge) => (
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
									className="h-9 w-auto max-w-full lg:h-11"
								/>
							</a>
						</li>
					))}
				</ul>

				{/* Wordmark */}
				<div
					aria-hidden
					className="mt-14 select-none whitespace-nowrap font-serif font-bold text-[clamp(44px,13vw,160px)] leading-none tracking-[-0.04em] text-foreground/25">
					Avara <span className="text-brand opacity-80">UI</span>
				</div>

				<div className="mt-6 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between text-[12px] text-foreground/60">
					<span>
						Built by{" "}
						<Link
							href="https://algorizetech.com"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium text-foreground/70 hover:text-foreground transition-colors">
							AlgorizeTech
						</Link>
					</span>
					<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
						<span>Free and open source.</span>
						<span
							aria-hidden
							className="hidden sm:block h-3 w-px bg-foreground/15"
						/>
						<ul className="flex items-center gap-1">
							{FOOTER_SOCIALS.map(({ label, href, ariaLabel, Icon }) => (
								<li key={label}>
									<Link
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={ariaLabel}
										className="group inline-flex items-center justify-center rounded-md p-0.5 text-foreground/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
										<span className="flex size-5 items-center justify-center rounded-[5px] bg-foreground/[0.06] text-foreground/70 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
											<Icon className="size-2.5" />
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

function FooterXIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 300 271"
			fill="currentColor"
			aria-hidden
			className={className}>
			<path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
		</svg>
	);
}

function FooterLinkedInIcon({ className }: { className?: string }) {
	return (
		<svg
			viewBox="3.28 3.3 17.17 17.15"
			fill="currentColor"
			aria-hidden
			className={className}>
			<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
		</svg>
	);
}

const FOOTER_SOCIALS = [
	{
		label: "X",
		href: "https://x.com/Pranto39",
		ariaLabel: "Pranto Chakraborty on X",
		Icon: FooterXIcon,
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/pranto-chakraborty/",
		ariaLabel: "Pranto Chakraborty on LinkedIn",
		Icon: FooterLinkedInIcon,
	},
];
