"use client";

import {
  TabsOrientation,
  TabsVariant,
  VerticalTabs,
} from "@/components/custom/blocks/VerticalTabs";
import { Camera, Clapperboard, Music, Settings } from "lucide-react";

const sampleTabs = [
  {
    id: "photos",
    label: "Photos",
    icon: Camera,
    content: (
      <p>
        This is the PHOTOS tab content. Here you would display your photo
        gallery, albums, or image collection grids. The smooth crossfade
        animation makes navigating between these rich content areas feel
        native.
      </p>
    ),
  },
  {
    id: "music",
    label: "Music",
    icon: Music,
    content: (
      <p>
        This is the MUSIC tab content. Imagine a playlist, audio player
        controls, or your favorite albums rendered perfectly within this
        dark-mode optimized space.
      </p>
    ),
  },
  {
    id: "videos",
    label: "Videos",
    icon: Clapperboard,
    content: (
      <p>
        This is the VIDEOS tab content. Video players, stream links, or
        watch-later lists belong here. Notice how the active indicator clearly
        shows your current location in the app structure.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <p>
        Adjust your preferences, notification settings, and privacy controls
        here.
      </p>
    ),
  },
];

/**
 * Canvas behind the block. `elevated` paints its own white card, so on a white
 * page the lift has nothing to lift off — it gets a tinted stage instead.
 */
const CANVAS: Partial<Record<TabsVariant, string>> = {
  elevated: "bg-zinc-100 dark:bg-[#050505]",
};

export default function VerticalTabsDemo({
  variant = "default",
  orientation = "horizontal",
  color = "primary",
  defaultActiveId,
}: {
  variant?: TabsVariant;
  /** "vertical" moves the rail beside the content pane. */
  orientation?: TabsOrientation;
  color?: string;
  /** Which tab id opens first (defaults to the first tab). */
  defaultActiveId?: string;
}) {
  return (
    <div
      className={`w-full max-w-full overflow-hidden flex items-center justify-center min-h-[450px] sm:min-h-[500px] transition-colors duration-300 ${
        variant === "glass"
          ? "p-3 sm:p-8 bg-cover bg-center rounded-2xl relative"
          : `${CANVAS[variant] ?? "bg-white dark:bg-black"} p-2 sm:p-6`
      }`}
      style={
        variant === "glass"
          ? {
              backgroundImage:
                'url("https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop")',
            }
          : undefined
      }
    >
      {variant === "glass" && (
        <div className="absolute inset-0 bg-black/30 rounded-2xl pointer-events-none" />
      )}
      <div className="w-full max-w-4xl min-w-0 mx-auto">
        <VerticalTabs
          key={`${variant}-${orientation}-${color}-${defaultActiveId ?? ""}`}
          tabs={sampleTabs}
          variant={variant}
          orientation={orientation}
          color={color}
          defaultActiveId={defaultActiveId}
        />
      </div>
    </div>
  );
}
