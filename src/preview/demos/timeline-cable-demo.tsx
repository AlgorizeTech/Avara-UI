"use client";

import {
  TimelineCableBlock,
  type TimelineCableEvent,
} from "@/components/custom/blocks/TimelineCableBlock";
import { Mountain, Route } from "lucide-react";

const CDN = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit";

// Media is any non-interactive node. Here, a photograph that fills the area.
function Photo({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} loading="lazy" draggable={false} className="size-full object-cover" />;
}

const events: TimelineCableEvent[] = [
  {
    id: "trailhead",
    date: "2023-05-14",
    title: "Into the trees",
    media: (
      <Photo
        src={`${CDN}/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg`}
        alt="A dirt trail winding through tall forest"
      />
    ),
    meta: (
      <>
        <Route aria-hidden className="size-4" /> 12 km
      </>
    ),
  },
  {
    id: "base-camp",
    date: "2023-09-02",
    title: "Under the granite wall",
    media: (
      <Photo
        src={`${CDN}/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg`}
        alt="A granite cliff above a sunlit meadow and pines"
      />
    ),
    meta: (
      <>
        <Mountain aria-hidden className="size-4" /> 2,100 m
      </>
    ),
  },
  {
    id: "river",
    date: "2024-03-18",
    title: "Cold water at first light",
    media: (
      <Photo
        src={`${CDN}/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg`}
        alt="A shallow river in a misty valley at dawn"
      />
    ),
    meta: (
      <>
        <Route aria-hidden className="size-4" /> 18 km
      </>
    ),
  },
  {
    id: "summit",
    date: "2024-08-09",
    title: "The last scramble",
    media: (
      <Photo
        src={`${CDN}/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg`}
        alt="A lone hiker standing on a rock above misty forested hills"
      />
    ),
    meta: (
      <>
        <Mountain aria-hidden className="size-4" /> 3,480 m
      </>
    ),
  },
  {
    id: "clouds",
    date: "2025-02-21",
    title: "A sea of cloud at sunset",
    media: (
      <Photo
        src={`${CDN}/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg`}
        alt="Snowy peaks rising above a layer of cloud at sunset"
      />
    ),
    meta: (
      <>
        <Mountain aria-hidden className="size-4" /> 3,900 m
      </>
    ),
  },
];

// Drag it sideways, scroll the mouse wheel over it, or press the arrow keys.
export default function TimelineCableExample() {
  return <TimelineCableBlock events={events} defaultValue="river" />;
}
