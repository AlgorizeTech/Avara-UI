"use client";

// The motion demos (CardStack) read their config from motion's context.
import { MotionConfig } from "motion/react";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/* ═══════════════════════════════════════════════
   SECTION 3: REAL COMPONENT SHOWCASE
   ═══════════════════════════════════════════════ */

/** Shrinks a demo to the column and takes the scaled height, so it is never
    cropped at its edges. With `width`, the demo lays out at that natural
    width and scales down (never up) to fit; pass a function of the viewport
    width for demos that size themselves by viewport breakpoints, returning
    undefined where the demo already fits the column as it is. With `scale`,
    it fills the column at a fixed smaller size: laid out at column width ÷
    scale, drawn at scale. */
export function FitToWidth({
	width,
	scale: fixedScale,
	children,
}: {
	width?: number | ((viewportWidth: number) => number | undefined);
	scale?: number;
	children: ReactNode;
}) {
	const outerRef = useRef<HTMLDivElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);
	const [fit, setFit] = useState({
		scale: fixedScale ?? 1,
		width: 0,
		height: 0,
	});

	useLayoutEffect(() => {
		const outer = outerRef.current;
		const inner = innerRef.current;
		if (!outer || !inner) return;
		const measure = () => {
			const columnWidth = outer.clientWidth;
			const natural =
				(typeof width === "function" ? width(window.innerWidth) : width) ??
				columnWidth;
			const scale = fixedScale ?? Math.min(1, columnWidth / natural);
			const layoutWidth = fixedScale
				? Math.floor(columnWidth / fixedScale)
				: natural;
			// offsetHeight ignores the transform, so this is the natural height.
			const height = Math.ceil(inner.offsetHeight * scale);
			setFit((f) =>
				f.scale === scale && f.width === layoutWidth && f.height === height
					? f
					: { scale, width: layoutWidth, height },
			);
		};
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(outer);
		observer.observe(inner);
		return () => observer.disconnect();
	}, [width, fixedScale]);

	return (
		<div
			ref={outerRef}
			className="relative w-full"
			style={{ height: fit.height }}>
			<div
				ref={innerRef}
				className="absolute left-1/2 top-0 origin-top"
				style={{
					width: fit.width || undefined,
					transform: `translateX(-50%) scale(${fit.scale})`,
				}}>
				{/* Pointer moves are in page pixels but a drag moves the element in
				    its own, scaled ones: map the pointer into them so motion drags
				    (the stack swipe) keep up with the pointer. */}
				<MotionConfig
					transformPagePoint={(p) => ({
						x: p.x / fit.scale,
						y: p.y / fit.scale,
					})}>
					{children}
				</MotionConfig>
			</div>
		</div>
	);
}
