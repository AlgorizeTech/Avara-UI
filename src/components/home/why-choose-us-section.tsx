import { cn } from "@/lib/utils";
import { Boxes, Check, ChevronDown, Code2, MousePointer2, Sparkles, TrendingUp, Users } from "lucide-react";
import type { CSSProperties } from "react";
import { InView } from "@/components/home/in-view";
import { SECTION_INNER, SECTION_H2, SECTION_SUB } from "@/components/home/shared";

/* ═══════════════════════════════════════════════
   WHY AVARA UI?
   The feature-journey bento from the SaaS boilerplate: an uneven 2 × 2 whose
   cards each draw one scene. Every size is in the reference's own pixels
   (see `.landing-jbx-*` in globals.css), so the layout scales as one, and
   the colours are the theme's, so a preset recolours it. Edit the words
   here; the pictures only hold what is listed in `art`.
   ═══════════════════════════════════════════════ */

const cards = [
	{ id: "signup", lines: ["Components you won't find", "anywhere else"] },
	{ id: "roles", lines: ["Built for Next.js, React", "and Tailwind CSS"] },
	{ id: "analytics", lines: ["Open source, with the story", "behind every block"] },
	{ id: "payments", lines: ["Build landing pages faster", "from ready-made blocks"] },
] as const;

/** Words inside the pictures. */
const art = {
	start: "Interactive Card",
	source: "Copy the source",
	stackLabel: "Stack: Next.js",
	compat: "Compatibility",
	ready: { name: "nextjs", state: "Ready" },
	motion: { name: "animations", state: "GSAP or Motion" },
	installed: "Installed",
	command: "shadcn add button",
	trend: "Pull requests merged",
	merged: "128 merged",
	versions: ["v1", "v2", "v3", "v4"],
	authors: "Authors",
	ship: "Ship it",
	live: "Live",
} as const;

/** Reference-pixel geometry goes through custom properties, which React's style type does not know. */
const vars = (values: Record<string, number>) => values as unknown as CSSProperties;

/** A neutral app glyph (three strokes) in a disc, for the small cards. */
function MarkDisc({ className }: { className: string }) {
	return (
		<span className={`landing-jbx-disc ${className}`}>
			<svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">
				<rect x="7.8" y="10.5" width="2.6" height="7" rx="1.3" />
				<rect x="12.7" y="6.5" width="2.6" height="15" rx="1.3" />
				<rect x="17.6" y="9" width="2.6" height="10" rx="1.3" />
			</svg>
		</span>
	);
}

/** The faint tiles behind cards 1 and 4. `tiles` are [x, y, width, height]. */
function Tiles({ tiles }: { tiles: readonly (readonly [number, number, number, number])[] }) {
	return tiles.map(([x, y, w, h], index) => (
		<span key={index} className="landing-jbx-tile" style={vars({ "--x": x, "--y": y, "--w": w, "--h": h })} />
	));
}

const SIGNUP_TILES = [
	[-30, 125, 84, 42],
	[62, 125, 219, 42],
	[289, 125, 90, 42],
	[-20, 175, 90, 44],
	[78, 175, 186, 44],
	[272, 175, 110, 44],
] as const;

function ComponentsArt() {
	return (
		<>
			<Tiles tiles={SIGNUP_TILES} />
			<span className="landing-jbx-start">
				<Sparkles />
				{art.start}
			</span>
			<MousePointer2 className="landing-jbx-pointer" />
			<span className="landing-jbx-voice-btn">
				<Code2 />
				{art.source}
			</span>
		</>
	);
}

function StackArt() {
	return (
		<>
			<span className="landing-jbx-perms">
				<span className="landing-jbx-perms-title">{art.compat}</span>
				<span className="landing-jbx-perm">
					{art.ready.name}
					<span className="landing-jbx-perm-state">
						<Check />
						{art.ready.state}
					</span>
				</span>
				<span className="landing-jbx-perm" data-locked="">
					{art.motion.name}
					<span className="landing-jbx-perm-state">{art.motion.state}</span>
				</span>
			</span>
			<span className="landing-jbx-helen">
				<span className="landing-jbx-helen-label">{art.stackLabel}</span>
				<span className="landing-jbx-glow" />
				<span className="landing-jbx-glyph">
					<Boxes />
				</span>
				<span className="landing-jbx-controls">
					<span>
						<Check />
					</span>
					<span>
						<Check />
					</span>
					<span>
						<Check />
					</span>
				</span>
			</span>
			<span className="landing-jbx-chat">
				<MarkDisc className="landing-jbx-chat-disc" />
				<span className="landing-jbx-chat-text">{art.installed}</span>
				<span className="landing-jbx-chat-line" />
				<span className="landing-jbx-chat-line landing-jbx-chat-line--long" />
				<span className="landing-jbx-chat-input">{art.command}</span>
				<MousePointer2 className="landing-jbx-chat-pointer" />
			</span>
		</>
	);
}

