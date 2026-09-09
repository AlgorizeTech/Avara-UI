"use client";

// Mirrors the Usage snippet on the Third Party Integration pages verbatim.
// Edit the docs snippet and this file together — they are the same code.

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";
import { Badge } from "@/components/custom/ui/badge";
import Button from "@/components/custom/blocks/Button";
import { cn } from "@/lib/utils";

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
 * That means the controls here are ordinary `Button`s and each slide is an
 * ordinary `Card` — nothing is being restyled or overridden.
 */
export default function EmblaProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    sync();
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi]);

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Featured products</h3>
          <p className="text-sm text-muted-foreground">Drag, swipe or use the arrows</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-9 w-9 justify-center p-0"
            aria-label="Previous slide"
            iconLeft={<ChevronLeft className="h-4 w-4" />}
            onClick={() => emblaApi?.scrollPrev()}
          />
          <Button
            size="sm"
            variant="outline"
            className="h-9 w-9 justify-center p-0"
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
                  <Badge variant="secondary" className="mb-2">
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
        {snaps.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === selected ? "w-6 bg-foreground" : "w-1.5 bg-border",
            )}
          />
        ))}
      </div>
    </div>
  );
}
