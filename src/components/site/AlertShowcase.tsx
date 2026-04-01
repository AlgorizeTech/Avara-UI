"use client";

import { useState } from "react";
import { Alert, AlertType, AlertVariant } from "@/components/custom/blocks/Alerts";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { RotateCcw } from "lucide-react";

type IconType = "none" | "lucide" | "emoji";

export function AlertShowcase() {
  const [type, setType] = useState<AlertType>("success");
  const [variant, setVariant] = useState<AlertVariant>("solid");
  const [iconType, setIconType] = useState<IconType>("lucide");
  const [isDismissible, setIsDismissible] = useState<boolean>(false);
  const [showRichContent, setShowRichContent] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState<number>(0);

  const getIconString = () => {
    if (iconType === "none") return "null";
    if (iconType === "emoji") return `"🚀"`;
    switch (type) {
      case "success": return `"CheckCircle2"`;
      case "danger": return `"XCircle"`;
      case "warning": return `"AlertTriangle"`;
      default: return `"Info"`;
    }
  };

  const getTitleString = () => type.charAt(0).toUpperCase() + type.slice(1) + " Alert";

  const generateCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";
    const iconProp = iconType !== "none" ? `\n        icon=${getIconString()}` : "";
    const dismissProp = isDismissible ? `\n        dismissible={true}` : "";
    
    const openingTag = `      <Alert 
        type="${type}"
        variant="${variant}"
        title="${getTitleString()}"${iconProp}${dismissProp}`;

    if (!showRichContent) {
      return `"use client";

import { Alert } from "@/components/custom/blocks/Alerts";

export default function AlertDemo()${typeDef} {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
${openingTag}
        message="This is a dynamically generated alert message."
      />
    </div>
  );
}`;
    }

    return `"use client";

import { Alert } from "@/components/custom/blocks/Alerts";

export default function RichAlertDemo()${typeDef} {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
${openingTag}
      >
        <p className="text-sm mb-3">This is rich content rendered inside the alert as children. You can put lists, buttons, or any valid HTML here.</p>
        <div className="flex gap-3">
          <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition">Action</button>
          <button className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-md text-sm font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700 transition">Cancel</button>
        </div>
      </Alert>
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Semantic Type</label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["primary", "secondary", "success", "danger", "warning", "info", "dark"] as AlertType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 md:flex-none px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    type === t ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Visual Variant</label>
            <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
              {(["solid", "outline"] as AlertVariant[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    variant === v ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Icon Type</label>
            <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
              {[
                { id: "none", label: "None" },
                { id: "lucide", label: "Lucide Icon" },
                { id: "emoji", label: "Emoji" },
              ].map((i) => (
                <button
                  key={i.id}
                  onClick={() => setIconType(i.id as IconType)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                    iconType === i.id ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {i.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Features</label>
            <div className="flex gap-2 h-[36px] items-center">
              <button
                onClick={() => setIsDismissible(!isDismissible)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${
                  isDismissible 
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300" 
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Dismissible
              </button>
              <button
                onClick={() => setShowRichContent(!showRichContent)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${
                  showRichContent 
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300" 
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Rich Content
              </button>

              {isDismissible && (
                <button
                  onClick={() => setResetKey(prev => prev + 1)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors ml-2"
                  title="Reset Alert"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ComponentPreview name="Alert" tsCode={generateCode(true)} jsCode={generateCode(false)}>
        <div className="w-full max-w-2xl mx-auto p-4 md:p-8 bg-transparent min-h-[250px] flex items-center justify-center">
          <Alert
            key={`${variant}-${type}-${iconType}-${showRichContent}-${resetKey}`}
            type={type}
            variant={variant}
            dismissible={isDismissible}
            title={getTitleString()}
            icon={iconType === "none" ? null : iconType === "emoji" ? "🚀" : getIconString().replace(/"/g, '')}
            message={showRichContent ? "" : "This is a dynamically generated alert message explaining the current state of the system."}
          >
            {showRichContent && (
              <>
                <p className="text-sm mb-3">This is rich content rendered inside the alert as children. You can put lists, buttons, or any valid HTML here.</p>
                <div className="flex gap-3">
                  <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition cursor-pointer">Action</button>
                  <button className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-md text-sm font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700 transition cursor-pointer">Cancel</button>
                </div>
              </>
            )}
          </Alert>
        </div>
      </ComponentPreview>
    </div>
  );
}