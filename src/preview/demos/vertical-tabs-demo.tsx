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
        watch-later lists belong here. Notice how the active dot indicator
        clearly shows your current location in the app structure.
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

export default function VerticalTabsDemo({
  variant = "default",
  orientation = "vertical",
  color = "primary",
  defaultActiveId,
}: {
  variant?: TabsVariant;
  /** "horizontal" moves the rail above the content pane. */
  orientation?: TabsOrientation;
  color?: string;
  /** Which tab id opens first (defaults to the first tab). */
  defaultActiveId?: string;
}) {
  return (
    <div
      className={`w-full flex items-center justify-center min-h-[500px] transition-colors duration-300 ${variant === "glass" ? "p-4 sm:p-8 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black rounded-2xl" : "bg-white dark:bg-black py-12"}`}
    >
      <div className="w-full max-w-4xl mx-auto px-4">
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
