"use client";

import {
  Alert,
  AlertType,
  AlertVariant,
} from "@/components/custom/blocks/Alerts";

type IconType = "none" | "lucide" | "emoji";

export default function AlertDemo({
  type = "success",
  variant = "modern",
  iconType = "lucide",
  isDismissible = true,
  showRichContent = false,
  resetKey = 0,
}: {
  type?: AlertType;
  variant?: AlertVariant;
  iconType?: IconType;
  isDismissible?: boolean;
  showRichContent?: boolean;
  resetKey?: number;
}) {
  const getIconString = () => {
    if (iconType === "none") return "null";
    if (iconType === "emoji") return `"🚀"`;
    switch (type) {
      case "success":
        return `"CheckCircle2"`;
      case "danger":
        return `"XCircle"`;
      case "warning":
        return `"AlertTriangle"`;
      default:
        return `"Info"`;
    }
  };

  const getTitleString = () =>
    type.charAt(0).toUpperCase() + type.slice(1) + " Alert";

  return (
    <div
      className={`w-full max-w-2xl mx-auto p-4 md:p-8 min-h-[300px] flex items-center justify-center rounded-2xl transition-colors duration-500 ${variant === "glass" ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-zinc-100 to-zinc-50 dark:from-blue-900/40 dark:via-zinc-950 dark:to-black" : variant === "glow" ? "bg-black" : "bg-transparent"}`}
    >
      <Alert
        key={`${variant}-${type}-${iconType}-${showRichContent}-${resetKey}`}
        type={type}
        variant={variant}
        dismissible={isDismissible}
        title={getTitleString()}
        icon={
          iconType === "none"
            ? null
            : iconType === "emoji"
              ? "🚀"
              : getIconString().replace(/"/g, "")
        }
        message={
          showRichContent
            ? ""
            : "This is a dynamically generated alert message explaining the current state of the system."
        }
      >
        {showRichContent && (
          <>
            <p className="text-sm mb-3">
              This is rich content rendered inside the alert as children. You
              can put lists, buttons, or any valid HTML here.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition cursor-pointer shadow-sm">
                Action
              </button>
              <button className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-md text-sm font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700 transition cursor-pointer">
                Cancel
              </button>
            </div>
          </>
        )}
      </Alert>
    </div>
  );
}
