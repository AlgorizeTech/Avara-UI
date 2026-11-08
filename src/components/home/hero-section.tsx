"use client";

import { AppleSelect } from "@/components/custom/blocks/AppleSelectBlock";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { HomepageHero } from "@/components/site/HomepageHero";
import { WALL_ITEMS, WallStack } from "@/constants/component-wall";
import Link from "@/components/site/intent-link";
import { SITE_NAME } from "@/config/site";
import { REGISTRY_NAMESPACE } from "@/lib/registry";

/* ═══════════════════════════════════════════════
   SECTION 1: HERO
   ═══════════════════════════════════════════════ */

/* ComponentWall ships in the registry, so its own type scale stays generic;
   the site's hero ramp is layered on from here through its `className`,
   reaching the copy column by structure: the badge is the link just above
   the h1, the description the paragraph right after it, and the two actions
   the links in the row that follows. */
const HERO_TYPE = [
	// Copy column width
	"[&_.cw-rise-group]:max-w-[56rem] lg:[&_.cw-rise-group]:max-w-[52rem] xl:[&_.cw-rise-group]:max-w-[58rem]",
	// Eyebrow pill
	"[&_div:has(+h1)>a]:gap-1.5 [&_div:has(+h1)>a]:border-transparent [&_div:has(+h1)>a]:bg-foreground/[0.04] [&_div:has(+h1)>a]:px-3 [&_div:has(+h1)>a]:py-1 [&_div:has(+h1)>a]:text-[12px] [&_div:has(+h1)>a]:font-normal [&_div:has(+h1)>a]:text-foreground/90",
	"[&_div:has(+h1)>a]:hover:border-transparent [&_div:has(+h1)>a]:hover:bg-foreground/10 [&_div:has(+h1)>a]:hover:text-foreground",
	// Headline: Cooper at its regular weight, max-w-none so it doesn't wrap "Build interactive"
	"[&_h1]:max-w-none [&_h1]:font-normal [&_h1]:text-[clamp(26px,5.6vw,78px)] [&_h1]:leading-[1.06] [&_h1]:tracking-[-0.03em] [&_h1]:text-foreground",
	// Force the animated word token to the next line so "Build interactive" stays on line 1
	"[&_h1>span:last-child]:basis-full [&_h1>span:last-child]:text-center",
	// Subtitle
	"[&_h1+p]:text-[clamp(13px,1.45vw,18px)] [&_h1+p]:leading-[1.65] [&_h1+p]:text-foreground/60",
	// Primary action: the clay button
	"[&_h1~div>a:first-child]:h-11 [&_h1~div>a:first-child]:rounded-full [&_h1~div>a:first-child]:bg-foreground [&_h1~div>a:first-child]:px-7 [&_h1~div>a:first-child]:text-[14px] [&_h1~div>a:first-child]:font-semibold [&_h1~div>a:first-child]:tracking-[0.3px] [&_h1~div>a:first-child]:text-background [&_h1~div>a:first-child]:hover:bg-foreground/90",
	// Secondary action: an ink-tint pill
	"[&_h1~div>a:nth-child(2)]:h-11 [&_h1~div>a:nth-child(2)]:rounded-full [&_h1~div>a:nth-child(2)]:border-transparent [&_h1~div>a:nth-child(2)]:bg-foreground/[0.04] [&_h1~div>a:nth-child(2)]:px-7 [&_h1~div>a:nth-child(2)]:text-[14px] [&_h1~div>a:nth-child(2)]:font-medium [&_h1~div>a:nth-child(2)]:text-foreground [&_h1~div>a:nth-child(2)]:hover:bg-foreground/10",
].join(" ");

/* shadcn's face in the description. It is AvatarStackBlock's `Avatar`
   (size "md") drawn straight from the Radix primitive: importing the block
   itself pulled the whole motion library, which the avatar stack and group in
   that file use, into the page's first-load bundle for one static disc. */
function ShadcnAvatar({ src, className }: { src: string; className?: string }) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 cursor-pointer transition-shadow size-9 ring-background ${className ?? ""}`}>
			<AvatarPrimitive.Image src={src} alt="" className="aspect-square h-full w-full object-cover" />
			<AvatarPrimitive.Fallback className="bg-muted flex h-full w-full items-center justify-center rounded-full text-xs font-medium" />
		</AvatarPrimitive.Root>
	);
}

/* The "Built with" label over the tool strip, in the section eyebrow's voice. */
const STACK_LABEL = (
	<span className="text-[11px] uppercase tracking-[0.12em] text-foreground/40">
		Built with
	</span>
);

export function HeroSection() {
	return (
		<section className="relative w-full overflow-hidden">
			<HomepageHero
				badge={{
					label: "Free shadcn/ui components & blocks",
					href: "/docs/nextjs",
				}}
				heading="Build interactive {word}."
				headingWords={[
					"interfaces",
					"components",
					"experiences",
					"animations",
					"dashboards",
				]}
				accent="interactive"
				description={
					<>
						{SITE_NAME} is a free library of React components and interactive blocks,
						engineered for seamless performance with Tailwind CSS, TypeScript,
						GSAP and Motion — delivered through the{" "}
						{/* The one phrase a reader should leave with: shadcn's own face,
						    then the words picked out as an iOS selection. Kept on one line
						    so the avatar, the handles and the full stop never wrap apart. */}
						<span className="whitespace-nowrap">
							<ShadcnAvatar src="/assets/tech-icons/shadcn-avatar.jpg" className="mr-2 align-middle shadow-sm" />
							<AppleSelect
								as="span"
								text="shadcn CLI"
								selection={[0, 10]}
								animate
								className="font-medium text-foreground"
							/>
							.
						</span>
					</>
				}
				install={{
					command: `npx shadcn@latest add ${REGISTRY_NAMESPACE}/{item}`,
				}}
				primaryAction={{
					label: "Browse components",
					href: "/docs/nextjs/all-components",
				}}
				secondaryAction={{ label: "Get Started", href: "/docs/nextjs" }}
				items={WALL_ITEMS}
				stack={<WallStack variant="compact" label={STACK_LABEL} />}
				interval={4500}
				linkComponent={Link}
				className={HERO_TYPE}
			/>
		</section>
	);
}
