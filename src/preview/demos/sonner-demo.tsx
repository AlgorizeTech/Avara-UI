"use client";

import {
  toast,
  Toaster,
  type ToasterProps,
} from "@/components/custom/blocks/SonnerBlock";
import { cn } from "@/lib/utils";
import { useState } from "react";

const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700";

/** Laid out as a 3-column grid so the buttons mirror where the stack lands. */
const POSITIONS: { value: NonNullable<ToasterProps["position"]>; label: string }[] =
  [
    { value: "top-left", label: "Top left" },
    { value: "top-center", label: "Top center" },
    { value: "top-right", label: "Top right" },
    { value: "bottom-left", label: "Bottom left" },
    { value: "bottom-center", label: "Bottom center" },
    { value: "bottom-right", label: "Bottom right" },
  ];

// flex-wrap + a tall min-height makes the browser spread wrapped rows apart
// (align-content defaults to stretch), so content-center keeps them together on mobile.
const TRIGGER_ROW =
  "w-full flex flex-wrap content-center items-center justify-center gap-x-3 gap-y-2 sm:gap-4 min-h-[300px] relative z-10";

export default function SonnerDemo({
  position = "bottom-right",
  expand = false,
  example = "all",
}: {
  position?: ToasterProps["position"];
  expand?: boolean;
  /** Picks which trigger buttons the preview renders. "all" is the classic set. */
  example?:
    | "all"
    | "basic"
    | "types"
    | "action"
    | "stack"
    | "duration"
    | "position";
}) {
  const [activePosition, setActivePosition] = useState<
    NonNullable<ToasterProps["position"]>
  >(position ?? "bottom-right");

  if (example !== "all") {
    return (
      <>
        <Toaster
          position={example === "position" ? activePosition : position}
          expand={expand}
        />

        <div className={TRIGGER_ROW}>
          {example === "basic" && (
            <button
              onClick={() =>
                toast("Profile updated successfully", {
                  description: "Your changes have been saved to the database.",
                })
              }
              className={BTN}
            >
              Show toast
            </button>
          )}

          {example === "types" && (
            <>
              <button onClick={() => toast("Profile updated successfully", { description: "Your changes have been saved to the database." })} className={BTN}>
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
                    description: "Could not reach the database. Please try again later.",
                  })
                }
                className="px-4 py-2 bg-red-100 dark:bg-red-500/20 text-red-900 dark:text-red-400 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors"
              >
                Error
              </button>
              <button
                onClick={() =>
                  toast.info("New login detected", {
                    description: "A new device just signed in to your account.",
                  })
                }
                className="px-4 py-2 bg-blue-100 dark:bg-blue-500/20 text-blue-900 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-500/30 transition-colors"
              >
                Info
              </button>
            </>
          )}

          {example === "action" && (
            <button
              onClick={() =>
                toast("Message deleted", {
                  action: { label: "Undo", onClick: () => alert("Undo clicked!") },
                })
              }
              className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              With Action
            </button>
          )}

          {example === "stack" && (
            <button
              onClick={() => {
                toast.success("File uploaded", { description: "report-q3.pdf" });
                setTimeout(() => toast.success("File uploaded", { description: "invoice-114.pdf" }), 250);
                setTimeout(() => toast.success("File uploaded", { description: "notes.md" }), 500);
              }}
              className={BTN}
            >
              Spawn three toasts
            </button>
          )}

          {example === "position" && (
            <div className="w-full max-w-md grid grid-cols-3 gap-2 sm:gap-3">
              {POSITIONS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => {
                    toastState.clear?.();
                    setActivePosition(p.value);
                    toast(p.label, {
                      description: `Stack anchored to "${p.value}".`,
                    });
                  }}
                  className={cn(
                    "px-2 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors",
                    activePosition === p.value
                      ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700",
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}

          {example === "duration" && (
            <>
              <button
                onClick={() =>
                  toast("Syncing your workspace", {
                    description: "This toast stays until you dismiss it.",
                    duration: Infinity,
                  })
                }
                className={BTN}
              >
                Persistent
              </button>
              <button
                onClick={() =>
                  toast.success("Saved", {
                    description: "Gone in 1.5 seconds.",
                    duration: 1500,
                  })
                }
                className="px-4 py-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-400 rounded-lg font-medium hover:bg-emerald-200 dark:hover:bg-emerald-500/30 transition-colors"
              >
                Quick
              </button>
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {/* The Toaster is mounted inside the demo so toasts render in the sandbox page */}
      <Toaster position={position} expand={expand} />

      <div className={TRIGGER_ROW}>
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
