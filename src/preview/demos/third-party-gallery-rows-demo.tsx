"use client";

// Mirrors the Usage snippet on the Third Party Integration pages verbatim.
// Edit the docs snippet and this file together — they are the same code.

import { useState } from "react";
import { RowsPhotoAlbum, type Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";

import "react-photo-album/rows.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type GalleryPhoto = Photo & { title: string; description: string };

const sized = (url: string, width: number) =>
  url.replace("/upload/", `/upload/w_${width},c_limit/`);

const source = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg", width: 1600, height: 1067, title: "Coastline at dawn", description: "Tropical shoreline, long exposure" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg", width: 1600, height: 1067, title: "Sunlit forest", description: "Temperate woodland canopy" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg", width: 1600, height: 1067, title: "Alpine ridge", description: "Above the treeline at first light" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg", width: 1600, height: 1067, title: "Valley fog", description: "Low cloud settling between peaks" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790159968/photo-1418065460487-3e41a6c84dc5-1790159970119.jpg", width: 1600, height: 1067, title: "Golden field", description: "Late afternoon grassland" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg", width: 1600, height: 1067, title: "River bend", description: "Glacial meltwater in spring" },
];

/**
 * `react-photo-album` solves the layout — it fits photos into rows of equal
 * height without cropping — and the lightbox solves the viewer. Neither owns
 * the page chrome, so the whole gallery drops inside a `Card` unchanged.
 */
const photos: GalleryPhoto[] = source.map((photo) => ({
  src: sized(photo.src, 1600),
  width: photo.width,
  height: photo.height,
  alt: photo.title,
  title: photo.title,
  description: photo.description,
  srcSet: [480, 800, 1200, 1600].map((width) => ({
    src: sized(photo.src, width),
    width,
    height: Math.round((photo.height / photo.width) * width),
  })),
}));

export default function PhotoAlbumLightbox() {
  const [index, setIndex] = useState(-1);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Field notes</CardTitle>
        <CardDescription>
          Click any photo — arrow keys, pinch-zoom and Escape all work
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-6">
        <RowsPhotoAlbum
          photos={photos}
          targetRowHeight={180}
          spacing={8}
          onClick={({ index: clicked }) => setIndex(clicked)}
          componentsProps={{ image: { loading: "lazy" } }}
        />

        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={photos}
          plugins={[Captions, Counter, Thumbnails, Zoom]}
          captions={{ descriptionTextAlign: "center" }}
          counter={{ container: { style: { top: "unset", bottom: 0 } } }}
          /**
           * The lightbox reads its own CSS variables, so matching it to the
           * design system is a handful of values rather than a stylesheet.
           */
          styles={{
            root: {
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            },
            container: {
              backgroundColor: "transparent",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            },
            thumbnail: { backgroundColor: "transparent", border: "none" },
          }}
        />
      </CardContent>
    </Card>
  );
}
