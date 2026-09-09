# Gallery & Lightbox

A photo gallery is really two problems, and they are best solved by two
libraries. `react-photo-album` handles layout — fitting uneven aspect ratios
into rows or columns without cropping anything — and
`yet-another-react-lightbox` handles the viewer: keyboard navigation, pinch
zoom, captions, thumbnails, fullscreen and slideshow.

Neither owns the page chrome, so the whole gallery drops inside a `Card`
unchanged.

## Rows layout

export const usageRows = `import { useState } from "react";

import "react-photo-album/rows.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type GalleryPhoto = Photo & { title: string; description: string };

const unsplash = (id: string, width: number) =>
  \`https://images.unsplash.com/\${id}?w=\${width}&q=80&auto=format&fit=crop\`;

const source = [
  { id: "photo-1506905925346-21bda4d32df4", width: 1600, height: 1067, title: "Coastline at dawn", description: "Tropical shoreline, long exposure" },
  { id: "photo-1441974231531-c6227db76b6e", width: 1600, height: 1067, title: "Sunlit forest", description: "Temperate woodland canopy" },
  { id: "photo-1464822759023-fed622ff2c3b", width: 1600, height: 1067, title: "Alpine ridge", description: "Above the treeline at first light" },
  { id: "photo-1470071459604-3b5ec3a7fe05", width: 1600, height: 1067, title: "Valley fog", description: "Low cloud settling between peaks" },
  { id: "photo-1418065460487-3e41a6c84dc5", width: 1600, height: 1067, title: "Golden field", description: "Late afternoon grassland" },
  { id: "photo-1426604966848-d7adac402bff", width: 1600, height: 1067, title: "River bend", description: "Glacial meltwater in spring" },
];

/**
 * \`react-photo-album\` solves the layout — it fits photos into rows of equal
 * height without cropping — and the lightbox solves the viewer. Neither owns
 * the page chrome, so the whole gallery drops inside a \`Card\` unchanged.
 */
const photos: GalleryPhoto[] = source.map((photo) => ({
  src: unsplash(photo.id, 1600),
  width: photo.width,
  height: photo.height,
  alt: photo.title,
  title: photo.title,
  description: photo.description,
  srcSet: [480, 800, 1200, 1600].map((width) => ({
    src: unsplash(photo.id, width),
    width,
    height: Math.round((photo.height / photo.width) * width),
  })),
}));

export default function PhotoAlbumLightbox() {
  const [index, setIndex] = useState(-1);

  return (

        Field notes
        
          Click any photo — arrow keys, pinch-zoom and Escape all work

         setIndex(clicked)}
          componentsProps={{ image: { loading: "lazy" } }}
        />

        = 0}
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
            container: { backgroundColor: "rgba(9, 9, 11, 0.94)" },
            thumbnail: { backgroundColor: "transparent", border: "none" },
          }}
        />

  );
}`;

## Installation

The examples below also use these Algorize UI components — install whichever
your project does not already have:

## Masonry layout

The same two libraries in a different arrangement: `MasonryPhotoAlbum` packs
uneven heights into columns, and the lightbox is opened from a hover affordance
rather than the whole tile — so the overlay button is yours while the album's own
image element stays untouched.

export const usageMasonry = `import { useState } from "react";

import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/styles.css";

const unsplash = (id: string, width: number) =>
  \`https://images.unsplash.com/\${id}?w=\${width}&q=80&auto=format&fit=crop\`;

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
 * The same two libraries in a different arrangement: \`MasonryPhotoAlbum\`
 * packs uneven aspect ratios into columns, and the lightbox is opened from a
 * hover affordance instead of the whole tile — so the overlay button is
 * yours, and \`render\` keeps the album's own image element untouched.
 */
export default function MasonryLightbox() {
  const [index, setIndex] = useState(-1);

  return (

        Menu photography
        Masonry columns, slideshow and download enabled

         (containerWidth  setIndex(clicked)}
          render={{
            extras: (_, { index: photoIndex }) => (

                  Open photo {photoIndex + 1}

            ),
          }}
          componentsProps={{
            image: { loading: "lazy" },
            button: { className: "group relative cursor-zoom-in" },
          }}
        />

        = 0}
          index={index}
          close={() => setIndex(-1)}
          slides={photos}
          plugins={[Fullscreen, Slideshow, Zoom, Download]}
          slideshow={{ delay: 2500 }}
          styles={{ container: { backgroundColor: "rgba(9, 9, 11, 0.94)" } }}
        />

  );
}`;

## The layouts and the plugins

`react-photo-album` exports three album components, all taking the same photo
array:

        Component
        Arrangement
        Good for

        {'RowsPhotoAlbum'}
        Justified rows of equal height
        Mixed landscape and portrait, editorial feel

        {'ColumnsPhotoAlbum'}
        Fixed columns, photos in order
        Reading order matters

        {'MasonryPhotoAlbum'}
        Columns balanced by height
        Tall and wide mixed, no gaps

The lightbox is plugin-based, and each plugin is opt-in:

        Plugin
        Adds
        Extra CSS

        {'Captions'}
        Title and description overlay
        {'captions.css'}

        {'Counter'}
        "3 / 12" position
        {'counter.css'}

        {'Thumbnails'}
        Filmstrip
        {'thumbnails.css'}

        {'Zoom'}
        Pinch and wheel zoom
        —

        {'Fullscreen'}
        Fullscreen API
        —

        {'Slideshow'}
        Timed auto-advance
        —

        {'Download'}
        Save the original
        —

        {'Video'}
        Video slides alongside photos
        —

## Notes

**Theming the viewer.** The lightbox reads its own CSS variables, so matching it
to the design system is a handful of values passed to `styles` rather than a
stylesheet. Its backdrop is intentionally near-black in both themes — a viewer
is one place where a light surface fights the content.

**Server rendering.** The lightbox renders nothing until `open` is true, so it is
safe anywhere. The album has a dedicated `react-photo-album/ssr` entry point for
server-rendered layout if the first paint matters to you.

**Next.js images.** Both examples use a plain `` so the code runs unchanged
in any React app. To route through `next/image`, pass a custom image renderer via
the album's `render.image` — the layout maths is unaffected.

---

**Component Path:** `[framework]\third-party\gallery\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