// Chart bars: [x, top, width], card-relative reference pixels.
const CHART_BARS = [
	[369, 196, 14],
	[397, 182, 14],
	[425, 185, 14],
	[463, 154, 16],
] as const;
const AXIS_X = [372, 404, 432, 476] as const;

function StoryArt() {
	return (
		<>
			<span className="landing-jbx-window">
				<span className="landing-jbx-lights">
					<span />
					<span />
					<span />
				</span>
			</span>
			<span className="landing-jbx-msg">
				<MarkDisc className="landing-jbx-msg-disc" />
				<span className="landing-jbx-msg-text">{art.trend}</span>
				<span className="landing-jbx-msg-line" />
			</span>
			<span className="landing-jbx-reply">{art.merged}</span>
			<span className="landing-jbx-face">
				<TrendingUp />
			</span>
			<span className="landing-jbx-chart" />
			{CHART_BARS.map(([x, top, w], index) => (
				<span key={x} className="landing-jbx-bar" style={vars({ "--x": x, "--top": top, "--w": w, "--i": index })} />
			))}
			<span className="landing-jbx-guide landing-jbx-guide--h" />
			<span className="landing-jbx-guide landing-jbx-guide--v" />
			<span className="landing-jbx-marker" />
			{art.versions.map((label, index) => (
				<span key={label} className="landing-jbx-axis" style={vars({ "--x": AXIS_X[index]! })}>
					{label}
				</span>
			))}
			<span className="landing-jbx-pill">
				<span className="landing-jbx-pill-mic">
					<Users />
				</span>
				<span className="landing-jbx-pill-label">{art.authors}</span>
				<span className="landing-jbx-pill-rule" />
				<ChevronDown className="landing-jbx-pill-more" />
			</span>
		</>
	);
}

const SHIP_TILES = [
	[-20, 118, 52, 51],
	[45, 118, 50, 51],
	[103, 118, 139, 51],
	[250, 118, 120, 51],
	[-20, 179, 120, 80],
	[108, 179, 137, 80],
	[253, 179, 62, 80],
	[322, 179, 60, 80],
] as const;

function ShipArt() {
	return (
		<>
			<Tiles tiles={SHIP_TILES} />
			<span className="landing-jbx-pie" />
			<span className="landing-jbx-report">{art.ship}</span>
			<svg viewBox="0 0 22 22" className="landing-jbx-arrow" aria-hidden="true">
				<path d="M2.5 2.5 19.5 9.2 11.6 11.6 9.2 19.5Z" />
			</svg>
			<span className="landing-jbx-chip">{art.live}</span>
			<span className="landing-jbx-ring" />
		</>
	);
}

const artById = {
	signup: ComponentsArt,
	roles: StackArt,
	analytics: StoryArt,
	payments: ShipArt,
} as const;

export function WhyChooseUsSection() {
	return (
		<section
			aria-labelledby="why-avara-title"
			className="landing-journey relative overflow-hidden border-y border-foreground/[0.06] py-14 md:py-20">
			<div className={cn(SECTION_INNER, "relative z-10")}>
				<div className="text-center">
					<h2 id="why-avara-title" className={SECTION_H2}>
						Why Avara UI?
					</h2>
					<p className={cn(SECTION_SUB, "mx-auto")}>
						Engineered to explore unique interaction patterns, from 3D displacement hover effects to physics
						animations and scalable layouts.
					</p>
				</div>
				<div className="landing-jbx-frame">
					<div className="landing-jbx">
						<ol className="landing-jbx-grid">
							{cards.map((card) => {
								const Art = artById[card.id];
								return (
									<InView as="li" key={card.id} className="landing-jbx-card" data-card={card.id} threshold={0.35}>
										<h3 className="landing-jbx-title">
											{card.lines.map((line, index) => (
												<span key={line}>
													{line}
													{index < card.lines.length - 1 ? " " : null}
												</span>
											))}
										</h3>
										<div className="landing-jbx-stage" aria-hidden="true">
											<Art />
										</div>
									</InView>
								);
							})}
						</ol>
					</div>
				</div>
			</div>
		</section>
	);
}
