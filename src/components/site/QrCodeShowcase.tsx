"use client";

import React, { useState, useEffect } from "react";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";
import { QrCodeGenerator } from "@/components/custom/blocks/QrCodeGeneratorBlock";
import { QrCodeReader } from "@/components/custom/blocks/QrCodeReaderBlock";
import jsPDF from "jspdf";
import { Download, FileText, Image as ImageIcon } from "lucide-react";

const QR_CODE_TS = `"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";

export interface QrCodeGeneratorProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: "L" | "M" | "Q" | "H";
  includeMargin?: boolean;
}

export const QrCodeGenerator = React.forwardRef<HTMLDivElement, QrCodeGeneratorProps>(
  (
    {
      value,
      size = 128,
      bgColor = "#FFFFFF",
      fgColor = "#000000",
      level = "L",
      includeMargin = false,
      className,
      ...props
    },
    ref
  ) => {
    if (!value) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-center border-2 border-dashed rounded-md bg-muted/50 text-muted-foreground",
            className
          )}
          style={{ width: size, height: size }}
          {...props}
        >
          No Value
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("inline-block", className)} {...props}>
        <QRCodeSVG
          value={value}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
          includeMargin={includeMargin}
        />
      </div>
    );
  }
);

QrCodeGenerator.displayName = "QrCodeGenerator";
`;

const READER_TS = `"use client";

import React, { useState, useRef, useCallback } from "react";
import jsQR from "jsqr";
import { UploadCloud, CheckCircle2, Copy, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QrCodeReaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onRead?: (data: string) => void;
}

export function QrCodeReader({ onRead, className, ...props }: QrCodeReaderProps) {
  // Full code can be found in the components/custom/blocks/QrCodeReaderBlock.tsx
  // This requires the 'jsqr' package: npm install jsqr
  return <div className="p-4 border rounded-md">QR Code Reader Component</div>;
}
`;

const GENERATOR_USAGE = `import { QrCodeGenerator } from "@/components/custom/blocks/QrCodeGeneratorBlock";

export default function App() {
  return (
    <div className="flex gap-4 items-center">
      <QrCodeGenerator value="https://algorizetech.com" size={200} />
      <QrCodeGenerator value="Hello World" size={120} fgColor="#3b82f6" />
    </div>
  );
}
`;

const READER_USAGE = `import { QrCodeReader } from "@/components/custom/blocks/QrCodeReaderBlock";

export default function App() {
  return (
    <div className="p-8 flex justify-center">
      <QrCodeReader onRead={(data) => console.log("Scanned:", data)} />
    </div>
  );
}
`;

