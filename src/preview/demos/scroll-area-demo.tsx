"use client";

import {
  ScrollAreaBlock,
  ScrollAreaVariant,
} from "@/components/custom/blocks/ScrollAreaBlock";

/**
 * Each branch renders exactly what the matching usage snippet on
 * docs/[framework]/scroll-area/page.mdx prints, so copying the snippet
 * reproduces the preview. The examples are about the scrollbar — orientation,
 * variant, autoHide, hideTrack — so the content stays deliberately plain.
 */

// The scrollable content — swap it for your own.
function LongList() {
  const tags = Array.from({ length: 50 }).map((_, i) => "Item " + (i + 1));

  return (
    <div className="flex flex-col gap-2">
      {tags.map((tag) => (
        <div key={tag} className="text-sm">
          {tag}
        </div>
      ))}
    </div>
  );
}

const artwork = [
  {
    id: 1,
    title: "Misty Pine Forest",
    artist: "Ornella Binni",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Lush River Valley",
    artist: "Tom Byrom",
    image:
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Autumn Woodland Path",
    artist: "Vladimir Malyavko",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Cascading Mountain Falls",
    artist: "Ornella Binni",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=400&auto=format&fit=crop",
  },
];

function Card({
  title,
  artist,
  image,
}: {
  title: string;
  artist: string;
  image: string;
}) {
  return (
    <figure className="shrink-0">
      <div className="overflow-hidden rounded-md">
        <img
          src={image}
          alt={title}
          className="h-[160px] w-[240px] object-cover"
        />
      </div>
      <figcaption className="pt-2 text-xs text-zinc-500">
        {title} —{" "}
        <span className="font-medium text-zinc-900 dark:text-zinc-100">
          {artist}
        </span>
      </figcaption>
    </figure>
  );
}

// Content wider AND taller than the box, so both bars appear.
function Grid() {
  return (
    <div className="grid w-max grid-cols-6 gap-3">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="flex h-16 w-24 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 text-xs"
        >
          {"R" + (Math.floor(i / 6) + 1) + " C" + ((i % 6) + 1)}
        </div>
      ))}
    </div>
  );
}

export default function ScrollAreaDemo({
  variant = "default",
  orientation = "vertical",
  hideTrack = false,
  autoHide = false,
  color = "primary",
}: {
  variant?: ScrollAreaVariant;
  orientation?: "vertical" | "horizontal" | "both";
  hideTrack?: boolean;
  autoHide?: boolean;
  color?: string;
}) {
  if (orientation === "horizontal") {
    return (
      <div className="w-full flex items-center justify-center">
        <ScrollAreaBlock
          orientation="horizontal"
          variant={variant}
          color={color}
          hideTrack={hideTrack}
          autoHide={autoHide}
          className="w-full max-w-2xl whitespace-nowrap rounded-md border p-6"
        >
          <div className="flex w-max space-x-4 pb-4">
            {artwork.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
        </ScrollAreaBlock>
      </div>
    );
  }

  if (orientation === "both") {
    return (
      <div className="w-full flex items-center justify-center">
        <ScrollAreaBlock
          orientation="both"
          variant={variant}
          color={color}
          hideTrack={hideTrack}
          autoHide={autoHide}
          className="h-[300px] w-full max-w-sm whitespace-nowrap rounded-md border p-6"
        >
          <Grid />
        </ScrollAreaBlock>
      </div>
    );
  }

  if (variant === "glass") {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="p-6 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl">
          <ScrollAreaBlock
            variant="glass"
            color={color}
            hideTrack={hideTrack}
            autoHide={autoHide}
            className="h-[350px] max-w-sm rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
          >
            <LongList />
          </ScrollAreaBlock>
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className="w-full flex items-center justify-center">
        <ScrollAreaBlock
          variant="minimal"
          color={color}
          hideTrack={hideTrack}
          autoHide={autoHide}
          className="h-[350px] max-w-sm rounded-md border p-6"
        >
          <LongList />
        </ScrollAreaBlock>
      </div>
    );
  }

  if (autoHide || hideTrack) {
    return (
      <div className="w-full flex items-center justify-center">
        <ScrollAreaBlock
          autoHide={autoHide}
          hideTrack={hideTrack}
          color={color}
          className="h-[350px] max-w-sm rounded-md border p-6"
        >
          <LongList />
        </ScrollAreaBlock>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center">
      <ScrollAreaBlock
        color={color}
        className="h-[300px] w-full max-w-sm rounded-md border p-4"
      >
        <LongList />
      </ScrollAreaBlock>
    </div>
  );
}
