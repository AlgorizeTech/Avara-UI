"use client";

import {
  ToastPosition,
  ToastProvider,
  ToastVariant,
  useToast,
} from "@/components/custom/blocks/ToastBlock";

const ToastButtons = () => {
  const { toast } = useToast();

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
        className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
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
        className="px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm"
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
        className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
      >
        Info (with Action)
      </button>
      <button
        onClick={() => toast({ title: "Message sent", type: "default" })}
        className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold rounded-xl transition-colors shadow-sm"
      >
        Default Simple
      </button>
    </div>
  );
};

export default function ToastDemo({
  variant = "default",
  position = "bottom-right",
  color = "primary",
}: {
  variant?: ToastVariant;
  position?: ToastPosition;
  color?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden w-full flex flex-col items-center justify-center min-h-[500px] ${variant === "glass" ? "bg-[url('https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center p-2 sm:p-8" : ""}`}
    >
      {/* We must wrap the preview area in the provider so the hooks work */}
      <ToastProvider
        key={`${variant}-${color}-${position}`}
        variant={variant}
        color={color}
        position={position}
      >
        <ToastButtons />
      </ToastProvider>
    </div>
  );
}
