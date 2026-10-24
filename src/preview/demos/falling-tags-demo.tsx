"use client";

import React from "react";
import FallingTagsBlock, {
  type FallingTagPalette,
  type FallingTagItem,
} from "@/components/custom/blocks/FallingTagsBlock";

export default function FallingTagsDemo({
  palette = "default",
  height = 500,
  tags,
  title,
  description,
  gravity,
  bounce,
  friction,
  hoverDuration,
  showControls = false,
  interactive = true,
}: {
  palette?: FallingTagPalette;
  height?: number;
  tags?: (string | FallingTagItem)[];
  title?: string;
  description?: string;
  gravity?: number;
  bounce?: number;
  friction?: number;
  hoverDuration?: number;
  showControls?: boolean;
  interactive?: boolean;
}) {
  const isGlass = palette === "glass";

  return (
    <div
      className="w-full block"
      style={{
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingLeft: "15px",
        paddingRight: "0px",
        boxSizing: "border-box",
      }}
    >
      {isGlass ? (
        <div
          className="w-full rounded-3xl bg-cover bg-center relative overflow-hidden shadow-2xl"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] pointer-events-none" />
          <div className="relative z-10 w-full">
            <FallingTagsBlock
              key={palette}
              palette={palette}
              height={height}
              tags={tags}
              title={title}
              description={description}
              gravity={gravity}
              bounce={bounce}
              friction={friction}
              hoverDuration={hoverDuration}
              showControls={showControls}
              interactive={interactive}
            />
          </div>
        </div>
      ) : (
        <FallingTagsBlock
          key={palette}
          palette={palette}
          height={height}
          tags={tags}
          title={title}
          description={description}
          gravity={gravity}
          bounce={bounce}
          friction={friction}
          hoverDuration={hoverDuration}
          showControls={showControls}
          interactive={interactive}
        />
      )}
    </div>
  );
}
