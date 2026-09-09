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

const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?w=${width}&q=80&auto=format&fit=crop`;

const source = [
  { id: "photo-1504674900247-0877df9cc836", width: 1600, height: 1067, alt: "Plated dish" },
  { id: "photo-1414235077428-338989a2e8c0", width: 1600, height: 2400, alt: "Restaurant interior" },
  { id: "photo-1466978913421-dad2ebd01d17", width: 1600, height: 1067, alt: "Espresso pour" },
  { id: "photo-1498837167922-ddd27525d352", width: 1600, height: 2000, alt: "Market produce" },
  { id: "photo-1476224203421-9ac39bcb3327", width: 1600, height: 1067, alt: "Breakfast spread" },
  { id: "photo-1467003909585-2f8a72700288", width: 1600, height: 1067, alt: "Grilled plate" },
  { id: "photo-1482049016688-2d3e1b311543", width: 1600, height: 1067, alt: "Fresh salad" },
];

const photos: Photo[] = source.map((photo) => ({
  src: unsplash(photo.id, 1400),
  width: photo.width,
  height: photo.height,
  alt: photo.alt,
  srcSet: [400, 700, 1000, 1400].map((width) => ({
    src: unsplash(photo.id, width),
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
