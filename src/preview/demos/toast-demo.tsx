"use client";

import { ToastPosition, ToastProvider, ToastVariant } from "@/components/custom/blocks/ToastBlock";
import { useToast } from "@/components/custom/blocks/toast-context";

type ExampleMode = "all" | "basic" | "types" | "action" | "persistent" | "stack";

const TRIGGER =
  "px-6 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm";

const ToastButtons = ({ example = "all" }: { example?: ExampleMode }) => {
  const { toast } = useToast();

  if (example === "basic") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
        <button
          onClick={() =>
            toast({
              title: "Message sent",
              description: "We'll let you know as soon as they reply.",
            })
          }
          className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl transition-colors shadow-sm hover:opacity-90 cursor-pointer"
        >
          Show toast
        </button>
      </div>
    );
  }

  if (example === "types") {
    const types = [
      { type: "success", label: "Success", title: "Action completed", description: "Your file has been uploaded successfully.", className: "bg-emerald-600 hover:bg-emerald-700" },
      { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "bg-red-600 hover:bg-red-700" },
      { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "bg-amber-500 hover:bg-amber-600" },
      { type: "info", label: "Info", title: "Update available", description: "A new version is ready to install.", className: "bg-blue-600 hover:bg-blue-700" },
      { type: "default", label: "Default", title: "Message sent", description: undefined, className: "bg-zinc-700 hover:bg-zinc-800" },
    ] as const;

    return (
      <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
        {types.map((t) => (
          <button
            key={t.type}
            onClick={() =>
              toast({
                title: t.title,
                description: t.description,
                type: t.type,
              })
            }
            className={`${TRIGGER} ${t.className}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    );
  }

  if (example === "stack") {
    const types = [
      { type: "success", label: "Success", title: "Changes saved", description: "Your profile has been updated.", className: "bg-emerald-600 hover:bg-emerald-700" },
      { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "bg-amber-500 hover:bg-amber-600" },
      { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "bg-red-600 hover:bg-red-700" },
      { type: "info", label: "Info", title: "Update available", description: "A new version is ready to install.", className: "bg-blue-600 hover:bg-blue-700" },
    ] as const;

    return (
      <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
        {types.map((t) => (
          <button
            key={t.type}
            onClick={() =>
              toast({
                title: t.title,
                description: t.description,
                type: t.type,
              })
            }
            className={`${TRIGGER} ${t.className}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    );
  }

  if (example === "action") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
        <button
          onClick={() =>
            toast({
              title: "Update available",
              description: "A new version of the app is ready to install.",
              type: "info",
              action: {
                label: "Install Now",
                onClick: () => console.log("Installing..."),
              },
            })
          }
          className={`${TRIGGER} bg-primary text-primary-foreground hover:opacity-90 cursor-pointer`}
        >
          Toast with action
        </button>
      </div>
    );
  }

  if (example === "persistent") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
        <button
          onClick={() =>
            toast({
              title: "Upload in progress",
              description: "This toast stays until you dismiss it.",
              type: "info",
              duration: 0,
            })
          }
          className={`${TRIGGER} bg-primary text-primary-foreground hover:opacity-90 cursor-pointer`}
        >
          Persistent toast
        </button>
        <button
          onClick={() =>
            toast({
              title: "Saved",
              description: "This one disappears after 1.5 seconds.",
              type: "success",
              duration: 1500,
            })
          }
          className={`${TRIGGER} bg-emerald-600 hover:bg-emerald-700 cursor-pointer`}
        >
          Quick toast
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
      <button
        onClick={() =>
          toast({
            title: "Action completed",
            description: "Your file has been uploaded successfully.",
            type: "success",
          })
        }
        className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
      >
        Success Toast
      </button>
      <button
        onClick={() =>
          toast({
            title: "Connection failed",
            description: "Could not connect to the database. Please try again.",
            type: "error",
          })
        }
        className="px-6 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-sm"
      >
        Error Toast
      </button>
      <button
        onClick={() =>
          toast({
            title: "Update available",
            description: "A new version of the app is ready to install.",
            type: "info",
            action: {
              label: "Install Now",
              onClick: () => console.log("Installing..."),
            },
          })
        }
        className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
      >
        Info (with Action)
      </button>
      <button
        onClick={() => toast({ title: "Message sent", type: "default" })}
        className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold rounded-xl transition-colors shadow-sm"
      >
        Default Simple
      </button>
    </div>
  );
};

export default function ToastDemo({
  variant = "default",
  position = "bottom-right",
  stack = false,
  example = "all",
}: {
  variant?: ToastVariant;
  position?: ToastPosition;
  stack?: boolean;
  /** Picks which trigger buttons the preview renders. "all" is the classic set. */
  example?: ExampleMode;
}) {
  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[500px]">
      {/* We must wrap the preview area in the provider so the hooks work */}
      <ToastProvider
        key={`${variant}-${position}-${stack}`}
        variant={variant}
        position={position}
        stack={stack}
      >
        <ToastButtons example={example} />
      </ToastProvider>
    </div>
  );
}
