"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type InViewProps<T extends ElementType> = {
	as?: T;
	/** Share of the element that must be visible before it counts as seen. */
	threshold?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Marks its element for CSS-driven entrances: `data-armed` once JavaScript
 * runs, then `data-inview` the first time it scrolls into view. Start states
 * in CSS are written for `[data-armed]:not([data-inview])`, so without
 * JavaScript, or under reduced motion, everything shows in its final state.
 */
export function InView<T extends ElementType = "div">({
	as,
	threshold = 0.25,
	children,
	...props
}: InViewProps<T>) {
	const Tag: ElementType = as ?? "div";
	const ref = useRef<HTMLElement>(null);
	const [armed, setArmed] = useState(false);
	const [seen, setSeen] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return undefined;
		setArmed(true);
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return;
				setSeen(true);
				observer.disconnect();
			},
			{ threshold },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, [threshold]);

	return (
		<Tag ref={ref} data-armed={armed ? "" : undefined} data-inview={seen ? "" : undefined} {...props}>
			{children}
		</Tag>
	);
}
