import React from "react";
import { cn } from "@/lib/utils";

export interface ShowcaseControlPanelProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export function ShowcaseControlPanel({
	children,
	className,
	style,
}: ShowcaseControlPanelProps) {
	return (
		<div
			className={cn(
				"flex flex-col gap-6 p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl z-0 relative",
				className,
			)}
			style={style}>
			{children}
		</div>
	);
}
