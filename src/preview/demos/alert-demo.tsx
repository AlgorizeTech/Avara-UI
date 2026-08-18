"use client";

import {
  Alert,
  AlertType,
  AlertVariant,
} from "@/components/custom/blocks/Alerts";

type IconType = "none" | "lucide" | "emoji";

const TYPE_ICONS: Record<AlertType, string> = {
  primary: "Info",
  secondary: "Bell",
  success: "CheckCircle2",
  danger: "XCircle",
  warning: "AlertTriangle",
  info: "Info",
  dark: "Bell",
};

/** Backdrop the glass variant needs to read correctly. */
const backdropFor = (variant: AlertVariant) =>
  variant === "glass"
    ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-zinc-100 to-zinc-50 dark:from-blue-900/40 dark:via-zinc-950 dark:to-black"
    : "bg-transparent";

export default function AlertDemo({
  type = "success",
  variant = "modern",
  iconType = "lucide",
  isDismissible = true,
  showRichContent = false,
  resetKey = 0,
  showAll,
  title,
  message,
}: {
  type?: AlertType;
  variant?: AlertVariant;
  iconType?: IconType;
  isDismissible?: boolean;
  showRichContent?: boolean;
  resetKey?: number;
  /** Render-all modes: every semantic type, the flat variants, or the icon options. */
  showAll?: "types" | "variants" | "icons";
  /** Copy overrides so a docs example can show the exact text of its snippet. */
  title?: string;
  message?: string;
}) {
  if (showAll) {
    const types: AlertType[] = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "dark",
    ];
    const variants: AlertVariant[] = ["solid", "outline", "modern"];

    return (
      <div className="w-full max-w-2xl mx-auto p-4 md:p-8 min-h-[300px] flex flex-col justify-center gap-4 rounded-2xl">
        {showAll === "types" &&
          types.map((t) => (
            <Alert
              key={t}
              type={t}
              variant="modern"
              icon={TYPE_ICONS[t]}
              title={t.charAt(0).toUpperCase() + t.slice(1)}
              message={`A ${t} alert for conveying ${t} information.`}
            />
          ))}

        {showAll === "variants" &&
          variants.map((v) => (
            <Alert
              key={v}
              type="primary"
              variant={v}
              icon="Info"
              title={v.charAt(0).toUpperCase() + v.slice(1)}
              message={`The “${v}” visual variant.`}
            />
          ))}

        {showAll === "icons" && (
          <>
            <Alert
              type="info"
              variant="modern"
              icon="Info"
              title="Lucide icon"
              message='Pass a name from ICON_MAP, e.g. icon="Info".'
            />
            <Alert
              type="info"
              variant="modern"
              icon="🚀"
              title="Emoji"
              message='Any other string renders as-is, e.g. icon="🚀".'
            />
            <Alert
              type="info"
              variant="modern"
              icon={null}
              title="No icon"
              message="Leave icon unset (or null) for a text-only alert."
            />
          </>
        )}
      </div>
    );
  }

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
      className={`w-full max-w-2xl mx-auto p-4 md:p-8 min-h-[300px] flex items-center justify-center rounded-2xl transition-colors duration-500 ${backdropFor(variant)}`}
    >
      <Alert
        key={`${variant}-${type}-${iconType}-${showRichContent}-${resetKey}`}
        type={type}
        variant={variant}
        dismissible={isDismissible}
        title={title ?? getTitleString()}
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
            : (message ??
              "This is a dynamically generated alert message explaining the current state of the system.")
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
