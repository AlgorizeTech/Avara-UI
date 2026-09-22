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
          "flex h-16 w-1/3 cursor-pointer flex-col items-center justify-center rounded border-2 p-2",
          active
            ? "bg-primary/5 border-primary/30"
            : "hover:border-neutral-400 dark:hover:border-neutral-700",
        )}
      >
        <Icon className={active ? "text-primary" : "text-neutral-500"} />
        <small>{label}</small>
      </div>
    );
  };

  return (
    <div className="space-y-2.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
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
