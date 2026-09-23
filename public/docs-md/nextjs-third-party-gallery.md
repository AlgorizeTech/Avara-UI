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

const sized = (url: string, width: number) =>
  url.replace("/upload/", \`/upload/w_\${width},c_limit/\`);

const source = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg", width: 1600, height: 1067, title: "Coastline at dawn", description: "Tropical shoreline, long exposure" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg", width: 1600, height: 1067, title: "Sunlit forest", description: "Temperate woodland canopy" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg", width: 1600, height: 1067, title: "Alpine ridge", description: "Above the treeline at first light" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg", width: 1600, height: 1067, title: "Valley fog", description: "Low cloud settling between peaks" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790159968/photo-1418065460487-3e41a6c84dc5-1790159970119.jpg", width: 1600, height: 1067, title: "Golden field", description: "Late afternoon grassland" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg", width: 1600, height: 1067, title: "River bend", description: "Glacial meltwater in spring" },
];

/**
 * \`react-photo-album\` solves the layout — it fits photos into rows of equal
 * height without cropping — and the lightbox solves the viewer. Neither owns
 * the page chrome, so the whole gallery drops inside a \`Card\` unchanged.
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

### Installation

This example also uses these Algorize UI components — install whichever
your project does not already have:

## Masonry layout

The same two libraries in a different arrangement: `MasonryPhotoAlbum` packs
uneven heights into columns, and the lightbox is opened from a hover affordance
rather than the whole tile — so the overlay button is yours while the album's own
image element stays untouched.

export const usageMasonry = `import { useState } from "react";

import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/styles.css";

const sized = (url: string, width: number) =>
  url.replace("/upload/", \`/upload/w_\${width},c_limit/\`);

const source = [
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&auto=format&fit=crop", width: 1600, height: 1067, alt: "Plated dish" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80&auto=format&fit=crop", width: 1600, height: 2400, alt: "Restaurant interior" },
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

### Installation

Same two packages as above — `MasonryPhotoAlbum` and the extra plugins ship
inside them, so there is nothing new to add:

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
