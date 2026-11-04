---
title: "Carousels"
description: "Avara UI ships its own Carousel set for the common cases. These two libraries are for when you need something it does not do: Embla when you want the physics…"
url: https://avaraui.com/docs/nextjs/third-party/carousel
---

# Carousels

Avara UI ships its own [Carousel](https://avaraui.com/docs/nextjs/carousel) set for the
common cases. These two libraries are for when you need something it does not
do: Embla when you want the physics and none of the markup, Swiper when you want
effects, thumbnails and a11y wiring out of the box.

## Embla

Embla ships no markup and no CSS of its own — it hands back a ref and an API
object. The viewport, the track, the arrows and the dots are all yours, which
means the controls here are ordinary `Button`s and each slide is an ordinary
`Card`. Nothing is being restyled or overridden.

### Product carousel with Card slides

Drag, swipe, arrows and dots. Embla positions the track; every pixel you can see belongs to the design system.

- The `viewport` takes `overflow-hidden` and the ref; the track directly inside it is a `flex` row. Embla translates that row — it does not create it.
- `basis` on each slide is how many are visible: `basis-[80%]` on mobile through `lg:basis-[32%]` for three. Keep `min-w-0 shrink-0 grow-0` or flex will resize the slides instead.
- `emblaApi` is `undefined` on the first render. Guard it, and subscribe to `select` and `reInit` (here through `useSyncExternalStore`) to drive the dots.
- `loop={true}` clones slides internally, so read the active index from `selectedScrollSnap()` rather than tracking it yourself.

```tsx
import { useCallback, useSyncExternalStore } from "react";



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
 * That means the controls here are ordinary `Button`s and each slide is an
 * ordinary `Card` — nothing is being restyled or overridden.
 */
export default function EmblaProductCarousel({ color }: { color?: string } = {}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  // Embla is an external store: read the active snap and the number of snaps
  // straight from the API, and re-read them whenever it fires `select` or
  // `reInit` (a resize can change how many snaps there are).
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
    <div className="w-full max-w-4xl" style={accentStyle(color)}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Featured products</h3>
          <p className="text-sm text-muted-foreground">Drag, swipe or use the arrows</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-9 w-9 justify-center p-0 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
            aria-label="Previous slide"
            iconLeft={<ChevronLeft className="h-4 w-4" />}
            onClick={() => emblaApi?.scrollPrev()}
          />
          <Button
            size="sm"
            variant="outline"
            className="h-9 w-9 justify-center p-0 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
            aria-label="Next slide"
            iconLeft={<ChevronRight className="h-4 w-4" />}
            onClick={() => emblaApi?.scrollNext()}
          />
        </div>
      </div>

      {/* The viewport clips; the track is a flex row Embla translates. */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="min-w-0 shrink-0 grow-0 basis-[80%] sm:basis-[48%] lg:basis-[32%]"
            >
              <Card interactive className="h-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
                <CardContent className="pt-4">
                  <Badge variant="outline" className="mb-2 border-primary/25 bg-primary/10 text-primary font-medium">
                    {product.tag}
                  </Badge>
                  <CardTitle className="text-base">{product.name}</CardTitle>
                  <CardDescription>{product.price}</CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: snapCount }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all cursor-pointer",
              index === selected ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-primary/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
```

### Installation

This example also uses these Avara UI components — install whichever
your project does not already have:

## Swiper

Swiper brings its own CSS, which is exactly why the slides stay yours: import
only the modules you use, then let `Card` own everything inside the slide. Its
own chrome — arrows and bullets — is repointed at the tokens through the CSS
variables it already reads, so there is no stylesheet to override.

### Coverflow testimonials

Autoplay, coverflow depth, clickable pagination and keyboard-reachable arrows — none of which you write. The card inside each slide is unchanged.

- Import `modules` and their CSS in pairs. `EffectCoverflow` without `swiper/css/effect-coverflow` renders a plain, un-transformed row.
- `--swiper-navigation-color` and `--swiper-pagination-color` are the supported way to theme the chrome. Overriding `.swiper-button-next` with a utility class loses to Swiper's own stylesheet.
- `slidesPerView="auto"` hands slide width back to you — hence `!w-[280px]` on the slide. Fixed widths are what make a coverflow read as a deck.
- `items-stretch` on the wrapper plus `h-auto` on the slide is what gives the cards one shared height; without it each slide is only as tall as its own quote.

```tsx
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";



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
 * import only the modules you use, then let `Card` own everything inside the
 * slide. The two CSS variables below re-point Swiper's own chrome — arrows and
 * bullets — at the design tokens instead of its default blue.
 */
export default function SwiperTestimonials({ color }: { color?: string } = {}) {
  return (
    <div
      style={accentStyle(color)}
      /**
       * Swiper reads its own CSS variables for arrows and bullets, so pointing
       * them at the design tokens is a class list rather than a stylesheet.
       * `items-stretch` + `h-auto` is what makes the cards share one height —
       * without it each slide is only as tall as its own quote.
       */
      className="w-full max-w-4xl [--swiper-navigation-color:var(--primary)] [--swiper-navigation-size:24px] [--swiper-pagination-bullet-inactive-color:var(--muted-foreground)] [--swiper-pagination-color:var(--primary)] [&_.swiper-slide]:h-auto [&_.swiper-wrapper]:items-stretch [&_.swiper-slide]:transition-opacity [&_.swiper-slide:not(.swiper-slide-active)]:opacity-60 [&_.swiper]:px-10 [&_.swiper]:pb-12"
    >
      <Swiper
        modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        slidesPerView="auto"
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 90, modifier: 1, slideShadows: false }}
        navigation
        pagination={{ clickable: true }}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.name} className="!w-[280px] sm:!w-[340px]">
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <Quote className="h-6 w-6 text-primary" aria-hidden />
                <p className="flex-1 text-sm leading-6 text-foreground/85">{item.quote}</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
                <Badge variant="outline" className="w-fit border-primary/25 bg-primary/10 text-primary font-medium">Verified customer</Badge>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
```

### Installation

This example also uses these Avara UI components — install whichever
your project does not already have:

## Which one

|  | Embla | Swiper |
| --- | --- | --- |
| Bundle | ~5 kB | ~40 kB+ per module set |
| Markup | Yours | Yours, inside its wrapper |
| CSS | None | Ships its own |
| Effects (coverflow, cube, cards) | Build it | Built in |
| Thumbnails, virtual slides, zoom | Build it | Modules |
| Autoplay, a11y | Plugins | Modules |

Embla is the better default when the carousel is a row of your own cards: it is
tiny, and there is nothing to fight. Swiper earns its size when you want the
effects and the extras rather than reimplementing them.

Both are also worth weighing against the built-in
[Carousel](https://avaraui.com/docs/nextjs/carousel) components, which cover image, hero,
thumbnail and radial layouts with no third-party dependency at all.

---

Live previews and every example: https://avaraui.com/docs/nextjs/third-party/carousel
