"use client";

import { QrCodeGenerator } from "@/components/custom/blocks/QrCodeGeneratorBlock";
import { QrCodeReader } from "@/components/custom/blocks/QrCodeReaderBlock";
import jsPDF from "jspdf";
import { FileText, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";

// The docs color picker emits "primary", one of the named swatches below, or
// a hex string. The QR pattern is drawn with `fill="currentColor"`, so the
// theme colour is applied as the wrapper's text colour and every QR on the
// page follows it.
const namedThemes: Record<string, { text: string; button: string }> = {
  primary: {
    text: "text-primary",
    button: "bg-primary hover:bg-primary/90 text-primary-foreground",
  },
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    button: "bg-indigo-600 hover:bg-indigo-700 text-white",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    button: "bg-rose-600 hover:bg-rose-700 text-white",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white",
  },
  lavender: {
    text: "text-[#9b8afb]",
    button: "bg-[#9b8afb] hover:bg-[#9b8afb]/90 text-white",
  },
};

const getTheme = (themeColor: string) => {
  if (themeColor.startsWith("#")) {
    return {
      text: "",
      button: "text-white hover:opacity-90",
      textStyle: { color: themeColor } as React.CSSProperties,
      buttonStyle: { backgroundColor: themeColor } as React.CSSProperties,
    };
  }
  const named = namedThemes[themeColor] ?? namedThemes.primary;
  return { ...named, textStyle: undefined, buttonStyle: undefined };
};

export default function QrCodeDemo({
  activeTab = "generator",
  themeColor = "primary",
  value: valueProp = "https://algorizetech.com/qr-code",
  level: levelProp = "L",
  example,
}: {
  activeTab?: "generator" | "reader";
  themeColor?: string;
  value?: string;
  level?: "L" | "M" | "Q" | "H";
  /** "gallery" renders the bare generator at several sizes/levels. */
  example?: "default" | "gallery";
}) {
  const [value, setValue] = useState(valueProp);
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">(levelProp);
  const theme = getTheme(themeColor);

  useEffect(() => {
    if (valueProp !== undefined) setValue(valueProp);
  }, [valueProp]);

  useEffect(() => {
    if (levelProp !== undefined) setLevel(levelProp);
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

      // `currentColor` has nothing to inherit from once the SVG is serialised
      // on its own, so bake the rendered colour into the copy we export.
      const clone = svgElement.cloneNode(true) as SVGSVGElement;
      const resolvedColor = getComputedStyle(svgElement).color;
      clone
        .querySelectorAll('[fill="currentColor"]')
        .forEach((el) => el.setAttribute("fill", resolvedColor));
      const svgData = new XMLSerializer().serializeToString(clone);
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

  if (example === "gallery") {
    const swatches = [
      { size: 96, level: "L" as const },
      { size: 140, level: "M" as const },
      { size: 200, level: "H" as const },
    ];
    return (
      <div className="w-full flex flex-wrap items-end justify-center gap-10 min-h-[400px] bg-background p-8 md:p-12 border border-border rounded-2xl">
        {swatches.map((s) => (
          <div key={s.size} className="flex flex-col items-center gap-3">
            <QrCodeGenerator
              value={value}
              size={s.size}
              level={s.level}
              bgColor="transparent"
              fgColor="currentColor"
              style={theme.textStyle}
              className={theme.text}
            />
            <span className="text-xs font-semibold text-muted-foreground">
              size={s.size} · level=&quot;{s.level}&quot;
            </span>
          </div>
        ))}
      </div>
    );
  }

  return activeTab === "generator" ? (
    <div className="w-full flex flex-col lg:flex-row gap-8 min-h-[400px] bg-background p-8 md:p-12 border border-border rounded-2xl">
      {/* Left Column */}
      <div className="flex-1 flex flex-col gap-6">
        <h3 className="text-lg font-medium text-muted-foreground">
          Generate QR codes from text or URLs.
        </h3>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="qr-input"
            className="block text-sm font-semibold text-foreground">
            Value:
          </label>
          <input
            id="qr-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-3 border border-input rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-colors"
            placeholder="https://algorizetech.com"
          />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <label className="block text-sm font-semibold text-foreground mb-1">
            Correction Level:
          </label>
          <div className="grid grid-cols-4 sm:inline-flex rounded-xl border border-border bg-background overflow-hidden w-full sm:w-max">
            {(["L", "M", "Q", "H"] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setLevel(lvl)}
                style={level === lvl ? theme.textStyle : undefined}
                className={`flex-1 cursor-pointer px-3 sm:px-4 py-2 text-sm font-medium transition-colors border-r border-border last:border-r-0 text-center flex items-center justify-center ${
                  level === lvl
                    ? `bg-muted ${theme.text}`
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}>
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-center bg-muted/50 rounded-2xl border border-border p-8 min-h-[300px] gap-6">
          <QrCodeGenerator
            id="qr-wrapper"
            value={value}
            size={220}
            level={level}
            bgColor="transparent"
            fgColor="currentColor"
            style={theme.textStyle}
            className={theme.text}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={handleDownloadPNG}
            style={theme.buttonStyle}
            className={`flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${theme.button}`}>
            <ImageIcon className="w-4 h-4" />
            Save as PNG
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground bg-card border border-border hover:bg-muted rounded-xl transition-colors">
            <FileText className="w-4 h-4" />
            Save as PDF
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full flex items-center justify-center min-h-[400px] bg-background p-8 md:p-12 border border-border rounded-2xl">
      <QrCodeReader onRead={(data) => console.log("Scanned QR:", data)} />
    </div>
  );
}
