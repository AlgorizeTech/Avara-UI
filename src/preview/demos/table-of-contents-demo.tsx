"use client";

import { TableOfContentsBlock } from "@/components/custom/blocks/TableOfContentsBlock";
import React from "react";

export default function TableOfContentsDemo({
	color = "primary",
	showProgress = true,
	showSearch = true,
}: {
	color?: string;
	showProgress?: boolean;
	showSearch?: boolean;
}) {
	return (
		<div className="w-full p-4 sm:p-6 bg-background text-foreground max-h-[650px] overflow-y-auto rounded-2xl border border-border/40">
			<div className="w-full max-w-6xl mx-auto">
				<TableOfContentsBlock
					color={color}
					showProgress={showProgress}
					showSearch={showSearch}
				/>
			</div>
		</div>
	);
}
