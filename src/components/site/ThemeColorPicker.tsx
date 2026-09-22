import React from "react";
import { cn } from "@/lib/utils";

export interface ThemeColorPickerProps {
	color: string;
	onChange: (color: string) => void;
	label?: string;
	className?: string;
}

export function ThemeColorPicker({
	color,
	onChange,
	label = "Theme Color",
	className,
}: ThemeColorPickerProps) {
	return (
		<div
			className={cn("flex flex-col gap-2", className)}>
      <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </label>
			<div className="w-fit max-w-full flex flex-wrap items-center justify-start gap-x-1 gap-y-1.5 sm:gap-x-1.5 p-1 bg-zinc-200/60 dark:bg-black/40 rounded-xl border border-zinc-200 dark:border-white/5">
				<button
					onClick={() => onChange("primary")}
					className={`px-2 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg capitalize transition-all cursor-pointer ${
						color === "default" || color === "primary" || !color
							? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
					}`}>
					Default
				</button>
				{/* Below sm the row has no width to spare — drop the separator, not the swatches. */}
				<div className="hidden sm:block w-px h-4 bg-zinc-300 dark:bg-zinc-700" />
				<div className="flex items-center gap-1 sm:gap-1.5">
					{[
						{ id: "indigo", bg: "bg-indigo-500" },
						{ id: "rose", bg: "bg-rose-500" },
						{ id: "emerald", bg: "bg-emerald-500" },
						{ id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
					].map((c) => (
						<button
							key={c.id}
							onClick={() => onChange(c.id)}
							className={`w-6 h-6 sm:w-7 sm:h-7 shrink-0 rounded-full transition-all duration-200 outline-none flex items-center justify-center cursor-pointer ${c.bg} ${
								color === c.id
									? "ring-2 ring-offset-1 sm:ring-offset-2 ring-offset-zinc-100 dark:ring-offset-zinc-900 ring-zinc-800 dark:ring-zinc-200 scale-110"
									: "hover:scale-110 opacity-85 hover:opacity-100"
							}`}
							title={c.id}
						/>
					))}

					<div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 sm:mx-0.5" />

					{/* Custom Color Picker */}
					<div
						className={`relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 shrink-0 rounded-full overflow-hidden border transition-all cursor-pointer ${
							color.startsWith("#")
								? "border-zinc-900 dark:border-white scale-110 ring-2 ring-offset-1 sm:ring-offset-2 ring-offset-zinc-100 dark:ring-offset-zinc-900 ring-zinc-800 dark:ring-zinc-200"
								: "border-zinc-300 dark:border-zinc-700 hover:scale-110"
						}`}>
						<input
							type="color"
							value={color.startsWith("#") ? color : "#8b5cf6"}
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
