"use client";

// Mirrors the Usage snippet on the Third Party Integration pages verbatim.
// Edit the docs snippet and this file together — they are the same code.

import { useState } from "react";
import { MasonryPhotoAlbum, type Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Maximize2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";

import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/styles.css";

const sized = (url: string, width: number) =>
  url.replace("/upload/", `/upload/w_${width},c_limit/`);

const source = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790166050/photo-1504674900247-0877df9cc836-1790166052224.jpg", width: 1600, height: 1067, alt: "Plated dish" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790166051/photo-1414235077428-338989a2e8c0-1790166052224.jpg", width: 1600, height: 2400, alt: "Restaurant interior" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790159969/photo-1466978913421-dad2ebd01d17-1790159970121.jpg", width: 1600, height: 1067, alt: "Espresso pour" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790159971/photo-1498837167922-ddd27525d352-1790159970124.jpg", width: 1600, height: 2000, alt: "Market produce" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790159969/photo-1476224203421-9ac39bcb3327-1790159970123.jpg", width: 1600, height: 1067, alt: "Breakfast spread" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790159969/photo-1467003909585-2f8a72700288-1790159970122.jpg", width: 1600, height: 1067, alt: "Grilled plate" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790159971/photo-1482049016688-2d3e1b311543-1790159970124.jpg", width: 1600, height: 1067, alt: "Fresh salad" },
];

const photos: Photo[] = source.map((photo) => ({
  src: sized(photo.src, 1400),
  width: photo.width,
  height: photo.height,
  alt: photo.alt,
  srcSet: [400, 700, 1000, 1400].map((width) => ({
    src: sized(photo.src, width),
    width,
    height: Math.round((photo.height / photo.width) * width),
  })),
}));

/**
 * The same two libraries in a different arrangement: `MasonryPhotoAlbum`
 * packs uneven aspect ratios into columns, and the lightbox is opened from a
 * hover affordance instead of the whole tile — so the overlay button is
 * yours, and `render` keeps the album's own image element untouched.
 */
export default function MasonryLightbox() {
  const [index, setIndex] = useState(-1);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Menu photography</CardTitle>
        <CardDescription>Masonry columns, slideshow and download enabled</CardDescription>
      </CardHeader>

      <CardContent className="pb-6">
        <MasonryPhotoAlbum
          photos={photos}
          columns={(containerWidth) => (containerWidth < 480 ? 2 : containerWidth < 900 ? 3 : 4)}
          spacing={8}
          onClick={({ index: clicked }) => setIndex(clicked)}
          render={{
            extras: (_, { index: photoIndex }) => (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-md bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                <span className="rounded-full bg-background/90 p-2 text-foreground shadow-sm">
                  <Maximize2 className="h-4 w-4" aria-hidden />
                  <span className="sr-only">Open photo {photoIndex + 1}</span>
                </span>
              </div>
            ),
          }}
          componentsProps={{
            image: { loading: "lazy" },
            button: { className: "group relative cursor-zoom-in" },
          }}
        />

        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={photos}
          plugins={[Fullscreen, Slideshow, Zoom, Download]}
          slideshow={{ delay: 2500 }}
          styles={{ container: { backgroundColor: "rgba(9, 9, 11, 0.94)" } }}
        />
      </CardContent>
    </Card>
  );
}
