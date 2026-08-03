"use client";

import { QrCodeGenerator } from "@/components/custom/blocks/QrCodeGeneratorBlock";
import { QrCodeReader } from "@/components/custom/blocks/QrCodeReaderBlock";
import jsPDF from "jspdf";
import { FileText, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function QrCodeDemo({
  activeTab = "generator",
  themeColor = "primary",
  value: valueProp = "https://algorizetech.com",
  level: levelProp = "L",
}: {
  activeTab?: "generator" | "reader";
  themeColor?: string;
  value?: string;
  level?: "L" | "M" | "Q" | "H";
}) {
  const [value, setValue] = useState(valueProp);
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">(levelProp);

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  useEffect(() => {
    setLevel(levelProp);
  }, [levelProp]);

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

  return activeTab === "generator" ? (
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
  );
}
