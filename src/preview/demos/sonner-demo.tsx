"use client";

import { toast, Toaster } from "@/components/custom/blocks/SonnerBlock";

export default function SonnerDemo({
  position = "bottom-right",
}: {
  position?: "bottom-right" | "top-center";
}) {
  return (
    <>
      {/* The Toaster is mounted inside the demo so toasts render in the sandbox page */}
      <Toaster position={position} />

      <div className="w-full flex flex-wrap gap-4 items-center justify-center min-h-[300px] relative z-10">
        <button
          onClick={() =>
            toast("Profile updated successfully", {
              description: "Your changes have been saved to the database.",
            })
          }
          className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          Default
        </button>

        <button
          onClick={() =>
            toast.success("Deployment Complete", {
              description: "Your site is now live on the production server.",
            })
          }
          className="px-4 py-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-400 rounded-lg font-medium hover:bg-emerald-200 dark:hover:bg-emerald-500/30 transition-colors"
        >
          Success
        </button>

        <button
          onClick={() =>
            toast.error("Connection Failed", {
              description:
                "Could not reach the database. Please try again later.",
            })
          }
          className="px-4 py-2 bg-red-100 dark:bg-red-500/20 text-red-900 dark:text-red-400 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors"
        >
          Error
        </button>

        <button
          onClick={() =>
            toast("Message deleted", {
              action: {
                label: "Undo",
                onClick: () => alert("Undo clicked!"),
              },
            })
          }
          className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          With Action
        </button>
      </div>
    </>
  );
}
