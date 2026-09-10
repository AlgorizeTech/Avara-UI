# Carousels

Algorize UI ships its own Carousel set for the
common cases. These two libraries are for when you need something it does not
do: Embla when you want the physics and none of the markup, Swiper when you want
effects, thumbnails and a11y wiring out of the box.

## Embla

Embla ships no markup and no CSS of its own — it hands back a ref and an API
object. The viewport, the track, the arrows and the dots are all yours, which
means the controls here are ordinary `Button`s and each slide is an ordinary
`Card`. Nothing is being restyled or overridden.

export const usageEmbla = `import { useCallback, useEffect, useState } from "react";

const products = [
  { name: "Aurora Desk Lamp", price: "$129", tag: "New", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop" },
  { name: "Vector Keyboard", price: "$189", tag: "Popular", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop" },
  { name: "Halo Wireless Mouse", price: "$99", tag: "Restocked", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop" },
  { name: "Drift Office Chair", price: "$349", tag: "Bestseller", image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=600&fit=crop" },
  { name: "Pulse Device Hub", price: "$149", tag: "New", image: "https://images.unsplash.com/photo-1596742578443-7682ef5251cd?w=800&h=600&fit=crop" },
];

/**
 * Embla ships no markup and no CSS of its own: it hands back a ref and an API
 * object, and the track, the slides, the arrows and the dots are all yours.
 * That means the controls here are ordinary \`Button\`s and each slide is an
 * ordinary \`Card\` — nothing is being restyled or overridden.
 */
export default function EmblaProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState([]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => setSelected(emblaApi.selectedScrollSnap());
    // The snap list only exists once embla has measured the slides.
    setSnaps(emblaApi.scrollSnapList());
    sync();
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi]);

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

        {snaps.map((_, index) => (
           scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === selected ? "w-6 bg-foreground" : "w-1.5 bg-border",
            )}
          />
        ))}

  );
}`;

### Installation

This example also uses these Algorize UI components — install whichever
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
export default function SwiperTestimonials() {
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

This example also uses these Algorize UI components — install whichever
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

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
