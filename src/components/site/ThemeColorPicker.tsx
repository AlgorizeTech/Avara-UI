import React from "react";
import { cn } from "@/lib/utils";

export interface ThemeColorPickerProps {
	color: string;
	onChange: (color: string) => void;
	label?: string;
	className?: string;
}

/** Preset swatches, in display order. Ids must match `PRESET_HEX` in lib/accent. */
const SWATCHES = [
	{ id: "lavender", bg: "bg-[#9b8afb]" },
	{ id: "indigo", bg: "bg-indigo-500" },
	{ id: "rose", bg: "bg-rose-500" },
	{ id: "emerald", bg: "bg-emerald-500" },
];

const SELECTED_RING =
	"ring-2 ring-offset-1 sm:ring-offset-2 ring-offset-background ring-foreground/70";

export function ThemeColorPicker({
	color,
	onChange,
	label = "Theme Color",
	className,
}: ThemeColorPickerProps) {
	return (
		<div
			className={cn("flex flex-col gap-2", className)}>
			<label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/35">
				{label}
			</label>
			<div className="w-fit max-w-full flex flex-wrap items-center justify-start gap-x-1 gap-y-1.5 sm:gap-x-1.5 p-1 bg-foreground/[0.04] rounded-xl border border-foreground/[0.06]">
				<button
					onClick={() => onChange("primary")}
					className={`px-2 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg capitalize transition-all cursor-pointer ${
						color === "default" || color === "primary" || !color
							? "bg-background text-foreground shadow-sm"
							: "text-foreground/50 hover:text-foreground/80"
					}`}>
					Default
				</button>
				{/* Below sm the row has no width to spare — drop the separator, not the swatches. */}
				<div className="hidden sm:block w-px h-4 bg-foreground/10" />
				<div className="flex items-center gap-1 sm:gap-1.5">
					{SWATCHES.map((c) => (
						<button
							key={c.id}
							onClick={() => onChange(c.id)}
							className={`w-6 h-6 sm:w-7 sm:h-7 shrink-0 rounded-full transition-all duration-200 outline-none flex items-center justify-center cursor-pointer ${c.bg} ${
								color === c.id
									? `${SELECTED_RING} scale-110`
									: "hover:scale-110 opacity-85 hover:opacity-100"
							}`}
							title={c.id}
						/>
					))}

					<div className="w-px h-4 bg-foreground/10 sm:mx-0.5" />

					{/* Custom Color Picker */}
					<div
						className={`relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 shrink-0 rounded-full overflow-hidden border transition-all cursor-pointer ${
							color.startsWith("#")
								? `border-foreground/70 scale-110 ${SELECTED_RING}`
								: "border-foreground/15 hover:scale-110"
						}`}>
						<input
							type="color"
							value={color.startsWith("#") ? color : "#9b8afb"}
							onChange={(e) => onChange(e.target.value)}
							className="absolute inset-[-10px] w-10 h-10 cursor-pointer opacity-0"
							title="Custom Hex Color"
						/>
						<div
							className="w-full h-full"
							style={{
								backgroundColor: color.startsWith("#") ? color : "transparent",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
