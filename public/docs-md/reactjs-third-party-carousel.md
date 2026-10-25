export const metadata = docsPageMetadata("third-party/carousel", {
  title: "Carousels",
  description: `Integrate Embla Carousel and Swiper with Avara UI — Card slides, Button controls, and Swiper chrome themed through its own CSS variables.`
});

# Carousels

Avara UI ships its own Carousel set for the
common cases. These two libraries are for when you need something it does not
do: Embla when you want the physics and none of the markup, Swiper when you want
effects, thumbnails and a11y wiring out of the box.

## Embla

Embla ships no markup and no CSS of its own — it hands back a ref and an API
object. The viewport, the track, the arrows and the dots are all yours, which
means the controls here are ordinary `Button`s and each slide is an ordinary
`Card`. Nothing is being restyled or overridden.

export const usageEmbla = `import { useCallback, useSyncExternalStore } from "react";

const products = [
  { name: "Aurora Desk Lamp", price: "$129", tag: "New", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790159966/photo-1507473885765-e6ed057f782c-1790159970112.jpg" },
  { name: "Vector Keyboard", price: "$189", tag: "Popular", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790159967/photo-1587829741301-dc798b83add3-1790159970115.jpg" },
  { name: "Halo Wireless Mouse", price: "$99", tag: "Restocked", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790159966/photo-1527864550417-7fd91fc51a46-1790159970113.jpg" },
  { name: "Drift Office Chair", price: "$349", tag: "Bestseller", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790159966/photo-1580480055273-228ff5388ef8-1790159970114.jpg" },
  { name: "Pulse Device Hub", price: "$149", tag: "New", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790159967/photo-1596742578443-7682ef5251cd-1790159970115.jpg" },
];

/**
 * Embla ships no markup and no CSS of its own: it hands back a ref and an API
 * object, and the track, the slides, the arrows and the dots are all yours.
 * That means the controls here are ordinary \`Button\`s and each slide is an
 * ordinary \`Card\` — nothing is being restyled or overridden.
 */
export default function EmblaProductCarousel({ color }: { color?: string } = {}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  // Embla is an external store: read the active snap and the number of snaps
  // straight from the API, and re-read them whenever it fires \`select\` or
  // \`reInit\` (a resize can change how many snaps there are).
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!emblaApi) return () => {};
      emblaApi.on("select", onChange).on("reInit", onChange);
      return () => {
        emblaApi.off("select", onChange).off("reInit", onChange);
      };
    },
    [emblaApi],
  );
  const selected = useSyncExternalStore(
    subscribe,
    () => emblaApi?.selectedScrollSnap() ?? 0,
    () => 0,
  );
  // The snap list only exists once embla has measured the slides.
  const snapCount = useSyncExternalStore(
    subscribe,
    () => emblaApi?.scrollSnapList().length ?? 0,
    () => 0,
  );

  return (

          Featured products
          Drag, swipe or use the arrows

          }
            onClick={() => emblaApi?.scrollPrev()}
          />
          }
            onClick={() => emblaApi?.scrollNext()}
          />

      {/* The viewport clips; the track is a flex row Embla translates. */}

          {products.map((product) => (

                    {product.tag}
                  
                  {product.name}
                  {product.price}

          ))}

        {Array.from({ length: snapCount }, (_, index) => (
           scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all cursor-pointer",
              index === selected ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-primary/40",
            )}
          />
        ))}

  );
}`;

### Installation

This example also uses these Avara UI components — install whichever
your project does not already have:

## Swiper

Swiper brings its own CSS, which is exactly why the slides stay yours: import
only the modules you use, then let `Card` own everything inside the slide. Its
own chrome — arrows and bullets — is repointed at the tokens through the CSS
variables it already reads, so there is no stylesheet to override.

export const usageSwiper = `import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  { name: "Ada Okafor", role: "Head of Design, Northwind", quote: "We replaced three internal component libraries with this one and shipped the redesign a month early." },
  { name: "Marek Novak", role: "Staff Engineer, Contoso", quote: "The primitives compose the way the docs claim they do. That is rarer than it should be." },
  { name: "Priya Raman", role: "CTO, Fabrikam", quote: "Theming was one token file. Everything downstream — charts, grids, carousels — just followed." },
  { name: "Tom Halvorsen", role: "Product Lead, Tailspin", quote: "Our designers stopped filing tickets about spacing. That is the whole review." },
  { name: "Sofia Marino", role: "Frontend Lead, Litware", quote: "Accessible by default, so the audit was boring. Boring audits are the goal." },
];

/**
 * Swiper brings its own CSS, which is exactly why the slides stay ours:
 * import only the modules you use, then let \`Card\` own everything inside the
 * slide. The two CSS variables below re-point Swiper's own chrome — arrows and
 * bullets — at the design tokens instead of its default blue.
 */
export default function SwiperTestimonials({ color }: { color?: string } = {}) {
  return (

        {testimonials.map((item) => (

                {item.quote}
                
                  {item.name}
                  {item.role}
                
                Verified customer

        ))}

  );
}`;

### Installation

This example also uses these Avara UI components — install whichever
your project does not already have:

## Which one

        Embla
        Swiper

        Bundle
        ~5 kB
        ~40 kB+ per module set

        Markup
        Yours
        Yours, inside its wrapper

        CSS
        None
        Ships its own

        Effects (coverflow, cube, cards)
        Build it
        Built in

        Thumbnails, virtual slides, zoom
        Build it
        Modules

        Autoplay, a11y
        Plugins
        Modules

Embla is the better default when the carousel is a row of your own cards: it is
tiny, and there is nothing to fight. Swiper earns its size when you want the
effects and the extras rather than reimplementing them.

Both are also worth weighing against the built-in
Carousel components, which cover image, hero,
thumbnail and radial layouts with no third-party dependency at all.

---

**Component Path:** `[framework]\third-party\carousel\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