export function QrCodeShowcase() {
	const [activeTab, setActiveTab] = useState<"generator" | "reader">("generator");
	const [themeColor, setThemeColor] = useState("primary");
	
	const [value, setValue] = useState("https://algorizetech.com");
	const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("L");

	const getSvgDataUrl = (): Promise<string> => {
		return new Promise((resolve, reject) => {
			const svgElement = document.querySelector(
				"#qr-wrapper svg",
			) as SVGSVGElement | null;
			if (!svgElement) {
				reject("SVG element not found");
				return;
			}

			const svgData = new XMLSerializer().serializeToString(svgElement);
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			const img = new Image();

			const svgBlob = new Blob([svgData], {
				type: "image/svg+xml;charset=utf-8",
			});
			const DOMURL = window.URL || window.webkitURL || window;
			const url = DOMURL.createObjectURL(svgBlob);

			img.onload = () => {
				const scale = 4;
				canvas.width = img.width * scale;
				canvas.height = img.height * scale;

				if (ctx) {
					ctx.fillStyle = "#ffffff";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.scale(scale, scale);
					ctx.drawImage(img, 0, 0);
					resolve(canvas.toDataURL("image/png"));
				} else {
					reject("Could not get canvas context");
				}
				DOMURL.revokeObjectURL(url);
			};
			img.onerror = () => reject("Image failed to load");
			img.src = url;
		});
	};

	const handleDownloadPNG = async () => {
		try {
			const dataUrl = await getSvgDataUrl();
			const a = document.createElement("a");
			a.href = dataUrl;
			a.download = "qrcode.png";
			a.click();
		} catch (err) {
			console.error(err);
		}
	};

	const handleDownloadPDF = async () => {
		try {
			const dataUrl = await getSvgDataUrl();
			const size = 220 * 4;
			const pdf = new jsPDF({
				orientation: "portrait",
				unit: "px",
				format: [size, size],
			});
			pdf.addImage(dataUrl, "PNG", 0, 0, size, size);
			pdf.save("qrcode.pdf");
		} catch (err) {
			console.error(err);
		}
	};

	const getCurrentCode = () => (activeTab === "generator" ? QR_CODE_TS : READER_TS);
	const getCurrentUsage = () => (activeTab === "generator" ? GENERATOR_USAGE : READER_USAGE);
	const getComponentName = () => (activeTab === "generator" ? "QrCodeGenerator" : "QrCodeReader");

	useEffect(() => {
		document.body.setAttribute("data-active-tab", activeTab);
		// Cleanup is not strictly necessary for this specific case, but good practice
		return () => {
			document.body.removeAttribute("data-active-tab");
		};
	}, [activeTab]);

	const getButtonColorClass = () => {
		if (themeColor.startsWith("#")) return "text-white";
		switch (themeColor) {
			case "primary": return "bg-primary hover:bg-primary/90 text-primary-foreground";
			case "blue": return "bg-blue-600 hover:bg-blue-700 text-white";
			case "emerald": return "bg-emerald-600 hover:bg-emerald-700 text-white";
			case "rose": return "bg-rose-600 hover:bg-rose-700 text-white";
			case "violet": return "bg-violet-600 hover:bg-violet-700 text-white";
			default: return "bg-primary hover:bg-primary/90 text-primary-foreground";
		}
	};

	const getTextColorClass = () => {
		if (themeColor.startsWith("#")) return "";
		switch (themeColor) {
			case "primary": return "text-primary";
			case "blue": return "text-blue-600 dark:text-blue-500";
			case "emerald": return "text-emerald-600 dark:text-emerald-500";
			case "rose": return "text-rose-600 dark:text-rose-500";
			case "violet": return "text-violet-600 dark:text-violet-500";
			default: return "text-primary";
		}
	};

	return (
		<div className="w-full flex flex-col gap-6 not-prose my-8">
			{/* Control Panel / Tabs */}
			<ShowcaseControlPanel className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl flex-wrap">
				<VariantTabs
					label="Component Variant"
					variants={["generator", "reader"]}
					defaultValue="generator"
					onValueChange={(v) => setActiveTab(v as "generator" | "reader")}
				/>
			<ThemeColorPicker color={themeColor} onChange={setThemeColor} label="Color Variant" />
			</ShowcaseControlPanel>

			{/* Dynamic Component Preview */}
			<ComponentPreview
				name={getComponentName()}
				tsCode={getCurrentCode()}
				jsCode={getCurrentCode()}
				usageCode={getCurrentUsage()}
				jsUsageCode={getCurrentUsage()}
				sandbox="qr-code"
				sandboxProps={{ activeTab, themeColor, value, level }}>
				
				{activeTab === "generator" ? (
					<div className="w-full flex flex-col lg:flex-row gap-8 min-h-[400px] bg-white dark:bg-black p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
						{/* Left Column */}
						<div className="flex-1 flex flex-col gap-6">
							<h3 className="text-lg font-medium text-slate-600 dark:text-slate-300">
								Generate QR codes from text or URLs.
							</h3>

							<div className="flex flex-col gap-2">
								<label
									htmlFor="qr-input"
									className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
									Value:
								</label>
								<input
									id="qr-input"
									type="text"
									value={value}
									onChange={(e) => setValue(e.target.value)}
									className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm transition-colors"
									placeholder="https://algorizetech.com"
								/>
							</div>

							<div className="flex flex-col gap-2 mt-2">
								<label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
									Correction Level:
								</label>
								<div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black overflow-hidden shadow-sm w-max">
									{(["L", "M", "Q", "H"] as const).map((lvl) => (
										<button
											key={lvl}
											onClick={() => setLevel(lvl)}
											style={{ color: level === lvl && themeColor.startsWith("#") ? themeColor : undefined }}
											className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors border-r border-slate-200 dark:border-slate-800 last:border-r-0 ${
												level === lvl
													? `bg-slate-50 dark:bg-slate-900 ${getTextColorClass()}`
													: "text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400"
											}`}>
											{lvl}
										</button>
									))}
								</div>
							</div>
						</div>

						{/* Right Column */}
						<div className="flex-1 flex flex-col gap-6">
							<div className="flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/50 p-8 min-h-[300px] gap-6">
								<QrCodeGenerator
									id="qr-wrapper"
									value={value}
									size={220}
									level={level}
									bgColor="transparent"
									fgColor={themeColor.startsWith("#") ? themeColor : "currentColor"}
									style={{ color: themeColor.startsWith("#") ? themeColor : undefined }}
									className="text-zinc-900 dark:text-white"
								/>
							</div>
							<div className="flex flex-col sm:flex-row gap-3 w-full">
								<button
									onClick={handleDownloadPNG}
									style={{ backgroundColor: themeColor.startsWith("#") ? themeColor : undefined }}
									className={`flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors shadow-sm ${getButtonColorClass()}`}>
									<ImageIcon className="w-4 h-4" />
									Save as PNG
								</button>
								<button
									onClick={handleDownloadPDF}
									className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-50 dark:text-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 rounded-xl transition-colors shadow-sm">
									<FileText className="w-4 h-4" />
									Save as PDF
								</button>
							</div>
						</div>
					</div>
				) : (
					<div className="w-full flex items-center justify-center min-h-[400px] bg-zinc-50 dark:bg-zinc-950 p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
						<QrCodeReader onRead={(data) => console.log("Scanned QR:", data)} />
					</div>
				)}
			</ComponentPreview>
		</div>
	);
}
