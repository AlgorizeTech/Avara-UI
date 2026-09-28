"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Choice = "light" | "dark" | "system";

export function DarkModeControl() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current: Choice = mounted ? ((theme as Choice) ?? "system") : "system";

  const renderTile = (choice: Choice, Icon: typeof Sun, label: string) => {
    const active = current === choice;
    return (
      <div
        onClick={() => setTheme(choice)}
        className={cn(
          "flex h-16 w-1/3 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border p-2 transition-colors",
          active
            ? "bg-primary/15 border-primary/25 text-primary"
            : "bg-foreground/[0.03] border-foreground/[0.06] text-foreground/50 hover:bg-foreground/[0.05] hover:text-foreground",
        )}
      >
        <Icon className="size-4" />
        <small className="text-[12px] font-medium">{label}</small>
      </div>
    );
  };

  return (
    <div className="space-y-2.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/35 block">
        Mode
      </span>
      <div className="flex gap-2">
        {renderTile("light", Sun, "Light")}
        {renderTile("dark", Moon, "Dark")}
        {renderTile("system", Monitor, "System")}
      </div>
    </div>
  );
}
