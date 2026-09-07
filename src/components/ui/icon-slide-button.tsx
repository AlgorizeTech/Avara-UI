"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** Which edge the resting icon leaves by; the copy arrives from the opposite one. */
export type IconSlideDirection = "right" | "left";

/**
 * What starts the travel: the button's own hover/focus (`self`), an ancestor
 * carrying Tailwind's `group` class (`group`), or either (`both`, the default —
 * it lets the same button sit inside a hoverable card and still work alone).
 */
export type IconSlideTrigger = "self" | "group" | "both";

/**
 * Transforms per direction, split into the icon that leaves (`lead`) and the one
 * that arrives (`trail`). Every variant is spelled out as a literal string
 * because Tailwind only ever sees class names that appear verbatim in source —
 * building them by concatenating a prefix would compile to nothing.
 */
const SLIDE_CLASSES: Record<
	IconSlideDirection,
	Record<"lead" | "trail", { rest: string; self: string; group: string }>
> = {
	right: {
		lead: {
			rest: "translate-x-0",
			self: "group-hover/icon-slide:translate-x-full group-focus-visible/icon-slide:translate-x-full",
			group: "group-hover:translate-x-full group-focus-visible:translate-x-full",
		},
		trail: {
			rest: "-translate-x-full",
			self: "group-hover/icon-slide:translate-x-0 group-focus-visible/icon-slide:translate-x-0",
			group: "group-hover:translate-x-0 group-focus-visible:translate-x-0",
		},
	},
	left: {
		lead: {
			rest: "translate-x-0",
			self: "group-hover/icon-slide:-translate-x-full group-focus-visible/icon-slide:-translate-x-full",
			group: "group-hover:-translate-x-full group-focus-visible:-translate-x-full",
		},
		trail: {
			rest: "translate-x-full",
			self: "group-hover/icon-slide:translate-x-0 group-focus-visible/icon-slide:translate-x-0",
			group: "group-hover:translate-x-0 group-focus-visible:translate-x-0",
		},
	},
};

/** Default resting-to-active surface. Overridable through `className`. */
const SURFACE_CLASSES = {
	self: "group-hover/icon-slide:bg-primary group-hover/icon-slide:text-primary-foreground group-focus-visible/icon-slide:bg-primary group-focus-visible/icon-slide:text-primary-foreground",
	group: "group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:bg-primary group-focus-visible:text-primary-foreground",
};

export type IconSlideButtonProps = Omit<
	React.ComponentPropsWithoutRef<"button">,
	"children"
> & {
	/** The icon to animate. Rendered three times — see the comments below. */
	children: React.ReactNode;
	/**
	 * Element to render. Use `"span"` when the button lives inside a link or
	 * another button, where nesting a real `<button>` would be invalid HTML.
	 * @default "button"
	 */
	as?: "button" | "span" | "div";
	/** @default "right" */
	direction?: IconSlideDirection;
	/** @default "both" */
	trigger?: IconSlideTrigger;
	/**
	 * Travel time in milliseconds. Both icons share it so they move as one belt.
	 * @default 450
	 */
	duration?: number;
	/** Accessible name. Required whenever the button is the only thing to click. */
	label?: string;
};

/**
 * Icon button whose icon slides out one side on hover while an identical copy
 * rides in from the other, so the glyph reads as looping rather than nudging.
 *
 * @example
 * <IconSlideButton label="Continue">
 *   <ArrowRight className="size-3.5" />
 * </IconSlideButton>
 */
export const IconSlideButton = React.forwardRef<
	HTMLElement,
	IconSlideButtonProps
>(function IconSlideButton(
	{
		children,
		as = "button",
		direction = "right",
		trigger = "both",
		duration = 450,
		label,
		className,
		type,
		...rest
	},
	ref,
) {
	const Comp = as as React.ElementType;
	const slide = SLIDE_CLASSES[direction];
	const bySelf = trigger !== "group";
	const byGroup = trigger !== "self";

	// Inline so `duration` stays a plain number instead of an arbitrary Tailwind
	// value, which would have to be literal to compile.
	const travel: React.CSSProperties = { transitionDuration: `${duration}ms` };

	const layer =
		"absolute inset-0 flex items-center justify-center transition-transform ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none";

	return (
		<Comp
			ref={ref}
			type={as === "button" ? (type ?? "button") : undefined}
			aria-label={label}
			data-slot="icon-slide-button"
			className={cn(
				"relative inline-flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-lg",
				"bg-muted text-muted-foreground transition-colors duration-300",
				as === "button" &&
					"cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
				bySelf && "group/icon-slide",
				bySelf && SURFACE_CLASSES.self,
				byGroup && SURFACE_CLASSES.group,
				className,
			)}
			{...rest}>
			{/* Both moving icons are absolutely positioned, so this invisible copy in
			    normal flow is what gives the button an intrinsic size when no explicit
			    width/height class is passed. */}
			<span aria-hidden className="invisible">
				{children}
			</span>

			{/* The icon at rest, which leaves toward `direction`. */}
			<span
				aria-hidden
				style={travel}
				className={cn(
					layer,
					slide.lead.rest,
					bySelf && slide.lead.self,
					byGroup && slide.lead.group,
				)}>
				{children}
			</span>

			{/* Its copy, waiting just off the opposite edge to take its place. */}
			<span
				aria-hidden
				style={travel}
				className={cn(
					layer,
					slide.trail.rest,
					bySelf && slide.trail.self,
					byGroup && slide.trail.group,
				)}>
				{children}
			</span>
		</Comp>
	);
});
