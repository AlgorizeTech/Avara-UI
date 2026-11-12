"use client";

import React, { useState } from "react";
import NotFoundSection, {
  NotFoundAction,
  NotFoundVariant,
  ShortcutItem,
} from "@/components/custom/blocks/NotFoundBlock";
import { accentStyle } from "@/lib/accent";
import { Activity, BookOpen, Compass, Cpu, Home, LayoutGrid, Navigation, Sparkles } from "lucide-react";

export default function NotFoundSectionDemo({
  variant = "hyperspace",
  color,
  code,
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  shortcuts,
  showShortcuts = true,
}: {
  variant?: NotFoundVariant;
  color?: string;
  code?: string;
  badge?: string;
  title?: string;
  description?: string;
  primaryAction?: NotFoundAction;
  secondaryAction?: NotFoundAction;
  shortcuts?: ShortcutItem[];
  showShortcuts?: boolean;
}) {
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  // Derive variant-authentic default actions matching usage snippets exactly
  const resolvedPrimaryAction: NotFoundAction = primaryAction
    ? {
        ...primaryAction,
        onClick: () =>
          showNotice(`Action triggered: ${primaryAction.label}`),
      }
    : variant === "spatial-portal" || variant === "kinetic-wireframe" || variant === "infinite-horizon" || variant === "dimensional-portal" || variant === "portal"
    ? {
        label: "Back to Home",
        href: "/",
        icon: <Home className="h-4 w-4" />,
        onClick: () => showNotice("Action triggered: Back to Home..."),
      }
    : variant === "quantum-hologram"
    ? {
        label: "Re-anchor to Orbit",
        href: "#",
        icon: <Sparkles className="h-4 w-4" />,
        onClick: () => showNotice("Action triggered: Re-anchoring to Orbit..."),
      }
    : {
        label: "Explore Documentation",
        href: "#",
        icon: <BookOpen className="h-4 w-4" />,
        onClick: () => showNotice("Action triggered: Navigating to documentation..."),
      };

  const resolvedSecondaryAction: NotFoundAction = secondaryAction
    ? {
        ...secondaryAction,
        onClick: () =>
          showNotice(`Action triggered: ${secondaryAction.label}`),
      }
    : variant === "spatial-portal" || variant === "kinetic-wireframe" || variant === "infinite-horizon" || variant === "dimensional-portal" || variant === "portal"
    ? {
        label: "Explore Documentation",
        href: "#",
        icon: <BookOpen className="h-4 w-4" />,
        onClick: () => showNotice("Action triggered: Opening Documentation..."),
      }
    : variant === "quantum-hologram"
    ? {
        label: "Return to Base",
        href: "/",
        icon: <Home className="h-4 w-4" />,
        onClick: () => showNotice("Action triggered: Returning to Base..."),
      }
    : variant === "animated-beam-border"
    ? {
        label: "Return to Homepage",
        href: "/",
        icon: <Home className="h-4 w-4" />,
        onClick: () => showNotice("Action triggered: Returning to Homepage..."),
      }
    : {
        label: "Back to Home",
        href: "/",
        icon: <Home className="h-4 w-4" />,
        onClick: () => showNotice("Action triggered: Redirecting to homepage..."),
      };

  const resolvedShortcuts: ShortcutItem[] | undefined = shortcuts
    ? shortcuts.map((s) => ({
        ...s,
        onClick: () => showNotice(`Shortcut clicked: ${s.label}`),
      }))
    : variant === "spatial-portal" || variant === "kinetic-wireframe" || variant === "infinite-horizon" || variant === "dimensional-portal" || variant === "portal"
    ? undefined
    : variant === "quantum-hologram"
    ? [
        {
          label: "Component Matrix",
          href: "#",
          icon: <LayoutGrid className="h-4 w-4" />,
          onClick: () => showNotice("Shortcut clicked: Component Matrix"),
        },
        {
          label: "System Quickstart",
          href: "#",
          icon: <BookOpen className="h-4 w-4" />,
          onClick: () => showNotice("Shortcut clicked: System Quickstart"),
        },
        {
          label: "Telemetry Hub",
          href: "#",
          icon: <Cpu className="h-4 w-4" />,
          onClick: () => showNotice("Shortcut clicked: Telemetry Hub"),
        },
        {
          label: "Live Changelog",
          href: "#",
          icon: <Activity className="h-4 w-4" />,
          onClick: () => showNotice("Shortcut clicked: Live Changelog"),
        },
      ]
    : variant === "animated-beam-border"
    ? [
        {
          label: "All Components",
          href: "#",
          icon: <LayoutGrid className="h-4 w-4" />,
          onClick: () => showNotice("Shortcut clicked: All Components"),
        },
        {
          label: "Installation Guide",
          href: "#",
          icon: <BookOpen className="h-4 w-4" />,
          onClick: () => showNotice("Shortcut clicked: Installation Guide"),
        },
        {
          label: "Templates Library",
          href: "#",
          icon: <Sparkles className="h-4 w-4" />,
          onClick: () => showNotice("Shortcut clicked: Templates Library"),
        },
        {
          label: "Live Changelog",
          href: "#",
          icon: <Activity className="h-4 w-4" />,
          onClick: () => showNotice("Shortcut clicked: Live Changelog"),
        },
      ]
    : [
        {
          label: "All Components",
          href: "#",
          icon: <LayoutGrid className="h-3.5 w-3.5 shrink-0 text-primary" />,
          onClick: () => showNotice("Shortcut clicked: All Components"),
        },
        {
          label: "Installation",
          href: "#",
          icon: <BookOpen className="h-3.5 w-3.5 shrink-0 text-primary" />,
          onClick: () => showNotice("Shortcut clicked: Installation"),
        },
      ];

  return (
    <div
      style={accentStyle(color)}
      className="relative -my-6 -mx-4 w-[calc(100%+2rem)] min-w-[calc(100%+2rem)] max-w-none flex flex-col items-center justify-center overflow-hidden"
    >
      {notice && (
        <div className="absolute top-6 z-50 text-xs px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono shadow-lg backdrop-blur-md">
          {notice}
        </div>
      )}

      <div className="w-full">
        <NotFoundSection
          variant={variant}
          color={color}
          code={code}
          badge={badge}
          title={title}
          description={description}
          showShortcuts={showShortcuts}
          primaryAction={resolvedPrimaryAction}
          secondaryAction={resolvedSecondaryAction}
          shortcuts={resolvedShortcuts}
          className="w-full min-h-[580px] sm:min-h-[640px]"
        />
      </div>
    </div>
  );
}
