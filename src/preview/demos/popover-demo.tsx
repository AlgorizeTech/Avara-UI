"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/custom/blocks/PopoverBlock";
import { Settings2, User } from "lucide-react";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";

const colorMap: Record<string, string> = {
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#10b981",
  zinc: "#3f3f46",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

const getThemeColor = (color: string) => {
  if (color.startsWith("#")) return color;
  return colorMap[color] || "var(--primary)";
};

const TRIGGER =
  "flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl hover:scale-105 transition-transform cursor-pointer shadow-sm text-sm font-semibold";

const DimensionsForm = () => (
  <div className="space-y-4">
    <div className="space-y-1 text-sm border-b border-zinc-100 dark:border-zinc-800/50 pb-3">
      <h4 className="font-semibold text-zinc-900 dark:text-white">Dimensions</h4>
      <p className="text-zinc-500 text-xs">Set the dimensions for the layer.</p>
    </div>
    <div className="grid gap-3">
      {[
        { id: "width", label: "Width", value: "100%" },
        { id: "height", label: "Height", value: "25px" },
        { id: "max", label: "Max. Width", value: "none" },
      ].map((field) => (
        <div
          key={field.id}
          className="grid grid-cols-3 items-center gap-4 text-sm"
        >
          <label
            htmlFor={field.id}
            className="text-zinc-600 dark:text-zinc-400 font-medium"
          >
            {field.label}
          </label>
          <input
            id={field.id}
            defaultValue={field.value}
            className="col-span-2 h-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      ))}
    </div>
  </div>
);

const AccountMenu = ({ align = "end" }: { align?: Align }) => (
  <Popover>
    <PopoverTrigger>
      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
        <User className="w-5 h-5" />
      </div>
    </PopoverTrigger>
    <PopoverContent side="bottom" align={align} className="w-64">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800/50 pb-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-sm shrink-0">
            AB
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Andy Bernard</span>
            <span className="text-xs text-zinc-500">andy@dundermifflin.com</span>
          </div>
        </div>
        <button className="text-left text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
          View Profile
        </button>
        <button className="text-left text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
          Billing Settings
        </button>
        <button className="text-left text-sm text-rose-600 hover:text-rose-700 mt-2 font-medium">
          Log out
        </button>
      </div>
    </PopoverContent>
  </Popover>
);

export default function PopoverDemo({
  side = "bottom",
  align = "center",
  sideOffset,
  example = "all",
  color = "primary",
}: {
  side?: Side;
  align?: Align;
  sideOffset?: number;
  /** "all" is the classic layout; the others isolate one aspect of the API. */
  example?: "all" | "settings" | "sides" | "align" | "menu";
  color?: string;
}) {
  const themeColor = getThemeColor(color);
  const containerStyle =
    color && color !== "primary" && color !== "default"
      ? ({ "--primary": themeColor } as React.CSSProperties)
      : undefined;

  if (example !== "all") {
    return (
      <div
        className="w-full flex items-center justify-center min-h-[400px] relative z-10 overflow-hidden"
        style={containerStyle}
      >
        {example === "settings" && (
          <Popover>
            <PopoverTrigger>
              <div className={TRIGGER}>
                <Settings2 className="w-4 h-4" />
                Configure Settings
              </div>
            </PopoverTrigger>
            <PopoverContent side={side} align={align} sideOffset={sideOffset}>
              <DimensionsForm />
            </PopoverContent>
          </Popover>
        )}

        {example === "sides" && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {(["top", "right", "bottom", "left"] as Side[]).map((s) => (
              <Popover key={s}>
                <PopoverTrigger>
                  <div className={TRIGGER}>{s}</div>
                </PopoverTrigger>
                <PopoverContent side={s} className="w-48">
                  <p className="text-sm">
                    Rendered on the <strong>{s}</strong> side of the trigger.
                  </p>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        )}

        {example === "align" && (
          <div className="flex flex-col items-center justify-center gap-4">
            {(["start", "center", "end"] as Align[]).map((a) => (
              <Popover key={a}>
                <PopoverTrigger>
                  <div className={`${TRIGGER} w-56 justify-center`}>
                    align=&quot;{a}&quot;
                  </div>
                </PopoverTrigger>
                <PopoverContent side="bottom" align={a} className="w-48">
                  <p className="text-sm">
                    Aligned to the <strong>{a}</strong> edge.
                  </p>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        )}

        {example === "menu" && <AccountMenu align={align} />}
      </div>
    );
  }

  return (
    <div
      className="w-full flex items-center justify-center min-h-[400px] relative z-10 overflow-hidden"
      style={containerStyle}
    >
      <Popover>
        <PopoverTrigger>
          <div className={TRIGGER}>
            <Settings2 className="w-4 h-4 text-muted-foreground" />
            Configure Settings
          </div>
        </PopoverTrigger>

        <PopoverContent side={side} align={align}>
          <DimensionsForm />
        </PopoverContent>
      </Popover>

      {/* Secondary Popover for User Profile Demo */}
      <div className="absolute top-6 right-6">
        <AccountMenu />
      </div>
    </div>
  );
}
